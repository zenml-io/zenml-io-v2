/**
 * Pricing page data — centralized marketing copy.
 *
 * Used by src/pages/pricing.astro.
 * Content extracted from Webflow HTML snapshot + SEO baseline.
 */
import type {
  FaqData,
  CtaLink,
  PricingTab,
  PricingPlan,
  PricingCompareTableData,
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
  headline: "Ship ML pipelines with confidence",
  deck: "Predictable, transparent pricing that scales with value.",
} as const;

// ---------------------------------------------------------------------------
// Self-Hosted plans
// ---------------------------------------------------------------------------
const SELF_HOSTED_OSS: PricingPlan = {
  name: "Open Source",
  subtitle: "For small teams",
  price: "Free",
  priceSuffix: "Self-hosted, forever",
  limits: [
    { label: "pipeline runs", value: "Unlimited" },
    { label: "projects & snapshots", value: "Unlimited" },
    { label: "support", value: "Community" },
  ],
  features: [
    "Core pipeline orchestration",
    "Basic dashboard",
    "CLI-based service connectors",
    "Basic model registry",
    "Self-managed infrastructure",
  ],
  cta: { label: "Get Started", href: "/get-started" },
  ctaVariant: "secondary",
};

const SELF_HOSTED_PRO: PricingPlan = {
  name: "Pro Self-Hosted",
  subtitle: "For Enterprise",
  price: "Custom",
  priceSuffix: "Annual contract",
  badge: "Enterprise",
  limits: [
    { label: "pipeline runs", value: "Unlimited" },
    { label: "projects & snapshots", value: "Unlimited" },
    { label: "dedicated support", value: "24/7" },
  ],
  featuresPrefix: "Everything in OSS, plus:",
  features: [
    "Model Control Plane (UI access)",
    "Artifact Control Plane (UI access)",
    "Snapshots for environment versioning",
    "Advanced Native Scheduling",
    "Resource Management & Queueing",
    "Codespaces (remote IDE sessions)",
    "Advanced RBAC with fine-grained permissions",
    "Modern Server Side Dashboard",
    "SSO (SAML/OIDC)",
    "Air-gapped deployment support",
    "Priority support + custom SLA",
  ],
  comingSoon: ["Advanced Native Scheduling", "Resource Management & Queueing"],
  cta: { label: "Talk to Sales", href: "/book-your-demo" },
  ctaVariant: "primary",
  secondaryLink: {
    label: "Or talk to an engineer about deployment",
    href: "/open-source-vs-pro",
  },
};

const SELF_HOSTED_COMPARE: PricingCompareTableData = {
  columnHeaders: ["Open Source", "Pro Self-Hosted"],
  sections: [
    {
      heading: "Feature",
      rows: [
        { feature: "Price", values: ["Free", "Custom"] },
        { feature: "Pipeline Runs", values: ["Unlimited", "Unlimited"] },
      ],
    },
    {
      heading: "Core Features",
      rows: [
        { feature: "Pipeline Orchestration", values: [true, true] },
        { feature: "Artifact Management", values: [true, true] },
        { feature: "Basic Dashboard", values: [true, true] },
        { feature: "Model Registry (Basic)", values: [true, true] },
      ],
    },
    {
      heading: "Deployment & Security",
      rows: [
        {
          feature: "Model Control Plane",
          link: "https://docs.zenml.io/concepts/models",
          values: [false, true],
        },
        {
          feature: "Artifact Control Plane",
          link: "https://docs.zenml.io/concepts/dashboard-features",
          values: [false, true],
        },
        {
          feature: "Snapshots",
          link: "https://docs.zenml.io/concepts/snapshots",
          values: [false, true],
        },
        { feature: "Advanced Native Scheduling", values: [false, "COMING SOON"] },
        { feature: "Webhooks & Triggers", values: [false, true] },
        { feature: "Resource Management & Queueing", values: [false, "COMING SOON"] },
        { feature: "Codespaces (Remote IDE)", values: [false, true] },
        {
          feature: "Modern Server Side Dashboard",
          link: "https://docs.zenml.io/concepts/dashboard-features",
          values: [false, true],
        },
      ],
    },
    {
      heading: "Security & Access",
      rows: [
        { feature: "SSO (SAML/OIDC)", values: [false, true] },
        {
          feature: "RBAC (Standard Roles)",
          link: "https://docs.zenml.io/pro/access-management/roles",
          values: ["Basic", true],
        },
        {
          feature: "RBAC (Custom Roles)",
          link: "https://docs.zenml.io/pro/access-management/roles",
          values: [false, true],
        },
        { feature: "Air-gapped Deployment", values: ["Limited", true] },
      ],
    },
    {
      heading: "Support",
      rows: [
        { feature: "Support Level", values: ["Community", "24/7 Priority + SLA"] },
      ],
    },
  ],
  ctaButtons: [
    { label: "Get Started", href: "/get-started" },
    { label: "Talk to Sales", href: "/book-your-demo" },
  ],
};

