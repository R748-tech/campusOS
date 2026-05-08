"use client";
import { useState } from "react";

const myMemes = [
  { id: 1, caption: "When the professor says this won't come in exam 💀", bg: "from-violet-900 to-purple-950", emoji: "😭", likes: 142, laughs: 89, shares: 34, views: 892, comments: 23, visibility: "all", time: "2 days ago", trending: true },
  { id: 2, caption: "Me explaining my project vs what I built 🙃", bg: "from-blue-900 to-indigo-950", emoji: "🤡", likes: 98, laughs: 67, shares: 12, views: 445, comments: 15, visibility: "college", time: "5 days ago", trending: false },
  { id: 3, caption: "Day 1: I will study every day. Day 2: ...", bg: "from-rose-900 to-pink-950", emoji: "💤", likes: 210, laughs: 134, shares: 67, views: 1204, comments: 41, visibility: "all", time: "1 week ago", trending: true },
  { id: 4, caption: "Our canteen food: Nutrition facts: mostly regret", bg: "from-green-900 to-emerald-950", emoji: "🍛", likes: 76, laughs: 45, shares: 8, views: 334, comments: 9, visibility: "college", time: "2 weeks ago", trending: false },
];

const totalStats = {
  totalMemes: myMemes.length,
  totalLikes: myMemes.reduce((a, m) => a + m.likes, 0),
  totalLaughs: myMemes.reduce((a, m) => a + m.laughs, 0),
  totalShares: myMemes.reduce((a, m) => a + m.shares, 0),
  totalViews: myMemes.reduce((a, m) => a + m.views, 0),
  pointsEarned: myMemes.length * 20 + myMemes.reduce((a, m) => a + Math.floor(m.likes / 10), 0),
};

export default function MyMemes() {
  const [activeFilter, setActiveFilter] = useState<"all" | "trending">("all");

  const filtered = activeFilter === "trending" ? myMemes.filter((m) => m.trending) : myMemes;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col pb-24">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-3">
          <a href="/memes" className="text-gray-500 hover:text-white transition">←</a>
          <h1 className="text-lg font-bold">My Memes 😂</h1>
        </div>
        <a href="/memes/editor"
          className="text-xs bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition font-semibold">
          + Create
        </a>
      </div>

      {/* Overall Stats */}
      <div className="px-5 py-4">
        <div className="bg-gradient-to-br from-violet-900/40 to-purple-900/20 border border-violet-800 rounded-2xl p-5">
          <h2 className="text-white font-semibold mb-4">Your Meme Stats 📊</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total Memes", value: totalStats.totalMemes, icon: "😂" },
              { label: "Total Likes", value: totalStats.totalLikes, icon: "❤️" },
              { label: "Laughs", value: totalStats.totalLaughs, icon: "😂" },
              { label: "Shares", value: totalStats.totalShares, icon: "↗️" },
              { label: "Total Views", value: totalStats.totalViews, icon: "👁️" },
              { label: "Points Earned", value: totalStats.pointsEarned, icon: "⚡" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3 text-center">
                <div className="text-xl mb-1">{stat.icon}</div>
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 px-5 mb-4">
        <button onClick={() => setActiveFilter("all")}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${activeFilter === "all" ? "bg-violet-600 text-white" : "bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400"}`}>
          All Memes
        </button>
        <button onClick={() => setActiveFilter("trending")}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${activeFilter === "trending" ? "bg-violet-600 text-white" : "bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400"}`}>
          🔥 Trending
        </button>
      </div>

      {/* Meme Cards */}
      <div className="px-5 space-y-4">
        {filtered.map((meme) => (
          <div key={meme.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden">

            {/* Meme Visual */}
            <div className={`bg-gradient-to-br ${meme.bg} p-6 flex flex-col items-center justify-center relative`}>
              <div className="text-5xl mb-2">{meme.emoji}</div>
              <p className="text-white text-sm text-center font-medium">{meme.caption}</p>
              <div className="absolute top-2 left-2 flex gap-2">
                {meme.trending && (
                  <span className="text-xs bg-orange-900/60 text-orange-300 border border-orange-800 px-2 py-0.5 rounded-full">🔥 Trending</span>
                )}
                <span className={`text-xs px-2 py-0.5 rounded-full border ${meme.visibility === "college" ? "bg-yellow-900/40 text-yellow-300 border-yellow-800" : "bg-green-900/40 text-green-300 border-green-800"}`}>
                  {meme.visibility === "college" ? "🏫" : "🌍"}
                </span>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="px-4 py-3">
              <div className="grid grid-cols-5 gap-2 mb-3">
                {[
                  { icon: "❤️", value: meme.likes, label: "Likes" },
                  { icon: "😂", value: meme.laughs, label: "Laughs" },
                  { icon: "↗️", value: meme.shares, label: "Shares" },
                  { icon: "👁️", value: meme.views, label: "Views" },
                  { icon: "💬", value: meme.comments, label: "Comments" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-sm">{stat.icon}</div>
                    <div className="text-sm font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">{meme.time}</span>
                <span className="text-xs text-violet-400">+{20 + Math.floor(meme.likes / 10)} pts earned</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#1f1f1f] flex justify-around py-3 px-4">
        {[
          { icon: "🏠", label: "Home", href: "/dashboard" },
          { icon: "🔥", label: "Doubts", href: "/doubts" },
          { icon: "📚", label: "Notes", href: "/notes" },
          { icon: "😂", label: "Memes", href: "/memes" },
          { icon: "🏆", label: "Ranks", href: "/leaderboard" },
        ].map((nav) => (
          <a key={nav.href} href={nav.href}
            className={`flex flex-col items-center gap-1 transition ${nav.label === "Memes" ? "text-violet-400" : "text-gray-600 hover:text-gray-400"}`}>
            <span className="text-xl">{nav.icon}</span>
            <span className="text-[10px]">{nav.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}