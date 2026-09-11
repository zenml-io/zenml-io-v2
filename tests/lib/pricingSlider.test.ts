import { describe, expect, it } from "vitest";
import { buildSliderView } from "../../src/components/sections/pricingSlider";
import { PRICING_PLANS } from "../../src/lib/pricing";

/**
 * Pins the Scale card's executions slider: the three published stops, the
 * price each one shows, the readout sentence and the screen-reader value.
 * These are copy-critical pricing facts — a restyle of the card must not move
 * them. The strings are asserted verbatim on purpose.
 */
describe("pricing executions slider", () => {
  const scale = PRICING_PLANS.find((plan) => plan.slider);
  if (!scale?.slider) throw new Error("no plan carries the slider");
  const slider = scale.slider;

  it("the Scale plan carries the slider with three stops, defaulting to the middle one", () => {
    expect(scale?.id).toBe("scale");
    expect(scale?.slider?.tiers).toHaveLength(3);
    expect(scale?.slider?.defaultIndex).toBe(1);
    expect(scale?.slider?.caption).toBe("Monthly executions, per workspace");
  });

  it("maps 500 / 2,000 / 5,000 executions to $399 / $999 / $2,499", () => {
    const view = buildSliderView(slider);
    expect(view.map((tier) => tier.price)).toEqual(["$399", "$999", "$2,499"]);
    expect(view.map((tier) => tier.readout)).toEqual([
      "500 executions · 1 project · 1 snapshot",
      "2,000 executions · 3 projects · 5 snapshots",
      "5,000 executions · 10 projects · 20 snapshots",
    ]);
    expect(view.map((tier) => tier.valueText)).toEqual([
      "500 executions, $399 per month",
      "2,000 executions, $999 per month",
      "5,000 executions, $2,499 per month",
    ]);
    expect(view.map((tier) => tier.fill)).toEqual(["0%", "50%", "100%"]);
  });

  it("the headline price on the card is the default stop's price", () => {
    const view = buildSliderView(slider);
    expect(scale?.price).toBe(view[slider.defaultIndex].price);
  });

  it("pluralises singular counts", () => {
    const view = buildSliderView({
      caption: "Monthly executions",
      defaultIndex: 0,
      tiers: [{ executions: "1", price: "$1", projects: "1", snapshots: "1" }],
    });
    expect(view[0].readout).toBe("1 executions · 1 project · 1 snapshot");
  });
});
