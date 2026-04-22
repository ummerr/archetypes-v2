"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { AxisSummary } from "@/lib/quiz-types";

interface Props {
  summary: AxisSummary;
}

// Editorial phrasing for each axis dominant. Held to the site's voice:
// no certainty language, no "you are". The axis is presented as weather or
// ground, not a label on the reader.
const STAGE_LINE: Record<string, string> = {
  "pre-initiation": "The ground before the first threshold — the world still unasked.",
  striving: "The ground of striving — the work that has not yet declared itself.",
  liminal: "The ground without walls — after the striving, before the return.",
  integrating: "The ground of slow integration — the work of carrying it home.",
  integrated: "The ground of return — the cast you bring back from the far country.",
};

const AFFECT_LINE: Record<string, string> = {
  anger: "Anger running close to the skin — the pole that moves by refusing.",
  shame: "Shame threaded through the chest — the pole that moves by longing to be seen.",
  fear: "Fear held in the head — the pole that moves by mapping first.",
  desire: "Desire leading the step — the pole that moves toward what it loves.",
  mixed: "Weather that refuses one name — the pole keeps shifting.",
};

const NARRATIVE_LINE: Record<string, string> = {
  departure: "The room where leaving begins.",
  initiation: "The room of trial — where the shape is tested.",
  liminal: "The room with no clear doors.",
  return: "The room after the return, where what was found gets shared.",
};

const STANCE_LINE: Record<string, string> = {
  toward: "A stance that moves toward — making contact, offering weight.",
  against: "A stance that meets things squarely — pressing into what resists.",
  away: "A stance that steps back — watching, mapping, keeping room to think.",
  balanced: "A stance that refuses to settle into one posture.",
};

function Signed({ value }: { value: number }) {
  // Render a -1..+1 value as a small horizontal hairline with a dot at
  // position. Soft-rendered, editorial.
  const x = ((value + 1) / 2) * 100;
  return (
    <div className="relative h-[14px] w-full" aria-hidden>
      <div className="absolute left-0 right-0 top-1/2 h-px bg-surface-light/60" />
      <div
        className="absolute top-1/2 -translate-y-1/2 h-[7px] w-[7px] rounded-full bg-gold"
        style={{ left: `calc(${x}% - 3.5px)`, boxShadow: "0 0 10px rgba(212,175,55,0.55)" }}
      />
      {/* Midline tick */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-px bg-gold/30" />
    </div>
  );
}

export default function AxisSummarySection({ summary }: Props) {
  const reduced = useReducedMotion() ?? false;

  const rows: Array<{ kicker: string; dominant: string; line: string; confidence?: number }> = [
    {
      kicker: "Stage",
      dominant: summary.stage.dominant.replace("-", " "),
      line: STAGE_LINE[summary.stage.dominant] ?? "",
      confidence: summary.stage.confidence,
    },
    {
      kicker: "Affect",
      dominant: summary.affect.dominant,
      line: AFFECT_LINE[summary.affect.dominant] ?? "",
      confidence: summary.affect.confidence,
    },
    {
      kicker: "Narrative",
      dominant: summary.narrative.dominant,
      line: NARRATIVE_LINE[summary.narrative.dominant] ?? "",
      confidence: summary.narrative.confidence,
    },
    {
      kicker: "Stance",
      dominant: summary.stance.dominant,
      line: STANCE_LINE[summary.stance.dominant] ?? "",
      confidence: summary.stance.confidence,
    },
  ];

  return (
    <section className="mb-16">
      <div className="mb-8">
        <p className="font-mono text-kicker tracking-display uppercase text-gold/80 mb-1">
          Axes
        </p>
        <h2 className="font-serif text-h2 leading-display">The weather you carry</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
        {rows.map((row, i) => (
          <motion.div
            key={row.kicker}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="font-mono text-kicker tracking-kicker uppercase text-muted/70 mb-2">
              {row.kicker}
              {typeof row.confidence === "number" && row.confidence > 0 ? (
                <span className="text-muted/40 ml-2 normal-case tracking-label">
                  · confidence {Math.round(row.confidence * 100)}%
                </span>
              ) : null}
            </p>
            <p className="font-serif text-h3 italic text-gold/90 leading-snug mb-3 capitalize">
              {row.dominant}
            </p>
            <p className="font-serif text-body text-text-secondary/85 leading-article">
              {row.line}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-x-10 gap-y-8">
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-baseline justify-between mb-3">
            <p className="font-mono text-kicker tracking-kicker uppercase text-muted/70">
              Stability &rarr; Risk
            </p>
            <p className="font-serif italic text-body text-text-secondary/75">
              {summary.stability_risk >= 0.2 ? "risk-leaning" : summary.stability_risk <= -0.2 ? "stability-leaning" : "balanced"}
            </p>
          </div>
          <Signed value={summary.stability_risk} />
        </motion.div>
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-baseline justify-between mb-3">
            <p className="font-mono text-kicker tracking-kicker uppercase text-muted/70">
              Belonging &rarr; Independence
            </p>
            <p className="font-serif italic text-body text-text-secondary/75">
              {summary.belonging_independence >= 0.2 ? "independence-leaning" : summary.belonging_independence <= -0.2 ? "belonging-leaning" : "balanced"}
            </p>
          </div>
          <Signed value={summary.belonging_independence} />
        </motion.div>
      </div>
    </section>
  );
}
