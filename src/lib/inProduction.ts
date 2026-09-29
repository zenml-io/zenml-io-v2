/** Site copy for the In Production newsletter (spec: docs/superpowers/specs/2026-09-29-in-production-newsletter-design.md). */
export const IN_PRODUCTION = {
  name: "In Production",
  cadence: "every Tuesday and Thursday",
  stripLabel: "In Production",
  stripDeck:
    "Four LLMOps case studies like this one, in your inbox every Tuesday and Thursday.",
  seo: {
    title: "In Production: LLMOps case studies in your inbox | ZenML",
    description:
      "A twice-weekly email with four real-world LLMOps case studies from the ZenML LLMOps Database. Every Tuesday and Thursday.",
  },
  page: {
    headline: "In Production",
    deck: "Four real-world LLMOps case studies, every Tuesday and Thursday. Each one links to our full write-up, with the original source one click further.",
  },
} as const;
