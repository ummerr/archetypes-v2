# Maps of the Inner World

A comparative hermeneutic atlas of archetype systems. It sets **seven** vocabularies for the psyche side by side, maps the resonances between them, and — this is the point — grades every cross-system claim with a citation, a dissent, and a confidence tier. It does not argue that these traditions describe one universal psyche; it argues that reading them together is sometimes more illuminating than reading any one alone.

Live at [archetypes.ummerr.com](https://archetypes.ummerr.com).

## The seven systems

| System | Framework | Count | Shadow grammar |
|---|---|---|---|
| **Jungian** | Pearson & Marr — twelve heroic archetypes | 12 | unipolar trap |
| **Enneagram** | Riso-Hudson — nine motivational types | 9 | passion / virtue |
| **KWML** | Moore & Gillette — the mature masculine | 8 | bipolar (active/passive) |
| **Myers-Briggs** | Sixteen cognitive patterns | 16 | stack inversion |
| **Hero's Journey** | Campbell / Vogler — the monomyth | 8 | dramatic mask |
| **Tarot** | The Major Arcana | 22 | card reversal |
| **Astrology** | The tropical zodiac | 12 | polarity (opposite sign) |

**87 archetypes** in total, drawn together into **20 thematic clusters** by **170 grounded mappings**.

## The stance

The map is **weak-hermeneutic**. Apparent convergence between systems is treated as *shared intellectual descent, not proof of a universal psyche* — Jung is upstream of most of it, and downstream readers agreeing is not independent corroboration. Every mapping carries one of five confidence tiers (`canonical` / `strong` / `moderate` / `speculative` / `contested`), a primary-source or scholarly citation, and any dissent kept openly in view.

Astrology is held to a deliberately different standard: it is the one system here that makes a falsifiable claim about the sky, that claim has failed every controlled test, and so it is read strictly as *projected psychology* — entering the map through the Golden Dawn's tarot correspondences and the Greene/Rudhyar reading, always tiered and always dissented. See `/astrology/about`.

The full account of how the map was built — an eleven-mission research pipeline, adversarial review, the counter-canon and shadow-structure corrections — lives at `/about/methodology` and in `research/00-pipeline.md`.

## Surfaces

- **Per-system pages** — `/<system>`, `/<system>/about`, `/<system>/archetype/[slug]`, each with a bespoke visual dialect (see `DESIGN.md`).
- **Atlas** — `/atlas` — the cross-system resonance constellation, cluster pages, contested-mapping debates, and shared exemplars.
- **Reading** — `/quiz` — a ~30-minute cast that places you across all seven systems from a single vector; nothing is stored, the reading lives in its URL.
- **Mirror** — `/mirror` — a twelve-choice cross-system snapshot.
- **Today** — `/today` — a daily archetype draw for the collective.
- **Index** — `/archetypes` — every figure across every system, filterable.
- **About** — methodology, bibliography, counter-canon, and the six theories of shadow the map refuses to flatten.

## Design

Each system speaks its own visual **dialect** grounded in what the system is *for* — KWML's platonic solids, Jungian organic forms, Enneagram instruments, MBTI cognitive geometry, Tarot arcana, Hero's Journey myth-lines, and Astrology's constellation figures — while sharing one grammar (stroke primacy, one accent per archetype, a 5.5–6s breath, four motion primitives). Iconography parity across every surface is enforced by the `design-audit` skill. The full constitution is in `DESIGN.md`.

**Typography** — Cormorant Garamond (serif), Supreme (sans), Space Mono (mono). **Palette** — warm-black canvas `#06060A`, gold accent `#D4AF37`, per-system and per-cluster accent hues.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, TypeScript), [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [three.js](https://threejs.org/) + [React Three Fiber](https://r3f.docs.pmnd.rs/) for the 3D totems; [Framer Motion](https://www.framer.com/motion/) for transitions
- [d3-force](https://d3js.org/d3-force) for the constellation layout; [Satori](https://github.com/vercel/satori) (`next/og`) for share cards

## Getting started

```bash
npm install
npm run dev        # dev server at http://localhost:3000
npm run build      # runs prebuild (feature vectors + constellation layout), then next build
npm start
```

## Build pipeline

`prebuild` regenerates two committed artifacts from the research corpus before every build:

```bash
node scripts/build-feature-vectors.mjs       # research/08 → src/data/feature-vectors.json (quiz scoring)
node scripts/build-constellation-layout.mjs  # grounded-resonance-map.json → constellation-layout.json (atlas geometry)
```

The `research/` directory (gitignored except its docs) holds the source; the checked-in artifacts are the source of truth on deploy.

## Project structure

```
src/
  app/            # routes: per-system trees, /atlas, /quiz, /mirror, /today, /about, /api
  components/     # per-system totems + detail clients, viz/, resonance/, atlas/, quiz/, shared/
  data/           # per-system archetype data, grounded-resonance-map.json, systems registry
  lib/            # resonance, quiz scoring/classifier, OG rendering, motion primitives
  types/          # per-system archetype type definitions
research/         # the eleven-mission grounding pipeline (docs committed, outputs gitignored)
scripts/          # build-time artifact generators + quiz verifiers
DESIGN.md         # the iconography constitution
```

## Research

- `research/00-pipeline.md` — the grounding protocol.
- `KWML-Research.md` — the original KWML source document.
- `/about/bibliography` — the full cited corpus across all systems.

## License

MIT
