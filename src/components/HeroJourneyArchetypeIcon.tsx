"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { breath } from "@/lib/motion-primitives";

type Props = {
  slug: string;
  color: string;
  size?: number;
  ariaLabel?: string;
};

const TRACE_DURATION = 3;
const STAGGER = 0.2;
const BREATH_CYCLE = 6;

type SvgCommon = {
  width: number;
  height: number;
  viewBox: string;
  fill: string;
  stroke: string;
  strokeWidth: number;
  strokeLinecap: "round";
  strokeLinejoin: "round";
  role?: "img";
  "aria-label"?: string;
  "aria-hidden"?: true;
};

function buildSvgProps(
  size: number,
  color: string,
  ariaLabel?: string,
): SvgCommon {
  return {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: color,
    strokeWidth: 1.25,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...(ariaLabel
      ? { role: "img" as const, "aria-label": ariaLabel }
      : { "aria-hidden": true as const }),
  };
}

function traceProps(i: number, willTrace: boolean, traced: boolean) {
  if (!willTrace) return {};
  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: traced ? { pathLength: 1, opacity: 1 } : undefined,
    transition: {
      pathLength: {
        duration: TRACE_DURATION,
        ease: "easeInOut" as const,
        delay: i * STAGGER,
      },
      opacity: {
        duration: TRACE_DURATION * 0.5,
        ease: "easeOut" as const,
        delay: i * STAGGER,
      },
    },
  };
}

export function HeroJourneyArchetypeIcon({
  slug,
  color,
  size = 28,
  ariaLabel,
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const isMd = size >= 72;
  const isLg = size >= 120;
  const willTrace = !reduced && isLg;
  const traced = willTrace && inView;
  const breathAnim = !reduced && isMd ? breath(BREATH_CYCLE) : undefined;

  const common = buildSvgProps(size, color, ariaLabel);
  const tp = (i: number) => traceProps(i, willTrace, traced);
  const gStyle = { transformOrigin: "16px 16px" };

  switch (slug) {
    case "hero":
      return (
        <motion.svg ref={ref} {...common}>
          <motion.g animate={breathAnim} style={gStyle}>
            <motion.path d="M7 7l12 12" {...tp(0)} />
            <motion.path d="M25 7L13 19" {...tp(1)} />
            <motion.path d="M5 21l4 4 2-2-4-4z" {...tp(2)} />
            <motion.path d="M27 21l-4 4-2-2 4-4z" {...tp(3)} />
            <motion.path d="M19 19l2 2" {...tp(4)} />
            <motion.path d="M13 19l-2 2" {...tp(5)} />
          </motion.g>
        </motion.svg>
      );
    case "mentor":
      return (
        <motion.svg ref={ref} {...common}>
          <motion.g animate={breathAnim} style={gStyle}>
            <motion.path
              d="M16 4c-2 2-2 4 0 6 2-2 2-4 0-6z"
              fill={color}
              fillOpacity={0.3}
              {...tp(0)}
            />
            <motion.path d="M16 10v4" {...tp(1)} />
            <motion.rect x={13} y={14} width={6} height={10} rx={1} {...tp(2)} />
            <motion.path d="M12 24h8" {...tp(3)} />
            <motion.path d="M16 24v4" {...tp(4)} />
          </motion.g>
        </motion.svg>
      );
    case "herald":
      return (
        <motion.svg ref={ref} {...common}>
          <motion.g animate={breathAnim} style={gStyle}>
            <motion.path
              d="M16 6l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"
              fill={color}
              fillOpacity={0.2}
              {...tp(0)}
            />
            <motion.path d="M16 2v2" {...tp(1)} />
            <motion.path d="M16 28v2" {...tp(2)} />
            <motion.path d="M2 16h2" {...tp(3)} />
            <motion.path d="M28 16h2" {...tp(4)} />
          </motion.g>
        </motion.svg>
      );
    case "threshold-guardian":
      return (
        <motion.svg ref={ref} {...common}>
          <motion.g animate={breathAnim} style={gStyle}>
            <motion.path
              d="M16 4l10 4v8c0 6-5 10-10 12-5-2-10-6-10-12V8z"
              fill={color}
              fillOpacity={0.15}
              {...tp(0)}
            />
            <motion.path d="M8 16h16" {...tp(1)} />
            <motion.path d="M16 10v12" {...tp(2)} />
          </motion.g>
        </motion.svg>
      );
    case "shapeshifter":
      return (
        <motion.svg ref={ref} {...common}>
          <motion.g animate={breathAnim} style={gStyle}>
            <motion.path
              d="M12 6a10 10 0 100 20 7 7 0 010-20z"
              fill={color}
              fillOpacity={0.2}
              {...tp(0)}
            />
            <motion.path d="M20 6a10 10 0 110 20 7 7 0 100-20z" {...tp(1)} />
          </motion.g>
        </motion.svg>
      );
    case "shadow":
      return (
        <motion.svg ref={ref} {...common}>
          <motion.g animate={breathAnim} style={gStyle}>
            <motion.circle cx={16} cy={16} r={10} {...tp(0)} />
            <motion.path
              d="M16 6a10 10 0 000 20 10 10 0 010-20z"
              fill={color}
              fillOpacity={0.6}
              {...tp(1)}
            />
          </motion.g>
        </motion.svg>
      );
    case "trickster":
      return (
        <motion.svg ref={ref} {...common}>
          <motion.g animate={breathAnim} style={gStyle}>
            <motion.path
              d="M16 4l10 12-10 12L6 16z"
              fill={color}
              fillOpacity={0.15}
              {...tp(0)}
            />
            <motion.circle cx={12} cy={14} r={1} fill={color} {...tp(1)} />
            <motion.circle cx={20} cy={14} r={1} fill={color} {...tp(2)} />
            <motion.path
              d="M12 20c1.5 1.5 2.5 1.5 4 0s2.5-1.5 4 0"
              {...tp(3)}
            />
          </motion.g>
        </motion.svg>
      );
    case "ally":
      return (
        <motion.svg ref={ref} {...common}>
          <motion.g animate={breathAnim} style={gStyle}>
            <motion.circle cx={12} cy={16} r={6} {...tp(0)} />
            <motion.circle cx={20} cy={16} r={6} {...tp(1)} />
          </motion.g>
        </motion.svg>
      );
    default:
      return (
        <motion.svg ref={ref} {...common}>
          <motion.g animate={breathAnim} style={gStyle}>
            <motion.circle cx={16} cy={16} r={10} {...tp(0)} />
          </motion.g>
        </motion.svg>
      );
  }
}
