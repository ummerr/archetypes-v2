import { notFound } from "next/navigation";
import {
  ALL_ASTROLOGY,
  ZODIAC_ELEMENTS,
  getAstrologyBySlug,
  getAstrologyByElement,
} from "@/data/astrology/archetypes";
import AstrologyDetailClient from "@/components/AstrologyDetailClient";
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
  return ALL_ASTROLOGY.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const archetype = getAstrologyBySlug(slug);
  if (!archetype) return { title: "Not Found" };
  return buildPageMetadata({
    title: `${archetype.name} - The Zodiac`,
    description: truncate(archetype.description),
    path: `/astrology/archetype/${archetype.slug}`,
    ogImage: absoluteUrl(`/api/card/astrology/${archetype.slug}`),
    type: "article",
  });
}

export default async function AstrologyArchetypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const archetype = getAstrologyBySlug(slug);
  if (!archetype) notFound();

  const element = ZODIAC_ELEMENTS.find((e) => e.id === archetype.element)!;
  const elementSiblings = getAstrologyByElement(archetype.element).filter(
    (a) => a.slug !== archetype.slug,
  );
  const oppositeArchetype = ALL_ASTROLOGY.find(
    (a) => a.name === archetype.oppositeSign,
  );

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${archetype.name} - The Zodiac`,
    description: archetype.description,
    about: archetype.name,
    url: absoluteUrl(`/astrology/archetype/${archetype.slug}`),
    isPartOf: { "@type": "WebSite", name: SITE_NAME },
    author: { "@type": "Person", name: SITE_AUTHOR },
    publisher: { "@type": "Person", name: SITE_AUTHOR },
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <AstrologyDetailClient
        archetype={archetype}
        element={element}
        elementSiblings={elementSiblings}
        oppositeArchetype={oppositeArchetype}
      />
    </>
  );
}
