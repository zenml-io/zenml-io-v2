/**
 * EmptyState — Preact twin of `EmptyState.astro` (#248).
 *
 * Same contract, same markup, same classes — islands can't import `.astro`
 * components, so LLMOpsFilter/MLOpsFilter/BlogSearch (all Preact) render
 * this twin instead. See `EmptyState.astro`'s TSDoc for the full contract.
 *
 * Copy register (both twins): `heading` names what's missing in the
 * reader's terms, e.g. `No entries tagged "vector-database" yet.` or `This
 * tag is used by 0 of 2,026 database entries.`, never "No results". At most
 * one `action`, e.g. `{ label: "Browse all entries", href: "/llmops-database" }`.
 */
import type { EmptyStateProps } from "../../lib/section";
import {
  EMPTY_STATE_ACTION_WRAP,
  EMPTY_STATE_DESCRIPTION,
  EMPTY_STATE_HEADING,
  EMPTY_STATE_INNER,
  emptyStateActionClasses,
  emptyStateContainerClasses,
} from "./emptyStateStyles";

interface Props extends EmptyStateProps {
  /** Tailwind min-height utility applied when reserveHeight is true (e.g. "min-h-[36rem]"). Ignored when reserveHeight is false. */
  minHeightClass?: string;
  class?: string;
}

export default function EmptyState({
  heading,
  description,
  action,
  reserveHeight = true,
  minHeightClass,
  class: className,
}: Props) {
  const containerClasses = emptyStateContainerClasses(
    reserveHeight,
    minHeightClass,
    className,
  );

  return (
    <output class={containerClasses}>
      <div class={EMPTY_STATE_INNER}>
        <p class={EMPTY_STATE_HEADING}>{heading}</p>
        {description && <p class={EMPTY_STATE_DESCRIPTION}>{description}</p>}
        {action && (
          <div class={EMPTY_STATE_ACTION_WRAP}>
            <a
              href={action.href}
              class={emptyStateActionClasses(action.weight)}
              data-analytics={action.analytics}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
            >
              {action.label}
            </a>
          </div>
        )}
      </div>
    </output>
  );
}
