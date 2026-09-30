import { describe, expect, it } from "vitest";
import {
  answerImplied,
  classifyHeroJob,
  displayJob,
  fillTemplate,
  heroJobOutcome,
  heroJobSignupHref,
  impliedAnswer,
  joinNames,
  preferCases,
} from "../../src/lib/heroJobPlan";
import {
  buildHeroJobProof,
  buildHeroJobStack,
  HERO_JOB_PROOF_MATCHERS,
  type HeroJobProofEntry,
} from "../../src/lib/heroJobProof";
import {
  type HeroJobIntent,
  type HeroJobTool,
  LABS_HERO_JOB,
} from "../../src/lib/labs-home";

const INTENTS = Object.keys(LABS_HERO_JOB.flows) as HeroJobIntent[];

function tool(value: string): HeroJobTool {
  const found = LABS_HERO_JOB.stack.tools.find((t) => t.value === value);
  if (!found) throw new Error(`no tool ${value}`);
  return found;
}

describe("classifyHeroJob", () => {
  it("routes each example chip to its own conversation", () => {
    expect(LABS_HERO_JOB.examples.map((job) => classifyHeroJob(job))).toEqual([
      "agents",
      "ml",
      "reliability",
    ]);
  });

  it.each([
    ["Make our RAG assistant answer better", "agents"],
    ["Keep the churn classifier fresh", "ml"],
    ["Our Airflow DAGs keep breaking at night, broken again", "reliability"],
    ["Cut our GPU bill", "cost"],
    ["Keep an eye on things", "general"],
  ])("%s → %s", (job, intent) => {
    expect(classifyHeroJob(job)).toBe(intent);
  });

  it("matches case-insensitively at word starts only", () => {
    expect(classifyHeroJob("LLM evals")).toBe("agents");
    expect(classifyHeroJob("Failed runs")).toBe("reliability");
    // "rag" inside "storage" is not the RAG keyword.
    expect(classifyHeroJob("Tidy up storage")).toBe("general");
  });

  it("prefers agents, then ML, then reliability, then cost", () => {
    expect(classifyHeroJob("cheaper prompts")).toBe("agents");
    expect(classifyHeroJob("retrain when pipelines fail")).toBe("ml");
    expect(classifyHeroJob("fix failed jobs that cost too much")).toBe(
      "reliability",
    );
  });
});

describe("engineer bias", () => {
  const byName = (name: string) => {
    const engineer = LABS_HERO_JOB.composer.engineers.find(
      (e) => e.value === name,
    );
    if (!engineer) throw new Error(`no engineer ${name}`);
    return engineer;
  };

  it("offers Auto first, then one named engineer per matched intent", () => {
    const [auto, ...named] = LABS_HERO_JOB.composer.engineers;
    expect(auto.value).toBe("auto");
    expect(auto.intent).toBeUndefined();
    expect(named.map((e) => [e.value, e.intent])).toEqual([
      ["sage", "agents"],
      ["atlas", "reliability"],
      ["nova", "ml"],
      ["vega", "cost"],
    ]);
    for (const e of LABS_HERO_JOB.composer.engineers) {
      expect(e.value).toBe(e.name.toLowerCase());
      expect(`${e.name} ${e.line}`).not.toMatch(/\bbots?\b/i);
    }
  });

  it("gives a job with no keyword the engineer's intent", () => {
    expect(classifyHeroJob("Keep an eye on things", "reliability")).toBe(
      "reliability",
    );
    expect(
      classifyHeroJob("Keep an eye on things", byName("vega").intent),
    ).toBe("cost");
    expect(classifyHeroJob("Keep an eye on things")).toBe("general");
  });

  it("picks the engineer's intent among several matches", () => {
    // Matches ML and reliability; ML wins on its own, Atlas tips it.
    expect(classifyHeroJob("retrain when pipelines fail")).toBe("ml");
    expect(classifyHeroJob("retrain when pipelines fail", "reliability")).toBe(
      "reliability",
    );
  });

  it("leaves a clear job its own intent", () => {
    expect(classifyHeroJob("Cut our GPU bill", "agents")).toBe("cost");
  });
});

