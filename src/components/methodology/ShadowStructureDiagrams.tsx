import type { ReactNode } from "react";

type Variant = "kwml" | "tarot" | "enneagram" | "jungian" | "heros-journey";

interface ShadowStructureDiagramProps {
  variant: Variant;
  className?: string;
}

const TINT: Record<Variant, string> = {
  kwml: "#D4AF37",
  tarot: "#8C7A4A",
  enneagram: "#1B9E6B",
  jungian: "#8C8A82",
  "heros-journey": "#C0392B",
};

const SHAPE_LABEL: Record<Variant, string> = {
  kwml: "bipolar",
  tarot: "tripartite",
  enneagram: "transit",
  jungian: "unipolar",
  "heros-journey": "mask",
};

function Node({
  x,
  y,
  label,
  sub,
  tint,
  tone = "full",
  width = 92,
}: {
  x: number;
  y: number;
  label: string;
  sub?: string;
  tint: string;
  tone?: "full" | "shadow" | "ghost";
  width?: number;
}) {
  const fill =
    tone === "full" ? `${tint}22` : tone === "shadow" ? `${tint}10` : "transparent";
  const stroke = tone === "ghost" ? `${tint}55` : `${tint}99`;
  const textColor = tone === "full" ? "currentColor" : `${tint}cc`;
  return (
    <g transform={`translate(${x - width / 2} ${y - 16})`}>
      <rect
        width={width}
        height={32}
        rx={2}
        fill={fill}
        stroke={stroke}
        strokeDasharray={tone === "ghost" ? "3 3" : undefined}
      />
      <text
        x={width / 2}
        y={sub ? 13 : 20}
        textAnchor="middle"
        className="font-serif"
        fontSize={sub ? 11 : 12}
        fill={textColor}
      >
        {label}
      </text>
      {sub && (
        <text
          x={width / 2}
          y={25}
          textAnchor="middle"
          className="font-mono"
          fontSize={8}
          letterSpacing={1.2}
          fill={`${tint}99`}
        >
          {sub.toUpperCase()}
        </text>
      )}
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  tint,
  label,
  dashed,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tint: string;
  label?: string;
  dashed?: boolean;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={`${tint}88`}
        strokeWidth={1}
        strokeDasharray={dashed ? "4 3" : undefined}
        markerEnd={`url(#arrow-${tint.replace("#", "")})`}
      />
      {label && (
        <text
          x={mx + nx * 8}
          y={my + ny * 8 + 3}
          textAnchor="middle"
          className="font-mono"
          fontSize={8}
          letterSpacing={1.2}
          fill={`${tint}bb`}
        >
          {label.toUpperCase()}
        </text>
      )}
    </g>
  );
}

function ArrowMarker({ tint }: { tint: string }) {
  return (
    <marker
      id={`arrow-${tint.replace("#", "")}`}
      viewBox="0 0 10 10"
      refX={8}
      refY={5}
      markerWidth={6}
      markerHeight={6}
      orient="auto"
    >
      <path d="M 0 0 L 10 5 L 0 10 z" fill={`${tint}cc`} />
    </marker>
  );
}

function DiagramFrame({
  variant,
  children,
  width = 420,
  height = 200,
  caption,
}: {
  variant: Variant;
  children: ReactNode;
  width?: number;
  height?: number;
  caption: string;
}) {
  const tint = TINT[variant];
  return (
    <figure
      className="my-6 border rounded-sm p-4 md:p-5"
      style={{ borderColor: `${tint}44`, background: `${tint}08` }}
    >
      <div className="flex items-baseline justify-between mb-3">
        <p
          className="font-mono text-[9px] tracking-[0.3em] uppercase"
          style={{ color: tint }}
        >
          shape — {SHAPE_LABEL[variant]}
        </p>
      </div>
      <div className="w-full flex justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-[460px] h-auto text-text-primary"
          role="img"
        >
          <defs>
            <ArrowMarker tint={tint} />
          </defs>
          {children}
        </svg>
      </div>
      <figcaption className="font-serif italic text-[12px] text-text-secondary/70 mt-3 text-center">
        {caption}
      </figcaption>
    </figure>
  );
}

