"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="absolute inset-0 bg-bg/60 backdrop-blur-xl" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="relative max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2"
        >
          <span className="font-serif text-2xl font-medium tracking-[0.15em] text-gold transition-all duration-300 group-hover:text-gold-bright group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
            KWML
          </span>
        </Link>
        <div className="flex items-center gap-8 text-[13px] tracking-wide uppercase">
          <Link
            href="/"
            className={`relative py-1 transition-colors duration-200 ${
              pathname === "/"
                ? "text-gold"
                : "text-muted hover:text-text-secondary"
            }`}
          >
            Map
            {pathname === "/" && (
              <span className="absolute -bottom-0.5 inset-x-0 h-px bg-gold" />
            )}
          </Link>
          <Link
            href="/about"
            className={`relative py-1 transition-colors duration-200 ${
              pathname === "/about"
                ? "text-gold"
                : "text-muted hover:text-text-secondary"
            }`}
          >
            About
            {pathname === "/about" && (
              <span className="absolute -bottom-0.5 inset-x-0 h-px bg-gold" />
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
