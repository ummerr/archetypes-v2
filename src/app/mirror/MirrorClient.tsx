"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useReducedMotion,
} from "framer-motion";
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
import {
  CLUSTERS,
  type ConfidenceTier,
  type ResonanceEntry,
  type SystemId,
} from "@/data/resonance";
import {
  archetypeDisplayName,
  archetypeHref,
  systemAccent,
} from "@/lib/resonance";
import ConfidenceBadge from "@/components/shared/ConfidenceBadge";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";
import { breath } from "@/lib/motion-primitives";

const TIER_WEIGHT: Record<ConfidenceTier, number> = {
  canonical: 0,
  strong: 1,
  moderate: 2,
  speculative: 3,
  contested: 4,
};

// Fixed angular layout — shared between mini preview and result
// constellation so they sit on the same ring when framer-motion tweens
// between them via layoutId.
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

// How many times each cluster can be picked across the 12 questions.
// Used to size the per-cluster weight tick bar honestly.
const CLUSTER_MAX_OFFERINGS: Record<MirrorClusterId, number> = (() => {
  const counts = Object.fromEntries(
    LAYOUT_ORDER.map((id) => [id, 0]),
  ) as Record<MirrorClusterId, number>;
  for (const q of QUESTIONS) {
    counts[q.a.cluster] += 1;
    counts[q.b.cluster] += 1;
  }
  return counts;
})();

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

  return (
    <LayoutGroup>
      {phase === "intro" && <MirrorIntro onBegin={handleBegin} />}
      {phase === "sort" && (
        <MirrorSort onChoose={handleChoose} choices={choices} />
      )}
      {phase === "result" && choices.length === QUESTIONS.length && (
        <MirrorResult choices={choices} isShared={isShared} />
      )}
    </LayoutGroup>
  );
}

// ─────────────────────────────────────────────────────────────
// Inline primitives
// ─────────────────────────────────────────────────────────────

function Kbd({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center font-mono text-[10px] tracking-normal uppercase min-w-[22px] h-[22px] px-1.5 rounded-sm border border-gold/35 text-gold/90 bg-gold/[0.04]">
      {children}
    </span>
  );
}

// The seed ring lives behind the intro heading — a faint preview of the
// eventual result constellation. Breathes very slowly.
function SeedRing({ reduced }: { reduced: boolean }) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 96;
  return (
    <motion.svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      aria-hidden
      className="text-muted"
      animate={reduced ? undefined : breath(10)}
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.12}
        strokeWidth={0.5}
        strokeDasharray="2 4"
      />
      {LAYOUT_ORDER.map((id, i) => {
        const a = -Math.PI / 2 + (i / LAYOUT_ORDER.length) * Math.PI * 2;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        return (
          <circle
            key={id}
            cx={x}
            cy={y}
            r={1.6}
            fill="currentColor"
            opacity={0.35}
          />
        );
      })}
    </motion.svg>
  );
}

// Small constellation in the sort phase that fills in as the user picks.
// Shares `layoutId` with the full result chart so framer-motion can morph
// between them on the sort → result transition.
function MiniConstellation({
  scores,
  highlight,
}: {
  scores: Record<MirrorClusterId, number>;
  highlight: MirrorClusterId | null;
}) {
  const size = 96;
  const cx = size / 2;
  const cy = size / 2;
  const innerR = 10;
  const outerR = 38;
  const maxScore = Math.max(1, ...Object.values(scores));

  return (
    <div className="relative shrink-0 text-right" aria-hidden>
      <p className="font-mono text-[9px] tracking-kicker uppercase text-muted/60 mb-1">
        Forming
      </p>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="text-muted"
      >
        <circle
          cx={cx}
          cy={cy}
          r={outerR}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.1}
          strokeWidth={0.5}
          strokeDasharray="2 4"
        />
        {LAYOUT_ORDER.map((id, i) => {
          const a = -Math.PI / 2 + (i / LAYOUT_ORDER.length) * Math.PI * 2;
          const score = scores[id] ?? 0;
          const r = innerR + (score / maxScore) * (outerR - innerR);
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          const isHighlight = id === highlight;
          const nodeR = 1.2 + score * 0.6;
          return (
            <motion.circle
              key={id}
              initial={false}
              animate={{
                cx: x,
                cy: y,
                r: nodeR,
                opacity: isHighlight
                  ? [0.5, 1, 1]
                  : score === 0
                    ? 0.35
                    : 0.7,
              }}
              transition={
                isHighlight
                  ? {
                      duration: 0.55,
                      times: [0, 0.3, 1],
                      ease: "easeOut",
                    }
                  : { duration: 0.35, ease: "easeOut" }
              }
              fill={isHighlight ? "var(--color-gold)" : "currentColor"}
            />
          );
        })}
      </svg>
    </div>
  );
}

