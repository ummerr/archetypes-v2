"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import layoutData from "@/data/constellation-layout.json";
import { STAGES, type Stage } from "@/data/atlas-lens-axes";
import { CLUSTER_COLORS, CLUSTER_COLOR_FALLBACK } from "@/lib/cluster-colors";
import type { ClassificationResult } from "@/lib/quiz-types";

// The forming reading. Shown on each between-chamber threshold, it reflects
// the partial classification computed from answers so far — the picture
// assembling in real time. It shares the finale's visual language (a gold
// axis polygon, a field of glowing thematic nodes) but names nothing: no
// archetype, no cluster labels, no atlas links. Just the shape of you coming
// into focus, so the reader has a reason to cross into the next chamber.
//
// level 1 → Ground answered  (the three continuous axes; field barely lit)
// level 2 → Weather answered (affect sharpens the field; first nodes ignite)
// level 3 → Story answered   (narrative axis draws in; half the sky lights)

interface Props {
  classification: ClassificationResult;
  level: 1 | 2 | 3;
}

// ── Radar geometry ──────────────────────────────────────────────────────────
// Same four axes the finale's SignatureRadar draws. Belonging, Risk and Stage
// carry data from the Ground chamber; Narrative only arrives with the Story
// chamber, so it stays a ghost spoke until level 3.

const NARR_ORDER = ["departure", "initiation", "liminal", "return"] as const;

function expectedStage(dist: Record<Stage, number>): number {
  let e = 0;
  for (const s of STAGES) e += dist[s] * STAGES.indexOf(s);
  return STAGES.length > 1 ? e / (STAGES.length - 1) : 0;
}

function expectedNarrative(
  dist: Record<(typeof NARR_ORDER)[number], number>,
): number {
  let e = 0;
  for (const n of NARR_ORDER) e += dist[n] * NARR_ORDER.indexOf(n);
  return NARR_ORDER.length > 1 ? e / (NARR_ORDER.length - 1) : 0;
}

const AXES = [
  { short: "Independence", key: "belonging" },
  { short: "Risk", key: "risk" },
  { short: "Stage", key: "stage" },
  { short: "Narrative", key: "narrative" },
] as const;

function FormingRadar({
  classification,
  level,
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.34;

  const user = classification.vector;
  const values = [
    (user.belonging_independence + 1) / 2,
    (user.stability_risk + 1) / 2,
    expectedStage(user.stage),
    expectedNarrative(user.narrative),
  ];
  // Which axes actually carry answers yet. Narrative lands only with Story.
  const active = [true, true, true, level >= 3];

  const n = AXES.length;
  const angles = AXES.map((_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / n);

  // Polygon vertex per axis: the answered value where active, pulled to a
  // small ghost radius where not yet answered so the shape reads "unfinished."
  const points = values.map((v, i) => {
    const r = R * (active[i] ? v : 0.14);
    return {
      x: cx + Math.cos(angles[i]) * r,
      y: cy + Math.sin(angles[i]) * r,
      active: active[i],
    };
  });

  const pathD =
    points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") + " Z";

  const rings = [0.5, 1];

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] block text-gold"
      role="img"
      aria-label="Your axis signature, forming"
    >
      <defs>
        <filter id="forming-radar-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {rings.map((rt) => (
        <circle
          key={rt}
          cx={cx}
          cy={cy}
          r={R * rt}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity={rt === 1 ? 0.18 : 0.08}
        />
      ))}

      {angles.map((a, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={cx + Math.cos(a) * R}
          y2={cy + Math.sin(a) * R}
          stroke="currentColor"
          strokeWidth="0.5"
          opacity={active[i] ? 0.16 : 0.07}
        />
      ))}

      <motion.path
        key={`poly-${level}`}
        d={pathD}
        fill="var(--color-gold)"
        fillOpacity={0.1}
        stroke="var(--color-gold)"
        strokeWidth={1.5}
        strokeOpacity={0.8}
        initial={reduced ? false : { pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 0.1 }}
        transition={{ duration: 1.3, delay: 0.2, ease: "easeOut" }}
        filter="url(#forming-radar-glow)"
      />

      {points.map((p, i) =>
        p.active ? (
          <circle key={i} cx={p.x} cy={p.y} r={2.6} fill="var(--color-gold)" />
        ) : (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={2.2}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.8}
            opacity={0.4}
          />
        ),
      )}

      {angles.map((a, i) => {
        const labelR = R + 18;
        const lx = cx + Math.cos(a) * labelR;
        const ly = cy + Math.sin(a) * labelR;
        const ta =
          Math.abs(Math.cos(a)) < 0.2 ? "middle" : Math.cos(a) > 0 ? "start" : "end";
        return (
          <text
            key={i}
            x={lx}
            y={ly}
            textAnchor={ta}
            dominantBaseline="middle"
            fill="currentColor"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 7.5,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
            opacity={active[i] ? 0.55 : 0.28}
          >
            {AXES[i].short}
          </text>
        );
      })}
    </svg>
  );
}

