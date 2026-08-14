---
title: "Scaling Vector Search Infrastructure with Kubernetes Operators"
slug: "scaling-vector-search-infrastructure-with-kubernetes-operators"
draft: false
llmopsTags:
  - "customer-support"
  - "embeddings"
  - "vector-search"
  - "semantic-search"
  - "model-optimization"
  - "cost-optimization"
  - "kubernetes"
  - "qdrant"
  - "monitoring"
  - "orchestration"
  - "scaling"
  - "devops"
  - "open-source"
  - "reliability"
  - "scalability"
industryTags: "tech"
company: "Hubspot"
summary: "HubSpot built a centralized vector storage and search platform called VAST (Vector as a Service) on top of Qdrant to serve 38+ teams across the organization, managing 20 billion+ vectors across 150 clusters. The platform initially used Helm for deployments but faced significant operational challenges as it scaled, including manual cluster provisioning taking hours and complex stateful operations. To address these limitations, HubSpot migrated to a custom Kubernetes operator pattern that automated cluster lifecycle management, shard balancing, and resource provisioning. This migration reduced cluster spin-up time from hours to minutes, eliminated the need for idle standby clusters, and enabled automatic shard rebalancing that reduced resource usage skew by 65% in production workloads."
link: "https://www.youtube.com/watch?v=46aQff4pxRE"
year: 2026
seo:
  title: "Hubspot: Scaling Vector Search Infrastructure with Kubernetes Operators - ZenML LLMOps Database"
  description: "HubSpot built a centralized vector storage and search platform called VAST (Vector as a Service) on top of Qdrant to serve 38+ teams across the organization, managing 20 billion+ vectors across 150 clusters. The platform initially used Helm for deployments but faced significant operational challenges as it scaled, including manual cluster provisioning taking hours and complex stateful operations. To address these limitations, HubSpot migrated to a custom Kubernetes operator pattern that automated cluster lifecycle management, shard balancing, and resource provisioning. This migration reduced cluster spin-up time from hours to minutes, eliminated the need for idle standby clusters, and enabled automatic shard rebalancing that reduced resource usage skew by 65% in production workloads."
  canonical: "https://www.zenml.io/llmops-database/scaling-vector-search-infrastructure-with-kubernetes-operators"
  ogTitle: "Hubspot: Scaling Vector Search Infrastructure with Kubernetes Operators - ZenML LLMOps Database"
  ogDescription: "HubSpot built a centralized vector storage and search platform called VAST (Vector as a Service) on top of Qdrant to serve 38+ teams across the organization, managing 20 billion+ vectors across 150 clusters. The platform initially used Helm for deployments but faced significant operational challenges as it scaled, including manual cluster provisioning taking hours and complex stateful operations. To address these limitations, HubSpot migrated to a custom Kubernetes operator pattern that automated cluster lifecycle management, shard balancing, and resource provisioning. This migration reduced cluster spin-up time from hours to minutes, eliminated the need for idle standby clusters, and enabled automatic shard rebalancing that reduced resource usage skew by 65% in production workloads."
notion:
  pageId: "3b8f8dff-2538-8064-8931-dcb1504cff9d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T15:07:00.000Z"
  lastEditedTime: "2026-08-10T15:07:00.000Z"
  publishedAt: "2026-08-10T15:24:21Z"
---

HubSpot's VAST (Vector as a Service) platform represents a significant production deployment of vector search infrastructure supporting AI and LLM applications at enterprise scale. The case study provides valuable insights into the operational challenges of running vector databases at scale and demonstrates how custom Kubernetes operators can address the unique lifecycle management requirements of stateful AI infrastructure.

## Platform Overview and Architecture

The VAST platform serves as HubSpot's centralized vector storage and search infrastructure, built on top of Qdrant as the underlying vector database. The platform manages over 20 billion vectors across five geographic regions, serving 38+ teams within HubSpot through a fleet of 150 clusters comprising approximately 2,000 pods. The collection architecture includes 200+ collections, with the largest single collection containing 9.5 billion vectors and an average collection size of 95 million vectors.

The platform provides several key capabilities that are essential for LLMOps in production environments. It offers access control for multi-tenant usage, automated embeddings generation based on collection-specific model settings, evaluation capabilities for comparing performance across different setups and models, and feedback collection mechanisms. These features demonstrate a mature approach to operationalizing vector search for AI applications, addressing not just the storage and retrieval aspects but also the embedding generation pipeline and performance monitoring.

From an architectural perspective, VAST acts as a service layer sitting in front of Qdrant clusters. For read operations, the platform follows a straightforward flow where client requests are validated, embeddings are generated on the fly, and requests are then proxied to the appropriate Qdrant cluster based on the collection being queried. For write operations, the architecture becomes more sophisticated: after validation and embedding generation, data is pushed to Kafka topics, which are then asynchronously consumed by Kafka indexers that ingest data into Qdrant. This asynchronous write pattern serves a critical purpose in production systems by providing traffic control and ensuring that Qdrant remains resilient to traffic spikes, preventing write bursts from overwhelming the vector database infrastructure.

