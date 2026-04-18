---
title: "DevOps-Style ML Model Drift Monitoring Using Prediction Logs, Prometheus, Grafana, and Automated Metrics"
slug: "doordash-doordashs-ml-platform-devops-style-ml-model-drift-monitoring-using-prediction-logs-prometheus-grafana-and-autom"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "databricks"
  - "spark"
  - "terraform"
  - "deployment"
  - "model-evaluation"
  - "serving"
industryTags: "e-commerce"
company: "DoorDash"
companySlug: "doordash"
platformName: "DoorDash's ML platform"
contentType: "blog"
summary: "DoorDash built a comprehensive model monitoring system to detect and prevent model drift across their ML platform, addressing the critical problem that deployed models immediately begin degrading in accuracy due to changing data patterns. After evaluating both unit test and monitoring approaches, they chose a DevOps-style monitoring solution leveraging their existing Sibyl prediction service logs, data warehouse, Prometheus metrics, Grafana dashboards, and Terraform-based alerting infrastructure. The system automatically generates descriptive statistics and evaluation metrics for all models without requiring data scientist onboarding, providing out-of-the-box observability that enables self-service monitoring and alerting across teams including Logistics, Fraud, Supply and Demand, and ETA prediction. This platform-level solution allows data scientists to focus on model development rather than building custom monitoring infrastructure, with plans to extend to real-time continuous monitoring and integrate with their experimentation platform."
link: "https://doordash.engineering/2021/05/20/monitor-machine-learning-model-drift/"
year: 2021
seo:
  title: "DoorDash: DevOps-Style ML Model Drift Monitoring Using Prediction Logs, Prometheus, Grafana, and Automated Metrics - ZenML MLOps Database"
  description: "DoorDash built a comprehensive model monitoring system to detect and prevent model drift across their ML platform, addressing the critical problem that deployed models immediately begin degrading in accuracy due to changing data patterns. After evaluating both unit test and monitoring approaches, they chose a DevOps-style monitoring solution leveraging their existing Sibyl prediction service logs, data warehouse, Prometheus metrics, Grafana dashboards, and Terraform-based alerting infrastructure. The system automatically generates descriptive statistics and evaluation metrics for all models without requiring data scientist onboarding, providing out-of-the-box observability that enables self-service monitoring and alerting across teams including Logistics, Fraud, Supply and Demand, and ETA prediction. This platform-level solution allows data scientists to focus on model development rather than building custom monitoring infrastructure, with plans to extend to real-time continuous monitoring and integrate with their experimentation platform."
  canonical: "https://www.zenml.io/mlops-database/doordash-doordashs-ml-platform-devops-style-ml-model-drift-monitoring-using-prediction-logs-prometheus-grafana-and-autom"
  ogTitle: "DoorDash: DevOps-Style ML Model Drift Monitoring Using Prediction Logs, Prometheus, Grafana, and Automated Metrics - ZenML MLOps Database"
  ogDescription: "DoorDash built a comprehensive model monitoring system to detect and prevent model drift across their ML platform, addressing the critical problem that deployed models immediately begin degrading in accuracy due to changing data patterns. After evaluating both unit test and monitoring approaches, they chose a DevOps-style monitoring solution leveraging their existing Sibyl prediction service logs, data warehouse, Prometheus metrics, Grafana dashboards, and Terraform-based alerting infrastructure. The system automatically generates descriptive statistics and evaluation metrics for all models without requiring data scientist onboarding, providing out-of-the-box observability that enables self-service monitoring and alerting across teams including Logistics, Fraud, Supply and Demand, and ETA prediction. This platform-level solution allows data scientists to focus on model development rather than building custom monitoring infrastructure, with plans to extend to real-time continuous monitoring and integrate with their experimentation platform."
mlops:
  source: "sqlite"
  entryId: 98
  sourceUrl: "https://doordash.engineering/2021/05/20/monitor-machine-learning-model-drift/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061367"
  lastUpdated: "2026-04-14T19:55:05.490629"
---

## Problem Context

DoorDash's machine learning models power critical business functions including restaurant preparation time estimates, delivery ETAs, Dasher dispatch optimization, and fraud detection. However, the company faced a significant challenge: once models are trained, validated, and deployed to production, they immediately begin degrading through a process called model drift. This degradation occurs because data patterns continuously change as the platform grows with more customers, products, and orders, as well as external events like the COVID-19 pandemic that dramatically shifted customer behavior.

