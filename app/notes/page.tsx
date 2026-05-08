"use client";
import { useState } from "react";

const notes = [
  { id: 1, user: "Arjun K.", avatar: "A", subject: "Data Structures", title: "Complete Unit 3 — Tree Traversals + Practice Qs", downloads: 124, saves: 43, time: "2h ago", topper: true },
  { id: 2, user: "Neha G.", avatar: "N", subject: "DBMS", title: "Normalization 1NF to BCNF with real examples", downloads: 89, saves: 31, time: "5h ago", topper: false },
  { id: 3, user: "Priya V.", avatar: "P", subject: "OS", title: "Process Scheduling Algorithms — Short Notes", downloads: 200, saves: 67, time: "1d ago", topper: true },
  { id: 4, user: "Rahul S.", avatar: "R", subject: "Computer Networks", title: "OSI vs TCP/IP Model — Visual Comparison", downloads: 156, saves: 52, time: "2d ago", topper: false },
  { id: 5, user: "Meera T.", avatar: "M", subject: "Maths", title: "Integration Formulas Cheat Sheet", downloads: 310, saves: 98, time: "3d ago", topper: true },
];

const subjects = ["All", "DS", "DBMS", "OS", "Networks", "Maths", "Physics"];

const navItems = [
  { icon: "🏠", label: "Home", href: "/dashboard" },
  { icon: "🔥", label: "Doubts", href: "/doubts" },
  { icon: "📚", label: "Notes", href: "/notes" },
  { icon: "😂", label: "Memes", href: "/memes" },
  { icon: "🏆", label: "Ranks", href: "/leaderboard" },
];

export default function Notes() {
  const [activeSubject, setActiveSubject] = useState("All");
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col pb-24">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-3">
          <a href="/dashboard" className="text-gray-500 hover:text-white transition">←</a>
          <h1 className="text-lg font-bold">Notes 📚</h1>
        </div>
        <div className="text-xs bg-violet-900/40 text-violet-300 px-3 py-1 rounded-full border border-violet-800">
          +15 pts per upload
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

      {/* Notes Cards */}
      <div className="px-5 space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 hover:border-violet-800 transition cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-violet-700 flex items-center justify-center text-xs font-bold">
                  {note.avatar}
                </div>
                <span className="text-sm text-gray-300">{note.user}</span>
                <span className="text-xs text-gray-600">{note.time}</span>
              </div>
              <div className="flex items-center gap-2">
                {note.topper && (
                  <span className="text-xs text-yellow-400 bg-yellow-900/20 border border-yellow-900 px-2 py-0.5 rounded-full">
                    ⭐ Topper
                  </span>
                )}
                <span className="text-xs bg-[#111] border border-[#2a2a2a] text-gray-400 px-2 py-0.5 rounded-full">
                  {note.subject}
                </span>
              </div>
            </div>

            {/* Title */}
            <p className="text-sm text-gray-100 leading-relaxed mb-3 font-medium">
              {note.title}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600">📥 {note.downloads} downloads</span>
                <span className="text-xs text-gray-600">🔖 {note.saves} saved</span>
              </div>
              <button className="text-xs bg-violet-600 hover:bg-violet-700 text-white px-3 py-1 rounded-lg transition">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <button
        onClick={() => setShowUpload(true)}
        className="fixed bottom-20 right-5 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-full shadow-lg text-sm font-semibold transition"
      >
        + Upload Notes
      </button>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/70 flex items-end justify-center z-50">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-t-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Upload Notes</h3>
              <button onClick={() => setShowUpload(false)} className="text-gray-500 hover:text-white text-xl">✕</button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Title (e.g. Unit 3 — Tree Traversals)"
                className="w-full bg-[#111] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
              />
              <select className="w-full bg-[#111] border border-[#2a2a2a] text-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500">
                <option>Select subject</option>
                <option>Data Structures</option>
                <option>DBMS</option>
                <option>Operating Systems</option>
                <option>Computer Networks</option>
                <option>Maths</option>
              </select>

              {/* File Drop Zone */}
              <div className="border-2 border-dashed border-[#2a2a2a] hover:border-violet-500 rounded-xl p-8 text-center transition cursor-pointer">
                <p className="text-gray-500 text-sm">📎 Click to upload or drag & drop</p>
                <p className="text-gray-600 text-xs mt-1">PDF, DOC, PPT up to 20MB</p>
              </div>

              <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg text-sm transition">
                Upload & Earn 15 pts 🚀
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
              nav.label === "Notes" ? "text-violet-400" : "text-gray-600 hover:text-gray-400"
            }`}
          
            <span className="text-xl">{nav.icon}</span>
            <span className="text-[10px]">{nav.label}</span>
          </a>
        ))}
      </div>

    </div>
  );
}