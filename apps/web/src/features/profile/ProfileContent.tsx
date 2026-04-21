"use client";

import { useEffect, useRef, useState } from "react";
import {
  User as UserIcon,
  Mail,
  Bell,
  Shield,
  Globe,
  CreditCard,
  KeyRound,
  LogOut,
  Camera,
  ChevronRight,
  Menu,
  Loader2,
  Check,
} from "lucide-react";

import { useFirebase } from "@/contexts/FirebaseProvider";
import { useUserProfile } from "@/contexts/UserProfileProvider";
import { useChatStore } from "@/contexts/ChatStoreProvider";
import { useToast } from "@/contexts/ToastProvider";

const settingsSections = [
  {
    title: "Account",
    items: [
      { icon: Mail, label: "Email Settings", desc: "Manage email preferences and notifications" },
      { icon: KeyRound, label: "Password & Security", desc: "Change password and enable 2FA" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", desc: "Configure push and email notifications" },
      { icon: Globe, label: "Language & Region", desc: "Set your preferred language and timezone" },
      { icon: Shield, label: "Privacy", desc: "Manage data sharing and visibility" },
    ],
  },
  {
    title: "Billing",
    items: [
      { icon: CreditCard, label: "Subscription", desc: "Manage your plan and payment methods" },
    ],
  },
];

function memberSince(ts: number): string {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString([], { month: "short", year: "numeric" });
}

function computeInitials(name: string): string {
  return (name || "S A")
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ProfileContent({ onMobileMenuOpen }: { onMobileMenuOpen?: () => void }) {
  const { user, signOut } = useFirebase();
  const { profile, loading, updateProfile, uploadAvatar } = useUserProfile();
  const { conversations } = useChatStore();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Sync local form state when profile loads / changes externally.
  useEffect(() => {
    if (!profile) return;
    if (editing) return; // don't clobber unsaved edits
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setBio(profile.bio);
  }, [profile, editing]);

  const displayName = profile?.displayName || user?.displayName || "Anonymous";
  const email = profile?.email || user?.email || "";
  const photoURL = profile?.photoURL || user?.photoURL || "";
  const initials = computeInitials(displayName);

  const handleStartEdit = () => {
    if (!profile) return;
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setBio(profile.bio);
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setBio(profile.bio);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        bio: bio.trim(),
      });
      toast("Profile updated", { type: "success" });
      setEditing(false);
    } catch (err) {
      toast("Failed to save", {
        type: "warning",
        description: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast("Please choose an image file", { type: "warning" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast("Image must be under 5 MB", { type: "warning" });
      return;
    }
    setUploading(true);
    try {
      await uploadAvatar(file);
      toast("Avatar updated", { type: "success" });
    } catch (err) {
      toast("Failed to upload avatar", {
        type: "warning",
        description: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      toast("Sign out failed", {
        type: "warning",
        description: err instanceof Error ? err.message : String(err),
      });
    }
  };

  return (
    <main className="flex-1 flex flex-col h-screen bg-background overflow-hidden">
      <header className="shrink-0 px-4 md:px-8 pt-6 pb-4 border-b border-border-light">
        <div className="max-w-[960px] mx-auto">
          <div className="flex items-center gap-2">
            <button onClick={onMobileMenuOpen} className="md:hidden p-2 -ml-2 rounded-lg hover:bg-hover-bg text-text-muted">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-[20px] md:text-[24px] font-bold text-text-primary">Profile</h1>
          </div>
          <p className="text-[14px] text-text-secondary mt-1">
            Manage your account settings and preferences
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        <div className="max-w-[960px] mx-auto space-y-6">
          {/* Profile Card */}
          <div className="rounded-2xl border border-border-light bg-card p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <div className="relative group">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center text-white text-[24px] font-bold">
                  {photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photoURL} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
                <button
                  onClick={handleAvatarClick}
                  disabled={uploading}
                  className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-not-allowed"
                  title="Change avatar"
                >
                  {uploading ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <Camera className="w-5 h-5 text-white" />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-[20px] font-bold text-text-primary truncate">{displayName}</h2>
                <p className="text-[14px] text-text-muted mt-0.5 truncate">{email}</p>
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full bg-primary-500/10 text-primary-500 text-[11px] font-semibold">
                    Free
                  </span>
                  <span className="text-[12px] text-text-muted">
                    Member since {memberSince(profile?.createdAt ?? 0)}
                  </span>
                </div>
              </div>
              {!editing && (
                <button
                  onClick={handleStartEdit}
                  disabled={loading || !profile}
                  className="px-4 py-2 rounded-xl border border-border-light bg-card hover:bg-hover-bg text-[13px] font-medium text-text-primary transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {editing && (
              <div className="mt-6 pt-6 border-t border-border-light space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-medium text-text-muted mb-1.5">
                      First name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border-light bg-input-bg text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-primary-300 focus:bg-card transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-text-muted mb-1.5">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border-light bg-input-bg text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-primary-300 focus:bg-card transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-text-muted mb-1.5">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="A short bio about you"
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-light bg-input-bg text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-primary-300 focus:bg-card transition-colors resize-none"
                  />
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={handleCancelEdit}
                    disabled={saving}
                    className="px-4 py-2 rounded-xl border border-border-light bg-card hover:bg-hover-bg text-[13px] font-medium text-text-primary transition-colors cursor-pointer disabled:opacity-40"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-[13px] font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    Save changes
                  </button>
                </div>
              </div>
            )}

            {!editing && profile?.bio && (
              <div className="mt-5 pt-5 border-t border-border-light">
                <p className="text-[13px] text-text-secondary whitespace-pre-wrap">{profile.bio}</p>
              </div>
            )}
          </div>

          {/* Usage Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Conversations", value: conversations.length.toString() },
              {
                label: "Messages",
                value: conversations.reduce((sum, c) => sum + (c.messageCount || 0), 0).toLocaleString(),
              },
              {
                label: "Starred",
                value: conversations.filter((c) => c.starred).length.toString(),
              },
              {
                label: "Last active",
                value:
                  conversations.length > 0
                    ? new Date(
                        Math.max(...conversations.map((c) => c.updatedAt || c.createdAt)),
                      ).toLocaleDateString([], { month: "short", day: "numeric" })
                    : "—",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border-light bg-card p-4 text-center"
              >
                <p className="text-[22px] font-bold text-text-primary">{stat.value}</p>
                <p className="text-[12px] text-text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Account info */}
          <div>
            <h3 className="text-[13px] font-semibold text-text-muted uppercase tracking-wider mb-3">
              Account
            </h3>
            <div className="rounded-xl border border-border-light bg-card divide-y divide-border-light overflow-hidden">
              <button
                onClick={handleStartEdit}
                disabled={!profile}
                className="w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-hover-bg transition-colors cursor-pointer text-left disabled:opacity-40"
              >
                <div className="w-9 h-9 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                  <UserIcon className="w-4 h-4 text-primary-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-text-primary">Edit Profile</p>
                  <p className="text-[12px] text-text-muted mt-0.5">Update your name, bio, and avatar</p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
              </button>
              {settingsSections[0].items.map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-hover-bg transition-colors cursor-pointer text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-primary-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-text-primary">{item.label}</p>
                    <p className="text-[12px] text-text-muted mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Other Settings */}
          {settingsSections.slice(1).map((section) => (
            <div key={section.title}>
              <h3 className="text-[13px] font-semibold text-text-muted uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <div className="rounded-xl border border-border-light bg-card divide-y divide-border-light overflow-hidden">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-hover-bg transition-colors cursor-pointer text-left"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-primary-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-text-primary">{item.label}</p>
                      <p className="text-[12px] text-text-muted mt-0.5">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 text-[13px] font-medium transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}
