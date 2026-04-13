"use client";

import Link from "next/link";
import { JungianArchetype } from "@/types/jungian";
import { useTheme } from "@/components/ThemeProvider";

interface Props {
  opposite: JungianArchetype;
  fromColor: string;
}

export default function OppositeCard({ opposite, fromColor }: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const toColor = opposite.accentColor;

  return (
    <section className="mb-16">
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-muted">
          The Opposite · Your Blind Spot
        </span>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(90deg, ${fromColor}${light ? "30" : "18"}, ${toColor}${light ? "30" : "18"}, transparent)`,
          }}
        />
      </div>

      <Link
        href={`/jungian/archetype/${opposite.slug}`}
        className="group block rounded-sm p-6 md:p-7 transition-all duration-300"
        style={{
          background: light
            ? `linear-gradient(110deg, ${fromColor}08, ${toColor}14)`
            : `linear-gradient(110deg, ${fromColor}06, ${toColor}10)`,
          border: `1px solid ${toColor}${light ? "2E" : "1C"}`,
        }}
      >
        <div className="flex items-start gap-5">
          <span
            className="font-serif text-5xl md:text-6xl leading-none shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
            style={{
              color: toColor,
              textShadow: !light ? `0 0 18px ${toColor}30` : "none",
            }}
            aria-hidden
          >
            {opposite.symbol}
          </span>
          <div className="flex-1 min-w-0">
            <p
              className="font-mono text-[9px] tracking-[0.4em] uppercase mb-1"
              style={{ color: toColor + "CC" }}
            >
              Complement
            </p>
            <h3
              className="font-serif text-2xl md:text-3xl font-medium mb-2 leading-tight"
              style={{ color: toColor }}
            >
              {opposite.name}
            </h3>
            <p className="font-serif italic text-base md:text-lg text-text-secondary/90 mb-3">
              &ldquo;{opposite.motto}&rdquo;
            </p>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed font-light max-w-2xl">
              What this archetype keeps hidden, the{" "}
              <span style={{ color: toColor }}>{opposite.name}</span> lives
              openly. Each teaches the other what it cannot teach itself.
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
}