describe("conversation flows", () => {
  it.each(INTENTS)(
    "%s: use case first, at most three questions, every template filled",
    (intent) => {
      const flow = LABS_HERO_JOB.flows[intent];
      expect(flow.questions[0].id).toBe("use_case");
      expect(flow.questions.length).toBeLessThanOrEqual(3);
      // Every combination of first options, and all skipped, leaves no placeholder.
      const runs = [
        flow.questions.map(() => null),
        ...flow.questions[0].options.map((first) => [
          first,
          ...flow.questions.slice(1).map((q) => q.options[0]),
        ]),
        flow.questions.map((q) => q.options[q.options.length - 1]),
      ];
      for (const answers of runs) {
        const outcome = heroJobOutcome("a job", intent, answers, LABS_HERO_JOB);
        expect(outcome.needs).not.toMatch(/[{}]/);
        for (const line of [
          ...outcome.plan,
          ...outcome.week.map((d) => d.text),
        ]) {
          expect(line).not.toMatch(/[{}]/);
          expect(line.charAt(0)).toBe(line.charAt(0).toUpperCase());
        }
      }
    },
  );

  it("fills the plan from the answers", () => {
    const [useCase, model, focus] = LABS_HERO_JOB.flows.agents.questions;
    const outcome = heroJobOutcome(
      "Keep our support agent cheap",
      "agents",
      [useCase.options[0], model.options[1], focus.options[0]],
      LABS_HERO_JOB,
    );
    expect(outcome.plan[1]).toBe(
      "Test Claude Haiku 4.5 on your most expensive support conversations.",
    );
    expect(outcome.week.map((d) => d.day)).toEqual(["Mon", "Wed", "Fri"]);
    expect(outcome.needs).toBe("traces");
  });

  it("asks for what the conversation needs", () => {
    const needs = (job: string, intent: HeroJobIntent, answers = []) =>
      heroJobOutcome(job, intent, answers, LABS_HERO_JOB).needs;
    expect(needs("Fix failed pipelines", "reliability")).toBe("pipelines");
    expect(needs("Keep an eye on things", "general")).toBe("runs and traces");
    expect(
      heroJobOutcome(
        "x",
        "general",
        [LABS_HERO_JOB.flows.general.questions[0].options[1]],
        LABS_HERO_JOB,
      ).needs,
    ).toBe("runs");
    // A job naming agents and models asks for both.
    expect(needs("Pick the model for our agent", "agents")).toBe(
      "traces and runs",
    );
  });

  it("fills nested placeholders", () => {
    expect(fillTemplate("{a}!", { a: "hi {b}", b: "there" })).toBe("hi there!");
  });
});

describe("job formatting", () => {
  it("drops trailing punctuation when quoting the job back", () => {
    expect(displayJob("  Fix it now!  ")).toBe("Fix it now");
  });

  it("carries the job and answers to the signup url-encoded", () => {
    const flow = LABS_HERO_JOB.flows.ml;
    expect(
      heroJobSignupHref("https://cloud.zenml.io/signup", " Fix & ship "),
    ).toBe("https://cloud.zenml.io/signup?job=Fix%20%26%20ship");
    expect(
      heroJobSignupHref("https://cloud.zenml.io/signup", "Retrain", {
        flow,
        answers: [
          flow.questions[0].options[0],
          null,
          flow.questions[2].options[1],
        ],
      }),
    ).toBe(
      "https://cloud.zenml.io/signup?job=Retrain&answers=use_case%3Afraud%2Ctoday%3Amanual",
    );
  });

  it("carries a named engineer as engineer=, never Auto", () => {
    const [auto, sage] = LABS_HERO_JOB.composer.engineers;
    const base = "https://cloud.zenml.io/signup";
    expect(heroJobSignupHref(base, "Fix it", { engineer: sage })).toBe(
      `${base}?job=Fix%20it&engineer=sage`,
    );
    expect(heroJobSignupHref(base, "Fix it", { engineer: auto })).toBe(
      `${base}?job=Fix%20it`,
    );
  });

  it("carries the stack as stack=, values joined by commas", () => {
    const base = "https://cloud.zenml.io/signup";
    expect(
      heroJobSignupHref(base, "Fix it", {
        stack: [tool("langgraph"), tool("claude")],
      }),
    ).toBe(`${base}?job=Fix%20it&stack=langgraph,claude`);
    expect(heroJobSignupHref(base, "Fix it", { stack: [] })).toBe(
      `${base}?job=Fix%20it`,
    );
  });
});

