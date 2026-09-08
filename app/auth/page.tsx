"use client";

import Link from "next/link";
import { useState } from "react";

export default function AuthPage() {
  const [verified, setVerified] = useState(false);
  const [role, setRole] = useState<"student" | "teacher">("student");

  return (
    <main className="auth-stage">
      <div className="auth-grid" />
      <div className="auth-shape shape-a" /><div className="auth-shape shape-b" />
      <section className="auth-card">
        <div className="mb-8 flex items-center gap-3"><span className="logo-cube"><span>CO</span></span><span className="text-xl font-black text-white">Campus<span className="text-cyan-300">OS</span></span></div>
        <p className="eyebrow">CAMPUS IDENTITY</p>
        <h1 className="mt-2 text-3xl font-black text-white">Enter your campus. Meet your people.</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">Use the institutional identifier issued by your college. CampusOS uses it to route you to the correct college community.</p>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[.03] p-1">
          {([['student','Student'],['teacher','Teacher']] as const).map(([key,label]) => <button key={key} onClick={() => setRole(key)} className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${role===key?'bg-white text-slate-900':'text-slate-400'}`}>{label}</button>)}
        </div>

        <div className="mt-5 space-y-4">
          <label className="field-label">College / University ID<input className="field" placeholder={role==='student'?'e.g. 12345678':'e.g. FAC-2041'} /></label>
          <label className="field-label">Institutional email<input className="field" type="email" placeholder="you@university.edu" /></label>
          <label className="field-label">Password<input className="field" type="password" placeholder="••••••••" /></label>
        </div>

        <div className="mt-5 rounded-2xl border border-amber-300/15 bg-amber-300/5 p-4 text-sm text-slate-300"><b className="text-amber-200">Verification note:</b> the ID format is institution-specific. Production verification should validate it against your college's official student/faculty directory or SSO—not a client-side list.</div>
        <button onClick={() => setVerified(true)} className="mt-5 w-full rounded-2xl bg-cyan-300 px-4 py-3.5 font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200">{verified ? '✓ Identity check started' : 'Verify & enter CampusOS'}</button>
        <p className="mt-5 text-center text-sm text-slate-500">New here? <Link href="/register" className="font-semibold text-cyan-300">Create your campus profile</Link></p>
      </section>
    </main>
  );
}
