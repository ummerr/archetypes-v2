import { ExemplarSet } from "@/components/shared/ExemplarsTabs";

// KWML (Moore & Gillette) exemplars. For the four mature archetypes, figures
// illustrate the energy in fullness. For the four boy-psychology archetypes,
// exemplars show the energy before initiation - culture's clear-eyed pictures
// of the boy-pattern, not a judgment of the individual.

export const KWML_EXEMPLARS: Record<string, ExemplarSet> = {
  "the-king": {
    cultural: [
      { name: "Aragorn", medium: "Literature / Film", note: "The king fully arrived - order, blessing, and sword in one figure." },
      { name: "T'Challa (Black Panther)", medium: "Film", note: "Sovereignty in service of the people; the throne held lightly." },
      { name: "Mufasa", medium: "Film", note: "The King as benevolent order - everything the light touches." },
      { name: "Ned Stark (intended)", medium: "Literature / TV", note: "Warden of the North - duty and justice woven tightly in one man." },
    ],
    historical: [
      { name: "Nelson Mandela", note: "The King as forgiver; sovereign grace after twenty-seven years in the cell." },
      { name: "Queen Elizabeth II", note: "The feminine form of the King - order as continuity through seven decades." },
      { name: "George Washington", note: "Refused the crown; enacted kingship by declining it." },
    ],
  },

  "the-warrior": {
    cultural: [
      { name: "Maximus (Gladiator)", medium: "Film", note: "Discipline, clarity, and transpersonal loyalty - the Warrior in fullness." },
      { name: "Captain America", medium: "Film", note: "The Warrior whose cause, not his ego, holds the shield." },
      { name: "Furiosa", medium: "Film", note: "A Warrior dedicated to the rescue of others; force as mercy." },
      { name: "Éowyn at the Witch-King", medium: "Literature / Film", note: "The Warrior's moment - no man am I - devoted, exact, unafraid." },
    ],
    historical: [
      { name: "Shaka Zulu", note: "Warrior discipline at institutional scale; the whole army one will." },
      { name: "Harriet Tubman", note: "A Warrior's nineteen missions - trained, practical, unsentimental." },
      { name: "Audie Murphy", note: "The most decorated American soldier of WWII; the Warrior without bravado." },
    ],
  },

  "the-magician": {
    cultural: [
      { name: "Gandalf the White", medium: "Literature / Film", note: "Ritual elder - knowledge held in service of the Fellowship's survival." },
      { name: "Yoda", medium: "Film", note: "The Magician in withdrawal, transmitting the lineage through the student." },
      { name: "Prospero", medium: "Literature", note: "The sovereign-magician on the island - knowledge used and then drowned." },
      { name: "Dumbledore", medium: "Literature", note: "The ritual elder who prepares the hero for a death that must include his own." },
    ],
    historical: [
      { name: "Carl Jung", note: "The Magician as depth-psychologist - mapping the invisible into practice." },
      { name: "Joseph Campbell", note: "Transmitter of the old mythic knowledge into the modern classroom." },
      { name: "Fred Rogers", note: "The Magician disguised as a mild man - ritual warmth as transformation." },
    ],
  },

  "the-lover": {
    cultural: [
      { name: "Elizabeth Bennet", medium: "Literature", note: "Feeling wedded to intelligence; the Lover as clear discernment." },
      { name: "Rumi's speaker", medium: "Literature", note: "Eros opened all the way up into the love of the divine." },
      { name: "Molly Bloom's yes", medium: "Literature", note: "The Lover's final, embodied affirmation - yes I said yes I will Yes." },
      { name: "Amélie Poulain", medium: "Film", note: "The aesthetic attention that makes every plum, spoon, and cobblestone a lover." },
    ],
    historical: [
      { name: "Walt Whitman", note: "Body, friendship, democracy, and grass - an American Lover." },
      { name: "Pablo Neruda", note: "Tongue at the edge of the body; the Lover's voice in a century of war." },
      { name: "Hafiz", note: "The Persian drunkard on the road between eros and divinity." },
    ],
  },

  "the-divine-child": {
    cultural: [
      { name: "Simba (young)", medium: "Film", note: "The radiant prince before the shadow; unwounded royal potential." },
      { name: "Peter Pan", medium: "Literature", note: "Shining specialness refusing initiation - the Divine Child frozen." },
      { name: "Anakin Skywalker (Episode I)", medium: "Film", note: "The chosen one; shines so brightly the grown men gather around him." },
      { name: "Little Prince", medium: "Literature", note: "The child from the asteroid - unfallen wonder as teacher." },
    ],
    historical: [
      { name: "Mozart as a child", note: "The specialness the archetype carries - prodigy as pure generative gift." },
      { name: "Macaulay Culkin (cultural moment)", note: "The too-bright child burned by the full light of adult attention." },
      { name: "Young royals (broadly)", note: "Any society stages this archetype in its crown princes and child heirs." },
    ],
  },

  "the-hero": {
    cultural: [
      { name: "Luke Skywalker (pre-throne-room)", medium: "Film", note: "The striving boy - courage real, the self still unfinished." },
      { name: "Rocky Balboa", medium: "Film", note: "Boy-Hero discipline - go the distance, prove you exist." },
      { name: "Peter Parker", medium: "Literature / Film", note: "The young hero - capable, called, still carrying the adolescent wound." },
      { name: "Billy Batson (Shazam)", medium: "Film / Comics", note: "The literal boy in the adult hero's body." },
    ],
    historical: [
      { name: "Alexander the Great (young)", note: "The Boy Hero taken to the planetary scale; conquest as self-proof." },
      { name: "Young athletes (Olympians at 17)", note: "The striving self made visible - impressive, incomplete." },
      { name: "Joe Kennedy Jr.", note: "The designated golden son whose heroism was inseparable from his father's plan." },
    ],
  },

  "the-precocious-child": {
    cultural: [
      { name: "Stewie Griffin", medium: "Animation", note: "Comic-exaggerated Precocious Child - intellect without temper or limit." },
      { name: "Sheldon Cooper", medium: "Television", note: "Brilliance uninitiated; genius running ahead of emotional maturity." },
      { name: "Matilda", medium: "Literature / Film", note: "Precocity under pressure; the clever child negotiating the adult world." },
      { name: "Hermione (first books)", medium: "Literature", note: "Knowing the spell before the friendship is there to hold it." },
    ],
    historical: [
      { name: "Bobby Fischer (young)", note: "Chess prodigy untempered by social initiation - the pattern's cost visible later." },
      { name: "Young Silicon Valley founders", note: "The Precocious Child in the contemporary tech hero-story." },
      { name: "Academic prodigies (broadly)", note: "Any brilliance sprinting past the initiatory vessels that would temper it." },
    ],
  },

  "the-oedipal-child": {
    cultural: [
      { name: "Norman Bates", medium: "Film", note: "The most famous cinematic mother-bound boy - desire and identity fused." },
      { name: "Hamlet", medium: "Literature", note: "The archetypal Oedipal struggle - longing, guilt, paralysis around the mother." },
      { name: "Michael Corleone (early, around Mama)", medium: "Film", note: "The son pulled back into a family orbit he can't finally leave." },
      { name: "Draco Malfoy", medium: "Literature", note: "Desire-to-please the parent running the life; identity borrowed upward." },
    ],
    historical: [
      { name: "Marcel Proust", note: "The Oedipal tie as the river every volume is written across." },
      { name: "Franz Kafka (Letter to His Father)", note: "The pattern from the opposite side - the parent as the whole weather system." },
      { name: "Elvis Presley", note: "The lifelong, untransformed bond with Gladys; the Oedipal Child writ into celebrity." },
    ],
  },
};

export function getKwmlExemplars(slug: string): ExemplarSet | undefined {
  return KWML_EXEMPLARS[slug];
}
