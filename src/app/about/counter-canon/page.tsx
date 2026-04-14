import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = buildPageMetadata({
  title: "The Counter-Canon",
  description:
    "Bolen, Murdock, Estés, and Brewster as first-class parallel sources to KWML, Campbell, and the broader Jungian canon — not as footnotes.",
  path: "/about/counter-canon",
});

const ENTRIES = [
  {
    heading: "Jean Shinoda Bolen — Goddesses in Everywoman (1984)",
    body:
      "A feminine quaternio organised around seven goddess archetypes (Artemis, Athena, Hestia, Hera, Demeter, Persephone, Aphrodite). Where KWML holds that the masculine psyche organises around four energies, Bolen maps an alternative organisation entirely. Not a translation of KWML into feminine terms — a different psychological geography.",
  },
  {
    heading: "Maureen Murdock — The Heroine's Journey (1990)",
    body:
      "Murdock studied with Campbell and pressed him on whether the monomyth fit women's experience. His response — that women do not need a journey because they are what the hero returns to — was, for Murdock, the book's starting point. Her structure differs from Campbell's: separation from the feminine, identification with the masculine, the trials of success, descent to the goddess, healing the mother-daughter split, integration. A genuinely different arc, not a re-gendering of Campbell's.",
  },
  {
    heading: "Clarissa Pinkola Estés — Women Who Run With the Wolves (1992)",
    body:
      "Twenty years of work on the Wild Woman archetype through folktale. Extends the mythic vocabulary beyond Campbell's inventory and beyond the Jung-Pearson taxonomy. The source site for archetypal figures that do not appear in KWML or Pearson-Marr at all.",
  },
  {
    heading: "Fanny Brewster — African Americans and Jungian Psychology (2020)",
    body:
      "Names the focused avoidance of race in Jungian literature. Introduces the Racial Complex as a category the canon never supplied. Cited on the Jungian about page as primary, not adjunct.",
  },
];

const HONEST = [
  "Moore & Gillette restricted KWML to mature men by their own declaration; gender-neutral readings of the book erase the authors' stated scope.",
  "Campbell's Jungian credentials are contested (Segal, Rensma, IAJS) and documented antisemitism in his private papers (Gill 1989, Segal 1992) complicates any uncomplicated reception.",
  "The Pearson-Marr twelve-archetype wheel was commercially adapted into OCA/PMAI after 2001; The Drum (2025) has called the branded wheel pseudoscience when marketed as Jungian.",
];

export default function CounterCanonPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 py-20 font-serif text-[17px] leading-[1.7] text-text-secondary/90">
      <SectionHeading kicker="About" as="h1">
        The Counter-Canon
      </SectionHeading>
      <p className="italic text-text-secondary/85 mb-8">
        Not footnotes. First-class parallel maps. Where the canon was partial, these writers
        supplied what was missing — sometimes by building an entirely different structure rather
        than correcting the old one.
      </p>

      <div className="space-y-10">
        {ENTRIES.map((e) => (
          <section key={e.heading}>
            <h2 className="font-serif text-xl font-medium mb-2">{e.heading}</h2>
            <p>{e.body}</p>
          </section>
        ))}
      </div>

      <h2 className="font-serif text-2xl font-medium mt-14 mb-3">Honest about the canon</h2>
      <ul className="space-y-3">
        {HONEST.map((h, i) => (
          <li key={i} className="italic">— {h}</li>
        ))}
      </ul>
    </article>
  );
}
