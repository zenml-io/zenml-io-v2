---
title: "Distilling LLM Understanding into Marketplace Discovery"
slug: "distilling-llm-understanding-into-marketplace-discovery"
draft: false
llmopsTags:
  - "classification"
  - "structured-output"
  - "embeddings"
  - "fine-tuning"
  - "semantic-search"
  - "vector-search"
  - "knowledge-distillation"
  - "memory"
  - "human-in-the-loop"
  - "fallback-strategies"
  - "evals"
industryTags: "e-commerce"
company: "DoorDash"
summary: "DoorDash uses LLMs to improve marketplace search, retrieval, ranking, personalization, and merchandising across restaurants, grocery, retail, pets, and other categories. Rather than placing an LLM directly in the latency-sensitive serving path, DoorDash uses stronger models offline to generate graded relevance labels, semantic catalog identifiers, user memory representations, and steerable collection content, then distills these outputs into retrieval, ranking, and recommendation systems. Reported results include a 2.3% improvement in relevance NDCG, a 4–5% improvement in ranker MRR, and early pet-category gains of nearly 1% in order rate and 6% in active users, although the presentation does not provide experimental details sufficient to independently assess attribution, statistical significance, or performance across all surfaces."
link: "https://www.youtube.com/watch?v=ACPEpji5NV4"
year: 2026
seo:
  title: "DoorDash: Distilling LLM Understanding into Marketplace Discovery - ZenML LLMOps Database"
  description: "DoorDash uses LLMs to improve marketplace search, retrieval, ranking, personalization, and merchandising across restaurants, grocery, retail, pets, and other categories. Rather than placing an LLM directly in the latency-sensitive serving path, DoorDash uses stronger models offline to generate graded relevance labels, semantic catalog identifiers, user memory representations, and steerable collection content, then distills these outputs into retrieval, ranking, and recommendation systems. Reported results include a 2.3% improvement in relevance NDCG, a 4–5% improvement in ranker MRR, and early pet-category gains of nearly 1% in order rate and 6% in active users, although the presentation does not provide experimental details sufficient to independently assess attribution, statistical significance, or performance across all surfaces."
  canonical: "https://www.zenml.io/llmops-database/distilling-llm-understanding-into-marketplace-discovery"
  ogTitle: "DoorDash: Distilling LLM Understanding into Marketplace Discovery - ZenML LLMOps Database"
  ogDescription: "DoorDash uses LLMs to improve marketplace search, retrieval, ranking, personalization, and merchandising across restaurants, grocery, retail, pets, and other categories. Rather than placing an LLM directly in the latency-sensitive serving path, DoorDash uses stronger models offline to generate graded relevance labels, semantic catalog identifiers, user memory representations, and steerable collection content, then distills these outputs into retrieval, ranking, and recommendation systems. Reported results include a 2.3% improvement in relevance NDCG, a 4–5% improvement in ranker MRR, and early pet-category gains of nearly 1% in order rate and 6% in active users, although the presentation does not provide experimental details sufficient to independently assess attribution, statistical significance, or performance across all surfaces."
notion:
  pageId: "3f4f8dff-2538-80e0-a8d8-d709de3a13e9"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:26:00.000Z"
  lastEditedTime: "2026-10-09T08:45:00.000Z"
  publishedAt: "2026-10-11T09:46:11Z"
---

## Overview

DoorDash is applying large language models to marketplace discovery across restaurants, grocery, retail, pets, gifting, and other shopping categories. The central problem is semantic understanding: determining what a shopper intends, which products satisfy explicit constraints, which products are acceptable substitutes or complements, and how a multi-session shopping mission should influence discovery. Traditional engagement optimization can over-rank popular products that do not satisfy the query—for example, regular spaghetti for a gluten-free pasta search—because clicks, conversions, price, promotions, position, and prior model decisions are imperfect proxies for relevance.

The production strategy is not to replace DoorDash's retrieval and ranking stack with an online LLM. Instead, stronger LLMs are used offline to create reusable supervision and representations. DoorDash then distills that reasoning into lightweight labelers, two-tower retrieval models, ranking towers, semantic catalog identifiers, user-memory features, and controlled content-generation workflows. This architecture keeps online serving compatible with existing latency and scale requirements while allowing LLM-derived semantic signals to influence retrieval, ranking, query reformulation, personalization, and collection generation.

## Problem and Design Principles

