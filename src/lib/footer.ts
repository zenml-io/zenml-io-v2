/**
 * Footer data — lean, focused on what we want to highlight:
 * the comparison hub, deployment scenarios, careers, and the
 * differences between products (OSS vs Pro, ZenML vs Kitaru
 * workspaces). The footer is intentionally smaller than the
 * Webflow-era one — we're surfacing 4 columns × ~4 items, not
 * a sitemap dump.
 */

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export type SocialPlatform = "linkedin" | "x" | "slack" | "youtube";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  label: string;
}

/** Brand tagline that sits under the logo. */
export const FOOTER_TAGLINE = "The single layer for ML and AI workloads.";

/**
 * Primary nav columns. Four columns; rendered in a single grid.
 * Order is left-to-right at desktop, top-to-bottom at mobile.
 */
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "ZenML", href: "/" },
      { label: "Kitaru", href: "/product/kitaru" },
      { label: "ZenML Pro", href: "/pro", badge: "New" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Compare & deploy",
    links: [
      { label: "All comparisons", href: "/compare" },
      { label: "Open Source vs Pro", href: "/open-source-vs-pro" },
      { label: "Deployment scenarios", href: "/deployments" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      {
        label: "Docs",
        href: "https://docs.zenml.io/getting-started/introduction",
        external: true,
      },
      {
        label: "Changelog",
        href: "https://docs.zenml.io/changelog",
        external: true,
      },
      { label: "LLMOps Database", href: "/llmops-database" },
      { label: "Customer stories", href: "/case-studies" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Careers", href: "/careers" },
      { label: "About", href: "/company" },
      { label: "Newsletter", href: "/newsletter-signup" },
      { label: "Community Slack", href: "/slack" },
    ],
  },
];

/** Social channel icons rendered next to the brand block. */
export const FOOTER_SOCIAL: SocialLink[] = [
  {
    platform: "linkedin",
    href: "https://www.linkedin.com/company/zenml",
    label: "LinkedIn",
  },
  { platform: "x", href: "https://twitter.com/zenml_io", label: "X (Twitter)" },
  { platform: "slack", href: "/slack-invite", label: "Slack" },
  {
    platform: "youtube",
    href: "https://www.youtube.com/@ZenML",
    label: "YouTube",
  },
];

/** Legal row at the very bottom. */
export const FOOTER_LEGAL: FooterLink[] = [
  { label: "Imprint", href: "/imprint" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  {
    label: "Status",
    href: "https://status.zenml.io",
    external: true,
  },
];
