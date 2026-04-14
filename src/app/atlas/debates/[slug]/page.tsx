import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  archetypeDisplayName,
  archetypeHref,
  debateSlugFor,
  getClusterById,
  getContestedEntries,
  parseDebateSlug,
  systemAccent,
} from "@/lib/resonance";
import { buildPageMetadata } from "@/lib/site";
import { getMetaDebate, META_DEBATES } from "@/data/debates";
import SectionHeading from "@/components/shared/SectionHeading";
import ConfidenceBadge from "@/components/shared/ConfidenceBadge";

export function generateStaticParams() {
  const contested = getContestedEntries().map((c) => ({
    slug: debateSlugFor(c.cluster.id, c.entry.system, c.entry.slug),
  }));
  const meta = META_DEBATES.map((m) => ({ slug: m.slug }));
  return [...contested, ...meta];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getMetaDebate(slug);
  if (meta) {
    return buildPageMetadata({
      title: meta.heading,
      description: meta.caseFor.slice(0, 155),
      path: `/atlas/debates/${slug}`,
    });
  }
  const parsed = parseDebateSlug(slug);
  if (!parsed) return {};
  const name = archetypeDisplayName(parsed.system, parsed.archetypeSlug) ?? parsed.archetypeSlug;
  const cluster = getClusterById(parsed.clusterId);
  return buildPageMetadata({
    title: `Does ${name} belong in ${cluster?.theme.split(" — ")[0] ?? parsed.clusterId}?`,
    description: `A contested mapping. Case for, case against, and citations on both sides.`,
    path: `/atlas/debates/${slug}`,
  });
}

export default async function DebatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const meta = getMetaDebate(slug);
  if (meta) return <MetaDebateView debate={meta} />;

  const parsed = parseDebateSlug(slug);
  if (!parsed) notFound();
  const cluster = getClusterById(parsed.clusterId);
  if (!cluster) notFound();
  const entry = cluster.archetypes.find(
    (a) => a.system === parsed.system && a.slug === parsed.archetypeSlug,
  );
  if (!entry) notFound();

  const name = archetypeDisplayName(entry.system, entry.slug) ?? entry.slug;
  const { accent, name: systemName } = systemAccent(entry.system);

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-20">
      <Link
        href="/atlas/debates"
        className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted/80 hover:text-gold"
      >
        ← Debates
      </Link>
      <div className="mt-6 flex items-center gap-3 flex-wrap">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: accent }}>
          {systemName}
        </p>
        <ConfidenceBadge tier={entry.confidence} color={accent} />
      </div>
      <h1 className="font-serif text-3xl md:text-4xl font-medium mt-3 mb-3">
        Does{" "}
        <Link
          href={archetypeHref(entry.system, entry.slug)}
          className="underline decoration-1 underline-offset-4"
          style={{ color: accent }}
        >
          {name}
        </Link>{" "}
        belong in the {cluster.theme.split(" — ")[0].replace(/^The\s+/i, "")} cluster?
      </h1>
      <p className="font-serif italic text-text-secondary/85 mb-10">{cluster.description}</p>

      <section className="mb-10">
        <h2 className="font-serif text-xl font-medium mb-2">The case for</h2>
        <p className="leading-relaxed text-text-secondary/90">{entry.note}</p>
        {entry.primarySourceCitation && (
          <p className="mt-2 font-mono text-[11px] italic text-text-secondary/70">
            src · {entry.primarySourceCitation}
          </p>
        )}
        {entry.scholarlyCitation && (
          <p className="font-mono text-[11px] italic text-text-secondary/70">
            lit · {entry.scholarlyCitation}
          </p>
        )}
      </section>

      {entry.dissent && (
        <section className="mb-10">
          <h2 className="font-serif text-xl font-medium mb-2">The case against</h2>
          <p className="leading-relaxed text-text-secondary/90">{entry.dissent}</p>
        </section>
      )}

      {entry.adversarialNote && (
        <section className="mb-10">
          <h2 className="font-serif text-xl font-medium mb-2">Devil's advocate</h2>
          <p className="leading-relaxed italic text-text-secondary/85">{entry.adversarialNote}</p>
        </section>
      )}

      <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted/70">
        <Link href="/about/methodology" className="underline underline-offset-2 hover:text-gold">
          What does "contested" mean?
        </Link>
      </p>
    </div>
  );
}

function MetaDebateView({ debate }: { debate: ReturnType<typeof getMetaDebate> & object }) {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-20">
      <Link
        href="/atlas/debates"
        className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted/80 hover:text-gold"
      >
        ← Debates
      </Link>
      <div className="mt-6">
        <SectionHeading kicker="Meta-debate" as="h1">
          {debate.heading}
        </SectionHeading>
      </div>

      <section className="mb-10">
        <h2 className="font-serif text-xl font-medium mb-2">The case for</h2>
        <p className="leading-relaxed text-text-secondary/90">{debate.caseFor}</p>
        {debate.citationsFor && (
          <ul className="mt-2 space-y-1 font-mono text-[11px] italic text-text-secondary/70">
            {debate.citationsFor.map((c) => (
              <li key={c}>— {c}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-10">
        <h2 className="font-serif text-xl font-medium mb-2">The case against</h2>
        <p className="leading-relaxed text-text-secondary/90">{debate.caseAgainst}</p>
        {debate.citationsAgainst && (
          <ul className="mt-2 space-y-1 font-mono text-[11px] italic text-text-secondary/70">
            {debate.citationsAgainst.map((c) => (
              <li key={c}>— {c}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-10">
        <h2 className="font-serif text-xl font-medium mb-2">Devil's advocate</h2>
        <p className="leading-relaxed italic text-text-secondary/85">{debate.adversarialNote}</p>
      </section>

      <section>
        <h2 className="font-serif text-xl font-medium mb-2">Where this site lands</h2>
        <p className="leading-relaxed text-text-secondary/90">{debate.stance}</p>
      </section>
    </div>
  );
}
