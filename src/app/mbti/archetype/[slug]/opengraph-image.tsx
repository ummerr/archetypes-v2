import { getMbtiBySlug } from "@/data/mbti/archetypes";
import { TEMPERAMENT_GROUPS } from "@/data/mbti/archetypes";
import { renderOgCard, ogSize, ogContentType } from "@/lib/og-card";
import { truncate } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "MBTI Archetype";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getMbtiBySlug(slug)!;
  const group = TEMPERAMENT_GROUPS.find((g) => g.id === a.temperament);
  return renderOgCard({
    eyebrow: `${a.code} · ${a.temperament}`,
    title: a.nickname,
    subtitle: truncate(a.tagline, 180),
    accent: group?.primary ?? "#5B7A99",
  });
}
