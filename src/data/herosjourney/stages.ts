import { JourneyActGroup, JourneyStage } from "@/types/herosjourney";

export const HEROSJOURNEY_COLORS = {
  departure: "#E8A94A",
  initiation: "#4A3D7A",
  return: "#C6A355",
  accent: "#B85C38",
} as const;

export const JOURNEY_ACTS: JourneyActGroup[] = [
  {
    id: "departure",
    label: "Departure",
    tagline: "Separation from the known",
    description:
      "The hero is called out of homeostasis. The conscious ego meets its first disruption, resists, gathers wisdom, and crosses the threshold into the unknown.",
    color: HEROSJOURNEY_COLORS.departure,
  },
  {
    id: "initiation",
    label: "Initiation",
    tagline: "Descent into the unknown",
    description:
      "In the special world, the hero is tested, approaches the inmost cave, faces the Ordeal - a symbolic death and rebirth - and seizes the reward.",
    color: HEROSJOURNEY_COLORS.initiation,
  },
  {
    id: "return",
    label: "Return",
    tagline: "Integration and mastery",
    description:
      "The hero crosses back carrying the elixir. A final resurrection tests whether the lesson has been integrated. The gift is brought home.",
    color: HEROSJOURNEY_COLORS.return,
  },
];

// 12 stages arranged around a circle. Clock position in degrees, 0° = 12 o'clock,
// increasing clockwise. Stage 1 starts at the apex, the Ordeal (stage 8) lands
// near 6 o'clock (the nadir).
export const JOURNEY_STAGES: JourneyStage[] = [
  {
    number: 1,
    name: "Ordinary World",
    act: "departure",
    clockPosition: 0,
    shortDescription: "The hero at rest in the familiar.",
    psychologicalMilestone:
      "The unindividuated ego in homeostasis - comfortable, yet shadowed by a gnawing incompleteness.",
  },
  {
    number: 2,
    name: "Call to Adventure",
    act: "departure",
    clockPosition: 30,
    shortDescription: "A disruption breaks the spell of the known.",
    psychologicalMilestone:
      "The unconscious signals its demand for integration. A crisis, message, or stirring makes staying impossible.",
  },
  {
    number: 3,
    name: "Refusal of the Call",
    act: "departure",
    clockPosition: 60,
    shortDescription: "The ego recoils from change.",
    psychologicalMilestone:
      "Defense mechanisms rise. Growth requires sacrificing the known self, and the psyche hesitates at the cost.",
  },
  {
    number: 4,
    name: "Meeting the Mentor",
    act: "departure",
    clockPosition: 90,
    shortDescription: "Wisdom arrives as guide or gift.",
    psychologicalMilestone:
      "The 'Wise Old One' emerges - inner or outer - bringing tools, courage, or the spark that lets the hero proceed.",
  },
  {
    number: 5,
    name: "Crossing the Threshold",
    act: "departure",
    clockPosition: 120,
    shortDescription: "The point of no return.",
    psychologicalMilestone:
      "The ego steps out of the ordinary world. Light yields to shadow; fertile chaos replaces safe order.",
  },
  {
    number: 6,
    name: "Tests, Allies, Enemies",
    act: "initiation",
    clockPosition: 150,
    shortDescription: "The new world teaches its rules.",
    psychologicalMilestone:
      "Fragments of the psyche externalize as companions and antagonists. The ego learns the terrain of its shadow.",
  },
  {
    number: 7,
    name: "Approach to the Inmost Cave",
    act: "initiation",
    clockPosition: 175,
    shortDescription: "Gathering resolve before the abyss.",
    psychologicalMilestone:
      "Psychic energy mobilizes for the confrontation with the deepest wound or most guarded fear.",
  },
  {
    number: 8,
    name: "The Ordeal",
    act: "initiation",
    clockPosition: 200,
    shortDescription: "Death and rebirth at the nadir.",
    psychologicalMilestone:
      "The old ego dies. The hero survives a symbolic crucifixion and integrates what was once unbearable.",
  },
  {
    number: 9,
    name: "Reward - Seizing the Sword",
    act: "initiation",
    clockPosition: 230,
    shortDescription: "The boon of the descent.",
    psychologicalMilestone:
      "Hard-won clarity, power, or love is claimed. Integration crystallizes into something the hero can carry.",
  },
  {
    number: 10,
    name: "The Road Back",
    act: "return",
    clockPosition: 265,
    shortDescription: "Turning toward home, still in danger.",
    psychologicalMilestone:
      "New truths strain against old frameworks. The friction of re-entry accelerates.",
  },
  {
    number: 11,
    name: "The Resurrection",
    act: "return",
    clockPosition: 300,
    shortDescription: "The final test on the threshold.",
    psychologicalMilestone:
      "One last trial proves the transformation is real. The shadow makes a final bid to reclaim the hero.",
  },
  {
    number: 12,
    name: "Return with the Elixir",
    act: "return",
    clockPosition: 335,
    shortDescription: "The gift brought home to heal the world.",
    psychologicalMilestone:
      "The Jungian Self - light and shadow held together - is offered back to the community as medicine.",
  },
];

export function getStage(n: number): JourneyStage | undefined {
  return JOURNEY_STAGES.find((s) => s.number === n);
}
