---
title: "Scaling Vector Search Infrastructure for AI-Powered Workspace Search"
slug: "scaling-vector-search-infrastructure-for-ai-powered-workspace-search-352f8dff"
draft: false
llmopsTags:
  - "question-answering"
  - "document-processing"
  - "chatbot"
  - "data-analysis"
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
  - "serverless"
  - "scaling"
  - "orchestration"
  - "monitoring"
  - "api-gateway"
  - "load-balancing"
  - "microservices"
  - "pytorch"
  - "redis"
  - "cache"
  - "pinecone"
  - "chromadb"
  - "qdrant"
  - "scalability"
  - "reliability"
  - "hugging-face"
  - "databricks"
industryTags: "tech"
company: "Notion"
summary: "Notion scaled their vector search infrastructure supporting AI Q&A functionality from launch in November 2023 through 2026, facing the dual challenge of 10x growth in capacity while reducing costs by 90%. The company evolved from a dual-path indexing architecture (offline batch processing via Spark and real-time updates via Kafka) running on dedicated vector database pods to a sophisticated multi-vendor serverless architecture. Key solutions included migrating to turbopuffer for vector storage, implementing intelligent page state caching with DynamoDB to avoid redundant embeddings generation, and transitioning from external embeddings APIs to self-hosted models on Ray/Anyscale. Results included clearing a multi-million workspace waitlist, achieving 50-90% cost reductions at various stages, improving query latency from 70-100ms to 50-70ms, and reducing data volume by 70% through smart change detection."
link: "https://www.notion.com/blog/two-years-of-vector-search-at-notion"
year: 2026
seo:
  title: "Notion: Scaling Vector Search Infrastructure for AI-Powered Workspace Search - ZenML LLMOps Database"
  description: "Notion scaled their vector search infrastructure supporting AI Q&A functionality from launch in November 2023 through 2026, facing the dual challenge of 10x growth in capacity while reducing costs by 90%. The company evolved from a dual-path indexing architecture (offline batch processing via Spark and real-time updates via Kafka) running on dedicated vector database pods to a sophisticated multi-vendor serverless architecture. Key solutions included migrating to turbopuffer for vector storage, implementing intelligent page state caching with DynamoDB to avoid redundant embeddings generation, and transitioning from external embeddings APIs to self-hosted models on Ray/Anyscale. Results included clearing a multi-million workspace waitlist, achieving 50-90% cost reductions at various stages, improving query latency from 70-100ms to 50-70ms, and reducing data volume by 70% through smart change detection."
  canonical: "https://www.zenml.io/llmops-database/scaling-vector-search-infrastructure-for-ai-powered-workspace-search-352f8dff"
  ogTitle: "Notion: Scaling Vector Search Infrastructure for AI-Powered Workspace Search - ZenML LLMOps Database"
  ogDescription: "Notion scaled their vector search infrastructure supporting AI Q&A functionality from launch in November 2023 through 2026, facing the dual challenge of 10x growth in capacity while reducing costs by 90%. The company evolved from a dual-path indexing architecture (offline batch processing via Spark and real-time updates via Kafka) running on dedicated vector database pods to a sophisticated multi-vendor serverless architecture. Key solutions included migrating to turbopuffer for vector storage, implementing intelligent page state caching with DynamoDB to avoid redundant embeddings generation, and transitioning from external embeddings APIs to self-hosted models on Ray/Anyscale. Results included clearing a multi-million workspace waitlist, achieving 50-90% cost reductions at various stages, improving query latency from 70-100ms to 50-70ms, and reducing data volume by 70% through smart change detection."
notion:
  pageId: "352f8dff-2538-80c4-8be1-ee0e042e6509"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-30T13:30:00.000Z"
  lastEditedTime: "2026-04-30T13:31:00.000Z"
  publishedAt: "2026-04-30T13:36:16Z"
---

## Overview

Notion's case study chronicles their two-year journey (November 2023 - early 2026) building and scaling production vector search infrastructure to power Notion AI Q&A, their natural language question-answering system that searches across users' workspaces and connected tools like Slack and Google Drive. This is a compelling LLMOps case study because it showcases the full lifecycle challenges of operating AI features at massive scale: from initial architecture decisions through hyper-growth scaling, cost optimization, and continuous technological evolution. The narrative reveals both the engineering sophistication required and the economic pressures inherent in running vector search at scale.

