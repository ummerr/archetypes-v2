"use client";

/**
 * The daily reading — an anti-horoscope. It winks at the form (an "omen") and
 * then refuses to forecast, handing back a reflective "turn" instead. Computed
 * client-side from the viewer's UTC day so it genuinely rotates each day
 * without a redeploy; a mount guard keeps SSR and first paint in agreement.
 */

import { useEffect, useState } from "react";
import { dailyReadingFor, formatDailyDate, type DailyReading } from "@/lib/astrology-daily";
import { useTheme } from "@/components/ThemeProvider";
import ZodiacGlyph from "@/components/ZodiacGlyph";

interface Props {
  slug: string;
  color: string;
}

export default function AstrologyDailyCard({ slug, color }: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const [reading, setReading] = useState<DailyReading | null>(null);

  useEffect(() => {
    setReading(dailyReadingFor(slug));
  }, [slug]);

  return (
    <div
      className="rounded-sm p-6 md:p-7 relative overflow-hidden"
      style={{
        background: `linear-gradient(150deg, ${color}${light ? "12" : "0C"}, transparent 70%)`,
        border: `1px solid ${color}${light ? "2A" : "1C"}`,
        minHeight: 190,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}55, transparent)` }}
      />
      <div className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
        <span className="font-mono text-kicker tracking-kicker uppercase inline-flex items-center gap-1.5" style={{ color: color + "CC" }}>
          <ZodiacGlyph slug={slug} color={color} size={15} strokeWidth={1.5} /> Today&apos;s reading
        </span>
        <span className="font-mono text-kicker tracking-kicker text-muted uppercase">
          {reading ? formatDailyDate(reading.dateLabel) : " "}
        </span>
      </div>

      {reading ? (
        <>
          <p className="font-serif text-lg md:text-xl italic leading-relaxed text-text-primary mb-4">
            {reading.omen}
          </p>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed font-light">
            {reading.turn}
          </p>
        </>
      ) : (
        <div aria-hidden className="space-y-3">
          <div className="h-5 rounded-sm w-4/5" style={{ background: `${color}12` }} />
          <div className="h-4 rounded-sm w-full" style={{ background: `${color}0C` }} />
          <div className="h-4 rounded-sm w-2/3" style={{ background: `${color}0C` }} />
        </div>
      )}

      <p className="font-mono text-kicker tracking-label text-muted/70 uppercase mt-5">
        Not a forecast — the sky can&apos;t see your day. A mirror, turned each morning.
      </p>
    </div>
  );
}
