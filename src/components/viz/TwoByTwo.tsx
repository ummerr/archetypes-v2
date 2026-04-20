import {
  getAllVectorPoints,
  getFeatureVector,
  type VectorPoint,
} from "@/data/feature-vectors";
import { archetypeDisplayName, systemAccent } from "@/lib/resonance";
import type { SystemId } from "@/data/resonance";
import { SYSTEMS } from "@/data/systems";

interface Props {
  highlight?: { system: SystemId; slug: string };
  points?: VectorPoint[];
  title?: string;
  subtitle?: string;
  xLabel?: { left: string; right: string };
  yLabel?: { top: string; bottom: string };
  className?: string;
}

const W = 640;
const H = 640;
const PAD = 60;
const PLOT_W = W - PAD * 2;
const PLOT_H = H - PAD * 2;

function project(v: number, axis: "x" | "y"): number {
  const clamped = Math.max(-1, Math.min(1, v));
  const t = (clamped + 1) / 2;
  if (axis === "x") return PAD + t * PLOT_W;
  return H - PAD - t * PLOT_H;
}

export default function TwoByTwo({
  highlight,
  points,
  title = "The Pearson Compass",
  subtitle = "Every archetype placed on two axes: stability / risk, and belonging / independence. Positions come from Mission 8's feature vectors.",
  xLabel = { left: "Belonging", right: "Independence" },
  yLabel = { top: "Risk", bottom: "Stability" },
  className = "",
}: Props) {
  const data = points ?? getAllVectorPoints();
  const highlightPoint = highlight ? getFeatureVector(highlight.system, highlight.slug) : undefined;

  const labelFor = (p: VectorPoint): string =>
    archetypeDisplayName(p.system, p.slug) ?? p.slug;

  return (
    <figure className={className}>
      {title && (
        <figcaption className="mb-3">
          <p className="font-mono text-label tracking-kicker uppercase text-gold/80 mb-1">
            Two-Axis Compass
          </p>
          <h3 className="font-serif text-xl font-medium">{title}</h3>
          {subtitle && (
            <p className="font-serif italic text-body text-text-secondary/85 mt-1">{subtitle}</p>
          )}
        </figcaption>
      )}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto max-w-[640px] mx-auto"
          role="img"
          aria-label={`${title}: two-axis scatter plot`}
        >
          {/* Background */}
          <rect x={PAD} y={PAD} width={PLOT_W} height={PLOT_H} fill="rgb(var(--surface))" opacity="0.3" />

          {/* Quadrant guides */}
          <line
            x1={PAD + PLOT_W / 2}
            y1={PAD}
            x2={PAD + PLOT_W / 2}
            y2={H - PAD}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.2"
          />
          <line
            x1={PAD}
            y1={PAD + PLOT_H / 2}
            x2={W - PAD}
            y2={PAD + PLOT_H / 2}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.2"
          />

          {/* Outer frame */}
          <rect
            x={PAD}
            y={PAD}
            width={PLOT_W}
            height={PLOT_H}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.35"
          />

          {/* Axis labels */}
          <text
            x={PAD - 12}
            y={H / 2}
            textAnchor="end"
            dominantBaseline="middle"
            className="font-mono uppercase"
            style={{ fontSize: 11, letterSpacing: "0.08em" }}
            fill="currentColor"
            opacity="0.55"
          >
            {xLabel.left}
          </text>
          <text
            x={W - PAD + 12}
            y={H / 2}
            textAnchor="start"
            dominantBaseline="middle"
            className="font-mono uppercase"
            style={{ fontSize: 11, letterSpacing: "0.08em" }}
            fill="currentColor"
            opacity="0.55"
          >
            {xLabel.right}
          </text>
          <text
            x={W / 2}
            y={PAD - 14}
            textAnchor="middle"
            className="font-mono uppercase"
            style={{ fontSize: 11, letterSpacing: "0.08em" }}
            fill="currentColor"
            opacity="0.55"
          >
            {yLabel.top}
          </text>
          <text
            x={W / 2}
            y={H - PAD + 22}
            textAnchor="middle"
            className="font-mono uppercase"
            style={{ fontSize: 11, letterSpacing: "0.08em" }}
            fill="currentColor"
            opacity="0.55"
          >
            {yLabel.bottom}
          </text>

          {/* Points */}
          {data.map((p) => {
            const cx = project(p.vector.belonging_independence, "x");
            const cy = project(p.vector.stability_risk, "y");
            const accent = systemAccent(p.system).accent;
            const isHighlight =
              highlight && p.system === highlight.system && p.slug === highlight.slug;
            return (
              <g key={`${p.system}-${p.slug}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHighlight ? 6 : 3.5}
                  fill={accent}
                  fillOpacity={isHighlight ? 1 : 0.7}
                  stroke={isHighlight ? accent : "none"}
                  strokeWidth={isHighlight ? 2 : 0}
                />
                {isHighlight && (
                  <>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={12}
                      fill="none"
                      stroke={accent}
                      strokeWidth={1}
                      opacity={0.5}
                    />
                    <text
                      x={cx + 10}
                      y={cy - 10}
                      className="font-serif"
                      style={{ fontSize: 13, fontStyle: "italic" }}
                      fill="currentColor"
                    >
                      {labelFor(p)}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* Highlight-only label when vector exists */}
          {!highlightPoint && highlight && (
            <text
              x={W / 2}
              y={H / 2}
              textAnchor="middle"
              className="font-mono uppercase"
              style={{ fontSize: 10 }}
              fill="currentColor"
              opacity="0.4"
            >
              No vector for {highlight.system}/{highlight.slug}
            </text>
          )}
        </svg>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 justify-center">
        {SYSTEMS.map((s) => (
          <li key={s.id} className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: s.accent }}
            />
            <span className="font-mono text-label tracking-kicker uppercase text-muted">
              {s.name}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
