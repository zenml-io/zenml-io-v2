---
title: "Turing ML online model experimentation and evaluation via low-latency traffic routing with A/B testing and monitoring"
slug: "gojek-gojeks-ml-platform-turing-ml-online-model-experimentation-and-evaluation-via-low-latency-traffic-routing-with-ab-t"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "feast"
  - "kubernetes"
  - "ab-testing"
  - "data-validation"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "serving"
industryTags: "automotive"
company: "Gojek"
companySlug: "gojek"
platformName: "Gojek's ML platform"
contentType: "blog"
summary: "Gojek built Turing as their online model experimentation and evaluation platform to close the loop in the machine learning lifecycle by enabling real-time A/B testing and model performance monitoring in production. Turing is an intelligent traffic router that integrates with Gojek's existing ML infrastructure including Feast for feature enrichment, Merlin for model deployment, and Litmus for experimentation management. The system provides low-latency routing to multiple ML models simultaneously, dynamic ensembling capabilities, rule-based treatment assignment, and comprehensive request-response logging with tracking IDs that enable data scientists to measure real-world outcomes like conversion rates and order completion. Built on Golang using Gojek's Fiber library, Turing operates as single-tenant auto-scaling router clusters where each deployment serves one specific use case, handling mission-critical applications like surge pricing and driver dispatch systems."
link: "https://www.gojek.io/blog/finding-intelligence-with-turing"
year: 2020
seo:
  title: "Gojek: Turing ML online model experimentation and evaluation via low-latency traffic routing with A/B testing and monitoring - ZenML MLOps Database"
  description: "Gojek built Turing as their online model experimentation and evaluation platform to close the loop in the machine learning lifecycle by enabling real-time A/B testing and model performance monitoring in production. Turing is an intelligent traffic router that integrates with Gojek's existing ML infrastructure including Feast for feature enrichment, Merlin for model deployment, and Litmus for experimentation management. The system provides low-latency routing to multiple ML models simultaneously, dynamic ensembling capabilities, rule-based treatment assignment, and comprehensive request-response logging with tracking IDs that enable data scientists to measure real-world outcomes like conversion rates and order completion. Built on Golang using Gojek's Fiber library, Turing operates as single-tenant auto-scaling router clusters where each deployment serves one specific use case, handling mission-critical applications like surge pricing and driver dispatch systems."
  canonical: "https://www.zenml.io/mlops-database/gojek-gojeks-ml-platform-turing-ml-online-model-experimentation-and-evaluation-via-low-latency-traffic-routing-with-ab-t"
  ogTitle: "Gojek: Turing ML online model experimentation and evaluation via low-latency traffic routing with A/B testing and monitoring - ZenML MLOps Database"
  ogDescription: "Gojek built Turing as their online model experimentation and evaluation platform to close the loop in the machine learning lifecycle by enabling real-time A/B testing and model performance monitoring in production. Turing is an intelligent traffic router that integrates with Gojek's existing ML infrastructure including Feast for feature enrichment, Merlin for model deployment, and Litmus for experimentation management. The system provides low-latency routing to multiple ML models simultaneously, dynamic ensembling capabilities, rule-based treatment assignment, and comprehensive request-response logging with tracking IDs that enable data scientists to measure real-world outcomes like conversion rates and order completion. Built on Golang using Gojek's Fiber library, Turing operates as single-tenant auto-scaling router clusters where each deployment serves one specific use case, handling mission-critical applications like surge pricing and driver dispatch systems."
mlops:
  source: "sqlite"
  entryId: 68
  sourceUrl: "https://www.gojek.io/blog/finding-intelligence-with-turing"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061043"
  lastUpdated: "2026-04-14T19:54:53.777914"
---

## Problem Context

Gojek identified that ML testing is substantially more challenging than traditional software verification, particularly for online evaluation of models in production environments. The company faced the "Test Oracle Problem" where ML system behavior is difficult to define precisely, and inputs are complex to simulate since they may be stateful or depend on other ML systems. Many teams avoid this challenge by assuming ML systems are untestable, but this approach conflicts with rigorous engineering practices.

Gojek breaks down the ML testing problem into five distinct stages: validating training data pre-training, offline evaluation during training, validating deployed models and input data post-training but pre-inference, validation during inference, and online evaluation post-inference. The last stage—online evaluation of models in production with real traffic and real outcomes—was the missing piece in Gojek's ML platform. While their existing tools handled earlier stages (Feast for data validation, Merlin for deployment-time model validation), they needed a system to monitor models during operation and provide online evaluation metrics based on actual business outcomes.

