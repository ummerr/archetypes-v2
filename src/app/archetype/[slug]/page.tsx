import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ALL_ARCHETYPES,
  getArchetypeBySlug,
  getFamilyByArchetype,
  FAMILIES,
} from "@/data/archetypes";
import ShadowTriangle from "@/components/ShadowTriangle";
import EvolutionArrow from "@/components/EvolutionArrow";
import RevealSection from "@/components/RevealSection";
import BoyWithinMan from "@/components/BoyWithinMan";

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
    <>
      {/* Hero */}
      <div className="relative pt-24 pb-16 md:pt-32 md:pb-20 px-6 overflow-hidden">
        {/* Subtle color wash */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[160px] opacity-[0.05]"
            style={{ backgroundColor: color }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-surface-light to-transparent" />

        <div className="relative max-w-2xl mx-auto">
          {/* Back */}
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
            Back
          </Link>

          {/* Badges */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-block px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] rounded-full border"
              style={{
                color,
                borderColor: `${color}25`,
                backgroundColor: `${color}06`,
              }}
            >
              {archetype.maturity === "boy"
                ? "Boy Psychology"
                : "Man Psychology"}
            </span>
            <span className="text-xs text-muted">
              {family.label} Family
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-6 leading-[1.08]"
            style={{ color }}
          >
            {archetype.name}
          </h1>

          {/* Description */}
          <p className="text-text-secondary text-base md:text-lg leading-[1.7] max-w-xl">
            {archetype.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <RevealSection>
        <div className="px-6 pb-24">
          <div className="max-w-2xl mx-auto">

            {/* Boy Within Man Visualization */}
            <section className="reveal mb-20">
              <h2 className="font-serif text-2xl text-text-primary mb-3">
                {archetype.maturity === "boy"
                  ? "The Seed Within the Man"
                  : "The Boy He Carries Within"}
              </h2>
              <p className="text-text-secondary/60 text-sm mb-8 leading-relaxed max-w-lg">
                {archetype.maturity === "boy"
                  ? "This boyhood archetype lives as the luminous core within the mature man. Through initiation, the boy's energy is not destroyed — it is contained and refined."
                  : "Within the mature man, the boy archetype endures as a living core — the source of vitality that the man's structure holds and channels."}
              </p>
              <BoyWithinMan
                boyName={boyArchetype.name}
                manName={manArchetype.name}
                color={color}
                boyShadowActive={boyArchetype.activeShadow.name}
                boyShadowPassive={boyArchetype.passiveShadow.name}
                manShadowActive={manArchetype.activeShadow.name}
                manShadowPassive={manArchetype.passiveShadow.name}
                maturity={archetype.maturity}
              />
            </section>

            {/* Characteristics */}
            <section className="reveal mb-20">
              <h2 className="font-serif text-2xl text-text-primary mb-6">
                Characteristics
              </h2>
              <div className="grid gap-1.5">
                {archetype.keyCharacteristics.map((trait, i) => (
                  <div
                    key={trait}
                    className="group flex items-start gap-4 p-3.5 rounded-xl transition-colors duration-200 hover:bg-surface/50"
                  >
                    <span
                      className="text-[10px] font-mono mt-0.5 opacity-25"
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

            {/* Shadow System */}
            <section className="reveal mb-20">
              <h2 className="font-serif text-2xl text-text-primary mb-3">
                The Shadow System
              </h2>
              <p className="text-text-secondary/60 text-sm mb-8 leading-relaxed max-w-lg">
                Each archetype holds a fullness at the apex and two shadow poles
                at the base — one inflated, one deflated.
              </p>
              <ShadowTriangle archetype={archetype} />
            </section>

            {/* Shadow detail cards */}
            <section className="reveal mb-20">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Active shadow */}
                <div className="relative p-6 rounded-2xl border border-crimson/10 overflow-hidden hover:border-crimson/20 transition-colors duration-300">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-crimson/20 to-transparent" />
                  <p className="text-[9px] uppercase tracking-[0.2em] text-crimson-light/40 mb-3">
                    Active Shadow
                  </p>
                  <h3 className="font-serif text-lg font-medium text-crimson-light mb-2.5">
                    {archetype.activeShadow.name}
                  </h3>
                  <p className="text-sm text-text-secondary/60 mb-4 leading-relaxed">
                    {archetype.activeShadow.description}
                  </p>
                  <ul className="space-y-2">
                    {archetype.activeShadow.traits.map((t) => (
                      <li key={t} className="text-xs text-muted flex gap-2.5">
                        <span className="text-crimson/30 mt-px shrink-0">&#9670;</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Passive shadow */}
                <div className="relative p-6 rounded-2xl border border-muted/10 overflow-hidden hover:border-muted/20 transition-colors duration-300">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-muted/15 to-transparent" />
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted/40 mb-3">
                    Passive Shadow
                  </p>
                  <h3 className="font-serif text-lg font-medium text-muted mb-2.5">
                    {archetype.passiveShadow.name}
                  </h3>
                  <p className="text-sm text-text-secondary/60 mb-4 leading-relaxed">
                    {archetype.passiveShadow.description}
                  </p>
                  <ul className="space-y-2">
                    {archetype.passiveShadow.traits.map((t) => (
                      <li key={t} className="text-xs text-muted flex gap-2.5">
                        <span className="opacity-25 mt-px shrink-0">&#9670;</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Evolution */}
            {partner && (
              <section className="reveal mb-20">
                <h2 className="font-serif text-2xl text-text-primary mb-8">
                  {archetype.maturity === "boy"
                    ? "The Path to Maturity"
                    : "The Boyhood Foundation"}
                </h2>
                <EvolutionArrow from={boyArchetype} to={manArchetype} />
              </section>
            )}

            {/* Access markers */}
            {archetype.accessMarkers && archetype.accessMarkers.length > 0 && (
              <section className="reveal mb-20">
                <div
                  className="relative p-6 md:p-8 rounded-2xl border overflow-hidden"
                  style={{
                    borderColor: `${color}10`,
                    background: `linear-gradient(135deg, ${color}04 0%, transparent 40%)`,
                  }}
                >
                  <h3
                    className="font-serif text-xl font-medium mb-1.5"
                    style={{ color }}
                  >
                    Access Markers
                  </h3>
                  <p className="text-xs text-muted mb-5">
                    Signs you are in conscious relationship with this archetype
                  </p>
                  <div className="grid gap-2.5">
                    {archetype.accessMarkers.map((marker) => (
                      <div
                        key={marker}
                        className="flex items-center gap-3 text-sm text-text-secondary"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M3 7L6 10L11 4"
                            stroke={color}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.5"
                          />
                        </svg>
                        <span>{marker}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Navigation */}
            <section className="reveal">
              <div className="relative pt-10">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-surface-light to-transparent" />
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted/50 mb-5">
                  Continue Exploring
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {FAMILIES.map((f) =>
                    [f.man, f.boy].map((a) =>
                      a.slug !== archetype.slug ? (
                        <Link
                          key={a.slug}
                          href={`/archetype/${a.slug}`}
                          className="group relative p-3 rounded-xl border border-surface-light/30 hover:border-surface-hover transition-colors duration-200"
                        >
                          <p
                            className="font-serif text-sm font-medium"
                            style={{ color: a.accentColor }}
                          >
                            {a.name}
                          </p>
                          <p className="text-[10px] text-muted/50 mt-0.5">
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
      </RevealSection>
    </>
  );
}
