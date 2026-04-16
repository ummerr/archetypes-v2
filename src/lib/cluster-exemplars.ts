import { CLUSTERS, type SystemId } from "@/data/resonance";
import { JUNGIAN_EXEMPLARS } from "@/data/jungian/exemplars";
import { ENNEAGRAM_EXEMPLARS } from "@/data/enneagram/exemplars";
import { KWML_EXEMPLARS } from "@/data/kwml/exemplars";
import { MBTI_EXEMPLARS } from "@/data/mbti/exemplars";
import { HEROSJOURNEY_EXEMPLARS } from "@/data/herosjourney/exemplars";
import { TAROT_EXEMPLARS } from "@/data/tarot/exemplars";
import type { ExemplarSet, ExemplarCultural, ExemplarHistorical } from "@/components/shared/ExemplarsTabs";

const REGISTRY: Record<SystemId, Record<string, ExemplarSet>> = {
  jungian: JUNGIAN_EXEMPLARS as Record<string, ExemplarSet>,
  enneagram: ENNEAGRAM_EXEMPLARS,
  kwml: KWML_EXEMPLARS,
  mbti: MBTI_EXEMPLARS,
  "heros-journey": HEROSJOURNEY_EXEMPLARS,
  tarot: TAROT_EXEMPLARS,
};

export type AnyExemplar =
  | ({ kind: "cultural" } & ExemplarCultural)
  | ({ kind: "historical" } & ExemplarHistorical);

export function getArchetypeExemplars(system: SystemId, slug: string): ExemplarSet | undefined {
  return REGISTRY[system]?.[slug];
}

/** Top N exemplars (cultural+historical) for an archetype, preferring cultural first. */
export function topExemplars(system: SystemId, slug: string, n = 3): AnyExemplar[] {
  const set = getArchetypeExemplars(system, slug);
  if (!set) return [];
  const cultural: AnyExemplar[] = set.cultural.slice(0, n).map((e) => ({ kind: "cultural", ...e }));
  if (cultural.length >= n) return cultural;
  const remaining = n - cultural.length;
  const historical: AnyExemplar[] = set.historical
    .slice(0, remaining)
    .map((e) => ({ kind: "historical", ...e }));
  return [...cultural, ...historical];
}

export interface ClusterOccupantExemplars {
  system: SystemId;
  slug: string;
  exemplars: AnyExemplar[];
}

export function getClusterExemplars(clusterId: string, perArchetype = 3): ClusterOccupantExemplars[] {
  const cluster = CLUSTERS.find((c) => c.id === clusterId);
  if (!cluster) return [];
  return cluster.archetypes
    .map<ClusterOccupantExemplars>((a) => ({
      system: a.system,
      slug: a.slug,
      exemplars: topExemplars(a.system, a.slug, perArchetype),
    }))
    .filter((r) => r.exemplars.length > 0);
}

/** Flat list of ALL exemplars across a system, tagged with their archetype slug.
 *  Useful for the /atlas/exemplars indexer. */
export function allExemplarsForSystem(system: SystemId): Array<
  AnyExemplar & { archetypeSlug: string; system: SystemId }
> {
  const set = REGISTRY[system] ?? {};
  const out: Array<AnyExemplar & { archetypeSlug: string; system: SystemId }> = [];
  for (const [slug, data] of Object.entries(set)) {
    for (const e of data.cultural) {
      out.push({ kind: "cultural", ...e, archetypeSlug: slug, system });
    }
    for (const e of data.historical) {
      out.push({ kind: "historical", ...e, archetypeSlug: slug, system });
    }
  }
  return out;
}
