import { notFound } from "next/navigation";
import {
  ALL_MBTI,
  getMbtiBySlug,
  getMbtiById,
  getTemperament,
} from "@/data/mbti/archetypes";
import MbtiDetailClient from "@/components/MbtiDetailClient";

export function generateStaticParams() {
  return ALL_MBTI.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const archetype = getMbtiBySlug(slug);
    if (!archetype) return { title: "Not Found" };
    return {
      title: `${archetype.code} — ${archetype.nickname}`,
      description: archetype.tagline,
    };
  });
}

export default async function MbtiArchetypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const archetype = getMbtiBySlug(slug);
  if (!archetype) notFound();

  const temperament = getTemperament(archetype.temperament);
  const siblings = ALL_MBTI.filter(
    (a) => a.temperament === archetype.temperament && a.slug !== archetype.slug
  );
  const previous = getMbtiById(archetype.id - 1) ?? null;
  const next = getMbtiById(archetype.id + 1) ?? null;

  return (
    <MbtiDetailClient
      archetype={archetype}
      temperament={temperament}
      siblings={siblings}
      previous={previous}
      next={next}
    />
  );
}
