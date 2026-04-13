"use client";

import Link from "next/link";
import {
  TEMPERAMENT_GROUPS,
  MBTI_BY_TEMPERAMENT,
} from "@/data/mbti/archetypes";
import { useTheme } from "@/components/ThemeProvider";
import MbtiGlyph from "@/components/MbtiGlyph";

export default function MbtiTemperamentGrid() {
  const { theme } = useTheme();
  const light = theme === "light";

  return (
    <div className="space-y-14">
      {TEMPERAMENT_GROUPS.map((group, gIdx) => {
        const members = MBTI_BY_TEMPERAMENT[group.id];
        const color = light ? group.secondary : group.primary;
        return (
          <section
            key={group.id}
            className="animate-slide-up"
            style={{ animationDelay: `${200 + gIdx * 120}ms` }}
          >
            {/* Row header */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-3 flex-wrap">
                <span
                  className="font-mono text-[10px] tracking-[0.35em] uppercase"
                  style={{ color }}
                >
                  {group.label} · {group.letters}
                </span>
                <div
                  className="h-px flex-1 min-w-[40px]"
                  style={{
                    background: `linear-gradient(90deg, ${color}${light ? "30" : "18"}, transparent)`,
                  }}
                />
                <span className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase">
                  {group.tagline}
                </span>
              </div>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-2xl font-light">
                {group.ethos}
              </p>
            </div>

            {/* 4 members in a row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {members.map((a, i) => (
                <Link
                  key={a.slug}
                  href={`/mbti/archetype/${a.slug}`}
                  className="group relative block rounded-sm transition-all duration-300 animate-slide-up"
                  style={{
                    animationDelay: `${300 + gIdx * 120 + i * 50}ms`,
                    background: `linear-gradient(160deg, ${color}${light ? "10" : "0A"}, transparent 70%)`,
                    border: `1px solid ${color}${light ? "28" : "18"}`,
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
                    }}
                  />

                  <div className="p-5 flex flex-col items-center text-center">
                    <MbtiGlyph archetype={a} size="md" interactive />

                    <p
                      className="mt-4 font-mono text-[10px] tracking-[0.35em] uppercase"
                      style={{ color: color + (light ? "DD" : "CC") }}
                    >
                      {a.code}
                    </p>
                    <h3
                      className="mt-1 font-serif text-xl font-medium tracking-tight"
                      style={{
                        color: light ? "var(--color-text-primary)" : color,
                      }}
                    >
                      {a.nickname}
                    </h3>
                    <p className="mt-2 text-text-secondary text-xs leading-relaxed font-light line-clamp-2">
                      {a.tagline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
