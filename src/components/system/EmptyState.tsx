/**
 * EmptyState — Preact twin of `EmptyState.astro` (#248).
 *
 * Same contract, same markup, same classes — islands can't import `.astro`
 * components, so island consumers (BlogSearch) render this twin instead.
 * See `EmptyState.astro`'s TSDoc for the full contract.
 *
 * Copy register (both twins): `heading` names what's missing in the
 * reader's terms, e.g. `No entries tagged "vector-database" yet.` or `This
 * tag is used by 0 of 2,026 database entries.`, never "No results". At most
 * one `action`, e.g. `{ label: "Browse all entries", href: "/llmops-database" }`.
 *
 * `classOverrides` (container/inner/heading) and `id` mirror the `.astro`
 * twin — see its TSDoc — for migrating a pre-#248 empty state whose shape
 * isn't the house card (BlogSearch's dropdown row) or whose node a vanilla
 * `<script>` toggles by id (integrations). `id` is layout-specific, not part
 * of the shared `EmptyStateProps` contract.
 *
 * `role` defaults to `"status"`. Pass `null` when the host already carries
 * its own ARIA role that governs this node's children — e.g. BlogSearch's
 * dropdown, whose `role="listbox"` container requires option/group children
 * only, so a `role="status"` empty-state row inside it is an
 * aria-required-children violation.
 */
import {
  EMPTY_STATE_ACTION_WRAP,
  EMPTY_STATE_DESCRIPTION,
  EMPTY_STATE_HEADING,
  EMPTY_STATE_INNER,
  type EmptyStateRendererProps,
  emptyStateActionClasses,
  emptyStateContainerClasses,
} from "./emptyStateStyles";

export default function EmptyState({
  heading,
  description,
  action,
  reserveHeight = true,
  minHeightClass,
  class: className,
  id,
  classOverrides,
  role = "status",
  // One shared Props contract for both twins (see its TSDoc in
  // emptyStateStyles.ts) — neither file declares its own, so they can't drift.
}: EmptyStateRendererProps) {
  const containerClasses = emptyStateContainerClasses(
    reserveHeight,
    minHeightClass,
    className,
    classOverrides?.container,
  );
  const innerClass = classOverrides?.inner ?? EMPTY_STATE_INNER;
  const headingClass = classOverrides?.heading ?? EMPTY_STATE_HEADING;

  return (
    // `role` is typed `string | null` (not the closed AriaRole union) so a
    // caller isn't locked to one hardcoded role name — cast only here, at
    // the DOM boundary, where the stricter type actually applies.
    // biome-ignore lint/suspicious/noExplicitAny: see comment above
    <div id={id} role={(role ?? undefined) as any} class={containerClasses}>
      <div class={innerClass}>
        <p class={headingClass}>{heading}</p>
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
    </div>
  );
}
