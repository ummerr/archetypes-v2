export type AgeTag = "child" | "adolescent" | "adult" | "elder";
export type ValenceTag = "light" | "bright" | "mixed" | "shadow" | "dark";
export type IntroversionTag = "inward" | "mixed" | "outward";

export interface IndexTagSet {
  age: AgeTag;
  valence: ValenceTag;
  introversion: IntroversionTag;
}

export const AGE_ORDER: AgeTag[] = ["child", "adolescent", "adult", "elder"];
export const AGE_LABEL: Record<AgeTag, string> = {
  child: "Child",
  adolescent: "Adolescent",
  adult: "Adult",
  elder: "Elder",
};
export const AGE_COLOR: Record<AgeTag, string> = {
  child: "#F0D060",
  adolescent: "#E8804A",
  adult: "#6B4E8C",
  elder: "#3A536E",
};

export const VALENCE_ORDER: ValenceTag[] = [
  "light",
  "bright",
  "mixed",
  "shadow",
  "dark",
];
export const VALENCE_LABEL: Record<ValenceTag, string> = {
  light: "Light",
  bright: "Bright",
  mixed: "Mixed",
  shadow: "Shadow",
  dark: "Dark",
};
export const VALENCE_COLOR: Record<ValenceTag, string> = {
  light: "#F5E8C8",
  bright: "#F0C14B",
  mixed: "#8A7A9E",
  shadow: "#5E3A5E",
  dark: "#1E1E1E",
};

export const INTROVERSION_ORDER: IntroversionTag[] = [
  "inward",
  "mixed",
  "outward",
];
export const INTROVERSION_LABEL: Record<IntroversionTag, string> = {
  inward: "Inward",
  mixed: "Balanced",
  outward: "Outward",
};
export const INTROVERSION_COLOR: Record<IntroversionTag, string> = {
  inward: "#5B7A99",
  mixed: "#8A8A8A",
  outward: "#C8682A",
};

type Key = `${string}:${string}`;

