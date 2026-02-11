---
title: "Semantic Search for Aviation Safety Reports Using Embeddings and Hybrid Search"
slug: "semantic-search-for-aviation-safety-reports-using-embeddings-and-hybrid-search"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69242a7eece3e9db38177618"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:27:35.846Z"
  createdOn: "2025-11-24T09:50:54.750Z"
llmopsTags:
  - "document-processing"
  - "classification"
  - "question-answering"
  - "translation"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "unstructured-data"
  - "rag"
  - "embeddings"
  - "reranking"
  - "semantic-search"
  - "vector-search"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "chunking"
  - "postgresql"
  - "fastapi"
  - "serverless"
  - "databases"
  - "api-gateway"
  - "monitoring"
  - "open-source"
  - "elasticsearch"
  - "openai"
  - "microsoft-azure"
  - "amazon-aws"
industryTags: "other"
company: "Beams"
summary: "Beams, a startup operating in aviation safety, built a semantic search system to help airlines analyze thousands of safety reports written daily by pilots and ground crew. The problem they addressed was the manual, time-consuming process of reading through unstructured, technical, jargon-filled free-text reports to identify trends and manage risks. Their solution combined vector embeddings (using Azure OpenAI's text-embedding-3-large model) with PostgreSQL and PG Vector for similarity search, alongside a two-stage retrieval and reranking pipeline. They also integrated structured filtering with semantic search to create a hybrid search system. The system was deployed on AWS using Lambda functions, RDS with PostgreSQL, and SQS for event-driven orchestration. Results showed that users could quickly search through hundreds of thousands of reports using natural language queries, finding semantically similar incidents even when terminology varied, significantly improving efficiency in safety analysis workflows."
link: "https://www.youtube.com/watch?v=_Xs7r9d86qQ"
year: 2025
seo:
  title: "Beams: Semantic Search for Aviation Safety Reports Using Embeddings and Hybrid Search - ZenML LLMOps Database"
  description: "Beams, a startup operating in aviation safety, built a semantic search system to help airlines analyze thousands of safety reports written daily by pilots and ground crew. The problem they addressed was the manual, time-consuming process of reading through unstructured, technical, jargon-filled free-text reports to identify trends and manage risks. Their solution combined vector embeddings (using Azure OpenAI's text-embedding-3-large model) with PostgreSQL and PG Vector for similarity search, alongside a two-stage retrieval and reranking pipeline. They also integrated structured filtering with semantic search to create a hybrid search system. The system was deployed on AWS using Lambda functions, RDS with PostgreSQL, and SQS for event-driven orchestration. Results showed that users could quickly search through hundreds of thousands of reports using natural language queries, finding semantically similar incidents even when terminology varied, significantly improving efficiency in safety analysis workflows."
  canonical: "https://www.zenml.io/llmops-database/semantic-search-for-aviation-safety-reports-using-embeddings-and-hybrid-search"
  ogTitle: "Beams: Semantic Search for Aviation Safety Reports Using Embeddings and Hybrid Search - ZenML LLMOps Database"
  ogDescription: "Beams, a startup operating in aviation safety, built a semantic search system to help airlines analyze thousands of safety reports written daily by pilots and ground crew. The problem they addressed was the manual, time-consuming process of reading through unstructured, technical, jargon-filled free-text reports to identify trends and manage risks. Their solution combined vector embeddings (using Azure OpenAI's text-embedding-3-large model) with PostgreSQL and PG Vector for similarity search, alongside a two-stage retrieval and reranking pipeline. They also integrated structured filtering with semantic search to create a hybrid search system. The system was deployed on AWS using Lambda functions, RDS with PostgreSQL, and SQS for event-driven orchestration. Results showed that users could quickly search through hundreds of thousands of reports using natural language queries, finding semantically similar incidents even when terminology varied, significantly improving efficiency in safety analysis workflows."
---

## Overview

This case study presents the experience of Beams, a startup that pivoted into aviation safety during COVID, in building a production semantic search system for analyzing aviation safety reports. The presentation was delivered by two speakers—Dad, a data consultant with 15 years in tech who previously worked at Pivotal and led data teams, and Dennis, an engineer with 15-20 years of experience who works at Beams and also has a background at Pivotal Labs and SoundCloud.

The aviation safety domain generates massive volumes of free-text reports daily from pilots, cabin crew, and ground operations personnel. These reports cover everything from minor maintenance issues like stuck trolley wheels to critical incidents like windshear during approach or near-miss drone strikes. Currently, analyzing these reports is a largely manual process where safety analysts must read through reports, identify trends, perform risk management, and extract quantitative insights from qualitative data. The challenge Beams tackled was making this process more efficient and scalable through semantic search powered by embeddings and LLMs.

## The Problem Space and Domain Challenges

