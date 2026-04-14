import { SYSTEMS } from "./systems";
import { tagsFor, type IndexTagSet } from "./indexTags";
import { ALL_JUNGIAN, JUNGIAN_CLUSTERS } from "./jungian/archetypes";
import {
  ALL_ENNEAGRAM,
  ENNEAGRAM_TRIADS,
} from "./enneagram/archetypes";
import { ALL_ARCHETYPES as ALL_KWML, FAMILIES } from "./kwml/archetypes";
import { ALL_MBTI, TEMPERAMENT_GROUPS } from "./mbti/archetypes";
import { ALL_HEROSJOURNEY } from "./herosjourney/archetypes";
import { ALL_TAROT, TAROT_PHASES } from "./tarot/archetypes";

export type IndexSystemId =
  | "jungian"
  | "enneagram"
  | "kwml"
  | "mbti"
  | "heros-journey"
  | "tarot";

export interface IndexEntry {
  systemId: IndexSystemId;
  systemName: string;
  systemAccent: string;
  slug: string;
  href: string;
  name: string;
  sortName: string;
  motto?: string;
  symbol?: string;
  accentColor: string;
  innerGroup: { id: string; label: string; color: string };
  tags: IndexTagSet;
}

const sysByIdMap = Object.fromEntries(SYSTEMS.map((s) => [s.id, s]));
function systemMeta(id: IndexSystemId) {
  const s = sysByIdMap[id]!;
  return { name: s.name, accent: s.accent };
}

const jungianClusterMap = Object.fromEntries(
  JUNGIAN_CLUSTERS.map((c) => [c.id, c])
);
const enneagramTriadMap = Object.fromEntries(
  ENNEAGRAM_TRIADS.map((t) => [t.id, t])
);
const kwmlFamilyMap = Object.fromEntries(FAMILIES.map((f) => [f.id, f]));
const mbtiTempMap = Object.fromEntries(
  TEMPERAMENT_GROUPS.map((t) => [t.id, t])
);
const tarotPhaseMap = Object.fromEntries(TAROT_PHASES.map((p) => [p.id, p]));

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

const jungianEntries: IndexEntry[] = ALL_JUNGIAN.map((a) => {
  const cluster = jungianClusterMap[a.cluster];
  const { name: systemName, accent } = systemMeta("jungian");
  return {
    systemId: "jungian",
    systemName,
    systemAccent: accent,
    slug: a.slug,
    href: `/jungian/archetype/${a.slug}`,
    name: a.name,
    sortName: a.name.replace(/^The\s+/i, ""),
    motto: a.motto,
    symbol: a.symbol,
    accentColor: a.accentColor,
    innerGroup: { id: `jungian-${cluster.id}`, label: cluster.label, color: cluster.color },
    tags: tagsFor("jungian", a.slug),
  };
});

const enneagramEntries: IndexEntry[] = ALL_ENNEAGRAM.map((a) => {
  const triad = enneagramTriadMap[a.triad];
  const { name: systemName, accent } = systemMeta("enneagram");
  return {
    systemId: "enneagram",
    systemName,
    systemAccent: accent,
    slug: a.slug,
    href: `/enneagram/archetype/${a.slug}`,
    name: `${a.number} · ${a.name}`,
    sortName: a.name.replace(/^The\s+/i, ""),
    motto: a.motto,
    symbol: a.symbol,
    accentColor: a.accentColor,
    innerGroup: { id: `enneagram-${triad.id}`, label: triad.label, color: triad.color },
    tags: tagsFor("enneagram", a.slug),
  };
});

const kwmlEntries: IndexEntry[] = ALL_KWML.map((a) => {
  const fam = kwmlFamilyMap[a.family];
  const { name: systemName, accent } = systemMeta("kwml");
  return {
    systemId: "kwml",
    systemName,
    systemAccent: accent,
    slug: a.slug,
    href: `/kwml/archetype/${a.slug}`,
    name: a.name,
    sortName: a.name.replace(/^The\s+/i, ""),
    motto: undefined,
    symbol: undefined,
    accentColor: a.accentColor,
    innerGroup: {
      id: `kwml-${fam.id}-${a.maturity}`,
      label: `${fam.label} · ${a.maturity === "man" ? "Man" : "Boy"}`,
      color: fam.color,
    },
    tags: tagsFor("kwml", a.slug),
  };
});

const mbtiEntries: IndexEntry[] = ALL_MBTI.map((a) => {
  const temp = mbtiTempMap[a.temperament];
  const { name: systemName, accent } = systemMeta("mbti");
  return {
    systemId: "mbti",
    systemName,
    systemAccent: accent,
    slug: a.slug,
    href: `/mbti/archetype/${a.slug}`,
    name: `${a.code} · ${a.nickname}`,
    sortName: a.nickname.replace(/^The\s+/i, ""),
    motto: a.motto,
    symbol: a.code,
    accentColor: temp.primary,
    innerGroup: { id: `mbti-${temp.id}`, label: temp.label, color: temp.primary },
    tags: tagsFor("mbti", a.slug),
  };
});

const hjEntries: IndexEntry[] = ALL_HEROSJOURNEY.map((a) => {
  const { name: systemName, accent } = systemMeta("heros-journey");
  return {
    systemId: "heros-journey",
    systemName,
    systemAccent: accent,
    slug: a.slug,
    href: `/heros-journey/archetype/${a.slug}`,
    name: a.name,
    sortName: a.name.replace(/^The\s+/i, ""),
    motto: a.motto,
    symbol: a.symbol,
    accentColor: a.accentColor,
    innerGroup: { id: `hj-${a.role}`, label: titleCase(a.role), color: a.accentColor },
    tags: tagsFor("heros-journey", a.slug),
  };
});

const tarotEntries: IndexEntry[] = ALL_TAROT.map((a) => {
  const phase = tarotPhaseMap[a.phase];
  const { name: systemName, accent } = systemMeta("tarot");
  return {
    systemId: "tarot",
    systemName,
    systemAccent: accent,
    slug: a.slug,
    href: `/tarot/archetype/${a.slug}`,
    name: `${a.numeral} · ${a.name}`,
    sortName: a.name.replace(/^The\s+/i, ""),
    motto: a.motto,
    symbol: a.symbol,
    accentColor: a.accentColor,
    innerGroup: { id: `tarot-${phase.id}`, label: phase.label, color: phase.color },
    tags: tagsFor("tarot", a.slug),
  };
});

export const ALL_INDEX_ENTRIES: IndexEntry[] = [
  ...jungianEntries,
  ...enneagramEntries,
  ...kwmlEntries,
  ...mbtiEntries,
  ...hjEntries,
  ...tarotEntries,
];

export const SYSTEM_ORDER: IndexSystemId[] = [
  "jungian",
  "enneagram",
  "kwml",
  "mbti",
  "heros-journey",
  "tarot",
];
