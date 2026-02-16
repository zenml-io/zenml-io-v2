# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A **Remotion** (React → video) project that produces a 3-minute demo video for the ZenML website migration hackathon. The video composites pre-recorded webcam clips of Alex narrating over B-roll screen recordings of the migrated site, with animated text overlays and transitions.

Output: 1920×1080 H.264 MP4 at 30fps, ~182 seconds (5,468 frames).

## Commands

All commands run from `demo-video/` directory:

```bash
# Preview in Remotion Studio (live reload, scrubbing, frame inspection)
npm run dev                 # → npx remotion studio

# Render final MP4 (takes ~2-5 min depending on concurrency)
npm run render              # → out/zenml-hackathon-demo.mp4

# Render with explicit concurrency (recommended: 4 for this project)
npx remotion render src/index.ts ZenMLHackathonDemo out/demo.mp4 \
  --codec h264 --crf 18 --concurrency 4

# Export a single frame as PNG
npm run still               # → out/preview.png

# Record B-roll clips via Playwright (requires Chromium + ffmpeg)
npx tsx scripts/record-broll.ts

# Reshoot a single B-roll clip
npx tsx scripts/reshoot-blog-post.ts

# Generate thumbnail PNG from HTML template
npx tsx scripts/screenshot-thumbnail.ts
```

No test suite exists. Validation is visual — use `npm run dev` (Remotion Studio) to scrub through the timeline.

## Architecture

### Data Flow: Three-File Separation

| File | Controls | Change safely without touching the others |
|------|----------|------------------------------------------|
| `src/lib/timing.ts` | Frame counts, section boundaries, clip paths, playback rate | Yes — adjust durations |
| `src/lib/copy.ts` | All on-screen text, B-roll file assignments | Yes — change words |
| `src/lib/anim.ts` | Pure animation functions (fade, slide, spring, countUp) | Yes — tune motion |

### Composition Structure

```
Root.tsx → registers single Composition ("ZenMLHackathonDemo")
  └── ZenMLHackathonDemo.tsx → <Series> of 6 sequential sections:
        ├── V2S01Hook        (588 frames)  — full-screen Alex + number flashes
        ├── V2S02Why         (930 frames)  — headline + 4 icon cards + PiP Alex
        ├── V2S03Learning ×3 (1030+1080+790) — B-roll background + PiP + headline
        │   (reused with different props for planning/multimodal/verification)
        └── V2S04ResultsClose (1050 frames) — metrics → PiP-to-fullscreen transition
```

### Key Components

- **SceneShell** — wraps every scene with consistent 15-frame fade-in/fade-out + slide-up entrance. All scenes use this.
- **PiPVideo** — circular picture-in-picture webcam overlay (280px default, purple border, scale-up entrance). Positioned absolutely, uses `OffthreadVideo` with the global `PLAYBACK_RATE` (1.10×).
- **V2S03Learning** — the reusable "learning section" used 3 times. Accepts B-roll sources (primary + crossfade secondary), PiP clip, tag text, and headline. Handles dual-clip crossfade internally.

### V1 vs V2 Scenes

Files prefixed `Scene0X` are **v1** (text-only motion graphics, kept for reference). Files prefixed `V2SXX` are **v2** (current, narrator-driven). Only V2 scenes are wired into the composition.

## Remotion Gotchas (Critical)

### 1. OffthreadVideo plays from mount, not from visibility

If you hide a video with `opacity: 0` and reveal it later, it has already been playing. You'll see it mid-way through. **Always use `<Sequence from={X}>` to delay mounting** — this delays both mounting and playback.

### 2. Remotion renders frames out of order

Frames render in parallel across workers. Frame 400 may render before frame 399. **Never use conditional mounting based on frame number** like `{frame >= X && <OffthreadVideo>}` — this creates an unstable component tree. Use `<Sequence from={X}>` instead.

### 3. Use H.264 (MP4), not VP8/VP9 (WebM) for source clips

WebM B-roll causes render timeouts on macOS because VP8/VP9 uses software decoding. With 12 concurrent video streams, the decode pipeline chokes. **All clips in `public/clips/` must be MP4 (H.264)** for hardware-accelerated decoding via VideoToolbox.

### 4. clipStart: 0 for the first scene

Setting `clipStart > 0` on the hook scene creates visible blank frames at the start of the video. The hook scene must start at frame 0.

### 5. Card/element stagger must match narration pace

When elements appear staggered (e.g., V2S02Why's 4 cards), the interval must match the narrator's pace in the webcam clip. Too fast = overwhelming wall of cards. The timing values in the scene files were tuned to Alex's actual speech cadence.

## Asset Conventions

- **Webcam clips**: `public/clips/alex-{01..06}-{section}.mp4` — recorded by Alex, pre-trimmed via ffmpeg
- **B-roll clips**: `public/clips/{01..05}-{page-name}.mp4` — Playwright-recorded site scrolls, converted from WebM to MP4
- **Static images**: `public/images/` (just `zenml-logo.svg`)
- **Audio**: `public/audio/bgm.mp3` (background music, currently unused in v2)
- **Screenshots**: `public/screens/` (v1 static screenshots, unused in v2)

All video/audio files are gitignored (`.mp4`, `.mov`, `.webm`, `.mp3`, `.wav`). The `public/screens/` directory is also gitignored.

## Playback Speed

All Alex webcam clips play at `PLAYBACK_RATE = 1.10` (10% speedup) to fit the 3-minute hackathon limit. This is applied globally via `PiPVideo` and individual `OffthreadVideo` components. The `clipDur` values in `timing.ts` account for this speedup: `clipDur = Math.ceil(rawDuration / 1.10 * 30)`.

## B-roll Recording

The Playwright scripts in `scripts/` automate screen recording against `https://zenml-io-v2.pages.dev`. Each clip has tuned scroll speed and duration. The scripts dismiss the cookie consent banner before recording. Output is WebM → ffmpeg → MP4.

## Thumbnail

Defined as HTML (`templates/thumbnail.html`), screenshot to PNG via Playwright (`scripts/screenshot-thumbnail.ts`). The template references `alex-frame.jpg` and `zenml-logo.svg` via relative paths — assets must exist in `out/` when the script runs (it copies the template there first).
