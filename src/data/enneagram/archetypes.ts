import { EnneagramArchetype, EnneagramNumber, EnneagramTriadGroup } from "@/types/enneagram";

export const ENNEAGRAM_COLORS = {
  gut: "#C97A57",
  heart: "#C2678E",
  head: "#4A6FA5",
  accent: "#4A6FA5",
} as const;

export const ENNEAGRAM_TRIADS: EnneagramTriadGroup[] = [
  {
    id: "gut",
    label: "Gut",
    tagline: "Instinctive",
    dominantEmotion: "Anger",
    focalPoint: "Brain stem — body, instinct, presence",
    description:
      "The Gut triad processes the world through instinct and the body. Driven by anger and the need for autonomy, these types hold their ground, assert their shape, or refuse to be moved. Their gift is grounded, embodied presence.",
    color: ENNEAGRAM_COLORS.gut,
    numbers: [8, 9, 1],
  },
  {
    id: "heart",
    label: "Heart",
    tagline: "Feeling",
    dominantEmotion: "Shame",
    focalPoint: "Limbic system — identity, image, relation",
    description:
      "The Heart triad processes the world through feeling and image. Driven by shame and the need to be seen, these types tune finely to how others receive them. Their gift is emotional intelligence and relational depth.",
    color: ENNEAGRAM_COLORS.heart,
    numbers: [2, 3, 4],
  },
  {
    id: "head",
    label: "Head",
    tagline: "Thinking",
    dominantEmotion: "Fear",
    focalPoint: "Neocortex — analysis, strategy, foresight",
    description:
      "The Head triad processes the world through thought and anticipation. Driven by fear and the need for security, these types scan, plan, and model. Their gift is strategic foresight and intellectual craft.",
    color: ENNEAGRAM_COLORS.head,
    numbers: [5, 6, 7],
  },
];

// ─── TYPE 1 ──────────────────────────────────────────────
export const reformer: EnneagramArchetype = {
  slug: "reformer",
  number: 1,
  name: "The Reformer",
  triad: "gut",
  motto: "There is a right way, and I will find it.",
  coreFear: "Being corrupt, evil, or fundamentally defective.",
  coreDesire: "To have integrity, be good, to live in right relation.",
  coreLie: "I am only acceptable when I am perfect.",
  strategy: "Hold the standard. Improve what is broken. Do it properly.",
  description:
    "The Reformer carries an inner measuring line. They perceive the gap between what is and what ought to be, and feel personally responsible for closing it. Discipline is their craft; integrity is their home.",
  keyCharacteristics: [
    "Strong internal standards and conscience",
    "Discernment of right and wrong",
    "Self-discipline and industriousness",
    "Reformist drive toward justice and craft",
    "Restraint of impulse in service of values",
  ],
  gift: "Integrity, clarity of principle, and the courage to improve the world.",
  trap: "Rigidity — the inner critic turns on the self and on others; resentment builds where the standard cannot be met.",
  jungianCorrelation: "The Ruler / The Improver",
  jungianSlug: "ruler",
  integrationTo: 7,
  disintegrationTo: 4,
  thrivingNarrative:
    "In growth the Reformer loosens the fist and borrows the Enthusiast's joy. Standards remain, but play re-enters the day. They discover that goodness can be spacious — that a thing can be whole without being policed.",
  pressureNarrative:
    "Under stress the Reformer slips toward the Individualist's shadow: moody, self-critical, privately convinced they are uniquely flawed. The outer standard curdles inward into melancholy and withdrawal.",
  accentColor: "#D89560",
  symbol: "†",
  wings: [
    {
      number: 9,
      nickname: "The Idealist",
      flavor:
        "The Reformer tempered by the Peacemaker's calm. Stands for what is right from a contemplative remove — principled, detached, and more likely to correct quietly than to confront.",
    },
    {
      number: 2,
      nickname: "The Advocate",
      flavor:
        "The Reformer threaded with the Helper's relational heat. Crusades on behalf of people rather than abstract principles — warmer, more persuasive, willing to bring others along.",
    },
  ],
};

