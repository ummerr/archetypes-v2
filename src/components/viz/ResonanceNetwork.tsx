import {
  archetypeDisplayName,
  archetypeHref,
  confidenceEdgeStyle,
  getResonantArchetypes,
  systemAccent,
} from "@/lib/resonance";
import type { ConfidenceTier, SystemId } from "@/data/resonance";
import { SYSTEMS } from "@/data/systems";

interface Props {
  system: SystemId;
  slug: string;
  title?: string;
  subtitle?: string;
  size?: number;
  className?: string;
}

interface NeighborNode {
  system: SystemId;
  slug: string;
  confidence: ConfidenceTier;
  clusterId: string;
  clusterTheme: string;
}

const SYSTEM_ORDER: SystemId[] = [
  "kwml",
  "jungian",
  "enneagram",
  "mbti",
  "heros-journey",
  "tarot",
];

const EDGE_STYLE: Record<
  ConfidenceTier,
  { dash?: string; opacity: number; width: number; stroke: string }
> = {
  canonical: { opacity: 0.6, width: 1.4, stroke: "currentColor" },
  strong: { opacity: 0.45, width: 1.2, stroke: "currentColor" },
  moderate: { opacity: 0.3, width: 1, stroke: "currentColor" },
  speculative: { opacity: 0.35, width: 0.9, stroke: "currentColor", dash: "1.5 4" },
  contested: { opacity: 0.65, width: 1, stroke: "#d97706", dash: "5 4" },
};

export default function ResonanceNetwork({
  system,
  slug,
  title = "Resonance neighborhood",
  subtitle,
  size = 520,
  className = "",
}: Props) {
  const clusters = getResonantArchetypes(system, slug);

  const neighbors: NeighborNode[] = [];
  const seen = new Set<string>();
  for (const c of clusters) {
    for (const e of c.entries) {
      if (e.system === system && e.slug === slug) continue;
      const key = `${e.system}/${e.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      neighbors.push({
        system: e.system,
        slug: e.slug,
        confidence: e.confidence,
        clusterId: c.cluster.id,
        clusterTheme: c.cluster.theme,
      });
    }
  }

  const W = size;
  const H = size;
  const cx = W / 2;
  const cy = H / 2;
  const rOuter = size * 0.38;
  const rInner = size * 0.08;

  const selfAccent = systemAccent(system).accent;

  const bySystem: Record<SystemId, NeighborNode[]> = {
    kwml: [],
    jungian: [],
    enneagram: [],
    mbti: [],
    "heros-journey": [],
    tarot: [],
  };
  for (const n of neighbors) bySystem[n.system].push(n);

  const presentSystems = SYSTEM_ORDER.filter(
    (s) => s !== system && bySystem[s].length > 0,
  );
  const sectorSpan = (Math.PI * 2) / Math.max(presentSystems.length, 1);

  type Placed = NeighborNode & { x: number; y: number };
  const placed: Placed[] = [];
  presentSystems.forEach((s, si) => {
    const items = bySystem[s];
    const centerAngle = -Math.PI / 2 + si * sectorSpan + sectorSpan / 2;
    const spread = Math.min(sectorSpan * 0.8, 1.1);
    items.forEach((n, i) => {
      const t = items.length === 1 ? 0.5 : i / (items.length - 1);
      const angle = centerAngle + (t - 0.5) * spread;
      placed.push({
        ...n,
        x: cx + Math.cos(angle) * rOuter,
        y: cy + Math.sin(angle) * rOuter,
      });
    });
  });

  const count = placed.length;

  return (
    <figure className={className}>
      <figcaption className="mb-3">
        <p className="font-mono text-label tracking-kicker uppercase text-gold/80 mb-1">
          Network view
        </p>
        <h3 className="font-serif text-xl font-medium">{title}</h3>
        {subtitle ? (
          <p className="font-serif italic text-body text-text-secondary/85 mt-1">{subtitle}</p>
        ) : (
          <p className="font-serif italic text-body text-text-secondary/85 mt-1">
            {count === 0
              ? "No cross-system resonance registered yet."
              : `${count} cross-system resonances across ${presentSystems.length} traditions.`}
          </p>
        )}
      </figcaption>

      {count > 0 && (
        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto max-w-[520px] mx-auto"
            role="img"
            aria-label={title}
          >
            {/* Outer ring guide */}
            <circle
              cx={cx}
              cy={cy}
              r={rOuter}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.12"
            />

            {/* Edges */}
            {placed.map((p, i) => {
              const style = EDGE_STYLE[p.confidence];
              const dx = p.x - cx;
              const dy = p.y - cy;
              const d = Math.hypot(dx, dy);
              const ix = cx + (dx * rInner) / d;
              const iy = cy + (dy * rInner) / d;
              return (
                <line
                  key={`e-${i}`}
                  x1={ix}
                  y1={iy}
                  x2={p.x}
                  y2={p.y}
                  stroke={style.stroke}
                  strokeWidth={style.width}
                  strokeDasharray={style.dash}
                  opacity={style.opacity}
                />
              );
            })}

            {/* Center archetype */}
            <circle cx={cx} cy={cy} r={rInner + 4} fill={selfAccent} opacity={0.15} />
            <circle cx={cx} cy={cy} r={rInner} fill={selfAccent} />
            <text
              x={cx}
              y={cy + rInner + 16}
              textAnchor="middle"
              className="font-serif"
              style={{ fontSize: 13, fontStyle: "italic" }}
              fill="currentColor"
            >
              {archetypeDisplayName(system, slug) ?? slug}
            </text>

            {/* Neighbor nodes */}
            {placed.map((p) => {
              const accent = systemAccent(p.system).accent;
              const name = archetypeDisplayName(p.system, p.slug) ?? p.slug;
              const isRight = p.x >= cx;
              const anchor: "start" | "end" = isRight ? "start" : "end";
              const tx = p.x + (isRight ? 8 : -8);
              const ty = p.y + 4;
              const edgeStyle = confidenceEdgeStyle(p.confidence);
              return (
                <a key={`${p.system}-${p.slug}`} href={archetypeHref(p.system, p.slug)}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={5}
                    fill={accent}
                    opacity={edgeStyle === "dashed" ? 0.75 : 1}
                    stroke={accent}
                    strokeWidth={edgeStyle === "dotted" ? 1 : 0}
                    strokeDasharray={edgeStyle === "dotted" ? "1 2" : undefined}
                  />
                  <text
                    x={tx}
                    y={ty}
                    textAnchor={anchor}
                    className="font-serif"
                    style={{ fontSize: 11 }}
                    fill="currentColor"
                    opacity={0.85}
                  >
                    {name}
                  </text>
                </a>
              );
            })}
          </svg>
        </div>
      )}

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 justify-center">
        {SYSTEMS.filter(
          (s) => s.id === system || (bySystem[s.id as SystemId]?.length ?? 0) > 0,
        ).map((s) => (
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
