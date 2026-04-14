---
title: "Unveiling the Core of Instacart’s Griffin 2.0: A Deep Dive into the Model Serving Platform"
slug: "instacart-griffin-20-unveiling-the-core-of-instacarts-griffin-20-a-deep-dive-into-the-model-serving-platform"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "workflow-automation"
  - "airflow"
  - "docker"
  - "terraform"
  - "ab-testing"
  - "deployment"
  - "feature-engineering"
  - "serving"
industryTags: "e-commerce"
company: "Instacart"
companySlug: "instacart"
platformName: "Griffin 2.0"
contentType: "blog"
summary: "Instacart evolved their model serving infrastructure from Griffin 1.0 to Griffin 2.0 by building a unified Model Serving Platform (MSP) to address critical performance and operational inefficiencies. The original system relied on team-specific Gunicorn-based Python services, leading to code duplication, high latency (P99 accounting for 15% of ads serving latency), inefficient memory usage due to multi-process model loading, and significant DevOps overhead. Griffin 2.0 consolidates model serving logic into a centralized platform built in Golang, featuring a Proxy for intelligent routing and experimentation, Workers for model inference, a Control Plane for deployment management, and integration with a Model Registry. This architectural shift reduced P99 latency by over 80%, decreased model serving's contribution to ads latency from 15% to 3%, substantially lowered EC2 costs through improved memory efficiency, and reduced model launch time from weeks to minutes while making experimentation, feature loading, and preprocessing entirely configuration-driven."
link: "https://tech.instacart.com/unveiling-the-core-of-instacarts-griffin-2-0-a-deep-dive-into-the-model-serving-platform-4a7298c0a54e"
year: 2024
seo:
  title: "Instacart: Unveiling the Core of Instacart’s Griffin 2.0: A Deep Dive into the Model Serving Platform - ZenML MLOps Database"
  description: "Instacart evolved their model serving infrastructure from Griffin 1.0 to Griffin 2.0 by building a unified Model Serving Platform (MSP) to address critical performance and operational inefficiencies. The original system relied on team-specific Gunicorn-based Python services, leading to code duplication, high latency (P99 accounting for 15% of ads serving latency), inefficient memory usage due to multi-process model loading, and significant DevOps overhead. Griffin 2.0 consolidates model serving logic into a centralized platform built in Golang, featuring a Proxy for intelligent routing and experimentation, Workers for model inference, a Control Plane for deployment management, and integration with a Model Registry. This architectural shift reduced P99 latency by over 80%, decreased model serving's contribution to ads latency from 15% to 3%, substantially lowered EC2 costs through improved memory efficiency, and reduced model launch time from weeks to minutes while making experimentation, feature loading, and preprocessing entirely configuration-driven."
  canonical: "https://www.zenml.io/mlops-database/instacart-griffin-20-unveiling-the-core-of-instacarts-griffin-20-a-deep-dive-into-the-model-serving-platform"
  ogTitle: "Instacart: Unveiling the Core of Instacart’s Griffin 2.0: A Deep Dive into the Model Serving Platform - ZenML MLOps Database"
  ogDescription: "Instacart evolved their model serving infrastructure from Griffin 1.0 to Griffin 2.0 by building a unified Model Serving Platform (MSP) to address critical performance and operational inefficiencies. The original system relied on team-specific Gunicorn-based Python services, leading to code duplication, high latency (P99 accounting for 15% of ads serving latency), inefficient memory usage due to multi-process model loading, and significant DevOps overhead. Griffin 2.0 consolidates model serving logic into a centralized platform built in Golang, featuring a Proxy for intelligent routing and experimentation, Workers for model inference, a Control Plane for deployment management, and integration with a Model Registry. This architectural shift reduced P99 latency by over 80%, decreased model serving's contribution to ads latency from 15% to 3%, substantially lowered EC2 costs through improved memory efficiency, and reduced model launch time from weeks to minutes while making experimentation, feature loading, and preprocessing entirely configuration-driven."
