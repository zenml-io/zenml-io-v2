---
title: "AI-Powered GTM Data Platform with Agentic Operations"
slug: "ai-powered-gtm-data-platform-with-agentic-operations"
draft: false
llmopsTags:
  - "data-analysis"
  - "data-cleaning"
  - "data-integration"
  - "classification"
  - "summarization"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "chunking"
  - "scalability"
  - "cache"
  - "open-source"
  - "databricks"
industryTags: "hr"
company: "Rippling"
summary: "Rippling's Growth Engineering team rebuilt their go-to-market data infrastructure on a lakehouse architecture to support AI agents for sales and marketing operations. The legacy cloud data warehouse couldn't handle the demands of running AI/ML workloads, unifying identities across messy third-party datasets, and serving low-latency interactive answers to both humans and AI agents. After a bake-off between Databricks and Snowflake, they migrated to Databricks, implementing ML-based entity resolution across hundreds of millions of records and deploying semantic search over sales conversations. The solution delivered significant improvements including a roughly 33% lift in demos booked, approximately 20% increase in new opportunities, expansion of addressable market by over 10 million users, and order-of-magnitude cost reductions for generating personalized sales plays."
link: "https://medium.com/@john.kutay/building-an-ai-database-for-agentic-gtm-operations-6a0c86fb8cdc"
year: 2026
seo:
  title: "Rippling: AI-Powered GTM Data Platform with Agentic Operations - ZenML LLMOps Database"
  description: "Rippling's Growth Engineering team rebuilt their go-to-market data infrastructure on a lakehouse architecture to support AI agents for sales and marketing operations. The legacy cloud data warehouse couldn't handle the demands of running AI/ML workloads, unifying identities across messy third-party datasets, and serving low-latency interactive answers to both humans and AI agents. After a bake-off between Databricks and Snowflake, they migrated to Databricks, implementing ML-based entity resolution across hundreds of millions of records and deploying semantic search over sales conversations. The solution delivered significant improvements including a roughly 33% lift in demos booked, approximately 20% increase in new opportunities, expansion of addressable market by over 10 million users, and order-of-magnitude cost reductions for generating personalized sales plays."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-gtm-data-platform-with-agentic-operations"
  ogTitle: "Rippling: AI-Powered GTM Data Platform with Agentic Operations - ZenML LLMOps Database"
  ogDescription: "Rippling's Growth Engineering team rebuilt their go-to-market data infrastructure on a lakehouse architecture to support AI agents for sales and marketing operations. The legacy cloud data warehouse couldn't handle the demands of running AI/ML workloads, unifying identities across messy third-party datasets, and serving low-latency interactive answers to both humans and AI agents. After a bake-off between Databricks and Snowflake, they migrated to Databricks, implementing ML-based entity resolution across hundreds of millions of records and deploying semantic search over sales conversations. The solution delivered significant improvements including a roughly 33% lift in demos booked, approximately 20% increase in new opportunities, expansion of addressable market by over 10 million users, and order-of-magnitude cost reductions for generating personalized sales plays."
notion:
  pageId: "380f8dff-2538-8088-80e7-c041dc89f9a8"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-15T07:24:00.000Z"
  lastEditedTime: "2026-06-15T07:24:00.000Z"
  publishedAt: "2026-06-19T09:22:22Z"
---

## Overview

Rippling, an AI platform for People Operations, faced a critical challenge in scaling their go-to-market (GTM) operations as they grew from an HRIS provider to a comprehensive unified platform. Their Growth Engineering team needed to support over 1,000 people in GTM roles while automating data collection, enrichment, analysis, and recommendations. The core problem wasn't volume but data fidelity—determining "what's actually real" across fragmented third-party data sources, duplicate records, and inconsistent entity representations. The solution involved rebuilding their entire GTM data foundation on a lakehouse architecture with integrated AI/ML capabilities, creating what they describe as a "real-time intelligence layer for AI agents."

