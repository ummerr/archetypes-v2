"use client";

import type { Archetype } from "@/types/archetype";

export default function ShadowTriangle({
  archetype,
}: {
  archetype: Archetype;
}) {
  const color = archetype.accentColor;

  return (
    <div className="relative w-full max-w-md mx-auto py-4">
      <svg
        viewBox="0 0 400 280"
        className="w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Triangle */}
        <path
          d="M200 40 L60 240 L340 240 Z"
          stroke={`${color}20`}
          strokeWidth="1"
          fill="none"
        />

        {/* Center dashed lines */}
        <line
          x1="200"
          y1="40"
          x2="60"
          y2="240"
          stroke={`${color}10`}
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <line
          x1="200"
          y1="40"
          x2="340"
          y2="240"
          stroke={`${color}10`}
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <line
          x1="60"
          y1="240"
          x2="340"
          y2="240"
          stroke={`${color}10`}
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {/* Apex — Fullness */}
        <circle cx="200" cy="40" r="4" fill={color} opacity="0.8" />
        <text
          x="200"
          y="22"
          textAnchor="middle"
          fill={color}
          fontSize="13"
          fontFamily="var(--font-serif)"
          fontWeight="500"
        >
          {archetype.name}
        </text>
        <text
          x="200"
          y="10"
          textAnchor="middle"
          fill={`${color}50`}
          fontSize="8"
          fontFamily="var(--font-sans)"
          letterSpacing="0.12em"
        >
          FULLNESS
        </text>

        {/* Left — Active Shadow */}
        <circle cx="60" cy="240" r="4" fill="#C0392B" opacity="0.6" />
        <text
          x="60"
          y="262"
          textAnchor="middle"
          fill="#E74C3C"
          fontSize="12"
          fontFamily="var(--font-serif)"
          fontWeight="500"
        >
          {archetype.activeShadow.name}
        </text>
        <text
          x="60"
          y="274"
          textAnchor="middle"
          fill="#C0392B"
          fontSize="7"
          fontFamily="var(--font-sans)"
          letterSpacing="0.12em"
          opacity="0.5"
        >
          ACTIVE SHADOW
        </text>

        {/* Right — Passive Shadow */}
        <circle cx="340" cy="240" r="4" fill="#5C5A52" opacity="0.5" />
        <text
          x="340"
          y="262"
          textAnchor="middle"
          fill="#B8B5AD"
          fontSize="12"
          fontFamily="var(--font-serif)"
          fontWeight="500"
          opacity="0.6"
        >
          {archetype.passiveShadow.name}
        </text>
        <text
          x="340"
          y="274"
          textAnchor="middle"
          fill="#5C5A52"
          fontSize="7"
          fontFamily="var(--font-sans)"
          letterSpacing="0.12em"
          opacity="0.4"
        >
          PASSIVE SHADOW
        </text>
      </svg>
    </div>
  );
}
