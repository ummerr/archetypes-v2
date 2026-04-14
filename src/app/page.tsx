"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SYSTEMS } from "@/data/systems";
import { PRACTICE_LINKS, ATLAS_LINKS, ABOUT_LINKS } from "@/data/nav";
import type { SystemId } from "@/data/resonance";
import { useTheme } from "@/components/ThemeProvider";
import Particles from "@/components/Particles";
import ResonanceConstellation from "@/components/home/ResonanceConstellation";
import ClusterRibbon from "@/components/home/ClusterRibbon";
import {
  CLUSTER_CHIPS,
  clustersContainingSystem,
  systemsForCluster,
} from "@/lib/home-resonance";

type Hover =
  | { kind: "system"; id: SystemId }
  | { kind: "cluster"; id: string }
  | null;

export default function Home() {
  const { theme } = useTheme();
  const light = theme === "light";
  const [hover, setHover] = useState<Hover>(null);

  const focusSystem: SystemId | null = hover?.kind === "system" ? hover.id : null;
  const focusCluster: string | null = hover?.kind === "cluster" ? hover.id : null;

  const activeSystems = useMemo<Set<SystemId> | null>(() => {
    if (!hover) return null;
    if (hover.kind === "system") return new Set<SystemId>([hover.id]);
    return new Set<SystemId>(systemsForCluster(hover.id));
  }, [hover]);

  const activeClusters = useMemo<Set<string> | null>(() => {
    if (!hover) return null;
    if (hover.kind === "cluster") return new Set<string>([hover.id]);
    return new Set<string>(clustersContainingSystem(hover.id));
  }, [hover]);

  return (
    <div className="min-h-screen relative">
      <div className="relative">
        {/* Hero */}
        <div className="px-6 pt-24 pb-10 md:pt-32 md:pb-14 relative">
          <div className="absolute inset-0 pointer-events-none opacity-60 motion-safe:block motion-reduce:hidden">
            <Particles color={light ? "#8A6A20" : "#D4AF37"} count={18} />
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-14 items-center relative">
            <div className="animate-slide-up">
              <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-4">
                Archetypal Systems
              </p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-text-primary tracking-tight leading-[1.05] mb-5">
                Maps of the{" "}
                <span className={light ? "text-text-primary" : "text-gold glow-text-subtle animate-flicker"}>
                  Inner World
                </span>
              </h1>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl font-light">
                Each system offers a different lens onto the universal patterns
                that shape human psyche. Explore one, or trace the shared
                currents that run between them.
              </p>
            </div>
            <div className="animate-slide-up delay-200 w-full flex justify-center md:justify-end">
              <ResonanceConstellation
                focusSystem={focusSystem}
                activeSystems={activeSystems}
                onHoverSystem={(id) =>
                  setHover(id ? { kind: "system", id } : null)
                }
              />
            </div>
          </div>
        </div>

        <ClusterRibbon
          focusCluster={focusCluster}
          focusSystem={focusSystem}
          onHoverCluster={(id) =>
            setHover(id ? { kind: "cluster", id } : null)
          }
        />

        {/* Systems grid */}
        <div className="px-6 pb-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5">
            {SYSTEMS.map((system, i) => {
              const sid = system.id as SystemId;
              const isFocused = focusSystem === sid;
              const isInCluster = activeSystems ? activeSystems.has(sid) : true;
              const isLive = system.status === "live";
              const accent = light ? system.accentLight : system.accent;
              const dimmed = (focusSystem && !isFocused) || (focusCluster && !isInCluster);
              const lit = isFocused || (focusCluster && isInCluster);
              const Card = (
                <div
                  className="relative overflow-visible rounded-sm transition-all duration-500 h-full"
                  style={{
                    background: `linear-gradient(145deg, ${accent}${light ? "0C" : "06"} 0%, var(--color-bg) 40%, var(--color-bg) 100%)`,
                    border: `1px ${isLive ? "solid" : "dashed"} ${
                      lit
                        ? accent + (light ? "60" : "45")
                        : accent + (light ? "20" : "10")
                    }`,
                    boxShadow: lit && isLive
                      ? light
                        ? `0 4px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)`
                        : `0 0 40px ${accent}14, 0 0 80px ${accent}08, inset 0 1px 0 ${accent}10`
                      : light
                        ? `0 1px 4px rgba(0,0,0,0.04)`
                        : "none",
                    opacity: !isLive ? 0.55 : dimmed ? 0.4 : 1,
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accent}40, transparent)`,
                      opacity: lit ? 1 : 0,
                    }}
                  />

                  <div className="p-6 md:p-8 flex flex-col h-full">
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

                    <h2
                      className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-2 transition-all duration-300"
                      style={{
                        color: light ? "var(--color-text-primary)" : accent,
                        textShadow:
                          lit && !light && isLive ? `0 0 20px ${accent}40` : "none",
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
                style: { animationDelay: `${300 + i * 90}ms` },
                onMouseEnter: () => setHover({ kind: "system", id: sid }),
                onMouseLeave: () => setHover(null),
                onFocus: () => setHover({ kind: "system", id: sid }),
                onBlur: () => setHover(null),
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
              {activeClusters && activeClusters.size > 0 && hover?.kind === "system"
                ? `${CLUSTER_CHIPS.filter((c) => activeClusters.has(c.id)).length} shared currents`
                : "More systems arriving"}
              <span className="inline-block w-6 h-px bg-current align-middle ml-3" />
            </p>
          </div>

          <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-4">
            {PRACTICE_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group block rounded-sm border border-gold/15 hover:border-gold/40 bg-bg/40 p-5 transition-colors"
              >
                <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold/70 mb-2">
                  Practice
                </div>
                <div className="font-serif text-2xl text-text-primary mb-1">{l.label}</div>
                {l.desc && (
                  <div className="font-serif italic text-sm text-text-secondary">{l.desc}</div>
                )}
              </Link>
            ))}
          </div>

          <div className="max-w-6xl mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[...ATLAS_LINKS, ABOUT_LINKS[0]].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-secondary hover:text-gold transition-colors"
              >
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
