/**
 * Per-arcana compositional glyph. Each card draws on 2-4 motifs from
 * `arcanaMotifs.tsx`, layered back-to-front in a 100×100 viewBox. 2.5D
 * is earned by z-ordered layers + optional pointer parallax piped in
 * from the ceremonial TarotCard.
 *
 * `simple=true` disables filters and parallax (for Satori OG rendering).
 */

import * as React from "react";
import * as M from "./arcanaMotifs";

type Layer = {
  /** 0 (far back) → 1 (far front). Drives parallax offset and shadow depth. */
  z: number;
  opacity?: number;
  strokeWidth?: number;
  render: (p: { color: string; opacity: number; strokeWidth: number }) => React.ReactNode;
};

type Composition = Layer[];

/**
 * Local pillar rendering. Satori's OG path was unable to render this
 * specific shape combination when routed through an imported motif
 * component — an empty response would come back for cards using it.
 * Inlining the markup here resolves the issue and keeps Priestess /
 * Hierophant OG images rendering.
 */
function pillar(
  p: { color: string; opacity: number; strokeWidth: number },
  cx: number,
  mark = false,
): React.ReactNode {
  const { color, opacity, strokeWidth } = p;
  return (
    <g>
      <line
        x1={cx} y1={22} x2={cx} y2={78}
        stroke={color} strokeWidth={strokeWidth} strokeOpacity={opacity}
        strokeLinecap="round" fill="none"
      />
      <rect
        x={cx - 6} y={76} width={12} height={4}
        stroke={color} strokeWidth={strokeWidth} strokeOpacity={opacity}
        fill="none"
      />
      <rect
        x={cx - 6} y={18} width={12} height={4}
        stroke={color} strokeWidth={strokeWidth} strokeOpacity={opacity}
        fill="none"
      />
      {mark && (
        <circle
          cx={cx} cy={50} r={1.8}
          stroke={color} strokeWidth={strokeWidth} strokeOpacity={opacity}
          fill={color} fillOpacity={opacity * 0.6}
        />
      )}
    </g>
  );
}

