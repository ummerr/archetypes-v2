import { notFound } from "next/navigation";
import {
  ALL_JUNGIAN,
  JUNGIAN_CLUSTERS,
  getJungianBySlug,
} from "@/data/jungian/archetypes";
import JungianDetailClient from "@/components/JungianDetailClient";

export function generateStaticParams() {
  return ALL_JUNGIAN.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const archetype = getJungianBySlug(slug);
    if (!archetype) return { title: "Not Found" };
    return {
      title: `${archetype.name} — Jungian Archetypes`,
      description: archetype.description,
    };
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

  return (
    <JungianDetailClient
      archetype={archetype}
      cluster={cluster}
      clusterSiblings={clusterSiblings}
    />
  );
}
