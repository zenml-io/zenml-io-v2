Here’s how I’m thinking about this, step by step:

1. A “Webflow site” is really two different things glued together:

* **A front-end bundle**: HTML/CSS/JS + interactions + assets.
* **A backend-ish content system**: CMS Collections + publishing state + (optionally) forms, search, localization, etc.

2. When you “rip Webflow out,” you’re deciding which of those two pieces you’re replacing, and **how**:

* Replace the front-end only (keep Webflow as the content backend for a while).
* Replace both front-end and CMS (full migration).

3. For ZenML specifically, you have two “content-heavy” systems: **blog** and **LLMOps database**. Those dominate the migration complexity, more than the marketing pages.

Below is a practical playbook: what to watch out for, what’s realistic to “vibe code,” and exactly how I’d start if I were assigned this.

---

## What to bear in mind when leaving Webflow

### 1) Webflow code export is not “a full site export”

Webflow’s code export gives you HTML/CSS/JS/assets, but it **does not** bring along Webflow’s backend features. In particular, **CMS-bound content won’t be in the exported pages**, collection lists render empty states, and collection template pages don’t include the bound content. Forms and site search also won’t work on an exported site. ([Webflow Help Center][1])

So, if someone says “export from Webflow and host it,” that only works for the purely static part of the site. For your blog and LLMOps database, you still need a content migration plan.

### 2) CMS content export is doable, but has sharp edges

You can export each Webflow CMS collection, and there are two main ways:

* **CSV export (from the Webflow UI)**

  * Rich text fields export as **HTML**.
  * Image and file fields export as **Webflow-hosted URLs**.
  * Multi-reference fields export as comma-separated values.
  * Export is **per locale view** (if you have localization). ([Webflow Help Center][2])
  * Important: if you delete the original Webflow site, those asset URLs can break, so you must keep the site as a backup or **download and re-host** assets. ([Webflow Help Center][2])

* **Data API export (programmatic)**
  You can list sites, collections, and items via API and pull everything into your repo/database. ([developers.webflow.com][3])
  You’ll need to respect API rate limits and pagination (limit max 100 per request). ([developers.webflow.com][4])

For a “rip everything out” migration, I strongly prefer the API route (more structured, more automatable), but I still like to also do a CSV export as a human-readable safety backup.

### 3) You must replace “Webflow services” you may not realize you’re using

Even if you’re only thinking “CMS + pages,” you will likely need equivalents for:

* **Forms**: Webflow forms won’t work on exported sites. ([Webflow Help Center][1])
* **Site search**: also won’t work. ([Webflow Help Center][1])
* **Redirect management**: you’ll need to recreate 301s on your new host (Vercel/Netlify/Cloudflare/etc).
* **Localization**: exported code doesn’t include localized pages/content. ([Webflow Help Center][1])
* **Asset hosting and optimization**: you’ll probably want your own image pipeline (or a CDN/image service).

This is where migrations usually blow up in scope if you don’t inventory it early.

### 4) Editorial workflow is the hidden requirement

Ask (internally) one question early:
**Who needs to edit what, and how often, without a developer?**

Because your storage choice depends on this:

* If only engineers edit: Markdown/MDX + PR workflow is great.
* If marketing needs to edit frequently: you probably want a headless CMS with an editor UI (or a Git-based CMS layer).

If you ignore this, you’ll finish the migration and then get stuck rebuilding “a mini CMS” afterward.

---

## Is Webflow API or MCP server usable for “ripping everything out”?

### Webflow Data API: yes, absolutely for CMS content

This is the straightforward route. Relevant endpoints:

* `GET /v2/sites` to find your site(s) ([developers.webflow.com][3])
* `GET /v2/sites/:site_id/collections` to list CMS collections ([developers.webflow.com][5])
* `GET /v2/collections/:collection_id/items` to list items (staged) ([developers.webflow.com][6])
* `GET /v2/collections/:collection_id/items/live` to list only published items ([developers.webflow.com][7])

Key operational constraints:

* Requests are rate-limited by site plan (for the Data API). ([developers.webflow.com][4])
* Pagination is offset/limit, max 100 per page. ([developers.webflow.com][8])
* Some endpoints have stricter limits (example: publish is 1 successful publish per minute). ([developers.webflow.com][4])
* Bulk operations have limits and file uploads are separate. ([developers.webflow.com][9])

If you’re doing a one-time export, rate limits are mainly a scripting concern (handle 429 with Retry-After). ([developers.webflow.com][4])

### Content Delivery API: useful if you keep Webflow as headless temporarily

