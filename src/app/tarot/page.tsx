"use client";

import Link from "next/link";
import { TAROT_PHASES, getTarotByPhase } from "@/data/tarot/archetypes";
import { useTheme } from "@/components/ThemeProvider";
import TarotCard from "@/components/TarotCard";
import TarotDeckArc from "@/components/TarotDeckArc";

export default function TarotHome() {
  const { theme } = useTheme();
  const light = theme === "light";

  return (
    <div className="min-h-screen relative">
      {/* Hero */}
      <div className="px-6 pt-24 pb-10 md:pt-32 md:pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="animate-slide-up">
            <p className="font-mono text-kicker tracking-display text-gold/80 uppercase mb-4">
              Major Arcana - The Fool&rsquo;s Journey
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-text-primary tracking-tight leading-display mb-5">
              Twenty-Two{" "}
              <span
                className={
                  light
                    ? "text-text-primary"
                    : "text-gold glow-text-subtle animate-flicker"
                }
              >
                Images of the Self
              </span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl font-light">
              The Major Arcana is not a deck of predictions. It is a sequence of
              archetypal images - drawn from the collective unconscious - that
              trace the stages of individuation. Each card names a psychological
              territory and its two shadows: what happens when the energy
              inflates, and what happens when it is repressed.
            </p>
          </div>
        </div>
      </div>

      {/* Signature arc */}
      <div className="px-4 pb-20">
        <div
          className="max-w-6xl mx-auto animate-slide-up"
          style={{ animationDelay: "150ms" }}
        >
          <TarotDeckArc />
        </div>
      </div>

      {/* Phase sections */}
      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto space-y-20">
          {TAROT_PHASES.map((phase, pIdx) => {
            const members = getTarotByPhase(phase.id);
            return (
              <section
                key={phase.id}
                className="animate-slide-up"
                style={{ animationDelay: `${200 + pIdx * 120}ms` }}
              >
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-3 flex-wrap">
                    <span
                      className="font-mono text-label tracking-kicker uppercase"
                      style={{ color: phase.color }}
                    >
                      {phase.label} · {phase.tagline}
                    </span>
                    <div
                      className="h-px flex-1 min-w-[40px]"
                      style={{
                        background: `linear-gradient(90deg, ${phase.color}${light ? "30" : "18"}, transparent)`,
                      }}
                    />
                    <span className="font-mono text-kicker tracking-kicker text-muted uppercase">
                      {phase.range}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-2xl font-light">
                    {phase.description}
                  </p>
                </div>

                {/* Phase-scoped mini arc */}
                <div className="-mx-2 mb-6">
                  <TarotDeckArc
                    cards={members}
                    height={180}
                    fanDeg={Math.min(40, members.length * 6)}
                    arcRadius={700}
                    cardW={44}
                    cardH={70}
                    maxWidth={720}
                    showLegend={false}
                    showHoverLabel={false}
                    strokeColor={phase.color}
                    liftY={-16}
                  />
                </div>

                <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                  {members.map((card, i) => (
                    <div
                      key={card.slug}
                      className="animate-slide-up"
                      style={{
                        animationDelay: `${300 + pIdx * 120 + i * 50}ms`,
                      }}
                    >
                      <TarotCard
                        archetype={card}
                        size="md"
                        href={`/tarot/archetype/${card.slug}`}
                      />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          <div className="text-center pt-6">
            <Link
              href="/tarot/about"
              className="inline-flex items-center gap-2 font-mono text-kicker tracking-label text-muted uppercase hover:text-gold transition-colors duration-300"
            >
              <span className="w-6 h-px bg-current" />
              The framework behind the twenty-two
              <span className="w-6 h-px bg-current" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
