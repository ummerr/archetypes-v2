// Canonicalized exemplars — the cross-system registry.
//
// Each entry lists the names under which an exemplar might appear in any of
// the six per-system exemplars files. The resolver (lib/exemplars.ts) uses
// `aliases` to collapse spelling variants so a single card on
// /atlas/exemplars collects every reading (e.g. "Parzival" vs "Percival",
// "King Arthur (Malory / White)" vs "King Arthur").
//
// An entry here is an override, not a gate: every name that appears in a
// per-system exemplars file surfaces on /atlas/exemplars. Adding an entry
// here only merges variants and attaches an editorial note; it never filters
// anything out.

export type ExemplarKind = "cultural" | "historical";

export interface ExemplarEntry {
  slug: string;
  displayName: string;
  kind: ExemplarKind;
  aliases: string[];
  editorialNote?: string;
}

export const CANONICAL_EXEMPLARS: ExemplarEntry[] = [
  {
    slug: "odysseus",
    displayName: "Odysseus",
    kind: "cultural",
    aliases: ["Odysseus", "Ulysses"],
    editorialNote:
      "The round-trip Hero and the Sage-Trickster in one figure — Campbell's monomyth exemplar and a Tarot-register wanderer. Where the traditions diverge on Odysseus is where they actually diverge.",
  },
  {
    slug: "joan-of-arc",
    displayName: "Joan of Arc",
    kind: "historical",
    aliases: ["Joan of Arc"],
    editorialNote: "Peasant girl called by vision — crowned a king, burned for it, canonized centuries later.",
  },
  {
    slug: "forrest-gump",
    displayName: "Forrest Gump",
    kind: "cultural",
    aliases: ["Forrest Gump"],
    editorialNote:
      "Two traditions read the same film figure differently: Jungian as Innocent, Tarot as Fool. Both true, neither sufficient.",
  },
  {
    slug: "amelie-poulain",
    displayName: "Amélie Poulain",
    kind: "cultural",
    aliases: ["Amélie Poulain", "Amelie Poulain", "Amélie"],
  },
  {
    slug: "aragorn",
    displayName: "Aragorn",
    kind: "cultural",
    aliases: ["Aragorn"],
  },
  {
    slug: "frodo-baggins",
    displayName: "Frodo Baggins",
    kind: "cultural",
    aliases: ["Frodo Baggins", "Frodo"],
  },
  {
    slug: "luke-skywalker",
    displayName: "Luke Skywalker",
    kind: "cultural",
    aliases: ["Luke Skywalker"],
  },
  {
    slug: "gandalf",
    displayName: "Gandalf",
    kind: "cultural",
    aliases: ["Gandalf", "Gandalf (administrative mode)"],
  },
  {
    slug: "hermione-granger",
    displayName: "Hermione Granger",
    kind: "cultural",
    aliases: ["Hermione Granger"],
  },
  {
    slug: "hannibal-lecter",
    displayName: "Hannibal Lecter",
    kind: "cultural",
    aliases: ["Hannibal Lecter"],
  },
  {
    slug: "atticus-finch",
    displayName: "Atticus Finch",
    kind: "cultural",
    aliases: ["Atticus Finch"],
  },
  {
    slug: "king-arthur",
    displayName: "King Arthur",
    kind: "cultural",
    aliases: ["King Arthur", "King Arthur (Malory / White)", "Arthur"],
  },
  {
    slug: "don-quixote",
    displayName: "Don Quixote",
    kind: "cultural",
    aliases: ["Don Quixote"],
  },
  {
    slug: "parzival",
    displayName: "Parzival",
    kind: "cultural",
    aliases: ["Parzival", "Percival"],
  },
  {
    slug: "gandhi",
    displayName: "Mahatma Gandhi",
    kind: "historical",
    aliases: ["Mahatma Gandhi", "Gandhi"],
  },
  {
    slug: "mandela",
    displayName: "Nelson Mandela",
    kind: "historical",
    aliases: ["Nelson Mandela", "Mandela"],
  },
  {
    slug: "fred-rogers",
    displayName: "Fred Rogers",
    kind: "historical",
    aliases: ["Fred Rogers", "Mister Rogers"],
  },
  {
    slug: "malala",
    displayName: "Malala Yousafzai",
    kind: "historical",
    aliases: ["Malala Yousafzai", "Malala"],
  },
  {
    slug: "st-francis",
    displayName: "St. Francis of Assisi",
    kind: "historical",
    aliases: ["St. Francis of Assisi", "Saint Francis of Assisi", "Francis of Assisi"],
  },
  {
    slug: "diogenes",
    displayName: "Diogenes of Sinope",
    kind: "historical",
    aliases: ["Diogenes of Sinope", "Diogenes"],
  },
  {
    slug: "moana",
    displayName: "Moana",
    kind: "cultural",
    aliases: ["Moana"],
  },
  {
    slug: "leslie-knope",
    displayName: "Leslie Knope",
    kind: "cultural",
    aliases: ["Leslie Knope"],
  },
  {
    slug: "katniss-everdeen",
    displayName: "Katniss Everdeen",
    kind: "cultural",
    aliases: ["Katniss Everdeen"],
  },

  // ── Tier A — confirmed in 3+ traditions ────────────────────────────────
  {
    slug: "samwise-gamgee",
    displayName: "Samwise Gamgee",
    kind: "cultural",
    aliases: ["Samwise Gamgee", "Samwise on the mountain"],
  },
  {
    slug: "carl-jung",
    displayName: "Carl Jung",
    kind: "historical",
    aliases: [
      "Carl Jung",
      "Carl Jung (mature)",
      "Carl Jung (Red Book period)",
      "Carl Jung (late life)",
    ],
  },
  {
    slug: "frida-kahlo",
    displayName: "Frida Kahlo",
    kind: "cultural",
    aliases: ["Frida Kahlo", "Frida Kahlo & Diego Rivera"],
  },
  {
    slug: "yoda",
    displayName: "Yoda",
    kind: "cultural",
    aliases: ["Yoda", "Yoda (in exile)"],
  },
  {
    slug: "prospero",
    displayName: "Prospero",
    kind: "cultural",
    aliases: ["Prospero", "Prospero breaking the staff"],
  },
  {
    slug: "socrates",
    displayName: "Socrates",
    kind: "historical",
    aliases: ["Socrates"],
  },
  {
    slug: "george-washington",
    displayName: "George Washington",
    kind: "historical",
    aliases: ["George Washington"],
  },
  {
    slug: "mary-poppins",
    displayName: "Mary Poppins",
    kind: "cultural",
    aliases: ["Mary Poppins"],
  },
  {
    slug: "willy-wonka",
    displayName: "Willy Wonka",
    kind: "cultural",
    aliases: ["Willy Wonka"],
  },
  {
    slug: "jay-gatsby",
    displayName: "Jay Gatsby",
    kind: "cultural",
    aliases: ["Jay Gatsby"],
  },
  {
    slug: "dumbledore",
    displayName: "Albus Dumbledore",
    kind: "cultural",
    aliases: [
      "Dumbledore",
      "Albus Dumbledore",
      "Professor Dumbledore",
      "Dumbledore's Pensieve",
    ],
  },

  // ── Tier B — confirmed in 2 traditions ─────────────────────────────────
  {
    slug: "merlin",
    displayName: "Merlin",
    kind: "cultural",
    aliases: ["Merlin"],
  },
  {
    slug: "gollum",
    displayName: "Gollum",
    kind: "cultural",
    aliases: ["Gollum", "Sméagol", "Smeagol"],
  },
  {
    slug: "obi-wan",
    displayName: "Obi-Wan Kenobi",
    kind: "cultural",
    aliases: ["Obi-Wan Kenobi", "Obi-Wan"],
  },
  {
    slug: "sherlock-holmes",
    displayName: "Sherlock Holmes",
    kind: "cultural",
    aliases: ["Sherlock Holmes"],
  },
  {
    slug: "vincent-van-gogh",
    displayName: "Vincent van Gogh",
    kind: "historical",
    aliases: ["Vincent van Gogh"],
  },
  {
    slug: "emily-dickinson",
    displayName: "Emily Dickinson",
    kind: "historical",
    aliases: ["Emily Dickinson"],
  },
  {
    slug: "pablo-neruda",
    displayName: "Pablo Neruda",
    kind: "historical",
    aliases: ["Pablo Neruda"],
  },
  {
    slug: "rumi",
    displayName: "Rumi",
    kind: "historical",
    aliases: ["Rumi", "Rumi's speaker"],
  },
  {
    slug: "joseph-campbell",
    displayName: "Joseph Campbell",
    kind: "historical",
    aliases: ["Joseph Campbell", "Joseph Campbell himself (Sarah Lawrence years)"],
  },
  {
    slug: "confucius",
    displayName: "Confucius",
    kind: "historical",
    aliases: ["Confucius"],
  },
  {
    slug: "anne-frank",
    displayName: "Anne Frank",
    kind: "historical",
    aliases: ["Anne Frank", "Anne Frank's diary"],
  },
  {
    slug: "t-challa",
    displayName: "T'Challa",
    kind: "cultural",
    aliases: ["T'Challa", "Black Panther"],
  },
  {
    slug: "harriet-tubman",
    displayName: "Harriet Tubman",
    kind: "historical",
    aliases: ["Harriet Tubman"],
  },
  {
    slug: "walt-whitman",
    displayName: "Walt Whitman",
    kind: "historical",
    aliases: ["Walt Whitman"],
  },
];

export function getCanonicalExemplarBySlug(slug: string): ExemplarEntry | undefined {
  return CANONICAL_EXEMPLARS.find((e) => e.slug === slug);
}
