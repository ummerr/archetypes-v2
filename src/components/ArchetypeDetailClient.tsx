"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Archetype, ArchetypeFamilyGroup } from "@/types/archetype";
import { FAMILIES } from "@/data/kwml/archetypes";
import TotemCanvas from "@/components/TotemCanvas";
import ShadowTriangle from "@/components/ShadowTriangle";
import ShadowSpectrum from "@/components/ShadowSpectrum";
import ShadowTheater from "@/components/ShadowTheater";
import EvolutionArrow from "@/components/EvolutionArrow";
import BoyWithinMan from "@/components/BoyWithinMan";
import { useTheme } from "@/components/ThemeProvider";
import CrossSystemResonance from "@/components/resonance/CrossSystemResonance";
import ArchetypeShareCard from "@/components/viz/ArchetypeShareCard";
import CrossSystemResonanceInline from "@/components/resonance/CrossSystemResonanceInline";
import CounterCanonLinks from "@/components/resonance/CounterCanonLinks";
import ExemplarsTabs from "@/components/shared/ExemplarsTabs";
import { getKwmlExemplars } from "@/data/kwml/exemplars";

interface Props {
  archetype: Archetype;
  family: ArchetypeFamilyGroup;
  partner: Archetype | undefined;
  boyArchetype: Archetype;
  manArchetype: Archetype;
}

const sectionAnim = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as const },
};

function SectionIndex({ n }: { n: string }) {
  return (
    <span className="hidden lg:block absolute -left-12 top-1 font-mono text-kicker tracking-label text-muted/20 select-none">
      {n}
    </span>
  );
}

