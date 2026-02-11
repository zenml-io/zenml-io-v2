/**
 * Navigation data — extracted from the Webflow production site nav structure.
 * Used by Navigation.astro to render desktop dropdowns and mobile menu.
 */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface NavSection {
  heading: string;
  links: NavLink[];
}

export interface NavCaseStudy {
  label: string;
  href: string;
  subtitle: string;
}

export interface NavDropdown {
  label: string;
  /** Left side: two columns of link groups */
  sections: NavSection[];
  /** Right side: featured content (case studies, community, etc.) */
  featured?: {
    heading: string;
    caseStudies?: NavCaseStudy[];
    links?: NavLink[];
    ctaLabel?: string;
    ctaHref?: string;
  };
}

// ---------------------------------------------------------------------------
// Dropdown Menus
// ---------------------------------------------------------------------------

export const NAV_DROPDOWNS: NavDropdown[] = [
  {
    label: "Product",
    sections: [
      {
        heading: "Data Science",
        links: [
          {
            label: "Iterate at warp speed",
            href: "/features/iterate-at-warp-speed",
            description: "Accelerate your ML workflow seamlessly",
          },
          {
            label: "Auto-track everything",
            href: "/features/auto-track-everything",
            description: "Automatic logging and versioning",
          },
          {
            label: "Shared ML building blocks",
            href: "/features/shared-ml-building-blocks",
            description: "Boost team productivity with reusable components",
          },
        ],
      },
      {
        heading: "Infrastructure",
        links: [
          {
            label: "Backend flexibility, zero lock-in",
            href: "/features/backend-flexibility-zero-lock-in",
            description: "One framework for all your MLOps and LLMOps needs",
          },
          {
            label: "Limitless scaling",
            href: "/features/limitless-scaling",
            description: "Effortlessly deploy across clouds",
          },
          {
            label: "Streamline cloud expenses",
            href: "/features/streamline-cloud-expenses",
            description: "Gain clarity on resource usage and costs",
          },
        ],
      },
      {
        heading: "Organization",
        links: [
          {
            label: "ZenML Pro",
            href: "/pro",
            description: "Our managed control plane for MLOps",
          },
          {
            label: "Open Source vs Pro",
            href: "/open-source-vs-pro",
            description: "Pick what works for your needs",
          },
          {
            label: "ZenML vs Other Tools",
            href: "/compare",
            description: "Compare ZenML to other ML tools",
          },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    sections: [
      {
        heading: "GenAI & LLMs",
        links: [
          {
            label: "Finetuning LLMs",
            href: "https://docs.zenml.io/user-guides/llmops-guide/finetuning-llms",
            description: "Customize large language models for specific tasks",
            external: true,
          },
          {
            label: "Productionalizing a RAG application",
            href: "https://docs.zenml.io/user-guides/llmops-guide",
            description: "Deploy and scale RAG systems",
            external: true,
          },
          {
            label: "LLMOps Database",
            href: "/llmops-database",
            description: "A curated knowledge base of real-world implementations",
          },
        ],
      },
      {
        heading: "MLOps",
        links: [
          {
            label: "Building Enterprise MLOps",
            href: "/whitepaper-architecting-an-enterprise-grade-mlops-platform",
            description: "Platform architecture and best practices",
          },
          {
            label: "Abstract cloud compute",
            href: "/features/backend-flexibility-zero-lock-in",
            description: "Simplify management of cloud-based ML resources",
          },
          {
            label: "Track metrics and metadata",
            href: "https://docs.zenml.io/how-to/model-management-metrics",
            description: "Monitor and analyze ML model performance and data",
            external: true,
          },
        ],
      },
    ],
    featured: {
      heading: "Success Stories",
      caseStudies: [
        { label: "JetBrains", href: "/case-study/jetbrains", subtitle: "Software" },
        { label: "Adeo Leroy Merlin", href: "/case-study/adeo-leroy-merlin", subtitle: "Retail" },
        { label: "Cross Screen Media", href: "/case-study/cross-screen-media", subtitle: "Media" },
      ],
      ctaLabel: "View All Case Studies",
      ctaHref: "/case-studies",
    },
  },
  {
    label: "Developers",
    sections: [
      {
        heading: "Documentation",
        links: [
          {
            label: "Docs",
            href: "https://docs.zenml.io",
            description: "Comprehensive guides to use ZenML",
            external: true,
          },
          {
            label: "Deploying ZenML",
            href: "/deployments",
            description: "Understanding ZenML system architecture",
          },
          {
            label: "Tutorials",
            href: "https://github.com/zenml-io/zenml/tree/main/examples",
            description: "Examples showing ZenML in action",
            external: true,
          },
        ],
      },
      {
        heading: "Guides",
        links: [
          {
            label: "Quickstart",
            href: "https://colab.research.google.com/github/zenml-io/zenml/blob/main/examples/mlops_starter/quickstart.ipynb",
            description: "Quickly get your hands dirty",
            external: true,
          },
          {
            label: "Showcase",
            href: "/projects",
            description: "Projects of ML use cases built with ZenML",
          },
          {
            label: "Starter Guide",
            href: "https://docs.zenml.io/user-guides/starter-guide",
            description: "Get started with the basics",
            external: true,
          },
        ],
      },
    ],
    featured: {
      heading: "Community",
      links: [
        {
          label: "Slack",
          href: "/slack",
          description: "Join our Slack Community",
        },
        {
          label: "Changelog",
          href: "https://docs.zenml.io/changelog",
          description: "Discover what's new on ZenML",
          external: true,
        },
        {
          label: "Roadmap",
          href: "/roadmap",
          description: "Join us on our MLOps journey",
        },
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Direct Links (no dropdown)
// ---------------------------------------------------------------------------

export const NAV_LINKS: NavLink[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
];

// ---------------------------------------------------------------------------
// CTA Buttons
// ---------------------------------------------------------------------------

export const NAV_CTAS: NavLink[] = [
  { label: "Get Started", href: "/get-started" },
  { label: "Book a demo", href: "/book-your-demo" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Check if a nav link matches the current path (exact or section prefix) */
export function isActivePath(currentPath: string, href: string): boolean {
  if (href === "/") return currentPath === "/";
  // Exact match
  if (currentPath === href) return true;
  // Section match: /blog/some-post matches /blog
  if (currentPath.startsWith(href + "/")) return true;
  return false;
}
