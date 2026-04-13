"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ALL_MBTI,
  TEMPERAMENT_GROUPS,
} from "@/data/mbti/archetypes";
import { MbtiArchetype } from "@/types/mbti";
import { useTheme } from "@/components/ThemeProvider";

const SIZE = 400;
const PAD = 60;
const CELL = (SIZE - PAD * 2) / 4; // 70
const MID = SIZE / 2;

type Corner = { x: number; y: number; label: string };
const CORNERS: Corner[] = [
  { x: PAD + CELL, y: PAD + CELL, label: "Stewards" },
  { x: SIZE - PAD - CELL, y: PAD + CELL, label: "Strategists" },
  { x: PAD + CELL, y: SIZE - PAD - CELL, label: "Operators" },
  { x: SIZE - PAD - CELL, y: SIZE - PAD - CELL, label: "Inventors" },
];

function positionFor(a: MbtiArchetype): { x: number; y: number } {
  const { ei, sn, tf, jp } = a.dichotomies;
  const col = (sn === "S" ? 0 : 2) + (tf === "T" ? 0 : 1);
  const row = (jp === "J" ? 0 : 2) + (ei === "I" ? 0 : 1);
  return {
    x: PAD + CELL / 2 + col * CELL,
    y: PAD + CELL / 2 + row * CELL,
  };
}

function colorFor(
  a: MbtiArchetype,
  light: boolean
): { main: string; deep: string } {
  const group = TEMPERAMENT_GROUPS.find((g) => g.id === a.temperament)!;
  return {
    main: light ? group.secondary : group.primary,
    deep: group.secondary,
  };
}

export default function MbtiCognitiveCompass() {
  const router = useRouter();
  const { theme } = useTheme();
  const light = theme === "light";
  const [hovered, setHovered] = useState<string | null>(null);

  const axisColor = "var(--color-gold)";
  const hoveredArchetype = hovered
    ? ALL_MBTI.find((a) => a.slug === hovered)
    : null;

  return (
    <div className="relative w-full max-w-[520px] mx-auto aspect-square">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full h-full"
        style={{ overflow: "visible" }}
      >
        {/* Crosshair axes */}
        <line
          x1={PAD}
          y1={MID}
          x2={SIZE - PAD}
          y2={MID}
          stroke={axisColor}
          strokeOpacity={light ? 0.18 : 0.12}
          strokeWidth={0.5}
        />
        <line
          x1={MID}
          y1={PAD}
          x2={MID}
          y2={SIZE - PAD}
          stroke={axisColor}
          strokeOpacity={light ? 0.18 : 0.12}
          strokeWidth={0.5}
        />

        {/* Axis end labels */}
        <text
          x={PAD - 10}
          y={MID + 3}
          textAnchor="end"
          fill="var(--color-muted)"
          fontSize={8}
          letterSpacing="0.28em"
          className="uppercase"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Concrete
        </text>
        <text
          x={SIZE - PAD + 10}
          y={MID + 3}
          textAnchor="start"
          fill="var(--color-muted)"
          fontSize={8}
          letterSpacing="0.28em"
          className="uppercase"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Abstract
        </text>
        <text
          x={MID}
          y={PAD - 14}
          textAnchor="middle"
          fill="var(--color-muted)"
          fontSize={8}
          letterSpacing="0.28em"
          className="uppercase"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Structured
        </text>
        <text
          x={MID}
          y={SIZE - PAD + 22}
          textAnchor="middle"
          fill="var(--color-muted)"
          fontSize={8}
          letterSpacing="0.28em"
          className="uppercase"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Adaptive
        </text>

        {/* Quadrant corner labels */}
        {CORNERS.map((c) => (
          <text
            key={c.label}
            x={c.x}
            y={c.y}
            textAnchor="middle"
            fill="var(--color-text-secondary)"
            fontSize={11}
            opacity={0.22}
            fontStyle="italic"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {c.label}
          </text>
        ))}

        {/* Dots */}
        {ALL_MBTI.map((a) => {
          const { x, y } = positionFor(a);
          const { main } = colorFor(a, light);
          const isHovered = hovered === a.slug;
          return (
            <g
              key={a.slug}
              className="cursor-pointer"
              onMouseEnter={() => setHovered(a.slug)}
              onMouseLeave={() => setHovered((h) => (h === a.slug ? null : h))}
              onClick={() => router.push(`/mbti/archetype/${a.slug}`)}
              style={{
                transform: isHovered ? "scale(1.12)" : "scale(1)",
                transformOrigin: `${x}px ${y}px`,
                transition: "transform 300ms ease",
              }}
            >
              <circle
                cx={x}
                cy={y}
                r={16}
                fill={`${main}${isHovered ? "22" : "12"}`}
                stroke={main}
                strokeWidth={isHovered ? 1.2 : 0.7}
                strokeOpacity={isHovered ? 0.9 : 0.55}
                style={{ transition: "all 300ms ease" }}
              />
              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                fill={main}
                fontSize={8.5}
                letterSpacing="0.12em"
                fontWeight={500}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {a.code}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredArchetype &&
        (() => {
          const { x, y } = positionFor(hoveredArchetype);
          const { main } = colorFor(hoveredArchetype, light);
          const stack = hoveredArchetype.stack
            .map((s) => s.code)
            .join(" · ");
          const above = y > SIZE / 2;
          return (
            <div
              className="pointer-events-none absolute z-10 w-44 -translate-x-1/2 rounded-sm border px-3 py-2 backdrop-blur-sm"
              style={{
                left: `${(x / SIZE) * 100}%`,
                top: `${(y / SIZE) * 100}%`,
                transform: above
                  ? "translate(-50%, calc(-100% - 22px))"
                  : "translate(-50%, 22px)",
                borderColor: `${main}${light ? "55" : "40"}`,
                background: light
                  ? "rgba(255,255,255,0.92)"
                  : "rgba(10,10,14,0.88)",
              }}
            >
              <p
                className="font-mono text-[9px] tracking-[0.3em] uppercase"
                style={{ color: main }}
              >
                {hoveredArchetype.code}
              </p>
              <p className="mt-1 font-serif text-sm leading-tight text-text-primary">
                {hoveredArchetype.nickname}
              </p>
              <p className="mt-1.5 font-mono text-[10px] tracking-[0.15em] text-text-secondary">
                {stack}
              </p>
            </div>
          );
        })()}
    </div>
  );
}
