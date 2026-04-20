"use client";

import { useState } from "react";
import { Code2, X, CheckCircle, Clipboard } from "lucide-react";
import { categories } from "../data/categories";
import { widgetCodeMap } from "../data/widgetCodeMap";
import type { WidgetCategory } from "../types";

interface WidgetCodeModalProps {
  widget: { name: string; category: WidgetCategory };
  onClose: () => void;
}

export default function WidgetCodeModal({ widget, onClose }: WidgetCodeModalProps) {
  const [copied, setCopied] = useState(false);
  const entry = widgetCodeMap[widget.name];
  const categoryLabel =
    categories.find((c) => c.key === widget.category)?.label ?? widget.category;

  const handleCopy = async () => {
    if (!entry?.code) return;
    try {
      await navigator.clipboard.writeText(entry.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-border-light bg-card shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 px-5 py-4 border-b border-border-light">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Code2 className="w-4 h-4 text-primary-500 shrink-0" />
              <h2 className="text-[15px] font-semibold text-text-primary truncate">
                {widget.name}
              </h2>
              <span className="text-[10.5px] text-text-muted capitalize px-2 py-0.5 rounded-full bg-hover-bg border border-border-light">
                {categoryLabel}
              </span>
            </div>
            {entry?.description && (
              <p className="text-[12.5px] text-text-secondary leading-relaxed">
                {entry.description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg hover:bg-hover-bg text-text-muted shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {entry?.dependencies && entry.dependencies.length > 0 && (
          <div className="px-5 py-2.5 border-b border-border-light flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
              Dependencies
            </span>
            {entry.dependencies.map((dep) => (
              <span
                key={dep}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-hover-bg border border-border-light text-text-secondary"
              >
                {dep}
              </span>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-auto bg-hover-bg/40 relative">
          {entry?.code ? (
            <>
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-card border border-border-light text-[11.5px] font-medium text-text-secondary hover:text-text-primary hover:border-primary-300 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
              <pre className="text-[12.5px] leading-relaxed p-5 pr-20 font-mono text-text-primary whitespace-pre overflow-x-auto">
                {entry.code}
              </pre>
            </>
          ) : (
            <div className="p-10 text-center text-[13px] text-text-muted">
              Code snippet for this widget is not available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

