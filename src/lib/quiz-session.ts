import { QUIZ_QUESTIONS } from "@/data/quiz-questions";
import { mulberry32 } from "@/lib/dailyDraw";
import type {
  ForcedChoiceItem,
  QuizItem,
  QuizResponse,
  QuizSection,
  ScenarioItem,
} from "@/lib/quiz-types";

// A QuizSession is a deterministic arrangement of items derived from a seed
// string. The seed + the frozen QUIZ_QUESTIONS bank together reconstruct the
// exact same reading on any machine, so a share URL doesn't need to carry the
// item list — only seed + answers.

export interface QuizSession {
  seed: string;
  items: QuizItem[];
}

// Default length of a presented reading. Below the bank (60) so the seeded
// draw can be stratified and leave variety between sessions.
export const DEFAULT_SESSION_LENGTH = 50;

// Alphabet shared with the Mirror. 30 chars, no 0/O/1/I/l — survives being
// read aloud. Used for the seed prefix only; responses use a 32-char alphabet
// so the bitstream maps cleanly onto 5-bit chunks.
const SEED_ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";

// 32-char base32 (Crockford-ish — no i, l, o, u). One char == 5 bits, so the
// response bitstream slots cleanly onto it.
const BASE32_ALPHABET = "0123456789abcdefghjkmnpqrstvwxyz";
const BASE32_INDEX = (() => {
  const m = new Map<string, number>();
  for (let i = 0; i < BASE32_ALPHABET.length; i++) {
    m.set(BASE32_ALPHABET[i], i);
  }
  return m;
})();

const SCHEMA_VERSION = "q1";

// Stratified session composition. Target counts per item family. If the bank
// changes, clamp to whatever the bank actually has — we'd rather run a
// slightly shorter reading than crash.
const SECTION_TARGETS: Array<{
  section: QuizSection;
  prefix: string; // id prefix matching quiz-questions.ts
  count: number;
}> = [
  // Calibration mixes stage / stability / belonging so the opening doesn't
  // feel like 22 of one kind in a row.
  { section: "calibration", prefix: "cal-stage-", count: 10 },
  { section: "calibration", prefix: "cal-stab-", count: 6 },
  { section: "calibration", prefix: "cal-bel-", count: 6 },
  { section: "relational-affect", prefix: "aff-", count: 8 },
  { section: "relational-affect", prefix: "stn-", count: 8 },
  { section: "narrative", prefix: "nar-", count: 6 },
  { section: "shadow", prefix: "shd-", count: 6 },
];

export const SECTION_ORDER: QuizSection[] = [
  "calibration",
  "relational-affect",
  "narrative",
  "shadow",
];

export function randomSeed(length = 4): string {
  const out: string[] = [];
  const crypto =
    typeof globalThis !== "undefined" && "crypto" in globalThis
      ? (globalThis.crypto as Crypto | undefined)
      : undefined;
  if (crypto && typeof crypto.getRandomValues === "function") {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    for (let i = 0; i < length; i++) {
      out.push(SEED_ALPHABET[bytes[i] % SEED_ALPHABET.length]);
    }
  } else {
    for (let i = 0; i < length; i++) {
      out.push(
        SEED_ALPHABET[Math.floor(Math.random() * SEED_ALPHABET.length)],
      );
    }
  }
  return out.join("");
}

