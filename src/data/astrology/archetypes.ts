import { ZodiacArchetype, ZodiacElementGroup } from "@/types/astrology";

export const ZODIAC_COLORS = {
  fire: "#C6553F",
  earth: "#8A7A45",
  air: "#B8A96A",
  water: "#3E6E8C",
  accent: "#7C8CB0",
} as const;

export const ZODIAC_ELEMENTS: ZodiacElementGroup[] = [
  {
    id: "fire",
    label: "Fire",
    tagline: "Kindling",
    affectTint: "anger / gut",
    temperament: "choleric",
    description:
      "The fire signs meet the world as combustion — identity experienced as heat, will, and forward charge. Classically choleric, they map onto the gut center: anger is their native voltage, and their lifework is to burn without consuming. Aries kindles, Leo sustains, Sagittarius carries the flame toward the horizon.",
    color: ZODIAC_COLORS.fire,
    signs: ["aries", "leo", "sagittarius"],
  },
  {
    id: "earth",
    label: "Earth",
    tagline: "Ground",
    affectTint: "desire / eros",
    temperament: "melancholic",
    description:
      "The earth signs meet the world as matter — value known through the body, the made thing, the kept promise. Classically melancholic, they answer to desire in its oldest sense: eros as gravity, the pull toward what can be touched and held. Taurus grounds, Virgo refines, Capricorn builds to last.",
    color: ZODIAC_COLORS.earth,
    signs: ["taurus", "virgo", "capricorn"],
  },
  {
    id: "air",
    label: "Air",
    tagline: "Current",
    affectTint: "fear / head",
    temperament: "sanguine",
    description:
      "The air signs meet the world as pattern — relation experienced through language, symmetry, and idea. Classically sanguine, they map onto the head center: a wariness of the unmediated drives them to think the world before touching it. Gemini names, Libra weighs, Aquarius redesigns.",
    color: ZODIAC_COLORS.air,
    signs: ["gemini", "libra", "aquarius"],
  },
  {
    id: "water",
    label: "Water",
    tagline: "Depth",
    affectTint: "shame / heart",
    temperament: "phlegmatic",
    description:
      "The water signs meet the world as feeling — the boundary experienced as permeable, meaning arriving on the tide. Classically phlegmatic, they answer to the heart center's grammar of shame and belonging: who is inside, what must be protected, what may be allowed to dissolve. Cancer holds, Scorpio plumbs, Pisces dissolves.",
    color: ZODIAC_COLORS.water,
    signs: ["cancer", "scorpio", "pisces"],
  },
];

// ─── ARIES ──────────────────────────────────────────────
export const aries: ZodiacArchetype = {
  slug: "aries",
  name: "Aries",
  glyph: "♈",
  order: 1,
  element: "fire",
  modality: "cardinal",
  polarity: "diurnal",
  rulingPlanet: "Mars",
  dates: "Mar 21 – Apr 19",
  motto: "I am — and I will know it by the charge.",
  description:
    "Aries is the zodiac's first breath — the point where undifferentiated winter breaks into declared spring. Read as a character structure, it is organized around initiation: the self is proven by the charge, and hesitation feels like a small death. There is a purity in this — Aries wants nothing hidden, resents nothing longer than an afternoon, and meets the world head-first because sideways never occurred to it. The cost is everything that requires a second act.",
  keyCharacteristics: [
    "Instinct for initiation and first moves",
    "Courage that precedes deliberation",
    "Directness without residue — anger spent, then gone",
    "Competitive vitality and physical presence",
    "Impatience with process, maintenance, and aftermath",
  ],
  gift: "The courage to begin — Aries supplies the ignition every other sign will later refine.",
  trap: "Combustion without construction — a life of first chapters; force mistaken for proof of self.",
  oppositeSign: "Libra",
  oppositeNote:
    "Libra is the counter-weight Aries pretends not to need: the discovery that the self is completed only in relation, that every charge lands on someone. What Aries asserts, Libra weighs — and the mature Ram learns to let the scales answer back.",
  goldenDawnArcana: {
    name: "The Emperor",
    slug: "the-emperor",
    note: "Cardinal fire enthroned: the Emperor is the Aries charge given structure — ram-headed Mars-force seated, learning to hold rather than merely take.",
  },
  jungianCorrelation: "The Hero / Warrior — Mars",
  jungianSlug: "hero",
  thrivingNarrative:
    "In growth Aries becomes the clean blade — initiative in service of something larger than the win. The charge acquires a cause, and courage matures from reflex into commitment.",
  pressureNarrative:
    "Under stress Aries slides toward Libra's shadow: indecisive beneath the bluster, picking fights to avoid choosing, or outsourcing the verdict to whoever pushes back hardest. The pioneer becomes merely combative.",
  accentColor: "#C94A33",
};