// ---------------------------------------------------------------------------
// SaaS plans
// ---------------------------------------------------------------------------
const SAAS_STARTER: PricingPlan = {
  name: "Starter",
  subtitle: "For small teams",
  price: "$399",
  priceSuffix: "/month",
  limits: [
    { label: "pipeline runs", value: "500" },
    { label: "project", value: "1" },
    { label: "snapshot", value: "1" },
  ],
  features: [
    "Model Control Plane",
    "Artifact Control Plane",
    "1 workspace",
    "Unlimited team members",
    "Basic support",
  ],
  cta: { label: "Book a Demo", href: "/book-your-demo" },
  ctaVariant: "secondary",
};

const SAAS_GROWTH: PricingPlan = {
  name: "Growth",
  subtitle: "For growing teams",
  price: "$999",
  priceSuffix: "/month",
  badge: "Most Popular",
  limits: [
    { label: "pipeline runs", value: "2,000" },
    { label: "projects", value: "3" },
    { label: "snapshots", value: "5" },
  ],
  featuresPrefix: "Everything in Starter, plus:",
  features: [
    "Advanced Native Scheduling",
    "Webhooks & Triggers",
    "Priority support",
  ],
  cta: { label: "Book a Demo", href: "/book-your-demo" },
  ctaVariant: "primary",
};

const SAAS_SCALE: PricingPlan = {
  name: "Scale",
  subtitle: "For scaling teams",
  price: "$2,499",
  priceSuffix: "/month",
  limits: [
    { label: "pipeline runs", value: "5,000" },
    { label: "projects", value: "10" },
    { label: "snapshots", value: "20" },
  ],
  featuresPrefix: "Everything in Growth, plus:",
  features: [
    "Resource Management & Queueing",
    "Codespaces (Remote IDE)",
    "Priority support",
  ],
  cta: { label: "Book a Demo", href: "/book-your-demo" },
  ctaVariant: "primary",
};

const SAAS_ENTERPRISE: PricingPlan = {
  name: "Enterprise",
  subtitle: "For organizations",
  price: "Custom",
  limits: [
    { label: "pipeline runs", value: "Unlimited" },
    { label: "projects", value: "Unlimited" },
    { label: "snapshots", value: "Unlimited" },
  ],
  featuresPrefix: "Everything in Scale, plus:",
  features: [
    "SSO (SAML/OIDC)",
    "RBAC (Custom Roles)",
    "Audit Logs",
    "Regional Deployment",
    "On-prem / Hybrid",
    "SOC2 & GDPR",
    "Professional Services",
    "Dedicated support + SLA",
  ],
  cta: { label: "Book a Demo", href: "/book-your-demo" },
  ctaVariant: "primary",
};

