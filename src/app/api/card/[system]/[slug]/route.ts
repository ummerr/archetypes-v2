import { notFound } from "next/navigation";
import { renderOgCard } from "@/lib/og-card";
import { truncate } from "@/lib/site";
import { ALL_ARCHETYPES as ALL_KWML } from "@/data/kwml/archetypes";
import { ALL_JUNGIAN } from "@/data/jungian/archetypes";
import { ALL_ENNEAGRAM } from "@/data/enneagram/archetypes";
import { ALL_HEROSJOURNEY } from "@/data/herosjourney/archetypes";
import { ALL_TAROT } from "@/data/tarot/archetypes";
import { ALL_MBTI } from "@/data/mbti/archetypes";
import { systemAccent } from "@/lib/resonance";
import type { SystemId } from "@/data/resonance";

export const runtime = "edge";

type Card = { eyebrow: string; title: string; subtitle: string; accent: string };

function lookup(system: SystemId, slug: string): Card | null {
  const fallback = systemAccent(system).accent;
  switch (system) {
    case "kwml": {
      const a = ALL_KWML.find((x) => x.slug === slug);
      if (!a) return null;
      return { eyebrow: "KWML Archetype", title: a.name, subtitle: truncate(a.description, 180), accent: a.accentColor ?? fallback };
    }
    case "jungian": {
      const a = ALL_JUNGIAN.find((x) => x.slug === slug);
      if (!a) return null;
      return { eyebrow: "Jungian Archetype", title: a.name, subtitle: truncate(a.description, 180), accent: a.accentColor ?? fallback };
    }
    case "enneagram": {
      const a = ALL_ENNEAGRAM.find((x) => x.slug === slug);
      if (!a) return null;
      return { eyebrow: `Enneagram Type ${a.number}`, title: a.name, subtitle: truncate(a.description, 180), accent: a.accentColor ?? fallback };
    }
    case "heros-journey": {
      const a = ALL_HEROSJOURNEY.find((x) => x.slug === slug);
      if (!a) return null;
      return { eyebrow: "Hero's Journey", title: a.name, subtitle: truncate(a.description, 180), accent: a.accentColor ?? fallback };
    }
    case "tarot": {
      const a = ALL_TAROT.find((x) => x.slug === slug);
      if (!a) return null;
      return { eyebrow: `Tarot · ${a.numeral}`, title: a.name, subtitle: truncate(a.description, 180), accent: a.accentColor ?? fallback };
    }
    case "mbti": {
      const a = ALL_MBTI.find((x) => x.slug === slug);
      if (!a) return null;
      return { eyebrow: `MBTI · ${a.code}`, title: a.nickname, subtitle: truncate(a.description, 180), accent: fallback };
    }
    default:
      return null;
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ system: string; slug: string }> },
) {
  const { system, slug } = await params;
  const card = lookup(system as SystemId, slug);
  if (!card) notFound();
  return renderOgCard(card);
}
