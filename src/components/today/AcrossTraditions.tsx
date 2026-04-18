import Link from "next/link";
import type { SystemId, ResonanceEntry, ThematicCluster } from "@/data/resonance";
import {
  archetypeDisplayName,
  archetypeHref,
  getResonantArchetypes,
  systemAccent,
} from "@/lib/resonance";
import ConfidenceBadge from "@/components/shared/ConfidenceBadge";

interface Props {
  system: SystemId;
  slug: string;
  max?: number;
}

function clusterShortName(cluster: ThematicCluster): string {
  return cluster.theme.split(/\s[—-]\s/)[0].replace(/^The\s+/i, "");
}

export default function AcrossTraditions({ system, slug, max = 6 }: Props) {
  const resonances = getResonantArchetypes(system, slug);
  if (resonances.length === 0) return null;

  const seen = new Set<string>();
  const rows: { entry: ResonanceEntry }[] = [];

  const primaryPool = resonances.flatMap((r) =>
    r.entries.filter((e) => e.strength === "primary"),
  );
  const secondaryPool = resonances.flatMap((r) =>
    r.entries.filter((e) => e.strength === "secondary"),
  );

  for (const entry of [...primaryPool, ...secondaryPool]) {
    const key = `${entry.system}::${entry.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    rows.push({ entry });
    if (rows.length >= max) break;
  }

  if (rows.length === 0) return null;

  const clusterNames = resonances.map((r) => clusterShortName(r.cluster));
  const lensLine =
    clusterNames.length > 1
      ? `Resonates across the ${clusterNames.slice(0, -1).join(", ")} and ${clusterNames.at(-1)} lenses.`
      : `Resonates in the ${clusterNames[0]} lens.`;

  return (
    <section className="mt-14">
      <h2 className="font-mono text-kicker tracking-kicker uppercase text-muted mb-2">
        Across the traditions
      </h2>
      <p className="font-serif text-body italic text-text-secondary/70 mb-5">{lensLine}</p>

      <ul className="flex flex-col divide-y divide-surface-light/30 border-y border-surface-light/30">
        {rows.map(({ entry }) => {
          const { accent, name: systemName } = systemAccent(entry.system);
          const name = archetypeDisplayName(entry.system, entry.slug) ?? entry.slug;
          return (
            <li key={`${entry.system}::${entry.slug}`}>
              <Link
                href={archetypeHref(entry.system, entry.slug)}
                className="group block py-4 transition-colors hover:bg-surface-light/10"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span
                    className="font-mono text-kicker tracking-kicker uppercase"
                    style={{ color: accent }}
                  >
                    {systemName}
                  </span>
                  <span
                    className="font-serif text-h3 leading-tight group-hover:underline decoration-1 underline-offset-4"
                    style={{ color: accent }}
                  >
                    {name}
                  </span>
                  <span className="ml-auto">
                    <ConfidenceBadge tier={entry.confidence} color={accent} />
                  </span>
                </div>
                <p className="font-serif text-body italic text-text-secondary/80 mt-1">
                  {entry.note}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
