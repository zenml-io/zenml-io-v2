import { spawnSync } from "node:child_process";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { AGENT_TRANSCRIPT } from "../../src/components/kitaru/islands/AgentDriven";
import {
  PYTHON_SHOWCASE,
  TYPESCRIPT_SHOWCASE,
} from "../../src/components/kitaru/islands/CodeShowcase";
import type { CodeLine } from "../../src/components/kitaru/islands/code-tokens";
import { HERO_CODE_LINES } from "../../src/components/kitaru/islands/Hero";
import { FRAMEWORKS } from "../../src/components/kitaru/islands/OneImport";
import { KITARU_INSTALL_CMD, STEPS } from "../../src/lib/kitaru-landing";
import { GET as getKitaruMarkdown } from "../../src/pages/product/kitaru.md";

function renderTokens(tokens: CodeLine): string {
  return tokens
    .map((token) =>
      typeof token === "string" ? token : (Object.values(token)[0] ?? ""),
    )
    .join("");
}

function renderLines(lines: Array<{ tokens: CodeLine }>): string {
  return lines.map((line) => renderTokens(line.tokens)).join("\n");
}

function expectValidPython(source: string): void {
  for (const executable of ["python3", "python"]) {
    const result = spawnSync(
      executable,
      ["-c", "import ast, sys; ast.parse(sys.stdin.read())"],
      { encoding: "utf8", input: source },
    );
    if (
      (result.error as NodeJS.ErrnoException | undefined)?.code === "ENOENT"
    ) {
      continue;
    }
    expect(result.stderr).toBe("");
    expect(result.status).toBe(0);
    return;
  }
  throw new Error(
    "Python is required to validate the displayed Python snippet",
  );
}

function expectValidTypeScript(source: string): void {
  const diagnostics =
    ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
      reportDiagnostics: true,
    }).diagnostics ?? [];
  expect(
    diagnostics.map((diagnostic) =>
      ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
    ),
  ).toEqual([]);
}

