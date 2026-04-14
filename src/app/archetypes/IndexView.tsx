"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ALL_INDEX_ENTRIES,
  SYSTEM_ORDER,
  type IndexEntry,
} from "@/data/allArchetypes";
import {
  AGE_ORDER,
  AGE_LABEL,
  AGE_COLOR,
  VALENCE_ORDER,
  VALENCE_LABEL,
  VALENCE_COLOR,
  INTROVERSION_ORDER,
  INTROVERSION_LABEL,
  INTROVERSION_COLOR,
} from "@/data/indexTags";
import ArchetypeIndexCard from "@/components/shared/ArchetypeIndexCard";
import { useTheme } from "@/components/ThemeProvider";

type GroupMode =
  | "system"
  | "inner"
  | "alpha"
  | "hue"
  | "shuffle"
  | "age"
  | "valence"
  | "introversion";

type OptionGroup = "order" | "dimension";
const GROUP_OPTIONS: { id: GroupMode; label: string; group: OptionGroup }[] = [
  { id: "system", label: "By System", group: "order" },
  { id: "inner", label: "By Group", group: "order" },
  { id: "alpha", label: "Alphabetical", group: "order" },
  { id: "age", label: "By Age", group: "order" },
  { id: "valence", label: "Light → Dark", group: "dimension" },
  { id: "introversion", label: "Inward → Outward", group: "dimension" },
  { id: "hue", label: "By Hue", group: "dimension" },
  { id: "shuffle", label: "Shuffle", group: "dimension" },
];

const VALID_MODES = new Set(GROUP_OPTIONS.map((o) => o.id));

function hexToHue(hex: string): number {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  if (d === 0) return 0;
  let hue: number;
  if (max === r) hue = ((g - b) / d) % 6;
  else if (max === g) hue = (b - r) / d + 2;
  else hue = (r - g) / d + 4;
  return (hue * 60 + 360) % 360;
}

interface Section {
  key: string;
  label: string;
  color: string;
  entries: IndexEntry[];
}

