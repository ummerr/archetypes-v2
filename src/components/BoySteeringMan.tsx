"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FAMILIES } from "@/data/kwml/archetypes";
import type { ArchetypeFamilyGroup, ArchetypeFamily } from "@/types/archetype";
import { useTheme } from "@/components/ThemeProvider";

/* ═══════════════════════════════════════════════════════
   Data — shadow voices, behavioral signs, phase content
   ═══════════════════════════════════════════════════════ */

const SHADOW_VOICES: Record<
  string,
  { boy: string; boyPassive: string; bleeding: string; possessed: string }
> = {
  king: {
    boy: "Give it to me NOW. The world exists to serve me, and I will scream until it does.",
    boyPassive: "I can't do anything by myself... someone please just take care of everything.",
    bleeding:
      "I deserve special treatment. Don't they know who I am? Why won't they just obey?",
    possessed:
      "You will bow before me or I will destroy everything you love. I am the center of the universe and your feelings are irrelevant.",
  },
  warrior: {
    boy: "Watch me. I am invincible. Don't you dare question what I can do.",
    boyPassive: "I can't face it. Everyone is stronger than me. I'll just stay small.",
    bleeding:
      "Your weakness disgusts me. I don't have time for people who can't keep up.",
    possessed:
      "I will break you to prove my own strength. Your pain is evidence of my power, and I feel nothing about it.",
  },
  magician: {
    boy: "I already know more than all of you. Let me show you how foolish you really are.",
    boyPassive: "I don't understand anything... I'll just pretend I never saw it.",
    bleeding:
      "I could help them, but why should I? Knowledge is power, and I'm keeping mine.",
    possessed:
      "I see through everyone and share nothing. I pull strings from the shadows. If you knew what I know, it would destroy you — but I'll never tell.",
  },
  lover: {
    boy: "No one will ever love me the way I need. I'll keep searching everywhere, in everyone.",
    boyPassive: "Real connection hurts too much. I'll stay inside my fantasies where it's safe.",
    bleeding:
      "More. I need more of everything — more feeling, more intensity, more stimulation. Nothing is enough.",
    possessed:
      "I feel nothing anymore. The world is flat grey ash. I am cut off from everything alive, and I don't even care.",
  },
};

interface PhaseData {
  phase: string;
  label: string;
  description: string;
  signs: string[];
  voiceKey: "boy" | "boyPassive" | "bleeding" | "possessed";
}

function getPhaseData(
  family: ArchetypeFamilyGroup,
  possession: number
): PhaseData {
  const boy = family.boy;
  const man = family.man;

  if (possession < 0.25) {
    return {
      phase: "seed",
      label: "The Seed",
      description: `${boy.name} rests quietly inside ${man.name}. The boy's energy is integrated — his wonder, vitality, and enthusiasm fuel the man's mature power without distorting it. The man can access the boy's gifts because he is not identified with them.`,
      signs: [
        "Feels centered and calm in his authority",
        "Can be playful without losing adult perspective",
        "Draws creative energy from youthful enthusiasm",
        `Channels ${boy.name}'s gifts through ${man.name}'s structure`,
      ],
      voiceKey: "boy",
    };
  }
  if (possession < 0.5) {
    return {
      phase: "stirring",
      label: "The Stirring",
      description: `Something shifts beneath the surface. The boy's unresolved wounds start leaking into the man's behavior. ${boy.activeShadow.name} begins coloring decisions that should come from ${man.name}'s maturity. The man doesn't notice yet — he mistakes the boy's reactions for his own adult judgment.`,
      signs: [
        "Overreacts to perceived slights or challenges",
        "Rationalizes immature impulses as 'justified'",
        `Moments of ${boy.activeShadow.name} mistaken for strength`,
        "Close others notice subtle inconsistencies",
      ],
      voiceKey: "boyPassive",
    };
  }
  if (possession < 0.75) {
    return {
      phase: "hijacking",
      label: "The Hijacking",
      description: `The boy's shadow system is now actively running interference. ${man.name}'s decisions are increasingly made by ${boy.activeShadow.name} wearing an adult mask. The man oscillates between grandiose inflation and collapse — the bipolar shadow system of the uninitiated boy playing out through an adult body with adult consequences.`,
      signs: [
        `${boy.activeShadow.name} drives decisions, ${man.name} takes the blame`,
        "Oscillation between grandiosity and shame",
        "Relationships suffer from emotional whiplash",
        "Growing gap between public persona and private behavior",
      ],
      voiceKey: "bleeding",
    };
  }
  return {
    phase: "possession",
    label: "The Possession",
    description: `${boy.activeShadow.name} has taken the wheel. What the world sees as ${man.activeShadow.name} is actually a boy's shadow operating through a man's body — with a man's power and a man's reach but none of a man's wisdom. The mature ${man.name} is buried, his fullness inaccessible. The tragedy: the man may not know he's been overtaken.`,
    signs: [
      `${man.activeShadow.name} is actually ${boy.activeShadow.name} with adult power`,
      `${man.passiveShadow.name} is actually ${boy.passiveShadow.name} with adult despair`,
      "Others experience him as dangerous or absent",
      "Genuine maturity completely eclipsed",
    ],
    voiceKey: "possessed",
  };
}

