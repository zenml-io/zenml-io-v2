---
title: "Real-time Question-Answering System with Two-Stage LLM Architecture for Sales Content Recommendations"
slug: "real-time-question-answering-system-with-two-stage-llm-architecture-for-sales-content-recommendations"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3e58a8900b0868fa4fc3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:36:04.490Z"
  createdOn: "2024-11-21T14:06:16.237Z"
llmopsTags:
  - "cache"
  - "content-moderation"
  - "devops"
  - "embeddings"
  - "latency-optimization"
  - "microservices"
  - "microsoft-azure"
  - "monitoring"
  - "prompt-engineering"
  - "question-answering"
  - "realtime-application"
  - "reliability"
  - "reranking"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "serverless"
industryTags: "tech"
company: "Microsoft"
summary: "Microsoft developed a real-time question-answering system for their MSX Sales Copilot to help sellers quickly find and share relevant sales content from their Seismic repository. The solution uses a two-stage architecture combining bi-encoder retrieval with cross-encoder re-ranking, operating on document metadata since direct content access wasn't available. The system was successfully deployed in production with strict latency requirements (few seconds response time) and received positive feedback from sellers with relevancy ratings of 3.7/5."
link: "https://arxiv.org/html/2401.04732v1"
year: 2024
seo:
  title: "Microsoft: Real-time Question-Answering System with Two-Stage LLM Architecture for Sales Content Recommendations - ZenML LLMOps Database"
  description: "Microsoft developed a real-time question-answering system for their MSX Sales Copilot to help sellers quickly find and share relevant sales content from their Seismic repository. The solution uses a two-stage architecture combining bi-encoder retrieval with cross-encoder re-ranking, operating on document metadata since direct content access wasn't available. The system was successfully deployed in production with strict latency requirements (few seconds response time) and received positive feedback from sellers with relevancy ratings of 3.7/5."
  canonical: "https://www.zenml.io/llmops-database/real-time-question-answering-system-with-two-stage-llm-architecture-for-sales-content-recommendations"
  ogTitle: "Microsoft: Real-time Question-Answering System with Two-Stage LLM Architecture for Sales Content Recommendations - ZenML LLMOps Database"
  ogDescription: "Microsoft developed a real-time question-answering system for their MSX Sales Copilot to help sellers quickly find and share relevant sales content from their Seismic repository. The solution uses a two-stage architecture combining bi-encoder retrieval with cross-encoder re-ranking, operating on document metadata since direct content access wasn't available. The system was successfully deployed in production with strict latency requirements (few seconds response time) and received positive feedback from sellers with relevancy ratings of 3.7/5."
---

## Overview

This case study describes Microsoft's internal deployment of a content recommendation system integrated into their MSX Sales Copilot, which is a customized version of Dynamics 365 CRM used daily by Microsoft sellers. The system was launched in July 2023 as one of the first machine learning-based "skills" in the MSX Copilot platform. The fundamental problem being solved is enabling sellers to quickly find relevant technical documentation from the Seismic content repository during live customer calls or meeting preparation, replacing a previously sub-optimal filter-based search system hosted externally.

The case study is notable for its pragmatic approach to a common real-world constraint: the team did not have programmatic access to the actual content of documents, only their metadata. This forced an innovative solution using metadata prompt engineering to create embeddings that could be matched against seller queries.

## Technical Architecture

The system employs a two-stage architecture that balances retrieval speed with ranking accuracy:

### Stage 1: Bi-Encoder Document Retrieval

The first stage uses a DistilBERT model pre-trained on the MS MARCO dataset to generate embeddings. This architecture processes the query and document prompts independently through the same encoder, then computes cosine similarity between them. The key advantage is that document embeddings can be pre-computed offline and cached, making real-time inference fast. The bi-encoder retrieves the top-100 candidate documents based on cosine similarity with the query embedding.

The limitation of this approach is that it neglects cross-interaction between query and document, which can miss nuanced relevance signals. However, the speed benefit is significant for the initial filtering stage.

### Stage 2: Cross-Encoder Re-Ranking

The second stage uses a MS MARCO MiniLM cross-encoder model that processes query-document pairs together, enabling attention mechanisms between them. This produces more accurate relevance scores at the cost of higher latency. The cross-encoder cannot operate offline since the query is not known in advance.

The team experimented with different values for K (the number of candidates passed to the re-ranker) and found K=100 to be optimal, balancing latency against recall. Too few candidates (K≲20) provided insufficient diversity, while too many (K≳200) created unacceptable latency.

## Metadata Prompt Engineering

Since document content was unavailable, the team developed an elaborate prompt engineering approach to transform document metadata into natural language descriptions suitable for embedding. Each document is characterized by approximately 20 metadata features (both categorical and numerical).

