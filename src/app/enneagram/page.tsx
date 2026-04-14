"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import {
  ENNEAGRAM_TRIADS,
  getEnneagramByTriad,
} from "@/data/enneagram/archetypes";
import { useTheme } from "@/components/ThemeProvider";
import { EnneagramArchetype } from "@/types/enneagram";
import EnneagramSymbol from "@/components/EnneagramSymbol";
import CanvasSkeleton from "@/components/shared/CanvasSkeleton";

const EnneagramTotemCanvas = dynamic(
  () => import("@/components/EnneagramTotemCanvas"),
  { ssr: false, loading: () => <CanvasSkeleton /> }
);

export default function EnneagramHome() {
  const { theme } = useTheme();
  const light = theme === "light";
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen relative">
      {/* Hero */}
      <div className="px-6 pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="animate-slide-up">
            <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-4">
              Riso &amp; Hudson - Enneagram Framework
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-text-primary tracking-tight leading-[1.05] mb-5">
              Nine{" "}
              <span className={light ? "text-text-primary" : "text-gold glow-text-subtle animate-flicker"}>
                Motivational Types
              </span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl font-light">
              If archetypes describe the roles we play, the Enneagram describes
              the motor beneath them - the core fear, core desire, and moving
              states of the psyche. Nine types, grouped into three centers of
              intelligence: Gut, Heart, and Head.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive symbol */}
      <div className="px-6 pb-16">
        <div className="max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: "150ms" }}>
          <EnneagramSymbol />
        </div>
      </div>

      {/* Triads */}
      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto space-y-20">
          {ENNEAGRAM_TRIADS.map((triad, tIdx) => {
            const members = getEnneagramByTriad(triad.id);
            return (
              <section
                key={triad.id}
                className="animate-slide-up"
                style={{ animationDelay: `${200 + tIdx * 120}ms` }}
              >
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      className="font-mono text-[10px] tracking-[0.35em] uppercase"
                      style={{ color: triad.color }}
                    >
                      {triad.label} Triad · {triad.tagline}
                    </span>
                    <div
                      className="h-px flex-1"
                      style={{
                        background: `linear-gradient(90deg, ${triad.color}${light ? "30" : "18"}, transparent)`,
                      }}
                    />
                    <span className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase">
                      {triad.dominantEmotion}
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl font-medium text-text-primary tracking-tight mb-2">
                    {triad.focalPoint}
                  </h2>
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-2xl font-light">
                    {triad.description}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {members.map((a: EnneagramArchetype, i) => {
                    const isHovered = hovered === a.slug;
                    return (
                      <Link
                        key={a.slug}
                        href={`/enneagram/archetype/${a.slug}`}
                        className="group block animate-slide-up"
                        style={{ animationDelay: `${300 + tIdx * 120 + i * 60}ms` }}
                        onMouseEnter={() => setHovered(a.slug)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <div
                          className="relative overflow-visible rounded-sm transition-all duration-500 h-full p-5"
                          style={{
                            background: `linear-gradient(145deg, ${a.accentColor}${light ? "0C" : "06"} 0%, var(--color-bg) 50%)`,
                            border: `1px solid ${isHovered ? a.accentColor + (light ? "40" : "30") : a.accentColor + (light ? "20" : "10")}`,
                            boxShadow: isHovered
                              ? light
                                ? `0 4px 28px rgba(0,0,0,0.08)`
                                : `0 0 32px ${a.accentColor}10`
                              : "none",
                          }}
                        >
                          <div
                            className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${a.accentColor}50, transparent)`,
                              opacity: isHovered ? 1 : 0,
                            }}
                          />

                          <div className="flex items-start justify-between mb-2">
                            <span
                              className="font-mono text-[9px] tracking-[0.25em] uppercase"
                              style={{ color: triad.color }}
                            >
                              Type {a.number}
                            </span>
                            <span className="font-mono text-[7px] tracking-[0.25em] text-muted/70 uppercase ml-auto">
                              {triad.label}
                            </span>
                          </div>

                          <div className="w-full h-32 -mt-1 mb-2" aria-hidden>
                            <EnneagramTotemCanvas
                              slug={a.slug}
                              color={a.accentColor}
                              isHovered={isHovered}
                            />
                          </div>

                          <h3
                            className="font-serif text-xl md:text-2xl font-medium tracking-tight mb-2 transition-all duration-300"
                            style={{
                              color: light ? "var(--color-text-primary)" : a.accentColor,
                              textShadow:
                                isHovered && !light
                                  ? `0 0 16px ${a.accentColor}50`
                                  : "none",
                            }}
                          >
                            {a.name}
                          </h3>

                          <p className="font-mono text-[10px] italic text-text-secondary/80 mb-3 leading-relaxed">
                            &ldquo;{a.motto}&rdquo;
                          </p>

                          <div className="pt-3 border-t border-surface-light/30">
                            <p className="font-mono text-[8px] tracking-[0.2em] text-muted uppercase mb-1">
                              Core Fear
                            </p>
                            <p className="text-xs text-text-secondary leading-snug line-clamp-2">
                              {a.coreFear}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}

          <div className="text-center pt-6">
            <Link
              href="/enneagram/about"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-muted uppercase hover:text-gold transition-colors duration-300"
            >
              <span className="w-6 h-px bg-current" />
              The framework behind the nine
              <span className="w-6 h-px bg-current" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
