import { describe, expect, it } from "vitest";
import {
  formatAddedDate,
  formatIssueDate,
  nextSendSlot,
} from "../../scripts/newsletter/schedule";

const slot = (iso: string) => nextSendSlot(new Date(iso)).toISOString();

describe("nextSendSlot", () => {
  it("Monday evening run → Tuesday 09:00 CEST", () =>
    expect(slot("2026-10-05T16:00:00Z")).toBe("2026-10-06T07:00:00.000Z"));
  it("after the clocks go back → Thursday 09:00 CET", () =>
    expect(slot("2026-10-28T16:00:00Z")).toBe("2026-10-29T08:00:00.000Z"));
  it("manual Friday run → next Tuesday", () =>
    expect(slot("2026-10-09T10:00:00Z")).toBe("2026-10-13T07:00:00.000Z"));
  it("skips a slot less than 12h away", () =>
    expect(slot("2026-10-05T23:30:00Z")).toBe("2026-10-08T07:00:00.000Z"));
  it("spring-forward week", () =>
    expect(slot("2026-03-30T16:00:00Z")).toBe("2026-03-31T07:00:00.000Z"));
});

describe("formatting", () => {
  it("formats in Amsterdam time", () => {
    expect(formatIssueDate(new Date("2026-10-06T07:00:00Z"))).toBe(
      "Tue 6 Oct 2026",
    );
    expect(formatAddedDate(new Date("2026-09-28T23:30:00Z"))).toBe("29 Sep");
  });
});
