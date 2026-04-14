import {
  MbtiArchetype,
  MbtiCode,
  StackEntry,
  TemperamentGroup,
} from "@/types/mbti";

export const MBTI_COLORS = {
  analysts: "#6B4E8C",
  analystsDeep: "#4A2E6B",
  diplomats: "#3F7D5C",
  diplomatsDeep: "#1F5238",
  sentinels: "#4682B4",
  sentinelsDeep: "#2C5A7A",
  explorers: "#C6922C",
  explorersDeep: "#8A6418",
  accent: "#5B7A99",
} as const;

export const TEMPERAMENT_GROUPS: TemperamentGroup[] = [
  {
    id: "Analysts",
    label: "Analysts",
    letters: "NT",
    tagline: "The architects of systems",
    ethos:
      "Rational and impartial, driven by intellectual excellence and the drive to deconstruct illogical paradigms.",
    primary: MBTI_COLORS.analysts,
    secondary: MBTI_COLORS.analystsDeep,
  },
  {
    id: "Diplomats",
    label: "Diplomats",
    letters: "NF",
    tagline: "The mediators of meaning",
    ethos:
      "Empathic and idealistic, oriented toward human potential, authenticity, and the ethics of the collective.",
    primary: MBTI_COLORS.diplomats,
    secondary: MBTI_COLORS.diplomatsDeep,
  },
  {
    id: "Sentinels",
    label: "Sentinels",
    letters: "SJ",
    tagline: "The keepers of order",
    ethos:
      "Practical and dutiful, the bedrock of institutions - focused on stability, tradition, and reliable execution.",
    primary: MBTI_COLORS.sentinels,
    secondary: MBTI_COLORS.sentinelsDeep,
  },
  {
    id: "Explorers",
    label: "Explorers",
    letters: "SP",
    tagline: "The improvisers of the present",
    ethos:
      "Spontaneous and ingenious, masters of the tangible field - flexible, kinetic, and supremely tactical.",
    primary: MBTI_COLORS.explorers,
    secondary: MBTI_COLORS.explorersDeep,
  },
];

function stack(
  dom: StackEntry["code"],
  aux: StackEntry["code"],
  ter: StackEntry["code"],
  inf: StackEntry["code"]
): [StackEntry, StackEntry, StackEntry, StackEntry] {
  return [
    { position: "Dominant", role: "Hero", code: dom },
    { position: "Auxiliary", role: "Parent", code: aux },
    { position: "Tertiary", role: "Child", code: ter },
    { position: "Inferior", role: "Aspirational", code: inf },
  ];
}

