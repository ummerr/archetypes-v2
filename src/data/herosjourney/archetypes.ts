import { HeroJourneyArchetype } from "@/types/herosjourney";

export const hero: HeroJourneyArchetype = {
  slug: "hero",
  name: "The Hero",
  role: "hero",
  motto:
    "I must forge my own path, confront the darkness, and sacrifice my comfort to save the world.",
  coreFear:
    "Failure, stagnation, weakness, and being unable to protect what matters.",
  coreDesire:
    "To prove their worth through courageous action and become whole by mastering the journey.",
  coreLie:
    "I must carry the burden of the world alone — relying on others is a fatal weakness.",
  strategy:
    "Action, sacrifice, relentless forward momentum, and confronting overwhelming odds.",
  description:
    "The protagonist and surrogate of the audience's consciousness. The Hero begins in unfulfilled potential, answers the Call, and undergoes a profound psychological death and rebirth in order to return carrying the power to heal their society. They are the ego separating from the collective matrix to become itself — and then returning as a gift.",
  keyCharacteristics: [
    "Courageous in the face of overwhelming odds",
    "Self-sacrificing on behalf of something larger",
    "Dynamic and active, not acted upon",
    "Resilient through failure and wounding",
    "Flawed but striving",
    "Guided by an internal moral compass",
  ],
  gift: "The capacity for growth, sacrifice, and inspiring transformation in others.",
  trap: "Arrogance, hubris, martyrdom, and the illusion of solitary independence.",
  symbol: "⚔",
  accentColor: "#C6392E",
  shadowPole: "The Anti-Hero · the Narcissist · the Martyr",
  primaryStages: [1, 5, 8, 11, 12],
  crossSystem: {
    kwml: "Warrior (transitioning from Boy Hero to mature Warrior)",
    pearsonMarr: "Hero / Warrior",
    enneagram: "Type 1 (Reformer) · Type 3 (Achiever)",
  },
};

export const mentor: HeroJourneyArchetype = {
  slug: "mentor",
  name: "The Mentor",
  role: "mentor",
  motto:
    "The answers you seek are already within you — but you must learn to see past the illusions of the world.",
  coreFear:
    "Ignorance, futility, and failing to pass on the legacy or protect the next bearer.",
  coreDesire:
    "To impart truth, to protect the innocent, and to ensure wisdom continues.",
  coreLie:
    "Knowledge and preparation alone can shield the hero from the pain of their destiny.",
  strategy:
    "Guidance, teaching, the bestowal of gifts, and strategic intervention at moments of doubt.",
  description:
    "A wise, experienced figure who prepares the hero with training, insight, or a talisman — and then steps aside. The Mentor is the activated 'Wise Old One,' the sign that the psyche is gathering its internal resources. Their great work is to become unnecessary.",
  keyCharacteristics: [
    "Patient and enigmatic",
    "Connected to hidden or spiritual mechanics",
    "Protective without overprotecting",
    "Bestows tools rather than carrying them",
    "Accepts obsolescence as part of the gift",
    "Speaks in paradox as often as in instruction",
  ],
  gift: "Spiritual vision, clarity, and the bestowal of the necessary boon.",
  trap: "Over-reliance by the hero, or an inability to let them face their own ordeal.",
  symbol: "🕯",
  accentColor: "#8C7BB8",
  shadowPole: "The Dark Mentor · the Manipulator · the False Prophet",
  primaryStages: [4, 8],
  crossSystem: {
    kwml: "Magician",
    pearsonMarr: "Sage / Magician",
    enneagram: "Type 5 (Investigator) · Type 1 (Reformer)",
  },
};

export const herald: HeroJourneyArchetype = {
  slug: "herald",
  name: "The Herald",
  role: "herald",
  motto:
    "The time for resting in the shadows is over. Your true destiny waits beyond the horizon.",
  coreFear: "Stagnation, irrelevance, and the decay of a world left unchanged.",
  coreDesire:
    "To initiate change, to awaken the dormant, and to set fate in motion.",
  coreLie: "The disruption I bring is purely objective and carries no cost.",
  strategy:
    "Announce, disrupt, deliver urgent messages, and present unavoidable ultimatums.",
  description:
    "The catalyst who shatters the Ordinary World. The Herald may be a person, an event, an artifact, or an internal realization — whatever carries the Call to Adventure. Their function is to make staying impossible, whether or not going will be safe.",
  keyCharacteristics: [
    "Urgent and commanding",
    "Immune to the hero's excuses",
    "Objective and impersonal",
    "Energetically disruptive",
    "Often a stranger or unexpected arrival",
    "Carries news the ego did not ask for",
  ],
  gift: "Motivation, awakening, and the ignition of destiny.",
  trap: "Inducing panic, recklessness, or paralysis through the sheer violence of the Call.",
  symbol: "✦",
  accentColor: "#E8B041",
  shadowPole: "The False Messenger · the Panicker",
  primaryStages: [2],
  crossSystem: {
    kwml: "The Precocious Child (as catalyst)",
    pearsonMarr: "Seeker / Explorer",
    enneagram: "Type 7 (Enthusiast) · Type 8 (Challenger)",
  },
};

