# Website Agent Readiness: Plan

## Goal

Make the public ZenML marketing site more agent-friendly without depending on Cloudflare Markdown for Agents as a required service. The plan focuses on repo-controlled discovery, clear machine-readable metadata, and clean Markdown mirrors for the highest-value commercial pages.

This is a marketing-site readability and discovery plan. It does **not** turn `zenml.io` into an API catalog, MCP server, WebMCP surface, DNS-AID endpoint, or agent-auth provider.

## Background

### Current root discovery and Cloudflare Pages seams

- Root-level public files live under `public/` and are copied to the built site root. This is the correct seam for `llms.txt`, `robots.txt`, `_headers`, and `_redirects`.
- `public/llms.txt:1-5` already exists and describes ZenML as a unified AI platform for pipelines and agents.
- `public/llms.txt:7-20` includes an "Agent Signup" section aimed specifically at autonomous agents.
- `public/llms.txt:24` explicitly says ZenML does not currently provide `.md` versions and that linked pages use HTML URLs. That statement must change once Markdown mirrors ship.
- `public/llms.txt:28-101` groups high-level links across product/features, integrations, guides, comparisons, case studies, company pages, resources, and legal pages.
- `public/robots.txt:1-4` is minimal: it allows all crawlers and advertises `https://www.zenml.io/sitemap-index.xml`.
- `public/_headers:2-7` applies global Cloudflare Pages response headers under `/*`, currently focused on security headers and a report-only CSP.
- `public/_redirects:2-5` documents Cloudflare Pages redirect behavior: `<from> <to> <status>`, first match wins, and slash/non-slash variants are maintained explicitly.
- `public/_redirects:7-8` redirects `/sitemap.xml` to `/sitemap-index.xml` for sitemap compatibility.
- `astro.config.ts:26-32` sets `site: "https://www.zenml.io"`, static output, Cloudflare adapter, `trailingSlash: "never"`, and file-format builds.
- `astro.config.ts:40-47` registers `@astrojs/sitemap`; the exclusion set begins at `astro.config.ts:11`.

### Pricing page, Markdown route, and JSON-LD seams

- `src/pages/pricing.astro:8-15` documents `/pricing` as the unified pricing route.
- `src/pages/pricing.astro:17-27` imports pricing data from `src/lib/pricing.ts`.
- `src/pages/pricing.astro:31-39` passes `PRICING_SEO` into `BaseLayout` and sets `surface="unified"`.
- `src/pages/pricing.astro:42-212` renders the pricing page from typed data and section components, so the page is already real Astro-rendered HTML rather than an empty client-side shell.
- `src/lib/pricing.ts:18-472` is the central source for pricing SEO, hero, product/workspace inclusions, plan cards, comparison table, startup banner, compliance copy, FAQ, stats, and final CTA.
- `src/lib/pricing.ts:272-277` derives comparison-table CTA buttons from `PRICING_PLANS`, making plan CTAs a single source of truth.
- `src/components/sections/PricingPlanCards.astro:2-30` imports `PRICING_PLANS` directly and derives slider display data at build time.
- `src/components/sections/PricingComparisonTable.astro:13-21` accepts typed `PricingCompareTableData`; `src/components/sections/PricingComparisonTable.astro:44-95` renders sectioned rows with booleans, strings, and optional links.
- `src/components/sections/FaqSection.astro:31-54` renders FAQ items with native `<details>/<summary>` and answer HTML.
- `src/layouts/BaseLayout.astro:41-59` renders core SEO, Open Graph, and Twitter metadata.
- `src/layouts/BaseLayout.astro:67-68` exposes a `slot="head"` seam for JSON-LD and other child head content.
- `src/components/seo/JsonLd.astro:17-24` serializes a JSON-LD object and emits `<script type="application/ld+json">`.
- `src/pages/index.astro:38-61` builds homepage `Organization` and `FAQPage` JSON-LD; `src/pages/index.astro:70-71` injects both with `slot="head"`.
- `src/layouts/BlogLayout.astro:122-150` builds and injects `BreadcrumbList` and `Article` JSON-LD for blog posts.
- Existing endpoint route patterns are available in `src/pages/blog/rss.xml.ts:21-65`, `src/pages/llmops-database/rss.xml.ts:42-103`, `src/pages/mlops-database/rss.xml.ts:37-95`, and `src/pages/blog/search-index.json.ts:12-21`.

### Product and compare page seams

