import featureVectorsJson from "@/data/feature-vectors.json";
import {
  CLUSTERS,
  OPEN_QUESTIONS,
  type SystemId,
  type ConfidenceTier,
  type ResonanceEntry,
} from "@/data/resonance";
import { STAGES, type Stage } from "@/data/atlas-lens-axes";
import type {
  AffectCategory,
  ArchetypeFeatureVector,
  AxisSummary,
  ClassificationResult,
  ClusterMatch,
  NarrativePosition,
  PerSystemMatch,
  StanceCategory,
  UserVector,
} from "@/lib/quiz-types";

const SYSTEM_IDS: SystemId[] = [
  "kwml",
  "jungian",
  "enneagram",
  "mbti",
  "heros-journey",
  "tarot",
];

const STAGE_ORDER: Stage[] = STAGES;
const NARRATIVE_ORDER: NarrativePosition[] = [
  "departure",
  "initiation",
  "liminal",
  "return",
];

type RawVectors = Record<SystemId, Record<string, ArchetypeFeatureVector>>;
const FEATURE_VECTORS = (featureVectorsJson as { feature_vectors: RawVectors })
  .feature_vectors;

// ----------------------------------------------------------------------------
// Distance
// ----------------------------------------------------------------------------

// Weighted-Euclidean-ish distance in ∈ [0, 1]. Continuous dims contribute a
// normalized squared diff; ordinal dims (stage, narrative) contribute the
// expected ordinal offset under the user's distribution; nominal dims (affect,
// stance) contribute miss-probability. "mixed" and "balanced" archetypes match
// when the user's top response in the relevant dim is not decisive.
function distance(user: UserVector, a: ArchetypeFeatureVector): number {
  const dStability = ((user.stability_risk - a.stability_risk) / 2) ** 2;
  const dBelonging =
    ((user.belonging_independence - a.belonging_independence) / 2) ** 2;

  const stageIdx = STAGE_ORDER.indexOf(a.developmental_stage);
  let dStage = 0;
  for (const s of STAGE_ORDER) {
    dStage += user.stage[s] * (Math.abs(STAGE_ORDER.indexOf(s) - stageIdx) / 4);
  }

  const narrIdx = NARRATIVE_ORDER.indexOf(a.narrative_position);
  let dNarrative = 0;
  for (const n of NARRATIVE_ORDER) {
    dNarrative +=
      user.narrative[n] * (Math.abs(NARRATIVE_ORDER.indexOf(n) - narrIdx) / 3);
  }

  let dAffect: number;
  if (a.affect_center === "mixed") {
    // Archetype is "mixed" (Wheel of Fortune, Temperance, The World). User is
    // best match when their affect distribution is flat — no decisive peak.
    dAffect = Math.max(
      user.affect.anger,
      user.affect.shame,
      user.affect.fear,
      user.affect.desire,
    );
  } else {
    dAffect = 1 - (user.affect[a.affect_center] ?? 0);
  }

  let dStance: number;
  if (a.relational_stance === "balanced") {
    dStance = Math.max(
      user.stance.toward,
      user.stance.against,
      user.stance.away,
    );
  } else {
    dStance = 1 - (user.stance[a.relational_stance] ?? 0);
  }

  return (dStability + dBelonging + dStage + dNarrative + dAffect + dStance) / 6;
}

// ----------------------------------------------------------------------------
// Axis summary
// ----------------------------------------------------------------------------

function dominantOf<K extends string>(
  dist: Record<K, number>,
): { dominant: K; confidence: number } {
  let bestKey: K | null = null;
  let bestVal = -Infinity;
  let total = 0;
  for (const [k, v] of Object.entries(dist) as [K, number][]) {
    total += v;
    if (v > bestVal) {
      bestVal = v;
      bestKey = k;
    }
  }
  const confidence = total > 0 && bestKey ? bestVal / total : 0;
  return { dominant: bestKey ?? (Object.keys(dist)[0] as K), confidence };
}

function summarizeAxes(user: UserVector): AxisSummary {
  const stage = dominantOf<Stage>(user.stage);
  const stance = dominantOf<StanceCategory>(
    user.stance as Record<StanceCategory, number>,
  );
  const narrative = dominantOf<NarrativePosition>(user.narrative);
  const affect = dominantOf<AffectCategory>(
    user.affect as Record<AffectCategory, number>,
  );

  // Promote "mixed" / "balanced" if the top category isn't decisive.
  const MIXED_THRESHOLD = 0.45;
  const stanceOut =
    stance.confidence < MIXED_THRESHOLD
      ? { dominant: "balanced" as StanceCategory, confidence: 1 - stance.confidence }
      : stance;
  const affectOut =
    affect.confidence < MIXED_THRESHOLD
      ? { dominant: "mixed" as AffectCategory, confidence: 1 - affect.confidence }
      : affect;

  return {
    stage,
    narrative,
    stance: stanceOut,
    affect: affectOut,
    stability_risk: user.stability_risk,
    belonging_independence: user.belonging_independence,
  };
}

