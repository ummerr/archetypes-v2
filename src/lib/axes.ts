import { CLUSTERS, type SystemId, type ThematicCluster } from "@/data/resonance";
import {
  CLUSTER_AXES,
  STAGES,
  AFFECTS,
  STANCES,
  STAGE_LABELS,
  AFFECT_LABELS,
  STANCE_LABELS,
  AFFECT_ACCENT,
  type Stage,
  type Affect,
  type Stance,
  type ClusterAxes,
} from "@/data/atlas-lens-axes";

export type AxisKey = "stage" | "affect" | "stance";

export const AXIS_VALUES: {
  stage: Stage[];
  affect: Affect[];
  stance: Stance[];
} = { stage: STAGES, affect: AFFECTS, stance: STANCES };

export const AXIS_LABELS: {
  stage: Record<Stage, string>;
  affect: Record<Affect, string>;
  stance: Record<Stance, string>;
} = { stage: STAGE_LABELS, affect: AFFECT_LABELS, stance: STANCE_LABELS };

export const AXIS_TITLES: Record<AxisKey, string> = {
  stage: "Developmental stage",
  affect: "Affect center",
  stance: "Relational stance",
};

export function clusterAxes(id: string): ClusterAxes | undefined {
  return CLUSTER_AXES[id];
}

/** Clusters an archetype lives in (may be multiple) */
export function clustersForArchetype(system: SystemId, slug: string): ThematicCluster[] {
  return CLUSTERS.filter((c) =>
    c.archetypes.some((a) => a.system === system && a.slug === slug),
  );
}

/** All axes the archetype touches via its cluster memberships */
export function archetypeAxes(system: SystemId, slug: string): ClusterAxes[] {
  return clustersForArchetype(system, slug)
    .map((c) => CLUSTER_AXES[c.id])
    .filter((x): x is ClusterAxes => Boolean(x));
}

export interface AxisDistribution {
  stage: Record<Stage, number>;
  affect: Record<Affect, number>;
  stance: Record<Stance, number>;
  total: number;
}

export function emptyDistribution(): AxisDistribution {
  const stage = Object.fromEntries(STAGES.map((s) => [s, 0])) as Record<Stage, number>;
  const affect = Object.fromEntries(AFFECTS.map((a) => [a, 0])) as Record<Affect, number>;
  const stance = Object.fromEntries(STANCES.map((s) => [s, 0])) as Record<Stance, number>;
  return { stage, affect, stance, total: 0 };
}

/** Build an axis distribution from a list of cluster ids (weights optional). */
export function distributionFromClusters(
  clusters: { id: string; weight?: number }[],
): AxisDistribution {
  const dist = emptyDistribution();
  for (const { id, weight = 1 } of clusters) {
    const ax = CLUSTER_AXES[id];
    if (!ax) continue;
    dist.stage[ax.stage] += weight;
    dist.affect[ax.affect] += weight;
    dist.stance[ax.stance] += weight;
    dist.total += weight;
  }
  return dist;
}

export interface BlindSpot {
  axis: AxisKey;
  value: Stage | Affect | Stance;
  label: string;
  missingClusters: ThematicCluster[];
}

/** Find the single axis-value most absent from the distribution, ignoring axes with zero total. */
export function findBlindSpot(dist: AxisDistribution): BlindSpot | undefined {
  if (dist.total === 0) return undefined;
  const candidates: { axis: AxisKey; value: string; count: number; exists: number }[] = [];
  for (const axis of ["stage", "affect", "stance"] as AxisKey[]) {
    for (const value of AXIS_VALUES[axis] as string[]) {
      const count = (dist[axis] as Record<string, number>)[value] ?? 0;
      const exists = CLUSTERS.filter((c) => {
        const ax = CLUSTER_AXES[c.id];
        return ax && (ax as unknown as Record<string, string>)[axis] === value;
      }).length;
      if (exists > 0) candidates.push({ axis, value, count, exists });
    }
  }
  candidates.sort((a, b) => a.count - b.count || b.exists - a.exists);
  const top = candidates[0];
  if (!top || top.count > 0) return undefined;
  const missing = CLUSTERS.filter((c) => {
    const ax = CLUSTER_AXES[c.id];
    return ax && (ax as unknown as Record<string, string>)[top.axis] === top.value;
  });
  const label = (AXIS_LABELS[top.axis] as Record<string, string>)[top.value] ?? top.value;
  return {
    axis: top.axis,
    value: top.value as Stage | Affect | Stance,
    label,
    missingClusters: missing,
  };
}

export function axisAccent(axis: AxisKey, value: string): string | undefined {
  if (axis === "affect") return AFFECT_ACCENT[value as Affect];
  return undefined;
}
