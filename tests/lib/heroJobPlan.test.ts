import { describe, expect, it } from "vitest";
import {
  HERO_JOB_ADVICE,
  HERO_JOB_FAILURES,
  type HeroJobFailure,
} from "../../src/lib/heroJobAdvice";
import {
  answerLabels,
  classifyHeroJobPath,
  heroJobAdvice,
  heroJobExample,
  heroJobFailures,
  heroJobSignupHref,
  holds,
  impliedAnswers,
  pickSimilar,
  REPORT_FAILURES,
  REPORT_SIMILAR,
  seenAt,
  serializeAnswers,
} from "../../src/lib/heroJobPlan";
import {
  buildHeroJobCasePool,
  HERO_JOB_ANSWER_MATCHERS,
  HERO_JOB_FAILURE_MATCHERS,
  type HeroJobProofEntry,
  ranIntoFrom,
} from "../../src/lib/heroJobProof";
import { LABS_HERO_JOB } from "../../src/lib/labs-home";

const content = LABS_HERO_JOB;
const agentQuestions = content.paths.agent.questions;
const finetuneQuestions = content.paths.finetune.questions;
const answerKeys = {
  agent: agentQuestions.flatMap((q) =>
    q.options.map((o) => `${q.id}:${o.value}`),
  ),
  finetune: finetuneQuestions.flatMap((q) =>
    q.options.map((o) => `${q.id}:${o.value}`),
  ),
};

function entry(overrides: Partial<HeroJobProofEntry>): HeroJobProofEntry {
  return {
    source: "llmops",
    slug: overrides.slug ?? "entry",
    title: "An LLM assistant in production",
    company: "Acme",
    summary: "Acme runs an LLM assistant for its customers.",
    year: 2024,
    tags: [],
    ...overrides,
  };
}

describe("hero eval plan content", () => {
  it("every answer option has a case matcher", () => {
    for (const key of [...answerKeys.agent, ...answerKeys.finetune])
      expect(HERO_JOB_ANSWER_MATCHERS[key], key).toBeDefined();
  });

  it("every failure mode has a case matcher and a unique id", () => {
    const ids = HERO_JOB_FAILURES.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids)
      expect(HERO_JOB_FAILURE_MATCHERS[id], id).toBeDefined();
  });

  it("conditions only name real questions and options", () => {
    const valid = new Set([...answerKeys.agent, ...answerKeys.finetune]);
    const conditions = [
      ...HERO_JOB_FAILURES.flatMap((f) => [
        f.when,
        ...(f.boosts ?? []).map((b) => b.when),
        ...(f.eval.examples ?? []).map((e) => e.when),
      ]),
      ...HERO_JOB_ADVICE.map((a) => a.when),
    ];
    for (const condition of conditions)
      for (const [id, values] of Object.entries(condition ?? {}))
        for (const value of values)
          expect(valid.has(`${id}:${value}`), `${id}:${value}`).toBe(true);
  });

  it("carries no figures: no digits in failure modes, evals or advice", () => {
    const strings = [
      ...HERO_JOB_FAILURES.flatMap((f) => [
        f.title,
        f.why,
        f.eval.name,
        f.eval.checks,
        f.eval.how,
        f.eval.example.input,
        f.eval.example.expect,
        ...(f.eval.examples ?? []).flatMap((e) => [e.input, e.expect]),
      ]),
      ...HERO_JOB_ADVICE.flatMap((a) => [a.title, a.body]),
    ];
    for (const s of strings) expect(s, s).not.toMatch(/\d|%/);
  });

  it("keeps the homepage copy free of competitor and 'autonomous' claims", () => {
    const copy = JSON.stringify(content);
    expect(copy).not.toMatch(/devin|autonomous/i);
  });
});

