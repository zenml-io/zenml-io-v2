---
title: "Ship to Production, Darkly: Moving Fast, Staying Safe with ML Deployments"
slug: "doordash-doordashs-ml-platform-ship-to-production-darkly-moving-fast-staying-safe-with-ml-deployments"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "model-serving"
  - "monitoring"
  - "ab-testing"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "serving"
  - "shadow-deployment"
industryTags: "e-commerce"
company: "DoorDash"
companySlug: "doordash"
platformName: "DoorDash's ML platform"
contentType: "blog"
summary: "DoorDash's Anti-Fraud team developed a \"dark shipping\" deployment methodology to safely deploy machine learning fraud detection models that process millions of predictions daily. The approach addresses the unique challenges of deploying fraud models—complex feature engineering, scaling requirements, and correctness guarantees—by progressively validating models in production through shadow traffic deployment before allowing them to make live decisions. This multi-stage rollout process leverages DoorDash's ML platform, a rule engine for fault isolation and observability, and the Curie experimentation system to balance the competing demands of deployment speed and production reliability while preventing catastrophic model failures that could either miss fraud or block legitimate transactions."
link: "https://careersatdoordash.com/blog/ship-to-production-darkly-moving-fast-staying-safe-with-ml-deployments/"
year: 2022
seo:
  title: "DoorDash: Ship to Production, Darkly: Moving Fast, Staying Safe with ML Deployments - ZenML MLOps Database"
  description: "DoorDash's Anti-Fraud team developed a \"dark shipping\" deployment methodology to safely deploy machine learning fraud detection models that process millions of predictions daily. The approach addresses the unique challenges of deploying fraud models—complex feature engineering, scaling requirements, and correctness guarantees—by progressively validating models in production through shadow traffic deployment before allowing them to make live decisions. This multi-stage rollout process leverages DoorDash's ML platform, a rule engine for fault isolation and observability, and the Curie experimentation system to balance the competing demands of deployment speed and production reliability while preventing catastrophic model failures that could either miss fraud or block legitimate transactions."
  canonical: "https://www.zenml.io/mlops-database/doordash-doordashs-ml-platform-ship-to-production-darkly-moving-fast-staying-safe-with-ml-deployments"
  ogTitle: "DoorDash: Ship to Production, Darkly: Moving Fast, Staying Safe with ML Deployments - ZenML MLOps Database"
  ogDescription: "DoorDash's Anti-Fraud team developed a \"dark shipping\" deployment methodology to safely deploy machine learning fraud detection models that process millions of predictions daily. The approach addresses the unique challenges of deploying fraud models—complex feature engineering, scaling requirements, and correctness guarantees—by progressively validating models in production through shadow traffic deployment before allowing them to make live decisions. This multi-stage rollout process leverages DoorDash's ML platform, a rule engine for fault isolation and observability, and the Curie experimentation system to balance the competing demands of deployment speed and production reliability while preventing catastrophic model failures that could either miss fraud or block legitimate transactions."
mlops:
  source: "sqlite"
  entryId: 96
  sourceUrl: "https://careersatdoordash.com/blog/ship-to-production-darkly-moving-fast-staying-safe-with-ml-deployments/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061348"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

DoorDash operates ML models at massive scale, with millions of model invocations occurring daily. Each model utilizes dozens or hundreds of features that require substantial computational resources to generate. Within this ecosystem, fraud detection models face particularly acute deployment challenges that create tension between two critical requirements: the need for reliability and correctness in production systems, and the need for rapid iteration to adapt to evolving fraud patterns and business requirements.

The Anti-Fraud team at DoorDash confronts several interconnected challenges that make model deployment especially risky. First, complex feature engineering demands close collaboration between anti-fraud specialists who identify novel fraud patterns, data scientists who translate these insights into features and models, and ML engineers who operationalize these artifacts in production. The adversarial nature of fraud detection means fraudsters continuously evolve their tactics, requiring the team to quickly iterate on detection approaches.

