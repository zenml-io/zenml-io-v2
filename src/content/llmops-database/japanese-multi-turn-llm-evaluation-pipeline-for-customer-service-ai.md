---
title: "Japanese Multi-Turn LLM Evaluation Pipeline for Customer-Service AI"
slug: "japanese-multi-turn-llm-evaluation-pipeline-for-customer-service-ai"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "data-analysis"
  - "visualization"
  - "evals"
  - "human-in-the-loop"
  - "cost-optimization"
  - "open-source"
  - "microsoft-azure"
  - "openai"
  - "anthropic"
  - "hugging-face"
industryTags: "e-commerce"
company: "wevnal"
summary: "wevnal and Microsoft engineers used a two-day hackathon to build a reproducible evaluation pipeline for Japanese conversational models supporting customer-service experiences such as BOTCHAN AI Call. The system evaluates 24 models across 39 two-turn conversations, three personas, and four quality facets—brevity, fluency, emotional intelligence, and role-playing—rather than relying on English-centric single-turn benchmarks. It adds benchmark auditing, multi-provider model discovery, price-tier-aware selection, SHA256 content-addressed caching, judge-based scoring, visualizations, and CI-friendly exports. The reported outcome is a production-conscious evaluation foundation that can reduce a broad model candidate set to a smaller shortlist, although the source does not report customer-facing quality improvements, operational deployment, or validation against live call-center KPIs."
link: "https://devblogs.microsoft.com/ise/japanese-llm-evaluation-pipeline-hackathon/"
year: 2026
seo:
  title: "wevnal: Japanese Multi-Turn LLM Evaluation Pipeline for Customer-Service AI - ZenML LLMOps Database"
  description: "wevnal and Microsoft engineers used a two-day hackathon to build a reproducible evaluation pipeline for Japanese conversational models supporting customer-service experiences such as BOTCHAN AI Call. The system evaluates 24 models across 39 two-turn conversations, three personas, and four quality facets—brevity, fluency, emotional intelligence, and role-playing—rather than relying on English-centric single-turn benchmarks. It adds benchmark auditing, multi-provider model discovery, price-tier-aware selection, SHA256 content-addressed caching, judge-based scoring, visualizations, and CI-friendly exports. The reported outcome is a production-conscious evaluation foundation that can reduce a broad model candidate set to a smaller shortlist, although the source does not report customer-facing quality improvements, operational deployment, or validation against live call-center KPIs."
  canonical: "https://www.zenml.io/llmops-database/japanese-multi-turn-llm-evaluation-pipeline-for-customer-service-ai"
  ogTitle: "wevnal: Japanese Multi-Turn LLM Evaluation Pipeline for Customer-Service AI - ZenML LLMOps Database"
  ogDescription: "wevnal and Microsoft engineers used a two-day hackathon to build a reproducible evaluation pipeline for Japanese conversational models supporting customer-service experiences such as BOTCHAN AI Call. The system evaluates 24 models across 39 two-turn conversations, three personas, and four quality facets—brevity, fluency, emotional intelligence, and role-playing—rather than relying on English-centric single-turn benchmarks. It adds benchmark auditing, multi-provider model discovery, price-tier-aware selection, SHA256 content-addressed caching, judge-based scoring, visualizations, and CI-friendly exports. The reported outcome is a production-conscious evaluation foundation that can reduce a broad model candidate set to a smaller shortlist, although the source does not report customer-facing quality improvements, operational deployment, or validation against live call-center KPIs."
notion:
  pageId: "3e9f8dff-2538-800a-98f1-dfbcaa61a3b9"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:20:00.000Z"
  lastEditedTime: "2026-09-28T08:20:00.000Z"
  publishedAt: "2026-09-28T08:23:34Z"
---

## Overview

wevnal, whose customer-service product portfolio includes BOTCHAN AI Call, partnered with Microsoft engineers in April 2026 to address a practical LLMOps problem: selecting and improving models for natural Japanese customer conversations. Traditional benchmarks such as MT-Bench and MMLU were considered insufficient for this use case because they are primarily English-oriented, often single-turn, and focused on general accuracy rather than Japanese keigo, emotional sensitivity, persona consistency, and conversational continuity. The team therefore built a reusable evaluation harness and an authored Japanese benchmark during a two-day hackathon.

