/**
 * Bespoke zodiac glyphs — the astrology system's identifier vocabulary, drawn
 * as stroke marks in the site's grammar rather than borrowed from a system
 * font's Unicode symbols. One shared primitive: the wheel, the sign cards, the
 * detail hero, the atlas mark, and the OG cards all render through it, so the
 * glyph is congruent on every surface (DESIGN.md §9c).
 *
 * Pure component (no hooks) so it renders in Satori/OG as well as the client.
 * Stroke-primary; a single accent color; 24×24 canvas.
 */

import type { ReactNode } from "react";

// Each glyph is an array of stroke elements (not a Fragment) so it renders in
// both React DOM and Satori/OG, which cannot serialize Fragment symbols.
const PATHS: Record<string, ReactNode[]> = {
  // Aries — the ram's horns springing from a stem
  aries: [
    <path key="a" d="M12 21 V11" />,
    <path key="b" d="M12 11.5 C10.8 5.6 6.7 4.6 5.8 8.3 C5.4 10.1 6.7 10.8 7.9 9.8" />,
    <path key="c" d="M12 11.5 C13.2 5.6 17.3 4.6 18.2 8.3 C18.6 10.1 17.3 10.8 16.1 9.8" />,
  ],
  // Taurus — the bull: circle beneath upward horns
  taurus: [
    <circle key="a" cx="12" cy="15.4" r="4.4" />,
    <path key="b" d="M6.6 9.2 Q12 13.6 17.4 9.2" />,
  ],
  // Gemini — the twins, two columns clasped top and bottom
  gemini: [
    <path key="a" d="M8 5.8 V18.2" />,
    <path key="b" d="M16 5.8 V18.2" />,
    <path key="c" d="M5.4 6.8 Q12 3.4 18.6 6.8" />,
    <path key="d" d="M5.4 17.2 Q12 20.6 18.6 17.2" />,
  ],
  // Cancer — the two curled claws (the sideways 69)
  cancer: [
    <path key="a" d="M4.8 10.6 C5.4 6.7 11.8 6.2 12.9 10" />,
    <circle key="b" cx="14.7" cy="10.4" r="2.1" />,
    <path key="c" d="M19.2 13.4 C18.6 17.3 12.2 17.8 11.1 14" />,
    <circle key="d" cx="9.3" cy="13.6" r="2.1" />,
  ],
  // Leo — the mane and the sweeping tail
  leo: [
    <circle key="a" cx="8.3" cy="15.2" r="3" />,
    <path key="b" d="M10.7 13.6 C12.6 9.4 8.9 5 12 5 C16 5 17.2 10.2 15 14.2 C14 16 15.9 17.6 17.6 16.4" />,
  ],
  // Virgo — the maiden's M, third stroke curling closed
  virgo: [
    <path key="a" d="M4.8 18 V8.4 C4.8 6.4 7.8 6.4 7.8 8.4 V15.5" />,
    <path key="b" d="M7.8 8.4 C7.8 6.4 10.8 6.4 10.8 8.4 V15.5" />,
    <path key="c" d="M10.8 8.4 C10.8 6.4 13.8 6.4 13.8 8.4 V13.5 C13.8 16.8 17.4 16.4 17.4 12.8 C17.4 10.6 15.2 10.2 14 12" />,
  ],
  // Libra — the sun cresting the horizon (the scales at rest)
  libra: [
    <path key="a" d="M4.8 17.6 H19.2" />,
    <path key="b" d="M5.6 13.6 H8.6 A4 4 0 0 1 15.4 13.6 H18.4" />,
  ],
  // Scorpio — the M with the stinger's barb
  scorpio: [
    <path key="a" d="M4.8 17 V8.4 C4.8 6.4 7.8 6.4 7.8 8.4 V15.5" />,
    <path key="b" d="M7.8 8.4 C7.8 6.4 10.8 6.4 10.8 8.4 V15.5" />,
    <path key="c" d="M10.8 8.4 C10.8 6.4 13.8 6.4 13.8 8.4 V16.4 L18.4 16.4" />,
    <path key="d" d="M15.8 14 L18.8 16.6 L15.9 19" />,
  ],
  // Sagittarius — the arrow and its crossbar
  sagittarius: [
    <path key="a" d="M6 18 L17.2 6.8" />,
    <path key="b" d="M17.2 6.8 L11.9 6.8 M17.2 6.8 L17.2 12.1" />,
    <path key="c" d="M9 11 L13 15" />,
  ],
  // Capricorn — the sea-goat: horn into fish-tail loop
  capricorn: [
    <path key="a" d="M4.8 8 C4.8 12.4 8.2 13.2 9 8.8 C9.3 6.6 10.7 6.6 11.4 8.8 L12.9 15" />,
    <path key="b" d="M12.9 15 C13.5 17.4 16.8 17.2 17.2 14 C17.5 11.4 14.9 10.6 13.7 13" />,
  ],
  // Aquarius — the water-bearer's two currents
  aquarius: [
    <path key="a" d="M4.6 11 L7.6 8.8 L10.6 11 L13.6 8.8 L16.6 11 L19.4 8.9" />,
    <path key="b" d="M4.6 15.2 L7.6 13 L10.6 15.2 L13.6 13 L16.6 15.2 L19.4 13.1" />,
  ],
  // Pisces — the two fishes bound by the cord
  pisces: [
    <path key="a" d="M6.4 5 C2.8 8 2.8 16 6.4 19" />,
    <path key="b" d="M17.6 5 C21.2 8 21.2 16 17.6 19" />,
    <path key="c" d="M4.6 12 H19.4" />,
  ],
};

interface Props {
  slug: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  title?: string;
}

export default function ZodiacGlyph({
  slug,
  color = "currentColor",
  size = 24,
  strokeWidth = 1.6,
  className,
  title,
}: Props) {
  const content = PATHS[slug];
  if (!content) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
    >
      {content}
    </svg>
  );
}
