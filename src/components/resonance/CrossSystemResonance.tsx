"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import {
  archetypeDisplayName,
  archetypeHref,
  getResonantArchetypes,
  systemAccent,
} from "@/lib/resonance";
import type { SystemId } from "@/data/resonance";

interface Props {
  system: SystemId;
  slug: string;
  accentColor: string;
  delay?: string;
}

export default function CrossSystemResonance({ system, slug, accentColor, delay = "delay-400" }: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const resonances = getResonantArchetypes(system, slug);

  if (resonances.length === 0) return null;

  return (
    <div className={`mb-16 animate-slide-up ${delay}`}>
      <div className="flex items-center gap-4 mb-5">
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold/80 uppercase">
          Cross-System Resonance
        </span>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(90deg, ${accentColor}${light ? "30" : "18"}, transparent)`,
          }}
        />
      </div>

      <p className="font-serif text-base md:text-lg text-text-secondary/90 italic mb-8 max-w-2xl">
        This archetype lives in {joinClusterNames(resonances.map((r) => r.cluster.theme))}. Each
        cluster gathers figures across traditions that share the same underlying psychic energy.
      </p>

      <div className="space-y-8">
        {resonances.map(({ cluster, entries }) => (
          <section key={cluster.id}>
            <div className="mb-3">
              <p
                className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1"
                style={{ color: light ? systemAccent(system).accentLight : accentColor }}
              >
                Cluster
              </p>
              <h3 className="font-serif text-xl md:text-2xl font-medium mb-1">
                {cluster.theme}
              </h3>
              <p className="font-serif text-sm md:text-base text-text-secondary/80 italic">
                {cluster.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {entries.map((entry) => {
                const { accent, accentLight, name: systemName } = systemAccent(entry.system);
                const color = light ? accentLight : accent;
                const primary = entry.strength === "primary";
                const displayName = archetypeDisplayName(entry.system, entry.slug);
                return (
                  <Link
                    key={`${entry.system}-${entry.slug}`}
                    href={archetypeHref(entry.system, entry.slug)}
                    className="group block rounded-sm p-4 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(145deg, ${color}${primary ? (light ? "10" : "08") : "05"}, transparent)`,
                      border: primary
                        ? `1px solid ${color}${light ? "40" : "28"}`
                        : `1px dashed ${color}${light ? "30" : "1E"}`,
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <p
                        className="font-mono text-[9px] tracking-[0.3em] uppercase"
                        style={{ color }}
                      >
                        {systemName}
                      </p>
                      {!primary && (
                        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-muted/60">
                          Facet
                        </span>
                      )}
                    </div>
                    <p
                      className="font-serif text-lg font-medium mb-1 group-hover:underline decoration-1 underline-offset-4"
                      style={{ color }}
                    >
                      {displayName ?? entry.slug}
                    </p>
                    <p className="text-sm text-text-primary/85 leading-snug font-light">
                      {entry.note}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function joinClusterNames(themes: string[]): string {
  const names = themes.map((t) => {
    const dash = t.indexOf(" — ");
    return dash > 0 ? t.slice(0, dash) : t;
  });
  if (names.length === 1) return `the ${names[0]} cluster`;
  if (names.length === 2) return `the ${names[0]} and ${names[1]} clusters`;
  return `the ${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]} clusters`;
}
