/**
 * Reusable stroke-based motifs for the Tarot arcana glyphs. Each
 * component renders inside a 100×100 viewBox and accepts a common
 * palette prop surface so compositions in `ArcanaGlyph.tsx` can pose
 * them in layered z-order.
 *
 * Kept Satori-compatible: no <filter>, no SMIL. Filters and animation
 * are applied at the composition level and stripped for OG.
 */

import * as React from "react";

export interface MotifProps {
  color: string;
  opacity?: number;
  strokeWidth?: number;
  /** Applied as-is to the outer <g>. Use for positioning and per-layer parallax. */
  transform?: string;
  /** For compositions that want a subtle accent fill on shapes that support it. */
  accentFill?: boolean;
}

const baseStroke = (p: MotifProps) => ({
  stroke: p.color,
  strokeWidth: p.strokeWidth ?? 1.2,
  strokeOpacity: p.opacity ?? 0.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none" as const,
});

/* Pillar is rendered inline inside ArcanaGlyph.tsx (see `pillar()`
 * helper there). Satori failed to emit this specific motif when
 * imported as a component — the inline helper sidesteps that.
 */

/* ─── Crown: triple-point diadem ─────────────────────────────── */
export function Crown({ ...p }: MotifProps) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      <path d="M 36 52 L 42 40 L 50 48 L 58 40 L 64 52 Z" {...s} />
      <line x1={36} y1={52} x2={64} y2={52} {...s} />
      <circle cx={42} cy={40} r={1.5} {...s} fill={p.color} fillOpacity={(p.opacity ?? 0.9) * 0.5} />
      <circle cx={50} cy={48} r={1.8} {...s} fill={p.color} fillOpacity={(p.opacity ?? 0.9) * 0.6} />
      <circle cx={58} cy={40} r={1.5} {...s} fill={p.color} fillOpacity={(p.opacity ?? 0.9) * 0.5} />
    </g>
  );
}

/* ─── Crescent: moon ─────────────────────────────────────────── */
export function Crescent({ ...p }: MotifProps) {
  const s = baseStroke(p);
  // Two cubic-bezier curves form the crescent. Outer curve bulges left
  // from top → bottom; inner curve arcs back less deeply to close.
  // Cubic beziers are Satori/resvg-safe; the prior arc form with
  // asymmetric rx/ry failed to render reliably in OG.
  return (
    <g transform={p.transform}>
      <path
        d="M 58 34 C 36 36, 36 64, 58 66 C 48 62, 48 38, 58 34 Z"
        {...s}
      />
    </g>
  );
}

/* ─── Sun: circle with radiating rays ────────────────────────── */
export function Sun({ rays = 8, r = 10, ...p }: MotifProps & { rays?: number; r?: number }) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      <circle cx={50} cy={50} r={r} {...s} />
      {Array.from({ length: rays }).map((_, i) => {
        const a = (Math.PI * 2 * i) / rays - Math.PI / 2;
        const inner = r + 3;
        const outer = r + 9;
        return (
          <line
            key={i}
            x1={50 + Math.cos(a) * inner}
            y1={50 + Math.sin(a) * inner}
            x2={50 + Math.cos(a) * outer}
            y2={50 + Math.sin(a) * outer}
            {...s}
          />
        );
      })}
    </g>
  );
}

/* ─── Star-8: eight-pointed star ─────────────────────────────── */
export function StarEight({ r = 16, ...p }: MotifProps & { r?: number }) {
  const s = baseStroke(p);
  const pts: [number, number][] = [];
  for (let i = 0; i < 16; i++) {
    const a = (Math.PI * 2 * i) / 16 - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.42;
    pts.push([50 + Math.cos(a) * rr, 50 + Math.sin(a) * rr]);
  }
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ") + " Z";
  return <path d={d} {...s} />;
}

/* ─── Pentagram: five-pointed star (optionally inverted) ─────── */
export function Pentagram({ r = 15, inverted = false, ...p }: MotifProps & { r?: number; inverted?: boolean }) {
  const s = baseStroke(p);
  const rot = inverted ? Math.PI / 2 : -Math.PI / 2;
  const pts = Array.from({ length: 5 }).map((_, i) => {
    const a = (Math.PI * 2 * i) / 5 + rot;
    return [50 + Math.cos(a) * r, 50 + Math.sin(a) * r] as [number, number];
  });
  // connect every 2nd vertex for the star
  const order = [0, 2, 4, 1, 3, 0];
  const d = order.map((idx, i) => `${i === 0 ? "M" : "L"} ${pts[idx][0]} ${pts[idx][1]}`).join(" ");
  return <path d={d} {...s} />;
}

