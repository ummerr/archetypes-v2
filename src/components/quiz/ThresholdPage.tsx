"use client";

import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";

interface Props {
  aphorism: string;
  sectionLabel?: string;
  onContinue: () => void;
  onBack?: () => void;
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center font-mono text-[10px] tracking-normal uppercase min-w-[22px] h-[22px] px-1.5 rounded-sm border border-gold/35 text-gold/90 bg-gold/[0.04]">
      {children}
    </span>
  );
}

// A threshold is the site's pacing breath — an empty canvas, a single serif
// line, a longer fade. Back is reachable here (and only here) so a reader can
// revise a prior section without being trapped by "trust the first read" in
// the middle of a run.
export default function ThresholdPage({
  aphorism,
  sectionLabel,
  onContinue,
  onBack,
}: Props) {
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
        e.preventDefault();
        onContinue();
      } else if (onBack && (e.key === "ArrowLeft" || e.key === "Backspace")) {
        e.preventDefault();
        onBack();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onContinue, onBack]);

  return (
    <motion.section
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
    >
      {sectionLabel && (
        <motion.p
          className="font-mono text-kicker tracking-display uppercase text-muted/70 mb-8"
          initial={reduced ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {sectionLabel}
        </motion.p>
      )}

      <motion.p
        className="font-serif italic text-h2 md:text-[2.25rem] leading-snug text-text-primary max-w-2xl"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
      >
        &ldquo;{aphorism}&rdquo;
      </motion.p>

      {/* Hair-rule that draws in under the aphorism */}
      <svg
        viewBox="0 0 200 2"
        width="200"
        height="2"
        className="mt-12 mb-10 text-gold block"
        aria-hidden
      >
        <motion.line
          x1="0"
          y1="1"
          x2="200"
          y2="1"
          stroke="currentColor"
          strokeWidth={1}
          strokeOpacity={0.6}
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 1.1, ease: "easeOut" }}
        />
      </svg>

      <motion.button
        type="button"
        onClick={onContinue}
        className="relative font-mono text-label tracking-kicker uppercase border border-gold/70 px-6 py-3 rounded-sm text-gold transition-all duration-500 hover:bg-gold/10 hover:border-gold shadow-[0_0_22px_rgba(212,175,55,0.12)] hover:shadow-[0_0_36px_rgba(212,175,55,0.32)] focus-visible:shadow-[0_0_36px_rgba(212,175,55,0.38)]"
        initial={reduced ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.6 }}
      >
        Continue &rarr;
      </motion.button>

      <motion.div
        className="mt-4 hidden sm:flex items-center justify-center gap-2 font-mono text-kicker tracking-kicker uppercase text-muted/45"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.8 }}
      >
        <Kbd>&crarr;</Kbd>
        {onBack && (
          <>
            <span className="mx-1 text-muted/40">·</span>
            <Kbd>&larr;</Kbd>
            <span className="text-muted/45 normal-case">back</span>
          </>
        )}
      </motion.div>

      <motion.div
        className="mt-16 max-w-xl"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 2.1 }}
      >
        <HermeneuticCaveat variant="inline" className="text-xs text-text-secondary/45" />
      </motion.div>
    </motion.section>
  );
}
