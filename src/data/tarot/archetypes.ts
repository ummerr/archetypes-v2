import { TarotArchetype, TarotPhase, TarotPhaseGroup } from "@/types/tarot";

export const TAROT_COLORS = {
  egoFormation: "#D4AF37", // Sovereign Gold — structures of self
  psycheAlchemy: "#6B4E8C", // Deep violet — internal alchemy
  unconsciousRealization: "#8C3A5E", // Deep rose — descent & return
  accent: "#8C3A5E",
} as const;

export const TAROT_PHASES: TarotPhaseGroup[] = [
  {
    id: "ego-formation",
    label: "Ego Formation",
    tagline: "The archetypal parents and the forging of will",
    range: "0 – VII",
    description:
      "The opening octave of the Fool's Journey. The psyche meets its archetypal parents, internalizes order and mystery, and forges the will required to cross the first thresholds. These are the foundations the self will later have to outgrow.",
    color: TAROT_COLORS.egoFormation,
    ids: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: "psyche-alchemy",
    label: "Psyche & Alchemy",
    tagline: "The inner mechanics — time, sacrifice, transformation",
    range: "VIII – XIV",
    description:
      "The middle passage turns inward. Here the conscious ego contends with instinct, solitude, cyclical fate, and the necessary deaths that clear the ground for transformation. The work is alchemical — tempering opposites into a workable self.",
    color: TAROT_COLORS.psycheAlchemy,
    ids: [8, 9, 10, 11, 12, 13, 14],
  },
  {
    id: "unconscious-realization",
    label: "Unconscious & Realization",
    tagline: "The descent into shadow and the return as Self",
    range: "XV – XXI",
    description:
      "The final phase is the deep descent — bondage, collapse, dream, and disintegration — followed by a reconstitution at a higher order. The journey does not end so much as complete a turn; the World opens again onto the Fool.",
    color: TAROT_COLORS.unconsciousRealization,
    ids: [15, 16, 17, 18, 19, 20, 21],
  },
];

// ─── 0 · THE FOOL ───────────────────────────────────────────
export const theFool: TarotArchetype = {
  slug: "the-fool",
  id: 0,
  numeral: "0",
  name: "The Fool",
  phase: "ego-formation",
  symbol: "✺",
  motto: "I step off the edge because the air is also ground.",
  coreTheme: "Unconditioned potential — the psyche before it has chosen a shape.",
  description:
    "The Fool is the zero-point of the psyche: awareness before conditioning, openness before commitment. He carries no history because he has not yet lived; every direction is equally possible. In the individuation process he marks both the beginning and the eternal return — the naïve self that the completed self must re-find.",
  poles: {
    fullness: {
      title: "The Open Beginner",
      description:
        "Radical trust in the unknown. The Fool in fullness is willing to be a beginner anywhere, to hold the future loosely, and to enter the world without demanding that it match prior knowing.",
    },
    activeShadow: {
      title: "The Compulsive Wanderer",
      description:
        "Novelty as addiction. Here openness curdles into recklessness — the refusal ever to land, commit, or bear the weight of consequence. Every leap avoids the one leap that would actually cost something.",
    },
    passiveShadow: {
      title: "The Paralyzed Seeker",
      description:
        "The leap that never happens. Beneath the stillness is terror — of error, of looking foolish, of the unmade self. Potential calcifies into fantasy; the journey is endlessly planned, never begun.",
    },
  },
  jungianCorrelation: "The Innocent",
  jungianSlug: "innocent",
  accentColor: "#8C3A5E",
};

// ─── I · THE MAGICIAN ───────────────────────────────────────
export const theMagician: TarotArchetype = {
  slug: "the-magician",
  id: 1,
  numeral: "I",
  name: "The Magician",
  phase: "ego-formation",
  symbol: "∞",
  motto: "As above, so below — and I am the current between them.",
  coreTheme: "Directed will — the discovery that consciousness can shape matter.",
  description:
    "The Magician is the psyche's first taste of agency: the recognition that inner intention can be transmitted through focused attention into the world. He gathers the four elements of the self and learns to conduct them. This is the birth of craft, the will as instrument.",
  poles: {
    fullness: {
      title: "The Focused Will",
      description:
        "Conscious intention wedded to skill. The Magician in fullness channels inner vision into matter with precision and honesty, co-creating with reality rather than coercing it.",
    },
    activeShadow: {
      title: "The Evil Sorcerer",
      description:
        "Will used to dominate. Intellect becomes manipulation, language becomes spell-casting, skill becomes a vector of control. The Magician here forgets that he is also the thing being shaped.",
    },
    passiveShadow: {
      title: "The Imposter",
      description:
        "Competence disclaimed. Paralysis at the edge of action, a chronic sense of fraudulence, diffuse attention that refuses to land long enough to produce anything real. The tools sit untouched on the table.",
    },
  },
  jungianCorrelation: "The Magician",
  jungianSlug: "magician",
  accentColor: "#1B9E6B",
};

