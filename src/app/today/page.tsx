import type { Metadata } from "next";
import Link from "next/link";
import { archetypeDisplayName, archetypeHref, systemAccent } from "@/lib/resonance";
import { absoluteUrl, buildPageMetadata, truncate } from "@/lib/site";
import { dateKeyUTC, todaysDraw } from "@/lib/dailyDraw";
import { reflectiveQuestion } from "@/lib/reflectiveQuestion";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";
import ArchetypeShareCard from "@/components/viz/ArchetypeShareCard";
import TodayShadowStrip from "@/components/today/TodayShadowStrip";
import AcrossTraditions from "@/components/today/AcrossTraditions";
import NextDrawCountdown from "@/components/today/NextDrawCountdown";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { entry } = todaysDraw();
  const name = archetypeDisplayName(entry.system, entry.slug) ?? entry.slug;
  return buildPageMetadata({
    title: `Today's Draw: ${name}`,
    description: truncate(`${entry.note} — Maps of the Inner World`),
    path: "/today",
    ogImage: absoluteUrl(`/api/card/${entry.system}/${entry.slug}`),
    type: "article",
  });
}

export default function TodayPage() {
  const draw = todaysDraw();
  const { entry, clusters } = draw;
  const name = archetypeDisplayName(entry.system, entry.slug) ?? entry.slug;
  const { accent, name: systemName } = systemAccent(entry.system);
  const primaryCluster = clusters[0];
  const question = reflectiveQuestion(entry.system, entry.slug);
  const dateLabel = dateKeyUTC();

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-20 md:py-24">
      <p className="font-mono text-kicker tracking-kicker uppercase text-muted mb-8">
        Today · {dateLabel} UTC
      </p>

      <article
        className="rounded-sm px-7 py-9 md:px-12 md:py-14 relative overflow-hidden"
        style={{
          border: `1px solid ${accent}33`,
          background: `linear-gradient(145deg, ${accent}10 0%, var(--color-bg) 72%)`,
          boxShadow: `0 0 40px ${accent}0A`,
        }}
      >
        <p
          className="font-mono text-label tracking-kicker uppercase mb-3"
          style={{ color: accent }}
        >
          {systemName} · {primaryCluster.theme.split(/\s[—-]\s/)[0].replace(/^The\s+/i, "")}
        </p>

        <h1
          className="font-serif text-h1 leading-display glow-text-subtle mb-6"
          style={{ color: accent }}
        >
          {name}
        </h1>

        <p className="font-serif text-lg italic text-text-secondary/85 leading-article">
          {entry.note}
        </p>

        {entry.editorialNote && (
          <p className="font-serif text-body italic text-text-secondary/70 mt-4 leading-article">
            {entry.editorialNote}
          </p>
        )}

        <TodayShadowStrip system={entry.system} slug={entry.slug} />

        <hr className="my-8 border-t border-surface-light/40" />

        <h2 className="font-mono text-kicker tracking-kicker uppercase text-muted mb-3">
          A question for today
        </h2>
        <p className="font-serif text-body-lg text-text-primary/90 leading-article">
          {question.fragments.map((f, i) =>
            f.kind === "accent" ? (
              <strong key={i} className="font-medium" style={{ color: accent }}>
                {f.value}
              </strong>
            ) : (
              <span key={i}>{f.value}</span>
            ),
          )}
        </p>

        <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
          <Link
            href={archetypeHref(entry.system, entry.slug)}
            className="font-mono text-label tracking-kicker uppercase underline underline-offset-4"
            style={{ color: accent }}
          >
            Read {name} →
          </Link>
          <NextDrawCountdown />
        </div>
      </article>

      <AcrossTraditions system={entry.system} slug={entry.slug} />

      <div className="mt-12">
        <ArchetypeShareCard
          system={entry.system}
          slug={entry.slug}
          displayName={name}
          tweetText={`Today's draw: ${name} — ${entry.note}`}
        />
      </div>

      <div className="mt-14">
        <HermeneuticCaveat variant="footnote" />
      </div>
    </div>
  );
}
