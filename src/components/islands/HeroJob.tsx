/**
 * HeroJob — the homepage hero's job box ("Give it a job"): a messenger-style
 * chat window with the AI engineer, centered under the headline and deck.
 *
 * Before the first message the window is compact: header, greeting, example
 * chips and composer, no empty thread. Once the conversation starts it grows
 * once to a fixed height and its thread scrolls inside it, so the hero never
 * grows again. That height follows the viewport (clamped) so the whole
 * window fits under the headline without scrolling the page into the nav.
 * A visitor gives a job (types it in the composer at the bottom, or taps
 * one of three example chips under the composer); the engineer takes it
 * ("On it: …"), asks the use case and at most two more questions, one at a
 * time, answered by quick-reply chips above the composer (or "Skip"). After
 * the use case it shows real case studies from the LLMOps/MLOps databases
 * as link cards (picked at build time, see heroJobProof.ts). Then the value:
 * a plan and a first-week preview filled from the answers. Only then does it
 * ask for access: "Connect and start" goes to the signup with `?job=` and
 * `&answers=`.
 *
 * The composer is a roomy box like the product's: the textarea on top
 * (Enter sends, Shift+Enter breaks the line) and a bottom row with the
 * engineer menu ("Auto ▾": Auto or a named engineer, each biasing an
 * ambiguous job toward its intent and carried as `&engineer=`), a
 * "@ add your stack" button, "↵ to send" and the send button. Typing "@"
 * or pressing that button opens the stack picker (tools ranked at build
 * time from the research databases' tags, see buildHeroJobStack); picked
 * tools show as removable "@Name" chips, before or during the chat, skip
 * the questions they answer, fill the plan and put case studies that used
 * them first, and ride along as `&stack=`. Once the job is taken, the
 * engineer's first reply carries its name (the chosen one, or the one Auto
 * picked for the intent).
 *
 * Mounted from `/` only, into LabsHero's `action` slot (client:load: the
 * hero's one control, above the fold). With JS off the composer still
 * works: it is a GET form to the signup with the job as `job`.
 *
 * Rules live in src/lib/heroJobPlan.ts, strings in LABS_HERO_JOB
 * (src/lib/labs-home.ts). Each engineer message group is preceded by a
 * typing indicator (~800ms), and messages enter ~150ms per line apart with
 * a short fade (CSS @starting-style, no keyframes); under reduced motion
 * there is no indicator and every message appears at once. Analytics:
 * submit/example/answer/skip/engineer/stack fire here through PlausibleBridge's
 * `__zenmlPlausibleTrack`; the links carry `data-analytics` like every CTA.
 */
import type { ComponentChildren } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import {
  answerImplied,
  classifyHeroJob,
  displayJob,
  fillTemplate,
  type HeroJobAnswers,
  heroJobOutcome,
  heroJobSignupHref,
  impliedAnswer,
  preferCases,
} from "../../lib/heroJobPlan";
import type { HeroJobCaseStudy } from "../../lib/heroJobProof";
import type {
  HeroJobContent,
  HeroJobEngineer,
  HeroJobIntent,
  HeroJobOption,
  HeroJobTool,
  HeroJobToolGroup,
} from "../../lib/labs-home";
import {
  LABS_BUTTON_BASE,
  LABS_BUTTON_TONE_CLASSES,
} from "../labs/labsButtonStyles";

type TrackWindow = Window &
  typeof globalThis & {
    __zenmlPlausibleTrack?: (
      name: string,
      props?: Record<string, string>,
    ) => void;
  };

const REVEAL_STEP_MS = 150;
const TYPING_MS = 800;
const TYPING_LEAD_MS = 250;
const MAX_JOB_LENGTH = 200;

