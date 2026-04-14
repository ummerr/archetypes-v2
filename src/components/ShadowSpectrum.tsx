"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

interface Props {
  activeName: string;
  passiveName: string;
  fullnessName: string;
  color: string;
}

export default function ShadowSpectrum({
  activeName,
  passiveName,
  fullnessName,
  color,
}: Props) {
  const [hoveredPole, setHoveredPole] = useState<
    "active" | "passive" | "fullness" | null
  >(null);
  const pendulumRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const light = theme === "light";

  /* Pendulum CSS animation driven by a shifting x% */
  useEffect(() => {
    if (!pendulumRef.current) return;
    const el = pendulumRef.current;
    let frame: number;
    let t = 0;

    function tick() {
      t += 0.008;
      // Asymmetric oscillation - spends more time at the extremes
      const raw = Math.sin(t * 0.7) * Math.cos(t * 0.3);
      const pct = 50 + raw * 46; // 4% – 96%
      el.style.left = `${pct}%`;

      // Opacity flare near edges
      const edgeness = Math.abs(raw);
      el.style.opacity = `${0.5 + edgeness * 0.5}`;

      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto py-6">
      {/* Labels */}
      <div className="flex justify-between items-end mb-3 px-1">
        <button
          className="text-left group"
          onMouseEnter={() => setHoveredPole("active")}
          onMouseLeave={() => setHoveredPole(null)}
        >
          <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-crimson-light/60 mb-0.5">
            Active
          </p>
          <p
            className="font-serif text-sm text-crimson-light transition-all duration-300"
            style={{
              textShadow:
                hoveredPole === "active" && !light
                  ? "0 0 16px rgba(231, 76, 60, 0.5)"
                  : "none",
            }}
          >
            {activeName}
          </p>
        </button>

        <button
          className="text-center group"
          onMouseEnter={() => setHoveredPole("fullness")}
          onMouseLeave={() => setHoveredPole(null)}
        >
          <p
            className="font-mono text-[8px] tracking-[0.2em] uppercase mb-0.5 transition-colors duration-300"
            style={{ color: `${color}99` }}
          >
            Fullness
          </p>
          <p
            className="font-serif text-sm transition-all duration-300"
            style={{
              color,
              textShadow:
                hoveredPole === "fullness" && !light
                  ? `0 0 16px ${color}80`
                  : "none",
            }}
          >
            {fullnessName}
          </p>
        </button>

        <button
          className="text-right group"
          onMouseEnter={() => setHoveredPole("passive")}
          onMouseLeave={() => setHoveredPole(null)}
        >
          <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-muted/60 mb-0.5">
            Passive
          </p>
          <p
            className="font-serif text-sm text-muted transition-all duration-300"
            style={{
              textShadow:
                hoveredPole === "passive" && !light
                  ? "0 0 16px rgba(138, 135, 128, 0.4)"
                  : "none",
            }}
          >
            {passiveName}
          </p>
        </button>
      </div>

      {/* Track */}
      <div className="relative h-[3px] rounded-full overflow-visible">
        {/* Background track */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, color-mix(in srgb, var(--color-crimson) 25%, transparent), ${color}40 50%, color-mix(in srgb, var(--color-muted) 25%, transparent))`,
          }}
        />

        {/* Center marker - fullness */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300"
          style={{
            background: color,
            boxShadow:
              hoveredPole === "fullness"
                ? `0 0 12px ${color}80, 0 0 24px ${color}40`
                : `0 0 6px ${color}30`,
          }}
        />

        {/* Pendulum dot */}
        <div
          ref={pendulumRef}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-crimson-light"
          style={{
            boxShadow: `0 0 8px var(--color-crimson-light), 0 0 20px color-mix(in srgb, var(--color-crimson) 30%, transparent)`,
          }}
        />

        {/* Edge markers */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-crimson/40" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-muted/40" />
      </div>

      {/* Oscillation insight */}
      <motion.p
        className="text-center font-mono text-[9px] tracking-[0.15em] uppercase mt-4 text-muted/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        The shadow oscillates &mdash; men bounce between poles
      </motion.p>
    </div>
  );
}
