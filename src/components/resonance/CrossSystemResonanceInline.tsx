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
  max?: number;
}

export default function CrossSystemResonanceInline({
  system,
  slug,
  max = 3,
}: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const resonances = getResonantArchetypes(system, slug);

  const chips = resonances
    .flatMap((r) =>
      r.entries.map((e) => ({ entry: e, primary: e.strength === "primary" }))
    )
    .filter((c) => c.primary)
    .slice(0, max);

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      <span className="font-mono text-kicker tracking-kicker uppercase text-muted/70 mr-1">
        Resonates with
      </span>
      {chips.map(({ entry }) => {
        const { accent, accentLight, name: systemName } = systemAccent(entry.system);
        const color = light ? accentLight : accent;
        const displayName = archetypeDisplayName(entry.system, entry.slug) ?? entry.slug;
        return (
          <Link
            key={`${entry.system}-${entry.slug}`}
            href={archetypeHref(entry.system, entry.slug)}
            className="group inline-flex items-baseline gap-1.5 rounded-sm px-2 py-1 transition-all duration-200 hover:-translate-y-px"
            style={{
              border: `1px solid ${color}${light ? "28" : "1E"}`,
              background: `${color}${light ? "08" : "05"}`,
            }}
          >
            <span
              className="font-mono text-kicker tracking-kicker uppercase"
              style={{ color: `${color}${light ? "" : "CC"}` }}
            >
              {systemName}
            </span>
            <span
              className="font-serif text-sm group-hover:underline decoration-1 underline-offset-2"
              style={{ color }}
            >
              {displayName}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
