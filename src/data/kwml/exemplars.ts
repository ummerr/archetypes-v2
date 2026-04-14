import { ExemplarSet } from "@/components/shared/ExemplarsTabs";

// KWML exemplars. Anchored to Robert Moore & Douglas Gillette, King Warrior
// Magician Lover (1990) and the four subsequent volumes — The King Within
// (1992), The Warrior Within (1992), The Magician Within (1993), The Lover
// Within (1993). Moore & Gillette themselves cite many of these figures; others
// follow standard Jungian-men's-work commentary in Robert Bly, James Hollis, and
// the Mankind Project tradition.
//
// For the four mature archetypes, figures illustrate the energy in fullness.
// For the four boy-psychology archetypes, exemplars show the energy before
// initiation — culture's clear-eyed pictures of the boy-pattern, not a
// judgment of the individual.

const MG = "Moore & Gillette 1990";
const MG_K = "Moore & Gillette, The King Within (1992)";
const MG_W = "Moore & Gillette, The Warrior Within (1992)";
const MG_M = "Moore & Gillette, The Magician Within (1993)";
const MG_L = "Moore & Gillette, The Lover Within (1993)";
const COMMUNITY = "standard attribution in Jungian men's-work literature";

export const KWML_EXEMPLARS: Record<string, ExemplarSet> = {
  "the-king": {
    cultural: [
      { name: "Aragorn", medium: "Literature / Film (Tolkien)", note: "The King fully arrived — order, blessing, and sword in one figure.", source: COMMUNITY },
      { name: "T'Challa", medium: "Film (Black Panther)", note: "Sovereignty in service of the people; the throne held lightly.", source: COMMUNITY },
      { name: "Mufasa", medium: "Film (The Lion King)", note: "The King as benevolent order — 'everything the light touches.'", source: COMMUNITY },
      { name: "Ned Stark", medium: "Literature / TV (Game of Thrones)", note: "Warden of the North — duty and justice woven tightly in one man, and the King-archetype punished by a world that no longer rewards it.", source: COMMUNITY },
      { name: "King Arthur (Malory / White)", medium: "Myth / Literature", note: "The founding Western King archetype — Round Table as the King's central political image.", source: MG_K },
    ],
    historical: [
      { name: "Nelson Mandela", note: "The King as forgiver — sovereign grace after twenty-seven years in the cell.", source: COMMUNITY },
      { name: "Queen Elizabeth II", note: "The feminine form of the King — order as continuity through seven decades.", source: COMMUNITY },
      { name: "George Washington", note: "Refused the crown; enacted kingship by declining it. Moore treats Washington as the American King-archetype's founding gesture.", source: MG_K },
      { name: "Akhenaten", note: "The Egyptian King who tried to rewrite the whole religious order — the King-archetype's reformist extreme.", source: MG_K },
    ],
  },

  "the-warrior": {
    cultural: [
      { name: "Maximus", medium: "Film (Gladiator)", note: "Discipline, clarity, and transpersonal loyalty — the Warrior in fullness.", source: COMMUNITY },
      { name: "Captain America", medium: "Film", note: "The Warrior whose cause, not his ego, holds the shield.", source: COMMUNITY },
      { name: "Imperator Furiosa", medium: "Film (Mad Max: Fury Road)", note: "A Warrior dedicated to the rescue of others — force as mercy.", source: COMMUNITY },
      { name: "Éowyn at the Witch-king", medium: "Literature / Film (Tolkien)", note: "The Warrior's moment — 'I am no man' — devoted, exact, unafraid.", source: COMMUNITY },
      { name: "The samurai of Seven Samurai", medium: "Film (Kurosawa)", note: "The Warrior-archetype as corporate discipline in service of farmers — Moore's favorite exemplary image.", source: MG_W },
    ],
    historical: [
      { name: "Shaka Zulu", note: "Warrior discipline at institutional scale — the whole army made one will.", source: MG_W },
      { name: "Harriet Tubman", note: "A Warrior's nineteen missions — trained, practical, unsentimental, lethal when required.", source: COMMUNITY },
      { name: "Audie Murphy", note: "The most decorated American soldier of WWII — the Warrior without bravado.", source: COMMUNITY },
      { name: "Miyamoto Musashi", note: "The Book of Five Rings as explicit Warrior-archetype manual; discipline as philosophical practice.", source: MG_W },
    ],
  },

  "the-magician": {
    cultural: [
      { name: "Gandalf the White", medium: "Literature / Film (Tolkien)", note: "Ritual elder — knowledge held in service of the Fellowship's survival.", source: COMMUNITY },
      { name: "Yoda", medium: "Film", note: "The Magician in withdrawal, transmitting the lineage through the student.", source: COMMUNITY },
      { name: "Prospero", medium: "Literature (Shakespeare)", note: "The sovereign-magician on the island — knowledge used and then drowned.", source: MG_M },
      { name: "Dumbledore", medium: "Literature (Rowling)", note: "The ritual elder who prepares the hero for a death that must include his own.", source: COMMUNITY },
      { name: "Merlin", medium: "Myth (Arthurian)", note: "The archetypal court Magician — knowledge in service of the King, consort to his sovereignty.", source: MG_M },
    ],
    historical: [
      { name: "Carl Jung", note: "The Magician as depth-psychologist — mapping the invisible into practice. Moore explicitly traces KWML to Jung.", source: MG_M },
      { name: "Joseph Campbell", note: "Transmitter of the old mythic knowledge into the modern classroom — Magician as lecturer.", source: COMMUNITY },
      { name: "Fred Rogers", note: "The Magician disguised as a mild man — ritual warmth as transformation.", source: COMMUNITY },
      { name: "Milton Erickson", note: "The clinical Magician — hypnosis reframed as indirect suggestion; Moore cites Ericksonian practice as contemporary Magician lineage.", source: MG_M },
    ],
  },

  "the-lover": {
    cultural: [
      { name: "Elizabeth Bennet", medium: "Literature (Austen)", note: "Feeling wedded to intelligence — the Lover as clear discernment.", source: COMMUNITY },
      { name: "Rumi's speaker", medium: "Literature", note: "Eros opened all the way up into the love of the divine.", source: MG_L },
      { name: "Molly Bloom's soliloquy", medium: "Literature (Joyce, Ulysses)", note: "The Lover's final embodied affirmation — 'yes I said yes I will Yes.'", source: COMMUNITY },
      { name: "Amélie Poulain", medium: "Film", note: "The aesthetic attention that makes every plum, spoon, and cobblestone a lover.", source: COMMUNITY },
      { name: "Zorba the Greek", medium: "Literature / Film (Kazantzakis)", note: "Moore's explicit Lover exemplar — appetite, dance, grief, and embodiment inseparable.", source: MG_L },
    ],
    historical: [
      { name: "Walt Whitman", note: "Body, friendship, democracy, and grass — an American Lover.", source: MG_L },
      { name: "Pablo Neruda", note: "Tongue at the edge of the body; the Lover's voice in a century of war.", source: COMMUNITY },
      { name: "Hafiz", note: "The Persian drunkard on the road between eros and divinity.", source: MG_L },
      { name: "D. H. Lawrence", note: "Moore's twentieth-century Lover reference — the body and sex restored to metaphysical seriousness.", source: MG_L },
    ],
  },

  "the-divine-child": {
    cultural: [
      { name: "Simba (young)", medium: "Film (The Lion King)", note: "The radiant prince before the shadow — unwounded royal potential.", source: COMMUNITY },
      { name: "Peter Pan", medium: "Literature (Barrie)", note: "Shining specialness refusing initiation — the Divine Child frozen.", source: MG },
      { name: "Anakin Skywalker (Episode I)", medium: "Film", note: "The chosen one — shines so brightly the grown men gather around him.", source: COMMUNITY },
      { name: "The Little Prince", medium: "Literature (Saint-Exupéry)", note: "The child from the asteroid — unfallen wonder as teacher.", source: COMMUNITY },
      { name: "The Christ child in nativity iconography", medium: "Myth / Iconography", note: "Moore treats the Christ-child image as the West's central Divine Child motif.", source: MG },
    ],
    historical: [
      { name: "Mozart as a child", note: "The specialness the archetype carries — prodigy as pure generative gift.", source: COMMUNITY },
      { name: "Macaulay Culkin (cultural moment)", note: "The too-bright child burned by the full light of adult attention.", source: COMMUNITY },
      { name: "Young royals (broadly)", note: "Every society stages this archetype in its crown princes and child heirs.", source: MG },
      { name: "Michael Jackson (early Jackson 5 years)", note: "The Divine Child as musical prodigy — the specialness and its later costs made a single public biography.", source: COMMUNITY },
    ],
  },

  "the-hero": {
    cultural: [
      { name: "Luke Skywalker (pre-throne-room)", medium: "Film", note: "The striving boy — courage real, the self still unfinished.", source: MG },
      { name: "Rocky Balboa", medium: "Film", note: "Boy-Hero discipline — 'go the distance,' prove you exist.", source: COMMUNITY },
      { name: "Peter Parker", medium: "Literature / Film", note: "The young Hero — capable, called, still carrying the adolescent wound.", source: COMMUNITY },
      { name: "Billy Batson / Shazam", medium: "Film / Comics", note: "The literal boy in the adult hero's body — the Boy-Hero archetype made superhero premise.", source: COMMUNITY },
      { name: "Achilles (before Patroclus)", medium: "Myth (Homer)", note: "The archetypal Boy-Hero — excellence and rage uninitiated by loss.", source: MG },
    ],
    historical: [
      { name: "Alexander the Great (young)", note: "The Boy Hero at planetary scale — conquest as self-proof.", source: MG },
      { name: "Young Olympic athletes", note: "The striving self made visible — impressive, incomplete.", source: COMMUNITY },
      { name: "Joe Kennedy Jr.", note: "The designated golden son whose heroism was inseparable from his father's plan — the Boy-Hero pattern inside the Kennedy family system.", source: COMMUNITY },
      { name: "Chris McCandless (Into the Wild)", note: "The Boy-Hero archetype untempered by mentorship — self-proof pursued past the point of return.", source: COMMUNITY },
    ],
  },

  "the-precocious-child": {
    cultural: [
      { name: "Stewie Griffin", medium: "Animation (Family Guy)", note: "Comic-exaggerated Precocious Child — intellect without temper or limit.", source: COMMUNITY },
      { name: "Sheldon Cooper", medium: "Television (The Big Bang Theory)", note: "Brilliance uninitiated — genius running ahead of emotional maturity.", source: COMMUNITY },
      { name: "Matilda", medium: "Literature / Film (Dahl)", note: "Precocity under pressure; the clever child negotiating the adult world.", source: COMMUNITY },
      { name: "Hermione (first books)", medium: "Literature (Rowling)", note: "Knowing the spell before the friendship is there to hold it.", source: COMMUNITY },
      { name: "Will Hunting (pre-therapy)", medium: "Film", note: "Boston genius — Precocious Child whose intelligence is both armor and cage.", source: COMMUNITY },
    ],
    historical: [
      { name: "Bobby Fischer (young)", note: "Chess prodigy untempered by social initiation — the pattern's cost visible later in his public disintegration.", source: COMMUNITY },
      { name: "Young Silicon Valley founders", note: "The Precocious Child in the contemporary tech hero-story — Mark Zuckerberg-era founding mythology.", source: COMMUNITY },
      { name: "Academic prodigies (broadly)", note: "Any brilliance sprinting past the initiatory vessels that would temper it.", source: MG },
      { name: "Orson Welles (RKO years)", note: "Citizen Kane at 25 — the Precocious Child's triumph and the subsequent decades of decline.", source: COMMUNITY },
    ],
  },

  "the-oedipal-child": {
    cultural: [
      { name: "Norman Bates", medium: "Film (Psycho)", note: "The most famous cinematic mother-bound boy — desire and identity fused.", source: COMMUNITY },
      { name: "Hamlet", medium: "Literature (Shakespeare)", note: "The archetypal Oedipal struggle — longing, guilt, paralysis around the mother.", source: MG },
      { name: "Michael Corleone (around Mama)", medium: "Film (The Godfather)", note: "The son pulled back into a family orbit he can't finally leave.", source: COMMUNITY },
      { name: "Draco Malfoy", medium: "Literature (Rowling)", note: "Desire-to-please the parent running the life — identity borrowed upward.", source: COMMUNITY },
      { name: "Oedipus himself", medium: "Myth (Sophocles)", note: "The Greek source — Moore's archetype named after this figure because the pattern is unmistakable in the play's structure.", source: MG },
    ],
    historical: [
      { name: "Marcel Proust", note: "The Oedipal tie as the river every volume is written across.", source: COMMUNITY },
      { name: "Franz Kafka (Letter to His Father)", note: "The pattern from the opposite side — the parent as the whole weather system.", source: COMMUNITY },
      { name: "Elvis Presley", note: "The lifelong, untransformed bond with Gladys — the Oedipal Child writ into celebrity.", source: COMMUNITY },
      { name: "Sigmund Freud himself", note: "The psychoanalyst who named the complex and, in Moore's reading, never fully exited it — the Oedipal Child as autobiographical theory-engine.", source: MG },
    ],
  },
};

export function getKwmlExemplars(slug: string): ExemplarSet | undefined {
  return KWML_EXEMPLARS[slug];
}