The core problem Notion tackled was enabling semantic search across millions of workspaces. Traditional keyword search fails when users ask questions using different terminology than what appears in their documents. Vector search solves this by converting text into semantic embeddings—high-dimensional vector representations where semantically similar content clusters together in vector space. This enables retrieval based on meaning rather than exact word matching, which is fundamental for natural language AI interfaces.

## Initial Architecture and Launch (November 2023)

When Notion launched AI Q&A in November 2023, they implemented a dual-path indexing architecture that balanced batch efficiency with real-time responsiveness. The offline path used Apache Spark batch jobs to chunk existing documents, generate embeddings via external API calls, and bulk-load vectors into their vector database. The online path employed Kafka consumers to process individual page edits in real-time as they occurred, maintaining sub-minute latency for live workspace updates.

Their vector database initially ran on dedicated "pod" clusters that coupled storage and compute—a common first-generation vector database architecture. Notion designed a sharding strategy similar to their PostgreSQL setup, using workspace ID as the partitioning key with range-based partitioning to route queries to the correct index. This multi-tenant design was critical for serving millions of independent workspaces from shared infrastructure.

The launch generated immediate overwhelming demand, quickly accumulating a waitlist of millions of workspaces. This created urgent scaling pressure—if they couldn't onboard workspaces fast enough, they'd delay value delivery and potentially lose competitive advantage in the rapidly evolving AI productivity space.

## Scaling Challenges and Solutions (December 2023 - April 2024)

Just one month after launch, Notion's original indexes approached capacity limits. Running out of space would force them to pause onboarding, creating an unacceptable bottleneck. They faced a classic infrastructure dilemma: incremental re-sharding would require repeated clone-delete cycles every two weeks, while pre-provisioning for final expected volume would be prohibitively expensive since their vector database charged for uptime rather than usage.

Notion chose a creative middle path, diverging from their historical PostgreSQL sharding approach. Instead of re-sharding existing data, they provisioned new index sets as capacity constraints approached and directed all new workspace onboarding to the new sets. Each set received a "generation" ID that determined routing for reads and writes. This generational architecture allowed continuous onboarding without pausing for re-shard operations, though it introduced operational complexity in managing multiple active generations.

Through aggressive optimization of their onboarding pipeline—including Airflow scheduling improvements, pipelining to maximize throughput, and Spark job tuning—Notion achieved remarkable acceleration. They increased daily onboarding capacity by 600x, grew active workspaces by 15x, and expanded vector database capacity by 8x. By April 2024, they successfully cleared the entire Q&A waitlist. However, the generational architecture that enabled this success had become operationally complex and expensive, necessitating architectural evolution.

## First Cost Reduction: Serverless Migration (May 2024)

In May 2024, Notion migrated their entire embeddings workload from the dedicated-hardware pod architecture to a new serverless vector database architecture that decoupled storage from compute. This represents a significant shift in the vector database market—newer serverless offerings charge based on actual usage (queries, storage) rather than provisioned capacity uptime, fundamentally changing the economics of vector search.

The migration delivered immediate impact: 50% cost reduction from peak usage, translating to several million dollars in annual savings. Beyond cost, the serverless architecture eliminated storage capacity constraints that had been a major scaling bottleneck and simplified operations by removing the need to provision capacity ahead of demand. This is a critical LLMOps lesson—the choice of infrastructure model (dedicated vs. serverless) has profound implications not just for cost but for operational complexity and agility.

Despite these impressive savings, annual vector database costs still ran in the millions of dollars. Notion recognized substantial remaining optimization potential, both in their choice of vector database provider and in how efficiently they used it.

## Comprehensive Architecture Overhaul: turbopuffer Migration (May 2024 - January 2025)

Parallel to their serverless migration, Notion conducted a comprehensive evaluation of alternative vector search engines. turbopuffer emerged as compelling—a newer entrant built from the ground up on object storage for performance and cost-efficiency. The architecture aligned with Notion's needs: supporting both managed and bring-your-own-cloud deployment models and making bulk modifications of stored vector objects easy.

After successful evaluation, Notion committed to migrating their entire multi-billion object workload to turbopuffer in late 2024. Critically, they used this migration as an opportunity for comprehensive architectural improvement rather than just a vendor swap. This is smart LLMOps practice—major migrations provide rare opportunities to fix accumulated technical debt and incorporate learnings.

