"use client";

import { useState } from "react";
import { Search, Code2, Menu } from "lucide-react";
import { categories } from "./data/categories";
import { widgetRegistry } from "./data/widgetRegistry";
import type { WidgetCategory } from "./types";
import WidgetCodeModal from "./modals/WidgetCodeModal";

export default function WidgetsContent({ onMobileMenuOpen }: { onMobileMenuOpen?: () => void }) {
  const [activeCategory, setActiveCategory] = useState<WidgetCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWidget, setSelectedWidget] = useState<{ name: string; category: WidgetCategory } | null>(null);

  const filtered = widgetRegistry.filter((w) => {
    const matchCat = activeCategory === "all" || w.category === activeCategory;
    const matchSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="flex-1 flex flex-col h-screen bg-background overflow-hidden">
      <header className="shrink-0 px-4 md:px-8 pt-6 pb-4 border-b border-border-light">
        <div className="max-w-[1060px] mx-auto">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2.5">
              <button onClick={onMobileMenuOpen} className="md:hidden p-2 -ml-2 rounded-lg hover:bg-hover-bg text-text-muted">
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-[20px] md:text-[24px] font-bold text-text-primary">Widgets</h1>
              <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary-600 text-[11px] font-semibold">
                {widgetRegistry.length} components
              </span>
            </div>
          </div>
          <p className="text-[14px] text-text-secondary mb-5">
            Ready-to-use AI chatbot widget components for developers
          </p>
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search widgets..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-light bg-hover-bg text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-primary-300 focus:bg-card transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium transition-colors ${
                  activeCategory === cat.key
                    ? "bg-primary-500 text-white"
                    : "bg-hover-bg text-text-secondary hover:bg-hover-bg"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((w) => {
            const Component = w.Component;
            return (
              <div
                key={w.name}
                className={`flex flex-col rounded-xl border border-border-light bg-card hover:border-primary-200 hover:shadow-md transition-all overflow-hidden group ${
                  w.fullWidth ? "sm:col-span-2 lg:col-span-3" : ""
                }`}
              >
                <div className="p-4 flex-1"><Component /></div>
                <div className="px-4 py-2.5 border-t border-border-light bg-hover-bg/50 flex items-center justify-between mt-auto">
                  <span className="text-[12px] font-semibold text-text-primary">{w.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedWidget({ name: w.name, category: w.category })}
                      className="text-[10px] text-primary-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 px-2 py-1 rounded-md hover:bg-primary-50 cursor-pointer"
                    >
                      <Code2 className="w-3 h-3" /> View Code
                    </button>
                    <span className="text-[10.5px] text-text-muted capitalize px-2 py-0.5 rounded-full bg-card border border-border-light">
                      {categories.find((c) => c.key === w.category)?.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedWidget && (
        <WidgetCodeModal widget={selectedWidget} onClose={() => setSelectedWidget(null)} />
      )}
    </main>
  );
}