function hashSeed(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h || 1;
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Interleave buckets so a single section doesn't present one dim for 10
// questions in a row. Round-robin draw from each non-empty bucket until all
// are drained.
function interleave<T>(buckets: T[][]): T[] {
  const out: T[] = [];
  const queues = buckets.map((b) => b.slice());
  let any = true;
  while (any) {
    any = false;
    for (const q of queues) {
      const next = q.shift();
      if (next !== undefined) {
        out.push(next);
        any = true;
      }
    }
  }
  return out;
}

// Deterministic stratified draw. Per (section, prefix) bucket, shuffle with a
// hash of seed+prefix, take the target count. Within each section we
// interleave its buckets so dims alternate. Sections themselves are always
// presented in the canonical SECTION_ORDER so the ceremony pacing is stable.
export function sessionFromSeed(
  seed: string,
  pool: QuizItem[] = QUIZ_QUESTIONS,
  length: number = DEFAULT_SESSION_LENGTH,
): QuizSession {
  const bySection: Record<QuizSection, QuizItem[][]> = {
    calibration: [],
    "relational-affect": [],
    narrative: [],
    shadow: [],
  };

  for (const target of SECTION_TARGETS) {
    const bucket = pool.filter((q) => q.id.startsWith(target.prefix));
    // Seed per-bucket so reordering within a bucket depends on seed + prefix
    // but not on prior buckets — adding a new bucket shouldn't reshuffle
    // unrelated ones.
    const rng = mulberry32(hashSeed(`${seed}:${target.prefix}`));
    const shuffled = shuffle(bucket, rng);
    const take = Math.min(target.count, shuffled.length);
    bySection[target.section].push(shuffled.slice(0, take));
  }

  const ordered: QuizItem[] = [];
  for (const section of SECTION_ORDER) {
    ordered.push(...interleave(bySection[section]));
  }

  // If somebody passed a length shorter than the stratified plan, clip.
  // Longer-than-plan is ignored — the bank determines the ceiling.
  const clipped =
    length < ordered.length ? ordered.slice(0, length) : ordered;

  return { seed, items: clipped };
}

export function createSession(
  pool: QuizItem[] = QUIZ_QUESTIONS,
  length: number = DEFAULT_SESSION_LENGTH,
): QuizSession {
  return sessionFromSeed(randomSeed(), pool, length);
}

// ─────────────────────────────────────────────────────────────────────────
// Bit-packed URL encoding
// ─────────────────────────────────────────────────────────────────────────

// Response bit widths, by item kind + option count. Every session item must
// produce a fixed-width payload so the decoder can walk the stream in order.
//   likert         → 3 bits (value 1..7 stored as 0..6)
//   forced-choice-2 → 1 bit
//   forced-choice-3 → 2 bits
//   scenario (4-opt) → 2 bits
function bitsFor(item: QuizItem): number {
  if (item.kind === "likert") return 3;
  if (item.kind === "forced-choice") {
    return item.options.length <= 2 ? 1 : 2;
  }
  // scenario — authored as 4 options
  return 2;
}

function encodeResponseValue(
  item: QuizItem,
  value: QuizResponse["value"],
): number {
  if (item.kind === "likert") {
    const v = typeof value === "number" ? value : 4;
    return Math.min(7, Math.max(1, v)) - 1; // 1..7 → 0..6
  }
  // For forced-choice / scenario, value is the option id. Fall back to 0 if
  // unknown so the stream stays aligned.
  const opts = (item as ForcedChoiceItem | ScenarioItem).options;
  const idx = opts.findIndex((o) => o.id === value);
  return idx < 0 ? 0 : idx;
}

function decodeResponseValue(
  item: QuizItem,
  bits: number,
): QuizResponse["value"] {
  if (item.kind === "likert") {
    return Math.min(7, Math.max(1, bits + 1));
  }
  const opts = (item as ForcedChoiceItem | ScenarioItem).options;
  const idx = Math.min(bits, opts.length - 1);
  return opts[idx].id;
}

class BitWriter {
  private bits: number[] = [];
  write(value: number, width: number) {
    for (let i = width - 1; i >= 0; i--) {
      this.bits.push((value >> i) & 1);
    }
  }
  toBase32(): string {
    const pad = (5 - (this.bits.length % 5)) % 5;
    for (let i = 0; i < pad; i++) this.bits.push(0);
    const chars: string[] = [];
    for (let i = 0; i < this.bits.length; i += 5) {
      const v =
        (this.bits[i] << 4) |
        (this.bits[i + 1] << 3) |
        (this.bits[i + 2] << 2) |
        (this.bits[i + 3] << 1) |
        this.bits[i + 4];
      chars.push(BASE32_ALPHABET[v]);
    }
    return chars.join("");
  }
}

class BitReader {
  private bits: number[] = [];
  private cursor = 0;
  constructor(base32: string) {
    for (const ch of base32.toLowerCase()) {
      const v = BASE32_INDEX.get(ch);
      if (v === undefined) continue;
      for (let i = 4; i >= 0; i--) this.bits.push((v >> i) & 1);
    }
  }
  read(width: number): number {
    let v = 0;
    for (let i = 0; i < width; i++) {
      const b = this.bits[this.cursor++] ?? 0;
      v = (v << 1) | b;
    }
    return v;
  }
}

// Build the shareable URL slug for a completed session.
//   q1-{seed4}-{base32Responses}
// The decoder needs both halves: the seed reconstructs the item order; the
// base32 reconstructs the responses against that order.
export function encodeResultPath(
  session: QuizSession,
  responses: QuizResponse[],
): string {
  const byId = new Map(responses.map((r) => [r.itemId, r]));
  const writer = new BitWriter();
  for (const item of session.items) {
    const r = byId.get(item.id);
    const value = r?.value ?? (item.kind === "likert" ? 4 : item.kind === "forced-choice" ? item.options[0].id : item.options[0].id);
    writer.write(encodeResponseValue(item, value), bitsFor(item));
  }
  return `${SCHEMA_VERSION}-${session.seed}-${writer.toBase32()}`;
}

export interface DecodedResult {
  session: QuizSession;
  responses: QuizResponse[];
}

// Parse a share URL slug back into session + responses. Returns null if the
// slug is malformed or the schema version doesn't match.
export function decodeResultPath(
  slug: string,
  pool: QuizItem[] = QUIZ_QUESTIONS,
): DecodedResult | null {
  const parts = slug.split("-");
  if (parts.length !== 3) return null;
  const [version, seed, payload] = parts;
  if (version !== SCHEMA_VERSION) return null;
  if (!seed || !payload) return null;

  const session = sessionFromSeed(seed, pool);
  const reader = new BitReader(payload);
  const responses: QuizResponse[] = session.items.map((item) => ({
    itemId: item.id,
    value: decodeResponseValue(item, reader.read(bitsFor(item))),
  }));
  return { session, responses };
}

// Stable 4-digit "No" derived from the slug. fnv-1a 32-bit clipped to
// 4 digits and zero-padded — the artefact feel wants a signed number,
// not a perfect hash. Shared so the Reading page and the OG card show
// the same number for the same slug.
export function readingNumberFor(slug: string): string {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return String(h % 10000).padStart(4, "0");
}

// ─────────────────────────────────────────────────────────────────────────
// Section helpers (used by the ceremony flow)
// ─────────────────────────────────────────────────────────────────────────

// Partition the flat item list into its section runs, preserving order. The
// ceremony flow shows threshold pages between sections, so it needs to know
// where each section ends.
export function sectionRuns(
  items: QuizItem[],
): Array<{ section: QuizSection; items: QuizItem[]; startIndex: number }> {
  const out: Array<{
    section: QuizSection;
    items: QuizItem[];
    startIndex: number;
  }> = [];
  let current: QuizSection | null = null;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (it.section !== current) {
      out.push({ section: it.section, items: [it], startIndex: i });
      current = it.section;
    } else {
      out[out.length - 1].items.push(it);
    }
  }
  return out;
}

