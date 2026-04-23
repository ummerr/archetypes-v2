"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import QuestionLikert from "@/components/quiz/QuestionLikert";
import QuestionForcedChoice from "@/components/quiz/QuestionForcedChoice";
import QuestionScenario from "@/components/quiz/QuestionScenario";
import ThresholdPage from "@/components/quiz/ThresholdPage";
import {
  createSession,
  encodeResultPath,
  readingNumberFor,
  sectionProgress,
  sessionFromSeed,
  SECTION_ORDER,
  type QuizSession,
} from "@/lib/quiz-session";
import { responsesToVector } from "@/lib/quiz-scoring";
import { classifyVector } from "@/lib/quiz-classifier";
import { systemAccent } from "@/lib/resonance";
import { composeOpening } from "@/components/quiz/ReadingOpening";
import type {
  ClassificationResult,
  QuizResponse,
  QuizSection,
} from "@/lib/quiz-types";

// Autosave lives in sessionStorage — tab-scoped, so it survives refresh and
// accidental nav but still evaporates when the tab closes. That keeps the
// "nothing is stored" ethos honest: the ceremony is preserved *for this sitting*
// and nothing more. Bumping STORAGE_VERSION invalidates stale saves.
const STORAGE_KEY = "archetypes:quiz:v1";
const STORAGE_VERSION = "q1";
// Older than this → treat as abandoned. A single sitting, not a week-old ghost.
const STORAGE_MAX_AGE_MS = 6 * 60 * 60 * 1000;

interface SavedState {
  version: string;
  seed: string;
  stepIdx: number;
  responses: Record<string, QuizResponse>;
  savedAt: number;
}