// ─── II · THE HIGH PRIESTESS ────────────────────────────────
export const theHighPriestess: TarotArchetype = {
  slug: "the-high-priestess",
  id: 2,
  numeral: "II",
  name: "The High Priestess",
  phase: "ego-formation",
  symbol: "☾",
  motto: "What you cannot yet say already knows you.",
  coreTheme: "Inner knowing — the counterweight to the Magician's outward will.",
  description:
    "The High Priestess sits at the threshold between conscious and unconscious, tending the veil. She is the psyche's capacity to receive — to listen to dream, body, and the slow knowing that arrives without argument. She is not secretive; she is simply prior to speech.",
  poles: {
    fullness: {
      title: "The Inner Ear",
      description:
        "Patient attention to what is not yet thought. The High Priestess in fullness holds space for emergence, trusts intuition as data, and refuses to force premature clarity.",
    },
    activeShadow: {
      title: "The Gnostic Aristocrat",
      description:
        "Intuition weaponized as superiority. Private knowing becomes a claim of privilege; half-formed hunches are delivered as oracle. What began as listening hardens into a defended mystique.",
    },
    passiveShadow: {
      title: "The Hyper-Rational",
      description:
        "The veil sealed shut. Everything below the waterline is dismissed as noise. Without access to the unconscious the ego grows brittle and over-literal, startled by every dream and feeling.",
    },
  },
  accentColor: "#6B4E8C",
};

// ─── III · THE EMPRESS ──────────────────────────────────────
export const theEmpress: TarotArchetype = {
  slug: "the-empress",
  id: 3,
  numeral: "III",
  name: "The Empress",
  phase: "ego-formation",
  symbol: "♀",
  motto: "Life makes itself through me when I let it.",
  coreTheme: "Generative embodiment — the archetypal mother of forms.",
  description:
    "The Empress is the principle of fecund creation: the garden, the body, the felt sense of abundance. She is the archetypal mother not only of children but of works, relationships, and the lived pleasures that keep a psyche in contact with the earth. To meet her is to remember that creation is erotic before it is productive.",
  poles: {
    fullness: {
      title: "The Fertile Ground",
      description:
        "Embodied, sensuous creativity. The Empress in fullness nourishes what is alive, honors the body, and lets form arise without forcing — a maker rooted in the pleasure of making.",
    },
    activeShadow: {
      title: "The Smothering Mother",
      description:
        "Care as possession. Nurture becomes a mechanism of control, indulgence replaces discernment, and the Empress cannot let what she has birthed separate from her. Abundance curdles into surfeit.",
    },
    passiveShadow: {
      title: "The Barren Ascetic",
      description:
        "Refusal of the body. The senses are policed, desire is shamed, and creation is postponed forever in favor of a sterile purity. The garden goes to dust while the mind busies itself elsewhere.",
    },
  },
  jungianCorrelation: "The Creator",
  jungianSlug: "creator",
  accentColor: "#D4828F",
};

// ─── IV · THE EMPEROR ───────────────────────────────────────
export const theEmperor: TarotArchetype = {
  slug: "the-emperor",
  id: 4,
  numeral: "IV",
  name: "The Emperor",
  phase: "ego-formation",
  symbol: "♁",
  motto: "Order is the first kindness.",
  coreTheme: "Structure and boundary — the archetypal father of forms.",
  description:
    "The Emperor establishes the frame inside which life can proceed. He is law, structure, the reliable protection that allows softer things to grow. The psyche needs him as a backbone; without him, interior life floods its banks and nothing lasts long enough to mean anything.",
  poles: {
    fullness: {
      title: "The Benevolent Sovereign",
      description:
        "Authority that serves life. The Emperor in fullness sets durable, humane boundaries, bears the weight of decision, and builds structures others can trust and grow within.",
    },
    activeShadow: {
      title: "The Tyrant",
      description:
        "Control as identity. Order becomes rigidity, dissent becomes treason, and the frame hardens into a cage. The Tyrant would rather be feared than watch the kingdom change without his permission.",
    },
    passiveShadow: {
      title: "The Abdicator",
      description:
        "Authority refused. Decisions drift, boundaries dissolve, and others are left to carry the weight of a frame that never gets set. What looks like humility is often an unwillingness to be responsible.",
    },
  },
  jungianCorrelation: "The Ruler",
  jungianSlug: "ruler",
  accentColor: "#D4AF37",
};