mlops:
  source: "sqlite"
  entryId: 207
  sourceUrl: "https://tech.instacart.com/unveiling-the-core-of-instacarts-griffin-2-0-a-deep-dive-into-the-model-serving-platform-4a7298c0a54e"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.618011"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Instacart's journey from Griffin 1.0 to Griffin 2.0 was motivated by fundamental challenges in their model serving infrastructure that affected performance, operational efficiency, and developer experience. The original Griffin 1.0 system required each team to implement custom model serving services based on the Gunicorn framework, creating several critical pain points.

The most significant issue was code duplication and fragmentation. Common functionality like feature loading, feature preprocessing, model experimentation, monitoring, and feature logging was re-implemented across multiple teams' services. This approach created three major problems: it represented an inefficient use of developer time since logic that could be consolidated and reused was instead written multiple times; each team had to manage its own codebase and service infrastructure, creating substantial DevOps overhead; and there was no standardized, straightforward path for deploying new models or conducting model experimentation, which degraded the experience for machine learning engineers.

Performance and resource utilization presented equally concerning challenges. The Gunicorn framework and Python's interpreted nature led to unsatisfactory latency and resource consumption. A concrete example from the Ads team's click-through-rate prediction model demonstrated that P99 latency for model serving accounted for 15% of the entire ads serving latency. The Gunicorn architecture compounded resource problems by forking multiple worker processes to handle concurrent requests, with each process loading its own copy of the model. This resulted in a memory footprint that scaled linearly with the number of worker processes, creating unnecessary resource waste.

The model deployment and experimentation workflow lacked the self-service capabilities that machine learning engineers needed. Teams couldn't easily version models, conduct A/B tests, or roll back to previous versions without significant engineering effort. The monitoring landscape was fragmented, with each team responsible for implementing and maintaining their own monitoring solutions rather than benefiting from a unified observability approach.

## Architecture & Design

Griffin 2.0's Model Serving Platform (MSP) introduces a sophisticated four-component architecture designed to centralize model serving while maintaining flexibility for experimentation and customization. The system comprises the Proxy, Worker, Control Plane, and Model Registry, each serving distinct but interconnected roles.

The Proxy component serves as the intelligent routing layer for the entire platform. It maintains two critical configurations: a routing configuration that specifies which worker should handle scoring requests for specific items by identifying worker endpoint aliases, and a worker configuration that defines the mapping between worker endpoint aliases and their corresponding URLs. The separation of these configurations is a deliberate design decision—routing config is environment-agnostic and defined at the application layer, while worker config is environment-specific and defined at the physical layer. This separation enables teams to maintain consistent routing logic across development, staging, and production environments while allowing infrastructure details to vary appropriately.

When a model serving request arrives at the Proxy for a specific model, the routing logic evaluates whether an experiment is active. Without an experiment, the routing config directs requests to the default worker endpoint for that model version. When experiments are running, the routing config defines the complete experimental setup, including the key used for distributing items across experiment arms. This enables sophisticated A/B testing where different items in the same request batch can be routed to different model versions. After workers return their predictions, the Proxy merges responses, ensures predictions appear in the same order as the original request, and returns the consolidated response to the client.

Worker services represent the inference execution layer. Each worker, deployed as an Amazon ECS service, operates a single model in a multi-container architecture. This single-tenancy design contrasts with potential multi-tenancy approaches and was chosen deliberately for better failure isolation on a per-model basis and faster worker restarts since only one model needs loading. The multi-container architecture separates concerns: a sidecar container (using TensorFlow Serving image for TensorFlow models) loads and hosts the model, while the main container handles request acceptance, feature loading, feature preprocessing, request construction to the sidecar, and feature logging. This design maintains framework flexibility—while TensorFlow is currently the primary supported framework, the architecture can accommodate PyTorch and other frameworks in the future.

The Control Plane manages the entire model deployment lifecycle. When machine learning engineers deploy a worker for the first time, the Control Plane automatically generates the necessary worker configuration, enabling the Proxy to route requests appropriately. The Control Plane provides a UI for model registration and deployment, making the process self-service for machine learning engineers. It also supports integration with custom training pipelines, which can publish models and trigger worker redeployment automatically upon successful model promotion.

The Model Registry stores model artifacts securely in S3. Each artifact contains not just the model itself but also configuration files for feature loading and feature preprocessing. Workers download these artifacts during initialization, deserializing configurations and applying them during the feature loading and preprocessing steps.

