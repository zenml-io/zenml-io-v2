---
title: "Meet Sibyl – DoorDash’s New Prediction Service – Learn about its Ideation, Implementation and Rollout"
slug: "doordash-doordashs-ml-platform-meet-sibyl-doordashs-new-prediction-service-learn-about-its-ideation-implementation-and-r"
draft: false
mlopsTags:
  - "feature-store"
  - "model-registry"
  - "model-serving"
  - "ab-testing"
  - "deployment"
  - "model-evaluation"
  - "serving"
  - "shadow-deployment"
industryTags: "e-commerce"
company: "DoorDash"
companySlug: "doordash"
platformName: "DoorDash's ML platform"
contentType: "blog"
summary: "DoorDash built Sibyl, a next-generation prediction service designed to handle real-time machine learning inference at massive scale for use cases like search ranking, fraud detection, and dasher pay optimization. The service was architected to serve as a centralized inference layer that separates prediction from feature calculation and model training, using gRPC for requests, Redis as a feature store, and in-memory model caching for low latency. By leveraging C++ native API calls for LightGBM and PyTorch models via JNI, along with Kotlin coroutines for concurrent processing, Sibyl achieved over 100,000 predictions per second during load testing and delivered a 3x latency reduction compared to DoorDash's previous prediction infrastructure. The service supports batch predictions, shadow model evaluation, and has successfully migrated nearly all of DoorDash's models to the centralized platform."
link: "https://doordash.engineering/2020/06/29/doordashs-new-prediction-service/"
year: 2020
seo:
  title: "DoorDash: Meet Sibyl – DoorDash’s New Prediction Service – Learn about its Ideation, Implementation and Rollout - ZenML MLOps Database"
  description: "DoorDash built Sibyl, a next-generation prediction service designed to handle real-time machine learning inference at massive scale for use cases like search ranking, fraud detection, and dasher pay optimization. The service was architected to serve as a centralized inference layer that separates prediction from feature calculation and model training, using gRPC for requests, Redis as a feature store, and in-memory model caching for low latency. By leveraging C++ native API calls for LightGBM and PyTorch models via JNI, along with Kotlin coroutines for concurrent processing, Sibyl achieved over 100,000 predictions per second during load testing and delivered a 3x latency reduction compared to DoorDash's previous prediction infrastructure. The service supports batch predictions, shadow model evaluation, and has successfully migrated nearly all of DoorDash's models to the centralized platform."
  canonical: "https://www.zenml.io/mlops-database/doordash-doordashs-ml-platform-meet-sibyl-doordashs-new-prediction-service-learn-about-its-ideation-implementation-and-r"
  ogTitle: "DoorDash: Meet Sibyl – DoorDash’s New Prediction Service – Learn about its Ideation, Implementation and Rollout - ZenML MLOps Database"
  ogDescription: "DoorDash built Sibyl, a next-generation prediction service designed to handle real-time machine learning inference at massive scale for use cases like search ranking, fraud detection, and dasher pay optimization. The service was architected to serve as a centralized inference layer that separates prediction from feature calculation and model training, using gRPC for requests, Redis as a feature store, and in-memory model caching for low latency. By leveraging C++ native API calls for LightGBM and PyTorch models via JNI, along with Kotlin coroutines for concurrent processing, Sibyl achieved over 100,000 predictions per second during load testing and delivered a 3x latency reduction compared to DoorDash's previous prediction infrastructure. The service supports batch predictions, shadow model evaluation, and has successfully migrated nearly all of DoorDash's models to the centralized platform."
mlops:
  source: "sqlite"
  entryId: 99
  sourceUrl: "https://doordash.engineering/2020/06/29/doordashs-new-prediction-service/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061378"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

DoorDash faced significant challenges in scaling their machine learning infrastructure as the company grew its use of data-driven models across multiple critical services. The platform was powering models for search result curation, dasher assignment, fraud detection, and numerous other use cases that required real-time predictions on massive volumes of data. Before Sibyl, individual services were implementing their own prediction logic in-house, leading to fragmentation, duplication of effort, and inconsistent performance characteristics across the organization.

The core pain points that motivated building Sibyl included the need for a robust, centralized prediction service that could handle hundreds of thousands of predictions per second while maintaining low latency. Services needed predictions to be fast enough that calling a centralized service would be more attractive than each team building their own prediction infrastructure. The existing prediction service was insufficient for the scale requirements, and the company needed a next-generation solution that could support rapid experimentation, model comparison through shadow predictions, and efficient batch processing.

## Architecture & Design

