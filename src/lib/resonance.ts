import {
  CLUSTERS,
  type ResonanceEntry,
  type SystemId,
  type ThematicCluster,
  type ConfidenceTier,
} from "@/data/resonance";
import { SYSTEMS } from "@/data/systems";
import { getArchetypeBySlug as getKwmlBySlug } from "@/data/kwml/archetypes";
import { getJungianBySlug } from "@/data/jungian/archetypes";
import { getEnneagramBySlug } from "@/data/enneagram/archetypes";
import { getMbtiBySlug } from "@/data/mbti/archetypes";
import { getHeroJourneyBySlug } from "@/data/herosjourney/archetypes";
import { getTarotBySlug } from "@/data/tarot/archetypes";

export function getClustersForArchetype(system: SystemId, slug: string): ThematicCluster[] {
  return CLUSTERS.filter((c) => c.archetypes.some((a) => a.system === system && a.slug === slug));
}

export interface ClusterResonance {
  cluster: ThematicCluster;
  self: ResonanceEntry;
  entries: ResonanceEntry[];
}

export function getResonantArchetypes(system: SystemId, slug: string): ClusterResonance[] {
  return CLUSTERS.flatMap<ClusterResonance>((cluster) => {
    const self = cluster.archetypes.find((a) => a.system === system && a.slug === slug);
    if (!self) return [];
    const entries = cluster.archetypes.filter((a) => a !== self);
    return [{ cluster, self, entries }];
  });
}

export function getClusterById(id: string): ThematicCluster | undefined {
  return CLUSTERS.find((c) => c.id === id);
}

export function getAllClusters(): ThematicCluster[] {
  return CLUSTERS;
}

export function getClustersForSystem(system: SystemId): ThematicCluster[] {
  return CLUSTERS.filter((c) => c.archetypes.some((a) => a.system === system));
}

export interface ContestedEntry {
  cluster: ThematicCluster;
  entry: ResonanceEntry;
  slug: string;
}

export function getContestedEntries(): ContestedEntry[] {
  const out: ContestedEntry[] = [];
  for (const cluster of CLUSTERS) {
    for (const entry of cluster.archetypes) {
      if (entry.confidence === "contested") {
        out.push({ cluster, entry, slug: `${cluster.id}--${entry.system}-${entry.slug}` });
      }
    }
  }
  return out;
}

export function debateSlugFor(clusterId: string, system: SystemId, slug: string): string {
  return `${clusterId}--${system}-${slug}`;
}

export function parseDebateSlug(slug: string):
  | { clusterId: string; system: SystemId; archetypeSlug: string }
  | undefined {
  const [clusterId, rest] = slug.split("--");
  if (!clusterId || !rest) return undefined;
  const dash = rest.indexOf("-");
  if (dash < 0) return undefined;
  const system = rest.slice(0, dash) as SystemId;
  const archetypeSlug = rest.slice(dash + 1);
  return { clusterId, system, archetypeSlug };
}

export function archetypeHref(system: SystemId, slug: string): string {
  return `/${system}/archetype/${slug}`;
}

export function archetypeDisplayName(system: SystemId, slug: string): string | undefined {
  switch (system) {
    case "kwml":
      return getKwmlBySlug(slug)?.name;
    case "jungian":
      return getJungianBySlug(slug)?.name;
    case "enneagram":
      return getEnneagramBySlug(slug)?.name;
    case "mbti": {
      const m = getMbtiBySlug(slug);
      return m ? `${m.code} - ${m.nickname}` : undefined;
    }
    case "heros-journey":
      return getHeroJourneyBySlug(slug)?.name;
    case "tarot":
      return getTarotBySlug(slug)?.name;
  }
}

export function systemAccent(system: SystemId): { accent: string; accentLight: string; name: string } {
  const s = SYSTEMS.find((x) => x.id === system);
  return {
    accent: s?.accent ?? "#888888",
    accentLight: s?.accentLight ?? "#555555",
    name: s?.name ?? system,
  };
}

export function confidenceLabel(tier: ConfidenceTier): string {
  switch (tier) {
    case "canonical":
      return "Canonical";
    case "strong":
      return "Supported";
    case "moderate":
      return "Moderate evidence";
    case "speculative":
      return "Editorial interpretation";
    case "contested":
      return "Contested";
  }
}

export function confidenceEdgeStyle(tier: ConfidenceTier): "solid" | "dotted" | "dashed" {
  if (tier === "speculative") return "dotted";
  if (tier === "contested") return "dashed";
  return "solid";
}

if (process.env.NODE_ENV !== "production") {
  for (const cluster of CLUSTERS) {
    for (const entry of cluster.archetypes) {
      const name = archetypeDisplayName(entry.system, entry.slug);
      if (!name) {
        // Warn rather than throw - the grounded map may reference archetypes not yet in data files.
        // Unknown entries will still render with their slug as fallback.
        // eslint-disable-next-line no-console
        console.warn(
          `[resonance] cluster "${cluster.id}" references unknown archetype ${entry.system}/${entry.slug}`,
        );
      }
    }
  }
}
