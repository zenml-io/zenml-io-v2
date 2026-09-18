import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
const file = process.argv[2] ?? "out/ZenML_Teratec2026_Institutional_EN_v16.mp4";
const media = JSON.parse(
  execFileSync(
    "ffprobe",
    ["-v", "error", "-show_streams", "-show_format", "-of", "json", file],
    { encoding: "utf8" },
  ),
);
const video = media.streams.find((s) => s.codec_type === "video");
const audio = media.streams.find((s) => s.codec_type === "audio");
assert.ok(video && audio, "Both picture and silent audio must be present");
for (const [key, value] of Object.entries({
  codec_name: "h264",
  profile: "High",
  width: 1920,
  height: 1080,
  pix_fmt: "yuv420p",
  r_frame_rate: "30/1",
  nb_frames: "4500",
  color_range: "tv",
  color_space: "bt709",
  color_transfer: "bt709",
  color_primaries: "bt709",
}))
  assert.equal(video[key], value, key);
assert.equal(audio.codec_name, "aac");
assert.equal(audio.channels, 2);
assert.equal(audio.sample_rate, "48000");
assert.equal(Number(media.format.duration), 150);
import { spawnSync } from "node:child_process";
const result = spawnSync(
  "ffmpeg",
  ["-hide_banner", "-i", file, "-vn", "-af", "astats", "-f", "null", "-"],
  { encoding: "utf8" },
);
assert.equal(result.status, 0);
const peaks = [...result.stderr.matchAll(/Peak level dB: ([^\n]+)/g)].map(
  (match) => match[1].trim(),
);
assert.ok(peaks.length >= 2);
assert.ok(
  peaks.every((peak) => peak === "-inf"),
  "Audio must be digitally silent",
);
console.log(
  "PASS: 1080p / 30 fps / 4500 frames / 150 s / H.264 High / yuv420p / Rec.709 / stereo silent AAC.",
);

// The top strip is clear of foreground copy in the first two scenes. Check the
// actual encoded pixels so a static WebGL fallback or a timing freeze fails.
const pixels = execFileSync("ffmpeg", [
  "-v", "error", "-i", file, "-t", "12", "-vf",
  "fps=1,crop=1920:180:0:0,scale=160:15,format=gray",
  "-f", "rawvideo", "-",
]);
const frameBytes = 160 * 15;
assert.equal(pixels.length, frameBytes * 12);
// Compare three-second spans: subtle drift need not change every quantized pixel
// each second. Stay within each scene so transitions cannot pass this check.
for (const second of [3, 4, 5, 9, 10, 11]) {
  let delta = 0;
  for (let pixel = 0; pixel < frameBytes; pixel++) {
    delta += Math.abs(pixels[second * frameBytes + pixel] - pixels[(second - 3) * frameBytes + pixel]);
  }
  assert.ok(delta / frameBytes > 0.1, `Shader background froze at second ${second}`);
}
console.log("PASS: encoded shader motion continues through reading holds.");