// ─── TAURUS ──────────────────────────────────────────────
export const taurus: ZodiacArchetype = {
  slug: "taurus",
  name: "Taurus",
  glyph: "♉",
  order: 2,
  element: "earth",
  modality: "fixed",
  polarity: "nocturnal",
  rulingPlanet: "Venus",
  dates: "Apr 20 – May 20",
  motto: "I have — and what I hold, holds me.",
  description:
    "Taurus is appetite settled into form — the zodiac's first encounter with matter, and its deepest loyalty to it. As a character structure it is organized around keeping: the body, the garden, the routine, the beloved, all held with a patience that shades imperceptibly into refusal. Nothing in Taurus is hurried, and nothing once claimed is easily released. Its sanity is sensuous and real; its danger is that comfort becomes the whole curriculum.",
  keyCharacteristics: [
    "Sensuous intelligence — value known through the body",
    "Patience and productive stubbornness",
    "Loyalty that outlasts weather",
    "Craftsmanlike steadiness; finishes what it starts",
    "Resistance to change — even improving change",
  ],
  gift: "Steadfastness — the capacity to remain, to tend, and to make things that last.",
  trap: "Possession as identity — holding on past the point of aliveness; inertia dressed up as principle.",
  oppositeSign: "Scorpio",
  oppositeNote:
    "Scorpio is the truth Taurus defers: that everything held must eventually transform or die. Where Taurus keeps, Scorpio composts — and the mature Bull learns that release is a form of keeping too.",
  goldenDawnArcana: {
    name: "The Hierophant",
    slug: "the-hierophant",
    note: "Fixed earth as sacred custom: the Hierophant is Taurean keeping raised to doctrine — Venus in the temple, value transmitted as tradition.",
  },
  jungianCorrelation: "The Steadfast / Builder — Venusian earth",
  jungianSlug: "everyman",
  thrivingNarrative:
    "In growth Taurus becomes the garden rather than the vault — abundance tended and shared, pleasure without anxiety, a stability others can build on. What it keeps, it keeps alive.",
  pressureNarrative:
    "Under stress Taurus absorbs Scorpio's shadow: possessive, suspicious, gripping harder as the ground shifts. Comfort curdles into siege; the immovable becomes the unreachable.",
  accentColor: "#97824C",
};

