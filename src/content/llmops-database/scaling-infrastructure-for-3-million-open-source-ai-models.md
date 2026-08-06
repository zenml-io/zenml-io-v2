---
title: "Scaling Infrastructure for 3 Million Open-Source AI Models"
slug: "scaling-infrastructure-for-3-million-open-source-ai-models"
draft: false
llmopsTags:
  - "semantic-search"
  - "latency-optimization"
  - "cost-optimization"
  - "kubernetes"
  - "databases"
  - "scaling"
  - "microservices"
  - "open-source"
  - "scalability"
  - "cache"
  - "hugging-face"
  - "amazon-aws"
industryTags: "tech"
company: "Hugging Face"
summary: "Hugging Face needed to scale their model hub infrastructure to support explosive growth from 20,000 to 3 million public models, 1 million datasets, and 14 million users, with over 30% of Fortune 500 companies using their platform. The solution involved architectural redesign centered on MongoDB Atlas with Apache Lucene-based search, denormalized read collections, precomputed tokenization, and multi-node replica sets, combined with Kubernetes-based horizontal pod autoscaling and Cast AI for node-level autoscaling. The results enabled the platform to handle massive traffic spikes during major model releases while maintaining fast search performance with a focus on P99 latency, with plans to implement database sharding for continued horizontal scaling."
link: "https://www.youtube.com/watch?v=lyL5QhgIOxc"
year: 2026
seo:
  title: "Hugging Face: Scaling Infrastructure for 3 Million Open-Source AI Models - ZenML LLMOps Database"
  description: "Hugging Face needed to scale their model hub infrastructure to support explosive growth from 20,000 to 3 million public models, 1 million datasets, and 14 million users, with over 30% of Fortune 500 companies using their platform. The solution involved architectural redesign centered on MongoDB Atlas with Apache Lucene-based search, denormalized read collections, precomputed tokenization, and multi-node replica sets, combined with Kubernetes-based horizontal pod autoscaling and Cast AI for node-level autoscaling. The results enabled the platform to handle massive traffic spikes during major model releases while maintaining fast search performance with a focus on P99 latency, with plans to implement database sharding for continued horizontal scaling."
  canonical: "https://www.zenml.io/llmops-database/scaling-infrastructure-for-3-million-open-source-ai-models"
  ogTitle: "Hugging Face: Scaling Infrastructure for 3 Million Open-Source AI Models - ZenML LLMOps Database"
  ogDescription: "Hugging Face needed to scale their model hub infrastructure to support explosive growth from 20,000 to 3 million public models, 1 million datasets, and 14 million users, with over 30% of Fortune 500 companies using their platform. The solution involved architectural redesign centered on MongoDB Atlas with Apache Lucene-based search, denormalized read collections, precomputed tokenization, and multi-node replica sets, combined with Kubernetes-based horizontal pod autoscaling and Cast AI for node-level autoscaling. The results enabled the platform to handle massive traffic spikes during major model releases while maintaining fast search performance with a focus on P99 latency, with plans to implement database sharding for continued horizontal scaling."
notion:
  pageId: "3abf8dff-2538-8071-ac4a-f1050e3d769d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-28T14:11:00.000Z"
  lastEditedTime: "2026-07-28T14:11:00.000Z"
  publishedAt: "2026-08-06T11:48:56Z"
---

## Overview

Hugging Face has become one of the largest open-source AI model hubs in the world, serving as critical infrastructure for the LLMOps ecosystem. The company faced the challenge of scaling from a modest 20,000 models a few years ago to 3 million public models today, representing a 150x increase in just a few years. This case study describes the architectural decisions, challenges, and technical solutions implemented to maintain platform performance and reliability while supporting 14 million users, 1 million datasets, 50,000 organizations, and more than 30% of Fortune 500 companies as part of their AI workflows.

The fundamental challenge was not just storing this massive volume of models, but making them searchable and accessible with consistently low latency. At small scale, any search approach works reasonably well, but at 3 million models, the same approaches that worked previously would break entirely. The platform needed to deliver instant search results because users simply leave if search is slow. With 14 million users, even 1% experiencing slow search represents 140,000 people affected, making P99 latency metrics far more critical than P50 averages.

## Architectural Overview

The high-level architecture separates concerns between metadata management, binary storage, and compute resources. When users interact with the Hugging Face hub, requests flow from the frontend to the hub API running on Kubernetes. The hub currently uses horizontal pod autoscaler, where new pods scale up automatically during traffic spikes and scale back down when traffic drops, enabling the platform to remain healthy without manual intervention.

