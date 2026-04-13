import { notFound } from "next/navigation";
import {
  ALL_JUNGIAN,
  JUNGIAN_CLUSTERS,
  getJungianBySlug,
} from "@/data/jungian/archetypes";
import JungianDetailClient from "@/components/JungianDetailClient";
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
  return ALL_JUNGIAN.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const archetype = getJungianBySlug(slug);
  if (!archetype) return { title: "Not Found" };
  return buildPageMetadata({
    title: `${archetype.name} — Jungian Archetype`,
    description: truncate(archetype.description),
    path: `/jungian/archetype/${archetype.slug}`,
    type: "article",
  });
}

export default async function JungianArchetypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const archetype = getJungianBySlug(slug);
  if (!archetype) notFound();

  const cluster = JUNGIAN_CLUSTERS.find((c) => c.id === archetype.cluster)!;
  const clusterSiblings = ALL_JUNGIAN.filter(
    (a) => a.cluster === archetype.cluster && a.slug !== archetype.slug
  );
  const opposite = getJungianBySlug(archetype.opposite)!;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${archetype.name} — Jungian Archetype`,
    description: archetype.description,
    about: archetype.name,
    url: absoluteUrl(`/jungian/archetype/${archetype.slug}`),
    isPartOf: { "@type": "WebSite", name: SITE_NAME },
    author: { "@type": "Person", name: SITE_AUTHOR },
    publisher: { "@type": "Person", name: SITE_AUTHOR },
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <JungianDetailClient
        archetype={archetype}
        cluster={cluster}
        clusterSiblings={clusterSiblings}
        opposite={opposite}
      />
    </>
  );
}
