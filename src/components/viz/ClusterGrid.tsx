"use client";

import Link from "next/link";
import { useState } from "react";
import type { ConfidenceTier } from "@/data/resonance";
import { CLUSTERS } from "@/data/resonance";
import { CLUSTER_AXES, STAGE_LABELS, AFFECT_LABELS, STANCE_LABELS } from "@/data/atlas-lens-axes";
import ClusterTotem from "./ClusterTotem";

const TIER_ORDER: ConfidenceTier[] = ["canonical", "strong", "moderate", "speculative", "contested"];
const TIER_COLOR: Record<ConfidenceTier, string> = {
  canonical: "#e6c47a",
  strong: "#a8c97a",
  moderate: "#7aa3d9",
  speculative: "#b884e6",
  contested: "#d9734a",
};

interface Props {
  onHoverCluster?: (id: string | null) => void;
}

export default function ClusterGrid({ onHoverCluster }: Props) {
  const [hoverId, setHoverId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {CLUSTERS.map((cluster) => {
        const axes = CLUSTER_AXES[cluster.id];
        const counts: Record<ConfidenceTier, number> = {
          canonical: 0, strong: 0, moderate: 0, speculative: 0, contested: 0,
        };
        for (const a of cluster.archetypes) counts[a.confidence]++;
        const total = cluster.archetypes.length;
        const theme = cluster.theme.split("—")[0].trim().split(" - ")[0].trim();
        const tagline = cluster.theme.split("—")[1]?.trim() ?? cluster.theme.split(" - ")[1]?.trim() ?? "";
        const active = hoverId === cluster.id;
        return (
          <Link
            key={cluster.id}
            href={`/atlas/cluster/${cluster.id}`}
            onMouseEnter={() => { setHoverId(cluster.id); onHoverCluster?.(cluster.id); }}
            onMouseLeave={() => { setHoverId(null); onHoverCluster?.(null); }}
            className="group block rounded-sm border p-4 transition-all"
            style={{
              borderColor: active ? axes?.motifColor ?? "var(--color-gold)" : "rgba(255,255,255,0.12)",
              background: active ? `${axes?.motifColor ?? "#e6c47a"}08` : "transparent",
            }}
          >
            <div className="flex items-start gap-3 mb-2">
              <div
                className="shrink-0 rounded-sm p-1.5 border transition-colors"
                style={{
                  borderColor: active ? `${axes?.motifColor}60` : "rgba(255,255,255,0.08)",
                  background: "rgba(6,6,10,0.6)",
                }}
              >
                <ClusterTotem id={cluster.id} size="md" title={theme} />
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-base md:text-lg font-medium leading-tight">{theme}</h3>
                {tagline ? (
                  <p className="font-serif italic text-xs text-text-secondary/70 leading-snug mt-0.5 line-clamp-2">
                    {tagline}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-2 flex h-1 w-full rounded-sm overflow-hidden bg-surface-light/20">
              {TIER_ORDER.map((t) =>
                counts[t] > 0 ? (
                  <div key={t} style={{
                    width: `${(counts[t] / total) * 100}%`,
                    background: TIER_COLOR[t],
                  }} />
                ) : null,
              )}
            </div>

            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-kicker tracking-label uppercase text-text-secondary/60">
              {axes ? (
                <>
                  <span>{STAGE_LABELS[axes.stage]}</span>
                  <span>· {AFFECT_LABELS[axes.affect].split(" · ")[0]}</span>
                  <span>· {STANCE_LABELS[axes.stance]}</span>
                </>
              ) : null}
              <span className="ml-auto">{total} archetypes</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
