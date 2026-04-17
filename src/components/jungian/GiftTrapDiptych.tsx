"use client";

import { useTheme } from "@/components/ThemeProvider";

interface Props {
  color: string;
  gift: string;
  trap: string;
}

export default function GiftTrapDiptych({ color, gift, trap }: Props) {
  const { theme } = useTheme();
  const light = theme === "light";

  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-5">
        <span className="font-mono text-label tracking-kicker text-gold/80 uppercase">
          Gift & Trap
        </span>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(90deg, ${color}${light ? "30" : "18"}, transparent)`,
          }}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div
          className="rounded-sm p-6 relative overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${color}${light ? "14" : "0A"}, transparent)`,
            border: `1px solid ${color}${light ? "2E" : "1C"}`,
          }}
        >
          <p
            className="font-mono text-kicker tracking-display uppercase mb-3"
            style={{ color: color + "DD" }}
          >
            Gift
          </p>
          <p className="font-serif text-lg md:text-xl italic leading-snug text-text-primary">
            {gift}
          </p>
        </div>

        <div
          className="rounded-sm p-6 relative overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${light ? "#00000008" : "#00000020"}, transparent)`,
            border: `1px dashed ${color}${light ? "3A" : "24"}`,
          }}
        >
          <p
            className="font-mono text-kicker tracking-display uppercase mb-3 text-muted"
          >
            Trap
          </p>
          <p className="font-serif text-lg md:text-xl italic leading-snug text-text-secondary">
            {trap}
          </p>
        </div>
      </div>
    </div>
  );
}