/* ─── Infinity / Lemniscate ──────────────────────────────────── */
export function Infinity({ w = 20, h = 8, ...p }: MotifProps & { w?: number; h?: number }) {
  const s = baseStroke(p);
  const cx = 50;
  const cy = 50;
  const d = `M ${cx - w} ${cy} C ${cx - w} ${cy - h}, ${cx - w * 0.4} ${cy - h}, ${cx} ${cy} S ${cx + w} ${cy + h}, ${cx + w} ${cy} S ${cx + w * 0.4} ${cy + h}, ${cx} ${cy} S ${cx - w} ${cy - h}, ${cx - w} ${cy} Z`;
  return <path d={d} {...s} />;
}

/* ─── Scales: balance ────────────────────────────────────────── */
export function Scales({ ...p }: MotifProps) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      {/* central post */}
      <line x1={50} y1={32} x2={50} y2={66} {...s} />
      {/* beam */}
      <line x1={32} y1={38} x2={68} y2={38} {...s} />
      {/* pans */}
      <path d="M 26 44 L 38 44 L 34 50 Z" {...s} />
      <path d="M 62 44 L 74 44 L 70 50 Z" {...s} />
      {/* cords */}
      <line x1={32} y1={38} x2={32} y2={44} {...s} />
      <line x1={68} y1={38} x2={68} y2={44} {...s} />
      {/* base */}
      <line x1={44} y1={66} x2={56} y2={66} {...s} />
    </g>
  );
}

/* ─── Sword: vertical blade ──────────────────────────────────── */
export function Sword({ ...p }: MotifProps) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      {/* blade */}
      <path d="M 50 22 L 53 58 L 50 62 L 47 58 Z" {...s} />
      {/* guard */}
      <line x1={41} y1={60} x2={59} y2={60} {...s} />
      {/* grip */}
      <line x1={50} y1={62} x2={50} y2={72} {...s} />
      {/* pommel */}
      <circle cx={50} cy={74} r={2} {...s} fill={p.color} fillOpacity={(p.opacity ?? 0.9) * 0.4} />
    </g>
  );
}

/* ─── Chalice: cup ───────────────────────────────────────────── */
export function Chalice({ ...p }: MotifProps) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      {/* bowl */}
      <path d="M 40 40 Q 50 58 60 40" {...s} />
      {/* stem */}
      <line x1={50} y1={50} x2={50} y2={62} {...s} />
      {/* base */}
      <line x1={44} y1={64} x2={56} y2={64} {...s} />
      {/* rim accent */}
      <line x1={40} y1={40} x2={60} y2={40} {...s} />
    </g>
  );
}

/* ─── Wreath: circular laurel ring ───────────────────────────── */
export function Wreath({ r = 32, leaves = 16, ...p }: MotifProps & { r?: number; leaves?: number }) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      <circle cx={50} cy={50} r={r} {...s} strokeOpacity={(p.opacity ?? 0.9) * 0.5} />
      {Array.from({ length: leaves }).map((_, i) => {
        const a = (Math.PI * 2 * i) / leaves - Math.PI / 2;
        const x = 50 + Math.cos(a) * r;
        const y = 50 + Math.sin(a) * r;
        const nx = Math.cos(a + Math.PI / 2) * 2.2;
        const ny = Math.sin(a + Math.PI / 2) * 2.2;
        return (
          <path
            key={i}
            d={`M ${x - nx} ${y - ny} Q ${x + Math.cos(a) * 3} ${y + Math.sin(a) * 3} ${x + nx} ${y + ny}`}
            {...s}
          />
        );
      })}
    </g>
  );
}

/* ─── Wheel: spoked circle ───────────────────────────────────── */
export function Wheel({ r = 18, spokes = 8, ...p }: MotifProps & { r?: number; spokes?: number }) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      <circle cx={50} cy={50} r={r} {...s} />
      <circle cx={50} cy={50} r={r * 0.35} {...s} strokeOpacity={(p.opacity ?? 0.9) * 0.7} />
      {Array.from({ length: spokes }).map((_, i) => {
        const a = (Math.PI * 2 * i) / spokes;
        return (
          <line
            key={i}
            x1={50 + Math.cos(a) * r * 0.35}
            y1={50 + Math.sin(a) * r * 0.35}
            x2={50 + Math.cos(a) * r}
            y2={50 + Math.sin(a) * r}
            {...s}
          />
        );
      })}
    </g>
  );
}

