"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

interface ShadowPole {
  name: string;
  description: string;
  traits: string[];
}

interface Props {
  archetypeName: string;
  archetypeSlug: string;
  activeShadow: ShadowPole;
  passiveShadow: ShadowPole;
  color: string;
}

/* ─── First-person shadow voice lines ── */
const SHADOW_VOICES: Record<string, { active: string; passive: string }> = {
  "the-king": {
    active:
      "I am the center of everything. Bow before me — or I will destroy you.",
    passive:
      "I am nothing. I have no power, no center, no worth at all.",
  },
  "the-warrior": {
    active:
      "Your weakness disgusts me. I will break you to prove my own strength.",
    passive:
      "I deserve this. I'm not strong enough to fight back. I never was.",
  },
  "the-magician": {
    active:
      "I see through everyone. Knowledge is my weapon — and I share nothing.",
    passive:
      "Who, me? I know nothing. I couldn't possibly be responsible for any of this.",
  },
  "the-lover": {
    active:
      "More. I need more. Something out there will finally fill this emptiness.",
    passive:
      "I feel nothing anymore. The world is flat and grey. Why should I care?",
  },
  "the-divine-child": {
    active:
      "Give it to me NOW. The entire universe exists to serve me.",
    passive:
      "I can't do anything on my own. Someone please come and rescue me.",
  },
  "the-hero": {
    active:
      "I am invincible. Don't you dare question me — just watch and be amazed.",
    passive:
      "I can't face it. Everyone out there is stronger and braver than me.",
  },
  "the-precocious-child": {
    active:
      "I already know more than all of you. Let me show you how foolish you really are.",
    passive:
      "I don't understand anything... I'm just not smart enough for this.",
  },
  "the-oedipal-child": {
    active:
      "No one will ever love me like she does. I'll keep searching forever and never find it.",
    passive:
      "Real connection hurts too much. I'll stay here alone, safe inside my fantasies.",
  },
};

/* ─── Oscillation Dot — bounces between the two cards ── */
function OscillationDot({
  color,
  possessed,
}: {
  color: string;
  possessed: "active" | "passive" | null;
}) {
  const dotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!dotRef.current) return;
    const el = dotRef.current;
    let t = 0;

    function tick() {
      t += 0.012;
      let yPct: number;

      if (possessed === "active") {
        // Pull toward top (active side)
        yPct = 20 + Math.sin(t * 2) * 8;
      } else if (possessed === "passive") {
        // Pull toward bottom (passive side)
        yPct = 80 + Math.sin(t * 2) * 8;
      } else {
        // Free oscillation — asymmetric, spends time at extremes
        const raw = Math.sin(t * 0.7) * Math.cos(t * 0.3);
        yPct = 50 + raw * 38;
      }

      el.style.top = `${yPct}%`;
      frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [possessed]);

  return (
    <div
      ref={dotRef}
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
      style={{ top: "50%" }}
    >
      {/* Glow halo */}
      <div
        className="absolute -inset-3 rounded-full blur-md transition-colors duration-700"
        style={{
          background:
            possessed === "active"
              ? "var(--color-crimson)"
              : possessed === "passive"
                ? "var(--color-muted)"
                : color,
          opacity: 0.3,
        }}
      />
      {/* Core dot */}
      <div
        className="w-2 h-2 rounded-full transition-colors duration-700"
        style={{
          background:
            possessed === "active"
              ? "var(--color-crimson-light)"
              : possessed === "passive"
                ? "var(--color-muted)"
                : color,
          boxShadow:
            possessed === "active"
              ? "0 0 12px var(--color-crimson), 0 0 24px rgba(192, 57, 43, 0.3)"
              : possessed === "passive"
                ? "0 0 12px var(--color-muted), 0 0 24px rgba(138, 135, 128, 0.2)"
                : `0 0 12px ${color}, 0 0 24px ${color}40`,
        }}
      />
    </div>
  );
}

