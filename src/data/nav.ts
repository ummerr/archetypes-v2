import { SYSTEMS } from "./systems";
import { ALL_JUNGIAN } from "./jungian/archetypes";
import { ALL_ENNEAGRAM } from "./enneagram/archetypes";
import { ALL_ARCHETYPES as ALL_KWML } from "./kwml/archetypes";
import { ALL_HEROSJOURNEY } from "./herosjourney/archetypes";
import { ALL_TAROT } from "./tarot/archetypes";
import { ALL_MBTI } from "./mbti/archetypes";

export type NavLink = {
  label: string;
  href: string;
  desc?: string;
};

export type NavSystem = {
  id: string;
  name: string;
  href: string;
  tagline: string;
  accent: string;
  specials: NavLink[];
};

const SPECIALS: Record<string, NavLink[]> = {
  jungian: [{ label: "Journey", href: "/jungian/journey", desc: "Three-ring spiral arc" }],
  kwml: [{ label: "Boy Within", href: "/kwml/boy-within-man", desc: "Nested triangles" }],
};

export const NAV_SYSTEMS: NavSystem[] = SYSTEMS.filter((s) => s.status === "live" && s.href).map((s) => ({
  id: s.id,
  name: s.name,
  href: s.href as string,
  tagline: s.subtitle,
  accent: s.accent,
  specials: SPECIALS[s.id] ?? [],
}));

export function archetypesForSystem(systemId: string): NavLink[] {
  switch (systemId) {
    case "jungian":
      return ALL_JUNGIAN.map((a) => ({ label: a.name, href: `/jungian/archetype/${a.slug}` }));
    case "enneagram":
      return ALL_ENNEAGRAM.map((a) => ({ label: `${a.number}. ${a.name}`, href: `/enneagram/archetype/${a.slug}` }));
    case "kwml":
      return ALL_KWML.map((a) => ({ label: a.name, href: `/kwml/archetype/${a.slug}` }));
    case "heros-journey":
      return ALL_HEROSJOURNEY.map((a) => ({ label: a.name, href: `/heros-journey/archetype/${a.slug}` }));
    case "tarot":
      return ALL_TAROT.map((a) => ({ label: `${a.numeral} · ${a.name}`, href: `/tarot/archetype/${a.slug}` }));
    case "mbti":
      return ALL_MBTI.map((a) => ({ label: `${a.code} · ${a.nickname}`, href: `/mbti/archetype/${a.slug}` }));
    default:
      return [];
  }
}

export const ATLAS_LINKS: NavLink[] = [
  { label: "The Atlas", href: "/atlas", desc: "Cross-system constellation" },
  { label: "Debates", href: "/atlas/debates", desc: "Contested mappings" },
];

export const PRACTICE_LINKS: NavLink[] = [
  { label: "Today", href: "/today", desc: "A daily archetype for the collective" },
  { label: "The Mirror", href: "/mirror", desc: "Describe what you're navigating" },
  { label: "Profile", href: "/profile", desc: "Build a cross-system reflection" },
];

export const ABOUT_LINKS: NavLink[] = [
  { label: "Methodology", href: "/about/methodology", desc: "How this atlas is built" },
  { label: "Bibliography", href: "/about/bibliography", desc: "Primary sources & scholarship" },
  { label: "Counter-Canon", href: "/about/counter-canon", desc: "Parallel maps where canon was partial" },
  { label: "Shadow Structures", href: "/about/shadow-structures", desc: "Five different shadow models" },
];

export const INDEX_LINK: NavLink = {
  label: "The Index",
  href: "/archetypes",
  desc: "All archetypes across every system",
};

export function systemFromPath(pathname: string): NavSystem | null {
  const match = NAV_SYSTEMS.find((s) => pathname === s.href || pathname.startsWith(s.href + "/"));
  return match ?? null;
}

export function systemSubLinks(system: NavSystem): NavLink[] {
  return [
    { label: "Overview", href: system.href },
    ...system.specials,
    { label: "About", href: `${system.href}/about` },
  ];
}
