import { notFound } from "next/navigation";
import {
  ALL_ARCHETYPES,
  getArchetypeBySlug,
  getFamilyByArchetype,
} from "@/data/kwml/archetypes";
import ArchetypeDetailClient from "@/components/ArchetypeDetailClient";

export function generateStaticParams() {
  return ALL_ARCHETYPES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const archetype = getArchetypeBySlug(slug);
    if (!archetype) return { title: "Not Found" };
    return {
      title: `${archetype.name} — Maps of the Inner World`,
      description: archetype.description,
    };
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

  return (
    <ArchetypeDetailClient
      archetype={archetype}
      family={family}
      partner={partner}
      boyArchetype={boyArchetype}
      manArchetype={manArchetype}
    />
  );
}
