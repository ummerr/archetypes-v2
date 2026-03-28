"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Archetype } from "@/types/archetype";

interface Props {
  archetype: Archetype;
}

type Pole = "fullness" | "active" | "passive" | null;

export default function ShadowTriangle({ archetype }: Props) {
  const [active, setActive] = useState<Pole>(null);

  const color = archetype.accentColor;
  const apex = { x: 200, y: 50 };
  const left = { x: 55, y: 330 };
  const right = { x: 345, y: 330 };

  const nodes = [
    {
      id: "fullness" as Pole,
      pos: apex,
      label: "Fullness",
      sublabel: archetype.fullness.title,
      color: color,
      description: archetype.fullness.description,
    },
    {
      id: "active" as Pole,
      pos: left,
      label: "Inflated",
      sublabel: archetype.activeShadow.name,
      color: "#E74C3C",
      description: archetype.activeShadow.description,
    },
    {
      id: "passive" as Pole,
      pos: right,
      label: "Deflated",
      sublabel: archetype.passiveShadow.name,
      color: "#706D63",
      description: archetype.passiveShadow.description,
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      <svg viewBox="0 0 400 400" className="w-full">
        <defs>
          {/* Glow filter for active node */}
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Gradient fill for triangle */}
          <linearGradient id="triFill" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.04" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Triangle fill */}
        <motion.path
          d={`M ${apex.x} ${apex.y} L ${left.x} ${left.y} L ${right.x} ${right.y} Z`}
          fill="url(#triFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Triangle edges — animated draw */}
        <motion.path
          d={`M ${apex.x} ${apex.y} L ${left.x} ${left.y} L ${right.x} ${right.y} Z`}
          fill="none"
          stroke={color}
          strokeOpacity={0.15}
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        {/* Connecting dashed lines from center to each node for emphasis */}
        <line
          x1={200} y1={210} x2={apex.x} y2={apex.y + 35}
          stroke={color}
          strokeOpacity={0.08}
          strokeWidth={0.5}
          strokeDasharray="3 3"
        />
        <line
          x1={200} y1={210} x2={left.x + 25} y2={left.y - 20}
          stroke="#E74C3C"
          strokeOpacity={0.08}
          strokeWidth={0.5}
          strokeDasharray="3 3"
        />
        <line
          x1={200} y1={210} x2={right.x - 25} y2={right.y - 20}
          stroke="#706D63"
          strokeOpacity={0.08}
          strokeWidth={0.5}
          strokeDasharray="3 3"
        />

        {/* Nodes */}
        {nodes.map((node) => {
          const isActive = active === node.id;
          return (
            <g
              key={node.id}
              className="cursor-pointer"
              onClick={() => setActive(isActive ? null : node.id)}
            >
              {/* Outer glow ring on hover/active */}
              <circle
                cx={node.pos.x}
                cy={node.pos.y}
                r={36}
                fill="none"
                stroke={node.color}
                strokeOpacity={isActive ? 0.3 : 0}
                strokeWidth={1}
                className="transition-all duration-500"
              />
              {/* Main circle */}
              <circle
                cx={node.pos.x}
                cy={node.pos.y}
                r={28}
                fill={`${node.color}${isActive ? "20" : "0A"}`}
                stroke={node.color}
                strokeOpacity={isActive ? 0.7 : 0.3}
                strokeWidth={isActive ? 1.5 : 0.8}
                className="transition-all duration-300"
                filter={isActive ? "url(#nodeGlow)" : undefined}
              />
              {/* Label */}
              <text
                x={node.pos.x}
                y={node.pos.y - 4}
                textAnchor="middle"
                fill={node.color}
                fontSize={9}
                fontWeight={500}
                letterSpacing="0.1em"
                className="uppercase"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {node.label}
              </text>
              {/* Dot indicator */}
              <circle
                cx={node.pos.x}
                cy={node.pos.y + 10}
                r={2}
                fill={node.color}
                opacity={isActive ? 0.8 : 0.3}
                className="transition-opacity duration-300"
              />
            </g>
          );
        })}

        {/* External labels */}
        <text
          x={apex.x}
          y={apex.y - 44}
          textAnchor="middle"
          fill={color}
          fontSize={12}
          fontWeight={500}
          letterSpacing="0.02em"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {archetype.fullness.title}
        </text>

        <text
          x={left.x}
          y={left.y + 52}
          textAnchor="middle"
          fill="#E74C3C"
          fontSize={11}
          fontWeight={500}
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {archetype.activeShadow.name}
        </text>

        <text
          x={right.x}
          y={right.y + 52}
          textAnchor="middle"
          fill="#706D63"
          fontSize={11}
          fontWeight={500}
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {archetype.passiveShadow.name}
        </text>

        {/* Oscillation label on bottom edge */}
        <text
          x={200}
          y={left.y + 12}
          textAnchor="middle"
          fill="#706D63"
          fontSize={7}
          letterSpacing="0.15em"
          className="uppercase"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          shadow oscillation
        </text>
        <line
          x1={left.x + 35}
          y1={left.y + 7}
          x2={right.x - 35}
          y2={right.y + 7}
          stroke="#706D63"
          strokeOpacity={0.15}
          strokeWidth={0.5}
          strokeDasharray="2 2"
        />
      </svg>

      {/* Expanded detail panel */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="overflow-hidden"
          >
            <div className="p-5 rounded-2xl border border-surface-light bg-surface/80 backdrop-blur-sm mt-2">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      active === "fullness"
                        ? color
                        : active === "active"
                        ? "#E74C3C"
                        : "#706D63",
                  }}
                />
                <p
                  className="font-serif text-lg font-medium"
                  style={{
                    color:
                      active === "fullness"
                        ? color
                        : active === "active"
                        ? "#E74C3C"
                        : "#706D63",
                  }}
                >
                  {nodes.find((n) => n.id === active)?.sublabel}
                </p>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {nodes.find((n) => n.id === active)?.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
