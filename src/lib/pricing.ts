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
import {
  KITARU_CLOUD_LIMITS,
  KITARU_CLOUD_PRICE,
  KITARU_LINKS,
  KITARU_TRIAL_DAYS,
  KITARU_VS_OBSERVABILITY_ANSWER,
} from "./productKitaru";
import { ZENML_LINKS } from "./productZenml";

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export const PRICING_SEO = {
  title: "Pricing - ZenML",
  description:
    "Orchestrate AI workflows and ship agents with confidence. Predictable, transparent pricing that scales with value.",
  ogTitle: "Pricing - ZenML",
  ogDescription:
    "Orchestrate AI workflows and ship agents with confidence. Predictable, transparent pricing that scales with value.",
  ogImage: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/3ae53e01/64b9920cd04b7c4c0340ce50_og-img-0625.jpg`,
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const PRICING_HERO = {
  eyebrow: "Pricing",
  headline: "Orchestrate AI workflows and ship agents with confidence",
  deck: "Start open source and self-hosted. Upgrade to Pro for the managed control plane, on our SaaS or your own infrastructure.",
} as const;

/**
 * "What's included in Pro" block rendered below the comparison table. Two
 * cards — AI orchestration (ZenML side, purple) and Agent replay (Kitaru side,
 * orange) — each with three bullet pairings. Icons are inline SVG strings so
 * the card component stays declarative.
 */
export const PRICING_PRO_INCLUSIONS = {
  eyebrow: "What's included in Pro",
  headline: "Two products, one plan.",
  deck: "Switch SDKs without switching tools, billing, or governance. ZenML for AI workflow orchestration. Kitaru to replay and regression-test your agents. Same control plane underneath.",
  cards: [
    {
      side: "zenml" as const,
      eyebrow: "AI orchestration",
      title: "Pipelines & artifacts",
      body: "Training, batch inference, evals, agent workflows. One DAG, versioned artifacts, every orchestrator.",
      bullets: [
        {
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></svg>',
          title: "Pipeline DAGs, artifact store, model registry",
          detail: "Version every step, every dataset, every model.",
        },
        {
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>',
          title: "Run on Kubernetes, Vertex, SageMaker, AzureML",
          detail: "One pipeline, any orchestrator, no rewrites.",
        },
        {
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>',
          title: "Reproducible by default, replayable on demand",
          detail: "Re-run any historical pipeline with one command.",
        },
      ],
      learn: { label: "Learn about ZenML", href: "/product/zenml" },
      cta: {
        label: ZENML_LINKS.signup.label,
        href: ZENML_LINKS.signup.href,
        analytics: "Pricing-Pro-Inclusions-ZenML-Signup",
      } as CtaLink,
    },
    {
      side: "kitaru" as const,
      eyebrow: "Agent replay",
      title: "Replay-based evals",
      body: "Import your whole trace history, replay it against your next change, and keep every fix as a regression test, on one flat plan.",
      bullets: [
        {
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" /></svg>',
          title: "Sessions, cohorts, evaluators, experiments",
          detail: "The whole replay loop, imports and scoring included.",
        },
        {
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="10" y1="15" x2="10" y2="9" /><line x1="14" y1="15" x2="14" y2="9" /></svg>',
          title: `One flat ${KITARU_CLOUD_PRICE} plan, no meters to read`,
          detail: "Replays and experiment runs included at launch.",
        },
        {
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="11.49" /></svg>',
          title: "Seats for your domain experts",
          detail:
            "The people who know what good looks like are not a line item.",
        },
      ],
      learn: { label: "Learn about Kitaru", href: "/product/kitaru" },
      cta: {
        label: KITARU_LINKS.signup.label,
        href: KITARU_LINKS.signup.href,
        analytics: "Pricing-Pro-Inclusions-Kitaru-Signup",
      } as CtaLink,
    },
  ],
  caption: "Same control plane. Same governance. One bill covers both.",
} as const;

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
// One flat Cloud plan with a full-access trial and no credit card — no
// free hosted tier, no metering, no middle tiers. Just Open Source, Cloud,
// and Enterprise. The price, trial length and limits are interpolated from
// productKitaru.ts so a change is one line there.
// ---------------------------------------------------------------------------
export const PRICING_PLANS_KITARU: PricingPlan[] = [
  {
    id: "kitaru-open-source",
    eyebrow: "Open Source",
    subtitle: "For individuals and small teams",
    price: "Free",
    limitsLine: "Self-hosted · Your infrastructure, your limits",
    includesLabel: "Includes",
    features: [
      "Import and record without limits",
      "Cohorts, evaluators and experiment runs",
      "Replay on your own workers, with your own keys",
      "Community support",
    ],
    cta: {
      label: "View on GitHub",
      href: KITARU_LINKS.github.href,
      analytics: "Kitaru-OSS-GitHub",
    },
    ctaVariant: "secondary",
  },
  {
    id: "kitaru-cloud",
    eyebrow: "Cloud",
    pill: "SaaS",
    topBadge: `${KITARU_TRIAL_DAYS}-day free trial`,
    highlighted: true,
    subtitle: "For teams shipping agents to customers",
    price: KITARU_CLOUD_PRICE,
    priceSuffix: "/month",
    limitsLine: `${KITARU_CLOUD_LIMITS.agents} agents · ${KITARU_CLOUD_LIMITS.seats} seats · ${KITARU_CLOUD_LIMITS.retentionDays}-day session retention`,
    includesLabel: "Everything in Open Source, plus",
    features: [
      "Hosted dashboard and control plane",
      "Replays and experiment runs included, no meters",
      "Trial starts with full Enterprise access",
      "Community support",
    ],
    cta: {
      label: KITARU_LINKS.signup.label,
      href: KITARU_LINKS.signup.href,
      analytics: "Kitaru-Cloud-Signup",
    },
    ctaVariant: "primary",
  },
  {
    id: "kitaru-enterprise",
    eyebrow: "Enterprise",
    pill: "SaaS",
    subtitle: "For organizations at scale",
    price: "Custom",
    limitsLine: "Unlimited agents · Custom seats and retention",
    includesLabel: "Everything in Cloud, plus",
    features: [
      "SSO (SAML / OIDC)",
      "Audit logs",
      "Remote worker pools",
      "Custom limits and retention",
    ],
    cta: {
      label: "Talk to an engineer",
      href: KITARU_LINKS.demo.href,
      analytics: "Kitaru-Enterprise-Talk",
    },
    ctaVariant: "secondary",
  },
];

// ---------------------------------------------------------------------------
// Plan workspaces — the /pricing plan cards are shown per workspace type.
//
// One subscription covers both, but the plans differ in shape: ZenML prices
// by execution tiers, while Kitaru launches on a single flat plan. Showing
// one blended card for both invited the wrong reading.
//
// Each entry is the full descriptor for its panel — plans, meter note, a
// product-page link, and brand accent (literal class strings so Tailwind sees
// them) — so adding a workspace here is the whole change. The first entry is
// the default panel (selected tab, no-JS fallback): Kitaru leads while the v2
// launch is the site's front-and-center story.
// ---------------------------------------------------------------------------
export const PRICING_PLAN_WORKSPACES = [
  {
    id: "kitaru",
    label: "Kitaru workspace",
    sublabel: "Agent replay",
    note: `One flat plan while we launch: ${KITARU_CLOUD_PRICE} a month, every feature, no meters to read. The trial starts with full access and needs no credit card.`,
    learn: { label: "Learn about Kitaru", href: "/product/kitaru" },
    plans: PRICING_PLANS_KITARU,
    accent: {
      text: "text-orange-600",
      border: "border-orange-500",
      bg: "bg-orange-500",
    },
    /* Recolors this panel's zenml-* Tailwind utilities (Button's primary
     * variant, comparison-table checkmarks) to Kitaru orange — see
     * .kitaru-brand-vars in global.css for why data-app can't do this. */
    brandClass: "kitaru-brand-vars",
  },
  {
    id: "zenml",
    label: "ZenML workspace",
    sublabel: "AI orchestration",
    note: "Executions are ZenML pipeline runs. Kitaru is priced separately as a flat monthly plan. One subscription covers both workspaces.",
    learn: { label: "Learn about ZenML", href: "/product/zenml" },
    plans: PRICING_PLANS,
    accent: {
      text: "text-zenml-500",
      border: "border-zenml-500",
      bg: "bg-zenml-500",
    },
    brandClass: undefined,
  },
] as const;

// ---------------------------------------------------------------------------
// Comparison tables — one per workspace, swapped by the plan-cards toggle
// ---------------------------------------------------------------------------
export const PRICING_COMPARE: PricingCompareTableData = {
  heading: "Compare every plan",
  subheading: "Open Source and Pro, with Scale and Enterprise feature tiers.",
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
      heading: "Agent replay",
      rows: [
        {
          feature: "Replay-based evals (Python & TypeScript)",
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

// Kitaru-workspace variant, shown when the workspace toggle selects Kitaru.
// Launch framing: one flat plan, nothing metered, every feature on every
// hosted plan — the table's job is to show there is nothing to compute,
// only the self-hosted / hosted / enterprise split to pick from.
export const PRICING_COMPARE_KITARU: PricingCompareTableData = {
  heading: "Compare every plan",
  subheading: `One flat plan at launch: ${KITARU_CLOUD_PRICE} a month, every feature, ${KITARU_TRIAL_DAYS}-day full-access trial. No meters, no usage math.`,
  columnHeaders: ["Open Source", "Cloud", "Enterprise"],
  sections: [
    {
      heading: "Plan",
      rows: [
        {
          feature: "Price",
          values: ["Free", `${KITARU_CLOUD_PRICE} / month`, "Custom"],
        },
        {
          feature: "Free trial",
          values: ["—", `${KITARU_TRIAL_DAYS} days, full access`, "—"],
        },
        {
          feature: "Credit card to start",
          values: ["Never", "Not for the trial", "—"],
        },
      ],
    },
    {
      heading: "Replay & evals on every plan",
      rows: [
        {
          feature: "Replay-based evals (Python & TypeScript)",
          values: [true, true, true],
        },
        {
          feature: "Cohorts, evaluators and experiment runs",
          values: [true, true, true],
        },
        {
          feature: "Replay on your own workers, with your own keys",
          values: [true, true, true],
        },
        {
          feature: "Imports, recordings and scoring, no usage caps",
          values: [true, true, true],
        },
      ],
    },
    {
      heading: "Limits",
      rows: [
        {
          feature: "Agents",
          values: ["Self-hosted", `${KITARU_CLOUD_LIMITS.agents}`, "Unlimited"],
        },
        {
          feature: "Seats",
          values: ["Self-hosted", `${KITARU_CLOUD_LIMITS.seats}`, "Custom"],
        },
        {
          feature: "Session retention",
          values: [
            "Self-hosted",
            `${KITARU_CLOUD_LIMITS.retentionDays} days`,
            "Custom",
          ],
        },
      ],
    },
    {
      heading: "Hosted control plane",
      rows: [
        {
          feature: "Hosted dashboard and control plane",
          values: [false, true, true],
        },
        {
          feature: "Role-based access (standard roles)",
          values: [false, false, true],
        },
      ],
    },
    {
      heading: "Enterprise & governance",
      rows: [
        { feature: "SSO (SAML / OIDC)", values: [false, false, true] },
        { feature: "Audit logs", values: [false, false, true] },
        { feature: "Remote worker pools", values: [false, false, true] },
      ],
    },
    {
      heading: "Support",
      rows: [
        {
          feature: "Support level",
          values: ["Community", "Community", "Dedicated + SLA"],
        },
      ],
    },
  ],
  ctaButtons: PRICING_PLANS_KITARU.map((plan) => ({
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
    "ZenML is SOC2 and ISO 27001 compliant, validating our adherence to industry-leading standards for data security, availability, and confidentiality in our ongoing commitment to protecting your AI workflows and data.",
} as const;

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export const PRICING_FAQ_SLACK_CTA: CtaLink = {
  label: "Still not clear? Ask us on Slack",
  href: "/slack",
  external: true,
};

/** Kitaru-workspace FAQ — shown when the pricing toggle is on Kitaru. */
export const PRICING_FAQ_KITARU: FaqData = {
  eyebrow: "Kitaru",
  headline: "Kitaru pricing, answered",
  items: [
    {
      question: "What does Kitaru cost?",
      answer: `${KITARU_CLOUD_PRICE} a month, flat. The hosted Cloud plan includes ${KITARU_CLOUD_LIMITS.agents} agents, ${KITARU_CLOUD_LIMITS.seats} seats, ${KITARU_CLOUD_LIMITS.retentionDays}-day session retention, and every feature. Replays, experiment runs, imports and recording all come with it. No meters, no usage math. Need more agents, seats or governance? That's the Enterprise plan.`,
    },
    {
      question: `What happens after the ${KITARU_TRIAL_DAYS}-day trial?`,
      answer: `The trial is full access to everything and needs no credit card. When it ends, add a card and you're on the ${KITARU_CLOUD_PRICE}/month plan. Nothing about your workspace changes except the billing. There's no free hosted tier: the free option is the open-source version, self-hosted on your own infrastructure, forever.`,
    },
    {
      question: "What does the Enterprise plan add?",
      answer:
        "Unlimited agents, custom seats and session retention, plus the governance layer: SSO, role-based access and audit. If the Cloud plan's limits are the only thing in your way, that's the conversation to have with us.",
    },
    {
      question: "How is this different from Langfuse, Braintrust or LangSmith?",
      answer: KITARU_VS_OBSERVABILITY_ANSWER,
    },
    {
      question: "Can I self-host Kitaru?",
      answer:
        "Yes. Kitaru is open source under Apache 2.0, the same model as ZenML. One command brings up a local deployment in Docker, or self-host the server in your own VPC. Either way the worker runs beside your code, on your machine or your compute, using your own model keys, so replays never execute on our infrastructure. Cloud adds the hosted control plane and remote worker pools; Enterprise adds SSO, RBAC and audit.",
    },
    {
      question: "Do you see my traces?",
      answer:
        "Self-hosted, no: the server and workers run in your infrastructure and your traces never have to leave your systems. On the hosted Cloud plan we manage the control plane, but replay still executes on your own workers with your own keys. The recorded sessions are yours.",
    },
    {
      question: "Do I need a separate subscription for ZenML?",
      answer: `No, one subscription covers both workspaces. They're priced differently (ZenML's managed tiers scale with pipeline executions; Kitaru is a flat ${KITARU_CLOUD_PRICE}/month), but it's the same control plane, the same governance, and one bill.`,
    },
  ],
  slackCta: PRICING_FAQ_SLACK_CTA,
};

