---
title: "Vector Database Selection and Migration for Production ML and GenAI Systems"
slug: "vector-database-selection-and-migration-for-production-ml-and-genai-systems"
draft: false
llmopsTags:
  - "question-answering"
  - "chatbot"
  - "customer-support"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "latency-optimization"
  - "cost-optimization"
  - "kubernetes"
  - "monitoring"
  - "scaling"
  - "databases"
  - "elasticsearch"
  - "pinecone"
  - "qdrant"
  - "amazon-aws"
industryTags: "tech"
company: "Booking"
summary: "Booking.com faced scaling challenges with their existing OpenSearch-based vector database infrastructure as their ML and GenAI systems grew to serve hundreds of millions of embeddings across diverse use cases including RAG, semantic search, and similarity matching. The team conducted a rigorous evaluation process using production-realistic workloads (100M embeddings, high concurrency, complex filtered searches) to compare specialized vector databases against their OpenSearch baseline. After comprehensive performance testing that prioritized tail latency (P99), resource efficiency, and operational maturity over generic benchmarks, they selected Weaviate as their new backend, achieving approximately 40% cost reduction while maintaining comparable recall targets (~99%) and improving performance predictability. The migration was simplified by their architectural decision to abstract database access behind an internal service layer."
link: "https://booking.ai/how-we-selected-the-next-vector-database-at-booking-com-1e738a5e3bb0"
year: 2026
seo:
  title: "Booking: Vector Database Selection and Migration for Production ML and GenAI Systems - ZenML LLMOps Database"
  description: "Booking.com faced scaling challenges with their existing OpenSearch-based vector database infrastructure as their ML and GenAI systems grew to serve hundreds of millions of embeddings across diverse use cases including RAG, semantic search, and similarity matching. The team conducted a rigorous evaluation process using production-realistic workloads (100M embeddings, high concurrency, complex filtered searches) to compare specialized vector databases against their OpenSearch baseline. After comprehensive performance testing that prioritized tail latency (P99), resource efficiency, and operational maturity over generic benchmarks, they selected Weaviate as their new backend, achieving approximately 40% cost reduction while maintaining comparable recall targets (~99%) and improving performance predictability. The migration was simplified by their architectural decision to abstract database access behind an internal service layer."
  canonical: "https://www.zenml.io/llmops-database/vector-database-selection-and-migration-for-production-ml-and-genai-systems"
  ogTitle: "Booking: Vector Database Selection and Migration for Production ML and GenAI Systems - ZenML LLMOps Database"
  ogDescription: "Booking.com faced scaling challenges with their existing OpenSearch-based vector database infrastructure as their ML and GenAI systems grew to serve hundreds of millions of embeddings across diverse use cases including RAG, semantic search, and similarity matching. The team conducted a rigorous evaluation process using production-realistic workloads (100M embeddings, high concurrency, complex filtered searches) to compare specialized vector databases against their OpenSearch baseline. After comprehensive performance testing that prioritized tail latency (P99), resource efficiency, and operational maturity over generic benchmarks, they selected Weaviate as their new backend, achieving approximately 40% cost reduction while maintaining comparable recall targets (~99%) and improving performance predictability. The migration was simplified by their architectural decision to abstract database access behind an internal service layer."
notion:
  pageId: "3bcf8dff-2538-8014-8bc4-c959b91561d7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-14T06:40:00.000Z"
  lastEditedTime: "2026-08-14T06:40:00.000Z"
  publishedAt: "2026-08-14T06:53:41Z"
---

## Overview

This case study from Booking.com details their experience selecting and migrating to a new vector database infrastructure to support their expanding portfolio of ML and GenAI systems in production. The company had evolved from treating vector search as a backend implementation detail to recognizing it as foundational infrastructure that directly drives user experiences across their platform. Their journey from OpenSearch to Weaviate represents a mature approach to LLMOps infrastructure decision-making, emphasizing production-realistic evaluation over generic benchmarks and treating vector databases with the same rigor as other critical datastores.

## Business Context and Use Cases

Over several years, Booking.com's use of embeddings and vector search grew from a handful of experimental use cases into shared infrastructure powering multiple critical capabilities. The vector database infrastructure supports similarity search, semantic filtering, and retrieval-augmented generation (RAG) systems across the platform. One specific example mentioned is their Partner-to-Guest messaging agent, which relies on semantic search capabilities. The strategic importance of this infrastructure shifted fundamentally as it began directly driving user experiences rather than operating purely in the background.

The real business value, as the team notes, extends beyond raw speed to context enrichment. By expanding the variety of domain data they can retrieve efficiently, their systems gain the contextual depth needed to deliver accurate and personalized experiences across the platform. This positions vector search infrastructure as comparable in importance to primary datastores or message queues—it must be predictable, scalable, and operationally mature.

