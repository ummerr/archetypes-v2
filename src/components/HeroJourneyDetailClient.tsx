"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import type { HeroJourneyArchetype, JourneyStage } from "@/types/herosjourney";
import { useTheme } from "@/components/ThemeProvider";
import { HeroJourneyArchetypeIcon } from "@/components/HeroJourneyArchetypeIcon";

const HeroJourneyTotemCanvas = dynamic(
  () => import("@/components/HeroJourneyTotemCanvas"),
  { ssr: false }
);

interface Props {
  archetype: HeroJourneyArchetype;
  stages: JourneyStage[];
  siblings: HeroJourneyArchetype[];
}

export default function HeroJourneyDetailClient({
  archetype,
  stages,
  siblings,
}: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const color = archetype.accentColor;

  const fields: { label: string; body: string }[] = [
    { label: "Core Desire", body: archetype.coreDesire },
    { label: "Core Fear", body: archetype.coreFear },
    { label: "Core Lie", body: archetype.coreLie },
    { label: "Strategy", body: archetype.strategy },
    { label: "Gift", body: archetype.gift },
    { label: "Trap (Shadow)", body: archetype.trap },
  ];

  const correlations: { label: string; body: string }[] = [
    { label: "KWML", body: archetype.crossSystem.kwml },
    { label: "Pearson-Marr", body: archetype.crossSystem.pearsonMarr },
    { label: "Enneagram", body: archetype.crossSystem.enneagram },
  ];

  return (
    <div className="min-h-screen px-6 pt-24 pb-24 md:pt-32">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 animate-slide-up">
          <Link
            href="/heros-journey"
            className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase hover:text-gold transition-colors"
          >
            Hero&rsquo;s Journey
          </Link>
          <span className="text-muted/40 font-mono text-[10px]">/</span>
          <span
            className="font-mono text-[9px] tracking-[0.25em] uppercase"
            style={{ color }}
          >
            {archetype.role.replace("-", " ")}
          </span>
        </div>

        {/* Hero */}
        <div className="mb-12 animate-slide-up delay-100">
          <div className="flex items-start gap-6 mb-4">
            <div
              className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0 -mt-4"
              aria-hidden
            >
              <HeroJourneyTotemCanvas
                slug={archetype.slug}
                color={color}
                isHovered
              />
            </div>
            <div className="flex-1 pt-1">
              <p
                className="font-mono text-[10px] tracking-[0.35em] uppercase mb-2"
                style={{ color: color + "CC" }}
              >
                Campbell &amp; Vogler · Mask of the Monomyth
              </p>
              <h1
                className="font-serif text-5xl md:text-6xl font-medium tracking-tight leading-[1.05]"
                style={{
                  color,
                  textShadow: !light ? `0 0 24px ${color}30` : "none",
                }}
              >
                {archetype.name}
              </h1>
            </div>
          </div>

          <p className="font-serif text-xl md:text-2xl italic text-text-secondary/90 mb-5 mt-4">
            &ldquo;{archetype.motto}&rdquo;
          </p>

          <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light max-w-2xl">
            {archetype.description}
          </p>
        </div>

        {/* Fields grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-16 animate-slide-up delay-200">
          {fields.map((f) => (
            <div
              key={f.label}
              className="rounded-sm p-5"
              style={{
                background: `linear-gradient(145deg, ${color}${light ? "0A" : "06"}, transparent)`,
                border: `1px solid ${color}${light ? "22" : "14"}`,
              }}
            >
              <p
                className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2"
                style={{ color: color + "CC" }}
              >
                {f.label}
              </p>
              <p className="text-text-primary text-sm md:text-base leading-relaxed font-light">
                {f.body}
              </p>
            </div>
          ))}
        </div>

        {/* Characteristics */}
        <div className="mb-16 animate-slide-up delay-300">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-[10px] tracking-[0.35em] text-gold/80 uppercase">
              Key Characteristics
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${color}${light ? "30" : "18"}, transparent)`,
              }}
            />
          </div>
          <ul className="space-y-2.5">
            {archetype.keyCharacteristics.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span
                  className="mt-2 block w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: color }}
                />
                <span className="text-text-secondary text-sm md:text-base leading-relaxed font-light">
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Primary Stages */}
        <div className="mb-16 animate-slide-up delay-300">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-[10px] tracking-[0.35em] text-gold/80 uppercase">
              Where This Mask Acts
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${color}${light ? "30" : "18"}, transparent)`,
              }}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {stages.map((s) => (
              <div
                key={s.number}
                className="rounded-sm p-4"
                style={{
                  background: `linear-gradient(145deg, ${color}${light ? "08" : "04"}, transparent)`,
                  border: `1px solid ${color}${light ? "20" : "10"}`,
                }}
              >
                <div className="flex items-baseline gap-3 mb-1">
                  <span
                    className="font-mono text-[10px] tracking-[0.25em]"
                    style={{ color: color + "CC" }}
                  >
                    Stage {s.number}
                  </span>
                  <p
                    className="font-serif text-base font-medium"
                    style={{ color }}
                  >
                    {s.name}
                  </p>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed font-light">
                  {s.shortDescription}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Shadow pole */}
        <div className="mb-16 animate-slide-up delay-400">
          <div
            className="rounded-sm p-6"
            style={{
              background: `linear-gradient(145deg, #00000018, transparent)`,
              border: `1px solid ${color}${light ? "30" : "20"}`,
            }}
          >
            <p
              className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2 text-muted"
            >
              Shadow Pole — the inverted mask
            </p>
            <p
              className="font-serif text-xl font-medium"
              style={{ color }}
            >
              {archetype.shadowPole}
            </p>
          </div>
        </div>

        {/* Cross-system correlations */}
        <div className="mb-16 animate-slide-up delay-400">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-[10px] tracking-[0.35em] text-gold/80 uppercase">
              Cross-System Resonance
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${color}${light ? "30" : "18"}, transparent)`,
              }}
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {correlations.map((c) => (
              <div
                key={c.label}
                className="rounded-sm p-4"
                style={{
                  background: `linear-gradient(145deg, ${color}${light ? "06" : "03"}, transparent)`,
                  border: `1px solid ${color}${light ? "18" : "0E"}`,
                }}
              >
                <p
                  className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1 text-muted"
                >
                  {c.label}
                </p>
                <p className="text-sm text-text-primary leading-snug font-light">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Siblings */}
        <div className="animate-slide-up delay-500">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-[10px] tracking-[0.35em] text-muted uppercase">
              Other Masks on the Journey
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${color}20, transparent)`,
              }}
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/heros-journey/archetype/${s.slug}`}
                className="group block rounded-sm p-4 transition-all duration-300"
                style={{
                  background: `linear-gradient(145deg, ${s.accentColor}${light ? "08" : "04"}, transparent)`,
                  border: `1px solid ${s.accentColor}${light ? "20" : "10"}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="opacity-70 group-hover:opacity-100 transition-opacity shrink-0"
                    aria-hidden
                  >
                    <HeroJourneyArchetypeIcon slug={s.slug} color={s.accentColor} size={26} />
                  </span>
                  <div>
                    <p
                      className="font-serif text-base font-medium"
                      style={{ color: s.accentColor }}
                    >
                      {s.name}
                    </p>
                    <p className="font-mono text-[9px] italic text-muted mt-0.5 line-clamp-1">
                      &ldquo;{s.motto.split(",")[0]}&rdquo;
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
