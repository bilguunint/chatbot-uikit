"use client";

import { useMemo, useRef, useState } from "react";
import {
  Search,
  Upload,
  FileText,
  FileImage,
  FileSpreadsheet,
  FileCode,
  FileArchive,
  File as FileIcon,
  Film,
  Music,
  Presentation,
  Download,
  Trash2,
  Grid3X3,
  List,
  SortAsc,
  HardDrive,
  Menu,
  Loader2,
  AlertTriangle,
} from "lucide-react";

import { useUserFiles } from "@/contexts/UserFilesProvider";
import { useToast } from "@/contexts/ToastProvider";
import {
  formatBytes,
  StorageQuotaExceededError,
  type FileCategory,
  type UserFile,
} from "@/lib/firebase/files";

type ViewMode = "grid" | "list";
type SortMode = "recent" | "name" | "size";

const CATEGORY_STYLE: Record<
  FileCategory,
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  image: { label: "Image", icon: FileImage, color: "from-violet-500 to-indigo-500" },
  video: { label: "Video", icon: Film, color: "from-pink-500 to-rose-500" },
  audio: { label: "Audio", icon: Music, color: "from-fuchsia-500 to-purple-500" },
  pdf: { label: "PDF", icon: FileText, color: "from-red-500 to-rose-500" },
  doc: { label: "Doc", icon: FileText, color: "from-blue-500 to-sky-500" },
  sheet: { label: "Sheet", icon: FileSpreadsheet, color: "from-emerald-500 to-teal-500" },
  slide: { label: "Slides", icon: Presentation, color: "from-orange-500 to-amber-500" },
  code: { label: "Code", icon: FileCode, color: "from-cyan-500 to-blue-500" },
  archive: { label: "Archive", icon: FileArchive, color: "from-amber-500 to-orange-500" },
  text: { label: "Text", icon: FileText, color: "from-slate-500 to-gray-500" },
  other: { label: "File", icon: FileIcon, color: "from-zinc-500 to-slate-500" },
};

