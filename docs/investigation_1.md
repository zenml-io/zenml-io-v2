I treated your question as three separate questions, because people “leaving Webflow” often mean different things:

1. **What replaced Webflow’s layout/building experience?** (Next.js, Astro, custom HTML, etc.)
2. **What replaced Webflow CMS?** (a headless CMS, a Git-based editor, markdown files, a database)
3. **Where did they deploy and how “dynamic” is it?** (static hosting, SSR, edge functions, ISR/revalidation)

I searched specifically for people saying they **moved off Webflow** and then noted the stack choices and any publicly available code/tools.

## Concrete examples I found (Webflow → custom code)

### 1) “Vibe-coded” rebuilds with modern code stacks (AI-assisted)

**Kyle Frost (Dec 8, 2025)** migrated multiple sites off Webflow because AI tooling made “custom code” cheaper and easier than maintaining multiple Webflow CMS plans. ([kylefrost.com][1])
What he replaced Webflow with (three patterns in one post):

* **Dynamic-ish site:** Rebuilt one site with **Supabase (DB)** and deployed on **Vercel**; also built supporting tooling (image generator + Chrome extension) that publishes directly into Supabase. ([kylefrost.com][1])
* **Static content site:** Personal site became a **static Next.js build** with **markdown** for posts. ([kylefrost.com][1])
* **CMS-needed site:** Rebuilt another site on **Astro** with **Keystatic** as the CMS editor (Git-based), preserving URL structures to avoid breaking links. ([kylefrost.com][1])

Why this is a useful example: it’s exactly the “I don’t need a visual GUI anymore, I can ship with AI tools” mindset, but grounded in concrete framework + CMS + deployment choices.

### 2) Webflow → Next.js + headless CMS (Payload)

**zerodays (DEV post, Jul 23, 2024)**: “Goodbye Webflow…” describes leaving Webflow and going to **Next.js + Payload CMS**, explicitly to regain control over performance/SEO and to have a better editor experience without Webflow’s constraints. ([DEV Community][2])

They also published:

* A detailed CMS comparison write-up (why Payload won for them, and what they considered). ([DEV Community][3])
* Their **Next.js starter template codebase** on GitHub (not the whole website, but a real repo that reflects their stack preferences and tooling). It includes **Next.js App Router**, **Tailwind**, **Biome**, **Orval**, **React Hook Form + Zod**, **next-international**, **Sentry**, **shadcn/ui**, etc. ([GitHub][4])

Why this is useful: it’s a “serious” dev-team migration, and the CMS decision-making is written down.

### 3) Webflow → Astro + Sanity + Cloudflare (agency-style custom build)

In a Reddit thread (around late 2025), one commenter describes a repeatable client setup:

* **Frontend:** Astro
* **CMS:** Sanity
* **Hosting:** Cloudflare Pages
* **Dynamic bits:** Cloudflare Workers for serverless functions
* They also mention having boilerplate for data modeling/validation/relationships and reusable Astro components. ([Reddit][5])

Why this is useful: it shows a clear “static-first but still CMS-driven” architecture, and a non-Vercel deployment path.

### 4) Webflow → Astro stack on Vercel (large site, CMS-heavy reality)

In another Reddit thread (Jan 2026 timeframe), someone says they **moved off Webflow to an Astro stack hosted on Vercel**, and that it’s “much easier to update and manage” but they lost visual development and now design with prompts/PRDs. ([Reddit][6])
A reply highlights the real migration pain point: “99% of pages are CMS” and offboarding CMS is the big project. ([Reddit][6])

Why this is useful: it matches your concern about Webflow CMS being the sticky part.

### 5) Bigger-company style migration: Webflow → Sanity + Next.js + Vercel

A Ramp case study (published May 2, 2025) describes migrating from Webflow to **Sanity CMS**, using **Next.js** and deploying on **Vercel**, including notes like: migrating 1,500+ docs, a content freeze window, preserving IDs, and using a revalidation strategy. ([ContentWrap][7])

Why this is useful: even if it’s a case study, it shows what “grown-up” content migrations focus on (revalidation, references, IDs, editor workflows).

## Concrete examples I found (Webflow → “export and host elsewhere”)

Not full rewrites, but still relevant if your goal is to escape vendor lock-in quickly.

### 6) Export Webflow and self-host static

A Reddit thread about self-hosting after leaving Webflow includes approaches like:

* Export static files, replace Webflow forms with embeds (MailerLite/HubSpot), host on **Vercel** or **GitHub Pages**. ([Reddit][8])
* Use **Netlify + GitHub** for a portfolio, leveraging Netlify’s form handling. ([Reddit][8])
* Use tools like **Udesly** to export to Netlify, with the warning that updates become inconvenient and you need your own forms, and it breaks if you rely on Webflow-hosted features like eCom, user accounts, logic, localization. ([Reddit][8])

