import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = buildPageMetadata({
  title: "Shadow Structures",
  description:
    "Five different shadow models across the systems mapped on this site — bipolar, tripartite, transit-state, unipolar trap, and dramatic mask. And why the original Shadow cluster was a category error.",
  path: "/about/shadow-structures",
});

const MODELS = [
  {
    id: "kwml",
    heading: "KWML — bipolar shadow per archetype",
    body:
      "Moore & Gillette give every archetype two shadow poles: active-inflation and passive-deflation. King splits into Tyrant (inflated) and Weakling (deflated); Warrior into Sadist and Masochist; Magician into Manipulator and Innocent One; Lover into Addicted Lover and Impotent Lover. The shadow is a grammar of dysfunction, not a character in the story.",
  },
  {
    id: "tarot",
    heading: "Tarot — tripartite (fullness, active shadow, passive shadow)",
    body:
      "Waite-Smith Tarot and its Jungian readers (Nichols, Pollack) often distinguish a card's integrated reading, its active shadow (excess, domination), and its passive shadow (deficit, collapse). The Tower integrated is liberating collapse; active-shadow Tower is destruction sought; passive-shadow Tower is catastrophe suffered.",
  },
  {
    id: "enneagram",
    heading: "Enneagram — integration / disintegration transit-states",
    body:
      "Riso-Hudson describe each type's stress (disintegration) and security (integration) movements along the enneagram arrows. Shadow here is a transit, not a fixed pole — Type 8 under stress takes on Five's isolation; under security it takes on Two's tenderness. Naranjo later disavowed the arrows; they remain contested.",
  },
  {
    id: "jungian",
    heading: "Jungian (Pearson) — single shadow trap per archetype",
    body:
      "Pearson's Awakening the Heroes Within names, for each of the twelve archetypes, a single characteristic distortion: the Caregiver's martyrdom, the Warrior's ruthlessness, the Lover's loss of self, and so on. A unipolar trap rather than a bipolar grammar.",
  },
  {
    id: "heros-journey",
    heading: "Hero's Journey — Shadow as dramatic mask",
    body:
      "Campbell / Vogler's Shadow is a character role in the monomyth — the antagonist who mirrors the hero. It is a function in the drama, not a structural feature of the psyche. That was the category error the old Shadow cluster committed: equating a dramatic mask with KWML's grammar of dysfunction and Tarot's event-symbol.",
  },
];

export default function ShadowStructuresPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 py-20 font-serif text-[17px] leading-[1.7] text-text-secondary/90">
      <SectionHeading kicker="About" as="h1">
        Shadow Structures
      </SectionHeading>
      <p className="italic text-text-secondary/85 mb-10">
        Five traditions — five different theories of what shadow <em>is</em>. The original Shadow
        cluster on this site mixed a grammar (KWML), a transit-state (Enneagram), an event-symbol
        (Tarot Devil), and a dramatic mask (Hero's Journey Shadow) as though they were instances of
        one thing. They are not.
      </p>

      <div className="space-y-10">
        {MODELS.map((m) => (
          <section key={m.id}>
            <h2 className="font-serif text-xl font-medium mb-2">{m.heading}</h2>
            <p>{m.body}</p>
          </section>
        ))}
      </div>

      <h2 className="font-serif text-2xl font-medium mt-14 mb-3">Why it matters</h2>
      <p>
        The five models are not equivalent. A KWML shadow pole and a Hero's Journey Shadow mask
        share only a word. When the map presents them together it uses the{" "}
        <em>Antagonists</em> cluster for figures whose primary narrative function is opposition, and
        reserves shadow-as-typology for this page.
      </p>
    </article>
  );
}
