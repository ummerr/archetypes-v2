"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import {
  archetypeDisplayName,
  archetypeHref,
  confidenceEdgeStyle,
  debateSlugFor,
  getResonantArchetypes,
  systemAccent,
} from "@/lib/resonance";
import type { SystemId } from "@/data/resonance";
import ConfidenceBadge from "@/components/shared/ConfidenceBadge";
import CitationLine from "@/components/shared/CitationLine";

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
        <span className="font-mono text-label tracking-kicker text-gold/80 uppercase">
          Cross-System Resonance
        </span>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(90deg, ${accentColor}${light ? "30" : "18"}, transparent)`,
          }}
        />
      </div>

      <p className="font-serif text-base md:text-lg text-text-secondary/90 italic mb-3 max-w-2xl">
        This archetype lives in {joinClusterNames(resonances.map((r) => r.cluster.theme))}. Each
        cluster gathers figures across traditions that share an underlying resonance - with honesty
        about where inference begins.
      </p>
      <p className="font-mono text-label tracking-label uppercase text-muted/70 mb-8">
        Mirrors to try on, not a diagnosis. See{" "}
        <Link href="/about/methodology" className="underline underline-offset-2 hover:text-gold">
          methodology
        </Link>
        .
      </p>

      <div className="space-y-10">
        {resonances.map(({ cluster, self, entries }) => (
          <section key={cluster.id}>
            <div className="mb-4">
              <div className="flex items-baseline gap-3 flex-wrap mb-1">
                <p
                  className="font-mono text-kicker tracking-kicker uppercase"
                  style={{ color: light ? systemAccent(system).accentLight : accentColor }}
                >
                  Cluster
                </p>
                <ConfidenceBadge tier={self.confidence} color={accentColor} />
                {self.confidence === "contested" && (
                  <Link
                    href={`/atlas/debates/${debateSlugFor(cluster.id, system, slug)}`}
                    className="font-mono text-label tracking-label uppercase text-amber-500 hover:text-amber-400 underline underline-offset-2"
                  >
                    See the debate →
                  </Link>
                )}
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-medium mb-1">
                <Link href={`/atlas/cluster/${cluster.id}`} className="hover:underline underline-offset-4 decoration-1">
                  {cluster.theme}
                </Link>
              </h3>
              <p className="font-serif text-sm md:text-base text-text-secondary/80 italic">
                {cluster.description}
              </p>
              {(cluster.editorialNote || cluster.adversarialNote) && (
                <div className="mt-2 text-xs leading-snug text-text-secondary/70 space-y-1">
                  {cluster.editorialNote && <p className="italic">{cluster.editorialNote}</p>}
                  {cluster.adversarialNote && (
                    <p className="italic text-muted/80">
                      <span className="font-mono text-kicker tracking-label uppercase mr-1">Devil's advocate:</span>
                      {cluster.adversarialNote}
                    </p>
                  )}
                </div>
              )}
              {self.dissent && (
                <div className="mt-3 rounded-sm border border-amber-500/30 bg-amber-500/[0.04] px-3 py-2 text-xs italic text-text-secondary/85">
                  <span className="font-mono text-kicker tracking-kicker uppercase text-amber-500/90 mr-1">Dissent:</span>
                  {self.dissent}
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {entries.map((entry) => {
                const { accent, accentLight, name: systemName } = systemAccent(entry.system);
                const color = light ? accentLight : accent;
                const primary = entry.strength === "primary";
                const displayName = archetypeDisplayName(entry.system, entry.slug);
                const edge = confidenceEdgeStyle(entry.confidence);
                return (
                  <Link
                    key={`${entry.system}-${entry.slug}`}
                    href={archetypeHref(entry.system, entry.slug)}
                    className="group block rounded-sm p-4 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(145deg, ${color}${primary ? (light ? "10" : "08") : "05"}, transparent)`,
                      border: `1px ${edge} ${color}${primary ? (light ? "40" : "28") : (light ? "30" : "1E")}`,
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <p
                        className="font-mono text-kicker tracking-kicker uppercase"
                        style={{ color }}
                      >
                        {systemName}
                      </p>
                      <ConfidenceBadge tier={entry.confidence} color={color} />
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
                    <CitationLine
                      primarySource={entry.primarySourceCitation}
                      scholarly={entry.scholarlyCitation}
                      dissent={entry.dissent}
                      adversarial={entry.adversarialNote}
                      editorial={entry.editorialNote}
                    />
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
    const dash = t.indexOf(" - ");
    return dash > 0 ? t.slice(0, dash) : t;
  });
  if (names.length === 1) return `the ${names[0]} cluster`;
  if (names.length === 2) return `the ${names[0]} and ${names[1]} clusters`;
  return `the ${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]} clusters`;
}
