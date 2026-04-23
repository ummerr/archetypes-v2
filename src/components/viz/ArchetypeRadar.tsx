import {
  AFFECT_COLOR,
  DEVELOPMENTAL_ORDINAL,
  NARRATIVE_ORDINAL,
  RELATIONAL_LABEL,
  getFeatureVector,
} from "@/data/feature-vectors";
import type { SystemId } from "@/data/resonance";
import { systemAccent } from "@/lib/resonance";

interface Props {
  system: SystemId;
  slug: string;
  className?: string;
  size?: number;
}

interface Axis {
  label: string;
  shortLabel: string;
  value: number;
  display: string;
}

export default function ArchetypeRadar({ system, slug, className = "", size = 360 }: Props) {
  const v = getFeatureVector(system, slug);
  if (!v) return null;

  const axes: Axis[] = [
    {
      label: "Belonging → Independence",
      shortLabel: "Independence",
      value: (v.belonging_independence + 1) / 2,
      display: v.belonging_independence >= 0 ? "Independence-leaning" : "Belonging-leaning",
    },
    {
      label: "Stability → Risk",
      shortLabel: "Risk",
      value: (v.stability_risk + 1) / 2,
      display: v.stability_risk >= 0 ? "Risk-leaning" : "Stability-leaning",
    },
    {
      label: "Developmental stage",
      shortLabel: "Development",
      value: DEVELOPMENTAL_ORDINAL[v.developmental_stage],
      display: v.developmental_stage.replace("-", " "),
    },
    {
      label: "Narrative position",
      shortLabel: "Narrative",
      value: NARRATIVE_ORDINAL[v.narrative_position],
      display: v.narrative_position,
    },
  ];

  // Horizontal padding inside the viewBox so the long left-side label
  // ("NARRATIVE") isn't clipped when text-anchor pushes it past the chart edge.
  const LABEL_PAD = 48;
  const W = size + LABEL_PAD * 2;
  const H = size;
  const cx = W / 2;
  const cy = H / 2;
  const R = size * 0.36;

  const accent = systemAccent(system).accent;
  const n = axes.length;

  const points = axes.map((a, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const r = R * a.value;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      angle,
      axis: a,
    };
  });

  const axisEndpoints = axes.map((_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return {
      x: cx + Math.cos(angle) * R,
      y: cy + Math.sin(angle) * R,
      angle,
    };
  });

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <figure className={className}>
      <figcaption className="mb-3">
        <p className="font-mono text-label tracking-kicker uppercase text-gold/80 mb-1">
          Feature signature
        </p>
        <h3 className="font-serif text-xl font-medium">Archetype signature</h3>
        <p className="font-serif italic text-body text-text-secondary/85 mt-1">
          Position on four structural axes from Mission 8&apos;s feature vectors, plus the affect
          and relational-stance categoricals.
        </p>
      </figcaption>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto max-w-[456px] mx-auto"
          role="img"
          aria-label="Archetype signature radar"
        >
          {/* Rings */}
          {rings.map((rt) => (
            <circle
              key={rt}
              cx={cx}
              cy={cy}
              r={R * rt}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity={rt === 1 ? 0.25 : 0.1}
            />
          ))}

          {/* Axes */}
          {axisEndpoints.map((p, i) => (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.15"
            />
          ))}

          {/* Polygon fill */}
          <path d={pathD} fill={accent} fillOpacity={0.18} stroke={accent} strokeWidth={1.5} />

          {/* Vertex dots */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={3} fill={accent} />
          ))}

          {/* Axis labels */}
          {axisEndpoints.map((p, i) => {
            const a = axes[i];
            const labelR = R + 18;
            const lx = cx + Math.cos(p.angle) * labelR;
            const ly = cy + Math.sin(p.angle) * labelR;
            const ta =
              Math.abs(Math.cos(p.angle)) < 0.2
                ? "middle"
                : Math.cos(p.angle) > 0
                ? "start"
                : "end";
            return (
              <text
                key={i}
                x={lx}
                y={ly}
                textAnchor={ta}
                dominantBaseline="middle"
                className="font-mono uppercase"
                style={{ fontSize: 10, letterSpacing: "0.08em" }}
                fill="currentColor"
                opacity="0.6"
              >
                {a.shortLabel}
              </text>
            );
          })}
        </svg>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
        {axes.map((a) => (
          <div key={a.shortLabel}>
            <dt className="font-mono text-label tracking-kicker uppercase text-muted/80">
              {a.shortLabel}
            </dt>
            <dd className="font-serif italic text-text-secondary/90">{a.display}</dd>
          </div>
        ))}
        <div>
          <dt className="font-mono text-label tracking-kicker uppercase text-muted/80">
            Affect center
          </dt>
          <dd className="font-serif italic text-text-secondary/90 flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: AFFECT_COLOR[v.affect_center] }}
            />
            {v.affect_center}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-label tracking-kicker uppercase text-muted/80">
            Relational stance
          </dt>
          <dd className="font-serif italic text-text-secondary/90">
            {RELATIONAL_LABEL[v.relational_stance]}
          </dd>
        </div>
      </dl>
    </figure>
  );
}
