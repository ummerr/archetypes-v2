import { confidenceLabel } from "@/lib/resonance";
import type { ConfidenceTier } from "@/data/resonance";

interface Props {
  tier: ConfidenceTier;
  color?: string;
  className?: string;
}

const TIER_STYLE: Record<ConfidenceTier, { bg: string; fg: string; ring: string }> = {
  canonical: { bg: "transparent", fg: "currentColor", ring: "currentColor" },
  strong: { bg: "transparent", fg: "currentColor", ring: "currentColor" },
  moderate: { bg: "transparent", fg: "currentColor", ring: "currentColor" },
  speculative: { bg: "transparent", fg: "#a78155", ring: "#a78155" },
  contested: { bg: "#f59e0b22", fg: "#f59e0b", ring: "#f59e0b" },
};

export default function ConfidenceBadge({ tier, color, className = "" }: Props) {
  const s = TIER_STYLE[tier];
  const fg = tier === "canonical" || tier === "strong" || tier === "moderate" ? color ?? s.fg : s.fg;
  const ring = tier === "canonical" || tier === "strong" || tier === "moderate" ? color ?? s.ring : s.ring;
  return (
    <span
      className={`inline-flex items-center font-mono text-kicker tracking-kicker uppercase px-1.5 py-0.5 rounded-sm ${className}`}
      style={{
        color: fg,
        background: s.bg,
        border: `1px solid ${ring}${tier === "contested" ? "" : "55"}`,
        opacity: tier === "canonical" ? 1 : tier === "strong" ? 0.92 : tier === "moderate" ? 0.78 : 0.85,
      }}
      title={confidenceLabel(tier)}
    >
      {confidenceLabel(tier)}
    </span>
  );
}
