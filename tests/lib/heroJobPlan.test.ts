import { describe, expect, it } from "vitest";
import {
  classifyHeroJob,
  displayJob,
  fillTemplate,
  heroJobOutcome,
  heroJobSignupHref,
} from "../../src/lib/heroJobPlan";
import {
  buildHeroJobProof,
  HERO_JOB_PROOF_MATCHERS,
  type HeroJobProofEntry,
} from "../../src/lib/heroJobProof";
import { type HeroJobIntent, LABS_HERO_JOB } from "../../src/lib/labs-home";

const INTENTS = Object.keys(LABS_HERO_JOB.flows) as HeroJobIntent[];

describe("classifyHeroJob", () => {
  it("routes each example chip to its own conversation", () => {
    expect(LABS_HERO_JOB.examples.map(classifyHeroJob)).toEqual([
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
        const outcome = heroJobOutcome(
          "a job",
          intent,
          answers,
          LABS_HERO_JOB,
          "Acme",
        );
        expect(outcome.needs).not.toMatch(/[{}]/);
        for (const line of [
          ...outcome.plan,
          ...outcome.week.map((d) => d.text),
        ]) {
          expect(line).not.toMatch(/[{}]/);
          expect(line.charAt(0)).toBe(line.charAt(0).toUpperCase());
        }
        expect(outcome.plan[flow.peerStep]).toMatch(/^Like Acme, /);
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
      "Test Claude Haiku on your most expensive support conversations.",
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
      heroJobSignupHref("https://cloud.zenml.io/signup", "Retrain", flow, [
        flow.questions[0].options[0],
        null,
        flow.questions[2].options[1],
      ]),
    ).toBe(
      "https://cloud.zenml.io/signup?job=Retrain&answers=use_case%3Afraud%2Ctoday%3Amanual",
    );
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
});