The resulting system is best understood as a model-selection and regression-evaluation foundation, not as evidence that a particular model has already improved a production customer-service system. It evaluates 24 models from OpenAI, Azure, Anthropic, and open-source providers across 39 two-turn conversations, three personas, and four facets of quality. The stated purpose is an initial filter: narrow approximately 50 candidates to three to five models for deeper, product-specific evaluation. The source reports a roughly 45-minute end-to-end run and a collection of reproducibility and visualization features, but it does not provide live deployment results, customer satisfaction changes, containment rates, latency service-level objectives, or evidence that benchmark rankings predict real call-center outcomes.

## Problem and evaluation objectives

The target environment is a conversational customer-service experience where a response must be more than a factually plausible FAQ answer. For example, a customer may first ask about a delayed order and then become anxious after a tracking page says the order was delivered. A useful response must maintain the assigned role, use an appropriate level of Japanese politeness, acknowledge the emotional change, avoid unnecessary repetition, and continue the interaction coherently.

The team identified four related problems. There was no shared rubric for Japanese conversational naturalness or emotional attunement. Existing evaluation efforts were fragmented across isolated RAG or single-turn accuracy tests rather than an end-to-end workflow. High-quality Japanese conversational data and established ground truth were scarce. Finally, manual testing disconnected from CI/CD made model comparison slow and difficult to repeat. These constraints motivated an automated pipeline that could run consistently across many providers and models.

The benchmark deliberately measures conversations rather than isolated turns. Its 39 question pairs each contain an initial request and a follow-up, distributed evenly among the `customer_service`, `casual_friend`, and `senior_professional` personas. Two turns are treated as the minimum useful unit for detecting whether a model tracks context, responds to emotional escalation, avoids restating itself, and preserves its role. Each conversation is assessed on brevity and conciseness, emotional intelligence, role-playing, and fluency. The four facets are semantic quality dimensions chosen for the intended production scenarios, rather than generic capability scores.

## Separation of framework and benchmark data

A central architectural choice was to separate the evaluation framework from the benchmark dataset. The framework generates model responses, orchestrates judge calls, aggregates scores, and renders charts without embedding knowledge of particular questions. The dataset contains authored Japanese prompts and follow-ups, judge prompts, model answers, and judgment outputs as queryable data.

This separation allows the team to change judge prompts, introduce new facets, or reuse the pipeline with another benchmark without rewriting orchestration code. It also supports a clearer licensing boundary. The post states that framework code inherits Apache 2.0 from FastChat, while the authored dataset was designed to be MIT-clean and was inspired by ELYZA-tasks-100. The licensing description is an implementation and publication consideration rather than a quality guarantee; organizations would still need to verify the provenance and licensing of any dependencies and benchmark materials before redistribution.

## Benchmark auditing and data quality

Because the benchmark itself becomes a production decision input, the project includes a three-tier audit process. Mechanical checks validate the schema, persona coverage, topic and edge-case coverage, and category diversity. LLM-judged checks score a sample for persona adherence and linguistic naturalness. A human reviewer performs a leakage-oriented spot check by examining distinctive ten-word spans from 10 percent of the items and searching for their presence in known public corpora.

The audit emits both JSON and Markdown reports. The example report shows all 39 items passing schema validation, an even distribution of 13 items per persona, a warning about concentration in the general category, and a linguistic-naturalness sample score of 4.3. Audit failures are advisory rather than blocking because some diversity decisions may be intentional editorial choices. This is a pragmatic design for rapid iteration, but it means the pipeline does not automatically prevent a questionable benchmark revision from being used. A mature production process would likely pair the advisory report with explicit review ownership, versioning, and release criteria.

The leakage check is also limited in scope. Searching distinctive spans from a sample can identify obvious overlap, but it cannot prove that a dataset is uncontaminated or representative. Similarly, an LLM judge rating the benchmark’s naturalness introduces another model-dependent assessment layer. These limitations are important because benchmark quality directly affects model rankings.

## Model catalog and selection

The pipeline maintains a separate model catalog before evaluation calls are made. It combines Azure deployment status, lifecycle information, and endpoint metadata with capability indices and pricing obtained from the Artificial Analysis API. Records include provider identifiers, model slugs, creator information, lifecycle status, intelligence, coding and math indices, pricing, and tokens-per-second information where available.

The catalog computes an attractiveness or “quality per cost” value by dividing a selected quality index by blended price per million tokens. However, the harness does not simply select the cheapest models with the highest ratio. It partitions models into price quantiles, ranks models by attractiveness within each bucket, and allocates slots with a bias toward higher-priced tiers. This bucket-biased strategy is intended to retain a mix of flagship, mid-tier, and budget models, reducing the risk that a noisy or incomplete price-quality ratio dominates the candidate pool.