// ─── GEMINI ──────────────────────────────────────────────
export const gemini: ZodiacArchetype = {
  slug: "gemini",
  name: "Gemini",
  glyph: "♊",
  order: 3,
  element: "air",
  modality: "mutable",
  polarity: "diurnal",
  rulingPlanet: "Mercury",
  dates: "May 21 – Jun 20",
  motto: "I think — and every thought arrives with its twin.",
  description:
    "Gemini is the mind discovering it can be in two places at once. As a character structure it is organized around translation: experience is not complete until it has been named, paired, compared, retold — turned into language and passed along. The twins are not a decoration but a diagnosis: Gemini lives beside itself, watching, narrating, revising. Its lightness is real intelligence; its restlessness is the suspicion that any single position is a cage.",
  keyCharacteristics: [
    "Verbal quickness and associative range",
    "Curiosity that refuses a single lane",
    "Social fluency; the gift of the apt word",
    "Perpetual self-commentary — the twin who watches",
    "Difficulty with depth, duration, and the unsaid",
  ],
  gift: "Articulation — Gemini gives the world its captions and makes thought portable.",
  trap: "Scattering — a life of openings and asides; cleverness deployed to avoid ever being pinned to one truth.",
  oppositeSign: "Sagittarius",
  oppositeNote:
    "Sagittarius holds the far half of Gemini's sentence: the near fact longs for the distant meaning, the datum for the arc. The mature Twin stops collecting and starts concluding — borrowing the Archer's willingness to aim.",
  goldenDawnArcana: {
    name: "The Lovers",
    slug: "the-lovers",
    note: "The twins written into the card of choice: the Lovers is Gemini's doubleness made consequential — two become one only by a decision.",
  },
  jungianCorrelation: "The Messenger / Trickster — Mercury",
  jungianSlug: "jester",
  thrivingNarrative:
    "In growth Gemini becomes the true messenger — curiosity organized into craft, wit in service of understanding rather than escape. The two voices harmonize instead of interrupting.",
  pressureNarrative:
    "Under stress Gemini fragments toward noise: talking instead of feeling, ironizing instead of choosing — or slipping into Sagittarius' shadow of dogmatic certainty about whatever it read last.",
  accentColor: "#C7B266",
};

// ─── CANCER ──────────────────────────────────────────────
export const cancer: ZodiacArchetype = {
  slug: "cancer",
  name: "Cancer",
  glyph: "♋",
  order: 4,
  element: "water",
  modality: "cardinal",
  polarity: "nocturnal",
  rulingPlanet: "The Moon",
  dates: "Jun 21 – Jul 22",
  motto: "I feel — and I remember everything I felt.",
  description:
    "Cancer is the first interior — the zodiac's discovery that feeling needs a house. As a character structure it is organized around protection: a radically permeable sensitivity that has learned to build shell, and to lead with the claw when the soft body is at stake. Its memory is tidal and total; nothing felt is ever quite over. What looks like moodiness is weather in an inner sea that registers everything.",
  keyCharacteristics: [
    "Deep emotional memory and attunement",
    "Fierce protectiveness of the chosen circle",
    "Nurture as instinct and vocation",
    "Indirect approach — the crab's sideways reach",
    "Retreat into the shell when hurt; moods as tides",
  ],
  gift: "Sanctuary — Cancer makes the places, meals, and silences in which others become safe enough to feel.",
  trap: "The shell as prison — clinging, brooding, defending old wounds so well they never close.",
  oppositeSign: "Capricorn",
  oppositeNote:
    "Capricorn is the outer wall to Cancer's inner room: structure, duty, the public father to the private mother. The mature Crab borrows Saturn's spine — care that can also set a boundary and hold a line.",
  goldenDawnArcana: {
    name: "The Chariot",
    slug: "the-chariot",
    note: "Armored motion: the Chariot is Cancer's carapace made vehicle — the soft, moon-led feeling carried forward behind defended walls.",
  },
  jungianCorrelation: "The Mother / Nurturer — the Moon",
  jungianSlug: "caregiver",
  thrivingNarrative:
    "In growth Cancer becomes the hearth rather than the shell — nourishing without engulfing, remembering without hoarding. Its sensitivity turns outward as hospitality.",
  pressureNarrative:
    "Under stress Cancer hardens into Capricorn's shadow: cold and dutiful, administering everyone's needs while its own feeling goes unfed — or it retreats entirely, sealing the shell and calling the silence peace.",
  accentColor: "#4E7A93",
};

