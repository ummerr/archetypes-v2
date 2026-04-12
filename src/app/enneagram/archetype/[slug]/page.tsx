import { notFound } from "next/navigation";
import {
  ALL_ENNEAGRAM,
  ENNEAGRAM_TRIADS,
  getEnneagramBySlug,
  getEnneagramByNumber,
} from "@/data/enneagram/archetypes";
import EnneagramDetailClient from "@/components/EnneagramDetailClient";

export function generateStaticParams() {
  return ALL_ENNEAGRAM.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const archetype = getEnneagramBySlug(slug);
    if (!archetype) return { title: "Not Found" };
    return {
      title: `${archetype.name} — Enneagram Type ${archetype.number}`,
      description: archetype.description,
    };
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

  return (
    <EnneagramDetailClient
      archetype={archetype}
      triad={triad}
      triadSiblings={triadSiblings}
      integrationTarget={integrationTarget}
      disintegrationTarget={disintegrationTarget}
    />
  );
}
