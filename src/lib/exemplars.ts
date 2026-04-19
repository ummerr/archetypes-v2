import {
  CANONICAL_EXEMPLARS,
  type ExemplarEntry,
  type ExemplarKind,
} from "@/data/exemplars/canonical";
import type { SystemId } from "@/data/resonance";
import { allExemplarsForSystem, type AnyExemplar } from "@/lib/cluster-exemplars";
import { clustersForArchetype } from "@/lib/axes";

export interface ExemplarAppearance {
  system: SystemId;
  archetypeSlug: string;
  name: string;
  note: string;
  source?: string;
  medium?: string;
  kind: ExemplarKind;
}

export interface ExemplarRecord {
  exemplar: ExemplarEntry;
  appearances: ExemplarAppearance[];
}

const SYSTEMS: SystemId[] = [
  "jungian",
  "enneagram",
  "kwml",
  "mbti",
  "heros-journey",
  "tarot",
];

let cache: ExemplarRecord[] | undefined;

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function stripParentheticals(name: string): string {
  return name.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
}

function slugify(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface Resolution {
  slug: string;
  displayName: string;
  canonical?: ExemplarEntry;
}

function buildResolver() {
  const bySlug = new Map<string, ExemplarEntry>();
  const aliases: Array<{ entry: ExemplarEntry; norm: string }> = [];
  for (const entry of CANONICAL_EXEMPLARS) {
    bySlug.set(entry.slug, entry);
    for (const alias of entry.aliases) {
      aliases.push({ entry, norm: normalizeName(alias) });
    }
  }

  return function resolve(rawName: string): Resolution {
    const norm = normalizeName(rawName);
    for (const { entry, norm: aliasNorm } of aliases) {
      if (
        aliasNorm === norm ||
        norm.startsWith(aliasNorm) ||
        aliasNorm.startsWith(norm)
      ) {
        return { slug: entry.slug, displayName: entry.displayName, canonical: entry };
      }
    }
    const cleaned = stripParentheticals(rawName);
    const slug = slugify(cleaned);
    const collide = bySlug.get(slug);
    if (collide) {
      return { slug: collide.slug, displayName: collide.displayName, canonical: collide };
    }
    return { slug, displayName: cleaned };
  };
}

function buildIndex(): ExemplarRecord[] {
  const flat: Array<AnyExemplar & { archetypeSlug: string; system: SystemId }> = [];
  for (const s of SYSTEMS) {
    flat.push(...allExemplarsForSystem(s));
  }

  const resolve = buildResolver();

  interface Bucket {
    entry: ExemplarEntry;
    appearances: ExemplarAppearance[];
    seen: Set<string>;
  }
  const buckets = new Map<string, Bucket>();

  for (const raw of flat) {
    const { slug, displayName, canonical } = resolve(raw.name);

    let bucket = buckets.get(slug);
    if (!bucket) {
      const entry: ExemplarEntry = canonical ?? {
        slug,
        displayName,
        kind: raw.kind,
        aliases: [displayName],
      };
      bucket = { entry, appearances: [], seen: new Set() };
      buckets.set(slug, bucket);
    }

    const dedupe = `${raw.system}::${raw.archetypeSlug}`;
    if (bucket.seen.has(dedupe)) continue;
    bucket.seen.add(dedupe);
    bucket.appearances.push({
      system: raw.system,
      archetypeSlug: raw.archetypeSlug,
      name: raw.name,
      note: raw.note,
      source: raw.source,
      medium: raw.kind === "cultural" ? raw.medium : undefined,
      kind: raw.kind,
    });
  }

  return Array.from(buckets.values()).map((b) => ({
    exemplar: b.entry,
    appearances: b.appearances,
  }));
}

export function getExemplarIndex(): ExemplarRecord[] {
  if (!cache) cache = buildIndex();
  return cache;
}

export function getExemplarRecord(slug: string): ExemplarRecord | undefined {
  return getExemplarIndex().find((r) => r.exemplar.slug === slug);
}

export interface ExemplarClusterResolution {
  clusterId: string;
  clusterTheme: string;
  appearances: ExemplarAppearance[];
}

/** Cluster-coalesce an exemplar's appearances. A cluster surfaces if at least
 *  one of the exemplar's archetype-tags maps to it. */
export function resolveExemplarClusters(
  record: ExemplarRecord,
): ExemplarClusterResolution[] {
  const byCluster = new Map<string, ExemplarClusterResolution>();
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
