---
title: "Scaling Vector Search Infrastructure for AI-Powered Workspace Search"
slug: "scaling-vector-search-infrastructure-for-ai-powered-workspace-search"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6999c02db5cf761a46794393"
  exportedAt: "2026-02-23T10:04:49.317Z"
  source: "live"
  lastPublished: "2026-02-23T08:20:21.114Z"
  lastUpdated: "2026-02-23T08:20:21.114Z"
  createdOn: "2026-02-21T14:24:45.309Z"
llmopsTags:
  - "question-answering"
  - "document-processing"
  - "chatbot"
  - "realtime-application"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "chunking"
  - "cost-optimization"
  - "latency-optimization"
  - "model-optimization"
  - "databases"
  - "scaling"
  - "serverless"
  - "devops"
  - "orchestration"
  - "microservices"
  - "monitoring"
  - "cache"
  - "pytorch"
  - "redis"
  - "hugging-face"
  - "amazon-aws"
industryTags: "tech"
company: "Notion"
summary: "Notion scaled their vector search infrastructure supporting Notion AI Q&A from launch in November 2023 through early 2026, achieving a 10x increase in capacity while reducing costs by 90%. The problem involved onboarding millions of workspaces to their AI-powered semantic search feature while managing rapidly growing infrastructure costs. Their solution involved migrating from dedicated pod-based vector databases to serverless architectures, switching to turbopuffer as their vector database provider, implementing intelligent page state caching to avoid redundant embeddings, and transitioning to Ray on Anyscale for both embeddings generation and serving. The results included clearing a multi-million workspace waitlist, reducing vector database costs by 60%, cutting embeddings infrastructure costs by over 90%, and improving query latency from 70-100ms to 50-70ms while supporting 15x growth in active workspaces."
link: "https://www.notion.com/blog/two-years-of-vector-search-at-notion"
year: 2026
---

## Overview

Notion's case study chronicles their two-year journey scaling vector search infrastructure for Notion AI Q&A, launched in November 2023. The feature enables users to ask natural-language questions and receive answers by searching semantically across their workspace content and connected tools like Slack and Google Drive. This is a production LLMOps story focused heavily on the infrastructure challenges of deploying and scaling retrieval-augmented generation (RAG) systems at massive scale, specifically the vector search and embeddings components that power semantic retrieval.

The narrative is framed around achieving dramatic improvements: scaling capacity 10x while reducing costs to 1/10th of their peak. While these claims are impressive and the technical details suggest genuine engineering sophistication, it's worth noting this is a first-party account that naturally emphasizes successes. The piece provides valuable insights into real-world tradeoffs in vector database selection, embeddings infrastructure, and architectural evolution, though readers should recognize it also serves as promotional content for Notion's engineering capabilities and their technology partners like turbopuffer and Anyscale.

## Technical Architecture and Initial Implementation

Notion's vector search implementation follows a classic RAG pattern: convert text into semantic embeddings, store these vectors in a specialized database, and retrieve relevant content based on semantic similarity rather than keyword matching. Their initial architecture in November 2023 featured a dual-path ingestion pipeline that balanced bulk onboarding with real-time updates.

The offline path utilized Apache Spark for batch processing, handling the chunking of existing documents, generating embeddings via external API calls, and bulk-loading vectors into their vector database. This path was critical for onboarding entire workspaces with potentially large volumes of historical content. The online path leveraged Kafka consumers to process individual page edits in real-time as they occurred, maintaining sub-minute latency for keeping live workspaces synchronized with the search index.

Their initial vector database ran on dedicated "pod" clusters that coupled storage and compute. They implemented a sharding strategy similar to their PostgreSQL setup, using workspace ID as a partitioning key with range-based partitioning to route queries to the correct index. A single configuration file maintained references to all shards, a design that would later prove operationally complex as they scaled.

## Scaling Challenges and the Generation-Based Approach

The immediate and overwhelming demand following launch created urgent scaling pressures. Within one month, their original indexes approached capacity with millions of workspaces on the waitlist. The team faced a classic infrastructure dilemma: re-shard incrementally (cloning data, deleting half, and repeating every two weeks) or provision to final expected volume (expensive due to uptime-based pricing from their vector database provider).

They chose a novel third approach: when index sets approached capacity, they provisioned entirely new sets and directed new workspace onboarding there. Each set received a "generation" ID that determined routing for reads and writes. This allowed continuous onboarding without停止operations for re-sharding, though it introduced operational complexity in managing multiple database generations.

Through aggressive optimization of their Airflow scheduling, pipelining to maximize throughput, and Spark job tuning, they achieved remarkable improvements in onboarding capacity: a 600x increase in daily onboarding capacity, 15x growth in active workspaces, and 8x expansion in vector database capacity. By April 2024, they cleared the multi-million workspace waitlist. However, the generation-based architecture that enabled this rapid scaling had become operationally expensive and complex, necessitating architectural evolution.

## Cost Optimization Phase 1: Serverless Migration