If your migration plan is “custom front-end now, migrate CMS later,” Webflow explicitly supports a CDN-backed content delivery domain (`api-cdn.webflow.com`) meant for high-volume reads of published content, with caching and effectively no rate limits for cached responses. ([developers.webflow.com][10])

This can be a good transitional architecture: you decouple from Webflow’s front-end and hosting friction first, without forcing an immediate CMS move.

### Webflow MCP server: useful for automation, not necessary for extraction

Webflow now offers an MCP server that connects AI tools (Cursor, Claude, etc.) to Webflow, exposing Webflow APIs as “tools” your agent can call. ([developers.webflow.com][11])

For your specific goal (replatform content into your own stack):

* MCP can help you *explore* and *operate* Webflow via natural language, but
* it’s still basically an API wrapper, so you’ll want a deterministic export script anyway.

I’d treat MCP as a productivity booster, not the backbone of the migration.

---

## What this means for ZenML’s blog + LLMOps database

Looking at the public site:

* The **LLMOps Database** page has a tag-heavy filter UI and search, and the item pages have structured fields plus a long “Overview” style body. ([zenml.io][12])
* The **Blog** has lots of posts and categories, with list pagination. It also references the database size in the UI (it’s already in the 1k+ range). ([zenml.io][13])

So the key design decision is: **how will you model and query this data** once it’s not in Webflow?

### Recommended target data shapes (practical)

**Blog**

* Use `MDX` (or Markdown) for the body.
* Store metadata in frontmatter (title, date, author, tags, excerpt, canonical URL, cover image).
* This integrates beautifully with Next.js or Astro.

**LLMOps database**
You have two competing needs: structured query + rich narrative content.

A pattern that works well:

* Store each entry as **YAML/JSON for structured fields** (industry, company, year, link, tags, etc).
* Store the long-form description as **MDX/Markdown** (or a separate rich-text field if you use a headless CMS).
* Generate a “search index” artifact at build time.

If you want external contributions, file-based content (PRs) is a big win. If you need non-dev editing, headless CMS wins.

---

## Migration strategies that don’t wreck you

### Strategy A: “Strangler” migration (my default recommendation)

1. **Build the new site** (Next.js/Astro/etc) and deploy it under the same domain behind routing rules.
2. Start by migrating the **LLMOps database + blog**, since these are the painful parts.
3. Keep the remaining Webflow marketing pages temporarily (or recreate them gradually).

This reduces risk because you don’t need a “big bang” full redesign + full content migration + SEO cutover all at once.

### Strategy B: Full cutover (doable, but requires discipline)

* Export code + export CMS + rebuild all missing platform features (forms/search/localization) before going live.

This is fine if the team can tolerate a content freeze window and you can do very thorough SEO QA.

---

## Concrete best practices for the export and replatform

### 1) Start by freezing your “source of truth” and creating backups

Before touching anything:

* Download a **Webflow code export** zip (for visual reference and as a fallback). ([Webflow Help Center][1])
* Export each CMS collection as CSV as a “human backup.” ([Webflow Help Center][2])
* Decide on a “content freeze” policy for the final cutover, or implement a sync.

### 2) Use the Webflow Data API to export “live items” first

For migration, “live” is usually what you want, to avoid drafts leaking into production content. The API has a dedicated endpoint for that. ([developers.webflow.com][7])

### 3) Handle rate limits and pagination correctly (don’t brute force it)

Webflow gives:

* Plan-based requests/minute limits
* 429 responses with `Retry-After`
* rate limit headers you can log ([developers.webflow.com][4])

So your script should:

* request `limit=100`
* paginate with offset
* on 429, sleep for Retry-After and continue

### 4) Treat asset migration as a first-class task

Webflow CSV exports give you Webflow-hosted asset URLs, and those links can break if the site is deleted. ([Webflow Help Center][2])

So:

* Download every image/file referenced by:

  * image/file fields
  * rich text HTML (parse `<img src=...>` and `<a href=...>` for file links)
* Re-host them (S3, R2, Cloudflare Images, etc)
* Rewrite URLs in your content during the transform step

### 5) Convert rich text HTML to your target format intentionally

Webflow rich text exports as HTML. ([Webflow Help Center][2])
If your target is MDX:

* run HTML → MD/MDX conversion (Turndown/remark in JS, or a Python equivalent)
* preserve embedded videos, iframes, code blocks, callouts

This is where you’ll want a “conversion test suite” with a handful of gnarly posts/entries.

### 6) Preserve URLs and SEO metadata aggressively

Rules of thumb:

* Keep the same slugs for blog posts and database entries.
* Keep the same path structure (`/blog/<slug>`, `/llmops-database/<slug>`) unless you have a very good reason.
* If you must change, generate a 301 redirect map and ship it with the new host.

