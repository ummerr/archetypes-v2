/**
 * The four motion primitives. See DESIGN.md §6.
 *
 * Each returns an object shaped `{ ...animated values, transition }` ready
 * to spread into a Framer Motion `animate` prop, e.g.
 *
 *     <motion.circle animate={animated ? breath(5) : undefined} />
 *
 * Bespoke one-offs (Tarot flip, 3D useFrame) are exempt, but still honor
 * breath rhythm and accent discipline.
 */

type Primitive = {
  readonly transition: {
    readonly duration: number;
    readonly ease: "linear" | "easeInOut";
    readonly repeat: typeof Infinity;
    readonly delay?: number;
  };
};

export const spin = (
  duration = 14,
  delay = 0,
): Primitive & { rotate: number } => ({
  rotate: 360,
  transition: { duration, ease: "linear", repeat: Infinity, delay },
});

export const breath = (
  duration = 4,
  delay = 0,
): Primitive & { scale: number[] } => ({
  scale: [1, 1.05, 1],
  transition: { duration, ease: "easeInOut", repeat: Infinity, delay },
});

export const pulse = (
  duration = 2.2,
  delay = 0,
): Primitive & { opacity: number[] } => ({
  opacity: [0.55, 1, 0.55],
  transition: { duration, ease: "easeInOut", repeat: Infinity, delay },
});

export const shimmer = (
  duration = 3,
  delay = 0,
): Primitive & { pathLength: number[]; opacity: number[] } => ({
  pathLength: [0, 1, 1],
  opacity: [0, 1, 0.5],
  transition: { duration, ease: "easeInOut", repeat: Infinity, delay },
});
