"use client";

import Link from "next/link";
import { MbtiArchetype, TemperamentGroup } from "@/types/mbti";
import { getFunction } from "@/data/mbti/functions";
import { useTheme } from "@/components/ThemeProvider";
import MbtiGlyph from "@/components/MbtiGlyph";
import CrossSystemResonance from "@/components/resonance/CrossSystemResonance";
import ArchetypeShareCard from "@/components/viz/ArchetypeShareCard";
import CrossSystemResonanceInline from "@/components/resonance/CrossSystemResonanceInline";
import ExemplarsTabs from "@/components/shared/ExemplarsTabs";
import { getMbtiExemplars } from "@/data/mbti/exemplars";

interface Props {
  archetype: MbtiArchetype;
  temperament: TemperamentGroup;
  siblings: MbtiArchetype[];
  previous: MbtiArchetype | null;
  next: MbtiArchetype | null;
  variant?: "page" | "modal";
}

const ROLE_LABEL: Record<string, string> = {
  Hero: "Hero · drives the personality, nearly automatic",
  Parent: "Parent · the balancing co-pilot",
  Child: "Child · relief, play, developing with time",
  Aspirational: "Aspirational · blind spot, stress-grip, long-term growth edge",
};

export default function MbtiDetailClient({
  archetype,
  temperament,
  siblings,
  previous,
  next,
  variant = "page",
}: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const color = light ? temperament.secondary : temperament.primary;
  const isModal = variant === "modal";

  const dichotomies: [string, string][] = [
    [archetype.dichotomies.ei, archetype.dichotomies.ei === "E" ? "Extraversion" : "Introversion"],
    [archetype.dichotomies.sn, archetype.dichotomies.sn === "S" ? "Sensing" : "Intuition"],
    [archetype.dichotomies.tf, archetype.dichotomies.tf === "T" ? "Thinking" : "Feeling"],
    [archetype.dichotomies.jp, archetype.dichotomies.jp === "J" ? "Judging" : "Perceiving"],
  ];

  return (
    <div
      className={
        isModal ? "px-6 pt-10 pb-14" : "min-h-screen px-6 pt-24 pb-24 md:pt-32"
      }
    >
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-6 animate-slide-up flex-wrap"
        >
          <Link
            href="/mbti"
            className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase hover:text-gold transition-colors"
          >
            Myers-Briggs
          </Link>
          <span className="text-muted/40 font-mono text-[10px]">/</span>
          <span
            className="font-mono text-[9px] tracking-[0.25em] uppercase"
            style={{ color }}
          >
            {temperament.label}
          </span>
          <span className="text-muted/40 font-mono text-[10px]">/</span>
          <span
            aria-current="page"
            className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase"
          >
            {archetype.code}
          </span>
        </nav>

        {/* Hero */}
        <div className="mb-14 animate-slide-up delay-100">
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <MbtiGlyph archetype={archetype} size="lg" ambient />
            </div>

            <div className="flex-1 min-w-0 pt-1">
              <p
                className="font-mono text-[10px] tracking-[0.35em] uppercase mb-2"
                style={{ color: color + (light ? "DD" : "CC") }}
              >
                {temperament.label} · {temperament.letters}
              </p>
              <h1
                className="font-serif text-5xl md:text-6xl font-medium tracking-tight leading-[1.05]"
                style={{
                  color: light ? "var(--color-text-primary)" : color,
                  textShadow: !light ? `0 0 24px ${color}40` : "none",
                }}
              >
                {archetype.nickname}
              </h1>
              <p className="font-serif text-xl md:text-2xl italic text-text-secondary/90 mt-3 mb-4">
                {archetype.code} · {archetype.alternateName}
              </p>

              {/* Dichotomy chips */}
              <div className="flex flex-wrap gap-2 mb-5">
                {dichotomies.map(([letter, label]) => (
                  <span
                    key={letter + label}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-sm"
                    style={{
                      border: `1px solid ${color}${light ? "30" : "22"}`,
                      background: `${color}${light ? "0E" : "0A"}`,
                    }}
                  >
                    <span
                      className="font-mono text-xs font-semibold"
                      style={{ color: color + (light ? "EE" : "DD") }}
                    >
                      {letter}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted">
                      {label}
                    </span>
                  </span>
                ))}
              </div>

              <p className="font-serif text-lg md:text-xl italic text-text-secondary mt-2 mb-4">
                &ldquo;{archetype.motto}&rdquo;
              </p>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light">
                {archetype.description}
              </p>

              <CrossSystemResonanceInline system="mbti" slug={archetype.slug} />
            </div>
          </div>
        </div>

        {/* Cognitive stack */}
        <div className="mb-16 animate-slide-up delay-200">
          <div className="flex items-center gap-4 mb-6">
            <span
              className="font-mono text-[10px] tracking-[0.35em] uppercase"
              style={{ color }}
            >
              Cognitive Stack
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${color}${light ? "30" : "18"}, transparent)`,
              }}
            />
            <span className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase">
              Jungian Type Dynamics
            </span>
          </div>

          <div className="space-y-3">
            {archetype.stack.map((entry, i) => {
              const fn = getFunction(entry.code);
              const opacity = 1 - i * 0.18;
              return (
                <div
                  key={entry.code}
                  className="flex gap-5 p-5 rounded-sm"
                  style={{
                    background: `linear-gradient(120deg, ${color}${light ? "0C" : "08"}, transparent 70%)`,
                    border: `1px solid ${color}${light ? "25" : "16"}`,
                    borderLeft: `3px solid ${color}`,
                    borderLeftColor: `${color}`,
                    opacity: 0.45 + opacity * 0.55,
                  }}
                >
                  <div className="flex-shrink-0 flex flex-col items-center w-20">
                    <span
                      className="font-mono text-[8px] tracking-[0.3em] uppercase text-muted"
                    >
                      {entry.position}
                    </span>
                    <span
                      className="font-serif text-4xl font-medium mt-1"
                      style={{ color: light ? "var(--color-text-primary)" : color }}
                    >
                      {entry.code}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="font-mono text-[9px] tracking-[0.25em] uppercase mb-1"
                      style={{ color: color + (light ? "CC" : "AA") }}
                    >
                      {ROLE_LABEL[entry.role]}
                    </p>
                    <h3 className="font-serif text-xl font-medium tracking-tight">
                      {fn.name} <span className="text-text-secondary/70 italic font-normal">- {fn.nickname}</span>
                    </h3>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed font-light mt-2">
                      {fn.blurb}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths & Shadows */}
        <div className="mb-16 grid md:grid-cols-2 gap-4 animate-slide-up delay-300">
          <div
            className="rounded-sm p-5"
            style={{
              background: `linear-gradient(160deg, ${color}14, transparent)`,
              border: `1px solid ${color}${light ? "30" : "22"}`,
            }}
          >
            <p
              className="font-mono text-[9px] tracking-[0.3em] uppercase mb-3"
              style={{ color: color + (light ? "EE" : "CC") }}
            >
              Strengths
            </p>
            <ul className="space-y-2">
              {archetype.strengths.map((s) => (
                <li key={s} className="text-text-secondary text-sm leading-relaxed font-light flex gap-2">
                  <span style={{ color }}>◆</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-sm p-5"
            style={{
              background: `linear-gradient(160deg, #C0392B14, transparent)`,
              border: `1px solid #C0392B${light ? "30" : "22"}`,
            }}
          >
            <p
              className="font-mono text-[9px] tracking-[0.3em] uppercase mb-3"
              style={{ color: light ? "#7E2018" : "#E74C3C" }}
            >
              Shadows
            </p>
            <ul className="space-y-2">
              {archetype.shadows.map((s) => (
                <li key={s} className="text-text-secondary text-sm leading-relaxed font-light flex gap-2">
                  <span style={{ color: light ? "#7E2018" : "#E74C3C" }}>◇</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {(() => {
          const exemplars = getMbtiExemplars(archetype.slug);
          if (!exemplars) return null;
          return (
            <div className="animate-slide-up delay-350">
              <ExemplarsTabs color={color} exemplars={exemplars} />
            </div>
          );
        })()}

        <CrossSystemResonance
          system="mbti"
          slug={archetype.slug}
          accentColor={color}
          delay="delay-400"
        />

        <ArchetypeShareCard
          system="mbti"
          slug={archetype.slug}
          displayName={`${archetype.code} — ${archetype.nickname}`}
          className="mt-10 animate-slide-up delay-500"
        />

        {/* Prev / Next */}
        <div className="mb-16 animate-slide-up delay-400">
          <div className="flex items-center gap-4 mb-5">
            <span
              className="font-mono text-[10px] tracking-[0.35em] uppercase"
              style={{ color }}
            >
              The Sixteen
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
                href={`/mbti/archetype/${previous.slug}`}
                className="group block rounded-sm p-4 transition-all duration-300"
                style={{
                  border: `1px solid ${color}${light ? "25" : "18"}`,
                  background: `linear-gradient(145deg, ${color}08, transparent)`,
                }}
              >
                <p className="font-mono text-[8px] tracking-[0.3em] text-muted uppercase mb-2">
                  ← Previous Type
                </p>
                <p
                  className="font-serif text-xl font-medium"
                  style={{ color: light ? "var(--color-text-primary)" : color }}
                >
                  {previous.code} · {previous.nickname}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/mbti/archetype/${next.slug}`}
                className="group block rounded-sm p-4 transition-all duration-300 sm:text-right"
                style={{
                  border: `1px solid ${color}${light ? "25" : "18"}`,
                  background: `linear-gradient(145deg, ${color}08, transparent)`,
                }}
              >
                <p className="font-mono text-[8px] tracking-[0.3em] text-muted uppercase mb-2">
                  Next Type →
                </p>
                <p
                  className="font-serif text-xl font-medium"
                  style={{ color: light ? "var(--color-text-primary)" : color }}
                >
                  {next.code} · {next.nickname}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Temperament siblings */}
        {siblings.length > 0 && (
          <div className="animate-slide-up delay-500">
            <div className="flex items-center gap-4 mb-5">
              <span
                className="font-mono text-[10px] tracking-[0.35em] uppercase"
                style={{ color }}
              >
                Other {temperament.label}
              </span>
              <div
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(90deg, ${color}20, transparent)`,
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/mbti/archetype/${s.slug}`}
                  className="group block rounded-sm p-3 transition-all duration-300"
                  style={{
                    border: `1px solid ${color}${light ? "25" : "15"}`,
                    background: `linear-gradient(145deg, ${color}${light ? "08" : "06"}, transparent)`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <MbtiGlyph archetype={s} size="sm" />
                    <div className="min-w-0">
                      <p
                        className="font-mono text-[8px] tracking-[0.3em] uppercase mb-0.5"
                        style={{ color: color + "CC" }}
                      >
                        {s.code}
                      </p>
                      <p
                        className="font-serif text-base font-medium truncate"
                        style={{
                          color: light ? "var(--color-text-primary)" : color,
                        }}
                      >
                        {s.nickname}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
