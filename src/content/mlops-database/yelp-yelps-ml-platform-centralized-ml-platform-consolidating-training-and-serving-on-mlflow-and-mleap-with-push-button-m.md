---
title: "Centralized ML Platform consolidating training and serving on MLflow and MLeap with push-button multi-target deployments"
slug: "yelp-yelps-ml-platform-centralized-ml-platform-consolidating-training-and-serving-on-mlflow-and-mleap-with-push-button-m"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "pipeline-orchestration"
  - "databricks"
  - "mlflow"
  - "spark"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "monitoring"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "Yelp"
companySlug: "yelp"
platformName: "Yelp's ML platform"
contentType: "blog"
summary: "Yelp built a centralized ML Platform to address the operational burden and inefficiencies of multiple fragmented ML systems across different teams. Previously, each team maintained custom training and serving infrastructure, which diverted engineering focus from modeling to infrastructure maintenance. The Core ML team consolidated these disparate systems around MLflow for experiment tracking and model management, and MLeap for portable model serialization and serving. This unified platform provides opinionated APIs that enforce best practices by default, ensures correctness through end-to-end integration testing with production models, and enables push-button deployment to multiple serving targets including REST microservices, Flink stream processing, and Elasticsearch. The platform has seen enthusiastic adoption by ML practitioners, allowing them to focus on product and modeling work rather than infrastructure concerns."
link: "https://engineeringblog.yelp.com/2020/07/ML-platform-overview.html"
year: 2020
seo:
  title: "Yelp: Centralized ML Platform consolidating training and serving on MLflow and MLeap with push-button multi-target deployments - ZenML MLOps Database"
  description: "Yelp built a centralized ML Platform to address the operational burden and inefficiencies of multiple fragmented ML systems across different teams. Previously, each team maintained custom training and serving infrastructure, which diverted engineering focus from modeling to infrastructure maintenance. The Core ML team consolidated these disparate systems around MLflow for experiment tracking and model management, and MLeap for portable model serialization and serving. This unified platform provides opinionated APIs that enforce best practices by default, ensures correctness through end-to-end integration testing with production models, and enables push-button deployment to multiple serving targets including REST microservices, Flink stream processing, and Elasticsearch. The platform has seen enthusiastic adoption by ML practitioners, allowing them to focus on product and modeling work rather than infrastructure concerns."
  canonical: "https://www.zenml.io/mlops-database/yelp-yelps-ml-platform-centralized-ml-platform-consolidating-training-and-serving-on-mlflow-and-mleap-with-push-button-m"
  ogTitle: "Yelp: Centralized ML Platform consolidating training and serving on MLflow and MLeap with push-button multi-target deployments - ZenML MLOps Database"
  ogDescription: "Yelp built a centralized ML Platform to address the operational burden and inefficiencies of multiple fragmented ML systems across different teams. Previously, each team maintained custom training and serving infrastructure, which diverted engineering focus from modeling to infrastructure maintenance. The Core ML team consolidated these disparate systems around MLflow for experiment tracking and model management, and MLeap for portable model serialization and serving. This unified platform provides opinionated APIs that enforce best practices by default, ensures correctness through end-to-end integration testing with production models, and enables push-button deployment to multiple serving targets including REST microservices, Flink stream processing, and Elasticsearch. The platform has seen enthusiastic adoption by ML practitioners, allowing them to focus on product and modeling work rather than infrastructure concerns."
mlops:
  source: "sqlite"
  entryId: 101
  sourceUrl: "https://engineeringblog.yelp.com/2020/07/ML-platform-overview.html"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061400"
  lastUpdated: "2026-04-14T19:55:06.584622"
---

## Problem Context

Yelp operates hundreds of ML models powering critical product features like restaurant recommendations, business service offerings, and real-time delivery availability. In the early days circa 2004, Yelp relied on hand-crafted heuristic rules, but as the consumer base grew and products matured, machine learning became essential. By 2020, ML adoption had accelerated dramatically across the organization.

The growth in ML adoption created significant infrastructure challenges. Yelp's initial ML systems were fragmented across multiple teams, each building custom training and serving infrastructure tailored to their specific domain requirements. This decentralized approach created several painful problems. The operational burden of maintaining these custom systems was substantial, pulling ML engineers away from modeling iterations and product applications toward infrastructure maintenance. Each team operated in isolation with infrequent cross-pollination of ideas and best practices. Owning an ML model became a heavy investment requiring expertise in both modeling and infrastructure engineering.

