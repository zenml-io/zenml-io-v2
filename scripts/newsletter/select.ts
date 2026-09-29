import { createHash } from "node:crypto";
import type { Entry } from "./entries";

const DAY_MS = 86_400_000;
const norm = (s: string | null) => s?.trim().toLowerCase() ?? null;

export type DatedEntry = Entry & { publishedAt: Date };

export function buildPool(entries: readonly Entry[], o: { now: Date; windowDays: number; exclude: ReadonlySet<string> }): DatedEntry[] {
  const from = o.now.getTime() - o.windowDays * DAY_MS;
  return entries.filter((e): e is DatedEntry =>
    e.publishedAt !== null && e.publishedAt.getTime() >= from && e.publishedAt <= o.now && !o.exclude.has(e.slug));
}

/** True if `e` shares a company, or (when `checkIndustry`) an industry, with any of `picks`. */
export const clashes = (e: Entry, picks: readonly Entry[], checkIndustry = true) =>
  picks.some((p) => (e.company && norm(p.company) === norm(e.company)) || (checkIndustry && e.industry && p.industry === e.industry));

/** Newest first; no repeated company; no repeated industry unless the strict pass can't fill `count`. */
export function pickIssue(pool: readonly DatedEntry[], count: number): DatedEntry[] {
  const sorted = [...pool].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime() || a.slug.localeCompare(b.slug));
  const picks: DatedEntry[] = [];
  for (const checkIndustry of [true, false]) {
    for (const e of sorted) {
      if (picks.length === count) break;
      if (!picks.includes(e) && !clashes(e, picks, checkIndustry)) picks.push(e);
    }
  }
  return picks;
}

/**
 * Archive candidates: never sent, and either migrated from Webflow (no publishedAt) or published before the
 * widest recent window, so the recent picks can never reach them.
 */
export function buildArchivePool(entries: readonly Entry[], o: { now: Date; recentWindowDays: number; exclude: ReadonlySet<string> }): Entry[] {
  const before = o.now.getTime() - o.recentWindowDays * DAY_MS;
  return entries.filter((e) => (e.publishedAt === null || e.publishedAt.getTime() < before) && !o.exclude.has(e.slug));
}

/**
 * A fixed shuffle of the archive for one send slot: entries sorted by sha256(`seed:slug`). The same seed and pool
 * always give the same order, so "why this one?" has a plain answer: it came first in that slot's order among the
 * entries that passed the checks. A different slot gets a different order.
 */
export function archiveOrder(pool: readonly Entry[], seed: string): Entry[] {
  const key = (e: Entry) => createHash("sha256").update(`${seed}:${e.slug}`).digest("hex");
  return pool.map((e) => ({ e, k: key(e) })).sort((a, b) => a.k.localeCompare(b.k)).map((x) => x.e);
}
