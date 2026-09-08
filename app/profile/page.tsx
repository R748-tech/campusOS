"use client";

import Link from "next/link";

export default function ProfilePage() {
  return (
    <section className="space-y-6">
      <div className="hero-panel grid gap-6 overflow-hidden p-6 md:grid-cols-[1fr_auto] md:p-10">
        <div>
          <p className="eyebrow">STUDENT IDENTITY</p>
          <h1 className="mt-2 text-4xl font-black text-white md:text-5xl">Rohit Dhakad</h1>
          <p className="mt-2 text-slate-300">B.Tech CSE · 1st Year · CampusOS verified member</p>
          <div className="mt-6 flex flex-wrap gap-2"><span className="tag">● Verified college</span><span className="tag">🔥 12 day streak</span><span className="tag">⚡ 2,480 XP</span></div>
        </div>
        <div className="profile-orb">RD</div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[['2,480','XP earned'],['#184','Campus rank'],['42','Doubts helped']].map(([v,l]) => <div className="glass-card p-5" key={l}><p className="text-3xl font-black text-white">{v}</p><p className="mt-1 text-sm text-slate-400">{l}</p></div>)}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="glass-card p-6"><p className="eyebrow">COLLEGE VERIFICATION</p><h2 className="mt-2 text-xl font-bold text-white">Your campus identity</h2><p className="mt-2 text-sm text-slate-400">Keep your institutional identity verified so CampusOS can show the right community, resources and teacher spaces.</p><div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4"><p className="text-xs uppercase tracking-wider text-cyan-300">Institution</p><p className="mt-1 font-semibold text-white">Lovely Professional University</p><p className="mt-1 text-sm text-slate-400">Student ID: ••••••1842</p></div></div>
        <div className="glass-card p-6"><p className="eyebrow">YOUR CAMPUS</p><h2 className="mt-2 text-xl font-bold text-white">Learn · Create · Connect</h2><div className="mt-4 space-y-3"><Link className="action-row" href="/doubts"><span>💡</span><span><b>Help someone today</b><small>Answer doubts and earn XP</small></span></Link><Link className="action-row" href="/notes"><span>📚</span><span><b>Share knowledge</b><small>Upload notes for your batch</small></span></Link><Link className="action-row" href="/memes"><span>🎨</span><span><b>Join the vibe</b><small>Create and react to campus memes</small></span></Link></div></div>
      </div>
    </section>
  );
}
