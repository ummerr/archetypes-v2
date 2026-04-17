import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";
import SectionHeading from "@/components/shared/SectionHeading";
import { getFigureIndex } from "@/lib/exemplars";
import ExemplarIndexClient from "./ExemplarIndexClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Exemplar Figures",
  description:
    "The figures the six traditions read. A cross-system view of who gets tagged where — and what surviving translation looks like in practice.",
  path: "/atlas/exemplars",
});

export default function ExemplarsIndexPage() {
  const records = getFigureIndex();
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">
      <SectionHeading kicker="Atlas" as="h1">
        Exemplar Figures
      </SectionHeading>
      <p className="font-serif italic text-text-secondary/85 max-w-3xl mb-4">
        The figures each tradition chooses to illustrate its archetypes. A person who appears in
        three systems is a teaching case for resonance; a person who appears in one is a teaching
        case for a tradition's specific lens.
      </p>
      <p className="font-serif italic text-text-secondary/70 max-w-3xl mb-10 text-body-sm">
        A small seed set ({records.length} figures, canonicalized by hand). The underlying
        exemplars files are larger and per-system; this view surfaces only figures whose name is
        known to the cross-system registry.
      </p>
      <ExemplarIndexClient
        records={records.map((r) => ({
          slug: r.figure.slug,
          displayName: r.figure.displayName,
          kind: r.figure.kind,
          editorialNote: r.figure.editorialNote,
          systems: r.appearances.map((a) => a.system),
          mediums: Array.from(
            new Set(r.appearances.map((a) => a.medium).filter((m): m is string => Boolean(m))),
          ),
        }))}
      />
    </div>
  );
}
