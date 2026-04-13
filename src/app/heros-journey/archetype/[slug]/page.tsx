import { notFound } from "next/navigation";
import {
  ALL_HEROSJOURNEY,
  getHeroJourneyBySlug,
} from "@/data/herosjourney/archetypes";
import { JOURNEY_STAGES } from "@/data/herosjourney/stages";
import HeroJourneyDetailClient from "@/components/HeroJourneyDetailClient";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildPageMetadata,
  systemOgImage,
  absoluteUrl,
  SITE_NAME,
  SITE_AUTHOR,
  truncate,
} from "@/lib/site";
import type { Metadata } from "next";

export function generateStaticParams() {
  return ALL_HEROSJOURNEY.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const archetype = getHeroJourneyBySlug(slug);
  if (!archetype) return { title: "Not Found" };
  return buildPageMetadata({
    title: `${archetype.name} — Hero's Journey Archetype`,
    description: truncate(archetype.description),
    path: `/heros-journey/archetype/${archetype.slug}`,
    ogImage: systemOgImage("heros-journey"),
    type: "article",
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

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${archetype.name} — Hero's Journey Archetype`,
    description: archetype.description,
    about: archetype.name,
    url: absoluteUrl(`/heros-journey/archetype/${archetype.slug}`),
    isPartOf: { "@type": "WebSite", name: SITE_NAME },
    author: { "@type": "Person", name: SITE_AUTHOR },
    publisher: { "@type": "Person", name: SITE_AUTHOR },
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <HeroJourneyDetailClient
        archetype={archetype}
        stages={stages}
        siblings={siblings}
      />
    </>
  );
}