export default function IndexView() {
  const { theme } = useTheme();
  const light = theme === "light";
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialMode = (() => {
    const m = searchParams.get("sort");
    return m && VALID_MODES.has(m as GroupMode) ? (m as GroupMode) : "system";
  })();
  const initialQuery = searchParams.get("q") ?? "";

  const [mode, setMode] = useState<GroupMode>(initialMode);
  const [query, setQuery] = useState(initialQuery);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  // Persist to URL without scroll
  useEffect(() => {
    const params = new URLSearchParams();
    if (mode !== "system") params.set("sort", mode);
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    const next = qs ? `/archetypes?${qs}` : "/archetypes";
    router.replace(next, { scroll: false });
  }, [mode, query, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_INDEX_ENTRIES;
    return ALL_INDEX_ENTRIES.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        (e.motto?.toLowerCase().includes(q) ?? false) ||
        e.innerGroup.label.toLowerCase().includes(q) ||
        e.systemName.toLowerCase().includes(q)
    );
  }, [query]);

  const sections = useMemo<Section[]>(() => {
    if (mode === "alpha") {
      const sorted = [...filtered].sort((a, b) =>
        a.sortName.localeCompare(b.sortName)
      );
      return [
        {
          key: "all",
          label: "All Archetypes",
          color: "var(--color-gold)",
          entries: sorted,
        },
      ];
    }

    if (mode === "hue") {
      const sorted = [...filtered].sort(
        (a, b) => hexToHue(a.accentColor) - hexToHue(b.accentColor)
      );
      return [
        {
          key: "hue",
          label: "Across the Spectrum",
          color: "var(--color-gold)",
          entries: sorted,
        },
      ];
    }

    const tagSection = <K extends string>(
      order: readonly K[],
      labelMap: Record<K, string>,
      colorMap: Record<K, string>,
      prefix: string,
      getter: (e: IndexEntry) => K
    ): Section[] => {
      return order
        .map((key) => {
          const entries = filtered.filter((e) => getter(e) === key);
          if (entries.length === 0) return null;
          return {
            key: `${prefix}-${key}`,
            label: labelMap[key],
            color: colorMap[key],
            entries,
          } as Section;
        })
        .filter((s): s is Section => !!s);
    };

    if (mode === "age") {
      return tagSection(
        AGE_ORDER,
        AGE_LABEL,
        AGE_COLOR,
        "age",
        (e) => e.tags.age
      );
    }

    if (mode === "valence") {
      return tagSection(
        VALENCE_ORDER,
        VALENCE_LABEL,
        VALENCE_COLOR,
        "valence",
        (e) => e.tags.valence
      );
    }

    if (mode === "introversion") {
      return tagSection(
        INTROVERSION_ORDER,
        INTROVERSION_LABEL,
        INTROVERSION_COLOR,
        "intro",
        (e) => e.tags.introversion
      );
    }

    if (mode === "shuffle") {
      const arr = [...filtered];
      let seed = shuffleSeed || 1;
      const rand = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return [
        {
          key: `shuffle-${shuffleSeed}`,
          label: "Let the Field Decide",
          color: "var(--color-gold)",
          entries: arr,
        },
      ];
    }

    if (mode === "system") {
      const out: Section[] = [];
      for (const sysId of SYSTEM_ORDER) {
        const entries = filtered.filter((e) => e.systemId === sysId);
        if (entries.length === 0) continue;
        out.push({
          key: sysId,
          label: entries[0].systemName,
          color: entries[0].systemAccent,
          entries,
        });
      }
      return out;
    }

    const groups = new Map<string, Section>();
    for (const sysId of SYSTEM_ORDER) {
      for (const e of filtered.filter((x) => x.systemId === sysId)) {
        const key = e.innerGroup.id;
        const existing = groups.get(key);
        if (existing) {
          existing.entries.push(e);
        } else {
          groups.set(key, {
            key,
            label: `${e.systemName} · ${e.innerGroup.label}`,
            color: e.innerGroup.color,
            entries: [e],
          });
        }
      }
    }
    return Array.from(groups.values());
  }, [filtered, mode, shuffleSeed]);

  const total = filtered.length;
  const hasFilters = query.trim().length > 0 || mode !== "system";
  const clearAll = useCallback(() => {
    setQuery("");
    setMode("system");
  }, []);

  const orderOpts = GROUP_OPTIONS.filter((o) => o.group === "order");
  const dimensionOpts = GROUP_OPTIONS.filter((o) => o.group === "dimension");

  const sortButton = (opt: (typeof GROUP_OPTIONS)[number]) => {
    const active = mode === opt.id;
    return (
      <button
        key={opt.id}
        type="button"
        aria-pressed={active}
        onClick={() => {
          setMode(opt.id);
          if (opt.id === "shuffle") setShuffleSeed(Date.now());
        }}
        className={`font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-2 rounded-sm transition-colors duration-200 ${
          active
            ? "text-gold bg-gold/10 border border-gold/30"
            : "text-muted hover:text-text-secondary border border-transparent"
        }`}
      >
        {opt.label}
      </button>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="px-6 pt-24 pb-8 md:pt-32 md:pb-10">
        <div className="max-w-6xl mx-auto animate-slide-up">
          <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-4">
            The Index
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-text-primary tracking-tight leading-[1.05] mb-5">
            All{" "}
            <span className={light ? "text-text-primary" : "text-gold glow-text-subtle animate-flicker"}>
              Archetypes
            </span>
          </h1>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl font-light">
            Seventy-five figures across six systems - each with its own
            aesthetic and temperament. Group by system, browse by inner
            category, or search the whole field at once.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-14 z-30 px-6 py-3 backdrop-blur-xl bg-bg/80 border-b border-gold/10 transition-colors duration-300">
        <div className="max-w-6xl mx-auto flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-[8px] tracking-[0.35em] uppercase text-muted/70 shrink-0 w-16">
              Order
            </span>
            <div role="group" aria-label="Order archetypes" className="flex flex-wrap items-center gap-1">
              {orderOpts.map(sortButton)}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-[8px] tracking-[0.35em] uppercase text-muted/70 shrink-0 w-16">
              Dimension
            </span>
            <div role="group" aria-label="Arrange archetypes by dimension" className="flex flex-wrap items-center gap-1">
              {dimensionOpts.map(sortButton)}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="relative flex-1 min-w-[180px]">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search archetypes…"
                aria-label="Search archetypes"
                className="w-full bg-transparent border border-gold/15 focus:border-gold/40 rounded-sm px-3 py-2 pr-8 font-mono text-[11px] tracking-[0.1em] text-text-primary placeholder:text-muted/60 outline-none transition-colors duration-200"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-muted hover:text-gold transition-colors rounded-sm font-mono text-[11px]"
                >
                  ×
                </button>
              )}
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted hover:text-gold transition-colors px-2 py-1"
              >
                Reset
              </button>
            )}

            <span className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase">
              {total} {total === 1 ? "Type" : "Types"}
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 pt-12 pb-24">
        <div className="max-w-6xl mx-auto space-y-16">
          {sections.length === 0 && (
            <div className="pt-16 flex flex-col items-center text-center gap-4">
              <span
                aria-hidden
                className="font-serif italic text-5xl text-muted/40"
              >
                ∅
              </span>
              <p className="font-mono text-xs text-muted uppercase tracking-[0.2em]">
                No archetypes match &ldquo;{query}&rdquo;.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold border border-gold/30 hover:bg-gold/10 px-4 py-2 rounded-sm transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
          {sections.map((section) => (
            <section key={section.key}>
              <div className="mb-6 flex items-center gap-4">
                <span
                  className="font-mono text-[10px] tracking-[0.35em] uppercase"
                  style={{ color: section.color }}
                >
                  {section.label}
                </span>
                <div
                  className="h-px flex-1"
                  style={{
                    background: `linear-gradient(90deg, ${section.color}${light ? "35" : "22"}, transparent)`,
                  }}
                />
                <span className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase">
                  {section.entries.length}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.entries.map((entry, i) => (
                  <ArchetypeIndexCard
                    key={`${section.key}-${entry.systemId}-${entry.slug}`}
                    entry={entry}
                    index={i}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