The migration involved four major components. First, full re-indexing: they scaled up writes throughput in their offline pipeline to rebuild the entire corpus in turbopuffer. Second, embeddings model upgrade: they switched to a newer, more performant embeddings model during migration, killing two birds with one stone. Third, architecture simplification: turbopuffer's design allowed treating each namespace as an independent index, eliminating the complex sharding and generation routing logic. Fourth, gradual cutover: they migrated generations one at a time, validating correctness before proceeding—a prudent approach for such a critical system.

The results were substantial: 60% cost reduction on search engine spend, 35% reduction in AWS EMR compute costs, and p50 production query latency improvement from 70-100ms to 50-70ms. This demonstrates that choosing the right infrastructure can simultaneously improve both cost and performance—not always a given, as these often trade off against each other.

## Intelligent Change Detection: Page State Project (July 2025)

Notion's next major optimization addressed a fundamental inefficiency in their indexing pipeline. Because Notion pages can be very long, they chunk each page into spans, embed each span separately, and load them into the vector database with metadata like authors and permissions. In their original implementation, any page edit—even changing a single character—triggered re-chunking, re-embedding, and re-uploading of all spans in that page. This was enormously wasteful for minor edits.

The Page State Project implemented intelligent change detection to identify exactly what work needed redoing. They tracked two hashes per span: one on the span text content (to detect when embeddings need updating) and one on metadata fields (to detect when only metadata needs updating). They chose the 64-bit xxHash algorithm, balancing speed, low collision probability, and storage footprint.

For caching, they selected DynamoDB for its fast inserts and lookups. Each page has one DynamoDB record containing a struct of all spans with their text and metadata hashes. This enables two critical optimizations. When page text changes, they chunk the page, retrieve previous state from DynamoDB, compare text hashes, and only re-embed and reload changed spans. When only metadata changes (like permissions), they compare hashes, detect that text is unchanged but metadata differs, skip embeddings generation entirely, and just issue a PATCH command to update metadata in the vector database—a much cheaper operation.

This optimization achieved a 70% reduction in data volume, saving substantially on both embeddings API costs and vector database write costs. This is excellent LLMOps engineering—identifying wasteful patterns in production workflows and implementing targeted caching strategies to eliminate unnecessary computation. The use of content-based hashing for change detection is a classic systems technique applied effectively to the LLM operations context.

## Self-Hosted Embeddings: Ray Migration (July 2025 - Present)

In July 2025, Notion began migrating their near real-time embeddings pipeline to Ray running on Anyscale. This represents a strategic shift from consuming embeddings as an API service to self-hosting open-source embedding models. The motivation addressed multiple pain points simultaneously.

The "double compute" problem: they were running Spark on EMR for preprocessing (chunking, transformations, orchestrating API calls) while also paying per-token fees to an embeddings API provider. Embeddings endpoint reliability: they depended on their provider's API stability to keep search indexes fresh. Clunky pipelining: to smooth traffic to dependent endpoints and avoid rate limits, they implemented custom pipelining that split the online indexing Spark job into multiple jobs handing off batches via S3—complex and brittle.

Ray and Anyscale addressed these issues effectively. Model flexibility: Ray allows running open-source embedding models directly without being gated by external providers, enabling immediate experimentation with new models. Unified compute: consolidating preprocessing and inference onto a single compute layer eliminated the double-compute problem. GPU/CPU pipelining: Ray natively supports pipelining GPU-bound inference with CPU-bound preprocessing on the same machines, keeping utilization high. Developer productivity: Anyscale's integrated workspaces let engineers write and test data pipelines from familiar tools (Cursor, VSCode) without provisioning infrastructure. Lower query-time latency: self-hosting embeddings removed a third-party API hop from the critical path, materially reducing end-to-end latency.

Ray's native support for pipelining CPU-bound tasks (chunking, page state detection) with GPU-bound embeddings generation within the same node is particularly powerful for this workload. Notion anticipates a 90%+ reduction in embeddings infrastructure costs from this migration, though it's still rolling out as of the publication date.

## Real-Time Embeddings Serving (July 2025 - Present)

Beyond batch indexing, Notion also needs to embed queries on the fly when users search. This is latency-sensitive—they can't search the vector database until query embedding completes. Hosting large-parameter embedding models efficiently requires managing GPU allocation, ingress routing, replication, and scaling.

