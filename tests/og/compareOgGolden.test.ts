import { describe, expect, it } from "vitest";
import { CHANNEL_DELTA, changedPixelPct } from "../../scripts/check-og-golden";

describe("changedPixelPct", () => {
  const rgb = (...px: number[][]) => ({
    data: Buffer.from(px.flat()),
    channels: 3,
  });

  it("ignores per-channel drift at or below the tolerance", () => {
    const a = rgb([10, 10, 10], [200, 200, 200]);
    const b = rgb(
      [10 + CHANNEL_DELTA, 10, 10],
      [200, 200 - CHANNEL_DELTA, 200],
    );
    expect(changedPixelPct(a, b)).toBe(0);
  });

  it("counts a pixel once however many channels moved", () => {
    const a = rgb([0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]);
    const b = rgb([255, 255, 255], [0, 0, 0], [0, 0, 0], [0, 0, 0]);
    expect(changedPixelPct(a, b)).toBe(25);
  });
});
