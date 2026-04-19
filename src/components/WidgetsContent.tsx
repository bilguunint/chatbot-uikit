"use client";

import { useState } from "react";
import {
  Search,
  Sparkles,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Send,
  ThumbsUp,
  ThumbsDown,
  Star,
  MoreHorizontal,
  Bell,
  Shield,
  Zap,
  Globe,
  Moon,
  Volume2,
  Eye,
  Bot,
  Check,
  Code2,
  Upload,
  FileText,
  Image,
  Mic,
  Calendar,
  Tag,
  BookOpen,
  Keyboard,
  Palette,
  Clock,
  Copy,
  X,
  AlertTriangle,
  Play,
} from "lucide-react";

type WidgetCategory = "all" | "data" | "profile" | "controls" | "chat" | "feedback";

const categories: { key: WidgetCategory; label: string }[] = [
  { key: "all", label: "All Widgets" },
  { key: "data", label: "Data & Charts" },
  { key: "profile", label: "Profile & Users" },
  { key: "controls", label: "Controls & Inputs" },
  { key: "chat", label: "Chat & Messages" },
  { key: "feedback", label: "Feedback & Ratings" },
];

export default function WidgetsContent() {
  const [activeCategory, setActiveCategory] = useState<WidgetCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allWidgets: { category: WidgetCategory; component: React.ReactNode; name: string }[] = [
    { category: "data", component: <BarChartWidget />, name: "Bar Chart" },
    { category: "data", component: <LineChartWidget />, name: "Line Chart" },
    { category: "data", component: <DonutChartWidget />, name: "Donut Chart" },
    { category: "data", component: <StatsCardsWidget />, name: "Stats Cards" },
    { category: "data", component: <ProgressBarsWidget />, name: "Progress Bars" },
    { category: "profile", component: <UserProfileWidget />, name: "User Profile Card" },
    { category: "profile", component: <TeamMembersWidget />, name: "Team Members" },
    { category: "profile", component: <OnlineUsersWidget />, name: "Online Users" },
    { category: "controls", component: <DropdownSelectWidget />, name: "Dropdown Select" },
    { category: "controls", component: <ToggleSettingsWidget />, name: "Toggle Settings" },
    { category: "controls", component: <ModelSelectorWidget />, name: "Model Selector" },
    { category: "chat", component: <ChatBubbleWidget />, name: "Chat Bubbles" },
    { category: "chat", component: <LiveChatFeedWidget />, name: "Live Chat Feed" },
    { category: "chat", component: <QuickRepliesWidget />, name: "Quick Replies" },
    { category: "feedback", component: <StarRatingWidget />, name: "Star Rating" },
    { category: "feedback", component: <SentimentWidget />, name: "Sentiment Analysis" },
    { category: "feedback", component: <NotificationFeedWidget />, name: "Notification Feed" },
    { category: "feedback", component: <SatisfactionGaugeWidget />, name: "Satisfaction Gauge" },
    { category: "chat", component: <CodeBlockWidget />, name: "Code Block Output" },
    { category: "chat", component: <FileUploadWidget />, name: "File Upload Preview" },
    { category: "chat", component: <VoiceInputWidget />, name: "Voice Input" },
    { category: "chat", component: <ImageGenWidget />, name: "Image Generation" },
    { category: "controls", component: <TagInputWidget />, name: "Tag Input" },
    { category: "controls", component: <DatePickerWidget />, name: "Date Picker" },
    { category: "controls", component: <ThemeCustomizerWidget />, name: "Theme Customizer" },
    { category: "controls", component: <KeyboardShortcutsWidget />, name: "Keyboard Shortcuts" },
    { category: "data", component: <TokenCostWidget />, name: "Token Cost Calculator" },
    { category: "profile", component: <BotPersonaWidget />, name: "Bot Persona" },
    { category: "data", component: <UptimeStatusWidget />, name: "API Status" },
    { category: "feedback", component: <ConversationExportWidget />, name: "Export Options" },
    { category: "data", component: <LeaderboardWidget />, name: "Model Leaderboard" },
    { category: "chat", component: <PromptTemplatesWidget />, name: "Prompt Templates" },
  ];

  const filtered = allWidgets.filter((w) => {
    const matchCat = activeCategory === "all" || w.category === activeCategory;
    const matchSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="flex-1 flex flex-col h-screen bg-background overflow-hidden">
      <header className="shrink-0 px-8 pt-6 pb-4 border-b border-border-light">
        <div className="max-w-[1060px] mx-auto">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2.5">
              <h1 className="text-[24px] font-bold text-text-primary">Widgets</h1>
              <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary-600 text-[11px] font-semibold">
                {allWidgets.length} components
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

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-[1060px] mx-auto grid grid-cols-3 gap-4">
          {filtered.map((w, i) => (
            <div key={i} className="flex flex-col rounded-xl border border-border-light bg-card hover:border-primary-200 hover:shadow-md transition-all overflow-hidden">
              <div className="p-4 flex-1">{w.component}</div>
              <div className="px-4 py-2.5 border-t border-border-light bg-hover-bg/50 flex items-center justify-between mt-auto">
                <span className="text-[12px] font-semibold text-text-primary">{w.name}</span>
                <span className="text-[10.5px] text-text-muted capitalize px-2 py-0.5 rounded-full bg-card border border-border-light">
                  {categories.find((c) => c.key === w.category)?.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

/* ═══════════ DATA & CHARTS ═══════════ */

function BarChartWidget() {
  const bars = [
    { label: "Mon", value: 65 },
    { label: "Tue", value: 85 },
    { label: "Wed", value: 45 },
    { label: "Thu", value: 95 },
    { label: "Fri", value: 70 },
    { label: "Sat", value: 40 },
    { label: "Sun", value: 55 },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-semibold text-text-primary">Conversations</span>
        <span className="text-[11px] text-emerald-500 font-medium flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +12.5%</span>
      </div>
      <div className="flex items-end gap-2 h-[100px]">
        {bars.map((b) => (
          <div key={b.label} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-primary-500 to-primary-300 transition-all hover:from-primary-600 hover:to-primary-400"
              style={{ height: `${b.value}%` }}
            />
            <span className="text-[9px] text-text-muted">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineChartWidget() {
  const points = "0,60 30,40 60,55 90,25 120,35 150,15 180,30";
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-semibold text-text-primary">Response Time</span>
        <span className="text-[11px] text-text-muted">Last 7 days</span>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[22px] font-bold text-text-primary">1.2s</span>
        <span className="text-[11px] text-emerald-500 font-medium flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-50"><TrendingDown className="w-3 h-3" /> -0.3s</span>
      </div>
      <svg viewBox="0 0 180 70" className="w-full h-[60px]">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(168,85,247)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(168,85,247)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,70 ${points} 180,70`} fill="url(#lineGrad)" />
        <polyline points={points} fill="none" stroke="rgb(168,85,247)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function DonutChartWidget() {
  const segments = [
    { label: "Resolved", pct: 64, color: "#a855f7" },
    { label: "Pending", pct: 22, color: "#f59e0b" },
    { label: "Escalated", pct: 14, color: "#ef4444" },
  ];
  const r = 36, c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-[90px] h-[90px] shrink-0">
        <svg viewBox="0 0 90 90" className="w-full h-full -rotate-90">
          {segments.map((s) => {
            const dash = (s.pct / 100) * c;
            const el = <circle key={s.label} cx="45" cy="45" r={r} fill="none" stroke={s.color} strokeWidth="10" strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={-offset} strokeLinecap="round" />;
            offset += dash;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[16px] font-bold text-text-primary">64%</span>
        </div>
      </div>
      <div className="space-y-2">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-[11px] text-text-secondary">{s.label}</span>
            <span className="text-[11px] font-semibold text-text-primary ml-auto">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsCardsWidget() {
  const stats = [
    { label: "Total Chats", value: "12,847", trend: "+8.2%", up: true },
    { label: "Avg Duration", value: "3m 24s", trend: "-12%", up: false },
    { label: "Resolution", value: "94.2%", trend: "+2.1%", up: true },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map((s) => (
        <div key={s.label} className="rounded-lg bg-hover-bg p-2.5 text-center">
          <p className="text-[16px] font-bold text-text-primary">{s.value}</p>
          <p className="text-[9.5px] text-text-muted mt-0.5">{s.label}</p>
          <p className={`text-[10px] font-medium mt-1 ${s.up ? "text-emerald-500" : "text-red-500"}`}>{s.trend}</p>
        </div>
      ))}
    </div>
  );
}

function ProgressBarsWidget() {
  const bars = [
    { label: "GPT-4o", value: 87, color: "bg-primary-500" },
    { label: "Claude 4", value: 72, color: "bg-blue-500" },
    { label: "Gemini", value: 54, color: "bg-emerald-500" },
    { label: "Llama 3", value: 41, color: "bg-amber-500" },
  ];
  return (
    <div>
      <span className="text-[12px] font-semibold text-text-primary">Token Usage by Model</span>
      <div className="mt-3 space-y-3">
        {bars.map((b) => (
          <div key={b.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-text-secondary">{b.label}</span>
              <span className="text-[11px] font-medium text-text-primary">{b.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-hover-bg overflow-hidden">
              <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════ PROFILE & USERS ═══════════ */

function UserProfileWidget() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-indigo-500 flex items-center justify-center text-white text-[20px] font-bold mb-2.5">
        JD
      </div>
      <h3 className="text-[14px] font-semibold text-text-primary">Jackson Davis</h3>
      <p className="text-[11px] text-text-muted mb-3">Senior AI Engineer</p>
      <div className="flex items-center gap-1.5 mb-3">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="text-[11px] text-emerald-600 font-medium">Online</span>
      </div>
      <div className="flex gap-2 w-full">
        <div className="flex-1 rounded-lg bg-hover-bg py-2 text-center">
          <p className="text-[14px] font-bold text-text-primary">1,284</p>
          <p className="text-[9.5px] text-text-muted">Chats</p>
        </div>
        <div className="flex-1 rounded-lg bg-hover-bg py-2 text-center">
          <p className="text-[14px] font-bold text-text-primary">4.8</p>
          <p className="text-[9.5px] text-text-muted">Rating</p>
        </div>
        <div className="flex-1 rounded-lg bg-hover-bg py-2 text-center">
          <p className="text-[14px] font-bold text-text-primary">96%</p>
          <p className="text-[9.5px] text-text-muted">Resolved</p>
        </div>
      </div>
    </div>
  );
}

function TeamMembersWidget() {
  const members = [
    { initials: "JD", name: "Jackson Davis", role: "AI Engineer", color: "from-primary-400 to-indigo-500" },
    { initials: "SM", name: "Sarah Miller", role: "Product Lead", color: "from-pink-400 to-rose-500" },
    { initials: "AK", name: "Alex Kim", role: "Data Scientist", color: "from-blue-400 to-cyan-500" },
    { initials: "LR", name: "Lisa Roberts", role: "UX Designer", color: "from-emerald-400 to-teal-500" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-semibold text-text-primary">Team Members</span>
        <span className="text-[11px] text-primary-500 font-medium">View all</span>
      </div>
      <div className="space-y-2.5">
        {members.map((m) => (
          <div key={m.initials} className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
              {m.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-text-primary truncate">{m.name}</p>
              <p className="text-[10px] text-text-muted">{m.role}</p>
            </div>
            <button className="p-1 rounded-md hover:bg-hover-bg text-text-muted">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function OnlineUsersWidget() {
  const users = [
    { initials: "EM", color: "from-amber-400 to-orange-500" },
    { initials: "TW", color: "from-blue-400 to-indigo-500" },
    { initials: "NK", color: "from-rose-400 to-pink-500" },
    { initials: "CP", color: "from-emerald-400 to-teal-500" },
    { initials: "RJ", color: "from-primary-400 to-violet-500" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-semibold text-text-primary">Online Now</span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10.5px] font-semibold">128 users</span>
      </div>
      <div className="flex -space-x-2 mb-3">
        {users.map((u) => (
          <div key={u.initials} className={`w-9 h-9 rounded-full bg-gradient-to-br ${u.color} flex items-center justify-center text-white text-[10px] font-bold border-2 border-card`}>
            {u.initials}
          </div>
        ))}
        <div className="w-9 h-9 rounded-full bg-hover-bg flex items-center justify-center text-[10px] font-semibold text-text-muted border-2 border-card">
          +123
        </div>
      </div>
      <div className="flex gap-2 text-[10.5px]">
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 128 Active</span>
        <span className="flex items-center gap-1 text-text-muted"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> 34 Idle</span>
        <span className="flex items-center gap-1 text-text-muted"><span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> 412 Offline</span>
      </div>
    </div>
  );
}

/* ═══════════ CONTROLS & INPUTS ═══════════ */

function DropdownSelectWidget() {
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState("GPT-4o");
  const [open2, setOpen2] = useState(false);
  const [selected2, setSelected2] = useState("English");
  const models = ["GPT-4o", "Claude 4 Opus", "Gemini 2.5", "Llama 3.1"];
  const langs = ["English", "Spanish", "French", "Japanese", "Korean"];
  return (
    <div className="space-y-3">
      <div>
        <label className="text-[11px] font-medium text-text-muted mb-1 block">AI Model</label>
        <div className="relative">
          <button onClick={() => { setOpen1(!open1); setOpen2(false); }} className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border-light bg-card text-[12px] font-medium text-text-primary hover:border-primary-300 transition-colors">
            <div className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-primary-500" />{selected1}</div>
            <ChevronDown className={`w-3.5 h-3.5 text-text-muted transition-transform ${open1 ? "rotate-180" : ""}`} />
          </button>
          {open1 && (
            <div className="absolute z-10 w-full mt-1 rounded-lg border border-border-light bg-card shadow-lg py-1">
              {models.map((m) => (
                <button key={m} onClick={() => { setSelected1(m); setOpen1(false); }} className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-primary-50 transition-colors ${m === selected1 ? "text-primary-600 font-medium bg-primary-50/50" : "text-text-primary"}`}>
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div>
        <label className="text-[11px] font-medium text-text-muted mb-1 block">Language</label>
        <div className="relative">
          <button onClick={() => { setOpen2(!open2); setOpen1(false); }} className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border-light bg-card text-[12px] font-medium text-text-primary hover:border-primary-300 transition-colors">
            <div className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-blue-500" />{selected2}</div>
            <ChevronDown className={`w-3.5 h-3.5 text-text-muted transition-transform ${open2 ? "rotate-180" : ""}`} />
          </button>
          {open2 && (
            <div className="absolute z-10 w-full mt-1 rounded-lg border border-border-light bg-card shadow-lg py-1">
              {langs.map((l) => (
                <button key={l} onClick={() => { setSelected2(l); setOpen2(false); }} className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-primary-50 transition-colors ${l === selected2 ? "text-primary-600 font-medium bg-primary-50/50" : "text-text-primary"}`}>
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ToggleSettingsWidget() {
  const [toggles, setToggles] = useState({ streaming: true, darkMode: false, sound: true, privacy: true });
  const items = [
    { key: "streaming" as const, label: "Stream Responses", desc: "Show typing animation", icon: Zap },
    { key: "darkMode" as const, label: "Dark Mode", desc: "Toggle dark theme", icon: Moon },
    { key: "sound" as const, label: "Sound Effects", desc: "Notification sounds", icon: Volume2 },
    { key: "privacy" as const, label: "Privacy Mode", desc: "Hide chat history", icon: Shield },
  ];
  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <div key={item.key} className="flex items-center gap-2.5">
          <item.icon className="w-4 h-4 text-text-muted shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-text-primary">{item.label}</p>
            <p className="text-[10px] text-text-muted">{item.desc}</p>
          </div>
          <button
            onClick={() => setToggles((p) => ({ ...p, [item.key]: !p[item.key] }))}
            className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${toggles[item.key] ? "bg-primary-500" : "bg-hover-bg"}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-card shadow-sm transition-transform ${toggles[item.key] ? "left-[18px]" : "left-0.5"}`} />
          </button>
        </div>
      ))}
    </div>
  );
}

function ModelSelectorWidget() {
  const [selected, setSelected] = useState(0);
  const models = [
    { name: "GPT-4o", speed: "Fast", accuracy: "95%", badge: "Popular", color: "border-primary-300 bg-primary-50" },
    { name: "Claude 4", speed: "Medium", accuracy: "97%", badge: "Most Accurate", color: "border-blue-300 bg-blue-50" },
    { name: "Gemini 2.5", speed: "Very Fast", accuracy: "92%", badge: "Fastest", color: "border-emerald-300 bg-emerald-50" },
  ];
  return (
    <div>
      <span className="text-[12px] font-semibold text-text-primary">Choose Model</span>
      <div className="mt-2.5 space-y-2">
        {models.map((m, i) => (
          <button
            key={m.name}
            onClick={() => setSelected(i)}
            className={`w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all text-left ${
              selected === i ? m.color + " shadow-sm" : "border-border-light hover:border-border-light"
            }`}
          >
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selected === i ? "border-primary-500" : "border-border-light"}`}>
              {selected === i && <div className="w-2 h-2 rounded-full bg-primary-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-semibold text-text-primary">{m.name}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-hover-bg text-text-muted font-medium">{m.badge}</span>
              </div>
              <div className="flex gap-3 mt-0.5">
                <span className="text-[10px] text-text-muted">Speed: {m.speed}</span>
                <span className="text-[10px] text-text-muted">Accuracy: {m.accuracy}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════ CHAT & MESSAGES ═══════════ */

function ChatBubbleWidget() {
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shrink-0">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="flex-1">
          <div className="px-3 py-2 rounded-2xl rounded-tl-md bg-hover-bg text-[12px] text-text-primary leading-relaxed">
            Hello! How can I help you today? I can assist with coding, writing, or analysis.
          </div>
          <span className="text-[9px] text-text-muted mt-0.5 ml-1 block">2:34 PM</span>
        </div>
      </div>
      <div className="flex justify-end">
        <div>
          <div className="px-3 py-2 rounded-2xl rounded-br-md bg-gradient-to-r from-primary-500 to-primary-600 text-white text-[12px] leading-relaxed">
            Can you help me write a Python script?
          </div>
          <span className="text-[9px] text-text-muted mt-0.5 mr-1 block text-right">2:35 PM</span>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shrink-0">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="px-3 py-2 rounded-2xl rounded-tl-md bg-hover-bg text-[12px] text-text-primary leading-relaxed flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-primary-400 animate-pulse" />
          <span className="w-1 h-1 rounded-full bg-primary-400 animate-pulse [animation-delay:200ms]" />
          <span className="w-1 h-1 rounded-full bg-primary-400 animate-pulse [animation-delay:400ms]" />
        </div>
      </div>
    </div>
  );
}

function LiveChatFeedWidget() {
  const chats = [
    { user: "EM", message: "How do I reset my password?", time: "Just now", sentiment: "neutral", color: "from-amber-400 to-orange-500" },
    { user: "TW", message: "The API returns a 500 error", time: "2m ago", sentiment: "negative", color: "from-blue-400 to-indigo-500" },
    { user: "NK", message: "Thanks! That worked perfectly", time: "5m ago", sentiment: "positive", color: "from-rose-400 to-pink-500" },
  ];
  const sentimentColor: Record<string, string> = { positive: "bg-emerald-400", negative: "bg-red-400", neutral: "bg-amber-400" };
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-semibold text-text-primary">Live Feed</span>
        <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live</span>
      </div>
      <div className="space-y-2.5">
        {chats.map((c) => (
          <div key={c.user} className="flex items-start gap-2">
            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-[9px] font-bold shrink-0`}>
              {c.user}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-text-primary truncate">{c.message}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] text-text-muted">{c.time}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${sentimentColor[c.sentiment]}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickRepliesWidget() {
  const replies = [
    "I can help with that!",
    "Could you provide more details?",
    "Let me check that for you.",
    "Here's what I found:",
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-semibold text-text-primary">Quick Replies</span>
        <Zap className="w-3.5 h-3.5 text-amber-400" />
      </div>
      <div className="space-y-1.5 mb-3">
        {replies.map((r) => (
          <button key={r} className="w-full text-left px-3 py-2 rounded-lg border border-border-light text-[11px] text-text-primary hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-all">
            {r}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input placeholder="Custom reply..." className="flex-1 px-3 py-1.5 rounded-lg border border-border-light text-[11px] outline-none focus:border-primary-300 bg-hover-bg" />
        <button className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center hover:bg-primary-600 transition-colors">
          <Send className="w-3 h-3 text-white" />
        </button>
      </div>
    </div>
  );
}

/* ═══════════ FEEDBACK & RATINGS ═══════════ */

function StarRatingWidget() {
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-[12px] font-semibold text-text-primary mb-1">Rate this response</span>
      <p className="text-[11px] text-text-muted mb-3">How helpful was the AI assistant?</p>
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            onClick={() => setRating(s)}
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
            className="p-0.5 transition-transform hover:scale-110"
          >
            <Star className={`w-7 h-7 transition-colors ${s <= (hover || rating) ? "text-amber-400 fill-amber-400" : "text-border-light"}`} />
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-light text-[11px] text-text-muted hover:bg-hover-bg transition-colors">
          <ThumbsDown className="w-3 h-3" /> Not helpful
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500 text-white text-[11px] font-medium hover:bg-primary-600 transition-colors">
          <ThumbsUp className="w-3 h-3" /> Helpful
        </button>
      </div>
    </div>
  );
}

function SentimentWidget() {
  const data = [
    { label: "Positive", value: 68, color: "bg-emerald-400", emoji: "😊" },
    { label: "Neutral", value: 22, color: "bg-amber-400", emoji: "😐" },
    { label: "Negative", value: 10, color: "bg-red-400", emoji: "😟" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-semibold text-text-primary">Sentiment Analysis</span>
        <span className="text-[10px] text-text-muted">Last 24h</span>
      </div>
      <div className="flex h-3 rounded-full overflow-hidden mb-3">
        {data.map((d) => (
          <div key={d.label} className={`${d.color}`} style={{ width: `${d.value}%` }} />
        ))}
      </div>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2.5">
            <span className="text-[14px]">{d.emoji}</span>
            <span className="text-[11px] text-text-secondary flex-1">{d.label}</span>
            <span className="text-[12px] font-semibold text-text-primary">{d.value}%</span>
            <div className="w-16 h-1.5 rounded-full bg-hover-bg overflow-hidden">
              <div className={`h-full rounded-full ${d.color}`} style={{ width: `${d.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationFeedWidget() {
  const notifications = [
    { icon: ArrowUpRight, text: "New user escalation from #chat-1284", time: "Just now", color: "text-red-500 bg-red-50" },
    { icon: Check, text: "Conversation #1280 resolved automatically", time: "5m ago", color: "text-emerald-500 bg-emerald-50" },
    { icon: Bell, text: "Response time exceeded 3s threshold", time: "12m ago", color: "text-amber-500 bg-amber-50" },
    { icon: Eye, text: "New feedback received (5 stars)", time: "1h ago", color: "text-primary-500 bg-primary-50" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-semibold text-text-primary">Notifications</span>
        <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">4</span>
      </div>
      <div className="space-y-2">
        {notifications.map((n, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${n.color}`}>
              <n.icon className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-text-primary leading-snug">{n.text}</p>
              <p className="text-[9.5px] text-text-muted mt-0.5">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SatisfactionGaugeWidget() {
  const score = 4.6;
  const pct = (score / 5) * 100;
  const angle = (pct / 100) * 180;
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-[12px] font-semibold text-text-primary mb-2">Customer Satisfaction</span>
      <div className="relative w-[140px] h-[75px] mb-1">
        <svg viewBox="0 0 140 75" className="w-full h-full">
          <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round" />
          <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" stroke="url(#gaugeGrad)" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${(angle / 180) * 188.5} 188.5`} />
          <defs>
            <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <span className="text-[24px] font-bold text-text-primary">{score}</span>
          <span className="text-[12px] text-text-muted"> / 5</span>
        </div>
      </div>
      <div className="flex gap-4 mt-2">
        <div className="text-center">
          <p className="text-[13px] font-bold text-text-primary">1,847</p>
          <p className="text-[9.5px] text-text-muted">Reviews</p>
        </div>
        <div className="w-px h-8 bg-hover-bg" />
        <div className="text-center">
          <p className="text-[13px] font-bold text-emerald-500">+0.3</p>
          <p className="text-[9.5px] text-text-muted">vs Last Week</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════ NEW WIDGETS ═══════════ */

function CodeBlockWidget() {
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
          <Code2 className="w-3.5 h-3.5 text-primary-500" />
          <span className="text-[12px] font-semibold text-text-primary">Code Output</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-hover-bg text-text-muted font-medium">TypeScript</span>
          <button
            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }}
            className="p-1 rounded-md hover:bg-hover-bg text-text-muted"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>
      <pre className="rounded-lg bg-gray-900 text-gray-100 p-3 text-[10.5px] leading-relaxed overflow-x-auto font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function FileUploadWidget() {
  const files = [
    { name: "report.pdf", size: "2.4 MB", icon: FileText, color: "text-red-500 bg-red-50" },
    { name: "screenshot.png", size: "840 KB", icon: Image, color: "text-blue-500 bg-blue-50" },
  ];
  return (
    <div>
      <span className="text-[12px] font-semibold text-text-primary">Attachments</span>
      <div className="mt-2.5 space-y-2">
        {files.map((f) => (
          <div key={f.name} className="flex items-center gap-2.5 p-2.5 rounded-lg border border-border-light bg-hover-bg/50">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${f.color}`}>
              <f.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-text-primary truncate">{f.name}</p>
              <p className="text-[10px] text-text-muted">{f.size}</p>
            </div>
            <button className="p-1 rounded-md hover:bg-hover-bg text-text-muted"><Eye className="w-3.5 h-3.5" /></button>
            <button className="p-1 rounded-md hover:bg-red-100 text-text-muted hover:text-red-500"><X className="w-3.5 h-3.5" /></button>
          </div>
        ))}
      </div>
      <button className="w-full mt-2.5 py-2.5 rounded-lg border-2 border-dashed border-border-light text-[11px] text-text-muted hover:border-primary-300 hover:text-primary-500 transition-colors flex items-center justify-center gap-1.5">
        <Upload className="w-3.5 h-3.5" /> Drop files or click to upload
      </button>
    </div>
  );
}

function VoiceInputWidget() {
  const [recording, setRecording] = useState(false);
  const bars = [3, 5, 8, 12, 7, 14, 6, 10, 4, 8, 13, 5, 9, 7, 11, 4, 6, 10, 8, 5];
  return (
    <div className="flex flex-col items-center">
      <span className="text-[12px] font-semibold text-text-primary mb-3">Voice Input</span>
      <button
        onClick={() => setRecording(!recording)}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all mb-3 ${
          recording
            ? "bg-red-500 shadow-lg shadow-red-200 animate-pulse"
            : "bg-gradient-to-br from-primary-400 to-primary-600 hover:shadow-lg hover:shadow-primary-200"
        }`}
      >
        <Mic className="w-6 h-6 text-white" />
      </button>
      <div className="flex items-end gap-[3px] h-[32px] mb-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`w-[3px] rounded-full transition-all ${
              recording ? "bg-primary-400" : "bg-hover-bg"
            }`}
            style={{
              height: recording ? `${h * 2.2}px` : `${h}px`,
              animationDelay: `${i * 50}ms`,
            }}
          />
        ))}
      </div>
      <span className={`text-[11px] font-medium ${recording ? "text-red-500" : "text-text-muted"}`}>
        {recording ? "Recording... 0:03" : "Tap to speak"}
      </span>
    </div>
  );
}

function ImageGenWidget() {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] font-semibold text-text-primary">AI Image Output</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-50 text-primary-500 font-medium">DALL-E 3</span>
      </div>
      <div className="rounded-xl bg-gradient-to-br from-primary-100 via-blue-50 to-pink-100 h-[110px] flex items-center justify-center mb-2.5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(168,85,247,0.2),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.2),transparent_50%)]" />
        <div className="relative flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center mb-1 shadow-sm">
            <Image className="w-5 h-5 text-primary-500" />
          </div>
          <span className="text-[10px] text-primary-600 font-medium">512 × 512</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 py-1.5 rounded-lg bg-primary-500 text-white text-[11px] font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-1">
          <Play className="w-3 h-3" /> Regenerate
        </button>
        <button className="px-3 py-1.5 rounded-lg border border-border-light text-text-muted text-[11px] hover:bg-hover-bg transition-colors">
          <Upload className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function TagInputWidget() {
  const [tags, setTags] = useState(["billing", "urgent", "api-error", "v2.1"]);
  const [input, setInput] = useState("");
  const colors: Record<string, string> = {
    billing: "bg-blue-50 text-blue-600 border-blue-200",
    urgent: "bg-red-50 text-red-600 border-red-200",
    "api-error": "bg-amber-50 text-amber-600 border-amber-200",
    "v2.1": "bg-primary-50 text-primary-600 border-primary-200",
  };
  return (
    <div>
      <div className="flex items-center gap-2 mb-2.5">
        <Tag className="w-3.5 h-3.5 text-text-muted" />
        <span className="text-[12px] font-semibold text-text-primary">Conversation Tags</span>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-2.5">
        {tags.map((tag) => (
          <span key={tag} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border ${colors[tag] ?? "bg-hover-bg text-text-primary border-border-light"}`}>
            {tag}
            <button onClick={() => setTags(tags.filter((t) => t !== tag))} className="hover:opacity-60">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && input.trim()) { setTags([...tags, input.trim()]); setInput(""); } }}
          placeholder="Add tag..."
          className="flex-1 px-3 py-1.5 rounded-lg border border-border-light text-[11px] outline-none focus:border-primary-300 bg-hover-bg"
        />
        <button
          onClick={() => { if (input.trim()) { setTags([...tags, input.trim()]); setInput(""); } }}
          className="px-3 py-1.5 rounded-lg bg-primary-500 text-white text-[11px] font-medium hover:bg-primary-600 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}

function DatePickerWidget() {
  const [selectedDay, setSelectedDay] = useState(15);
  const daysInMonth = 30;
  const startDay = 2; // Tuesday
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startDay }, (_, i) => i);
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-primary-500" />
          <span className="text-[12px] font-semibold text-text-primary">April 2026</span>
        </div>
        <div className="flex gap-1">
          <button className="w-6 h-6 rounded-md hover:bg-hover-bg flex items-center justify-center text-text-muted text-[12px]">‹</button>
          <button className="w-6 h-6 rounded-md hover:bg-hover-bg flex items-center justify-center text-text-muted text-[12px]">›</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d} className="text-[9px] font-medium text-text-muted py-1">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {blanks.map((b) => <span key={`b${b}`} />)}
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`w-full aspect-square rounded-md text-[10px] font-medium transition-all ${
              d === selectedDay
                ? "bg-primary-500 text-white shadow-sm"
                : d === 19
                ? "bg-primary-50 text-primary-600 font-semibold"
                : "text-text-primary hover:bg-hover-bg"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

function ThemeCustomizerWidget() {
  const [activeColor, setActiveColor] = useState(3);
  const colors = [
    { name: "Red", bg: "bg-red-500", ring: "ring-red-300" },
    { name: "Amber", bg: "bg-amber-500", ring: "ring-amber-300" },
    { name: "Emerald", bg: "bg-emerald-500", ring: "ring-emerald-300" },
    { name: "Purple", bg: "bg-primary-500", ring: "ring-primary-300" },
    { name: "Blue", bg: "bg-blue-500", ring: "ring-blue-300" },
    { name: "Pink", bg: "bg-pink-500", ring: "ring-pink-300" },
  ];
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Palette className="w-3.5 h-3.5 text-primary-500" />
        <span className="text-[12px] font-semibold text-text-primary">Theme Customizer</span>
      </div>
      <div>
        <label className="text-[10.5px] font-medium text-text-muted mb-1.5 block">Accent Color</label>
        <div className="flex gap-2 mb-3">
          {colors.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActiveColor(i)}
              className={`w-7 h-7 rounded-full ${c.bg} transition-all ${
                activeColor === i ? `ring-2 ${c.ring} ring-offset-2 scale-110` : "hover:scale-105"
              }`}
            />
          ))}
        </div>
      </div>
      <div>
        <label className="text-[10.5px] font-medium text-text-muted mb-1.5 block">Font Size</label>
        <div className="flex gap-1.5">
          {["Small", "Medium", "Large"].map((s, i) => (
            <button
              key={s}
              className={`flex-1 py-1.5 rounded-md text-[10.5px] font-medium transition-colors ${
                i === 1 ? "bg-primary-500 text-white" : "bg-hover-bg text-text-secondary hover:bg-hover-bg"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-2.5">
        <label className="text-[10.5px] font-medium text-text-muted mb-1.5 block">Border Radius</label>
        <input type="range" min="0" max="20" defaultValue="12" className="w-full h-1.5 bg-hover-bg rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:cursor-pointer" />
      </div>
    </div>
  );
}

function KeyboardShortcutsWidget() {
  const shortcuts = [
    { keys: ["⌘", "K"], desc: "Open command palette" },
    { keys: ["⌘", "N"], desc: "New conversation" },
    { keys: ["⌘", "⇧", "C"], desc: "Copy last response" },
    { keys: ["⌘", "/"], desc: "Toggle sidebar" },
    { keys: ["Esc"], desc: "Close modal" },
    { keys: ["Enter"], desc: "Send message" },
  ];
  return (
    <div>
      <div className="flex items-center gap-2 mb-2.5">
        <Keyboard className="w-3.5 h-3.5 text-text-muted" />
        <span className="text-[12px] font-semibold text-text-primary">Keyboard Shortcuts</span>
      </div>
      <div className="space-y-1.5">
        {shortcuts.map((s) => (
          <div key={s.desc} className="flex items-center justify-between py-1">
            <span className="text-[11px] text-text-secondary">{s.desc}</span>
            <div className="flex gap-1">
              {s.keys.map((k) => (
                <kbd key={k} className="min-w-[22px] h-[22px] rounded-md bg-hover-bg border border-border-light text-[10px] font-mono font-medium text-text-primary flex items-center justify-center px-1.5 shadow-sm">
                  {k}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TokenCostWidget() {
  const models = [
    { name: "GPT-4o", input: "$2.50", output: "$10.00", tokens: "124K", total: "$3.45" },
    { name: "Claude 4", input: "$3.00", output: "$15.00", tokens: "89K", total: "$4.12" },
    { name: "Gemini 2.5", input: "$1.25", output: "$5.00", tokens: "201K", total: "$2.18" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[12px] font-semibold text-text-primary">Token Cost Calculator</span>
        <span className="text-[10px] text-text-muted">Today</span>
      </div>
      <div className="rounded-lg border border-border-light overflow-hidden">
        <div className="grid grid-cols-4 gap-0 bg-hover-bg px-2.5 py-1.5">
          <span className="text-[9.5px] font-semibold text-text-muted">Model</span>
          <span className="text-[9.5px] font-semibold text-text-muted text-right">Tokens</span>
          <span className="text-[9.5px] font-semibold text-text-muted text-right">Rate</span>
          <span className="text-[9.5px] font-semibold text-text-muted text-right">Cost</span>
        </div>
        {models.map((m) => (
          <div key={m.name} className="grid grid-cols-4 gap-0 px-2.5 py-2 border-t border-border-light">
            <span className="text-[11px] font-medium text-text-primary">{m.name}</span>
            <span className="text-[11px] text-text-muted text-right">{m.tokens}</span>
            <span className="text-[10px] text-text-muted text-right">{m.input}/M</span>
            <span className="text-[11px] font-semibold text-text-primary text-right">{m.total}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2.5 px-1">
        <span className="text-[11px] text-text-muted">Total spend</span>
        <span className="text-[14px] font-bold text-text-primary">$9.75</span>
      </div>
    </div>
  );
}

function BotPersonaWidget() {
  const [active, setActive] = useState(0);
  const personas = [
    { name: "Sondor AI", desc: "General assistant", avatar: "🤖", gradient: "from-primary-400 to-indigo-500" },
    { name: "CodeBot", desc: "Developer helper", avatar: "👨‍💻", gradient: "from-blue-400 to-cyan-500" },
    { name: "Writer", desc: "Content creator", avatar: "✍️", gradient: "from-pink-400 to-rose-500" },
  ];
  return (
    <div>
      <span className="text-[12px] font-semibold text-text-primary">Bot Persona</span>
      <p className="text-[10.5px] text-text-muted mb-2.5">Choose your AI assistant personality</p>
      <div className="space-y-2">
        {personas.map((p, i) => (
          <button
            key={p.name}
            onClick={() => setActive(i)}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all text-left ${
              active === i ? "border-primary-300 bg-primary-50/50 shadow-sm" : "border-border-light hover:border-border-light"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-[18px]`}>
              {p.avatar}
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-semibold text-text-primary">{p.name}</p>
              <p className="text-[10px] text-text-muted">{p.desc}</p>
            </div>
            {active === i && (
              <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function UptimeStatusWidget() {
  const services = [
    { name: "Chat API", status: "operational", uptime: "99.98%" },
    { name: "Embedding Service", status: "operational", uptime: "99.95%" },
    { name: "Image Generation", status: "degraded", uptime: "98.20%" },
    { name: "Voice API", status: "operational", uptime: "99.91%" },
  ];
  const statusMap: Record<string, { color: string; dot: string; label: string }> = {
    operational: { color: "text-emerald-600", dot: "bg-emerald-400", label: "Operational" },
    degraded: { color: "text-amber-600", dot: "bg-amber-400", label: "Degraded" },
    down: { color: "text-red-600", dot: "bg-red-400", label: "Down" },
  };
  // mini uptime bars
  const barData = Array.from({ length: 30 }, () => Math.random() > 0.05 ? "bg-emerald-400" : "bg-amber-400");
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[12px] font-semibold text-text-primary">API Status</span>
        <span className="flex items-center gap-1 text-[10.5px] text-emerald-600 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> All systems go</span>
      </div>
      <div className="flex gap-[2px] h-[18px] mb-3 rounded overflow-hidden">
        {barData.map((c, i) => (
          <div key={i} className={`flex-1 ${c} rounded-sm`} />
        ))}
      </div>
      <div className="space-y-2">
        {services.map((s) => {
          const st = statusMap[s.status];
          return (
            <div key={s.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${st.dot}`} />
                <span className="text-[11px] font-medium text-text-primary">{s.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-text-muted">{s.uptime}</span>
                <span className={`text-[10px] font-medium ${st.color}`}>{st.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ConversationExportWidget() {
  const formats = [
    { name: "PDF Document", desc: "Formatted chat transcript", icon: FileText, color: "text-red-500 bg-red-50" },
    { name: "JSON Data", desc: "Structured API format", icon: Code2, color: "text-blue-500 bg-blue-50" },
    { name: "Markdown", desc: "Plain text with formatting", icon: BookOpen, color: "text-primary-500 bg-primary-50" },
  ];
  return (
    <div>
      <span className="text-[12px] font-semibold text-text-primary">Export Conversation</span>
      <p className="text-[10.5px] text-text-muted mb-3">Choose your preferred format</p>
      <div className="space-y-2">
        {formats.map((f) => (
          <button key={f.name} className="w-full flex items-center gap-3 p-2.5 rounded-lg border border-border-light hover:border-primary-200 hover:bg-primary-50/30 transition-all text-left">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${f.color}`}>
              <f.icon className="w-4.5 h-4.5" />
            </div>
            <div className="flex-1">
              <p className="text-[11.5px] font-medium text-text-primary">{f.name}</p>
              <p className="text-[10px] text-text-muted">{f.desc}</p>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-text-muted" />
          </button>
        ))}
      </div>
    </div>
  );
}

function LeaderboardWidget() {
  const models = [
    { rank: 1, name: "GPT-4o", score: 94.2, trend: "+1.2", medal: "🥇" },
    { rank: 2, name: "Claude 4 Opus", score: 93.8, trend: "+2.5", medal: "🥈" },
    { rank: 3, name: "Gemini 2.5 Pro", score: 91.5, trend: "-0.3", medal: "🥉" },
    { rank: 4, name: "Llama 3.1 405B", score: 88.1, trend: "+0.8", medal: "" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[12px] font-semibold text-text-primary">Model Leaderboard</span>
        <span className="text-[10px] text-text-muted">MMLU Score</span>
      </div>
      <div className="space-y-1.5">
        {models.map((m) => (
          <div key={m.rank} className={`flex items-center gap-2.5 p-2 rounded-lg ${m.rank === 1 ? "bg-amber-50/50 border border-amber-100" : ""}`}>
            <span className="text-[14px] w-6 text-center">{m.medal || m.rank}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[11.5px] font-semibold text-text-primary">{m.name}</p>
              <div className="w-full h-1.5 rounded-full bg-hover-bg mt-1 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-500" style={{ width: `${m.score}%` }} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-[12px] font-bold text-text-primary">{m.score}</p>
              <p className={`text-[9.5px] font-medium ${m.trend.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}>{m.trend}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PromptTemplatesWidget() {
  const templates = [
    { title: "Code Review", prompt: "Review this code for bugs, performance issues, and best practices...", icon: Code2, color: "bg-blue-50 text-blue-500" },
    { title: "Summarize", prompt: "Summarize the following text in 3 bullet points...", icon: BookOpen, color: "bg-emerald-50 text-emerald-500" },
    { title: "Translate", prompt: "Translate the following text to {language}...", icon: Globe, color: "bg-amber-50 text-amber-500" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[12px] font-semibold text-text-primary">Prompt Templates</span>
        <button className="text-[10.5px] text-primary-500 font-medium">+ New</button>
      </div>
      <div className="space-y-2">
        {templates.map((t) => (
          <button key={t.title} className="w-full text-left p-2.5 rounded-lg border border-border-light hover:border-primary-200 hover:bg-primary-50/30 transition-all group">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center ${t.color}`}>
                <t.icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11.5px] font-semibold text-text-primary group-hover:text-primary-600">{t.title}</span>
            </div>
            <p className="text-[10.5px] text-text-muted leading-snug line-clamp-1 pl-8">{t.prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
