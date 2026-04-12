"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ALL_HEROSJOURNEY } from "@/data/herosjourney/archetypes";
import { JOURNEY_ACTS } from "@/data/herosjourney/stages";
import { useTheme } from "@/components/ThemeProvider";

const HeroJourneyWheel = dynamic(
  () => import("@/components/HeroJourneyWheel"),
  { ssr: false }
);

export default function HerosJourneyHome() {
  const { theme } = useTheme();
  const light = theme === "light";
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen relative">
      {/* Hero */}
      <div className="px-6 pt-24 pb-10 md:pt-32 md:pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="animate-slide-up">
            <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-4">
              Campbell &amp; Vogler — The Monomyth
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-text-primary tracking-tight leading-[1.05] mb-5">
              The{" "}
              <span
                className={
                  light
                    ? "text-text-primary"
                    : "text-gold glow-text-subtle animate-flicker"
                }
              >
                Hero&rsquo;s Journey
              </span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl font-light">
              Twelve stages carved into a single circle. Eight recurring masks
              that step forward when the story calls them. Stages are places the
              psyche passes through; masks are the roles it wears to get there.
            </p>
          </div>
        </div>
      </div>

      {/* Wheel */}
      <div className="px-6 pb-6 animate-slide-up delay-200">
        <div className="max-w-6xl mx-auto">
          <HeroJourneyWheel />
          <p className="text-center font-mono text-[9px] tracking-[0.25em] text-muted uppercase mt-2">
            Hover a stage to see which masks act there · hover a mask to see where
          </p>
        </div>
      </div>

      {/* Act context */}
      <div className="px-6 pb-16 animate-slide-up delay-300">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          {JOURNEY_ACTS.map((act) => (
            <div
              key={act.id}
              className="rounded-sm p-5"
              style={{
                background: `linear-gradient(145deg, ${act.color}${light ? "10" : "08"}, transparent)`,
                border: `1px solid ${act.color}${light ? "30" : "20"}`,
              }}
            >
              <p
                className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2"
                style={{ color: act.color }}
              >
                {act.label}
              </p>
              <p
                className="font-serif text-lg font-medium mb-2"
                style={{ color: act.color }}
              >
                {act.tagline}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed font-light">
                {act.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Archetype cards */}
      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] tracking-[0.35em] text-gold/80 uppercase">
              Eight Masks
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, var(--color-gold)${light ? "30" : "18"}, transparent)`,
              }}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALL_HEROSJOURNEY.map((a, i) => {
              const isHovered = hovered === a.slug;
              return (
                <Link
                  key={a.slug}
                  href={`/heros-journey/archetype/${a.slug}`}
                  className="group block animate-slide-up"
                  style={{ animationDelay: `${300 + i * 60}ms` }}
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

                    <div className="flex items-start justify-between mb-3">
                      <span
                        className="font-serif text-4xl leading-none"
                        style={{ color: a.accentColor }}
                        aria-hidden
                      >
                        {a.symbol}
                      </span>
                      <span className="font-mono text-[7px] tracking-[0.25em] text-muted/70 uppercase">
                        {a.role.replace("-", " ")}
                      </span>
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

                    <p className="font-mono text-[10px] italic text-text-secondary/80 mb-3 leading-relaxed line-clamp-2">
                      &ldquo;{a.motto}&rdquo;
                    </p>

                    <div className="pt-3 border-t border-surface-light/30">
                      <p className="font-mono text-[8px] tracking-[0.2em] text-muted uppercase mb-1">
                        Core Desire
                      </p>
                      <p className="text-xs text-text-secondary leading-snug line-clamp-2">
                        {a.coreDesire}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center pt-12">
            <Link
              href="/heros-journey/about"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-muted uppercase hover:text-gold transition-colors duration-300"
            >
              <span className="w-6 h-px bg-current" />
              Campbell, Vogler, and the critiques
              <span className="w-6 h-px bg-current" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