// ----------------------------------------------------------------------------
// Per-system nearest neighbor
// ----------------------------------------------------------------------------

function rankSystem(user: UserVector, system: SystemId) {
  const entries = Object.entries(FEATURE_VECTORS[system] ?? {});
  return entries
    .map(([slug, vec]) => ({ slug, vec, distance: distance(user, vec) }))
    .sort((a, b) => a.distance - b.distance);
}

// Look up a resonance entry (with confidence tier) for a given archetype. We
// take the strongest tier across all clusters the archetype belongs to — if
// an archetype is canonical in any cluster, its mapping carries canonical
// weight when surfaced in the Reading.
const TIER_RANK: Record<ConfidenceTier, number> = {
  canonical: 5,
  strong: 4,
  moderate: 3,
  speculative: 2,
  contested: 1,
};

function bestConfidenceFor(
  system: SystemId,
  slug: string,
): ConfidenceTier | null {
  let best: ConfidenceTier | null = null;
  for (const cluster of CLUSTERS) {
    for (const entry of cluster.archetypes) {
      if (entry.system !== system || entry.slug !== slug) continue;
      if (!best || TIER_RANK[entry.confidence] > TIER_RANK[best]) {
        best = entry.confidence;
      }
    }
  }
  return best;
}

function classifyPerSystem(user: UserVector): Record<SystemId, PerSystemMatch> {
  const out = {} as Record<SystemId, PerSystemMatch>;
  for (const system of SYSTEM_IDS) {
    const ranked = rankSystem(user, system);
    const primary = ranked[0];
    const secondary = ranked[1] ?? null;
    if (!primary) continue;

    out[system] = {
      system,
      primary: {
        slug: primary.slug,
        distance: primary.distance,
        matchQuality: 1 - primary.distance,
      },
      secondary: secondary
        ? {
            slug: secondary.slug,
            distance: secondary.distance,
            matchQuality: 1 - secondary.distance,
          }
        : null,
      dataConfidence: bestConfidenceFor(system, primary.slug),
      shadowGrammar: primary.vec.shadow_structure,
    };
  }
  return out;
}

// Primary system = the system whose nearest archetype has the strongest
// combined (matchQuality × dataConfidence). Falls back to matchQuality alone
// when the archetype has no grounded-map entry.
function derivePrimarySystem(
  perSystem: Record<SystemId, PerSystemMatch>,
): SystemId {
  let bestSys: SystemId = SYSTEM_IDS[0];
  let bestScore = -Infinity;
  for (const system of SYSTEM_IDS) {
    const m = perSystem[system];
    if (!m) continue;
    const tierBoost = m.dataConfidence ? TIER_RANK[m.dataConfidence] / 5 : 0.5;
    const score = m.primary.matchQuality * (0.6 + 0.4 * tierBoost);
    if (score > bestScore) {
      bestScore = score;
      bestSys = system;
    }
  }
  return bestSys;
}

// ----------------------------------------------------------------------------
// Cluster match strengths
// ----------------------------------------------------------------------------

// For each of the 21 clusters, compute a strength based on the *primary*
// members' distances (primaries define the cluster's center of mass; secondaries
// pull less). The constellation render uses this for graded glow.
function scoreClusters(user: UserVector): ClusterMatch[] {
  const scored: ClusterMatch[] = CLUSTERS.map((cluster) => {
    const primaries = cluster.archetypes.filter((a) => a.strength === "primary");
    const secondaries = cluster.archetypes.filter(
      (a) => a.strength === "secondary",
    );
    const primaryDistances = primaries
      .map((e) => vectorFor(e))
      .filter((v): v is ArchetypeFeatureVector => v !== null)
      .map((v) => distance(user, v));
    const secondaryDistances = secondaries
      .map((e) => vectorFor(e))
      .filter((v): v is ArchetypeFeatureVector => v !== null)
      .map((v) => distance(user, v));

    // Weighted avg: primaries count full, secondaries at 0.5.
    let weight = primaryDistances.length;
    let sum = primaryDistances.reduce((a, b) => a + b, 0);
    weight += secondaryDistances.length * 0.5;
    sum += secondaryDistances.reduce((a, b) => a + b, 0) * 0.5;
    const avgDistance = weight > 0 ? sum / weight : 1;
    return { cluster, strength: Math.max(0, 1 - avgDistance) };
  });
  scored.sort((a, b) => b.strength - a.strength);
  return scored;
}

function vectorFor(entry: ResonanceEntry): ArchetypeFeatureVector | null {
  const systemVectors = FEATURE_VECTORS[entry.system];
  if (!systemVectors) return null;
  return systemVectors[entry.slug] ?? null;
}

