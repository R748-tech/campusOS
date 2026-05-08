"use client";
import { useState } from "react";

const navItems = [
  { icon: "🏠", label: "Home", id: "home" },
  { icon: "🔥", label: "Doubts", id: "doubts" },
  { icon: "📚", label: "Notes", id: "notes" },
  { icon: "😂", label: "Memes", id: "memes" },
  { icon: "🏆", label: "Ranks", id: "ranks" },
];

const feedItems = [
  {
    type: "doubt",
    user: "Rahul S.",
    avatar: "R",
    time: "2m ago",
    content: "Can anyone explain the difference between TCP and UDP in simple terms?",
    subject: "Computer Networks",
    answers: 3,
    points: "+10 pts",
  },
  {
    type: "meme",
    user: "Priya V.",
    avatar: "P",
    time: "15m ago",
    content: "When the professor says 'this won't come in exam' but it's 40% of the paper 💀",
    subject: "Meme Room",
    answers: 42,
    points: "+25 pts",
  },
  {
    type: "note",
    user: "Arjun K.",
    avatar: "A",
    time: "1h ago",
    content: "Uploaded complete Unit 3 notes for Data Structures — includes tree traversals + practice Qs",
    subject: "Data Structures",
    answers: 12,
    points: "+15 pts",
  },
  {
    type: "opportunity",
    user: "CampusOS",
    avatar: "C",
    time: "3h ago",
    content: "🚀 Google Summer of Code 2025 applications are now open! Deadline: April 2nd",
    subject: "Opportunity",
    answers: 8,
    points: null,
  },
];

export default function Dashboard() {
  const [active, setActive] = useState("home");

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f1f1f]">
        <h1 className="text-xl font-bold">
          Campus<span className="text-violet-500">OS</span>
        </h1>
        <div className="flex items-center gap-3">
          <div className="text-xs bg-violet-900/40 text-violet-300 px-3 py-1 rounded-full border border-violet-800">
            🔥 240 pts
          </div>
          <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-sm font-bold">
            R
          </div>
        </div>
      </div>

      {/* Welcome Strip */}
      <div className="px-5 py-4">
        <p className="text-gray-400 text-sm">Good morning,</p>
        <h2 className="text-white text-xl font-semibold">Rohit 👋</h2>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 px-5 mb-5">
        {[
          { label: "Rank", value: "#12", sub: "in college" },
          { label: "Doubts", value: "8", sub: "answered" },
          { label: "Streak", value: "5🔥", sub: "days" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Feed */}
      <div className="flex-1 px-5 space-y-3 pb-24">
        <h3 className="text-sm text-gray-500 font-medium mb-2">Your Feed</h3>
        {feedItems.map((item, i) => (
          <div key={i} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-violet-700 flex items-center justify-center text-xs font-bold">
                  {item.avatar}
                </div>
                <span className="text-sm text-gray-300">{item.user}</span>
                <span className="text-xs text-gray-600">{item.time}</span>
              </div>
              <span className="text-xs bg-[#111] border border-[#2a2a2a] text-gray-400 px-2 py-0.5 rounded-full">
                {item.subject}
              </span>
            </div>

            {/* Content */}
            <p className="text-sm text-gray-200 leading-relaxed">{item.content}</p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-600">
                {item.type === "doubt" ? `💬 ${item.answers} answers` :
                 item.type === "meme" ? `😂 ${item.answers} laughs` :
                 item.type === "note" ? `📥 ${item.answers} saved` :
                 `👀 ${item.answers} viewed`}
              </span>
              {item.points && (
                <span className="text-xs text-violet-400">{item.points}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      {/* Bottom Nav */}
<div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#1f1f1f] flex justify-around py-3 px-4">
  {[
    { icon: "🏠", label: "Home", href: "/dashboard" },
    { icon: "🔥", label: "Doubts", href: "/doubts" },
    { icon: "📚", label: "Notes", href: "/notes" },
    { icon: "😂", label: "Memes", href: "/memes" },
    { icon: "🏆", label: "Ranks", href: "/leaderboard" },
  ].map((nav) => (
      <a
      key={nav.href}
      href={nav.href}
      className={`flex flex-col items-center gap-1 transition ${
        nav.label === "Home" ? "text-violet-400" : "text-gray-600 hover:text-gray-400"
      }`}
    >
      <span className="text-xl">{nav.icon}</span>
      <span className="text-[10px]">{nav.label}</span>
    </a>
  ))}
</div>

    </div>
  );
}