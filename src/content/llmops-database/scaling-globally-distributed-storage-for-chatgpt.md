---
title: "Scaling globally distributed storage for ChatGPT"
slug: "scaling-globally-distributed-storage-for-chatgpt"
draft: false
llmopsTags:
  - "data-integration"
  - "realtime-application"
  - "regulatory-compliance"
  - "latency-optimization"
  - "fallback-strategies"
  - "error-handling"
  - "databases"
  - "serverless"
  - "cache"
  - "monitoring"
  - "reliability"
  - "scalability"
  - "orchestration"
  - "openai"
  - "microsoft-azure"
industryTags: "tech"
company: "OpenAI"
summary: "OpenAI scaled Habitat, its online storage platform for ChatGPT and other products, to serve more than 1 billion users across 40 regions and over 500 petabytes of data. The platform evolved from a shared Azure Cosmos DB container to isolated containers and then back to multi-tenancy by default, using hot-key throttling, request-priority QoS, improved serverless partition scaling, integrated Valkey caching, CDC-driven invalidation, and a Rust service layer. OpenAI reports that these changes eliminated recent provisioning and noisy-neighbor incidents, reduced global read p50 latency from approximately 120 ms to 10 ms, and enabled CDC processing at millions of changes per second, although the results depend on close co-engineering with Azure and involve continuing tradeoffs around data placement, consistency, capacity, and operational complexity."
link: "https://openai.com/index/scaling-storage-one-billion-users-part-two/"
year: 2026
seo:
  title: "OpenAI: Scaling globally distributed storage for ChatGPT - ZenML LLMOps Database"
  description: "OpenAI scaled Habitat, its online storage platform for ChatGPT and other products, to serve more than 1 billion users across 40 regions and over 500 petabytes of data. The platform evolved from a shared Azure Cosmos DB container to isolated containers and then back to multi-tenancy by default, using hot-key throttling, request-priority QoS, improved serverless partition scaling, integrated Valkey caching, CDC-driven invalidation, and a Rust service layer. OpenAI reports that these changes eliminated recent provisioning and noisy-neighbor incidents, reduced global read p50 latency from approximately 120 ms to 10 ms, and enabled CDC processing at millions of changes per second, although the results depend on close co-engineering with Azure and involve continuing tradeoffs around data placement, consistency, capacity, and operational complexity."
  canonical: "https://www.zenml.io/llmops-database/scaling-globally-distributed-storage-for-chatgpt"
  ogTitle: "OpenAI: Scaling globally distributed storage for ChatGPT - ZenML LLMOps Database"
  ogDescription: "OpenAI scaled Habitat, its online storage platform for ChatGPT and other products, to serve more than 1 billion users across 40 regions and over 500 petabytes of data. The platform evolved from a shared Azure Cosmos DB container to isolated containers and then back to multi-tenancy by default, using hot-key throttling, request-priority QoS, improved serverless partition scaling, integrated Valkey caching, CDC-driven invalidation, and a Rust service layer. OpenAI reports that these changes eliminated recent provisioning and noisy-neighbor incidents, reduced global read p50 latency from approximately 120 ms to 10 ms, and enabled CDC processing at millions of changes per second, although the results depend on close co-engineering with Azure and involve continuing tradeoffs around data placement, consistency, capacity, and operational complexity."
notion:
  pageId: "403f8dff-2538-8011-8881-c738ddbf2fb4"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-24T08:39:00.000Z"
  lastEditedTime: "2026-10-24T08:39:00.000Z"
  publishedAt: "2026-10-27T13:50:27Z"
---

## Overview

OpenAI built Habitat as a shared online storage platform for ChatGPT and other products. The platform provides millisecond-scale access to application data across roughly 40 geographic regions and is described as serving more than 1 billion users, over 500 petabytes of data, and, in its largest Azure Cosmos DB account, more than 20 million queries per second. Although the source does not describe model training, prompting, inference orchestration, or an LLM evaluation pipeline, Habitat is directly relevant to LLMOps because it is production infrastructure supporting ChatGPT workloads and the state, settings, metadata, and other information that product requests require.

The central operational lesson is that scaling an LLM-backed product is not only a model-serving problem. Storage reliability, partitioning, global latency, change propagation, capacity planning, failover behavior, and developer abstractions can all become production constraints. OpenAI first prioritized reliability for mission-critical traffic, then performance for global users, and finally operational efficiency. It ultimately returned to multi-tenancy by default after finding that extensive single-tenant provisioning created an organizational capacity-planning burden. The reported improvements are substantial, but they are presented as OpenAI’s experience rather than an independently validated benchmark, and the architecture still has important constraints around cloud capacity, replication, consistency, and provider dependency.