describe("classifyHeroJobPath", () => {
  it("routes fine-tuning descriptions to the fine-tune path", () => {
    expect(classifyHeroJobPath("We fine-tune Llama with LoRA", content)).toBe(
      "finetune",
    );
    expect(
      classifyHeroJobPath("Distilling GPT into a small model", content),
    ).toBe("finetune");
  });

  it("defaults everything else to the agent path", () => {
    expect(
      classifyHeroJobPath(
        "A support agent that answers from our docs",
        content,
      ),
    ).toBe("agent");
    expect(classifyHeroJobPath("what is the weather in berlin", content)).toBe(
      "agent",
    );
  });
});

describe("impliedAnswers", () => {
  it("answers questions a description settles", () => {
    expect(
      impliedAnswers("A voice agent that books appointments", agentQuestions),
    ).toMatchObject({ modality: "voice", interaction: "tools" });
  });

  it("leaves a question open when several options match", () => {
    // "chat" (text) and "call" (voice) both match modality.
    expect(
      impliedAnswers("chat and phone call assistant", agentQuestions).modality,
    ).toBeUndefined();
  });

  it("matches at word starts only", () => {
    // "storage" must not read as a tool-using agent via "rag"-style substrings.
    expect(impliedAnswers("storage", agentQuestions)).toEqual({});
  });
});

describe("holds", () => {
  it("needs every key to hold and treats a skipped question as unmet", () => {
    expect(holds(undefined, {})).toBe(true);
    expect(holds({ modality: ["text"] }, { modality: "text" })).toBe(true);
    expect(holds({ modality: ["text"] }, {})).toBe(false);
    expect(
      holds({ modality: ["text"], risk: ["facts"] }, { modality: "text" }),
    ).toBe(false);
  });
});

describe("heroJobFailures", () => {
  const ids = (failures: HeroJobFailure[]) => failures.map((f) => f.id);

  it("leads a tool-using agent that acts with trajectory and action evals", () => {
    const failures = heroJobFailures(
      "agent",
      {
        modality: "text",
        interaction: "tools",
        output: "actions",
        risk: "act",
      },
      HERO_JOB_FAILURES,
    );
    expect(ids(failures).slice(0, 2)).toEqual(
      expect.arrayContaining(["actions", "trajectory"]),
    );
    expect(failures.length).toBeLessThanOrEqual(REPORT_FAILURES);
    expect(failures.every((f) => f.path === "agent")).toBe(true);
  });

  it("puts groundedness first when wrong answers hurt most", () => {
    const failures = heroJobFailures(
      "agent",
      {
        modality: "documents",
        interaction: "single",
        output: "text",
        risk: "facts",
      },
      HERO_JOB_FAILURES,
    );
    expect(failures[0]?.id).toBe("ungrounded");
  });

  it("only includes voice transcription for voice systems", () => {
    expect(
      ids(heroJobFailures("agent", { modality: "voice" }, HERO_JOB_FAILURES)),
    ).toContain("asr");
    expect(
      ids(heroJobFailures("agent", { modality: "text" }, HERO_JOB_FAILURES)),
    ).not.toContain("asr");
  });

  it("always tells a fine-tune to beat the base model", () => {
    for (const goal of ["cost", "quality", "format", "private"]) {
      const failures = heroJobFailures("finetune", { goal }, HERO_JOB_FAILURES);
      expect(ids(failures)).toContain("baseline");
      expect(failures.every((f) => f.path === "finetune")).toBe(true);
    }
  });

  it("flags teacher mistakes for synthetic data and reward gaming for preference tuning", () => {
    expect(
      ids(
        heroJobFailures("finetune", { data: "synthetic" }, HERO_JOB_FAILURES),
      ),
    ).toContain("teacher");
    expect(
      ids(heroJobFailures("finetune", { training: "pref" }, HERO_JOB_FAILURES)),
    ).toContain("reward");
  });

  it("still composes a full report with every question skipped", () => {
    expect(heroJobFailures("agent", {}, HERO_JOB_FAILURES)).toHaveLength(
      REPORT_FAILURES,
    );
    expect(heroJobFailures("finetune", {}, HERO_JOB_FAILURES)).toHaveLength(
      REPORT_FAILURES,
    );
  });
});

