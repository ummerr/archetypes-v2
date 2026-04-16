"use client";

import { useEffect, useState } from "react";
import { useFrame, type RenderCallback } from "@react-three/fiber";

/**
 * Subscribes to `prefers-reduced-motion: reduce`. Use anywhere there's
 * a JS-driven motion loop that isn't a Framer Motion `animate` prop.
 *
 * See DESIGN.md §7.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Drop-in replacement for `useFrame` that short-circuits when the user
 * has asked for reduced motion. Totems freeze in their initial pose —
 * which is a fine default — instead of spinning.
 */
export function useMotionFrame(callback: RenderCallback, renderPriority?: number) {
  const reduced = usePrefersReducedMotion();
  useFrame((state, delta, frame) => {
    if (reduced) return;
    callback(state, delta, frame);
  }, renderPriority);
}
