"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ScenarioItem } from "@/lib/quiz-types";

interface Props {
  item: ScenarioItem;
  onCommit: (optionId: string) => void;
}

const LABELS = ["A", "B", "C", "D"] as const;

function Kbd({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center font-mono text-[10px] tracking-normal uppercase min-w-[22px] h-[22px] px-1.5 rounded-sm border border-gold/35 text-gold/90 bg-gold/[0.04]">
      {children}
    </span>
  );
}

export default function QuestionScenario({ item, onCommit }: Props) {
  const reduced = useReducedMotion() ?? false;
  const [pressed, setPressed] = useState<string | null>(null);
  const optionCount = item.options.length;

  function commit(optionId: string) {
    if (pressed !== null) return;
    setPressed(optionId);
    // Slightly slower than forced-choice — scenarios invite reflection, and
    // the gold sweep wants room to land before advancing.
    window.setTimeout(() => onCommit(optionId), 280);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (pressed !== null) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      const k = e.key.toLowerCase();
      const letterIdx = ["a", "b", "c", "d"].indexOf(k);
      const numIdx = ["1", "2", "3", "4"].indexOf(k);
      const idx = letterIdx >= 0 ? letterIdx : numIdx;
      if (idx >= 0 && idx < optionCount) {
        e.preventDefault();
        commit(item.options[idx].id);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pressed, optionCount]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <motion.p
        className="font-mono text-kicker tracking-kicker uppercase text-muted/70 text-center mb-4"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        A scene
      </motion.p>

      {/* Longer fade-in on the scene — scenarios ask for a breath before answering. */}
      <motion.p
        className="font-serif italic text-body-lg md:text-h3 leading-article text-text-primary/95 text-center mb-2 max-w-2xl mx-auto"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      >
        {item.scene}
      </motion.p>

      {/* Hair-rule between scene and choices */}
      <svg
        viewBox="0 0 120 2"
        width="120"
        height="2"
        className="mx-auto my-10 text-gold block"
        aria-hidden
      >
        <motion.line
          x1="0"
          y1="1"
          x2="120"
          y2="1"
          stroke="currentColor"
          strokeWidth={1}
          strokeOpacity={0.55}
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
        />
      </svg>

      <motion.div
        className="grid gap-3 sm:grid-cols-2 sm:gap-4"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.55, ease: [0.19, 1, 0.22, 1] }}
      >
        {item.options.map((opt, i) => (
          <ScenarioCard
            key={opt.id}
            label={LABELS[i]}
            text={opt.label}
            onClick={() => commit(opt.id)}
            pressed={pressed === opt.id}
            dimmed={pressed !== null && pressed !== opt.id}
          />
        ))}
      </motion.div>

      <motion.div
        className="hidden sm:flex items-center justify-center gap-2 mt-8 font-mono text-kicker tracking-kicker uppercase text-muted/55"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.7 }}
      >
        {Array.from({ length: optionCount }).map((_, i) => (
          <span key={i} className="inline-flex items-center gap-2">
            <Kbd>{LABELS[i]}</Kbd>
            {i < optionCount - 1 && <span className="text-muted/40">·</span>}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ScenarioCard({
  label,
  text,
  onClick,
  pressed,
  dimmed,
}: {
  label: string;
  text: string;
  onClick: () => void;
  pressed: boolean;
  dimmed: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={pressed || dimmed}
      animate={{
        opacity: dimmed ? 0.22 : 1,
        scale: pressed ? 0.985 : 1,
      }}
      transition={{ duration: 0.26, ease: "easeOut" }}
      className="group relative overflow-hidden w-full text-left rounded-sm border border-surface-light/50 px-5 py-5 sm:px-6 sm:py-6 min-h-[104px] transition-all duration-500 hover:border-gold/55 hover:bg-gold/[0.04] focus:outline-none focus-visible:border-gold shadow-[0_0_0_rgba(212,175,55,0)] hover:shadow-[0_0_28px_rgba(212,175,55,0.16)] disabled:cursor-default"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500 animate-breathe-subtle"
        style={{ boxShadow: "inset 0 0 16px rgba(212,175,55,0.08)" }}
      />

      <motion.span
        aria-hidden
        initial={false}
        animate={{ x: pressed ? "220%" : "-120%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-none absolute inset-y-0 w-1/2"
        style={{
          background:
            "linear-gradient(100deg, transparent 0%, rgba(212,175,55,0.26) 50%, transparent 100%)",
          transform: "skewX(-12deg)",
        }}
      />

      <span className="relative z-10 flex items-start gap-3">
        <span className="inline-flex items-center justify-center font-mono text-[10px] tracking-normal uppercase min-w-[22px] h-[22px] px-1.5 rounded-sm border border-gold/35 text-gold/90 bg-gold/[0.04] shrink-0 mt-0.5">
          {label}
        </span>
        <span className="block font-serif text-body-lg leading-snug text-text-primary">
          {text}
        </span>
      </span>
    </motion.button>
  );
}
