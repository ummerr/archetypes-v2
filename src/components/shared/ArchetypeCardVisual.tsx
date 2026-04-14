"use client";

import { motion } from "framer-motion";
import { getMbtiBySlug } from "@/data/mbti/archetypes";
import { getArchetypeBySlug as getKwmlBySlug } from "@/data/kwml/archetypes";
import MbtiGlyph from "@/components/MbtiGlyph";
import ArchetypeSymbol from "@/components/ArchetypeSymbol";
import { HeroJourneyArchetypeIcon } from "@/components/HeroJourneyArchetypeIcon";
import type { IndexEntry } from "@/data/allArchetypes";

const SIZE = 52;

export default function ArchetypeCardVisual({
  entry,
  hovered,
}: {
  entry: IndexEntry;
  hovered: boolean;
}) {
  const color = entry.accentColor;

  if (entry.systemId === "mbti") {
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

  if (entry.systemId === "kwml") {
    const a = getKwmlBySlug(entry.slug);
    if (!a) return null;
    return (
      <div
        className="transition-transform duration-500 ease-out"
        style={{
          width: SIZE,
          height: SIZE,
          transform: hovered ? "scale(1.06) rotate(-2deg)" : "scale(1)",
        }}
      >
        <ArchetypeSymbol archetype={a.family} color={color} className="w-full h-full" />
      </div>
    );
  }

  if (entry.systemId === "heros-journey") {
    return (
      <div
        className="transition-transform duration-500 ease-out"
        style={{
          transform: hovered ? "scale(1.1) rotate(3deg)" : "scale(1)",
        }}
      >
        <HeroJourneyArchetypeIcon slug={entry.slug} color={color} size={44} />
      </div>
    );
  }

  if (entry.systemId === "tarot") {
    const char = entry.symbol ?? "✶";
    return (
      <div
        className="relative flex items-center justify-center"
        style={{ width: SIZE, height: SIZE }}
        aria-hidden
      >
        {/* breathing radial halo */}
        <motion.span
          className="absolute inset-[-4px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}${hovered ? "33" : "1E"} 0%, transparent 65%)`,
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* slow-rotating solid ring */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${color}${hovered ? "66" : "38"}` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        {/* counter-rotating dashed ring */}
        <motion.span
          className="absolute inset-[5px] rounded-full"
          style={{
            border: `1px dashed ${color}${hovered ? "55" : "28"}`,
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        />
        {/* orbiting phase mote */}
        <motion.span
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <span
            className="absolute block rounded-full"
            style={{
              width: 3,
              height: 3,
              left: SIZE / 2 - 1.5,
              top: -1.5,
              background: color,
              boxShadow: `0 0 6px ${color}`,
              opacity: hovered ? 0.95 : 0.6,
            }}
          />
        </motion.span>
        {/* glyph with subtle shimmer */}
        <motion.span
          className="relative font-serif leading-none"
          style={{ color, fontSize: 26 }}
          animate={{
            textShadow: [
              `0 0 6px ${color}40`,
              `0 0 14px ${color}90`,
              `0 0 6px ${color}40`,
            ],
            scale: hovered ? 1.08 : 1,
          }}
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

  // Jungian · Enneagram - typographic glyph with accent ring
  const char = entry.symbol ?? "◯";
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: SIZE, height: SIZE }}
      aria-hidden
    >
      <span
        className="absolute inset-0 rounded-full transition-all duration-700 ease-out"
        style={{
          border: `1px solid ${color}${hovered ? "55" : "28"}`,
          background: hovered
            ? `radial-gradient(circle, ${color}18 0%, transparent 70%)`
            : "transparent",
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      />
      <span
        className="absolute inset-[6px] rounded-full transition-opacity duration-1000"
        style={{
          border: `1px dashed ${color}${hovered ? "40" : "18"}`,
          opacity: hovered ? 1 : 0.55,
          animation: hovered ? "slow-spin 14s linear infinite" : "none",
        }}
      />
      <span
        className="relative font-serif leading-none transition-all duration-500"
        style={{
          color,
          fontSize: 26,
          textShadow: hovered ? `0 0 12px ${color}80` : "none",
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      >
        {char}
      </span>
    </div>
  );
}