Over several years, teams gradually extended their custom systems to handle increasingly complex scope and tighter service level objectives (SLOs). However, the operational toll became unsustainable. A particularly illustrative example of the correctness problems that emerged: Yelp encountered an issue where XGBoost predictions unintentionally used 64-bit floats instead of the 32-bit floats that XGBoost training uses. This seemingly minor floating point inconsistency in numerically encoding a categorical variable resulted in approximately random predictions for 35 percent of instances in production.

The challenge of maintaining consistency across training and serving was especially acute in Yelp's diverse technology ecosystem. Models were typically trained in Python but deployed across Java, Scala, Python, and even inside databases. Different libraries and languages had varying expectations for handling sparse vectors, missing values, nulls, and NaNs. Some libraries treat zero as missing while others use special designations. These subtle implementation differences were extremely difficult for developers to reason about and nearly impossible to debug when things went wrong.

## Architecture and Design

To address these challenges, Yelp created a Core ML team several years before this 2020 announcement. The team's charter was to consolidate ML infrastructure under centrally supported tooling and best practices. Rather than attempting to rebuild everything at once, they deconstructed ML systems into three main themes: interactive computing, data ETL, and model training/serving. This modular approach allowed teams to migrate portions of their workflows incrementally while maintaining specialized aspects of their domains on legacy systems as needed.

For the model training and serving systems specifically, Yelp architected a unified platform built on three key design principles. First, the platform provides opinionated APIs with pre-built implementations for common cases. Many of Yelp's ML challenges fall into a limited set of patterns, and the platform enforces Yelp's collective best practices for these scenarios. Critical considerations like metadata logging, model versioning, and reproducibility are handled automatically rather than left to individual developers. This opinionated approach also enables streamlined deployment systems where developers can productionize models through a web UI with just a few clicks.

Second, the platform prioritizes correctness and robustness by default. The team adopted a test-driven development mindset with full end-to-end integration test suites. Critically, they run actual Yelp production models and datasets through these tests to ensure models give exactly the same results across the entire ecosystem, whether running in Python training environments or Java/Scala/database serving contexts.

Third, the platform leverages open source solutions extensively. Yelp recognized that in-house solutions would quickly be surpassed by the rapid innovation happening in the open source ML tooling ecosystem. Rather than building from scratch, they selected best-of-breed open source libraries and constructed thin wrappers to integrate with legacy code, contributing improvements back upstream when gaps existed.

The platform architecture centers on two core technologies: MLflow and MLeap. MLflow serves as the experiment tracking and model registry layer. The platform automatically logs parameters and metrics to MLflow's tracking server, and developers use MLflow's web UI to inspect model performance and compare versions. MLeap provides the model serialization format and execution engine. This choice was strategic because MLeap supports Yelp's most commonly used ML libraries out of the box—Spark, XGBoost, Scikit-learn, and TensorFlow—and can be extended for custom transformers. Critically, MLeap is fully portable and runs inside any JVM-based system including Spark, Flink, Elasticsearch, and microservices.

## Technical Implementation

The offline training workflow begins with developers constructing training datasets and defining pipelines for encoding and modeling. Since Yelp models typically utilize large datasets, Apache Spark is the preferred computational engine. Developers specify a Spark ML Pipeline encompassing preprocessing, encoding, modeling, and postprocessing stages. They then use platform-provided APIs to fit and serialize their pipelines. Behind the scenes, these APIs automatically interact with MLflow and MLeap to log metadata and bundle the complete pipeline.

The Spark ML Pipeline abstraction is central to the design because it captures the entire transformation graph—not just the final model but all feature engineering and preprocessing steps. This ensures that the exact same code path executes during both training and serving, eliminating the training-serving skew that plagued Yelp's previous systems.

For online serving, Yelp built a thin wrapper around MLeap responsible for three functions: fetching model bundles from MLflow, loading bundles into the MLeap execution engine, and mapping incoming requests to MLeap's APIs. This wrapper has been packaged into several deployment targets to support different use cases. Developers can deploy their models as REST microservices for synchronous prediction requests, as Flink stream processing applications for real-time data pipelines, or hosted directly inside Elasticsearch for ranking and search applications. In each deployment option, developers simply configure the MLflow ID for the models they want to host and can immediately start serving predictions.

