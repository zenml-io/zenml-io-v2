# Legacy terminology

This site was migrated from Webflow in Feb 2026 and unified with kitaru.ai in May 2026. Some naming and metadata from those phases persists in the codebase:

### Webflow migration (Feb 2026)
- **`scripts/phase2/validate-content.ts`** — still the active content validator (`pnpm validate:content`); the path is historical, the tool is current
- **`webflow` frontmatter** in content `.md` files — retained for traceability on migrated content; not needed for new posts
- **`R2_WEBFLOW_BASE`** in `src/lib/constants.ts` — references legacy asset namespaces still served from R2
- **`.prose` CSS class** — styles raw HTML that originated from Webflow's CMS export
- **`docs/MIGRATION.md`** — historical narrative of the Webflow migration; not current architecture authority
- **`docs/embed-contract.md`** — per-family contract for every third-party embed/script (Cal.com, Turnstile, Storylane, Brevo, GitHub buttons, YouTube-nocookie): host pages, sizing, loading, no-JS, and consent relationship, plus the `consentConfig.ts` registry rules (`cc-` id prefix is reserved for `TRACKING_SCRIPTS` entries)

### Kitaru merge (May 2026)
- **Kitaru R2/source-domain references** — audit current source before assuming any `assets.kitaru.ai` hotlinks remain. The merge removed known live-source references; historical design/migration artifacts may still mention old domains.
- **Standalone Kitaru form/API code was removed** — the merged site uses unified form helpers and analytics (`formTypes.ts`, `formValidation.ts`, `consentConfig.ts`). Do not recreate `kitaru-form-types.ts`, `kitaru-segment.ts`, or standalone `/api/get-started`, `/api/waitlist`, `/api/newsletter` routes unless the product decision changes.
- **v1 Kitaru surfaces are gone** — the `Architecture.astro` flows/checkpoints diagram, the `/get-started` ML/Agent chooser (`GET_STARTED_TABS`, `GET_STARTED_KITARU`) and the `@flow`/`@checkpoint` walkthrough. Do not recreate them; `/product/kitaru` is the entry point.
- **`compare-kitaru` and `compare-zenml` collections** use `.mdx` (vs project default `.md`) — the ported Kitaru-vs-X pages and their ZenML twins use inline component imports.
- **`MERGE_PLAN.md`** — the merge's running plan + progress log; not current architecture authority (CLAUDE.md is).

