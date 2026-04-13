"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JungianArchetype, JungianClusterGroup } from "@/types/jungian";
import { useTheme } from "@/components/ThemeProvider";

interface Props {
  archetypes: JungianArchetype[];
  clusters: JungianClusterGroup[];
}

const RING_RADII = {
  ego: 230,
  soul: 165,
  self: 100,
} as const;

const VIEW = 560;
const CX = VIEW / 2;
const CY = VIEW / 2;

// stageOrder 1..4 → angles. Start at top, sweep clockwise.
function angleFor(stageOrder: 1 | 2 | 3 | 4): number {
  const step = (Math.PI * 2) / 4;
  return -Math.PI / 2 + step * (stageOrder - 1);
}

function pointOn(radius: number, angle: number): { x: number; y: number } {
  return {
    x: CX + radius * Math.cos(angle),
    y: CY + radius * Math.sin(angle),
  };
}

export default function JourneySpiral({ archetypes, clusters }: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const router = useRouter();
  const [hover, setHover] = useState<string | null>(null);

  const clusterById = Object.fromEntries(clusters.map((c) => [c.id, c]));

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="w-full h-auto max-w-[680px] mx-auto block"
        role="img"
        aria-label="The Pearson-Marr journey — three rings of archetypes from Ego to Soul to Self."
      >
        {/* Rings */}
        {(Object.keys(RING_RADII) as Array<keyof typeof RING_RADII>).map(
          (key) => {
            const r = RING_RADII[key];
            const c = clusterById[key].color;
            return (
              <circle
                key={key}
                cx={CX}
                cy={CY}
                r={r}
                fill="none"
                stroke={c}
                strokeOpacity={light ? 0.28 : 0.18}
                strokeWidth={1}
                strokeDasharray="2 6"
              />
            );
          }
        )}

        {/* Cluster labels along top of each ring */}
        {(Object.keys(RING_RADII) as Array<keyof typeof RING_RADII>).map(
          (key) => {
            const r = RING_RADII[key];
            const c = clusterById[key];
            const labelY = CY - r - 10;
            return (
              <text
                key={`label-${key}`}
                x={CX}
                y={labelY}
                textAnchor="middle"
                className="font-mono uppercase"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.4em",
                  fill: c.color,
                  opacity: light ? 0.9 : 0.75,
                }}
              >
                {c.label}
              </text>
            );
          }
        )}

        {/* Centerpoint */}
        <circle
          cx={CX}
          cy={CY}
          r={3}
          fill={light ? "#0F0E0B" : "#EDEDEC"}
          opacity={0.5}
        />

        {/* Archetype nodes */}
        {archetypes.map((a) => {
          const r = RING_RADII[a.cluster];
          const ang = angleFor(a.stageOrder);
          const { x, y } = pointOn(r, ang);
          const isHover = hover === a.slug;
          const color = a.accentColor;
          const nodeR = isHover ? 16 : 12;

          return (
            <g
              key={a.slug}
              transform={`translate(${x} ${y})`}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHover(a.slug)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(a.slug)}
              onBlur={() => setHover(null)}
              onClick={() => router.push(`/jungian/archetype/${a.slug}`)}
              tabIndex={0}
              role="link"
              aria-label={`${a.name} — ${a.motto}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/jungian/archetype/${a.slug}`);
                }
              }}
            >
              <circle
                r={nodeR + 8}
                fill={color}
                opacity={isHover ? 0.18 : 0}
                style={{ transition: "opacity 240ms" }}
              />
              <circle
                r={nodeR}
                fill={light ? "#F5F3EE" : "#06060A"}
                stroke={color}
                strokeWidth={isHover ? 2 : 1.25}
                style={{ transition: "all 240ms" }}
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)",
                  fontSize: isHover ? 18 : 14,
                  fill: color,
                  transition: "all 240ms",
                  userSelect: "none",
                }}
              >
                {a.symbol}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hover caption */}
      <div className="min-h-[96px] mt-4 text-center px-4">
        {hover ? (
          (() => {
            const a = archetypes.find((x) => x.slug === hover)!;
            const c = clusterById[a.cluster];
            return (
              <Link
                href={`/jungian/archetype/${a.slug}`}
                className="inline-block group"
              >
                <p
                  className="font-mono text-[9px] tracking-[0.4em] uppercase mb-1"
                  style={{ color: c.color }}
                >
                  {c.label} · Stage {a.stageOrder}
                </p>
                <h3
                  className="font-serif text-3xl md:text-4xl font-medium leading-tight mb-1 group-hover:underline decoration-1 underline-offset-4"
                  style={{ color: a.accentColor }}
                >
                  {a.name}
                </h3>
                <p className="font-serif italic text-base md:text-lg text-text-secondary/90">
                  &ldquo;{a.motto}&rdquo;
                </p>
              </Link>
            );
          })()
        ) : (
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-muted mt-6">
            Hover a node · Click to enter
          </p>
        )}
      </div>
    </div>
  );
}