describe("Kitaru product-page snippets", () => {
  it("installs the CLI and worker used by the page", () => {
    expect(KITARU_INSTALL_CMD).toBe(
      'uv add "kitaru[cli,worker]" kitaru-pydantic-ai',
    );
  });

  it("uses the same page-local install command in the markdown alternate", async () => {
    const markdown = await getKitaruMarkdown().text();
    expect(
      markdown.match(/uv add "kitaru\[cli,worker\]" kitaru-pydantic-ai/g),
    ).toHaveLength(2);
    expect(markdown).not.toContain("`uv add kitaru`");
  });

  it("renders the complete current CLI workflow", () => {
    const hero = HERO_CODE_LINES.map((line) => line.text).join("\n");
    const featureCommands = STEPS.map((step) => step.command).join("\n");

    expect(hero).toMatchInlineSnapshot(`
      "# 1 · wrap the agent you already have
      from kitaru_pydantic_ai import KitaruAgent
      agent = KitaruAgent(intake_agent, agent_id=AGENT_ID)

      # 2 · the runs it already made, imported
      kitaru session import ./traces.jsonl \\
        --importer kitaru/kitaru-jsonl@latest --agent intake-agent@latest --wait

      # 3 · get interviewed, in your coding agent
      walk me through 20 of these
      → cohort "dropped the hazmat flag" · 9
      → evaluator hazmat-flag-preserved

      # 4 · change the agent, compare the runs
      kitaru experiment run start fix-validation \\
        --cohort-version $COHORT_VERSION_ID --agent intake-agent@pr-311 --wait"
    `);
    expect(featureCommands).toMatchInlineSnapshot(`
      "COHORT_VERSION_ID=$(kitaru cohort create checkout-flow --agent checkout-agent --sessions-file session-ids.txt --output json --machine --non-interactive --no-browser | jq -r '.item.version.id')
      kitaru experiment create baseline --agent checkout-agent --tool-policy '{"default":{"type":"history","scope":"cohort_version","on_miss":"fail"}}' --evaluator response-quality@latest
      kitaru experiment create cheap-model --agent checkout-agent --override '{"model":"claude-haiku-4.5"}' --tool-policy '{"default":{"type":"history","scope":"cohort_version","on_miss":"fail"}}' --evaluator response-quality@latest
      kitaru experiment run start baseline --cohort-version "$COHORT_VERSION_ID" --agent checkout-agent@v1 --wait
      kitaru experiment run start cheap-model --cohort-version "$COHORT_VERSION_ID" --agent checkout-agent@v1 --wait"
    `);
  });

  it("renders the complete current adapter examples", () => {
    const samples = Object.fromEntries(
      FRAMEWORKS.map((framework) => {
        const before = framework.before.map(renderTokens).join("\n");
        const after = framework.after.map(renderTokens).join("\n");
        const expectValid = framework.file.endsWith(".py")
          ? expectValidPython
          : expectValidTypeScript;
        expectValid(before);
        expectValid(after);
        return [framework.id, { install: framework.install, before, after }];
      }),
    );

    expect(samples).toMatchInlineSnapshot(`
      {
        "langgraph": {
          "after": "from kitaru_langgraph import KitaruGraphRunner
      from langgraph.graph import END, START, StateGraph

      builder = StateGraph(SupportState)
      builder.add_node("normalize", normalize)
      builder.add_edge(START, "normalize")
      builder.add_edge("normalize", END)

      runner = KitaruGraphRunner(builder.compile(), agent_id=AGENT_ID)
      result = runner.invoke({"request": task})",
          "before": "from langgraph.graph import END, START, StateGraph

      builder = StateGraph(SupportState)
      builder.add_node("normalize", normalize)
      builder.add_edge(START, "normalize")
      builder.add_edge("normalize", END)

      graph = builder.compile()
      result = graph.invoke({"request": task})",
          "install": "uv add kitaru-langgraph",
        },
        "mastra": {
          "after": "import { Agent } from "@mastra/core/agent";
      import { KitaruAgent } from "@zenml-io/kitaru-mastra";

      const agent = new KitaruAgent(new Agent({
        id: "support-agent",
        name: "Support agent",
        instructions: "Answer support requests.",
        model: "openai/gpt-5-mini",
        tools,
      }), { agentId: AGENT_ID });

      const result = await agent.generate(messages);",
          "before": "import { Agent } from "@mastra/core/agent";

      const agent = new Agent({
        id: "support-agent",
        name: "Support agent",
        instructions: "Answer support requests.",
        model: "openai/gpt-5-mini",
        tools,
      });

      const result = await agent.generate(messages);",
          "install": "pnpm add @zenml-io/kitaru-mastra @mastra/core@1.51.0",
        },
        "openai": {
          "after": "from agents import Agent
      from kitaru_openai_agents import KitaruRunner

      agent = Agent(
          name="Compliance Reviewer",
          instructions="Answer briefly and accurately.",
          model="gpt-5-mini",
      )
      runner = KitaruRunner(agent_id=AGENT_ID)

      result = await runner.run(agent, task)",
          "before": "from agents import Agent, Runner

      agent = Agent(
          name="Compliance Reviewer",
          instructions="Answer briefly and accurately.",
          model="gpt-5-mini",
      )

      result = await Runner.run(agent, task)",
          "install": "uv add kitaru-openai-agents",
        },
        "pydanticai": {
          "after": "from kitaru_pydantic_ai import KitaruAgent
      from pydantic_ai import Agent

      agent = KitaruAgent(Agent(
          "openai:gpt-5-mini",
          system_prompt="You are a compliance reviewer.",
          tools=[search_docs, fetch_policy],
      ), agent_id=AGENT_ID)

      result = await agent.run(task)",
          "before": "from pydantic_ai import Agent

      agent = Agent(
          "openai:gpt-5-mini",
          system_prompt="You are a compliance reviewer.",
          tools=[search_docs, fetch_policy],
      )

      result = await agent.run(task)",
          "install": "uv add "kitaru-pydantic-ai[openai]"",
        },
        "vercel": {
          "after": "import { openai } from "@ai-sdk/openai";
      import { createKitaruGenerateText } from "@zenml-io/kitaru-vercel-ai";

      const generateText = createKitaruGenerateText({ agentId: AGENT_ID });

      const result = await generateText({
        model: openai("gpt-5-nano"),
        prompt: task,
      });

      console.log(result.text);",
          "before": "import { openai } from "@ai-sdk/openai";
      import { generateText } from "ai";

      const result = await generateText({
        model: openai("gpt-5-nano"),
        prompt: task,
      });

      console.log(result.text);",
          "install": "pnpm add @zenml-io/kitaru-vercel-ai ai@7.0.65 @ai-sdk/openai@4.0.20 zod@4.4.3",
        },
      }
    `);
  });

  it("renders the complete current Python and TypeScript workflows", () => {
    const python = renderLines(PYTHON_SHOWCASE);
    const typescript = renderLines(TYPESCRIPT_SHOWCASE);

    expectValidPython(python);
    expectValidTypeScript(typescript);
    expect(python).toMatchInlineSnapshot(`
      "import asyncio
      from kitaru.api_models.v1.experiment import ExperimentCreateRequest
      from kitaru.api_models.v1.experiment_run import ExperimentRunCreateRequest, ExperimentRunStatus
      from kitaru.api_models.v1.replay_config import EvaluatorConfig, HistoryConfig, ReplayOverride, ToolPolicy
      from kitaru.client import KitaruAPIClient

      TERMINAL = {ExperimentRunStatus.COMPLETED, ExperimentRunStatus.FAILED,
          ExperimentRunStatus.CANCELED}
      async def wait_for_run(client, run_id):
          while True:
              run = await client.experiment_runs.get(run_id)
              if run.status in TERMINAL:
                  return run
              await asyncio.sleep(1)

      policy = ToolPolicy(default=HistoryConfig(
          scope="cohort_version", on_miss="fail"))
      evaluator = EvaluatorConfig(evaluator="response-quality", version=1)

      async def main():
          async with KitaruAPIClient() as client:
              baseline = await client.experiments.create(
                  ExperimentCreateRequest(name="baseline", agent_id=AGENT_ID,
                      tool_policy=policy, evaluators=[evaluator]))
              candidate = await client.experiments.create(
                  ExperimentCreateRequest(name="cheap-model", agent_id=AGENT_ID,
                      override=ReplayOverride(model="claude-haiku-4.5"),
                      tool_policy=policy, evaluators=[evaluator]))

              run_spec = ExperimentRunCreateRequest(
                  cohort_version_id=COHORT_VERSION_ID, agent_version_id=AGENT_VERSION_ID,
                  evaluate_baselines=True)
              before, after = await asyncio.gather(
                  client.experiments.start_run(baseline.id, run_spec),
                  client.experiments.start_run(candidate.id, run_spec),
              )

              async with asyncio.timeout(300):
                  before, after = await asyncio.gather(
                      wait_for_run(client, before.id),
                      wait_for_run(client, after.id),
                  )

      asyncio.run(main())"
    `);
    expect(typescript).toMatchInlineSnapshot(`
      "import { createKitaruClient } from "@zenml-io/kitaru/node";
      const client = await createKitaruClient();

      const common = { agent_id: agentId,
        tool_policy: { default: { type: "history",
          scope: "cohort_version", on_miss: "fail" } },
        evaluators: [{ evaluator: "response-quality", version: 1 }],
      };

      const baseline = await client.experiments.create({
        name: "baseline", ...common });
      const candidate = await client.experiments.create({
        name: "cheap-model", ...common,
        override: { model: "claude-haiku-4.5" },
      });

      const runSpec = { cohort_version_id: cohortVersionId,
        agent_version_id: agentVersionId, evaluate_baselines: true };
      const [before, after] = await Promise.all([
        client.experiments.startRun(baseline.id, runSpec),
        client.experiments.startRun(candidate.id, runSpec),
      ]);

      const [beforeResult, afterResult] = await Promise.all([
        client.experimentRuns.wait(before.id),
        client.experimentRuns.wait(after.id),
      ]);"
    `);
    expect(python).not.toContain("kitaru.KitaruClient");
    expect(python).not.toContain("client.compare");
    expect(typescript).not.toContain("new KitaruClient()");
    expect(typescript).not.toContain("client.compare");
  });

  it("renders the complete exact-ID MCP transcript", () => {
    const transcript = AGENT_TRANSCRIPT.map((line) => line.text).join("\n");

    expect(transcript).toMatchInlineSnapshot(`
      "kitaru_workflow_start { "operation": "experiment_run",
      "experiment_id": "$EXPERIMENT_ID", "cohort_version_id": "$COHORT_VERSION_ID",
      "agent_version_id": "$V1_AGENT_VERSION_ID" }
      90 sessions · cited-superseded-doc true 90 · false 0
      kitaru_workflow_start { "operation": "experiment_run",
      "experiment_id": "$EXPERIMENT_ID", "cohort_version_id": "$COHORT_VERSION_ID",
      "agent_version_id": "$CANDIDATE_AGENT_VERSION_ID" }
      cited-superseded-doc true 4 · false 86
      4 still failing — opening these for you to read"
    `);
  });
});
