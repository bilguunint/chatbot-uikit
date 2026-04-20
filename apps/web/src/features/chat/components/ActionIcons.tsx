"use client";

import { Copy, ThumbsUp, ThumbsDown, Pin, RefreshCw, MoreHorizontal } from "lucide-react";

export default function ActionIcons() {
  return (
    <div className="flex items-center gap-1 mt-3">
      {[Copy, ThumbsUp, ThumbsDown, Pin, RefreshCw, MoreHorizontal].map((Icon, i) => (
        <button key={i} className="p-1.5 rounded-lg hover:bg-hover-bg text-text-muted hover:text-text-secondary transition-colors">
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
}
