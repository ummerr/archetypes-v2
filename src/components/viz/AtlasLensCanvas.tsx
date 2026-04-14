"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import type { SystemId } from "@/data/resonance";
import type {
  ConstellationLayout,
  ConstellationNode,
} from "./ResonanceConstellation";
import {
  STAGES,
  STAGE_LABELS,
  AFFECTS,
  AFFECT_LABELS,
  AFFECT_ACCENT,
  STANCES,
  STANCE_LABELS,
  archetypeAxes,
  type Stage,
  type Affect,
  type Stance,
} from "@/data/atlas-lens-axes";

export type Lens = "arc" | "wheel" | "triad" | "web";

export interface LensSystemMeta {
  id: SystemId;
  name: string;
  accent: string;
}

export interface LensClusterMeta {
  id: string;
  theme: string;
  shortTheme: string;
}

export interface LensNodeMeta {
  displayName: string;
  clusterNames: string[];
}

interface Props {
  layout: ConstellationLayout;
  systems: LensSystemMeta[];
  clusters: LensClusterMeta[];
  nodeMeta: Record<string, LensNodeMeta>;
  highlightClusterId?: string | null;
  onHighlightCluster?: (id: string | null) => void;
}

const W = 1000;
const H = 640;

const LENS_TABS: { id: Lens; label: string; kicker: string; note: string }[] = [
  {
    id: "arc",
    label: "Developmental Arc",
    kicker: "Stage",
    note: "Pre-initiation to integration. Archetypes as a maturation flow.",
  },
  {
    id: "wheel",
    label: "Affect Wheel",
    kicker: "Feeling",
    note: "Gut, heart, head, eros — the four seats of felt motivation.",
  },
  {
    id: "triad",
    label: "Relational Triad",
    kicker: "Stance",
    note: "Horney's toward / against / away postures toward the world.",
  },
  {
    id: "web",
    label: "Resonance Web",
    kicker: "Network",
    note: "The raw cross-tradition constellation, every tie at once.",
  },
];

// ---------- Layouts ----------

type Pos = { x: number; y: number };

function layoutArc(nodes: ConstellationNode[]): Record<string, Pos> {
  const out: Record<string, Pos> = {};
  const laneX = (s: Stage) => {
    const i = STAGES.indexOf(s);
    return 100 + (i * (W - 200)) / (STAGES.length - 1);
  };
  const byStage: Record<Stage, ConstellationNode[]> = {
    "pre-initiation": [], striving: [], liminal: [], integrating: [], integrated: [],
  };
  for (const n of nodes) {
    const s = archetypeAxes(n.clusterIds).stage;
    byStage[s].push(n);
  }
  for (const stage of STAGES) {
    const list = byStage[stage];
    const cx = laneX(stage);
    const cols = Math.ceil(Math.sqrt(list.length || 1));
    const spacing = 26;
    list.forEach((n, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const rows = Math.ceil(list.length / cols);
      out[n.id] = {
        x: cx + (col - (cols - 1) / 2) * spacing,
        y: H / 2 + (row - (rows - 1) / 2) * spacing,
      };
    });
  }
  return out;
}

function layoutWheel(nodes: ConstellationNode[]): Record<string, Pos> {
  const out: Record<string, Pos> = {};
  const cx = W / 2;
  const cy = H / 2;
  const sectorAngle: Record<Affect, number> = {
    gut: -Math.PI / 2,          // top
    heart: 0,                   // right
    eros: Math.PI / 2,          // bottom
    head: Math.PI,              // left
  };
  const byAffect: Record<Affect, ConstellationNode[]> = {
    gut: [], heart: [], head: [], eros: [],
  };
  for (const n of nodes) byAffect[archetypeAxes(n.clusterIds).affect].push(n);
  const R_OUTER = 260;
  for (const a of AFFECTS) {
    const list = byAffect[a];
    const center = sectorAngle[a];
    list.forEach((n, i) => {
      const ring = Math.floor(i / 8);
      const slot = i % 8;
      const slots = Math.min(8, list.length - ring * 8);
      const spread = 0.7; // radians half-width
      const theta = center - spread + (slot / Math.max(1, slots - 1)) * spread * 2;
      const r = 120 + ring * 50;
      out[n.id] = {
        x: cx + Math.cos(theta) * Math.min(r, R_OUTER),
        y: cy + Math.sin(theta) * Math.min(r, R_OUTER),
      };
    });
  }
  return out;
}