The challenge extended beyond simple model serving. Gojek needed to support sophisticated experimentation patterns including A/B testing, multi-armed bandits, contextual bandits, and switchback experiments. They required the ability to route traffic to multiple models simultaneously, ensemble model outputs dynamically based on experimentation policies, and correlate model predictions with downstream business outcomes like user conversions, driver wait times, and order completion rates. The system needed to operate with low latency for mission-critical applications while providing comprehensive observability and the flexibility to implement custom preprocessing, ensembling logic, and rule-based routing.

## Architecture & Design

Turing functions as an intelligent traffic routing layer that sits between Gojek's backend services (powering their mobile app experience) and their ML models. The architecture is designed around three key extension points: a rule engine for treatment assignment, a preprocessing stage for feature enrichment, and a post-processing stage for ensembling model outputs.

The system integrates deeply with Gojek's existing ML platform components. It shares the same preprocessing system as Merlin (Gojek's model deployment platform), which supports feature enrichment through Feast (their feature store). Turing implements a client for Litmus, Gojek's experimentation platform, to determine which treatment to apply to each request. This integration creates a seamless experience where data scientists can configure experiments, select model endpoints deployed via Merlin, and analyze results all from centralized interfaces.

Each Turing deployment follows a single-tenant model where one auto-scaling router cluster handles a specific type of request. For example, one cluster calculates surge pricing multipliers for ride requests, while a separate cluster serves food recommendations. This design choice provides isolation and allows each deployment to be independently configured and scaled. All router clusters are centrally managed through Turing Core, which is part of the broader ML Platform and provides both a Python SDK and web UI for data scientists to set up and monitor experiments.

The traffic flow through Turing follows a carefully orchestrated sequence designed to minimize latency through asynchronous operations. When a request arrives, Turing parses it to extract the experiment unit (such as a user ID, session ID, or order ID). This unit ID is immediately passed to the rules engine to determine which treatment should be applied. Simultaneously, the request flows to the preprocessing stage for feature enrichment—for instance, looking up a user's past transaction history given their user ID in the request.

The preprocessed request is then forwarded to all configured models in parallel, not just the model associated with the selected treatment. This design choice is deliberate: by querying all models including a simple fallback model, Turing can quickly return a reliable default response if the primary model times out or fails, without incurring additional delay. The fallback model might be something as simple as always returning a fixed default value.

Model responses are collected and sent to the post-processor, which ensembles them according to the policy returned by the rules engine. The ensembler currently supports computing linear combinations of model outputs or, in simpler cases, routing directly to a single model's output. Data scientists can implement more sophisticated ensembling strategies as needed. The final ensembled response is augmented with a tracking ID, logged alongside the individual model responses and original request, and returned to the client.

The tracking ID serves a critical function in closing the measurement loop. The client is responsible for later logging the experiment outcome (such as whether an order was completed or a widget was clicked) along with the tracking ID. Turing combines these client logs with its internal request-response logs using the tracking ID as the join key, enabling data scientists to correlate treatments with real business outcomes. Litmus provides a UI for visualizing these experiment results, and the outcomes can be fed back to the rule engine for implementing reinforcement learning systems.

## Technical Implementation

Turing is built on Fiber, Gojek's internal traffic routing library implemented in Golang. The choice of Golang aligns with the need for high performance and low latency in a system handling critical production traffic. Each router cluster sources its configuration from a YAML file generated by Turing Core when the deployment is created or updated.

The configuration file specifies routes to model endpoints, the routing strategy, and parameters for the rule engine integration. In the example provided, routes define proxies to model endpoints (including both the experimental model and control). The strategy section configures the rule engine—in this case, Litmus—including the endpoint, client credentials, timeout settings (100ms in the example), experiment name, and details about how to extract the segmentation unit from requests (such as reading the customer_id from request headers).

The rule engine integration currently supports Litmus, with Gojek planning to potentially add support for Facebook's PlanOut in the future. This would enable dynamic policies and the possibility of generating policies based on experiment outcomes, useful for multi-armed bandits or circuit breakers. Litmus itself supports sophisticated rules that can consider predefined customer segments, user location, or time of day when assigning treatments.

The preprocessing stage integrates with Feast for feature retrieval but also supports arbitrary transformations on incoming requests. This flexibility allows data scientists to implement custom feature engineering logic beyond simple feature store lookups. Similarly, the post-processing stage currently provides a basic ensembler for linear combinations but is designed to support more complex ensembling logic as needs evolve.

The deployment architecture leverages auto-scaling capabilities to handle variable traffic loads. Changes to extension points (rule engine configuration, pre- or post-processors) or model endpoints require redeployment. However, changes to the rules themselves within Litmus, or updates to model versions behind the endpoints via Merlin's versioning support, can occur without downtime—an important property for continuous improvement of production models.

