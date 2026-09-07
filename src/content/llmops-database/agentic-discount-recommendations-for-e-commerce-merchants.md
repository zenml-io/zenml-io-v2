---
title: "Agentic Discount Recommendations for E-commerce Merchants"
slug: "agentic-discount-recommendations-for-e-commerce-merchants"
draft: false
llmopsTags:
  - "data-analysis"
  - "realtime-application"
  - "structured-output"
  - "poc"
  - "rag"
  - "semantic-search"
  - "vector-search"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "evals"
  - "latency-optimization"
  - "cost-optimization"
  - "databases"
  - "orchestration"
  - "cicd"
  - "reliability"
  - "scalability"
industryTags: "e-commerce"
company: "eComm"
summary: "eComm built an agentic discount recommendation feature to help merchants replace discounting guesswork with data-informed suggestions for products, discount levels, timing, and campaign context. The production system uses multiple specialized agents, profile and data-warehouse services, Vespa hybrid retrieval, tool invocation, and free-text intent handling to generate discounts that merchants can approve and publish directly. The company reports that 60% of recommendations are approved without edits and that the project established reusable agent infrastructure and practices supporting five additional agentic initiatives, although the transcript does not provide controlled evidence that the feature increased discount adoption or gross platform volume."
link: "https://www.youtube.com/watch?v=d7zICay0xQI"
year: 2026
seo:
  title: "eComm: Agentic Discount Recommendations for E-commerce Merchants - ZenML LLMOps Database"
  description: "eComm built an agentic discount recommendation feature to help merchants replace discounting guesswork with data-informed suggestions for products, discount levels, timing, and campaign context. The production system uses multiple specialized agents, profile and data-warehouse services, Vespa hybrid retrieval, tool invocation, and free-text intent handling to generate discounts that merchants can approve and publish directly. The company reports that 60% of recommendations are approved without edits and that the project established reusable agent infrastructure and practices supporting five additional agentic initiatives, although the transcript does not provide controlled evidence that the feature increased discount adoption or gross platform volume."
  canonical: "https://www.zenml.io/llmops-database/agentic-discount-recommendations-for-e-commerce-merchants"
  ogTitle: "eComm: Agentic Discount Recommendations for E-commerce Merchants - ZenML LLMOps Database"
  ogDescription: "eComm built an agentic discount recommendation feature to help merchants replace discounting guesswork with data-informed suggestions for products, discount levels, timing, and campaign context. The production system uses multiple specialized agents, profile and data-warehouse services, Vespa hybrid retrieval, tool invocation, and free-text intent handling to generate discounts that merchants can approve and publish directly. The company reports that 60% of recommendations are approved without edits and that the project established reusable agent infrastructure and practices supporting five additional agentic initiatives, although the transcript does not provide controlled evidence that the feature increased discount adoption or gross platform volume."
notion:
  pageId: "3cff8dff-2538-801f-983a-df95a92cd0a9"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-02T22:34:00.000Z"
  lastEditedTime: "2026-09-02T22:34:00.000Z"
  publishedAt: "2026-09-07T09:27:30Z"
---

## Overview

eComm introduced an AI-assisted workflow for creating merchant discounts in its e-commerce platform. The feature is intended to address a practical conversion problem: merchants often want to run promotions but must independently decide which products to discount, what discount level to use, how long the promotion should run, and how to align the offer with a business objective. The production experience adds a “create discount with AI” action to the business manager. A merchant selects an intent—such as increasing average order value, moving products through bundles, or reducing inventory of a product—and can provide additional requirements in free text. The system then proposes a discount that the merchant can regenerate, refine, approve, and publish to the merchant’s site.

The implementation evolved from a single-agent proof of concept with hardcoded data into a multi-agent application grounded in operational and analytical data. It uses a profile service for low-latency site-level context, a consolidated product-data schema indexed in Vespa for retrieval, specialized agents for intent and data selection, and an evaluation workflow using an LLM judge. eComm reports that 60% of generated recommendations are approved without merchant edits. That is a useful product-acceptance signal, but it is not equivalent to proven incremental revenue, improved discount adoption, or higher gross platform volume; the available account does not provide an experiment design or production baseline for those outcomes.

