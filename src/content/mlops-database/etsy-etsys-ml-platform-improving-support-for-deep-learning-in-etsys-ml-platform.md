---
title: "Improving Support for Deep Learning in Etsy's ML Platform"
slug: "etsy-etsys-ml-platform-improving-support-for-deep-learning-in-etsys-ml-platform"
draft: false
mlopsTags:
  - "feature-store"
  - "model-serving"
  - "monitoring"
  - "docker"
  - "kubernetes"
  - "tf-serving"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "serving"
industryTags: "e-commerce"
company: "Etsy"
companySlug: "etsy"
platformName: "Etsy's ML platform"
contentType: "blog"
summary: "Etsy's ML Platform team enhanced their infrastructure to support the Search Ranking team's transition from tree-based models to deep learning architectures, addressing significant challenges in serving complex models at scale with strict latency requirements. The team built Caliper, an automated latency testing tool that allows early model performance profiling, and leveraged distributed tracing with Envoy proxy to diagnose a critical bottleneck where 80% of request time was spent on feature transmission. By implementing gRPC compression, optimizing batch sizes from 5 to 25, and improving observability throughout the serving pipeline, they reduced error rates by 68% and decreased p99 latency by 50ms while successfully serving deep learning models that score ~1000 candidate listings with 300 features each within a 250ms deadline."
link: "https://www.etsy.com/codeascraft/improving-support-for-deep-learning-in-etsy39s-ml-platform"
year: 2023
seo:
  title: "Etsy: Improving Support for Deep Learning in Etsy's ML Platform - ZenML MLOps Database"
  description: "Etsy's ML Platform team enhanced their infrastructure to support the Search Ranking team's transition from tree-based models to deep learning architectures, addressing significant challenges in serving complex models at scale with strict latency requirements. The team built Caliper, an automated latency testing tool that allows early model performance profiling, and leveraged distributed tracing with Envoy proxy to diagnose a critical bottleneck where 80% of request time was spent on feature transmission. By implementing gRPC compression, optimizing batch sizes from 5 to 25, and improving observability throughout the serving pipeline, they reduced error rates by 68% and decreased p99 latency by 50ms while successfully serving deep learning models that score ~1000 candidate listings with 300 features each within a 250ms deadline."
  canonical: "https://www.zenml.io/mlops-database/etsy-etsys-ml-platform-improving-support-for-deep-learning-in-etsys-ml-platform"
  ogTitle: "Etsy: Improving Support for Deep Learning in Etsy's ML Platform - ZenML MLOps Database"
  ogDescription: "Etsy's ML Platform team enhanced their infrastructure to support the Search Ranking team's transition from tree-based models to deep learning architectures, addressing significant challenges in serving complex models at scale with strict latency requirements. The team built Caliper, an automated latency testing tool that allows early model performance profiling, and leveraged distributed tracing with Envoy proxy to diagnose a critical bottleneck where 80% of request time was spent on feature transmission. By implementing gRPC compression, optimizing batch sizes from 5 to 25, and improving observability throughout the serving pipeline, they reduced error rates by 68% and decreased p99 latency by 50ms while successfully serving deep learning models that score ~1000 candidate listings with 300 features each within a 250ms deadline."
mlops:
  source: "sqlite"
  entryId: 129
  sourceUrl: "https://www.etsy.com/codeascraft/improving-support-for-deep-learning-in-etsy39s-ml-platform"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061708"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Etsy's ML Platform faced significant challenges when the Search Ranking team decided to migrate from traditional gradient-boosted tree models to deep learning architectures. The serving requirements for search ranking created a particularly demanding environment with strict latency constraints and bursty traffic patterns. For each search request, the system needed to fetch approximately 1000 candidate listings, retrieve around 300 features per listing from the feature store, send that data to ML services for scoring, rank the results, and return them to the user—all within 250ms, with most operations completing before 75ms.

The existing tree-based ranking models already struggled with high timeout rates despite being overprovisioned, indicating that the infrastructure was operating near its limits. When modelers introduced more complex deep learning models with computationally expensive feature transformations, these issues became critical blockers. The first iteration of the new deep learning model encountered unexpected performance problems late in the development cycle, highlighting a fundamental gap in the development workflow: there was no efficient way to test production latency characteristics until models were fully onboarded to all feature services and orchestration systems, which required significant development overhead.

The combination of CPU-bound workloads, strict latency requirements, high feature dimensionality, and bursty request patterns created a perfect storm of challenges. Even after addressing individual component performance, the team discovered that client-side timeouts persisted despite the model itself making predictions quickly (around 50ms), indicating substantial overhead elsewhere in the serving pipeline that was difficult to diagnose with existing observability tools.