## Initial Infrastructure: OpenSearch

Booking.com's initial implementation used OpenSearch with vector support as the backend for their internal Embedding Service. This choice was pragmatic rather than optimal: OpenSearch was already adopted within the company, available on AWS, and could be provisioned easily using existing Terraform configurations. This allowed the team to move quickly and validate the platform's value with early use cases without introducing new operational overhead or requiring extensive vendor evaluation.

While this approach provided the agility needed for early validation, it eventually became clear that they were outgrowing OpenSearch's capabilities. The critical insight here is that starting with existing, familiar infrastructure allowed them to prove value quickly, but they recognized when technical debt began accumulating and performance characteristics no longer matched their needs.

## Scaling Challenges and Pain Points

As adoption grew, the workload profile changed dramatically. Datasets expanded to hundreds of millions of embeddings. Queries became increasingly complex, often combining vector search with metadata filtering. Concurrency increased substantially, and latency expectations tightened, particularly for user-facing applications. Under these conditions, the limitations of using a general-purpose search engine for vector-heavy workloads became apparent.

Achieving acceptable performance required constant tuning and increasingly large clusters. The team experienced growing operational overhead and cost spikes as they scaled out hardware to compensate for the engine's inherent limitations with vector search at scale. While nothing was fundamentally broken, the system was becoming harder to operate, slower to evolve, and more expensive. Critically, they found themselves spending more time managing AWS OpenSearch infrastructure than enabling the high-value use cases built on top of it.

This pain point represents a common pattern in LLMOps: infrastructure that works well at small scale can become a bottleneck as production workloads intensify. The team's recognition that operational overhead was consuming resources that should be directed toward use case development is a key signal that infrastructure reassessment was necessary.

## Evaluation Philosophy: Production-Realistic Testing

A distinguishing aspect of Booking.com's approach was their skepticism toward generic benchmarks. They found that most public benchmarks and comparison posts used small datasets, synthetic workloads, or lower concurrency levels that didn't reflect their reality. Their production environment operates on large embedding datasets, combines search with filtering, and serves highly concurrent workloads. At this scale, small differences in latency or efficiency have significant impacts on both user experience and cost.

Rather than relying on external benchmarks, they designed an evaluation that mirrored production workloads as closely as possible. The goal was explicitly not to identify the system with the best marketing numbers, but rather the one that behaves most reliably under their specific conditions. This represents mature LLMOps thinking: understanding that your specific workload characteristics matter more than generalized performance claims.

Their evaluation criteria extended beyond raw performance to include operational maturity, deployment flexibility, cost predictability, and integration with their ML ecosystem. This holistic approach recognizes that production database selection is about long-term operational success, not just benchmark performance.

## Evaluation Methodology

The team constructed a comprehensive evaluation using a 100M embedding dataset based on the Amazon Reviews 2023 dataset, processing millions of records across categories like Electronics, Baby Products, and Home & Kitchen. They used the all-MiniLM-L6-v2 model for text-to-vector transformation, chosen because it was already available in their internal model catalog and representative of models used in existing production workloads. The model provides a good balance between embedding quality and inference speed, making it practical for generating large-scale datasets.

Importantly, they included metadata (ratings, custom tags) for each record to evaluate filtered KNN search performance, replicating the complex, real-world queries their AI applications face daily. This ensures the evaluation covers not just pure vector similarity but the hybrid search patterns actually used in production.

The workload design covered three key scenarios. First, full approximate k-nearest-neighbor (a-KNN) search across the entire 100M embedding dataset, with each system tuned to a comparable target recall of approximately 99% so that latency and throughput results reflect system efficiency rather than retrieval quality differences. Second, filtered a-KNN search combining vector similarity with metadata filtering (rating ranges, category filters, high-cardinality tags), which more closely mirrors real usage where retrieval is rarely unconstrained. Third, mixed read/write workloads introducing continuous ingestion streams (approximately 20% of operations) to simulate real-time updates and evaluate query latency under concurrent indexing pressure.

The team scaled workloads along multiple dimensions: concurrency (5 to 50 to 100 parallel client threads), request rate (RPS increasing naturally with higher concurrency), and dataset size (full 100M vectors to avoid small-scale bias). They used a closed-loop workload model where each client issued the next request immediately after receiving a response, allowing evaluation of behavior under sustained load.

Across all scenarios, they measured latency per request, overall throughput, resource utilization, and stability, with particular attention to tail latency (P99) as most reflective of user experience. This focus on P99 rather than median or average latency demonstrates production-oriented thinking: the worst-case user experience often matters more than the typical case.

## Retrieval Quality Validation

A critical aspect of their evaluation methodology was ensuring performance differences weren't artifacts of returning lower-quality results. They randomly sampled approximately 2 million vectors already in the index and used each as a query, then measured Recall@k by checking whether the query vector itself appeared in its expected top-k nearest neighbors.

