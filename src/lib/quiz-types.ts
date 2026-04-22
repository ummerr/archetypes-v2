import type { SystemId, ConfidenceTier, ThematicCluster } from "@/data/resonance";
import type { Stage } from "@/data/atlas-lens-axes";

// Feature space shared with research/08-structural-similarity.json and the
// checked-in artifact src/data/feature-vectors.json. The classifier measures
// archetype↔user distance in this space.
//
// User-scorable dims: six. Shadow structure is per-system metadata, not a
// user axis — it is surfaced on the Reading as context ("this system frames
// shadow as passion-virtue"), not measured.

export type AffectCategory = "anger" | "shame" | "fear" | "desire" | "mixed";
export type NarrativePosition = "departure" | "initiation" | "liminal" | "return";
export type StanceCategory = "toward" | "against" | "away" | "balanced";
export type ShadowGrammar =
  | "bipolar"
  | "unipolar"
  | "passion-virtue"
  | "stack-inversion"
  | "mirror"
  | "reversal";

// A discrete archetype position in feature-vectors.json.
export interface ArchetypeFeatureVector {
  stability_risk: number;
  belonging_independence: number;
  developmental_stage: Stage;
  shadow_structure: ShadowGrammar;
  affect_center: AffectCategory;
  narrative_position: NarrativePosition;
  relational_stance: StanceCategory;
}

// A user's scored position — continuous dims carry a point estimate; categorical
// dims carry a normalized probability distribution so that "mixed" and "balanced"
// emerge naturally from near-equal top responses instead of being special-cased.
export interface UserVector {
  stability_risk: number; // -1..+1
  belonging_independence: number; // -1..+1
  stage: Record<Stage, number>; // sums to 1
  affect: Record<AffectCategory, number>; // sums to 1; "mixed" is derived, not scored directly
  narrative: Record<NarrativePosition, number>; // sums to 1
  stance: Record<StanceCategory, number>; // sums to 1; "balanced" derived
}

// Items are discriminated by kind. Each option carries a delta — the vector
// contribution of selecting that option. The scorer aggregates deltas across
// responses, then normalizes categoricals to probability distributions.

export type QuizSection =
  | "calibration"
  | "relational-affect"
  | "narrative"
  | "shadow";

export interface OptionDelta {
  stability_risk?: number;
  belonging_independence?: number;
  stage?: Partial<Record<Stage, number>>;
  affect?: Partial<Record<Exclude<AffectCategory, "mixed">, number>>;
  narrative?: Partial<Record<NarrativePosition, number>>;
  stance?: Partial<Record<Exclude<StanceCategory, "balanced">, number>>;
}

// A Likert response is a number 1..7. We translate 1..7 into per-dim deltas
// via the item's `dim` + `polarity`. Stage-dim Likerts additionally distribute
// across the 5 stage categories with a triangular window around the response.
export interface LikertItem {
  id: string;
  kind: "likert";
  section: QuizSection;
  prompt: string;
  // Which dim this Likert probes. For continuous dims (stability, belonging),
  // the 1..7 response maps directly to [-1,+1]. For stage, the 1..7 response
  // maps to a triangular distribution over the 5 stage categories.
  dim: "stability_risk" | "belonging_independence" | "stage";
  polarity: 1 | -1;
  anchors?: { low: string; high: string };
}

export interface ForcedChoiceItem {
  id: string;
  kind: "forced-choice";
  section: QuizSection;
  prompt: string;
  options: ForcedChoiceOption[];
}

export interface ForcedChoiceOption {
  id: string;
  label: string;
  body?: string;
  delta: OptionDelta;
}

export interface ScenarioItem {
  id: string;
  kind: "scenario";
  section: QuizSection;
  prompt: string;
  scene: string; // the italic-paragraph setup
  options: ScenarioOption[];
}

export interface ScenarioOption {
  id: string;
  label: string;
  body?: string;
  delta: OptionDelta;
}

export type QuizItem = LikertItem | ForcedChoiceItem | ScenarioItem;

// A user's response. `value` is item-kind-dependent:
//   likert        → integer 1..7
//   forced-choice → option id
//   scenario      → option id
export interface QuizResponse {
  itemId: string;
  value: number | string;
}

// ----------------------------------------------------------------------------
// Classification output
// ----------------------------------------------------------------------------

// The raw structural output of the classifier. Phase 4 composes this into
// editorial copy; Phase 1 stops at structure.

export interface PerSystemMatch {
  system: SystemId;
  primary: {
    slug: string;
    distance: number; // lower is closer
    matchQuality: number; // 0..1, derived from distance
  };
  secondary: {
    slug: string;
    distance: number;
    matchQuality: number;
  } | null;
  // Tier drawn from the primary's grounded-resonance-map membership in its
  // top cluster. May be weaker than matchQuality implies; take the weaker.
  dataConfidence: ConfidenceTier | null;
  // Per-system shadow grammar (output-only context for the Reading card).
  shadowGrammar: ShadowGrammar;
}

export interface ClusterMatch {
  cluster: ThematicCluster;
  // 0..1 — how strongly the user's vector resonates with the cluster's
  // average member position. The constellation's graded-glow uses this.
  strength: number;
}

export interface AxisSummary {
  stage: { dominant: Stage; confidence: number };
  affect: { dominant: AffectCategory; confidence: number };
  narrative: { dominant: NarrativePosition; confidence: number };
  stance: { dominant: StanceCategory; confidence: number };
  stability_risk: number; // -1..+1
  belonging_independence: number; // -1..+1
}

export interface ClassificationResult {
  vector: UserVector;
  axisSummary: AxisSummary;
  perSystem: Record<SystemId, PerSystemMatch>;
  // Primary system = the per-system match with the highest (matchQuality
  // weighted by dataConfidence). This system gets the hero treatment in the
  // Reading layout.
  primarySystem: SystemId;
  // All 21 clusters scored, sorted by strength desc. UI slices as needed.
  clusters: ClusterMatch[];
  // Counter-canon activation. Rules live in the classifier; flags are
  // surfaced here as concrete, non-essentializing tags.
  counterCanonTags: string[];
  // Subset of Mission-11 open questions relevant to this profile.
  openQuestions: string[];
}
