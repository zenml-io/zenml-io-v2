# Rendered-content goldens

Content regions of built pages, captured and compared by `scripts/check-dist-snapshots.ts` (runs inside `pnpm smoke:dist`; the header comment there explains what is snapshotted and why). After an intended rendering change: `pnpm build && pnpm snapshots:update`, review the golden diff, commit it. A golden diff you didn't expect is the finding — investigate before updating.
