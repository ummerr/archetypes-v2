import { getTarotBySlug } from "@/data/tarot/archetypes";
import { renderOgCard, ogSize, ogContentType } from "@/lib/og-card";
import { ogTotem } from "@/lib/og-totems";
import { truncate } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Tarot Archetype";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getTarotBySlug(slug)!;
  return renderOgCard({
    eyebrow: `Major Arcanum ${a.numeral}`,
    title: a.name,
    subtitle: truncate(a.description, 180),
    accent: a.accentColor,
    totem: ogTotem("tarot", slug, a.accentColor, { symbol: a.symbol }),
  });
}
