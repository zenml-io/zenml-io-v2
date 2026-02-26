/**
 * Navigation data — extracted from the Webflow production site nav structure.
 * Used by Navigation.astro to render desktop dropdowns and mobile menu.
 */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
  /** SVG path(s) for the dropdown icon (Untitled UI style, 24x24 viewBox) */
  icon?: string;
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
            icon: '<path d="M9 3.5V2M5.06066 5.06066L4 4M5.06066 13L4 14.0607M13 5.06066L14.0607 4M3.5 9H2M15.8645 16.1896L13.3727 20.817C13.0881 21.3457 12.9457 21.61 12.7745 21.6769C12.6259 21.7349 12.4585 21.7185 12.324 21.6328C12.1689 21.534 12.0806 21.2471 11.9038 20.6733L8.44519 9.44525C8.3008 8.97651 8.2286 8.74213 8.28669 8.58383C8.33729 8.44595 8.44595 8.33729 8.58383 8.2867C8.74213 8.22861 8.9765 8.3008 9.44525 8.44519L20.6732 11.9038C21.247 12.0806 21.5339 12.169 21.6327 12.324C21.7185 12.4586 21.7348 12.6259 21.6768 12.7745C21.61 12.9458 21.3456 13.0881 20.817 13.3728L16.1896 15.8645C16.111 15.9068 16.0717 15.9279 16.0374 15.9551C16.0068 15.9792 15.9792 16.0068 15.9551 16.0374C15.9279 16.0717 15.9068 16.111 15.8645 16.1896Z"/>',
          },
          {
            label: "Auto-track everything",
            href: "/features/auto-track-everything",
            description: "Automatic logging and versioning",
            icon: '<path d="M16 8V5L19 2L20 4L22 5L19 8H16ZM16 8L12 11.9999M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7"/>',
          },
          {
            label: "Shared ML building blocks",
            href: "/features/shared-ml-building-blocks",
            description: "Boost team productivity with reusable components",
            icon: '<path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49M21 5C21 6.65685 19.6569 8 18 8C16.3431 8 15 6.65685 15 5C15 3.34315 16.3431 2 18 2C19.6569 2 21 3.34315 21 5ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 19C21 20.6569 19.6569 22 18 22C16.3431 22 15 20.6569 15 19C15 17.3431 16.3431 16 18 16C19.6569 16 21 17.3431 21 19Z"/>',
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
            icon: '<path d="M20.5 7.27783L12 12.0001M12 12.0001L3.49997 7.27783M12 12.0001L12 21.5001M21 16.0586V7.94153C21 7.59889 21 7.42757 20.9495 7.27477C20.9049 7.13959 20.8318 7.01551 20.7354 6.91082C20.6263 6.79248 20.4766 6.70928 20.177 6.54288L12.777 2.43177C12.4934 2.27421 12.3516 2.19543 12.2015 2.16454C12.0685 2.13721 11.9315 2.13721 11.7986 2.16454C11.6484 2.19543 11.5066 2.27421 11.223 2.43177L3.82297 6.54288C3.52345 6.70928 3.37369 6.79248 3.26463 6.91082C3.16816 7.01551 3.09515 7.13959 3.05048 7.27477C3 7.42757 3 7.59889 3 7.94153V16.0586C3 16.4013 3 16.5726 3.05048 16.7254C3.09515 16.8606 3.16816 16.9847 3.26463 17.0893C3.37369 17.2077 3.52345 17.2909 3.82297 17.4573L11.223 21.5684C11.5066 21.726 11.6484 21.8047 11.7986 21.8356C11.9315 21.863 12.0685 21.863 12.2015 21.8356C12.3516 21.8047 12.4934 21.726 12.777 21.5684L20.177 17.4573C20.4766 17.2909 20.6263 17.2077 20.7354 17.0893C20.8318 16.9847 20.9049 16.8606 20.9495 16.7254C21 16.5726 21 16.4013 21 16.0586Z"/>',
          },
          {
            label: "Limitless scaling",
            href: "/features/limitless-scaling",
            description: "Effortlessly deploy across clouds",
            icon: '<path d="M16 8L21 3M21 3H16M21 3V8M8 8L3 3M3 3L3 8M3 3L8 3M8 16L3 21M3 21H8M3 21L3 16M16 16L21 21M21 21V16M21 21H16"/>',
          },
          {
            label: "Streamline cloud expenses",
            href: "/features/streamline-cloud-expenses",
            description: "Gain clarity on resource usage and costs",
            icon: '<path d="M12 17C12 19.7614 14.2386 22 17 22C19.7614 22 22 19.7614 22 17C22 14.2386 19.7614 12 17 12C14.2386 12 12 14.2386 12 17ZM12 17C12 15.8742 12.3721 14.8353 13 13.9995V5M12 17C12 17.8254 12.2 18.604 12.5541 19.2901C11.7117 20.0018 9.76584 20.5 7.5 20.5C4.46243 20.5 2 19.6046 2 18.5V5M13 5C13 6.10457 10.5376 7 7.5 7C4.46243 7 2 6.10457 2 5M13 5C13 3.89543 10.5376 3 7.5 3C4.46243 3 2 3.89543 2 5M2 14C2 15.1046 4.46243 16 7.5 16C9.689 16 11.5793 15.535 12.4646 14.8618M13 9.5C13 10.6046 10.5376 11.5 7.5 11.5C4.46243 11.5 2 10.6046 2 9.5"/>',
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
            icon: '<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"/><path d="M18.7273 14.7273C18.6063 15.0015 18.5702 15.3056 18.6236 15.6005C18.6771 15.8954 18.8177 16.1676 19.0273 16.3818L19.0818 16.4364C19.2509 16.6052 19.385 16.8057 19.4765 17.0265C19.568 17.2472 19.6151 17.4838 19.6151 17.7227C19.6151 17.9617 19.568 18.1983 19.4765 18.419C19.385 18.6397 19.2509 18.8402 19.0818 19.0091C18.913 19.1781 18.7124 19.3122 18.4917 19.4037C18.271 19.4952 18.0344 19.5423 17.7955 19.5423C17.5565 19.5423 17.3199 19.4952 17.0992 19.4037C16.8785 19.3122 16.678 19.1781 16.5091 19.0091L16.4545 18.9545C16.2403 18.745 15.9682 18.6044 15.6733 18.5509C15.3784 18.4974 15.0742 18.5335 14.8 18.6545C14.5311 18.7698 14.3018 18.9611 14.1403 19.205C13.9788 19.4489 13.8921 19.7347 13.8909 20.0273V20.1818C13.8909 20.664 13.6994 21.1265 13.3584 21.4675C13.0174 21.8084 12.5549 22 12.0727 22C11.5905 22 11.1281 21.8084 10.7871 21.4675C10.4461 21.1265 10.2545 20.664 10.2545 20.1818V20.1C10.2475 19.7991 10.1501 19.5073 9.97501 19.2625C9.79991 19.0176 9.55521 18.8312 9.27273 18.7273C8.99853 18.6063 8.69437 18.5702 8.39947 18.6236C8.10456 18.6771 7.83244 18.8177 7.61818 19.0273L7.56364 19.0818C7.39478 19.2509 7.19425 19.385 6.97353 19.4765C6.7528 19.568 6.51621 19.6151 6.27727 19.6151C6.03834 19.6151 5.80174 19.568 5.58102 19.4765C5.36029 19.385 5.15977 19.2509 4.99091 19.0818C4.82186 18.913 4.68775 18.7124 4.59626 18.4917C4.50476 18.271 4.45766 18.0344 4.45766 17.7955C4.45766 17.5565 4.50476 17.3199 4.59626 17.0992C4.68775 16.8785 4.82186 16.678 4.99091 16.5091L5.04545 16.4545C5.25503 16.2403 5.39562 15.9682 5.4491 15.6733C5.50257 15.3784 5.46647 15.0742 5.34545 14.8C5.23022 14.5311 5.03887 14.3018 4.79497 14.1403C4.55107 13.9788 4.26526 13.8921 3.97273 13.8909H3.81818C3.33597 13.8909 2.87351 13.6994 2.53253 13.3584C2.19156 13.0174 2 12.5549 2 12.0727C2 11.5905 2.19156 11.1281 2.53253 10.7871C2.87351 10.4461 3.33597 10.2545 3.81818 10.2545H3.9C4.2009 10.2475 4.49273 10.1501 4.73754 9.97501C4.98236 9.79991 5.16883 9.55521 5.27273 9.27273C5.39374 8.99853 5.42984 8.69437 5.37637 8.39947C5.3229 8.10456 5.18231 7.83244 4.97273 7.61818L4.91818 7.56364C4.74913 7.39478 4.61503 7.19425 4.52353 6.97353C4.43203 6.7528 4.38493 6.51621 4.38493 6.27727C4.38493 6.03834 4.43203 5.80174 4.52353 5.58102C4.61503 5.36029 4.74913 5.15977 4.91818 4.99091C5.08704 4.82186 5.28757 4.68775 5.50829 4.59626C5.72901 4.50476 5.96561 4.45766 6.20455 4.45766C6.44348 4.45766 6.68008 4.50476 6.9008 4.59626C7.12152 4.68775 7.32205 4.82186 7.49091 4.99091L7.54545 5.04545C7.75971 5.25503 8.03183 5.39562 8.32674 5.4491C8.62164 5.50257 8.9258 5.46647 9.2 5.34545H9.27273C9.54161 5.23022 9.77093 5.03887 9.93245 4.79497C10.094 4.55107 10.1807 4.26526 10.1818 3.97273V3.81818C10.1818 3.33597 10.3734 2.87351 10.7144 2.53253C11.0553 2.19156 11.5178 2 12 2C12.4822 2 12.9447 2.19156 13.2856 2.53253C13.6266 2.87351 13.8182 3.33597 13.8182 3.81818V3.9C13.8193 4.19253 13.906 4.47834 14.0676 4.72224C14.2291 4.96614 14.4584 5.15749 14.7273 5.27273C15.0015 5.39374 15.3056 5.42984 15.6005 5.37637C15.8954 5.3229 16.1676 5.18231 16.3818 4.97273L16.4364 4.91818C16.6052 4.74913 16.8057 4.61503 17.0265 4.52353C17.2472 4.43203 17.4838 4.38493 17.7227 4.38493C17.9617 4.38493 18.1983 4.43203 18.419 4.52353C18.6397 4.61503 18.8402 4.74913 19.0091 4.91818C19.1781 5.08704 19.3122 5.28757 19.4037 5.50829C19.4952 5.72901 19.5423 5.96561 19.5423 6.20455C19.5423 6.44348 19.4952 6.68008 19.4037 6.9008C19.3122 7.12152 19.1781 7.32205 19.0091 7.49091L18.9545 7.54545C18.745 7.75971 18.6044 8.03183 18.5509 8.32674C18.4974 8.62164 18.5335 8.9258 18.6545 9.2V9.27273C18.7698 9.54161 18.9611 9.77093 19.205 9.93245C19.4489 10.094 19.7347 10.1807 20.0273 10.1818H20.1818C20.664 10.1818 21.1265 10.3734 21.4675 10.7144C21.8084 11.0553 22 11.5178 22 12C22 12.4822 21.8084 12.9447 21.4675 13.2856C21.1265 13.6266 20.664 13.8182 20.1818 13.8182H20.1C19.8075 13.8193 19.5217 13.906 19.2778 14.0676C19.0339 14.2291 18.8425 14.4584 18.7273 14.7273Z"/>',
          },
          {
            label: "Open Source vs Pro",
            href: "/open-source-vs-pro",
            description: "Pick what works for your needs",
            icon: '<path d="M14 17L17 14L14 11M10 7L7 10L10 13M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"/>',
          },
          {
            label: "ZenML vs Other Tools",
            href: "/compare",
            description: "Compare ZenML to other ML tools",
            icon: '<path d="M20 17H4M4 17L8 13M4 17L8 21M4 7H20M20 7L16 3M20 7L16 11"/>',
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
