# Kitaru → ZenML SEO Inventory & Redirect Audit (Phase 10a)

> **Status:** Scaffolded, not crawled. Fill in before activating Phase 10.
> **Owner:** TBD
> **Trigger:** D16 — Phase 10 cannot fire until this doc is complete and reviewed.
> **Precedent:** `docs/MIGRATION.md` (Webflow → Astro cutover, Feb 2026).

---

## 1. Why this exists

The Webflow → Astro migration's biggest save was a pre-cutover URL inventory: every published page, every backlink, every redirect mapped before DNS flipped. The same exercise is overdue for kitaru.ai → zenml.io.

Without it, Phase 10's "DNS-level 301s from kitaru.ai → zenml.io/product/kitaru" turns into an ad-hoc fire drill: backlinks get dropped, blog posts 404 on Hacker News, social cards break. The Webflow run avoided that. Don't regress.

---

## 2. Scope

Three URL classes on kitaru.ai today:

| Class | Examples | Target on zenml.io |
|-------|----------|--------------------|
| Marketing | `/`, `/pricing`, `/book-a-demo`, `/newsletter` | `/product/kitaru` / `/pricing` / `/book-your-demo` |
| Blog | `/blog/*` (10 posts as of 2026-05-17) | `/blog/<slug>` (Phase 5; 11/10 done counting `kitaru-launch`) |
| Compare | `/compare/kitaru-vs-*` (8 pages) | `/compare/kitaru-vs-*` (Phase 3 done) |
| Docs | `/docs/*` | **Stays external on kitaru.ai for now** (D2-adjacent — docs migration is out of scope for this merge). Redirect `/docs/*` → `https://kitaru.ai/docs/*` is a no-op until docs move. |
| API | `/api/{get-started,waitlist,newsletter}` | Not ported (D5 superseded). Anyone POSTing to `kitaru.ai/api/*` from an old form embed gets a 404 post-cutover; expected to be ~zero traffic but worth a Cloudflare access-log scan during the freeze window. |
| Assets | `assets.kitaru.ai/*` (R2 bucket) | `assets.zenml.io/*` after image migration (currently hotlinked) |

---

## 3. Inventory checklist

Before activating Phase 10, complete each of the following. **Do not check off in this doc — replace placeholders with real data and commit.**

### 3.1 Full URL crawl

- [x] **DONE** (2026-05-26). Sourced from `https://kitaru.ai/sitemap-0.xml` (26 marketing URLs) + `https://kitaru.ai/docs/sitemap.xml` (168 docs URLs). All 26 marketing URLs HEAD-checked live (all 200). Cross-checked each against this branch — 23/26 already have a working target on this branch. **3 URLs on kitaru.ai have no target on zenml.io yet** (see §3.6). The 168 `/docs/*` URLs stay on kitaru.ai per D2 (Kitaru docs are a separate Next.js app, not migrated in this merge).

  **Marketing URL breakdown:**

  | Bucket | Count | Notes |
  |---|---|---|
  | Root + marketing | 4 | `/`, `/book-a-demo/`, `/newsletter/`, `/pricing/` |
  | Blog | 11 | 10 have targets on this branch; `where-durable-execution-is-headed` missing |
  | Compare | 11 | 8 have targets; `kitaru-vs-crewai`, `kitaru-vs-hatchet` missing (plus the `/compare/` index, which 200s) |

  **Trailing-slash note:** all kitaru.ai URLs have trailing slashes; zenml.io is `trailingSlash: never`. The Cloudflare rules must strip slashes during the rewrite (see Caveats in §4).

### 3.2 Backlink snapshot

