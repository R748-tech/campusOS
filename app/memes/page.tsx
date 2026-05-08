"use client";
import { useState } from "react";

const memes = [
  { id: 1, user: "Rahul S.", avatar: "R", college: "IIT Delhi", time: "5m ago", caption: "When the professor says 'this won't come in exam' but it's 40% of the paper 💀", emoji: "😭", likes: 142, laughs: 89, visibility: "all", bg: "from-violet-900 to-purple-950" },
  { id: 2, user: "Priya V.", avatar: "P", college: "IIT Delhi", time: "20m ago", caption: "Me explaining my project to the teacher vs what I actually built 🙃", emoji: "🤡", likes: 98, laughs: 67, visibility: "college", bg: "from-blue-900 to-indigo-950" },
  { id: 3, user: "Arjun K.", avatar: "A", college: "IIT Delhi", time: "1h ago", caption: "Day 1 of college: I will study every day. Day 2: ...", emoji: "💤", likes: 210, laughs: 134, visibility: "all", bg: "from-rose-900 to-pink-950" },
  { id: 4, user: "Neha G.", avatar: "N", college: "IIT Delhi", time: "3h ago", caption: "Our canteen food be like: Nutrition facts: mostly regret", emoji: "🍛", likes: 76, laughs: 45, visibility: "college", bg: "from-green-900 to-emerald-950" },
];

const navItems = [
  { icon: "🏠", label: "Home", href: "/dashboard" },
  { icon: "🔥", label: "Doubts", href: "/doubts" },
  { icon: "📚", label: "Notes", href: "/notes" },
  { icon: "😂", label: "Memes", href: "/memes" },
  { icon: "🏆", label: "Ranks", href: "/leaderboard" },
];

export default function Memes() {
  const [activeTab, setActiveTab] = useState<"all" | "college">("all");
  const [likedMemes, setLikedMemes] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedMemes((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const filteredMemes = memes.filter((m) =>
    activeTab === "college" ? m.visibility === "college" : true
  );

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col pb-24">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-3">
          <a href="/dashboard" className="text-gray-500 hover:text-white transition">←</a>
          <h1 className="text-lg font-bold">Meme Room 😂</h1>
        </div>
        <div className="flex items-center gap-2">
          <a href="/memes/my-memes"
            className="text-xs bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 hover:text-white px-3 py-1 rounded-full transition">
            My Memes
          </a>
          <div className="text-xs bg-violet-900/40 text-violet-300 px-3 py-1 rounded-full border border-violet-800">
            +20 pts per meme
          </div>
        </div>
      </div>

      {/* Tab Filter */}
      <div className="flex gap-2 px-5 py-4">
        <button onClick={() => setActiveTab("all")}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
            activeTab === "all" ? "bg-violet-600 text-white" : "bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400"
          }`}>
          🌍 All Colleges
        </button>
        <button onClick={() => setActiveTab("college")}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
            activeTab === "college" ? "bg-violet-600 text-white" : "bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400"
          }`}>
          🏫 My College
        </button>
      </div>

      {/* Meme Feed */}
      <div className="px-5 space-y-4">
        {filteredMemes.map((meme) => (
          <div key={meme.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden">
            <div className={`bg-gradient-to-br ${meme.bg} p-8 flex flex-col items-center justify-center min-h-[160px] relative`}>
              <div className="text-6xl mb-3">{meme.emoji}</div>
              <p className="text-white text-sm text-center font-medium leading-relaxed px-2">{meme.caption}</p>
              <div className={`absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full border ${
                meme.visibility === "college"
                  ? "bg-yellow-900/40 text-yellow-300 border-yellow-800"
                  : "bg-green-900/40 text-green-300 border-green-800"
              }`}>
                {meme.visibility === "college" ? "🏫 My College" : "🌍 All"}
              </div>
            </div>

            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-violet-700 flex items-center justify-center text-xs font-bold">
                  {meme.avatar}
                </div>
                <span className="text-xs text-gray-400">{meme.user}</span>
                <span className="text-xs text-gray-600">{meme.time}</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => toggleLike(meme.id)}
                  className={`flex items-center gap-1 text-xs transition ${
                    likedMemes.includes(meme.id) ? "text-red-400" : "text-gray-500 hover:text-red-400"
                  }`}>
                  {likedMemes.includes(meme.id) ? "❤️" : "🤍"} {meme.likes + (likedMemes.includes(meme.id) ? 1 : 0)}
                </button>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-yellow-400 transition">
                  😂 {meme.laughs}
                </button>
                <button className="text-xs text-gray-500 hover:text-violet-400 transition">
                  ↗ Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Meme Button — navigates to editor */}
      <button
        onClick={() => window.location.href = "/memes/editor"}
        className="fixed bottom-20 right-5 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-full shadow-lg text-sm font-semibold transition"
      >
        + Create Meme
      </button>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#1f1f1f] flex justify-around py-3 px-4">
        {navItems.map((nav) => (
          <a key={nav.href} href={nav.href}
            className={`flex flex-col items-center gap-1 transition ${
              nav.label === "Memes" ? "text-violet-400" : "text-gray-600 hover:text-gray-400"
            }`}>
            <span className="text-xl">{nav.icon}</span>
            <span className="text-[10px]">{nav.label}</span>
          </a>
        ))}
      </div>

    </div>
  );
}