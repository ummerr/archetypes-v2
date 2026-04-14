export type SystemId =
  | "kwml"
  | "jungian"
  | "enneagram"
  | "mbti"
  | "heros-journey"
  | "tarot";

export interface ResonanceEntry {
  system: SystemId;
  slug: string;
  note: string;
  strength: "primary" | "secondary";
}

export interface ThematicCluster {
  id: string;
  theme: string;
  description: string;
  archetypes: ResonanceEntry[];
}

export const CLUSTERS: ThematicCluster[] = [
  {
    id: "sovereign",
    theme: "The Sovereign - Order, Authority, Centering",
    description:
      "The centering energy that orders the field, blesses, and holds the boundary. Not domination but the still point that makes a kingdom possible.",
    archetypes: [
      { system: "kwml", slug: "the-king", note: "Fullness - the blessing centered self", strength: "primary" },
      { system: "jungian", slug: "ruler", note: "Self cluster - claim dominion, take responsibility", strength: "primary" },
      { system: "tarot", slug: "the-emperor", note: "IV - structure, law, the enthroned boundary", strength: "primary" },
      { system: "enneagram", slug: "challenger", note: "Type 8 - assertive authority, protector of the tribe", strength: "secondary" },
      { system: "enneagram", slug: "reformer", note: "Type 1 - principled order, the righteous sovereign", strength: "secondary" },
      { system: "mbti", slug: "entj", note: "Te-dom commander - systems-level authority", strength: "secondary" },
      { system: "mbti", slug: "estj", note: "Te-dom executive - enforces the working order", strength: "secondary" },
    ],
  },
  {
    id: "warrior",
    theme: "The Warrior - Purposeful Action, Discipline, Courage",
    description:
      "Directed force in service of a cause larger than the self. The disciplined edge that cuts what must be cut and protects what must be protected.",
    archetypes: [
      { system: "kwml", slug: "the-warrior", note: "Fullness - disciplined, transpersonally-committed action", strength: "primary" },
      { system: "jungian", slug: "hero", note: "Ego cluster - proves worth through courage on the field", strength: "primary" },
      { system: "heros-journey", slug: "hero", note: "The central protagonist who crosses the threshold", strength: "primary" },
      { system: "tarot", slug: "the-chariot", note: "VII - directed momentum, will harnessing opposing forces", strength: "primary" },
      { system: "enneagram", slug: "achiever", note: "Type 3 - drives toward mastery and visible result", strength: "secondary" },
      { system: "enneagram", slug: "challenger", note: "Type 8 - confronts directly, breaks down resistance", strength: "secondary" },
      { system: "mbti", slug: "estp", note: "Se-dom operator - decisive action under fire", strength: "secondary" },
      { system: "mbti", slug: "entj", note: "Te/Ni - strategic campaigner", strength: "secondary" },
    ],
  },
  {
    id: "magician",
    theme: "The Magician - Transformation, Initiation, Knowledge",
    description:
      "Knower of hidden pattern. The one who initiates, contains the energies of change, and translates between the seen and the unseen.",
    archetypes: [
      { system: "kwml", slug: "the-magician", note: "Fullness - the transformative ritual elder", strength: "primary" },
      { system: "jungian", slug: "magician", note: "Self cluster - make dreams real through inner power", strength: "primary" },
      { system: "heros-journey", slug: "mentor", note: "Bestower of wisdom and the talisman of initiation", strength: "primary" },
      { system: "tarot", slug: "the-magician", note: "I - directed will, the four tools in hand", strength: "primary" },
      { system: "enneagram", slug: "investigator", note: "Type 5 - mastery through knowing, the hidden observer", strength: "primary" },
      { system: "tarot", slug: "the-hermit", note: "IX - inner lamp, the wisdom gained in solitude", strength: "secondary" },
      { system: "mbti", slug: "intj", note: "Ni-dom - long-sight pattern-holder", strength: "secondary" },
      { system: "mbti", slug: "intp", note: "Ti-dom - theorist who sees the underlying structure", strength: "secondary" },
    ],
  },
  {
    id: "lover",
    theme: "The Lover - Connection, Passion, Embodied Feeling",
    description:
      "The energy of communion - sensual, empathic, feelingful. The force that dissolves isolation and binds self to world through beauty and desire.",
    archetypes: [
      { system: "kwml", slug: "the-lover", note: "Fullness - embodied empathy, the saint of sensuality", strength: "primary" },
      { system: "jungian", slug: "lover", note: "Soul cluster - intimacy, devotion, aesthetic bliss", strength: "primary" },
      { system: "tarot", slug: "the-lovers", note: "VI - conscious union, the choice to join", strength: "primary" },
      { system: "enneagram", slug: "individualist", note: "Type 4 - depth of feeling, romantic identity", strength: "primary" },
      { system: "enneagram", slug: "helper", note: "Type 2 - relational warmth, gives to be loved", strength: "secondary" },
      { system: "tarot", slug: "the-empress", note: "III - generative embodiment, fertile abundance", strength: "secondary" },
      { system: "mbti", slug: "enfp", note: "Fi/Ne - enthusiastic romantic, relational explorer", strength: "secondary" },
      { system: "mbti", slug: "esfp", note: "Se/Fi - sensual present-moment connector", strength: "secondary" },
      { system: "mbti", slug: "isfp", note: "Fi-dom - the poet of felt experience", strength: "secondary" },
    ],
  },
  {
    id: "innocent",
    theme: "The Innocent - Purity, Trust, the Open Beginning",
    description:
      "The pre-fall self. Wonder, trust, unconditioned wholeness - the energy that believes and begins.",
    archetypes: [
      { system: "kwml", slug: "the-divine-child", note: "Boy in fullness (King family) - radiant wholeness before corruption", strength: "primary" },
      { system: "jungian", slug: "innocent", note: "Ego cluster - faith, simplicity, the trusting beginner", strength: "primary" },
      { system: "tarot", slug: "the-fool", note: "0 - unconditioned potential stepping off the cliff", strength: "primary" },
      { system: "enneagram", slug: "peacemaker", note: "Type 9 - merging harmony, the unfallen garden", strength: "secondary" },
      { system: "mbti", slug: "infp", note: "Fi-dom idealist - keeper of untouched values", strength: "secondary" },
      { system: "mbti", slug: "isfp", note: "Fi/Se - quiet purity, guileless feeling", strength: "secondary" },
    ],
  },
  {
    id: "explorer",
    theme: "The Explorer - Freedom, Autonomy, Self-Discovery",
    description:
      "The restless drive toward horizon. Refuses the small room, tests the world, and builds selfhood through venturing.",
    archetypes: [
      { system: "jungian", slug: "explorer", note: "Soul cluster - find the way, refuse captivity", strength: "primary" },
      { system: "enneagram", slug: "enthusiast", note: "Type 7 - freedom from limitation, the many-doored life", strength: "primary" },
      { system: "enneagram", slug: "investigator", note: "Type 5 - intellectual exploration, the mapping mind", strength: "secondary" },
      { system: "heros-journey", slug: "hero", note: "The call answered - leaving the ordinary world", strength: "secondary" },
      { system: "tarot", slug: "the-fool", note: "0 - the leap into the unknown", strength: "secondary" },
      { system: "mbti", slug: "entp", note: "Ne-dom - chases every unopened door", strength: "secondary" },
      { system: "mbti", slug: "enfp", note: "Ne/Fi - possibility-seeker with heart", strength: "secondary" },
      { system: "mbti", slug: "intp", note: "Ne/Ti - speculative cartographer of ideas", strength: "secondary" },
    ],
  },
  {
    id: "rebel",
    theme: "The Rebel - Disruption, Revolution, Outrageous Honesty",
    description:
      "The one who breaks the corrupted pattern. Refuses false order, speaks the unspeakable, and clears ground for what must come next.",
    archetypes: [
      { system: "jungian", slug: "rebel", note: "Soul cluster (Outlaw/Destroyer) - overturn what doesn't work", strength: "primary" },
      { system: "enneagram", slug: "challenger", note: "Type 8 - confronts authority, refuses to be controlled", strength: "primary" },
      { system: "tarot", slug: "the-tower", note: "XVI - liberating collapse of the false structure", strength: "primary" },
      { system: "heros-journey", slug: "trickster", note: "Disrupts the old order through chaos", strength: "secondary" },
      { system: "tarot", slug: "the-devil", note: "XV - the chains that must be seen to be broken", strength: "secondary" },
      { system: "mbti", slug: "entp", note: "Ne/Ti - the provocateur who shows the dogma's cracks", strength: "secondary" },
      { system: "mbti", slug: "estp", note: "Se/Ti - the rule-breaker who thrives at the edge", strength: "secondary" },
    ],
  },
  {
    id: "caregiver",
    theme: "The Caregiver - Nurturance, Protection, Generosity",
    description:
      "The one who holds, feeds, protects. The maternal/paternal ground under the community - service as love made visible.",
    archetypes: [
      { system: "jungian", slug: "caregiver", note: "Ego cluster - care for others, nurture against harm", strength: "primary" },
      { system: "enneagram", slug: "helper", note: "Type 2 - gives to be loved, the relational nurturer", strength: "primary" },
      { system: "tarot", slug: "the-empress", note: "III - the nurturing mother, abundant generativity", strength: "secondary" },
      { system: "heros-journey", slug: "ally", note: "Loyal support, the faithful companion on the path", strength: "secondary" },
      { system: "mbti", slug: "esfj", note: "Fe-dom provider - tends the social fabric", strength: "secondary" },
      { system: "mbti", slug: "isfj", note: "Si/Fe guardian - the quiet, enduring protector", strength: "secondary" },
      { system: "mbti", slug: "enfj", note: "Fe/Ni - harmonizer who tends each soul in the room", strength: "secondary" },
    ],
  },
  {
    id: "sage",
    theme: "The Sage - Truth, Wisdom, Objectivity",
    description:
      "The one who seeks truth for its own sake and sees clearly through illusion. Knowledge as a form of freedom.",
    archetypes: [
      { system: "jungian", slug: "sage", note: "Self cluster - truth will set you free", strength: "primary" },
      { system: "enneagram", slug: "investigator", note: "Type 5 - detached clarity, the observer of patterns", strength: "primary" },
      { system: "heros-journey", slug: "mentor", note: "Bestower of wisdom, keeper of the older knowledge", strength: "primary" },
      { system: "tarot", slug: "the-high-priestess", note: "II - inner knowing, the intuitive gnosis", strength: "primary" },
      { system: "kwml", slug: "the-magician", note: "Awareness aspect - ritual elder as seer", strength: "secondary" },
      { system: "enneagram", slug: "reformer", note: "Type 1 - principled truth, the moral seeing", strength: "secondary" },
      { system: "tarot", slug: "the-hermit", note: "IX - solitude as the ground of real knowing", strength: "secondary" },
      { system: "mbti", slug: "intp", note: "Ti-dom - disinterested seeker of consistent truth", strength: "secondary" },
      { system: "mbti", slug: "intj", note: "Ni/Te - strategic sage, the architect of foresight", strength: "secondary" },
      { system: "mbti", slug: "infj", note: "Ni/Fe - the compassionate seer", strength: "secondary" },
    ],
  },
  {
    id: "jester",
    theme: "The Jester - Play, Lightness, Sacred Irreverence",
    description:
      "The holy fool. Punctures pretension with humor, reveals truth sideways, and teaches that joy is also serious.",
    archetypes: [
      { system: "jungian", slug: "jester", note: "Self cluster - if I can't dance, it's not my revolution", strength: "primary" },
      { system: "enneagram", slug: "enthusiast", note: "Type 7 - joy and lightness as a way through", strength: "primary" },
      { system: "heros-journey", slug: "trickster", note: "The sacred fool, comic relief and hidden truth-teller", strength: "primary" },
      { system: "tarot", slug: "the-fool", note: "0 - unconditioned play, dancing at the cliff's edge", strength: "secondary" },
      { system: "mbti", slug: "esfp", note: "Se/Fi - the stage-born entertainer", strength: "secondary" },
      { system: "mbti", slug: "entp", note: "Ne/Ti - the witty provocateur who teaches by teasing", strength: "secondary" },
      { system: "mbti", slug: "enfp", note: "Ne/Fi - the irrepressible enthusiast", strength: "secondary" },
    ],
  },
  {
    id: "creator",
    theme: "The Creator - Imagination, Vision, Enduring Form",
    description:
      "The maker who brings something into being that was not there before. Vision crystallized into form.",
    archetypes: [
      { system: "jungian", slug: "creator", note: "Soul cluster - if you can imagine it, you can create it", strength: "primary" },
      { system: "enneagram", slug: "individualist", note: "Type 4 - unique expression, identity through making", strength: "primary" },
      { system: "kwml", slug: "the-magician", note: "Transformative aspect - reshaping material reality", strength: "secondary" },
      { system: "tarot", slug: "the-magician", note: "I - will shaping matter, the four tools applied", strength: "secondary" },
      { system: "tarot", slug: "the-star", note: "XVII - creative faith, hope poured into form", strength: "secondary" },
      { system: "mbti", slug: "infj", note: "Ni-dom visionary - the architectural imaginer", strength: "secondary" },
      { system: "mbti", slug: "infp", note: "Fi/Ne - the interior world made into art", strength: "secondary" },
      { system: "mbti", slug: "enfp", note: "Ne/Fi - the generative enthusiast", strength: "secondary" },
    ],
  },
  {
    id: "everyman",
    theme: "The Everyman - Belonging, Solidarity, Ordinariness",
    description:
      "The energy of the regular person. Refuses elevation, prizes fit with the group, honors the ordinary decencies.",
    archetypes: [
      { system: "jungian", slug: "everyman", note: "Ego cluster - all people are created equal", strength: "primary" },
      { system: "enneagram", slug: "loyalist", note: "Type 6 - bonds of trust, fidelity to the group", strength: "primary" },
      { system: "enneagram", slug: "peacemaker", note: "Type 9 - merges with the group, keeps the peace", strength: "secondary" },
      { system: "heros-journey", slug: "ally", note: "Faithful companion, the salt-of-the-earth sidekick", strength: "secondary" },
      { system: "mbti", slug: "isfj", note: "Si/Fe - the quiet backbone of a community", strength: "secondary" },
      { system: "mbti", slug: "esfj", note: "Fe/Si - the host who remembers everyone's name", strength: "secondary" },
      { system: "mbti", slug: "istj", note: "Si-dom - the reliable citizen, tradition kept", strength: "secondary" },
    ],
  },
  {
    id: "shadow",
    theme: "The Shadow - The Antagonist, Repressed Self, Dark Mirror",
    description:
      "The disowned energies that become the antagonist. What the self rejects returns as the enemy at the threshold.",
    archetypes: [
      { system: "kwml", slug: "the-king", note: "Shadow poles - Tyrant / Weakling (inflated / deflated)", strength: "primary" },
      { system: "kwml", slug: "the-warrior", note: "Shadow poles - Sadist / Masochist", strength: "primary" },
      { system: "kwml", slug: "the-magician", note: "Shadow poles - Manipulator / Innocent One", strength: "primary" },
      { system: "kwml", slug: "the-lover", note: "Shadow poles - Addicted Lover / Impotent Lover", strength: "primary" },
      { system: "heros-journey", slug: "shadow", note: "The antagonist mask - the villain who mirrors the hero", strength: "primary" },
      { system: "tarot", slug: "the-devil", note: "XV - the bound shadow, what holds you captive", strength: "primary" },
      { system: "tarot", slug: "the-moon", note: "XVIII - the dreaming unconscious, unseen shapes stirring", strength: "secondary" },
      { system: "enneagram", slug: "challenger", note: "Disintegration (stress at 5) - the revenging antagonist", strength: "secondary" },
    ],
  },
  {
    id: "shapeshifter",
    theme: "The Shapeshifter - Ambiguity, Transformation, Anima/Animus",
    description:
      "The figure whose allegiance and form keep shifting. Catalyst of ambiguity - the projection of the contra-sexual soul.",
    archetypes: [
      { system: "heros-journey", slug: "shapeshifter", note: "Anima/animus projection - ally or adversary, unclear", strength: "primary" },
      { system: "tarot", slug: "the-moon", note: "XVIII - illusion, shifting form, dreamlike uncertainty", strength: "primary" },
      { system: "enneagram", slug: "achiever", note: "Type 3 - adapts image to context, the chameleon", strength: "secondary" },
      { system: "mbti", slug: "enfp", note: "Ne/Fi - the fluid, context-adapting spirit", strength: "secondary" },
      { system: "mbti", slug: "entp", note: "Ne/Ti - devil's-advocate shapeshifter of argument", strength: "secondary" },
    ],
  },
  {
    id: "threshold-guardian",
    theme: "The Threshold Guardian - Tests, Gatekeeping, Initiation Barriers",
    description:
      "The one who bars the gate - not to defeat the hero but to test readiness. The obstacle that proves worthiness.",
    archetypes: [
      { system: "heros-journey", slug: "threshold-guardian", note: "Blocks the uncommitted, initiates the ready", strength: "primary" },
      { system: "tarot", slug: "strength", note: "VIII - taming the inner beast before it can be passed", strength: "secondary" },
      { system: "kwml", slug: "the-hero", note: "Boy in fullness (Warrior family) - must be overcome for maturity", strength: "secondary" },
      { system: "enneagram", slug: "loyalist", note: "Type 6 - tests trustworthiness, the wary gatekeeper", strength: "secondary" },
      { system: "mbti", slug: "istj", note: "Si/Te - the rule-keeper at the gate", strength: "secondary" },
      { system: "mbti", slug: "estj", note: "Te/Si - the enforcer of standards", strength: "secondary" },
    ],
  },
  {
    id: "herald",
    theme: "The Herald - The Call, Disruption of Homeostasis",
    description:
      "The messenger whose arrival shatters the ordinary. The call that can be refused but never unheard.",
    archetypes: [
      { system: "heros-journey", slug: "herald", note: "Initiates the call, announces the change", strength: "primary" },
      { system: "tarot", slug: "judgement", note: "XX - the inner calling, the trumpet of awakening", strength: "primary" },
      { system: "tarot", slug: "wheel-of-fortune", note: "X - change arrives, the wheel turns", strength: "secondary" },
      { system: "mbti", slug: "enfj", note: "Fe/Ni - the visionary who summons others to the cause", strength: "secondary" },
      { system: "mbti", slug: "enfp", note: "Ne/Fi - the enthusiastic awakener", strength: "secondary" },
    ],
  },
  {
    id: "death-rebirth",
    theme: "Death & Rebirth - Necessary Ending, Transformation",
    description:
      "The passage that requires loss. What must die for the next form to emerge - initiation's non-negotiable price.",
    archetypes: [
      { system: "kwml", slug: "the-divine-child", note: "Initiation - the boy must die for the man to emerge", strength: "primary" },
      { system: "kwml", slug: "the-hero", note: "Initiation - the striving ego surrenders to the Warrior", strength: "primary" },
      { system: "kwml", slug: "the-precocious-child", note: "Initiation - the clever boy yields to the wise Magician", strength: "primary" },
      { system: "kwml", slug: "the-oedipal-child", note: "Initiation - the hungry boy becomes the generous Lover", strength: "primary" },
      { system: "tarot", slug: "death", note: "XIII - necessary ending, the clearing of what's over", strength: "primary" },
      { system: "tarot", slug: "the-tower", note: "XVI - sudden structural collapse, forced rebirth", strength: "primary" },
      { system: "tarot", slug: "the-hanged-man", note: "XII - willing surrender, the world inverted", strength: "secondary" },
      { system: "enneagram", slug: "individualist", note: "Integration (to 1) - the artist yields to discipline", strength: "secondary" },
      { system: "mbti", slug: "infj", note: "Ni/Fe - attuned to cycles of ending and renewal", strength: "secondary" },
      { system: "mbti", slug: "intj", note: "Ni/Te - the strategist of necessary demolition", strength: "secondary" },
    ],
  },
  {
    id: "integration",
    theme: "Integration & Wholeness - The Completed Self",
    description:
      "The state in which the opposites are held together. Not a pole but a balance - the journey's return phase.",
    archetypes: [
      { system: "kwml", slug: "the-king", note: "Quaternary in balance - King as the integrating center", strength: "primary" },
      { system: "kwml", slug: "the-warrior", note: "Warrior energy under sovereign service", strength: "primary" },
      { system: "kwml", slug: "the-magician", note: "Magician energy under sovereign service", strength: "primary" },
      { system: "kwml", slug: "the-lover", note: "Lover energy under sovereign service", strength: "primary" },
      { system: "tarot", slug: "the-world", note: "XXI - completion, the dance of the four in unity", strength: "primary" },
      { system: "tarot", slug: "the-sun", note: "XIX - radiant wholeness, joy of the integrated self", strength: "secondary" },
      { system: "jungian", slug: "ruler", note: "Self cluster - the whole is ordered around a mature center", strength: "secondary" },
    ],
  },
  {
    id: "teacher",
    theme: "The Teacher - Transmission, Doctrine, Inherited Wisdom",
    description:
      "The lineage-bearer. The one who hands forward - ritual, doctrine, method. Wisdom as tradition rather than as discovery.",
    archetypes: [
      { system: "heros-journey", slug: "mentor", note: "Transmits the method, gives the hero the talisman", strength: "primary" },
      { system: "tarot", slug: "the-hierophant", note: "V - the true teacher, the inherited rite", strength: "primary" },
      { system: "jungian", slug: "sage", note: "Self cluster - wisdom shaped into doctrine to be passed on", strength: "secondary" },
      { system: "enneagram", slug: "reformer", note: "Type 1 - moral authority, the teacher of the right way", strength: "secondary" },
      { system: "mbti", slug: "enfj", note: "Fe/Ni - the natural pedagogue and mentor", strength: "secondary" },
      { system: "mbti", slug: "estj", note: "Te/Si - the institutional teacher, keeper of the standard", strength: "secondary" },
    ],
  },
  {
    id: "boy-hero",
    theme: "The Boy-Hero - Proving, Striving, Pre-Initiation Ambition",
    description:
      "The un-initiated striver. Ambition without yet the ballast of maturity - the phase before the king emerges.",
    archetypes: [
      { system: "kwml", slug: "the-hero", note: "Boy in fullness (Warrior family) - the striving before initiation", strength: "primary" },
      { system: "jungian", slug: "hero", note: "Ego cluster - the young proving self before the return", strength: "primary" },
      { system: "enneagram", slug: "achiever", note: "Type 3 - proves worth through doing, chases the image", strength: "primary" },
      { system: "kwml", slug: "the-precocious-child", note: "Boy in fullness (Magician family) - the clever, untempered knower", strength: "secondary" },
      { system: "heros-journey", slug: "hero", note: "Before the ordeal - the untested form of the protagonist", strength: "secondary" },
      { system: "tarot", slug: "the-chariot", note: "VII - young will, untested drive", strength: "secondary" },
      { system: "mbti", slug: "estp", note: "Se/Ti - the ambitious young operator", strength: "secondary" },
      { system: "mbti", slug: "entj", note: "Te/Ni - the striving commander in training", strength: "secondary" },
    ],
  },
];
