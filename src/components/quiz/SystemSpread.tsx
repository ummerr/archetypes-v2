"use client";

import type { ClassificationResult, PerSystemMatch } from "@/lib/quiz-types";
import type { SystemId } from "@/data/resonance";
import SystemSpreadCard from "./SystemSpreadCard";

interface Props {
  classification: ClassificationResult;
}

// Combined sort weight: match quality lifted by confidence tier. The primary
// system (already chosen by the classifier) renders hero; the rest sit in a
// two-column sequence by descending weight.
const TIER_WEIGHT: Record<string, number> = {
  canonical: 1,
  strong: 0.85,
  moderate: 0.7,
  speculative: 0.55,
  contested: 0.45,
};

function weightFor(match: PerSystemMatch): number {
  const tier = match.dataConfidence ? TIER_WEIGHT[match.dataConfidence] : 0.6;
  return match.primary.matchQuality * (0.55 + 0.45 * tier);
}

export default function SystemSpread({ classification }: Props) {
  const primaryId: SystemId = classification.primarySystem;
  const primary = classification.perSystem[primaryId];
  const others = (Object.keys(classification.perSystem) as SystemId[])
    .filter((s) => s !== primaryId)
    .map((s) => classification.perSystem[s])
    .filter((m): m is PerSystemMatch => !!m)
    .sort((a, b) => weightFor(b) - weightFor(a));

  return (
    <section className="mb-20">
      <div className="mb-10">
        <p className="font-mono text-kicker tracking-display uppercase text-gold/80 mb-1">
          Six traditions
        </p>
        <h2 className="font-serif text-h2 leading-display">
          Where each vocabulary lands
        </h2>
        <p className="font-serif italic text-body text-text-secondary/80 leading-article mt-2 max-w-prose">
          The nearest figure in each tradition, with a quiet second cast beneath
          it. Fit is measured in feature space; confidence is the tier the
          grounded-resonance-map assigns.
        </p>
      </div>

      {primary ? (
        <div className="mb-14">
          <SystemSpreadCard match={primary} tone="hero" delay={0.15} />
        </div>
      ) : null}

      {/* Hair-rule between hero and the ensemble */}
      <div className="flex items-center gap-4 mb-12">
        <div className="flex-1 h-px bg-gold/25" />
        <p className="font-mono text-kicker tracking-kicker uppercase text-muted/55">
          The others
        </p>
        <div className="flex-1 h-px bg-gold/25" />
      </div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
        {others.map((m, i) => (
          <SystemSpreadCard key={m.system} match={m} tone="sibling" delay={0.1 + i * 0.08} />
        ))}
      </div>
    </section>
  );
}
