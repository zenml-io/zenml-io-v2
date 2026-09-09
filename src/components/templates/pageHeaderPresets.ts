/**
 * Named PageHeader presets for page families that share one look (issue
 * #249). A preset is the sanctioned way for a family to reuse a deviation —
 * repeating the same literal `classOverrides`/`bandClass` object across call
 * sites is not (that is the drift `classOverrides`'s own "migration-parity
 * only" rule exists to prevent). Same pattern as `SECTION_INTRO_PRESETS`.
 */
import type { SectionIntroProps } from "../../lib/section";

type IntroOverrides = NonNullable<SectionIntroProps["classOverrides"]>;

/**
 * The plain hub-index header the llmops-tags/mlops-tags/industry-tags/
 * integration-type index pages share (`tone="default"`, no band). Blog's
 * own tags/category/author index pages moved onto `TERM_HUB_HEADER_INTRO`
 * below in the blog cutover — this preset's remaining consumers are the
 * database-side hubs, unchanged.
 */
export const TAXONOMY_INDEX_INTRO: IntroOverrides = {
  heading: "text-4xl font-bold tracking-tight text-gray-900",
  description: "text-lg text-gray-600",
  descriptionSpacing: "mt-3",
};

/**
 * Blog term-hub header (blog cutover, the approved blog design (DESIGN.md)): the shared
 * `page-header.with-breadcrumb` look for `/tags`, `/tags/[slug]`,
 * `/category`, `/category/[slug]`, `/author` (the author *index*; the
 * author *detail* page uses the `masthead` arrangement instead, restyled
 * directly in `PageHeader.astro` since it has no `SectionIntro` to
 * override). Tokens only, Borna display + Rethink dek — same fluid h1 rung
 * as the blog's own h1s and the post masthead. `tone="default"`: the page
 * keeps its own container (DESIGN.md `max-w-content` + `px-gutter`); this
 * preset carries no `bandClass`/`containerClass`.
 */
export const TERM_HUB_HEADER_INTRO: IntroOverrides = {
  heading:
    "font-display max-w-[1000px] text-[32px] leading-[38px] text-(--color-cream-800) md:text-[56px] md:leading-[62px]",
  description:
    "max-w-[720px] text-[18px] leading-[27px] text-(--color-cream-700)",
  descriptionSpacing: "mt-5",
};
