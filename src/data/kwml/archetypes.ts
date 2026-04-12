import { Archetype, ArchetypeFamilyGroup } from "@/types/archetype";

export const COLORS = {
  king: "#C6A355",
  warrior: "#A3333D",
  magician: "#2D6A4F",
  lover: "#C97B84",
  bg: "#0A0A08",
  surface: "#141412",
  surfaceLight: "#1E1E1A",
  text: "#E8E4DC",
  muted: "#8A8780",
  gold: "#C6A355",
} as const;

// ─── MAN PSYCHOLOGY ───────────────────────────────────────────

export const king: Archetype = {
  slug: "the-king",
  name: "The King",
  family: "king",
  maturity: "man",
  accentColor: COLORS.king,
  description:
    "The central organizing principle of the mature masculine psyche. The King is the energy of just and creative ordering. He sits at the Center, bringing order and harmony to the inner and outer kingdoms. He channels divine blessings, ensures the prosperity and fertility of his realm, and maintains vitality through his centeredness and connection to the natural order.",
  keyCharacteristics: [
    "Deep inner knowingness and calm authority",
    "Creates internal consistency and integrity",
    "Rewards and encourages creativity in self and others",
    "Speaks with inner authority that others naturally respect",
    "Genuinely cares for others' welfare and development",
    "Mediates vitality, life-force, and joy",
    "Integrates the other three archetypes",
  ],
  fullness: {
    title: "The King in His Fullness",
    description:
      "Just and creative ordering; blessing others and mediating vitality. When a man accesses the King, anxiety drops, he feels centered and calm, speaks with genuine inner authority, and authentically cares for others.",
  },
  activeShadow: {
    name: "The Tyrant",
    description:
      "Identifies with the King energy and fails to realize he is not it. A fragile, insecure ruler threatened by new life, beauty, and vitality in others.",
    traits: [
      "Controls through rage and exploitation",
      "Narcissistic domination",
      "Hates, fears, and envies new life in others",
      "Kills joy through verbal assault or willful neglect",
      "Develops godly pretensions to mask vulnerability",
      "Fears criticism intensely",
    ],
  },
  passiveShadow: {
    name: "The Weakling",
    description:
      "Lacks inner peace, centeredness, and calm. Anxious, fearful, insecure, and prone to paranoia.",
    traits: [
      "Suspects disloyalty everywhere",
      "Projects King energy onto external persons",
      "Represses grandiosity until it erupts into hostility",
      "Oscillates into Tyranny when fear overwhelms",
      "Cannot hold center under pressure",
      "Dependent personality patterns",
    ],
  },
  evolutionFrom: "the-divine-child",
  accessMarkers: [
    "Anxiety drops",
    "Feels centered and calm",
    "Speaks with genuine inner authority",
    "Authentically cares for others",
  ],
};

export const warrior: Archetype = {
  slug: "the-warrior",
  name: "The Warrior",
  family: "warrior",
  maturity: "man",
  accentColor: COLORS.warrior,
  description:
    "The energy of aggressive but purposeful action. The Warrior is the powerhouse of the mature masculine, driven by transpersonal commitment rather than personal comfort. He is fiercely loyal to a code of honor and to causes bigger than himself. A master tactician who destroys only what is harmful.",
  keyCharacteristics: [
    "Practices mindfulness and constant alertness",
    "Realistic assessment of own capacities and limitations",
    "Controls mind and attitudes first; body follows",
    "Demonstrates courage, self-discipline, and willingness to endure",
    "Knows what he wants and how to get it",
    "Takes the offensive stance toward problems",
    "Loyal to causes bigger than himself",
  ],
  fullness: {
    title: "The Warrior in His Fullness",
    description:
      "Disciplined, purposeful action in service of something greater. The Warrior lives with death-awareness, treating each act as potentially his last. He moves with clarity, strategy, and discernment.",
  },
  activeShadow: {
    name: "The Sadist",
    description:
      "Cruelty emerges from the Warrior's natural capacity for detachment. An emotionally volatile demon of cruelty.",
    traits: [
      "Hates weakness and vulnerability in others",
      "Projects his own hidden Masochism outward",
      "Takes pleasure in tormenting the vulnerable",
      "Preys through ritual humiliation",
      "Stems from unresolved adolescent insecurity",
      "Emotionally volatile and cruel",
    ],
  },
  passiveShadow: {
    name: "The Masochist",
    description:
      "A cowardly, powerless pushover who accepts abuse. Projects Warrior energy onto others, experiencing himself as impotent.",
    traits: [
      "Unable to defend psychologically",
      "Allows manipulation by stronger personalities",
      "Compulsive workaholism driven by deep anxiety",
      "Takes excessive abuse before exploding",
      "Eventually erupts into sadistic outburst",
      "Experiences self as powerless",
    ],
  },
  evolutionFrom: "the-hero",
  accessMarkers: [
    "Energetic and decisive",
    "Courageous and enduring",
    "Loyal to the greater good",
    "Clear-minded under pressure",
  ],
};

