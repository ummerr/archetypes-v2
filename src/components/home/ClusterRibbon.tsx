"use client";

import { CLUSTER_CHIPS } from "@/lib/home-resonance";
import type { SystemId } from "@/data/resonance";

interface Props {
  focusCluster: string | null;
  focusSystem: SystemId | null;
  onHoverCluster: (id: string | null) => void;
}

export default function ClusterRibbon({ focusCluster, focusSystem, onHoverCluster }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-10">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[9px] tracking-[0.35em] text-gold/80 uppercase">
          Shared Currents
        </span>
        <div className="h-px flex-1 bg-gold/15" />
      </div>
      <div
        className="flex flex-wrap gap-x-5 gap-y-2"
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
