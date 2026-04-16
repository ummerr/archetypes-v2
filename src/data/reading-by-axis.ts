import type { Stage, Affect, Stance } from "@/data/atlas-lens-axes";

export interface ReadingEntry {
  text: string;
  href?: string;
  note: string;
}

type AxisPole = Stage | Affect | Stance;

// Curated reading recommendations by axis-pole. Intentionally small — 2-4
// entries per pole, each chosen to deepen vocabulary for readers whose
// self-picks cluster away from that pole. Not exhaustive; see the full
// bibliography for the working set.
export const READING_BY_POLE: Partial<Record<AxisPole, ReadingEntry[]>> = {
  // Stage
  "pre-initiation": [
    {
      text: "Moore & Gillette — King, Warrior, Magician, Lover (1990)",
      href: "https://en.wikipedia.org/wiki/King,_Warrior,_Magician,_Lover",
      note: "The boy-psychology chapters are the classic pre-initiation map — what each archetype looks like before the crossing.",
    },
    {
      text: "Hollis, James — The Middle Passage (1993)",
      href: "https://en.wikipedia.org/wiki/James_Hollis",
      note: "What happens when the first half of life refuses to end — the pre-initiation stuck in an adult body.",
    },
  ],
  striving: [
    {
      text: "Campbell, Joseph — The Hero with a Thousand Faces (1949)",
      href: "https://en.wikipedia.org/wiki/The_Hero_with_a_Thousand_Faces",
      note: "The striving pole's canonical text — the call, the ordeal, the return read as universal structure.",
    },
    {
      text: "Pearson, Carol — Awakening the Heroes Within (1991)",
      href: "https://en.wikipedia.org/wiki/Carol_S._Pearson",
      note: "Ego-level archetypes (Orphan, Warrior, Seeker) as striving toward a coherent self.",
    },
  ],
  liminal: [
    {
      text: "Hyde, Lewis — Trickster Makes This World (1998)",
      href: "https://en.wikipedia.org/wiki/Lewis_Hyde",
      note: "The liminal pole as cultural method — boundary-crossing as how new meaning enters.",
    },
    {
      text: "Turner, Victor — The Ritual Process (1969)",
      note: "The anthropological grounding: 'liminal' as a technical stage, not a metaphor.",
    },
    {
      text: "Estés, Clarissa Pinkola — Women Who Run With the Wolves (1992)",
      href: "https://en.wikipedia.org/wiki/Women_Who_Run_with_the_Wolves",
      note: "Descent and return read through folktale — the liminal as feminine initiation.",
    },
  ],
  integrating: [
    {
      text: "Edinger, Edward — Ego and Archetype (1972)",
      href: "https://en.wikipedia.org/wiki/Edward_F._Edinger",
      note: "The ego-Self axis as lifelong integration — Jung's individuation rendered diagrammatic.",
    },
    {
      text: "Johnson, Robert — He, She, We (1974–83)",
      note: "The integrating work of opposites across three short books.",
    },
  ],
  integrated: [
    {
      text: "Moore, Robert — The King Within (1992)",
      note: "The integrated Sovereign as blessing-giver — Moore's deepest book on what maturity looks like.",
    },
    {
      text: "Hillman, James — The Soul's Code (1996)",
      href: "https://en.wikipedia.org/wiki/James_Hillman",
      note: "Late-life vocation as the integrated self coming into its own shape.",
    },
  ],

  // Affect
  gut: [
    {
      text: "Palmer, Helen — The Enneagram (1988)",
      note: "The gut-triad chapters (Eight, Nine, One) — anger as the body-center's formative affect.",
    },
    {
      text: "Bolen, Jean Shinoda — Gods in Everyman (1989)",
      href: "https://en.wikipedia.org/wiki/Jean_Shinoda_Bolen",
      note: "Ares, Hephaestus, Hades — the gut-archetypes in Olympian register.",
    },
  ],
  heart: [
    {
      text: "Nichols, Sallie — Jung and Tarot (1980)",
      href: "https://www.redwheelweiser.com/9780877285151/jung-and-tarot/",
      note: "The heart-triad arcana (Lovers, Hierophant, Devil) read with unusual psychological care.",
    },
    {
      text: "Riso & Hudson — The Wisdom of the Enneagram (1999)",
      note: "The image/shame triad (Two, Three, Four) — the heart-center's signature distortions and healing.",
    },
  ],
  head: [
    {
      text: "Jung, C. G. — Psychological Types (1921)",
      href: "https://en.wikipedia.org/wiki/Psychological_Types",
      note: "The head-center's founding text — thinking, intuition, and the architecture of typology.",
    },
    {
      text: "Stein, Murray — Jung's Map of the Soul (1998)",
      note: "A precise, thinking-typed guide to Jung for readers who want the head-center's rigor without loss of depth.",
    },
  ],
  eros: [
    {
      text: "Moore, Robert — The Lover Within (1993)",
      note: "Eros as a developmental archetype, not a scandal — Moore's most tender volume.",
    },
    {
      text: "Pollack, Rachel — Seventy-Eight Degrees of Wisdom (1980)",
      href: "https://en.wikipedia.org/wiki/Rachel_Pollack",
      note: "Tarot read as a language of desire; the Lovers card as a whole philosophy of relational knowing.",
    },
  ],

  // Stance
  toward: [
    {
      text: "Pearson, Carol — The Hero Within (1986)",
      note: "The toward-stance mapped — Orphan, Seeker, Warrior, Caregiver as styles of engagement.",
    },
    {
      text: "Johnson, Robert — We (1983)",
      note: "Courtly love as the Western archetype of the toward-stance in its romantic register.",
    },
  ],
  against: [
    {
      text: "Moore & Gillette — The Warrior Within (1992)",
      note: "The against-stance as a discipline of service, not violence — the book most explicit about how the Warrior oriented-against works.",
    },
    {
      text: "Hyde, Lewis — Trickster Makes This World (1998)",
      href: "https://en.wikipedia.org/wiki/Lewis_Hyde",
      note: "Against-the-order as cultural gift — the Trickster's inversion of what power has settled.",
    },
  ],
  away: [
    {
      text: "Hillman, James — The Soul's Code (1996)",
      href: "https://en.wikipedia.org/wiki/James_Hillman",
      note: "The away-stance as vocation — turning from consensus to follow an inner figure's call.",
    },
    {
      text: "Nichols, Sallie — Jung and Tarot (1980)",
      note: "The Hermit as the away-stance exemplar — withdrawal as the condition of sight.",
    },
  ],
};
