import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ALL_ARCHETYPES,
  getArchetypeBySlug,
  getFamilyByArchetype,
  FAMILIES,
} from "@/data/archetypes";
import PageTransition from "@/components/PageTransition";
import ShadowTriangle from "@/components/ShadowTriangle";
import EvolutionArrow from "@/components/EvolutionArrow";

export function generateStaticParams() {
  return ALL_ARCHETYPES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const archetype = getArchetypeBySlug(slug);
    if (!archetype) return { title: "Not Found" };
    return {
      title: `${archetype.name} — KWML Archetype Explorer`,
      description: archetype.description,
    };
  });
}

export default async function ArchetypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const archetype = getArchetypeBySlug(slug);
  if (!archetype) notFound();

  const family = getFamilyByArchetype(archetype);
  const color = archetype.accentColor;

  const partner =
    archetype.maturity === "man"
      ? getArchetypeBySlug(archetype.evolutionFrom!)
      : getArchetypeBySlug(archetype.evolutionTo!);

  const boyArchetype = archetype.maturity === "boy" ? archetype : partner!;
  const manArchetype = archetype.maturity === "man" ? archetype : partner!;

  return (
    <PageTransition>
      {/* Hero section with ambient glow */}
      <div className="relative pt-28 pb-16 md:pt-36 md:pb-20 px-6 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[150px] opacity-[0.07]"
          style={{ backgroundColor: color }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-surface-light to-transparent" />

        <div className="relative max-w-2xl mx-auto">
          {/* Back + breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-text-secondary transition-colors mb-10 group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform group-hover:-translate-x-0.5"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Map
          </Link>

          {/* Meta badges */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-block px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] rounded-full border"
              style={{
                color,
                borderColor: `${color}30`,
                backgroundColor: `${color}08`,
              }}
            >
              {archetype.maturity === "boy"
                ? "Boy Psychology"
                : "Man Psychology"}
            </span>
            <span className="flex items-center gap-2 text-xs text-muted">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              {family.label} Family
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-serif text-5xl md:text-6xl font-medium tracking-tight mb-6 leading-[1.1]"
            style={{ color }}
          >
            {archetype.name}
          </h1>

          {/* Description */}
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl">
            {archetype.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Key characteristics */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-px"
                style={{ backgroundColor: `${color}40` }}
              />
              <h2 className="font-serif text-2xl text-text-primary">
                Characteristics
              </h2>
            </div>
            <div className="grid gap-3">
              {archetype.keyCharacteristics.map((trait, i) => (
                <div
                  key={trait}
                  className="flex items-start gap-4 p-4 rounded-xl bg-surface/50 border border-surface-light/50 transition-colors hover:bg-surface-light/30"
                >
                  <span
                    className="text-xs font-mono mt-0.5 opacity-40"
                    style={{ color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-text-secondary text-sm leading-relaxed">
                    {trait}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Shadow Triangle */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-8 h-px"
                style={{ backgroundColor: `${color}40` }}
              />
              <h2 className="font-serif text-2xl text-text-primary">
                The Shadow System
              </h2>
            </div>
            <p className="text-text-secondary text-sm mb-8 leading-relaxed">
              Click each node to explore. The apex represents the fullness —
              the healthy expression. The base corners are the active (inflated)
              and passive (deflated) shadow poles that oscillate when
              unconscious.
            </p>
            <ShadowTriangle archetype={archetype} />
          </section>

          {/* Shadow detail cards */}
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Active shadow */}
              <div className="relative p-6 rounded-2xl border border-crimson/15 overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-crimson/30 to-transparent" />
                <div className="absolute top-0 right-4 w-16 h-16 rounded-full bg-crimson/5 blur-2xl" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-crimson-light/60 mb-3">
                  Active Shadow
                </p>
                <h3 className="font-serif text-xl font-medium text-crimson-light mb-3">
                  {archetype.activeShadow.name}
                </h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  {archetype.activeShadow.description}
                </p>
                <ul className="space-y-2">
                  {archetype.activeShadow.traits.map((t) => (
                    <li key={t} className="text-xs text-muted flex gap-2.5">
                      <span className="text-crimson-light/50 mt-px">&#8212;</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Passive shadow */}
              <div className="relative p-6 rounded-2xl border border-muted/15 overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-muted/30 to-transparent" />
                <div className="absolute top-0 right-4 w-16 h-16 rounded-full bg-muted/5 blur-2xl" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted/60 mb-3">
                  Passive Shadow
                </p>
                <h3 className="font-serif text-lg font-medium text-muted mb-3">
                  {archetype.passiveShadow.name}
                </h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  {archetype.passiveShadow.description}
                </p>
                <ul className="space-y-2">
                  {archetype.passiveShadow.traits.map((t) => (
                    <li key={t} className="text-xs text-muted flex gap-2.5">
                      <span className="opacity-50 mt-px">&#8212;</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Evolution */}
          {partner && (
            <section className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-gold/30" />
                <h2 className="font-serif text-2xl text-text-primary">
                  {archetype.maturity === "boy"
                    ? "The Path to Maturity"
                    : "The Boyhood Foundation"}
                </h2>
              </div>
              <EvolutionArrow from={boyArchetype} to={manArchetype} />
            </section>
          )}

          {/* Access markers */}
          {archetype.accessMarkers && archetype.accessMarkers.length > 0 && (
            <section className="mb-20">
              <div
                className="relative p-6 rounded-2xl border overflow-hidden"
                style={{
                  borderColor: `${color}15`,
                  background: `linear-gradient(135deg, ${color}06 0%, transparent 50%)`,
                }}
              >
                <div
                  className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                  style={{ backgroundColor: `${color}40` }}
                />
                <h3
                  className="font-serif text-lg font-medium mb-1 pl-4"
                  style={{ color }}
                >
                  Access Markers
                </h3>
                <p className="text-xs text-muted mb-4 pl-4">
                  Signs you are accessing this archetype in its fullness
                </p>
                <div className="grid gap-2 pl-4">
                  {archetype.accessMarkers.map((marker) => (
                    <div
                      key={marker}
                      className="flex items-center gap-3 text-sm text-text-secondary"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 7L6 10L11 4"
                          stroke={color}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity="0.6"
                        />
                      </svg>
                      <span>{marker}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Navigation: other archetypes */}
          <section>
            <div className="relative pt-10">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-surface-light to-transparent" />
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-5">
                Continue Exploring
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {FAMILIES.map((f) =>
                  [f.man, f.boy].map((a) =>
                    a.slug !== archetype.slug ? (
                      <Link
                        key={a.slug}
                        href={`/archetype/${a.slug}`}
                        className="group p-3 rounded-xl border border-surface-light/50 hover:border-surface-hover transition-all duration-200 hover:bg-surface/50"
                      >
                        <p
                          className="font-serif text-sm font-medium transition-colors"
                          style={{ color: a.accentColor }}
                        >
                          {a.name}
                        </p>
                        <p className="text-[10px] text-muted mt-0.5">
                          {a.maturity === "boy" ? "Boy" : "Man"}
                        </p>
                      </Link>
                    ) : null
                  )
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
