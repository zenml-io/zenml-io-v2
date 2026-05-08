# Investigation: Ahrefs Site Audit Low-Hanging Fruit Plan

## Summary
The Ahrefs audit should be handled in stages, not as 66 separate CSVs to fix linearly. The highest-confidence low-hanging fruit is a small set of crawl/link fixes: stale MLOps Ray Summit redirects duplicated in Astro route generation and `_redirects`, one hardcoded broken integrations image, a few broken/HTTP content links, bare-domain Slack CTA chains, and missing H1s on blog listing pages.

## Symptoms
- Ahrefs export path: `design/zenml w subdomains_05-may-2026_all-issues_2026-05-06_16-56-25`
- User wants a staged plan that identifies low-hanging SEO fixes for the Astro website in this repo.
- Constraint: do not break existing SEO behavior that is currently working; this investigation is read-only and should produce a plan, not source changes.

## Background / Prior Research
- External web/git archaeology not run in Phase 1.5: the relevant evidence appears to be local Ahrefs CSV export + current repo implementation.
- CSV parsing note: Ahrefs files are UTF-16 encoded; tooling should read them with `encoding='utf-16'`.

### Initial issue count snapshot

| Issue file | Rows |
|---|---:|
| `Warning-3XX_redirect-links.csv` | 8160 |
| `Warning-indexable-Page_has_links_to_redirect-links.csv` | 8098 |
| `Warning-indexable-Page_has_links_to_redirect.csv` | 2669 |
| `Notice-Redirect_chain-links.csv` | 2730 |
| `Warning-indexable-Title_too_long.csv` | 2017 |
| `Warning-indexable-Meta_description_too_long.csv` | 1960 |
| `Warning-indexable-Meta_description_too_short.csv` | 555 |
| `Notice-Pages_to_submit_to_IndexNow.csv` | 367 |
| `Error-indexable-Page_has_links_to_broken_page.csv` | 37 |
| `Error-404_page.csv` / `Error-4XX_page.csv` | 14 each |
| `Error-Page_has_broken_image.csv` | 18 |
| `Error-Image_file_size_too_large.csv` | 50 |
| `Error-Page_size_exceeds_Googlebot's_2_MB_crawl_limit.csv` | 2 |
| `Error-indexable-HTTPS_page_has_internal_links_to_HTTP.csv` | 4 |
| `Error-indexable-Orphan_page_(has_no_incoming_internal_links).csv` | 16 |
| `Warning-indexable-H1_tag_missing_or_empty.csv` | 23 |
| `Notice-indexable-Multiple_H1_tags.csv` | 39 |

## Investigator Findings

### 2026-05-06 concrete repo mapping

This pass parsed the Ahrefs export as UTF-16 tab-separated files. The practical story is: a few issues are genuine small fixes, but the very large warning counts mostly come from sitewide shared chrome or large generated/content collections. Fix the tiny shared sources first; do not try to hand-edit thousands of URLs one by one.

#### High-priority issue groups

