"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MbtiArchetype, CognitiveFunction } from "@/types/mbti";
import { getFunction } from "@/data/mbti/functions";
import { getTemperament } from "@/data/mbti/archetypes";
import { useTheme } from "@/components/ThemeProvider";

type Size = "sm" | "md" | "lg";

interface Props {
  archetype: MbtiArchetype;
  size?: Size;
  interactive?: boolean;
  /** Retained for API compat; motion is now always on. */
  ambient?: boolean;
}

/**
 * MBTI glyph pixel map. Calibrated denser than the canonical TotemSize
 * scale because the cognitive-geometry primitives need the space to
 * read. See DESIGN.md §3 note on MBTI sizing.
 */
const DIMS: Record<Size, number> = { sm: 72, md: 128, lg: 200 };

/**
 * Cognitive Geometry glyph.
 * Each cognitive function animates according to its process + attitude:
 *   N (intuition) - radiating node-burst, rays pulse/rotate
 *   S (sensation) - grounded square, breathes or drifts along baseline
 *   T (thinking)  - rigid grid, alternating lines shimmer
 *   F (feeling)   - circles, concentric breathe or interlocking orbit
 * Auxiliary layer moves at half speed for depth.
 */
export default function MbtiGlyph({
  archetype,
  size = "md",
  interactive = false,
}: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const prefersReducedMotion = useReducedMotion();
  const motionOn = !prefersReducedMotion;
  const dim = DIMS[size];
  const temp = getTemperament(archetype.temperament);
  const primary = light ? temp.secondary : temp.primary;
  const secondary = temp.primary;

  const dom = getFunction(archetype.stack[0].code);
  const aux = getFunction(archetype.stack[1].code);

  return (
    <div
      className="relative inline-flex items-center justify-center no-contrast-boost"
      style={{ width: dim, height: dim }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        width={dim}
        height={dim}
        className="overflow-visible"
        whileHover={interactive ? { scale: 1.04 } : undefined}
        animate={motionOn ? { scale: [1, 1.015, 1] } : undefined}
        transition={{
          scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          default: { type: "spring", stiffness: 220, damping: 18 },
        }}
      >
        {/* Anchor ring - faint dichotomy envelope, slow rotation */}
        <motion.circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={primary}
          strokeOpacity={light ? 0.18 : 0.14}
          strokeWidth={0.4}
          strokeDasharray="1 4"
          animate={motionOn ? { rotate: 360 } : undefined}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50px 50px" }}
        />

        {/* Auxiliary layer (background, thinner, slower) */}
        <FunctionPrimitive
          fn={aux}
          color={secondary}
          opacity={light ? 0.5 : 0.42}
          strokeWidth={0.8}
          weight="aux"
          motionOn={motionOn}
        />

        {/* Dominant layer (foreground, heavier) */}
        <FunctionPrimitive
          fn={dom}
          color={primary}
          opacity={light ? 0.95 : 0.9}
          strokeWidth={1.4}
          weight="dom"
          motionOn={motionOn}
        />
      </motion.svg>
    </div>
  );
}

function FunctionPrimitive({
  fn,
  color,
  opacity,
  strokeWidth,
  weight,
  motionOn,
}: {
  fn: CognitiveFunction;
  color: string;
  opacity: number;
  strokeWidth: number;
  weight: "dom" | "aux";
  motionOn: boolean;
}) {
  const outward = fn.attitude === "e";
  const scale = weight === "dom" ? (outward ? 1.0 : 0.64) : outward ? 0.9 : 0.52;
  const speedMul = weight === "dom" ? 1 : 1.8;

  const common = { stroke: color, strokeOpacity: opacity, fill: "none" as const };
  const shared = { strokeWidth, scale, outward, speedMul, motionOn };

  switch (fn.process) {
    case "N":
      return <NodeBurst {...common} {...shared} />;
    case "S":
      return <SquareStack {...common} {...shared} />;
    case "T":
      return <GridCross {...common} {...shared} />;
    case "F":
      return <CircleRings {...common} {...shared} />;
  }
}

type PrimProps = {
  stroke: string;
  strokeOpacity: number;
  fill: "none";
  strokeWidth: number;
  scale: number;
  outward: boolean;
  speedMul: number;
  motionOn: boolean;
};

function NodeBurst({ scale, outward, speedMul, motionOn, ...p }: PrimProps) {
  const r = 32 * scale;
  const cx = 50;
  const cy = 50;
  const rays = 6;
  const pulseDur = 3.2 * speedMul;
  const spinDur = (outward ? 28 : 44) * speedMul;
  return (
    <motion.g
      animate={motionOn ? { rotate: outward ? 360 : -360 } : undefined}
      transition={{ duration: spinDur, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "50px 50px" }}
    >
      {Array.from({ length: rays }).map((_, i) => {
        const a = (Math.PI * 2 * i) / rays - Math.PI / 2;
        const innerBase = outward ? 6 : r * 0.8;
        const outerBase = r;
        return (
          <motion.line
            key={i}
            x1={cx + Math.cos(a) * innerBase}
            y1={cy + Math.sin(a) * innerBase}
            x2={cx + Math.cos(a) * outerBase}
            y2={cy + Math.sin(a) * outerBase}
            {...p}
            strokeLinecap="round"
            animate={
              motionOn
                ? {
                    pathLength: outward ? [0.7, 1, 0.7] : [1, 0.75, 1],
                    opacity: [p.strokeOpacity * 0.75, p.strokeOpacity, p.strokeOpacity * 0.75],
                  }
                : undefined
            }
            transition={{
              duration: pulseDur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i / rays) * pulseDur,
            }}
          />
        );
      })}
      <motion.circle
        cx={cx}
        cy={cy}
        r={outward ? 3 : 5}
        {...p}
        fill={p.stroke}
        fillOpacity={p.strokeOpacity * 0.4}
        animate={motionOn ? { scale: [1, outward ? 1.25 : 0.75, 1] } : undefined}
        transition={{ duration: pulseDur, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50px 50px" }}
      />
    </motion.g>
  );
}

function SquareStack({ scale, outward, speedMul, motionOn, ...p }: PrimProps) {
  const s = 54 * scale;
  const cx = 50;
  const cy = 50;
  const half = s / 2;
  const dur = 5 * speedMul;
  return (
    <g>
      <motion.rect
        x={cx - half}
        y={cy - half}
        width={s}
        height={s}
        {...p}
        strokeLinejoin="miter"
        animate={motionOn ? { scale: [1, outward ? 1.03 : 0.96, 1] } : undefined}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50px 50px" }}
      />
      {outward ? (
        <motion.g
          animate={motionOn ? { x: [-2, 2, -2] } : undefined}
          transition={{ duration: dur * 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <line
            x1={cx - half - 6}
            y1={cy + half}
            x2={cx + half + 6}
            y2={cy + half}
            {...p}
            strokeLinecap="round"
          />
          <line
            x1={cx - half - 6}
            y1={cy - half}
            x2={cx + half + 6}
            y2={cy - half}
            {...p}
            strokeLinecap="round"
          />
        </motion.g>
      ) : (
        <motion.rect
          x={cx - half * 0.55}
          y={cy - half * 0.55}
          width={s * 0.55}
          height={s * 0.55}
          {...p}
          strokeOpacity={p.strokeOpacity * 0.7}
          animate={motionOn ? { scale: [1, 0.82, 1], rotate: [0, 45, 0] } : undefined}
          transition={{ duration: dur * 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "50px 50px" }}
        />
      )}
    </g>
  );
}

function GridCross({ scale, outward, speedMul, motionOn, ...p }: PrimProps) {
  const s = 52 * scale;
  const cx = 50;
  const cy = 50;
  const half = s / 2;
  const lines = outward ? 5 : 3;
  const dur = 3.6 * speedMul;
  return (
    <g>
      {Array.from({ length: lines }).map((_, i) => {
        const t = i / (lines - 1);
        const pos = cy - half + s * t;
        return (
          <motion.line
            key={`h${i}`}
            x1={cx - half}
            y1={pos}
            x2={cx + half}
            y2={pos}
            {...p}
            strokeLinecap="round"
            animate={
              motionOn
                ? {
                    opacity: [
                      p.strokeOpacity * 0.4,
                      p.strokeOpacity,
                      p.strokeOpacity * 0.4,
                    ],
                  }
                : undefined
            }
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i / lines) * dur * 0.5,
            }}
          />
        );
      })}
      {Array.from({ length: lines }).map((_, i) => {
        const t = i / (lines - 1);
        const pos = cx - half + s * t;
        return (
          <motion.line
            key={`v${i}`}
            x1={pos}
            y1={cy - half}
            x2={pos}
            y2={cy + half}
            {...p}
            strokeLinecap="round"
            animate={
              motionOn
                ? {
                    opacity: [
                      p.strokeOpacity,
                      p.strokeOpacity * 0.4,
                      p.strokeOpacity,
                    ],
                  }
                : undefined
            }
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i / lines) * dur * 0.5,
            }}
          />
        );
      })}
    </g>
  );
}

