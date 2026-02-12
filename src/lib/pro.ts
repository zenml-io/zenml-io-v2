/**
 * ZenML Pro page data — centralized marketing copy.
 *
 * Used by src/pages/pro.astro.
 * Content extracted from Webflow HTML snapshot + SEO baseline.
 */
import type { HeroData, FaqData, CtaLink, FeatureGridItem } from "./marketingPageTypes";

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export const PRO_SEO = {
  title: "Managed MLOps for your Cloud - ZenML Pro",
  description:
    "Supercharge your MLOps with a fully-managed control plane. Forget the infrastructure setup and security concerns. Get a single pane of glass view into your entire organization.",
  ogTitle: "Managed MLOps for your Cloud - ZenML Pro",
  ogDescription:
    "Supercharge your MLOps with a fully-managed control plane.",
  ogImage: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/3ae53e01/64b9920cd04b7c4c0340ce50_og-img-0625.jpg`,
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const PRO_HERO: HeroData = {
  headline: "Supercharge your MLOps with a fully-managed control plane",
  deck: "Forget the infrastructure setup and security concerns. Get a single pane of glass view into your entire organization.",
  primaryCta: { label: "Book a Demo", href: "/book-your-demo" },
  secondaryCta: { label: "Compare OSS vs Pro", href: "/open-source-vs-pro" },
  image: {
    url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/b6cd9240/652d14664e7b1ba97d692b8a_cloud_main-1.webp`,
    alt: "Dashboard displaying iris_logistic_regression model versioning with deployment status, highlighting machine learning and model monitoring.",
  },
};

// ---------------------------------------------------------------------------
// Logo trust bar
// ---------------------------------------------------------------------------
export const PRO_TRUST_HEADLINE =
  "Trusted by 1,000s of top companies to standardize their AI workflows";

// ---------------------------------------------------------------------------
// Featured testimonial (Hema.to)
// ---------------------------------------------------------------------------
export const PRO_FEATURED_TESTIMONIAL = {
  quote:
    '"ZenML cuts out a lot of the infrastructure busywork so I can focus more on the tasks relevant to me. ZenML Pro helps us to keep an overview, as all components we need for MLOps, including documentation and metrics are available in one place!"',
  name: "Florian Pfisterer",
  title: "ML Engineer, Hema.to",
  avatar: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/e2d8f6b9/652e39c2b024082004f60f7f_florian_hemato.webp`,
  companyLogo: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/a3d63b45/652d3ecc31a704eb20dc3fe0_hemato.png`,
} as const;

// ---------------------------------------------------------------------------
// "Get set up in less than a day" (onboarding section)
// ---------------------------------------------------------------------------
export const PRO_ONBOARDING = {
  eyebrow: "We guide you from the first minute",
  headline: "Get set up in less than a day",
  body: "When you choose ZenML Pro, we don\u2019t just hand over the keys. We make sure your infrastructure is ready, your pipelines are running, and your data scientists are onboarded.",
  items: [
    {
      title: "Guided Onboarding",
      body: "Get personalized support to write your first ML pipelines, ensuring a smooth start on your MLOps journey with ZenML.",
    },
    {
      title: "Seamless Infrastructure Setup",
      body: "We handle the setup of your MLOps infrastructure, so you can focus on building exceptional models. Bring your own cloud!",
    },
    {
      title: "Production Ready",
      body: "Our experts will help your teams to connect your workflow and set up initial automations, streamlining your operations.",
    },
  ] satisfies FeatureGridItem[],
  primaryCta: { label: "Book a Demo", href: "/book-your-demo" } as CtaLink,
  secondaryCta: { label: "See Plans", href: "/pricing" } as CtaLink,
} as const;

// ---------------------------------------------------------------------------
// Pro cloud features (alternating image/text blocks)
// ---------------------------------------------------------------------------
export const PRO_FEATURES = [
  {
    eyebrow: "Flexibility",
    title: "Organize assets into Projects",
    body: "Safe, isolated environments to structure your projects and separate concerns between teams.",
    learnMoreHref: "/features/organize-assets-into-projects",
    image: {
      url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/25614cc0/features_projects.png`,
      alt: "Dashboard mockup showing projects organization",
    },
  },
  {
    eyebrow: "Optimization",
    title: "Streamlined Pipeline Management",
    body: "Enhanced pipeline controls including the ability to create run templates and trigger from the dashboard.",
    learnMoreHref: "/features/streamlined-pipeline-management",
    image: {
      url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/70ab3904/653249d5a55b6cc59610a9f2_20_CI_CD_CT_Showcase_95f04728ec.webp`,
      alt: "Dashboard mockup showing CI/CD showcase",
    },
  },
  {
    eyebrow: "Governance",
    title: "Role-based access control and permissions",
    body: "Ensure high security standards by giving granular permissions and access to the entire team.",
    learnMoreHref: "/features/role-based-access-control-and-permissions",
    image: {
      url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/38a4394e/features_rbac_stacks.png`,
      alt: "Dashboard mockup showing RBAC and stacks",
    },
  },
  {
    eyebrow: "Speed",
    title: "Enterprise-Grade Support and Onboarding",
    body: "Get access to our network of experts for advice on setting up your MLOps platform and onboarding onto ZenML.",
    learnMoreHref: "/features/enterprise-grade-support-and-onboarding",
    image: {
      url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/20f1bf87/features_onboarding.png`,
      alt: "Dashboard mockup showing onboarding flow",
    },
  },
] as const;

