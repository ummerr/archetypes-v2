import raw from "./feature-vectors.json";
import type { SystemId } from "@/data/resonance";

export type DevelopmentalStage =
  | "pre-initiation"
  | "striving"
  | "liminal"
  | "integrating"
  | "integrated";

export type NarrativePosition = "departure" | "initiation" | "liminal" | "return";

export type AffectCenter = "fear" | "shame" | "desire" | "anger" | "mixed";

export type RelationalStance = "toward" | "away" | "against" | "balanced";

export type ShadowStructure =
  | "bipolar"
  | "unipolar"
  | "mirror"
  | "passion-virtue"
  | "stack-inversion"
  | "reversal";

export interface FeatureVector {
  stability_risk: number;
  belonging_independence: number;
  developmental_stage: DevelopmentalStage;
  shadow_structure: ShadowStructure;
  affect_center: AffectCenter;
  narrative_position: NarrativePosition;
  relational_stance: RelationalStance;
}

const FEATURE_VECTORS = (raw as unknown as {
  feature_vectors: Record<SystemId, Record<string, FeatureVector>>;
}).feature_vectors;

export function getFeatureVector(system: SystemId, slug: string): FeatureVector | undefined {
  return FEATURE_VECTORS[system]?.[slug];
}

export interface VectorPoint {
  system: SystemId;
  slug: string;
  vector: FeatureVector;
}

export function getAllVectorPoints(): VectorPoint[] {
  const out: VectorPoint[] = [];
  for (const [system, items] of Object.entries(FEATURE_VECTORS) as [
    SystemId,
    Record<string, FeatureVector>,
  ][]) {
    for (const [slug, vector] of Object.entries(items)) {
      out.push({ system, slug, vector });
    }
  }
  return out;
}

export const DEVELOPMENTAL_ORDINAL: Record<DevelopmentalStage, number> = {
  "pre-initiation": 0,
  striving: 0.25,
  liminal: 0.5,
  integrating: 0.75,
  integrated: 1,
};

export const NARRATIVE_ORDINAL: Record<NarrativePosition, number> = {
  departure: 0,
  initiation: 0.33,
  liminal: 0.66,
  return: 1,
};

export const AFFECT_COLOR: Record<AffectCenter, string> = {
  fear: "#6B8CB3",
  shame: "#A67BA6",
  desire: "#C27BA0",
  anger: "#C26A6A",
  mixed: "#8B8B8B",
};

export const RELATIONAL_LABEL: Record<RelationalStance, string> = {
  toward: "Toward",
  away: "Away",
  against: "Against",
  balanced: "Balanced",
};
