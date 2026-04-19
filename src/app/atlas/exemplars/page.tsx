import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";
import SectionHeading from "@/components/shared/SectionHeading";
import { getExemplarIndex } from "@/lib/exemplars";
import ExemplarIndexClient from "./ExemplarIndexClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Exemplars",
  description:
    "The exemplars the six traditions read. A cross-system view of who gets tagged where — and what surviving translation looks like in practice.",
  path: "/atlas/exemplars",
});

export default function ExemplarsIndexPage() {
  const records = getExemplarIndex();
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">
      <SectionHeading kicker="Atlas" as="h1">
        Exemplars
      </SectionHeading>
      <p className="font-serif italic text-text-secondary/85 max-w-3xl mb-4">
        The people each tradition chooses to illustrate its archetypes. An exemplar that appears in
        three systems is a teaching case for resonance; one that appears in one is a teaching case
        for a tradition&apos;s specific lens.
      </p>
      <p className="font-serif italic text-text-secondary/70 max-w-3xl mb-10 text-body-sm">
        {records.length} exemplars drawn from every per-system file. Names that appear across
        multiple traditions are merged by hand so one card collects every reading.
      </p>
      <ExemplarIndexClient
        records={records.map((r) => ({
          slug: r.exemplar.slug,
          displayName: r.exemplar.displayName,
          kind: r.exemplar.kind,
          editorialNote: r.exemplar.editorialNote,
          systems: Array.from(new Set(r.appearances.map((a) => a.system))),
          mediums: Array.from(
            new Set(r.appearances.map((a) => a.medium).filter((m): m is string => Boolean(m))),
          ),
        }))}
      />
    </div>
  );
}
