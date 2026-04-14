import type { Metadata } from "next";
import Link from "next/link";
import { CLUSTERS } from "@/data/resonance";
import { archetypeDisplayName, archetypeHref, systemAccent } from "@/lib/resonance";
import { buildPageMetadata } from "@/lib/site";
import SectionHeading from "@/components/shared/SectionHeading";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";
import ArchetypeShareCard from "@/components/viz/ArchetypeShareCard";

export const metadata: Metadata = buildPageMetadata({
  title: "Today's Resonance",
  description:
    "A single archetype each day — same figure for every reader, rotated deterministically. A small daily mirror.",
  path: "/today",
});

export const revalidate = 3600;

function hashDate(d: Date): number {
  const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`;
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export default function TodayPage() {
  const allEntries = CLUSTERS.flatMap((c) => c.archetypes.map((a) => ({ cluster: c, entry: a })));
  const idx = hashDate(new Date()) % allEntries.length;
  const { cluster, entry } = allEntries[idx];
  const name = archetypeDisplayName(entry.system, entry.slug) ?? entry.slug;
  const { accent, name: systemName } = systemAccent(entry.system);

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-24">
      <SectionHeading kicker="Today" as="h1">
        {name}
      </SectionHeading>
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: accent }}>
        {systemName} · {cluster.theme.split(" — ")[0].replace(/^The\s+/i, "")}
      </p>

      <p className="font-serif text-lg italic text-text-secondary/85 mb-8">{entry.note}</p>
      {entry.editorialNote && (
        <p className="font-serif text-[15px] italic text-text-secondary/75 mb-8">
          {entry.editorialNote}
        </p>
      )}

      <div className="mb-8">
        <Link
          href={archetypeHref(entry.system, entry.slug)}
          className="font-mono text-[10px] tracking-[0.3em] uppercase underline underline-offset-4"
          style={{ color: accent }}
        >
          Read {name} →
        </Link>
      </div>

      <h2 className="font-serif text-lg font-medium mb-2">A question for today</h2>
      <p className="font-serif italic text-text-secondary/85">
        Where in your week is this energy already moving — in fullness, in shadow, or still asleep?
      </p>

      <div className="mt-10">
        <ArchetypeShareCard
          system={entry.system}
          slug={entry.slug}
          displayName={name}
          tweetText={`Today's resonance: ${name} — ${entry.note}`}
        />
      </div>

      <div className="mt-14">
        <HermeneuticCaveat variant="footnote" />
      </div>
    </div>
  );
}
