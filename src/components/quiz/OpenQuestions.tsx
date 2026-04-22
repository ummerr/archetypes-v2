"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  questions: string[];
}

export default function OpenQuestions({ questions }: Props) {
  const reduced = useReducedMotion() ?? false;
  if (!questions || questions.length === 0) return null;

  return (
    <section className="mb-20">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gold/20" />
        <p className="font-mono text-kicker tracking-kicker uppercase text-muted/70">
          The map admits
        </p>
        <div className="h-px flex-1 bg-gold/20" />
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-h3 italic text-text-secondary/85 leading-snug mb-6 text-center">
          The questions this reading leaves open
        </h2>
        <ol className="space-y-4 list-none">
          {questions.map((q, i) => (
            <motion.li
              key={i}
              className="flex gap-4 items-baseline"
              initial={reduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.07,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <span className="font-mono text-label tracking-label uppercase text-muted/45 w-8 shrink-0 text-right">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-serif italic text-body text-text-secondary/80 leading-article">
                {q}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
