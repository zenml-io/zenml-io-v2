/**
 * Pricing page data — centralized marketing copy.
 *
 * Used by src/pages/pricing.astro.
 * One public price: three plan cards (Open Source / Starter / Enterprise),
 * one comparison table and one FAQ, no workspace toggle.
 */
import type {
  LabsBandContent,
  LabsCta,
  ProductDoorsContent,
} from "./labs-home";
import type {
  CtaLink,
  FaqData,
  PricingCompareTableData,
  PricingPlan,
} from "./marketingPageTypes";
import {
  KITARU_AGENT_DEFINITION,
  KITARU_CLOUD_PRICE,
  KITARU_LINKS,
  KITARU_STARTER_LIMITS,
  KITARU_TRIAL_DAYS,
  KITARU_VS_OBSERVABILITY_ANSWER,
} from "./productKitaru";
import { ZENML_LINKS } from "./productZenml";
import { defaultOgUrl } from "./seo";

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export const PRICING_SEO = {
  title: "Pricing - ZenML",
  description:
    "One plan, $39 a month: your AI engineer on one agent, one ZenML project and your whole team. Open source is free; more agents, projects and on-prem are a conversation.",
  ogTitle: "Pricing - ZenML",
  ogDescription:
    "One plan, $39 a month: your AI engineer on one agent, one ZenML project and your whole team.",
  ogImage: defaultOgUrl("pages", "pricing"),
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const PRICING_HERO = {
  eyebrow: "Pricing",
  headline: `One plan, ${KITARU_CLOUD_PRICE} a month`,
  deck: "Your AI engineer on one agent, one ZenML project, and your whole team. Need more, or on-prem? Talk to us.",
} as const;

/**
 * "What's included in Pro" block rendered below the comparison table. Two
 * cards — AI orchestration (ZenML side, purple) and Agent replay (Kitaru side,
 * orange) — each with three bullet pairings. Icons are inline SVG strings so
 * the card component stays declarative.
 */
export const PRICING_PRO_INCLUSIONS = {
  eyebrow: "What's included in Pro",
  headline: "Two products, one account",
  deck: "ZenML orchestrates your AI workflows. Your AI engineer and Kitaru keep your agents' evals honest. Same control plane underneath.",
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
      eyebrow: "Agent evals",
      title: "Your AI engineer",
      body: "Finds the evals you got wrong or never wrote, then replays your agent to test the fix. Priced per agent.",
      bullets: [
        {
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" /></svg>',
          title: "Insights from your traces",
          detail:
            "Finds wrong and missing evals, then turns your answers into checks.",
        },
        {
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="10" y1="15" x2="10" y2="9" /><line x1="14" y1="15" x2="14" y2="9" /></svg>',
          title: `${KITARU_CLOUD_PRICE} a month on Starter`,
          detail: "One agent and one ZenML project, one price.",
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
  caption:
    "Starter covers one agent and one ZenML project. Enterprise covers the rest.",
} as const;

/**
 * `PRICING_PRO_INCLUSIONS` reshaped onto `ProductDoorsContent` for the Labs
 * `ProductDoors` card — derived, never retyped. `eyebrow`/`deck`/`learn` are
 * dropped (one headline per band; the `learn` links leave the page per
 * CONVENTIONS liberty 8 — the nav's Products menu already carries them).
 */
export const PRICING_PRO_INCLUSIONS_DOORS: ProductDoorsContent = {
  headline: PRICING_PRO_INCLUSIONS.headline,
  caption: PRICING_PRO_INCLUSIONS.caption,
  doors: PRICING_PRO_INCLUSIONS.cards.map((card) => ({
    name: card.side === "zenml" ? "ZenML" : "Kitaru",
    tint: card.side === "zenml" ? "sage" : "orange",
    leadLine: card.title,
    body: card.body,
    details: card.bullets.map((b) => ({ title: b.title, detail: b.detail })),
    cta: card.cta as LabsCta,
  })),
};

// ---------------------------------------------------------------------------
// Plan cards: Open Source, Starter, Enterprise.
//
// One public price. Starter is one agent with the AI engineer on it plus one
// ZenML project; anything beyond that is a conversation (Enterprise). Prices
// and limits are interpolated from productKitaru.ts so a change is one line
// there.
// ---------------------------------------------------------------------------
const STARTER = KITARU_STARTER_LIMITS;

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "open-source",
    eyebrow: "Open Source",
    pill: "Self-hosted",
    subtitle: "Run it yourself",
    price: "Free",
    limitsLine: "Your infrastructure · Your limits",
    includesLabel: "Includes",
    features: [
      "ZenML and Kitaru, Apache 2.0",
      "Pipelines, agents and artifacts",
      "Import traces, review and checks",
      "Community support",
    ],
    cta: {
      label: "Get started",
      href: "/get-started",
      analytics: "Pricing-OSS-Get-Started",
    },
    ctaVariant: "secondary",
  },
  {
    id: "starter",
    eyebrow: "Starter",
    pill: "SaaS",
    topBadge: `${KITARU_TRIAL_DAYS}-day free trial`,
    highlighted: true,
    subtitle: "For startups shipping their first agent",
    price: KITARU_CLOUD_PRICE,
    priceSuffix: "/month",
    limitsLine: `${STARTER.agents} agent · ${STARTER.zenmlProjects} ZenML project · Unlimited seats`,
    includesLabel: "Everything in Open Source, plus",
    features: [
      "Your AI engineer on one agent",
      "Finds wrong and missing evals",
      "An interview and a weekly review",
      "Hosted ZenML and Kitaru",
    ],
    cta: {
      label: KITARU_LINKS.signup.label,
      href: KITARU_LINKS.signup.href,
      analytics: "Pricing-Starter-Signup",
    },
    ctaVariant: "primary",
  },
  {
    id: "enterprise",
    eyebrow: "Enterprise",
    pill: "Your cloud or on-prem",
    subtitle: "For more agents, more projects or regulated data",
    price: "Custom",
    limitsLine: "More agents · More projects · More workspaces",
    includesLabel: "Everything in Starter, plus",
    features: [
      "On-prem or air-gapped",
      "Your own LLM endpoint",
      "SSO, SCIM, custom roles and audit logs",
      "SLA and a named engineer",
    ],
    cta: {
      label: "Talk to us",
      href: "/book-your-demo",
      analytics: "Pricing-Enterprise-Talk",
    },
    ctaVariant: "secondary",
  },
];

/** The line under the plan cards. */
export const PRICING_PLAN_NOTE = `${KITARU_AGENT_DEFINITION} Starter covers one agent and one ZenML project. Need more? Talk to us.`;

// ---------------------------------------------------------------------------
// Comparison table
// ---------------------------------------------------------------------------
export const PRICING_COMPARE: PricingCompareTableData = {
  heading: "Compare every plan",
  subheading: `One price, unlimited seats. ${KITARU_TRIAL_DAYS}-day trial, no credit card.`,
  columnHeaders: ["Open Source", "Starter", "Enterprise"],
  sections: [
    {
      heading: "Plan",
      rows: [
        {
          feature: "Price",
          values: ["Free", `${KITARU_CLOUD_PRICE} / month`, "Custom"],
        },
        {
          feature: "Agents with your AI engineer",
          values: ["—", `${STARTER.agents}`, "Custom"],
        },
        {
          feature: "ZenML projects",
          values: ["Self-hosted", `${STARTER.zenmlProjects}`, "Custom"],
        },
        {
          feature: "Workspaces",
          values: ["Self-hosted", `${STARTER.workspaces}`, "Custom"],
        },
        {
          feature: "Pipeline runs a month",
          values: ["Self-hosted", `${STARTER.pipelineRuns}`, "Custom"],
        },
      ],
    },
    {
      heading: "Your AI engineer",
      rows: [
        {
          feature: "Finds wrong and missing evals",
          values: [false, true, true],
        },
        {
          feature: "An interview and a weekly review",
          values: [false, true, true],
        },
        {
          feature: "Findings and reviews in Slack",
          values: [false, true, true],
        },
      ],
    },
    {
      heading: "Agents, with Kitaru",
      rows: [
        {
          feature: "Import traces from your tracing tool",
          values: [true, true, true],
        },
        {
          feature: "Reviews, checks and replays",
          values: [true, true, true],
        },
        { feature: "Hosted dashboard", values: [false, true, true] },
      ],
    },
    {
      heading: "AI orchestration, with ZenML",
      rows: [
        {
          feature: "Pipeline and agent orchestration",
          values: [true, true, true],
        },
        {
          feature: "Artifacts and model registry",
          values: [true, true, true],
        },
        {
          feature: "Model Control Plane",
          link: "https://docs.zenml.io/concepts/models",
          values: [false, true, true],
        },
        {
          feature: "Snapshots",
          link: "https://docs.zenml.io/concepts/snapshots",
          values: [false, true, true],
        },
        { feature: "Codespaces (remote IDE)", values: [false, false, true] },
      ],
    },
    {
      heading: "Deployment and governance",
      rows: [
        { feature: "On-prem or air-gapped", values: [true, false, true] },
        {
          feature: "Your own LLM endpoint for the AI engineer",
          values: [false, false, true],
        },
        { feature: "SSO (SAML / OIDC) and SCIM", values: [false, false, true] },
        {
          feature: "RBAC (custom roles)",
          link: "https://docs.zenml.io/pro/access-management/roles",
          values: [false, false, true],
        },
        { feature: "Audit logs", values: [false, false, true] },
      ],
    },
    {
      heading: "Support",
      rows: [
        {
          feature: "Support level",
          values: ["Community", "Email", "Dedicated + SLA"],
        },
      ],
    },
  ],
  // Derived from PRICING_PLANS so the per-plan CTA is the single source of truth.
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
  body: "ZenML stores only metadata, so your data and compute stay in your cloud. Your AI engineer reads traces through keys you can revoke, or runs inside your cloud on Enterprise.",
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
  bannerEyebrow: "SOC 2 Type II and ISO 27001",
  bannerBody:
    "ZenML holds a SOC 2 Type II report and ISO 27001 certification, independently audited for security, availability and confidentiality.",
} as const;

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export const PRICING_FAQ_SLACK_CTA: CtaLink = {
  label: "Still not clear? Ask us on Slack",
  href: "/slack",
  external: true,
};

export const PRICING_FAQ: FaqData = {
  eyebrow: "Pricing",
  headline: "Pricing, answered",
  items: [
    {
      question: `What do I get for ${KITARU_CLOUD_PRICE}?`,
      answer: `One agent with your AI engineer on it, one ZenML project with up to ${STARTER.pipelineRuns} pipeline runs a month, and as many seats as you want. It starts with a ${KITARU_TRIAL_DAYS}-day trial, no credit card.`,
    },
    {
      question: "What counts as an agent?",
      answer: `${KITARU_AGENT_DEFINITION} A LangGraph app with three sub-agents that ships as one product is one agent.`,
    },
    {
      question: "Is there a limit on sessions?",
      answer:
        "No. Your AI engineer reads every session your agent sends. Replays run with your own model keys, so those model costs stay on your bill.",
    },
    {
      question: "What if we need more agents, projects or runs?",
      answer:
        "Talk to us. Enterprise covers more agents, more ZenML projects and more pipeline runs, priced on what you actually run, along with on-prem and governance if you need them.",
    },
    {
      question: "Why not per seat?",
      answer:
        "Because everyone who knows what good looks like should be in it: engineers, product, and the domain experts who review sessions. A team of fifteen pays the same as a team of two.",
    },
    {
      question: `What happens after the ${KITARU_TRIAL_DAYS}-day trial?`,
      answer:
        "The trial is full access and needs no credit card. When it ends, add a card to keep going. Nothing in your workspace changes except the billing. Open source stays free, forever.",
    },
    {
      question: "Do you see my traces?",
      answer:
        "On Starter, your AI engineer runs in our cloud and reads traces from your tracing tool through keys you can revoke. ZenML stores only metadata; your data, artifacts and compute stay in your cloud. Self-hosted or on Enterprise on-prem, nothing leaves your infrastructure.",
    },
    {
      question: "Can we run it on-prem?",
      answer:
        "Yes, on Enterprise. Your AI engineer and ZenML run inside your own cloud or on-prem, air-gapped if you need it, with your own LLM endpoint.",
    },
    {
      question: "How is this different from Langfuse, Braintrust or LangSmith?",
      answer: KITARU_VS_OBSERVABILITY_ANSWER,
    },
    {
      question: "Is there a startup or academic discount?",
      answer:
        'Yes. Early-stage companies, universities and research institutions can apply for special pricing. <a href="/startups-and-academics">Apply here</a>.',
    },
  ],
  slackCta: PRICING_FAQ_SLACK_CTA,
};
// ---------------------------------------------------------------------------
// Close
// ---------------------------------------------------------------------------
/** The Labs closing band for `/pricing`. */
export const PRICING_CLOSE: LabsBandContent = {
  headlineLines: ["Start with one agent", "and your whole team"],
  deck: `Your AI engineer reads your traces next to your evals and shows you what they miss. ${KITARU_TRIAL_DAYS}-day trial, no credit card.`,
  cta: {
    label: KITARU_LINKS.signup.label,
    href: KITARU_LINKS.signup.href,
    analytics: "Pricing-Final-Signup",
  },
};
