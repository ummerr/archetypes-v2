import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = buildPageMetadata({
  title: "Bibliography",
  description:
    "Primary sources, secondary scholarship, and academic/critical works behind the cross-system resonance map.",
  path: "/about/bibliography",
});

const PRIMARY = [
  "Moore, Robert & Gillette, Douglas - King, Warrior, Magician, Lover (1990)",
  "Moore, Robert - The King Within (1992); The Warrior Within (1992); The Magician Within (1993); The Lover Within (1995)",
  "Pearson, Carol - The Hero Within (1986); Awakening the Heroes Within (1991)",
  "Pearson, Carol & Marr, Hugh - PMAI manual (2003)",
  "Riso, Don Richard & Hudson, Russ - Personality Types (1996); The Wisdom of the Enneagram (1999)",
  "Campbell, Joseph - The Hero with a Thousand Faces (1949)",
  "Vogler, Christopher - The Writer's Journey (2007, 3rd ed.)",
  "Jung, C. G. - Psychological Types (1921); Archetypes and the Collective Unconscious (CW 9i, 1959)",
  "Myers, Isabel Briggs - Gifts Differing (1980)",
  "Waite, Arthur Edward - The Pictorial Key to the Tarot (1910)",
];

const COUNTER_CANON = [
  "Bolen, Jean Shinoda - Goddesses in Everywoman (1984); Gods in Everyman (1989)",
  "Murdock, Maureen - The Heroine's Journey (1990)",
  "Estés, Clarissa Pinkola - Women Who Run With the Wolves (1992)",
  "Brewster, Fanny - African Americans and Jungian Psychology (2020)",
  "Hopcke, Robert - Jung, Jungians and Homosexuality (1989)",
  "Pollack, Rachel - Seventy-Eight Degrees of Wisdom (1980)",
];

const SECONDARY = [
  "Nichols, Sallie - Jung and Tarot: An Archetypal Journey (1980)",
  "Hyde, Lewis - Trickster Makes This World (1998)",
  "Edinger, Edward - Ego and Archetype (1972)",
  "Stein, Murray - Jung's Map of the Soul (1998)",
  "Johnson, Robert - He, She, We (1974–1983)",
  "Hillman, James - The Soul's Code (1996)",
];

const CRITICAL = [
  "Segal, Robert - Joseph Campbell: An Introduction (1987, 1997)",
  "Ellwood, Robert - The Politics of Myth (1999)",
  "Rensma, Ritske - The Innateness of Myth: A New Interpretation of Joseph Campbell (2009)",
  "Gill, Sam - Joseph Campbell and Antisemitism (1989, AAR Proceedings)",
  "Dundes, Alan - Folklore Matters (1989)",
  "Toelken, Barre - The Dynamics of Folklore (1979)",
  "The Drum (2025) - on PMAI and 'Jungian' marketing",
  "Stromberg, Peter - critiques of MBTI psychometric claims",
];

function List({ heading, items }: { heading: string; items: string[] }) {
  return (
    <section className="mb-10">
      <h2 className="font-serif text-xl font-medium mb-3">{heading}</h2>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i} className="italic text-[15px]">
            - {i}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function BibliographyPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 py-20 font-serif text-text-secondary/90">
      <SectionHeading kicker="About" as="h1">
        Bibliography
      </SectionHeading>
      <p className="italic text-text-secondary/85 mb-10">
        The sources behind the map. Not exhaustive - the working set the eleven-mission research
        pipeline drew from. Primary sources carry the most weight in the confidence tiers; critical
        works ensure the map confronts its own blind spots.
      </p>
      <List heading="Primary sources" items={PRIMARY} />
      <List heading="Counter-canon" items={COUNTER_CANON} />
      <List heading="Secondary scholarship" items={SECONDARY} />
      <List heading="Academic / critical" items={CRITICAL} />
    </article>
  );
}
