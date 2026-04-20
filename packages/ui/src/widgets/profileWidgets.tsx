"use client";

import { useState } from "react";
import { MoreHorizontal, Check } from "lucide-react";

export function UserProfileWidget() {
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
}

export function TeamMembersWidget() {
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
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color}
              flex items-center justify-center text-white text-[10px] font-bold`}>
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
}

export function OnlineUsersWidget() {
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
            className={`w-9 h-9 rounded-full bg-gradient-to-br ${u.color}
            flex items-center justify-center text-white text-[10px] font-bold border-2 border-white`}>
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
}

export function BotPersonaWidget() {
  const [active, setActive] = useState(0);
  const personas = [
    { name: "Sondor AI", desc: "General assistant", avatar: "🤖", gradient: "from-purple-400 to-indigo-500" },
    { name: "CodeBot", desc: "Developer helper", avatar: "👨‍💻", gradient: "from-blue-400 to-cyan-500" },
    { name: "Writer", desc: "Content creator", avatar: "✍️", gradient: "from-pink-400 to-rose-500" },
  ];
  return (
    <div>
      <span className="text-sm font-semibold">Bot Persona</span>
      <p className="text-xs text-gray-400 mb-2.5">Choose your AI assistant personality</p>
      <div className="space-y-2">
        {personas.map((p, i) => (
          <button key={p.name} onClick={() => setActive(i)}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all text-left ${
              active === i ? "border-purple-300 bg-purple-50/50 shadow-sm" : "border-gray-200"}`}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-lg`}>
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
}
