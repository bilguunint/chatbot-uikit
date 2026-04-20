import type { WidgetCategory } from "../types";

export const categories: { key: WidgetCategory; label: string }[] = [
  { key: "all", label: "All Widgets" },
  { key: "ai-kit", label: "AI Kit (Opus 4.7)" },
  { key: "data", label: "Data & Charts" },
  { key: "profile", label: "Profile & Users" },
  { key: "controls", label: "Controls & Inputs" },
  { key: "chat", label: "Chat & Messages" },
  { key: "feedback", label: "Feedback & Ratings" },
];
