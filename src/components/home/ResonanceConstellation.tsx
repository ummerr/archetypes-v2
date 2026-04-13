"use client";

import { useMemo } from "react";
import { SYSTEMS } from "@/data/systems";
import type { SystemId } from "@/data/resonance";
import { clusterCoincidence } from "@/lib/home-resonance";
import { useTheme } from "@/components/ThemeProvider";

interface Props {
  focusSystem: SystemId | null;
  activeSystems: Set<SystemId> | null;
  onHoverSystem: (id: SystemId | null) => void;
  size?: number;
}

export default function ResonanceConstellation({
  focusSystem,
  activeSystems,
  onHoverSystem,
  size = 360,
}: Props) {
  const { theme } = useTheme();
  const light = theme === "light";

  const nodes = useMemo(() => {
    const r = size * 0.38;
    const cx = size / 2;
    const cy = size / 2;
    return SYSTEMS.map((s, i) => {
      const angle = (-Math.PI / 2) + (i / SYSTEMS.length) * Math.PI * 2;
      return {
        id: s.id as SystemId,
        name: s.name,
        accent: light ? s.accentLight : s.accent,
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
      };
    });
  }, [size, light]);

  const edges = useMemo(() => {
    const out: { a: typeof nodes[number]; b: typeof nodes[number]; w: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const w = clusterCoincidence(nodes[i].id, nodes[j].id);
        if (w > 0) out.push({ a: nodes[i], b: nodes[j], w });
      }
    }
    return out;
  }, [nodes]);

  const maxW = Math.max(...edges.map((e) => e.w), 1);
  const dim = activeSystems !== null;

  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 motion-safe:animate-breathe-subtle"
        style={{ animationDuration: "9s" }}
      >
        <defs>
          <radialGradient id="const-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={light ? "#00000010" : "#C6A35518"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={size * 0.44} fill="url(#const-core)" />

        {edges.map(({ a, b, w }, i) => {
          const bothActive = activeSystems ? activeSystems.has(a.id) && activeSystems.has(b.id) : false;
          const touchesActive = activeSystems ? activeSystems.has(a.id) || activeSystems.has(b.id) : false;
          const base = 0.1 + (w / maxW) * 0.18;
          const opacity = dim ? (bothActive ? 0.7 : touchesActive ? 0.25 : 0.04) : base;
          const stroke = bothActive
            ? (focusSystem && (a.id === focusSystem || b.id === focusSystem)
                ? (focusSystem === a.id ? a.accent : b.accent)
                : a.accent)
            : light ? "#00000066" : "#C6A35566";
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={stroke}
              strokeWidth={bothActive ? 1 : 0.6}
              opacity={opacity}
              style={{ transition: "opacity 400ms ease, stroke 400ms ease" }}
            />
          );
        })}

        {nodes.map((n) => {
          const isFocus = focusSystem === n.id;
          const isActive = activeSystems ? activeSystems.has(n.id) : false;
          const opacity = dim ? (isActive ? 1 : 0.25) : 0.85;
          const outer = isFocus ? 11 : isActive ? 8 : 6;
          return (
            <g
              key={n.id}
              style={{
                transition: "opacity 400ms ease",
                opacity,
                cursor: "pointer",
              }}
              onMouseEnter={() => onHoverSystem(n.id)}
              onMouseLeave={() => onHoverSystem(null)}
              onTouchStart={() => onHoverSystem(n.id)}
            >
              <circle
                cx={n.x}
                cy={n.y}
                r={outer + 6}
                fill={n.accent}
                opacity={isFocus ? 0.18 : 0}
                style={{ transition: "opacity 400ms ease, r 400ms ease" }}
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={outer}
                fill={n.accent}
                style={{ transition: "r 400ms ease" }}
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={outer + 2}
                fill="none"
                stroke={n.accent}
                strokeWidth={0.6}
                opacity={0.35}
              />
              <text
                x={n.x}
                y={n.y + outer + 14}
                textAnchor="middle"
                className="font-mono"
                style={{
                  fontSize: 8,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fill: isFocus || isActive ? n.accent : light ? "#00000066" : "#ffffff55",
                  transition: "fill 400ms ease",
                }}
              >
                {n.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
