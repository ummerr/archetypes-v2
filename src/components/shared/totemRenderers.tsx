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
import ArcanaGlyph from "@/components/tarot/ArcanaGlyph";
import { HeroJourneyArchetypeIcon } from "@/components/HeroJourneyArchetypeIcon";
import JungianSilhouette from "@/components/JungianSilhouette";
import EnneagramSilhouette from "@/components/EnneagramSilhouette";
import type { JungianArchetype } from "@/types/jungian";
import type { EnneagramArchetype } from "@/types/enneagram";
import { registerTotem } from "@/data/totem-registry";
import { useTheme } from "@/components/ThemeProvider";
import {
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

/**
 * Shared motif shell — two counter-rotating rings, breathing halo, orbiting
 * mote, and a centered motif. Used by Tarot, Jungian, and Enneagram to give
 * every bespoke per-archetype silhouette the same ceremonial framing so
 * three systems read as one vocabulary.
 */
function MotifShell({
  label,
  color,
  hovered,
  children,
}: {
  label: string;
  color: string;
  hovered: boolean;
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const light = theme === "light";
  const motionOn = !prefersReducedMotion;
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: CELL, height: CELL }}
      aria-label={label}
      role="img"
    >
      <motion.span
        className="absolute inset-[-4px] rounded-full"
        style={{ background: emissiveHaloGradient(color, { light, hovered }) }}
        animate={motionOn ? { scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] } : undefined}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ border: emissiveBorder(color, { light, hovered }) }}
        animate={motionOn ? { rotate: 360 } : undefined}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        className="absolute inset-[5px] rounded-full"
        style={{
          border: `1px dashed ${color}${light ? (hovered ? "35" : "18") : (hovered ? "55" : "28")}`,
        }}
        animate={motionOn ? { rotate: -360 } : undefined}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      />
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
      <motion.div
        className="relative"
        style={{
          filter: !light
            ? `drop-shadow(0 0 6px ${color}80) drop-shadow(0 0 1.5px ${color}60)`
            : `drop-shadow(0 1px 1px ${color}55)`,
        }}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ scale: { duration: 0.5, ease: "easeOut" } }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function TarotRenderer({ entry, hovered }: { entry: IndexEntry; hovered: boolean }) {
  const { theme } = useTheme();
  const light = theme === "light";
  return (
    <MotifShell
      label={`${entry.name} — ${entry.systemName}`}
      color={entry.accentColor}
      hovered={hovered}
    >
      <ArcanaGlyph slug={entry.slug} color={entry.accentColor} size={34} light={light} />
    </MotifShell>
  );
}

function JungianRenderer({ entry, hovered }: { entry: IndexEntry; hovered: boolean }) {
  return (
    <MotifShell
      label={`${entry.name} — ${entry.systemName}`}
      color={entry.accentColor}
      hovered={hovered}
    >
      <JungianSilhouette
        slug={entry.slug as JungianArchetype["slug"]}
        color={entry.accentColor}
        size={34}
      />
    </MotifShell>
  );
}

function EnneagramRenderer({ entry, hovered }: { entry: IndexEntry; hovered: boolean }) {
  return (
    <MotifShell
      label={`${entry.name} — ${entry.systemName}`}
      color={entry.accentColor}
      hovered={hovered}
    >
      <EnneagramSilhouette
        slug={entry.slug as EnneagramArchetype["slug"]}
        color={entry.accentColor}
        size={34}
      />
    </MotifShell>
  );
}

registerTotem("mbti", (entry, hovered) => <MbtiRenderer entry={entry} hovered={hovered} />);
registerTotem("kwml", (entry, hovered) => <KwmlRenderer entry={entry} hovered={hovered} />);
registerTotem("heros-journey", (entry, hovered) => (
  <HeroJourneyRenderer entry={entry} hovered={hovered} />
));
registerTotem("tarot", (entry, hovered) => <TarotRenderer entry={entry} hovered={hovered} />);
registerTotem("jungian", (entry, hovered) => (
  <JungianRenderer entry={entry} hovered={hovered} />
));
registerTotem("enneagram", (entry, hovered) => (
  <EnneagramRenderer entry={entry} hovered={hovered} />
));
