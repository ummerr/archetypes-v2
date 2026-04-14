import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = buildPageMetadata({
  title: "Bibliography",
  description:
    "Primary sources, secondary scholarship, and academic/critical works behind the cross-system resonance map.",
  path: "/about/bibliography",
});

type Entry = { text: string; href?: string };

const PRIMARY: Entry[] = [
  { text: "Moore, Robert & Gillette, Douglas - King, Warrior, Magician, Lover (1990)", href: "https://en.wikipedia.org/wiki/Robert_L._Moore_(psychologist)" },
  { text: "Moore, Robert - The King Within (1992); The Warrior Within (1992); The Magician Within (1993); The Lover Within (1995)", href: "https://en.wikipedia.org/wiki/Robert_L._Moore_(psychologist)" },
  { text: "Pearson, Carol - The Hero Within (1986); Awakening the Heroes Within (1991)", href: "https://en.wikipedia.org/wiki/Carol_S._Pearson" },
  { text: "Pearson, Carol & Marr, Hugh - PMAI manual (2003)", href: "https://carolspearson.com/about/archetypal-assessment-pearson-marr-archetype-indicator-r" },
  { text: "Riso, Don Richard & Hudson, Russ - Personality Types (1996); The Wisdom of the Enneagram (1999)", href: "https://en.wikipedia.org/wiki/Don_Richard_Riso" },
  { text: "Campbell, Joseph - The Hero with a Thousand Faces (1949)", href: "https://en.wikipedia.org/wiki/The_Hero_with_a_Thousand_Faces" },
  { text: "Vogler, Christopher - The Writer's Journey (2007, 3rd ed.)", href: "https://en.wikipedia.org/wiki/The_Writer%27s_Journey:_Mythic_Structure_For_Writers" },
  { text: "Jung, C. G. - Psychological Types (1921); Archetypes and the Collective Unconscious (CW 9i, 1959)", href: "https://en.wikipedia.org/wiki/Psychological_Types" },
  { text: "Myers, Isabel Briggs - Gifts Differing (1980)", href: "https://en.wikipedia.org/wiki/Gifts_Differing" },
  { text: "Waite, Arthur Edward - The Pictorial Key to the Tarot (1910)", href: "https://en.wikipedia.org/wiki/The_Pictorial_Key_to_the_Tarot" },
];

const COUNTER_CANON: Entry[] = [
  { text: "Bolen, Jean Shinoda - Goddesses in Everywoman (1984); Gods in Everyman (1989)", href: "https://en.wikipedia.org/wiki/Jean_Shinoda_Bolen" },
  { text: "Murdock, Maureen - The Heroine's Journey (1990)", href: "https://en.wikipedia.org/wiki/Heroine%27s_journey" },
  { text: "Estés, Clarissa Pinkola - Women Who Run With the Wolves (1992)", href: "https://en.wikipedia.org/wiki/Women_Who_Run_with_the_Wolves" },
  { text: "Brewster, Fanny - African Americans and Jungian Psychology (2020)", href: "https://www.routledge.com/African-Americans-and-Jungian-Psychology-Leaving-the-Shadows/Brewster/p/book/9781138952768" },
  { text: "Hopcke, Robert - Jung, Jungians and Homosexuality (1989)", href: "https://wipfandstock.com/9781579108632/jung-jungians-and-homosexuality/" },
  { text: "Pollack, Rachel - Seventy-Eight Degrees of Wisdom (1980)", href: "https://en.wikipedia.org/wiki/Rachel_Pollack" },
];

const SECONDARY: Entry[] = [
  { text: "Nichols, Sallie - Jung and Tarot: An Archetypal Journey (1980)", href: "https://www.redwheelweiser.com/9780877285151/jung-and-tarot/" },
  { text: "Hyde, Lewis - Trickster Makes This World (1998)", href: "https://en.wikipedia.org/wiki/Lewis_Hyde" },
  { text: "Edinger, Edward - Ego and Archetype (1972)", href: "https://en.wikipedia.org/wiki/Edward_F._Edinger" },
  { text: "Stein, Murray - Jung's Map of the Soul (1998)" },
  { text: "Johnson, Robert - He, She, We (1974–1983)", href: "https://en.wikipedia.org/wiki/Robert_A._Johnson_(psychotherapist)" },
  { text: "Hillman, James - The Soul's Code (1996)", href: "https://en.wikipedia.org/wiki/James_Hillman" },
];

const CRITICAL: Entry[] = [
  { text: "Segal, Robert - Joseph Campbell: An Introduction (1987, 1997)", href: "https://en.wikipedia.org/wiki/Robert_A._Segal" },
  { text: "Ellwood, Robert - The Politics of Myth (1999)", href: "https://en.wikipedia.org/wiki/Robert_Ellwood" },
  { text: "Rensma, Ritske - The Innateness of Myth: A New Interpretation of Joseph Campbell (2009)", href: "https://www.bloomsbury.com/us/innateness-of-myth-9781441151124/" },
  { text: "Gill, Sam - Joseph Campbell and Antisemitism (1989, AAR Proceedings)" },
  { text: "Dundes, Alan - Folklore Matters (1989)", href: "https://en.wikipedia.org/wiki/Alan_Dundes" },
  { text: "Toelken, Barre - The Dynamics of Folklore (1979)", href: "https://en.wikipedia.org/wiki/Barre_Toelken" },
  { text: "The Drum (2025) - on PMAI and 'Jungian' marketing" },
  { text: "Stromberg, Peter - critiques of MBTI psychometric claims" },
];

function List({ heading, items }: { heading: string; items: Entry[] }) {
  return (
    <section className="mb-10">
      <h2 className="font-serif text-xl font-medium mb-3">{heading}</h2>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.text} className="italic text-[15px]">
            -{" "}
            {i.href ? (
              <a
                href={i.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-text-secondary/30 hover:decoration-text-secondary transition-colors"
              >
                {i.text}
              </a>
            ) : (
              i.text
            )}
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
