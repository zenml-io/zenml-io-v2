/**
 * Split — two-lane prose/media layout primitive. Preact twin of
 * `Split.astro`; islands cannot import .astro components. Keep the two
 * emitting identical markup/classes.
 *
 * `children` is prose, `media` is the media lane. `children` is ALWAYS
 * rendered first regardless of `mediaSide` — the visual side is flipped
 * with CSS `order`, never `direction: rtl`. An absent `media` prop
 * collapses to a single centred column at full width.
 */
import type { ComponentChildren } from "preact";
import type { Breakpoint, SpaceStep } from "../../../lib/section";
import {
  GAP,
  ORDER_1_AT,
  ORDER_2_AT,
  RATIO_COLS_AT,
  type SplitRatio,
} from "./classMaps";

type MediaSide = "left" | "right";
type AlignY = "top" | "center";

interface Props {
  mediaSide?: MediaSide;
  ratio?: SplitRatio;
  space?: SpaceStep;
  collapseBelow?: Breakpoint;
  mediaFirstWhenStacked?: boolean;
  alignY?: AlignY;
  class?: string;
  children?: ComponentChildren;
  media?: ComponentChildren;
}

const ALIGN_Y_CLASS: Record<AlignY, string> = {
  top: "items-start",
  center: "items-center",
};

export default function Split({
  mediaSide = "right",
  ratio = "1/2",
  space = "lg",
  collapseBelow = "lg",
  mediaFirstWhenStacked = false,
  alignY = "center",
  class: className,
  children,
  media,
}: Props) {
  const hasMedia = Boolean(media);

  const proseOrder = [
    mediaFirstWhenStacked ? "order-2" : "",
    mediaSide === "left"
      ? ORDER_2_AT[collapseBelow]
      : ORDER_1_AT[collapseBelow],
  ]
    .filter(Boolean)
    .join(" ");

  const mediaOrder = [
    mediaFirstWhenStacked ? "order-1" : "",
    mediaSide === "left"
      ? ORDER_1_AT[collapseBelow]
      : ORDER_2_AT[collapseBelow],
  ]
    .filter(Boolean)
    .join(" ");

  const containerClasses = [
    "grid grid-cols-1",
    hasMedia ? RATIO_COLS_AT[collapseBelow][ratio] : "",
    GAP[space],
    hasMedia ? ALIGN_Y_CLASS[alignY] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div class={containerClasses}>
      {hasMedia ? (
        <>
          <div class={proseOrder}>{children}</div>
          <div class={mediaOrder}>{media}</div>
        </>
      ) : (
        children
      )}
    </div>
  );
}
