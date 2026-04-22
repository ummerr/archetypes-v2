"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  tags: string[];
}

// Non-essentializing copy. The aside is offered, not assigned. Voice:
// "these lenses also inform this territory", not "you are X".
const ENTRIES: Record<
  string,
  { kicker: string; title: string; body: string; href: string }
> = {
  "bolen-estes": {
    kicker: "Counter-canon · desire & embodiment",
    title: "Bolen and Estés sit near this cast.",
    body: "Where the profile leans toward desire and the generative-embodiment rooms, Jean Shinoda Bolen's goddess-archetypes and Clarissa Pinkola Estés' wild-woman corpus offer a vocabulary the canonical six tend to underweight. Not a reassignment — another set of mirrors to try alongside the primary reading.",
    href: "/about/counter-canon#bolen-estes",
  },
  murdock: {
    kicker: "Counter-canon · the return arc",
    title: "Maureen Murdock's Heroine's Journey sits near this cast.",
    body: "Where the profile lands in the return and integrating-into-integrated stages — with the relational rooms in the top clusters — Murdock's 1990 map offers a parallel arc the monomyth compresses. Offered to any reader whose cast lands there; not gendered by the trigger.",
    href: "/about/counter-canon#murdock",
  },
};

export default function CounterCanonAside({ tags }: Props) {
  const reduced = useReducedMotion() ?? false;
  const hits = tags.map((t) => ENTRIES[t]).filter(Boolean);
  if (hits.length === 0) return null;

  return (
    <section className="mb-20">
      <div className="mb-8">
        <p className="font-mono text-kicker tracking-display uppercase text-gold/80 mb-1">
          Counter-canon
        </p>
        <h2 className="font-serif text-h2 leading-display">
          Other lenses near this cast
        </h2>
      </div>

      <div className="space-y-8">
        {hits.map((entry, i) => (
          <motion.aside
            key={entry.title}
            className="border-l-2 border-gold/40 pl-5 py-3 max-w-3xl"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15 + i * 0.1,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            <p className="font-mono text-kicker tracking-kicker uppercase text-muted/70 mb-2">
              {entry.kicker}
            </p>
            <h3 className="font-serif text-h3 italic text-text-primary/95 leading-snug mb-3">
              {entry.title}
            </h3>
            <p className="font-serif text-body text-text-secondary/85 leading-article mb-3">
              {entry.body}
            </p>
            <Link
              href={entry.href}
              className="font-mono text-kicker tracking-kicker uppercase text-gold/85 hover:text-gold transition-colors"
            >
              Read the counter-canon &rarr;
            </Link>
          </motion.aside>
        ))}
      </div>
    </section>
  );
}
