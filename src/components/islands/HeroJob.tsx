/**
 * HeroJob — the homepage hero's eval plan: a messenger-style chat window
 * with the AI engineer, centered under the headline and deck, that turns a
 * description of the visitor's AI system into a report before any sign-up.
 *
 * Before the first message the window is compact: header, greeting (with
 * the number of case studies in both research databases, counted at build
 * time), two path chips ("An agent or AI app", "A model we're fine-tuning")
 * and the composer. A visitor taps a path or describes the system; a
 * description picks the path and answers the questions it already implies.
 * The engineer then asks the path's remaining questions one at a time, as
 * quick-reply chips above the composer (each skippable). The window grows
 * with the conversation up to a viewport-clamped cap and its thread scrolls
 * inside it; once the report arrives the cap lifts so the report reads with
 * the page.
 *
 * The report (composed in heroJobPlan.ts from heroJobAdvice.ts): systems
 * like yours (real LLMOps/MLOps database entries, matched at build time and
 * fetched from /hero-job-cases.json once the visitor starts), what breaks
 * first, the evals to write first (checks, an example test case, how to
 * grade) and short advice. The first failure modes and the first eval are
 * open to everyone; the rest show as locked rows until the visitor leaves
 * an email in the gate under the report, which posts to the site's existing
 * /api/forms route and unlocks the report on the page whatever the answer.
 * Unlocked, the report ends on the path's next step (connect traces, or
 * connect data), a signup link carrying `?path=`, `&answers=` and `&job=`.
 *
 * Mounted from `/` only, into LabsHero's `action` slot (client:load: the
 * hero's one control, above the fold). With JS off the composer is a GET
 * form to the signup with the description as `job`, and the path chips are
 * links to the signup with `?path=`.
 *
 * Strings live in LABS_HERO_JOB (src/lib/labs-home.ts). Each engineer
 * message group is preceded by a typing indicator (~800ms), and messages
 * enter ~150ms per line apart with a short fade (CSS @starting-style, no
 * keyframes); under reduced motion there is no indicator and every message
 * appears at once. Analytics: path/submit/answer/skip/unlock fire here
 * through PlausibleBridge's `__zenmlPlausibleTrack`; links carry
 * `data-analytics` like every CTA.
 */
