---
title: "Large-Scale Semantic Search Platform for Food Delivery"
slug: "large-scale-semantic-search-platform-for-food-delivery"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694adc4b042ce598d81c50f2"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:47.183Z"
  createdOn: "2025-12-23T18:15:39.785Z"
llmopsTags:
  - "customer-support"
  - "question-answering"
  - "embeddings"
  - "semantic-search"
  - "fine-tuning"
  - "model-optimization"
  - "token-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "reranking"
  - "vector-search"
  - "pytorch"
  - "monitoring"
  - "databases"
  - "scaling"
  - "continuous-deployment"
  - "documentation"
  - "elasticsearch"
  - "hugging-face"
  - "microsoft-azure"
industryTags: "e-commerce"
company: "Uber"
summary: "Uber Eats built a production-grade semantic search platform to improve discovery across restaurants, grocery, and retail items by addressing limitations of traditional lexical search. The solution leverages LLM-based embeddings (using Qwen as the backbone), a two-tower architecture with Matryoshka Representation Learning, and Apache Lucene Plus for indexing. Through careful optimization of ANN parameters, quantization strategies, and embedding dimensions, the team achieved significant cost reductions (34% latency reduction, 17% CPU savings, 50% storage reduction) while maintaining high recall (>0.95). The system features automated biweekly model updates with blue/green deployment, comprehensive validation gates, and serving-time reliability checks to ensure production stability at global scale."
link: "https://www.uber.com/en-GB/blog/evolution-and-scale-of-ubers-delivery-search-platform/?uclick_id=0a73d271-32e7-4b77-9697-a587a4c8d9fe"
year: 2025
seo:
  title: "Uber: Large-Scale Semantic Search Platform for Food Delivery - ZenML LLMOps Database"
  description: "Uber Eats built a production-grade semantic search platform to improve discovery across restaurants, grocery, and retail items by addressing limitations of traditional lexical search. The solution leverages LLM-based embeddings (using Qwen as the backbone), a two-tower architecture with Matryoshka Representation Learning, and Apache Lucene Plus for indexing. Through careful optimization of ANN parameters, quantization strategies, and embedding dimensions, the team achieved significant cost reductions (34% latency reduction, 17% CPU savings, 50% storage reduction) while maintaining high recall (>0.95). The system features automated biweekly model updates with blue/green deployment, comprehensive validation gates, and serving-time reliability checks to ensure production stability at global scale."
  canonical: "https://www.zenml.io/llmops-database/large-scale-semantic-search-platform-for-food-delivery"
  ogTitle: "Uber: Large-Scale Semantic Search Platform for Food Delivery - ZenML LLMOps Database"
  ogDescription: "Uber Eats built a production-grade semantic search platform to improve discovery across restaurants, grocery, and retail items by addressing limitations of traditional lexical search. The solution leverages LLM-based embeddings (using Qwen as the backbone), a two-tower architecture with Matryoshka Representation Learning, and Apache Lucene Plus for indexing. Through careful optimization of ANN parameters, quantization strategies, and embedding dimensions, the team achieved significant cost reductions (34% latency reduction, 17% CPU savings, 50% storage reduction) while maintaining high recall (>0.95). The system features automated biweekly model updates with blue/green deployment, comprehensive validation gates, and serving-time reliability checks to ensure production stability at global scale."
---

## Overview

Uber Eats developed a large-scale semantic search platform to power discovery across their food delivery marketplace, addressing the fundamental limitations of traditional lexical search methods. Search represents a critical conversion funnel for the platform, with a significant portion of orders originating from users typing into the search bar. Traditional lexical matching struggles with real-world query challenges including synonyms, typos, shorthand expressions, multilingual contexts, and ambiguous terms. The platform needed to move beyond simple string matching to understanding user intent across diverse verticals (stores, dishes, grocery items) and languages, at the scale of billions of documents.

The case study presents a comprehensive view of building and operating an LLM-powered semantic search system in production, covering the full lifecycle from model training to deployment automation, cost optimization, and reliability engineering. What distinguishes this implementation is the emphasis on productionization challenges rather than just model performance, showcasing the operational complexities of running LLMs at scale in a business-critical application.

## Technical Architecture

The semantic search system adopts a classic two-tower architecture that decouples query and document embedding calculations. This design choice enables query embeddings to be computed in real-time via an online service while document embeddings are pre-computed in batch via scheduled offline services. The separation is crucial for achieving the latency requirements of a production search system serving billions of documents.

The model uses the Qwen LLM as the backbone embedding layer within both towers. This architectural decision leverages the world knowledge and cross-lingual capabilities that large language models provide. Rather than using the LLM as-is, the team performed fine-tuning using Uber Eats' proprietary in-house data to adapt the embedding space to their specific application scenarios. This demonstrates a pragmatic approach to LLMOps: starting with a powerful foundation model and then specializing it for the production use case. The resulting single embedding model supports content embedding tasks across all Uber Eats verticals (restaurants, grocery, retail) and markets globally.

