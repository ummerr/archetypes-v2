"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SYSTEMS } from "@/data/systems";
import { CLUSTERS, type SystemId } from "@/data/resonance";
import { ALL_JUNGIAN } from "@/data/jungian/archetypes";
import { ALL_ENNEAGRAM } from "@/data/enneagram/archetypes";
import { ALL_ARCHETYPES as ALL_KWML } from "@/data/kwml/archetypes";
import { ALL_TAROT } from "@/data/tarot/archetypes";
import { ALL_HEROSJOURNEY } from "@/data/herosjourney/archetypes";
import { ALL_MBTI } from "@/data/mbti/archetypes";
import { archetypeDisplayName, systemAccent } from "@/lib/resonance";

const STORAGE_KEY = "archetypes.profile.v1";

type Selections = Partial<Record<SystemId, string>>;

const OPTIONS: Record<SystemId, { slug: string; label: string }[]> = {
  jungian: ALL_JUNGIAN.map((a) => ({ slug: a.slug, label: a.name })),
  enneagram: ALL_ENNEAGRAM.map((a) => ({ slug: a.slug, label: a.name })),
  kwml: ALL_KWML.map((a) => ({ slug: a.slug, label: a.name })),
  tarot: ALL_TAROT.map((a) => ({ slug: a.slug, label: a.name })),
  "heros-journey": ALL_HEROSJOURNEY.map((a) => ({ slug: a.slug, label: a.name })),
  mbti: ALL_MBTI.map((a) => ({ slug: a.slug, label: `${a.code} — ${a.nickname}` })),
};

export default function ProfileClient() {
  const [sel, setSel] = useState<Selections>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSel(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sel));
    } catch {}
  }, [sel, ready]);

  const clusterScores = useMemo(() => {
    const scores: Record<string, number> = {};
    for (const cluster of CLUSTERS) {
      let s = 0;
      for (const a of cluster.archetypes) {
        if (sel[a.system] === a.slug) s += a.strength === "primary" ? 2 : 1;
      }
      if (s > 0) scores[cluster.id] = s;
    }
    return scores;
  }, [sel]);

  const sortedClusters = useMemo(
    () =>
      Object.entries(clusterScores)
        .sort((a, b) => b[1] - a[1])
        .map(([id, score]) => ({ cluster: CLUSTERS.find((c) => c.id === id)!, score })),
    [clusterScores],
  );

  function exportJson() {
    const blob = new Blob([JSON.stringify(sel, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "archetype-profile.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importJson(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setSel(JSON.parse(await file.text()));
    } catch {}
  }

  const filled = Object.values(sel).filter(Boolean).length;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        {SYSTEMS.map((s) => {
          const sid = s.id as SystemId;
          const { accent } = systemAccent(sid);
          return (
            <label key={s.id} className="block">
              <span
                className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2 block"
                style={{ color: accent }}
              >
                {s.name}
              </span>
              <select
                value={sel[sid] ?? ""}
                onChange={(e) => setSel((prev) => ({ ...prev, [sid]: e.target.value || undefined }))}
                className="w-full bg-transparent border border-surface-light/40 rounded-sm px-3 py-2 font-serif text-[15px]"
              >
                <option value="">— select —</option>
                {OPTIONS[sid].map((o) => (
                  <option key={o.slug} value={o.slug}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        <button
          onClick={exportJson}
          className="font-mono text-[10px] tracking-[0.3em] uppercase border border-gold/40 px-4 py-2 rounded-sm hover:border-gold hover:text-gold"
        >
          Export JSON
        </button>
        <label className="font-mono text-[10px] tracking-[0.3em] uppercase border border-surface-light/40 px-4 py-2 rounded-sm cursor-pointer hover:border-gold">
          Import JSON
          <input type="file" accept="application/json" onChange={importJson} className="hidden" />
        </label>
        <button
          onClick={() => setSel({})}
          className="font-mono text-[10px] tracking-[0.3em] uppercase border border-surface-light/40 px-4 py-2 rounded-sm hover:border-red-500/50 hover:text-red-400"
        >
          Reset
        </button>
      </div>

      {filled >= 2 && sortedClusters.length > 0 && (
        <section>
          <h2 className="font-serif text-xl font-medium mb-3">Your cross-system resonance</h2>
          <p className="italic text-text-secondary/80 mb-6">
            Clusters your selections land in, weighted by primary/secondary strength.
          </p>
          <ul className="space-y-2">
            {sortedClusters.map(({ cluster, score }) => (
              <li
                key={cluster.id}
                className="flex items-center justify-between gap-3 border border-surface-light/40 rounded-sm px-3 py-2"
              >
                <Link
                  href={`/atlas/cluster/${cluster.id}`}
                  className="font-serif text-[15px] hover:underline underline-offset-2"
                >
                  {cluster.theme}
                </Link>
                <span className="font-mono text-[10px] tracking-[0.2em] text-text-secondary/70">
                  score {score}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {filled < 2 && (
        <p className="italic text-text-secondary/70">
          Select from two or more systems to see your cross-system resonance. Selections are stored
          only in your browser ({Object.values(sel).filter(Boolean).length} selected so far).
        </p>
      )}
    </div>
  );
}
