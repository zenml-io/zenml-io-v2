---
title: "Pro-ML Model Health Assurance for monitoring drift and performance across hundreds of production AI models"
slug: "linkedin-pro-ml-pro-ml-model-health-assurance-for-monitoring-drift-and-performance-across-hundreds-of-production-ai-mode"
draft: false
mlopsTags:
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "spark"
  - "deployment"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "LinkedIn"
companySlug: "linkedin"
platformName: "Pro-ML"
contentType: "blog"
summary: "LinkedIn developed a Model Health Assurance platform as a key component of their centralized Pro-ML machine learning platform to address the challenge of monitoring hundreds of production AI models across their infrastructure. The platform provides AI engineers with automated tools and systems for detecting model degradation, data drift, and performance issues during both training and inference phases, replacing the previous fragmented approach where individual teams built their own monitoring solutions. The system monitors feature drift, real-time feature distributions, and model inference latencies across dark canary, experimentation, and production phases, enabling teams to identify critical issues like unexpected zero feature values and distribution anomalies before they impact production traffic."
link: "https://engineering.linkedin.com/blog/2021/model-health-assurance-at-linkedin"
year: 2021
seo:
  title: "LinkedIn: Pro-ML Model Health Assurance for monitoring drift and performance across hundreds of production AI models - ZenML MLOps Database"
  description: "LinkedIn developed a Model Health Assurance platform as a key component of their centralized Pro-ML machine learning platform to address the challenge of monitoring hundreds of production AI models across their infrastructure. The platform provides AI engineers with automated tools and systems for detecting model degradation, data drift, and performance issues during both training and inference phases, replacing the previous fragmented approach where individual teams built their own monitoring solutions. The system monitors feature drift, real-time feature distributions, and model inference latencies across dark canary, experimentation, and production phases, enabling teams to identify critical issues like unexpected zero feature values and distribution anomalies before they impact production traffic."
  canonical: "https://www.zenml.io/mlops-database/linkedin-pro-ml-pro-ml-model-health-assurance-for-monitoring-drift-and-performance-across-hundreds-of-production-ai-mode"
  ogTitle: "LinkedIn: Pro-ML Model Health Assurance for monitoring drift and performance across hundreds of production AI models - ZenML MLOps Database"
  ogDescription: "LinkedIn developed a Model Health Assurance platform as a key component of their centralized Pro-ML machine learning platform to address the challenge of monitoring hundreds of production AI models across their infrastructure. The platform provides AI engineers with automated tools and systems for detecting model degradation, data drift, and performance issues during both training and inference phases, replacing the previous fragmented approach where individual teams built their own monitoring solutions. The system monitors feature drift, real-time feature distributions, and model inference latencies across dark canary, experimentation, and production phases, enabling teams to identify critical issues like unexpected zero feature values and distribution anomalies before they impact production traffic."
mlops:
  source: "sqlite"
  entryId: 44
  sourceUrl: "https://engineering.linkedin.com/blog/2021/model-health-assurance-at-linkedin"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.060785"
  lastUpdated: "2026-04-14T19:54:44.586455"
---

## Problem Context

LinkedIn operates hundreds of AI models in production as part of their centralized Pro-ML platform, which serves as the foundation for providing AI-powered experiences to members and customers. Before the Health Assurance platform was built, individual teams at LinkedIn had to develop their own monitoring systems and tools for ensuring model health, which significantly decreased AI engineer productivity and created fragmented approaches across the organization.

The fundamental challenge that motivated Health Assurance was the reality that offline testing alone cannot guarantee that ML models will perform well in live production settings. Several critical problems can emerge during the ML lifecycle that require continuous monitoring. During production inference, model performance can degrade when production data diverges from training data due to gradual changes in customer behavior, errors in upstream data pipelines spanning multiple teams, mismatches between feature generation code paths at training versus inference time, or inadequate training data curation that fails to represent actual product data. Additionally, the model serving infrastructure itself can experience performance degradation and miss SLAs around latency and query throughput.

The Health Assurance initiative aimed to platformize the provisioning of monitoring systems and tools that enable AI engineers to identify issues with productionized models faster and detect symptoms and root causes of underperforming models as early as possible, including in dark canary environments before models are ramped to full production traffic.