// ---------------------------------------------------------------------------
// Compliance: "Your VPC, your data"
// ---------------------------------------------------------------------------
export const PRO_COMPLIANCE = {
  eyebrow: "No compliance headaches",
  headline: "Your VPC, your data",
  body: "ZenML is a metadata layer on top of your existing infrastructure, meaning all data and compute stays on your side.",
  image: {
    desktop: {
      url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/e68ec2dc/66c7398e738654118d4024fb_why-zenml-min.png`,
      alt: "ZenML only has access to metadata; your data remains in your VPC",
    },
    mobile: {
      url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/c5ce12a7/66c73e7cfd15ae9889f59705_why-zenml-mobile-min.webp`,
      alt: "Diagram of ZenML setup with local environments for data scientists, ML engineers, and MLOps, integrating AWS, GCP, and Azure.",
    },
  },
  badges: [
    {
      url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/37007174/soc2type2_zenml.png`,
      alt: "SOC 2 Type II Badge",
    },
    {
      url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/959bbffc/66e9546d3b19094bf950273a_iso_certified.webp`,
      alt: "ISO/IEC 27001:2022 certification badge",
    },
  ],
  bannerHeadline: "We Take Security Seriously",
  bannerEyebrow: "ZenML is SOC2 and ISO 27001 Compliant",
  bannerBody:
    "ZenML is SOC2 and ISO 27001 compliant, validating our adherence to industry-leading standards for data security, availability, and confidentiality in our ongoing commitment to protecting your ML workflows and data.",
} as const;

