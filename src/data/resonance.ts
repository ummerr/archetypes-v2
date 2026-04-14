import groundedMap from "./grounded-resonance-map.json";

export type SystemId =
  | "kwml"
  | "jungian"
  | "enneagram"
  | "mbti"
  | "heros-journey"
  | "tarot";

export type ConfidenceTier =
  | "canonical"
  | "strong"
  | "moderate"
  | "speculative"
  | "contested";

export interface ResonanceEntry {
  system: SystemId;
  slug: string;
  note: string;
  strength: "primary" | "secondary";
  confidence: ConfidenceTier;
  primarySourceCitation?: string;
  scholarlyCitation?: string;
  dissent?: string;
  editorialNote?: string;
  adversarialNote?: string;
}

export interface ThematicCluster {
  id: string;
  theme: string;
  description: string;
  editorialNote?: string;
  adversarialNote?: string;
  archetypes: ResonanceEntry[];
}

export interface AtlasAxes {
  developmentalStage: { label: string; note: string; endStates: Record<string, string> };
  affectCenter: { label: string; tints: string[]; note: string };
  relationalStance: { label: string; values: string[]; note: string };
}

interface RawEntry {
  system: string;
  slug: string;
  note: string;
  strength?: string;
  confidence?: string;
  primarySourceCitation?: string;
  scholarlyCitation?: string;
  dissent?: string;
  editorialNote?: string;
  adversarialNote?: string;
}

interface RawCluster {
  id: string;
  theme: string;
  description: string;
  editorialNote?: string;
  adversarialNote?: string;
  archetypes: RawEntry[];
}

const raw = groundedMap as unknown as {
  clusters: RawCluster[];
  axes: AtlasAxes;
  openQuestions: string[];
  systemBlindSpots: Record<SystemId, string>;
  confidenceTiers: Record<ConfidenceTier, string>;
  stance: string;
  stanceNote: string;
};

export const CLUSTERS: ThematicCluster[] = raw.clusters.map((c) => ({
  id: c.id,
  theme: c.theme,
  description: c.description,
  editorialNote: c.editorialNote,
  adversarialNote: c.adversarialNote,
  archetypes: c.archetypes.map((a) => ({
    system: a.system as SystemId,
    slug: a.slug,
    note: a.note,
    strength: (a.strength === "primary" ? "primary" : "secondary") as "primary" | "secondary",
    confidence: (a.confidence ?? "moderate") as ConfidenceTier,
    primarySourceCitation: a.primarySourceCitation,
    scholarlyCitation: a.scholarlyCitation,
    dissent: a.dissent,
    editorialNote: a.editorialNote,
    adversarialNote: a.adversarialNote,
  })),
}));

export const ATLAS_AXES: AtlasAxes = raw.axes;
export const OPEN_QUESTIONS: string[] = raw.openQuestions;
export const SYSTEM_BLIND_SPOTS: Record<SystemId, string> = raw.systemBlindSpots;
export const CONFIDENCE_TIERS: Record<ConfidenceTier, string> = raw.confidenceTiers;
export const STANCE_NOTE: string = raw.stanceNote;
