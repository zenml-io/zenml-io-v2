/**
 * Pricing page data — centralized marketing copy.
 *
 * Used by src/pages/pricing.astro.
 * Structure mirrors the unified pricing design: three plan cards
 * (Open Source / Scale / Enterprise) and a single comparison table.
 */
import type {
  CtaLink,
  FaqData,
  PricingCompareTableData,
  PricingPlan,
} from "./marketingPageTypes";

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export const PRICING_SEO = {
  title: "Pricing - ZenML",
  description:
    "Ship ML pipelines with confidence. Predictable, transparent pricing that scales with value.",
  ogTitle: "Pricing - ZenML",
  ogDescription:
    "Ship ML pipelines with confidence. Predictable, transparent pricing that scales with value.",
  ogImage: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/3ae53e01/64b9920cd04b7c4c0340ce50_og-img-0625.jpg`,
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const PRICING_HERO = {
  eyebrow: "Pricing",
  headline: "Ship ML pipelines and AI agents with confidence",
  deck: "Start open source and self-hosted. Upgrade to Pro for the managed control plane — on our SaaS or your own infrastructure.",
} as const;

/**
 * "What's included in Pro" block rendered below the comparison table. Two
 * cards — ML pipelines (ZenML side, purple) and Agent runtime (Kitaru side,
 * orange) — each with three bullet pairings. Icons are inline SVG strings so
 * the card component stays declarative.
 */
export const PRICING_PRO_INCLUSIONS = {
  eyebrow: "What's included in Pro",
  headline: "Two products, one plan.",
  deck: "Switch SDKs without switching tools, billing, or governance. ZenML for reproducible ML. Kitaru for replay-based agent evals. Same control plane underneath.",
  cards: [
    {
      side: "zenml" as const,
      eyebrow: "ML pipelines",
      title: "Pipelines & artifacts",
      body: "Reproducible training, batch inference, evaluation. One DAG, versioned artifacts, every orchestrator.",
      bullets: [
        {
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></svg>',
          title: "Pipeline DAGs, artifact store, model registry",
          detail: "Version every step, every dataset, every model.",
        },
        {
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>',
          title: "Run on Kubernetes, Vertex, SageMaker, AzureML",
          detail: "One pipeline, any orchestrator — no rewrites.",
        },
        {
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>',
          title: "Reproducible by default, replayable on demand",
          detail: "Re-run any historical pipeline with one command.",
        },
      ],
      learn: { label: "Learn about ZenML", href: "/product/zenml" },
      cta: {
        label: "Book a demo",
        href: "/book-your-demo",
        analytics: "Pricing-Pro-Inclusions-ZenML-Demo",
      } as CtaLink,
    },
    {
      side: "kitaru" as const,
      eyebrow: "Agent evals",
      title: "Replay-based evals",
      body: "Import your whole trace history for free. You are only metered when Kitaru re-runs reality.",
      bullets: [
        {
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" /></svg>',
          title: "Imports, recordings and scoring are free",
          detail: "Bring your entire history — the meter does not move.",
        },
        {
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="10" y1="15" x2="10" y2="9" /><line x1="14" y1="15" x2="14" y2="9" /></svg>',
          title: "Metered on replays and experiment runs",
          detail: "A session Kitaru creates counts. One you import does not.",
        },
        {
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="11.49" /></svg>',
          title: "Unlimited seats, including your domain experts",
          detail:
            "The people who know what good looks like are not a line item.",
        },
      ],
      learn: { label: "Learn about Kitaru", href: "/product/kitaru" },
      cta: {
        label: "Book a demo",
        href: "/book-your-demo",
        analytics: "Pricing-Pro-Inclusions-Kitaru-Demo",
      } as CtaLink,
    },
  ],
  caption: "Same control plane. Same governance. One bill, two meters.",
} as const;

// ---------------------------------------------------------------------------
// Plan workspaces — the /pricing plan cards are shown per workspace type.
//
// One subscription covers both, but the two are metered separately: a ZenML
// pipeline run is minutes to hours of compute, a Kitaru replay is one session
// in seconds, and a single cohort experiment can be thousands of replays in a
// click. Showing one "executions" number for both invited the wrong reading.
// ---------------------------------------------------------------------------
export const PRICING_PLAN_WORKSPACES = [
  { id: "zenml", label: "ZenML workspace", sublabel: "ML pipelines" },
  { id: "kitaru", label: "Kitaru workspace", sublabel: "Agent evals" },
] as const;

export type PricingWorkspaceId = (typeof PRICING_PLAN_WORKSPACES)[number]["id"];

// ---------------------------------------------------------------------------
// Plan cards — Open Source / Scale / Enterprise
// ---------------------------------------------------------------------------
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "open-source",
    eyebrow: "Open Source",
    subtitle: "For individuals and small teams",
    price: "Free",
    limitsLine: "Unlimited executions · Unlimited projects",
    includesLabel: "Includes",
    features: [
      "Pipeline & flow orchestration",
      "Artifact management",
      "Basic model registry",
      "Community support",
    ],
    cta: {
      label: "Get Started",
      href: "/get-started",
      analytics: "OSS-Get-Started",
    },
    ctaVariant: "secondary",
  },
  {
    id: "scale",
    eyebrow: "Scale",
    pill: "SaaS",
    topBadge: "Recommended",
    highlighted: true,
    subtitle: "For teams running ML in production",
    price: "$999",
    priceSuffix: "/month",
    slider: {
      caption: "Monthly executions, per workspace",
      defaultIndex: 1,
      tiers: [
        { executions: "500", price: "$399", projects: "1", snapshots: "1" },
        { executions: "2,000", price: "$999", projects: "3", snapshots: "5" },
        {
          executions: "5,000",
          price: "$2,499",
          projects: "10",
          snapshots: "20",
        },
      ],
    },
    includesLabel: "Everything in Open Source, plus",
    features: [
      "Model Control Plane",
      "Artifact Control Plane",
      "Snapshots",
      "Codespaces (remote IDE)",
    ],
    cta: {
      label: "Book a demo",
      href: "/book-your-demo",
      analytics: "Pricing-Scale-Book-Demo",
    },
    ctaVariant: "primary",
  },
  {
    id: "enterprise",
    eyebrow: "Enterprise",
    pill: "SaaS",
    subtitle: "For organizations at scale",
    price: "Custom",
    limitsLine: "Unlimited executions · Unlimited projects",
    includesLabel: "Everything in Scale, plus",
    features: [
      "SSO (SAML / OIDC)",
      "RBAC (custom roles)",
      "Audit logs",
      "Air-gapped deployment",
    ],
    cta: {
      label: "Talk to an engineer",
      href: "/book-your-demo",
      analytics: "Enterprise-Book-Demo",
    },
    ctaVariant: "secondary",
  },
];

// ---------------------------------------------------------------------------
// Kitaru workspace plans.
//
// Deliberately no slider. The replay allowance is still being set from real
// usage data, and the launch position is to show the structure and enforce
// nothing — so the cards state what is free, what is metered, and the limits
// that are actually settled (agents, retention).
// ---------------------------------------------------------------------------
export const PRICING_PLANS_KITARU: PricingPlan[] = [
  {
    id: "kitaru-open-source",
    eyebrow: "Open Source",
    subtitle: "For individuals and small teams",
    price: "Free",
    limitsLine:
      "Unlimited replays · Unlimited agents · Your own infrastructure",
    includesLabel: "Includes",
    features: [
      "Import and record without limits",
      "Cohorts, evaluators and experiment runs",
      "Replay on your own workers, with your own keys",
      "Community support",
    ],
    cta: {
      label: "Get Started",
      href: "/get-started",
      analytics: "Kitaru-OSS-Get-Started",
    },
    ctaVariant: "secondary",
  },
  {
    id: "kitaru-scale",
    eyebrow: "Scale",
    pill: "SaaS",
    topBadge: "Recommended",
    highlighted: true,
    subtitle: "For teams shipping agents to customers",
    price: "$999",
    priceSuffix: "/month",
    limitsLine:
      "3 agents · 90-day retention · Unlimited imports, scoring and seats",
    includesLabel: "Everything in Open Source, plus",
    features: [
      "Hosted dashboard and control plane",
      "Metered on replays and experiment runs only",
      "Unlimited seats for domain experts",
      "Email support",
    ],
    cta: {
      label: "Book a demo",
      href: "/book-your-demo/kitaru",
      analytics: "Kitaru-Scale-Book-Demo",
    },
    ctaVariant: "primary",
  },
  {
    id: "kitaru-enterprise",
    eyebrow: "Enterprise",
    pill: "SaaS",
    subtitle: "For organizations at scale",
    price: "Custom",
    limitsLine: "Unlimited agents · Custom retention · Custom replay volume",
    includesLabel: "Everything in Scale, plus",
    features: [
      "SSO (SAML / OIDC)",
      "RBAC (custom roles)",
      "Audit logs",
      "Remote worker pools",
    ],
    cta: {
      label: "Talk to an engineer",
      href: "/book-your-demo/kitaru",
      analytics: "Kitaru-Enterprise-Talk",
    },
    ctaVariant: "secondary",
  },
];

export const PRICING_PLANS_NOTE: Record<PricingWorkspaceId, string> = {
  zenml:
    "Executions are ZenML pipeline runs. Kitaru replays are metered separately — one subscription, two meters.",
  kitaru:
    "A session Kitaru creates is an execution: replays and experiment runs. Imports, recordings, scoring and seats are free. Nothing is enforced during launch.",
};

// ---------------------------------------------------------------------------
// Comparison table — one unified table across all three plans
// ---------------------------------------------------------------------------
export const PRICING_COMPARE: PricingCompareTableData = {
  heading: "Compare every plan",
  subheading: "Open Source and Pro — with Scale and Enterprise feature tiers.",
  columnHeaders: ["Open Source", "Scale", "Enterprise"],
  sections: [
    {
      heading: "Core platform",
      rows: [
        {
          feature: "Pipeline & flow orchestration",
          values: [true, true, true],
        },
        { feature: "Artifact management", values: [true, true, true] },
        { feature: "Model registry (basic)", values: [true, true, true] },
      ],
    },
    {
      heading: "Pro control plane",
      rows: [
        {
          feature: "Model Control Plane",
          link: "https://docs.zenml.io/concepts/models",
          values: [false, true, true],
        },
        {
          feature: "Artifact Control Plane",
          link: "https://docs.zenml.io/concepts/dashboard-features",
          values: [false, true, true],
        },
        {
          feature: "Snapshots",
          link: "https://docs.zenml.io/concepts/snapshots",
          values: [false, true, true],
        },
        { feature: "Codespaces (remote IDE)", values: [false, true, true] },
      ],
    },
    {
      heading: "Agent evals",
      rows: [
        {
          feature: "Replay-based evals for Python agents",
          values: [true, true, true],
        },
        {
          feature: "Unlimited imports, scoring and seats",
          values: [true, true, true],
        },
        {
          feature: "Hosted dashboard and control plane",
          values: [false, true, true],
        },
        {
          feature: "Remote worker pools",
          values: [false, false, true],
        },
      ],
    },
    {
      heading: "Enterprise & governance",
      rows: [
        { feature: "SSO (SAML / OIDC)", values: [false, false, true] },
        {
          feature: "RBAC (custom roles)",
          link: "https://docs.zenml.io/pro/access-management/roles",
          values: [false, false, true],
        },
        {
          feature: "Advanced native scheduling",
          values: [false, false, true],
        },
        { feature: "Audit logs", values: [false, false, true] },
        { feature: "Air-gapped deployment", values: [false, false, true] },
      ],
    },
    {
      heading: "Support",
      rows: [
        {
          feature: "Support level",
          values: ["Community", "Priority", "Dedicated + SLA"],
        },
      ],
    },
  ],
  // Derived from PRICING_PLANS so the per-plan CTA is the single source of truth
  // for label / href / analytics / variant across both the card and the table row.
  ctaButtons: PRICING_PLANS.map((plan) => ({
    ...plan.cta,
    variant: plan.ctaVariant ?? "primary",
  })),
};

// ---------------------------------------------------------------------------
// Startup / Academic banner
// ---------------------------------------------------------------------------
export const PRICING_STARTUP_BANNER = {
  headline: "Are you startup or academic?",
  body: "Apply for a special price to access ZenML Pro features for early-stage companies building ML-powered products, universities, research institutions, and educational use cases.",
  cta: {
    label: "Apply Now",
    href: "/startups-and-academics",
    analytics: "Pricing-Startup-Apply",
  } as CtaLink,
} as const;

// ---------------------------------------------------------------------------
// Compliance section (shared with /pro)
// ---------------------------------------------------------------------------
export const PRICING_COMPLIANCE = {
  eyebrow: "No compliance headaches",
  headline: "Your VPC, your data",
  body: "ZenML is a metadata layer on top of your existing infrastructure, meaning all data and compute stays on your side.",
  image: {
    desktop: {
      url: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/e68ec2dc/66c7398e738654118d4024fb_why-zenml-min.png`,
      alt: "ZenML only has access to metadata; your data remains in your VPC",
    },
    mobile: {
      url: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/c5ce12a7/66c73e7cfd15ae9889f59705_why-zenml-mobile-min.webp`,
      alt: "Diagram of ZenML setup with local environments for data scientists, ML engineers, and MLOps, integrating AWS, GCP, and Azure.",
    },
  },
  badges: [
    {
      url: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/37007174/soc2type2_zenml.png`,
      alt: "SOC 2 Type II Badge",
    },
    {
      url: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/959bbffc/66e9546d3b19094bf950273a_iso_certified.webp`,
      alt: "ISO/IEC 27001:2022 certification badge",
    },
  ],
  bannerHeadline: "We Take Security Seriously",
  bannerEyebrow: "ZenML is SOC2 and ISO 27001 Compliant",
  bannerBody:
    "ZenML is SOC2 and ISO 27001 compliant, validating our adherence to industry-leading standards for data security, availability, and confidentiality in our ongoing commitment to protecting your ML workflows and data.",
} as const;

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export const PRICING_FAQ: FaqData = {
  eyebrow: "Support",
  headline: "Frequently asked questions",
  subheadline: "Everything you need to know about the product.",
  items: [
    {
      question: "What counts as an execution in Kitaru?",
      answer:
        "A session Kitaru creates — that means replays and experiment runs. Sessions you import or record yourself are free, and so are scoring, evaluators and seats. The reasoning is simple: importing your history is step one of using the product, so charging for it would price against our own onboarding. You are metered only when Kitaru re-runs reality.",
    },
    {
      question: "ZenML and Kitaru — same plan?",
      answer:
        "Yes — one subscription, one support tier, both workspaces. The ZenML workspace runs ML pipelines (typed step DAGs, training, batch inference). The Kitaru workspace runs replay-based agent evals (sessions, cohorts, evaluators, experiment runs). The two are metered separately, though: a pipeline run is minutes to hours of compute, while a replay is one session in seconds, so they are counted on their own meters rather than sharing a pool. No credit conversion between them.",
    },
    {
      question: "Can I self-host Kitaru like ZenML?",
      answer:
        "Yes. Kitaru is open source under Apache 2.0 — same model as ZenML. One command brings up a local deployment in Docker, or self-host the server in your own VPC. Either way the worker runs beside your code, on your machine or your compute, using your own model keys — so replays never execute on our infrastructure. Pro adds the hosted control plane, remote worker pools, SSO, RBAC and audit.",
    },
    {
      question: "What happens if I exceed my plan’s limits?",
      answer:
        "We don’t abruptly cut you off. If you occasionally exceed your plan’s limits, we’ll notify you and suggest an upgrade if the pattern continues. For consistent overages, upgrading to the next tier ensures you get the best value.",
    },
    {
      question: "Can I self-host ZenML?",
      answer:
        "Yes! ZenML is open source and can be self-hosted on your own infrastructure completely free — that's the Open Source plan. If you need the Pro control plane or support for a self-hosted deployment, the Enterprise plan covers that too. ZenML uses industry-standard encryption for all data in-transit and at rest. The data is stored on AWS regions in Europe, and a strict backup policy is maintained for all client data. ZenML only stores metadata — and no actual data is kept anywhere on our servers. Data and compute stays on the VPC of the customer.",
    },
    {
      question: "How do Run Template Triggers work?",
      answer:
        "Run Template Triggers automate executions — ZenML pipeline runs and Kitaru experiment runs — from events, schedules, webhooks, or the API. Triggers are a Pro feature: they're available on the Scale and Enterprise plans for more complex automation workflows in production.",
    },
    {
      question:
        "What’s the difference between the managed plans and the open source version?",
      answer:
        "The Open Source plan gives you complete control but requires you to manage your own infrastructure. The Pro plans — Scale and Enterprise — provide a fully managed control plane with automatic updates, guaranteed uptime, and Pro-only features like run templates, the Model Control Plane, and RBAC. Enterprise adds governance and deployment options like SSO, audit logs, and air-gapped deployment on top.",
    },
    {
      question: "What kind of support is included in each plan?",
      answer:
        "The Open Source plan includes access to our public Slack channel and community forums. The Scale plan adds priority support with faster response times. Enterprise includes a dedicated account manager, support with SLAs, and implementation assistance.",
    },
  ],
  slackCta: {
    label: "Still not clear? Ask us on Slack",
    href: "/slack",
    external: true,
  },
};

// ---------------------------------------------------------------------------
// Stats + Trust section
// ---------------------------------------------------------------------------
export const PRICING_STATS = {
  headline: "Trusted by 1,000s of members of top companies",
  deck: "Join the ZenML Community and start improving your MLOps",
  items: [
    { value: "1,000,000", label: "pipelines run in ZenML" },
    { value: "100,000", label: "pipelines run last month" },
    { value: "21,000", label: "stacks registered last 12 months" },
    { value: "200,000", label: "models trained last 12 months" },
  ],
  testimonial: {
    quote:
      '"ZenML offers the capability to build end-to-end ML workflows that seamlessly integrate with various components of the ML stack, such as different providers, data stores, and orchestrators."',
    name: "Harold Giménez",
    title: "SVP R&D at HashiCorp",
    avatar: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/31a5f8ee/653297b0b924af52998661bf_harold.webp`,
    companyLogo: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/33303c0d/6532977ff6458771fb59387e_hashicorp.webp`,
  },
  logos: [
    {
      src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/da72cb24/652d3ecd4d162d2290427dfe_airbus_defence_space.png`,
      alt: "Airbus",
    },
    {
      src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/4ae61c3a/66c84308916684f0d07b57ff_axa-min.svg`,
      alt: "AXA",
    },
    {
      src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/5cc09160/bundeswehr.svg`,
      alt: "Bundeswehr",
    },
    {
      src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/4ad1f760/66c84308b1e802ab9a246134_enel-min.svg`,
      alt: "Enel",
    },
    {
      src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/b6111e84/jetbrains-min.svg`,
      alt: "JetBrains",
    },
    {
      src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/52a636b6/66c74d825fbc26b4d09823d1_Brevo-Logo-transparent.webp`,
      alt: "Brevo",
    },
    {
      src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/86cd6b7b/cross-screen-media.png`,
      alt: "Cross Screen Media",
    },
    {
      src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/c110367c/65c498032806e2ff7daec2bf_ADEO.svg`,
      alt: "ADEO",
    },
    {
      src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/356e9829/65c49832a235dab4e3e0a3ce_leroy-merlin.svg`,
      alt: "Leroy Merlin",
    },
    {
      src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/cab0c1be/66c84308abf004bb1934e7d3_mann-hummel-min.svg`,
      alt: "Mann+Hummel",
    },
    {
      src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/e6c1fbb1/koble.svg`,
      alt: "Koble",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Final CTA
// ---------------------------------------------------------------------------
export const PRICING_FINAL_CTA = {
  headline: "Start deploying reproducible AI workflows today",
  body: "Enterprise-grade MLOps platform trusted by thousands of companies in production.",
  primaryCta: {
    label: "Book a demo",
    href: "/book-your-demo",
    analytics: "Pricing-CTA-Book-Demo",
  } as CtaLink,
  secondaryCta: {
    label: "Read Docs",
    href: "/docs",
    analytics: "Pricing-CTA-Read-Docs",
  } as CtaLink,
} as const;
