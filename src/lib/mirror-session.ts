import {
  LEGACY_QUESTIONS,
  QUESTION_POOL,
  type MirrorClusterId,
  type MirrorQuestion,
} from "@/data/mirror-questions";
import { mulberry32 } from "@/lib/dailyDraw";

// A MirrorSession captures everything needed to render, score, and
// reproduce a specific run of the sorter: the questions presented, which
// pool indices they came from, whether each question was shown with its
// A/B orientation flipped, and the seed that generated all of the above.
export interface MirrorSession {
  seed: string;
  indices: number[];
  flips: boolean[];
  questions: MirrorQuestion[];
}

// Default length of a presented quiz. The URL encoder tolerates other
// lengths — only the pool size is a hard ceiling.
export const DEFAULT_SESSION_LENGTH = 12;

// Alphabet for generated seeds. No 0/O/1/I/l so a human reading a shared
// link aloud can't confuse similar glyphs. 30 chars → 4-char seeds give
// ≈810k distinct sessions, enough for this context.
const SEED_ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";

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

// FNV-1a 32-bit. Deterministic: same seed string always yields the same
// RNG stream, so a shared URL always reconstructs the same session.
export function hashSeed(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h || 1;
}

// Stratified selection: walk the seed-shuffled pool, prefer questions
// that introduce an uncovered cluster. Guarantees that any 12-question
// run touches as many clusters as possible while staying deterministic.
export function sessionFromSeed(
  seed: string,
  pool: MirrorQuestion[] = QUESTION_POOL,
  count: number = DEFAULT_SESSION_LENGTH,
): MirrorSession {
  const rng = mulberry32(hashSeed(seed));
  const size = Math.min(count, pool.length);

  const shuffled = Array.from({ length: pool.length }, (_, i) => i);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const selected: number[] = [];
  const leftover: number[] = [];
  const covered = new Set<MirrorClusterId>();

  for (const idx of shuffled) {
    if (selected.length >= size) {
      leftover.push(idx);
      continue;
    }
    const q = pool[idx];
    if (!covered.has(q.a.cluster) || !covered.has(q.b.cluster)) {
      selected.push(idx);
      covered.add(q.a.cluster);
      covered.add(q.b.cluster);
    } else {
      leftover.push(idx);
    }
  }

  while (selected.length < size && leftover.length > 0) {
    const next = leftover.shift();
    if (next !== undefined) selected.push(next);
  }

  const flips = selected.map(() => rng() < 0.5);

  return {
    seed,
    indices: selected,
    flips,
    questions: selected.map((i) => pool[i]),
  };
}

// Fresh seeded session for a new run. Not called during SSR — seed
// generation lives on the client so server rendering stays stable.
export function createSession(
  pool: MirrorQuestion[] = QUESTION_POOL,
  count: number = DEFAULT_SESSION_LENGTH,
): MirrorSession {
  return sessionFromSeed(randomSeed(), pool, count);
}

// Session that matches the legacy fixed-order 12 questions with no flips.
// Used when decoding a v1 `?r=AABBAB…` URL so historical shares still
// show the same reading.
export function legacySession(): MirrorSession {
  return {
    seed: "legacy",
    indices: LEGACY_QUESTIONS.map((_, i) => i),
    flips: LEGACY_QUESTIONS.map(() => false),
    questions: LEGACY_QUESTIONS,
  };
}
