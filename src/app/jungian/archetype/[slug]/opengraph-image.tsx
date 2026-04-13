import { getJungianBySlug } from "@/data/jungian/archetypes";
import { renderOgCard, ogSize, ogContentType } from "@/lib/og-card";
import { truncate } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Jungian Archetype";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getJungianBySlug(slug)!;
  return renderOgCard({
    eyebrow: "Jungian Archetype",
    title: a.name,
    subtitle: truncate(a.description, 180),
    accent: a.accentColor,
  });
}