/** ZenML-workspace FAQ — shown when the pricing toggle is on ZenML. */
export const PRICING_FAQ_ZENML: FaqData = {
  eyebrow: "ZenML",
  headline: "ZenML pricing, answered",
  items: [
    {
      question: "Can I self-host ZenML?",
      answer:
        "Yes. ZenML is open source and free to self-host; that's the Open Source plan. If you want the Pro control plane on your own infrastructure, Enterprise covers self-hosted and air-gapped deployment. Either way, ZenML stores only metadata: your data, artifacts and compute stay in your VPC end-to-end.",
    },
    {
      question: "How is the Scale plan billed?",
      answer:
        "By monthly pipeline executions per workspace. The slider on the Scale card above sets your tier, and projects and snapshots scale with it. Pick the tier that matches your run volume and move between tiers as you grow; there's no per-seat pricing.",
    },
    {
      question: "What happens if I exceed my plan's executions?",
      answer:
        "We don't cut you off mid-month. Going over occasionally is fine; if it becomes the pattern, we'll reach out about moving you up a tier.",
    },
    {
      question: "What's the difference between Open Source and the Pro plans?",
      answer:
        "Open Source is the full framework, managed by you. Scale and Enterprise add the managed control plane (automatic updates, guaranteed uptime) plus the Model Control Plane, Artifact Control Plane, snapshots and Codespaces. Enterprise adds SSO, custom-role RBAC, audit logs and air-gapped deployment on top.",
    },
    {
      question: "Is there a startup or academic discount?",
      answer:
        'Yes. Early-stage companies building ML-powered products, universities, research institutions and educational use cases can apply for special pricing on ZenML Pro. <a href="/startups-and-academics">Apply here</a>.',
    },
    {
      question: "How is my data handled?",
      answer:
        "ZenML is a metadata layer on top of your existing infrastructure: your data, artifacts and compute stay in your VPC, and only metadata reaches the control plane. ZenML is SOC 2 Type II and ISO/IEC 27001 certified.",
    },
    {
      question: "Do I need a separate subscription for Kitaru?",
      answer: `No, your ZenML subscription covers the Kitaru workspace too. Kitaru is priced on its own terms, a flat ${KITARU_CLOUD_PRICE}/month rather than execution tiers, but both workspaces run on the same control plane and land on one bill.`,
    },
    {
      question: "What kind of support is included in each plan?",
      answer:
        "Open Source: our public Slack and community forums. Scale: priority support with faster response times. Enterprise: a dedicated account manager, SLAs, and implementation assistance.",
    },
  ],
  slackCta: PRICING_FAQ_SLACK_CTA,
};

// ---------------------------------------------------------------------------
// Stats + Trust section
// ---------------------------------------------------------------------------
export const PRICING_STATS = {
  headline: "Trusted by 1,000s of members of top companies",
  deck: "Join the ZenML Community and start improving your AI workflows",
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
  body: "Enterprise-grade AI orchestration platform trusted by thousands of companies in production.",
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
