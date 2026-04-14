"use client";

import { motion } from "framer-motion";
import { CLUSTER_AXES } from "@/data/atlas-lens-axes";

export type TotemSize = "sm" | "md" | "lg" | "hero";

const SIZE_PX: Record<TotemSize, number> = {
  sm: 40,
  md: 72,
  lg: 120,
  hero: 200,
};

interface Props {
  id: string;
  size?: TotemSize;
  animated?: boolean;
  color?: string;
  className?: string;
  title?: string;
}

export default function ClusterTotem({
  id,
  size = "md",
  animated = true,
  color,
  className,
  title,
}: Props) {
  const axes = CLUSTER_AXES[id];
  const stroke = color ?? axes?.motifColor ?? "#c9b884";
  const px = SIZE_PX[size];
  const Motif = MOTIFS[id] ?? MOTIFS.default;

  return (
    <svg
      viewBox="0 0 100 100"
      width={px}
      height={px}
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      style={{ color: stroke }}
    >
      <Motif animated={animated} />
    </svg>
  );
}

// ---------- Shared primitives ----------

const spin = (duration = 14) => ({
  rotate: 360,
  transition: { duration, ease: "linear" as const, repeat: Infinity },
});
const breath = (duration = 4) => ({
  scale: [1, 1.05, 1],
  transition: { duration, ease: "easeInOut" as const, repeat: Infinity },
});
const pulse = (duration = 2.2) => ({
  opacity: [0.55, 1, 0.55],
  transition: { duration, ease: "easeInOut" as const, repeat: Infinity },
});
const shimmer = (duration = 3) => ({
  pathLength: [0, 1, 1],
  opacity: [0, 1, 0.5],
  transition: { duration, ease: "easeInOut" as const, repeat: Infinity },
});

type MotifProps = { animated: boolean };
const S = { cx: 50, cy: 50 };

// ---------- 21 motifs ----------

const Sovereign = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
    <motion.circle cx={50} cy={50} r={28} opacity={0.35}
      animate={animated ? breath(5) : undefined} />
    <motion.g animate={animated ? spin(22) : undefined} style={{ transformOrigin: "50px 50px" }}>
      <circle cx={50} cy={22} r={1.8} fill="currentColor" />
      <circle cx={78} cy={50} r={1.8} fill="currentColor" />
      <circle cx={50} cy={78} r={1.8} fill="currentColor" />
      <circle cx={22} cy={50} r={1.8} fill="currentColor" />
    </motion.g>
    {/* crown */}
    <path d="M34 56 L38 42 L44 52 L50 38 L56 52 L62 42 L66 56 Z" opacity={0.85} />
    <line x1={34} y1={60} x2={66} y2={60} />
  </g>
);

const Warrior = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
    <motion.g animate={animated ? pulse(2.4) : undefined}>
      <line x1={28} y1={28} x2={72} y2={72} strokeWidth={2} />
      <line x1={72} y1={28} x2={28} y2={72} strokeWidth={2} />
    </motion.g>
    <circle cx={50} cy={50} r={6} fill="currentColor" />
    <motion.circle cx={50} cy={50} r={32}
      animate={animated ? { r: [30, 36, 30], opacity: [0.3, 0.6, 0.3] } : undefined}
      transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }} />
  </g>
);

const SageMagician = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.3}>
    <motion.g style={{ transformOrigin: "50px 50px" }}
      animate={animated ? spin(28) : undefined}>
      <polygon points="50,20 76,65 24,65" />
    </motion.g>
    <motion.g style={{ transformOrigin: "50px 50px" }}
      animate={animated ? { rotate: -360 } : undefined}
      transition={{ duration: 20, ease: "linear", repeat: Infinity }}>
      <polygon points="50,80 24,35 76,35" />
    </motion.g>
    <circle cx={50} cy={50} r={4} fill="currentColor" />
  </g>
);

const Lover = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.4}>
    <motion.path d="M30 56 Q30 30, 50 42 Q70 30, 70 56 Q70 74, 50 82 Q30 74, 30 56 Z"
      animate={animated ? breath(3) : undefined}
      style={{ transformOrigin: "50px 56px" }} />
    <motion.circle cx={50} cy={50} r={4} fill="currentColor"
      animate={animated ? pulse(2) : undefined} />
  </g>
);

const Innocent = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round">
    <line x1={50} y1={78} x2={50} y2={50} />
    <motion.path d="M50 52 Q38 44, 34 30"
      animate={animated ? shimmer(3.4) : undefined} />
    <motion.path d="M50 52 Q62 44, 66 30"
      animate={animated ? shimmer(3.8) : undefined} />
    <motion.circle cx={50} cy={78} r={6}
      animate={animated ? pulse(2.6) : undefined} />
  </g>
);