Aviation safety reporting presents several unique challenges that make traditional keyword-based search inadequate. The reports are written in highly technical jargon with extensive use of abbreviations that are often inconsistent across different airlines—the same abbreviation might mean completely different things at different organizations. The language is extremely dense because reports are typically written outside core working hours when personnel are stressed and time-pressured, leading them to cram as much detail as possible into compact text. Traditional LLMs without specific domain training struggle with this specialized language.

Semantic variability compounds the search problem. The same incident might be described as "bird strike" by one reporter and "flock of geese hit the engine" by another. Analysts need to find all semantically related incidents without writing dozens of search query variations. The global nature of aviation means that while English is the cockpit standard, ground operations personnel often write reports in their native languages where they're more comfortable. Additional complications include negation handling (like "no stall warning" not meaning a stall warning occurred), constantly evolving terminology as new aircraft and technologies are introduced, and the completely unstructured free-form nature of the text.

The speakers demonstrated a tool called "Co-Reporter" that addresses report quality by using AI to analyze reports in real-time as they're being written, asking follow-up questions about missing information before the report is submitted. This helps ensure reports are complete and reduces the weeks-long back-and-forth that traditionally occurs when analysts need clarification.

## Technical Architecture and Infrastructure Decisions

Beams' architecture is built entirely on AWS, leveraging multiple managed services. The core application is a single-page app with a Python backend using FastAPI. The entire backend relies heavily on AWS Lambda functions for compute, including the FastAPI web layer itself. This Lambda-based approach has implications both positive and negative—it provides automatic scaling and event-driven orchestration but also imposes constraints on processing time and hardware optimization.

The database layer uses Amazon RDS running PostgreSQL with the PG Vector extension enabled, sitting behind an RDS proxy. This choice reflects their software philosophy of "start simple and add complexity later." Rather than immediately jumping to specialized vector databases like Qdrant, Weaviate, or Pinecone, they chose PG Vector because it integrates seamlessly with their existing PostgreSQL infrastructure on RDS. Since AWS added PG Vector support to RDS via extensions in 2023, it became possible to get vector similarity search capabilities within their managed relational database.

The benefits of this approach are substantial: they get all the standard PostgreSQL features including ACID compliance, point-in-time recovery, SQL query capabilities, automatic backups, and monitoring through RDS. The managed nature means AWS handles scaling, patching, and infrastructure concerns. PG Vector supports multiple distance metrics (L1, L2, cosine similarity) and two index types—HNSW (Hierarchical Navigable Small World) and IVFFlat. In their case, they found IVFFlat performed better for their specific data characteristics, though HNSW generally offers better precision-recall tradeoffs at the cost of slower index building. IVFFlat uses a k-means clustering approach to partition the vector space into sublists, enabling faster approximate nearest neighbor search.

The ingestion pipeline is event-driven, orchestrated using AWS SQS queues. Different processing steps run in individual Lambda containers, making the architecture modular and allowing independent scaling of different stages. This architecture supports both real-time report ingestion (where reports are forwarded immediately from airline systems) and bulk uploads (where airlines send batches of reports multiple times per day via S3 buckets).

## Embedding and Vector Search Implementation

The ingestion pipeline begins with PII (personally identifiable information) removal to ensure compliance. For some airline customers, Beams deploys small models that run on-premise at the customer site to perform initial PII removal before reports are even sent to Beams' systems, with an optional second pass using more powerful models in Beams' infrastructure. After PII removal, reports undergo translation if needed since reports may arrive in various languages.

For generating embeddings, Beams uses Azure OpenAI services. They started with the ada-002 embedding model but eventually migrated to text-embedding-3-large. Through empirical experimentation with their specific dataset, they determined that a dimensionality of 2,048 dimensions hit the optimal balance between precision and recall for their use case. The speakers noted that performance differences between various embedding model choices weren't dramatically large in their testing, suggesting that for their domain the choice of model mattered less than other architectural decisions.

The basic retrieval approach follows standard semantic search patterns: user queries are embedded using the same model, vector similarity search is performed against the stored report embeddings in PostgreSQL using PG Vector, and the most similar reports are retrieved based on cosine similarity or other distance metrics. However, this retrieval stage alone doesn't provide sufficient precision, which led them to implement a two-stage retrieval and reranking architecture.

## Two-Stage Retrieval and Reranking

The speakers emphasized that while retrieval using vector similarity provides "okayish" results, reranking is essential for achieving the precision their users need. In their two-stage approach, the retrieval stage first pulls a larger set of potentially relevant documents based on embedding similarity. These documents are already ranked by their similarity scores. The reranking stage then applies a more sophisticated model specifically trained for ranking relevance to reorder these candidates, producing a final rerank score that better captures true relevance to the query.

