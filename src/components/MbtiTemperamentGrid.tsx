"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import {
  TEMPERAMENT_GROUPS,
  MBTI_BY_TEMPERAMENT,
} from "@/data/mbti/archetypes";
import { useTheme } from "@/components/ThemeProvider";
import CanvasSkeleton from "@/components/shared/CanvasSkeleton";

const MbtiTotemCanvas = dynamic(
  () => import("@/components/MbtiTotemCanvas"),
  { ssr: false, loading: () => <CanvasSkeleton /> },
);

export default function MbtiTemperamentGrid() {
  const { theme } = useTheme();
  const light = theme === "light";
  const [hovered, setHovered] = useState<string | null>(null);

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
                  className="font-mono text-label tracking-kicker uppercase"
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
                <span className="font-mono text-kicker tracking-kicker text-muted uppercase">
                  {group.tagline}
                </span>
              </div>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-2xl font-light">
                {group.ethos}
              </p>
            </div>

            {/* 4 members in a row */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {members.map((a, i) => {
                const isHovered = hovered === a.slug;
                return (
                  <Link
                    key={a.slug}
                    href={`/mbti/archetype/${a.slug}`}
                    onMouseEnter={() => setHovered(a.slug)}
                    onMouseLeave={() => setHovered(null)}
                    className="group relative block rounded-sm transition-all duration-500 animate-slide-up h-full"
                    style={{
                      animationDelay: `${300 + gIdx * 120 + i * 50}ms`,
                      background: `linear-gradient(145deg, ${color}${light ? "0C" : "06"} 0%, var(--color-bg) 55%)`,
                      border: `1px solid ${isHovered ? color + (light ? "40" : "30") : color + (light ? "20" : "10")}`,
                      boxShadow: isHovered
                        ? light
                          ? `0 4px 28px rgba(0,0,0,0.08)`
                          : `0 0 32px ${color}10`
                        : "none",
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${color}50, transparent)`,
                        opacity: isHovered ? 1 : 0,
                      }}
                    />

                    <div className="p-5 flex flex-col items-center text-center">
                      <div className="w-full h-32 -mt-1 mb-2" aria-hidden>
                        <MbtiTotemCanvas
                          archetype={a}
                          isHovered={isHovered}
                          size={128}
                        />
                      </div>

                      <p
                        className="font-mono text-label tracking-kicker uppercase"
                        style={{ color: color + (light ? "DD" : "CC") }}
                      >
                        {a.code}
                      </p>
                      <h3
                        className="mt-1 font-serif text-xl font-medium tracking-tight transition-all duration-300"
                        style={{
                          color: light ? "var(--color-text-primary)" : color,
                          textShadow:
                            isHovered && !light
                              ? `0 0 16px ${color}50`
                              : "none",
                        }}
                      >
                        {a.nickname}
                      </h3>
                      <p className="mt-2 text-text-secondary text-xs leading-relaxed font-light line-clamp-2">
                        {a.tagline}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
