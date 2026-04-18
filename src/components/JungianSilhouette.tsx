"use client";

/**
 * Jungian silhouettes — the 2D z=0 projection of each archetype's 3D totem
 * in `JungianTotemCanvas.tsx`. Locked vocabulary per DESIGN.md §9b: every
 * primitive here corresponds to a primitive in the 3D canvas.
 *
 * Used at ambient sm scale on `/archetypes`, where mounting 12 WebGL contexts
 * is not viable. Stroke-primacy per DESIGN.md §2: outlines are the mass,
 * fills are radial accents. Breath is applied by the parent wrapper.
 */

import type { JungianArchetype } from "@/types/jungian";

type Slug = JungianArchetype["slug"];

interface Props {
  slug: Slug;
  color: string;
  size?: number;
}

const V = 32;

function svgProps(size: number, color: string, label: string) {
  return {
    width: size,
    height: size,
    viewBox: `0 0 ${V} ${V}`,
    fill: "none",
    stroke: color,
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    role: "img" as const,
    "aria-label": label,
  };
}

export default function JungianSilhouette({ slug, color, size = 32 }: Props) {
  const accentFill = `${color}22`;
  const softFill = `${color}14`;
  const emissive = `${color}`;
  const common = svgProps(size, color, `${slug} totem`);

  switch (slug) {
    /* sprout: two cotyledon leaves cradling a seed + curved stem */
    case "innocent":
      return (
        <svg {...common}>
          <path d="M16 27 Q16 22 16 15" />
          <path d="M16 14 Q8.5 14 9.5 22 Q14 20 16 14 Z" fill={accentFill} />
          <path d="M16 14 Q23.5 14 22.5 22 Q18 20 16 14 Z" fill={accentFill} />
          <circle cx="16" cy="11" r="2.4" fill={emissive} opacity="0.55" />
        </svg>
      );

    /* ring of twelve on a disk (3/4 view → ellipse + 12 dots) */
    case "everyman": {
      const cx = 16, cy = 17, rx = 11, ry = 3.2;
      return (
        <svg {...common}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} opacity="0.6" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x = cx + Math.cos(a) * rx;
            const y = cy + Math.sin(a) * ry;
            return <circle key={i} cx={x} cy={y} r="1.1" fill={emissive} stroke="none" />;
          })}
        </svg>
      );
    }

    /* upright spear (tall diamond) + laurel arcs flanking */
    case "hero":
      return (
        <svg {...common}>
          <path d="M16 4 L18.6 16 L16 28 L13.4 16 Z" fill={accentFill} />
          <path d="M11 22 Q7 18 10.5 14" />
          <path d="M21 22 Q25 18 21.5 14" />
          <circle cx="9.8" cy="15.5" r="0.9" fill={emissive} stroke="none" />
          <circle cx="22.2" cy="15.5" r="0.9" fill={emissive} stroke="none" />
        </svg>
      );

    /* cupping bowl (inverted dome) + heart + 6 petals */
    case "caregiver":
      return (
        <svg {...common}>
          <path d="M5.5 13 Q16 26 26.5 13" fill={accentFill} />
          <path d="M16 13.5 C14 11 11.5 13 13 15.5 C14.2 17.2 16 18.5 16 18.5 C16 18.5 17.8 17.2 19 15.5 C20.5 13 18 11 16 13.5 Z" fill={emissive} opacity="0.6" stroke="none" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = Math.PI + (i / 5) * Math.PI;
            const x = 16 + Math.cos(a) * 10.5;
            const y = 13 + Math.sin(a) * 2.8;
            return <circle key={i} cx={x} cy={y} r="0.9" fill={emissive} stroke="none" />;
          })}
        </svg>
      );

    /* compass: outer ring + inner ring + N/S needle + 3 waypoints */
    case "explorer":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="11" opacity="0.75" />
          <circle cx="16" cy="16" r="6.5" opacity="0.45" />
          <path d="M16 5 L18 16 L16 16 Z" fill={emissive} stroke="none" opacity="0.8" />
          <path d="M16 27 L14 16 L16 16 Z" fill={accentFill} stroke="none" />
          <line x1="16" y1="5" x2="16" y2="27" opacity="0.7" />
          <circle cx="5" cy="16" r="1.1" fill={emissive} stroke="none" />
          <circle cx="27" cy="16" r="1.1" fill={emissive} stroke="none" />
          <circle cx="16" cy="16" r="1.3" fill={emissive} stroke="none" />
        </svg>
      );

    /* fracturing cube: 8 shards + X cross */
    case "rebel":
      return (
        <svg {...common}>
          <line x1="6" y1="6" x2="26" y2="26" opacity="0.85" />
          <line x1="26" y1="6" x2="6" y2="26" opacity="0.85" />
          {[
            [10, 7],
            [22, 7],
            [6, 14],
            [26, 14],
            [6, 18],
            [26, 18],
            [10, 25],
            [22, 25],
          ].map(([x, y], i) => (
            <path
              key={i}
              d={`M${x} ${y} L${x + 2.2} ${y - 1.4} L${x + 1.2} ${y + 1.8} Z`}
              fill={accentFill}
            />
          ))}
        </svg>
      );

    /* Hopf link: two interlocked rings + heart at intersection */
    case "lover":
      return (
        <svg {...common}>
          <circle cx="11" cy="16" r="7.5" opacity="0.8" />
          <circle cx="21" cy="16" r="7.5" opacity="0.8" />
          <path d="M16 13.8 C14.4 11.6 11.8 13.4 12.8 15.6 C13.7 17.3 16 19 16 19 C16 19 18.3 17.3 19.2 15.6 C20.2 13.4 17.6 11.6 16 13.8 Z" fill={emissive} opacity="0.7" stroke="none" />
        </svg>
      );

    /* dodecahedron wireframe silhouette: pentagon outer + inner star + vertex sparks */
    case "creator": {
      const cx = 16, cy = 16, r = 11;
      const pent = Array.from({ length: 5 }).map((_, i) => {
        const a = -Math.PI / 2 + (i / 5) * Math.PI * 2;
        return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const;
      });
      const innerPent = Array.from({ length: 5 }).map((_, i) => {
        const a = -Math.PI / 2 + Math.PI / 5 + (i / 5) * Math.PI * 2;
        return [cx + Math.cos(a) * 4.8, cy + Math.sin(a) * 4.8] as const;
      });
      return (
        <svg {...common}>
          <path d={`M${pent.map((p) => p.join(" ")).join(" L")} Z`} fill={softFill} />
          <path d={`M${innerPent.map((p) => p.join(" ")).join(" L")} Z`} fill={accentFill} />
          {pent.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.1" fill={emissive} stroke="none" />
          ))}
        </svg>
      );
    }

    /* jester: central diamond + 3 juggling forms on lemniscate */
    case "jester":
      return (
        <svg {...common}>
          <path d="M4 16 C4 11 12 11 16 16 C20 21 28 21 28 16 C28 11 20 11 16 16 C12 21 4 21 4 16 Z" opacity="0.55" />
          <path d="M16 12 L19 16 L16 20 L13 16 Z" fill={accentFill} />
          <path d="M5.2 16 L7.2 14 L9.2 16 L7.2 18 Z" fill={emissive} opacity="0.8" stroke="none" />
          <rect x="22.2" y="14" width="3.6" height="3.6" fill={emissive} opacity="0.7" stroke="none" />
          <circle cx="24" cy="16" r="1.2" fill="none" />
        </svg>
      );

    /* sage: three orthogonal rings (astrolabe) + center dot */
    case "sage":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="11" opacity="0.7" />
          <ellipse cx="16" cy="16" rx="11" ry="4" opacity="0.55" />
          <ellipse cx="16" cy="16" rx="4" ry="11" opacity="0.45" />
          <circle cx="16" cy="16" r="1.7" fill={emissive} stroke="none" />
        </svg>
      );

    /* magician: seed of life (center + 6 petals) + filament cross */
    case "magician": {
      const cx = 16, cy = 16, r = 5;
      return (
        <svg {...common}>
          <circle cx={cx} cy={cy} r={r} opacity="0.7" />
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={cx + Math.cos(a) * r}
                cy={cy + Math.sin(a) * r}
                r={r}
                opacity="0.4"
              />
            );
          })}
          <circle cx={cx} cy={cy} r="1.6" fill={emissive} stroke="none" />
        </svg>
      );
    }

    /* ruler: throne — trapezoid base + 4 pillars + sovereignty band + apex jewel */
    case "ruler":
      return (
        <svg {...common}>
          <path d="M7 24 L10 20 L22 20 L25 24 Z" fill={softFill} />
          <line x1="11" y1="20" x2="11" y2="10" />
          <line x1="15" y1="20" x2="15" y2="10" />
          <line x1="17" y1="20" x2="17" y2="10" />
          <line x1="21" y1="20" x2="21" y2="10" />
          <ellipse cx="16" cy="10" rx="6.5" ry="1.8" opacity="0.75" />
          <path d="M16 3 L19 7 L16 9 L13 7 Z" fill={accentFill} />
        </svg>
      );

    default:
      return null;
  }
}
