---
title: "DART Online: Standardized model serving on Ray Serve with Kubernetes and dual-cluster fault tolerance"
slug: "klaviyo-dart-jobs-dart-online-dart-online-standardized-model-serving-on-ray-serve-with-kubernetes-and-dual-cluster-fault"
draft: false
mlopsTags:
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "bentoml"
  - "docker"
  - "kserve"
  - "kubernetes"
  - "ray"
  - "sagemaker"
  - "terraform"
  - "torchserve"
  - "deployment"
  - "serving"
industryTags: "tech"
company: "Klaviyo"
companySlug: "klaviyo"
platformName: "DART Jobs / DART Online"
contentType: "blog"
summary: "Klaviyo's Data Science Platform team built DART Online, a robust model serving platform on top of Ray Serve, to address the lack of standardization in deploying ML models to production. Prior to this platform, each new model required building a Flask or FastAPI application from scratch with custom AWS infrastructure and CI pipelines, creating significant delays in getting ML features to production. By implementing Ray Serve on Kubernetes with KubeRay, adding dual-cluster architecture for fault tolerance, and providing standardized templates and tooling, Klaviyo now runs approximately 20 machine learning applications ranging from large transformer models to XGBoost and logistic regression models, significantly improving operational efficiency and reducing time-to-production for new ML features."
link: "https://klaviyo.tech/how-klaviyo-built-a-robust-model-serving-platform-with-ray-serve-c02ec65788b3"
year: 2024
seo:
  title: "Klaviyo: DART Online: Standardized model serving on Ray Serve with Kubernetes and dual-cluster fault tolerance - ZenML MLOps Database"
  description: "Klaviyo's Data Science Platform team built DART Online, a robust model serving platform on top of Ray Serve, to address the lack of standardization in deploying ML models to production. Prior to this platform, each new model required building a Flask or FastAPI application from scratch with custom AWS infrastructure and CI pipelines, creating significant delays in getting ML features to production. By implementing Ray Serve on Kubernetes with KubeRay, adding dual-cluster architecture for fault tolerance, and providing standardized templates and tooling, Klaviyo now runs approximately 20 machine learning applications ranging from large transformer models to XGBoost and logistic regression models, significantly improving operational efficiency and reducing time-to-production for new ML features."
  canonical: "https://www.zenml.io/mlops-database/klaviyo-dart-jobs-dart-online-dart-online-standardized-model-serving-on-ray-serve-with-kubernetes-and-dual-cluster-fault"
  ogTitle: "Klaviyo: DART Online: Standardized model serving on Ray Serve with Kubernetes and dual-cluster fault tolerance - ZenML MLOps Database"
  ogDescription: "Klaviyo's Data Science Platform team built DART Online, a robust model serving platform on top of Ray Serve, to address the lack of standardization in deploying ML models to production. Prior to this platform, each new model required building a Flask or FastAPI application from scratch with custom AWS infrastructure and CI pipelines, creating significant delays in getting ML features to production. By implementing Ray Serve on Kubernetes with KubeRay, adding dual-cluster architecture for fault tolerance, and providing standardized templates and tooling, Klaviyo now runs approximately 20 machine learning applications ranging from large transformer models to XGBoost and logistic regression models, significantly improving operational efficiency and reducing time-to-production for new ML features."
mlops:
  source: "sqlite"
  entryId: 215
  sourceUrl: "https://klaviyo.tech/how-klaviyo-built-a-robust-model-serving-platform-with-ray-serve-c02ec65788b3"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.618311"
  lastUpdated: "2026-04-14T19:56:03.270967"
---

## Problem Context

Klaviyo faced significant operational challenges in deploying machine learning models to production before establishing their centralized ML platform. Until two years ago, the company lacked any standardized platform for ML model serving, which created several pain points. Every new model that needed production deployment required data scientists and engineers to build a completely new Flask or FastAPI application from the ground up. This process included setting up all AWS infrastructure components, creating CI/CD pipelines to build Docker images, and establishing monitoring and operational support. The result was that adding new machine learning features to the Klaviyo application took an unacceptably long time, creating bottlenecks in delivering value to customers.

The Data Science Platform team was created specifically to tackle these inefficiencies and dramatically decrease the time required to deploy new ML models into production. The team needed a solution that would provide standardization while remaining flexible enough to support diverse model types and custom business logic. They also needed a platform that could scale efficiently, support high throughput requirements, and provide the reliability guarantees necessary for production services.

## Architecture & Design

DART Online (DAtascience RunTime) is architected as a highly available, multi-cluster model serving platform built on Ray Serve and deployed on Kubernetes. The architecture incorporates multiple layers of fault tolerance and traffic routing to ensure robust service delivery.