function compose(slug: string): Composition {
  switch (slug) {
    case "the-fool":
      return [
        { z: 0.1, opacity: 0.5, render: (p) => <M.Horizon y={66} {...p} /> },
        { z: 0.3, opacity: 0.7, render: (p) => <M.Sun rays={10} r={7} {...p} transform="translate(20 -22)" /> },
        { z: 0.7, opacity: 0.95, render: (p) => <M.Figure pose="walking" {...p} transform="translate(-8 -2)" /> },
        { z: 0.9, opacity: 0.85, render: (p) => <M.Mote r={2} {...p} transform="translate(18 -18)" /> },
      ];

    case "the-magician":
      return [
        { z: 0.2, opacity: 0.55, render: (p) => <M.Wreath r={32} leaves={24} {...p} /> },
        { z: 0.5, opacity: 0.9, render: (p) => <M.Infinity w={18} h={6} {...p} transform="translate(0 -16)" /> },
        { z: 0.65, opacity: 0.85, render: (p) => <M.Wand angle={-30} {...p} transform="translate(-16 10)" /> },
        { z: 0.65, opacity: 0.85, render: (p) => <M.Chalice {...p} transform="translate(12 8) scale(0.55)" /> },
        { z: 0.65, opacity: 0.85, render: (p) => <M.Sword {...p} transform="translate(-14 10) scale(0.55)" /> },
        { z: 0.65, opacity: 0.85, render: (p) => <M.Pentagram r={6} {...p} transform="translate(16 12)" /> },
      ];

    case "the-high-priestess":
      return [
        { z: 0.15, opacity: 0.7, render: (p) => pillar(p, 36, true) },
        { z: 0.15, opacity: 0.7, render: (p) => pillar(p, 64, true) },
        { z: 0.6, opacity: 0.95, render: (p) => <M.Crescent {...p} transform="translate(-3 0) scale(0.85)" /> },
        { z: 0.85, opacity: 0.4, render: (p) => <M.Horizon y={76} {...p} /> },
      ];

    case "the-empress":
      return [
        { z: 0.15, opacity: 0.6, render: (p) => <M.Wreath r={34} leaves={20} {...p} /> },
        { z: 0.55, opacity: 0.9, render: (p) => (
          <g>
            <circle cx={50} cy={44} r={6} {...p} fill="none" />
            <line x1={50} y1={50} x2={50} y2={62} {...p} />
            <line x1={44} y1={56} x2={56} y2={56} {...p} />
          </g>
        ) },
        { z: 0.8, opacity: 0.7, render: (p) => (
          <g>
            <path d="M 30 70 Q 34 62 38 70" {...p} />
            <path d="M 62 70 Q 66 62 70 70" {...p} />
          </g>
        ) },
      ];

    case "the-emperor":
      return [
        { z: 0.2, opacity: 0.75, render: (p) => <M.ThroneCube {...p} /> },
        { z: 0.5, opacity: 0.95, render: (p) => (
          <g>
            <circle cx={50} cy={38} r={6} {...p} fill="none" />
            <path d="M 54 34 L 60 28" {...p} />
            <circle cx={61} cy={27} r={1.8} {...p} fill="none" />
          </g>
        ) },
        { z: 0.7, opacity: 0.8, render: (p) => <M.Crown {...p} transform="translate(0 -22) scale(0.75)" /> },
      ];

    case "the-hierophant":
      return [
        { z: 0.15, opacity: 0.6, render: (p) => pillar(p, 36) },
        { z: 0.15, opacity: 0.6, render: (p) => pillar(p, 64) },
        { z: 0.55, opacity: 0.9, render: (p) => <M.Crown {...p} transform="translate(0 -6)" /> },
        { z: 0.75, opacity: 0.85, render: (p) => (
          <g>
            {/* two crossed keys below the crown */}
            <line x1={42} y1={66} x2={52} y2={56} {...p} />
            <circle cx={40} cy={68} r={2.5} {...p} fill="none" />
            <line x1={58} y1={66} x2={48} y2={56} {...p} />
            <circle cx={60} cy={68} r={2.5} {...p} fill="none" />
          </g>
        ) },
      ];

    case "the-lovers":
      return [
        { z: 0.2, opacity: 0.7, render: (p) => <M.AngelArc y={28} {...p} /> },
        { z: 0.55, opacity: 0.9, render: (p) => <M.Figure pose="standing" {...p} transform="translate(-12 8) scale(0.75)" /> },
        { z: 0.55, opacity: 0.9, render: (p) => <M.Figure pose="standing" {...p} transform="translate(12 8) scale(0.75)" /> },
        { z: 0.85, opacity: 0.6, render: (p) => <M.Horizon y={76} {...p} /> },
      ];

    case "the-chariot":
      return [
        { z: 0.15, opacity: 0.55, render: (p) => (
          <g>
            {/* starry canopy */}
            <path d="M 28 32 Q 50 20 72 32" {...p} />
            <circle cx={36} cy={30} r={1.2} {...p} fill={p.color} fillOpacity={p.opacity * 0.6} />
            <circle cx={50} cy={24} r={1.5} {...p} fill={p.color} fillOpacity={p.opacity * 0.6} />
            <circle cx={64} cy={30} r={1.2} {...p} fill={p.color} fillOpacity={p.opacity * 0.6} />
          </g>
        ) },
        { z: 0.5, opacity: 0.9, render: (p) => (
          <g>
            {/* chariot body */}
            <rect x={32} y={46} width={36} height={18} {...p} />
            <line x1={36} y1={46} x2={36} y2={64} {...p} />
            <line x1={64} y1={46} x2={64} y2={64} {...p} />
          </g>
        ) },
        { z: 0.7, opacity: 0.85, render: (p) => (
          <g>
            <circle cx={36} cy={70} r={4} {...p} fill="none" />
            <circle cx={64} cy={70} r={4} {...p} fill="none" />
          </g>
        ) },
      ];

    case "strength":
      return [
        { z: 0.3, opacity: 0.75, render: (p) => <M.Infinity w={18} h={7} {...p} transform="translate(0 -14)" /> },
        { z: 0.6, opacity: 0.9, render: (p) => (
          <g>
            {/* lion outline */}
            <circle cx={50} cy={54} r={10} {...p} />
            {/* mane rays */}
            {Array.from({ length: 10 }).map((_, i) => {
              const a = (Math.PI * 2 * i) / 10 + Math.PI / 2;
              return (
                <line
                  key={i}
                  x1={50 + Math.cos(a) * 10}
                  y1={54 + Math.sin(a) * 10}
                  x2={50 + Math.cos(a) * 14}
                  y2={54 + Math.sin(a) * 14}
                  {...p}
                  strokeOpacity={p.opacity * 0.7}
                />
              );
            })}
            <circle cx={46} cy={52} r={0.8} {...p} fill={p.color} />
            <circle cx={54} cy={52} r={0.8} {...p} fill={p.color} />
          </g>
        ) },
      ];

    case "the-hermit":
      return [
        { z: 0.2, opacity: 0.55, render: (p) => (
          <g>
            {/* mountain peak backdrop */}
            <path d="M 22 74 L 40 52 L 50 64 L 62 50 L 78 74 Z" {...p} strokeOpacity={p.opacity * 0.6} />
          </g>
        ) },
        { z: 0.55, opacity: 0.9, render: (p) => <M.Figure pose="hooded" {...p} transform="translate(-4 0)" /> },
        { z: 0.8, opacity: 0.95, render: (p) => (
          <g transform="translate(10 4)">
            {/* lantern frame */}
            <path d="M 50 48 L 48 56 L 52 56 Z" {...p} />
            <rect x={46} y={56} width={8} height={6} {...p} />
            {/* star inside lantern */}
            <M.StarEight r={2.5} {...p} transform="translate(0 9)" />
          </g>
        ) },
      ];

    case "wheel-of-fortune":
      return [
        { z: 0.25, opacity: 0.55, render: (p) => (
          <g>
            {/* four corner creature glyphs */}
            <circle cx={22} cy={22} r={2} {...p} fill="none" />
            <circle cx={78} cy={22} r={2} {...p} fill="none" />
            <circle cx={22} cy={78} r={2} {...p} fill="none" />
            <circle cx={78} cy={78} r={2} {...p} fill="none" />
          </g>
        ) },
        { z: 0.55, opacity: 0.9, render: (p) => <M.Wheel r={22} spokes={8} {...p} /> },
      ];

    case "justice":
      return [
        { z: 0.3, opacity: 0.85, render: (p) => <M.Scales {...p} transform="translate(0 4)" /> },
        { z: 0.6, opacity: 0.9, render: (p) => <M.Sword {...p} transform="translate(0 -20) scale(0.55)" /> },
      ];

    case "the-hanged-man":
      return [
        { z: 0.2, opacity: 0.7, render: (p) => (
          <g>
            {/* T-frame gallows */}
            <line x1={32} y1={24} x2={68} y2={24} {...p} />
            <line x1={50} y1={24} x2={50} y2={30} {...p} />
          </g>
        ) },
        { z: 0.55, opacity: 0.9, render: (p) => <M.Figure pose="hanging" {...p} /> },
        { z: 0.8, opacity: 0.6, render: (p) => (
          <circle cx={50} cy={41} r={6} {...p} fill="none" strokeOpacity={p.opacity * 0.8} />
        ) },
      ];

    case "death":
      return [
        { z: 0.15, opacity: 0.55, render: (p) => <M.Horizon y={60} {...p} /> },
        { z: 0.35, opacity: 0.8, render: (p) => <M.Sun rays={8} r={4} {...p} transform="translate(-20 0)" /> },
        { z: 0.7, opacity: 0.9, render: (p) => <M.Scythe {...p} /> },
      ];

    case "temperance":
      return [
        { z: 0.25, opacity: 0.7, render: (p) => <M.AngelArc y={26} {...p} /> },
        { z: 0.55, opacity: 0.9, render: (p) => <M.Chalice {...p} transform="translate(-14 8) scale(0.75)" /> },
        { z: 0.55, opacity: 0.9, render: (p) => <M.Chalice {...p} transform="translate(14 8) scale(0.75)" /> },
        { z: 0.75, opacity: 0.95, render: (p) => <M.PouringArc from={[40, 48]} to={[60, 52]} {...p} /> },
      ];

    case "the-devil":
      return [
        { z: 0.25, opacity: 0.85, render: (p) => <M.Pentagram r={16} inverted {...p} transform="translate(0 -6)" /> },
        { z: 0.6, opacity: 0.75, render: (p) => <M.Chains {...p} /> },
        { z: 0.8, opacity: 0.6, render: (p) => (
          <g>
            {/* two small chained figures */}
            <circle cx={40} cy={74} r={1.5} {...p} fill={p.color} fillOpacity={p.opacity * 0.6} />
            <circle cx={60} cy={74} r={1.5} {...p} fill={p.color} fillOpacity={p.opacity * 0.6} />
          </g>
        ) },
      ];

    case "the-tower":
      return [
        { z: 0.3, opacity: 0.85, render: (p) => <M.Tower {...p} /> },
        { z: 0.65, opacity: 0.95, render: (p) => <M.Lightning {...p} transform="translate(-6 -14) scale(0.9)" /> },
        { z: 0.85, opacity: 0.6, render: (p) => (
          <g>
            {/* falling crown fragment */}
            <path d="M 36 22 L 40 18 L 44 22 Z" {...p} strokeOpacity={p.opacity * 0.7} />
          </g>
        ) },
      ];

    case "the-star":
      return [
        { z: 0.15, opacity: 0.7, render: (p) => <M.StarEight r={20} {...p} transform="translate(0 -8)" /> },
        { z: 0.55, opacity: 0.9, render: (p) => <M.Chalice {...p} transform="translate(-18 16) scale(0.55)" /> },
        { z: 0.55, opacity: 0.9, render: (p) => <M.Chalice {...p} transform="translate(18 16) scale(0.55)" /> },
        { z: 0.8, opacity: 0.7, render: (p) => <M.Ripples y={78} count={3} {...p} /> },
        { z: 0.95, opacity: 0.6, render: (p) => (
          <g>
            {/* smaller surrounding stars */}
            <M.StarEight r={3} {...p} transform="translate(-28 -14)" />
            <M.StarEight r={3} {...p} transform="translate(28 -14)" />
          </g>
        ) },
      ];

    case "the-moon":
      return [
        { z: 0.15, opacity: 0.55, render: (p) => (
          <g>
            {/* two towers in distance */}
            <rect x={24} y={46} width={6} height={20} {...p} strokeOpacity={p.opacity * 0.9} />
            <rect x={70} y={46} width={6} height={20} {...p} strokeOpacity={p.opacity * 0.9} />
          </g>
        ) },
        { z: 0.55, opacity: 0.95, render: (p) => <M.Crescent {...p} transform="translate(0 -14) scale(0.85)" /> },
        { z: 0.75, opacity: 0.7, render: (p) => (
          <g>
            {/* winding path */}
            <path d="M 50 80 Q 46 70 50 60 Q 54 52 50 44" {...p} strokeOpacity={p.opacity * 0.7} />
          </g>
        ) },
        { z: 0.9, opacity: 0.6, render: (p) => (
          <g>
            {/* pool hint */}
            <ellipse cx={50} cy={82} rx={10} ry={2} {...p} strokeOpacity={p.opacity * 0.7} />
          </g>
        ) },
      ];

    case "the-sun":
      return [
        { z: 0.2, opacity: 0.55, render: (p) => <M.Wreath r={34} leaves={24} {...p} /> },
        { z: 0.6, opacity: 0.95, render: (p) => <M.Sun rays={12} r={12} {...p} /> },
        { z: 0.85, opacity: 0.7, render: (p) => <M.Horizon y={78} {...p} /> },
      ];

    case "judgement":
      return [
        { z: 0.2, opacity: 0.6, render: (p) => (
          <g>
            {/* cloud arc above */}
            <path d="M 26 26 Q 38 18 50 22 Q 62 18 74 26" {...p} strokeOpacity={p.opacity * 0.7} />
          </g>
        ) },
        { z: 0.5, opacity: 0.9, render: (p) => <M.Trumpet {...p} transform="translate(0 -8) scale(0.85)" /> },
        { z: 0.75, opacity: 0.85, render: (p) => <M.Figure pose="standing" {...p} transform="translate(-12 14) scale(0.55)" /> },
        { z: 0.75, opacity: 0.85, render: (p) => <M.Figure pose="standing" {...p} transform="translate(12 14) scale(0.55)" /> },
      ];

    case "the-world":
      return [
        { z: 0.2, opacity: 0.7, render: (p) => <M.Wreath r={34} leaves={28} {...p} /> },
        { z: 0.55, opacity: 0.9, render: (p) => <M.Infinity w={16} h={6} {...p} /> },
        { z: 0.75, opacity: 0.7, render: (p) => (
          <g>
            {/* four corner glyphs: small squares */}
            <rect x={20} y={20} width={4} height={4} {...p} />
            <rect x={76} y={20} width={4} height={4} {...p} />
            <rect x={20} y={76} width={4} height={4} {...p} />
            <rect x={76} y={76} width={4} height={4} {...p} />
          </g>
        ) },
      ];
  }

  // Fallback: simple star + ring for any missing slug.
  return [
    { z: 0.3, opacity: 0.6, render: (p) => <circle cx={50} cy={50} r={28} {...p} fill="none" /> },
    { z: 0.7, opacity: 0.9, render: (p) => <M.StarEight r={14} {...p} /> },
  ];
}