In May 2024, Notion migrated their entire embeddings workload from dedicated-hardware pod architecture to a serverless architecture that decoupled storage from compute. This shift changed the pricing model from uptime-based to usage-based charging, immediately reducing costs by 50% from peak usage—savings of several million dollars annually according to the case study.

Beyond cost reduction, the serverless design eliminated storage capacity constraints that had been major scaling bottlenecks and simplified operations by removing the need to provision capacity ahead of demand. However, even with this substantial improvement, their annual run rate remained in the millions for vector database costs alone, indicating significant room for further optimization.

## The turbopuffer Migration and Architecture Overhaul

Running parallel to the serverless migration, Notion conducted a comprehensive evaluation of alternative search engines. turbopuffer emerged as compelling option with substantially lower projected costs. Built from the ground up on object storage for performance and cost-efficiency, turbopuffer's architecture aligned well with Notion's needs, supporting both managed and bring-your-own-cloud deployment models and facilitating bulk modifications of stored vector objects.

The migration to turbopuffer, executed from late 2024 through January 2025, involved a comprehensive architectural overhaul rather than a simple database swap. They performed a full re-indexing, rebuilding the entire multi-billion object corpus in turbopuffer with increased write throughput in their offline pipeline. Crucially, they took the opportunity to upgrade to a newer, more performant embeddings model during the migration—a sensible decision since they were already re-embedding everything.

The architectural simplification was notable: turbopuffer treats each namespace as an independent index, eliminating the complex sharding and generation routing logic they'd built up. They executed the cutover gradually, migrating one generation at a time and validating correctness before proceeding, demonstrating production discipline.

The results were impressive: 60% reduction in search engine spend, 35% reduction in AWS EMR compute costs, and improved p50 production query latency from 70-100ms to 50-70ms. The latency improvement is particularly noteworthy since cost optimizations often come with performance tradeoffs—achieving both simultaneously suggests genuine architectural improvements rather than just resource reduction.

## Page State Caching: Intelligent Change Detection

The Page State Project, deployed in July 2025, addressed a fundamental inefficiency in their indexing pipeline. Because Notion pages can be very long, they chunk each page into spans, embed each span, and load them into the vector database with metadata like authors and permissions. Originally, any edit to a page—even a single character change—triggered re-chunking, re-embedding, and re-uploading of all spans in that page.

Their solution involved tracking two hashes per span: one for the span text and another for all metadata fields. They selected the 64-bit variant of the xxHash algorithm, balancing speed, low collision rates, and storage footprint. DynamoDB served as their caching solution, providing fast inserts and lookups, with one record per page containing structs of all spans with their text and metadata hashes.

This enabled intelligent differential updates. When page text changes, they chunk the page, retrieve the previous state from DynamoDB, compare text hashes, and only re-embed and reload changed spans. When only metadata changes (like permissions updates), they detect that text hashes remain identical while metadata hashes differ, allowing them to skip embeddings entirely and issue cheaper PATCH commands to update just the metadata in the vector database.

The impact was substantial: a 70% reduction in data volume, saving on both embeddings API costs and vector database write costs. This represents sophisticated production engineering—the kind of optimization that becomes critical at scale but might be over-engineering for smaller deployments. The tradeoffs include added complexity (maintaining DynamoDB state, hash computation overhead) against significant cost savings and reduced load on embeddings providers.

## Migration to Ray for Embeddings Generation

In July 2025, Notion began migrating their near real-time embeddings pipeline to Ray running on Anyscale, a managed Ray service. This strategic shift addressed multiple architectural pain points that had accumulated in their Spark-based approach.

The "double compute" problem was particularly costly: they ran Spark on EMR for preprocessing (chunking, transformations, orchestrating API calls) while also paying per-token fees to an external embeddings API provider. They were dependent on their provider's API stability to keep search indexes fresh, and they'd implemented clunky custom pipelining to smooth traffic to dependent endpoints and avoid API rate limits, splitting online indexing Spark jobs into multiple jobs that handed off batches via S3.

Ray and Anyscale offered several advantages for their use case. Model flexibility meant they could run open-source embedding models directly without being gated by external providers, allowing immediate experimentation as new models are released. Unified compute consolidated preprocessing and inference onto a single layer, eliminating the double-compute problem. Ray's native support for GPU/CPU pipelining keeps utilization high by running GPU-bound inference alongside CPU-bound preprocessing on the same machines.

From a developer productivity perspective, Anyscale's integrated workspaces let engineers write and test data pipelines from familiar tools like Cursor and VSCode without provisioning infrastructure. Self-hosting embeddings also removed a third-party API hop from the critical path, materially reducing end-to-end latency for user-facing searches.

They anticipate a 90%+ reduction in embeddings infrastructure costs from this migration, though the case study notes this is still rolling out with early results being promising. This claim should be viewed with appropriate skepticism until fully realized—migrations often encounter unexpected complexities, and projected savings don't always materialize fully in production.

## Ray Serve for Real-Time Embeddings

