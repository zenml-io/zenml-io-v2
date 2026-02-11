---
title: "Improving Local Search with Multimodal LLMs and Vector Search"
slug: "improving-local-search-with-multimodal-llms-and-vector-search"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67a8c1631316824d0ec79bf5"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:59:51.694Z"
  createdOn: "2025-02-09T14:53:23.745Z"
llmopsTags:
  - "multi-modality"
  - "unstructured-data"
  - "structured-output"
  - "embeddings"
  - "vector-search"
  - "semantic-search"
  - "latency-optimization"
  - "elasticsearch"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "kubernetes"
  - "monitoring"
  - "databases"
  - "amazon-aws"
  - "microsoft-azure"
industryTags: "e-commerce"
company: "OfferUp"
summary: "OfferUp transformed their traditional keyword-based search system to a multimodal search solution using Amazon Bedrock's Titan Multimodal Embeddings and Amazon OpenSearch Service. The new system processes both text and images to generate vector embeddings, enabling more contextually relevant search results. The implementation led to significant improvements, including a 27% increase in relevance recall, 54% reduction in geographic spread for more local results, and a 6.5% increase in search depth."
link: "https://aws.amazon.com/blogs/machine-learning/offerup-improved-local-results-by-54-and-relevance-recall-by-27-with-multimodal-search-on-amazon-bedrock-and-amazon-opensearch-service?tag=soumet-20"
year: 2025
seo:
  title: "OfferUp: Improving Local Search with Multimodal LLMs and Vector Search - ZenML LLMOps Database"
  description: "OfferUp transformed their traditional keyword-based search system to a multimodal search solution using Amazon Bedrock's Titan Multimodal Embeddings and Amazon OpenSearch Service. The new system processes both text and images to generate vector embeddings, enabling more contextually relevant search results. The implementation led to significant improvements, including a 27% increase in relevance recall, 54% reduction in geographic spread for more local results, and a 6.5% increase in search depth."
  canonical: "https://www.zenml.io/llmops-database/improving-local-search-with-multimodal-llms-and-vector-search"
  ogTitle: "OfferUp: Improving Local Search with Multimodal LLMs and Vector Search - ZenML LLMOps Database"
  ogDescription: "OfferUp transformed their traditional keyword-based search system to a multimodal search solution using Amazon Bedrock's Titan Multimodal Embeddings and Amazon OpenSearch Service. The new system processes both text and images to generate vector embeddings, enabling more contextually relevant search results. The implementation led to significant improvements, including a 27% increase in relevance recall, 54% reduction in geographic spread for more local results, and a 6.5% increase in search depth."
---

## Overview

OfferUp is a mobile-first online marketplace that facilitates local transactions and discovery for buying and selling items, jobs, and local services. With millions of active listings and millions more added monthly, the platform required a robust search system to help users discover relevant items quickly. This case study documents their journey from a traditional keyword-based search architecture to a modern multimodal search solution powered by Amazon Bedrock's Titan Multimodal Embeddings and Amazon OpenSearch Service.

The transformation addresses a common challenge in marketplace search: moving beyond simple lexical matching to semantic understanding that considers both text and visual content. This is particularly relevant for marketplaces where product listings are user-generated and may have inconsistent descriptions or varying quality images.

## The Problem: Limitations of Keyword Search

OfferUp's foundational search architecture was built on Elasticsearch v7.10 running on Amazon EC2 instances, using the BM25 ranking algorithm for keyword-based search. While this approach effectively surfaced a broad inventory, it presented several critical limitations that impacted user experience and business metrics.

The first major challenge was **context understanding**. Keyword searches fundamentally cannot account for the context in which terms are used. A search for "apple" could refer to the fruit, the technology company, or a brand name in different contexts, but keyword matching treats all instances identically. This semantic ambiguity leads to irrelevant results and frustrated users.

The second limitation was **synonym and variation awareness**. Keyword matching fails to recognize that "car" and "sedan" might be semantically related, or that a search for "iPhone 11" should not necessarily return results for "iPhone 10" or "iPhone 12" with equal weight. The foundational system lacked the ability to understand these semantic relationships between words.

The third challenge involved **complex query management**. Multi-concept queries like "red running shoes" posed significant difficulties. The BM25 algorithm might return shoes that are red but not running shoes, or running shoes that aren't red, because it treats each keyword independently rather than understanding the combined semantic intent.

These limitations directly impacted key business metrics, particularly Engagement with Seller Response (EWSR) and ad impressions, which are critical for a marketplace business model.

## The Solution: Multimodal Vector Search Architecture

OfferUp selected Amazon Titan Multimodal Embeddings G1 and Amazon OpenSearch Service as the foundation for their transformed search architecture. This decision was driven by the fully managed nature of these services, which simplified deployment and operation while meeting the platform's high throughput and latency requirements.

### Amazon Titan Multimodal Embeddings

The Amazon Titan Multimodal Embeddings G1 model is a pre-trained foundation model capable of processing both text and images, generating embeddings that capture semantic meaning in a unified vector space. The model specifications include:

- Model ID: amazon.titan-embed-image-v1
- Maximum input text tokens: 256
- Maximum input image size: 25 MB
- Output vector dimensions: 1,024 (default), 384, or 256
- Inference types: On-Demand or Provisioned Throughput

