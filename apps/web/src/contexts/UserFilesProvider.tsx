"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useFirebase } from "@/contexts/FirebaseProvider";
import {
  deleteUserFile,
  subscribeToUserFiles,
  uploadUserFile,
  MAX_USER_STORAGE_BYTES,
  type UploadProgress,
  type UserFile,
} from "@/lib/firebase/files";

export interface ActiveUpload {
  /** Local id used only by the UI. */
  id: string;
  name: string;
  size: number;
  progress: number;
  bytesTransferred: number;
}

interface UserFilesContextValue {
  files: UserFile[];
  loading: boolean;
  usedBytes: number;
  totalBytes: number;
  uploads: ActiveUpload[];
  /** Upload a single file. Resolves with the persisted metadata. */
  upload: (file: File) => Promise<UserFile>;
  /** Upload multiple files in parallel. */
  uploadMany: (files: FileList | File[]) => Promise<void>;
  remove: (file: UserFile) => Promise<void>;
}

const UserFilesContext = createContext<UserFilesContextValue | null>(null);

export function useUserFiles(): UserFilesContextValue {
  const ctx = useContext(UserFilesContext);
  if (!ctx) throw new Error("useUserFiles must be used within UserFilesProvider");
  return ctx;
}

export function UserFilesProvider({ children }: { children: ReactNode }) {
  const { services, user } = useFirebase();
  const [files, setFiles] = useState<UserFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploads, setUploads] = useState<ActiveUpload[]>([]);

  useEffect(() => {
    if (!services || !user) {
      setFiles([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsub = subscribeToUserFiles(
      services.db,
      user.uid,
      (next) => {
        setFiles(next);
        setLoading(false);
      },
      () => setLoading(false),
    );
    return () => unsub();
  }, [services, user]);

  const usedBytes = useMemo(
    () => files.reduce((sum, f) => sum + (f.size || 0), 0),
    [files],
  );

  const upload = useCallback(
    async (file: File) => {
      if (!services || !user) throw new Error("Not signed in");
      const localId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setUploads((u) => [
        ...u,
        { id: localId, name: file.name, size: file.size, progress: 0, bytesTransferred: 0 },
      ]);
      const onProgress = (p: UploadProgress) => {
        setUploads((u) =>
          u.map((up) =>
            up.id === localId
              ? { ...up, progress: p.progress, bytesTransferred: p.bytesTransferred }
              : up,
          ),
        );
      };
      try {
        const result = await uploadUserFile(
          services.db,
          services.storage,
          user.uid,
          file,
          usedBytes,
          onProgress,
        );
        return result;
      } finally {
        setUploads((u) => u.filter((up) => up.id !== localId));
      }
    },
    [services, user, usedBytes],
  );

  const uploadMany = useCallback(
    async (incoming: FileList | File[]) => {
      const list = Array.from(incoming as ArrayLike<File>);
      // Sequential to keep client-side quota math accurate (each upload bumps
      // usedBytes via the snapshot listener, but we await one at a time so a
      // batch can't blow past the 500 MB limit).
      for (const f of list) {
        // eslint-disable-next-line no-await-in-loop
        await upload(f);
      }
    },
    [upload],
  );

  const remove = useCallback(
    async (file: UserFile) => {
      if (!services || !user) throw new Error("Not signed in");
      await deleteUserFile(services.db, services.storage, user.uid, file);
    },
    [services, user],
  );

  const value = useMemo<UserFilesContextValue>(
    () => ({
      files,
      loading,
      usedBytes,
      totalBytes: MAX_USER_STORAGE_BYTES,
      uploads,
      upload,
      uploadMany,
      remove,
    }),
    [files, loading, usedBytes, uploads, upload, uploadMany, remove],
  );

  return <UserFilesContext.Provider value={value}>{children}</UserFilesContext.Provider>;
}