The platform handles substantial traffic volumes, processing approximately 5,000 writes per second across all regions with observed spikes reaching up to 100,000 writes per second. Read traffic averages around 1,000 requests per second across all regions. These traffic patterns highlight the importance of robust infrastructure management and the operational complexity that comes with running vector search at this scale.

## The Helm Era and Operational Challenges

HubSpot's journey began with a proof of concept phase using Helm for cluster management. This initial approach worked well for a limited deployment with fewer than 10 clusters and a small number of consumers. In this setup, clusters were defined as StatefulSets sharing the same Kubernetes namespace, with all clusters in a single deployment region coexisting in a shared namespace. Additional artifacts like Kafka topics and workers were defined in code or created manually. This simplified approach allowed the team to iterate quickly and keep the initial setup straightforward.

However, as the platform grew and the number of use cases expanded, the limitations of Helm became increasingly apparent. While Helm is a powerful templating and deployment tool, its purely declarative nature meant it could not handle the complex stateful operations required for managing vector database infrastructure at scale. The specific limitations that emerged illustrate the operational challenges that arise when deploying AI infrastructure in production environments.

Helm's templating approach lacks the ability to make API calls, which meant that creating or requesting additional artifacts required for cluster setup could not be automated through the deployment process. The tool also provides no native way to implement autoscaling based on metrics, particularly when such scaling needs to be state-aware. Most critically for stateful infrastructure like vector databases, Helm cannot execute custom logic for complex state-aware lifecycle management operations, such as triggering shard rebalancing across healthy pods or ensuring replication factors are preserved during scaling operations.

When considering the specific requirements of Qdrant, these limitations became even more pronounced. Qdrant is an inherently stateful system with shards, replicas, and rebalancing mechanisms that are completely invisible to Helm. In a scaling scenario like reducing from three pods to two, Kubernetes would immediately terminate the excess pod, causing shards to be deleted without any graceful migration. If shard replicas were purged, there was no control loop to maintain the replication factor. When it was necessary to transfer shards before removing a node, Helm had no mechanism to call the Qdrant API to orchestrate this operation.

These technical limitations translated into significant manual operational overhead for the team. Cluster creation could take hours to complete, forcing the team to pre-create clusters ahead of anticipated demand or maintain extra downscaled clusters as standby capacity for potential recovery scenarios. The manual steps required to create a single new cluster illustrate the operational burden: the team had to create Helm charts across all availability zones and environments, manually create Kafka topics for indexers and write-ahead logs, make code changes to register the new cluster in the VAST service, and then merge and deploy those service changes to make the cluster available to consumers.

Horizontal scaling operations were particularly problematic. Scaling down a cluster safely required a custom job combined with manual steps for each operation. To remove a pod, the team had to run a custom job to transfer shards off the pod being decommissioned, execute another custom job to remove the pod from the Raft consensus, manually update the Helm configuration to reflect the lower replica count, deploy that configuration change, and finally delete orphaned persistent volume claims. Scaling up had similar complexity: after updating Helm and increasing replica counts, new pods would start with zero shards, requiring the team to utilize custom jobs to transfer shards to the new pods and ensure proper balance across the cluster.

## Migration to Kubernetes Operators

To address these operational challenges, HubSpot migrated to the Kubernetes operator pattern, leveraging an internal framework that follows this pattern. At its core, the operator pattern involves defining custom resources as objects in the Kubernetes API and implementing controllers that watch these custom resources and programmatically reconcile the desired state with the actual state in the cluster.

The operator architecture comprises three main components, referred to internally as translators. The cluster translator is deployed per deployment region and watches cluster custom resources. It is responsible for constructing and maintaining the namespace and all downstream resources for each cluster. The indexer translator is deployed per cluster namespace and watches indexer custom resources, managing the Kafka resources required for cluster ingestion, including the number of indexer worker pods and their associated topics. The Qdrant nodes translator is also deployed one per cluster namespace, monitoring pod counts and managing all Kubernetes artifacts needed to run the cluster. Critically, this translator also implements custom logic for cluster lifecycle automation, including shard management operations.

This architecture is intentionally extensible. By adding new translators and custom resources, the team can expand support for different automation scenarios without fundamentally restructuring the platform. This extensibility is a key advantage for LLMOps environments where requirements evolve as AI systems mature and new operational patterns emerge.

The migration to operators fundamentally changed how clusters are defined and managed. Instead of templated Helm files, clusters are now defined as custom resource objects. The operators watch these CR definitions, pick up all defined fields, and automatically spin up the entire stack required for each cluster, including the cluster itself and the write path with Kafka indexers.

