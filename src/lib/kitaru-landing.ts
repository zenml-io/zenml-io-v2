import type { FaqItem } from "./marketingPageTypes";
import {
  KITARU_ADAPTERS_TEXT,
  KITARU_CLOUD_PRICE,
  KITARU_DOCS_URL,
  KITARU_IMPORTERS_TEXT,
  KITARU_LICENSE,
  KITARU_VS_OBSERVABILITY_ANSWER,
} from "./productKitaru";

// Re-export shared constants from productKitaru to avoid duplication
export {
  KITARU_DOCS_URL,
  KITARU_INSTALL_CMD,
  KITARU_LICENSE,
  KITARU_LINKS,
  KITARU_TRIAL_DAYS,
  KITARU_TRIAL_NOTE,
} from "./productKitaru";

// Note: PRODUCT_KITARU_SEO is retained in productKitaru.ts as it serves the page's meta tags

/**
 * FAQ help rail — one home for these destinations so the help links, the FAQ
 * answers that mention them, and any derived surfaces can't drift apart.
 * "Kitaru Docs" uses the site's canonical docs URL (KITARU_DOCS_URL in
 * src/lib/productKitaru.ts), not the kitaru.ai/docs legacy host.
 */
export const FAQ_HELP_LINKS = [
  {
    label: "Slack Community",
    href: "https://kitaru.ai/slack",
    analytics: "Kitaru-FAQ-Help-Slack",
  },
  {
    label: "Kitaru Docs",
    href: KITARU_DOCS_URL,
    analytics: "Kitaru-FAQ-Help-Docs",
  },
  {
    label: "Support",
    href: "https://kitaru.ai/help",
    analytics: "Kitaru-FAQ-Help-Support",
  },
] as const;

/**
 * How it works: the four things the open-source tool does. The hosted AI
 * engineer note sits under the steps in Features.astro.
 */
export const STEPS = [
  {
    n: "01",
    title: "Bring your traces",
    body: `Import from ${KITARU_IMPORTERS_TEXT}. Or record new runs with an adapter for ${KITARU_ADAPTERS_TEXT}.`,
  },
  {
    n: "02",
    title: "Review sessions",
    body: "Read a few real sessions and note what went wrong.",
  },
  {
    n: "03",
    title: "Turn findings into checks",
    body: "Each finding becomes a check that runs on every session.",
  },
  {
    n: "04",
    title: "Replay the fix",
    body: "Replay your agent through its own framework on the sessions that failed. Tool calls come from the recording.",
  },
] as const;

/** The hosted part, said once under the steps. */
export const HOSTED_NOTE = {
  title: "Rather not do the reading?",
  body: `Our AI engineer reads your traces next to your evals, shows you what they miss, and asks you ten quick questions on three real sessions. Fifteen minutes a week, ${KITARU_CLOUD_PRICE} a month.`,
  link: {
    label: "See pricing",
    href: "/pricing",
    analytics: "Kitaru-Steps-Pricing",
  },
} as const;

/**
 * FAQ: short answers to the questions that come up in every demo. Pricing
 * questions live on /pricing. The FAQPage JSON-LD is built from this list.
 */
export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "What is open source, and what is hosted?",
    answer: `Kitaru is open source (${KITARU_LICENSE}). You install it with one curl command and it runs on your machine: import, review, checks and replay. Our AI engineer is the hosted part. It does the reading and asks you questions, for ${KITARU_CLOUD_PRICE} a month on Starter. See <a href="/pricing">pricing</a>.`,
  },
  {
    question: "How is this different from Langfuse, Braintrust or LangSmith?",
    answer: KITARU_VS_OBSERVABILITY_ANSWER,
  },
  {
    question: "Do I have to change my agent's code?",
    answer: `No. Import traces from ${KITARU_IMPORTERS_TEXT} and your code stays as it is. To replay, wrap your agent in one line with an adapter for ${KITARU_ADAPTERS_TEXT}. For anything else, a Kitaru skill helps your coding agent write an adapter.`,
  },
  {
    question: "Does it work for multi-turn chat agents?",
    answer:
      "Yes. Importers group a conversation's traces into one session, and review and checks work on the whole conversation. Replay runs one turn at a time with the recorded conversation before it, so you see how your change answers each turn. It can't invent what the user would have said next.",
  },
  {
    question: "My agent writes to real systems. Is replay safe?",
    answer:
      "Yes. Replay answers tool calls from the recording, so nothing touches real systems. You can pass a specific tool through live on purpose.",
  },
  {
    question: "How much of my time does it take?",
    answer: `About fifteen minutes a week with our AI engineer: ten quick questions on three real sessions. Doing it yourself in Kitaru takes longer; the <a href="${KITARU_DOCS_URL}">docs</a> walk through it.`,
  },
  {
    question: "Something's broken. How do I reach you?",
    answer:
      'Three routes, all reaching a human: the <a href="https://kitaru.ai/slack">Slack community</a>, <a href="https://kitaru.ai/help">kitaru.ai/help</a> (goes straight to GitHub issues), or <a href="mailto:support@kitaru.ai">support@kitaru.ai</a>.',
  },
] as const;
