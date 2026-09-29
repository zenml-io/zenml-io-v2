import type OpenAI from "openai";
import { describe, expect, it } from "vitest";
import type { Entry } from "../../scripts/newsletter/entries";
import {
  blurbText,
  buildWriterPrompt,
  createOpenAIWriter,
  WriterOutputError,
  writtenProblems,
} from "../../scripts/newsletter/write";

const entry: Entry = {
  slug: "h",
  title: "Review",
  company: "Harvey",
  industry: "Legal",
  summary: "s",
  link: null,
  publishedAt: new Date(),
  sections: [
    { heading: "Overview", text: "Harvey built X." },
    { heading: "Results and tradeoffs", text: "53% to 87%." },
  ],
};
const ok = {
  sentences: [
    { text: "Harvey built a multi-agent reviewer.", section: "Overview" },
    {
      text: "Redline quality rose from 53% to 87% on its internal benchmark.",
      section: "Results and tradeoffs",
    },
  ],
  hook: null,
};

describe("buildWriterPrompt", () => {
  it("lists the section headings and the rules, and passes feedback through", () => {
    const { system, user } = buildWriterPrompt(entry, {
      withHook: true,
      feedback: "Sentence 2 not supported",
    });
    expect(user).toContain("## Results and tradeoffs");
    expect(system).toMatch(/copy figures exactly/i);
    expect(system).toMatch(/hook/i);
    expect(user).toContain("Sentence 2 not supported");
  });
});

describe("writtenProblems", () => {
  it("accepts a well-formed blurb", () =>
    expect(writtenProblems(entry, ok)).toEqual([]));
  it("rejects unknown sections, wrong sentence counts, and long blurbs", () => {
    expect(
      writtenProblems(entry, {
        ...ok,
        sentences: [
          ok.sentences[0],
          { ...ok.sentences[1], section: "Results" },
        ],
      }),
    ).toEqual(['sentence 2 cites unknown section "Results"']);
    expect(
      writtenProblems(entry, { ...ok, sentences: [ok.sentences[0]] }),
    ).toContain("expected 2 sentences, got 1");
    expect(
      writtenProblems(entry, {
        ...ok,
        sentences: [
          ok.sentences[0],
          { text: "word ".repeat(60), section: "Overview" },
        ],
      }),
    ).toContain("blurb is 65 words; limit is 55");
  });
  it("joins sentences into the blurb", () =>
    expect(blurbText(ok)).toBe(
      `${ok.sentences[0].text} ${ok.sentences[1].text}`,
    ));
});

describe("createOpenAIWriter", () => {
  const writerFor = (create: () => Promise<unknown>) =>
    createOpenAIWriter({ responses: { create } } as unknown as OpenAI);
  it("marks empty or non-JSON output as a WriterOutputError", async () => {
    for (const output_text of ["", "not json"])
      await expect(
        writerFor(async () => ({ output_text })).write(entry, { withHook: false }),
      ).rejects.toBeInstanceOf(WriterOutputError);
  });
  it("lets API errors through unwrapped", async () => {
    const apiError = new Error("429 rate limited");
    const err = await writerFor(async () => {
      throw apiError;
    })
      .write(entry, { withHook: false })
      .catch((e: unknown) => e);
    expect(err).toBe(apiError);
    expect(err).not.toBeInstanceOf(WriterOutputError);
  });
});
