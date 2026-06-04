---
title: "Unified Pipeline for AI Token Spend Management and Attribution"
slug: "unified-pipeline-for-ai-token-spend-management-and-attribution"
draft: false
llmopsTags:
  - "customer-support"
  - "code-generation"
  - "classification"
  - "summarization"
  - "data-analysis"
  - "prompt-engineering"
  - "token-optimization"
  - "cost-optimization"
  - "latency-optimization"
  - "error-handling"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "fastapi"
  - "redis"
  - "cache"
  - "scalability"
  - "reliability"
  - "security"
  - "openai"
  - "anthropic"
  - "google-gcp"
  - "microsoft-azure"
  - "amazon-aws"
industryTags: "finance"
company: "Ramp"
summary: "Ramp built a production system to track and manage AI token spend across their organization and for their customers. The problem they addressed was the opacity and volatility of AI costs, which can spike unpredictably due to consumption-based pricing, distributed usage across teams, and lack of visibility into what's driving costs. Their solution involved building a real-time pipeline that ingests usage events from AI gateways (LiteLLM and OpenRouter) via webhooks, streams them through Kafka, stores them in ClickHouse for fast analytics, and provides dashboards with multi-dimensional attribution by user, team, project, model, and use case. The system helped them identify cost issues like phantom reasoning tokens causing unexpected latency and expense, provided forecasting capabilities, and enabled customers to detect patterns like oversized models for simple tasks, missing caching, runaway agent loops, and prompt bloat."
link: "https://builders.ramp.com/post/ai-token-spend-management"
year: 2026
seo:
  title: "Ramp: Unified Pipeline for AI Token Spend Management and Attribution - ZenML LLMOps Database"
  description: "Ramp built a production system to track and manage AI token spend across their organization and for their customers. The problem they addressed was the opacity and volatility of AI costs, which can spike unpredictably due to consumption-based pricing, distributed usage across teams, and lack of visibility into what's driving costs. Their solution involved building a real-time pipeline that ingests usage events from AI gateways (LiteLLM and OpenRouter) via webhooks, streams them through Kafka, stores them in ClickHouse for fast analytics, and provides dashboards with multi-dimensional attribution by user, team, project, model, and use case. The system helped them identify cost issues like phantom reasoning tokens causing unexpected latency and expense, provided forecasting capabilities, and enabled customers to detect patterns like oversized models for simple tasks, missing caching, runaway agent loops, and prompt bloat."
  canonical: "https://www.zenml.io/llmops-database/unified-pipeline-for-ai-token-spend-management-and-attribution"
  ogTitle: "Ramp: Unified Pipeline for AI Token Spend Management and Attribution - ZenML LLMOps Database"
  ogDescription: "Ramp built a production system to track and manage AI token spend across their organization and for their customers. The problem they addressed was the opacity and volatility of AI costs, which can spike unpredictably due to consumption-based pricing, distributed usage across teams, and lack of visibility into what's driving costs. Their solution involved building a real-time pipeline that ingests usage events from AI gateways (LiteLLM and OpenRouter) via webhooks, streams them through Kafka, stores them in ClickHouse for fast analytics, and provides dashboards with multi-dimensional attribution by user, team, project, model, and use case. The system helped them identify cost issues like phantom reasoning tokens causing unexpected latency and expense, provided forecasting capabilities, and enabled customers to detect patterns like oversized models for simple tasks, missing caching, runaway agent loops, and prompt bloat."
notion:
  pageId: "375f8dff-2538-80a1-bd92-cd62a9d4fc75"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-04T08:06:00.000Z"
  lastEditedTime: "2026-06-04T08:06:00.000Z"
  publishedAt: "2026-06-04T08:37:08Z"
---

## Overview and Context

