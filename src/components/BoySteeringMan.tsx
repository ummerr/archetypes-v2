"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FAMILIES } from "@/data/archetypes";
import type { ArchetypeFamilyGroup } from "@/types/archetype";
import { useTheme } from "@/components/ThemeProvider";

/* ─── Triangle geometry ─────────────────────────────── */
const MAN_APEX = { x: 300, y: 60 };
const MAN_LEFT = { x: 80, y: 440 };
const MAN_RIGHT = { x: 520, y: 440 };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getInnerTriangle(possession: number) {
  // At 0 possession: small centered triangle (~30% size)
  // At 1 possession: nearly fills the man triangle (~95%)
  const scale = lerp(0.3, 0.95, possession);

  // Center of the man triangle
  const cx = (MAN_APEX.x + MAN_LEFT.x + MAN_RIGHT.x) / 3;
  const cy = (MAN_APEX.y + MAN_LEFT.y + MAN_RIGHT.y) / 3;

  return {
    apex: {
      x: cx + (MAN_APEX.x - cx) * scale,
      y: cy + (MAN_APEX.y - cy) * scale,
    },
    left: {
      x: cx + (MAN_LEFT.x - cx) * scale,
      y: cy + (MAN_LEFT.y - cy) * scale,
    },
    right: {
      x: cx + (MAN_RIGHT.x - cx) * scale,
      y: cy + (MAN_RIGHT.y - cy) * scale,
    },
  };
}

/* ─── Insight text by phase ─────────────────────────── */
function getInsight(
  family: ArchetypeFamilyGroup,
  possession: number
): { phase: string; text: string } {
  if (possession < 0.25) {
    return {
      phase: "Integrated",
      text: `${family.boy.name} lives as a quiet seed within ${family.man.name}. His wonder and vitality fuel the man's mature power — energizing without overwhelming.`,
    };
  }
  if (possession < 0.5) {
    return {
      phase: "Stirring",
      text: `${family.boy.name}'s shadows begin to surface. The ${family.boy.activeShadow.name} starts to color the man's decisions, though he may not yet recognize it.`,
    };
  }
  if (possession < 0.75) {
    return {
      phase: "Influencing",
      text: `The man acts from ${family.man.name} energy but is increasingly driven by ${family.boy.name}'s unresolved shadows. Others sense the incongruence between his adult role and boyish reactions.`,
    };
  }
  return {
    phase: "Possessing",
    text: `${family.boy.activeShadow.name} now pilots the man. What looks like ${family.man.activeShadow.name} is actually ${family.boy.activeShadow.name} wearing an adult mask. The man's fullness is eclipsed.`,
  };
}

