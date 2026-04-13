"use client";

import { useTheme } from "@/components/ThemeProvider";

interface Props {
  color: string;
  coreDesire: string;
  greatestFear: string;
  strategy: string;
}

export default function CoreTriad({
  color,
  coreDesire,
  greatestFear,
  strategy,
}: Props) {
  const { theme } = useTheme();
  const light = theme === "light";

  const items = [
    { label: "Core Desire", body: coreDesire },
    { label: "Greatest Fear", body: greatestFear },
    { label: "Strategy", body: strategy },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-3 mb-16">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-sm p-5"
          style={{
            background: `linear-gradient(145deg, ${color}${light ? "0A" : "06"}, transparent)`,
            border: `1px solid ${color}${light ? "22" : "14"}`,
          }}
        >
          <p
            className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2"
            style={{ color: color + "CC" }}
          >
            {it.label}
          </p>
          <p className="text-text-primary text-sm md:text-base leading-relaxed font-light">
            {it.body}
          </p>
        </div>
      ))}
    </div>
  );
}
