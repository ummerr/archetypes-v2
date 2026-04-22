"use client";

import { motion, useReducedMotion } from "framer-motion";
import { STAGES, type Stage } from "@/data/atlas-lens-axes";
import { DEVELOPMENTAL_ORDINAL, NARRATIVE_ORDINAL, getFeatureVector } from "@/data/feature-vectors";
import type { ClassificationResult } from "@/lib/quiz-types";
import { systemAccent } from "@/lib/resonance";
import type { SystemId } from "@/data/resonance";

interface Props {
  classification: ClassificationResult;
  size?: number;
}

const NARR_ORDER = ["departure", "initiation", "liminal", "return"] as const;

// Map the user's distribution-over-stages into [0,1] by expected ordinal.
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

// The four structural axes rendered on the radar. Stability and Belonging are
// continuous; Stage and Narrative are ordinal positions expressed as expected
// value across the user's distribution.
const AXES = [
  { label: "Belonging / Independence", short: "Independence" },
  { label: "Stability / Risk", short: "Risk" },
  { label: "Developmental stage", short: "Stage" },
  { label: "Narrative position", short: "Narrative" },
] as const;

const SYSTEM_ORDER: SystemId[] = [
  "kwml",
  "jungian",
  "enneagram",
  "mbti",
  "heros-journey",
  "tarot",
];

export default function SignatureRadar({ classification, size = 420 }: Props) {
  const reduced = useReducedMotion() ?? false;
  const W = size;
  const H = size;
  const cx = W / 2;
  const cy = H / 2;
  const R = size * 0.34;

  const user = classification.vector;
  const userValues = [
    (user.belonging_independence + 1) / 2,
    (user.stability_risk + 1) / 2,
    expectedStage(user.stage),
    expectedNarrative(user.narrative),
  ];

  const n = AXES.length;
  const axisAngles = AXES.map((_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / n);

  const userPoints = userValues.map((v, i) => {
    const r = R * v;
    return { x: cx + Math.cos(axisAngles[i]) * r, y: cy + Math.sin(axisAngles[i]) * r };
  });

  const pathD = userPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") + " Z";

  // For each system, place a small dot at the system's primary archetype's
  // feature-vector position on the same axes. This is the "fit across
  // systems" read in a glance.
  const systemDots = SYSTEM_ORDER.map((sys) => {
    const match = classification.perSystem[sys];
    if (!match) return null;
    const fv = getFeatureVector(sys, match.primary.slug);
    if (!fv) return null;
    const vals = [
      (fv.belonging_independence + 1) / 2,
      (fv.stability_risk + 1) / 2,
      DEVELOPMENTAL_ORDINAL[fv.developmental_stage],
      NARRATIVE_ORDINAL[fv.narrative_position],
    ];
    // Place each dot on the axis whose direction best matches — we render
    // all four axis projections as faint tick-marks along the axis, and the
    // brightest tick is where that axis value lands. Simpler: take the mean
    // of the four vector points as a single "constellation position" for
    // the archetype. Gives one dot per system at the archetype's centroid.
    let sx = 0;
    let sy = 0;
    for (let i = 0; i < n; i++) {
      const r = R * vals[i];
      sx += cx + Math.cos(axisAngles[i]) * r;
      sy += cy + Math.sin(axisAngles[i]) * r;
    }
    return {
      system: sys,
      x: sx / n,
      y: sy / n,
      accent: systemAccent(sys).accent,
      name: systemAccent(sys).name,
      isPrimary: classification.primarySystem === sys,
    };
  }).filter((d): d is NonNullable<typeof d> => d !== null);

  const userCentroidX = userPoints.reduce((s, p) => s + p.x, 0) / userPoints.length;
  const userCentroidY = userPoints.reduce((s, p) => s + p.y, 0) / userPoints.length;

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <figure className="text-gold/90">
      <figcaption className="mb-5">
        <p className="font-mono text-kicker tracking-display uppercase text-gold/80 mb-1">
          Signature
        </p>
        <h2 className="font-serif text-h2 leading-display">Your axis signature</h2>
        <p className="font-serif italic text-body text-text-secondary/80 leading-article mt-2 max-w-prose">
          A single shape cast across four structural axes, and a dot for each tradition&apos;s nearest figure on the same ground.
        </p>
      </figcaption>

      <div className="w-full overflow-hidden rounded-sm border border-surface-light/30" style={{ background: "radial-gradient(ellipse at center, rgba(14,14,20,0.75) 0%, rgba(6,6,10,1) 75%)" }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto max-w-[460px] mx-auto block"
          role="img"
          aria-label="Your axis signature across four structural dimensions"
        >
          <defs>
            <filter id="reading-signature-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
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
              opacity={rt === 1 ? 0.22 : 0.09}
            />
          ))}

          {axisAngles.map((a, i) => (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={cx + Math.cos(a) * R}
              y2={cy + Math.sin(a) * R}
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.14"
            />
          ))}

          {/* User polygon */}
          <motion.path
            d={pathD}
            fill="var(--color-gold)"
            fillOpacity={0.12}
            stroke="var(--color-gold)"
            strokeWidth={1.6}
            strokeOpacity={0.82}
            initial={reduced ? false : { pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 0.12 }}
            transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
            filter="url(#reading-signature-glow)"
          />

          {userPoints.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={3} fill="var(--color-gold)" />
          ))}

          {/* System centroid dots */}
          {systemDots.map((d, i) => (
            <motion.g
              key={d.system}
              initial={reduced ? false : { opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.6 + i * 0.08, ease: [0.19, 1, 0.22, 1] }}
            >
              <circle cx={d.x} cy={d.y} r={d.isPrimary ? 9 : 5} fill={d.accent} opacity={0.16} />
              <circle
                cx={d.x}
                cy={d.y}
                r={d.isPrimary ? 4.5 : 3}
                fill={d.accent}
                stroke="var(--color-bg)"
                strokeWidth={0.8}
              />
              <title>{d.name}</title>
            </motion.g>
          ))}

          {/* Center mark = the user's centroid, a soft gold dot */}
          <motion.circle
            cx={userCentroidX}
            cy={userCentroidY}
            r={2.2}
            fill="var(--color-gold-bright)"
            opacity={0.9}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3.2, delay: 1.0, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Axis labels */}
          {axisAngles.map((a, i) => {
            const labelR = R + 24;
            const lx = cx + Math.cos(a) * labelR;
            const ly = cy + Math.sin(a) * labelR;
            const ta = Math.abs(Math.cos(a)) < 0.2 ? "middle" : Math.cos(a) > 0 ? "start" : "end";
            return (
              <text
                key={i}
                x={lx}
                y={ly}
                textAnchor={ta}
                dominantBaseline="middle"
                fill="currentColor"
                style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}
                opacity="0.6"
              >
                {AXES[i].short}
              </text>
            );
          })}
        </svg>
      </div>

      <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {systemDots.map((d) => (
          <li key={d.system} className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block rounded-full"
              style={{
                width: d.isPrimary ? 10 : 7,
                height: d.isPrimary ? 10 : 7,
                background: d.accent,
                boxShadow: d.isPrimary ? `0 0 10px ${d.accent}aa` : "none",
              }}
            />
            <span
              className="font-mono text-kicker tracking-kicker uppercase"
              style={{ color: d.isPrimary ? d.accent : "var(--color-muted)" }}
            >
              {d.name}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
