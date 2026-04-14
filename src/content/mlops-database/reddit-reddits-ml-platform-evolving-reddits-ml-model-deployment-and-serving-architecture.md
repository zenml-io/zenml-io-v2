---
title: "Evolving Reddit’s ML Model Deployment and Serving Architecture"
slug: "reddit-reddits-ml-platform-evolving-reddits-ml-model-deployment-and-serving-architecture"
draft: false
mlopsTags:
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "docker"
  - "kubernetes"
  - "terraform"
  - "deployment"
  - "feature-engineering"
  - "serving"
industryTags: "media-entertainment"
company: "Reddit"
companySlug: "reddit"
platformName: "Reddit's ML platform"
contentType: "blog"
summary: "Reddit redesigned their ML model deployment and serving architecture to address critical scaling limitations in their legacy Minsky/Gazette monolithic system that served thousands of inference requests per second for personalization across feeds, video, notifications, and email. The legacy system embedded all ML models within a single Python thrift service running on EC2 instances with Puppet-based deployments, leading to performance degradation from CPU/IO contention, inability to deploy large models due to shared memory constraints, lack of independent model scaling, and reliability issues where one model crash could take down the entire service. Reddit's solution was Gazette Inference Service, a new Golang-based microservice deployed on Kubernetes that separates inference orchestration from model execution, with each model running as an independent, isolated deployment (model server pool) that can be scaled and provisioned independently. This redesign eliminated resource contention, enabled independent model scaling, improved developer experience by separating platform code from model deployment configuration, and provided better observability through Kubernetes-native tooling."
link: "https://www.reddit.com/r/RedditEng/comments/q14tsw/evolving_reddits_ml_model_deployment_and_serving/"
year: 2021
seo:
  title: "Reddit: Evolving Reddit’s ML Model Deployment and Serving Architecture - ZenML MLOps Database"
  description: "Reddit redesigned their ML model deployment and serving architecture to address critical scaling limitations in their legacy Minsky/Gazette monolithic system that served thousands of inference requests per second for personalization across feeds, video, notifications, and email. The legacy system embedded all ML models within a single Python thrift service running on EC2 instances with Puppet-based deployments, leading to performance degradation from CPU/IO contention, inability to deploy large models due to shared memory constraints, lack of independent model scaling, and reliability issues where one model crash could take down the entire service. Reddit's solution was Gazette Inference Service, a new Golang-based microservice deployed on Kubernetes that separates inference orchestration from model execution, with each model running as an independent, isolated deployment (model server pool) that can be scaled and provisioned independently. This redesign eliminated resource contention, enabled independent model scaling, improved developer experience by separating platform code from model deployment configuration, and provided better observability through Kubernetes-native tooling."
  canonical: "https://www.zenml.io/mlops-database/reddit-reddits-ml-platform-evolving-reddits-ml-model-deployment-and-serving-architecture"
  ogTitle: "Reddit: Evolving Reddit’s ML Model Deployment and Serving Architecture - ZenML MLOps Database"
  ogDescription: "Reddit redesigned their ML model deployment and serving architecture to address critical scaling limitations in their legacy Minsky/Gazette monolithic system that served thousands of inference requests per second for personalization across feeds, video, notifications, and email. The legacy system embedded all ML models within a single Python thrift service running on EC2 instances with Puppet-based deployments, leading to performance degradation from CPU/IO contention, inability to deploy large models due to shared memory constraints, lack of independent model scaling, and reliability issues where one model crash could take down the entire service. Reddit's solution was Gazette Inference Service, a new Golang-based microservice deployed on Kubernetes that separates inference orchestration from model execution, with each model running as an independent, isolated deployment (model server pool) that can be scaled and provisioned independently. This redesign eliminated resource contention, enabled independent model scaling, improved developer experience by separating platform code from model deployment configuration, and provided better observability through Kubernetes-native tooling."
mlops:
  source: "sqlite"
  entryId: 124
  sourceUrl: "https://www.reddit.com/r/RedditEng/comments/q14tsw/evolving_reddits_ml_model_deployment_and_serving/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061654"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Reddit's machine learning infrastructure had reached a critical inflection point as the company scaled its ML capabilities across multiple product surfaces. The system was serving thousands of online inference requests per second to power personalized experiences for feeds, video, push notifications, and email. However, the legacy architecture called Minsky/Gazette was struggling under the weight of increasing model complexity, growing numbers of machine learning engineers and data scientists, and expanding use cases across the product.