Ramp, a corporate spend management platform, built a comprehensive token spend tracking system to address the growing challenge of AI cost visibility and management. The case study, published in April 2026, describes both their internal use of the system and how they've made it available to their customers. The motivation came from observing that AI token spend has become one of the most opaque and volatile line items in corporate budgets, with consumption-based pricing that can spike dramatically when issues like runaway agent loops or configuration errors occur. According to their AI Index data, nearly half of businesses on their platform now pay for at least one AI model provider, and average monthly AI token spend across customers has increased 13x.

The article opens with a concrete incident that demonstrates the value of their system: an engineer received a page about latency degradation in their auto-routing product. Despite all downstream dependencies appearing normal, their Gemini API calls showed unusual delays. Through detailed investigation using their token tracking system, they discovered that a LiteLLM package upgrade had caused a Gemini model to produce phantom reasoning tokens by default, driving up both latency and cost. This incident illustrates a key insight about LLMOps in production: without granular visibility into token-level behavior, many cost and performance issues remain invisible until invoices arrive.

## Architecture and Technical Implementation

Ramp's system follows a streaming architecture designed for real-time ingestion, durability, and fast analytics. The pipeline consists of several key components working together to handle the bursty nature of AI usage events.

**Ingestion Layer**: The system exposes two Developer API endpoints that receive usage events via webhooks. The first endpoint (`POST /developer/v1/ai-usage/litellm`) accepts LiteLLM's Standard Logging format, while the second (`POST /developer/v1/ai-usage/openrouter`) receives OpenRouter's OpenTelemetry (OTLP) trace export payloads. Every incoming request passes through a decorator stack that validates OAuth2 tokens, establishes Row-Level Security (RLS) with the token's business_id as the tenant identifier, checks IP whitelists when enabled, and writes audit log entries. Both endpoints are designed to be idempotent and accept arbitrary metadata for attribution purposes. This webhook-based approach means customers don't need to modify their application code significantly - they simply configure their AI gateways to send events to Ramp's endpoints.

**Event Streaming with Kafka**: The architecture uses Kafka as a critical decoupling layer between ingestion and storage. This choice addresses a fundamental challenge in LLMOps monitoring: AI usage is inherently bursty. A single customer might generate tens of thousands of events per minute during batch jobs or when autonomous agents enter processing loops. By placing Kafka between the webhook endpoints and the storage layer, Ramp can absorb traffic spikes without backpressuring the ingestion endpoints. If ClickHouse becomes temporarily unavailable, events queue in Kafka rather than being dropped, providing durability and replayability. This pattern demonstrates an important principle in production LLM systems: buffering and asynchronous processing are essential for handling the unpredictable load patterns that characterize AI workloads.

**Storage with ClickHouse**: A Kafka sink connector writes events into a ClickHouse table configured with a ReplacingMergeTree engine. The table is ordered by `(business_id, source, event_id)` with `created_at` as the version column. This design provides two critical capabilities: multi-tenant isolation where every query is automatically scoped to a business, and storage-level deduplication that ensures replayed events converge to exactly-once semantics without requiring application logic. The columnar format enables extremely fast aggregation queries - computing a month of usage grouped by model and team takes milliseconds rather than seconds. The schema uses `Decimal(20,10)` precision for cost fields, which the engineers note is deliberate: per-token costs like $0.0000150 require this precision because rounding to fewer decimal places compounds into meaningful drift when processing millions of events per month. This attention to numerical precision reflects the financial accountability requirements of production LLMOps.

**Analytics and Insights Layer**: The read path aggregates raw events into daily summaries grouped by provider, model, and date, computing aggregate metrics per group. These summaries feed into paginated REST endpoints that support filtering by provider, model, department, user, and date range. The same data flows into Ramp's AI analytics pipeline, which produces actionable insights and forecasts. The system uses StatsD counters to instrument the pipeline at each stage, with metrics flowing into Datadog. Internal automations automatically detect anomalies, triage issues, and route alerts, allowing the team to catch pipeline problems before customers notice data gaps. This self-healing approach to operations is characteristic of mature LLMOps systems.

## Integration with AI Gateways

