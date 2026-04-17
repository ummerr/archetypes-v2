import { getArchetypeBySlug } from "@/data/kwml/archetypes";
import { renderOgCard, ogSize, ogContentType } from "@/lib/og-card";
import { ogTotem } from "@/lib/og-totems";
import { truncate } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "KWML Archetype";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArchetypeBySlug(slug)!;
  return renderOgCard({
    eyebrow: "KWML Archetype",
    title: a.name,
    subtitle: truncate(a.description, 180),
    accent: a.accentColor,
    totem: ogTotem("kwml", slug, a.accentColor, { kwmlFamily: a.family }),
  });
}