- `/product/zenml` is mostly data-driven from `src/lib/productZenml.ts` and `src/pages/product/zenml.astro`; this makes it a reasonable candidate for a generated Markdown mirror.
- `/product/kitaru` is section-driven from `src/pages/product/kitaru.astro` and `src/components/kitaru/*`; the page currently has more inline/section-local copy, so its Markdown mirror may need a small shared data module instead of scraping component text.
- `/compare` is collection-driven from `src/pages/compare/index.astro`, using `compare` and `compare-kitaru` collections. A generated `/compare.md` can summarize the hub without creating Markdown mirrors for every detail page in this first pass.
- `src/pages/compare/[slug].astro`, `src/components/compare/_layouts/MlopsCompare.astro`, and `src/components/compare/_layouts/KitaruCompare.astro` show that detail pages are already split by MLOps vs agent/Kitaru compare content. Detail-page mirrors are a possible later follow-up, not part of this first plan.

### Prior art and repo conventions

- `docs/MIGRATION.md:95-109` records the previous SEO migration pattern: Cloudflare redirects, hand-written RSS routes, generated sitemap, OG image handling, JSON-LD via `<JsonLd data={...} slot="head" />`, `llms.txt`, and canonical fixes.
- `docs/kitaru-seo-inventory.md:39-55` shows prior sitemap and URL inventory work, including explicit attention to ZenML's `trailingSlash: never` behavior.
- `docs/kitaru-seo-inventory.md:128-210` treats redirect mapping as careful source/target validation work and warns against broad catch-all redirects.
- `docs/two-workspaces-audit/SURFACE-AUDIT.md:20-33` documents the current analytics surface model: `BaseLayout` writes `data-surface`, Plausible receives `event-surface`, and `PlausibleBridge.astro` attaches it to custom events.
- `docs/two-workspaces-audit/KITARU-COMPARE-REVIEW.md:22-29` confirms Kitaru compare pages set `surface="agent"`, rely on canonical handling in `seo.ts`, and treat missing custom OG images as future polish rather than blockers.

### External standards and scanner findings

- `llms.txt` is a community proposal, not an IETF/W3C standard, but it is low-risk and useful as a curated site guide. Reference: https://llmstxt.org/
- RFC 8288 Web Linking is a stable standards-track mechanism for typed links and `Link` response headers. Reference: https://www.rfc-editor.org/rfc/rfc8288
- RFC 9727 `/.well-known/api-catalog` is a stable API discovery standard using `application/linkset+json`, but it is mainly relevant when a domain intentionally exposes public APIs. Reference: https://www.rfc-editor.org/rfc/rfc9727
- Cloudflare Markdown for Agents converts HTML to Markdown on `Accept: text/markdown`, but it is a Cloudflare-controlled feature; docs currently say it is available on eligible plans at no cost. Reference: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
- Content Signals are an emerging voluntary policy mechanism for `search`, `ai-input`, and `ai-train`; Cloudflare documents them but compliance is not enforcement.
- DNS-AID, MCP server cards, WebMCP, OAuth discovery, OAuth protected-resource metadata, and `auth.md` are premature for this marketing-site plan unless ZenML chooses to expose actual agent tools, APIs, auth flows, or MCP services from `zenml.io`.

## Approach

### 1. Prefer repo-owned Markdown mirrors over Cloudflare Markdown for Agents

Do not make Cloudflare Markdown for Agents a dependency for this work. Instead, add explicit Markdown routes that agents can fetch directly:

- `/pricing.md`
- `/product/zenml.md`
- `/product/kitaru.md`
- `/compare.md`

Use Astro endpoint routes rather than static hand-written files under `public/` where possible. Generated endpoints keep Markdown mirrors tied to the same source data as the HTML pages, reducing the chance that the “agent version” and the human page tell different stories.

Recommended new routes:

- `src/pages/pricing.md.ts` -> `/pricing.md`
- `src/pages/product/zenml.md.ts` -> `/product/zenml.md`
- `src/pages/product/kitaru.md.ts` -> `/product/kitaru.md`
- `src/pages/compare.md.ts` -> `/compare.md`

Add a small helper module, likely `src/lib/agentMarkdown.ts`, for shared formatting concerns: absolute URLs, `text/markdown` responses, Markdown escaping/normalization where needed, HTML-to-plain-text conversion for FAQ answers, simple list/table helpers, and a consistent page preamble. This helper should be reusable by both Markdown mirrors and pricing JSON-LD so FAQ/text stripping does not diverge.

Each Markdown mirror should include:

- H1 title
- canonical HTML URL
- short description
- note that the file is a repo-owned Markdown mirror for agents/readers
- concise page summary
- main CTAs
- important tables/lists in plain Markdown
- no decorative SVGs, visual-only UI, analytics snippets, or navigation chrome

