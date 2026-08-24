/**
 * Template registry — the machine-readable index of the section-template system.
 *
 * This is the code-side source of truth. The design-side catalog (taxonomy IDs,
 * artboards, per-variant rulings) lives outside this repo, so CI cannot diff the
 * two automatically — `id` and `paperPage` are the hand-carried link between them
 * and are the only fields here that a reviewer has to check by eye.
 *
 * `DECISIONS #n` in the notes below cites the internal design-decision log, which
 * is not public. Each citation restates its rule inline, so nothing here depends
 * on having that document to be actionable — the number is provenance, not a
 * pointer you need to follow.
 *
 * DESIGN RULE: store only what cannot be derived.
 *
 * Anything derivable is computed rather than written down, because a stored copy
 * drifts silently and a derived one cannot. So there is no `family` field (it is
 * the part of `id` before the dot), no `status` field (a template is `built` when
 * `componentPath` resolves to a real file and `planned` when it does not), and no
 * `adoptionCount` (that is counted from real imports by `scripts/check-registry.ts`).
 *
 * Enforced by `pnpm check:registry` (DECISIONS #93):
 *   - every file in `src/components/templates/` and `src/components/system/`
 *     has an entry here (a paired Preact twin `.tsx` is exempt)
 *   - every entry with a `componentPath` points at a file that exists
 *   - no duplicate ids
 *
 * @see scripts/check-registry.ts
 */

/** Tone is orthogonal to product brand (`data-app`). Do not conflate them. */
export const TONES = ["default", "muted", "inverted", "brand"] as const;
export type Tone = (typeof TONES)[number];

/**
 * How a template gets from 1440 to 375. Named per DECISIONS: a re-authored narrow
 * layout is a different thing from a reflow, and calling both "responsive" is how
 * the two stopped being distinguishable in review.
 */
export const RESPONSIVE_STRATEGIES = [
  /** Same composition, columns step down. The default. */
  "reflow",
  /** A genuinely different narrow layout, authored separately. Never a scaled SVG. */
  "reauthored",
  /** Content scrolls horizontally inside its own container; the page never does. */
  "scroll",
  /** Multi-column content collapses to a single column at a named breakpoint. */
  "collapse",
  /** Not responsive — size is chosen by context, not by viewport. */
  "static",
] as const;
export type ResponsiveStrategy = (typeof RESPONSIVE_STRATEGIES)[number];

/** Templates compose pages; primitives compose templates. The styleguide groups by this. */
export const KINDS = ["template", "primitive"] as const;
export type Kind = (typeof KINDS)[number];