export const magician: Archetype = {
  slug: "the-magician",
  name: "The Magician",
  family: "magician",
  maturity: "man",
  accentColor: COLORS.magician,
  description:
    "The energy of initiation and transformation. The Magician is the sage and knower of secrets who navigates inner worlds and understands the dynamics of outer energy. He is the master of technology, mathematics, mysticism, and logic. He governs the observing ego — the part of the psyche that watches life rather than living it.",
  keyCharacteristics: [
    "Highly knowledgeable with capacity for deep, reflective thinking",
    "Possesses a powerful B.S. detector",
    "Understands the links between the seen and unseen",
    "Emotionally detached and stable",
    "Teaches self-discovery and navigation of the unconscious",
    "Insulates the ego from overwhelming archetypal power",
    "Acts as the shamanic function of the psyche",
  ],
  fullness: {
    title: "The Magician in His Fullness",
    description:
      "Insight, transformation, and initiation. The Magician sees through denial, deception, and evil masquerading as goodness. He contains and organizes emotional energies, reducing their destructive power through observation.",
  },
  activeShadow: {
    name: "The Detached Manipulator",
    description:
      "Uses specialized knowledge as a weapon. Withholds vital information and deliberately sets others up to appear inferior.",
    traits: [
      "Cynical detachment from human values",
      "Employs subliminal technologies of control",
      "Paralyzed by overthinking — thinks excessively, never acts",
      "Unwilling to share knowledge unless personally advantaged",
      "Cold, calculating, and exploitative",
      "Caught in a web of pros and cons",
    ],
  },
  passiveShadow: {
    name: 'The Denying "Innocent" One',
    description:
      "Wants Magician status and power without responsibility. Envious and hostile toward others' success and talent.",
    traits: [
      "Sabotages others' efforts from envy while feigning innocence",
      "Conducts puppet theatre behind smokescreens",
      "Lacks teaching commitment",
      "Fears exposure of own depleted energy",
      "Motivated to derail others from the shadows",
      "Projects false helplessness",
    ],
  },
  evolutionFrom: "the-precocious-child",
  accessMarkers: [
    "Observes feelings without being consumed",
    "Organizes emotional energies",
    "Sees clearly through deception",
    "Thinks reflectively and deeply",
  ],
};

export const lover: Archetype = {
  slug: "the-lover",
  name: "The Lover",
  family: "lover",
  maturity: "man",
  accentColor: COLORS.lover,
  description:
    "The energy that connects one to others and the world. The Lover provides vividness, passion, embodiment, and deep sensory-emotional connection to life. He is the musician, poet, and artist of the psyche — profoundly attuned to sensory realms and beauty, reading people intuitively and sensing emotional shifts.",
  keyCharacteristics: [
    "Enables deep sensitivity and compassion through feeling",
    "Reads people and senses hidden motives intuitively",
    "Wants to touch and be touched by everything",
    "Profoundly sensual without shame",
    "Feels interconnection of all existence",
    "Source of idealism, dreams, and ultimate purpose",
    "Keeps the other three archetypes humanized",
  ],
  fullness: {
    title: "The Lover in His Fullness",
    description:
      "Passion, connection, and aliveness. The Lover is excruciatingly sensitive to hidden dynamics and provides personal meaning through sensory engagement. He sees the world in a grain of sand.",
  },
  activeShadow: {
    name: "The Addicted Lover",
    description:
      "Lost in endless sensory gratification without self-regulation. Perpetually searching for some undefined fulfillment.",
    traits: [
      "Seeks unlimited sensuous experience",
      "Eternally restless and compulsively searching",
      "Never finds rest; shackled to desire",
      "Fragmented within; victim of illusory wholeness",
      "Possessed by the unconscious",
      "Insatiable hunger for vague fulfillment",
    ],
  },
  passiveShadow: {
    name: "The Impotent Lover",
    description:
      "Life feels sterile, flat, and listless. Chronically depressed and dissociated from self and others.",
    traits: [
      "Perpetually bored with monotone affect",
      "Sexually inactive and withdrawn",
      "Cut off from self and others",
      "Lacks all enthusiasm and vividness",
      "Chronically depressed",
      "May flee toward addiction when pressured",
    ],
  },
  evolutionFrom: "the-oedipal-child",
  accessMarkers: [
    "Connected and alive",
    "Enthusiastic and compassionate",
    "Empathic and energized",
    "Deeply related to others",
  ],
};

