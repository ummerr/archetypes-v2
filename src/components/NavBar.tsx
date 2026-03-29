"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-xl" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      <div className="relative max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span className="font-mono text-sm font-bold tracking-[0.25em] text-gold transition-colors duration-200 group-hover:text-gold-bright glow-text-subtle">
            KWML
          </span>
          <span className="hidden sm:inline font-mono text-[9px] tracking-[0.2em] text-muted uppercase">
            Archetype System
          </span>
        </Link>
        <Link
          href="/about"
          className="font-mono text-[9px] tracking-[0.15em] text-muted uppercase hover:text-text-secondary transition-colors duration-200"
        >
          About
        </Link>
      </div>
    </nav>
  );
}