The system supports two dominant gateway patterns in the AI ecosystem, each with distinct characteristics that influenced Ramp's integration approach.

**LiteLLM Integration**: LiteLLM is a self-hosted proxy that provides teams with full data sovereignty while offering a unified interface to multiple LLM providers. It fires callbacks on every completion, with each event carrying model name, provider, token counts, cost, cache status, and user identity. Ramp is now a built-in callback in LiteLLM, meaning customers can enable tracking simply by adding "ramp" to their callbacks configuration and setting their RAMP_API_KEY environment variable. For organizations running older LiteLLM versions, the article provides a custom callback handler implementation that buffers events and flushes them in batches of 50, demonstrating practical patterns for efficient event transmission. The handler extracts key fields like litellm_call_id, model, custom_llm_provider, token counts, response cost, cache hit status, and end user information.

**OpenRouter Integration**: OpenRouter is a hosted gateway that provides access to over 400 models through a single API key, eliminating infrastructure management overhead. It uses the Broadcast feature to emit OpenTelemetry trace export payloads, with one span per API call following GenAI semantic conventions. Ramp's endpoint accepts these OTLP payloads directly without requiring custom code on the customer side. The processing logic walks the nested OTLP structure (`resourceSpans → scopeSpans → spans[]`) and extracts typed attributes from each span's attributes array, handling the OTLP AnyValue oneof union type (stringValue, intValue, doubleValue, boolValue). The extracted fields follow GenAI semantic conventions including `gen_ai.request.model`, `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`, `gen_ai.usage.input_tokens.cached`, `gen_ai.usage.output_tokens.reasoning`, and `gen_ai.usage.total_cost`. Connection-test spans are filtered out before processing to avoid polluting usage data.

**Unified Event Model**: Despite the different formats from LiteLLM and OpenRouter, both endpoints normalize their respective inputs into a single ClickHouse schema. The unified model includes business_id for tenant isolation, source field indicating whether the event came from LiteLLM or OpenRouter, event_id as a deduplication key, model name, custom_llm_provider, various token counts (prompt, completion, cached, reasoning), high-precision cost as Decimal(20,10), end_user for attribution, freeform event_metadata as JSON, request_tags as an array, and start/end timestamps. This normalization enables consistent querying and analysis regardless of which gateway generated the events.

## Attribution and Cost Visibility

A central theme of the case study is that data is only useful if you can slice it meaningfully. The metadata flowing through these endpoints enables several critical dimensions of analysis that move beyond simple aggregate spend tracking.

**Person-level attribution**: LiteLLM's user_id on virtual keys and OpenRouter's user.id span attribute map to individual developers, enabling queries like "Who is spending the most on AI this month?" This granularity is essential for understanding actual usage patterns and identifying optimization opportunities.

**Team-level attribution**: LiteLLM's team_id and OpenRouter's per-key Broadcast routing map to departments, connecting directly to Ramp's existing organizational structure. This allows finance teams to allocate costs appropriately and identify which teams might benefit from usage optimization guidance.

**Project-level attribution**: Organizations can pass project identifiers as metadata in LLM calls, enabling analysis like "How much is the customer support bot costing us versus the code review tool?" This business-aligned attribution is what executives actually care about when evaluating AI investments.

**Model-level analysis**: Every event includes the model name, making it possible to identify patterns like "60% of spend is on GPT-4o but most of those calls are simple classification tasks" - a clear optimization opportunity to use smaller, cheaper models.

**Use case tagging**: Teams can tag calls as code-generation, summarization, data-extraction, customer-facing, or any custom categories. This transforms opaque spending data into actionable business intelligence: instead of "we spent $47K on Claude," finance teams can say "we spent $31K on AI-powered customer support, which deflected 12,000 tickets," directly connecting cost to business value.

## Production Issues and Learning

The case study is particularly valuable for its frank discussion of the kinds of issues that arise when running LLMs in production. These patterns represent the hard-won operational knowledge that separates theoretical LLMOps from real-world practice.

