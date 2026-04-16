import Link from "next/link";
import type { DevelopmentalStageNote } from "@/data/cluster-pedagogy";
import { archetypeDisplayName, archetypeHref, systemAccent } from "@/lib/resonance";
import { STAGE_LABELS } from "@/data/atlas-lens-axes";

interface Props {
  arc: DevelopmentalStageNote[];
  color: string;
}

export default function ClusterDevelopmentalArc({ arc, color }: Props) {
  if (!arc.length) return null;
  return (
    <details className="mb-12 group">
      <summary
        className="cursor-pointer font-mono text-[10px] tracking-[0.3em] uppercase mb-4 list-none flex items-center gap-2"
        style={{ color }}
      >
        <span>Developmental arc</span>
        <span className="text-text-secondary/50 group-open:rotate-90 transition-transform">›</span>
      </summary>
      <p className="font-serif italic text-[14px] text-text-secondary/75 mb-5 max-w-prose">
        Every cluster has depth. What it looks like at four stages of the long developmental arc —
        not a ladder to climb, a sequence readers pass through and revisit.
      </p>
      <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        {arc.map((stage, i) => {
          const exemplarAccent = stage.exemplarRef
            ? systemAccent(stage.exemplarRef.system).accent
            : color;
          const exemplarName = stage.exemplarRef
            ? archetypeDisplayName(stage.exemplarRef.system, stage.exemplarRef.slug)
            : undefined;
          return (
            <li
              key={i}
              className="rounded-sm border p-4 relative"
              style={{ borderColor: `${color}30` }}
            >
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-text-secondary/60 mb-1">
                {STAGE_LABELS[stage.stage]}
              </p>
              <p className="font-serif text-[15px] font-medium mb-1">{stage.name}</p>
              <p className="text-[13px] text-text-secondary/85 leading-snug italic">{stage.note}</p>
              {stage.exemplarRef && exemplarName && (
                <Link
                  href={archetypeHref(stage.exemplarRef.system, stage.exemplarRef.slug)}
                  className="block mt-3 font-mono text-[10px] tracking-[0.2em] uppercase hover:underline"
                  style={{ color: exemplarAccent }}
                >
                  → {exemplarName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </details>
  );
}
