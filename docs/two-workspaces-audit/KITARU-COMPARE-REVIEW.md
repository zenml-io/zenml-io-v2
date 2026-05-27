# Kitaru Compare Pages — Audit & Review

**Date:** 2026-05-21  
**Branch:** merge/zenml-kitaru-unification  
**Scope:** `src/content/compare-kitaru/*.mdx`, `src/components/compare/kitaru/*`, `src/components/compare/_layouts/KitaruCompare.astro`

---

## Findings Summary

### Visual

| Component | Finding | Status |
|-----------|---------|--------|
| `ComparisonHero.astro` | Orange gradient blobs are correctly contained by `overflow: hidden` on `.chero`. No bleed into surrounding sections. | No action |
| `ComparisonTable.astro` | Mobile: `overflow-x: auto` + `min-width: 720px` for has-notes variant — renders correctly on narrow viewports. | No action |
| `CodeCompare.astro` | Uses `kitaru-dark.json` Shiki theme inside the dark band. Correct — the dark panel justifies the dark theme. | No action |
| `CodePane.astro` | Was using `github-light`; switched to `zenml-light` to match site-wide light-theme code blocks. | **Fixed** |
| `WhenToUseEach.astro` | Two-column grid collapses to single column at `820px`. No layout breakage. | No action |
| `FeatureWithGraphic.astro` | Reverse layout collapses cleanly at `820px`. | No action |

### SEO / Surface

| Check | Finding | Status |
|-------|---------|--------|
| `surface="agent"` | Set in `KitaruCompare.astro` line 36 (`<BaseLayout ... surface="agent">`). All 8 pages inherit it. | Correct |
| `canonical` | Astro handles canonical via `buildCanonical()` in `seo.ts`. No override needed. | Correct |
| `ogImage` | Temporal, Restate, DBOS, OpenAI Agents SDK, Inngest have R2-hosted OG images (verified 200). Pydantic AI, LangGraph, Claude Agent SDK have no `ogImage` — BaseLayout falls back to default OG. | Acceptable — flag for future enhancement |

### Asset Migration

| Domain | Status |
|--------|--------|
| `assets.kitaru.ai` | No references found in any compare-kitaru content or compare component files. Migration was completed in a prior pass (`b4451d6`). |
| `assets.zenml.io` | All in-content R2 references verified live (HTTP 200) as of audit date. |

### CTAs / Links

| Check | Finding | Status |
|-------|---------|--------|
| Demo CTA | `ComparisonHero` and `ComparisonCta` default to `/book-your-demo`. Correct. | No action |
| Docs link | `ComparisonHero` and `ComparisonCta` link to `https://kitaru.ai/docs` (external, `target="_blank"`). Intentional per commit `7227125`. | No action |
| Internal `/docs/` links | `kitaru-vs-pydantic-ai.mdx` and `kitaru-vs-openai-agents-sdk.mdx` had broken internal `/docs/guides/*` links. | **Fixed** → external `https://kitaru.ai/docs/guides/*` |
| GitHub link | `ComparisonCta` links to `https://github.com/zenml-io/kitaru` — consistent with rest of site. | Correct |
| Competitor dropdown | Hero dropdown uses `/compare/{slug}/` paths that correctly resolve under Astro's `trailingSlash: 'never'` (no trailing slash). | Correct |

---

## Content Review — Per Page

### kitaru-vs-temporal.mdx
- "What is Temporal?" framing: accurate (polyglot, 7 SDKs, decade of production use)
- Code example: Temporal Python SDK usage matches `temporalio` 1.x API
- Feature claims: Temporal lacks native `kitaru.llm()` and artifact lineage — accurate
- **FLAG:** "seven official SDKs (Go, Java, Python, TypeScript, Ruby, PHP, and .NET)" — verify against current Temporal docs; SDK availability can change

### kitaru-vs-langgraph-deep-agents.mdx
- Framing: LangGraph as graph-native, Kitaru as framework-agnostic — accurate at conceptual level
- "LangSmith Sandboxes" and "LangSmith Deployment" described as packaged runtime — verify current LangSmith product naming and feature set
- "Deep Agents" referenced as "a strong opinionated harness on top of LangGraph" — **FLAG:** "Deep Agents" is a specific product claim; verify this is the current name and description
- Code example: LangGraph StateGraph API appears consistent with LangGraph 0.2.x