**Phantom reasoning tokens**: The opening incident about the LiteLLM package upgrade causing Gemini models to generate reasoning tokens by default illustrates how library updates can have unexpected cost and latency implications. Without token-level visibility, this would have appeared as unexplained cost increases and degraded performance.

**Oversized models for simple tasks**: The model field in usage events makes it immediately visible when classification endpoints are hitting frontier models unnecessarily. This is one of the most common cost optimization opportunities in production LLM systems.

**Missing caching**: Identical prompts hitting the API repeatedly without cache utilization represents wasted spend. The cache_hit field in LiteLLM events shows how effective (or nonexistent) caching strategies are, enabling teams to quantify the ROI of implementing prompt caching.

**Geo pricing premiums**: The article notes that Anthropic charges a 1.1x premium for US-region inference. If cost accounting uses published list prices without the geo multiplier, every invoice will come in 10% higher than expected. This highlights how provider-specific pricing complexity requires careful modeling.

**Runaway agent loops**: Autonomous agents that retry indefinitely or enter infinite planning loops can cause dramatic cost spikes. The system enables detection of these patterns, and the article recommends gateway-level rate limits and per-request cost caps as the first line of defense.

**Abandoned experiments**: Development keys left running after projects wrap up continue accumulating costs unnecessarily. Setting time-to-live (TTL) on virtual keys so they auto-expire prevents this form of waste.

**Prompt bloat**: System prompts that grew over months until they consume 8,000 tokens per request represent a subtle but significant cost driver. When input tokens consistently run 10x output tokens, the prompts need optimization - a pattern that's only visible with detailed token tracking.

## Forecasting and Proactive Management

Beyond reactive cost tracking, the system provides forecasting capabilities that project future spending based on existing patterns. This forward-looking visibility is essential for budget planning and enables proactive intervention before costs spiral. The article mentions that the system surfaces automated recommendations to cut costs, even suggesting fundamental changes like restructuring model outputs when appropriate.

## Implementation Accessibility

The case study emphasizes the ease of adoption. Any Ramp admin can generate an API key from the integrations page with no sales process. For LiteLLM, integration requires adding "ramp" to callbacks and setting an environment variable. For OpenRouter, it requires toggling Broadcast in settings and adding Ramp as a destination. Organizations are encouraged to tag requests with team, project, environment, or any freeform metadata, which flows directly into dashboard breakdowns.

## Critical Assessment

While the case study provides valuable technical detail about production LLMOps challenges, it should be read with awareness that it's published by Ramp to promote their product. The claimed benefits - cost savings, issue detection, forecasting - are presented as straightforward outcomes, but the article doesn't discuss implementation challenges, edge cases in production, or limitations of their approach. The incident about phantom reasoning tokens demonstrates real value, but it's a single anecdote rather than systematic evidence of cost savings across their customer base.

The architecture choices (Kafka for buffering, ClickHouse for analytics, high-precision decimals for costs, OTLP standard support) are sound and reflect genuine understanding of production requirements. The multi-dimensional attribution model addresses real business needs. However, organizations considering similar systems should recognize that token tracking is necessary but not sufficient for cost control - it must be paired with governance policies, cost budgets, and engineering discipline around model selection and prompt optimization.

The reliance on integrations with LiteLLM and OpenRouter means organizations using other gateways or calling providers directly would need additional work. The case study doesn't address how the system handles edge cases like failed requests, retries, streaming responses, or function calling, which can complicate token accounting in production.

Overall, this represents a mature approach to an important LLMOps challenge: making AI costs visible, attributable, and manageable. The technical architecture is well-suited to the problem domain, and the issues they identify (oversized models, missing caching, runaway loops, prompt bloat) reflect genuine production experience. Organizations building internal LLM platforms would benefit from understanding these patterns, whether they adopt Ramp's product or build similar capabilities themselves.
