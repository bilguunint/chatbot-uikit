"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

export function BarChartWidget() {
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
              style={{ height: `${b.value}%` }}
            />
            <span className="text-[9px] text-gray-400">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LineChartWidget() {
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
        <polygon points={`0,70 ${points} 180,70`} fill="url(#lineGrad)" />
        <polyline points={points} fill="none" stroke="rgb(168,85,247)" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function DonutChartWidget() {
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
                strokeDasharray={`${dash} ${c - dash}`}
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
}

export function StatsCardsWidget() {
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
          <p className={`text-[10px] font-medium mt-1 ${s.up ? "text-emerald-500" : "text-red-500"}`}>
            {s.trend}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ProgressBarsWidget() {
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
              <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TokenCostWidget() {
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
            <span key={h} className={`text-[10px] font-semibold text-gray-400 ${h !== "Model" ? "text-right" : ""}`}>{h}</span>
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
}

export function UptimeStatusWidget() {
  type ServiceStatus = "operational" | "degraded" | "down";
  const services: { name: string; status: ServiceStatus; uptime: string }[] = [
    { name: "Chat API", status: "operational", uptime: "99.98%" },
    { name: "Embedding Service", status: "operational", uptime: "99.95%" },
    { name: "Image Generation", status: "degraded", uptime: "98.20%" },
    { name: "Voice API", status: "operational", uptime: "99.91%" },
  ];
  const statusMap: Record<ServiceStatus, { color: string; dot: string; label: string }> = {
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
                <span className={`w-2 h-2 rounded-full ${st.dot}`} />
                <span className="text-xs font-medium">{s.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400">{s.uptime}</span>
                <span className={`text-[10px] font-medium ${st.color}`}>{st.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LeaderboardWidget() {
  const models = [
    { rank: 1, name: "GPT-4o", score: 94.2, trend: "+1.2", medal: "🥇" },
    { rank: 2, name: "Claude 4 Opus", score: 93.8, trend: "+2.5", medal: "🥈" },
    { rank: 3, name: "Gemini 2.5 Pro", score: 91.5, trend: "-0.3", medal: "🥉" },
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
          <div key={m.rank} className={`flex items-center gap-2.5 p-2 rounded-lg ${
            m.rank === 1 ? "bg-amber-50/50 border border-amber-100" : ""}`}>
            <span className="text-sm w-6 text-center">{m.medal || m.rank}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold">{m.name}</p>
              <div className="w-full h-1.5 rounded-full bg-gray-100 mt-1 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-500"
                  style={{ width: `${m.score}%` }} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold">{m.score}</p>
              <p className={`text-[10px] font-medium ${m.trend.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}>
                {m.trend}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
