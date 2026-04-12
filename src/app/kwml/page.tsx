"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FAMILIES } from "@/data/kwml/archetypes";
import TotemCanvas from "@/components/TotemCanvas";
import ShadowPolarityMini from "@/components/ShadowPolarityMini";
import { useTheme } from "@/components/ThemeProvider";

export default function Home() {
  const router = useRouter();
  const [hoveredFamily, setHoveredFamily] = useState<string | null>(null);
  const { theme } = useTheme();
  const light = theme === "light";

  return (
    <div className="min-h-screen relative">
      {/* ─── Content ───────────────────────────────── */}
      <div className="relative">
        {/* Hero */}
        <div className="px-6 pt-24 pb-12 md:pt-32 md:pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="animate-slide-up">
              <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-4">
                Moore &amp; Gillette — Archetypal Framework
              </p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-text-primary tracking-tight leading-[1.05] mb-5">
                Archetypes of the{" "}
                <span className={`${light ? "text-text-primary" : "text-gold glow-text-subtle animate-flicker"}`}>
                  Mature Masculine
                </span>
              </h1>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl font-light">
                Four primal energy patterns shape the masculine psyche. Each
                holds a fullness and two shadow poles — the inflated and the
                deflated. Boy becomes man through initiation.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Archetype cards ───────────────────────── */}
        <div className="px-6 pb-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5">
            {FAMILIES.map((family, i) => {
              const isHovered = hoveredFamily === family.id;
              return (
                <Link
                  key={family.id}
                  href={`/kwml/archetype/${family.man.slug}`}
                  className="group block animate-slide-up"
                  style={{ animationDelay: `${150 + i * 100}ms` }}
                  onMouseEnter={() => setHoveredFamily(family.id)}
                  onMouseLeave={() => setHoveredFamily(null)}
                >
                  <div
                    className="relative overflow-visible rounded-sm transition-all duration-500"
                    style={{
                      background: `linear-gradient(145deg, ${family.color}${light ? "0C" : "06"} 0%, var(--color-bg) 40%, var(--color-bg) 100%)`,
                      border: `1px solid ${isHovered ? family.color + (light ? "40" : "30") : family.color + (light ? "20" : "10")}`,
                      boxShadow: isHovered
                        ? light
                          ? `0 4px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)`
                          : `0 0 40px ${family.color}08, 0 0 80px ${family.color}04, inset 0 1px 0 ${family.color}10`
                        : light
                          ? `0 1px 4px rgba(0,0,0,0.04)`
                          : "none",
                    }}
                  >
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${family.color}40, transparent)`,
                        opacity: isHovered ? 1 : 0,
                      }}
                    />

                    <div className="flex flex-col md:flex-row">
                      {/* ─── 3D Totem ──────────────────── */}
                      <div className="relative w-full md:w-56 h-56 md:h-auto shrink-0">
                        <TotemCanvas
                          family={family.id}
                          color={family.color}
                          isHovered={isHovered}
                        />
                      </div>

                      {/* ─── Card content ──────────────── */}
                      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                        {/* Header */}
                        <div>
                          {/* Family + maturity badge */}
                          <div className="flex items-center gap-3 mb-3">
                            <span className="font-mono text-[8px] tracking-[0.25em] text-muted uppercase">
                              Man Psychology
                            </span>
                            <div
                              className="h-px flex-1"
                              style={{
                                background: `linear-gradient(90deg, ${family.color}${light ? "30" : "15"}, transparent)`,
                              }}
                            />
                          </div>

                          {/* Name */}
                          <h2
                            className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-2 transition-all duration-300"
                            style={{
                              color: light ? "var(--color-text-primary)" : family.color,
                              textShadow: isHovered && !light
                                ? `0 0 20px ${family.color}40`
                                : "none",
                            }}
                          >
                            {family.man.name}
                          </h2>

                          {/* Description */}
                          <p className="text-text-secondary text-xs leading-relaxed mb-4 line-clamp-2">
                            {family.man.description.split(".")[0]}.
                          </p>

                          {/* ─── Shadow polarity 3D ───────── */}
                          <div className="mb-3 -mx-2">
                            <ShadowPolarityMini
                              color={family.color}
                              fullnessName={family.man.name}
                              activeShadowName={family.man.activeShadow.name}
                              passiveShadowName={family.man.passiveShadow.name}
                            />
                          </div>
                        </div>

                        {/* Footer — Boy → Man evolution */}
                        <div className="flex items-center justify-between pt-3 border-t border-surface-light/30">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-[8px] tracking-wider text-muted uppercase">
                              {family.boy.name}
                            </span>
                            <div className="flex items-center gap-1">
                              <div className="w-5 h-px bg-muted/15" />
                              <span className="font-mono text-[7px] tracking-[0.15em] text-gold/60 uppercase">
                                initiation
                              </span>
                              <div className="w-5 h-px bg-muted/15" />
                              <svg
                                width="6"
                                height="8"
                                viewBox="0 0 6 8"
                                fill="none"
                                className="text-muted/20"
                              >
                                <path
                                  d="M1 1L5 4L1 7"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <span
                              className="font-mono text-[8px] tracking-wider uppercase"
                              style={{ color: family.color + "CC" }}
                            >
                              {family.man.name}
                            </span>
                          </div>

                          {/* Enter arrow */}
                          <div
                            className="text-muted/0 group-hover:text-muted/50 transition-all duration-300 group-hover:translate-x-0.5"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M6 4L10 8L6 12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ─── Boy Within the Man — interactive bridge ───────────── */}
          <div className="max-w-6xl mx-auto mt-20">
            <Link
              href="/kwml/boy-within-man"
              className="group block animate-slide-up"
              style={{ animationDelay: "550ms" }}
            >
              <div
                className="relative overflow-hidden rounded-sm transition-all duration-500"
                style={{
                  background: light
                    ? `linear-gradient(135deg, var(--color-gold)10 0%, var(--color-bg) 60%)`
                    : `linear-gradient(135deg, var(--color-gold)08 0%, var(--color-bg) 60%)`,
                  border: `1px solid var(--color-gold)${light ? "30" : "18"}`,
                }}
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[8px] tracking-[0.25em] text-gold/80 uppercase">
                        Interactive
                      </span>
                      <div
                        className="h-px flex-1"
                        style={{
                          background: `linear-gradient(90deg, var(--color-gold)${light ? "30" : "15"}, transparent)`,
                        }}
                      />
                    </div>
                    <h2
                      className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      The Boy{" "}
                      <span
                        className={light ? "" : "text-gold glow-text-subtle"}
                        style={light ? { color: "var(--color-text-primary)" } : undefined}
                      >
                        Within
                      </span>{" "}
                      the Man
                    </h2>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-2xl font-light">
                      Drag the slider to feel what happens when uninitiated boy
                      psychology takes the wheel of the adult psyche. Nested
                      triangles, shadow voices, behavioral signs.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-gold uppercase shrink-0 group-hover:translate-x-0.5 transition-transform duration-300">
                    Enter experience
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 4L10 8L6 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* ─── Boy Psychology section ───────────── */}
          <div className="max-w-6xl mx-auto mt-20 mb-12">
            <div className="animate-slide-up delay-500">
              <div className="flex items-center gap-4 mb-3">
                <div
                  className="h-px flex-1"
                  style={{
                    background: `linear-gradient(90deg, transparent, var(--color-gold)${light ? "30" : "15"}, transparent)`,
                  }}
                />
                <p className="font-mono text-[9px] tracking-[0.4em] text-gold/60 uppercase">
                  Before Initiation
                </p>
                <div
                  className="h-px flex-1"
                  style={{
                    background: `linear-gradient(90deg, transparent, var(--color-gold)${light ? "30" : "15"}, transparent)`,
                  }}
                />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-text-primary tracking-tight leading-[1.05] mb-3 text-center">
                Boy{" "}
                <span
                  className={light ? "" : "animate-flicker"}
                  style={{
                    color: light
                      ? "var(--color-text-primary)"
                      : "var(--color-gold-bright)",
                    opacity: light ? 1 : 0.7,
                  }}
                >
                  Psychology
                </span>
              </h2>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xl mx-auto text-center font-light mb-10">
                The immature patterns every man carries within. Each boy
                archetype is the seed of its mature counterpart — powerful when
                integrated, destructive when it possesses the adult ego.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {FAMILIES.map((family, i) => {
                const boy = family.boy;
                const isBoyHovered = hoveredFamily === `boy-${family.id}`;
                return (
                  <Link
                    key={`boy-${family.id}`}
                    href={`/kwml/archetype/${boy.slug}`}
                    className="group block animate-slide-up"
                    style={{ animationDelay: `${600 + i * 100}ms` }}
                    onMouseEnter={() => setHoveredFamily(`boy-${family.id}`)}
                    onMouseLeave={() => setHoveredFamily(null)}
                  >
                    <div
                      className="relative overflow-visible rounded-sm transition-all duration-500"
                      style={{
                        background: light
                          ? `linear-gradient(145deg, ${family.color}08 0%, var(--color-bg) 40%)`
                          : `linear-gradient(145deg, ${family.color}04 0%, var(--color-bg) 40%)`,
                        border: `1px dashed ${isBoyHovered ? family.color + (light ? "40" : "30") : family.color + (light ? "18" : "0A")}`,
                        boxShadow: isBoyHovered
                          ? light
                            ? `0 4px 32px rgba(0,0,0,0.06)`
                            : `0 0 30px ${family.color}06`
                          : "none",
                      }}
                    >
                      {/* Top accent — dashed for unformed quality */}
                      <div
                        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${family.color}30, transparent)`,
                          opacity: isBoyHovered ? 1 : 0,
                        }}
                      />

                      <div className="p-5 md:p-6">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono text-[8px] tracking-[0.25em] text-muted/70 uppercase">
                            Boy Psychology
                          </span>
                          <div
                            className="h-px flex-1"
                            style={{
                              background: `linear-gradient(90deg, ${family.color}${light ? "25" : "10"}, transparent)`,
                            }}
                          />
                          <span
                            className="font-mono text-[7px] tracking-[0.15em] uppercase"
                            style={{ color: `${family.color}60` }}
                          >
                            {family.label} Family
                          </span>
                        </div>

                        {/* Name */}
                        <h3
                          className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-2 transition-all duration-300"
                          style={{
                            color: light ? "var(--color-text-primary)" : family.color,
                            opacity: isBoyHovered ? 1 : light ? 0.95 : 0.8,
                            textShadow:
                              isBoyHovered && !light
                                ? `0 0 20px ${family.color}30`
                                : "none",
                          }}
                        >
                          {boy.name}
                        </h3>

                        {/* Description */}
                        <p className="text-text-secondary text-xs leading-relaxed mb-4 line-clamp-2">
                          {boy.description.split(".")[0]}.
                        </p>

                        {/* Shadow polarity mini */}
                        <div className="mb-3 -mx-2">
                          <ShadowPolarityMini
                            color={family.color}
                            fullnessName={boy.name}
                            activeShadowName={boy.activeShadow.name}
                            passiveShadowName={boy.passiveShadow.name}
                          />
                        </div>

                        {/* Footer — evolution arrow */}
                        <div className="flex items-center justify-between pt-3 border-t border-surface-light/30">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="font-mono text-[8px] tracking-wider uppercase"
                              style={{ color: `${family.color}99` }}
                            >
                              {boy.name}
                            </span>
                            <div className="flex items-center gap-1">
                              <div className="w-5 h-px bg-muted/15" />
                              <span className="font-mono text-[7px] tracking-[0.15em] text-gold/60 uppercase">
                                initiation
                              </span>
                              <div className="w-5 h-px bg-muted/15" />
                              <svg
                                width="6"
                                height="8"
                                viewBox="0 0 6 8"
                                fill="none"
                                className="text-muted/20"
                              >
                                <path
                                  d="M1 1L5 4L1 7"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <span className="font-mono text-[8px] tracking-wider text-muted uppercase">
                              {family.man.name}
                            </span>
                          </div>

                          {/* Enter arrow */}
                          <div className="text-muted/0 group-hover:text-muted/50 transition-all duration-300 group-hover:translate-x-0.5">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M6 4L10 8L6 12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* System overview link */}
          <div className="max-w-6xl mx-auto mt-8 text-center">
            <Link
              href="/kwml/about"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-muted uppercase hover:text-gold transition-colors duration-300"
            >
              <span className="w-6 h-px bg-current" />
              Explore the full quaternary system
              <span className="w-6 h-px bg-current" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
