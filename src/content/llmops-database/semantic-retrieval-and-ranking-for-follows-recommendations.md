---
title: "Semantic Retrieval and Ranking for Follows Recommendations"
slug: "semantic-retrieval-and-ranking-for-follows-recommendations"
draft: false
llmopsTags:
  - "classification"
  - "realtime-application"
  - "unstructured-data"
  - "embeddings"
  - "fine-tuning"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "model-optimization"
  - "latency-optimization"
  - "evals"
  - "open-source"
  - "scalability"
industryTags: "tech"
company: "LinkedIn"
summary: "LinkedIn rebuilt its Follows Recommendation system for the MyNetwork tab and Home Feed to address popularity bias, weak discovery of less-known creators, and cold-start recommendations for new members. The production pipeline converts member and creator profile information into narrative prompts, encodes both sides with a shared fine-tuned bi-encoder, and uses the resulting embeddings for offline and online candidate retrieval as well as downstream ranking. It combines embedding-based retrieval with existing graph- and popularity-based generators, using Ray, GPUs, HDFS, FAISS, Proxima, hosted vector search, and task-aware dimensionality reduction. LinkedIn reports statistically significant improvements in follow rate across member segments, with the strongest gains for new members, although the article does not disclose absolute lift, test duration, traffic allocation, or other A/B-test details."
link: "https://www.linkedin.com/blog/engineering/ai/rebuilding-linkedins-follows-recommendations-with-llm-based-semantic-retrieval-and-ranking?utm_source=substack&utm_medium=email"
year: 2026
seo:
  title: "LinkedIn: Semantic Retrieval and Ranking for Follows Recommendations - ZenML LLMOps Database"
  description: "LinkedIn rebuilt its Follows Recommendation system for the MyNetwork tab and Home Feed to address popularity bias, weak discovery of less-known creators, and cold-start recommendations for new members. The production pipeline converts member and creator profile information into narrative prompts, encodes both sides with a shared fine-tuned bi-encoder, and uses the resulting embeddings for offline and online candidate retrieval as well as downstream ranking. It combines embedding-based retrieval with existing graph- and popularity-based generators, using Ray, GPUs, HDFS, FAISS, Proxima, hosted vector search, and task-aware dimensionality reduction. LinkedIn reports statistically significant improvements in follow rate across member segments, with the strongest gains for new members, although the article does not disclose absolute lift, test duration, traffic allocation, or other A/B-test details."
  canonical: "https://www.zenml.io/llmops-database/semantic-retrieval-and-ranking-for-follows-recommendations"
  ogTitle: "LinkedIn: Semantic Retrieval and Ranking for Follows Recommendations - ZenML LLMOps Database"
  ogDescription: "LinkedIn rebuilt its Follows Recommendation system for the MyNetwork tab and Home Feed to address popularity bias, weak discovery of less-known creators, and cold-start recommendations for new members. The production pipeline converts member and creator profile information into narrative prompts, encodes both sides with a shared fine-tuned bi-encoder, and uses the resulting embeddings for offline and online candidate retrieval as well as downstream ranking. It combines embedding-based retrieval with existing graph- and popularity-based generators, using Ray, GPUs, HDFS, FAISS, Proxima, hosted vector search, and task-aware dimensionality reduction. LinkedIn reports statistically significant improvements in follow rate across member segments, with the strongest gains for new members, although the article does not disclose absolute lift, test duration, traffic allocation, or other A/B-test details."
notion:
  pageId: "3d4f8dff-2538-80b2-8738-cec81749d730"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-07T08:08:00.000Z"
  lastEditedTime: "2026-09-07T08:08:00.000Z"
  publishedAt: "2026-09-07T09:27:29Z"
---

## Overview

LinkedIn redesigned the production system that recommends creators for members to follow in the MyNetwork tab and Home Feed. The earlier multi-stage recommender relied heavily on heuristic candidate generation, social-graph signals, and popularity-oriented ranking. That approach could identify obvious popular creators, but it could miss semantically relevant specialists and provided limited personalization for new members with little behavioral history. LinkedIn’s replacement adds an embedding-based retrieval (EBR) source built with a fine-tuned language-model encoder. Member and creator profiles are converted into natural-language prompts, embedded into a shared semantic space, and compared to retrieve candidates by topical relevance. The same representation is also used as an input to the downstream ranking model, which is intended to make scoring more consistent across candidates produced by the new and legacy generators.

