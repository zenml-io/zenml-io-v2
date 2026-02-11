---
title: "Building and Scaling AI-Powered Visual Search Infrastructure"
slug: "building-and-scaling-ai-powered-visual-search-infrastructure"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67e11708b1e5dba4b5c82ba1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:04:27.931Z"
  createdOn: "2025-03-24T08:25:44.161Z"
llmopsTags:
  - "multi-modality"
  - "unstructured-data"
  - "structured-output"
  - "embeddings"
  - "vector-search"
  - "semantic-search"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "elasticsearch"
  - "postgresql"
  - "redis"
  - "docker"
  - "monitoring"
  - "databases"
  - "amazon-aws"
  - "microsoft-azure"
industryTags: "tech"
company: "Figma"
summary: "Figma implemented AI-powered search features to help users find designs and components across their organization using text descriptions or visual references. The solution leverages the CLIP multimodal embedding model, with infrastructure built to handle billions of embeddings while keeping costs down. The system combines traditional lexical search with vector similarity search, using AWS services including SageMaker, OpenSearch, and DynamoDB to process and index designs at scale. Key optimizations included vector quantization, software rendering, and cluster autoscaling to manage computational and storage costs."
link: "https://www.figma.com/blog/the-infrastructure-behind-ai-search-in-figma/"
year: 2024
seo:
  title: "Figma: Building and Scaling AI-Powered Visual Search Infrastructure - ZenML LLMOps Database"
  description: "Figma implemented AI-powered search features to help users find designs and components across their organization using text descriptions or visual references. The solution leverages the CLIP multimodal embedding model, with infrastructure built to handle billions of embeddings while keeping costs down. The system combines traditional lexical search with vector similarity search, using AWS services including SageMaker, OpenSearch, and DynamoDB to process and index designs at scale. Key optimizations included vector quantization, software rendering, and cluster autoscaling to manage computational and storage costs."
  canonical: "https://www.zenml.io/llmops-database/building-and-scaling-ai-powered-visual-search-infrastructure"
  ogTitle: "Figma: Building and Scaling AI-Powered Visual Search Infrastructure - ZenML LLMOps Database"
  ogDescription: "Figma implemented AI-powered search features to help users find designs and components across their organization using text descriptions or visual references. The solution leverages the CLIP multimodal embedding model, with infrastructure built to handle billions of embeddings while keeping costs down. The system combines traditional lexical search with vector similarity search, using AWS services including SageMaker, OpenSearch, and DynamoDB to process and index designs at scale. Key optimizations included vector quantization, software rendering, and cluster autoscaling to manage computational and storage costs."
---

## Overview

Figma, the collaborative design platform, developed an AI-powered search infrastructure to address a fundamental user pain point: the difficulty of locating specific designs or components within large organizations with complex design systems. Announced at Config 2024, these features enable users to search across all designs and published components using text descriptions, screenshots, or selections of Figma layers. This case study provides a detailed look at the infrastructure decisions, scaling challenges, and optimizations required to deploy embedding-based search at production scale.

The solution encompasses two primary search flows: "Search for designs" (a new capability for finding frames across files) and "Search for components" (an enhancement to the existing Assets panel with semantic understanding). What makes this case study particularly valuable from an LLMOps perspective is the transparency around the engineering challenges of generating and indexing billions of embeddings while managing infrastructure costs.

## Embedding Model Selection and Deployment

At the core of Figma's AI-powered search is the open-source CLIP (Contrastive Language-Image Pre-training) model, a multimodal embedding model capable of processing both text and images into a unified vector space. This architectural choice is crucial—by using a multimodal model, Figma can support search queries via text descriptions, screenshots, or layer selections while maintaining a single embedding index.

Figma explicitly notes that their embedding models were not trained on private Figma files or customer data. Fine-tuning was performed exclusively on images of user interfaces from publicly available Community files. This is an important consideration for any organization deploying embedding models on user content, as it addresses potential privacy and intellectual property concerns.

The model is deployed on AWS SageMaker, with embedding requests sent in batches to enable parallel inference. The team discovered that determining optimal batch size required experimentation—past a certain threshold, latency began growing linearly with batch size rather than maintaining the expected sublinear batching benefit. This is a common but important finding in production ML systems: theoretical batch efficiency gains don't always materialize in practice due to memory constraints, GPU utilization patterns, or network overhead.

For component search, Figma uses a variant of the same model architecture but fine-tuned specifically on publicly available Community UI kits. This domain-specific fine-tuning likely improves retrieval quality for the more focused component search use case.

## Pipeline Architecture and Data Flow

The embedding generation and indexing pipeline consists of several discrete stages, each implemented as separate asynchronous jobs. This separation provides granular control over batching and retry behavior—a pattern that reflects mature production ML operations thinking.

### Design Identification and Thumbnailing

The first major challenge is enumerating all indexable frames within Figma files. Unlike published components, unpublished frames are not readily enumerable through standard APIs. To address this, Figma runs a headless server-side version of their C++ editor in asynchronous jobs. This is a significant architectural decision—it means they're leveraging their core product codebase for ML preprocessing rather than building entirely separate systems.

Frame metadata is persisted to DynamoDB (chosen for its simple key-value access pattern and high throughput capabilities), while rendered thumbnails are uploaded to S3. The choice of DynamoDB over their existing RDS cluster reflects good architectural thinking: the AI search features require only key-value operations without transactions or foreign key relationships, making DynamoDB's characteristics well-suited to the workload.

### Embedding Generation