| Ahrefs issue group | CSV evidence | Affected URL group | Concrete repo mapping | Low-hanging? |
|---|---:|---|---|---|
| Redirects in sitemap + broken redirect destinations | `Error-3XX_redirect_in_sitemap.csv`: 11 rows; `Error-Broken_redirect.csv`: 12 rows | 11 stale `/mlops-database/ray-summit-talks-that-are-explicitly-internal-ml-platform-oriented-2025-*` URLs redirect to 11 `/mlops-database/*` URLs that 404 | Duplicated redirect maps in `src/pages/mlops-database/[slug].astro:20-68` and `public/_redirects:90-134`; sitemap filter in `astro.config.ts:23-44` does not exclude them | Yes, but fix carefully in both places |
| 404 / 4XX pages | `Error-404_page.csv` and `Error-4XX_page.csv`: 14 rows each | 11 wrong MLOps redirect targets; 1 duplicated LLMOps slug; 1 old `/project/supabase-openai-summary`; 1 Cloudflare `/cdn-cgi/l/email-protection` artifact | MLOps maps above; LLMOps bad in-page link is in `src/content/blog/llmops-in-production-another-419-case-studies-of-what-actually-works.md:50`; Supabase link is in `src/content/blog/using-zenml-with-llms-to-analyze-your-databases-a-case-study-with-you-tldr-com-and-supabase-gpt-4.md:98`; email-protection comes from Cloudflare email obfuscation rewriting `mailto:` links, not from source text | Mostly yes: 2 content links + MLOps redirect map; email-protection is config/ignore, not source |
| Indexable pages link to broken pages | `Error-indexable-Page_has_links_to_broken_page-links.csv`: 38 link rows | 36 links to `/cdn-cgi/l/email-protection`, 1 duplicated LLMOps slug, 1 `/project/supabase-openai-summary` | Team template emits `mailto:` links at `src/pages/team/[slug].astro:49-53`; author template has same pattern at `src/pages/author/[slug].astro:66-70`; example team email source at `src/content/team/alex-strick-van-linschoten.md:14-17` | Partly. Do not blindly remove mailto links; decide Cloudflare/Ahrefs handling |
| Broken image | `Error-Image_broken.csv`: 1 image URL; `Error-Page_has_broken_image-links.csv`: 18 source rows | Same missing Webflow/R2 image appears on `/integrations` and 17 query-filtered variants (`?type=...`) | Hardcoded image in `src/pages/integrations/index.astro:174-183` points at `https://assets.zenml.io/.../66e9556fd34d2791885b0c5f_model_control_plane_01.png` | Yes: replace/upload one image URL |
| Googlebot 2 MB page crawl limit | `Error-Page_size_exceeds_Googlebot's_2_MB_crawl_limit.csv`: 2 rows | `/llmops-tags/prompt-engineering` at 3,037,109 bytes; `/llmops-tags/monitoring` at 2,638,380 bytes | `src/pages/llmops-tags/[slug].astro:23-30` loads every matching LLMOps entry, then `src/pages/llmops-tags/[slug].astro:77-98` renders every card on the page | No: needs pagination, excerpt limits, or indexability decision |
| HTTPS pages link to HTTP | `Error-indexable-HTTPS_page_has_internal_links_to_HTTP-links.csv`: 5 rows | 4 blog posts; targets are `http://docs.zenml.io/`, `http://zenml.io/`, `http://zenml.io/slack`, `http://zenml.io/slack-invite` | Source content examples: `src/content/blog/zenml-your-open-source-path-forward-after-cnvrg-io.md:104-108`; `src/content/blog/why-you-should-be-using-caching-in-your-machine-learning-pipelines.md:96`; `src/content/blog/why-ml-should-be-written-as-pipelines-from-the-get-go.md:105` | Yes: small content URL sweep |
| High-volume links to redirects | `Warning-indexable-Page_has_links_to_redirect-links.csv`: 8,098 link rows | Top three redirect targets are each 2,647 links: `https://www.zenml.io/slack`, `https://www.zenml.io/roadmap`, `https://zenml.io/slack-invite` | Global layout adds nav/footer to every page: `BaseLayout.astro:115-118`; nav has `/slack` and `/roadmap` at `src/lib/navigation.ts:260-281`; footer resources has `/roadmap` and `/slack` at `src/lib/footer.ts:54-57`; footer social uses bare-domain `https://zenml.io/slack-invite` at `src/lib/footer.ts:218-221`; more bare-domain Slack CTAs at `src/lib/homepage.ts:400-405` and `src/lib/pricing.ts:432-436` | Mixed: 3 bare-domain fixes are low-hanging; intentional `/slack` and `/roadmap` redirect endpoints may be acceptable |
| Title too long | `Warning-indexable-Title_too_long.csv`: 2,017 rows | Mostly generated/content collections: 1,609 `/llmops-database/*`, 203 `/blog/*`, 184 `/mlops-database/*` | SEO pass-through in `src/lib/seo.ts:63-96`; blog title fallback at `src/pages/blog/[slug].astro:79-83`; LLMOps title fallback at `src/pages/llmops-database/[slug].astro:61-71`; content frontmatter includes many long `seo.title` values | Broad/content-heavy; maybe add validation warnings before truncating |
| Meta description too long | `Warning-indexable-Meta_description_too_long.csv`: 1,960 rows | Mostly generated database entries: 1,615 `/llmops-database/*`, 186 `/mlops-database/*`, 143 `/blog/*` | Same SEO pass-through in `src/lib/seo.ts:63-96`; schemas make SEO optional/flexible in `src/content.config.ts:37-49`; LLMOps tag pages use short generated descriptions at `src/pages/llmops-tags/[slug].astro:34-38` | Broad/content-heavy; prefer validation + targeted high-traffic edits |
| Meta description too short | `Warning-indexable-Meta_description_too_short.csv`: 555 rows | Mostly taxonomy/listing pages: `/tags/*` 118, `/llmops-tags/*` 114, `/integrations/*` 61, `/mlops-tags/*` 57, `/blog/page/*` 16 | Many templates generate terse descriptions, e.g. `src/pages/llmops-tags/[slug].astro:34-38`; blog listing descriptions in `src/pages/blog/index.astro:64-68` and `src/pages/blog/page/[page].astro:68-72` | Medium: template copy improvements help many pages |
| Missing H1 | `Warning-indexable-H1_tag_missing_or_empty.csv`: 23 rows | `/blog` plus 16 `/blog/page/N` pages; also off-repo status/trust pages (`status.zenml.io` paths surfaced as `/`, `/uptime`, `/history`) | Blog listing templates render `BaseLayout` + cards but no `<h1>`: `src/pages/blog/index.astro:64-121`, `src/pages/blog/page/[page].astro:68-108`; featured `BlogHero` title is `<h2>` at `src/components/blog/BlogHero.astro:77-82` | Yes for blog pages; status/trust subdomain is outside this repo |
| Multiple H1 tags | `Notice-indexable-Multiple_H1_tags.csv`: 39 rows | 22 blog posts and 17 LLMOps database entries | Blog layout always emits page `<h1>` at `src/layouts/BlogLayout.astro:166-170`; affected blog bodies contain extra markdown `# ...`, e.g. `src/content/blog/databricks-alternatives.md:36-47`; LLMOps detail template emits `<h1>` at `src/pages/llmops-database/[slug].astro:102-104`, while some content bodies also start with `#`, e.g. `src/content/llmops-database/ai-assistant-for-global-customer-service-automation.md:46-48` | Content sweep, not a template-only fix |
| Large images | `Error-Image_file_size_too_large.csv`: 50 image URLs; links file has 164 inlinks | Mostly blog/tag/category pages; top examples are 3-4 MB Webflow GIF/PNG assets | Content image URLs are absolute Webflow/R2 URLs by schema (`src/content.config.ts:28-35`); source pages are mostly `src/content/blog/*` references | Broad asset optimization, not first low-hanging unless targeting top repeated assets |

