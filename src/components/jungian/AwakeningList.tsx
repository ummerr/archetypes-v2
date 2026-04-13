"use client";

import { JungianAwakening } from "@/types/jungian";
import { useTheme } from "@/components/ThemeProvider";

interface Props {
  color: string;
  awakening: JungianAwakening;
  archetypeName: string;
}

export default function AwakeningList({
  color,
  awakening,
  archetypeName,
}: Props) {
  const { theme } = useTheme();
  const light = theme === "light";

  return (
    <section className="mb-16">
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-muted">
          The Awakening
        </span>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(90deg, ${color}${light ? "30" : "18"}, transparent)`,
          }}
        />
      </div>

      <p className="font-serif text-base md:text-lg italic text-text-secondary/90 leading-relaxed mb-5 max-w-2xl">
        {archetypeName} is called by life. These are the moments when the
        archetype stirs and asks to be lived.
      </p>

      <ul className="space-y-2.5 mb-5">
        {awakening.circumstances.map((c) => (
          <li key={c} className="flex items-start gap-3">
            <span
              className="mt-[9px] block h-px w-4 shrink-0"
              style={{ background: color }}
              aria-hidden
            />
            <span className="text-text-secondary text-sm md:text-base leading-relaxed font-light">
              {c}
            </span>
          </li>
        ))}
      </ul>

      {awakening.ageOrStage ? (
        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: color + "AA" }}
        >
          Typical stage · {awakening.ageOrStage}
        </p>
      ) : null}
    </section>
  );
}