function KwmlDiagram() {
  const tint = TINT.kwml;
  return (
    <DiagramFrame
      variant="kwml"
      caption="King splits into Tyrant (inflated) and Weakling (deflated). Fullness sits between the two failures."
    >
      <Arrow x1={160} y1={100} x2={72} y2={100} tint={tint} label="inflation" />
      <Arrow x1={260} y1={100} x2={348} y2={100} tint={tint} label="deflation" />
      <Node x={50} y={100} label="Tyrant" sub="active" tint={tint} tone="shadow" />
      <Node x={210} y={100} label="King" sub="fullness" tint={tint} tone="full" />
      <Node x={370} y={100} label="Weakling" sub="passive" tint={tint} tone="shadow" />
      <text
        x={210}
        y={40}
        textAnchor="middle"
        className="font-mono"
        fontSize={8}
        letterSpacing={1.4}
        fill={`${tint}aa`}
      >
        GRAMMAR OF DYSFUNCTION
      </text>
      <text
        x={210}
        y={168}
        textAnchor="middle"
        className="font-serif italic"
        fontSize={10}
        fill="currentColor"
        opacity={0.55}
      >
        Warrior → Sadist / Masochist · Magician → Manipulator / Innocent · Lover → Addicted / Impotent
      </text>
    </DiagramFrame>
  );
}

function TarotDiagram() {
  const tint = TINT.tarot;
  return (
    <DiagramFrame
      variant="tarot"
      caption="The Tower integrated is liberating collapse; its active shadow is destruction sought, its passive shadow catastrophe suffered."
    >
      <Arrow x1={200} y1={62} x2={90} y2={140} tint={tint} dashed />
      <Arrow x1={200} y1={62} x2={310} y2={140} tint={tint} dashed />
      <Arrow x1={130} y1={150} x2={270} y2={150} tint={tint} dashed />
      <Node x={200} y={48} label="The Tower" sub="integrated" tint={tint} tone="full" />
      <Node x={70} y={150} label="destruction sought" sub="active" tint={tint} tone="shadow" width={110} />
      <Node x={330} y={150} label="catastrophe suffered" sub="passive" tint={tint} tone="shadow" width={110} />
      <text
        x={200}
        y={22}
        textAnchor="middle"
        className="font-mono"
        fontSize={8}
        letterSpacing={1.4}
        fill={`${tint}aa`}
      >
        EVENT-SYMBOL · THREE READINGS
      </text>
    </DiagramFrame>
  );
}

function EnneagramDiagram() {
  const tint = TINT.enneagram;
  return (
    <DiagramFrame
      variant="enneagram"
      caption="Shadow as transit, not pole. Type 8 under stress moves toward Five's isolation; under security toward Two's tenderness."
    >
      <Arrow x1={180} y1={90} x2={70} y2={50} tint={tint} label="stress" dashed />
      <Arrow x1={240} y1={90} x2={350} y2={50} tint={tint} label="security" dashed />
      <Node x={210} y={100} label="Type 8" sub="home" tint={tint} tone="full" />
      <Node x={50} y={50} label="Type 5" sub="isolation" tint={tint} tone="ghost" />
      <Node x={370} y={50} label="Type 2" sub="tenderness" tint={tint} tone="ghost" />
      <text
        x={210}
        y={160}
        textAnchor="middle"
        className="font-serif italic"
        fontSize={10}
        fill="currentColor"
        opacity={0.55}
      >
        Arrows move through other types — shadow has no fixed location.
      </text>
      <text
        x={210}
        y={180}
        textAnchor="middle"
        className="font-mono"
        fontSize={8}
        letterSpacing={1.4}
        fill={`${tint}99`}
      >
        NARANJO LATER DISAVOWED THE ARROWS
      </text>
    </DiagramFrame>
  );
}

