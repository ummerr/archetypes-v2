import PageTransition from "@/components/PageTransition";
import { FAMILIES } from "@/data/archetypes";
import Link from "next/link";

export const metadata = {
  title: "About — KWML Archetype Explorer",
};

export default function AboutPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <div className="relative pt-28 pb-16 md:pt-36 md:pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[150px] bg-gold/[0.04]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-surface-light to-transparent" />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-4">
            Framework
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-gold tracking-tight mb-6">
            About
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed max-w-xl">
            <em className="not-italic text-text-primary">
              King, Warrior, Magician, Lover
            </em>{" "}
            was published in 1990 by Robert Moore and Douglas Gillette. It
            deconstructs the masculine psyche into four archetypal energy
            structures.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Thesis */}
          <section className="mb-16">
            <div className="space-y-5 text-text-secondary leading-relaxed">
              <p>
                The book&apos;s central thesis: mature masculinity is not
                abusive, domineering, or toxic. It is generative, creative, and
                empowering — both of the self and of others. The crisis of
                modern masculinity stems from men being stuck in Boy Psychology
                rather than having transitioned into Man Psychology through
                proper initiation.
              </p>
              <p>
                Moore built explicitly on Carl Jung&apos;s work — the collective
                unconscious, the Self, individuation, and the shadow. He
                expanded Jung&apos;s single-shadow concept into a{" "}
                <strong className="text-text-primary font-medium">
                  bipolar shadow system
                </strong>{" "}
                where each archetype splits into an active (inflated) and
                passive (deflated) shadow pole.
              </p>
            </div>
          </section>

          {/* Boy-to-Man Evolution */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-gold/30" />
              <h2 className="font-serif text-2xl text-text-primary">
                The Boy-to-Man Evolution
              </h2>
            </div>
            <div className="grid gap-2">
              {FAMILIES.map((family) => (
                <div
                  key={family.id}
                  className="group flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300 hover:bg-surface/50"
                  style={{
                    borderColor: `${family.color}15`,
                    background: `linear-gradient(135deg, ${family.color}04 0%, transparent 50%)`,
                  }}
                >
                  <div
                    className="w-1 h-10 rounded-full shrink-0 transition-all duration-300 group-hover:h-12"
                    style={{ backgroundColor: `${family.color}50` }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/archetype/${family.boy.slug}`}
                        className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                      >
                        {family.boy.name}
                      </Link>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-px bg-gold/30" />
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 8 8"
                          fill="none"
                        >
                          <path
                            d="M2 1L6 4L2 7"
                            stroke="var(--color-gold)"
                            strokeWidth="1"
                            strokeLinecap="round"
                            opacity="0.5"
                          />
                        </svg>
                      </div>
                      <Link
                        href={`/archetype/${family.man.slug}`}
                        className="font-serif text-lg font-medium transition-colors hover:brightness-110"
                        style={{ color: family.color }}
                      >
                        {family.man.name}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Shadow system */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-gold/30" />
              <h2 className="font-serif text-2xl text-text-primary">
                The Bipolar Shadow System
              </h2>
            </div>
            <div className="space-y-5 text-text-secondary leading-relaxed">
              <p>
                Each archetype is visualized as a triangle. The apex represents
                the mature fullness — the healthy expression. The two base
                corners represent the shadow poles: the{" "}
                <strong className="text-crimson-light font-medium">
                  active shadow
                </strong>{" "}
                (inflated, grandiose) and the{" "}
                <strong className="text-muted font-medium">
                  passive shadow
                </strong>{" "}
                (deflated, diminished).
              </p>
              <p>
                The shadows are not separate pathologies but a single
                dysfunctional system that oscillates. Men bounce between the two
                poles. A man possessed by the passive shadow may eventually
                erupt into the active shadow, and vice versa.
              </p>
              <div className="relative p-5 rounded-2xl border border-gold/10 bg-gold/[0.03]">
                <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl bg-gold/30" />
                <p className="text-sm text-text-secondary pl-4">
                  Moore&apos;s most critical distinction:{" "}
                  <strong className="text-text-primary font-medium">
                    accessing
                  </strong>{" "}
                  an archetype (healthy — the ego channels the energy) vs.{" "}
                  <strong className="text-text-primary font-medium">
                    identifying with
                  </strong>{" "}
                  it (pathological — the ego is possessed by it).
                </p>
              </div>
            </div>
          </section>

          {/* Quaternary system */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-gold/30" />
              <h2 className="font-serif text-2xl text-text-primary">
                The Quaternary System
              </h2>
            </div>
            <div className="space-y-5 text-text-secondary leading-relaxed">
              <p>
                The four archetypes form an integrated structural whole. No
                single archetype suffices for maturity — they are
                interdependent. The Warrior without the Lover becomes sadistic.
                The Lover without boundaries becomes addicted. The Magician
                without the Warrior becomes a paralyzed thinker. All need the
                King&apos;s centering presence.
              </p>
              <blockquote className="relative pl-6 py-2">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />
                <p className="font-serif text-lg text-text-primary/80 italic leading-relaxed">
                  &ldquo;The King, Warrior, and Magician need the Lover to
                  energize them, to humanize them, and to give them their
                  ultimate purpose — love.&rdquo;
                </p>
              </blockquote>
            </div>
          </section>

          {/* CTA */}
          <div className="relative pt-10">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-surface-light to-transparent" />
            <div className="text-center">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 text-gold hover:text-gold-bright transition-all duration-300"
              >
                <span className="text-sm tracking-wide">
                  Explore the Archetypes
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path
                    d="M6 4L10 8L6 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