// ─── TYPE 2 ──────────────────────────────────────────────
export const helper: EnneagramArchetype = {
  slug: "helper",
  number: 2,
  name: "The Helper",
  triad: "heart",
  motto: "I am loved through what I give.",
  coreFear: "Being unwanted, unworthy of love on one's own.",
  coreDesire: "To feel loved, needed, appreciated.",
  coreLie: "I only deserve love when I am indispensable to someone.",
  strategy: "Anticipate need. Give before being asked. Make oneself essential.",
  description:
    "The Helper tunes to the emotional weather of others with extraordinary precision. They offer warmth, care, and practical presence — and in their shadow, they trade that gift for a secret claim on the other's affection.",
  keyCharacteristics: [
    "Attunement to others' feelings and needs",
    "Warmth, generosity, and hospitality",
    "Practical, embodied care",
    "Relational intuition",
    "Difficulty naming one's own needs",
  ],
  gift: "Unforced compassion and the capacity to make others feel truly received.",
  trap: "Hidden dependency — giving to secure love; pride in indispensability; resentment when care goes unreturned.",
  jungianCorrelation: "The Caregiver / The Lover",
  jungianSlug: "caregiver",
  integrationTo: 4,
  disintegrationTo: 8,
  thrivingNarrative:
    "In growth the Helper moves toward the Individualist, turning attention inward for the first time. They discover the self beneath the helper role — feelings, preferences, art — and love stops being a transaction.",
  pressureNarrative:
    "Under stress the Helper absorbs the Challenger's shadow: controlling, demanding, and overtly angry that their sacrifices are not being honored. The soft claim hardens into an ultimatum.",
  accentColor: "#E8A7B3",
  symbol: "❦",
  wings: [
    {
      number: 1,
      nickname: "The Servant",
      flavor:
        "The Helper with the Reformer's conscience. Dutiful and morally serious — gives from a sense of what is right as much as what is warm, and can tip into self-righteous martyrdom.",
    },
    {
      number: 3,
      nickname: "The Host",
      flavor:
        "The Helper with the Achiever's polish. Sociable, ambitious on behalf of loved ones, and gracious in a way that also happens to shine — care as charisma.",
    },
  ],
};

// ─── TYPE 3 ──────────────────────────────────────────────
export const achiever: EnneagramArchetype = {
  slug: "achiever",
  number: 3,
  name: "The Achiever",
  triad: "heart",
  motto: "I am what I accomplish.",
  coreFear: "Being worthless, failing to matter.",
  coreDesire: "To be valuable, admired, and successful.",
  coreLie: "My worth is what I can prove.",
  strategy: "Set the goal. Become the person who wins it. Perform the role.",
  description:
    "The Achiever reads the room and finds the winning shape. Energetic, adaptive, goal-hungry, they turn potential into outcome — and in shadow, they lose the self beneath the performance.",
  keyCharacteristics: [
    "Ambition and high output",
    "Adaptability to audience and context",
    "Practical competence",
    "Image management and polish",
    "Difficulty sitting with unproductive feelings",
  ],
  gift: "Drive, efficacy, and the inspiring power of someone who gets it done.",
  trap: "Image over substance — chasing external validation until the felt self goes missing.",
  jungianCorrelation: "The Hero / The Performer",
  jungianSlug: "hero",
  integrationTo: 6,
  disintegrationTo: 9,
  thrivingNarrative:
    "In growth the Achiever moves toward the Loyalist, trading the solo performance for genuine team loyalty. They discover commitment, collaboration, and the satisfaction of building something for more than the mirror.",
  pressureNarrative:
    "Under stress the Achiever goes Peacemaker-shadow: disengages, numbs out, and can't locate the drive that used to be reliable. Ambition flattens into avoidance.",
  accentColor: "#E8B041",
  symbol: "✦",
  wings: [
    {
      number: 2,
      nickname: "The Charmer",
      flavor:
        "The Achiever warmed by the Helper. Relational and charismatic — wins rooms through personal connection rather than credential, and measures success in how fully they are loved.",
    },
    {
      number: 4,
      nickname: "The Professional",
      flavor:
        "The Achiever deepened by the Individualist. Self-contained, craft-focused, drawn to excellence more than applause — wants the work itself to carry the proof.",
    },
  ],
};

