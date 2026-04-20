"use client";

import { useState } from "react";
import { Bot, Zap, Send, Code2, Copy, Check, FileText, Image, Eye, X, Upload, Mic, Play, BookOpen, Globe } from "lucide-react";

export function ChatBubbleWidget() {
  return (
    <div className="space-y-3">
      {/* Bot message */}
      <div className="flex gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600
          flex items-center justify-center shrink-0">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="flex-1">
          <div className="px-3 py-2 rounded-2xl rounded-tl-md bg-gray-100 dark:bg-gray-800 text-sm">
            Hello! How can I help you today?
          </div>
          <span className="text-[9px] text-gray-400 mt-0.5 ml-1 block">2:34 PM</span>
        </div>
      </div>
      {/* User message */}
      <div className="flex justify-end">
        <div>
          <div className="px-3 py-2 rounded-2xl rounded-br-md bg-purple-500 text-white text-sm">
            Can you help me write a Python script?
          </div>
          <span className="text-[9px] text-gray-400 mt-0.5 mr-1 block text-right">2:35 PM</span>
        </div>
      </div>
      {/* Typing indicator */}
      <div className="flex gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600
          flex items-center justify-center shrink-0">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="px-3 py-2 rounded-2xl rounded-tl-md bg-gray-100 dark:bg-gray-800 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" />
          <span className="w-1 h-1 rounded-full bg-purple-400 animate-pulse [animation-delay:200ms]" />
          <span className="w-1 h-1 rounded-full bg-purple-400 animate-pulse [animation-delay:400ms]" />
        </div>
      </div>
    </div>
  );
}

export function LiveChatFeedWidget() {
  const sentimentColor: Record<"positive" | "negative" | "neutral", string> = {
    positive: "bg-emerald-400",
    negative: "bg-red-400",
    neutral: "bg-amber-400",
  };
  const chats: { user: string; message: string; time: string; sentiment: keyof typeof sentimentColor; color: string }[] = [
    { user: "EM", message: "How do I reset my password?", time: "Just now", sentiment: "neutral", color: "from-amber-400 to-orange-500" },
    { user: "TW", message: "The API returns a 500 error", time: "2m ago", sentiment: "negative", color: "from-blue-400 to-indigo-500" },
    { user: "NK", message: "Thanks! That worked perfectly", time: "5m ago", sentiment: "positive", color: "from-rose-400 to-pink-500" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold">Live Feed</span>
        <span className="flex items-center gap-1 text-xs text-emerald-500 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
        </span>
      </div>
      <div className="space-y-2.5">
        {chats.map((c) => (
          <div key={c.user} className="flex items-start gap-2">
            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${c.color}
              flex items-center justify-center text-white text-[9px] font-bold`}>
              {c.user}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs truncate">{c.message}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] text-gray-400">{c.time}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${sentimentColor[c.sentiment]}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QuickRepliesWidget() {
  const replies = [
    "I can help with that!",
    "Could you provide more details?",
    "Let me check that for you.",
    "Here's what I found:",
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold">Quick Replies</span>
        <Zap className="w-3.5 h-3.5 text-amber-400" />
      </div>
      <div className="space-y-1.5 mb-3">
        {replies.map((r) => (
          <button key={r} className="w-full text-left px-3 py-2 rounded-lg border text-xs
            hover:bg-purple-50 hover:border-purple-200 transition-all">
            {r}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input placeholder="Custom reply..." className="flex-1 px-3 py-1.5 rounded-lg border text-xs outline-none" />
        <button className="w-7 h-7 rounded-lg bg-purple-500 flex items-center justify-center">
          <Send className="w-3 h-3 text-white" />
        </button>
      </div>
    </div>
  );
}

export function CodeBlockWidget() {
  const [copied, setCopied] = useState(false);
  const code = `async function chat(prompt) {
  const res = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
  return res.json();
}`;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-purple-500" />
          <span className="text-sm font-semibold">Code Output</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-400">TypeScript</span>
          <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
            className="p-1 rounded-md hover:bg-gray-100">
            {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>
      <pre className="rounded-lg bg-gray-900 text-gray-100 p-3 text-xs leading-relaxed overflow-x-auto font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function FileUploadWidget() {
  const files = [
    { name: "report.pdf", size: "2.4 MB", icon: FileText, color: "text-red-500 bg-red-50" },
    { name: "screenshot.png", size: "840 KB", icon: Image, color: "text-blue-500 bg-blue-50" },
  ];
  return (
    <div>
      <span className="text-sm font-semibold">Attachments</span>
      <div className="mt-2.5 space-y-2">
        {files.map((f) => (
          <div key={f.name} className="flex items-center gap-2.5 p-2.5 rounded-lg border">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${f.color}`}>
              <f.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{f.name}</p>
              <p className="text-[10px] text-gray-400">{f.size}</p>
            </div>
            <button className="p-1 rounded-md hover:bg-gray-100"><Eye className="w-3.5 h-3.5" /></button>
            <button className="p-1 rounded-md hover:bg-red-100 hover:text-red-500"><X className="w-3.5 h-3.5" /></button>
          </div>
        ))}
      </div>
      <button className="w-full mt-2.5 py-2.5 rounded-lg border-2 border-dashed text-xs text-gray-400
        hover:border-purple-300 hover:text-purple-500 flex items-center justify-center gap-1.5">
        <Upload className="w-3.5 h-3.5" /> Drop files or click to upload
      </button>
    </div>
  );
}

