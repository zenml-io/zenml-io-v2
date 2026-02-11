---
title: "Building a Resilient Embedding System for Semantic Search"
slug: "building-a-resilient-embedding-system-for-semantic-search"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ae6dac583f4c7152a2a04"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:50.307Z"
  createdOn: "2025-12-23T19:00:42.244Z"
llmopsTags:
  - "question-answering"
  - "document-processing"
  - "data-analysis"
  - "embeddings"
  - "semantic-search"
  - "cost-optimization"
  - "error-handling"
  - "latency-optimization"
  - "databases"
  - "monitoring"
  - "orchestration"
  - "reliability"
  - "scalability"
  - "security"
  - "openai"
industryTags: "tech"
company: "Airtable"
summary: "Airtable built a production-scale embedding system to enable semantic search across customer data, allowing teams to ask questions like \"find past campaigns similar to this one\" or \"find engineers whose expertise matches this project.\" The system manages the complete lifecycle of embeddings including generation, storage, consistency tracking, and migrations while handling the challenge of maintaining eventual consistency between their primary in-memory database (MemApp) and a separate vector database. Their approach centers on a flexible \"embedding config\" abstraction and a reset-based strategy for handling migrations and failures, trading off temporary downtime and regeneration costs for operational simplicity and resilience across diverse scenarios like database migrations, model changes, and data residency requirements."
link: "https://medium.com/airtable-eng/building-a-resilient-embedding-system-for-semantic-search-at-airtable-d5fdf27807e2"
year: 2024
seo:
  title: "Airtable: Building a Resilient Embedding System for Semantic Search - ZenML LLMOps Database"
  description: "Airtable built a production-scale embedding system to enable semantic search across customer data, allowing teams to ask questions like \"find past campaigns similar to this one\" or \"find engineers whose expertise matches this project.\" The system manages the complete lifecycle of embeddings including generation, storage, consistency tracking, and migrations while handling the challenge of maintaining eventual consistency between their primary in-memory database (MemApp) and a separate vector database. Their approach centers on a flexible \"embedding config\" abstraction and a reset-based strategy for handling migrations and failures, trading off temporary downtime and regeneration costs for operational simplicity and resilience across diverse scenarios like database migrations, model changes, and data residency requirements."
  canonical: "https://www.zenml.io/llmops-database/building-a-resilient-embedding-system-for-semantic-search"
  ogTitle: "Airtable: Building a Resilient Embedding System for Semantic Search - ZenML LLMOps Database"
  ogDescription: "Airtable built a production-scale embedding system to enable semantic search across customer data, allowing teams to ask questions like \"find past campaigns similar to this one\" or \"find engineers whose expertise matches this project.\" The system manages the complete lifecycle of embeddings including generation, storage, consistency tracking, and migrations while handling the challenge of maintaining eventual consistency between their primary in-memory database (MemApp) and a separate vector database. Their approach centers on a flexible \"embedding config\" abstraction and a reset-based strategy for handling migrations and failures, trading off temporary downtime and regeneration costs for operational simplicity and resilience across diverse scenarios like database migrations, model changes, and data residency requirements."
---

## Overview

Airtable, a platform offering app building capabilities on top of a custom in-memory database, developed a comprehensive embedding system to power semantic search over customer data following ChatGPT's public release in 2022. The use case addresses scenarios where teams need to find similar historical records such as marketing campaigns, employee expertise matching, or past support escalations. This case study provides a detailed technical account of how Airtable engineered a production embedding system that handles the complete operational lifecycle while managing significant architectural constraints.

## Architectural Context and Constraints

Airtable's architecture centers on MemApp, their custom in-memory database backed by MySQL that manages all reads and writes for a "base" (a particular database instance). A critical architectural constraint is that MemApp operates as a single-writer database where all writes occur serially. This constraint significantly influences their embedding system design, particularly around consistency guarantees and state tracking. The serializable nature of MemApp provides a monotonically increasing transaction number that becomes central to their eventual consistency model.

## Design Philosophy and Core Tradeoffs

The engineering team faced a fundamental architectural decision: should embeddings be stored within MemApp to ensure strong consistency, or stored externally with eventual consistency? They identified two major issues with the strongly consistent approach. First, memory usage represents a significant cost factor for Airtable, and embeddings are typically 10x the size of the underlying data, making in-memory storage prohibitively expensive. Second, achieving strong consistency would require generating embeddings within transactions, which would be too slow for bulk updates and would restrict them to less capable in-house models rather than leveraging state-of-the-art providers like OpenAI.

