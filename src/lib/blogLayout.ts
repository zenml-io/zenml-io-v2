/**
 * Blog layout lane constants (blog cutover, the approved blog design (DESIGN.md)).
 *
 * Single source of truth for the blog's width lanes — every template that
 * lays out a post, its TOC, or the index rail reads from here rather than
 * repeating a literal. Widths may change later (D2c ruling); when they do,
 * this is the one module to edit.
 */

/** Post masthead / body / tags / author card / prev-next lane — equals the body row (768 prose + 40 gap + 224 TOC) so every section shares one left and right edge. */
export const ARTICLE_LANE = 1032;
/** Article prose column width. */
export const PROSE_COLUMN = 768;
/** Gap between the prose column and the TOC rail. */
export const PROSE_TOC_GAP = 40;
/** Sticky table-of-contents rail width. */
export const TOC_RAIL = 224;
/** Index page facet rail width. */
export const RAIL_WIDTH = 272;
/** Gap between the index facet rail and the results column. */
export const RAIL_GAP = 48;

/**
 * Gap between a "short" `LabsBand` (the blog index, the three taxonomy
 * hubs, and the post masthead all open with one) and the first element of
 * the content that follows it — one class string every consumer applies to
 * its own next section, so the band itself stays agnostic of what comes
 * after it and the value can't drift between the four route kinds.
 */
export const BAND_CONTENT_GAP = "pt-10 md:pt-16";

/** CSS custom-property names the constants above are exposed as. */
export const BLOG_LANE_VARS = {
  articleLane: "--article-lane",
  proseColumn: "--prose-column",
  proseTocGap: "--prose-toc-gap",
  tocRail: "--toc-rail",
  railWidth: "--rail-width",
  railGap: "--rail-gap",
} as const;

/**
 * Emits the lane constants as inline CSS custom properties, for spreading
 * onto a root element's `style` attribute (e.g. the article root).
 */
export function blogLaneStyle(): string {
  return [
    `${BLOG_LANE_VARS.articleLane}: ${ARTICLE_LANE}px`,
    `${BLOG_LANE_VARS.proseColumn}: ${PROSE_COLUMN}px`,
    `${BLOG_LANE_VARS.proseTocGap}: ${PROSE_TOC_GAP}px`,
    `${BLOG_LANE_VARS.tocRail}: ${TOC_RAIL}px`,
    `${BLOG_LANE_VARS.railWidth}: ${RAIL_WIDTH}px`,
    `${BLOG_LANE_VARS.railGap}: ${RAIL_GAP}px`,
  ].join("; ");
}