For each system evaluated, they tuned ANN search parameters (such as search breadth) to achieve comparable target recall of approximately 99%. This normalization ensures the comparison primarily reflects differences in latency, throughput, and operational characteristics rather than retrieval quality, addressing a common pitfall in vector database comparisons where apparent performance gains come from reduced accuracy.

## Feature and Operational Comparison

Beyond raw performance, the team evaluated operational survivability across several dimensions. While specific feature details aren't exhaustively listed in the article, the team emphasizes they compared existing OpenSearch capabilities against specialized vendors on dimensions including operational maturity, deployment flexibility, cost predictability, and ML ecosystem integration.

This multi-dimensional evaluation recognizes that production infrastructure decisions involve tradeoffs across many factors, not just query latency. The ability to deploy, monitor, debug, scale, and integrate with existing systems often determines long-term success more than raw performance metrics.

## Performance Results and Vendor Selection

The evaluation revealed a consistent pattern: dedicated vector databases handled their workloads more efficiently than OpenSearch, delivering lower tail latency, better throughput under concurrency, and more predictable scaling characteristics, often with fewer resources. This efficiency translated directly to cost: at comparable recall and SLO targets, they observed roughly 40% reduction in usage cost (compute and memory footprint) compared to their OpenSearch baseline.

This confirmed an intuitive but important principle: systems built specifically for vector search behave differently from general-purpose search engines with vector capabilities added on. The performance advantage wasn't marginal; it was substantial enough to justify migration effort and operational changes.

Among the evaluated options, Weaviate showed the most consistent performance across their scenarios, leading to its selection as the new backend for the Embedding Service. The team evaluated multiple specialized vendors but chose to publicly share only OpenSearch and Weaviate results, suggesting a deliberate choice to focus on the baseline and selected solution rather than critiquing alternatives.

## Migration Architecture and Strategy

A critical architectural decision made earlier significantly simplified the migration process. All database access was already abstracted behind their internal Embedding Service, so clients never interacted directly with the underlying storage layer. This abstraction allowed them to run multiple databases in parallel and switch backends transparently.

For most teams consuming the service, migration required little more than a configuration change. This demonstrates excellent LLMOps practice: abstracting infrastructure dependencies allows evolution without disrupting consumers. The service-oriented architecture pattern proves its value during infrastructure transitions, reducing migration risk and coordination overhead.

## Key Lessons and LLMOps Insights

The team emphasizes that the most important takeaway is about ownership of the evaluation process itself rather than any specific vendor or feature. At large scale, workloads are highly specific, and generic benchmarks rarely reflect real-world behavior. Running production-shaped tests gave them confidence that the chosen system would hold up under conditions that actually matter to their business.

They advocate treating vector search as foundational infrastructure for modern ML and AI systems, applying the same rigor as any other critical datastore. Their recommended practices include testing realistically with production-like workloads, abstracting the storage layer to enable evolution, and optimizing for stability rather than peak benchmark numbers.

The case study reflects several mature LLMOps principles: starting pragmatically with existing infrastructure to prove value quickly, recognizing when scaling limits require reevaluation, investing in rigorous evaluation that mirrors production reality, abstracting infrastructure behind service interfaces to reduce coupling, and making decisions based on holistic operational considerations rather than isolated performance metrics.

## Critical Assessment and Balanced View

While this case study provides valuable insights into production vector database selection, readers should note that it represents Booking.com's specific context and scale. The 40% cost reduction claim, while significant, depends on their specific workload characteristics, concurrency patterns, and infrastructure costs. Organizations with different scales, query patterns, or operational contexts might see different results.

The team's decision to only publish OpenSearch and Weaviate results, while understandable from a vendor relationship perspective, limits readers' ability to understand the full competitive landscape they evaluated. The article doesn't detail specific Weaviate configuration, cluster sizing, or operational practices that contributed to the performance improvement, which would help readers replicate or adapt their approach.

Additionally, while the team emphasizes production-realistic testing, the Amazon Reviews dataset, while large, may not perfectly represent their actual production data characteristics. The extent to which this test dataset mirrors real production query patterns, data distributions, and access patterns affects how predictive the benchmark results will be of actual post-migration performance.

The case study also doesn't address potential vendor lock-in concerns or migration challenges beyond the technical abstraction layer they built. Long-term operational costs, vendor support experiences, and evolution of the technology over time remain to be seen.

Despite these caveats, the case study demonstrates sophisticated LLMOps thinking in infrastructure selection. The emphasis on production-realistic evaluation, holistic assessment beyond raw performance, and architectural patterns enabling evolution represent valuable lessons for organizations operating ML and GenAI systems at scale. The recognition that vector search infrastructure deserves the same rigor as other critical datastores is an important maturation of the LLMOps field.
