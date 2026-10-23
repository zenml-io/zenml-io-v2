/**
 * FormErrorSummary — the focused error box shared by ContactForm and
 * DemoRequestForm.
 *
 * Renders nothing until a submission fails. Each time `attempt` increases it
 * takes focus and scrolls into view, so screen readers announce the heading
 * and details even when the same errors repeat. Field errors link to their
 * controls by `${formId}-${name}`, the id both forms give their inputs.
 */
import { useEffect, useRef } from "preact/hooks";
import type { PlaceholderField } from "../../../lib/formTypes";

interface Props {
  formId: string;
  fields: PlaceholderField[];
  errors: Record<string, string>;
  serverError: string;
  attempt: number;
}

export default function FormErrorSummary({
  formId,
  fields,
  errors,
  serverError,
  attempt,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const fieldErrors = Object.entries(errors);

  useEffect(() => {
    if (attempt > 0 && ref.current) {
      ref.current.focus({ preventScroll: true });
      ref.current.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, [attempt]);

  if (fieldErrors.length === 0 && !serverError) return null;

  return (
    <section
      ref={ref}
      tabIndex={-1}
      aria-labelledby={`${formId}-error-heading`}
      aria-describedby={`${formId}-error-details`}
      class="rounded-[10px] border border-(--color-sage-500) bg-(--color-cream-100) px-space-sm py-space-xs text-sm text-(--color-cream-900)"
    >
      <p id={`${formId}-error-heading`} class="font-semibold">
        {fieldErrors.length > 0
          ? "Please check the form"
          : "We couldn't send your request"}
      </p>
      <div id={`${formId}-error-details`}>
        {serverError && <p>{serverError}</p>}
        {fieldErrors.length > 0 && (
          <ul class="mt-1 list-disc pl-5">
            {fieldErrors.map(([name, message]) => {
              const field = fields.find((field) => field.name === name);
              return (
                <li key={name}>
                  {field ? (
                    <a href={`#${formId}-${name}`} class="underline">
                      {field.label}: {message}
                    </a>
                  ) : (
                    message
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
