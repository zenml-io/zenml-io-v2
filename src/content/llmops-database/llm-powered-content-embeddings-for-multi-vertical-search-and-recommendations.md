---
title: "LLM-Powered Content Embeddings for Multi-Vertical Search and Recommendations"
slug: "llm-powered-content-embeddings-for-multi-vertical-search-and-recommendations"
draft: false
llmopsTags:
  - "question-answering"
  - "classification"
  - "summarization"
  - "content-moderation"
  - "multi-modality"
  - "embeddings"
  - "semantic-search"
  - "rag"
  - "prompt-engineering"
  - "reranking"
  - "model-optimization"
  - "few-shot"
  - "vector-search"
  - "evals"
  - "agent-based"
  - "pytorch"
  - "tensorflow"
  - "pinecone"
  - "qdrant"
  - "chromadb"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "elasticsearch"
  - "monitoring"
  - "databases"
  - "scaling"
  - "orchestration"
  - "google-gcp"
  - "openai"
  - "meta"
  - "hugging-face"
industryTags: "e-commerce"
company: "Doordash"
summary: "DoorDash addressed longstanding bottlenecks in search and recommendation quality across their food, grocery, retail, and gifting verticals by using LLMs to generate rich, standardized merchant and item profiles at scale, then encoding those profiles with off-the-shelf embedding models. Traditional behavioral embedding approaches failed to capture semantic nuances in transactional, intent-driven sessions with sparse engagement data, while pure content approaches suffered from poor metadata quality. By leveraging LLM-generated profiles combined with carefully selected embedding models (gemini-embedding-001 with 256-dimensional MRL), DoorDash achieved substantial improvements: semantic search reduced null search rates by 3.65% and increased CVR by 0.66%, while generative personalized carousels increased homepage order rate by 2.4% and offline precision improved from 68% to 85%. The content-first embedding strategy proved especially effective for cold-start scenarios, tail queries, and ensuring fairness to small merchants."
link: "https://careersatdoordash.com/blog/doordash-llms-to-build-content-embeddings-for-search-and-recommendations/"
year: 2026
seo:
  title: "Doordash: LLM-Powered Content Embeddings for Multi-Vertical Search and Recommendations - ZenML LLMOps Database"
  description: "DoorDash addressed longstanding bottlenecks in search and recommendation quality across their food, grocery, retail, and gifting verticals by using LLMs to generate rich, standardized merchant and item profiles at scale, then encoding those profiles with off-the-shelf embedding models. Traditional behavioral embedding approaches failed to capture semantic nuances in transactional, intent-driven sessions with sparse engagement data, while pure content approaches suffered from poor metadata quality. By leveraging LLM-generated profiles combined with carefully selected embedding models (gemini-embedding-001 with 256-dimensional MRL), DoorDash achieved substantial improvements: semantic search reduced null search rates by 3.65% and increased CVR by 0.66%, while generative personalized carousels increased homepage order rate by 2.4% and offline precision improved from 68% to 85%. The content-first embedding strategy proved especially effective for cold-start scenarios, tail queries, and ensuring fairness to small merchants."
  canonical: "https://www.zenml.io/llmops-database/llm-powered-content-embeddings-for-multi-vertical-search-and-recommendations"
  ogTitle: "Doordash: LLM-Powered Content Embeddings for Multi-Vertical Search and Recommendations - ZenML LLMOps Database"
  ogDescription: "DoorDash addressed longstanding bottlenecks in search and recommendation quality across their food, grocery, retail, and gifting verticals by using LLMs to generate rich, standardized merchant and item profiles at scale, then encoding those profiles with off-the-shelf embedding models. Traditional behavioral embedding approaches failed to capture semantic nuances in transactional, intent-driven sessions with sparse engagement data, while pure content approaches suffered from poor metadata quality. By leveraging LLM-generated profiles combined with carefully selected embedding models (gemini-embedding-001 with 256-dimensional MRL), DoorDash achieved substantial improvements: semantic search reduced null search rates by 3.65% and increased CVR by 0.66%, while generative personalized carousels increased homepage order rate by 2.4% and offline precision improved from 68% to 85%. The content-first embedding strategy proved especially effective for cold-start scenarios, tail queries, and ensuring fairness to small merchants."
notion:
  pageId: "34df8dff-2538-804b-b37a-c6aea5c0f872"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-25T13:53:00.000Z"
  lastEditedTime: "2026-04-25T13:53:00.000Z"
  publishedAt: "2026-04-26T13:11:08Z"
---

## Overview

DoorDash confronted a persistent challenge in their search and recommendation systems spanning multiple verticals including food delivery, groceries, retail, and gifting. The core problem was that content embedding quality depended heavily on data quality, while personalization depended on embedding quality—creating a circular dependency. Traditional behavioral approaches that relied on co-visitation patterns and engagement signals could not capture the semantic distinctions between items like different types of Chinese cuisine or between a beverage and a grocery staple. Clicks and views proved to be inadequate proxies for true semantic meaning, especially in DoorDash's transactional environment where users order weekly rather than engaging in endless-scroll sessions typical of social platforms.