The request then goes to MongoDB Atlas, which serves as the source of truth for all metadata. A critical architectural decision is that MongoDB does not store the actual model files themselves. Instead, it stores everything about the models: metadata, user information, repositories, model and dataset information, buckets, spaces information, configuration data, billing data, access control lists, and more. The actual model artifacts, tokenizer files, GGUF assets, and configuration files are stored separately in cloud object storage such as AWS S3.

This separation of concerns allows the platform to scale metadata management independently from binary storage, and compute independently from both. Each component can be optimized individually for its specific workload characteristics, providing flexibility and efficiency that would not be possible with a monolithic storage approach.

## Search Optimization and Tokenization Strategy

The search functionality required significant optimization to handle the scale. Hugging Face implemented an optimized read collection in MongoDB specifically for search and listings, separate from the main repository collection where all data is kept. This denormalized copy is optimized specifically for read operations.

The key innovation is tokenizing model names at insert time rather than query time. When someone publishes a model with a name like "meta-llama/llama-3.1-8b", the system splits this long model name into smaller tokens such as "meta", "llama", "3.1", "8b" and stores them in an array within the MongoDB document. This precomputation strategy means that search queries don't need to perform expensive tokenization operations at query time.

The search functionality leverages Atlas Search, which uses Apache Lucene under the hood, to perform autocomplete matching against these precomputed tokens. When a user types "llama" into the search bar, the system can instantly find matching models. In the past, Hugging Face used the classical MongoDB find method with a regex operator searching in the search tokens array for models matching the query term, then sorting results by a trending score calculated every five minutes based on downloads and likes from the last seven days. While this worked well when the dataset was small, regex-based search doesn't scale well, and as the dataset grew rapidly, latency problems emerged.

The migration to Atlas Search using Apache Lucene addressed these scaling issues. While MongoDB doesn't provide full-text search in the core MongoDB server, it includes an additional process that wraps Apache Lucene. For end users, this is transparent as they still use the unified MongoDB query API. When using an aggregation pipeline with the dollar-sign search operator, MongoDB routes the query to the Apache Lucene index. The query specifies the index name, the field to search (search tokens), and the search term, while still sorting results by trending score. This solution has proven much more efficient and has scaled well, eliminating the latency issues in the search bar.

## Multi-Node Replica Set Architecture

Hugging Face operates a seven-node MongoDB cluster to distribute query load and prevent any single node from becoming a read bottleneck. The architecture follows MongoDB's replica set pattern with strategic read distribution.

All insert, deletion, and update operations go to a single primary node, as only the primary can handle write operations. However, read operations are distributed across multiple secondary nodes. The platform also maintains one analytic hidden node that is invisible to the application layer. The MongoDB driver does not route any production queries to this hidden node, but it still replicates data from the primary. This node is accessed directly for reporting traffic and heavy analytical queries that should not impact production performance.

All secondary nodes continuously tail the operation log from the primary, keeping the cluster in sync. The read distribution strategy is carefully designed: queries that don't require the latest data are routed to secondaries, while only queries requiring strong consistency remain on the primary. Complex aggregation pipelines that scan large amounts of data, perform sorting, grouping, or data transformation are directed to secondaries rather than the primary, as these operations can be resource-intensive. Change streams, which enable real-time reactions to data changes for caching, validation, syncing to different data stores like AWS Redshift, or event-driven workloads, also run on secondaries. All ad-hoc queries, reporting queries, and experimental queries are directed to the hidden replica set member, completely isolated from production traffic.

The guiding principle is simple: the primary should focus exclusively on what only the primary can do, with everything else pushed to different machines. This architecture maximizes throughput while protecting the primary node from being overwhelmed by read-heavy workloads.

## Future Scaling with Sharding

With 14 million users, 3 million models, and continued rapid growth, Hugging Face recognizes that a single MongoDB replica set will eventually be insufficient. The next planned step is implementing sharding for horizontal database scaling.

Sharding means cutting data into pieces and distributing each piece across separate shards. Each shard will have its own replication topology with primary and secondary nodes, so the replication benefits are maintained but multiplied across shards. The key difference from a replica set is that replica sets keep the full dataset on each node, while sharded clusters keep only part of the data on each shard. To scale further, additional shards can be added, and MongoDB's balancer will automatically balance data across all shards.

Implementing sharding requires selecting an appropriate shard key, which is a non-trivial operation requiring careful consideration of query patterns and data distribution. This architectural evolution will enable scaling of CPU, memory, storage, reads, and writes independently as the platform continues to grow.

## Kubernetes-Based Compute Scaling