// ─── V · THE HIEROPHANT ─────────────────────────────────────
export const theHierophant: TarotArchetype = {
  slug: "the-hierophant",
  id: 5,
  numeral: "V",
  name: "The Hierophant",
  phase: "ego-formation",
  symbol: "☩",
  motto: "What was learned before me is still half of what I know.",
  coreTheme: "Transmission — the link between the individual and tradition.",
  description:
    "The Hierophant is the inherited structure of meaning: scripture, lineage, discipline, the slow teachings that precede any one life. He is the psyche's need to be initiated, to place itself inside a story larger than its own invention. Properly held, he is the bridge between private experience and collective wisdom.",
  poles: {
    fullness: {
      title: "The True Teacher",
      description:
        "Wisdom transmitted with humility. The Hierophant in fullness carries lineage without collapsing into it, initiates others into living tradition, and knows the difference between form and its source.",
    },
    activeShadow: {
      title: "The Dogmatist",
      description:
        "Tradition as control. The letter is defended against the spirit, obedience is demanded in place of understanding, and the teacher becomes a gatekeeper who has confused the map for the territory.",
    },
    passiveShadow: {
      title: "The Unmoored Iconoclast",
      description:
        "Tradition refused entirely. Every inheritance is suspect; every teacher is a threat to autonomy. The result is not freedom but rootlessness — a self endlessly reinventing itself from zero.",
    },
  },
  jungianCorrelation: "The Sage",
  jungianSlug: "sage",
  accentColor: "#A68B2A",
};

// ─── VI · THE LOVERS ────────────────────────────────────────
export const theLovers: TarotArchetype = {
  slug: "the-lovers",
  id: 6,
  numeral: "VI",
  name: "The Lovers",
  phase: "ego-formation",
  symbol: "⚭",
  motto: "I become more myself in the presence of the other.",
  coreTheme: "Conscious union — the integration of opposites inside and between.",
  description:
    "The Lovers stage the meeting of psychic opposites — anima and animus, self and other — and the first mature choice of value. This is not infatuation but alignment: the moment one begins to choose what one loves and to let that choice shape a life. Every later union in the deck has its root here.",
  poles: {
    fullness: {
      title: "The Aligned Union",
      description:
        "Two sovereign selves that become more distinct in meeting, not less. The Lovers in fullness hold intimacy and individuation as the same gesture — love as a clarifying fire.",
    },
    activeShadow: {
      title: "The Fused Pair",
      description:
        "Union as dissolution. Identity is outsourced to the beloved; boundaries collapse; the relationship becomes a hall of mirrors in which neither person can see themselves clearly.",
    },
    passiveShadow: {
      title: "The Walled Self",
      description:
        "Intimacy refused. Closeness is experienced as threat; the self is defended so thoroughly that nothing can reach it. What looks like independence is often unhealed fear of being known.",
    },
  },
  jungianCorrelation: "The Lover",
  jungianSlug: "lover",
  accentColor: "#E8A0AB",
};

// ─── VII · THE CHARIOT ──────────────────────────────────────
export const theChariot: TarotArchetype = {
  slug: "the-chariot",
  id: 7,
  numeral: "VII",
  name: "The Chariot",
  phase: "ego-formation",
  symbol: "➤",
  motto: "I hold the reins of forces that do not agree.",
  coreTheme: "Directed momentum — the victorious ego holding opposing energies in harness.",
  description:
    "The Chariot closes the first phase with a demonstration of will: the ego has internalized its parents and its teachers, and can now yoke contradictory drives to a chosen direction. It is the archetype of triumphant forward motion — necessary, dangerous, and not yet wise.",
  poles: {
    fullness: {
      title: "The Disciplined Will",
      description:
        "Momentum governed by purpose. The Chariot in fullness drives through obstacles without losing the reins, integrating competing instincts into a single, committed trajectory.",
    },
    activeShadow: {
      title: "The Conquistador",
      description:
        "Victory as addiction. The Chariot here runs over everything in its path, confuses momentum with meaning, and mistakes winning for arriving. The charioteer has become the vehicle's servant.",
    },
    passiveShadow: {
      title: "The Torn Apart",
      description:
        "Reins dropped. Competing drives pull the self in opposing directions until nothing moves at all. Without a chosen vector, the psyche is dismembered by its own energies.",
    },
  },
  jungianCorrelation: "The Hero",
  jungianSlug: "hero",
  accentColor: "#C0392B",
};

