/**
 * Pricing page data — centralized marketing copy.
 *
 * Used by src/pages/pricing.astro.
 * Structure mirrors the unified pricing design: three plan cards
 * (Open Source / Scale / Enterprise) and a single comparison table.
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
  KITARU_EXTRA_AGENT_PRICE,
  KITARU_LINKS,
  KITARU_PLAN_LIMITS,
  KITARU_TEAM_PRICE,
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
    "Priced per agent, not per seat. Your AI engineer starts at $39 a month for one agent, with your whole team included. Open source is free; on-prem is priced with you.",
  ogTitle: "Pricing - ZenML",
  ogDescription:
    "Priced per agent, not per seat. Your AI engineer starts at $39 a month for one agent, with your whole team included.",
  ogImage: defaultOgUrl("pages", "pricing"),
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const PRICING_HERO = {
  eyebrow: "Pricing",
  headline: "Priced per agent, not per seat",
  deck: `Your whole team, one agent, ${KITARU_CLOUD_PRICE} a month. Add agents as you ship them. On-prem for regulated teams, priced with you.`,
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
          title: "Sessions, cohorts, evaluators, experiments",
          detail: "The whole replay loop, imports and scoring included.",
        },
        {
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="10" y1="15" x2="10" y2="9" /><line x1="14" y1="15" x2="14" y2="9" /></svg>',
          title: `From ${KITARU_CLOUD_PRICE} a month, per agent`,
          detail: "Your AI engineer, replays and experiments included.",
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
    "One account and one bill. ZenML is priced by pipeline runs, agents per agent.",
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
// Agent plans: the AI engineer on Kitaru.
//
// Priced per agent, never per seat: open source free, two hosted SaaS plans
// with public prices, and Enterprise (on-prem, your cloud) behind a
// conversation. Prices, limits and the agent definition are interpolated
// from productKitaru.ts so a change is one line there.
// ---------------------------------------------------------------------------
const STARTER = KITARU_PLAN_LIMITS.starter;
const TEAM = KITARU_PLAN_LIMITS.team;

export const PRICING_PLANS_KITARU: PricingPlan[] = [
  {
    id: "kitaru-open-source",
    eyebrow: "Open Source",
    pill: "Self-hosted",
    subtitle: "Run it yourself",
    price: "Free",
    limitsLine: "Your infrastructure · Your limits",
    includesLabel: "Includes",
    features: [
      "Kitaru and ZenML, Apache 2.0",
      "Import traces and evals without limits",
      "Cohorts, evaluators and replays",
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
    id: "kitaru-starter",
    eyebrow: "Starter",
    pill: "SaaS",
    topBadge: `${KITARU_TRIAL_DAYS}-day free trial`,
    subtitle: "For your first agent in production",
    price: KITARU_CLOUD_PRICE,
    priceSuffix: "/month",
    limitsLine: `${STARTER.agents} agent · Unlimited seats · ${STARTER.sessions} sessions read a month`,
    includesLabel: "Everything in Open Source, plus",
    features: [
      "Your AI engineer on one agent",
      "Finds wrong and missing evals",
      "A short interview and a weekly review",
      "Hosted Kitaru, replays included",
    ],
    cta: {
      label: KITARU_LINKS.signup.label,
      href: KITARU_LINKS.signup.href,
      analytics: "Kitaru-Starter-Signup",
    },
    ctaVariant: "secondary",
  },
  {
    id: "kitaru-team",
    eyebrow: "Team",
    pill: "SaaS",
    topBadge: `${KITARU_TRIAL_DAYS}-day free trial`,
    highlighted: true,
    subtitle: "For startups shipping several agents",
    price: KITARU_TEAM_PRICE,
    priceSuffix: "/month",
    limitsLine: `${TEAM.agents} agents · Unlimited seats · ${TEAM.sessions} sessions read a month`,
    includesLabel: "Everything in Starter, plus",
    features: [
      `More agents at ${KITARU_EXTRA_AGENT_PRICE} a month each`,
      "Findings and reviews in Slack",
      `${TEAM.retentionDays}-day session retention`,
      "Priority support",
    ],
    cta: {
      label: KITARU_LINKS.signup.label,
      href: KITARU_LINKS.signup.href,
      analytics: "Kitaru-Team-Signup",
    },
    ctaVariant: "primary",
  },
  {
    id: "kitaru-enterprise",
    eyebrow: "Enterprise",
    pill: "On-prem",
    subtitle: "For regulated teams",
    price: "Custom",
    limitsLine: "Your cloud or on-prem · Unlimited agents",
    includesLabel: "Everything in Team, plus",
    features: [
      "On-prem or air-gapped deployment",
      "Your own LLM endpoint",
      "SSO, SCIM and audit logs",
      "SLA and a named engineer",
    ],
    cta: {
      label: "Talk to us",
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
// by execution tiers, while agents are priced per agent. Showing
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
    label: "Your AI engineer",
    sublabel: "Agents and evals",
    note: `Priced per agent, never per seat. ${KITARU_AGENT_DEFINITION} Every hosted plan starts with a ${KITARU_TRIAL_DAYS}-day trial, no credit card.`,
    learn: { label: "How it works", href: "/" },
    plans: PRICING_PLANS_KITARU,
    /** Drives the Labs plan cards' highlighted-card border/pill and check icons. */
    accent: "orange",
  },
  {
    id: "zenml",
    label: "ZenML workspace",
    sublabel: "AI orchestration",
    note: "Executions are ZenML pipeline runs. Agents have their own per-agent price on the same account and bill.",
    learn: { label: "Learn about ZenML", href: "/product/zenml" },
    plans: PRICING_PLANS,
    accent: "sage",
  },
] as const;