The legacy infrastructure suffered from typical enterprise data challenges: duplicate spend on data enrichment, manual work resolving data issues across multiple transformation layers, redundant lead records causing multiple sales reps to contact the same prospects (driving down conversion and increasing customer acquisition costs), and most critically, an inability to implement agentic workloads due to unreliable data models. The team needed a platform that could simultaneously handle AI/ML workloads directly on data, unify identities across heterogeneous sources, and serve low-latency answers to both human users and AI agents—all from a single source of truth rather than multiple disconnected systems.

## Platform Selection and Migration

Before committing to a new platform, Rippling conducted a rigorous proof of concept comparing Databricks against their incumbent Snowflake data warehouse. The evaluation focused specifically on workloads that mattered for their LLMOps use cases: AI/ML pipelines performing summarization and classification at scale. Databricks won decisively on three critical dimensions: cost (materially cheaper for identical pipelines), speed (faster end-to-end processing and inference), and access to hosted models with first-class in-platform access to managed foundation models.

The access to hosted models proved to be what the author calls "the quiet differentiator." By keeping model inference co-located with governed data rather than exporting to separate inference services, they eliminated entire categories of complexity around data movement, latency, governance headaches, and security boundaries. This architectural decision reflects a key LLMOps principle: minimizing the distance between data and compute for ML workloads significantly reduces operational overhead and security surface area.

## ML-Based Entity Resolution

The cornerstone technical challenge was entity resolution across heterogeneous third-party data sources. The same company or person appears in dozens of different representations across various data providers, enrichment tools, and internal systems. Rule-based matching approaches proved inadequate, collapsing under edge cases at scale. Rippling deployed a machine learning-based entity resolution system to unify records across vendors into a single canonical view.

The resolution system applies candidate blocking followed by a supervised pairwise classifier that scores whether two records represent the same entity. However, the innovation goes beyond simple binary matching. Each cluster receives a classification before survivorship rules apply, determining whether records represent the same person across providers (allowing for slight deviations in how vendors describe individuals), a job change (same person, different companies), an internal job change (same company, different role or persona), or a singleton requiring no merge.

This classification-first approach matters because entity resolution in production isn't merely about deciding if records match—it's about understanding what kind of match occurred, determining what attributes should survive into the golden record, and establishing which downstream GTM workflows can reliably consume the result. The team emphasizes that every resolved entity carries a confidence score and a ranked audit trail of every source that contributed to the final canonical record, including visibility into conflicts and how they were resolved.

The production challenge centered on the computational complexity: pairwise record comparison is an n² operation, and at hundreds of millions of records, brute force comparison isn't viable. The resolution model builds a blocking tree during training to dramatically reduce the candidate pair space before scoring, ensuring only pairs with realistic chances of matching actually get scored. Rather than training on the full dataset (unnecessary and prohibitively expensive), they stratified a representative sample across four segments based on identity anchor availability: records with both LinkedIn URL and email, LinkedIn only, email only, and neither anchor. Smaller vendors were over-sampled to ensure the model saw sufficient cross-provider match pairs during active learning, and records lacking LinkedIn URLs entirely were included in full due to their rarity.

The production Spark job ran across thousands of partitions and completed in just under 40 hours—a period during which the author notes staying awake the entire time alongside teammates. This ML-based approach resolved millions of leads who no longer worked at listed companies, surfaced accurate current names and addresses, and flagged every conflict with transparent audit trails. This represents what "what's actually real" means in production LLMOps contexts: high-confidence entity resolution with full provenance and conflict visibility.

## Architectural Patterns and Design Principles

The system architecture follows a medallion lakehouse pattern with clear separation of concerns: incremental ingestion into Bronze tables, ML entity resolution in the Silver layer, and AI/ML pipelines with a real-time API serving both humans and agents from Gold tables. This layering provides unglamorous but effective boundaries between raw ingestion, conformed/cleaned data, and business-ready tables consumed by multiple teams and agents.

Four core architectural principles emerged as critical to production success:

**DRY(E) - Don't Repeat Your Embeddings**: Directly feeding warehouse records into LLM context windows for every request wastes tokens, increases costs unpredictably, and produces inconsistent results. The superior pattern involves precomputing AI-ready representations once, then serving them repeatedly through a governed retrieval layer. This principle challenges the naive approach of pointing LLMs directly at data warehouses, which feels "magical at first" but creates problems around cost compounding, latency variability, and lack of auditability.

