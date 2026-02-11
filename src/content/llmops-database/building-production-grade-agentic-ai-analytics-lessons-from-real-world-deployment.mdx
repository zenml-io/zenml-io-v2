---
title: "Building Production-Grade Agentic AI Analytics: Lessons from Real-World Deployment"
slug: "building-production-grade-agentic-ai-analytics-lessons-from-real-world-deployment"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6908a02fbfe83ff1713fe258"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:24:16.887Z"
  createdOn: "2025-11-03T12:29:35.192Z"
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "structured-output"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "prompt-engineering"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "human-in-the-loop"
  - "agent-based"
  - "semantic-search"
  - "few-shot"
  - "evals"
  - "langchain"
  - "cache"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "api-gateway"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "documentation"
  - "security"
  - "compliance"
  - "fastapi"
  - "postgresql"
  - "openai"
  - "meta"
  - "google-gcp"
  - "microsoft-azure"
  - "amazon-aws"
industryTags: "tech"
company: "Tellius"
summary: "Tellius shares hard-won lessons from building their agentic analytics platform that transforms natural language questions into trustworthy SQL-based insights. The core problem addressed is that chat-based analytics requires far more than simple text-to-SQL conversion—it demands deterministic planning, governed semantic layers, ambiguity management, multi-step consistency, transparency, performance engineering, and comprehensive observability. Their solution architecture separates language understanding from execution through typed plan artifacts that validate against schemas and policies before execution, implements clarification workflows for ambiguous queries, maintains plan/result fingerprinting for consistency, provides inline transparency with preambles and lineage, enforces latency budgets across execution hops, and treats feedback as governed policy changes. The result is a production system that achieves determinism, explainability, and sub-second interactive performance while avoiding the common pitfalls that cause 95% of AI pilot failures."
link: "https://www.tellius.com/resources/blog/10-battle-scars-from-building-agentic-ai-analytics"
year: 2025
seo:
  title: "Tellius: Building Production-Grade Agentic AI Analytics: Lessons from Real-World Deployment - ZenML LLMOps Database"
  description: "Tellius shares hard-won lessons from building their agentic analytics platform that transforms natural language questions into trustworthy SQL-based insights. The core problem addressed is that chat-based analytics requires far more than simple text-to-SQL conversion—it demands deterministic planning, governed semantic layers, ambiguity management, multi-step consistency, transparency, performance engineering, and comprehensive observability. Their solution architecture separates language understanding from execution through typed plan artifacts that validate against schemas and policies before execution, implements clarification workflows for ambiguous queries, maintains plan/result fingerprinting for consistency, provides inline transparency with preambles and lineage, enforces latency budgets across execution hops, and treats feedback as governed policy changes. The result is a production system that achieves determinism, explainability, and sub-second interactive performance while avoiding the common pitfalls that cause 95% of AI pilot failures."
  canonical: "https://www.zenml.io/llmops-database/building-production-grade-agentic-ai-analytics-lessons-from-real-world-deployment"
  ogTitle: "Tellius: Building Production-Grade Agentic AI Analytics: Lessons from Real-World Deployment - ZenML LLMOps Database"
  ogDescription: "Tellius shares hard-won lessons from building their agentic analytics platform that transforms natural language questions into trustworthy SQL-based insights. The core problem addressed is that chat-based analytics requires far more than simple text-to-SQL conversion—it demands deterministic planning, governed semantic layers, ambiguity management, multi-step consistency, transparency, performance engineering, and comprehensive observability. Their solution architecture separates language understanding from execution through typed plan artifacts that validate against schemas and policies before execution, implements clarification workflows for ambiguous queries, maintains plan/result fingerprinting for consistency, provides inline transparency with preambles and lineage, enforces latency budgets across execution hops, and treats feedback as governed policy changes. The result is a production system that achieves determinism, explainability, and sub-second interactive performance while avoiding the common pitfalls that cause 95% of AI pilot failures."
---

## Overview

This case study documents Tellius's journey building a production-grade agentic AI analytics platform, sharing ten critical lessons learned from deploying LLMs to answer natural language business questions over enterprise data. The text is positioned as "battle scars"—practical engineering wisdom earned through real postmortems and field deployments—rather than promotional material, though readers should note it comes from the vendor itself. Tellius explicitly frames their contribution as sharing "tuition we've already paid" to help teams avoid common pitfalls when moving from LLM demos to production analytics agents.

The fundamental challenge Tellius addresses is that enterprise analytics agents face radically different constraints than academic text-to-SQL benchmarks. While demos work with carefully curated datasets, production systems must handle schemas with 300+ columns (versus academic benchmarks averaging 28), enforce row-level and column-level security policies, maintain consistency across multi-step compound queries, provide auditable explanations for regulated industries, and deliver sub-second interactive latency—all while managing cost and preventing the ambiguity and non-determinism inherent in LLM outputs from corrupting business-critical results.

