import Link from "next/link";
import { TAROT_PHASES } from "@/data/tarot/archetypes";
import { buildPageMetadata, systemOgImage } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "About - Tarot",
  description:
    "The Major Arcana as a psychological map: twenty-two archetypal images tracing the Fool's Journey through individuation, each carrying a fullness pole and two shadow expressions.",
  path: "/tarot/about",
  ogImage: systemOgImage("tarot"),
});

export default function TarotAbout() {
  return (
    <div className="min-h-screen px-6 pt-24 pb-20 md:pt-32">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-4 animate-slide-up">
          About the System
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-text-primary tracking-tight leading-[1.05] mb-10 animate-slide-up">
          The Deck as a{" "}
          <span className="text-gold glow-text-subtle">Map of the Psyche</span>
        </h1>

        <div className="space-y-8 text-text-secondary leading-relaxed font-light animate-slide-up delay-200">
          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              Not Divination - Individuation
            </h2>
            <p>
              This system treats the Major Arcana strictly as a psychological
              instrument, not an oracle. Jung saw the cards as preserved
              fragments of the <em>collective unconscious</em> - archetypal
              images shared across cultures because they mirror structures the
              human psyche keeps re-producing. Read this way, the deck has
              nothing to do with fortune-telling. It is a sequence of
              territories every examined life eventually passes through.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              The Fool&rsquo;s Journey
            </h2>
            <p>
              The twenty-two cards form a narrative arc, traditionally called
              the Fool&rsquo;s Journey: the movement from unconditioned potential
              (0) through the construction, collapse, and re-integration of the
              self, arriving at a provisional wholeness (XXI) that immediately
              opens onto the next round. The journey is not linear in one
              lifetime; the same arcanum recurs at deeper octaves.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              Three Phases
            </h2>
            <div className="space-y-4">
              {TAROT_PHASES.map((p) => (
                <div
                  key={p.id}
                  className="rounded-sm p-4"
                  style={{
                    border: `1px solid ${p.color}22`,
                    background: `linear-gradient(145deg, ${p.color}08, transparent)`,
                  }}
                >
                  <p
                    className="font-mono text-[10px] tracking-[0.3em] uppercase mb-1"
                    style={{ color: p.color }}
                  >
                    {p.label} · {p.range}
                  </p>
                  <p className="font-serif text-lg text-text-primary mb-1">
                    {p.tagline}
                  </p>
                  <p className="text-sm">{p.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              The Bipolar Shadow
            </h2>
            <p className="mb-3">
              Every arcanum is presented with three faces, following the same
              tripartite schema used by the other systems on this site:
            </p>
            <ul className="space-y-2.5 pl-5 list-disc marker:text-gold">
              <li>
                <span className="text-text-primary">Fullness.</span> The healthy,
                integrated expression - the apex the archetype points toward.
              </li>
              <li>
                <span className="text-text-primary">Active Shadow.</span> The
                inflated, over-expressed pole. Jung&rsquo;s principle of{" "}
                <em>enantiodromia</em>: an energy pushed too far produces its
                opposite.
              </li>
              <li>
                <span className="text-text-primary">Passive Shadow.</span> The
                deflated, repressed, or refused pole - what remains when the
                archetype is disowned rather than lived.
              </li>
            </ul>
            <p className="mt-3">
              A reversed card, in this reading, is not a bad omen. It is simply
              a cue that an archetypal energy is out of balance - inflated or
              refused - and an invitation to shadow work.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              Why the Card, and Not Just the Concept
            </h2>
            <p>
              The image is the point. Archetypes resist purely conceptual
              handling; they arrive through symbol, dream, and picture. The
              cards are interactive here for the same reason mandalas and icons
              are physical: holding and turning the image lets the unconscious
              recognise itself. Flip a card, let its pair of shadows hover next
              to its fullness, and notice which of the three the psyche
              quietly identifies with.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text-primary mb-3 font-medium">
              Sources
            </h2>
            <p>
              The psychological framing draws on Jung&rsquo;s writing on the
              collective unconscious and individuation, Sallie Nichols&rsquo;{" "}
              <em>Jung and Tarot</em>, and the modern archetypal-psychology
              tradition. The tripartite bipolar-shadow schema is borrowed from
              Moore &amp; Gillette and applied across this site to keep a
              common grammar between systems.
            </p>
          </section>
        </div>

        <div className="mt-12 animate-slide-up delay-400">
          <Link
            href="/tarot"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-muted uppercase hover:text-gold transition-colors duration-300"
          >
            <span className="w-6 h-px bg-current" />
            Back to the twenty-two
            <span className="w-6 h-px bg-current" />
          </Link>
        </div>
      </div>
    </div>
  );
}
