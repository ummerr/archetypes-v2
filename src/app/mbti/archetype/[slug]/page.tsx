import { notFound } from "next/navigation";
import {
  ALL_MBTI,
  getMbtiBySlug,
  getMbtiById,
  getTemperament,
} from "@/data/mbti/archetypes";
import MbtiDetailClient from "@/components/MbtiDetailClient";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildPageMetadata,
  absoluteUrl,
  SITE_NAME,
  SITE_AUTHOR,
  truncate,
} from "@/lib/site";
import type { Metadata } from "next";

export function generateStaticParams() {
  return ALL_MBTI.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const archetype = getMbtiBySlug(slug);
  if (!archetype) return { title: "Not Found" };
  return buildPageMetadata({
    title: `${archetype.code} - ${archetype.nickname}`,
    description: truncate(archetype.tagline),
    path: `/mbti/archetype/${archetype.slug}`,
    type: "article",
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

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${archetype.code} - ${archetype.nickname}`,
    description: archetype.tagline,
    about: `${archetype.code} ${archetype.nickname}`,
    url: absoluteUrl(`/mbti/archetype/${archetype.slug}`),
    isPartOf: { "@type": "WebSite", name: SITE_NAME },
    author: { "@type": "Person", name: SITE_AUTHOR },
    publisher: { "@type": "Person", name: SITE_AUTHOR },
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <MbtiDetailClient
        archetype={archetype}
        temperament={temperament}
        siblings={siblings}
        previous={previous}
        next={next}
      />
    </>
  );
}
