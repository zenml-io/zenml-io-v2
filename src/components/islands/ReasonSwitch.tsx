/**
 * ReasonSwitch — Preact island for the homepage's "Why are you looking at
 * other models?" section. A tab per reason re-routes one agent run, drawn as
 * a transit map: model lanes run left to right, the run's steps are stations
 * across the top, and one line threads each station into the lane of the
 * model it would run on. Switching reason slides the stations between lanes
 * and the line follows. A step whose answer differs gets a halo for review,
 * and a ruled-out lab sits on its own struck lane, compared but never chosen.
 *
 * From `lg` the map is an SVG; below it a re-authored vertical variant lists
 * the steps, each with a small lane track, instead of shrinking the drawing.
 *
 * Server-rendered with `defaultReason` selected, so the section reads
 * completely without JS. Tabs follow the WAI-ARIA tabs pattern: arrow keys,
 * Home and End move between reasons, and selection follows focus.
 */
import { useRef, useState } from "preact/hooks";
import {
  type ReasonSwitchContent,
  ROUTE_MODEL_LABELS,
  type RouteModel,
} from "../../lib/labs-home";

export interface ReasonSwitchProps {
  content: ReasonSwitchContent;
}

/** Lanes top to bottom; the ruled-out lane is drawn after these. */
const LANES: readonly RouteModel[] = [
  "stronger",
  "today",
  "replacement",
  "faster",
  "cheaper",
  "open",
  "local",
];
const RULED_OUT_LABEL = "Ruled-out lab";

/* Map geometry, in SVG user units (the SVG scales to the container). */
const WIDTH = 1200;
const LABEL_W = 210;
const TOP = 72;
const LANE_H = 46;
const RIGHT_PAD = 40;
const HEIGHT = TOP + (LANES.length + 1) * LANE_H + 24;

const laneY = (index: number) => TOP + index * LANE_H + LANE_H / 2;

const TAB_BASE =
  "cursor-pointer whitespace-nowrap rounded-full border px-4 py-2.5 font-label text-[13px] leading-5 uppercase tracking-[0.05em] transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-sage-800)";
const TAB_ON =
  "border-(--color-sage-800) bg-(--color-sage-800) text-(--color-cream-50)";
const TAB_OFF =
  "border-(--color-border) bg-card text-(--color-cream-900) hover:bg-(--color-sage-200)";

/** A smooth line through the stations, flat through each one like a metro map. */
function routePath(points: readonly { x: number; y: number }[]): string {
  const [first, ...rest] = points;
  const start = { x: LABEL_W + 8, y: first.y };
  const end = { x: WIDTH - RIGHT_PAD + 16, y: points[points.length - 1].y };
  const all = [start, first, ...rest, end];
  let d = `M ${start.x} ${start.y}`;
  for (let i = 1; i < all.length; i++) {
    const a = all[i - 1];
    const b = all[i];
    const mid = (a.x + b.x) / 2;
    d += ` C ${mid} ${a.y}, ${mid} ${b.y}, ${b.x} ${b.y}`;
  }
  return d;
}

