"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { PerSystemMatch } from "@/lib/quiz-types";
import {
  archetypeDisplayName,
  archetypeHref,
  systemAccent,
  confidenceLabel,
} from "@/lib/resonance";
import ConfidenceBadge from "@/components/shared/ConfidenceBadge";

interface Props {
  match: PerSystemMatch;
  tone: "hero" | "sibling";
  delay?: number;
}

// Psychometric status language per system. Pulled from the grounded-resonance
// map stance and Mission-11 synthesis notes. Shown inline so the reader sees
// the epistemic weight of each tradition at the point the system's match is
// named, not buried in a methodology page.
const PSYCHOMETRIC_STATUS: Record<string, string> = {
  kwml: "KWML is a literary framework, not a psychometric one.",
  jungian: "Pearson-Marr archetype indicator (α≈0.68, moderate reliability).",
  enneagram: "Enneagram: convergent validity moderate; no author-sanctioned test.",
  mbti: "MBTI: test-retest reliability and type stability are contested.",
  "heros-journey": "The monomyth is a narrative grammar, not a measurement.",
  tarot: "Tarot: non-psychometric; a symbolic vocabulary, read interpretively.",
};

// Short shadow-grammar line surfaced in-card. Context, not prescription.
const SHADOW_LINE: Record<string, string> = {
  bipolar: "Shadow as twin poles — one inflates, one deflates.",
  unipolar: "Shadow as one pole — the function inverted into its costume.",
  "passion-virtue": "Shadow as the passion under the virtue — the gift spent in reverse.",
  "stack-inversion": "Shadow as the inferior function — the stack turned upside down.",
  mirror: "Shadow as the mirrored card — the same figure, lit differently.",
  reversal: "Shadow as the card reversed — the light read backwards.",
};

export default function SystemSpreadCard({ match, tone, delay = 0 }: Props) {
  const reduced = useReducedMotion() ?? false;
  const accent = systemAccent(match.system);
  const primaryName = archetypeDisplayName(match.system, match.primary.slug) ?? match.primary.slug;
  const secondaryName = match.secondary
    ? archetypeDisplayName(match.system, match.secondary.slug) ?? match.secondary.slug
    : null;
  const matchPct = Math.round(match.primary.matchQuality * 100);

  const isHero = tone === "hero";

  return (
    <motion.article
      className="relative"
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.19, 1, 0.22, 1] }}
      style={{
        borderLeft: `1px solid ${accent.accent}55`,
        paddingLeft: isHero ? "1.5rem" : "1rem",
      }}
    >
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <p
          className="font-mono text-kicker tracking-display uppercase"
          style={{ color: accent.accent }}
        >
          {accent.name}
        </p>
        <p className="font-mono text-kicker tracking-kicker uppercase text-muted/60">
          Fit {matchPct}%
        </p>
      </div>

      <h3
        className={`font-serif leading-display mb-3 ${isHero ? "text-h1" : "text-h2"}`}
        style={{
          color: accent.accent,
          textShadow: isHero
            ? `0 0 26px ${accent.accent}44, 0 0 10px ${accent.accent}22`
            : `0 0 14px ${accent.accent}33`,
        }}
      >
        <Link
          href={archetypeHref(match.system, match.primary.slug)}
          className="hover:underline underline-offset-4 decoration-1"
        >
          {primaryName}
        </Link>
      </h3>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        {match.dataConfidence ? (
          <ConfidenceBadge tier={match.dataConfidence} color={accent.accent} />
        ) : (
          <span className="font-mono text-kicker tracking-kicker uppercase text-muted/55">
            No grounded-map tier
          </span>
        )}
        {secondaryName && match.secondary ? (
          <span className="font-serif italic text-body-sm text-text-secondary/70">
            With a second cast toward{" "}
            <Link
              href={archetypeHref(match.system, match.secondary.slug)}
              className="text-text-secondary/90 hover:text-gold transition-colors"
            >
              {secondaryName}
            </Link>
            .
          </span>
        ) : null}
      </div>

      <p className="font-serif italic text-body text-text-secondary/85 leading-article mb-3 max-w-prose">
        {SHADOW_LINE[match.shadowGrammar] ?? ""}
      </p>

      <p className="font-mono text-label tracking-label uppercase text-muted/55 max-w-prose">
        {PSYCHOMETRIC_STATUS[match.system] ?? ""}
        {match.dataConfidence ? (
          <span className="ml-2 text-muted/70">
            · {confidenceLabel(match.dataConfidence).toLowerCase()}
          </span>
        ) : null}
      </p>
    </motion.article>
  );
}
