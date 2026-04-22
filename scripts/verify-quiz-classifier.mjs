#!/usr/bin/env node
// Sanity-checks the quiz classifier's feature-space design against real data
// in src/data/feature-vectors.json. Does NOT exercise the TS classifier
// module directly (no TS runner here); instead, it reimplements the core
// distance function in plain JS and verifies that three hand-crafted user
// profiles produce archetypes-per-system that look right.
//
// Run: `node scripts/verify-quiz-classifier.mjs`

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const VECTORS = JSON.parse(
  readFileSync(resolve(ROOT, "src/data/feature-vectors.json"), "utf8"),
).feature_vectors;

const STAGE_ORDER = [
  "pre-initiation",
  "striving",
  "liminal",
  "integrating",
  "integrated",
];
const NARR_ORDER = ["departure", "initiation", "liminal", "return"];

function distance(user, a) {
  const dStab = ((user.stability_risk - a.stability_risk) / 2) ** 2;
  const dBel = ((user.belonging_independence - a.belonging_independence) / 2) ** 2;

  const stageIdx = STAGE_ORDER.indexOf(a.developmental_stage);
  let dStage = 0;
  for (const s of STAGE_ORDER) {
    dStage += user.stage[s] * (Math.abs(STAGE_ORDER.indexOf(s) - stageIdx) / 4);
  }

  const narrIdx = NARR_ORDER.indexOf(a.narrative_position);
  let dNarr = 0;
  for (const n of NARR_ORDER) {
    dNarr += user.narrative[n] * (Math.abs(NARR_ORDER.indexOf(n) - narrIdx) / 3);
  }

  let dAff;
  if (a.affect_center === "mixed") {
    dAff = Math.max(
      user.affect.anger,
      user.affect.shame,
      user.affect.fear,
      user.affect.desire,
    );
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
    result[system] = {
      primary: ranked[0],
      secondary: ranked[1],
    };
  }
  return result;
}

// Three hand-crafted profiles.
const SOVEREIGN_LIKE = {
  stability_risk: 0.8,
  belonging_independence: 0.5,
  stage: { "pre-initiation": 0, striving: 0, liminal: 0.1, integrating: 0.3, integrated: 0.6 },
  affect: { anger: 0.6, shame: 0.1, fear: 0.1, desire: 0.2 },
  narrative: { departure: 0, initiation: 0.1, liminal: 0.1, return: 0.8 },
  stance: { toward: 0.7, against: 0.2, away: 0.1 },
};

const EXPLORER_SEEKER = {
  stability_risk: -0.5,
  belonging_independence: -0.6,
  stage: { "pre-initiation": 0, striving: 0.7, liminal: 0.2, integrating: 0.1, integrated: 0 },
  affect: { anger: 0.1, shame: 0.15, fear: 0.55, desire: 0.2 },
  narrative: { departure: 0.7, initiation: 0.2, liminal: 0.1, return: 0 },
  stance: { toward: 0.1, against: 0.2, away: 0.7 },
};

const LIMINAL_MYSTIC = {
  stability_risk: -0.1,
  belonging_independence: -0.2,
  stage: { "pre-initiation": 0, striving: 0.1, liminal: 0.6, integrating: 0.3, integrated: 0 },
  affect: { anger: 0.1, shame: 0.3, fear: 0.2, desire: 0.4 },
  narrative: { departure: 0, initiation: 0.3, liminal: 0.6, return: 0.1 },
  stance: { toward: 0.2, against: 0.15, away: 0.65 },
};

for (const [name, v] of [
  ["SOVEREIGN-LIKE", SOVEREIGN_LIKE],
  ["EXPLORER-SEEKER", EXPLORER_SEEKER],
  ["LIMINAL-MYSTIC", LIMINAL_MYSTIC],
]) {
  console.log(`\n── ${name} ────────────────────────────`);
  const nearest = nearestPerSystem(v);
  for (const [system, match] of Object.entries(nearest)) {
    console.log(
      `  ${system.padEnd(14)} primary: ${match.primary.slug.padEnd(22)} ` +
        `d=${match.primary.distance.toFixed(3)}  secondary: ${match.secondary.slug} ` +
        `d=${match.secondary.distance.toFixed(3)}`,
    );
  }
}

console.log("\nDone.");