- [x] **DONE** (2026-05-27). Ahrefs export, 45 backlinks total, all targeting `kitaru.ai`. Result: **zero new 404s introduced by the cutover.** The combination of the homepage redirect (catches the bulk of `/` backlinks) plus `/docs/*` preserved on kitaru.ai (D2) catches every meaningful inbound link.

  **Top 10 referring domains:** notion.site, pydantic.dev, kagi.com, skillsmp.com, zenml.io, project-awesome.org, eu-recruit.com, free2aitools.com, flanigan.us, conduid.com.

  **Crown-jewel referrers — all resolve cleanly post-cutover:**

  | DR | Referrer | Target on kitaru.ai | Post-cutover |
  |---:|---|---|---|
  | 92 | zenml.notion.site | `/` | 301 → /product/kitaru |
  | 81 | **pydantic.dev** | `/docs/guides/pydantic-ai-adapter/`, `/docs/guides/news-scout/`, `/` | docs preserved + homepage redirect |
  | 78 | **kagi.com** | `/` | 301 → /product/kitaru |
  | 61 | www.zenml.io | `/`, `/docs/deploy/docker/` | both fine |
  | 53 | project-awesome.org | `/`, `/docs` | both fine |

  **4 backlinks landed on URLs that never existed on kitaru.ai** (so they were 404s before the cutover too — not a regression):

  | Referrer (DR) | Target | Status |
  |---|---|---|
  | conduid.com (7) | `/roadmap` | 404 pre- and post-cutover |
  | conduid.com (7) | `/community` | 404 pre- and post-cutover |
  | skillavatars.com (0) | `/roadmap` | 404 pre- and post-cutover |
  | skillavatars.com (0) | `/community` | 404 pre- and post-cutover |

  **Conclusion:** Phase 10a §3.2 closes clean. The cutover preserves every real inbound link-equity vector. No high-DR referrers affected. Source CSV at `~/Downloads/kitaru-backlinks.csv` (not committed — Ahrefs license sensitive).

### 3.3 Traffic snapshot