## Technical Implementation

The platform's technical implementation reflects careful technology choices optimized for performance, maintainability, and developer experience. The most significant technology decision was rebuilding the core serving infrastructure in Golang rather than continuing with Python and Gunicorn. Golang's compiled nature and superior concurrency model make it better suited for high-concurrency online systems. The language's goroutines enable efficient handling of concurrent requests without the multi-process overhead that plagued the Gunicorn-based system.

The interface design for the Proxy is intentionally application-agnostic, using Protocol Buffers for type-safe communication. The ProxyRequest contract includes fields for model_use_case_name, shared_features, feature_data_frame, and query_data_frame. The WorkerRequest contract is nearly identical, differing only in the absence of model_use_case_name since the worker already knows which model it serves. This design reduces data redundancy while structuring information logically. The shared_features field allows features common across all items in a batch to be specified once rather than repeated. This API design also simplifies testing—machine learning engineers can send requests directly to workers during initial onboarding to verify end-to-end functionality and measure performance, then switch to routing through the Proxy for production experimentation.

Feature management represents a sophisticated aspect of the implementation. The feature location config, serialized as a Protobuf file and embedded in model artifacts, allows model owners to declaratively specify which features come from the real-time inference request versus which must be fetched from the feature store. The worker deserializes this config and applies it during feature loading. For example, simple features like product_id and search_term might come directly from the request, while derived features like product_id_search_term_l90d_ctr require lookup from the ML feature store using the request features as keys.

Feature preprocessing utilizes a unified preprocessor library written in Python that serves both training and serving purposes across Instacart. The feature preprocessor config defines directed acyclic graphs (DAGs) for applying preprocessors to features. Like the feature location config, this is serialized as a Protobuf file within the model artifact. Workers deserialize and apply this config during the preprocessing step. This approach provides multiple benefits: the preprocessor library is algorithm framework agnostic, working with TensorFlow, PyTorch, and other frameworks; feature preprocessing remains consistent between training and serving across the organization; and Python's familiarity among machine learning engineers enables rapid prototyping.

Batching is implemented as a configurable mechanism to reduce long tail latency, particularly at P99. Batch size can be tuned on a per-worker or per-model basis through the batch_size parameter in worker configuration, allowing optimization based on specific model characteristics and latency requirements.

The monitoring infrastructure leverages multiple tools for different purposes. Datadog provides real-time monitoring for both Proxy and Worker components. Proxy metrics are shared across all workers, while worker-specific metrics and alerts are automatically created when a worker service is first deployed—the model deployment workflow calls Datadog APIs to provision these resources without manual intervention. For model performance monitoring, Instacart uses Arize. The platform logs features (both pre-processed and post-processed versions), inference results, model names, and versions to a near-real-time data pipeline. For the Ads team's predictive click-through-rate model, this logged data is periodically pumped into Arize alongside feature data and actual ad click data from the training pipeline. Arize compares these sources to provide prediction accuracy metrics, prediction score distributions, discrepancies between serving and training features, and data drift analysis over time.

Model version discrepancy mitigation occurs through tight integration between the Control Plane and worker lifecycle management. Previously, teams needed custom Airflow jobs to restart model serving services after model promotion, and the multi-model nature of those services made restarts slow, extending the period of version inconsistency. With MSP's single-tenancy design and automatic worker relaunch upon model promotion, version discrepancy is substantially reduced.

## Scale & Performance

The performance improvements from migrating to Griffin 2.0's MSP are substantial and measurable. The most dramatic improvement appeared in latency metrics for the Ads team's predictive click-through-rate model. P99 latency decreased by over 80% when measured on the MSP client side compared to the Gunicorn-based service. This reduction translated to model prediction latency accounting for only 3% of total ads serving latency, down from 15% in the previous system. P50 latency also improved by over 80%, indicating improvements across the latency distribution rather than just tail latencies.

Memory efficiency gains were equally significant. The Golang concurrency model enables each worker instance to load only one copy of a given model, regardless of how many concurrent requests it handles. This contrasts sharply with the Gunicorn approach where each worker process maintained its own model copy. The result is a dramatically reduced memory footprint that enabled substantial EC2 cost savings, though specific dollar amounts aren't disclosed in the source.