DoorDash describes discovery as a journey rather than an isolated query. A shopper who searches for puppy food after adopting a dog may later need a crate, leash, training pads, and other complementary products over several sessions and days. Supporting this journey requires shared representations that connect query intent, item meaning, catalog structure, user preferences, and generated merchandising content across multiple models.

Four primitives organize the approach: LLM-based supervision, semantic catalog identifiers, semantic personalization through user memory, and steerable content generation. They provide common inputs for both conventional machine-learning systems and language-model-based components. The approach also separates reasoning quality from serving efficiency: expensive reasoning is performed selectively during dataset construction or batch generation, while compact models and existing ranking infrastructure handle most production traffic.

## LLM-Generated Supervision for Retrieval and Ranking

Behavioral data is plentiful but confounded. Engagement signals can reflect exposure, position, pricing, promotions, and earlier ranking choices, and therefore do not reliably indicate whether an item satisfies a shopper's intent. Human annotation provides a more direct relevance signal but is expensive, slow, and vulnerable to becoming stale as the catalog changes. DoorDash uses LLMs as a scalable reasoning signal to supplement both sources.

The pipeline begins with human-constructed ground truth: a high-quality seed set of query-item pairs labeled on a three-level relevance scale from 0 to 2. Suspicious disagreements are audited. For example, an item marked irrelevant by a human but performing strongly on add-to-cart or conversion may be sent to a stronger LLM with more granular prompts for reevaluation. Outputs are also reconciled with other models, such as query-to-taxonomy or category models. If a query maps to valid categories and an item belongs to one of those categories, that evidence can influence label adjustment.

After this quality-control process, DoorDash fine-tunes a lightweight model, described as an example of GPT-4o mini, on the high-precision golden set. The resulting labeler is run offline across the broader catalog to produce graded query-item pairs. These labels become a shared target for retrieval and ranking rather than remaining isolated in an annotation system. This is an important LLMOps pattern: use stronger models and human review where ambiguity is concentrated, then distill the resulting judgments into a cheaper, repeatable model for large-scale batch inference.

## Retrieval and Ranking Architecture

For retrieval, DoorDash uses a two-stage contrastive-learning process based on the graded relevance labels. The first stage uses two-tower encoders and a multi-level supervised contrastive loss to shape the global embedding geometry. The initial model is then used to mine hard negatives: items ranked too highly despite poor relevance, or strong positives ranked too low. These examples are relabeled and used in a second curriculum-training stage. The goal is to separate exact matches, reasonable substitutes, complements, and merely related products, distinctions that standard embeddings may blur at e-commerce scale.

DoorDash reports a 2.3% improvement in relevance NDCG from this retrieval work. The same general strategy is applied to ranking models, where LLM-derived relevance labels are distilled alongside engagement objectives. A separate ordinal relevance tower predicts the probability of each relevance level, while existing towers model signals such as clicks, add-to-cart events, and conversions. Shared lower layers allow semantic and engagement objectives to learn jointly, and a value function can tune their blend for different product surfaces.

This design preserves business and system controls. Relevance is not assumed to be the only objective: a highly relevant product may still need to be balanced against availability, conversion likelihood, or other marketplace goals. At the same time, the system is less dependent on engagement as a proxy for semantic fit. The reported results are promising, but the available description does not specify traffic allocation, confidence intervals, baseline definitions, or whether the metrics are offline, online, or both; those omissions limit how broadly the gains can be generalized.

## Semantic Catalog Representation

DoorDash operates a large and rapidly changing catalog, described as reaching billions of store-item-level entries across international markets. Store identifiers provide identity but little meaning, while a human-curated taxonomy can be too coarse or rigid. For instance, a generic hot-sauce category does not necessarily encode the relationships among Mexican, Caribbean, and Korean varieties or the connections among products in a broader shopping mission.

Semantic IDs provide a learned, hierarchical representation. Each item receives a short code whose early tokens identify broad neighborhoods and later tokens capture finer distinctions. Related products can share prefixes while diverging at more specific levels. The representation is learned from data rather than relying exclusively on manual labels, and it can be used by downstream retrieval, ranking, query, and language-model components.