// The item at flat-index `flat` is the Nth of its section. Used to show
// section-relative counters like "III of XII" instead of jumping to 35.
export function sectionProgress(
  items: QuizItem[],
  flat: number,
): { section: QuizSection; indexInSection: number; sectionTotal: number } {
  const runs = sectionRuns(items);
  for (const run of runs) {
    if (flat < run.startIndex + run.items.length) {
      return {
        section: run.section,
        indexInSection: flat - run.startIndex,
        sectionTotal: run.items.length,
      };
    }
  }
  // Past the end — clamp to last section.
  const last = runs[runs.length - 1];
  return {
    section: last.section,
    indexInSection: last.items.length - 1,
    sectionTotal: last.items.length,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Dev-mode round-trip guardrail
// ─────────────────────────────────────────────────────────────────────────

if (process.env.NODE_ENV !== "production") {
  const session = sessionFromSeed("abcd");
  const fake: QuizResponse[] = session.items.map((it) => {
    if (it.kind === "likert") return { itemId: it.id, value: 5 };
    return { itemId: it.id, value: it.options[0].id };
  });
  const slug = encodeResultPath(session, fake);
  const back = decodeResultPath(slug);
  if (!back) {
    console.warn("[quiz-session] round-trip decode returned null");
  } else if (back.responses.length !== fake.length) {
    console.warn(
      `[quiz-session] round-trip length drift ${fake.length} → ${back.responses.length}`,
    );
  } else {
    for (let i = 0; i < fake.length; i++) {
      if (
        back.responses[i].itemId !== fake[i].itemId ||
        back.responses[i].value !== fake[i].value
      ) {
        console.warn(
          `[quiz-session] round-trip drift at ${i}: ${JSON.stringify(
            fake[i],
          )} → ${JSON.stringify(back.responses[i])}`,
        );
        break;
      }
    }
  }
}
