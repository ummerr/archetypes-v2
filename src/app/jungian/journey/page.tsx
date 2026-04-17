import {
  ALL_JUNGIAN,
  JUNGIAN_CLUSTERS,
} from "@/data/jungian/archetypes";
import JourneySpiral from "@/components/jungian/JourneySpiral";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildPageMetadata,
  systemOgImage,
  absoluteUrl,
  SITE_NAME,
  SITE_AUTHOR,
} from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "The Journey - Jungian Archetypes",
  description:
    "The Pearson-Marr journey, visualized: twelve archetypes arranged across three rings - Ego, Soul, and Self - tracing the stages of psychological development.",
  path: "/jungian/journey",
  ogImage: systemOgImage("jungian"),
  type: "article",
});

export default function JungianJourneyPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Journey - Jungian Archetypes",
    description:
      "A visual map of the Pearson-Marr twelve-archetype journey across Ego, Soul, and Self.",
    url: absoluteUrl("/jungian/journey"),
    isPartOf: { "@type": "WebSite", name: SITE_NAME },
    author: { "@type": "Person", name: SITE_AUTHOR },
    publisher: { "@type": "Person", name: SITE_AUTHOR },
  };

  return (
    <>
      <JsonLd data={ld} />
      <div className="min-h-screen px-6 pt-24 pb-24 md:pt-32">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 animate-slide-up">
            <Link
              href="/jungian"
              className="font-mono text-kicker tracking-kicker text-muted uppercase hover:text-gold transition-colors"
            >
              Jungian
            </Link>
            <span className="text-muted/40 font-mono text-label">/</span>
            <span className="font-mono text-kicker tracking-kicker uppercase text-gold/80">
              The Journey
            </span>
          </div>

          {/* Lede */}
          <header className="mb-10 animate-slide-up delay-100 max-w-2xl">
            <p className="font-mono text-label tracking-display uppercase text-muted mb-3">
              Ego · Soul · Self
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-medium tracking-tight leading-display mb-5">
              The Journey
            </h1>
            <p className="font-serif text-xl md:text-2xl italic text-text-secondary/90 mb-5">
              Twelve archetypes on three rings. A single psychological arc,
              unfolding from outward security to inward wholeness.
            </p>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light">
              Pearson-Marr groups the twelve archetypes into three stages of
              development. The outer ring - <strong className="text-text-primary font-normal">Ego</strong> - holds the
              archetypes that establish the self in the world: trust, belonging,
              courage, care. The middle ring - <strong className="text-text-primary font-normal">Soul</strong> - stirs
              the individuation that pulls us out of the given life: freedom,
              refusal, devotion, creation. The inner ring - <strong className="text-text-primary font-normal">Self</strong>{" "}
              - expresses integration: play, truth, transformation, sovereignty.
            </p>
          </header>

          {/* Spiral */}
          <div className="animate-slide-up delay-200 mb-14">
            <JourneySpiral archetypes={ALL_JUNGIAN} clusters={JUNGIAN_CLUSTERS} />
          </div>

          {/* Stage captions */}
          <section className="grid md:grid-cols-3 gap-4 animate-slide-up delay-300">
            {JUNGIAN_CLUSTERS.map((c) => (
              <div
                key={c.id}
                className="rounded-sm p-5"
                style={{
                  background: `linear-gradient(145deg, ${c.color}0A, transparent)`,
                  border: `1px solid ${c.color}24`,
                }}
              >
                <p
                  className="font-mono text-kicker tracking-display uppercase mb-2"
                  style={{ color: c.color }}
                >
                  {c.label}
                </p>
                <p className="font-serif italic text-base md:text-lg mb-2 text-text-primary">
                  {c.tagline}
                </p>
                <p className="text-text-secondary text-sm leading-relaxed font-light">
                  {c.description}
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