// ─── VIII · STRENGTH ────────────────────────────────────────
export const strength: TarotArchetype = {
  slug: "strength",
  id: 8,
  numeral: "VIII",
  name: "Strength",
  phase: "psyche-alchemy",
  symbol: "⚕",
  motto: "I do not conquer the beast; I befriend it.",
  coreTheme: "Soft power — the taming of instinct through relationship rather than force.",
  description:
    "Strength is the psyche's discovery that instinct cannot be defeated, only befriended. She rests her hand on the lion's jaw without fear and without coercion. This is the archetype of courageous tenderness, the capacity to remain present to one's own animal without denying or being overrun by it.",
  poles: {
    fullness: {
      title: "The Compassionate Taming",
      description:
        "Instinct integrated through patient relationship. Strength in fullness meets appetite, rage, and fear with steadiness, neither suppressing them nor being driven by them.",
    },
    activeShadow: {
      title: "The Iron Suppressor",
      description:
        "Instinct beaten into submission. Feeling is clamped down by force of will, the body is held in a permanent brace, and what cannot be felt returns as symptom — rigidity, breakage, sudden rupture.",
    },
    passiveShadow: {
      title: "The Overtaken",
      description:
        "The lion on top. Instinct runs the life; rage, hunger, or craving makes every consequential decision while the conscious self watches from a back seat, alibiing what the beast has already done.",
    },
  },
  jungianCorrelation: "The Hero",
  jungianSlug: "hero",
  accentColor: "#1B9E6B",
};

// ─── IX · THE HERMIT ────────────────────────────────────────
export const theHermit: TarotArchetype = {
  slug: "the-hermit",
  id: 9,
  numeral: "IX",
  name: "The Hermit",
  phase: "psyche-alchemy",
  symbol: "✧",
  motto: "I lit the lantern so I could see my own footsteps.",
  coreTheme: "Meaningful solitude — the inward turn and the lamp carried down.",
  description:
    "The Hermit steps out of the crowd to find a light he can actually trust. His solitude is not withdrawal but apprenticeship — the slow work of separating inherited voices from genuine inner knowing. Eventually he must come back, but not before he is his own authority.",
  poles: {
    fullness: {
      title: "The Lamp-Bearer",
      description:
        "Solitude that returns with light. The Hermit in fullness uses withdrawal to clarify discernment, honors slow knowing, and eventually shares what he has found with those still in the valley.",
    },
    activeShadow: {
      title: "The Misanthrope",
      description:
        "Solitude as weapon. Isolation is wielded against others — as superiority, as punishment, as proof of having been misunderstood. Knowledge is hoarded; the lamp is kept in the cave.",
    },
    passiveShadow: {
      title: "The Unable to Be Alone",
      description:
        "The inward turn refused. Solitude is experienced as annihilation; noise, company, and consumption are used to avoid ever hearing the voice beneath them. The lamp is never lit.",
    },
  },
  jungianCorrelation: "The Sage",
  jungianSlug: "sage",
  accentColor: "#6B4E8C",
};