The team chose eventual consistency, accepting that embeddings stored in a separate vector database would lag behind the source data in MemApp. This decision enabled asynchronous embedding generation with external providers while necessitating careful state tracking and consistency management. The tradeoff reflects a pragmatic production engineering decision where operational flexibility and access to better models outweigh the guarantees of immediate consistency, especially for a use case like semantic search where slight staleness is acceptable.

## Data Model and Abstraction Layer

Anticipating rapid evolution in AI models, embedding providers, and storage engines, Airtable introduced an abstraction called an "embedding config" within MemApp. This abstraction allows developers to map data from MemApp to a table in a vector database without managing underlying complexities. An embedding config consists of four primary components: a data subscription (declarative description of data to embed), an embedding strategy (how data should be embedded), storage configuration (where embeddings are stored), and triggering configuration (when to regenerate out-of-date embeddings).

This abstraction layer proves crucial for the system's adaptability, allowing changes to models, providers, or storage engines without fundamental architectural changes. The design demonstrates forward-thinking LLMOps practice by acknowledging that the AI landscape would continue evolving and building flexibility into the foundation rather than optimizing for current tools.

## Consistency Tracking Mechanism

Given the eventual consistency model, Airtable needed a way to track which data has been embedded and what might be stale. They leverage MemApp's transaction numbers—a BigInt that increments with each write—to create an ordering of data versions. For each piece of embedded data, they maintain an "embedding state" containing two fields: lastPersistedTransaction (the transaction number of the last successfully persisted embedding) and lastUpdatedTransaction (the transaction number when the source data last changed).

This state tracking enables several critical capabilities. It allows filtering of stale results during queries, provides a mechanism for identifying data that needs re-embedding, and handles out-of-order write operations. For example, an embedding state might progress from `&#123;lastPersistedTransaction: null, lastUpdatedTransaction: 2&#125;` (data changed but not yet embedded) to `&#123;lastPersistedTransaction: 2, lastUpdatedTransaction: 2&#125;` (data embedded and current) to `&#123;lastPersistedTransaction: 2, lastUpdatedTransaction: 5&#125;` (data changed again, embedding now stale). This simple but effective state machine provides clear semantics for the embedding lifecycle.

## Embedding Lifecycle Operations

The system implements a complete lifecycle spanning initialization, detection, triggering, generation, persistence, and deletion. Upon creating a new embedding config, MemApp automatically provisions a vector database table and generates embedding states for relevant data chunks. When data changes, the system updates the embedding state's lastUpdatedTransaction to reflect the current transaction. Tasks are created within the transaction to generate embeddings for each affected config.

The embedding service processes these tasks with substantial retry logic to handle transient failures. The persistence phase includes an important detail for handling eventual consistency: insertions to the vector database are conditional on the transaction number being greater than what's already stored. If an update has been outpaced by a more recent write, the system silently exits since no additional work is necessary. After successful persistence, the system updates lastPersistedTransaction in MemApp, again using conditional logic to only increase the value, preventing out-of-order writes from causing inconsistencies.

Deletion operations also respect this ordering—deleting individual embedding states triggers deletion in the vector database using conditional deletions to handle out-of-order operations. Deleting an entire embedding config triggers automatic cleanup of all associated data including embedding states and the vector database table, which reduces storage costs and helps meet data retention guarantees.

## The Reset Pattern for Migrations and Failures

The most architecturally interesting aspect of Airtable's system is their unified approach to handling migrations and failures through a "reset" pattern. The team identified numerous scenarios requiring intervention: vector database corruption or catastrophic loss, database engine migrations (e.g., LanceDB to Milvus), schema changes, data residency migrations, encryption key rotation, AI provider changes, model deprecation, embedding strategy updates, data subscription changes, base cloning, snapshot restoration, and synchronization issues.

Rather than implementing bespoke solutions for each scenario, they realized a common pattern could handle all cases: delete the old embedding config (cleaning up existing data) and create a new embedding config in its place (possibly with updated settings). This "reset" approach trades temporary unavailability for operational simplicity and correctness. For example, when moving a base from US to EU regions—a complex operation requiring all sensitive data including embeddings to relocate—they simply delete all embedding configs (which automatically deletes embedding data through normal cleanup), then recreate configs with EU storage settings. The system then regenerates all embeddings in the appropriate region.