## Architecture & Design

The Health Assurance platform is built as a component within the broader Pro-ML ecosystem, integrating with several key Pro-ML concepts and systems. The Pro-ML platform defines pipelines as data flows connecting multiple steps for offline training and model publishing, with each step representing a logical unit of work. A model group contains published ML models intended to solve a particular problem, and services depend on specific model groups for inference. All pipeline executions generate AI metadata (AIM) that captures topology, configuration parameters, and artifacts, stored in the AIM store. The Workspace UI provides AI engineers with interfaces for managing platform activities backed by the AIM store.

Within the inference system architecture, the Health Assurance component is embedded directly into inference applications. This component generates real-time feature distributions and computes offline data drift metrics. The data flow for drift monitoring works by tracking feature values computed at inference time, then running a daily batch job that computes statistics on these values and pushes them to Pinot, LinkedIn's real-time analytics datastore. Pinot forwards these statistics to ThirdEye, LinkedIn's in-house alerting and monitoring system, which alerts users when significant changes in data distribution are detected.

For real-time monitoring, the system captures online feature distributions including system metrics like requests per second and performance latencies. It also tracks real-time distributions of numeric feature values. These metrics are aggregated through a custom-built Metrics Aggregator library using the HA agent, then passed to TSDS (Time Series Data System) for storage and querying. Visualization occurs through InGraphs, LinkedIn's internal real-time monitoring tool.

A critical architectural innovation is the Metrics Aggregator library, designed to solve the metric bloat problem. With approximately 1,000 models running on an average of 500 hosts across different regions, tracking 10 features per model with 5 metrics per feature would create 25 million metric keys in InGraphs. The Metrics Aggregator addresses this by recognizing that since feature distributions are captured at the model level, individual host information is irrelevant. The library aggregates events from different hosts into one metric per feature quantile by periodically emitting events to Kafka, aggregating them in Samza, and then posting the aggregated metrics to InGraphs.

## Technical Implementation

The Health Assurance platform leverages several specific technologies within LinkedIn's infrastructure stack. For real-time event streaming and aggregation, the system uses Kafka for event transport and Samza for stream processing to aggregate metrics across hosts. Pinot serves as the real-time analytics datastore for drift statistics, while ThirdEye provides alerting capabilities when anomalies are detected. The TSDS (Time Series Data System) stores time-series metrics for real-time monitoring, with InGraphs providing the visualization layer.

The implementation follows a configuration-driven approach to minimize onboarding complexity. Some capabilities like model inference latency monitoring are auto-configured and require no additional setup from AI engineers. Other capabilities, such as specifying which model features to track, require explicit configuration that AI engineers currently provide in their model training pipelines, with plans to migrate these configurations to the Workspace UI for easier management.

The monitoring implementation operates across three distinct deployment phases that models progress through. In the dark canary phase, models run without serving actual user traffic, allowing AI engineers to evaluate models by comparing feature distributions between training data and current inference data to catch inconsistencies before going live. The experimentation phase serves a small percentage of production traffic while monitoring various business and technical metrics, with feature distribution serving as a diagnostic tool when metrics drop. Finally, the MME (Majority Member Experience) phase represents full production with significant traffic, where InGraphs can detect sudden changes in feature distributions and trigger alerts.

## Scale & Performance

The Health Assurance platform operates at significant scale across LinkedIn's infrastructure. The Pro-ML platform hosts hundreds of AI models running in production, with the HA system designed to handle scenarios involving approximately 1,000 models deployed across an average of 500 hosts per model spanning multiple geographic regions. For each model, the system can track distributions for numerous features, with 10 features per model being a representative example.

The system captures multiple quantile metrics for model inference latency including mean, 50th percentile, 75th percentile, 90th percentile, and 99th percentile values. These granular latency measurements enable isolation of performance issues within specific phases of request processing, such as distinguishing between retrieval, ranking, and response decoration phases in search systems.

