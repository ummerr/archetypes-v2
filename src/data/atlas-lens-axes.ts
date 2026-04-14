import { CLUSTERS } from "./resonance";

export type Stage =
  | "pre-initiation"
  | "striving"
  | "liminal"
  | "integrating"
  | "integrated";

export type Affect = "gut" | "heart" | "head" | "eros";

export type Stance = "toward" | "against" | "away";

export interface ClusterAxes {
  stage: Stage;
  affect: Affect;
  stance: Stance;
  motifColor: string;
}

export const STAGES: Stage[] = [
  "pre-initiation",
  "striving",
  "liminal",
  "integrating",
  "integrated",
];

export const STAGE_LABELS: Record<Stage, string> = {
  "pre-initiation": "Pre-initiation",
  striving: "Striving",
  liminal: "Liminal",
  integrating: "Integrating",
  integrated: "Integrated",
};

export const AFFECTS: Affect[] = ["gut", "heart", "head", "eros"];

export const AFFECT_LABELS: Record<Affect, string> = {
  gut: "Gut · Anger",
  heart: "Heart · Shame",
  head: "Head · Fear",
  eros: "Eros · Desire",
};

export const AFFECT_ACCENT: Record<Affect, string> = {
  gut: "#d9534f",
  heart: "#d97a84",
  head: "#7aa3d9",
  eros: "#c084fc",
};

export const STANCES: Stance[] = ["toward", "against", "away"];

export const STANCE_LABELS: Record<Stance, string> = {
  toward: "Toward",
  against: "Against",
  away: "Away",
};

export const CLUSTER_AXES: Record<string, ClusterAxes> = {
  sovereign:            { stage: "integrated",    affect: "gut",   stance: "toward",  motifColor: "#e6c47a" },
  warrior:              { stage: "striving",      affect: "gut",   stance: "against", motifColor: "#c9584a" },
  "sage-magician":      { stage: "integrating",   affect: "head",  stance: "away",    motifColor: "#7aa3d9" },
  lover:                { stage: "integrating",   affect: "eros",  stance: "toward",  motifColor: "#d97a84" },
  innocent:             { stage: "pre-initiation",affect: "heart", stance: "toward",  motifColor: "#a8c97a" },
  explorer:             { stage: "striving",      affect: "head",  stance: "away",    motifColor: "#7ac9b8" },
  rebel:                { stage: "striving",      affect: "gut",   stance: "against", motifColor: "#d9734a" },
  caregiver:            { stage: "integrating",   affect: "heart", stance: "toward",  motifColor: "#e6a97a" },
  jester:               { stage: "liminal",       affect: "eros",  stance: "against", motifColor: "#d9b84a" },
  creator:              { stage: "integrating",   affect: "eros",  stance: "away",    motifColor: "#b884e6" },
  everyman:             { stage: "integrating",   affect: "heart", stance: "toward",  motifColor: "#a89a7a" },
  antagonists:          { stage: "striving",      affect: "gut",   stance: "against", motifColor: "#8a4a5a" },
  shapeshifter:         { stage: "liminal",       affect: "eros",  stance: "away",    motifColor: "#9a7ac9" },
  "threshold-guardian": { stage: "striving",      affect: "gut",   stance: "against", motifColor: "#7a5a4a" },
  herald:               { stage: "liminal",       affect: "head",  stance: "away",    motifColor: "#c9b884" },
  "death-rebirth":      { stage: "liminal",       affect: "heart", stance: "away",    motifColor: "#5a4a6a" },
  integration:          { stage: "integrated",    affect: "eros",  stance: "toward",  motifColor: "#e6d47a" },
  teacher:              { stage: "integrated",    affect: "head",  stance: "toward",  motifColor: "#7ac9a8" },
  "boy-hero":           { stage: "striving",      affect: "gut",   stance: "against", motifColor: "#e6944a" },
  "liminal-territory":  { stage: "liminal",       affect: "heart", stance: "away",    motifColor: "#4a5a7a" },
};

// Guardrail: any missing cluster id from CLUSTERS falls back to neutral axes.
for (const c of CLUSTERS) {
  if (!CLUSTER_AXES[c.id]) {
    CLUSTER_AXES[c.id] = {
      stage: "integrating",
      affect: "head",
      stance: "toward",
      motifColor: "#888",
    };
  }
}

// Resolve an archetype's axes by its primary cluster membership.
export function archetypeAxes(
  clusterIds: string[],
): ClusterAxes {
  for (const cid of clusterIds) {
    const a = CLUSTER_AXES[cid];
    if (a) return a;
  }
  return { stage: "integrating", affect: "head", stance: "toward", motifColor: "#888" };
}
