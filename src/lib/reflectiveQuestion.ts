import type { SystemId } from "@/data/resonance";
import { getArchetypeBySlug as getKwmlBySlug } from "@/data/kwml/archetypes";
import { getJungianBySlug } from "@/data/jungian/archetypes";
import { getTarotBySlug } from "@/data/tarot/archetypes";
import { getEnneagramBySlug } from "@/data/enneagram/archetypes";
import { getMbtiBySlug } from "@/data/mbti/archetypes";
import { getHeroJourneyBySlug } from "@/data/herosjourney/archetypes";
import { getFunction } from "@/data/mbti/functions";

export type QuestionFragment =
  | { kind: "text"; value: string }
  | { kind: "accent"; value: string };

export interface ReflectiveQuestion {
  fragments: QuestionFragment[];
}

function trim(s: string): string {
  return s.replace(/\s+$/, "").replace(/[.?!]+$/, "");
}

function t(value: string): QuestionFragment {
  return { kind: "text", value };
}

function a(value: string): QuestionFragment {
  return { kind: "accent", value: trim(value) };
}

const FALLBACK: ReflectiveQuestion = {
  fragments: [
    t("What does this energy look like in your life this week — in fullness, in shadow, or still asleep?"),
  ],
};

function kwml(slug: string): ReflectiveQuestion | null {
  const k = getKwmlBySlug(slug);
  if (!k) return null;
  return {
    fragments: [
      t("Where are you sitting in "),
      a(k.name),
      t(" this week — and where are you slipping into "),
      a(k.activeShadow.name),
      t(" or "),
      a(k.passiveShadow.name),
      t("?"),
    ],
  };
}

function jungian(slug: string): ReflectiveQuestion | null {
  const j = getJungianBySlug(slug);
  if (!j) return null;
  return {
    fragments: [
      t("This week's gift: "),
      a(j.gift),
      t(". And the trap beneath it: "),
      a(j.trap),
      t(". Where does each one live in you right now?"),
    ],
  };
}

function tarot(slug: string): ReflectiveQuestion | null {
  const c = getTarotBySlug(slug);
  if (!c) return null;
  return {
    fragments: [
      t("The card's theme: "),
      a(c.coreTheme),
      t(". Where is "),
      a(c.poles.fullness.title),
      t(" moving in you — and where does it curdle into "),
      a(c.poles.activeShadow.title),
      t(" or "),
      a(c.poles.passiveShadow.title),
      t("?"),
    ],
  };
}

function enneagram(slug: string): ReflectiveQuestion | null {
  const e = getEnneagramBySlug(slug);
  if (!e) return null;
  return {
    fragments: [
      t("The fear underneath: "),
      a(e.coreFear),
      t(". The gift underneath: "),
      a(e.gift),
      t(". Which of them is driving your week?"),
    ],
  };
}

function mbti(slug: string): ReflectiveQuestion | null {
  const m = getMbtiBySlug(slug);
  if (!m) return null;
  const dom = getFunction(m.stack[0].code);
  const inf = getFunction(m.stack[3].code);
  return {
    fragments: [
      t("As "),
      a(m.nickname),
      t(", your dominant "),
      a(`${dom.nickname} (${dom.code})`),
      t(" carries you. Where is your inferior "),
      a(`${inf.nickname} (${inf.code})`),
      t(" tripping you this week?"),
    ],
  };
}

function heroJourney(slug: string): ReflectiveQuestion | null {
  const h = getHeroJourneyBySlug(slug);
  if (!h) return null;
  return {
    fragments: [
      t("What threshold asks for "),
      a(h.name),
      t(" in you right now? The fear standing there: "),
      a(h.coreFear),
      t(". The gift waiting past it: "),
      a(h.gift),
      t("."),
    ],
  };
}

export function reflectiveQuestion(system: SystemId, slug: string): ReflectiveQuestion {
  const q =
    system === "kwml"
      ? kwml(slug)
      : system === "jungian"
        ? jungian(slug)
        : system === "tarot"
          ? tarot(slug)
          : system === "enneagram"
            ? enneagram(slug)
            : system === "mbti"
              ? mbti(slug)
              : system === "heros-journey"
                ? heroJourney(slug)
                : null;
  return q ?? FALLBACK;
}