#### Redirect-in-sitemap hypothesis: proved, with one important correction

The hypothesis was basically right: the 11 `Error-3XX_redirect_in_sitemap.csv` rows are exactly the stale Ray Summit MLOps redirects. But the worse detail is that the redirect destinations are also stale: every one points to a slug that no longer exists in `src/content/mlops-database`.

Mechanism, step by step:

1. `src/pages/mlops-database/[slug].astro:17-68` returns normal MLOps entries plus 11 synthetic stale redirect routes from `staleRaySummitRedirects`.
2. Those synthetic routes call `Astro.redirect(redirectTo, 301)` at `src/pages/mlops-database/[slug].astro:72-74`.
3. The same 11 pairs are also duplicated as Cloudflare Pages redirect rules in `public/_redirects:90-134`.
4. Astro sitemap is enabled in `astro.config.ts:23-44`; the filter excludes utility paths, RSS feeds, success pages, and `/404`, but it does not exclude these synthetic MLOps redirect routes.
5. The real content slugs have drifted. Example: the redirect target for CloudKitchens is `/mlops-database/cloudkitchens-ray-powered-ml-platform-an-overview-of-cloudkitchenss-ray-powered-ml-platform-ray-summit-2024`, but the actual content slug is `cloudkitchens-ray-powered-ml-platform-ray-based-ml-platform-modernization-with-unified-compute-layer-and-ray-control-pla` in `src/content/mlops-database/cloudkitchens-ray-powered-ml-platform-ray-based-ml-platform-modernization-with-unified-compute-layer-and-ray-control-pla.md:2-4`. Same pattern for Spotify (`src/content/mlops-database/spotify-next-gen-ai-infrastructure-multi-cluster-ray-scaling-for-generative-ai-on-kubernetes-queue-based-gang-gpu-schedu.md:2-4`) and the Ray Summit panel (`src/content/mlops-database/ray-summit-ml-platform-on-ray-panel-on-adopting-ray-for-ml-platforms-replacing-spark-scaling-deep-learning-and-integrati.md:2-4`).

