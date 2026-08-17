// OneImport — keep the inner harness, add the outer runtime. Tabbed
// before/after code comparison per agent SDK. Framework tab state is local;
// the before/after code samples are inline here, tokenized to keep the
// site's existing `.code-syntax` highlighting.
//
// The tab set mirrors the shipped adapters on kitaru `develop`
// (docs/book/adapters): Python — PydanticAI (`kitaru_pydantic_ai`),
// OpenAI Agents SDK (`kitaru_openai_agents`), LangGraph
// (`kitaru_langgraph`); TypeScript — Mastra (`@zenml-io/kitaru-mastra`),
// Vercel AI SDK (`@zenml-io/kitaru-vercel-ai`). Import paths and entry
// points here must match those docs — don't invent adapter APIs.
import { useState } from "preact/hooks";
import { cn } from "../../../lib/utils";
import {
  LangChainIcon,
  MastraIcon,
  OpenAIIcon,
  PydanticIcon,
  VercelIcon,
} from "./brand-icons";
import { type CodeLine, renderCodeLines } from "./code-tokens";
import { ArrowRight } from "./icons";
import { CodeBlock, Eyebrow, Lede, Section, SectionTitle } from "./primitives";
import { Reveal } from "./Reveal";

type Framework = {
  id: string;
  Icon: typeof PydanticIcon;
  label: string;
  /** Filename shown in the code block chrome — carries the language. */
  file: string;
  install: string;
  before: CodeLine[];
  after: CodeLine[];
};