Before building their monitoring solution, DoorDash experienced multiple instances where models became outdated and made incorrect predictions, negatively impacting business metrics and customer experience. The engineering teams spent considerable effort investigating and fixing these issues, but detection took a long time because no systematic monitoring infrastructure existed. The prediction logs were available in their data warehouse for deep-dive analysis, but this reactive approach didn't help understand the big picture of why models were drifting or provide early warning signals.

The core motivation was to build a systematic, platform-level observability solution that could protect all ML models in production without requiring custom implementation for each use case. The team recognized that ML model inputs (features) and outputs (predictions) need close monitoring to diagnose and prevent drift, and that measuring performance against real-world data systematically would gauge the extent of model drift.

## Architecture & Design

The monitoring architecture builds on top of DoorDash's existing ML platform infrastructure, specifically leveraging Sibyl, their prediction service. The system operates on a multi-layered architecture with clear data flows:

**Data Collection Layer**: Sibyl logs every prediction made in production to Apache Kafka topics, which are then continuously uploaded to a data warehouse (Snowflake). Each prediction log contains comprehensive information including timestamp (sent_at), prediction_id (user-supplied identifier like delivery ID or merchant ID), predictor_name (the prediction purpose like ETA), model_id (versioned model name), features (key-value pairs of feature names and values), prediction_result (numerical model output), and default_values_used (set of feature names where default values were substituted when actual values were unavailable).

The prediction log schema was specifically designed to enable full reproduction of model predictions. Data scientists can combine prediction logs with model artifacts to completely recreate any prediction made by the system. The addition of the default_values_used field was particularly important, as data scientists identified low feature coverage as a leading indicator of model performance issues.

**Processing Layer**: The team initially chose to build on top of the data warehouse rather than processing Kafka streams directly because SQL queries provided sufficient functionality for the first release. SQL aggregation functions (avg, stddev, min, max, approx_percentile for P5, P25, P50, P75, P95) are applied using templated queries that plug in duration, predictor name, and model ID. These queries run on both hourly and daily cadences in the first release, though the team later focused exclusively on hourly aggregation in the second release after discovering that hourly granularity captured valuable distribution patterns like lunch and dinner peaks that daily averages obscured.

Monitoring tasks are configured through YAML files that define monitoring cadence and the types of metrics to extract from each model and predictor. The system generates final SQL queries from templates, queries the data warehouse, and emits aggregated values as Prometheus metrics.

**Visualization and Alerting Layer**: Once Prometheus metrics are available, Grafana dashboards provide visualization of feature value statistics and prediction distributions over time. The dashboards enable deep investigation into changes in ML features and predictions, with capabilities to zoom in and out of time ranges and compare trends across different periods. Alerting leverages DoorDash's internal Terraform repository where teams can create queries using PromQL, set thresholds, and route alerts to team-specific Slack channels or PagerDuty instances.

**Evaluation Metrics Extension**: Beyond descriptive statistics, the system supports opt-in evaluation metrics that compare predicted values to actual values. This requires joining prediction logs with actual outcome data using prediction IDs. For regression tasks, metrics include mean squared error and root mean square error. For classification, accuracy, precision, and area under curve are tracked. Ranking tasks use mean reciprocal rank and normalized discounted cumulative gain, while text processing uses BLEU scores. Some evaluations are computed using elementary operations for simple metrics like mean absolute error, while more complex metrics load data into Apache Spark jobs for distributed computation.

## Technical Implementation

The technology stack deliberately leverages existing DoorDash infrastructure and open-source standards to minimize learning curve and maximize reliability:

**Data Storage**: Snowflake data warehouse stores prediction logs with continuous uploads from Kafka topics. The SQL-based approach enables familiar query patterns for data scientists while providing the scale needed for high-volume prediction logging.

**Metrics and Monitoring**: Prometheus serves as the metrics backend, collecting descriptive statistics (mean, standard deviation, percentiles) and evaluation metrics emitted from the SQL processing jobs. Grafana provides the visualization layer with interactive dashboards showing trends over time. Prometheus Alertmanager handles threshold-based alerting.

**Configuration and Infrastructure**: YAML configuration files define monitoring tasks, making it easy to specify what metrics to track for which models. Terraform manages alerting infrastructure, enabling teams to define PromQL queries, set thresholds, and configure notification routing in a declarative manner.

**Real-time Processing**: The second release migrated from batch SQL processing to DoorDash's declarative real-time feature engineering framework, enabling continuous monitoring rather than hourly batch jobs. This shift provided real-time graphs and alerting capabilities for applications requiring faster response times.

**Integration Points**: The system integrates with Sibyl's prediction service to capture all prediction traffic automatically. Shadow model support allows monitoring of experimental models alongside production models before promotion. The prediction_id field enables joining with various database tables containing actual outcomes for evaluation metric computation.

