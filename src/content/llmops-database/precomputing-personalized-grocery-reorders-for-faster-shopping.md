---
title: "Precomputing Personalized Grocery Reorders for Faster Shopping"
slug: "precomputing-personalized-grocery-reorders-for-faster-shopping"
draft: false
llmopsTags:
  - "classification"
  - "chatbot"
  - "data-integration"
  - "realtime-application"
  - "structured-output"
  - "agent-based"
  - "evals"
  - "memory"
  - "prompt-engineering"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "error-handling"
  - "token-optimization"
  - "system-prompts"
  - "databases"
  - "orchestration"
  - "scaling"
  - "reliability"
industryTags: "e-commerce"
company: "Doordash"
summary: "DoorDash improved the Ask DoorDash grocery-reorder experience by moving relatively stable historical reasoning out of the online agent path. A daily pipeline uses up to 90 days of order history and relevant profile signals to generate validated, store-specific bundles of likely recurring needs with batch LLM inference; the request-time system then resolves those needs against live inventory, prices, and catalog listings. For a deterministic “reorder my usuals” entry point, this reduced the reported latency from roughly 16 seconds to roughly 2 seconds, doubled the rate at which consumers viewed the resulting list, and was associated with an approximately 34% increase in order rate for the flow. The approach retains agentic reasoning for ambiguous or dynamic requests, but the published results are company-reported and the article does not provide experimental design or statistical significance details."
link: "https://careersatdoordash.com/blog/building-ask-doordash-part-6-grocery-reorder-case-study/"
year: 2026
seo:
  title: "Doordash: Precomputing Personalized Grocery Reorders for Faster Shopping - ZenML LLMOps Database"
  description: "DoorDash improved the Ask DoorDash grocery-reorder experience by moving relatively stable historical reasoning out of the online agent path. A daily pipeline uses up to 90 days of order history and relevant profile signals to generate validated, store-specific bundles of likely recurring needs with batch LLM inference; the request-time system then resolves those needs against live inventory, prices, and catalog listings. For a deterministic “reorder my usuals” entry point, this reduced the reported latency from roughly 16 seconds to roughly 2 seconds, doubled the rate at which consumers viewed the resulting list, and was associated with an approximately 34% increase in order rate for the flow. The approach retains agentic reasoning for ambiguous or dynamic requests, but the published results are company-reported and the article does not provide experimental design or statistical significance details."
  canonical: "https://www.zenml.io/llmops-database/precomputing-personalized-grocery-reorders-for-faster-shopping"
  ogTitle: "Doordash: Precomputing Personalized Grocery Reorders for Faster Shopping - ZenML LLMOps Database"
  ogDescription: "DoorDash improved the Ask DoorDash grocery-reorder experience by moving relatively stable historical reasoning out of the online agent path. A daily pipeline uses up to 90 days of order history and relevant profile signals to generate validated, store-specific bundles of likely recurring needs with batch LLM inference; the request-time system then resolves those needs against live inventory, prices, and catalog listings. For a deterministic “reorder my usuals” entry point, this reduced the reported latency from roughly 16 seconds to roughly 2 seconds, doubled the rate at which consumers viewed the resulting list, and was associated with an approximately 34% increase in order rate for the flow. The approach retains agentic reasoning for ambiguous or dynamic requests, but the published results are company-reported and the article does not provide experimental design or statistical significance details."
notion:
  pageId: "3e9f8dff-2538-80f3-b3fb-fb79a1af4e4b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:21:00.000Z"
  lastEditedTime: "2026-09-28T08:21:00.000Z"
  publishedAt: "2026-09-28T08:23:25Z"
---

## Overview

DoorDash applies LLMs to a production grocery-reorder experience in Ask DoorDash, where consumers can request actions such as “reorder my usuals” or “reorder my usuals, but cheaper.” The central challenge is that a useful reorder list is not a simple replay of prior transactions: purchase frequency, distinct delivery count, recency, quantities, product durability, brand preferences, and pantry state all affect whether an item is likely to be needed again. At the same time, the exact product listing, inventory, price, and merchant catalog can change after the historical decision is made.