For categorical features, the feature name and value are concatenated directly. For numerical features, the team introduced a mapping function that converts raw numbers into categorical labels (high, medium, low, zero) based on percentile thresholds (85th and 65th percentiles). This transformation allows numerical engagement metrics like "number of views" to be incorporated into the textual prompts.

The final prompt for each document is created by concatenating all feature-value pairs into a single English-formed sentence. This approach effectively lifts the problem back to asymmetric semantic search territory, where short queries are matched against longer document descriptions.

## Deployment and Infrastructure

The model is deployed as an Azure Machine Learning (AML) endpoint for real-time inference. Integration with the MSX Copilot uses Microsoft's Semantic Kernel SDK, which provides a planner to route queries to appropriate skills based on context. When the planner determines that a content recommendation is needed, it invokes the AML endpoint, which processes the query through both stages and returns the top-5 most relevant documents.

The system operates on a weekly refresh cycle to accommodate changes in document metadata from the Seismic catalog.

## Latency Optimization

The team conducted extensive latency testing across three Azure VM configurations:
- Standard F4s v2 (4 cores, 8GB RAM) - CPU only
- Standard DS4 v2 (8 cores, 28GB RAM) - CPU only  
- Standard NV12s v3 (12 cores, 112GB RAM, 1 NVIDIA Tesla M60 GPU)

The cross-encoder batch size parameter proved critical for latency optimization. Testing showed that batch sizes of 2 or 4 provided the best latency characteristics. With b=2, the GPU-enabled VM achieved median latency of 0.54 seconds, while the DS4 v2 CPU machine achieved 1.49 seconds. As expected, GPU inference was significantly faster than CPU-only machines.

The entire end-to-end process (including Semantic Kernel planner overhead) takes "a few seconds," with the majority of time spent by the planner rather than the model inference itself.

## Evaluation Approach

The team faced a common challenge in recommendation systems: lack of labeled ground truth data for metrics like NDCG. They addressed this through:

### Human Annotation Study
Four human domain experts rated the top-5 results for 31 evaluation queries on a 0-5 scale (where 5 means all results are relevant). Results showed:
- 15/31 queries rated as "relevant" (scores 3.5-5)
- 9/31 queries rated as "somewhat relevant" (scores 2-3.5)
- 7/31 queries rated as "not relevant" (scores 0-2)

Annotators noted that "not relevant" queries tended to be too verbose or generic. Individual annotator averages ranged from 2.74 to 3.26, indicating consistent evaluation without significant bias.

### Ablation Studies
The team validated the two-stage architecture against a single-stage retriever-only baseline. Human experts confirmed that 90% of queries received more relevant recommendations using the full architecture. A specific example showed the value of re-ranking: when a query requested PDF-format documents, the retriever returned only 2 PDFs in its top-5, while the cross-encoder successfully re-ranked candidates to return all 5 documents in the correct format.

The ablation study also validated the inclusion of numerical features through the categorical mapping function, with annotators confirming that queries asking for documents with "high" engagement metrics were better served by the full system.

## Production Feedback

Initial production feedback after two months was encouraging:
- Task relevance rating: 4 out of 5
- Document relevancy rating: 3.7 out of 5

Sellers reported the new system as a "tremendous improvement" over the previous filter-based external search, particularly valuing the integration directly into the MSX interface rather than requiring navigation to the Seismic website.

## Limitations and Future Work

The case study acknowledges several limitations:
- Dependence on metadata alone limits recommendation quality compared to content-aware systems
- The MS MARCO model's 512-token context length constrains the number and detail of features that can be included
- Lack of ground truth labels prevents use of supervised metrics like nDCG

Future plans include:
- Incorporating actual document content (text and images) once programmatic access is available
- Adding seller-specific context and opportunity information to personalize recommendations
- Collecting user feedback as proxied labeled data to enable supervised learning approaches
- Handling multi-modal features (text, images, audio) from diverse document formats (PowerPoint, PDF, Word)

## Key LLMOps Insights

This case study demonstrates several practical LLMOps patterns:

The use of pre-trained models (DistilBERT, MiniLM) from the Sentence Transformers ecosystem shows how publicly available models can be deployed effectively without fine-tuning. The team leveraged models specifically trained on MS MARCO for asymmetric question-answering scenarios.

The offline pre-computation of document embeddings is a critical optimization pattern for production systems, reducing inference-time compute to only query embedding and similarity computation for the first stage.

The batch size tuning for the cross-encoder highlights the importance of inference-time hyperparameter optimization, which differs from traditional ML training-focused tuning.

The weekly refresh cycle for document metadata shows a pragmatic approach to keeping the system current without requiring real-time document updates.

Finally, the integration via Semantic Kernel demonstrates how ML services can be composed into larger AI applications through skill-based architectures, where a planner routes queries to appropriate specialized systems.