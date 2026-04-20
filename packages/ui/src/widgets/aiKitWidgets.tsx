"use client";

import {
  GitBranch,
  Zap,
  Trophy,
  Brain,
  FlaskConical,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Pin,
  Clock,
  Gauge,
  Play,
  Plus,
  ChevronRight,
  CheckCircle2,
  Circle,
} from "lucide-react";

/* ---------------------------------------------------------------------------
 * 1) Conversation Branching Tree
 * ------------------------------------------------------------------------ */
export function ConversationBranchingWidget() {
  const branches = [
    { id: "A", model: "GPT-4o", preview: "Here's a structured plan with 3 phases…", active: true, score: 92 },
    { id: "B", model: "Claude 4 Opus", preview: "Let me approach this differently — first, we…", active: false, score: 88 },
    { id: "C", model: "Gemini 2.5", preview: "I'd recommend a leaner approach focused on…", active: false, score: 81 },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <GitBranch className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary">Conversation Branches</h3>
            <p className="text-[11px] text-text-muted">Compare regenerated responses side-by-side</p>
          </div>
        </div>
        <button className="text-[11.5px] font-medium text-violet-600 hover:text-violet-700 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-violet-50 cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> New branch
        </button>
      </div>

      <div className="rounded-lg bg-hover-bg/40 border border-border-light p-3 mb-3">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-md bg-gray-200 shrink-0" />
          <div className="text-[12.5px] text-text-secondary leading-relaxed">
            How should we architect a real-time AI chat system that scales to 10k concurrent users?
          </div>
        </div>
      </div>

      <div className="relative pl-5">
        <div className="absolute left-2 top-0 bottom-2 w-px bg-border-light" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {branches.map((b) => (
            <div
              key={b.id}
              className={`relative rounded-lg border p-3 transition-all ${
                b.active
                  ? "border-violet-300 bg-violet-50/40 ring-1 ring-violet-200"
                  : "border-border-light bg-card hover:border-violet-200"
              }`}
            >
              <div
                className={`absolute -left-[14px] top-4 w-2.5 h-2.5 rounded-full border-2 ${
                  b.active ? "bg-violet-500 border-violet-200" : "bg-card border-border-light"
                }`}
              />
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10.5px] font-mono font-semibold text-text-muted">Branch {b.id}</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-card border border-border-light text-text-secondary">
                  {b.score}
                </span>
              </div>
              <div className="text-[11.5px] font-medium text-text-primary mb-1">{b.model}</div>
              <p className="text-[11.5px] text-text-secondary leading-relaxed line-clamp-2">{b.preview}</p>
              <div className="flex items-center gap-1 mt-2.5">
                <button className="p-1 rounded hover:bg-hover-bg cursor-pointer text-text-muted">
                  <ThumbsUp className="w-3 h-3" />
                </button>
                <button className="p-1 rounded hover:bg-hover-bg cursor-pointer text-text-muted">
                  <ThumbsDown className="w-3 h-3" />
                </button>
                <button className="ml-auto text-[10.5px] font-medium text-violet-600 hover:underline cursor-pointer">
                  Continue →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * 2) Token Stream Inspector
 * ------------------------------------------------------------------------ */
export function TokenStreamInspectorWidget() {
  const ticks = [
    8, 14, 22, 28, 31, 34, 36, 35, 38, 42, 44, 41, 39, 43, 46, 48, 45, 47, 50, 52, 49, 51, 53, 55, 54,
    57, 59, 56, 58, 60,
  ];
  const max = Math.max(...ticks);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary">Token Stream Inspector</h3>
            <p className="text-[11px] text-text-muted">Live streaming throughput and latency breakdown</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10.5px] font-semibold text-emerald-700">Streaming</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {[
          { label: "TTFB", value: "287ms", icon: Clock },
          { label: "Tokens/sec", value: "54.2", icon: Gauge },
          { label: "Total tokens", value: "1,284", icon: Sparkles },
          { label: "Cost", value: "$0.018", icon: Trophy },
        ].map((s) => (
          <div key={s.label} className="rounded-lg bg-hover-bg/50 border border-border-light p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <s.icon className="w-3 h-3 text-text-muted" />
              <span className="text-[10.5px] text-text-muted uppercase tracking-wider">{s.label}</span>
            </div>
            <div className="text-[15px] font-bold text-text-primary tabular-nums">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-gradient-to-b from-amber-50/40 to-transparent border border-border-light p-3">
        <div className="flex items-end gap-[2px] h-[68px]">
          {ticks.map((t, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-amber-500 to-orange-400"
              style={{ height: `${(t / max) * 100}%`, opacity: 0.5 + (i / ticks.length) * 0.5 }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-2 text-[10.5px] text-text-muted">
          <span>0s</span>
          <span>tokens / 100ms bucket</span>
          <span>3.0s</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * 3) Model Comparison Arena
 * ------------------------------------------------------------------------ */
export function ModelComparisonArenaWidget() {
  const models = [
    {
      name: "GPT-4o",
      gradient: "from-emerald-400 to-teal-500",
      latency: "1.2s",
      tokens: 412,
      response:
        "To scale a real-time chat to 10k users, use WebSockets behind a load balancer with Redis pub/sub for fan-out…",
      votes: 124,
      winner: true,
    },
    {
      name: "Claude 4 Opus",
      gradient: "from-orange-400 to-red-500",
      latency: "1.8s",
      tokens: 487,
      response:
        "I'd recommend a hybrid approach: SSE for AI streaming, WebSockets for presence, and a queue layer for back-pressure…",
      votes: 98,
      winner: false,
    },
    {
      name: "Gemini 2.5 Pro",
      gradient: "from-blue-400 to-indigo-500",
      latency: "0.9s",
      tokens: 356,
      response:
        "Start with a single-region edge function setup, then shard by conversation ID once you cross 5k concurrent…",
      votes: 71,
      winner: false,
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary">Model Comparison Arena</h3>
            <p className="text-[11px] text-text-muted">Run the same prompt across providers — vote on the best</p>
          </div>
        </div>
        <button className="text-[11.5px] font-medium text-white bg-rose-500 hover:bg-rose-600 px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer">
          <Play className="w-3.5 h-3.5 fill-current" /> Re-run
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {models.map((m) => (
          <div
            key={m.name}
            className={`rounded-lg border p-3 flex flex-col ${
              m.winner ? "border-emerald-300 bg-emerald-50/30" : "border-border-light bg-card"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${m.gradient}`} />
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] font-semibold text-text-primary truncate">{m.name}</div>
                <div className="text-[10.5px] text-text-muted">
                  {m.latency} · {m.tokens} tok
                </div>
              </div>
              {m.winner && (
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  Winner
                </span>
              )}
            </div>
            <p className="text-[11.5px] text-text-secondary leading-relaxed line-clamp-3 mb-3 flex-1">
              {m.response}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-border-light">
              <div className="flex items-center gap-1">
                <button className="p-1 rounded hover:bg-hover-bg cursor-pointer text-text-muted">
                  <ThumbsUp className="w-3 h-3" />
                </button>
                <span className="text-[10.5px] font-semibold text-text-secondary tabular-nums">{m.votes}</span>
              </div>
              <button className="text-[10.5px] font-medium text-text-secondary hover:text-text-primary flex items-center gap-0.5 cursor-pointer">
                Full output <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * 4) Context Memory Visualizer
 * ------------------------------------------------------------------------ */
export function ContextMemoryVisualizerWidget() {
  const used = 8420;
  const total = 128000;
  const pct = (used / total) * 100;
  const segments = [
    { label: "System", tokens: 240, color: "bg-violet-400" },
    { label: "Pinned facts", tokens: 1180, color: "bg-amber-400" },
    { label: "Summary", tokens: 2300, color: "bg-blue-400" },
    { label: "Recent turns", tokens: 4700, color: "bg-emerald-400" },
  ];
  const pinned = [
    { label: "User name", value: "Anand" },
    { label: "Project", value: "ai-chat-ui" },
    { label: "Stack", value: "Next.js · TS · Tailwind" },
    { label: "Tone", value: "Concise, technical" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary">Context Memory</h3>
            <p className="text-[11px] text-text-muted">What the assistant currently remembers</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[12.5px] font-bold text-text-primary tabular-nums">
            {used.toLocaleString()} <span className="text-text-muted font-normal">/ {(total / 1000).toFixed(0)}k</span>
          </div>
          <div className="text-[10.5px] text-text-muted">{pct.toFixed(1)}% of window</div>
        </div>
      </div>

      <div className="h-3 rounded-full bg-hover-bg overflow-hidden flex mb-2">
        {segments.map((s) => (
          <div
            key={s.label}
            className={s.color}
            style={{ width: `${(s.tokens / total) * 100}%` }}
            title={`${s.label}: ${s.tokens} tokens`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-sm ${s.color}`} />
            <span className="text-[10.5px] text-text-secondary">{s.label}</span>
            <span className="text-[10.5px] text-text-muted tabular-nums">{s.tokens.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Pin className="w-3 h-3 text-amber-500" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Pinned facts</span>
          </div>
          <div className="space-y-1.5">
            {pinned.map((p) => (
              <div
                key={p.label}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-hover-bg/50 border border-border-light"
              >
                <span className="text-[10.5px] text-text-muted shrink-0">{p.label}</span>
                <span className="text-[11.5px] font-medium text-text-primary truncate">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Summary</span>
          </div>
          <div className="rounded-md bg-hover-bg/50 border border-border-light p-2.5">
            <p className="text-[11.5px] text-text-secondary leading-relaxed">
              User is refactoring an open-source AI chat UI built with Next.js 16 and Tailwind v4. They prefer
              concise, action-oriented responses and have completed the feature-first restructure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * 5) Prompt Lab Workbench
 * ------------------------------------------------------------------------ */
export function PromptLabWorkbenchWidget() {
  const variants = [
    { name: "Variant A", temp: 0.2, status: "done", tokens: 184, score: 8.4 },
    { name: "Variant B", temp: 0.7, status: "done", tokens: 246, score: 9.1 },
    { name: "Variant C", temp: 1.0, status: "running", tokens: 92, score: null as number | null },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
            <FlaskConical className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary">Prompt Lab</h3>
            <p className="text-[11px] text-text-muted">A/B test prompts across variants and parameters</p>
          </div>
        </div>
        <button className="text-[11.5px] font-medium text-white bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer">
          <Play className="w-3.5 h-3.5 fill-current" /> Run all
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-1 space-y-2.5">
          <div className="rounded-lg border border-border-light bg-hover-bg/40 p-3">
            <div className="text-[10.5px] font-semibold uppercase tracking-wider text-violet-600 mb-1.5">
              System
            </div>
            <p className="text-[11.5px] text-text-secondary leading-relaxed">
              You are a senior staff engineer. Answer concisely with code examples when relevant.
            </p>
          </div>
          <div className="rounded-lg border border-border-light bg-hover-bg/40 p-3">
            <div className="text-[10.5px] font-semibold uppercase tracking-wider text-blue-600 mb-1.5">User</div>
            <p className="text-[11.5px] text-text-secondary leading-relaxed">
              Explain the difference between SSR and RSC in Next.js with one short example.
            </p>
          </div>
          <div className="rounded-lg border border-border-light bg-card p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-text-muted">
                Temperature
              </span>
              <span className="text-[11.5px] font-mono font-semibold text-text-primary">0.7</span>
            </div>
            <div className="h-1.5 rounded-full bg-hover-bg overflow-hidden">
              <div className="h-full w-[70%] bg-gradient-to-r from-emerald-400 to-green-500" />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-2">
          {variants.map((v) => (
            <div
              key={v.name}
              className="rounded-lg border border-border-light bg-card p-3 flex items-center gap-3"
            >
              <div className="shrink-0">
                {v.status === "done" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Circle className="w-4 h-4 text-amber-500 animate-pulse" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[12.5px] font-semibold text-text-primary">{v.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-hover-bg text-text-muted">
                    temp={v.temp}
                  </span>
                </div>
                <div className="text-[10.5px] text-text-muted tabular-nums">
                  {v.tokens} tokens · {v.status}
                </div>
              </div>
              <div className="text-right shrink-0">
                {v.score !== null ? (
                  <>
                    <div className="text-[15px] font-bold text-text-primary tabular-nums">{v.score}</div>
                    <div className="text-[10px] text-text-muted">eval score</div>
                  </>
                ) : (
                  <div className="text-[10.5px] text-amber-600 font-medium">running…</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
