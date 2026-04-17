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
import {
  getMetaDebate,
  META_DEBATES,
  CONFIDENCE_LABEL,
  IMPACT_LABEL,
  STATUS_LABEL,
  STATUS_COLOR,
} from "@/data/debates";
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
        className="font-mono text-label tracking-kicker uppercase text-muted/80 hover:text-gold"
      >
        ← Debates
      </Link>
      <div className="mt-6 flex items-center gap-3 flex-wrap">
        <p className="font-mono text-label tracking-kicker uppercase" style={{ color: accent }}>
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
          <p className="mt-2 font-mono text-label italic text-text-secondary/70">
            src · {entry.primarySourceCitation}
          </p>
        )}
        {entry.scholarlyCitation && (
          <p className="font-mono text-label italic text-text-secondary/70">
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

      <p className="font-mono text-label tracking-kicker uppercase text-muted/70">
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
        className="font-mono text-label tracking-kicker uppercase text-muted/80 hover:text-gold"
      >
        ← Debates
      </Link>
      <div className="mt-6">
        <SectionHeading kicker="Meta-debate" as="h1">
          {debate.heading}
        </SectionHeading>
      </div>

      <dl className="mt-6 mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-surface-light/40 py-4">
        <div>
          <dt className="font-mono text-kicker tracking-kicker uppercase text-muted/70 mb-1.5">
            Site confidence
          </dt>
          <dd className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => {
                const v = debate.confidence === "high" ? 3 : debate.confidence === "moderate" ? 2 : 1;
                return (
                  <span
                    key={i}
                    className="block w-6 h-[3px] rounded-sm"
                    style={{ background: i <= v ? "var(--gold, #c9a961)" : "rgba(255,255,255,0.08)" }}
                  />
                );
              })}
            </div>
            <span className="font-serif italic text-xs text-text-secondary/85">
              {CONFIDENCE_LABEL[debate.confidence]}
            </span>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-kicker tracking-kicker uppercase text-muted/70 mb-1.5">
            Impact on map
          </dt>
          <dd className="font-serif italic text-xs text-text-secondary/85">
            {IMPACT_LABEL[debate.impact]}
            {debate.impact === "structural" ? " — shapes the frame" : " — local to one system"}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-kicker tracking-kicker uppercase text-muted/70 mb-1.5">
            Status
          </dt>
          <dd className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="w-2 h-2 rounded-full"
              style={{
                background: STATUS_COLOR[debate.status],
                boxShadow: `0 0 0 3px ${STATUS_COLOR[debate.status]}1f`,
              }}
            />
            <span className="font-serif italic text-xs text-text-secondary/85">
              {STATUS_LABEL[debate.status]}
            </span>
          </dd>
        </div>
      </dl>

      <section className="mb-10">
        <h2 className="font-serif text-xl font-medium mb-2">The case for</h2>
        <p className="leading-relaxed text-text-secondary/90">{debate.caseFor}</p>
        {debate.citationsFor && (
          <ul className="mt-2 space-y-1 font-mono text-label italic text-text-secondary/70">
            {debate.citationsFor.map((c) => {
              const text = typeof c === "string" ? c : c.text;
              const href = typeof c === "string" ? undefined : c.href;
              return (
                <li key={text}>
                  —{" "}
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-text-secondary/30 hover:decoration-text-secondary hover:text-gold transition-colors"
                    >
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="mb-10">
        <h2 className="font-serif text-xl font-medium mb-2">The case against</h2>
        <p className="leading-relaxed text-text-secondary/90">{debate.caseAgainst}</p>
        {debate.citationsAgainst && (
          <ul className="mt-2 space-y-1 font-mono text-label italic text-text-secondary/70">
            {debate.citationsAgainst.map((c) => {
              const text = typeof c === "string" ? c : c.text;
              const href = typeof c === "string" ? undefined : c.href;
              return (
                <li key={text}>
                  —{" "}
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-text-secondary/30 hover:decoration-text-secondary hover:text-gold transition-colors"
                    >
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </li>
              );
            })}
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
