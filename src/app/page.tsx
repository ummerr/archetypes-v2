"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FAMILIES } from "@/data/archetypes";
import TotemCanvas from "@/components/TotemCanvas";

export default function Home() {
  const router = useRouter();
  const [hoveredFamily, setHoveredFamily] = useState<string | null>(null);

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
                <span className="text-gold glow-text-subtle animate-flicker">
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
                  href={`/archetype/${family.man.slug}`}
                  className="group block animate-slide-up"
                  style={{ animationDelay: `${150 + i * 100}ms` }}
                  onMouseEnter={() => setHoveredFamily(family.id)}
                  onMouseLeave={() => setHoveredFamily(null)}
                >
                  <div
                    className="relative overflow-hidden rounded-sm transition-all duration-500"
                    style={{
                      background: `linear-gradient(145deg, ${family.color}06 0%, rgba(6,6,10,0.95) 40%, rgba(6,6,10,0.98) 100%)`,
                      border: `1px solid ${isHovered ? family.color + "30" : family.color + "10"}`,
                      boxShadow: isHovered
                        ? `0 0 40px ${family.color}08, 0 0 80px ${family.color}04, inset 0 1px 0 ${family.color}10`
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
                        {/* Shadow labels on the totem */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-crimson" />
                          <span className="font-mono text-[7px] tracking-wider text-crimson-light/80 uppercase">
                            {family.man.activeShadow.name}
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-3 flex items-center gap-1">
                          <span className="font-mono text-[7px] tracking-wider text-muted/80 uppercase">
                            {family.man.passiveShadow.name}
                          </span>
                          <div className="w-1.5 h-1.5 rounded-full bg-muted/80" />
                        </div>
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
                                background: `linear-gradient(90deg, ${family.color}15, transparent)`,
                              }}
                            />
                          </div>

                          {/* Name */}
                          <h2
                            className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-2 transition-all duration-300"
                            style={{
                              color: family.color,
                              textShadow: isHovered
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

                          {/* ─── Polarity system ───────── */}
                          <div className="space-y-2 mb-4">
                            {/* Fullness */}
                            <div className="flex items-start gap-2">
                              <div
                                className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                                style={{ background: family.color }}
                              />
                              <div>
                                <span
                                  className="font-mono text-[8px] tracking-[0.15em] uppercase"
                                  style={{ color: family.color + "CC" }}
                                >
                                  Fullness
                                </span>
                                <p className="text-text-secondary text-[10px] leading-snug mt-0.5">
                                  {family.man.fullness.description
                                    .split(".")
                                    .slice(0, 1)
                                    .join(".")}
                                  .
                                </p>
                              </div>
                            </div>

                            {/* Active shadow */}
                            <div className="flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full bg-crimson/60 mt-1.5 shrink-0" />
                              <div>
                                <span className="font-mono text-[8px] tracking-[0.15em] text-crimson-light uppercase">
                                  Active Shadow —{" "}
                                  {family.man.activeShadow.name}
                                </span>
                                <p className="text-text-secondary text-[10px] leading-snug mt-0.5">
                                  {family.man.activeShadow.traits[0]}
                                </p>
                              </div>
                            </div>

                            {/* Passive shadow */}
                            <div className="flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full bg-muted/40 mt-1.5 shrink-0" />
                              <div>
                                <span className="font-mono text-[8px] tracking-[0.15em] text-muted uppercase">
                                  Passive Shadow —{" "}
                                  {family.man.passiveShadow.name}
                                </span>
                                <p className="text-text-secondary text-[10px] leading-snug mt-0.5">
                                  {family.man.passiveShadow.traits[0]}
                                </p>
                              </div>
                            </div>
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

          {/* System overview link */}
          <div className="max-w-6xl mx-auto mt-8 text-center">
            <Link
              href="/about"
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
