import { CLUSTERS, type SystemId } from "@/data/resonance";
import { SYSTEMS } from "@/data/systems";

export const SYSTEM_IDS: SystemId[] = SYSTEMS.map((s) => s.id as SystemId);

export interface ClusterChip {
  id: string;
  label: string;
  systems: SystemId[];
  primarySystems: SystemId[];
}

export const CLUSTER_CHIPS: ClusterChip[] = CLUSTERS.map((c) => {
  const systems = new Set<SystemId>();
  const primaries = new Set<SystemId>();
  for (const a of c.archetypes) {
    systems.add(a.system);
    if (a.strength === "primary") primaries.add(a.system);
  }
  const label = c.theme.split("-")[0].trim().replace(/^The\s+/i, "");
  return {
    id: c.id,
    label,
    systems: [...systems],
    primarySystems: [...primaries],
  };
});

const matrix: Record<string, number> = {};
function key(a: SystemId, b: SystemId) {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}
for (const c of CLUSTERS) {
  const ids = Array.from(new Set(c.archetypes.map((a) => a.system)));
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const k = key(ids[i], ids[j]);
      matrix[k] = (matrix[k] ?? 0) + 1;
    }
  }
}

export function clusterCoincidence(a: SystemId, b: SystemId): number {
  return matrix[key(a, b)] ?? 0;
}

export function systemsForCluster(clusterId: string): SystemId[] {
  return CLUSTER_CHIPS.find((c) => c.id === clusterId)?.systems ?? [];
}

export function clustersForSystemPrimary(system: SystemId): string[] {
  return CLUSTER_CHIPS.filter((c) => c.primarySystems.includes(system)).map((c) => c.id);
}

export function clustersContainingSystem(system: SystemId): string[] {
  return CLUSTER_CHIPS.filter((c) => c.systems.includes(system)).map((c) => c.id);
}
