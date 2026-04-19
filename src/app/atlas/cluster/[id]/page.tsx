import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CLUSTERS } from "@/data/resonance";
import {
  archetypeDisplayName,
  archetypeHref,
  debateSlugFor,
  getClusterById,
  systemAccent,
} from "@/lib/resonance";
import { buildPageMetadata } from "@/lib/site";
import ConfidenceBadge from "@/components/shared/ConfidenceBadge";
import CitationLine from "@/components/shared/CitationLine";
import SectionHeading from "@/components/shared/SectionHeading";
import ClusterTotem from "@/components/viz/ClusterTotem";
import ArchetypeMark from "@/components/shared/ArchetypeMark";
import { CLUSTER_AXES, STAGE_LABELS, AFFECT_LABELS, STANCE_LABELS } from "@/data/atlas-lens-axes";
import { CLUSTER_PEDAGOGY } from "@/data/cluster-pedagogy";
import ClusterVignettes from "@/components/atlas/ClusterVignettes";
import ClusterExemplarGrid from "@/components/atlas/ClusterExemplarGrid";
import ClusterDevelopmentalArc from "@/components/atlas/ClusterDevelopmentalArc";
import ClusterShadowFaces from "@/components/atlas/ClusterShadowFaces";
import { getExemplarIndex, resolveExemplarClusters } from "@/lib/exemplars";

export function generateStaticParams() {
  return CLUSTERS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cluster = getClusterById(id);
  if (!cluster) return {};
  return buildPageMetadata({
    title: cluster.theme,
    description: cluster.description,
    path: `/atlas/cluster/${cluster.id}`,
  });
}

export default async function ClusterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cluster = getClusterById(id);
  if (!cluster) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">
      <Link
        href="/atlas"
        className="font-mono text-label tracking-kicker uppercase text-muted/80 hover:text-gold"
      >
        ← Atlas
      </Link>
      <div className="mt-6 flex items-start gap-6 flex-wrap">
        <div
          className="shrink-0 rounded-sm border p-3"
          style={{
            borderColor: `${CLUSTER_AXES[cluster.id]?.motifColor ?? "#e6c47a"}40`,
            background: "rgba(6,6,10,0.6)",
          }}
        >
          <ClusterTotem id={cluster.id} size="hero" title={cluster.theme} />
        </div>
        <div className="min-w-0 flex-1">
          <SectionHeading kicker="Cluster" as="h1">
            {cluster.theme}
          </SectionHeading>
          {CLUSTER_AXES[cluster.id] ? (
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-label tracking-kicker uppercase text-text-secondary/70">
              <span>Stage · {STAGE_LABELS[CLUSTER_AXES[cluster.id].stage]}</span>
              <span>Affect · {AFFECT_LABELS[CLUSTER_AXES[cluster.id].affect]}</span>
              <span>Stance · {STANCE_LABELS[CLUSTER_AXES[cluster.id].stance]}</span>
            </div>
          ) : null}
        </div>
      </div>
      <p className="font-serif text-lg italic text-text-secondary/85 max-w-3xl mb-6">
        {cluster.description}
      </p>
      {cluster.editorialNote && (
        <p className="font-serif text-body italic text-text-secondary/75 mb-2 max-w-3xl">
          {cluster.editorialNote}
        </p>
      )}
      {cluster.adversarialNote && (
        <p className="font-serif text-body-sm italic text-muted/80 mb-8 max-w-3xl">
          <span className="font-mono text-kicker tracking-kicker uppercase mr-2">
            Devil's advocate:
          </span>
          {cluster.adversarialNote}
        </p>
      )}

      {(() => {
        const ped = CLUSTER_PEDAGOGY[cluster.id];
        const motif = CLUSTER_AXES[cluster.id]?.motifColor ?? "#d4af37";
        const clusterExemplars = getExemplarIndex().filter((r) =>
          resolveExemplarClusters(r).some((c) => c.clusterId === cluster.id),
        );
        return (
          <div className="mt-10">
            {ped?.vignettes && (
              <ClusterVignettes vignettes={ped.vignettes} color={motif} />
            )}
            <ClusterExemplarGrid clusterId={cluster.id} />
            {clusterExemplars.length > 0 && (
              <section className="mb-12">
                <p className="font-mono text-label tracking-kicker uppercase text-gold/80 mb-3">
                  Exemplars in this cluster
                </p>
                <p className="font-serif italic text-body-sm text-text-secondary/70 mb-4 max-w-prose">
                  Cross-system exemplars whose archetypal tags resolve here. Each links to a page
                  showing how every tradition reads them.
                </p>
                <ul className="flex flex-wrap gap-2">
                  {clusterExemplars.map((r) => (
                    <li key={r.exemplar.slug}>
                      <Link
                        href={`/atlas/exemplars/${r.exemplar.slug}`}
                        className="inline-block rounded-sm border border-surface-light/40 px-3 py-1.5 font-serif text-body-sm hover:border-gold/60 hover:text-gold transition-colors"
                      >
                        {r.exemplar.displayName}
                        <span className="ml-2 font-mono text-kicker tracking-label uppercase text-text-secondary/55">
                          {r.appearances.length}×
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {ped?.developmentalArc && (
              <ClusterDevelopmentalArc arc={ped.developmentalArc} color={motif} />
            )}
            {ped?.shadowFaces && (
              <ClusterShadowFaces faces={ped.shadowFaces} color={motif} />
            )}
          </div>
        );
      })()}

      <p className="font-mono text-label tracking-kicker uppercase text-gold/80 mt-4 mb-3">
        Archetypes across six systems
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {cluster.archetypes.map((entry) => {
          const { accent, name: systemName } = systemAccent(entry.system);
          const displayName = archetypeDisplayName(entry.system, entry.slug) ?? entry.slug;
          return (
            <div
              key={`${entry.system}-${entry.slug}`}
              className="rounded-sm border p-4"
              style={{ borderColor: `${accent}30` }}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="shrink-0 inline-flex items-center justify-center" style={{ width: 22, height: 22 }}>
                    <ArchetypeMark
                      system={entry.system}
                      slug={entry.slug}
                      color={accent}
                      title={displayName}
                    />
                  </span>
                  <p className="font-mono text-kicker tracking-kicker uppercase truncate" style={{ color: accent }}>
                    {systemName}
                  </p>
                </div>
                <ConfidenceBadge tier={entry.confidence} color={accent} />
              </div>
              <Link
                href={archetypeHref(entry.system, entry.slug)}
                className="font-serif text-lg font-medium hover:underline underline-offset-4 decoration-1"
                style={{ color: accent }}
              >
                {displayName}
              </Link>
              <p className="text-sm text-text-primary/85 mt-1 leading-snug">{entry.note}</p>
              <CitationLine
                primarySource={entry.primarySourceCitation}
                scholarly={entry.scholarlyCitation}
                dissent={entry.dissent}
                adversarial={entry.adversarialNote}
                editorial={entry.editorialNote}
              />
              {entry.confidence === "contested" && (
                <Link
                  href={`/atlas/debates/${debateSlugFor(cluster.id, entry.system, entry.slug)}`}
                  className="mt-3 inline-block font-mono text-label tracking-kicker uppercase text-amber-500 hover:text-amber-400 underline underline-offset-2"
                >
                  Debate →
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
