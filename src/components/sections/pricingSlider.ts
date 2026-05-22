/**
 * View model for the Scale-card executions slider.
 *
 * Both the server-rendered markup and the client script need the slider's
 * display strings. Precomputing them here once — and shipping them to the
 * browser as JSON (`data-tiers`) — keeps the client script a pure
 * index-and-assign with no formatting logic of its own, so the SSR output
 * and the client updates can never drift.
 */
import type { PricingSlider } from "../../lib/marketingPageTypes";

/** A slider stop with every display string the UI needs precomputed. */
export interface SliderTierView {
  /** Headline price, e.g. "$999". */
  price: string;
  /** Readout sentence, e.g. "2,000 executions · 3 projects · 5 snapshots". */
  readout: string;
  /** Screen-reader value, e.g. "2,000 executions, $999 per month". */
  valueText: string;
  /** Filled-track width as a CSS percentage, e.g. "50%". */
  fill: string;
}

/** Pluralize a count + noun: "1 project" / "3 projects". */
const pluralize = (count: string, noun: string) =>
  `${count} ${noun}${count === "1" ? "" : "s"}`;

/** Precompute the display strings for every stop on a slider. */
export const buildSliderView = (slider: PricingSlider): SliderTierView[] =>
  slider.tiers.map((tier, i) => ({
    price: tier.price,
    readout: `${tier.executions} executions · ${pluralize(tier.projects, "project")} · ${pluralize(tier.snapshots, "snapshot")}`,
    valueText: `${tier.executions} executions, ${tier.price} per month`,
    fill: `${(i / (slider.tiers.length - 1)) * 100}%`,
  }));