This is the “fastest escape hatch” but it does **not** solve the CMS replacement problem.

## Open-source codebases and scripts that help with Webflow → custom

These are the closest things I found to what you asked for (“even better a code base itself”).

### 1) Webflow CMS → Sanity migration script (Node.js CLI)

**jackbkennedy/migrate-webflow-cms-to-sanity**: CLI tool that fetches Webflow collections, maps items to a Sanity schema, and includes example handling for images/files and converting Webflow rich text HTML into Sanity block content. ([GitHub][9])

This is directly relevant if your plan is “replace Webflow CMS with Sanity.”

### 2) “Convert Webflow to Next.js” style repo

**persephonepunch/starter-next**: a Cheerio-based converter idea that pulls a Webflow site and collections into a Next.js template; mentions deployment to Vercel/Netlify and webhooks for updates. ([GitHub][10])

This is more of a hybrid “designers keep Webflow, devs ship Next.js” approach, not a clean break.

### 3) The “headless CMS migration” thread that links scripts/tools

A Reddit thread about migrating away due to Webflow’s item limits explicitly links the Sanity migration repo above and discusses the reality that headless implies you must build the frontend, plus you need to solve navigation/sitemap/rendering. ([Reddit][11])

## What people are actually replacing Webflow with (patterns)

From these examples, I’d summarize the common replacements like this:

### A) Static-first frontend frameworks

* **Astro** is a frequent “marketing and content site” replacement because it stays fast by default and only hydrates interactive islands. (Seen with Vercel and Cloudflare deployments.) ([Reddit][5])
* **Next.js** shows up when teams want a single framework that can do marketing pages plus dynamic features, and want rich routing/data fetching patterns. ([kylefrost.com][1])

### B) CMS replacements split into three camps

1. **“Real headless CMS”**: Sanity, Payload, Directus, Strapi

   * Payload is attractive if you want tight Next.js integration and self-hostable, TypeScript-friendly CMS code colocated with the app. ([DEV Community][3])
   * Sanity is commonly paired with both Next.js and Astro. ([Reddit][5])
   * Directus appears in “migrate content + keep dev control” stories too. ([LinkedIn][12])

2. **“Git-based CMS/editor”**: Keystatic, markdown-in-repo

   * Keystatic is used as “CMS UI, but content lives in git.” That’s a nice middle ground for small teams who want editing without running a CMS server. ([kylefrost.com][1])
   * Plain markdown is the simplest “CMS replacement” for low-frequency content. ([kylefrost.com][1])

3. **“No CMS, just a DB”** (or DB + small admin)

   * Supabase shows up as a pragmatic “DB + auth + some admin needs” choice when the “content” is really app data. ([kylefrost.com][1])

### C) Hosting choices are basically: Vercel vs Cloudflare vs Netlify

* **Vercel** is common for Next.js and also used for Astro. ([kylefrost.com][1])
* **Cloudflare Pages + Workers** shows up as a compelling stack when people want edge-native hosting and serverless without Vercel. ([Reddit][5])
* **Netlify/GitHub Pages** show up for “export static and host cheap” approaches. ([Reddit][8])

## A very practical migration gotcha (especially if you “AI rewrite”)

A LinkedIn post about a Webflow → Next.js migration mentions a **479px breakpoint** hidden in generated CSS that wasn’t visible in Webflow’s UI, which caused layout collapse when recreated via Cursor. The takeaway: migrations are not just copying layout, they’re reconstructing “implicit decisions.” ([LinkedIn][13])

If you go the “vibe-coded rebuild” route, that’s the kind of paper cut that will waste hours unless you deliberately audit exported CSS and edge breakpoints.

## Options you may not have been considering (but fit what you said)

You said: you do not need a visual GUI for layout. That points to two especially good “replacement” strategies:

### 1) Astro + Keystatic (or markdown) + static hosting

This is the cleanest “I want Webflow costs and lock-in gone” path for most marketing sites:

* Astro for pages/components
* Keystatic for editor UI (optional)
* Deploy on Cloudflare Pages or Vercel
* Use a lightweight forms solution (serverless function or a service)

This matches a real migration story. ([kylefrost.com][1])

### 2) Next.js + Payload (if you want a CMS but keep it code-native)

If you want editors, role-based access, drafts, media, localization, and you want the CMS to feel like part of your codebase:

* Next.js for frontend
* Payload for CMS/admin and schema
* Deploy on Vercel (or self-host elsewhere)