/** The ZenML mark, verbatim from ZenmlLabsLogo.astro's lockup — never redraw it. */
const ZENML_MARK_PATH =
  "M18.528 66.318C18.689 66.318 18.862 66.275 19.006 66.219 19.006 66.219 36.073 58.183 36.073 58.183 36.97 57.755 37.564 56.844 37.564 55.861 37.564 55.861 37.564 53.553 37.564 53.553 37.564 52.556 37 51.671 36.087 51.244 36.087 51.244 20.108 43.721 20.108 43.721 19.268 43.336 18.313 43.336 17.486 43.721 17.486 43.721 1.492 51.244 1.492 51.244 0.595 51.657 0 52.569 0 53.566 0 53.566 0 55.875 0 55.875 0 56.872 0.565 57.755 1.478 58.183 1.478 58.183 8.071 61.276 8.071 61.276 8.071 61.276 3.21 63.559 1.591 64.319 0.595 64.786 0.001 65.62 0.001 66.688 0.001 66.688 0.001 68.854 0.001 68.854 0.001 69.85 0.566 70.736 1.479 71.162 1.479 71.162 17.459 78.67 17.459 78.67 17.878 78.87 18.327 78.969 18.776 78.969 19.225 78.969 19.675 78.87 20.095 78.67 20.095 78.67 36.088 71.162 36.088 71.162 36.986 70.736 37.58 69.822 37.58 68.84 37.58 68.84 37.58 66.531 37.58 66.531 37.58 65.535 37.015 64.652 36.104 64.224 36.104 64.224 32.567 62.571 32.567 62.571 32.567 62.571 30.004 63.797 30.004 63.797 30.004 63.797 35.133 66.204 35.133 66.204 35.263 66.275 35.349 66.404 35.349 66.546 35.349 66.546 35.349 68.854 35.349 68.854 35.349 68.996 35.263 69.138 35.133 69.196 35.133 69.196 19.154 76.703 19.154 76.703 18.921 76.804 18.675 76.804 18.443 76.703 18.443 76.703 2.466 69.196 2.466 69.196 2.335 69.125 2.247 68.996 2.247 68.854 2.247 68.854 2.247 66.688 2.247 66.688 2.247 66.475 2.421 66.318 2.625 66.318 2.625 66.318 18.531 66.318 18.531 66.318 18.531 66.318 18.528 66.318 18.528 66.318ZM2.232 55.858C2.232 55.858 2.232 53.552 2.232 53.552 2.232 53.41 2.318 53.28 2.449 53.21 2.449 53.21 18.442 45.703 18.442 45.703 18.675 45.603 18.92 45.603 19.152 45.703 19.152 45.703 35.13 53.211 35.13 53.211 35.261 53.282 35.347 53.41 35.347 53.553 35.347 53.553 35.347 55.861 35.347 55.861 35.347 56.003 35.261 56.145 35.13 56.203 35.13 56.203 19.152 63.711 19.152 63.711 18.92 63.811 18.675 63.811 18.442 63.711 18.442 63.711 2.449 56.2 2.449 56.2 2.318 56.13 2.232 56.002 2.232 55.858Z";

const PRIMARY_PILL = `${LABS_BUTTON_BASE} ${LABS_BUTTON_TONE_CLASSES.dark}`;
const TEXT_LINK =
  "inline-flex min-h-11 cursor-pointer items-center font-sans text-[14px] text-(--color-cream-800) underline decoration-(--color-cream-600) underline-offset-4 transition-colors duration-200 ease-out hover:text-(--color-sage-800) hover:decoration-(--color-sage-800) md:min-h-9";
/** The three example chips before the first message: an even row, one per line on mobile. */
const EXAMPLE_CHIP =
  "inline-flex min-h-10 w-full cursor-pointer items-center justify-center rounded-full border border-(--color-sage-500) bg-card px-3 py-1.5 text-center font-sans text-[14px] leading-[20px] text-(--color-sage-800) transition-colors duration-200 ease-out hover:bg-(--color-sage-100) md:min-h-9";
const QUICK_REPLY =
  "inline-flex min-h-11 shrink-0 cursor-pointer items-center whitespace-nowrap rounded-full border border-(--color-sage-500) bg-card px-4 font-sans text-[14px] leading-[20px] text-(--color-sage-800) transition-colors duration-200 ease-out hover:bg-(--color-sage-100) md:min-h-9";
const SECTION_LABEL =
  "font-label text-[13px] uppercase tracking-[0.05em] text-(--color-sage-800)";
/** Entry fade for a message or a line inside one; nothing under reduced motion. */
const ENTER =
  "transition-[opacity,translate] duration-300 ease-out starting:translate-y-1 starting:opacity-0 motion-reduce:transition-none";

/**
 * Window height: compact (header, greeting, example chips, composer) until
 * the first message, then the fixed, viewport-clamped height the thread
 * scrolls inside. The one growth eases from the compact height, pinned in
 * pixels for a frame (see `growFrom`); under reduced motion it is instant.
 */
const WINDOW_GROWTH =
  "transition-[height] duration-300 ease-out motion-reduce:transition-none";
const WINDOW_COMPACT = "h-auto";
/**
 * Open height: grows with the conversation up to a cap (the viewport minus
 * room for the nav and a peek of the headline); past that the thread scrolls
 * inside. The page only scrolls as far as needed to keep the newest message
 * in view, never past the nav.
 */
const WINDOW_OPEN =
  "h-auto max-h-[clamp(380px,calc(100svh-120px),640px)] md:max-h-[clamp(440px,calc(100dvh-220px),720px)]";

const BUBBLE_TONE = {
  engineer: "bg-(--color-cream-100) text-(--color-cream-900)",
  visitor: "bg-(--color-sage-400) text-(--color-cream-900)",
} as const;
const TAIL_COLOR = {
  engineer: "text-(--color-cream-100)",
  visitor: "text-(--color-sage-400)",
} as const;

type Side = "engineer" | "visitor";

/** One message; `lines` paces the entry of the next one. `bare` skips the bubble (link cards). */
interface Message {
  key: string;
  side: Side;
  lines: number;
  bare?: boolean;
  /** A small name above the bubble (the engineer who took the job). */
  label?: string;
  body: ComponentChildren;
}

