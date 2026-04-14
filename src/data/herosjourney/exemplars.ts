import { ExemplarSet } from "@/components/shared/ExemplarsTabs";

// Hero's Journey role exemplars. The role-taxonomy itself (Hero, Mentor,
// Herald, Threshold Guardian, Shapeshifter, Shadow, Trickster, Ally) is
// Christopher Vogler's in The Writer's Journey (1st ed. 1992, 3rd ed. 2007),
// adapted from Joseph Campbell's The Hero with a Thousand Faces (1949). Vogler
// names many of his examples directly; Campbell gestures at others through
// cross-cultural myth. Attributions are illustrative.

const CAMPBELL = "Campbell 1949";
const VOGLER = "Vogler 2007";
const INTERP = "interpretive attribution";

export const HEROSJOURNEY_EXEMPLARS: Record<string, ExemplarSet> = {
  hero: {
    cultural: [
      { name: "Luke Skywalker", medium: "Film", note: "The called young hero — farm to saber to father-confrontation. Vogler's flagship contemporary example and the film Campbell himself watched and endorsed.", source: VOGLER },
      { name: "Frodo Baggins", medium: "Literature / Film (Tolkien)", note: "The unwilling hero whose ordinariness is precisely the qualification.", source: VOGLER },
      { name: "Katniss Everdeen", medium: "Literature / Film", note: "Protects a sister, is pulled into a revolution — the reluctant symbol the Capitol's own cameras create.", source: INTERP },
      { name: "Moana", medium: "Film", note: "Answers the call past the reef — brings the heart of Te Fiti home.", source: INTERP },
      { name: "Odysseus", medium: "Myth (Homer)", note: "The archetypal return-journey Hero — Campbell's Greek exemplar of the full round-trip structure.", source: CAMPBELL },
    ],
    historical: [
      { name: "Joan of Arc", note: "Peasant girl called by vision — crowned a king, burned for it, canonized centuries later.", source: CAMPBELL },
      { name: "Nelson Mandela", note: "Long journey out and back — returned with the boon of reconciliation.", source: INTERP },
      { name: "Malala Yousafzai", note: "Called by the bullet — carries the boon of a girls' right to school as Nobel-scale public figure.", source: INTERP },
      { name: "Ernest Shackleton", note: "The Endurance expedition as literal Campbellian round-trip — departure, abyss, return with all hands.", source: INTERP },
    ],
  },

  mentor: {
    cultural: [
      { name: "Gandalf", medium: "Literature / Film (Tolkien)", note: "Bestower of wisdom and staff — walks the Hero to the threshold and no further. Vogler's canonical Mentor.", source: VOGLER },
      { name: "Obi-Wan Kenobi", medium: "Film", note: "Hands over the saber, teaches the first lessons, steps aside in death — the Mentor's classic function-arc.", source: VOGLER },
      { name: "Mr. Miyagi", medium: "Film (The Karate Kid)", note: "'Wax on, wax off' — mastery taught slantwise, through ritual.", source: INTERP },
      { name: "Professor Dumbledore", medium: "Literature (Rowling)", note: "The schoolmaster who prepares the Hero for his own inevitable loss.", source: INTERP },
      { name: "Athena (disguised as Mentor)", medium: "Myth (Homer, Odyssey)", note: "The goddess who advises Telemachus under the name that gave the archetype its label.", source: CAMPBELL },
    ],
    historical: [
      { name: "Socrates", note: "The archetypal Western Mentor — patient questions, lifelong students, death in the prison cell.", source: CAMPBELL },
      { name: "Maya Angelou", note: "Matriarch-teacher whose writing is itself a sustained Mentor transmission.", source: INTERP },
      { name: "Mister Rogers", note: "A gentle national Mentor — transmission by repeated ritual over three decades of television.", source: INTERP },
      { name: "Joseph Campbell himself (Sarah Lawrence years)", note: "Mentor of mentors — thirty-eight years of teaching that produced the very framework this whole taxonomy lives inside.", source: VOGLER },
    ],
  },

  herald: {
    cultural: [
      { name: "Hagrid ('Yer a wizard, Harry')", medium: "Literature (Rowling)", note: "Arrives with the letter — the call delivered on the doorstep.", source: INTERP },
      { name: "R2-D2 with Leia's message", medium: "Film", note: "'Help me Obi-Wan' — the Herald's holographic summons, Vogler's favorite example.", source: VOGLER },
      { name: "The White Rabbit", medium: "Literature (Carroll)", note: "'I'm late, I'm late' — the Herald who lures Alice down the hole.", source: VOGLER },
      { name: "Effie Trinket", medium: "Literature / Film (The Hunger Games)", note: "The ceremonial voice that draws Katniss's name — the Herald as ritual functionary.", source: INTERP },
      { name: "The angel Gabriel", medium: "Myth", note: "The Annunciation as the West's archetypal Herald scene — the call delivered to a reluctant recipient.", source: CAMPBELL },
    ],
    historical: [
      { name: "John the Baptist", note: "Prepared the way — the prototype Herald of the Western tradition.", source: CAMPBELL },
      { name: "Greta Thunberg", note: "Carried the summons from the warming planet to the chambers of power.", source: INTERP },
      { name: "Rachel Carson", note: "Silent Spring (1962) as Herald — announced the call to ecological awakening to an unprepared country.", source: INTERP },
      { name: "Paul Revere", note: "Literal midnight Herald of an American revolution — the function in its plainest form.", source: INTERP },
    ],
  },

  "threshold-guardian": {
    cultural: [
      { name: "The Black Knight", medium: "Film (Monty Python)", note: "The comic Threshold Guardian — tests resolve by refusing passage, even after dismemberment.", source: INTERP },
      { name: "The Sphinx", medium: "Myth (Sophocles)", note: "Riddle as gate — you pass by proving you have ears. Campbell's paradigmatic Guardian.", source: CAMPBELL },
      { name: "Cerberus", medium: "Myth", note: "Three heads at the door of the dead — not malice, custody.", source: CAMPBELL },
      { name: "The Keymaster / Gatekeeper", medium: "Film (Ghostbusters)", note: "Tests whether the hero is ready for what is beyond the door — Guardian played for comedy.", source: VOGLER },
      { name: "Charon", medium: "Myth", note: "The ferryman whose obol-toll is itself the Threshold Guardian's tax.", source: CAMPBELL },
    ],
    historical: [
      { name: "Temple gatekeepers (cross-cultural)", note: "Every initiation tradition posts figures whose job is to refuse the uncommitted.", source: CAMPBELL },
      { name: "Scholarship and residency committees", note: "Modern Threshold Guardians — the gates that test the resolve of the applicant.", source: VOGLER },
      { name: "The bouncer at the door", note: "Everyday form of the archetype — resolve tested at the club entrance.", source: VOGLER },
      { name: "Immigration officers at the port", note: "The Guardian function institutionalized — the call to the new world is also this desk.", source: INTERP },
    ],
  },

  shapeshifter: {
    cultural: [
      { name: "Mystique", medium: "Film / Comics (X-Men)", note: "Allegiance legible on no face — ally, adversary, unclear by design.", source: INTERP },
      { name: "Catwoman", medium: "Film / Comics", note: "The classic Shapeshifter opposite Batman — enemy, lover, both at once.", source: VOGLER },
      { name: "Gollum", medium: "Literature / Film (Tolkien)", note: "Sméagol and Gollum — two faces at the edge of every moment, Vogler's textbook Shapeshifter.", source: VOGLER },
      { name: "Edmund Pevensie (early Narnia)", medium: "Literature (Lewis)", note: "Brother, then betrayer, then redeemed — the shifting ally.", source: INTERP },
      { name: "Circe", medium: "Myth (Homer)", note: "The witch who shifts men into pigs — Campbell's archetypal female Shapeshifter-figure.", source: CAMPBELL },
    ],
    historical: [
      { name: "Mata Hari", note: "Dancer, courtesan, spy — the Shapeshifter's legend, executed in 1917.", source: INTERP },
      { name: "Kim Philby", note: "Friend and betrayer simultaneously — the whole life a doubled face at the heart of MI6.", source: INTERP },
      { name: "Aaron Burr", note: "Ally and adversary of Hamilton in overlapping measure — the Shapeshifter in early-republic politics.", source: INTERP },
      { name: "Talleyrand", note: "Served Louis XVI, the Revolution, Napoleon, and the Restoration — the Shapeshifter as diplomatic survival-strategy.", source: INTERP },
    ],
  },

  shadow: {
    cultural: [
      { name: "Darth Vader", medium: "Film", note: "The shadow-father — the dark mirror Luke must both fight and redeem. Vogler's founding Shadow example.", source: VOGLER },
      { name: "Voldemort", medium: "Literature (Rowling)", note: "Harry's inverse twin — what the Hero refuses to become.", source: INTERP },
      { name: "Thanos", medium: "Film (Marvel)", note: "The ideology the Hero must meet at full scale — the Shadow as cosmological antagonist.", source: INTERP },
      { name: "Sauron", medium: "Literature / Film (Tolkien)", note: "The disembodied, all-seeing Shadow against which the Hero is defined.", source: INTERP },
      { name: "Iago", medium: "Literature (Shakespeare, Othello)", note: "The Shadow as intimate — the betrayer inside the trusted circle, which Vogler marks as the Shadow's most potent form.", source: VOGLER },
    ],
    historical: [
      { name: "Adolf Hitler (for the Allied generation)", note: "The civilizational Shadow — the figure every mid-century hero was measured against.", source: INTERP },
      { name: "Osama bin Laden (post-9/11)", note: "A generation's external Shadow — the villain that organized the long campaign.", source: INTERP },
      { name: "King George III (for the American revolutionaries)", note: "The tyrant that gave the revolution its silhouette.", source: INTERP },
      { name: "Stalin (for Cold War imagination)", note: "The Shadow of a half-century of American self-definition — 'the system we are not.'", source: INTERP },
    ],
  },

  trickster: {
    cultural: [
      { name: "Loki", medium: "Myth / Film", note: "The original Northern Trickster — disrupts the gods' assembly and transforms the story.", source: VOGLER },
      { name: "Bugs Bunny", medium: "Animation", note: "The American Trickster, re-framing every plot through wit. Vogler cross-references Brer Rabbit's slave-era lineage.", source: VOGLER },
      { name: "Hermes", medium: "Myth", note: "Messenger and thief — cheerful disruption of the serious order. Campbell's Greek Trickster.", source: CAMPBELL },
      { name: "Puck", medium: "Literature (Shakespeare, Midsummer Night's Dream)", note: "'What fools these mortals be' — the Trickster as stage sprite.", source: INTERP },
      { name: "Anansi", medium: "Myth (West African / diasporic)", note: "The spider-Trickster whose stories crossed the Atlantic and became foundational to Caribbean and African-American folklore.", source: CAMPBELL },
    ],
    historical: [
      { name: "Benjamin Franklin", note: "Diplomat by cunning — talked the French into financing a revolution. The Trickster in founding-father register.", source: INTERP },
      { name: "Jon Stewart", note: "Comedy as truth-telling — the Trickster as public conscience in the post-9/11 cable era.", source: INTERP },
      { name: "Muhammad Ali", note: "Boasts, rope-a-dopes, and taunts — wit as a dimension of combat.", source: INTERP },
      { name: "Abbie Hoffman", note: "Yippie street-theater activism — the Trickster as political method in 1968.", source: INTERP },
    ],
  },

  ally: {
    cultural: [
      { name: "Samwise Gamgee", medium: "Literature / Film (Tolkien)", note: "The salt-of-the-earth companion whose loyalty carries the quest. Vogler's canonical Ally.", source: VOGLER },
      { name: "Ron Weasley", medium: "Literature (Rowling)", note: "The mate — present through every year, quiet under the star.", source: INTERP },
      { name: "Chewbacca", medium: "Film", note: "Loyalty across species — the wordless Ally who never wavers.", source: INTERP },
      { name: "Dr. Watson", medium: "Literature (Doyle)", note: "The steady hand to the genius; the Ally as narrator and moral frame.", source: VOGLER },
      { name: "Enkidu", medium: "Myth (Epic of Gilgamesh)", note: "Humanity's oldest literary Ally — Gilgamesh's companion whose death triggers the rest of the epic.", source: CAMPBELL },
    ],
    historical: [
      { name: "Ralph Abernathy to Martin Luther King Jr.", note: "The loyal second whose presence made the first possible.", source: INTERP },
      { name: "Eleanor Roosevelt to Franklin", note: "Partner-Ally whose work became a half of the presidency.", source: INTERP },
      { name: "Robert Kennedy to John Kennedy", note: "Brother-Ally — consigliere, conscience, and campaign manager.", source: INTERP },
      { name: "George Fabyan to the early American codebreakers", note: "The patron-Ally whose Riverbank Laboratories seeded U.S. cryptography — the Ally as funder of the Hero's work.", source: INTERP },
    ],
  },
};

export function getHerosJourneyExemplars(slug: string): ExemplarSet | undefined {
  return HEROSJOURNEY_EXEMPLARS[slug];
}
