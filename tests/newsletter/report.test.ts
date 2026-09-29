import { describe, expect, it } from "vitest";
import { renderReport } from "../../scripts/newsletter/report";

const worth = (slug: string, keep = true) => ({
  slug,
  production: 1,
  specificity: 1,
  worth: keep ? 1 : 0.2,
  keep,
});

describe("renderReport", () => {
  it("includes the cancel link, fallback warnings and removed entries", () => {
    const r = renderReport({
      kind: "scheduled",
      issueNumber: 7,
      sendAt: new Date("2026-10-06T07:00:00Z"),
      campaignId: 42,
      items: [
        {
          slug: "a",
          title: "A",
          worth: worth("a"),
          blurb: null,
          fallback: true,
        },
      ],
      removed: [worth("thin", false)],
    });
    expect(r?.subject).toBe(
      "In Production #7 scheduled for Tue 6 Oct 2026 09:00",
    );
    expect(r?.html).toContain("/42");
    expect(r?.html).toContain("⚠ fallback summary");
    expect(r?.html).toContain("thin");
  });
  it("explains a skipped issue", () => {
    expect(
      renderReport({
        kind: "skipped",
        reason: "only 2 eligible entries",
        removed: [],
      })?.html,
    ).toContain("only 2 eligible entries");
  });
  it("sends nothing when the slot was already scheduled", () => {
    expect(
      renderReport({ kind: "already-scheduled", campaignId: 1 }),
    ).toBeNull();
  });
});