Second, scaling and availability requirements are stringent. The fraud models must evaluate nearly every interaction with the platform in real-time, computing hundreds of complex features and rendering decisions that trigger anti-fraud measures. This creates enormous computational demands that must be met without degrading user experience.

Third, ensuring end-to-end correctness in production presents a fundamental conundrum. While models undergo testing throughout the development lifecycle, the final validation can only occur in production with real, novel data. The consequences of shipping a defective model are severe: a model less effective than its predecessor could allow fraud to slip through; a catastrophically defective model could block all legitimate transactions; or a model with unexpected computational characteristics could generate prohibitively expensive queries that bring systems to a halt under DoorDash's traffic volumes.

Traditional software change management practices, while helpful, prove insufficient for ML models. The ML context introduces additional complications including data quality issues at both training and inference time, training stability concerns such as sensitivity to hyperparameters and consistency on retraining, the near-impossibility of writing comprehensive automated test suites for model behavior, and the difficulty of interpreting ML models compared to examining source code. These factors mean that expectations of correctness can truly be verified only in production, creating a need for safe production validation approaches.

## Architecture & Design

The dark shipping methodology integrates several DoorDash platform components into a cohesive deployment architecture. At the foundation lies DoorDash's general-purpose ML platform, which the article references through their prediction service. The Anti-Fraud team's capabilities are built on top of this platform but operate within the broader anti-fraud platform context, allowing complex ML models to integrate with fraud-fighting workflows.

A critical architectural component is the Anti-Fraud team's rule engine, which provides essential facilities for the dark shipping process. The rule engine delivers fault isolation capabilities that prevent issues in new models from cascading through the system, observability through logging and metrics that enable monitoring of model behavior, integration with diverse data sources needed for feature computation, and seamless integration into DoorDash's microservice architecture. This rule engine works in tandem with the ML service to implement a complete model lifecycle from training through reliable, scaled prediction serving.

The architecture supports shadow traffic routing, allowing new models to process production requests and generate predictions without those predictions affecting business decisions. This shadow mode operates at configurable volume levels, enabling progressive validation starting from a fraction of a percent of traffic up to full production volume.

Experimentation infrastructure, specifically the DoorDash Curie experimentation system, provides the final architectural component. Curie enables rigorous A/B testing comparing incumbent champion models against challenger models, measuring performance improvements with statistical significance before promoting new models to handle live traffic.

## Technical Implementation

The dark shipping workflow implements a multi-stage progressive validation process. Pre-production iterations occur in development environments with rapid turnaround times ranging from minutes to hours, allowing data scientists to update, train, evaluate, and tune models until backtesting results demonstrate consistent quality.

When a model transitions to production, any new features requiring additional code—such as integration with novel data sources—are implemented as dark code paths alongside model invocation logic. These implementations follow highly standardized patterns leveraging the rule engine and ML service. The standardization ensures consistent implementation of fault isolation, observability, data integration, and microservice communication patterns.

The first production stage deploys shadow traffic at just one percent volume. At this minimal scale, the team can safely verify multiple critical properties in the true production environment end-to-end: absence of errors from misconfiguration, missing data sources, or timeouts; model performance within expected parameters; correct feature extraction where inference-time extractors produce values matching training-time extractors; and healthy system metrics including latencies, memory consumption, and CPU utilization. Verification employs both specialized tooling for feature extraction consistency and standard observability infrastructure including time-series dashboards, log monitoring, alerting services, and paging systems.

The second production stage ramps shadow traffic to one hundred percent volume. This full-scale shadow deployment serves dual purposes: analyzing model performance across the complete traffic distribution without business impact risk, and confirming system metrics remain healthy under the additional computational load from the new model.

The third stage transitions from shadow deployment to live experimentation. The Curie platform orchestrates rigorous A/B testing comparing the incumbent champion model against the new challenger model. Only after demonstrating statistically significant improvement does the new model receive one hundred percent of live traffic, at which point it becomes the champion until a newer model challenges it.

## Scale & Performance

The article provides several concrete scale indicators. ML models at DoorDash handle "many millions" of invocations daily, with fraud models specifically evaluating "nearly every interaction with the platform." Each model utilizes "dozens or hundreds of features" requiring what the article describes as "a dazzling amount of computational power" to produce.

