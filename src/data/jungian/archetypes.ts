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
      "The Soul types are activated in the call to individuation - freedom, rebellion, intimacy, and creation. They drive the hero's descent and return.",
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
  stageOrder: 1,
  opposite: "everyman",
  motto: "Free to be you and me.",
  coreDesire: "To get to paradise.",
  greatestFear: "Being punished for doing something wrong.",
  strategy: "Do things right.",
  description:
    "The Innocent seeks purity, goodness, and simple happiness. Faith is their native air. They believe in a world that can be safe, kind, and whole - and they work, often unconsciously, to stay inside that vision.",
  keyCharacteristics: [
    "Optimism and faith in a benevolent world",
    "Purity of intent and simplicity of desire",
    "Trust in authority and moral order",
    "Nostalgia for childhood, nature, and home",
    "Seeks belonging through goodness",
  ],
  gift: "Faith, optimism, and the capacity to renew hope in others.",
  trap: "Naivety - denying shadow truths and refusing to grow up.",
  accentColor: "#E8D7A0",
  symbol: "☀",
  shadow: {
    name: "The Pollyanna",
    description:
      "The Innocent's shadow denies what is. It keeps the smile intact by looking past suffering, complexity, and responsibility - mistaking avoidance for peace.",
    signs: [
      "Refuses to acknowledge obvious problems or abuse",
      "Becomes dependent on others to handle hard truths",
      "Moralizes instead of engaging",
      "Crumbles under its first real disillusionment",
    ],
    integration:
      "Let paradise be lost. Trust survives contact with shadow - faith that hasn't met pain is only innocence.",
  },
  levels: {
    shadow: "Denial. The world is simple because I refuse to see its complexity.",
    call: "A first betrayal, a first loss - the moment the protected garden fails.",
    expression:
      "A faith that has been through the fire. Open-eyed trust, chosen on purpose.",
  },
  awakening: {
    circumstances: [
      "Early childhood, when faith in caretakers is forming",
      "After a season of cynicism, when hope becomes a deliberate choice",
      "Spiritual conversion or reconciliation",
      "Becoming a parent or caretaker of the young",
    ],
    ageOrStage: "Early life and late-life recovery of wonder.",
  },
};

export const everyman: JungianArchetype = {
  slug: "everyman",
  name: "The Everyman",
  cluster: "ego",
  stageOrder: 2,
  opposite: "innocent",
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
  shadow: {
    name: "The Victim",
    description:
      "The Everyman's shadow is learned helplessness dressed as humility. It weaponizes ordinariness into complaint and converts solidarity into collective resentment.",
    signs: [
      "Persistent complaint without action",
      "Suspicion of anyone who rises above the group",
      "Blames circumstances for every outcome",
      "Uses modesty to avoid responsibility",
    ],
    integration:
      "Own your ordinary strength. Belonging is built by people who show up, not by people who wait to be rescued.",
  },
  levels: {
    shadow: "Victimhood. The world happens to me; I have no real agency.",
    call: "A loss of the comfortable place - exile, layoff, family rupture - that forces self-reliance.",
    expression:
      "The steady citizen. Grounded, honest, at home anywhere because they are at home with themselves.",
  },
  awakening: {
    circumstances: [
      "Disillusionment that ends the Innocent phase",
      "Joining or leaving a close-knit community",
      "Hard times that reveal who shows up",
      "Service work or organizing",
    ],
    ageOrStage: "Adolescence and whenever life strips away naive privilege.",
  },
};

