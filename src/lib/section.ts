/**
 * Section composition contract — issue #248.
 *
 * These types describe the shared shape that section-level primitives
 * (`src/components/system/`) compose against. A variant is an arrangement
 * of this one contract, never a component with its own bespoke props.
 */

/** Named background/foreground register a section renders in. Never a colour name. */
export type Tone = "default" | "muted" | "inverted" | "brand";

/** One of the 7 spacing tokens (`--spacing-space-xxs..xxl`). No raw spacing literals. */
export type SpaceStep = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

/**
 * Tailwind's responsive prefixes, in ascending order. `--breakpoint-2xl` is
 * the only overridden stop (1440px, `src/styles/global.css`); sm/md/lg/xl
 * stay at Tailwind's defaults (640/768/1024/1280px). Used by the layout
 * primitive set (`src/components/system/layout/`) for `collapseBelow` /
 * `below` / responsive `space` props.
 */
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export interface CtaProps {
  href: string;
  label: string;
  weight?: "solid" | "outline" | "ghost";
  analytics?: string;
  external?: boolean;
}

export interface SectionIntroProps {
  eyebrow?: string; // label register, never a sentence
  heading: string;
  headingLevel?: 1 | 2 | 3; // default 2; 1 only when the section IS the page header
  emphasis?: string; // one emphasised portion; MUST be a substring of heading
  description?: string;
  link?: { href: string; label: string };
  align?: "start" | "center"; // family default, not an instance whim
  layout?: "stacked" | "split"; // default "stacked"; split = heading left, description right
  class?: string; // passthrough for tone colour overrides (#248 Wave 2); unused by default rendering this wave
  /**
   * Migration-parity escape hatch: per-piece class strings that REPLACE the
   * house defaults (spacing classes still apply). Exists so an existing
   * section whose styles deviate from the house idiom (dark-band headings,
   * drifted eyebrows, non-default widths) migrates pixel-identical. New
   * code must not pass this — deviations in new work are a design decision,
   * not an override.
   */
  classOverrides?: Partial<
    Record<
      | "eyebrow"
      | "heading"
      | "emphasis"
      | "description"
      // `wrap` replaces the root wrapper's class string INDEPENDENT of
      // `align` — it's not gated on `align === "center"`. Without an
      // override, the wrapper still only gets the house centered-wrap
      // classes when centered (and nothing otherwise). With an override,
      // the override applies verbatim regardless of `align`, which is what
      // lets a migrated site keep a non-centering wrapper class (a
      // scroll-reveal hook, a raw `flex`/`gap` container, a `text-left`
      // band) without having to fake `align="center"` just to get the
      // override applied.
      | "link"
      | "wrap"
      // Spacing keys REPLACE the derived spacing class for that piece
      // (empty string removes it). They exist because the codebase's
      // pre-#248 sections space their intro pieces with several idioms
      // (12px mb-3-on-eyebrow being the most common) that the house
      // 8/16/24px recipe doesn't match; parity migration reproduces the
      // site's effective gap here, and the gaps get normalized as one
      // deliberate change at rebrand cutover.
      | "headingSpacing"
      | "descriptionSpacing"
      | "linkSpacing",
      string
    >
  >;
}

export interface EmptyStateProps {
  heading: string; // what is missing, in the reader's terms. Never "No results"
  description?: string; // names the constraint that caused it
  action?: CtaProps; // exactly one recovery action; two is a menu
  reserveHeight?: boolean; // default true for filtered surfaces, false for build-time-empty
}

export interface SectionProps {
  id?: string;
  tone?: Tone; // default "default"
  intro?: SectionIntroProps;
  items?: readonly unknown[]; // family-narrowed at the call site
  primaryCta?: CtaProps;
  secondaryCta?: CtaProps; // at most two CTAs, ever
  space?: SpaceStep; // default "xxl"
  emptyState?: EmptyStateProps;
  class?: string;
}
