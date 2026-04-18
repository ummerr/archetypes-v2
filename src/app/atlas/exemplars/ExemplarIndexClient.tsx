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

const HERO_THRESHOLD = 4;

const TIERS: Array<{
  key: "crossings" | "two" | "single";
  label: string;
  blurb: string;
  match: (n: number) => boolean;
}> = [
  {
    key: "crossings",
    label: "Crossings — three traditions",
    blurb: "Read by three traditions. The resonant middle.",
    match: (n) => n === 3,
  },
  {
    key: "two",
    label: "Two reads",
    blurb: "Read by two traditions. Where divergence is the point.",
    match: (n) => n === 2,
  },
  {
    key: "single",
    label: "Single tradition",
    blurb: "Read by one tradition. The lens-revealing cases.",
    match: (n) => n === 1,
  },
];

export default function ExemplarIndexClient({ records }: { records: Card[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<KindFilter>("all");
  const [sort, setSort] = useState<SortMode>("cross");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return records.filter((r) => {
      if (kind !== "all" && r.kind !== kind) return false;
      if (q && !r.displayName.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [records, query, kind]);

  const orderWithin = (rows: Card[]) =>
    rows.slice().sort((a, b) => {
      if (sort === "alpha") return a.displayName.localeCompare(b.displayName);
      return b.systems.length - a.systems.length || a.displayName.localeCompare(b.displayName);
    });

  const heroes = orderWithin(filtered.filter((r) => r.systems.length >= HERO_THRESHOLD));
  const tiered = TIERS.map((t) => ({
    ...t,
    rows: orderWithin(filtered.filter((r) => t.match(r.systems.length))),
  }));

  return (
    <div>
      <div className="flex flex-wrap gap-3 items-baseline mb-8">
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

      {heroes.length > 0 && (
        <section className="mb-12">
          <div className="flex items-baseline justify-between gap-2 mb-4">
            <p className="font-mono text-label tracking-kicker uppercase text-gold/80">
              Most read · {HERO_THRESHOLD}+ traditions
            </p>
            <p className="font-serif italic text-xs text-text-secondary/65">
              Figures the canon keeps returning to. The teaching cases.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-4">
            {heroes.map((r) => (
              <HeroCard key={r.slug} card={r} />
            ))}
          </ul>
        </section>
      )}

      {tiered.map((t) =>
        t.rows.length === 0 ? null : (
          <section key={t.key} className="mb-12">
            <div className="flex items-baseline justify-between gap-2 mb-4 pb-2 border-b border-surface-light/30">
              <p className="font-mono text-label tracking-kicker uppercase text-gold/80">
                {t.label}
              </p>
              <p className="font-serif italic text-xs text-text-secondary/65 hidden sm:block">
                {t.blurb}
              </p>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.rows.map((r) => (
                <FigureCard key={r.slug} card={r} />
              ))}
            </ul>
          </section>
        ),
      )}
    </div>
  );
}

function HeroCard({ card }: { card: Card }) {
  return (
    <li>
      <Link
        href={`/atlas/exemplars/${card.slug}`}
        className="group block rounded-sm border border-gold/30 bg-surface-light/5 p-5 hover:border-gold/70 transition-colors h-full"
      >
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <p className="font-serif text-body-lg font-medium group-hover:text-gold transition-colors">
            {card.displayName}
          </p>
          <p className="font-mono text-kicker tracking-kicker uppercase text-text-secondary/55">
            {card.kind}
          </p>
        </div>
        {card.mediums.length > 0 && (
          <p className="font-mono text-kicker tracking-label uppercase text-text-secondary/55 mb-3">
            {card.mediums.join(" · ")}
          </p>
        )}
        {card.editorialNote && (
          <p className="text-body-sm text-text-secondary/85 italic leading-relaxed mb-4">
            {card.editorialNote}
          </p>
        )}
        <div className="flex items-center gap-2 mt-auto">
          {card.systems.map((s) => {
            const { accent, name } = systemAccent(s);
            return (
              <span
                key={s}
                title={name}
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: accent }}
              />
            );
          })}
          <span className="font-mono text-kicker tracking-label uppercase text-gold/75 ml-2">
            read by {card.systems.length} traditions
          </span>
        </div>
      </Link>
    </li>
  );
}

function FigureCard({ card }: { card: Card }) {
  return (
    <li>
      <Link
        href={`/atlas/exemplars/${card.slug}`}
        className="block rounded-sm border border-surface-light/40 p-4 hover:border-gold/60 transition-colors h-full"
      >
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <p className="font-serif text-base font-medium">{card.displayName}</p>
          <p className="font-mono text-kicker tracking-kicker uppercase text-text-secondary/55">
            {card.kind}
          </p>
        </div>
        {card.mediums.length > 0 && (
          <p className="font-mono text-kicker tracking-label uppercase text-text-secondary/55 mb-2">
            {card.mediums.join(" · ")}
          </p>
        )}
        {card.editorialNote && (
          <p className="text-xs text-text-secondary/80 italic leading-snug mb-3">
            {card.editorialNote}
          </p>
        )}
        <div className="flex items-center gap-1.5 mt-auto">
          {card.systems.map((s) => {
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
            {card.systems.length} system{card.systems.length === 1 ? "" : "s"}
          </span>
        </div>
      </Link>
    </li>
  );
}