## Core Architecture: Separation of Language and Logic

The architectural foundation Tellius advocates is a strict separation between language understanding (what LLMs excel at) and deterministic execution (where randomness is unacceptable). Their reference architecture flows through distinct stages: a pre-parser extracts intent, entities, and time references into a constrained schema; a planner (potentially LLM-assisted, using temperature=0 for determinism) proposes a plan; a validator normalizes that proposal into a typed, policy-checked plan artifact—what they term a "typed AST" (abstract syntax tree)—that only references governed semantic constructs; and finally a compiler emits the actual SQL/MDX/GraphQL from that validated plan.

This design enforces what Tellius calls a "deterministic plan boundary": LLMs can propose actions, but a validator ensures that dates are canonicalized, joins follow whitelisted paths, and metric-dimension pairs are permitted before any query executes. The plan artifact becomes the contract—the same input and context always yield the same plan and therefore the same result, eliminating run-to-run variance. Randomness is confined to narrative text generation; it never influences calculations or logic selection.

## The Framework Abstraction Trap

One of Tellius's sharpest criticisms targets over-reliance on generic LLM orchestration frameworks like LangChain. They cite the experience of Octomind, which spent twelve months with LangChain before completely removing it, finding they spent more time debugging the framework than building features. The core issue is that general-purpose chain frameworks optimize for developer ergonomics and demos, not for determinism, observability, or partial-failure isolation. Defaults around retries, timeouts, and caching are individually reasonable but opaque in aggregate. When something goes wrong—say, an incorrect JOIN—engineers face a half-day debugging trip through five abstraction layers.

Tellius reports sobering production measurements: 73% memory overhead, 20% higher latency, and 15% higher costs from abstraction layers in framework-based approaches. Their recommendation is to keep the execution layer thin and auditable. If you cannot immediately answer who decided to call a particular tool and how many retries fired, your orchestration is hiding critical diagnostic information. The plan artifact—the typed AST—provides the necessary transparency, making every decision explicit and traceable.

## Terminology and Scope Management

Tellius highlights terminology confusion as a real production problem. Organizations use "agent," "workflow," and "app" interchangeably, blurring scope, ownership, and runtime guarantees. They define a canonical vocabulary: an **agent** is the runtime that interprets natural language and proposes a plan; a **workflow** is an approved, versioned template of a plan with typed inputs and guardrails that can run repeatedly once inputs pass validation; an **app** is the user-facing surface (chat UI, API) that hosts agents and workflows.

Beyond terminology, schema complexity creates acute problems. A single 150-column table can consume roughly 25% of GPT-4's context window, degrading both accuracy and latency. Tellius observes that entity extraction—selecting the right tables and columns—is fragile at enterprise scale, with most failures stemming from incorrect table/column selection. Many teams add vector databases to trim schemas to manageable chunks, but this introduces new moving parts and failure modes. Tellius advocates scoping by domain rather than whole-warehouse prompts, citing AWS and Cisco reports showing accuracy exceeding 95% when narrowed to specific business domains. This scoping is backed by a versioned semantic model repository that defines metrics, dimensions, and business views as the contract between language and data.

## Language Is Not a Plan: The Prompt Engineering Dead End

Tellius argues emphatically that prompt text should capture intent, not drive execution. If generative randomness is allowed to choose dates, joins, or metric rules, the same question will yield different queries and therefore different answers. The problem is that LLMs are excellent at proposing but poor at enforcing rules. Letting stochastic generation decide execution paths means tiny wording changes ripple into different joins, time windows, and rankings.

Their solution is to split the stack cleanly. The pre-parser extracts intent; the planner proposes (at temp=0 for maximum determinism); the validator converts that proposal into a typed, policy-checked plan; and the compiler emits actual query language. Language remains for explanations and user interaction; logic is deterministic. This checkpoint between LLM proposals and actual execution resolves proposals to whitelisted joins, explicit dates, and allowed metric-dimension pairs, ensuring the same semantic question always produces the same logical query.

## Ambiguity as a Managed State

Ambiguity is not an error condition to be ignored—it is a state to be explicitly managed. Tellius defines ambiguity as situations where user language admits multiple valid interpretations: "area" might mean Region or Territory; "top customers" could rank by revenue or by order count. In production, low-confidence or multi-intent queries get misread and return the wrong data slice, eroding trust.

Tellius implements an **ambiguity detector** using confidence thresholds and separation tests: if candidate mappings tie or confidence falls below a floor, execution stops and the system asks for clarification. The **clarification manager** poses a single targeted question that resolves all current ambiguities (e.g., "By area, do you mean Region or Territory?"), avoiding multi-step pop-ups that frustrate users. Critically, the user's choice is saved as a **preference memory** scoped to user, team, or organization, with a time-to-live, so the system does not re-ask in future sessions.

