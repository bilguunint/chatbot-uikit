export const widgetCodeMap: Record<string, { description: string; dependencies: string[]; code: string }> = {
  "Bar Chart": {
    description: "A responsive bar chart component showing weekly conversation data with gradient bars and trend indicator.",
    dependencies: ["lucide-react"],
    code: `import { TrendingUp } from "lucide-react";

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
        <span className="text-sm font-semibold">Conversations</span>
        <span className="text-xs text-emerald-500 font-medium flex items-center gap-0.5">
          <TrendingUp className="w-3 h-3" /> +12.5%
        </span>
      </div>
      <div className="flex items-end gap-2 h-[100px]">
        {bars.map((b) => (
          <div key={b.label} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-purple-500 to-purple-300"
              style={{ height: \`\${b.value}%\` }}
            />
            <span className="text-[9px] text-gray-400">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  },
  "Line Chart": {
    description: "SVG-based line chart with gradient fill showing response time metrics over 7 days.",
    dependencies: ["lucide-react"],
    code: `import { TrendingDown } from "lucide-react";

function LineChartWidget() {
  const points = "0,60 30,40 60,55 90,25 120,35 150,15 180,30";
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold">Response Time</span>
        <span className="text-xs text-gray-400">Last 7 days</span>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl font-bold">1.2s</span>
        <span className="text-xs text-emerald-500 font-medium flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-50">
          <TrendingDown className="w-3 h-3" /> -0.3s
        </span>
      </div>
      <svg viewBox="0 0 180 70" className="w-full h-[60px]">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(168,85,247)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(168,85,247)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={\`0,70 \${points} 180,70\`} fill="url(#lineGrad)" />
        <polyline points={points} fill="none" stroke="rgb(168,85,247)" strokeWidth="2" />
      </svg>
    </div>
  );
}`,
  },
  "Donut Chart": {
    description: "SVG donut chart with color-coded segments and legend, showing resolution status breakdown.",
    dependencies: [],
    code: `function DonutChartWidget() {
  const segments = [
    { label: "Resolved", pct: 64, color: "#a855f7" },
    { label: "Pending", pct: 22, color: "#f59e0b" },
    { label: "Escalated", pct: 14, color: "#ef4444" },
  ];
  const r = 36, c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-[90px] h-[90px]">
        <svg viewBox="0 0 90 90" className="w-full h-full -rotate-90">
          {segments.map((s) => {
            const dash = (s.pct / 100) * c;
            const el = (
              <circle key={s.label} cx="45" cy="45" r={r} fill="none"
                stroke={s.color} strokeWidth="10"
                strokeDasharray={\`\${dash} \${c - dash}\`}
                strokeDashoffset={-offset} strokeLinecap="round" />
            );
            offset += dash;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-bold">64%</span>
        </div>
      </div>
      <div className="space-y-2">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
            <span className="text-xs">{s.label}</span>
            <span className="text-xs font-semibold ml-auto">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  },
  "Stats Cards": {
    description: "Three-column stats grid showing key metrics with trend indicators.",
    dependencies: [],
    code: `function StatsCardsWidget() {
  const stats = [
    { label: "Total Chats", value: "12,847", trend: "+8.2%", up: true },
    { label: "Avg Duration", value: "3m 24s", trend: "-12%", up: false },
    { label: "Resolution", value: "94.2%", trend: "+2.1%", up: true },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map((s) => (
        <div key={s.label} className="rounded-lg bg-gray-50 dark:bg-gray-800 p-2.5 text-center">
          <p className="text-base font-bold">{s.value}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{s.label}</p>
          <p className={\`text-[10px] font-medium mt-1 \${s.up ? "text-emerald-500" : "text-red-500"}\`}>
            {s.trend}
          </p>
        </div>
      ))}
    </div>
  );
}`,
  },
  "Progress Bars": {
    description: "Horizontal progress bars showing token usage breakdown by AI model.",
    dependencies: [],
    code: `function ProgressBarsWidget() {
  const bars = [
    { label: "GPT-4o", value: 87, color: "bg-purple-500" },
    { label: "Claude 4", value: 72, color: "bg-blue-500" },
    { label: "Gemini", value: 54, color: "bg-emerald-500" },
    { label: "Llama 3", value: 41, color: "bg-amber-500" },
  ];
  return (
    <div>
      <span className="text-sm font-semibold">Token Usage by Model</span>
      <div className="mt-3 space-y-3">
        {bars.map((b) => (
          <div key={b.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">{b.label}</span>
              <span className="text-xs font-medium">{b.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div className={\`h-full rounded-full \${b.color}\`} style={{ width: \`\${b.value}%\` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  },
  "User Profile Card": {
    description: "User profile card with avatar, name, status indicator, and stats row.",
    dependencies: [],
    code: `function UserProfileWidget() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500
        flex items-center justify-center text-white text-xl font-bold mb-2.5">
        JD
      </div>
      <h3 className="text-sm font-semibold">Jackson Davis</h3>
      <p className="text-xs text-gray-400 mb-3">Senior AI Engineer</p>
      <div className="flex items-center gap-1.5 mb-3">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="text-xs text-emerald-600 font-medium">Online</span>
      </div>
      <div className="flex gap-2 w-full">
        {[
          { value: "1,284", label: "Chats" },
          { value: "4.8", label: "Rating" },
          { value: "96%", label: "Resolved" },
        ].map((s) => (
          <div key={s.label} className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-800 py-2 text-center">
            <p className="text-sm font-bold">{s.value}</p>
            <p className="text-[10px] text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  },
  "Team Members": {
    description: "Team member list with avatars, names, roles, and action buttons.",
    dependencies: ["lucide-react"],
    code: `import { MoreHorizontal } from "lucide-react";

function TeamMembersWidget() {
  const members = [
    { initials: "JD", name: "Jackson Davis", role: "AI Engineer", color: "from-purple-400 to-indigo-500" },
    { initials: "SM", name: "Sarah Miller", role: "Product Lead", color: "from-pink-400 to-rose-500" },
    { initials: "AK", name: "Alex Kim", role: "Data Scientist", color: "from-blue-400 to-cyan-500" },
    { initials: "LR", name: "Lisa Roberts", role: "UX Designer", color: "from-emerald-400 to-teal-500" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold">Team Members</span>
        <span className="text-xs text-purple-500 font-medium">View all</span>
      </div>
      <div className="space-y-2.5">
        {members.map((m) => (
          <div key={m.initials} className="flex items-center gap-2.5">
            <div className={\`w-8 h-8 rounded-full bg-gradient-to-br \${m.color}
              flex items-center justify-center text-white text-[10px] font-bold\`}>
              {m.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{m.name}</p>
              <p className="text-[10px] text-gray-400">{m.role}</p>
            </div>
            <button className="p-1 rounded-md hover:bg-gray-100">
              <MoreHorizontal className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  },
  "Online Users": {
    description: "Shows stacked avatars of online users with active/idle/offline counts.",
    dependencies: [],
    code: `function OnlineUsersWidget() {
  const users = [
    { initials: "EM", color: "from-amber-400 to-orange-500" },
    { initials: "TW", color: "from-blue-400 to-indigo-500" },
    { initials: "NK", color: "from-rose-400 to-pink-500" },
    { initials: "CP", color: "from-emerald-400 to-teal-500" },
    { initials: "RJ", color: "from-purple-400 to-violet-500" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold">Online Now</span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
          128 users
        </span>
      </div>
      <div className="flex -space-x-2 mb-3">
        {users.map((u) => (
          <div key={u.initials}
            className={\`w-9 h-9 rounded-full bg-gradient-to-br \${u.color}
            flex items-center justify-center text-white text-[10px] font-bold border-2 border-white\`}>
            {u.initials}
          </div>
        ))}
        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center
          text-[10px] font-semibold text-gray-400 border-2 border-white">
          +123
        </div>
      </div>
      <div className="flex gap-2 text-xs">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 128 Active
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> 34 Idle
        </span>
      </div>
    </div>
  );
}`,
  },
  "Chat Bubbles": {
    description: "Chat message bubbles with AI bot avatar, user message, and typing indicator animation.",
    dependencies: ["lucide-react"],
    code: `import { Bot } from "lucide-react";

function ChatBubbleWidget() {
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
}`,
  },
  "Star Rating": {
    description: "Interactive star rating with hover effect, thumbs up/down buttons.",
    dependencies: ["lucide-react", "react"],
    code: `import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";

function StarRatingWidget() {
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
            <Star className={\`w-7 h-7 \${s <= (hover || rating)
              ? "text-amber-400 fill-amber-400" : "text-gray-200"}\`} />
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
}`,
  },
  "Toggle Settings": {
    description: "Settings panel with toggle switches for streaming, dark mode, sound, and privacy.",
    dependencies: ["lucide-react", "react"],
    code: `import { useState } from "react";
import { Zap, Moon, Volume2, Shield } from "lucide-react";

function ToggleSettingsWidget() {
  const [toggles, setToggles] = useState({
    streaming: true, darkMode: false, sound: true, privacy: true
  });
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
          <item.icon className="w-4 h-4 text-gray-400 shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-medium">{item.label}</p>
            <p className="text-[10px] text-gray-400">{item.desc}</p>
          </div>
          <button onClick={() => setToggles(p => ({ ...p, [item.key]: !p[item.key] }))}
            className={\`w-9 h-5 rounded-full transition-colors relative \${
              toggles[item.key] ? "bg-purple-500" : "bg-gray-200"}\`}>
            <span className={\`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform \${
              toggles[item.key] ? "left-[18px]" : "left-0.5"}\`} />
          </button>
        </div>
      ))}
    </div>
  );
}`,
  },
  "Model Selector": {
    description: "Radio-button style model picker with speed/accuracy details and badges.",
    dependencies: ["react"],
    code: `import { useState } from "react";

function ModelSelectorWidget() {
  const [selected, setSelected] = useState(0);
  const models = [
    { name: "GPT-4o", speed: "Fast", accuracy: "95%", badge: "Popular" },
    { name: "Claude 4", speed: "Medium", accuracy: "97%", badge: "Most Accurate" },
    { name: "Gemini 2.5", speed: "Very Fast", accuracy: "92%", badge: "Fastest" },
  ];
  return (
    <div>
      <span className="text-sm font-semibold">Choose Model</span>
      <div className="mt-2.5 space-y-2">
        {models.map((m, i) => (
          <button key={m.name} onClick={() => setSelected(i)}
            className={\`w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all text-left \${
              selected === i ? "border-purple-300 bg-purple-50 shadow-sm" : "border-gray-200"}\`}>
            <div className={\`w-4 h-4 rounded-full border-2 flex items-center justify-center \${
              selected === i ? "border-purple-500" : "border-gray-200"}\`}>
              {selected === i && <div className="w-2 h-2 rounded-full bg-purple-500" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold">{m.name}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-400">{m.badge}</span>
              </div>
              <div className="flex gap-3 mt-0.5">
                <span className="text-[10px] text-gray-400">Speed: {m.speed}</span>
                <span className="text-[10px] text-gray-400">Accuracy: {m.accuracy}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}`,
  },
  "Dropdown Select": {
    description: "Dropdown menus for AI model and language selection with icons.",
    dependencies: ["lucide-react", "react"],
    code: `import { useState } from "react";
import { Sparkles, ChevronDown, Globe } from "lucide-react";

function DropdownSelectWidget() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("GPT-4o");
  const models = ["GPT-4o", "Claude 4 Opus", "Gemini 2.5", "Llama 3.1"];
  return (
    <div>
      <label className="text-xs font-medium text-gray-400 mb-1 block">AI Model</label>
      <div className="relative">
        <button onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm font-medium">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />{selected}
          </div>
          <ChevronDown className={\`w-3.5 h-3.5 text-gray-400 transition-transform \${open ? "rotate-180" : ""}\`} />
        </button>
        {open && (
          <div className="absolute z-10 w-full mt-1 rounded-lg border bg-white dark:bg-gray-900 shadow-lg py-1">
            {models.map((m) => (
              <button key={m} onClick={() => { setSelected(m); setOpen(false); }}
                className={\`w-full text-left px-3 py-1.5 text-sm hover:bg-purple-50 \${
                  m === selected ? "text-purple-600 font-medium" : ""}\`}>
                {m}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}`,
  },
  "Live Chat Feed": {
    description: "Real-time chat feed with user avatars, messages, sentiment indicators, and live status.",
    dependencies: ["lucide-react"],
    code: `function LiveChatFeedWidget() {
  const chats = [
    { user: "EM", message: "How do I reset my password?", time: "Just now", sentiment: "neutral", color: "from-amber-400 to-orange-500" },
    { user: "TW", message: "The API returns a 500 error", time: "2m ago", sentiment: "negative", color: "from-blue-400 to-indigo-500" },
    { user: "NK", message: "Thanks! That worked perfectly", time: "5m ago", sentiment: "positive", color: "from-rose-400 to-pink-500" },
  ];
  const sentimentColor = { positive: "bg-emerald-400", negative: "bg-red-400", neutral: "bg-amber-400" };
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
            <div className={\`w-7 h-7 rounded-full bg-gradient-to-br \${c.color}
              flex items-center justify-center text-white text-[9px] font-bold\`}>
              {c.user}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs truncate">{c.message}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] text-gray-400">{c.time}</span>
                <span className={\`w-1.5 h-1.5 rounded-full \${sentimentColor[c.sentiment]}\`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  },
  "Quick Replies": {
    description: "Predefined quick reply buttons with a custom reply input field.",
    dependencies: ["lucide-react"],
    code: `import { Zap, Send } from "lucide-react";

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
}`,
  },
  "Sentiment Analysis": {
    description: "Sentiment breakdown bar with emoji indicators and percentage labels.",
    dependencies: [],
    code: `function SentimentWidget() {
  const data = [
    { label: "Positive", value: 68, color: "bg-emerald-400", emoji: "≡ƒÿè" },
    { label: "Neutral", value: 22, color: "bg-amber-400", emoji: "≡ƒÿÉ" },
    { label: "Negative", value: 10, color: "bg-red-400", emoji: "≡ƒÿƒ" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold">Sentiment Analysis</span>
        <span className="text-xs text-gray-400">Last 24h</span>
      </div>
      <div className="flex h-3 rounded-full overflow-hidden mb-3">
        {data.map((d) => (
          <div key={d.label} className={d.color} style={{ width: \`\${d.value}%\` }} />
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
}`,
  },
  "Notification Feed": {
    description: "Notification list with colored icons, message text, and timestamps.",
    dependencies: ["lucide-react"],
    code: `import { ArrowUpRight, Check, Bell, Eye } from "lucide-react";

function NotificationFeedWidget() {
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
            <div className={\`w-7 h-7 rounded-lg flex items-center justify-center \${n.color}\`}>
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
}`,
  },
  "Satisfaction Gauge": {
    description: "Semi-circular gauge showing customer satisfaction score with review count.",
    dependencies: [],
    code: `function SatisfactionGaugeWidget() {
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
            strokeLinecap="round" strokeDasharray={\`\${(angle / 180) * 188.5} 188.5\`} />
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
}`,
  },
  "Code Block Output": {
    description: "Syntax-highlighted code block with language badge and copy-to-clipboard button.",
    dependencies: ["lucide-react", "react"],
    code: `import { useState } from "react";
import { Code2, Copy, Check } from "lucide-react";

function CodeBlockWidget() {
  const [copied, setCopied] = useState(false);
  const code = \`async function chat(prompt) {
  const res = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
  return res.json();
}\`;
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
}`,
  },
  "File Upload Preview": {
    description: "File attachment list with icons, sizes, and a drag-and-drop upload area.",
    dependencies: ["lucide-react"],
    code: `import { FileText, Image, Eye, X, Upload } from "lucide-react";

function FileUploadWidget() {
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
            <div className={\`w-8 h-8 rounded-lg flex items-center justify-center \${f.color}\`}>
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
}`,
  },
  "Voice Input": {
    description: "Voice recording widget with animated waveform bars and record/stop button.",
    dependencies: ["lucide-react", "react"],
    code: `import { useState } from "react";
import { Mic } from "lucide-react";

function VoiceInputWidget() {
  const [recording, setRecording] = useState(false);
  const bars = [3, 5, 8, 12, 7, 14, 6, 10, 4, 8, 13, 5, 9, 7, 11, 4, 6, 10, 8, 5];
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm font-semibold mb-3">Voice Input</span>
      <button onClick={() => setRecording(!recording)}
        className={\`w-14 h-14 rounded-full flex items-center justify-center transition-all mb-3 \${
          recording ? "bg-red-500 shadow-lg shadow-red-200 animate-pulse"
          : "bg-gradient-to-br from-purple-400 to-purple-600 hover:shadow-lg"}\`}>
        <Mic className="w-6 h-6 text-white" />
      </button>
      <div className="flex items-end gap-[3px] h-[32px] mb-2">
        {bars.map((h, i) => (
          <div key={i} className={\`w-[3px] rounded-full transition-all \${recording ? "bg-purple-400" : "bg-gray-200"}\`}
            style={{ height: recording ? \`\${h * 2.2}px\` : \`\${h}px\` }} />
        ))}
      </div>
      <span className={\`text-xs font-medium \${recording ? "text-red-500" : "text-gray-400"}\`}>
        {recording ? "Recording... 0:03" : "Tap to speak"}
      </span>
    </div>
  );
}`,
  },
  "Image Generation": {
    description: "AI image generation output card with resolution info and regenerate button.",
    dependencies: ["lucide-react"],
    code: `import { Image, Play, Upload } from "lucide-react";

function ImageGenWidget() {
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
          <span className="text-[10px] text-purple-600 font-medium">512 ├ù 512</span>
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
}`,
  },
  "Tag Input": {
    description: "Tag management with colored badges, remove buttons, and add new tag input.",
    dependencies: ["lucide-react", "react"],
    code: `import { useState } from "react";
import { Tag, X } from "lucide-react";

function TagInputWidget() {
  const [tags, setTags] = useState(["billing", "urgent", "api-error", "v2.1"]);
  const [input, setInput] = useState("");
  return (
    <div>
      <div className="flex items-center gap-2 mb-2.5">
        <Tag className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-sm font-semibold">Conversation Tags</span>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-2.5">
        {tags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
            bg-gray-100 dark:bg-gray-800 border">
            {tag}
            <button onClick={() => setTags(tags.filter(t => t !== tag))}><X className="w-3 h-3" /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && input.trim()) { setTags([...tags, input.trim()]); setInput(""); }}}
          placeholder="Add tag..." className="flex-1 px-3 py-1.5 rounded-lg border text-xs outline-none" />
        <button onClick={() => { if (input.trim()) { setTags([...tags, input.trim()]); setInput(""); }}}
          className="px-3 py-1.5 rounded-lg bg-purple-500 text-white text-xs font-medium">Add</button>
      </div>
    </div>
  );
}`,
  },
  "Date Picker": {
    description: "Calendar date picker with month navigation, day grid, and selected/today highlighting.",
    dependencies: ["lucide-react", "react"],
    code: `import { useState } from "react";
import { Calendar } from "lucide-react";

function DatePickerWidget() {
  const [selectedDay, setSelectedDay] = useState(15);
  const daysInMonth = 30;
  const startDay = 2;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startDay }, (_, i) => i);
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-purple-500" />
          <span className="text-sm font-semibold">April 2026</span>
        </div>
        <div className="flex gap-1">
          <button className="w-6 h-6 rounded-md hover:bg-gray-100 flex items-center justify-center text-xs">ΓÇ╣</button>
          <button className="w-6 h-6 rounded-md hover:bg-gray-100 flex items-center justify-center text-xs">ΓÇ║</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
          <span key={d} className="text-[9px] font-medium text-gray-400 py-1">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {blanks.map(b => <span key={\`b\${b}\`} />)}
        {days.map(d => (
          <button key={d} onClick={() => setSelectedDay(d)}
            className={\`w-full aspect-square rounded-md text-[10px] font-medium \${
              d === selectedDay ? "bg-purple-500 text-white shadow-sm"
              : d === 19 ? "bg-purple-50 text-purple-600 font-semibold"
              : "hover:bg-gray-100"}\`}>
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}`,
  },
  "Theme Customizer": {
    description: "Theme customization panel with accent color picker, font size options, and border radius slider.",
    dependencies: ["lucide-react", "react"],
    code: `import { useState } from "react";
import { Palette } from "lucide-react";

function ThemeCustomizerWidget() {
  const [activeColor, setActiveColor] = useState(3);
  const colors = [
    { name: "Red", bg: "bg-red-500", ring: "ring-red-300" },
    { name: "Amber", bg: "bg-amber-500", ring: "ring-amber-300" },
    { name: "Emerald", bg: "bg-emerald-500", ring: "ring-emerald-300" },
    { name: "Purple", bg: "bg-purple-500", ring: "ring-purple-300" },
    { name: "Blue", bg: "bg-blue-500", ring: "ring-blue-300" },
    { name: "Pink", bg: "bg-pink-500", ring: "ring-pink-300" },
  ];
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Palette className="w-3.5 h-3.5 text-purple-500" />
        <span className="text-sm font-semibold">Theme Customizer</span>
      </div>
      <label className="text-xs text-gray-400 mb-1.5 block">Accent Color</label>
      <div className="flex gap-2 mb-3">
        {colors.map((c, i) => (
          <button key={c.name} onClick={() => setActiveColor(i)}
            className={\`w-7 h-7 rounded-full \${c.bg} \${
              activeColor === i ? \`ring-2 \${c.ring} ring-offset-2 scale-110\` : "hover:scale-105"}\`} />
        ))}
      </div>
      <label className="text-xs text-gray-400 mb-1.5 block">Font Size</label>
      <div className="flex gap-1.5">
        {["Small", "Medium", "Large"].map((s, i) => (
          <button key={s} className={\`flex-1 py-1.5 rounded-md text-xs font-medium \${
            i === 1 ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-500"}\`}>{s}</button>
        ))}
      </div>
    </div>
  );
}`,
  },
  "Keyboard Shortcuts": {
    description: "Keyboard shortcut reference list with styled key badges.",
    dependencies: ["lucide-react"],
    code: `import { Keyboard } from "lucide-react";

function KeyboardShortcutsWidget() {
  const shortcuts = [
    { keys: ["Γîÿ", "K"], desc: "Open command palette" },
    { keys: ["Γîÿ", "N"], desc: "New conversation" },
    { keys: ["Γîÿ", "Γçº", "C"], desc: "Copy last response" },
    { keys: ["Γîÿ", "/"], desc: "Toggle sidebar" },
    { keys: ["Esc"], desc: "Close modal" },
    { keys: ["Enter"], desc: "Send message" },
  ];
  return (
    <div>
      <div className="flex items-center gap-2 mb-2.5">
        <Keyboard className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-sm font-semibold">Keyboard Shortcuts</span>
      </div>
      <div className="space-y-1.5">
        {shortcuts.map((s) => (
          <div key={s.desc} className="flex items-center justify-between py-1">
            <span className="text-xs text-gray-500">{s.desc}</span>
            <div className="flex gap-1">
              {s.keys.map((k) => (
                <kbd key={k} className="min-w-[22px] h-[22px] rounded-md bg-gray-100 border text-[10px]
                  font-mono font-medium flex items-center justify-center px-1.5 shadow-sm">{k}</kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  },
  "Token Cost Calculator": {
    description: "Table showing token usage costs per AI model with totals.",
    dependencies: [],
    code: `function TokenCostWidget() {
  const models = [
    { name: "GPT-4o", tokens: "124K", rate: "$2.50/M", total: "$3.45" },
    { name: "Claude 4", tokens: "89K", rate: "$3.00/M", total: "$4.12" },
    { name: "Gemini 2.5", tokens: "201K", rate: "$1.25/M", total: "$2.18" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-sm font-semibold">Token Cost Calculator</span>
        <span className="text-xs text-gray-400">Today</span>
      </div>
      <div className="rounded-lg border overflow-hidden">
        <div className="grid grid-cols-4 bg-gray-50 dark:bg-gray-800 px-2.5 py-1.5">
          {["Model", "Tokens", "Rate", "Cost"].map(h => (
            <span key={h} className={\`text-[10px] font-semibold text-gray-400 \${h !== "Model" ? "text-right" : ""}\`}>{h}</span>
          ))}
        </div>
        {models.map((m) => (
          <div key={m.name} className="grid grid-cols-4 px-2.5 py-2 border-t">
            <span className="text-xs font-medium">{m.name}</span>
            <span className="text-xs text-gray-400 text-right">{m.tokens}</span>
            <span className="text-[10px] text-gray-400 text-right">{m.rate}</span>
            <span className="text-xs font-semibold text-right">{m.total}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2.5 px-1">
        <span className="text-xs text-gray-400">Total spend</span>
        <span className="text-sm font-bold">$9.75</span>
      </div>
    </div>
  );
}`,
  },
  "Bot Persona": {
    description: "Bot persona selector cards with avatars, descriptions, and active state.",
    dependencies: ["lucide-react", "react"],
    code: `import { useState } from "react";
import { Check } from "lucide-react";

function BotPersonaWidget() {
  const [active, setActive] = useState(0);
  const personas = [
    { name: "Sondor AI", desc: "General assistant", avatar: "≡ƒñû", gradient: "from-purple-400 to-indigo-500" },
    { name: "CodeBot", desc: "Developer helper", avatar: "≡ƒæ¿ΓÇì≡ƒÆ╗", gradient: "from-blue-400 to-cyan-500" },
    { name: "Writer", desc: "Content creator", avatar: "Γ£ì∩╕Å", gradient: "from-pink-400 to-rose-500" },
  ];
  return (
    <div>
      <span className="text-sm font-semibold">Bot Persona</span>
      <p className="text-xs text-gray-400 mb-2.5">Choose your AI assistant personality</p>
      <div className="space-y-2">
        {personas.map((p, i) => (
          <button key={p.name} onClick={() => setActive(i)}
            className={\`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all text-left \${
              active === i ? "border-purple-300 bg-purple-50/50 shadow-sm" : "border-gray-200"}\`}>
            <div className={\`w-10 h-10 rounded-xl bg-gradient-to-br \${p.gradient} flex items-center justify-center text-lg\`}>
              {p.avatar}
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold">{p.name}</p>
              <p className="text-[10px] text-gray-400">{p.desc}</p>
            </div>
            {active === i && (
              <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}`,
  },
  "API Status": {
    description: "API service status dashboard with uptime bars and per-service health indicators.",
    dependencies: [],
    code: `function UptimeStatusWidget() {
  const services = [
    { name: "Chat API", status: "operational", uptime: "99.98%" },
    { name: "Embedding Service", status: "operational", uptime: "99.95%" },
    { name: "Image Generation", status: "degraded", uptime: "98.20%" },
    { name: "Voice API", status: "operational", uptime: "99.91%" },
  ];
  const statusMap = {
    operational: { color: "text-emerald-600", dot: "bg-emerald-400", label: "Operational" },
    degraded: { color: "text-amber-600", dot: "bg-amber-400", label: "Degraded" },
    down: { color: "text-red-600", dot: "bg-red-400", label: "Down" },
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-sm font-semibold">API Status</span>
        <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> All systems go
        </span>
      </div>
      <div className="space-y-2">
        {services.map((s) => {
          const st = statusMap[s.status];
          return (
            <div key={s.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={\`w-2 h-2 rounded-full \${st.dot}\`} />
                <span className="text-xs font-medium">{s.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400">{s.uptime}</span>
                <span className={\`text-[10px] font-medium \${st.color}\`}>{st.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
  },
  "Export Options": {
    description: "Conversation export buttons for PDF, JSON, and Markdown formats.",
    dependencies: ["lucide-react"],
    code: `import { FileText, Code2, BookOpen, ArrowUpRight } from "lucide-react";

function ConversationExportWidget() {
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
            <div className={\`w-9 h-9 rounded-lg flex items-center justify-center \${f.color}\`}>
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
}`,
  },
  "Model Leaderboard": {
    description: "AI model ranking table with scores, progress bars, and trend indicators.",
    dependencies: [],
    code: `function LeaderboardWidget() {
  const models = [
    { rank: 1, name: "GPT-4o", score: 94.2, trend: "+1.2", medal: "≡ƒÑç" },
    { rank: 2, name: "Claude 4 Opus", score: 93.8, trend: "+2.5", medal: "≡ƒÑê" },
    { rank: 3, name: "Gemini 2.5 Pro", score: 91.5, trend: "-0.3", medal: "≡ƒÑë" },
    { rank: 4, name: "Llama 3.1 405B", score: 88.1, trend: "+0.8", medal: "" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-sm font-semibold">Model Leaderboard</span>
        <span className="text-xs text-gray-400">MMLU Score</span>
      </div>
      <div className="space-y-1.5">
        {models.map((m) => (
          <div key={m.rank} className={\`flex items-center gap-2.5 p-2 rounded-lg \${
            m.rank === 1 ? "bg-amber-50/50 border border-amber-100" : ""}\`}>
            <span className="text-sm w-6 text-center">{m.medal || m.rank}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold">{m.name}</p>
              <div className="w-full h-1.5 rounded-full bg-gray-100 mt-1 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-500"
                  style={{ width: \`\${m.score}%\` }} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold">{m.score}</p>
              <p className={\`text-[10px] font-medium \${m.trend.startsWith("+") ? "text-emerald-500" : "text-red-500"}\`}>
                {m.trend}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  },
  "Prompt Templates": {
    description: "Pre-built prompt template cards with icons and preview text.",
    dependencies: ["lucide-react"],
    code: `import { Code2, BookOpen, Globe } from "lucide-react";

function PromptTemplatesWidget() {
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
              <div className={\`w-6 h-6 rounded-md flex items-center justify-center \${t.color}\`}>
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
}`,
  },
};