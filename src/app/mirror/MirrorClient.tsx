"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  QUESTIONS,
  QUESTION_FRAMES,
  CLUSTER_INTERPRETATIONS,
  encodeResult,
  scoreChoices,
  topClusters,
  quietClusters,
  type Choice,
  type MirrorClusterId,
} from "@/data/mirror-questions";
import { CLUSTERS, type ConfidenceTier, type ResonanceEntry, type SystemId } from "@/data/resonance";
import { archetypeDisplayName, archetypeHref, systemAccent } from "@/lib/resonance";
import ConfidenceBadge from "@/components/shared/ConfidenceBadge";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";

const TIER_WEIGHT: Record<ConfidenceTier, number> = {
  canonical: 0,
  strong: 1,
  moderate: 2,
  speculative: 3,
  contested: 4,
};

type Phase = "intro" | "sort" | "result";

interface Props {
  initialChoices: Choice[] | null;
}

export default function MirrorClient({ initialChoices }: Props) {
  const [choices, setChoices] = useState<Choice[]>(initialChoices ?? []);
  const [phase, setPhase] = useState<Phase>(initialChoices ? "result" : "intro");
  // The viewer arrived at a pre-populated result (shared link) rather than
  // completing the sort themselves. Use this to offer a path into the flow.
  const isShared = initialChoices !== null;

  function handleBegin() {
    setPhase("sort");
  }

  function handleChoose(choice: Choice) {
    const next = [...choices, choice];
    setChoices(next);
    if (next.length >= QUESTIONS.length) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("r", encodeResult(next));
        window.history.replaceState({}, "", url.toString());
      } catch {}
      setPhase("result");
    }
  }

  if (phase === "result" && choices.length === QUESTIONS.length) {
    return <MirrorResult choices={choices} isShared={isShared} />;
  }

  if (phase === "sort") {
    return <MirrorSort onChoose={handleChoose} progress={choices.length} />;
  }

  return <MirrorIntro onBegin={handleBegin} />;
}

// ─────────────────────────────────────────────────────────────
// Phase 0 — Intro
// ─────────────────────────────────────────────────────────────

function MirrorIntro({ onBegin }: { onBegin: () => void }) {
  return (
    <section className="animate-slide-up" style={{ animationDuration: "400ms" }}>
      <p className="font-mono text-kicker tracking-display uppercase text-gold/80 mb-4">
        The Mirror
      </p>
      <h1 className="font-serif text-h1 leading-display tracking-tight mb-5">
        A snapshot of what you&rsquo;re navigating
      </h1>
      <p className="font-serif text-body-lg text-text-secondary/85 leading-article mb-4 max-w-prose">
        Twelve forced choices, under ninety seconds. No neutral option, no right
        answers. At the end: a cross-system read of the archetypal energies
        you&rsquo;re moving with right now.
      </p>
      <HermeneuticCaveat variant="inline" className="mb-10" />

      <button
        type="button"
        onClick={onBegin}
        className="font-mono text-label tracking-kicker uppercase border border-gold px-6 py-3 rounded-sm text-gold hover:bg-gold/10 transition-colors"
      >
        Begin →
      </button>

      <p className="font-serif italic text-xs text-text-secondary/55 mt-6 max-w-prose">
        Nothing is stored. Nothing is sent. The result lives in the URL —
        share it or don&rsquo;t.
      </p>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Phase 1 — Sorting
// ─────────────────────────────────────────────────────────────

function MirrorSort({
  onChoose,
  progress,
}: {
  onChoose: (c: Choice) => void;
  progress: number;
}) {
  const index = Math.min(progress, QUESTIONS.length - 1);
  const q = QUESTIONS[index];
  const frame = QUESTION_FRAMES[index];

  // A/1/← choose A, B/2/→ choose B. Ignore when a modifier is held so we
  // don't swallow ⌘R / ⌘L shortcuts.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === "a" || k === "1" || k === "arrowleft") {
        e.preventDefault();
        onChoose("A");
      } else if (k === "b" || k === "2" || k === "arrowright") {
        e.preventDefault();
        onChoose("B");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onChoose]);

  return (
    <section className="min-h-[75vh] flex flex-col">
      <ProgressDots current={progress} total={QUESTIONS.length} />

      <div
        key={index}
        className="flex-1 flex flex-col justify-center animate-slide-up"
        style={{ animationDuration: "260ms" }}
      >
        <p className="font-mono text-kicker tracking-kicker uppercase text-muted text-center mb-6">
          {frame}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          <ChoiceCard label="A" text={q.a.text} onClick={() => onChoose("A")} />
          <ChoiceCard label="B" text={q.b.text} onClick={() => onChoose("B")} />
        </div>

        <p className="mt-10 text-center font-serif italic text-xs text-text-secondary/55">
          Pick the one that&rsquo;s truer right now.
        </p>
        <p className="mt-2 text-center font-mono text-kicker tracking-kicker uppercase text-muted/50 hidden sm:block">
          A or B · ← or →
        </p>
      </div>
    </section>
  );
}