// ── Mini constellation ──────────────────────────────────────────────────────
// Cluster centroids from the frozen atlas layout — the same ground the finale
// constellation stands on. Nodes ignite by resonance, but only as many as the
// chamber has earned: the field stays mostly dark early, and half the sky
// lights by the time Story is answered. No labels, no links: the named sky is
// the finale's reveal, not this.

const LAYOUT_W = layoutData.width;
const LAYOUT_H = layoutData.height;

const CLUSTER_POSITIONS: Record<string, { x: number; y: number }> = (() => {
  const acc: Record<string, { sx: number; sy: number; n: number }> = {};
  for (const node of layoutData.nodes) {
    for (const cid of node.clusterIds ?? []) {
      const e = acc[cid] ?? { sx: 0, sy: 0, n: 0 };
      e.sx += node.x;
      e.sy += node.y;
      e.n += 1;
      acc[cid] = e;
    }
  }
  const out: Record<string, { x: number; y: number }> = {};
  for (const [cid, { sx, sy, n }] of Object.entries(acc)) {
    out[cid] = { x: sx / n, y: sy / n };
  }
  return out;
})();

function colorFor(id: string): string {
  return CLUSTER_COLORS[id] ?? CLUSTER_COLOR_FALLBACK;
}

// How many of the strongest clusters are allowed to glow at each level.
const GLOW_BUDGET: Record<1 | 2 | 3, number> = { 1: 0, 2: 3, 3: 8 };

