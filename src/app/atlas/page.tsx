import type { Metadata } from "next";
import Link from "next/link";
import { CLUSTERS, OPEN_QUESTIONS, CONFIDENCE_TIERS, ATLAS_AXES, type ConfidenceTier, type SystemId } from "@/data/resonance";
import { archetypeDisplayName, archetypeHref, systemAccent } from "@/lib/resonance";
import { SYSTEMS } from "@/data/systems";
import { buildPageMetadata } from "@/lib/site";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";
import SectionHeading from "@/components/shared/SectionHeading";
import ConfidenceBadge from "@/components/shared/ConfidenceBadge";
import ResonanceConstellation, {
  type ConstellationLayout,
  type ConstellationNodeMeta,
} from "@/components/viz/ResonanceConstellation";
import constellationLayout from "@/data/constellation-layout.json";

export const metadata: Metadata = buildPageMetadata({
  title: "The Atlas — Cross-System Resonance Map",
  description:
    "A hermeneutic atlas of six archetypal traditions. Where authors connect them we cite the source; where we infer we say so; where practitioners disagree we show both sides.",
  path: "/atlas",
});

const TIER_ORDER: ConfidenceTier[] = ["canonical", "strong", "moderate", "speculative", "contested"];

export default function AtlasPage() {
  const distribution: Record<ConfidenceTier, number> = {
    canonical: 0,
    strong: 0,
    moderate: 0,
    speculative: 0,
    contested: 0,
  };
  for (const c of CLUSTERS) for (const a of c.archetypes) distribution[a.confidence]++;
  const total = Object.values(distribution).reduce((s, n) => s + n, 0);

  const layout = constellationLayout as unknown as ConstellationLayout;
  const clusterThemeById: Record<string, string> = Object.fromEntries(
    CLUSTERS.map((c) => [c.id, c.theme]),
  );
  const nodeMeta: Record<string, ConstellationNodeMeta> = {};
  for (const n of layout.nodes) {
    nodeMeta[n.id] = {
      displayName: archetypeDisplayName(n.system as SystemId, n.slug) ?? n.slug,
      clusterNames: n.clusterIds
        .map((cid) => clusterThemeById[cid]?.split("—")[0].trim().split(" - ")[0].trim())
        .filter(Boolean) as string[],
    };
  }
  const constellationSystems = SYSTEMS.map((s) => ({
    id: s.id as SystemId,
    name: s.name,
    accent: s.accent,
  }));
  const constellationClusters = CLUSTERS.map((c) => ({ id: c.id, theme: c.theme }));

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-20">
      <SectionHeading kicker="Atlas" as="h1">
        The Cross-System Resonance Map
      </SectionHeading>
      <HermeneuticCaveat variant="banner" className="mb-10" />

      <section className="mb-16">
        <div className="mb-4 flex items-baseline justify-between flex-wrap gap-2">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold/80">
            The Constellation
          </p>
          <p className="font-serif italic text-xs text-text-secondary/70">
            {layout.nodes.length} archetypes · {layout.edges.length} resonances · six traditions
          </p>
        </div>
        <ResonanceConstellation
          layout={layout}
          systems={constellationSystems}
          clusters={constellationClusters}
          nodeMeta={nodeMeta}
        />
        <p className="mt-4 font-serif text-sm italic text-text-secondary/75 max-w-2xl">
          Each point is an archetype, colored by its tradition and sized by how densely it converges with others.
          Lines are intra-cluster resonances, weighted by the confidence we give the mapping. Hover a node to isolate
          its neighborhood; hover a cluster label to see its constellation; tap to open the archetype.
        </p>
      </section>

      <section className="mb-16">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-3">
          Confidence Distribution
        </p>
        <div className="flex flex-wrap gap-3">
          {TIER_ORDER.map((t) => (
            <div key={t} className="flex items-center gap-2">
              <ConfidenceBadge tier={t} />
              <span className="font-mono text-xs text-text-secondary/80">
                {distribution[t]} / {total}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 font-serif text-sm italic text-text-secondary/70 max-w-2xl">
          {CONFIDENCE_TIERS.canonical} — {CONFIDENCE_TIERS.strong} — {CONFIDENCE_TIERS.moderate} —{" "}
          {CONFIDENCE_TIERS.speculative} — {CONFIDENCE_TIERS.contested}
        </p>
      </section>

      <section className="mb-16">
        <SectionHeading kicker="21 Clusters">The thematic clusters</SectionHeading>
        <div className="grid md:grid-cols-2 gap-5">
          {CLUSTERS.map((cluster) => {
            const counts: Record<ConfidenceTier, number> = {
              canonical: 0,
              strong: 0,
              moderate: 0,
              speculative: 0,
              contested: 0,
            };
            for (const a of cluster.archetypes) counts[a.confidence]++;
            return (
              <Link
                key={cluster.id}
                href={`/atlas/cluster/${cluster.id}`}
                className="block rounded-sm border border-surface-light/40 p-5 hover:border-gold/40 transition-colors"
              >
                <h3 className="font-serif text-lg md:text-xl font-medium mb-2">{cluster.theme}</h3>
                <p className="font-serif text-sm italic text-text-secondary/80 mb-3 line-clamp-3">
                  {cluster.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {TIER_ORDER.filter((t) => counts[t] > 0).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[9px] tracking-[0.2em] uppercase px-1.5 py-0.5 border border-surface-light/40 rounded-sm text-text-secondary/70"
                    >
                      {t} · {counts[t]}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mb-16">
        <SectionHeading kicker="Structural Axes">Three axes of the atlas</SectionHeading>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ATLAS_AXES.developmentalStage,
            ATLAS_AXES.affectCenter,
            ATLAS_AXES.relationalStance,
          ].map((axis) => (
            <div key={axis.label} className="rounded-sm border border-surface-light/40 p-4">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-2">
                {axis.label}
              </p>
              <p className="font-serif text-sm italic text-text-secondary/85">{axis.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <SectionHeading kicker="Open Questions">What the map does not resolve</SectionHeading>
        <ul className="space-y-3 max-w-3xl">
          {OPEN_QUESTIONS.map((q, i) => (
            <li key={i} className="font-serif text-[15px] italic text-text-secondary/85 leading-relaxed">
              — {q}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// Suppress unused import lint for helpers that may be used by future sections.
void archetypeDisplayName;
void archetypeHref;
void systemAccent;
