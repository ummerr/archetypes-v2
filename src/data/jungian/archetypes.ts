import { JungianArchetype, JungianClusterGroup } from "@/types/jungian";

export const JUNGIAN_COLORS = {
  ego: "#7AA6C2",
  soul: "#B97A9E",
  self: "#9B7FB8",
  accent: "#6B4E8C",
} as const;

export const JUNGIAN_CLUSTERS: JungianClusterGroup[] = [
  {
    id: "ego",
    label: "Ego",
    tagline: "Establishing basic security",
    description:
      "The Ego types ground the psyche: safety, belonging, proving worth, caring for others. They are the first archetypal stages to emerge and the foundation for everything after.",
    color: JUNGIAN_COLORS.ego,
  },
  {
    id: "soul",
    label: "Soul",
    tagline: "The internal quest for identity",
    description:
      "The Soul types are activated in the call to individuation — freedom, rebellion, intimacy, and creation. They drive the hero's descent and return.",
    color: JUNGIAN_COLORS.soul,
  },
  {
    id: "self",
    label: "Self",
    tagline: "Integration, wisdom, and order",
    description:
      "The Self types express wholeness. Having journeyed, they bring play, truth, transformation, and structure back to the world.",
    color: JUNGIAN_COLORS.self,
  },
];

// ─── EGO CLUSTER ──────────────────────────────────────────────

export const innocent: JungianArchetype = {
  slug: "innocent",
  name: "The Innocent",
  cluster: "ego",
  motto: "Free to be you and me.",
  coreDesire: "To get to paradise.",
  greatestFear: "Being punished for doing something wrong.",
  strategy: "Do things right.",
  description:
    "The Innocent seeks purity, goodness, and simple happiness. Faith is their native air. They believe in a world that can be safe, kind, and whole — and they work, often unconsciously, to stay inside that vision.",
  keyCharacteristics: [
    "Optimism and faith in a benevolent world",
    "Purity of intent and simplicity of desire",
    "Trust in authority and moral order",
    "Nostalgia for childhood, nature, and home",
    "Seeks belonging through goodness",
  ],
  gift: "Faith, optimism, and the capacity to renew hope in others.",
  trap: "Naivety — denying shadow truths and refusing to grow up.",
  accentColor: "#E8D7A0",
  symbol: "☀",
};

export const everyman: JungianArchetype = {
  slug: "everyman",
  name: "The Everyman",
  cluster: "ego",
  motto: "All people are created equal.",
  coreDesire: "Connection with others; belonging.",
  greatestFear: "Being left out, or standing out.",
  strategy: "Develop ordinary virtues; blend in; be real.",
  description:
    "Also called the Orphan or Regular One. The Everyman values being one of the crowd. They offer honest presence, reliability, and the dignity of unpretentious common sense.",
  keyCharacteristics: [
    "Down-to-earth realism and humility",
    "Empathy born of shared experience",
    "Loyalty to community and friends",
    "Resistance to elitism and pretense",
    "Solidarity with the ordinary",
  ],
  gift: "Grounded presence and the ability to make anyone feel at home.",
  trap: "Losing self to the group; cynicism; victimhood.",
  accentColor: "#C9B68F",
  symbol: "◉",
};

export const hero: JungianArchetype = {
  slug: "hero",
  name: "The Hero",
  cluster: "ego",
  motto: "Where there's a will, there's a way.",
  coreDesire: "Prove worth through courageous action.",
  greatestFear: "Weakness, vulnerability, being a coward.",
  strategy: "Become strong and competent; master the challenge.",
  description:
    "The Hero rises to meet the monster. They train, they fight, they prevail — transforming fear into mastery. Their energy lifts others, but their shadow demands an enemy to define themselves against.",
  keyCharacteristics: [
    "Courage and resolve in the face of difficulty",
    "Discipline, training, and mastery",
    "Willingness to sacrifice for the cause",
    "Competitive drive and ambition",
    "Inspires others through example",
  ],
  gift: "Competence, courage, and disciplined will.",
  trap: "Arrogance; seeing every situation as a battle; hubris.",
  accentColor: "#C24747",
  symbol: "⚔",
};

