"use client";

import Link from "next/link";
import { TarotArchetype, TarotPhaseGroup } from "@/types/tarot";
import { ALL_TAROT, TAROT_PHASES } from "@/data/tarot/archetypes";
import { useTheme } from "@/components/ThemeProvider";
import TarotCard from "@/components/TarotCard";
import TarotDeckArc from "@/components/TarotDeckArc";
import CrossSystemResonance from "@/components/resonance/CrossSystemResonance";
import ArchetypeShareCard from "@/components/viz/ArchetypeShareCard";
import CrossSystemResonanceInline from "@/components/resonance/CrossSystemResonanceInline";
import ExemplarsTabs from "@/components/shared/ExemplarsTabs";
import { getTarotExemplars } from "@/data/tarot/exemplars";

interface Props {
  archetype: TarotArchetype;
  phase: TarotPhaseGroup;
  phaseSiblings: TarotArchetype[];
  previous: TarotArchetype | null;
  next: TarotArchetype | null;
  variant?: "page" | "modal";
}

export default function TarotDetailClient({
  archetype,
  phase,
  phaseSiblings,
  previous,
  next,
  variant = "page",
}: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const color = phase.color;
  const phaseColorFor = (id: number) =>
    TAROT_PHASES.find((p) => p.ids.includes(id))?.color ?? color;

  const poles = [
    {
      key: "fullness" as const,
      label: "Fullness",
      pole: archetype.poles.fullness,
      tint: color,
      kicker: "The healthy, integrated expression",
    },
    {
      key: "active" as const,
      label: "Active Shadow",
      pole: archetype.poles.activeShadow,
      tint: "#C0392B",
      kicker: "Over-expression - Enantiodromia inflates the energy",
    },
    {
      key: "passive" as const,
      label: "Passive Shadow",
      pole: archetype.poles.passiveShadow,
      tint: "#4A5A7A",
      kicker: "Under-expression - the repressed or deflated pole",
    },
  ];

  const isModal = variant === "modal";

  return (
    <div
      className={
        isModal
          ? "px-6 pt-10 pb-14"
          : "min-h-screen px-6 pt-24 pb-24 md:pt-32"
      }
    >
      <div className="max-w-4xl mx-auto">
        {/* Journey arc - full 22, current card highlighted */}
        <div className={`-mx-2 ${isModal ? "mb-12" : "mb-14"} animate-slide-up`}>
          <TarotDeckArc
            cards={ALL_TAROT}
            activeSlug={archetype.slug}
            height={200}
            fanDeg={60}
            arcRadius={900}
            cardW={40}
            cardH={64}
            showLegend={false}
            showHoverLabel={false}
            liftY={-14}
          />
        </div>

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-6 animate-slide-up flex-wrap"
        >
          <Link
            href="/tarot"
            className="font-mono text-kicker tracking-kicker text-muted uppercase hover:text-gold transition-colors"
          >
            Tarot
          </Link>
          <span className="text-muted/40 font-mono text-label">/</span>
          <span
            className="font-mono text-kicker tracking-kicker uppercase"
            style={{ color: phase.color }}
          >
            {phase.label}
          </span>
          <span className="text-muted/40 font-mono text-label">/</span>
          <span
            aria-current="page"
            className="font-mono text-kicker tracking-kicker text-muted uppercase"
          >
            Arcanum {archetype.numeral}
          </span>
          <span className="text-muted/40 font-mono text-label ml-1">·</span>
          <Link
            href="/tarot/about"
            className="font-mono text-kicker tracking-kicker text-muted/80 uppercase hover:text-gold transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Hero */}
        <div className="mb-12 animate-slide-up delay-100">
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <TarotCard archetype={archetype} size="lg" />
              <p className="mt-3 text-center font-mono text-kicker tracking-kicker text-muted uppercase">
                Click to flip
              </p>
            </div>

            <div className="flex-1 min-w-0 pt-1">
              <p
                className="font-mono text-label tracking-kicker uppercase mb-2"
                style={{ color: color + (light ? "DD" : "CC") }}
              >
                {phase.label} · Arcanum {archetype.numeral}
              </p>
              <h1
                className="font-serif text-5xl md:text-6xl font-medium tracking-tight leading-display"
                style={{
                  color: light ? "var(--color-text-primary)" : color,
                  textShadow: !light ? `0 0 24px ${color}40` : "none",
                }}
              >
                {archetype.name}
              </h1>
              <p className="font-serif text-xl md:text-2xl italic text-text-secondary/90 mt-4 mb-5">
                &ldquo;{archetype.motto}&rdquo;
              </p>
              <p
                className="font-mono text-kicker tracking-kicker uppercase mb-5"
                style={{ color: color + (light ? "BB" : "AA") }}
              >
                {archetype.coreTheme}
              </p>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light">
                {archetype.description}
              </p>

              {archetype.jungianSlug && (
                <div className="mt-5">
                  <Link
                    href={`/jungian/archetype/${archetype.jungianSlug}`}
                    className="inline-flex items-center gap-2 font-mono text-kicker tracking-kicker uppercase text-muted hover:text-gold transition-colors"
                  >
                    <span className="w-4 h-px bg-current" />
                    Jungian correlation: {archetype.jungianCorrelation}
                    <span>→</span>
                  </Link>
                </div>
              )}

              <CrossSystemResonanceInline system="tarot" slug={archetype.slug} />
            </div>
          </div>
        </div>

        {/* Bipolar Shadow Poles */}
        <div className="mb-16 animate-slide-up delay-200">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-label tracking-kicker text-gold/80 uppercase">
              Bipolar Shadow
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${color}${light ? "30" : "18"}, transparent)`,
              }}
            />
            <span className="font-mono text-kicker tracking-kicker text-muted uppercase">
              Enantiodromia
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {poles.map((row) => (
              <div
                key={row.key}
                className="rounded-sm p-5 flex flex-col"
                style={{
                  background: light
                    ? `linear-gradient(160deg, ${row.tint}0E, transparent)`
                    : `linear-gradient(160deg, ${row.tint}14, transparent)`,
                  border: `1px solid ${row.tint}${light ? "30" : "22"}`,
                }}
              >
                <p
                  className="font-mono text-kicker tracking-kicker uppercase mb-1"
                  style={{ color: row.tint + (light ? "EE" : "CC") }}
                >
                  {row.label}
                </p>
                <p
                  className="font-mono text-kicker tracking-label text-muted uppercase mb-3 leading-snug"
                >
                  {row.kicker}
                </p>
                <h3
                  className="font-serif text-xl md:text-2xl font-medium tracking-tight mb-2"
                  style={{
                    color: light ? "var(--color-text-primary)" : row.tint,
                  }}
                >
                  {row.pole.title}
                </h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed font-light">
                  {row.pole.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {(() => {
          const exemplars = getTarotExemplars(archetype.slug);
          if (!exemplars) return null;
          return (
            <div className="animate-slide-up delay-250">
              <ExemplarsTabs color={color} exemplars={exemplars} />
            </div>
          );
        })()}

        <CrossSystemResonance
          system="tarot"
          slug={archetype.slug}
          accentColor={color}
          delay="delay-300"
        />

        <ArchetypeShareCard
          system="tarot"
          slug={archetype.slug}
          displayName={archetype.name}
          className="mt-10 animate-slide-up delay-500"
        />

        {/* Previous / Next - the Fool's Journey sequence */}
        <div className="mb-16 animate-slide-up delay-300">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-label tracking-kicker text-gold/80 uppercase">
              The Fool&rsquo;s Journey
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${color}${light ? "25" : "15"}, transparent)`,
              }}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {previous ? (
              <Link
                href={`/tarot/archetype/${previous.slug}`}
                className="group block rounded-sm p-4 transition-all duration-300"
                style={{
                  border: `1px solid ${phaseColorFor(previous.id)}${light ? "25" : "18"}`,
                  background: light
                    ? `linear-gradient(145deg, ${phaseColorFor(previous.id)}08, transparent)`
                    : `linear-gradient(145deg, ${phaseColorFor(previous.id)}08, transparent)`,
                }}
              >
                <p className="font-mono text-kicker tracking-kicker text-muted uppercase mb-2">
                  ← Previous Arcanum
                </p>
                <p
                  className="font-serif text-xl font-medium"
                  style={{ color: phaseColorFor(previous.id) }}
                >
                  {previous.numeral} · {previous.name}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/tarot/archetype/${next.slug}`}
                className="group block rounded-sm p-4 transition-all duration-300 sm:text-right"
                style={{
                  border: `1px solid ${phaseColorFor(next.id)}${light ? "25" : "18"}`,
                  background: light
                    ? `linear-gradient(145deg, ${phaseColorFor(next.id)}08, transparent)`
                    : `linear-gradient(145deg, ${phaseColorFor(next.id)}08, transparent)`,
                }}
              >
                <p className="font-mono text-kicker tracking-kicker text-muted uppercase mb-2">
                  Next Arcanum →
                </p>
                <p
                  className="font-serif text-xl font-medium"
                  style={{ color: phaseColorFor(next.id) }}
                >
                  {next.numeral} · {next.name}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Phase siblings */}
        {phaseSiblings.length > 0 && (
          <div className="animate-slide-up delay-400">
            <div className="flex items-center gap-4 mb-5">
              <span
                className="font-mono text-label tracking-kicker uppercase"
                style={{ color: phase.color }}
              >
                Other Arcana in {phase.label}
              </span>
              <div
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(90deg, ${phase.color}20, transparent)`,
                }}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {phaseSiblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/tarot/archetype/${s.slug}`}
                  className="group block rounded-sm p-3 transition-all duration-300"
                  style={{
                    border: `1px solid ${phase.color}${light ? "25" : "15"}`,
                    background: `linear-gradient(145deg, ${phase.color}${light ? "08" : "06"}, transparent)`,
                  }}
                >
                  <p
                    className="font-mono text-kicker tracking-kicker uppercase mb-1"
                    style={{ color: phase.color + "CC" }}
                  >
                    {s.numeral}
                  </p>
                  <p
                    className="font-serif text-base font-medium"
                    style={{
                      color: light ? "var(--color-text-primary)" : phase.color,
                    }}
                  >
                    {s.name}
                  </p>
                  <p className="font-mono text-kicker text-muted/80 mt-1 line-clamp-1">
                    {s.symbol} {s.coreTheme.split("-")[0].trim()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
