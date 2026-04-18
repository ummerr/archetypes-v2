---
name: design-audit
description: Walk the site's iconography-parity sweep before shipping any per-archetype icon change. Verifies that one vocabulary renders an archetype on every surface (index, system grid, detail hero, siblings, resonance, OG, modal, atlas). Use when editing a 2D glyph, 3D totem, card face, or motif primitive — or when the user asks to audit design/logo consistency.
---

# Design audit — iconography parity sweep

The rule (DESIGN.md §9): **when an archetype icon changes, it changes everywhere the archetype appears.** A reader who clicks a card should land on a form they recognize. Drift between the ambient 2D glyph and the ceremonial 3D totem is the single most common iconography regression on this site.

## When to run this skill

- User edits any file under `src/components/*TotemCanvas.tsx`, `src/components/MbtiGlyph.tsx`, `src/components/tarot/arcanaMotifs.tsx`, `src/components/HeroJourneyArchetypeIcon.tsx`, `src/components/ArchetypeSymbol.tsx`, or `src/components/shared/totemRenderers.tsx`.
- User asks to audit design / logo / iconography consistency.
- User adds a new archetype or new system.
- Before any PR that touches a per-archetype visual.

## The rule (§9b)

If a system has **both** a 2D glyph and a 3D totem, they must share the same visual vocabulary — the 2D is a flattened silhouette of the 3D primitives, not an unrelated ceremonial form. 2D is reserved for surfaces where WebGL is unavailable or cost-prohibitive (Satori OG, `sm` scale in dense grids). Everywhere else, prefer the 3D.

If the two forms drift, collapse them back to one vocabulary before shipping. **Iconography parity is non-negotiable.**

## Surfaces to walk

For the system you touched, render each surface and confirm the archetype is recognizable across all of them.

| # | Surface | File |
|---|---|---|
| 1 | Index-page system grid card | `src/app/<system>/page.tsx` or `<System>TemperamentGrid.tsx` |
| 2 | Index ambient / wayfinding | `src/components/shared/totemRenderers.tsx` (routed via `totem-registry.ts`) |
| 3 | Detail-page hero | `src/components/<System>DetailClient.tsx` |
| 4 | Sibling / related cards | bottom of `<System>DetailClient.tsx` |
| 5 | Cross-system resonance | `src/components/resonance/CrossSystemResonance*.tsx` |
| 6 | All-archetypes index grid | `src/app/archetypes/IndexView.tsx` (consumes `totem-registry`) |
| 7 | Modal view | `src/app/<system>/@modal/…` (usually reuses `<System>DetailClient`) |
| 8 | OG / share card | `src/app/api/card/<system>/[slug]/route.ts` + `src/lib/og-totems.tsx` (Satori — no filters, no animation) |
| 9 | Atlas / cluster surfaces | `src/components/atlas/…` |

## Check before committing

- [ ] Ran every applicable surface above for the system I touched.
- [ ] If the system has both 2D + 3D forms: confirmed they still share primitives.
- [ ] If the system has a shared motif library (Tarot `arcanaMotifs.tsx`, MBTI primitives): change lives in the library, not inlined into one consumer.
- [ ] OG / Satori path tested — `simple={true}` if the glyph supports it; no `<filter>`, no animation; prefer `<path>` with cubic beziers over `<line>`/`<rect>`/arc ellipses.
- [ ] `prefers-reduced-motion` still kills animation on every surface.

## Current known drifts (debt ledger)

These are live violations of §9b. Do **not** ship new work that widens them; call them out when relevant.

- *(empty — Jungian + Enneagram ambient were the two outstanding drifts. Both resolved when `JungianSilhouette.tsx` / `EnneagramSilhouette.tsx` replaced the old `GlyphRingRenderer`. Any future drift here goes back in this ledger.)*

Locked vocabularies (do not drift):

- **Jungian**: `src/components/JungianSilhouette.tsx` (2D, ambient) ↔ `src/components/JungianTotemCanvas.tsx` (3D, grid/hero). Each 2D silhouette is a z=0 projection of its 3D primitives — edit both files together when touching an archetype's form.
- **Enneagram**: `src/components/EnneagramSilhouette.tsx` (2D) ↔ `src/components/EnneagramTotemCanvas.tsx` (3D). Same rule.
- **MBTI**: `src/components/MbtiGlyph.tsx` (2D) ↔ `src/components/MbtiTotemCanvas.tsx` (3D). Original locked pair.
- **Tarot**: `src/components/tarot/arcanaMotifs.tsx` (shared motif library) → `ArcanaGlyph.tsx` → `TarotCard.tsx`. Change primitives in the library; never inline.

Soft but acceptable today: KWML 2D (`ArchetypeSymbol` crown/shield/eye/heart) shares vocabulary with its 3D `TotemCanvas` at lower fidelity; Hero's Journey 2D follows the "sketched myth" dialect flagged as future work in DESIGN.md §8.

## Reporting

When invoked for an audit (not a commit check), emit a terse report:

1. **What was changed** (one sentence, file paths).
2. **Surfaces walked** — checkbox list from the table above; skip rows that don't apply.
3. **Drifts found** — each as `<system>.<surface>`: what the user sees now vs. what §9b requires. If none, say "no drifts."
4. **Recommendation** — the smallest change that restores parity. If it requires bespoke design work (e.g. new silhouettes), flag it as needing the user's direction, don't just forge ahead.

Keep the report under ~200 words. Link to `DESIGN.md §9` once — don't restate the whole doc.
