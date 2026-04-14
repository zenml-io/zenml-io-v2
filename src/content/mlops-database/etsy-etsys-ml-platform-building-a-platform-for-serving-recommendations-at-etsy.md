---
title: "Building a Platform for Serving Recommendations at Etsy"
slug: "etsy-etsys-ml-platform-building-a-platform-for-serving-recommendations-at-etsy"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "deployment"
  - "feature-engineering"
  - "serving"
industryTags: "e-commerce"
company: "Etsy"
companySlug: "etsy"
platformName: "Etsy's ML platform"
contentType: "blog"
summary: "Etsy evolved their recommendation serving architecture from a simple batch-based system to a sophisticated real-time platform capable of generating personalized recommendations across a catalog of over 100 million listings. Starting with nightly batch jobs that pre-computed static recommendations stored in a key-value store, they transitioned to an online architecture that could incorporate real-time session data and make ML predictions on demand. To scale this capability across product teams while managing complexity and technical debt, Etsy built a centralized recommendations platform featuring a two-pass ranking system (candidate selection followed by ranking), a registry of reusable ML building blocks, a unified API called the Recs Registry, and internal tooling for browsing, debugging, and monitoring recommendations. This platform approach shifted them from a demand model where a single team handled all recommendation requests to an enablement model where product teams could self-serve recommendations with minimal friction."
link: "https://www.etsy.com/codeascraft/building-a-platform-for-serving-recommendations-at-etsy"
year: 2022
seo:
  title: "Etsy: Building a Platform for Serving Recommendations at Etsy - ZenML MLOps Database"
  description: "Etsy evolved their recommendation serving architecture from a simple batch-based system to a sophisticated real-time platform capable of generating personalized recommendations across a catalog of over 100 million listings. Starting with nightly batch jobs that pre-computed static recommendations stored in a key-value store, they transitioned to an online architecture that could incorporate real-time session data and make ML predictions on demand. To scale this capability across product teams while managing complexity and technical debt, Etsy built a centralized recommendations platform featuring a two-pass ranking system (candidate selection followed by ranking), a registry of reusable ML building blocks, a unified API called the Recs Registry, and internal tooling for browsing, debugging, and monitoring recommendations. This platform approach shifted them from a demand model where a single team handled all recommendation requests to an enablement model where product teams could self-serve recommendations with minimal friction."
  canonical: "https://www.zenml.io/mlops-database/etsy-etsys-ml-platform-building-a-platform-for-serving-recommendations-at-etsy"
  ogTitle: "Etsy: Building a Platform for Serving Recommendations at Etsy - ZenML MLOps Database"
  ogDescription: "Etsy evolved their recommendation serving architecture from a simple batch-based system to a sophisticated real-time platform capable of generating personalized recommendations across a catalog of over 100 million listings. Starting with nightly batch jobs that pre-computed static recommendations stored in a key-value store, they transitioned to an online architecture that could incorporate real-time session data and make ML predictions on demand. To scale this capability across product teams while managing complexity and technical debt, Etsy built a centralized recommendations platform featuring a two-pass ranking system (candidate selection followed by ranking), a registry of reusable ML building blocks, a unified API called the Recs Registry, and internal tooling for browsing, debugging, and monitoring recommendations. This platform approach shifted them from a demand model where a single team handled all recommendation requests to an enablement model where product teams could self-serve recommendations with minimal friction."
mlops:
  source: "sqlite"
  entryId: 127
  sourceUrl: "https://www.etsy.com/codeascraft/building-a-platform-for-serving-recommendations-at-etsy"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061682"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Etsy faced the fundamental challenge of helping buyers discover relevant items within a massive catalog of over 100 million listings. As an e-commerce marketplace connecting buyers with unique handmade and vintage goods, effective recommendations are critical to the user experience and business success. When Etsy initially launched recommendations three years before this 2022 writeup, they adopted a straightforward batch-based approach that quickly revealed its limitations.

The original batch architecture pre-computed recommendations once daily using historical data. While this approach kept serving latency constant and low with minimal complexity, it severely constrained their ability to create dynamic and personalized user experiences. Recommendations couldn't adapt to a user's real-time browsing behavior, respond to their current search context, or take into account their session activity. This was a significant missed opportunity—Etsy envisioned recommendation modules that could guide users through their shopping journey in real-time, adapting as they browsed and showing them increasingly relevant items based on their immediate interests.

The transition to an online architecture introduced new challenges. While it unlocked the ability to incorporate session data and make predictions on demand, it also brought substantial complexity. The team faced two critical problems: maintaining low latency and error rates while scaling to handle production traffic, and keeping APIs simple and consistent as the number of services and use cases proliferated. Each new recommendation use case required bespoke service implementations with complex inputs, creating increasing technical debt and making the system harder to reason about.

