# Cross-System Resonance - Research Pipeline

Goal: ground the hand-coded resonance map (`src/data/resonance.ts`) in primary sources, academic literature, practitioner discourse, structural analysis, cultural critique, and adversarial review. Output: a defensible map with citations, confidence tiers, dissent, and named meta-patterns - written to `src/data/grounded-resonance-map.json`.

Runs entirely inside Claude Code on the Claude Max subscription. **Do not use the Anthropic API.** Claude Code *is* the research agent; web search + web fetch tools are its instruments. Each mission writes one structured JSON file. Missions are independently resumable - before starting mission N, check whether `research/NN-name.json` already exists and skip if so.

## Phases

| Phase | Missions | Mode |
|---|---|---|
| 1 - Deep Research | 1–7 | Web search + fetch + synthesis |
| 2 - Structural Analysis | 8–9 | No web; reads Phase 1 outputs + site corpus |
| 3 - Adversarial Debate | 10 | Reads all prior outputs; devil's-advocate synthesis |
| 4 - Editorial Synthesis | 11 | Reads all prior outputs; produces grounded map |

## Session plan

- **Session 1**: Missions 1–3 (Moore, Pearson, Riso-Hudson)
- **Session 2**: Missions 4–6 (Campbell, Tarot, Existing Mappings)
- **Session 3**: Mission 7 (Cultural Critique)
- **Session 4**: Missions 8–9 (Structural + Meta-Patterns)
- **Session 5**: Missions 10–11 (Adversarial + Synthesis)

Between sessions: review intermediate outputs; redirect if a mission's assumptions broke.

## Missions

### Mission 1 - Moore & Gillette primary sources → `01-moore-gillette.json`
Explicit references Moore & Gillette make to Jung; their lineage beyond Jung (Eliade, Turner, Neumann); Moore's academic papers/lectures (not just trade books); whether the bipolar shadow system is original to Moore; the "accessing vs. identifying with" distinction's Jungian roots; published depth-psychology critiques. 15–25 searches, fetch the strongest sources.

### Mission 2 - Pearson & Marr primary sources → `02-pearson-marr.json`
Explicit Jung references; explicit mapping to Campbell's monomyth; PMAI validation; impact of "Hero and the Outlaw" branding adoption; Enneagram/MBTI references; origin of the Ego/Soul/Self cluster structure; shadow descriptions vs. Moore's bipolar model; academic critiques.

### Mission 3 - Riso & Hudson / Enneagram → `03-riso-hudson.json`
R&H Jung references; Ichazo → Naranjo → Gurdjieff → Sufi lineage; explicit cross-system mappings they make; Levels of Development vs. individuation; integration/disintegration arrows (origin + R&H reading); three centers' tradition and mapping to Jungian functions; instinctual subtypes; psychometric critiques.

### Mission 4 - Campbell & Vogler → `04-campbell-vogler.json`
Campbell's Jung studies; Campbell on Shadow/Anima/Animus/Wise-Old-Man/Trickster; what Vogler changed; 12 stages vs. Campbell's messier structure; Murdock's "Heroine's Journey" and other feminist critiques; Campbell and Eliade/Neumann/von Franz; academic critiques of monomyth universality.

### Mission 5 - Jungian Tarot tradition → `05-jungian-tarot.json`
Sallie Nichols, Angeles Arrien, Rachel Pollack - mappings and influence. What (if anything) Jung wrote directly about Tarot. Origin of "Fool's Journey as individuation." Tarot-Enneagram and Tarot-KWML mappings in the literature. Reversed-card tradition vs. bipolar shadow.

### Mission 6 - Existing cross-system mappings → `06-existing-mappings.json`
Competitive landscape. Books/dissertations/courses/websites/tables that already map 2+ systems. Extract the specific connections, the reasoning, and citation weight. This is what the site needs to surpass.

### Mission 7 - Cultural & gender critique → `07-cultural-critique.json`
KWML gender critique; feminine equivalents (Bolen's Goddesses, Murdock, Estés). Enneagram cultural-origins dispute. Campbell Eurocentrism (critique + defense). Pearson's commercial capture. Tarot esoteric/divination baggage vs. psychological credibility. Race/class engagement. Contemporary 2020s responses.

### Mission 8 - Structural similarity analysis → `08-structural-similarity.json`
No web. Read all six systems' archetype data from `src/data/*/archetypes.ts`. Extract semantic feature vectors (motivation axis, emotional core, relational stance, shadow pattern, developmental stage). Build similarity matrix - top 10 cross-system matches per archetype. Cluster analysis: do natural clusters match the hand-coded 20? Surprising connections not in the map. Weak connections that ARE in the map. Identify 4–6 underlying dimensions that organize all archetypes (these become viz axes).

### Mission 9 - Meta-pattern discovery → `09-meta-patterns.json`
Read all Phase 1 + Mission 8. Isomorphic structures (3 centers ↔ 3 clusters ↔ 3 phases vs. KWML's 4); shadow isomorphisms across all five models; developmental sequences; missing energies (Mother, Ancestor, Mystic); the feminine-expansion question; name each meta-pattern - these become site editorial.

### Mission 10 - Adversarial debate → `10-adversarial.json`
Read all prior outputs. Attack every mapping: overfits, false equivalences, cherry-picked evidence, category errors. Strongest counter-argument per major mapping. Would each author agree with these mappings? Is the comparative project itself flawed? Be ruthless.

### Mission 11 - Editorial synthesis → `11-final-synthesis.json` + `src/data/grounded-resonance-map.json`
Read all prior outputs. Triangulate: assign confidence per entry (canonical / strong / moderate / speculative / contested). Address every Mission-10 critique (modify, caveat, or rebut - never ignore). Enrich every entry with `primarySourceCitation`, `scholarlyCitation`, `dissent`, `adversarialNote`, `editorialNote`. New clusters from research (need ≥2 sources). Recommended removals. Meta-pattern editorial (5–7 summaries). Complete bibliography. System blind spots (2–3 sentences per system, goes on /about pages). Adversarial survivors as "Open Questions" on the atlas page.

## Output shapes

### Mission 1–7 finding shape

```json
{
  "claim": "Moore explicitly builds on Jung's concept of the Self",
  "source": "King, Warrior, Magician, Lover (1990), Introduction",
  "type": "explicit_reference | implicit_connection | scholarly_inference",
  "quote_fragment": "under 15 words if available",
  "confidence": "high | medium | low",
  "relevance_to_mapping": "Grounds the King-Self connection in primary literature"
}
```

### Final grounded entry shape

```ts
interface GroundedResonanceEntry {
  slug: string;
  system: SystemId;
  name: string;
  note: string;
  strength: "primary" | "secondary";
  confidence: "canonical" | "strong" | "moderate" | "speculative" | "contested";
  primarySourceCitation?: string;
  scholarlyCitation?: string;
  dissent?: string;
  adversarialNote?: string;
  editorialNote?: string;
  alternativeMapping?: { archetype: string; system: SystemId; argument: string };
}
```

## Resumption prompt

> I'm continuing the research pipeline for archetypes.ummerr.com. Read the files in `research/` to see what's been completed. Then continue with the next uncompleted mission from `research/00-pipeline.md`.
