"use client";

import Link from "next/link";
import { useState } from "react";
import { SYSTEMS } from "@/data/systems";
import { useTheme } from "@/components/ThemeProvider";

export default function Home() {
  const { theme } = useTheme();
  const light = theme === "light";
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen relative">
      <div className="relative">
        {/* Hero */}
        <div className="px-6 pt-24 pb-12 md:pt-32 md:pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="animate-slide-up">
              <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-4">
                Archetypal Systems
              </p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-text-primary tracking-tight leading-[1.05] mb-5">
                Maps of the{" "}
                <span className="text-gold glow-text-subtle animate-flicker">
                  Inner World
                </span>
              </h1>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl font-light">
                Each system offers a different lens onto the universal patterns
                that shape human psyche. Explore one, or compare across
                traditions.
              </p>
            </div>
          </div>
        </div>

        {/* Systems grid */}
        <div className="px-6 pb-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5">
            {SYSTEMS.map((system, i) => {
              const isHovered = hovered === system.id;
              const isLive = system.status === "live";
              const accent = light ? system.accentLight : system.accent;
              const Card = (
                <div
                  className="relative overflow-visible rounded-sm transition-all duration-500 h-full"
                  style={{
                    background: `linear-gradient(145deg, ${accent}${light ? "0C" : "06"} 0%, var(--color-bg) 40%, var(--color-bg) 100%)`,
                    border: `1px ${isLive ? "solid" : "dashed"} ${
                      isHovered
                        ? accent + (light ? "40" : "30")
                        : accent + (light ? "20" : "10")
                    }`,
                    boxShadow: isHovered && isLive
                      ? light
                        ? `0 4px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)`
                        : `0 0 40px ${accent}08, 0 0 80px ${accent}04, inset 0 1px 0 ${accent}10`
                      : light
                        ? `0 1px 4px rgba(0,0,0,0.04)`
                        : "none",
                    opacity: isLive ? 1 : 0.55,
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accent}40, transparent)`,
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  <div className="p-6 md:p-8 flex flex-col h-full">
                    {/* Header row */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-[8px] tracking-[0.25em] text-muted uppercase">
                        {system.framework}
                      </span>
                      <div
                        className="h-px flex-1"
                        style={{
                          background: `linear-gradient(90deg, ${accent}${light ? "30" : "15"}, transparent)`,
                        }}
                      />
                      <span
                        className="font-mono text-[8px] tracking-[0.2em] uppercase"
                        style={{ color: isLive ? accent : "var(--color-muted)" }}
                      >
                        {isLive ? `${system.count} types` : "Coming Soon"}
                      </span>
                    </div>

                    {/* Name */}
                    <h2
                      className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-2 transition-all duration-300"
                      style={{
                        color: accent,
                        textShadow:
                          isHovered && !light && isLive
                            ? `0 0 20px ${accent}40`
                            : "none",
                      }}
                    >
                      {system.name}
                    </h2>

                    <p className="font-serif text-lg text-text-secondary italic mb-3">
                      {system.subtitle}
                    </p>

                    <p className="text-text-secondary text-sm leading-relaxed mb-5 font-light">
                      {system.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-surface-light/30 flex items-center justify-between">
                      <span className="font-mono text-[9px] tracking-[0.2em] text-muted uppercase">
                        {isLive ? "Enter system" : "In development"}
                      </span>
                      {isLive && (
                        <div className="text-muted/0 group-hover:text-muted/60 transition-all duration-300 group-hover:translate-x-0.5">
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
                      )}
                    </div>
                  </div>
                </div>
              );

              const commonProps = {
                key: system.id,
                className: "group block animate-slide-up",
                style: { animationDelay: `${150 + i * 100}ms` },
                onMouseEnter: () => setHovered(system.id),
                onMouseLeave: () => setHovered(null),
              };

              return isLive && system.href ? (
                <Link href={system.href} {...commonProps}>
                  {Card}
                </Link>
              ) : (
                <div {...commonProps} aria-disabled="true">
                  {Card}
                </div>
              );
            })}
          </div>

          <div className="max-w-6xl mx-auto mt-16 text-center">
            <p className="font-mono text-[9px] tracking-[0.2em] text-muted uppercase">
              <span className="inline-block w-6 h-px bg-current align-middle mr-3" />
              More systems arriving
              <span className="inline-block w-6 h-px bg-current align-middle ml-3" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
