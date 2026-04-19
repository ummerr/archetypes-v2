// The Mirror — a forced-choice sorter.
//
// Each pair offers two present-tense energy states. The user picks one; the
// chosen cluster scores +1. Cluster IDs must match grounded-resonance-map.json.
// This is a reflective instrument, not a psychometric one — question
// calibration is editorial, not empirical.
//
// Positions 0–11 are the original 12 questions preserved in place so legacy
// `?r=AABBAB…` URLs keep decoding to the same reading. New sessions draw a
// stratified 12 from the full pool; selection + A/B flip are derived from a
// URL-encoded seed.

export type MirrorClusterId =
  | "sovereign"
  | "warrior"
  | "sage-magician"
  | "lover"
  | "innocent"
  | "explorer"
  | "rebel"
  | "creator"
  | "jester"
  | "caregiver"
  | "everyman"
  | "death-rebirth"
  | "teacher"
  | "liminal-territory";

export interface MirrorOption {
  text: string;
  cluster: MirrorClusterId;
}

export interface MirrorQuestion {
  // Context sentence shown above the choice pair. Must read naturally when
  // concatenated with either option text.
  frame: string;
  a: MirrorOption;
  b: MirrorOption;
}

// Full pool. First 12 items are the original questions in original order —
// do not reorder them, or legacy share URLs will decode differently.
export const QUESTION_POOL: MirrorQuestion[] = [
  // ── Original 12 (legacy-compat range) ──────────────────────────────
  {
    frame: "Right now I'm more pulled toward",
    a: { text: "holding the center for others", cluster: "sovereign" },
    b: { text: "cutting through to what needs doing", cluster: "warrior" },
  },
  {
    frame: "Under pressure I tend to",
    a: { text: "withdraw into analysis", cluster: "sage-magician" },
    b: { text: "reach for whoever's nearest", cluster: "lover" },
  },
  {
    frame: "What I most need is",
    a: { text: "freedom to explore", cluster: "explorer" },
    b: { text: "a structure I can trust", cluster: "sovereign" },
  },
  {
    frame: "I'm more drawn to",
    a: { text: "breaking what's not working", cluster: "rebel" },
    b: { text: "building something that endures", cluster: "creator" },
  },
  {
    frame: "When things get hard, I",
    a: { text: "make it lighter with humor", cluster: "jester" },
    b: { text: "go quiet and sit with it", cluster: "liminal-territory" },
  },
  {
    frame: "I feel most alive when",
    a: { text: "deeply connected to someone", cluster: "lover" },
    b: { text: "fully absorbed in making something", cluster: "creator" },
  },
  {
    frame: "My instinct is to",
    a: { text: "protect and care for others", cluster: "caregiver" },
    b: { text: "challenge them to grow", cluster: "warrior" },
  },
  {
    frame: "I'd rather",
    a: { text: "understand why things work", cluster: "sage-magician" },
    b: { text: "feel what things mean", cluster: "lover" },
  },
  {
    frame: "Right now I need",
    a: { text: "belonging and solidarity", cluster: "everyman" },
    b: { text: "solitude and self-discovery", cluster: "explorer" },
  },
  {
    frame: "I'm navigating",
    a: { text: "an ending that needs to happen", cluster: "death-rebirth" },
    b: { text: "a beginning I'm not ready for", cluster: "innocent" },
  },
  {
    frame: "My energy is going toward",
    a: { text: "teaching what I know", cluster: "teacher" },
    b: { text: "learning what I don't", cluster: "explorer" },
  },
  {
    frame: "I feel most like myself when",
    a: { text: "disrupting the pattern", cluster: "rebel" },
    b: { text: "holding the space", cluster: "sovereign" },
  },

  // ── Extended pool ──────────────────────────────────────────────────
  {
    frame: "I'm most drawn to",
    a: { text: "starting fresh as a beginner", cluster: "innocent" },
    b: { text: "passing on what I've learned", cluster: "teacher" },
  },
  {
    frame: "I make a room easier by",
    a: { text: "tending to what everyone needs", cluster: "caregiver" },
    b: { text: "breaking the tension with a joke", cluster: "jester" },
  },
  {
    frame: "I trust",
    a: { text: "what ordinary people figure out together", cluster: "everyman" },
    b: { text: "what careful thought arrives at alone", cluster: "sage-magician" },
  },
  {
    frame: "The real work right now is",
    a: { text: "letting an old self die", cluster: "death-rebirth" },
    b: { text: "bringing a new thing into being", cluster: "creator" },
  },
  {
    frame: "I can tell I'm ready when",
    a: { text: "the old ground stops holding", cluster: "liminal-territory" },
    b: { text: "I can steady the ground for others", cluster: "sovereign" },
  },
  {
    frame: "What cuts through is",
    a: { text: "laughter that refuses the pretense", cluster: "jester" },
    b: { text: "force that refuses the delay", cluster: "warrior" },
  },
  {
    frame: "The inheritance I carry is",
    a: { text: "something I want to pass forward", cluster: "teacher" },
    b: { text: "something I want to break open", cluster: "rebel" },
  },
  {
    frame: "I protect my clarity by",
    a: { text: "staying open to not-knowing", cluster: "innocent" },
    b: { text: "refusing easy explanations", cluster: "sage-magician" },
  },
  {
    frame: "Love right now looks like",
    a: { text: "staying close to what needs me", cluster: "caregiver" },
    b: { text: "trusting them to their own road", cluster: "explorer" },
  },
  {
    frame: "What the moment wants is",
    a: { text: "patience with the unformed", cluster: "liminal-territory" },
    b: { text: "commitment to the next form", cluster: "creator" },
  },
  {
    frame: "I belong",
    a: { text: "with the people doing ordinary good", cluster: "everyman" },
    b: { text: "with the ones refusing the quiet lie", cluster: "rebel" },
  },
  {
    frame: "The hardest tenderness is",
    a: { text: "letting someone finish becoming someone else", cluster: "death-rebirth" },
    b: { text: "continuing to feed what still looks fragile", cluster: "caregiver" },
  },
  {
    frame: "I'm more useful as",
    a: { text: "a voice that names the pattern", cluster: "teacher" },
    b: { text: "a body that does the ordinary work", cluster: "everyman" },
  },
  {
    frame: "I let others in through",
    a: { text: "what I'm willing to feel", cluster: "lover" },
    b: { text: "what I'm willing to laugh at", cluster: "jester" },
  },
];

