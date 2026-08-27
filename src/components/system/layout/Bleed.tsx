/**
 * Bleed — breaks a child out of the horizontal inset it would otherwise
 * inherit. Preact twin of `Bleed.astro`; islands cannot import .astro
 * components. Keep the two emitting identical markup/classes.
 */
import type { ComponentChildren } from "preact";
import type { Breakpoint } from "../../../lib/section";
import { BLEED_RESET_AT } from "./classMaps";

type BleedTo = "container" | "viewport";

interface Props {
  to?: BleedTo;
  below?: Breakpoint;
  class?: string;
  children?: ComponentChildren;
}

const BLEED_CLASS: Record<BleedTo, string> = {
  viewport: "w-[100vw] ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]",
  container:
    "ml-[calc(-1*var(--spacing-gutter))] mr-[calc(-1*var(--spacing-gutter))]",
};

export default function Bleed({
  to = "viewport",
  below,
  class: className,
  children,
}: Props) {
  const classes = [
    BLEED_CLASS[to],
    below ? BLEED_RESET_AT[below] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div class={classes}>{children}</div>;
}
