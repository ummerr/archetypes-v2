import { notFound } from "next/navigation";
import {
  ALL_HEROSJOURNEY,
  getHeroJourneyBySlug,
} from "@/data/herosjourney/archetypes";
import { JOURNEY_STAGES } from "@/data/herosjourney/stages";
import HeroJourneyDetailClient from "@/components/HeroJourneyDetailClient";

export function generateStaticParams() {
  return ALL_HEROSJOURNEY.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const archetype = getHeroJourneyBySlug(slug);
    if (!archetype) return { title: "Not Found" };
    return {
      title: `${archetype.name} — Hero's Journey`,
      description: archetype.description,
    };
  });
}

export default async function HeroJourneyArchetypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const archetype = getHeroJourneyBySlug(slug);
  if (!archetype) notFound();

  const stages = JOURNEY_STAGES.filter((s) =>
    archetype.primaryStages.includes(s.number)
  );
  const siblings = ALL_HEROSJOURNEY.filter((a) => a.slug !== archetype.slug);

  return (
    <HeroJourneyDetailClient
      archetype={archetype}
      stages={stages}
      siblings={siblings}
    />
  );
}
