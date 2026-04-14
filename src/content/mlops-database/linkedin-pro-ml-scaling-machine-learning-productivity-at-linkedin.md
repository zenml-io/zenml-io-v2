---
title: "Scaling Machine Learning Productivity at LinkedIn"
slug: "linkedin-pro-ml-scaling-machine-learning-productivity-at-linkedin"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "airflow"
  - "databricks"
  - "spark"
  - "tf-serving"
  - "ab-testing"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "model-validation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "LinkedIn"
companySlug: "linkedin"
platformName: "Pro-ML"
contentType: "blog"
summary: "LinkedIn launched the Productive Machine Learning (Pro-ML) initiative in August 2017 to address the scalability challenges of their fragmented AI infrastructure, where each product team had built bespoke ML systems with little sharing between them. The Pro-ML platform unifies the entire ML lifecycle across six key layers: exploring and authoring (using a custom DSL with IntelliJ bindings and Jupyter notebooks), training (leveraging Hadoop, Spark, and Azkaban), model deployment (with a central repository and artifact orchestration), running (using a custom execution engine called Quasar and a declarative Java API called ReMix), health assurance (automated validation and anomaly detection), and a feature marketplace (Frame system managing tens of thousands of features). The initiative aims to double the effectiveness of machine learning engineers while democratizing AI tools across LinkedIn's engineering organization, enabling non-AI engineers to build, train, and run their own models."
link: "https://engineering.linkedin.com/blog/2019/01/scaling-machine-learning-productivity-at-linkedin"
year: 2019
seo:
  title: "LinkedIn: Scaling Machine Learning Productivity at LinkedIn - ZenML MLOps Database"
  description: "LinkedIn launched the Productive Machine Learning (Pro-ML) initiative in August 2017 to address the scalability challenges of their fragmented AI infrastructure, where each product team had built bespoke ML systems with little sharing between them. The Pro-ML platform unifies the entire ML lifecycle across six key layers: exploring and authoring (using a custom DSL with IntelliJ bindings and Jupyter notebooks), training (leveraging Hadoop, Spark, and Azkaban), model deployment (with a central repository and artifact orchestration), running (using a custom execution engine called Quasar and a declarative Java API called ReMix), health assurance (automated validation and anomaly detection), and a feature marketplace (Frame system managing tens of thousands of features). The initiative aims to double the effectiveness of machine learning engineers while democratizing AI tools across LinkedIn's engineering organization, enabling non-AI engineers to build, train, and run their own models."
  canonical: "https://www.zenml.io/mlops-database/linkedin-pro-ml-scaling-machine-learning-productivity-at-linkedin"
  ogTitle: "LinkedIn: Scaling Machine Learning Productivity at LinkedIn - ZenML MLOps Database"
  ogDescription: "LinkedIn launched the Productive Machine Learning (Pro-ML) initiative in August 2017 to address the scalability challenges of their fragmented AI infrastructure, where each product team had built bespoke ML systems with little sharing between them. The Pro-ML platform unifies the entire ML lifecycle across six key layers: exploring and authoring (using a custom DSL with IntelliJ bindings and Jupyter notebooks), training (leveraging Hadoop, Spark, and Azkaban), model deployment (with a central repository and artifact orchestration), running (using a custom execution engine called Quasar and a declarative Java API called ReMix), health assurance (automated validation and anomaly detection), and a feature marketplace (Frame system managing tens of thousands of features). The initiative aims to double the effectiveness of machine learning engineers while democratizing AI tools across LinkedIn's engineering organization, enabling non-AI engineers to build, train, and run their own models."
mlops:
  source: "sqlite"
  entryId: 48
  sourceUrl: "https://engineering.linkedin.com/blog/2019/01/scaling-machine-learning-productivity-at-linkedin"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.060826"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

LinkedIn faced a critical scalability challenge after a decade of AI adoption across their product lines. While they had successfully deployed machine learning across numerous use cases—from anti-abuse anomaly detection to career recommendations and feed curation—their approach had become unsustainable. Each AI stack was built by separate teams as bespoke systems optimized for highly performance-sensitive products, resulting in hundreds of relevance services and minimal sharing of infrastructure between teams. This fragmentation created several significant pain points that threatened LinkedIn's ability to scale AI effectively.

The custom workflows added substantial complexity when onboarding new engineers, introducing new features, or adopting new modeling technologies. More critically, these siloed systems made it extremely difficult for non-AI engineers to build, train, and run their own models, effectively creating a bottleneck where only specialized teams could leverage machine learning. The lack of standardization also made it challenging to ensure consistency across the offline training environment and online serving environment, leading to difficult-to-diagnose bugs when small deltas existed between these environments. Additionally, with the rapid evolution of AI technologies and frameworks, LinkedIn needed infrastructure flexible enough to support both existing major ML algorithms and emerging techniques.

The organization recognized that simply continuing to build specialized systems for each use case would not scale to meet growing demand. They needed a unified platform that could democratize access to ML tools while maintaining the performance characteristics required for production systems serving hundreds of millions of members.

## Architecture & Design