The company's solution centered on using large language models to generate rich, standardized profiles for merchants and items at scale, then encoding these profiles with carefully selected off-the-shelf embedding models. This content-first strategy, as opposed to pure behavioral approaches, proved particularly well-suited to DoorDash's unique operational context: intentful and brief sessions, catalog dynamics without massive engagement volume, the need for fairness to cold-start items and small merchants, and coverage across data-sparse verticals.

## Technical Architecture and Infrastructure

DoorDash built a comprehensive pipeline for generating and maintaining embeddings at scale using Metaflow for orchestration. The system performs incremental inference, only re-embedding entities when their underlying content changes rather than regenerating the entire corpus daily. The daily ETL process collects order history aggregates, ratings, menu metadata (items, descriptions, categories, prices), and merchant attributes (hours, location, tags). Profile refresh happens when underlying content changes such as menu edits or new items, triggering embedding inference in batch mode. The generated embeddings are then published to persistent storage and indexes for consumption by downstream systems.

The input to the embedding models consists of LLM-generated merchant and item profiles—standardized narratives describing ingredients, preparation methods, cuisine types, dietary attributes, and contextual information. For items with images, the system first generates text descriptions from images using a vision-language model, then combines these descriptions with other metadata to create comprehensive text profiles for embedding. This approach allows the system to leverage text-based embedding models even for visual content while maintaining semantic richness.

## Model Selection and Evaluation Framework

DoorDash conducted rigorous evaluation of multiple embedding model families, including hosted frontier models like OpenAI's text-embedding models and open-source encoders like MiniLM and Qwen. The evaluation framework focused not on finding the theoretically best encoder, but rather the best fit for their operational reality—large-scale offline catalog backfills combined with low-latency online query embedding for approximate nearest neighbor (ANN) searches.

A key design decision was building evaluation datasets without requiring extensive human annotation. The team developed an LLM-as-a-judge harness that produces calibrated judgments for entity similarity and query relevance. This approach decomposed similarity into facet-level comparisons across dimensions like cuisine, preparation, ingredients, and dietary constraints, then aggregated these into overall scores. Separate datasets were constructed for item-to-item and store-to-store evaluation.

The evaluation revealed striking insights about the relative importance of data quality versus model choice. For item-to-item similarity measured by Hit@K metrics, upgrading from MiniLM on raw metadata to gemini-embedding-001 on raw metadata yielded only a 5.92% improvement at Hit@5. However, keeping MiniLM but upgrading to LLM-generated profiles yielded a 31.22% improvement, demonstrating that input representation quality dominates model architecture choice. Combining both upgraded data and upgraded model yielded 37.55%, but the incremental model gain was small relative to the data quality gain.

For store-to-store similarity, the pattern differed slightly. A controlled 2x2 experiment showed that upgrading data alone (MiniLM on LLM profiles) and upgrading the model alone (gemini-embedding-001 on existing store tags) both yielded identical 161% improvements at Hit@5, suggesting data quality and model quality contribute independently and roughly equally for store representations. Combining both yielded 209% improvement.

For query-to-entity retrieval evaluation, measured by nDCG@K, the team stratified queries by frequency tier (head, torso, tail) within submarkets and used the LLM judge to score each query-entity pair. They employed different task types—RETRIEVAL_QUERY for online query embeddings and RETRIEVAL_DOCUMENT for offline entity embeddings—to match production semantics. Based on these comprehensive evaluations and operational constraints around index efficiency, DoorDash selected gemini-embedding-001 with 256-dimensional output leveraging Matryoshka Representation Learning (MRL), using SEMANTIC_SIMILARITY task type for entity-entity comparisons and asymmetric RETRIEVAL_QUERY/RETRIEVAL_DOCUMENT task types for search retrieval.

## Production Applications: Semantic Search

The embeddings power both recommendation and search through two primary modes: entity-to-entity similarity for related items/stores and substitution, and embedding-based retrieval (EBR) where candidates are retrieved directly from embedding indexes using query-entity cosine similarity.

For store-level semantic search, the system embeds queries online and retrieves against offline store/item profile embeddings, enabling one-shot generalization for tail queries without requiring query-level engagement density. This provides semantic recall without behavioral bootstrapping and unified retrieval across verticals. The retrieval objective is formalized as maximizing relevance probability with a temperature-controlled softmax over the candidate set. In production experiments, this approach delivered a 0.0724% lift in 7-day active customer share, reduced null search rate by 3.65%, and increased core search session CVR by 0.66%. The null search rate reduction is particularly significant as it directly addresses the tail-query scenarios where semantic retrieval provides the most value.

An illustrative example showed that for a "Szechuan" query, the treatment group retrieved a diverse set of Chinese stores semantically aligned with the query, while the control group surfaced only a single Sichuan restaurant, demonstrating that semantic embeddings capture cuisine families rather than just keyword matches.