// ---------------------------------------------------------------------------
// Feature grid ("ZenML Pro is Open Source and More")
// ---------------------------------------------------------------------------
export const PRO_OSS_GRID = {
  eyebrow: "Open Source vs Pro",
  headline: "ZenML Pro is Open Source and More",
  body: "Built from the foundations the Open Source product, ZenML Pro is the best way to scale ZenML usage in your team.",
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
  primaryCta: { label: "Book a Demo", href: "/book-your-demo" } as CtaLink,
  secondaryCta: { label: "Compare OSS vs Pro", href: "/open-source-vs-pro" } as CtaLink,
  image: {
    url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/e88e687c/65324d0f452d2d170268090d_opensource-cloud.svg`,
    alt: "ZenML Cloud toolbox emerging from a box.",
  },
} as const;

// ---------------------------------------------------------------------------
// Prominent testimonial (HashiCorp)
// ---------------------------------------------------------------------------
export const PRO_HASHICORP_TESTIMONIAL = {
  quote:
    '"ZenML offers the capability to build end-to-end ML workflows that seamlessly integrate with various components of the ML stack, such as different providers, data stores, and orchestrators."',
  name: "Harold Gim\u00e9nez",
  title: "SVP R&D at HashiCorp",
  avatar: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/31a5f8ee/653297b0b924af52998661bf_harold.webp`,
  companyLogo: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/a1791919/6536227667a9adb0f62aab6b_hashicorp_white.webp`,
} as const;

// ---------------------------------------------------------------------------
// Testimonial carousel items
// ---------------------------------------------------------------------------
export const PRO_TESTIMONIALS = [
  {
    quote:
      '"ZenML allows you to quickly and responsibly go from POC to production ML systems while enabling reproducibility, flexibility, and above all, sanity."',
    name: "Goku Mohandas",
    title: "Founder of MadeWithML",
    avatar: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/8f1455a9/6532516584492916c998a6f1_goku.webp`,
    companyLogo: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/2c79ff75/6532516ecede3c4a7cbaa1bb_madewithml.webp`,
  },
  {
    quote:
      '"ZenML allows orchestrating ML pipelines independent of any infrastructure or tooling choices. ML teams can free their minds of tooling FOMO from the fast-moving MLOps space, with the simple and extensible ZenML interface."',
    name: "Richard Socher",
    title: "Former Chief Scientist Salesforce and Founder of You.com",
    avatar: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/85cb011a/653251e92cb29c000a769f50_richard.webp`,
    companyLogo: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/8b24f1c8/65325223500e83c79114d877_salesforce.webp`,
  },
  {
    quote:
      "A lot of our teams struggle to bring sanity to their model training processes. ZenML is built in a way that encourages good, maintainable pipelines.",
    name: "Matt Squire",
    title: "CTO at Fuzzy Labs",
    avatar: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/f135a881/6532529c769b1188056c3a64_matt.webp`,
    companyLogo: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/43fb3e08/653252cf48491f2f0b6ec650_fuzzylabs.svg`,
  },
  {
    quote:
      "ZenML allows you to keep your ML pipeline code cloud-agnostic, enabling faster future migrations to another technology stack.",
    name: "Gabriel Martin",
    title: "Machine Learning Engineer at Frontiers",
    avatar: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/54e7018e/65325388f530bbad5c385f8a_gabriel.webp`,
    companyLogo: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/6ea19d6f/6532545fe5afb00b2fd8b3fe_frontiers_small.webp`,
  },
  {
    quote:
      "Thanks to ZenML we\u2019ve set up a pipeline where before we had only jupyter notebooks. It helped us tremendously with data and model versioning!",
    name: "Francesco Pudda",
    title: "Machine Learning Engineer at WiseTech Global",
    avatar: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/2d0a68a8/65327258ba7596c721021f2d_pudda.webp`,
    companyLogo: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/bd49d62d/65327219e5955b1960af1e97_wisetech-global-logo.svg`,
  },
] as const;

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export const PRO_FAQ: FaqData = {
  eyebrow: "Support",
  headline: "Frequently asked questions",
  subheadline: "Everything you need to know about ZenML Pro",
  items: [
    {
      question: "What about data security and compliance?",
      answer:
        'ZenML is designed architecturally in a way that <strong>no data</strong> flows through the actual ZenML Pro side, but remains inside your own cloud infrastructure behind your VPC. Only metadata is transferred to our servers (names of pipelines, models, statuses, metrics, etc), which we store encrypted at transit and at rest.<br><br>We are <strong>SOC2 compliant</strong>, validating our adherence to industry-leading standards for data security, availability, and confidentiality in our ongoing commitment to protecting your ML workflows and data.<br><br>Please refer to our <a href="/terms-of-service">terms of service and privacy policy</a> for more details.',
    },
    {
      question: "How does ZenML Pro interface with my internal services?",
      answer:
        'As no data enters ZenML servers, clients can run most actions with local authentication that interfaces with any internal services and the ZenML server is really only a metadata storage for your pipelines, models, runs etc. ZenML also offers a secure way of communicating with external services using service connectors, which are a really cool way of generating short lived tokens to talk to external services like Kubernetes, Docker registries, Blob storage etc. Read more <a href="https://docs.zenml.io/how-to/infrastructure-deployment/auth-management" target="_blank" rel="noopener noreferrer">here</a>.',
    },
    {
      question: "What are the various deployment scenarios for ZenML Pro?",
      answer:
        'ZenML Pro deploys the OSS server <a href="https://docs.zenml.io/pro" target="_blank" rel="noopener noreferrer">as a service</a>, which centrally tracks everything related to pipelines, stacks, models, artifacts, etc. This page goes through <a href="/deployments">various deployment scenarios</a> for this deployment.',
    },
    {
      question:
        "I am an open source user. Can I transition to the Pro version? What about my data!",
      answer:
        'Yes! Once you <a href="/book-your-demo">request a demo</a>, we offer a migration service that helps transition your legacy database into your Pro account.',
    },
    {
      question:
        "What is the difference between the open-source and Pro product?",
      answer:
        'ZenML is and always will be open-source at its heart. The core framework is freely available on <a href="https://github.com/zenml-io/zenml" target="_blank" rel="noopener noreferrer">GitHub</a> and you can run and manage it in-house without using the Pro product. On the other hand, the Pro product offers one of the best experiences to use ZenML, and includes a managed version of the OSS product, including some Pro-only features that create the best collaborative experience for many companies that are scaling their ML efforts.<br><br>You can see a more detailed comparison <a href="/open-source-vs-pro">here</a>.',
    },
  ],
  slackCta: {
    label: "Still not clear? Book a demo now",
    href: "/book-your-demo",
  },
};

// ---------------------------------------------------------------------------
// Final CTA
// ---------------------------------------------------------------------------
export const PRO_FINAL_CTA = {
  headline: "Unify Your ML and LLM Workflows",
  bullets: [
    "Free, powerful MLOps open source foundation",
    "Works with any infrastructure",
    "Upgrade to managed Pro features",
  ],
  primaryCta: { label: "Book a Demo", href: "/book-your-demo" } as CtaLink,
  secondaryCta: { label: "Use Open Source", href: "/get-started" } as CtaLink,
  image: {
    url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/339bb62b/66e9556fd34d2791885b0c5f_model_control_plane_01.png`,
    alt: "Dashboard displaying machine learning models, including versions, authors, and tags.",
  },
} as const;
