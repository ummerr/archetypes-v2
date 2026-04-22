"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import layoutData from "@/data/constellation-layout.json";
import type { ClusterMatch } from "@/lib/quiz-types";
import { CLUSTER_AXES } from "@/data/atlas-lens-axes";

interface Props {
  clusters: ClusterMatch[];
  primaryClusterId?: string;
}

// Per-cluster hues — kept in lockstep with ClusterResonance and the Mirror
// scaffold. Duplicated here rather than imported to keep the Reading's
// centerpiece self-contained.
const CLUSTER_COLOR: Record<string, string> = {
  sovereign: "#E0C065",
  warrior: "#D6614A",
  "sage-magician": "#9B87C4",
  lover: "#E08597",
  innocent: "#EADBA8",
  explorer: "#5DB8A0",
  rebel: "#B64558",
  creator: "#E89B4F",
  jester: "#F0C555",
  caregiver: "#8AB876",
  everyman: "#C3A07D",
  "death-rebirth": "#7E5BA0",
  teacher: "#7FA2CC",
  "liminal-territory": "#ADA0C6",
  antagonists: "#8a4a5a",
  shapeshifter: "#9a7ac9",
  "threshold-guardian": "#7a5a4a",
  herald: "#c9b884",
  integration: "#e6d47a",
  "boy-hero": "#e6944a",
};

function colorFor(id: string): string {
  return CLUSTER_COLOR[id] ?? CLUSTER_AXES[id]?.motifColor ?? "#c6a355";
}

function shortTheme(theme: string): string {
  return theme.split(/—|\s+-\s+/)[0].trim();
}

// Derive a fixed centroid per cluster from the frozen archetype layout.
// Computed once at module load; the same positions that anchor the atlas'
// grounded-resonance-map ground the Reading's constellation too.
const LAYOUT_W = layoutData.width;
const LAYOUT_H = layoutData.height;
const LAYOUT_CX = LAYOUT_W / 2;
const LAYOUT_CY = LAYOUT_H / 2;

const CLUSTER_POSITIONS: Record<string, { x: number; y: number }> = (() => {
  const acc: Record<string, { sx: number; sy: number; n: number }> = {};
  for (const node of layoutData.nodes) {
    for (const cid of node.clusterIds ?? []) {
      const entry = acc[cid] ?? { sx: 0, sy: 0, n: 0 };
      entry.sx += node.x;
      entry.sy += node.y;
      entry.n += 1;
      acc[cid] = entry;
    }
  }
  const out: Record<string, { x: number; y: number }> = {};
  for (const [cid, { sx, sy, n }] of Object.entries(acc)) {
    out[cid] = { x: sx / n, y: sy / n };
  }
  return out;
})();

// Strength bands map ClusterMatch.strength → visual weight. The brightness
// gradient reads as weather, not ranking — bright clusters sit close to
// the user's vector, dim ones sit further out in the same field.
interface Band {
  opacity: number;
  r: number;
  glow: boolean;
  ring: boolean;
}

function strengthBand(s: number): Band {
  if (s < 0.35) return { opacity: 0.2, r: 5, glow: false, ring: false };
  if (s < 0.6) return { opacity: 0.5, r: 8, glow: false, ring: false };
  if (s < 0.8) return { opacity: 0.82, r: 11, glow: true, ring: false };
  return { opacity: 1, r: 14, glow: true, ring: true };
}

