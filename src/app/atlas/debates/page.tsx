import type { Metadata } from "next";
import Link from "next/link";
import { getContestedEntries, archetypeDisplayName, debateSlugFor } from "@/lib/resonance";
import { buildPageMetadata } from "@/lib/site";
import SectionHeading from "@/components/shared/SectionHeading";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";

export const metadata: Metadata = buildPageMetadata({
  title: "Debates",
  description:
    "Mappings on this site that practitioners actively dispute — with the case for, the case against, and the scholarship on both sides.",
  path: "/atlas/debates",
});

const META_DEBATES = [
  {
    slug: "liminal-territory-real",
    heading: "Is Liminal Territory a real structural finding or an over-reach?",
  },
  {
    slug: "mbti-inclusion",
    heading: "Should MBTI be included at all, given its psychometric problems?",
  },
  {
    slug: "masculine-coded-universal",
    heading: "Can a masculine-coded developmental arc (Boy → Man) serve as a universal axis?",
  },
  { slug: "murdock-vs-campbell", heading: "Murdock's Heroine's Journey vs. Campbell's monomyth" },
  { slug: "riso-vs-naranjo", heading: "Riso-Hudson arrows vs. Naranjo's later disavowal" },
];

export default function DebatesPage() {
  const contested = getContestedEntries();
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-20">
      <SectionHeading kicker="Atlas" as="h1">
        Debates
      </SectionHeading>
      <HermeneuticCaveat variant="inline" className="mb-10" />

      <section className="mb-14">
        <h2 className="font-serif text-xl font-medium mb-4">Contested mappings</h2>
        {contested.length === 0 ? (
          <p className="italic text-text-secondary/80">
            No mappings in the current map carry the <em>contested</em> tier.
          </p>
        ) : (
          <ul className="space-y-3">
            {contested.map(({ cluster, entry }) => (
              <li key={`${cluster.id}-${entry.system}-${entry.slug}`}>
                <Link
                  href={`/atlas/debates/${debateSlugFor(cluster.id, entry.system, entry.slug)}`}
                  className="block rounded-sm border border-amber-500/30 p-4 hover:border-amber-500/60"
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
        )}
      </section>

      <section>
        <h2 className="font-serif text-xl font-medium mb-4">Structural meta-debates</h2>
        <ul className="space-y-3">
          {META_DEBATES.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/atlas/debates/${d.slug}`}
                className="block rounded-sm border border-surface-light/40 p-4 hover:border-gold/40"
              >
                <p className="font-serif text-lg">{d.heading}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