export function VoiceInputWidget() {
  const [recording, setRecording] = useState(false);
  const bars = [3, 5, 8, 12, 7, 14, 6, 10, 4, 8, 13, 5, 9, 7, 11, 4, 6, 10, 8, 5];
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm font-semibold mb-3">Voice Input</span>
      <button onClick={() => setRecording(!recording)}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all mb-3 ${
          recording ? "bg-red-500 shadow-lg shadow-red-200 animate-pulse"
          : "bg-gradient-to-br from-purple-400 to-purple-600 hover:shadow-lg"}`}>
        <Mic className="w-6 h-6 text-white" />
      </button>
      <div className="flex items-end gap-[3px] h-[32px] mb-2">
        {bars.map((h, i) => (
          <div key={i} className={`w-[3px] rounded-full transition-all ${recording ? "bg-purple-400" : "bg-gray-200"}`}
            style={{ height: recording ? `${h * 2.2}px` : `${h}px` }} />
        ))}
      </div>
      <span className={`text-xs font-medium ${recording ? "text-red-500" : "text-gray-400"}`}>
        {recording ? "Recording... 0:03" : "Tap to speak"}
      </span>
    </div>
  );
}

export function ImageGenWidget() {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold">AI Image Output</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-500 font-medium">DALL-E 3</span>
      </div>
      <div className="rounded-xl bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 h-[110px]
        flex items-center justify-center mb-2.5 relative overflow-hidden">
        <div className="relative flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center mb-1 shadow-sm">
            <Image className="w-5 h-5 text-purple-500" />
          </div>
          <span className="text-[10px] text-purple-600 font-medium">512 × 512</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 py-1.5 rounded-lg bg-purple-500 text-white text-xs font-medium flex items-center justify-center gap-1">
          <Play className="w-3 h-3" /> Regenerate
        </button>
        <button className="px-3 py-1.5 rounded-lg border text-gray-400 text-xs">
          <Upload className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export function PromptTemplatesWidget() {
  const templates = [
    { title: "Code Review", prompt: "Review this code for bugs, performance issues, and best practices...", icon: Code2, color: "bg-blue-50 text-blue-500" },
    { title: "Summarize", prompt: "Summarize the following text in 3 bullet points...", icon: BookOpen, color: "bg-emerald-50 text-emerald-500" },
    { title: "Translate", prompt: "Translate the following text to {language}...", icon: Globe, color: "bg-amber-50 text-amber-500" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-sm font-semibold">Prompt Templates</span>
        <button className="text-xs text-purple-500 font-medium">+ New</button>
      </div>
      <div className="space-y-2">
        {templates.map((t) => (
          <button key={t.title} className="w-full text-left p-2.5 rounded-lg border
            hover:border-purple-200 hover:bg-purple-50/30 transition-all group">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center ${t.color}`}>
                <t.icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold group-hover:text-purple-600">{t.title}</span>
            </div>
            <p className="text-xs text-gray-400 leading-snug line-clamp-1 pl-8">{t.prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
