import type { Metadata } from "next";
import Link from "next/link";
import { getContestedEntries, archetypeDisplayName, debateSlugFor } from "@/lib/resonance";
import { buildPageMetadata } from "@/lib/site";
import { META_DEBATES } from "@/data/debates";
import { OPEN_QUESTIONS } from "@/data/resonance";
import SectionHeading from "@/components/shared/SectionHeading";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";

export const metadata: Metadata = buildPageMetadata({
  title: "Debates",
  description:
    "Mappings on this site that practitioners actively dispute — with the case for, the case against, and where this site lands.",
  path: "/atlas/debates",
});

export default function DebatesPage() {
  const contested = getContestedEntries();
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-20">
      <SectionHeading kicker="Atlas" as="h1">
        Debates
      </SectionHeading>
      <p className="font-serif italic text-[17px] leading-[1.7] text-text-secondary/85 mt-4 mb-8 max-w-3xl">
        Not every mapping on this site is settled. Some are editorial bets the canon does not
        obviously support; others are structural choices working practitioners dispute. These are
        the ones worth arguing about — with the case for, the case against, and where this site
        lands.
      </p>
      <HermeneuticCaveat variant="inline" className="mb-12" />

      <section className="mb-14">
        <h2 className="font-serif text-xl font-medium mb-2">Structural meta-debates</h2>
        <p className="font-serif italic text-text-secondary/70 text-[14px] mb-5">
          Arguments about the shape of the map itself, not individual mappings.
        </p>
        <ul className="space-y-3">
          {META_DEBATES.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/atlas/debates/${d.slug}`}
                className="block rounded-sm border border-surface-light/40 p-5 hover:border-gold/40 transition-colors"
              >
                <p className="font-serif text-lg mb-2">{d.heading}</p>
                <p className="font-serif italic text-[14px] leading-[1.6] text-text-secondary/75">
                  {d.stance}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-14">
        <h2 className="font-serif text-xl font-medium mb-2">What the map does not resolve</h2>
        <p className="font-serif italic text-text-secondary/70 text-[14px] mb-5">
          Open questions the site carries without deciding — surfaced so readers can weigh them.
        </p>
        <ul className="space-y-3 max-w-3xl">
          {OPEN_QUESTIONS.map((q, i) => (
            <li
              key={i}
              className="font-serif text-[15px] italic text-text-secondary/85 leading-relaxed"
            >
              — {q}
            </li>
          ))}
        </ul>
      </section>

      {contested.length > 0 && (
        <section>
          <h2 className="font-serif text-xl font-medium mb-2">Contested mappings</h2>
          <p className="font-serif italic text-text-secondary/70 text-[14px] mb-5">
            Individual placements flagged as contested in the resonance data.
          </p>
          <ul className="space-y-3">
            {contested.map(({ cluster, entry }) => (
              <li key={`${cluster.id}-${entry.system}-${entry.slug}`}>
                <Link
                  href={`/atlas/debates/${debateSlugFor(cluster.id, entry.system, entry.slug)}`}
                  className="block rounded-sm border border-amber-500/30 p-4 hover:border-amber-500/60 transition-colors"
                >
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-500/90 mb-1">
                    {cluster.theme.split(" — ")[0].replace(/^The\s+/i, "")}
                  </p>
                  <p className="font-serif text-lg">
                    Does{" "}
                    <em>
                      {archetypeDisplayName(entry.system, entry.slug) ?? entry.slug}
                    </em>{" "}
                    belong here?
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
