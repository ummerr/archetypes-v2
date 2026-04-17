"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { SystemId } from "@/data/resonance";
import { systemAccent } from "@/lib/resonance";

interface Card {
  slug: string;
  displayName: string;
  kind: "cultural" | "historical";
  editorialNote?: string;
  systems: SystemId[];
  mediums: string[];
}

type KindFilter = "all" | "cultural" | "historical";
type SortMode = "cross" | "alpha";

export default function ExemplarIndexClient({ records }: { records: Card[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<KindFilter>("all");
  const [sort, setSort] = useState<SortMode>("cross");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = records.filter((r) => {
      if (kind !== "all" && r.kind !== kind) return false;
      if (q && !r.displayName.toLowerCase().includes(q)) return false;
      return true;
    });
    rows = rows.slice().sort((a, b) => {
      if (sort === "alpha") return a.displayName.localeCompare(b.displayName);
      return b.systems.length - a.systems.length || a.displayName.localeCompare(b.displayName);
    });
    return rows;
  }, [records, query, kind, sort]);

  return (
    <div>
      <div className="flex flex-wrap gap-3 items-baseline mb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search figures…"
          className="flex-1 min-w-[200px] bg-transparent border border-surface-light/40 rounded-sm px-3 py-2 font-serif text-body focus:outline-none focus:border-gold/50"
        />
        <div className="flex gap-1 font-mono text-label tracking-kicker uppercase">
          {(["all", "cultural", "historical"] as KindFilter[]).map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`px-3 py-2 rounded-sm border ${
                kind === k
                  ? "border-gold text-gold"
                  : "border-surface-light/40 hover:border-gold/60"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="flex gap-1 font-mono text-label tracking-kicker uppercase">
          {(["cross", "alpha"] as SortMode[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`px-3 py-2 rounded-sm border ${
                sort === s
                  ? "border-gold text-gold"
                  : "border-surface-light/40 hover:border-gold/60"
              }`}
            >
              {s === "cross" ? "Most tagged" : "A–Z"}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="italic text-text-secondary/70">No figures match.</p>
      )}

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/atlas/exemplars/${r.slug}`}
              className="block rounded-sm border border-surface-light/40 p-4 hover:border-gold/60 transition-colors h-full"
            >
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <p className="font-serif text-base font-medium">{r.displayName}</p>
                <p className="font-mono text-kicker tracking-kicker uppercase text-text-secondary/55">
                  {r.kind}
                </p>
              </div>
              {r.mediums.length > 0 && (
                <p className="font-mono text-kicker tracking-label uppercase text-text-secondary/55 mb-2">
                  {r.mediums.join(" · ")}
                </p>
              )}
              {r.editorialNote && (
                <p className="text-xs text-text-secondary/80 italic leading-snug mb-3">
                  {r.editorialNote}
                </p>
              )}
              <div className="flex items-center gap-1.5 mt-auto">
                {r.systems.map((s) => {
                  const { accent, name } = systemAccent(s);
                  return (
                    <span
                      key={s}
                      title={name}
                      className="w-2 h-2 rounded-full"
                      style={{ background: accent }}
                    />
                  );
                })}
                <span className="font-mono text-kicker tracking-label uppercase text-text-secondary/55 ml-2">
                  {r.systems.length} system{r.systems.length === 1 ? "" : "s"}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
