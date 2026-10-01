import type OpenAI from "openai";
import { describe, expect, it } from "vitest";
import { type Entry, loadEntries } from "../../scripts/newsletter/entries";
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
  year: null,
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

describe("buildWriterPrompt example", () => {
  it("names no real company and reuses no figure from a real summary", () => {
    const real = loadEntries();
    const companies = [
      ...new Set(
        real
          .map((e) => e.company)
          .filter((c): c is string => !!c && c.length > 3),
      ),
    ];
    const figures = new Set(
      real.flatMap((e) => e.summary.match(/\d+(?:\.\d+)?%/g) ?? []),
    );
    for (const withHook of [true, false]) {
      const { system } = buildWriterPrompt(entry, { withHook });
      expect(system).toContain("Illustrative only");
      const example = system.slice(system.indexOf("Illustrative only"));
      for (const c of companies) expect(example).not.toContain(c);
      for (const f of figures) expect(example).not.toContain(f);
    }
  });
});

describe("writtenProblems", () => {
  it("accepts a well-formed blurb", () =>
    expect(writtenProblems(entry, ok)).toEqual([]));
  it("allows 55 words but rejects 56", () => {
    const sentences = [
      {
        text: "The reviewer checks each rule against a separate copy of the contract, giving workers room to propose edits without overwriting changes another worker is preparing.",
        section: "Overview",
      },
      {
        text: "A lead agent then merges changes that fit together and resolves conflicts where two rules affect the same sentence, before checking the full review and returning it to a lawyer.",
        section: "Overview",
      },
    ];
    expect(writtenProblems(entry, { sentences, hook: null })).toEqual([]);
    expect(
      writtenProblems(entry, {
        sentences: [
          sentences[0],
          { ...sentences[1], text: `${sentences[1].text} Finally.` },
        ],
        hook: null,
      }),
    ).toContain("blurb is 56 words; limit is 55");
  });
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
        writerFor(async () => ({ output_text })).write(entry, {
          withHook: false,
        }),
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
