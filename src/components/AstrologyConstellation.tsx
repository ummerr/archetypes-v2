/**
 * Astrology constellation — the 2D flattening of each sign's star-figure.
 * The z=0 projection of `AstrologyTotemCanvas`; both read the same asterism
 * primitive (`src/lib/zodiac-asterisms.ts`), so the mark is one vocabulary
 * across ambient, hero, and OG surfaces (DESIGN.md §9b/§9c).
 *
 * Stroke-primary per DESIGN.md §2: faint connecting lines, emissive star dots,
 * one accent color. Used at ambient sm scale and, via a Satori-safe twin in
 * `og-totems.tsx`, on share cards.
 */

import { asterismFor } from "@/lib/zodiac-asterisms";

interface Props {
  slug: string;
  color: string;
  size?: number;
}

const V = 32;
const PAD = 4;

function project(n: number): number {
  return PAD + n * (V - 2 * PAD);
}

export default function AstrologyConstellation({ slug, color, size = 32 }: Props) {
  const asterism = asterismFor(slug);
  if (!asterism) return null;

  const pts = asterism.points.map((s) => ({ ...s, px: project(s.x), py: project(s.y) }));

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${V} ${V}`}
      fill="none"
      role="img"
      aria-label={`${slug} constellation`}
    >
      {asterism.edges.map(([a, b], i) => (
        <line
          key={i}
          x1={pts[a].px}
          y1={pts[a].py}
          x2={pts[b].px}
          y2={pts[b].py}
          stroke={color}
          strokeWidth={0.85}
          strokeLinecap="round"
          opacity={0.4}
        />
      ))}
      {pts.map((s, i) => (
        <circle
          key={i}
          cx={s.px}
          cy={s.py}
          r={0.9 + s.m * 1.1}
          fill={color}
          opacity={0.55 + s.m * 0.4}
        />
      ))}
    </svg>
  );
}