import type { ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { TURNSTILE_SITE_KEY } from "../../lib/formConstants";
import { validateForm } from "../../lib/formValidation";
import {
  HERO_JOB_ADVICE,
  HERO_JOB_FAILURES,
  type HeroJobAdvice,
  type HeroJobFailure,
} from "../../lib/heroJobAdvice";
import {
  answerLabels,
  classifyHeroJobPath,
  FREE_EVALS,
  FREE_FAILURES,
  fillTemplate,
  type HeroJobAnswers,
  heroJobAdvice,
  heroJobExample,
  heroJobFailures,
  heroJobSignupHref,
  impliedAnswers,
  pickSimilar,
  seenAt,
  serializeAnswers,
} from "../../lib/heroJobPlan";
import type { HeroJobCase, HeroJobCasePool } from "../../lib/heroJobProof";
import type {
  HeroJobContent,
  HeroJobOption,
  HeroJobPath,
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

type TurnstileWindow = Window &
  typeof globalThis & {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
    };
    onHeroJobTurnstileLoad?: () => void;
  };

const REVEAL_STEP_MS = 150;
const TYPING_MS = 800;
const TYPING_LEAD_MS = 250;
const MAX_JOB_LENGTH = 200;
const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";
const TURNSTILE_FLEXIBLE_MIN = 300;

/** The ZenML mark, verbatim from ZenmlLabsLogo.astro's lockup — never redraw it. */
const ZENML_MARK_PATH =
  "M18.528 66.318C18.689 66.318 18.862 66.275 19.006 66.219 19.006 66.219 36.073 58.183 36.073 58.183 36.97 57.755 37.564 56.844 37.564 55.861 37.564 55.861 37.564 53.553 37.564 53.553 37.564 52.556 37 51.671 36.087 51.244 36.087 51.244 20.108 43.721 20.108 43.721 19.268 43.336 18.313 43.336 17.486 43.721 17.486 43.721 1.492 51.244 1.492 51.244 0.595 51.657 0 52.569 0 53.566 0 53.566 0 55.875 0 55.875 0 56.872 0.565 57.755 1.478 58.183 1.478 58.183 8.071 61.276 8.071 61.276 8.071 61.276 3.21 63.559 1.591 64.319 0.595 64.786 0.001 65.62 0.001 66.688 0.001 66.688 0.001 68.854 0.001 68.854 0.001 69.85 0.566 70.736 1.479 71.162 1.479 71.162 17.459 78.67 17.459 78.67 17.878 78.87 18.327 78.969 18.776 78.969 19.225 78.969 19.675 78.87 20.095 78.67 20.095 78.67 36.088 71.162 36.088 71.162 36.986 70.736 37.58 69.822 37.58 68.84 37.58 68.84 37.58 66.531 37.58 66.531 37.58 65.535 37.015 64.652 36.104 64.224 36.104 64.224 32.567 62.571 32.567 62.571 32.567 62.571 30.004 63.797 30.004 63.797 30.004 63.797 35.133 66.204 35.133 66.204 35.263 66.275 35.349 66.404 35.349 66.546 35.349 66.546 35.349 68.854 35.349 68.854 35.349 68.996 35.263 69.138 35.133 69.196 35.133 69.196 19.154 76.703 19.154 76.703 18.921 76.804 18.675 76.804 18.443 76.703 18.443 76.703 2.466 69.196 2.466 69.196 2.335 69.125 2.247 68.996 2.247 68.854 2.247 68.854 2.247 66.688 2.247 66.688 2.247 66.475 2.421 66.318 2.625 66.318 2.625 66.318 18.531 66.318 18.531 66.318 18.531 66.318 18.528 66.318 18.528 66.318ZM2.232 55.858C2.232 55.858 2.232 53.552 2.232 53.552 2.232 53.41 2.318 53.28 2.449 53.21 2.449 53.21 18.442 45.703 18.442 45.703 18.675 45.603 18.92 45.603 19.152 45.703 19.152 45.703 35.13 53.211 35.13 53.211 35.261 53.282 35.347 53.41 35.347 53.553 35.347 53.553 35.347 55.861 35.347 55.861 35.347 56.003 35.261 56.145 35.13 56.203 35.13 56.203 19.152 63.711 19.152 63.711 18.92 63.811 18.675 63.811 18.442 63.711 18.442 63.711 2.449 56.2 2.449 56.2 2.318 56.13 2.232 56.002 2.232 55.858Z";

const PRIMARY_PILL = `${LABS_BUTTON_BASE} ${LABS_BUTTON_TONE_CLASSES.dark}`;
const TEXT_LINK =
  "inline-flex min-h-11 cursor-pointer items-center font-sans text-[14px] text-(--color-cream-800) underline decoration-(--color-cream-600) underline-offset-4 transition-colors duration-200 ease-out hover:text-(--color-sage-800) hover:decoration-(--color-sage-800) md:min-h-9";
/** The two path chips before the first message: side by side, stacked on small phones. */
const PATH_CHIP =
  "inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-full border border-(--color-sage-500) bg-card px-4 py-2 text-center font-sans text-[15px] leading-[20px] font-semibold text-(--color-sage-800) transition-colors duration-200 ease-out hover:bg-(--color-sage-100) md:min-h-10";
const QUICK_REPLY =
  "inline-flex min-h-11 shrink-0 cursor-pointer items-center whitespace-nowrap rounded-full border border-(--color-sage-500) bg-card px-4 font-sans text-[14px] leading-[20px] text-(--color-sage-800) transition-colors duration-200 ease-out hover:bg-(--color-sage-100) md:min-h-9";
const SECTION_LABEL =
  "font-label text-[13px] uppercase tracking-[0.05em] text-(--color-sage-800)";
const SMALL_LABEL =
  "font-label text-[11px] uppercase tracking-[0.05em] text-(--color-sage-800)";
const REPORT_SECTION =
  "border-t border-(--color-border) px-3 py-5 sm:px-4 md:px-6";
const REPORT_HEADING =
  "font-sans text-[18px] leading-[24px] font-semibold text-(--color-cream-900)";
const BODY_MUTED =
  "font-sans text-[14px] leading-[21px] text-(--color-cream-800) md:text-[15px] md:leading-[23px]";
/** Entry fade for a message; nothing under reduced motion. */
const ENTER =
  "transition-[opacity,translate] duration-300 ease-out starting:translate-y-1 starting:opacity-0 motion-reduce:transition-none";

/**
 * Window height: compact (header, greeting, path chips, composer) until the
 * first message; then it grows with the conversation up to a cap (the
 * viewport minus room for the nav) and the thread scrolls inside. The cap
 * lifts once the report is in, so the report reads with the page. The first
 * growth eases from the compact height, pinned in pixels for a frame (see
 * `growFrom`); under reduced motion it is instant.
 */
const WINDOW_GROWTH =
  "transition-[height] duration-300 ease-out motion-reduce:transition-none";
const WINDOW_COMPACT = "h-auto";
const WINDOW_OPEN =
  "h-auto max-h-[clamp(380px,calc(100svh-120px),640px)] md:max-h-[clamp(440px,calc(100dvh-220px),720px)]";
const WINDOW_REPORT = "h-auto";

const BUBBLE_TONE = {
  engineer: "bg-(--color-cream-100) text-(--color-cream-900)",
  visitor: "bg-(--color-sage-400) text-(--color-cream-900)",
} as const;
const TAIL_COLOR = {
  engineer: "text-(--color-cream-100)",
  visitor: "text-(--color-sage-400)",
} as const;

const LOCK_PATH = "M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4";

type Side = "engineer" | "visitor";

/** One message; `lines` paces the entry of the next one. `wide` skips the bubble (the report). */
interface Message {
  key: string;
  side: Side;
  lines: number;
  wide?: boolean;
  body: ComponentChildren;
}

interface Props {
  content: HeroJobContent;
  /** Published entries across both research databases, counted at build time. */
  caseCount: number;
  /** The build-time case pool (heroJobProof.ts), fetched once a visitor starts. */
  casesHref: string;
}

interface Conversation {
  path: HeroJobPath;
  /** The visitor's own description, when they typed one. */
  job?: string;
  /** Answers the description implied: neither asked nor echoed. */
  implied: Readonly<Record<string, string>>;
  /** The questions asked so far, in order, with the answer (null: skipped). */
  replies: readonly { id: string; value: string | null }[];
}

type PoolState =
  | { status: "idle" | "loading" | "failed" }
  | { status: "ready"; pool: HeroJobCasePool };

type GateState =
  | { status: "locked" | "submitting"; error?: string }
  | { status: "unlocked"; email: string; saved: boolean };

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

/** A locked row: the title stays, the body is a placeholder bar. */
function Locked({ label }: { label: string }) {
  return (
    <span class="mt-1.5 flex items-center gap-2">
      <Icon d={LOCK_PATH} class="size-3.5 shrink-0 text-(--color-cream-700)" />
      <span class="sr-only">{label}</span>
      <span aria-hidden="true" class="flex flex-1 flex-col gap-1.5">
        <span class="block h-2.5 w-full rounded-full bg-(--color-cream-200)" />
        <span class="block h-2.5 w-2/3 rounded-full bg-(--color-cream-200)" />
      </span>
    </span>
  );
}

function CaseCard({
  row,
  content,
}: {
  row: HeroJobCase;
  content: HeroJobContent;
}) {
  return (
    <li>
      <a
        href={row.href}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics={content.analytics.caseStudy}
        data-hero-job-case
        class="group flex flex-col rounded-[16px] border border-(--color-border) bg-card px-4 py-3 transition-colors duration-200 ease-out hover:border-(--color-sage-400)"
      >
        <span class={SMALL_LABEL}>
          {content.report.sourceLabels[row.source]}
        </span>
        <strong class="mt-1 block font-sans text-[15px] leading-[22px] font-semibold text-(--color-cream-900)">
          {row.company}
        </strong>
        <span class="line-clamp-3 font-sans text-[14px] leading-[20px] text-(--color-cream-800) group-hover:text-(--color-sage-800)">
          {row.title}
        </span>
        {row.ranInto && (
          <span class="mt-2 block border-t border-(--color-cream-200) pt-2 font-sans text-[13px] leading-[19px] text-(--color-cream-700)">
            <span class="font-semibold text-(--color-cream-800)">
              {content.report.ranIntoLabel}:
            </span>{" "}
            <span class="line-clamp-3 inline">{row.ranInto}</span>
          </span>
        )}
      </a>
    </li>
  );
}

function EvalCard({
  failure,
  answers,
  content,
  open,
}: {
  failure: HeroJobFailure;
  answers: HeroJobAnswers;
  content: HeroJobContent;
  open: boolean;
}) {
  const r = content.report;
  const example = heroJobExample(failure, answers);
  return (
    <li
      data-hero-job-eval={failure.id}
      data-locked={open ? undefined : ""}
      class="rounded-[16px] border border-(--color-border) px-4 py-3"
    >
      <p class="font-sans text-[15px] leading-[22px] font-semibold text-(--color-cream-900)">
        {failure.eval.name}
      </p>
      {open ? (
        <dl class={`mt-2 flex flex-col gap-3 ${BODY_MUTED}`}>
          <div>
            <dt class={SMALL_LABEL}>{r.checksLabel}</dt>
            <dd class="mt-0.5">{failure.eval.checks}</dd>
          </div>
          <div>
            <dt class={SMALL_LABEL}>{r.exampleLabel}</dt>
            <dd class="mt-1 rounded-[10px] bg-(--color-cream-50) px-3 py-2">
              <p>
                <span class="font-semibold text-(--color-cream-900)">
                  {r.inputLabel}:
                </span>{" "}
                {example.input}
              </p>
              <p class="mt-1">
                <span class="font-semibold text-(--color-cream-900)">
                  {r.expectLabel}:
                </span>{" "}
                {example.expect}
              </p>
            </dd>
          </div>
          <div>
            <dt class={SMALL_LABEL}>{r.gradeLabel}</dt>
            <dd class="mt-0.5">
              <span class="mr-1.5 inline-flex rounded-full bg-(--color-sage-100) px-2 py-0.5 font-sans text-[12px] leading-[16px] font-semibold text-(--color-sage-800)">
                {r.grades[failure.eval.grade]}
              </span>
              {failure.eval.how}
            </dd>
          </div>
        </dl>
      ) : (
        <Locked label={r.lockedLabel} />
      )}
    </li>
  );
}

/** Renders Cloudflare Turnstile into `el` once, when a site key is set. */
function useTurnstile(el: HTMLDivElement | null) {
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !el) return;
    const w = window as TurnstileWindow;
    let rendered = false;
    const render = () => {
      if (rendered || !w.turnstile || !el.isConnected) return;
      rendered = true;
      w.turnstile.render(el, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "light",
        // Flexible needs TURNSTILE_FLEXIBLE_MIN px; narrower gates get compact.
        size: el.clientWidth >= TURNSTILE_FLEXIBLE_MIN ? "flexible" : "compact",
      });
    };
    if (w.turnstile) {
      render();
      return;
    }
    w.onHeroJobTurnstileLoad = render;
    if (document.getElementById(TURNSTILE_SCRIPT_ID)) return;
    const script = document.createElement("script");
    script.id = TURNSTILE_SCRIPT_ID;
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onHeroJobTurnstileLoad";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, [el]);
}

