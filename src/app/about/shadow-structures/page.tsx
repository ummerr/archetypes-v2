import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/site";
import SectionHeading from "@/components/shared/SectionHeading";
import { SHADOW_MODELS } from "@/data/methodology/shadow-models";

export const metadata: Metadata = buildPageMetadata({
  title: "Shadow Structures",
  description:
    "Five different shadow models across the systems mapped on this site - bipolar, tripartite, transit-state, unipolar trap, and dramatic mask. And why the original Shadow cluster was a category error.",
  path: "/about/shadow-structures",
});

export default function ShadowStructuresPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 py-20 font-serif text-[17px] leading-[1.7] text-text-secondary/90">
      <SectionHeading kicker="About" as="h1">
        Shadow Structures
      </SectionHeading>
      <p className="italic text-text-secondary/85 mb-10">
        Five traditions - five different theories of what shadow <em>is</em>. The original Shadow
        cluster on this site mixed a grammar (KWML), a transit-state (Enneagram), an event-symbol
        (Tarot Devil), and a dramatic mask (Hero&apos;s Journey Shadow) as though they were
        instances of one thing. They are not. The full account lives on the{" "}
        <Link
          href="/about/methodology#shadow-structures"
          className="underline decoration-gold/60 underline-offset-4"
        >
          methodology page
        </Link>
        .
      </p>

      <div className="space-y-10">
        {SHADOW_MODELS.map((m) => (
          <section key={m.id}>
            <h2 className="font-serif text-xl font-medium mb-2">{m.heading}</h2>
            <p>{m.body}</p>
          </section>
        ))}
      </div>

      <h2 className="font-serif text-2xl font-medium mt-14 mb-3">Why it matters</h2>
      <p>
        The five models are not equivalent. A KWML shadow pole and a Hero&apos;s Journey Shadow
        mask share only a word. When the map presents them together it uses the{" "}
        <em>Antagonists</em> cluster for figures whose primary narrative function is opposition,
        and reserves shadow-as-typology for this page.
      </p>
    </article>
  );
}
