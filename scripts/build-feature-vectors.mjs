#!/usr/bin/env node
// Pre-extracts the per-archetype feature vectors from the gitignored research
// pipeline (research/08-structural-similarity.json) into a checked-in artifact
// (src/data/feature-vectors.json). Mirrors build-constellation-layout.mjs so
// Vercel can build without access to research/.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC_PATH = resolve(ROOT, "research/08-structural-similarity.json");
const OUT_PATH = resolve(ROOT, "src/data/feature-vectors.json");

function main() {
  const raw = JSON.parse(readFileSync(SRC_PATH, "utf8"));
  if (!raw.feature_vectors) {
    throw new Error(
      `[feature-vectors] expected key "feature_vectors" in ${SRC_PATH}`,
    );
  }
  const out = { feature_vectors: raw.feature_vectors };
  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n", "utf8");

  const systems = Object.keys(out.feature_vectors);
  const total = systems.reduce(
    (s, sys) => s + Object.keys(out.feature_vectors[sys]).length,
    0,
  );
  console.log(
    `[feature-vectors] wrote ${total} vectors across ${systems.length} systems → ${OUT_PATH}`,
  );
}

main();