The fundamental architectural problem was that Gazette, Reddit's ML inference capability, had been built into Minsky, an existing Python-based thrift service that served content relevance heuristics and data from stores like Cassandra and memcached. This monolithic approach embedded all ML models as classes within the same application server, creating a series of cascading problems that threatened the scalability and reliability of Reddit's ML systems.

The performance challenges were particularly acute. CPU-intensive ML inference endpoints were co-located with simple IO-intensive data access endpoints within the same processes, causing event loop thrash and context switching delays that degraded performance across the board. Multiple application instances ran on the same EC2 host without virtualization, meaning all models competed for the same CPU cores. While ML frameworks could benefit from multi-core parallelism, the resource contention meant models couldn't fully leverage available concurrency.

From a scalability perspective, the monolithic deployment model imposed severe constraints. Since all models were deployed across all instances, the complexity and size of deployable models was fundamentally limited by the need to fit everything into RAM simultaneously. Large models required very large EC2 instances, and there was no way to provision resources differently for models with different requirements. Furthermore, some models served significantly more traffic than others, but the architecture provided no mechanism for independent scaling—every model was replicated across every instance regardless of its actual traffic patterns.

The developer experience and maintainability suffered under this architecture as well. All models shared the same dependency tree, making it difficult to adopt new library versions or frameworks without ensuring backward compatibility across every deployed model. Adding a new model required contributing application code to the monolithic service, involving manual steps to download models, load them into memory at startup, update schemas, and implement model classes for data transformation. This process was toil-heavy and led to bespoke implementations across models, creating leaky abstractions and more opportunities for bugs.

Reliability was another major concern. Because all models ran in the same process, an exception in any single model could crash the entire application and impact all other models. This created substantial risk around new model deployments. Additionally, the legacy Puppet-based infrastructure used for deployments (with a tool called rollingpin) meant code was rolled out to static pools of hosts, occasionally leading to hard-to-debug rollout issues.

Finally, observability was limited in the monolithic architecture. Understanding "model state"—what was expected to be deployed versus what was actually deployed—proved complex and difficult when everything ran within a single opaque application.

## Architecture & Design

Reddit's redesigned architecture centers on Gazette Inference Service, a new service that represents a fundamental shift from monolithic to distributed model serving. The core architectural principle is separation of concerns: inference orchestration is separated from model execution, and each model runs as an isolated, independently scalable deployment.

Gazette Inference Service itself is built using baseplate.go, Reddit's Golang web services framework, and exposes a single Thrift endpoint called Predict. This service acts as an orchestration layer that handles request routing, schema resolution, and feature fetching, but no longer performs inference directly in its own process.

The request flow begins when clients send a Predict request specifying the model name and version, the records to perform inference on, and any features that need to be passed with the request. Upon receiving this request, Gazette Inference Service consults its local schema registry to resolve the model's schema, which includes metadata like default values and the data sources for each feature. The service then fetches any necessary features from Reddit's feature stores, which include Cassandra and Memcached.

To optimize feature fetching performance, the architecture deploys a memcached daemonset on Kubernetes, providing node-local caching. Each Kubernetes node runs an instance of memcached that can be accessed by all Gazette Inference Service pods on that node. The team worked with their SRE organization to enable topology-aware routing on this daemonset, ensuring that feature fetch requests are preferentially routed to the memcached instance on the same node, avoiding unnecessary network hops and preserving the local caching performance optimization from the legacy system.

Once features are fetched, the service transforms the records and features into a FeatureFrame, which is Reddit's Thrift representation of a data table. At this point, rather than performing inference locally, Gazette Inference Service routes the inference request over the network to a remote Model Server Pool.

Model Server Pools represent the second major component of the architecture. Each model runs as its own independent Model Server Pool, which is a baseplate.py Thrift service that wraps a specific model artifact. These model servers are containerized using Docker and packaged for Kubernetes deployment using Helm. Currently the system supports TensorFlow SavedModel artifacts, with support for additional frameworks in development.

The deployment mechanism for Model Server Pools is configuration-driven rather than code-driven. Machine learning engineers deploy new models by committing a model configuration file to the Gazette Inference Service codebase. This YAML configuration file specifies essential metadata including the model name and version, the path to the model artifact, the model schema (including default values and feature data sources), the model server image version to use, and Kubernetes-specific configuration for resource allocation and autoscaling parameters.