Ray Serve provides this functionality out-of-the-box. It allows wrapping open-source embedding models in persistent deployments that stay loaded on GPU, with configuration for dynamic request batching, replication, and autoscaling. The model serving code looks like normal Python, while compute, replication, and autoscaling configs are plain YAML. This simplification is valuable—LLMOps teams shouldn't need to become Kubernetes and infrastructure experts just to serve models reliably.

## Critical Assessment and LLMOps Lessons

This case study offers several important lessons for LLMOps practitioners, balanced against some limitations in the information provided.

**Strengths and validated approaches:**

The multi-stage cost optimization approach is exemplary. Rather than accepting initial architecture as fixed, Notion continuously evaluated and adopted better solutions—serverless migration, vendor switching, intelligent caching, and self-hosting. Each wave of optimization built on learnings from the previous stage. The willingness to migrate between vector database providers based on economics and capabilities demonstrates healthy vendor pragmatism rather than lock-in acceptance.

The intelligent change detection via content hashing is sophisticated engineering that goes beyond naive "re-index everything" approaches. This kind of optimization requires deep understanding of actual production access patterns and willingness to add complexity (DynamoDB caching layer) where it delivers substantial value.

The shift from embeddings-as-a-service to self-hosted models on Ray reflects a maturity curve many organizations will follow. Early-stage products benefit from API simplicity, but at scale, the economics and control of self-hosting become compelling. The Ray/Anyscale choice balances flexibility of open-source with managed service convenience—appropriate for a team without dedicated ML infrastructure engineers.

**Limitations and open questions:**

The case study is notably sparse on model performance details. We don't learn what embedding models they used initially versus after upgrades, what dimensions their vectors have, or how they evaluated embedding quality. The mention of switching to "a newer, more performant embeddings model" during the turbopuffer migration lacks specifics—what made it more performant? Better retrieval quality? Faster inference? Smaller size? These details matter for practitioners evaluating similar choices.

Search quality metrics are entirely absent. While the case study tracks infrastructure metrics (latency, cost, throughput) carefully, there's no discussion of retrieval quality, user satisfaction, or how they measure whether Q&A is actually answering questions correctly. In production LLM systems, cost optimization must be balanced against quality—aggressive optimization that degrades user experience is counterproductive.

The architectural diagrams and specific configurations are high-level. Practitioners looking to replicate these approaches would benefit from more detail on chunking strategies, metadata schemas, query processing pipelines, and how they handle complex scenarios like permission filtering at query time across billions of vectors.

The case study doesn't discuss failure modes, debugging approaches, or incidents. All production systems experience issues—learning how Notion handles vector database outages, embedding model degradation, or index corruption would be valuable.

**Vendor considerations:**

While the results are impressive, readers should note this is published on Notion's blog and may emphasize successes while understating challenges. The specific vendors mentioned (turbopuffer, Anyscale/Ray) are portrayed entirely positively, but all technology choices involve tradeoffs. The lack of discussion of turbopuffer limitations or Ray challenges suggests some marketing influence.

The 90%+ projected cost reduction from Ray migration is described as anticipated but still rolling out, so these are projections rather than achieved results. Actual results may differ.

**Broader context:**

The timeline (November 2023 - early 2026) spans a period of rapid evolution in both vector databases and embedding models. The case study reflects this dynamism—architectures that made sense in late 2023 were obsolete by 2025. This highlights a key LLMOps challenge: the infrastructure landscape is evolving rapidly, requiring continuous reevaluation of technical choices.

The scale is genuinely impressive—millions of workspaces, billions of vectors, sub-100ms query latency—and the cost optimization achievements (90% overall reduction while scaling 10x) demonstrate sophisticated engineering. However, these results come from a well-resourced team at a successful product company, which may limit generalizability to smaller organizations.

## Conclusion

Notion's vector search journey illustrates the full lifecycle of operating AI/LLM features in production: initial architecture decisions, hyper-growth scaling, economic optimization, technological evolution, and continuous improvement. The case study is particularly strong on infrastructure and cost optimization, demonstrating how thoughtful engineering can dramatically improve economics without sacrificing performance. Areas for deeper exploration include search quality measurement, model selection methodology, and operational challenges. Overall, this represents a valuable real-world example of LLMOps at significant scale, with lessons applicable to any organization building production AI features requiring semantic search capabilities.
