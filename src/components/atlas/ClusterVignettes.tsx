import type { ClusterVignette } from "@/data/cluster-pedagogy";

interface Props {
  vignettes: ClusterVignette[];
  color: string;
}

export default function ClusterVignettes({ vignettes, color }: Props) {
  if (!vignettes.length) return null;
  return (
    <section className="mb-12">
      <p
        className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4"
        style={{ color }}
      >
        When you meet this
      </p>
      <div className="space-y-5">
        {vignettes.map((v, i) => (
          <div
            key={i}
            className="border-l-2 pl-5 max-w-2xl"
            style={{ borderColor: `${color}40` }}
          >
            <p className="font-serif text-[16px] leading-relaxed italic text-text-primary/90">
              {v.note}
            </p>
            {v.source && (
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-secondary/55 mt-2">
                {v.source}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
