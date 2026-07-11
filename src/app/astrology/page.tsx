"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ZODIAC_ELEMENTS, getAstrologyByElement } from "@/data/astrology/archetypes";
import { useTheme } from "@/components/ThemeProvider";
import { ZodiacArchetype } from "@/types/astrology";
import CanvasSkeleton from "@/components/shared/CanvasSkeleton";
import ZodiacWheel from "@/components/ZodiacWheel";

const AstrologyTotemCanvas = dynamic(
  () => import("@/components/AstrologyTotemCanvas"),
  { ssr: false, loading: () => <CanvasSkeleton /> }
);

export default function AstrologyHome() {
  const { theme } = useTheme();
  const light = theme === "light";
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen relative">
      {/* Hero */}
      <div className="px-6 pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="animate-slide-up">
            <p className="font-mono text-kicker tracking-display text-gold/80 uppercase mb-4">
              The Tropical Zodiac
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-text-primary tracking-tight leading-display mb-5">
              Twelve{" "}
              <span className={light ? "text-text-primary" : "text-gold glow-text-subtle animate-flicker"}>
                Signs
              </span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl font-light">
              Four elements crossed with three modalities make twelve characters.
              Read here not as a claim about the sky — that claim has failed every
              test — but as one of the oldest languages we have for psychological
              one-sidedness. A twentieth-century retrofit gave the signs their
              Jungian vocabulary; the resemblance to the other systems is borrowed,
              and that is exactly the point.{" "}
              <Link href="/astrology/about" className="underline decoration-gold/50 underline-offset-4 hover:text-gold transition-colors">
                Why it&apos;s here anyway.
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* The wheel */}
      <div className="px-6 pb-10">
        <div className="max-w-[520px] mx-auto animate-slide-up" style={{ animationDelay: "150ms" }}>
          <ZodiacWheel />
        </div>
        <div className="text-center mt-6 animate-slide-up" style={{ animationDelay: "250ms" }}>
          <Link
            href="/astrology/today"
            className="inline-flex items-center gap-2 font-mono text-label tracking-kicker uppercase text-gold hover:opacity-80 transition-opacity"
          >
            ☾ Today&apos;s reading for every sign →
          </Link>
        </div>
      </div>

      {/* Elements */}
      <div className="px-6 pb-24 pt-4">
        <div className="max-w-6xl mx-auto space-y-20">
          {ZODIAC_ELEMENTS.map((element, eIdx) => {
            const members = getAstrologyByElement(element.id);
            return (
              <section
                key={element.id}
                className="animate-slide-up"
                style={{ animationDelay: `${150 + eIdx * 120}ms` }}
              >
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      className="font-mono text-label tracking-kicker uppercase"
                      style={{ color: element.color }}
                    >
                      {element.label} · {element.tagline}
                    </span>
                    <div
                      className="h-px flex-1"
                      style={{
                        background: `linear-gradient(90deg, ${element.color}${light ? "30" : "18"}, transparent)`,
                      }}
                    />
                    <span className="font-mono text-kicker tracking-kicker text-muted uppercase">
                      {element.affectTint}
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl font-medium text-text-primary tracking-tight mb-2">
                    {element.temperament}
                  </h2>
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-2xl font-light">
                    {element.description}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {members.map((a: ZodiacArchetype, i) => {
                    const isHovered = hovered === a.slug;
                    return (
                      <Link
                        key={a.slug}
                        href={`/astrology/archetype/${a.slug}`}
                        className="group block animate-slide-up"
                        style={{ animationDelay: `${250 + eIdx * 120 + i * 60}ms` }}
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
                              className="font-mono text-kicker tracking-kicker uppercase"
                              style={{ color: element.color }}
                            >
                              {cap(a.modality)}
                            </span>
                            <span className="font-mono text-kicker tracking-kicker text-muted/70 uppercase ml-auto">
                              {a.dates}
                            </span>
                          </div>

                          <div className="w-full h-32 -mt-1 mb-2" aria-hidden>
                            <AstrologyTotemCanvas
                              slug={a.slug}
                              color={a.accentColor}
                              isHovered={isHovered}
                            />
                          </div>

                          <h3
                            className="font-serif text-xl md:text-2xl font-medium tracking-tight mb-2 transition-all duration-300 flex items-center gap-2"
                            style={{
                              color: light ? "var(--color-text-primary)" : a.accentColor,
                              textShadow:
                                isHovered && !light ? `0 0 16px ${a.accentColor}50` : "none",
                            }}
                          >
                            <span aria-hidden className="opacity-75">{a.glyph}</span>
                            {a.name}
                          </h3>

                          <p className="font-mono text-label italic text-text-secondary/80 mb-3 leading-relaxed">
                            &ldquo;{a.motto}&rdquo;
                          </p>

                          <div className="pt-3 border-t border-surface-light/30">
                            <p className="font-mono text-kicker tracking-label text-muted uppercase mb-1">
                              Ruling Planet
                            </p>
                            <p className="text-xs text-text-secondary leading-snug line-clamp-2">
                              {a.rulingPlanet}
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
              href="/astrology/about"
              className="inline-flex items-center gap-2 font-mono text-kicker tracking-label text-muted uppercase hover:text-gold transition-colors duration-300"
            >
              <span className="w-6 h-px bg-current" />
              The framework behind the twelve
              <span className="w-6 h-px bg-current" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