## Problem and system evolution

Habitat began as a Python client library and database-backed service and became a centralized storage layer used by many OpenAI product surfaces. A shared database reduced duplicated capacity planning and allowed workloads to benefit from aggregate growth, but it created noisy-neighbor risks. The initial design also exposed logical partition-key selection to clients. Different workloads could therefore select common keys such as `user_id` or `workspace_id`, causing unrelated use cases to share Azure Cosmos DB limits. A hot organization or hot key could consume disproportionate capacity and affect other traffic.

Azure Cosmos DB enforces important limits at the physical-partition level, even when documentation describes limits for logical partition keys. Multiple logical partitions can be colocated on the same physical partition, so a workload that appears to be within its logical-key allowance may still contend with unrelated users. Storage-heavy workloads introduced another failure mode: as physical partitions split because of storage growth, total provisioned throughput was divided across more partitions. Effective throughput per partition could consequently fall even when request rates remained stable. In other words, adding data could reduce the available headroom for an active workload.

OpenAI’s first response was to rely largely on Cosmos DB primitives and its stated partition limits. That was insufficient for the partition-key collisions, noisy neighbors, and storage-driven weak partitions encountered at production scale. The second phase introduced separate backing containers for critical services and a script that synchronized provisioned throughput with the number of physical partitions. This reduced blast radius: failures were more likely to degrade an individual feature or service rather than cause a broad outage.

Single-tenancy nevertheless created a different LLMOps problem. Dedicated containers did not have stable aggregate growth. A new feature could move from approximately 1,000 RU/s during testing to 1 million RU/s at launch, making a container that looked adequately sized during dogfooding suddenly underprovisioned. Product teams had to anticipate launches, pre-scale their containers, and understand traffic growth in detail. Teams sometimes discovered the problem only during launch-day incidents. A central infrastructure team could provide scripts and monitoring, but capacity planning across many product teams did not scale organizationally.

## Multi-tenant architecture and controls

The third phase made a shared container the default again, while adding controls to limit the risks of workload mixing. The design uses hot-key throttling to restrict the hottest keys before they consume all throughput on a physical partition. It also applies request-tiering quality of service: interactive, user-facing requests receive higher priority, while offline operations such as bulk inserts and data extracts are throttled first. This is particularly relevant to production AI systems, where background indexing, analytics, backfills, and data movement must not disrupt interactive product traffic.

OpenAI and Azure also worked on an improved serverless mode. The earlier mode would have addressed storage-driven weak partitions but limited usage to 5,000 RU/s per physical partition and scaled primarily according to storage. The revised mode supported up to 10,000 RU/s per physical partition and introduced RU-usage-based splits alongside storage-based splits. According to OpenAI, this reduced the need for manual container monitoring and scaling. The company reports no provisioning or noisy-neighbor incidents in the months following the change, despite faster product development; the source does not provide a controlled comparison or a longer-term incident dataset.

The approach preserves a narrow Habitat API so product developers do not need to manage Cosmos DB containers, partitions, or regional topology directly. That abstraction improves development velocity, but it moves substantial complexity into the platform team. Habitat must make placement, routing, throttling, caching, data movement, and failure behavior sufficiently transparent and reliable for many different product workloads.

## Reliability and co-managed operations

At OpenAI’s scale, Azure Cosmos DB could no longer be treated as an entirely hands-off managed service. A regional power outage in late 2024 exposed that failover for the largest accounts could take several hours, and the procedure had not been tested at production scale by either organization. During a later failback, a connection stampede overwhelmed the original region’s gateway. The gateway-mode client caused clients to reconnect and send requests to the returning region immediately, even though only some physical partitions had moved back. These events illustrate why a nominally managed database service still requires customer-specific testing when workloads become extreme outliers.

OpenAI and Azure responded with shared incident processes, joint dashboards, direct engineering channels, production-sized non-production testing, SDK iteration, and jointly defined scaling and sizing practices. Reported engineering changes included gateway load protection, caching of Cosmos DB metadata, connection pooling and higher connection reuse in the Python Habitat service, workload colocation, and isolation of critical and offline workloads using separate virtual networks. This is an operational pattern applicable to LLMOps: reliability ownership crosses the boundary between the application platform, cloud service, client SDK, and underlying storage.

The case also demonstrates the importance of testing operational transitions rather than only steady-state throughput. Regional failover and failback, connection behavior, metadata-plane pressure, partition movement, and control-plane scalability can dominate outages even when normal request latency and capacity appear healthy. OpenAI’s account indicates that the most valuable tests were performed at production-like scale, not merely against small development deployments.

## Global latency and caching

