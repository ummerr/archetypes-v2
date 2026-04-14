"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FAMILIES } from "@/data/kwml/archetypes";
import { ArchetypeFamilyGroup } from "@/types/archetype";

const cx = 300;
const cy = 300;
const r = 185;

const nodePositions: Record<string, { x: number; y: number }> = {
  top:    { x: cx, y: cy - r },
  bottom: { x: cx, y: cy + r },
  left:   { x: cx - r, y: cy },
  right:  { x: cx + r, y: cy },
};

// Pre-computed dot positions to avoid hydration mismatches from floating point
const outerDots = Array.from({ length: 36 }).map((_, i) => {
  const angle = (i * 10 * Math.PI) / 180;
  const dotR = 242;
  return {
    cx: Math.round((cx + Math.cos(angle) * dotR) * 100) / 100,
    cy: Math.round((cy + Math.sin(angle) * dotR) * 100) / 100,
    r: i % 9 === 0 ? 1.5 : 0.5,
    opacity: i % 9 === 0 ? 0.2 : 0.06,
  };
});

const innerDots = Array.from({ length: 12 }).map((_, i) => {
  const angle = (i * 30 * Math.PI) / 180;
  const dotR = 62;
  return {
    cx: Math.round((cx + Math.cos(angle) * dotR) * 100) / 100,
    cy: Math.round((cy + Math.sin(angle) * dotR) * 100) / 100,
  };
});

/**
 * Returns an SVG path string for each archetype's unique node shape,
 * centered at (x, y) with the given radius.
 */
function nodeShape(family: string, x: number, y: number, r: number): string {
  switch (family) {
    // King: pentagon/crown - flat top with angled sides
    case "king": {
      const top = r * 0.85;
      const mid = r * 0.4;
      return `M${x - r * 0.6} ${y - top} L${x + r * 0.6} ${y - top} L${x + r} ${y - mid} L${x + r * 0.8} ${y + top} L${x - r * 0.8} ${y + top} L${x - r} ${y - mid}Z`;
    }
    // Warrior: shield - pointed bottom
    case "warrior": {
      return `M${x} ${y - r} L${x + r * 0.9} ${y - r * 0.5} L${x + r * 0.9} ${y + r * 0.3} L${x} ${y + r} L${x - r * 0.9} ${y + r * 0.3} L${x - r * 0.9} ${y - r * 0.5}Z`;
    }
    // Magician: octagon - faceted crystal
    case "magician": {
      const s = r * 0.42;
      return `M${x - s} ${y - r} L${x + s} ${y - r} L${x + r} ${y - s} L${x + r} ${y + s} L${x + s} ${y + r} L${x - s} ${y + r} L${x - r} ${y + s} L${x - r} ${y - s}Z`;
    }
    // Lover: rounded ellipse approximated with curves
    case "lover": {
      const rx = r * 1.05;
      const ry = r * 0.95;
      return `M${x} ${y - ry} C${x + rx * 0.55} ${y - ry} ${x + rx} ${y - ry * 0.55} ${x + rx} ${y} C${x + rx} ${y + ry * 0.55} ${x + rx * 0.55} ${y + ry} ${x} ${y + ry} C${x - rx * 0.55} ${y + ry} ${x - rx} ${y + ry * 0.55} ${x - rx} ${y} C${x - rx} ${y - ry * 0.55} ${x - rx * 0.55} ${y - ry} ${x} ${y - ry}Z`;
    }
    default:
      return "";
  }
}

