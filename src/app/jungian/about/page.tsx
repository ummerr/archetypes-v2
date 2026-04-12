import Link from "next/link";
import { JUNGIAN_CLUSTERS } from "@/data/jungian/archetypes";

export const metadata = {
  title: "About — Jungian Archetypes",
  description:
    "Carl Jung's collective unconscious and the Pearson-Marr taxonomy of twelve heroic archetypes.",
};

export default function JungianAbout() {
  return (
    <div className="min-h-screen px-6 pt-24 pb-20 md:pt-32">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-4 animate-slide-up">
          About the System
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-text-primary tracking-tight leading-[1.05] mb-10 animate-slide-up">
          The Collective Unconscious,{" "}
          <span className="text-gold glow-text-subtle">Mapped</span>
        </h1>

        <div className="space-y-8 text-text-secondary leading-relaxed font-light animate-slide-up delay-200">
          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              Jung&rsquo;s Proposition
            </h2>
            <p>
              Carl Jung argued the psyche is not a blank slate. Beneath personal
              memory lies a <em>collective unconscious</em>: a shared inheritance
              of symbolic forms — archetypes — that shape how every human
              imagines the world. Mother, Hero, Shadow, Wise Old One recur across
              cultures not by coincidence but because they encode patterns of
              being human.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              The Pearson-Marr Taxonomy
            </h2>
            <p>
              Carol Pearson and Hugh Marr adapted Jung for modern use, naming
              twelve archetypes that represent universal motivations. Each has a
              motto, a core desire, a greatest fear, and a strategy. Together
              they map the stages of a single journey — from basic security,
              through individuation, to integrated wholeness.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-4 font-medium">
              Three Clusters
            </h2>
            <div className="grid gap-4">
              {JUNGIAN_CLUSTERS.map((c) => (
                <div
                  key={c.id}
                  className="rounded-sm p-5"
                  style={{
                    background: `linear-gradient(145deg, ${c.color}08, transparent)`,
                    border: `1px solid ${c.color}25`,
                  }}
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3
                      className="font-serif text-xl font-medium"
                      style={{ color: c.color }}
                    >
                      {c.label}
                    </h3>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                      {c.tagline}
                    </span>
                  </div>
                  <p className="text-sm">{c.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              A Note on Validity
            </h2>
            <p>
              Modern psychology has not empirically proven that archetypes are
              biologically inherited. What is empirically clear is that these
              patterns <em>resonate</em> — across cultures, eras, and media.
              Treat them as a vocabulary for self-inquiry, not as a test.
            </p>
          </section>
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