So the crawler story is: sitemap hands Ahrefs an old Ray Summit URL; the site says “go over there”; “there” is no longer a real page; Ahrefs records both a redirect-in-sitemap and a broken redirect/404.

#### Low-hanging fixes vs. broader work

##### Stage 1 — smallest high-confidence crawl fixes

1. **Fix the 11 MLOps Ray Summit redirect pairs in both places.**
   Update `staleRaySummitRedirects` in `src/pages/mlops-database/[slug].astro:20-68` and the duplicated rules in `public/_redirects:90-134` to point at the actual current content slugs, or remove these synthetic Astro paths and keep only correctly targeted Cloudflare redirects. Also add a sitemap filter pattern in `astro.config.ts:23-44` if redirect-only routes remain generated.

2. **Fix the one hardcoded broken integration image.**
   Replace/upload the image URL at `src/pages/integrations/index.astro:174-183`. Because that one `<img>` appears on `/integrations` plus query-filtered variants, one source change should clear all 18 broken-image links.

3. **Fix the two concrete broken content links.**
   - In `src/content/blog/llmops-in-production-another-419-case-studies-of-what-actually-works.md:50`, change the duplicated `...-6bnir-6bnir` link to the actual existing slug `...-6bnir`, confirmed in `src/content/llmops-database/building-an-autonomous-ai-software-engineer-with-advanced-codebase-understanding-and-specialized-model-training-6bnir.md:1-4`.
   - In `src/content/blog/using-zenml-with-llms-to-analyze-your-databases-a-case-study-with-you-tldr-com-and-supabase-gpt-4.md:98`, change `https://zenml.io/project/supabase-openai-summary` to a working target. The old project content exists only as draft legacy content (`src/content/old-projects/supabase-openai-summary.md:1-4`), and there is no `src/pages/project/[slug].astro`; current project pages live under `src/pages/projects/`.

4. **Fix five HTTP internal links in four blog posts.**
   Replace `http://docs.zenml.io/`, `http://zenml.io/`, `http://zenml.io/slack`, and `http://zenml.io/slack-invite` with HTTPS/relative equivalents. Verified source examples: `src/content/blog/zenml-your-open-source-path-forward-after-cnvrg-io.md:104-108`, `src/content/blog/why-you-should-be-using-caching-in-your-machine-learning-pipelines.md:96`, `src/content/blog/why-ml-should-be-written-as-pipelines-from-the-get-go.md:105`.

5. **Change the three bare-domain Slack CTAs.**
   `src/lib/footer.ts:218-221`, `src/lib/homepage.ts:400-405`, and `src/lib/pricing.ts:432-436` use `https://zenml.io/slack*`, which creates a bare-domain → `www` → final destination chain. Use `/slack` if the intent is to keep the internal redirect endpoint, or the final Slack invite URL if the intent is to avoid the redirect warning entirely.

##### Stage 2 — template improvements that clear many warnings

1. **Add a real H1 to blog listing pages.**
   `src/pages/blog/index.astro:64-121` and `src/pages/blog/page/[page].astro:68-108` have no `<h1>`. Keep `BlogHero` as `<h2>` (`src/components/blog/BlogHero.astro:77-82`) and add a page-level “ZenML Blog” / “ZenML Blog — Page N” H1, visually hidden if design must stay unchanged.

2. **Improve generated taxonomy/listing descriptions.**
   Short meta descriptions cluster around taxonomy pages (`/tags/*`, `/llmops-tags/*`, `/mlops-tags/*`, `/integrations/*`). Start with templates like `src/pages/llmops-tags/[slug].astro:34-38` and the blog listing pages before touching hundreds of content files.

