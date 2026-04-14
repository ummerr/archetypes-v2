import { ExemplarSet } from "@/components/shared/ExemplarsTabs";

// Hero's Journey role exemplars. The cultural register is naturally story-driven
// here - figures who have filled the function in a canonical narrative.

export const HEROSJOURNEY_EXEMPLARS: Record<string, ExemplarSet> = {
  hero: {
    cultural: [
      { name: "Luke Skywalker", medium: "Film", note: "The called young hero; farm to saber to father-confrontation." },
      { name: "Frodo Baggins", medium: "Literature / Film", note: "The unwilling hero whose ordinariness is precisely the qualification." },
      { name: "Katniss Everdeen", medium: "Literature / Film", note: "Protects a sister, is pulled into a revolution; the reluctant symbol." },
      { name: "Moana", medium: "Film", note: "Answers the call past the reef; brings the heart of Te Fiti home." },
    ],
    historical: [
      { name: "Joan of Arc", note: "Peasant girl, called by vision, crowned a king, burned for it." },
      { name: "Nelson Mandela", note: "Long journey out and back; returned with the boon of reconciliation." },
      { name: "Malala Yousafzai", note: "Called by the bullet; carries the boon of a girls' right to school." },
    ],
  },

  mentor: {
    cultural: [
      { name: "Gandalf", medium: "Literature / Film", note: "Bestower of wisdom and staff; walks the hero to the threshold and no further." },
      { name: "Obi-Wan Kenobi", medium: "Film", note: "Hands over the saber, teaches the first lessons, steps aside in death." },
      { name: "Mr. Miyagi", medium: "Film", note: "Wax on, wax off - mastery taught slantwise, through ritual." },
      { name: "Professor Dumbledore", medium: "Literature", note: "The schoolmaster who prepares the hero for his own inevitable loss." },
    ],
    historical: [
      { name: "Socrates", note: "The archetypal Western mentor - patient questions, lifelong student." },
      { name: "Maya Angelou", note: "Matriarch-teacher whose writing is itself a transmission." },
      { name: "Mister Rogers", note: "A gentle national mentor; transmission by repeated ritual." },
    ],
  },

  herald: {
    cultural: [
      { name: "Hagrid ('Yer a wizard, Harry')", medium: "Literature", note: "Arrives with the letter; the call delivered on the doorstep." },
      { name: "R2-D2 (Leia's message)", medium: "Film", note: "Help me Obi-Wan - the herald's holographic summons." },
      { name: "The White Rabbit", medium: "Literature", note: "I'm late, I'm late - the herald who lures Alice down the hole." },
      { name: "Effie Trinket", medium: "Literature / Film", note: "The ceremonial voice that draws Katniss's name." },
    ],
    historical: [
      { name: "John the Baptist", note: "Prepared the way; the prototype herald of the Western tradition." },
      { name: "Greta Thunberg", note: "Carried the summons from the warming planet to the chambers of power." },
      { name: "Rachel Carson", note: "Silent Spring as herald - announced the call to ecological awakening." },
    ],
  },

  "threshold-guardian": {
    cultural: [
      { name: "The Black Knight (Monty Python)", medium: "Film", note: "The comic guardian - tests resolve by refusing passage." },
      { name: "The Sphinx", medium: "Myth", note: "Riddle as gate; you pass by proving you have ears." },
      { name: "Cerberus", medium: "Myth", note: "Three heads at the door of the dead; not malice, custody." },
      { name: "The Keymaster", medium: "Film", note: "Tests whether the hero is ready for what is beyond the door." },
    ],
    historical: [
      { name: "Temple gatekeepers (broadly)", note: "Every initiation tradition posts figures whose job is to refuse the uncommitted." },
      { name: "Scholarship committees", note: "Modern threshold guardians - the gate that tests the resolve of the applicant." },
      { name: "Bouncer at the door", note: "Everyday form of the archetype - resolve tested at the club entrance." },
    ],
  },

  shapeshifter: {
    cultural: [
      { name: "Mystique (X-Men)", medium: "Film / Comics", note: "Allegiance legible on no face; ally, adversary, unclear by design." },
      { name: "Catwoman", medium: "Film / Comics", note: "The classic shapeshifter opposite Batman - enemy, lover, both." },
      { name: "Gollum", medium: "Literature / Film", note: "Sméagol and Gollum - two faces at the edge of every moment." },
      { name: "Edmund Pevensie (early Narnia)", medium: "Literature", note: "Brother, then betrayer, then redeemed - the shifting ally." },
    ],
    historical: [
      { name: "Mata Hari", note: "Dancer, courtesan, spy - the shapeshifter's legend." },
      { name: "Kim Philby", note: "Friend and betrayer simultaneously; the whole life a doubled face." },
      { name: "Aaron Burr", note: "Ally and adversary of Hamilton in overlapping measure." },
    ],
  },

  shadow: {
    cultural: [
      { name: "Darth Vader", medium: "Film", note: "The shadow-father - the dark mirror Luke must both fight and redeem." },
      { name: "Voldemort", medium: "Literature", note: "Harry's inverse twin; what the hero refuses to become." },
      { name: "Thanos", medium: "Film", note: "The ideology the hero must meet at full scale." },
      { name: "Sauron", medium: "Literature / Film", note: "The disembodied, all-seeing shadow against which the hero is defined." },
    ],
    historical: [
      { name: "Adolf Hitler (for the Allied generation)", note: "The civilizational shadow - the figure every hero was measured against." },
      { name: "Osama bin Laden (post-9/11)", note: "A generation's external shadow - the villain that organized the long campaign." },
      { name: "King George III (for the American revolutionaries)", note: "The tyrant that gave the revolution its silhouette." },
    ],
  },

  trickster: {
    cultural: [
      { name: "Loki", medium: "Myth / Film", note: "The original trickster - disrupts the gods' assembly and transforms the story." },
      { name: "Bugs Bunny", medium: "Animation", note: "The American trickster, re-framing every plot through wit." },
      { name: "Hermes", medium: "Myth", note: "Messenger and thief; cheerful disruption of the serious order." },
      { name: "Puck", medium: "Literature", note: "Shakespeare's sprite - What fools these mortals be." },
    ],
    historical: [
      { name: "Benjamin Franklin", note: "Diplomat by cunning - talked the French into financing a revolution." },
      { name: "Jon Stewart", note: "Comedy as truth-telling; the trickster as public conscience." },
      { name: "Muhammad Ali", note: "Boasts and rope-a-dopes; wit as a dimension of combat." },
    ],
  },

  ally: {
    cultural: [
      { name: "Samwise Gamgee", medium: "Literature / Film", note: "The salt-of-the-earth companion whose loyalty carries the quest." },
      { name: "Ron Weasley", medium: "Literature", note: "The mate - present through every year, quiet under the star." },
      { name: "Chewbacca", medium: "Film", note: "Loyalty across species; the wordless ally who never wavers." },
      { name: "Dr. Watson", medium: "Literature", note: "The steady hand to the genius; the ally is the narrator." },
    ],
    historical: [
      { name: "Ralph Abernathy to Martin Luther King Jr.", note: "The loyal second whose presence made the first possible." },
      { name: "Eleanor Roosevelt to Franklin", note: "Partner-ally whose work became a half of the presidency." },
      { name: "Robert Kennedy to John Kennedy", note: "Brother-ally - consigliere, conscience, and campaign." },
    ],
  },
};

export function getHerosJourneyExemplars(slug: string): ExemplarSet | undefined {
  return HEROSJOURNEY_EXEMPLARS[slug];
}
