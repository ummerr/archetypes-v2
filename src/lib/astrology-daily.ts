import { ASTROLOGY_DAILY } from "@/data/astrology/daily";
import { dateKeyUTC } from "@/lib/dailyDraw";

// 32-bit FNV-1a — a stable, dependency-free hash so a (sign, day) pair always
// resolves to the same reading everywhere, without storing anything.
function fnv1a(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export interface DailyReading {
  omen: string;
  turn: string;
  dateLabel: string;
}

/**
 * The day's reading for a sign. The omen and the turn are drawn independently
 * from their pools, so the pairing itself varies day to day — each sign shows a
 * different reading than its neighbours, and a different one tomorrow. Keyed on
 * the UTC day (matching `/today`) so it rotates at the same instant worldwide.
 */
export function dailyReadingFor(slug: string, date: Date = new Date()): DailyReading | null {
  const pool = ASTROLOGY_DAILY[slug];
  if (!pool || pool.omens.length === 0 || pool.turns.length === 0) return null;
  const key = dateKeyUTC(date);
  const omen = pool.omens[fnv1a(`${slug}:${key}:omen`) % pool.omens.length];
  const turn = pool.turns[fnv1a(`${slug}:${key}:turn`) % pool.turns.length];
  return { omen, turn, dateLabel: key };
}

/** Human date, e.g. "11 July 2026", from a YYYY-MM-DD key (UTC). */
export function formatDailyDate(dateLabel: string): string {
  const [y, m, d] = dateLabel.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  if (!y || !m || !d) return dateLabel;
  return `${d} ${months[m - 1]} ${y}`;
}
