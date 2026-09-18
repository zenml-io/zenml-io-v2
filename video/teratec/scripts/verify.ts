import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { eventChapters, EVENT_FRAMES, semanticBeats } from "../src/eventTimeline";
import { script } from "../src/script";
import { customerLogos, brandAssets } from "../src/assets";
assert.equal(
  script.scenes.reduce((n, s) => n + s.durationInFrames, 0),
  script.meta.totalFrames,
);
assert.equal(script.meta.fps, 30);
assert.equal(script.meta.totalFrames, 4500);
assert.equal(
  new Set(script.scenes.map((s) => s.id)).size,
  script.scenes.length,
);
function timings(value: unknown, duration: number): void {
  if (!value || typeof value !== "object") return;
  for (const [key, item] of Object.entries(value)) {
    if (key === "atFrame") {
      assert.equal(typeof item, "number");
      assert.ok(
        item >= 0 && item < duration - 105,
        `Insufficient reading hold: ${item}/${duration}`,
      );
    } else if (typeof item === "object") timings(item, duration);
  }
}
for (const scene of script.scenes) timings(scene, scene.durationInFrames);
for (const file of [
  ...Object.values(customerLogos),
  ...Object.values(brandAssets),
])
  assert.ok(existsSync(`public/${file}`), `Missing asset ${file}`);
assert.equal(script.scenes[0].kind, "logo");
assert.equal(script.scenes.at(-1)?.kind, "cta");
console.log(
  `${script.scenes.length} scenes; ${script.meta.totalFrames} frames; ${script.meta.totalFrames/script.meta.fps} seconds; assets and reading holds verified.`,
);

assert.equal(EVENT_FRAMES, 4500);
assert.equal(eventChapters[0].id, "opening");
assert.equal(eventChapters.at(-1)?.id, "closing");
console.log("Event rebuild: 10 chapters / 4500 frames / 150 seconds.");

for (const chapter of eventChapters) {
  const beats = semanticBeats[chapter.id];
  assert.equal(beats[0], 0);
  assert.equal(beats.at(-1), chapter.seconds * 30);
  for (let i = 1; i < beats.length; i++) assert.ok(beats[i] - beats[i-1] <= 210, `${chapter.id}: excessive interval between semantic beats`);
}
