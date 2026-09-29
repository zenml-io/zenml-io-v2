import { describe, expect, it } from "vitest";
import {
  type CampaignSummary,
  campaignForSlot,
  extractSlugs,
  nextIssueNumber,
  sentSlugs,
} from "../../scripts/newsletter/history";

const link = (slug: string, tail = "") =>
  `<a href="https://www.zenml.io/llmops-database/${slug}${tail}">x</a>`;
const c = (
  id: number,
  status: string,
  html: string,
  scheduledAt: string | null = null,
  name = `In Production #${id} — x`,
): CampaignSummary => ({ id, name, status, scheduledAt, htmlContent: html });

describe("extractSlugs", () => {
  it("handles query strings, trailing slashes, and duplicates", () => {
    const html =
      link("foo") +
      link("foo") +
      link("bar", "?utm_source=x") +
      link("baz", "/") +
      '<a href="https://www.zenml.io/llmops-database">index</a>';
    expect(extractSlugs(html)).toEqual(["foo", "bar", "baz"]);
  });
});

describe("history", () => {
  const campaigns = [
    c(1, "sent", link("a")),
    c(2, "queued", link("b"), "2026-10-06T07:00:00Z"),
    c(3, "suspended", link("c")),
    c(4, "draft", link("d")),
    c(9, "sent", link("z"), null, "Webinar promo"),
  ];
  it("counts sent and scheduled In Production campaigns only", () => {
    expect([...sentSlugs(campaigns)].sort()).toEqual(["a", "b"]);
  });
  it("numbers the next issue after the highest counted one", () => {
    expect(nextIssueNumber(campaigns)).toBe(3);
    expect(nextIssueNumber([])).toBe(1);
  });
  it("finds a campaign already scheduled for the slot", () => {
    expect(
      campaignForSlot(campaigns, new Date("2026-10-06T07:00:00Z"))?.id,
    ).toBe(2);
    expect(
      campaignForSlot(campaigns, new Date("2026-10-08T07:00:00Z")),
    ).toBeUndefined();
  });
});

describe("campaignForSlot name match", () => {
  const slot = new Date("2026-10-06T07:00:00Z");
  it("detects a queued campaign by its issue-date name when scheduledAt is missing", () => {
    const cs = [c(6, "queued", "", null, "In Production #6 — Tue 6 Oct 2026")];
    expect(campaignForSlot(cs, slot)?.id).toBe(6);
  });
  it("ignores a queued campaign whose name has another date", () => {
    const cs = [c(6, "queued", "", null, "In Production #6 — Thu 8 Oct 2026")];
    expect(campaignForSlot(cs, slot)).toBeUndefined();
  });
});

describe("in_review campaigns", () => {
  const cs = [c(5, "in_review", link("r"), "2026-10-08T07:00:00Z")];
  it("counts as sent", () => {
    expect([...sentSlugs(cs)]).toEqual(["r"]);
    expect(nextIssueNumber(cs)).toBe(6);
  });
  it("occupies its slot", () => {
    expect(campaignForSlot(cs, new Date("2026-10-08T07:00:00Z"))?.id).toBe(5);
  });
});
