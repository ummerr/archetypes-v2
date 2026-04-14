import Link from "next/link";
import {
  JUNGIAN_CLUSTERS,
  getJungianByCluster,
} from "@/data/jungian/archetypes";
import { buildPageMetadata, systemOgImage } from "@/lib/site";
import BlindSpotsSection from "@/components/shared/BlindSpotsSection";

export const metadata = buildPageMetadata({
  title: "About - Jungian Archetypes",
  description:
    "The Pearson-Marr twelve - the framework behind modern brand identity, and the living vocabulary of Jung's collective unconscious. Ego, Soul, and Self.",
  path: "/jungian/about",
  ogImage: systemOgImage("jungian"),
});

const BRAND_TEASERS: { brand: string; archetype: string; slug: string; note: string }[] = [
  {
    brand: "Nike",
    archetype: "The Hero",
    slug: "hero",
    note: "Mastery and victory - the athlete as mythic conqueror.",
  },
  {
    brand: "Apple",
    archetype: "The Creator",
    slug: "creator",
    note: "Think different - tools for the ones who make.",
  },
  {
    brand: "Harley-Davidson",
    archetype: "The Rebel",
    slug: "rebel",
    note: "The open road as refusal; freedom as identity.",
  },
  {
    brand: "Disney",
    archetype: "The Magician",
    slug: "magician",
    note: "Where dreams come true - transformation as product.",
  },
];

export default function JungianAbout() {
  return (
    <div className="min-h-screen px-6 pt-24 pb-20 md:pt-32">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-4 animate-slide-up">
          About the System
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-text-primary tracking-tight leading-[1.05] mb-10 animate-slide-up">
          The Twelve,{" "}
          <span className="text-gold glow-text-subtle">Living</span>
        </h1>

        <div className="space-y-10 text-text-secondary leading-relaxed font-light animate-slide-up delay-200">
          {/* Brand-archetype lede */}
          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              Why You&rsquo;ve Heard of This
            </h2>
            <p className="mb-4">
              The Pearson-Marr system is the framework behind most modern brand
              identity work. When a strategist says a brand is a{" "}
              <em>Hero</em>, a <em>Rebel</em>, a <em>Creator</em>, or a{" "}
              <em>Caregiver</em>, they&rsquo;re using this vocabulary. Carol
              Pearson&rsquo;s twelve archetypes translated Jung out of the
              consulting room and onto the billboard, and for a quarter
              century they&rsquo;ve shaped how companies, films, political
              campaigns, and personal narratives are built.
            </p>
            <p>
              What was originally a psychology of inner development turned out
              to also be a grammar of public identity. Both readings stay
              useful. You can meet these archetypes as parts of yourself, and
              you can read them off the logos around you.
            </p>
          </section>

          {/* Journey pointer */}
          <section
            className="rounded-sm p-6 border"
            style={{
              background:
                "linear-gradient(145deg, rgba(155,127,184,0.10), transparent)",
              borderColor: "rgba(155,127,184,0.30)",
            }}
          >
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2 text-gold/80">
              The Map
            </p>
            <h3 className="font-serif text-2xl text-text-primary font-medium mb-2">
              Twelve archetypes on three rings.
            </h3>
            <p className="mb-4">
              Pearson-Marr arranges the twelve across three stages of
              development - Ego, Soul, and Self. The whole system is easier to
              see than to describe.
            </p>
            <Link
              href="/jungian/journey"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-gold hover:text-gold/80 transition-colors"
            >
              <span>Enter the Journey</span>
              <span aria-hidden>→</span>
            </Link>
          </section>

          {/* Three stage essays with inline archetype tiles */}
          {JUNGIAN_CLUSTERS.map((c) => {
            const members = getJungianByCluster(c.id).sort(
              (a, b) => a.stageOrder - b.stageOrder
            );
            return (
              <section key={c.id}>
                <div className="flex items-baseline gap-3 mb-3">
                  <h2
                    className="font-serif text-2xl font-medium"
                    style={{ color: c.color }}
                  >
                    {c.label}
                  </h2>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase">
                    {c.tagline}
                  </span>
                </div>
                <p className="mb-4">{c.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {members.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/jungian/archetype/${a.slug}`}
                      className="group rounded-sm p-3 flex items-center gap-2 transition-all"
                      style={{
                        background: `linear-gradient(145deg, ${a.accentColor}0A, transparent)`,
                        border: `1px solid ${a.accentColor}22`,
                      }}
                    >
                      <span
                        className="font-serif text-xl opacity-80 group-hover:opacity-100 transition-opacity"
                        style={{ color: a.accentColor }}
                        aria-hidden
                      >
                        {a.symbol}
                      </span>
                      <span
                        className="font-serif text-sm"
                        style={{ color: a.accentColor }}
                      >
                        {a.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Brand archetypes section */}
          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              Brand Archetypes
            </h2>
            <p className="mb-5">
              Strategists use the twelve to locate a brand&rsquo;s emotional
              center. A single archetype holds the tone, the promise, and the
              shape of the story the brand is trying to tell. A few of the
              clearest examples:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {BRAND_TEASERS.map((b) => (
                <Link
                  key={b.brand}
                  href={`/jungian/archetype/${b.slug}`}
                  className="group rounded-sm p-4 border border-white/10 hover:border-gold/40 transition-colors"
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <p className="font-serif text-lg text-text-primary font-medium">
                      {b.brand}
                    </p>
                    <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted group-hover:text-gold transition-colors">
                      {b.archetype}
                    </span>
                  </div>
                  <p className="text-sm">{b.note}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Jung credibility note */}
          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              The Jungian Ground
            </h2>
            <p className="mb-4">
              Carl Jung argued the psyche is not a blank slate. Beneath
              personal memory lies a <em>collective unconscious</em>: a shared
              inheritance of symbolic forms - archetypes - that shape how
              every human imagines the world. Mother, Hero, Shadow, Wise Old
              One recur across cultures not by coincidence but because they
              encode patterns of being human. Pearson and Marr turned that
              intuition into a working taxonomy.
            </p>
            <p>
              Modern psychology has not empirically proven that archetypes are
              biologically inherited. What is empirically clear is that these
              patterns <em>resonate</em> - across cultures, eras, and media.
              Treat them as a vocabulary for self-inquiry and for reading the
              world, not as a test.
            </p>
          </section>

          <BlindSpotsSection system="jungian" />
        </div>

        <div className="mt-16 text-center animate-slide-up delay-500">
          <Link
            href="/jungian"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-muted uppercase hover:text-gold transition-colors duration-300"
          >
            <span className="w-6 h-px bg-current" />
            Back to the twelve
            <span className="w-6 h-px bg-current" />
          </Link>
        </div>
      </div>
    </div>
  );
}
