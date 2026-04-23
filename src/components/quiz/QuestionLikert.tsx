"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LikertItem } from "@/lib/quiz-types";

interface Props {
  item: LikertItem;
  onCommit: (value: number) => void;
}

const VALUES = [1, 2, 3, 4, 5, 6, 7] as const;

function Kbd({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center font-mono text-[10px] tracking-normal uppercase min-w-[22px] h-[22px] px-1.5 rounded-sm border border-gold/35 text-gold/90 bg-gold/[0.04]">
      {children}
    </span>
  );
}

export default function QuestionLikert({ item, onCommit }: Props) {
  const reduced = useReducedMotion() ?? false;
  const [pressed, setPressed] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const anchors = item.anchors ?? { low: "not really", high: "deeply" };

  function commit(v: number) {
    if (pressed !== null) return;
    setPressed(v);
    // Short enough to feel snappy across 50 questions; long enough for the
    // scale flourish to read as a response rather than a cut.
    window.setTimeout(() => onCommit(v), 110);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (pressed !== null) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      const n = parseInt(e.key, 10);
      if (!Number.isNaN(n) && n >= 1 && n <= 7) {
        e.preventDefault();
        commit(n);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setHovered((prev) => Math.max(1, (prev ?? 4) - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setHovered((prev) => Math.min(7, (prev ?? 4) + 1));
      } else if (e.key === "Enter" || e.key === " ") {
        if (hovered !== null) {
          e.preventDefault();
          commit(hovered);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered, pressed]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <motion.h2
        className="font-serif text-h2 md:text-[2rem] leading-tight text-text-primary text-center mb-12 max-w-xl mx-auto"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      >
        {item.prompt}
      </motion.h2>

      <div className="mx-auto w-fit mb-10">
      <motion.div
        className="relative"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.12 }}
        role="radiogroup"
        aria-label={item.prompt}
      >
        {/* Spine is 2px tall at top=21, centering on whole pixel y=22 —
            the exact y at which every dot's geometric center also sits
            (buttons are 44 and the dot uses marginTop (44-size)/2).
            Opacity halved vs. the old 1px line so visual weight matches. */}
        <div
          aria-hidden
          className="pointer-events-none absolute transition-opacity duration-500"
          style={{
            left: 22,
            right: 22,
            top: 21,
            height: 2,
            background: "var(--color-gold)",
            opacity: pressed !== null ? 0.05 : 0.13,
          }}
        />
        {/* Mid-tick anchor at position 4 — the "neither" of a Likert. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center"
        >
          <div
            className="h-[7px] w-px transition-opacity duration-500"
            style={{
              background: "var(--color-gold)",
              opacity: pressed !== null ? 0.18 : 0.35,
            }}
          />
        </div>

        <div className="relative flex items-center gap-3 sm:gap-5">
          {VALUES.map((v) => {
            const isPressed = pressed === v;
            const isHover = hovered === v;
            const dimOther = pressed !== null && pressed !== v;
            // Rest-state tint warms left→right: cool muted on the low end,
            // full gold on the high end. Hover/press lifts any dot to gold.
            const goldPct = Math.round(((v - 1) / 6) * 100);
            const restBg = `color-mix(in oklch, var(--color-muted) ${100 - goldPct}%, var(--color-gold) ${goldPct}%)`;
            // Gentle opacity ramp: the color is doing most of the magnitude
            // work, so opacity only whispers.
            const base = 0.55 + ((v - 1) / 6) * 0.3;
            // Dampened size ramp. The spine already says "this is a scale",
            // so size doesn't need to shout.
            const size = 17 + v * 1.2;
            return (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={isPressed}
                aria-label={`${v} of 7`}
                onClick={() => commit(v)}
                onMouseEnter={() => setHovered(v)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(v)}
                onBlur={() => setHovered(null)}
                disabled={pressed !== null}
                className="group relative rounded-full transition-all duration-500 focus:outline-none disabled:cursor-default"
                style={{
                  width: 44,
                  height: 44,
                  padding: 0,
                }}
              >
                <motion.span
                  aria-hidden
                  className="block rounded-full"
                  animate={{
                    opacity: dimOther
                      ? 0.1
                      : isPressed
                        ? 1
                        : isHover
                          ? Math.min(1, base + 0.2)
                          : base,
                    scale: isPressed ? 1.18 : isHover ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  style={{
                    width: size,
                    height: size,
                    margin: "auto",
                    marginTop: (44 - size) / 2,
                    background:
                      isPressed || isHover ? "var(--color-gold)" : restBg,
                    boxShadow: isPressed
                      ? "0 0 0 1px rgba(212,175,55,0.85), 0 0 18px rgba(212,175,55,0.55), 0 0 36px rgba(212,175,55,0.32)"
                      : isHover
                        ? "0 0 0 1px rgba(212,175,55,0.5), 0 0 10px rgba(212,175,55,0.28)"
                        : "0 0 0 1px rgba(212,175,55,0.14)",
                  }}
                />
              </button>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        className="relative mt-4 h-5"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.2 }}
      >
        <span
          className="absolute top-0 whitespace-nowrap font-serif italic text-sm text-text-secondary/60"
          style={{ left: 22, transform: "translateX(-50%)" }}
        >
          {anchors.low}
        </span>
        <span
          className="absolute top-0 whitespace-nowrap font-serif italic text-sm text-text-secondary/60"
          style={{ right: 22, transform: "translateX(50%)" }}
        >
          {anchors.high}
        </span>
      </motion.div>
      </div>

      <motion.div
        className="hidden sm:flex items-center justify-center gap-2 font-mono text-kicker tracking-kicker uppercase text-muted/55"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.32 }}
      >
        <Kbd>1</Kbd>
        <span className="mx-0.5 text-muted/40">·</span>
        <Kbd>&hellip;</Kbd>
        <span className="mx-0.5 text-muted/40">·</span>
        <Kbd>7</Kbd>
        <span className="mx-2 text-muted/40">or</span>
        <Kbd>&larr;</Kbd>
        <Kbd>&rarr;</Kbd>
        <Kbd>&crarr;</Kbd>
      </motion.div>
    </div>
  );
}
