# ZenML Labs · Forum Teratec video

**Editing-only branch: `codex/zenml-teratec-video`. Do not merge this branch into the website branches or open a PR for it.** The team can commit and push video iterations here. Publication, deployment, and merging are separate actions.

The active cut is **v16**: 150 seconds, 1920×1080, 30 fps. `TeratecInstitutional` is the main Remotion composition. `TeratecExperimentalV9` is an earlier rejected direction retained only for reference.

## Start editing

Install Node.js and pnpm, plus FFmpeg (including ffprobe) for exports. From the repository root:

```sh
cd video/teratec
pnpm install --frozen-lockfile
pnpm dev
```

Remotion Studio opens at http://localhost:3333. This directory has its own package manifest, workspace and lockfile; it is independent of the Astro website.

Read [the video direction](../AGENTS.md) before making changes. The film uses ZenML Labs sage, cream and dark green, Borna, Nudica Mono and Rethink Sans, the approved SVG logo draw, and a subtle animated background. Headlines and subheads have no trailing periods. Preserve the current structure; the experimental v9 redesign was rejected.

## Files to edit

- `src/Film.tsx`: scenes, shared header, customer reveal and transitions
- `src/script.ts`: copy and active scene durations
- `src/components/HookWorkflow.tsx`: animated code → ZenML logo → infrastructure sequence
- `src/components/MunichMap.tsx`: original Figma hex map, Europe zoom and Munich marker
- `src/components/DrawLogo.tsx`: approved intro/outro SVG animation
- `src/Atmosphere.tsx`: deterministic native-resolution shader
- `src/brand.ts`, `src/assets.ts`, `public/`: brand tokens, fonts and local artwork

The script preserves the source manifest, then filters out unsourced statistics and applies the approved shorter durations. Active scene boundaries in seconds: 0, 6, 17, 29, 50, 70, 83, 99, 122, 138, 150.

## Check and export

```sh
pnpm check
pnpm stills
pnpm render
pnpm verify:media
pnpm share:discord
```

`pnpm render` creates `out/ZenML_Teratec2026_Institutional_EN_v16.mp4`: H.264 High, yuv420p, Rec.709, 16 Mbps CBR, silent stereo AAC. The event film has no audible narration. `pnpm share:discord` creates `out/ZenML_Labs_v16_Discord.mp4`: 720p, no audio, under 10 MB.

Render outputs, dependencies and caches are ignored by Git. Teammates regenerate MP4s locally; the branch contains the source, scripts, lockfile and required artwork/fonts. When incrementing the export version, update the default filenames in `scripts/render.mjs`, `scripts/verify-media.mjs`, `scripts/discord.mjs` and the review scripts in `package.json` together.

Short previews are available through `pnpm review:hook`, `pnpm review:customers`, `pnpm review:munich`, `pnpm review:opening`, `pnpm review:workflow`, `pnpm review:logo`, and `pnpm review:outro`. For local sharing in the browser, serve `out/` with any static HTTP server.

Check motion in playback as well as stills. PNG frame capture and ANGLE rendering are intentional: they preserve subtle gradients and shader motion. Do not switch to JPEG frame capture or a low-resolution shader canvas.

## Source assets

The map tiles are the original SVG export of the new-brand Figma template, file `tDusxGZ3wyvc08u3GiUpy4`, Tiles node `715:18529`. Munich is positioned at the stylized map's southern-Germany hex resolution; the map has no country borders. The ZenML product logo and full ZenML Labs lockup are distinct original vector assets reused from this repository. Customer artwork and fonts also reuse existing site assets.
