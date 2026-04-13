import { getEnneagramBySlug } from "@/data/enneagram/archetypes";
import { renderOgCard, ogSize, ogContentType } from "@/lib/og-card";
import { truncate } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Enneagram Archetype";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getEnneagramBySlug(slug)!;
  return renderOgCard({
    eyebrow: `Enneagram · Type ${a.number}`,
    title: a.name,
    subtitle: truncate(a.description, 180),
    accent: a.accentColor,
  });
}
