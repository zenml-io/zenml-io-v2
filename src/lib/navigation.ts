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
  /** Override viewBox for non-24x24 icons (e.g. the Kitaru ring glyph) */
  iconViewBox?: string;
  /** Render the icon filled (fill=currentColor) instead of stroked */
  iconFilled?: boolean;
  /** Brand accent for Product-dropdown tiles (icon tile bg + hover tint) */
  brand?: "zenml" | "kitaru" | "pro";
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
  /** Product panel: double-width anchored box. ZenML + Kitaru side by side,
   *  ZenML Pro spanning both below (Pro includes both products). */
  product?: boolean;
}

// ---------------------------------------------------------------------------
// Reusable icons (Untitled UI style, 24x24 viewBox)
// ---------------------------------------------------------------------------

/** ZenML mark — official logo glyph (filled, 20x20 viewBox, fixed brand purple) */
const ICON_ZENML_MARK =
  '<path fill="#431D93" d="M19.5003 13.1305C19.9349 11.8055 20.0885 10.4045 19.9513 9.01681C19.8141 7.62914 19.3891 6.28531 18.7034 5.07109L11.8237 4.89688V4.81084L18.4457 4.64308C17.6459 3.38412 16.5761 2.31884 15.3137 1.52442L9.99981 1.39107V1.30539L14.7226 1.18602C12.7874 0.148663 10.5646 -0.222695 8.39729 0.129307C6.23001 0.481309 4.23892 1.53709 2.73153 3.13358L8.67456 3.28413V3.37017L2.37629 3.52789C0.839362 5.33382 -0.00319087 7.62863 9.08139e-06 10C9.08139e-06 10.1076 8.99896e-06 10.2115 0.00538601 10.3169C0.00499625 10.3239 0.00499625 10.331 0.00538601 10.3381L2.37916 10.3983V10.4843L0.0132723 10.5442C0.0136542 10.5512 0.0136542 10.5583 0.0132723 10.5653C0.0997227 12.1258 0.552766 13.644 1.33566 14.9967L5.29206 15.0967V15.1827L1.50521 15.2788C2.43407 16.7701 3.73798 17.9916 5.28668 18.8212C5.41 18.8882 5.53474 18.9517 5.66128 19.0126V10.7058H6.62054C6.65746 10.7058 6.69403 10.713 6.72815 10.7271C6.76226 10.7412 6.79326 10.7619 6.81937 10.788C6.84548 10.8142 6.86618 10.8452 6.88028 10.8793C6.89439 10.9134 6.90163 10.95 6.90158 10.9869V19.5105C8.91563 20.1632 11.0843 20.1632 13.0984 19.5105V10.9869C13.0984 10.95 13.1056 10.9134 13.1197 10.8793C13.1338 10.8452 13.1545 10.8142 13.1806 10.788C13.2067 10.7619 13.2377 10.7412 13.2718 10.7271C13.306 10.713 13.3425 10.7058 13.3794 10.7058H14.338V19.0137C14.4627 18.9535 14.5871 18.8904 14.7086 18.8248C15.6867 18.3023 16.571 17.6209 17.3254 16.8084L14.8416 16.7453V16.6593L17.5215 16.5915C18.3437 15.6551 18.9831 14.573 19.4067 13.4012L15.8306 13.3105V13.2244L19.5003 13.1305ZM15.7253 10.442H4.27473L4.0679 9.61538H5.66128V8.72925H5.98677C6.10295 8.7293 6.21798 8.75223 6.3253 8.79673C6.43262 8.84124 6.53012 8.90644 6.61224 8.98863C6.69436 9.07081 6.75949 9.16837 6.8039 9.27572C6.84832 9.38307 6.87116 9.49813 6.87111 9.61431H9.38038V8.43423H3.30149C3.18284 7.48967 2.6222 6.75195 2.6222 6.75195C4.27473 7.13515 9.99981 7.1649 9.99981 7.1649C9.99981 7.1649 15.7249 7.13515 17.3767 6.75195C17.3767 6.75195 16.8171 7.48967 16.6985 8.43423H10.62V9.61466H13.1292C13.1292 9.49841 13.1521 9.38329 13.1966 9.27589C13.2411 9.16848 13.3064 9.0709 13.3886 8.98871C13.4708 8.90652 13.5684 8.84133 13.6758 8.79688C13.7833 8.75242 13.8984 8.72956 14.0146 8.72961H14.3394V9.61466H15.9335L15.7253 10.442Z"/>';