As product teams across Etsy became eager to integrate recommendations into their experiences, the Recommendations team found themselves overwhelmed with requests. Operating under a demand model where a single team was responsible for implementing all new recommendation features was not sustainable. This bottleneck, combined with the technical complexity of their online architecture, motivated the shift to building a comprehensive platform that would enable product teams to self-serve recommendations.

## Architecture & Design

Etsy's recommendations platform architecture evolved through three distinct phases, each building on lessons from the previous approach.

**Batch Architecture (Phase 1)**

The initial system was elegantly simple. Nightly batch jobs ran machine learning models over historical data to generate recommendations, which were then stored in a key-value store. The data model was straightforward: given a listing ID as a key, the system would return a pre-ranked set of associated listing IDs as recommendations. This architecture maintained clean separation between ML concerns (model training and inference running in batch) and client concerns (simple lookups from the key-value store). Request-time latency was constant and predictably low since all computation happened offline.

**Online Architecture (Phase 2)**

The online architecture represented a fundamental shift in approach. Instead of pre-computing recommendations in batch, Etsy built services that could accept complex inputs (like search queries, browsing context, or user session data), fetch real-time data about user activity, and make ML predictions on demand. These services could be invoked either synchronously at request time or asynchronously depending on latency requirements.

This architecture enabled powerful new use cases. For example, the system could examine the search query that brought a user to a particular listing and derive meaningful recommendations based on that context. It could track recently viewed items and infer likely next steps—such as recommending mugs to someone who appeared to be shopping for their next favorite coffee cup.

However, this flexibility came at the cost of increased complexity. The clean separation between ML and client concerns was lost. Services needed to orchestrate multiple data fetches, handle failures gracefully, and complete inference within tight latency budgets. The team employed several techniques to manage latency and error rates, including caching, compression, and inference in small concurrent batches. They learned that good tooling and robust observability were essential for operating these services reliably.

**Platform Architecture (Phase 3)**

The platform approach built on the online architecture while addressing its scalability and maintainability challenges. At its core is a central two-pass ranking service that provides a common framework for generating recommendations.

The two-pass approach addresses the fundamental challenge of selecting from 100 million listings within acceptable latency and resource constraints. In the first pass, candidate selection narrows the entire catalog down to a few hundred most relevant items. This might involve techniques like nearest-neighbor search or other retrieval methods that can efficiently identify promising candidates. In the second pass, ranking models order these candidates to determine the optimal recommendations for a specific user at that specific moment, taking into account personalization signals and real-time context.

The platform provides three main categories of building blocks that teams can compose:

- Real-time services for fetching current user activity data (session information, recently viewed items, search context)
- A set of retrieval ML models for candidate selection, including nearest-neighbor indexes and other efficient search structures
- A set of ranking ML models for personalizing and ordering the final recommendations

A key architectural feature is the ability to chain these building blocks together. Chaining enables sophisticated recommendation strategies, such as "find items similar to your recently viewed items" or "recommend items in your favorite categories." This composability allows product teams to create personalized experiences by combining building blocks without requiring custom service implementations.

All recommendations are exposed through a unified API called the Recs Registry, which acts as a catalog of all available recommendation types. This registry provides a single, consistent interface for clients to discover and fetch recommendations, eliminating the API proliferation problem that plagued the earlier online architecture.

## Technical Implementation

Etsy built their recommendations platform using specific technologies and made deliberate infrastructure choices.

The core serving infrastructure is built on top of Etsy's in-house RPC framework, which is based on Finagle, a Scala library for building asynchronous RPC servers and clients. This choice was strategic—Finagle provides powerful abstractions for composing network RPC calls, making it natural to build highly concurrent services that can orchestrate multiple calls to different building blocks. The functional programming patterns in Scala and Finagle's abstractions for handling futures and concurrent operations are well-suited to the kind of service composition the platform requires.

The original batch architecture used a key-value store for serving pre-computed recommendations. While the specific key-value technology isn't mentioned, this approach is common for batch-generated recommendations where lookups need to be fast and the data can tolerate being slightly stale.

For the platform's ML models, the system uses nearest-neighbor indexes for efficient retrieval during the candidate selection phase. These indexes allow the system to quickly find items similar to a given reference (like a listing the user is viewing or items in their browsing history) without exhaustively comparing against all 100 million listings.

To manage the complexity of operating numerous ML models and services, Etsy built several supporting systems. An internal UI allows product teams to browse all available recommendations from the Recs Registry and preview how they would look in different product experiences. This self-service interface reduces friction for teams wanting to experiment with recommendations.

The platform includes dashboards for monitoring and debugging recommendations in production. Engineers can use these dashboards to visualize recommendation performance and adjust hyperparameters as needed without requiring code changes or redeployment. This operational flexibility is critical for maintaining and tuning a large number of recommendation variants.

The chaining mechanism for composing building blocks is implemented within the central ranking service. While the specific implementation details aren't provided, this likely involves defining a composition language or configuration format that specifies how data flows between different building blocks, allowing teams to express recommendation strategies declaratively.

## Scale & Performance