export default function ArchetypeDetailClient({
  archetype,
  family,
  partner,
  boyArchetype,
  manArchetype,
}: Props) {
  const color = archetype.accentColor;
  const { theme } = useTheme();
  const light = theme === "light";

  return (
    <>
      {/* ═══ HERO ═══ */}
      <div className="relative pt-24 pb-16 md:pt-32 md:pb-20 px-6 overflow-hidden">
        {/* Background washes */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute top-0 left-1/3 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[200px] ${light ? "opacity-[0.06]" : "opacity-[0.08]"}`}
            style={{ backgroundColor: color }}
          />
          <div
            className="absolute top-20 right-0 w-[400px] h-[300px] rounded-full blur-[120px] opacity-[0.04]"
            style={{ backgroundColor: color }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-surface-light to-transparent" />

        <div className="relative max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 mb-10 flex-wrap"
          >
            <Link
              href="/kwml"
              className="font-mono text-kicker tracking-kicker text-muted uppercase hover:text-gold transition-colors"
            >
              KWML
            </Link>
            <span className="text-muted/40 font-mono text-label">/</span>
            <span
              className="font-mono text-kicker tracking-kicker uppercase"
              style={{ color: light ? color : `${color}CC` }}
            >
              {family.label}
            </span>
            <span className="text-muted/40 font-mono text-label">/</span>
            <span
              aria-current="page"
              className="font-mono text-kicker tracking-kicker text-muted uppercase"
            >
              {archetype.maturity === "boy" ? "Boy" : "Man"}
            </span>
            <span className="text-muted/40 font-mono text-label ml-1">·</span>
            <Link
              href="/kwml/about"
              className="font-mono text-kicker tracking-kicker text-muted/80 uppercase hover:text-gold transition-colors"
            >
              About
            </Link>
          </nav>

          <div className="flex flex-col-reverse md:flex-row md:items-start md:gap-12">
            {/* ─── Text column ─── */}
            <motion.div
              className="flex-1 min-w-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              {/* Mono family label */}
              <p
                className="font-mono text-kicker tracking-display uppercase mb-4"
                style={{ color: light ? color : `${color}B0` }}
              >
                {family.label} Family &mdash;{" "}
                {archetype.maturity === "boy"
                  ? "Boy Psychology"
                  : "Man Psychology"}
              </p>

              {/* Title */}
              <h1
                className="font-serif text-5xl md:text-7xl font-medium tracking-tight mb-6 leading-display glow-text-subtle"
                style={{ color }}
              >
                {archetype.name}
              </h1>

              {/* Description */}
              <p className="text-text-secondary text-base md:text-lg leading-article max-w-xl mb-6">
                {archetype.description}
              </p>

              <div className="mb-6">
                <CrossSystemResonanceInline system="kwml" slug={archetype.slug} />
              </div>

              {/* Polarity summary strip */}
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {/* Fullness */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: color }}
                  />
                  <span
                    className="font-mono text-kicker tracking-label uppercase"
                    style={{ color: light ? color : `${color}CC` }}
                  >
                    {archetype.name} in Fullness
                  </span>
                </div>
                {/* Active shadow */}
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-crimson" />
                  <span className="font-mono text-kicker tracking-label text-crimson-light uppercase">
                    {archetype.activeShadow.name}
                  </span>
                </div>
                {/* Passive shadow */}
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted/80" />
                  <span className="font-mono text-kicker tracking-label text-muted uppercase">
                    {archetype.passiveShadow.name}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ─── 3D Totem column ─── */}
            <motion.div
              className="relative w-full md:w-[340px] h-[280px] md:h-[400px] shrink-0 mb-8 md:mb-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.2,
              }}
            >
              <TotemCanvas
                family={archetype.family}
                color={color}
                isHovered={true}
              />
              {/* Shadow labels on totem */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-crimson" />
                <span className="font-mono text-kicker tracking-wider text-crimson-light/80 uppercase">
                  {archetype.activeShadow.name}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 flex items-center gap-1">
                <span className="font-mono text-kicker tracking-wider text-muted/80 uppercase">
                  {archetype.passiveShadow.name}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-muted/80" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="px-6 pb-24">
        <div className="max-w-5xl mx-auto relative">

          {/* ─── 01 FULLNESS ─── */}
          <motion.section className="mb-28 relative" {...sectionAnim}>
            <SectionIndex n="01" />
            <div
              className="retro-card retro-border relative p-8 md:p-10 rounded-2xl overflow-hidden"
              style={{
                borderLeft: `1px dashed ${color}${light ? "40" : "25"}`,
              }}
            >
              <p
                className="font-mono text-kicker tracking-kicker uppercase mb-4"
                style={{ color: light ? color : `${color}CC` }}
              >
                Fullness
              </p>
              <h2
                className="font-serif text-2xl md:text-3xl font-medium mb-4 glow-text-subtle"
                style={{ color }}
              >
                {archetype.fullness.title}
              </h2>
              <hr className="retro-hr mb-6" />
              <p className="text-text-secondary text-base leading-article max-w-3xl">
                {archetype.fullness.description}
              </p>
            </div>
          </motion.section>

          {/* ─── 02 BOY WITHIN MAN ─── */}
          <motion.section className="mb-28 relative" {...sectionAnim}>
            <SectionIndex n="02" />
            <div
              className="retro-card retro-border relative p-8 md:p-10 rounded-2xl overflow-hidden"
              style={{
                borderLeft: `1px dashed ${color}${light ? "40" : "25"}`,
              }}
            >
              <p
                className="font-mono text-kicker tracking-kicker uppercase mb-4"
                style={{ color: light ? color : `${color}CC` }}
              >
                {archetype.maturity === "boy"
                  ? "Boy \u2192 Man"
                  : "Man \u2190 Boy"}
              </p>
              <h2
                className="font-serif text-2xl md:text-3xl font-medium mb-4 glow-text-subtle"
                style={{ color }}
              >
                {archetype.maturity === "boy"
                  ? "The Seed Within the Man"
                  : "The Boy He Carries Within"}
              </h2>
              <hr className="retro-hr mb-6" />
              <p className="text-text-secondary text-base leading-article max-w-3xl mb-8">
                {archetype.maturity === "boy"
                  ? "This boyhood archetype lives as the luminous core within the mature man. Through initiation, the boy\u2019s energy is not destroyed \u2014 it is contained and refined."
                  : "Within the mature man, the boy archetype endures as a living core \u2014 the source of vitality that the man\u2019s structure holds and channels."}
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
            </div>
          </motion.section>

          {/* ─── 03 CHARACTERISTICS ─── */}
          <motion.section className="mb-28 relative" {...sectionAnim}>
            <SectionIndex n="03" />
            <h2 className="font-serif text-2xl text-text-primary mb-1">
              Characteristics
            </h2>
            <p className="font-mono text-kicker tracking-label text-muted uppercase mb-6">
              Defining Qualities
            </p>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
              {archetype.keyCharacteristics.map((trait, i) => (
                <div
                  key={trait}
                  className="group flex items-start gap-4 p-3.5 rounded-xl transition-all duration-200 hover:bg-surface/50"
                  style={{
                    borderLeft: "2px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderLeftColor = `${color}30`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
                  }}
                >
                  <span
                    className="text-label font-mono mt-0.5 opacity-50"
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
          </motion.section>

          {/* ─── 04 SHADOW SYSTEM ─── */}
          <motion.section className="mb-28 relative" {...sectionAnim}>
            <SectionIndex n="04" />
            <div
              className="retro-card retro-border relative p-8 md:p-10 rounded-2xl overflow-visible"
              style={{
                borderLeft: `1px dashed ${color}${light ? "40" : "25"}`,
              }}
            >
              <p
                className="font-mono text-kicker tracking-kicker uppercase mb-4"
                style={{ color: light ? color : `${color}CC` }}
              >
                Shadow Polarity
              </p>

              <h2
                className="font-serif text-2xl md:text-3xl font-medium mb-2 glow-text-subtle"
                style={{ color }}
              >
                The Shadow System
              </h2>
              <p className="font-serif text-base text-text-secondary/70 italic mb-4">
                Where the energy goes when the ego can&rsquo;t hold the center
              </p>
              <hr className="retro-hr mb-6" />
              <p className="text-text-secondary text-base leading-article max-w-3xl mb-4">
                Each archetype holds a fullness at the apex and two shadow poles at
                the base &mdash; one inflated, one deflated. The shadows are not
                separate pathologies but a <em>single dysfunctional system</em>.
              </p>

              {/* Oscillation spectrum */}
              <ShadowSpectrum
                activeName={archetype.activeShadow.name}
                passiveName={archetype.passiveShadow.name}
                fullnessName={archetype.name}
                color={color}
              />

              {/* Triangle */}
              <div className="mt-4">
                <ShadowTriangle archetype={archetype} />
              </div>

              {/* Shadow Theater - interactive possession experience */}
              <div className="mt-10">
                <ShadowTheater
                  archetypeName={archetype.name}
                  archetypeSlug={archetype.slug}
                  activeShadow={archetype.activeShadow}
                  passiveShadow={archetype.passiveShadow}
                  color={color}
                />
              </div>
            </div>
          </motion.section>

          {/* ─── 05 EVOLUTION ─── */}
          {partner && (
            <motion.section className="mb-28 relative" {...sectionAnim}>
              <SectionIndex n="05" />
              <h2 className="font-serif text-2xl text-text-primary mb-8">
                {archetype.maturity === "boy"
                  ? "The Path to Maturity"
                  : "The Boyhood Foundation"}
              </h2>
              <EvolutionArrow from={boyArchetype} to={manArchetype} />
            </motion.section>
          )}

          {/* ─── 06 ACCESS MARKERS ─── */}
          {archetype.accessMarkers && archetype.accessMarkers.length > 0 && (
            <motion.section className="mb-28 relative" {...sectionAnim}>
              <SectionIndex n={partner ? "06" : "05"} />
              <div className="retro-card retro-border relative p-6 md:p-8 rounded-2xl overflow-hidden">
                <h3
                  className="font-serif text-xl font-medium mb-1.5"
                  style={{ color }}
                >
                  Access Markers
                </h3>
                <p className="text-xs text-muted mb-5">
                  Signs you are in conscious relationship with this archetype
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {archetype.accessMarkers.map((marker) => (
                    <div
                      key={marker}
                      className="flex items-center gap-3 text-sm text-text-secondary p-4 rounded-xl transition-colors duration-200 hover:bg-surface/50"
                      style={{
                        border: `1px solid ${color}${light ? "20" : "10"}`,
                        background: `linear-gradient(135deg, ${color}${light ? "08" : "04"} 0%, transparent 60%)`,
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        style={{
                          filter: `drop-shadow(0 0 4px ${color}40)`,
                        }}
                      >
                        <path
                          d="M3 7L6 10L11 4"
                          stroke={color}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity="0.7"
                        />
                      </svg>
                      <span>{marker}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {(() => {
            const exemplars = getKwmlExemplars(archetype.slug);
            if (!exemplars) return null;
            return (
              <motion.section {...sectionAnim}>
                <ExemplarsTabs color={archetype.accentColor} exemplars={exemplars} />
              </motion.section>
            );
          })()}

          <motion.section {...sectionAnim}>
            <CrossSystemResonance
              system="kwml"
              slug={archetype.slug}
              accentColor={archetype.accentColor}
            />
            <CounterCanonLinks parent="kwml" />
          </motion.section>

          <motion.section {...sectionAnim}>
            <ArchetypeShareCard
              system="kwml"
              slug={archetype.slug}
              displayName={archetype.name}
            />
          </motion.section>

          {/* ─── NAVIGATION ─── */}
          <motion.section className="relative" {...sectionAnim}>
            <div className="relative pt-10">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-surface-light to-transparent" />
              <p className="text-label uppercase tracking-kicker text-muted mb-5">
                Continue Exploring
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {FAMILIES.map((f) =>
                  [f.man, f.boy].map((a) =>
                    a.slug !== archetype.slug ? (
                      <Link
                        key={a.slug}
                        href={`/kwml/archetype/${a.slug}`}
                        className="group relative p-3 rounded-xl border transition-all duration-200 hover:shadow-lg"
                        style={{
                          borderColor: `${a.accentColor}${light ? "25" : "15"}`,
                          borderTopWidth: "2px",
                          borderTopColor: `${a.accentColor}${light ? "60" : "40"}`,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = light
                            ? `0 4px 16px rgba(0,0,0,0.06)`
                            : `0 0 20px ${a.accentColor}08`;
                          (e.currentTarget as HTMLElement).style.borderColor = `${a.accentColor}${light ? "40" : "30"}`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          (e.currentTarget as HTMLElement).style.borderColor = `${a.accentColor}${light ? "25" : "15"}`;
                        }}
                      >
                        <p
                          className="font-serif text-sm font-medium"
                          style={{ color: a.accentColor }}
                        >
                          {a.name}
                        </p>
                        <p className="text-label text-muted mt-0.5">
                          {a.maturity === "boy" ? "Boy" : "Man"}
                        </p>
                      </Link>
                    ) : null
                  )
                )}
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </>
  );
}