3. **Add SEO length reporting, not automatic truncation at first.**
   `src/lib/seo.ts:63-96` passes titles/descriptions through as-is. Automatic truncation could produce ugly or misleading SERP snippets. A safer first step is build-time reporting for over-60-character titles and over-160-character descriptions, then targeted edits to high-traffic pages.

##### Stage 3 — content and asset sweeps

1. **Demote body-level H1s in affected blog and LLMOps content.**
   The page templates already emit the page H1 (`BlogLayout.astro:166-170`; `src/pages/llmops-database/[slug].astro:102-104`). Body markdown should not add another top-level `#`. Change body `#` headings to `##` outside code fences for the 22 blog posts and 17 LLMOps entries listed by Ahrefs.

2. **Reduce generated tag page size.**
   `/llmops-tags/prompt-engineering` and `/llmops-tags/monitoring` are oversized because the tag route renders every matching entry in one response (`src/pages/llmops-tags/[slug].astro:23-30`, `src/pages/llmops-tags/[slug].astro:77-98`). Treat this as a pagination/design decision, not a one-line SEO tweak.

3. **Optimize large content images by repetition and traffic.**
   `Error-Image_file_size_too_large-links.csv` shows 164 inlinks, mostly from blog/tag/category pages. Start with repeated 3+ MB assets such as release images and GIFs; use the R2 upload workflow from `AGENTS.md` rather than editing image URLs inline without verifying 200 responses.

#### Risks / things not to change blindly

- **Do not delete all redirects just because Ahrefs reports redirect links.** `/slack` and `/roadmap` are intentional shortlinks in `public/_redirects:141-146`. Removing them would break shared URLs. Decide whether SEO cleanliness is worth replacing global links with final external destinations.
- **Do not only change `public/_redirects` for the Ray Summit issue.** The same stale map exists in `src/pages/mlops-database/[slug].astro:20-68`; if that stays, Astro can keep generating redirect-only static paths and sitemap entries.
- **Do not hand-edit generated `dist/` files.** Source lives under `src/` and `public/`; `dist/` is build output.
- **Do not treat `/cdn-cgi/l/email-protection` as a normal source link.** Source templates use `mailto:` links (`src/pages/team/[slug].astro:49-53`, `src/pages/author/[slug].astro:66-70`). Ahrefs is seeing Cloudflare’s email-obfuscation rewrite. Fix at Cloudflare configuration/Ahrefs ignore level, or deliberately change the site’s email-link strategy.
- **Do not truncate all SEO titles/descriptions blindly.** The long metadata is mostly content-generated and often meaningful. Build a report/validation check first; then change high-traffic examples and the templates that create repeated short descriptions.
- **Do not commit anything from `design/`.** The audit export is in `design/`, which `AGENTS.md` explicitly says is internal/gitignored.


## Investigation Log

### Phase 1 - Export shape and first triage
**Hypothesis:** The audit can be divided into small concrete fixes vs. larger content/template work by grouping issue CSVs and mapping their URLs to Astro routes/content/templates.

**Findings:** The export contains 66 CSV files plus `index.txt`. CSVs are UTF-16. Row counts show several massive link-to-redirect/title/meta-description groups, but a much smaller number of high-priority hard errors: 14 404/4XX pages, 37 indexable pages linking to broken pages, 18 pages with a broken image, 1 broken image URL, 11 redirects in sitemap, 4 HTTPS pages linking to HTTP URLs, 2 pages over Googlebot's 2 MB crawl limit, and 16 orphan indexable pages.

**Evidence:** Local export file list in `design/zenml w subdomains_05-may-2026_all-issues_2026-05-06_16-56-25/index.txt`; row-count script run against all `*.csv` files with `encoding='utf-16'`.

**Conclusion:** Confirmed: the plan should not simply say “fix all 66 files in order.” It should stage by SEO risk and implementation leverage: hard crawl/link breakage first, then sitemap/canonical/indexability, then templated metadata/title/H1 fixes, then content-scale/page-size/image optimization.

## Root Cause

