import type { SystemId } from "@/data/resonance";
import { systemAccent } from "@/lib/resonance";
import { getArchetypeBySlug as getKwmlBySlug } from "@/data/kwml/archetypes";
import { getJungianBySlug } from "@/data/jungian/archetypes";
import { getTarotBySlug } from "@/data/tarot/archetypes";
import { getEnneagramBySlug } from "@/data/enneagram/archetypes";
import { getMbtiBySlug } from "@/data/mbti/archetypes";
import { getHeroJourneyBySlug } from "@/data/herosjourney/archetypes";
import { getFunction } from "@/data/mbti/functions";

interface Pole {
  label: string;
  title: string;
  color: string;
}

interface Props {
  system: SystemId;
  slug: string;
}

const CRIMSON = "#E74C3C";
const MUTED = "var(--color-muted)";

function polesFor(system: SystemId, slug: string, accent: string): Pole[] | null {
  switch (system) {
    case "kwml": {
      const k = getKwmlBySlug(slug);
      if (!k) return null;
      return [
        { label: "Fullness", title: k.fullness.title, color: accent },
        { label: "Active shadow", title: k.activeShadow.name, color: CRIMSON },
        { label: "Passive shadow", title: k.passiveShadow.name, color: MUTED },
      ];
    }
    case "jungian": {
      const j = getJungianBySlug(slug);
      if (!j) return null;
      return [
        { label: "Gift", title: j.gift.replace(/[.?!]+$/, ""), color: accent },
        { label: "Shadow", title: j.shadow.name, color: CRIMSON },
      ];
    }
    case "tarot": {
      const c = getTarotBySlug(slug);
      if (!c) return null;
      return [
        { label: "Fullness", title: c.poles.fullness.title, color: accent },
        { label: "Active shadow", title: c.poles.activeShadow.title, color: CRIMSON },
        { label: "Passive shadow", title: c.poles.passiveShadow.title, color: MUTED },
      ];
    }
    case "enneagram": {
      const e = getEnneagramBySlug(slug);
      if (!e) return null;
      return [
        { label: "Gift", title: e.gift.replace(/[.?!]+$/, ""), color: accent },
        { label: "Trap", title: e.trap.replace(/[.?!]+$/, ""), color: CRIMSON },
      ];
    }
    case "mbti": {
      const m = getMbtiBySlug(slug);
      if (!m) return null;
      const dom = getFunction(m.stack[0].code);
      const inf = getFunction(m.stack[3].code);
      return [
        { label: "Dominant", title: `${dom.nickname} (${dom.code})`, color: accent },
        { label: "Inferior", title: `${inf.nickname} (${inf.code})`, color: MUTED },
      ];
    }
    case "heros-journey": {
      const h = getHeroJourneyBySlug(slug);
      if (!h) return null;
      return [
        { label: "Gift", title: h.gift.replace(/[.?!]+$/, ""), color: accent },
        { label: "Shadow", title: h.shadowPole, color: CRIMSON },
      ];
    }
  }
}

export default function TodayShadowStrip({ system, slug }: Props) {
  const { accent } = systemAccent(system);
  const poles = polesFor(system, slug, accent);
  if (!poles || poles.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6">
      {poles.map((p) => (
        <div key={p.label} className="flex items-start gap-2">
          <span
            aria-hidden
            className="inline-block w-1.5 h-1.5 rounded-full mt-[0.55rem] shrink-0"
            style={{ background: p.color }}
          />
          <div className="flex flex-col">
            <span
              className="font-mono text-kicker tracking-kicker uppercase"
              style={{ color: p.color }}
            >
              {p.label}
            </span>
            <span className="font-serif text-body text-text-primary/90">{p.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