## Architecture & Design

Etsy's ML serving architecture for search ranking involves multiple interconnected components working in a coordinated pipeline. The flow begins with the search orchestration layer, which handles incoming search queries and fetches candidate listings. These candidates are then enriched with features from the feature store before being sent to ML services for inference.

The inference infrastructure utilizes TensorFlow Serving containers behind service proxies built on Envoy. The orchestration layer prepares batches of candidates with their associated features and transmits them via protocol buffers (initially) and later gRPC with compression to the proxy layer. The proxy handles routing and load balancing before forwarding requests to the TensorFlow Serving instances that host the actual deep learning models.

The feature store plays a critical role in this architecture, providing around 300 features per candidate listing in real-time. The feature data must be serialized, transmitted, and deserialized efficiently to meet latency requirements. The payload format evolved from JSON (approximately 4MB for tree models) to protocol buffers (just under 1MB for the deep learning model) and eventually to compressed gRPC payloads that were roughly 25% the size of uncompressed versions.

A key architectural addition was Caliper, a dedicated latency testing tool designed to isolate and profile model inference performance independently from the full serving pipeline. Caliper takes model artifacts and training data as input, allows users to configure desired requests per second (RPS) and batch size parameters, and provides automated load testing with TensorBoard profiling. The tool generates latency distribution visualizations, error reports, and profiles of slow TensorFlow operations through a web interface, typically completing analysis within five minutes.

The observability infrastructure evolved to incorporate distributed tracing capabilities, allowing engineers to examine individual request lifecycles across multiple services rather than relying solely on aggregated Prometheus histogram metrics. This granular visibility proved essential for identifying bottlenecks that occurred between components rather than within them.

## Technical Implementation

The technical implementation centered on three major initiatives: building early-stage latency testing tooling, implementing comprehensive distributed tracing, and optimizing data transmission protocols.

Caliper was developed as an automated model profiling system built on TensorFlow's profiling capabilities. The tool accepts model artifacts directly after training, eliminating the need to deploy models to production-like environments for initial performance testing. Users configure workload parameters including RPS targets and batch sizes, and Caliper executes load tests against the model using training data. The system integrates with TensorBoard to provide detailed operation-level profiling, highlighting slow TensorFlow transformations that frequently cause performance bottlenecks. The web UI presents latency distributions and error analysis, streamlining what previously required manual scripting and custom infrastructure setup.

The observability stack leveraged Etsy's existing investment in distributed tracing frameworks combined with Envoy proxy deployment. Envoy access logs provided detailed breakdowns of latency components within the request lifecycle, decomposing total request time into phases such as feature transmission to proxy, proxy processing, model inference, and response transmission. This fine-grained visibility allowed the team to move beyond coarse-grained percentile metrics (like knowing p99 was "somewhere between 100ms and 250ms") to identifying that as much as 200ms was being consumed specifically in transmitting features from client to proxy.

The data transmission optimization focused on payload compression using gRPC's built-in compression capabilities. The search orchestration team experimented with gRPC compression after establishing that payload size correlated with transmission time issues. The deep learning model's payload was approximately 20 times larger than the ads ranking model, with similar feature counts around 300 features per candidate but different feature composition and encoding. Implementing gRPC compression reduced payload sizes to roughly 25% of their uncompressed size.

Batch size tuning emerged as another critical optimization parameter. Previous ranking models used small batch sizes (five candidates) to maximize parallelizability, but testing with Caliper revealed that increasing batch size to 25 candidates did not substantially increase server-side inference latency while significantly reducing orchestration layer overhead. This finding demonstrated the value of isolating inference performance from end-to-end system performance during optimization.

## Scale & Performance

The scale and performance characteristics of Etsy's search ranking infrastructure reveal the demanding nature of the workload. Each search request triggers scoring of approximately 1000 candidate listings, with each candidate requiring roughly 300 features retrieved from the feature store. The entire pipeline must complete within 250ms, with most operations finishing before 75ms to account for downstream processing.

The deep learning model itself achieves inference latency around 50ms per batch, demonstrating that the model architecture is reasonably efficient. However, early deployments experienced significant request timeouts at the 250ms cutoff despite this fast model inference time, indicating substantial overhead in the serving infrastructure. Initial investigation revealed that 200ms of latency—approximately 80% of the total request time—was being consumed in feature transmission from client to proxy before the model even began inference.

Payload sizes varied significantly across model generations. The legacy tree-based decision models used JSON serialization with payloads averaging around 4MB. The initial deep learning model implementation switched to protocol buffers, reducing payload size to just under 1MB—a substantial improvement, but still insufficient given the scale. The deep learning payload was approximately 20 times larger than the ads ranking model's payload despite having similar feature counts, suggesting differences in feature encoding density or complexity.

