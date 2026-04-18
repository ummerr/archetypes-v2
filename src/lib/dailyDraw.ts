import { CLUSTERS, type ResonanceEntry, type ThematicCluster } from "@/data/resonance";

export interface DrawableEntry {
  entry: ResonanceEntry;
  clusters: ThematicCluster[];
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffledIndices(total: number, seed: number): number[] {
  const out = Array.from({ length: total }, (_, i) => i);
  const rand = mulberry32(seed || 1);
  for (let i = total - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

let cached: DrawableEntry[] | null = null;

export function allDrawableEntries(): DrawableEntry[] {
  if (cached) return cached;
  const byKey = new Map<string, DrawableEntry>();
  for (const cluster of CLUSTERS) {
    for (const entry of cluster.archetypes) {
      const key = `${entry.system}::${entry.slug}`;
      const existing = byKey.get(key);
      if (existing) {
        existing.clusters.push(cluster);
      } else {
        byKey.set(key, { entry, clusters: [cluster] });
      }
    }
  }
  cached = Array.from(byKey.values()).sort((a, b) => {
    const k1 = `${a.entry.system}::${a.entry.slug}`;
    const k2 = `${b.entry.system}::${b.entry.slug}`;
    return k1 < k2 ? -1 : k1 > k2 ? 1 : 0;
  });
  return cached;
}

export function dailyIndex(date: Date, total: number): number {
  const dayEpoch = Math.floor(date.getTime() / 86_400_000);
  const cycle = Math.floor(dayEpoch / total);
  const position = ((dayEpoch % total) + total) % total;
  return shuffledIndices(total, cycle + 1)[position];
}

export function todaysDraw(date: Date = new Date()): DrawableEntry {
  const entries = allDrawableEntries();
  return entries[dailyIndex(date, entries.length)];
}

export function dateKeyUTC(date: Date = new Date()): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
