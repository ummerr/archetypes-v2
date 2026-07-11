import type { MirrorClusterId } from "@/data/mirror-questions";

// Canonical thematic hues for all 20 atlas clusters. Consumed by the Mirror
// scaffold, the Reading constellation, both OG image routes, and the cluster
// resonance list. Kept in one place so a tune to "rebel" (say) propagates
// everywhere at once.
export const CLUSTER_COLORS: Record<string, string> = {
  sovereign: "#E0C065",
  warrior: "#D6614A",
  "sage-magician": "#9B87C4",
  lover: "#E08597",
  innocent: "#EADBA8",
  explorer: "#5DB8A0",
  rebel: "#B64558",
  creator: "#E89B4F",
  jester: "#F0C555",
  caregiver: "#8AB876",
  everyman: "#C3A07D",
  "death-rebirth": "#7E5BA0",
  teacher: "#7FA2CC",
  "liminal-territory": "#ADA0C6",
  antagonists: "#8a4a5a",
  shapeshifter: "#9a7ac9",
  "threshold-guardian": "#7a5a4a",
  herald: "#c9b884",
  integration: "#e6d47a",
  "boy-hero": "#e6944a",
};

// Fallback hue used when a cluster id isn't in the palette. Matches the
// existing atlas motif fallback so the Reading / Mirror don't introduce
// a new off-tone color if the data gains a new cluster.
export const CLUSTER_COLOR_FALLBACK = "#c6a355";

// Type-narrow accessor for the 14 Mirror clusters. Guaranteed defined
// because MirrorClusterId is a finite subset of the keys above.
export function mirrorClusterColor(id: MirrorClusterId): string {
  return CLUSTER_COLORS[id] ?? CLUSTER_COLOR_FALLBACK;
}