The optimization interventions delivered measurable improvements. Implementing gRPC compression reduced payload sizes to roughly 25% of their uncompressed size, translating to concrete operational improvements: error rates decreased by 68% and p99 latency dropped by approximately 50ms. The batch size increase from 5 to 25 candidates per request reduced orchestration overhead without meaningfully increasing server-side latency, effectively improving throughput by 5x for the same latency budget.

The workload exhibits bursty characteristics typical of user-facing search applications, creating CPU-bound spikes that are costly to provision for. Even with overprovisioning, the original tree-based models experienced high timeout rates, indicating that the infrastructure was operating near capacity limits even before the introduction of more computationally intensive deep learning models.

## Trade-offs & Lessons Learned

The Etsy team's experience migrating search ranking to deep learning revealed several critical insights about building and operating ML infrastructure at scale, along with important trade-offs in their approach.

**The value of early-stage performance testing proved transformative.** Building Caliper addressed a fundamental gap in the model development lifecycle. Previously, performance testing happened late in development after full system integration, leading to expensive surprises and last-minute scrambling. By enabling latency testing immediately after model training, Caliper shifts performance validation left in the development cycle, allowing modelers to iterate on feature transformations and model architecture with rapid feedback. The trade-off is maintaining additional infrastructure specifically for isolated testing, but the cost is clearly justified by avoiding late-stage integration failures.

**Batch size emerged as a nuanced optimization parameter with non-obvious implications.** The conventional wisdom of keeping batch sizes small for parallelization didn't account for orchestration overhead. Testing revealed that quintupling batch size (from 5 to 25) didn't proportionally increase inference latency but dramatically reduced per-request orchestration costs. This demonstrates the importance of measuring end-to-end system behavior rather than optimizing individual components in isolation. The trade-off is potentially higher memory consumption and slightly increased latency variance, but the overall system throughput benefits were substantial.

**Observability investment paid unexpected dividends.** The team's ability to diagnose the feature transmission bottleneck depended entirely on distributed tracing and detailed proxy logging that Etsy had deployed for broader infrastructure reasons. Without this visibility, the team would have continued optimizing model inference while 80% of latency resided in data transmission. This highlights that comprehensive observability infrastructure is not just for debugging production incidents—it's essential for performance optimization work. The lesson here is that coarse-grained aggregated metrics (percentile histograms) are insufficient for diagnosing complex distributed systems; granular per-request tracing is necessary to understand actual system behavior.

**Payload size optimization revealed hidden bottlenecks.** The team initially believed that moving from 4MB JSON payloads to 1MB protobuf payloads represented sufficient optimization. However, at scale with bursty traffic patterns, even 1MB payloads created transmission bottlenecks. The 75% reduction from gRPC compression was transformative, but this raises questions about the long-term sustainability of the approach. As features continue to grow and models become more complex, compression alone may not suffice. The team is already exploring shared feature formats (sending contextual data once per batch rather than per listing) and feature mapping to address long feature names, indicating that payload optimization is an ongoing challenge rather than a solved problem.

**The interaction between model complexity and infrastructure capacity is not linear.** The deep learning model's payload was 20x larger than the ads ranking model despite similar feature counts, and this difference created qualitatively different performance characteristics. This suggests that infrastructure provisioning and capacity planning must account not just for computational complexity but for data movement patterns, serialization overhead, and network transmission costs. Simply scaling up compute resources doesn't address these bottlenecks.

**The importance of cross-team collaboration emerged as a recurring theme.** The successful resolution of these challenges required deep partnership between ML platform engineers, search orchestration developers, feature systems teams, and data scientists. The payload compression breakthrough came from the search orchestration team's persistence in investigating transmission issues. Future work on shared features and feature mapping requires collaboration with feature systems engineers. This highlights that serving complex ML models at scale is fundamentally a systems integration challenge, not purely an ML engineering problem.

**Technical debt from legacy systems created unexpected friction.** The existing tree-based models were already overprovisioned and experiencing high timeout rates, indicating the infrastructure was operating at its limits before deep learning was introduced. This suggests that incremental evolution of ML infrastructure may not be sustainable—at some point, more fundamental architectural changes may be necessary to support next-generation model complexity.

Looking forward, the team recognizes that current optimizations are steps along a continuous improvement path rather than final solutions. Deep learning models will continue growing in complexity, feature counts will increase, and latency requirements will remain strict or potentially tighten. The team is investing in making performance optimization more self-service through improved Caliper capabilities and automated infrastructure tuning, recognizing that as ML models proliferate, platform teams cannot remain bottlenecks for every performance optimization effort.
