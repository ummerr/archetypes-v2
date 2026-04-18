// The Mirror — a 12-question forced-choice sorter.
//
// Each pair offers two present-tense energy states. The user picks one; the
// chosen cluster scores +1. Cluster IDs must match grounded-resonance-map.json.
// This is a reflective instrument, not a psychometric one — question
// calibration is editorial, not empirical.

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
  a: MirrorOption;
  b: MirrorOption;
}

export const QUESTIONS: MirrorQuestion[] = [
  {
    a: { text: "holding the center for others", cluster: "sovereign" },
    b: { text: "cutting through to what needs doing", cluster: "warrior" },
  },
  {
    a: { text: "withdraw into analysis", cluster: "sage-magician" },
    b: { text: "reach for whoever's nearest", cluster: "lover" },
  },
  {
    a: { text: "freedom to explore", cluster: "explorer" },
    b: { text: "a structure I can trust", cluster: "sovereign" },
  },
  {
    a: { text: "breaking what's not working", cluster: "rebel" },
    b: { text: "building something that endures", cluster: "creator" },
  },
  {
    a: { text: "make it lighter with humor", cluster: "jester" },
    b: { text: "go quiet and sit with it", cluster: "liminal-territory" },
  },
  {
    a: { text: "deeply connected to someone", cluster: "lover" },
    b: { text: "fully absorbed in making something", cluster: "creator" },
  },
  {
    a: { text: "protect and care for others", cluster: "caregiver" },
    b: { text: "challenge them to grow", cluster: "warrior" },
  },
  {
    a: { text: "understand why things work", cluster: "sage-magician" },
    b: { text: "feel what things mean", cluster: "lover" },
  },
  {
    a: { text: "belonging and solidarity", cluster: "everyman" },
    b: { text: "solitude and self-discovery", cluster: "explorer" },
  },
  {
    a: { text: "an ending that needs to happen", cluster: "death-rebirth" },
    b: { text: "a beginning I'm not ready for", cluster: "innocent" },
  },
  {
    a: { text: "teaching what I know", cluster: "teacher" },
    b: { text: "learning what I don't", cluster: "explorer" },
  },
  {
    a: { text: "disrupting the pattern", cluster: "rebel" },
    b: { text: "holding the space", cluster: "sovereign" },
  },
];

// Context sentence shown above each choice pair. Each frame must read
// naturally when concatenated with either of its option texts.
export const QUESTION_FRAMES: string[] = [
  "Right now I'm more pulled toward",
  "Under pressure I tend to",
  "What I most need is",
  "I'm more drawn to",
  "When things get hard, I",
  "I feel most alive when",
  "My instinct is to",
  "I'd rather",
  "Right now I need",
  "I'm navigating",
  "My energy is going toward",
  "I feel most like myself when",
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

export const CLUSTERS_IN_USE: MirrorClusterId[] = Array.from(
  new Set(QUESTIONS.flatMap((q) => [q.a.cluster, q.b.cluster])),
) as MirrorClusterId[];

export type Choice = "A" | "B";

export function encodeResult(choices: Choice[]): string {
  return choices.join("");
}

// Accepts `AABB...` (12 chars of A/B). Returns null for anything malformed so
// a bad URL falls back to the empty sorter.
export function decodeResult(raw: string | null | undefined): Choice[] | null {
  if (!raw) return null;
  const s = raw.toUpperCase();
  if (s.length !== QUESTIONS.length) return null;
  const out: Choice[] = [];
  for (const ch of s) {
    if (ch !== "A" && ch !== "B") return null;
    out.push(ch);
  }
  return out;
}

export function scoreChoices(choices: Choice[]): Record<MirrorClusterId, number> {
  const scores = Object.fromEntries(
    CLUSTERS_IN_USE.map((id) => [id, 0]),
  ) as Record<MirrorClusterId, number>;
  for (let i = 0; i < choices.length && i < QUESTIONS.length; i++) {
    const pick = choices[i] === "A" ? QUESTIONS[i].a : QUESTIONS[i].b;
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

export function quietClusters(
  scores: Record<MirrorClusterId, number>,
): MirrorClusterId[] {
  return CLUSTERS_IN_USE.filter((id) => scores[id] === 0);
}