The Pro-ML platform is architected around six interconnected layers that cover the complete machine learning lifecycle, with each layer designed to integrate tightly with the others while remaining independently upgradeable.

### Exploring and Authoring Layer

The authoring layer provides two complementary interfaces for model development. At its core is a custom domain-specific language (DSL) with IntelliJ IDE bindings that captures input features, their transformations, the ML algorithms employed, and output results. This DSL serves as the canonical representation of a model that flows through the entire system. Complementing the DSL is a Jupyter notebook integration that enables step-by-step exploration of data, feature selection, DSL drafting, and model parameter tuning. This dual approach supports both exploratory data science workflows and production-ready model definitions in a unified format.

### Training Layer

The training infrastructure is built on top of LinkedIn's existing Hadoop systems for offline training, which remains the primary approach for most products despite some data-driven features being computed online. The unified training service leverages Azkaban for workflow orchestration and Spark for distributed computation. The service is tightly interconnected with the online serving and feature management ecosystems to ensure consistency—the same input files are used throughout the system to minimize error risk. Training frequencies vary by use case, with some teams training every couple of hours while others manage tens of models or sub-components that are trained and retrained daily. The training library includes continuous additions of newer model types and tools like hyperparameter tuning capabilities. Once a model passes offline validation, the training library automatically passes the trained artifacts and metadata to the deployment system.

### Model Deployment Layer

The deployment layer manages what LinkedIn defines as "ML artifacts"—encompassing the identity, components, versioning, and dependencies relative to other artifacts in the system. A model may have a global component in the tens of megabytes and member-specific components in the gigabyte range, each created separately with its own versioning and dependencies on code libraries, services, and features. A central repository stores this information and leverages it for automatic validation, such as verifying that all required features are available both offline and online. The deployment service provides orchestration, monitoring, and notification to ensure that desired code and data artifacts remain in sync. Target destinations for artifacts may include services, key-value stores, or other infrastructure components. The deployment system integrates with LinkedIn's experimentation platform to ensure all active A/B tests have required artifacts deployed to the correct targets.

### Running Layer

The runtime execution layer addresses the critical challenge of reliably and efficiently evaluating models across multiple environments: offline in Spark and Pig, nearline in Samza, online in REST services, and deep within the search stack. Historically, teams wrote custom scorers for each environment, which was both intensive and error-prone, often leading to subtle differences between training and serving that caused difficult-to-diagnose bugs. To solve this, LinkedIn built Quasar, a custom execution engine that runs the DSL across all environments. Quasar takes features from the marketplace and coefficients and DSL code from the model deployment system, then applies the code to data and coefficients consistently. Additionally, they developed ReMix, a higher-order declarative Java API for defining composable online workflows including query rewriting, feature integration, downstream recommendation engine management, and result blending. A distributed model serving system driven by Quasar federates multiple inference engines, including various versions of TensorFlow Serving and XGBoost.

### Health Assurance Layer

The health assurance layer combines automated and on-demand services to address the inherent difficulty in testing and monitoring ML artifact production and update processes. Automated services ensure statistical similarity between online and offline features (model inputs) and validate that online model behavior matches expected behavior—for example, verifying that predicted scores align with expected precision from offline training. When anomalies are detected, ML engineers can use on-demand services employing replay, store, explore, and perturb techniques to isolate problems, determining whether issues stem from code bugs, missing data, or whether the model simply requires retraining.

### Feature Marketplace

The feature marketplace, built on LinkedIn's Frame system, manages tens of thousands of features that need to be produced, discovered, consumed, and monitored. Frame describes features both offline and online and is used by both producers and consumers. Metadata about features is published in a centralized database with a UI system connected to the Model Repository. This enables ML engineers to search for features based on various facets including feature type (numeric, categorical), statistical summaries, and current usage across the ecosystem. The centralized approach addresses the fundamental principle that output quality depends on input data quality, making feature management a first-class concern.

## Technical Implementation

The Pro-ML platform leverages a combination of existing LinkedIn infrastructure and custom-built components. The core technologies include:

The training infrastructure is built on Hadoop for offline distributed computing, with Azkaban serving as the workflow orchestration engine and Spark providing the distributed processing framework. This represents a pragmatic choice to build on proven internal infrastructure rather than introducing entirely new systems.

For the authoring layer, LinkedIn developed custom tooling including IntelliJ IDE bindings for their DSL and Jupyter notebook integration. This reflects a recognition that different personas (data scientists vs. ML engineers) have different workflow preferences, and both need first-class support.

The runtime layer features two major custom components: Quasar, the execution engine for the DSL, and ReMix, the declarative Java API for online workflows. Quasar's design as an execution engine rather than a simple model format converter is crucial—it ensures that the same logic executes identically across offline (Spark, Pig), nearline (Samza), and online (REST services, search) environments. The distributed model serving system federates multiple inference backends including TensorFlow Serving and XGBoost, demonstrating a multi-framework approach that avoids lock-in to any single ML framework.

The feature marketplace is built on Frame, LinkedIn's existing system for feature description, with centralized metadata management and UI for feature discovery. The tight integration between Frame, the Model Repository, and the deployment system creates a cohesive ecosystem where dependencies are tracked and validated automatically.

