"use client";

/**
 * Enneagram silhouettes — the 2D z=0 projection of each type's 3D totem
 * in `EnneagramTotemCanvas.tsx`. Locked vocabulary per DESIGN.md §9b: every
 * primitive here corresponds to a primitive in the 3D canvas.
 *
 * Used at ambient sm scale on `/archetypes`. Stroke-primacy per DESIGN.md §2.
 */

import type { EnneagramArchetype } from "@/types/enneagram";

type Slug = EnneagramArchetype["slug"];

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

export default function EnneagramSilhouette({ slug, color, size = 32 }: Props) {
  const accentFill = `${color}22`;
  const emissive = color;
  const common = svgProps(size, color, `${slug} totem`);

  switch (slug) {
    /* 1 reformer: plumb line + level ring with end dots */
    case "reformer":
      return (
        <svg {...common}>
          <line x1="16" y1="5" x2="16" y2="26" opacity="0.85" />
          <path d="M13.8 5.5 L18.2 5.5 L16 8 Z" fill={accentFill} />
          <path d="M16 22 L19 26 L16 30 L13 26 Z" fill={emissive} opacity="0.7" stroke="none" />
          <line x1="5.5" y1="17" x2="26.5" y2="17" opacity="0.55" />
          <circle cx="5.5" cy="17" r="1.1" fill={emissive} stroke="none" />
          <circle cx="26.5" cy="17" r="1.1" fill={emissive} stroke="none" />
        </svg>
      );

    /* 2 helper: cupped hands (two arcs meeting) + heart + 5 petals above */
    case "helper":
      return (
        <svg {...common}>
          <path d="M5 17 Q9 26 16 23" opacity="0.8" />
          <path d="M27 17 Q23 26 16 23" opacity="0.8" />
          <path d="M16 14 C14 11 11 12.5 12.5 15.5 C13.6 17.5 16 19.5 16 19.5 C16 19.5 18.4 17.5 19.5 15.5 C21 12.5 18 11 16 14 Z" fill={emissive} opacity="0.7" stroke="none" />
          {[0, 1, 2, 3, 4].map((i) => {
            const a = Math.PI + (i / 4) * Math.PI;
            const x = 16 + Math.cos(a) * 8;
            const y = 9 + Math.sin(a) * 2.2;
            return <circle key={i} cx={x} cy={y} r="0.9" fill={emissive} stroke="none" />;
          })}
        </svg>
      );

    /* 3 achiever: trophy prism (octahedron) + pedestal + apex star */
    case "achiever":
      return (
        <svg {...common}>
          <path d="M16 9 L22 16 L16 23 L10 16 Z" fill={accentFill} />
          <path d="M10 16 L22 16" opacity="0.55" />
          <path d="M11 23 L21 23 L22 26 L10 26 Z" fill={accentFill} />
          <path d="M16 3 L17.3 6 L20.2 6 L17.8 7.9 L18.8 11 L16 9.2 L13.2 11 L14.2 7.9 L11.8 6 L14.7 6 Z" fill={emissive} opacity="0.8" stroke="none" />
          <ellipse cx="16" cy="8" rx="7" ry="1.3" opacity="0.4" />
        </svg>
      );

    /* 4 individualist: two halves of a gem split vertically + inner glow + mote */
    case "individualist":
      return (
        <svg {...common}>
          <path d="M14.5 6 L9 16 L14.5 26 L15 26 L15 6 Z" fill={accentFill} />
          <path d="M17.5 6 L23 16 L17.5 26 L17 26 L17 6 Z" fill={accentFill} />
          <circle cx="16" cy="16" r="2.2" fill={emissive} opacity="0.75" stroke="none" />
          <circle cx="21" cy="21" r="1.1" fill={emissive} stroke="none" />
        </svg>
      );

    /* 5 investigator: three orbital rings + recessed eye + inner glow */
    case "investigator":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="11" opacity="0.7" />
          <ellipse cx="16" cy="16" rx="11" ry="4.2" opacity="0.5" />
          <ellipse cx="16" cy="16" rx="4.2" ry="11" opacity="0.4" />
          <circle cx="16" cy="16" r="2.6" fill="#000" opacity="0.35" stroke="none" />
          <circle cx="16" cy="16" r="1.5" fill={emissive} stroke="none" />
        </svg>
      );

    /* 6 loyalist: diamond lattice + cross + 2 sentinels */
    case "loyalist":
      return (
        <svg {...common}>
          <path d="M16 5 L27 16 L16 27 L5 16 Z" fill={accentFill} />
          <line x1="16" y1="5" x2="16" y2="27" opacity="0.55" />
          <line x1="5" y1="16" x2="27" y2="16" opacity="0.55" />
          <circle cx="16" cy="16" r="1.8" fill={emissive} stroke="none" />
          <circle cx="28" cy="16" r="1.1" fill={emissive} stroke="none" />
          <circle cx="4" cy="16" r="1.1" fill={emissive} stroke="none" />
        </svg>
      );

    /* 7 enthusiast: scattering polyhedra around a central glow */
    case "enthusiast":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="2.4" fill={emissive} opacity="0.85" stroke="none" />
          {/* tetrahedra */}
          <path d="M6 9 L9 10 L7 12 Z" fill={accentFill} />
          <path d="M23 6 L26 8 L24 10 Z" fill={accentFill} />
          <path d="M25 22 L27 24 L24 25 Z" fill={accentFill} />
          {/* octahedra (diamonds) */}
          <path d="M24 14 L26 16 L24 18 L22 16 Z" fill={accentFill} />
          <path d="M7 20 L9 22 L7 24 L5 22 Z" fill={accentFill} />
          {/* cubes */}
          <rect x="9.5" y="4.5" width="3" height="3" fill={accentFill} />
          <rect x="13.5" y="25" width="3" height="3" fill={accentFill} />
          <rect x="19" y="24.5" width="3" height="3" fill={accentFill} />
        </svg>
      );

    /* 8 challenger: monolith box + forward-pointing wedge + 2 shoulders */
    case "challenger":
      return (
        <svg {...common}>
          <rect x="9" y="9" width="14" height="16" fill={accentFill} />
          <line x1="9" y1="9" x2="23" y2="9" opacity="0.7" />
          <path d="M9 9 L11 6 L25 6 L23 9" opacity="0.55" />
          <path d="M23 9 L25 6 L25 22 L23 25" opacity="0.55" />
          <path d="M16 14 L24 18 L16 22 Z" fill={emissive} opacity="0.7" stroke="none" />
          <path d="M10 7 L11.2 5.2 L12.4 7 L11.2 8.8 Z" fill={emissive} opacity="0.8" stroke="none" />
          <path d="M22 7 L23.2 5.2 L24.4 7 L23.2 8.8 Z" fill={emissive} opacity="0.8" stroke="none" />
        </svg>
      );

    /* 9 peacemaker: four concentric calm rings + still center */
    case "peacemaker":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="12.5" opacity="0.4" />
          <circle cx="16" cy="16" r="9" opacity="0.55" />
          <circle cx="16" cy="16" r="5.5" opacity="0.7" />
          <circle cx="16" cy="16" r="2.2" fill={emissive} opacity="0.85" stroke="none" />
        </svg>
      );

    default:
      return null;
  }
}
