/**
 * ReasonSwitch — Preact island for the homepage's "Why are you looking at
 * other models?" section. A tab per reason re-routes one agent run, drawn as
 * its steps: each step shows the model it would move to (or stays on today's
 * model), a step whose answer differs is flagged for review, and a candidate
 * the visitor ruled out is shown compared but never recommended. One
 * sentence and the report goal it maps to sit under the run.
 *
 * Server-rendered with `defaultReason` selected, so the section reads
 * completely without JS. Tabs follow the WAI-ARIA tabs pattern: arrow keys,
 * Home and End move between reasons, and selection follows focus.
 */
import { useRef, useState } from "preact/hooks";
import {
  type ReasonSwitchContent,
  ROUTE_MODEL_LABELS,
} from "../../lib/labs-home";

export interface ReasonSwitchProps {
  content: ReasonSwitchContent;
}

const TAB_BASE =
  "cursor-pointer whitespace-nowrap rounded-full border px-4 py-2.5 font-label text-[13px] leading-5 uppercase tracking-[0.05em] transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-sage-800)";
const TAB_ON =
  "border-(--color-sage-800) bg-(--color-sage-800) text-(--color-cream-50)";
const TAB_OFF =
  "border-(--color-border) bg-card text-(--color-cream-900) hover:bg-(--color-sage-200)";

export default function ReasonSwitch({ content }: ReasonSwitchProps) {
  const [active, setActive] = useState(content.defaultReason);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reason = content.reasons[active];
  const panelId = "reason-switch-panel";

  const select = (index: number) => {
    const count = content.reasons.length;
    const next = (index + count) % count;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: content.reasons.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key]);
  };

  return (
    <div class="flex flex-col gap-10 md:gap-12">
      <div
        role="tablist"
        aria-label="Reasons to look at other models"
        class="reason-tabs -mx-gutter flex gap-2 overflow-x-auto px-gutter pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0"
        onKeyDown={onKeyDown}
      >
        {content.reasons.map((item, i) => (
          <button
            key={item.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`reason-tab-${item.id}`}
            aria-selected={i === active}
            aria-controls={panelId}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            class={`${TAB_BASE} ${i === active ? TAB_ON : TAB_OFF}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`reason-tab-${reason.id}`}
        class="flex flex-col gap-8"
      >
        <ol class="reason-run relative grid grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-4">
          {content.steps.map((step, i) => {
            const model = reason.routes[i];
            const moved = model !== "today";
            const review = reason.reviewStep === i;
            return (
              <li
                key={`${reason.id}-${step}`}
                class={`reason-step relative flex min-w-0 flex-col justify-between gap-4 rounded-[16px] border p-5 sm:flex-row sm:items-center lg:min-h-[200px] lg:flex-col lg:items-stretch lg:gap-6 lg:p-6 ${moved ? "border-(--color-sage-400) bg-card" : "border-(--color-border) bg-(--color-sage-50)"}`}
                style={{ "--step-delay": `${i * 70}ms` }}
              >
                <div class="flex flex-col gap-1 lg:gap-2">
                  <span class="font-label text-[13px] leading-5 uppercase tracking-[0.05em] text-(--color-sage-800)">
                    Step {i + 1}
                  </span>
                  <span class="font-display text-[22px] leading-[28px] text-(--color-cream-900)">
                    {step}
                  </span>
                </div>
                <div class="flex flex-col items-start gap-2 sm:items-end lg:items-start">
                  <span class="flex flex-wrap items-center gap-2">
                    {moved && (
                      <>
                        <span class="font-sans text-[13px] leading-5 text-(--color-cream-700) line-through decoration-(--color-cream-500)">
                          {ROUTE_MODEL_LABELS.today}
                        </span>
                        <svg
                          class="size-3.5 text-(--color-sage-800)"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          aria-label="moves to"
                          role="img"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </>
                    )}
                    <span
                      class={`inline-flex items-center rounded-full px-3 py-1.5 font-sans text-[14px] leading-5 font-medium ${moved ? "bg-(--color-sage-800) text-(--color-cream-50)" : "border border-(--color-border) bg-card text-(--color-cream-700)"}`}
                    >
                      {ROUTE_MODEL_LABELS[model]}
                    </span>
                  </span>
                  {review && (
                    <span class="inline-flex items-center gap-1.5 rounded-full border border-(--color-cream-400) bg-(--color-cream-50) px-3 py-1 font-sans text-[13px] leading-5 text-(--color-cream-900)">
                      <svg
                        class="size-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v5M12 16.5v.5" />
                      </svg>
                      Answers differently: you review
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {reason.excluded && (
          <p class="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-[16px] border border-dashed border-(--color-cream-400) px-6 py-4 font-sans text-[15px] leading-[22px] text-(--color-cream-700)">
            <span class="line-through decoration-(--color-cream-500)">
              {reason.excluded}
            </span>
            <span>compared, never recommended</span>
          </p>
        )}

        <div class="flex flex-col gap-3 border-t border-(--color-border) pt-6 lg:flex-row lg:items-baseline lg:justify-between lg:gap-12">
          <p class="max-w-[760px] font-display text-[22px] leading-[30px] text-(--color-cream-900) md:text-[26px] md:leading-[34px]">
            {reason.outcome}
          </p>
          <p class="shrink-0 font-sans text-[14px] leading-5 text-(--color-cream-700)">
            In the report:{" "}
            <span class="font-medium text-(--color-cream-900)">
              {reason.reportLabel}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