// Back-compat alias for any callers that import `QUESTIONS`. The live code
// paths now read from `QUESTION_POOL` via a session.
export const QUESTIONS = QUESTION_POOL;

// First 12 questions — the legacy fixed set. Preserved verbatim so
// `?r=AABBAB…` URLs created before the pool expansion still decode to the
// same reading.
export const LEGACY_QUESTIONS: MirrorQuestion[] = QUESTION_POOL.slice(0, 12);

export const ALL_CLUSTERS: MirrorClusterId[] = [
  "sovereign",
  "warrior",
  "sage-magician",
  "lover",
  "innocent",
  "explorer",
  "rebel",
  "creator",
  "jester",
  "caregiver",
  "everyman",
  "death-rebirth",
  "teacher",
  "liminal-territory",
];

export interface ClusterInterpretation {
  // Short label used in the constellation header and share title.
  short: string;
  headline: string;
  body: string;
  // Shown when the cluster was offered but scored 0.
  quiet: string;
}

export const CLUSTER_INTERPRETATIONS: Record<MirrorClusterId, ClusterInterpretation> = {
  sovereign: {
    short: "Sovereign",
    headline: "You're being asked to hold the center.",
    body: "Order a field. Bless what's growing. Resist the pull to control what doesn't need controlling. The traditions name this differently but they circle the same still point — the centering presence that makes a kingdom possible without demanding one.",
    quiet: "Sovereign is quiet — you're not being asked to hold center right now.",
  },
  warrior: {
    short: "Warrior",
    headline: "You're being asked for directed force.",
    body: "Something needs cutting, defending, or carrying across. The warrior energy isn't aggression — it's discipline in service of something larger than you. Notice where you're already mobilized and where you're still hesitating to commit.",
    quiet: "Warrior is quiet — no edge is being asked of you right now.",
  },
  "sage-magician": {
    short: "Sage-Magician",
    headline: "You're reaching toward pattern.",
    body: "The knower-transformer wants to understand the shape of things, and having understood, bend them. Truth-as-freedom and truth-as-leverage are the two ends of this axis. Notice which one you're actually after.",
    quiet: "Sage-Magician is quiet — you're not trying to decode the field right now.",
  },
  lover: {
    short: "Lover",
    headline: "You're in the territory of feeling.",
    body: "Communion, sensuality, aesthetic aliveness, devotion — the lover wants the world up close. Every tradition means something different by it, but they all point at a body that can be reached. Notice what you're letting yourself feel.",
    quiet: "Lover is quiet — you're keeping some distance right now.",
  },
  innocent: {
    short: "Innocent",
    headline: "Something is asking you to begin again.",
    body: "Pre-initiation openness, or the earned innocence on the other side — the traditions name two. Either way: simple faith, unfallen trust, the beginner's willingness to not know yet. This is rarely the loud energy. It's often the one we most need.",
    quiet: "Innocent is quiet — you're not approaching anything as a beginner right now.",
  },
  explorer: {
    short: "Explorer",
    headline: "The horizon is pulling on you.",
    body: "The small room has gotten small. You're testing the edge, looking for the door, building selfhood through venturing rather than settling. Trust the restlessness — and notice whether you're moving toward something or only away.",
    quiet: "Explorer is quiet — you're staying near home right now.",
  },
  rebel: {
    short: "Rebel",
    headline: "Something needs breaking.",
    body: "The pattern has gone corrupt and you know it. Rebel energy isn't destruction for its own sake — it's the agent of an ending the situation has already earned. Be careful about who the collapse costs. Break cleanly.",
    quiet: "Rebel is quiet — you're not at war with the structure right now.",
  },
  creator: {
    short: "Creator",
    headline: "You want to bring something into form.",
    body: "Vision pressing toward matter. The creator trusts that imagination counts, that making is a first-order verb, that what doesn't yet exist has as much claim on you as what does. Notice what's been waiting to be made.",
    quiet: "Creator is quiet — you're not in a making phase right now.",
  },
  jester: {
    short: "Jester",
    headline: "You're making it livable with lightness.",
    body: "The holy fool punctures pretension, reveals truth sideways, insists that joy is also serious work. Play is how the jester keeps the field humane when it would otherwise calcify. Notice whether the humor is landing or hiding something.",
    quiet: "Jester is quiet — you're taking things straight right now.",
  },
  caregiver: {
    short: "Caregiver",
    headline: "You're holding others.",
    body: "Feeding, tending, protecting — service as love made visible. The caregiver gives weight to the needs around them. Notice the gendering this role has carried in the tradition, and notice where your own care is chosen versus assumed.",
    quiet: "Caregiver is quiet — you're tending to your own ground right now.",
  },
  everyman: {
    short: "Everyman",
    headline: "You want to belong to a we.",
    body: "Solidarity with ordinary people, fit with the group, the quiet decencies of shared life. The everyman refuses elevation and prizes the we over the I. Notice what kind of belonging you're after — and what you'd give up for it.",
    quiet: "Everyman is quiet — you're standing apart right now.",
  },
  "death-rebirth": {
    short: "Death-Rebirth",
    headline: "Something is ending.",
    body: "The passage that requires loss. Not metaphor — actual relinquishment. The traditions differ on whether this is developmental or general transformation, but they agree it can't be skipped. Notice what's asking to be mourned.",
    quiet: "Death-Rebirth is quiet — nothing is demanding a funeral right now.",
  },
  teacher: {
    short: "Teacher",
    headline: "You're transmitting what you know.",
    body: "The lineage-bearer. Doctrine, method, ritual — wisdom as tradition rather than as discovery. Notice whether the transmission is alive in you or whether you're repeating something you no longer fully believe.",
    quiet: "Teacher is quiet — you're not in transmission mode right now.",
  },
  "liminal-territory": {
    short: "Liminal Passage",
    headline: "You're in a between-place.",
    body: "Form is dissolving. The old shape hasn't fully left and the new one hasn't arrived. The liminal is uncomfortable on purpose — it's where the ego cannot recognize itself. Don't rush the reforming. Let the dissolution finish its work.",
    quiet: "Liminal is quiet — you're standing on solid ground right now.",
  },
};