For real-time feature distribution monitoring, the system computes and sends sample quantiles for each numeric feature every minute to InGraphs for visualization. This provides near-real-time visibility into how feature values are changing as models serve production traffic. The daily batch jobs that compute drift statistics process all inference-time feature values accumulated over a 24-hour period to identify statistically significant distribution changes.

The Metrics Aggregator library's design specifically addresses the challenge of metric explosion that would otherwise create 25 million metric keys when tracking 5 metrics for 10 features across 1,000 models on 500 hosts each. By aggregating at the model level rather than the host level, the system reduces the metric cardinality dramatically while maintaining the necessary visibility into model behavior.

## Trade-offs & Lessons

The Health Assurance platform reveals several important trade-offs and lessons for building production ML monitoring systems. One critical insight is the value of embedded monitoring versus bolt-on solutions. By embedding the HA component directly into inference applications rather than building it as a separate system, LinkedIn achieved tighter integration with the model serving path and reduced latency overhead in metric collection.

The decision to implement configuration-driven onboarding represents a deliberate trade-off between flexibility and ease of use. Auto-configuring common monitoring capabilities like inference latency reduces friction for teams getting started, while allowing optional configuration for feature-specific tracking provides the flexibility needed for diverse model types. The planned migration of configuration from training pipelines to the Workspace UI demonstrates the team's commitment to continuously improving developer experience.

The metric bloat problem and its solution through the Metrics Aggregator library illustrates a crucial lesson about designing monitoring systems for scale. A naive implementation that tracked metrics at the host level would have been operationally untenable with 25 million metric keys. Recognizing that aggregation at the model level was sufficient for the use cases being served allowed the team to build a sustainable architecture. This required careful thinking about what granularity of data was actually needed to answer diagnostic questions versus what seemed initially useful to collect.

The phased deployment approach (dark canary, experimentation, MME) demonstrates the value of progressive validation for ML models. By catching issues in dark canary environments before serving real traffic, teams can identify problems like feature generation bugs or infrastructure mismatches without user impact. The system's early successes in identifying critical issues validate this approach—teams discovered features showing up as unexpected zeros or unexpectedly large values that would have caused production incidents if not caught early.

The integration with existing LinkedIn infrastructure like Kafka, Samza, Pinot, ThirdEye, and InGraphs rather than building everything from scratch represents a pragmatic architectural choice. Leveraging proven platforms for streaming, storage, alerting, and visualization allowed the HA team to focus on the ML-specific logic while benefiting from the scalability and reliability of established systems. However, this also creates coupling to LinkedIn's internal infrastructure that would make the solution harder to replicate in other environments.

An important lesson emerging from the implementation is that data drift monitoring requires careful design of what to measure and how to alert. The system monitors both input features and prediction variables, comparing distributions across any two time periods from training time to current inference time. The categorization of feature drift according to feature importance helps AI engineers prioritize investigation efforts when multiple features show drift simultaneously, rather than overwhelming them with undifferentiated alerts.

The real-time feature distribution monitoring addresses a use case that offline validation cannot handle—detecting issues that emerge only under actual production traffic patterns and data characteristics. The minute-level granularity of quantile metrics provides rapid feedback when feature distributions shift unexpectedly, enabling fast detection and response to upstream data pipeline failures or sudden changes in user behavior.

The acknowledgment that Health Assurance is "still in the development phase" despite already identifying major production issues reflects the reality that comprehensive ML monitoring is an evolving discipline rather than a solved problem. The team's willingness to share learnings publicly while continuing to develop new capabilities demonstrates a mature approach to building infrastructure, recognizing that initial versions provide value even while additional features are being developed.

For practitioners building similar systems, several takeaways emerge. First, metric cardinality must be considered from the beginning—designing aggregation strategies before deployment prevents operational crises. Second, integrating monitoring into existing deployment workflows and UIs reduces adoption friction compared to standalone tools. Third, monitoring both training and inference phases provides coverage across the full model lifecycle where issues can emerge. Fourth, progressive deployment with monitoring at each stage (dark, experimental, production) enables early issue detection. Finally, leveraging existing organizational infrastructure for storage, alerting, and visualization allows the ML platform team to focus on domain-specific challenges rather than rebuilding generic capabilities.