export const caregiver: JungianArchetype = {
  slug: "caregiver",
  name: "The Caregiver",
  cluster: "ego",
  motto: "Love your neighbor as yourself.",
  coreDesire: "To help and protect others.",
  greatestFear: "Selfishness, ingratitude, causing harm.",
  strategy: "Do things for others; nurture; give generously.",
  description:
    "The Caregiver tends to what cannot tend itself. Compassion is their orientation and generosity their language. They stabilize families, teams, and communities — often invisibly.",
  keyCharacteristics: [
    "Empathy and attuned nurturing",
    "Generosity without expectation",
    "Attentiveness to need in others",
    "Patience and steadiness under strain",
    "Protective instinct",
  ],
  gift: "Compassion, presence, and the capacity to hold others safely.",
  trap: "Martyrdom; using care to control; self-neglect and resentment.",
  accentColor: "#E8A7B3",
  symbol: "❦",
};

// ─── SOUL CLUSTER ─────────────────────────────────────────────

export const explorer: JungianArchetype = {
  slug: "explorer",
  name: "The Explorer",
  cluster: "soul",
  motto: "Don't fence me in.",
  coreDesire: "Freedom to find out who you are by exploring the world.",
  greatestFear: "Conformity; entrapment; inner emptiness.",
  strategy: "Journey, seek, and escape boredom.",
  description:
    "The Explorer lives for the horizon. Authenticity matters more than comfort. They refuse the cages others accept, risking loneliness to find what's real.",
  keyCharacteristics: [
    "Autonomy and self-direction",
    "Curiosity and appetite for new experience",
    "Restlessness and discomfort with convention",
    "Capacity to tolerate ambiguity",
    "Quiet individualism",
  ],
  gift: "Authenticity, courage to walk alone, and genuine self-knowledge.",
  trap: "Chronic dissatisfaction; rootlessness; avoiding commitment.",
  accentColor: "#8B7355",
  symbol: "⇢",
};

export const rebel: JungianArchetype = {
  slug: "rebel",
  name: "The Rebel",
  cluster: "soul",
  motto: "Rules are made to be broken.",
  coreDesire: "Revolution; to overturn what doesn't work.",
  greatestFear: "Powerlessness; being ineffectual.",
  strategy: "Disrupt, destroy, or shock.",
  description:
    "Also the Outlaw or Revolutionary. The Rebel refuses inherited forms. They burn down what's rotten to make room for what could be — sometimes liberators, sometimes destroyers.",
  keyCharacteristics: [
    "Disdain for hypocrisy and empty authority",
    "Willingness to break from the group",
    "Radical honesty; provocation",
    "Appetite for risk and edge",
    "Loyalty to underlying values over forms",
  ],
  gift: "Outrageous honesty; catalytic disruption; liberation.",
  trap: "Destruction for its own sake; nihilism; crime.",
  accentColor: "#2E2E2E",
  symbol: "✕",
};

export const lover: JungianArchetype = {
  slug: "lover",
  name: "The Lover",
  cluster: "soul",
  motto: "You're the only one.",
  coreDesire: "Intimacy and experience.",
  greatestFear: "Being alone, unloved, unwanted.",
  strategy: "Become ever more attractive, emotionally and physically.",
  description:
    "The Lover is drawn to beauty, passion, and deep connection. They want to be with — to merge, to adore, to be adored. They bring warmth and devotion, and risk losing themselves in the beloved.",
  keyCharacteristics: [
    "Aesthetic sensitivity and sensuality",
    "Capacity for deep intimacy",
    "Devotion and emotional presence",
    "Passion for beauty in all forms",
    "Desire to commit and be committed to",
  ],
  gift: "Passion, devotion, and the capacity to love wholeheartedly.",
  trap: "Loss of identity in the other; jealousy; people-pleasing.",
  accentColor: "#A63D5C",
  symbol: "♥",
};

export const creator: JungianArchetype = {
  slug: "creator",
  name: "The Creator",
  cluster: "soul",
  motto: "If you can imagine it, it can be done.",
  coreDesire: "Create something of enduring value.",
  greatestFear: "Mediocrity; unrealized vision.",
  strategy: "Develop artistic control and skill; make the vision real.",
  description:
    "The Creator sees what is not yet. They bring form to formless possibility — through art, writing, product, code, or institution. Imagination is their compulsion and their burden.",
  keyCharacteristics: [
    "Vivid imagination and aesthetic vision",
    "Drive to manifest ideas materially",
    "Comfort with solitary deep work",
    "Pursuit of originality and craft",
    "Perfectionism",
  ],
  gift: "Vision, originality, and the capacity to bring the new into being.",
  trap: "Perfectionism; never finishing; precious isolation.",
  accentColor: "#5A3D7A",
  symbol: "✦",
};

