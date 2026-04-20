export type ActiveView = "home" | "explore" | "library" | "files" | "history" | "widgets" | "theme" | "profile";

export type ResponseType = "default" | "code" | "file" | "audio" | "image";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  thinkingTime?: number;
  responseType?: ResponseType;
}