interface Props {
  content: HeroJobContent;
  /** Case studies per use-case option value, precomputed at build time. */
  proof: Readonly<Record<string, readonly HeroJobCaseStudy[]>>;
  /** The stack picker's tool values in display order, ranked at build time. */
  stack: readonly string[];
}

interface Conversation {
  job: string;
  intent: HeroJobIntent;
  answers: HeroJobAnswers;
  /** Who took the job: the chosen engineer, or the one Auto picked (none for a general job). */
  taker?: HeroJobEngineer;
  /** Indexes of questions the stack answered: neither asked nor echoed. */
  implied: readonly number[];
  /** The case studies, fixed when the use case is answered. */
  cases: readonly HeroJobCaseStudy[];
}

function track(name: string, props?: Record<string, string>) {
  (window as TrackWindow).__zenmlPlausibleTrack?.(name, props);
}

/** The iMessage-style tail on the last bubble of a group. */
function Tail({ side }: { side: Side }) {
  const left = side === "engineer";
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="8"
      height="14"
      viewBox="0 0 8 14"
      class={`absolute bottom-0 ${left ? "-left-[7px]" : "-right-[7px]"} ${TAIL_COLOR[side]}`}
    >
      <path
        fill="currentColor"
        d={left ? "M8 0C8 7 6 12 0 14h8z" : "M0 0c0 7 2 12 8 14H0z"}
      />
    </svg>
  );
}

const SPARKLE_PATH =
  "M12 3l1.8 4.9a2 2 0 0 0 1.3 1.3L20 11l-4.9 1.8a2 2 0 0 0-1.3 1.3L12 19l-1.8-4.9a2 2 0 0 0-1.3-1.3L4 11l4.9-1.8a2 2 0 0 0 1.3-1.3z";

function Icon({ d, class: cls }: { d: string; class: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={cls}
    >
      <path d={d} />
    </svg>
  );
}

/**
 * "Auto ▾": who takes the job. A menu button; the menu opens above the
 * composer with the choice focused, arrow keys/Home/End move, Enter or
 * click picks, Escape or Tab or a click outside closes.
 */
