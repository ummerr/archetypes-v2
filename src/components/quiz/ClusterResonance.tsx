"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ClusterMatch } from "@/lib/quiz-types";
import { CLUSTER_AXES } from "@/data/atlas-lens-axes";

interface Props {
  clusters: ClusterMatch[];
  take?: number;
}

// The 14-cluster color set used across Mirror and the constellation scaffold.
// Pulled into this file directly rather than imported from MirrorClient to
// avoid crossing a "use client" boundary inside the Reading; these hues are
// canonical site tokens in practice, not per-component state.
const CLUSTER_COLOR: Record<string, string> = {
  sovereign: "#E0C065",
  warrior: "#D6614A",
  "sage-magician": "#9B87C4",
  lover: "#E08597",
  innocent: "#EADBA8",
  explorer: "#5DB8A0",
  rebel: "#B64558",
  creator: "#E89B4F",
  jester: "#F0C555",
  caregiver: "#8AB876",
  everyman: "#C3A07D",
  "death-rebirth": "#7E5BA0",
  teacher: "#7FA2CC",
  "liminal-territory": "#ADA0C6",
  antagonists: "#8a4a5a",
  shapeshifter: "#9a7ac9",
  "threshold-guardian": "#7a5a4a",
  herald: "#c9b884",
  integration: "#e6d47a",
  "boy-hero": "#e6944a",
};

function colorFor(id: string): string {
  return CLUSTER_COLOR[id] ?? CLUSTER_AXES[id]?.motifColor ?? "#c6a355";
}

// Strip the theme of its subtitle after em-dash or hyphen — the clean phrase
// reads as an editorial tag, not a long title.
function shortTheme(theme: string): string {
  return theme.split(/—|\s+-\s+/)[0].trim();
}

export default function ClusterResonance({ clusters, take = 5 }: Props) {
  const reduced = useReducedMotion() ?? false;
  const top = clusters.slice(0, take);
  if (top.length === 0) return null;

  const maxStrength = Math.max(...top.map((c) => c.strength), 0.001);

  return (
    <section className="mb-20">
      <div className="mb-8">
        <p className="font-mono text-kicker tracking-display uppercase text-gold/80 mb-1">
          Cluster resonance
        </p>
        <h2 className="font-serif text-h2 leading-display">The rooms you resonate with</h2>
        <p className="font-serif italic text-body text-text-secondary/80 leading-article mt-2 max-w-prose">
          Of the twenty-one thematic rooms charted in the atlas, these are the
          ones whose weather most resembles your own — graded glow, not rank.
        </p>
      </div>

      <ol className="space-y-5">
        {top.map((c, i) => {
          const accent = colorFor(c.cluster.id);
          const strengthPct = (c.strength / maxStrength) * 100;
          const roman = ["I", "II", "III", "IV", "V", "VI", "VII"][i] ?? String(i + 1);
          return (
            <motion.li
              key={c.cluster.id}
              initial={reduced ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.09, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-mono text-kicker tracking-kicker uppercase text-muted/50 w-6 text-right">
                  {roman}
                </span>
                <h3
                  className="font-serif text-h3 leading-snug"
                  style={{ color: accent, textShadow: `0 0 12px ${accent}44` }}
                >
                  <Link
                    href={`/atlas?cluster=${c.cluster.id}`}
                    className="hover:underline underline-offset-4 decoration-1"
                  >
                    {shortTheme(c.cluster.theme)}
                  </Link>
                </h3>
                <span className="ml-auto font-mono text-kicker tracking-kicker uppercase text-muted/55">
                  {Math.round(c.strength * 100)}%
                </span>
              </div>

              <div className="ml-10 mb-2 relative h-[8px] overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-surface-light/40" />
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${accent}cc, ${accent}55)`,
                    boxShadow: `0 0 14px ${accent}55`,
                  }}
                  initial={reduced ? false : { width: 0 }}
                  animate={{ width: `${strengthPct}%` }}
                  transition={{ duration: 0.9, delay: 0.25 + i * 0.09, ease: [0.19, 1, 0.22, 1] }}
                />
              </div>

              <p className="ml-10 font-serif italic text-body-sm text-text-secondary/75 leading-article max-w-prose">
                {c.cluster.description}
              </p>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