One of the first major problems solved by the operator approach was automated shard management. When scaling down pods horizontally, the process now involves a simple programmatic change to the custom resource through the Kubernetes API. The translator picks up the change and runs a reconciliation loop that moves shards off decommissioning pods onto remaining pods, cleans up the Raft consensus, removes leftover resources like pods and persistent volume claims, and maintains the shard count against the replication factor. This automated approach eliminates the manual steps and custom job executions that were previously required.

## Production Results and Optimizations

The migration to Kubernetes operators has delivered substantial operational improvements. Cluster spin-up time decreased from hours to minutes, with all necessary artifacts for running a cluster now provisioned behind a single configuration. This improvement provided significant flexibility, eliminating the need for idle standby clusters for disaster recovery since clusters can now be spun up on demand. The operational burden decreased substantially as the platform continued to grow, with new clusters no longer requiring the same level of manual intervention and maintenance.

A concrete production case study demonstrates the value of the automated shard management capabilities. HubSpot operated a cluster with a single collection of BM42 sparse vectors, containing over 3 billion points distributed across more than 30 pods. The cluster had become severely imbalanced by shard count, leading to significant resource usage skew where the most heavily loaded pod was using 1.5 times more RAM than the least loaded pod. This imbalance is inefficient from an infrastructure spend perspective, as it forces provisioning based on peak usage of the hottest pod rather than average usage across the cluster.

The operator was able to automatically transfer shards from pods with excess shards to pods with a deficiency, rebalancing the cluster without manual intervention. After this rebalancing operation, the resource usage skew decreased by 65%, compressing memory usage across pods and improving overall infrastructure efficiency. The monitoring data showed shards becoming evenly distributed and memory usage becoming more uniform across the cluster.

Beyond the operational automation, HubSpot has implemented several cost optimization strategies for their vector search infrastructure. They utilize quantization techniques where applicable, run on-disk options for vectors and payload storage to reduce memory requirements, and use float16 data types for cases where scalar quantization is not applicable. The operator's shard balancing capabilities contribute to cost efficiency by reducing premature scaling that would otherwise be triggered by resource imbalances. Additionally, the team promotes cost visibility per collection to encourage savings from teams using the platform, creating transparency around resource consumption at a granular level.

## Assessment and Future Directions

The case study demonstrates a thoughtful evolution from a simple Helm-based deployment to a sophisticated operator-based approach driven by real operational pain points at scale. The technical decisions reflect a deep understanding of the stateful nature of vector databases and the specific requirements of running such infrastructure in production for AI applications.

However, it is worth noting that this case study focuses primarily on the infrastructure and operational aspects rather than the AI model lifecycle or embedding model management in detail. While the platform provides embeddings generation based on collection model settings, the presentation does not delve into how embedding models are selected, updated, or evaluated across the 200+ collections. The evaluation capabilities mentioned suggest some level of model performance monitoring, but the details of how teams compare different models or how embedding models are versioned and deployed are not fully explored.

The asynchronous write architecture through Kafka is a strong design choice for production resilience, though it introduces eventual consistency considerations that teams using the platform must account for in their applications. The traffic patterns with spikes reaching 100,000 writes per second suggest bursty workloads typical of AI applications processing large batches of data, and the Kafka buffering layer provides essential protection for the vector database layer.

Looking forward, HubSpot has identified several areas for future automation. They plan to implement automated scale-down recommendations to identify clusters or pods that can be safely reduced. They aim to develop automated candidate identification for quantization opportunities, likely using production traffic patterns and accuracy requirements to determine where quantization can be applied without degrading application performance. EBS volume right-sizing is another planned optimization, addressing the storage layer efficiency as data volumes continue to grow.

The extensible operator architecture positions the team well for these future enhancements. As LLMOps practices continue to mature, the ability to add new automation through additional translators provides a clear path for continuous improvement without requiring architectural overhauls. This approach aligns with modern platform engineering principles where infrastructure teams provide self-service capabilities that abstract operational complexity from application teams.

The scale of the deployment, serving 38+ teams across HubSpot with 20 billion+ vectors, demonstrates that this is not a proof of concept but a production-critical platform supporting real AI applications across the organization. The multi-tenant access control and collection-level cost visibility suggest a mature approach to platform governance that becomes increasingly important as AI adoption scales across an organization.

While the presentation positions the operator migration as clearly successful based on the metrics provided, a balanced assessment should note that custom operators introduce their own maintenance burden and require specialized Kubernetes expertise. Teams considering similar approaches should weigh the operational complexity of their vector infrastructure against the development and maintenance costs of custom operators. For smaller deployments, the Helm limitations might be manageable, but HubSpot's scale clearly justified the investment in more sophisticated automation.
