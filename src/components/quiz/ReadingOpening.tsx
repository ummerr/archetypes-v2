"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ClassificationResult } from "@/lib/quiz-types";
import { systemAccent } from "@/lib/resonance";

interface Props {
  classification: ClassificationResult;
  readingNo: string;
}

// Composed opening line, 2–3 sentences, specific-to-cast. Names the primary
// system without diagnosing. Second-person, aphoristic. The stance audit
// lives here: no "you are", no "underlying", no certainty language.
function composeOpening(
  classification: ClassificationResult,
): { line: string; tail: string } {
  const { axisSummary, primarySystem } = classification;
  const systemName = systemAccent(primarySystem).name;

  const STAGE_PHRASE: Record<string, string> = {
    "pre-initiation": "before the first threshold",
    striving: "inside the striving",
    liminal: "in the liminal — after the striving, before the return",
    integrating: "in the slow work of integrating",
    integrated: "past the striving, in the return",
  };

  const AFFECT_PHRASE: Record<string, string> = {
    anger: "anger under the skin",
    shame: "shame threaded through the chest",
    fear: "fear held in the head",
    desire: "desire leading the way",
    mixed: "weather that refuses one name",
  };

  const NARRATIVE_PHRASE: Record<string, string> = {
    departure: "the leaving room",
    initiation: "the room where the trial is",
    liminal: "a room without walls",
    return: "the room after the return",
  };

  const stageWeather = STAGE_PHRASE[axisSummary.stage.dominant] ?? "in motion";
  const affectWeather = AFFECT_PHRASE[axisSummary.affect.dominant] ?? "moving";
  const narrativeRoom = NARRATIVE_PHRASE[axisSummary.narrative.dominant] ?? "the room you are in";

  const line = `This reading finds you ${stageWeather}, with ${affectWeather}, standing in ${narrativeRoom}.`;
  const tail = `Of the six traditions, ${systemName} fits the closest — not as a verdict, but as the lens that holds your present with the least strain.`;

  return { line, tail };
}

export default function ReadingOpening({ classification, readingNo }: Props) {
  const reduced = useReducedMotion() ?? false;
  const { line, tail } = composeOpening(classification);
  const today = new Date();
  const datestamp = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <motion.header
      className="mb-16 md:mb-20"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="flex items-baseline justify-between gap-4 mb-6">
        <p className="font-mono text-kicker tracking-display uppercase text-gold/80">
          The Reading
        </p>
        <p className="font-mono text-kicker tracking-kicker uppercase text-muted/60">
          Nº {readingNo} · cast {datestamp}
        </p>
      </div>

      <h1 className="font-serif text-h1 md:text-hero leading-display tracking-tight mb-8">
        <span className="text-gold" style={{ textShadow: "0 0 32px rgba(212,175,55,0.28), 0 0 12px rgba(212,175,55,0.18)" }}>
          A cast has
        </span>
        <br />
        <span className="italic text-text-secondary/85">been made.</span>
      </h1>

      <svg
        viewBox="0 0 200 2"
        width="200"
        height="2"
        className="mb-10 text-gold block"
        aria-hidden
      >
        <motion.line
          x1="0"
          y1="1"
          x2="200"
          y2="1"
          stroke="currentColor"
          strokeWidth={1}
          strokeOpacity={0.65}
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
        />
      </svg>

      <motion.p
        className="font-serif italic text-body-lg md:text-[1.375rem] leading-article text-text-primary max-w-prose mb-5"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
      >
        {line}
      </motion.p>

      <motion.p
        className="font-serif text-body-lg text-text-secondary/85 leading-article max-w-prose"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.95, ease: [0.19, 1, 0.22, 1] }}
      >
        {tail}
      </motion.p>
    </motion.header>
  );
}
