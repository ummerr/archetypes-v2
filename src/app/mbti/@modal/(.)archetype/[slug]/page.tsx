import { notFound } from "next/navigation";
import {
  ALL_MBTI,
  getMbtiBySlug,
  getMbtiById,
  getTemperament,
} from "@/data/mbti/archetypes";
import MbtiDetailClient from "@/components/MbtiDetailClient";
import MbtiModalShell from "@/components/MbtiModalShell";

export default async function InterceptedMbtiModal({
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
    <MbtiModalShell>
      <MbtiDetailClient
        archetype={archetype}
        temperament={temperament}
        siblings={siblings}
        previous={previous}
        next={next}
        variant="modal"
      />
    </MbtiModalShell>
  );
}
