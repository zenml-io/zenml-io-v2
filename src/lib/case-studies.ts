/**
 * Case studies hub page copy.
 *
 * Centralizes marketing copy for the /case-studies hub page,
 * following the src/lib/homepage.ts and src/lib/features.ts pattern.
 */

export const CASE_STUDIES_HUB_HERO = {
  eyebrow: "Case Studies",
  headline: "Real Teams. Real AI Workflows",
  body: "See how teams are using ZenML to unify their AI platforms—from batch evaluations to real-time serving, traditional ML to GenAI workflows.",
  primaryCta: {
    label: "Book a demo",
    href: "/book-your-demo",
  },
  secondaryCta: { label: "Read Docs", href: "/docs" },
} as const;

export const CASE_STUDIES_HUB_BANNER = {
  text: "ZenML tracks production AI deployments across the industry",
  supporting: "See the LLMOps database here",
  href: "/llmops-database",
} as const;

export const CASE_STUDIES_HUB_CTA = {
  headline: "Start deploying reproducible AI workflows today",
  body: "Enterprise-grade AI orchestration platform trusted by thousands of companies in production.",
  primaryCta: {
    label: "Book a demo",
    href: "/book-your-demo",
  },
  secondaryCta: { label: "Read Docs", href: "/docs" },
} as const;

/**
 * Hub ordering. Entries without an explicit `hub.order` sort to the end.
 */
export function orderCaseStudies<
  T extends { data: { hub: { order?: number } } },
>(entries: readonly T[]): T[] {
  return [...entries].sort(
    (a, b) => (a.data.hub.order ?? 99) - (b.data.hub.order ?? 99),
  );
}

/** Cards the hub draws before the LLMOps banner splits the grid. */
export const CARDS_BEFORE_BANNER = 3;

/**
 * Splits the hub grid around the banner. The banner divides rows rather than
 * trailing the grid, so with fewer cards than a row holds everything lands
 * before it and the second row is empty.
 */
export function splitAtBanner<T>(
  entries: readonly T[],
  cardsBeforeBanner: number = CARDS_BEFORE_BANNER,
): { before: T[]; after: T[] } {
  const index = Math.min(cardsBeforeBanner, entries.length);
  return { before: entries.slice(0, index), after: entries.slice(index) };
}

/** Every case study except the given one, in hub order. */
export function siblingCaseStudies<
  T extends { data: { slug: string; hub: { order?: number } } },
>(entries: readonly T[], slug: string): T[] {
  return orderCaseStudies(entries).filter((entry) => entry.data.slug !== slug);
}
