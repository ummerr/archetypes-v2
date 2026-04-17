import { getMbtiBySlug } from "@/data/mbti/archetypes";
import { TEMPERAMENT_GROUPS } from "@/data/mbti/archetypes";
import { renderOgCard, ogSize, ogContentType } from "@/lib/og-card";
import { ogTotem } from "@/lib/og-totems";
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
  const accent = group?.primary ?? "#5B7A99";
  return renderOgCard({
    eyebrow: `${a.code} · ${a.temperament}`,
    title: a.nickname,
    subtitle: truncate(a.tagline, 180),
    accent,
    totem: ogTotem("mbti", slug, accent, { mbtiCode: a.code }),
  });
}
