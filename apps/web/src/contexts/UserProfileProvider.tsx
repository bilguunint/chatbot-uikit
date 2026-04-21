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
  ensureUserProfile,
  subscribeToUserProfile,
  updateUserProfile,
  uploadProfileImage,
  type ProfileUpdate,
  type UserProfile,
} from "@/lib/firebase/profile";

interface UserProfileContextValue {
  profile: UserProfile | null;
  loading: boolean;
  /** Update first/last name, bio, or photoURL. */
  updateProfile: (update: ProfileUpdate) => Promise<void>;
  /** Upload an avatar file and persist its URL on the profile. */
  uploadAvatar: (file: File) => Promise<string>;
}

const UserProfileContext = createContext<UserProfileContextValue | null>(null);

export function useUserProfile(): UserProfileContextValue {
  const ctx = useContext(UserProfileContext);
  if (!ctx) throw new Error("useUserProfile must be used within UserProfileProvider");
  return ctx;
}

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const { services, user } = useFirebase();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  // Seed the profile doc on first sign-in, then subscribe.
  useEffect(() => {
    if (!services || !user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        await ensureUserProfile(services.db, user);
      } catch {
        // Ignore — subscription will surface real errors via the snapshot.
      }
      if (cancelled) return;
      const unsub = subscribeToUserProfile(
        services.db,
        user.uid,
        (p) => {
          if (cancelled) return;
          setProfile(p);
          setLoading(false);
        },
        () => {
          if (cancelled) return;
          setLoading(false);
        },
      );
      return unsub;
    })();
    return () => {
      cancelled = true;
    };
  }, [services, user]);

  const updateProfile = useCallback(
    async (update: ProfileUpdate) => {
      if (!services || !user) throw new Error("Not signed in");
      await updateUserProfile(services.db, user, update);
    },
    [services, user],
  );

  const uploadAvatar = useCallback(
    async (file: File) => {
      if (!services || !user) throw new Error("Not signed in");
      const url = await uploadProfileImage(services.storage, user.uid, file);
      await updateUserProfile(services.db, user, { photoURL: url });
      return url;
    },
    [services, user],
  );

  const value = useMemo<UserProfileContextValue>(
    () => ({ profile, loading, updateProfile, uploadAvatar }),
    [profile, loading, updateProfile, uploadAvatar],
  );

  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>;
}