function layoutTriad(nodes: ConstellationNode[]): Record<string, Pos> {
  const out: Record<string, Pos> = {};
  const cx = W / 2;
  const cy = H / 2 + 30;
  const R = 250;
  const VERTS: Record<Stance, Pos> = {
    toward: { x: cx, y: cy - R },
    against: { x: cx + R * Math.cos(Math.PI / 6), y: cy + R * Math.sin(Math.PI / 6) },
    away: { x: cx - R * Math.cos(Math.PI / 6), y: cy + R * Math.sin(Math.PI / 6) },
  };
  const byStance: Record<Stance, ConstellationNode[]> = {
    toward: [], against: [], away: [],
  };
  for (const n of nodes) byStance[archetypeAxes(n.clusterIds).stance].push(n);
  for (const s of STANCES) {
    const v = VERTS[s];
    const list = byStance[s];
    const cols = Math.ceil(Math.sqrt(list.length || 1));
    const spacing = 24;
    list.forEach((n, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const rows = Math.ceil(list.length / cols);
      // Cluster near vertex with small offset toward centroid
      const tx = v.x + (col - (cols - 1) / 2) * spacing;
      const ty = v.y + (row - (rows - 1) / 2) * spacing;
      // pull slightly toward triangle centroid
      const pull = 0.15;
      out[n.id] = {
        x: tx + (cx - tx) * pull,
        y: ty + (cy - ty) * pull,
      };
    });
  }
  return out;
}

function layoutWeb(
  nodes: ConstellationNode[],
  srcW: number,
  srcH: number,
): Record<string, Pos> {
  const out: Record<string, Pos> = {};
  const sx = W / srcW;
  const sy = H / srcH;
  for (const n of nodes) {
    out[n.id] = { x: n.x * sx, y: n.y * sy };
  }
  return out;
}

// ---------- Component ----------

