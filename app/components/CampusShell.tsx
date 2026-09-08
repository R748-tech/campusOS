"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  ["⌂", "Home", "/dashboard"],
  ["?", "Doubts", "/doubts"],
  ["▤", "Notes", "/notes"],
  ["☺", "Memes", "/memes"],
  ["♛", "Ranks", "/leaderboard"],
] as const;

export default function CampusShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const authRoute = pathname === "/" || pathname.startsWith("/auth") || pathname.startsWith("/register");

  if (authRoute) return <>{children}</>;

  return (
    <div className="campus-app min-h-screen">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070812]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <span className="logo-cube" aria-hidden="true"><span>CO</span></span>
            <span className="text-lg font-black tracking-tight text-white">Campus<span className="text-cyan-300">OS</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[.04] p-1">
            {nav.map(([icon, label, href]) => (
              <Link key={href} href={href} className={`nav-pill ${pathname.startsWith(href) ? "nav-active" : ""}`}>
                <span>{icon}</span>{label}
              </Link>
            ))}
          </nav>
          <Link href="/profile" className="avatar-orb" title="Profile">RD</Link>
        </div>
      </header>
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 pt-6 md:px-6">{children}</main>
      <nav className="fixed bottom-3 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-lg -translate-x-1/2 items-center justify-around rounded-2xl border border-white/10 bg-[#0b0d19]/90 p-2 shadow-2xl backdrop-blur-xl md:hidden">
        {nav.map(([icon, label, href]) => (
          <Link key={href} href={href} className={`mobile-nav ${pathname.startsWith(href) ? "text-cyan-300" : "text-slate-400"}`}>
            <span>{icon}</span><small>{label}</small>
          </Link>
        ))}
      </nav>
    </div>
  );
}