/** One `/pricing` workspace panel (Kitaru or ZenML). */
export type PricingWorkspace = (typeof PRICING_PLAN_WORKSPACES)[number];

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
// Per-agent framing: seats are unlimited everywhere, so the table's job is
// to show what each step up adds, from self-hosted to on-prem.
export const PRICING_COMPARE_KITARU: PricingCompareTableData = {
  heading: "Compare every plan",
  subheading: `Per agent, never per seat. ${KITARU_TRIAL_DAYS}-day trial on every hosted plan.`,
  columnHeaders: ["Open Source", "Starter", "Team", "Enterprise"],
  sections: [
    {
      heading: "Plan",
      rows: [
        {
          feature: "Price",
          values: [
            "Free",
            `${KITARU_CLOUD_PRICE} / month`,
            `${KITARU_TEAM_PRICE} / month`,
            "Custom",
          ],
        },
        {
          feature: "Agents",
          values: [
            "Self-hosted",
            `${STARTER.agents}`,
            `${TEAM.agents}, then ${KITARU_EXTRA_AGENT_PRICE} each`,
            "Unlimited",
          ],
        },
        {
          feature: "Seats",
          values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"],
        },
        {
          feature: "Sessions your AI engineer reads a month",
          values: ["—", STARTER.sessions, TEAM.sessions, "Custom"],
        },
        {
          feature: "Session retention",
          values: [
            "Self-hosted",
            `${STARTER.retentionDays} days`,
            `${TEAM.retentionDays} days`,
            "Custom",
          ],
        },
      ],
    },
    {
      heading: "Your AI engineer",
      rows: [
        {
          feature: "Finds wrong and missing evals",
          values: [false, true, true, true],
        },
        {
          feature: "Short interview and weekly review",
          values: [false, true, true, true],
        },
        {
          feature: "Findings and reviews in Slack",
          values: [false, false, true, true],
        },
      ],
    },
    {
      heading: "Kitaru on every plan",
      rows: [
        {
          feature: "Import traces and evals from your tracing tool",
          values: [true, true, true, true],
        },
        {
          feature: "Cohorts, evaluators and replays",
          values: [true, true, true, true],
        },
        {
          feature: "Replays with your own model keys",
          values: [true, true, true, true],
        },
        {
          feature: "Hosted dashboard",
          values: [false, true, true, true],
        },
      ],
    },
    {
      heading: "Deployment and governance",
      rows: [
        {
          feature: "On-prem or air-gapped",
          values: [true, false, false, true],
        },
        {
          feature: "Your own LLM endpoint for the AI engineer",
          values: [false, false, false, true],
        },
        {
          feature: "SSO (SAML / OIDC) and SCIM",
          values: [false, false, false, true],
        },
        { feature: "Audit logs", values: [false, false, false, true] },
      ],
    },
    {
      heading: "Support",
      rows: [
        {
          feature: "Support level",
          values: ["Community", "Community", "Priority", "Dedicated + SLA"],
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

/** Kitaru-workspace FAQ — shown when the pricing toggle is on Kitaru. */
export const PRICING_FAQ_KITARU: FaqData = {
  eyebrow: "Agents",
  headline: "Agent pricing, answered",
  items: [
    {
      question: "What counts as an agent?",
      answer: `${KITARU_AGENT_DEFINITION} A LangGraph app with three sub-agents that ships as one product is one agent. Starter covers one, Team covers ${TEAM.agents}, and each one after that is ${KITARU_EXTRA_AGENT_PRICE} a month. Three teams with one agent each fit in Team at ${KITARU_TEAM_PRICE} a month.`,
    },
    {
      question: "Why per agent and not per seat?",
      answer:
        "Because everyone who knows what good looks like should be in it: engineers, product, and the domain experts who review sessions. A team of fifteen pays the same as a team of two.",
    },
    {
      question: "Does the AI engineer cost extra?",
      answer: `No. It's included on every hosted plan, up to the sessions it reads each month (${STARTER.sessions} on Starter, ${TEAM.sessions} on Team). Replays run with your own model keys, so those model costs stay on your bill, not ours.`,
    },
    {
      question: "What if we go over the sessions it reads?",
      answer:
        "Nothing stops. Your AI engineer keeps reading a sample, and we'll tell you when the next plan makes sense.",
    },
    {
      question: `What happens after the ${KITARU_TRIAL_DAYS}-day trial?`,
      answer:
        "The trial is full access and needs no credit card. When it ends, add a card and pick a plan. Nothing in your workspace changes except the billing. The open-source version stays free, forever.",
    },
    {
      question: "Can we run it on-prem?",
      answer:
        "Yes, on Enterprise. Your AI engineer runs inside your own cloud or on-prem, air-gapped if you need it, and can call your own LLM endpoint. It's priced with you, based on agents and deployment.",
    },
    {
      question: "Do you see my traces?",
      answer:
        "On hosted plans, your AI engineer runs in our cloud and reads traces from your tracing tool through keys you can revoke. Replays run on your own workers with your own keys. Self-hosted or on Enterprise on-prem, nothing leaves your infrastructure.",
    },
    {
      question: "How is this different from Langfuse, Braintrust or LangSmith?",
      answer: KITARU_VS_OBSERVABILITY_ANSWER,
    },
    {
      question: "Do I need a separate subscription for ZenML?",
      answer:
        "No. One account and one bill cover both. ZenML is priced by pipeline runs and agents per agent, so you only pay for the side you use.",
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
        "ZenML is a metadata layer on top of your existing infrastructure: your data, artifacts and compute stay in your VPC, and only metadata reaches the control plane. ZenML holds a SOC 2 Type II report and ISO/IEC 27001 certification.",
    },
    {
      question: "Do I need a separate subscription for Kitaru?",
      answer: `No. One account and one bill cover both. ZenML is priced by pipeline runs and agents per agent, from ${KITARU_CLOUD_PRICE} a month, so you only pay for the side you use.`,
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
      src: "/images/logos/brevo.svg",
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
      src: "/images/logos/leroy-merlin.svg",
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

/**
 * The Labs closing band for `/pricing` — `PRICING_FINAL_CTA`'s words, split
 * into the two-line shape `LabsCloseCta` takes. `secondaryCta`
 * ("Read Docs") leaves the page (CONVENTIONS.md liberty 17) — the nav's
 * Docs menu already carries it.
 */
export const PRICING_CLOSE: LabsBandContent = {
  headlineLines: ["Start with one agent", "and your whole team"],
  deck: `Your AI engineer reads your traces next to your evals and shows you what they miss. ${KITARU_TRIAL_DAYS}-day trial, no credit card.`,
  cta: {
    label: KITARU_LINKS.signup.label,
    href: KITARU_LINKS.signup.href,
    analytics: "Pricing-Final-Signup",
  },
};

// ---------------------------------------------------------------------------
// Price strip — the agent plans in one row, for pages outside /pricing
// (labs.price-strip). Derived from PRICING_PLANS_KITARU, never retyped.
// ---------------------------------------------------------------------------
export interface PriceStripPlan {
  name: string;
  price: string;
  suffix?: string;
  line: string;
  highlighted: boolean;
}

export interface PriceStripContent {
  eyebrow: string;
  headline: string;
  deck: string;
  plans: readonly PriceStripPlan[];
  link: LabsCta;
}

/** The strip for one placement; `placement` prefixes the analytics event. */
export function priceStrip(placement: string): PriceStripContent {
  return {
    eyebrow: PRICING_HERO.eyebrow,
    headline: PRICING_HERO.headline,
    deck: PRICING_HERO.deck,
    plans: PRICING_PLANS_KITARU.map((plan) => ({
      name: plan.eyebrow,
      price: plan.price,
      suffix: plan.priceSuffix,
      line: plan.limitsLine ?? plan.subtitle,
      highlighted: plan.highlighted === true,
    })),
    link: {
      label: "Compare plans",
      href: "/pricing",
      analytics: `${placement}-Pricing-Compare`,
    },
  };
}
