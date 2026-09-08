import Link from "next/link";

const opportunities = [
  ['🚀','Campus Hack Night','Build with 4 teammates · Friday','Hackathon'],
  ['💼','Summer Internship Sprint','Resume review + curated roles','Career'],
  ['🎓','Faculty Research Circle','Open projects for curious students','Faculty'],
  ['🌐','Open Source Weekend','Ship your first contribution','Community'],
];
export default function Opportunities(){return <section className="space-y-6"><div className="hero-panel p-6 md:p-9"><p className="eyebrow">OPPORTUNITIES</p><h1 className="mt-3 text-4xl font-black text-white">Do something worth <span className="gradient-text">remembering.</span></h1><p className="mt-2 max-w-2xl text-sm text-slate-400">Hackathons, internships, research, clubs and campus events—one place to discover your next move.</p></div><div className="grid gap-4 md:grid-cols-2">{opportunities.map(([icon,title,desc,tag])=><Link href="/dashboard" className="glass-card p-6 transition hover:-translate-y-1 hover:border-cyan-300/20" key={title}><div className="text-3xl">{icon}</div><span className="tag mt-5">{tag}</span><h2 className="mt-3 text-xl font-black text-white">{title}</h2><p className="mt-2 text-sm text-slate-400">{desc}</p><span className="mt-5 block text-xs font-bold text-cyan-300">View opportunity →</span></Link>)}</div></section>}