/* ─── Figure: humanoid silhouette ────────────────────────────── */
export function Figure({
  pose = "standing",
  ...p
}: MotifProps & { pose?: "standing" | "hanging" | "hooded" | "walking" }) {
  const s = baseStroke(p);
  if (pose === "walking") {
    return (
      <g transform={p.transform}>
        <circle cx={50} cy={36} r={3.2} {...s} />
        <path d="M 50 39 L 50 56 M 50 44 L 44 50 M 50 44 L 58 48 M 50 56 L 44 66 M 50 56 L 56 66" {...s} />
      </g>
    );
  }
  if (pose === "hanging") {
    return (
      <g transform={p.transform}>
        <line x1={50} y1={32} x2={50} y2={38} {...s} />
        <circle cx={50} cy={41} r={3} {...s} />
        {/* torso hangs down */}
        <path d="M 50 44 L 50 58 M 50 50 L 45 54 M 50 50 L 55 54 M 50 58 L 50 64 M 50 64 L 56 60" {...s} />
      </g>
    );
  }
  if (pose === "hooded") {
    return (
      <g transform={p.transform}>
        <path d="M 44 42 Q 50 30 56 42 L 56 58 L 44 58 Z" {...s} />
        <line x1={50} y1={58} x2={50} y2={70} {...s} />
      </g>
    );
  }
  return (
    <g transform={p.transform}>
      <circle cx={50} cy={36} r={3.2} {...s} />
      <path d="M 50 39 L 50 58 M 50 46 L 44 52 M 50 46 L 56 52 M 50 58 L 46 70 M 50 58 L 54 70" {...s} />
    </g>
  );
}

/* ─── Wand: diagonal staff ───────────────────────────────────── */
export function Wand({ angle = -45, ...p }: MotifProps & { angle?: number }) {
  const s = baseStroke(p);
  return (
    <g transform={`${p.transform ?? ""} rotate(${angle} 50 50)`}>
      <line x1={36} y1={50} x2={64} y2={50} {...s} />
      <circle cx={64} cy={50} r={2} {...s} fill={p.color} fillOpacity={(p.opacity ?? 0.9) * 0.4} />
      <circle cx={36} cy={50} r={1.5} {...s} />
    </g>
  );
}

/* ─── Horizon line ───────────────────────────────────────────── */
export function Horizon({ y = 62, ...p }: MotifProps & { y?: number }) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      <path d={`M 18 ${y} Q 30 ${y - 2} 50 ${y} T 82 ${y}`} {...s} strokeOpacity={(p.opacity ?? 0.9) * 0.7} />
    </g>
  );
}

/* ─── Lightning bolt ─────────────────────────────────────────── */
export function Lightning({ ...p }: MotifProps) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      <path d="M 52 24 L 44 46 L 50 46 L 42 68 L 58 42 L 52 42 Z" {...s} />
    </g>
  );
}

/* ─── Orbit mote ─────────────────────────────────────────────── */
export function Mote({ r = 1.8, ...p }: MotifProps & { r?: number }) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      <circle cx={50} cy={50} r={r} {...s} fill={p.color} fillOpacity={(p.opacity ?? 0.9) * 0.7} />
    </g>
  );
}

/* ─── Throne-cube (solid geometric base) ─────────────────────── */
export function ThroneCube({ ...p }: MotifProps) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      {/* front face */}
      <rect x={38} y={50} width={24} height={20} {...s} />
      {/* top */}
      <path d="M 38 50 L 44 44 L 68 44 L 62 50" {...s} />
      {/* right side */}
      <path d="M 62 50 L 68 44 L 68 64 L 62 70" {...s} />
    </g>
  );
}

/* ─── Angel arc: upper curved line with small dot (sun/herald) ─ */
export function AngelArc({ y = 28, ...p }: MotifProps & { y?: number }) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      <path d={`M 26 ${y + 6} Q 50 ${y - 8} 74 ${y + 6}`} {...s} />
      <circle cx={50} cy={y - 2} r={3} {...s} />
      {/* rays shooting down */}
      {[-10, -5, 0, 5, 10].map((dx) => (
        <line key={dx} x1={50 + dx} y1={y + 2} x2={50 + dx * 0.5} y2={y + 14} {...s} strokeOpacity={(p.opacity ?? 0.9) * 0.5} />
      ))}
    </g>
  );
}

