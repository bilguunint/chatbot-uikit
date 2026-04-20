export type WidgetCategory =
  | "all"
  | "ai-kit"
  | "data"
  | "profile"
  | "controls"
  | "chat"
  | "feedback";

export interface WidgetCardItem {
  category: WidgetCategory;
  name: string;
  Component: React.ComponentType;
  fullWidth?: boolean;
}
