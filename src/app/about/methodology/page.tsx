import type { Metadata } from "next";
import Link from "next/link";
import { CONFIDENCE_TIERS, STANCE_NOTE } from "@/data/resonance";
import { buildPageMetadata } from "@/lib/site";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";
import SectionHeading from "@/components/shared/SectionHeading";
import PipelineDiagram from "@/components/methodology/PipelineDiagram";
import ConfidenceDistribution from "@/components/methodology/ConfidenceDistribution";
import SixSourceMatrix from "@/components/methodology/SixSourceMatrix";
import EntryAnatomy from "@/components/methodology/EntryAnatomy";
import {
  COUNTER_CANON_ENTRIES,
  COUNTER_CANON_HONEST,
} from "@/data/methodology/counter-canon";
import { SHADOW_MODELS } from "@/data/methodology/shadow-models";

export const metadata: Metadata = buildPageMetadata({
  title: "Methodology",
  description:
    "How the cross-system resonance map was built: an eleven-mission research pipeline, a weak-hermeneutic stance, five confidence tiers, adversarial review, and the counter-canon and shadow-structure corrections it produced.",
  path: "/about/methodology",
});

export default function MethodologyPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 py-20 font-serif text-[17px] leading-[1.7] text-text-secondary/90">
      <SectionHeading kicker="About" as="h1">
        Methodology
      </SectionHeading>

      <HermeneuticCaveat variant="banner" className="mb-10" />

      <p className="font-serif italic text-[18px] text-text-secondary/85 mb-8">
        This page is the long-form account of how the resonance map was built - the pipeline
        that produced it, the anatomy of a single mapping, the counter-canon that corrects it,
        and the five different theories of shadow it refuses to flatten.
      </p>

      <h2 className="font-serif text-2xl font-medium mt-12 mb-3">What the map is</h2>
      <p>{STANCE_NOTE}</p>
      <p className="mt-4">
        This site is a <em>comparative hermeneutic atlas</em>. It sets six archetypal vocabularies
        side by side - Jungian (Pearson-Marr), Enneagram (Riso-Hudson), KWML (Moore &amp; Gillette),
        Myers-Briggs, Hero&apos;s Journey (Campbell / Vogler), and Tarot (Major Arcana) - and maps
        resonances between them. It does not claim that these six traditions describe the same
        underlying psyche. It claims only that reading them together is sometimes more illuminating
        than reading any one alone.
      </p>

      <h2 className="font-serif text-2xl font-medium mt-12 mb-3">The problem we started with</h2>
      <p>
        The first version of this map was hand-coded from general reading. Every cluster felt
        obvious, which is itself a warning: when six traditions seem to converge effortlessly on
        twenty tidy themes, what you are likely seeing is not convergence but shared intellectual
        descent. Jung is upstream of most of it. Campbell read Jung; Pearson built on Campbell;
        Moore &amp; Gillette cite Jung; Riso and Hudson borrowed structure from Ichazo who borrowed
        from Gurdjieff; Jungian Tarot is a twentieth-century overlay. Agreement between downstream
        readers of the same source is not independent corroboration.
      </p>
      <p className="mt-4">
        The pipeline below was designed to test the hand-coded map against primary literature,
        academic scholarship, and cultural critique - then attack every surviving mapping before
        letting it into the final atlas.
      </p>

      <h2 className="font-serif text-2xl font-medium mt-12 mb-3">The pipeline</h2>
      <p>
        Eleven missions across four phases. Each mission wrote one structured JSON file to{" "}
        <code className="font-mono text-[13px] text-gold/80">/research/</code> so the work is
        independently resumable and the evidence is auditable.
      </p>

      <PipelineDiagram />

      <h3 className="font-serif text-xl font-medium mt-8 mb-2">Phase 1 - Deep Research</h3>
      <p>
        Seven missions of web search and synthesis, one per tradition plus a seventh for cultural
        and gender critique. Each mission asked the same questions: who is the primary source,
        who are the scholarly receivers, what lineage does the author actually claim, and what
        does the academic literature dispute? The goal was to catch Jungian assumptions that had
        been laundered into apparent consensus.
      </p>

      <h3 className="font-serif text-xl font-medium mt-6 mb-2">Phase 2 - Structural Analysis</h3>
      <p>
        Two missions with no web access, reading only Phase 1 outputs and the site&apos;s own
        archetype corpus. Mission 8 extracted semantic feature vectors (motivation axis, emotional
        core, relational stance, shadow pattern, developmental stage) and built a similarity
        matrix. Mission 9 named the meta-patterns that survived the matrix: isomorphic structures,
        developmental sequences, and - critically - the energies every system leaves out.
      </p>

      <h3 className="font-serif text-xl font-medium mt-6 mb-2">Phase 3 - Adversarial Debate</h3>
      <p>
        A single ruthless mission whose job was to attack every proposed mapping: over-fits, false
        equivalences, cherry-picked evidence, category errors, and the question of whether the
        comparative project itself is flawed. The output is preserved at{" "}
        <code className="font-mono text-[13px] text-gold/80">research/10-adversarial.json</code>{" "}
        and fed directly into synthesis.
      </p>

      <h3 className="font-serif text-xl font-medium mt-6 mb-2">Phase 4 - Editorial Synthesis</h3>
      <p>
        Mission 11 triangulated everything: confidence assigned per entry, every adversarial
        critique either modified, caveated, or rebutted (never ignored), citations attached,
        dissent preserved on the record. The output is{" "}
        <code className="font-mono text-[13px] text-gold/80">src/data/grounded-resonance-map.json</code>
        , which is what this site renders.
      </p>

      <h2 className="font-serif text-2xl font-medium mt-12 mb-3">Anatomy of a grounded entry</h2>
      <p>
        Every mapping on the atlas carries its evidence and its dissent on its own back. A single
        entry looks like this:
      </p>

      <EntryAnatomy />

      <p className="mt-2">
        Primary source is the tradition&apos;s own text. Scholarship is academic reception. Dissent
        records where the literature disagrees. The adversarial note preserves the strongest
        counter-argument from Mission 10. The editorial note is where the site&apos;s own
        judgement is shown rather than hidden. When a field is empty, its absence is also data.
      </p>

      <h2 className="font-serif text-2xl font-medium mt-12 mb-3">Source triangulation</h2>
      <p>
        No tradition is read from primary sources alone. Each system was worked through three
        passes: the authors&apos; own text, the academic reception of that text, and the cultural
        critique that names what the text excludes. Where these three disagree - and they often do -
        the disagreement is recorded rather than resolved.
      </p>

      <SixSourceMatrix />

      <h2 className="font-serif text-2xl font-medium mt-12 mb-3">Five confidence tiers</h2>
      <p>Every mapping on this site carries one of five labels:</p>
      <ul className="mt-3 space-y-2">
        {(Object.keys(CONFIDENCE_TIERS) as (keyof typeof CONFIDENCE_TIERS)[]).map((t) => (
          <li key={t}>
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase mr-2 text-gold/90">
              {t}
            </span>
            <span className="italic">{CONFIDENCE_TIERS[t]}</span>
          </li>
        ))}
      </ul>

      <ConfidenceDistribution />

      <p className="mt-2">
        A mapping marked <em>canonical</em> is one the tradition&apos;s own author would endorse.{" "}
        <em>Strong</em> and <em>moderate</em> describe degrees of academic support.{" "}
        <em>Speculative</em> and <em>contested</em> are live on the map because suppressing them
        would misrepresent where the conversation actually is. Confidence is a first-class
        property of every claim, not a footnote.
      </p>

      <h2 className="font-serif text-2xl font-medium mt-12 mb-3">What the map does not claim</h2>
      <p>
        The strong form of the project - that these six traditions co-describe the universal
        structure of psyche - fails. Convergence is partly shared intellectual descent, not
        independent corroboration. We do not claim to have discovered an underlying grammar. We
        claim only to have aligned vocabularies carefully enough that a reader can recognise the
        same territory being walked by different feet, and that the differences between the walks
        are often more instructive than the apparent agreements.
      </p>

      <h2
        id="counter-canon"
        className="font-serif text-2xl font-medium mt-16 mb-3 scroll-mt-20"
      >
        The counter-canon
      </h2>
      <p className="italic text-text-secondary/85 mb-6">
        Not footnotes. First-class parallel maps. Where the canon was partial, these writers
        supplied what was missing - sometimes by building an entirely different structure rather
        than correcting the old one.
      </p>
      <div className="space-y-8">
        {COUNTER_CANON_ENTRIES.map((e) => (
          <section key={e.heading}>
            <h3 className="font-serif text-lg font-medium mb-2 text-text-primary">{e.heading}</h3>
            <p>{e.body}</p>
          </section>
        ))}
      </div>
      <h3 className="font-serif text-xl font-medium mt-10 mb-3">Honest about the canon</h3>
      <ul className="space-y-3">
        {COUNTER_CANON_HONEST.map((h, i) => (
          <li key={i} className="italic">
            - {h}
          </li>
        ))}
      </ul>

      <h2
        id="shadow-structures"
        className="font-serif text-2xl font-medium mt-16 mb-3 scroll-mt-20"
      >
        Shadow structures
      </h2>
      <p className="italic text-text-secondary/85 mb-6">
        Five traditions - five different theories of what shadow <em>is</em>. The original Shadow
        cluster on this site mixed a grammar (KWML), a transit-state (Enneagram), an event-symbol
        (Tarot Devil), and a dramatic mask (Hero&apos;s Journey Shadow) as though they were
        instances of one thing. They are not, and the cluster has been dissolved.
      </p>
      <div className="space-y-8">
        {SHADOW_MODELS.map((m) => (
          <section key={m.id}>
            <h3 className="font-serif text-lg font-medium mb-2 text-text-primary">{m.heading}</h3>
            <p>{m.body}</p>
          </section>
        ))}
      </div>
      <h3 className="font-serif text-xl font-medium mt-10 mb-3">Why it matters</h3>
      <p>
        A KWML shadow pole and a Hero&apos;s Journey Shadow mask share only a word. The map uses
        the <em>Antagonists</em> cluster for figures whose primary narrative function is
        opposition, and reserves shadow-as-typology for the five-part reading above.
      </p>

      <h2 className="font-serif text-2xl font-medium mt-16 mb-3">What&apos;s in the repo</h2>
      <p>
        The eleven mission outputs live under{" "}
        <code className="font-mono text-[13px] text-gold/80">/research/</code>. The synthesised
        atlas is{" "}
        <code className="font-mono text-[13px] text-gold/80">src/data/grounded-resonance-map.json</code>
        . Citations are collected at{" "}
        <Link href="/about/bibliography" className="underline decoration-gold/60 underline-offset-4">
          /about/bibliography
        </Link>
        .
      </p>
    </article>
  );
}