describe("stack", () => {
  it("names every tool once, in a known group, without the word Bot", () => {
    const values = LABS_HERO_JOB.stack.tools.map((t) => t.value);
    expect(new Set(values).size).toBe(values.length);
    for (const t of LABS_HERO_JOB.stack.tools) {
      expect(Object.keys(LABS_HERO_JOB.stack.groups)).toContain(t.group);
      expect(t.value).toMatch(/^[a-z0-9-]+$/);
      expect(t.name).not.toMatch(/\bbots?\b/i);
    }
  });

  it("only implies answers that exist", () => {
    const questions = new Map(
      INTENTS.flatMap((i) =>
        LABS_HERO_JOB.flows[i].questions.map((q) => [q.id, q] as const),
      ),
    );
    for (const t of LABS_HERO_JOB.stack.tools) {
      for (const [id, value] of Object.entries(t.answers ?? {})) {
        expect(
          questions.get(id)?.options.map((o) => o.value),
          `${t.value} → ${id}`,
        ).toContain(value);
      }
    }
  });

  it("skips the question a picked tool answers", () => {
    const flow = LABS_HERO_JOB.flows.agents;
    const support = flow.questions[0].options[0];
    const { answers, implied } = answerImplied(
      flow,
      [support],
      [tool("claude")],
    );
    expect(implied).toEqual([1]);
    expect(answers[1]?.value).toBe("claude");
    // Nothing implied for the focus question, so it stops there.
    expect(answers).toHaveLength(2);
    expect(answerImplied(flow, [support], [tool("langgraph")]).implied).toEqual(
      [],
    );
  });

  it("puts the tool's name into an implied platform", () => {
    const platform = LABS_HERO_JOB.flows.reliability.questions[1];
    expect(impliedAnswer(platform, [tool("sagemaker")])?.vars?.where).toBe(
      "SageMaker",
    );
    expect(impliedAnswer(platform, [tool("mlflow")])).toBeNull();
  });

  it("weaves the stack into the plan and first week", () => {
    const agents = LABS_HERO_JOB.flows.agents;
    const stack = [tool("langgraph"), tool("claude")];
    const { answers } = answerImplied(
      agents,
      [agents.questions[0].options[0]],
      stack,
    );
    const outcome = heroJobOutcome(
      "Keep our support agent cheap",
      "agents",
      [...answers, agents.questions[2].options[0]],
      LABS_HERO_JOB,
      stack,
    );
    expect(outcome.week[0].text).toBe(
      "Read the last two weeks of support conversations in your LangGraph traces and sort them by cost and quality.",
    );
    expect(outcome.week[1].text).toBe(
      "Replay the most expensive ones on Claude Haiku 4.5 and score both.",
    );

    const ml = heroJobOutcome("Retrain", "ml", [], LABS_HERO_JOB, [
      tool("sagemaker"),
    ]);
    expect(ml.plan[0]).toBe(
      "Check inputs and predictions from SageMaker for drift as each new batch of data lands.",
    );
    // A tool outside the flow's stack groups changes nothing.
    expect(
      heroJobOutcome("Retrain", "ml", [], LABS_HERO_JOB, [tool("claude")])
        .plan[0],
    ).toBe(
      "Check inputs and predictions for drift as each new batch of data lands.",
    );
  });

  it("joins names", () => {
    expect(joinNames(["A"])).toBe("A");
    expect(joinNames(["A", "B"])).toBe("A and B");
    expect(joinNames(["A", "B", "C"])).toBe("A, B and C");
  });

  it("puts case studies that used the stack first", () => {
    const row = (company: string, tools?: string[]) => ({
      source: "llmops" as const,
      company,
      takeaway: "t",
      href: `/llmops-database/${company}`,
      ...(tools ? { tools } : {}),
    });
    const rows = [
      row("A"),
      row("B"),
      row("C", ["openai"]),
      row("D", ["langchain"]),
      row("E", ["langchain", "claude"]),
    ];
    expect(preferCases(rows, []).map((r) => r.company)).toEqual([
      "A",
      "B",
      "C",
    ]);
    expect(
      preferCases(rows, [tool("langchain"), tool("claude")]).map(
        (r) => r.company,
      ),
    ).toEqual(["E", "D", "A"]);
  });
});

