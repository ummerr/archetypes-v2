import Link from "next/link";
import { ENNEAGRAM_TRIADS } from "@/data/enneagram/archetypes";
import { buildPageMetadata, systemOgImage } from "@/lib/site";
import BlindSpotsSection from "@/components/shared/BlindSpotsSection";

export const metadata = buildPageMetadata({
  title: "About - Enneagram",
  description:
    "The Enneagram: nine motivational types organized into three centers of intelligence, with dynamic paths of integration and disintegration.",
  path: "/enneagram/about",
  ogImage: systemOgImage("enneagram"),
});

export default function EnneagramAbout() {
  return (
    <div className="min-h-screen px-6 pt-24 pb-20 md:pt-32">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-4 animate-slide-up">
          About the System
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-text-primary tracking-tight leading-[1.05] mb-10 animate-slide-up">
          The Motor Beneath{" "}
          <span className="text-gold glow-text-subtle">the Mask</span>
        </h1>

        <div className="space-y-8 text-text-secondary leading-relaxed font-light animate-slide-up delay-200">
          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              What the Enneagram Is
            </h2>
            <p>
              The Enneagram is a map of nine personality types defined not by
              surface traits but by underlying motivations - the core fear each
              type is organized around, and the core desire it keeps reaching
              for. Where Jungian archetypes describe the <em>role</em> someone
              plays, the Enneagram describes the <em>why</em> beneath the role.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              Three Centers of Intelligence
            </h2>
            <p className="mb-4">
              The nine types cluster into three <em>centers</em>, each oriented
              around a dominant emotion and a different mode of processing the
              world.
            </p>
            <div className="grid gap-4">
              {ENNEAGRAM_TRIADS.map((c) => (
                <div
                  key={c.id}
                  className="rounded-sm p-5"
                  style={{
                    background: `linear-gradient(145deg, ${c.color}0C, transparent)`,
                    border: `1px solid ${c.color}28`,
                  }}
                >
                  <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                    <h3
                      className="font-serif text-xl font-medium"
                      style={{ color: c.color }}
                    >
                      {c.label}
                    </h3>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                      {c.tagline} · Types {c.numbers.join(", ")}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase ml-auto" style={{ color: c.color + "CC" }}>
                      {c.dominantEmotion}
                    </span>
                  </div>
                  <p className="text-sm">{c.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              Arrows: Integration and Disintegration
            </h2>
            <p>
              Each type is connected to two others by directional arrows. The{" "}
              <em>integration arrow</em> describes the type's direction of
              growth - the traits that come online when the person is thriving.
              The <em>disintegration arrow</em> describes the direction of
              stress - the shadow qualities that surface when the person is
              under pressure. Reading both together turns a static type into a
              dynamic map of movement.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              How to Use This
            </h2>
            <p>
              Each type page offers a <em>Thriving / Under Pressure</em> toggle
              that surfaces the two movements. Treat the descriptions as
              mirrors, not verdicts. The Enneagram works best as a vocabulary
              for honest self-observation over time - not as a label to settle
              into.
            </p>
          </section>

          <BlindSpotsSection system="enneagram" />
        </div>

        <div className="mt-16 text-center animate-slide-up delay-500">
          <Link
            href="/enneagram"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-muted uppercase hover:text-gold transition-colors duration-300"
          >
            <span className="w-6 h-px bg-current" />
            Back to the nine
            <span className="w-6 h-px bg-current" />
          </Link>
        </div>
      </div>
    </div>
  );
}
