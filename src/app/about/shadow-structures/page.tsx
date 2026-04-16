import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/site";
import SectionHeading from "@/components/shared/SectionHeading";
import { SHADOW_MODELS } from "@/data/methodology/shadow-models";
import ShadowStructureDiagram, {
  ShadowShapeOverview,
} from "@/components/methodology/ShadowStructureDiagrams";

export const metadata: Metadata = buildPageMetadata({
  title: "Shadow Structures",
  description:
    "Five different shadow models across the systems mapped on this site - bipolar, tripartite, transit-state, unipolar trap, and dramatic mask. And why the original Shadow cluster was a category error.",
  path: "/about/shadow-structures",
});

type Variant = "kwml" | "tarot" | "enneagram" | "jungian" | "heros-journey";

const VARIANT_BY_ID: Record<string, Variant> = {
  kwml: "kwml",
  tarot: "tarot",
  enneagram: "enneagram",
  jungian: "jungian",
  "heros-journey": "heros-journey",
};

export default function ShadowStructuresPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 py-20 font-serif text-[17px] leading-[1.7] text-text-secondary/90">
      <SectionHeading kicker="About" as="h1">
        Shadow Structures
      </SectionHeading>
      <p className="italic text-text-secondary/85 mb-4">
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
      <p className="text-text-secondary/80 mb-2">
        The clearest way to see the difference is geometric. Each model has a shape: how many
        nodes, how they connect, whether shadow is a pole, a transit, a trap, or a mask.
      </p>

      <ShadowShapeOverview />

      <p className="text-text-secondary/80 mb-2">
        Read down the page and each shape opens up. They do not reduce to one another; the claim
        that they do is the category error this site was corrected to avoid.
      </p>

      <div className="space-y-4 mt-8">
        {SHADOW_MODELS.map((m) => (
          <section key={m.id} id={m.id} className="scroll-mt-24">
            <h2 className="font-serif text-xl font-medium mb-2">{m.heading}</h2>
            <p className="mb-2">{m.body}</p>
            <ShadowStructureDiagram variant={VARIANT_BY_ID[m.id]} />
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
      <p className="mt-4 text-text-secondary/80">
        The shapes above are the argument. Two nodes and a mirror axis (Hero&apos;s Journey) is
        not three nodes in a line (KWML); a directed arrow through a different type (Enneagram)
        is not a single vertical drop from archetype to trap (Pearson). Treat them as one and
        the surface similarity collapses structure that does real work.
      </p>
    </article>
  );
}
