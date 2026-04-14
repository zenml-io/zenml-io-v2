---
title: "Serving Machine Learning Models Efficiently at Scale at Zillow"
slug: "zillow-zillows-ml-platform-serving-machine-learning-models-efficiently-at-scale-at-zillow"
draft: false
mlopsTags:
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "metaflow"
  - "mlflow"
  - "deployment"
  - "feature-engineering"
  - "retraining"
  - "serving"
  - "training"
industryTags: "other"
company: "Zillow"
companySlug: "zillow"
platformName: "Zillow's ML platform"
contentType: "blog"
summary: "Zillow built a comprehensive ML serving platform to address the \"triple friction\" problem where ML practitioners struggled with productionizing models, engineers spent excessive time rewriting code for deployment, and product teams faced long, unpredictable timelines. Their solution consists of a two-part platform: a user-friendly layer that allows ML practitioners to define online services using Python flow syntax similar to their existing batch workflows, and a high-performance backend built on Knative Serving and KServe running on Kubernetes. This approach enabled ML practitioners to deploy models as self-service web services without deep engineering expertise, reducing infrastructure work by approximately 60% while achieving 20-40% improvements in p50 and tail latencies and 20-80% cost reductions compared to alternative solutions."
link: "https://www.zillow.com/tech/serving-machine-learning-models-efficiently-at-scale-at-zillow/"
year: 2022
seo:
  title: "Zillow: Serving Machine Learning Models Efficiently at Scale at Zillow - ZenML MLOps Database"
  description: "Zillow built a comprehensive ML serving platform to address the \"triple friction\" problem where ML practitioners struggled with productionizing models, engineers spent excessive time rewriting code for deployment, and product teams faced long, unpredictable timelines. Their solution consists of a two-part platform: a user-friendly layer that allows ML practitioners to define online services using Python flow syntax similar to their existing batch workflows, and a high-performance backend built on Knative Serving and KServe running on Kubernetes. This approach enabled ML practitioners to deploy models as self-service web services without deep engineering expertise, reducing infrastructure work by approximately 60% while achieving 20-40% improvements in p50 and tail latencies and 20-80% cost reductions compared to alternative solutions."
  canonical: "https://www.zenml.io/mlops-database/zillow-zillows-ml-platform-serving-machine-learning-models-efficiently-at-scale-at-zillow"
  ogTitle: "Zillow: Serving Machine Learning Models Efficiently at Scale at Zillow - ZenML MLOps Database"
  ogDescription: "Zillow built a comprehensive ML serving platform to address the \"triple friction\" problem where ML practitioners struggled with productionizing models, engineers spent excessive time rewriting code for deployment, and product teams faced long, unpredictable timelines. Their solution consists of a two-part platform: a user-friendly layer that allows ML practitioners to define online services using Python flow syntax similar to their existing batch workflows, and a high-performance backend built on Knative Serving and KServe running on Kubernetes. This approach enabled ML practitioners to deploy models as self-service web services without deep engineering expertise, reducing infrastructure work by approximately 60% while achieving 20-40% improvements in p50 and tail latencies and 20-80% cost reductions compared to alternative solutions."
mlops:
  source: "sqlite"
  entryId: 140
  sourceUrl: "https://www.zillow.com/tech/serving-machine-learning-models-efficiently-at-scale-at-zillow/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061821"
  lastUpdated: "2026-04-14 10:02:24"
---

## Problem Context

Zillow's business is deeply powered by machine learning across numerous product scenarios including the Zestimate home valuation tool, home recommendations, textual home insights, floor plan generation, semantic search, and Premier Agent partnerships optimization. As ML became central to the product experience, the company faced significant friction in deploying models to production.

The core challenge manifested as a "triple friction" problem across three stakeholder groups. ML practitioners (applied scientists, data scientists, ML engineers) believed their specialized skills were inefficiently utilized when dealing with engineering deployment details, yet they needed involvement to ensure feature and model behavior consistency between training and production environments. Engineers spent considerable time rewriting code to make it production-ready as web services, requiring them to learn model behavior, restructure custom preprocessing code, handle feature extraction, make predictions, post-process outputs, and navigate numerous pitfalls. Product teams experienced long and risky timelines due to the need for dedicated engineering resources for each model deployment, engineer ramp-up time on model behavior, and the risk of behavior changes between development and production.

The ML development lifecycle itself presented challenges across three nested loops. The inner loop focused on rapid offline experimentation with quick iteration and fast failure. The middle loop refined promising models. The outer loop—representing production deployment—required the most engineering effort, involving deployment to batch pipelines or online web services, production-quality code, performance optimization, monitoring, metrics, and maintainable operations. Without platform solutions, this process repeated for every project across multiple teams, consuming enormous time before models could impact customer experience and business metrics.

