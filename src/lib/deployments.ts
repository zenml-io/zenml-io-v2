/**
 * Deployments page data — centralized marketing copy.
 *
 * Used by src/pages/deployments.astro.
 * Content extracted from Webflow HTML snapshot.
 */
import type { CtaLink } from "./marketingPageTypes";

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export const DEPLOYMENTS_SEO = {
  title: "Deployments - ZenML",
  description:
    "Flexible deployment for your MLOps needs. Streamline your machine learning workflows with ZenML's adaptable deployment options.",
  ogTitle: "Deployments - ZenML",
  ogDescription:
    "Flexible deployment for your MLOps needs. Streamline your ML workflows with ZenML.",
  ogImage: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/3ae53e01/64b9920cd04b7c4c0340ce50_og-img-0625.jpg`,
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const DEPLOYMENTS_HERO = {
  headline: "Flexible Deployment for Your MLOps Needs",
  deck: "Streamline your machine learning workflows with ZenML's adaptable deployment options. Whether you're experimenting locally or scaling to production, ZenML empowers you to orchestrate, manage, and deploy your models with ease.",
  primaryCta: { label: "Book a demo", href: "/book-your-demo" } as CtaLink,
  secondaryCta: {
    label: "Read the Documentation",
    href: "https://docs.zenml.io/getting-started/deploying-zenml",
    external: true,
  } as CtaLink,
} as const;

// ---------------------------------------------------------------------------
// Architecture overview (dark section)
// ---------------------------------------------------------------------------
export const DEPLOYMENTS_ARCHITECTURE = {
  eyebrow: "ZenML Architecture",
  headline: "Built on a Robust Client-Server Architecture",
  body: "ZenML is a metadata layer on top of your existing infrastructure, meaning all data and compute stays on your side.",
  image: {
    url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/e19a8b4e/zenml-architecture.png`,
    alt: "ZenML system architecture diagram showing connections between five main components: ZenML Client (Development Environment), ZenML Server, Database, MLOps Infrastructure (Cloud, Kubernetes, on-prem), and MLOps Tools (Experiment tracker, model deployer)",
  },
  features: [
    {
      eyebrow: "ZenML Server",
      title: "Central hub managing your ML metadata",
      body: "Store your pipelines, runs, stacks, and configurations. It provides a REST server for communication.",
    },
    {
      eyebrow: "ZenML Client",
      title: "Your interface to interact with the ZenML Server",
      body: "It enables you to trigger actions, access information, and control your ML operations.",
    },
    {
      eyebrow: "ZenML Dashboard",
      title: "Visualize your pipelines, artifacts, and stacks.",
      body: "Usually bundled with the server, the dashboard provides a seamless visual experience on top of the ZenML Client.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Comparison table (OSS vs Pro)
// ---------------------------------------------------------------------------
export const DEPLOYMENTS_COMPARISON = {
  eyebrow: "Deployments comparison",
  headline: "Choose the Deployment that Fits Your Needs",
  columnHeaders: ["Open Source (Self-hosted)", "Pro"],
  rows: [
    { feature: "Run pipelines on cloud infra", values: ["Self-hosted", "SaaS / Self-hosted"] },
    { feature: "Run pipelines on cloud infra", values: [true, true] },
    { feature: "Managed platform", values: [false, true] },
    { feature: "No setup required", values: [false, true] },
    { feature: "Easy version upgrade", values: [false, true] },
    { feature: "RBAC", values: [false, true] },
    { feature: "Run Templates", values: [false, true] },
    { feature: "SSO / Auth2", values: [false, true] },
    { feature: "No metadata leaves customer cloud", values: [true, false] },
  ] as { feature: string; values: (boolean | string)[] }[],
} as const;

// ---------------------------------------------------------------------------
// Deployment scenarios (3 alternating sections)
// ---------------------------------------------------------------------------
export const DEPLOYMENTS_SCENARIOS = [
  {
    title: "Get started quickly with Local Deployment",
    bullets: [
      "Ideal for initial experimentation, learning ZenML, and developing pipelines.",
      "Easy setup - everything runs on your machine.",
      "Uses a local SQLite database for storing metadata.",
    ],
    image: {
      url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/7c72dd14/local-deployments.png`,
      alt: "ZenML Default Local Configuration architecture diagram showing User Code, CLI, ZenML Client, and Metadata Store (SQLite).",
    },
    learnMoreHref: "https://docs.zenml.io/deploying-zenml/deploying-zenml#deployment-scenarios",
  },
  {
    title: "Deploy the ZenML server to start collaborating",
    bullets: [
      "Deploy the ZenML server and dashboard centrally as soon as you are deploying remote workloads or inviting colleagues",
      "Backed by a robust database (MySQL) to persist production workloads",
      "Suitable for production-level workloads.",
    ],
    image: {
      url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/d201dea4/local_full.png`,
      alt: "ZenML deployment architecture with centralized server, clients, and MySQL metadata store.",
    },
    learnMoreHref: "https://docs.zenml.io/getting-started/deploying-zenml",
  },
  {
    title: "Easily upgrade to ZenML Pro to unlock enterprise-grade features",
    bullets: [
      "Best for teams and organizations looking to scale MLOps",
      "Pro adds on top of OSS with advanced functionality and enterprise controls",
      "Seamlessly upgrade to ZenML Pro from OSS with one-click",
    ],
    image: {
      url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/39671462/02_pro_saas.png`,
      alt: "ZenML Pro Deployment architecture with Control Plane, Pro Tenants, Identity Provider, and Secrets Store.",
    },
    learnMoreHref: "/pro",
  },
] as const;

// ---------------------------------------------------------------------------
// Deployment methods grid
// ---------------------------------------------------------------------------
export const DEPLOYMENTS_METHODS = [
  {
    title: "ZenML Pro",
    body: "One click deployment with a managed service",
    href: "https://docs.zenml.io/pro",
    icon: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/e2bdf58e/667037da03e4569db6e31135_zenml_icon.webp`,
    iconAlt: "ZenML icon",
  },
  {
    title: "Docker",
    body: "Run ZenML Server in a container, optionally connecting to an external MySQL database.",
    href: "https://docs.zenml.io/getting-started/deploying-zenml/deploy-with-docker",
    icon: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/856a483f/docker-icon-min.svg`,
    iconAlt: "Docker",
  },
  {
    title: "Helm",
    body: "Deploy on a Kubernetes cluster using Helm charts for robust, production-ready setups.",
    href: "https://docs.zenml.io/getting-started/deploying-zenml/deploy-with-helm",
    icon: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/2f2edf64/kubernetes.png`,
    iconAlt: "Kubernetes",
  },
  {
    title: "Hugging Face Spaces",
    body: "Quick and free deployment option, ideal for trying out ZenML.",
    href: "https://docs.zenml.io/getting-started/deploying-zenml/deploy-using-huggingface-spaces",
    icon: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/a01910fd/65df144133e3478a8bf66cd3_hugging-face-min.svg`,
    iconAlt: "Hugging Face logo",
  },
] as const;

// ---------------------------------------------------------------------------
// Tabbed deployment diagrams
// ---------------------------------------------------------------------------
export const DEPLOYMENTS_TABS = {
  eyebrow: "ZenML architecture",
  headline: "Focus on What Matters - Your MLOps",
  body: "ZenML is a metadata layer on top of your existing infrastructure, meaning all data and compute stays on your side.",
  tabs: [
    {
      label: "Local",
      badge: "OSS",
      badgeVariant: "default" as const,
      description: "A FastAPI-based server managing metadata of pipelines, artifacts, and stacks. Free with Apache 2.0 license, perfect for individual projects and small teams starting their MLOps journey.",
      image: {
        url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/a0c2a2dd/deployment_diagram_1.png`,
        alt: "ZenML OSS deployment architecture showing two user environments with ZenML Client connecting to a centralized ZenML OSS Server, Dashboard, and MySQL Metadata Store.",
      },
    },
    {
      label: "SaaS",
      badge: "PRO",
      badgeVariant: "pro" as const,
      description: "Fully managed ZenML deployment with enhanced collaboration features, RBAC, and enterprise support. Ideal for teams looking for a zero-maintenance MLOps solution.",
      image: {
        url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/a44cd000/deployment_diagram_2.png`,
        alt: "ZenML Pro Deployment architecture with control plane, identity provider, Pro Server, PostgreSQL, and two OSS Tenants with Pro Features.",
      },
    },
    {
      label: "Self-hosted",
      badge: "PRO",
      badgeVariant: "pro" as const,
      description: "Enterprise-grade deployment on your infrastructure. Complete control over data and secrets with all Pro features. Perfect for organizations with strict security requirements.",
      image: {
        url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/bac3ad93/deployment_diagram_3.png`,
        alt: "Customer Environment architecture for ZenML Pro showing Pro Metadata Store, Pro Dashboard, ZenML Control Plane, and two Tenants with external service connections.",
      },
    },
  ],
  features: [
    { title: "Fully managed service", body: "ZenML handles deployment, maintenance, and infrastructure." },
    { title: "Simplified workflow", body: "Allows you to focus on your ML workflows without infrastructure management overhead." },
    { title: "Scalable architecture", body: "Suitable for teams and organisations looking for a streamlined and scalable solution." },
    { title: "Full on-prem available", body: "Full on-prem deployment available as well (ask for details)" },
    { title: "Enhanced observability", body: "Enhanced security features and integrations with cloud services." },
    { title: "Risk-free evaluation", body: "14-day free trial for thorough testing and POC development." },
  ],
} as const;

// ---------------------------------------------------------------------------
// Final CTA
// ---------------------------------------------------------------------------
export const DEPLOYMENTS_FINAL_CTA = {
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