// ─── TYPE 4 ──────────────────────────────────────────────
export const individualist: EnneagramArchetype = {
  slug: "individualist",
  number: 4,
  name: "The Individualist",
  triad: "heart",
  motto: "I am uniquely myself, and uniquely missing.",
  coreFear: "Being insignificant or having no identity of one's own.",
  coreDesire: "To be authentic, distinct, and fully seen.",
  coreLie: "Something essential is missing in me that everyone else has.",
  strategy: "Intensify feeling. Cultivate difference. Curate an aesthetic self.",
  description:
    "The Individualist lives with a keen sense of longing — for beauty, meaning, and an unnamed something just out of reach. Their art is to transmute that ache into form: music, writing, presence, mood.",
  keyCharacteristics: [
    "Emotional depth and sensitivity",
    "Aesthetic intelligence",
    "Capacity to dwell with grief and beauty",
    "Resistance to the ordinary",
    "Tendency to identify with missing",
  ],
  gift: "Creative depth and permission for others to feel what they feel.",
  trap: "Melancholy as identity — envy of those who seem whole; reluctance to act until the feeling is exactly right.",
  jungianCorrelation: "The Creator / The Romantic",
  jungianSlug: "creator",
  integrationTo: 1,
  disintegrationTo: 2,
  thrivingNarrative:
    "In growth the Individualist moves toward the Reformer, channeling feeling into disciplined work. The artist becomes grounded; longing becomes craft; the self is no longer proved by suffering.",
  pressureNarrative:
    "Under stress the Individualist absorbs the Helper's shadow: clingy, over-giving, and covertly demanding that someone else resolve the ache. Intimacy curdles into pursuit.",
  accentColor: "#A06BBD",
  symbol: "☾",
  wings: [
    {
      number: 3,
      nickname: "The Aristocrat",
      flavor:
        "The Individualist with the Achiever's pull toward form. Outwardly composed, stylish, socially fluent — turns inner intensity into presentation and prizes being seen as exquisite.",
    },
    {
      number: 5,
      nickname: "The Bohemian",
      flavor:
        "The Individualist with the Investigator's reserve. More withdrawn, more cerebral — content to live inside the mood of a thing rather than perform it, and more at home on the margin.",
    },
  ],
};

// ─── TYPE 5 ──────────────────────────────────────────────
export const investigator: EnneagramArchetype = {
  slug: "investigator",
  number: 5,
  name: "The Investigator",
  triad: "head",
  motto: "I will understand it before I engage it.",
  coreFear: "Being helpless, depleted, or overwhelmed by demand.",
  coreDesire: "To be capable, competent, and self-sufficient.",
  coreLie: "The world will take more than I have — I must ration myself.",
  strategy: "Withdraw to observe. Master a domain. Keep reserves untouched.",
  description:
    "The Investigator retreats into the mind as into a private library. They conserve energy, build knowledge in depth, and engage the world on their own terms — offering rare clarity when they choose to emerge.",
  keyCharacteristics: [
    "Sharp analytical intelligence",
    "Capacity for sustained deep work",
    "Respect for privacy and autonomy",
    "Economical use of energy",
    "Discomfort with emotional demand",
  ],
  gift: "Depth of understanding and the calm of someone who has actually thought it through.",
  trap: "Detachment — knowing about life instead of living it; hoarding capacity that never gets spent.",
  jungianCorrelation: "The Sage / The Observer",
  jungianSlug: "sage",
  integrationTo: 8,
  disintegrationTo: 7,
  thrivingNarrative:
    "In growth the Investigator moves toward the Challenger, stepping out of the library and into the body. Knowledge becomes action; reserves are finally spent on something that matters.",
  pressureNarrative:
    "Under stress the Investigator slips toward the Enthusiast's shadow: scattered, hyperactive, chasing stimulation to escape a mind that suddenly feels airless.",
  accentColor: "#6A8FB5",
  symbol: "◎",
  wings: [
    {
      number: 4,
      nickname: "The Iconoclast",
      flavor:
        "The Investigator inflected by the Individualist. Imaginative and original — more willing to work in art, philosophy, and strange terrain than pure system, and more openly idiosyncratic.",
    },
    {
      number: 6,
      nickname: "The Problem Solver",
      flavor:
        "The Investigator crossed with the Loyalist. Practical, technical, drawn to problems with real-world consequences and allies to build with — engineering rather than pure theory.",
    },
  ],
};

