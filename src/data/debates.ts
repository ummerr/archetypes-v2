export interface MetaDebate {
  slug: string;
  heading: string;
  caseFor: string;
  caseAgainst: string;
  adversarialNote: string;
  citationsFor?: string[];
  citationsAgainst?: string[];
  stance: string;
}

export const META_DEBATES: MetaDebate[] = [
  {
    slug: "liminal-territory-real",
    heading: "Is Liminal Territory a real structural finding or an over-reach?",
    caseFor:
      "Mission 8's feature-space analysis found a cluster of figures — Moon, Hanged Man, Wheel of Fortune, Shapeshifter, Trickster — that code for between-ness and dissolving-form regardless of origin system. Mission 9 identified it as a fourth structural pole alongside departure, ordeal, and return. No single traditional system names this region on its own; naming it adds explanatory power.",
    caseAgainst:
      "Every member of Liminal Territory already has a home in another cluster (Shapeshifter, Death-Rebirth, Herald). Promoting the family resemblance to a structural axis risks reifying a statistical artifact. Mythographers before us did not need this category.",
    adversarialNote:
      "If it doesn't hold up in use — if the cluster never tells readers anything the parent clusters don't — it should collapse back. We offer it as hypothesis.",
    citationsFor: ["Mission 8 structural-similarity analysis", "Mission 9 meta-patterns"],
    citationsAgainst: ["Adversarial Mission 10 — over-fitting critique"],
    stance:
      "Offered as a hypothesis, not a finding. Retained for now because it surfaces the between-phase that the four-fold structures elide.",
  },
  {
    slug: "mbti-inclusion",
    heading: "Should MBTI be included at all, given its psychometric problems?",
    caseFor:
      "MBTI is widely legible. For many readers it is the first archetypal vocabulary they meet, and the eight cognitive functions it surfaces remain useful even when type-stability is weak. Removing it would cut off a major on-ramp.",
    caseAgainst:
      "Test-retest reliability is weaker than the system implies; corporate use has been repeatedly criticised; the theoretical grounding in Jung's Psychological Types is thinner than Myers and Briggs claimed. Presenting it at parity with Jungian or Enneagram frameworks risks endorsing pseudoscience.",
    adversarialNote:
      "Retaining MBTI 'for accessibility' is the same move the PMAI wheel makes with Pearson — a theoretical framework commercially laundered past the criticism that should have reshaped it.",
    citationsAgainst: ["Pittenger (1993) on MBTI reliability", "Stromberg & Caswell on corporate MBTI"],
    stance:
      "Included with caveats surfaced inline. MBTI entries are usually moderate-or-below confidence; the /mbti/about page carries the psychometric-honesty section.",
  },
  {
    slug: "masculine-coded-universal",
    heading: "Can a masculine-coded developmental arc (Boy → Man) serve as a universal axis?",
    caseFor:
      "The arc names something real about initiation — striving-ego surrenders to integrated-self. KWML explicitly restricts its scope to mature men, but the structural move (pre-initiation → post-initiation) recurs across traditions that are not masculine-coded (Tarot, Pearson's Hero Within). The axis is not the masculine-coding.",
    caseAgainst:
      "Murdock, Bolen, and Estés built alternative arcs precisely because the masculine frame does not fit. Presenting Boy → Man as a universal axis — even with a counter-canon link — performs the erasure Murdock named in her conversation with Campbell.",
    adversarialNote:
      "A link to /about/counter-canon is not parity. The structural claim still centres the masculine arc. The adversarial review pressed this hardest and we do not fully resolve it.",
    citationsFor: ["Moore & Gillette (1990); Pearson (1991)"],
    citationsAgainst: ["Murdock (1990); Bolen (1984); Estés (1992)"],
    stance:
      "The masculine-coding is named, not erased. We present the arc as one developmental structure, not the developmental structure. The counter-canon is linked from every KWML and Hero's Journey page as first-class parallel.",
  },
  {
    slug: "murdock-vs-campbell",
    heading: "Murdock's Heroine's Journey vs. Campbell's monomyth",
    caseFor:
      "Campbell's monomyth was derived from a sample that Dundes and Toelken have shown was cherry-picked; his conversation with Murdock when she asked whether the frame fit women is documented and revealing. Murdock's arc — separation from the feminine, identification with the masculine, descent to the goddess, integration — is not a re-gendering; it is a different structure.",
    caseAgainst:
      "The monomyth remains a powerful analytic tool even where it is partial. Vogler's flexible-function reading (Hero as role, not identity) accommodates many of Murdock's concerns without abandoning Campbell's framework.",
    adversarialNote:
      "Reading Murdock 'through' Campbell is part of what she objected to. The two arcs are not commensurable; choosing Campbell as the frame already decides the question.",
    citationsFor: ["Murdock (1990); Bolen (1984)"],
    citationsAgainst: ["Vogler (2007); Campbell (1949)"],
    stance:
      "Both arcs presented as first-class parallel structures. /about/counter-canon carries Murdock; Hero's Journey system pages link to it by default.",
  },
  {
    slug: "riso-vs-naranjo",
    heading: "Riso-Hudson arrows vs. Naranjo's later disavowal",
    caseFor:
      "The integration / disintegration arrows are central to Riso-Hudson's pedagogy. In practice they track something readers recognise: Type 8 under stress does show Five-like withdrawal; Type 4 in security does pick up One's discipline.",
    caseAgainst:
      "Naranjo, who brought the arrows into the modern Enneagram, later disavowed them as a reliable structural feature. The empirical basis is thin. Using arrows as cluster-membership evidence (e.g., Type 4 → 1 as a death-rebirth signal) compounds the problem.",
    adversarialNote:
      "Arrow-based mapping is one of the places the map's inference is thinnest. We flag arrow-derived entries as speculative or contested.",
    citationsFor: ["Riso & Hudson (1996, 1999)"],
    citationsAgainst: ["Naranjo's later lectures (disavowal)"],
    stance:
      "Arrows retained as phenomenology, not structure. Arrow-derived mappings are tagged speculative or contested; see the cluster editorial notes on Death-Rebirth and Liminal Territory.",
  },
];

export function getMetaDebate(slug: string): MetaDebate | undefined {
  return META_DEBATES.find((d) => d.slug === slug);
}
