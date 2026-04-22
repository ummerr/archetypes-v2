"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ClassificationResult } from "@/lib/quiz-types";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";
import ReadingOpening from "./ReadingOpening";
import SignatureRadar from "./SignatureRadar";
import AxisSummary from "./AxisSummary";
import SystemSpread from "./SystemSpread";
import ClusterResonance from "./ClusterResonance";
import ShadowReading from "./ShadowReading";
import CounterCanonAside from "./CounterCanonAside";
import OpenQuestions from "./OpenQuestions";

interface Props {
  classification: ClassificationResult;
  readingNo: string;
}

// The Reading composes entirely on the server; this client component only
// carries the reveal choreography (framer-motion) and the reduced-motion
// guardrail. All content is deterministic from the decoded slug.
export default function QuizReadingClient({ classification, readingNo }: Props) {
  const reduced = useReducedMotion() ?? false;

  return (
    <>
      <ReadingOpening classification={classification} readingNo={readingNo} />

      <motion.div
        className="mb-20 max-w-3xl"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.2, ease: [0.19, 1, 0.22, 1] }}
      >
        <HermeneuticCaveat variant="banner" />
      </motion.div>

      <motion.div
        className="mb-20"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 1.4, ease: [0.19, 1, 0.22, 1] }}
      >
        <SignatureRadar classification={classification} />
      </motion.div>

      <AxisSummary summary={classification.axisSummary} />

      <SystemSpread classification={classification} />

      <ClusterResonance clusters={classification.clusters} take={5} />

      <ShadowReading classification={classification} />

      <CounterCanonAside tags={classification.counterCanonTags} />

      <OpenQuestions questions={classification.openQuestions} />

      {/* Footer: take another reading + methodology pointer */}
      <motion.footer
        className="mt-24 pt-10 border-t border-gold/20"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-6">
          <div className="max-w-md">
            <p className="font-mono text-kicker tracking-display uppercase text-gold/80 mb-2">
              The reading lives in its URL
            </p>
            <p className="font-serif italic text-body text-text-secondary/80 leading-article">
              Nothing was stored. The cast is encoded in the address above —
              share it, save it, or let it expire with the tab.
            </p>
          </div>
          <nav className="flex flex-col md:items-end gap-3">
            <Link
              href="/quiz"
              className="font-mono text-kicker tracking-kicker uppercase text-gold/90 hover:text-gold transition-colors"
            >
              Cast another reading &rarr;
            </Link>
            <Link
              href="/about/methodology"
              className="font-mono text-kicker tracking-kicker uppercase text-muted/70 hover:text-gold transition-colors"
            >
              Read the methodology &rarr;
            </Link>
            <Link
              href="/atlas"
              className="font-mono text-kicker tracking-kicker uppercase text-muted/70 hover:text-gold transition-colors"
            >
              Walk the atlas &rarr;
            </Link>
          </nav>
        </div>
        <div className="mt-10">
          <HermeneuticCaveat variant="footnote" />
        </div>
      </motion.footer>
    </>
  );
}
