import Link from "next/link";

export default function Home() {
  return (
    <main className="landing-stage">
      <div className="landing-grid" />
      <div className="orb orb-one" /><div className="orb orb-two" />
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-8">
        <div className="flex items-center gap-3"><span className="logo-cube"><span>CO</span></span><span className="text-xl font-black text-white">Campus<span className="text-cyan-300">OS</span></span></div>
        <div className="flex gap-2"><Link href="/auth" className="rounded-xl px-4 py-2 text-sm font-bold text-slate-300 hover:text-white">Sign in</Link><Link href="/register" className="rounded-xl bg-white px-4 py-2 text-sm font-black text-slate-950 hover:bg-cyan-200">Join campus</Link></div>
      </nav>
      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-90px)] max-w-7xl items-center gap-12 px-5 pb-16 pt-8 md:grid-cols-[1.1fr_.9fr] md:px-8">
        <div><div className="tag mb-5 w-fit">✦ THE DIGITAL CAMPUS</div><h1 className="max-w-3xl text-5xl font-black leading-[.98] tracking-tight text-white md:text-7xl">Your campus, <span className="gradient-text">alive.</span></h1><p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">One place for students and teachers to learn, ask, share, create, compete and actually know what is happening around campus.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/register" className="hero-cta">Enter your campus →</Link><Link href="/auth" className="glass-cta">Verify college ID</Link></div><div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400"><span><b className="text-white">01</b> Doubt Engine</span><span><b className="text-white">02</b> Campus Notes</span><span><b className="text-white">03</b> Student + Faculty</span></div></div>
        <div className="scene-3d"><div className="scene-glow" /><div className="floating-card card-back"><span>🏆</span><b>Campus League</b><small>Climb together</small></div><div className="campus-core"><div className="core-top">CAMPUSOS</div><div className="core-screen"><span className="pulse-dot" />LIVE CAMPUS<br /><strong>2,481</strong><small>students online</small></div><div className="core-floor" /></div><div className="floating-card card-front"><span>💡</span><b>Ask. Answer. Earn.</b><small>+50 XP for helping</small></div></div>
      </section>
    </main>
  );
}