Sibyl was designed as a focused prediction layer within DoorDash's broader ML infrastructure ecosystem, with clear separation of concerns. The service's role is explicitly scoped to handle real-time predictions only, leaving feature calculation, model training pipelines, and storage of features and models to separate services and stores. This architectural decision allowed the team to optimize specifically for low-latency, high-throughput inference without conflating concerns.

The high-level data flow follows this pattern: client services make gRPC requests to Sibyl containing one or more feature sets to predict on. Sibyl retrieves models from an in-memory cache (populated at startup) and fetches feature values from a Redis-based feature store as needed. Predictions are computed and returned synchronously, with optional asynchronous shadow predictions made in parallel for model evaluation purposes. The service also supports writing predictions to Snowflake for offline evaluation and analysis.

The request lifecycle involves several key steps. When a request arrives, Sibyl first retrieves both the model and its associated configuration from the in-memory cache. The model config contains critical metadata including all required features, default fallback values for missing features, and the model type. The service then iterates through the feature sets provided in the request to identify any missing feature values, performing this check for all models and feature sets at once and storing results in an efficient map structure for lookup. For any missing features, the service attempts retrieval from the Redis feature store, falling back to default values from the model config if features still cannot be found. Once all features are assembled, predictions are made asynchronously for each feature set using coroutines, with shadow models also launched as asynchronous coroutines that don't block the primary response. Finally, results are packaged into a protobuf response object and returned to the client.

A critical design decision was supporting batch predictions, allowing each request to contain any variable number of feature sets. This capability dramatically reduces the number of network calls required, as client services can send and retrieve anywhere from one to N predictions in a single request. The team discovered through testing that optimal batch sizes ranged from 100-200 stores for their search ranking use case, balancing the overhead of multiple requests against the propagation delay of very large payloads.

Shadow predictions represent another important architectural feature. Teams often have multiple candidate models they want to evaluate on production traffic before committing to a final choice. Sibyl allows teams to designate one model for official predictions while asynchronously running additional candidate models on the same data in the background. This gives data scientists the flexibility to compare model performance on real production data without impacting latency or user experience.

## Technical Implementation

The service was implemented primarily in Kotlin, chosen specifically for its robust coroutine support. Kotlin coroutines provided the fine-grained concurrency control needed to meet stringent latency requirements, with coroutines suspending themselves while waiting for I/O operations rather than blocking threads. This allowed threads to continue performing computational work instead of idling during feature fetches or other blocking operations. While similar behavior could theoretically be achieved in Java using callbacks, the Kotlin implementation proved syntactically cleaner and easier to reason about for multithreaded development.

A critical performance optimization involved using native API calls for model inference. DoorDash's ML platform standardized on two frameworks: LightGBM for gradient-boosted decision trees and PyTorch for neural networks. While both frameworks offer APIs in multiple programming languages, the team chose to store models in their native format and make prediction calls through C++ implementations. This decision minimized inference latency by avoiding language runtime overhead. The Kotlin service communicates with these C++ prediction implementations via the Java Native Interface (JNI), bridging the gap between the JVM-based service layer and native code.

The feature store uses Redis as the underlying cache, providing fast lookup times for feature values. Features are fetched on-demand during prediction requests rather than being bundled into the request payload, which keeps request sizes manageable and allows for consistent feature serving across different client services. The service implements a fallback strategy where missing features default to values specified in the model configuration, ensuring predictions can proceed even with incomplete data.

Models are loaded into memory when the service starts up and cached for the lifetime of the service instance. This design choice trades memory usage for extremely low latency, as the service doesn't need to perform model loading or deserialization during request processing. Model configs are similarly cached alongside the models themselves, providing instant access to metadata needed for feature assembly and prediction.

The service uses gRPC as its communication protocol, chosen for its efficiency with binary data and strong typing through protocol buffers. gRPC's support for streaming was beneficial for handling batch requests, though the team also experimented with request compression to reduce network overhead. With hundreds of stores and their feature values included in each request, compression showed promise in reducing the number of network packets that needed to traverse the network layer.

Support for multiple model types has expanded over time. Initially focused on LightGBM and PyTorch models, the platform has added support for embedded features used primarily in neural networks. The team also implemented composite models, which consist of chains of submodels and computational expressions called compute nodes. This allows for more sophisticated inference pipelines where the output of one model feeds into subsequent models or transformations.

## Scale & Performance

Load testing demonstrated that Sibyl could handle over 100,000 predictions per second, validating the architectural and implementation choices made by the team. This throughput test was conducted using DoorDash's search service, one of the most demanding services in terms of prediction volume. The search service ranks every restaurant shown to users, requiring hundreds of predictions per page load across thousands of concurrent users.

