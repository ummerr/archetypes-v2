import type { SystemId } from "@/data/resonance";

const S = 240;
const HJ_S = 240;
const HJ_VB = "0 0 32 32";

type TotemJsx = React.ReactElement;

const hjIcons: Record<string, (c: string) => TotemJsx> = {
  hero: (c) => (
    <svg width={HJ_S} height={HJ_S} viewBox={HJ_VB} fill="none" stroke={c} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7l12 12" />
      <path d="M25 7L13 19" />
      <path d="M5 21l4 4 2-2-4-4z" />
      <path d="M27 21l-4 4-2-2 4-4z" />
      <path d="M19 19l2 2" />
      <path d="M13 19l-2 2" />
    </svg>
  ),
  mentor: (c) => (
    <svg width={HJ_S} height={HJ_S} viewBox={HJ_VB} fill="none" stroke={c} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4c-2 2-2 4 0 6 2-2 2-4 0-6z" fill={c} fillOpacity={0.3} />
      <path d="M16 10v4" />
      <rect x={13} y={14} width={6} height={10} rx={1} />
      <path d="M12 24h8" />
      <path d="M16 24v4" />
    </svg>
  ),
  herald: (c) => (
    <svg width={HJ_S} height={HJ_S} viewBox={HJ_VB} fill="none" stroke={c} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 6l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill={c} fillOpacity={0.2} />
      <path d="M16 2v2" />
      <path d="M16 28v2" />
      <path d="M2 16h2" />
      <path d="M28 16h2" />
    </svg>
  ),
  "threshold-guardian": (c) => (
    <svg width={HJ_S} height={HJ_S} viewBox={HJ_VB} fill="none" stroke={c} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4l10 4v8c0 6-5 10-10 12-5-2-10-6-10-12V8z" fill={c} fillOpacity={0.15} />
      <path d="M8 16h16" />
      <path d="M16 10v12" />
    </svg>
  ),
  shapeshifter: (c) => (
    <svg width={HJ_S} height={HJ_S} viewBox={HJ_VB} fill="none" stroke={c} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6a10 10 0 100 20 7 7 0 010-20z" fill={c} fillOpacity={0.2} />
      <path d="M20 6a10 10 0 110 20 7 7 0 100-20z" />
    </svg>
  ),
  shadow: (c) => (
    <svg width={HJ_S} height={HJ_S} viewBox={HJ_VB} fill="none" stroke={c} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={16} cy={16} r={10} />
      <path d="M16 6a10 10 0 000 20 10 10 0 010-20z" fill={c} fillOpacity={0.6} />
    </svg>
  ),
  trickster: (c) => (
    <svg width={HJ_S} height={HJ_S} viewBox={HJ_VB} fill="none" stroke={c} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4l10 12-10 12L6 16z" fill={c} fillOpacity={0.15} />
      <circle cx={12} cy={14} r={1} fill={c} />
      <circle cx={20} cy={14} r={1} fill={c} />
      <path d="M12 20c1.5 1.5 2.5 1.5 4 0s2.5-1.5 4 0" />
    </svg>
  ),
  ally: (c) => (
    <svg width={HJ_S} height={HJ_S} viewBox={HJ_VB} fill="none" stroke={c} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={12} cy={16} r={6} />
      <circle cx={20} cy={16} r={6} />
    </svg>
  ),
};