export default function AtlasLensCanvas({
  layout,
  systems,
  clusters,
  nodeMeta,
  highlightClusterId,
  onHighlightCluster,
}: Props) {
  const router = useRouter();
  const [lens, setLens] = useState<Lens>("arc");
  const [offSystems, setOffSystems] = useState<Set<SystemId>>(new Set());
  const [hoverNode, setHoverNode] = useState<string | null>(null);
  const [hoverCluster, setHoverClusterLocal] = useState<string | null>(null);

  const activeCluster = highlightClusterId ?? hoverCluster;
  const setHoverCluster = (id: string | null) => {
    setHoverClusterLocal(id);
    onHighlightCluster?.(id);
  };

  const systemAccent = useMemo(() => {
    const m: Record<string, string> = {};
    for (const s of systems) m[s.id] = s.accent;
    return m;
  }, [systems]);

  const positions = useMemo(() => {
    switch (lens) {
      case "arc": return layoutArc(layout.nodes);
      case "wheel": return layoutWheel(layout.nodes);
      case "triad": return layoutTriad(layout.nodes);
      case "web": return layoutWeb(layout.nodes, layout.width, layout.height);
    }
  }, [lens, layout]);

  const activeTab = LENS_TABS.find((t) => t.id === lens)!;

  const toggleSystem = (id: SystemId) => {
    setOffSystems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isDim = (n: ConstellationNode) => {
    if (offSystems.has(n.system)) return true;
    if (activeCluster && !n.clusterIds.includes(activeCluster)) return true;
    return false;
  };

  const hoveredMeta = hoverNode ? nodeMeta[hoverNode] : null;
  const hoveredNode = hoverNode
    ? layout.nodes.find((n) => n.id === hoverNode)
    : null;
  const hoveredPos = hoveredNode ? positions[hoveredNode.id] : null;

  return (
    <div className="relative w-full">
      {/* Tab bar */}
      <div className="flex flex-wrap gap-1.5 mb-3 border-b border-surface-light/30 pb-3">
        {LENS_TABS.map((t) => {
          const active = lens === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setLens(t.id)}
              aria-pressed={active}
              className="relative font-mono text-[10px] tracking-[0.25em] uppercase px-3 py-2 rounded-sm border transition-all"
              style={{
                borderColor: active ? "var(--color-gold)" : "rgba(255,255,255,0.12)",
                color: active ? "var(--color-gold)" : "var(--color-muted)",
                background: active ? "rgba(230,196,122,0.08)" : "transparent",
              }}
            >
              <span className="opacity-60 mr-2">{t.kicker}</span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Note */}
      <p className="font-serif italic text-sm text-text-secondary/80 mb-3">{activeTab.note}</p>

      {/* System pills */}
      <div className="flex flex-wrap gap-2 mb-3">
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
        {(offSystems.size > 0 || activeCluster) && (
          <button
            type="button"
            onClick={() => {
              setOffSystems(new Set());
              setHoverCluster(null);
            }}
            className="font-mono text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-sm border border-surface-light/40 text-text-secondary/70 hover:border-gold/40 hover:text-gold transition-colors ml-auto"
          >
            Reset
          </button>
        )}
      </div>

      {/* Canvas */}
      <div
        className="relative w-full rounded-sm border border-surface-light/30 overflow-hidden"
        style={{
          aspectRatio: `${W} / ${H}`,
          background:
            "radial-gradient(ellipse at center, rgba(14,14,20,0.95) 0%, rgba(6,6,10,1) 80%)",
        }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          className="no-contrast-boost w-full h-full select-none"
        >
          <defs>
            <filter id="lens-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Lens chrome */}
          <AnimatePresence mode="wait">
            <motion.g key={lens}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}>
              {lens === "arc" && <ArcChrome />}
              {lens === "wheel" && <WheelChrome />}
              {lens === "triad" && <TriadChrome />}
              {lens === "web" && <WebEdges layout={layout} positions={positions} offSystems={offSystems} activeCluster={activeCluster} systemAccent={systemAccent} />}
            </motion.g>
          </AnimatePresence>

          {/* Nodes */}
          <g>
            {layout.nodes.map((n) => {
              const p = positions[n.id];
              if (!p) return null;
              const dim = isDim(n);
              const r = 3.5 + Math.sqrt(n.degree) * 1.2;
              const accent = systemAccent[n.system] ?? "#888";
              const isHover = hoverNode === n.id;
              return (
                <motion.g
                  key={n.id}
                  initial={false}
                  animate={{ x: p.x, y: p.y, opacity: dim ? 0.12 : isHover ? 1 : 0.85 }}
                  transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.8 }}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoverNode(n.id)}
                  onMouseLeave={() => setHoverNode(null)}
                  onClick={() => router.push(`/${n.system}/archetype/${n.slug}`)}
                >
                  <circle r={r + 4} fill={accent} opacity={isHover ? 0.35 : 0.1} filter="url(#lens-glow)" />
                  <circle r={r} fill={accent} filter="url(#lens-glow)" />
                </motion.g>
              );
            })}
          </g>
        </svg>

        {/* Tooltip */}
        {hoveredNode && hoveredMeta && hoveredPos ? (
          <div
            className="pointer-events-none absolute z-10 rounded-sm border border-surface-light/50 bg-surface/95 backdrop-blur-sm px-3 py-2 shadow-xl"
            style={{
              left: `${(hoveredPos.x / W) * 100}%`,
              top: `${(hoveredPos.y / H) * 100}%`,
              transform: "translate(-50%, calc(-100% - 14px))",
              minWidth: 180,
              maxWidth: 260,
            }}
          >
            <div
              className="font-mono text-[9px] tracking-[0.25em] uppercase mb-1"
              style={{ color: systemAccent[hoveredNode.system] ?? "var(--color-gold)" }}
            >
              {systems.find((s) => s.id === hoveredNode.system)?.name ?? hoveredNode.system}
            </div>
            <div className="font-serif text-base leading-tight text-text-primary">
              {hoveredMeta.displayName}
            </div>
            {hoveredMeta.clusterNames.length > 0 ? (
              <div className="mt-1.5 font-serif italic text-[11px] text-text-secondary/80 leading-snug">
                {hoveredMeta.clusterNames.slice(0, 3).join(" · ")}
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="absolute bottom-2 right-3 font-mono text-[8px] tracking-[0.25em] uppercase text-muted/60 pointer-events-none">
          {layout.nodes.length} archetypes · {clusters.length} clusters
        </div>
      </div>
    </div>
  );
}

// ---------- Chrome per lens ----------

function ArcChrome() {
  return (
    <g>
      {STAGES.map((s, i) => {
        const x = 100 + (i * (W - 200)) / (STAGES.length - 1);
        return (
          <g key={s}>
            <line
              x1={x} y1={60} x2={x} y2={H - 60}
              stroke="currentColor" strokeOpacity={0.08}
              strokeDasharray="2 6"
            />
            <text x={x} y={40} textAnchor="middle" fontSize={11} letterSpacing={2}
              fill="var(--color-gold)" opacity={0.7}
              style={{ textTransform: "uppercase" }} className="font-mono">
              {STAGE_LABELS[s]}
            </text>
          </g>
        );
      })}
      <line x1={100} y1={H / 2} x2={W - 100} y2={H / 2}
        stroke="currentColor" strokeOpacity={0.12} />
    </g>
  );
}

function WheelChrome() {
  const cx = W / 2;
  const cy = H / 2;
  const label: { affect: Affect; x: number; y: number }[] = [
    { affect: "gut", x: cx, y: 40 },
    { affect: "heart", x: W - 30, y: cy },
    { affect: "eros", x: cx, y: H - 30 },
    { affect: "head", x: 30, y: cy },
  ];
  return (
    <g>
      {[80, 160, 240].map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r}
          fill="none" stroke="currentColor" strokeOpacity={0.08} strokeDasharray="2 6" />
      ))}
      <line x1={cx} y1={60} x2={cx} y2={H - 60} stroke="currentColor" strokeOpacity={0.08} />
      <line x1={60} y1={cy} x2={W - 60} y2={cy} stroke="currentColor" strokeOpacity={0.08} />
      {label.map((l) => (
        <text key={l.affect} x={l.x} y={l.y}
          textAnchor={l.x < cx ? "start" : l.x > cx ? "end" : "middle"}
          fontSize={11} letterSpacing={2}
          fill={AFFECT_ACCENT[l.affect]} opacity={0.9}
          style={{ textTransform: "uppercase" }} className="font-mono">
          {AFFECT_LABELS[l.affect]}
        </text>
      ))}
    </g>
  );
}

