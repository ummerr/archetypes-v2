import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/site";
import { SYSTEM_BLIND_SPOTS } from "@/data/resonance";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = buildPageMetadata({
  title: "About Myers-Briggs",
  description:
    "Why MBTI appears on this site, and what the psychometric critique says about it. Included for accessibility, with caveats surfaced.",
  path: "/mbti/about",
});

export default function MbtiAboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 py-20 font-serif text-body-lg leading-article text-text-secondary/90">
      <SectionHeading kicker="About" as="h1">
        Myers-Briggs
      </SectionHeading>

      <p>
        Myers-Briggs Type Indicator (MBTI) took Jung's <em>Psychological Types</em> (1921) and
        recast it as a sixteen-type instrument built from four dichotomies: Extraversion /
        Introversion, Sensing / Intuition, Thinking / Feeling, Judging / Perceiving. The result is
        a widely legible vocabulary — for many readers, the first archetypal language they ever
        encounter.
      </p>

      <h2 className="font-serif text-2xl font-medium mt-10 mb-3">Why it's here</h2>
      <p>
        MBTI is useful as a doorway. Its eight cognitive functions (Ni, Ne, Ti, Te, Fi, Fe, Si, Se)
        remain analytically productive even where the sixteen-type labels are contested. On this
        site MBTI appears as a parallel vocabulary — rarely as a primary cluster member, often as a
        secondary resonance.
      </p>

      <h2 className="font-serif text-2xl font-medium mt-10 mb-3">Limitations</h2>
      <p className="italic">{SYSTEM_BLIND_SPOTS.mbti}</p>
      <p className="mt-4">
        See the meta-debate on{" "}
        <Link
          href="/atlas/debates/mbti-inclusion"
          className="underline decoration-gold/60 underline-offset-4"
        >
          whether MBTI should be included at all
        </Link>
        .
      </p>
    </article>
  );
}