This matches zerodays’ “left Webflow” write-up and their CMS evaluation. ([DEV Community][2])

### 3) Sanity or Directus as “external CMS”, with Next.js or Astro frontends

If you prefer the CMS as a separate managed system (or want Directus to sit on your DB):

* Astro or Next.js frontend
* Sanity or Directus for content
* Use caching/revalidation patterns to keep it fast

Examples show Sanity with Astro and Next.js, and Directus used in AI-assisted content migration flows. ([Reddit][5])

## If you want a quick way to decide your own replacement stack

Here’s a decision tree that maps pretty cleanly onto what I saw people doing:

1. **How often does content change?**

* Rarely: markdown in repo (Next.js or Astro) ([kylefrost.com][1])
* Weekly or daily with editors: headless CMS (Payload, Sanity, Directus) ([DEV Community][2])

2. **Do you need “CMS relationships” and lots of content types?**

* Light: Keystatic or simple markdown collections ([kylefrost.com][1])
* Heavy: Sanity or Payload (or Directus if you want DB-first) ([Reddit][5])

3. **Do you need runtime personalization or app-like features?**

* Mostly static: Astro
* Mixed static + dynamic: Next.js
* Strongly app-like: Next.js plus DB (Supabase, Postgres, etc.) ([kylefrost.com][1])

## One more “modern” angle: AI-assisted migration workflows

Two patterns worth stealing if you do this:

* **Use AI agents for content migration + categorization** (especially if you have lots of blog content). Directus describes doing this by connecting Cursor to both Webflow MCP and Directus MCP. ([LinkedIn][12])
* **Audit exported CSS for hidden breakpoints and layout hacks** before trusting an AI recreation. ([LinkedIn][13])

[1]: https://www.kylefrost.com/blog/why-i-moved-everything-off-webflow "I Moved My Websites Off of Webflow (thanks to Claude) – Kyle Frost"
[2]: https://dev.to/zerodays/goodbye-webflow-hello-our-shiny-new-website-1m31 "Goodbye Webflow, Hello Our Shiny New Website - DEV Community"
[3]: https://dev.to/zerodays/the-hunt-for-a-perfect-headless-cms-123h "The Hunt for a Perfect Headless CMS - DEV Community"
[4]: https://github.com/zerodays/nextjs-template "GitHub - zerodays/nextjs-template: A new and improved template for NextJS projects."
[5]: https://www.reddit.com/r/web_design/comments/1osirfa/webflow_is_a_frustrating_unusable_mess/ "Webflow is a frustrating, unusable mess : r/web_design"
[6]: https://www.reddit.com/r/webflow/comments/1qe3s3s/iterating_with_ai/ "Iterating with AI : r/webflow"
[7]: https://contentwrap.io/case-studies/migrating-ramp-website-from-webflow-to-sanity "Migrating from Webflow to Sanity CMS: Scaling Ramp's content infrastructure for growth"
[8]: https://www.reddit.com/r/webflow/comments/1fl3zg4/if_you_left_webflow_how_did_you_selfhost_your/ "If you left Webflow, how did you self-host your Webflow site? : r/webflow"
[9]: https://github.com/jackbkennedy/migrate-webflow-cms-to-sanity "GitHub - jackbkennedy/migrate-webflow-cms-to-sanity: CLI tool to help you migrate Webflow CMS content to Sanity."
[10]: https://github.com/persephonepunch/starter-next "GitHub - persephonepunch/starter-next: webflow to next js design components"
[11]: https://www.reddit.com/r/webflow/comments/1c3mrsm/migrating_from_webflow_to_another_headless_cms/ "Migrating from Webflow to another Headless CMS - Low-code options? : r/webflow"
[12]: https://www.linkedin.com/posts/directus-io_wayne-eldridge-and-his-team-at-enamic-had-activity-7404550638564495361-pasi "Enamic Migrates Webflow Content to Next.js with Directus MCP | Directus posted on the topic | LinkedIn"
[13]: https://www.linkedin.com/posts/janucloud_%F0%9D%91%A8%F0%9D%91%B0-%F0%9D%91%B0%F0%9D%92%94%F0%9D%92%8F%F0%9D%92%95-%F0%9D%91%B1%F0%9D%92%96%F0%9D%92%94%F0%9D%92%95-%F0%9D%92%82-%F0%9D%91%BB%F0%9D%92%90%F0%9D%92%90%F0%9D%92%8D-%F0%9D%91%B0%F0%9D%92%95-activity-7401477756410343425-S5jW "AI Revolutionizes Website Building: No Coding, No Design Skills Required | Akurati Jahnavi posted on the topic | LinkedIn"
