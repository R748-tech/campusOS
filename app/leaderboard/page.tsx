"use client";
import { useState } from "react";

const studentLeaderboard = [
  { rank: 1, name: "Rahul Sharma", avatar: "R", points: 4820, badge: "👑", title: "Champion", streak: 28, answers: 142, notes: 23, memes: 45, defending: true },
  { rank: 2, name: "Priya Verma", avatar: "P", points: 4210, badge: "🥈", title: "Hall of Famer", streak: 21, answers: 98, notes: 31, memes: 38, defending: false },
  { rank: 3, name: "Arjun Singh", avatar: "A", points: 3980, badge: "🥉", title: "Rising Star", streak: 15, answers: 87, notes: 19, memes: 29, defending: false },
  { rank: 4, name: "Neha Gupta", avatar: "N", points: 3540, badge: "⭐", title: null, streak: 12, answers: 76, notes: 14, memes: 22, defending: false },
  { rank: 5, name: "Meera Tiwari", avatar: "M", points: 3120, badge: "⭐", title: null, streak: 9, answers: 65, notes: 18, memes: 15, defending: false },
  { rank: 6, name: "Vikram Das", avatar: "V", points: 2890, badge: null, title: null, streak: 7, answers: 54, notes: 12, memes: 19, defending: false },
  { rank: 7, name: "Sneha Patel", avatar: "S", points: 2650, badge: null, title: null, streak: 5, answers: 48, notes: 9, memes: 14, defending: false },
  { rank: 8, name: "Rohit Kumar", avatar: "RK", points: 2410, badge: null, title: null, streak: 4, answers: 41, notes: 7, memes: 11, defending: false },
];

const collegeLeaderboard = [
  { rank: 1, name: "IIT Delhi", points: 284200, students: 1240, badge: "👑", change: "↑", defending: true },
  { rank: 2, name: "BITS Pilani", points: 241800, students: 980, badge: "🥈", change: "↑", defending: false },
  { rank: 3, name: "IIT Bombay", points: 198400, students: 1100, badge: "🥉", change: "↓", defending: false },
  { rank: 4, name: "NIT Trichy", points: 167200, students: 820, badge: null, change: "↑", defending: false },
  { rank: 5, name: "VIT Vellore", points: 143900, students: 2100, badge: null, change: "↓", defending: false },
];

const hallOfFame = [
  { month: "April 2025", student: "Rahul Sharma", college: "IIT Delhi", points: 4820, badge: "👑 Champion 🛡️ Defender" },
  { month: "March 2025", student: "Priya Verma", college: "IIT Delhi", points: 5120, badge: "👑 Champion" },
  { month: "February 2025", student: "Rahul Sharma", college: "IIT Delhi", points: 4980, badge: "👑 Champion 🏆 Hall of Famer" },
  { month: "January 2025", student: "Arjun Singh", college: "NIT Trichy", points: 4340, badge: "👑 Champion" },
];