/* ─── Phase marker dots ─────────────────────────────── */
function PhaseMarkers({
  possession,
  color,
  light,
}: {
  possession: number;
  color: string;
  light: boolean;
}) {
  const phases = [
    { at: 0, label: "Integrated" },
    { at: 0.25, label: "Stirring" },
    { at: 0.5, label: "Influencing" },
    { at: 0.75, label: "Possessing" },
  ];

  return (
    <div className="flex justify-between px-1 mt-2">
      {phases.map((p) => {
        const active = possession >= p.at && (p.at === 0.75 || possession < p.at + 0.25);
        return (
          <div key={p.label} className="flex flex-col items-center gap-1">
            <div
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: active ? color : light ? "#ccc" : "#333",
                boxShadow: active ? `0 0 8px ${color}80` : "none",
              }}
            />
            <span
              className="font-mono text-[7px] tracking-[0.1em] uppercase transition-colors duration-300"
              style={{
                color: active ? color : "var(--color-muted)",
                opacity: active ? 1 : 0.4,
              }}
            >
              {p.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── SVG nested triangle visualization ─────────────── */
function NestedTriangleSVG({
  family,
  possession,
  light,
}: {
  family: ArchetypeFamilyGroup;
  possession: number;
  light: boolean;
}) {
  const inner = getInnerTriangle(possession);
  const color = family.color;
  const man = family.man;
  const boy = family.boy;

  // Man triangle opacity dims as possession grows
  const manOpacity = lerp(1, 0.25, possession);
  const manFullnessOpacity = lerp(1, 0.15, possession);

  // Boy triangle opacity and scale grow
  const boyOpacity = lerp(0.5, 1, possession);

  // Connection line opacity (boy shadow → man shadow)
  const connectionOpacity = Math.max(0, (possession - 0.3) / 0.7);

  // Shadow label prominence
  const boyShadowGlow = lerp(0, 12, possession);

  const manPath = `M${MAN_APEX.x},${MAN_APEX.y} L${MAN_LEFT.x},${MAN_LEFT.y} L${MAN_RIGHT.x},${MAN_RIGHT.y} Z`;
  const boyPath = `M${inner.apex.x},${inner.apex.y} L${inner.left.x},${inner.left.y} L${inner.right.x},${inner.right.y} Z`;

  return (
    <svg viewBox="0 0 600 520" className="w-full max-w-[600px] mx-auto">
      <defs>
        {/* Glow filter for boy shadows */}
        <filter id={`glow-${family.id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={boyShadowGlow} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Subtle gradient fill for man triangle */}
        <linearGradient id={`man-fill-${family.id}`} x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={light ? 0.06 : 0.04} />
          <stop offset="100%" stopColor={color} stopOpacity={0.01} />
        </linearGradient>

        {/* Inner glow for boy triangle at high possession */}
        <radialGradient id={`boy-glow-${family.id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={color} stopOpacity={possession * 0.15} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* ── Man triangle fill ── */}
      <motion.path
        d={manPath}
        fill={`url(#man-fill-${family.id})`}
        animate={{ opacity: manOpacity }}
        transition={{ duration: 0.4 }}
      />

      {/* ── Man triangle stroke ── */}
      <motion.path
        d={manPath}
        fill="none"
        stroke={color}
        strokeWidth={light ? 1.5 : 1}
        animate={{ opacity: manOpacity * (light ? 0.6 : 0.4) }}
        transition={{ duration: 0.4 }}
      />

      {/* ── Connection lines (boy shadow → man shadow) ── */}
      {connectionOpacity > 0 && (
        <>
          {/* Active shadow connection */}
          <motion.line
            x1={inner.left.x}
            y1={inner.left.y}
            x2={MAN_LEFT.x}
            y2={MAN_LEFT.y}
            stroke="var(--color-crimson-light)"
            strokeWidth={0.8}
            strokeDasharray="4 6"
            animate={{ opacity: connectionOpacity * 0.5 }}
            transition={{ duration: 0.4 }}
          />
          {/* Passive shadow connection */}
          <motion.line
            x1={inner.right.x}
            y1={inner.right.y}
            x2={MAN_RIGHT.x}
            y2={MAN_RIGHT.y}
            stroke="var(--color-muted)"
            strokeWidth={0.8}
            strokeDasharray="4 6"
            animate={{ opacity: connectionOpacity * 0.4 }}
            transition={{ duration: 0.4 }}
          />
        </>
      )}

      {/* ── Boy triangle glow area ── */}
      <motion.path
        d={boyPath}
        fill={`url(#boy-glow-${family.id})`}
        animate={{ opacity: possession > 0.4 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* ── Boy triangle stroke (dashed — unformed quality) ── */}
      <motion.path
        d={boyPath}
        fill="none"
        stroke={color}
        strokeWidth={light ? 1.5 : 1.2}
        strokeDasharray="6 4"
        animate={{ opacity: boyOpacity * (light ? 0.8 : 0.7) }}
        transition={{ duration: 0.4 }}
      />

      {/* ── Vertex markers ── */}

      {/* Man apex — fullness */}
      <motion.circle
        cx={MAN_APEX.x}
        cy={MAN_APEX.y}
        r={5}
        fill={color}
        animate={{ opacity: manFullnessOpacity }}
        transition={{ duration: 0.4 }}
      />

      {/* Man active shadow */}
      <motion.polygon
        points={`${MAN_LEFT.x},${MAN_LEFT.y - 5} ${MAN_LEFT.x - 5},${MAN_LEFT.y + 4} ${MAN_LEFT.x + 5},${MAN_LEFT.y + 4}`}
        fill="var(--color-crimson-light)"
        animate={{ opacity: manOpacity * 0.7 }}
        transition={{ duration: 0.4 }}
      />

      {/* Man passive shadow */}
      <motion.rect
        x={MAN_RIGHT.x - 4}
        y={MAN_RIGHT.y - 4}
        width={8}
        height={8}
        fill="var(--color-muted)"
        animate={{ opacity: manOpacity * 0.5 }}
        transition={{ duration: 0.4 }}
      />

      {/* Boy apex — fullness */}
      <motion.circle
        cx={inner.apex.x}
        cy={inner.apex.y}
        r={4}
        fill={color}
        stroke={color}
        strokeWidth={1}
        animate={{ opacity: boyOpacity }}
        transition={{ duration: 0.4 }}
        filter={possession > 0.5 ? `url(#glow-${family.id})` : undefined}
      />

      {/* Boy active shadow */}
      <motion.polygon
        points={`${inner.left.x},${inner.left.y - 4} ${inner.left.x - 4},${inner.left.y + 3} ${inner.left.x + 4},${inner.left.y + 3}`}
        fill="var(--color-crimson-light)"
        animate={{ opacity: boyOpacity * 0.8 }}
        transition={{ duration: 0.4 }}
        filter={possession > 0.5 ? `url(#glow-${family.id})` : undefined}
      />

      {/* Boy passive shadow */}
      <motion.rect
        x={inner.right.x - 3}
        y={inner.right.y - 3}
        width={6}
        height={6}
        fill="var(--color-muted)"
        animate={{ opacity: boyOpacity * 0.6 }}
        transition={{ duration: 0.4 }}
      />

      {/* ── Labels ── */}

      {/* Man Fullness label */}
      <motion.g animate={{ opacity: manFullnessOpacity }} transition={{ duration: 0.4 }}>
        <text
          x={MAN_APEX.x}
          y={MAN_APEX.y - 18}
          textAnchor="middle"
          className="font-serif"
          style={{ fontSize: 14, fill: color }}
        >
          {man.name}
        </text>
        <text
          x={MAN_APEX.x}
          y={MAN_APEX.y - 32}
          textAnchor="middle"
          className="font-mono"
          style={{
            fontSize: 7,
            fill: color,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            opacity: 0.5,
          }}
        >
          Fullness
        </text>
      </motion.g>

      {/* Man Active Shadow label */}
      <motion.g animate={{ opacity: manOpacity * 0.7 }} transition={{ duration: 0.4 }}>
        <text
          x={MAN_LEFT.x}
          y={MAN_LEFT.y + 24}
          textAnchor="middle"
          className="font-serif"
          style={{ fontSize: 11, fill: "var(--color-crimson-light)" }}
        >
          {man.activeShadow.name}
        </text>
        <text
          x={MAN_LEFT.x}
          y={MAN_LEFT.y + 36}
          textAnchor="middle"
          className="font-mono"
          style={{
            fontSize: 6,
            fill: "var(--color-crimson-light)",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            opacity: 0.5,
          }}
        >
          Active Shadow
        </text>
      </motion.g>

      {/* Man Passive Shadow label */}
      <motion.g animate={{ opacity: manOpacity * 0.6 }} transition={{ duration: 0.4 }}>
        <text
          x={MAN_RIGHT.x}
          y={MAN_RIGHT.y + 24}
          textAnchor="middle"
          className="font-serif"
          style={{ fontSize: 11, fill: "var(--color-muted)" }}
        >
          {man.passiveShadow.name}
        </text>
        <text
          x={MAN_RIGHT.x}
          y={MAN_RIGHT.y + 36}
          textAnchor="middle"
          className="font-mono"
          style={{
            fontSize: 6,
            fill: "var(--color-muted)",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            opacity: 0.5,
          }}
        >
          Passive Shadow
        </text>
      </motion.g>

      {/* Boy Fullness label */}
      <motion.text
        x={inner.apex.x}
        y={inner.apex.y - 12}
        textAnchor="middle"
        className="font-serif"
        style={{ fontSize: 11, fill: color }}
        animate={{ opacity: boyOpacity * 0.8 }}
        transition={{ duration: 0.4 }}
      >
        {boy.name}
      </motion.text>

      {/* Boy Active Shadow label */}
      <motion.text
        x={inner.left.x}
        y={inner.left.y + 18}
        textAnchor="middle"
        className="font-serif"
        style={{ fontSize: 9, fill: "var(--color-crimson-light)" }}
        animate={{ opacity: boyOpacity * 0.7 }}
        transition={{ duration: 0.4 }}
      >
        {boy.activeShadow.name}
      </motion.text>

      {/* Boy Passive Shadow label */}
      <motion.text
        x={inner.right.x}
        y={inner.right.y + 18}
        textAnchor="middle"
        className="font-serif"
        style={{ fontSize: 9, fill: "var(--color-muted)" }}
        animate={{ opacity: boyOpacity * 0.6 }}
        transition={{ duration: 0.4 }}
      >
        {boy.passiveShadow.name}
      </motion.text>

      {/* "MAN" / "BOY" structural labels */}
      <motion.text
        x={MAN_RIGHT.x + 20}
        y={MAN_APEX.y + 40}
        className="font-mono"
        style={{
          fontSize: 8,
          fill: color,
          letterSpacing: "0.3em",
          textTransform: "uppercase" as const,
        }}
        animate={{ opacity: manOpacity * 0.25 }}
        transition={{ duration: 0.4 }}
      >
        Man
      </motion.text>

      <motion.text
        x={inner.right.x + 12}
        y={inner.apex.y + 20}
        className="font-mono"
        style={{
          fontSize: 7,
          fill: color,
          letterSpacing: "0.25em",
          textTransform: "uppercase" as const,
        }}
        animate={{ opacity: boyOpacity * 0.3 }}
        transition={{ duration: 0.4 }}
      >
        Boy
      </motion.text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   BoySteeringMan — Main Page Component
   ═══════════════════════════════════════════════════════ */

export default function BoySteeringMan() {
  const [selectedFamily, setSelectedFamily] = useState<string>("king");
  const [possession, setPossession] = useState(0);
  const { theme } = useTheme();
  const light = theme === "light";

  const family = useMemo(
    () => FAMILIES.find((f) => f.id === selectedFamily)!,
    [selectedFamily]
  );

  const insight = getInsight(family, possession);

  return (
    <div className="min-h-screen relative">
      <div className="relative">
        {/* ─── Hero ─────────────────────────────────── */}
        <div className="px-6 pt-24 pb-10 md:pt-32 md:pb-14">
          <div className="max-w-3xl mx-auto">
            <div className="animate-slide-up">
              <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-4">
                Moore &amp; Gillette — The Nested Psyche
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-text-primary tracking-tight leading-[1.05] mb-5">
                The Boy{" "}
                <span className="text-gold glow-text-subtle animate-flicker">
                  Within
                </span>{" "}
                the Man
              </h1>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl font-light">
                Every man carries the boy he once was. When properly initiated,
                that boy becomes the seed of mature power. Left unchecked, the
                boy&apos;s shadows leak through — and begin to steer the adult
                from within.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Family selector tabs ─────────────────── */}
        <div className="px-6 pb-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2 animate-slide-up delay-200">
              {FAMILIES.map((f) => {
                const active = f.id === selectedFamily;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      setSelectedFamily(f.id);
                      setPossession(0);
                    }}
                    className="flex-1 py-2.5 rounded-sm font-mono text-[9px] tracking-[0.2em] uppercase transition-all duration-300"
                    style={{
                      backgroundColor: active
                        ? `${f.color}${light ? "18" : "12"}`
                        : "transparent",
                      color: active ? f.color : "var(--color-muted)",
                      border: `1px solid ${active ? f.color + (light ? "40" : "25") : light ? "#e0e0e0" : "#222"}`,
                      boxShadow: active && !light
                        ? `0 0 20px ${f.color}10`
                        : "none",
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Visualization area ───────────────────── */}
        <div className="px-6 pb-6">
          <div className="max-w-3xl mx-auto animate-slide-up delay-300">
            <div
              className="relative rounded-sm overflow-hidden transition-all duration-500"
              style={{
                background: light
                  ? `linear-gradient(180deg, ${family.color}06 0%, var(--color-bg) 60%)`
                  : `linear-gradient(180deg, ${family.color}04 0%, var(--color-bg) 60%)`,
                border: `1px solid ${family.color}${light ? "15" : "0A"}`,
              }}
            >
              <div className="p-4 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={family.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <NestedTriangleSVG
                      family={family}
                      possession={possession}
                      light={light}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Slider control ───────────────────────── */}
        <div className="px-6 pb-4">
          <div className="max-w-3xl mx-auto animate-slide-up delay-400">
            <div className="flex items-center gap-4 mb-1">
              <span className="font-mono text-[8px] tracking-[0.15em] text-muted uppercase shrink-0">
                Integrated
              </span>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={possession}
                  onChange={(e) => setPossession(parseFloat(e.target.value))}
                  className="w-full h-1 appearance-none rounded-full cursor-pointer"
                  style={{
                    background: `linear-gradient(90deg, ${family.color}40 ${possession * 100}%, ${light ? "#e0e0e0" : "#222"} ${possession * 100}%)`,
                    accentColor: family.color,
                  }}
                />
              </div>
              <span
                className="font-mono text-[8px] tracking-[0.15em] uppercase shrink-0"
                style={{ color: "var(--color-crimson-light)", opacity: 0.7 }}
              >
                Possessing
              </span>
            </div>
            <PhaseMarkers
              possession={possession}
              color={family.color}
              light={light}
            />
          </div>
        </div>

        {/* ─── Insight panel ────────────────────────── */}
        <div className="px-6 pb-16">
          <div className="max-w-3xl mx-auto animate-slide-up delay-500">
            <motion.div
              className="relative p-5 md:p-6 rounded-sm transition-all duration-500"
              style={{
                background: light
                  ? `linear-gradient(135deg, ${family.color}08 0%, transparent 50%)`
                  : `linear-gradient(135deg, ${family.color}06 0%, transparent 50%)`,
                border: `1px solid ${family.color}${light ? "15" : "0A"}`,
              }}
            >
              <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-sm transition-colors duration-500"
                style={{
                  backgroundColor:
                    possession < 0.5
                      ? `${family.color}50`
                      : "var(--color-crimson-light)",
                  opacity: possession < 0.5 ? 0.5 : 0.7,
                }}
              />

              <div className="pl-4">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="font-mono text-[8px] tracking-[0.2em] uppercase transition-colors duration-300"
                    style={{
                      color:
                        possession < 0.5
                          ? family.color
                          : "var(--color-crimson-light)",
                    }}
                  >
                    {insight.phase}
                  </span>
                  <div
                    className="h-px flex-1"
                    style={{
                      background: `linear-gradient(90deg, ${family.color}${light ? "20" : "10"}, transparent)`,
                    }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={insight.phase + family.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="text-text-secondary text-sm md:text-base leading-relaxed font-light"
                  >
                    {insight.text}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ─── Connection explanation at high possession ── */}
            <AnimatePresence>
              {possession > 0.5 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 overflow-hidden"
                >
                  <div
                    className="p-4 rounded-sm"
                    style={{
                      background: light
                        ? "rgba(192,57,43,0.04)"
                        : "rgba(192,57,43,0.06)",
                      border: "1px solid rgba(192,57,43,0.12)",
                    }}
                  >
                    <p className="font-mono text-[8px] tracking-[0.15em] text-crimson-light/70 uppercase mb-2">
                      Shadow Bleed-Through
                    </p>
                    <div className="flex items-center gap-3 text-xs text-text-secondary">
                      <span style={{ color: "var(--color-crimson-light)" }}>
                        {family.boy.activeShadow.name}
                      </span>
                      <span className="text-muted/30">&rarr;</span>
                      <span style={{ color: "var(--color-crimson-light)", opacity: 0.7 }}>
                        {family.man.activeShadow.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-secondary mt-1">
                      <span className="text-muted">
                        {family.boy.passiveShadow.name}
                      </span>
                      <span className="text-muted/30">&rarr;</span>
                      <span className="text-muted/70">
                        {family.man.passiveShadow.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ─── The Path Back ────────────────────────── */}
        <div className="px-6 pb-20">
          <div className="max-w-3xl mx-auto">
            <div
              className="h-px mb-12"
              style={{
                background: `linear-gradient(90deg, transparent, var(--color-gold)${light ? "25" : "12"}, transparent)`,
              }}
            />

            <div className="text-center mb-10">
              <p className="font-mono text-[9px] tracking-[0.3em] text-gold/60 uppercase mb-3">
                The Path Back
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-text-primary tracking-tight mb-4">
                Integration Through Initiation
              </h2>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xl mx-auto font-light">
                The solution is never to destroy the boy — he is the source of
                vitality. The task is to initiate him: to acknowledge the boy
                within, honor his energy, and channel it through the mature
                structure. The man who knows his inner boy can draw on that
                energy without being possessed by it.
              </p>
            </div>

            {/* Family links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {FAMILIES.map((f) => (
                <Link
                  key={f.id}
                  href={`/archetype/${f.man.slug}`}
                  className="group p-4 rounded-sm text-center transition-all duration-300"
                  style={{
                    border: `1px solid ${f.color}${light ? "18" : "0A"}`,
                    background: light
                      ? `linear-gradient(180deg, ${f.color}06 0%, transparent 100%)`
                      : `linear-gradient(180deg, ${f.color}04 0%, transparent 100%)`,
                  }}
                >
                  <p
                    className="font-serif text-sm font-medium transition-colors duration-300 group-hover:brightness-110"
                    style={{ color: f.color }}
                  >
                    {f.man.name}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 mt-1.5">
                    <span className="font-mono text-[7px] tracking-wider text-muted/60 uppercase">
                      {f.boy.name}
                    </span>
                    <svg
                      width="6"
                      height="6"
                      viewBox="0 0 6 8"
                      fill="none"
                      className="text-muted/20"
                    >
                      <path
                        d="M1 1L5 4L1 7"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span
                      className="font-mono text-[7px] tracking-wider uppercase"
                      style={{ color: `${f.color}99` }}
                    >
                      {f.man.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Back link */}
            <div className="mt-10 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-muted uppercase hover:text-gold transition-colors duration-300"
              >
                <span className="w-6 h-px bg-current" />
                Back to Archetypes
                <span className="w-6 h-px bg-current" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
