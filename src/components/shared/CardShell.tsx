"use client";

/**
 * Frame + field shell for archetype index cards. See DESIGN.md §4.
 *
 * Three layers: frame (border, meta header, footer tag row),
 * field (accent-driven gradient), and a token slot.
 *
 * The shell owns hover state and passes it down via a render prop,
 * so downstream totems can react to hover without the caller threading
 * the flag themselves.
 *
 * Ceremonial cards (TarotCard, OppositeCard) deliberately do NOT compose
 * through this shell — they have their own special shapes.
 */

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

type Hoverable = (hovered: boolean) => ReactNode;

export interface CardShellProps {
  href: string;
  accentColor: string;
  index: number;
  metaLeft: ReactNode;
  metaRight: ReactNode;
  token: Hoverable;
  title: Hoverable;
  subtitle?: ReactNode;
  footer: ReactNode;
  footerAriaLabel: string;
}

export default function CardShell({
  href,
  accentColor: c,
  index,
  metaLeft,
  metaRight,
  token,
  title,
  subtitle,
  footer,
  footerAriaLabel,
}: CardShellProps) {
  const { theme } = useTheme();
  const light = theme === "light";
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="group block animate-slide-up h-full"
      style={{ animationDelay: `${Math.min(index * 18, 600)}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden rounded-sm transition-all duration-500 h-full p-5 flex flex-col"
        style={{
          background: `linear-gradient(145deg, ${c}${light ? "0D" : "05"} 0%, var(--color-bg) 65%)`,
          border: `1px solid ${
            hovered ? c + (light ? "55" : "35") : c + (light ? "22" : "12")
          }`,
          boxShadow: hovered
            ? light
              ? `0 4px 24px rgba(0,0,0,0.08)`
              : `0 0 28px ${c}18`
            : "none",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${c}60, transparent)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        <div className="flex items-center justify-between mb-3 gap-2">
          {metaLeft}
          {metaRight}
        </div>

        <div className="flex items-start gap-4 mb-3">
          <div className="shrink-0 mt-0.5">{token(hovered)}</div>
          {title(hovered)}
        </div>

        {subtitle}

        <div className="mt-auto pt-3 flex items-center gap-1.5" aria-label={footerAriaLabel}>
          {footer}
        </div>
      </div>
    </Link>
  );
}
