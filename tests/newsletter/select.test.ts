import { describe, expect, it } from "vitest";
import type { Entry } from "../../scripts/newsletter/entries";
import { buildPool, pickIssue } from "../../scripts/newsletter/select";

const e = (
  slug: string,
  day: number,
  industry: string | null,
  company: string | null,
): Entry => ({
  slug,
  title: slug,
  company,
  industry,
  summary: "",
  link: null,
  publishedAt: new Date(Date.UTC(2026, 8, day, 8)),
  sections: [{ heading: "Overview", text: "x" }],
});
const now = new Date("2026-09-29T16:00:00Z");

describe("buildPool", () => {
  it("keeps entries inside the window that were not already sent", () => {
    const entries = [
      e("old", 1, "Tech", "A"),
      e("new", 28, "Tech", "B"),
      e("sent", 27, "Legal", "C"),
    ];
    expect(
      buildPool(entries, {
        now,
        windowDays: 14,
        exclude: new Set(["sent"]),
      }).map((x) => x.slug),
    ).toEqual(["new"]);
  });
});

describe("pickIssue", () => {
  it("takes newest first, skipping repeated industry or company", () => {
    const pool = [
      e("w", 28, "Tech", "Warp"),
      e("g", 28, "Tech", "Grammarly"),
      e("h1", 27, "Legal", "Harvey"),
      e("h2", 26, "Finance", "Harvey"),
      e("j", 25, "Healthcare", "J&J"),
      e("r", 24, "Finance", "Ramp"),
    ];
    expect(pickIssue(pool, 4).map((x) => x.slug)).toEqual([
      "g",
      "h1",
      "j",
      "r",
    ]);
  });
  it("breaks publishedAt ties by slug so picks are deterministic", () => {
    expect(
      pickIssue([e("b", 28, "X", "B"), e("a", 28, "Y", "A")], 1)[0].slug,
    ).toBe("a");
  });
  it("relaxes only the industry rule when the strict pass comes up short", () => {
    const pool = [
      e("t1", 28, "Tech", "A"),
      e("t2", 27, "Tech", "B"),
      e("t3", 26, "Tech", "A"),
      e("t4", 25, "Tech", "C"),
      e("l", 24, "Legal", "D"),
    ];
    expect(pickIssue(pool, 4).map((x) => x.slug)).toEqual([
      "t1",
      "l",
      "t2",
      "t4",
    ]);
  });
  it("treats company names case-insensitively and returns fewer when impossible", () => {
    expect(
      pickIssue([e("a", 28, "X", "Harvey"), e("b", 27, "Y", "harvey ")], 4).map(
        (x) => x.slug,
      ),
    ).toEqual(["a"]);
  });
});
