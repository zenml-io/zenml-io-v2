/**
 * labs.entry-row — Preact twin of `EntryRow.astro`, for the one context an
 * Astro component can't render into: the LLMOps/MLOps `DataFilterIndex`
 * islands (`LlmopsIndex.tsx` / `MlopsIndex.tsx`). Same markup, same classes,
 * same meta-token order — all pulled from `entryRowStyles.ts` so the two
 * twins cannot drift.
 *
 * The one difference is what the row's inner controls are. Server-side the
 * chips are links to the tag hubs and the industry is text; inside the
 * island they are filter controls (`aria-pressed` buttons that toggle the
 * rail's own state), so they sit above the stretched title link on
 * `relative z-10` and stop the click from reaching it.
 */
import { Fragment } from "preact";
import {
  TERM_CHIP_HEXAGON_PATH,
  TERM_CHIP_HEXAGON_VIEWBOX,
} from "../blog/termChipStyles";
import {
  ENTRY_ROW,
  ENTRY_ROW_CHEVRON,
  ENTRY_ROW_CHEVRON_PATH,
  ENTRY_ROW_CHEVRON_VIEWBOX,
  ENTRY_ROW_CHIP,
  ENTRY_ROW_CHIP_HEXAGON,
  ENTRY_ROW_CHIP_OVERFLOW,
  ENTRY_ROW_CHIP_SELECTED,
  ENTRY_ROW_CHIPS,
  ENTRY_ROW_MARK,
  ENTRY_ROW_META,
  ENTRY_ROW_META_ACTION,
  ENTRY_ROW_META_DOT,
  ENTRY_ROW_META_STRONG,
  ENTRY_ROW_SUMMARY,
  ENTRY_ROW_TITLE,
  ENTRY_ROW_TITLE_LINK,
  ENTRY_ROW_TITLE_ROW,
  type EntryRowItem,
  entryRowMetaTokens,
} from "./entryRowStyles";

export interface EntryRowProps extends EntryRowItem {
  /** True when this chip's tag is one of the rail's selected tags. */
  chipPressed?: (slug: string) => boolean;
  onChipToggle?: (slug: string) => void;
  /** Present when the industry token should filter the index instead of reading as text. */
  onIndustrySelect?: () => void;
}

function ChipHexagon() {
  return (
    <svg
      viewBox={TERM_CHIP_HEXAGON_VIEWBOX}
      class={ENTRY_ROW_CHIP_HEXAGON}
      aria-hidden="true"
    >
      <path d={TERM_CHIP_HEXAGON_PATH} />
    </svg>
  );
}

export function EntryRow({
  href,
  title,
  mark,
  meta,
  summary,
  chips,
  chipOverflowCount = 0,
  headingLevel = 3,
  chipPressed,
  onChipToggle,
  onIndustrySelect,
}: EntryRowProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const tokens = entryRowMetaTokens(meta);
  const heading = (
    <Heading class={ENTRY_ROW_TITLE}>
      <a href={href} class={ENTRY_ROW_TITLE_LINK}>
        {title}
      </a>
    </Heading>
  );

  return (
    <article class={ENTRY_ROW}>
      {mark ? (
        <div class={ENTRY_ROW_TITLE_ROW}>
          <img
            class={ENTRY_ROW_MARK}
            src={mark.url}
            alt={mark.alt}
            loading="lazy"
          />
          {heading}
        </div>
      ) : (
        heading
      )}

      {tokens.length > 0 && (
        <div class={ENTRY_ROW_META}>
          {tokens.map((token, index) => {
            const dot = index > 0 && (
              <span class={ENTRY_ROW_META_DOT} aria-hidden="true">
                &middot;
              </span>
            );
            return (
              <Fragment key={`${token.kind}-${token.text}`}>
                {dot}
                {token.kind === "industry" && onIndustrySelect ? (
                  <button
                    type="button"
                    class={ENTRY_ROW_META_ACTION}
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation();
                      onIndustrySelect();
                    }}
                    aria-label={`Filter by ${token.text}`}
                  >
                    {token.text}
                  </button>
                ) : (
                  <span
                    class={
                      token.kind === "text" && token.strong
                        ? ENTRY_ROW_META_STRONG
                        : undefined
                    }
                  >
                    {token.text}
                  </span>
                )}
              </Fragment>
            );
          })}
        </div>
      )}

      {summary && <p class={ENTRY_ROW_SUMMARY}>{summary}</p>}

      {(chips.length > 0 || chipOverflowCount > 0) && (
        <div class={ENTRY_ROW_CHIPS}>
          {chips.map((chip) => {
            const slug = chip.slug;
            if (slug && onChipToggle) {
              const pressed = chipPressed?.(slug) ?? false;
              return (
                <button
                  key={slug}
                  type="button"
                  data-tag-chip
                  aria-pressed={pressed}
                  aria-label={
                    pressed
                      ? `Remove filter ${chip.label}`
                      : `Filter by ${chip.label}`
                  }
                  class={pressed ? ENTRY_ROW_CHIP_SELECTED : ENTRY_ROW_CHIP}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    onChipToggle(slug);
                  }}
                >
                  <ChipHexagon />
                  {chip.label}
                </button>
              );
            }
            return chip.href ? (
              <a key={chip.label} href={chip.href} class={ENTRY_ROW_CHIP}>
                <ChipHexagon />
                {chip.label}
              </a>
            ) : (
              <span key={chip.label} class={ENTRY_ROW_CHIP}>
                <ChipHexagon />
                {chip.label}
              </span>
            );
          })}
          {chipOverflowCount > 0 && (
            <span class={ENTRY_ROW_CHIP_OVERFLOW}>+{chipOverflowCount}</span>
          )}
        </div>
      )}

      <svg
        class={ENTRY_ROW_CHEVRON}
        viewBox={ENTRY_ROW_CHEVRON_VIEWBOX}
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d={ENTRY_ROW_CHEVRON_PATH} />
      </svg>
    </article>
  );
}
