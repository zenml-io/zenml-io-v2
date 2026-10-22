/**
 * Number formatting shared by the benchmark report modules. Values are
 * formatted, never recomputed: accuracies to one decimal of a percent, costs
 * to two decimals of a cent, intervals as published, with a true minus sign.
 */

const minus = (s: string) => s.replace("-", "−");

/** 0.9762 → "97.6%" */
export const pct = (x: number) => `${(x * 100).toFixed(1)}%`;

/** A difference in points: 2.4 → "+2.4", -6.4 → "−6.4" */
export const points = (x: number) =>
  minus(`${x > 0 ? "+" : ""}${x.toFixed(1)}`);

/** A 0–1 interval as percentages: [0.949, 0.989] → "[94.9, 98.9]" */
export const interval = ([lo, hi]: number[]) =>
  `[${(lo * 100).toFixed(1)}, ${(hi * 100).toFixed(1)}]`;

/** An interval in points: [-3.6, 8.3] → "[−3.6, 8.3]" */
export const pointInterval = ([lo, hi]: number[]) =>
  `[${points(lo)}, ${points(hi)}]`.replace(/\+/g, "");

/** 0.3792 → "0.38¢" */
export const cents = (x: number) => `${x.toFixed(2)}¢`;

/** "2026-10-21" → "October 21, 2026" */
export const longDate = (iso: string) =>
  new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
