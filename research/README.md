# research/

Grounding pipeline for the cross-system resonance map. Raw findings live here as JSON; the final synthesized map is written to `src/data/grounded-resonance-map.json` (committed) once the pipeline completes.

See [`00-pipeline.md`](./00-pipeline.md) for the 11-mission protocol, phase structure, and resumption rule (skip any mission whose output file already exists).

## Progress

- [x] Phase 1 - Deep Research (Missions 1–7)
  - [x] 1 Moore & Gillette
  - [x] 2 Pearson & Marr
  - [x] 3 Riso & Hudson
  - [x] 4 Campbell & Vogler
  - [x] 5 Jungian Tarot
  - [x] 6 Existing cross-system mappings
  - [x] 7 Cultural & gender critique
- [ ] Phase 2 - Structural Analysis (Missions 8–9, no web; reads site corpus + Phase 1 outputs)
- [ ] Phase 3 - Adversarial Debate (Mission 10)
- [ ] Phase 4 - Editorial Synthesis (Mission 11 → `src/data/grounded-resonance-map.json`)

**Phase 1 → Phase 2 checkpoint**: before starting Mission 8, skim the seven JSON outputs for assumptions that broke, critiques that reshape the map's scope, or meta-patterns worth noting up front.

## Resuming in a new Claude Code session

> I'm continuing the research pipeline for archetypes.ummerr.com. Read the files in `research/` to see what's been completed. Then continue with the next uncompleted mission from `research/00-pipeline.md`.

Everything in `research/` except `README.md` and `00-pipeline.md` is gitignored - these are working artifacts, not source. The final grounded map (and only that) gets committed.
