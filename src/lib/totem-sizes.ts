/**
 * Canonical totem scale vocabulary. See DESIGN.md §3.
 *
 * These sizes carry an animation budget: smaller scales animate less.
 * Bespoke components (e.g. MbtiGlyph, which is calibrated at denser
 * pixels) document their own mappings in their header comments.
 */

export type TotemSize = "xs" | "sm" | "md" | "lg" | "hero";

export const TOTEM_PX: Record<TotemSize, number> = {
  xs: 22,
  sm: 40,
  md: 72,
  lg: 120,
  hero: 200,
};
