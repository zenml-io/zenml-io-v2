/**
 * Copy for the generated page cards — the Open Graph cards that are not a
 * database entry and not a VS comparison.
 *
 * One entry per route family. `scripts/og/generate-default-og.ts --family=pages`
 * renders each one to `og/pages/<key>.jpg` on R2, and the page templates read
 * the URL back through `defaultOgUrl("pages", key)`.
 *
 * Keys are kebab-case route slugs and are part of the R2 key, so renaming one
 * orphans an uploaded card: add and re-upload rather than rename.
 */

import { DEFAULT_DESCRIPTION } from "./constants";

export type OgCard = {
  /** Route slug; also the R2 filename. */
  key: string;
  /** Headline, fitted from 114px down to 64px by the generator. */
  title: string;
  /** Up to two lines at 58px; `\n` forces the break. */
  subtitle: string;
};

/**
 * TODO-1B marks copy that still needs writing: the title is the page's H1 as
 * shipped, the subtitle its meta description trimmed to two 58px lines
 * (about 55 characters each).
 */
export const OG_CARDS: readonly OgCard[] = [
  // The card baked into public/images/og-default.jpg, for every route with
  // no card of its own.
  { key: "default", title: "ZenML Labs", subtitle: DEFAULT_DESCRIPTION },

  // Product and homepage
  { key: "home", title: "TODO-1B: home", subtitle: "TODO-1B: /" },
  {
    key: "product-zenml",
    title: "TODO-1B: product-zenml",
    subtitle: "TODO-1B: /product/zenml",
  },

  // Hubs and indexes
  { key: "blog", title: "TODO-1B: blog", subtitle: "TODO-1B: /blog" },
  {
    key: "features",
    title: "TODO-1B: features",
    subtitle: "TODO-1B: /features",
  },
  {
    key: "integrations",
    title: "TODO-1B: integrations",
    subtitle: "TODO-1B: /integrations",
  },
  {
    key: "integration-type",
    title: "TODO-1B: integration-type",
    subtitle: "TODO-1B: /integration-type",
  },
  { key: "compare", title: "TODO-1B: compare", subtitle: "TODO-1B: /compare" },
  { key: "team", title: "TODO-1B: team", subtitle: "TODO-1B: /team" },
  {
    key: "case-studies",
    title: "TODO-1B: case-studies",
    subtitle: "TODO-1B: /case-studies",
  },
  {
    key: "projects",
    title: "TODO-1B: projects",
    subtitle: "TODO-1B: /projects",
  },
  {
    key: "llmops-database",
    title: "TODO-1B: llmops-database",
    subtitle: "TODO-1B: /llmops-database",
  },
  {
    key: "mlops-database",
    title: "TODO-1B: mlops-database",
    subtitle: "TODO-1B: /mlops-database",
  },

  // Taxonomy hubs, one card per family
  { key: "tags", title: "TODO-1B: tags", subtitle: "TODO-1B: /tags" },
  {
    key: "llmops-tags",
    title: "TODO-1B: llmops-tags",
    subtitle: "TODO-1B: /llmops-tags",
  },
  {
    key: "mlops-tags",
    title: "TODO-1B: mlops-tags",
    subtitle: "TODO-1B: /mlops-tags",
  },
  {
    key: "industry-tags",
    title: "TODO-1B: industry-tags",
    subtitle: "TODO-1B: /industry-tags",
  },
  {
    key: "category",
    title: "TODO-1B: category",
    subtitle: "TODO-1B: /category",
  },
  { key: "author", title: "TODO-1B: author", subtitle: "TODO-1B: /author" },

  // Standalone pages that used to point at the migrated card
  { key: "pricing", title: "TODO-1B: pricing", subtitle: "TODO-1B: /pricing" },
  { key: "pro", title: "TODO-1B: pro", subtitle: "TODO-1B: /pro" },
  { key: "careers", title: "TODO-1B: careers", subtitle: "TODO-1B: /careers" },
  { key: "company", title: "TODO-1B: company", subtitle: "TODO-1B: /company" },
  {
    key: "get-started",
    title: "TODO-1B: get-started",
    subtitle: "TODO-1B: /get-started",
  },
  {
    key: "open-source-vs-pro",
    title: "TODO-1B: open-source-vs-pro",
    subtitle: "TODO-1B: /open-source-vs-pro",
  },
  {
    key: "deployments",
    title: "TODO-1B: deployments",
    subtitle: "TODO-1B: /deployments",
  },

  // Content entries with no card of their own
  {
    key: "case-study-brevo",
    title: "TODO-1B: case-study-brevo",
    subtitle: "TODO-1B: /case-study/brevo",
  },
  {
    key: "project-banksubscription-predictor",
    title: "TODO-1B: project-banksubscription-predictor",
    subtitle: "TODO-1B: /projects/banksubscription-predictor",
  },
  {
    key: "project-sign-language-detection-with-yolov5",
    title: "TODO-1B: project-sign-language-detection-with-yolov5",
    subtitle: "TODO-1B: /projects/sign-language-detection-with-yolov5",
  },
];

const byKey = new Map(OG_CARDS.map((card) => [card.key, card]));

/** Look up a page card. Throws rather than shipping a page with no card. */
export function ogCard(key: string): OgCard {
  const card = byKey.get(key);
  if (!card)
    throw new Error(
      `Unknown OG card key: ${key}. Add it to OG_CARDS in src/lib/ogCards.ts.`,
    );
  return card;
}