## Business Problem

Gross platform volume is described as a major e-commerce KPI. Internal analysis found that stores running discounts had higher gross platform volume and more orders than stores that did not, while only 16% of orders included discounts compared with an industry benchmark of 25%. eComm estimated that closing this gap could represent approximately $8 million in potential annual gross platform volume. This figure is presented as an opportunity estimate rather than an observed result, and the case study does not explain the assumptions, causal model, or whether the estimate accounts for discount costs and margin effects.

The product hypothesis was that merchants were not necessarily opposed to discounting; rather, discount creation involved several uncertain decisions. A recommendation assistant could reduce that uncertainty by combining merchant intent with catalog, order, behavior, inventory, and site information. In the demonstrated flow, the system used average order value to suggest a threshold-based discount, regenerated an alternative percentage when requested, and then adapted the offer to a Valentine’s-related date requirement supplied in free text. The merchant retained approval authority, and publication occurred only after approval.

## From Prototype to Production

The project began with a deliberately narrow proof of concept: one site, one prompt, hardcoded data, and support for multiple user intents. Its purpose was not production quality but organizational validation. The team used the prototype to demonstrate that the concept could provide value, which helped secure management support, product involvement, and resources for a full implementation.

The production effort exposed gaps in the organization’s then-current LLM development lifecycle. There was no established methodology for agent design, prompt and code change management, evaluation, deployment readiness, or defining when an agentic feature was complete. Responsibilities across engineering, business analysis, data engineering, and prompt development were initially unclear. Infrastructure was also missing for multi-agent orchestration, tool invocation, workflow-level evaluation, and exposing suitable data to the model.

Rather than wait for every platform capability to exist, the team treated each gap as an implementation opportunity and addressed blockers in parallel. This approach accelerated delivery, but it also creates governance considerations: rapidly assembled agent systems need clear ownership, security controls, regression tests, rollback mechanisms, and explicit production quality gates. The case study describes the emergence of these practices, but does not detail access control, privacy handling, model-provider configuration, failure recovery, or human escalation paths.

## Architecture and Data Grounding

The initial single-agent design expanded into multiple specialized agents. One primary agent generated the discount recommendation, while other agents interpreted the user’s intent, selected the relevant data, and helped retrieve a manageable product set. The decomposition was intended to make each component easier to manage and to improve performance and accuracy by giving agents narrower objectives. It also introduced the normal operational costs of multi-agent systems: more orchestration, more tool boundaries, additional prompts to version, and more opportunities for intermediate failures.

The system needed both site-level and product-level context. Site context was obtained through a profile service, described as a low-latency key-value store, with information such as visitor counts, gross platform volume, average order statistics, and related merchant metrics. Product context was assembled from existing tables covering products, categories, inventory, and orders. Instead of issuing many API calls per product, the data engineering team joined these sources into a consolidated schema and indexed it in Vespa.

Vespa serves as the retrieval layer for the retrieval-augmented generation workflow. It supports filtering and aggregation for structured conditions as well as semantic search over product names or descriptions. This hybrid approach is important because discount recommendations require both business constraints—for example, inventory or order thresholds—and similarity-based discovery. Many merchants have thousands of products, so sending the entire catalog to an LLM would create excessive context size, latency, and cost. The design retrieves fewer than 50 relevant items using intent-dependent logic. A specialized agent helps translate the merchant’s intent into the complex query needed to filter, aggregate, rank, and retrieve those items.

The resulting data path can be summarized as:

- Merchant intent and free-text requirements are interpreted by the agent workflow.
- Site-level metrics are fetched through the profile service.
- Product, inventory, order, and catalog information is retrieved from the Vespa-indexed schema.
- A recommendation agent combines the grounded context with the requested business objective.
- The merchant reviews, regenerates, edits if needed, approves, and publishes the discount.

