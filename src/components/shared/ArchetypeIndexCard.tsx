"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import type { IndexEntry } from "@/data/allArchetypes";
import ArchetypeCardVisual from "./ArchetypeCardVisual";

export default function ArchetypeIndexCard({
  entry,
  index,
}: {
  entry: IndexEntry;
  index: number;
}) {
  const { theme } = useTheme();
  const light = theme === "light";
  const [hovered, setHovered] = useState(false);
  const c = entry.accentColor;

  return (
    <Link
      href={entry.href}
      className="group block animate-slide-up h-full"
      style={{ animationDelay: `${Math.min(index * 18, 600)}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden rounded-sm transition-all duration-500 h-full p-5 flex flex-col"
        style={{
          background: `linear-gradient(145deg, ${c}${light ? "0D" : "05"} 0%, var(--color-bg) 65%)`,
          border: `1px solid ${
            hovered ? c + (light ? "55" : "35") : c + (light ? "22" : "12")
          }`,
          boxShadow: hovered
            ? light
              ? `0 4px 24px rgba(0,0,0,0.08)`
              : `0 0 28px ${c}18`
            : "none",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${c}60, transparent)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        <div className="flex items-center justify-between mb-3 gap-2">
          <span
            className="font-mono text-[8px] tracking-[0.3em] uppercase"
            style={{ color: `${c}${light ? "" : "CC"}`, opacity: light ? 0.85 : 1 }}
          >
            {entry.systemName}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.25em] uppercase text-muted/80">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: entry.innerGroup.color }}
              aria-hidden
            />
            {entry.innerGroup.label}
          </span>
        </div>

        <div className="flex items-start gap-4 mb-3">
          <div className="shrink-0 mt-0.5">
            <ArchetypeCardVisual entry={entry} hovered={hovered} />
          </div>
          <h3
            className="font-serif text-xl md:text-[1.4rem] font-medium tracking-tight leading-tight transition-all duration-300 flex-1"
            style={{
              color: light ? "var(--color-text-primary)" : c,
              textShadow: hovered && !light ? `0 0 16px ${c}40` : "none",
            }}
          >
            {entry.name}
          </h3>
        </div>

        {entry.motto && (
          <p className="font-serif italic text-[13px] md:text-sm text-text-secondary/85 leading-snug mt-auto">
            &ldquo;{entry.motto}&rdquo;
          </p>
        )}
      </div>
    </Link>
  );
}