This pattern demonstrates sophisticated production thinking. Rather than maintaining complex state transitions for every possible migration scenario, they built a system where the simplest path—complete regeneration—is also the most reliable. The approach leverages the fact that embedding generation is relatively fast (p99.9 under 2 minutes according to the article) and the cost of regeneration is manageable compared to the complexity and risk of incremental migration logic.

## Operational Tradeoffs and Safeguards

The reset pattern involves conscious tradeoffs. Regenerating embeddings incurs costs from API calls to embedding providers, though Airtable notes these are manageable compared to storage and indexing costs from incremental updates. The temporary unavailability during resets affects semantic search features, but given the rarity of resets and fast regeneration times, this was deemed acceptable. The product already handles similar downtime scenarios since users can trigger large-scale generation through normal operations like base cloning.

A critical operational concern is preventing runaway reset loops, which could cause spiraling costs and prolonged downtime. Airtable implemented safeguards including metrics and alerts, rate limiting on reset operations, and idempotent requests to prevent duplicate resets from the same trigger. These safeguards represent essential LLMOps practice for production systems where automated operations could potentially amplify failures.

## Production Considerations and Gaps

The article acknowledges several operational concerns that informed their design even if not fully detailed. Security considerations treat embeddings as sensitive customer data, reflecting awareness that embeddings can leak information about source data. Cost management spans generation, persistence, and querying operations. The system supports multiple AI providers, allowing customers to restrict which providers can process their data (e.g., allowing only AWS Bedrock models and forbidding OpenAI). This multi-provider support adds complexity but addresses real enterprise requirements around data governance.

The article explicitly notes several important topics they "glossed over" but indicate are part of their production system: handling failures during embedding generation, managing MemApp downtime, controlling global AI rate limits across all customers, choosing appropriate vector indices for different workloads, and applying filters and permissions to semantic search results. This transparency about scope is valuable—the article focuses on the core lifecycle and migration challenges while acknowledging that a complete production system involves many additional concerns.

## LLMOps Maturity and Lessons

This case study demonstrates relatively mature LLMOps practices. The system handles the complete operational lifecycle rather than just the initial implementation. The abstraction layer (embedding configs) anticipates change rather than coupling to specific providers or models. The state tracking provides clear semantics for consistency. The reset pattern, while potentially surprising, represents sophisticated production thinking that values correctness and operational simplicity over optimization for the common case.

However, the article's promotional nature—published on Airtable's engineering blog—means claims about performance, cost-effectiveness, and reliability should be viewed critically. The assertion that p99.9 regeneration completes under 2 minutes is impressive but likely depends heavily on data volumes and embedding model choice. The characterization of costs as "manageable" is relative and may not apply to organizations with different data scales or usage patterns. The acceptance of temporary unavailability during resets works for their use case but might not be acceptable for applications where semantic search is more critical.

The system's reliance on eventually consistent semantics is appropriate for semantic search but limits applicability to scenarios requiring immediate consistency. Their architecture tightly couples to MemApp's transaction ordering, which provides clean semantics but may not translate directly to other database architectures. The decision to regenerate rather than incrementally update embeddings makes sense given their constraints but represents a specific point in the cost-correctness-complexity tradeoff space.

## Technical Depth and Knowledge Sharing

Despite the promotional context, this case study provides valuable technical depth for practitioners building embedding systems. It illustrates concrete challenges in production LLM systems: managing consistency between primary data stores and vector databases, handling model evolution and migrations, dealing with out-of-order operations in distributed systems, and making principled tradeoffs between complexity and operational simplicity. The transparency about their reset pattern—which might initially seem like a "start over" approach but is actually carefully designed—offers useful perspective on production engineering decisions.

The article's acknowledgment of glossed-over topics (rate limiting, permissions, index choice, failure handling) provides an honest view of system complexity. Real production embedding systems involve many moving parts beyond the core generation and storage pipeline. The case study would benefit from more concrete data on costs, performance characteristics under various loads, and specific failure scenarios encountered in production, but the architectural decisions and patterns described offer substantial value for teams facing similar challenges in building production embedding systems.