const kwmlIcons: Record<string, (c: string) => TotemJsx> = {
  king: (c) => (
    <svg width={S} height={S} viewBox="0 0 80 80" fill="none">
      <path d="M12 58L20 28L30 44L40 20L50 44L60 28L68 58Z" stroke={c} strokeWidth={1.5} strokeLinejoin="round" fill={`${c}08`} />
      <line x1={12} y1={58} x2={68} y2={58} stroke={c} strokeWidth={1.5} />
      <line x1={10} y1={64} x2={70} y2={64} stroke={c} strokeWidth={1} opacity={0.4} />
      <circle cx={40} cy={20} r={2} fill={c} opacity={0.6} />
      <circle cx={20} cy={28} r={1.5} fill={c} opacity={0.4} />
      <circle cx={60} cy={28} r={1.5} fill={c} opacity={0.4} />
    </svg>
  ),
  warrior: (c) => (
    <svg width={S} height={S} viewBox="0 0 80 80" fill="none">
      <path d="M40 12L64 24V44C64 56 52 66 40 72C28 66 16 56 16 44V24L40 12Z" stroke={c} strokeWidth={1.5} strokeLinejoin="round" fill={`${c}08`} />
      <line x1={40} y1={22} x2={40} y2={58} stroke={c} strokeWidth={1.2} opacity={0.5} />
      <line x1={32} y1={34} x2={48} y2={34} stroke={c} strokeWidth={1.2} opacity={0.5} />
      <circle cx={40} cy={60} r={2} fill={c} opacity={0.3} />
    </svg>
  ),
  magician: (c) => (
    <svg width={S} height={S} viewBox="0 0 80 80" fill="none">
      <path d="M8 40C8 40 24 18 40 18C56 18 72 40 72 40C72 40 56 62 40 62C24 62 8 40 8 40Z" stroke={c} strokeWidth={1.5} strokeLinejoin="round" fill={`${c}08`} />
      <circle cx={40} cy={40} r={12} stroke={c} strokeWidth={1} opacity={0.5} />
      <circle cx={40} cy={40} r={5} fill={c} opacity={0.3} />
      <circle cx={40} cy={40} r={2} fill={c} opacity={0.6} />
    </svg>
  ),
  lover: (c) => (
    <svg width={S} height={S} viewBox="0 0 80 80" fill="none">
      <path d="M40 68C40 68 12 48 12 32C12 22 20 14 30 14C35 14 38 17 40 20C42 17 45 14 50 14C60 14 68 22 68 32C68 48 40 68 40 68Z" stroke={c} strokeWidth={1.5} strokeLinejoin="round" fill={`${c}08`} />
    </svg>
  ),
};

function glyphRing(char: string, color: string): TotemJsx {
  return (
    <div
      style={{
        width: S,
        height: S,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: S - 20,
          height: S - 20,
          borderRadius: "50%",
          border: `1.5px solid ${color}55`,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: S - 50,
          height: S - 50,
          borderRadius: "50%",
          border: `1px dashed ${color}30`,
          display: "flex",
        }}
      />
      <div
        style={{
          fontSize: 96,
          color,
          fontFamily: "Georgia, serif",
          lineHeight: 1,
          display: "flex",
        }}
      >
        {char}
      </div>
    </div>
  );
}

function mbtiCode(code: string, color: string): TotemJsx {
  return (
    <div
      style={{
        width: S,
        height: S,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          fontSize: 88,
          fontFamily: "Georgia, serif",
          fontWeight: 500,
          letterSpacing: 8,
          color,
          lineHeight: 1,
          display: "flex",
        }}
      >
        {code}
      </div>
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: color,
          opacity: 0.5,
          display: "flex",
        }}
      />
    </div>
  );
}

export function ogTotem(
  system: SystemId,
  slug: string,
  accent: string,
  opts?: { symbol?: string; mbtiCode?: string; kwmlFamily?: string },
): TotemJsx | null {
  switch (system) {
    case "heros-journey":
      return hjIcons[slug]?.(accent) ?? null;
    case "kwml":
      return opts?.kwmlFamily ? (kwmlIcons[opts.kwmlFamily]?.(accent) ?? null) : null;
    case "jungian":
    case "enneagram":
    case "tarot":
      return opts?.symbol ? glyphRing(opts.symbol, accent) : null;
    case "mbti":
      return opts?.mbtiCode ? mbtiCode(opts.mbtiCode, accent) : null;
    default:
      return null;
  }
}
