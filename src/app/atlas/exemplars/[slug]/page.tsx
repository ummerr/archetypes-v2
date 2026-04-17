import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FIGURES } from "@/data/exemplars/figures";
import { getFigureIndex, getFigureRecord, resolveFigureClusters } from "@/lib/exemplars";
import { archetypeDisplayName, archetypeHref, systemAccent } from "@/lib/resonance";
import { buildPageMetadata } from "@/lib/site";
import SectionHeading from "@/components/shared/SectionHeading";
import {
  CLUSTER_AXES,
  STAGE_LABELS,
  AFFECT_LABELS,
  STANCE_LABELS,
  type Stance,
  type Affect,
} from "@/data/atlas-lens-axes";

export function generateStaticParams() {
  // Only static-gen pages for figures that actually resolve to at least one
  // appearance — empty figures would 404.
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
    // If the slug is in FIGURES but has no appearances, still show a soft page.
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
  const stances = new Set<Stance>(
    clusters
      .map((c) => CLUSTER_AXES[c.clusterId]?.stance)
      .filter((s): s is Stance => Boolean(s)),
  );
  const affects = new Set<Affect>(
    clusters
      .map((c) => CLUSTER_AXES[c.clusterId]?.affect)
      .filter((a): a is Affect => Boolean(a)),
  );
  const holdsTension = stances.size > 1 || affects.size > 1;

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-20">
      <Link
        href="/atlas/exemplars"
        className="font-mono text-label tracking-kicker uppercase text-muted/80 hover:text-gold"
      >
        ← Figures
      </Link>
      <div className="mt-4 flex items-baseline gap-3 flex-wrap">
        <SectionHeading kicker="Figure" as="h1">
          {record.figure.displayName}
        </SectionHeading>
      </div>
      <p className="font-mono text-label tracking-kicker uppercase text-text-secondary/60 mb-4">
        {record.figure.kind} · read by {record.appearances.length} of 6 traditions
      </p>
      {record.figure.editorialNote && (
        <p className="font-serif italic text-base text-text-secondary/85 max-w-2xl mb-10">
          {record.figure.editorialNote}
        </p>
      )}

      <section className="mb-12">
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
        <section className="mb-10">
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
              {stances.size > 1 && (
                <>
                  divergent stances ({Array.from(stances).map((s) => STANCE_LABELS[s]).join(" vs. ")})
                </>
              )}
              {stances.size > 1 && affects.size > 1 && " and "}
              {affects.size > 1 && (
                <>
                  divergent affect centers ({Array.from(affects).map((a) => AFFECT_LABELS[a]).join(" vs. ")})
                </>
              )}
              . The figure holds a tension their readers cannot — which is often why they endure.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