The case study’s main LLMOps contribution is an offline-to-online split. DoorDash uses a daily batch process to infer likely recurring needs from a selected cohort of consumers, then validates and stores those results as reusable bundles. At request time, deterministic code retrieves the bundle and resolves each need against the current catalog, while the Grocery agent remains available for free-form requests and cases requiring further judgment. DoorDash reports that this reduced one reorder path from approximately 16 seconds to approximately 2 seconds, doubled the rate at which consumers viewed the resulting list, and produced an approximately 34% increase in order rate for the flow. These are meaningful production outcomes, but the article does not describe a controlled-experiment design, confidence intervals, absolute baseline rates, or the precise attribution of the order-rate change, so they should be treated as reported results rather than independently verifiable evidence.

## Production problem and workflow

Ask DoorDash receives natural-language grocery requests rather than a fixed API operation. The Grocery agent routes relevant requests to a Reorder skill, whose conceptual workflow establishes the store and consumer context, retrieves and reshapes order history, selects the purchases that answer the request, resolves those needs to current products, and creates an editable shopping-list artifact. The same general capability must support materially different intents, including retrieving an item from the last order, identifying recurring purchases, and finding cheaper alternatives.

The original agentic path could require six to eight LLM calls as well as several tool calls. Each model decision could lead to a tool invocation, inspection of the result, and another decision. This flexibility is useful when the next action depends on information discovered during the turn, but it imposed a substantial latency cost for work that was based largely on slowly changing historical data. The redesign asks which decisions need to happen while the consumer waits, which can happen earlier, and which should be implemented deterministically.

## Offline LLM pipeline

A daily Spark job selects consumers with sufficient recent grocery or retail activity to support an inference about recurring needs. Cohort selection is both a quality control and a cost-control measure: a single delivery generally does not provide enough evidence to distinguish a staple from a one-off purchase, so generating a bundle for every consumer could add cost while producing low-confidence output.

For each selected consumer, the pipeline materializes two kinds of input. The first is a compact task-relevant profile containing signals such as item-category interests and brand affinities. The second is item-level grocery order history from the previous 90 days. The profile provides interpretive context, while the order events provide evidence about actual purchasing behavior. DoorDash describes trimming context so that unrelated profile information does not compete with the purchase evidence, which is a practical prompt and input-management technique for offline LLM inference.

The model is used because the relevant signals interact in ways that are difficult to capture in a single ranking rule. Frequency across distinct deliveries is treated as the primary indication of a recurring need; recency helps determine whether that need remains active; and replenishment characteristics help distinguish quickly consumed goods from durable products. Brand affinity can refine the selection but is not intended to outweigh direct purchase evidence. Stock-on-hand or pantry context can reduce the priority of a recently purchased durable product, while a regularly purchased perishable may remain relevant despite a short gap since its last purchase.

The output is a bundle of recurring items for each relevant store. The maximum item count is a ceiling rather than a requirement, and the model may return fewer items or abstain when the history does not support a useful result. Output constraints require store and item identifiers to come from the supplied history, favor repeat purchases over one-offs, and collapse near-duplicate variants. The bundle retains purchase frequency, recency, and typical quantity so the online path does not need to repeat the historical reasoning.

## Durable representation and deterministic safeguards

A key design decision is to represent a recurring need at multiple catalog levels rather than persist only a brittle SKU-like identifier or only a vague text term. Each item can retain a historical store item ID for the most precise match, a catalog-level product identifier for the underlying product across listings, and a generic search term as a fallback. At serving time, the system attempts the most specific eligible match first, then progressively broader representations. This makes the offline decision durable even when merchant-specific listings change or disappear.

The LLM determines the semantic question—whether a historical need is worth carrying forward—while deterministic online logic determines what product can satisfy that need now. Before publication, validation distinguishes explicit abstention from malformed output, removes unusable identifiers, normalizes quantities, and filters results that do not satisfy the bundle contract. This separation limits the impact of malformed or unsupported model output and places safety and schema enforcement outside the model.

