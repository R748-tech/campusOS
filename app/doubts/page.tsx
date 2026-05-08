"use client";
import { useState } from "react";

const doubts = [
  { id: 1, user: "Rahul S.", avatar: "R", time: "2m ago", subject: "Computer Networks", question: "Can anyone explain the difference between TCP and UDP in simple terms?", answers: 3, solved: false, hot: true },
  { id: 2, user: "Neha G.", avatar: "N", time: "20m ago", subject: "Data Structures", question: "What is the time complexity of inserting into a balanced BST?", answers: 5, solved: true, hot: false },
  { id: 3, user: "Arjun K.", avatar: "A", time: "1h ago", subject: "DBMS", question: "Difference between 2NF and 3NF with a real example?", answers: 2, solved: false, hot: true },
  { id: 4, user: "Priya V.", avatar: "P", time: "3h ago", subject: "OS", question: "How does a semaphore differ from a mutex? When do you use which?", answers: 7, solved: true, hot: false },
];

const subjects = ["All", "CS", "DBMS", "OS", "Networks", "Maths", "Physics"];

const navItems = [
  { icon: "🏠", label: "Home", href: "/dashboard" },
  { icon: "🔥", label: "Doubts", href: "/doubts" },
  { icon: "📚", label: "Notes", href: "/notes" },
  { icon: "😂", label: "Memes", href: "/memes" },
  { icon: "🏆", label: "Ranks", href: "/leaderboard" },
];

export default function Doubts() {
  const [activeSubject, setActiveSubject] = useState("All");
  const [showAsk, setShowAsk] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col pb-24">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-3">
          <a href="/dashboard" className="text-gray-500 hover:text-white transition">←</a>
          <h1 className="text-lg font-bold">Doubt Engine 🔥</h1>
        </div>
        <div className="text-xs bg-violet-900/40 text-violet-300 px-3 py-1 rounded-full border border-violet-800">
          +10 pts per answer
        </div>
      </div>

      {/* Subject Filter */}
      <div className="flex gap-2 px-5 py-4 overflow-x-auto">
        {subjects.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSubject(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              activeSubject === s
                ? "bg-violet-600 text-white"
                : "bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 hover:border-violet-500"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Doubt Cards */}
      <div className="px-5 space-y-3">
        {doubts.map((doubt) => (
          <div
            key={doubt.id}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 hover:border-violet-800 transition cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-violet-700 flex items-center justify-center text-xs font-bold">
                  {doubt.avatar}
                </div>
                <span className="text-sm text-gray-300">{doubt.user}</span>
                <span className="text-xs text-gray-600">{doubt.time}</span>
              </div>
              <div className="flex items-center gap-2">
                {doubt.hot && <span className="text-xs text-orange-400">🔥 Hot</span>}
                <span className="text-xs bg-[#111] border border-[#2a2a2a] text-gray-400 px-2 py-0.5 rounded-full">
                  {doubt.subject}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-100 leading-relaxed mb-3">{doubt.question}</p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">💬 {doubt.answers} answers</span>
              {doubt.solved ? (
                <span className="text-xs text-green-400 bg-green-900/20 border border-green-900 px-2 py-0.5 rounded-full">
                  ✓ Solved
                </span>
              ) : (
                <button className="text-xs text-violet-400 hover:text-violet-300 transition">
                  Answer → earn pts
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Ask Button */}
      <button
        onClick={() => setShowAsk(true)}
        className="fixed bottom-20 right-5 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-full shadow-lg text-sm font-semibold transition"
      >
        + Ask a Doubt
      </button>

      {/* Ask Modal */}
      {showAsk && (
        <div className="fixed inset-0 bg-black/70 flex items-end justify-center z-50">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-t-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Ask a Doubt</h3>
              <button onClick={() => setShowAsk(false)} className="text-gray-500 hover:text-white text-xl">✕</button>
            </div>
            <div className="space-y-3">
              <select className="w-full bg-[#111] border border-[#2a2a2a] text-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500">
                <option>Select subject</option>
                <option>Computer Networks</option>
                <option>Data Structures</option>
                <option>DBMS</option>
                <option>Operating Systems</option>
                <option>Maths</option>
              </select>
              <textarea
                rows={4}
                placeholder="Type your doubt clearly..."
                className="w-full bg-[#111] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500 resize-none"
              />
              <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg text-sm transition">
                Post Doubt 🔥
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#1f1f1f] flex justify-around py-3 px-4">
        {navItems.map((nav) => (
            <a>
            key={nav.href}
            href={nav.href}
            className={`flex flex-col items-center gap-1 transition ${
              nav.label === "Doubts" ? "text-violet-400" : "text-gray-600 hover:text-gray-400"
            }`}
          
            <span className="text-xl">{nav.icon}</span>
            <span className="text-[10px]">{nav.label}</span>
          </a>
        ))}
      </div>

    </div>
  );
}