function JungianDiagram() {
  const tint = TINT.jungian;
  return (
    <DiagramFrame
      variant="jungian"
      caption="Pearson names one signature distortion per archetype — Caregiver / martyrdom, Warrior / ruthlessness, Lover / loss of self."
    >
      <Node x={200} y={60} label="Caregiver" sub="archetype" tint={tint} tone="full" />
      <Arrow x1={200} y1={80} x2={200} y2={134} tint={tint} />
      <Node x={200} y={150} label="martyrdom" sub="distortion" tint={tint} tone="shadow" />
      <text
        x={200}
        y={28}
        textAnchor="middle"
        className="font-mono"
        fontSize={8}
        letterSpacing={1.4}
        fill={`${tint}aa`}
      >
        ONE TRAP, NOT TWO POLES
      </text>
      <g opacity={0.4}>
        <text
          x={60}
          y={100}
          className="font-serif italic"
          fontSize={10}
          fill="currentColor"
        >
          Warrior
        </text>
        <text
          x={60}
          y={115}
          className="font-mono"
          fontSize={8}
          letterSpacing={1}
          fill={`${tint}99`}
        >
          ↓ ruthlessness
        </text>
      </g>
      <g opacity={0.4}>
        <text
          x={320}
          y={100}
          className="font-serif italic"
          fontSize={10}
          fill="currentColor"
        >
          Lover
        </text>
        <text
          x={320}
          y={115}
          className="font-mono"
          fontSize={8}
          letterSpacing={1}
          fill={`${tint}99`}
        >
          ↓ loss of self
        </text>
      </g>
    </DiagramFrame>
  );
}

function HerosJourneyDiagram() {
  const tint = TINT["heros-journey"];
  return (
    <DiagramFrame
      variant="heros-journey"
      caption="Shadow here is a character mask in the drama — the antagonist who mirrors the hero. Not a pole, not a distortion, not a transit."
    >
      <line
        x1={200}
        y1={40}
        x2={200}
        y2={160}
        stroke={`${tint}55`}
        strokeDasharray="3 4"
      />
      <text
        x={200}
        y={30}
        textAnchor="middle"
        className="font-mono"
        fontSize={8}
        letterSpacing={1.4}
        fill={`${tint}aa`}
      >
        MIRROR AXIS
      </text>
      <Arrow x1={130} y1={100} x2={175} y2={100} tint={tint} />
      <Arrow x1={270} y1={100} x2={225} y2={100} tint={tint} />
      <Node x={90} y={100} label="Hero" sub="protagonist" tint={tint} tone="full" />
      <Node x={310} y={100} label="Shadow" sub="antagonist" tint={tint} tone="shadow" />
      <text
        x={200}
        y={170}
        textAnchor="middle"
        className="font-serif italic"
        fontSize={10}
        fill="currentColor"
        opacity={0.6}
      >
        A role in the monomyth, not a feature of the psyche.
      </text>
    </DiagramFrame>
  );
}

export default function ShadowStructureDiagram({
  variant,
  className,
}: ShadowStructureDiagramProps) {
  const content = (() => {
    switch (variant) {
      case "kwml":
        return <KwmlDiagram />;
      case "tarot":
        return <TarotDiagram />;
      case "enneagram":
        return <EnneagramDiagram />;
      case "jungian":
        return <JungianDiagram />;
      case "heros-journey":
        return <HerosJourneyDiagram />;
    }
  })();
  return <div className={className}>{content}</div>;
}

const MINI_ORDER: { variant: Variant; label: string; shape: string }[] = [
  { variant: "kwml", label: "KWML", shape: "bipolar" },
  { variant: "tarot", label: "Tarot", shape: "tripartite" },
  { variant: "enneagram", label: "Enneagram", shape: "transit" },
  { variant: "jungian", label: "Pearson", shape: "unipolar" },
  { variant: "heros-journey", label: "Hero's Journey", shape: "mask" },
];