// ─── TYPE 6 ──────────────────────────────────────────────
export const loyalist: EnneagramArchetype = {
  slug: "loyalist",
  number: 6,
  name: "The Loyalist",
  triad: "head",
  motto: "Prepare for the worst. Stay with the people who stayed.",
  coreFear: "Being without support, without guidance, without a trusted ground.",
  coreDesire: "To have security, belonging, and reliable allies.",
  coreLie: "I cannot trust my own authority — I must find it outside.",
  strategy: "Scan for threat. Test for loyalty. Double-check, then act.",
  description:
    "The Loyalist is the community's best early-warning system. Vigilant, committed, and deeply relational, they hold the group together with a mixture of doubt and devotion that is uniquely their own.",
  keyCharacteristics: [
    "Vigilance and troubleshooting instinct",
    "Deep loyalty to people and causes",
    "Willingness to ask the hard questions",
    "Courage paired with doubt",
    "Ambivalence toward authority",
  ],
  gift: "Trustworthiness and the courage to act in the presence of fear.",
  trap: "Anxiety loops — testing loyalty until it breaks; projecting threat onto allies; paralysis in the face of one's own authority.",
  jungianCorrelation: "The Caregiver / The Guardian",
  jungianSlug: "everyman",
  integrationTo: 9,
  disintegrationTo: 3,
  thrivingNarrative:
    "In growth the Loyalist moves toward the Peacemaker. The vigilance softens; trust becomes possible without endless testing; they find their own ground and lead from it.",
  pressureNarrative:
    "Under stress the Loyalist absorbs the Achiever's shadow: competitive, image-driven, posturing for a security that is really just approval in disguise.",
  accentColor: "#8B9A7F",
  symbol: "⛨",
  wings: [
    {
      number: 5,
      nickname: "The Defender",
      flavor:
        "The Loyalist steadied by the Investigator. Quieter, more analytic — guards the group with preparation, data, and contingency plans rather than charm or persuasion.",
    },
    {
      number: 7,
      nickname: "The Buddy",
      flavor:
        "The Loyalist lightened by the Enthusiast. Sociable and funny — binds people together with warmth and comic relief, and finds courage more easily in good company.",
    },
  ],
};

// ─── TYPE 7 ──────────────────────────────────────────────
export const enthusiast: EnneagramArchetype = {
  slug: "enthusiast",
  number: 7,
  name: "The Enthusiast",
  triad: "head",
  motto: "There is always more — and I will not be trapped.",
  coreFear: "Being deprived, trapped in pain or limitation.",
  coreDesire: "To be happy, satisfied, free, and fully alive.",
  coreLie: "If I keep moving, pain cannot catch me.",
  strategy: "Reframe. Plan the next adventure. Keep all options open.",
  description:
    "The Enthusiast is the mind in full flight — generative, optimistic, hungry for experience. They bring lightness and possibility wherever they go, and in shadow, they substitute stimulation for depth.",
  keyCharacteristics: [
    "Optimism and reframing ability",
    "Quickness, wit, and associative thinking",
    "Appetite for novelty and experience",
    "Generativity — always another idea",
    "Aversion to sustained discomfort",
  ],
  gift: "Joy, vision, and the genuine freedom of someone who has not forgotten how to play.",
  trap: "Avoidance disguised as adventure — never sitting with the painful thing; scattering energy across a dozen openings.",
  jungianCorrelation: "The Explorer / The Jester",
  jungianSlug: "explorer",
  integrationTo: 5,
  disintegrationTo: 1,
  thrivingNarrative:
    "In growth the Enthusiast moves toward the Investigator. Curiosity narrows into real depth; they stay with the single thing long enough to know it; play becomes practice.",
  pressureNarrative:
    "Under stress the Enthusiast slips toward the Reformer's shadow: suddenly critical, judgmental, and angry at a world that has failed to deliver the promised lightness.",
  accentColor: "#F0C14B",
  symbol: "✺",
  wings: [
    {
      number: 6,
      nickname: "The Entertainer",
      flavor:
        "The Enthusiast with the Loyalist's sociability. Playful and responsible to the group — keeps the party going for everyone and stays tethered to the people who showed up.",
    },
    {
      number: 8,
      nickname: "The Realist",
      flavor:
        "The Enthusiast sharpened by the Challenger. Harder-edged and ambitious — turns appetite for experience into appetite for power, and is quicker to push past obstacles.",
    },
  ],
};