The design reflects a key LLMOps principle: model quality depends heavily on the timeliness, coverage, and shape of the context supplied at inference time. Moving from direct API fan-out to a purpose-built data layer improves the feasibility of real-time generation, but it also makes freshness, indexing, schema evolution, and consistency between warehouse data and live merchant state important operational concerns.

## Engineering and Governance Practices

The team centralized the agents, prompts, tool definitions, and related implementation in GitHub. This provided a single project boundary for versioning and coordinated changes across the multi-agent system. The account also describes a Java library called ADK, developed with the Nile team, to reduce boilerplate around prompt and tool access and to make the implementation more consistent and maintainable. A platformized API was used to expose the capability for delivery through the business manager.

Centralized version control is particularly relevant for LLM applications because behavior can change through prompt edits, tool-schema changes, retrieval changes, code changes, or model configuration changes. Treating prompts and tool definitions as governed artifacts makes it more practical to review changes and associate them with evaluation results. The case study does not specify branch protection, approval policies, secrets management, model pinning, deployment stages, or rollback procedures, so the maturity of the complete CI/CD process cannot be assessed from the available details.

## Evaluation and Monitoring

A major challenge was evaluating a workflow that included several agents and tools rather than a single prompt. The team created an evaluation workflow that processed hundreds of datasets and used an LLM as a judge. The judge received inputs and outputs and returned scores, allowing the team to compare the system after changes or before releases. This is a form of automated regression evaluation for the end-to-end agent workflow rather than an isolated prompt test.

After deployment, the evaluation process was extended into production-oriented analysis. An Airflow pipeline replaced the earlier evaluation orchestration approach, and actual recommendations generated in production replaced only synthetic or static test cases. Scores were stored with the recommendations in a new data-warehouse table, enabling later analysis. This creates a useful link between offline evaluation and production behavior and could support trend analysis, segmentation, and investigation of problematic recommendations.

However, LLM-as-a-judge scoring should be interpreted carefully. The account does not identify the judge model, rubric, calibration method, inter-rater agreement, or correlation with merchant satisfaction and business outcomes. Automated judges can be inconsistent, inherit the evaluator’s biases, or reward fluent but commercially weak recommendations. A robust production evaluation program would ideally combine judge scores with merchant approval and edit rates, policy and data-validity checks, latency and cost metrics, publication failures, downstream sales and margin outcomes, and controlled experiments against existing discount-creation behavior.

## Results and Tradeoffs

The reported product result is that 60% of recommendations are approved by merchants without edits. This suggests that a substantial portion of generated offers may be immediately usable, although the metric’s denominator, observation period, merchant mix, and comparison baseline are not provided. The feature also reportedly changed internal development practices: five additional agentic solutions were in progress, and the code, platform components, and problem-solving patterns from the discount project were being reused as a foundation.

The architecture trades simplicity for richer personalization. Multiple agents make responsibilities more explicit and can limit the context each agent must handle, but they increase orchestration complexity and the surface area for latency, cost, and debugging failures. Retrieval from a precomputed and indexed data layer avoids large numbers of live API calls, yet it introduces data freshness and pipeline-maintenance requirements. Free-text customization improves flexibility, but it requires validation to ensure that generated dates, thresholds, products, and discount terms conform to platform rules and merchant intent.

The most defensible conclusion is that eComm successfully moved an agentic recommendation concept into a merchant-facing production workflow and established supporting LLMOps practices around data grounding, version control, multi-agent evaluation, and post-deployment analysis. The evidence supports adoption of the feature and organizational reuse, while the larger claims about incremental gross platform volume remain hypotheses requiring business-level measurement. In particular, future evaluation should distinguish recommendation quality from actual merchant behavior, customer response, profitability, and whether the system increases appropriate discounting without encouraging unnecessary margin erosion.
