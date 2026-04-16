import type { SystemId } from "@/data/resonance";
import type { Stage } from "@/data/atlas-lens-axes";

export interface ClusterVignette {
  note: string;
  source?: string;
}

export interface DevelopmentalStageNote {
  stage: Stage;
  name: string;
  note: string;
  exemplarRef?: { system: SystemId; slug: string };
}

export interface ShadowFace {
  system: SystemId;
  model: string;
  note: string;
}

export interface ClusterPedagogy {
  vignettes?: ClusterVignette[];
  developmentalArc?: DevelopmentalStageNote[];
  shadowFaces?: ShadowFace[];
}

// Overlay map keyed by cluster id. Only clusters with curated content are
// present; the page falls back to empty-state for any cluster not listed.
export const CLUSTER_PEDAGOGY: Record<string, ClusterPedagogy> = {
  sovereign: {
    vignettes: [
      {
        note: "You are mid-meeting when the room visibly turns to you for a decision. Not your turn in the agenda, not your title, but a pressure that lands in your sternum: someone has to say what this is. The Sovereign cluster is not the authority you carry in the org chart; it is the felt obligation to bless, name, or refuse — to hold the center so the rest of the room knows where the center is.",
      },
      {
        note: "A parent dying. The siblings around the hospice bed have long since stopped waiting for the dying parent to be the parent; now someone in the generation below must speak the family into the next shape. The Sovereign energy is rarely a coronation. It is a slow, reluctant assumption of the seat that was vacated.",
      },
      {
        note: "You are asked to speak at a friend's wedding and your jaw tightens before your mouth opens. The Sovereign's shadow, in Moore's language, is either the tyrant who speaks to control the moment or the weakling who says nothing and lets the ritual go unblessed. The mature form is a third thing — a brief, public act of seeing the couple for what they are.",
      },
    ],
    developmentalArc: [
      {
        stage: "pre-initiation",
        name: "The crowned child",
        note: "The pattern wants attention without having earned it; blessing is demanded rather than given.",
        exemplarRef: { system: "kwml", slug: "the-divine-child" },
      },
      {
        stage: "striving",
        name: "The performer",
        note: "Seeking legitimacy through display, title, or credential. The self-as-brand; Moore's inflated boy-ego.",
        exemplarRef: { system: "enneagram", slug: "achiever" },
      },
      {
        stage: "integrating",
        name: "The Prince learning to hold",
        note: "Capable of leadership but still vulnerable to the two shadows. Shows up to the seat; doesn't yet sit easily.",
        exemplarRef: { system: "kwml", slug: "the-king" },
      },
      {
        stage: "integrated",
        name: "The King who blesses others",
        note: "Sovereignty as a capacity to see and name what's alive in those around them — the authority that uses itself up on others, not on itself.",
        exemplarRef: { system: "tarot", slug: "the-emperor" },
      },
    ],
    shadowFaces: [
      {
        system: "kwml",
        model: "KWML bipolar shadow",
        note: "Active shadow: the Tyrant, dominating the room to protect fragile centrality. Passive shadow: the Weakling, abdicating the seat and leaving a vacuum others fill.",
      },
      {
        system: "tarot",
        model: "Tarot tripartite",
        note: "The Emperor card holds both poles: rigidity (order as cage) and structure-giving (order as clearing). The shadow is always the archetype mistaking one for the other.",
      },
      {
        system: "enneagram",
        model: "Enneagram disintegration",
        note: "Under stress, the Eight (natural Sovereign) moves to Five — withdraws into a fortress of information, refuses to bless. The authority contracts rather than extends.",
      },
      {
        system: "jungian",
        model: "Jungian father-complex",
        note: "Unconscious identification with authority itself: mistaking the archetype for one's own ego. Jung: the more the throne is identified with, the less the person sits on it.",
      },
    ],
  },
  warrior: {
    vignettes: [
      {
        note: "The project is six weeks behind. You walk into the 9am and realize nobody else is going to name the problem unless you do. The moment before you speak — that locked, clean, already-moving feeling — is the Warrior arriving. The cluster is not the victory. It is the fractional second of decision when the body commits before the mind has finished arguing.",
      },
      {
        note: "A friend is being lied to, badly, and the truth will cost the friendship or cost the friend. The Warrior is not the confrontation; it is the willingness to pay the cost. Moore's discipline: service, not aggression. The sword is a sword because it cuts — but the question is always what it cuts for.",
      },
    ],
    developmentalArc: [
      {
        stage: "pre-initiation",
        name: "The hero-kid",
        note: "Movement without target. Energy as thrash — needing to hit something, not yet knowing what.",
        exemplarRef: { system: "kwml", slug: "the-hero" },
      },
      {
        stage: "striving",
        name: "The combatant",
        note: "Direction found but the fight is still about proving — the self-through-opposition. Achilles before Patroclus.",
        exemplarRef: { system: "enneagram", slug: "challenger" },
      },
      {
        stage: "integrating",
        name: "The soldier in service",
        note: "Discipline as craft. The Warrior's violence subordinated to a loyalty — regiment, vow, cause.",
        exemplarRef: { system: "heros-journey", slug: "hero" },
      },
      {
        stage: "integrated",
        name: "The mature Warrior",
        note: "Moore's image: a person who can say yes and mean it, can say no and mean it, and knows the difference between the two kinds of silence. Violence, when used, is grief-shaped, not ego-shaped.",
        exemplarRef: { system: "kwml", slug: "the-warrior" },
      },
    ],
    shadowFaces: [
      {
        system: "kwml",
        model: "KWML bipolar shadow",
        note: "Active shadow: the Sadist — violence uncoupled from service, inflicting pain as proof of agency. Passive shadow: the Masochist — absorbing blows as proof of virtue.",
      },
      {
        system: "enneagram",
        model: "Enneagram disintegration",
        note: "The Eight under stress moves to Five, but the Warrior-Eight's failure mode is more often a blocked gut — suppressing the instinctive 'no' until it erupts sideways.",
      },
      {
        system: "heros-journey",
        model: "Campbell / Vogler",
        note: "The Warrior archetype's monomyth trap: never returning. Staying in the ordeal because the return requires a different archetype (Sovereign, Lover) the Warrior alone cannot supply.",
      },
      {
        system: "tarot",
        model: "Tarot tripartite",
        note: "The Chariot as shadow: victory that hollows. The reins held by willpower alone — no integration of the horses pulling in different directions.",
      },
    ],
  },
  "sage-magician": {
    vignettes: [
      {
        note: "You realize, reading a client's email for the fourth time, that the sentence you almost wrote back would have been devastatingly accurate and also wrong — technically true, practically destructive. The Sage-Magician cluster is the capacity to see the distinction, and the capacity to choose which kind of true to say. Not cleverness. Discernment.",
      },
      {
        note: "A friend comes to you with a problem they can't see the shape of. You listen. At some point you hear the second problem — the one they're not saying — and you have to decide whether to name it. The Magician's tool is not analysis. It is the pause before speaking, in which you notice what would open and what would close.",
      },
    ],
    shadowFaces: [
      {
        system: "kwml",
        model: "KWML bipolar shadow",
        note: "Active shadow: the Manipulator — knowledge used to move others without their consent. Passive shadow: the Denying Innocent — refusing to know what one knows, playing the naïf to escape responsibility.",
      },
      {
        system: "jungian",
        model: "Jungian inflation / puer",
        note: "The Sage complex: identifying with the archetype's knowing to the point of losing one's actual self. The 'wise one' who has lost the capacity not to know.",
      },
      {
        system: "tarot",
        model: "Tarot tripartite",
        note: "The Hermit as withdrawal that never returns. Knowledge hoarded; the lamp lit for no one. Nichols: the inverse of wisdom is not ignorance but private expertise.",
      },
      {
        system: "enneagram",
        model: "Enneagram disintegration",
        note: "The Five under stress moves to Seven — fragmenting knowledge into a scatter of interests, unable to commit what has been learned to any particular life.",
      },
    ],
  },
};
