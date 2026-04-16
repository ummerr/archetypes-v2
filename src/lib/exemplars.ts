import { FIGURES, type FigureEntry } from "@/data/exemplars/figures";
import type { SystemId } from "@/data/resonance";
import { allExemplarsForSystem, type AnyExemplar } from "@/lib/cluster-exemplars";
import { clustersForArchetype } from "@/lib/axes";

export interface FigureAppearance {
  system: SystemId;
  archetypeSlug: string;
  name: string;
  note: string;
  source?: string;
  medium?: string;
  kind: "cultural" | "historical";
}

export interface FigureRecord {
  figure: FigureEntry;
  appearances: FigureAppearance[];
}

const SYSTEMS: SystemId[] = [
  "jungian",
  "enneagram",
  "kwml",
  "mbti",
  "heros-journey",
  "tarot",
];

let cache: FigureRecord[] | undefined;

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildIndex(): FigureRecord[] {
  // Flatten all exemplars across all systems once.
  const flat: Array<AnyExemplar & { archetypeSlug: string; system: SystemId }> = [];
  for (const s of SYSTEMS) {
    flat.push(...allExemplarsForSystem(s));
  }

  const records: FigureRecord[] = [];
  for (const figure of FIGURES) {
    const aliasKeys = figure.aliases.map(normalizeName);
    const appearances: FigureAppearance[] = [];
    const seen = new Set<string>();
    for (const entry of flat) {
      const key = normalizeName(entry.name);
      if (!aliasKeys.some((a) => a === key || key.startsWith(a) || a.startsWith(key))) continue;
      const dedupeKey = `${entry.system}-${entry.archetypeSlug}`;
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);
      appearances.push({
        system: entry.system,
        archetypeSlug: entry.archetypeSlug,
        name: entry.name,
        note: entry.note,
        source: entry.source,
        medium: entry.kind === "cultural" ? entry.medium : undefined,
        kind: entry.kind,
      });
    }
    if (appearances.length > 0) {
      records.push({ figure, appearances });
    }
  }
  return records;
}

export function getFigureIndex(): FigureRecord[] {
  if (!cache) cache = buildIndex();
  return cache;
}

export function getFigureRecord(slug: string): FigureRecord | undefined {
  return getFigureIndex().find((r) => r.figure.slug === slug);
}

export interface FigureClusterResolution {
  clusterId: string;
  clusterTheme: string;
  appearances: FigureAppearance[];
}

/** Cluster-coalesce a figure's appearances. A cluster surfaces if at least one
 *  of the figure's archetype-tags maps to it. */
export function resolveFigureClusters(record: FigureRecord): FigureClusterResolution[] {
  const byCluster = new Map<string, FigureClusterResolution>();
  for (const app of record.appearances) {
    const clusters = clustersForArchetype(app.system, app.archetypeSlug);
    for (const c of clusters) {
      const existing = byCluster.get(c.id);
      if (existing) existing.appearances.push(app);
      else
        byCluster.set(c.id, {
          clusterId: c.id,
          clusterTheme: c.theme,
          appearances: [app],
        });
    }
  }
  return Array.from(byCluster.values());
}
