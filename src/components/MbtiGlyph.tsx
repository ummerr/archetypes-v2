"use client";

import { motion } from "framer-motion";
import { MbtiArchetype, CognitiveFunction } from "@/types/mbti";
import { getFunction } from "@/data/mbti/functions";
import { getTemperament } from "@/data/mbti/archetypes";
import { useTheme } from "@/components/ThemeProvider";

type Size = "sm" | "md" | "lg";

interface Props {
  archetype: MbtiArchetype;
  size?: Size;
  interactive?: boolean;
  ambient?: boolean;
}

const DIMS: Record<Size, number> = { sm: 72, md: 128, lg: 200 };

/**
 * Cognitive Geometry glyph.
 * Composition is derived from the type's dominant + auxiliary function:
 *  process (N/S/T/F) → primitive shape
 *  attitude (i/e) → vector direction (inward-dense vs outward-radiating)
 */
export default function MbtiGlyph({
  archetype,
  size = "md",
  interactive = false,
  ambient = false,
}: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const dim = DIMS[size];
  const temp = getTemperament(archetype.temperament);
  const primary = light ? temp.secondary : temp.primary;
  const secondary = temp.primary;

  const dom = getFunction(archetype.stack[0].code);
  const aux = getFunction(archetype.stack[1].code);

  const ambientLoop = ambient
    ? {
        animate: { scale: [1, 1.015, 1] },
        transition: { duration: 7, repeat: Infinity, ease: "easeInOut" as const },
      }
    : {};

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
        whileHover={interactive ? { scale: 1.03 } : undefined}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        {...ambientLoop}
      >
        {/* Anchor ring — faint dichotomy envelope */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={primary}
          strokeOpacity={light ? 0.18 : 0.14}
          strokeWidth={0.4}
        />

        {/* Auxiliary layer (background, thinner) */}
        <FunctionPrimitive
          fn={aux}
          color={secondary}
          opacity={light ? 0.5 : 0.42}
          strokeWidth={0.8}
          weight="aux"
        />

        {/* Dominant layer (foreground, heavier) */}
        <FunctionPrimitive
          fn={dom}
          color={primary}
          opacity={light ? 0.95 : 0.9}
          strokeWidth={1.4}
          weight="dom"
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
}: {
  fn: CognitiveFunction;
  color: string;
  opacity: number;
  strokeWidth: number;
  weight: "dom" | "aux";
}) {
  const outward = fn.attitude === "e";
  const scale = weight === "dom" ? (outward ? 1.0 : 0.64) : outward ? 0.9 : 0.52;

  const common = { stroke: color, strokeOpacity: opacity, fill: "none" as const };

  switch (fn.process) {
    case "N":
      // Triangles / node-burst. Ne = radiating, Ni = converging to center
      return <NodeBurst {...common} strokeWidth={strokeWidth} scale={scale} outward={outward} />;
    case "S":
      // Solid grounded square (Si = dense small, Se = expansive large)
      return <SquareStack {...common} strokeWidth={strokeWidth} scale={scale} outward={outward} />;
    case "T":
      // Rigid grid / intersecting lines
      return <GridCross {...common} strokeWidth={strokeWidth} scale={scale} outward={outward} />;
    case "F":
      // Concentric curves / interlocking circles
      return <CircleRings {...common} strokeWidth={strokeWidth} scale={scale} outward={outward} />;
  }
}

type PrimProps = {
  stroke: string;
  strokeOpacity: number;
  fill: "none";
  strokeWidth: number;
  scale: number;
  outward: boolean;
};

function NodeBurst({ scale, outward, ...p }: PrimProps) {
  const r = 32 * scale;
  const cx = 50;
  const cy = 50;
  const rays = 6;
  return (
    <g>
      {Array.from({ length: rays }).map((_, i) => {
        const a = (Math.PI * 2 * i) / rays - Math.PI / 2;
        const x1 = cx + Math.cos(a) * (outward ? 6 : r * 0.8);
        const y1 = cy + Math.sin(a) * (outward ? 6 : r * 0.8);
        const x2 = cx + Math.cos(a) * r;
        const y2 = cy + Math.sin(a) * r;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} {...p} strokeLinecap="round" />;
      })}
      {/* Central node */}
      <circle cx={cx} cy={cy} r={outward ? 3 : 5} {...p} fill={p.stroke} fillOpacity={p.strokeOpacity * 0.4} />
    </g>
  );
}

function SquareStack({ scale, outward, ...p }: PrimProps) {
  const s = 54 * scale;
  const cx = 50;
  const cy = 50;
  const half = s / 2;
  return (
    <g>
      <rect x={cx - half} y={cy - half} width={s} height={s} {...p} strokeLinejoin="miter" />
      {outward ? (
        // Outward: extending baselines beyond the square
        <>
          <line x1={cx - half - 6} y1={cy + half} x2={cx + half + 6} y2={cy + half} {...p} strokeLinecap="round" />
          <line x1={cx - half - 6} y1={cy - half} x2={cx + half + 6} y2={cy - half} {...p} strokeLinecap="round" />
        </>
      ) : (
        // Inward: nested inner square
        <rect
          x={cx - half * 0.55}
          y={cy - half * 0.55}
          width={s * 0.55}
          height={s * 0.55}
          {...p}
          strokeOpacity={p.strokeOpacity * 0.7}
        />
      )}
    </g>
  );
}

function GridCross({ scale, outward, ...p }: PrimProps) {
  const s = 52 * scale;
  const cx = 50;
  const cy = 50;
  const half = s / 2;
  const lines = outward ? 5 : 3;
  return (
    <g>
      {Array.from({ length: lines }).map((_, i) => {
        const t = i / (lines - 1);
        const pos = cy - half + s * t;
        return <line key={`h${i}`} x1={cx - half} y1={pos} x2={cx + half} y2={pos} {...p} strokeLinecap="round" />;
      })}
      {Array.from({ length: lines }).map((_, i) => {
        const t = i / (lines - 1);
        const pos = cx - half + s * t;
        return <line key={`v${i}`} x1={pos} y1={cy - half} x2={pos} y2={cy + half} {...p} strokeLinecap="round" />;
      })}
    </g>
  );
}

function CircleRings({ scale, outward, ...p }: PrimProps) {
  const r = 30 * scale;
  const cx = 50;
  const cy = 50;
  if (outward) {
    // Interlocking outward circles
    const offset = r * 0.55;
    return (
      <g>
        <circle cx={cx - offset} cy={cy} r={r} {...p} />
        <circle cx={cx + offset} cy={cy} r={r} {...p} />
        <circle cx={cx} cy={cy - offset} r={r * 0.75} {...p} strokeOpacity={p.strokeOpacity * 0.7} />
      </g>
    );
  }
  // Concentric inward rings
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} {...p} />
      <circle cx={cx} cy={cy} r={r * 0.66} {...p} strokeOpacity={p.strokeOpacity * 0.75} />
      <circle cx={cx} cy={cy} r={r * 0.33} {...p} strokeOpacity={p.strokeOpacity * 0.5} />
    </g>
  );
}
