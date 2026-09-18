import { bundle } from "@remotion/bundler";
import { selectComposition, renderStill } from "@remotion/renderer";
import { mkdir } from "node:fs/promises";
import { script } from "../src/script";
await mkdir("out/stills", { recursive: true });
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
const composition = await selectComposition({
  serveUrl,
  id: "TeratecInstitutional",
});
let start = 0;
for (const scene of script.scenes) {
  await renderStill({
    serveUrl,
    chromiumOptions: { gl: "angle" },
    composition,
    output: `out/stills/${scene.id}.png`,
    frame: start + scene.durationInFrames - 90,
  });
  console.log(scene.id);
  start += scene.durationInFrames;
}
for (const frame of [0, script.meta.totalFrames - 1])
  await renderStill({
    serveUrl,
    chromiumOptions: { gl: "angle" },
    composition,
    output: `out/stills/loop-${frame}.png`,
    frame,
  });
