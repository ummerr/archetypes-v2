import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/site";
import SectionHeading from "@/components/shared/SectionHeading";
import {
  COUNTER_CANON_ENTRIES,
  COUNTER_CANON_HONEST,
} from "@/data/methodology/counter-canon";

export const metadata: Metadata = buildPageMetadata({
  title: "The Counter-Canon",
  description:
    "Bolen, Murdock, Estés, and Brewster as first-class parallel sources to KWML, Campbell, and the broader Jungian canon - not as footnotes.",
  path: "/about/counter-canon",
});

export default function CounterCanonPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 py-20 font-serif text-body-lg leading-article text-text-secondary/90">
      <SectionHeading kicker="About" as="h1">
        The Counter-Canon
      </SectionHeading>
      <p className="italic text-text-secondary/85 mb-8">
        Not footnotes. First-class parallel maps. Where the canon was partial, these writers
        supplied what was missing - sometimes by building an entirely different structure rather
        than correcting the old one. The full account lives on the{" "}
        <Link
          href="/about/methodology#counter-canon"
          className="underline decoration-gold/60 underline-offset-4"
        >
          methodology page
        </Link>
        .
      </p>

      <div className="space-y-10">
        {COUNTER_CANON_ENTRIES.map((e) => (
          <section key={e.heading}>
            <h2 className="font-serif text-xl font-medium mb-2">{e.heading}</h2>
            <p>{e.body}</p>
          </section>
        ))}
      </div>

      <h2 className="font-serif text-2xl font-medium mt-14 mb-3">Honest about the canon</h2>
      <ul className="space-y-3">
        {COUNTER_CANON_HONEST.map((h, i) => (
          <li key={i} className="italic">
            - {h}
          </li>
        ))}
      </ul>
    </article>
  );
}