export const ALL_MBTI: MbtiArchetype[] = [
  // ─── Analysts (NT) ──────────────────────────────────
  {
    slug: "intj",
    id: 0,
    code: "INTJ",
    nickname: "The Architect",
    alternateName: "Mastermind",
    temperament: "Analysts",
    dichotomies: { ei: "I", sn: "N", tf: "T", jp: "J" },
    motto: "I see the whole system before I touch a single piece.",
    tagline:
      "Strategic visionaries with a meticulous plan for every contingency.",
    description:
      "The Architect perceives inevitabilities before they arrive and organizes the external world to meet them. Singular visions are held with monastic conviction and executed with ruthless economy. The INTJ lives at the intersection of foresight and follow-through - most at home when a complex future can be compressed into a clean, unbroken line of cause and effect.",
    strengths: [
      "Long-range strategic foresight",
      "Uncompromising intellectual independence",
      "Ruthless economy of action",
      "Pattern recognition across domains",
    ],
    shadows: [
      "Contempt for those who cannot follow the vision",
      "Rigidity when the model meets messy reality",
      "Sensory and emotional self-neglect under pressure",
      "Premature certainty mistaken for insight",
    ],
    stack: stack("Ni", "Te", "Fi", "Se"),
  },
  {
    slug: "intp",
    id: 1,
    code: "INTP",
    nickname: "The Logician",
    alternateName: "Architect of Ideas",
    temperament: "Analysts",
    dichotomies: { ei: "I", sn: "N", tf: "T", jp: "P" },
    motto: "The model must be internally consistent - or it is nothing.",
    tagline:
      "Innovative conceptual inventors with an unquenchable thirst for abstract precision.",
    description:
      "The Logician builds internal frameworks so precise that any contradiction registers as an intolerable flaw. Ideas are tested in private, turned endlessly, defined and redefined until the definitions themselves hold. The INTP is curious without being credulous - driven less by conclusions than by the pleasure of watching a structure hold its own weight.",
    strengths: [
      "Surgical analytical precision",
      "Tolerance for ambiguity and open problems",
      "Original theoretical synthesis",
      "Intellectual honesty, including with the self",
    ],
    shadows: [
      "Analysis paralysis; refining the model past its usefulness",
      "Dismissiveness toward lived emotional data",
      "Withdrawal from commitments that demand closure",
      "Social cues processed too late or not at all",
    ],
    stack: stack("Ti", "Ne", "Si", "Fe"),
  },
  {
    slug: "entj",
    id: 2,
    code: "ENTJ",
    nickname: "The Commander",
    alternateName: "Fieldmarshal",
    temperament: "Analysts",
    dichotomies: { ei: "E", sn: "N", tf: "T", jp: "J" },
    motto: "The obstacle is not in my way. The obstacle is my way.",
    tagline:
      "Bold, strong-willed leaders who forge paths through systemic obstacles.",
    description:
      "The Commander organizes reality into a campaign. Goals are declared, resources marshaled, inefficiencies eliminated - and the world rearranged to match the vision. Warm leadership and cold logistics live in the same body. ENTJs do not wait for conditions to improve; they construct the conditions required for the next move.",
    strengths: [
      "Decisive, unsentimental leadership",
      "Rapid conversion of vision into operation",
      "High-stakes strategic clarity",
      "Direct, actionable communication",
    ],
    shadows: [
      "Impatience with emotion as input",
      "Domineering when consensus slows execution",
      "Collateral damage in pursuit of the objective",
      "Values audit deferred until crisis",
    ],
    stack: stack("Te", "Ni", "Se", "Fi"),
  },
  {
    slug: "entp",
    id: 3,
    code: "ENTP",
    nickname: "The Debater",
    alternateName: "Inventor",
    temperament: "Analysts",
    dichotomies: { ei: "E", sn: "N", tf: "T", jp: "P" },
    motto: "Every idea deserves to be stress-tested, including the sacred ones.",
    tagline:
      "Curious, divergent thinkers who cannot resist an intellectual challenge.",
    description:
      "The Debater tests the structural integrity of ideas by running them against their opposites. Orthodoxy is interesting only as a surface to push against; heresy is interesting only when it yields a working model. ENTPs live in permanent brainstorm - irreverent, improvisational, and happiest where the category boundaries are beginning to fray.",
    strengths: [
      "Rapid generation of novel possibilities",
      "Comfort in contradiction and paradox",
      "Talent for reframing stuck problems",
      "Intellectual charisma and play",
    ],
    shadows: [
      "Starting more than can be finished",
      "Arguing for sport past the point of insight",
      "Undermining structures others need",
      "Restlessness mistaken for curiosity",
    ],
    stack: stack("Ne", "Ti", "Fe", "Si"),
  },

  // ─── Diplomats (NF) ─────────────────────────────────
  {
    slug: "infj",
    id: 4,
    code: "INFJ",
    nickname: "The Advocate",
    alternateName: "Counselor",
    temperament: "Diplomats",
    dichotomies: { ei: "I", sn: "N", tf: "F", jp: "J" },
    motto: "I see what you could become, and I cannot unsee it.",
    tagline:
      "Quiet, mystical idealists guided by profound internal vision and ethical clarity.",
    description:
      "The Advocate holds a singular, almost prophetic sense of what things mean - and, beneath it, a profound pull toward what they could become. INFJs mediate between the inner image and the outer world with patience that can look like passivity but is, in fact, long-horizon moral work. They are rare in part because the integration the type demands is itself rare.",
    strengths: [
      "Visionary ethical foresight",
      "Deep attunement to subtle human patterns",
      "Steady commitment to humane ideals",
      "Ability to translate inner vision into shared meaning",
    ],
    shadows: [
      "Perfectionism that stalls the work",
      "Burnout from over-giving in silence",
      "Quiet contempt for those who cannot see it",
      "Door-slamming retreat when values are violated",
    ],
    stack: stack("Ni", "Fe", "Ti", "Se"),
  },
  {
    slug: "infp",
    id: 5,
    code: "INFP",
    nickname: "The Mediator",
    alternateName: "Healer",
    temperament: "Diplomats",
    dichotomies: { ei: "I", sn: "N", tf: "F", jp: "P" },
    motto: "If it is not true to me, I cannot make it true at all.",
    tagline:
      "Poetic, deeply altruistic individuals loyal to an inner moral compass.",
    description:
      "The Mediator listens inward to an unfalsifiable compass of values and will not - cannot - act against it. This fidelity is the source of both their healing presence and their friction with instrumental worlds. INFPs are endlessly loyal to what feels true and slow to commit to what does not. Their gift is the capacity to meet others' inner lives as real.",
    strengths: [
      "Unwavering personal authenticity",
      "Poetic insight into human interiority",
      "Healing, nonjudgmental presence",
      "Creative endurance across solitary work",
    ],
    shadows: [
      "Paralysis when values outrun capacity",
      "Idealization followed by quiet withdrawal",
      "Resentment accumulated in silence",
      "Escape into fantasy when the world disappoints",
    ],
    stack: stack("Fi", "Ne", "Si", "Te"),
  },
  {
    slug: "enfj",
    id: 6,
    code: "ENFJ",
    nickname: "The Protagonist",
    alternateName: "Teacher",
    temperament: "Diplomats",
    dichotomies: { ei: "E", sn: "N", tf: "F", jp: "J" },
    motto: "I cannot flourish alone. We will do it together, or not at all.",
    tagline:
      "Charismatic leaders who orchestrate collective harmony toward a unified vision.",
    description:
      "The Protagonist feels the field of a room the way others feel weather and shapes it toward a shared end. Natural teachers, organizers, and moral guides, ENFJs model what they believe and call others into the pattern. Their power is relational - harnessed well, it transforms groups; harnessed poorly, it tips into pressure disguised as care.",
    strengths: [
      "Infectious, value-driven leadership",
      "Ability to name the group's best self",
      "Warm, articulate persuasion",
      "Long-horizon relational commitment",
    ],
    shadows: [
      "Over-identification with others' trajectories",
      "Approval-seeking mistaken for service",
      "Martyr narratives under stress",
      "Difficulty tolerating disharmony, even when useful",
    ],
    stack: stack("Fe", "Ni", "Se", "Ti"),
  },
  {
    slug: "enfp",
    id: 7,
    code: "ENFP",
    nickname: "The Campaigner",
    alternateName: "Champion",
    temperament: "Diplomats",
    dichotomies: { ei: "E", sn: "N", tf: "F", jp: "P" },
    motto: "Every person is a possibility I haven't met yet.",
    tagline:
      "Enthusiastic free spirits who champion individual potential across every circle.",
    description:
      "The Campaigner scans the world for possibility - in people, in ideas, in the half-formed shape of something that could still become. Deeply values-driven under the sparkle, ENFPs give others permission to be larger than they were before the encounter. The cost is a certain restlessness; the gift is that the restlessness makes the world a little more alive.",
    strengths: [
      "Inspiring advocacy for others' potential",
      "Generative, cross-pollinating curiosity",
      "Warmth paired with principled conviction",
      "Improvisational storytelling and connection",
    ],
    shadows: [
      "Abandoned projects when novelty fades",
      "Conflict avoidance softening into dishonesty",
      "Burnout from scattered commitments",
      "Identity tethered to being liked",
    ],
    stack: stack("Ne", "Fi", "Te", "Si"),
  },

  // ─── Sentinels (SJ) ─────────────────────────────────
  {
    slug: "istj",
    id: 8,
    code: "ISTJ",
    nickname: "The Logistician",
    alternateName: "Inspector",
    temperament: "Sentinels",
    dichotomies: { ei: "I", sn: "S", tf: "T", jp: "J" },
    motto: "Do it the way it has been proven to work. Then do it again.",
    tagline:
      "Practical, fact-minded individuals whose reliability cannot be doubted.",
    description:
      "The Logistician holds the line. Facts are checked, promises kept, processes documented - and the institutions that depend on all three quietly go on functioning. ISTJs are often underestimated precisely because the work they do is the work that looks like nothing when it is done well. Their loyalty is structural as much as personal.",
    strengths: [
      "Rigorous follow-through and precision",
      "Institutional memory and consistency",
      "Deep sense of duty and integrity",
      "Calm operation under pressure",
    ],
    shadows: [
      "Resistance to change the data has already justified",
      "Judgement of those who improvise",
      "Repression of affect until it leaks as irritation",
      "Narrow definition of the acceptable",
    ],
    stack: stack("Si", "Te", "Fi", "Ne"),
  },
  {
    slug: "isfj",
    id: 9,
    code: "ISFJ",
    nickname: "The Defender",
    alternateName: "Protector",
    temperament: "Sentinels",
    dichotomies: { ei: "I", sn: "S", tf: "F", jp: "J" },
    motto: "I will quietly see to it that the people I love are safe.",
    tagline:
      "Warm, conscientious protectors of community safety and harmony.",
    description:
      "The Defender attends to the concrete, recurring needs of the people in their care and does so without fanfare. Memory, attention, and felt responsibility converge into a presence that holds others. ISFJs are often the invisible architecture of a family, team, or tradition - carrying the continuity that makes belonging possible at all.",
    strengths: [
      "Devoted, dependable care",
      "Precise attention to felt and practical needs",
      "Steward of traditions and continuity",
      "Loyalty that survives difficulty",
    ],
    shadows: [
      "Self-erasure in service of others",
      "Silent resentment when care is unreciprocated",
      "Overprotection that limits others' growth",
      "Fear of change defended as loyalty to the past",
    ],
    stack: stack("Si", "Fe", "Ti", "Ne"),
  },
  {
    slug: "estj",
    id: 10,
    code: "ESTJ",
    nickname: "The Executive",
    alternateName: "Supervisor",
    temperament: "Sentinels",
    dichotomies: { ei: "E", sn: "S", tf: "T", jp: "J" },
    motto: "Clarity of role, clarity of metric, clarity of outcome.",
    tagline:
      "Administrators who orchestrate people and process toward concrete results.",
    description:
      "The Executive makes the operational world legible - roles defined, standards enforced, outcomes measured. Order is not a preference but a moral good, the thing that lets groups larger than a few dozen people actually do anything. ESTJs run what runs, and the institutions they steward tend to keep their promises.",
    strengths: [
      "Decisive, accountable management",
      "Talent for building and enforcing clear systems",
      "Practical realism under ambiguity",
      "Commitment to promised outcomes",
    ],
    shadows: [
      "Equating procedure with rightness",
      "Dismissing affect as inefficient",
      "Dominance mistaken for leadership",
      "Rigid judgement of divergent styles",
    ],
    stack: stack("Te", "Si", "Ne", "Fi"),
  },
  {
    slug: "esfj",
    id: 11,
    code: "ESFJ",
    nickname: "The Consul",
    alternateName: "Provider",
    temperament: "Sentinels",
    dichotomies: { ei: "E", sn: "S", tf: "F", jp: "J" },
    motto: "A community is a thing you make, every day, with your hands.",
    tagline:
      "Caring, community-focused individuals who sustain the traditions of their peers.",
    description:
      "The Consul builds and maintains the social fabric - the birthday remembered, the meal made, the ritual kept. They read the emotional temperature of a group and move instinctively to warm it. ESFJs are the reason communities feel like communities; their talent is translating care into the small concrete acts that others will later remember.",
    strengths: [
      "Skilled hosting and community care",
      "Sensitivity to collective mood",
      "Dependable follow-through on social commitments",
      "Practical generosity",
    ],
    shadows: [
      "Conformity pressure dressed as care",
      "Exhaustion from chronic over-functioning",
      "Gossip as a conflict-avoidant outlet",
      "Status anxiety disguised as tradition",
    ],
    stack: stack("Fe", "Si", "Ne", "Ti"),
  },

  // ─── Explorers (SP) ─────────────────────────────────
  {
    slug: "istp",
    id: 12,
    code: "ISTP",
    nickname: "The Virtuoso",
    alternateName: "Crafter",
    temperament: "Explorers",
    dichotomies: { ei: "I", sn: "S", tf: "T", jp: "P" },
    motto: "Tell me how it breaks, and I will tell you how it works.",
    tagline:
      "Tolerant, mechanically brilliant experimenters who act with tactical precision.",
    description:
      "The Virtuoso understands systems by touching them. Tools, machines, bodies, code - the ISTP absorbs the feel of a thing and intervenes with an economy that looks like luck until you watch them do it twice. They are quiet, observant, and astonishingly competent in a crisis, when thinking and moving collapse into a single act.",
    strengths: [
      "Cool, tactical competence under pressure",
      "Embodied mechanical and systemic intuition",
      "Efficient, unsentimental problem-solving",
      "Independence without posture",
    ],
    shadows: [
      "Emotional flatness or sudden withdrawal",
      "Risk-seeking when understimulated",
      "Resistance to long-term commitment",
      "Principled bluntness that wounds",
    ],
    stack: stack("Ti", "Se", "Ni", "Fe"),
  },
  {
    slug: "isfp",
    id: 13,
    code: "ISFP",
    nickname: "The Adventurer",
    alternateName: "Composer",
    temperament: "Explorers",
    dichotomies: { ei: "I", sn: "S", tf: "F", jp: "P" },
    motto: "The truth of a moment is in how it feels, before anyone names it.",
    tagline:
      "Sensitive artistic souls deeply attuned to the aesthetics of the present.",
    description:
      "The Adventurer lives close to the texture of experience. Color, sound, gesture, mood - perception arrives in high fidelity and is immediately filtered through a private, inviolate sense of what is true. ISFPs do not argue their values; they inhabit them. The result is an aesthetic and ethical presence that is quiet, particular, and difficult to fake.",
    strengths: [
      "Vivid aesthetic and sensory intelligence",
      "Quiet, uncompromised personal integrity",
      "Present-tense, fully embodied attention",
      "Gentleness paired with steel",
    ],
    shadows: [
      "Conflict avoidance until rupture",
      "Withdrawal when values are trampled",
      "Under-articulation of needs",
      "Identification with mood over direction",
    ],
    stack: stack("Fi", "Se", "Ni", "Te"),
  },
  {
    slug: "estp",
    id: 14,
    code: "ESTP",
    nickname: "The Entrepreneur",
    alternateName: "Promoter",
    temperament: "Explorers",
    dichotomies: { ei: "E", sn: "S", tf: "T", jp: "P" },
    motto: "The window is open now. We can talk about it later.",
    tagline:
      "Kinetic, perceptive pragmatists who thrive on the tactical edge.",
    description:
      "The Entrepreneur reads the live field and moves. Opportunity is a thing seen before it is described, and the ESTP is already halfway across the room by the time others are still formulating the question. Fast, charming, and unsentimental about what the situation requires, they turn moments into outcomes.",
    strengths: [
      "Sharp real-time situational reading",
      "Decisive action under uncertainty",
      "Charismatic, persuasive presence",
      "Comfort with risk and reversal",
    ],
    shadows: [
      "Short-term framing crowding out long consequences",
      "Instrumental use of relationships",
      "Impatience with reflection",
      "Thrill-seeking as emotional evasion",
    ],
    stack: stack("Se", "Ti", "Fe", "Ni"),
  },
  {
    slug: "esfp",
    id: 15,
    code: "ESFP",
    nickname: "The Entertainer",
    alternateName: "Performer",
    temperament: "Explorers",
    dichotomies: { ei: "E", sn: "S", tf: "F", jp: "P" },
    motto: "If you are going to be here anyway, you may as well be here.",
    tagline:
      "Vibrant, warm performers who amplify the aliveness of every room they enter.",
    description:
      "The Entertainer is a specialist in the present. Sensory richness, emotional immediacy, and an unfeigned generosity converge into a presence that wakes other people up. ESFPs do not merely enjoy the moment - they extend the invitation to it, and their gift is the reminder that meaning often arrives through the body before it arrives through the mind.",
    strengths: [
      "Luminous, embodied social presence",
      "Generosity in the moment",
      "Warmth that lowers others' defenses",
      "Aesthetic flair and performative ease",
    ],
    shadows: [
      "Avoidance of the long view",
      "Escape into stimulation under stress",
      "Difficulty tolerating solitude or silence",
      "Conflict smoothed over rather than resolved",
    ],
    stack: stack("Se", "Fi", "Te", "Ni"),
  },
];

export const MBTI_BY_TEMPERAMENT: Record<string, MbtiArchetype[]> = {
  Analysts: ALL_MBTI.filter((a) => a.temperament === "Analysts"),
  Diplomats: ALL_MBTI.filter((a) => a.temperament === "Diplomats"),
  Sentinels: ALL_MBTI.filter((a) => a.temperament === "Sentinels"),
  Explorers: ALL_MBTI.filter((a) => a.temperament === "Explorers"),
};

export function getMbtiBySlug(slug: string): MbtiArchetype | undefined {
  return ALL_MBTI.find((a) => a.slug === slug);
}

export function getMbtiByCode(code: MbtiCode): MbtiArchetype | undefined {
  return ALL_MBTI.find((a) => a.code === code);
}

export function getMbtiById(id: number): MbtiArchetype | undefined {
  return ALL_MBTI.find((a) => a.id === id);
}

export function getTemperament(
  id: MbtiArchetype["temperament"]
): TemperamentGroup {
  return TEMPERAMENT_GROUPS.find((g) => g.id === id)!;
}