Shared defaults in the semantic model provide organization-wide conventions where appropriate, reducing ambiguity at the source. Tellius tracks three key metrics: clarification rate (should be greater than zero, since zero means guessing too often), post-clarification accuracy (asking should measurably improve correctness), and repeat clarifications per user (should decline over time if preference memory works).

## Multi-Step Consistency and Replay

Multi-step or compound analyses—such as time-over-time market share or top-K by region—introduce severe consistency challenges. Tellius cites a study by Chen et al. showing GPT-4 consistency rates below 50% on compositional tasks, despite individual steps being correct. The causes are implicit time windows that drift, session or locale defaults that vary, non-deterministic ordering (missing tie-breakers reshuffling top-K), and caches keyed on raw natural language rather than normalized plans.

To achieve consistency, Tellius constructs a **canonical plan** after validation and computes a stable fingerprint by hashing the plan together with the semantic model version. This fingerprint is used as the key for both plan caches and result caches. All relative time ranges (e.g., "last quarter") are resolved to exact [start, end, timezone] tuples before SQL compilation. Deterministic ORDER BY clauses always include tie-breakers and explicit LIMITs for ranked outputs. A **replay harness** nightly re-executes a fixed suite of compound queries by fingerprint; if any result drifts beyond tolerance, rollout is blocked and an investigation triggered. This eliminates randomness in final logic selection, confining any sampling to narrative text generation.

## Transparency and Explainability: Glass-Box Answers

Black-box answers erode trust even when numerically correct. Users seeing a final number without understanding the "why"—which dataset or view was selected, which metric definition was applied, how ambiguous terms were mapped, which policies (row-level security, column-level security, fiscal calendar) influenced results—will second-guess the system. Moreover, when users provide explicit feedback (e.g., thumbs down), if that signal disappears into a black box and behavior changes without visibility or review, trust collapses.

Tellius mandates that every run emit a **preamble** (business view, metric definitions, time intervals), **lineage** (tables, joins, policy filters applied), cache status, and any fallbacks taken. Explanations must be inline in the user interface, not buried in logs. Feedback is converted into **governed policies** with explicit target, scope, time-to-live, and attribution. Organization-wide changes require approval through an admin console. Tellius implements this through a feature called "Learnings," where users teach the system their terminology preferences (e.g., "revenue" → the governed metric "bookings"). This approach acknowledges that regulators and internal risk teams increasingly expect traceable, explainable decisions, making transparency table stakes for trust and auditability.

## Cold Start and the Onboarding Challenge

The "cold start" problem is framed not as a model failure but as an onboarding and definitions gap. New users don't know what metrics, dimensions, or valid pairings exist in the governed semantic layer. They ask for "revenue" when the metric of record is "bookings," try unsupported metric-dimension combinations, and conclude the agent "doesn't work." Tellius notes that industry surveys put AI pilot failure rates near 95%, and this onboarding gap is a major contributor.

Their solution is multi-faceted. First, publish a **semantic dictionary** that anyone can search and explore, listing each metric (formula, default grain, allowed dimensions, synonyms), each dimension (type and hierarchy), and each business view (join graph and required filters). Second, offer **starter workflows by role** (e.g., Sales Ops, Finance) that are automatically filtered to the user's data and permissions, so new users see examples they can actually run. Third, implement **schema-aware autocomplete** in the UI that only suggests valid metric-dimension combinations and legal filters, preventing invalid requests before they are issued.

Tellius tracks time-to-first-successful-answer and the rate of invalid requests in the first week of use as key onboarding metrics. Telemetry from these early sessions feeds back into synonym expansion, hierarchy fixes, and refined examples, improving the experience for the next cohort of users.

## Performance Engineering: Making Fast the Default

Latency is not just an infrastructure issue—it is a product problem. Even correct answers that arrive slowly feel wrong to users. Compound questions and LLM-driven SQL generation create long-tail P95/P99 delays. AI-generated queries tend to scan significantly more data than human-written SQL unless constrained. Tellius cites a Tinybird benchmark showing best models needing 3.2 seconds for query generation alone, with AI-generated queries reading 1.5-2x more data than human SQL. Total processing can reach 6-7 seconds, killing interactive use cases, while costs escalate to $0.40+ per completion, with worst cases hitting $4.00 per answer.

To address this, Tellius sets **latency budgets per hop**: planning under 150ms, compilation under 80ms, cache hits under 100ms, warehouse execution under 700ms. They implement **two-tier caching**—plan caches and result caches keyed by fingerprint, plus delta caches for rolling windows. When cost or latency estimates exceed budgets, the system falls back to pre-aggregated views or cubes with clear disclosure to the user. Independent sub-queries are parallelized, but concurrency is capped to avoid warehouse thrashing. Query compilation includes predicate pushdown, partition pruning, and deterministic LIMITs for top-K visualizations. The team segments latency by intent type and correlates with abandon rate, optimizing hot paths first to maximize impact.