The critical tradeoff in reranking is speed versus performance. Many open-source reranking models exist with varying capabilities, and models can be fine-tuned for specific domains. However, the best-performing reranking models might take 10-15 seconds to process results, which would create an unacceptable user experience. Beams chose a more lightweight reranking model that maintains good precision while keeping response times to 1-2 seconds maximum. They referenced BEIR (Benchmarking Information Retrieval) as a resource for comparing reranking model performance.

This pragmatic approach to model selection—prioritizing user experience and latency over marginal accuracy improvements—reflects mature LLMOps thinking. In production systems, the 95th percentile response time often matters more than achieving state-of-the-art benchmark scores, especially in interactive applications where users are actively waiting for results.

## Inference Optimization for CPU-Based Lambda

Running inference on AWS Lambda presents hardware constraints since Lambda functions run on Intel CPUs without GPU acceleration. Using standard sentence transformer libraries without optimization would result in poor performance. To address this, Beams built a custom inference layer using OpenVINO, Intel's optimization toolkit specifically designed for efficient inference on CPU architectures.

Their custom inference layer required careful tuning of batch sizes and token length limits to balance throughput and latency. Processing reports in larger batches improves throughput but increases latency for individual requests. Token length affects both memory consumption and processing time. These optimizations were necessary to make embedding generation and similarity search practical within Lambda's execution environment and time constraints.

This investment in infrastructure optimization demonstrates an important LLMOps principle: off-the-shelf libraries and models often need significant engineering work to meet production requirements around latency, cost, and resource constraints. The choice to use CPU-optimized inference rather than GPU infrastructure represents a cost-performance tradeoff that makes sense for their architecture and usage patterns.

## Hybrid Search: Combining Semantic and Structured Filtering

A crucial insight from this case study is that semantic search alone is insufficient—users need to combine AI-powered semantic search with traditional structured filtering across multiple dimensions. Aviation reports come with or generate substantial structured metadata: flight data, dates, aircraft types, airports, classifications, hazard types, and various domain-specific categorizations. The system extracts some of this structure automatically through classification models, while other structured data comes directly from customers.

Users express their search intent through a UI that supports Disjunctive Normal Form (DNF) logic—essentially AND/OR combinations represented as an array of arrays in JSON. This provides flexibility while remaining relatively intuitive. The challenge is that combining semantic vector search with complex structured filters across 35+ different attributes with various operators (in, not in, equals, greater than, etc.) creates significant SQL query complexity. Different attributes require different handling—some need joins, others need subqueries, and all of this must be composed dynamically based on user-specified filters.

Beams built a "filter service" that uses SQLAlchemy to construct these complex queries dynamically, combining the vector similarity search from PG Vector with traditional SQL filtering. The complexity grew to a point where even with comprehensive test coverage, changing one part of the query construction logic to improve performance could inadvertently break behavior elsewhere. This is a common challenge in production systems—the interaction between multiple subsystems creates emergent complexity that's difficult to test exhaustively.

To address both the implementation complexity and user experience challenges, Beams is experimenting with natural language processing for filter specification. They feed an LLM with full context about all available filters, attribute meanings, operators, and domain semantics. Users can then express their intent in natural language (like "show me flights from Zurich related to fatigue last week"), and the LLM generates the corresponding structured filter representation that the system understands. The speakers noted this approach works "surprisingly well," bridging the gap between user intent and system capabilities.

The live demo showed this in action: a query like "show me all flights from Zurich" was correctly parsed to filter by departure/arrival airports, and when extended to "also limit to ones relating to fatigue," the LLM correctly identified that fatigue could be expressed multiple ways in reports and should map to specific classification categories in their structured data, combining semantic search ("text similar to fatigue") with structured filters on classification attributes.

## Architecture Evolution and Future Plans

The speakers were transparent about the limitations and evolution of their architecture. Their philosophy of starting simple and adding complexity as needed served them well initially—they were able to validate the feature with users and demonstrate value quickly. PG Vector on RDS allowed them to build semantic search without the operational overhead of managing a separate vector database.

However, as requirements grew more complex, particularly around the hybrid search combining semantic similarity with intricate filtering logic, they began hitting scalability and maintainability ceilings. They realized they were essentially "building another search company" rather than focusing on their core product. This led them to decide to migrate to a more mature search infrastructure.

They're moving to OpenSearch (the open-source fork of Elasticsearch), which provides native hybrid search capabilities combining traditional text search, vector similarity search, and structured filtering. They also evaluated Weaviate and other specialized vector databases, but OpenSearch's strong filtering capabilities alongside vector search made it the best fit for their requirements. This evolution demonstrates healthy LLMOps maturity—recognizing when custom-built solutions should be replaced with purpose-built tools as requirements scale.

## Software Engineering Philosophy and Practices