function relativeTime(ms: number): string {
  if (!ms) return "—";
  const diff = Date.now() - ms;
  const sec = Math.round(diff / 1000);
  if (sec < 60) return "just now";
  const min = Math.round(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  if (day < 7) return `${day}d ago`;
  const wk = Math.round(day / 7);
  if (wk < 5) return `${wk}w ago`;
  const mo = Math.round(day / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.round(day / 365)}y ago`;
}

export default function FilesContent({ onMobileMenuOpen }: { onMobileMenuOpen?: () => void }) {
  const { files, loading, usedBytes, totalBytes, uploads, uploadMany, remove } = useUserFiles();
  const { toast } = useToast();

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortMode, setSortMode] = useState<SortMode>("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = q ? files.filter((f) => f.name.toLowerCase().includes(q)) : files;
    const sorted = [...list];
    if (sortMode === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortMode === "size") sorted.sort((a, b) => b.size - a.size);
    else sorted.sort((a, b) => b.createdAt - a.createdAt);
    return sorted;
  }, [files, searchQuery, sortMode]);

  const usedMB = usedBytes / (1024 * 1024);
  const totalMB = totalBytes / (1024 * 1024);
  const pct = Math.min(100, totalBytes ? (usedBytes / totalBytes) * 100 : 0);
  const nearLimit = pct >= 90;
  const overLimit = usedBytes >= totalBytes;

  async function handleFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    try {
      await uploadMany(list);
      toast(`Uploaded ${list.length} file${list.length > 1 ? "s" : ""}`, { type: "success" });
    } catch (err) {
      if (err instanceof StorageQuotaExceededError) {
        toast("Storage limit reached", {
          type: "warning",
          description: `Only ${formatBytes(err.available)} free in your 500 MB.`,
        });
      } else {
        toast("Upload failed", {
          type: "warning",
          description: err instanceof Error ? err.message : String(err),
        });
      }
    }
  }

  function openPicker() {
    fileInputRef.current?.click();
  }

  function cycleSort() {
    setSortMode((s) => (s === "recent" ? "name" : s === "name" ? "size" : "recent"));
  }

  async function handleDelete(file: UserFile) {
    if (typeof window !== "undefined" && !window.confirm(`Delete ${file.name}?`)) return;
    try {
      await remove(file);
      toast("File deleted", { type: "success" });
    } catch (err) {
      toast("Delete failed", {
        type: "warning",
        description: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return (
    <main className="flex-1 flex flex-col h-screen bg-background overflow-hidden">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        hidden
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {/* Header */}
      <header className="shrink-0 px-4 md:px-8 pt-6 pb-4 border-b border-border-light">
        <div className="max-w-[960px] mx-auto">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <button
                onClick={onMobileMenuOpen}
                className="md:hidden p-2 -ml-2 rounded-lg hover:bg-hover-bg text-text-muted"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-[20px] md:text-[24px] font-bold text-text-primary">Files</h1>
            </div>
            <button
              onClick={openPicker}
              disabled={overLimit}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[12.5px] font-medium transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload file
            </button>
          </div>
          <p className="text-[14px] text-text-secondary mb-5">
            Upload up to 500 MB to your personal Firebase Storage bucket
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-light bg-input-bg text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-primary-300 focus:bg-card transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={cycleSort}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-border-light text-text-muted hover:bg-card-hover text-[12.5px] transition-colors capitalize"
                title={`Sort: ${sortMode}`}
              >
                <SortAsc className="w-3.5 h-3.5" />
                {sortMode}
              </button>
              <div className="flex rounded-xl border border-border-light overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 transition-colors ${
                    viewMode === "grid"
                      ? "bg-primary-50 text-primary-500"
                      : "text-text-muted hover:bg-card-hover"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 border-l border-border-light transition-colors ${
                    viewMode === "list"
                      ? "bg-primary-50 text-primary-500"
                      : "text-text-muted hover:bg-card-hover"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        <div className="max-w-[960px] mx-auto">
          <div
            className={`flex items-center gap-3 mb-4 p-4 rounded-xl border ${
              overLimit
                ? "bg-red-50/40 border-red-200"
                : nearLimit
                  ? "bg-amber-50/40 border-amber-200"
                  : "bg-input-bg border-border-light"
            }`}
          >
            <HardDrive
              className={`w-5 h-5 shrink-0 ${
                overLimit ? "text-red-500" : nearLimit ? "text-amber-500" : "text-primary-500"
              }`}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[13px] font-medium text-text-primary">Storage</span>
                <span className="text-[12px] text-text-muted">
                  {usedMB.toFixed(usedMB >= 10 ? 0 : 1)} MB / {totalMB.toFixed(0)} MB
                  <span className="ml-2 text-text-muted/70">({pct.toFixed(0)}%)</span>
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-border-light overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    overLimit
                      ? "bg-gradient-to-r from-red-500 to-rose-500"
                      : nearLimit
                        ? "bg-gradient-to-r from-amber-400 to-orange-500"
                        : "bg-gradient-to-r from-primary-400 to-primary-600"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>

          {uploads.length > 0 && (
            <div className="mb-4 space-y-2">
              {uploads.map((up) => (
                <div
                  key={up.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border-light bg-card"
                >
                  <Loader2 className="w-4 h-4 text-primary-500 animate-spin shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12.5px] font-medium text-text-primary truncate">
                        {up.name}
                      </span>
                      <span className="text-[11px] text-text-muted ml-2 shrink-0">
                        {Math.round(up.progress * 100)}%
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-border-light overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all"
                        style={{ width: `${Math.round(up.progress * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20 text-text-muted">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              <span className="text-[13px]">Loading files...</span>
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState onUpload={openPicker} hasSearch={searchQuery.trim().length > 0} />
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {filtered.map((file) => (
                <FileGridCard key={file.id} file={file} onDelete={() => handleDelete(file)} />
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-4 px-4 py-2 text-[11px] font-medium text-text-muted uppercase tracking-wide">
                <span className="flex-1">Name</span>
                <span className="w-20 hidden sm:block">Type</span>
                <span className="w-20 text-right hidden sm:block">Size</span>
                <span className="w-24 text-right hidden sm:block">Modified</span>
                <span className="w-16" />
              </div>
              {filtered.map((file) => (
                <FileListRow key={file.id} file={file} onDelete={() => handleDelete(file)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function FileGridCard({ file, onDelete }: { file: UserFile; onDelete: () => void }) {
  const style = CATEGORY_STYLE[file.category] ?? CATEGORY_STYLE.other;
  const Icon = style.icon;
  return (
    <div className="group flex flex-col p-4 rounded-xl border border-border-light bg-card hover:border-primary-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${style.color} flex items-center justify-center`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={file.downloadURL}
            target="_blank"
            rel="noreferrer"
            download={file.name}
            className="p-1 rounded-md hover:bg-hover-bg text-text-muted"
            title="Download"
          >
            <Download className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onDelete}
            className="p-1 rounded-md hover:bg-hover-bg text-text-muted hover:text-red-500"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <p className="text-[12.5px] font-medium text-text-primary truncate" title={file.name}>
        {file.name}
      </p>
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[11px] text-text-muted uppercase">
          {file.ext || style.label}
        </span>
        <span className="text-[11px] text-text-muted">{formatBytes(file.size)}</span>
      </div>
    </div>
  );
}

function FileListRow({ file, onDelete }: { file: UserFile; onDelete: () => void }) {
  const style = CATEGORY_STYLE[file.category] ?? CATEGORY_STYLE.other;
  const Icon = style.icon;
  return (
    <div className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-card-hover transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${style.color} flex items-center justify-center shrink-0`}
        >
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span
          className="text-[13px] font-medium text-text-primary truncate"
          title={file.name}
        >
          {file.name}
        </span>
      </div>
      <span className="w-20 text-[12px] text-text-muted hidden sm:block uppercase">
        {file.ext || style.label}
      </span>
      <span className="w-20 text-[12px] text-text-muted text-right hidden sm:block">
        {formatBytes(file.size)}
      </span>
      <span className="w-24 text-[12px] text-text-muted text-right hidden sm:block">
        {relativeTime(file.createdAt)}
      </span>
      <div className="w-16 flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <a
          href={file.downloadURL}
          target="_blank"
          rel="noreferrer"
          download={file.name}
          className="p-1 rounded-md hover:bg-hover-bg text-text-muted"
          title="Download"
        >
          <Download className="w-3.5 h-3.5" />
        </a>
        <button
          onClick={onDelete}
          className="p-1 rounded-md hover:bg-hover-bg text-text-muted hover:text-red-500"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function EmptyState({ onUpload, hasSearch }: { onUpload: () => void; hasSearch: boolean }) {
  if (hasSearch) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertTriangle className="w-8 h-8 text-text-muted mb-3" />
        <p className="text-[13px] text-text-muted">No files match your search.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
        <Upload className="w-6 h-6 text-primary-500" />
      </div>
      <h3 className="text-[15px] font-semibold text-text-primary mb-1">No files yet</h3>
      <p className="text-[13px] text-text-muted mb-4 max-w-xs">
        Upload documents, images, audio, or video. Up to 500 MB total.
      </p>
      <button
        onClick={onUpload}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-[13px] font-medium transition-colors"
      >
        <Upload className="w-3.5 h-3.5" />
        Upload your first file
      </button>
    </div>
  );
}