export const FRAMEWORKS: Framework[] = [
  {
    id: "pydanticai",
    Icon: PydanticIcon,
    label: "PydanticAI",
    file: "agent.py",
    install: 'uv add "kitaru-pydantic-ai[openai]"',
    before: [
      [{ kw: "from" }, " pydantic_ai ", { kw: "import" }, " Agent"],
      [],
      ["agent ", { op: "=" }, " ", { fn: "Agent" }, "("],
      ["    ", { str: '"openai:gpt-5-mini"' }, ","],
      [
        "    system_prompt",
        { op: "=" },
        { str: '"You are a compliance reviewer."' },
        ",",
      ],
      ["    tools", { op: "=" }, "[search_docs, fetch_policy],"],
      [")"],
      [],
      [
        "result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " agent.",
        { fn: "run" },
        "(task)",
      ],
    ],
    after: [
      [
        { kw: "from" },
        " kitaru_pydantic_ai ",
        { kw: "import" },
        " KitaruAgent",
      ],
      [{ kw: "from" }, " pydantic_ai ", { kw: "import" }, " Agent"],
      [],
      [
        "agent ",
        { op: "=" },
        " ",
        { fn: "KitaruAgent" },
        "(",
        { fn: "Agent" },
        "(",
      ],
      ["    ", { str: '"openai:gpt-5-mini"' }, ","],
      [
        "    system_prompt",
        { op: "=" },
        { str: '"You are a compliance reviewer."' },
        ",",
      ],
      ["    tools", { op: "=" }, "[search_docs, fetch_policy],"],
      ["), agent_id", { op: "=" }, "AGENT_ID)"],
      [],
      [
        "result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " agent.",
        { fn: "run" },
        "(task)",
      ],
    ],
  },
  {
    id: "openai",
    Icon: OpenAIIcon,
    label: "OpenAI Agents SDK",
    file: "agent.py",
    install: "uv add kitaru-openai-agents",
    before: [
      [{ kw: "from" }, " agents ", { kw: "import" }, " Agent, Runner"],
      [],
      ["agent ", { op: "=" }, " ", { fn: "Agent" }, "("],
      ["    name", { op: "=" }, { str: '"Compliance Reviewer"' }, ","],
      [
        "    instructions",
        { op: "=" },
        { str: '"Answer briefly and accurately."' },
        ",",
      ],
      ["    model", { op: "=" }, { str: '"gpt-5-mini"' }, ","],
      [")"],
      [],
      [
        "result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " Runner.",
        { fn: "run" },
        "(agent, task)",
      ],
    ],
    after: [
      [{ kw: "from" }, " agents ", { kw: "import" }, " Agent"],
      [
        { kw: "from" },
        " kitaru_openai_agents ",
        { kw: "import" },
        " KitaruRunner",
      ],
      [],
      ["agent ", { op: "=" }, " ", { fn: "Agent" }, "("],
      ["    name", { op: "=" }, { str: '"Compliance Reviewer"' }, ","],
      [
        "    instructions",
        { op: "=" },
        { str: '"Answer briefly and accurately."' },
        ",",
      ],
      ["    model", { op: "=" }, { str: '"gpt-5-mini"' }, ","],
      [")"],
      [
        "runner ",
        { op: "=" },
        " ",
        { fn: "KitaruRunner" },
        "(agent_id",
        { op: "=" },
        "AGENT_ID)",
      ],
      [],
      [
        "result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " runner.",
        { fn: "run" },
        "(agent, task)",
      ],
    ],
  },
  {
    id: "langgraph",
    Icon: LangChainIcon,
    label: "LangGraph",
    file: "agent.py",
    install: "uv add kitaru-langgraph",
    before: [
      [
        { kw: "from" },
        " langgraph.graph ",
        { kw: "import" },
        " END, START, StateGraph",
      ],
      [],
      ["builder ", { op: "=" }, " ", { fn: "StateGraph" }, "(SupportState)"],
      [
        "builder.",
        { fn: "add_node" },
        "(",
        { str: '"normalize"' },
        ", normalize)",
      ],
      ["builder.", { fn: "add_edge" }, "(START, ", { str: '"normalize"' }, ")"],
      ["builder.", { fn: "add_edge" }, "(", { str: '"normalize"' }, ", END)"],
      [],
      ["graph ", { op: "=" }, " builder.", { fn: "compile" }, "()"],
      [
        "result ",
        { op: "=" },
        " graph.",
        { fn: "invoke" },
        "({",
        { str: '"request"' },
        ": task})",
      ],
    ],
    after: [
      [
        { kw: "from" },
        " kitaru_langgraph ",
        { kw: "import" },
        " KitaruGraphRunner",
      ],
      [
        { kw: "from" },
        " langgraph.graph ",
        { kw: "import" },
        " END, START, StateGraph",
      ],
      [],
      ["builder ", { op: "=" }, " ", { fn: "StateGraph" }, "(SupportState)"],
      [
        "builder.",
        { fn: "add_node" },
        "(",
        { str: '"normalize"' },
        ", normalize)",
      ],
      ["builder.", { fn: "add_edge" }, "(START, ", { str: '"normalize"' }, ")"],
      ["builder.", { fn: "add_edge" }, "(", { str: '"normalize"' }, ", END)"],
      [],
      [
        "runner ",
        { op: "=" },
        " ",
        { fn: "KitaruGraphRunner" },
        "(builder.",
        { fn: "compile" },
        "(), agent_id",
        { op: "=" },
        "AGENT_ID)",
      ],
      [
        "result ",
        { op: "=" },
        " runner.",
        { fn: "invoke" },
        "({",
        { str: '"request"' },
        ": task})",
      ],
    ],
  },
  {
    id: "mastra",
    Icon: MastraIcon,
    label: "Mastra",
    file: "agent.ts",
    install: "pnpm add @zenml-io/kitaru-mastra @mastra/core@1.51.0",
    before: [
      [
        { kw: "import" },
        " { Agent } ",
        { kw: "from" },
        " ",
        { str: '"@mastra/core/agent"' },
        ";",
      ],
      [],
      [
        { kw: "const" },
        " agent ",
        { op: "=" },
        " ",
        { kw: "new" },
        " ",
        { fn: "Agent" },
        "({",
      ],
      ["  id: ", { str: '"support-agent"' }, ","],
      ["  name: ", { str: '"Support agent"' }, ","],
      ["  instructions: ", { str: '"Answer support requests."' }, ","],
      ["  model: ", { str: '"openai/gpt-5-mini"' }, ","],
      ["  tools,"],
      ["});"],
      [],
      [
        { kw: "const" },
        " result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " agent.",
        { fn: "generate" },
        "(messages);",
      ],
    ],
    after: [
      [
        { kw: "import" },
        " { Agent } ",
        { kw: "from" },
        " ",
        { str: '"@mastra/core/agent"' },
        ";",
      ],
      [
        { kw: "import" },
        " { KitaruAgent } ",
        { kw: "from" },
        " ",
        { str: '"@zenml-io/kitaru-mastra"' },
        ";",
      ],
      [],
      [
        { kw: "const" },
        " agent ",
        { op: "=" },
        " ",
        { kw: "new" },
        " ",
        { fn: "KitaruAgent" },
        "(",
        { kw: "new" },
        " ",
        { fn: "Agent" },
        "({",
      ],
      ["  id: ", { str: '"support-agent"' }, ","],
      ["  name: ", { str: '"Support agent"' }, ","],
      ["  instructions: ", { str: '"Answer support requests."' }, ","],
      ["  model: ", { str: '"openai/gpt-5-mini"' }, ","],
      ["  tools,"],
      ["}), { agentId: AGENT_ID });"],
      [],
      [
        { kw: "const" },
        " result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " agent.",
        { fn: "generate" },
        "(messages);",
      ],
    ],
  },
  {
    id: "vercel",
    Icon: VercelIcon,
    label: "Vercel AI SDK",
    file: "agent.ts",
    install:
      "pnpm add @zenml-io/kitaru-vercel-ai ai@7.0.65 @ai-sdk/openai@4.0.20 zod@4.4.3",
    before: [
      [
        { kw: "import" },
        " { openai } ",
        { kw: "from" },
        " ",
        { str: '"@ai-sdk/openai"' },
        ";",
      ],
      [
        { kw: "import" },
        " { generateText } ",
        { kw: "from" },
        " ",
        { str: '"ai"' },
        ";",
      ],
      [],
      [
        { kw: "const" },
        " result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " ",
        { fn: "generateText" },
        "({",
      ],
      ["  model: ", { fn: "openai" }, "(", { str: '"gpt-5-nano"' }, "),"],
      ["  prompt: task,"],
      ["});"],
      [],
      ["console.", { fn: "log" }, "(result.text);"],
    ],
    after: [
      [
        { kw: "import" },
        " { openai } ",
        { kw: "from" },
        " ",
        { str: '"@ai-sdk/openai"' },
        ";",
      ],
      [
        { kw: "import" },
        " { createKitaruGenerateText } ",
        { kw: "from" },
        " ",
        { str: '"@zenml-io/kitaru-vercel-ai"' },
        ";",
      ],
      [],
      [
        { kw: "const" },
        " generateText ",
        { op: "=" },
        " ",
        { fn: "createKitaruGenerateText" },
        "({ agentId: AGENT_ID });",
      ],
      [],
      [
        { kw: "const" },
        " result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " ",
        { fn: "generateText" },
        "({",
      ],
      ["  model: ", { fn: "openai" }, "(", { str: '"gpt-5-nano"' }, "),"],
      ["  prompt: task,"],
      ["});"],
      [],
      ["console.", { fn: "log" }, "(result.text);"],
    ],
  },
];