The implementation philosophy emphasized reusing tools provided by DoorDash's Observability team rather than building custom infrastructure. This decision enabled faster delivery and leveraged battle-tested monitoring infrastructure already familiar to engineering teams.

## Scale & Performance

While the article doesn't provide specific throughput numbers, several indicators reveal the system's operational scale:

**Model Coverage**: The first release onboarded multiple teams including Logistics, Fraud, Supply and Demand, and ETA teams, each running multiple models. The second release achieved complete out-of-the-box monitoring for all models, all feature names, and all metrics across the platform.

**Temporal Resolution**: The system operates at hourly granularity for aggregations, enabling detection of intra-day patterns like lunch and dinner peaks in delivery behavior. The shift to real-time processing in the second release enables continuous monitoring for time-sensitive applications.

**Metric Variety**: For each model and feature combination, the system tracks multiple descriptive statistics (average, standard deviation, minimum, maximum, and five percentile buckets: P5, P25, P50, P75, P95). Combined with evaluation metrics for regression, classification, ranking, and text processing tasks, this generates substantial metric volume.

**Data Retention**: The data warehouse stores all prediction logs, enabling historical analysis and trend comparison across arbitrary time periods. Grafana dashboards support zooming in and out of time ranges and comparing trends across different periods.

**Processing Efficiency**: The choice of hourly aggregation over more frequent intervals balanced monitoring granularity against processing costs. The migration to real-time processing for the second release suggests the batch approach successfully handled the load but teams needed faster detection for certain use cases.

## Trade-offs & Lessons

**Monitoring Approach vs Unit Testing**: The team carefully evaluated two distinct paradigms. The unit test approach would have data scientists define explicit validations (e.g., "delivery time should not exceed one hour") that either pass or fail on new data. The monitoring approach generates metrics automatically and displays trends without preset expectations. After surveying data scientists, they chose monitoring because teams wanted to see trend distributions, preferred a platform solution over opt-in adoption, and critically did not assume training data would match production data. The monitoring approach avoided false alerts on launch day that would occur if production data legitimately differed from training data.

**Batch vs Real-time Processing**: The first release used SQL queries against the data warehouse, providing sufficient functionality while leveraging familiar tools. This pragmatic choice enabled faster delivery. The second release shifted to real-time processing after learning that hourly granularity was more valuable than daily (capturing meal-time peaks) and some applications required faster response. The staged approach allowed validation before investing in real-time infrastructure.

**Automatic vs Configurable Monitoring**: The first release required configuration of specific metrics for specific features, creating an onboarding step. Based on feedback, the second release enabled complete automatic monitoring for all models, features, and metrics, achieving true out-of-the-box experience. This evolution shows the value of starting with constrained functionality and expanding based on actual usage patterns.

**Descriptive vs Evaluation Metrics**: Initially, the system provided only descriptive statistics about input and output distributions. The team recognized greater value in evaluation metrics comparing predictions to actual outcomes but made this opt-in because challenges exist: some data is censored (prep time modeling), some actual values take weeks to materialize (fraud detection), and different ML task types require specialized metrics. The opt-in approach acknowledges that not all use cases can or should use evaluation metrics.

**Leveraging Existing Infrastructure**: The decision to reuse Prometheus, Grafana, and Terraform-based alerting rather than building custom tooling proved highly beneficial. Data scientists and engineers didn't need to learn new systems, the platform team avoided building and maintaining custom infrastructure, and the solution inherited the reliability and scalability of existing observability tools. This systems thinking approach to MLOps demonstrates how ML-specific problems can often be solved by adapting general-purpose infrastructure.

**Feature Coverage Insights**: Adding the default_values_used field to prediction logs addressed a specific pain point data scientists identified. High usage of default values indicates low feature coverage, a leading indicator of model performance issues. This shows the value of close collaboration with end users during design.

**Challenges with Evaluation Metrics**: The team identified several complexities: censored data in some applications, delayed availability of true labels (weeks for fraud detection), and the need for task-specific metrics (regression vs classification vs ranking vs text). More complex metrics require distributed computation via Spark jobs rather than simple SQL aggregations. These challenges explain why evaluation metrics remain opt-in rather than automatic.

**Future Directions**: The team identified several promising extensions including continuous rather than hourly monitoring for real-time applications, comparing training evaluation set performance to production performance to catch missing features or incorrect conversions, anomaly detection for gradual changes not caught by threshold alerts, integration with their Curie experimentation platform to streamline A/B testing analysis, and explainability features to understand which inputs contributed most to predictions. These plans show a mature understanding of monitoring as an evolving capability rather than a one-time project.
