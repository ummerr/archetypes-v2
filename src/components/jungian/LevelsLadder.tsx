"use client";

import { JungianLevels } from "@/types/jungian";
import { useTheme } from "@/components/ThemeProvider";

interface Props {
  color: string;
  levels: JungianLevels;
}

export default function LevelsLadder({ color, levels }: Props) {
  const { theme } = useTheme();
  const light = theme === "light";

  const rungs = [
    { label: "Shadow", body: levels.shadow, intensity: 0.2 },
    { label: "Call", body: levels.call, intensity: 0.55 },
    { label: "Expression", body: levels.expression, intensity: 1 },
  ];

  return (
    <section className="mb-16">
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-muted">
          Levels of Expression
        </span>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(90deg, ${color}${light ? "30" : "18"}, transparent)`,
          }}
        />
      </div>

      <div className="relative">
        <div
          className="absolute left-[11px] top-3 bottom-3 w-px"
          style={{
            background: `linear-gradient(to bottom, ${color}00, ${color}${light ? "40" : "30"}, ${color}${light ? "80" : "60"})`,
          }}
          aria-hidden
        />

        <div className="space-y-5">
          {rungs.map((r) => {
            const hex = Math.round(r.intensity * 255)
              .toString(16)
              .padStart(2, "0");
            return (
              <div key={r.label} className="relative pl-10">
                <span
                  className="absolute left-0 top-[10px] w-[22px] h-[22px] rounded-full flex items-center justify-center"
                  style={{
                    border: `1px solid ${color}${hex}`,
                    background: light ? "#00000004" : "#00000040",
                  }}
                  aria-hidden
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: color,
                      opacity: r.intensity,
                      boxShadow: !light
                        ? `0 0 ${r.intensity * 10}px ${color}`
                        : "none",
                    }}
                  />
                </span>
                <p
                  className="font-mono text-[9px] tracking-[0.4em] uppercase mb-1.5"
                  style={{ color: color + hex }}
                >
                  {r.label}
                </p>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed font-light">
                  {r.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