// ─── BOY PSYCHOLOGY ───────────────────────────────────────────

export const divineChild: Archetype = {
  slug: "the-divine-child",
  name: "The Divine Child",
  family: "king",
  maturity: "boy",
  accentColor: COLORS.king,
  description:
    "The first and most primal boyhood archetype. Represents miraculous new life, creative emergence, wonder, and wholeness. The Divine Child is the source of boyish enthusiasm for life — producing feelings of well-being, peace, joy, and a zest for adventure. Paradoxically, he is both extremely helpless and extremely powerful.",
  keyCharacteristics: [
    "Source of wonder, vitality, and new beginnings",
    "Fuels creativity and spurs adventure",
    "Inspires awe and hope in others",
    "Signals new phases of development",
    "Keeps us from feeling washed up or bored",
    "Both helpless and commanding",
  ],
  fullness: {
    title: "The Divine Child in His Fullness",
    description:
      "When properly nurtured, the Divine Child keeps life fresh and full of possibility. In the adult, a healthy connection means remaining young at heart — life still feels full of wonder, even with age.",
  },
  activeShadow: {
    name: "The High Chair Tyrant",
    description:
      "Pathological narcissism and grandiose entitlement. Demands attention without reciprocating value and believes the universe exists to serve him.",
    traits: [
      "Throws tantrums when expectations are not met",
      "Sulks when denied, avoids responsibility",
      "Resists all criticism",
      "Arrogant and irresponsible",
      "Enslaves others to meet impossible demands",
      "Lashes out destructively when ideals fail",
    ],
  },
  passiveShadow: {
    name: "The Weakling Prince",
    description:
      "Lacks personality, passion, enthusiasm, and initiative. Manipulates through helplessness, whining, and victimhood.",
    traits: [
      "Requires constant coddling and rescue",
      "Family revolves around his comfort",
      "Passive-aggressive behavior",
      "Listless and unmotivated",
      "Cannot advocate for own needs",
      "Dictates through weakness rather than strength",
    ],
  },
  evolutionTo: "the-king",
};

export const hero: Archetype = {
  slug: "the-hero",
  name: "The Hero",
  family: "warrior",
  maturity: "boy",
  accentColor: COLORS.warrior,
  description:
    "The most advanced form of Boy Psychology — the peak of masculine energy of the boy. The Hero emerges during adolescence, representing the drive for independence, testing one's mettle, and proving capability through confrontation and risk-taking. Critically, the Hero lacks realism about his own limitations.",
  keyCharacteristics: [
    "Mobilizes energy to break free from childhood dependence",
    "Drive for independence and proving capability",
    "Takes risks for meaningful causes",
    "Idealism used for self-serving purpose",
    "Romantic invulnerability — denial of death and limitation",
    "The launching pad for the Warrior",
  ],
  fullness: {
    title: "The Hero in His Fullness",
    description:
      "Mobilizes ego structures to break free from the Mother. Balances youthful idealism with growing awareness of limitations. His symbolic death marks the transition into Man Psychology.",
  },
  activeShadow: {
    name: "The Grandstander Bully",
    description:
      "Inflated self-importance; demands respect through intimidation and violence. Arrogant and insecure beneath false bravado.",
    traits: [
      "Rejects introspection as weakness",
      "Specializes in denial of death and limitation",
      "Brags, postures, and performs rather than acting",
      "Demands respect through intimidation",
      "Insecure beneath false bravado",
      "Inflated self-importance",
    ],
  },
  passiveShadow: {
    name: "The Coward",
    description:
      "Avoids all confrontation and risk. Conforms to others' demands out of fear and extreme reluctance toward any challenge.",
    traits: [
      "Allows emotional and intellectual bullying",
      "Internally despises himself",
      "Eventually explodes into Bully behavior",
      "Extreme reluctance toward challenge",
      "Conforms out of fear",
      "Cannot stand up for himself or others",
    ],
  },
  evolutionTo: "the-warrior",
};

