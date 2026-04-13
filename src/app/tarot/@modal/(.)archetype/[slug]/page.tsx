import { notFound } from "next/navigation";
import {
  ALL_TAROT,
  TAROT_PHASES,
  getTarotBySlug,
  getTarotById,
} from "@/data/tarot/archetypes";
import TarotDetailClient from "@/components/TarotDetailClient";
import TarotModalShell from "@/components/TarotModalShell";

export default async function InterceptedTarotModal({
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
    <TarotModalShell>
      <TarotDetailClient
        archetype={archetype}
        phase={phase}
        phaseSiblings={phaseSiblings}
        previous={previous}
        next={next}
        variant="modal"
      />
    </TarotModalShell>
  );
}
