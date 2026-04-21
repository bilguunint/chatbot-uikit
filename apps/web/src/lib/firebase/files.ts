// User-uploaded files. Metadata lives at `users/{uid}/files/{fileId}` in
// Firestore; the binary blob lives in Firebase Storage at
// `users/{uid}/files/{fileId}-{filename}`.

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  type Firestore,
} from "firebase/firestore";
import {
  deleteObject,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  type FirebaseStorage,
  type UploadTaskSnapshot,
} from "firebase/storage";

/** Per-user storage quota: 500 MB. */
export const MAX_USER_STORAGE_BYTES = 500 * 1024 * 1024;

export interface UserFile {
  id: string;
  name: string;
  /** Lowercase extension without the dot (e.g. "pdf"). Empty string if none. */
  ext: string;
  /** Bucket of the file: image, video, audio, pdf, doc, sheet, code, archive, other. */
  category: FileCategory;
  contentType: string;
  size: number;
  storagePath: string;
  downloadURL: string;
  createdAt: number;
}

export type FileCategory =
  | "image"
  | "video"
  | "audio"
  | "pdf"
  | "doc"
  | "sheet"
  | "slide"
  | "code"
  | "archive"
  | "text"
  | "other";

const filesCollection = (db: Firestore, uid: string) =>
  collection(db, "users", uid, "files");

function tsToMs(value: unknown): number {
  if (!value) return 0;
  if (value instanceof Timestamp) return value.toMillis();
  if (typeof value === "number") return value;
  return 0;
}

export function getFileExtension(name: string): string {
  const i = name.lastIndexOf(".");
  if (i < 0 || i === name.length - 1) return "";
  return name.slice(i + 1).toLowerCase();
}

export function categorizeFile(ext: string, contentType: string): FileCategory {
  const ct = (contentType || "").toLowerCase();
  if (ct.startsWith("image/")) return "image";
  if (ct.startsWith("video/")) return "video";
  if (ct.startsWith("audio/")) return "audio";

  switch (ext) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
    case "svg":
    case "bmp":
    case "ico":
    case "heic":
      return "image";
    case "mp4":
    case "mov":
    case "webm":
    case "avi":
    case "mkv":
    case "m4v":
      return "video";
    case "mp3":
    case "wav":
    case "ogg":
    case "flac":
    case "m4a":
    case "aac":
      return "audio";
    case "pdf":
      return "pdf";
    case "doc":
    case "docx":
    case "rtf":
    case "odt":
    case "pages":
      return "doc";
    case "xls":
    case "xlsx":
    case "csv":
    case "ods":
    case "numbers":
      return "sheet";
    case "ppt":
    case "pptx":
    case "key":
    case "odp":
      return "slide";
    case "zip":
    case "rar":
    case "7z":
    case "tar":
    case "gz":
    case "bz2":
      return "archive";
    case "ts":
    case "tsx":
    case "js":
    case "jsx":
    case "py":
    case "rb":
    case "go":
    case "rs":
    case "java":
    case "kt":
    case "swift":
    case "c":
    case "cc":
    case "cpp":
    case "h":
    case "hpp":
    case "cs":
    case "php":
    case "html":
    case "css":
    case "scss":
    case "json":
    case "yaml":
    case "yml":
    case "xml":
    case "sh":
    case "bash":
    case "sql":
      return "code";
    case "txt":
    case "md":
    case "log":
      return "text";
    default:
      return "other";
  }
}