const Explorer = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.3}>
    <circle cx={50} cy={50} r={30} opacity={0.4} />
    <motion.g style={{ transformOrigin: "50px 50px" }}
      animate={animated ? spin(18) : undefined}>
      <polygon points="50,22 54,50 50,78 46,50" fill="currentColor" opacity={0.85} />
      <line x1={20} y1={50} x2={80} y2={50} opacity={0.3} />
    </motion.g>
  </g>
);

const Rebel = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
    <motion.circle cx={50} cy={50} r={28}
      animate={animated ? { strokeDasharray: ["4 6", "6 4", "4 6"] } : undefined}
      transition={{ duration: 2.4, repeat: Infinity }} />
    <motion.path d="M38 26 L52 48 L42 52 L58 74"
      animate={animated ? { pathLength: [0.3, 1, 0.3] } : undefined}
      transition={{ duration: 1.8, repeat: Infinity }}
      strokeWidth={2} />
  </g>
);

const Caregiver = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
    <motion.path d="M26 44 Q50 20, 74 44" animate={animated ? breath(4) : undefined} />
    <path d="M34 54 Q50 40, 66 54" opacity={0.7} />
    <path d="M42 64 Q50 56, 58 64" opacity={0.5} />
    <motion.circle cx={50} cy={76} r={3} fill="currentColor"
      animate={animated ? pulse(2.4) : undefined} />
  </g>
);

const Jester = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.3}>
    <motion.g style={{ transformOrigin: "50px 50px" }}
      animate={animated ? { rotate: [-8, 8, -8] } : undefined}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M28 34 L50 20 L72 34 L50 48 Z" />
      <path d="M28 66 L50 52 L72 66 L50 80 Z" />
      <circle cx={28} cy={34} r={2.5} fill="currentColor" />
      <circle cx={72} cy={34} r={2.5} fill="currentColor" />
      <circle cx={28} cy={66} r={2.5} fill="currentColor" />
      <circle cx={72} cy={66} r={2.5} fill="currentColor" />
    </motion.g>
  </g>
);

const Creator = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.3}>
    <motion.g style={{ transformOrigin: "50px 50px" }}
      animate={animated ? spin(30) : undefined}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <line key={a} x1={50} y1={50}
          x2={50 + 30 * Math.cos((a * Math.PI) / 180)}
          y2={50 + 30 * Math.sin((a * Math.PI) / 180)} opacity={0.55} />
      ))}
    </motion.g>
    <motion.circle cx={50} cy={50} r={6} fill="currentColor"
      animate={animated ? breath(3) : undefined} />
  </g>
);

const Everyman = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.3}>
    {[32, 50, 68].map((cx, i) => (
      <motion.circle key={cx} cx={cx} cy={50} r={10}
        animate={animated ? { opacity: [0.4, 0.9, 0.4] } : undefined}
        transition={{ duration: 2.4, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }} />
    ))}
    <line x1={20} y1={68} x2={80} y2={68} opacity={0.4} />
  </g>
);

const Antagonists = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.4}>
    <motion.circle cx={50} cy={50} r={28}
      animate={animated ? pulse(2.6) : undefined} />
    <path d="M38 38 L62 62 M62 38 L38 62" strokeWidth={2} />
    <circle cx={50} cy={50} r={4} fill="currentColor" />
  </g>
);

const Shapeshifter = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.3}>
    <motion.path d="M25 50 Q50 20, 75 50 Q50 80, 25 50 Z"
      animate={animated ? { d: [
        "M25 50 Q50 20, 75 50 Q50 80, 25 50 Z",
        "M25 50 Q50 35, 75 50 Q50 65, 25 50 Z",
        "M25 50 Q50 20, 75 50 Q50 80, 25 50 Z",
      ] } : undefined}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
    <motion.circle cx={50} cy={50} r={3} fill="currentColor"
      animate={animated ? { cx: [42, 58, 42] } : undefined}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
  </g>
);

const ThresholdGuardian = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.4}>
    <line x1={32} y1={22} x2={32} y2={78} strokeWidth={2} />
    <line x1={68} y1={22} x2={68} y2={78} strokeWidth={2} />
    <line x1={28} y1={22} x2={72} y2={22} />
    <line x1={28} y1={78} x2={72} y2={78} />
    <motion.line x1={50} y1={28} x2={50} y2={72}
      animate={animated ? { opacity: [0.2, 1, 0.2] } : undefined}
      transition={{ duration: 2.2, repeat: Infinity }} strokeWidth={1.6} />
  </g>
);

