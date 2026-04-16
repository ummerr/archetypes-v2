import type { ShadowFace } from "@/data/cluster-pedagogy";
import { systemAccent } from "@/lib/resonance";

interface Props {
  faces: ShadowFace[];
  color: string;
}

export default function ClusterShadowFaces({ faces, color }: Props) {
  if (!faces.length) return null;
  return (
    <details className="mb-12 group">
      <summary
        className="cursor-pointer font-mono text-[10px] tracking-[0.3em] uppercase mb-4 list-none flex items-center gap-2"
        style={{ color }}
      >
        <span>Shadow faces</span>
        <span className="text-text-secondary/50 group-open:rotate-90 transition-transform">›</span>
      </summary>
      <p className="font-serif italic text-[14px] text-text-secondary/75 mb-5 max-w-prose">
        Five traditions cut shadow differently. Here is how this cluster distorts under pressure, in
        each tradition's vocabulary. The cross-walk itself is the teaching.
      </p>
      <ul className="space-y-3">
        {faces.map((f, i) => {
          const { accent, name } = systemAccent(f.system);
          return (
            <li
              key={i}
              className="rounded-sm border px-4 py-3"
              style={{ borderColor: `${accent}30` }}
            >
              <div className="flex items-baseline gap-3 mb-1">
                <p
                  className="font-mono text-[9px] tracking-[0.3em] uppercase"
                  style={{ color: accent }}
                >
                  {name}
                </p>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-secondary/55">
                  {f.model}
                </p>
              </div>
              <p className="text-[13px] text-text-primary/85 leading-snug italic">{f.note}</p>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