The Ahrefs audit issues are not caused by one single SEO defect. They fall into several concrete root-cause clusters:

1. **Migration-era redirects drifted from current content slugs.** The MLOps Ray Summit stale-slug redirects are duplicated in Astro route generation and Cloudflare `_redirects`. Their targets no longer match current `src/content/mlops-database` slugs, so Ahrefs sees redirect-in-sitemap, broken redirect, and 404 issues.
2. **Redirect-only Astro routes are being treated like generated site pages.** The sitemap filter excludes known utility/noindex paths, but it does not exclude the synthetic MLOps redirect-only routes. This allows redirecting URLs to appear in the sitemap.
3. **Global shared chrome amplifies redirect warnings.** Navigation/footer/homepage/pricing contain Slack and roadmap links that redirect. Because nav/footer are rendered across most pages, one intentional redirecting link becomes thousands of Ahrefs “links to redirect” rows.
4. **A small number of stale content links and hardcoded asset URLs remain from migration.** Examples include the old `/project/supabase-openai-summary` link, a few `http://zenml.io` / `http://docs.zenml.io` links, and one broken integrations CTA image.
5. **Large content collections produce metadata and heading-quality issues at scale.** LLMOps, MLOps, and blog content often carries long SEO titles/descriptions or body-level H1 headings. These are content-governance problems, not mostly template bugs.
6. **Some audit rows come from crawler/environment behavior outside normal source links.** Cloudflare email obfuscation creates `/cdn-cgi/l/email-protection` URLs that Ahrefs reports as broken, even though source templates emit `mailto:` links.

## Recommendations

Prioritize fixes by crawl impact and implementation risk.

### First PR: hard crawl/link fixes

1. Correct or remove the 11 MLOps Ray Summit synthetic redirects in `src/pages/mlops-database/[slug].astro`.
2. Correct the matching Cloudflare redirects in `public/_redirects`.
3. Ensure redirect-only MLOps URLs do not appear in the sitemap, either by no longer generating those Astro paths or by explicitly filtering them in `astro.config.ts`.
4. Replace the broken hardcoded integrations image in `src/pages/integrations/index.astro` with a verified working asset.
5. Fix the small set of concrete broken/HTTP content links identified in the audit.
6. Replace bare-domain Slack CTA links that create `zenml.io` → `www.zenml.io` → final-destination chains. Do not blindly remove intentional `/slack` and `/roadmap` shortlinks unless product/marketing agrees.

### Second PR: template-level SEO fixes

1. Add a real H1 to `/blog` and `/blog/page/N`.
2. Improve short generated meta descriptions for taxonomy/listing pages where one template affects many URLs.
3. Add reporting for title length, meta-description length, and body-level H1s rather than automatically truncating content.

### Later work: content and asset cleanup

1. Use Ahrefs CSVs and validation scripts to prioritize high-traffic or high-inlink title/meta rewrites.
2. Demote markdown body `#` headings to `##` where templates already provide page H1s.
3. Optimize repeated large images and broken image URLs through the established R2/static asset workflow.
4. Decide product/SEO strategy for oversized LLMOps tag pages: pagination, partial rendering, noindex, or another UX change.
5. Treat Cloudflare email-obfuscation findings separately from source-code broken links.

## Preventive Measures

- Extend redirect verification so CI catches internal redirect targets that do not resolve to real generated pages.
- Add a sitemap sanity check: sitemap URLs should resolve as 200, indexable, canonical pages only — no redirects, no noindex pages, no 404s.
- Keep redirect rules single-sourced where possible. Avoid duplicating the same redirect map in both Astro route generation and `public/_redirects`.
- Add content validation/reporting for canonical host/path, title length, meta-description length, body-level H1s, HTTP internal links, broken internal links, and Webflow/R2 image URL health where feasible.
- Add a shared-link audit for global nav/footer/homepage/pricing links because one stale global link creates sitewide Ahrefs amplification.
- Before publishing large generated collections, run a crawl/sitemap check against built output and compare generated routes, sitemap entries, redirects, canonical URLs, and noindex pages.
- Document intentional shortlinks (`/slack`, `/roadmap`, etc.) so future SEO work does not remove useful product/community redirects blindly.