Exclude the `.md` mirrors from the XML sitemap in `astro.config.ts`. Agents should discover them through `/llms.txt` and `Link` headers, not normal search indexing. Use conservative RFC 8288 values when advertising these resources: `rel="help"` for `/llms.txt`, and `rel="alternate"; type="text/markdown"` for each Markdown mirror.

### 2. Keep public discovery in `public/`

Use existing root public files for the discovery layer:

- `public/robots.txt` for Content-Signal preferences.
- `public/_headers` for RFC 8288-style `Link` headers.
- `public/llms.txt` for the curated agent-facing map.

Do not change `public/_redirects` for this project unless validation reveals a specific routing problem. Redirect changes are unnecessary for the five requested changes.

### 3. Add pricing structured data through the existing JSON-LD seam

Add pricing JSON-LD via the already-established path:

`src/pages/pricing.astro` -> `BaseLayout` head slot -> `<JsonLd data={...} slot="head" />`

Build the JSON-LD object from pricing data, not from duplicate literals in the page route. A dedicated helper such as `src/lib/pricingJsonLd.ts` should import from `src/lib/pricing.ts` and `src/lib/constants.ts`.

The JSON-LD should include the page identity and FAQ data, then represent plans/offers only where the Schema.org shape can be expressed accurately. Candidate nodes are `WebPage`, `FAQPage`, `BreadcrumbList`, and either `SoftwareApplication`/`Product` with an `OfferCatalog` if the pricing data maps cleanly. The key requirement is that plan names, prices, features, and FAQ entries come from `src/lib/pricing.ts`, with shared HTML-to-text handling reused from the Markdown helper where appropriate.

### 4. Treat scanner API/tool findings as out of scope

Do not add these in this implementation pass:

- DNS-AID records
- MCP server card
- WebMCP hooks
- OAuth/OIDC discovery metadata
- OAuth protected-resource metadata
- `auth.md`
- `/.well-known/api-catalog`

Reason: those advertise callable APIs, auth flows, or tool surfaces. The public marketing site currently exposes forms and utility endpoints, not a public product API or agent tool server. If ZenML later wants agents to call product APIs or MCP tools from `zenml.io`, that should be a separate API/tool discovery plan.

## Work Items

### Item 1 — Confirm and add Content-Signal preferences

**Goal:** Publish ZenML’s crawler/content-use preference in the repo-controlled robots file.

**Done when:**

- `public/robots.txt` still allows crawlers.
- `public/robots.txt` still advertises `https://www.zenml.io/sitemap-index.xml`.
- It includes the recommended Content-Signal line:
  ```txt
  Content-Signal: search=yes, ai-input=yes, ai-train=no
  ```
- The policy has had a quick business/legal confirmation before shipping. Rationale: ZenML wants search and live agent grounding, but does not need to grant model-training rights by default.

**Key files:**

- `public/robots.txt:1-4`

**Dependencies:**

- Quick business/legal confirmation of the recommended `search=yes, ai-input=yes, ai-train=no` policy.

**Size:** XS

---

### Item 2 — Add Markdown mirror helper and `/pricing.md`

**Goal:** Create the first repo-owned Markdown mirror using the strongest existing data source: `src/lib/pricing.ts`.

**Done when:**

- `/pricing.md` builds as a static Markdown endpoint.
- The response uses `Content-Type: text/markdown; charset=utf-8`.
- The Markdown includes pricing hero copy, canonical URL, plans, Scale tiers, Pro inclusions, comparison table summaries, compliance summary, FAQ, and CTAs.
- Boolean comparison-table values are rendered as a plain Markdown table or concise per-plan feature list, not as visual check/cross icons.
- FAQ answers that contain HTML are converted to readable plain text/Markdown through the shared helper.
- The content derives from `src/lib/pricing.ts` where the data already exists.
- `/pricing.md` is excluded from the XML sitemap.

**Key files:**

- Add `src/lib/agentMarkdown.ts`
- Add `src/pages/pricing.md.ts`
- Modify `astro.config.ts:11-24`
- Source data from `src/lib/pricing.ts:18-472`

**Dependencies:**

- None.

**Size:** M

---

### Item 3 — Add `/product/zenml.md` and `/product/kitaru.md`

**Goal:** Provide readable Markdown mirrors for the two product landing pages.

**Done when:**

