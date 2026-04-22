"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ForcedChoiceItem } from "@/lib/quiz-types";

interface Props {
  item: ForcedChoiceItem;
  onCommit: (optionId: string) => void;
}

// The keys users expect for a short list of options — A/B/C map by position.
const LABELS = ["A", "B", "C", "D"] as const;

function Kbd({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center font-mono text-[10px] tracking-normal uppercase min-w-[22px] h-[22px] px-1.5 rounded-sm border border-gold/35 text-gold/90 bg-gold/[0.04]">
      {children}
    </span>
  );
}

export default function QuestionForcedChoice({ item, onCommit }: Props) {
  const reduced = useReducedMotion() ?? false;
  const [pressed, setPressed] = useState<string | null>(null);
  const optionCount = item.options.length;

  function commit(optionId: string) {
    if (pressed !== null) return;
    setPressed(optionId);
    window.setTimeout(() => onCommit(optionId), 110);
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

  // 2-option → horizontal pair on sm+. 3-option → stack on mobile, 3-col on sm+.
  const gridClass =
    optionCount === 2
      ? "grid gap-4 sm:grid-cols-2 sm:gap-5"
      : "grid gap-4 sm:grid-cols-3 sm:gap-5";

  return (
    <div className="mx-auto w-full max-w-3xl">
      <motion.p
        className="font-serif text-h3 md:text-h2 leading-snug text-text-primary text-center mb-10 max-w-2xl mx-auto"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      >
        {item.prompt}
      </motion.p>

      <motion.div
        className={gridClass}
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12, ease: [0.19, 1, 0.22, 1] }}
      >
        {item.options.map((opt, i) => (
          <ChoiceCard
            key={opt.id}
            label={LABELS[i]}
            text={opt.label}
            body={opt.body}
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
        transition={{ duration: 0.45, delay: 0.28 }}
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

function ChoiceCard({
  label,
  text,
  body,
  onClick,
  pressed,
  dimmed,
}: {
  label: string;
  text: string;
  body?: string;
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
      className="group relative overflow-hidden w-full text-left rounded-sm border border-surface-light/50 px-6 py-7 sm:px-8 sm:py-10 min-h-[120px] sm:min-h-[180px] transition-all duration-500 hover:border-gold/55 hover:bg-gold/[0.04] focus:outline-none focus-visible:border-gold shadow-[0_0_0_rgba(212,175,55,0)] hover:shadow-[0_0_32px_rgba(212,175,55,0.18)] disabled:cursor-default"
    >
      {/* Breathing inner halo on hover/focus */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500 animate-breathe-subtle"
        style={{ boxShadow: "inset 0 0 18px rgba(212,175,55,0.10)" }}
      />

      {/* Gold press-sweep */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{ x: pressed ? "220%" : "-120%" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="pointer-events-none absolute inset-y-0 w-1/2"
        style={{
          background:
            "linear-gradient(100deg, transparent 0%, rgba(212,175,55,0.28) 50%, transparent 100%)",
          transform: "skewX(-12deg)",
        }}
      />

      <span className="relative z-10 flex flex-col gap-3 sm:gap-4">
        <span className="inline-flex items-center">
          <span className="inline-flex items-center justify-center font-mono text-[10px] tracking-normal uppercase min-w-[22px] h-[22px] px-1.5 rounded-sm border border-gold/35 text-gold/90 bg-gold/[0.04]">
            {label}
          </span>
        </span>
        <span className="block font-serif text-body-lg sm:text-h3 leading-snug text-text-primary">
          {text}
        </span>
        {body && (
          <span className="block font-serif italic text-body text-text-secondary/75 leading-snug">
            {body}
          </span>
        )}
      </span>
    </motion.button>
  );
}
