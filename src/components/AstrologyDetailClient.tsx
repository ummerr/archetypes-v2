"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ZodiacArchetype, ZodiacElementGroup } from "@/types/astrology";
import { useTheme } from "@/components/ThemeProvider";
import CrossSystemResonance from "@/components/resonance/CrossSystemResonance";
import ArchetypeShareCard from "@/components/viz/ArchetypeShareCard";
import CrossSystemResonanceInline from "@/components/resonance/CrossSystemResonanceInline";
import ArchetypeRadar from "@/components/viz/ArchetypeRadar";
import ResonanceNetwork from "@/components/viz/ResonanceNetwork";
import ExemplarsTabs from "@/components/shared/ExemplarsTabs";
import { getAstrologyExemplars } from "@/data/astrology/exemplars";
import AstrologyDailyCard from "@/components/AstrologyDailyCard";
import CanvasSkeleton from "@/components/shared/CanvasSkeleton";

const AstrologyTotemCanvas = dynamic(
  () => import("@/components/AstrologyTotemCanvas"),
  { ssr: false, loading: () => <CanvasSkeleton /> }
);

interface Props {
  archetype: ZodiacArchetype;
  element: ZodiacElementGroup;
  elementSiblings: ZodiacArchetype[];
  oppositeArchetype?: ZodiacArchetype;
}

type State = "thriving" | "pressure";

