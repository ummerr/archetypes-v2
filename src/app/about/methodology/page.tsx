import type { Metadata } from "next";
import Link from "next/link";
import { CONFIDENCE_TIERS, STANCE_NOTE } from "@/data/resonance";
import { buildPageMetadata } from "@/lib/site";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = buildPageMetadata({
  title: "Methodology",
  description:
    "How the cross-system resonance map was built: an eleven-mission research pipeline, a weak-hermeneutic stance, five confidence tiers, and an adversarial review process.",
  path: "/about/methodology",
});

export default function MethodologyPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 py-20 font-serif text-[17px] leading-[1.7] text-text-secondary/90">
      <SectionHeading kicker="About" as="h1">
        Methodology
      </SectionHeading>

      <HermeneuticCaveat variant="banner" className="mb-10" />

      <h2 className="font-serif text-2xl font-medium mt-12 mb-3">What the map is</h2>
      <p>{STANCE_NOTE}</p>
      <p className="mt-4">
        This site is a <em>comparative hermeneutic atlas</em>. It sets six archetypal vocabularies
        side by side — Jungian (Pearson-Marr), Enneagram (Riso-Hudson), KWML (Moore &amp; Gillette),
        Myers-Briggs, Hero's Journey (Campbell / Vogler), and Tarot (Major Arcana) — and maps
        resonances between them. It does not claim that these six traditions describe the same
        underlying psyche. It claims only that reading them together is sometimes more illuminating
        than reading any one alone.
      </p>

      <h2 className="font-serif text-2xl font-medium mt-10 mb-3">How it was built</h2>
      <p>
        The resonance map was assembled by an eleven-mission research pipeline: six missions
        extracted structured data from each tradition's primary and secondary literature; three
        cross-cut those findings for structural similarity, meta-patterns, and cultural critique;
        and two adversarial missions attacked every proposed mapping before final synthesis. The
        pipeline's outputs — including the full adversarial review — are preserved in the
        repository.
      </p>

      <h2 className="font-serif text-2xl font-medium mt-10 mb-3">Five confidence tiers</h2>
      <p>Every mapping on this site carries one of five labels:</p>
      <ul className="mt-3 space-y-2">
        {(Object.keys(CONFIDENCE_TIERS) as (keyof typeof CONFIDENCE_TIERS)[]).map((t) => (
          <li key={t}>
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase mr-2 text-gold/90">
              {t}
            </span>
            <span className="italic">{CONFIDENCE_TIERS[t]}</span>
          </li>
        ))}
      </ul>

      <h2 className="font-serif text-2xl font-medium mt-10 mb-3">What the map does not claim</h2>
      <p>
        The strong form of the project — that these six traditions co-describe the universal
        structure of psyche — fails. Convergence is partly shared intellectual descent (Jung is
        upstream of most of it), not independent corroboration. We do not claim to have discovered
        an underlying grammar. We claim only to have aligned vocabularies carefully enough that a
        reader can recognise the same territory being walked by different feet.
      </p>

      <h2 className="font-serif text-2xl font-medium mt-10 mb-3">Counter-canon</h2>
      <p>
        Bolen, Murdock, Estés, and Brewster are first-class parallel sources, not footnotes. See{" "}
        <Link href="/about/counter-canon" className="underline decoration-gold/60 underline-offset-4">
          /about/counter-canon
        </Link>
        .
      </p>

      <h2 className="font-serif text-2xl font-medium mt-10 mb-3">Shadow structures</h2>
      <p>
        Five different traditions model shadow five different ways. The original "Shadow" cluster
        of the hand-coded map conflated them; it has been dissolved. The{" "}
        <Link
          href="/about/shadow-structures"
          className="underline decoration-gold/60 underline-offset-4"
        >
          shadow-structures page
        </Link>{" "}
        holds the typology instead.
      </p>
    </article>
  );
}
