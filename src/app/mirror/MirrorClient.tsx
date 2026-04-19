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
  CLUSTER_INTERPRETATIONS,
  encodeResultPath,
  readingName,
  scoreChoices,
  topClusters,
  quietClusters,
  type Choice,
  type MirrorClusterId,
  type MirrorQuestion,
} from "@/data/mirror-questions";
import {
  createSession,
  type MirrorSession,
} from "@/lib/mirror-session";
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

// How many times each cluster can be picked across the questions in a
// given session. Sizes the per-cluster weight tick bar honestly for any
// stratified sample from the pool, not just the original fixed 12.
function computeMaxOfferings(
  questions: MirrorQuestion[],
): Record<MirrorClusterId, number> {
  const counts = Object.fromEntries(
    LAYOUT_ORDER.map((id) => [id, 0]),
  ) as Record<MirrorClusterId, number>;
  for (const q of questions) {
    counts[q.a.cluster] += 1;
    counts[q.b.cluster] += 1;
  }
  return counts;
}

// Per-cluster thematic hues. Each energy gets its own color so the
// constellation reads as a field of distinct archetypal tones rather
// than a single gold glyph. Tuned to sit quietly on the dark canvas.
const CLUSTER_COLOR: Record<MirrorClusterId, string> = {
  sovereign: "#E0C065",
  warrior: "#D6614A",
  "sage-magician": "#9B87C4",
  lover: "#E08597",
  innocent: "#EADBA8",
  explorer: "#5DB8A0",
  rebel: "#B64558",
  creator: "#E89B4F",
  jester: "#F0C555",
  caregiver: "#8AB876",
  everyman: "#C3A07D",
  "death-rebirth": "#7E5BA0",
  teacher: "#7FA2CC",
  "liminal-territory": "#ADA0C6",
};

type Phase = "intro" | "sort" | "result";

interface Props {
  initialSession: MirrorSession | null;
  initialChoices: Choice[] | null;
}