export function OneImport() {
  const [active, setActive] = useState<string>(FRAMEWORKS[0].id);
  const fw = FRAMEWORKS.find((f) => f.id === active) ?? FRAMEWORKS[0];

  // WAI-ARIA tabs pattern: arrow keys move selection with roving focus, so
  // the tablist is one Tab stop instead of five.
  const onTablistKeyDown = (event: KeyboardEvent) => {
    const index = FRAMEWORKS.findIndex((f) => f.id === active);
    let next = -1;
    if (event.key === "ArrowRight") next = (index + 1) % FRAMEWORKS.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + FRAMEWORKS.length) % FRAMEWORKS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = FRAMEWORKS.length - 1;
    if (next === -1) return;
    event.preventDefault();
    const id = FRAMEWORKS[next].id;
    setActive(id);
    document.getElementById(`one-import-tab-${id}`)?.focus();
  };

  return (
    <Section id="one-import">
      <Reveal className="max-w-3xl">
        <Eyebrow>One wrap, every call recorded</Eyebrow>
        <SectionTitle className="mt-5">
          Keep your agent SDK. Make its runs replayable.
        </SectionTitle>
        <Lede className="mt-5">
          Each run records as a session, and that recording is what replay reads
          back. The wrapper lands in a new entrypoint file beside your code —
          your agent is never edited.
        </Lede>
      </Reveal>

      <Reveal delay={80} className="mt-12">
        <div
          role="tablist"
          aria-label="Agent SDK"
          className="flex flex-wrap gap-2"
          onKeyDown={onTablistKeyDown}
        >
          {FRAMEWORKS.map((f) => (
            <button
              key={f.id}
              id={`one-import-tab-${f.id}`}
              type="button"
              role="tab"
              aria-selected={f.id === active}
              aria-controls="one-import-panel"
              tabIndex={f.id === active ? 0 : -1}
              onClick={() => setActive(f.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[12px] transition-all cursor-pointer",
                f.id === active
                  ? "border-ink bg-ink text-background"
                  : "border-border bg-surface text-ink-soft hover:border-ember/50 hover:text-ink",
              )}
            >
              <f.Icon className="size-3.5 shrink-0" />
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div
        role="tabpanel"
        id="one-import-panel"
        aria-labelledby={`one-import-tab-${fw.id}`}
        className="mt-8 grid grid-cols-1 items-center gap-5 lg:grid-cols-[1fr_auto_1fr]"
      >
        <p className="col-span-full overflow-x-auto rounded-lg border border-border bg-surface px-4 py-3 font-mono text-xs text-ink-soft">
          <span className="mr-3 uppercase tracking-wider text-ember">
            Install
          </span>
          {fw.install}
        </p>
        <Reveal delay={120} variant="left" key={`${fw.id}-before`}>
          <CodeBlock
            code={renderCodeLines(fw.before)}
            label="Before"
            filename={fw.file}
          />
        </Reveal>
        <div className="flex justify-center text-ember">
          <ArrowRight class="size-6 rotate-90 lg:rotate-0" />
        </div>
        <Reveal delay={180} variant="right" key={`${fw.id}-after`}>
          <CodeBlock
            code={renderCodeLines(fw.after)}
            label="With Kitaru"
            filename={fw.file}
            accent
          />
        </Reveal>
      </div>
    </Section>
  );
}
