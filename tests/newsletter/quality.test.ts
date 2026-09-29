import { describe, expect, it } from "vitest";
import type { Entry } from "../../scripts/newsletter/entries";
import {
  decideBlurb,
  decideWorth,
  fallbackBlurb,
  type JevLike,
  judgeBlurb,
  normaliseScore,
} from "../../scripts/newsletter/quality";

const entry = (summary: string): Entry => ({
  slug: "x",
  title: "t",
  company: "c",
  industry: "i",
  summary,
  link: null,
  publishedAt: new Date(),
  sections: [
    { heading: "Overview", text: "O" },
    { heading: "Results", text: "R" },
  ],
});

describe("decideWorth", () => {
  it("keeps substantive entries and drops thin ones or vendor pitches", () => {
    expect(
      decideWorth("a", { production: 1, specificity: 0.66, vendorPitch: 0.1 })
        .keep,
    ).toBe(true);
    expect(
      decideWorth("b", {
        production: 0.33,
        specificity: 0.33,
        vendorPitch: 0.1,
      }).keep,
    ).toBe(false);
    expect(
      decideWorth("c", { production: 1, specificity: 1, vendorPitch: 0.9 })
        .keep,
    ).toBe(false);
  });
  it("normalises 0-indexed scores", () => expect(normaliseScore(3, 4)).toBe(1));
});

describe("decideBlurb", () => {
  const s = (relation: string, confidence: number) => ({
    text: "t",
    section: "Overview",
    relation,
    confidence,
    pass: relation === "supports" && confidence >= 0.8,
  });
  it("passes only when every sentence is supported with confidence and tone is plain", () => {
    expect(
      decideBlurb([s("supports", 0.95), s("supports", 0.9)], 0.1).pass,
    ).toBe(true);
    expect(
      decideBlurb([s("supports", 0.95), s("supports", 0.6)], 0.1).reasons,
    ).toEqual(["sentence 2: supports at confidence 0.60 (need 0.8)"]);
    expect(
      decideBlurb([s("contradicts", 0.95), s("supports", 0.9)], 0.1).pass,
    ).toBe(false);
    expect(
      decideBlurb([s("supports", 0.95), s("supports", 0.9)], 0.9).reasons,
    ).toEqual(["tone too promotional (0.90)"]);
  });
});

describe("judgeBlurb", () => {
  it("sends each sentence with only its own section", async () => {
    const states: unknown[] = [];
    const jev: JevLike = {
      async systemOne(req) {
        states.push(req.state);
        return {
          answers:
            "relation" in req.questions
              ? { relation: { choice: "supports", confidence: 0.9 } }
              : { tone: { score: 0 } },
        };
      },
    };
    const v = await judgeBlurb(jev, entry("s"), {
      hook: null,
      sentences: [
        { text: "A.", section: "Overview" },
        { text: "B.", section: "Results" },
      ],
    });
    expect(v.pass).toBe(true);
    expect(states).toContainEqual({ sentence: "B.", section: "R" });
  });
});

describe("fallbackBlurb", () => {
  it("returns the first sentence without cutting at abbreviations", () => {
    expect(
      fallbackBlurb(
        entry(
          "U.S. Bank uses LLMs to triage fraud alerts across 40 teams. It works.",
        ),
      ),
    ).toBe("U.S. Bank uses LLMs to triage fraud alerts across 40 teams.");
    expect(
      fallbackBlurb(
        entry(
          "Warp built a factory, e.g. for triage and QA across repos. More.",
        ),
      ),
    ).toBe("Warp built a factory, e.g. for triage and QA across repos.");
  });
});