Beyond the organizational friction, ML model serving presented unique technical challenges distinct from traditional web services. Models required substantial custom business logic including request preprocessing, format transformation, on-the-fly feature extraction, enrichment with cached features, and output post-processing. Some scenarios demanded dynamic orchestration logic, such as conditionally scoring with additional models based on prior outputs. All of this needed consistency across development and production, high-quality performant code with low latency, continuous integration and deployment, and monitoring for system and model health anomalies, while integrating with data and experimentation platforms.

## Architecture & Design

Zillow's AI Platform (AIP) serving solution consists of two primary architectural layers designed to solve different aspects of the deployment problem.

The user-facing layer introduces a "service as online flow" paradigm. Recognizing that ML practitioners were already familiar with flow-based representations in batch workflows, Zillow extended this concept to online serving. An online service is conceptually a DAG (Directed Acyclic Graph) of steps including request processing initiation, data preprocessing and feature transformation, model prediction, and output post-processing. This abstraction allows practitioners to define complete services in pure Python without knowledge of web service concepts.

The flow definition uses decorators similar to Zillow's batch workflow tool (zillow-metaflow, their version of Metaflow). The OnlineFlowSpec class implements the core flow concept with custom service logic defined through step decorators and self.next calls for orchestration. Flow class decorators control engineering aspects like endpoint URLs, resource limits, and autoscaling behavior. Flow parameters provide Pythonic abstraction over environment variables, allowing developers to use self.score_param instead of low-level os.getenv calls. A load function executes warmup tasks before serving traffic, including downloading and loading models and custom business logic. The system abstracts HTTP read/write formatting through self.input and self.output, providing convenient transformations with Pandas DataFrames.

The deployment mechanism integrates offline and online flows within the same repository and container environment. Offline training flows can deploy online services using an "online_publish" function. When executed, this function deploys the targeted online flow file as a real-time service. Artifacts and metadata from the deployment offline flow become available in the online flow's load function through a "base_run" pointer, enabling elegant one-line artifact loading. This pattern naturally supports automatic model refreshes where models benefiting from scheduled continuous retraining can be redeployed immediately after training and evaluation in offline flows. The overall project leverages GitLab and GitLab CICD for version control and deployment automation.

The backend layer addresses the unique characteristics of ML serving through a carefully selected technology stack. The foundation consists of Kubernetes as the orchestration layer, with Knative Serving providing serverless capabilities and smart load balancing, and KServe offering ML-specific serving optimizations. The architecture includes a centralized autoscaler component enabling request-based autoscaling on metrics like concurrency or requests per second, with serverless scale-to-zero support. A centralized activator component provides intelligent load balancing by buffering surplus requests and dispatching only to serving replicas with capacity. Queue-proxy sidecar containers attach to each model server container forming complete serving replica pods, proxying health/liveness/readiness probes to avoid interrupting the main application and providing an additional buffer layer for surplus requests.

The data flow involves client applications making requests through API endpoints for real-time predictions, or streaming applications receiving data from sources like Kafka streams for near real-time predictions. The serving infrastructure connects to data stores, feature stores, model stores, and metadata repositories to fetch required artifacts. Integration with A/B testing platforms enables version control and treatment evaluation. Monitoring and alerting solutions track both system and model health. All peripheral components are abstracted from ML practitioners through the Serving SDK, allowing them to focus solely on the ML model itself.

## Technical Implementation

The implementation centers on the AIP Serving SDK, a Python module (aip_serving_sdk) that wraps the performant web server implementation while providing high-level abstractions. The SDK enables the flow-based syntax and handles all low-level web service concerns transparently.

For the backend infrastructure, Zillow integrated several open-source technologies after thorough evaluation. Kubeflow provides a powerful toolkit for ML workloads on Kubernetes. Knative Serving, built on Kubernetes and Istio, handles the core serving infrastructure with its autoscaler, activator, and queue-proxy components. KServe contributes a performant base custom model server that Zillow further optimized, abstractions on top of Knative, and critical ML serving features including request batching for batch optimization and separated transformers for pre/post-processing.

The integration with Metaflow influenced the design philosophy significantly. Zillow appreciated Metaflow's principle that successful projects emerge when ML practitioners can build, improve, and operate end-to-end workflows independently, focusing on data science rather than engineering. The Pythonic syntax, step and flow concepts, and ease of using decorators were adopted for both batch workflows (through zillow-metaflow, their open-source contribution) and extended to online serving.

The deployment pipeline uses GitLab CICD for continuous integration and deployment. Offline and online flows reside in the same repository sharing the same container environment, reducing hassle in code reuse and runtime environment alignment between model development and deployment. The system automatically handles container builds, artifact packaging, and service deployment through standardized CICD pipelines.

Integration with Zillow's broader ecosystem includes connections to Datadog and Splunk for monitoring and observability. The platform provides abstractions for seamless integration with internal data access tools and A/B experimentation platforms, allowing practitioners to focus on core modeling and metrics while the platform handles cross-platform complexity.

