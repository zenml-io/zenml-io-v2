export const TIME_ZONE = "Europe/Amsterdam";
const SEND_WEEKDAYS = new Set([2, 4]); // Tue, Thu
const SEND_HOUR = 9;

const partsFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric",
});
function zoned(d: Date) {
  const p = Object.fromEntries(partsFmt.formatToParts(d).map((x) => [x.type, Number(x.value)]));
  return { y: p.year, m: p.month, d: p.day, h: p.hour, min: p.minute, s: p.second };
}
/** Offset of Amsterdam from UTC at instant `t`, in ms. */
function offsetAt(t: number): number {
  const z = zoned(new Date(t));
  return Date.UTC(z.y, z.m - 1, z.d, z.h, z.min, z.s) - Math.floor(t / 1000) * 1000;
}
function amsterdamToUtc(y: number, m: number, d: number, h: number): Date {
  const guess = Date.UTC(y, m - 1, d, h);
  return new Date(guess - offsetAt(guess - offsetAt(guess)));
}

export function nextSendSlot(now: Date, minLeadHours = 12): Date {
  const today = zoned(now);
  for (let i = 0; i < 14; i++) {
    const day = new Date(Date.UTC(today.y, today.m - 1, today.d + i));
    if (!SEND_WEEKDAYS.has(day.getUTCDay())) continue;
    const candidate = amsterdamToUtc(day.getUTCFullYear(), day.getUTCMonth() + 1, day.getUTCDate(), SEND_HOUR);
    if (candidate.getTime() - now.getTime() >= minLeadHours * 3_600_000) return candidate;
  }
  throw new Error("no send slot within 14 days");
}

const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, ...o });
const issueFmt = fmt({ weekday: "short", day: "numeric", month: "short", year: "numeric" });
const addedFmt = fmt({ day: "numeric", month: "short" });
const pick = (f: Intl.DateTimeFormat, d: Date, types: string[]) => {
  const p = Object.fromEntries(f.formatToParts(d).map((x) => [x.type, x.value]));
  return types.map((t) => p[t]).join(" ");
};
export const formatIssueDate = (d: Date) => pick(issueFmt, d, ["weekday", "day", "month", "year"]);
export const formatAddedDate = (d: Date) => pick(addedFmt, d, ["day", "month"]);
