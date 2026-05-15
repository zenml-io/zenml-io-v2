/**
 * Navigation data — post-Kitaru-merge structure.
 *
 * See MERGE_PLAN.md for the IA decisions. Top nav:
 *   Product ▾    Docs ▾    Compare    Pricing    Blog    Case Studies ▾
 *
 * Note: dropdowns render before direct links, so the visual order is
 *   Product ▾ Docs ▾ Case Studies ▾ | Compare Pricing Blog
 * — which is standard practice (dropdowns clustered left).
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
  /** Company logo URL (displayed as image in dropdown) */
  logoUrl?: string;
}

export interface NavDropdown {
  label: string;
  /** Left side: one or two columns of link groups */
  sections: NavSection[];
  /** Right side: featured content (case studies, community, etc.) */
  featured?: {
    heading: string;
    caseStudies?: NavCaseStudy[];
    links?: NavLink[];
    ctaLabel?: string;
    ctaHref?: string;
  };
  /** Compact mode: narrow box anchored to button, not full-page panel.
   *  Use when dropdown only has a single section with a few items. */
  compact?: boolean;
}

// ---------------------------------------------------------------------------
// Reusable icons (Untitled UI style, 24x24 viewBox)
// ---------------------------------------------------------------------------

const ICON_LIGHTNING =
  '<path d="M9 3.5V2M5.06066 5.06066L4 4M5.06066 13L4 14.0607M13 5.06066L14.0607 4M3.5 9H2M15.8645 16.1896L13.3727 20.817C13.0881 21.3457 12.9457 21.61 12.7745 21.6769C12.6259 21.7349 12.4585 21.7185 12.324 21.6328C12.1689 21.534 12.0806 21.2471 11.9038 20.6733L8.44519 9.44525C8.3008 8.97651 8.2286 8.74213 8.28669 8.58383C8.33729 8.44595 8.44595 8.33729 8.58383 8.2867C8.74213 8.22861 8.9765 8.3008 9.44525 8.44519L20.6732 11.9038C21.247 12.0806 21.5339 12.169 21.6327 12.324C21.7185 12.4586 21.7348 12.6259 21.6768 12.7745C21.61 12.9458 21.3456 13.0881 20.817 13.3728L16.1896 15.8645C16.111 15.9068 16.0717 15.9279 16.0374 15.9551C16.0068 15.9792 15.9792 16.0068 15.9551 16.0374C15.9279 16.0717 15.9068 16.111 15.8645 16.1896Z"/>';

const ICON_AGENT =
  '<path d="M12 2v2m0 16v2M5.05 5.05l1.41 1.41m11.08 11.08l1.41 1.41M2 12h2m16 0h2M5.05 18.95l1.41-1.41M17.54 6.46l1.41-1.41M9 12a3 3 0 116 0 3 3 0 01-6 0z"/><path d="M8 8h8v8H8z" fill="none"/>';

const ICON_PRO_GEAR =
  '<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 008.91 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 8.91a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>';

const ICON_BOOK =
  '<path d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M16 13H8M16 17H8M10 9H8M14 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V8L14 2Z"/>';

const ICON_BUILDING =
  '<path d="M15 21V15.6C15 15.0399 15 14.7599 14.891 14.546C14.7951 14.3578 14.6422 14.2049 14.454 14.109C14.2401 14 13.9601 14 13.4 14H10.6C10.0399 14 9.75992 14 9.54601 14.109C9.35785 14.2049 9.20487 14.3578 9.10899 14.546C9 14.7599 9 15.0399 9 15.6V21M19 21V6.2C19 5.0799 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H8.2C7.07989 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V21M21 21H3"/>';

const ICON_DATABASE =
  '<path d="M21 5C21 6.65685 16.9706 8 12 8C7.02944 8 3 6.65685 3 5M21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5M21 5V19C21 20.66 17 22 12 22C7 22 3 20.66 3 19V5M21 9.72021C21 11.3802 17 12.7202 12 12.7202C7 12.7202 3 11.3802 3 9.72021M21 14.44C21 16.1 17 17.44 12 17.44C7 17.44 3 16.1 3 14.44"/>';

// ---------------------------------------------------------------------------
// Dropdown Menus
// ---------------------------------------------------------------------------

export const NAV_DROPDOWNS: NavDropdown[] = [
  {
    label: "Product",
    compact: true,
    sections: [
      {
        heading: "Products",
        links: [
          {
            label: "ZenML",
            href: "/",
            description: "Pipelines for ML workflows",
            icon: ICON_LIGHTNING,
          },
          {
            label: "Kitaru",
            href: "/product/kitaru",
            description: "Durable runtime for AI agents",
            icon: ICON_AGENT,
          },
          {
            label: "ZenML Pro",
            href: "/pro",
            description: "Managed control plane for ML + Agent workspaces",
            icon: ICON_PRO_GEAR,
          },
        ],
      },
    ],
  },
  {
    label: "Docs",
    compact: true,
    sections: [
      {
        heading: "Documentation",
        links: [
          {
            label: "ZenML docs",
            href: "https://docs.zenml.io",
            description: "Pipelines, components, integrations",
            external: true,
            icon: ICON_BOOK,
          },
          {
            label: "Kitaru docs",
            href: "https://kitaru.ai/docs",
            description: "Agent runtime primitives and APIs",
            external: true,
            icon: ICON_BOOK,
          },
        ],
      },
    ],
  },
  {
    label: "Case Studies",
    compact: true,
    sections: [
      {
        heading: "Case studies",
        links: [
          {
            label: "Customer stories",
            href: "/case-studies",
            description: "How teams ship ML and agents with ZenML",
            icon: ICON_BUILDING,
          },
          {
            label: "LLMOps Database",
            href: "/llmops-database",
            description: "1,453 LLMOps case studies, searchable",
            icon: ICON_DATABASE,
          },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Direct Links (no dropdown)
// ---------------------------------------------------------------------------

export const NAV_LINKS: NavLink[] = [
  { label: "Compare", href: "/compare" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

// ---------------------------------------------------------------------------
// CTA Buttons
// ---------------------------------------------------------------------------

export const NAV_CTAS: NavLink[] = [
  { label: "Get Started", href: "/get-started" },
  { label: "Start Free Trial", href: "https://cloud.zenml.io/signup" },
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
  if (currentPath.startsWith(`${href}/`)) return true;
  return false;
}