The article reports that the redesigned pipeline produced statistically significant follow-rate lifts in production A/B tests across member segments, with the largest gains for new members. These results are presented as LinkedIn’s internal evaluation rather than an independently reproduced study. The source does not provide absolute lift values, confidence intervals, experiment duration, sample sizes, or details of guardrail metrics such as latency, creator concentration, unfollow behavior, or member satisfaction. The claimed improvement is therefore encouraging evidence of production value, but the magnitude and broader effects cannot be assessed from the article alone.

## Problem and system objectives

The recommendation task requires matching two sides of a relationship: a member’s interests and a creator’s expertise or perspective. Profile data includes fields such as headlines, bios, taglines, skills, job titles, companies, locations, and work experience. These fields are incomplete and vary in format and quality. Raw profile text can be redundant, noisy, or insufficiently contextualized, while behavioral features are sparse for new members. The objective was not to replace the whole recommender stack, but to add a semantic understanding layer that could find relevant creators overlooked by popularity and graph-based methods and improve first-session recommendations.

The new EBR generator operates alongside existing graph- and popularity-based candidate sources. This is an important production design choice: legacy generators retain useful behavioral and network signals, while the LLM-derived source supplies semantic recall. Candidates from the different sources are subsequently handled by a common ranking system rather than being treated as inherently comparable only by their retrieval source.

## Profile prompting and encoder training

LinkedIn evaluated templated prompting and narrative prompting for converting semi-structured attributes into encoder inputs. It selected narrative prompts, which express profile information as natural language. According to the case study, this format handles missing fields more naturally, preserves nuanced semantics, aligns with language-model pretraining, and can support latent-interest inference when explicit keywords or tags are absent. The prompts are generated separately for viewers and creators, allowing the system to represent a member’s interests and a creator’s expertise in the same embedding space.

The company selected a mid-sized, instruction-tuned open-source embedding model as its base. The stated selection criteria included task-aware embeddings, multilingual support, competitive retrieval and semantic-similarity benchmark performance, and a balance between quality and GPU inference cost. The base model was then fine-tuned for the follow-prediction task rather than used as a generic semantic encoder.

Training uses a shared-parameter bi-encoder architecture. One encoder processes a viewer prompt and the other processes a creator prompt; because parameters are shared, both sides are mapped into a compatible space. Viewer-creator similarity is calculated with cosine similarity and temperature scaling. Supervised contrastive learning with an InfoNCE loss increases similarity for positive follow pairs and decreases similarity to negative examples in the training batch. This architecture makes large-scale retrieval practical because creator embeddings can be computed and indexed independently from viewer requests.

The training process applies several efficiency techniques. Parameter-efficient fine-tuning uses Low-Rank Adaptation on query, key, value, and dense modules, reducing the number of trainable parameters. Mixed-precision training uses 16-bit representations for speed and memory efficiency while retaining 32-bit computation where numerical stability is important, such as normalization. Gradient checkpointing stores selected activations and recomputes others during backpropagation, reducing memory requirements at the cost of additional computation. These techniques address the cost of adapting a language encoder, but the source does not report training time, GPU consumption, or a comparison against full fine-tuning.

## Offline retrieval pipeline

The offline EBR path supports high-throughput batch generation where interactive latency is not required, such as nightly candidate-pool creation. LinkedIn distributes embedding inference over its GPU cluster with Ray. Workers load the shared fine-tuned encoder, process batches of profile prompts, and compute dense vectors. Ray actors allow GPU memory and model instances to be reused; the article also identifies autoscaling and fault tolerance as important for processing hundreds of millions of records. The normalized embeddings are persisted to HDFS.