function FormingConstellation({ classification, level }: Props) {
  const reduced = useReducedMotion() ?? false;

  const nodes = useMemo(() => {
    return classification.clusters
      .map((c, rank) => {
        const pos = CLUSTER_POSITIONS[c.cluster.id];
        if (!pos) return null;
        return { id: c.cluster.id, rank, strength: c.strength, x: pos.x, y: pos.y };
      })
      .filter((v): v is NonNullable<typeof v> => v !== null);
  }, [classification.clusters]);

  const glowBudget = GLOW_BUDGET[level];

  // The "you" pin — weighted centroid of the strongest three, exactly as the
  // finale computes it, so the pin the reader watches settle here is the same
  // pin that anchors the full constellation later.
  const pin = useMemo(() => {
    const top = classification.clusters
      .slice(0, 3)
      .map((c) => {
        const pos = CLUSTER_POSITIONS[c.cluster.id];
        return pos ? { pos, strength: c.strength } : null;
      })
      .filter((v): v is { pos: { x: number; y: number }; strength: number } => v !== null);
    if (!top.length) return null;
    let sx = 0;
    let sy = 0;
    let w = 0;
    for (const { pos, strength } of top) {
      const weight = Math.max(strength, 0.001);
      sx += pos.x * weight;
      sy += pos.y * weight;
      w += weight;
    }
    return { x: sx / w, y: sy / w };
  }, [classification.clusters]);

  return (
    <svg
      viewBox={`0 0 ${LAYOUT_W} ${LAYOUT_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="w-full max-w-[300px] h-auto block"
      role="img"
      aria-label="The field of thematic rooms, beginning to light by resonance"
    >
      <defs>
        <filter id="forming-constellation-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {nodes.map((node) => {
        const lit = node.rank < glowBudget;
        const color = colorFor(node.id);
        const r = lit ? 12 : 6;
        return (
          <motion.g
            key={node.id}
            initial={reduced ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: reduced ? 0 : 0.15 + node.rank * 0.05,
              ease: [0.19, 1, 0.22, 1],
            }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {lit && (
              <circle
                cx={node.x}
                cy={node.y}
                r={r * 2.4}
                fill={color}
                opacity={0.2}
                filter="url(#forming-constellation-glow)"
              />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r={r}
              fill={color}
              opacity={lit ? 0.92 : 0.16}
              stroke="var(--color-bg)"
              strokeWidth={0.6}
            />
          </motion.g>
        );
      })}

      {pin && (
        <motion.g
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: reduced ? 0 : 0.9, ease: "easeOut" }}
        >
          <motion.circle
            cx={pin.x}
            cy={pin.y}
            r={26}
            fill="var(--color-gold)"
            opacity={0.16}
            filter="url(#forming-constellation-glow)"
            animate={reduced ? undefined : { opacity: [0.1, 0.22, 0.1], r: [22, 30, 22] }}
            transition={reduced ? undefined : { duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle
            cx={pin.x}
            cy={pin.y}
            r={6}
            fill="var(--color-gold-bright)"
            stroke="var(--color-bg)"
            strokeWidth={1.2}
          />
        </motion.g>
      )}
    </svg>
  );
}

// ── Worded reflection ───────────────────────────────────────────────────────
// A hedged, second-person line drawn from the partial axis summary. Tentative
// on purpose — it is a reading in progress, and the voice never claims more
// than the answers so far can hold.

function stageLine(stage: Stage): string {
  switch (stage) {
    case "pre-initiation":
      return "The call hasn't fully sounded yet.";
    case "striving":
      return "You are mid-climb, still proving the thing.";
    case "liminal":
      return "You are between two rooms, neither quite closed.";
    case "integrating":
      return "The pieces are starting to sit together.";
    case "integrated":
      return "Something in you has settled into itself.";
  }
}

function groundClause(stability: number): string {
  if (stability > 0.15) return "from steady ground";
  if (stability < -0.15) return "from ground that keeps moving";
  return "from ground half-plan, half-chance";
}

function belongingClause(belonging: number): string {
  if (belonging < -0.15) return "leaning toward the people you trust";
  if (belonging > 0.15) return "keeping your own counsel";
  return "held between the we and the I";
}

function affectLine(affect: string): string {
  switch (affect) {
    case "anger":
      return "Anger runs warm underneath.";
    case "shame":
      return "A quiet shame threads through it.";
    case "fear":
      return "Fear keeps a hand on your shoulder.";
    case "desire":
      return "Desire is the current beneath.";
    default:
      return "The weather won't resolve to one feeling — it moves.";
  }
}

function narrativeLine(narrative: string): string {
  switch (narrative) {
    case "departure":
      return "The story reads as a leaving — a threshold at your back.";
    case "initiation":
      return "You are in the trial, the middle of the crossing.";
    case "liminal":
      return "You are in the in-between, the story still open.";
    case "return":
      return "The story bends homeward — a return, changed.";
    default:
      return "The story hasn't declared its shape yet.";
  }
}

export function formingLine(
  classification: ClassificationResult,
  level: 1 | 2 | 3,
): string {
  const a = classification.axisSummary;
  if (level === 1) {
    return `So far, you answer ${groundClause(a.stability_risk)}, ${belongingClause(
      a.belonging_independence,
    )}. ${stageLine(a.stage.dominant)}`;
  }
  if (level === 2) {
    return `The feeling underneath is coming into view. ${affectLine(a.affect.dominant)}`;
  }
  return `And the room you stand in — ${narrativeLine(a.narrative.dominant).charAt(0).toLowerCase()}${narrativeLine(a.narrative.dominant).slice(1)}`;
}

// The caption above the visuals — names the movement without naming the result.
const LEVEL_CAPTION: Record<1 | 2 | 3, string> = {
  1: "The ground reads. Your position on the field appears.",
  2: "The weather sharpens. The first rooms light.",
  3: "Half the sky is lit. One chamber remains.",
};

export default function FormingReading({ classification, level }: Props) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      className="w-full flex flex-col items-center"
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
    >
      <p className="font-mono text-kicker tracking-kicker uppercase text-gold/70 mb-6">
        {LEVEL_CAPTION[level]}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
        <FormingRadar classification={classification} level={level} />
        <div
          className="w-full max-w-[300px] rounded-sm border border-surface-light/25 p-3"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(14,14,20,0.7) 0%, rgba(6,6,10,1) 80%)",
          }}
        >
          <FormingConstellation classification={classification} level={level} />
        </div>
      </div>
    </motion.div>
  );
}
