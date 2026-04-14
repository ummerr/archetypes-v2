"use client";

import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ConfidenceTier, SystemId } from "@/data/resonance";

export interface ConstellationNode {
  id: string;
  system: SystemId;
  slug: string;
  clusterIds: string[];
  degree: number;
  x: number;
  y: number;
}

export interface ConstellationEdge {
  source: string;
  target: string;
  clusterId: string;
  confidence: ConfidenceTier;
  weight: number;
}

export interface ConstellationLayout {
  width: number;
  height: number;
  nodes: ConstellationNode[];
  edges: ConstellationEdge[];
}

export interface ConstellationSystemMeta {
  id: SystemId;
  name: string;
  accent: string;
}

export interface ConstellationClusterMeta {
  id: string;
  theme: string;
}

export interface ConstellationNodeMeta {
  displayName: string;
  clusterNames: string[];
}

interface Props {
  layout: ConstellationLayout;
  systems: ConstellationSystemMeta[];
  clusters: ConstellationClusterMeta[];
  nodeMeta: Record<string, ConstellationNodeMeta>;
}

const EDGE_STYLE: Record<
  ConfidenceTier,
  { stroke: string; dash?: string; opacity: number; width: number }
> = {
  canonical:   { stroke: "currentColor", opacity: 0.55, width: 1.4 },
  strong:      { stroke: "currentColor", opacity: 0.42, width: 1.2 },
  moderate:    { stroke: "currentColor", opacity: 0.28, width: 0.9 },
  speculative: { stroke: "currentColor", opacity: 0.35, width: 0.8, dash: "1.5 4" },
  contested:   { stroke: "#d97706",      opacity: 0.65, width: 1.0, dash: "5 4" },
};

