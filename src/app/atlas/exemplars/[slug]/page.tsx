import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FIGURES } from "@/data/exemplars/figures";
import {
  getFigureIndex,
  getFigureRecord,
  resolveFigureClusters,
  type FigureClusterResolution,
  type FigureRecord,
} from "@/lib/exemplars";
import { archetypeDisplayName, archetypeHref, systemAccent } from "@/lib/resonance";
import { buildPageMetadata } from "@/lib/site";
import SectionHeading from "@/components/shared/SectionHeading";
import ClusterTotem from "@/components/viz/ClusterTotem";
import {
  CLUSTER_AXES,
  STAGES,
  AFFECTS,
  STANCES,
  STAGE_LABELS,
  AFFECT_LABELS,
  AFFECT_ACCENT,
  STANCE_LABELS,
  type Stage,
  type Affect,
  type Stance,
} from "@/data/atlas-lens-axes";

export function generateStaticParams() {
  return getFigureIndex().map((r) => ({ slug: r.figure.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const record = getFigureRecord(slug);
  if (!record) return {};
  return buildPageMetadata({
    title: record.figure.displayName,
    description:
      record.figure.editorialNote ??
      `How ${record.appearances.length} tradition${
        record.appearances.length === 1 ? "" : "s"
      } read ${record.figure.displayName}.`,
    path: `/atlas/exemplars/${record.figure.slug}`,
  });
}

export default async function FigureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = getFigureRecord(slug);
  if (!record) {
    const bare = FIGURES.find((f) => f.slug === slug);
    if (!bare) notFound();
    return (
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-20">
        <Link
          href="/atlas/exemplars"
          className="font-mono text-label tracking-kicker uppercase text-muted/80 hover:text-gold"
        >
          ← Figures
        </Link>
        <SectionHeading kicker="Figure" as="h1">
          {bare.displayName}
        </SectionHeading>
        <p className="italic text-text-secondary/80 mt-4">
          No tradition in this atlas currently reads this figure. The registry keeps the slot open
          for future canonicalization.
        </p>
      </div>
    );
  }

  const clusters = resolveFigureClusters(record);
  const dominantCluster = pickDominantCluster(clusters);
  const stages = collectAxis(clusters, "stage");
  const affects = collectAxis(clusters, "affect");
  const stancesSet = collectAxis(clusters, "stance");
  const holdsTension = stancesSet.size > 1 || affects.size > 1;
  const neighbors = computeNeighbors(record, clusters);

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-20">
      <Link
        href="/atlas/exemplars"
        className="font-mono text-label tracking-kicker uppercase text-muted/80 hover:text-gold"
      >
        ← Figures
      </Link>

      <div className="mt-4 flex items-start gap-5 flex-wrap">
        {dominantCluster && (
          <div
            className="shrink-0 mt-1"
            aria-hidden
            style={{ width: 72, height: 72 }}
          >
            <ClusterTotem id={dominantCluster.clusterId} size="md" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <SectionHeading kicker="Figure" as="h1">
            {record.figure.displayName}
          </SectionHeading>
          <p className="font-mono text-label tracking-kicker uppercase text-text-secondary/60 mt-2">
            {record.figure.kind} · read by {record.appearances.length} of 6 traditions
          </p>
        </div>
      </div>

      {record.figure.editorialNote && (
        <p className="font-serif italic text-base text-text-secondary/85 max-w-2xl mt-6 mb-10">
          {record.figure.editorialNote}
        </p>
      )}

      <section className="mt-10 mb-12">
        <p className="font-mono text-label tracking-kicker uppercase text-gold/80 mb-4">
          How each tradition reads the figure
        </p>
        <ul className="space-y-3">
          {record.appearances.map((app) => {
            const { accent, name: systemName } = systemAccent(app.system);
            const archetypeName =
              archetypeDisplayName(app.system, app.archetypeSlug) ?? app.archetypeSlug;
            return (
              <li
                key={`${app.system}-${app.archetypeSlug}`}
                className="rounded-sm border p-4"
                style={{ borderColor: `${accent}35` }}
              >
                <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                  <div>
                    <p
                      className="font-mono text-label tracking-kicker uppercase"
                      style={{ color: accent }}
                    >
                      {systemName}
                    </p>
                    <Link
                      href={archetypeHref(app.system, app.archetypeSlug)}
                      className="font-serif text-body-lg font-medium hover:underline underline-offset-4 decoration-1"
                      style={{ color: accent }}
                    >
                      {archetypeName}
                    </Link>
                  </div>
                  {app.source && (
                    <p className="font-mono text-kicker tracking-label uppercase text-text-secondary/55">
                      {app.source}
                    </p>
                  )}
                </div>
                <p className="text-body-sm text-text-primary/88 leading-relaxed italic">{app.note}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {clusters.length > 0 && (
        <section className="mb-12">
          <p className="font-mono text-label tracking-kicker uppercase text-gold/80 mb-4">
            Where the figure sits on the lenses
          </p>
          <div className="rounded-sm border border-surface-light/40 p-5 space-y-4">
            <AxisRow
              label="Stage"
              values={STAGES}
              active={stages}
              labels={STAGE_LABELS}
            />
            <AxisRow
              label="Affect"
              values={AFFECTS}
              active={affects}
              labels={AFFECT_LABELS}
              colorOf={(v) => AFFECT_ACCENT[v as Affect]}
            />
            <AxisRow
              label="Stance"
              values={STANCES}
              active={stancesSet}
              labels={STANCE_LABELS}
            />
          </div>
        </section>
      )}

      {clusters.length > 0 && (
        <section className="mb-12">
          <p className="font-mono text-label tracking-kicker uppercase text-gold/80 mb-4">
            Cluster coalescence
          </p>
          <p className="font-serif italic text-body-sm text-text-secondary/75 mb-5 max-w-prose">
            The archetypal tags above resolve into {clusters.length} cluster
            {clusters.length === 1 ? "" : "s"}. Each cluster reads the figure in its own vocabulary;
            where more than one cluster surfaces, the figure itself is holding a structural tension.
          </p>
          <ul className="flex flex-wrap gap-2 mb-6">
            {clusters.map((c) => {
              const ax = CLUSTER_AXES[c.clusterId];
              return (
                <li key={c.clusterId}>
                  <Link
                    href={`/atlas/cluster/${c.clusterId}`}
                    className="inline-block rounded-sm border border-gold/30 px-3 py-2 hover:border-gold"
                  >
                    <span className="font-serif text-body-sm block">{c.clusterTheme}</span>
                    {ax && (
                      <span className="font-mono text-kicker tracking-label uppercase text-text-secondary/60">
                        {STAGE_LABELS[ax.stage]} · {AFFECT_LABELS[ax.affect]} ·{" "}
                        {STANCE_LABELS[ax.stance]}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          {holdsTension && (
            <p className="font-serif italic text-body-sm text-amber-300/85 max-w-prose border-l-2 border-amber-500/40 pl-4">
              {record.figure.displayName} is read across{" "}
              {stancesSet.size > 1 && (
                <>
                  divergent stances ({Array.from(stancesSet).map((s) => STANCE_LABELS[s as Stance]).join(" vs. ")})
                </>
              )}
              {stancesSet.size > 1 && affects.size > 1 && " and "}
              {affects.size > 1 && (
                <>
                  divergent affect centers ({Array.from(affects).map((a) => AFFECT_LABELS[a as Affect]).join(" vs. ")})
                </>
              )}
              . The figure holds a tension their readers cannot — which is often why they endure.
            </p>
          )}
        </section>
      )}

      {neighbors.length > 0 && (
        <section className="mb-10">
          <p className="font-mono text-label tracking-kicker uppercase text-gold/80 mb-4">
            Also read in this register
          </p>
          <ul className="space-y-4">
            {neighbors.map((n) => (
              <li key={n.clusterId}>
                <p className="font-serif text-body-sm italic text-text-secondary/75 mb-2">
                  {n.clusterTheme}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {n.figures.map((f) => (
                    <li key={f.slug}>
                      <Link
                        href={`/atlas/exemplars/${f.slug}`}
                        className="inline-block rounded-sm border border-surface-light/40 px-3 py-1.5 font-serif text-body-sm hover:border-gold/60 hover:text-gold transition-colors"
                      >
                        {f.displayName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

// ── helpers ────────────────────────────────────────────────────────────────

function pickDominantCluster(
  clusters: FigureClusterResolution[],
): FigureClusterResolution | undefined {
  if (clusters.length === 0) return undefined;
  return clusters
    .slice()
    .sort((a, b) => b.appearances.length - a.appearances.length)[0];
}

function collectAxis<K extends "stage" | "affect" | "stance">(
  clusters: FigureClusterResolution[],
  key: K,
): Set<string> {
  const set = new Set<string>();
  for (const c of clusters) {
    const ax = CLUSTER_AXES[c.clusterId];
    if (ax) set.add(ax[key]);
  }
  return set;
}

interface NeighborGroup {
  clusterId: string;
  clusterTheme: string;
  figures: Array<{ slug: string; displayName: string }>;
}

function computeNeighbors(
  record: FigureRecord,
  clusters: FigureClusterResolution[],
): NeighborGroup[] {
  const all = getFigureIndex();
  return clusters
    .map<NeighborGroup>((c) => {
      const others = all.filter((other) => {
        if (other.figure.slug === record.figure.slug) return false;
        return resolveFigureClusters(other).some((rc) => rc.clusterId === c.clusterId);
      });
      others.sort(
        (a, b) =>
          b.appearances.length - a.appearances.length ||
          a.figure.displayName.localeCompare(b.figure.displayName),
      );
      return {
        clusterId: c.clusterId,
        clusterTheme: c.clusterTheme,
        figures: others.slice(0, 5).map((o) => ({
          slug: o.figure.slug,
          displayName: o.figure.displayName,
        })),
      };
    })
    .filter((g) => g.figures.length > 0);
}

interface AxisRowProps<T extends string> {
  label: string;
  values: readonly T[];
  active: Set<string>;
  labels: Record<T, string>;
  colorOf?: (v: T) => string;
}

function AxisRow<T extends string>({
  label,
  values,
  active,
  labels,
  colorOf,
}: AxisRowProps<T>) {
  return (
    <div className="flex items-baseline gap-4 flex-wrap">
      <p className="font-mono text-kicker tracking-kicker uppercase text-text-secondary/60 w-16 shrink-0">
        {label}
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {values.map((v) => {
          const on = active.has(v);
          const color = colorOf?.(v);
          return (
            <li key={v}>
              <span
                className={`inline-block rounded-sm border px-2.5 py-1 font-mono text-kicker tracking-label uppercase transition-colors ${
                  on
                    ? "text-text-primary"
                    : "text-text-secondary/45 border-surface-light/30"
                }`}
                style={
                  on
                    ? {
                        borderColor: color ? `${color}99` : "rgba(201,184,132,0.7)",
                        background: color ? `${color}1f` : "rgba(201,184,132,0.08)",
                      }
                    : undefined
                }
              >
                {labels[v]}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
