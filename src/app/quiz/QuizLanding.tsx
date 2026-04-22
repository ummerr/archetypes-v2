"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";

function Kbd({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center font-mono text-[10px] tracking-normal uppercase min-w-[22px] h-[22px] px-1.5 rounded-sm border border-gold/35 text-gold/90 bg-gold/[0.04]">
      {children}
    </span>
  );
}

export default function QuizLanding() {
  const reduced = useReducedMotion() ?? false;
  const beginRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        beginRef.current?.click();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      className="relative"
    >
      <p className="font-mono text-kicker tracking-display uppercase text-gold/80 mb-4">
        The Reading
      </p>

      <h1 className="font-serif text-h1 md:text-hero leading-display tracking-tight mb-6">
        A longer look,
        <br />
        <span className="italic text-text-secondary/85">by candlelight.</span>
      </h1>

      {/* Hair-rule drawing in under the heading */}
      <svg
        viewBox="0 0 160 2"
        width="160"
        height="2"
        className="mb-8 text-gold block"
        aria-hidden
      >
        <motion.line
          x1="0"
          y1="1"
          x2="160"
          y2="1"
          stroke="currentColor"
          strokeWidth={1}
          strokeOpacity={0.65}
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
        />
      </svg>

      <div className="space-y-5 max-w-prose mb-8">
        <p className="font-serif text-body-lg text-text-secondary/90 leading-article">
          Six traditions on one page, cast for you. The Mirror was a glimpse;
          this takes about half an hour and goes several rooms deeper &mdash;
          five axes, six vocabularies, a confidence tier for every mapping.
        </p>
        <p className="font-serif italic text-body-lg text-text-secondary/80 leading-article">
          It is best done in a single sitting. You will be asked about
          stability, belonging, the weather you carry, the room you stand in.
          Answer the way you would answer a friend.
        </p>
      </div>

      <HermeneuticCaveat variant="inline" className="mb-10" />

      {/* Begin — a Mirror-style gold-bordered card, the site's ceremonial CTA. */}
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <Link
          ref={beginRef}
          href="/quiz/take"
          className="group relative overflow-hidden font-mono text-label tracking-kicker uppercase border border-gold px-7 py-4 rounded-sm text-gold transition-all duration-500 hover:bg-gold/10 shadow-[0_0_22px_rgba(212,175,55,0.18)] hover:shadow-[0_0_36px_rgba(212,175,55,0.38)] focus-visible:shadow-[0_0_36px_rgba(212,175,55,0.45)]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-breathe-subtle"
            style={{ boxShadow: "inset 0 0 20px rgba(212,175,55,0.14)" }}
          />
          <span className="relative z-10">Begin the Reading &rarr;</span>
        </Link>
        <span className="font-mono text-kicker tracking-kicker uppercase text-muted/60 hidden sm:inline-flex items-center gap-2">
          or press <Kbd>Enter</Kbd>
        </span>
      </div>

      <div className="space-y-2 border-t border-surface-light/35 pt-6 max-w-prose">
        <p className="font-mono text-kicker tracking-kicker uppercase text-muted/70">
          What you are committing to
        </p>
        <ul className="space-y-1.5 font-serif italic text-body text-text-secondary/75 leading-snug">
          <li>&mdash; about thirty minutes, undivided.</li>
          <li>&mdash; roughly fifty questions in four sections.</li>
          <li>&mdash; the first answer, not the considered one.</li>
          <li>&mdash; no back, mid-section.</li>
        </ul>
      </div>

      <p className="font-serif italic text-xs text-text-secondary/55 mt-8 max-w-prose">
        Nothing is stored. Nothing is sent. The Reading lives in its URL &mdash;
        yours to keep, share, or let go.
      </p>
    </motion.section>
  );
}