const Herald = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.4}>
    <path d="M28 40 L62 30 L62 70 L28 60 Z" opacity={0.85} />
    <line x1={62} y1={50} x2={78} y2={50} />
    {[72, 76, 80].map((r, i) => (
      <motion.circle key={r} cx={62} cy={50} r={r - 62} opacity={0.3}
        animate={animated ? { opacity: [0, 0.6, 0], scale: [1, 1.4, 1.6] } : undefined}
        transition={{ duration: 2.4, delay: i * 0.3, repeat: Infinity, ease: "easeOut" }}
        style={{ transformOrigin: "62px 50px" }} />
    ))}
  </g>
);

const DeathRebirth = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.4}>
    <motion.g style={{ transformOrigin: "50px 50px" }}
      animate={animated ? spin(16) : undefined}>
      <path d="M50 22 A28 28 0 1 1 22 50" strokeLinecap="round" />
      <path d="M30 28 L22 50 L34 48" strokeLinecap="round" />
    </motion.g>
    <motion.circle cx={50} cy={50} r={5} fill="currentColor"
      animate={animated ? { opacity: [0.3, 1, 0.3] } : undefined}
      transition={{ duration: 3, repeat: Infinity }} />
  </g>
);

const Integration = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.3}>
    <motion.circle cx={50} cy={50} r={26}
      animate={animated ? breath(5) : undefined} />
    <motion.g style={{ transformOrigin: "50px 50px" }}
      animate={animated ? spin(26) : undefined}>
      <circle cx={50} cy={50} r={16} opacity={0.55} />
    </motion.g>
    <circle cx={50} cy={50} r={6} fill="currentColor" />
  </g>
);

const Teacher = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.3}>
    <rect x={28} y={34} width={44} height={32} />
    <line x1={28} y1={42} x2={72} y2={42} opacity={0.55} />
    <line x1={34} y1={50} x2={66} y2={50} opacity={0.45} />
    <line x1={34} y1={56} x2={58} y2={56} opacity={0.45} />
    <motion.line x1={28} y1={66} x2={72} y2={66}
      animate={animated ? { pathLength: [0, 1, 0] } : undefined}
      transition={{ duration: 3, repeat: Infinity }} strokeWidth={1.6} />
  </g>
);

const BoyHero = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
    <motion.g animate={animated ? { y: [0, -3, 0] } : undefined}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
      <line x1={50} y1={26} x2={50} y2={64} strokeWidth={2} />
      <path d="M42 34 L50 26 L58 34" strokeWidth={2} />
    </motion.g>
    <path d="M30 74 L70 74" opacity={0.4} />
    <circle cx={50} cy={74} r={3} fill="currentColor" />
  </g>
);

const LiminalTerritory = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.3}>
    <motion.path d="M20 50 Q35 30, 50 50 T80 50"
      animate={animated ? { d: [
        "M20 50 Q35 30, 50 50 T80 50",
        "M20 50 Q35 70, 50 50 T80 50",
        "M20 50 Q35 30, 50 50 T80 50",
      ] } : undefined}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />
    <motion.path d="M20 62 Q35 42, 50 62 T80 62" opacity={0.5}
      animate={animated ? { d: [
        "M20 62 Q35 42, 50 62 T80 62",
        "M20 62 Q35 82, 50 62 T80 62",
        "M20 62 Q35 42, 50 62 T80 62",
      ] } : undefined}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
    <motion.path d="M20 38 Q35 18, 50 38 T80 38" opacity={0.3}
      animate={animated ? { d: [
        "M20 38 Q35 18, 50 38 T80 38",
        "M20 38 Q35 58, 50 38 T80 38",
        "M20 38 Q35 18, 50 38 T80 38",
      ] } : undefined}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} />
  </g>
);

const Default = ({ animated }: MotifProps) => (
  <g fill="none" stroke="currentColor" strokeWidth={1.3}>
    <motion.circle cx={S.cx} cy={S.cy} r={26}
      animate={animated ? breath(4) : undefined} />
    <circle cx={S.cx} cy={S.cy} r={4} fill="currentColor" />
  </g>
);

const MOTIFS: Record<string, (p: MotifProps) => React.ReactElement> = {
  sovereign: Sovereign,
  warrior: Warrior,
  "sage-magician": SageMagician,
  lover: Lover,
  innocent: Innocent,
  explorer: Explorer,
  rebel: Rebel,
  caregiver: Caregiver,
  jester: Jester,
  creator: Creator,
  everyman: Everyman,
  antagonists: Antagonists,
  shapeshifter: Shapeshifter,
  "threshold-guardian": ThresholdGuardian,
  herald: Herald,
  "death-rebirth": DeathRebirth,
  integration: Integration,
  teacher: Teacher,
  "boy-hero": BoyHero,
  "liminal-territory": LiminalTerritory,
  default: Default,
};
