"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="absolute inset-0 bg-bg/70 backdrop-blur-xl" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-surface-light to-transparent" />
      <div className="relative max-w-4xl mx-auto px-6 h-14 flex items-center">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="font-serif text-xl font-medium tracking-[0.12em] text-gold/80 transition-colors duration-200 group-hover:text-gold">
            KWML
          </span>
          <span className="hidden sm:inline text-[11px] tracking-wide text-muted/50">
            Archetype Explorer
          </span>
        </Link>
      </div>
    </nav>
  );
}
