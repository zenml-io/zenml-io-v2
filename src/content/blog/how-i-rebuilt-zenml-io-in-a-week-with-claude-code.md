---
title: "How I Rebuilt zenml.io in a Week with Claude Code"
slug: "how-i-rebuilt-zenml-io-in-a-week-with-claude-code"
draft: false
author: "alex-strick-van-linschoten"
category: "zenml"
tags:
  - "zenml"
  - "open-source"
  - "genai"
  - "tooling"
date: "2026-03-03T00:00:00.000Z"
readingTime: "16 mins"
mainImage:
  url: "https://assets.zenml.io/content/blog/80e812b0/zenml-io-claude-code.avif"
  alt: "How I Rebuilt zenml.io in a Week with Claude Code"
seo:
  title: "How I Rebuilt zenml.io in a Week with Claude Code - ZenML Blog"
  description: "I rebuilt zenml.io — 2,224 pages, 20 CMS collections — from Webflow to Astro in a week using Claude Code and a multi-model AI workflow. Here's how."
  canonical: "https://www.zenml.io/blog/how-i-rebuilt-zenml-io-in-a-week-with-claude-code"
  ogImage: "https://assets.zenml.io/content/blog/c26a9572/zenml-io-claude-code-og.avif"
---

I rebuilt the entire zenml.io website — migrating it from Webflow to Astro — in about a week. The blog, the LLMOps database, integrations, comparison pages, case studies — all of it. No phased rollout, no "let's start with a landing page." The site you're reading right now is the result.

If you're outgrowing your website builder, or curious what it looks like to use multiple AI models on a real engineering project (not a demo), there's probably something useful here for you.

## Why We Left Webflow

ZenML's website has had three lives. We started on Jekyll, which worked fine in the pre-ChatGPT era but meant our designer Zuri Negrín was spending too much time fighting a static site generator instead of designing. About two and a half years ago, we switched to Webflow.

Webflow was great for us. Zuri could work directly in the visual editor, the CMS made it easy to manage blog posts and integration pages, and the site looked professional. For a startup, Webflow is a fairly solid choice and I wouldn't discourage anyone from starting there.

But the site outgrew it.

As zenml.io grew to 2,200+ pages across 20 CMS collections, it started to slow us down in ways we couldn't ignore. No version control, no CI/CD, no self-hosting. Code formatting in blog posts required Webflow-specific hacks. The LLMOps database (1,453 entries of tools, frameworks, and research) pushed Webflow's CMS filtering to its limits — we needed faceted search with AND/OR filtering, full-text search, and the ability to combine filters in ways Webflow's native CMS couldn't do. We also started to have to pay more because we were hitting Webflow's usage limits for CMSes.

The most telling symptom: we'd put off updating the website's messaging because making changes in Webflow had become enough of a chore that we'd just... not. When your website platform is discouraging you from improving your website, something has to change.

Webflow's visual editor is ok for when you get started, until you need the parts it doesn't want you to touch. We needed to go further.

## The Hackathon

We'd been talking about migrating for months but there was always something more urgent. The ["Built with Opus 4.6" Claude Code hackathon](https://cerebralvalley.ai/e/claude-code-hackathon) (Cerebral Valley, February 10-16, 2026) gave me the deadline I needed. A week to ship something real, not "someday we'll migrate."

I didn't win the hackathon (the winners were excellent), but the evening sessions with the Claude Code team from Anthropic were worth the experience on their own.

Before I touched Astro, I wanted a baseline I could trust:

- **Scope the data**: I exported the full CMS inventory (2,340 items across 20 collections) and counted every asset: 2,397 images and files, 384 MB total. You can't plan a migration without knowing exactly what you're migrating.
- **Crawl for SEO baseline**: I crawled all 2,151 live URLs and captured every meta tag, canonical URL, and Open Graph field. That crawl became my contract with reality — if a URL broke or a meta tag changed, it was a regression.
- **Evaluate the tech stack**: I used ChatGPT 5.2 Pro's Deep Research to evaluate frameworks (Astro vs Next.js vs others) for a static-first content site with 2,200+ pages. It landed on a static-first stack that fit: Astro, Cloudflare Pages, a few Preact islands for interactivity, and Pagefind for search. Not a stack I knew well, but the right one for the job.
- **Download the Webflow code export**: As a reference for styles, layouts, and structure. I wasn't going to copy-paste from it, but I needed to understand the intent behind each page.