/* ─── Trumpet (Judgement) ────────────────────────────────────── */
export function Trumpet({ ...p }: MotifProps) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      <path d="M 28 42 L 60 42 L 68 38 L 68 50 L 60 46 L 28 46 Z" {...s} />
      <line x1={34} y1={42} x2={34} y2={46} {...s} strokeOpacity={(p.opacity ?? 0.9) * 0.6} />
      <line x1={42} y1={42} x2={42} y2={46} {...s} strokeOpacity={(p.opacity ?? 0.9) * 0.6} />
    </g>
  );
}

/* ─── Ripple arcs (water) ────────────────────────────────────── */
export function Ripples({ y = 70, count = 3, ...p }: MotifProps & { y?: number; count?: number }) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      {Array.from({ length: count }).map((_, i) => (
        <path
          key={i}
          d={`M ${28 + i * 3} ${y + i * 3} Q ${50} ${y + i * 3 - 3} ${72 - i * 3} ${y + i * 3}`}
          {...s}
          strokeOpacity={(p.opacity ?? 0.9) * (0.8 - i * 0.2)}
        />
      ))}
    </g>
  );
}

/* ─── Tower: cracked column + crown falling ──────────────────── */
export function Tower({ ...p }: MotifProps) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      <rect x={42} y={32} width={16} height={40} {...s} />
      {/* crenellations */}
      <path d="M 42 32 L 42 28 L 46 28 L 46 32 M 50 32 L 50 28 L 54 28 L 54 32 M 58 32 L 58 28 L 54 28" {...s} strokeOpacity={(p.opacity ?? 0.9) * 0.8} />
      {/* crack */}
      <path d="M 50 40 L 48 50 L 52 58 L 48 70" {...s} strokeOpacity={(p.opacity ?? 0.9) * 0.7} />
      {/* windows */}
      <rect x={47} y={45} width={3} height={4} {...s} strokeOpacity={(p.opacity ?? 0.9) * 0.6} />
      <rect x={51} y={55} width={3} height={4} {...s} strokeOpacity={(p.opacity ?? 0.9) * 0.6} />
    </g>
  );
}

/* ─── Small utility: diagonal path / ladder ──────────────────── */
export function Ladder({ rungs = 4, ...p }: MotifProps & { rungs?: number }) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      <line x1={42} y1={30} x2={42} y2={72} {...s} />
      <line x1={58} y1={30} x2={58} y2={72} {...s} />
      {Array.from({ length: rungs }).map((_, i) => {
        const y = 38 + i * ((72 - 38) / (rungs - 1 || 1));
        return <line key={i} x1={42} y1={y} x2={58} y2={y} {...s} strokeOpacity={(p.opacity ?? 0.9) * 0.8} />;
      })}
    </g>
  );
}

/* ─── Scythe: angled blade (Death) ───────────────────────────── */
export function Scythe({ ...p }: MotifProps) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      {/* staff */}
      <line x1={36} y1={74} x2={62} y2={26} {...s} />
      {/* curved blade */}
      <path d="M 62 26 Q 76 30 72 42" {...s} />
    </g>
  );
}

/* ─── Pouring arc: stream from chalice to chalice ────────────── */
export function PouringArc({ from, to, ...p }: MotifProps & { from: [number, number]; to: [number, number] }) {
  const s = baseStroke(p);
  const midX = (from[0] + to[0]) / 2;
  const midY = Math.min(from[1], to[1]) - 6;
  return (
    <g transform={p.transform}>
      <path d={`M ${from[0]} ${from[1]} Q ${midX} ${midY} ${to[0]} ${to[1]}`} {...s} />
    </g>
  );
}

/* ─── Chain link (Devil) ─────────────────────────────────────── */
export function Chains({ ...p }: MotifProps) {
  const s = baseStroke(p);
  return (
    <g transform={p.transform}>
      <ellipse cx={40} cy={66} rx={3} ry={2} {...s} />
      <ellipse cx={45} cy={68} rx={3} ry={2} {...s} />
      <ellipse cx={55} cy={68} rx={3} ry={2} {...s} />
      <ellipse cx={60} cy={66} rx={3} ry={2} {...s} />
    </g>
  );
}
