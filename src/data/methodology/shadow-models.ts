export interface ShadowModel {
  id: string;
  heading: string;
  body: string;
}

export const SHADOW_MODELS: ShadowModel[] = [
  {
    id: "kwml",
    heading: "KWML - bipolar shadow per archetype",
    body:
      "Moore & Gillette give every archetype two shadow poles: active-inflation and passive-deflation. King splits into Tyrant (inflated) and Weakling (deflated); Warrior into Sadist and Masochist; Magician into Manipulator and Innocent One; Lover into Addicted Lover and Impotent Lover. The shadow is a grammar of dysfunction, not a character in the story.",
  },
  {
    id: "tarot",
    heading: "Tarot - tripartite (fullness, active shadow, passive shadow)",
    body:
      "Waite-Smith Tarot and its Jungian readers (Nichols, Pollack) often distinguish a card's integrated reading, its active shadow (excess, domination), and its passive shadow (deficit, collapse). The Tower integrated is liberating collapse; active-shadow Tower is destruction sought; passive-shadow Tower is catastrophe suffered.",
  },
  {
    id: "enneagram",
    heading: "Enneagram - integration / disintegration transit-states",
    body:
      "Riso-Hudson describe each type's stress (disintegration) and security (integration) movements along the enneagram arrows. Shadow here is a transit, not a fixed pole - Type 8 under stress takes on Five's isolation; under security it takes on Two's tenderness. Naranjo later disavowed the arrows; they remain contested.",
  },
  {
    id: "jungian",
    heading: "Jungian (Pearson) - single shadow trap per archetype",
    body:
      "Pearson's Awakening the Heroes Within names, for each of the twelve archetypes, a single characteristic distortion: the Caregiver's martyrdom, the Warrior's ruthlessness, the Lover's loss of self, and so on. A unipolar trap rather than a bipolar grammar.",
  },
  {
    id: "heros-journey",
    heading: "Hero's Journey - Shadow as dramatic mask",
    body:
      "Campbell / Vogler's Shadow is a character role in the monomyth - the antagonist who mirrors the hero. It is a function in the drama, not a structural feature of the psyche. That was the category error the old Shadow cluster committed: equating a dramatic mask with KWML's grammar of dysfunction and Tarot's event-symbol.",
  },
];