export const hero: JungianArchetype = {
  slug: "hero",
  name: "The Hero",
  cluster: "ego",
  stageOrder: 3,
  opposite: "caregiver",
  motto: "Where there's a will, there's a way.",
  coreDesire: "Prove worth through courageous action.",
  greatestFear: "Weakness, vulnerability, being a coward.",
  strategy: "Become strong and competent; master the challenge.",
  description:
    "The Hero rises to meet the monster. They train, they fight, they prevail - transforming fear into mastery. Their energy lifts others, but their shadow demands an enemy to define themselves against.",
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
  shadow: {
    name: "The Ruthless Competitor",
    description:
      "The Hero's shadow needs an enemy. It converts relationships into contests, conflates dominance with virtue, and loses the person inside the victory.",
    signs: [
      "Sees every interaction as win or lose",
      "Contempt for the soft, the slow, the struggling",
      "Cannot rest without a next mountain",
      "Uses strength to silence rather than protect",
    ],
    integration:
      "Turn the weapon around. The hardest enemy is the one inside; real courage knows when not to fight.",
  },
  levels: {
    shadow: "The bully. Strength performed at others' expense; fear of my own softness.",
    call: "A threat that demands action - to family, to community, to self-respect - that cannot be met from the bleachers.",
    expression:
      "The disciplined protector. Strength in service of something larger, with the wisdom to sheathe the blade.",
  },
  awakening: {
    circumstances: [
      "First real challenge that requires preparation",
      "Being called to protect someone or something",
      "Military, athletic, or entrepreneurial contexts",
      "A defeat that demands rebuilding from the ground up",
    ],
    ageOrStage: "Late adolescence and early adulthood; re-awakens in crisis.",
  },
};

export const caregiver: JungianArchetype = {
  slug: "caregiver",
  name: "The Caregiver",
  cluster: "ego",
  stageOrder: 4,
  opposite: "hero",
  motto: "Love your neighbor as yourself.",
  coreDesire: "To help and protect others.",
  greatestFear: "Selfishness, ingratitude, causing harm.",
  strategy: "Do things for others; nurture; give generously.",
  description:
    "The Caregiver tends to what cannot tend itself. Compassion is their orientation and generosity their language. They stabilize families, teams, and communities - often invisibly.",
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
  shadow: {
    name: "The Martyr",
    description:
      "The Caregiver's shadow gives to be owed. It tracks debts, withholds joy, and uses self-sacrifice as a lever of control - then collapses into resentment when the ledger is ignored.",
    signs: [
      "Sacrifice performed publicly, reward expected privately",
      "Keeps others dependent by refusing to teach independence",
      "Chronic exhaustion worn as moral credential",
      "Resentment framed as disappointment",
    ],
    integration:
      "Give from fullness, not depletion. Receive before you give; care for yourself without apology.",
  },
  levels: {
    shadow: "Smothering. Care that cannot let others fail, fall, or leave.",
    call: "Someone fragile who depends on you - child, parent, patient, team.",
    expression:
      "The compassionate steward. Generous, boundaried, able to love and let go in the same breath.",
  },
  awakening: {
    circumstances: [
      "Becoming a parent, nurse, teacher, or first-responder",
      "A loved one's illness or decline",
      "Crisis in a community that needs holding",
      "Recovery from a season of purely self-focused pursuit",
    ],
    ageOrStage: "Parenthood, midlife, and whenever one is trusted with the vulnerable.",
  },
};

// ─── SOUL CLUSTER ─────────────────────────────────────────────

export const explorer: JungianArchetype = {
  slug: "explorer",
  name: "The Explorer",
  cluster: "soul",
  stageOrder: 1,
  opposite: "lover",
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
  shadow: {
    name: "The Perpetual Wanderer",
    description:
      "The Explorer's shadow mistakes motion for growth. Every door it opens it must walk out of. Intimacy becomes a cage; commitment becomes death.",
    signs: [
      "Leaves the moment things get real",
      "Collects experiences and avoids depth",
      "Contempt for people who stay",
      "Loneliness reframed as independence",
    ],
    integration:
      "Stay. The longest journey runs through the same room for a decade - depth is the territory you never visit.",
  },
  levels: {
    shadow: "Restlessness. Leaving is the only self I trust.",
    call: "A life that has become a cage - a job, a town, a self-concept that no longer fits.",
    expression:
      "The committed pilgrim. Free because they chose their path, not because they kept running.",
  },
  awakening: {
    circumstances: [
      "Adolescent individuation - the first 'I am not you'",
      "Quitting the expected path",
      "Travel, wilderness, solitude",
      "Realizing an inherited life is not yours",
    ],
    ageOrStage: "Late teens and early twenties; re-awakens at midlife.",
  },
};

