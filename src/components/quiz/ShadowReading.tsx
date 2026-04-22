"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ClassificationResult, PerSystemMatch } from "@/lib/quiz-types";
import type { SystemId } from "@/data/resonance";
import { archetypeDisplayName, systemAccent } from "@/lib/resonance";

interface Props {
  classification: ClassificationResult;
}

// Per-system shadow phrasing. Keyed by shadow grammar, with the per-system
// idiom substituted in. The line is *about the system's grammar*, not a
// verdict on the reader — "in this lens, your figure's shadow is the foo".
function shadowLineFor(match: PerSystemMatch, name: string): string {
  const g = match.shadowGrammar;
  switch (g) {
    case "bipolar":
      return `In the KWML grammar, ${name}'s shadow doubles — one pole inflates into tyranny, the other deflates into weakness. The work is finding the middle that refuses both.`;
    case "unipolar":
      return `In the Pearson-Marr grammar, ${name}'s shadow is the figure itself in costume — the gift spent against itself until it names its own undoing.`;
    case "passion-virtue":
      return `In the Enneagram, ${name}'s shadow is the passion under the virtue — the same energy that gives shape to the gift, running without ground.`;
    case "stack-inversion":
      return `In MBTI, ${name}'s shadow is the inferior function — the stack turned upside down, the quiet back room when the dominant falters.`;
    case "mirror":
      return `In the monomyth, ${name}'s shadow is the mirrored figure — the same geometry lit from the opposite side, a reminder that the threshold cuts both ways.`;
    case "reversal":
      return `In the tarot grammar, ${name}'s shadow is the card reversed — the same image read backwards, the light returning through the wrong door.`;
  }
}

const SYSTEM_ORDER: SystemId[] = [
  "kwml",
  "jungian",
  "enneagram",
  "mbti",
  "heros-journey",
  "tarot",
];

export default function ShadowReading({ classification }: Props) {
  const reduced = useReducedMotion() ?? false;

  const rows = SYSTEM_ORDER.map((sys) => {
    const match = classification.perSystem[sys];
    if (!match) return null;
    const name =
      archetypeDisplayName(sys, match.primary.slug) ?? match.primary.slug;
    return {
      system: sys,
      accent: systemAccent(sys).accent,
      systemName: systemAccent(sys).name,
      figureName: name,
      line: shadowLineFor(match, name),
      isPrimary: classification.primarySystem === sys,
    };
  }).filter((r): r is NonNullable<typeof r> => r !== null);

  return (
    <section className="mb-20">
      <div className="mb-10">
        <p className="font-mono text-kicker tracking-display uppercase text-gold/80 mb-1">
          Shadow
        </p>
        <h2 className="font-serif text-h2 leading-display">
          How each tradition grammars the shadow
        </h2>
        <p className="font-serif italic text-body text-text-secondary/80 leading-article mt-2 max-w-prose">
          Six different ways of saying what goes missing when the figure runs
          without its ground. Not a diagnosis — a vocabulary.
        </p>
      </div>

      <ol className="space-y-7">
        {rows.map((r, i) => (
          <motion.li
            key={r.system}
            className="relative"
            style={{
              borderLeft: `1px solid ${r.accent}${r.isPrimary ? "88" : "40"}`,
              paddingLeft: "1.25rem",
            }}
            initial={reduced ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1 + i * 0.08,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            <p
              className="font-mono text-kicker tracking-display uppercase mb-1"
              style={{ color: r.accent }}
            >
              {r.systemName}
              {r.isPrimary ? (
                <span className="ml-2 text-muted/55 normal-case tracking-kicker">
                  · primary
                </span>
              ) : null}
            </p>
            <p className="font-serif italic text-body-lg text-text-primary/90 leading-article max-w-prose">
              {r.line}
            </p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