I organized the work into six phases: Infrastructure, Content Export, Schemas, All Pages, SEO & Redirects, and Forms & QA. Having this structure made the massive scope feel tractable. Each phase had a clear definition of done, a checklist, and acceptance criteria.

One thing that proved surprisingly valuable: I kept an audit document — a "plan-checker" — that tracked where execution diverged from the plan. It caught things like asset regex patterns that missed entire URL families, validation gates that silently loaded zero entries after I switched from `.mdx` to `.md`, and manifest counters that were inconsistent across reruns. The plan wasn't sacred. The "plan, build, audit, admit drift, correct" cycle was what made it useful.

In practice, the week looked something like this (all evenings and nights after my day job):

- **Day 1**: Everything moved faster than I expected. Infrastructure and content export were mostly done by the end of the first night.
- **Day 2**: I started using RepoPrompt to have GPT 5.2 and 5.3 Codex check Claude's work. Things slowed down. The cross-model review started catching places where Claude was cutting corners, and I hit my biggest "oh no" of the week: MDX was going to silently break 1,904 content files. Switching to plain `.md` early saved the project.
- **Day 3**: I started a completely separate side project because I thought I was going to finish the hackathon too early. (I was wrong about that.)
- **Day 5**: Deep in the details. Checking everything, starting to doubt myself a little because I was so deep in the plans and the Cloudflare configuration. This is the part that felt like real work.
- **Day 7**: Done. Then I spent a night filming and cutting the demo video (required for the hackathon submission) with [Remotion](https://www.remotion.dev/), which is its own story.

## The Multi-Model Workflow

I've been using Claude Code daily more or less since it launched, and through that experience I've developed a workflow where different models handle different parts of a project based on their strengths. For this migration, that meant three tools working together.

### The Models

**ChatGPT 5.2 Pro (Deep Research)** handled the upfront tech stack evaluation. Given a summary of our CMS structure, content volume, and requirements, it produced a thorough comparison of frameworks with trade-off analysis. This set the architectural direction before I wrote any code.

**Claude Code + Opus 4.6** was the builder. It handled the overwhelming majority of development: export scripts, schema design, page templates, interactive Preact islands, SEO infrastructure, accessibility audits. About 143 commits during the hackathon week.

**[RepoPrompt](https://repoprompt.com)** was my context wrangler. It's a native Mac app that also runs as an MCP server, so Claude Code can call into it programmatically. I used its `context_builder` tool to assemble the right files and code maps (concise API signatures instead of full implementations) for whatever I was working on. Without it, keeping 20 schemas and 37 components in context simultaneously would have meant constantly hand-curating what the model could see and I didn't always trust that Claude would go the extra mile to gather all materials.

The real value was cross-model review at phase boundaries. At the end of each phase, I'd have RepoPrompt package what Claude had built and route that context through GPT 5.2 or Codex 5.3 for architectural review. Codex in particular is extremely smart at this kind of analysis but almost impossible to talk to directly — flat, technical, inhuman. Claude acts as the translation layer: it understands what I want, packages it into something Codex can work with, and translates the analysis back into something I can act on. That round-trip is what caught the schema issues, the broken slugs, and the missing validation gates before they cascaded downstream.

### Getting Models to Check Each Other's Work

A concrete example of why this matters: after Claude built the Phase 2 content schema plan, I used RepoPrompt to package the plan alongside the actual exported data and had the system audit its own work. It found seven critical issues: schema assumptions that didn't match the actual exported data, broken collection slugs ("author" vs "authors"), missing validation gates, 73 items with missing SEO blocks. Then it rewrote the entire phase plan.

I do this routinely now. Building something with one agentic system, then having a second pass (either a different model or the same model with fresh context and different instructions) review the architectural decisions before I build anything on top of them. Content model decisions cascade: if the schema design is wrong, everything downstream breaks. Catching those seven issues before writing any page templates saved probably many hours of debugging.

### Visual Comprehension

Two spots where Claude's visual understanding saved me real time:

First, **Playwright screenshots for layout recreation**. Claude used Playwright to screenshot the old Webflow site, then recreated layouts by looking at them. Rather than parsing the HTML export, Claude did visual comprehension of the design and rebuilt it in Astro components. It got me maybe 80% there fast, but the remaining 20% was still manual work — spacing tweaks, responsive breakpoints, and the kind of edge cases you only find by resizing the browser five times.

Second, **video to CSS animations**. We'd built some complex animations in Webflow with its proprietary interaction system, and those animations don't come with the code export. I recorded them on video, had Claude extract frames, and then it wrote up a narrative describing all the transitions. Claude then converted that into CSS animations and custom implementations. I guess it was a bit of a hack to do it this way, but I was impressed that even though Claude doesn't 'see' video, it was able to understand the animations through a frame-by-frame decomposition.

### Pragmatic Tool-Switching

When migrating our 2,397 assets to Cloudflare R2, the initial approach used Wrangler CLI (Cloudflare's official tool). It was failing on about 32% of uploads. Rather than spending time debugging the CLI (mostly hitting concurrency and rate limits), Claude switched the entire tooling stack from TypeScript + Wrangler to Python + boto3 with `ThreadPoolExecutor` and completed all the uploads in about 30 seconds.

### Long Sessions Didn't Fall Apart

I was nervous about context compaction going in. In previous experience with earlier models, losing context mid-session could derail things badly, and a project with 20 content schemas and thousands of pages seemed like it would push the limits. But across 120+ commits and multiple compactions per session, Claude stayed coherent and recovered decisions made earlier in the conversation. That resilience is what let me trust longer, more ambitious sessions instead of breaking work into artificially small chunks.

The catch was parallelization. I never managed to do it effectively. I tried using git worktrees to run multiple Claude Code sessions simultaneously, but with so many files changing at once, the merge conflicts made it slower than just working sequentially. In hindsight, I should have planned the parallelization boundaries more carefully upfront — figuring out which pieces of work were truly independent before trying to run them in parallel.

## What We Built: The Numbers

Here's what the migration produced. (You'll see slightly different totals through this post — 2,151 live URLs crawled, 2,224 pages generated, 2,255 HTML files in build output — because those are different sets. Pagination indexes and utility pages add to the build output beyond the live URLs.)

| Metric | Value |
|--------|-------|
| Total pages | 2,224 |
| Content collections | 20 (with Zod schemas) |
| Assets migrated | 2,397 (384 MB) |
| Build time | ~33 seconds |
| Redirect rules | 52 (URL preservation) |
| Preact islands | 9 (everything else is zero-JS static) |
| Commits (hackathon week) | 143 |
| Planning documents | 22+ |

### Lighthouse Scores

| Category | Desktop | Mobile |
|----------|---------|--------|
| Performance | 99 | 97 |
| Accessibility | 100 | 100 |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |

Perfect 100s on accessibility and SEO across both desktop and mobile. Performance in the high 90s on both.

### Key Architectural Choices

**Markdown in git** (`.md`, not `.mdx`): version-controlled, diffable content. The `.md` vs `.mdx` decision was one of the earliest and most consequential choices in the migration; more on that in the gotchas section.

**Astro's islands architecture**: only 9 components out of 2,224 pages need client-side JavaScript. The rest is pure static HTML, which is the main reason you can build the entire site in 33 seconds.

**Cloudflare Pages + R2**: edge CDN with branch previews (every PR gets its own URL) and object storage co-located with the CDN.

**Pagefind for search**: a build-time full-text search index with zero runtime cost, searching all 1,453 LLMOps Database entries client-side. If your site is mostly static content, Astro + Pagefind is hard to beat.

### Build Performance: The Weird Parts

Post-hackathon, build times crept to about two minutes. I broke the build into its three phases (page generation, Cloudflare adapter server build, and Pagefind indexing) and profiled each one.

The first problem was algorithmic. Each of the 1,453 LLMOps detail pages has a "More Like This" section that finds related entries by shared tags. The original implementation scanned all 1,453 entries for *every* page, which means roughly 2.1 million comparisons per build. The fix was building inverted indexes (tag-to-entries, industry-to-entries) once upfront and doing lookups from those instead. Classic O(N^2) to O(N) — in plain terms, I stopped recomputing the same "related items" work 1,453 times. That saved about 13 seconds.

The second fix was scoping Pagefind. It was walking all 2,255 HTML files in the build output, but only the 1,453 LLMOps pages actually have `data-pagefind-body` attributes. Adding `--glob 'llmops-database/*.html'` to the Pagefind command cut about 20 seconds.

The weird part was what *didn't* help. Removing `@astrojs/mdx` (we have zero `.mdx` files, so it seemed like dead weight) actually made the server build phase go from 72 seconds to 117 seconds. The MDX integration changes how Vite resolves the module graph, and the Cloudflare adapter benefits from that resolution path. I also tried removing the Cloudflare adapter entirely to eliminate its 50-100 second server build phase, but that made page generation itself about 40% slower and broke ESM resolution for 26 remark/rehype ecosystem packages. The adapter's Vite/Rollup pre-optimization of the module graph benefits the static page generation step too. Sometimes dependencies earn their keep in ways that aren't obvious from the dependency graph.

### Actually Making It Better

After achieving the 1:1 copy, we started going further than what Webflow could deliver. Zuri did a thorough design pass after the hackathon, and together we built several features that wouldn't have been possible (or would have required painful workarounds) in Webflow:

- **LLMOps "Research Hub"**: A faceted sidebar with industry and technology filters, AND/OR tag mode, Pagefind full-text search, and a full WCAG accessibility audit. The original Webflow version only supported AND filtering with a flat dropdown of 107 tags, which often produced zero results
- **Blog redesign**: Zuri redesigned the blog layout with a sidebar browse by category, a reading progress indicator, and a conditional table-of-contents sidebar that appears automatically for long posts (251 of 280 posts qualify)
- **Branch previews**: Every PR gets its own preview URL, which made the design review process with Zuri much faster

### What I'd Do Differently

- Decide `.md` vs `.mdx` before writing any validators or glob patterns. That decision cascades into everything.
- Plan parallelization boundaries before touching worktrees. Figure out which pieces of work are truly independent first.
- Treat caching as part of the migration plan, not a post-cutover surprise.

## The Gotchas

### 1. Silent 404s Are the Most Common Bug

Astro doesn't validate `public/` asset references at build time. If you reference `/images/logo.svg` but the file doesn't exist, you get no build error. Just a 404 at runtime. Template literal URLs (`${R2}/hash/file.svg`) are even worse because they're invisible to regex-based audits. I got bitten by this multiple times.

### 2. MDX v2 Will Silently Break Your Webflow HTML

This was one of the earliest and most consequential decisions in the migration, and I'm glad I caught it early rather than after building on top of the wrong foundation.

The initial plan was to use `.mdx` files, since MDX lets you embed React/Preact components directly in markdown. But MDX v2 treats all HTML as strict JSX, and Webflow-exported HTML is emphatically not JSX. Webflow's content contains curly braces in text (which MDX interprets as JavaScript expressions), multi-line HTML tables (which MDX chokes on), raw `<placeholder>` tags, and a mix of markdown and inline HTML that MDX tries to parse as component syntax.

The fix was switching to standard `.md` files with `rehype-raw`, a remark plugin that passes raw HTML through without trying to parse it as JSX. This one decision affected every subsequent phase: the content schemas, the glob patterns, the validation scripts, and the build pipeline all changed. But it meant that 1,904 content files worked without per-file debugging. We can still selectively convert individual files to `.mdx` later if we need JSX components in specific posts.

### 3. `import.meta.env.PROD` Is True on Preview Deploys

Cloudflare Pages (and similar platforms) run `astro build` for every deploy, including branch preview deploys. Since `import.meta.env.PROD` just checks whether you're in a production *build* (as opposed to `astro dev`), it's `true` on every preview deploy too. If you gate your analytics scripts behind `import.meta.env.PROD`, every PR preview will fire real analytics events to Plausible, GA4, Segment, and wherever else you're tracking. I found this out when our analytics started showing traffic from preview URLs. The fix: gate on the actual hostname (`window.location.hostname === 'www.zenml.io'`) instead of build mode. Analytics only fire on the real domain, regardless of how the build was triggered.

### 4. The Webflow CDN Isn't Always Cooperative

When migrating 2,397 assets, I needed to download every image from Webflow's CDN (`uploads-ssl.webflow.com`). Most worked fine, but some file IDs consistently returned 403 Forbidden, even with browser-like User-Agent headers. These weren't rate limits; the same IDs failed every time. The workaround was the Webflow code export I'd downloaded as a reference: it contains the same images under older file IDs that still download fine. So the local export became the fallback source for anything the CDN blocked. If you're planning a similar migration, download the code export before you start, even if you think you won't need it.

### 5. Plan Before You Build

Having 22+ planning documents wasn't overhead. Those documents are the reason I could move at this pace. Each phase had a clear definition of done, a checklist, and an acceptance test. Claude Code is powerful but it needs direction. The `CLAUDE.md` file (project instructions) grew to become a living architectural document that accumulated learnings from every phase. I would not do a migration like this without a crawl baseline again.

### 6. Webflow's Cache Headers Will Haunt Your Cutover

Even after a successful DNS switch, you might still see the old site. Here's why: Webflow sends `surrogate-control: max-age=432000` on its responses. That's five days. This header tells CDNs (including Cloudflare, which we were migrating *to*) to cache the response aggressively. So after our cutover, `www.zenml.io` kept serving the old Webflow content because Cloudflare had a 3.2-day-old cached copy and was perfectly happy to keep serving it. The DNS was pointing to the right place, the new site was deployed and ready, but visitors were seeing the old site from cache.

The fix: go to the Cloudflare Dashboard, Caching section, and hit "Purge Everything." There's also a second gotcha: the Cloudflare Pages custom domain flipped its status to "Inactive" after the nameserver switch and needed manual reactivation in the dashboard. And then it happened again. Twice in total. Nobody warns you about either of these, and they're the kind of thing that makes you doubt your DNS configuration when the real problem is caching.

## Was It Worth It?

We're saving about $800/year on Webflow pricing. That alone wouldn't have justified the migration, though the cost was only going up as the CMS grew.

The real payoff isn't the money. As Zuri put it:

> "It feels much nicer and powerful to work on the website now, and also flexible to make new layouts, improvements and whatever ideas that come to our minds without the Webflow restrictions."

We publish blog posts through git instead of the Webflow editor. Contributors can say "new blog post for `~/Desktop/my-new-blog-draft.md`" and Claude Code handles branch creation, frontmatter, image processing, and PR setup. We control caching, headers, redirects, the build pipeline, content structure. The LLMOps database is better than anything Webflow could deliver and it will keep improving from here.

But you do pay for that freedom. We now own DNS runbooks, rollback plans, caching behavior, cookie consent, CSP reporting, build performance investigations, and production verification checklists. We also have a little more to think about when it comes to SEO. You're not just migrating a website; you're taking on infrastructure. For us, that's a feature. For others, it's worth thinking about before you start.

We should have done this sooner — but we needed AI-assisted development mature enough to handle a 2,200-page migration, and a deadline to actually do it.

---

*The repo is public at [github.com/zenml-io/zenml-io-v2](https://github.com/zenml-io/zenml-io-v2). If you're considering a similar migration, the content schemas, export scripts, and CLAUDE.md might save you time.*
