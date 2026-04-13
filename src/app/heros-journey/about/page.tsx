import Link from "next/link";
import { JOURNEY_ACTS } from "@/data/herosjourney/stages";
import { buildPageMetadata, systemOgImage } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "About — Hero's Journey",
  description:
    "Campbell's monomyth, Vogler's twelve-stage adaptation, and honest notes on what the framework illuminates and what it leaves out.",
  path: "/heros-journey/about",
  ogImage: systemOgImage("heros-journey"),
});

export default function HerosJourneyAbout() {
  return (
    <div className="min-h-screen px-6 pt-24 pb-20 md:pt-32">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-4 animate-slide-up">
          About the System
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-text-primary tracking-tight leading-[1.05] mb-10 animate-slide-up">
          The Monomyth,{" "}
          <span className="text-gold glow-text-subtle">In Twelve Movements</span>
        </h1>

        <div className="space-y-8 text-text-secondary leading-relaxed font-light animate-slide-up delay-200">
          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              Campbell&rsquo;s Proposition
            </h2>
            <p>
              In <em>The Hero with a Thousand Faces</em> (1949), Joseph Campbell
              proposed that the myths of disparate cultures share an underlying
              template: a circular journey of departure, initiation, and return.
              Drawing on Jung&rsquo;s collective unconscious, he read
              mythological figures not as historical persons but as
              personifications of interior psychic patterns seeking integration.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              Vogler&rsquo;s Twelve Stages
            </h2>
            <p>
              Campbell&rsquo;s original seventeen stages were dense, academic,
              and culturally specific. In the 1980s, Christopher Vogler — a
              story consultant at Disney — distilled the model into a practical
              twelve-beat structure in <em>The Writer&rsquo;s Journey</em>. The
              same work also reduced Jung&rsquo;s infinitely expressive
              archetypes into eight canonical masks: Hero, Mentor, Herald,
              Threshold Guardian, Shapeshifter, Shadow, Trickster, and Ally.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-4 font-medium">
              Three Acts
            </h2>
            <div className="grid gap-4">
              {JOURNEY_ACTS.map((a) => (
                <div
                  key={a.id}
                  className="rounded-sm p-5"
                  style={{
                    background: `linear-gradient(145deg, ${a.color}10, transparent)`,
                    border: `1px solid ${a.color}30`,
                  }}
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3
                      className="font-serif text-xl font-medium"
                      style={{ color: a.color }}
                    >
                      {a.label}
                    </h3>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                      {a.tagline}
                    </span>
                  </div>
                  <p className="text-sm">{a.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              Honest Limits
            </h2>
            <p className="mb-3">
              The monomyth is a powerful interpretive lens — not a biological
              law. Feminist scholars (Maureen Murdock, Valerie Estelle Frankel)
              have shown how Campbell&rsquo;s original framing marginalized
              feminine experience, relegating the feminine to stations
              (&ldquo;Goddess,&rdquo; &ldquo;Temptress&rdquo;) rather than
              granting it heroic agency. Murdock&rsquo;s{" "}
              <em>Heroine&rsquo;s Journey</em> was written in direct response.
            </p>
            <p>
              Post-colonial and post-structuralist critics point out the
              Eurocentric selection bias: a single universal template can
              flatten the specific political and cultural textures of the
              stories it claims to unite. In this atlas we use the twelve-stage
              model as one interpretive map among several — precise enough to
              illuminate recurring patterns, humble enough to admit its edges.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              How to Read the Masks
            </h2>
            <p>
              A character is rarely only one mask. The Mentor may shift into a
              Shapeshifter; a trusted Ally may be revealed as a Threshold
              Guardian. Treat the eight roles as functions the story calls up —
              not as costumes assigned for the whole run.
            </p>
          </section>
        </div>

        <div className="mt-16 text-center animate-slide-up delay-500">
          <Link
            href="/heros-journey"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-muted uppercase hover:text-gold transition-colors duration-300"
          >
            <span className="w-6 h-px bg-current" />
            Back to the wheel
            <span className="w-6 h-px bg-current" />
          </Link>
        </div>
      </div>
    </div>
  );
}
