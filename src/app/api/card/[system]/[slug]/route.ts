import { notFound } from "next/navigation";
import { renderOgCard, type OgFormat, type OgResonance } from "@/lib/og-card";
import { ogTotem } from "@/lib/og-totems";
import { truncate } from "@/lib/site";
import { ALL_ARCHETYPES as ALL_KWML } from "@/data/kwml/archetypes";
import { ALL_JUNGIAN } from "@/data/jungian/archetypes";
import { ALL_ENNEAGRAM } from "@/data/enneagram/archetypes";
import { ALL_HEROSJOURNEY } from "@/data/herosjourney/archetypes";
import { ALL_TAROT } from "@/data/tarot/archetypes";
import { ALL_MBTI } from "@/data/mbti/archetypes";
import {
  systemAccent,
  getResonantArchetypes,
  archetypeDisplayName,
} from "@/lib/resonance";
import type { SystemId } from "@/data/resonance";

export const runtime = "edge";

type Card = { eyebrow: string; title: string; subtitle: string; accent: string; symbol?: string; mbtiCode?: string; kwmlFamily?: string };

function lookup(system: SystemId, slug: string): Card | null {
  const fallback = systemAccent(system).accent;
  switch (system) {
    case "kwml": {
      const a = ALL_KWML.find((x) => x.slug === slug);
      if (!a) return null;
      return { eyebrow: "KWML Archetype", title: a.name, subtitle: truncate(a.description, 180), accent: a.accentColor ?? fallback, kwmlFamily: a.family };
    }
    case "jungian": {
      const a = ALL_JUNGIAN.find((x) => x.slug === slug);
      if (!a) return null;
      return { eyebrow: "Jungian Archetype", title: a.name, subtitle: truncate(a.description, 180), accent: a.accentColor ?? fallback, symbol: a.symbol };
    }
    case "enneagram": {
      const a = ALL_ENNEAGRAM.find((x) => x.slug === slug);
      if (!a) return null;
      return { eyebrow: `Enneagram Type ${a.number}`, title: a.name, subtitle: truncate(a.description, 180), accent: a.accentColor ?? fallback, symbol: a.symbol };
    }
    case "heros-journey": {
      const a = ALL_HEROSJOURNEY.find((x) => x.slug === slug);
      if (!a) return null;
      return { eyebrow: "Hero's Journey", title: a.name, subtitle: truncate(a.description, 180), accent: a.accentColor ?? fallback };
    }
    case "tarot": {
      const a = ALL_TAROT.find((x) => x.slug === slug);
      if (!a) return null;
      return { eyebrow: `Tarot · ${a.numeral}`, title: a.name, subtitle: truncate(a.description, 180), accent: a.accentColor ?? fallback, symbol: a.symbol };
    }
    case "mbti": {
      const a = ALL_MBTI.find((x) => x.slug === slug);
      if (!a) return null;
      return { eyebrow: `MBTI · ${a.code}`, title: a.nickname, subtitle: truncate(a.description, 180), accent: fallback, mbtiCode: a.code };
    }
    default:
      return null;
  }
}

function resonancesFor(system: SystemId, slug: string): OgResonance[] {
  const clusters = getResonantArchetypes(system, slug);
  const seen = new Set<string>();
  const out: OgResonance[] = [];
  for (const cr of clusters) {
    for (const entry of cr.entries) {
      const key = `${entry.system}/${entry.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const name = archetypeDisplayName(entry.system, entry.slug);
      if (!name) continue;
      out.push({ system: entry.system, name, accent: systemAccent(entry.system).accent });
      if (out.length >= 3) return out;
    }
  }
  return out;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ system: string; slug: string }> },
) {
  const { system, slug } = await params;
  const card = lookup(system as SystemId, slug);
  if (!card) notFound();
  const url = new URL(req.url);
  const format: OgFormat = url.searchParams.get("format") === "square" ? "square" : "wide";
  const includeResonances = url.searchParams.get("resonances") !== "0";
  const totem = ogTotem(system as SystemId, slug, card.accent, {
    symbol: card.symbol,
    mbtiCode: card.mbtiCode,
    kwmlFamily: card.kwmlFamily,
  });
  return renderOgCard({
    ...card,
    format,
    totem,
    resonances: includeResonances ? resonancesFor(system as SystemId, slug) : undefined,
  });
}
