"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import QuestionLikert from "@/components/quiz/QuestionLikert";
import QuestionForcedChoice from "@/components/quiz/QuestionForcedChoice";
import QuestionScenario from "@/components/quiz/QuestionScenario";
import ThresholdPage from "@/components/quiz/ThresholdPage";
import {
  createSession,
  encodeResultPath,
  sectionProgress,
  SECTION_ORDER,
  type QuizSession,
} from "@/lib/quiz-session";
import type { QuizResponse, QuizSection } from "@/lib/quiz-types";

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

const SECTION_LABELS: Record<QuizSection, string> = {
  calibration: "I · Ground",
  "relational-affect": "II · Weather",
  narrative: "III · Story",
  shadow: "IV · Shadow",
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

export default function QuizTakeClient() {
  // Session creation is deferred to client mount so SSR never ships a random
  // seed in the HTML and re-mounting doesn't reuse a stale session.
  const [session, setSession] = useState<QuizSession | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [responses, setResponses] = useState<Record<string, QuizResponse>>({});
  const [phase, setPhase] = useState<Phase>("running");

  useEffect(() => {
    // Session creation calls crypto.getRandomValues — defer to mount so SSR
    // doesn't ship a random seed (which would mismatch on hydration).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(createSession());
  }, []);

  const steps = useMemo(
    () => (session ? buildSteps(session) : []),
    [session],
  );

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
    setResponses((prev) => ({
      ...prev,
      [item.id]: { itemId: item.id, value },
    }));
    advance();
  }

  if (phase === "complete") {
    const responseList = session.items
      .map((item) => responses[item.id])
      .filter((r): r is QuizResponse => !!r);
    const code = encodeResultPath(session, responseList);
    return <QuizComplete code={code} />;
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
                onContinue={advance}
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
// Roman numerals on each side; section name in small caps mono.
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
  const progress = sectionProgress(session.items, Math.min(currentItemIdx, total - 1));
  const counter = `${toRoman(answered + (step.kind === "question" ? 1 : 0))} · ${toRoman(total)}`;
  const sectionOrderIdx = SECTION_ORDER.indexOf(progress.section) + 1;

  return (
    <header className="mb-10 md:mb-14">
      <div className="flex items-center justify-between gap-4 mb-3">
        <motion.p
          className="font-mono text-kicker tracking-display uppercase text-gold/80"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          aria-label={`Question ${answered + 1} of ${total}`}
        >
          {counter}
        </motion.p>
        <p className="font-mono text-kicker tracking-kicker uppercase text-muted/70">
          <span className="text-gold/70">{toRoman(sectionOrderIdx)}</span>
          <span className="mx-1.5 text-muted/40">of</span>
          <span>{toRoman(SECTION_ORDER.length)}</span>
        </p>
      </div>

      {/* Breath-dot rail. A single gold dot that breathes to mark "in this section";
          dim dots on either side for the sections already walked / still ahead. */}
      <div className="flex items-center gap-3">
        {SECTION_ORDER.map((s, i) => {
          const done = i < sectionOrderIdx - 1;
          const active = i === sectionOrderIdx - 1;
          return (
            <motion.span
              key={s}
              aria-hidden
              className="block h-1 rounded-full"
              initial={false}
              animate={{
                width: active ? 28 : done ? 18 : 12,
                backgroundColor: done || active
                  ? "var(--color-gold)"
                  : "var(--color-surface-light)",
                opacity: active ? [0.55, 1, 0.55] : done ? 0.55 : 0.65,
              }}
              transition={{
                width: { duration: 0.32, ease: "easeOut" },
                backgroundColor: { duration: 0.32 },
                opacity: active
                  ? { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.32 },
              }}
              style={{
                boxShadow: active
                  ? "0 0 10px rgba(212,175,55,0.45)"
                  : "none",
              }}
            />
          );
        })}
      </div>
    </header>
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

// Phase 4 ("The Reading") will replace this with a full editorial spread at
// /quiz/r/[code]. For now, confirm completion, surface the share slug so the
// URL encoder can be verified end-to-end, and offer a path back to start.
function QuizComplete({ code }: { code: string }) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.section
      className="max-w-2xl mx-auto px-6 md:px-10 py-24 md:py-32 text-center"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1 }}
    >
      <p className="font-mono text-kicker tracking-display uppercase text-gold/80 mb-6">
        The Reading is complete
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

      <p className="font-serif italic text-body-lg text-text-secondary/85 leading-article max-w-prose mx-auto mb-10">
        The spread itself &mdash; six systems, the constellation, the shadow
        reading, the developmental edge &mdash; is still being drawn. Your
        answers are encoded here; the reading will arrive with its own evening.
      </p>

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