// ─── LEO ──────────────────────────────────────────────
export const leo: ZodiacArchetype = {
  slug: "leo",
  name: "Leo",
  glyph: "♌",
  order: 5,
  element: "fire",
  modality: "fixed",
  polarity: "diurnal",
  rulingPlanet: "The Sun",
  dates: "Jul 23 – Aug 22",
  motto: "I will — and the willing shall be radiant.",
  description:
    "Leo is the self as light source — identity organized around radiance, and the conviction that being seen and being real are the same event. As a character structure it is theatrical in the oldest, least trivial sense: life is staged because meaning requires an audience, and the performance is sincere. Its warmth is genuine and generative; whole rooms organize around it. The question Leo must answer is whether the shine survives the absence of applause.",
  keyCharacteristics: [
    "Radiant, organizing presence",
    "Generosity — warmth given as patronage",
    "Creative self-expression as life-necessity",
    "Loyalty and largeness of heart",
    "Dependence on recognition; wounded by indifference",
  ],
  gift: "Radiance — the capacity to warm, dignify, and enlarge everyone standing in the light.",
  trap: "The performance devours the performer — pride, tribute-hunger, and a shine maintained at the cost of the self it was meant to express.",
  oppositeSign: "Aquarius",
  oppositeNote:
    "Aquarius is the many to Leo's one: the crowd, the commons, the cause that outlives any single radiant self. The mature Lion learns from the Water-Bearer that the light was never for the mirror — it was for the room.",
  goldenDawnArcana: {
    name: "Strength",
    slug: "strength",
    note: "The lion met by the maiden: Strength is Leo's own beast gentled — force mastered not by force but by grace, the sun-heart holding its animal with a soft hand.",
  },
  jungianCorrelation: "The Sovereign / King — the Sun",
  jungianSlug: "ruler",
  thrivingNarrative:
    "In growth Leo becomes the true sun — generous, steady, delighting in others' shine as an extension of its own. Sovereignty matures into patronage.",
  pressureNarrative:
    "Under stress Leo slides into Aquarius' shadow: aloof and abstract, exiling itself from the very warmth it commands — or it inflates, demanding tribute where it once gave light.",
  accentColor: "#D8823B",
};

// ─── VIRGO ──────────────────────────────────────────────
export const virgo: ZodiacArchetype = {
  slug: "virgo",
  name: "Virgo",
  glyph: "♍",
  order: 6,
  element: "earth",
  modality: "mutable",
  polarity: "nocturnal",
  rulingPlanet: "Mercury",
  dates: "Aug 23 – Sep 22",
  motto: "I analyze — because love, done properly, is in the details.",
  description:
    "Virgo is intelligence bent to service — the harvest sign, where what fire began and earth grew must now be sorted, threshed, and made useful. As a character structure it is organized around refinement: the eye that cannot help seeing the flaw, yoked to the hand that cannot help repairing it. Its modesty is structural, not performed; Virgo would rather perfect the thing than sign it. The danger is a criticism that turns inward and never sleeps.",
  keyCharacteristics: [
    "Precision of perception — the flaw seen instantly",
    "Craft, method, and quiet competence",
    "Service as the native form of love",
    "Discrimination — the sorted from the unsorted",
    "A conscience that audits itself hardest",
  ],
  gift: "Discernment in service — Virgo makes things work, heal, and fit, and asks almost nothing for it.",
  trap: "Perfectionism as self-erasure — the audit that never ends; usefulness substituted for the right to exist.",
  oppositeSign: "Pisces",
  oppositeNote:
    "Pisces is the ocean Virgo's harvest was drawn from: the whole that resists sorting, the mercy that precedes correction. The mature Virgin learns from the Fish that some things are healed by dissolving the standard, not by meeting it.",
  goldenDawnArcana: {
    name: "The Hermit",
    slug: "the-hermit",
    note: "Mercury withdrawn into earth: the Hermit is Virgo's discrimination carried up the mountain — the harvest lantern held over one careful step at a time.",
  },
  jungianCorrelation: "The Craftsman / Servant — Mercury in earth",
  jungianSlug: "sage",
  thrivingNarrative:
    "In growth Virgo becomes the healer-craftsman — precision warmed into care, the standard held with mercy. It discovers it was always enough before the work was done.",
  pressureNarrative:
    "Under stress Virgo dissolves toward Pisces' shadow: anxious, scattered, quietly martyred — drowning in the details it once commanded, serving everyone as a way of vanishing.",
  accentColor: "#7C8450",
};

