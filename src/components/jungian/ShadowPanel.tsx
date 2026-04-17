"use client";

import { JungianShadow } from "@/types/jungian";
import { useTheme } from "@/components/ThemeProvider";

interface Props {
  color: string;
  shadow: JungianShadow;
}

export default function ShadowPanel({ color, shadow }: Props) {
  const { theme } = useTheme();
  const light = theme === "light";

  return (
    <section className="mb-16">
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-label tracking-display uppercase text-muted">
          The Shadow
        </span>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(90deg, ${color}${light ? "40" : "28"}, transparent)`,
          }}
        />
      </div>

      <div
        className="rounded-sm p-7 md:p-9 relative"
        style={{
          background: light
            ? `linear-gradient(160deg, ${color}0E, #00000008 80%)`
            : `linear-gradient(160deg, ${color}12, #00000030 80%)`,
          border: `1px solid ${color}${light ? "2A" : "1A"}`,
          boxShadow: light ? "none" : `inset 0 1px 0 ${color}18`,
        }}
      >
        <p
          className="font-mono text-kicker tracking-display uppercase mb-2"
          style={{ color: color + "CC" }}
        >
          Shadow Face
        </p>
        <h3
          className="font-serif text-3xl md:text-4xl font-medium mb-5 leading-tight"
          style={{
            color,
            textShadow: !light ? `0 0 18px ${color}26` : "none",
          }}
        >
          {shadow.name}
        </h3>

        <p className="font-serif text-lg md:text-xl italic leading-relaxed text-text-primary/90 mb-7 max-w-2xl">
          {shadow.description}
        </p>

        <div className="mb-7">
          <p className="font-mono text-kicker tracking-kicker uppercase mb-3 text-muted">
            Signs
          </p>
          <ul className="space-y-2">
            {shadow.signs.map((s) => (
              <li key={s} className="flex items-start gap-3">
                <span
                  className="mt-2 block w-1 h-1 shrink-0"
                  style={{ background: color, transform: "rotate(45deg)" }}
                />
                <span className="text-text-secondary text-sm md:text-base leading-relaxed font-light">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="pt-5 border-t"
          style={{ borderColor: `${color}${light ? "22" : "14"}` }}
        >
          <p className="font-mono text-kicker tracking-kicker uppercase mb-2 text-gold/80">
            Integration
          </p>
          <p className="font-serif text-base md:text-lg italic leading-relaxed text-text-primary">
            {shadow.integration}
          </p>
        </div>
      </div>
    </section>
  );
}