At the highest level, DART Online uses a dual-cluster architecture where two identical Ray clusters run in parallel. Traffic distribution between these clusters is handled by AWS Route53 using weighted routing, which evenly splits incoming requests between the two clusters under normal operation. Route53 is configured with health checks that monitor the status of each cluster, allowing it to automatically route all traffic to the healthy cluster if one becomes unavailable. The health check is connected to a custom health check service that marks a cluster as unhealthy if any deployment within it becomes unhealthy or if Ray Serve's own health check endpoint fails. This conservative approach prioritizes availability over utilization.

Each Ray cluster is deployed using KubeRay's RayService custom resource, which provides several critical capabilities. The RayService resource enables zero downtime upgrades by spinning up a parallel Ray cluster when configuration changes are detected, then switching traffic only after all deployments in the new cluster are running and healthy. This means updates to Docker images and certain configurations can be applied without service disruption.

For high availability at the cluster level, DART Online leverages external Redis instances connected to each Ray cluster. This architectural choice prevents the head node from becoming a single point of failure. In Ray's architecture, the Global Control Service (GCS) maintains cluster metadata and coordinates operations, and by outsourcing this to an external, highly available Redis instance, the cluster can recover even after a head node failure. Critically, Klaviyo learned through painful experience that each Ray cluster must have its own dedicated Redis instance—sharing Redis across multiple clusters means that if Redis goes down, all connected clusters fail simultaneously, defeating the purpose of multi-cluster fault tolerance.

Within each Ray cluster, all models are hosted as separate Ray Serve applications rather than separate clusters. This resource-sharing approach helps contain costs, particularly for GPU resources. Traffic flows into the cluster through an Application Load Balancer (ALB) that distributes requests to Ray nodes (Kubernetes pods) in a round-robin fashion. Each Ray node runs HTTP proxy processes that parse incoming requests and route them to appropriate deployment replicas.

The request routing within Ray Serve follows a sophisticated algorithm designed to optimize latency and throughput. When a request arrives at a Ray node's HTTP proxy, the router randomly selects up to two replicas corresponding to the endpoint. In the first iteration, it considers only replicas co-located on the same node as the router, minimizing network hops. If no replicas exist on the same node, it considers all replicas across all nodes. For the selected replicas, the router checks availability (whether the number of current requests exceeds max_concurrent_queries) and queue depth. The request is forwarded to the available replica with the lowest queue depth, or if neither is available, the process repeats with backoff. Requests wait in the replica's queue until processing capacity becomes available.

## Technical Implementation

The technology stack for DART Online centers on Ray Serve as the core serving framework, deployed on Kubernetes using the KubeRay operator. Ray Serve was selected after extensive evaluation of alternatives including SageMaker, KServe, BentoML, and TorchServe.

Several factors drove the selection of Ray Serve. The framework is platform agnostic and model agnostic, meaning it can deploy any type of ML model without requiring specific adaptations. Other platforms often have good support for common frameworks like scikit-learn and PyTorch but struggle with newer or less popular packages. Ray Serve imposes no such restrictions. The framework also supports arbitrary business logic within deployments, which was critical for Klaviyo's use cases where models typically require custom pre-processing and post-processing steps with business-specific logic. This distinguished Ray Serve from solutions like SageMaker's one-click deployment, which works well for simple model serving but cannot accommodate complex custom logic.

Ray Serve includes several optimizations specifically designed for ML workloads. Request batching allows the framework to group multiple requests together before sending them to the model for inference. Since many ML models are optimized for batch predictions rather than single predictions, this feature provides significant performance benefits. The article cites an example where batching eight requests together increased overall latency by only 10-20%, meaning the throughput nearly octupled for a minimal latency penalty. This enables serving high-throughput models with fewer replicas, delivering substantial cost savings. Additional ML-specific features include model composition (chaining multiple models together) and model multiplexing (dynamically loading and unloading models based on traffic patterns).

The broader Ray ecosystem provided additional value. Ray offers high-level libraries for various ML tasks including Ray Datasets for data processing, Ray Train for distributed training, Ray Tune for hyperparameter tuning, and Ray RLib for reinforcement learning. Using Ray for both training and serving simplifies the model deployment pipeline and maintains Ray-specific optimizations throughout the ML lifecycle. Ray also integrates with numerous third-party tools including Prefect for workflow orchestration, HuggingFace for transformer models, and Flyte for workflow management.

DART Online adds several layers of abstraction and tooling on top of Ray Serve. All applications must be defined in classes that inherit from a standardized base class. This base class provides common functionality including setup routines, access to Klaviyo's internal monitoring systems, payload validation, and error handling with appropriate HTTP status codes. This design allows data scientists to focus on implementing business logic rather than building scaffolding. A similar base class exists for integration testing, which automatically spins up Ray Serve with the applications under test and allows data scientists to write tests that interact with the server directly without worrying about test infrastructure.

Klaviyo also developed a client package that standardizes how other Klaviyo services call DART Online applications. This client simplifies integration and provides a consistent interface for stakeholders consuming ML predictions.