The critical capability here is that the model translates both images and text into embeddings within the same semantic space, enabling meaningful comparisons between text queries and image content.

### OpenSearch Service Vector Database Capabilities

Amazon OpenSearch Service provides vector database functionality that enables storage, indexing, and low-latency similarity queries. The system uses k-nearest neighbor (k-NN) indexes built with advanced algorithms such as Hierarchical Navigable Small Worlds (HNSW) and Inverted File (IVF) systems.

Key features leveraged in this implementation include:

- **Connector for Amazon Bedrock**: Built-in connectors enable seamless integration with Amazon Bedrock ML models, allowing OpenSearch to directly invoke the Titan Multimodal Embeddings model.
- **Ingest Pipeline**: These pipelines process, transform, and route data efficiently, maintaining smooth data flows for real-time search accessibility.
- **Neural Search**: This feature transforms text and images into vectors at both ingestion and query time, providing end-to-end configuration of pipelines without leaving the OpenSearch environment.

## Production Architecture and Data Flows

The transformed architecture maintains much of the existing infrastructure while integrating the new embedding and vector search capabilities.

### Data Indexing Workflow

When an OfferUp user creates or updates a listing, images are uploaded directly to Amazon S3 using signed URLs. The listing details (title, description, image IDs) are submitted to a posting microservice, which persists changes to DynamoDB via a listing writer microservice. The writer publishes change events to an SNS topic, which an SQS queue subscribes to.

A Lambda function continuously polls this queue for incoming listing updates. When processing an update, the indexer retrieves full listing details from DynamoDB and, crucially, uses an image microservice to retrieve and base64-encode the listing images.

The indexer sends the listing data along with base64-encoded images to the OpenSearch Service domain. An OpenSearch ingest pipeline then invokes the Bedrock connector, which calls the Titan Multimodal Embeddings model to generate vector embeddings for both the listing image and description. These embeddings are stored alongside the listing data in the OpenSearch index.

### Query Workflow

When users perform searches (text-based like "gray faux leather sofa" or image-based), the search microservice forwards the query to OpenSearch, which invokes a neural search pipeline. This pipeline uses the same Titan Multimodal Embeddings model to convert the query (text or image) into a vector embedding.

OpenSearch then performs k-NN search to find the listings with embeddings most similar to the query embedding. After extensive A/B testing, OfferUp determined that a k value of 128 delivers optimal search results while managing compute resources efficiently.

## Infrastructure and Deployment Details

The OpenSearch domain is deployed across 3 Availability Zones for high availability. The cluster architecture includes:

- 3 cluster manager nodes (m6g.xlarge.search instances) dedicated to cluster operations
- 24 data nodes (r6gd.2xlarge.search instances) optimized for storage and processing
- Index configuration: 12 shards with 3 read replicas for enhanced read performance
- Per-shard memory consumption: approximately 11.6GB

## Migration Strategy

OfferUp adopted a phased, measured approach to implementing multimodal search:

**Phase 1 - DMA Identification**: OfferUp categorizes markets into Designated Market Areas (DMAs) by density. They initially identified three high-density, business-critical locations where offline experiments showed promising results for multimodal search.

**Phase 2 - Infrastructure Setup**: This involved deploying the OpenSearch domain with the specified configuration and enabling access to the Titan Multimodal Embeddings model in Amazon Bedrock.

**Phase 3 - Backfilling**: The team converted images from all active listings into vector embeddings using the Titan model and stored them in OpenSearch. In the first phase, OfferUp backfilled 12 million active listings.

The rollout used A/B testing to manage traffic control and experiment variations, with control groups using the existing keyword search and variant groups experiencing the new multimodal functionality.

## Results and Evaluation

The A/B testing methodology provided robust comparison between the old and new systems. The multimodal search implementation delivered compelling results across both business and technical metrics.

**Business Metrics**:
- User engagement increased by 2.2%
- EWSR improved by 3.8%
- Search depth grew by 6.5%, indicating users explored results more thoroughly
- Fanout searches (broader queries needed when initial results are insufficient) decreased by 54.2%
- Ad impressions rose by 0.91%

**Technical Metrics**:
Using 6 months of production data, OfferUp evaluated relevance recall for the top k=10 results across high-density and low-density DMAs. The relevance recall formula used was: sum(listing relevance score) / number of retrieved listings, where relevance is binary (1 for relevant, 0 for not relevant). The multimodal search achieved a 27% improvement in relevance recall.

The 54% reduction in geographic spread indicates that users found relevant local results more quickly, which is particularly important for a marketplace focused on local transactions.

## Critical Assessment

While the reported results are impressive, it's worth noting that this case study is published on AWS's official blog, which naturally presents the vendor's services in a favorable light. The technical architecture appears sound and follows established best practices for production ML systems, but independent verification of the specific metrics would strengthen the claims.

The phased rollout strategy, A/B testing methodology, and focus on both business and technical metrics demonstrate a mature approach to ML system deployment. The use of managed services (Bedrock, OpenSearch) reduces operational complexity but also creates vendor lock-in with AWS infrastructure.

The decision to use a k=128 for k-NN search, derived from extensive testing, shows thoughtful optimization balancing result quality against computational cost. The 12-shard, 3-replica index configuration with 24 data nodes represents a substantial infrastructure investment appropriate for a large-scale marketplace search application.