describe("heroJobExample and heroJobAdvice", () => {
  it("picks the example closest to the answers, else the default", () => {
    const withExamples = HERO_JOB_FAILURES.find((f) => f.eval.examples?.length);
    expect(withExamples).toBeDefined();
    if (!withExamples?.eval.examples?.[0]) return;
    const first = withExamples.eval.examples[0];
    const answers = Object.fromEntries(
      Object.entries(first.when).map(([id, values]) => [id, values[0] ?? ""]),
    );
    expect(heroJobExample(withExamples, answers)).toEqual({
      input: first.input,
      expect: first.expect,
    });
    expect(heroJobExample(withExamples, {})).toEqual(withExamples.eval.example);
  });

  it("gives path-specific advice and adds conditional advice only when it applies", () => {
    const tools = heroJobAdvice(
      "agent",
      { interaction: "tools" },
      HERO_JOB_ADVICE,
    );
    const single = heroJobAdvice(
      "agent",
      { interaction: "single" },
      HERO_JOB_ADVICE,
    );
    expect(tools.map((a) => a.title)).toContain(
      "Grade the path, not just the answer",
    );
    expect(single.map((a) => a.title)).not.toContain(
      "Grade the path, not just the answer",
    );
    expect(
      heroJobAdvice("finetune", {}, HERO_JOB_ADVICE).every(
        (a) => a.path === "finetune",
      ),
    ).toBe(true);
  });
});

describe("ranIntoFrom", () => {
  it("quotes the first challenge sentence without figures", () => {
    expect(
      ranIntoFrom(
        "Acme built a bot. They faced a 40% error rate at launch. The team struggled with hallucinated refund policies. It worked.",
      ),
    ).toBe("The team struggled with hallucinated refund policies.");
    expect(ranIntoFrom("Acme built a bot. It works well.")).toBeUndefined();
    expect(
      ranIntoFrom("This case study explores the challenges of chatbots."),
    ).toBeUndefined();
  });
});

