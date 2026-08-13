// OneImport — keep the inner harness, add the outer runtime. Tabbed
// before/after code comparison per agent SDK. Framework tab state is local;
// the before/after code samples are inline here (as in the redesign source),
// tokenized to keep the site's existing `.code-syntax` highlighting instead
// of the redesign's flat single-color code lines.
import { useState } from "preact/hooks";
import { cn } from "../../../lib/utils";
import {
  AnthropicIcon,
  GeminiIcon,
  GoogleIcon,
  OpenAIIcon,
  PydanticIcon,
  PythonIcon,
} from "./brand-icons";
import { type CodeLine, renderCodeLines } from "./code-tokens";
import { ArrowRight } from "./icons";
import { CodeBlock, Eyebrow, Lede, Section, SectionTitle } from "./primitives";
import { Reveal } from "./Reveal";

type Framework = {
  id: string;
  Icon: typeof PydanticIcon;
  label: string;
  before: CodeLine[];
  after: CodeLine[];
};

const frameworks: Framework[] = [
  {
    id: "pydanticai",
    Icon: PydanticIcon,
    label: "PydanticAI",
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
        " kitaru.adapters.pydantic_ai ",
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
      ["))"],
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
    before: [
      [{ kw: "from" }, " agents ", { kw: "import" }, " Runner"],
      [
        { kw: "from" },
        " agents.sandbox ",
        { kw: "import" },
        " SandboxAgent, Manifest",
      ],
      [],
      ["agent ", { op: "=" }, " ", { fn: "SandboxAgent" }, "("],
      ["    name", { op: "=" }, { str: '"Compliance Reviewer"' }, ","],
      ["    model", { op: "=" }, { str: '"gpt-5-mini"' }, ","],
      ["    default_manifest", { op: "=" }, "manifest,"],
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
      [
        { kw: "from" },
        " kitaru.adapters.openai_agents ",
        { kw: "import" },
        " KitaruRunner, OpenAIRunRequest",
      ],
      [
        { kw: "from" },
        " agents.sandbox ",
        { kw: "import" },
        " SandboxAgent, Manifest",
      ],
      [],
      ["agent ", { op: "=" }, " ", { fn: "SandboxAgent" }, "("],
      ["    name", { op: "=" }, { str: '"Compliance Reviewer"' }, ","],
      ["    model", { op: "=" }, { str: '"gpt-5-mini"' }, ","],
      ["    default_manifest", { op: "=" }, "manifest,"],
      [")"],
      [],
      [
        "runner ",
        { op: "=" },
        " ",
        { fn: "KitaruRunner" },
        "(agent, checkpoint_strategy",
        { op: "=" },
        { str: '"calls"' },
        ")",
      ],
      [
        "result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " runner.",
        { fn: "run" },
        "(OpenAIRunRequest.",
        { fn: "start" },
        "(task))",
      ],
    ],
  },
  {
    id: "anthropic",
    Icon: AnthropicIcon,
    label: "Claude Agent SDK",
    before: [
      [
        { kw: "from" },
        " claude_agent_sdk ",
        { kw: "import" },
        " query, ClaudeAgentOptions",
      ],
      [],
      ["options ", { op: "=" }, " ", { fn: "ClaudeAgentOptions" }, "("],
      [
        "    system_prompt",
        { op: "=" },
        { str: '"You are a compliance reviewer."' },
        ",",
      ],
      ["    allowed_tools", { op: "=" }, "[],"],
      [")"],
      [],
      [
        { kw: "async for" },
        " msg ",
        { kw: "in" },
        " ",
        { fn: "query" },
        "(prompt",
        { op: "=" },
        "task, options",
        { op: "=" },
        "options):",
      ],
      ["    process(msg)"],
    ],
    after: [
      [{ kw: "from" }, " kitaru ", { kw: "import" }, " flow"],
      [
        { kw: "from" },
        " claude_agent_sdk ",
        { kw: "import" },
        " ClaudeAgentOptions",
      ],
      [
        { kw: "from" },
        " kitaru.adapters.claude_agent_sdk ",
        { kw: "import" },
        " ClaudeRunRequest, ClaudeRunResult, KitaruClaudeRunner",
      ],
      [],
      ["runner ", { op: "=" }, " ", { fn: "KitaruClaudeRunner" }, "("],
      ["    name", { op: "=" }, { str: '"compliance_review"' }, ","],
      [
        "    options_factory",
        { op: "=" },
        { kw: "lambda" },
        " request: ",
        { fn: "ClaudeAgentOptions" },
        "(",
      ],
      [
        "        system_prompt",
        { op: "=" },
        { str: '"You are a compliance reviewer."' },
        ",",
      ],
      ["        allowed_tools", { op: "=" }, "[],"],
      ["        max_turns", { op: "=" }, "request.max_turns,"],
      ["    ),"],
      [")"],
      [],
      [{ dec: "@flow" }],
      [
        { kw: "def" },
        " ",
        { fn: "review" },
        "(task: ",
        { var: "str" },
        ") ",
        { op: "->" },
        " ",
        { var: "ClaudeRunResult" },
        ":",
      ],
      [
        "    ",
        { kw: "return" },
        " runner.",
        { fn: "run_sync" },
        "(ClaudeRunRequest.",
        { fn: "start" },
        "(task, max_turns",
        { op: "=" },
        "3))",
      ],
    ],
  },
  {
    id: "gemini",
    Icon: GeminiIcon,
    label: "Gemini",
    before: [
      [{ kw: "from" }, " google ", { kw: "import" }, " genai"],
      [],
      ["client ", { op: "=" }, " genai.", { fn: "Client" }, "()"],
      [],
      [
        "interaction ",
        { op: "=" },
        " client.interactions.",
        { fn: "create" },
        "(",
      ],
      ["    model", { op: "=" }, { str: '"gemini-3.5-flash"' }, ","],
      ["    input", { op: "=" }, "task,"],
      [")"],
      [{ fn: "print" }, "(interaction.output_text)"],
    ],
    after: [
      [{ kw: "from" }, " kitaru ", { kw: "import" }, " flow"],
      [{ kw: "from" }, " kitaru.adapters.gemini ", { kw: "import" }, " ("],
      ["    GeminiInteractionRequest, KitaruGeminiInteractionsRunner,"],
      [")"],
      [],
      [
        "runner ",
        { op: "=" },
        " ",
        { fn: "KitaruGeminiInteractionsRunner" },
        "(name",
        { op: "=" },
        { str: '"review"' },
        ")",
      ],
      [],
      [{ dec: "@flow" }],
      [{ kw: "def" }, " ", { fn: "review" }, "(task: ", { var: "str" }, "):"],
      [
        "    request ",
        { op: "=" },
        " GeminiInteractionRequest.",
        { fn: "start" },
        "(",
      ],
      ["        task, model", { op: "=" }, { str: '"gemini-3.5-flash"' }, ","],
      ["    )"],
      ["    ", { kw: "return" }, " runner.", { fn: "run_sync" }, "(request)"],
    ],
  },
  {
    id: "adk",
    Icon: GoogleIcon,
    label: "Google ADK",
    before: [
      [{ kw: "from" }, " google.adk.runners ", { kw: "import" }, " Runner"],
      [],
      ["runner ", { op: "=" }, " ", { fn: "Runner" }, "("],
      ["    agent", { op: "=" }, "agent,"],
      ["    app_name", { op: "=" }, { str: '"support"' }, ","],
      ["    session_service", { op: "=" }, "sessions,"],
      [")"],
      [],
      [
        "result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " runner.",
        { fn: "run_async" },
        "(",
      ],
      ["    user_id", { op: "=" }, { str: '"user-123"' }, ","],
      ["    session_id", { op: "=" }, { str: '"s-456"' }, ","],
      ["    new_message", { op: "=" }, "msg,"],
      [")"],
    ],
    after: [
      [
        { kw: "from" },
        " kitaru.adapters.google_adk ",
        { kw: "import" },
        " ADKRunRequest, KitaruADKRunner",
      ],
      [],
      ["kitaru_runner ", { op: "=" }, " ", { fn: "KitaruADKRunner" }, "("],
      ["    adk_runner,"],
      ["    name", { op: "=" }, { str: '"support_agent"' }, ","],
      ["    checkpoint_strategy", { op: "=" }, { str: '"runner_call"' }, ","],
      [")"],
      [],
      [
        "result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " kitaru_runner.",
        { fn: "run" },
        "(",
        { fn: "ADKRunRequest" },
        "(",
      ],
      ["    user_id", { op: "=" }, { str: '"user-123"' }, ","],
      ["    session_id", { op: "=" }, { str: '"s-456"' }, ","],
      ["    message", { op: "=" }, "msg,"],
      ["))"],
    ],
  },
  {
    id: "custom",
    Icon: PythonIcon,
    label: "Raw Python",
    before: [
      [{ kw: "from" }, " anthropic ", { kw: "import" }, " Anthropic"],
      [],
      ["client ", { op: "=" }, " ", { fn: "Anthropic" }, "()"],
      [],
      [
        { kw: "def" },
        " ",
        { fn: "my_agent" },
        "(task: ",
        { var: "str" },
        ") ",
        { op: "->" },
        " ",
        { var: "str" },
        ":",
      ],
      ["    plan ", { op: "=" }, " ", { fn: "analyze" }, "(client, task)"],
      [
        "    ",
        { cmt: "# nothing recorded — nothing to replay or test against." },
      ],
      ["    result ", { op: "=" }, " ", { fn: "execute" }, "(client, plan)"],
      ["    ", { kw: "return" }, " result"],
    ],
    after: [
      [{ kw: "from" }, " kitaru ", { kw: "import" }, " flow, checkpoint"],
      [{ kw: "from" }, " anthropic ", { kw: "import" }, " Anthropic"],
      [],
      ["client ", { op: "=" }, " ", { fn: "Anthropic" }, "()"],
      [],
      [{ dec: "@flow" }],
      [
        { kw: "def" },
        " ",
        { fn: "my_agent" },
        "(task: ",
        { var: "str" },
        ") ",
        { op: "->" },
        " ",
        { var: "str" },
        ":",
      ],
      [
        "    plan ",
        { op: "=" },
        " ",
        { fn: "checkpoint" },
        "(analyze)(client, task)",
      ],
      [
        "    result ",
        { op: "=" },
        " ",
        { fn: "checkpoint" },
        "(execute)(client, plan)",
      ],
      ["    ", { kw: "return" }, " result"],
    ],
  },
];

export function OneImport() {
  const [active, setActive] = useState<string>(frameworks[0].id);
  const fw = frameworks.find((f) => f.id === active) ?? frameworks[0];

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

      <Reveal delay={80} className="mt-12 flex flex-wrap gap-2">
        {frameworks.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={f.id === active}
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
      </Reveal>

      <div className="mt-8 grid grid-cols-1 items-center gap-5 lg:grid-cols-[1fr_auto_1fr]">
        <Reveal delay={120} variant="left" key={`${fw.id}-before`}>
          <CodeBlock
            code={renderCodeLines(fw.before)}
            label="Before"
            filename="agent.py"
          />
        </Reveal>
        <div className="flex justify-center text-ember">
          <ArrowRight class="size-6 rotate-90 lg:rotate-0" />
        </div>
        <Reveal delay={180} variant="right" key={`${fw.id}-after`}>
          <CodeBlock
            code={renderCodeLines(fw.after)}
            label="With Kitaru"
            filename="agent.py"
            accent
          />
        </Reveal>
      </div>
    </Section>
  );
}
