"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CLUSTERS } from "@/data/resonance";
import { archetypeDisplayName, archetypeHref, systemAccent } from "@/lib/resonance";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

function buildCorpus() {
  return CLUSTERS.flatMap((c) =>
    c.archetypes.map((a) => ({
      cluster: c,
      entry: a,
      tokens: new Set([
        ...tokenize(c.theme),
        ...tokenize(c.description),
        ...tokenize(a.note),
        ...tokenize(a.editorialNote ?? ""),
      ]),
    })),
  );
}

export default function MirrorClient() {
  const corpus = useMemo(buildCorpus, []);
  const [text, setText] = useState("");
  const [results, setResults] = useState<
    { cluster: (typeof corpus)[number]["cluster"]; entry: (typeof corpus)[number]["entry"]; score: number }[]
  >([]);
  const [submitted, setSubmitted] = useState(false);

  function run(e: React.FormEvent) {
    e.preventDefault();
    const toks = tokenize(text);
    if (toks.length === 0) return;
    const scored = corpus
      .map((row) => {
        let score = 0;
        for (const t of toks) if (row.tokens.has(t)) score++;
        return { cluster: row.cluster, entry: row.entry, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setResults(scored);
    setSubmitted(true);
  }

  return (
    <div>
      <form onSubmit={run} className="mb-10">
        <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-3">
          What are you navigating?
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full bg-transparent border border-surface-light/40 rounded-sm p-4 font-serif text-[15px] leading-relaxed focus:outline-none focus:border-gold/50"
          placeholder="Describe the situation, relationship, or inner movement you want to reflect on."
        />
        <button
          type="submit"
          className="mt-4 font-mono text-[10px] tracking-[0.3em] uppercase border border-gold/40 px-5 py-2 rounded-sm hover:border-gold hover:text-gold"
        >
          Reflect →
        </button>
      </form>

      {submitted && results.length === 0 && (
        <p className="italic text-text-secondary/80">
          No strong resonances surfaced. Try a longer or more specific description.
        </p>
      )}

      {results.length > 0 && (
        <section>
          <h2 className="font-serif text-xl font-medium mb-2">Five figures to try on</h2>
          <HermeneuticCaveat variant="inline" className="mb-6" />
          <ul className="space-y-3">
            {results.map(({ cluster, entry, score }) => {
              const { accent, name: systemName } = systemAccent(entry.system);
              const name = archetypeDisplayName(entry.system, entry.slug) ?? entry.slug;
              return (
                <li
                  key={`${cluster.id}-${entry.system}-${entry.slug}`}
                  className="rounded-sm border border-surface-light/40 p-4"
                >
                  <div className="flex items-baseline justify-between">
                    <p
                      className="font-mono text-[9px] tracking-[0.3em] uppercase"
                      style={{ color: accent }}
                    >
                      {systemName} · {cluster.theme.split(" — ")[0].replace(/^The\s+/i, "")}
                    </p>
                    <p className="font-mono text-[9px] text-muted/70">resonance {score}</p>
                  </div>
                  <Link
                    href={archetypeHref(entry.system, entry.slug)}
                    className="font-serif text-lg font-medium hover:underline underline-offset-4 decoration-1"
                    style={{ color: accent }}
                  >
                    {name}
                  </Link>
                  <p className="text-sm text-text-primary/85 mt-1">{entry.note}</p>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