// ─── LIBRA ──────────────────────────────────────────────
export const libra: ZodiacArchetype = {
  slug: "libra",
  name: "Libra",
  glyph: "♎",
  order: 7,
  element: "air",
  modality: "cardinal",
  polarity: "diurnal",
  rulingPlanet: "Venus",
  dates: "Sep 23 – Oct 22",
  motto: "I balance — nothing is true alone.",
  description:
    "Libra begins at the equinox — the year's own act of weighing — and carries that balance inward as a character structure. It is organized around the other: no thought is finished until it has been tested against a counter-thought, no self complete without a partner, a public, an opposite. Its famous charm is really an ethics of the interval — the belief that between any two positions there is a juster third. The cost is a self so devoted to symmetry it can forget which pan holds its own weight.",
  keyCharacteristics: [
    "Instinct for fairness, proportion, and the counter-case",
    "Aesthetic intelligence — harmony as moral category",
    "Diplomacy; the soft word that carries the hard point",
    "Life conducted through partnership",
    "Indecision — the scales that will not settle",
  ],
  gift: "Equilibrium — Libra civilizes force, turning collision into conversation and taste into justice.",
  trap: "Peace at any price — accommodation until the self dissolves; the verdict endlessly deferred.",
  oppositeSign: "Aries",
  oppositeNote:
    "Aries is the first person singular that Libra keeps deferring: the raw claim, the unweighed want. The mature Scale-bearer borrows the Ram's nerve — discovering that a fair fight is a form of respect, and that choosing is not violence.",
  goldenDawnArcana: {
    name: "Justice",
    slug: "justice",
    note: "The scales made arcanum: Justice is Libra stripped of charm — cardinal air holding the sword, the weighing finally answered with a verdict.",
  },
  jungianCorrelation: "The Diplomat / Lover — Venus",
  jungianSlug: "lover",
  thrivingNarrative:
    "In growth Libra becomes the true diplomat — balance as active art rather than avoidance, beauty deployed on behalf of justice. It learns to sign its own verdicts.",
  pressureNarrative:
    "Under stress Libra slides into Aries' shadow: suddenly combative, contrarian, righteous — or it swings the other way, appeasing until nothing true can be said. The scales oscillate; the center empties.",
  accentColor: "#B3A66F",
};