function EngineerMenu({
  content,
  selected,
  disabled,
  onSelect,
}: {
  content: HeroJobContent["composer"];
  selected: number;
  disabled: boolean;
  onSelect: (index: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const focusIndex = useRef(selected);
  const current = content.engineers[selected] ?? content.engineers[0];

  const close = (refocus: boolean) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    itemsRef.current[focusIndex.current]?.focus();
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  const openAt = (index: number) => {
    focusIndex.current = index;
    setOpen(true);
  };

  const onMenuKey = (e: KeyboardEvent) => {
    const count = content.engineers.length;
    const at = itemsRef.current.indexOf(
      document.activeElement as HTMLButtonElement,
    );
    const move = (to: number) => {
      e.preventDefault();
      itemsRef.current[(to + count) % count]?.focus();
    };
    if (e.key === "ArrowDown") move(at + 1);
    else if (e.key === "ArrowUp") move(at - 1);
    else if (e.key === "Home") move(0);
    else if (e.key === "End") move(count - 1);
    else if (e.key === "Escape") {
      e.preventDefault();
      close(true);
    } else if (e.key === "Tab") setOpen(false);
  };

  return (
    <div ref={rootRef} class="relative">
      <button
        ref={buttonRef}
        type="button"
        data-hero-job-engineer-button
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={fillTemplate(content.engineerButtonLabel, {
          name: current.name,
        })}
        disabled={disabled}
        onClick={() => (open ? close(false) : openAt(selected))}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            openAt(selected);
          }
        }}
        class="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-(--color-border) bg-card pr-2.5 pl-3 font-sans text-[14px] leading-[20px] text-(--color-cream-900) transition-colors duration-200 ease-out hover:border-(--color-sage-500) focus-visible:ring-2 focus-visible:ring-(--color-sage-800) focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Icon d={SPARKLE_PATH} class="size-4 text-(--color-sage-800)" />
        {current.name}
        <Icon d="M6 9l6 6 6-6" class="size-3.5 text-(--color-cream-700)" />
      </button>
      {open && (
        <div
          role="menu"
          aria-label={content.engineerMenuLabel}
          data-hero-job-engineer-menu
          onKeyDown={onMenuKey}
          class="absolute bottom-full left-0 z-20 mb-2 flex w-[min(320px,calc(100vw-56px))] flex-col rounded-[16px] border border-(--color-border) bg-card p-1.5 text-left"
        >
          {content.engineers.map((engineer, i) => (
            <button
              key={engineer.value}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              type="button"
              role="menuitemradio"
              aria-checked={i === selected}
              data-hero-job-engineer={engineer.value}
              tabIndex={-1}
              onClick={() => {
                onSelect(i);
                close(true);
              }}
              class="flex cursor-pointer items-start gap-2.5 rounded-[12px] px-3 py-2 text-left transition-colors duration-200 ease-out hover:bg-(--color-cream-100) focus-visible:bg-(--color-cream-100) focus-visible:outline-none"
            >
              <span class="flex min-w-0 flex-1 flex-col">
                <span class="font-sans text-[14px] leading-[20px] font-semibold text-(--color-cream-900)">
                  {engineer.name}
                </span>
                <span class="font-sans text-[13px] leading-[18px] text-(--color-cream-700)">
                  {engineer.line}
                </span>
              </span>
              {i === selected && (
                <Icon
                  d="M5 12l5 5L20 7"
                  class="mt-0.5 size-4 shrink-0 text-(--color-sage-800)"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * The "@ add your stack" picker: a filter field (combobox) over a grouped
 * listbox, opening above the composer. Typing filters, arrow keys move,
 * Enter picks, Escape or a click outside closes; the mouse works too.
 */
function StackPicker({
  content,
  tools,
  onPick,
  onClose,
}: {
  content: HeroJobContent["stack"];
  tools: readonly HeroJobTool[];
  onPick: (tool: HeroJobTool) => void;
  onClose: (refocus: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const needle = query.trim().toLowerCase();
  const shown = needle
    ? tools.filter((t) => t.name.toLowerCase().includes(needle))
    : tools;
  const groups = (Object.keys(content.groups) as HeroJobToolGroup[])
    .map((group) => ({ group, items: shown.filter((t) => t.group === group) }))
    .filter((g) => g.items.length);
  // Keyboard order follows the grouped display order.
  const ordered = groups.flatMap((g) => g.items);
  const at = Math.min(active, Math.max(ordered.length - 1, 0));
  const optionId = (tool: HeroJobTool) => `hero-job-stack-${tool.value}`;

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) onClose(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [onClose]);

  useEffect(() => {
    const tool = ordered[at];
    if (!tool) return;
    listRef.current
      ?.querySelector(`#${optionId(tool)}`)
      ?.scrollIntoView({ block: "nearest" });
  });

  const onKey = (e: KeyboardEvent) => {
    const count = ordered.length;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (count)
        setActive((at + (e.key === "ArrowDown" ? 1 : -1) + count) % count);
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      setActive(e.key === "Home" ? 0 : count - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const tool = ordered[at];
      if (tool) onPick(tool);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose(true);
    } else if (e.key === "Tab") onClose(false);
  };

  return (
    <div
      ref={rootRef}
      data-hero-job-stack-picker
      class="absolute bottom-full left-0 z-20 mb-2 flex w-[min(340px,100%)] flex-col rounded-[16px] border border-(--color-border) bg-card text-left"
    >
      <div class="border-b border-(--color-border) p-2">
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="hero-job-stack-list"
          aria-activedescendant={
            ordered[at] ? optionId(ordered[at]) : undefined
          }
          aria-autocomplete="list"
          aria-label={content.pickerLabel}
          autoComplete="off"
          placeholder={content.filterPlaceholder}
          value={query}
          onInput={(e) => {
            setQuery((e.target as HTMLInputElement).value.replace(/^@/, ""));
            setActive(0);
          }}
          onKeyDown={onKey}
          class="h-9 w-full rounded-[10px] bg-(--color-cream-50) px-3 font-sans text-[16px] text-foreground placeholder:text-(--color-cream-700) focus-visible:ring-2 focus-visible:ring-(--color-sage-800) focus-visible:outline-none md:text-[14px]"
        />
      </div>
      <div
        ref={listRef}
        id="hero-job-stack-list"
        role="listbox"
        aria-label={content.pickerLabel}
        class="max-h-[240px] overflow-y-auto overscroll-contain p-1.5"
      >
        {groups.length === 0 && (
          <p class="px-3 py-2 font-sans text-[13px] leading-[18px] text-(--color-cream-700)">
            {content.empty}
          </p>
        )}
        {groups.map(({ group, items }) => (
          // biome-ignore lint/a11y/useSemanticElements: an ARIA listbox groups its options with role="group", not a fieldset.
          <div
            key={group}
            role="group"
            aria-labelledby={`hero-job-stack-group-${group}`}
          >
            <p
              id={`hero-job-stack-group-${group}`}
              class="px-3 pt-2 pb-1 font-sans text-[12px] leading-[16px] font-semibold text-(--color-cream-700)"
            >
              {content.groups[group]}
            </p>
            {items.map((tool) => {
              const isActive = ordered[at] === tool;
              return (
                // biome-ignore lint/a11y/useKeyWithClickEvents: keys go through the combobox (aria-activedescendant).
                <div
                  key={tool.value}
                  id={optionId(tool)}
                  role="option"
                  tabIndex={-1}
                  aria-selected={isActive}
                  data-hero-job-stack-option={tool.value}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActive(ordered.indexOf(tool))}
                  onClick={() => onPick(tool)}
                  class={`cursor-pointer rounded-[10px] px-3 py-1.5 font-sans text-[14px] leading-[20px] text-(--color-cream-900) ${isActive ? "bg-(--color-cream-100)" : ""}`}
                >
                  {tool.name}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroJob({ content, proof, stack }: Props) {
  const [value, setValue] = useState("");
  const [engineerIndex, setEngineerIndex] = useState(0);
  const [picked, setPicked] = useState<readonly string[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [talk, setTalk] = useState<Conversation | null>(null);
  // The greeting (message 0) is visible from the server render on.
  const [shown, setShown] = useState(1);
  const [typing, setTyping] = useState(false);
  const [reduced, setReduced] = useState(false);
  // The compact height in px, held for one frame when the chat starts so the
  // window eases from it (the example chips leave at the same moment, so an
  // `auto` start height would first shrink the window).
  const [growFrom, setGrowFrom] = useState<number | null>(null);
  const windowRef = useRef<HTMLElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const repliesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hintRef = useRef<HTMLButtonElement>(null);

  // The picker's tools in their build-time order, and the picked ones.
  const offered = stack
    .map((value) => content.stack.tools.find((t) => t.value === value))
    .filter((t): t is HeroJobTool => !!t);
  const pickedTools = picked
    .map((value) => content.stack.tools.find((t) => t.value === value))
    .filter((t): t is HeroJobTool => !!t);
  const focusNext = useRef(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const flow = talk ? content.flows[talk.intent] : null;
  const step = talk?.answers.length ?? 0;
  const cases = talk?.cases ?? [];
  const done = !!flow && step >= flow.questions.length;

  const start = (raw: string, event: string) => {
    const job = raw.trim();
    if (!job || talk) return;
    const chosen = content.composer.engineers[engineerIndex];
    const intent = classifyHeroJob(job, chosen?.intent);
    track(event, { intent });
    setValue("");
    if (!reduced && windowRef.current)
      setGrowFrom(windowRef.current.offsetHeight);
    const taker = chosen?.intent
      ? chosen
      : content.composer.engineers.find((e) => e.intent === intent);
    const filled = answerImplied(content.flows[intent], [], pickedTools);
    setTalk({ job, intent, taker, cases: [], ...filled });
  };

  const answer = (option: HeroJobOption | null, tools = pickedTools) => {
    if (!talk || !flow || done) return;
    const question = flow.questions[step];
    track(option ? content.analytics.answer : content.analytics.skip, {
      intent: talk.intent,
      question: question.id,
      ...(option ? { answer: option.value } : {}),
    });
    focusNext.current = true;
    const filled = answerImplied(flow, [...talk.answers, option], tools);
    const useCase = step === 0 ? option?.value : undefined;
    setTalk({
      ...talk,
      answers: filled.answers,
      implied: [...talk.implied, ...filled.implied],
      cases:
        step === 0 && useCase
          ? preferCases(proof[useCase] ?? [], tools)
          : talk.cases,
    });
  };

  const closePicker = useCallback((refocus: boolean) => {
    setPickerOpen(false);
    if (!refocus) return;
    const input = inputRef.current;
    (input && !input.disabled ? input : hintRef.current)?.focus();
  }, []);

  // Picking a tool mid-chat answers the open question when the tool implies it.
  const addTool = (tool: HeroJobTool) => {
    closePicker(true);
    if (picked.includes(tool.value)) return;
    track(content.analytics.stack, { tool: tool.value });
    const tools = [...pickedTools, tool];
    setPicked(tools.map((t) => t.value));
    if (!talk || !flow || done) return;
    const implied = impliedAnswer(flow.questions[step], tools);
    if (implied) answer(implied, tools);
  };

  const removeTool = (tool: HeroJobTool) => {
    setPicked(picked.filter((v) => v !== tool.value));
    inputRef.current?.focus();
  };

  const selectEngineer = (index: number) => {
    const engineer = content.composer.engineers[index];
    if (!engineer) return;
    if (index !== engineerIndex)
      track(content.analytics.engineer, { engineer: engineer.value });
    setEngineerIndex(index);
  };

  const reset = () => {
    setTalk(null);
    setPickerOpen(false);
    setShown(1);
    setTyping(false);
    setValue("");
  };

  // ---- the thread ---------------------------------------------------------
  const messages: Message[] = [
    {
      key: "greeting",
      side: "engineer",
      lines: 1,
      body: content.reply.greeting,
    },
  ];
  const visitor = (key: string, text: string) =>
    messages.push({ key, side: "visitor", lines: 1, body: text });

  if (talk && flow) {
    visitor("job", talk.job);
    messages.push({
      key: "accepted",
      side: "engineer",
      lines: 1,
      label: talk.taker?.name,
      body: (
        <>
          {content.reply.acceptedPrefix} “{displayJob(talk.job)}”.
        </>
      ),
    });

    flow.questions.slice(0, step + 1).forEach((question, i) => {
      if (talk.implied.includes(i)) return;
      messages.push({
        key: `q-${question.id}`,
        side: "engineer",
        lines: 1,
        body: question.prompt,
      });
      if (i === step) return;
      visitor(
        `a-${question.id}`,
        talk.answers[i]?.label ?? content.reply.skipLabel,
      );
      if (i !== 0 || !cases.length) return;
      messages.push({
        key: "proof",
        side: "engineer",
        lines: 1,
        body: content.reply.proofHeading,
      });
      for (const row of cases) {
        messages.push({
          key: `case-${row.href}`,
          side: "engineer",
          lines: 1,
          bare: true,
          body: (
            <a
              href={row.href}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics={content.analytics.caseStudy}
              data-hero-job-case
              class="group block rounded-[16px] border border-(--color-border) bg-card px-4 py-3 transition-colors duration-200 ease-out hover:border-(--color-sage-400)"
            >
              <span class="block font-label text-[11px] uppercase tracking-[0.05em] text-(--color-sage-800)">
                {content.reply.sourceLabels[row.source]}
              </span>
              <strong class="mt-1 block font-sans text-[15px] leading-[22px] font-semibold text-(--color-cream-900)">
                {row.company}
              </strong>
              <span class="line-clamp-2 font-sans text-[14px] leading-[20px] text-(--color-cream-700) group-hover:text-(--color-sage-800)">
                {row.takeaway}
              </span>
            </a>
          ),
        });
      }
    });

    if (done) {
      const outcome = heroJobOutcome(
        talk.job,
        talk.intent,
        talk.answers,
        content,
        cases[0]?.company,
        pickedTools,
      );
      messages.push({
        key: "plan",
        side: "engineer",
        lines: outcome.plan.length + 1,
        body: (
          <div data-hero-job-plan>
            <p class={SECTION_LABEL}>{content.reply.planHeading}</p>
            <ul class="mt-1.5 flex flex-col gap-1">
              {outcome.plan.map((bullet, b) => (
                <li
                  key={bullet}
                  class={`${ENTER} flex gap-2.5`}
                  style={{ transitionDelay: `${(b + 1) * REVEAL_STEP_MS}ms` }}
                >
                  <span
                    aria-hidden="true"
                    class="mt-[9px] size-1.5 shrink-0 rounded-full bg-(--color-sage-800)"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ),
      });
      messages.push({
        key: "week",
        side: "engineer",
        lines: outcome.week.length + 1,
        body: (
          <div data-hero-job-week>
            <p class={SECTION_LABEL}>{content.reply.weekHeading}</p>
            <ol class="mt-1 flex flex-col">
              {outcome.week.map((day, d) => (
                <li
                  key={day.day}
                  class={`${ENTER} grid grid-cols-[40px_1fr] gap-2 border-t border-(--color-cream-200) py-1.5 first:border-t-0`}
                  style={{ transitionDelay: `${(d + 1) * REVEAL_STEP_MS}ms` }}
                >
                  <span class={`${SECTION_LABEL} pt-[3px]`}>{day.day}</span>
                  <span>{day.text}</span>
                </li>
              ))}
            </ol>
          </div>
        ),
      });
      messages.push({
        key: "ready",
        side: "engineer",
        lines: 2,
        body: (
          <div data-hero-job-ready={outcome.needs}>
            <p>{fillTemplate(content.reply.ready, { needs: outcome.needs })}</p>
            <div class="mt-3">
              <a
                href={heroJobSignupHref(content.connect.href, talk.job, {
                  flow,
                  answers: talk.answers,
                  // The menu is locked while the chat runs, so this is the pick.
                  engineer: content.composer.engineers[engineerIndex],
                  stack: pickedTools,
                })}
                data-analytics={content.connect.analytics}
                class={PRIMARY_PILL}
              >
                {content.connect.label}
              </a>
            </div>
          </div>
        ),
      });
    }
  }

  const total = messages.length;
  const visibleCount = reduced ? total : Math.min(shown, total);
  const next = shown < total ? messages[shown] : null;
  const startsGroup =
    next?.side === "engineer" && messages[shown - 1]?.side !== "engineer";
  const prevLines = messages[shown - 1]?.lines ?? 0;
  const settled = visibleCount >= total && !typing;

  // Release the pinned compact height once it is committed, so the window
  // transitions from it to its open height.
  useEffect(() => {
    if (growFrom === null) return;
    void windowRef.current?.offsetHeight;
    setGrowFrom(null);
  }, [growFrom]);

  // Pace the thread: the visitor's own bubbles appear at once; an engineer
  // group opens with the typing indicator; later messages follow by lines.
  useEffect(() => {
    if (reduced || !next) return;
    let timer: number;
    if (next.side === "visitor") {
      timer = window.setTimeout(() => setShown((s) => s + 1), 0);
    } else if (startsGroup && !typing) {
      timer = window.setTimeout(() => setTyping(true), TYPING_LEAD_MS);
    } else if (startsGroup) {
      timer = window.setTimeout(() => {
        setTyping(false);
        setShown((s) => s + 1);
      }, TYPING_MS);
    } else {
      timer = window.setTimeout(
        () => setShown((s) => s + 1),
        prevLines * REVEAL_STEP_MS,
      );
    }
    return () => window.clearTimeout(timer);
  }, [reduced, next, startsGroup, typing, prevLines]);

  // Keep the newest message in view by scrolling the thread, never the page.
  useEffect(() => {
    const el = threadRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [visibleCount, typing, settled, reduced]);

  // After a quick reply, move focus to the next question's first reply.
  useEffect(() => {
    if (!settled || !focusNext.current) return;
    focusNext.current = false;
    repliesRef.current
      ?.querySelector<HTMLButtonElement>("button")
      ?.focus({ preventScroll: true });
  }, [settled]);

  // Keep the newest message in view: scroll the page only by as much as the
  // window's bottom sits below the fold, never lifting its top under the nav.
  useEffect(() => {
    if (!talk) return;
    const el = windowRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const navClearance = window.matchMedia("(min-width: 768px)").matches
      ? 120
      : 88;
    const by = Math.min(
      r.bottom - (window.innerHeight - 24),
      r.top - navClearance,
    );
    if (by > 8)
      window.scrollBy({ top: by, behavior: reduced ? "auto" : "smooth" });
  }, [visibleCount, talk, reduced]);

  const visible = messages.slice(0, visibleCount);
  const question = flow && !done ? flow.questions[step] : null;

  return (
    <>
      <section
        ref={windowRef}
        aria-label={content.window.label}
        style={growFrom === null ? undefined : { height: `${growFrom}px` }}
        data-hero-job-reply={talk?.intent}
        class={`mx-auto flex w-full max-w-[760px] flex-col rounded-[24px] border border-(--color-border) bg-card text-left ${WINDOW_GROWTH} ${talk ? WINDOW_OPEN : WINDOW_COMPACT}`}
      >
        <header class="flex items-center gap-3 border-b border-(--color-border) px-4 py-3 md:px-5">
          <span
            title={talk?.taker?.name}
            class="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--color-sage-800) text-(--color-cream-50)"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 43.133 37.6 35.9"
              class="size-[18px]"
              fill="currentColor"
            >
              <path d={ZENML_MARK_PATH} />
            </svg>
          </span>
          <span class="flex min-w-0 flex-1 flex-col">
            <span class="font-sans text-[15px] leading-[20px] font-semibold text-(--color-cream-900)">
              {content.window.name}
            </span>
            <span class="font-sans text-[13px] leading-[18px] text-(--color-cream-700)">
              {content.window.status}
            </span>
          </span>
          {talk && (
            <button type="button" onClick={reset} class={TEXT_LINK}>
              {content.changeJobLabel}
            </button>
          )}
        </header>

        <div
          ref={threadRef}
          class="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 py-4 md:px-5"
        >
          <ol
            aria-live="polite"
            class="mt-auto flex flex-col font-sans text-[15px] leading-[22px] md:text-[16px] md:leading-[24px]"
          >
            {visible.map((m, i) => {
              const grouped = visible[i - 1]?.side === m.side;
              const lastOfGroup = visible[i + 1]?.side !== m.side;
              const mine = m.side === "visitor";
              const gap = grouped ? "mt-[3px]" : i ? "mt-3" : "";
              const corner = lastOfGroup
                ? mine
                  ? "rounded-br-[4px]"
                  : "rounded-bl-[4px]"
                : "";
              return (
                <li
                  key={m.key}
                  class={`${ENTER} flex ${m.label ? "flex-col items-start" : mine ? "justify-end" : "justify-start"} ${gap}`}
                >
                  {m.label && (
                    <span
                      data-hero-job-taker
                      class="mb-1 pl-3.5 font-sans text-[12px] leading-[16px] font-semibold text-(--color-sage-800) md:pl-4"
                    >
                      {m.label}
                    </span>
                  )}
                  <span class="sr-only">
                    {mine
                      ? content.reply.visitorPrefix
                      : content.reply.engineerPrefix}{" "}
                  </span>
                  {m.bare ? (
                    <div class="w-full max-w-[85%] md:max-w-[75%]">
                      {m.body}
                    </div>
                  ) : (
                    <div
                      class={`relative max-w-[85%] break-words rounded-[18px] px-3.5 py-2 md:max-w-[75%] md:px-4 ${BUBBLE_TONE[m.side]} ${corner}`}
                    >
                      {m.body}
                      {lastOfGroup && <Tail side={m.side} />}
                    </div>
                  )}
                </li>
              );
            })}
            {typing && (
              <li aria-hidden="true" class={`${ENTER} mt-3 flex justify-start`}>
                <div
                  class={`relative flex h-9 items-center gap-1 rounded-[18px] rounded-bl-[4px] px-4 ${BUBBLE_TONE.engineer}`}
                >
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      class="size-1.5 animate-bounce rounded-full bg-(--color-cream-600) motion-reduce:animate-none"
                      style={{ animationDelay: `${d * 150}ms` }}
                    />
                  ))}
                  <Tail side="engineer" />
                </div>
              </li>
            )}
          </ol>
          <span class="sr-only" aria-live="polite">
            {typing ? content.reply.typingLabel : ""}
          </span>
        </div>

        <div class="border-t border-(--color-border) p-3 md:px-4">
          {question && settled && (
            <div
              ref={repliesRef}
              data-hero-job-options={question.id}
              class="-mx-3 mb-3 flex gap-2 overflow-x-auto px-3 pb-0.5 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
            >
              {question.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  data-hero-job-answer={option.value}
                  onClick={() => answer(option)}
                  class={QUICK_REPLY}
                >
                  {option.label}
                </button>
              ))}
              <button
                type="button"
                data-hero-job-skip
                onClick={() => answer(null)}
                class={`${TEXT_LINK} shrink-0 px-2`}
              >
                {content.reply.skipLabel}
              </button>
            </div>
          )}
          <form
            ref={formRef}
            method="get"
            action={content.connect.href}
            class="relative rounded-[20px] border border-(--color-border) bg-(--color-cream-50) transition-colors duration-200 ease-out has-[textarea:focus-visible]:border-(--color-sage-800) has-[textarea:focus-visible]:ring-2 has-[textarea:focus-visible]:ring-(--color-sage-800)"
            onSubmit={(e) => {
              e.preventDefault();
              start(value, content.analytics.submit);
            }}
          >
            {pickerOpen && (
              <StackPicker
                content={content.stack}
                tools={offered.filter((t) => !picked.includes(t.value))}
                onPick={addTool}
                onClose={closePicker}
              />
            )}
            {pickedTools.length > 0 && (
              <ul data-hero-job-stack class="flex flex-wrap gap-1.5 px-3 pt-3">
                {pickedTools.map((tool) => (
                  <li
                    key={tool.value}
                    data-hero-job-stack-chip={tool.value}
                    class="inline-flex h-7 items-center gap-0.5 rounded-full bg-(--color-sage-100) pr-1 pl-2.5 font-sans text-[13px] leading-[18px] text-(--color-sage-800)"
                  >
                    {content.stack.chipPrefix}
                    {tool.name}
                    <button
                      type="button"
                      aria-label={fillTemplate(content.stack.removeLabel, {
                        name: tool.name,
                      })}
                      onClick={() => removeTool(tool)}
                      class="inline-flex size-6 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ease-out hover:bg-(--color-sage-400) focus-visible:ring-2 focus-visible:ring-(--color-sage-800) focus-visible:outline-none"
                    >
                      <Icon d="M7 7l10 10M17 7L7 17" class="size-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <textarea
              ref={inputRef}
              id="hero-job-input"
              name="job"
              rows={talk ? 1 : 2}
              required
              maxLength={MAX_JOB_LENGTH}
              autoComplete="off"
              aria-label={content.label}
              disabled={!!talk}
              placeholder={
                talk ? content.replyPlaceholder : content.placeholder
              }
              value={value}
              onInput={(e) => {
                const el = e.target as HTMLTextAreaElement;
                // "@" opens the stack picker instead of landing in the job.
                if ((e as InputEvent).data === "@") {
                  const at = el.selectionStart - 1;
                  if (el.value[at] === "@") {
                    el.value = el.value.slice(0, at) + el.value.slice(at + 1);
                    el.setSelectionRange(at, at);
                    setPickerOpen(true);
                  }
                }
                setValue(el.value);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter" || e.shiftKey || e.isComposing) return;
                e.preventDefault();
                formRef.current?.requestSubmit();
              }}
              class="block w-full resize-none bg-transparent px-4 pt-3 pb-1 font-sans text-[16px] leading-[24px] text-foreground placeholder:text-(--color-cream-700) focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            />
            <div class="flex items-center gap-3 px-2 pb-2">
              <EngineerMenu
                content={content.composer}
                selected={engineerIndex}
                disabled={!!talk}
                onSelect={selectEngineer}
              />
              <button
                ref={hintRef}
                type="button"
                data-hero-job-stack-hint
                aria-haspopup="listbox"
                aria-expanded={pickerOpen}
                onClick={() => setPickerOpen(!pickerOpen)}
                class="inline-flex h-9 cursor-pointer items-center rounded-full px-2 font-sans text-[13px] leading-[18px] text-(--color-cream-700) transition-colors duration-200 ease-out hover:text-(--color-sage-800) focus-visible:ring-2 focus-visible:ring-(--color-sage-800) focus-visible:outline-none"
              >
                {content.stack.hint}
              </button>
              <span class="ml-auto hidden items-center gap-1 font-sans text-[13px] leading-[18px] text-(--color-cream-700) sm:inline-flex">
                <kbd class="font-sans">{content.composer.sendKey}</kbd>
                {content.composer.sendHint}
              </span>
              <button
                type="submit"
                aria-label={content.submitLabel}
                disabled={!!talk}
                class="ml-auto inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-(--color-cream-900) text-(--color-cream-50) transition-colors duration-200 ease-out hover:bg-(--color-sage-800) focus-visible:ring-2 focus-visible:ring-(--color-sage-800) focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 sm:ml-0"
              >
                <Icon d="M12 19V5M6 11l6-6 6 6" class="size-[18px]" />
              </button>
            </div>
          </form>
          {!talk && (
            <div
              data-hero-job-options="examples"
              class="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3"
            >
              {content.examples.map((example) => (
                <button
                  key={example}
                  type="button"
                  data-hero-job-example
                  onClick={() => start(example, content.analytics.example)}
                  class={EXAMPLE_CHIP}
                >
                  {example}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