Etsy's recommendations platform operates at substantial scale, though specific quantitative metrics are limited in the writeup.

The catalog size is explicitly stated as more than 100 million listings. Generating personalized recommendations from a corpus of this size presents significant computational challenges. Exhaustively scoring every item for every user at request time would be prohibitively expensive in terms of both latency and computational resources.

The two-pass architecture directly addresses these scale challenges. The candidate selection pass reduces 100 million items to "a few hundred most relevant items," representing a reduction of roughly five orders of magnitude. This winnowing is essential to making the second ranking pass computationally feasible within serving latency constraints.

Latency management was explicitly called out as one of the two key challenges when moving to the online architecture. The team employed several techniques to keep latency low:

- Caching to avoid redundant computation for frequently requested recommendations
- Compression to reduce data transfer overhead between services
- Inference in small concurrent batches to improve throughput while maintaining acceptable latency

The writeup notes that "none of those approaches can scale to the infinite," highlighting the practical limits they encountered. This suggests they hit ceiling on how much these standard techniques could help and needed architectural changes (the platform approach) rather than just optimization.

Error rates were mentioned alongside latency as a critical operational concern. The increased complexity of the online and platform architectures—with multiple services, model calls, and data dependencies—creates more potential failure modes than the simple batch architecture. The team learned that "good tooling and solid observability were essential" for maintaining reliability at scale.

The platform supports multiple product teams simultaneously running experiments and deploying recommendation modules. While the exact number of teams or recommendation variants isn't specified, the shift to an enablement model and the need for a registry to catalog all available recommendations suggests substantial adoption across the organization.

## Trade-offs & Lessons

Etsy's evolution from batch to platform provides several valuable lessons about building ML serving infrastructure at scale.

**Batch vs. Online Trade-offs**

The batch architecture offered undeniable operational simplicity. With pre-computed recommendations and simple key-value lookups, latency was constant and predictable, and the separation of concerns between ML training/inference and serving was clean. However, this simplicity came at the cost of flexibility and freshness. Recommendations could only update daily and couldn't respond to real-time user behavior.

The online architecture inverted this trade-off. It enabled dynamic, personalized experiences that could adapt to user sessions in real-time, but at the cost of substantially increased complexity. Services became harder to build and operate, with more potential failure modes and tighter latency constraints. The team found that optimization techniques like caching and batching helped but had limits, and that operational excellence—good tooling and observability—was non-negotiable.

**Organizational Scaling Through Platforms**

A key insight from Etsy's experience is that technical architecture and organizational model are deeply intertwined. The demand model, where a single Recommendations team implemented all new features, created a bottleneck that limited how quickly the organization could experiment and innovate. No matter how capable the team, they couldn't keep up with demand from product teams across the company.

The platform approach resolved this by shifting to an enablement model. By providing reusable building blocks, a unified API, and self-service tooling, the platform allowed product teams to create and deploy recommendations themselves "with minimal friction." This dramatically increased the organization's capacity for experimentation without proportionally growing the core Recommendations team.

**Reuse vs. Customization**

Etsy explicitly embraces reuse as a guiding principle, stating "if a single ML model can be trained and used for multiple experiments, we encourage re-using over re-building." This reduces waste and ensures that engineering effort goes toward creating new capabilities rather than duplicating existing ones.

However, they also acknowledge that "finding the right model for a given experiment can be hard." The platform addresses this discovery problem through their internal UI that lets teams browse available recommendations and preview them in context. This tooling is critical to making reuse practical—without it, teams might build custom solutions simply because they don't know what already exists.

**Composability as a Core Principle**

The chaining mechanism for composing building blocks emerged as a powerful abstraction. Rather than requiring custom service implementations for each new recommendation strategy, teams can express complex logic by chaining together existing components. This dramatically reduces the code and infrastructure needed to support new use cases while maintaining consistency in the serving architecture.

The choice to build on Finagle was well-aligned with this principle, as Finagle's abstractions for composing RPC calls made implementing the chaining mechanism more natural.

**Observability and Operational Tooling**

As the architecture grew more complex, the importance of operational tooling became increasingly apparent. The dashboards for visualizing recommendation performance and adjusting hyperparameters without code changes provide tight feedback loops for iteration. The monitoring systems for tracking latency and error rates help teams understand system behavior in production.

This investment in operational tooling is part of what makes the enablement model viable. Product teams can self-serve recommendations because they have the visibility and controls needed to understand and tune their recommendations' behavior.

**Future Challenges**

The writeup concludes by acknowledging that platform building is continuous work. Etsy identifies several areas for future development, including generating recommendations directly in the UI (likely referring to client-side inference), enabling more sophisticated experimentation techniques like multi-armed bandits for real-time optimization, and pushing the limits of how much data can be processed during inference to enable even richer personalization signals.

These future directions suggest ongoing tension between the desire for richer, more sophisticated recommendations and the practical constraints of latency, resource efficiency, and system complexity—a tension that will likely drive continued architectural evolution.
