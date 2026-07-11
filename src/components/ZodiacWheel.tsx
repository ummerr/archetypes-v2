"use client";

/**
 * The zodiac wheel — the ecliptic divided into twelve, Aries at the top,
 * running clockwise. Each sign is a segment tinted by its element; the four
 * element triplicities are drawn as their traditional equilateral trigons
 * (the three fire signs sit 120° apart, and so on). Hover a sign to read it in
 * the hub; click to open it. The grammar holds: stroke-primary, one accent per
 * sign, motion gated by reduced-motion.
 */

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ALL_ASTROLOGY, ZODIAC_ELEMENTS } from "@/data/astrology/archetypes";
import { useTheme } from "@/components/ThemeProvider";

const CX = 200;
const CY = 200;
const R_OUTER = 186;
const R_INNER = 126;
const R_GLYPH = 156;
const R_TRI = 118;

const signsByOrder = [...ALL_ASTROLOGY].sort((a, b) => a.order - b.order);
const elementColor = Object.fromEntries(ZODIAC_ELEMENTS.map((e) => [e.id, e.color]));

function polar(angleDeg: number, r: number): [number, number] {
  const a = (angleDeg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

// Aries centered at the top (-90°), running clockwise.
function centerAngle(i: number): number {
  return -90 + i * 30;
}

function segmentPath(i: number): string {
  const a0 = centerAngle(i) - 15;
  const a1 = centerAngle(i) + 15;
  const [ox0, oy0] = polar(a0, R_OUTER);
  const [ox1, oy1] = polar(a1, R_OUTER);
  const [ix1, iy1] = polar(a1, R_INNER);
  const [ix0, iy0] = polar(a0, R_INNER);
  return `M ${ox0} ${oy0} A ${R_OUTER} ${R_OUTER} 0 0 1 ${ox1} ${oy1} L ${ix1} ${iy1} A ${R_INNER} ${R_INNER} 0 0 0 ${ix0} ${iy0} Z`;
}

export default function ZodiacWheel({ size = 400 }: { size?: number }) {
  const router = useRouter();
  const { theme } = useTheme();
  const light = theme === "light";
  const reduced = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState<number | null>(null);

  const active = hovered != null ? signsByOrder[hovered] : null;

  // Faint decorative star ticks around the rim.
  const ticks = useMemo(
    () => Array.from({ length: 72 }, (_, k) => k * 5),
    [],
  );

  return (
    <div className="w-full flex justify-center" style={{ maxWidth: size }}>
      <svg
        viewBox="0 0 400 400"
        className="w-full h-auto"
        role="group"
        aria-label="The zodiac wheel — twelve signs"
      >
        {/* Rotating star rim */}
        <motion.g
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        >
          <circle cx={CX} cy={CY} r={194} fill="none" stroke={`${active?.accentColor ?? "#7C8CB0"}${light ? "22" : "18"}`} strokeWidth={1} />
          {ticks.map((deg, k) => {
            const [x, y] = polar(deg, 194);
            const major = k % 6 === 0;
            return <circle key={k} cx={x} cy={y} r={major ? 1.4 : 0.7} fill="#7C8CB0" opacity={major ? 0.55 : 0.28} />;
          })}
        </motion.g>

        {/* Element triplicity trigons — the three signs of each element, 120° apart */}
        <g opacity={light ? 0.5 : 0.42}>
          {ZODIAC_ELEMENTS.map((el) => {
            const idxs = signsByOrder
              .map((s, i) => ({ s, i }))
              .filter(({ s }) => s.element === el.id)
              .map(({ i }) => i);
            const pts = idxs.map((i) => polar(centerAngle(i), R_TRI));
            const dimmed = hovered != null && !idxs.includes(hovered);
            return (
              <polygon
                key={el.id}
                points={pts.map(([x, y]) => `${x},${y}`).join(" ")}
                fill="none"
                stroke={el.color}
                strokeWidth={1}
                opacity={dimmed ? 0.15 : 0.6}
                style={{ transition: "opacity 300ms" }}
              />
            );
          })}
        </g>

        {/* Sign segments */}
        {signsByOrder.map((sign, i) => {
          const isHover = hovered === i;
          const c = sign.accentColor;
          const elc = elementColor[sign.element] ?? c;
          const [gx, gy] = polar(centerAngle(i), R_GLYPH);
          return (
            <g
              key={sign.slug}
              role="link"
              tabIndex={0}
              aria-label={`${sign.name} — ${sign.dates}`}
              className="cursor-pointer outline-none"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              onClick={() => router.push(`/astrology/archetype/${sign.slug}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") router.push(`/astrology/archetype/${sign.slug}`);
              }}
            >
              <path
                d={segmentPath(i)}
                fill={isHover ? `${c}${light ? "26" : "22"}` : `${elc}${light ? "10" : "0A"}`}
                stroke={isHover ? c : `${elc}${light ? "44" : "33"}`}
                strokeWidth={isHover ? 1.4 : 0.9}
                style={{ transition: "fill 250ms, stroke 250ms" }}
              />
              <text
                x={gx}
                y={gy}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={isHover ? 22 : 19}
                fill={isHover ? c : light ? "#3A3A3A" : "#C8C8D0"}
                style={{
                  transition: "font-size 200ms, fill 250ms",
                  filter: isHover && !light ? `drop-shadow(0 0 6px ${c}90)` : "none",
                }}
              >
                {sign.glyph}
              </text>
            </g>
          );
        })}

        {/* Hub — reads the hovered sign, or the default title */}
        <circle cx={CX} cy={CY} r={R_INNER - 14} fill={light ? "#00000006" : "#FFFFFF04"} stroke={`${active?.accentColor ?? "#7C8CB0"}${light ? "22" : "18"}`} strokeWidth={1} />
        {active ? (
          <>
            <text x={CX} y={CY - 30} textAnchor="middle" fontSize={40} fill={active.accentColor} style={{ filter: light ? "none" : `drop-shadow(0 0 10px ${active.accentColor}80)` }}>
              {active.glyph}
            </text>
            <text x={CX} y={CY + 8} textAnchor="middle" className="font-serif" fontSize={22} fill={light ? "#1a1a1a" : "#EDEDEC"}>
              {active.name}
            </text>
            <text x={CX} y={CY + 30} textAnchor="middle" className="font-mono" fontSize={9} letterSpacing={1.5} fill={active.accentColor} opacity={0.9}>
              {active.element.toUpperCase()} · {active.modality.toUpperCase()}
            </text>
            <text x={CX} y={CY + 48} textAnchor="middle" className="font-mono" fontSize={8.5} letterSpacing={1} fill={light ? "#666" : "#8A8A8A"}>
              {active.dates}
            </text>
          </>
        ) : (
          <>
            <text x={CX} y={CY - 6} textAnchor="middle" className="font-serif" fontSize={20} fill={light ? "#1a1a1a" : "#EDEDEC"}>
              The Zodiac
            </text>
            <text x={CX} y={CY + 16} textAnchor="middle" className="font-mono" fontSize={8.5} letterSpacing={2} fill={light ? "#777" : "#8A8A8A"}>
              HOVER A SIGN
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