For query-time embeddings, where users or agents search Notion, latency sensitivity is critical since they cannot search the vector database until query embedding completes. Hosting large-parameter embedding models efficiently requires careful consideration of GPU allocation, ingress routing, replication, and scaling.

Ray Serve provides much of this infrastructure out-of-the-box, allowing them to wrap open-source embedding models in persistent deployments that stay loaded on GPU. Configuration for dynamic request batching, replication, and autoscaling is handled through straightforward Python code and YAML configuration files, reducing operational complexity compared to building custom serving infrastructure.

This move to self-hosted embeddings serving, combined with the Ray-based generation pipeline, represents a complete internalization of their embeddings stack—moving from dependency on external API providers to self-managed infrastructure. This shift trades operational complexity for cost savings, control, and flexibility, a calculation that makes sense at Notion's scale but might not for smaller operations.

## LLMOps Lessons and Tradeoffs

Notion's journey illustrates several important LLMOps principles for production RAG systems. First, architectural evolution is continuous—their infrastructure went through multiple major iterations in just two years, from dedicated pods to serverless to turbopuffer, from external embeddings APIs to self-hosted Ray. Each iteration addressed bottlenecks that emerged at the previous scale, demonstrating that optimal architecture is context-dependent and scale-dependent.

Second, cost optimization in LLMOps requires attacking multiple layers simultaneously. They achieved their 90% cost reduction not through a single change but through coordinated improvements: serverless migration, vector database switching, intelligent caching to avoid redundant work, and self-hosted embeddings. Each layer compounds with others.

Third, the importance of managing technical debt during rapid scaling is evident in their generation-based approach. It was the right decision to enable fast onboarding, but it accumulated operational complexity that needed unwinding once they had breathing room. This pattern—accepting technical debt to achieve critical business objectives, then paying it down systematically—is characteristic of mature engineering organizations.

Fourth, the case study highlights the rapid evolution of the embeddings and vector search ecosystem. In just two years, they evaluated and migrated between multiple vector databases, adopted newer embeddings models, and shifted from API-based to self-hosted infrastructure as open-source models became competitive. Teams building LLMOps infrastructure must balance commitment to current solutions with flexibility to adopt better options as they emerge.

However, several important caveats apply to this case study. As first-party content, it naturally emphasizes successes and smooth transitions while likely downplaying challenges, failed experiments, and ongoing issues. The dramatic cost reduction figures, while impressive, don't provide enough detail to assess whether they're comparing peak worst-case scenarios to optimized steady-state, or whether they reflect sustainable long-term costs.

The partnerships with turbopuffer and Anyscale deserve scrutiny—while the technical decisions may be sound, the case study also serves promotional purposes for these vendors. Independent evaluation would be necessary to determine whether these specific choices are optimal for other organizations with different scale, requirements, and constraints.

The case study also focuses heavily on infrastructure and efficiency while providing limited detail on accuracy, relevance quality, or user satisfaction metrics. Cost and latency are important operational metrics, but for a user-facing AI feature, retrieval quality and answer accuracy ultimately determine success. The absence of discussion around evaluation frameworks, quality metrics, or how they validated that architectural changes didn't degrade search quality is notable.

Finally, the specific numbers—10x scale, 1/10th cost—while memorable, should be contextualized. Scaling infrastructure by 10x while reducing costs by 90% sounds revolutionary, but it reflects moving from rapid-growth emergency scaling (where efficiency is often sacrificed for speed) to optimized steady-state operations. Many of these optimizations (avoiding redundant embeddings, using appropriate infrastructure) might have been applicable earlier but couldn't be prioritized during hyper-growth.

## Broader Implications for RAG Systems in Production

Notion's experience offers valuable insights for organizations deploying RAG systems at scale. The dual-path ingestion pattern (batch + streaming) is a practical architecture for systems that need both bulk onboarding and real-time freshness. Their evolution from external embeddings APIs to self-hosted infrastructure suggests a threshold scale where internalization becomes economically compelling, though this threshold will vary by organization.

The Page State Project demonstrates the value of workload-specific optimizations in LLMOps. Generic infrastructure often performs unnecessary work—in this case, re-embedding unchanged content. Building intelligence to track what actually changed requires additional complexity but can yield substantial savings at scale. Organizations should identify their own high-leverage optimization opportunities based on workload characteristics.

The case study also illustrates how vector search and embeddings infrastructure has matured rapidly. The availability of serverless vector databases, managed Ray services, competitive open-source embeddings models, and specialized solutions like turbopuffer provides organizations with many more options than were available even two years ago. This ecosystem evolution reduces barriers to deploying RAG systems but also requires ongoing evaluation as better options emerge.

Looking forward, Notion indicates plans for expanded data sources, continuous model evolution enabled by Ray's flexibility, ongoing pipeline optimization, and leveraging this infrastructure for Notion Agents—custom agents that use AI and vector search across workspaces and connected apps to autonomously complete workflows. This suggests their vector search infrastructure serves as foundational capability for multiple AI features, a pattern where infrastructure investment in one capability enables broader AI product development.