The asynchronous dispatch pattern is a key performance optimization. Turing requests the ensemble configuration from the rules engine before models have completed their inference, even though the configuration is only needed later when combining model outputs. This parallelization minimizes latency on the critical path. The decision to dispatch to all models regardless of whether they contribute to the final response trades compute resources for consistent, predictable latency and robust fallback behavior.

## Scale & Performance

While the article does not provide extensive quantitative metrics, several performance characteristics are highlighted. The rule engine timeout is configured at 100ms in the provided example, indicating the expected latency budget for treatment assignment decisions. Turing is described as providing "low-latency, high-throughput traffic routing" with support for an unlimited number of ML models, though specific throughput numbers are not disclosed.

The system is designed to handle mission-critical applications at Gojek, specifically mentioned are the pricing engine and driver dispatch system—two of their largest ML systems. These systems represent core business functions where latency and reliability are paramount. The fact that Turing was designed to replace custom-built experimentation systems in these applications suggests it meets stringent performance requirements.

The deployment model with single-tenant clusters per use case provides natural scaling boundaries. Each cluster can be sized and auto-scaled independently based on the traffic patterns for that specific application. This approach avoids the noisy neighbor problems that could arise in a multi-tenant architecture while providing clear capacity planning boundaries.

The article mentions future performance optimization possibilities, including moving extensions in-process to minimize network hop latencies, and potentially embedding Turing's routing logic directly into Gojek's Kubernetes service mesh (based on Istio) to save additional hops. These considerations suggest that while current performance is acceptable, Gojek is thinking about how to optimize further as they scale to more demanding use cases.

## Trade-offs & Lessons

Gojek made several notable architectural decisions that reflect thoughtful trade-offs. The single-tenant deployment model for router clusters provides strong isolation and simplified configuration but requires managing multiple clusters instead of a single multi-tenant platform. This trade-off prioritizes reliability and operational clarity over resource efficiency, appropriate for systems handling critical business functions like pricing and dispatch.

The decision to query all models in parallel regardless of treatment assignment is another instructive trade-off. This approach consumes more compute resources and model serving capacity than necessary for any single request. However, it provides consistent latency characteristics and enables immediate fallback to default responses without additional round trips when primary models fail or timeout. For mission-critical systems where reliability and predictable latency matter more than marginal compute costs, this is a sound engineering choice.

The separation of concerns between Turing (routing and experimentation), Merlin (model deployment), Feast (feature serving), and Litmus (experiment management) reflects a microservices philosophy. Each component has a focused responsibility and can evolve independently. However, this also means managing multiple systems and their integrations. The tight coupling through shared preprocessing pipelines and standardized interfaces helps mitigate integration complexity.

The tracking ID mechanism for correlating predictions with outcomes is elegant but requires client cooperation. Clients must correctly log outcomes with tracking IDs for the measurement loop to close. This design pushes responsibility to client teams, which could be a source of data quality issues if not properly instrumented. However, it also provides flexibility for clients to define what constitutes an outcome and when to measure it, which varies across different use cases.

Gojek's recognition that configuration changes requiring redeployment (for extension points and model endpoints) versus those that don't (rule changes, model version updates behind endpoints) shows mature thinking about operational flexibility. By ensuring that the most frequent changes—experiment rule adjustments and model iterations—can occur without downtime, they've optimized for the common case while accepting the need for redeployment for structural changes.

The platform is explicitly designed with extension points that anticipate more sophisticated use cases. Support for contextual bandits, switchback experiments, and circuit breakers can be implemented through the rule engine and ensembler without fundamental architectural changes. This forward-looking design suggests Gojek learned from their custom-built systems that rigidity in experimentation frameworks creates bottlenecks as ML sophistication grows.

The integration strategy with existing platform components demonstrates the value of building on stable foundations. By reusing the preprocessing system from Merlin and integrating with Feast and Litmus rather than reinventing these capabilities, Turing could focus on its core routing and experimentation logic. This approach reduces the surface area for new bugs and provides familiar interfaces to data scientists already using the broader platform.

The article notes that Turing is "very young" and used on a small number of projects as of publication, with plans to expand to larger systems. This phased rollout approach—validating the architecture on smaller projects before migrating critical systems—reflects engineering prudence. The mention of future improvements like better UI integration and potential service mesh embedding indicates Gojek views Turing as an evolving platform that will be refined based on operational experience.

For practitioners building similar systems, Gojek's approach offers several lessons: the importance of comprehensive logging with correlation IDs for measuring real outcomes, the value of parallel model querying for reliable fallbacks, the need to support sophisticated experimentation beyond simple A/B tests, and the benefit of building extension points that allow customization without forking core logic. The tight integration with feature stores and model deployment systems also highlights that online experimentation cannot be treated in isolation but must be part of a cohesive MLOps platform.
