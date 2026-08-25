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
    componentPath: "src/components/templates/PageHeader.astro",
    variantAxes: ["h1 length", "meta parts present"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 22,
    notes:
      "Build from the meta-collapse board first: it encodes the separator rule, and getting that wrong breaks every other page-header variant.",
    demoProps: {
      heading: "Our Team",
      description: "Meet the people building the future of MLOps.",
    },
  },
  {
    id: "page-header.centered",
    kind: "template",
    componentPath: "src/components/templates/PageHeader.astro",
    variantAxes: ["h1 length", "dek present"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 22,
    demoProps: {
      align: "center",
      eyebrow: "Integrations",
      heading: "Explore the MLOps landscape with ZenML",
      description: "ZenML integrates with many different third-party tools.",
    },
  },
  {
    id: "page-header.tinted",
    kind: "template",
    componentPath: "src/components/templates/PageHeader.astro",
    variantAxes: ["band height", "tier count"],
    tones: ["default", "brand"],
    responsive: "reflow",
    island: false,
    paperPage: 22,
    demoProps: {
      tone: "brand",
      align: "center",
      eyebrow: "Careers",
      heading: "Join the team building the future of MLOps",
      description: "We're a small, remote-first team.",
    },
  },
  {
    id: "page-header.with-breadcrumb",
    kind: "template",
    componentPath: "src/components/templates/PageHeader.astro",
    variantAxes: ["crumb count", "year present"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 22,
    notes:
      "Consumes the breadcrumb primitive, which emits visual crumbs and BreadcrumbList JSON-LD together (#248).",
    demoProps: {
      breadcrumb: [
        { label: "Docs", href: "/docs" },
        { label: "Getting started" },
      ],
      heading: "Getting started",
    },
  },
  {
    id: "page-header.with-action",
    kind: "template",
    componentPath: "src/components/templates/PageHeader.astro",
    variantAxes: ["action present"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 22,
    notes:
      "The action is the unnamed default slot — the same slot TemplateStage wires via demoSlots.default.",
    demoProps: {
      eyebrow: "Careers",
      heading: "Join the team",
    },
    demoSlots: {
      default:
        '<div class="mt-8 flex gap-3"><a href="/careers" class="inline-flex items-center rounded-md bg-zenml-500 px-4 py-2 text-sm font-semibold text-white">See open roles</a></div>',
    },
  },
  {
    id: "page-header.split-masthead",
    kind: "template",
    componentPath: "src/components/templates/PageHeader.astro",
    variantAxes: ["lane content", "year present"],
    tones: ["default"],
    responsive: "reauthored",
    island: false,
    paperPage: 22,
    notes:
      "Drops below lg to a re-authored single-lane layout rather than squeezing the split.",
    demoProps: {
      heading: "Jane Doe",
      masthead: {
        name: "Jane Doe",
        bio: "Writes about MLOps in production.",
        meta: "12 posts",
        links: [
          {
            href: "https://www.linkedin.com",
            label: "LinkedIn",
            external: true,
          },
        ],
      },
    },
  },

  // ── data-display (Paper 23) ──────────────────────────────────────────────
  {
    id: "data-display.metadata-block",
    kind: "template",
    componentPath: "src/components/templates/MetadataBlock.astro",
    collectionBound: true,
    variantAxes: [
      "item count",
      "value kind (pill/links/chips/compare)",
      "chip count",
      "sticky",
    ],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 23,
    notes:
      "Drawn at 1 item and at 93 chips. It is a cardinality-and-overflow component; the styling barely moves. Label color and heading level are hardcoded to the current single live usage (gray-400) — a second consumer needing another color gets a prop added, never a normalize. The sticky axis isn't exercised live: IntegrationDetailSidebar composes this under one page-owned sticky wrapper.",
    contentShape: {
      minItems: 1,
      maxItems: 4,
      overflow:
        "No cap observed live; the chips value kind is the tested high-cardinality path.",
    },
    demoProps: {
      items: [
        {
          label: "Category",
          value: {
            kind: "pill",
            href: "/integration-type/orchestrator",
            label: "Orchestrator",
          },
        },
        {
          label: "Technologies",
          value: {
            kind: "chips",
            chips: [
              { label: "LangChain", href: "#", variant: "blue" },
              { label: "RAG", href: "#", variant: "blue" },
            ],
          },
        },
      ],
    },
  },
  {
    id: "data-display.spec-table",
    kind: "template",
    componentPath: "src/components/templates/SpecTable.astro",
    collectionBound: true,
    variantAxes: [
      "column count",
      "section count",
      "row wrap",
      "CTA row present",
    ],
    tones: ["default"],
    responsive: "scroll",
    island: false,
    paperPage: 23,
    notes:
      "Scrolls horizontally inside its own container; the page body never scrolls sideways. stickyFirstColumn pins the label column with position: sticky, each pinned cell repeating its row background so scrolled content can't show through — opt-in because the pinned cells' opaque backgrounds shift the live table's transparent-cell blend, and the live pricing route stays pixel-parity until cutover. The demo exercises the pin.",
    contentShape: {
      minItems: 3,
      maxItems: 24,
      overflow:
        "Rows scroll with the table body inside the bordered container; nothing truncates.",
    },
    demoProps: {
      stickyFirstColumn: true,
      columns: ["Open Source", "Scale", "Enterprise"],
      sections: [
        {
          heading: "Core platform",
          rows: [
            { label: "Pipeline orchestration", values: [true, true, true] },
            {
              label: "Support level",
              values: ["Community", "Priority", "Dedicated"],
            },
          ],
        },
      ],
    },
  },
  {
    id: "data-display.description-list",
    kind: "template",
    componentPath: "src/components/templates/DescriptionList.astro",
    collectionBound: true,
    variantAxes: [
      "item count",
      "icon presence",
      "trailing chip group",
      "two-part terms",
    ],
    tones: ["default"],
    responsive: "collapse",
    island: false,
    paperPage: 23,
    notes:
      "Two-column form collapses at 768. The trailing chip group renders outside the dl (hr + bare term/value div) — reproducing the one live consumer's actual DOM, not the idealized single-dl shape. Label color (zenml-500) and the 5-icon set are only proven against that one consumer (CaseStudySidebar) so far.",
    contentShape: {
      minItems: 1,
      maxItems: 6,
      overflow:
        "The list grows with no cap; the live consumer draws at 5 items plus one trailing chip group.",
    },
    demoProps: {
      items: [
        {
          term: "Company",
          value: { kind: "text", text: "Acme Corp", icon: "building" },
        },
        {
          term: "Website",
          value: { kind: "link", href: "#", label: "acme.com", icon: "link" },
        },
      ],
      trailing: {
        term: "Use Cases",
        chips: ["Fraud detection", "Forecasting"],
      },
    },
  },
  {
    id: "data-display.stacked-list",
    kind: "template",
    componentPath: "src/components/templates/StackedList.astro",
    collectionBound: true,
    variantAxes: [
      "density",
      "row count",
      "meta parts present",
      "trailing count present",
      "in-prose",
    ],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 23,
    notes:
      "The row primitive behind term-hub.entry-index. Built standalone this wave — no live duplicate existed to migrate, so /styleguide is its only render until term-hub lands.",
    contentShape: {
      minItems: 1,
      maxItems: 122,
      overflow:
        "No built-in cap; term-hub.entry-index is expected to pass up to the tag facet's 122 rows.",
    },
    demoProps: {
      items: [
        {
          title: "vector-database",
          href: "#",
          meta: ["ML", "122 entries"],
          trailingCount: 122,
        },
        { title: "fine-tuning", href: "#", meta: ["ML"], trailingCount: 34 },
      ],
    },
  },

  // ── term-hub (Paper 24) ──────────────────────────────────────────────────
  {
    id: "term-hub.editorial",
    kind: "template",
    componentPath: "src/components/templates/TermHubEditorial.astro",
    collectionBound: true,
    variantAxes: ["member count", "term register", "identity block"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 24,
    notes:
      "Carries a 170px image slot and a category chip, so it keeps its own card rather than adopting card.hex-corner (#87). Terms render verbatim — no normalisation (one live tag name really ends in a space). The identity block (author avatar/bio) is the page-header split-masthead's job, not this component's — it renders only the post listing.",
    contentShape: {
      minItems: 1,
      maxItems: 60,
      itemBudget:
        "Title clamps at 2 lines, excerpt at 2; a missing image collapses the media slot.",
      overflow: "The card grid wraps to further rows; nothing paginates yet.",
    },
    demoProps: {
      emptyHeading: "No posts with this tag yet.",
      posts: [
        {
          href: "/blog/zenmls-month-of-mlops-recap",
          title: "ZenML's Month of MLOps recap",
          excerpt: "How the community shipped production pipelines in a month.",
          authorName: "Hamza Tahir",
          readingTime: "7 Mins Read",
          categoryName: "ZenML",
          categorySlug: "zenml",
        },
      ],
    },
  },
  {
    id: "term-hub.entry-index",
    kind: "template",
    componentPath: "src/components/templates/TermHubEntryIndex.astro",
    collectionBound: true,
    variantAxes: [
      "arrangement: cards | items",
      "member count",
      "cross-link block",
      "dual collection",
    ],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 24,
    notes:
      "Two arrangements per section, never both: cards (live parity — the entry card grid every database term route renders today) and items (the drawn stacked list of data-display.stacked-list rows — new-brand/cutover, no live caller; the demo exercises it). A section without a heading renders no <h2> (single-collection page); the industry pages pass two headed sections (dual collection).",
    contentShape: {
      minItems: 0,
      maxItems: 200,
      overflow:
        "The grid/list grows with the term's matching entries; a zero-entry term no longer builds a page, but the component still collapses to its empty state at 0.",
    },
    demoProps: {
      emptyHeading: "No LLMOps entries with this tag yet.",
      sections: [
        {
          items: [
            {
              title: "Evaluating conversational agents at scale",
              href: "#",
              meta: ["Acme", "2025"],
            },
            {
              title: "Replay-based evals for a support copilot",
              href: "#",
              meta: ["Initech", "2024"],
            },
          ],
        },
      ],
    },
  },
  {
    id: "term-hub.catalog",
    kind: "template",
    componentPath: "src/components/templates/TermHubCatalog.astro",
    collectionBound: true,
    variantAxes: ["item count", "logo shape"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 24,
    notes:
      "120x40 logo optical box. A row thinner than the 3-column breakpoint centres rather than left-aligning (leaving packed empty cells reads as broken). Reuses IntegrationCard for the tile itself.",
    contentShape: {
      minItems: 1,
      maxItems: 20,
      overflow: "The tile grid wraps to further rows.",
    },
    demoProps: {
      emptyHeading: "No integrations of this type yet.",
      items: [
        {
          href: "/integrations/airflow",
          title: "Apache Airflow",
          categoryLabel: "Orchestrator",
        },
        {
          href: "/integrations/mlflow",
          title: "MLflow",
          categoryLabel: "Experiment Tracker",
        },
      ],
    },
  },

  // ── process-steps (Paper 25) ─────────────────────────────────────────────
  {
    id: "process-steps.vertical-code",
    kind: "template",
    componentPath: "src/components/templates/ProcessSteps.astro",
    collectionBound: true,
    variantAxes: ["step count", "code present", "copied state"],
    tones: ["default"],
    responsive: "reauthored",
    island: false,
    paperPage: 25,
    notes:
      "Copy-to-clipboard (the drawn copied state) is the new-brand affordance — the live get-started blocks it absorbs have no copy button, so the parity build is static HTML. Flips to an island when the copy affordance ships at cutover. highlightedHtml is Shiki output produced in the page's frontmatter; Shiki never runs in the component.",
    contentShape: {
      minItems: 3,
      maxItems: 3,
      itemBudget:
        "One short heading and 1-2 sentences per step; the code block scrolls horizontally inside its own container past ~80 columns.",
      overflow: "Steps stack vertically; the list itself never truncates.",
    },
    demoProps: {
      layout: "vertical-code",
      steps: [
        {
          title: "Install ZenML",
          body: "Get the CLI installed and connect to a stack.",
          highlightedHtml:
            '<pre class="dark-code-block"><code>pip install zenml</code></pre>',
        },
      ],
    },
  },
  {
    id: "process-steps.compact-list",
    kind: "template",
    componentPath: "src/components/templates/ProcessSteps.astro",
    collectionBound: true,
    variantAxes: ["step count", "trailing link", "ragged rows"],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 25,
    notes:
      "Numerals are zero-padded (01, never 1) per DECISIONS #76 — but only on the numeralStyle: 'zero-padded' new-brand/demo path. Live careers.astro renders raw 1–4 from CAREERS_HIRING_PROCESS via the default 'raw'; pad in the component, never edit the data. An empty duration collapses (the live 4th step has one).",
    contentShape: {
      minItems: 2,
      maxItems: 6,
      itemBudget:
        "Title one line, duration a few words, body 1-3 sentences; long bodies just grow the card.",
      overflow: "The 2-column grid wraps to further rows.",
    },
    demoProps: {
      layout: "compact-list",
      numeralStyle: "zero-padded",
      steps: [
        {
          number: 1,
          title: "Application review",
          duration: "3 days",
          body: "We review your CV and portfolio.",
        },
        {
          number: 2,
          title: "Technical challenge",
          duration: "2 hours",
          body: "A short exercise close to the real work.",
        },
      ],
    },
  },

  // ── related-content (Paper 26) ───────────────────────────────────────────
  {
    id: "related-content.rail",
    kind: "template",
    componentPath: "src/components/templates/RelatedRail.astro",
    collectionBound: true,
    variantAxes: [
      "card shape (meta-card/logo-lockup/icon-link/blog-card/thumbnail)",
      "column count",
      "sidebar",
      "item count",
      "reveal-on-scroll",
    ],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 26,
    notes:
      "Image-free by ruling (#63). Renders only the items arrangement (grid or list) — the six live surfaces keep their own heading treatments and section chrome, so 'More like this' as the one sitewide heading, card.hex-corner on grid cards, and the bind-separator-to-following-token meta form are the new-brand cutover states, not this parity build. The live parity build keeps per-surface headings, hex-corner-free cards, and free-standing meta separators (a wrap leaves the dot at the line end).",
    contentShape: {
      minItems: 1,
      maxItems: 3,
      overflow:
        "All six live surfaces cap related items at 3; the sidebar thumbnail list has no observed cap.",
    },
    demoProps: {
      items: [
        {
          kind: "meta-card",
          href: "#",
          title: "Evaluating conversational agents at scale",
          meta: [{ text: "Acme", emphasis: true }, { text: "2025" }],
          summary: "How a support team replayed production traces as evals.",
          tags: ["RAG", "Agents"],
          extraTagCount: 2,
          tagVariant: "blue",
        },
      ],
    },
  },

  // ── filterable-index (Paper 28, 29) ──────────────────────────────────────
  {
    id: "filterable-index.shell",
    kind: "template",
    componentPath: "src/components/islands/filter-index/DataFilterIndex.tsx",
    collectionBound: true,
    variantAxes: [
      "flavor: data (island renders results) | control (island toggles server-rendered cards)",
      "facet count",
      "facet select mode",
      "search engine (Pagefind | JSON substring)",
    ],
    tones: ["default"],
    responsive: "reauthored",
    island: true,
    paperPage: 29,
    notes:
      "Rail everywhere; no horizontal facet bar exists and no prop reaches one (#64, #90). At 375 the rail becomes a drawer behind one Filters trigger. Count header is the aria-live region; counts are comma-formatted count-of-total in a 44px right-aligned lane. Two flavors share the rail/state/URL machinery: DataFilterIndex (LLMOps/MLOps/blog — the island renders the result cards) and ControlFilterIndex (integrations — the island toggles visibility of server-rendered cards passed as children). Live consumers wire domain accessors as function props, so there is no static demoProps demo — TemplateStage shows its unresolved-path notice for this entry until a fixture wrapper exists.",
    contentShape: {
      minItems: 66,
      maxItems: 2100,
      itemBudget:
        "Facet ranges it must survive: a 15-term single-select facet with zero-result rows disabled in place, and a 122-term multi-select facet collapsed to 10 behind a Show-all control.",
      overflow:
        "Results paginate client-side; the rail scrolls its own facet list; nothing truncates.",
    },
  },
  {
    id: "filterable-index.zero-results",
    kind: "template",
    componentPath: "src/components/islands/shared/FilterEmptyState.tsx",
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
      "Reproduces the LLMOps/MLOps filter empty-state look (bg-gray-50 card, not tone tokens); that surface itself is FilterEmptyState.tsx, which shares this primitive's class constants but stays outside its contract by design. At most one recovery action — a second belongs on the caller's own markup, not this primitive. Preact twin at EmptyState.tsx, required because island consumers (BlogSearch) can't import .astro components.",
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
      "Two-lane prose/media layout. Prose is always first in the DOM regardless of mediaSide (screen-reader order matches stacked order); the visual side flips with CSS order, never direction: rtl. Empty media slot collapses to a single centred column. space accepts ResponsiveSpace (base + breakpoint overrides); the mlg step (40px, between md 32 and lg 48) exists for the live two-column sections that pair a 40px stacked gap with a wider split gap. Preact twin at Split.tsx.",
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