- `/product/zenml.md` builds and summarizes ZenML positioning, install/get-started path, main benefits, infrastructure/orchestrator flexibility, and CTAs.
- `/product/kitaru.md` builds and summarizes Kitaru positioning, replay/checkpoint/wait-resume story, runtime primitives, deployment targets, and CTAs.
- Both endpoints return `text/markdown; charset=utf-8`.
- Both endpoints are excluded from the XML sitemap.
- The Kitaru mirror does not scrape rendered HTML. Add `src/lib/productKitaru.ts` as the source for Kitaru SEO/Markdown summary copy, then optionally have `src/pages/product/kitaru.astro` import from it where that reduces drift.
- Any newly-authored Kitaru summary copy is reviewed by the content/product owner before shipping.

**Key files:**

- Add `src/pages/product/zenml.md.ts`
- Add `src/pages/product/kitaru.md.ts`
- Reuse or extend `src/lib/productZenml.ts`
- Add `src/lib/productKitaru.ts`
- Optionally update `src/pages/product/kitaru.astro` to import shared SEO/summary data from `src/lib/productKitaru.ts` where that avoids duplicate copy
- Modify `astro.config.ts:11-24`

**Dependencies:**

- Item 2 helper module.

**Size:** M

---

### Item 4 — Add `/compare.md`

**Goal:** Expose the compare hub in plain Markdown, generated from the same collections as `/compare`.

**Done when:**

- `/compare.md` builds as a static Markdown endpoint.
- It reads from both compare collections used by `/compare`.
- It lists ZenML/MLOps comparisons separately from Kitaru/agent comparisons.
- It uses canonical no-trailing-slash URLs, matching the repo’s `trailingSlash: "never"` policy.
- It is excluded from the XML sitemap.
- It does not create detail-page Markdown mirrors yet.

**Key files:**

- Add `src/pages/compare.md.ts`
- Reference `src/pages/compare/index.astro`
- Reference collection definitions in `src/content.config.ts`
- Modify `astro.config.ts:11-24`

**Dependencies:**

- Item 2 helper module.

**Size:** S-M

---

### Item 5 — Add JSON-LD to `/pricing`

**Goal:** Make the pricing page machine-readable for search engines and agents using the existing JSON-LD component.

**Done when:**

- `/pricing` includes JSON-LD in the page head.
- The graph includes `WebPage`, `FAQPage`, and `BreadcrumbList`.
- Plan/offer data is represented with `SoftwareApplication` or `Product` plus `OfferCatalog` only if the implementation can map the pricing data accurately.
- Plan names, prices, features, and FAQ entries come from `src/lib/pricing.ts`.
- FAQ answer text uses the same HTML-to-plain-text handling as `/pricing.md`.
- Existing homepage and blog JSON-LD behavior is unchanged.

**Key files:**

- Add `src/lib/pricingJsonLd.ts`
- Modify `src/pages/pricing.astro:31-39` to inject the JSON-LD via the existing head slot
- Reuse `src/components/seo/JsonLd.astro:17-24`
- Follow examples in `src/pages/index.astro:38-71` and `src/layouts/BlogLayout.astro:122-150`

**Dependencies:**

- Item 2's shared text/Markdown helper, or an equivalent shared utility, so FAQ HTML stripping does not get implemented twice.

**Size:** S

---

### Item 6 — Add discovery `Link` headers

**Goal:** Advertise the LLM guide and Markdown alternates through HTTP headers using repo-controlled Cloudflare Pages configuration.

**Done when:**

- `public/_headers` keeps all current security headers.
- Global responses advertise `/llms.txt` with `rel="help"`.
- These HTML pages advertise Markdown alternates with `rel="alternate"; type="text/markdown"`:
  - `/pricing` -> `/pricing.md`
  - `/product/zenml` -> `/product/zenml.md`
  - `/product/kitaru` -> `/product/kitaru.md`
  - `/compare` -> `/compare.md`
- Header paths use no trailing slash.
- Page-specific header blocks do not accidentally drop the global discovery link. To avoid relying on ambiguous header merging, include the intended full `Link` value in each page-specific block.

**Key files:**

- `public/_headers:2-7`

**Dependencies:**

- Items 2-4, so headers do not point at missing `.md` routes.

**Size:** S

---

### Item 7 — Update and maintain `public/llms.txt`

**Goal:** Make `llms.txt` accurately describe the new repo-owned Markdown mirrors and guide agents to the right high-level resources.

**Done when:**

- The obsolete sentence saying ZenML has no `.md` versions is removed.
- A new “Markdown mirrors” or equivalent section lists:
  - `https://www.zenml.io/pricing.md`
  - `https://www.zenml.io/product/zenml.md`
  - `https://www.zenml.io/product/kitaru.md`
  - `https://www.zenml.io/compare.md`