function Gate({
  content,
  path,
  state,
  hidden,
  onSubmit,
  skipHref,
}: {
  content: HeroJobContent;
  path: HeroJobPath;
  state: GateState;
  hidden: Readonly<Record<string, string>>;
  onSubmit: (form: HTMLFormElement) => void;
  skipHref: string;
}) {
  const g = content.gate;
  const [widget, setWidget] = useState<HTMLDivElement | null>(null);
  useTurnstile(widget);
  if (state.status === "unlocked") return null;
  const busy = state.status === "submitting";
  return (
    <form
      data-hero-job-gate
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e.currentTarget);
      }}
      class="rounded-[20px] bg-(--color-cream-100) px-3 py-5 sm:px-4 md:px-6"
    >
      <p class="flex items-center gap-2 font-sans text-[17px] leading-[24px] font-semibold text-(--color-cream-900)">
        <Icon d={LOCK_PATH} class="size-4 text-(--color-sage-800)" />
        {g.heading}
      </p>
      <p class={`mt-1 ${BODY_MUTED}`}>
        {fillTemplate(g.body, { locked: content.paths[path].lockedSummary })}
      </p>
      {Object.entries(hidden).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <label for="hero-job-email" class="sr-only">
        {g.emailLabel}
      </label>
      <div class="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:border sm:border-(--color-border) sm:bg-card sm:p-1">
        <input
          id="hero-job-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder={g.emailPlaceholder}
          aria-invalid={state.error === g.invalidEmail ? true : undefined}
          aria-describedby={state.error ? "hero-job-gate-error" : undefined}
          class="h-12 w-full min-w-0 rounded-full border border-(--color-border) bg-card px-5 font-sans text-[16px] text-foreground placeholder:text-(--color-cream-700) focus-visible:ring-2 focus-visible:ring-(--color-sage-800) focus-visible:outline-none sm:h-10 sm:flex-1 sm:border-0 sm:px-4"
        />
        <button
          type="submit"
          disabled={busy}
          data-hero-job-unlock
          class={`${PRIMARY_PILL} shrink-0 disabled:cursor-wait disabled:opacity-60 sm:h-10`}
        >
          {busy ? g.submittingLabel : g.submitLabel}
        </button>
      </div>
      <label class="mt-3 flex min-h-11 cursor-pointer items-start gap-2.5 font-sans text-[13px] leading-[19px] text-(--color-cream-800) md:min-h-0">
        <input
          type="checkbox"
          name="privacy"
          required
          class="mt-0.5 size-4 shrink-0 cursor-pointer accent-(--color-sage-800)"
        />
        <span>
          {g.privacyPrefix}{" "}
          <a
            href={g.privacyLink.href}
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2 hover:text-(--color-sage-800)"
          >
            {g.privacyLink.label}
          </a>
          .
        </span>
      </label>
      {state.error && (
        <p
          id="hero-job-gate-error"
          role="alert"
          class="mt-2 font-sans text-[13px] leading-[19px] text-(--color-orange-700)"
        >
          {state.error}
        </p>
      )}
      <div ref={setWidget} class="mt-3 empty:hidden" />
      <a
        href={skipHref}
        data-analytics={content.analytics.skipGate}
        class={`${TEXT_LINK} mt-2`}
      >
        {g.skipLabel}
      </a>
    </form>
  );
}

