"use client";

import { useState } from "react";
import { Star, ThumbsDown, ThumbsUp, ArrowUpRight, Check, Bell, Eye, FileText, Code2, BookOpen } from "lucide-react";

export function StarRatingWidget() {
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-sm font-semibold mb-1">Rate this response</span>
      <p className="text-xs text-gray-400 mb-3">How helpful was the AI assistant?</p>
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <button key={s} onClick={() => setRating(s)}
            onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}
            className="p-0.5 transition-transform hover:scale-110">
            <Star className={`w-7 h-7 ${s <= (hover || rating)
              ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs text-gray-400">
          <ThumbsDown className="w-3 h-3" /> Not helpful
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500 text-white text-xs font-medium">
          <ThumbsUp className="w-3 h-3" /> Helpful
        </button>
      </div>
    </div>
  );
}

export function SentimentWidget() {
  const data = [
    { label: "Positive", value: 68, color: "bg-emerald-400", emoji: "😊" },
    { label: "Neutral", value: 22, color: "bg-amber-400", emoji: "😐" },
    { label: "Negative", value: 10, color: "bg-red-400", emoji: "😟" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold">Sentiment Analysis</span>
        <span className="text-xs text-gray-400">Last 24h</span>
      </div>
      <div className="flex h-3 rounded-full overflow-hidden mb-3">
        {data.map((d) => (
          <div key={d.label} className={d.color} style={{ width: `${d.value}%` }} />
        ))}
      </div>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2.5">
            <span className="text-sm">{d.emoji}</span>
            <span className="text-xs flex-1">{d.label}</span>
            <span className="text-xs font-semibold">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NotificationFeedWidget() {
  const notifications = [
    { icon: ArrowUpRight, text: "New user escalation from #chat-1284", time: "Just now", color: "text-red-500 bg-red-50" },
    { icon: Check, text: "Conversation #1280 resolved automatically", time: "5m ago", color: "text-emerald-500 bg-emerald-50" },
    { icon: Bell, text: "Response time exceeded 3s threshold", time: "12m ago", color: "text-amber-500 bg-amber-50" },
    { icon: Eye, text: "New feedback received (5 stars)", time: "1h ago", color: "text-purple-500 bg-purple-50" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold">Notifications</span>
        <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">4</span>
      </div>
      <div className="space-y-2">
        {notifications.map((n, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${n.color}`}>
              <n.icon className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs leading-snug">{n.text}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SatisfactionGaugeWidget() {
  const score = 4.6;
  const pct = (score / 5) * 100;
  const angle = (pct / 100) * 180;
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-sm font-semibold mb-2">Customer Satisfaction</span>
      <div className="relative w-[140px] h-[75px] mb-1">
        <svg viewBox="0 0 140 75" className="w-full h-full">
          <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round" />
          <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" stroke="url(#gaugeGrad)" strokeWidth="12"
            strokeLinecap="round" strokeDasharray={`${(angle / 180) * 188.5} 188.5`} />
          <defs>
            <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <span className="text-2xl font-bold">{score}</span>
          <span className="text-sm text-gray-400"> / 5</span>
        </div>
      </div>
      <div className="flex gap-4 mt-2">
        <div className="text-center">
          <p className="text-sm font-bold">1,847</p>
          <p className="text-[10px] text-gray-400">Reviews</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-emerald-500">+0.3</p>
          <p className="text-[10px] text-gray-400">vs Last Week</p>
        </div>
      </div>
    </div>
  );
}

export function ConversationExportWidget() {
  const formats = [
    { name: "PDF Document", desc: "Formatted chat transcript", icon: FileText, color: "text-red-500 bg-red-50" },
    { name: "JSON Data", desc: "Structured API format", icon: Code2, color: "text-blue-500 bg-blue-50" },
    { name: "Markdown", desc: "Plain text with formatting", icon: BookOpen, color: "text-purple-500 bg-purple-50" },
  ];
  return (
    <div>
      <span className="text-sm font-semibold">Export Conversation</span>
      <p className="text-xs text-gray-400 mb-3">Choose your preferred format</p>
      <div className="space-y-2">
        {formats.map((f) => (
          <button key={f.name} className="w-full flex items-center gap-3 p-2.5 rounded-lg border
            hover:border-purple-200 hover:bg-purple-50/30 transition-all text-left">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${f.color}`}>
              <f.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium">{f.name}</p>
              <p className="text-[10px] text-gray-400">{f.desc}</p>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
