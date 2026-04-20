import {
  Sparkles,
  RotateCcw,
  Lightbulb,
  ClipboardCheck,
  Code2,
  FileDown,
  AudioLines,
  Image as ImageIcon,
} from "lucide-react";
import type { ResponseType } from "@/types";

export const aiModels = [
  { id: "sondor-4o", name: "Sondor 4o", desc: "Fastest model for everyday tasks", badge: null },
  { id: "sondor-ultra", name: "Sondor Ultra", desc: "Deep reasoning for complex problems", badge: "Pro" },
  { id: "sondor-vision", name: "Sondor Vision", desc: "Analyze images and visual content", badge: null },
  { id: "sondor-code", name: "Sondor Code", desc: "Specialized in writing and debugging code", badge: null },
  { id: "sondor-mini", name: "Sondor Mini", desc: "Lightweight and fast responses", badge: "Free" },
  { id: "sondor-reason", name: "Sondor Reason", desc: "Logic, math, and scientific reasoning", badge: "New" },
];

export const researchOptions: { id: ResponseType; icon: typeof Sparkles; label: string; desc: string; color: string }[] = [
  { id: "default", icon: Sparkles, label: "Default", desc: "Standard response", color: "text-primary-500 bg-primary-500/10" },
  { id: "code", icon: Code2, label: "Coding", desc: "Code generation", color: "text-emerald-500 bg-emerald-500/10" },
  { id: "file", icon: FileDown, label: "File", desc: "File sharing", color: "text-blue-500 bg-blue-500/10" },
  { id: "audio", icon: AudioLines, label: "Audio", desc: "Audio player", color: "text-amber-500 bg-amber-500/10" },
  { id: "image", icon: ImageIcon, label: "Image", desc: "Image preview", color: "text-rose-500 bg-rose-500/10" },
];

const mockResponses: Record<string, string> = {
  default:
    "Hello! I'm Sondor AI assistant. Just tell me what you need, and I'll help you in the best way possible.",
};

export function getMockResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey"))
    return "Hi there! I'm here to help. Just let me know what you need, and I'll assist you right away.";
  if (lower.includes("plan") || lower.includes("schedule") || lower.includes("organize"))
    return "I'd love to help you plan! Let's start by defining your goals, then break them down step by step. What type of plan do you need? For example: weekly, monthly, or project-based planning.";
  if (lower.includes("code") || lower.includes("program") || lower.includes("develop"))
    return "I'd be happy to help with coding! What programming language are you working with? JavaScript, Python, TypeScript, or something else? Also, please describe what functionality you need in detail.";
  if (lower.includes("idea") || lower.includes("brainstorm") || lower.includes("creative"))
    return "Let me help you brainstorm! What area do you need ideas for? Business, marketing, design, or a creative project? Tell me about your current situation.";
  return mockResponses.default;
}

export function getMockTypedResponse(userMessage: string, type: ResponseType): string {
  switch (type) {
    case "code":
      return `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`;
    case "file":
      return "project-analysis-report.pdf|2.4 MB|A comprehensive analysis of your project structure, dependencies, and optimization recommendations.";
    case "audio":
      return "Beautiful Melody for kids|3:42|A podcast-style audio summary of your conversation highlights and key takeaways.";
    case "image":
      return (userMessage || "A futuristic cityscape at golden hour with towering glass skyscrapers") + "|1024x1024";
    default:
      return getMockResponse(userMessage);
  }
}

export const suggestions = [
  {
    icon: RotateCcw,
    title: "Synthesize Data",
    description: "Turn my meeting notes into 5 key bullet points for the team.",
  },
  {
    icon: Lightbulb,
    title: "Creative Brainstorm",
    description: "Generate 3 taglines for a new sustainable fashion brand.",
  },
  {
    icon: ClipboardCheck,
    title: "Check Facts",
    description: "Compare key differences between GDPR and CCPA.",
  },
];
