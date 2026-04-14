import { CLUSTERS, CONFIDENCE_TIERS } from "@/data/resonance";
import type { ConfidenceTier } from "@/data/resonance";

const TIER_ORDER: ConfidenceTier[] = [
  "canonical",
  "strong",
  "moderate",
  "speculative",
  "contested",
];

const TIER_TINT: Record<ConfidenceTier, string> = {
  canonical: "#D4AF37",
  strong: "#B8923A",
  moderate: "#8C7A4A",
  speculative: "#A78155",
  contested: "#F59E0B",
};

function computeCounts(): Record<ConfidenceTier, number> {
  const counts: Record<ConfidenceTier, number> = {
    canonical: 0,
    strong: 0,
    moderate: 0,
    speculative: 0,
    contested: 0,
  };
  for (const cluster of CLUSTERS) {
    for (const entry of cluster.archetypes) {
      counts[entry.confidence] += 1;
    }
  }
  return counts;
}

export default function ConfidenceDistribution() {
  const counts = computeCounts();
  const total = TIER_ORDER.reduce((sum, t) => sum + counts[t], 0);
  return (
    <figure
      role="img"
      aria-label={`Distribution of ${total} grounded mappings across five confidence tiers`}
      className="my-8"
    >
      <div className="flex items-baseline justify-between mb-3">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold/80">
          {total} grounded mappings
        </p>
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-secondary/50">
          across {CLUSTERS.length} clusters
        </p>
      </div>
      <div
        className="flex w-full h-4 overflow-hidden rounded-sm border border-text-secondary/20"
        aria-hidden="true"
      >
        {TIER_ORDER.map((t) => {
          const pct = total === 0 ? 0 : (counts[t] / total) * 100;
          if (pct === 0) return null;
          return (
            <div
              key={t}
              style={{ width: `${pct}%`, background: TIER_TINT[t], opacity: 0.85 }}
              title={`${t}: ${counts[t]} (${pct.toFixed(1)}%)`}
            />
          );
        })}
      </div>
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
        {TIER_ORDER.map((t) => {
          const pct = total === 0 ? 0 : (counts[t] / total) * 100;
          return (
            <li key={t} className="flex items-baseline gap-3">
              <span
                className="inline-block w-2 h-2 rounded-sm shrink-0"
                style={{ background: TIER_TINT[t] }}
                aria-hidden="true"
              />
              <span
                className="font-mono text-[10px] tracking-[0.25em] uppercase shrink-0"
                style={{ color: TIER_TINT[t] }}
              >
                {t}
              </span>
              <span className="font-serif text-[14px] text-text-primary tabular-nums shrink-0">
                {counts[t]}
              </span>
              <span className="font-mono text-[9px] tracking-[0.15em] text-text-secondary/45 tabular-nums shrink-0">
                {pct.toFixed(0)}%
              </span>
              <span className="font-serif italic text-[13px] text-text-secondary/70 truncate">
                {CONFIDENCE_TIERS[t]}
              </span>
            </li>
          );
        })}
      </ul>
      <figcaption className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-secondary/50 mt-4">
        Fig. 3 - Live distribution computed from grounded-resonance-map.json.
      </figcaption>
    </figure>
  );
}
