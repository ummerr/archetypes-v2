"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import {
  ALL_JUNGIAN,
  JUNGIAN_CLUSTERS,
  getJungianByCluster,
} from "@/data/jungian/archetypes";
import { useTheme } from "@/components/ThemeProvider";
import { JungianArchetype } from "@/types/jungian";
import CanvasSkeleton from "@/components/shared/CanvasSkeleton";

const JungianTotemCanvas = dynamic(
  () => import("@/components/JungianTotemCanvas"),
  { ssr: false, loading: () => <CanvasSkeleton /> }
);

export default function JungianHome() {
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
              Pearson &amp; Marr - Jungian Framework
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-text-primary tracking-tight leading-display mb-5">
              Twelve{" "}
              <span className={light ? "text-text-primary" : "text-gold glow-text-subtle animate-flicker"}>
                Heroic Archetypes
              </span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl font-light">
              Universal motivations drawn from Jung&rsquo;s collective unconscious,
              organized across three developmental clusters - Ego, Soul, and
              Self. Each archetype is a chapter of a single journey toward
              wholeness.
            </p>
          </div>
        </div>
      </div>

      {/* Clusters */}
      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto space-y-20">
          {JUNGIAN_CLUSTERS.map((cluster, cIdx) => {
            const members = getJungianByCluster(cluster.id);
            return (
              <section
                key={cluster.id}
                className="animate-slide-up"
                style={{ animationDelay: `${200 + cIdx * 120}ms` }}
              >
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      className="font-mono text-label tracking-kicker uppercase"
                      style={{ color: cluster.color }}
                    >
                      {cluster.label} Cluster
                    </span>
                    <div
                      className="h-px flex-1"
                      style={{
                        background: `linear-gradient(90deg, ${cluster.color}${light ? "30" : "18"}, transparent)`,
                      }}
                    />
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl font-medium text-text-primary tracking-tight mb-2">
                    {cluster.tagline}
                  </h2>
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-2xl font-light">
                    {cluster.description}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {members.map((a: JungianArchetype, i) => {
                    const isHovered = hovered === a.slug;
                    return (
                      <Link
                        key={a.slug}
                        href={`/jungian/archetype/${a.slug}`}
                        className="group block animate-slide-up"
                        style={{ animationDelay: `${300 + cIdx * 120 + i * 60}ms` }}
                        onMouseEnter={() => setHovered(a.slug)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <div
                          className="relative overflow-visible rounded-sm transition-all duration-500 h-full p-5"
                          style={{
                            background: `linear-gradient(145deg, ${a.accentColor}${light ? "08" : "03"} 0%, var(--color-bg) 50%)`,
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
                            <span className="sr-only">{a.symbol}</span>
                            <span className="font-mono text-kicker tracking-kicker text-muted/70 uppercase ml-auto">
                              {cluster.label}
                            </span>
                          </div>

                          <div className="w-full h-32 -mt-1 mb-2" aria-hidden>
                            <JungianTotemCanvas
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

                          <p className="font-mono text-label italic text-text-secondary/80 mb-3 leading-relaxed">
                            &ldquo;{a.motto}&rdquo;
                          </p>

                          <div className="pt-3 border-t border-surface-light/30">
                            <p className="font-mono text-kicker tracking-label text-muted uppercase mb-1">
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
              </section>
            );
          })}

          <div className="text-center pt-6">
            <Link
              href="/jungian/about"
              className="inline-flex items-center gap-2 font-mono text-kicker tracking-label text-muted uppercase hover:text-gold transition-colors duration-300"
            >
              <span className="w-6 h-px bg-current" />
              The framework behind the twelve
              <span className="w-6 h-px bg-current" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hidden count for SSG sanity */}
      <span className="hidden">{ALL_JUNGIAN.length}</span>
    </div>
  );
}
