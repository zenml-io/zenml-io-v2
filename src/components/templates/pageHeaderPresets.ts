/**
 * Named PageHeader presets for page families that share one look (issue
 * #249). A preset is the sanctioned way for a family to reuse a deviation —
 * repeating the same literal `classOverrides`/`bandClass` object across call
 * sites is not (that is the drift `classOverrides`'s own "migration-parity
 * only" rule exists to prevent). Same pattern as `SECTION_INTRO_PRESETS`.
 */
import type { SectionIntroProps } from "../../lib/section";

type IntroOverrides = NonNullable<SectionIntroProps["classOverrides"]>;

/** The blog-taxonomy gradient band (tag/category/author detail pages). */
export const TAXONOMY_BAND = {
  bandClass: "bg-linear-to-t from-primary-50 to-white border-b border-gray-200",
  containerClass: "mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8",
} as const;

/** Intro type inside the taxonomy band (tag/category detail pages). */
export const TAXONOMY_DETAIL_INTRO: IntroOverrides = {
  heading: "text-3xl font-bold tracking-tight text-gray-900",
  description: "text-base text-gray-600",
  descriptionSpacing: "mt-2",
};

/** The plain hub-index header every taxonomy index page shares. */
export const TAXONOMY_INDEX_INTRO: IntroOverrides = {
  heading: "text-4xl font-bold tracking-tight text-gray-900",
  description: "text-lg text-gray-600",
  descriptionSpacing: "mt-3",
};
