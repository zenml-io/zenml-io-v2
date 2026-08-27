/**
 * SectionIntro — shared classes and derivation logic (issue #248).
 *
 * `SectionIntro.astro` and `SectionIntro.tsx` are two renderers of the same
 * primitive (islands can't import `.astro` files, so a Preact twin exists
 * alongside the Astro one). Every class string and every piece of branching
 * logic that affects markup lives here once, so the twins can't drift out
 * of lockstep — each of them only wires these values into JSX/Astro syntax.
 *
 * Classes below reproduce the current ZenML house idiom (copied from real
 * call sites — see e.g. FeatureHero.astro, VsHero.astro,
 * ComplianceSection.astro, BookingExperience.astro's emphasis span) so that
 * migrating a call site to `<SectionIntro>` is pixel-identical (spacing via
 * the equivalent named tokens). Do not tune these values for taste; that's a
 * separate, deliberate change.
 */
import type { SectionIntroProps } from "../../lib/section";

export const SECTION_INTRO_CLASSES = {
  eyebrow: "text-sm font-semibold uppercase tracking-wider text-zenml-500",
  heading: "text-3xl font-bold text-gray-900 sm:text-4xl",
  emphasis: "text-zenml-500",
  description: "text-lg text-gray-600 leading-relaxed",
  link: "inline-flex items-center gap-space-xxs text-base font-semibold text-zenml-500 transition-colors hover:text-zenml-600",
  linkIcon: "h-5 w-5",
  /** Stacked + center: the house pattern for every centered intro on the site. */
  centeredWrap: "mx-auto max-w-3xl text-center",
  splitGrid: "grid gap-space-sm lg:grid-cols-2 lg:items-start lg:gap-space-lg",
} as const;

/**
 * `classOverrides` clusters verified to recur identically across 3+
 * migrated call sites (#248 altitude review). Each is a recurring
 * migration-parity override, deduplicated so a rebrand cutover retunes one
 * export instead of N call sites — same escape-hatch semantics as
 * `classOverrides` itself: only for a site whose classes genuinely deviate
 * from `SECTION_INTRO_CLASSES`, never for new code.
 *
 * `pageHero` is the one multi-key preset: 4 of its 7 heading sites also use
 * `.wrap`, so those spread the whole object (`{...SECTION_INTRO_PRESETS.pageHero}`);
 * the other 3 reference `.pageHero.heading` alone, keeping their own
 * external wrapper (a `data-reveal` div, etc.) unspread.
 */
export const SECTION_INTRO_PRESETS = {
  pageHero: {
    heading: "text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl",
    wrap: "mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8",
  },
  sectionHeading2xl: "text-2xl font-bold text-gray-900 sm:text-3xl",
  darkBandEyebrow:
    "text-sm font-semibold uppercase tracking-wider text-zenml-400",
  cardEyebrow: "text-xs font-semibold uppercase tracking-wider text-zenml-500",
} as const;

/**
 * Resolves the effective per-piece classes, applying the migration-parity
 * `classOverrides` escape hatch from `SectionIntroProps`: an override
 * REPLACES the house default for that piece (spacing classes still apply on
 * top). See the prop's TSDoc in `src/lib/section.ts` — new code must not
 * pass overrides.
 *
 * `wrap` is independent of `align`: a `classOverrides.wrap` value is used
 * verbatim whenever it's set, centered or not — it's the escape hatch for a
 * migrated site whose root wrapper carries classes that have nothing to do
 * with centering (a behavioural hook like a scroll-reveal class, a raw
 * `flex`/`gap` container, a `text-left` band). Only the house default
 * (`SECTION_INTRO_CLASSES.centeredWrap`) is gated on `isCentered`.
 */
export function resolveSectionIntroClasses(
  overrides: SectionIntroProps["classOverrides"] | undefined,
  isCentered: boolean,
) {
  return {
    eyebrow: overrides?.eyebrow ?? SECTION_INTRO_CLASSES.eyebrow,
    heading: overrides?.heading ?? SECTION_INTRO_CLASSES.heading,
    emphasis: overrides?.emphasis ?? SECTION_INTRO_CLASSES.emphasis,
    description: overrides?.description ?? SECTION_INTRO_CLASSES.description,
    link: overrides?.link ?? SECTION_INTRO_CLASSES.link,
    wrap:
      overrides?.wrap ?? (isCentered ? SECTION_INTRO_CLASSES.centeredWrap : ""),
  };
}

export interface SectionIntroSpacing {
  /** Applied to the heading; only non-empty when an eyebrow renders above it. */
  heading: string;
  /** Applied to the description. */
  description: string;
  /** Applied to the link. */
  link: string;
}

/**
 * Vertical gaps between the intro's pieces, expressed as spacing-token
 * utilities (never raw `mt-*` steps). Margins are derived from which piece
 * actually precedes each one in the DOM, so an omitted piece leaves no gap
 * ("absence collapses") without any `show*` boolean or per-instance opt-out.
 *
 * - Stacked: eyebrow → heading → description → link, one column, one flow.
 *   `heading` only gets a top margin when an eyebrow is actually rendered
 *   above it (heading is required, so it's otherwise the first child).
 * - Split: eyebrow → heading share the left column; description → link
 *   share the right column. Each column's first rendered child owns no top
 *   margin — the two columns are visually paired by the grid, not by a
 *   shared vertical rhythm.
 */
export function computeSectionIntroSpacing(
  props: Pick<
    SectionIntroProps,
    "eyebrow" | "description" | "layout" | "classOverrides"
  >,
): SectionIntroSpacing {
  const hasEyebrow = Boolean(props.eyebrow);
  const hasDescription = Boolean(props.description);
  const isSplit = props.layout === "split";
  const o = props.classOverrides;

  return {
    heading: o?.headingSpacing ?? (hasEyebrow ? "mt-space-xxs" : ""),
    description: o?.descriptionSpacing ?? (isSplit ? "" : "mt-space-xs"),
    link:
      o?.linkSpacing ??
      (isSplit ? (hasDescription ? "mt-space-sm" : "") : "mt-space-sm"),
  };
}

export interface HeadingParts {
  before: string;
  /** `null` when there's no emphasis, or it isn't a substring of `heading` — never throws. */
  emphasis: string | null;
  after: string;
}

/**
 * Splits `heading` around `emphasis` for rendering as `before<span>emphasis</span>after`.
 * If `emphasis` is missing or isn't a substring of `heading`, returns the
 * whole heading as `before` with `emphasis: null` — the heading always
 * renders plain rather than throwing.
 */
export function splitHeadingEmphasis(
  heading: string,
  emphasis?: string,
): HeadingParts {
  if (!emphasis) return { before: heading, emphasis: null, after: "" };

  const index = heading.indexOf(emphasis);
  if (index === -1) return { before: heading, emphasis: null, after: "" };

  return {
    before: heading.slice(0, index),
    emphasis,
    after: heading.slice(index + emphasis.length),
  };
}

/** `h1` | `h2` | `h3`, derived from the `headingLevel` prop (default 2). */
export function headingTag(level: 1 | 2 | 3 | undefined): "h1" | "h2" | "h3" {
  return `h${level ?? 2}` as "h1" | "h2" | "h3";
}
