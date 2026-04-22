import { STAGES, type Stage } from "@/data/atlas-lens-axes";
import type {
  AffectCategory,
  LikertItem,
  NarrativePosition,
  OptionDelta,
  QuizItem,
  QuizResponse,
  StanceCategory,
  UserVector,
} from "@/lib/quiz-types";

const NARR_ORDER: NarrativePosition[] = [
  "departure",
  "initiation",
  "liminal",
  "return",
];
const AFFECTS_SCORABLE: Exclude<AffectCategory, "mixed">[] = [
  "anger",
  "shame",
  "fear",
  "desire",
];
const STANCES_SCORABLE: Exclude<StanceCategory, "balanced">[] = [
  "toward",
  "against",
  "away",
];

interface Accumulator {
  stability_sum: number;
  stability_count: number;
  belonging_sum: number;
  belonging_count: number;
  stage: Record<Stage, number>;
  affect: Record<AffectCategory, number>;
  narrative: Record<NarrativePosition, number>;
  stance: Record<StanceCategory, number>;
}

function blankAccumulator(): Accumulator {
  return {
    stability_sum: 0,
    stability_count: 0,
    belonging_sum: 0,
    belonging_count: 0,
    stage: {
      "pre-initiation": 0,
      striving: 0,
      liminal: 0,
      integrating: 0,
      integrated: 0,
    },
    affect: { anger: 0, shame: 0, fear: 0, desire: 0, mixed: 0 },
    narrative: { departure: 0, initiation: 0, liminal: 0, return: 0 },
    stance: { toward: 0, against: 0, away: 0, balanced: 0 },
  };
}

// Likert 1..7 → continuous [-1..+1] via (r - 4) / 3, flipped by polarity.
function likertToSigned(response: number, polarity: 1 | -1): number {
  const normalized = (clamp(response, 1, 7) - 4) / 3;
  return normalized * polarity;
}