The platform's handling of data type consistency and edge cases demonstrates careful engineering. The end-to-end integration tests specifically validate that sparse vector representations, missing values, nulls, and NaNs are handled identically across training and serving. This attention to detail prevents the kind of silent failures that caused 35 percent prediction errors in the XGBoost floating point example.

The technology stack combines established infrastructure components with modern ML tooling. The computational foundation is Apache Spark for distributed data processing and model training. The ML framework support includes Spark MLlib, XGBoost, Scikit-learn, and TensorFlow. The MLeap serialization layer provides the polyglot runtime that enables these Python-trained models to execute efficiently in JVM environments. MLflow provides the model registry, experiment tracking, and metadata management. The serving infrastructure spans HTTP microservices, Apache Flink for stream processing, and Elasticsearch for search ranking use cases.

## Scale and Performance

While the blog post focuses primarily on architecture and design rather than detailed performance metrics, several indicators suggest significant scale. Yelp operates hundreds of ML models in production powering various product features. The platform makes millions of recommendations daily across use cases like plumber quotes, restaurant delivery availability, popular dish identification, and business service inference.

The platform was being rolled out incrementally as of mid-2020 and had already achieved "enthusiastic adoption" by ML practitioners according to the post. The fact that Spark is positioned as the preferred computational engine indicates datasets too large for single-machine processing. The multiple serving deployment options—microservices, Flink streaming, and Elasticsearch integration—suggest diverse latency and throughput requirements across different use cases.

The correctness testing regime provides another scale indicator. Running actual production models and datasets through end-to-end integration tests implies significant test infrastructure investment and suggests the platform handles production-scale data volumes and model complexity during validation.

## Trade-offs and Lessons

Yelp's platform design reflects several important architectural trade-offs and lessons learned from their ML infrastructure evolution. The choice to consolidate around open source tooling rather than building proprietary systems represents a bet on community innovation outpacing internal development. This approach provides access to cutting-edge capabilities that would require specialized expertise to build in-house, but creates dependencies on external projects and requires integration work to fit Yelp's specific needs.

The opinionated API design trades flexibility for productivity and correctness. By funneling developers into narrower approaches, the platform can provide strong guarantees and automated deployment, but may constrain teams with genuinely novel requirements. Yelp addressed this tension through their incremental migration strategy, allowing teams to maintain specialized components on legacy systems while adopting the centralized platform for standard workflows.

The focus on correctness through extensive integration testing reflects hard-won lessons from production failures. The XGBoost floating point issue illustrates how subtle inconsistencies between training and serving can cause catastrophic silent failures. Yelp's decision to test with actual production models and data rather than synthetic examples shows they learned that edge cases in real data expose problems that theoretical testing misses.

The choice of MLeap as the serialization and serving layer was strategic for addressing training-serving skew. By serializing the entire Spark ML Pipeline rather than just model weights, MLeap ensures feature engineering code executes identically in training and serving. The JVM portability enables deployment to diverse serving targets without code translation. However, this approach means Yelp's serving infrastructure is tied to JVM-based systems and MLeap's supported framework set.

The platform's roadmap reveals areas where the initial design left gaps. Extending pre-built models and transformers to cover more specialized use cases acknowledges that the opinionated approach doesn't yet cover all of Yelp's ML patterns. The planned integration with A/B experimentation tools and real-time monitoring indicates that initial versions lacked tight coupling between serving, experimentation, and observability systems. The desire to feed observed events back through streaming infrastructure for real-time performance monitoring and model selection suggests the initial platform focused primarily on training and deployment rather than complete lifecycle management.

The modular migration strategy appears to have been critical to adoption. By allowing teams to adopt components incrementally rather than requiring wholesale migration, Yelp reduced risk and enabled teams to realize benefits quickly while maintaining business continuity. This approach also allowed the Core ML team to prove value progressively rather than requiring upfront faith in a complete replatforming effort.

The platform's success seems attributable to several factors: building on proven open source tools rather than reinventing, investing heavily in correctness testing with production data, providing opinionated workflows that enforce best practices by default, enabling multiple serving patterns to support diverse use cases, and staffing the Core ML team with infrastructure engineers who could provide capabilities beyond typical ML engineering expertise. The enthusiastic adoption reported suggests the productivity gains from reduced infrastructure burden outweighed any constraints from the opinionated approach.