// ─── SCORPIO ──────────────────────────────────────────────
export const scorpio: ZodiacArchetype = {
  slug: "scorpio",
  name: "Scorpio",
  glyph: "♏",
  order: 8,
  element: "water",
  modality: "fixed",
  polarity: "nocturnal",
  rulingPlanet: "Mars (trad.) / Pluto",
  dates: "Oct 23 – Nov 21",
  motto: "I desire — all the way to the bottom.",
  description:
    "Scorpio is feeling under pressure — water fixed, sealed, and driven downward until it cuts like a jet. As a character structure it is organized around depth and control: nothing is taken at surface value, every bond is tested for what it can survive, and intimacy is an all-or-nothing wager. It does not want pleasantness; it wants the true thing, even ruined. Its life proceeds by deaths and rebirths that other signs would call catastrophes and Scorpio calls Tuesdays.",
  keyCharacteristics: [
    "Penetrating perception — reads the under-layer first",
    "Intensity and emotional totality",
    "Loyalty unto death; betrayal never forgotten",
    "Strategic patience and formidable will",
    "Secrecy, jealousy, and the long-held sting",
  ],
  gift: "Transformative depth — the nerve to enter what others flee, and to come back changed rather than broken.",
  trap: "Control as intimacy's counterfeit — suspicion, vengeance, and the hoarding of secrets until the depth becomes a crypt.",
  oppositeSign: "Taurus",
  oppositeNote:
    "Taurus is the daylight body Scorpio's depth forgets: simple pleasure, the unexamined peach, value that does not need to be earned through ordeal. The mature Scorpion borrows the Bull's calm — learning that not everything precious has to survive a test.",
  goldenDawnArcana: {
    name: "Death",
    slug: "death",
    note: "Fixed water on the card of endings: Death is Scorpio's method stated plainly — transformation as the only fidelity, the harvest that clears the field.",
  },
  jungianCorrelation: "The Alchemist / Death-and-Rebirth — Pluto",
  jungianSlug: "magician",
  thrivingNarrative:
    "In growth Scorpio becomes the healer of what it once merely survived — depth offered as sanctuary, power used to midwife other people's transformations. The sting becomes a lancet.",
  pressureNarrative:
    "Under stress Scorpio grips toward Taurus' shadow: possessive, immovable, materially entrenched — or it turns its own poison inward, brooding in the crypt it built for enemies.",
  accentColor: "#35586F",
};

// ─── SAGITTARIUS ──────────────────────────────────────────────
export const sagittarius: ZodiacArchetype = {
  slug: "sagittarius",
  name: "Sagittarius",
  glyph: "♐",
  order: 9,
  element: "fire",
  modality: "mutable",
  polarity: "diurnal",
  rulingPlanet: "Jupiter",
  dates: "Nov 22 – Dec 21",
  motto: "I seek — the horizon owes me an answer.",
  description:
    "Sagittarius is fire become trajectory — the arrow that has already left every bow it was given. As a character structure it is organized around meaning: the raw event is nothing until it points somewhere, and the horizon is less a limit than a standing invitation. Half beast and half archer, the centaur carries appetite and philosophy in one body and calls the combination honesty. Its faith is genuine; its besetting sin is mistaking the current enthusiasm for the final truth.",
  keyCharacteristics: [
    "Hunger for meaning, distance, and the large view",
    "Candor — the truth blurted with a grin",
    "Optimism as metaphysical position",
    "Restlessness; allergic to fences and fine print",
    "Prone to preach; generalizes from one good journey",
  ],
  gift: "Vision — Sagittarius lifts the local into the meaningful and keeps the horizon honest.",
  trap: "The gospel of elsewhere — promising more than it stays to deliver; conviction outrunning evidence.",
  oppositeSign: "Gemini",
  oppositeNote:
    "Gemini holds the near half of the Archer's arc: the particular fact, the second question, the footnote that complicates the sermon. The mature Centaur borrows the Twin's doubt — an aim corrected is an aim improved.",
  goldenDawnArcana: {
    name: "Temperance",
    slug: "temperance",
    note: "The arrow become the angel's poured arc: Temperance is Sagittarius refined — aim turned to alchemy, the flight between two vessels landing exactly.",
  },
  jungianCorrelation: "The Seeker / Wanderer — Jupiter",
  jungianSlug: "explorer",
  thrivingNarrative:
    "In growth Sagittarius becomes the genuine philosopher-traveler — belief tested by miles, generosity of vision matched by fidelity to the ground. The arrow lands, and builds there.",
  pressureNarrative:
    "Under stress Sagittarius scatters into Gemini's shadow: glib, evasive, arguing every side to stay uncaught — or it hardens into the zealot, defending yesterday's revelation against tomorrow's road.",
  accentColor: "#C06450",
};