At the application level, the hub runs on Kubernetes with horizontal pod autoscaling. When CPU or memory thresholds exceed targets, Kubernetes automatically adds new pods to handle the spike, then scales them back down when traffic drops. The hub deployment can scale from 10 to 500 pods depending on traffic patterns. This approach maintains platform health without manual intervention and avoids infrastructure overprovisioning, making it cost-effective.

However, horizontal pod autoscaling faces a limitation: what happens when the autoscaler wants to add new pods but Kubernetes has no free nodes? This is where the second layer of scaling comes in. Hugging Face uses Cast AI for Kubernetes node autoscaling. When pods are pending because there is no capacity and the Kubernetes scheduler cannot schedule them, Cast AI adds new nodes, enabling the scheduler to place those pods. This creates two layers of scaling: deployment-level scaling via horizontal pod autoscaler and infrastructure-level scaling via Cast AI.

The platform plans to migrate from horizontal pod autoscaler to KEDA (Kubernetes Event-Driven Autoscaling). The key difference is that HPA scales only based on CPU and memory metrics, while KEDA scales based on real application metrics like requests per second or event loop utilization. This means scaling is driven by actual workload characteristics rather than just resource utilization. For example, a pod might have low CPU but a high request queue that KEDA can detect and respond to, while HPA would not.

## Production Implications and LLMOps Lessons

This case study provides valuable insights into the infrastructure requirements for serving as a model registry and hub at massive scale. Several key lessons emerge for LLMOps practitioners:

The importance of separating metadata from binary storage cannot be overstated. By storing model metadata in MongoDB while keeping actual model files in object storage like S3, Hugging Face can optimize each storage system for its specific workload. Metadata requires fast querying, indexing, and filtering, while model files require high-throughput sequential access and efficient bandwidth utilization. Trying to handle both in a single system would compromise performance for both use cases.

Precomputation and denormalization for read-heavy workloads are critical optimization strategies. By tokenizing model names at write time and maintaining denormalized read collections, the platform shifts computational cost from the critical query path to the less latency-sensitive write path. In a system where reads vastly outnumber writes, this tradeoff is highly beneficial.

The focus on P99 latency rather than median latency reflects a mature understanding of user experience at scale. When millions of users interact with the platform, the tail latency that a small percentage experience can still represent hundreds of thousands of poor user experiences. Infrastructure decisions must account for these outliers, not just average cases.

The multi-layered autoscaling approach demonstrates how production LLMOps infrastructure must be elastic at multiple levels. Application-level scaling (horizontal pod autoscaling) handles request-level variability, while infrastructure-level scaling (Cast AI node autoscaling) handles capacity planning. The planned migration to KEDA represents an evolution toward even more sophisticated autoscaling driven by application semantics rather than just resource metrics.

The strategy of distributing different query types across different database nodes shows careful workload characterization. By understanding which queries require strong consistency versus eventual consistency, which are heavy versus light, and which are production-critical versus analytical, the architecture can route traffic appropriately to maximize throughput while maintaining performance guarantees where needed.

The platform must handle massive traffic spikes when major models are released. Events like the release of Llama or DeepSeek generate thousands of new models almost instantaneously, and the infrastructure must absorb this load without degradation. This requirement drives many of the architectural decisions around autoscaling, search optimization, and database distribution.

## Challenges and Balanced Assessment

While the presentation focuses on the technical solutions implemented, it's important to note that this represents the perspective of the platform provider. The claims about performance improvements from migrating to Atlas Search are presented without quantitative metrics, making it difficult to assess the magnitude of improvements. Similarly, while the architecture is described as handling the current scale well, specific latency numbers, throughput metrics, or cost efficiency data are not provided.

The planned migration to sharding indicates that current replica set architecture is approaching its limits, suggesting that the platform is in a continuous evolution rather than having reached a stable end-state. The complexity of managing sharded MongoDB clusters, particularly around shard key selection and query routing, will introduce new operational challenges.

The reliance on proprietary services like MongoDB Atlas and Cast AI creates vendor dependencies that may have implications for cost control and operational flexibility. However, these managed services also reduce operational burden compared to self-hosting alternatives.

From an LLMOps perspective, Hugging Face serves as critical infrastructure for the broader ecosystem, providing model hosting, discovery, and distribution capabilities that many organizations rely on. The architectural decisions described here reflect the unique challenges of operating at the intersection of massive-scale data storage, real-time search, and fluctuating demand patterns characteristic of the AI/ML space. The separation of concerns, multi-layered scaling, and focus on read optimization provide a useful reference architecture for others building model registries or similar infrastructure at scale.