function CircleRings({ scale, outward, speedMul, motionOn, ...p }: PrimProps) {
  const r = 30 * scale;
  const cx = 50;
  const cy = 50;
  const dur = 4.5 * speedMul;
  if (outward) {
    const offset = r * 0.55;
    return (
      <motion.g
        animate={motionOn ? { rotate: 360 } : undefined}
        transition={{ duration: 24 * speedMul, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50px 50px" }}
      >
        <motion.circle
          cx={cx - offset}
          cy={cy}
          r={r}
          {...p}
          animate={motionOn ? { scale: [1, 1.05, 1] } : undefined}
          transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${cx - offset}px ${cy}px` }}
        />
        <motion.circle
          cx={cx + offset}
          cy={cy}
          r={r}
          {...p}
          animate={motionOn ? { scale: [1.05, 1, 1.05] } : undefined}
          transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${cx + offset}px ${cy}px` }}
        />
        <motion.circle
          cx={cx}
          cy={cy - offset}
          r={r * 0.75}
          {...p}
          strokeOpacity={p.strokeOpacity * 0.7}
          animate={motionOn ? { scale: [0.95, 1.08, 0.95] } : undefined}
          transition={{ duration: dur * 1.1, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${cx}px ${cy - offset}px` }}
        />
      </motion.g>
    );
  }
  return (
    <g>
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        {...p}
        animate={motionOn ? { scale: [1, 1.06, 1] } : undefined}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50px 50px" }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={r * 0.66}
        {...p}
        strokeOpacity={p.strokeOpacity * 0.75}
        animate={motionOn ? { scale: [1, 0.88, 1] } : undefined}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: dur * 0.2 }}
        style={{ transformOrigin: "50px 50px" }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={r * 0.33}
        {...p}
        strokeOpacity={p.strokeOpacity * 0.5}
        animate={motionOn ? { scale: [1, 1.25, 1] } : undefined}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: dur * 0.4 }}
        style={{ transformOrigin: "50px 50px" }}
      />
    </g>
  );
}