describe("buildHeroJobCasePool and pickSimilar", () => {
  const entries: HeroJobProofEntry[] = [
    entry({
      slug: "voice-bot",
      company: "CallCo",
      title: "Voice agent for call center automation",
      summary:
        "CallCo built a voice agent with tool calling. They faced problems with speech recognition on names.",
      tags: ["agent-based", "speech-recognition"],
    }),
    entry({
      slug: "docs-rag",
      company: "DocsInc",
      title: "RAG assistant over contracts",
      summary:
        "DocsInc answers questions over legal documents with an LLM assistant.",
      tags: ["rag", "document-processing"],
    }),
    entry({
      slug: "docs-rag-2",
      company: "DocsInc",
      title: "Second RAG assistant over invoices",
      summary: "DocsInc extracts invoices with an LLM assistant.",
      tags: ["rag"],
    }),
    entry({
      slug: "anon",
      company: "Various",
      title: "Panel on LLM agents",
      summary: "Several companies discuss LLM agents.",
    }),
    entry({
      slug: "empty",
      company: "Blank",
      title: "LLM chatbot",
      summary: "Unfortunately the source had no content.",
    }),
    entry({
      slug: "lora",
      source: "mlops",
      company: "TuneCo",
      title: "Fine-tuning Llama with LoRA for support",
      summary:
        "TuneCo fine-tuned an open-weight model with LoRA adapters and compared it against the base model.",
      tags: ["training"],
    }),
    entry({
      slug: "competitor",
      company: "Devin",
      title: "An AI software engineer agent",
      summary: "A coding agent with tool calling.",
      tags: ["agent-based"],
    }),
    entry({
      slug: "mention",
      source: "mlops",
      company: "MentionCo",
      title: "Recommendation platform",
      summary: "MentionCo might fine-tune a model one day.",
    }),
    entry({
      slug: "forecast",
      source: "mlops",
      company: "ForecastCo",
      title: "Demand forecasting platform",
      summary: "ForecastCo retrains gradient-boosted models nightly.",
      tags: ["training"],
    }),
  ];
  const pool = buildHeroJobCasePool(entries, answerKeys, HERO_JOB_FAILURES);

  it("links only real entries and drops anonymous or empty ones", () => {
    const hrefs = pool.cases.map((c) => c.href);
    expect(hrefs).toContain("/llmops-database/voice-bot");
    expect(hrefs).toContain("/mlops-database/lora");
    expect(hrefs).not.toContain("/llmops-database/anon");
    expect(hrefs).not.toContain("/llmops-database/empty");
    expect(hrefs).not.toContain("/mlops-database/forecast");
    expect(hrefs).not.toContain("/llmops-database/competitor");
    expect(hrefs).not.toContain("/mlops-database/mention");
    for (const c of pool.cases)
      expect(
        entries.some((e) => `/${e.source}-database/${e.slug}` === c.href),
      ).toBe(true);
  });

  it("ranks the case that matches the answers first", () => {
    const voice = pickSimilar(
      pool,
      "agent",
      { modality: "voice" },
      agentQuestions,
    );
    expect(voice[0]?.company).toBe("CallCo");
    const docs = pickSimilar(
      pool,
      "agent",
      { modality: "documents" },
      agentQuestions,
    );
    expect(docs[0]?.company).toBe("DocsInc");
  });

  it("shows one case per company, at most REPORT_SIMILAR", () => {
    const similar = pickSimilar(pool, "agent", {}, agentQuestions);
    const companies = similar.map((c) => c.company);
    expect(new Set(companies).size).toBe(companies.length);
    expect(similar.length).toBeLessThanOrEqual(REPORT_SIMILAR);
  });

  it("keeps fine-tune cases to entries about fine-tuning", () => {
    const similar = pickSimilar(
      pool,
      "finetune",
      { training: "lora" },
      finetuneQuestions,
    );
    expect(similar.map((c) => c.company)).toEqual(["TuneCo"]);
  });

  it("cites where a failure mode was seen from the entry text", () => {
    expect(seenAt(pool, "asr").map((c) => c.company)).toEqual(["CallCo"]);
    expect(seenAt(pool, "not-a-failure")).toEqual([]);
  });

  it("quotes what a team ran into from its own summary", () => {
    const voice = pool.cases.find((c) => c.company === "CallCo");
    expect(voice?.ranInto).toBe(
      "They faced problems with speech recognition on names.",
    );
  });
});

describe("heroJobSignupHref and answers", () => {
  it("carries the path, answers in question order and the description", () => {
    expect(
      heroJobSignupHref("https://cloud.zenml.io/signup", "agent", {
        questions: agentQuestions,
        answers: { risk: "facts", modality: "text" },
        job: " A support bot ",
      }),
    ).toBe(
      "https://cloud.zenml.io/signup?path=agent&answers=modality%3Atext%2Crisk%3Afacts&job=A%20support%20bot",
    );
  });

  it("appends to a base that already has a query", () => {
    expect(
      heroJobSignupHref("https://x.test/signup?ref=hero", "finetune", {
        questions: finetuneQuestions,
      }),
    ).toBe("https://x.test/signup?ref=hero&path=finetune");
  });

  it("serializes and labels only the answered questions", () => {
    const answers = { goal: "cost", training: "lora" };
    expect(serializeAnswers(finetuneQuestions, answers)).toBe(
      "goal:cost,training:lora",
    );
    expect(answerLabels(finetuneQuestions, answers)).toEqual([
      "Cheaper or faster than a big model",
      "LoRA or adapters",
    ]);
  });
});