/** Kitaru ring glyph — the circle mark from KitaruLogo.astro (filled, 81x82 viewBox) */
const ICON_KITARU_RING =
  '<path d="M40.5 0.426758C18.1325 0.426758 0 18.5592 0 40.9268C0 63.2943 18.1325 81.4268 40.5 81.4268C62.8675 81.4268 81 63.2943 81 40.9268C81 18.5592 62.8675 0.426758 40.5 0.426758ZM40.5 11.998C56.4767 11.998 69.4285 24.9501 69.4287 40.9268C69.4287 56.9036 56.4768 69.8555 40.5 69.8555C24.5234 69.8552 11.5723 56.9034 11.5723 40.9268C11.5724 24.9503 24.5235 11.9983 40.5 11.998Z"/>';

const ICON_STAR =
  '<path d="M11.2827 3.45332C11.5131 2.98638 11.6284 2.75291 11.7848 2.67831C11.9209 2.61341 12.0791 2.61341 12.2152 2.67831C12.3717 2.75291 12.4869 2.98638 12.7174 3.45332L14.9041 7.88328C14.9721 8.02113 15.0061 8.09006 15.0558 8.14358C15.0999 8.19096 15.1527 8.22935 15.2113 8.25662C15.2776 8.28742 15.3536 8.29854 15.5057 8.32077L20.397 9.03571C20.9121 9.11099 21.1696 9.14863 21.2888 9.27444C21.3925 9.38389 21.4412 9.5343 21.4215 9.68377C21.3988 9.85558 21.2124 10.0372 20.8395 10.4004L17.3014 13.8464C17.1912 13.9538 17.136 14.0076 17.1004 14.0715C17.0689 14.128 17.0487 14.1902 17.0409 14.2545C17.0321 14.3271 17.0451 14.403 17.0711 14.5547L17.906 19.4221C17.994 19.9355 18.038 20.1922 17.9553 20.3445C17.8833 20.477 17.7554 20.57 17.6071 20.5975C17.4366 20.6291 17.2061 20.5078 16.7451 20.2654L12.3724 17.9658C12.2361 17.8942 12.168 17.8584 12.0962 17.8443C12.0327 17.8318 11.9673 17.8318 11.9038 17.8443C11.832 17.8584 11.7639 17.8942 11.6277 17.9658L7.25492 20.2654C6.79392 20.5078 6.56341 20.6291 6.39297 20.5975C6.24468 20.57 6.11672 20.477 6.04474 20.3445C5.962 20.1922 6.00603 19.9355 6.09407 19.4221L6.92889 14.5547C6.95491 14.403 6.96793 14.3271 6.95912 14.2545C6.95132 14.1902 6.93111 14.128 6.89961 14.0715C6.86402 14.0076 6.80888 13.9538 6.69859 13.8464L3.16056 10.4004C2.78766 10.0372 2.60121 9.85558 2.57853 9.68377C2.55879 9.5343 2.60755 9.38389 2.71125 9.27444C2.83044 9.14863 3.08797 9.11099 3.60304 9.03571L8.49431 8.32077C8.64642 8.29854 8.72248 8.28742 8.78872 8.25662C8.84736 8.22935 8.90016 8.19096 8.94419 8.14358C8.99391 8.09006 9.02793 8.02113 9.09597 7.88328L11.2827 3.45332Z"/>';

const ICON_BOOK =
  '<path d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M16 13H8M16 17H8M10 9H8M14 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V8L14 2Z"/>';

