---
title: "LyftLearn Serving: decentralized microservice model serving for hundreds of millions of real-time predictions per day"
slug: "lyft-lyftlearn-lyftlearn-serving-decentralized-microservice-model-serving-for-hundreds-of-millions-of-real-time-predicti"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "docker"
  - "kubernetes"
  - "mlflow"
  - "terraform"
  - "deployment"
  - "model-evaluation"
  - "serving"
industryTags: "automotive"
company: "Lyft"
companySlug: "lyft"
platformName: "LyftLearn"
contentType: "blog"
summary: "Lyft built LyftLearn Serving to power hundreds of millions of real-time ML predictions daily across diverse use cases including price optimization, driver incentives, fraud detection, and ETA prediction. The platform addressed challenges from their legacy monolithic serving system that created library conflicts, deployment bottlenecks, and unclear ownership across teams. LyftLearn Serving provides a decentralized microservice architecture where each team gets isolated GitHub repositories with independent deployment pipelines, library versions, and runtime configurations. The system launched internally in March 2022, successfully migrated models from the legacy system, and now serves over 40 teams with requirements spanning single-digit millisecond latency to over one million requests per second throughput."
link: "https://eng.lyft.com/powering-millions-of-real-time-decisions-with-lyftlearn-serving-9bb1f73318dc"
year: 2023
seo:
  title: "Lyft: LyftLearn Serving: decentralized microservice model serving for hundreds of millions of real-time predictions per day - ZenML MLOps Database"
  description: "Lyft built LyftLearn Serving to power hundreds of millions of real-time ML predictions daily across diverse use cases including price optimization, driver incentives, fraud detection, and ETA prediction. The platform addressed challenges from their legacy monolithic serving system that created library conflicts, deployment bottlenecks, and unclear ownership across teams. LyftLearn Serving provides a decentralized microservice architecture where each team gets isolated GitHub repositories with independent deployment pipelines, library versions, and runtime configurations. The system launched internally in March 2022, successfully migrated models from the legacy system, and now serves over 40 teams with requirements spanning single-digit millisecond latency to over one million requests per second throughput."
  canonical: "https://www.zenml.io/mlops-database/lyft-lyftlearn-lyftlearn-serving-decentralized-microservice-model-serving-for-hundreds-of-millions-of-real-time-predicti"
  ogTitle: "Lyft: LyftLearn Serving: decentralized microservice model serving for hundreds of millions of real-time predictions per day - ZenML MLOps Database"
  ogDescription: "Lyft built LyftLearn Serving to power hundreds of millions of real-time ML predictions daily across diverse use cases including price optimization, driver incentives, fraud detection, and ETA prediction. The platform addressed challenges from their legacy monolithic serving system that created library conflicts, deployment bottlenecks, and unclear ownership across teams. LyftLearn Serving provides a decentralized microservice architecture where each team gets isolated GitHub repositories with independent deployment pipelines, library versions, and runtime configurations. The system launched internally in March 2022, successfully migrated models from the legacy system, and now serves over 40 teams with requirements spanning single-digit millisecond latency to over one million requests per second throughput."
mlops:
  source: "sqlite"
  entryId: 84
  sourceUrl: "https://eng.lyft.com/powering-millions-of-real-time-decisions-with-lyftlearn-serving-9bb1f73318dc"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061223"
  lastUpdated: "2026-04-14T19:55:00.943065"
---

## Problem Context

Lyft faces the challenge of making hundreds of millions of real-time machine learning decisions every day across a diverse portfolio of use cases. These decisions span price optimization for rides, incentives allocation for drivers, fraud detection, ETA prediction, and numerous other critical business functions that directly impact rider experience and driver earnings. The complexity of serving ML models at this scale manifests across two distinct operational planes.

The data plane encompasses steady-state concerns like network traffic management, CPU and memory consumption optimization, and model inference execution. The control plane involves dynamic aspects including model deployment and undeployment, retraining workflows, model naming and versioning schemes, experimentation frameworks, and backward compatibility guarantees. Managing both planes simultaneously while serving diverse teams creates significant technical challenges.

Lyft faced two primary categories of obstacles. First, the variety of user requirements across different teams created a vast operational envelope. Some teams required extremely tight latency constraints in the single-digit millisecond range, while others needed high throughput exceeding one million requests per second. Teams also demanded the ability to use niche ML libraries, support for continual learning workflows, and other specialized capabilities. Meeting all these requirements simultaneously in a unified platform presented substantial engineering challenges.

Second, Lyft operated a legacy monolithic serving system that imposed severe constraints despite satisfying some initial use cases. The monolithic design restricted which libraries and versions different teams could use for their models. This architectural limitation created operational problems where unrelated teams would block each other from deploying their models. When incidents occurred, ownership was unclear, making troubleshooting and resolution difficult. The monolithic approach fundamentally could not scale to support the growing diversity of ML applications across the organization.

## Architecture & Design

