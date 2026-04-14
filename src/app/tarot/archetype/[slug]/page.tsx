import { notFound } from "next/navigation";
import {
  ALL_TAROT,
  TAROT_PHASES,
  getTarotBySlug,
  getTarotById,
} from "@/data/tarot/archetypes";
import TarotDetailClient from "@/components/TarotDetailClient";
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
  return ALL_TAROT.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const archetype = getTarotBySlug(slug);
  if (!archetype) return { title: "Not Found" };
  return buildPageMetadata({
    title: `${archetype.name} - Major Arcanum ${archetype.numeral}`,
    description: truncate(archetype.description),
    path: `/tarot/archetype/${archetype.slug}`,
    type: "article",
  });
}

export default async function TarotArchetypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const archetype = getTarotBySlug(slug);
  if (!archetype) notFound();

  const phase = TAROT_PHASES.find((p) => p.id === archetype.phase)!;
  const phaseSiblings = ALL_TAROT.filter(
    (a) => a.phase === archetype.phase && a.slug !== archetype.slug
  );
  const previous = getTarotById(archetype.id - 1) ?? null;
  const next = getTarotById(archetype.id + 1) ?? null;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${archetype.name} - Major Arcanum ${archetype.numeral}`,
    description: archetype.description,
    about: archetype.name,
    url: absoluteUrl(`/tarot/archetype/${archetype.slug}`),
    isPartOf: { "@type": "WebSite", name: SITE_NAME },
    author: { "@type": "Person", name: SITE_AUTHOR },
    publisher: { "@type": "Person", name: SITE_AUTHOR },
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <TarotDetailClient
        archetype={archetype}
        phase={phase}
        phaseSiblings={phaseSiblings}
        previous={previous}
        next={next}
      />
    </>
  );
}
