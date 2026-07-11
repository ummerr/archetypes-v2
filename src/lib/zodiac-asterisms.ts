/**
 * Zodiac asterisms — the shared primitive for the astrology dialect.
 *
 * Each sign is a stylized star-figure: a set of points in a normalized [0,1]
 * box plus the edges that connect them into the constellation's line-drawing.
 * This is the single source the 2D glyph (`AstrologyConstellation`), the 3D
 * totem (`AstrologyTotemCanvas`), and the Satori OG renderer all read from, so
 * the mark is one vocabulary across every surface (DESIGN.md §9b/§9c).
 *
 * The figures are evocative, not astrometrically exact — legibility at 22px
 * matters more than catalog fidelity. `depth` (0..1 per point) is used only by
 * the 3D totem to parallax the field; the 2D flattening ignores it.
 */

export interface StarPoint {
  x: number;
  y: number;
  /** relative brightness 0.5..1 — scales dot radius and glow */
  m: number;
  /** parallax depth 0 (near) .. 1 (far); flattened in 2D */
  depth?: number;
}

export interface Asterism {
  points: StarPoint[];
  /** index pairs into `points` */
  edges: [number, number][];
}

const p = (x: number, y: number, m = 0.8, depth = 0.5): StarPoint => ({ x, y, m, depth });

export const ZODIAC_ASTERISMS: Record<string, Asterism> = {
  // Aries — the ram's curved horn
  aries: {
    points: [p(0.18, 0.62, 0.7), p(0.4, 0.52, 1), p(0.62, 0.36, 0.85), p(0.78, 0.46, 0.7)],
    edges: [[0, 1], [1, 2], [2, 3]],
  },
  // Taurus — the face V with two horns
  taurus: {
    points: [p(0.42, 0.62, 1), p(0.26, 0.5, 0.8), p(0.56, 0.52, 0.85), p(0.1, 0.24, 0.7), p(0.82, 0.2, 0.75)],
    edges: [[0, 1], [0, 2], [1, 3], [2, 4]],
  },
  // Gemini — two parallel figures joined at the head
  gemini: {
    points: [p(0.35, 0.2, 0.9), p(0.33, 0.5, 0.7), p(0.3, 0.8, 0.85), p(0.63, 0.22, 0.9), p(0.6, 0.52, 0.7), p(0.57, 0.82, 0.85)],
    edges: [[0, 1], [1, 2], [3, 4], [4, 5], [0, 3]],
  },
  // Cancer — the inverted Y of the crab
  cancer: {
    points: [p(0.5, 0.22, 0.75), p(0.5, 0.5, 0.9), p(0.28, 0.76, 0.7), p(0.72, 0.72, 0.7)],
    edges: [[0, 1], [1, 2], [1, 3]],
  },
  // Leo — the sickle and the rump triangle
  leo: {
    points: [p(0.72, 0.24, 0.8), p(0.56, 0.2, 0.7), p(0.44, 0.3, 0.75), p(0.42, 0.46, 0.9), p(0.55, 0.56, 0.8), p(0.78, 0.7, 1), p(0.86, 0.56, 0.7)],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]],
  },
  // Virgo — the maiden's stem to Spica
  virgo: {
    points: [p(0.28, 0.3, 0.75), p(0.46, 0.44, 0.85), p(0.62, 0.38, 0.7), p(0.5, 0.62, 0.8), p(0.55, 0.82, 1)],
    edges: [[0, 1], [1, 2], [1, 3], [3, 4]],
  },
  // Libra — the beam and two pans
  libra: {
    points: [p(0.5, 0.24, 0.9), p(0.24, 0.4, 0.8), p(0.76, 0.4, 0.8), p(0.2, 0.66, 0.7), p(0.8, 0.66, 0.7)],
    edges: [[0, 1], [0, 2], [1, 3], [2, 4]],
  },
  // Scorpio — the hooked tail
  scorpio: {
    points: [p(0.18, 0.3, 0.8), p(0.32, 0.4, 0.7), p(0.46, 0.45, 0.85), p(0.6, 0.46, 0.7), p(0.73, 0.52, 0.8), p(0.8, 0.64, 0.9), p(0.7, 0.76, 1), p(0.56, 0.78, 0.7)],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
  },
  // Sagittarius — the teapot and the arrow
  sagittarius: {
    points: [p(0.34, 0.42, 0.8), p(0.54, 0.34, 0.85), p(0.68, 0.5, 0.75), p(0.6, 0.68, 0.8), p(0.4, 0.7, 0.7), p(0.3, 0.56, 0.7), p(0.86, 0.38, 0.9)],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [2, 6]],
  },
  // Capricorn — the sea-goat triangle
  capricorn: {
    points: [p(0.28, 0.4, 0.85), p(0.72, 0.34, 0.8), p(0.5, 0.74, 0.9)],
    edges: [[0, 1], [1, 2], [2, 0]],
  },
  // Aquarius — the poured water zigzag
  aquarius: {
    points: [p(0.18, 0.4, 0.8), p(0.36, 0.56, 0.75), p(0.52, 0.4, 0.85), p(0.68, 0.56, 0.75), p(0.84, 0.42, 0.8)],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  // Pisces — the two fishes joined by the cord
  pisces: {
    points: [p(0.18, 0.24, 0.8), p(0.4, 0.5, 0.9), p(0.6, 0.5, 0.9), p(0.82, 0.28, 0.8)],
    edges: [[0, 1], [1, 2], [2, 3]],
  },
};

export function asterismFor(slug: string): Asterism | undefined {
  return ZODIAC_ASTERISMS[slug];
}