// ----------------------------------------------------------------------------
// Counter-canon activation
// ----------------------------------------------------------------------------

// Non-essentializing rules. Tags are surface-offerings ("these lenses also
// inform this territory"), never identity claims.
function deriveCounterCanonTags(
  user: UserVector,
  clusters: ClusterMatch[],
): string[] {
  const tags: string[] = [];
  const topClusterIds = new Set(clusters.slice(0, 5).map((c) => c.cluster.id));
  const axes = summarizeAxes(user);

  // Bolen / Estés — desire-centered, generative-embodiment territory.
  if (
    axes.affect.dominant === "desire" &&
    (topClusterIds.has("lover") ||
      topClusterIds.has("creator") ||
      topClusterIds.has("innocent"))
  ) {
    tags.push("bolen-estes");
  }

  // Murdock — return arc + integrating/integrated stage + relational-domestic
  // clusters. Not gendered in the trigger — about the arc she named, offered
  // to anyone whose profile lands there.
  const stageIdx = STAGE_ORDER.indexOf(axes.stage.dominant);
  if (
    axes.narrative.dominant === "return" &&
    stageIdx >= 3 && // integrating or integrated
    (topClusterIds.has("caregiver") ||
      topClusterIds.has("integration") ||
      topClusterIds.has("lover"))
  ) {
    tags.push("murdock");
  }

  return tags;
}

// ----------------------------------------------------------------------------
// Main entry point
// ----------------------------------------------------------------------------

export function classifyVector(user: UserVector): ClassificationResult {
  const axisSummary = summarizeAxes(user);
  const perSystem = classifyPerSystem(user);
  const primarySystem = derivePrimarySystem(perSystem);
  const clusters = scoreClusters(user);
  const counterCanonTags = deriveCounterCanonTags(user, clusters);

  return {
    vector: user,
    axisSummary,
    perSystem,
    primarySystem,
    clusters,
    counterCanonTags,
    openQuestions: [...OPEN_QUESTIONS],
  };
}

// ----------------------------------------------------------------------------
// Helpers re-exported for Phase 4's editorial composer
// ----------------------------------------------------------------------------

export { distance as __distance };
export { scoreClusters as __scoreClusters };
export { TIER_RANK };

// ----------------------------------------------------------------------------
// Dev-mode guardrail — sanity-check three hand-crafted profiles.
// ----------------------------------------------------------------------------

if (process.env.NODE_ENV !== "production") {
  const sovereign: UserVector = {
    stability_risk: 0.8,
    belonging_independence: 0.5,
    stage: {
      "pre-initiation": 0,
      striving: 0,
      liminal: 0.1,
      integrating: 0.3,
      integrated: 0.6,
    },
    affect: { anger: 0.6, shame: 0.1, fear: 0.1, desire: 0.2, mixed: 0 },
    narrative: { departure: 0, initiation: 0.1, liminal: 0.1, return: 0.8 },
    stance: { toward: 0.7, against: 0.2, away: 0.1, balanced: 0 },
  };
  const explorerSeeker: UserVector = {
    stability_risk: -0.5,
    belonging_independence: -0.6,
    stage: {
      "pre-initiation": 0,
      striving: 0.7,
      liminal: 0.2,
      integrating: 0.1,
      integrated: 0,
    },
    affect: { anger: 0.1, shame: 0.15, fear: 0.55, desire: 0.2, mixed: 0 },
    narrative: { departure: 0.7, initiation: 0.2, liminal: 0.1, return: 0 },
    stance: { toward: 0.1, against: 0.2, away: 0.7, balanced: 0 },
  };
  const liminalMystic: UserVector = {
    stability_risk: -0.1,
    belonging_independence: -0.2,
    stage: {
      "pre-initiation": 0,
      striving: 0.1,
      liminal: 0.6,
      integrating: 0.3,
      integrated: 0,
    },
    affect: { anger: 0.1, shame: 0.3, fear: 0.2, desire: 0.4, mixed: 0 },
    narrative: { departure: 0, initiation: 0.3, liminal: 0.6, return: 0.1 },
    stance: { toward: 0.2, against: 0.15, away: 0.6, balanced: 0.05 },
  };

  for (const [name, v] of [
    ["sovereign-like", sovereign],
    ["explorer-seeker", explorerSeeker],
    ["liminal-mystic", liminalMystic],
  ] as const) {
    const result = classifyVector(v);
    const top = result.perSystem[result.primarySystem];
    if (!top) {
      console.warn(`[quiz-classifier] ${name}: no primary match`);
      continue;
    }
    if (top.primary.matchQuality < 0.5) {
      console.warn(
        `[quiz-classifier] ${name}: weak primary match (${top.primary.matchQuality.toFixed(2)}) for ${top.system}/${top.primary.slug}`,
      );
    }
  }
}