// Likert 1..7 → distribution over 5 stage categories via a triangular window
// centered on the stageIndex = (r - 1) * 4 / 6. Each response thus places
// probability on at most two adjacent stages.
function likertToStageDist(
  response: number,
  polarity: 1 | -1,
): Record<Stage, number> {
  const r = polarity === 1 ? clamp(response, 1, 7) : 8 - clamp(response, 1, 7);
  const stageFloat = ((r - 1) * 4) / 6; // 0..4
  const lower = Math.floor(stageFloat);
  const upper = Math.min(lower + 1, 4);
  const frac = stageFloat - lower;
  const out: Record<Stage, number> = {
    "pre-initiation": 0,
    striving: 0,
    liminal: 0,
    integrating: 0,
    integrated: 0,
  };
  out[STAGES[lower]] += 1 - frac;
  if (upper !== lower) out[STAGES[upper]] += frac;
  return out;
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

function addDelta(acc: Accumulator, delta: OptionDelta) {
  if (typeof delta.stability_risk === "number") {
    acc.stability_sum += delta.stability_risk;
    acc.stability_count += 1;
  }
  if (typeof delta.belonging_independence === "number") {
    acc.belonging_sum += delta.belonging_independence;
    acc.belonging_count += 1;
  }
  if (delta.stage) {
    for (const [k, v] of Object.entries(delta.stage)) {
      if (typeof v === "number") acc.stage[k as Stage] += v;
    }
  }
  if (delta.affect) {
    for (const [k, v] of Object.entries(delta.affect)) {
      if (typeof v === "number") {
        acc.affect[k as AffectCategory] += v;
      }
    }
  }
  if (delta.narrative) {
    for (const [k, v] of Object.entries(delta.narrative)) {
      if (typeof v === "number") acc.narrative[k as NarrativePosition] += v;
    }
  }
  if (delta.stance) {
    for (const [k, v] of Object.entries(delta.stance)) {
      if (typeof v === "number") acc.stance[k as StanceCategory] += v;
    }
  }
}

function applyLikert(
  acc: Accumulator,
  item: LikertItem,
  response: number,
) {
  if (item.dim === "stability_risk") {
    acc.stability_sum += likertToSigned(response, item.polarity);
    acc.stability_count += 1;
  } else if (item.dim === "belonging_independence") {
    acc.belonging_sum += likertToSigned(response, item.polarity);
    acc.belonging_count += 1;
  } else if (item.dim === "stage") {
    const dist = likertToStageDist(response, item.polarity);
    for (const s of STAGES) acc.stage[s] += dist[s];
  }
}

function normalize<K extends string>(dist: Record<K, number>): Record<K, number> {
  const keys = Object.keys(dist) as K[];
  const total = keys.reduce((s, k) => s + dist[k], 0);
  if (total <= 0) {
    const eq = 1 / keys.length;
    const out = {} as Record<K, number>;
    for (const k of keys) out[k] = eq;
    return out;
  }
  const out = {} as Record<K, number>;
  for (const k of keys) out[k] = dist[k] / total;
  return out;
}

// Given an ordered options list, look up the selected option's delta. We
// accept either the option id (preferred, stable across reorderings) or a
// numeric index (fallback for compact URL encodings).
function findOptionDelta(
  options: { id: string; delta: OptionDelta }[],
  value: string | number,
): OptionDelta | null {
  if (typeof value === "number") {
    return options[value]?.delta ?? null;
  }
  return options.find((o) => o.id === value)?.delta ?? null;
}

// Main entry point. Aggregates deltas across all responses, then normalizes.
export function responsesToVector(
  responses: QuizResponse[],
  items: QuizItem[],
): UserVector {
  const byId = new Map(items.map((i) => [i.id, i]));
  const acc = blankAccumulator();

  for (const r of responses) {
    const item = byId.get(r.itemId);
    if (!item) continue;
    if (item.kind === "likert") {
      if (typeof r.value !== "number") continue;
      applyLikert(acc, item, r.value);
    } else {
      // forced-choice | scenario
      const delta = findOptionDelta(item.options, r.value);
      if (delta) addDelta(acc, delta);
    }
  }

  // Fold "mixed" contribution: any explicit delta on affect="mixed" would
  // have hit the `mixed` bucket, but we'll zero it out here — mixed should
  // emerge from a flat distribution at classification time, not be scored.
  acc.affect.mixed = 0;
  // Same for stance="balanced".
  acc.stance.balanced = 0;

  const stability_risk =
    acc.stability_count > 0
      ? clamp(acc.stability_sum / acc.stability_count, -1, 1)
      : 0;
  const belonging_independence =
    acc.belonging_count > 0
      ? clamp(acc.belonging_sum / acc.belonging_count, -1, 1)
      : 0;

  // Narrative has only 4 values, keep all. Stage has 5. Affect: 4 scorable
  // + mixed-as-derived. Stance: 3 scorable + balanced-as-derived.
  const stage = normalize(acc.stage);
  const narrative = normalize(acc.narrative);

  // Normalize the 4 scorable affect keys separately, then leave mixed at 0.
  const affectNorm = normalize({
    anger: acc.affect.anger,
    shame: acc.affect.shame,
    fear: acc.affect.fear,
    desire: acc.affect.desire,
  });
  const affect: Record<AffectCategory, number> = {
    ...affectNorm,
    mixed: 0,
  };
  const stanceNorm = normalize({
    toward: acc.stance.toward,
    against: acc.stance.against,
    away: acc.stance.away,
  });
  const stance: Record<StanceCategory, number> = {
    ...stanceNorm,
    balanced: 0,
  };

  return {
    stability_risk,
    belonging_independence,
    stage,
    affect,
    narrative,
    stance,
  };
}

// Aliased for symmetry with the classifier's exports.
export { AFFECTS_SCORABLE, STANCES_SCORABLE, NARR_ORDER };

// ----------------------------------------------------------------------------
// Dev-mode guardrail — empty responses must yield a flat, valid vector.
// ----------------------------------------------------------------------------

if (process.env.NODE_ENV !== "production") {
  const empty = responsesToVector([], []);
  const sum = (d: Record<string, number>) =>
    Object.values(d).reduce((a, b) => a + b, 0);
  const stageSum = sum(empty.stage);
  const narrativeSum = sum(empty.narrative);
  // With no responses the distributions should still be valid (equal-weighted).
  if (Math.abs(stageSum - 1) > 1e-6) {
    console.warn(`[quiz-scoring] empty stage dist does not sum to 1: ${stageSum}`);
  }
  if (Math.abs(narrativeSum - 1) > 1e-6) {
    console.warn(
      `[quiz-scoring] empty narrative dist does not sum to 1: ${narrativeSum}`,
    );
  }
}