// ─── SELF CLUSTER ─────────────────────────────────────────────

export const jester: JungianArchetype = {
  slug: "jester",
  name: "The Jester",
  cluster: "self",
  motto: "You only live once.",
  coreDesire: "To live in the moment with full enjoyment.",
  greatestFear: "Being bored; being boring.",
  strategy: "Play, make jokes, find the absurd.",
  description:
    "The Jester refuses heaviness. Through play and wit they puncture pretension, reveal absurdity, and keep the psyche light enough to move. Beneath humor is real wisdom about impermanence.",
  keyCharacteristics: [
    "Playfulness and spontaneity",
    "Wit and irreverence",
    "Capacity to see the absurd",
    "Comfort with impermanence",
    "Social ease",
  ],
  gift: "Joy, perspective, and relief from tyranny of the serious.",
  trap: "Avoidance; frivolity; inability to take anything seriously.",
  accentColor: "#E8B041",
  symbol: "◆",
};

export const sage: JungianArchetype = {
  slug: "sage",
  name: "The Sage",
  cluster: "self",
  motto: "The truth will set you free.",
  coreDesire: "Find the truth.",
  greatestFear: "Being duped, misled, or ignorant.",
  strategy: "Seek information, analyze, reflect, understand.",
  description:
    "The Sage trusts knowledge. They study, analyze, and share what they've learned — teachers, researchers, advisors, philosophers. Their clarity comes from the discipline of honest inquiry.",
  keyCharacteristics: [
    "Discernment and critical thinking",
    "Patience in the pursuit of understanding",
    "Appetite for data and careful reasoning",
    "Detachment from bias",
    "Willingness to say 'I don't know'",
  ],
  gift: "Wisdom, discernment, and clarity.",
  trap: "Analysis paralysis; intellectual arrogance; detachment from life.",
  accentColor: "#5A7A8B",
  symbol: "☉",
};

export const magician: JungianArchetype = {
  slug: "magician",
  name: "The Magician",
  cluster: "self",
  motto: "I make things happen.",
  coreDesire: "Understand the fundamental laws of how things work.",
  greatestFear: "Unintended negative consequences.",
  strategy: "Develop vision and live it; transform reality.",
  description:
    "The Magician turns insight into transformation. They see the hidden levers of systems — psychological, technological, spiritual — and use them to change the visible world. Vision, practice, and humility.",
  keyCharacteristics: [
    "Systems thinking; seeing underlying patterns",
    "Capacity to convert insight into action",
    "Healing and transformative presence",
    "Charisma rooted in clarity",
    "Respect for unseen forces",
  ],
  gift: "Transformative vision and the power to change reality.",
  trap: "Manipulation; playing god; ignoring consequences.",
  accentColor: "#6B4E8C",
  symbol: "✧",
};

export const ruler: JungianArchetype = {
  slug: "ruler",
  name: "The Ruler",
  cluster: "self",
  motto: "Power is not everything, it's the only thing.",
  coreDesire: "Control; create a prosperous, successful community.",
  greatestFear: "Chaos; being overthrown.",
  strategy: "Exercise power; take responsibility; lead.",
  description:
    "The Ruler takes responsibility for the whole. They hold the structure, set standards, and serve order — at their best, a steward whose authority protects the commons; at worst, a tyrant.",
  keyCharacteristics: [
    "Natural authority and command",
    "Long-term, systemic thinking",
    "Willingness to hold responsibility",
    "Standards and high expectations",
    "Stewardship of shared resources",
  ],
  gift: "Order, sovereignty, and competent stewardship.",
  trap: "Authoritarianism; rigidity; loss of connection with the governed.",
  accentColor: "#2A4E7A",
  symbol: "♛",
};

// ─── COLLECTIONS ──────────────────────────────────────────────

export const ALL_JUNGIAN: JungianArchetype[] = [
  innocent,
  everyman,
  hero,
  caregiver,
  explorer,
  rebel,
  lover,
  creator,
  jester,
  sage,
  magician,
  ruler,
];

export function getJungianBySlug(slug: string): JungianArchetype | undefined {
  return ALL_JUNGIAN.find((a) => a.slug === slug);
}

export function getJungianByCluster(cluster: JungianArchetype["cluster"]): JungianArchetype[] {
  return ALL_JUNGIAN.filter((a) => a.cluster === cluster);
}
