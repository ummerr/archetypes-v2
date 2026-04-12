import { notFound } from "next/navigation";
import {
  ALL_TAROT,
  TAROT_PHASES,
  getTarotBySlug,
  getTarotById,
} from "@/data/tarot/archetypes";
import TarotDetailClient from "@/components/TarotDetailClient";

export function generateStaticParams() {
  return ALL_TAROT.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const archetype = getTarotBySlug(slug);
    if (!archetype) return { title: "Not Found" };
    return {
      title: `${archetype.name} — Major Arcanum ${archetype.numeral}`,
      description: archetype.description,
    };
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

  return (
    <TarotDetailClient
      archetype={archetype}
      phase={phase}
      phaseSiblings={phaseSiblings}
      previous={previous}
      next={next}
    />
  );
}
