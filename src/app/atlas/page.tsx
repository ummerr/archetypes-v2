import type { Metadata } from "next";
import { CLUSTERS, CONFIDENCE_TIERS, type ConfidenceTier, type SystemId } from "@/data/resonance";
import {
  STAGE_LABELS,
  AFFECT_LABELS,
  AFFECT_ACCENT,
  STANCE_LABELS,
  STAGES,
  AFFECTS,
  STANCES,
} from "@/data/atlas-lens-axes";
import { archetypeDisplayName, archetypeHref, systemAccent } from "@/lib/resonance";
import { SYSTEMS } from "@/data/systems";
import { buildPageMetadata } from "@/lib/site";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";
import SectionHeading from "@/components/shared/SectionHeading";
import ConfidenceBadge from "@/components/shared/ConfidenceBadge";
import Link from "next/link";
import { getExemplarIndex } from "@/lib/exemplars";
import type {
  ConstellationLayout,
  ConstellationNodeMeta,
} from "@/components/viz/ResonanceConstellation";
import AtlasInteractive from "@/components/viz/AtlasInteractive";
import TwoByTwo from "@/components/viz/TwoByTwo";
import constellationLayout from "@/data/constellation-layout.json";

export const metadata: Metadata = buildPageMetadata({
  title: "Atlas — Cross-System Resonance Map",
  description:
    "A hermeneutic atlas of six archetypal traditions. Where authors connect them we cite the source; where we infer we say so; where practitioners disagree we show both sides.",
  path: "/atlas",
});

const TIER_ORDER: ConfidenceTier[] = ["canonical", "strong", "moderate", "speculative", "contested"];

const LENS_LEGEND: { label: string; kicker: string; note: string }[] = [
  {
    label: "Developmental Arc",
    kicker: "Stage",
    note: "Pre-initiation to integration. Archetypes as a maturation flow.",
  },
  {
    label: "Affect Wheel",
    kicker: "Feeling",
    note: "Gut, heart, head, eros — the four seats of felt motivation.",
  },
  {
    label: "Relational Triad",
    kicker: "Stance",
    note: "Horney's toward / against / away postures toward the world.",
  },
  {
    label: "Resonance Web",
    kicker: "Network",
    note: "The raw cross-tradition constellation, every tie at once.",
  },
];

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
  const exemplarCount = getExemplarIndex().length;

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-10 py-12 md:py-20">
      <SectionHeading kicker="Atlas" as="h1">
        The Cross-System Resonance Map
      </SectionHeading>
      <HermeneuticCaveat variant="banner" className="mb-10" />

      <section className="mb-16">
        <div className="mb-4 flex items-baseline justify-between flex-wrap gap-2">
          <p className="font-mono text-label tracking-kicker uppercase text-gold/80">
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

      <section className="mb-12 md:mb-16">
        <SectionHeading kicker="Legend">How to read the atlas</SectionHeading>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="rounded-sm border border-surface-light/40 p-5">
            <p className="font-mono text-label tracking-kicker uppercase text-gold/80 mb-3">
              The four lenses
            </p>
            <ul className="space-y-3">
              {LENS_LEGEND.map((l) => (
                <li key={l.label}>
                  <p className="font-serif text-body text-text-secondary/90">
                    <span className="text-gold/90">{l.label}</span>
                    <span className="font-mono text-label tracking-kicker uppercase text-text-secondary/60 ml-2">
                      {l.kicker}
                    </span>
                  </p>
                  <p className="font-serif text-xs italic text-text-secondary/70 leading-relaxed">
                    {l.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-sm border border-surface-light/40 p-5">
            <p className="font-mono text-label tracking-kicker uppercase text-gold/80 mb-3">
              Vocabulary
            </p>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-xs">
              <div>
                <p className="font-mono text-kicker tracking-kicker uppercase text-text-secondary/60 mb-2">
                  Stage
                </p>
                <ul className="space-y-1 font-serif text-text-secondary/85">
                  {STAGES.map((s) => (
                    <li key={s}>{STAGE_LABELS[s]}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-kicker tracking-kicker uppercase text-text-secondary/60 mb-2">
                  Affect
                </p>
                <ul className="space-y-1 font-serif text-text-secondary/85">
                  {AFFECTS.map((a) => (
                    <li key={a} className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ background: AFFECT_ACCENT[a] }}
                      />
                      {AFFECT_LABELS[a]}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-kicker tracking-kicker uppercase text-text-secondary/60 mb-2">
                  Stance
                </p>
                <ul className="space-y-1 font-serif text-text-secondary/85">
                  {STANCES.map((s) => (
                    <li key={s}>{STANCE_LABELS[s]}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-surface-light/40 p-5">
            <p className="font-mono text-label tracking-kicker uppercase text-gold/80 mb-3">
              Confidence tiers
            </p>
            <ul className="space-y-2">
              {TIER_ORDER.map((t) => (
                <li key={t} className="flex items-baseline gap-3">
                  <ConfidenceBadge tier={t} />
                  <span className="font-serif text-xs italic text-text-secondary/75 leading-relaxed">
                    {CONFIDENCE_TIERS[t]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-sm border border-surface-light/40 p-5">
            <p className="font-mono text-label tracking-kicker uppercase text-gold/80 mb-3">
              Cluster totems
            </p>
            <p className="font-serif text-body-sm italic text-text-secondary/80 leading-relaxed">
              Each cluster carries a small SVG motif — shape is unique to the cluster, color
              derives from its primary affect. Totems appear on cluster tiles and inside the map,
              so a shape you learn here stays consistent wherever that cluster shows up.
            </p>
          </div>

          <Link
            href="/atlas/exemplars"
            className="rounded-sm border border-gold/40 p-5 hover:border-gold/80 transition-colors group md:col-span-2"
          >
            <div className="flex items-baseline justify-between gap-2 mb-3">
              <p className="font-mono text-label tracking-kicker uppercase text-gold/90 group-hover:text-gold">
                The Exemplars →
              </p>
              <p className="font-mono text-kicker tracking-label uppercase text-text-secondary/60">
                {exemplarCount} across six traditions
              </p>
            </div>
            <p className="font-serif text-body-sm italic text-text-secondary/80 leading-relaxed">
              The exemplars the six traditions read. A cross-system view of who gets tagged where
              — and what surviving translation looks like in practice. Sorted by the number of
              traditions that claim them, with the most-read exemplars kept on top.
            </p>
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <SectionHeading kicker="Structural Compass">Two axes, every archetype</SectionHeading>
        <TwoByTwo />
        <p className="mt-4 font-serif text-sm italic text-text-secondary/70 max-w-2xl">
          Two of Mission 8&apos;s numeric feature dimensions - the belonging / independence axis
          and the stability / risk axis - plotted for every archetype in the atlas. Clusters in the
          same quadrant tend to share a posture toward world and risk.
        </p>
      </section>

      <section className="mb-16">
        <p className="font-mono text-label tracking-kicker uppercase text-gold/80 mb-3">
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

    </div>
  );
}

void archetypeDisplayName;
void archetypeHref;
void systemAccent;