const myStats = {
  rank: 8, name: "Rohit Kumar", points: 2410,
  pointsToNext: 240, nextRank: 7,
  badges: ["🏆 Hall of Famer", "⚡ Streak King"],
  monthlyPoints: [1200, 1800, 2100, 2410],
};

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<"student" | "college" | "hall">("student");

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col pb-24">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-3">
          <a href="/dashboard" className="text-gray-500 hover:text-white transition">←</a>
          <h1 className="text-lg font-bold">Leaderboard 🏆</h1>
        </div>
        <div className="text-xs text-gray-500">Resets Jun 1</div>
      </div>

      {/* My Position Card */}
      <div className="px-5 py-4">
        <div className="bg-gradient-to-br from-violet-900/40 to-purple-900/20 border border-violet-700 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-lg font-bold">
                {myStats.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-white font-semibold">{myStats.name}</p>
                <p className="text-violet-300 text-xs">Rank #{myStats.rank} in college</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-white">{myStats.points.toLocaleString()}</p>
              <p className="text-xs text-gray-400">points this month</p>
            </div>
          </div>

          {/* Progress to next rank */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Progress to Rank #{myStats.nextRank}</span>
              <span>{myStats.pointsToNext} pts needed</span>
            </div>
            <div className="w-full bg-[#2a2a2a] rounded-full h-2">
              <div className="bg-violet-500 h-2 rounded-full transition-all" style={{ width: `${(myStats.points / (myStats.points + myStats.pointsToNext)) * 100}%` }} />
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {myStats.badges.map((badge) => (
              <span key={badge} className="text-xs bg-violet-900/40 text-violet-300 border border-violet-700 px-2 py-1 rounded-full">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-5 mb-4">
        {[
          { id: "student", label: "👤 Students" },
          { id: "college", label: "🏫 Colleges" },
          { id: "hall", label: "🏛️ Hall of Fame" },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition ${activeTab === tab.id ? "bg-violet-600 text-white" : "bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Student Leaderboard */}
      {activeTab === "student" && (
        <div className="px-5 space-y-2">
          {studentLeaderboard.map((student) => (
            <div key={student.rank}
              className={`bg-[#1a1a1a] border rounded-xl p-4 ${student.rank <= 3 ? "border-violet-800" : "border-[#2a2a2a]"}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${student.rank === 1 ? "bg-yellow-500 text-black" : student.rank === 2 ? "bg-gray-400 text-black" : student.rank === 3 ? "bg-orange-600 text-white" : "bg-[#2a2a2a] text-gray-400"}`}>
                    {student.rank}
                  </div>
                  <div className="w-9 h-9 rounded-full bg-violet-700 flex items-center justify-center text-sm font-bold">
                    {student.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{student.name}</span>
                      {student.badge && <span className="text-sm">{student.badge}</span>}
                    </div>
                    {student.title && (
                      <span className="text-xs text-violet-400">{student.title}</span>
                    )}
                    {student.defending && (
                      <span className="text-xs text-yellow-400 ml-1">🛡️ Defending</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{student.points.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">pts</p>
                </div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[
                  { label: "Streak", value: `${student.streak}🔥` },
                  { label: "Answers", value: student.answers },
                  { label: "Notes", value: student.notes },
                  { label: "Memes", value: student.memes },
                ].map((s) => (
                  <div key={s.label} className="bg-[#111] rounded-lg p-2 text-center">
                    <div className="text-xs font-semibold text-white">{s.value}</div>
                    <div className="text-xs text-gray-600">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* College Leaderboard */}
      {activeTab === "college" && (
        <div className="px-5 space-y-2">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3 mb-4">
            <p className="text-gray-400 text-xs">College score = sum of all active student points this month</p>
          </div>
          {collegeLeaderboard.map((college) => (
            <div key={college.rank}
              className={`bg-[#1a1a1a] border rounded-xl p-4 ${college.rank <= 3 ? "border-violet-800" : "border-[#2a2a2a]"}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${college.rank === 1 ? "bg-yellow-500 text-black" : college.rank === 2 ? "bg-gray-400 text-black" : college.rank === 3 ? "bg-orange-600 text-white" : "bg-[#2a2a2a] text-gray-400"}`}>
                    {college.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{college.name}</span>
                      {college.badge && <span>{college.badge}</span>}
                      {college.defending && <span className="text-xs text-yellow-400">🛡️ Defending</span>}
                    </div>
                    <span className="text-xs text-gray-500">{college.students.toLocaleString()} active students</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{college.points.toLocaleString()}</p>
                  <p className={`text-xs ${college.change === "↑" ? "text-green-400" : "text-red-400"}`}>
                    {college.change} this week
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hall of Fame */}
      {activeTab === "hall" && (
        <div className="px-5 space-y-3">
          <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/10 border border-yellow-800 rounded-xl p-4 mb-2">
            <h3 className="text-yellow-300 font-semibold mb-1">🏛️ Hall of Fame</h3>
            <p className="text-gray-400 text-xs">Top champions from past months. Their legacy lives forever.</p>
          </div>
          {hallOfFame.map((entry, i) => (
            <div key={i} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 bg-[#111] px-3 py-1 rounded-full border border-[#2a2a2a]">
                  📅 {entry.month}
                </span>
                <span className="text-yellow-400 text-sm">👑</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">{entry.student}</p>
                  <p className="text-gray-500 text-xs">{entry.college}</p>
                  <p className="text-violet-400 text-xs mt-1">{entry.badge}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-lg">{entry.points.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">points</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
            className={`flex flex-col items-center gap-1 transition ${nav.label === "Ranks" ? "text-violet-400" : "text-gray-600 hover:text-gray-400"}`}>
            <span className="text-xl">{nav.icon}</span>
            <span className="text-[10px]">{nav.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}