function TriadChrome() {
  const cx = W / 2;
  const cy = H / 2 + 30;
  const R = 250;
  const V = {
    toward: { x: cx, y: cy - R },
    against: { x: cx + R * Math.cos(Math.PI / 6), y: cy + R * Math.sin(Math.PI / 6) },
    away: { x: cx - R * Math.cos(Math.PI / 6), y: cy + R * Math.sin(Math.PI / 6) },
  };
  return (
    <g>
      <path d={`M${V.toward.x} ${V.toward.y} L${V.against.x} ${V.against.y} L${V.away.x} ${V.away.y} Z`}
        fill="none" stroke="currentColor" strokeOpacity={0.1} strokeDasharray="2 6" />
      {STANCES.map((s) => {
        const v = V[s];
        const offY = s === "toward" ? -18 : 24;
        return (
          <text key={s} x={v.x} y={v.y + offY} textAnchor="middle"
            fontSize={12} letterSpacing={2}
            fill="var(--color-gold)" opacity={0.8}
            style={{ textTransform: "uppercase" }} className="font-mono">
            {STANCE_LABELS[s]}
          </text>
        );
      })}
    </g>
  );
}

function WebEdges({
  layout,
  positions,
  offSystems,
  activeCluster,
  systemAccent,
}: {
  layout: ConstellationLayout;
  positions: Record<string, Pos>;
  offSystems: Set<SystemId>;
  activeCluster: string | null;
  systemAccent: Record<string, string>;
}) {
  const nodeById = useMemo(() => {
    const m = new Map<string, ConstellationNode>();
    for (const n of layout.nodes) m.set(n.id, n);
    return m;
  }, [layout.nodes]);
  return (
    <g>
      {layout.edges.map((e, i) => {
        const sn = nodeById.get(e.source);
        const tn = nodeById.get(e.target);
        if (!sn || !tn) return null;
        if (offSystems.has(sn.system) || offSystems.has(tn.system)) return null;
        const ps = positions[e.source];
        const pt = positions[e.target];
        if (!ps || !pt) return null;
        const active = !activeCluster || e.clusterId === activeCluster;
        return (
          <line
            key={i}
            x1={ps.x} y1={ps.y} x2={pt.x} y2={pt.y}
            stroke={systemAccent[sn.system] ?? "#888"}
            strokeWidth={e.confidence === "canonical" ? 1.3 : 0.9}
            strokeDasharray={e.confidence === "speculative" || e.confidence === "contested" ? "2 4" : undefined}
            opacity={active ? (e.confidence === "canonical" ? 0.45 : 0.22) : 0.05}
          />
        );
      })}
    </g>
  );
}
