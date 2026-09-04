import { spawnSync } from "node:child_process";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import type { CodeLine } from "../../src/components/kitaru/islands/code-tokens";
import { HERO_CODE_LINES } from "../../src/components/kitaru/islands/Hero";
import {
  FRAMEWORKS,
  IMPORTERS,
} from "../../src/components/kitaru/islands/TwoDoors";
import { KITARU_INSTALL_CMD } from "../../src/lib/kitaru-landing";
import { GET as getKitaruMarkdown } from "../../src/pages/product/kitaru.md";

function renderTokens(tokens: CodeLine): string {
  return tokens
    .map((token) =>
      typeof token === "string" ? token : (Object.values(token)[0] ?? ""),
    )
    .join("");
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
  it("points at the one-line installer served by kitaru.ai", () => {
    expect(KITARU_INSTALL_CMD).toBe(
      "curl -fsSL https://kitaru.ai/install | bash",
    );
  });

  it("uses the same page-local install command in the markdown alternate", async () => {
    const markdown = await getKitaruMarkdown().text();
    expect(
      markdown.match(/curl -fsSL https:\/\/kitaru\.ai\/install \| bash/g),
    ).toHaveLength(2);
    expect(markdown).not.toContain("`uv add kitaru`");
    expect(markdown).toContain("Arize Phoenix");
    expect(markdown).toContain("does not connect to the Phoenix API");
  });

  it("renders the complete current CLI workflow", () => {
    const hero = HERO_CODE_LINES.map((line) => line.text).join("\n");

    expect(hero).toMatchInlineSnapshot(`
      "# 1 · wrap the agent you already have
      agent = KitaruAgent(intake_agent, agent_id=AGENT_ID)

      # 2 · the runs it already made, imported
      kitaru session import ./traces.jsonl

      # 3 · get interviewed, in your coding agent
      walk me through 20 of these
      → cohort "dropped the hazmat flag" · 9

      # 4 · change the agent, compare the runs
      kitaru experiment run start fix-validation
      v1 → 90 / 90 fail      pr-311 → 4 / 90 fail"
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
        "claude": {
          "after": "from claude_agent_sdk import ClaudeAgentOptions
      from kitaru_claude_agent_sdk import KitaruClaudeRunner

      runner = KitaruClaudeRunner(agent_id=AGENT_ID)

      async def run(task):
          stream = runner.query(
              prompt=task,
              options=ClaudeAgentOptions(model="claude-sonnet-4-5"),
          )
          async for message in stream:
              print(message)",
          "before": "from claude_agent_sdk import ClaudeAgentOptions, query

      async def run(task):
          stream = query(
              prompt=task,
              options=ClaudeAgentOptions(model="claude-sonnet-4-5"),
          )
          async for message in stream:
              print(message)",
          "install": "uv add kitaru-claude-agent-sdk",
        },
        "custom-adapter": {
          "after": "# no adapter for your framework? tell your coding agent:
      #   "Use kitaru-adapter-builder to wrap run_agent."
      # it writes one project-local adapter: record and replay,
      # in your repo, nothing to contribute upstream

      from kitaru_adapter import KitaruRunAgent
      from my_agent import run_agent

      result = KitaruRunAgent(run_agent, agent_id=AGENT_ID)(task)",
          "before": "from my_agent import run_agent

      result = run_agent(task)",
          "install": "npx skills add zenml-io/kitaru-skills",
        },
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
        "provider": {
          "after": "# any framework, already reporting to Langfuse
      # same for LangSmith, Braintrust, Logfire, Phoenix
      from kitaru_langfuse_importer.adapter import LangfuseAdapter
      from my_agent import run_agent

      adapter = LangfuseAdapter()
      result = adapter.run(run_agent, question)",
          "before": "# any framework, already reporting to Langfuse
      from my_agent import run_agent

      result = run_agent(question)",
          "install": "uv add "kitaru-langfuse-importer[adapter]"",
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

  it("renders the complete current importer commands", () => {
    const commands = Object.fromEntries(
      IMPORTERS.map((tab) => [tab.id, tab.lines.map(renderTokens).join("\n")]),
    );

    expect(commands).toMatchInlineSnapshot(`
      {
        "braintrust": "$ kitaru session import braintrust-export.jsonl \\
          --importer kitaru/braintrust@latest \\
          --agent support-agent@latest \\
          --tag imported-baseline \\
          --media-type application/x-ndjson \\
          --wait",
        "custom": "# one entrypoint function — about a page of Python

      $ kitaru importer scaffold my-format

      $ kitaru importer test my_format_importer.py \\
          --entrypoint parse \\
          --payload sample-export.jsonl

      $ kitaru importer register my-format \\
          --script my_format_importer.py \\
          --entrypoint parse \\
          --provider my-format",
        "kitaru-jsonl": "$ kitaru session import sessions.jsonl \\
          --importer kitaru/kitaru-jsonl@latest \\
          --agent support-agent@latest \\
          --tag imported-baseline \\
          --media-type application/x-ndjson \\
          --wait",
        "langfuse": "$ kitaru session import langfuse-export.jsonl \\
          --importer kitaru/langfuse@latest \\
          --agent support-agent@latest \\
          --tag imported-baseline \\
          --media-type application/x-ndjson \\
          --wait",
        "langsmith": "$ kitaru session import langsmith-export.jsonl \\
          --importer kitaru/langsmith@latest \\
          --agent support-agent@latest \\
          --tag imported-baseline \\
          --media-type application/x-ndjson \\
          --wait",
        "logfire": "$ kitaru session import logfire-export.ndjson \\
          --importer kitaru/logfire@latest \\
          --agent support-agent@latest \\
          --tag imported-baseline \\
          --media-type application/x-ndjson \\
          --wait",
        "phoenix": "$ kitaru session import phoenix-traces.jsonl \\
          --importer kitaru/phoenix@latest \\
          --agent support-agent@latest \\
          --tag imported-baseline \\
          --media-type application/x-ndjson \\
          --wait",
      }
    `);
    // The kitaru/opentelemetry importer was removed from the product in
    // Aug 2026 (kitaru repo, "Remove OpenTelemetry importer") while parts of
    // the docs still mention it — guard against it creeping back in here.
    expect(Object.values(commands).join("\n")).not.toContain("OpenTelemetry");
  });
});