Throughout the presentation, the speakers emphasized software engineering practices that shaped their approach. Both come from Pivotal Labs backgrounds, which strongly influenced their methodology. They practice test-driven development, writing tests before implementation. They do extensive pair programming (90% of development time). They prioritize security and compliance, evident in their PII removal pipeline and careful data handling.

Their principle of "start simple and add complexity later" reflects pragmatic engineering—using PostgreSQL with PG Vector extension rather than immediately adopting specialized vector databases allowed faster iteration and validation. Their philosophy of "do the right thing, know what works, be kind" emphasizes delivering working solutions over chasing the latest technology trends.

The security and compliance requirements in aviation are stringent, and their architecture reflects this with PII removal as the first pipeline stage, data encryption, proper access controls, and working within regulated cloud environments that airlines accept.

## Practical LLMOps Considerations

Several practical LLMOps insights emerge from this case study:

**Latency-Accuracy Tradeoffs**: Choosing a lightweight reranking model that delivers results in 1-2 seconds rather than a more accurate model requiring 10-15 seconds demonstrates prioritizing user experience over benchmark performance. In production, perceived performance often matters more than marginal accuracy gains.

**Infrastructure Constraints Drive Design**: Lambda's CPU-only environment necessitated custom inference optimization with OpenVINO. Real production systems must work within business and infrastructure constraints rather than assuming ideal conditions.

**Domain Adaptation Challenges**: Standard LLMs struggle with highly technical domain language, extensive abbreviations, and inconsistent terminology. The speakers acknowledged this remains a challenge, particularly for translations where information might be lost or distorted (like negation handling). They emphasize the importance of keeping humans in the loop rather than fully automating decisions.

**Hybrid Approaches Outperform Pure AI**: Combining semantic search with structured filtering provides better results than either alone. The complexity of this combination—particularly query construction logic—represents real engineering challenges beyond training models.

**Event-Driven Architecture for Variable Load**: Using SQS queues to orchestrate Lambda-based processing allows handling both real-time streaming and bulk batch ingestion patterns gracefully, with different customers having different usage patterns.

**Model Selection Pragmatism**: The speakers noted that differences between embedding model choices weren't dramatic for their use case, suggesting that for many production applications, using a good-enough model and focusing on system architecture may provide more value than endlessly optimizing model selection.

## Open Questions and Ongoing Challenges

The Q&A session revealed several ongoing challenges. Translation of technical reports remains problematic—the risk of information loss or distortion (particularly with negations or technical terminology) is real. Beams acknowledged this is an industry-wide problem they haven't fully solved. Their approach is transparency with customers about limitations and maintaining human-in-the-loop verification rather than full automation.

Indexing performance is critical for their use case—without proper indexing on the vector columns, query performance degrades significantly. They use IVFFlat indexing in PG Vector, though the choice between IVFFlat and HNSW depends on specific data characteristics and requirements.

Document ingestion latency varies depending on customer integration patterns—it's not instant but also not excessively slow, likely in the range of seconds to minutes depending on pipeline stage complexity and queue depth. The retrieval phase itself operates in microseconds once indexing is in place, with reranking adding 1-2 seconds.

The complexity of the filter service and query construction remains an operational challenge. Their experimentation with LLM-powered natural language to structured filter translation represents an interesting meta-application of LLMs—using AI to generate queries for AI systems—but this layer adds its own potential failure modes and debugging challenges.

## Assessment and Balanced Perspective

This case study demonstrates a pragmatic, engineering-focused approach to deploying LLMs in production for a specialized domain with real business value. The speakers were refreshingly honest about limitations, tradeoffs, and ongoing challenges rather than presenting an overly polished success story.

Strengths of their approach include starting with simpler technology (PG Vector) to validate quickly, comprehensive software engineering practices with testing and pair programming, careful attention to latency and user experience in model selection, and recognition of when to evolve to more specialized tools (OpenSearch). The hybrid search combining semantic and structured approaches reflects understanding that AI doesn't replace traditional database capabilities but complements them.

Areas of concern or ongoing challenges include the growing complexity of the filter service and query construction logic, acknowledged limitations in handling translations and domain-specific language nuances, the Lambda-based architecture which provides convenience but may constrain optimization options, and the challenge of maintaining system correctness as complexity grows even with good test coverage.

The migration to OpenSearch suggests they've hit the limits of their initial architecture, which is a natural evolution but also represents significant re-engineering effort. This reflects a common pattern in LLMOps—initial solutions that work for validation often need substantial rearchitecture for scale and feature growth.

Overall, this case study provides valuable insights into real-world semantic search deployment in a high-stakes domain, demonstrating that successful LLMOps involves as much traditional software engineering, infrastructure decisions, and user experience considerations as it does model selection and AI capabilities. The emphasis on pragmatism over perfection, combined with transparency about limitations and tradeoffs, makes this a particularly valuable case study for practitioners building production LLM systems.