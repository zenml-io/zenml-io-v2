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
| API | `/api/{get-started,waitlist,newsletter}` | `/api/{get-started,waitlist,newsletter}` (ported; same paths) |
| Assets | `assets.kitaru.ai/*` (R2 bucket) | `assets.zenml.io/*` after image migration (currently hotlinked) |

---

## 3. Inventory checklist

Before activating Phase 10, complete each of the following. **Do not check off in this doc — replace placeholders with real data and commit.**

### 3.1 Full URL crawl

- [ ] Crawl `https://kitaru.ai/` (e.g. Screaming Frog free tier, 500 URL limit ought to cover it). Export to `docs/kitaru-seo-inventory.csv` with columns: `url`, `status`, `title`, `meta_description`, `canonical`, `inbound_link_count`.
- [ ] Cross-check against Cloudflare Pages deployment for kitaru.ai — anything in `/dist` not in the crawl? (orphans)
- [ ] Verify each crawled URL has a mapped target in §4 below.

### 3.2 Backlink snapshot

- [ ] Pull from Ahrefs / Semrush (one-time export). Save as `docs/kitaru-backlinks.csv` (gitignored — sensitive). Note in this doc:
  - Top 10 referring domains
  - Any backlink → URL that doesn't have a redirect mapped (these would 404 post-cutover)

### 3.3 Traffic snapshot

- [ ] Plausible (or whatever kitaru.ai uses) — last 90 days. Per-page visitors. Save total + top 20 pages.
- [ ] Any page > 100 visitors/mo must have its URL preserved or 301'd, per the Webflow rule (`MERGE_PLAN.md §9`).

### 3.4 Social / share preview audit

- [ ] For every kitaru.ai page that gets shared (blog posts, /product/kitaru equivalent, compare pages): screenshot the current OG card. Compare to the zenml.io target. Note any cards that would degrade.
- [ ] Twitter Card Validator + LinkedIn Post Inspector on the 5–10 highest-traffic kitaru.ai pages.

### 3.5 R2 / asset migration

- [x] **DONE.** All 30 unique kitaru-assets R2 keys mirrored to zenml-assets (server-side copy via wrangler) preserving the same key paths. Source rewritten `assets.kitaru.ai` → `assets.zenml.io` across 18 files. `kitaru-assets` bucket left intact so the live kitaru.ai site keeps working until the DNS cutover.
- [ ] Post-cutover: GC the `kitaru-assets` R2 bucket once kitaru.ai 301s are confirmed working and no inbound social cards / backlinks point at the old domain.

---

## 4. Redirect mapping

Final structure for Cloudflare DNS-level rules. **Fill once §3.1 crawl is in.**

```
# kitaru.ai → zenml.io  (301, permanent)

## Root + marketing
kitaru.ai/                             → zenml.io/product/kitaru
kitaru.ai/pricing                      → zenml.io/pricing
kitaru.ai/book-a-demo                  → zenml.io/book-your-demo
kitaru.ai/newsletter                   → zenml.io/  (or wherever newsletter signup lives)
kitaru.ai/404                          → zenml.io/404

## Blog (1:1 by slug; verify each)
kitaru.ai/blog/agents-are-not-microservices              → zenml.io/blog/agents-are-not-microservices
kitaru.ai/blog/agents-need-more-than-traces              → zenml.io/blog/agents-need-more-than-traces
kitaru.ai/blog/anatomy-of-a-production-agent             → zenml.io/blog/anatomy-of-a-production-agent
kitaru.ai/blog/building-a-news-scout-on-kitaru           → zenml.io/blog/building-a-news-scout-on-kitaru
kitaru.ai/blog/from-pipelines-to-agents                  → zenml.io/blog/from-pipelines-to-agents
kitaru.ai/blog/from-zenml-to-kitaru                      → zenml.io/blog/from-zenml-to-kitaru
kitaru.ai/blog/kitaru-agents-now-have-memory             → zenml.io/blog/kitaru-agents-now-have-memory
kitaru.ai/blog/kitaru-open-source                        → zenml.io/blog/kitaru-open-source
kitaru.ai/blog/no-journal-replay                         → zenml.io/blog/no-journal-replay
kitaru.ai/blog/the-runtime-layer-underneath-your-agent-stack → zenml.io/blog/the-runtime-layer-underneath-your-agent-stack
kitaru.ai/blog/why-agents-need-durable-execution         → zenml.io/blog/why-agents-need-durable-execution

## Compare (1:1 by slug)
kitaru.ai/compare/kitaru-vs-temporal              → zenml.io/compare/kitaru-vs-temporal
kitaru.ai/compare/kitaru-vs-restate               → zenml.io/compare/kitaru-vs-restate
kitaru.ai/compare/kitaru-vs-inngest               → zenml.io/compare/kitaru-vs-inngest
kitaru.ai/compare/kitaru-vs-dbos                  → zenml.io/compare/kitaru-vs-dbos
kitaru.ai/compare/kitaru-vs-langgraph-deep-agents → zenml.io/compare/kitaru-vs-langgraph-deep-agents
kitaru.ai/compare/kitaru-vs-openai-agents-sdk     → zenml.io/compare/kitaru-vs-openai-agents-sdk
kitaru.ai/compare/kitaru-vs-claude-agent-sdk      → zenml.io/compare/kitaru-vs-claude-agent-sdk
kitaru.ai/compare/kitaru-vs-pydantic-ai           → zenml.io/compare/kitaru-vs-pydantic-ai

## Docs — keep as-is for now (D2)
kitaru.ai/docs/*                       → kitaru.ai/docs/*   (no redirect; docs still live there)

## API — port paths preserved
kitaru.ai/api/get-started              → zenml.io/api/get-started   (POST passthrough)
kitaru.ai/api/waitlist                 → zenml.io/api/waitlist
kitaru.ai/api/newsletter               → zenml.io/api/newsletter

## Catch-all
kitaru.ai/*                            → zenml.io/product/kitaru   (last-resort, only after all above lines)
```

**Caveats:**

1. **POST passthrough on API routes.** Cloudflare 301 turns POST into GET by default. For `/api/*`, use a 307 or 308 instead, OR have the kitaru.ai worker reverse-proxy directly to zenml.io's endpoint (preserves method + body).
2. **Wildcard order matters.** Specific rules must precede the catch-all.
3. **Trailing slash policy.** zenml.io is `trailingSlash: never` (see `astro.config.ts`). Make sure redirect rules strip trailing slashes from `kitaru.ai/foo/` → `zenml.io/foo`.

---

## 5. Pre-flight checklist

Before activating any redirect:

- [ ] All 11 blog posts return HTTP 200 on zenml.io (verified locally: ✅ as of 2026-05-17)
- [ ] All 8 compare-kitaru pages return HTTP 200 on zenml.io
- [ ] `/product/kitaru` returns HTTP 200 with Kitaru-branded OG image (currently missing — see Phase 2b known gaps)
- [ ] `/api/get-started`, `/api/waitlist`, `/api/newsletter` are bound to KV namespaces in Cloudflare Pages dashboard
- [ ] All cover images migrated from `assets.kitaru.ai` → zenml R2 (or CNAME aliased)
- [ ] Plausible `surface` prop verified flowing on `/product/kitaru` and `/compare/kitaru-vs-*` in production
- [ ] Segment loader confirmed picking Kitaru write key (`MMarT0XoV4LJH8wR7wpmkTbF7txc9Bsg`) on `surface=agent` pages in production
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