The anti-fraud system computes "hundreds of complex model features" in real-time for each evaluation. The scale is sufficient that performance regressions—such as unexpectedly expensive queries—can cause systems to "quickly grind to a halt under unexpected load" at DoorDash volumes.

The progressive validation approach begins at extremely low volume, "as low as just a fraction of a percent," specifically mentioned as one percent in the first shadow stage. This conservative starting point allows safe validation before scaling to one hundred percent shadow traffic and eventually to live experiments and full production rollout.

The development iteration cycle offers quick turnaround times ranging from minutes to hours in pre-production environments, enabling rapid experimentation before models enter the production validation pipeline.

## Trade-offs & Lessons

The dark shipping methodology represents a carefully calibrated balance between competing demands. The approach prioritizes safety and correctness verification while still enabling reasonable deployment velocity for teams facing adversarial dynamics where fraudsters continuously evolve their tactics.

The multi-stage progressive validation creates additional deployment steps and time compared to direct production deployment, but this overhead proves worthwhile given the catastrophic risks of defective fraud models. The staged approach trades some deployment speed for comprehensive risk mitigation.

Leveraging existing platform components—the ML platform, rule engine, and Curie experimentation system—demonstrates the value of building reusable infrastructure that can be composed for specialized use cases. Rather than building an entirely custom fraud model deployment system, the team adapted general-purpose components with standardized patterns. This standardization reduces implementation burden and cognitive load for engineers while ensuring consistent quality.

The emphasis on observability throughout the validation stages reflects hard-won understanding that ML model behavior cannot be fully predicted through pre-deployment testing alone. Multiple observability layers—specialized tools for feature extraction consistency, standard metrics dashboards, logging, alerting, and paging—provide defense in depth for detecting issues.

The approach acknowledges fundamental limitations of ML testing compared to traditional software testing. Rather than attempting to build comprehensive automated test suites for model behavior, which the team characterizes as "nearly impossible," the methodology shifts emphasis to safe production validation with shadow traffic and controlled experiments. This represents a pragmatic acceptance of ML's interpretability challenges compared to examining source code.

The integration of experimentation infrastructure for rigorous champion-challenger evaluation demonstrates sophisticated thinking about model quality. Shadow deployment validates that a model works correctly, but only rigorous statistical comparison determines whether it improves upon the incumbent. This separation of concerns—correctness validation versus performance improvement validation—ensures both criteria are met with appropriate rigor.

The article notes that even with "reasonable pre-production validation," true correctness verification requires production data. This honest acknowledgment that development environments cannot fully replicate production conditions motivates the entire dark shipping approach. The lesson for practitioners is that ML deployment methodologies must account for this gap through safe production validation mechanisms rather than attempting to eliminate the gap through better pre-production testing.

The fault isolation capabilities provided by the rule engine prove essential for dark shipping viability. Without isolation, issues in challenger models could affect production traffic even in shadow mode through resource contention or cascading failures. The architecture specifically addresses this through platform-level isolation mechanisms.

The progressive volume ramping—from one percent shadow to one hundred percent shadow to experimental traffic to full production—provides multiple checkpoints where different classes of issues surface. Configuration errors and missing dependencies appear at one percent volume; scaling issues appear at one hundred percent shadow volume; business metric impacts appear during experiments. This staged revelation of issue types allows teams to address problems at appropriate scales before they can cause widespread impact.

For organizations building similar capabilities, DoorDash's approach offers several transferable insights. First, invest in reusable platform infrastructure that can be composed for specialized use cases rather than building point solutions. Second, embrace shadow deployment as a fundamental capability for ML systems where correctness cannot be fully validated pre-production. Third, maintain clear separation between correctness validation and performance improvement validation, using appropriate tooling for each. Fourth, build comprehensive observability into ML systems from the start rather than retrofitting it later. Fifth, accept that ML deployment requires different techniques than traditional software deployment due to fundamental differences in testability and interpretability, and design deployment workflows accordingly.