export interface ArcanaGlyphProps {
  slug: string;
  color: string;
  size?: number;
  light?: boolean;
  /** Pointer parallax in pixels at z=1; layers offset proportional to their z. */
  parallax?: { x: number; y: number };
  /** Disables SVG filters (for Satori / OG). */
  simple?: boolean;
}

export default function ArcanaGlyph({
  slug,
  color,
  size = 100,
  light = false,
  parallax,
  simple = false,
}: ArcanaGlyphProps) {
  const layers = compose(slug);
  const filterId = `arc-shadow-${slug}`;
  const filterRef = !simple ? `url(#${filterId})` : undefined;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="overflow-visible"
      aria-hidden="true"
    >
      {!simple && (
        <defs>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.6" />
            <feOffset dx="0" dy="0.8" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope={light ? 0.22 : 0.45} />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      <g filter={filterRef}>
        {layers.map((layer, i) => {
          const dx = parallax ? parallax.x * layer.z * 3 : 0;
          const dy = parallax ? parallax.y * layer.z * 3 : 0;
          return (
            <g
              key={i}
              transform={parallax ? `translate(${dx} ${dy})` : undefined}
            >
              {layer.render({
                color,
                opacity: layer.opacity ?? 0.9,
                strokeWidth: layer.strokeWidth ?? 1.2,
              })}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
