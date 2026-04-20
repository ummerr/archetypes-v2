"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { JungianArchetype, JungianClusterGroup } from "@/types/jungian";
import { useTheme } from "@/components/ThemeProvider";
import CoreTriad from "@/components/jungian/CoreTriad";
import GiftTrapDiptych from "@/components/jungian/GiftTrapDiptych";
import ShadowPanel from "@/components/jungian/ShadowPanel";
import LevelsLadder from "@/components/jungian/LevelsLadder";
import AwakeningList from "@/components/jungian/AwakeningList";
import OppositeCard from "@/components/jungian/OppositeCard";
import ExemplarsTabs from "@/components/shared/ExemplarsTabs";
import { getJungianExemplars } from "@/data/jungian/exemplars";
import CrossSystemResonance from "@/components/resonance/CrossSystemResonance";
import ArchetypeShareCard from "@/components/viz/ArchetypeShareCard";
import CrossSystemResonanceInline from "@/components/resonance/CrossSystemResonanceInline";
import ArchetypeRadar from "@/components/viz/ArchetypeRadar";
import ResonanceNetwork from "@/components/viz/ResonanceNetwork";
import CanvasSkeleton from "@/components/shared/CanvasSkeleton";

const JungianTotemCanvas = dynamic(
  () => import("@/components/JungianTotemCanvas"),
  { ssr: false, loading: () => <CanvasSkeleton /> }
);

interface Props {
  archetype: JungianArchetype;
  cluster: JungianClusterGroup;
  clusterSiblings: JungianArchetype[];
  opposite: JungianArchetype;
}

export default function JungianDetailClient({
  archetype,
  cluster,
  clusterSiblings,
  opposite,
}: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const color = archetype.accentColor;

  return (
    <div className="min-h-screen px-6 pt-24 pb-24 md:pt-32">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-6 animate-slide-up"
        >
          <Link
            href="/jungian"
            className="font-mono text-kicker tracking-kicker text-muted uppercase hover:text-gold transition-colors"
          >
            Jungian
          </Link>
          <span className="text-muted/40 font-mono text-label">/</span>
          <span
            aria-current="page"
            className="font-mono text-kicker tracking-kicker uppercase"
            style={{ color: cluster.color }}
          >
            {cluster.label}
          </span>
          <span className="text-muted/40 font-mono text-label ml-1">·</span>
          <Link
            href="/jungian/about"
            className="font-mono text-kicker tracking-kicker text-muted/80 uppercase hover:text-gold transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Hero */}
        <div className="mb-12 animate-slide-up delay-100">
          <div className="flex items-start gap-4 sm:gap-5 mb-4">
            <span className="sr-only">{archetype.symbol}</span>
            <div
              className="w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 flex-shrink-0 -mt-2 sm:-mt-4"
              aria-hidden
            >
              <JungianTotemCanvas
                slug={archetype.slug}
                color={color}
                isHovered
              />
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <p
                className="font-mono text-label tracking-kicker uppercase mb-2"
                style={{ color: color + "CC" }}
              >
                {cluster.label} Cluster · {cluster.tagline}
              </p>
              <h1
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-display"
                style={{
                  color,
                  textShadow: !light ? `0 0 24px ${color}30` : "none",
                }}
              >
                {archetype.name}
              </h1>
            </div>
          </div>

          <p className="font-serif text-xl md:text-2xl italic text-text-secondary/90 mb-5 mt-4">
            &ldquo;{archetype.motto}&rdquo;
          </p>

          <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light max-w-2xl">
            {archetype.description}
          </p>

          <CrossSystemResonanceInline system="jungian" slug={archetype.slug} />
        </div>

        {/* Core triad */}
        <div className="animate-slide-up delay-200">
          <CoreTriad
            color={color}
            coreDesire={archetype.coreDesire}
            greatestFear={archetype.greatestFear}
            strategy={archetype.strategy}
          />
        </div>

        {/* Gift & Trap */}
        <div className="animate-slide-up delay-300">
          <GiftTrapDiptych
            color={color}
            gift={archetype.gift}
            trap={archetype.trap}
          />
        </div>

        {/* The Shadow */}
        <div className="animate-slide-up delay-300">
          <ShadowPanel color={color} shadow={archetype.shadow} />
        </div>

        {/* Levels */}
        <div className="animate-slide-up delay-400">
          <LevelsLadder color={color} levels={archetype.levels} />
        </div>

        {/* Awakening */}
        <div className="animate-slide-up delay-400">
          <AwakeningList
            color={color}
            awakening={archetype.awakening}
            archetypeName={archetype.name}
          />
        </div>

        {/* Characteristics */}
        <section className="mb-16 animate-slide-up delay-500">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-label tracking-display text-muted uppercase">
              Key Characteristics
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${color}${light ? "30" : "18"}, transparent)`,
              }}
            />
          </div>
          <ul className="space-y-2.5">
            {archetype.keyCharacteristics.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span
                  className="mt-2 block w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: color }}
                />
                <span className="text-text-secondary text-sm md:text-base leading-relaxed font-light">
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Exemplars */}
        {(() => {
          const exemplars = getJungianExemplars(archetype.slug);
          if (!exemplars) return null;
          return (
            <div className="animate-slide-up delay-500">
              <ExemplarsTabs color={color} exemplars={exemplars} />
            </div>
          );
        })()}

        {/* Opposite */}
        <div className="animate-slide-up delay-500">
          <OppositeCard opposite={opposite} fromColor={color} />
        </div>

        <div className="animate-slide-up delay-500 grid md:grid-cols-2 gap-8 mt-12 mb-12">
          <ArchetypeRadar system="jungian" slug={archetype.slug} />
          <ResonanceNetwork system="jungian" slug={archetype.slug} />
        </div>

        <CrossSystemResonance
          system="jungian"
          slug={archetype.slug}
          accentColor={archetype.accentColor}
          delay="delay-500"
        />

        <ArchetypeShareCard
          system="jungian"
          slug={archetype.slug}
          displayName={archetype.name}
          className="mt-10 animate-slide-up delay-500"
        />

        {/* Cluster siblings - demoted to thin strip */}
        <section className="animate-slide-up delay-500 pt-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-kicker tracking-display text-muted uppercase">
              Other {cluster.label} Archetypes
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${cluster.color}20, transparent)`,
              }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {clusterSiblings.map((s) => (
              <Link
                key={s.slug}
                href={`/jungian/archetype/${s.slug}`}
                className="group inline-flex items-center gap-2 rounded-sm px-3 py-2 transition-all duration-300"
                style={{
                  background: `linear-gradient(145deg, ${s.accentColor}${light ? "08" : "04"}, transparent)`,
                  border: `1px solid ${s.accentColor}${light ? "20" : "10"}`,
                }}
              >
                <span
                  className="font-serif text-lg opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ color: s.accentColor }}
                  aria-hidden
                >
                  {s.symbol}
                </span>
                <span
                  className="font-serif text-sm"
                  style={{ color: s.accentColor }}
                >
                  {s.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