## Observability: The Difference Between "It Works" and "We Hope It Works"

Observability gaps mean teams cannot trace a result back to the plan, model version, policies, cache state, or fallback path that produced it. Without end-to-end identifiers or per-stage records, reproducing, explaining, or reliably debugging why a number changed becomes impossible. Teams end up rerunning queries until results "look right," a fundamentally unsound practice. Tellius again references Sierra's τ-bench, which reports GPT-4o agents solving under 50% of realistic tasks and dropping to roughly 25% when consistency across attempts is required. Such fragility makes traceability non-negotiable.

Tellius threads **run-ids** through every stage: pre-parse → plan → validate → compile → execute → render. Each stage logs semantic model version, clarifications asked and answered, cache decisions (and why), fallbacks taken, and policy footprints. Dashboards display P95 latency by dataset and workflow, accuracy versus clarification rate, policy and learning churn, top failing mappings, and replay drift. The principle is stark: every run without complete telemetry counts as a failure, regardless of whether the result appears correct.

## Benchmarks Versus Reality

The final lesson addresses the gap between academic benchmarks and enterprise reality. Models excelling on standard NL2SQL tasks often collapse on enterprise data. Production teams consistently report that real schemas average 300+ columns versus Spider benchmark's 28. Business definitions are nuanced; access policies fragment data views; and "most-plausible" answers are frequently wrong in business context. Evaluation focused solely on execution accuracy misses semantic ambiguity and business-logic errors.

Tellius advocates evaluating on your own domains with your own semantic layer and policies in place. Track semantic correctness (not just syntactic execution), factual consistency across rephrasings, bytes scanned, cache hit rate, hop latencies, and total cost per insight. Scope by domain to raise accuracy; treat the warehouse query optimizer as a feature rather than reinventing it; and keep humans-in-the-loop for high-risk decisions until metrics demonstrate readiness. They note that cross-functional coordination—across legal, IT, and compliance—becomes the real bottleneck, with 74% of businesses struggling with this necessary collaboration.

## Production Patterns and Governance

Throughout the case study, several cross-cutting production patterns emerge. **Policy-aware compilation** ensures that row-level security (RLS), column-level security (CLS), and column masking happen before any query runs, integrated into the plan validation stage. **Versioned semantic models** serve as the contract between language and data, with every query tied to a specific semantic model version for auditability. **Governed feedback loops** treat user corrections as policy changes requiring attribution, scope, TTL, and approval for organization-wide propagation, preventing silent behavior drift. **Replay and drift detection** continuously validate that the same plan produces the same result, catching regressions before users do.

The overall philosophy is that contracts, guardrails, and runtime discipline are paramount. Deterministic planning, a governed semantic layer, clarification policies, inline transparency, latency budgets, and comprehensive observability are described as "table stakes" rather than optional features. Tellius positions their system as having thought through these failure modes up front and implemented these patterns in production, with continuous tightening of the loop through observability, drift checks, and governed feedback.

## Critical Assessment

While Tellius provides valuable engineering insights grounded in real production challenges, readers should approach the claims with appropriate skepticism. The specific performance numbers (73% memory overhead, 20% latency increase, 15% cost increase from frameworks) and anecdotes (Octomind's twelve-month LangChain struggle, BuzzFeed's switch to direct API calls) are presented without detailed citation or reproducible methodology. The architectural patterns advocated—typed plans, deterministic validation, semantic layers—are sound and reflect industry best practices, but the text does not quantify Tellius's own system performance or provide independent validation of their approach.

The case study is strongest in articulating the *why* behind each design choice—explaining the failure modes that naive approaches encounter and the contracts necessary to prevent them—rather than providing hard data on outcomes. The emphasis on determinism, observability, and governance aligns with broader industry trends in responsible AI deployment, particularly in regulated sectors. However, prospective adopters should conduct their own benchmarking and validation, as the text is ultimately a vendor explaining their architectural philosophy rather than an independent evaluation.

The lessons around ambiguity management, cold start mitigation, and explainability are particularly well-developed and generalizable beyond Tellius's specific product. The insistence on treating feedback as governed policy changes rather than opaque embeddings, and the requirement for inline transparency with preambles and lineage, reflect mature thinking about enterprise AI trust and auditability. The performance engineering section, with its hop-level latency budgets and two-tier caching, provides actionable patterns for any team building interactive LLM-powered systems.

Overall, this case study represents a substantive contribution to LLMOps knowledge—documenting real production challenges and architectural responses—though readers should supplement it with independent research and their own experimentation when designing agentic analytics systems.