Once Habitat became more reliable, latency became the main constraint as OpenAI expanded globally. Compute and storage were often in different regions, making cross-region requests unavoidable. Product teams had compensated with client-side caching, request batching, fewer database operations, and moving work off the critical path. Those techniques improved resilience but made products more complex and undermined Habitat’s goal of hiding database details.

The performance strategy has three layers. First, data is placed near users where cloud capacity and data-residency requirements permit. This is not broadly possible: very large datasets cannot fit proportionally into every region, and scarce power, cooling, or datacenter capacity may need to be allocated either to storage close to users or to serving compute. Placement is therefore both an infrastructure and product tradeoff.

Second, only small, highly latency-sensitive datasets are broadly replicated. Authentication metadata, for example, may be replicated to many or all serving regions. Broad replication is constrained by storage capacity, so it is reserved for selected workloads. Habitat consequently needed a data-movement and routing layer capable of moving datasets between accounts with different replication topologies.

Third, Habitat uses a distributed lookaside cache backed by Valkey servers located near request-processing infrastructure. Rather than relying only on TTLs or application-managed invalidation, the cache consumes Azure Cosmos DB’s change feed. A CDC service propagates invalidations globally within seconds; the next read misses the cache and retrieves the updated value. TTLs and explicit invalidation each have drawbacks involving stale data, partial failures, cross-region races, and replication timing. CDC reduces those risks but introduces its own dependency on reliable change capture and delivery.

OpenAI reports that these changes, together with rewriting the Habitat service layer in Rust to reduce proxy overhead, reduced global read p50 latency from about 120 milliseconds to about 10 milliseconds. Because the source emphasizes median latency, this result should not be interpreted as eliminating tail latency: uncached reads may still cross distant regions and remain materially slower.

## CDC platform and production safeguards

CDC is a platform capability rather than a cache-specific feature. Millions of changes per second across thousands of containers and millions of partitions flow through more than 100 Kafka topics. The streams support cache invalidation, eventually consistent secondary indexes, data-movement pipelines, offline analytics, and other real-time features. Habitat exposes a simpler interface to product developers: clients register a callback for changed rows while the platform handles account discovery, regional readers, worker scaling, leases, Kafka, and consumers.

An internal control plane determines which containers must be captured, selects Cosmos DB regions, and distributes work across workers in multiple geographies. The implementation assumes continuous partial failure. Worker crashes, container problems, lease-store errors, invalid configuration, and destination failures are handled through hardened worker lifecycle management, isolated stream failures, rollout safeguards, and dead-letter queues. Dead-letter queues prevent a permanently failing destination from blocking unrelated records. Regional outages are handled by switching readers to alternate Cosmos DB regions.

At this scale, even the provider SDK became an optimization target. OpenAI modified the Azure CDC SDK’s checkpointing behavior to batch checkpoints in memory and flush them periodically. That can reduce checkpoint overhead, but it also makes recovery and loss-window behavior important operational concerns; the source does not quantify the resulting durability or replay characteristics. More generally, CDC-based cache invalidation provides low staleness rather than strict global consistency, so applications must still tolerate transient misses, reordering, delays, and regional failure scenarios.

## Results, tradeoffs, and outlook

The reported outcome is a shared storage platform with simplified product-team capacity planning, improved workload isolation, no recent provisioning or noisy-neighbor incidents, approximately 12-fold lower read p50 latency, and a CDC system capable of supporting many downstream production consumers. These gains came from combining provider primitives with platform-level policy, caching, prioritization, language optimization, operational controls, and close cloud-provider collaboration.

The tradeoffs remain significant. Multi-tenancy improves utilization and absorbs aggregate growth but requires throttling and QoS to control interference. Dedicated containers provide stronger isolation but shift capacity-planning responsibility to every product team. Replication lowers latency and improves regional availability but consumes scarce storage capacity and complicates movement and consistency. Caching improves median latency but can serve stale data or hide slower uncached paths. A narrow abstraction increases developer velocity while concentrating complexity and failure responsibility in Habitat. Finally, dependence on Azure Cosmos DB means that OpenAI must jointly manage provider-specific limits, SDK behavior, gateways, control planes, and failover procedures.

Looking ahead, OpenAI describes an in-development exabyte-scale online storage system for bulky Habitat data types. It combines Rockset’s RocksDB Cloud core with Raft-based replication, retains the Cosmos DB document model, and uses disaggregated storage and physical replication to reduce flash requirements in exchange for lower peak queries per second. This planned system indicates that the current managed-service architecture may not remain sufficient as conversation storage and user counts grow. For LLMOps, the broader lesson is that model-facing production systems eventually require specialized data infrastructure, but such specialization should follow measured reliability, latency, and scale constraints rather than replace them prematurely.