A key innovation in the architecture is the integration of Matryoshka Representation Learning (MRL) into the training process. The team used an MRL-based infoNCE loss function during training, which enables a single model to output embeddings at various dimensions. This flexibility allows downstream tasks to select the optimal embedding dimension based on their specific quality-versus-size tradeoffs. The training incorporated vector dimensions at [128, 256, 512, 768, 1024, 1280, 1536] with equal weights, providing multiple cut points for different use cases.

## Model Training and Inference Infrastructure

The model development stack leverages PyTorch with Hugging Face Transformers for model development and Ray for distributed training orchestration. Given the substantial size of the Qwen backbone model, the team employs PyTorch's Distributed Data Parallel (DDP) combined with DeepSpeed's ZeRO-3 optimization. This setup shards the optimizer states, gradients, and model parameters across multiple devices, making it feasible to train on the massive Qwen model. The training pipeline incorporates mixed-precision training and gradient accumulation to efficiently process hundreds of millions of data points.

The training workflow produces versioned artifacts with meticulous tracking for reproducibility and deployment. Each successful run generates unique identifiers for the query model, document model, and a shared team-specific ID called the two-tower-embedding-id. This versioning discipline is fundamental to the LLMOps maturity of the system, enabling precise tracking of what models are deployed where and facilitating rollbacks when issues arise.

For offline inference, which is critical given the scale of the document corpus, the team adopted a cost-optimization strategy. Rather than embedding every document individually, they compute embeddings at the feature level (for example, at the store or item level) and then join these embeddings back to the full catalog of billions of candidates before indexing. The resulting embeddings are stored in Uber's feature store tables, keyed by entity IDs, making them readily accessible for both retrieval and ranking models. This approach demonstrates sophisticated thinking about infrastructure costs in LLMOps: the embedding computation is the expensive part, so they minimize redundant work by embedding at the appropriate granularity.

The embeddings are used to build search indexes supported by HNSW (Hierarchical Navigable Small World) graphs. The indexes store both non-quantized (float32) and quantized (int8) vector representations, providing flexibility to optimize for various latency and storage budgets. This dual representation strategy is another production-oriented design decision that balances quality with operational constraints.

## Quality and Cost Optimization

A major emphasis of the case study is on the tradeoffs between retrieval accuracy, infrastructure costs, and query latency. The team conducted controlled experiments varying three key factors to find the optimal balance for production deployment.

The first factor is the search parameter k, which controls the number of nearest neighbors retrieved per shard in ANN search. Through careful statistical analysis of data distribution, the team determined that lowering the shard-level k from 1,200 to around 200 yielded a 34% latency reduction and 17% CPU savings, with negligible impact on recall. This demonstrates that the initial k setting was over-provisioned, and data-driven experimentation revealed opportunities for significant cost savings without quality degradation.

The second optimization lever is quantization strategy. The team compared non-quantized float32 embeddings against compact int7 scalar-quantized representations. The quantization experiments showed that int7 could reduce latency by more than half compared to fp32 while maintaining recall above 0.95. This is a substantial infrastructure win: cutting compute costs in half while preserving high retrieval quality. The case study presents this as a clear validation of quantization for production semantic search, though it's worth noting that the specific recall threshold of 0.95 represents a business-driven quality bar that Uber Eats deemed acceptable.

The third optimization dimension involves embedding dimension selection enabled by Matryoshka Representation Learning. The MRL training approach allows the team to serve smaller embedding cuts at inference time without retraining. In offline evaluation, they observed that 256-dimensional embeddings showed less than 0.3% performance degradation compared to full-size embeddings for English and Spanish, while reducing storage costs by nearly 50%. This validates the MRL approach for production scenarios where storage and bandwidth costs matter significantly at scale.

Beyond these three core optimizations, the vector index is augmented with locale-aware lexical fields and boolean pre-filters including hexagon (geographic region), city_id, doc_type, and fulfillment_types. These pre-filters run before the ANN search and dramatically shrink the candidate set upfront, ensuring low-latency retrieval even against a multi-billion document corpus. This hybrid approach—combining structured filters with semantic search—reflects real-world production requirements where pure semantic search may not suffice.

After the ANN search identifies top-k candidates per vertical, the system optionally applies a lightweight micro-re-ranking step using a compact neural network to further refine results before passing them to downstream rankers. This multi-stage retrieval architecture is characteristic of modern production search systems, where different models operate at different stages with different latency and quality requirements.

## Productionization and Deployment

The operational aspects of the system are where the LLMOps maturity truly shows. Uber's data changes continuously, so the semantic search system runs a scheduled end-to-end workflow that updates both the embedding model and serving index in lockstep on a biweekly cadence. Each run either trains or fetches the target model, generates fresh document embeddings, and builds a new Lucene Plus index without disrupting the live read path.

To enable seamless model refreshes and provide rollback flexibility, the team adopted a blue/green deployment pattern at the index column level. Each index maintains two fixed columns—embedding_blue and embedding_green—with the active model version mapped to one of them via lightweight configuration. During each refresh, a new index snapshot is built containing both columns: the active column is preserved as-is, while the inactive column is repopulated with fresh embeddings. This design provides a safety mechanism to switch between old and new versions when needed without requiring a full index rebuild.