Operational efficiency saw transformational improvements in time-to-deployment. The platform reduced the time to launch an ML model from weeks to minutes. This acceleration comes from the combination of self-service deployment through the Control Plane UI, automatic worker configuration generation, and automatic provisioning of monitoring infrastructure. Machine learning engineers no longer need to write deployment code, configure infrastructure, or set up monitoring—these tasks are handled automatically by the platform.

The configuration-driven approach to model experimentation, feature loading, and feature preprocessing eliminates custom code requirements for these common operations. This standardization not only accelerates development but also reduces the surface area for bugs and inconsistencies between teams.

## Trade-offs & Lessons

The architectural decisions in Griffin 2.0 reflect deliberate trade-offs that favor consolidation, standardization, and performance over maximum flexibility for individual teams. The choice of single-tenancy for workers over multi-tenancy represents one such trade-off. While multi-tenancy could theoretically enable higher resource utilization by packing multiple models onto the same infrastructure, single-tenancy provides superior failure isolation, faster restarts, and simpler implementation. The team judged these benefits to outweigh the potential resource efficiency gains of multi-tenancy.

The multi-container architecture for workers introduces some complexity compared to a single-container approach, but this complexity buys framework flexibility. By isolating the model serving runtime in a sidecar container, the main container's logic remains framework-agnostic. Currently focused on TensorFlow Serving, this design will accommodate PyTorch and other frameworks without requiring fundamental architectural changes.

The decision to separate routing config from worker config demonstrates thoughtful consideration of how configuration evolves across environments. By making routing logic environment-agnostic and keeping only infrastructure details environment-specific, the platform enables teams to define their routing and experimentation logic once while deploying across multiple environments. This reduces configuration drift and makes it easier to reason about how traffic flows in production.

The choice to build the unified preprocessor library in Python rather than Golang acknowledges the reality of machine learning engineering teams' skillsets and workflows. While Golang powers the serving infrastructure for performance, Python remains the language where machine learning engineers prototype and develop feature transformations. By supporting Python for preprocessing while ensuring consistency between training and serving through shared code, the platform meets practitioners where they are while maintaining the benefits of standardization.

The configuration-driven approach to feature loading, preprocessing, and experimentation represents a shift from code to configuration as the primary interface for machine learning engineers. This trade-off reduces flexibility—teams can't implement arbitrary custom logic without extending the platform—but dramatically improves consistency, reduces bugs, and accelerates iteration. The team made this interface less programmable but more accessible and reliable.

The automatic provisioning of monitoring through Datadog API integration during worker deployment demonstrates the value of treating monitoring as a first-class platform concern rather than leaving it to individual teams. This approach ensures comprehensive observability without requiring manual setup for each new model, but it does mean teams must work within the platform's monitoring paradigm rather than crafting custom solutions.

The integration with Arize for model performance monitoring reflects an emerging best practice: separating operational monitoring (latency, throughput, errors) from model quality monitoring (prediction accuracy, data drift, training-serving skew). Using specialized tools for each concern provides better insights than attempting to build all monitoring capabilities in-house.

The move from weeks to minutes for model deployment validates the platform approach. By centralizing common infrastructure and making it self-service through configuration and UI, the platform eliminates weeks of engineering work that previously went into custom deployment code, infrastructure provisioning, and monitoring setup. This acceleration in deployment velocity enables faster experimentation and iteration on models.

Looking forward, the team plans to expand framework support beyond TensorFlow to include PyTorch and others, validating that the multi-container architecture provides the flexibility they anticipated. They also plan to support adaptive experimentation in addition to traditional static experiments, suggesting they're moving toward more sophisticated allocation algorithms that can optimize experiment assignments based on accumulating data rather than fixed assignment probabilities.

The Griffin 2.0 case study demonstrates that consolidating model serving infrastructure, even at the cost of some flexibility for individual teams, can deliver substantial benefits in performance, cost, and operational efficiency while improving rather than degrading the developer experience through thoughtful interface design and automation.
