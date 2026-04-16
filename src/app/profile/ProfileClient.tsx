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
import {
  clustersForArchetype,
  distributionFromClusters,
  findBlindSpot,
  AXIS_VALUES,
} from "@/lib/axes";
import { CLUSTER_AXES, STAGE_LABELS, AFFECT_LABELS, STANCE_LABELS } from "@/data/atlas-lens-axes";
import AxisHistogram from "@/components/shared/AxisHistogram";
import { READING_BY_POLE } from "@/data/reading-by-axis";

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

interface PickAxes {
  system: SystemId;
  slug: string;
  label: string;
  clusterIds: string[];
  stages: string[];
  affects: string[];
  stances: string[];
}

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

  const pickAxes: PickAxes[] = useMemo(() => {
    const out: PickAxes[] = [];
    for (const s of SYSTEMS) {
      const sid = s.id as SystemId;
      const slug = sel[sid];
      if (!slug) continue;
      const clusters = clustersForArchetype(sid, slug);
      out.push({
        system: sid,
        slug,
        label: archetypeDisplayName(sid, slug) ?? slug,
        clusterIds: clusters.map((c) => c.id),
        stages: clusters.map((c) => CLUSTER_AXES[c.id]?.stage).filter(Boolean) as string[],
        affects: clusters.map((c) => CLUSTER_AXES[c.id]?.affect).filter(Boolean) as string[],
        stances: clusters.map((c) => CLUSTER_AXES[c.id]?.stance).filter(Boolean) as string[],
      });
    }
    return out;
  }, [sel]);

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

  const distribution = useMemo(() => {
    const clusters = pickAxes.flatMap((p) => p.clusterIds.map((id) => ({ id })));
    return distributionFromClusters(clusters);
  }, [pickAxes]);

  const blindSpot = useMemo(() => findBlindSpot(distribution), [distribution]);

  const tensions = useMemo(() => {
    const out: { a: PickAxes; b: PickAxes; axis: "stage" | "affect" | "stance"; aValue: string; bValue: string }[] = [];
    for (let i = 0; i < pickAxes.length; i++) {
      for (let j = i + 1; j < pickAxes.length; j++) {
        const a = pickAxes[i];
        const b = pickAxes[j];
        if (a.stages[0] && b.stages[0] && a.stages[0] !== b.stages[0]) {
          out.push({ a, b, axis: "stage", aValue: a.stages[0], bValue: b.stages[0] });
        }
        if (a.affects[0] && b.affects[0] && a.affects[0] !== b.affects[0]) {
          out.push({ a, b, axis: "affect", aValue: a.affects[0], bValue: b.affects[0] });
        }
        if (a.stances[0] && b.stances[0] && a.stances[0] !== b.stances[0]) {
          out.push({ a, b, axis: "stance", aValue: a.stances[0], bValue: b.stances[0] });
        }
      }
    }
    return out.slice(0, 6);
  }, [pickAxes]);

  const readingList = useMemo(() => {
    if (!blindSpot) return [];
    return READING_BY_POLE[blindSpot.value] ?? [];
  }, [blindSpot]);

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
      <p className="italic text-[14px] text-text-secondary/75 mb-6 font-serif">
        A snapshot of one reading, not a diagnosis. Return and re-pick as your reading changes.
      </p>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
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

      {filled < 2 && (
        <p className="italic text-text-secondary/70">
          Select from two or more systems to see your cross-system resonance. Selections are stored
          only in your browser ({filled} selected so far).
        </p>
      )}

      {filled >= 2 && sortedClusters.length > 0 && (
        <section className="mb-12">
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

      {filled >= 2 && distribution.total > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-xl font-medium mb-1">The shape of your picks</h2>
          <p className="italic text-text-secondary/75 mb-6 font-serif text-[14px]">
            Your selections distributed across the three structural axes. Not a score — a profile of
            which poles your reading is drawn to, and which it passes over.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <AxisHistogram axis="stage" counts={distribution.stage} values={AXIS_VALUES.stage} />
            <AxisHistogram axis="affect" counts={distribution.affect} values={AXIS_VALUES.affect} />
            <AxisHistogram axis="stance" counts={distribution.stance} values={AXIS_VALUES.stance} />
          </div>
        </section>
      )}

      {blindSpot && (
        <section className="mb-12 border border-amber-500/30 rounded-sm p-5">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-amber-400/80 mb-2">
            Blind spot
          </p>
          <p className="font-serif text-[15px] text-text-primary/90 mb-3">
            Nothing in your picks lands in the{" "}
            <span className="text-amber-300">{blindSpot.label}</span> pole (
            {AXIS_VALUES[blindSpot.axis].length === 0
              ? ""
              : `${blindSpot.axis}`}
            ). The atlas has {blindSpot.missingClusters.length} cluster
            {blindSpot.missingClusters.length === 1 ? "" : "s"} there you haven't named.
          </p>
          <ul className="flex flex-wrap gap-2">
            {blindSpot.missingClusters.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/atlas/cluster/${c.id}`}
                  className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase border border-amber-500/30 px-3 py-1 rounded-sm hover:border-amber-400 hover:text-amber-300"
                >
                  {c.theme.split(" — ")[0].replace(/^The\s+/i, "")}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tensions.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-xl font-medium mb-1">Tensions in your picks</h2>
          <p className="italic text-text-secondary/75 mb-5 font-serif text-[14px]">
            The psyche isn't coherent. Pairs of your selections that diverge on a structural axis —
            these tensions are often the profile, not a flaw to resolve.
          </p>
          <ul className="space-y-2">
            {tensions.map((t, i) => {
              const labels =
                t.axis === "stage"
                  ? STAGE_LABELS
                  : t.axis === "affect"
                    ? AFFECT_LABELS
                    : STANCE_LABELS;
              return (
                <li
                  key={i}
                  className="grid grid-cols-[1fr_auto_1fr] gap-3 items-baseline border border-surface-light/30 rounded-sm px-3 py-2"
                >
                  <div>
                    <span className="font-serif text-[14px]">{t.a.label}</span>
                    <span className="block font-mono text-[9px] tracking-[0.25em] uppercase text-text-secondary/60">
                      {(labels as Record<string, string>)[t.aValue]}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-secondary/55">
                    {t.axis} ↔
                  </span>
                  <div className="text-right">
                    <span className="font-serif text-[14px]">{t.b.label}</span>
                    <span className="block font-mono text-[9px] tracking-[0.25em] uppercase text-text-secondary/60">
                      {(labels as Record<string, string>)[t.bValue]}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {readingList.length > 0 && blindSpot && (
        <section className="mb-12">
          <h2 className="font-serif text-xl font-medium mb-1">Reading toward the blind spot</h2>
          <p className="italic text-text-secondary/75 mb-5 font-serif text-[14px]">
            If you want to extend your vocabulary into the{" "}
            <span className="text-amber-300">{blindSpot.label}</span> pole, these are where to start.
          </p>
          <ul className="space-y-3">
            {readingList.map((r) => (
              <li key={r.text} className="border border-surface-light/30 rounded-sm p-3">
                <p className="font-serif text-[15px] font-medium mb-1">
                  {r.href ? (
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-text-secondary/30 hover:decoration-gold"
                    >
                      {r.text}
                    </a>
                  ) : (
                    r.text
                  )}
                </p>
                <p className="italic text-[13px] text-text-secondary/80">{r.note}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