export const rebel: JungianArchetype = {
  slug: "rebel",
  name: "The Rebel",
  cluster: "soul",
  stageOrder: 2,
  opposite: "creator",
  motto: "Rules are made to be broken.",
  coreDesire: "Revolution; to overturn what doesn't work.",
  greatestFear: "Powerlessness; being ineffectual.",
  strategy: "Disrupt, destroy, or shock.",
  description:
    "Also the Outlaw or Revolutionary. The Rebel refuses inherited forms. They burn down what's rotten to make room for what could be - sometimes liberators, sometimes destroyers.",
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
  shadow: {
    name: "The Destroyer",
    description:
      "The Rebel's shadow burns everything, including what it claimed to love. It confuses destruction with meaning and mistakes adolescent fury for moral clarity.",
    signs: [
      "Opposes anything, regardless of merit",
      "Loyalty only to opposition, never to building",
      "Cruelty dressed as honesty",
      "Leaves ruins and calls them revolution",
    ],
    integration:
      "Know what you are burning for. Destruction is only sacred in service of what you love - not what you hate.",
  },
  levels: {
    shadow: "Nihilism. Nothing matters; only the breaking matters.",
    call: "A system, institution, or self-concept that has become corrupt or hollow and must be unmade.",
    expression:
      "The liberator. Disruption in service of life, with the discipline to rebuild what is torn down.",
  },
  awakening: {
    circumstances: [
      "Witnessing injustice or institutional rot",
      "A belief system collapsing under its own hypocrisy",
      "Adolescence - the first refusal of inherited rules",
      "Midlife reckoning with a false self",
    ],
    ageOrStage: "Adolescence and whenever a structure outlives its truth.",
  },
};

export const lover: JungianArchetype = {
  slug: "lover",
  name: "The Lover",
  cluster: "soul",
  stageOrder: 3,
  opposite: "explorer",
  motto: "You're the only one.",
  coreDesire: "Intimacy and experience.",
  greatestFear: "Being alone, unloved, unwanted.",
  strategy: "Become ever more attractive, emotionally and physically.",
  description:
    "The Lover is drawn to beauty, passion, and deep connection. They want to be with - to merge, to adore, to be adored. They bring warmth and devotion, and risk losing themselves in the beloved.",
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
  shadow: {
    name: "The Addict",
    description:
      "The Lover's shadow needs the other to exist. It fuses, consumes, and panics at the first sign of separateness - converting passion into compulsion and devotion into possession.",
    signs: [
      "Cannot tolerate the beloved's autonomy",
      "Jealousy disguised as intensity",
      "Reshapes self to be what the other wants",
      "Swings between idealization and collapse",
    ],
    integration:
      "Love the other as other. Devotion without self-loss; intimacy that leaves both people more, not less.",
  },
  levels: {
    shadow: "Fusion. I disappear into you, and then resent you for it.",
    call: "A beloved - person, art, cause, place - that pulls you past the safe edges of self.",
    expression:
      "The devoted partner. Passionate, present, whole enough to love without dissolving.",
  },
  awakening: {
    circumstances: [
      "First deep romantic love",
      "Falling for a practice, art, or place",
      "Parenthood's erotic-spiritual dimension",
      "Being truly seen after a long absence of self",
    ],
    ageOrStage: "Late adolescence through midlife; any season of deep attachment.",
  },
};