export function formatBytes(bytes: number): string {
  if (!bytes || bytes < 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n >= 10 || i === 0 ? Math.round(n) : n.toFixed(1)} ${units[i]}`;
}

function fromSnapshot(id: string, data: Record<string, unknown>): UserFile {
  const name = (data.name as string) ?? "";
  const ext = (data.ext as string) ?? getFileExtension(name);
  const contentType = (data.contentType as string) ?? "";
  return {
    id,
    name,
    ext,
    category: (data.category as FileCategory) ?? categorizeFile(ext, contentType),
    contentType,
    size: typeof data.size === "number" ? data.size : 0,
    storagePath: (data.storagePath as string) ?? "",
    downloadURL: (data.downloadURL as string) ?? "",
    createdAt: tsToMs(data.createdAt),
  };
}

export function subscribeToUserFiles(
  db: Firestore,
  uid: string,
  cb: (files: UserFile[]) => void,
  onError?: (err: Error) => void,
): () => void {
  const q = query(filesCollection(db, uid), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => {
      const out: UserFile[] = [];
      snap.forEach((d) => out.push(fromSnapshot(d.id, d.data())));
      cb(out);
    },
    (err) => onError?.(err),
  );
}

export interface UploadProgress {
  /** 0..1 */
  progress: number;
  bytesTransferred: number;
  totalBytes: number;
}

export class StorageQuotaExceededError extends Error {
  constructor(public readonly need: number, public readonly available: number) {
    super(
      `File too large for remaining storage: needs ${formatBytes(need)}, only ${formatBytes(available)} free`,
    );
    this.name = "StorageQuotaExceededError";
  }
}

/**
 * Upload a file to the user's storage bucket and persist its metadata in
 * Firestore. Caller must provide `usedBytes` (the user's current usage, in
 * bytes) so we can enforce the 500 MB per-user quota client-side.
 */
export async function uploadUserFile(
  db: Firestore,
  storage: FirebaseStorage,
  uid: string,
  file: File,
  usedBytes: number,
  onProgress?: (p: UploadProgress) => void,
): Promise<UserFile> {
  const remaining = MAX_USER_STORAGE_BYTES - usedBytes;
  if (file.size > remaining) {
    throw new StorageQuotaExceededError(file.size, Math.max(0, remaining));
  }

  // Reserve a Firestore doc id so the storage path stays unique and stable.
  const docRef = doc(filesCollection(db, uid));
  const fileId = docRef.id;
  const safeName = file.name.replace(/[^\w.\-() ]+/g, "_");
  const storagePath = `users/${uid}/files/${fileId}-${safeName}`;
  const storageRef = ref(storage, storagePath);

  const task = uploadBytesResumable(storageRef, file, {
    contentType: file.type || "application/octet-stream",
  });

  await new Promise<void>((resolve, reject) => {
    task.on(
      "state_changed",
      (snap: UploadTaskSnapshot) => {
        if (!onProgress) return;
        onProgress({
          progress: snap.totalBytes ? snap.bytesTransferred / snap.totalBytes : 0,
          bytesTransferred: snap.bytesTransferred,
          totalBytes: snap.totalBytes,
        });
      },
      (err) => reject(err),
      () => resolve(),
    );
  });

  const downloadURL = await getDownloadURL(storageRef);
  const ext = getFileExtension(file.name);
  const contentType = file.type || "application/octet-stream";
  const category = categorizeFile(ext, contentType);

  await setDoc(docRef, {
    name: file.name,
    ext,
    category,
    contentType,
    size: file.size,
    storagePath,
    downloadURL,
    createdAt: serverTimestamp(),
  });

  return {
    id: fileId,
    name: file.name,
    ext,
    category,
    contentType,
    size: file.size,
    storagePath,
    downloadURL,
    createdAt: Date.now(),
  };
}

export async function deleteUserFile(
  db: Firestore,
  storage: FirebaseStorage,
  uid: string,
  file: UserFile,
): Promise<void> {
  // Best-effort storage delete first; if the blob is already gone we still want
  // the metadata doc to disappear so the UI stays clean.
  if (file.storagePath) {
    try {
      await deleteObject(ref(storage, file.storagePath));
    } catch {
      // Swallow — likely already deleted.
    }
  }
  await deleteDoc(doc(db, "users", uid, "files", file.id));
}
