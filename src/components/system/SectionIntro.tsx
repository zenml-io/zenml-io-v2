/**
 * SectionIntro — Preact twin of `SectionIntro.astro` (issue #248).
 *
 * Preact islands can't import `.astro` components, so this renders the same
 * eyebrow/heading/description/link block for island call sites. Markup and
 * classes are kept in lockstep with the Astro version through
 * `./sectionIntro.shared` — see that file and `SectionIntro.astro` for the
 * full contract (absence collapses, no surrounding whitespace, house-idiom
 * default styling, tone colours deferred to #248 Wave 2).
 */
import type { SectionIntroProps } from "../../lib/section";
import { cn } from "../../lib/utils";
import {
  computeSectionIntroSpacing,
  headingTag,
  resolveSectionIntroClasses,
  SECTION_INTRO_CLASSES,
  splitHeadingEmphasis,
} from "./sectionIntro.shared";

export interface SectionIntroComponentProps extends SectionIntroProps {}

const LINK_ICON_PATH =
  "M3 10a.75.75 0 0 1 .75-.75h10.638l-3.47-3.47a.75.75 0 1 1 1.06-1.06l4.773 4.773a.748.748 0 0 1 0 1.014l-4.773 4.773a.75.75 0 0 1-1.06-1.06l3.47-3.47H3.75A.75.75 0 0 1 3 10Z";

function LinkIcon() {
  return (
    <svg
      class={SECTION_INTRO_CLASSES.linkIcon}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path fill-rule="evenodd" clip-rule="evenodd" d={LINK_ICON_PATH} />
    </svg>
  );
}

export default function SectionIntro({
  eyebrow,
  heading,
  headingLevel = 2,
  emphasis,
  description,
  link,
  align = "start",
  layout = "stacked",
  class: className,
  classOverrides,
}: SectionIntroComponentProps) {
  const Heading = headingTag(headingLevel);
  const {
    before,
    emphasis: emphasisText,
    after,
  } = splitHeadingEmphasis(heading, emphasis);
  const spacing = computeSectionIntroSpacing({
    eyebrow,
    description,
    layout,
    classOverrides,
  });
  const isSplit = layout === "split";
  const isCentered = !isSplit && align === "center";
  const c = resolveSectionIntroClasses(classOverrides, isCentered);

  const headingEl = (
    <Heading class={cn(c.heading, spacing.heading)}>
      {before}
      {emphasisText && <span class={c.emphasis}>{emphasisText}</span>}
      {after}
    </Heading>
  );

  if (isSplit) {
    return (
      <div class={cn(SECTION_INTRO_CLASSES.splitGrid, className)}>
        <div>
          {eyebrow && <p class={c.eyebrow}>{eyebrow}</p>}
          {headingEl}
        </div>
        <div>
          {description && (
            <p class={cn(c.description, spacing.description)}>{description}</p>
          )}
          {link && (
            <a href={link.href} class={cn(c.link, spacing.link)}>
              {link.label}
              <LinkIcon />
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div class={cn(c.wrap, className)}>
      {eyebrow && <p class={c.eyebrow}>{eyebrow}</p>}
      {headingEl}
      {description && (
        <p class={cn(c.description, spacing.description)}>{description}</p>
      )}
      {link && (
        <a href={link.href} class={cn(c.link, spacing.link)}>
          {link.label}
          <LinkIcon />
        </a>
      )}
    </div>
  );
}
