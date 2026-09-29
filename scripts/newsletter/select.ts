import type { Entry } from "./entries";

const DAY_MS = 86_400_000;
const norm = (s: string | null) => s?.trim().toLowerCase() ?? null;

export function buildPool(entries: readonly Entry[], o: { now: Date; windowDays: number; exclude: ReadonlySet<string> }): Entry[] {
  const from = o.now.getTime() - o.windowDays * DAY_MS;
  return entries.filter((e) => e.publishedAt.getTime() >= from && e.publishedAt <= o.now && !o.exclude.has(e.slug));
}

/** Newest first; no repeated company; no repeated industry unless the strict pass can't fill `count`. */
export function pickIssue(pool: readonly Entry[], count: number): Entry[] {
  const sorted = [...pool].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime() || a.slug.localeCompare(b.slug));
  const picks: Entry[] = [];
  const clashes = (e: Entry, checkIndustry: boolean) =>
    picks.some((p) => (e.company && norm(p.company) === norm(e.company)) || (checkIndustry && e.industry && p.industry === e.industry));
  for (const checkIndustry of [true, false]) {
    for (const e of sorted) {
      if (picks.length === count) break;
      if (!picks.includes(e) && !clashes(e, checkIndustry)) picks.push(e);
    }
  }
  return picks;
}