Creator embeddings are indexed with FAISS. The eligible creator set is described as under 10 million, and LinkedIn chooses exact K-nearest-neighbor search rather than approximate indexes such as IVFPQ or HNSW. With L2-normalized vectors, FAISS’s inner-product index produces cosine-similarity rankings. Viewer embeddings query the creator index for the top-K results, and candidates with retrieval scores are written to offline storage. Exact search favors precision and avoids approximation error, but its feasibility depends on the stated population size and available compute. The article does not give retrieval latency, index-build duration, GPU or CPU requirements, or the value of K.

## Online retrieval and serving

The online path targets low-latency use cases, especially onboarding. When a new member enters information such as job title, location, or company, an online prompt-generation layer converts those signals into a natural-language viewer prompt. The fine-tuned encoder is deployed on Proxima, LinkedIn’s internal model-hosting infrastructure, to create a normalized viewer embedding at request time. That vector queries a hosted vector-search service containing precomputed creator embeddings, returning the most similar creators in real time.

This split between online viewer encoding and precomputed creator representations reflects a practical serving pattern. Creator embeddings do not need to be recomputed for every request, while newly available onboarding information can affect the viewer representation immediately. It also limits online work to prompt construction, one encoder inference, and vector search. However, the case study does not state the service-level objective, observed tail latency, throughput, embedding refresh cadence, failure behavior, or fallback path when model serving or vector search is unavailable. Those operational details would be necessary to evaluate the production readiness of the design fully.

## Ranking integration and feature management

The embeddings are used beyond retrieval as features in the L2 ranking model. Existing behavioral, categorical, and collaborative-filtering features capture interaction history and network signals, but LinkedIn reports that they are weaker at profession-level alignment, particularly for cold-start members. Supplying the same semantic representations to the ranker helps it interpret LLM-retrieved candidates and candidates from graph or popularity generators more consistently.

Full embeddings are large, reportedly ranging from 1,024 to 4,096 dimensions. Directly storing and serving them could increase memory, feature-transfer cost, inference latency, and the risk that embedding features dominate other signals. LinkedIn addresses this with task-aware supervised projection. Separate lightweight feedforward projection layers reduce member and creator embeddings to dimensions such as 64 or 128 before concatenation with other ranking features. The projection layers are trained jointly with a ranking DNN composed of fully connected layers, ReLU activations, batch normalization, and dropout, using binary cross-entropy for follow probability.

After training, LinkedIn extracts the two projection layers as standalone submodules. This allows lower-dimensional representations to be precomputed and served efficiently online. The approach is operationally attractive because it preserves task-specific information while reducing the serving footprint, but it introduces another artifact that must be versioned and kept compatible with the ranker, source embeddings, feature schema, and candidate-generation model.

## Evaluation, results, and tradeoffs

The stated production evaluation used A/B tests and found statistically significant follow-rate improvements across member segments, with particularly strong gains for new members. The reported outcome supports the hypothesis that semantic matching improves discovery when popularity and historical interaction signals are weak. Running EBR alongside existing generators also limits dependence on a single retrieval strategy and provides a way to add semantic recall without discarding established recommendation infrastructure.

The main tradeoffs are cost, complexity, and representational limitations. Fine-tuned encoder inference, distributed embedding generation, vector indexing, model hosting, projection layers, and multiple refresh paths create a larger operational surface than a popularity-based system. Exact FAISS search avoids approximation but may become less attractive as the creator corpus grows. Narrative prompts can improve contextualization, but their quality depends on profile-field selection and prompt-generation consistency. A bi-encoder is efficient because viewers and creators are encoded independently, yet cosine similarity compresses the interaction into a single vector comparison and may miss fine-grained relationships.

The article identifies two future directions. Richer prompts could incorporate recent content engagement, browsing activity, and connections, capturing current interests rather than only relatively static profile information. Such signals could improve freshness but would increase data-pipeline, privacy, feature-governance, and staleness-management requirements. More expressive matching methods, including late interaction approaches such as ColBERT or multi-vector representations, could capture finer semantic alignment while imposing additional storage and serving costs. Overall, this case demonstrates a production LLMOps pattern in which a fine-tuned embedding model is treated as shared infrastructure for retrieval and ranking, with batch and online inference paths, model-efficiency techniques, vector search, feature compression, and controlled experimentation all contributing to deployment at recommender-system scale.