/* ═══════════════════════════════════════════════════════
   Ambient particle canvas — uses refs to avoid re-mounts
   ═══════════════════════════════════════════════════════ */

function ParticleField({
  color,
  possession,
  light,
}: {
  color: string;
  possession: number;
  light: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const possRef = useRef(possession);
  const colorRef = useRef(color);
  const lightRef = useRef(light);
  const particlesRef = useRef<
    { x: number; y: number; vx: number; vy: number; r: number; phase: number }[]
  >([]);

  // Update refs without re-running the effect
  possRef.current = possession;
  colorRef.current = color;
  lightRef.current = light;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particlesRef.current.length === 0) {
        particlesRef.current = Array.from({ length: 60 }, () => ({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 2 + 0.5,
          phase: Math.random() * Math.PI * 2,
        }));
      }
    };
    resize();

    let t = 0;
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);
      t += 0.008;

      const hex = colorRef.current.replace("#", "");
      const cr = parseInt(hex.substring(0, 2), 16);
      const cg = parseInt(hex.substring(2, 4), 16);
      const cb = parseInt(hex.substring(4, 6), 16);

      const poss = possRef.current;
      const isLight = lightRef.current;
      const agitation = poss * 1.8;
      const redBlend = Math.min(1, poss * 0.6);

      for (const p of particlesRef.current) {
        p.x += p.vx * (1 + agitation) + Math.sin(t + p.phase) * 0.15 * (1 + agitation);
        p.y += p.vy * (1 + agitation) + Math.cos(t * 0.7 + p.phase) * 0.1 * (1 + agitation);
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const alpha = (0.15 + poss * 0.35) * (isLight ? 0.7 : 1);
        const pr = Math.round(cr + (200 - cr) * redBlend);
        const pg = Math.round(cg + (60 - cg) * redBlend);
        const pb = Math.round(cb + (60 - cb) * redBlend);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (1 + poss * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pr},${pg},${pb},${alpha})`;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []); // Stable — never re-mounts

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   SVG — Breathing + trembling via rAF refs (no re-renders)
   ═══════════════════════════════════════════════════════ */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Man triangle base vertices
const MA = { x: 300, y: 55 };
const ML = { x: 70, y: 455 };
const MR = { x: 530, y: 455 };
const CX = (MA.x + ML.x + MR.x) / 3;
const CY = (MA.y + ML.y + MR.y) / 3;

function NestedTriangleSVG({
  family,
  possession,
  light,
}: {
  family: ArchetypeFamilyGroup;
  possession: number;
  light: boolean;
}) {
  const color = family.color;
  const man = family.man;
  const boy = family.boy;
  const possRef = useRef(possession);
  possRef.current = possession;

  // Refs to SVG elements we animate directly
  const manPathRef = useRef<SVGPathElement>(null);
  const manFillRef = useRef<SVGPathElement>(null);
  const boyPathRef = useRef<SVGPathElement>(null);
  const boyFillRef = useRef<SVGPathElement>(null);
  const manApexRef = useRef<SVGCircleElement>(null);
  const manLeftRef = useRef<SVGPolygonElement>(null);
  const manRightRef = useRef<SVGRectElement>(null);
  const boyApexRef = useRef<SVGCircleElement>(null);
  const boyLeftRef = useRef<SVGPolygonElement>(null);
  const boyRightRef = useRef<SVGRectElement>(null);
  const tendril1Ref = useRef<SVGPathElement>(null);
  const tendril2Ref = useRef<SVGPathElement>(null);
  const tendril3Ref = useRef<SVGPathElement>(null);
  const tendrilGroupRef = useRef<SVGGElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    let t = 0;

    const animate = () => {
      t += 0.016;
      const poss = possRef.current;

      // ─── Man triangle trembles ──
      const tremble = poss > 0.5 ? (poss - 0.5) * 8 : 0;
      const mAx = MA.x + Math.sin(t * 3.1) * tremble;
      const mAy = MA.y + Math.cos(t * 2.7) * tremble * 0.6;
      const mLx = ML.x + Math.sin(t * 2.3 + 1) * tremble;
      const mLy = ML.y + Math.cos(t * 3.5 + 2) * tremble * 0.4;
      const mRx = MR.x + Math.sin(t * 2.8 + 3) * tremble;
      const mRy = MR.y + Math.cos(t * 2.1 + 1) * tremble * 0.5;

      const manD = `M${mAx},${mAy} L${mLx},${mLy} L${mRx},${mRy} Z`;
      manPathRef.current?.setAttribute("d", manD);
      manFillRef.current?.setAttribute("d", manD);

      // Man vertex markers
      manApexRef.current?.setAttribute("cx", String(mAx));
      manApexRef.current?.setAttribute("cy", String(mAy));
      manLeftRef.current?.setAttribute(
        "points",
        `${mLx},${mLy - 6} ${mLx - 6},${mLy + 5} ${mLx + 6},${mLy + 5}`
      );
      manRightRef.current?.setAttribute("x", String(mRx - 5));
      manRightRef.current?.setAttribute("y", String(mRy - 5));

      // ─── Boy triangle breathes ──
      const scale = lerp(0.28, 0.97, poss);
      const breatheAmp = 2 + poss * 4;
      const breatheFreq = 1.5 + poss * 2;
      const breathe = Math.sin(t * breatheFreq) * breatheAmp;

      const bAx = CX + (MA.x - CX) * scale;
      const bAy = CY + (MA.y - CY) * scale + breathe * -0.6;
      const bLx = CX + (ML.x - CX) * scale + breathe * -0.4;
      const bLy = CY + (ML.y - CY) * scale + breathe * 0.3;
      const bRx = CX + (MR.x - CX) * scale + breathe * 0.4;
      const bRy = CY + (MR.y - CY) * scale + breathe * 0.3;

      const boyD = `M${bAx},${bAy} L${bLx},${bLy} L${bRx},${bRy} Z`;
      boyPathRef.current?.setAttribute("d", boyD);
      boyFillRef.current?.setAttribute("d", boyD);

      // Boy vertex markers
      boyApexRef.current?.setAttribute("cx", String(bAx));
      boyApexRef.current?.setAttribute("cy", String(bAy));
      boyLeftRef.current?.setAttribute(
        "points",
        `${bLx},${bLy - 5} ${bLx - 5},${bLy + 4} ${bLx + 5},${bLy + 4}`
      );
      boyRightRef.current?.setAttribute("x", String(bRx - 4));
      boyRightRef.current?.setAttribute("y", String(bRy - 4));

      // ─── Energy tendrils ──
      const connOpacity = Math.max(0, (poss - 0.25) / 0.75);
      if (tendrilGroupRef.current) {
        tendrilGroupRef.current.setAttribute(
          "opacity",
          String(connOpacity * 0.45)
        );
      }

      if (connOpacity > 0.02) {
        const tendrilPath = (
          fx: number,
          fy: number,
          tx: number,
          ty: number,
          seed: number
        ) => {
          const pts: string[] = [];
          for (let i = 0; i <= 12; i++) {
            const frac = i / 12;
            const wave =
              Math.sin(frac * Math.PI * 3 + t * 2 + seed) *
              (8 + poss * 6) *
              (1 - frac);
            const x = fx + (tx - fx) * frac + wave;
            const y =
              fy + (ty - fy) * frac +
              Math.cos(frac * Math.PI * 2 + t + seed) * 3;
            pts.push(`${i === 0 ? "M" : "L"}${x},${y}`);
          }
          return pts.join(" ");
        };

        tendril1Ref.current?.setAttribute(
          "d",
          tendrilPath(bLx, bLy, mLx, mLy, 0)
        );
        tendril2Ref.current?.setAttribute(
          "d",
          tendrilPath(bRx, bRy, mRx, mRy, 2.5)
        );
        if (poss > 0.6) {
          tendril3Ref.current?.setAttribute(
            "d",
            tendrilPath(bAx, bAy, mAx, mAy, 5)
          );
          tendril3Ref.current?.setAttribute("opacity", "0.3");
        } else {
          tendril3Ref.current?.setAttribute("opacity", "0");
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);  // Stable — reads from possRef

  // ─── These values are driven by slider (React render) for smooth CSS transitions ──
  const manOpacity = lerp(0.9, 0.15, possession);
  const manFullnessOpacity = lerp(1, 0.08, possession);
  const boyOpacity = lerp(0.35, 1, possession);
  const boyFillOpacity = lerp(0, 0.12, possession);
  const boyGlowStd = 3 + possession * 8;

  // Initial boy triangle path (will be overwritten by rAF immediately)
  const scale0 = lerp(0.28, 0.97, possession);
  const initBoyPath = `M${CX + (MA.x - CX) * scale0},${CY + (MA.y - CY) * scale0} L${CX + (ML.x - CX) * scale0},${CY + (ML.y - CY) * scale0} L${CX + (MR.x - CX) * scale0},${CY + (MR.y - CY) * scale0} Z`;
  const manPath0 = `M${MA.x},${MA.y} L${ML.x},${ML.y} L${MR.x},${MR.y} Z`;

  return (
    <svg viewBox="0 0 600 540" className="w-full max-w-[600px] mx-auto select-none">
      <defs>
        <filter id={`boy-glow-${family.id}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation={boyGlowStd} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="tremble-blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation={possession > 0.6 ? (possession - 0.6) * 2 : 0} />
        </filter>
        <linearGradient id={`man-grad-${family.id}`} x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={light ? 0.08 : 0.05} />
          <stop offset="100%" stopColor={color} stopOpacity={0.01} />
        </linearGradient>
        <radialGradient id={`boy-radial-${family.id}`} cx="0.5" cy="0.45" r="0.55">
          <stop offset="0%" stopColor={possession > 0.5 ? "#C0392B" : color} stopOpacity={boyFillOpacity} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* ── Man triangle ── */}
      <g
        filter={possession > 0.6 ? "url(#tremble-blur)" : undefined}
        style={{ transition: "filter 0.6s ease" }}
      >
        <path
          ref={manFillRef}
          d={manPath0}
          fill={`url(#man-grad-${family.id})`}
          style={{ opacity: manOpacity, transition: "opacity 0.4s ease" }}
        />
        <path
          ref={manPathRef}
          d={manPath0}
          fill="none"
          stroke={color}
          strokeWidth={light ? 1.5 : 1}
          style={{
            opacity: manOpacity * (light ? 0.5 : 0.35),
            transition: "opacity 0.4s ease",
          }}
        />
      </g>

      {/* ── Energy tendrils ── */}
      <g ref={tendrilGroupRef} opacity={0}>
        <path
          ref={tendril1Ref}
          d="M0,0"
          fill="none"
          stroke="#C0392B"
          strokeWidth={0.8 + possession}
          strokeDasharray="3 5"
          opacity={0.6}
        />
        <path
          ref={tendril2Ref}
          d="M0,0"
          fill="none"
          stroke="var(--color-muted)"
          strokeWidth={0.6 + possession * 0.6}
          strokeDasharray="3 5"
          opacity={0.5}
        />
        <path
          ref={tendril3Ref}
          d="M0,0"
          fill="none"
          stroke={color}
          strokeWidth={0.5 + possession * 0.4}
          strokeDasharray="2 6"
          opacity={0}
        />
      </g>

      {/* ── Boy triangle ── */}
      <path
        ref={boyFillRef}
        d={initBoyPath}
        fill={`url(#boy-radial-${family.id})`}
      />
      <path
        ref={boyPathRef}
        d={initBoyPath}
        fill="none"
        stroke={possession > 0.6 ? "#C0392B" : color}
        strokeWidth={light ? 1.8 : 1.3}
        strokeDasharray={possession > 0.7 ? "none" : "8 5"}
        style={{
          opacity: boyOpacity * (light ? 0.85 : 0.75),
          transition: "opacity 0.4s ease, stroke 0.6s ease, stroke-dasharray 0.6s ease",
        }}
        filter={possession > 0.4 ? `url(#boy-glow-${family.id})` : undefined}
      />

      {/* ── Man vertex markers ── */}
      <circle
        ref={manApexRef}
        cx={MA.x}
        cy={MA.y}
        r={6}
        fill={color}
        style={{ opacity: manFullnessOpacity, transition: "opacity 0.4s ease" }}
      />
      <polygon
        ref={manLeftRef}
        points={`${ML.x},${ML.y - 6} ${ML.x - 6},${ML.y + 5} ${ML.x + 6},${ML.y + 5}`}
        fill="#C0392B"
        style={{ opacity: manOpacity * 0.6, transition: "opacity 0.4s ease" }}
      />
      <rect
        ref={manRightRef}
        x={MR.x - 5}
        y={MR.y - 5}
        width={10}
        height={10}
        fill="var(--color-muted)"
        style={{ opacity: manOpacity * 0.4, transition: "opacity 0.4s ease" }}
      />

      {/* ── Boy vertex markers ── */}
      <circle
        ref={boyApexRef}
        cx={CX + (MA.x - CX) * scale0}
        cy={CY + (MA.y - CY) * scale0}
        r={4 + possession * 2}
        fill={color}
        style={{ opacity: boyOpacity, transition: "opacity 0.4s ease, r 0.3s ease" }}
        filter={possession > 0.4 ? `url(#boy-glow-${family.id})` : undefined}
      />
      <polygon
        ref={boyLeftRef}
        points={`${CX + (ML.x - CX) * scale0},${CY + (ML.y - CY) * scale0 - 5} ${CX + (ML.x - CX) * scale0 - 5},${CY + (ML.y - CY) * scale0 + 4} ${CX + (ML.x - CX) * scale0 + 5},${CY + (ML.y - CY) * scale0 + 4}`}
        fill="#C0392B"
        style={{ opacity: boyOpacity * 0.85, transition: "opacity 0.4s ease" }}
        filter={possession > 0.5 ? `url(#boy-glow-${family.id})` : undefined}
      />
      <rect
        ref={boyRightRef}
        x={CX + (MR.x - CX) * scale0 - 4}
        y={CY + (MR.y - CY) * scale0 - 4}
        width={8}
        height={8}
        fill="var(--color-muted)"
        style={{ opacity: boyOpacity * 0.6, transition: "opacity 0.4s ease" }}
      />

      {/* ── Labels (CSS-transitioned, not rAF) ── */}

      {/* Man fullness */}
      <g style={{ opacity: manFullnessOpacity, transition: "opacity 0.5s ease" }}>
        <text x={MA.x} y={MA.y - 22} textAnchor="middle" className="font-serif" style={{ fontSize: 15, fill: color, fontWeight: 500 }}>
          {man.name}
        </text>
        <text x={MA.x} y={MA.y - 38} textAnchor="middle" style={{ fontSize: 7, fill: color, fontFamily: "monospace", letterSpacing: "0.25em", textTransform: "uppercase" as const, opacity: 0.5 }}>
          Fullness
        </text>
      </g>

      {/* Man active shadow */}
      <g style={{ opacity: manOpacity * 0.65, transition: "opacity 0.5s ease" }}>
        <text x={ML.x - 8} y={ML.y + 28} textAnchor="middle" className="font-serif" style={{ fontSize: 12, fill: "#C0392B" }}>
          {man.activeShadow.name}
        </text>
        <text x={ML.x - 8} y={ML.y + 42} textAnchor="middle" style={{ fontSize: 6.5, fill: "#C0392B", fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase" as const, opacity: 0.5 }}>
          Active Shadow
        </text>
      </g>

      {/* Man passive shadow */}
      <g style={{ opacity: manOpacity * 0.55, transition: "opacity 0.5s ease" }}>
        <text x={MR.x + 8} y={MR.y + 28} textAnchor="middle" className="font-serif" style={{ fontSize: 12, fill: "var(--color-muted)" }}>
          {man.passiveShadow.name}
        </text>
        <text x={MR.x + 8} y={MR.y + 42} textAnchor="middle" style={{ fontSize: 6.5, fill: "var(--color-muted)", fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase" as const, opacity: 0.5 }}>
          Passive Shadow
        </text>
      </g>

      {/* Boy fullness — label follows via CSS, position set by rAF on the marker */}
      <text
        x={CX + (MA.x - CX) * scale0}
        y={CY + (MA.y - CY) * scale0 - 14}
        textAnchor="middle"
        className="font-serif"
        style={{ fontSize: 12 + possession * 2, fill: color, opacity: boyOpacity * 0.9, transition: "opacity 0.4s ease, font-size 0.4s ease, x 0.3s ease, y 0.3s ease" }}
      >
        {boy.name}
      </text>

      {/* Boy active shadow label */}
      {possession > 0.15 && (
        <text
          x={CX + (ML.x - CX) * scale0}
          y={CY + (ML.y - CY) * scale0 + 20}
          textAnchor="middle"
          className="font-serif"
          style={{
            fontSize: 9 + possession * 2,
            fill: "#C0392B",
            opacity: Math.min(1, (possession - 0.15) * 2),
            transition: "opacity 0.5s ease, font-size 0.4s ease, x 0.3s ease, y 0.3s ease",
          }}
        >
          {boy.activeShadow.name}
        </text>
      )}

      {/* Boy passive shadow label */}
      {possession > 0.15 && (
        <text
          x={CX + (MR.x - CX) * scale0}
          y={CY + (MR.y - CY) * scale0 + 20}
          textAnchor="middle"
          className="font-serif"
          style={{
            fontSize: 9 + possession * 1.5,
            fill: "var(--color-muted)",
            opacity: Math.min(1, (possession - 0.15) * 1.5),
            transition: "opacity 0.5s ease, font-size 0.4s ease, x 0.3s ease, y 0.3s ease",
          }}
        >
          {boy.passiveShadow.name}
        </text>
      )}

      {/* Structural labels */}
      <text x={560} y={80} textAnchor="end" style={{ fontSize: 9, fill: color, fontFamily: "monospace", letterSpacing: "0.35em", textTransform: "uppercase" as const, opacity: manOpacity * 0.2, transition: "opacity 0.5s ease" }}>
        Man
      </text>
      <text x={560} y={95} textAnchor="end" style={{ fontSize: 9, fill: color, fontFamily: "monospace", letterSpacing: "0.35em", textTransform: "uppercase" as const, opacity: boyOpacity * 0.25, transition: "opacity 0.5s ease" }}>
        Boy
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   Custom slider with smooth tracking
   ═══════════════════════════════════════════════════════ */

function PossessionSlider({
  value,
  onChange,
  color,
  light,
}: {
  value: number;
  onChange: (v: number) => void;
  color: string;
  light: boolean;
}) {
  return (
    <div className="relative py-6">
      {/* Track */}
      <div
        className="relative h-[3px] rounded-full overflow-hidden"
        style={{ background: light ? "#e8e4dc" : "#1E1E1A" }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${value * 100}%`,
            background:
              value < 0.5
                ? color
                : `linear-gradient(90deg, ${color}, #C0392B)`,
            transition: "background 0.6s ease",
          }}
        />
      </div>

      {/* Native input */}
      <input
        type="range"
        min={0}
        max={1}
        step={0.005}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
        style={{ height: "100%" }}
      />

      {/* Thumb */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 pointer-events-none"
        style={{
          left: `calc(${value * 100}% - 8px)`,
          borderColor: value < 0.6 ? color : "#C0392B",
          backgroundColor: light ? "#fff" : "#0A0A08",
          boxShadow:
            value > 0.5
              ? `0 0 ${12 + value * 16}px rgba(192,57,43,${value * 0.4})`
              : `0 0 8px ${color}30`,
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      />

      {/* Labels */}
      <div className="flex justify-between mt-3">
        <span
          className="font-mono text-[8px] tracking-[0.2em] uppercase"
          style={{
            color: value < 0.3 ? color : "var(--color-muted)",
            opacity: value < 0.3 ? 0.9 : 0.3,
            transition: "color 0.4s ease, opacity 0.4s ease",
          }}
        >
          Integrated
        </span>
        <span
          className="font-mono text-[8px] tracking-[0.2em] uppercase"
          style={{
            color: value > 0.7 ? "#C0392B" : "var(--color-muted)",
            opacity: value > 0.7 ? 0.9 : 0.3,
            transition: "color 0.4s ease, opacity 0.4s ease",
          }}
        >
          Possessing
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   BoySteeringMan — Main Export
   ═══════════════════════════════════════════════════════ */

export default function BoySteeringMan() {
  const [selectedFamily, setSelectedFamily] = useState<ArchetypeFamily>("king");
  const [possession, setPossession] = useState(0);
  const { theme } = useTheme();
  const light = theme === "light";

  const family = useMemo(
    () => FAMILIES.find((f) => f.id === selectedFamily)!,
    [selectedFamily]
  );

  const phase = getPhaseData(family, possession);
  const voice = SHADOW_VOICES[family.id]?.[phase.voiceKey] ?? "";

  const atmosphereOpacity = lerp(0, 0.08, possession);
  const vignetteOpacity = lerp(0, 0.5, Math.max(0, (possession - 0.4) / 0.6));

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ─── Atmospheric background ────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, rgba(192,57,43,${atmosphereOpacity}) 0%, transparent 70%)`,
          transition: "background 0.8s ease",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          opacity: vignetteOpacity,
          transition: "opacity 0.8s ease",
        }}
      />

      <div className="relative">
        {/* ─── Hero ─────────────────────────────────── */}
        <div className="px-6 pt-24 pb-8 md:pt-32 md:pb-12">
          <div className="max-w-3xl mx-auto">
            <div className="animate-slide-up">
              <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-4">
                Moore &amp; Gillette — The Nested Psyche
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-text-primary tracking-tight leading-[1.05] mb-5">
                The Boy{" "}
                <span className="text-gold glow-text-subtle animate-flicker">
                  Within
                </span>{" "}
                the Man
              </h1>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl font-light">
                Every man carries the boy he once was. When properly initiated,
                that boy becomes the seed of mature power. Left unchecked, the
                boy&apos;s shadows leak through — and begin to steer the adult
                from within.
              </p>
              <p className="text-text-secondary/60 text-sm mt-4 font-light italic">
                Choose a family below, then drag the slider to feel what happens
                when the boy takes the wheel.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Family selector ─────────────────────── */}
        <div className="px-6 pb-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2 animate-slide-up delay-200">
              {FAMILIES.map((f) => {
                const active = f.id === selectedFamily;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      setSelectedFamily(f.id);
                      setPossession(0);
                    }}
                    className="group flex-1 py-3 rounded-sm font-mono text-[9px] tracking-[0.2em] uppercase relative overflow-hidden"
                    style={{
                      backgroundColor: active
                        ? `${f.color}${light ? "14" : "0E"}`
                        : "transparent",
                      color: active ? f.color : "var(--color-muted)",
                      border: `1px solid ${active ? f.color + (light ? "35" : "20") : light ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.04)"}`,
                      transition: "all 0.4s ease",
                    }}
                  >
                    {active && (
                      <motion.div
                        layoutId="family-glow"
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(ellipse at center, ${f.color}10 0%, transparent 70%)`,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Main visualization ──────────────────── */}
        <div className="px-6 pb-2">
          <div className="max-w-3xl mx-auto animate-slide-up delay-300">
            <div
              className="relative rounded-sm overflow-hidden"
              style={{
                background: light
                  ? `linear-gradient(180deg, ${family.color}05 0%, var(--color-bg) 70%)`
                  : `linear-gradient(180deg, ${family.color}03 0%, transparent 70%)`,
                border: `1px solid ${
                  possession > 0.6
                    ? `rgba(192,57,43,${0.1 + possession * 0.1})`
                    : `${family.color}${light ? "12" : "08"}`
                }`,
                transition: "border-color 0.6s ease",
              }}
            >
              <ParticleField
                color={family.color}
                possession={possession}
                light={light}
              />
              <div className="relative p-2 md:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={family.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <NestedTriangleSVG
                      family={family}
                      possession={possession}
                      light={light}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Slider ──────────────────────────────── */}
        <div className="px-6">
          <div className="max-w-3xl mx-auto">
            <PossessionSlider
              value={possession}
              onChange={setPossession}
              color={family.color}
              light={light}
            />
          </div>
        </div>

        {/* ─── Shadow Voice ────────────────────────── */}
        <div className="px-6 pb-6">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {possession > 0.1 && (
                <motion.div
                  key={phase.voiceKey + family.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="relative py-5 px-6 md:px-8"
                >
                  <div
                    className="absolute inset-0 rounded-sm"
                    style={{
                      background:
                        possession > 0.6
                          ? light ? "rgba(192,57,43,0.03)" : "rgba(192,57,43,0.05)"
                          : "transparent",
                      border:
                        possession > 0.6
                          ? "1px solid rgba(192,57,43,0.08)"
                          : "1px solid transparent",
                      transition: "all 0.6s ease",
                    }}
                  />
                  <div className="relative">
                    <p
                      className="font-mono text-[7px] tracking-[0.25em] uppercase mb-3"
                      style={{
                        color: possession > 0.5 ? "var(--color-crimson-light)" : family.color,
                        opacity: 0.5,
                        transition: "color 0.5s ease",
                      }}
                    >
                      {possession < 0.5
                        ? `The ${family.boy.name} whispers`
                        : possession < 0.75
                          ? "The shadow speaks through him"
                          : "The shadow has his voice"}
                    </p>
                    <blockquote
                      className="font-serif text-base md:text-lg italic leading-relaxed"
                      style={{
                        color: possession > 0.6 ? "var(--color-crimson-light)" : "var(--color-text-secondary)",
                        opacity: 0.7 + possession * 0.3,
                        textShadow: possession > 0.7 && !light ? "0 0 20px rgba(192,57,43,0.15)" : "none",
                        transition: "color 0.5s ease, text-shadow 0.5s ease",
                      }}
                    >
                      &ldquo;{voice}&rdquo;
                    </blockquote>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ─── Phase insight + behavioral signs ────── */}
        <div className="px-6 pb-8">
          <div className="max-w-3xl mx-auto">
            <div
              className="relative rounded-sm overflow-hidden"
              style={{
                background: light
                  ? `linear-gradient(135deg, ${family.color}06 0%, transparent 60%)`
                  : `linear-gradient(135deg, ${family.color}04 0%, transparent 60%)`,
                border: `1px solid ${family.color}${light ? "12" : "08"}`,
                transition: "all 0.5s ease",
              }}
            >
              <div
                className="absolute top-0 left-0 w-1 h-full"
                style={{
                  backgroundColor: possession < 0.5 ? family.color : "#C0392B",
                  opacity: 0.4 + possession * 0.4,
                  transition: "background-color 0.5s ease, opacity 0.5s ease",
                }}
              />

              <div className="p-5 md:p-7 pl-6 md:pl-8">
                <div className="flex items-center gap-3 mb-4">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={phase.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                      className="font-mono text-[9px] tracking-[0.25em] uppercase font-medium"
                      style={{ color: possession < 0.5 ? family.color : "#C0392B" }}
                    >
                      {phase.label}
                    </motion.span>
                  </AnimatePresence>
                  <div
                    className="h-px flex-1"
                    style={{ background: `linear-gradient(90deg, ${family.color}${light ? "18" : "0C"}, transparent)` }}
                  />
                  <div className="flex gap-1.5">
                    {["seed", "stirring", "hijacking", "possession"].map((p) => (
                      <div
                        key={p}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: p === phase.phase
                            ? (possession < 0.5 ? family.color : "#C0392B")
                            : (light ? "#ddd" : "#282825"),
                          boxShadow: p === phase.phase
                            ? `0 0 6px ${possession < 0.5 ? family.color : "#C0392B"}60`
                            : "none",
                          transition: "all 0.4s ease",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={phase.phase + family.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="text-text-secondary text-sm md:text-[15px] leading-relaxed font-light mb-5"
                  >
                    {phase.description}
                  </motion.p>
                </AnimatePresence>

                <div>
                  <p
                    className="font-mono text-[7px] tracking-[0.2em] uppercase mb-3"
                    style={{
                      color: possession < 0.5 ? family.color : "var(--color-crimson-light)",
                      opacity: 0.5,
                      transition: "color 0.4s ease",
                    }}
                  >
                    Signs to recognize
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.ul
                      key={phase.phase + family.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-2"
                    >
                      {phase.signs.map((sign, i) => (
                        <motion.li
                          key={sign}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                          className="flex items-start gap-2.5 text-xs md:text-sm text-text-secondary/80 leading-relaxed"
                        >
                          <span
                            className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                            style={{
                              backgroundColor: possession < 0.5 ? family.color : "#C0392B",
                              opacity: 0.5,
                              transition: "background-color 0.4s ease",
                            }}
                          />
                          {sign}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Shadow bleed-through */}
            <AnimatePresence>
              {possession > 0.45 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="overflow-hidden mt-4"
                >
                  <div
                    className="p-5 rounded-sm"
                    style={{
                      background: light ? "rgba(192,57,43,0.03)" : "rgba(192,57,43,0.04)",
                      border: "1px solid rgba(192,57,43,0.1)",
                    }}
                  >
                    <p className="font-mono text-[8px] tracking-[0.2em] text-crimson-light/60 uppercase mb-4">
                      How the boy&apos;s shadow becomes the man&apos;s shadow
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs font-serif" style={{ color: "#C0392B" }}>
                          {family.boy.activeShadow.name}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-px bg-crimson-light/20" />
                          <span className="font-mono text-[7px] tracking-wider text-crimson-light/40 uppercase">
                            matures into
                          </span>
                          <div className="w-4 h-px bg-crimson-light/20" />
                          <svg width="6" height="8" viewBox="0 0 6 8" fill="none">
                            <path d="M1 1L5 4L1 7" stroke="#C0392B" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
                          </svg>
                        </div>
                        <span className="text-xs font-serif font-medium" style={{ color: "#C0392B" }}>
                          {family.man.activeShadow.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs font-serif text-muted">
                          {family.boy.passiveShadow.name}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-px bg-muted/15" />
                          <span className="font-mono text-[7px] tracking-wider text-muted/40 uppercase">
                            matures into
                          </span>
                          <div className="w-4 h-px bg-muted/15" />
                          <svg width="6" height="8" viewBox="0 0 6 8" fill="none">
                            <path d="M1 1L5 4L1 7" stroke="var(--color-muted)" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
                          </svg>
                        </div>
                        <span className="text-xs font-serif font-medium text-muted">
                          {family.man.passiveShadow.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ─── The Path Back ────────────────────────── */}
        <div className="px-6 pb-20 pt-8">
          <div className="max-w-3xl mx-auto">
            <div
              className="h-px mb-14"
              style={{ background: `linear-gradient(90deg, transparent, var(--color-gold)${light ? "25" : "12"}, transparent)` }}
            />
            <div className="text-center mb-12">
              <p className="font-mono text-[9px] tracking-[0.35em] text-gold/50 uppercase mb-3">
                The Way Through
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-text-primary tracking-tight mb-5">
                Integration, Not Destruction
              </h2>
              <div className="space-y-4 text-text-secondary text-sm md:text-base leading-relaxed max-w-xl mx-auto font-light">
                <p>
                  The solution is never to kill the boy. He is the source of
                  vitality, wonder, and creative fire. A man who cuts off his
                  inner boy becomes hollow — technically mature but spiritually
                  dead.
                </p>
                <p>
                  The task is <em className="not-italic text-text-primary font-medium">initiation</em>: to acknowledge the boy within,
                  honor his energy, grieve what he never received, and channel
                  his power through the mature structure. The man who knows his
                  inner boy can draw on that energy without being possessed by it.
                </p>
                <p className="text-text-secondary/60 text-xs">
                  This is the central work of masculine maturation — not once,
                  but as a lifelong practice. The boy never fully goes away. He
                  is always there, waiting to be seen.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {FAMILIES.map((f) => (
                <Link
                  key={f.id}
                  href={`/kwml/archetype/${f.man.slug}`}
                  className="group p-5 rounded-sm text-center"
                  style={{
                    border: `1px solid ${f.color}${light ? "15" : "08"}`,
                    background: light
                      ? `linear-gradient(180deg, ${f.color}06 0%, transparent 100%)`
                      : `linear-gradient(180deg, ${f.color}03 0%, transparent 100%)`,
                    transition: "all 0.3s ease",
                  }}
                >
                  <p className="font-serif text-sm font-medium mb-1.5" style={{ color: f.color }}>
                    {f.man.name}
                  </p>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="font-mono text-[6px] tracking-wider text-muted/50 uppercase">
                      {f.boy.name}
                    </span>
                    <svg width="5" height="6" viewBox="0 0 6 8" fill="none" className="text-muted/20">
                      <path d="M1 1L5 4L1 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                    <span className="font-mono text-[6px] tracking-wider uppercase" style={{ color: `${f.color}80` }}>
                      {f.man.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-muted uppercase hover:text-gold transition-colors duration-300"
              >
                <span className="w-6 h-px bg-current" />
                Back to Archetypes
                <span className="w-6 h-px bg-current" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
