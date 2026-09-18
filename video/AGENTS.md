# Video creative direction

These instructions apply to video projects under `video/`. Read them alongside the repository instructions and `DESIGN.md`. They capture the user's standing direction for subsequent video iterations.

## Branch purpose

- `codex/zenml-teratec-video` is a shared video-editing branch, not a merge candidate. Do not open a PR or merge it into website branches. The user authorized committing and pushing the current video work for team collaboration.

## Visual storytelling and motion

- Make the film visually led. Explain ideas through composed graphics and motion, supported by concise on-screen copy. Avoid a sequence of static text slides or a PowerPoint-like presentation.
- Actively use branded blocks, boxes, frames, iconography, diagrams, typography, and spatial relationships to communicate the story. Choose elements for their meaning rather than adding decoration to every scene.
- Build distinctive transitions around the content: connected elements that move between scenes, changes in scale and position, coordinated motion of blocks and text, and clear visual continuity. Do not rely on the same generic transition throughout.
- Use animated shader backgrounds, procedural textures, lighting, and depth where they work with the ZenML Labs brand. Keep them restrained enough that text remains legible and the result feels professional and appropriate for enterprise audiences. Do not introduce unrelated neon effects, off-brand gradients, or visual noise.
- Avoid long dead holds after the last reveal. Plan meaningful visual states every 4–6 seconds, with enough stable reading time. Inspect the semantic beat timeline, not just the duration of each scene.
- Give scenes distinct visual compositions and rhythm. Use the available canvas; do not repeat the same header, headline and body layout for every idea.
- Preserve the silent exhibition brief: all essential meaning must be visible, each scene must make sense to someone joining midway, and finished compositions need sufficient reading time. Motion should settle for reading rather than compete with it.
- Render short motion samples early and point the user to the actual clips for review. Review movement and transitions in playback, as well as inspecting still frames.

## Copy and quick explanations

- Do not end headlines, subheads, or the header slogan with a period. Preserve punctuation within multi-part headlines and in full body sentences.

- Use `/zenml-voice` whenever drafting or revising video copy. Discover and read the installed `zenml-voice/SKILL.md`, then follow its relevant brand-architecture, product-tier, audience, medium, and final-check references. Do not substitute a generic writing voice or claim to have applied an unavailable skill.
- Use less text. Present one idea per beat with a short headline or action phrase; add a brief supporting line only when the visual cannot communicate the necessary detail.
- Explain quickly through a visual sequence: a concrete problem, what changes, and the result. Prefer meaningful blocks, icons, movement, or a compact before/after over a paragraph of explanation.
- Let the graphics carry relationships and process. Avoid repeating the same explanation in both text and imagery, or putting the whole spoken-script equivalent on screen.
- Keep the voice Human, Technical, and Decisive: natural language, precise capabilities, direct statements. Cut filler, jargon used for effect, hype, and unnecessary setup.
- Keep ZenML Labs as the company and ZenML and Kitaru as distinct products. Attribute orchestration claims to ZenML and agent replay/testing claims to Kitaru; shortening must not blur those distinctions.
- Quick explanations must still be readable on a silent exhibition screen. Shorten the copy before shortening reading time. Retain essential qualifiers and source attribution.

## Established choices for the Teratec film

- The user rejected the v9 structural rebuild and restored v8 as the active baseline. Keep its visual structure, approved SVG logo animation, and subtle v8 shader for future iterations. The user subsequently requested shorter holds (v11: 150 seconds) and the Munich map with a Europe zoom before the marker.

- Use ZenML Labs branding across the whole film, including the Kitaru segment: sage, cream and dark green. Do not switch to orange or purple.
- Use Borna Medium for display text, Nudica Mono Medium for labels, and Rethink Sans for body text.
- Use the full approved ZenML Labs logo. Do not use the hexagonal badge as the opening or closing identity, and never redraw or typeset the logo.
- The user approved the v5 SVG logo animation. Preserve its contour-to-fill treatment and use it for both intro and outro.
- Animate the original ZenML Labs SVG contours into the filled logo for intro and outro. Preserve the exact path geometry; an SVG stroke-dash animation is explicitly requested and is distinct from the rejected mask effect.
- Do not use mask reveals for text or scene transitions. The user rejected that treatment. Keep words intact and readable during their motion.
- Do not add recurring event footers, slide/page numbers, or scene counters. Event details belong in the closing invitation.
- Preserve factual claims and required source attribution while making their presentation more visual. Visual embellishment must not invent product behavior, customer endorsements, or evidence.

## Implementation

- Keep background movement slow and subtle, with low contrast and broad smooth light shapes. Capture video frames as PNG to avoid JPEG macroblocks in dark gradients.
- Keep shader backgrounds moving throughout reading holds, at native composition resolution. Avoid enlarged low-resolution canvases and visible coarse grain.
- Derive animation from Remotion frame timing. Shader/procedural effects must render deterministically, use local assets where possible, and survive the actual export path.
- Check readability, clipping, motion pacing, loop continuity, and delivery metadata after relevant changes. A still image alone does not validate an animation.
- Keep this file and `CLAUDE.md` in this directory equivalent when updating shared creative direction.