export default function ReasonSwitch({ content }: ReasonSwitchProps) {
  const [active, setActive] = useState(content.defaultReason);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reason = content.reasons[active];
  const panelId = "reason-switch-panel";
  const columnW = (WIDTH - LABEL_W - RIGHT_PAD) / content.steps.length;
  const stationX = (i: number) => LABEL_W + columnW * (i + 0.5);
  const stations = reason.routes.map((model, i) => ({
    x: stationX(i),
    y: laneY(LANES.indexOf(model)),
  }));
  const ruledOutY = laneY(LANES.length);
  const usedLanes = new Set(reason.routes);

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

  const d = routePath(stations);

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
        {/* The map, from lg. Hidden from assistive tech: the list below it
            carries the same routing as text at every width. */}
        <svg
          class="reason-map hidden w-full lg:block"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          aria-hidden="true"
        >
          {LANES.map((lane, i) => (
            <g key={lane}>
              <line
                x1={LABEL_W}
                x2={WIDTH - RIGHT_PAD}
                y1={laneY(i)}
                y2={laneY(i)}
                class={
                  lane === "today"
                    ? "stroke-(--color-sage-400)"
                    : "stroke-(--color-border)"
                }
                stroke-width={lane === "today" ? 2 : 1}
              />
              <text
                x={0}
                y={laneY(i) + 6}
                class={`font-sans text-[17px] ${usedLanes.has(lane) ? "fill-(--color-cream-900)" : "fill-(--color-cream-600)"}`}
                font-weight={lane === "today" ? 600 : 400}
              >
                {ROUTE_MODEL_LABELS[lane]}
              </text>
            </g>
          ))}
          <line
            x1={LABEL_W}
            x2={WIDTH - RIGHT_PAD}
            y1={ruledOutY}
            y2={ruledOutY}
            class="stroke-(--color-cream-400)"
            stroke-dasharray="4 6"
          />
          <text
            x={0}
            y={ruledOutY + 6}
            class="fill-(--color-cream-600) font-sans text-[17px]"
            text-decoration="line-through"
          >
            {RULED_OUT_LABEL}
          </text>

          {content.steps.map((step, i) => (
            <g key={step}>
              <line
                x1={stationX(i)}
                x2={stationX(i)}
                y1={TOP - 14}
                y2={HEIGHT - 20}
                class="stroke-(--color-sage-200)"
              />
              <text
                x={stationX(i)}
                y={TOP - 30}
                text-anchor="middle"
                class="fill-(--color-sage-800) font-label text-[14px] uppercase tracking-[0.05em]"
              >
                {step}
              </text>
            </g>
          ))}

          <path
            d={d}
            style={{ d: `path("${d}")` }}
            class="reason-route stroke-(--color-sage-800)"
            fill="none"
            stroke-width={6}
            stroke-linecap="round"
          />

          {reason.excluded && (
            <g
              class="reason-ghost"
              transform={`translate(${stationX(1)} ${ruledOutY})`}
            >
              <circle
                r={11}
                class="fill-(--color-cream-50) stroke-(--color-cream-500)"
                stroke-width={2}
                stroke-dasharray="3 3"
              />
              <path
                d="M -5 -5 L 5 5 M 5 -5 L -5 5"
                class="stroke-(--color-cream-600)"
                stroke-width={2}
                stroke-linecap="round"
              />
              <text
                x={20}
                y={6}
                class="fill-(--color-cream-700) font-sans text-[15px]"
              >
                compared, never recommended
              </text>
            </g>
          )}

          {stations.map((point, i) => {
            const moved = reason.routes[i] !== "today";
            const review = reason.reviewStep === i;
            return (
              <g
                key={content.steps[i]}
                class="reason-station"
                style={{ transform: `translate(${point.x}px, ${point.y}px)` }}
              >
                {review && (
                  <circle
                    r={26}
                    class="reason-halo stroke-(--color-cream-700)"
                    fill="none"
                    stroke-width={2}
                    stroke-dasharray="4 4"
                  />
                )}
                <circle
                  r={12}
                  class={
                    moved
                      ? "fill-(--color-sage-800) stroke-(--color-cream-50)"
                      : "fill-(--color-cream-50) stroke-(--color-sage-800)"
                  }
                  stroke-width={4}
                />
                {review && (
                  <g class="reason-halo" transform="translate(0 -62)">
                    <rect
                      x={-128}
                      y={-17}
                      width={256}
                      height={34}
                      rx={17}
                      class="fill-(--color-cream-50) stroke-(--color-cream-400)"
                    />
                    <text
                      y={6}
                      text-anchor="middle"
                      class="fill-(--color-cream-900) font-sans text-[15px]"
                    >
                      Answers differently: you review
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* The routing as text: the visible narrow variant below lg, and the
            accessible description of the map at every width. */}
        <ol class="flex flex-col lg:sr-only">
          {content.steps.map((step, i) => {
            const model = reason.routes[i];
            const moved = model !== "today";
            const review = reason.reviewStep === i;
            return (
              <li
                key={`${reason.id}-${step}`}
                class="reason-row flex items-start gap-4 border-t border-(--color-border) py-4"
              >
                <span
                  aria-hidden="true"
                  class={`mt-1.5 size-3 shrink-0 rounded-full border-2 border-(--color-sage-800) ${moved ? "bg-(--color-sage-800)" : "bg-(--color-cream-50)"}`}
                />
                <div class="flex min-w-0 flex-1 flex-col gap-1.5">
                  <span class="font-display text-[20px] leading-[26px] text-(--color-cream-900)">
                    {step}
                  </span>
                  <span class="font-sans text-[15px] leading-[22px] text-(--color-cream-700)">
                    {moved ? (
                      <>
                        <span class="line-through decoration-(--color-cream-500)">
                          {ROUTE_MODEL_LABELS.today}
                        </span>{" "}
                        <span aria-hidden="true">→</span>
                        <span class="sr-only">moves to</span>{" "}
                        <span class="font-medium text-(--color-cream-900)">
                          {ROUTE_MODEL_LABELS[model]}
                        </span>
                      </>
                    ) : (
                      <span>Stays on today's model</span>
                    )}
                  </span>
                  {review && (
                    <span class="w-fit rounded-full border border-(--color-cream-400) bg-(--color-cream-50) px-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)">
                      Answers differently: you review
                    </span>
                  )}
                  <span aria-hidden="true" class="mt-1 flex items-center gap-1">
                    {LANES.map((lane) => (
                      <span
                        key={lane}
                        class={`size-1.5 rounded-full ${lane === model ? "bg-(--color-sage-800)" : "bg-(--color-sage-200)"}`}
                      />
                    ))}
                  </span>
                </div>
              </li>
            );
          })}
          {reason.excluded && (
            <li class="border-t border-dashed border-(--color-cream-400) py-4 font-sans text-[15px] leading-[22px] text-(--color-cream-700)">
              <span class="line-through decoration-(--color-cream-500)">
                {reason.excluded}
              </span>{" "}
              compared, never recommended
            </li>
          )}
        </ol>

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
