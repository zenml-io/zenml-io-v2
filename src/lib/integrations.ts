/**
 * Integrations catalogue copy — the strings the /integrations family renders
 * on the ZenML Labs shell. Every sentence here is the one the route already
 * shipped; the deck builders keep the exact wording (and the exact counts,
 * never rounded) the pages computed inline before the cutover.
 *
 * Consumers: src/pages/integrations/index.astro,
 * src/pages/integrations/[slug].astro, src/pages/integration-type/index.astro,
 * src/pages/integration-type/[slug].astro.
 */
import type { LabsBandContent } from "./labs-home";

export const INTEGRATIONS_HERO = {
  eyebrow: "Integrations",
  headline: "Explore the MLOps Landscape with ZenML",
  deck: "ZenML integrates with many different third-party tools. Once code is organized into a ZenML pipeline, you can supercharge your ML workflows with the best-in-class solutions from various MLOps areas.",
};

/** The three claims the old dark closing band listed as check bullets. */
export const INTEGRATIONS_CLOSE_BULLETS = [
  "Open-source foundation, no vendor lock-in",
  "Works with any infrastructure",
  "Upgrade to managed Pro features",
] as const;

/**
 * The closing band shared by /integrations, /integration-type and
 * /integration-type/[slug]. Each route passes its own Plausible event name.
 */
export function integrationsClose(analytics: string): LabsBandContent {
  return {
    headlineLines: ["Unify Your ML", "and LLM Workflows"],
    deck: INTEGRATIONS_CLOSE_BULLETS.join(" · "),
    cta: { label: "Book a demo", href: "/book-your-demo", analytics },
  };
}

/** The integration detail's closing band; `count` is the published total. */
export function integrationDetailClose(count: number): LabsBandContent {
  return {
    headlineLines: ["Connect Your AI Workflows", "to a World of Tools"],
    deck: `Expand your AI workflows with ${count} ZenML integrations`,
    cta: {
      label: "Book a demo",
      href: "/book-your-demo",
      analytics: "Integration-Close-Book-Demo",
    },
  };
}

export const INTEGRATION_TYPES_HERO = {
  eyebrow: "Integration types",
  headline: "Integration Types",
};

export const INTEGRATION_TYPE_EYEBROW = "Integration type";

/** "14 integrations in this category" — the type hub's deck. */
export function integrationTypeDeck(n: number): string {
  return `${n} ${n === 1 ? "integration" : "integrations"} in this category`;
}

/** "17 types of integration" — the type index's deck. */
export function integrationTypesDeck(n: number): string {
  return `${n} ${n === 1 ? "type" : "types"} of integration`;
}

/** How many cards the detail page's "More integrations" row shows. */
export const MORE_INTEGRATIONS_COUNT = 6;

export const MORE_INTEGRATIONS_HEADING = "More integrations";