function readSaved(): SavedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedState;
    if (parsed.version !== STORAGE_VERSION) return null;
    if (!parsed.seed || typeof parsed.stepIdx !== "number") return null;
    if (Date.now() - parsed.savedAt > STORAGE_MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeSaved(state: Omit<SavedState, "savedAt" | "version">): void {
  if (typeof window === "undefined") return;
  try {
    const payload: SavedState = {
      ...state,
      version: STORAGE_VERSION,
      savedAt: Date.now(),
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Storage full / disabled — silently no-op. Losing autosave is fine;
    // losing the ceremony because of a quota error would not be.
  }
}

function clearSaved(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

// Between-section threshold aphorisms. Each sits before the *next* section
// named in the key — so SECTION_APHORISMS["relational-affect"] shows after
// calibration completes, before the first scenario appears.
const SECTION_APHORISMS: Record<QuizSection, string> = {
  calibration: "", // first section, no opening threshold
  "relational-affect":
    "The ground is named. What you feel on it is the next question.",
  narrative:
    "The rooms you stand in, and the ones you walk away from, begin to gather into a story.",
  shadow:
    "The last turn is down. Answer only what you can answer honestly.",
};

const SECTION_NAMES: Record<QuizSection, string> = {
  calibration: "Ground",
  "relational-affect": "Weather",
  narrative: "Story",
  shadow: "Shadow",
};

const SECTION_LABELS: Record<QuizSection, string> = {
  calibration: `I · ${SECTION_NAMES.calibration}`,
  "relational-affect": `II · ${SECTION_NAMES["relational-affect"]}`,
  narrative: `III · ${SECTION_NAMES.narrative}`,
  shadow: `IV · ${SECTION_NAMES.shadow}`,
};

// Build the ordered step list once per session. Each item is its own step;
// a threshold is inserted before every section except the first.
type Step =
  | { kind: "question"; itemIndex: number }
  | { kind: "threshold"; section: QuizSection };

function buildSteps(session: QuizSession): Step[] {
  const steps: Step[] = [];
  let prev: QuizSection | null = null;
  for (let i = 0; i < session.items.length; i++) {
    const it = session.items[i];
    if (prev !== null && it.section !== prev) {
      steps.push({ kind: "threshold", section: it.section });
    }
    steps.push({ kind: "question", itemIndex: i });
    prev = it.section;
  }
  return steps;
}

function toRoman(n: number): string {
  if (n <= 0) return "";
  const codes: Array<readonly [number, string]> = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let out = "";
  let rem = n;
  for (const [v, s] of codes) {
    while (rem >= v) {
      out += s;
      rem -= v;
    }
  }
  return out;
}

type Phase = "running" | "complete";

// How long the undo chip lingers after a commit. Long enough to catch the
// mis-tap ("wait, I meant 5 not 3"), short enough that it doesn't tempt a
// second-guess of a considered answer.
const UNDO_WINDOW_MS = 2200;

export default function QuizTakeClient() {
  // Session creation is deferred to client mount so SSR never ships a random
  // seed in the HTML and re-mounting doesn't reuse a stale session.
  const [session, setSession] = useState<QuizSession | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [responses, setResponses] = useState<Record<string, QuizResponse>>({});
  const [phase, setPhase] = useState<Phase>("running");
  // If a valid save exists, we defer session creation and show a resume
  // prompt instead — the user chooses Continue or Begin anew. Null means no
  // pending prompt (either never had one, or the user has resolved it).
  const [pendingResume, setPendingResume] = useState<SavedState | null>(null);
  // One-step undo window. Armed after each question commit, auto-clears
  // after UNDO_WINDOW_MS. Reverting drops the response for itemId and
  // rewinds the step to prevStepIdx.
  const [undoable, setUndoable] = useState<{
    itemId: string;
    prevStepIdx: number;
  } | null>(null);
  const undoTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // On mount: check for a saved session from this tab. If present, show
    // the resume prompt; otherwise cast a fresh session. Both paths defer
    // crypto-using code until after hydration.
    const saved = readSaved();
    // Mount-time initialization: readSaved / createSession both read from
    // environment APIs that can't be invoked during render, so setting
    // state here is load-bearing, not cascading.
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPendingResume(saved);
    } else {
      setSession(createSession());
    }
  }, []);

  // Autosave on every meaningful state change. Skipped while the resume
  // prompt is open (we haven't committed to a session yet) and after
  // completion (the slug IS the artefact — no need to keep a draft).
  useEffect(() => {
    if (!session || pendingResume || phase === "complete") return;
    writeSaved({ seed: session.seed, stepIdx, responses });
  }, [session, stepIdx, responses, phase, pendingResume]);

  // On completion, drop the tab-local draft — the share slug is the
  // canonical artefact from here on, and a future visit to /quiz/take
  // should start fresh rather than offering to resume a finished reading.
  useEffect(() => {
    if (phase === "complete") clearSaved();
  }, [phase]);

  // Clean up the undo timer if the component tears down.
  useEffect(() => {
    return () => {
      if (undoTimerRef.current !== null) {
        window.clearTimeout(undoTimerRef.current);
      }
    };
  }, []);

  const steps = useMemo(
    () => (session ? buildSteps(session) : []),
    [session],
  );

  const clearUndo = useCallback(() => {
    if (undoTimerRef.current !== null) {
      window.clearTimeout(undoTimerRef.current);
      undoTimerRef.current = null;
    }
    setUndoable(null);
  }, []);

  const performUndo = useCallback(() => {
    setUndoable((current) => {
      if (!current) return null;
      setResponses((prev) => {
        const next = { ...prev };
        delete next[current.itemId];
        return next;
      });
      setStepIdx(current.prevStepIdx);
      if (undoTimerRef.current !== null) {
        window.clearTimeout(undoTimerRef.current);
        undoTimerRef.current = null;
      }
      return null;
    });
  }, []);

  // Keyboard shortcut for undo — only active while the window is open so
  // we don't shadow any 'u' option labels in forced-choice (none currently,
  // but cheap guard).
  useEffect(() => {
    if (!undoable) return;
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key.toLowerCase() === "u") {
        e.preventDefault();
        performUndo();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undoable, performUndo]);

  // Resume-prompt branch: render before any session-dependent UI so the
  // user's saved answers are never briefly overwritten on the wire.
  if (pendingResume && !session) {
    return (
      <ResumePrompt
        saved={pendingResume}
        onContinue={() => {
          const restored = sessionFromSeed(pendingResume.seed);
          const builtSteps = buildSteps(restored);
          const clampedStep = Math.max(
            0,
            Math.min(pendingResume.stepIdx, builtSteps.length - 1),
          );
          setSession(restored);
          setStepIdx(clampedStep);
          setResponses(pendingResume.responses ?? {});
          setPendingResume(null);
        }}
        onRestart={() => {
          clearSaved();
          setSession(createSession());
          setStepIdx(0);
          setResponses({});
          setPendingResume(null);
        }}
      />
    );
  }

  if (!session) return <SessionLoading />;

  const step = steps[stepIdx];

  function advance() {
    if (!session) return;
    if (stepIdx + 1 >= steps.length) {
      setPhase("complete");
    } else {
      setStepIdx(stepIdx + 1);
    }
  }

  function stepBackToLastThreshold() {
    // Only threshold pages expose Back. Walk backward to the prior threshold
    // (or to step 0 if there is none earlier) and drop responses for any
    // items we rewind past.
    if (!session) return;
    clearUndo();
    for (let i = stepIdx - 1; i >= 0; i--) {
      if (steps[i].kind === "threshold") {
        setStepIdx(i);
        const keep: Record<string, QuizResponse> = {};
        for (let j = 0; j < i; j++) {
          const s = steps[j];
          if (s.kind === "question") {
            const id = session.items[s.itemIndex].id;
            if (responses[id]) keep[id] = responses[id];
          }
        }
        setResponses(keep);
        return;
      }
    }
    setStepIdx(0);
    setResponses({});
  }

  function handleCommit(value: QuizResponse["value"]) {
    if (!session || step?.kind !== "question") return;
    const item = session.items[step.itemIndex];
    const prevStepIdx = stepIdx;
    setResponses((prev) => ({
      ...prev,
      [item.id]: { itemId: item.id, value },
    }));
    advance();
    // Arm the undo chip AFTER advance. It names the item the user just
    // committed to and the step they were on when they did.
    if (undoTimerRef.current !== null) {
      window.clearTimeout(undoTimerRef.current);
    }
    setUndoable({ itemId: item.id, prevStepIdx });
    undoTimerRef.current = window.setTimeout(() => {
      setUndoable(null);
      undoTimerRef.current = null;
    }, UNDO_WINDOW_MS);
  }

  if (phase === "complete") {
    const responseList = session.items
      .map((item) => responses[item.id])
      .filter((r): r is QuizResponse => !!r);
    const code = encodeResultPath(session, responseList);
    const vector = responsesToVector(responseList, session.items);
    const classification = classifyVector(vector);
    const readingNo = readingNumberFor(code);
    return (
      <QuizComplete
        code={code}
        classification={classification}
        readingNo={readingNo}
      />
    );
  }

  if (!step) return <SessionLoading />;

  // Count answered questions to power the progress display.
  const answered = Object.keys(responses).length;

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-16 min-h-screen flex flex-col">
      <Header
        session={session}
        step={step}
        answered={answered}
      />

      <UndoChip
        visible={!!undoable}
        onUndo={performUndo}
      />

      <div className="flex-1 flex items-center">
        <AnimatePresence mode="wait">
          {step.kind === "threshold" ? (
            <motion.div
              key={`t-${stepIdx}`}
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <ThresholdPage
                aphorism={SECTION_APHORISMS[step.section]}
                sectionLabel={SECTION_LABELS[step.section]}
                onContinue={() => {
                  // Crossing a threshold commits the prior section — undo
                  // the last in-section answer should not survive the rite.
                  clearUndo();
                  advance();
                }}
                onBack={stepIdx > 0 ? stepBackToLastThreshold : undefined}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`q-${session.items[step.itemIndex].id}`}
              className="w-full"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            >
              <QuestionRenderer
                item={session.items[step.itemIndex]}
                onCommit={handleCommit}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step.kind === "question" && (
        <p className="mt-10 text-center font-serif italic text-xs text-text-secondary/45">
          No back &mdash; trust the first read.
        </p>
      )}
    </div>
  );
}