This is a useful operational compromise, but the attractiveness metric is only a prior for choosing candidates. Artificial Analysis indices may not predict Japanese conversational quality, and blended pricing may not represent a particular deployment’s actual input/output mix, discounts, throughput constraints, or regional costs. The benchmark’s own facet scores therefore remain necessary, and final selection still requires product-specific testing.

## Execution, caching, and scoring

The system calls multiple model providers and uses judge prompts to score generated conversations. Requests are cached using SHA256 over canonical JSON containing the target model, system and conversation messages, temperature, maximum tokens, and reasoning-effort settings. Identical inputs map to the same cache object, which avoids duplicate API costs and makes reruns more reproducible. The example cache path is organized under a FastChat-related local cache directory.

Caching provides important LLMOps benefits: it reduces the cost of repeated experiments, accelerates development, and preserves a record of the exact request identity. It does not by itself guarantee deterministic model behavior when a cache miss occurs. Provider-side model updates, routing changes, hidden system behavior, or nondeterministic generation can still affect new outputs. A production-grade extension would need explicit model version capture, prompt and dataset versioning, cache invalidation policy, and secure handling of potentially sensitive prompts and outputs; those controls are not described in the source.

An early design scored every turn independently. The team changed to whole-conversation scoring because emotional intelligence and role-playing often emerge across turns. The change also reduced the judge API budget for a 12-model run from 3,744 calls to 1,872, enabling more repeatable runs within the hackathon budget. The headline configuration evaluates 24 models, 39 conversation pairs, three personas, and four facets, with approximately 1,872 judge calls per run reported in the post. The exact relationship between the 12-model call comparison and the 24-model headline run is not explained, so these figures should be treated as configuration-specific rather than universal workload estimates.

Aggregated results are available by model, facet, turn, and persona. A model record can contain an overall score, facet means, turn means, and persona means. This makes it possible to distinguish a model that performs consistently from one that has a strong overall average but weak customer-service or follow-up performance. The pipeline also joins benchmark scores with price and catalog-derived ROI fields for comparative analysis.

## Results, visualizations, and operational value

The reported deliverables include the curated benchmark, reusable multi-turn evaluation pipeline, three-tier audit system, model catalog, bucket-biased candidate selection, deterministic caching, publication-ready charts, and CI-friendly leaderboard exports. The pipeline reportedly completes in approximately 45 minutes end to end. Eight visualization types are supported: radar, bar, heatmap, lollipop, diverging, parallel-coordinates, Minard-style capability march, and cost-versus-performance scatter plots. The first four are described as core facet-comparison charts, while the overlays support reference-model comparison, cross-facet trajectories, persona-oriented views, and price-quality analysis.

These outputs make the system useful for model screening and regression analysis. Engineers can compare fluency separately from emotional intelligence, inspect persona-specific weaknesses, and identify whether a lower-cost model is competitive enough for deeper testing. CI-friendly exports also create a path toward evaluating model or prompt changes as part of an engineering workflow. Nevertheless, the source does not state that the leaderboard is already gating releases, automatically blocking regressions, or operating as a live production monitor.

## Tradeoffs and limitations

The benchmark’s explicit role as an initial filter is a strength because it avoids presenting a small authored dataset as a definitive measure of Japanese conversational ability. The tradeoff is breadth over depth: 39 two-turn pairs cannot cover the full range of customer intents, dialects, accessibility needs, safety issues, escalation policies, or long-running conversations encountered by a call-center product. LLM-as-a-judge scoring can scale evaluation, but judge preferences, prompt sensitivity, language competence, and position bias can influence results. Human review and calibrated reference examples would be needed for high-stakes decisions.

The benchmark also emphasizes semantic interaction quality rather than the complete operational behavior of a voice system. The post mentions future expansion into voice-pipeline evaluation and broader multilingual scenarios, but the current work does not report speech recognition, text-to-speech, interruption handling, latency, telephony integration, tool-use correctness, privacy, safety, or escalation-to-human performance. Likewise, the examples and metrics do not establish whether higher benchmark scores produce better customer satisfaction or business outcomes.

Overall, the hackathon produced a credible production-oriented evaluation foundation for wevnal’s Japanese conversational AI use case. Its strongest LLMOps contributions are repeatable multi-provider testing, explicit quality facets, benchmark auditing, cost-aware model discovery, content-addressed caching, and structured artifacts suitable for collaboration and CI integration. Its results should be interpreted as an engineering baseline and candidate-screening mechanism, with live-product validation and broader test coverage still required before using the scores as release or procurement decisions.