The search service load test was designed cleverly: whenever the search service was about to rank a restaurant using its existing in-house logic, it would spawn an asynchronous thread that also called Sibyl. This approach allowed for realistic load testing against production traffic patterns without actually impacting user-facing latency, since the Sibyl calls were non-blocking and their results weren't used during the test phase.

When the service was put into production use, starting with fraud detection and dasher pay models in March 2020, it achieved a 3x reduction in latency compared to DoorDash's previous prediction service. This improvement was substantial enough to justify the migration effort and convince additional teams to move their models to Sibyl. The fraud and dasher pay use cases were chosen as initial production workloads because they had lower query-per-second requirements and less strict latency constraints compared to search ranking, making them lower-risk candidates for the initial rollout.

Batch size optimization revealed interesting performance characteristics. The team tested various chunk sizes for the search ranking use case, which typically needs to score around 1,000 stores at once. They found that the optimal batch size was 100-200 stores per request. Smaller chunks of 10-20 stores actually increased latency, likely due to request queuing overhead as the number of requests ballooned. At the other extreme, sending all 1,000 stores in a single request also degraded performance due to increased propagation delay from the large payload size. This sweet spot validated that Sibyl's parallel prediction implementation was efficient and that the bottleneck shifted to network concerns at very large batch sizes rather than computational constraints.

By the time of the blog post's publication, nearly all of DoorDash's models had been migrated to Sibyl, with only five models remaining on the old infrastructure. This represents a successful platform consolidation that unified prediction serving across the organization.

## Trade-offs & Lessons

The architectural decision to separate prediction from feature calculation and model training proved highly effective, allowing each component to be optimized independently. However, this separation introduced coordination overhead, particularly around ensuring that feature definitions remain consistent between training and serving environments. The feature store abstraction helps manage this, but teams must still be disciplined about feature versioning and schema management.

Using C++ for prediction via JNI delivered significant performance benefits but added complexity to the development and deployment process. The team needed to manage native libraries alongside the JVM-based service, handle platform-specific compilation, and debug across language boundaries. This trade-off was deemed worthwhile given the stringent latency requirements, but teams considering similar approaches should weigh the operational complexity against the performance gains for their specific use case.

The choice of Kotlin and its coroutine support proved to be a major win. The team explicitly called out how much cleaner and easier it was to write concurrent code with Kotlin coroutines compared to Java callbacks. This demonstrates the value of language-level features for building high-performance systems, and the code maintainability benefits likely accelerated development velocity even beyond the raw performance improvements.

The batch size optimization work revealed an important lesson about finding the right granularity for batch processing. Too small and request overhead dominates; too large and network/serialization costs become the bottleneck. The team's empirical testing approach of trying various chunk sizes and measuring actual latency proved more valuable than theoretical optimization, as the optimal range (100-200 items) likely depends on specific payload characteristics, network topology, and service implementation details that are difficult to model analytically.

Shadow predictions emerged as a particularly valuable feature for model development teams. By allowing asynchronous evaluation of candidate models on production traffic without impacting latency, data scientists could gather real-world performance metrics to inform model selection. This capability bridges the gap between offline evaluation and production deployment, reducing the risk of model changes.

The phased rollout strategy demonstrated sound engineering judgment. Starting with fraud and dasher pay models—lower QPS, less latency-sensitive use cases—allowed the team to gain production experience and build confidence before tackling the high-stakes search ranking workload. This incremental approach reduced risk and provided opportunities to tune the system based on real production patterns.

One challenge mentioned was the need to migrate feature values from existing services to Sibyl's feature store. For the search service in particular, this represented a non-trivial data engineering effort that delayed production use for that workload. Organizations building similar platforms should budget time for feature migration and consider how to minimize disruption to existing services during the transition period.

The decision to cache models in memory represented a classic latency-memory trade-off. By loading all models at startup and keeping them resident in memory, the team achieved minimal prediction latency at the cost of memory footprint and potentially longer cold-start times when deploying new service instances. For their use case, this trade-off made sense, but teams with very large models or large numbers of models might need alternative approaches like lazy loading or external model serving.

The article notes that request compression was explored to address payload size concerns with batch requests. While not explicitly stated whether this was adopted, it highlights the team's willingness to optimize at multiple layers of the stack—from algorithm choice to network protocol tuning—to achieve their performance goals. This comprehensive optimization approach was likely necessary to hit such aggressive throughput and latency targets.

Overall, Sibyl represents a successful execution of building a centralized ML inference platform that balanced performance, flexibility, and operational complexity. The clear architectural boundaries, careful technology selection, thorough testing methodology, and incremental rollout all contributed to a platform that could handle production scale while continuing to evolve with new model types and capabilities.
