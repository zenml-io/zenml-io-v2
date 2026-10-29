import { cloudSignupUrl } from "./constants";

/**
 * The one-line installer: CLI + MCP server in an isolated uv environment,
 * the coding-agent skills, MCP registration for Claude Code / Codex, and
 * then prints the two ways to get a server. Served by the kitaru.ai
 * worker from install.sh in the Kitaru repo.
 */
export const KITARU_INSTALL_CMD = "curl -fsSL https://kitaru.ai/install | bash";
/** Adding the SDK to a project's own environment (the embedded, in-process form). */
export const KITARU_SDK_ADD_CMD =
  'uv add "kitaru[cli,worker]" kitaru-pydantic-ai';
export const KITARU_LICENSE = "Apache 2.0";
/** Canonical Kitaru docs entry on the site's docs host. */
export const KITARU_DOCS_URL = "https://docs.zenml.io/kitaru";
/** The docs guide for comparing candidate models on an import's recorded calls. */
export const MODEL_CHOICE_GUIDE_URL = `${KITARU_DOCS_URL}/import-your-traces/model-swap`;

/**
 * Pricing facts. Every surface that quotes the price, trial terms, or
 * Cloud-plan limits interpolates these constants, so a change is one line
 * here.
 */
export const KITARU_CLOUD_PRICE = "$39";
export const KITARU_TRIAL_DAYS = 14;
/** The one public plan: seats and sessions are never limited; more of
 *  anything else is an Enterprise conversation. */
export const KITARU_STARTER_LIMITS = {
  agents: 1,
  zenmlProjects: 1,
  pipelineRuns: 100,
} as const;
/** What one agent is, for pricing. Said the same way everywhere. */
export const KITARU_AGENT_DEFINITION =
  "An agent is anything you want your AI engineer to watch: its code, in one repo or several, and the traces it sends.";

/** Trial terms shown next to every signup CTA. */
export const KITARU_TRIAL_NOTE = `${KITARU_TRIAL_DAYS}-day free trial · Full access · No credit card`;

/**
 * The trace tools Kitaru imports from and the frameworks its adapters
 * record. One list each, so every surface on /product/kitaru (FAQ, bands,
 * Markdown mirror) names the same tools in the same order.
 */
export const KITARU_IMPORTERS = [
  "Langfuse",
  "LangSmith",
  "Braintrust",
  "Logfire",
  "MLflow",
  "Phoenix",
] as const;
export const KITARU_ADAPTERS = [
  "Claude Agent SDK",
  "OpenAI Agents SDK",
  "PydanticAI",
  "LangGraph",
  "Vercel AI SDK",
  "Mastra",
] as const;

/** "A, B, C or D": a list in prose. */
function orList(items: readonly string[]): string {
  return `${items.slice(0, -1).join(", ")} or ${items.at(-1)}`;
}
export const KITARU_IMPORTERS_TEXT = orList(KITARU_IMPORTERS);
export const KITARU_ADAPTERS_TEXT = orList(KITARU_ADAPTERS);

/**
 * Canonical answer to "how is this different from Langfuse / Braintrust /
 * LangSmith?" (and "why not just use my tracing tool's evals?"). Say it the
 * same way every time; it matches the homepage pitch. Used verbatim by the
 * /pricing Kitaru FAQ and the /product/kitaru FAQ.
 */
export const KITARU_VS_OBSERVABILITY_ANSWER = `They show you what happened. Our AI engineer reads those traces next to your evals and shows you which evals are wrong or missing, then Kitaru replays your agent to test the fix against real sessions. Kitaru imports from ${KITARU_IMPORTERS_TEXT}, so your tracing tool stays your system of record.`;

/**
 * The 90-second launch video behind the hero's poster card. The iframe is
 * only injected while the modal is open, and the nocookie host must stay in
 * sync with the `frame-src` allowlist in public/_headers.
 */
export const KITARU_VIDEO = {
  id: "jQ1HZVCFJZM",
  embedUrl:
    "https://www.youtube-nocookie.com/embed/jQ1HZVCFJZM?autoplay=1&rel=0",
  title: "Kitaru launch video",
  caption: "Watch the launch video, 90 seconds",
} as const;

export const KITARU_LINKS = {
  signup: {
    // Unified signup on cloud.zenml.io; the UTM tags mark Kitaru as the source.
    label: "Sign up free",
    href: cloudSignupUrl("kitaru"),
  },
  demo: { label: "Book a demo", href: "/book-your-demo/kitaru" },
  github: {
    label: "Star on GitHub",
    href: "https://github.com/zenml-io/kitaru",
    external: true,
  },
} as const;

export const PRODUCT_KITARU_SEO = {
  title: "Kitaru: insights and evals from your agent's traces | ZenML Labs",
  description: `Kitaru is the open-source core under our AI engineer. Import traces from ${KITARU_IMPORTERS_TEXT}, get insights across every session, turn what you find into checks, and replay a fix before it ships. Runs on your machine, with your keys.`,
  // OG cards need JPEG, not AVIF — social platforms don't render AVIF (PR #73).
  ogImage: "https://assets.zenml.io/content/og/439a52c0/kitaru-product-og.jpg",
} as const;

/**
 * Hand-maintained Markdown mirror copy for /product/kitaru.md.
 *
 * Not derived from src/components/kitaru/*. The install command, licence,
 * tool lists and links come from the constants above, and the .md route
 * appends FAQ_ITEMS from kitaru-landing.ts. Update this when the page's
 * pitch changes.
 */
export const PRODUCT_KITARU_MARKDOWN = {
  title: "Kitaru: insights and evals from your agent's traces",
  installCmd: KITARU_INSTALL_CMD,
  license: KITARU_LICENSE,
  summary: [
    "Our AI engineer reads your agent's traces next to your evals and shows you what they miss. Kitaru is the open-source part underneath it.",
    `Kitaru imports the traces you already have, or records new ones through an adapter. Insights show the patterns across every session, you turn what you find into checks, and you can replay your agent through its own framework to test a fix before it ships.`,
    `Kitaru is ${KITARU_LICENSE}. Install it in one line and run it on your own machine, with your own model keys. Our AI engineer is the hosted part: it does the reading and asks you ten quick questions on three real sessions, about fifteen minutes a week. It costs ${KITARU_CLOUD_PRICE} a month on Starter, with one ZenML project included; see https://www.zenml.io/pricing.`,
  ],
  steps: [
    {
      name: "Bring your traces",
      body: `Import from ${KITARU_IMPORTERS_TEXT}, or record new runs with an adapter for ${KITARU_ADAPTERS_TEXT}.`,
    },
    {
      name: "Get insights",
      body: "Analyzers read every session at once and surface the patterns: failed tool calls, repeated calls, how outcomes split.",
    },
    {
      name: "Turn findings into checks",
      body: "Read the sessions behind an insight. What you find becomes a check that runs on every session, next to the evals you already have. Our AI engineer can do the reading and ask you only what it can't work out.",
    },
    {
      name: "Replay a fix",
      body: "When you change the model, prompt or code, replay your agent on the sessions that failed. Tool calls are answered from the recording, so nothing touches real systems.",
    },
  ],
  ctas: [KITARU_LINKS.signup, KITARU_LINKS.github],
} as const;