Performance optimizations address ML serving's unique characteristics. The system recognizes that ML serving is primarily CPU-bound (sometimes GPU-bound) rather than IO-bound like typical web services, meaning each replica supports fewer parallel workers and asynchronous I/O benefits are less significant. System overhead including context switching and CPU throttling affects latency more drastically. Request-based autoscaling addresses varying request workloads where some inference requests require lightweight lookups while others demand full CPU capacity, making CPU utilization-based autoscaling less effective. The queue-proxy and activator architecture mitigates heavy request effects where long-running inference requests could cause health probe false-positives and excessive request timeouts.

## Scale & Performance

Zillow reports significant quantitative improvements from their serving platform. ML practitioners save approximately 60% of the time previously spent on infrastructure work when deploying models to production. This represents substantial productivity gains across the organization's ML teams.

Performance comparisons against alternative vendor solutions show 20-40% improvements in p50 and long-tail latencies. One production-grade model comparison showed the AIP serving solution achieving p50 latency of 45ms compared to 75ms for an alternative solution, and p95 latency of 120ms compared to 200ms. These latency improvements, combined with internal compute and resource optimizations, contribute to 20-80% cost reductions for serving the same traffic volumes.

The platform supports Zillow-scale traffic across numerous product scenarios. While specific request volumes aren't disclosed, the system powers critical user-facing features including the Zestimate displayed on every property, home recommendations, search functionality, and agent partnership optimization, suggesting substantial throughput requirements.

The serverless capabilities enable scale-to-zero for services with clear off-peak traffic patterns, providing cost efficiency for ML serving workloads which typically have large resource footprints. The request-based autoscaling responds dynamically to actual traffic rather than indirect measures like CPU utilization, improving resource allocation efficiency.

The platform supports both real-time prediction scenarios through REST API endpoints and near real-time scenarios through streaming pipelines consuming from and publishing to message queues like Kafka. This flexibility allows teams to choose the appropriate serving pattern for their use case.

## Trade-offs & Lessons

Zillow's approach represents thoughtful trade-offs between abstraction and flexibility. The flow paradigm provides sufficient abstraction for ease of use while maintaining the flexibility needed for custom business logic. The decision to support DAG representations rather than purely linear flows allows for complex scenarios including parallel preprocessing branches when needed. This balances simplicity for common cases with power for edge cases.

The choice to unify offline and online flow syntax within the same repository and container environment reduces cognitive burden and ensures environment consistency. This addresses a common source of training-serving skew where models behave differently in production than development. However, this approach requires that the runtime environment supports both training/batch workloads and serving workloads, potentially constraining optimization opportunities specific to each use case.

The technology selection demonstrates pragmatic open-source integration. Rather than building from scratch or adopting a single vendor solution, Zillow combined Kubeflow, Knative, KServe, and Metaflow concepts, extending them to meet specific needs. This required substantial engineering effort to make these solutions operations-ready, adapt to Zillow infrastructure, meet SLA requirements, and create the "paved path" reducing friction. The team acknowledges that while these OSS solutions provide excellent starting points, extensive work was needed for production readiness.

The recognition of ML serving's unique characteristics—CPU-bound workloads, varying request patterns, heavy request effects, and serverless requirements—informed architectural decisions that differentiate their solution from generic web service platforms. The insight that perfect load balancing is impossible led to the activator-based buffering approach, which provides best-effort optimization in distributed environments.

Key lessons for practitioners include the importance of understanding the fundamental differences between ML serving and traditional web services. CPU-bound workloads require different architectural patterns than IO-bound services. Request-based autoscaling proves more effective than resource-based scaling for variable ML workloads. The middle buffering layer between load balancers and serving replicas mitigates many practical issues with heavy requests and system overhead.

The platform team's philosophy emphasizes that successful ML platforms emerge when practitioners can independently build, improve, and operate workflows while focusing on their core competencies. This drives design decisions toward Pythonic, declarative interfaces with minimal conceptual overhead. The similarity in syntax between batch and online workflows exemplifies this principle—reducing learning curves by leveraging existing knowledge.

Zillow's commitment to continuous improvement includes planned abstractions for data layer access, feature extraction, and enhanced observability for model performance metrics beyond system metrics. Their OSS engagement and willingness to contribute back to the community demonstrates recognition that platform challenges are industry-wide and collaborative solutions benefit everyone.

The automatic model refresh pattern where retraining triggers automatic redeployment represents a significant operational efficiency. This closes the loop between model development and production deployment, enabling continuous improvement without manual intervention. However, this requires robust testing and validation to ensure newly deployed models maintain quality standards.

The platform's success depends on abstractions that hide complexity without sacrificing necessary control. The flow decorators for resource limits, autoscaling behavior, and endpoint configuration allow ML practitioners to specify production requirements declaratively without understanding Kubernetes, Knative, or KServe internals. This separation of concerns enables platform engineers to optimize the backend while user-facing interfaces remain stable and simple.
