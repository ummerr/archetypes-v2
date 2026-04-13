import { notFound } from "next/navigation";
import {
  ALL_ARCHETYPES,
  getArchetypeBySlug,
  getFamilyByArchetype,
} from "@/data/kwml/archetypes";
import ArchetypeDetailClient from "@/components/ArchetypeDetailClient";
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
  return ALL_ARCHETYPES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const archetype = getArchetypeBySlug(slug);
  if (!archetype) return { title: "Not Found" };
  const shadows =
    archetype.activeShadow && archetype.passiveShadow
      ? ` Shadow poles: ${archetype.activeShadow.name} & ${archetype.passiveShadow.name}.`
      : "";
  return buildPageMetadata({
    title: `${archetype.name} — KWML Archetype`,
    description: truncate(`${archetype.description}${shadows}`),
    path: `/kwml/archetype/${archetype.slug}`,
    ogImage: systemOgImage("kwml"),
    type: "article",
  });
}

export default async function ArchetypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const archetype = getArchetypeBySlug(slug);
  if (!archetype) notFound();

  const family = getFamilyByArchetype(archetype);

  const partner =
    archetype.maturity === "man"
      ? getArchetypeBySlug(archetype.evolutionFrom!)
      : getArchetypeBySlug(archetype.evolutionTo!);

  const boyArchetype = archetype.maturity === "boy" ? archetype : partner!;
  const manArchetype = archetype.maturity === "man" ? archetype : partner!;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${archetype.name} — KWML Archetype`,
    description: archetype.description,
    about: archetype.name,
    url: absoluteUrl(`/kwml/archetype/${archetype.slug}`),
    isPartOf: { "@type": "WebSite", name: SITE_NAME },
    author: { "@type": "Person", name: SITE_AUTHOR },
    publisher: { "@type": "Person", name: SITE_AUTHOR },
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <ArchetypeDetailClient
        archetype={archetype}
        family={family}
        partner={partner}
        boyArchetype={boyArchetype}
        manArchetype={manArchetype}
      />
    </>
  );
}
