#!/usr/bin/env node
// Pre-computes the Resonance Constellation force-directed layout at build time.
// Output: src/data/constellation-layout.json — stable (x, y) coordinates for every
// archetype node and every intra-cluster edge, so the client renders without jiggle.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
} from "d3-force";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const MAP_PATH = resolve(ROOT, "src/data/grounded-resonance-map.json");
const OUT_PATH = resolve(ROOT, "src/data/constellation-layout.json");

const WIDTH = 1200;
const HEIGHT = 900;

// Axis anchors: every cluster gets an approximate (x, y) in the canvas based on
// its dominant developmental stage (x) and affect-center / ordering (y).
// Derived from Mission 8/11 editorial notes. Ordering matters less than the
// separation — force simulation does the rest.
const CLUSTER_ANCHORS = {
  // left band: pre-initiation / ego-level
  "innocent":         { x: -0.85, y:  0.70 },
  "explorer":         { x: -0.65, y:  0.20 },
  "rebel":            { x: -0.40, y: -0.50 },
  "orphan":           { x: -0.75, y: -0.80 },
  "seeker":           { x: -0.55, y:  0.55 },
  "hero-call":        { x: -0.50, y: -0.10 },

  // center band: initiation / threshold / liminal
  "threshold-guardian":{ x:  0.00, y: -0.75 },
  "liminal-passage":   { x:  0.00, y: -0.15 },
  "shapeshifter":      { x: -0.10, y:  0.30 },
  "trickster":         { x:  0.15, y:  0.65 },
  "mentor":            { x:  0.05, y: -0.55 },
  "shadow":            { x: -0.15, y: -0.90 },
  "herald":            { x: -0.25, y:  0.85 },
  "ally":              { x:  0.20, y:  0.85 },
  "caregiver":         { x:  0.10, y:  0.50 },

  // right band: integration / self-level
  "sovereign":         { x:  0.80, y: -0.65 },
  "warrior":           { x:  0.65, y: -0.20 },
  "sage-magician":     { x:  0.85, y:  0.05 },
  "lover":             { x:  0.75, y:  0.55 },
  "creator":           { x:  0.55, y:  0.85 },
  "return":            { x:  0.90, y: -0.90 },
};

const DEFAULT_ANCHOR = { x: 0, y: 0 };

const CONFIDENCE_WEIGHT = {
  canonical:  1.0,
  strong:     0.75,
  moderate:   0.5,
  speculative:0.3,
  contested:  0.25,
};

function main() {
  const raw = JSON.parse(readFileSync(MAP_PATH, "utf8"));
  const clusters = raw.clusters;

  // Derive unique nodes (keyed by system + slug).
  const nodeMap = new Map();
  const edges = [];

  for (const cluster of clusters) {
    const anchor = CLUSTER_ANCHORS[cluster.id] ?? DEFAULT_ANCHOR;
    const ids = [];
    for (const entry of cluster.archetypes) {
      const id = `${entry.system}/${entry.slug}`;
      ids.push(id);
      let node = nodeMap.get(id);
      if (!node) {
        node = {
          id,
          system: entry.system,
          slug: entry.slug,
          clusterIds: [],
          degree: 0,
          _ax: 0,
          _ay: 0,
          _anchorCount: 0,
        };
        nodeMap.set(id, node);
      }
      node.clusterIds.push(cluster.id);
      node._ax += anchor.x;
      node._ay += anchor.y;
      node._anchorCount += 1;
    }
    // Intra-cluster edges: all pairs within a cluster.
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = cluster.archetypes[i];
        const b = cluster.archetypes[j];
        // Edge confidence = min of the two endpoints.
        const ca = CONFIDENCE_WEIGHT[a.confidence] ?? 0.5;
        const cb = CONFIDENCE_WEIGHT[b.confidence] ?? 0.5;
        const w = Math.min(ca, cb);
        const tier =
          CONFIDENCE_WEIGHT[a.confidence] <= CONFIDENCE_WEIGHT[b.confidence]
            ? a.confidence
            : b.confidence;
        edges.push({
          source: ids[i],
          target: ids[j],
          clusterId: cluster.id,
          confidence: tier,
          weight: w,
        });
      }
    }
  }

  const nodes = Array.from(nodeMap.values()).map((n) => {
    n.degree = edges.filter((e) => e.source === n.id || e.target === n.id).length;
    // Average anchor across all cluster memberships, mapped to canvas coords.
    const ax = n._ax / Math.max(1, n._anchorCount);
    const ay = n._ay / Math.max(1, n._anchorCount);
    n.anchorX = (WIDTH / 2) + ax * (WIDTH * 0.42);
    n.anchorY = (HEIGHT / 2) + ay * (HEIGHT * 0.42);
    // Seed starting positions near the anchor so layout converges quickly.
    n.x = n.anchorX + (Math.random() - 0.5) * 40;
    n.y = n.anchorY + (Math.random() - 0.5) * 40;
    delete n._ax;
    delete n._ay;
    delete n._anchorCount;
    return n;
  });

  const linkObjs = edges.map((e) => ({
    source: e.source,
    target: e.target,
    weight: e.weight,
  }));

  const sim = forceSimulation(nodes)
    .force(
      "link",
      forceLink(linkObjs)
        .id((d) => d.id)
        .distance((d) => 90 - d.weight * 35)
        .strength((d) => 0.25 + d.weight * 0.35),
    )
    .force("charge", forceManyBody().strength(-180))
    .force("center", forceCenter(WIDTH / 2, HEIGHT / 2).strength(0.02))
    .force("collide", forceCollide().radius(16).strength(0.9))
    .force("x", forceX((d) => d.anchorX).strength(0.18))
    .force("y", forceY((d) => d.anchorY).strength(0.18))
    .stop();

  for (let i = 0; i < 400; i++) sim.tick();

  const layout = {
    width: WIDTH,
    height: HEIGHT,
    generatedAt: new Date().toISOString(),
    nodes: nodes.map((n) => ({
      id: n.id,
      system: n.system,
      slug: n.slug,
      clusterIds: n.clusterIds,
      degree: n.degree,
      x: Math.round(n.x * 10) / 10,
      y: Math.round(n.y * 10) / 10,
    })),
    edges,
  };

  writeFileSync(OUT_PATH, JSON.stringify(layout, null, 2) + "\n", "utf8");
  console.log(
    `[constellation] wrote ${layout.nodes.length} nodes, ${layout.edges.length} edges → ${OUT_PATH}`,
  );
}

main();
