// Canonicalized figures — the cross-system registry.
//
// Each figure lists the names under which it might appear in any of the six
// per-system exemplars files. The `aliases` array lets the resolver match a
// figure to its raw entry even when the exemplar file uses a different spelling
// (e.g., "Parzival" vs "Percival", "King Arthur (Malory / White)" vs
// "King Arthur").
//
// Adding a figure is non-breaking: it only creates a new cross-reference. A
// figure surfaces on /atlas/exemplars only if the resolver finds at least one
// raw entry matching its aliases.

export type FigureKind = "cultural" | "historical";

export interface FigureEntry {
  slug: string;
  displayName: string;
  kind: FigureKind;
  aliases: string[];
  editorialNote?: string;
}

export const FIGURES: FigureEntry[] = [
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
];

export function getFigureBySlug(slug: string): FigureEntry | undefined {
  return FIGURES.find((f) => f.slug === slug);
}
