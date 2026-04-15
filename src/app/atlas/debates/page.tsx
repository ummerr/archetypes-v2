import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import {
  getContestedEntries,
  archetypeDisplayName,
  debateSlugFor,
  systemAccent,
  confidenceLabel,
} from "@/lib/resonance";
import { buildPageMetadata } from "@/lib/site";
import {
  META_DEBATES,
  CONFIDENCE_LABEL,
  CONFIDENCE_VALUE,
  IMPACT_LABEL,
  STATUS_LABEL,
  STATUS_COLOR,
  type MetaDebate,
} from "@/data/debates";
import { OPEN_QUESTIONS } from "@/data/resonance";
import SectionHeading from "@/components/shared/SectionHeading";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";
import ConfidenceBadge from "@/components/shared/ConfidenceBadge";

export const metadata: Metadata = buildPageMetadata({
  title: "Debates",
  description:
    "Mappings on this site that practitioners actively dispute — with the case for, the case against, and where this site lands.",
  path: "/atlas/debates",
});

export default function DebatesPage() {
  const contested = getContestedEntries();
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-20">
      <SectionHeading kicker="Atlas" as="h1">
        Debates
      </SectionHeading>
      <p className="font-serif italic text-[17px] leading-[1.7] text-text-secondary/85 mt-4 mb-8 max-w-3xl">
        Not every mapping on this site is settled. Some are editorial bets the canon does not
        obviously support; others are structural choices working practitioners dispute. These are
        the ones worth arguing about — with the case for, the case against, and where this site
        lands.
      </p>
      <HermeneuticCaveat variant="inline" className="mb-12" />

      <section className="mb-16">
        <h2 className="font-serif text-xl font-medium mb-1">Where the arguments sit</h2>
        <p className="font-serif italic text-text-secondary/70 text-[14px] mb-6">
          Each debate placed by the site's confidence in its stance and how much of the map rides
          on it.
        </p>
        <DebateMatrix debates={META_DEBATES} />
        <StatusLegend />
      </section>

      <section className="mb-16">
        <h2 className="font-serif text-xl font-medium mb-2">Structural meta-debates</h2>
        <p className="font-serif italic text-text-secondary/70 text-[14px] mb-5">
          Arguments about the shape of the map itself, not individual mappings.
        </p>
        <ul className="space-y-3">
          {META_DEBATES.map((d) => (
            <li key={d.slug}>
              <MetaDebateCard debate={d} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="font-serif text-xl font-medium mb-2">What the map does not resolve</h2>
        <p className="font-serif italic text-text-secondary/70 text-[14px] mb-5">
          Open questions the site carries without deciding — surfaced so readers can weigh them.
        </p>
        <ol className="space-y-4 max-w-3xl list-none">
          {OPEN_QUESTIONS.map((q, i) => (
            <li
              key={i}
              className="grid grid-cols-[2.5rem_1fr] gap-4 items-baseline font-serif text-[15px] italic text-text-secondary/85 leading-relaxed"
            >
              <span className="font-mono not-italic text-[10px] tracking-[0.25em] text-muted/70 pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{q}</span>
            </li>
          ))}
        </ol>
      </section>

      {contested.length > 0 && (
        <section>
          <h2 className="font-serif text-xl font-medium mb-2">Contested mappings</h2>
          <p className="font-serif italic text-text-secondary/70 text-[14px] mb-5">
            Individual placements flagged as contested in the resonance data.
          </p>
          <ul className="space-y-3">
            {contested.map(({ cluster, entry }) => {
              const { accent } = systemAccent(entry.system);
              const name = archetypeDisplayName(entry.system, entry.slug) ?? entry.slug;
              return (
                <li key={`${cluster.id}-${entry.system}-${entry.slug}`}>
                  <Link
                    href={`/atlas/debates/${debateSlugFor(cluster.id, entry.system, entry.slug)}`}
                    className="flex items-start gap-4 rounded-sm border border-amber-500/30 p-4 hover:border-amber-500/60 transition-colors"
                  >
                    <span
                      aria-hidden
                      className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: accent }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-500/90 mb-1">
                        {cluster.theme.split(" — ")[0].replace(/^The\s+/i, "")}
                      </p>
                      <p className="font-serif text-lg">
                        Does <em>{name}</em> belong here?
                      </p>
                    </div>
                    <ConfidenceBadge tier={entry.confidence} className="mt-1 shrink-0" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 font-mono text-[10px] tracking-[0.25em] uppercase text-muted/70">
            Tier meaning:{" "}
            {(["canonical", "strong", "moderate", "speculative", "contested"] as const)
              .map((t) => confidenceLabel(t).toLowerCase())
              .join(" · ")}
          </p>
        </section>
      )}
    </div>
  );
}

function MetaDebateCard({ debate }: { debate: MetaDebate }) {
  return (
    <Link
      href={`/atlas/debates/${debate.slug}`}
      className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-8 rounded-sm border border-surface-light/40 p-5 hover:border-gold/40 transition-colors"
    >
      <div className="min-w-0">
        <p className="font-serif text-lg mb-2 leading-snug">{debate.heading}</p>
        <p className="font-serif italic text-[14px] leading-[1.6] text-text-secondary/75">
          {debate.stance}
        </p>
      </div>
      <div className="flex md:flex-col flex-wrap gap-3 md:gap-2.5 md:w-[11rem] md:shrink-0 md:items-end md:text-right md:border-l md:border-surface-light/30 md:pl-6">
        <ConfidenceMeter value={CONFIDENCE_VALUE[debate.confidence]} label={CONFIDENCE_LABEL[debate.confidence]} />
        <ImpactChip impact={debate.impact} />
        <StatusDot status={debate.status} />
      </div>
    </Link>
  );
}

function ConfidenceMeter({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col gap-1 md:items-end">
      <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted/70">
        {label}
      </span>
      <div className="flex gap-1" aria-label={label}>
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className="block w-6 h-[3px] rounded-sm"
            style={{
              background: i <= value ? "var(--gold, #c9a961)" : "rgba(255,255,255,0.08)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ImpactChip({ impact }: { impact: MetaDebate["impact"] }) {
  const structural = impact === "structural";
  return (
    <span
      className="inline-flex items-center font-mono text-[9px] tracking-[0.25em] uppercase px-1.5 py-0.5 rounded-sm"
      style={{
        color: structural ? "var(--gold, #c9a961)" : "rgba(var(--text-secondary-rgb, 200 200 200) / 0.8)",
        border: `1px solid ${structural ? "rgba(201, 169, 97, 0.45)" : "rgba(255,255,255,0.18)"}`,
      }}
      title={`${IMPACT_LABEL[impact]} impact`}
    >
      {IMPACT_LABEL[impact]}
    </span>
  );
}

function StatusDot({ status }: { status: MetaDebate["status"] }) {
  const color = STATUS_COLOR[status];
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className="w-2 h-2 rounded-full"
        style={{ background: color, boxShadow: `0 0 0 3px ${color}1f` }}
      />
      <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-secondary/75">
        {STATUS_LABEL[status]}
      </span>
    </span>
  );
}

function DebateMatrix({ debates }: { debates: MetaDebate[] }) {
  const cols: MetaDebate["impact"][] = ["scoped", "structural"];
  const rows: MetaDebate["confidence"][] = ["high", "moderate", "low"];
  return (
    <div className="rounded-sm border border-surface-light/40 p-5 md:p-6 bg-surface/20">
      <div className="grid grid-cols-[auto_1fr_1fr] gap-0">
        <div />
        {cols.map((c) => (
          <div
            key={c}
            className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted/70 text-center pb-3"
          >
            {IMPACT_LABEL[c]} impact
          </div>
        ))}
        {rows.map((r, ri) => (
          <Fragment key={r}>
            <div
              className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted/70 pr-4 flex items-center justify-end"
            >
              {r === "high" ? "High conf." : r === "moderate" ? "Mod." : "Low conf."}
            </div>
            {cols.map((c) => {
              const cell = debates.filter((d) => d.confidence === r && d.impact === c);
              const isBottom = ri === rows.length - 1;
              return (
                <div
                  key={`${r}-${c}`}
                  className={`min-h-[4.25rem] border-surface-light/25 p-3 ${
                    c === "scoped" ? "border-r" : ""
                  } ${isBottom ? "" : "border-b"} flex flex-col gap-1.5`}
                >
                  {cell.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/atlas/debates/${d.slug}`}
                      className="group flex items-center gap-2 min-w-0"
                      title={d.heading}
                    >
                      <span
                        aria-hidden
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: STATUS_COLOR[d.status] }}
                      />
                      <span className="font-serif italic text-[13px] leading-snug text-text-secondary/85 group-hover:text-gold transition-colors truncate">
                        {shortTitle(d.slug)}
                      </span>
                    </Link>
                  ))}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function StatusLegend() {
  const items: MetaDebate["status"][] = [
    "unresolved",
    "working-hypothesis",
    "resolved-with-caveats",
  ];
  return (
    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
      {items.map((s) => (
        <span key={s} className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: STATUS_COLOR[s] }}
          />
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted/70">
            {STATUS_LABEL[s]}
          </span>
        </span>
      ))}
    </div>
  );
}

function shortTitle(slug: string): string {
  switch (slug) {
    case "liminal-territory-real":
      return "Liminal Territory as axis";
    case "mbti-inclusion":
      return "Including MBTI";
    case "masculine-coded-universal":
      return "Boy → Man as universal";
    case "murdock-vs-campbell":
      return "Murdock vs. Campbell";
    case "riso-vs-naranjo":
      return "Riso-Hudson arrows";
    default:
      return slug;
  }
}