### kitaru-vs-dbos.mdx
- DBOS framing: "polyglot durable workflow library on Postgres" — accurate
- Licensing claim: "Apache-2.0" for DBOS — **FLAG:** verify DBOS current license (some OSS projects have changed licenses)
- "DBOS Conductor" referenced as "the UI for scheduled workflows and durable queues" — verify current product name/branding
- Code example: `@DBOS.step()` / `@DBOS.workflow()` pattern matches DBOS Python SDK

### kitaru-vs-restate.mdx
- Restate framing: polyglot, BSL 1.1 runtime, Apache 2.0 as change license — **FLAG:** verify license terms; Restate licensing evolves
- "Virtual Objects" description as "keyed per-entity state with strongly-consistent access" — accurate
- Code example: `restate.Workflow`, `ctx.run()`, `ctx.awakeable()` matches Restate Python SDK 1.x

### kitaru-vs-inngest.mdx
- Inngest framing: event-driven, TypeScript/Python/Go, SOC 2 Type II, SAML, HIPAA BAA — **FLAG:** verify current compliance certifications and tier availability
- Licensing claim: "SSPL with delayed Apache; SDKs Apache 2.0" — **FLAG:** verify current Inngest server license; SSPL was referenced but license terms change
- Branch environments feature — verify still available in current Inngest
- Code example: `inngest_client.create_function`, `ctx.step.run`, `ctx.step.wait_for_event` matches Inngest Python SDK

### kitaru-vs-claude-agent-sdk.mdx
- Framing: correct (SDK for coding agents, Kitaru for lifecycle/durability)
- "Prompt caching and Haiku" mentioned as cost tools inside Claude stack — accurate
- Code example: `claude_agent_sdk.query` / `ClaudeAgentOptions` / `ResultMessage` — verify against current Claude Agent SDK (formerly claude-code-sdk) API
- R2 images verified live (200 OK)

### kitaru-vs-openai-agents-sdk.mdx
- Framing: SDK builds the agent, Kitaru is the runtime — accurate
- First-party evals with "graders, datasets, and eval runs" — verify current OpenAI evals feature set
- Code example: `agents.Agent`, `Runner.run_sync`, `KitaruRunner` — OpenAI Agents SDK API verified
- `model="gpt-5"` in example — this is illustrative, not a pricing claim; acceptable
- **Fixed:** broken `/docs/guides/openai-agents-adapter` link → external URL

### kitaru-vs-pydantic-ai.mdx
- Framing: harness vs runtime — accurate
- "Pydantic AI now documents durable execution through integrations with Temporal, DBOS, Prefect, and Restate" — **FLAG:** verify current Pydantic AI docs; integrations section may have changed
- `model="openai:gpt-5.4"` — illustrative, acceptable
- **Fixed:** broken `/docs/guides/pydantic-ai-adapter` link → external URL

---

## Fixes Applied (this commit)

1. `src/components/compare/kitaru/CodePane.astro` — switched Shiki theme from `github-light` to `zenml-light` (site standard)
2. `src/content/compare-kitaru/kitaru-vs-pydantic-ai.mdx` — fixed broken internal `/docs/guides/pydantic-ai-adapter` link
3. `src/content/compare-kitaru/kitaru-vs-openai-agents-sdk.mdx` — fixed broken internal `/docs/guides/openai-agents-adapter` link

---

## Flagged Items (require human verification)

These are factual claims about competitors that could become stale. No code changes were made because the claims could not be verified or disproven from code alone.

| Page | Claim | Risk |
|------|-------|------|
| vs-temporal | "seven official SDKs (Go, Java, Python, TypeScript, Ruby, PHP, and .NET)" | SDK count/list may change |
| vs-langgraph | "Deep Agents" product name and description | Verify current product naming |
| vs-langgraph | LangSmith Deployment / LangSmith Sandboxes feature set | Product evolves rapidly |
| vs-dbos | DBOS license is "Apache-2.0" | Verify against current DBOS repo |
| vs-dbos | "DBOS Conductor" as product name | Verify current branding |
| vs-restate | "BSL 1.1, Apache 2.0 as the change license" | Verify current Restate license |
| vs-inngest | SOC 2 Type II, SAML, HIPAA BAA availability | Compliance tiers change |
| vs-inngest | Inngest server license "SSPL with delayed Apache" | Verify current license |
| vs-pydantic-ai | Pydantic AI Temporal/DBOS/Prefect/Restate integrations | Verify docs coverage |
| vs-openai-agents | First-party evals feature set | OpenAI product evolves |
| vs-claude-agent-sdk | `claude_agent_sdk` API (query, ClaudeAgentOptions, ResultMessage) | Verify against current SDK |
