# Rendered-content goldens

Content regions of built pages, captured and compared by `scripts/check-dist-snapshots.ts` (runs inside `pnpm smoke:dist`; the header comment there explains what is snapshotted and why). After an intended rendering change: `pnpm build && pnpm snapshots:update`, review the golden diff, commit it. A golden diff you didn't expect is the finding — investigate before updating.

`og-kitaru-vs-pydantic-ai.jpg` is the Open Graph card for that page, and `og-zenml-vs-pydantic-ai.jpg` the ZenML-brand card for its twin (the only card that exercises the template's inline-SVG wordmark path); both are rendered through the real `scripts/og/generate-compare-og.ts` pipeline and pixel-compared with a tolerance by `scripts/check-og-golden.ts` (also inside `pnpm smoke:dist`; `pnpm check:og` alone, `pnpm og:golden:update` to regenerate — look at the new JPEG before committing). The header comment there explains why it exists and why it is a tolerance rather than a hash.