const ICON_BUILDING =
  '<path d="M15 21V15.6C15 15.0399 15 14.7599 14.891 14.546C14.7951 14.3578 14.6422 14.2049 14.454 14.109C14.2401 14 13.9601 14 13.4 14H10.6C10.0399 14 9.75992 14 9.54601 14.109C9.35785 14.2049 9.20487 14.3578 9.10899 14.546C9 14.7599 9 15.0399 9 15.6V21M19 21V6.2C19 5.0799 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H8.2C7.07989 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V21M21 21H3"/>';

const ICON_DATABASE =
  '<path d="M21 5C21 6.65685 16.9706 8 12 8C7.02944 8 3 6.65685 3 5M21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5M21 5V19C21 20.66 17 22 12 22C7 22 3 20.66 3 19V5M21 9.72021C21 11.3802 17 12.7202 12 12.7202C7 12.7202 3 11.3802 3 9.72021M21 14.44C21 16.1 17 17.44 12 17.44C7 17.44 3 16.1 3 14.44"/>';

// ---------------------------------------------------------------------------
// Brand accents (dropdown link tiles)
// ---------------------------------------------------------------------------

/** Per-brand accents for dropdown link tiles (ZenML purple, Kitaru orange,
 *  Pro sand). Tile = icon square; cell = row bg/hover tint; label = hover
 *  color. Keyed by NavLink.brand — "zenml" is the default. */
export const NAV_BRAND_STYLES: Record<
  NonNullable<NavLink["brand"]>,
  { tile: string; cell: string; label: string }
> = {
  zenml: {
    tile: "bg-zenml-25 text-zenml-500",
    cell: "hover:bg-zenml-50",
    label: "group-hover/link:text-zenml-500",
  },
  kitaru: {
    tile: "bg-orange-100 text-orange-600",
    cell: "hover:bg-orange-50",
    label: "group-hover/link:text-orange-700",
  },
  pro: {
    tile: "bg-sand-200 text-warm-taupe-dark",
    cell: "bg-cream-paper hover:bg-sand-100",
    label: "group-hover/link:text-warm-taupe-ink",
  },
};

// ---------------------------------------------------------------------------
// Dropdown Menus
// ---------------------------------------------------------------------------

const LLMOPS_DATABASE_NAV_COUNT_FORMATTER = new Intl.NumberFormat("en-US");
const navDropdownsByLlmopsCount = new Map<number, NavDropdown[]>();

export function formatLlmopsDatabaseNavDescription(count: number): string {
  return `${LLMOPS_DATABASE_NAV_COUNT_FORMATTER.format(count)} LLMOps case studies, searchable`;
}

export function createNavDropdowns({
  llmopsCaseStudyCount,
}: {
  llmopsCaseStudyCount: number;
}): NavDropdown[] {
  const cachedDropdowns = navDropdownsByLlmopsCount.get(llmopsCaseStudyCount);
  if (cachedDropdowns) return cachedDropdowns;

  const navDropdowns: NavDropdown[] = [
    {
      label: "Product",
      product: true,
      sections: [
        {
          heading: "Products",
          links: [
            {
              label: "ZenML",
              href: "/product/zenml",
              description: "Pipelines for ML workflows",
              icon: ICON_ZENML_MARK,
              iconViewBox: "0 0 20 20",
              iconFilled: true,
              brand: "zenml",
            },
            {
              label: "Kitaru",
              href: "/product/kitaru",
              description: "Durable runtime for AI agents",
              icon: ICON_KITARU_RING,
              iconViewBox: "0 0 81 82",
              iconFilled: true,
              brand: "kitaru",
            },
            {
              label: "ZenML Pro",
              href: "/pro",
              description:
                "Unified managed control plane for ZenML and Kitaru workspaces",
              icon: ICON_STAR,
              brand: "pro",
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
              brand: "kitaru",
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
              description:
                formatLlmopsDatabaseNavDescription(llmopsCaseStudyCount),
              icon: ICON_DATABASE,
            },
          ],
        },
      ],
    },
  ];

  navDropdownsByLlmopsCount.set(llmopsCaseStudyCount, navDropdowns);
  return navDropdowns;
}

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
  { label: "Read Docs", href: "/docs" },
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
  if (currentPath.startsWith(`${href}/`)) return true;
  return false;
}