The claimed operational benefits include cross-category relationships, cold-start support for newly added items, and improved tail coverage. New or sparse products can inherit signal from semantically related items instead of waiting for substantial exposure. The identifiers can also support catalog audits by comparing learned semantic structure with human taxonomy labels. DoorDash reports a 4–5% improvement in ranker MRR associated with semantic IDs and describes additional gains in query reformulation. Queries such as “sriracha” can be connected to nearby concepts such as garlic chili sauce or sambal when those relationships are grounded in available catalog inventory, avoiding suggestions that cannot lead to a purchase.

## Semantic Personalization and User Memory

DoorDash supplements conventional user embeddings with explicit, inspectable memory representations. The motivation is that latent embeddings may capture useful preferences but do not directly express why a shopper has a particular intent, and language models cannot automatically consume arbitrary production embeddings without additional training. User memory is organized across three time scales: long-term preferences inferred from orders, searches, browsing, and support interactions; real-time session context such as the active search and cart state; and stated preferences or constraints supplied through agentic interactions such as Ask DoorDash.

Memory blocks are extensible across dimensions including dietary preferences, dining preferences, and substitution preferences. Each block can be materialized in several forms: compact human-readable text, embedding vectors for retrieval and ranking, and graph or hierarchical relationships linking consumers to brands, taxonomy concepts, and inferred preferences. Composite memory objects can therefore be consumed by both conventional models and LLM-based components without requiring every downstream system to reinterpret raw behavioral history.

Context graphs are especially suited to sparse, multi-hop shopping journeys. They connect consumers with extracted concepts and can expose relationships at finer taxonomy levels than existing representations. DoorDash reports that graph-based embeddings outperform its existing taxonomy-based embeddings for retrieval, and uses the memory framework in personalized collections, agentic personalization, and retrieval and ranking features. The description does not quantify the graph-based retrieval improvement, so its relative impact cannot be compared directly with the reported NDCG or MRR figures.

## Steerable Content Generation

The final primitive is controlled generation for merchandising surfaces. Semantic IDs, memory blocks, and graded relevance signals feed a mixture of LLMs, smaller language models, and traditional models. These systems produce outputs such as ranked semantic-ID lists, carousel titles, subtitles, and item selections.

Personalized collections on store pages were historically based on fixed libraries or simple attributes. DoorDash extends them with an offline LLM process that combines consumer memory, semantic IDs, and catalog information to synthesize collection titles, subtitles, and candidate items. Because the generated content is produced in batch, existing retrieval and ranking components remain responsible for item hydration and collection ranking. This limits online LLM latency and provides a practical separation between creative or semantic generation and transactional product selection.

The system is intended to react to occasions and current context: a shopper with a plant-based affinity may receive a plant-based pantry collection, a cat-only household may see cat-food products, and a pantry-restocking session may bias toward staple items. DoorDash reports early pet-vertical results of nearly a 1% increase in order rate and 6% in active users. These figures are presented as early tests, but the implementation details do not establish whether the improvements came solely from LLM-generated collections or from associated ranking and personalization changes.

## Evaluation and Tradeoffs

The case demonstrates a production-oriented LLMOps pattern built around offline inference, distillation, shared representations, and conventional online serving. Evaluation includes human relevance labels, audits of anomalous cases, reconciliation with taxonomy models, retrieval metrics such as NDCG, ranking metrics such as MRR, and business measures including conversion, order rate, and active users. Hard-negative mining provides an iterative feedback loop in which model errors become training data for the next retrieval stage.

There are meaningful tradeoffs. LLM-generated labels can encode systematic errors or prompt sensitivity, so human seed quality, stronger-model review, taxonomy reconciliation, and ongoing audits are important safeguards. Catalog drift can make offline labels and semantic IDs stale, requiring repeated batch processing and monitoring. Multi-objective ranking also creates calibration and governance questions because semantic relevance, engagement, commercial value, and user constraints may conflict. Generated collection text requires validation for factuality, policy compliance, and inventory grounding, while generated item selections must remain tied to available catalog entities.

The architecture reduces serving cost and latency compared with making an LLM call for every search or recommendation request, and it allows DoorDash to reuse the same artifacts across multiple surfaces. Its principal limitation is that the LLM is mostly an indirect source of capability: improvements depend on the quality of distilled labels and representations, the behavior of downstream models, and the freshness of batch pipelines. The reported metrics indicate substantial potential, but a full production assessment would also require details on latency, infrastructure cost, refresh frequency, failure rates, online experiment design, segment-level effects, and safeguards against harmful or irrelevant personalization.