**Incremental Processing**: The pipelines process only new and changed data incrementally rather than reprocessing entire datasets. This represents the fundamental difference between systems that scale with change volume versus total data size—only the former remains affordable at scale. The team uses Delta change tracking to identify only new or changed conversations, so daily refreshes scale with incremental changes rather than corpus size.

**Interoperability by Default**: Standardization on open table formats—specifically Delta tables supporting Iceberg reads—ensures data remains accessible to other engines and tools rather than being locked into a single query path. Interoperability wasn't an afterthought but the default architectural stance, enabling flexibility and avoiding vendor lock-in.

**Medallion Architecture**: The Bronze → Silver → Gold layering provides clean separation and enables multiple consuming teams and agents to work from the same Gold layer without recreating transformations.

## Real-Time Interface for Agents: Genie at Scale

The production payoff layer is what teams and agents actually interact with. Using the Genie API from Databricks, Rippling exposed a real-time natural-language interface over their governed GTM data, deploying it to the entire GTM organization—ultimately reaching over 2,000 users (the text mentions both 1,500 and 2,000+ in different contexts). Critically, this interface serves both humans and AI agents, with agents querying in real-time to analyze first- and third-party signals across the customer lifecycle and acting on findings.

While they also built internal text-to-SQL implementations, the team appreciated the ergonomics of updating Genie through the Databricks UI to steer the agent, map key joins, define columns, and establish synonyms. This reflects a pragmatic approach to LLMOps: using managed services where they provide sufficient control and customization rather than building everything from scratch.

## Semantic Search Over Sales Conversations

One of the most sophisticated LLMOps implementations involves semantic search over millions of sales conversations. The use case enables sales reps, marketers, or agents acting on their behalf to ask natural language questions like "what objections come up most often in Stage 1 from IT leaders?" or "What coaching do I need to provide for the reps on my team?" and receive grounded answers in seconds.

The critical insight is avoiding indexing raw data as giant blobs—cheap to build but painful to use in production. Instead, each conversation is transformed into a retrieval-ready corpus through a sophisticated pipeline. The process identifies only new or changed conversations using Delta change tracking, making daily refreshes scale with change volume rather than total corpus size. The pipeline uses conversation participant metadata and deterministic scoring to label each speaker side, converting transcripts into readable turns distinguishing seller from customer lines. This distinction proves essential because the agent should reason primarily over buyer evidence rather than seller talk track.

Chunking isn't simplistic "split every N tokens" but preserves conversational context by merging short Q&A exchanges and collapsing adjacent turns from the same speaker. Chunks remain small enough for efficient retrieval while containing complete conversational meaning. Before embedding, the pipeline runs enrichment on each chunk to extract pain points, objections, buying triggers, competitor mentions, contract timing, and sentiment. Chunks with little or no buyer speech are skipped entirely. Crucially, they embed the enriched text rather than raw transcripts, keeping the vector index lean with only text, embeddings, and high-selectivity filters. Heavier business context remains in the lakehouse and gets joined after retrieval.

This architecture contrasts sharply with the naive alternative of dumping full transcripts into context windows on every query—an approach that "works in a demo" but proves expensive, slow, and forces the model to rediscover the same structure repeatedly. By performing the hard reasoning once at ingestion time, query-time agents receive compact, grounded evidence sets rather than walls of unstructured text.

## Vector Search Lessons for Production LLMOps

Several hard-won lessons emerged from deploying semantic search at scale:

**Storage-optimized vector search for large indexes**: Once a semantic index grows past a few million records, in-memory endpoints become expensive and brittle. Moving the transcript index to storage-optimized Vector Search—disk-backed and purpose-built for indexes ranging from millions to tens of millions of rows—delivered query latency in the tens of milliseconds even at multi-million-record scale.

**Hybrid retrieval beats pure vectors**: Sales conversations mix fuzzy semantic concepts like "pricing concerns" with exact terms including product names, competitors, account stages, and acronyms. Combining dense semantic retrieval with keyword retrieval ensures both types of questions work effectively.