describe("buildHeroJobProof", () => {
  const entry = (over: Partial<HeroJobProofEntry>): HeroJobProofEntry => ({
    source: "llmops",
    slug: "s",
    title: "Customer support agent in production",
    company: "Acme",
    summary: "Acme runs a support agent.",
    year: 2025,
    tags: ["customer-support"],
    ...over,
  });

  it("keys every matcher by a real use-case option", () => {
    const values = new Set(
      INTENTS.flatMap((i) =>
        LABS_HERO_JOB.flows[i].questions[0].options.map((o) => o.value),
      ),
    );
    for (const key of Object.keys(HERO_JOB_PROOF_MATCHERS)) {
      expect(values).toContain(key);
    }
  });

  it("picks matching entries newest first, one per company, links to the database", () => {
    const proof = buildHeroJobProof([
      entry({ slug: "old", company: "Old Co", year: 2021 }),
      entry({ slug: "new", company: "New Co", year: 2026 }),
      entry({ slug: "dupe", company: "New  co", year: 2024 }),
      entry({ slug: "no-company", company: undefined }),
      entry({
        slug: "other",
        title: "Invoice extraction",
        tags: ["document-processing"],
      }),
    ]);
    expect(proof.support.map((r) => r.href)).toEqual([
      "/llmops-database/new",
      "/llmops-database/old",
    ]);
    expect(proof.support[0].takeaway).toBe(
      "Customer support agent in production",
    );
  });

  it("leaves a use case out when nothing matches", () => {
    expect(buildHeroJobProof([entry({ tags: [] })]).support).toBeUndefined();
  });

  it("tags rows with the tools they used and keeps extra rows for new tools", () => {
    const tools = [tool("langchain"), tool("claude"), tool("openai")];
    const proof = buildHeroJobProof(
      [
        entry({ slug: "a", company: "A", year: 2026 }),
        entry({ slug: "b", company: "B", year: 2025 }),
        entry({
          slug: "c",
          company: "C",
          year: 2024,
          tags: ["customer-support", "openai"],
        }),
        entry({ slug: "d", company: "D", year: 2023 }),
        entry({
          slug: "e",
          company: "E",
          year: 2022,
          tags: ["customer-support", "langchain"],
        }),
        entry({
          slug: "f",
          company: "F",
          year: 2021,
          tags: ["customer-support", "openai"],
        }),
      ],
      tools,
    );
    expect(proof.support.map((r) => [r.company, r.tools])).toEqual([
      ["A", undefined],
      ["B", undefined],
      ["C", ["openai"]],
      // D adds no tool and F repeats OpenAI; E adds LangChain.
      ["E", ["langchain"]],
    ]);
  });
});

describe("buildHeroJobStack", () => {
  const entry = (tags: string[]): HeroJobProofEntry => ({
    source: "llmops",
    slug: "s",
    title: "t",
    tags,
  });

  it("ranks tagged tools by use, drops unused ones, keeps hand-written ones last", () => {
    const tools = [
      tool("openai"),
      tool("claude"),
      tool("cohere"),
      tool("gemini"),
      tool("kubernetes"),
    ];
    expect(
      buildHeroJobStack(
        [
          entry(["anthropic"]),
          entry(["anthropic", "openai"]),
          entry(["anthropic"]),
          entry(["kubernetes"]),
        ],
        tools,
      ),
    ).toEqual(["claude", "openai", "gemini", "kubernetes"]);
  });

  it("falls back to hand-written tools where the data has none", () => {
    expect(
      buildHeroJobStack([], [tool("langgraph"), tool("langchain")]),
    ).toEqual(["langgraph"]);
  });
});