// ─── X · WHEEL OF FORTUNE ───────────────────────────────────
export const wheelOfFortune: TarotArchetype = {
  slug: "wheel-of-fortune",
  id: 10,
  numeral: "X",
  name: "Wheel of Fortune",
  phase: "psyche-alchemy",
  symbol: "◎",
  motto: "I do not turn the wheel; I learn its seasons.",
  coreTheme: "Cyclical fate — the non-linearity beneath any striving.",
  description:
    "The Wheel introduces time as a law the ego cannot negotiate. Seasons rise and fall; the same life visits comfort and crisis without consulting anyone's plan. To meet the Wheel is to feel the scale of pattern larger than personal effort, and to find inside it a strange steadiness.",
  poles: {
    fullness: {
      title: "The Rhythmic Mind",
      description:
        "Fluent with cycle. The Wheel in fullness accepts the turn without fatalism, acts inside the season rather than against it, and treats both ascent and descent as temporary weather.",
    },
    activeShadow: {
      title: "The Gambler",
      description:
        "Cycle mistaken for casino. Fate is invoked to justify recklessness — big swings, abdicated responsibility, the thrill of letting 'destiny' decide what the self refuses to.",
    },
    passiveShadow: {
      title: "The Clinger",
      description:
        "Turn refused. The self grips the last good moment and will not let it go, reading every change as catastrophe. Life moves on while the psyche stays behind with the wreckage of a favored season.",
    },
  },
  accentColor: "#F0D060",
};

// ─── XI · JUSTICE ───────────────────────────────────────────
export const justice: TarotArchetype = {
  slug: "justice",
  id: 11,
  numeral: "XI",
  name: "Justice",
  phase: "psyche-alchemy",
  symbol: "⚖",
  motto: "The scale is in me before it is between us.",
  coreTheme: "Honest accounting — the psyche's capacity to see itself truthfully.",
  description:
    "Justice weighs. She does not punish and she does not forgive; she tells the truth about what has been done and what follows from it. Psychologically she is the capacity for honest self-assessment — the moment the ego becomes responsible for its own pattern.",
  poles: {
    fullness: {
      title: "The Clear Scale",
      description:
        "Discernment without cruelty. Justice in fullness owns her part, names cause and consequence accurately, and holds others accountable without needing to destroy them.",
    },
    activeShadow: {
      title: "The Judge-Executioner",
      description:
        "Truth as weapon. Accounting becomes punishment, every verdict is death, and the scale is used to settle scores rather than restore relation. Righteousness replaces responsibility.",
    },
    passiveShadow: {
      title: "The Perpetual Victim",
      description:
        "The scale refused. Consequences are other people's fault; patterns are bad luck; the self is always the one something has happened to. Without accounting there is no real learning.",
    },
  },
  jungianCorrelation: "The Ruler",
  jungianSlug: "ruler",
  accentColor: "#8C3A5E",
};

// ─── XII · THE HANGED MAN ───────────────────────────────────
export const theHangedMan: TarotArchetype = {
  slug: "the-hanged-man",
  id: 12,
  numeral: "XII",
  name: "The Hanged Man",
  phase: "psyche-alchemy",
  symbol: "⊥",
  motto: "I stopped kicking and the world began to speak.",
  coreTheme: "Willing suspension — the reversal of perspective that follows surrender.",
  description:
    "The Hanged Man hangs upside-down by his own consent. The old leverage is gone; the old plan is not going to work. In the stillness a different view becomes available — not because he achieved it, but because he let go of what was blocking it.",
  poles: {
    fullness: {
      title: "The Willing Surrender",
      description:
        "Chosen suspension. The Hanged Man in fullness lets go of striving at the exact point where striving has become the problem, and trusts the reversal of view that follows.",
    },
    activeShadow: {
      title: "The Holy Martyr",
      description:
        "Sacrifice as performance. Suffering is flaunted, suspension is used to guilt others, and the crucifixion becomes a stage. Surrender is counterfeited because its profits are social.",
    },
    passiveShadow: {
      title: "The Kicking Prisoner",
      description:
        "Surrender refused. The self thrashes against a bind it cannot break, exhausting itself in a fight it has already lost. Because it will not hang still, it never receives the inverted view.",
    },
  },
  accentColor: "#6B4E8C",
};

// ─── XIII · DEATH ───────────────────────────────────────────
export const death: TarotArchetype = {
  slug: "death",
  id: 13,
  numeral: "XIII",
  name: "Death",
  phase: "psyche-alchemy",
  symbol: "☠",
  motto: "Something in me finished so that something in me could begin.",
  coreTheme: "Necessary ending — the psyche's capacity to let an old self die.",
  description:
    "Death is not mortality; it is transformation. An identity, a relationship, a phase has exhausted its life and is already over — Death only tells the truth about it. Refusing him is how the psyche rots in place; meeting him is how it keeps moving.",
  poles: {
    fullness: {
      title: "The Clean Letting Go",
      description:
        "Endings honored in time. Death in fullness recognizes what is already over, grieves it, and clears the ground for what wants to come. Loss is metabolized rather than postponed.",
    },
    activeShadow: {
      title: "The Premature Destroyer",
      description:
        "Endings conjured. The self kills what is still alive — relationships, projects, commitments — because endings feel more controllable than uncertainty. Scorched earth as identity.",
    },
    passiveShadow: {
      title: "The Embalmer",
      description:
        "Endings denied. The corpse is kept in the house; the dead relationship is maintained in photograph; the outgrown self is worn long past fit. Decay replaces transformation.",
    },
  },
  jungianCorrelation: "The Rebel",
  jungianSlug: "rebel",
  accentColor: "#6B4E8C",
};