### 7) Use Webflow v2 APIs and v2 tokens

If you have any legacy integrations, note that Webflow API v1 is deprecated, and you should be building against v2. ([developers.webflow.com][14])

Also note: Webflow API tokens can expire after 365 consecutive days of inactivity. ([Webflow Help Center][15])
For a one-time migration export this is not a huge deal, but for any long-running sync pipeline it matters.

---

## A very practical “how to get started” plan

If I were you, I’d do these in order:

### Step 1: Inventory what exists

Deliverable: a short doc or README with:

* list of CMS collections (blog, llmops database, categories/tags if they exist as collections, authors if they exist, etc)
* number of items per collection
* field schemas (field slugs and types)
* list of URL patterns that must be preserved

You can get collections and items via API (`/v2/sites`, `/v2/sites/:site_id/collections`, `/v2/collections/:collection_id/items/live`). ([developers.webflow.com][3])

### Step 2: Build an export snapshot script (one command)

Goal: produce a folder like:

* `export/collections.json`
* `export/<collection-slug>/items.json`
* `export/assets/...` (downloaded)

Once you have this, everything else becomes a transform problem, not a Webflow problem.

### Step 3: Choose target storage per content type

* Blog: MDX in repo or headless CMS.
* LLMOps DB: JSON/YAML + MDX, or DB + CMS.

Write down the decision with the editorial workflow requirement.

### Step 4: Prototype rendering just one page type end-to-end

For example:

* render one `/llmops-database/<slug>` entry from your exported snapshot in your new framework
* render one `/blog/<slug>` post

Don’t start with the home page. Start with the hard content types.

### Step 5: Only then do styling and full page parity

This is where “vibe coding” is reasonable: once the data pipeline and routing are stable, reproducing the UI is mostly normal front-end work.

---

## Minimal Python export script skeleton (API v2)

This isn’t a full production exporter, but it’s a solid starting point that correctly handles pagination and 429s.

```python
from __future__ import annotations

import json
import os
import time
from pathlib import Path
from typing import Any, Dict, Iterator, Optional

import requests


API_BASE = "https://api.webflow.com/v2"


class WebflowAPIError(RuntimeError):
    pass


def _webflow_get(
    token: str,
    path: str,
    params: Optional[Dict[str, Any]] = None,
    *,
    max_retries: int = 10,
    timeout_s: int = 30,
) -> Dict[str, Any]:
    url = f"{API_BASE}{path}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/json",
    }

    for attempt in range(max_retries):
        resp = requests.get(url, headers=headers, params=params, timeout=timeout_s)

        if resp.status_code == 429:
            # Respect Retry-After (Webflow documents it for rate limiting).
            retry_after = int(resp.headers.get("Retry-After", "60"))
            time.sleep(retry_after)
            continue

        if 200 <= resp.status_code < 300:
            return resp.json()

        # Optional: retry transient 5xx with backoff
        if 500 <= resp.status_code < 600 and attempt < max_retries - 1:
            time.sleep(min(2 ** attempt, 30))
            continue

        raise WebflowAPIError(f"GET {path} failed: {resp.status_code} {resp.text}")

    raise WebflowAPIError(f"GET {path} failed after {max_retries} retries (429 loop?)")


def list_sites(token: str) -> list[dict[str, Any]]:
    data = _webflow_get(token, "/sites")
    return list(data.get("sites") or [])


def list_collections(token: str, site_id: str) -> list[dict[str, Any]]:
    data = _webflow_get(token, f"/sites/{site_id}/collections")
    return list(data.get("collections") or [])


def iter_live_items(
    token: str,
    collection_id: str,
    *,
    cms_locale_id: Optional[str] = None,
) -> Iterator[dict[str, Any]]:
    # Use "live" items to avoid drafts in your exported dataset.
    path = f"/collections/{collection_id}/items/live"
    limit = 100
    offset = 0

    while True:
        params: Dict[str, Any] = {"limit": limit, "offset": offset}
        if cms_locale_id:
            params["cmsLocaleId"] = cms_locale_id

        payload = _webflow_get(token, path, params=params)
        items = list(payload.get("items") or [])
        for item in items:
            yield item

        pagination = payload.get("pagination") or {}
        total = int(pagination.get("total", 0))
        offset += limit
        if offset >= total:
            break


def export_site(token: str, site_id: str, out_dir: Path, *, cms_locale_id: Optional[str] = None) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)

    collections = list_collections(token, site_id)
    (out_dir / "collections.json").write_text(json.dumps(collections, indent=2), encoding="utf-8")

    for c in collections:
        collection_id = c["id"]
        slug = c.get("slug") or collection_id
        collection_dir = out_dir / slug
        collection_dir.mkdir(parents=True, exist_ok=True)

        items = list(iter_live_items(token, collection_id, cms_locale_id=cms_locale_id))
        (collection_dir / "items.live.json").write_text(json.dumps(items, indent=2), encoding="utf-8")


def main() -> None:
    token = os.environ["WEBFLOW_TOKEN"]
    site_id = os.environ["WEBFLOW_SITE_ID"]
    out_dir = Path("webflow_export")

    export_site(token, site_id, out_dir)


if __name__ == "__main__":
    main()
```