export const creator: JungianArchetype = {
  slug: "creator",
  name: "The Creator",
  cluster: "soul",
  stageOrder: 4,
  opposite: "rebel",
  motto: "If you can imagine it, it can be done.",
  coreDesire: "Create something of enduring value.",
  greatestFear: "Mediocrity; unrealized vision.",
  strategy: "Develop artistic control and skill; make the vision real.",
  description:
    "The Creator sees what is not yet. They bring form to formless possibility - through art, writing, product, code, or institution. Imagination is their compulsion and their burden.",
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
  shadow: {
    name: "The Tortured Artist",
    description:
      "The Creator's shadow hoards the vision. It treats the work as too sacred to finish, too special to share, and uses suffering as proof of depth.",
    signs: [
      "Starts everything; finishes nothing",
      "Contempt for anyone less exacting",
      "Romanticizes blockage and misery",
      "Withholds the work to protect the self",
    ],
    integration:
      "Ship. Making is a practice, not a purity; the real work lives on the other side of completion.",
  },
  levels: {
    shadow: "Perfectionism. The vision is sacred because it is never tested against reality.",
    call: "A vision that won't leave you alone - an image, a refrain, a structure that insists on being made.",
    expression:
      "The making artist. Practiced, generative, able to finish and begin again.",
  },
  awakening: {
    circumstances: [
      "A strong aesthetic or intellectual obsession",
      "Discovering a craft that rewires the day",
      "A mentor who demands you finish",
      "A deadline that forces shipping",
    ],
    ageOrStage: "Any season of devoted making.",
  },
};

// ─── SELF CLUSTER ─────────────────────────────────────────────

export const jester: JungianArchetype = {
  slug: "jester",
  name: "The Jester",
  cluster: "self",
  stageOrder: 1,
  opposite: "sage",
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
  shadow: {
    name: "The Evader",
    description:
      "The Jester's shadow uses humor to stay unreachable. It laughs off grief, punctures intimacy, and treats every serious moment as a threat to be defused.",
    signs: [
      "Cannot sit with discomfort or sorrow",
      "Deflects every difficult conversation with a joke",
      "Cruelty dressed as irony",
      "Exhausting to anyone seeking depth",
    ],
    integration:
      "Let the joke land where it hurts. Real humor is not a shield; it touches pain and transforms it.",
  },
  levels: {
    shadow: "Frivolity. Nothing is allowed to matter for long.",
    call: "A season so heavy that levity becomes a survival practice.",
    expression:
      "The holy fool. Playful in the presence of the serious; lightness that carries truth.",
  },
  awakening: {
    circumstances: [
      "Burnout from chronic over-seriousness",
      "Grief, illness, or loss that demands levity",
      "Creative work in comedy, performance, or play",
      "Aging - the freedom of not caring what others think",
    ],
    ageOrStage: "Childhood and late life; whenever the game needs lightening.",
  },
};

export const sage: JungianArchetype = {
  slug: "sage",
  name: "The Sage",
  cluster: "self",
  stageOrder: 2,
  opposite: "jester",
  motto: "The truth will set you free.",
  coreDesire: "Find the truth.",
  greatestFear: "Being duped, misled, or ignorant.",
  strategy: "Seek information, analyze, reflect, understand.",
  description:
    "The Sage trusts knowledge. They study, analyze, and share what they've learned - teachers, researchers, advisors, philosophers. Their clarity comes from the discipline of honest inquiry.",
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
  shadow: {
    name: "The Dogmatist",
    description:
      "The Sage's shadow ossifies. It trades the search for truth for the defense of its current position, using knowledge as armor against surprise.",
    signs: [
      "Unwilling to update in the face of new evidence",
      "Condescension toward the less-informed",
      "Learning as collection, not as change",
      "Retreats into the tower when tested by life",
    ],
    integration:
      "Stay a student. The sage who stops learning has become an idol of a former sage.",
  },
  levels: {
    shadow: "Detachment. Knowing about life as a substitute for living it.",
    call: "A confusion or question that demands patient, honest inquiry.",
    expression:
      "The lifelong student. Clear, humble, holding knowledge loosely enough to revise it.",
  },
  awakening: {
    circumstances: [
      "An obsession with a domain that demands depth",
      "Being fooled badly enough to require discernment",
      "A teacher or text that rewires one's thinking",
      "The midlife call to understand one's own life",
    ],
    ageOrStage: "Any season of disciplined learning; ripens in later life.",
  },
};