export default function ReadingConstellation({
  clusters,
  primaryClusterId,
}: Props) {
  const reduced = useReducedMotion() ?? false;

  // Top-3 weighted centroid as the user's "you" pin. Only computed from
  // clusters that actually have layout positions, so a missing entry in
  // the frozen layout doesn't warp the pin.
  const pin = useMemo(() => {
    const top = clusters
      .slice(0, 3)
      .map((c) => {
        const pos = CLUSTER_POSITIONS[c.cluster.id];
        return pos ? { pos, strength: c.strength } : null;
      })
      .filter((x): x is { pos: { x: number; y: number }; strength: number } => x !== null);
    if (top.length === 0) return null;
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
  }, [clusters]);

  const maxStrength = Math.max(...clusters.map((c) => c.strength), 0.001);

  // One entry per cluster that has a layout position. Each carries its
  // rank so staggered animation reveals strongest → weakest.
  const nodes = useMemo(
    () =>
      clusters
        .map((c, rank) => {
          const pos = CLUSTER_POSITIONS[c.cluster.id];
          if (!pos) return null;
          return {
            id: c.cluster.id,
            theme: shortTheme(c.cluster.theme),
            description: c.cluster.description,
            strength: c.strength,
            rank,
            x: pos.x,
            y: pos.y,
            color: colorFor(c.cluster.id),
          };
        })
        .filter((n): n is NonNullable<typeof n> => n !== null),
    [clusters],
  );

  return (
    <figure className="mb-20 text-gold/90">
      <figcaption className="mb-8">
        <p className="font-mono text-kicker tracking-display uppercase text-gold/80 mb-1">
          Cluster constellation
        </p>
        <h2 className="font-serif text-h2 leading-display">
          The weather you are standing in
        </h2>
        <p className="font-serif italic text-body text-text-secondary/80 leading-article mt-2 max-w-prose">
          Twenty thematic rooms charted in the atlas, glowing by resonance.
          The soft gold pin is where your strongest three draw you — not a
          verdict, a centroid.
        </p>
      </figcaption>

      <div
        className="w-full overflow-hidden rounded-sm border border-surface-light/30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(14,14,20,0.78) 0%, rgba(6,6,10,1) 78%)",
        }}
      >
        <svg
          viewBox={`0 0 ${LAYOUT_W} ${LAYOUT_H}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto block max-h-[420px] sm:max-h-[480px] md:max-h-[560px] mx-auto"
          role="img"
          aria-label="Thematic cluster constellation — each glowing node is one of twenty atlas rooms, bright nodes being those that resonate most with your reading."
        >
          <defs>
            <filter
              id="reading-constellation-glow"
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
            >
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {nodes.map((n) => {
            const band = strengthBand(n.strength);
            const isPrimary = n.id === primaryClusterId;
            // Labels fade out below the top ~6 clusters so the field
            // stays calm. Top label sits at full opacity; weaker ones
            // dissolve into the node glow.
            const labelVisible = n.rank < 8;
            const labelOpacity = Math.min(
              1,
              Math.pow(n.strength / maxStrength, 1.4),
            );
            // Radial offset so labels lean outward from the chart's
            // center — reduces overlap between near-adjacent cluster
            // centroids (e.g. sovereign / integration).
            const dx = n.x - LAYOUT_CX;
            const dy = n.y - LAYOUT_CY;
            const mag = Math.hypot(dx, dy) || 1;
            const offset = band.r + 26;
            const labelX = n.x + (dx / mag) * offset;
            const labelY = n.y + (dy / mag) * offset + (dy >= 0 ? 6 : -2);

            return (
              <motion.g
                key={n.id}
                initial={reduced ? false : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.9,
                  delay: reduced ? 0 : 0.2 + n.rank * 0.045,
                  ease: [0.19, 1, 0.22, 1],
                }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              >
                <Link
                  href={`/atlas?cluster=${n.id}`}
                  aria-label={`${n.theme} — resonance ${Math.round(n.strength * 100)} percent. Open in atlas.`}
                  className="focus:outline-none"
                >
                  {/* Oversized hit area for touch */}
                  <circle cx={n.x} cy={n.y} r={30} fill="transparent" />

                  {band.glow && (
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={band.r * 2.3}
                      fill={n.color}
                      opacity={band.opacity * 0.22}
                      filter="url(#reading-constellation-glow)"
                    />
                  )}

                  {band.ring && (
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={band.r + 7}
                      fill="none"
                      stroke={n.color}
                      strokeOpacity={0.55}
                      strokeWidth={1.1}
                    />
                  )}

                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={band.r}
                    fill={n.color}
                    opacity={band.opacity}
                    stroke={
                      isPrimary ? "var(--color-gold-bright)" : "var(--color-bg)"
                    }
                    strokeWidth={isPrimary ? 1.3 : 0.6}
                  />

                  <title>
                    {n.theme} · {Math.round(n.strength * 100)}%
                  </title>

                  {labelVisible && (
                    <text
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={n.color}
                      opacity={labelOpacity}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 26,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        pointerEvents: "none",
                      }}
                    >
                      {n.theme}
                    </text>
                  )}
                </Link>
              </motion.g>
            );
          })}

          {pin && (
            <motion.g
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: reduced ? 0 : 1.5,
                ease: "easeOut",
              }}
            >
              <motion.circle
                cx={pin.x}
                cy={pin.y}
                r={24}
                fill="var(--color-gold)"
                opacity={0.18}
                filter="url(#reading-constellation-glow)"
                animate={
                  reduced
                    ? undefined
                    : { opacity: [0.1, 0.24, 0.1], r: [22, 28, 22] }
                }
                transition={
                  reduced
                    ? undefined
                    : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
                }
              />
              <circle
                cx={pin.x}
                cy={pin.y}
                r={5}
                fill="var(--color-gold-bright)"
                stroke="var(--color-bg)"
                strokeWidth={1}
              />
              <title>
                Your centroid — drawn from your strongest three resonances.
              </title>
            </motion.g>
          )}
        </svg>
      </div>
    </figure>
  );
}