LyftLearn Serving implements a microservice architecture that aligns with Lyft's broader engineering practices and leverages existing infrastructure investments. The core design philosophy centers on providing complete independence to each team while maintaining platform-level consistency and reliability.

The primary microservice runtime consists of several layers working in concert. At the foundation sits an HTTP serving layer powered by Flask with internal fine-tuning optimizations specifically designed to work efficiently with the Envoy load balancer and the underlying Gunicorn web server. This layer handles incoming network requests and routes them through the serving pipeline.

The core LyftLearn Serving library contains the essential business logic of the platform. This library manages critical capabilities including model loading and unloading, model versioning, request handling, model shadowing for safe rollouts, model monitoring and observability, and prediction logging for downstream analysis. The library abstracts away complexity while exposing necessary controls to ML practitioners.

A crucial architectural decision was enabling custom ML prediction code through a flexible Python interface. ML modelers implement two key functions: `load` and `predict`. The load function is invoked whenever a model needs to be loaded into memory, handling deserialization of the ML model object from the file saved during training. The predict function handles online inference and is called at the frequency of incoming requests to the serving microservice. This dependency injection pattern allows the platform to remain generic while supporting arbitrary custom logic.

The architecture places no restrictions on third-party ML frameworks. Teams use TensorFlow, PyTorch, LightGBM, XGBoost, proprietary frameworks, or any other library with a Python interface. This flexibility proved essential for supporting diverse use cases across the organization.

Beyond the core serving components, the runtime integrates deeply with Lyft's microservices ecosystem. The system implements interfaces for metrics collection, logging, distributed tracing, analytics events, and comprehensive model monitoring. The entire runtime operates on Lyft's compute infrastructure, which uses the Envoy service mesh for networking and the Kubernetes scheduler for orchestration.

### Isolation and Ownership Model

One of the most architecturally significant decisions was providing complete independence at the GitHub repository level. Each team using LyftLearn Serving receives their own isolated code repository. Depending on complexity, a team may use one repository or distribute their ML models across multiple repositories. This isolation strategy leverages Lyft's existing tooling for creating dedicated services from repositories.

Isolated repositories establish clear ownership boundaries. Each repository unambiguously identifies the owning team, clarifying responsibility for library updates, toolchain maintenance, and on-call escalation paths. While this pattern aligns with Lyft's broader microservices conventions, it represents a departure from centralized serving systems common in the industry.

The isolation extends to deployment pipelines. Each team operates a bespoke deployment pipeline with independent staging and production publishing. When one team encounters a bug that breaks their deployment pipeline, no other team is blocked. Reverting changes impacts only the affected team's resources, limiting blast radius during incidents.

Runtime isolation occurs through the Envoy service mesh and Kubernetes orchestration via dedicated network mesh naming. Each team independently tunes container CPU and memory resources, pod replica counts, autoscaling targets, and production alarms. This separation reduces complexity in achieving reproducible performance and predictable behavior.

### Configuration Generation

The platform employs a configuration generator based on the Yeoman framework to dramatically reduce onboarding friction. Stitching together the various libraries and infrastructure components requires considerable application configuration across multiple formats including Terraform, YAML, Salt, Python, and JSON. Rather than expecting ML modelers to understand these intricacies, the generator produces a complete application configuration automatically.

When an ML modeler onboards to LyftLearn Serving for the first time, they run the generator, answer a few questions, and receive a fully populated GitHub repository with functional code and configuration. The generated repository includes working examples demonstrating how to write custom inference code and satisfy LyftLearn Serving interfaces. The configuration contains necessary runtime secrets, database entries, and other details required for correct operation. Once the generated code is merged and deployed, the customer has a fully working LyftLearn Serving microservice ready to load models and process requests.

## Technical Implementation

The serving infrastructure builds on Flask and Gunicorn for the HTTP layer, with customizations optimized for Lyft's specific networking environment. When an inference request arrives, it follows a well-defined processing path. An example request might specify a model_id like "driver_model_v2" along with a features dictionary containing the input data. The features can include simple values or nested structures depending on the model's requirements.

The HTTP request is received by the Flask/Gunicorn server. The view function for the inference route, provided in the LyftLearn Serving core library, first retrieves the model by the specified model_id. The platform executes several critical tasks including input feature validation to ensure data quality and model shadowing to enable safe rollouts of new model versions alongside existing production models.

Next, the dependency-injected custom ML predict code executes. This custom code typically preprocesses input features and makes predictions using the underlying third-party ML library's prediction interfaces, such as LightGBM's predict function. After obtaining the prediction output, additional platform code emits statistics, logs, and analytics events tracking the performance and correctness of predictions. Finally, the prediction output is returned to the caller in an HTTP response.

### Model Self-Tests

LyftLearn Serving implements a unique testing approach called model self-tests to ensure correctness despite continuous changes in the control plane. Dependency versions, container images, and other environmental factors can break model backward compatibility. Model self-tests provide guarantees that models continue working as expected.