- [x] **DONE** (2026-05-27). Plausible export covering 2026-04-29 → 2026-05-26 (28-day window plus 2-month carry-over, ~90 days). 993 total visitors, 100 unique pages.

  **Traffic concentration** (~80% of all visitors land here):

  | Page | Visitors (90d) | Approx /mo | Mapped target |
  |---|---:|---:|---|
  | `/` | 359 | ~120 | `/product/kitaru` ✓ |
  | `/docs/*` (74 paths combined) | 444 | ~150 | Stays on kitaru.ai (D2) — no redirect |
  | `/pricing/` | 33 | ~11 | `/pricing` ✓ |
  | `/blog/` | 23 | ~8 | `/blog` ✓ |
  | `/compare/` | 19 | ~6 | `/compare` ✓ |
  | `/newsletter/` | 19 | ~6 | `/newsletter-signup` ✓ |
  | `/book-a-demo/` | 15 | ~5 | `/book-your-demo` ✓ |
  | `/blog/from-zenml-to-kitaru/` | 10 | ~3 | `/blog/from-zenml-to-kitaru` ✓ |
  | `/blog/the-runtime-layer-underneath-your-agent-stack/` | 10 | ~3 | ✓ |
  | `/compare/kitaru-vs-temporal/` | 9 | ~3 | ✓ |

  **Webflow rule (>100 visitors/mo must be preserved or 301'd):** only `/` clears that bar by itself. It's the most important rule in the map and it points to `/product/kitaru` already.

  **Two unmapped pages with traffic:**
  - `/blog/kitaru-agents-now-have-memory/` — **4 visitors/90d** to a post we deleted on 2026-05-17. Added a soft-landing redirect → `/blog` (the index) in `kitaru-redirect-map.csv`. Better than a 404 even at small volume.
  - `/comapre/` + `/comapre/kitaru-vs-inngest/` — **3 visitors/90d** combined; clear `compare` typo (bots / fat fingers). Skipped — letting these 404 is fine.

  **Conclusion:** the redirect map covers every kitaru.ai page that gets meaningful organic traffic. The remaining traffic story for Phase 10 is the docs traffic (444/90d) — D2 keeps that on kitaru.ai unchanged.

### 3.4 Social / share preview audit

- [ ] For every kitaru.ai page that gets shared (blog posts, /product/kitaru equivalent, compare pages): screenshot the current OG card. Compare to the zenml.io target. Note any cards that would degrade.
- [ ] Twitter Card Validator + LinkedIn Post Inspector on the 5–10 highest-traffic kitaru.ai pages.

### 3.6 Content gaps — kitaru.ai pages with no target on this branch

- [x] **DONE** (2026-05-26). All three previously-missing pages ported:
  - `/blog/where-durable-execution-is-headed` — Phase 5 pattern (MDX → MD; frontmatter remapped to `blogSchema`, `category: "kitaru"`, 4 inline images mirrored to `zenml-assets`).
  - `/compare/kitaru-vs-crewai` — Phase 3 designer pattern (`.mdx` preserved; per-competitor graphics in `src/components/compare/kitaru/graphics/crewai/{RuntimeLayer,CheckpointReplay,SelfHostedRuntime,HarnessFreedom}.astro`; logo at `public/compare/crewai.svg`; OG card mirrored).
  - `/compare/kitaru-vs-hatchet` — same designer pattern (`graphics/hatchet/{RuntimeVsPlatform,LlmLineage,ReplayOverrides}.astro`; `public/compare/hatchet.svg`; OG card mirrored).
- All three return HTTP 200 on the dev server; `/compare` index lists the new compares.
- Branch now covers 26/26 kitaru.ai marketing URLs (plus the 168 `/docs/*` URLs which stay on kitaru.ai per D2).

### 3.5 R2 / asset migration

- [x] **DONE.** All 30 unique kitaru-assets R2 keys mirrored to zenml-assets (server-side copy via wrangler) preserving the same key paths. Source rewritten `assets.kitaru.ai` → `assets.zenml.io` across 18 files. `kitaru-assets` bucket left intact so the live kitaru.ai site keeps working until the DNS cutover.
- [ ] Post-cutover: GC the `kitaru-assets` R2 bucket once kitaru.ai 301s are confirmed working and no inbound social cards / backlinks point at the old domain.

---

## 4. Redirect mapping

Verified against the 2026-05-26 sitemap crawl. Every source URL below was confirmed live (HTTP 200) on kitaru.ai; every target was confirmed live on this branch *except* the 3 in §3.6 (marked ⚠ — port before cutover).

Format: each line uses `path` rather than full URLs so it slots into Cloudflare Bulk Redirects directly (List → Redirect rules → CSV with `source_url`, `target_url`, `status_code: 301`, `preserve_query_string: true`).

```
# kitaru.ai → zenml.io  (301, permanent)
# Note: kitaru.ai sitemap uses trailing slashes; targets below DROP the
# trailing slash because zenml.io is trailingSlash: 'never'.

## Root + marketing (4)
kitaru.ai/                                                      → zenml.io/product/kitaru
kitaru.ai/pricing/                                              → zenml.io/pricing
kitaru.ai/book-a-demo/                                          → zenml.io/book-your-demo
kitaru.ai/newsletter/                                           → zenml.io/newsletter-signup

## Blog (11 — 1:1 by slug; ⚠ where-durable-execution-is-headed not yet ported)
kitaru.ai/blog/                                                 → zenml.io/blog
kitaru.ai/blog/agents-are-not-microservices/                    → zenml.io/blog/agents-are-not-microservices
kitaru.ai/blog/agents-need-more-than-traces/                    → zenml.io/blog/agents-need-more-than-traces
kitaru.ai/blog/anatomy-of-a-production-agent/                   → zenml.io/blog/anatomy-of-a-production-agent
kitaru.ai/blog/from-pipelines-to-agents/                        → zenml.io/blog/from-pipelines-to-agents
kitaru.ai/blog/from-zenml-to-kitaru/                            → zenml.io/blog/from-zenml-to-kitaru
kitaru.ai/blog/kitaru-open-source/                              → zenml.io/blog/kitaru-open-source
kitaru.ai/blog/no-journal-replay/                               → zenml.io/blog/no-journal-replay
kitaru.ai/blog/the-runtime-layer-underneath-your-agent-stack/   → zenml.io/blog/the-runtime-layer-underneath-your-agent-stack
kitaru.ai/blog/where-durable-execution-is-headed/               → zenml.io/blog/where-durable-execution-is-headed  ⚠
kitaru.ai/blog/why-agents-need-durable-execution/               → zenml.io/blog/why-agents-need-durable-execution
kitaru.ai/blog/kitaru-agents-now-have-memory/                   → zenml.io/blog   (deleted post; soft landing on index — 4 visitors/90d)

## Compare (11 — 1:1 by slug; ⚠ kitaru-vs-crewai + kitaru-vs-hatchet not yet ported)
kitaru.ai/compare/                                              → zenml.io/compare
kitaru.ai/compare/kitaru-vs-claude-agent-sdk/                   → zenml.io/compare/kitaru-vs-claude-agent-sdk
kitaru.ai/compare/kitaru-vs-crewai/                             → zenml.io/compare/kitaru-vs-crewai  ⚠
kitaru.ai/compare/kitaru-vs-dbos/                               → zenml.io/compare/kitaru-vs-dbos
kitaru.ai/compare/kitaru-vs-hatchet/                            → zenml.io/compare/kitaru-vs-hatchet  ⚠
kitaru.ai/compare/kitaru-vs-inngest/                            → zenml.io/compare/kitaru-vs-inngest
kitaru.ai/compare/kitaru-vs-langgraph-deep-agents/              → zenml.io/compare/kitaru-vs-langgraph-deep-agents
kitaru.ai/compare/kitaru-vs-openai-agents-sdk/                  → zenml.io/compare/kitaru-vs-openai-agents-sdk
kitaru.ai/compare/kitaru-vs-pydantic-ai/                        → zenml.io/compare/kitaru-vs-pydantic-ai
kitaru.ai/compare/kitaru-vs-restate/                            → zenml.io/compare/kitaru-vs-restate
kitaru.ai/compare/kitaru-vs-temporal/                           → zenml.io/compare/kitaru-vs-temporal

## Docs (168 URLs) — stay on kitaru.ai (D2)
# Kitaru docs are a separate Next.js app and are NOT being migrated as part
# of this merge. Robots.txt on kitaru.ai will keep pointing at
# https://kitaru.ai/docs/sitemap.xml and the docs paths keep resolving.
# The catch-all rule below MUST exempt /docs/* — see Caveats.
kitaru.ai/docs/*                                                → (no redirect; serves from kitaru.ai)

## API — no longer ported (D5 superseded)
# kitaru.ai/api/{get-started,waitlist,newsletter} → 404 post-cutover.
# Pre-cutover: scan Cloudflare access logs for residual POST traffic; if any,
# add a 410 (Gone) rule or front a stub responder. Expected to be ~zero.

## No catch-all (intentional)
# Phase 10 cutover deployment decision (2026-05-27):
# Cloudflare's http_request_dynamic_redirect (zone-level Single Redirects) fires
# BEFORE http_request_redirect (account-level Bulk Redirects) in practice, despite
# documented phase order claiming the opposite. A zone-level catch-all would
# override every literal Bulk Redirect rule. Combined with the Free-plan limit of
# 10 rules in http_request_dynamic_redirect, putting all 27 + catch-all as
# Single Redirects was also impossible.
#
# Resolution: deploy only the 27 literal redirects via Bulk Redirects, no catch-all.
# Per Plausible audit (Phase 10a §3.3), virtually zero traffic to non-listed URLs
# (3 visitors over 90 days, all typo URLs). 404 is a better SEO signal than
# redirecting unknowns to a wrong destination.
```

## Deployment recipe (what actually shipped)

1. **Bulk Redirects list** (`kitaru_ai_redirects`) at account level — 27 items from `docs/kitaru-redirect-map.csv`.
2. **Entrypoint ruleset** at account level on `http_request_redirect` phase — one rule with `expression: "http.request.full_uri in $kitaru_ai_redirects"` and `from_list` action referencing the list.
3. **Zone-level dynamic_redirect ruleset** on kitaru.ai — left as-is with only the original `www.kitaru.ai → kitaru.ai` template rule. No catch-all added.
4. `/docs/*` is preserved automatically because the Bulk Redirects list doesn't include docs paths and no catch-all overrides them.

**Caveats:**

1. **Wildcard order matters.** Specific rules must precede the catch-all. `/docs/*` must be excluded from the catch-all (Cloudflare Bulk Redirects supports a "Do not redirect" rule for this — apply it before the wildcard).
2. **Trailing slash policy.** zenml.io is `trailingSlash: never` (see `astro.config.ts`). Cloudflare Bulk Redirects defaults to literal-match — the source URLs above include the trailing slash deliberately, and the targets drop it. If using regex-based rules instead, ensure the rewrite strips `/$`.
3. **Preserve query strings.** Set `preserve_query_string: true` on every rule so `?utm_*` tracking parameters survive the redirect.
4. **Subdomain hygiene.** kitaru.ai has no `www.` variant active today (sitemap confirms). After cutover the existing zone-level redirect (if any) should still send `www.kitaru.ai` to the canonical bare domain, which now redirects to zenml.io.

---

## 5. Pre-flight checklist

Before activating any redirect:

- [ ] All 11 blog posts return HTTP 200 on zenml.io (verified locally: ✅ as of 2026-05-17)
- [ ] All 8 compare-kitaru pages return HTTP 200 on zenml.io
- [ ] `/product/kitaru` returns HTTP 200 with Kitaru-branded OG image (currently missing — see Phase 2b known gaps)
- [x] ~~`/api/get-started`, `/api/waitlist`, `/api/newsletter` are bound to KV namespaces~~ — N/A, routes deleted (D5 superseded; Kitaru landing uses ZenML's `/book-your-demo` and Brevo newsletter flows).
- [ ] All cover images migrated from `assets.kitaru.ai` → zenml R2 (or CNAME aliased)
- [ ] Plausible `surface` prop verified flowing on `/product/kitaru` and `/compare/kitaru-vs-*` in production
- [x] ~~Segment loader confirmed picking Kitaru write key~~ — N/A, dual-key plan dropped (D4 superseded). Single ZenML write key flows from all surfaces; `surface` passed as a property on `analytics.page()`.
- [ ] Cloudflare CNAME or page-rule access for `kitaru.ai` confirmed (who controls the DNS today?)

Once all green: activate redirects, monitor 4xx rate for 24h, validate top backlinks resolve.

---

## 6. Post-cutover validation (the first 48h)

- [ ] Plausible `kitaru.ai` site (if Plausible was ever set up there) → 0 events. Plausible `zenml.io` → events arriving with `surface=agent` from referrer `kitaru.ai`.
- [ ] Twitter Card Validator on 5 top kitaru.ai URLs — all show zenml.io targets.
- [ ] Spot-check top 20 backlinks: resolve to 200 (not 404, not redirect chain > 1 hop).
- [ ] Cloudflare Analytics: 301 rate from kitaru.ai matches expected traffic shape.
- [ ] No spike in `/api/csp-report` (CSP misconfig from Kitaru's old script URLs).

---

## 7. Open questions

- Who owns the `kitaru.ai` DNS today? Cloudflare zone needs the redirect rules added by that owner.
- Does kitaru.ai have its own Plausible site? If yes, decide: archive its data, or stop tracking and redirect counts as zenml.io traffic.
- Newsletter list deduplication: is kitaru.ai's newsletter list separate from zenml.io's? If yes, merge or keep distinct? (MERGE_PLAN §10 open question carried over.)