export type Choice = "A" | "B";

// ── URL encoding (v1 legacy + v2 seeded) ───────────────────────────────

export interface DecodedResult {
  version: "v1" | "v2";
  seed: string | null; // null for v1
  choices: Choice[];
}

// Emit v2 when a seed is provided; otherwise fall through to the raw
// legacy form. Callers that hold a session should always pass the seed.
export function encodeResult(choices: Choice[], seed?: string | null): string {
  const body = choices.join("");
  if (seed) return `v2.${seed}.${body}`;
  return body;
}

// Accepts either `AABB…` (legacy 12-char) or `v2.{seed}.{choices}`.
// Returns null for anything malformed so a bad URL falls back to the empty
// sorter.
export function decodeResult(raw: string | null | undefined): DecodedResult | null {
  if (!raw) return null;

  if (raw.startsWith("v2.")) {
    const parts = raw.split(".");
    if (parts.length !== 3) return null;
    const seed = parts[1];
    const body = parts[2];
    if (!seed || !/^[a-z0-9]{1,12}$/i.test(seed)) return null;
    const choices = parseChoices(body);
    if (!choices || choices.length < 1 || choices.length > QUESTION_POOL.length) {
      return null;
    }
    return { version: "v2", seed, choices };
  }

  // Legacy path: exactly 12 A/B chars.
  const s = raw.toUpperCase();
  if (s.length !== LEGACY_QUESTIONS.length) return null;
  const choices = parseChoices(s);
  if (!choices) return null;
  return { version: "v1", seed: null, choices };
}