// Renderer lookup — keeps the step branch small and the item-kind switch in
// one place. All three child components commit through the same callback
// signature so the parent doesn't branch on kind.
function QuestionRenderer({
  item,
  onCommit,
}: {
  item: QuizSession["items"][number];
  onCommit: (value: QuizResponse["value"]) => void;
}) {
  if (item.kind === "likert") {
    return <QuestionLikert item={item} onCommit={onCommit} />;
  }
  if (item.kind === "scenario") {
    return <QuestionScenario item={item} onCommit={onCommit} />;
  }
  return <QuestionForcedChoice item={item} onCommit={onCommit} />;
}

// Header: the kicker row that tells a reader where they are in the ceremony.
// Left kicker is functional (arabic "Ground · 3 of 22"); right is ambient
// (roman overall). The rail beneath is segmented proportional to section
// length, so its fill is an honest map of the ceremony's pacing.
function Header({
  session,
  step,
  answered,
}: {
  session: QuizSession;
  step: Step;
  answered: number;
}) {
  const reduced = useReducedMotion() ?? false;
  const total = session.items.length;
  const currentItemIdx =
    step.kind === "question" ? step.itemIndex : answered;
  const progress = sectionProgress(
    session.items,
    Math.min(currentItemIdx, total - 1),
  );
  const sectionOrderIdx = SECTION_ORDER.indexOf(progress.section);

  // Per-section totals so each rail segment's flex-basis is proportional to
  // how long that section actually runs. Keeps the rail an honest map.
  const sectionTotals = useMemo(() => {
    const counts: Record<QuizSection, number> = {
      calibration: 0,
      "relational-affect": 0,
      narrative: 0,
      shadow: 0,
    };
    for (const it of session.items) counts[it.section]++;
    return counts;
  }, [session.items]);

  // Overall position counted ceremoniously: on a question, include it
  // (1-based); on a threshold, show the count of answered questions (the
  // threshold itself isn't a numbered step).
  const overallPos =
    step.kind === "question" ? step.itemIndex + 1 : answered;

  return (
    <header className="mb-10 md:mb-14">
      <div className="flex items-baseline justify-between gap-4 mb-3 min-h-[1.1rem]">
        {step.kind === "question" ? (
          <motion.p
            className="font-mono text-kicker tracking-display uppercase text-gold/85"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            aria-label={`${SECTION_NAMES[progress.section]} section, question ${progress.indexInSection + 1} of ${progress.sectionTotal}. ${overallPos} of ${total} overall.`}
          >
            <span>{SECTION_NAMES[progress.section]}</span>
            <span className="mx-2 text-muted/40">·</span>
            <span>{progress.indexInSection + 1}</span>
            <span className="mx-1 text-muted/55 normal-case tracking-normal">
              of
            </span>
            <span>{progress.sectionTotal}</span>
          </motion.p>
        ) : (
          <span aria-hidden />
        )}
        <p
          className="font-mono text-kicker tracking-kicker uppercase text-muted/55 ml-auto"
          aria-hidden={step.kind === "question"}
        >
          <span>{toRoman(overallPos)}</span>
          <span className="mx-1.5 text-muted/40 normal-case tracking-normal">
            of
          </span>
          <span>{toRoman(total)}</span>
        </p>
      </div>

      {/* Segmented rail. One segment per section, width proportional to that
          section's question count. Past segments are solid dim-gold; the
          current segment fills left-to-right as answers accumulate, with a
          slow breath on its base to mark "you are here". */}
      <div
        className="flex items-center gap-[3px] h-1"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={answered}
        aria-label={`${answered} of ${total} questions answered`}
      >
        {SECTION_ORDER.map((s, i) => {
          const segTotal = sectionTotals[s] || 1;
          const done = i < sectionOrderIdx;
          const active = i === sectionOrderIdx;
          const fill = done
            ? 1
            : active
              ? progress.indexInSection / segTotal
              : 0;
          return (
            <div
              key={s}
              className="relative h-full overflow-hidden rounded-full"
              style={{ flexGrow: segTotal, flexBasis: 0 }}
              aria-hidden
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={false}
                animate={{
                  backgroundColor: active
                    ? "rgba(212,175,55,0.14)"
                    : "var(--color-surface-light)",
                  opacity: active ? [0.7, 1, 0.7] : 1,
                }}
                transition={{
                  backgroundColor: { duration: 0.32 },
                  opacity: active
                    ? { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.32 },
                }}
              />
              <motion.div
                className="absolute inset-y-0 left-0 bg-gold rounded-full"
                initial={false}
                animate={{
                  width: `${fill * 100}%`,
                  opacity: fill > 0 ? (done ? 0.6 : 0.9) : 0,
                }}
                transition={{
                  width: { duration: 0.55, ease: [0.19, 1, 0.22, 1] },
                  opacity: { duration: 0.32 },
                }}
                style={{
                  boxShadow:
                    active && fill > 0
                      ? "0 0 10px rgba(212,175,55,0.42)"
                      : "none",
                }}
              />
            </div>
          );
        })}
      </div>
    </header>
  );
}