export const INDEX_TAGS: Record<Key, IndexTagSet> = {
  // ── Jungian ────────────────────────────────────────────
  "jungian:innocent": { age: "child", valence: "light", introversion: "mixed" },
  "jungian:everyman": { age: "adult", valence: "bright", introversion: "outward" },
  "jungian:hero": { age: "adolescent", valence: "bright", introversion: "outward" },
  "jungian:caregiver": { age: "adult", valence: "light", introversion: "outward" },
  "jungian:explorer": { age: "adolescent", valence: "mixed", introversion: "inward" },
  "jungian:rebel": { age: "adolescent", valence: "shadow", introversion: "outward" },
  "jungian:lover": { age: "adult", valence: "bright", introversion: "mixed" },
  "jungian:creator": { age: "adult", valence: "bright", introversion: "inward" },
  "jungian:jester": { age: "child", valence: "light", introversion: "outward" },
  "jungian:sage": { age: "elder", valence: "mixed", introversion: "inward" },
  "jungian:magician": { age: "elder", valence: "mixed", introversion: "inward" },
  "jungian:ruler": { age: "elder", valence: "mixed", introversion: "outward" },

  // ── Enneagram ──────────────────────────────────────────
  "enneagram:reformer": { age: "adult", valence: "mixed", introversion: "inward" },
  "enneagram:helper": { age: "adult", valence: "light", introversion: "outward" },
  "enneagram:achiever": { age: "adult", valence: "bright", introversion: "outward" },
  "enneagram:individualist": { age: "adolescent", valence: "shadow", introversion: "inward" },
  "enneagram:investigator": { age: "adult", valence: "mixed", introversion: "inward" },
  "enneagram:loyalist": { age: "adult", valence: "mixed", introversion: "mixed" },
  "enneagram:enthusiast": { age: "adolescent", valence: "bright", introversion: "outward" },
  "enneagram:challenger": { age: "adult", valence: "dark", introversion: "outward" },
  "enneagram:peacemaker": { age: "elder", valence: "light", introversion: "mixed" },

  // ── KWML ───────────────────────────────────────────────
  "kwml:the-king": { age: "elder", valence: "bright", introversion: "outward" },
  "kwml:the-warrior": { age: "adult", valence: "mixed", introversion: "outward" },
  "kwml:the-magician": { age: "elder", valence: "mixed", introversion: "inward" },
  "kwml:the-lover": { age: "adult", valence: "bright", introversion: "mixed" },
  "kwml:the-divine-child": { age: "child", valence: "light", introversion: "mixed" },
  "kwml:the-hero": { age: "adolescent", valence: "bright", introversion: "outward" },
  "kwml:the-precocious-child": { age: "child", valence: "mixed", introversion: "inward" },
  "kwml:the-oedipal-child": { age: "child", valence: "light", introversion: "mixed" },

  // ── MBTI ───────────────────────────────────────────────
  "mbti:intj": { age: "adult", valence: "mixed", introversion: "inward" },
  "mbti:intp": { age: "adult", valence: "mixed", introversion: "inward" },
  "mbti:entj": { age: "adult", valence: "bright", introversion: "outward" },
  "mbti:entp": { age: "adolescent", valence: "bright", introversion: "outward" },
  "mbti:infj": { age: "elder", valence: "mixed", introversion: "inward" },
  "mbti:infp": { age: "adolescent", valence: "light", introversion: "inward" },
  "mbti:enfj": { age: "adult", valence: "light", introversion: "outward" },
  "mbti:enfp": { age: "adolescent", valence: "bright", introversion: "outward" },
  "mbti:istj": { age: "adult", valence: "mixed", introversion: "inward" },
  "mbti:isfj": { age: "adult", valence: "light", introversion: "inward" },
  "mbti:estj": { age: "adult", valence: "mixed", introversion: "outward" },
  "mbti:esfj": { age: "adult", valence: "light", introversion: "outward" },
  "mbti:istp": { age: "adult", valence: "mixed", introversion: "inward" },
  "mbti:isfp": { age: "adolescent", valence: "light", introversion: "inward" },
  "mbti:estp": { age: "adolescent", valence: "bright", introversion: "outward" },
  "mbti:esfp": { age: "adolescent", valence: "bright", introversion: "outward" },

  // ── Hero's Journey ─────────────────────────────────────
  "heros-journey:hero": { age: "adolescent", valence: "bright", introversion: "outward" },
  "heros-journey:mentor": { age: "elder", valence: "mixed", introversion: "inward" },
  "heros-journey:herald": { age: "adolescent", valence: "mixed", introversion: "outward" },
  "heros-journey:threshold-guardian": { age: "adult", valence: "mixed", introversion: "mixed" },
  "heros-journey:shapeshifter": { age: "adult", valence: "shadow", introversion: "mixed" },
  "heros-journey:shadow": { age: "adult", valence: "dark", introversion: "inward" },
  "heros-journey:trickster": { age: "adolescent", valence: "shadow", introversion: "outward" },
  "heros-journey:ally": { age: "adult", valence: "light", introversion: "mixed" },

  // ── Tarot ──────────────────────────────────────────────
  "tarot:the-fool": { age: "child", valence: "light", introversion: "outward" },
  "tarot:the-magician": { age: "adolescent", valence: "bright", introversion: "outward" },
  "tarot:the-high-priestess": { age: "adolescent", valence: "mixed", introversion: "inward" },
  "tarot:the-empress": { age: "adult", valence: "light", introversion: "outward" },
  "tarot:the-emperor": { age: "adult", valence: "mixed", introversion: "outward" },
  "tarot:the-hierophant": { age: "elder", valence: "mixed", introversion: "mixed" },
  "tarot:the-lovers": { age: "adolescent", valence: "bright", introversion: "mixed" },
  "tarot:the-chariot": { age: "adolescent", valence: "bright", introversion: "outward" },
  "tarot:strength": { age: "adult", valence: "bright", introversion: "mixed" },
  "tarot:the-hermit": { age: "elder", valence: "mixed", introversion: "inward" },
  "tarot:wheel-of-fortune": { age: "adult", valence: "mixed", introversion: "mixed" },
  "tarot:justice": { age: "elder", valence: "mixed", introversion: "mixed" },
  "tarot:the-hanged-man": { age: "adult", valence: "shadow", introversion: "inward" },
  "tarot:death": { age: "adult", valence: "shadow", introversion: "inward" },
  "tarot:temperance": { age: "adult", valence: "mixed", introversion: "mixed" },
  "tarot:the-devil": { age: "adult", valence: "dark", introversion: "outward" },
  "tarot:the-tower": { age: "adult", valence: "dark", introversion: "outward" },
  "tarot:the-star": { age: "adult", valence: "light", introversion: "mixed" },
  "tarot:the-moon": { age: "adult", valence: "shadow", introversion: "inward" },
  "tarot:the-sun": { age: "adult", valence: "light", introversion: "outward" },
  "tarot:judgement": { age: "elder", valence: "bright", introversion: "mixed" },
  "tarot:the-world": { age: "elder", valence: "bright", introversion: "mixed" },
};

export function tagsFor(systemId: string, slug: string): IndexTagSet {
  return (
    INDEX_TAGS[`${systemId}:${slug}` as Key] ?? {
      age: "adult",
      valence: "mixed",
      introversion: "mixed",
    }
  );
}
