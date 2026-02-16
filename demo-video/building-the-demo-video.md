# Building the Demo Video with Claude Code + Remotion

How the ZenML website migration hackathon demo video was built entirely with
Claude Code (Opus 4.6) — from scripting to rendering — in a single day.

## Context

This is a 3-minute demo video for the [Claude Code Hackathon](https://claude.ai/hackathon)
(Feb 10–16, 2026). The video showcases the migration of [zenml.io](https://zenml.io)
from Webflow to a self-hosted Astro static site: 2,224 pages, 20 content
collections, ~5 days of work, powered by Claude Code + Opus 4.6.

The video itself was built using Claude Code — an example of the tool
demonstrating its own capabilities.

## Architecture

```
demo-video/
├── src/
│   ├── index.ts                    # Remotion entry point
│   ├── Root.tsx                    # Composition registration
│   ├── compositions/
│   │   └── ZenMLHackathonDemo.tsx  # Main composition (6 sections via Series)
│   ├── scenes/
│   │   ├── V2S01Hook.tsx           # Full-screen Alex + number flashes
│   │   ├── V2S02Why.tsx            # Problem cards + PiP Alex
│   │   ├── V2S03Learning.tsx       # B-roll background + PiP + headline (×3)
│   │   ├── V2S04ResultsClose.tsx   # Metrics → full-screen Alex + links
│   │   ├── Scene01Hook.tsx         # [v1] Text-only hook (kept for reference)
│   │   ├── Scene02Problem.tsx      # [v1] Problem scene
│   │   ├── Scene03Pipeline.tsx     # [v1] Pipeline phases
│   │   ├── Scene04Walkthrough.tsx  # [v1] Site walkthrough
│   │   ├── Scene05OpusDeepDive.tsx # [v1] Opus moments carousel
│   │   ├── Scene06Numbers.tsx      # [v1] Counting stats
│   │   └── Scene07Outro.tsx        # [v1] Closing links
│   ├── components/
│   │   ├── SceneShell.tsx          # Fade in/out wrapper for all scenes
│   │   ├── PiPVideo.tsx            # Circular picture-in-picture overlay
│   │   └── icons/
│   │       └── PipelinePhaseIcons.tsx  # [v1] SVG icons for pipeline scene
│   └── lib/
│       ├── timing.ts              # All durations, clip paths, frame counts
│       ├── copy.ts                # All on-screen text + B-roll assignments
│       └── anim.ts                # Animation primitives (fade, slide, spring)
├── scripts/
│   ├── record-broll.ts            # Playwright B-roll recording automation
│   ├── reshoot-blog-post.ts       # Single-clip reshoot for blog post
│   └── screenshot-thumbnail.ts    # HTML → PNG thumbnail via Playwright
├── public/
│   ├── clips/                     # Alex webcam clips + B-roll recordings
│   │   ├── alex-01-hook.mp4       # 6 webcam clips (recorded by Alex)
│   │   ├── alex-02-why.mp4
│   │   ├── alex-03-planning.mp4
│   │   ├── alex-04-multimodal.mp4
│   │   ├── alex-05-verification.mp4
│   │   ├── alex-06-results-close.mp4
│   │   ├── 01-homepage-scroll.mp4 # 6 B-roll clips (Playwright-recorded)
│   │   ├── 02-blog-listing.mp4
│   │   ├── 03-llmops-database.mp4
│   │   ├── 03b-llmops-entry.mp4
│   │   ├── 04-blog-post.mp4
│   │   └── 05-case-study.mp4
│   ├── images/
│   │   └── zenml-logo.svg
│   ├── audio/
│   │   └── bgm.mp3               # Background music (low volume)
│   └── screens/                   # Static screenshots (v1, unused in v2)
├── out/                           # Rendered outputs (gitignored)
│   ├── demo-v11.mp4               # Final rendered video
│   ├── thumbnail.html             # HTML thumbnail source
│   ├── thumbnail.png              # Final 1280×720 thumbnail
│   └── ...                        # Previous versions (v3–v10)
├── package.json
├── tsconfig.json
└── .gitignore
```

## Evolution: v1 → v2

### v1: Pure Motion Graphics (demo-v1 through demo-v3)

The first version was a 7-scene text-only video:

1. **Hook** — ZenML logo + big numbers (2,224 pages, 20 collections, 1 week)
2. **Problem** — "Webflow is great until you outgrow it" with bullet cards
3. **Pipeline** — 6-phase migration pipeline with SVG icons on animated grid
4. **Walkthrough** — B-roll clips of the finished site
5. **Opus Deep Dive** — 5 "moments" carousel (planning, self-correction, etc.)
6. **Numbers** — Animated counting stats
7. **Outro** — Links + hackathon badge

This worked as a proof-of-concept but felt impersonal — no human voice, no
connection with the viewer. The scenes were too information-dense for a 3-minute
window.

### v2: Human Narrator + PiP (demo-v4 through demo-v11)

The reworked version puts Alex (the developer) front and center:

1. **Hook** (25s) — Full-screen Alex talking to camera, numbers flash on screen
   as he says them. "2,224 pages. 20 collections. About 5 days."
2. **Why It Matters** (27s) — 4 icon cards reveal one-by-one as Alex explains
   each pain point. PiP Alex in bottom-left corner.
3. **Learning: Planning** (29s) — LLMOps database B-roll fills background,
   crossfades to individual entry page. PiP Alex narrates.
4. **Learning: Multi-Modal** (29s) — Homepage B-roll crossfades to case study.
   PiP Alex narrates.
5. **Learning: Verification** (27s) — Blog post B-roll crossfades to blog
   listing. PiP Alex narrates.
6. **Results & Close** (44.5s) — 3 metric cards + PiP, then PiP transitions
   to full-screen Alex for the closing message + links.

Total: 5,445 frames at 30fps = 3 minutes 1.5 seconds.

## Key Components

### SceneShell — Consistent Transitions

Every scene wraps its content in `SceneShell`, which provides a consistent
fade-in (15 frames) and fade-out (15 frames) at the boundaries. This creates
smooth cross-scene transitions without needing Remotion's explicit transition
API.

```tsx
// The shell reads the current frame and applies enter/exit opacity
const opacity = sceneOpacity(frame, durationInFrames, TRANSITION_FRAMES);
```

### PiPVideo — Circular Picture-in-Picture

A reusable component that renders a circular webcam overlay with:
- Configurable size (280px default, 300px for close section)
- Purple border glow (`rgba(167, 139, 250, 0.6)`)
- Scale-up entrance animation (0.85 → 1.0)
- Drop shadow for depth against B-roll backgrounds

### V2S03Learning — Reusable B-roll + PiP Layout

The workhorse scene used 3 times (planning, multi-modal, verification). It
takes B-roll sources, PiP clip, and text as props — making the three middle
sections visually consistent while showing different content.

**Dual B-roll crossfade**: Each section shows two different website pages. The
first clip plays for 45% of the section, then crossfades (over 45 frames ≈ 1.5s)
into the second clip. This prevents any single page from getting stale.

**Critical timing fix**: The second B-roll clip is wrapped in a `<Sequence
from={crossfadeAt}>` rather than just using CSS opacity. This is because
Remotion's `OffthreadVideo` starts playing from the moment it's mounted — if
you just hide it with opacity and reveal it later, the video has already been
playing silently and you'd see it mid-scroll instead of from the top.

### V2S04ResultsClose — Two-Phase Scene

This scene has an internal transition:
- **Phase 1 (frames 0–720)**: 3 metric cards + PiP Alex narrating results
- **Phase 2 (frames 720+)**: PiP fades out, full-screen Alex fades in for the
  closing message. Links appear at the bottom.

The same Alex clip is used for both the PiP and full-screen views (the PiP
version is muted while the full-screen version carries the audio).

## Data Architecture

### Separation of Concerns

The codebase cleanly separates what's shown (copy), when it's shown (timing),
and how it moves (anim):

| File | Responsibility |
|------|---------------|
| `timing.ts` | Frame counts, section boundaries, clip paths, start offsets |
| `copy.ts` | All on-screen text, B-roll assignments |
| `anim.ts` | Pure animation functions (fadeIn, slideUp, spring, etc.) |

This separation meant iterating on text never touched animation logic, and
adjusting timing never broke the visual design.

### B-roll Assignment Map

Each of the 6 Playwright-recorded clips is used exactly once:

| Section | Primary B-roll | Crossfade B-roll |
|---------|---------------|-----------------|
| Planning | LLMOps database listing | LLMOps individual entry |
| Multi-Modal | Homepage scroll | Case study |
| Verification | Blog post | Blog listing |

## B-roll Recording Pipeline

### Playwright Automation (`scripts/record-broll.ts`)

Instead of manually screen-recording, Claude Code wrote a Playwright script
that records 6 website clips automatically:

1. Launches Chromium (non-headless, for video recording)
2. Sets viewport to 1920×1080 (native recording resolution)
3. Navigates to the page, waits for `networkidle`
4. Dismisses cookie consent banner ("Accept all" button)
5. Optionally waits extra time for async content (LLMOps spinner)
6. Lingers at top (configurable `waitBefore` seconds)
7. Smooth-scrolls at configurable speed (`scrollStep` px every `scrollInterval` ms)
8. Saves as WebM, converts to MP4 via ffmpeg (`libx264 -crf 18`)

Each clip has tuned parameters:

| Clip | Duration | Scroll Speed | Notes |
|------|----------|-------------|-------|
| Homepage | 35s | 2px/16ms | Leisurely full-page scroll |
| Blog listing | 20s | 1px/16ms | Gentle — avoids hitting bottom |
| LLMOps listing | 20s | 3px/16ms | Faster (content loads async) |
| LLMOps entry | 20s | 1px/20ms | 5s linger then very slow scroll |
| Blog post | 35s | 2px/16ms | Full article scroll |
| Case study | 25s | 2px/16ms | Standard scroll |

### Single-Clip Reshoot (`scripts/reshoot-blog-post.ts`)

When only one clip needed re-recording (e.g. wrong blog post URL), a targeted
reshoot script avoids re-recording all 6 clips — saving ~10 minutes of
recording time.

## Thumbnail Pipeline

### HTML-First Design

Rather than using an image editor, the thumbnail is defined as a 1280×720 HTML
page (`out/thumbnail.html`):

- Alex's photo on the left (extracted from webcam clip via ffmpeg)
- "2,224 Pages" + "in ~5 Days" text on the right
- Purple glow accent behind text
- ZenML logo top-right (white, inverted)
- Bottom bar with hackathon badge

### Playwright Screenshot

`scripts/screenshot-thumbnail.ts` opens the HTML at exactly 1280×720 viewport
and takes a pixel-perfect screenshot. This made iteration fast — edit HTML,
re-run script, check result — no Figma/Photoshop round-trips.

```bash
npx tsx scripts/screenshot-thumbnail.ts
# → out/thumbnail.png (550 KB, 1280×720)
```

## Narrator Recording Workflow

Alex recorded 6 webcam clips using a teleprompter approach:

1. **Script**: Claude Code wrote talking points for each section (not word-for-word
   — bullet points that Alex could deliver naturally)
2. **Recording**: Alex recorded each section as a separate clip using his webcam,
   reading from the script
3. **Timing extraction**: Claude Code extracted clip durations and built the
   timing map to match narration pace
4. **Trim points**: `clipStart` offsets skip the first ~0.5s of each clip
   (dead air before Alex starts speaking)

## Rendering

```bash
# Preview in Remotion Studio
npx remotion studio

# Render final MP4
npx remotion render src/index.ts ZenMLHackathonDemo out/demo-v11.mp4 \
  --codec h264 --crf 18 --concurrency 4

# Screenshot thumbnail
npx tsx scripts/screenshot-thumbnail.ts
```

### Render Performance Notes

- **H.264 over WebM**: VP8/VP9 (WebM) B-roll clips caused render timeouts on
  macOS due to software decoding. Converting all clips to MP4 (H.264) enabled
  hardware-accelerated decoding and reliable renders.
- **Concurrency**: `--concurrency 4` balances speed vs. memory for 12 concurrent
  video streams (6 Alex clips + 6 B-roll clips).
- **CRF 18**: Near-lossless quality at reasonable file size (~108 MB for 3 min).

## Bugs & Lessons Learned

### 1. OffthreadVideo Starts Playing on Mount, Not on Visibility

**Problem**: Second B-roll clip showed the page already scrolled halfway down.

**Root cause**: Both B-roll videos were mounted at frame 0. The second clip was
hidden with CSS `opacity: 0` but was still playing. By the time it became
visible at the crossfade point, the video had already advanced ~13 seconds.

**Fix**: Wrapped the second clip in `<Sequence from={crossfadeAt}>`. Remotion's
`Sequence` delays both mounting and playback — the video doesn't exist until
the crossfade begins.

### 2. Cookie Consent Banner in Recordings

**Problem**: Playwright opens fresh browser contexts — always shows the cookie
consent banner, ruining the first few seconds of every clip.

**Fix**: Added `dismissCookieConsent()` that finds the "Accept all" button via
`page.getByText('Accept all', { exact: true })` and clicks it before recording
begins.

### 3. Opening 1-Second Flicker

**Problem**: First frame showed dark background before Alex's video appeared.

**Root cause**: `clipStart: 30` (1 second offset) meant 30 frames of nothing
before the video started.

**Fix**: Set `clipStart: 0` for the hook section — Alex's clip starts
immediately.

### 4. WebM Render Timeouts

**Problem**: Renders failed with "timed out" errors when using WebM B-roll.

**Root cause**: macOS uses software decoding for VP8/VP9. With 12 concurrent
video streams, the decode pipeline couldn't keep up with Remotion's 33-second
per-frame timeout.

**Fix**: Converted all B-roll to MP4 (H.264) which gets hardware acceleration
via VideoToolbox on macOS.

### 5. Remotion Renders Frames Out of Order

**Problem**: Tried conditional mounting (`{frame >= X && <OffthreadVideo>}`) to
delay clip 2. Got inconsistent rendering — some frames had the video, some
didn't.

**Root cause**: Remotion renders frames in parallel across workers. Frame 400
might render before frame 399. Conditional mounting based on frame number
creates an unstable component tree.

**Fix**: Used `<Sequence from={X}>` which Remotion handles correctly across
parallel workers.

### 6. Card Stagger Timing

**Problem**: All 4 "Why It Matters" cards appeared simultaneously, looking
overwhelming.

**Root cause**: `CARD_START = 40, CARD_INTERVAL = 30` meant all 4 cards appeared
within 90 frames (3 seconds), bunched at the start before Alex was talking
about them.

**Fix**: Widened to `CARD_START = 200, CARD_INTERVAL = 120` (~4 seconds apart),
matching Alex's natural narration pace.

## Version History

| Version | Changes |
|---------|---------|
| v1 | Initial 7-scene text-only motion graphics |
| v2 | First PiP experiment with Alex clips |
| v3 | Full v2 scene structure (hook + why + 3 learnings + close) |
| v4 | Fixed hook flicker, widened card stagger |
| v5 | Corrected B-roll assignments (no duplicates) |
| v6 | Added dual B-roll crossfade to learning sections |
| v7 | Slowed B-roll clips to 0.75× via ffmpeg |
| v8 | Reduced overlay opacity (0.65→0.35) for visible B-roll |
| v9 | Re-recorded Alex clips, switched to native MP4 B-roll |
| v10 | Fixed clip-2-starts-at-bottom bug (Sequence wrapping) |
| v11 | Re-recorded blog post B-roll with correct URL, 1.5s ending buffer |

## What Claude Code Built

Everything in this directory was generated by Claude Code (Opus 4.6):

- All Remotion scene components and composition logic
- Animation utilities (fade, slide, spring, count-up)
- Timing system with frame-accurate section boundaries
- Playwright B-roll recording automation
- Thumbnail HTML design + Playwright screenshot script
- Iterative bug fixes through 11 render versions
- This documentation

The human contribution was:
- Recording the webcam clips (reading from Claude-generated talking points)
- Reviewing each render and providing verbal feedback
- Selecting the thumbnail photo frame
- Running render commands externally (Remotion renders were too slow inside Claude Code's sandbox)
