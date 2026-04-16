import { AFFECT_ACCENT, type Affect } from "@/data/atlas-lens-axes";
import type { AxisKey } from "@/lib/axes";
import { AXIS_LABELS, AXIS_TITLES } from "@/lib/axes";

interface Props {
  axis: AxisKey;
  counts: Record<string, number>;
  values: readonly string[];
  max?: number;
}

export default function AxisHistogram({ axis, counts, values, max }: Props) {
  const maxVal = max ?? Math.max(1, ...values.map((v) => counts[v] ?? 0));
  const labels = AXIS_LABELS[axis] as Record<string, string>;
  return (
    <div>
      <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-text-secondary/70 mb-2">
        {AXIS_TITLES[axis]}
      </p>
      <ul className="space-y-1.5">
        {values.map((v) => {
          const c = counts[v] ?? 0;
          const pct = (c / maxVal) * 100;
          const color =
            axis === "affect" ? AFFECT_ACCENT[v as Affect] ?? "#888" : "#d4af37";
          return (
            <li key={v} className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-text-secondary/80 w-28 shrink-0">
                {labels[v] ?? v}
              </span>
              <span
                className="h-1.5 rounded-sm"
                style={{
                  width: `${Math.max(pct, c > 0 ? 4 : 0)}%`,
                  minWidth: c > 0 ? 6 : 0,
                  background: color,
                  opacity: c > 0 ? 0.85 : 0,
                }}
              />
              <span className="font-mono text-[9px] text-text-secondary/60 ml-auto">{c}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