// ─── XIV · TEMPERANCE ───────────────────────────────────────
export const temperance: TarotArchetype = {
  slug: "temperance",
  id: 14,
  numeral: "XIV",
  name: "Temperance",
  phase: "psyche-alchemy",
  symbol: "⚗",
  motto: "The third thing cannot be forced; only slowly poured.",
  coreTheme: "Alchemical blending — patient integration of opposites.",
  description:
    "Temperance pours one vessel slowly into another. After Death's clearing, she is the patient work of combination — holding fire and water together long enough for a new substance to form. She is the psyche's capacity for nuance, moderation, and the long view.",
  poles: {
    fullness: {
      title: "The Steady Alchemist",
      description:
        "Opposites blended without haste. Temperance in fullness refuses the false choice, holds tension between poles, and lets the third thing — the actual integration — emerge on its own timing.",
    },
    activeShadow: {
      title: "The Sterile Moderator",
      description:
        "Moderation as anesthetic. Every strong feeling is diluted, every passion is tempered into neutrality, and balance becomes a way to never commit to anything vivid enough to matter.",
    },
    passiveShadow: {
      title: "The Volatile",
      description:
        "No blending at all. The self swings between poles without ever integrating them — elation then despair, fusion then cutoff, craving then aversion — exhausting itself on the vertical.",
    },
  },
  jungianCorrelation: "The Caregiver",
  jungianSlug: "caregiver",
  accentColor: "#2ECC71",
};

// ─── XV · THE DEVIL ─────────────────────────────────────────
export const theDevil: TarotArchetype = {
  slug: "the-devil",
  id: 15,
  numeral: "XV",
  name: "The Devil",
  phase: "unconscious-realization",
  symbol: "⛧",
  motto: "The chain is loose — I have only forgotten to look at my hand.",
  coreTheme: "The bound shadow — appetite, addiction, and the face one hides from.",
  description:
    "The Devil is the material and instinctual shadow: the parts of the self that have been disowned and therefore rule. He is addiction, compulsion, the secret pact with a harm one has decided is identity. To meet him is not to defeat him but to see the chains clearly enough to notice they are not locked.",
  poles: {
    fullness: {
      title: "The Shadow Acknowledged",
      description:
        "Appetite and instinct owned. The Devil in fullness is the honest confrontation with one's own darkness — greed, lust, cruelty, compulsion — without theatrical horror or flight. What is seen can be negotiated with.",
    },
    activeShadow: {
      title: "The Enchained",
      description:
        "Appetite as identity. The self collapses into its compulsion — substance, status, control, a destructive relationship — and calls the collapse 'who I am.' The chain is sanctified so it cannot be removed.",
    },
    passiveShadow: {
      title: "The Puritan",
      description:
        "Appetite disowned. Instinct is so thoroughly repressed that it leaks out as judgment, projection, and moral panic about other people's lives. What cannot be met in the self is hunted in the other.",
    },
  },
  accentColor: "#E74C3C",
};

// ─── XVI · THE TOWER ────────────────────────────────────────
export const theTower: TarotArchetype = {
  slug: "the-tower",
  id: 16,
  numeral: "XVI",
  name: "The Tower",
  phase: "unconscious-realization",
  symbol: "▼",
  motto: "The structure that could not hold truth has been freed of the burden of holding it.",
  coreTheme: "Liberating collapse — the sudden destruction of an untenable ego-structure.",
  description:
    "The Tower is the moment a life built on a lie comes down. The collapse is not punishment; it is the return of reality. Something that was going to fall has finally fallen, and the shock clears the way for a ground-level rebuild. It is terrible and it is mercy.",
  poles: {
    fullness: {
      title: "The Necessary Shock",
      description:
        "Collapse received as revelation. The Tower in fullness accepts that a structure was false, lets it go, and treats the aftermath as open ground rather than catastrophe.",
    },
    activeShadow: {
      title: "The Self-Demolisher",
      description:
        "Collapse manufactured. The self detonates its own life — relationships, jobs, health — as a way to control the timing of a pain it cannot otherwise face. Destruction replaces change.",
    },
    passiveShadow: {
      title: "The Denier in the Ruins",
      description:
        "Collapse refused. The tower is already down; the self is arranging its furniture on the rubble. Reality is held off by increasingly baroque stories until exhaustion finally intervenes.",
    },
  },
  jungianCorrelation: "The Rebel",
  jungianSlug: "rebel",
  accentColor: "#C0392B",
};

