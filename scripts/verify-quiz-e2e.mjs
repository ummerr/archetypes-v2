#!/usr/bin/env node
// End-to-end sanity check: simulate three response profiles answering the
// full item bank, run them through scoring → classifier, and print the
// per-system primaries. This exercises real TS modules via esbuild-less
// dynamic import of the transpiled JS from a one-off build. Since we don't
// have a TS runner here, we reimplement the scoring + classifier pipeline
// in plain JS against the authored question bank — same algebra as the TS
// modules, mirrored.
//
// Run: `node scripts/verify-quiz-e2e.mjs`

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ── Load feature vectors ─────────────────────────────────────────────────────
const VECTORS = JSON.parse(
  readFileSync(resolve(ROOT, "src/data/feature-vectors.json"), "utf8"),
).feature_vectors;

// ── Parse quiz-questions.ts via a bare-bones regex eval ──────────────────────
// Easier: import() would need tsx. Instead, read the authored TS and extract
// the items by literal evaluation via a small transform.
const qqSrc = readFileSync(resolve(ROOT, "src/data/quiz-questions.ts"), "utf8");

// The simplest thing: strip imports + TS type annotations, then eval.
let js = qqSrc
  .replace(/^import .*?;\s*$/gm, "")
  .replace(/^export\s+/gm, "")
  .replace(/:\s*QuizItem\[\]/g, "")
  .replace(/if \(process\.env\.NODE_ENV[\s\S]*$/m, "")
  .replace(/ as const/g, "");
js += "\nreturn QUIZ_QUESTIONS;\n";
const QUIZ_QUESTIONS = new Function(js)();

// ── Reimplement scoring ──────────────────────────────────────────────────────

const STAGES = ["pre-initiation", "striving", "liminal", "integrating", "integrated"];
const NARR_ORDER = ["departure", "initiation", "liminal", "return"];

function clamp(n, lo, hi) {
  return Math.min(hi, Math.max(lo, n));
}

function likertToSigned(r, pol) {
  return ((clamp(r, 1, 7) - 4) / 3) * pol;
}

function likertToStageDist(r, pol) {
  const rr = pol === 1 ? clamp(r, 1, 7) : 8 - clamp(r, 1, 7);
  const stageFloat = ((rr - 1) * 4) / 6;
  const lower = Math.floor(stageFloat);
  const upper = Math.min(lower + 1, 4);
  const frac = stageFloat - lower;
  const out = {
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

function blankAcc() {
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

function addDelta(acc, d) {
  if (typeof d.stability_risk === "number") {
    acc.stability_sum += d.stability_risk;
    acc.stability_count += 1;
  }
  if (typeof d.belonging_independence === "number") {
    acc.belonging_sum += d.belonging_independence;
    acc.belonging_count += 1;
  }
  for (const k of ["stage", "affect", "narrative", "stance"]) {
    if (d[k]) for (const [kk, vv] of Object.entries(d[k])) acc[k][kk] += vv;
  }
}

function normalize(o) {
  const keys = Object.keys(o);
  const total = keys.reduce((s, k) => s + o[k], 0);
  if (total <= 0) {
    const eq = 1 / keys.length;
    const out = {};
    for (const k of keys) out[k] = eq;
    return out;
  }
  const out = {};
  for (const k of keys) out[k] = o[k] / total;
  return out;
}

function responsesToVector(responses, items) {
  const byId = new Map(items.map((i) => [i.id, i]));
  const acc = blankAcc();
  for (const r of responses) {
    const item = byId.get(r.itemId);
    if (!item) continue;
    if (item.kind === "likert") {
      if (typeof r.value !== "number") continue;
      if (item.dim === "stability_risk") {
        acc.stability_sum += likertToSigned(r.value, item.polarity);
        acc.stability_count += 1;
      } else if (item.dim === "belonging_independence") {
        acc.belonging_sum += likertToSigned(r.value, item.polarity);
        acc.belonging_count += 1;
      } else if (item.dim === "stage") {
        const d = likertToStageDist(r.value, item.polarity);
        for (const s of STAGES) acc.stage[s] += d[s];
      }
    } else {
      const opt = item.options.find((o) => o.id === r.value);
      if (opt) addDelta(acc, opt.delta);
    }
  }
  const stability_risk =
    acc.stability_count > 0
      ? clamp(acc.stability_sum / acc.stability_count, -1, 1)
      : 0;
  const belonging_independence =
    acc.belonging_count > 0
      ? clamp(acc.belonging_sum / acc.belonging_count, -1, 1)
      : 0;
  const stage = normalize(acc.stage);
  const narrative = normalize(acc.narrative);
  const affect = {
    ...normalize({
      anger: acc.affect.anger,
      shame: acc.affect.shame,
      fear: acc.affect.fear,
      desire: acc.affect.desire,
    }),
    mixed: 0,
  };
  const stance = {
    ...normalize({
      toward: acc.stance.toward,
      against: acc.stance.against,
      away: acc.stance.away,
    }),
    balanced: 0,
  };
  return { stability_risk, belonging_independence, stage, affect, narrative, stance };
}

// ── Distance & classification (same as verify-quiz-classifier.mjs) ───────────

function distance(user, a) {
  const dStab = ((user.stability_risk - a.stability_risk) / 2) ** 2;
  const dBel = ((user.belonging_independence - a.belonging_independence) / 2) ** 2;
  const stageIdx = STAGES.indexOf(a.developmental_stage);
  let dStage = 0;
  for (const s of STAGES) {
    dStage += user.stage[s] * (Math.abs(STAGES.indexOf(s) - stageIdx) / 4);
  }
  const narrIdx = NARR_ORDER.indexOf(a.narrative_position);
  let dNarr = 0;
  for (const n of NARR_ORDER) {
    dNarr += user.narrative[n] * (Math.abs(NARR_ORDER.indexOf(n) - narrIdx) / 3);
  }
  let dAff;
  if (a.affect_center === "mixed") {
    dAff = Math.max(user.affect.anger, user.affect.shame, user.affect.fear, user.affect.desire);
  } else {
    dAff = 1 - (user.affect[a.affect_center] ?? 0);
  }
  let dStance;
  if (a.relational_stance === "balanced") {
    dStance = Math.max(user.stance.toward, user.stance.against, user.stance.away);
  } else {
    dStance = 1 - (user.stance[a.relational_stance] ?? 0);
  }
  return (dStab + dBel + dStage + dNarr + dAff + dStance) / 6;
}

function nearestPerSystem(user) {
  const result = {};
  for (const [system, archetypes] of Object.entries(VECTORS)) {
    const ranked = Object.entries(archetypes)
      .map(([slug, vec]) => ({ slug, distance: distance(user, vec) }))
      .sort((a, b) => a.distance - b.distance);
    result[system] = { primary: ranked[0], secondary: ranked[1] };
  }
  return result;
}

// ── Build a response set for each profile ────────────────────────────────────
// Strategy: for each profile, we hand-script a response key — the "expected"
// Likert answer (1-7) + which option id to pick for each forced-choice/scenario.

function makeResponses(profile) {
  const resp = [];
  for (const q of QUIZ_QUESTIONS) {
    if (q.kind === "likert") {
      const r = profile.likert({ dim: q.dim, polarity: q.polarity, id: q.id });
      resp.push({ itemId: q.id, value: r });
    } else {
      const optId = profile.pick({ item: q });
      resp.push({ itemId: q.id, value: optId });
    }
  }
  return resp;
}

// Sovereign-like: integrated, stability-seeking, balanced belonging, anger
// affect, toward stance, return narrative.
const SOVEREIGN = {
  likert({ dim, polarity }) {
    if (dim === "stage") return polarity === 1 ? 6 : 2; // → integrated
    if (dim === "stability_risk") return polarity === 1 ? 6 : 2; // → stability
    if (dim === "belonging_independence") return 4; // balanced
    return 4;
  },
  pick({ item }) {
    // Prefer option that loads on anger/toward/return.
    for (const o of item.options) {
      const d = o.delta ?? {};
      if (d.affect?.anger || d.stance?.toward || d.narrative?.return) return o.id;
    }
    return item.options[0].id;
  },
};

// Explorer-seeker: striving stage, low stability (risk-loving), independent,
// fear/desire affect, away stance, departure narrative.
const EXPLORER = {
  likert({ dim, polarity }) {
    if (dim === "stage") return polarity === 1 ? 3 : 5; // → striving
    if (dim === "stability_risk") return polarity === 1 ? 2 : 6; // → risk
    if (dim === "belonging_independence") return polarity === 1 ? 6 : 2; // → independence
    return 4;
  },
  pick({ item }) {
    for (const o of item.options) {
      const d = o.delta ?? {};
      if (d.affect?.fear || d.stance?.away || d.narrative?.departure) return o.id;
    }
    return item.options[0].id;
  },
};

// Liminal-mystic: liminal stage, near-neutral stability, slightly belonging,
// desire/shame affect, away stance, liminal narrative.
const MYSTIC = {
  likert({ dim, polarity }) {
    if (dim === "stage") return 4; // → liminal
    if (dim === "stability_risk") return 4; // → neutral
    if (dim === "belonging_independence") return polarity === 1 ? 3 : 5; // → slight belonging
    return 4;
  },
  pick({ item }) {
    for (const o of item.options) {
      const d = o.delta ?? {};
      if (d.affect?.desire || d.narrative?.liminal || d.stance?.away) return o.id;
    }
    return item.options[0].id;
  },
};

// ── Run ──────────────────────────────────────────────────────────────────────

for (const [name, profile] of [
  ["SOVEREIGN-LIKE", SOVEREIGN],
  ["EXPLORER-SEEKER", EXPLORER],
  ["LIMINAL-MYSTIC", MYSTIC],
]) {
  const responses = makeResponses(profile);
  const vec = responsesToVector(responses, QUIZ_QUESTIONS);
  console.log(`\n── ${name} ────────────────────────────`);
  console.log(
    `  stability_risk=${vec.stability_risk.toFixed(2)}  belonging_independence=${vec.belonging_independence.toFixed(2)}`,
  );
  const topStage = Object.entries(vec.stage).sort((a, b) => b[1] - a[1])[0];
  const topAffect = Object.entries(vec.affect)
    .filter(([k]) => k !== "mixed")
    .sort((a, b) => b[1] - a[1])[0];
  const topStance = Object.entries(vec.stance)
    .filter(([k]) => k !== "balanced")
    .sort((a, b) => b[1] - a[1])[0];
  const topNarr = Object.entries(vec.narrative).sort((a, b) => b[1] - a[1])[0];
  console.log(
    `  stage: ${topStage[0]}(${topStage[1].toFixed(2)})  affect: ${topAffect[0]}(${topAffect[1].toFixed(2)})  stance: ${topStance[0]}(${topStance[1].toFixed(2)})  narr: ${topNarr[0]}(${topNarr[1].toFixed(2)})`,
  );
  const nearest = nearestPerSystem(vec);
  for (const [system, match] of Object.entries(nearest)) {
    console.log(
      `  ${system.padEnd(14)} primary: ${match.primary.slug.padEnd(22)} ` +
        `d=${match.primary.distance.toFixed(3)}  secondary: ${match.secondary.slug} ` +
        `d=${match.secondary.distance.toFixed(3)}`,
    );
  }
}

console.log("\nDone.");