export interface TemplateEntry {
  /** Taxonomy ID, e.g. `related-content.rail`. Family is the part before the dot. */
  readonly id: string;
  readonly kind: Kind;
  /**
   * Path relative to the repo root. `null` means designed but not built —
   * which is the honest state of most of this list today.
   */
  readonly componentPath: string | null;
  /**
   * The axes this template genuinely varies along. NOT a `variant=` prop —
   * FLEXIBILITY-SPEC forbids those. An empty array means one composition.
   */
  readonly variantAxes: readonly string[];
  /**
   * Tones with real artboards. Almost everything is `["default"]`: per DECISIONS
   * #26 each template is drawn at its native tone and other tones are documented
   * as token substitutions, then commissioned when a page actually needs one.
   */
  readonly tones: readonly Tone[];
  readonly responsive: ResponsiveStrategy;
  /** True when it hydrates. Counts against the per-page island budget. */
  readonly island: boolean;
  /** Paper page holding its artboards. The hand-carried link to the design catalog. */
  readonly paperPage: number;
  readonly notes?: string;
  /**
   * Renders an items[] collection; must declare `contentShape` once built.
   * True for a template that pours an array of CMS/data-driven items into a
   * layout (a card grid, a rail, a table body) — false/omitted for a
   * single-instance template (a page header, a hero) and for a generic
   * layout primitive that takes arbitrary slotted children rather than an
   * items[] prop (Stack/Inline/Split/Bleed/Grid). `scripts/check-registry.ts`
   * checks this flag directly, never a family-name list — a name list can
   * silently stop matching any real entry and go vacuous without anyone
   * noticing (that happened once; see the script's own history).
   */
  readonly collectionBound?: true;
  /**
   * How this template tolerates the shape of the content poured into it —
   * item counts, heading/item text lengths, and what happens outside the
   * planned range. Optional: only collection-bound templates (blog cards,
   * integration walls, testimonials, logo clouds, comparison tables,
   * feature grids) need it, and only once they are actually built.
   *
   * The budgets are a ceiling chosen so the layout never has to reach for
   * its overflow fallback in normal use — `overflow` documents the safety
   * net, not the plan. If a family is routinely hitting its overflow
   * behaviour, the budget was wrong, not the content.
   */
  readonly contentShape?: {
    /** Fewest items the layout was drawn for. Fewer and it looks unfinished, not empty (see `EmptyStateProps`). */
    readonly minItems?: number;
    /** Most items the layout was drawn for before `overflow` takes over. */
    readonly maxItems?: number;
    /** Whether/why the layout wants an odd or even count (e.g. a 3-up grid reads badly at 4). Prose, not a boolean. */
    readonly oddCount?: string;
    /** Heading string length the layout was drawn for, and what happens past it. */
    readonly headingBudget?: string;
    /** Per-item text length the layout was drawn for, and what happens past it. */
    readonly itemBudget?: string;
    /** The fallback behaviour when content exceeds the budgets above — e.g. "scrolls", "wraps to a second row", "truncates with an ellipsis". */
    readonly overflow?: string;
  };
  /**
   * Props `TemplateStage` spreads onto the live component when it renders
   * this entry on `/styleguide` (`<Component {...(demoProps ?? {})} />`).
   * Optional: a component whose every prop is optional is zero-prop-safe and
   * can omit this; a component with a required prop (e.g. `heading`,
   * `items`) needs it or `TemplateStage` throws. Values here are demo data
   * only — realistic, never invented placeholder lorem — and are never
   * read by anything except the styleguide render.
   */
  readonly demoProps?: Readonly<Record<string, unknown>>;
  /**
   * Static demo HTML `TemplateStage` renders into the component's slots on
   * `/styleguide`. Keys are slot names — `default` and `media` are the two
   * the stage supports. Needed only by primitives whose whole job is
   * composing slotted children (the layout set); like `demoProps`, demo-only.
   */
  readonly demoSlots?: Readonly<Partial<Record<"default" | "media", string>>>;
}

/**
 * Seeded from the Rounds A + B handoff pack (Paper pages 22–29). Every entry is
 * `componentPath: null` because `src/components/templates/` does not exist yet —
 * that is Wave 1 (#248) and Wave 2 (#249). The registry existing first is the
 * point: templates register as they land, instead of a retro-registration pass
 * across all of them afterwards.
 */