// A quiet, low-layout-impact chip offering one-step undo after each commit.
// AnimatePresence handles the fade; the outer row reserves a fixed minimum
// height so arming/clearing the chip doesn't shift the question beneath.
function UndoChip({
  visible,
  onUndo,
}: {
  visible: boolean;
  onUndo: () => void;
}) {
  return (
    <div className="min-h-[1.5rem] mb-2 flex items-center justify-center">
      <AnimatePresence>
        {visible && (
          <motion.button
            key="undo-chip"
            type="button"
            onClick={onUndo}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="group inline-flex items-center gap-2 font-mono text-kicker tracking-kicker uppercase text-muted/70 hover:text-gold focus:outline-none focus-visible:text-gold transition-colors"
            aria-label="Undo last answer"
          >
            <span aria-hidden className="text-gold/70 group-hover:text-gold">
              &#x21ba;
            </span>
            <span>Undo last</span>
            <span className="hidden sm:inline-flex items-center justify-center font-mono text-[10px] tracking-normal uppercase min-w-[22px] h-[22px] px-1.5 rounded-sm border border-gold/35 text-gold/90 bg-gold/[0.04]">
              U
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// The resume prompt is the only interruption to the ceremony we allow.
// It's shown once on mount when a valid tab-local save exists; choosing
// either option commits and the prompt never returns in the same session.
function ResumePrompt({
  saved,
  onContinue,
  onRestart,
}: {
  saved: SavedState;
  onContinue: () => void;
  onRestart: () => void;
}) {
  const reduced = useReducedMotion() ?? false;
  const answered = Object.keys(saved.responses ?? {}).length;
  // Capture "now" once at mount — re-reading Date.now() during render would
  // be impure, and the exact minute count doesn't need to tick while the
  // user hovers over the prompt.
  const [nowAtMount] = useState(() => Date.now());
  const minutesAgo = Math.max(
    1,
    Math.round((nowAtMount - saved.savedAt) / 60000),
  );
  const agoLabel =
    minutesAgo < 60
      ? `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`
      : `${Math.round(minutesAgo / 60)} hour${Math.round(minutesAgo / 60) === 1 ? "" : "s"} ago`;

  return (
    <motion.section
      className="max-w-2xl mx-auto px-6 md:px-10 py-24 md:py-28 text-center"
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
    >
      <p className="font-mono text-kicker tracking-display uppercase text-gold/80 mb-6">
        A reading in progress
      </p>
      <h1 className="font-serif text-h2 md:text-h1 leading-display mb-5">
        You were in the middle of something.
      </h1>

      <svg
        viewBox="0 0 160 2"
        width="160"
        height="2"
        className="mx-auto my-6 text-gold block"
        aria-hidden
      >
        <motion.line
          x1="0"
          y1="1"
          x2="160"
          y2="1"
          stroke="currentColor"
          strokeWidth={1}
          strokeOpacity={0.6}
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
        />
      </svg>

      <p className="font-serif italic text-body-lg text-text-secondary/85 leading-article max-w-prose mx-auto mb-10">
        {answered} answer{answered === 1 ? "" : "s"} waiting, saved {agoLabel}.
        Nothing has left this tab. You can pick up where you left off, or set
        it aside and begin a new reading.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-5">
        <button
          type="button"
          onClick={onContinue}
          className="group relative overflow-hidden font-mono text-label tracking-kicker uppercase border border-gold px-7 py-4 rounded-sm text-gold transition-all duration-500 hover:bg-gold/10 shadow-[0_0_22px_rgba(212,175,55,0.18)] hover:shadow-[0_0_36px_rgba(212,175,55,0.38)] focus-visible:shadow-[0_0_36px_rgba(212,175,55,0.45)]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-breathe-subtle"
            style={{ boxShadow: "inset 0 0 20px rgba(212,175,55,0.14)" }}
          />
          <span className="relative z-10">Continue the reading &rarr;</span>
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="font-serif italic text-body text-text-secondary/75 hover:text-gold transition-colors"
        >
          Begin anew
        </button>
      </div>
    </motion.section>
  );
}

function SessionLoading() {
  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-32 text-center">
      <motion.p
        className="font-mono text-kicker tracking-display uppercase text-muted/60"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        Casting the reading&hellip;
      </motion.p>
    </div>
  );
}

// Threshold between take and reading: names the cast in cast-specific language
// (the composed opening), then hands the reader a ceremonial gold button into
// the full spread at /quiz/r/[code]. The opening text here matches the one the
// Reading itself opens with — this page is the vestibule, not a placeholder.
function QuizComplete({
  code,
  classification,
  readingNo,
}: {
  code: string;
  classification: ClassificationResult;
  readingNo: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const { line, tail } = composeOpening(classification);
  const systemName = systemAccent(classification.primarySystem).name;

  return (
    <motion.section
      className="max-w-3xl mx-auto px-6 md:px-10 py-20 md:py-28 text-center"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1 }}
    >
      <p className="font-mono text-kicker tracking-display uppercase text-gold/80 mb-6">
        The Reading is complete &middot; N&ordm; {readingNo}
      </p>
      <motion.h1
        className="font-serif text-h1 leading-display mb-6"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
      >
        A cast has been made.
      </motion.h1>

      <svg
        viewBox="0 0 160 2"
        width="160"
        height="2"
        className="mx-auto my-8 text-gold block"
        aria-hidden
      >
        <motion.line
          x1="0"
          y1="1"
          x2="160"
          y2="1"
          stroke="currentColor"
          strokeWidth={1}
          strokeOpacity={0.65}
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.7, ease: "easeOut" }}
        />
      </svg>

      <motion.p
        className="font-serif italic text-body-lg md:text-[1.375rem] leading-article text-text-primary max-w-prose mx-auto mb-5"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.9, ease: [0.19, 1, 0.22, 1] }}
      >
        {line}
      </motion.p>

      <motion.p
        className="font-serif text-body-lg text-text-secondary/85 leading-article max-w-prose mx-auto mb-12"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 1.1, ease: [0.19, 1, 0.22, 1] }}
      >
        {tail}
      </motion.p>

      <motion.div
        className="flex flex-col items-center gap-4 mb-14"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 1.35, ease: [0.19, 1, 0.22, 1] }}
      >
        <Link
          href={`/quiz/r/${code}`}
          className="group relative overflow-hidden font-mono text-label md:text-kicker tracking-kicker uppercase border border-gold px-10 py-5 md:px-14 md:py-6 rounded-sm text-gold transition-all duration-500 hover:bg-gold/10 shadow-[0_0_28px_rgba(212,175,55,0.22)] hover:shadow-[0_0_48px_rgba(212,175,55,0.45)] focus-visible:shadow-[0_0_48px_rgba(212,175,55,0.5)]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-breathe-subtle"
            style={{ boxShadow: "inset 0 0 24px rgba(212,175,55,0.18)" }}
          />
          <span className="relative z-10">Open the Full Reading &rarr;</span>
        </Link>
        <p className="font-serif italic text-body-sm text-muted/75 max-w-sm">
          The constellation, the system spread, the shadow, and the developmental
          edge &mdash; through {systemName} and five other lenses.
        </p>
      </motion.div>

      <p className="font-mono text-kicker tracking-kicker uppercase text-muted/65 mb-2">
        Your Reading URL
      </p>
      <code className="block font-mono text-label text-gold/80 mb-12 break-all">
        /quiz/r/{code}
      </code>

      <div className="flex flex-wrap items-center justify-center gap-6">
        <Link
          href="/quiz"
          className="font-serif italic text-body text-text-secondary hover:text-gold transition-colors"
        >
          Cast another &rarr;
        </Link>
        <Link
          href="/mirror"
          className="font-serif italic text-body text-text-secondary hover:text-gold transition-colors"
        >
          Back to the Mirror &rarr;
        </Link>
        <Link
          href="/atlas"
          className="font-serif italic text-body text-text-secondary hover:text-gold transition-colors"
        >
          Wander the Atlas &rarr;
        </Link>
      </div>
    </motion.section>
  );
}