function MiniShape({ variant }: { variant: Variant }) {
  const tint = TINT[variant];
  const stroke = `${tint}cc`;
  const fill = `${tint}33`;
  const dot = (cx: number, cy: number, r = 5, filled = true) => (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={filled ? fill : "transparent"}
      stroke={stroke}
      strokeWidth={1}
    />
  );
  switch (variant) {
    case "kwml":
      return (
        <svg viewBox="0 0 80 40" className="w-full h-auto">
          <line x1={18} y1={20} x2={40} y2={20} stroke={stroke} strokeWidth={1} />
          <line x1={40} y1={20} x2={62} y2={20} stroke={stroke} strokeWidth={1} />
          {dot(14, 20, 5, false)}
          {dot(40, 20, 6)}
          {dot(66, 20, 5, false)}
        </svg>
      );
    case "tarot":
      return (
        <svg viewBox="0 0 80 40" className="w-full h-auto">
          <line x1={40} y1={10} x2={18} y2={30} stroke={stroke} strokeWidth={1} />
          <line x1={40} y1={10} x2={62} y2={30} stroke={stroke} strokeWidth={1} />
          <line x1={18} y1={30} x2={62} y2={30} stroke={stroke} strokeWidth={1} />
          {dot(40, 10, 6)}
          {dot(18, 30, 5, false)}
          {dot(62, 30, 5, false)}
        </svg>
      );
    case "enneagram":
      return (
        <svg viewBox="0 0 80 40" className="w-full h-auto">
          <line
            x1={40}
            y1={22}
            x2={16}
            y2={12}
            stroke={stroke}
            strokeWidth={1}
            strokeDasharray="3 2"
          />
          <line
            x1={40}
            y1={22}
            x2={64}
            y2={12}
            stroke={stroke}
            strokeWidth={1}
            strokeDasharray="3 2"
          />
          {dot(40, 22, 6)}
          {dot(16, 12, 4, false)}
          {dot(64, 12, 4, false)}
        </svg>
      );
    case "jungian":
      return (
        <svg viewBox="0 0 80 40" className="w-full h-auto">
          <line x1={40} y1={14} x2={40} y2={28} stroke={stroke} strokeWidth={1} />
          {dot(40, 10, 5)}
          {dot(40, 32, 5, false)}
        </svg>
      );
    case "heros-journey":
      return (
        <svg viewBox="0 0 80 40" className="w-full h-auto">
          <line
            x1={22}
            y1={20}
            x2={58}
            y2={20}
            stroke={stroke}
            strokeWidth={1}
            strokeDasharray="2 2"
          />
          {dot(18, 20, 5)}
          {dot(62, 20, 5, false)}
        </svg>
      );
  }
}

export function ShadowShapeOverview() {
  return (
    <figure
      role="img"
      aria-label="Five different shadow shapes across five traditions"
      className="my-10"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {MINI_ORDER.map(({ variant, label, shape }) => (
          <div
            key={variant}
            className="border rounded-sm p-3 flex flex-col gap-2 items-center"
            style={{
              borderColor: `${TINT[variant]}44`,
              background: `${TINT[variant]}08`,
            }}
          >
            <p
              className="font-mono text-[9px] tracking-[0.25em] uppercase"
              style={{ color: TINT[variant] }}
            >
              {label}
            </p>
            <div className="w-full px-2">
              <MiniShape variant={variant} />
            </div>
            <p className="font-serif italic text-[11px] text-text-secondary/70">
              {shape}
            </p>
          </div>
        ))}
      </div>
      <figcaption className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-secondary/50 mt-3 text-center">
        Fig. — Five traditions, five different shapes. The old Shadow cluster treated these as one.
      </figcaption>
    </figure>
  );
}