function Report({
  content,
  caseCount,
  talk,
  answers,
  pool,
  gate,
  onUnlock,
}: {
  content: HeroJobContent;
  caseCount: string;
  talk: Conversation;
  answers: HeroJobAnswers;
  pool: PoolState;
  gate: GateState;
  onUnlock: (
    form: HTMLFormElement,
    failures: readonly HeroJobFailure[],
  ) => void;
}) {
  const r = content.report;
  const pathContent = content.paths[talk.path];
  const questions = pathContent.questions;
  const failures = heroJobFailures(talk.path, answers, HERO_JOB_FAILURES);
  const advice: HeroJobAdvice[] = heroJobAdvice(
    talk.path,
    answers,
    HERO_JOB_ADVICE,
  );
  const unlocked = gate.status === "unlocked";
  const similar =
    pool.status === "ready"
      ? pickSimilar(pool.pool, talk.path, answers, questions)
      : [];
  const signup = heroJobSignupHref(content.signupHref, talk.path, {
    questions,
    answers,
    job: talk.job,
  });
  const labels = answerLabels(questions, answers);
  return (
    <article
      data-hero-job-report={talk.path}
      data-unlocked={unlocked ? "" : undefined}
      aria-live="off"
      class="w-full overflow-hidden rounded-[20px] border border-(--color-border) bg-card"
    >
      <header class="px-3 py-5 sm:px-4 md:px-6">
        <p class={SECTION_LABEL}>
          {fillTemplate(r.basis, { count: caseCount })}
        </p>
        <h3 class="mt-1 font-display text-[28px] leading-[32px] text-(--color-cream-900) md:text-[32px] md:leading-[36px]">
          {pathContent.reportTitle}
        </h3>
        {(talk.job || labels.length > 0) && (
          <p class={`mt-2 ${BODY_MUTED}`}>
            {talk.job ? `“${talk.job}”` : ""}
            {talk.job && labels.length ? " · " : ""}
            {labels.join(" · ")}
          </p>
        )}
      </header>
      {pool.status !== "failed" && (
        <section class={REPORT_SECTION} data-hero-job-similar>
          <h4 class={REPORT_HEADING}>{r.similarHeading}</h4>
          {pool.status === "ready" ? (
            <ul class="mt-3 grid grid-cols-1 items-start gap-2 md:grid-cols-3">
              {similar.map((row) => (
                <CaseCard key={row.href} row={row} content={content} />
              ))}
            </ul>
          ) : (
            <ul
              aria-hidden="true"
              class="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3"
            >
              {[0, 1, 2].map((i) => (
                <li
                  key={i}
                  class="h-[104px] animate-pulse rounded-[16px] bg-(--color-cream-100) motion-reduce:animate-none"
                />
              ))}
            </ul>
          )}
        </section>
      )}
      <section class={REPORT_SECTION} data-hero-job-failures>
        <h4 class={REPORT_HEADING}>{r.failuresHeading}</h4>
        <ol class="mt-3 flex flex-col gap-4">
          {failures.map((failure, i) => {
            const open = unlocked || i < FREE_FAILURES;
            const at =
              open && pool.status === "ready"
                ? seenAt(pool.pool, failure.id)
                : [];
            return (
              <li
                key={failure.id}
                data-hero-job-failure={failure.id}
                data-locked={open ? undefined : ""}
                class="grid grid-cols-[28px_1fr] gap-x-2"
              >
                <span class="font-label text-[15px] leading-[22px] text-(--color-sage-800)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p class="font-sans text-[15px] leading-[22px] font-semibold text-(--color-cream-900)">
                    {failure.title}
                  </p>
                  {open ? (
                    <>
                      <p class={`mt-0.5 ${BODY_MUTED}`}>{failure.why}</p>
                      {at.length > 0 && (
                        <p class="mt-1 font-sans text-[13px] leading-[19px] text-(--color-cream-700)">
                          {r.seenAtLabel}:{" "}
                          {at.map((c, j) => (
                            <span key={c.href}>
                              {j > 0 && ", "}
                              <a
                                href={c.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-analytics={content.analytics.caseStudy}
                                class="underline underline-offset-2 hover:text-(--color-sage-800)"
                              >
                                {c.company}
                              </a>
                            </span>
                          ))}
                        </p>
                      )}
                    </>
                  ) : (
                    <Locked label={r.lockedLabel} />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
      <section class={REPORT_SECTION} data-hero-job-evals>
        <h4 class={REPORT_HEADING}>{r.evalsHeading}</h4>
        <ol class="mt-3 flex flex-col gap-2">
          {failures.map((failure, i) => (
            <EvalCard
              key={failure.id}
              failure={failure}
              answers={answers}
              content={content}
              open={unlocked || i < FREE_EVALS}
            />
          ))}
        </ol>
      </section>
      <section class={REPORT_SECTION} data-hero-job-advice>
        <h4 class={REPORT_HEADING}>{pathContent.adviceHeading}</h4>
        <ul class="mt-3 flex flex-col gap-3">
          {advice.map((a) => (
            <li key={a.title} data-locked={unlocked ? undefined : ""}>
              <p class="font-sans text-[15px] leading-[22px] font-semibold text-(--color-cream-900)">
                {a.title}
              </p>
              {unlocked ? (
                <p class={`mt-0.5 ${BODY_MUTED}`}>{a.body}</p>
              ) : (
                <Locked label={r.lockedLabel} />
              )}
            </li>
          ))}
        </ul>
      </section>
      <div class="border-t border-(--color-border) p-3 md:p-4">
        {unlocked ? (
          <div
            data-hero-job-next
            class="rounded-[20px] bg-(--color-sage-100) px-3 py-5 sm:px-4 md:px-6"
          >
            <p
              role="status"
              class="font-sans text-[13px] leading-[19px] text-(--color-cream-800)"
            >
              {gate.saved
                ? fillTemplate(content.gate.unlocked, { email: gate.email })
                : content.gate.unsaved}
            </p>
            <p class="mt-3 font-sans text-[18px] leading-[24px] font-semibold text-(--color-cream-900)">
              {pathContent.next.heading}
            </p>
            <p class={`mt-1 ${BODY_MUTED}`}>{pathContent.next.body}</p>
            <a
              href={signup}
              data-analytics={pathContent.next.analytics}
              class={`${PRIMARY_PILL} mt-4`}
            >
              {pathContent.next.label}
            </a>
          </div>
        ) : (
          <Gate
            content={content}
            path={talk.path}
            state={gate}
            hidden={{
              path: talk.path,
              answers: serializeAnswers(questions, answers),
              job: talk.job ?? "",
              report: failures.map((f) => f.id).join(","),
            }}
            onSubmit={(form) => onUnlock(form, failures)}
            skipHref={signup}
          />
        )}
      </div>
    </article>
  );
}

export function HeroJob({ content, caseCount, casesHref }: Props) {
  const [value, setValue] = useState("");
  const [talk, setTalk] = useState<Conversation | null>(null);
  // The greeting (message 0) is visible from the server render on.
  const [shown, setShown] = useState(1);
  const [typing, setTyping] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [pool, setPool] = useState<PoolState>({ status: "idle" });
  const [gate, setGate] = useState<GateState>({ status: "locked" });
  // The compact height in px, held for one frame when the chat starts so the
  // window eases from it (the path chips leave at the same moment, so an
  // `auto` start height would first shrink the window).
  const [growFrom, setGrowFrom] = useState<number | null>(null);
  const windowRef = useRef<HTMLElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const repliesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const reportRef = useRef<HTMLLIElement>(null);
  const focusNext = useRef(false);
  const reportSeen = useRef(false);
  const count = new Intl.NumberFormat("en-US").format(caseCount);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const loadPool = () => {
    if (pool.status !== "idle") return;
    setPool({ status: "loading" });
    fetch(casesHref)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<HeroJobCasePool>;
      })
      .then((data) => setPool({ status: "ready", pool: data }))
      .catch(() => setPool({ status: "failed" }));
  };

  const pathContent = talk ? content.paths[talk.path] : null;
  const questions = pathContent?.questions ?? [];
  const answered = new Set(talk?.replies.map((r) => r.id));
  const question =
    questions.find(
      (q) => !(q.id in (talk?.implied ?? {})) && !answered.has(q.id),
    ) ?? null;
  const done = !!talk && !question;
  const answers: HeroJobAnswers = talk
    ? {
        ...talk.implied,
        ...Object.fromEntries(
          talk.replies.flatMap((r) => (r.value ? [[r.id, r.value]] : [])),
        ),
      }
    : {};

  const begin = (path: HeroJobPath, job?: string) => {
    if (talk) return;
    loadPool();
    if (!reduced && windowRef.current)
      setGrowFrom(windowRef.current.offsetHeight);
    setValue("");
    focusNext.current = true;
    setTalk({
      path,
      ...(job ? { job } : {}),
      implied: job ? impliedAnswers(job, content.paths[path].questions) : {},
      replies: [],
    });
  };

  const pickPath = (path: HeroJobPath) => {
    track(content.analytics.path, { path });
    begin(path);
  };

  const describe = (raw: string) => {
    const job = raw.trim();
    if (!job) return;
    const path = classifyHeroJobPath(job, content);
    track(content.analytics.submit, { path });
    begin(path, job);
  };

  const answer = (option: HeroJobOption | null) => {
    if (!talk || !question) return;
    track(option ? content.analytics.answer : content.analytics.skip, {
      path: talk.path,
      question: question.id,
      ...(option ? { answer: option.value } : {}),
    });
    focusNext.current = true;
    setTalk({
      ...talk,
      replies: [
        ...talk.replies,
        { id: question.id, value: option?.value ?? null },
      ],
    });
  };

  const unlock = async (
    form: HTMLFormElement,
    failures: readonly HeroJobFailure[],
  ) => {
    if (!talk || gate.status !== "locked") return;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const check = validateForm("eval-report", {
      email,
      path: talk.path,
      answers: String(data.get("answers") ?? ""),
      job: String(data.get("job") ?? ""),
      report: failures.map((f) => f.id).join(","),
    });
    if (check.errors.email) {
      setGate({ status: "locked", error: content.gate.invalidEmail });
      return;
    }
    if (!data.get("privacy")) {
      setGate({ status: "locked", error: content.gate.privacyRequired });
      return;
    }
    setGate({ status: "submitting" });
    let saved = false;
    try {
      const res = await fetch(content.gate.endpoint, {
        method: "POST",
        body: data,
      });
      saved = res.ok;
    } catch {
      saved = false;
    }
    track(content.analytics.unlock, {
      path: talk.path,
      saved: saved ? "yes" : "no",
    });
    setGate({ status: "unlocked", email, saved });
  };

  const reset = () => {
    setTalk(null);
    setShown(1);
    setTyping(false);
    setValue("");
    reportSeen.current = false;
  };

  // ---- the thread ---------------------------------------------------------
  const messages: Message[] = [
    {
      key: "greeting",
      side: "engineer",
      lines: 2,
      body: fillTemplate(content.reply.greeting, { count }),
    },
  ];
  const push = (key: string, side: Side, body: ComponentChildren, lines = 1) =>
    messages.push({ key, side, lines, body });
  if (talk && pathContent) {
    push("start", "visitor", talk.job ?? pathContent.label);
    if (talk.job)
      push(
        "accepted",
        "engineer",
        <>
          {content.reply.acceptedPrefix} “{talk.job}”.
        </>,
      );
    push("intro", "engineer", pathContent.intro);
    for (const reply of talk.replies) {
      const q = questions.find((x) => x.id === reply.id);
      if (!q) continue;
      push(`q-${q.id}`, "engineer", q.prompt);
      push(
        `a-${q.id}`,
        "visitor",
        q.options.find((o) => o.value === reply.value)?.label ??
          content.reply.skipLabel,
      );
    }
    if (question) push(`q-${question.id}`, "engineer", question.prompt);
    if (done) {
      push("lead", "engineer", content.reply.reportLead);
      messages.push({
        key: "report",
        side: "engineer",
        lines: 1,
        wide: true,
        body: (
          <Report
            content={content}
            caseCount={count}
            talk={talk}
            answers={answers}
            pool={pool}
            gate={gate}
            onUnlock={unlock}
          />
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
  const reportVisible = done && visibleCount >= total;

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
    if (done) return;
    const el = threadRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [visibleCount, typing, settled, reduced, done]);
  // After a quick reply, move focus to the next question's first reply.
  useEffect(() => {
    if (!settled || !focusNext.current || !question) return;
    focusNext.current = false;
    repliesRef.current
      ?.querySelector<HTMLButtonElement>("button")
      ?.focus({ preventScroll: true });
  }, [settled, question]);
  const navClearance = () =>
    window.matchMedia("(min-width: 768px)").matches ? 120 : 88;
  // During the questions, scroll the page only by as much as the window's
  // bottom sits below the fold, never lifting its top under the nav.
  useEffect(() => {
    if (!talk || done) return;
    const el = windowRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const by = Math.min(
      r.bottom - (window.innerHeight - 24),
      r.top - navClearance(),
    );
    if (by > 8)
      window.scrollBy({ top: by, behavior: reduced ? "auto" : "smooth" });
  }, [visibleCount, talk, reduced, done]);
  // When the report arrives, bring the engineer's lead line and the
  // report's top under the nav, once.
  useEffect(() => {
    if (!reportVisible || reportSeen.current) return;
    reportSeen.current = true;
    const el = reportRef.current?.previousElementSibling ?? reportRef.current;
    if (!el) return;
    const by = el.getBoundingClientRect().top - navClearance();
    if (Math.abs(by) > 8)
      window.scrollBy({ top: by, behavior: reduced ? "auto" : "smooth" });
  }, [reportVisible, reduced]);

  const visible = messages.slice(0, visibleCount);
  return (
    <section
      ref={windowRef}
      aria-label={content.window.label}
      style={growFrom === null ? undefined : { height: `${growFrom}px` }}
      data-hero-job-reply={talk?.path}
      onPointerEnter={loadPool}
      onFocusCapture={loadPool}
      class={`mx-auto flex w-full max-w-[760px] flex-col rounded-[24px] border border-(--color-border) bg-card text-left ${WINDOW_GROWTH} ${!talk ? WINDOW_COMPACT : done ? WINDOW_REPORT : WINDOW_OPEN}`}
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
          <span class="font-sans text-[13px] leading-[18px] text-(--color-cream-700)">
            {content.window.status}
          </span>
        </span>
        {talk && (
          <button
            type="button"
            onClick={reset}
            data-hero-job-restart
            class={TEXT_LINK}
          >
            {content.startOverLabel}
          </button>
        )}
      </header>
      <div
        ref={threadRef}
        class={`flex min-h-0 flex-1 flex-col px-3 py-4 md:px-5 ${done ? "" : "overflow-y-auto overscroll-contain"}`}
      >
        <ol
          aria-live="polite"
          class="mt-auto flex flex-col font-sans text-[15px] leading-[22px] md:text-[16px] md:leading-[24px]"
        >
          {visible.map((m, i) => {
            const grouped = visible[i - 1]?.side === m.side;
            const lastOfGroup =
              visible[i + 1]?.side !== m.side || !!visible[i + 1]?.wide;
            const mine = m.side === "visitor";
            const gap = grouped
              ? m.wide
                ? "mt-3"
                : "mt-[3px]"
              : i
                ? "mt-3"
                : "";
            const corner = lastOfGroup
              ? mine
                ? "rounded-br-[4px]"
                : "rounded-bl-[4px]"
              : "";
            return (
              <li
                key={m.key}
                ref={m.wide ? reportRef : undefined}
                class={`${ENTER} flex ${mine ? "justify-end" : "justify-start"} ${gap}`}
              >
                <span class="sr-only">
                  {mine
                    ? content.reply.visitorPrefix
                    : content.reply.engineerPrefix}{" "}
                </span>
                {m.wide ? (
                  m.body
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
      {!done && (
        <div class="border-t border-(--color-border) p-3 md:px-4">
          {!talk && (
            <div
              data-hero-job-options="paths"
              class="mb-3 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2"
            >
              {content.pathOrder.map((path) => (
                <a
                  key={path}
                  href={heroJobSignupHref(content.signupHref, path, {
                    questions: content.paths[path].questions,
                  })}
                  data-hero-job-path={path}
                  onClick={(e) => {
                    e.preventDefault();
                    pickPath(path);
                  }}
                  class={PATH_CHIP}
                >
                  {content.paths[path].label}
                </a>
              ))}
            </div>
          )}
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
                class={`${QUICK_REPLY} border-dashed text-(--color-cream-800)`}
              >
                {content.reply.skipLabel}
              </button>
            </div>
          )}
          <form
            ref={formRef}
            action={content.signupHref}
            method="get"
            onSubmit={(e) => {
              e.preventDefault();
              describe(value);
            }}
            class="rounded-[20px] border border-(--color-border) bg-card transition-colors duration-200 ease-out focus-within:border-(--color-sage-500)"
          >
            <textarea
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
              onInput={(e) => setValue((e.target as HTMLTextAreaElement).value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter" || e.shiftKey || e.isComposing) return;
                e.preventDefault();
                formRef.current?.requestSubmit();
              }}
              class="block w-full resize-none bg-transparent px-4 pt-3 pb-1 font-sans text-[16px] leading-[24px] text-foreground placeholder:text-(--color-cream-700) focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            />
            <div class="flex items-center gap-3 px-2 pb-2">
              <span class="ml-auto hidden items-center gap-1 font-sans text-[13px] leading-[18px] text-(--color-cream-700) sm:inline-flex">
                <kbd class="font-sans">{content.sendKey}</kbd>
                {content.sendHint}
              </span>
              <button
                type="submit"
                aria-label={content.submitLabel}
                disabled={!!talk}
                class="ml-auto inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-(--color-cream-900) text-(--color-cream-50) transition-colors duration-200 ease-out hover:bg-(--color-sage-800) focus-visible:ring-2 focus-visible:ring-(--color-sage-800) focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 sm:ml-0 md:size-9"
              >
                <Icon d="M12 19V5M6 11l6-6 6 6" class="size-[18px]" />
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
