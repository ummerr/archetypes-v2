import Link from "next/link";
import { getClusterExemplars } from "@/lib/cluster-exemplars";
import { archetypeDisplayName, archetypeHref, systemAccent } from "@/lib/resonance";

interface Props {
  clusterId: string;
}

export default function ClusterExemplarGrid({ clusterId }: Props) {
  const rows = getClusterExemplars(clusterId, 3);
  if (!rows.length) return null;
  return (
    <section className="mb-12">
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-4">
        Exemplars by system
      </p>
      <p className="font-serif italic text-[14px] text-text-secondary/75 mb-5 max-w-prose">
        The same cluster rendered through each tradition's figures. Read across — resonance is what
        survives the translation.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rows.map(({ system, slug, exemplars }) => {
          const { accent, name: systemName } = systemAccent(system);
          const archetypeName = archetypeDisplayName(system, slug) ?? slug;
          return (
            <div
              key={`${system}-${slug}`}
              className="rounded-sm border p-4"
              style={{ borderColor: `${accent}30` }}
            >
              <p
                className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1"
                style={{ color: accent }}
              >
                {systemName}
              </p>
              <Link
                href={archetypeHref(system, slug)}
                className="font-serif text-[15px] font-medium hover:underline underline-offset-4 decoration-1 block mb-3"
                style={{ color: accent }}
              >
                {archetypeName}
              </Link>
              <ul className="space-y-2">
                {exemplars.map((e, i) => (
                  <li key={i} className="text-[13px] leading-snug">
                    <span className="font-serif text-text-primary/90">{e.name}</span>
                    {e.kind === "cultural" && e.medium && (
                      <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-secondary/55 ml-2">
                        {e.medium}
                      </span>
                    )}
                    <p className="text-text-secondary/80 text-[12px] mt-0.5 italic">{e.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
