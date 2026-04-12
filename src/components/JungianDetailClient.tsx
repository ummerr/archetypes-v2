"use client";

import Link from "next/link";
import { JungianArchetype, JungianClusterGroup } from "@/types/jungian";
import { useTheme } from "@/components/ThemeProvider";

interface Props {
  archetype: JungianArchetype;
  cluster: JungianClusterGroup;
  clusterSiblings: JungianArchetype[];
}

export default function JungianDetailClient({
  archetype,
  cluster,
  clusterSiblings,
}: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const color = archetype.accentColor;

  const fields: { label: string; body: string }[] = [
    { label: "Core Desire", body: archetype.coreDesire },
    { label: "Greatest Fear", body: archetype.greatestFear },
    { label: "Strategy", body: archetype.strategy },
    { label: "Gift", body: archetype.gift },
    { label: "Trap (Shadow)", body: archetype.trap },
  ];

  return (
    <div className="min-h-screen px-6 pt-24 pb-24 md:pt-32">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 animate-slide-up">
          <Link
            href="/jungian"
            className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase hover:text-gold transition-colors"
          >
            Jungian
          </Link>
          <span className="text-muted/40 font-mono text-[10px]">/</span>
          <span
            className="font-mono text-[9px] tracking-[0.25em] uppercase"
            style={{ color: cluster.color }}
          >
            {cluster.label}
          </span>
        </div>

        {/* Hero */}
        <div className="mb-12 animate-slide-up delay-100">
          <div className="flex items-start gap-5 mb-4">
            <span
              className="font-serif text-6xl md:text-7xl leading-none opacity-80"
              style={{ color }}
              aria-hidden
            >
              {archetype.symbol}
            </span>
            <div className="flex-1 pt-1">
              <p
                className="font-mono text-[10px] tracking-[0.35em] uppercase mb-2"
                style={{ color: color + "CC" }}
              >
                {cluster.label} Cluster · {cluster.tagline}
              </p>
              <h1
                className="font-serif text-5xl md:text-6xl font-medium tracking-tight leading-[1.05]"
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
        </div>

        {/* Fields grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-16 animate-slide-up delay-200">
          {fields.map((f) => (
            <div
              key={f.label}
              className="rounded-sm p-5"
              style={{
                background: `linear-gradient(145deg, ${color}${light ? "0A" : "06"}, transparent)`,
                border: `1px solid ${color}${light ? "22" : "14"}`,
              }}
            >
              <p
                className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2"
                style={{ color: color + "CC" }}
              >
                {f.label}
              </p>
              <p className="text-text-primary text-sm md:text-base leading-relaxed font-light">
                {f.body}
              </p>
            </div>
          ))}
        </div>

        {/* Characteristics */}
        <div className="mb-16 animate-slide-up delay-300">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-[10px] tracking-[0.35em] text-gold/80 uppercase">
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
        </div>

        {/* Cluster siblings */}
        <div className="animate-slide-up delay-400">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-[10px] tracking-[0.35em] text-muted uppercase">
              Other {cluster.label} Archetypes
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${cluster.color}20, transparent)`,
              }}
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {clusterSiblings.map((s) => (
              <Link
                key={s.slug}
                href={`/jungian/archetype/${s.slug}`}
                className="group block rounded-sm p-4 transition-all duration-300"
                style={{
                  background: `linear-gradient(145deg, ${s.accentColor}${light ? "08" : "04"}, transparent)`,
                  border: `1px solid ${s.accentColor}${light ? "20" : "10"}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-serif text-2xl opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{ color: s.accentColor }}
                    aria-hidden
                  >
                    {s.symbol}
                  </span>
                  <div>
                    <p
                      className="font-serif text-base font-medium"
                      style={{ color: s.accentColor }}
                    >
                      {s.name}
                    </p>
                    <p className="font-mono text-[9px] italic text-muted mt-0.5">
                      &ldquo;{s.motto}&rdquo;
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
