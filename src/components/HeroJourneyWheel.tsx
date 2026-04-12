"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  HEROSJOURNEY_COLORS,
  JOURNEY_ACTS,
  JOURNEY_STAGES,
} from "@/data/herosjourney/stages";
import {
  ALL_HEROSJOURNEY,
  getArchetypesByStage,
} from "@/data/herosjourney/archetypes";
import { useTheme } from "@/components/ThemeProvider";
import type { JourneyStage } from "@/types/herosjourney";

const SIZE = 620;
const CENTER = SIZE / 2;
const PAD = 44;
const STAGE_RADIUS = 228;
const ARCHETYPE_RADIUS = 282;
const LABEL_RADIUS = 182;
const MASK_LABEL_RADIUS = 316;

function polar(radius: number, degrees: number) {
  const rad = ((degrees - 90) * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
}

function arcPath(
  radius: number,
  startDeg: number,
  endDeg: number
): string {
  const start = polar(radius, startDeg);
  const end = polar(radius, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y}`;
}

const ACT_BOUNDS: Record<string, [number, number]> = {
  departure: [-15, 135],
  initiation: [135, 245],
  return: [245, 345],
};

export default function HeroJourneyWheel() {
  const { theme } = useTheme();
  const router = useRouter();
  const light = theme === "light";
  // Unified selection state — driven by hover on desktop, tap on touch.
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [activeMask, setActiveMask] = useState<string | null>(null);

  const selectStage = (n: number | null) => {
    setActiveStage(n);
    setActiveMask(null);
  };
  const selectMask = (slug: string | null) => {
    setActiveMask(slug);
    setActiveStage(null);
  };
  const clearSelection = () => {
    setActiveStage(null);
    setActiveMask(null);
  };

  // Position each archetype at the midpoint of its primary stages (circular mean).
  const placements = useMemo(() => {
    return ALL_HEROSJOURNEY.map((a) => {
      const stages = a.primaryStages
        .map((n) => JOURNEY_STAGES.find((s) => s.number === n))
        .filter((s): s is JourneyStage => !!s);
      const xs = stages.reduce(
        (acc, s) => acc + Math.cos((s.clockPosition * Math.PI) / 180),
        0
      );
      const ys = stages.reduce(
        (acc, s) => acc + Math.sin((s.clockPosition * Math.PI) / 180),
        0
      );
      const angle = (Math.atan2(ys, xs) * 180) / Math.PI;
      return { archetype: a, angle };
    });
  }, []);

  const activeStages = activeMask
    ? ALL_HEROSJOURNEY.find((a) => a.slug === activeMask)?.primaryStages ?? []
    : [];

  const activeRoles = activeStage
    ? getArchetypesByStage(activeStage).map((a) => a.slug)
    : [];

  return (
    <div className="w-full flex justify-center">
      <svg
        viewBox={`${-PAD} ${-PAD} ${SIZE + PAD * 2} ${SIZE + PAD * 2}`}
        className="w-full max-w-[720px] h-auto"
        role="img"
        aria-label="Hero's Journey twelve-stage wheel"
        onClick={clearSelection}
      >
        {/* Transparent background — taps here clear any selection. */}
        <rect x={-PAD} y={-PAD} width={SIZE + PAD * 2} height={SIZE + PAD * 2} fill="transparent" />
        <defs>
          {JOURNEY_ACTS.map((act) => {
            const [start, end] = ACT_BOUNDS[act.id];
            const from = polar(STAGE_RADIUS, start);
            const to = polar(STAGE_RADIUS, end);
            return (
              <linearGradient
                key={act.id}
                id={`arc-${act.id}`}
                gradientUnits="userSpaceOnUse"
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
              >
                <stop offset="0%" stopColor={act.color} stopOpacity={0.15} />
                <stop offset="50%" stopColor={act.color} stopOpacity={0.9} />
                <stop offset="100%" stopColor={act.color} stopOpacity={0.15} />
              </linearGradient>
            );
          })}
          <radialGradient id="nadir-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={HEROSJOURNEY_COLORS.accent} stopOpacity={0.18} />
            <stop offset="100%" stopColor={HEROSJOURNEY_COLORS.accent} stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* Horizon line — threshold between conscious (top) and unconscious (bottom) */}
        <line
          x1={CENTER - STAGE_RADIUS - 30}
          x2={CENTER + STAGE_RADIUS + 30}
          y1={CENTER}
          y2={CENTER}
          stroke={light ? "#00000018" : "#FFFFFF12"}
          strokeDasharray="2 6"
        />

        {/* Act arcs */}
        {JOURNEY_ACTS.map((act) => {
          const [s, e] = ACT_BOUNDS[act.id];
          return (
            <path
              key={act.id}
              d={arcPath(STAGE_RADIUS, s, e)}
              fill="none"
              stroke={`url(#arc-${act.id})`}
              strokeWidth={3}
              strokeLinecap="round"
            />
          );
        })}

        {/* Nadir glow behind the Ordeal */}
        <circle
          cx={polar(STAGE_RADIUS, 200).x}
          cy={polar(STAGE_RADIUS, 200).y}
          r={72}
          fill="url(#nadir-glow)"
        />

        {/* Stage nodes */}
        {JOURNEY_STAGES.map((stage) => {
          const p = polar(STAGE_RADIUS, stage.clockPosition);
          const act = JOURNEY_ACTS.find((a) => a.id === stage.act)!;
          const isActive =
            activeStage === stage.number || activeStages.includes(stage.number);
          const label = polar(LABEL_RADIUS, stage.clockPosition);
          // Rotate label tangent to the ring so adjacent labels don't collide.
          // Flip on the lower half so text stays upright/readable.
          const cp = ((stage.clockPosition % 360) + 360) % 360;
          const flip = cp > 90 && cp < 270;
          const baseRot = cp - 90; // tangent to circle
          const labelRot = flip ? baseRot + 180 : baseRot;
          return (
            <g
              key={stage.number}
              style={{ cursor: "pointer" }}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") selectStage(stage.number);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") clearSelection();
              }}
              onClick={(e) => {
                e.stopPropagation();
                selectStage(activeStage === stage.number ? null : stage.number);
              }}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={isActive ? 13 : 9}
                fill={light ? "var(--color-bg)" : "var(--color-bg)"}
                stroke={act.color}
                strokeWidth={isActive ? 2.2 : 1.4}
                style={{ transition: "all 200ms ease" }}
              />
              <text
                x={p.x}
                y={p.y + 3.5}
                textAnchor="middle"
                className="font-mono"
                fontSize={9}
                fill={act.color}
                style={{ pointerEvents: "none" }}
              >
                {stage.number}
              </text>
              <text
                x={label.x}
                y={label.y}
                textAnchor="middle"
                fontSize={9.5}
                className="font-mono"
                fill={
                  isActive
                    ? act.color
                    : light
                      ? "#5a5040"
                      : "#a8a090"
                }
                transform={`rotate(${labelRot} ${label.x} ${label.y})`}
                style={{
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  pointerEvents: "none",
                  transition: "fill 200ms ease",
                }}
              >
                {stage.name}
              </text>
            </g>
          );
        })}

        {/* Archetype masks at outer ring */}
        {placements.map(({ archetype, angle }) => {
          const p = polar(ARCHETYPE_RADIUS, angle);
          const namePos = polar(MASK_LABEL_RADIUS, angle);
          const dim =
            (activeStage !== null && !activeRoles.includes(archetype.slug)) ||
            (activeMask !== null && activeMask !== archetype.slug);
          const hi = activeMask === archetype.slug || activeRoles.includes(archetype.slug);
          const href = `/heros-journey/archetype/${archetype.slug}`;
          return (
            <g key={archetype.slug}>
              <g
                style={{ cursor: "pointer", transition: "opacity 200ms ease" }}
                opacity={dim ? 0.3 : 1}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") selectMask(archetype.slug);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse") clearSelection();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Desktop pointer: hover already set active → navigate.
                  // Touch/pen: first tap selects; already-selected mask navigates.
                  const isMouse = (e.nativeEvent as PointerEvent).pointerType === "mouse";
                  if (isMouse || activeMask === archetype.slug) {
                    router.push(href);
                  } else {
                    selectMask(archetype.slug);
                  }
                }}
              >
                {archetype.primaryStages.map((n) => {
                  const s = JOURNEY_STAGES.find((x) => x.number === n);
                  if (!s) return null;
                  const sp = polar(STAGE_RADIUS, s.clockPosition);
                  // Only draw a connector when something is being hovered:
                  // - mask hover: show all of that mask's lines
                  // - stage hover: show only the lines that land on that stage
                  const showAllForMask = activeMask === archetype.slug;
                  const showForStage = activeStage === n;
                  const visible = showAllForMask || showForStage;
                  if (!visible) return null;
                  return (
                    <line
                      key={n}
                      x1={p.x}
                      y1={p.y}
                      x2={sp.x}
                      y2={sp.y}
                      stroke={archetype.accentColor}
                      strokeOpacity={0.6}
                      strokeWidth={1.25}
                      strokeLinecap="round"
                      style={{ transition: "opacity 200ms ease" }}
                    />
                  );
                })}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hi ? 22 : 18}
                  fill={
                    hi
                      ? `${archetype.accentColor}${light ? "22" : "2A"}`
                      : "var(--color-bg)"
                  }
                  stroke={archetype.accentColor}
                  strokeWidth={hi ? 2 : 1.3}
                  style={{ transition: "all 200ms ease" }}
                />
                <text
                  x={p.x}
                  y={p.y + 6}
                  textAnchor="middle"
                  fontSize={18}
                  fill={archetype.accentColor}
                  style={{ pointerEvents: "none" }}
                  className="font-serif"
                >
                  {archetype.symbol}
                </text>
                <text
                  x={namePos.x}
                  y={namePos.y + 3}
                  textAnchor="middle"
                  fontSize={8.5}
                  className="font-mono"
                  fill={
                    hi
                      ? archetype.accentColor
                      : light
                        ? "#5a5040"
                        : "#a8a090"
                  }
                  style={{
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    pointerEvents: "none",
                  }}
                >
                  {archetype.name.replace("The ", "")}
                </text>
              </g>
            </g>
          );
        })}

        {/* Center label */}
        <text
          x={CENTER}
          y={CENTER - 8}
          textAnchor="middle"
          fontSize={9}
          className="font-mono"
          fill={light ? "#7a6e5f" : "#8a8070"}
          style={{ letterSpacing: "0.3em", textTransform: "uppercase" }}
        >
          The Monomyth
        </text>
        <text
          x={CENTER}
          y={CENTER + 10}
          textAnchor="middle"
          fontSize={11}
          className="font-serif"
          fill={HEROSJOURNEY_COLORS.accent}
          fontStyle="italic"
        >
          {activeStage
            ? JOURNEY_STAGES.find((s) => s.number === activeStage)?.name
            : activeMask
              ? ALL_HEROSJOURNEY.find((a) => a.slug === activeMask)?.name
              : "twelve stages · eight masks"}
        </text>
      </svg>
    </div>
  );
}