export const thresholdGuardian: HeroJourneyArchetype = {
  slug: "threshold-guardian",
  name: "The Threshold Guardian",
  role: "threshold-guardian",
  motto:
    "You shall not pass this boundary until you have proven your strength, your wit, and your worth.",
  coreFear:
    "Unworthiness crossing into the sacred, and chaos spilling into ordered realms.",
  coreDesire:
    "To protect the boundaries of the special world and weed out the uncommitted.",
  coreLie:
    "Only the brutal deserve passage; empathy and compromise are disqualifying flaws.",
  strategy: "Test, block, interrogate, and present puzzles or force.",
  description:
    "The structural gatekeeper standing between the hero and the special world. Not necessarily a villain — often a neutral force whose job is to confirm the hero's readiness. A Threshold Guardian who is properly met can become a loyal ally on the far side.",
  keyCharacteristics: [
    "Immovable and rule-bound",
    "Intimidating without being evil",
    "Fiercely protective of their domain",
    "Neutral — hostile or helpful by response",
    "Tests resolve more than strength",
    "Can be befriended, bypassed, or transformed",
  ],
  gift: "Builds the hero's resilience; bypassed, becomes a powerful ally.",
  trap: "Triggering paralysis, cowardice, or a turn back to the ordinary world.",
  symbol: "⛨",
  accentColor: "#7A6E5F",
  shadowPole: "The Oppressor · the Bureaucrat",
  primaryStages: [5, 7, 11],
  crossSystem: {
    kwml: "Warrior (in defensive posture)",
    pearsonMarr: "Ruler / Realist",
    enneagram: "Type 6 (Loyalist) · Type 1 (Reformer)",
  },
};

export const shapeshifter: HeroJourneyArchetype = {
  slug: "shapeshifter",
  name: "The Shapeshifter",
  role: "shapeshifter",
  motto: "Nothing in this world is exactly as it seems — including my heart.",
  coreFear:
    "Confinement, categorization, being pinned to a single identity or allegiance.",
  coreDesire:
    "To experience every facet of reality and survive through supreme adaptability.",
  coreLie: "Commitment is a form of death; I must keep changing to stay alive.",
  strategy:
    "Adapt, seduce, misdirect, and keep the hero perpetually off balance.",
  description:
    "The most ambiguous mask. The Shapeshifter's loyalties, motives, and even form shift — introducing doubt, suspense, and romantic tension. Psychologically they are the Anima or Animus: the repressed contrasexual energy the hero must integrate on the way to wholeness.",
  keyCharacteristics: [
    "Fluid and alluring",
    "Emotionally volatile",
    "Ambiguous loyalty",
    "Charismatic and persuasive",
    "Offers the shock of alternative perspective",
    "Dissolves the hero's rigid paradigms",
  ],
  gift: "Flexibility, alternative perspectives, and the breaking of fixed paradigms.",
  trap: "Betrayal, deception, and the hero losing their grounding.",
  symbol: "☾",
  accentColor: "#5E8AA3",
  shadowPole: "The Betrayer · the Femme Fatale · the Two-Faced Liar",
  primaryStages: [6, 10],
  crossSystem: {
    kwml: "Lover",
    pearsonMarr: "Lover / Magician",
    enneagram: "Type 4 (Individualist) · Type 9 (Peacemaker)",
  },
};

export const shadow: HeroJourneyArchetype = {
  slug: "shadow",
  name: "The Shadow",
  role: "shadow",
  motto:
    "I am the truth you refuse to face. I am the power you were too weak to wield.",
  coreFear:
    "Annihilation, powerlessness, vulnerability, being subject to another's will.",
  coreDesire:
    "Absolute control, vengeance, and the destruction of the opposing moral order.",
  coreLie:
    "Empathy is a fatal weakness; only domination secures anything worth having.",
  strategy:
    "Dominate, destroy, exploit the hero's flaws, and accumulate absolute power.",
  description:
    "The primary antagonist — and the dark mirror of the hero. The Shadow holds everything the hero has repressed, including enormous unutilized power. To defeat it is not enough; the hero must, at some cost, reclaim what it guarded. The best Shadows are tragic: a reflection of what the hero could become.",
  keyCharacteristics: [
    "Ruthless and uncompromising",
    "Deeply wounded, often in ways that mirror the hero",
    "Intelligent and strategically patient",
    "Embodies the hero's repressed possibilities",
    "Projects its own flaws outward",
    "Immense, unused creative power",
  ],
  gift: "Forces self-awareness; precipitates the hero's integration of disowned power.",
  trap: "Total moral corruption, pathological projection, and ego annihilation.",
  symbol: "◉",
  accentColor: "#2E2E2E",
  shadowPole: "Absolute Evil · the Psychopath (unredeemable inversion)",
  primaryStages: [8, 11],
  crossSystem: {
    kwml: "Tyrant (Shadow King) · Sadist (Shadow Warrior)",
    pearsonMarr: "Destroyer / Outlaw",
    enneagram: "Type 8 (Challenger) · disintegrated Type 3",
  },
};

