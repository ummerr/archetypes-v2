"use client";

/**
 * All twelve signs' readings for the day, in one browsable field. Computed
 * client-side (UTC day) so it rotates daily without a redeploy; a mount guard
 * keeps first paint stable.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { ALL_ASTROLOGY } from "@/data/astrology/archetypes";
import { dailyReadingFor, formatDailyDate, type DailyReading } from "@/lib/astrology-daily";
import { useTheme } from "@/components/ThemeProvider";
import ZodiacGlyph from "@/components/ZodiacGlyph";

const signs = [...ALL_ASTROLOGY].sort((a, b) => a.order - b.order);

export default function AstrologyTodayGrid() {
  const { theme } = useTheme();
  const light = theme === "light";
  const [readings, setReadings] = useState<Record<string, DailyReading | null>>({});
  const [dateLabel, setDateLabel] = useState<string>("");

  useEffect(() => {
    const next: Record<string, DailyReading | null> = {};
    let label = "";
    for (const s of signs) {
      const r = dailyReadingFor(s.slug);
      next[s.slug] = r;
      if (r) label = r.dateLabel;
    }
    setReadings(next);
    setDateLabel(label);
  }, []);

  return (
    <div>
      <p className="font-mono text-kicker tracking-kicker text-muted uppercase mb-8 min-h-[14px]">
        {dateLabel ? formatDailyDate(dateLabel) : " "}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {signs.map((s, i) => {
          const r = readings[s.slug];
          const c = s.accentColor;
          return (
            <Link
              key={s.slug}
              href={`/astrology/archetype/${s.slug}`}
              className="group block rounded-sm p-5 transition-all duration-300 animate-slide-up"
              style={{
                background: `linear-gradient(150deg, ${c}${light ? "0E" : "08"}, transparent 70%)`,
                border: `1px solid ${c}${light ? "24" : "16"}`,
                animationDelay: `${i * 40}ms`,
                minHeight: 168,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <ZodiacGlyph slug={s.slug} color={c} size={22} strokeWidth={1.5} className="shrink-0" />
                <span
                  className="font-serif text-lg font-medium group-hover:underline decoration-1 underline-offset-4"
                  style={{ color: light ? "var(--color-text-primary)" : c }}
                >
                  {s.name}
                </span>
                <span className="font-mono text-kicker tracking-label text-muted/70 uppercase ml-auto">
                  {s.dates}
                </span>
              </div>
              {r ? (
                <>
                  <p className="font-serif italic text-body leading-relaxed text-text-primary mb-2.5">
                    {r.omen}
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed font-light">
                    {r.turn}
                  </p>
                </>
              ) : (
                <div aria-hidden className="space-y-2 mt-1">
                  <div className="h-4 rounded-sm w-11/12" style={{ background: `${c}12` }} />
                  <div className="h-3.5 rounded-sm w-full" style={{ background: `${c}0C` }} />
                  <div className="h-3.5 rounded-sm w-3/5" style={{ background: `${c}0C` }} />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