export const precociousChild: Archetype = {
  slug: "the-precocious-child",
  name: "The Precocious Child",
  family: "magician",
  maturity: "boy",
  accentColor: COLORS.magician,
  description:
    "Represents curiosity, intellectual wonder, and the drive to understand how the world works and what motivates people. This archetype manifests through endless questioning, intense focus on learning, and skill development. The Precocious Child is contemplative yet social — eager to share discoveries.",
  keyCharacteristics: [
    "Maintains boyish wonder and resists cynicism",
    "Talented, reflective, and introspective",
    "Sees connections that elude others",
    "Urge to help others with knowledge",
    "Source of child prodigies and advisors",
    "Stimulates the intellect toward Magician energy",
  ],
  fullness: {
    title: "The Precocious Child in His Fullness",
    description:
      "Maintains boyish wonder while stimulating the intellect toward mature Magician energy. Lifelong learning and sharing insights as a mentor. Sees hidden connections and patterns others miss.",
  },
  activeShadow: {
    name: "The Know-It-All Trickster",
    description:
      "Driven by false sense of superiority requiring constant proof. Masters charm, deception, and manipulation to gain trust before betrayal.",
    traits: [
      "Creates illusions and hostile deprecation of others",
      "Prone to smart-assery and verbal intimidation",
      "Lacks substantive foundation for superiority claims",
      "Makes enemies through arrogance",
      "Focused on one-upping others",
      "Motivated by envy rooted in childhood emotional abuse",
    ],
  },
  passiveShadow: {
    name: "The Dummy",
    description:
      "Appears uncoordinated, naive, slow, and unresponsive. Feigns ineptitude to avoid risk, failure, and responsibility.",
    traits: [
      "Conceals actual understanding through deception",
      "Contains a hidden Know-It-All within",
      "Secret grandiosity behind apparent cluelessness",
      "Uses helplessness as a shield",
      "Calculated withdrawal from engagement",
      "Avoids all risk through feigned incompetence",
    ],
  },
  evolutionTo: "the-magician",
};

export const oedipalChild: Archetype = {
  slug: "the-oedipal-child",
  name: "The Oedipal Child",
  family: "lover",
  maturity: "boy",
  accentColor: COLORS.lover,
  description:
    "The archetype that gives a boy the desire to forge deep relationships with others and the warmth and affection to nurture those connections. The core energy is connection — a yearning for nurturing and creative forces. This energy drives spirituality, imagination, and relational bonding.",
  keyCharacteristics: [
    "Warmth, gentleness, and relational capacity",
    "Taps into emotional and spiritual depths",
    "Bonds deeply with others",
    "Healthy desire for connection and beauty",
    "Drives spirituality and imagination",
    "The warm, related, affectionate aspect of boy psychology",
  ],
  fullness: {
    title: "The Oedipal Child in His Fullness",
    description:
      "Warmth, gentleness, and relational capacity while remaining grounded. The boy who integrates this archetype taps into emotional and spiritual depths without being dominated by them.",
  },
  activeShadow: {
    name: "The Mama's Boy",
    description:
      "Fixates excessively on maternal or feminine figures rather than developing independence. Never breaks free from mother's influence.",
    traits: [
      "Prioritizes mother's wishes over personal desires",
      "Seeks the immortal Goddess in real women",
      "Never satisfied in relationships",
      "Overly tied to the archetypal Mother",
      "Womanizing as attempts to fill emotional voids",
      "Cannot develop true independence",
    ],
  },
  passiveShadow: {
    name: "The Dreamer",
    description:
      "Retreats into introspection and fantasy, avoiding human connection. Aloof instead of seeking connection with others.",
    traits: [
      "Overly spiritualized without practical skills",
      "Relates only to imagination and intangible things",
      "Pushes desire for other-worldliness to extreme",
      "Disconnected from lived experience",
      "Cuts himself off from human relationships",
      "Avoids the vulnerability of real connection",
    ],
  },
  evolutionTo: "the-lover",
};

// ─── COLLECTIONS ──────────────────────────────────────────────

export const ALL_ARCHETYPES: Archetype[] = [
  king,
  warrior,
  magician,
  lover,
  divineChild,
  hero,
  precociousChild,
  oedipalChild,
];

export const FAMILIES: ArchetypeFamilyGroup[] = [
  {
    id: "king",
    label: "King",
    man: king,
    boy: divineChild,
    color: COLORS.king,
    position: "top",
  },
  {
    id: "warrior",
    label: "Warrior",
    man: warrior,
    boy: hero,
    color: COLORS.warrior,
    position: "left",
  },
  {
    id: "magician",
    label: "Magician",
    man: magician,
    boy: precociousChild,
    color: COLORS.magician,
    position: "bottom",
  },
  {
    id: "lover",
    label: "Lover",
    man: lover,
    boy: oedipalChild,
    color: COLORS.lover,
    position: "right",
  },
];

export function getArchetypeBySlug(slug: string): Archetype | undefined {
  return ALL_ARCHETYPES.find((a) => a.slug === slug);
}

export function getFamilyByArchetype(
  archetype: Archetype
): ArchetypeFamilyGroup {
  return FAMILIES.find((f) => f.id === archetype.family)!;
}
