/**
 * Footer data — extracted from the Webflow production site footer structure.
 * Used by Footer.astro to render multi-column footer layout.
 */

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
}

export interface FooterColumn {
  title: string;
  titleHref?: string;
  links: FooterLink[];
}

export type SocialPlatform = "linkedin" | "x" | "slack" | "youtube";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  label: string;
}

// ---------------------------------------------------------------------------
// Primary columns (Product, Resources, Company)
// ---------------------------------------------------------------------------

export const FOOTER_PRIMARY: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "ZenML Pro", href: "/pro", badge: "New" },
      { label: "OSS vs Managed", href: "/open-source-vs-pro" },
      { label: "Integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Newsletter", href: "/newsletter-signup", badge: "New" },
      { label: "Blog", href: "/blog" },
      { label: "Docs", href: "https://docs.zenml.io/getting-started/introduction", external: true },
      { label: "Changelog", href: "https://docs.zenml.io/changelog", external: true },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Slack", href: "/slack" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Careers", href: "/careers" },
      { label: "About Us", href: "/company" },
      { label: "Our Values", href: "/company" },
      { label: "Join Us", href: "/careers" },
    ],
  },
];

// ---------------------------------------------------------------------------
// VS comparison columns
// ---------------------------------------------------------------------------

export const FOOTER_VS: FooterColumn[] = [
  {
    title: "ZenML vs Orchestrators",
    titleHref: "/vs/zenml-vs-orchestrators",
    links: [],
  },
  {
    title: "ZenML vs Exp Trackers",
    titleHref: "/vs/zenml-vs-experiment-trackers",
    links: [
      { label: "Weights & Biases", href: "/vs/zenml-vs-experiment-trackers" },
      { label: "Neptune AI", href: "/vs/zenml-vs-experiment-trackers" },
      { label: "CometML", href: "/vs/zenml-vs-experiment-trackers" },
    ],
  },
  {
    title: "ZenML vs e2e Platforms",
    titleHref: "/vs/zenml-vs-e2e-platforms",
    links: [
      { label: "GCP Vertex AI", href: "/vs/zenml-vs-e2e-platforms" },
      { label: "Azure ML", href: "/vs/zenml-vs-e2e-platforms" },
      { label: "ClearML", href: "/compare/zenml-vs-clearml" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Extended resource columns (GenAI, MLOps, Hyperscalers)
// ---------------------------------------------------------------------------

export const FOOTER_EXTENDED: FooterColumn[] = [
  {
    title: "GenAI & LLMs",
    links: [
      { label: "LLMOps Database", href: "/llmops-database" },
      { label: "Finetuning LLMs", href: "https://github.com/zenml-io/zenml-projects/tree/main/llm-complete-guide", external: true },
      { label: "Creating a code copilot", href: "https://github.com/zenml-io/zenml-projects/tree/main/zencoder", external: true },
      { label: "Cheap GPU compute", href: "https://docs.zenml.io/stacks/orchestrators/skypilot-vm", external: true },
    ],
  },
  {
    title: "MLOps Platform",
    links: [
      { label: "Mix and match tools", href: "https://docs.zenml.io/stacks", external: true },
      { label: "Create alerting", href: "https://docs.zenml.io/stacks/alerters", external: true },
      { label: "Plugin custom stack components", href: "https://docs.zenml.io/how-to/infrastructure-deployment/stack-deployment/implement-a-custom-stack-component", external: true },
    ],
  },
  {
    title: "Leveraging Hyperscalers",
    links: [
      { label: "Train on Spot VMs", href: "https://docs.zenml.io/stacks/orchestrators/skypilot-vm", external: true },
      { label: "Deploying Sagemaker Endpoints", href: "https://github.com/zenml-io/zenml-projects/tree/main/huggingface-sagemaker", external: true },
      { label: "Managing GCP Vertex AI", href: "https://docs.zenml.io/how-to/popular-integrations/gcp-guide", external: true },
      { label: "Training on Kubernetes", href: "https://docs.zenml.io/how-to/popular-integrations/kubernetes", external: true },
      { label: "Local to Sagemaker Pipelines", href: "https://docs.zenml.io/how-to/popular-integrations/aws-guide", external: true },
    ],
  },
];

// ---------------------------------------------------------------------------
// Social links
// ---------------------------------------------------------------------------

export const FOOTER_SOCIAL: SocialLink[] = [
  { platform: "linkedin", href: "https://www.linkedin.com/company/zenml", label: "LinkedIn" },
  { platform: "x", href: "https://twitter.com/zenml_io", label: "X (Twitter)" },
  { platform: "slack", href: "https://zenml.io/slack-invite", label: "Slack" },
  { platform: "youtube", href: "https://www.youtube.com/@ZenML", label: "YouTube" },
];

// ---------------------------------------------------------------------------
// Legal links
// ---------------------------------------------------------------------------

export const FOOTER_LEGAL: FooterLink[] = [
  { label: "Imprint", href: "/imprint" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "ZenML Pro Status", href: "https://status.zenml.io", external: true },
];
