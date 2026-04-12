"use client";

import Link from "next/link";
import { useState } from "react";
import { EnneagramArchetype, EnneagramNumber } from "@/types/enneagram";
import { useTheme } from "@/components/ThemeProvider";

interface Props {
  archetype: EnneagramArchetype;
  wingTargets: EnneagramArchetype[]; // two entries, ordered to match archetype.wings
}

// Point on the canonical enneagram nonagon. Type 9 sits at the top;
// numbers proceed clockwise (1, 2, 3, … 8).
function pointFor(n: EnneagramNumber, r: number, cx: number, cy: number) {
  // 9 at angle -90°, each step clockwise adds 40°.
  const idx = n === 9 ? 0 : n;
  const angle = (-90 + idx * 40) * (Math.PI / 180);
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

export default function EnneagramWings({ archetype, wingTargets }: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const color = archetype.accentColor;

  const [activeIdx, setActiveIdx] = useState(0);
  const activeWing = archetype.wings[activeIdx];
  const activeTarget = wingTargets[activeIdx];
  const activeColor = activeTarget.accentColor;

  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const r = 92;

  const core = pointFor(archetype.number, r, cx, cy);
  const wingPts = archetype.wings.map((w) => pointFor(w.number, r, cx, cy));

  const allNumbers: EnneagramNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const isWing = (n: EnneagramNumber) =>
    archetype.wings.some((w) => w.number === n);

  return (
    <div className="mb-16 animate-slide-up delay-350">
      <div className="flex items-center gap-4 mb-5">
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold/80 uppercase">
          Wings
        </span>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(90deg, ${color}${light ? "30" : "18"}, transparent)`,
          }}
        />
        <span className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase">
          Adjacent Flavors
        </span>
      </div>

      <p className="text-text-secondary text-sm md:text-base leading-relaxed font-light max-w-2xl mb-6">
        Your wings are the two numbers beside yours on the circle. They don&rsquo;t
        replace your type — they season it. Most people lean noticeably toward
        one wing, giving rise to sub-types written as{" "}
        <span
          className="font-mono text-xs"
          style={{ color }}
        >{`${archetype.number}w${archetype.wings[0].number}`}</span>{" "}
        and{" "}
        <span
          className="font-mono text-xs"
          style={{ color }}
        >{`${archetype.number}w${archetype.wings[1].number}`}</span>.
      </p>

      <div
        className="rounded-sm p-6 md:p-8 grid md:grid-cols-[260px_1fr] gap-6 md:gap-10 items-center"
        style={{
          background: `linear-gradient(145deg, ${color}${light ? "0C" : "06"}, transparent)`,
          border: `1px solid ${color}${light ? "25" : "16"}`,
        }}
      >
        {/* Circle visual */}
        <div className="flex justify-center">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            width={size}
            height={size}
            className="overflow-visible"
            aria-label="Enneagram wings diagram"
          >
            {/* Base ring */}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.10)"}
              strokeWidth={1}
            />

            {/* Arcs from core to each wing, active one brighter */}
            {archetype.wings.map((w, i) => {
              const p = wingPts[i];
              const active = i === activeIdx;
              return (
                <line
                  key={`arc-${w.number}`}
                  x1={core.x}
                  y1={core.y}
                  x2={p.x}
                  y2={p.y}
                  stroke={active ? activeColor : color}
                  strokeOpacity={active ? 0.9 : 0.25}
                  strokeWidth={active ? 2 : 1}
                  strokeLinecap="round"
                />
              );
            })}

            {/* Dots for every number */}
            {allNumbers.map((n) => {
              const p = pointFor(n, r, cx, cy);
              const isCore = n === archetype.number;
              const wing = isWing(n);
              const activeHere =
                wing && archetype.wings[activeIdx].number === n;
              const dotR = isCore ? 8 : activeHere ? 6 : wing ? 5 : 2.5;
              const fill = isCore
                ? color
                : activeHere
                  ? activeColor
                  : wing
                    ? activeColor + "55"
                    : light
                      ? "rgba(0,0,0,0.25)"
                      : "rgba(255,255,255,0.25)";
              return (
                <g key={`dot-${n}`}>
                  <circle cx={p.x} cy={p.y} r={dotR} fill={fill} />
                  <text
                    x={p.x}
                    y={p.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                    fontSize={isCore ? 10 : 9}
                    fill={
                      isCore
                        ? "#FFFFFF"
                        : activeHere
                          ? "#FFFFFF"
                          : light
                            ? "rgba(0,0,0,0.55)"
                            : "rgba(255,255,255,0.55)"
                    }
                    style={{
                      pointerEvents: "none",
                      fontWeight: isCore ? 600 : 400,
                    }}
                  >
                    {n}
                  </text>
                </g>
              );
            })}

            {/* Subtype label arc ends: nothing fancy, the numbers carry it. */}
          </svg>
        </div>

        {/* Right column: toggle + flavor */}
        <div>
          <div
            className="inline-flex rounded-sm p-1 mb-5"
            style={{
              background: light ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${activeColor}22`,
            }}
          >
            {archetype.wings.map((w, i) => {
              const isActive = i === activeIdx;
              const c = wingTargets[i].accentColor;
              return (
                <button
                  key={w.number}
                  onClick={() => setActiveIdx(i)}
                  className="px-4 py-2 font-mono text-[10px] tracking-[0.25em] uppercase transition-all duration-300 rounded-sm"
                  style={{
                    color: isActive ? "#FFFFFF" : "var(--color-muted)",
                    background: isActive ? c : "transparent",
                    boxShadow: isActive ? `0 0 16px ${c}55` : "none",
                  }}
                >
                  {archetype.number}w{w.number}
                </button>
              );
            })}
          </div>

          <p
            className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1"
            style={{ color: activeColor + "CC" }}
          >
            {archetype.number}w{activeWing.number} ·{" "}
            {activeTarget.name.replace("The ", "")} wing
          </p>
          <h3
            className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-3"
            style={{ color: activeColor }}
          >
            {activeWing.nickname}
          </h3>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed font-light mb-4">
            {activeWing.flavor}
          </p>
          <Link
            href={`/enneagram/archetype/${activeTarget.slug}`}
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase text-muted hover:text-gold transition-colors"
          >
            <span className="w-4 h-px bg-current" />
            Visit Type {activeTarget.number} · {activeTarget.name}
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