export const trickster: HeroJourneyArchetype = {
  slug: "trickster",
  name: "The Trickster",
  role: "trickster",
  motto:
    "Why so serious? The rules you worship are made of glass, and I love the sound of breaking.",
  coreFear:
    "Rigidity, boredom, predictability, and being trapped in a humorless system.",
  coreDesire:
    "To expose hidden truth through chaos and enjoy the absurdity of existence.",
  coreLie:
    "Nothing truly matters, so nothing I do can carry real consequence.",
  strategy:
    "Subvert, ridicule, break the fourth wall, and turn enemies' logic against them.",
  description:
    "The chaotic truth-teller. The Trickster punctures inflation, keeps the psyche nimble, and prevents the narrative from collapsing under its own weight. As an ego-regulating mechanism, they ensure no mask — not even the hero's — gets worshipped for too long.",
  keyCharacteristics: [
    "Irreverent and observant",
    "Chaotic but rarely cruel",
    "Witty and linguistically agile",
    "Unpredictable by design",
    "Exposes hypocrisy",
    "Finds alternative solutions to impossible problems",
  ],
  gift: "Humor, adaptability, the destruction of pretense.",
  trap: "Cynicism, nihilism, refusing to act when the moment demands seriousness.",
  symbol: "◈",
  accentColor: "#D97C3C",
  shadowPole: "The Malicious Saboteur · the Agent of Chaos",
  primaryStages: [6, 10],
  crossSystem: {
    kwml: "Magician (chaotic, boundary-dissolving aspect)",
    pearsonMarr: "Jester / Fool",
    enneagram: "Type 7 (Enthusiast)",
  },
};

export const ally: HeroJourneyArchetype = {
  slug: "ally",
  name: "The Ally",
  role: "ally",
  motto: "You do not have to carry this alone. My strength is yours.",
  coreFear:
    "Isolation, abandonment, and failing those they have sworn to protect.",
  coreDesire:
    "To belong to a cause larger than themselves and prove unwavering loyalty.",
  coreLie:
    "My life matters only if I am subservient to the hero's quest.",
  strategy:
    "Serve, specialize, ground, and amplify the hero's strengths through teamwork.",
  description:
    "The steadfast companion. Allies humanize the hero, provide exposition, and carry skills the hero lacks. Psychologically they represent the psyche's drive toward cooperative wholeness — the parts of the self that have agreed to work together.",
  keyCharacteristics: [
    "Loyal and dependable",
    "Specialized in a particular skill",
    "Deeply empathetic",
    "Grounds the hero emotionally",
    "Self-sacrificing without being servile",
    "A witness who also acts",
  ],
  gift: "Companionship, loyalty, and the amplification of the hero's gifts.",
  trap: "Enabling flaws through blind loyalty, or accepting being treated as disposable.",
  symbol: "⚭",
  accentColor: "#5E8F6B",
  shadowPole: "The Parasite · the Codependent · the Traitor",
  primaryStages: [6, 7, 8],
  crossSystem: {
    kwml: "Warrior (loyal soldier) · Lover (deep companion)",
    pearsonMarr: "Caregiver / Regular Guy",
    enneagram: "Type 2 (Helper) · Type 6 (Loyalist)",
  },
};

export const ALL_HEROSJOURNEY: HeroJourneyArchetype[] = [
  hero,
  mentor,
  herald,
  thresholdGuardian,
  shapeshifter,
  shadow,
  trickster,
  ally,
];

export function getHeroJourneyBySlug(
  slug: string
): HeroJourneyArchetype | undefined {
  return ALL_HEROSJOURNEY.find((a) => a.slug === slug);
}

export function getArchetypesByStage(stage: number): HeroJourneyArchetype[] {
  return ALL_HEROSJOURNEY.filter((a) => a.primaryStages.includes(stage));
}