// ─── XVII · THE STAR ────────────────────────────────────────
export const theStar: TarotArchetype = {
  slug: "the-star",
  id: 17,
  numeral: "XVII",
  name: "The Star",
  phase: "unconscious-realization",
  symbol: "✦",
  motto: "After the tower fell I could see the sky again.",
  coreTheme: "Quiet renewal — hope that returns only after collapse.",
  description:
    "The Star is the cool night after the fire. Something has burned; the ego has been humbled; and above the ruin is an unbothered sky. She is the archetype of restored faith — not the naive kind, but the kind that is only available to someone who has lost it.",
  poles: {
    fullness: {
      title: "The Returned Faith",
      description:
        "Hope chastened and steady. The Star in fullness pours water onto the wounded ground, trusts the slow return of life, and does not demand of the universe that nothing more ever break.",
    },
    activeShadow: {
      title: "The Spiritual Bypasser",
      description:
        "Hope as escape. The disaster is sublimated into wisdom prematurely; real grief is dressed in inspirational language; the self levitates above a life that still needs to be lived.",
    },
    passiveShadow: {
      title: "The Permanently Dark",
      description:
        "Hope foreclosed. Cynicism hardens into identity; every glimmer is suspected of being a trick; the night sky is declared empty so that looking up will not cost anything more.",
    },
  },
  jungianCorrelation: "The Explorer",
  jungianSlug: "explorer",
  accentColor: "#E8A0AB",
};

// ─── XVIII · THE MOON ───────────────────────────────────────
export const theMoon: TarotArchetype = {
  slug: "the-moon",
  id: 18,
  numeral: "XVIII",
  name: "The Moon",
  phase: "unconscious-realization",
  symbol: "☽",
  motto: "I walked through the country where nothing is yet what it will be called.",
  coreTheme: "The dreaming unconscious — passage through distortion toward deeper truth.",
  description:
    "The Moon is the landscape of dream, symbol, and primal image — the territory the psyche must cross without the daytime map. Everything here is half-lit; nothing arrives in its final form. To travel it is to trust that confusion is sometimes the most accurate state.",
  poles: {
    fullness: {
      title: "The Dream-Walker",
      description:
        "Symbol and feeling honored as data. The Moon in fullness moves through the unconscious without insisting on premature clarity, trusts images, and lets meaning arrive obliquely.",
    },
    activeShadow: {
      title: "The Paranoid",
      description:
        "Distortion mistaken for truth. Shadows are read as plots, dreams as prophecies, every ambiguous signal as evidence of threat. The unconscious floods the conscious and runs it.",
    },
    passiveShadow: {
      title: "The Disenchanter",
      description:
        "The dream denied. Only what can be measured is real; intuition is dismissed; the psyche's own images are treated as noise. The nightworld is sealed off and begins to rot.",
    },
  },
  accentColor: "#6B4E8C",
};

// ─── XIX · THE SUN ──────────────────────────────────────────
export const theSun: TarotArchetype = {
  slug: "the-sun",
  id: 19,
  numeral: "XIX",
  name: "The Sun",
  phase: "unconscious-realization",
  symbol: "☀",
  motto: "I am warmed by what I no longer need to hide.",
  coreTheme: "Integrated radiance — the clarity available after shadow work.",
  description:
    "The Sun is the clarity that follows the Moon's night crossing. Something formerly hidden has been lived with long enough to be metabolized, and the self becomes warm, direct, and simple — not because it is naive, but because it no longer has to split itself in half to function.",
  poles: {
    fullness: {
      title: "The Warm Clarity",
      description:
        "Unhidden selfhood. The Sun in fullness is generous without performance, joyful without denial, and present to others without needing to dim itself to keep them comfortable.",
    },
    activeShadow: {
      title: "The Blinding Ego",
      description:
        "Radiance weaponized. The self becomes the center of every room, warmth turns to glare, and the Sun's gift is used to outshine rather than illuminate. Toxic positivity replaces presence.",
    },
    passiveShadow: {
      title: "The Hidden Light",
      description:
        "Radiance refused. The self dims itself reflexively to avoid envy, conflict, or attention. What could have warmed others is withheld under a story of humility that is closer to fear.",
    },
  },
  jungianCorrelation: "The Innocent",
  jungianSlug: "innocent",
  accentColor: "#F0D060",
};

