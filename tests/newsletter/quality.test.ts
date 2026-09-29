import { describe, expect, it } from "vitest";
import type { Entry } from "../../scripts/newsletter/entries";
import {
  decideBlurb,
  decideWorth,
  fallbackBlurb,
  type JevLike,
  judgeBlurb,
  judgeWorth,
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
  it("keeps substantive entries and drops thin ones", () => {
    expect(decideWorth("a", { production: 1, specificity: 0.66 }).keep).toBe(
      true,
    );
    expect(decideWorth("b", { production: 0.33, specificity: 0.33 }).keep).toBe(
      false,
    );
  });
  it("keeps an entry with high production and specificity", () => {
    const v = decideWorth("c", { production: 1, specificity: 1 });
    expect(v.keep).toBe(true);
    expect(v.worth).toBe(1);
  });
  it("asks Jev only the production and specificity questions", async () => {
    const asked: string[][] = [];
    const jev: JevLike = {
      async systemOne(req) {
        asked.push(Object.keys(req.questions));
        return {
          answers: { production: { score: 3 }, specificity: { score: 3 } },
        };
      },
    };
    const v = await judgeWorth(jev, entry("s"));
    expect(asked).toEqual([["production", "specificity"]]);
    expect(v.keep).toBe(true);
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