function ChoiceCard({
  label,
  text,
  onClick,
}: {
  label: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full text-left rounded-sm border border-surface-light/50 px-6 py-7 sm:px-7 sm:py-10 min-h-[120px] transition-all duration-200 hover:border-gold/60 hover:bg-gold/5 focus:outline-none focus:border-gold active:scale-[0.995]"
    >
      <span className="font-mono text-kicker tracking-kicker uppercase text-muted/70 group-hover:text-gold/80 transition-colors">
        {label}
      </span>
      <span className="block font-serif text-h3 sm:text-2xl leading-snug mt-2 text-text-primary">
        {text}
      </span>
    </button>
  );
}

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div
      className="flex items-center justify-center gap-1.5 py-2"
      aria-label={`Question ${Math.min(current + 1, total)} of ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <span
            key={i}
            aria-hidden
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: active ? 18 : 6,
              background:
                done || active ? "var(--color-gold)" : "var(--color-surface-light)",
              opacity: done ? 0.6 : 1,
            }}
          />
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Phase 2 — Constellation & interpretation
// ─────────────────────────────────────────────────────────────

function MirrorResult({
  choices,
  isShared,
}: {
  choices: Choice[];
  isShared: boolean;
}) {
  const scores = useMemo(() => scoreChoices(choices), [choices]);
  const dominant = useMemo(() => topClusters(scores, 3), [scores]);
  const quiet = useMemo(() => quietClusters(scores), [scores]);
  const shareCode = useMemo(() => encodeResult(choices), [choices]);

  const dominantLabels = dominant.map((id) => CLUSTER_INTERPRETATIONS[id].short);
  const dominantShort = dominantLabels.join(" · ");

  return (
    <section className="animate-slide-up" style={{ animationDuration: "400ms" }}>
      <header className="text-center mb-10">
        <p className="font-mono text-kicker tracking-kicker uppercase text-muted mb-3">
          {isShared ? "Their energy right now" : "Your energy right now"}
        </p>
        <h1 className="font-serif text-h1 leading-display glow-text-subtle text-gold">
          {dominantShort || "A quiet field"}
        </h1>
      </header>

      <ConstellationChart scores={scores} dominant={dominant} />

      <HermeneuticCaveat variant="inline" className="text-center mt-8 mb-12" />

      <div className="space-y-10">
        {dominant.map((id, i) => (
          <ClusterBlock
            key={id}
            clusterId={id}
            score={scores[id]}
            revealDelay={260 + i * 140}
          />
        ))}
      </div>

      {quiet.length > 0 && <QuietEnergies ids={quiet} />}

      <ExploreFooter
        shareCode={shareCode}
        isShared={isShared}
        dominantLabels={dominantLabels}
      />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Constellation SVG
// ─────────────────────────────────────────────────────────────

// Fixed angular layout — clusters arranged around the circle by thematic
// neighborhood so related energies sit near each other.
const LAYOUT_ORDER: MirrorClusterId[] = [
  "sovereign",
  "teacher",
  "sage-magician",
  "creator",
  "lover",
  "caregiver",
  "everyman",
  "innocent",
  "death-rebirth",
  "liminal-territory",
  "jester",
  "explorer",
  "rebel",
  "warrior",
];

const VIEW_W = 520;
const VIEW_H = 480;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2;
const INNER_R = 34;
const OUTER_R = 150;
const LABEL_R = 188;

function radiusForScore(score: number, maxScore: number): number {
  if (maxScore <= 0) return INNER_R;
  return INNER_R + (score / maxScore) * (OUTER_R - INNER_R);
}

function ConstellationChart({
  scores,
  dominant,
}: {
  scores: Record<MirrorClusterId, number>;
  dominant: MirrorClusterId[];
}) {
  const dominantSet = new Set<MirrorClusterId>(dominant);
  const maxScore = Math.max(1, ...Object.values(scores));

  const positions = LAYOUT_ORDER.map((id, i) => {
    const angle = -Math.PI / 2 + (i / LAYOUT_ORDER.length) * Math.PI * 2;
    const score = scores[id] ?? 0;
    const r = radiusForScore(score, maxScore);
    return {
      id,
      angle,
      score,
      x: CX + Math.cos(angle) * r,
      y: CY + Math.sin(angle) * r,
      labelX: CX + Math.cos(angle) * LABEL_R,
      labelY: CY + Math.sin(angle) * LABEL_R,
    };
  });

  const dominantPositions = positions.filter((p) => dominantSet.has(p.id));
  const dominantPath =
    dominantPositions.length >= 2
      ? dominantPositions
          .map(
            (p, i) =>
              `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`,
          )
          .join(" ") + (dominantPositions.length >= 3 ? " Z" : "")
      : "";

  return (
    <div className="mx-auto w-full max-w-[480px]">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="Your archetypal energy constellation"
        className="w-full h-auto"
      >
        {/* Guide rings at 1/3, 2/3, full */}
        {[0.34, 0.67, 1].map((t, i) => (
          <circle
            key={i}
            cx={CX}
            cy={CY}
            r={INNER_R + t * (OUTER_R - INNER_R)}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.09}
            strokeWidth={0.5}
            strokeDasharray="2 4"
            className="text-muted"
          />
        ))}

        {/* Faint spokes */}
        {positions.map((p) => (
          <line
            key={`spoke-${p.id}`}
            x1={CX}
            y1={CY}
            x2={CX + Math.cos(p.angle) * OUTER_R}
            y2={CY + Math.sin(p.angle) * OUTER_R}
            stroke="currentColor"
            strokeOpacity={0.05}
            strokeWidth={0.5}
            className="text-muted"
          />
        ))}

        {/* Dominant polygon — the "figure" of the constellation */}
        {dominantPath && (
          <path
            d={dominantPath}
            fill="var(--color-gold)"
            fillOpacity={0.06}
            stroke="var(--color-gold)"
            strokeOpacity={0.5}
            strokeWidth={1}
          />
        )}

        {/* Nodes */}
        {positions.map((p) => {
          const isDominant = dominantSet.has(p.id);
          const nodeR = 3 + p.score * 2.4;
          const opacity = p.score === 0 ? 0.3 : isDominant ? 1 : 0.72;
          return (
            <g key={p.id} opacity={opacity}>
              {isDominant && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={nodeR + 7}
                  fill="var(--color-gold)"
                  fillOpacity={0.18}
                />
              )}
              <circle
                cx={p.x}
                cy={p.y}
                r={nodeR}
                fill={
                  isDominant
                    ? "var(--color-gold)"
                    : "var(--color-text-secondary)"
                }
              />
            </g>
          );
        })}

        {/* Labels */}
        {positions.map((p) => {
          const isDominant = dominantSet.has(p.id);
          const cosA = Math.cos(p.angle);
          const anchor =
            Math.abs(cosA) < 0.22 ? "middle" : cosA > 0 ? "start" : "end";
          const short = CLUSTER_INTERPRETATIONS[p.id].short;
          return (
            <text
              key={`label-${p.id}`}
              x={p.labelX}
              y={p.labelY}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontFamily="var(--font-mono)"
              fontSize={9.5}
              letterSpacing="0.16em"
              fill={isDominant ? "var(--color-gold)" : "currentColor"}
              opacity={isDominant ? 1 : p.score === 0 ? 0.4 : 0.7}
              className="text-text-secondary uppercase"
            >
              {short.toUpperCase()}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Per-cluster interpretation block
// ─────────────────────────────────────────────────────────────

function ClusterBlock({
  clusterId,
  score,
  revealDelay = 0,
}: {
  clusterId: MirrorClusterId;
  score: number;
  revealDelay?: number;
}) {
  const interp = CLUSTER_INTERPRETATIONS[clusterId];
  const cluster = CLUSTERS.find((c) => c.id === clusterId);

  const entries: ResonanceEntry[] = useMemo(() => {
    if (!cluster) return [];
    const seen = new Set<string>();
    const sorted = [...cluster.archetypes].sort((a, b) => {
      if (a.strength !== b.strength) return a.strength === "primary" ? -1 : 1;
      return TIER_WEIGHT[a.confidence] - TIER_WEIGHT[b.confidence];
    });
    const out: ResonanceEntry[] = [];
    for (const e of sorted) {
      const key = `${e.system}::${e.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(e);
      if (out.length >= 5) break;
    }
    return out;
  }, [cluster]);

  return (
    <article
      className="rounded-sm border border-gold/25 px-6 py-7 md:px-9 md:py-10 animate-slide-up"
      style={{ animationDelay: `${revealDelay}ms`, animationFillMode: "both" }}
    >
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <p className="font-mono text-kicker tracking-kicker uppercase text-gold/80">
          {interp.short}
        </p>
        <span className="font-mono text-kicker tracking-kicker uppercase text-muted/70">
          × {score}
        </span>
      </div>

      <h2 className="font-serif text-h2 leading-tight mb-3 text-text-primary">
        {interp.headline}
      </h2>
      <p className="font-serif text-body-lg leading-article text-text-secondary/90 mb-7 max-w-prose">
        {interp.body}
      </p>

      {cluster && entries.length > 0 && (
        <div>
          <p className="font-mono text-kicker tracking-kicker uppercase text-muted mb-3">
            Across the traditions
          </p>
          <ul className="divide-y divide-surface-light/30 border-y border-surface-light/30">
            {entries.map((entry) => {
              const { accent, name: systemName } = systemAccent(entry.system as SystemId);
              const name =
                archetypeDisplayName(entry.system as SystemId, entry.slug) ??
                entry.slug;
              return (
                <li key={`${entry.system}::${entry.slug}`}>
                  <Link
                    href={archetypeHref(entry.system as SystemId, entry.slug)}
                    className="group block py-3 transition-colors hover:bg-surface-light/10"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span
                        className="font-mono text-kicker tracking-kicker uppercase"
                        style={{ color: accent }}
                      >
                        {systemName}
                      </span>
                      <span
                        className="font-serif text-h3 leading-tight group-hover:underline decoration-1 underline-offset-4"
                        style={{ color: accent }}
                      >
                        {name}
                      </span>
                      <span className="ml-auto">
                        <ConfidenceBadge tier={entry.confidence} color={accent} />
                      </span>
                    </div>
                    <p className="font-serif text-body italic text-text-secondary/75 mt-1">
                      {entry.note}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 text-right">
            <Link
              href={`/atlas/cluster/${cluster.id}`}
              className="font-mono text-kicker tracking-kicker uppercase text-muted hover:text-gold transition-colors"
            >
              Read the full cluster →
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}

function QuietEnergies({ ids }: { ids: MirrorClusterId[] }) {
  return (
    <section className="mt-14 pt-10 border-t border-surface-light/30">
      <p className="font-mono text-kicker tracking-kicker uppercase text-muted mb-3">
        Quiet energies
      </p>
      <p className="font-serif italic text-sm text-text-secondary/70 mb-5 max-w-prose">
        Not absent — just not leading right now.
      </p>
      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
        {ids.map((id) => (
          <li
            key={id}
            className="font-serif text-body text-text-secondary/75 leading-snug"
          >
            {CLUSTER_INTERPRETATIONS[id].quiet}
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Explore / share footer
// ─────────────────────────────────────────────────────────────

function ExploreFooter({
  shareCode,
  isShared,
  dominantLabels,
}: {
  shareCode: string;
  isShared: boolean;
  dominantLabels: string[];
}) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}/mirror?r=${shareCode}`;
    const title = dominantLabels.length
      ? `My Mirror: ${dominantLabels.join(" · ")}`
      : "My Mirror";
    // Native share sheet on mobile where available; fall back to clipboard.
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // User dismissed or share failed — quietly fall through to clipboard.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard unavailable — no-op.
    }
  }

  return (
    <footer className="mt-14 pt-10 border-t border-surface-light/30">
      <p className="font-serif italic text-body text-text-secondary/80 leading-article mb-8 max-w-prose">
        This is a mirror, not a map. Come back tomorrow — the reflection
        changes as you do.
      </p>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {isShared ? (
          <Link
            href="/mirror"
            className="font-mono text-label tracking-kicker uppercase border border-gold px-5 py-2.5 rounded-sm text-gold hover:bg-gold/10 transition-colors"
          >
            Take your own mirror →
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleShare}
            className="font-mono text-label tracking-kicker uppercase border border-gold/40 px-5 py-2.5 rounded-sm text-gold hover:border-gold hover:bg-gold/5 transition-colors"
          >
            {copied ? "Link copied ✓" : "Share this mirror →"}
          </button>
        )}
        <Link
          href="/today"
          className="font-mono text-label tracking-kicker uppercase text-text-secondary hover:text-gold transition-colors"
        >
          Draw today&rsquo;s card →
        </Link>
        <Link
          href="/atlas"
          className="font-mono text-label tracking-kicker uppercase text-text-secondary hover:text-gold transition-colors"
        >
          Explore the Atlas →
        </Link>
      </div>
    </footer>
  );
}