Validated bundles are published to a low-latency key-value store. DoorDash describes a sharded Metaflow infrastructure for running batch generation independently, retrying failed shards, and preserving successful work when only part of a batch fails. A missing or unusable bundle degrades to an empty response rather than failing the entire Grocery interaction. The same precomputed signal may also support other personalized surfaces, although the article does not quantify reuse or its effect on infrastructure cost.

## Online serving and agent integration

The request-time path keeps information that is inherently dynamic. Inventory, prices, promotions, package sizes, and catalog listings must be checked against current conditions. The service retrieves the bundle for the selected consumer and store, attempts the stored identifiers in order of specificity, and falls back to search when necessary. It then creates a grounded, editable shopping list. Consumers can change quantities, remove products, swap items, or add the list to the cart through structured artifact operations rather than requiring another LLM round trip for every edit.

There are two important entry paths. In a free-form request, the Grocery agent and Reorder skill interpret the consumer’s language and may use additional context or clarification. In a dedicated contextual “Reorder my usuals” action, the client already supplies the intent and store scope. A typed scope enables a deterministic backend path to retrieve the precomputed bundle without using the model for request interpretation or tool selection. These paths converge on the same shopping-list artifact, so the user experience can remain continuous even though the amount of online reasoning differs.

More complex requests preserve agentic behavior. For “my usuals, but cheaper,” the system can start with the precomputed recurring needs and then reason over current prices, promotions, alternatives, package sizes, inventory, and consumer constraints. The architecture therefore does not eliminate LLM calls; it reserves them for situations where live judgment or ambiguity adds value.

## Evaluation and operational controls

DoorDash evaluates both the execution path and the result. Execution-oriented checks include whether the agent retrieved the required context and history and followed the expected workflow. Result-oriented checks assess whether the list is actionable and whether its contents reflect recurring needs. Examples include preserving repeated yogurt purchases and quantities, excluding items seen only once, and honoring statements that the consumer already has an item at home.

Because live order history changes, the team uses a fixture-based Conversation Simulator to replay reorder scenarios against fixed purchase histories. Checklist-style rubrics provide repeatable tests for recurring items, one-off purchases, quantities, and known preferences as the implementation changes. This is particularly appropriate for a workflow whose output depends on nuanced evidence: a stable fixture makes regression comparisons possible even though production histories evolve.

The article indicates that validation occurs before a bundle enters the serving contract and that partial batch failures are isolated and retryable. Together, these are important LLMOps controls: reproducible test inputs, explicit output constraints, deterministic post-processing, schema or identifier validation, cohort gating, and graceful degradation. However, the case study does not report precision or recall for “usual” selection, abstention rates, model versions, prompt versions, token or inference costs, drift monitoring, or how frequently bundles are refreshed beyond the stated daily pipeline. Those omissions make it difficult to assess quality-cost tradeoffs in detail.

## Results and tradeoffs

The reported latency improvement—from about 16 seconds to about 2 seconds on one reorder path—comes from removing historical reasoning and intent interpretation from the synchronous path, not simply from making the LLM faster. DoorDash also reports that consumers viewed the resulting list at twice the previous rate and that the flow produced an approximately 34% increase in order rate. Higher-capability models became more practical for the offline task because their generation latency was no longer directly imposed on the shopping interaction, and the company attributes improved usual selection to that change.

The tradeoff is freshness and complexity. A daily bundle can become stale when a consumer’s preferences, pantry state, store choice, or shopping behavior changes between generations. Live catalog resolution handles inventory and listing changes, but it cannot completely correct an incorrect offline inference about what the consumer needs. The system mitigates this through relevant profile signals, current catalog checks, abstention, editable results, and continued agent access, but these safeguards do not guarantee that every list is appropriate.

Overall, the case demonstrates a pragmatic production pattern for LLM applications: use batch inference for expensive, relatively stable personalization; use deterministic validation and serving for reliability; keep dynamic facts online; and retain agents for genuinely ambiguous requests. The strongest evidence presented is the operational latency result and the described architecture. The engagement and order-rate improvements are promising company-reported outcomes, but a fuller assessment would require details about experimental controls, segment effects, failure rates, quality metrics, cost per generated bundle, and the behavior of consumers who receive no bundle or an incorrect one.
