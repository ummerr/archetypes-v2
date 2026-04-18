"use client";

import Link from "next/link";
import { useState } from "react";
import { ALL_TAROT, TAROT_PHASES } from "@/data/tarot/archetypes";
import type { TarotArchetype } from "@/types/tarot";
import { useTheme } from "@/components/ThemeProvider";
import ArcanaGlyph from "@/components/tarot/ArcanaGlyph";

const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface Props {
  cards?: TarotArchetype[];
  activeSlug?: string;
  maxWidth?: number;
  height?: number;
  fanDeg?: number;
  arcRadius?: number;
  cardW?: number;
  cardH?: number;
  showLegend?: boolean;
  showHoverLabel?: boolean;
  strokeColor?: string;
  liftY?: number;
}

export default function TarotDeckArc({
  cards = ALL_TAROT,
  activeSlug,
  maxWidth = 980,
  height = 360,
  fanDeg = 54,
  arcRadius = 1300,
  cardW = 68,
  cardH = 108,
  showLegend = true,
  showHoverLabel = true,
  strokeColor,
  liftY = -24,
}: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const [hovered, setHovered] = useState<string | null>(null);

  const n = cards.length;
  const step = n > 1 ? fanDeg / (n - 1) : 0;
  const start = -fanDeg / 2;

  const phaseColor = (id: number) =>
    TAROT_PHASES.find((p) => p.ids.includes(id))?.color ?? "#D4AF37";

  // arc path sized to current viewBox
  const vbW = 980;
  const vbH = height;
  const baselineY = vbH - 30;
  const peakY = vbH * 0.44;
  const arcPath = `M 40 ${baselineY} Q ${vbW / 2} ${peakY} ${vbW - 40} ${baselineY}`;

  return (
    <div className="w-full">
      <div
        className="relative mx-auto"
        style={{ width: "100%", maxWidth, height, perspective: "1400px" }}
      >
        {/* ground arc */}
        <svg
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          width="100%"
          height={height}
          viewBox={`0 0 ${vbW} ${vbH}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="arcStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              {strokeColor ? (
                <>
                  <stop offset="0%" stopColor={strokeColor} stopOpacity="0" />
                  <stop offset="50%" stopColor={strokeColor} stopOpacity={light ? 0.5 : 0.4} />
                  <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor={TAROT_PHASES[0].color} stopOpacity="0" />
                  <stop offset="15%" stopColor={TAROT_PHASES[0].color} stopOpacity={light ? 0.55 : 0.4} />
                  <stop offset="38%" stopColor={TAROT_PHASES[0].color} stopOpacity={light ? 0.55 : 0.4} />
                  <stop offset="50%" stopColor={TAROT_PHASES[1].color} stopOpacity={light ? 0.55 : 0.4} />
                  <stop offset="68%" stopColor={TAROT_PHASES[1].color} stopOpacity={light ? 0.55 : 0.4} />
                  <stop offset="80%" stopColor={TAROT_PHASES[2].color} stopOpacity={light ? 0.55 : 0.4} />
                  <stop offset="100%" stopColor={TAROT_PHASES[2].color} stopOpacity="0" />
                </>
              )}
            </linearGradient>
          </defs>
          <path d={arcPath} fill="none" stroke="url(#arcStroke)" strokeWidth="1" />
        </svg>

        <div
          className="absolute"
          style={{
            left: "50%",
            bottom: 40,
            width: 0,
            height: 0,
            transformStyle: "preserve-3d",
          }}
        >
          {cards.map((card, i) => {
            const angle = start + step * i;
            const isActive = activeSlug === card.slug;
            const isHovered = hovered === card.slug || isActive;
            const color = phaseColor(card.id);
            const lift = isHovered ? liftY : 0;

            return (
              <Link
                key={card.slug}
                href={`/tarot/archetype/${card.slug}`}
                onMouseEnter={() => setHovered(card.slug)}
                onMouseLeave={() => setHovered(null)}
                aria-label={`${card.numeral} - ${card.name}`}
                className="group absolute block"
                style={{
                  width: cardW,
                  height: cardH,
                  left: -cardW / 2,
                  bottom: 0,
                  transformOrigin: `center ${arcRadius}px`,
                  transform: `rotate(${angle}deg) translateY(${lift}px)`,
                  transition:
                    "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), z-index 0ms",
                  zIndex: isActive ? 60 : isHovered ? 50 : i,
                  willChange: "transform",
                }}
              >
                <div
                  className="relative w-full h-full rounded-[3px] overflow-hidden"
                  style={{
                    background: light
                      ? `linear-gradient(165deg, #F8F5EE 0%, ${color}18 50%, #EAE7E0 100%)`
                      : `linear-gradient(165deg, #15151C 0%, ${color}22 50%, #08080C 100%)`,
                    border: `1px solid ${color}${light ? (isHovered ? "AA" : "55") : isHovered ? "90" : "40"}`,
                    boxShadow: isHovered
                      ? light
                        ? `0 14px 28px -10px ${color}90, 0 0 0 1px ${color}60`
                        : `0 14px 32px -8px #000, 0 0 24px ${color}70`
                      : light
                        ? `0 4px 10px -6px rgba(0,0,0,0.18)`
                        : `0 4px 10px -4px #000, 0 0 8px ${color}20`,
                    transition: "box-shadow 300ms ease, border-color 300ms ease",
                  }}
                >
                  <div
                    className="absolute inset-[3px] rounded-[2px] pointer-events-none"
                    style={{ border: `1px solid ${color}${light ? "55" : "30"}` }}
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-between px-1 py-2">
                    <span
                      className="font-mono text-kicker tracking-kicker uppercase"
                      style={{ color: color + (light ? "DD" : "CC") }}
                    >
                      {card.numeral}
                    </span>
                    <div
                      style={{
                        filter: !light
                          ? `drop-shadow(0 0 ${isHovered ? 6 : 3}px ${color}${isHovered ? "AA" : "70"})`
                          : `drop-shadow(0 1px 1px ${color}55)`,
                        transition: "filter 300ms ease",
                      }}
                      aria-hidden
                    >
                      <ArcanaGlyph
                        slug={card.slug}
                        color={color}
                        size={Math.round(cardH * 0.4)}
                        light={light}
                      />
                    </div>
                    <span
                      className="font-serif text-kicker tracking-tight leading-tight text-center px-0.5"
                      style={{ color: light ? "var(--color-text-primary)" : color }}
                    >
                      {card.name.replace(/^The /, "")}
                    </span>
                  </div>

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: GRAIN_SVG,
                      backgroundRepeat: "repeat",
                      backgroundSize: "256px 256px",
                      mixBlendMode: "overlay",
                      opacity: light ? 0.1 : 0.18,
                    }}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {showHoverLabel && (
          <div className="absolute top-0 left-0 right-0 text-center pointer-events-none h-10 flex items-center justify-center">
            {(() => {
              const slug = hovered ?? activeSlug;
              if (!slug) return null;
              const card = cards.find((c) => c.slug === slug);
              if (!card) return null;
              const color = phaseColor(card.id);
              return (
                <div className="animate-slide-up">
                  <p
                    className="font-mono text-kicker tracking-kicker uppercase mb-0.5"
                    style={{ color: color + "CC" }}
                  >
                    Arcanum {card.numeral}
                  </p>
                  <p
                    className="font-serif text-xl md:text-2xl font-medium tracking-tight"
                    style={{ color: light ? "var(--color-text-primary)" : color }}
                  >
                    {card.name}
                  </p>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {showLegend && (
        <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
          {TAROT_PHASES.map((phase) => (
            <div key={phase.id} className="flex items-center gap-2">
              <span
                className="w-6 h-px"
                style={{ background: phase.color }}
                aria-hidden
              />
              <span
                className="font-mono text-kicker tracking-kicker uppercase"
                style={{ color: phase.color + (light ? "EE" : "CC") }}
              >
                {phase.label}
              </span>
              <span className="font-mono text-kicker tracking-label text-muted/70 uppercase">
                {phase.range}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