Gazette Inference Service reads these configuration files to build its internal model registry and schema registry, which it uses to route requests and resolve schemas. This creates a declarative deployment model where the configuration files represent the desired state of model deployments.

The architecture also leverages topology-aware routing for the Model Server Pool deployments themselves. While distributed model pools introduce an additional network hop compared to the monolithic architecture, this configuration ensures that when possible, requests are routed to model server pods on the same Kubernetes node as the Gazette Inference Service pod, minimizing network latency.

## Technical Implementation

The technical stack underlying the redesigned architecture represents a significant modernization effort across multiple dimensions. The choice to implement Gazette Inference Service in Go rather than Python was deliberate, driven by Go's superior concurrency handling characteristics. The baseplate.go framework provides the foundation for building Thrift services with Reddit's standard patterns for observability, configuration, and runtime behavior.

The infrastructure foundation shifted from EC2 instances managed by Puppet to Kubernetes, representing Reddit's broader platform modernization. The legacy system deployed on EC2 autoscaling groups with four instances of the Minsky/Gazette Thrift server launched on each host, using Einhorn for load balancing across the processes. The new architecture leverages Kubernetes deployments, enabling declarative infrastructure, automated rollouts, health checking, and self-healing capabilities.

Model Server Pools are implemented as baseplate.py services, maintaining Python for model serving to leverage the Python ML ecosystem. These services are containerized using Docker, with each model potentially using a different model server image version to manage dependency evolution. Helm charts package these containers for Kubernetes deployment, providing parameterization and lifecycle management.

The model deployment workflow is configuration-driven through YAML files that specify model metadata, artifact locations, schemas, and resource requirements. Machine learning engineers no longer write application code to deploy models—instead they commit configuration files that declaratively specify the desired state. This eliminates the need for MLEs to understand the internals of the platform code and reduces opportunities for bugs from bespoke implementations.

Feature storage leverages Cassandra as the primary durable feature store and Memcached for low-latency feature access. The memcached deployment pattern uses Kubernetes daemonsets to ensure exactly one memcached pod per node, creating a distributed cache that provides node-local performance characteristics. The topology-aware routing configuration, implemented with SRE support, ensures requests prefer same-node pods, achieving cache locality without requiring application-level awareness of node topology.

Data representation uses Thrift for serialization and service interfaces, with FeatureFrame serving as the standard representation of tabular data moving between components. This Thrift-based approach provides type safety, backward compatibility, and efficient serialization for the high-throughput inference workload.

Resource isolation in the new architecture is achieved through Kubernetes pod and container boundaries. Each Model Server Pool deployment can specify its own resource requests and limits for CPU and memory, enabling right-sized resource allocation. Models that require substantial memory can be allocated arbitrarily large amounts of RAM, potentially even running a single model on an entire Kubernetes node if necessary. The autoscaling configuration in model deployment files enables automatic scaling based on metrics like CPU utilization or request queue depth.

## Scale & Performance

The document provides specific scale context: Reddit's ML systems serve thousands of online inference requests per second to power personalization across feeds, video, push notifications, and email. While exact request volumes aren't specified, the emphasis on "thousands" of requests per second for a platform serving hundreds of millions of users indicates substantial throughput requirements.

The legacy architecture deployed Minsky/Gazette across clusters of EC2 instances with four application processes per host, but all processes on a single instance shared CPU and RAM without virtualization. This meant that the total memory available on an EC2 instance constrained the combined size of all models that needed to be deployed, and CPU contention limited inference throughput.

Performance improvements in the redesigned architecture come from multiple sources. Separating ML inference from Minsky eliminated event loop thrash caused by mixing CPU-intensive inference workloads with IO-intensive data fetching. The Go-based Gazette Inference Service provides better concurrency handling than the Python-based legacy system, improving throughput for the orchestration layer.

The distributed Model Server Pool architecture fundamentally changes performance characteristics by eliminating resource contention between models. Each model now runs in complete isolation with dedicated CPU and memory resources, enabling models to fully utilize their allocations and leverage framework-level parallelism without competing with other models. While this introduces an additional network hop between Gazette Inference Service and Model Server Pools, the topology-aware routing mitigates latency impact by preferring same-node communication.