ML modelers specify a small set of sample inputs and expected outputs in a `test_data` function. This test data is saved and packaged alongside the model binary itself. The platform runs small predictions using this test data and verifies that actual results fall within acceptable ranges of expected results.

Model self-tests execute in two distinct contexts. First, at runtime in LyftLearn Serving instances, after loading every model, the system evaluates test_data and generates logs and metrics for ML modelers to address any failures. Second, whenever a new pull request is created, continuous integration evaluates all models loaded in a LyftLearn model repository against the previously stored test data. This dual execution catches issues both during deployment and development.

### Developer Experience

Documentation serves as a first-class citizen in the LyftLearn Serving project. The documentation follows the Diátaxis framework, organizing content into four modes: tutorials, how-to guides, technical references, and discussions. A new ML modeler unfamiliar with online model inference might start with "Tutorials > Getting Started," while an experienced modeler looking to shadow a new model would consult "How-to Guides > How to Enable Model Shadowing."

The platform provides two primary interfaces for modifying the runtime: the model repository and the LyftLearn UI. The LyftLearn UI is an ML computation web application that modelers use for model iteration and management. The UI enables one-click deployments and monitoring, while the model repository allows manipulation of deployment pipelines and model CI/CD workflows. This duality of interfaces enables different types of ML practitioners, from software engineers to data scientists, to use modes most suitable for their skills and workflows.

## Scale & Performance

LyftLearn Serving processes hundreds of millions of real-time predictions daily across Lyft's operations. The platform must accommodate a wide range of performance requirements across different use cases. Some applications require extremely tight latency limits in the single-digit millisecond range, critical for real-time decision making in the rider and driver experience. Other applications prioritize throughput, handling over one million requests per second.

The platform launched internally at Lyft in March 2022 and quickly scaled to support over 40 teams across the organization. Each team operates independently with their own deployment cadence, library versions, and runtime configurations. The migration from the legacy monolithic system to LyftLearn Serving completed rapidly using various techniques, though the specific migration details were not elaborated in this publication.

The Kubernetes-based infrastructure provides autoscaling capabilities, allowing each team to independently configure pod replica counts and autoscaling targets based on their traffic patterns. The Envoy service mesh handles load balancing and traffic management across instances. The combination of Kubernetes orchestration and Envoy networking provides the foundation for achieving the scale and performance requirements across diverse use cases.

## Trade-offs & Lessons

The LyftLearn Serving team identified five key design axioms that guided development: model serving as a library, distributed serving service ownership, seamless integrations with the development environment, user-supplied prediction code, and first-class documentation. These principles sometimes conflicted, requiring deliberate trade-offs.

One major trade-off involved balancing seamless end-to-end user experience for new customers against composable intermediary APIs for power users. Another tension existed between enabling bespoke ML workflows for each team versus enforcing rigor of software engineering best practices. The team made case-by-case decisions based on user behavior and feedback rather than applying blanket policies.

The distributed ownership model, while providing excellent isolation and independence, comes with overhead. Each team maintains their own repository, deployment pipeline, and runtime configuration. This creates more operational surface area compared to a centralized model where one team manages everything. However, the team determined that the benefits of clear ownership, independent deployment, and runtime isolation outweighed the coordination costs.

Several important lessons emerged from building LyftLearn Serving. First, the term "model" requires careful definition in every conversation. Model can refer to source code, collections of weights, files in S3, model binaries, or other artifacts. Establishing canonical definitions upfront prevents miscommunication and confusion.

Second, user-facing documentation proved critical for adoption. For platform products, thorough and clear documentation enables teams to understand systems and self-onboard effectively, dramatically reducing support overhead for the platform team. The investment in the Diátaxis-structured documentation paid dividends in adoption velocity.

Third, the team learned to expect model serving requests to be used indefinitely. Once a model serves inference requests behind a network endpoint, it typically runs indefinitely. This reality demands building serving systems that are stable and perform well from the start. Conversely, migrating old models to new serving systems can be incredibly challenging, making it essential to get the architecture right early.

Fourth, hard trade-offs are inevitable in platform development. The team faced numerous decisions about prioritizing different user segments, balancing flexibility against standardization, and choosing between competing technical approaches. User feedback and behavior patterns informed these decisions rather than theoretical preferences.

Finally, aligning vision with power customers proved essential. The team prioritized stability, performance, and flexibility above all else based on power user requirements. They embraced "boring technology" that worked reliably rather than chasing novelty. This pragmatic approach delivered a platform that met actual needs rather than hypothetical ideals.

The distributed microservice architecture represents a deliberate departure from centralized serving platforms common in the industry. By leveraging Lyft's existing microservices tooling and conventions, LyftLearn Serving achieved rapid adoption and operational maturity. The platform demonstrates that decentralization can work effectively for ML serving when properly architected with clear ownership boundaries, strong developer experience, and comprehensive platform support.