Thumbnails are then processed by the SageMaker-hosted embedding model in batches. The team emphasizes the importance of parallelizing both image downloading and image resizing/normalization at inference time—preprocessing bottlenecks can easily become the limiting factor in embedding generation pipelines.

### Search Indexing

Generated embeddings are written to OpenSearch along with metadata (frame name, containing file ID, project, team, and organization). Figma chose OpenSearch because it was already widely deployed across the organization for traditional search features. This decision to leverage existing infrastructure rather than introducing specialized vector databases (like Pinecone, Weaviate, or Milvus) likely simplified operations and reduced the learning curve for the team, though it came with its own challenges as described later.

The additional metadata enables faceted search, allowing users to filter results by various organizational dimensions in addition to vector similarity.

## Hybrid Search Strategy

For component search, Figma implemented a hybrid approach combining lexical (fuzzy string matching) search with embedding-based semantic search. Searches are performed simultaneously against both indexes, with results interleaved based on a scoring mechanism.

Since raw scores from independent OpenSearch indexes aren't directly comparable, the team implemented min-max normalization with a boost for exact lexical matches. This hybrid approach is a pragmatic choice that preserves valuable lexical search functionality while adding semantic capabilities—users searching for "Mouse" still get the icon literally named "Mouse" alongside semantically related cursor icons.

This interleaving strategy reflects a common pattern in production search systems: new ML-powered features are often integrated alongside existing approaches rather than replacing them entirely, providing graceful fallback behavior and maintaining user expectations.

## Scaling Challenges and Cost Optimization

Perhaps the most operationally significant portion of this case study covers the challenges of scaling to billions of embeddings. The team identified a particularly tricky rollout challenge: even for a single user to experience the search features as intended, their entire team's data must be indexed. Given that most Figma teams are small and numerous, even a small percentage of early beta users would require indexing nearly all teams—making cost efficiency critical from day one.

### Compute Optimization

Analysis revealed that the major compute costs came not from embedding generation itself, but from the design identification and thumbnailing stages. Several optimizations addressed this:

The team rewrote identification logic from Ruby to C++, eliminating intermediate JSON serialization. This architectural change yielded significant runtime improvements and memory reductions—a reminder that preprocessing pipelines in ML systems are often where the biggest performance gains lie.

They migrated thumbnailing from GPU-based rendering on older AWS instances to CPU-based rendering using `llvmpipe` on newer instance types. This counterintuitive move (software rendering instead of GPU rendering) was actually a cost saver because the CPU instances were cheaper and faster for this specific workload. This highlights the importance of benchmarking assumptions rather than accepting conventional wisdom about GPU versus CPU workloads.

A major optimization came from reducing indexing freshness. The original pipeline triggered on every file change, but analysis showed that debouncing to at most every four hours reduced processing volume to just 12% of the original data. Users typically make many changes during editing sessions, so rapid re-indexing provides little incremental value while consuming significant resources.

Cluster autoscaling based on Figma's diurnal usage patterns helped avoid paying for unnecessary compute during lower traffic periods.

### Index Size Reduction

OpenSearch costs scaled with cluster size, which in turn depended on index size and memory requirements. The team implemented several strategies to reduce the index footprint.

They refined the definition of "indexable" content by removing draft files, duplicate designs within files, and unchanged file copies. This cut the index in half while simultaneously improving user experience—not surfacing duplicate designs is actually a better search experience.

Vector quantization was applied to compress embedding representations. By default, OpenSearch's kNN plugin uses four-byte floats for each embedding dimension, but quantization reduces this at the cost of slight accuracy reduction in nearest neighbor search. This is a common trade-off in production vector search systems.

## OpenSearch Challenges and Bug Discovery

Running vector search at scale on OpenSearch revealed several interesting issues that required close collaboration with the AWS OpenSearch team.

The team discovered non-determinism in search results during end-to-end testing. After extensive debugging, they determined that queries routed to replica shards were returning different results than those routed to primaries, with replicas hitting a type casting error (`Reader cannot be cast to class SegmentReader`) in the delete path. This affected clusters using segment replication and was ultimately fixed upstream by the OpenSearch team. This finding underscores the importance of thorough testing in distributed systems and the value of having vendor relationships for resolving deep infrastructure issues.

A second issue arose from their `_source` optimization. To improve storage and query latency, the team removed embedding vectors from the `_source` field (which stores the original document body). However, OpenSearch uses `_source` for document updates—it fetches existing fields, applies updates, and rewrites the document. This meant that any metadata update (like file name changes) was inadvertently wiping embeddings from documents. The fix required re-fetching embeddings from DynamoDB during updates while retaining the `_source` optimization for normal operations.

These real-world issues with OpenSearch's kNN capabilities, even on the latest AWS-supported release, are valuable learnings for anyone considering similar vector search implementations.

## Production Deployment Status

The AI search features were in early beta at the time of this case study (October 2024), with plans for continued rollout over subsequent months. The phased approach allows the team to gather feedback and potentially identify additional scaling or quality issues before broader availability.

## Key Takeaways for LLMOps Practitioners

This case study offers several valuable lessons for teams building embedding-based search systems at scale. First, preprocessing pipelines often dominate compute costs rather than model inference itself, so optimization efforts should follow the data. Second, hybrid search approaches that combine lexical and semantic results can provide better user experiences than pure vector search. Third, reducing index freshness requirements through debouncing can dramatically reduce costs with minimal user impact. Fourth, existing infrastructure (like OpenSearch) can be adapted for vector search, but teams should anticipate quirks and edge cases, particularly at scale. Finally, the decision to use CPU rendering over GPU rendering for specific workloads demonstrates that conventional assumptions about compute platforms should be tested rather than assumed.