The platform is designed with GDPR privacy requirements built into every stage, reflecting the regulatory environment and LinkedIn's commitment to privacy. The architecture also explicitly avoids known anti-patterns identified in prior research into machine learning systems and technical debt.

## Scale & Performance

LinkedIn operates machine learning at substantial scale, though the document provides limited specific performance metrics. The platform manages hundreds of relevance services across the organization, each potentially serving models to millions of LinkedIn members. The feature marketplace handles tens of thousands of features that flow through the system, requiring both discovery and monitoring capabilities.

Model artifacts range significantly in size, with global components in the tens of megabytes and member-specific components reaching into the gigabyte range. Training cadences vary by product requirements—some teams train models every couple of hours, while others manage tens of models or model sub-components that are trained and retrained daily. This variability in training frequency reflects the diverse nature of LinkedIn's ML use cases, from time-sensitive features computed mostly online (like new connection recommendations) to more stable models that can be refreshed on longer cycles.

The system must support real-time model evaluation in production across multiple execution environments, each with different latency and throughput characteristics. Online REST services require low-latency synchronous predictions, while nearline Samza streaming requires high throughput with moderate latency tolerance, and offline batch processing prioritizes throughput over latency.

The initiative began in August 2017 with the explicit goal of doubling the effectiveness of machine learning engineers—a bold quantitative target that implies significant efficiency gains in model development, training, deployment, and monitoring cycles.

## Trade-offs & Lessons

LinkedIn's Pro-ML initiative embodies several important architectural trade-offs and lessons learned from scaling production ML systems.

### Build vs. Buy Decisions

The team made a deliberate decision to "leverage and improve best-of-breed components from our existing code base to the maximum extent feasible" rather than completely rewriting their tech stack. This pragmatic approach recognizes that wholesale rewrites are rarely successful in production environments, but individual components can be replaced as needed. They built custom solutions like Quasar and ReMix where existing tools didn't meet their needs, while leveraging proven infrastructure like Hadoop, Spark, and Azkaban. This selective innovation approach manages risk while still achieving meaningful improvements.

### Standardization vs. Flexibility

A central tension in the Pro-ML design is supporting existing major ML algorithms (tree ensembles, generalized additive mixture ensembles, deep learning) while remaining flexible for emerging techniques. The DSL-based approach provides standardization for the authoring and execution layers while the federated serving system (supporting TensorFlow Serving, XGBoost, and others) maintains flexibility in model types. This represents a "standardize the interfaces, not the implementations" philosophy that has proven successful in other domains.

### Training-Serving Skew

LinkedIn explicitly recognized training-serving skew as a critical problem that plagued their previous bespoke systems. Small deltas between training and serving environments led to difficult-to-diagnose bugs that eroded trust in ML systems. The Quasar execution engine directly addresses this by ensuring the same DSL logic executes identically across all environments. The tight interconnection between the training service, feature management, and online serving ecosystems—ensuring the same input files are used throughout—further reduces skew. This represents a lesson that consistency across environments is worth significant engineering investment.

### Organizational Structure

The organizational model is noteworthy: AI teams align with product teams for day-to-day work but maintain reporting relationships to the parent AI organization. This matrix structure balances the need for AI specialists to collaborate and share best practices with the need for tight integration with product development. The Pro-ML team itself is organized around five pillars corresponding to lifecycle stages, with engineers drawn from product engineering, foundation/tools, and infrastructure teams. This cross-functional structure, distributed globally across Bangalore, Europe, and multiple US locations, reflects modern approaches to platform engineering.

### Agile Value Delivery

The team adopted an "agile-inspired strategy" where each step delivers value by improving at least one product line or providing generally usable improvements to existing components. This incremental approach reduces risk compared to big-bang platform launches and ensures ongoing stakeholder buy-in through demonstrated value. The explicit focus on making models A/B testable in production recognizes that production ML is fundamentally about experimentation and continuous improvement.

### The Feature Marketplace Insight

Elevating feature management to a first-class platform concern through the feature marketplace represents an important insight. Many ML platforms focus on model training and serving while treating features as a secondary concern. LinkedIn recognized that with tens of thousands of features, discovery, quality monitoring, and reuse become critical productivity multipliers. The centralized metadata approach with statistical summaries and usage tracking makes features as discoverable and manageable as code libraries.

### Health Assurance as Infrastructure

Building health assurance directly into the platform rather than leaving it to individual teams represents mature thinking about production ML. The combination of automated validation (statistical similarity between online/offline features, expected vs. actual model behavior) and on-demand debugging tools (replay, store, explore, perturb) provides both passive monitoring and active investigation capabilities. This reflects the lesson that ML systems require different monitoring approaches than traditional software—statistical validation rather than just uptime and error rates.

The Pro-ML initiative demonstrates that scaling machine learning across an organization requires more than just good algorithms—it requires careful platform engineering that balances standardization with flexibility, addresses the full lifecycle from exploration to production monitoring, and thoughtfully manages organizational structure to enable both specialized expertise and broad accessibility.