The platform runs on Kubernetes with specific infrastructure considerations. Ray nodes are sized to balance multiple concerns: larger nodes reduce internal networking latency between Ray processes, improving performance, but if a large node fails it takes down more replicas, increasing the blast radius. The team recommends starting with an estimated node size, assessing the impact of losing one or two nodes, and iterating until the impact is acceptable.

## Scale & Performance

DART Online currently hosts approximately 20 machine learning applications in production after one year of operation. These applications span a wide range of model types, from large transformer models requiring GPU resources to more traditional ML models like XGBoost and logistic regression models that run on CPU.

The platform has delivered significant operational improvements. The standardization and tooling provided by DART Online has created what the team describes as "a huge boost in operational efficiency," dramatically reducing the time from model development to production deployment compared to the previous state where each model required custom infrastructure.

Performance optimization through request batching has proven particularly valuable. The example provided shows that batching eight requests together increased latency by only 10-20%, enabling nearly 8x throughput improvement. This allows the platform to serve high-traffic models with fewer replicas, directly translating to cost savings particularly for GPU-intensive workloads.

The dual-cluster architecture provides measurable availability improvements. When one cluster becomes unhealthy—whether due to a head node failure, pod eviction, or other issues—Route53's health check automatically directs all traffic to the healthy cluster while the unhealthy cluster recovers. This typically results in no user-visible downtime for most failure scenarios.

The multi-application architecture on shared clusters enables resource sharing that helps control costs, especially for GPU resources which are expensive. However, this approach requires careful capacity planning to ensure that 2x resources are available during zero-downtime upgrades when KubeRay spins up a parallel cluster.

## Trade-offs & Lessons Learned

Klaviyo's experience with Ray Serve over a year of production operation yielded several important insights about architectural decisions and operational practices.

The multi-cluster architecture provides significant fault tolerance benefits but comes with costs. Running two identical clusters doubles infrastructure expenses under normal operation, trading cost for availability. This trade-off makes sense for Klaviyo's high-availability requirements but may be overkill for applications that can tolerate occasional brief outages. The team notes that extra fault tolerance is unnecessary if the application doesn't require high availability, if Kubernetes pods are stable (not subject to eviction or node draining), or if the application receives very low traffic where brief node failures wouldn't impact users.

Deploying multiple applications on the same Ray cluster offers both benefits and drawbacks. The benefits include simplified infrastructure management (maintaining one set of load balancers, IAM policies, etc. instead of many), easier cross-application dependencies, and resource sharing for cost optimization. However, the architecture introduces several challenges. Heavy traffic to one application can impact others because all applications share the HTTP proxies on each node, creating potential bottlenecks. Zero-downtime upgrades require 2x resources to be available since KubeRay spins up an entire new cluster, which can be prohibitively expensive for large clusters with many GPU nodes. Perhaps most critically, during full cluster outages, all applications must initialize before traffic can flow to the new cluster. If one application takes a long time to spin up (for example, waiting for new GPU instances), it increases downtime for all other applications even if they could start quickly. Based on these lessons, Klaviyo's next step is migrating each application to its own dedicated Ray cluster to enhance isolation and fault tolerance.

The team identified several critical pitfalls to avoid. Sharing Redis instances between multiple Ray clusters defeats the purpose of multi-cluster fault tolerance—if the shared Redis fails, all clusters fail simultaneously. Installing too many packages at runtime using Ray Serve's runtime environment feature can consume 10-15 GB of ephemeral storage, causing pod evictions. This is especially problematic for the head node, as evicted pods don't automatically restart in Kubernetes, potentially taking down the entire cluster. The solution is bundling dependencies in the Docker image rather than installing at runtime.

Running workloads on the head node significantly increases the risk of head node failure. The team strongly recommends setting `num-cpus: "0"` in the head node's rayStartParams to prevent any workloads from being scheduled there, as head node failures are particularly disruptive. Replica placement across nodes requires attention—Ray's default random assignment can result in all replicas landing on the same node, meaning that node's failure takes down the entire deployment. Setting the `max_replicas_per_node` parameter ensures replicas spread across multiple nodes for better fault tolerance.

The Ray community and developer support proved to be a significant asset. The team engaged frequently with the Ray community on Slack, receiving quick responses to questions. Bug reports and feature requests submitted to Ray and KubeRay GitHub repositories were typically implemented within two days to two months, demonstrating responsive maintainership. Direct interactions with Ray and KubeRay developers provided opportunities for feedback that influenced the project roadmap.

Looking forward, Klaviyo plans to refactor toward dedicated clusters per application with all dependencies packaged in Docker images. This architectural evolution addresses the lessons learned about isolation, cluster spin-up times, and fault tolerance. The team expects to continue refining their operational practices and anticipates sharing additional insights as they gain more experience with Ray Serve at scale.
