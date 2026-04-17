"use client";

import type { IndexEntry } from "@/data/allArchetypes";
import {
  AGE_COLOR,
  AGE_LABEL,
  VALENCE_COLOR,
  VALENCE_LABEL,
  INTROVERSION_COLOR,
  INTROVERSION_LABEL,
} from "@/data/indexTags";
import { useTheme } from "@/components/ThemeProvider";
import ArchetypeCardVisual from "./ArchetypeCardVisual";
import CardShell from "./CardShell";

export default function ArchetypeIndexCard({
  entry,
  index,
}: {
  entry: IndexEntry;
  index: number;
}) {
  const { theme } = useTheme();
  const light = theme === "light";
  const c = entry.accentColor;

  return (
    <CardShell
      href={entry.href}
      accentColor={c}
      index={index}
      metaLeft={
        <span
          className="font-mono text-kicker tracking-kicker uppercase"
          style={{ color: `${c}${light ? "" : "CC"}`, opacity: light ? 0.85 : 1 }}
        >
          {entry.systemName}
        </span>
      }
      metaRight={
        <span className="flex items-center gap-1.5 font-mono text-kicker tracking-kicker uppercase text-muted/80">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: entry.innerGroup.color }}
            aria-hidden
          />
          {entry.innerGroup.label}
        </span>
      }
      token={(hovered) => <ArchetypeCardVisual entry={entry} hovered={hovered} />}
      title={(hovered) => (
        <h3
          className="font-serif text-xl md:text-h3 font-medium tracking-tight leading-tight transition-all duration-300 flex-1"
          style={{
            color: light ? "var(--color-text-primary)" : c,
            textShadow: hovered && !light ? `0 0 16px ${c}40` : "none",
          }}
        >
          {entry.name}
        </h3>
      )}
      subtitle={
        entry.motto ? (
          <p className="font-serif italic text-xs md:text-sm text-text-secondary/85 leading-snug">
            &ldquo;{entry.motto}&rdquo;
          </p>
        ) : undefined
      }
      footer={
        <>
          <span
            aria-hidden
            title={`Age: ${AGE_LABEL[entry.tags.age]}`}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: AGE_COLOR[entry.tags.age], opacity: light ? 0.8 : 0.7 }}
          />
          <span
            aria-hidden
            title={`Valence: ${VALENCE_LABEL[entry.tags.valence]}`}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: VALENCE_COLOR[entry.tags.valence], opacity: light ? 0.8 : 0.7 }}
          />
          <span
            aria-hidden
            title={`Orientation: ${INTROVERSION_LABEL[entry.tags.introversion]}`}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: INTROVERSION_COLOR[entry.tags.introversion],
              opacity: light ? 0.8 : 0.7,
            }}
          />
        </>
      }
      footerAriaLabel={`${AGE_LABEL[entry.tags.age]} · ${VALENCE_LABEL[entry.tags.valence]} · ${INTROVERSION_LABEL[entry.tags.introversion]}`}
    />
  );
}
