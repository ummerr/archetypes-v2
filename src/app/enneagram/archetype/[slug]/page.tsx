import { notFound } from "next/navigation";
import {
  ALL_ENNEAGRAM,
  ENNEAGRAM_TRIADS,
  getEnneagramBySlug,
  getEnneagramByNumber,
} from "@/data/enneagram/archetypes";
import EnneagramDetailClient from "@/components/EnneagramDetailClient";
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
  return ALL_ENNEAGRAM.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const archetype = getEnneagramBySlug(slug);
  if (!archetype) return { title: "Not Found" };
  return buildPageMetadata({
    title: `${archetype.name} — Enneagram Type ${archetype.number}`,
    description: truncate(archetype.description),
    path: `/enneagram/archetype/${archetype.slug}`,
    ogImage: systemOgImage("enneagram"),
    type: "article",
  });
}

export default async function EnneagramArchetypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const archetype = getEnneagramBySlug(slug);
  if (!archetype) notFound();

  const triad = ENNEAGRAM_TRIADS.find((t) => t.id === archetype.triad)!;
  const triadSiblings = ALL_ENNEAGRAM.filter(
    (a) => a.triad === archetype.triad && a.slug !== archetype.slug
  );
  const integrationTarget = getEnneagramByNumber(archetype.integrationTo)!;
  const disintegrationTarget = getEnneagramByNumber(archetype.disintegrationTo)!;
  const wingTargets = archetype.wings.map(
    (w) => getEnneagramByNumber(w.number)!
  );

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${archetype.name} — Enneagram Type ${archetype.number}`,
    description: archetype.description,
    about: archetype.name,
    url: absoluteUrl(`/enneagram/archetype/${archetype.slug}`),
    isPartOf: { "@type": "WebSite", name: SITE_NAME },
    author: { "@type": "Person", name: SITE_AUTHOR },
    publisher: { "@type": "Person", name: SITE_AUTHOR },
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <EnneagramDetailClient
        archetype={archetype}
        triad={triad}
        triadSiblings={triadSiblings}
        integrationTarget={integrationTarget}
        disintegrationTarget={disintegrationTarget}
        wingTargets={wingTargets}
      />
    </>
  );
}
