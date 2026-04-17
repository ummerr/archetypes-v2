"use client";

import { useEffect, useRef } from "react";
import { CLUSTER_CHIPS } from "@/lib/home-resonance";
import type { SystemId } from "@/data/resonance";

interface Props {
  focusCluster: string | null;
  focusSystem: SystemId | null;
  onHoverCluster: (id: string | null) => void;
}

export default function ClusterRibbon({ focusCluster, focusSystem, onHoverCluster }: Props) {
  const railRef = useRef<HTMLDivElement>(null);

  // Tap outside the rail clears the focused cluster on touch devices.
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      const target = e.target as Node | null;
      if (!railRef.current || !target) return;
      if (!railRef.current.contains(target)) onHoverCluster(null);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [onHoverCluster]);

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-6 mb-8 md:mb-10">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[9px] tracking-[0.35em] text-gold/80 uppercase">
          Shared Currents
        </span>
        <div className="h-px flex-1 bg-gold/15" />
      </div>

      {/* Mobile: horizontal scroll rail with edge fade */}
      <div className="md:hidden relative -mx-5 sm:-mx-6">
        <div
          ref={railRef}
          className="flex gap-2 overflow-x-auto px-5 sm:px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch" }}
          onScroll={() => {
            // no-op; hook point for future indicators
          }}
        >
          {CLUSTER_CHIPS.map((c) => {
            const isFocus = focusCluster === c.id;
            const matchesSystem = focusSystem ? c.systems.includes(focusSystem) : true;
            const dim = (focusCluster && !isFocus) || (focusSystem && !matchesSystem);
            return (
              <button
                key={c.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onHoverCluster(isFocus ? null : c.id);
                }}
                className="shrink-0 snap-start font-serif text-[15px] italic tracking-tight px-3.5 py-1.5 rounded-full border transition-all duration-300 whitespace-nowrap"
                style={{
                  color: isFocus ? "var(--color-gold)" : "var(--color-text-secondary)",
                  opacity: dim ? 0.4 : 1,
                  borderColor: isFocus
                    ? "var(--color-gold)"
                    : "color-mix(in srgb, var(--color-gold) 18%, transparent)",
                  background: isFocus
                    ? "color-mix(in srgb, var(--color-gold) 12%, transparent)"
                    : "transparent",
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        {/* Edge gradients */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[var(--color-bg)] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[var(--color-bg)] to-transparent"
        />
      </div>

      {/* Desktop: italic wrap */}
      <div
        className="hidden md:flex flex-wrap gap-x-5 gap-y-2"
        onMouseLeave={() => onHoverCluster(null)}
      >
        {CLUSTER_CHIPS.map((c) => {
          const isFocus = focusCluster === c.id;
          const matchesSystem = focusSystem ? c.systems.includes(focusSystem) : true;
          const dim = (focusCluster && !isFocus) || (focusSystem && !matchesSystem);
          return (
            <button
              key={c.id}
              type="button"
              onMouseEnter={() => onHoverCluster(c.id)}
              onFocus={() => onHoverCluster(c.id)}
              onBlur={() => onHoverCluster(null)}
              className="font-serif text-base md:text-lg italic tracking-tight transition-all duration-300"
              style={{
                color: isFocus ? "var(--color-gold)" : "var(--color-text-secondary)",
                opacity: dim ? 0.35 : 1,
                textShadow: isFocus ? "0 0 18px rgba(212,175,55,0.25)" : "none",
              }}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