/* ─── Shadow Card with possession interaction ── */
function ShadowCard({
  pole,
  shadow,
  possessed,
  onPossess,
  color,
  light,
}: {
  pole: "active" | "passive";
  shadow: ShadowPole;
  possessed: "active" | "passive" | null;
  onPossess: (p: "active" | "passive" | null) => void;
  color: string;
  light: boolean;
}) {
  const isActive = pole === "active";
  const isPossessed = possessed === pole;
  const isDimmed = possessed !== null && possessed !== pole;

  // Use darker, higher-contrast colors in light mode
  const poleColor = isActive
    ? light ? "#9A2D26" : "#C0392B"
    : light ? "#56534B" : "#5C5A52";
  const poleLightColor = isActive
    ? light ? "#B33428" : "#E74C3C"
    : light ? "#706D65" : "#8A8780";

  return (
    <motion.div
      className="relative p-6 rounded-xl overflow-hidden transition-all duration-500 cursor-default"
      style={{
        background: isPossessed
          ? isActive
            ? light
              ? "linear-gradient(145deg, rgba(154, 45, 38, 0.12) 0%, rgba(154, 45, 38, 0.04) 100%)"
              : "linear-gradient(145deg, rgba(192, 57, 43, 0.14) 0%, rgba(6, 6, 10, 0.95) 100%)"
            : light
              ? "linear-gradient(145deg, rgba(86, 83, 75, 0.12) 0%, rgba(86, 83, 75, 0.04) 100%)"
              : "linear-gradient(145deg, rgba(92, 90, 82, 0.12) 0%, rgba(6, 6, 10, 0.95) 100%)"
          : isActive
            ? light
              ? "linear-gradient(145deg, rgba(154, 45, 38, 0.07) 0%, rgba(154, 45, 38, 0.02) 100%)"
              : "linear-gradient(145deg, rgba(192, 57, 43, 0.06) 0%, rgba(6, 6, 10, 0.9) 100%)"
            : light
              ? "linear-gradient(145deg, rgba(86, 83, 75, 0.07) 0%, rgba(86, 83, 75, 0.02) 100%)"
              : "linear-gradient(145deg, rgba(92, 90, 82, 0.06) 0%, rgba(6, 6, 10, 0.9) 100%)",
        border: `1px solid ${isPossessed ? poleLightColor + (light ? "50" : "35") : poleColor + (light ? "30" : "12")}`,
        opacity: isDimmed ? (light ? 0.4 : 0.35) : 1,
        transform: isPossessed ? "scale(1.02)" : isDimmed ? "scale(0.98)" : "scale(1)",
        filter: isDimmed ? "blur(1px)" : "none",
      }}
      onMouseEnter={() => onPossess(pole)}
      onMouseLeave={() => onPossess(null)}
    >
      {/* Top glow bar — intensifies on possession */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
        style={{
          background: isActive
            ? light
              ? "linear-gradient(90deg, rgba(154, 45, 38, 0.8) 0%, rgba(154, 45, 38, 0.3) 100%)"
              : "linear-gradient(90deg, rgba(231, 76, 60, 0.6) 0%, rgba(231, 76, 60, 0.2) 100%)"
            : light
              ? "linear-gradient(90deg, rgba(86, 83, 75, 0.6) 0%, rgba(86, 83, 75, 0.2) 100%)"
              : "linear-gradient(90deg, rgba(138, 135, 128, 0.4) 0%, rgba(138, 135, 128, 0.15) 100%)",
          opacity: isPossessed ? 1 : light ? 0.7 : 0.5,
        }}
      />

      {/* Background glow on possession */}
      <div
        className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none transition-opacity duration-700"
        style={{
          background: isActive
            ? light ? "#9A2D26" : "#E74C3C"
            : light ? "#56534B" : "#8A8780",
          opacity: isPossessed ? (light ? 0.08 : 0.12) : 0,
        }}
      />

      {/* Corner accent */}
      <div
        className="absolute top-0 left-0 w-8 h-8 border-t border-l rounded-tl-xl transition-colors duration-500"
        style={{
          borderColor: isPossessed
            ? `${poleLightColor}${light ? "60" : "40"}`
            : `${poleColor}${light ? "30" : "15"}`,
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3">
          {isActive ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              style={{
                color: isPossessed ? poleLightColor : `${poleLightColor}${light ? "90" : "60"}`,
                transition: "color 0.5s",
              }}
            >
              <path
                d="M7 1L13 12H1Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          ) : (
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              style={{
                color: isPossessed ? poleLightColor : `${poleLightColor}${light ? "90" : "60"}`,
                transition: "color 0.5s",
              }}
            >
              <rect
                x="1"
                y="1"
                width="12"
                height="8"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          )}
          <p
            className="font-mono text-[9px] uppercase tracking-[0.25em] transition-colors duration-500"
            style={{
              color: isPossessed
                ? poleLightColor
                : `${poleLightColor}${light ? "CC" : "80"}`,
            }}
          >
            {isActive ? "Active Shadow \u2014 Inflated" : "Passive Shadow \u2014 Deflated"}
          </p>
        </div>

        {/* Name */}
        <h3
          className="font-serif text-xl font-medium mb-3 transition-all duration-500"
          style={{
            color: isPossessed ? poleLightColor : light ? poleLightColor : `${poleLightColor}CC`,
            textShadow:
              isPossessed && !light
                ? isActive
                  ? "0 0 30px rgba(231, 76, 60, 0.4)"
                  : "0 0 30px rgba(138, 135, 128, 0.3)"
                : "none",
          }}
        >
          {shadow.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-5 leading-relaxed">
          {shadow.description}
        </p>

        {/* Traits — staggered reveal on possession */}
        <div className="space-y-0">
          {shadow.traits.map((t, i) => (
            <motion.div
              key={t}
              className="flex items-start gap-3 py-2 last:border-0 transition-all duration-300"
              style={{
                borderBottom: `1px solid ${poleColor}${isPossessed ? (light ? "20" : "12") : (light ? "12" : "08")}`,
                opacity: isPossessed ? 1 : isDimmed ? (light ? 0.4 : 0.3) : (light ? 0.85 : 0.7),
                transform: isPossessed
                  ? "translateX(0)"
                  : `translateX(${isActive ? "-" : ""}2px)`,
              }}
              initial={{ opacity: 0, x: isActive ? -8 : 8 }}
              whileInView={{ opacity: isPossessed ? 1 : 0.7, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1 + i * 0.06,
                duration: 0.4,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <span
                className="font-mono text-[8px] mt-1 shrink-0 w-4 text-right transition-colors duration-300"
                style={{ color: `${poleColor}${isPossessed ? (light ? "CC" : "80") : (light ? "80" : "40")}` }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-xs text-text-secondary leading-relaxed">
                {t}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   ShadowTheater — Interactive Shadow Possession Experience
   ═══════════════════════════════════════════════════════ */

export default function ShadowTheater({
  archetypeName,
  archetypeSlug,
  activeShadow,
  passiveShadow,
  color,
}: Props) {
  const [possessed, setPossessed] = useState<"active" | "passive" | null>(
    null
  );
  const { theme } = useTheme();
  const light = theme === "light";
  const voices = SHADOW_VOICES[archetypeSlug] || {
    active: "",
    passive: "",
  };

  return (
    <div className="relative">
      {/* ─── The Shadow Voice — first-person quote ─── */}
      <div className="relative h-24 flex items-center justify-center mb-6">
        <AnimatePresence mode="wait">
          {possessed ? (
            <motion.div
              key={possessed}
              className="text-center px-4"
              initial={{ opacity: 0, y: -8, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 8, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
            >
              <p
                className="font-mono text-[7px] tracking-[0.35em] uppercase mb-2.5"
                style={{
                  color:
                    possessed === "active"
                      ? "var(--color-crimson-light)"
                      : "var(--color-muted)",
                  opacity: light ? 0.7 : 0.5,
                }}
              >
                The shadow speaks
              </p>
              <p
                className="font-serif text-base md:text-lg italic max-w-md mx-auto leading-relaxed"
                style={{
                  color:
                    possessed === "active"
                      ? "var(--color-crimson-light)"
                      : "var(--color-muted)",
                  textShadow:
                    !light
                      ? possessed === "active"
                        ? "0 0 40px rgba(231, 76, 60, 0.25)"
                        : "0 0 40px rgba(138, 135, 128, 0.15)"
                      : "none",
                }}
              >
                &ldquo;
                {possessed === "active" ? voices.active : voices.passive}
                &rdquo;
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="neutral"
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted/50">
                Hover a shadow to hear its voice
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Shadow Cards with Oscillation Spine ─── */}
      <div className="grid md:grid-cols-2 gap-4 relative">
        {/* Oscillation spine — center vertical connection */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px z-10 pointer-events-none">
          {/* Gradient line */}
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{
              background: light
                ? possessed === "active"
                  ? "linear-gradient(180deg, rgba(154, 45, 38, 0.5), rgba(154, 45, 38, 0.08) 40%, rgba(86, 83, 75, 0.04) 100%)"
                  : possessed === "passive"
                    ? "linear-gradient(180deg, rgba(86, 83, 75, 0.04) 0%, rgba(86, 83, 75, 0.08) 60%, rgba(86, 83, 75, 0.5))"
                    : `linear-gradient(180deg, rgba(154, 45, 38, 0.2), ${color}30 50%, rgba(86, 83, 75, 0.2))`
                : possessed === "active"
                  ? "linear-gradient(180deg, rgba(231, 76, 60, 0.35), rgba(231, 76, 60, 0.05) 40%, rgba(138, 135, 128, 0.02) 100%)"
                  : possessed === "passive"
                    ? "linear-gradient(180deg, rgba(138, 135, 128, 0.02) 0%, rgba(138, 135, 128, 0.05) 60%, rgba(138, 135, 128, 0.35))"
                    : `linear-gradient(180deg, rgba(192, 57, 43, 0.12), ${color}20 50%, rgba(138, 135, 128, 0.12))`,
            }}
          />
          {/* Oscillation dot */}
          <OscillationDot color={color} possessed={possessed} />
        </div>

        {/* Active Shadow Card */}
        <ShadowCard
          pole="active"
          shadow={activeShadow}
          possessed={possessed}
          onPossess={setPossessed}
          color={color}
          light={light}
        />

        {/* Passive Shadow Card */}
        <ShadowCard
          pole="passive"
          shadow={passiveShadow}
          possessed={possessed}
          onPossess={setPossessed}
          color={color}
          light={light}
        />
      </div>

      {/* ─── Oscillation Insight — enhanced ─── */}
      <motion.div
        className="mt-8 relative p-5 rounded-lg overflow-hidden transition-all duration-700"
        style={{
          background:
            possessed === "active"
              ? light
                ? "linear-gradient(135deg, rgba(192, 57, 43, 0.06) 0%, rgba(192, 57, 43, 0.02) 100%)"
                : "linear-gradient(135deg, rgba(192, 57, 43, 0.06) 0%, rgba(6, 6, 10, 0.5) 100%)"
              : possessed === "passive"
                ? light
                  ? "linear-gradient(135deg, rgba(92, 90, 82, 0.06) 0%, rgba(92, 90, 82, 0.02) 100%)"
                  : "linear-gradient(135deg, rgba(92, 90, 82, 0.06) 0%, rgba(6, 6, 10, 0.5) 100%)"
                : light
                  ? `linear-gradient(135deg, rgba(192, 57, 43, 0.03) 0%, ${color}08 50%, rgba(92, 90, 82, 0.03) 100%)`
                  : `linear-gradient(135deg, rgba(192, 57, 43, 0.03) 0%, ${color}06 50%, rgba(92, 90, 82, 0.03) 100%)`,
          border: `1px dashed ${color}${light ? "35" : "12"}`,
        }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex gap-3 items-start">
          <span
            className="font-mono text-lg mt-0.5 shrink-0 transition-colors duration-500"
            style={{
              color:
                possessed === "active"
                  ? "var(--color-crimson)"
                  : possessed === "passive"
                    ? "var(--color-muted)"
                    : `${color}80`,
            }}
          >
            &#8644;
          </span>
          <div>
            <p
              className="font-mono text-[9px] uppercase tracking-[0.2em] mb-1.5 transition-colors duration-500"
              style={{
                color:
                  possessed === "active"
                    ? "var(--color-crimson-light)"
                    : possessed === "passive"
                      ? "var(--color-muted)"
                      : `${color}AA`,
                opacity: possessed ? 0.8 : 1,
              }}
            >
              The Oscillation Pattern
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              <span className="text-crimson-light/90 font-medium">
                {activeShadow.name}
              </span>{" "}
              and{" "}
              <span className="text-muted font-medium">
                {passiveShadow.name}
              </span>{" "}
              are not opposites &mdash; they are two faces of the same wound. A
              man possessed by one pole inevitably swings to the other. The path
              to{" "}
              <span className="font-medium" style={{ color }}>
                {archetypeName} in Fullness
              </span>{" "}
              requires recognizing both shadows as a single system, not
              identifying with either.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
