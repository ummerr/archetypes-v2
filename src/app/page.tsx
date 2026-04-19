"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SYSTEMS } from "@/data/systems";
import { ATLAS_LINKS, ABOUT_LINKS } from "@/data/nav";
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
        <div className="px-5 sm:px-6 pt-16 pb-8 md:pt-32 md:pb-14 relative">
          <div className="absolute inset-0 pointer-events-none opacity-60 motion-safe:block motion-reduce:hidden">
            <Particles color={light ? "#8A6A20" : "#D4AF37"} count={18} />
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-14 items-center relative">
            <div className="animate-slide-up">
              <p className="font-mono text-kicker tracking-display text-gold/80 uppercase mb-4">
                Archetypal Systems
              </p>
              <h1 className="font-serif text-[2rem] sm:text-5xl md:text-6xl leading-display font-medium text-text-primary tracking-tight mb-4 md:mb-5">
                Six traditions keep circling the same{" "}
                <span className={light ? "text-text-primary italic" : "text-gold glow-text-subtle animate-flicker italic"}>
                  figures
                </span>
                .
              </h1>
              <p className="text-text-secondary text-body md:text-lg leading-relaxed max-w-xl font-light">
                147 mappings across 20 clusters — every one carrying its
                citations, dissent, and confidence tier.
              </p>
              <div className="mt-6 md:mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="#systems"
                  className="font-mono text-label tracking-kicker uppercase text-gold hover:opacity-80 transition-opacity"
                >
                  Choose a system ↓
                </a>
                <Link
                  href="/atlas"
                  className="font-mono text-label tracking-kicker uppercase text-text-secondary hover:text-gold transition-colors"
                >
                  Or see the whole map →
                </Link>
              </div>
            </div>
            <div className="animate-slide-up delay-200 w-full flex justify-center md:justify-end">
              <div className="w-full max-w-[320px] sm:max-w-[360px]">
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
        </div>

        <ClusterRibbon
          focusCluster={focusCluster}
          focusSystem={focusSystem}
          onHoverCluster={(id) =>
            setHover(id ? { kind: "cluster", id } : null)
          }
        />

        {/* Systems grid */}
        <div id="systems" className="px-5 sm:px-6 pb-16 md:pb-20 scroll-mt-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4 md:gap-5">
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

                  <div className="p-5 sm:p-6 md:p-8 flex flex-col h-full">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 md:mb-4">
                      <span className="font-mono text-kicker tracking-kicker text-muted uppercase whitespace-nowrap">
                        {system.framework}
                      </span>
                      <div
                        className="h-px flex-1 min-w-[12px]"
                        style={{
                          background: `linear-gradient(90deg, ${accent}${light ? "30" : "15"}, transparent)`,
                        }}
                      />
                      <span
                        className="font-mono text-kicker tracking-label uppercase whitespace-nowrap"
                        style={{ color: isLive ? accent : "var(--color-muted)" }}
                      >
                        {isLive ? `${system.count} types` : "Coming Soon"}
                      </span>
                    </div>

                    <h2
                      className="font-serif text-[2rem] sm:text-4xl md:text-5xl font-medium tracking-tight leading-display mb-2 transition-all duration-300"
                      style={{
                        color: light ? "var(--color-text-primary)" : accent,
                        textShadow:
                          lit && !light && isLive ? `0 0 20px ${accent}40` : "none",
                      }}
                    >
                      {system.name}
                    </h2>

                    <p className="font-serif text-base sm:text-lg text-text-secondary italic mb-3">
                      {system.subtitle}
                    </p>

                    <p className="text-text-secondary text-body-sm leading-relaxed mb-4 sm:mb-5 font-light">
                      {system.description}
                    </p>

                    <div className="mt-auto pt-3 sm:pt-4 border-t border-surface-light/30 flex items-center justify-between">
                      <span className="font-mono text-kicker tracking-label text-muted uppercase">
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

          <div className="max-w-6xl mx-auto mt-10 text-center">
            <p className="font-mono text-kicker tracking-label text-muted uppercase">
              <span className="inline-block w-6 h-px bg-current align-middle mr-3" />
              {activeClusters && activeClusters.size > 0 && hover?.kind === "system"
                ? `${CLUSTER_CHIPS.filter((c) => activeClusters.has(c.id)).length} shared currents`
                : "More systems arriving"}
              <span className="inline-block w-6 h-px bg-current align-middle ml-3" />
            </p>
          </div>

          {/* Atlas feature */}
          <div className="max-w-6xl mx-auto mt-16 md:mt-20">
            <Link
              href="/atlas"
              className="group block relative overflow-hidden rounded-sm transition-all duration-500"
              style={{
                background: `linear-gradient(145deg, ${light ? "#8A6A200C" : "#D4AF3708"} 0%, var(--color-bg) 55%, var(--color-bg) 100%)`,
                border: `1px solid ${light ? "#8A6A2030" : "#D4AF3720"}`,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${light ? "#8A6A2060" : "#D4AF3760"}, transparent)`,
                }}
              />
              <div className="grid md:grid-cols-[1.3fr_1fr] gap-6 md:gap-12 p-6 sm:p-8 md:p-12 items-center">
                <div>
                  <p className="font-mono text-kicker tracking-display text-gold/80 uppercase mb-3 md:mb-4">
                    Atlas · Resonance Map
                  </p>
                  <h2 className="font-serif text-h2 sm:text-3xl md:text-5xl leading-display font-medium text-text-primary tracking-tight mb-4 md:mb-5">
                    See where the systems{" "}
                    <span className={light ? "text-text-primary italic" : "text-gold glow-text-subtle italic"}>
                      rhyme
                    </span>
                  </h2>
                  <p className="text-text-secondary text-body md:text-lg leading-relaxed font-light mb-5 md:mb-6 max-w-xl">
                    Jung&rsquo;s Warrior. The Enneagram Eight. KWML&rsquo;s King.
                    The Emperor in tarot. Four traditions pointing at one
                    recurring figure — and that&rsquo;s one of twenty clusters on
                    the Atlas. Every tie sourced to its author or flagged as
                    inference.
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed font-light mb-6 max-w-xl">
                    Come here when you&rsquo;ve read one system and want to know
                    what the others would call the same pattern — or when you want
                    to see where practitioners genuinely disagree.
                  </p>
                  <span className="inline-flex items-center gap-2 font-mono text-label tracking-kicker uppercase text-gold group-hover:translate-x-0.5 transition-transform">
                    Open the Atlas
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 md:justify-end content-start">
                  {CLUSTER_CHIPS.slice(0, 10).map((c) => (
                    <span
                      key={c.id}
                      className="font-mono text-label tracking-label uppercase px-3 py-1.5 rounded-full border text-text-secondary"
                      style={{
                        borderColor: light ? "#8A6A2025" : "#D4AF3718",
                        background: light ? "#8A6A2008" : "#D4AF3706",
                      }}
                    >
                      {c.label}
                    </span>
                  ))}
                  <span className="font-mono text-label tracking-label uppercase px-3 py-1.5 text-muted">
                    + {CLUSTER_CHIPS.length - 10} more
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="max-w-6xl mx-auto mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[ATLAS_LINKS[1], ATLAS_LINKS[2], ABOUT_LINKS[0]].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-label tracking-kicker uppercase text-text-secondary hover:text-gold transition-colors"
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