const SAAS_COMPARE: PricingCompareTableData = {
  columnHeaders: ["Starter", "Growth", "Scale", "Enterprise"],
  sections: [
    {
      heading: "Feature",
      rows: [
        { feature: "Price", values: ["$399/mo", "$999/mo", "$2,499/mo", "Custom"] },
        { feature: "Pipeline Runs/mo", values: ["500", "2,000", "5,000", "Unlimited"] },
        { feature: "Projects", values: ["1", "3", "10", "Unlimited"] },
        {
          feature: "Snapshots",
          link: "https://docs.zenml.io/concepts/snapshots",
          values: ["1", "5", "20", "Unlimited"],
        },
        { feature: "Workspaces", values: ["1", "1", "1", "Custom"] },
        { feature: "Team members", values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
      ],
    },
    {
      heading: "Pro Platform Features",
      rows: [
        { feature: "Model Control Plane", values: [true, true, true, true] },
        { feature: "Artifact Control Plane", values: [true, true, true, true] },
        { feature: "RBAC (Standard Roles)", values: [true, true, true, true] },
      ],
    },
    {
      heading: "Advanced Features",
      rows: [
        { feature: "Advanced Native Scheduling", values: [false, "COMING SOON", "COMING SOON", "COMING SOON"] },
        { feature: "Webhooks & Triggers", values: [false, "COMING SOON", "COMING SOON", "COMING SOON"] },
        { feature: "Resource Management & Queueing", values: [false, false, "COMING SOON", "COMING SOON"] },
        { feature: "Codespaces (Remote IDE)", values: [false, false, "COMING SOON", "COMING SOON"] },
      ],
    },
    {
      heading: "Enterprise Features",
      rows: [
        { feature: "SSO (SAML/OIDC)", values: [false, false, false, true] },
        { feature: "RBAC (Custom Roles)", values: [false, false, false, true] },
        { feature: "Audit Logs", values: [false, false, false, true] },
        { feature: "Regional Deployment", values: [false, false, false, true] },
        { feature: "On-prem / Hybrid", values: [false, false, false, true] },
        {
          feature: "SOC2 & GDPR",
          link: "https://security.zenml.io/",
          values: [false, false, false, true],
        },
        { feature: "Professional Services", values: [false, false, false, "Workshops & Architecture Reviews"] },
      ],
    },
    {
      heading: "Support",
      rows: [
        { feature: "Support Level", values: ["Basic", "Priority", "Priority", "Dedicated + SLA"] },
      ],
    },
  ],
  ctaButtons: [
    { label: "Talk to Sales", href: "/book-your-demo" },
    { label: "Talk to Sales", href: "/book-your-demo" },
    { label: "Talk to Sales", href: "/book-your-demo" },
    { label: "Talk to Sales", href: "/book-your-demo" },
  ],
};

// ---------------------------------------------------------------------------
// Tabs (exported)
// ---------------------------------------------------------------------------
const INFO_BLOCK =
  'Your pipeline artifacts and data never touch ZenML infrastructure \u2014 even with SaaS, everything stays in your cloud. Self-hosted is only needed for air-gapped environments or full control over the control plane. <a href="https://docs.zenml.io/pro/system-architecture#where-data-lives" target="_blank" rel="noopener noreferrer">Learn where data lives</a>.';

export const PRICING_TABS: readonly PricingTab[] = [
  {
    label: "Self-Hosted",
    plans: [SELF_HOSTED_OSS, SELF_HOSTED_PRO],
    infoBlock: INFO_BLOCK,
    compareTable: SELF_HOSTED_COMPARE,
  },
  {
    label: "SaaS",
    plans: [SAAS_STARTER, SAAS_GROWTH, SAAS_SCALE, SAAS_ENTERPRISE],
    infoBlock: INFO_BLOCK,
    compareTable: SAAS_COMPARE,
  },
];

// ---------------------------------------------------------------------------
// Startup / Academic banner
// ---------------------------------------------------------------------------
export const PRICING_STARTUP_BANNER = {
  headline: "Are you startup or academic?",
  body: "Apply for a special price to access ZenML Pro features for early-stage companies building ML-powered products, universities, research institutions, and educational use cases.",
  cta: { label: "Apply Now", href: "/startups-and-academics" } as CtaLink,
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
      question: "What happens if I exceed my plan\u2019s limits?",
      answer:
        "We don\u2019t abruptly cut you off. If you occasionally exceed your plan\u2019s limits, we\u2019ll notify you and suggest an upgrade if the pattern continues. For consistent overages, upgrading to the next tier ensures you get the best value.",
    },
    {
      question: "Can I self-host ZenML?",
      answer:
        "Yes! ZenML is open source and can be self-hosted on your own infrastructure completely free. This is separate from our managed Community and Basic plans. If you need enterprise features or support for your self-hosted deployment, our Scale plan can accommodate that as well. ZenML uses industry-standard encryption for all data in-transit and at rest. The data is stored on AWS regions in Europe, and a strict backup policy is maintained for all client data. ZenML only stores metadata \u2014 and no actual data is kept anywhere on our servers. Data and compute stays on the VPC of the customer.",
    },
    {
      question: "How do Run Template Triggers work?",
      answer:
        "Run Template Triggers allow you to automate pipeline runs based on events or schedules. The Community plan includes 5 triggers, while the Team plan includes 50, enabling more complex automation workflows for production environments.",
    },
    {
      question:
        "What\u2019s the difference between the managed plans and the open source version?",
      answer:
        'The open source version gives you complete control but requires you to manage your own infrastructure. Our managed plans (Community and Team) provide a fully hosted environment, automatic updates, guaranteed uptime, and dedicated support. It also includes pro-only features like run templates, model control plane, and RBAC. The Scale plan offers enterprise features on top of either option.',
    },
    {
      question: "What kind of support is included in each plan?",
      answer:
        "The Community plan includes access to our public Slack channel and community forums. The Team plan adds dedicated Slack support with faster response times. Scale plans include a dedicated account manager, priority support with SLAs, and implementation assistance.",
    },
  ],
  slackCta: {
    label: "Still not clear? Ask us on Slack",
    href: "https://zenml.io/slack",
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
    name: "Harold Gim\u00e9nez",
    title: "SVP R&D at HashiCorp",
    avatar: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/31a5f8ee/653297b0b924af52998661bf_harold.webp`,
    companyLogo: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/33303c0d/6532977ff6458771fb59387e_hashicorp.webp`,
  },
  logos: [
    { src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/da72cb24/652d3ecd4d162d2290427dfe_airbus_defence_space.png`, alt: "Airbus" },
    { src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/4ae61c3a/66c84308916684f0d07b57ff_axa-min.svg`, alt: "AXA" },
    { src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/5cc09160/bundeswehr.svg`, alt: "Bundeswehr" },
    { src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/4ad1f760/66c84308b1e802ab9a246134_enel-min.svg`, alt: "Enel" },
    { src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/b6111e84/jetbrains-min.svg`, alt: "JetBrains" },
    { src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/cb7581f5/652d3e5d29d36f927c2bb623_brevo.webp`, alt: "Brevo" },
    { src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/86cd6b7b/cross-screen-media.png`, alt: "Cross Screen Media" },
    { src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/c110367c/65c498032806e2ff7daec2bf_ADEO.svg`, alt: "ADEO" },
    { src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/356e9829/65c49832a235dab4e3e0a3ce_leroy-merlin.svg`, alt: "Leroy Merlin" },
    { src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/859309b9/652d3ecc040ac25a545c508f_rivian.png`, alt: "Rivian" },
    { src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/cab0c1be/66c84308abf004bb1934e7d3_mann-hummel-min.svg`, alt: "Mann+Hummel" },
    { src: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/e6c1fbb1/koble.svg`, alt: "Koble" },
  ],
} as const;

// ---------------------------------------------------------------------------
// Final CTA
// ---------------------------------------------------------------------------
export const PRICING_FINAL_CTA = {
  headline: "Start deploying reproducible AI workflows today",
  body: "Enterprise-grade MLOps platform trusted by thousands of companies in production.",
  primaryCta: { label: "Book a Demo", href: "/book-your-demo" } as CtaLink,
  secondaryCta: { label: "Use Open Source", href: "https://cloud.zenml.io" } as CtaLink,
} as const;