// ─── XX · JUDGEMENT ─────────────────────────────────────────
export const judgement: TarotArchetype = {
  slug: "judgement",
  id: 20,
  numeral: "XX",
  name: "Judgement",
  phase: "unconscious-realization",
  symbol: "✧",
  motto: "I heard a voice that had been mine all along.",
  coreTheme: "The inner calling — vocation, reckoning, and rebirth.",
  description:
    "Judgement is the summons: a voice from beneath the life one has been living, calling it to account and calling it forward. It is neither punishment nor reward, but the moment the self is ready to answer for itself and become something truer.",
  poles: {
    fullness: {
      title: "The Answered Call",
      description:
        "The summons met. Judgement in fullness reckons honestly with the past, forgives what can be forgiven, and rises into the more accurate life the voice has been describing all along.",
    },
    activeShadow: {
      title: "The Fanatic",
      description:
        "The call distorted. The voice is used to condemn others; private reckoning becomes public crusade; the newly-risen self immediately begins judging everyone still in the grave.",
    },
    passiveShadow: {
      title: "The Unmoved",
      description:
        "The call unheard. The voice is mistaken for noise, or heard and refused; the self declines to change and builds a quiet life around the decision not to become. Guilt replaces vocation.",
    },
  },
  jungianCorrelation: "The Rebel",
  jungianSlug: "rebel",
  accentColor: "#D4AF37",
};

// ─── XXI · THE WORLD ────────────────────────────────────────
export const theWorld: TarotArchetype = {
  slug: "the-world",
  id: 21,
  numeral: "XXI",
  name: "The World",
  phase: "unconscious-realization",
  symbol: "✺",
  motto: "The turn is complete; the next turn is already beginning.",
  coreTheme: "Integration and wholeness — the completion that opens onto the Fool.",
  description:
    "The World is the closing of a cycle of individuation: opposites reconciled, journey metabolized, self at rest in its own completeness. It is not an endpoint. The wholeness immediately becomes the new ground on which the next Fool steps off — the wheel turns on.",
  poles: {
    fullness: {
      title: "The Integrated Self",
      description:
        "Wholeness without rigidity. The World in fullness lives as a completed phase that already knows it is temporary — ready to begin again, carrying what was learned without clinging to it.",
    },
    activeShadow: {
      title: "The Megalomaniac",
      description:
        "Completion mistaken for arrival. The self declares itself finished, canonizes its current form, and refuses further growth. 'Wholeness' calcifies into self-worship.",
    },
    passiveShadow: {
      title: "The Unfinished",
      description:
        "Completion refused. The last step is not taken; the cycle is abandoned within sight of its close; the self returns to an earlier, familiar incompleteness rather than meet its own wholeness.",
    },
  },
  jungianCorrelation: "The Ruler",
  jungianSlug: "ruler",
  accentColor: "#D4AF37",
};

export const ALL_TAROT: TarotArchetype[] = [
  theFool,
  theMagician,
  theHighPriestess,
  theEmpress,
  theEmperor,
  theHierophant,
  theLovers,
  theChariot,
  strength,
  theHermit,
  wheelOfFortune,
  justice,
  theHangedMan,
  death,
  temperance,
  theDevil,
  theTower,
  theStar,
  theMoon,
  theSun,
  judgement,
  theWorld,
];

export function getTarotBySlug(slug: string): TarotArchetype | undefined {
  return ALL_TAROT.find((a) => a.slug === slug);
}

export function getTarotById(id: number): TarotArchetype | undefined {
  return ALL_TAROT.find((a) => a.id === id);
}

export function getTarotByPhase(phase: TarotPhase): TarotArchetype[] {
  return ALL_TAROT.filter((a) => a.phase === phase);
}