// ─── CAPRICORN ──────────────────────────────────────────────
export const capricorn: ZodiacArchetype = {
  slug: "capricorn",
  name: "Capricorn",
  glyph: "♑",
  order: 10,
  element: "earth",
  modality: "cardinal",
  polarity: "nocturnal",
  rulingPlanet: "Saturn",
  dates: "Dec 22 – Jan 19",
  motto: "I use — time itself is my material.",
  description:
    "Capricorn begins at the year's darkest door and treats the climb out as a vocation. As a character structure it is organized around mastery through time: the long apprenticeship, the deferred reward, the mountain that justifies the knees. It is born old — the child who watched the adults and took notes — and spends a lifetime growing paradoxically younger as achievement releases it from fear. Its ambition is not vanity but architecture: something must be built that outlasts the builder.",
  keyCharacteristics: [
    "Discipline and strategic patience",
    "Instinct for structure, hierarchy, and consequence",
    "Duty carried without complaint",
    "Dry, flint-struck humor",
    "Difficulty resting; worth conflated with work",
  ],
  gift: "Mastery — the patience to build real things in real time, and the authority earned rather than claimed.",
  trap: "The summit as cage — ambition curdling into coldness; a life postponed in the name of the position.",
  oppositeSign: "Cancer",
  oppositeNote:
    "Cancer is the interior Capricorn's climb was secretly for: the hearth at the base of the mountain, the feeling that cannot be scheduled. The mature Goat comes home — discovering that the structure was always meant to shelter something soft.",
  goldenDawnArcana: {
    name: "The Devil",
    slug: "the-devil",
    note: "Saturnian earth on the card of matter and bondage: the Devil is Capricorn's shadow ledger — mastery of the material world, and the chains a master forges for himself.",
  },
  jungianCorrelation: "The Senex / Elder — Saturn, per Liz Greene",
  jungianSlug: "ruler",
  thrivingNarrative:
    "In growth Capricorn becomes the true elder — authority worn lightly, structure offered as shelter, the summit used as a place from which to see others up. Time turns from taskmaster to collaborator.",
  pressureNarrative:
    "Under stress Capricorn slides into Cancer's shadow: brittle and moody, hoarding grievances behind the office door — duty performed while the unfed feeling files its complaint as depression.",
  accentColor: "#6E6440",
};

// ─── AQUARIUS ──────────────────────────────────────────────
export const aquarius: ZodiacArchetype = {
  slug: "aquarius",
  name: "Aquarius",
  glyph: "♒",
  order: 11,
  element: "air",
  modality: "fixed",
  polarity: "diurnal",
  rulingPlanet: "Saturn (trad.) / Uranus",
  dates: "Jan 20 – Feb 18",
  motto: "I know — and I answer to the future.",
  description:
    "Aquarius is the mind stepped back far enough to see the whole system — and to notice, with electric detachment, that the system could be otherwise. As a character structure it is organized around the ideal: humanity loved in the abstract, the future preferred to the present, the self defined by its distance from the given. It is the zodiac's paradox — a fixed sign whose fixation is change, a rebel with Saturn's discipline in its bones. Its coolness is not absence of feeling but feeling routed through principle.",
  keyCharacteristics: [
    "Systemic, future-facing intelligence",
    "Principled independence — immune to fashion, loyal to ideals",
    "Egalitarian instinct; the friend of the whole room",
    "Electric originality — the useful strangeness",
    "Detachment that can chill the nearest people",
  ],
  gift: "Emancipation — Aquarius sees the cage as a design flaw and drafts the open door.",
  trap: "Humanity loved, humans avoided — the ideal deployed against the intimate; contrarianism mistaken for freedom.",
  oppositeSign: "Leo",
  oppositeNote:
    "Leo is the single beating heart Aquarius' blueprint keeps omitting: the personal, the preferential, the one who wants to be chosen rather than included. The mature Water-Bearer lets the Lion teach it that the revolution must also love somebody in particular.",
  goldenDawnArcana: {
    name: "The Star",
    slug: "the-star",
    note: "The water-bearer poured onto the card of hope: the Star is Aquarius' vision at its cleanest — the naked figure feeding the land from an inexhaustible elsewhere.",
  },
  jungianCorrelation: "The Rebel / Prometheus — Uranus, per Tarnas",
  jungianSlug: "rebel",
  thrivingNarrative:
    "In growth Aquarius becomes the humane visionary — the future imagined with warm hands, principle bent tenderly around actual people. The lightning learns to garden.",
  pressureNarrative:
    "Under stress Aquarius inflates into Leo's shadow: the prophet demanding an audience, ego smuggled back in as ideology — or it freezes entirely, watching its own life from orbit.",
  accentColor: "#A3A382",
};