export default function ResonanceConstellation({
  layout,
  systems,
  clusters,
  nodeMeta,
}: Props) {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);

  const [hoverNode, setHoverNode] = useState<string | null>(null);
  const [hoverCluster, setHoverCluster] = useState<string | null>(null);
  const [pinnedNode, setPinnedNode] = useState<string | null>(null); // touch
  const [offSystems, setOffSystems] = useState<Set<SystemId>>(new Set());
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [k, setK] = useState(1);

  const nodeById = useMemo(() => {
    const m = new Map<string, ConstellationNode>();
    for (const n of layout.nodes) m.set(n.id, n);
    return m;
  }, [layout.nodes]);

  const systemAccent = useMemo(() => {
    const m: Record<string, string> = {};
    for (const s of systems) m[s.id] = s.accent;
    return m;
  }, [systems]);

  const clusterCentroids = useMemo(() => {
    const out: Record<string, { x: number; y: number; count: number; theme: string }> = {};
    for (const c of clusters) out[c.id] = { x: 0, y: 0, count: 0, theme: c.theme };
    for (const n of layout.nodes) {
      for (const cid of n.clusterIds) {
        const bucket = out[cid];
        if (!bucket) continue;
        bucket.x += n.x;
        bucket.y += n.y;
        bucket.count += 1;
      }
    }
    for (const k of Object.keys(out)) {
      const b = out[k];
      if (b.count) {
        b.x /= b.count;
        b.y /= b.count;
      }
    }
    return out;
  }, [clusters, layout.nodes]);

  const nodeNeighbors = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const e of layout.edges) {
      if (!m.has(e.source)) m.set(e.source, new Set());
      if (!m.has(e.target)) m.set(e.target, new Set());
      m.get(e.source)!.add(e.target);
      m.get(e.target)!.add(e.source);
    }
    return m;
  }, [layout.edges]);

  const activeNode = hoverNode ?? pinnedNode;

  const toggleSystem = useCallback((id: SystemId) => {
    setOffSystems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isNodeActive = useCallback(
    (n: ConstellationNode) => {
      if (offSystems.has(n.system)) return false;
      if (!activeNode && !hoverCluster) return true;
      if (hoverCluster) return n.clusterIds.includes(hoverCluster);
      if (activeNode === n.id) return true;
      const neigh = nodeNeighbors.get(activeNode!);
      return neigh?.has(n.id) ?? false;
    },
    [offSystems, activeNode, hoverCluster, nodeNeighbors],
  );

  const isEdgeActive = useCallback(
    (e: ConstellationEdge) => {
      const sn = nodeById.get(e.source);
      const tn = nodeById.get(e.target);
      if (!sn || !tn) return false;
      if (offSystems.has(sn.system) || offSystems.has(tn.system)) return false;
      if (!activeNode && !hoverCluster) return true;
      if (hoverCluster) return e.clusterId === hoverCluster;
      return e.source === activeNode || e.target === activeNode;
    },
    [nodeById, offSystems, activeNode, hoverCluster],
  );

  // Zoom & pan.
  const draggingRef = useRef<{ x: number; y: number } | null>(null);
  const onWheel = useCallback(
    (e: React.WheelEvent<SVGSVGElement>) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.0015;
      setK((prev) => Math.min(4, Math.max(0.5, prev * (1 + delta))));
    },
    [],
  );
  const onPointerDown = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (e.target !== svgRef.current) {
        // tap node handled separately; still enable drag from background
        const tagName = (e.target as Element).tagName;
        if (tagName !== "svg" && tagName !== "g") return;
      }
      draggingRef.current = { x: e.clientX - tx, y: e.clientY - ty };
      (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId);
    },
    [tx, ty],
  );
  const onPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!draggingRef.current) return;
    setTx(e.clientX - draggingRef.current.x);
    setTy(e.clientY - draggingRef.current.y);
  }, []);
  const onPointerUp = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    draggingRef.current = null;
    try {
      (e.currentTarget as SVGSVGElement).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  }, []);

  // Close pinned tooltip when clicking empty space.
  useEffect(() => {
    if (!pinnedNode) return;
    const onDoc = (e: MouseEvent) => {
      const el = e.target as Element;
      if (!el.closest?.("[data-constellation-node]")) setPinnedNode(null);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [pinnedNode]);

  const handleNodeClick = (id: string) => {
    const n = nodeById.get(id);
    if (!n) return;
    // On touch / first tap, pin for tooltip; on second tap or if already pinned, navigate.
    if (pinnedNode === id || hoverNode === id) {
      router.push(`/${n.system}/archetype/${n.slug}`);
    } else {
      setPinnedNode(id);
    }
  };

  const tooltipNode = activeNode ? nodeById.get(activeNode) : null;
  const tooltipMeta = tooltipNode ? nodeMeta[tooltipNode.id] : null;

  return (
    <div className="relative w-full">
      {/* System filter pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {systems.map((s) => {
          const off = offSystems.has(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => toggleSystem(s.id)}
              aria-pressed={!off}
              className="font-mono text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-sm border transition-all"
              style={{
                borderColor: off ? "rgba(255,255,255,0.12)" : s.accent,
                color: off ? "var(--color-muted)" : s.accent,
                background: off ? "transparent" : `${s.accent}12`,
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle"
                style={{
                  background: off ? "transparent" : s.accent,
                  boxShadow: off ? "none" : `0 0 6px ${s.accent}`,
                  border: off ? `1px solid ${s.accent}60` : "none",
                }}
              />
              {s.name}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => {
            setOffSystems(new Set());
            setPinnedNode(null);
          }}
          className="font-mono text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-sm border border-surface-light/40 text-text-secondary/70 hover:border-gold/40 hover:text-gold transition-colors ml-auto"
        >
          Reset
        </button>
      </div>

      {/* SVG stage */}
      <div
        className="relative w-full rounded-sm border border-surface-light/30 overflow-hidden"
        style={{
          aspectRatio: `${layout.width} / ${layout.height}`,
          background:
            "radial-gradient(ellipse at center, rgba(14,14,20,0.9) 0%, rgba(6,6,10,1) 75%)",
        }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Resonance constellation — cross-system archetype network"
          className="no-contrast-boost w-full h-full select-none touch-none"
          data-dim={activeNode || hoverCluster ? "true" : "false"}
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ cursor: "grab" }}
        >
          <defs>
            <filter id="constellation-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="constellation-glow-strong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g transform={`translate(${tx} ${ty}) scale(${k})`}>
            {/* Edges */}
            <g>
              {layout.edges.map((e, i) => {
                const sn = nodeById.get(e.source);
                const tn = nodeById.get(e.target);
                if (!sn || !tn) return null;
                const style = EDGE_STYLE[e.confidence] ?? EDGE_STYLE.moderate;
                const active = isEdgeActive(e);
                const color =
                  style.stroke === "currentColor"
                    ? systemAccent[sn.system] ?? "#888"
                    : style.stroke;
                return (
                  <line
                    key={i}
                    x1={sn.x}
                    y1={sn.y}
                    x2={tn.x}
                    y2={tn.y}
                    stroke={color}
                    strokeWidth={style.width}
                    strokeDasharray={style.dash}
                    strokeLinecap="round"
                    opacity={active ? style.opacity : 0.04}
                    style={{ transition: "opacity 240ms ease" }}
                  />
                );
              })}
            </g>

            {/* Cluster labels */}
            <g>
              {clusters.map((c) => {
                const centroid = clusterCentroids[c.id];
                if (!centroid || !centroid.count) return null;
                const active = hoverCluster === c.id;
                return (
                  <text
                    key={c.id}
                    x={centroid.x}
                    y={centroid.y - 4}
                    textAnchor="middle"
                    className="font-mono pointer-events-auto cursor-default"
                    fontSize={11}
                    letterSpacing={2}
                    fill="var(--color-gold)"
                    opacity={active ? 0.95 : activeNode ? 0.18 : 0.42}
                    style={{ textTransform: "uppercase", transition: "opacity 240ms ease" }}
                    onMouseEnter={() => setHoverCluster(c.id)}
                    onMouseLeave={() => setHoverCluster(null)}
                  >
                    {c.theme.split("—")[0].trim().split(" - ")[0].trim()}
                  </text>
                );
              })}
            </g>

            {/* Nodes */}
            <g>
              {layout.nodes.map((n) => {
                const r = 3.5 + Math.sqrt(n.degree) * 1.3;
                const active = isNodeActive(n);
                const isHover = activeNode === n.id;
                const accent = systemAccent[n.system] ?? "#888";
                const off = offSystems.has(n.system);
                return (
                  <g
                    key={n.id}
                    data-constellation-node
                    transform={`translate(${n.x} ${n.y})`}
                    style={{
                      cursor: "pointer",
                      opacity: off ? 0.15 : active ? 1 : 0.18,
                      transition: "opacity 240ms ease",
                    }}
                    onMouseEnter={() => setHoverNode(n.id)}
                    onMouseLeave={() => setHoverNode(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNodeClick(n.id);
                    }}
                  >
                    <circle
                      r={r + 4}
                      fill={accent}
                      opacity={isHover ? 0.25 : 0.08}
                      filter="url(#constellation-glow-strong)"
                    />
                    <circle
                      r={r}
                      fill={off ? "transparent" : accent}
                      stroke={accent}
                      strokeWidth={off ? 1 : 0}
                      filter="url(#constellation-glow)"
                    />
                    <title>{nodeMeta[n.id]?.displayName ?? n.slug}</title>
                  </g>
                );
              })}
            </g>
          </g>
        </svg>

        {/* Tooltip */}
        {tooltipNode && tooltipMeta ? (
          <div
            className="pointer-events-none absolute z-10 rounded-sm border border-surface-light/50 bg-surface/95 backdrop-blur-sm px-3 py-2 shadow-xl"
            style={{
              left: `${(tooltipNode.x / layout.width) * 100}%`,
              top: `${(tooltipNode.y / layout.height) * 100}%`,
              transform: "translate(-50%, calc(-100% - 14px))",
              minWidth: 180,
              maxWidth: 260,
            }}
          >
            <div
              className="font-mono text-[9px] tracking-[0.25em] uppercase mb-1"
              style={{ color: systemAccent[tooltipNode.system] ?? "var(--color-gold)" }}
            >
              {systems.find((s) => s.id === tooltipNode.system)?.name ?? tooltipNode.system}
            </div>
            <div className="font-serif text-base leading-tight text-text-primary">
              {tooltipMeta.displayName}
            </div>
            {tooltipMeta.clusterNames.length > 0 ? (
              <div className="mt-1.5 font-serif italic text-[11px] text-text-secondary/80 leading-snug">
                {tooltipMeta.clusterNames.slice(0, 3).join(" · ")}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* Zoom hint */}
        <div className="absolute bottom-2 right-3 font-mono text-[8px] tracking-[0.25em] uppercase text-muted/60 pointer-events-none">
          scroll · zoom   drag · pan
        </div>
      </div>
    </div>
  );
}