function TickBar({
  filled,
  total,
}: {
  filled: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-[3px]" aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="block h-[4px] w-[8px] rounded-[1px]"
          style={{
            background:
              i < filled
                ? "var(--color-gold)"
                : "var(--color-surface-light)",
            opacity: i < filled ? 0.85 : 0.55,
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Phase 0 — Intro
// ─────────────────────────────────────────────────────────────

function MirrorIntro({ onBegin }: { onBegin: () => void }) {
  const reduced = useReducedMotion() ?? false;

  // Enter / Space → Begin. Ignore modifiers so we don't swallow shortcuts.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Enter" || e.key === " ") {
        const target = e.target as HTMLElement | null;
        if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
        e.preventDefault();
        onBegin();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBegin]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="relative"
    >
      {/* Ambient seed constellation behind the heading */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-6 flex justify-center opacity-60"
        aria-hidden
      >
        <SeedRing reduced={reduced} />
      </div>

      <div className="relative">
        <p className="font-mono text-kicker tracking-display uppercase text-gold/80 mb-4">
          The Mirror
        </p>
        <h1 className="font-serif text-h1 leading-display tracking-tight mb-4">
          A snapshot of what you&rsquo;re navigating
        </h1>

        {/* Hair-rule that draws in under the heading */}
        <svg
          viewBox="0 0 120 2"
          width="120"
          height="2"
          className="mb-6 text-gold block"
          aria-hidden
        >
          <motion.line
            x1="0"
            y1="1"
            x2="120"
            y2="1"
            stroke="currentColor"
            strokeWidth={1}
            strokeOpacity={0.65}
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.18, ease: "easeOut" }}
          />
        </svg>

        <p className="font-serif text-body-lg text-text-secondary/85 leading-article mb-4 max-w-prose">
          Twelve forced choices, under ninety seconds. No neutral option, no
          right answers. At the end: a cross-system read of the archetypal
          energies you&rsquo;re moving with right now.
        </p>
        <HermeneuticCaveat variant="inline" className="mb-10" />

        <div className="flex items-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={onBegin}
            className="relative font-mono text-label tracking-kicker uppercase border border-gold px-6 py-3 rounded-sm text-gold transition-all duration-300 hover:bg-gold/10 shadow-[0_0_22px_rgba(212,175,55,0.18)] hover:shadow-[0_0_36px_rgba(212,175,55,0.38)] focus-visible:shadow-[0_0_36px_rgba(212,175,55,0.45)]"
          >
            Begin &rarr;
          </button>
          <span className="font-mono text-kicker tracking-kicker uppercase text-muted/60 hidden sm:inline-flex items-center gap-2">
            or press <Kbd>Enter</Kbd>
          </span>
        </div>

        <p className="font-serif italic text-xs text-text-secondary/55 mt-6 max-w-prose">
          Nothing is stored. Nothing is sent. The result lives in the URL —
          share it or don&rsquo;t.
        </p>
      </div>
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────
// Phase 1 — Sorting
// ─────────────────────────────────────────────────────────────

function MirrorSort({
  onChoose,
  choices,
}: {
  onChoose: (c: Choice) => void;
  choices: Choice[];
}) {
  const [pressed, setPressed] = useState<Choice | null>(null);
  const progress = choices.length;
  const index = Math.min(progress, QUESTIONS.length - 1);
  const q = QUESTIONS[index];
  const frame = QUESTION_FRAMES[index];

  // Running cluster scores for the mini-constellation.
  const runningScores = useMemo(() => {
    const s = Object.fromEntries(
      LAYOUT_ORDER.map((id) => [id, 0]),
    ) as Record<MirrorClusterId, number>;
    for (let i = 0; i < choices.length; i++) {
      const pick = choices[i] === "A" ? QUESTIONS[i].a : QUESTIONS[i].b;
      s[pick.cluster] += 1;
    }
    return s;
  }, [choices]);

  const lastCluster = useMemo<MirrorClusterId | null>(() => {
    if (choices.length === 0) return null;
    const i = choices.length - 1;
    return choices[i] === "A" ? QUESTIONS[i].a.cluster : QUESTIONS[i].b.cluster;
  }, [choices]);

  // Clear the "pressed" flash when the next question arrives.
  useEffect(() => {
    setPressed(null);
  }, [index]);

  // Commit a choice after a brief (180ms) confirmation window — gives the
  // press sweep + non-picked dim time to read as feedback.
  function commit(pick: Choice) {
    setPressed(pick);
    window.setTimeout(() => onChoose(pick), 180);
  }

  // A/1/← choose A, B/2/→ choose B. Ignore when a modifier is held so we
  // don't swallow ⌘R / ⌘L shortcuts.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (pressed) return; // already committed; ignore spam
      const k = e.key.toLowerCase();
      if (k === "a" || k === "1" || k === "arrowleft") {
        e.preventDefault();
        commit("A");
      } else if (k === "b" || k === "2" || k === "arrowright") {
        e.preventDefault();
        commit("B");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // commit is stable enough; onChoose is the real dep via closure.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChoose, pressed]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-[75vh] flex flex-col"
    >
      <div className="flex items-end justify-between gap-6 mb-6">
        <ProgressRail current={progress} total={QUESTIONS.length} />
        <MiniConstellation scores={runningScores} highlight={lastCluster} />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.19, 1, 0.22, 1] }}
          >
            <motion.p
              className="font-mono text-kicker tracking-kicker uppercase text-muted text-center mb-7"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
            >
              {frame}
            </motion.p>

            <motion.div
              className="grid gap-4 sm:grid-cols-2 sm:gap-5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.12,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <ChoiceCard
                label="A"
                text={q.a.text}
                onClick={() => commit("A")}
                pressed={pressed === "A"}
                dimmed={pressed === "B"}
              />
              <ChoiceCard
                label="B"
                text={q.b.text}
                onClick={() => commit("B")}
                pressed={pressed === "B"}
                dimmed={pressed === "A"}
              />
            </motion.div>

            <p className="mt-10 text-center font-serif italic text-xs text-text-secondary/55">
              Pick the one that&rsquo;s truer right now.
            </p>
            <div className="mt-3 hidden sm:flex items-center justify-center gap-2 font-mono text-kicker tracking-kicker uppercase text-muted/55">
              <Kbd>A</Kbd>
              <Kbd>1</Kbd>
              <Kbd>&larr;</Kbd>
              <span className="mx-1 text-muted/45">or</span>
              <Kbd>B</Kbd>
              <Kbd>2</Kbd>
              <Kbd>&rarr;</Kbd>
            </div>
            <p className="mt-4 text-center font-serif italic text-xs text-text-secondary/45">
              No back &mdash; trust the first read.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function ChoiceCard({
  label,
  text,
  onClick,
  pressed,
  dimmed,
}: {
  label: string;
  text: string;
  onClick: () => void;
  pressed: boolean;
  dimmed: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={pressed || dimmed}
      animate={{
        opacity: dimmed ? 0.22 : 1,
        scale: pressed ? 0.985 : 1,
      }}
      transition={{ duration: 0.26, ease: "easeOut" }}
      className="group relative overflow-hidden w-full text-left rounded-sm border border-surface-light/50 px-6 py-7 sm:px-7 sm:py-10 min-h-[128px] transition-all duration-500 hover:border-gold/55 hover:bg-gold/[0.04] focus:outline-none focus-visible:border-gold shadow-[0_0_0_rgba(212,175,55,0)] hover:shadow-[0_0_32px_rgba(212,175,55,0.18)] disabled:cursor-default"
    >
      {/* Breathing halo on the inner border — only visible on hover/focus */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500 animate-breathe-subtle"
        style={{
          boxShadow: "inset 0 0 18px rgba(212,175,55,0.10)",
        }}
      />

      {/* Press sweep — gold diagonal that crosses the card on click */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{ x: pressed ? "220%" : "-120%" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="pointer-events-none absolute inset-y-0 w-1/2"
        style={{
          background:
            "linear-gradient(100deg, transparent 0%, rgba(212,175,55,0.28) 50%, transparent 100%)",
          transform: "skewX(-12deg)",
        }}
      />

      <span className="relative z-10 inline-flex items-center gap-2 mb-3">
        <Kbd>{label}</Kbd>
      </span>
      <span className="relative z-10 block font-serif text-h3 sm:text-2xl leading-snug text-text-primary group-hover:text-text-primary">
        {text}
      </span>
    </motion.button>
  );
}

function ProgressRail({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const counter = `${String(Math.min(current + 1, total)).padStart(2, "0")} / ${total}`;
  const pct = current / total;
  return (
    <div
      className="flex-1"
      aria-label={`Question ${Math.min(current + 1, total)} of ${total}`}
    >
      <p className="font-mono text-kicker tracking-kicker uppercase text-muted/70 mb-2">
        {counter}
      </p>
      <div className="relative h-3">
        {/* Track line */}
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
          style={{
            background: "var(--color-surface-light)",
            opacity: 0.5,
          }}
        />
        {/* Gold fill */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-px origin-left"
          style={{ background: "var(--color-gold)", opacity: 0.5 }}
          initial={false}
          animate={{ scaleX: pct }}
          transition={{ duration: 0.32, ease: "easeOut" }}
        />
        {/* Dots */}
        <div className="relative flex items-center justify-between h-full">
          {Array.from({ length: total }).map((_, i) => {
            const done = i < current;
            const active = i === current;
            return (
              <motion.span
                key={i}
                aria-hidden
                className="block h-1.5 rounded-full"
                initial={false}
                animate={{
                  width: active ? 18 : 6,
                  backgroundColor:
                    done || active
                      ? "var(--color-gold)"
                      : "var(--color-surface-light)",
                  opacity: active ? [0.65, 1, 0.65] : done ? 0.6 : 1,
                }}
                transition={{
                  width: { duration: 0.25, ease: "easeOut" },
                  backgroundColor: { duration: 0.25 },
                  opacity: active
                    ? {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : { duration: 0.25 },
                }}
              />
            );
          })}
        </div>
      </div>
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

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <HeadlineBloom labels={dominantLabels} isShared={isShared} />

      <ConstellationChart scores={scores} dominant={dominant} />

      <HermeneuticCaveat variant="inline" className="text-center mt-8 mb-12" />

      <div className="space-y-10">
        {dominant.map((id, i) => (
          <ClusterBlock
            key={id}
            clusterId={id}
            score={scores[id]}
            revealDelay={500 + i * 140}
          />
        ))}
      </div>

      {quiet.length > 0 && <QuietEnergies ids={quiet} />}

      <ExploreFooter
        shareCode={shareCode}
        isShared={isShared}
        dominantLabels={dominantLabels}
      />
    </motion.section>
  );
}

function HeadlineBloom({
  labels,
  isShared,
}: {
  labels: string[];
  isShared: boolean;
}) {
  const reduced = useReducedMotion() ?? false;
  const words = labels.length ? labels : ["A quiet field"];

  return (
    <header className="text-center mb-10">
      <p className="font-mono text-kicker tracking-kicker uppercase text-muted mb-3">
        {isShared ? "Their energy right now" : "Your energy right now"}
      </p>
      <h1
        className="font-serif text-h1 leading-display glow-text-subtle text-gold"
        aria-live="polite"
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block">
            <motion.span
              className="inline-block"
              initial={reduced ? false : { opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: reduced ? 0 : 0.2 + i * 0.2,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 && (
              <span className="opacity-50 mx-2">·</span>
            )}
          </span>
        ))}
      </h1>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// Constellation SVG
// ─────────────────────────────────────────────────────────────

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
  const reduced = useReducedMotion() ?? false;
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

  // Reveal timings (seconds). With reduced motion, everything lands at t=0.
  const T_RING = 0.0;
  const T_SPOKE = 0.6;
  const T_QUIET = 1.1;
  const T_MID = 1.35;
  const T_DOM = 1.6;
  const T_POLY = 2.0;
  const d = (t: number) => (reduced ? 0 : t);

  return (
    <div className="mx-auto w-full max-w-[480px]">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="Your archetypal energy constellation"
        className="w-full h-auto"
      >
        <motion.g layoutId="mirror-constellation-ring">
          {/* Guide rings at full, 2/3, 1/3 — drawn outer → inner */}
          {[1, 0.67, 0.34].map((t, i) => (
            <motion.circle
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
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.32, delay: d(T_RING + i * 0.18) }}
            />
          ))}

          {/* Faint spokes — stroke-draw in angular order */}
          {positions.map((p, i) => (
            <motion.line
              key={`spoke-${p.id}`}
              x1={CX}
              y1={CY}
              x2={CX + Math.cos(p.angle) * OUTER_R}
              y2={CY + Math.sin(p.angle) * OUTER_R}
              stroke="currentColor"
              strokeOpacity={0.05}
              strokeWidth={0.5}
              className="text-muted"
              initial={reduced ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.42,
                delay: d(T_SPOKE + i * 0.04),
                ease: "easeOut",
              }}
            />
          ))}

          {/* Dominant polygon — the "figure" of the constellation */}
          {dominantPath && (
            <motion.path
              d={dominantPath}
              fill="var(--color-gold)"
              stroke="var(--color-gold)"
              strokeWidth={1}
              initial={
                reduced
                  ? false
                  : { pathLength: 0, fillOpacity: 0, strokeOpacity: 0 }
              }
              animate={{
                pathLength: 1,
                fillOpacity: 0.06,
                strokeOpacity: 0.5,
              }}
              transition={{
                pathLength: {
                  duration: 0.85,
                  delay: d(T_POLY),
                  ease: "easeOut",
                },
                fillOpacity: {
                  duration: 0.45,
                  delay: d(T_POLY + 0.7),
                  ease: "easeOut",
                },
                strokeOpacity: {
                  duration: 0.35,
                  delay: d(T_POLY),
                  ease: "easeOut",
                },
              }}
            />
          )}

          {/* Nodes — 3 waves: quiet, mid, dominant */}
          {positions.map((p) => {
            const isDominant = dominantSet.has(p.id);
            const isQuiet = p.score === 0;
            const nodeR = 3 + p.score * 2.4;
            const delay = isQuiet
              ? d(T_QUIET)
              : isDominant
                ? d(T_DOM)
                : d(T_MID);
            const opacity = isQuiet ? 0.3 : isDominant ? 1 : 0.72;

            return (
              <motion.g
                key={p.id}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity }}
                transition={{ duration: 0.32, delay, ease: "easeOut" }}
              >
                {isDominant && (
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    fill="var(--color-gold)"
                    fillOpacity={0.18}
                    initial={reduced ? false : { r: 0 }}
                    animate={{ r: nodeR + 7 }}
                    transition={{
                      duration: 0.55,
                      delay: delay + 0.12,
                      ease: [0.19, 1.28, 0.22, 1],
                    }}
                  />
                )}
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  fill={
                    isDominant
                      ? "var(--color-gold)"
                      : "var(--color-text-secondary)"
                  }
                  initial={reduced ? false : { r: 0 }}
                  animate={{ r: nodeR }}
                  transition={{
                    duration: 0.42,
                    delay,
                    ease: isDominant
                      ? [0.19, 1.28, 0.22, 1]
                      : "easeOut",
                  }}
                />
              </motion.g>
            );
          })}

          {/* Labels — fade in with each node wave */}
          {positions.map((p) => {
            const isDominant = dominantSet.has(p.id);
            const cosA = Math.cos(p.angle);
            const anchor =
              Math.abs(cosA) < 0.22 ? "middle" : cosA > 0 ? "start" : "end";
            const short = CLUSTER_INTERPRETATIONS[p.id].short;
            const isQuiet = p.score === 0;
            const delay = isQuiet
              ? d(T_QUIET + 0.15)
              : isDominant
                ? d(T_DOM + 0.15)
                : d(T_MID + 0.15);
            const finalOpacity = isDominant ? 1 : isQuiet ? 0.4 : 0.7;

            return (
              <motion.text
                key={`label-${p.id}`}
                x={p.labelX}
                y={p.labelY}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontFamily="var(--font-mono)"
                fontSize={9.5}
                letterSpacing="0.16em"
                fill={isDominant ? "var(--color-gold)" : "currentColor"}
                className="text-text-secondary uppercase"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: finalOpacity }}
                transition={{ duration: 0.32, delay }}
              >
                {short.toUpperCase()}
              </motion.text>
            );
          })}
        </motion.g>
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
  const reduced = useReducedMotion() ?? false;
  const interp = CLUSTER_INTERPRETATIONS[clusterId];
  const cluster = CLUSTERS.find((c) => c.id === clusterId);
  const maxOfferings = CLUSTER_MAX_OFFERINGS[clusterId] ?? 1;

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
    <motion.article
      className="rounded-sm border border-gold/25 px-6 py-7 md:px-9 md:py-10 transition-colors duration-500 hover:border-gold/45"
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: reduced ? 0 : revealDelay / 1000,
        ease: [0.19, 1, 0.22, 1],
      }}
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <p className="font-mono text-kicker tracking-kicker uppercase text-gold/85">
          {interp.short}
        </p>
        <div className="flex items-center gap-2">
          <span className="font-mono text-kicker tracking-kicker uppercase text-muted/60">
            Weight
          </span>
          <TickBar filled={score} total={maxOfferings} />
        </div>
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
              const { accent, name: systemName } = systemAccent(
                entry.system as SystemId,
              );
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
                        <ConfidenceBadge
                          tier={entry.confidence}
                          color={accent}
                        />
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
    </motion.article>
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
            className="font-serif text-body text-text-secondary/75 leading-snug flex items-start gap-2.5"
          >
            <span
              aria-hidden
              className="mt-[0.65em] block h-1 w-1 rounded-full bg-text-secondary/35 shrink-0 animate-breathe-subtle"
            />
            <span>{CLUSTER_INTERPRETATIONS[id].quiet}</span>
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
      window.setTimeout(() => setCopied(false), 2400);
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
            className="relative font-mono text-label tracking-kicker uppercase border border-gold px-5 py-2.5 rounded-sm text-gold transition-all duration-300 hover:bg-gold/10 shadow-[0_0_20px_rgba(212,175,55,0.16)] hover:shadow-[0_0_32px_rgba(212,175,55,0.36)]"
          >
            Take your own mirror →
          </Link>
        ) : (
          <motion.button
            type="button"
            onClick={handleShare}
            animate={{
              boxShadow: copied
                ? "0 0 36px rgba(212,175,55,0.42)"
                : "0 0 0 rgba(212,175,55,0)",
            }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative font-mono text-label tracking-kicker uppercase border px-5 py-2.5 rounded-sm text-gold transition-colors duration-300 border-gold/40 hover:border-gold hover:bg-gold/5"
            aria-live="polite"
          >
            <span className="inline-flex items-center gap-2">
              {copied ? (
                <>
                  <span>Link copied</span>
                  <svg
                    viewBox="0 0 12 12"
                    width={12}
                    height={12}
                    aria-hidden
                  >
                    <motion.path
                      d="M2 6 L5 9 L10 3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                    />
                  </svg>
                </>
              ) : (
                <>Share this mirror &rarr;</>
              )}
            </span>
          </motion.button>
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
