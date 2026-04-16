"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CLUSTERS, type ThematicCluster, type ResonanceEntry } from "@/data/resonance";
import { archetypeDisplayName, archetypeHref, systemAccent } from "@/lib/resonance";
import { clusterAxes } from "@/lib/axes";
import { STAGE_LABELS, AFFECT_LABELS, STANCE_LABELS } from "@/data/atlas-lens-axes";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";

const STOPWORDS = new Set([
  "the", "and", "but", "for", "with", "that", "this", "from", "into", "they",
  "them", "then", "than", "about", "here", "there", "have", "has", "had",
  "was", "were", "been", "being", "some", "what", "when", "where", "which",
  "who", "whom", "your", "yours", "you", "their", "our", "ours", "are",
  "not", "all", "any", "more", "most", "very", "just", "too", "its",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z\s-]/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

interface CorpusRow {
  cluster: ThematicCluster;
  entry: ResonanceEntry;
  tokens: Set<string>;
}

function buildCorpus(): CorpusRow[] {
  return CLUSTERS.flatMap((c) =>
    c.archetypes.map<CorpusRow>((a) => ({
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

interface EntryHit {
  cluster: ThematicCluster;
  entry: ResonanceEntry;
  score: number;
  matched: string[];
}

interface ClusterHit {
  cluster: ThematicCluster;
  score: number;
  matchedTokens: Set<string>;
  entries: EntryHit[];
}

const REFRAME_PROMPTS = [
  "Now describe the same situation focused on what you want, not what you fear.",
  "Now describe the same situation from the point of view of the person you find hardest to understand in it.",
  "Now describe the same situation using only the body — what tightens, what opens, where you feel the weight.",
];

export default function MirrorClient() {
  const corpus = useMemo(buildCorpus, []);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reframeIndex, setReframeIndex] = useState(-1);

  const { clusterHits, shadow, totalMatched } = useMemo(() => {
    if (!submitted) {
      return { clusterHits: [] as ClusterHit[], shadow: [] as ThematicCluster[], totalMatched: 0 };
    }
    const toks = tokenize(text);
    if (toks.length === 0) {
      return { clusterHits: [], shadow: [], totalMatched: 0 };
    }

    const entryHits: EntryHit[] = corpus
      .map((row) => {
        const matched: string[] = [];
        for (const t of toks) if (row.tokens.has(t)) matched.push(t);
        return { cluster: row.cluster, entry: row.entry, score: matched.length, matched };
      })
      .filter((h) => h.score > 0);

    const byCluster = new Map<string, ClusterHit>();
    for (const hit of entryHits) {
      const existing = byCluster.get(hit.cluster.id);
      if (existing) {
        existing.score += hit.score;
        for (const t of hit.matched) existing.matchedTokens.add(t);
        existing.entries.push(hit);
      } else {
        byCluster.set(hit.cluster.id, {
          cluster: hit.cluster,
          score: hit.score,
          matchedTokens: new Set(hit.matched),
          entries: [hit],
        });
      }
    }

    const sortedClusters = Array.from(byCluster.values())
      .map((c) => ({
        ...c,
        entries: c.entries.sort((a, b) => b.score - a.score).slice(0, 2),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // Shadow: the axes least represented among the top matches.
    const presentStages = new Set<string>();
    const presentAffects = new Set<string>();
    const presentStances = new Set<string>();
    for (const c of sortedClusters) {
      const ax = clusterAxes(c.cluster.id);
      if (!ax) continue;
      presentStages.add(ax.stage);
      presentAffects.add(ax.affect);
      presentStances.add(ax.stance);
    }
    const unmetClusters = CLUSTERS.filter((c) => {
      if (sortedClusters.some((h) => h.cluster.id === c.id)) return false;
      const ax = clusterAxes(c.id);
      if (!ax) return false;
      const missesStage = !presentStages.has(ax.stage);
      const missesAffect = !presentAffects.has(ax.affect);
      const missesStance = !presentStances.has(ax.stance);
      // Prefer clusters that miss on 2+ axes.
      return (Number(missesStage) + Number(missesAffect) + Number(missesStance)) >= 2;
    }).slice(0, 3);

    return {
      clusterHits: sortedClusters,
      shadow: unmetClusters,
      totalMatched: entryHits.length,
    };
  }, [submitted, text, corpus]);

  function run(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setReframeIndex(-1);
  }

  function reframe() {
    setReframeIndex((i) => (i + 1) % REFRAME_PROMPTS.length);
    setSubmitted(false);
  }

  return (
    <div>
      <form onSubmit={run} className="mb-10">
        <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-3">
          What are you navigating?
        </label>
        {reframeIndex >= 0 && (
          <p className="font-serif italic text-[14px] text-text-secondary/80 mb-2">
            {REFRAME_PROMPTS[reframeIndex]}
          </p>
        )}
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

      {submitted && clusterHits.length === 0 && (
        <p className="italic text-text-secondary/80">
          No strong resonances surfaced. Try a longer or more specific description.
        </p>
      )}

      {clusterHits.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-xl font-medium mb-2">Three clusters your language touched</h2>
          <HermeneuticCaveat variant="inline" className="mb-6" />
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-secondary/60 mb-4">
            {totalMatched} archetype{totalMatched === 1 ? "" : "s"} surfaced · grouped by cluster
          </p>
          <ul className="space-y-6">
            {clusterHits.map(({ cluster, score, matchedTokens, entries }) => {
              const ax = clusterAxes(cluster.id);
              return (
                <li
                  key={cluster.id}
                  className="rounded-sm border border-gold/25 p-5"
                >
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <Link
                      href={`/atlas/cluster/${cluster.id}`}
                      className="font-serif text-lg font-medium hover:underline underline-offset-4 decoration-1"
                    >
                      {cluster.theme}
                    </Link>
                    <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-secondary/60">
                      resonance {score}
                    </span>
                  </div>
                  {ax && (
                    <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-secondary/55 mb-2">
                      {STAGE_LABELS[ax.stage]} · {AFFECT_LABELS[ax.affect]} · {STANCE_LABELS[ax.stance]}
                    </p>
                  )}
                  <p className="font-mono text-[10px] text-text-secondary/70 mb-4">
                    matched: <span className="italic">{Array.from(matchedTokens).join(", ")}</span>
                  </p>
                  <ul className="space-y-3">
                    {entries.map(({ entry, matched }) => {
                      const { accent, name: systemName } = systemAccent(entry.system);
                      const name = archetypeDisplayName(entry.system, entry.slug) ?? entry.slug;
                      return (
                        <li
                          key={`${entry.system}-${entry.slug}`}
                          className="rounded-sm border border-surface-light/30 p-3"
                        >
                          <p
                            className="font-mono text-[9px] tracking-[0.3em] uppercase"
                            style={{ color: accent }}
                          >
                            {systemName}
                          </p>
                          <Link
                            href={archetypeHref(entry.system, entry.slug)}
                            className="font-serif text-base font-medium hover:underline underline-offset-4 decoration-1"
                            style={{ color: accent }}
                          >
                            {name}
                          </Link>
                          <p className="text-sm text-text-primary/85 mt-1">{entry.note}</p>
                          <p className="font-mono text-[9px] text-text-secondary/55 mt-2">
                            matched: <span className="italic">{matched.join(", ")}</span>
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {shadow.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-xl font-medium mb-2">What you didn't name</h2>
          <p className="italic text-text-secondary/80 mb-5 font-serif text-[15px]">
            The language above leans toward certain developmental stages, affects, and stances. These
            clusters sit on the axes your description didn't touch — a different angle on the same
            situation might meet them.
          </p>
          <ul className="grid sm:grid-cols-3 gap-3">
            {shadow.map((cluster) => {
              const ax = clusterAxes(cluster.id);
              return (
                <li
                  key={cluster.id}
                  className="rounded-sm border border-surface-light/30 p-4 opacity-70 hover:opacity-100 transition-opacity"
                >
                  <Link
                    href={`/atlas/cluster/${cluster.id}`}
                    className="font-serif text-[15px] font-medium hover:underline underline-offset-4 decoration-1 block"
                  >
                    {cluster.theme}
                  </Link>
                  {ax && (
                    <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-secondary/55 mt-1">
                      {STAGE_LABELS[ax.stage]} · {AFFECT_LABELS[ax.affect]} · {STANCE_LABELS[ax.stance]}
                    </p>
                  )}
                  <p className="text-xs text-text-secondary/75 mt-2 leading-snug">
                    {cluster.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {submitted && clusterHits.length > 0 && (
        <div className="pt-6 border-t border-surface-light/30">
          <button
            type="button"
            onClick={reframe}
            className="font-mono text-[10px] tracking-[0.3em] uppercase border border-surface-light/40 px-4 py-2 rounded-sm hover:border-gold hover:text-gold"
          >
            Try another framing →
          </button>
          <p className="font-serif italic text-[13px] text-text-secondary/60 mt-3 max-w-prose">
            No single description is final. Reframing the same situation usually surfaces different
            vocabulary.
          </p>
        </div>
      )}
    </div>
  );
}
