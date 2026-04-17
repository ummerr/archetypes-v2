"use client";

/**
 * Ambient totem renderers — one per system. Registered into
 * `src/data/totem-registry.ts` on module import. See DESIGN.md §5.
 *
 * Keep each renderer small and local: its job is to pick the right
 * visual for an index-card thumbnail (sm scale) and nothing else.
 */

import { motion, useReducedMotion } from "framer-motion";
import { getMbtiBySlug } from "@/data/mbti/archetypes";
import { getArchetypeBySlug as getKwmlBySlug } from "@/data/kwml/archetypes";
import MbtiGlyph from "@/components/MbtiGlyph";
import ArchetypeSymbol from "@/components/ArchetypeSymbol";
import { HeroJourneyArchetypeIcon } from "@/components/HeroJourneyArchetypeIcon";
import { registerTotem } from "@/data/totem-registry";
import { useTheme } from "@/components/ThemeProvider";
import {
  emissiveTextShadow,
  emissiveBoxShadow,
  emissiveHaloGradient,
  emissiveBorder,
} from "@/lib/emissive-style";
import type { IndexEntry } from "@/data/allArchetypes";

const CELL = 52;

function MbtiRenderer({ entry, hovered }: { entry: IndexEntry; hovered: boolean }) {
  const a = getMbtiBySlug(entry.slug);
  if (!a) return null;
  return (
    <div
      className="transition-transform duration-500 ease-out"
      style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
    >
      <MbtiGlyph archetype={a} size="sm" />
    </div>
  );
}

function KwmlRenderer({ entry, hovered }: { entry: IndexEntry; hovered: boolean }) {
  const a = getKwmlBySlug(entry.slug);
  if (!a) return null;
  return (
    <div
      className="transition-transform duration-500 ease-out"
      style={{
        width: CELL,
        height: CELL,
        transform: hovered ? "scale(1.06) rotate(-2deg)" : "scale(1)",
      }}
    >
      <ArchetypeSymbol archetype={a.family} color={entry.accentColor} className="w-full h-full" />
    </div>
  );
}

function HeroJourneyRenderer({ entry, hovered }: { entry: IndexEntry; hovered: boolean }) {
  return (
    <div
      className="transition-transform duration-500 ease-out"
      style={{ transform: hovered ? "scale(1.1) rotate(3deg)" : "scale(1)" }}
    >
      <HeroJourneyArchetypeIcon slug={entry.slug} color={entry.accentColor} size={44} />
    </div>
  );
}

function TarotRenderer({ entry, hovered }: { entry: IndexEntry; hovered: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const light = theme === "light";
  const motionOn = !prefersReducedMotion;
  const color = entry.accentColor;
  const char = entry.symbol ?? "✶";
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: CELL, height: CELL }}
      aria-label={`${entry.name} — ${entry.systemName}`}
      role="img"
    >
      {/* breathing radial halo */}
      <motion.span
        className="absolute inset-[-4px] rounded-full"
        style={{
          background: emissiveHaloGradient(color, { light, hovered }),
        }}
        animate={motionOn ? { scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] } : undefined}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* slow-rotating solid ring */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ border: emissiveBorder(color, { light, hovered }) }}
        animate={motionOn ? { rotate: 360 } : undefined}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      {/* counter-rotating dashed ring */}
      <motion.span
        className="absolute inset-[5px] rounded-full"
        style={{ border: `1px dashed ${color}${light ? (hovered ? "35" : "18") : (hovered ? "55" : "28")}` }}
        animate={motionOn ? { rotate: -360 } : undefined}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      />
      {/* orbiting phase mote */}
      <motion.span
        className="absolute top-1/2 left-1/2"
        style={{ width: 0, height: 0 }}
        animate={motionOn ? { rotate: 360 } : undefined}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <span
          className="absolute block rounded-full"
          style={{
            width: 3,
            height: 3,
            left: CELL / 2 - 1.5,
            top: -1.5,
            background: color,
            boxShadow: emissiveBoxShadow(color, { light, hovered }),
            opacity: hovered ? 0.95 : 0.6,
          }}
        />
      </motion.span>
      {/* glyph with subtle shimmer */}
      <motion.span
        className="relative font-serif leading-none"
        style={{ color, fontSize: 26 }}
        animate={
          motionOn && !light
            ? {
                textShadow: [
                  `0 0 6px ${color}40`,
                  `0 0 14px ${color}90`,
                  `0 0 6px ${color}40`,
                ],
                scale: hovered ? 1.08 : 1,
              }
            : { scale: hovered ? 1.08 : 1 }
        }
        transition={{
          textShadow: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.5, ease: "easeOut" },
        }}
      >
        {char}
      </motion.span>
    </div>
  );
}

function GlyphRingRenderer({ entry, hovered }: { entry: IndexEntry; hovered: boolean }) {
  const { theme } = useTheme();
  const light = theme === "light";
  const color = entry.accentColor;
  const char = entry.symbol ?? "◯";
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: CELL, height: CELL }}
      aria-label={`${entry.name} — ${entry.systemName}`}
      role="img"
    >
      <span
        className="absolute inset-0 rounded-full transition-all duration-700 ease-out"
        style={{
          border: emissiveBorder(color, { light, hovered }),
          background: emissiveHaloGradient(color, { light, hovered }),
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      />
      <span
        className="absolute inset-[6px] rounded-full transition-opacity duration-1000"
        style={{
          border: `1px dashed ${color}${light ? (hovered ? "30" : "14") : (hovered ? "40" : "18")}`,
          opacity: hovered ? 1 : 0.55,
          animation: hovered ? "slow-spin 14s linear infinite" : "none",
        }}
      />
      <span
        className="relative font-serif leading-none transition-all duration-500"
        style={{
          color,
          fontSize: 26,
          textShadow: emissiveTextShadow(color, { light, hovered }),
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      >
        {char}
      </span>
    </div>
  );
}

registerTotem("mbti", (entry, hovered) => <MbtiRenderer entry={entry} hovered={hovered} />);
registerTotem("kwml", (entry, hovered) => <KwmlRenderer entry={entry} hovered={hovered} />);
registerTotem("heros-journey", (entry, hovered) => (
  <HeroJourneyRenderer entry={entry} hovered={hovered} />
));
registerTotem("tarot", (entry, hovered) => <TarotRenderer entry={entry} hovered={hovered} />);
registerTotem("jungian", (entry, hovered) => <GlyphRingRenderer entry={entry} hovered={hovered} />);
registerTotem("enneagram", (entry, hovered) => (
  <GlyphRingRenderer entry={entry} hovered={hovered} />
));
