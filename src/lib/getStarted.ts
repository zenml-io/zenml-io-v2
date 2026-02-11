/**
 * Get Started page data — centralized marketing copy.
 *
 * Used by src/pages/get-started.astro.
 * Content extracted from Webflow HTML snapshot + SEO baseline.
 */
import type { CtaLink } from "./marketingPageTypes";

const WEBFLOW_CDN = "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30";

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export const GET_STARTED_SEO = {
  title: "Get Started with ZenML - Open Source MLOps Framework",
  description:
    "Build production-ready ML pipelines with the open-source framework trusted by thousands of ML engineers worldwide.",
  ogTitle: "Get Started with ZenML",
  ogDescription:
    "Build production-ready ML pipelines with the open-source framework trusted by thousands of ML engineers worldwide.",
  ogImage: `${WEBFLOW_CDN}/64b9920cd04b7c4c0340ce50_og-img-0625.jpg`,
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const GET_STARTED_HERO = {
  eyebrow: "Open Source",
  headline: "Get Started with ZenML",
  deck: "Build production-ready ML pipelines with the open-source framework trusted by thousands of ML engineers worldwide.",
  primaryCta: {
    label: "View on GitHub",
    href: "https://github.com/zenml-io/zenml",
    external: true,
  } as CtaLink,
  secondaryCta: {
    label: "Read the Docs",
    href: "https://docs.zenml.io",
    external: true,
  } as CtaLink,
} as const;

// ---------------------------------------------------------------------------
// Code steps
// ---------------------------------------------------------------------------
export const GET_STARTED_STEPS = {
  headline: "Start in 3 simple steps",
  items: [
    {
      title: "Install ZenML",
      body: "Get ZenML up and running in minutes. You just need to install it",
      code: "pip install 'zenml[local]'",
    },
    {
      title: "Write your first pipeline",
      body: "Create a simple <code>run.py</code> file with a basic workflow:",
      code: `from zenml import step, pipeline


@step
def basic_step() -> str:
    """A simple step that returns a greeting message."""
    return "Hello World!"


@pipeline
def basic_pipeline():
    """A simple pipeline with just one step."""
    basic_step()


if __name__ == "__main__":
    basic_pipeline()`,
    },
    {
      title: "Run your pipeline locally",
      body: "ZenML automatically tracks the execution and stores artifacts.",
      code: "python run.py",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Architecture section
// ---------------------------------------------------------------------------
export const GET_STARTED_ARCHITECTURE = {
  eyebrow: "ZenML Architecture",
  headline: "Built on a Robust Client-Server Architecture",
  body: "ZenML is a metadata layer on top of your existing infrastructure, meaning all data and compute stays on your side.",
  image: {
    url: `${WEBFLOW_CDN}/zenml-architecture.png`,
    alt: "ZenML system architecture diagram showing connections between five main components: ZenML Client (Development Environment), ZenML Server, Database, MLOps Infrastructure (Cloud, Kubernetes, on-prem), and MLOps Tools (Experiment tracker, model deployer)",
  },
  primaryCta: { label: "Learn More", href: "/deployments" } as CtaLink,
  secondaryCta: {
    label: "Read the Docs",
    href: "https://docs.zenml.io/deploying-zenml/deploying-zenml",
    external: true,
  } as CtaLink,
} as const;

// ---------------------------------------------------------------------------
// Projects section
// ---------------------------------------------------------------------------
export const GET_STARTED_PROJECTS = {
  eyebrow: "Projects",
  headline: "Start with one of our ready-made projects",
  deck: "Everything you need to replicate a production-grade use case \u2014 demo, video, blog, and code.",
  cta: { label: "View All Projects", href: "/projects" } as CtaLink,
} as const;

// ---------------------------------------------------------------------------
// Resources grid
// ---------------------------------------------------------------------------
export const GET_STARTED_RESOURCES = {
  eyebrow: "Resources",
  headline: "Your Complete ZenML Learning Toolkit",
  body: "Dive deeper into ZenML with comprehensive documentation, development tools, hands-on tutorials, and a thriving community of ML engineers ready to help you succeed.",
  items: [
    {
      title: "Official Documentation",
      body: "Comprehensive guides, tutorials, and API reference to master ZenML",
      href: "https://docs.zenml.io",
      external: true,
      color: "teal" as const,
    },
    {
      title: "VS Code Extension",
      body: "ZenML Studio enhances your ML workflow with support for pipelines, stacks, server management and DAG visualization.",
      href: "https://marketplace.visualstudio.com/items?itemName=ZenML.zenml-vscode",
      external: true,
      color: "blue" as const,
    },
    {
      title: "Interactive Tutorial",
      body: "Master ZenML fundamentals through 10 guided pipeline examples with step-by-step tutorials and one-click execution!",
      href: "https://github.com/zenml-io/vscode-tutorial",
      external: true,
      color: "purple" as const,
    },
    {
      title: "Slack Community",
      body: "Join thousands of ML engineers sharing knowledge and best practices.",
      href: "/slack",
      external: false,
      color: "gray" as const,
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Final CTA
// ---------------------------------------------------------------------------
export const GET_STARTED_FINAL_CTA = {
  headline: "Ready for the next level?",
  body: "Go beyond open source with ZenML Pro. Get enterprise features, managed infrastructure, RBAC, enhanced security, dedicated support, and more.",
  primaryCta: { label: "Compare OSS vs Pro", href: "/open-source-vs-pro" } as CtaLink,
  secondaryCta: { label: "Book a demo", href: "/book-your-demo" } as CtaLink,
} as const;
