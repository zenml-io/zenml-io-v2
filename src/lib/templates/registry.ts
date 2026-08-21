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
 *   - every file in `src/components/templates/` has an entry here
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
