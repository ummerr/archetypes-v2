"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  boyName: string;
  manName: string;
  color: string;
  boyShadowActive: string;
  boyShadowPassive: string;
  manShadowActive: string;
  manShadowPassive: string;
  maturity: "boy" | "man";
}

/**
 * Concentric visualization: the Boy archetype lives as a luminous core
 * inside the Man archetype's containing ring. Shadows orbit on either side.
 * Shows how mature masculinity holds and integrates the boy within.
 */
export default function BoyWithinMan({
  boyName,
  manName,
  color,
  boyShadowActive,
  boyShadowPassive,
  manShadowActive,
  manShadowPassive,
  maturity,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cx = 240;
  const cy = 200;
  const manR = 130;
  const boyR = 52;
  const shadowOrbitR = 170;

  // Muted version of color for secondary elements
  const dimColor = `${color}40`;
  const faintColor = `${color}18`;
  const glowColor = `${color}30`;

  return (
    <div className="relative w-full flex justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 480 400"
        className="w-full max-w-[480px]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.92)",
          transition: "opacity 1s cubic-bezier(0.19,1,0.22,1), transform 1.2s cubic-bezier(0.19,1,0.22,1)",
        }}
      >
        <defs>
          {/* Glow filter for boy core */}
          <radialGradient id="boyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="60%" stopColor={color} stopOpacity="0.08" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>

          {/* Subtle ambient glow behind man ring */}
          <radialGradient id="manAmbient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="60%" stopColor={color} stopOpacity="0.04" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>

          {/* Pulse animation for boy core */}
          <filter id="boyBlur">
            <feGaussianBlur stdDeviation="6" />
          </filter>

          <filter id="shadowBlur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* ── Background ambient ── */}
        <circle cx={cx} cy={cy} r={manR + 40} fill="url(#manAmbient)" />

        {/* ── Initiation zone: the space between boy and man ── */}
        {/* Dashed rings representing the journey of maturation */}
        {[72, 90, 110].map((r, i) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={dimColor}
            strokeWidth="0.5"
            strokeDasharray={i === 1 ? "3 8" : "1 6"}
            style={{
              opacity: visible ? [0.5, 0.35, 0.2][i] : 0,
              transition: `opacity ${1.5 + i * 0.3}s ease ${0.3 + i * 0.15}s`,
            }}
          >
            {/* Slow rotation for the middle ring */}
            {i === 1 && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${cx} ${cy}`}
                to={`360 ${cx} ${cy}`}
                dur="90s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}

        {/* ── Man archetype: outer containing ring ── */}
        <circle
          cx={cx}
          cy={cy}
          r={manR}
          fill="none"
          stroke={color}
          strokeWidth={maturity === "man" ? "2" : "1"}
          style={{
            opacity: visible ? (maturity === "man" ? 0.7 : 0.35) : 0,
            transition: "opacity 1.2s ease 0.2s",
          }}
        />
        {/* Second outer ring — faint echo */}
        <circle
          cx={cx}
          cy={cy}
          r={manR + 14}
          fill="none"
          stroke={dimColor}
          strokeWidth="0.5"
          strokeDasharray="2 10"
          style={{
            opacity: visible ? 0.3 : 0,
            transition: "opacity 1.5s ease 0.5s",
          }}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${cx} ${cy}`}
            to={`-360 ${cx} ${cy}`}
            dur="120s"
            repeatCount="indefinite"
          />
        </circle>

        {/* ── Man label (top of ring) ── */}
        <text
          x={cx}
          y={cy - manR - 22}
          textAnchor="middle"
          className="font-serif"
          style={{
            fill: color,
            fontSize: maturity === "man" ? "15px" : "11px",
            opacity: visible ? (maturity === "man" ? 0.9 : 0.5) : 0,
            transition: "opacity 1s ease 0.6s",
            letterSpacing: "0.06em",
          }}
        >
          {manName}
        </text>
        <text
          x={cx}
          y={cy - manR - 8}
          textAnchor="middle"
          className="font-sans"
          style={{
            fill: color,
            fontSize: "8px",
            opacity: visible ? 0.25 : 0,
            transition: "opacity 1s ease 0.8s",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Man
        </text>

        {/* ── Radial lines from boy to man ring (initiation paths) ── */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = cx + Math.cos(rad) * (boyR + 8);
          const y1 = cy + Math.sin(rad) * (boyR + 8);
          const x2 = cx + Math.cos(rad) * (manR - 8);
          const y2 = cy + Math.sin(rad) * (manR - 8);
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={faintColor}
              strokeWidth="0.5"
              strokeDasharray="2 6"
              style={{
                opacity: visible ? 0.6 : 0,
                transition: `opacity 1.5s ease ${0.5 + (angle / 360) * 0.5}s`,
              }}
            />
          );
        })}

        {/* ── Boy archetype: inner luminous core ── */}
        {/* Glow */}
        <circle
          cx={cx}
          cy={cy}
          r={boyR + 20}
          fill="url(#boyGlow)"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1.5s ease 0.4s",
          }}
        >
          <animate
            attributeName="r"
            values={`${boyR + 16};${boyR + 24};${boyR + 16}`}
            dur="5s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Boy ring */}
        <circle
          cx={cx}
          cy={cy}
          r={boyR}
          fill={`${color}06`}
          stroke={color}
          strokeWidth={maturity === "boy" ? "2" : "1.5"}
          style={{
            opacity: visible ? (maturity === "boy" ? 0.9 : 0.7) : 0,
            transition: "opacity 1s ease 0.3s",
          }}
        />

        {/* Boy label (center) */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          className="font-serif"
          style={{
            fill: color,
            fontSize: maturity === "boy" ? "13px" : "11px",
            opacity: visible ? (maturity === "boy" ? 0.95 : 0.7) : 0,
            transition: "opacity 1s ease 0.7s",
            letterSpacing: "0.04em",
          }}
        >
          {boyName}
        </text>
        <text
          x={cx}
          y={cy + 8}
          textAnchor="middle"
          className="font-sans"
          style={{
            fill: color,
            fontSize: "7px",
            opacity: visible ? 0.3 : 0,
            transition: "opacity 1s ease 0.9s",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Boy
        </text>

        {/* ── Center dot: the Self ── */}
        <circle
          cx={cx}
          cy={cy + 22}
          r="2"
          fill={color}
          style={{
            opacity: visible ? 0.5 : 0,
            transition: "opacity 1.5s ease 1s",
          }}
        >
          <animate
            attributeName="opacity"
            values="0.3;0.7;0.3"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>

        {/* ── Shadow poles — orbiting markers on the man ring ── */}
        {/* Man Active Shadow (left) */}
        <g
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease 0.8s",
          }}
        >
          <circle
            cx={cx - shadowOrbitR}
            cy={cy}
            r="5"
            fill="#C0392B"
            opacity="0.15"
            filter="url(#shadowBlur)"
          />
          <circle
            cx={cx - shadowOrbitR}
            cy={cy}
            r="3"
            fill="none"
            stroke="#C0392B"
            strokeWidth="1"
            opacity="0.5"
          />
          <text
            x={cx - shadowOrbitR}
            y={cy - 14}
            textAnchor="middle"
            className="font-sans"
            style={{
              fill: "#E74C3C",
              fontSize: "7px",
              opacity: 0.5,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Active
          </text>
          <text
            x={cx - shadowOrbitR}
            y={cy + 18}
            textAnchor="middle"
            className="font-serif"
            style={{
              fill: "#E74C3C",
              fontSize: "9px",
              opacity: 0.45,
            }}
          >
            {manShadowActive}
          </text>
        </g>

        {/* Man Passive Shadow (right) */}
        <g
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease 1s",
          }}
        >
          <circle
            cx={cx + shadowOrbitR}
            cy={cy}
            r="5"
            fill="#5C5A52"
            opacity="0.15"
            filter="url(#shadowBlur)"
          />
          <circle
            cx={cx + shadowOrbitR}
            cy={cy}
            r="3"
            fill="none"
            stroke="#5C5A52"
            strokeWidth="1"
            opacity="0.5"
          />
          <text
            x={cx + shadowOrbitR}
            y={cy - 14}
            textAnchor="middle"
            className="font-sans"
            style={{
              fill: "#8A8578",
              fontSize: "7px",
              opacity: 0.5,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Passive
          </text>
          <text
            x={cx + shadowOrbitR}
            y={cy + 18}
            textAnchor="middle"
            className="font-serif"
            style={{
              fill: "#8A8578",
              fontSize: "9px",
              opacity: 0.45,
            }}
          >
            {manShadowPassive}
          </text>
        </g>

        {/* ── Connecting lines from center to shadow poles ── */}
        <line
          x1={cx - manR}
          y1={cy}
          x2={cx - shadowOrbitR + 8}
          y2={cy}
          stroke="#C0392B"
          strokeWidth="0.5"
          strokeDasharray="2 5"
          style={{
            opacity: visible ? 0.2 : 0,
            transition: "opacity 1.5s ease 1s",
          }}
        />
        <line
          x1={cx + manR}
          y1={cy}
          x2={cx + shadowOrbitR - 8}
          y2={cy}
          stroke="#5C5A52"
          strokeWidth="0.5"
          strokeDasharray="2 5"
          style={{
            opacity: visible ? 0.2 : 0,
            transition: "opacity 1.5s ease 1s",
          }}
        />

        {/* ── Boy shadow indicators (smaller, inside the transition zone) ── */}
        {/* Boy Active Shadow (upper-left) */}
        <g
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease 1.1s",
          }}
        >
          <circle
            cx={cx - 95}
            cy={cy - 68}
            r="2"
            fill="#C0392B"
            opacity="0.3"
          />
          <text
            x={cx - 95}
            y={cy - 78}
            textAnchor="middle"
            className="font-serif"
            style={{
              fill: "#E74C3C",
              fontSize: "7px",
              opacity: 0.3,
            }}
          >
            {boyShadowActive}
          </text>
        </g>

        {/* Boy Passive Shadow (upper-right) */}
        <g
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease 1.2s",
          }}
        >
          <circle
            cx={cx + 95}
            cy={cy - 68}
            r="2"
            fill="#5C5A52"
            opacity="0.3"
          />
          <text
            x={cx + 95}
            y={cy - 78}
            textAnchor="middle"
            className="font-serif"
            style={{
              fill: "#8A8578",
              fontSize: "7px",
              opacity: 0.3,
            }}
          >
            {boyShadowPassive}
          </text>
        </g>

        {/* ── Bottom annotation ── */}
        <text
          x={cx}
          y={cy + manR + 44}
          textAnchor="middle"
          className="font-sans"
          style={{
            fill: color,
            fontSize: "8px",
            opacity: visible ? 0.2 : 0,
            transition: "opacity 1.5s ease 1.3s",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          {maturity === "boy" ? "The seed within the man" : "The boy he carries within"}
        </text>
      </svg>
    </div>
  );
}
