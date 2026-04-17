# Iconography — Principles for Totems, Motion, and Cards

This document is the editorial style guide for how archetypes are *drawn* on this site. It is a small constitution, not a spec — code should bend toward it, not the other way around.

The premise is simple: the site covers six typologies (KWML, Jungian, Enneagram, MBTI, Tarot, Hero's Journey) plus the Atlas cluster layer. Each system has its own visual **dialect**, reflecting its own epistemology. But all dialects share one **grammar**, so the site reads as a single volume rather than an anthology.

---

## 1. Dialects — one per system

Each system's totem language is grounded in what the system is actually *for*. Dialects are not interchangeable: a KWML card never wears a Tarot halo, a Jungian totem never becomes a pentagram.

| System | Dialect | Why this dialect |
|---|---|---|
| **KWML** | 3D platonic solids with bloom | Moore/Gillette's developmental masculine — maturity as geometric integrity. Crown, blade, nested solids, torus knot. |
| **Jungian** | 3D organic / biological forms | Pearson-Marr — transformation, growth, nature. Seeds, petals, rings of twelve. |
| **Enneagram** | 3D physical instruments | Somatic typology; gut-wisdom as calibration. Plumb line, cupped heart, scales. |
| **MBTI** | Animated cognitive geometry (N/S/T/F glyph layers) | Functions as circuitry. Dominant layer heavy, auxiliary half-speed behind it. |
| **Tarot** | Unicode glyph inside breathing halo; flip to shadow | The card *is* the totem. Alchemical arcana, foil, ceremony. |
| **Hero's Journey** | Mythic line drawing (silhouette) | Narrative archetypes sketched as myth. Currently static; see §8 Future Work. |
| **Atlas cluster** | Distilled 2D motif (`ClusterTotem`) | Essences extracted from the systems. Reduced glyphic form — the lowest-common-denominator sign. |

---

## 2. The shared grammar

What makes six dialects feel like one volume:

- **Breath rhythm.** Every totem breathes at a 5.5–6s cycle (matches `--color-bg`'s global `breathe-subtle`). Faster heartbeats are reserved for ceremonial/hero scale, where they can hold the room.
- **Stroke primacy.** 2D marks are stroked, not filled. Fill appears only as a radial halo, a shadow-layer, or a hover reveal — never as the primary mass of a glyph.
- **One accent, one totem.** The archetype's `accentColor` is the totem's only saturated color. Everything else is neutral or opacity-derived from that accent (the established `${color}28`, `${color}55` pattern).
- **Negative-space emission on dark; inverted fill on light.** Current designs assume a dark canvas. On light mode, emission collapses; the intended inversion is filled silhouettes with subtle inner shadow. (Not yet implemented — see §8.)
- **Four motion primitives, no more.** `spin / breath / pulse / shimmer`. Defined once in `src/lib/motion-primitives.ts`; imported everywhere else.
- **Hover is meaning, not decoration.** Hover should surface the shadow pole, brighten the accent, or draw in the dashed ring. Never "scale up for its own sake."

---

## 3. Totem scales are semantic

There are exactly five scales, defined in `src/lib/totem-sizes.ts`. Each carries an animation *budget* — how much motion it is allowed.

| Scale | Pixels | Use | Animation budget |
|---|---|---|---|
| `xs` | 22 | inline wayfinding, breadcrumbs, cluster marks | static or slow breath only |
| `sm` | 40 | index-card thumbnail | breath only |
| `md` | 72 | section headers, inline figures | breath + one accent motion |
| `lg` | 120 | detail-page hero (2D) | full vocabulary |
| `hero` | 200+ | ceremonial 3D canvases | full vocabulary + post-processing (bloom) |

**Ambient-vs-ceremonial discipline.** A grid of 20 index cards that all spin, breathe, and shimmer is visual noise. The budget table exists so that an `sm` totem in an index grid stays quiet, and a `hero` totem on a detail page earns its shimmer.

**Note on MBTI sizing.** `MbtiGlyph` is internally calibrated at denser pixel values (sm=72, md=128, lg=200) because its cognitive-geometry primitives need the space to read. Treat `MbtiGlyph size="sm"` as occupying the visual weight of an `md` in the canonical scale.

---

## 4. Card anatomy — *frame → field → token*

Every card composes three layers:

- **Frame** — border, corner ornaments, meta header (system name, inner-group badge), footer tag row. Owned by `CardShell`.
- **Field** — accent-driven background gradient. The emotional ground.
- **Token** — the totem itself. Plugged in by dialect from the totem registry.

**Reading order** (editorial hierarchy): **token → name → motto → meta tags**. This matches the humanist typography already on site and keeps the eye moving down through the archetype, not across UI chrome.

**Shadow discipline.** Active/passive shadow copy belongs on the back of the card (the Tarot flip pattern) or behind a hover reveal — never front-and-center in ambient grids. An index card is a *promise* of the archetype, not a dossier.

**What is NOT a card.** `TarotCard` and `OppositeCard` are *ceremonial* cards — flip, diptych — and do not compose through `CardShell`. Forcing them through the shell would flatten what makes them special.

---

## 5. Totem map — unique but consistent

```
                 ambient (sm/md)    ceremonial (lg/hero)
KWML          →  ArchetypeSymbol    TotemCanvas (3D platonic)
Jungian       →  glyph + ring       JungianTotemCanvas (3D organic)
Enneagram     →  numeral + ring     EnneagramTotemCanvas (3D instrument)
MBTI          →  MbtiGlyph sm       MbtiTotemCanvas (3D cognitive stack)
Tarot         →  halo + glyph       TarotCard (flip + foil)
Hero's Journey → HeroJourneyIcon    [gap — see §8]
Atlas cluster →  ClusterTotem       ClusterTotem hero
```

Each cell is unique in what it *draws*; consistent in what it *obeys* (grammar, scale budget, card anatomy). Routing lives in `src/data/totem-registry.ts` — one entry per system.

---

## 6. Motion vocabulary

All repeating animation comes from one of four primitives in `src/lib/motion-primitives.ts`:

| Primitive | Shape | Typical duration | When to reach for it |
|---|---|---|---|
| **breath** | scale [1 → 1.05 → 1], easeInOut | 4–6s | The always-on baseline. Every ambient totem breathes. |
| **spin** | rotate 0 → 360°, linear | 14–80s | Slow orbit of a secondary ring or accent layer. Never fast. |
| **pulse** | opacity [0.55 → 1 → 0.55], easeInOut | 2–3s | Marking a *center* or the active pole. Rarer than breath. |
| **shimmer** | pathLength [0 → 1 → 1], opacity [0 → 1 → 0.5] | 2.5–4s | Tracing a line into existence. Use for path reveals and accents. |

One-off / bespoke animation (Tarot flip, 3D `useFrame` loops) is exempt from the primitive contract, but should still honor breath rhythm and accent discipline.

---

## 7. Accessibility & motion

- **Reduced motion is sacred.** The global `prefers-reduced-motion` CSS rule at `globals.css:294-301` kills CSS animation. Framer Motion and Three.js need their own opt-outs: use `useReducedMotion()` and skip `useFrame` updates. A frozen pose is fine; a spinning hero totem behind a user who asked for stillness is not.
- **Totems deserve names.** Most totems currently render with `aria-hidden` or decorative roles. The ambition is that every ambient totem exposes an `aria-label` derived from `"${archetype.name} — ${system.name}"`. See §8.
- **Hover states are not required for comprehension.** If important information appears only on hover, it's hidden from touch users and keyboard users. The shadow pole copy currently handled on the Tarot flip is the right pattern; a hover-only tooltip for a critical pole would not be.

---

## 8. Future work

Listed in impact order. These are not in scope for the current pass; this document records the intent.

1. **Hero's Journey motion.** Eight static SVGs in `HeroJourneyArchetypeIcon.tsx`. Commit to the "sketched myth" dialect and animate with `shimmer` — trace each outline on scroll-into-view, or breathe the linework.
2. **Light-mode totem strategy.** Emissive glows collapse on the light palette. Audit every totem and implement the inversion (filled silhouettes, no bloom) as a deliberate second pose, not a hack.
3. **Share-card alignment.** OG images at `src/app/api/card/[system]/[slug]/route.ts` should pull from the same totem registry so social previews match the live dialect.
4. **Accessible names everywhere.** Walk every totem component; remove blanket `aria-hidden`, add proper `aria-label` grounded in archetype + system.

---

## Canonical files

```
src/lib/totem-sizes.ts         — TotemSize, TOTEM_PX
src/lib/motion-primitives.ts   — spin, breath, pulse, shimmer
src/data/totem-registry.ts     — (systemId) → ambient totem renderer
src/components/shared/CardShell.tsx         — frame + field
src/components/shared/ArchetypeCardVisual.tsx — dispatcher, reads the registry
```

If you are adding a seventh system, start at the registry and the scale table. Do not write an eighth `if (systemId === …)` branch.
