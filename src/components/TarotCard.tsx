"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { TarotArchetype } from "@/types/tarot";
import { TAROT_PHASES } from "@/data/tarot/archetypes";
import { useTheme } from "@/components/ThemeProvider";

type Size = "sm" | "md" | "lg";

const DIMS: Record<
  Size,
  { w: number; h: number; numCls: string; nameCls: string; glyphCls: string }
> = {
  sm: { w: 200, h: 320, numCls: "text-3xl", nameCls: "text-base", glyphCls: "text-5xl" },
  md: { w: 260, h: 400, numCls: "text-4xl", nameCls: "text-xl", glyphCls: "text-7xl" },
  lg: { w: 320, h: 500, numCls: "text-5xl", nameCls: "text-2xl", glyphCls: "text-8xl" },
};

const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface Props {
  archetype: TarotArchetype;
  size?: Size;
  href?: string;
  initialFlipped?: boolean;
}

export default function TarotCard({
  archetype,
  size = "md",
  href,
  initialFlipped = false,
}: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const dim = DIMS[size];
  const color =
    TAROT_PHASES.find((p) => p.ids.includes(archetype.id))?.color ??
    archetype.accentColor;
  const [flipped, setFlipped] = useState(initialFlipped);
  const ref = useRef<HTMLDivElement>(null);

  // Cursor-tracked tilt (0..1 normalized)
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const tiltY = useTransform(mx, [0, 1], [-10, 10]);
  const tiltX = useTransform(my, [0, 1], [8, -8]);
  const sTiltX = useSpring(tiltX, { stiffness: 150, damping: 20, mass: 0.5 });
  const sTiltY = useSpring(tiltY, { stiffness: 150, damping: 20, mass: 0.5 });

  // Flip rotation (spring-damped)
  const flipY = useSpring(initialFlipped ? 180 : 0, {
    stiffness: 120,
    damping: 18,
    mass: 0.9,
  });
  useEffect(() => {
    flipY.set(flipped ? 180 : 0);
  }, [flipped, flipY]);

  const rotateY = useTransform([sTiltY, flipY], (v) => {
    const arr = v as unknown as number[];
    return arr[0] + arr[1];
  });
  const rotateX = sTiltX;
  const flipScale = useTransform(flipY, [0, 90, 180], [1, 1.08, 1]);

  // Foil glow position
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const foilBg = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, ${color}66 0%, ${color}22 25%, transparent 60%)`;

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  const baseBg = light
    ? `linear-gradient(160deg, #F8F5EE 0%, ${color}0E 45%, #EAE7E0 100%)`
    : `linear-gradient(160deg, #14141A 0%, ${color}14 45%, #08080C 100%)`;

  const borderColor = light ? color + "55" : color + "40";

  return (
    <div
      className="relative inline-block select-none"
      style={{ width: dim.w, height: dim.h, perspective: "1200px" }}
    >
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) return;
        setFlipped((f) => !f);
      }}
      role="button"
      aria-label={`${archetype.numeral} - ${archetype.name}${flipped ? " (flipped)" : ""}`}
      aria-pressed={flipped}
      className="relative w-full h-full cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        scale: flipScale,
      }}
    >
        {/* FRONT FACE */}
        <div
          className="absolute inset-0 rounded-md overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: baseBg,
            border: `1px solid ${borderColor}`,
            boxShadow: light
              ? `0 20px 40px -20px ${color}40, 0 0 0 1px ${color}20`
              : `0 20px 50px -15px #000, 0 0 30px ${color}25, 0 0 0 1px ${color}20`,
          }}
        >
          {/* Ornate double border */}
          <div
            className="absolute inset-3 rounded-sm pointer-events-none"
            style={{ border: `1px solid ${color}${light ? "55" : "35"}` }}
          />
          <div
            className="absolute inset-4 rounded-sm pointer-events-none"
            style={{ border: `1px solid ${color}${light ? "25" : "15"}` }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-between px-6 py-7">
            <div className="flex flex-col items-center gap-1">
              <span
                className="font-mono text-[9px] tracking-[0.4em] uppercase"
                style={{ color: color + (light ? "DD" : "CC") }}
              >
                {archetype.numeral}
              </span>
              <div
                className="h-px w-8"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
              />
            </div>

            <div
              className={`${dim.glyphCls} font-serif leading-none`}
              style={{
                color,
                textShadow: !light ? `0 0 32px ${color}70, 0 0 8px ${color}50` : "none",
              }}
              aria-hidden
            >
              {archetype.symbol}
            </div>

            <div className="flex flex-col items-center gap-2 text-center w-full">
              <div
                className="h-px w-8"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
              />
              <h3
                className={`font-serif font-medium tracking-tight ${dim.nameCls}`}
                style={{
                  color: light ? "var(--color-text-primary)" : color,
                  textShadow: !light ? `0 0 16px ${color}40` : "none",
                }}
              >
                {archetype.name}
              </h3>
              <p
                className="font-mono text-[8px] tracking-[0.3em] uppercase mt-1 line-clamp-1"
                style={{ color: light ? "var(--color-muted)" : "var(--color-text-secondary)" }}
              >
                {archetype.coreTheme.split("-")[0].trim()}
              </p>
            </div>
          </div>

          {/* Foil glow - cursor-tracked, blended */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: foilBg,
              mixBlendMode: light ? "multiply" : "color-dodge",
              opacity: light ? 0.65 : 0.9,
            }}
          />

          {/* Film grain (rotates with card) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: GRAIN_SVG,
              backgroundRepeat: "repeat",
              backgroundSize: "256px 256px",
              mixBlendMode: "overlay",
              opacity: light ? 0.12 : 0.22,
            }}
          />
        </div>

        {/* BACK FACE */}
        <div
          className="absolute inset-0 rounded-md overflow-hidden flex flex-col"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: baseBg,
            border: `1px solid ${borderColor}`,
            boxShadow: light
              ? `0 20px 40px -20px ${color}40, 0 0 0 1px ${color}20`
              : `0 20px 50px -15px #000, 0 0 30px ${color}25, 0 0 0 1px ${color}20`,
          }}
        >
          <div
            className="absolute inset-3 rounded-sm pointer-events-none"
            style={{ border: `1px solid ${color}${light ? "55" : "35"}` }}
          />

          <div className="relative flex-1 flex flex-col px-5 py-6 gap-3 overflow-hidden">
            <div className="flex items-center justify-between">
              <span
                className="font-mono text-[8px] tracking-[0.35em] uppercase"
                style={{ color: color + (light ? "CC" : "AA") }}
              >
                {archetype.numeral} · {archetype.name}
              </span>
              <span
                className={`font-serif ${size === "sm" ? "text-2xl" : "text-3xl"}`}
                style={{ color, opacity: 0.5 }}
                aria-hidden
              >
                {archetype.symbol}
              </span>
            </div>

            <div className="flex flex-col gap-2.5 mt-1">
              {[
                { label: "Fullness", hint: "Integrated", pole: archetype.poles.fullness, tint: color },
                { label: "Active Shadow", hint: "Inflated", pole: archetype.poles.activeShadow, tint: "#C0392B" },
                { label: "Passive Shadow", hint: "Refused", pole: archetype.poles.passiveShadow, tint: "#4A5A7A" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="rounded-sm px-2.5 py-2"
                  style={{
                    background: light ? `${row.tint}10` : `${row.tint}15`,
                    borderLeft: `2px solid ${row.tint}${light ? "AA" : "80"}`,
                  }}
                >
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <p
                      className="font-mono text-[9px] tracking-[0.3em] uppercase"
                      style={{ color: row.tint + (light ? "EE" : "CC") }}
                    >
                      {row.label}
                    </p>
                    <p
                      className="font-serif italic text-[10px] leading-none"
                      style={{
                        color: row.tint + (light ? "88" : "66"),
                        letterSpacing: "0.02em",
                      }}
                    >
                      {row.hint}
                    </p>
                  </div>
                  <p
                    className="font-serif text-[13px] leading-snug line-clamp-3"
                    style={{
                      color: light ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                    }}
                  >
                    {row.pole.title}
                  </p>
                </div>
              ))}
            </div>

            {href && (
              <Link
                href={href}
                onClick={(e) => e.stopPropagation()}
                className="group/enter mt-auto inline-flex items-center justify-center gap-2 font-mono text-[8px] tracking-[0.35em] uppercase py-2 rounded-sm transition-colors duration-300"
                style={{
                  color: color + (light ? "EE" : "DD"),
                  background: light ? `${color}12` : `${color}18`,
                  border: `1px solid ${color}${light ? "55" : "40"}`,
                }}
              >
                <span className="w-4 h-px bg-current opacity-60 transition-all duration-300 group-hover/enter:w-6" />
                Enter the Arcanum
                <span
                  className="transition-transform duration-300 group-hover/enter:translate-x-0.5"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            )}
          </div>

          {/* Film grain on back too */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: GRAIN_SVG,
              backgroundRepeat: "repeat",
              backgroundSize: "256px 256px",
              mixBlendMode: "overlay",
              opacity: light ? 0.1 : 0.18,
            }}
          />
        </div>
    </motion.div>
    </div>
  );
}