Notes:

* This uses `/items/live` because it matches what you actually serve today. ([developers.webflow.com][7])
* Pagination uses `limit`/`offset`, max 100, which matches Webflow’s docs. ([developers.webflow.com][8])
* The 429 handling is essential because Webflow enforces plan-based rate limits and uses `Retry-After`. ([developers.webflow.com][4])

From here, you extend the script with:

* asset downloading
* HTML → MDX conversion
* reference resolution and normalization

---

## Common pitfalls checklist

* **Deleting Webflow too early** and breaking asset URLs in exported content ([Webflow Help Center][2])
* **Underestimating forms/search** replacement effort ([Webflow Help Center][1])
* **Not preserving URLs** and losing SEO
* **Ignoring localization** until late (export per locale) ([Webflow Help Center][2])
* **Trying to rebuild everything at once** instead of starting with blog/db first
* **Building against v1 APIs** (v1 is deprecated) ([developers.webflow.com][14])

---

## If you want a “lowest risk” path for ZenML

Given that the LLMOps DB is already 1.5k entries in the UI ([zenml.io][13]) and is filter-heavy ([zenml.io][12]), I’d do:

1. Build a new site (Astro or Next.js).
2. Export LLMOps DB + Blog via API into a repo snapshot.
3. Render those pages statically (or hybrid SSR) with a local search/index.
4. Cut over those routes first, keep remaining marketing pages on Webflow temporarily if needed.
5. Later: migrate the remaining marketing pages and remove Webflow entirely.

If you tell me what stack you’re leaning toward (Next.js vs Astro vs something else) and whether marketing needs a UI editor, I can suggest a concrete target architecture and content model for the LLMOps database fields that will make filtering/search fast and easy.

[1]: https://help.webflow.com/hc/en-us/articles/33961386739347-How-do-I-export-my-Webflow-site-code "https://help.webflow.com/hc/en-us/articles/33961386739347-How-do-I-export-my-Webflow-site-code"
[2]: https://help.webflow.com/hc/en-us/articles/33961290794771-How-do-I-import-content-into-the-Webflow-CMS "https://help.webflow.com/hc/en-us/articles/33961290794771-How-do-I-import-content-into-the-Webflow-CMS"
[3]: https://developers.webflow.com/data/reference/sites/list "https://developers.webflow.com/data/reference/sites/list"
[4]: https://developers.webflow.com/data/reference/rate-limits "https://developers.webflow.com/data/reference/rate-limits"
[5]: https://developers.webflow.com/data/reference/cms/collections/list "https://developers.webflow.com/data/reference/cms/collections/list"
[6]: https://developers.webflow.com/data/reference/cms/collection-items/staged-items/list-items "https://developers.webflow.com/data/reference/cms/collection-items/staged-items/list-items"
[7]: https://developers.webflow.com/data/reference/cms/collection-items/live-items/list-items-live "https://developers.webflow.com/data/reference/cms/collection-items/live-items/list-items-live"
[8]: https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items "https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items"
[9]: https://developers.webflow.com/mcp/v1.0.0-beta/reference/data/cms/items "https://developers.webflow.com/mcp/v1.0.0-beta/reference/data/cms/items"
[10]: https://developers.webflow.com/data/docs/working-with-the-cms/content-delivery "https://developers.webflow.com/data/docs/working-with-the-cms/content-delivery"
[11]: https://developers.webflow.com/mcp/reference/overview "https://developers.webflow.com/mcp/reference/overview"
[12]: https://www.zenml.io/llmops-database "https://www.zenml.io/llmops-database"
[13]: https://www.zenml.io/blog "https://www.zenml.io/blog"
[14]: https://developers.webflow.com/data/docs/migrating-to-v2 "https://developers.webflow.com/data/docs/migrating-to-v2"
[15]: https://help.webflow.com/hc/en-us/articles/33961356296723-Intro-to-Webflow-s-APIs "https://help.webflow.com/hc/en-us/articles/33961356296723-Intro-to-Webflow-s-APIs"
