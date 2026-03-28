"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FAMILIES } from "@/data/archetypes";
import { ArchetypeFamilyGroup } from "@/types/archetype";

const positions: Record<string, { x: string; y: string; lineAngle: number }> = {
  top:    { x: "50%", y: "8%",  lineAngle: 90 },
  left:   { x: "8%",  y: "50%", lineAngle: 0 },
  right:  { x: "92%", y: "50%", lineAngle: 180 },
  bottom: { x: "50%", y: "92%", lineAngle: 270 },
};

function FamilyNode({
  family,
  index,
}: {
  family: ArchetypeFamilyGroup;
  index: number;
}) {
  const pos = positions[family.position];

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: pos.x, top: pos.y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.7,
        delay: 0.3 + index * 0.12,
        ease: [0.19, 1, 0.22, 1],
      }}
    >
      <Link
        href={`/archetype/${family.man.slug}`}
        className="group relative block text-center"
      >
        {/* Ambient glow behind on hover */}
        <div
          className="absolute inset-0 -m-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
          style={{ backgroundColor: `${family.color}18` }}
        />

        {/* Main circle */}
        <div
          className="relative w-28 h-28 md:w-36 md:h-36 rounded-full border flex flex-col items-center justify-center transition-all duration-500 group-hover:scale-105"
          style={{
            borderColor: `${family.color}30`,
            background: `radial-gradient(circle at 50% 40%, ${family.color}12 0%, transparent 70%)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${family.color}70`;
            e.currentTarget.style.boxShadow = `0 0 40px ${family.color}20, inset 0 0 30px ${family.color}08`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${family.color}30`;
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted mb-1 transition-colors duration-300 group-hover:text-text-secondary">
            {family.boy.name.replace("The ", "")}
          </span>
          <span
            className="font-serif text-2xl md:text-3xl font-medium transition-all duration-300 group-hover:drop-shadow-[0_0_12px_var(--glow)]"
            style={
              {
                color: family.color,
                "--glow": `${family.color}60`,
              } as React.CSSProperties
            }
          >
            {family.label}
          </span>
          <span className="text-[10px] text-muted mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Explore
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function QuadrantMap() {
  return (
    <>
      {/* Desktop: radial layout */}
      <div className="hidden md:block relative w-full max-w-[640px] mx-auto aspect-square">
        {/* Connecting lines via SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Ambient center glow */}
          <circle cx="50" cy="50" r="25" fill="url(#centerGlow)" />
          {/* Cross lines */}
          <motion.line
            x1="50" y1="22" x2="50" y2="78"
            stroke="#D4AF37"
            strokeOpacity="0.12"
            strokeWidth="0.3"
            strokeDasharray="1.5 1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />
          <motion.line
            x1="22" y1="50" x2="78" y2="50"
            stroke="#D4AF37"
            strokeOpacity="0.12"
            strokeWidth="0.3"
            strokeDasharray="1.5 1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />
          {/* Subtle circle ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="#D4AF37"
            strokeOpacity="0.06"
            strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>

        {/* Center Self node */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="w-16 h-16 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center glow-gold">
            <span className="font-serif text-sm text-gold tracking-[0.15em]">
              Self
            </span>
          </div>
        </motion.div>

        {/* Family nodes */}
        {FAMILIES.map((family, i) => (
          <FamilyNode key={family.id} family={family} index={i} />
        ))}
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-3 px-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gold/25 bg-gold/5">
            <span className="font-serif text-xs text-gold tracking-[0.15em]">
              Self
            </span>
          </div>
        </motion.div>
        {FAMILIES.map((family, i) => (
          <motion.div
            key={family.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              href={`/archetype/${family.man.slug}`}
              className="group flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300"
              style={{
                borderColor: `${family.color}20`,
                background: `linear-gradient(135deg, ${family.color}06 0%, transparent 60%)`,
              }}
            >
              <div
                className="w-14 h-14 rounded-full border shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  borderColor: `${family.color}40`,
                  background: `radial-gradient(circle, ${family.color}15 0%, transparent 70%)`,
                }}
              >
                <span
                  className="font-serif text-lg font-medium"
                  style={{ color: family.color }}
                >
                  {family.label[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="font-serif text-xl font-medium"
                  style={{ color: family.color }}
                >
                  {family.label}
                </h3>
                <p className="text-xs text-muted mt-0.5 truncate">
                  {family.boy.name} &rarr; {family.man.name}
                </p>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="text-muted group-hover:text-text-secondary transition-colors shrink-0"
              >
                <path
                  d="M7 5L12 10L7 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}
