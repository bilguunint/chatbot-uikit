// User profile stored at `users/{uid}/profile/main`. Kept in its own
// subcollection so it doesn't interfere with the chat-history docs that
// live under `users/{uid}/conversations/...`.

import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  type Firestore,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, type FirebaseStorage } from "firebase/storage";
import { updateProfile as fbUpdateProfile, type User } from "firebase/auth";

export interface UserProfile {
  uid: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  photoURL: string;
  bio: string;
  createdAt: number;
  updatedAt: number;
}

const PROFILE_DOC = (uid: string) => ["users", uid, "profile", "main"] as const;

function profileRef(db: Firestore, uid: string) {
  const [a, b, c, d] = PROFILE_DOC(uid);
  return doc(db, a, b, c, d);
}

function tsToMs(value: unknown): number {
  if (!value) return 0;
  if (value instanceof Timestamp) return value.toMillis();
  if (typeof value === "number") return value;
  return 0;
}

function splitDisplayName(name: string | null | undefined): { firstName: string; lastName: string } {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function fromSnapshot(uid: string, data: Record<string, unknown> | undefined): UserProfile | null {
  if (!data) return null;
  return {
    uid,
    firstName: (data.firstName as string) ?? "",
    lastName: (data.lastName as string) ?? "",
    displayName: (data.displayName as string) ?? "",
    email: (data.email as string) ?? "",
    photoURL: (data.photoURL as string) ?? "",
    bio: (data.bio as string) ?? "",
    createdAt: tsToMs(data.createdAt),
    updatedAt: tsToMs(data.updatedAt),
  };
}

/**
 * Create the profile doc on first sign-in if it doesn't already exist.
 * Seeds first/last name + photo from the Firebase Auth user.
 */
export async function ensureUserProfile(db: Firestore, user: User): Promise<void> {
  const ref = profileRef(db, user.uid);
  const existing = await getDoc(ref);
  if (existing.exists()) return;
  const { firstName, lastName } = splitDisplayName(user.displayName);
  await setDoc(ref, {
    uid: user.uid,
    firstName,
    lastName,
    displayName: user.displayName ?? `${firstName} ${lastName}`.trim(),
    email: user.email ?? "",
    photoURL: user.photoURL ?? "",
    bio: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export function subscribeToUserProfile(
  db: Firestore,
  uid: string,
  cb: (profile: UserProfile | null) => void,
  onError?: (err: Error) => void,
): () => void {
  return onSnapshot(
    profileRef(db, uid),
    (snap) => cb(fromSnapshot(uid, snap.data())),
    (err) => onError?.(err),
  );
}

export interface ProfileUpdate {
  firstName?: string;
  lastName?: string;
  bio?: string;
  photoURL?: string;
}

/**
 * Persist a partial profile update. Recomputes `displayName` from first/last
 * and mirrors `displayName` + `photoURL` to the Firebase Auth user record so
 * other surfaces (Sidebar fallback, custom claims, etc.) stay in sync.
 */
export async function updateUserProfile(
  db: Firestore,
  user: User,
  update: ProfileUpdate,
): Promise<void> {
  const current = await getDoc(profileRef(db, user.uid));
  const prev = fromSnapshot(user.uid, current.data()) ?? {
    uid: user.uid,
    firstName: "",
    lastName: "",
    displayName: user.displayName ?? "",
    email: user.email ?? "",
    photoURL: user.photoURL ?? "",
    bio: "",
    createdAt: 0,
    updatedAt: 0,
  };

  const firstName = update.firstName ?? prev.firstName;
  const lastName = update.lastName ?? prev.lastName;
  const photoURL = update.photoURL ?? prev.photoURL;
  const bio = update.bio ?? prev.bio;
  const displayName = `${firstName} ${lastName}`.trim() || prev.displayName;

  await setDoc(
    profileRef(db, user.uid),
    {
      uid: user.uid,
      firstName,
      lastName,
      displayName,
      email: prev.email || user.email || "",
      photoURL,
      bio,
      ...(prev.createdAt ? {} : { createdAt: serverTimestamp() }),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );

  // Mirror to Firebase Auth so user.displayName / user.photoURL match.
  if (displayName !== user.displayName || photoURL !== user.photoURL) {
    await fbUpdateProfile(user, {
      displayName: displayName || null,
      photoURL: photoURL || null,
    }).catch(() => undefined);
  }
}

/** Upload an avatar image to Storage and return its public download URL. */
export async function uploadProfileImage(
  storage: FirebaseStorage,
  uid: string,
  file: File,
): Promise<string> {
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const path = `users/${uid}/avatar.${ext}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file, { contentType: file.type || "image/jpeg" });
  return getDownloadURL(storageRef);
}
