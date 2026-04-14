import type { Metadata } from "next";
import { CLUSTERS, OPEN_QUESTIONS, CONFIDENCE_TIERS, ATLAS_AXES, type ConfidenceTier, type SystemId } from "@/data/resonance";
import { archetypeDisplayName, archetypeHref, systemAccent } from "@/lib/resonance";
import { SYSTEMS } from "@/data/systems";
import { buildPageMetadata } from "@/lib/site";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";
import SectionHeading from "@/components/shared/SectionHeading";
import ConfidenceBadge from "@/components/shared/ConfidenceBadge";
import type {
  ConstellationLayout,
  ConstellationNodeMeta,
} from "@/components/viz/ResonanceConstellation";
import AtlasInteractive from "@/components/viz/AtlasInteractive";
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
  const lensSystems = SYSTEMS.map((s) => ({
    id: s.id as SystemId,
    name: s.name,
    accent: s.accent,
  }));
  const lensClusters = CLUSTERS.map((c) => ({
    id: c.id,
    theme: c.theme,
    shortTheme: c.theme.split("—")[0].trim().split(" - ")[0].trim(),
  }));

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-20">
      <SectionHeading kicker="Atlas" as="h1">
        The Cross-System Resonance Map
      </SectionHeading>
      <HermeneuticCaveat variant="banner" className="mb-10" />

      <section className="mb-16">
        <div className="mb-4 flex items-baseline justify-between flex-wrap gap-2">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold/80">
            Four Lenses · One Atlas
          </p>
          <p className="font-serif italic text-xs text-text-secondary/70">
            {layout.nodes.length} archetypes · {layout.edges.length} resonances · six traditions
          </p>
        </div>
        <AtlasInteractive
          layout={layout}
          systems={lensSystems}
          clusters={lensClusters}
          nodeMeta={nodeMeta}
        />
        <p className="mt-4 font-serif text-sm italic text-text-secondary/75 max-w-3xl">
          Switch lenses to see the same 87 archetypes regroup along a different structural claim —
          developmental arc, affective seat, or relational stance. Each cluster carries its own totem.
          Hover a tile to isolate its members in the map above; click to step into the cluster.
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

void archetypeDisplayName;
void archetypeHref;
void systemAccent;
