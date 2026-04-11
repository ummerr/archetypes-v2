"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

export default function NavBar() {
  const { theme, toggle } = useTheme();

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-xl transition-colors duration-300" />
      <div
        className="absolute inset-x-0 bottom-0 h-px transition-colors duration-300"
        style={{
          background:
            theme === "light"
              ? "linear-gradient(90deg, transparent, var(--color-gold) 30%, var(--color-gold) 70%, transparent)"
              : "linear-gradient(90deg, transparent, var(--color-gold) 50%, transparent)",
          opacity: theme === "light" ? 0.2 : 0.1,
        }}
      />
      <div className="relative max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span className="font-mono text-sm font-bold tracking-[0.25em] text-gold transition-colors duration-200 group-hover:text-gold-bright glow-text-subtle">
            KWML
          </span>
          <span className="hidden sm:inline font-mono text-[9px] tracking-[0.2em] text-muted uppercase">
            Archetype System
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="relative w-8 h-8 flex items-center justify-center text-muted hover:text-text-secondary transition-colors duration-200"
          >
            {/* Sun icon (shown in dark mode) */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`absolute transition-all duration-300 ${
                theme === "dark"
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-90 scale-75"
              }`}
            >
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7" />
            </svg>
            {/* Moon icon (shown in light mode) */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`absolute transition-all duration-300 ${
                theme === "light"
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-75"
              }`}
            >
              <path d="M13.5 8.5a5.5 5.5 0 1 1-6-6 4.5 4.5 0 0 0 6 6z" />
            </svg>
          </button>
          <Link
            href="/boy-within-man"
            className="font-mono text-[9px] tracking-[0.15em] text-muted uppercase hover:text-text-secondary transition-colors duration-200"
          >
            Boy Within Man
          </Link>
          <Link
            href="/about"
            className="font-mono text-[9px] tracking-[0.15em] text-muted uppercase hover:text-text-secondary transition-colors duration-200"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