**Index enriched evidence, not raw text**: The best retrieval text remains faithful to source conversations while providing enough structure for models to understand signal types. Inline tags and normalized classifications made downstream answers more grounded and reliable.

**Separate retrieval from analytics**: The vector index should retrieve candidates quickly while the lakehouse provides full business context after retrieval. This separation enables smaller indexes, faster queries, and richer final answers without forcing all context into the vector store.

**Design for updates, not rebuilds**: Transcript text, embeddings, and business context change at different rates. Treating them as separate update paths enables refreshing what changed without recomputing what didn't, dramatically reducing operational costs.

The meta-lesson emphasizes sizing vector indexes for where data will be in a year rather than current state, and designing pipelines around incremental synchronization from day one. This forward-thinking approach to capacity planning is essential for production LLMOps systems that will inevitably grow.

## Production Outcomes and Business Impact

The platform transitioned from essentially zero to core production infrastructure used by operations, data science, growth marketing, and growth engineering teams in under three months—a remarkably rapid deployment for infrastructure of this complexity. The business outcomes demonstrate the value of proper LLMOps foundations:

- Data-driven personalization for sellers lifted demos booked by approximately 33% and new opportunities by roughly 20% in staged A/B tests versus templated emails
- Addressable TAM increased by over 10 million potential new Rippling users
- Centralizing the GTM database delivered double-digit growth in addressable market within the first month
- Generating personalized, research-backed sales plays became roughly an order of magnitude cheaper and dramatically faster

These metrics reflect genuine business value, though the presentation does carry the expected promotional tone of a conference talk. The author appropriately frames these as staged test results rather than universal guarantees, and the specific percentages provide falsifiable claims rather than vague assertions of improvement.

The platform enabled the launch of GrowthOS, described as a "multi-model agent harness for growth," suggesting orchestration of multiple specialized models for different growth marketing and sales tasks. While details are limited, this indicates progression from single-agent use cases to more sophisticated multi-agent architectures.

## Critical Assessment and LLMOps Insights

This case study offers valuable insights into production LLMOps beyond typical proof-of-concept implementations. The emphasis on data quality through ML-based entity resolution before deploying agents reflects mature understanding that LLM capabilities don't compensate for poor data foundations—they actually amplify data quality problems. The discipline of precomputing enrichments and embeddings rather than repeatedly invoking LLMs demonstrates cost-conscious production thinking often missing from early-stage implementations.

The architectural choice to keep inference close to governed data, avoiding data export to separate services, addresses a critical but often overlooked aspect of production LLMOps: governance and security boundaries multiply complexity more than raw compute costs in enterprise contexts. The transparent audit trails for entity resolution and the emphasis on confidence scores reflect production-grade thinking about explainability and debugging.

However, the presentation raises questions typical of vendor case studies. The 40-hour Spark job for entity resolution, while impressive in scale, lacks discussion of ongoing maintenance costs, false positive rates, or edge case handling. The "order of magnitude" cost reduction for sales plays lacks baseline context—order of magnitude from what, and does that account for platform migration costs? The rapid three-month deployment timeline, while impressive, doesn't discuss technical debt, shortcuts taken, or ongoing refinement needs.

The semantic search implementation represents sophisticated RAG (Retrieval-Augmented Generation) engineering with thoughtful chunking strategies, hybrid retrieval, and separation of concerns between retrieval and analytics. The emphasis on incremental processing and storage-optimized vector search reflects lessons learned the hard way in production environments. The decision to enrich before embedding rather than embedding raw text shows understanding that semantic search quality depends on the quality of indexed representations, not just model capabilities.

The case study demonstrates how production LLMOps requires rethinking traditional data infrastructure rather than simply bolting LLMs onto existing warehouses. The migration from Snowflake to Databricks specifically for AI/ML workload performance illustrates that platform choice matters significantly for production LLMOps—claims that "any database works fine" for LLM applications don't hold when running inference at scale on governed data.

Overall, this represents a substantive production LLMOps implementation with genuine architectural complexity, meaningful scale (hundreds of millions of records, thousands of users), and quantified business outcomes. While the promotional framing requires critical reading, the technical depth and specific architectural choices provide valuable patterns for organizations building similar capabilities.