Building on store-level success, DoorDash pushed EBR to the item level and added an LLM-powered reranker to the pipeline. Using item profile embeddings, they layered item-level EBR alongside existing store-level retrieval, then added a fine-tuned Qwen 3 Rerank model that scores candidates by consuming the search query, top-k most relevant item profiles within a store, and the store profile. This upgrade notably improved ranking quality on semantically demanding intents: dish queries increased by 7.8% and cuisine queries by 1.4% measured by nDCG.

The item-level retrieval also enabled image contextualization for search results. Because the system retrieves and ranks individual items per store, it can identify the most query-relevant items and use their images to decorate the store's search result card, making results visually self-explanatory. The item profile text embeddings drive this selection, capturing richer food-domain semantics than pixel-level features like CLIP alone.

## Production Applications: Homepage Discovery and Recommendations

The same embedding infrastructure powers recommendation surfaces on the DoorDash homepage. In co-purchase carousels, SEMANTIC_SIMILARITY embeddings over store profiles with cosine thresholding improved trial merchant visit rate by 0.435% and homepage clicks per impression by 0.110%, producing cleaner cuisine clusters than behavioral embeddings.

The more ambitious application is fully generative personalized carousels. Where co-purchase carousels look backward at ordering patterns, generative carousels look forward by creating personalized discovery themes from scratch. An LLM generates a carousel theme from the consumer profile and context such as time of day, then embeds the theme and retrieves nearest-neighbor stores and representative dishes within the delivery radius. Final ordering uses the existing store ranker, optionally blended with embedding similarity. This approach increased consumer homepage order rate by 2.4% relatively, consumer reorder rate in the previous seven days by 0.164%, and variable profit per order by 0.32%. Offline precision@10 on the homepage improved from 68% to 85%.

This generative pattern connects naturally to emerging research on semantic IDs and generative retrieval, where discrete semantic codes become the language of personalization. Instead of retrieving purely by dense similarity, entities can be discretized into semantic codes and retrieval can proceed by generating identifiers, similar to the TIGER (Transformer Index for GEnerative Recommenders) paradigm.

## Limitations and Lessons Learned

DoorDash candidly acknowledges that LLM profile embeddings are bounded by text-describability. The approach works when everything meaningful about an entity can be expressed in natural language, making it highly effective for items and stores whose identities naturally live in declarative facts like ingredients, preparation methods, flavor profiles, cuisine types, and price points.

However, the approach breaks down for consumer representations. A consumer's identity lives in behavior—the trajectory of choices over time, contextual shifts between different occasions, and latent preferences that resist narration. The text modality doesn't match the information modality. A consumer profile compresses dozens of loosely related preferences into a single vector, averaging away the distinctions that make recommendations useful. Someone who loves both spicy Sichuan and delicate sushi cannot be faithfully represented by an average.

Moreover, even richer aggregations over purchase history—whether mean-pooled embeddings or sequential models—capture what a consumer ordered without encoding why. A consumer's effective representation should vary by situation; the same person ordering lunch near the office (quick, solo, grab-and-go) has fundamentally different intent than when browsing at home for a family meal. This suggests consumer representations ultimately need context-conditioning mechanisms—a base representation from engagement history modulated by situational signals like time, location, and occasion at inference time.

## LLMOps Considerations and Future Directions

The case study demonstrates several important LLMOps principles in production. DoorDash deliberately chose a hybrid strategy: bootstrap high-fidelity content semantics using LLM-generated profiles plus off-the-shelf embedding models, then let downstream systems like retrieval, ranking, and sequence models "bend" the space toward business objectives. This avoids over-investing in custom embedding model training while still capturing domain semantics.

The incremental inference pipeline via Metaflow represents sound MLOps practice for keeping embeddings fresh without wasteful recomputation. The comprehensive evaluation framework using LLM-as-a-judge addresses the annotation bottleneck while maintaining rigor, though the team acknowledges this introduces its own dependencies on LLM quality and calibration.

Future directions include discretizing the profile embedding space into semantic IDs for sequence modeling over intent rather than raw entity IDs, which should improve generalization and cold-start behavior. This connects to generative retrieval where models predict item semantic identifiers token-by-token instead of performing ANN over dense vectors. The retriever-generator architecture already visible in generative carousels could be pushed further, framing recommendations as "generate hypothetical search queries, then retrieve" for more interpretable and controllable personalization.

Finally, DoorDash sees an opportunity to close the loop by making LLM profiles and embeddings part of a continuously improving system rather than a one-time enrichment. This would involve LLMs generating or refining profiles, retrieving grounding evidence like menus, reviews, and knowledge-graph facts via RAG patterns to keep generation faithful, and incorporating lightweight feedback when the system observes mismatches like user skips or reformulations. This would turn profiles into living representations that adapt to changing menus and shifting tastes.

The case demonstrates mature thinking about the appropriate role of LLMs in production recommender systems—using them where they provide clear value (semantic profile generation, embedding of declarative content, theme generation) while acknowledging limitations (consumer behavior modeling, temporal intent dynamics) and maintaining hybrid architectures that combine learned and generated components.