The node-local memcached caching strategy preserves the low-latency feature access pattern from the legacy system. By deploying memcached as a daemonset with topology-aware routing, feature fetches can hit a cache instance on the same node, avoiding network round trips while maintaining the benefits of a distributed cache.

Scalability improvements are substantial. The ability to scale models independently means high-traffic models can be provisioned with more replicas while low-traffic models run with minimal resources, improving overall infrastructure efficiency. The configuration-driven autoscaling enables automatic response to traffic patterns without manual intervention.

The shift to Kubernetes also provides infrastructure-level performance benefits. Kubernetes' scheduler can optimize pod placement based on resource availability, and the health checking and self-healing capabilities improve system reliability under failure conditions.

## Trade-offs & Lessons

The redesign involved several notable architectural trade-offs that offer lessons for practitioners building ML serving infrastructure at scale.

The most significant trade-off is the introduction of network hops in the critical inference path. The legacy monolithic architecture performed all inference in-process, avoiding any network latency. The new distributed architecture requires an RPC call from Gazette Inference Service to the appropriate Model Server Pool, adding latency. Reddit mitigated this through topology-aware routing to prefer same-node communication, but this mitigation isn't guaranteed—cross-node calls may occur depending on pod placement and resource availability. The team clearly decided that the benefits of isolation, independent scaling, and operational flexibility outweighed the latency cost, which is a reasonable trade-off given the throughput and scaling challenges they faced.

The decision to implement the orchestration layer in Go while keeping model serving in Python represents a pragmatic polyglot approach. Go provides better concurrency for the high-throughput request routing and coordination work, while Python remains necessary for leveraging the ML framework ecosystem. This does introduce operational complexity from managing services in multiple languages, but Reddit already had the baseplate framework implemented in both languages, reducing the incremental complexity.

The configuration-driven deployment model significantly improves developer experience by eliminating the need for MLEs to write application code, but it does constrain flexibility. The system must anticipate all configuration needs and expose them through the configuration schema. For unusual requirements that don't fit the standard configuration pattern, the platform team would need to extend the configuration schema or provide escape hatches. The document doesn't address how the team handles edge cases that don't fit the declarative configuration model.

The choice to maintain support for TensorFlow SavedModel format initially, with plans to expand to additional frameworks, reflects a pragmatic incremental approach. Supporting multiple frameworks adds complexity to the model server implementation and configuration schema, but is essential for enabling teams to choose the best tool for their use case. The document mentions this as a work-in-progress, suggesting the team is learning how to balance framework flexibility with implementation complexity.

The migration strategy is worth noting. Rather than a big-bang cutover, the team is gradually migrating existing models from Minsky to Gazette Inference Service while also onboarding new partners like the Safety team. This de-risks the migration and allows the team to learn from operating the new system before fully committing to it. The coexistence of old and new systems during migration does create operational overhead, but provides a fallback path if issues arise.

The dependency isolation achieved through model-specific Docker images solves the shared dependency problem elegantly, but shifts the complexity to managing a larger number of container images and potentially dealing with image bloat if many images share common layers but have slightly different dependencies. The document doesn't detail their image building and management strategy, which would be an interesting operational consideration.

The move from Puppet-based deployments to Kubernetes eliminated a class of rollout issues associated with legacy infrastructure, but also required the team and their users to learn Kubernetes concepts and tooling. This represents an investment in operational expertise that pays dividends through better observability and declarative infrastructure management.

One of the most valuable lessons is the importance of preserving performance characteristics during architectural transitions. The team explicitly maintained the node-local caching strategy through the memcached daemonset and topology-aware routing, recognizing that feature fetching latency was a critical performance characteristic worth preserving. This attention to performance continuity likely smoothed the migration and prevented performance regressions.

The emphasis on observability improvements through Kubernetes-native tooling highlights how infrastructure modernization can improve operational visibility. Moving from model state hidden within application processes to explicit Kubernetes resources makes the deployed state inspectable through standard tooling, reducing the cognitive load for operators and improving debugging workflows.

Looking forward, the team identifies several areas for continued development: decoupling model server deployments from Inference Service deployments through remote model and schema registries, building more robust self-service training systems, and redesigning feature pipelines and storage to scale to one billion users. These future directions suggest the team views this redesign as one component of a broader ML platform evolution, with feature engineering and model training as the next frontiers for investment.
