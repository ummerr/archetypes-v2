"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

export interface ExemplarBrand {
  name: string;
  note: string;
  source?: string;
}

export interface ExemplarCultural {
  name: string;
  medium: string;
  note: string;
  source?: string;
}

export interface ExemplarHistorical {
  name: string;
  note: string;
  source?: string;
}

export interface ExemplarSet {
  brands?: ExemplarBrand[];
  cultural: ExemplarCultural[];
  historical: ExemplarHistorical[];
}

interface Props {
  color: string;
  exemplars: ExemplarSet;
}

type TabKey = "brands" | "cultural" | "historical";

export default function ExemplarsTabs({ color, exemplars }: Props) {
  const { theme } = useTheme();
  const light = theme === "light";

  const tabs: { key: TabKey; label: string }[] = [];
  tabs.push({ key: "cultural", label: "Cultural" });
  tabs.push({ key: "historical", label: "Historical" });
  if (exemplars.brands && exemplars.brands.length) {
    tabs.push({ key: "brands", label: "Brands" });
  }

  const [active, setActive] = useState<TabKey>(tabs[0].key);

  const renderRows = () => {
    if (active === "brands" && exemplars.brands) {
      return exemplars.brands.map((e) => (
        <Row key={e.name} name={e.name} note={e.note} source={e.source} color={color} light={light} />
      ));
    }
    if (active === "cultural") {
      return exemplars.cultural.map((e) => (
        <Row
          key={e.name}
          name={e.name}
          tag={e.medium}
          note={e.note}
          source={e.source}
          color={color}
          light={light}
        />
      ));
    }
    return exemplars.historical.map((e) => (
      <Row key={e.name} name={e.name} note={e.note} source={e.source} color={color} light={light} />
    ));
  };

  return (
    <section className="mb-16">
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-muted">
          Exemplars
        </span>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(90deg, ${color}${light ? "30" : "18"}, transparent)`,
          }}
        />
      </div>

      <div className="flex gap-1 mb-5" role="tablist">
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.key)}
              className="font-mono text-[10px] tracking-[0.35em] uppercase px-3 py-2 rounded-sm transition-all"
              style={{
                color: isActive ? color : undefined,
                background: isActive
                  ? `linear-gradient(145deg, ${color}${light ? "14" : "0C"}, transparent)`
                  : "transparent",
                border: `1px solid ${isActive ? `${color}${light ? "40" : "28"}` : "transparent"}`,
                opacity: isActive ? 1 : 0.55,
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">{renderRows()}</div>
    </section>
  );
}

function Row({
  name,
  tag,
  note,
  source,
  color,
  light,
}: {
  name: string;
  tag?: string;
  note: string;
  source?: string;
  color: string;
  light: boolean;
}) {
  return (
    <div
      className="rounded-sm p-4"
      style={{
        background: `linear-gradient(145deg, ${color}${light ? "08" : "05"}, transparent)`,
        border: `1px solid ${color}${light ? "1C" : "10"}`,
      }}
    >
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <p
          className="font-serif text-base md:text-lg font-medium leading-tight"
          style={{ color }}
        >
          {name}
        </p>
        {tag ? (
          <span
            className="font-mono text-[8px] tracking-[0.3em] uppercase shrink-0"
            style={{ color: color + "99" }}
          >
            {tag}
          </span>
        ) : null}
      </div>
      <p className="text-text-secondary text-sm leading-relaxed font-light">
        {note}
      </p>
      {source ? (
        <p
          className="mt-2 font-mono text-[9px] tracking-[0.2em] uppercase text-muted opacity-70"
          style={{ borderTop: `1px dashed ${color}${light ? "18" : "0E"}`, paddingTop: "0.4rem" }}
        >
          {source}
        </p>
      ) : null}
    </div>
  );
}