export const magician: JungianArchetype = {
  slug: "magician",
  name: "The Magician",
  cluster: "self",
  stageOrder: 3,
  opposite: "ruler",
  motto: "I make things happen.",
  coreDesire: "Understand the fundamental laws of how things work.",
  greatestFear: "Unintended negative consequences.",
  strategy: "Develop vision and live it; transform reality.",
  description:
    "The Magician turns insight into transformation. They see the hidden levers of systems - psychological, technological, spiritual - and use them to change the visible world. Vision, practice, and humility.",
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
  shadow: {
    name: "The Manipulator",
    description:
      "The Magician's shadow uses its sight to pull strings. It bypasses consent, treats others as systems to be optimized, and mistakes effect for ethics.",
    signs: [
      "Moves others without telling them why",
      "Confuses persuasion with honesty",
      "Collects knowledge as leverage",
      "Denies responsibility for the wakes it leaves",
    ],
    integration:
      "Serve what you can see. Sight without ethics is sorcery; real magic is transformation others consent to.",
  },
  levels: {
    shadow: "Manipulation. Power without service; sight without consent.",
    call: "A system or person in need of transformation that ordinary means cannot reach.",
    expression:
      "The healer, the catalyst. Insight in service of what wants to live.",
  },
  awakening: {
    circumstances: [
      "Deep practice in therapy, medicine, engineering, design, or spiritual work",
      "A breakthrough that reveals the hidden structure of a problem",
      "Becoming a mentor to someone in transformation",
      "Midlife - when depth becomes more interesting than breadth",
    ],
    ageOrStage: "Mature adulthood; the second half of life.",
  },
};

export const ruler: JungianArchetype = {
  slug: "ruler",
  name: "The Ruler",
  cluster: "self",
  stageOrder: 4,
  opposite: "magician",
  motto: "Power is not everything, it's the only thing.",
  coreDesire: "Control; create a prosperous, successful community.",
  greatestFear: "Chaos; being overthrown.",
  strategy: "Exercise power; take responsibility; lead.",
  description:
    "The Ruler takes responsibility for the whole. They hold the structure, set standards, and serve order - at their best, a steward whose authority protects the commons; at worst, a tyrant.",
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
  shadow: {
    name: "The Tyrant",
    description:
      "The Ruler's shadow confuses the throne with the self. It clings to power, punishes dissent, and sacrifices the commons to preserve its own grip.",
    signs: [
      "Paranoia about rivals and successors",
      "Punishes the messenger for bad news",
      "Rigid enforcement where discernment is needed",
      "The realm declines while the ruler's comfort grows",
    ],
    integration:
      "Serve the realm, not the crown. A sovereign who cannot step down is not a ruler - only a prisoner in a tower.",
  },
  levels: {
    shadow: "Tyranny. The throne defends itself against the people it was built to serve.",
    call: "Responsibility for something that cannot be delegated - a family, a company, a community.",
    expression:
      "The steward-king. Authority in service, standards held in love, successors raised on purpose.",
  },
  awakening: {
    circumstances: [
      "Taking on executive, parental, or civic responsibility",
      "A mentor or elder stepping down and handing on the realm",
      "The failure of existing authority that requires someone to step in",
      "Midlife - when legacy becomes the real question",
    ],
    ageOrStage: "Mature adulthood; the Self-cluster's late expression.",
  },
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
