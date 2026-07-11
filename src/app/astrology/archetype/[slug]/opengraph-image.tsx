import { getAstrologyBySlug } from "@/data/astrology/archetypes";
import { renderOgCard, ogSize, ogContentType } from "@/lib/og-card";
import { ogTotem } from "@/lib/og-totems";
import { truncate } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Zodiac Sign";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getAstrologyBySlug(slug)!;
  return renderOgCard({
    eyebrow: `Zodiac · ${a.dates}`,
    title: a.name,
    motto: a.motto,
    subtitle: truncate(a.description, 180),
    accent: a.accentColor,
    totem: ogTotem("astrology", slug, a.accentColor, { symbol: a.glyph }),
  });
}
