"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { EnneagramArchetype, EnneagramTriadGroup } from "@/types/enneagram";
import { useTheme } from "@/components/ThemeProvider";
import EnneagramWings from "@/components/EnneagramWings";
import CrossSystemResonance from "@/components/resonance/CrossSystemResonance";
import CrossSystemResonanceInline from "@/components/resonance/CrossSystemResonanceInline";
import ExemplarsTabs from "@/components/shared/ExemplarsTabs";
import { getEnneagramExemplars } from "@/data/enneagram/exemplars";
import CanvasSkeleton from "@/components/shared/CanvasSkeleton";

const EnneagramTotemCanvas = dynamic(
  () => import("@/components/EnneagramTotemCanvas"),
  { ssr: false, loading: () => <CanvasSkeleton /> }
);

interface Props {
  archetype: EnneagramArchetype;
  triad: EnneagramTriadGroup;
  triadSiblings: EnneagramArchetype[];
  integrationTarget: EnneagramArchetype;
  disintegrationTarget: EnneagramArchetype;
  wingTargets: EnneagramArchetype[];
}

type State = "thriving" | "pressure";

export default function EnneagramDetailClient({
  archetype,
  triad,
  triadSiblings,
  integrationTarget,
  disintegrationTarget,
  wingTargets,
}: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const color = archetype.accentColor;
  const [state, setState] = useState<State>("thriving");

  const growthColor = "#7FA68A";
  const stressColor = "#C26A6A";
  const activeTarget = state === "thriving" ? integrationTarget : disintegrationTarget;
  const activeColor = state === "thriving" ? growthColor : stressColor;
  const activeNarrative =
    state === "thriving" ? archetype.thrivingNarrative : archetype.pressureNarrative;

  const fields: { label: string; body: string }[] = [
    { label: "Core Fear", body: archetype.coreFear },
    { label: "Core Desire", body: archetype.coreDesire },
    { label: "Core Lie", body: archetype.coreLie },
    { label: "Strategy", body: archetype.strategy },
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
            href="/enneagram"
            className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase hover:text-gold transition-colors"
          >
            Enneagram
          </Link>
          <span className="text-muted/40 font-mono text-[10px]">/</span>
          <span
            className="font-mono text-[9px] tracking-[0.25em] uppercase"
            style={{ color: triad.color }}
          >
            {triad.label} Triad
          </span>
          <span className="text-muted/40 font-mono text-[10px]">/</span>
          <span
            aria-current="page"
            className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase"
          >
            Type {archetype.number}
          </span>
          <span className="text-muted/40 font-mono text-[10px] ml-1">·</span>
          <Link
            href="/enneagram/about"
            className="font-mono text-[9px] tracking-[0.25em] text-muted/80 uppercase hover:text-gold transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Hero */}
        <div className="mb-10 animate-slide-up delay-100">
          <div className="flex items-start gap-5 mb-4">
            <div
              className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0 -mt-4"
              aria-hidden
            >
              <EnneagramTotemCanvas
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
                {triad.label} Triad · {triad.dominantEmotion}
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
              <p
                className="font-mono text-[11px] tracking-[0.3em] uppercase mt-2"
                style={{ color: color + "AA" }}
              >
                Type {archetype.number}
              </p>
            </div>
          </div>

          <p className="font-serif text-xl md:text-2xl italic text-text-secondary/90 mb-5 mt-4">
            &ldquo;{archetype.motto}&rdquo;
          </p>

          <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light max-w-2xl">
            {archetype.description}
          </p>

          {archetype.jungianSlug && (
            <div className="mt-5">
              <Link
                href={`/jungian/archetype/${archetype.jungianSlug}`}
                className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase text-muted hover:text-gold transition-colors"
              >
                <span className="w-4 h-px bg-current" />
                Jungian correlation: {archetype.jungianCorrelation}
                <span>→</span>
              </Link>
            </div>
          )}

          <CrossSystemResonanceInline system="enneagram" slug={archetype.slug} />
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

        {/* Wings */}
        <EnneagramWings archetype={archetype} wingTargets={wingTargets} />

        {/* State toggle + arrows */}
        <div className="mb-16 animate-slide-up delay-300">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-[10px] tracking-[0.35em] text-gold/80 uppercase">
              Movement
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${activeColor}${light ? "40" : "22"}, transparent)`,
              }}
            />
          </div>

          {/* Segmented toggle */}
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
                  className="px-4 py-2 font-mono text-[10px] tracking-[0.25em] uppercase transition-all duration-300 rounded-sm"
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

          {/* Arrow diagram */}
          <div
            className="rounded-sm p-6 mb-5"
            style={{
              background: `linear-gradient(145deg, ${activeColor}${light ? "0E" : "08"}, transparent)`,
              border: `1px solid ${activeColor}${light ? "30" : "20"}`,
            }}
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* Current */}
              <div className="flex flex-col items-start">
                <span
                  className="font-mono text-[8px] tracking-[0.3em] uppercase mb-1"
                  style={{ color: color + "AA" }}
                >
                  You Are
                </span>
                <span
                  className="font-serif text-2xl font-medium"
                  style={{ color }}
                >
                  {archetype.number} · {archetype.name.replace("The ", "")}
                </span>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <span
                  className="font-mono text-[8px] tracking-[0.3em] uppercase mb-1"
                  style={{ color: activeColor }}
                >
                  {state === "thriving" ? "Integration" : "Disintegration"}
                </span>
                <div className="flex items-center gap-2 w-full">
                  <div
                    className="h-px flex-1"
                    style={{
                      background: `linear-gradient(90deg, ${color}80, ${activeColor})`,
                    }}
                  />
                  <span
                    className="font-mono text-base"
                    style={{ color: activeColor }}
                  >
                    →
                  </span>
                  <div
                    className="h-px flex-1"
                    style={{
                      background: `linear-gradient(90deg, ${activeColor}, ${activeTarget.accentColor}80)`,
                    }}
                  />
                </div>
              </div>

              {/* Target */}
              <Link
                href={`/enneagram/archetype/${activeTarget.slug}`}
                className="flex flex-col items-end group"
              >
                <span
                  className="font-mono text-[8px] tracking-[0.3em] uppercase mb-1"
                  style={{ color: activeTarget.accentColor + "AA" }}
                >
                  Move Toward
                </span>
                <span
                  className="font-serif text-2xl font-medium group-hover:underline decoration-1 underline-offset-4"
                  style={{ color: activeTarget.accentColor }}
                >
                  {activeTarget.number} · {activeTarget.name.replace("The ", "")}
                </span>
              </Link>
            </div>
          </div>

          <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light max-w-2xl">
            {activeNarrative}
          </p>
        </div>

        {/* Characteristics */}
        <div className="mb-16 animate-slide-up delay-400">
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

        {(() => {
          const exemplars = getEnneagramExemplars(archetype.slug);
          if (!exemplars) return null;
          return (
            <div className="animate-slide-up delay-450">
              <ExemplarsTabs color={color} exemplars={exemplars} />
            </div>
          );
        })()}

        <CrossSystemResonance
          system="enneagram"
          slug={archetype.slug}
          accentColor={archetype.accentColor}
          delay="delay-500"
        />

        {/* Triad siblings */}
        <div className="animate-slide-up delay-500">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-[10px] tracking-[0.35em] text-muted uppercase">
              Other {triad.label} Types
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${triad.color}20, transparent)`,
              }}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {triadSiblings.map((s) => (
              <Link
                key={s.slug}
                href={`/enneagram/archetype/${s.slug}`}
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
                    {s.number}
                  </span>
                  <div>
                    <p
                      className="font-serif text-base font-medium"
                      style={{ color: s.accentColor }}
                    >
                      {s.name}
                    </p>
                    <p className="font-mono text-[9px] italic text-muted mt-0.5">
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
