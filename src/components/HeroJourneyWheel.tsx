"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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

const W = 1120;
const H = 880;
const PAD_L = 184;
const PAD_R = 64;
const SPINE_Y = 300;
const LANE_TOP = 440;
const LANE_H = 44;
const ACT_Y = 56;
const ANN_Y = 224;

const STAGES = JOURNEY_STAGES;

function stageX(n: number): number {
  const usable = W - PAD_L - PAD_R;
  return PAD_L + ((n - 1) / (STAGES.length - 1)) * usable;
}

// Single-band annotations, short enough to never collide with neighbours.
// Spacing between marked stages (≥3) keeps text comfortably apart.
const ANNOTATIONS: { stage: number; text: string }[] = [
  { stage: 2, text: "homeostasis breaks" },
  { stage: 5, text: "point of no return" },
  { stage: 8, text: "death & rebirth" },
  { stage: 12, text: "elixir brought home" },
];

// Lane order (top→bottom). Broad-span masks first.
const LANE_ORDER = [
  "hero",
  "herald",
  "mentor",
  "threshold-guardian",
  "ally",
  "shapeshifter",
  "trickster",
  "shadow",
];

export default function HeroJourneyWheel() {
  const { theme } = useTheme();
  const router = useRouter();
  const light = theme === "light";

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

  const orderedMasks = LANE_ORDER.map(
    (slug) => ALL_HEROSJOURNEY.find((a) => a.slug === slug)!
  );

  const activeStages = activeMask
    ? ALL_HEROSJOURNEY.find((a) => a.slug === activeMask)?.primaryStages ?? []
    : [];
  const activeRoles = activeStage
    ? getArchetypesByStage(activeStage).map((a) => a.slug)
    : [];

  const mutedText = light ? "#6a5f50" : "#9a907e";
  const faintText = light ? "#8a7f70" : "#756c5e";
  const hairline = light ? "#00000014" : "#FFFFFF14";

  return (
    <div className="w-full flex justify-center">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-[1200px] h-auto"
        role="img"
        aria-label="Hero's Journey - twelve-stage timeline with archetype swim lanes"
        onClick={clearSelection}
      >
        <rect x={0} y={0} width={W} height={H} fill="transparent" />

        <defs>
          {JOURNEY_ACTS.map((act) => (
            <linearGradient
              key={act.id}
              id={`ribbon-${act.id}`}
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor={act.color} stopOpacity={0.25} />
              <stop offset="50%" stopColor={act.color} stopOpacity={0.9} />
              <stop offset="100%" stopColor={act.color} stopOpacity={0.25} />
            </linearGradient>
          ))}
          <radialGradient id="nadir-pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={HEROSJOURNEY_COLORS.accent} stopOpacity={0.26} />
            <stop offset="100%" stopColor={HEROSJOURNEY_COLORS.accent} stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* --- Act ribbons (top) --- */}
        {JOURNEY_ACTS.map((act) => {
          const stagesInAct = STAGES.filter((s) => s.act === act.id);
          const first = stagesInAct[0].number;
          const last = stagesInAct[stagesInAct.length - 1].number;
          const x1 = stageX(first) - 18;
          const x2 = stageX(last) + 18;
          return (
            <g key={act.id}>
              <rect
                x={x1}
                y={ACT_Y}
                width={x2 - x1}
                height={14}
                rx={7}
                fill={`url(#ribbon-${act.id})`}
              />
              <text
                x={(x1 + x2) / 2}
                y={ACT_Y - 10}
                textAnchor="middle"
                fontSize={10.5}
                className="font-mono"
                fill={act.color}
                style={{ letterSpacing: "0.28em", textTransform: "uppercase" }}
              >
                {act.label}
              </text>
              <text
                x={(x1 + x2) / 2}
                y={ACT_Y + 34}
                textAnchor="middle"
                fontSize={9.5}
                className="font-serif"
                fill={mutedText}
                fontStyle="italic"
              >
                {act.tagline}
              </text>
            </g>
          );
        })}

        {/* --- Annotations: single band, short connectors --- */}
        {ANNOTATIONS.map((ann) => {
          const sx = stageX(ann.stage);
          const isNadir = ann.stage === 8;
          const isActive = activeStage === ann.stage;
          const tone = isNadir ? HEROSJOURNEY_COLORS.accent : faintText;
          return (
            <g key={ann.stage} opacity={activeMask ? 0.3 : 1}>
              {/* short tether - text sits above, tick points to spine */}
              <line
                x1={sx}
                y1={ANN_Y + 6}
                x2={sx}
                y2={SPINE_Y - 14}
                stroke={tone}
                strokeOpacity={isActive ? 0.85 : isNadir ? 0.55 : 0.22}
                strokeWidth={1}
                strokeDasharray="2 5"
              />
              <text
                x={sx}
                y={ANN_Y}
                textAnchor="middle"
                fontSize={10}
                className="font-serif"
                fill={tone}
                fillOpacity={isActive ? 1 : isNadir ? 1 : 0.75}
                fontStyle="italic"
              >
                {ann.text}
              </text>
            </g>
          );
        })}

        {/* --- Spine --- */}
        <line
          x1={stageX(1) - 24}
          x2={stageX(12) + 24}
          y1={SPINE_Y}
          y2={SPINE_Y}
          stroke={light ? "#00000028" : "#FFFFFF22"}
          strokeWidth={1}
        />
        {/* Nadir glow behind Ordeal */}
        <circle
          cx={stageX(8)}
          cy={SPINE_Y}
          r={46}
          fill="url(#nadir-pulse)"
        />
        {/* Return-loop hint - faint arc from 12 back toward 1 */}
        <path
          d={`M ${stageX(12) + 22} ${SPINE_Y} Q ${stageX(12) + 60} ${SPINE_Y + 80} ${stageX(12) + 10} ${SPINE_Y + 120} Q ${(stageX(1) + stageX(12)) / 2} ${H - 30} ${stageX(1) - 10} ${SPINE_Y + 80} Q ${stageX(1) - 46} ${SPINE_Y + 30} ${stageX(1) - 22} ${SPINE_Y}`}
          fill="none"
          stroke={hairline}
          strokeDasharray="3 6"
          strokeWidth={1}
        />
        <text
          x={(stageX(1) + stageX(12)) / 2}
          y={H - 18}
          textAnchor="middle"
          fontSize={9}
          className="font-mono"
          fill={faintText}
          style={{ letterSpacing: "0.3em", textTransform: "uppercase" }}
        >
          the cycle begins again
        </text>

        {/* --- Stage nodes on spine --- */}
        {STAGES.map((stage) => {
          const x = stageX(stage.number);
          const act = JOURNEY_ACTS.find((a) => a.id === stage.act)!;
          const isActive =
            activeStage === stage.number || activeStages.includes(stage.number);
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
              {/* invisible hit target */}
              <rect
                x={x - 28}
                y={SPINE_Y - 70}
                width={56}
                height={140}
                fill="transparent"
              />
              <circle
                cx={x}
                cy={SPINE_Y}
                r={isActive ? 13 : 9}
                fill="var(--color-bg)"
                stroke={act.color}
                strokeWidth={isActive ? 2.2 : 1.4}
                style={{ transition: "all 200ms ease" }}
              />
              <text
                x={x}
                y={SPINE_Y + 3.5}
                textAnchor="middle"
                className="font-mono"
                fontSize={9}
                fill={act.color}
                style={{ pointerEvents: "none" }}
              >
                {stage.number}
              </text>
              <g
                transform={`translate(${x} ${SPINE_Y + 22}) rotate(-58)`}
                style={{ pointerEvents: "none" }}
              >
                <text
                  textAnchor="end"
                  fontSize={10}
                  className="font-mono"
                  fill={isActive ? act.color : mutedText}
                  style={{
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    transition: "fill 200ms ease",
                  }}
                >
                  {stage.name}
                </text>
              </g>
            </g>
          );
        })}

        {/* --- Swim lanes --- */}
        {orderedMasks.map((archetype, laneIdx) => {
          const laneY = LANE_TOP + laneIdx * LANE_H;
          const stages = [...archetype.primaryStages].sort((a, b) => a - b);
          const dim =
            (activeStage !== null && !activeRoles.includes(archetype.slug)) ||
            (activeMask !== null && activeMask !== archetype.slug);
          const hi =
            activeMask === archetype.slug ||
            activeRoles.includes(archetype.slug);
          const href = `/heros-journey/archetype/${archetype.slug}`;

          // lane baseline
          const laneX1 = stageX(stages[0]);
          const laneX2 = stageX(stages[stages.length - 1]);

          return (
            <g
              key={archetype.slug}
              opacity={dim ? 0.28 : 1}
              style={{ cursor: "pointer", transition: "opacity 200ms ease" }}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") selectMask(archetype.slug);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") clearSelection();
              }}
              onClick={(e) => {
                e.stopPropagation();
                const isMouse =
                  (e.nativeEvent as PointerEvent).pointerType === "mouse";
                if (isMouse || activeMask === archetype.slug) {
                  router.push(href);
                } else {
                  selectMask(archetype.slug);
                }
              }}
            >
              {/* lane guide */}
              <line
                x1={PAD_L - 18}
                x2={W - PAD_R}
                y1={laneY}
                y2={laneY}
                stroke={hairline}
                strokeDasharray="1 4"
              />

              {/* mask label (left gutter) */}
              <text
                x={PAD_L - 26}
                y={laneY - 2}
                textAnchor="end"
                fontSize={10}
                className="font-mono"
                fill={hi ? archetype.accentColor : mutedText}
                style={{
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  transition: "fill 200ms ease",
                }}
              >
                {archetype.name.replace("The ", "")}
              </text>
              <text
                x={PAD_L - 26}
                y={laneY + 12}
                textAnchor="end"
                fontSize={16}
                fill={archetype.accentColor}
                className="font-serif"
              >
                {archetype.symbol}
              </text>

              {/* active segment */}
              <line
                x1={laneX1}
                x2={laneX2}
                y1={laneY}
                y2={laneY}
                stroke={archetype.accentColor}
                strokeOpacity={hi ? 0.9 : 0.55}
                strokeWidth={hi ? 2.2 : 1.4}
                strokeLinecap="round"
                style={{ transition: "all 200ms ease" }}
              />

              {/* intersection markers at each primaryStage */}
              {stages.map((n) => {
                const x = stageX(n);
                const stageActive =
                  activeStage === n || activeMask === archetype.slug;
                return (
                  <g key={n}>
                    {/* drop-line up to spine when this pairing is highlighted */}
                    {stageActive && (
                      <line
                        x1={x}
                        x2={x}
                        y1={SPINE_Y + 14}
                        y2={laneY}
                        stroke={archetype.accentColor}
                        strokeOpacity={0.5}
                        strokeWidth={1}
                        strokeDasharray="2 3"
                      />
                    )}
                    <circle
                      cx={x}
                      cy={laneY}
                      r={hi ? 6.5 : 4.5}
                      fill="var(--color-bg)"
                      stroke={archetype.accentColor}
                      strokeWidth={hi ? 2 : 1.4}
                      style={{ transition: "all 200ms ease" }}
                    />
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* --- Title + dynamic caption --- */}
        <text
          x={PAD_L - 26}
          y={28}
          textAnchor="end"
          fontSize={10}
          className="font-mono"
          fill={faintText}
          style={{ letterSpacing: "0.3em", textTransform: "uppercase" }}
        >
          The Monomyth
        </text>
        <text
          x={PAD_L - 26}
          y={46}
          textAnchor="end"
          fontSize={11.5}
          className="font-serif"
          fill={HEROSJOURNEY_COLORS.accent}
          fontStyle="italic"
        >
          {activeStage
            ? STAGES.find((s) => s.number === activeStage)?.name
            : activeMask
              ? ALL_HEROSJOURNEY.find((a) => a.slug === activeMask)?.name
              : "twelve stages · eight masks"}
        </text>
      </svg>
    </div>
  );
}
