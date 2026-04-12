"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ALL_ENNEAGRAM,
  ENNEAGRAM_COLORS,
  ENNEAGRAM_TRIADS,
} from "@/data/enneagram/archetypes";
import { useTheme } from "@/components/ThemeProvider";
import type { EnneagramNumber } from "@/types/enneagram";

const SIZE = 620;
const CENTER = SIZE / 2;
const RING_RADIUS = 238;
const LABEL_RADIUS = 286;

// Standard Enneagram layout: 9 at top (0°), then 1..8 clockwise at 40° increments.
const ANGLES: Record<EnneagramNumber, number> = {
  9: 0,
  1: 40,
  2: 80,
  3: 120,
  4: 160,
  5: 200,
  6: 240,
  7: 280,
  8: 320,
};

const TRIANGLE: EnneagramNumber[] = [9, 3, 6];
const HEXAD: EnneagramNumber[] = [1, 4, 2, 8, 5, 7];

function polar(radius: number, degrees: number) {
  const rad = ((degrees - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

type Mode = "integration" | "disintegration";

export default function EnneagramSymbol() {
  const { theme } = useTheme();
  const light = theme === "light";
  const [hovered, setHovered] = useState<EnneagramNumber | null>(null);
  const [mode, setMode] = useState<Mode>("integration");

  const byNumber = useMemo(() => {
    const map = new Map<EnneagramNumber, (typeof ALL_ENNEAGRAM)[number]>();
    ALL_ENNEAGRAM.forEach((a) => map.set(a.number, a));
    return map;
  }, []);

  const points = useMemo(() => {
    return (Object.keys(ANGLES) as unknown as EnneagramNumber[])
      .map((n) => Number(n) as EnneagramNumber)
      .map((n) => ({ n, ...polar(RING_RADIUS, ANGLES[n]), a: byNumber.get(n)! }));
  }, [byNumber]);

  const active = hovered ? byNumber.get(hovered) : null;
  const activeTarget = active
    ? mode === "integration"
      ? active.integrationTo
      : active.disintegrationTo
    : null;

  const subtle = light ? "#00000014" : "#FFFFFF12";
  const lineStroke = light ? "#7a6e5f" : "#a8a090";

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Mode toggle */}
      <div className="flex items-center gap-1 font-mono text-[9px] tracking-[0.25em] uppercase">
        {(["integration", "disintegration"] as Mode[]).map((m) => {
          const on = mode === m;
          const c = m === "integration" ? "#6FAA7F" : "#B86A6A";
          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="px-3 py-1.5 rounded-sm transition-all duration-300"
              style={{
                color: on ? c : "var(--color-muted)",
                background: on ? `${c}${light ? "14" : "18"}` : "transparent",
                border: `1px solid ${on ? c + (light ? "50" : "40") : subtle}`,
              }}
            >
              {m === "integration" ? "Growth →" : "Stress →"}
            </button>
          );
        })}
      </div>

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[640px] h-auto touch-manipulation"
        style={{ overflow: "visible" }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setHovered(null);
        }}
        role="img"
        aria-label="Interactive Enneagram symbol with integration and disintegration lines"
      >
        <defs>
          <radialGradient id="enn-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ENNEAGRAM_COLORS.accent} stopOpacity={light ? 0.08 : 0.14} />
            <stop offset="100%" stopColor={ENNEAGRAM_COLORS.accent} stopOpacity={0} />
          </radialGradient>
          <marker
            id="arrow-growth"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#6FAA7F" />
          </marker>
          <marker
            id="arrow-stress"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#B86A6A" />
          </marker>
        </defs>

        {/* Center glow */}
        <circle cx={CENTER} cy={CENTER} r={RING_RADIUS - 10} fill="url(#enn-center-glow)" />

        {/* Outer circle — wholeness */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_RADIUS}
          fill="none"
          stroke={light ? "#00000028" : "#FFFFFF22"}
          strokeWidth={1.1}
        />

        {/* Triangle 3-6-9 */}
        <polygon
          points={TRIANGLE.map((n) => {
            const p = polar(RING_RADIUS, ANGLES[n]);
            return `${p.x},${p.y}`;
          }).join(" ")}
          fill="none"
          stroke={lineStroke}
          strokeOpacity={hovered ? 0.2 : 0.45}
          strokeWidth={1.3}
          style={{ transition: "stroke-opacity 250ms ease" }}
        />

        {/* Hexad 1-4-2-8-5-7 */}
        <polygon
          points={HEXAD.map((n) => {
            const p = polar(RING_RADIUS, ANGLES[n]);
            return `${p.x},${p.y}`;
          }).join(" ")}
          fill="none"
          stroke={lineStroke}
          strokeOpacity={hovered ? 0.2 : 0.45}
          strokeWidth={1.3}
          style={{ transition: "stroke-opacity 250ms ease" }}
        />

        {/* Active arrow */}
        {active && activeTarget !== null && (
          <g>
            {(() => {
              const from = polar(RING_RADIUS, ANGLES[active.number]);
              const to = polar(RING_RADIUS, ANGLES[activeTarget]);
              // shorten so the arrow head doesn't overlap the node circles
              const dx = to.x - from.x;
              const dy = to.y - from.y;
              const len = Math.hypot(dx, dy);
              const ux = dx / len;
              const uy = dy / len;
              const pad = 20;
              const x1 = from.x + ux * pad;
              const y1 = from.y + uy * pad;
              const x2 = to.x - ux * pad;
              const y2 = to.y - uy * pad;
              const color = mode === "integration" ? "#6FAA7F" : "#B86A6A";
              const marker =
                mode === "integration" ? "url(#arrow-growth)" : "url(#arrow-stress)";
              return (
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={color}
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  markerEnd={marker}
                  style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
                />
              );
            })()}
          </g>
        )}

        {/* Nodes */}
        {points.map(({ n, x, y, a }) => {
          const isHovered = hovered === n;
          const isTarget = activeTarget === n;
          const dim = hovered !== null && !isHovered && !isTarget;
          const triad = ENNEAGRAM_TRIADS.find((t) => t.id === a.triad)!;
          const lp = polar(LABEL_RADIUS, ANGLES[n]);
          return (
            <g
              key={n}
              role="button"
              aria-label={`Type ${n} — ${a.name}`}
              style={{
                cursor: "pointer",
                transition: "opacity 250ms ease",
                opacity: dim ? 0.35 : 1,
              }}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(null)}
              onClick={(e) => {
                e.stopPropagation();
                setHovered(n);
              }}
            >
                {/* hit target */}
                <circle cx={x} cy={y} r={34} fill="transparent" />
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 26 : isTarget ? 23 : 20}
                  fill="var(--color-bg)"
                  stroke={a.accentColor}
                  strokeWidth={isHovered ? 2.4 : 1.5}
                  style={{
                    transition: "all 250ms ease",
                    filter: isHovered
                      ? `drop-shadow(0 0 12px ${a.accentColor}80)`
                      : isTarget
                        ? `drop-shadow(0 0 8px ${a.accentColor}60)`
                        : "none",
                  }}
                />
                <text
                  x={x}
                  y={y + 6}
                  textAnchor="middle"
                  fontSize={18}
                  className="font-serif"
                  fill={a.accentColor}
                  style={{ pointerEvents: "none" }}
                >
                  {n}
                </text>
                <text
                  x={lp.x}
                  y={lp.y}
                  textAnchor="middle"
                  fontSize={9}
                  className="font-mono hidden sm:block"
                  fill={isHovered ? a.accentColor : triad.color}
                  style={{
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    pointerEvents: "none",
                    transition: "fill 250ms ease",
                  }}
                >
                  {a.name.replace("The ", "")}
                </text>
            </g>
          );
        })}

        {/* Center caption */}
        <text
          x={CENTER}
          y={CENTER - 10}
          textAnchor="middle"
          fontSize={9}
          className="font-mono"
          fill={light ? "#7a6e5f" : "#8a8070"}
          style={{ letterSpacing: "0.3em", textTransform: "uppercase" }}
        >
          {active ? `Type ${active.number}` : "The Enneagram"}
        </text>
        <text
          x={CENTER}
          y={CENTER + 12}
          textAnchor="middle"
          fontSize={12}
          className="font-serif"
          fill={active ? active.accentColor : ENNEAGRAM_COLORS.accent}
          fontStyle="italic"
        >
          {active
            ? mode === "integration"
              ? `grows toward ${activeTarget}`
              : `under stress → ${activeTarget}`
            : "nine points · three centers · two movements"}
        </text>
        {active && (
          <text
            x={CENTER}
            y={CENTER + 32}
            textAnchor="middle"
            fontSize={9.5}
            className="font-mono"
            fill={light ? "#7a6e5f" : "#a8a090"}
            style={{ letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            {active.name}
          </text>
        )}
      </svg>

      {/* Detail card — shown when a point is selected, with explicit CTA */}
      <div className="w-full max-w-md min-h-[104px] transition-opacity duration-300">
        {active && activeTarget !== null ? (
          <div
            className="rounded-sm border p-4 flex items-center gap-4"
            style={{
              borderColor: `${active.accentColor}${light ? "30" : "24"}`,
              background: `linear-gradient(135deg, ${active.accentColor}${light ? "08" : "0A"} 0%, transparent 70%)`,
            }}
          >
            <div
              className="w-11 h-11 shrink-0 rounded-full border flex items-center justify-center font-serif text-lg"
              style={{
                borderColor: `${active.accentColor}60`,
                color: active.accentColor,
              }}
            >
              {active.number}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="font-mono text-[9px] tracking-[0.25em] uppercase mb-0.5"
                style={{ color: mode === "integration" ? "#6FAA7F" : "#B86A6A" }}
              >
                {mode === "integration"
                  ? `Growth → Type ${activeTarget}`
                  : `Stress → Type ${activeTarget}`}
              </div>
              <div
                className="font-serif text-lg leading-tight truncate"
                style={{ color: active.accentColor }}
              >
                {active.name}
              </div>
              <div className="font-mono text-[10px] italic text-text-secondary/80 truncate">
                &ldquo;{active.motto}&rdquo;
              </div>
            </div>
            <Link
              href={`/enneagram/archetype/${active.slug}`}
              className="shrink-0 font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-2 rounded-sm border transition-colors duration-300"
              style={{
                borderColor: `${active.accentColor}50`,
                color: active.accentColor,
              }}
            >
              Open →
            </Link>
          </div>
        ) : (
          <p className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase text-center pt-6">
            tap a point to see its arrows
          </p>
        )}
      </div>
    </div>
  );
}