function FamilyNode({
  family,
  index,
  hovered,
  onHover,
}: {
  family: ArchetypeFamilyGroup;
  index: number;
  hovered: string | null;
  onHover: (id: string | null) => void;
}) {
  const router = useRouter();
  const pos = nodePositions[family.position];
  const isHovered = hovered === family.id;
  const shapePath = nodeShape(family.id, pos.x, pos.y, 50);

  return (
    <motion.g
      className="cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.8 + index * 0.15 }}
      onMouseEnter={() => onHover(family.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => router.push(`/kwml/archetype/${family.man.slug}`)}
    >
      {/* Ambient glow - large and soft */}
      <circle
        cx={pos.x}
        cy={pos.y}
        r={80}
        fill={family.color}
        opacity={isHovered ? 0.08 : 0.02}
        className="transition-opacity duration-700"
      />

      {/* Pulsing ring on hover */}
      {isHovered && (
        <path
          d={shapePath}
          fill="none"
          stroke={family.color}
          strokeWidth={0.8}
          className="animate-pulse-ring"
          style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
        />
      )}

      {/* Outer shape */}
      <path
        d={shapePath}
        fill="none"
        stroke={family.color}
        strokeWidth={isHovered ? 1 : 0.4}
        strokeOpacity={isHovered ? 0.5 : 0.12}
        className="transition-all duration-500"
      />

      {/* Inner fill */}
      <path
        d={nodeShape(family.id, pos.x, pos.y, 48)}
        fill={`${family.color}${isHovered ? "10" : "05"}`}
        className="transition-all duration-500"
      />

      {/* Boy name */}
      <text
        x={pos.x}
        y={pos.y - 10}
        textAnchor="middle"
        fill="var(--color-muted)"
        fontSize={8.5}
        letterSpacing="0.14em"
        className="uppercase"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {family.boy.name.replace("The ", "")}
      </text>

      {/* Main label */}
      <text
        x={pos.x}
        y={pos.y + 14}
        textAnchor="middle"
        fill={family.color}
        fontSize={22}
        fontWeight={500}
        letterSpacing="0.04em"
        opacity={isHovered ? 1 : 0.85}
        className="transition-opacity duration-300"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {family.label}
      </text>

      {/* Explore hint */}
      <text
        x={pos.x}
        y={pos.y + 30}
        textAnchor="middle"
        fill={family.color}
        fontSize={7}
        letterSpacing="0.18em"
        opacity={isHovered ? 0.5 : 0}
        className="uppercase transition-opacity duration-300"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        explore
      </text>
    </motion.g>
  );
}

export default function QuadrantMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  // Sacred geometry ring radii
  const rings = [60, 120, r, 240];

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex justify-center">
        <svg
          viewBox="0 0 600 600"
          className="w-full max-w-[min(80vh,720px)]"
          style={{ overflow: "visible" }}
        >
          <defs>
            <radialGradient id="sacredGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.06" />
              <stop offset="40%" stopColor="var(--color-gold)" stopOpacity="0.02" />
              <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.04" />
              <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Deep ambient glow */}
          <circle cx={cx} cy={cy} r={250} fill="url(#sacredGlow)" />

          {/* Sacred geometry: concentric rings */}
          {rings.map((ringR, i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={ringR}
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth={i === 2 ? 0.5 : 0.3}
              strokeOpacity={i === 2 ? 0.1 : 0.04}
              strokeDasharray={i === 2 ? "none" : "2 8"}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2 + i * 0.5, delay: i * 0.2, ease: "easeOut" }}
            />
          ))}

          {/* Slowly rotating outer decorative ring */}
          <g className="animate-rotate-slow" style={{ transformOrigin: `${cx}px ${cy}px` }}>
            {outerDots.map((dot, i) => (
              <circle
                key={i}
                cx={dot.cx}
                cy={dot.cy}
                r={dot.r}
                fill="var(--color-gold)"
                opacity={dot.opacity}
              />
            ))}
          </g>

          {/* Counter-rotating inner ring */}
          <g className="animate-rotate-reverse" style={{ transformOrigin: `${cx}px ${cy}px` }}>
            {innerDots.map((dot, i) => (
              <circle
                key={i}
                cx={dot.cx}
                cy={dot.cy}
                r={0.8}
                fill="var(--color-gold)"
                opacity={0.15}
              />
            ))}
          </g>

          {/* Cross axis lines with flowing dashes */}
          {Object.values(nodePositions).map((pos, i) => (
            <line
              key={i}
              x1={cx + (pos.x - cx) * 0.18}
              y1={cy + (pos.y - cy) * 0.18}
              x2={pos.x - (pos.x - cx) * 0.15}
              y2={pos.y - (pos.y - cy) * 0.15}
              stroke="var(--color-gold)"
              strokeWidth={0.4}
              strokeOpacity={0.1}
              strokeDasharray="3 6"
              className="animate-dash-flow"
            />
          ))}

          {/* Diagonal cross (45-degree lines) - lighter */}
          {[45, 135, 225, 315].map((deg) => {
            const angle = (deg * Math.PI) / 180;
            const innerR = 70;
            const outerR = 130;
            return (
              <line
                key={deg}
                x1={cx + Math.cos(angle) * innerR}
                y1={cy + Math.sin(angle) * innerR}
                x2={cx + Math.cos(angle) * outerR}
                y2={cy + Math.sin(angle) * outerR}
                stroke="var(--color-gold)"
                strokeWidth={0.3}
                strokeOpacity={0.04}
                strokeDasharray="1 6"
              />
            );
          })}

          {/* Center - breathing Self node */}
          <motion.g
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            {/* Breathing glow behind */}
            <circle
              cx={cx}
              cy={cy}
              r={40}
              fill="var(--color-gold)"
              className="animate-breathe"
            />
            {/* Center circle */}
            <circle
              cx={cx}
              cy={cy}
              r={24}
              fill="var(--color-bg)"
              stroke="var(--color-gold)"
              strokeWidth={0.8}
              strokeOpacity={0.4}
            />
            {/* Inner diamond */}
            <rect
              x={cx - 4}
              y={cy - 4}
              width={8}
              height={8}
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth={0.5}
              strokeOpacity={0.3}
              transform={`rotate(45, ${cx}, ${cy})`}
            />
            <text
              x={cx}
              y={cy + 4.5}
              textAnchor="middle"
              fill="var(--color-gold)"
              fontSize={11}
              letterSpacing="0.2em"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Self
            </text>
          </motion.g>

          {/* Archetype nodes */}
          {FAMILIES.map((family, i) => (
            <FamilyNode
              key={family.id}
              family={family}
              index={i}
              hovered={hovered}
              onHover={setHovered}
            />
          ))}

          {/* Axis labels - ethereal, outside everything */}
          {[
            { x: cx, y: cy - r - 64, label: "Order" },
            { x: cx, y: cy + r + 72, label: "Knowledge" },
            { x: cx - r - 72, y: cy + 3, label: "Action" },
            { x: cx + r + 72, y: cy + 3, label: "Connection" },
          ].map(({ x, y, label }) => (
            <text
              key={label}
              x={x}
              y={y}
              textAnchor="middle"
              fill="var(--color-gold)"
              fontSize={7}
              letterSpacing="0.25em"
              opacity={0.2}
              className="uppercase"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {label}
            </text>
          ))}
        </svg>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3 px-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center mb-6 relative"
        >
          <div className="absolute w-24 h-24 rounded-full bg-gold/[0.03] animate-breathe" />
          <div className="relative w-14 h-14 rounded-full border border-gold/20 bg-bg flex items-center justify-center">
            <span className="font-serif text-xs text-gold tracking-[0.12em]">
              Self
            </span>
          </div>
        </motion.div>
        {FAMILIES.map((family, i) => (
          <motion.a
            key={family.id}
            href={`/kwml/archetype/${family.man.slug}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            className="group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300"
            style={{
              borderColor: `${family.color}12`,
              background: `linear-gradient(135deg, ${family.color}05 0%, transparent 50%)`,
            }}
          >
            <div className="relative shrink-0">
              <div
                className="absolute inset-0 -m-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: `${family.color}10`, filter: "blur(8px)" }}
              />
              <div
                className="relative w-12 h-12 rounded-full border flex items-center justify-center"
                style={{
                  borderColor: `${family.color}25`,
                  background: `radial-gradient(circle, ${family.color}0A 0%, transparent 70%)`,
                }}
              >
                <span
                  className="font-serif text-lg font-medium"
                  style={{ color: family.color }}
                >
                  {family.label[0]}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="font-serif text-xl font-medium leading-tight"
                style={{ color: family.color }}
              >
                {family.label}
              </h3>
              <p className="text-[11px] text-muted mt-0.5">
                {family.boy.name} → {family.man.name}
              </p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-muted/30 group-hover:text-muted transition-colors shrink-0"
            >
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        ))}
      </div>
    </>
  );
}