export default function MirrorClient({ initialSession, initialChoices }: Props) {
  const [session, setSession] = useState<MirrorSession | null>(initialSession);
  const [choices, setChoices] = useState<Choice[]>(initialChoices ?? []);
  const [phase, setPhase] = useState<Phase>(
    initialSession && initialChoices ? "result" : "intro",
  );
  // The viewer arrived at a pre-populated result (shared link) rather than
  // completing the sort themselves. Use this to offer a path into the flow.
  const isShared = initialSession !== null && initialChoices !== null;

  function handleBegin() {
    // Defer seed generation to this moment so every Begin click starts a
    // fresh reading, and so SSR never ships a random seed in the HTML.
    const active = session ?? createSession();
    if (!session) setSession(active);
    setPhase("sort");
  }

  function handleChoose(choice: Choice) {
    if (!session) return;
    const next = [...choices, choice];
    setChoices(next);
    if (next.length >= session.questions.length) {
      try {
        // Swap the URL in place to the canonical path-based reading. No
        // server round-trip — the result is already rendered client-side,
        // but reload / bookmark / copy-url now all yield the stable URL.
        const path = `/mirror/r/${encodeResultPath(next, session.seed)}`;
        window.history.replaceState({}, "", path);
      } catch {}
      setPhase("result");
    }
  }

  return (
    <LayoutGroup>
      {phase === "intro" && <MirrorIntro onBegin={handleBegin} />}
      {phase === "sort" && session && (
        <MirrorSort
          onChoose={handleChoose}
          choices={choices}
          session={session}
        />
      )}
      {phase === "result" && session && choices.length === session.questions.length && (
        <MirrorResult
          choices={choices}
          session={session}
          isShared={isShared}
        />
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

// The seed ring lives behind the intro heading — a ghost of the eventual
// result constellation. Full scaffold (3 guide rings, 14 spokes, 14 nodes
// at their real angular positions) with each node carrying its cluster
// hue at low opacity. Teases structure and palette without spoiling the
// reading. Shares `layoutId` with the result chart so the same object
// carries through the whole flow.
function SeedRing({ reduced }: { reduced: boolean }) {
  const w = 520;
  const h = 480;
  const cx = w / 2;
  const cy = h / 2;
  const innerR = 34;
  const outerR = 150;
  return (
    <motion.svg
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden
      className="text-muted w-full max-w-[480px] h-auto overflow-visible"
      animate={reduced ? undefined : breath(12)}
    >
      <motion.g layoutId="mirror-constellation-ring">
        {[1, 0.67, 0.34].map((t, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={innerR + t * (outerR - innerR)}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.08}
            strokeWidth={0.5}
            strokeDasharray="2 4"
          />
        ))}
        {LAYOUT_ORDER.map((id, i) => {
          const angle = -Math.PI / 2 + (i / LAYOUT_ORDER.length) * Math.PI * 2;
          const x = cx + Math.cos(angle) * outerR;
          const y = cy + Math.sin(angle) * outerR;
          const color = CLUSTER_COLOR[id];
          return (
            <g key={id}>
              <line
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeOpacity={0.04}
                strokeWidth={0.5}
              />
              <motion.circle
                cx={x}
                cy={y}
                r={2.6}
                fill={color}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 0.38 }}
                transition={{
                  duration: 0.85,
                  delay: reduced ? 0 : 0.2 + i * 0.045,
                  ease: "easeOut",
                }}
                style={{ filter: `drop-shadow(0 0 3px ${color}55)` }}
              />
            </g>
          );
        })}
      </motion.g>
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
  color,
}: {
  filled: number;
  total: number;
  color?: string;
}) {
  const filledColor = color ?? "var(--color-gold)";
  return (
    <div className="flex items-center gap-[3px]" aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="block h-[4px] w-[8px] rounded-[1px]"
          style={{
            background: i < filled ? filledColor : "var(--color-surface-light)",
            opacity: i < filled ? 0.9 : 0.55,
            boxShadow: i < filled && color ? `0 0 6px ${color}66` : "none",
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
        className="pointer-events-none absolute inset-x-0 -top-16 sm:-top-24 flex justify-center"
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
          Eleven forced choices, under a minute or two. No neutral option, no
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
  session,
}: {
  onChoose: (c: Choice) => void;
  choices: Choice[];
  session: MirrorSession;
}) {
  const [pressed, setPressed] = useState<Choice | null>(null);
  const questions = session.questions;
  const flips = session.flips;
  const total = questions.length;
  const progress = choices.length;
  const index = Math.min(progress, total - 1);
  const rawQ = questions[index];
  const flipped = flips[index];
  // Flip A/B at the render layer so the visual "A" always maps to the
  // left card. Scoring reconstructs the original orientation via `flips`.
  const q: MirrorQuestion = flipped
    ? { frame: rawQ.frame, a: rawQ.b, b: rawQ.a }
    : rawQ;
  const frame = q.frame;

  // Running cluster scores for the mini-constellation. Honours the
  // per-question flip so the mini chart lights up the real cluster.
  const runningScores = useMemo(() => {
    const s = Object.fromEntries(
      LAYOUT_ORDER.map((id) => [id, 0]),
    ) as Record<MirrorClusterId, number>;
    for (let i = 0; i < choices.length; i++) {
      const raw = questions[i];
      const resolved: Choice = flips[i]
        ? choices[i] === "A"
          ? "B"
          : "A"
        : choices[i];
      const pick = resolved === "A" ? raw.a : raw.b;
      s[pick.cluster] += 1;
    }
    return s;
  }, [choices, questions, flips]);

  const lastCluster = useMemo<MirrorClusterId | null>(() => {
    if (choices.length === 0) return null;
    const i = choices.length - 1;
    const raw = questions[i];
    const resolved: Choice = flips[i]
      ? choices[i] === "A"
        ? "B"
        : "A"
      : choices[i];
    return resolved === "A" ? raw.a.cluster : raw.b.cluster;
  }, [choices, questions, flips]);

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
        <ProgressRail current={progress} total={total} />
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
              className="font-mono text-[13px] sm:text-kicker tracking-[0.14em] sm:tracking-kicker uppercase text-text-primary text-center mb-5 sm:mb-7"
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
      className="group relative overflow-hidden w-full text-left rounded-sm border border-surface-light/50 px-5 py-5 sm:px-7 sm:py-10 min-h-[88px] sm:min-h-[128px] transition-all duration-500 hover:border-gold/55 hover:bg-gold/[0.04] focus:outline-none focus-visible:border-gold shadow-[0_0_0_rgba(212,175,55,0)] hover:shadow-[0_0_32px_rgba(212,175,55,0.18)] disabled:cursor-default"
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

      <span className="relative z-10 flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:gap-0">
        <span className="inline-flex items-center shrink-0 sm:mb-3">
          <Kbd>{label}</Kbd>
        </span>
        <span className="block font-serif text-h3 sm:text-2xl leading-snug text-text-primary group-hover:text-text-primary">
          {text}
        </span>
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
  session,
  isShared,
}: {
  choices: Choice[];
  session: MirrorSession;
  isShared: boolean;
}) {
  const scores = useMemo(
    () => scoreChoices(choices, session.questions, session.flips),
    [choices, session],
  );
  const dominant = useMemo(() => topClusters(scores, 3), [scores]);
  const quiet = useMemo(
    () => quietClusters(scores, session.questions),
    [scores, session],
  );
  const sharePath = useMemo(
    () => `/mirror/r/${encodeResultPath(choices, session.seed)}`,
    [choices, session],
  );
  const maxOfferings = useMemo(
    () => computeMaxOfferings(session.questions),
    [session],
  );
  // Two-layer state: `hovered` is ephemeral (pointer-in), `pinned` is a click.
  // Display uses hovered first so rolling across nodes feels responsive, but
  // clicking pins the info card so the "Read more" link is reachable.
  const [hovered, setHovered] = useState<MirrorClusterId | null>(null);
  const [pinned, setPinned] = useState<MirrorClusterId | null>(null);
  const active = hovered ?? pinned;

  const dominantLabels = dominant.map((id) => CLUSTER_INTERPRETATIONS[id].short);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <HeadlineBloom dominant={dominant} isShared={isShared} />

      <ConstellationChart
        scores={scores}
        dominant={dominant}
        activeId={active}
        maxOfferings={maxOfferings}
        onHover={setHovered}
        onPin={(id) => setPinned((prev) => (prev === id ? null : id))}
        onClear={() => {
          setHovered(null);
          setPinned(null);
        }}
      />

      <ConstellationInfo
        activeId={active}
        scores={scores}
        dominant={dominant}
        maxOfferings={maxOfferings}
      />

      <HermeneuticCaveat variant="inline" className="text-center mt-8 mb-12" />

      <p className="sr-only">Dominant energies: {dominantLabels.join(", ")}</p>

      <div className="space-y-10">
        {dominant.map((id, i) => (
          <ClusterBlock
            key={id}
            clusterId={id}
            score={scores[id]}
            maxOfferings={maxOfferings[id] ?? 1}
            revealDelay={500 + i * 140}
          />
        ))}
      </div>

      {quiet.length > 0 && <QuietEnergies ids={quiet} />}

      <ExploreFooter
        sharePath={sharePath}
        isShared={isShared}
        dominantLabels={dominantLabels}
      />
    </motion.section>
  );
}

function HeadlineBloom({
  dominant,
  isShared,
}: {
  dominant: MirrorClusterId[];
  isShared: boolean;
}) {
  const reduced = useReducedMotion() ?? false;
  const name = readingName(dominant);

  // Name words — the h1. Each word gets its cluster hue and glow. The quiet
  // fallback renders the whole display string as a single gold token.
  const nameWords = name.parts.length
    ? name.parts.map((p, i) => ({
        key: `${p.clusterId}-${i}`,
        word: p.word,
        color: CLUSTER_COLOR[p.clusterId],
      }))
    : [{ key: "quiet", word: name.display, color: "var(--color-gold)" }];

  // Subtitle — the cluster labels underneath, dot-separated, so the name
  // doesn't read as cryptic. Takes the full top three (not just the two in
  // the name) so the diagnostic matches the constellation below.
  const subtitle = dominant.map((id) => ({
    key: id as string,
    label: CLUSTER_INTERPRETATIONS[id].short,
    color: CLUSTER_COLOR[id],
  }));

  return (
    <header className="text-center mb-10">
      <p className="font-mono text-kicker tracking-kicker uppercase text-muted mb-3">
        {isShared ? "Their energy right now" : "Your energy right now"}
      </p>
      <h1
        className="font-serif text-h1 leading-display"
        aria-live="polite"
      >
        {nameWords.map((p, i) => (
          <span key={p.key} className="inline-block">
            <motion.span
              className="inline-block"
              style={{
                color: p.color,
                textShadow: `0 0 32px ${p.color}66, 0 0 14px ${p.color}33`,
              }}
              initial={reduced ? false : { opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: reduced ? 0 : 0.2 + i * 0.25,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              {p.word}
            </motion.span>
            {i < nameWords.length - 1 && (
              <motion.span
                className="inline-block italic mx-2 text-text-secondary/50"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{
                  duration: 0.5,
                  delay: reduced ? 0 : 0.2 + i * 0.25 + 0.15,
                }}
              >
                &amp;
              </motion.span>
            )}
          </span>
        ))}
      </h1>
      {subtitle.length > 0 && (
        <motion.p
          className="font-mono text-kicker tracking-kicker uppercase mt-4"
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: reduced ? 0 : 0.2 + nameWords.length * 0.25 + 0.2,
            ease: [0.19, 1, 0.22, 1],
          }}
        >
          {subtitle.map((p, i) => (
            <span key={`${p.key}-sub`} className="inline-block">
              <span style={{ color: p.color }} className="opacity-80">
                {p.label}
              </span>
              {i < subtitle.length - 1 && (
                <span className="opacity-30 mx-2 text-text-secondary">·</span>
              )}
            </span>
          ))}
        </motion.p>
      )}
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
  activeId,
  maxOfferings,
  onHover,
  onPin,
  onClear,
}: {
  scores: Record<MirrorClusterId, number>;
  dominant: MirrorClusterId[];
  activeId: MirrorClusterId | null;
  maxOfferings: Record<MirrorClusterId, number>;
  onHover: (id: MirrorClusterId | null) => void;
  onPin: (id: MirrorClusterId) => void;
  onClear: () => void;
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

  // Each edge of the dominant polygon gets its own linearGradient blending
  // the two endpoint colors, so the connecting lines read as threads between
  // the distinct archetypal hues rather than a single gold triangle.
  const dominantEdges: Array<{
    from: (typeof positions)[number];
    to: (typeof positions)[number];
    gradientId: string;
  }> = [];
  if (dominantPositions.length >= 2) {
    for (let i = 0; i < dominantPositions.length; i++) {
      if (dominantPositions.length < 3 && i === dominantPositions.length - 1) break;
      const from = dominantPositions[i];
      const to = dominantPositions[(i + 1) % dominantPositions.length];
      dominantEdges.push({
        from,
        to,
        gradientId: `mirror-edge-${from.id}-${to.id}`,
      });
    }
  }

  const centroid =
    dominantPositions.length >= 3
      ? {
          x:
            dominantPositions.reduce((s, p) => s + p.x, 0) /
            dominantPositions.length,
          y:
            dominantPositions.reduce((s, p) => s + p.y, 0) /
            dominantPositions.length,
        }
      : null;

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

  function handleWrapperClick(e: React.MouseEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("[data-cluster-node]")) return;
    onClear();
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[520px] select-none"
      onClick={handleWrapperClick}
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="Your archetypal energy constellation"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          {dominantEdges.map((edge) => (
            <linearGradient
              key={edge.gradientId}
              id={edge.gradientId}
              x1={edge.from.x}
              y1={edge.from.y}
              x2={edge.to.x}
              y2={edge.to.y}
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor={CLUSTER_COLOR[edge.from.id]}
                stopOpacity={0.85}
              />
              <stop
                offset="100%"
                stopColor={CLUSTER_COLOR[edge.to.id]}
                stopOpacity={0.85}
              />
            </linearGradient>
          ))}
          {centroid && dominantPositions.length >= 3 && (
            <radialGradient
              id="mirror-polygon-fill"
              cx={centroid.x}
              cy={centroid.y}
              r={OUTER_R}
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor={CLUSTER_COLOR[dominantPositions[0].id]}
                stopOpacity={0.18}
              />
              <stop
                offset="55%"
                stopColor={CLUSTER_COLOR[dominantPositions[1].id]}
                stopOpacity={0.10}
              />
              <stop
                offset="100%"
                stopColor={CLUSTER_COLOR[dominantPositions[2].id]}
                stopOpacity={0.03}
              />
            </radialGradient>
          )}
        </defs>

        <motion.g layoutId="mirror-constellation-ring">
          {/* Guide rings */}
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

          {/* Spokes */}
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

          {/* Polygon interior — soft radial blend of dominant hues */}
          {dominantPath && dominantPositions.length >= 3 && (
            <motion.path
              d={dominantPath}
              fill="url(#mirror-polygon-fill)"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: d(T_POLY + 0.5),
                ease: "easeOut",
              }}
            />
          )}

          {/* Polygon edges — each a gradient between its two endpoint hues */}
          {dominantEdges.map((edge, i) => (
            <motion.line
              key={edge.gradientId}
              x1={edge.from.x}
              y1={edge.from.y}
              x2={edge.to.x}
              y2={edge.to.y}
              stroke={`url(#${edge.gradientId})`}
              strokeWidth={1.4}
              strokeLinecap="round"
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{
                pathLength: {
                  duration: 0.7,
                  delay: d(T_POLY + i * 0.14),
                  ease: "easeOut",
                },
                opacity: {
                  duration: 0.4,
                  delay: d(T_POLY + i * 0.14),
                  ease: "easeOut",
                },
              }}
            />
          ))}

          {/* Nodes — each is an interactive tap target colored by cluster */}
          {positions.map((p) => {
            const isDominant = dominantSet.has(p.id);
            const isQuiet = p.score === 0;
            const isActive = activeId === p.id;
            const color = CLUSTER_COLOR[p.id];
            const nodeR = 3 + p.score * 2.4;
            const delay = isQuiet
              ? d(T_QUIET)
              : isDominant
                ? d(T_DOM)
                : d(T_MID);
            const baseOpacity = isQuiet ? 0.42 : isDominant ? 1 : 0.78;

            return (
              <motion.g
                key={p.id}
                data-cluster-node={p.id}
                role="button"
                tabIndex={0}
                aria-label={`${CLUSTER_INTERPRETATIONS[p.id].short} — weight ${p.score} of ${maxOfferings[p.id] ?? 0}`}
                aria-pressed={isActive}
                onClick={(e) => {
                  e.stopPropagation();
                  onPin(p.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onPin(p.id);
                  }
                }}
                onMouseEnter={() => onHover(p.id)}
                onMouseLeave={() => onHover(null)}
                onFocus={() => onHover(p.id)}
                onBlur={() => onHover(null)}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: baseOpacity }}
                transition={{ duration: 0.32, delay, ease: "easeOut" }}
                className="cursor-pointer focus:outline-none"
                style={{ touchAction: "manipulation" }}
              >
                {/* Oversized invisible hit area — ~44px on mobile */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={20}
                  fill="transparent"
                />
                {/* Outer aura — only dominant or active */}
                {(isDominant || isActive) && (
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    fill={color}
                    initial={reduced ? false : { r: 0, fillOpacity: 0 }}
                    animate={{
                      r: nodeR + (isActive ? 13 : 8),
                      fillOpacity: reduced
                        ? isActive
                          ? 0.28
                          : 0.18
                        : isActive
                          ? [0.3, 0.22, 0.3]
                          : [0.22, 0.14, 0.22],
                    }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : {
                            r: {
                              duration: 0.55,
                              delay: isActive ? 0 : delay + 0.12,
                              ease: [0.19, 1.28, 0.22, 1],
                            },
                            fillOpacity: {
                              duration: 3.6,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }
                    }
                  />
                )}
                {/* Node core */}
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  fill={isQuiet ? "var(--color-text-secondary)" : color}
                  fillOpacity={isQuiet ? 0.7 : 1}
                  initial={reduced ? false : { r: 0 }}
                  animate={{ r: isActive ? nodeR + 1.8 : nodeR }}
                  transition={{
                    duration: 0.42,
                    delay: isActive ? 0 : delay,
                    ease: isDominant
                      ? [0.19, 1.28, 0.22, 1]
                      : "easeOut",
                  }}
                  style={{
                    filter:
                      isDominant || isActive
                        ? `drop-shadow(0 0 4px ${color})`
                        : undefined,
                  }}
                />
                {/* Focus / active ring */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={nodeR + 4.5}
                  fill="none"
                  stroke={color}
                  strokeOpacity={isActive ? 0.7 : 0}
                  strokeWidth={0.9}
                  style={{ transition: "stroke-opacity 220ms ease" }}
                />
              </motion.g>
            );
          })}
        </motion.g>
      </svg>

      {/* HTML label overlay — keeps text at real pixel sizes on mobile */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {positions.map((p) => {
          const isDominant = dominantSet.has(p.id);
          const isQuiet = p.score === 0;
          const isActive = activeId === p.id;
          const color = CLUSTER_COLOR[p.id];
          const short = CLUSTER_INTERPRETATIONS[p.id].short;
          const leftPct = (p.labelX / VIEW_W) * 100;
          const topPct = (p.labelY / VIEW_H) * 100;
          const cosA = Math.cos(p.angle);
          const anchor =
            Math.abs(cosA) < 0.22
              ? "translate(-50%, -50%)"
              : cosA > 0
                ? "translate(0%, -50%)"
                : "translate(-100%, -50%)";
          const delay = isQuiet
            ? d(T_QUIET + 0.15)
            : isDominant
              ? d(T_DOM + 0.15)
              : d(T_MID + 0.15);
          const finalOpacity = isActive
            ? 1
            : isDominant
              ? 0.95
              : isQuiet
                ? 0.45
                : 0.72;
          const useColor = isDominant || isActive;

          return (
            <motion.span
              key={`label-${p.id}`}
              className="absolute font-mono text-[9px] sm:text-[10px] tracking-[0.18em] uppercase whitespace-nowrap"
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform: anchor,
                color: useColor ? color : "var(--color-text-secondary)",
                textShadow: useColor ? `0 0 10px ${color}66` : "none",
              }}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: finalOpacity }}
              transition={{ duration: 0.32, delay }}
            >
              {short}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

// Info card shown below the constellation. Pops in when the viewer
// hovers / taps / focuses a node — gives a one-line read of that
// energy plus a link into the full block for dominant clusters.
function ConstellationInfo({
  activeId,
  scores,
  dominant,
  maxOfferings,
}: {
  activeId: MirrorClusterId | null;
  scores: Record<MirrorClusterId, number>;
  dominant: MirrorClusterId[];
  maxOfferings: Record<MirrorClusterId, number>;
}) {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="mt-5 min-h-[108px] sm:min-h-[96px]">
      <AnimatePresence mode="wait">
        {activeId ? (
          <ActiveClusterCard
            key={activeId}
            id={activeId}
            score={scores[activeId] ?? 0}
            maxOfferings={maxOfferings[activeId] ?? 1}
            isDominant={dominant.includes(activeId)}
            reduced={reduced}
          />
        ) : (
          <motion.p
            key="hint"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="text-center font-serif italic text-sm text-text-secondary/55"
          >
            Tap or hover a star to read what it&rsquo;s saying.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActiveClusterCard({
  id,
  score,
  maxOfferings,
  isDominant,
  reduced,
}: {
  id: MirrorClusterId;
  score: number;
  maxOfferings: number;
  isDominant: boolean;
  reduced: boolean;
}) {
  const interp = CLUSTER_INTERPRETATIONS[id];
  const color = CLUSTER_COLOR[id];
  const isQuiet = score === 0;
  const firstSentence = interp.body.split(/(?<=\.)\s+/)[0] ?? interp.body;

  function handleJump(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = document.getElementById(`cluster-${id}`);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    }
  }

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.26, ease: "easeOut" }}
      className="mx-auto max-w-xl rounded-sm border px-5 py-4"
      style={{
        borderColor: `${color}55`,
        background: `linear-gradient(180deg, ${color}12, transparent 70%)`,
      }}
    >
      <div className="flex items-center justify-between gap-4 mb-2">
        <span className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-2 w-2 rounded-full"
            style={{ background: color, boxShadow: `0 0 10px ${color}99` }}
          />
          <span
            className="font-mono text-kicker tracking-kicker uppercase"
            style={{ color }}
          >
            {interp.short}
          </span>
        </span>
        <span className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-kicker tracking-kicker uppercase text-muted/60">
            weight
          </span>
          <TickBar filled={score} total={maxOfferings} color={color} />
        </span>
      </div>
      <p className="font-serif text-sm sm:text-body leading-snug text-text-secondary/90">
        {isQuiet ? interp.quiet : firstSentence}
      </p>
      {isDominant && (
        <a
          href={`#cluster-${id}`}
          onClick={handleJump}
          className="mt-3 inline-block font-mono text-kicker tracking-kicker uppercase transition-opacity hover:opacity-80"
          style={{ color }}
        >
          Read more &darr;
        </a>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Per-cluster interpretation block
// ─────────────────────────────────────────────────────────────

function ClusterBlock({
  clusterId,
  score,
  maxOfferings,
  revealDelay = 0,
}: {
  clusterId: MirrorClusterId;
  score: number;
  maxOfferings: number;
  revealDelay?: number;
}) {
  const reduced = useReducedMotion() ?? false;
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

  const color = CLUSTER_COLOR[clusterId];

  return (
    <motion.article
      id={`cluster-${clusterId}`}
      className="scroll-mt-24 rounded-sm border px-6 py-7 md:px-9 md:py-10 transition-colors duration-500"
      style={{
        borderColor: `${color}40`,
        background: `linear-gradient(180deg, ${color}08, transparent 40%)`,
      }}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: reduced ? 0 : revealDelay / 1000,
        ease: [0.19, 1, 0.22, 1],
      }}
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <p
          className="font-mono text-kicker tracking-kicker uppercase flex items-center gap-2"
          style={{ color }}
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: color, boxShadow: `0 0 8px ${color}99` }}
          />
          {interp.short}
        </p>
        <div className="flex items-center gap-2">
          <span className="font-mono text-kicker tracking-kicker uppercase text-muted/60">
            Weight
          </span>
          <TickBar filled={score} total={maxOfferings} color={color} />
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
  sharePath,
  isShared,
  dominantLabels,
}: {
  sharePath: string;
  isShared: boolean;
  dominantLabels: string[];
}) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}${sharePath}`;
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

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-8">
        {isShared ? (
          <Link
            href="/mirror"
            className="relative font-serif italic text-body-lg text-gold border border-gold/60 px-6 py-2.5 rounded-sm transition-all duration-300 hover:bg-gold/10 hover:border-gold shadow-[0_0_20px_rgba(212,175,55,0.16)] hover:shadow-[0_0_32px_rgba(212,175,55,0.36)]"
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
            className="relative font-serif italic text-body-lg text-gold border px-6 py-2.5 rounded-sm transition-colors duration-300 border-gold/40 hover:border-gold hover:bg-gold/5"
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
        {!isShared && (
          <Link
            href="/mirror"
            prefetch={false}
            className="font-serif italic text-body text-text-secondary hover:text-gold transition-colors"
          >
            Take it again →
          </Link>
        )}
        <Link
          href="/today"
          className="font-serif italic text-body text-text-secondary hover:text-gold transition-colors"
        >
          Draw today&rsquo;s card →
        </Link>
        <Link
          href="/atlas"
          className="font-serif italic text-body text-text-secondary hover:text-gold transition-colors"
        >
          Explore the Atlas →
        </Link>
      </div>
    </footer>
  );
}
