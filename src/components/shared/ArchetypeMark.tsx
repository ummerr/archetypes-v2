import ClusterTotem from "@/components/viz/ClusterTotem";
import { HeroJourneyArchetypeIcon } from "@/components/HeroJourneyArchetypeIcon";
import { getEnneagramBySlug } from "@/data/enneagram/archetypes";
import { getMbtiBySlug } from "@/data/mbti/archetypes";
import { getTarotBySlug } from "@/data/tarot/archetypes";
import type { SystemId } from "@/data/resonance";

// Map per-archetype slugs to the motif ids exposed by ClusterTotem.
const KWML_MOTIF: Record<string, string> = {
  "the-king": "sovereign",
  "the-warrior": "warrior",
  "the-magician": "sage-magician",
  "the-lover": "lover",
  "the-divine-child": "innocent",
  "the-hero": "boy-hero",
  "the-precocious-child": "creator",
  "the-oedipal-child": "lover",
};

const JUNGIAN_MOTIF: Record<string, string> = {
  innocent: "innocent",
  everyman: "everyman",
  hero: "boy-hero",
  caregiver: "caregiver",
  explorer: "explorer",
  rebel: "rebel",
  lover: "lover",
  creator: "creator",
  jester: "jester",
  sage: "teacher",
  magician: "sage-magician",
  ruler: "sovereign",
};

interface Props {
  system: SystemId;
  slug: string;
  color: string;
  size?: number;
  title?: string;
}

export default function ArchetypeMark({ system, slug, color, size = 22, title }: Props) {
  switch (system) {
    case "kwml":
      return (
        <ClusterTotem
          id={KWML_MOTIF[slug] ?? "default"}
          size="xs"
          animated={false}
          color={color}
          title={title}
        />
      );
    case "jungian":
      return (
        <ClusterTotem
          id={JUNGIAN_MOTIF[slug] ?? "default"}
          size="xs"
          animated={false}
          color={color}
          title={title}
        />
      );
    case "heros-journey":
      return <HeroJourneyArchetypeIcon slug={slug} color={color} size={size} />;
    case "enneagram": {
      const num = getEnneagramBySlug(slug)?.number;
      return <NumberInCircle label={num != null ? String(num) : "?"} color={color} size={size} title={title} />;
    }
    case "mbti": {
      const code = getMbtiBySlug(slug)?.code ?? slug.toUpperCase();
      return <CodeBadge label={code} color={color} size={size} title={title} />;
    }
    case "tarot": {
      const numeral = getTarotBySlug(slug)?.numeral ?? "";
      return <NumeralFrame label={numeral} color={color} size={size} title={title} />;
    }
    default:
      return null;
  }
}

function NumberInCircle({ label, color, size, title }: { label: string; color: string; size: number; title?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role={title ? "img" : "presentation"} aria-label={title}>
      <circle cx={12} cy={12} r={10} fill="none" stroke={color} strokeWidth={1.2} opacity={0.85} />
      <text
        x={12}
        y={12}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize={11}
        fontWeight={500}
        fill={color}
      >
        {label}
      </text>
    </svg>
  );
}

function CodeBadge({ label, color, size, title }: { label: string; color: string; size: number; title?: string }) {
  // 4-letter codes need a wider frame; aspect ratio ~2:1.
  const w = Math.round(size * 1.7);
  const h = size;
  return (
    <svg width={w} height={h} viewBox="0 0 34 20" role={title ? "img" : "presentation"} aria-label={title}>
      <rect x={1} y={1} width={32} height={18} rx={2} fill="none" stroke={color} strokeWidth={1.1} opacity={0.85} />
      <text
        x={17}
        y={10.5}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize={9}
        letterSpacing={1}
        fill={color}
      >
        {label}
      </text>
    </svg>
  );
}

function NumeralFrame({ label, color, size, title }: { label: string; color: string; size: number; title?: string }) {
  // Tarot card frame: tall rectangle, Roman numeral inside.
  const w = Math.round(size * 0.72);
  const h = size;
  return (
    <svg width={w} height={h} viewBox="0 0 16 22" role={title ? "img" : "presentation"} aria-label={title}>
      <rect x={1} y={1} width={14} height={20} rx={1.5} fill="none" stroke={color} strokeWidth={1.1} opacity={0.85} />
      <text
        x={8}
        y={11.5}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="ui-serif, Georgia, serif"
        fontSize={label.length > 3 ? 6 : 8}
        fill={color}
      >
        {label}
      </text>
    </svg>
  );
}
