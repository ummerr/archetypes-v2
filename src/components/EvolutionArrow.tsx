"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Archetype } from "@/types/archetype";

interface Props {
  from: Archetype;
  to: Archetype;
}

function MiniCard({ archetype, side }: { archetype: Archetype; side: "from" | "to" }) {
  return (
    <Link
      href={`/archetype/${archetype.slug}`}
      className="group flex-1 w-full relative p-5 rounded-2xl border transition-all duration-300 hover:bg-surface-light/30"
      style={{
        borderColor: `${archetype.accentColor}20`,
        background: `linear-gradient(135deg, ${archetype.accentColor}06 0%, transparent 60%)`,
      }}
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
        {side === "from" ? "Boy Psychology" : "Man Psychology"}
      </p>
      <h4
        className="font-serif text-xl font-medium transition-colors"
        style={{ color: archetype.accentColor }}
      >
        {archetype.name}
      </h4>
      <p className="text-xs text-text-secondary mt-1 line-clamp-2">
        {archetype.description.split(".")[0]}.
      </p>
    </Link>
  );
}

export default function EvolutionArrow({ from, to }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
      <MiniCard archetype={from} side="from" />

      {/* Arrow connector */}
      <div className="shrink-0 flex flex-col items-center gap-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Desktop: horizontal */}
          <svg
            width="48"
            height="24"
            viewBox="0 0 48 24"
            className="hidden md:block"
          >
            <line
              x1="0" y1="12" x2="38" y2="12"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.4"
            />
            <polygon
              points="36,7 46,12 36,17"
              fill="#D4AF37"
              opacity="0.5"
            />
          </svg>
          {/* Mobile: vertical */}
          <svg
            width="24"
            height="48"
            viewBox="0 0 24 48"
            className="md:hidden"
          >
            <line
              x1="12" y1="0" x2="12" y2="38"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.4"
            />
            <polygon
              points="7,36 12,46 17,36"
              fill="#D4AF37"
              opacity="0.5"
            />
          </svg>
        </motion.div>
        <span className="text-[9px] uppercase tracking-[0.15em] text-muted">
          Initiation
        </span>
      </div>

      <MiniCard archetype={to} side="to" />
    </div>
  );
}
