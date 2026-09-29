/**
 * HeroJob — the homepage hero's job box ("Give it a job"): a messenger-style
 * chat window with the AI engineer, centered under the headline and deck.
 *
 * The window has a fixed height and its thread scrolls inside it, so the
 * hero never grows. The height follows the viewport (clamped) so the whole
 * window fits under the headline without scrolling the page into the nav. A visitor gives a job (types it in the composer at the
 * bottom, or taps an example quick reply above it); the engineer takes it
 * ("On it: …"), asks the use case and at most two more questions, one at a
 * time, answered by quick-reply chips above the composer (or "Skip"). After
 * the use case it shows real case studies from the LLMOps/MLOps databases
 * as link cards (picked at build time, see heroJobProof.ts). Then the value:
 * a plan and a first-week preview filled from the answers. Only then does it
 * ask for access: "Connect and start" goes to the signup with `?job=` and
 * `&answers=`.
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
 * submit/example/answer/skip fire here through PlausibleBridge's
 * `__zenmlPlausibleTrack`; the links carry `data-analytics` like every CTA.
 */
import type { ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import {
  classifyHeroJob,
  displayJob,
  fillTemplate,
  type HeroJobAnswers,
  heroJobOutcome,
  heroJobSignupHref,
} from "../../lib/heroJobPlan";
import type { HeroJobCaseStudy } from "../../lib/heroJobProof";
import type {
  HeroJobContent,
  HeroJobIntent,
  HeroJobOption,
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
const QUICK_REPLY =
  "inline-flex min-h-11 shrink-0 cursor-pointer items-center whitespace-nowrap rounded-full border border-(--color-sage-500) bg-card px-4 font-sans text-[14px] leading-[20px] text-(--color-sage-800) transition-colors duration-200 ease-out hover:bg-(--color-sage-100) md:min-h-9";
const SECTION_LABEL =
  "font-label text-[13px] uppercase tracking-[0.05em] text-(--color-sage-800)";
/** Entry fade for a message or a line inside one; nothing under reduced motion. */
const ENTER =
  "transition-[opacity,translate] duration-300 ease-out starting:translate-y-1 starting:opacity-0 motion-reduce:transition-none";

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
  body: ComponentChildren;
}

interface Props {
  content: HeroJobContent;
  /** Case studies per use-case option value, precomputed at build time. */
  proof: Readonly<Record<string, readonly HeroJobCaseStudy[]>>;
}

interface Conversation {
  job: string;
  intent: HeroJobIntent;
  answers: HeroJobAnswers;
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

export function HeroJob({ content, proof }: Props) {
  const [value, setValue] = useState("");
  const [talk, setTalk] = useState<Conversation | null>(null);
  // The greeting (message 0) is visible from the server render on.
  const [shown, setShown] = useState(1);
  const [typing, setTyping] = useState(false);
  const [reduced, setReduced] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const repliesRef = useRef<HTMLDivElement>(null);
  const focusNext = useRef(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const flow = talk ? content.flows[talk.intent] : null;
  const step = talk?.answers.length ?? 0;
  const useCase = talk?.answers[0]?.value;
  const cases = useCase ? (proof[useCase] ?? []) : [];
  const done = !!flow && step >= flow.questions.length;

  const start = (raw: string, event: string) => {
    const job = raw.trim();
    if (!job || talk) return;
    const intent = classifyHeroJob(job);
    track(event, { intent });
    setValue("");
    setTalk({ job, intent, answers: [] });
  };

  const answer = (option: HeroJobOption | null) => {
    if (!talk || !flow || done) return;
    const question = flow.questions[step];
    track(option ? content.analytics.answer : content.analytics.skip, {
      intent: talk.intent,
      question: question.id,
      ...(option ? { answer: option.value } : {}),
    });
    focusNext.current = true;
    setTalk({ ...talk, answers: [...talk.answers, option] });
  };

  const reset = () => {
    setTalk(null);
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
      body: (
        <>
          {content.reply.acceptedPrefix} “{displayJob(talk.job)}”.
        </>
      ),
    });

    flow.questions.slice(0, step + 1).forEach((question, i) => {
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
            <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
              <a
                href={heroJobSignupHref(
                  content.connect.href,
                  talk.job,
                  flow,
                  talk.answers,
                )}
                data-analytics={content.connect.analytics}
                class={PRIMARY_PILL}
              >
                {content.connect.label}
              </a>
              <a
                href={content.signup.href}
                data-analytics={content.signup.analytics}
                class={TEXT_LINK}
              >
                {content.signup.label}
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

  const visible = messages.slice(0, visibleCount);
  const question = flow && !done ? flow.questions[step] : null;

  return (
    <section
      aria-label={content.window.label}
      data-hero-job-reply={talk?.intent}
      class="mx-auto flex h-[clamp(420px,calc(100svh-400px),640px)] w-full max-w-[760px] flex-col overflow-hidden rounded-[24px] border border-(--color-border) bg-card text-left md:h-[clamp(360px,calc(100svh-440px),520px)]"
    >
      <header class="flex items-center gap-3 border-b border-(--color-border) px-4 py-3 md:px-5">
        <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--color-sage-800) text-(--color-cream-50)">
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
          <span class="flex items-center gap-1.5 font-sans text-[13px] leading-[18px] text-(--color-cream-700)">
            <span
              aria-hidden="true"
              class="size-2 rounded-full bg-(--color-success-500)"
            />
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
                class={`${ENTER} flex ${mine ? "justify-end" : "justify-start"} ${gap}`}
              >
                <span class="sr-only">
                  {mine
                    ? content.reply.visitorPrefix
                    : content.reply.engineerPrefix}{" "}
                </span>
                {m.bare ? (
                  <div class="w-full max-w-[85%] md:max-w-[75%]">{m.body}</div>
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
        {(!talk || (question && settled)) && (
          <div
            ref={repliesRef}
            data-hero-job-options={question?.id ?? "examples"}
            class="-mx-3 mb-3 flex gap-2 overflow-x-auto px-3 pb-0.5 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
          >
            {!talk
              ? content.examples.map((example) => (
                  <button
                    key={example}
                    type="button"
                    data-hero-job-example
                    onClick={() => start(example, content.analytics.example)}
                    class={QUICK_REPLY}
                  >
                    {example}
                  </button>
                ))
              : question?.options.map((option) => (
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
            {talk && (
              <button
                type="button"
                data-hero-job-skip
                onClick={() => answer(null)}
                class={`${TEXT_LINK} shrink-0 px-2`}
              >
                {content.reply.skipLabel}
              </button>
            )}
          </div>
        )}
        <form
          method="get"
          action={content.connect.href}
          class="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            start(value, content.analytics.submit);
          }}
        >
          <input
            id="hero-job-input"
            type="text"
            name="job"
            required
            maxLength={MAX_JOB_LENGTH}
            autoComplete="off"
            aria-label={content.label}
            disabled={!!talk}
            placeholder={talk ? content.replyPlaceholder : content.placeholder}
            value={value}
            onInput={(e) => setValue((e.target as HTMLInputElement).value)}
            class="h-11 min-w-0 flex-1 rounded-full border border-(--color-border) bg-(--color-cream-50) px-4 font-sans text-[16px] text-foreground transition-colors duration-200 ease-out placeholder:text-(--color-cream-700) focus-visible:border-(--color-sage-800) focus-visible:ring-2 focus-visible:ring-(--color-sage-800) focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          />
          <button
            type="submit"
            aria-label={content.submitLabel}
            disabled={!!talk}
            class="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-(--color-cream-900) text-(--color-cream-50) transition-colors duration-200 ease-out hover:bg-(--color-sage-800) focus-visible:ring-2 focus-visible:ring-(--color-sage-800) focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