// ─── TYPE 8 ──────────────────────────────────────────────
export const challenger: EnneagramArchetype = {
  slug: "challenger",
  number: 8,
  name: "The Challenger",
  triad: "gut",
  motto: "I will not be controlled. I will protect what is mine.",
  coreFear: "Being harmed, betrayed, or controlled by another.",
  coreDesire: "To be strong, autonomous, and in command of one's fate.",
  coreLie: "Softness is the thing that gets you killed.",
  strategy: "Take the space. Confront directly. Shield the vulnerable inside.",
  description:
    "The Challenger is raw force put to purpose. They push against what is weak or false, protect the ones inside their circle, and refuse the small shapes the world tries to fold them into.",
  keyCharacteristics: [
    "Physical and emotional directness",
    "Leadership under pressure",
    "Loyalty to those they claim",
    "Appetite for intensity",
    "Discomfort with personal vulnerability",
  ],
  gift: "Courage, vitality, and the power to stand up for the ones who cannot stand up for themselves.",
  trap: "Overpowering — mistaking domination for protection; armoring against the very softness that makes love possible.",
  jungianCorrelation: "The Rebel / The Protector",
  jungianSlug: "rebel",
  integrationTo: 2,
  disintegrationTo: 5,
  thrivingNarrative:
    "In growth the Challenger moves toward the Helper. The armor comes down in chosen company; strength is revealed as a form of love; the inner child is finally allowed to be cared for.",
  pressureNarrative:
    "Under stress the Challenger withdraws into the Investigator's shadow: secretive, isolated, hoarding information and plotting in private rather than moving in the open.",
  accentColor: "#B04848",
  symbol: "⚔",
  wings: [
    {
      number: 7,
      nickname: "The Maverick",
      flavor:
        "The Challenger with the Enthusiast's spark. Bold, extroverted, entrepreneurial — force in motion, more playful and more visible, builds empires as an extended adventure.",
    },
    {
      number: 9,
      nickname: "The Bear",
      flavor:
        "The Challenger grounded by the Peacemaker. Quieter and more implacable — a deliberate strength that moves only when it has to, and is harder to provoke but heavier when roused.",
    },
  ],
};

// ─── TYPE 9 ──────────────────────────────────────────────
export const peacemaker: EnneagramArchetype = {
  slug: "peacemaker",
  number: 9,
  name: "The Peacemaker",
  triad: "gut",
  motto: "If I stay still enough, nothing will break.",
  coreFear: "Loss, separation, conflict — being fragmented from self and others.",
  coreDesire: "Inner and outer peace; undisturbed union.",
  coreLie: "My presence is less important than my keeping the peace.",
  strategy: "Merge. Accommodate. Go along. Quietly disappear.",
  description:
    "The Peacemaker holds the invisible weave. They see every side, absorb the tension others can't hold, and make a stable background for everyone around them — often at the cost of their own edges.",
  keyCharacteristics: [
    "Steadiness and receptive presence",
    "Natural mediator; sees multiple perspectives",
    "Acceptance of what is",
    "Quiet agency that resists being hurried",
    "Difficulty locating personal preference",
  ],
  gift: "Groundedness, equanimity, and the ability to hold a room without needing to dominate it.",
  trap: "Self-forgetting — going numb to one's own desires; passive stubbornness; absence dressed up as peace.",
  jungianCorrelation: "The Everyman / The Mediator",
  jungianSlug: "everyman",
  integrationTo: 3,
  disintegrationTo: 6,
  thrivingNarrative:
    "In growth the Peacemaker moves toward the Achiever. They choose, act, and take up space; the quiet agent becomes a visible one; peace becomes active rather than purchased by absence.",
  pressureNarrative:
    "Under stress the Peacemaker slips toward the Loyalist's shadow: anxious, self-doubting, stuck in worst-case loops, suddenly unable to find the calm that used to be native ground.",
  accentColor: "#7FA68A",
  symbol: "☯",
  wings: [
    {
      number: 8,
      nickname: "The Referee",
      flavor:
        "The Peacemaker stiffened by the Challenger. More assertive and physically present — mediates with authority, holds the line when needed, and is harder to steamroll.",
    },
    {
      number: 1,
      nickname: "The Dreamer",
      flavor:
        "The Peacemaker refined by the Reformer. Idealistic and gently principled — serves a vision of how things ought to be, and turns quiet presence into moral imagination.",
    },
  ],
};

// ─── COLLECTIONS ──────────────────────────────────────────────

export const ALL_ENNEAGRAM: EnneagramArchetype[] = [
  reformer,
  helper,
  achiever,
  individualist,
  investigator,
  loyalist,
  enthusiast,
  challenger,
  peacemaker,
];

export function getEnneagramBySlug(slug: string): EnneagramArchetype | undefined {
  return ALL_ENNEAGRAM.find((a) => a.slug === slug);
}

export function getEnneagramByNumber(n: EnneagramNumber): EnneagramArchetype | undefined {
  return ALL_ENNEAGRAM.find((a) => a.number === n);
}

export function getEnneagramByTriad(triad: EnneagramArchetype["triad"]): EnneagramArchetype[] {
  const order = ENNEAGRAM_TRIADS.find((t) => t.id === triad)?.numbers ?? [];
  return order
    .map((n) => getEnneagramByNumber(n))
    .filter((a): a is EnneagramArchetype => !!a);
}