function parseChoices(s: string | undefined | null): Choice[] | null {
  if (!s) return null;
  const out: Choice[] = [];
  for (const ch of s.toUpperCase()) {
    if (ch !== "A" && ch !== "B") return null;
    out.push(ch);
  }
  return out;
}

// ── Scoring ────────────────────────────────────────────────────────────

// Score against the questions the user actually saw. `flips[i]` true means
// the visual A/B was swapped at presentation time — the user's "A" clicks
// question.b and vice versa.
export function scoreChoices(
  choices: Choice[],
  questions: MirrorQuestion[],
  flips?: boolean[],
): Record<MirrorClusterId, number> {
  const scores = Object.fromEntries(
    ALL_CLUSTERS.map((id) => [id, 0]),
  ) as Record<MirrorClusterId, number>;
  const n = Math.min(choices.length, questions.length);
  for (let i = 0; i < n; i++) {
    const flipped = flips?.[i] ?? false;
    const resolved: Choice = flipped
      ? choices[i] === "A"
        ? "B"
        : "A"
      : choices[i];
    const pick = resolved === "A" ? questions[i].a : questions[i].b;
    scores[pick.cluster] += 1;
  }
  return scores;
}

export function topClusters(
  scores: Record<MirrorClusterId, number>,
  n = 3,
): MirrorClusterId[] {
  return (Object.entries(scores) as [MirrorClusterId, number][])
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([id]) => id);
}

// Clusters that were offered in this session but scored 0.
export function quietClusters(
  scores: Record<MirrorClusterId, number>,
  questions: MirrorQuestion[],
): MirrorClusterId[] {
  const offered = new Set<MirrorClusterId>();
  for (const q of questions) {
    offered.add(q.a.cluster);
    offered.add(q.b.cluster);
  }
  return Array.from(offered).filter((id) => scores[id] === 0);
}

// ── Reading name ───────────────────────────────────────────────────────
//
// Each cluster maps to a single evocative noun — a place, a tool, an
// element. Pairing the top two produces a poetic handle for the reading
// ("Crown & Blade", "Hearth & Forge") that people can screenshot and talk
// about. Nouns over adjectives so they compose cleanly regardless of
// ordering or pairing.
export const CLUSTER_NAME_WORD: Record<MirrorClusterId, string> = {
  sovereign: "Crown",
  warrior: "Blade",
  "sage-magician": "Glyph",
  lover: "Hearth",
  innocent: "Dawn",
  explorer: "Compass",
  rebel: "Storm",
  creator: "Forge",
  jester: "Bell",
  caregiver: "Cradle",
  everyman: "Commons",
  "death-rebirth": "Chrysalis",
  teacher: "Beacon",
  "liminal-territory": "Veil",
};

export interface ReadingName {
  // Ready-to-render string ("Crown & Blade", "Crown", "A Quiet Field").
  display: string;
  // Per-cluster parts so UIs can color each word with its cluster hue.
  // Empty when the reading is a quiet field.
  parts: Array<{ word: string; clusterId: MirrorClusterId }>;
}

// Compose a name from the top one or two dominant clusters. `dominant` is
// expected pre-sorted by score (as returned by topClusters); only the
// first two are used so the handle stays a poetic pair rather than a list.
export function readingName(dominant: MirrorClusterId[]): ReadingName {
  if (dominant.length === 0) {
    return { display: "A Quiet Field", parts: [] };
  }
  const parts = dominant.slice(0, 2).map((id) => ({
    word: CLUSTER_NAME_WORD[id],
    clusterId: id,
  }));
  return { display: parts.map((p) => p.word).join(" & "), parts };
}