However, this approach introduces a subtle reliability risk: even though only the inactive column should change, the build process re-materializes the active column as well. A bug or bad input could silently corrupt what's currently serving. To protect against this, the team implemented automated validation gates that run before any deployment. These checks block the deployment flow if inputs are incomplete, if the carried-forward active column diverges significantly from the current production index, or if the newly refreshed column underperforms.

The validation pipeline runs three specific checks. First, a completeness check verifies that document counts (and key filtered subsets) in the index match the source tables used to compute embeddings, failing fast on drift or partial ingestion. Second, a backward-compatibility check ensures the unchanged column is byte-for-byte equivalent between the pre-refresh and post-refresh index. Any mismatch terminates the run, preventing accidental corruption of the production column. Third, a correctness check deploys the newly built index to a non-production environment, replays real queries at a controlled rate, and compares recall against the current production index. These checks catch issues like data corruption during indexing, incorrect distance metric settings, or upstream feature regressions before they reach users.

The case study acknowledges an architectural tradeoff: maintaining two separate blue and green indexes would simplify reliability (since the production index wouldn't be touched during refresh), but would significantly increase storage and maintenance costs. Given this tradeoff, the team chose the single-index-with-two-columns approach and invested in robust validation mechanisms to make it safe.

Even with strong build-time and deploy-time checks, the team recognized the risk of human error or configuration bugs, such as a wrong model-to-column mapping or an index built against a different model than expected. To guard against this, they added serving-time reliability checks. The index stores the model ID in its metadata for both columns. On a sample of requests, the service verifies that the model used to generate the query embedding matches the model ID recorded on the active index column. On any mismatch, the system emits a compatibility-error metric and logs full context. If errors remain non-zero over a short time window, an alert fires and the system automatically rolls back the model deployment to the previous version (while the index remains unchanged). This runtime validation adds minimal overhead to the read path while protecting against version mix-ups and configuration mistakes.

## Assessment and Tradeoffs

This case study presents a mature, production-grade approach to operating LLM-based semantic search at scale. The emphasis on operational concerns—cost optimization, automated deployment, validation gates, rollback mechanisms, and monitoring—reflects the realities of running LLMs in business-critical applications. The technical choices demonstrate sound engineering judgment: using a powerful foundation model (Qwen) but fine-tuning it for the specific domain, adopting a two-tower architecture for efficient inference, incorporating MRL for flexible dimensionality, and implementing comprehensive validation at multiple stages.

However, as with any engineering blog from a large tech company, it's important to read the claims with appropriate context. The case study reports impressive cost savings (34% latency reduction, 17% CPU savings, 50% storage reduction) while maintaining high recall, but these numbers come from controlled experiments under specific conditions. The baseline k value of 1,200 seems quite high, suggesting the initial configuration may have been conservative or over-provisioned, making the optimization gains appear larger. The quantization results (int7 cutting latency by more than half while maintaining 0.95 recall) are presented as unqualified successes, but the acceptable recall threshold is a business decision that may vary across applications.

The case study does not extensively discuss model quality in absolute terms—how well the semantic search performs for users compared to the previous lexical system, or what types of queries still fail. The focus is primarily on infrastructure and operations rather than model development or evaluation methodology. There's limited discussion of how the fine-tuning data was collected, labeled, or curated, or what evaluation metrics beyond recall were used to assess the model. The claim that the system "feels smarter, faster, and more intuitive for users around the world" is a qualitative assertion without quantitative backing in terms of user metrics like conversion rates or order completion.

The biweekly refresh cadence for both model and index is presented as a feature, but it also represents a significant operational investment and potential source of instability if not managed carefully. The elaborate validation and rollback mechanisms are necessary precisely because the system is complex and things can go wrong. The blue/green deployment approach with careful byte-level validation of the inactive column reflects lessons learned from production incidents that aren't described in the blog.

The architectural decision to use Qwen as the backbone is interesting but not deeply justified. The case study mentions leveraging "world knowledge and cross-lingual abilities" but doesn't compare against alternatives or explain why Qwen specifically was chosen over other large language models. The fine-tuning process is mentioned but not detailed—how much data, what training methodology, how long it takes, what compute resources it requires.

Overall, this is a valuable case study for practitioners interested in the operational aspects of deploying LLM-based systems at scale. It demonstrates that successful LLMOps requires much more than training a good model—it requires sophisticated infrastructure for serving, comprehensive validation and monitoring, careful cost optimization, and robust deployment processes with safety mechanisms. The emphasis on quantization, dimensionality reduction, and infrastructure optimization reflects the economic realities of running embeddings models at the scale of billions of documents. The automated refresh pipeline with validation gates and runtime consistency checks shows organizational maturity in operating machine learning systems. For teams building similar semantic search systems, this case study provides a useful blueprint for the kinds of infrastructure and operational concerns that matter in production, even if some of the specific performance claims should be taken with appropriate context.