export default function AstrologyDetailClient({
  archetype,
  element,
  elementSiblings,
  oppositeArchetype,
}: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const color = archetype.accentColor;
  const [state, setState] = useState<State>("thriving");

  const growthColor = "#7FA68A";
  const stressColor = "#C26A6A";
  const activeColor = state === "thriving" ? growthColor : stressColor;
  const activeNarrative =
    state === "thriving" ? archetype.thrivingNarrative : archetype.pressureNarrative;

  const fields: { label: string; body: string }[] = [
    { label: "Element", body: `${element.label} — ${element.temperament}, ${element.affectTint}` },
    { label: "Modality", body: cap(archetype.modality) },
    { label: "Ruling Planet", body: archetype.rulingPlanet },
    { label: "Polarity", body: cap(archetype.polarity) },
    { label: "Gift", body: archetype.gift },
    { label: "Trap (Shadow)", body: archetype.trap },
  ];

  return (
    <div className="min-h-screen px-6 pt-24 pb-24 md:pt-32">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-6 animate-slide-up flex-wrap"
        >
          <Link
            href="/astrology"
            className="font-mono text-kicker tracking-kicker text-muted uppercase hover:text-gold transition-colors"
          >
            Astrology
          </Link>
          <span className="text-muted/40 font-mono text-label">/</span>
          <span
            className="font-mono text-kicker tracking-kicker uppercase"
            style={{ color: element.color }}
          >
            {element.label}
          </span>
          <span className="text-muted/40 font-mono text-label">/</span>
          <span
            aria-current="page"
            className="font-mono text-kicker tracking-kicker text-muted uppercase"
          >
            {archetype.dates}
          </span>
          <span className="text-muted/40 font-mono text-label ml-1">·</span>
          <Link
            href="/astrology/about"
            className="font-mono text-kicker tracking-kicker text-muted/80 uppercase hover:text-gold transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Hero */}
        <div className="mb-10 animate-slide-up delay-100">
          <div className="flex items-start gap-4 sm:gap-5 mb-4">
            <div
              className="w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 flex-shrink-0 -mt-2 sm:-mt-4"
              aria-hidden
            >
              <AstrologyTotemCanvas slug={archetype.slug} color={color} isHovered />
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <p
                className="font-mono text-label tracking-kicker uppercase mb-2"
                style={{ color: color + "CC" }}
              >
                {element.label} · {cap(archetype.modality)}
              </p>
              <h1
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-display flex items-center gap-3"
                style={{
                  color,
                  textShadow: !light ? `0 0 24px ${color}30` : "none",
                }}
              >
                <span aria-hidden className="opacity-80">{archetype.glyph}</span>
                {archetype.name}
              </h1>
              <p
                className="font-mono text-label tracking-kicker uppercase mt-2"
                style={{ color: color + "AA" }}
              >
                {archetype.dates} · {archetype.rulingPlanet}
              </p>
            </div>
          </div>

          <p className="font-serif text-xl md:text-2xl italic text-text-secondary/90 mb-5 mt-4">
            &ldquo;{archetype.motto}&rdquo;
          </p>

          <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light max-w-2xl">
            {archetype.description}
          </p>

          <CrossSystemResonanceInline system="astrology" slug={archetype.slug} />
        </div>

        {/* Daily reading */}
        <div className="mb-16 animate-slide-up delay-150">
          <AstrologyDailyCard slug={archetype.slug} color={color} glyph={archetype.glyph} />
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
                className="font-mono text-kicker tracking-kicker uppercase mb-2"
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

        {/* The two bridges — Golden Dawn arcana + Jungian correlation */}
        <div className="mb-16 animate-slide-up delay-250">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-label tracking-kicker text-gold/80 uppercase">
              How the sign enters the atlas
            </span>
            <div
              className="h-px flex-1"
              style={{ background: `linear-gradient(90deg, ${color}${light ? "30" : "18"}, transparent)` }}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href={`/tarot/archetype/${archetype.goldenDawnArcana.slug}`}
              className="group block rounded-sm p-5 transition-all duration-300"
              style={{
                background: `linear-gradient(145deg, ${color}${light ? "0A" : "06"}, transparent)`,
                border: `1px solid ${color}${light ? "22" : "14"}`,
              }}
            >
              <p className="font-mono text-kicker tracking-kicker uppercase mb-1 text-muted">
                Golden Dawn bridge · Tarot
              </p>
              <p className="font-serif text-lg font-medium group-hover:underline decoration-1 underline-offset-4" style={{ color }}>
                {archetype.goldenDawnArcana.name}
              </p>
              <p className="text-xs text-text-secondary leading-snug mt-1 font-light">
                {archetype.goldenDawnArcana.note}
              </p>
            </Link>
            {archetype.jungianSlug && (
              <Link
                href={`/jungian/archetype/${archetype.jungianSlug}`}
                className="group block rounded-sm p-5 transition-all duration-300"
                style={{
                  background: `linear-gradient(145deg, ${color}${light ? "0A" : "06"}, transparent)`,
                  border: `1px solid ${color}${light ? "22" : "14"}`,
                }}
              >
                <p className="font-mono text-kicker tracking-kicker uppercase mb-1 text-muted">
                  Archetypal reading · Jungian
                </p>
                <p className="font-serif text-lg font-medium group-hover:underline decoration-1 underline-offset-4" style={{ color }}>
                  {archetype.jungianCorrelation}
                </p>
                <p className="text-xs text-text-secondary leading-snug mt-1 font-light">
                  The Greene / Rudhyar / Tarnas reading — moderate confidence, always dissented.
                </p>
              </Link>
            )}
          </div>
        </div>

        {/* State toggle */}
        <div className="mb-16 animate-slide-up delay-300">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-label tracking-kicker text-gold/80 uppercase">
              The sign in motion
            </span>
            <div
              className="h-px flex-1"
              style={{ background: `linear-gradient(90deg, ${activeColor}${light ? "40" : "22"}, transparent)` }}
            />
          </div>

          <div
            className="inline-flex rounded-sm p-1 mb-6"
            style={{
              background: light ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${activeColor}22`,
            }}
          >
            {(
              [
                { id: "thriving", label: "Thriving", c: growthColor },
                { id: "pressure", label: "Under Pressure", c: stressColor },
              ] as const
            ).map((opt) => {
              const isActive = state === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setState(opt.id)}
                  className="px-4 py-2 font-mono text-label tracking-kicker uppercase transition-all duration-300 rounded-sm"
                  style={{
                    color: isActive ? "#FFFFFF" : "var(--color-muted)",
                    background: isActive ? opt.c : "transparent",
                    boxShadow: isActive ? `0 0 16px ${opt.c}55` : "none",
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light max-w-2xl mb-8">
            {activeNarrative}
          </p>

          {/* Polarity shadow — the opposite sign across the wheel */}
          {oppositeArchetype && (
            <div
              className="rounded-sm p-6"
              style={{
                background: `linear-gradient(145deg, ${stressColor}${light ? "0C" : "07"}, transparent)`,
                border: `1px solid ${stressColor}${light ? "26" : "18"}`,
              }}
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex flex-col items-start">
                  <span className="font-mono text-kicker tracking-kicker uppercase mb-1" style={{ color: color + "AA" }}>
                    This sign
                  </span>
                  <span className="font-serif text-2xl font-medium flex items-center gap-2" style={{ color }}>
                    <span aria-hidden>{archetype.glyph}</span> {archetype.name}
                  </span>
                </div>
                <div className="flex flex-col items-center flex-1 min-w-[120px]">
                  <span className="font-mono text-kicker tracking-kicker uppercase mb-1" style={{ color: stressColor }}>
                    Shadow across the wheel
                  </span>
                  <span className="font-mono text-base" style={{ color: stressColor }}>⟷</span>
                </div>
                <Link
                  href={`/astrology/archetype/${oppositeArchetype.slug}`}
                  className="flex flex-col items-end group"
                >
                  <span className="font-mono text-kicker tracking-kicker uppercase mb-1" style={{ color: oppositeArchetype.accentColor + "AA" }}>
                    The disowned half
                  </span>
                  <span
                    className="font-serif text-2xl font-medium group-hover:underline decoration-1 underline-offset-4 flex items-center gap-2"
                    style={{ color: oppositeArchetype.accentColor }}
                  >
                    <span aria-hidden>{oppositeArchetype.glyph}</span> {oppositeArchetype.name}
                  </span>
                </Link>
              </div>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed font-light mt-4">
                {archetype.oppositeNote}
              </p>
            </div>
          )}
        </div>

        {/* Characteristics */}
        <div className="mb-16 animate-slide-up delay-400">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-label tracking-kicker text-gold/80 uppercase">
              Key Characteristics
            </span>
            <div
              className="h-px flex-1"
              style={{ background: `linear-gradient(90deg, ${color}${light ? "30" : "18"}, transparent)` }}
            />
          </div>
          <ul className="space-y-2.5">
            {archetype.keyCharacteristics.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="mt-2 block w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                <span className="text-text-secondary text-sm md:text-base leading-relaxed font-light">
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {(() => {
          const exemplars = getAstrologyExemplars(archetype.slug);
          if (!exemplars) return null;
          return (
            <div className="animate-slide-up delay-450">
              <ExemplarsTabs color={color} exemplars={exemplars} />
            </div>
          );
        })()}

        <div className="animate-slide-up delay-500 grid md:grid-cols-2 gap-8 mt-12 mb-12">
          <ArchetypeRadar system="astrology" slug={archetype.slug} />
          <ResonanceNetwork system="astrology" slug={archetype.slug} />
        </div>

        <CrossSystemResonance
          system="astrology"
          slug={archetype.slug}
          accentColor={archetype.accentColor}
          delay="delay-500"
        />

        <ArchetypeShareCard
          system="astrology"
          slug={archetype.slug}
          displayName={archetype.name}
          className="mt-10 animate-slide-up delay-500"
        />

        {/* Element siblings */}
        <div className="animate-slide-up delay-500">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-label tracking-kicker text-muted uppercase">
              Other {element.label} Signs
            </span>
            <div
              className="h-px flex-1"
              style={{ background: `linear-gradient(90deg, ${element.color}20, transparent)` }}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {elementSiblings.map((s) => (
              <Link
                key={s.slug}
                href={`/astrology/archetype/${s.slug}`}
                className="group block rounded-sm p-4 transition-all duration-300"
                style={{
                  background: `linear-gradient(145deg, ${s.accentColor}${light ? "08" : "04"}, transparent)`,
                  border: `1px solid ${s.accentColor}${light ? "20" : "10"}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-serif text-2xl opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{ color: s.accentColor }}
                    aria-hidden
                  >
                    {s.glyph}
                  </span>
                  <div>
                    <p className="font-serif text-base font-medium" style={{ color: s.accentColor }}>
                      {s.name}
                    </p>
                    <p className="font-mono text-kicker italic text-muted mt-0.5">
                      &ldquo;{s.motto}&rdquo;
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

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