export const TEMPLATE_REGISTRY: readonly TemplateEntry[] = [
  // ── page-header (Paper 22) ───────────────────────────────────────────────
  {
    id: "page-header.plain",
    kind: "template",
    componentPath: null,
    variantAxes: ["h1 length", "meta parts present"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 22,
    notes:
      "Build from the meta-collapse board first: it encodes the separator rule, and getting that wrong breaks every other page-header variant.",
  },
  {
    id: "page-header.centered",
    kind: "template",
    componentPath: null,
    variantAxes: ["h1 length", "dek present"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 22,
  },
  {
    id: "page-header.tinted",
    kind: "template",
    componentPath: null,
    variantAxes: ["band height", "tier count"],
    tones: ["default", "brand"],
    responsive: "reflow",
    island: false,
    paperPage: 22,
  },
  {
    id: "page-header.with-breadcrumb",
    kind: "template",
    componentPath: null,
    variantAxes: ["crumb count", "year present"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 22,
    notes:
      "Consumes the breadcrumb primitive, which emits visual crumbs and BreadcrumbList JSON-LD together (#248).",
  },
  {
    id: "page-header.with-action",
    kind: "template",
    componentPath: null,
    variantAxes: ["action present"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 22,
  },
  {
    id: "page-header.split-masthead",
    kind: "template",
    componentPath: null,
    variantAxes: ["lane content", "year present"],
    tones: ["default"],
    responsive: "reauthored",
    island: false,
    paperPage: 22,
    notes:
      "Drops below lg to a re-authored single-lane layout rather than squeezing the split.",
  },

  // ── data-display (Paper 23) ──────────────────────────────────────────────
  {
    id: "data-display.metadata-block",
    kind: "template",
    componentPath: null,
    collectionBound: true,
    variantAxes: ["item count", "chip count", "value length", "sticky"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 23,
    notes:
      "Drawn at 1 item and at 93 chips. It is a cardinality-and-overflow component; the styling barely moves.",
  },
  {
    id: "data-display.spec-table",
    kind: "template",
    componentPath: null,
    collectionBound: true,
    variantAxes: ["column count", "sticky header", "row wrap"],
    tones: ["default"],
    responsive: "scroll",
    island: false,
    paperPage: 23,
    notes:
      "Scrolls horizontally inside its own container. The page body never scrolls sideways.",
  },
  {
    id: "data-display.description-list",
    kind: "template",
    componentPath: null,
    collectionBound: true,
    variantAxes: ["column count", "ragged terms", "two-part terms"],
    tones: ["default"],
    responsive: "collapse",
    island: false,
    paperPage: 23,
    notes: "Two-column form collapses at 768.",
  },
  {
    id: "data-display.stacked-list",
    kind: "template",
    componentPath: null,
    collectionBound: true,
    variantAxes: ["density", "row count", "in-prose"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 23,
    notes: "The row primitive behind term-hub.entry-index. Build it once.",
  },

  // ── term-hub (Paper 24) ──────────────────────────────────────────────────
  {
    id: "term-hub.editorial",
    kind: "template",
    componentPath: null,
    collectionBound: true,
    variantAxes: ["member count", "term register", "identity block"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 24,
    notes:
      "Carries a 170px image slot and a category chip, so it keeps its own card rather than adopting card.hex-corner (#87). Terms render verbatim — no normalisation.",
  },
  {
    id: "term-hub.entry-index",
    kind: "template",
    componentPath: null,
    collectionBound: true,
    variantAxes: ["member count", "cross-link block", "dual collection"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 24,
    notes: "A stacked list, not a card grid.",
  },
  {
    id: "term-hub.catalog",
    kind: "template",
    componentPath: null,
    collectionBound: true,
    variantAxes: ["item count", "logo shape"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 24,
    notes: "120x40 logo optical box. Thin grids centre rather than left-align.",
  },

  // ── process-steps (Paper 25) ─────────────────────────────────────────────
  {
    id: "process-steps.vertical-code",
    kind: "template",
    componentPath: null,
    collectionBound: true,
    variantAxes: ["step count", "code present", "copied state"],
    tones: ["default"],
    responsive: "reauthored",
    island: true,
    paperPage: 25,
    notes: "Copy-to-clipboard makes it interactive.",
  },
  {
    id: "process-steps.compact-list",
    kind: "template",
    componentPath: null,
    collectionBound: true,
    variantAxes: ["step count", "trailing link", "ragged rows"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 25,
    notes:
      "Numerals are zero-padded (01, never 1) per DECISIONS #76. careers.astro emits raw 1–4 from CAREERS_HIRING_PROCESS: pad in the component, never edit the data.",
  },

  // ── related-content (Paper 26) ───────────────────────────────────────────
  {
    id: "related-content.rail",
    kind: "template",
    componentPath: null,
    collectionBound: true,
    variantAxes: ["column count", "sidebar", "item count"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 26,
    notes:
      "Image-free by ruling (#63). One heading string sitewide: 'More like this'. Grid arrangements use card.hex-corner; the sidebar and 1-item arrangements deliberately do not (#87).",
  },

  // ── filterable-index (Paper 28, 29) ──────────────────────────────────────
  {
    id: "filterable-index.shell",
    kind: "template",
    componentPath: null,
    collectionBound: true,
    variantAxes: ["facet count", "facet select mode", "search engine"],
    tones: ["default"],
    responsive: "reauthored",
    island: true,
    paperPage: 29,
    notes:
      "Rail everywhere; no horizontal facet bar exists and no prop reaches one (#64, #90). At 375 the rail becomes a drawer. Count header is the aria-live region.",
  },
  {
    id: "filterable-index.zero-results",
    kind: "template",
    componentPath: null,
    variantAxes: [],
    tones: ["default"],
    responsive: "reauthored",
    island: true,
    paperPage: 28,
    notes:
      "Replaces the result region only. Header, chip strip and facet rail all stay exactly in place.",
  },

  // ── primitives (Paper 1) ─────────────────────────────────────────────────
  {
    id: "mark.hexagon",
    kind: "primitive",
    componentPath: null,
    variantAxes: ["solid | outline", "size"],
    tones: ["default", "brand"],
    responsive: "static",
    island: false,
    paperPage: 1,
    notes:
      "Outline draws 1px narrower so it occupies the same box as the solid sibling and the two are swappable.",
  },
  {
    id: "mark.hexagon-numeral",
    kind: "primitive",
    componentPath: null,
    variantAxes: ["bare | outline | tinted | solid"],
    tones: ["default"],
    responsive: "static",
    island: false,
    paperPage: 1,
    notes:
      "All four treatments retained and picked by context, not ranked (#74). Numerals always zero-padded (#76).",
  },
  {
    id: "mark.hex-corner",
    kind: "primitive",
    componentPath: null,
    variantAxes: [],
    tones: ["default"],
    responsive: "static",
    island: false,
    paperPage: 1,
    notes:
      "A treatment applied to any clipped surface, not a card (#91). Size-independent: one 420x300 SVG anchored right -57 / bottom -40 docks correctly at any width and height. Host owes it overflow:clip, a radius, --card-halo, and no content in the bottom-right 90x80. Floor is 240x140 — the hexagon is a fixed 80px and does not scale.",
  },
  {
    id: "card.hex-corner",
    kind: "primitive",
    componentPath: null,
    variantAxes: ["meta parts present"],
    tones: ["default", "inverted"],
    responsive: "reflow",
    island: false,
    paperPage: 1,
    notes:
      "One consumer of mark.hex-corner. Title-led, no excerpt slot (#83). 363x260 is this card's chosen size, not a constraint the corner imposes.",
  },

  // ── section primitives (Paper 1, Wave 1 substrate #248) ──────────────────
  // paperPage: 1 follows the existing primitive convention above; unconfirmed
  // against the real design catalog for these specifically — see the Wave 1
  // handoff notes.
  {
    id: "section-intro.default",
    kind: "primitive",
    componentPath: "src/components/system/SectionIntro.astro",
    variantAxes: [
      "align: start | center",
      "layout: stacked | split",
      "headingLevel: 1 | 2 | 3",
    ],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 1,
    notes:
      "Eyebrow/heading/description/link block. Absence collapses — every piece but heading is optional and an omitted one leaves no gap. Default styling reproduces the current house idiom byte-for-byte (see sectionIntro.shared.ts); tone colours are not wired into default rendering this wave. Preact twin at SectionIntro.tsx for island call sites.",
    demoProps: {
      eyebrow: "The platform advantage",
      heading: "One foundation for ML pipelines and AI agents",
      // h3: the demo renders under Components (h2) > entry (h3) on /styleguide
      headingLevel: 3,
      emphasis: "AI agents",
      description:
        "ZenML is a metadata layer on top of your existing infrastructure, meaning all data and compute stays on your side.",
      link: { href: "/features", label: "See all features" },
      align: "center",
      layout: "stacked",
    },
  },
  {
    id: "empty-state.quiet",
    kind: "primitive",
    componentPath: "src/components/system/EmptyState.astro",
    variantAxes: [],
    tones: ["default"],
    responsive: "static",
    island: false,
    paperPage: 1,
    notes:
      "Reproduces LLMOpsFilter's current renderEmptyState look literally (bg-gray-50 card, not tone tokens) for pixel-parity migration. At most one recovery action — a second belongs on the caller's own markup, not this primitive. Preact twin at EmptyState.tsx, required because the main consumers (LLMOpsFilter, MLOpsFilter, BlogSearch) are islands.",
    demoProps: {
      heading: 'No entries tagged "vector-database" yet.',
      description: "This tag is used by 0 of 2,026 database entries.",
      action: {
        href: "/llmops-database",
        label: "Browse all entries",
        weight: "outline",
      },
      reserveHeight: true,
      minHeightClass: "min-h-[16rem]",
    },
  },
  {
    id: "breadcrumb.default",
    kind: "primitive",
    componentPath: "src/components/system/Breadcrumb.astro",
    variantAxes: [],
    tones: ["default"],
    responsive: "static",
    island: false,
    paperPage: 1,
    notes:
      "One prop list drives both the visual crumb trail and its BreadcrumbList JSON-LD. Matches the pre-existing features/case-study/cloud-features crumb (text separator, zenml-500 hover) — not the llmops/mlops chevron variant, which is a different shape (SVG separator, no outer wrapper, different hover color, line-clamp) and has no registry entry yet.",
    demoProps: {
      items: [
        { label: "Features", href: "/features" },
        { label: "Model Control Plane" },
      ],
      // Demo stage only (see Breadcrumb.astro's TSDoc) — /styleguide renders
      // this crumb trail for a page that doesn't exist, so it must not emit
      // a fabricated BreadcrumbList into the page's structured data. A real
      // route must never pass this.
      jsonLd: false,
    },
  },
  {
    id: "layout.stack",
    kind: "primitive",
    componentPath: "src/components/system/layout/Stack.astro",
    variantAxes: [
      "align: start | center | end | stretch",
      "dividers: true | false",
    ],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 1,
    notes:
      "Vertical flow, one gap step between children. Owns no surrounding whitespace — the gap is only ever between children, never a margin the caller cancels. dividers draws a hairline via --section-border. Preact twin at Stack.tsx.",
    demoProps: { space: "sm", align: "stretch", dividers: true },
    demoSlots: {
      default:
        '<p class="text-sm">First child</p><p class="text-sm">Second child</p><p class="text-sm">Third child</p>',
    },
  },
  {
    id: "layout.inline",
    kind: "primitive",
    componentPath: "src/components/system/layout/Inline.astro",
    variantAxes: [
      "align: start | center | end | between",
      "alignY: top | center | bottom",
      "wrap: true | false",
      "collapseBelow: breakpoint",
    ],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 1,
    notes:
      "Horizontal row of children with one spacing step between them. collapseBelow forces children to full-width/stacked below a breakpoint (e.g. a button group). Preact twin at Inline.tsx.",
    demoProps: { space: "xs", alignY: "center", align: "start", wrap: true },
    demoSlots: {
      default:
        '<span class="rounded-full border border-gray-200 px-3 py-1 text-sm">Orchestration</span><span class="rounded-full border border-gray-200 px-3 py-1 text-sm">Evals</span><span class="rounded-full border border-gray-200 px-3 py-1 text-sm">Registry</span>',
    },
  },
  {
    id: "layout.split",
    kind: "primitive",
    componentPath: "src/components/system/layout/Split.astro",
    variantAxes: [
      "mediaSide: left | right",
      "ratio: 1/2 | 2/5 | 3/5",
      "collapseBelow: breakpoint",
    ],
    tones: ["default"],
    responsive: "collapse",
    island: false,
    paperPage: 1,
    notes:
      "Two-lane prose/media layout. Prose is always first in the DOM regardless of mediaSide (screen-reader order matches stacked order); the visual side flips with CSS order, never direction: rtl. Empty media slot collapses to a single centred column. Preact twin at Split.tsx.",
    demoProps: {
      mediaSide: "right",
      ratio: "1/2",
      space: "lg",
      collapseBelow: "lg",
    },
    demoSlots: {
      default:
        '<h3 class="text-lg font-semibold">Prose lane</h3><p class="mt-2 text-sm text-gray-600">Copy sits first in the DOM regardless of which side the media renders on.</p>',
      media:
        '<div class="flex h-40 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-sm text-gray-500">media slot</div>',
    },
  },
  {
    id: "layout.bleed",
    kind: "primitive",
    componentPath: "src/components/system/layout/Bleed.astro",
    variantAxes: ["to: container | viewport"],
    tones: ["default"],
    responsive: "static",
    island: false,
    paperPage: 1,
    notes:
      'Breaks a child out of its horizontal inset. to="container" cancels exactly --spacing-gutter; to="viewport" reuses the established full-bleed trick already in CodeCompare.astro/PullQuote.astro. Preact twin at Bleed.tsx.',
    demoProps: { to: "container" },
    demoSlots: {
      default:
        '<div class="rounded-md border border-gray-200 bg-gray-50 p-space-xs text-center text-sm text-gray-500">bleeds to the container edge</div>',
    },
  },
  {
    id: "layout.grid",
    kind: "primitive",
    componentPath: "src/components/system/layout/Grid.astro",
    variantAxes: ["cols: per-breakpoint 1-12"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 1,
    notes:
      "Explicit-column grid; repeat(auto-fit, minmax()) is banned by the contract. Has no lastRow/odd-count handling — CSS can't know item count from here, and the correct nth-child formula interacts badly with responsive cols. Odd-count handling is a per-family contract that lands with the first collection family that needs it (#248 defers it). Preact twin at Grid.tsx.",
    demoProps: {
      cols: { base: 1, sm: 2, lg: 3 },
      space: "sm",
    },
    demoSlots: {
      default:
        '<div class="rounded-md border border-gray-200 p-space-xs text-center text-sm">One</div><div class="rounded-md border border-gray-200 p-space-xs text-center text-sm">Two</div><div class="rounded-md border border-gray-200 p-space-xs text-center text-sm">Three</div><div class="rounded-md border border-gray-200 p-space-xs text-center text-sm">Four</div>',
    },
  },
];

/** Family prefix — the part of the id before the dot. Derived, never stored. */
export function familyOf(id: string): string {
  const dot = id.indexOf(".");
  return dot === -1 ? id : id.slice(0, dot);
}

/**
 * Derived from whether a component path is set. There is no stored status field
 * precisely so this cannot disagree with the tree.
 */
export function statusOf(entry: TemplateEntry): "built" | "planned" {
  return entry.componentPath ? "built" : "planned";
}

export function getTemplate(id: string): TemplateEntry | undefined {
  return TEMPLATE_REGISTRY.find((entry) => entry.id === id);
}

/** Registry grouped by family, for the styleguide's navigation. */
export function templatesByFamily(): Map<string, TemplateEntry[]> {
  const byFamily = new Map<string, TemplateEntry[]>();
  for (const entry of TEMPLATE_REGISTRY) {
    const family = familyOf(entry.id);
    const bucket = byFamily.get(family);
    if (bucket) bucket.push(entry);
    else byFamily.set(family, [entry]);
  }
  return byFamily;
}
