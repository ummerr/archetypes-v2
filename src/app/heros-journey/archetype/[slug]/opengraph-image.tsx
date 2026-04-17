import { getHeroJourneyBySlug } from "@/data/herosjourney/archetypes";
import { renderOgCard, ogSize, ogContentType } from "@/lib/og-card";
import { ogTotem } from "@/lib/og-totems";
import { truncate } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Hero's Journey Archetype";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getHeroJourneyBySlug(slug)!;
  return renderOgCard({
    eyebrow: "Hero's Journey",
    title: a.name,
    subtitle: truncate(a.description, 180),
    accent: a.accentColor,
    totem: ogTotem("heros-journey", slug, a.accentColor),
  });
}