// ─── PISCES ──────────────────────────────────────────────
export const pisces: ZodiacArchetype = {
  slug: "pisces",
  name: "Pisces",
  glyph: "♓",
  order: 12,
  element: "water",
  modality: "mutable",
  polarity: "nocturnal",
  rulingPlanet: "Jupiter (trad.) / Neptune",
  dates: "Feb 19 – Mar 20",
  motto: "I believe — the boundary was always a rumor.",
  description:
    "Pisces is the zodiac's last word — the sign in which every boundary the wheel constructed is quietly given back to the sea. As a character structure it is organized around permeability: other people's feelings arrive as its own, imagination outranks evidence, and the borders of the self are more custom than fact. The two fish, bound together and swimming opposite ways, are its honest emblem — one drawn toward transcendence, one toward escape, and the ribbon between them is a lifetime. Its compassion is oceanic; its peril is dissolution mistaken for depth.",
  keyCharacteristics: [
    "Boundless empathy — feels the room before entering it",
    "Imagination as primary residence",
    "Compassion without ledger",
    "Artistic and mystical receptivity",
    "Evasiveness; the escape hatch always half-open",
  ],
  gift: "Communion — Pisces dissolves the wall between self and other and returns with mercy, music, and dream.",
  trap: "Dissolution — martyrdom, fog, and the beautiful escape; drowning in what it was meant to swim.",
  oppositeSign: "Virgo",
  oppositeNote:
    "Virgo is the shoreline Pisces requires: the sorted, the scheduled, the healthy boundary drawn in clean ink. The mature Fish borrows the Virgin's discrimination — learning that a vessel is not a betrayal of the ocean but the only way to carry it.",
  goldenDawnArcana: {
    name: "The Moon",
    slug: "the-moon",
    note: "Mutable water under tidal light: the Moon is Pisces' path between the towers — the dissolving road walked by instinct, where nothing is quite what it silvered.",
  },
  jungianCorrelation: "The Mystic / Dreamer — Neptune",
  jungianSlug: "innocent",
  thrivingNarrative:
    "In growth Pisces becomes the working mystic — imagination given craft, compassion given edges, the dream brought back ashore intact. It saves without drowning.",
  pressureNarrative:
    "Under stress Pisces frays into Virgo's shadow: fretful and self-critical, nitpicking the very people it dissolved into — or it simply leaves, by fantasy, substance, or sleep, and calls the leaving peace.",
  accentColor: "#5B7E9C",
};

// ─── COLLECTIONS ──────────────────────────────────────────────

export const ALL_ASTROLOGY: ZodiacArchetype[] = [
  aries,
  taurus,
  gemini,
  cancer,
  leo,
  virgo,
  libra,
  scorpio,
  sagittarius,
  capricorn,
  aquarius,
  pisces,
];

export function getAstrologyBySlug(slug: string): ZodiacArchetype | undefined {
  return ALL_ASTROLOGY.find((a) => a.slug === slug);
}

export function getAstrologyByElement(element: ZodiacArchetype["element"]): ZodiacArchetype[] {
  const order = ZODIAC_ELEMENTS.find((e) => e.id === element)?.signs ?? [];
  return order
    .map((s) => getAstrologyBySlug(s))
    .filter((a): a is ZodiacArchetype => !!a);
}