- Existing high-level site guide sections remain useful.
- The file clearly distinguishes marketing/readability resources on `www.zenml.io`, product documentation on `docs.zenml.io`, and source code on GitHub.
- It does not advertise MCP, WebMCP, DNS-AID, OAuth discovery, `auth.md`, or API catalog support.

**Key files:**

- `public/llms.txt:1-101`

**Dependencies:**

- Items 2-4.

**Size:** S

---

### Item 8 — Validate generated output and deployment behavior

**Goal:** Prove the generated site exposes the intended files, content types, headers, sitemap behavior, and pricing structured data.

**Done when:**

- `pnpm check` passes.
- `pnpm build` passes.
- Built output contains:
  - `/pricing.md`
  - `/product/zenml.md`
  - `/product/kitaru.md`
  - `/compare.md`
  - `/llms.txt`
  - `/robots.txt`
- Markdown endpoints have readable plain Markdown and correct `Content-Type` when served through a local preview or suitable static-server check.
- `/pricing` contains JSON-LD in the head.
- Generated sitemap does not include the `.md` mirror URLs.
- Cloudflare Pages `_headers` syntax is checked in preview/deploy validation, especially page-specific `Link` headers and their `rel`/`type` values.

**Key files:**

- Validates all prior changes.

**Dependencies:**

- Items 1-7.

**Size:** S

## Implementation Order

1. Start quick business/legal confirmation for `Content-Signal: search=yes, ai-input=yes, ai-train=no` in parallel; do not let it block unrelated technical work.
2. Add `src/lib/agentMarkdown.ts`.
3. Add `/pricing.md`, pricing JSON-LD, and the first sitemap exclusion together because they share pricing data and text conversion.
4. Add `/product/zenml.md` and `/product/kitaru.md`; add shared Kitaru summary data as part of this step.
5. Add `/compare.md`.
6. Add discovery `Link` headers in `public/_headers`.
7. Update `public/llms.txt`.
8. Once policy is confirmed, update `public/robots.txt` with `Content-Signal: search=yes, ai-input=yes, ai-train=no`.
9. Run validation and inspect generated output.

## Risks and Constraints

### Content-Signal policy risk

`ai-train=no` is a policy statement, not enforcement. It should be approved before shipping because it communicates ZenML’s business/legal preference.

### Duplicate-content risk

Markdown mirrors are alternate representations of commercial pages. Excluding them from the sitemap reduces the chance that search engines treat them as normal duplicate landing pages.

### Drift risk

Hand-maintained Markdown would drift quickly. Generated endpoints reduce drift for pricing and compare. Kitaru is less data-driven today, so a small `productKitaru` data module may be the lowest-cost way to share SEO and Markdown summary copy without refactoring all Kitaru components.

### Header behavior risk

Cloudflare Pages header matching/merging should be validated in preview. To reduce ambiguity, page-specific `Link` headers should include the complete intended discovery value rather than relying on multiple blocks combining exactly as expected.

### Scope risk

The scanner flagged many advanced agent protocols. This plan intentionally does not implement API/tool/auth protocols unless ZenML separately decides that `zenml.io` should expose callable public APIs or agent tools.

## Decisions

- Use `Content-Signal: search=yes, ai-input=yes, ai-train=no`, pending quick business/legal confirmation before shipping. This allows normal search indexing and live AI/agent grounding while reserving rights against model training by default.
- Defer `/.well-known/api-catalog`. The marketing site does not currently expose a public product API/tool surface, and adding an API catalog for form handlers or utility endpoints would create more confusion than value.

## Open Questions

- None blocking. Revisit API/tool discovery only if ZenML later chooses to expose public agent-callable APIs, MCP tools, or auth flows from `zenml.io`.

## References

- `public/llms.txt`
- `public/robots.txt`
- `public/_headers`
- `astro.config.ts`
- `src/pages/pricing.astro`
- `src/lib/pricing.ts`
- `src/components/seo/JsonLd.astro`
- `src/pages/index.astro`
- `src/layouts/BlogLayout.astro`
- `src/pages/product/zenml.astro`
- `src/pages/product/kitaru.astro`
- `src/pages/compare/index.astro`
- `src/pages/blog/rss.xml.ts`
- `src/pages/blog/search-index.json.ts`
- `docs/MIGRATION.md`
- `docs/kitaru-seo-inventory.md`
- `docs/two-workspaces-audit/SURFACE-AUDIT.md`
- `docs/two-workspaces-audit/KITARU-COMPARE-REVIEW.md`
- https://llmstxt.org/
- https://www.rfc-editor.org/rfc/rfc8288
- https://www.rfc-editor.org/rfc/rfc9727
- https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
