/**
 * Open Source vs Pro page data — centralized marketing copy.
 *
 * Used by src/pages/open-source-vs-pro.astro.
 * Content extracted from Webflow HTML snapshot + SEO baseline.
 */
import type {
  HeroData,
  FeatureGridItem,
  SubwayMapCard,
  ComparisonTableData,
  CtaLink,
} from "./marketingPageTypes";

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export const OSS_VS_PRO_SEO = {
  title: "ZenML Open Source vs Cloud",
  description:
    "Transform your ML workflows from single-player experiments to multiplayer production systems. Compare ZenML Open Source and ZenML Pro features.",
  ogTitle: "ZenML Open Source vs Cloud",
  ogDescription:
    "Transform your ML workflows from single-player experiments to multiplayer production systems. Compare ZenML Open Source and ZenML Pro features.",
  ogImage: `https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/3ae53e01/64b9920cd04b7c4c0340ce50_og-img-0625.jpg`,
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const OSS_VS_PRO_HERO: HeroData = {
  eyebrow: "From Solo Science to Team Engineering",
  headline: "ZenML Open Source vs Pro",
  deck: "Transform your ML workflows from single-player experiments to multiplayer production systems. ZenML Pro builds on the same open-source foundation you trust: no code rewrites, no metadata migrations required.",
  primaryCta: { label: "Book a Demo", href: "/book-your-demo" },
  secondaryCta: { label: "Use Open Source", href: "/get-started" },
};

// ---------------------------------------------------------------------------
// Feature grid: "ZenML Pro is Open Source and More"
// ---------------------------------------------------------------------------
export const OSS_VS_PRO_FEATURE_GRID = {
  eyebrow: "ZenML Open Source vs Pro",
  headline: "ZenML Pro is Open Source and More",
  body: "ZenML Pro extends the beloved open-source foundation with enterprise features designed for collaboration, governance, and scale. Start with OSS, upgrade when ready: your pipelines keep running exactly as they are.",
  items: [
    {
      title: "Managed control plane",
      body: "ZenML Pro offers multi-tenant, fully-managed ZenML deployments. Separate your team into workspaces, and deploy dev, staging, and production servers separately.",
    },
    {
      title: "Roles and Permissions",
      body: "ZenML Pro tenants have built-in roles and permissions, as an extension to the open-source product. We connect ZenML with your OIDC provider and offer SSO.",
    },
    {
      title: "Control and configurability",
      body: "ZenML Pro control plane allows you to run ZenML pipelines directly from the server, and features enhanced configurability for your pipeline builds.",
    },
    {
      title: "Enhanced observability",
      body: "ZenML Pro tenants have an enhanced dashboard with more features including a model control plane to view all your ML models, and the ability to trigger pipelines, do CI/CD and lots more.",
    },
  ] satisfies FeatureGridItem[],
  primaryCta: { label: "Use Open Source", href: "/get-started" } as CtaLink,
  secondaryCta: { label: "Compare Plans", href: "/pricing" } as CtaLink,
  image: {
    url: `https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/e88e687c/65324d0f452d2d170268090d_opensource-cloud.svg`,
    alt: "ZenML Cloud toolbox emerging from a box, representing MLOps solutions and model deployment.",
  },
} as const;

// ---------------------------------------------------------------------------
// Subway map section: "Is Your ML Team Ready for the Next Station?"
// ---------------------------------------------------------------------------
export const OSS_VS_PRO_SUBWAY_MAP = {
  image: {
    url: `https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/7cca5359/zenml_metro-min.svg`,
    alt: "A metro line map showing Collaboration, Governance, Automation and Reliability stations in the ZenML OSS line",
  },
  headline: "Is Your ML Team Ready for the Next Station?",
  body: "Our subway map framework helps you identify pain signals that indicate it\u2019s time to upgrade your ML infrastructure.",
  cards: [
    {
      title: "Collaboration",
      painQuote: '"Who just overwrote my training stack?"',
      body: "Multiple teams sharing buckets, databases, or GPU quotas without clear boundaries.",
    },
    {
      title: "Governance",
      painQuote: '"Who just overwrote my training stack?"',
      body: "Security teams requiring proof of who changed what, when\u2014especially before production deployments.",
    },
    {
      title: "Automation",
      painQuote: '"Can we refresh the model for tomorrow\u2019s demo?"',
      body: "Non-engineers needing to trigger retrains without CLI knowledge or developer intervention.",
    },
    {
      title: "Reliability",
      painQuote: '"The server DB is down again"',
      body: "Operations teams spending hours on cluster maintenance, upgrades, and backup procedures.",
    },
  ] satisfies SubwayMapCard[],
  cta: {
    label: "Learn more",
    href: "/blog/which-zenml-path-fits-your-team-today-a-subway-map-guide-to-oss-and-pro",
  } as CtaLink,
} as const;

// ---------------------------------------------------------------------------
// Comparison table
// ---------------------------------------------------------------------------
export const OSS_VS_PRO_COMPARISON: ComparisonTableData = {
  eyebrow: "Differences",
  headline: "ZenML Open Source vs Pro Feature Breakdown",
  subheadline:
    "A feature by feature comparison between ZenML Open Source vs ZenML Pro",
  columnHeaders: ["OSS", "ZenML Pro"],
  rows: [
    {
      feature: "Pipelines",
      description: "ML pipelines are Python workflows that execute a machine learning task",
      columns: ["Basic Controls with legacy dashboard", "Advanced Controls and modern dashboard"],
    },
    {
      feature: "Artifact and Model Control Plane",
      description: "See all your models and artifacts in one place",
      columns: ["Not available", "Accessible in UI"],
    },
    {
      feature: "Event Triggers",
      description: "External sources",
      columns: [
        "Client can trigger the pipeline only",
        "Webhooks to trigger actions (pipeline run, model promote) etc.",
      ],
    },
    {
      feature: "Run Templates",
      description: "Create repeatable workflows triggered with one click",
      columns: [
        "Not available",
        "Create run templates with one-click and run templates directly via the dashboard",
      ],
    },
    {
      feature: "Container management",
      description: "If executed remotely, pipelines run in containers",
      columns: [
        "Basic management",
        "Advanced management with container re-use and optimization",
      ],
    },
    {
      feature: "Role Based Access Control",
      description: "Roles dictate who has permissions to do what",
      columns: ["Not available", "Fine-grained permissions"],
    },
    {
      feature: "User Management",
      description: "A user account in one ZenML server",
      columns: ["Basic", "Advanced with SSO"],
    },
    {
      feature: "Infrastructure",
      description: "The infrastructure that supports the central ZenML server",
      columns: [
        "Self-managed",
        "Managed, multi-tenant deployment with database backups, security, compliance, rollbacks, upgrades etc",
      ],
    },
    {
      feature: "Service Connectors",
      description:
        "Credentials, authorization, and access control for your ML stack components",
      columns: ["CLI only", "Modern dashboard"],
    },
    {
      feature: "Integrations",
      description:
        "External tools for experiment tracking, model deployment, drift detection, etc.",
      columns: ["Community", "Purpose-built"],
    },
    {
      feature: "Support",
      description: "Seeking help when stuck",
      columns: ["Community", "Dedicated 24/7"],
    },
    {
      feature: "Setup of MLOps workflow",
      description:
        "Setting up of the codebase and infrastructure required to build a successful MLOps platform",
      columns: ["Self managed", "Specialized onboarding"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Final CTA
// ---------------------------------------------------------------------------
export const OSS_VS_PRO_FINAL_CTA = {
  headline: "Start deploying reproducible AI workflows today",
  body: "Enterprise-grade MLOps platform trusted by thousands of companies in production.",
  primaryCta: { label: "Book a Demo", href: "/book-your-demo" },
  secondaryCta: { label: "Use Open Source", href: "https://cloud.zenml.io" },
} as const;
