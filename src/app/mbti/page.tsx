"use client";

import { useTheme } from "@/components/ThemeProvider";
import MbtiTemperamentGrid from "@/components/MbtiTemperamentGrid";
import MbtiDichotomies from "@/components/MbtiDichotomies";

export default function MbtiHome() {
  const { theme } = useTheme();
  const light = theme === "light";

  return (
    <div className="min-h-screen relative">
      {/* Hero */}
      <div className="px-6 pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="animate-slide-up">
            <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-4">
              Myers-Briggs · Sixteen Cognitive Patterns
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-text-primary tracking-tight leading-[1.05] mb-5">
              Cognitive{" "}
              <span
                className={
                  light
                    ? "text-text-primary"
                    : "text-gold glow-text-subtle animate-flicker"
                }
              >
                Geometry
              </span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl font-light">
              Each type is a stack - four Jungian cognitive functions arranged
              in a fixed hierarchy from the automatic <em>Hero</em> to the
              aspirational <em>Inferior</em>. The sixteen four-letter codes are
              only the surface. Underneath is a precise architecture of how
              perception and judgment are ordered in the psyche. Each glyph
              below is drawn from that architecture: the dominant function sets
              the central form; the auxiliary layers beneath it; temperament
              chooses the palette.
            </p>
          </div>
        </div>
      </div>

      {/* Four Dichotomies - what the letters mean */}
      <div className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 animate-slide-up" style={{ animationDelay: "120ms" }}>
            <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-3">
              The four cuts
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-text-primary tracking-tight">
              What the letters mean
            </h2>
            <p className="mt-4 text-text-secondary text-sm md:text-base leading-relaxed max-w-2xl font-light">
              Every type code is a stack of four choices - four poles, four
              opposites. None is a deficit; each pair names a real division in
              how minds organize the world.
            </p>
          </div>
          <MbtiDichotomies />
        </div>
      </div>

      {/* Temperament grid - the 4×4 signature */}
      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <MbtiTemperamentGrid />
        </div>
      </div>
    </div>
  );
}
