---
title: "DoorDash’s ML Platform – The Beginning"
slug: "doordash-doordashs-ml-platform-doordashs-ml-platform-the-beginning"
draft: false
mlopsTags:
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "pipeline-orchestration"
  - "ab-testing"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "shadow-deployment"
  - "training"
industryTags: "e-commerce"
company: "DoorDash"
companySlug: "doordash"
platformName: "DoorDash's ML platform"
contentType: "blog"
summary: "DoorDash built a comprehensive ML Platform in 2020 to address the increasing complexity and scale of deploying machine learning models across their logistics and marketplace operations. The platform emerged from the need to support diverse ML scenarios including online real-time predictions, offline batch predictions, and exploratory analysis while maintaining engineering productivity and system scalability. Their solution standardized on LightGBM for tree-based models and PyTorch for neural networks, then built four key pillars: a modeling library for training and evaluation, a model training pipeline for CI/CD-style automation, a features service for computing and serving both real-time and historical features, and a prediction service for low-latency inference with support for shadowing and A/B testing. This platform architecture enabled DoorDash to systematically manage the end-to-end model lifecycle from experimentation through production deployment across critical use cases like delivery time predictions, search ranking, demand forecasting, and fraud detection."
link: "https://careersatdoordash.com/blog/doordash-ml-platform-the-beginning/"
year: 2020
seo:
  title: "DoorDash: DoorDash’s ML Platform – The Beginning - ZenML MLOps Database"
  description: "DoorDash built a comprehensive ML Platform in 2020 to address the increasing complexity and scale of deploying machine learning models across their logistics and marketplace operations. The platform emerged from the need to support diverse ML scenarios including online real-time predictions, offline batch predictions, and exploratory analysis while maintaining engineering productivity and system scalability. Their solution standardized on LightGBM for tree-based models and PyTorch for neural networks, then built four key pillars: a modeling library for training and evaluation, a model training pipeline for CI/CD-style automation, a features service for computing and serving both real-time and historical features, and a prediction service for low-latency inference with support for shadowing and A/B testing. This platform architecture enabled DoorDash to systematically manage the end-to-end model lifecycle from experimentation through production deployment across critical use cases like delivery time predictions, search ranking, demand forecasting, and fraud detection."
  canonical: "https://www.zenml.io/mlops-database/doordash-doordashs-ml-platform-doordashs-ml-platform-the-beginning"
  ogTitle: "DoorDash: DoorDash’s ML Platform – The Beginning - ZenML MLOps Database"
  ogDescription: "DoorDash built a comprehensive ML Platform in 2020 to address the increasing complexity and scale of deploying machine learning models across their logistics and marketplace operations. The platform emerged from the need to support diverse ML scenarios including online real-time predictions, offline batch predictions, and exploratory analysis while maintaining engineering productivity and system scalability. Their solution standardized on LightGBM for tree-based models and PyTorch for neural networks, then built four key pillars: a modeling library for training and evaluation, a model training pipeline for CI/CD-style automation, a features service for computing and serving both real-time and historical features, and a prediction service for low-latency inference with support for shadowing and A/B testing. This platform architecture enabled DoorDash to systematically manage the end-to-end model lifecycle from experimentation through production deployment across critical use cases like delivery time predictions, search ranking, demand forecasting, and fraud detection."
mlops:
  source: "sqlite"
  entryId: 100
  sourceUrl: "https://careersatdoordash.com/blog/doordash-ml-platform-the-beginning/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061388"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

DoorDash's machine learning infrastructure challenges emerged from the rapid proliferation of ML models across their logistics and marketplace platform. The company deployed machine learning in numerous critical applications including Dasher assignment optimization, supply and demand balancing, fraud prediction, search ranking, menu classification, and recommendation systems. As ML usage expanded across these diverse use cases, the engineering organization faced fragmentation in frameworks, tooling, and deployment patterns that hindered productivity and made it difficult to maintain quality and performance standards at scale.

The core pain points driving the ML Platform initiative centered on two primary concerns: scalability and productivity. Without standardized infrastructure, each team was effectively solving similar problems independently—how to train models, how to serve predictions, how to manage features, and how to test and deploy changes safely. This duplication of effort meant that shipping ML-based solutions took longer than necessary and required deep expertise in multiple frameworks. Additionally, the lack of standardization made it difficult to build shared organizational knowledge and best practices around ML engineering.

## Architecture & Design

DoorDash's ML Platform architecture is organized around four fundamental pillars that support the complete model lifecycle, with particular emphasis on supporting three distinct prediction scenarios that emerged from analyzing their ML usage patterns.

The three key scenarios that shaped the architecture are online models, offline models, and exploratory models. Online models operate in the critical path of user experiences, making real-time predictions with strict latency and memory requirements for use cases like food preparation time predictions, quoted delivery time predictions, and search ranking. Offline models generate predictions used in production but outside request/response paths, such as demand and supply predictions, where runtime performance is secondary but persistence to the data warehouse is essential. Exploratory models support hypothesis testing and analysis without production usage constraints, explicitly allowing unrestricted framework choices.

### Feature Store Architecture

The Feature Store sits at the heart of the platform's data infrastructure, designed as a low-latency datastore that the Prediction Service queries to retrieve common features needed for model evaluation. The feature store supports numerical, categorical, and embedding feature types, providing a unified interface for accessing precomputed environmental features that capture the operational state of DoorDash's marketplace.

Features flow into the store through two distinct computational paths. The Realtime Feature Aggregator listens to event streams and performs continuous aggregation to compute features like historic store wait times over the past thirty minutes or recent driving speeds. These real-time aggregations enable the platform to respond to rapidly changing marketplace conditions. The Historical Aggregator runs offline batch jobs to compute longer-term aggregations spanning windows like one week or three months. These historical calculations execute offline, with results stored in both the Feature Warehouse for analytical access and uploaded to the Feature Store for low-latency serving.

This dual-path architecture reflects a fundamental design trade-off: real-time features provide responsiveness to current conditions but are computationally expensive to maintain, while historical features offer stability and lower computational overhead at the cost of some staleness. The platform accommodates both patterns to support different model requirements.

### Model Training and Registry Infrastructure

The Model Training Pipeline functions as the CI/CD system for machine learning models, enforcing a disciplined approach to production model management. All production models must be built through this pipeline, with training scripts stored in the git repository providing version control and auditability. The pipeline maintains exclusive write access to the Model Store, creating a complete audit trail of all changes to production models for security and compliance purposes.

The Model Store serves as the centralized registry for model artifacts and metadata. Beyond simply storing model files, it tracks which model version is currently active for specific prediction tasks and defines which models receive shadow traffic for evaluation before full deployment. This metadata layer enables sophisticated deployment patterns like gradual rollouts and A/B testing while maintaining clear lineage of model versions.

The platform's roadmap includes automated model retraining on regular schedules and auto-deployment with monitoring, moving toward continuous learning systems that can adapt to changing data distributions without manual intervention. This represents an evolution from traditional batch retraining toward more dynamic model management.

### Prediction Service Architecture

The Prediction Service handles production inference workloads, loading models from the Model Store and evaluating them upon receiving prediction requests. The service architecture supports both request-level features (capturing request-specific information like the number of items in an order or request time) and environmental features retrieved from the Feature Store (capturing marketplace state like average wait times or recent order volumes).

For each prediction request, the service accepts request features, context identifiers (store ID, consumer ID, etc.), and a prediction name, with optional model ID override to support A/B testing scenarios. This design enables experimentation frameworks to route traffic to different model versions while maintaining a unified serving interface.

The service generates comprehensive Prediction Logs that capture the predictions made, the features used during evaluation, and the model ID that produced the prediction. These logs serve dual purposes: debugging production issues and generating training data for the next model refresh, creating a feedback loop that improves model quality over time.

Shadow testing capabilities allow the platform to evaluate new models in production environments without impacting user experiences. Models can receive live traffic and generate predictions solely for evaluation purposes, enabling teams to measure real-world performance before committing to full deployment.

### Modeling Library

The Modeling Library provides a Python-based development environment for data scientists and ML engineers, encapsulating training, evaluation, model artifact creation, and offline prediction capabilities. The library produces model artifacts compatible with the Prediction Service's loading mechanisms, ensuring consistency between training and serving environments. This library acts as the "compiler" that transforms training scripts into deployable models, with the Model Training Pipeline serving as the "build system" that executes this compilation process in a controlled, reproducible manner.

## Technical Implementation

The framework standardization process represents one of the most consequential technical decisions in the platform's design. DoorDash explicitly chose to support a minimal set of frameworks rather than attempting to accommodate arbitrary choices, recognizing that deep expertise in a few frameworks provides more value than shallow knowledge across many.

### Framework Selection Process

For tree-based models, the team evaluated XGBoost, LightGBM, and CatBoost using production models already deployed at DoorDash. They measured model quality using PR AUC metrics and benchmarked training and prediction times. The evaluation revealed that model accuracy was essentially equivalent across all three frameworks for their use cases. LightGBM demonstrated the fastest training performance, while XGBoost showed slightly faster prediction times but not by a significant margin. Given that existing production models were already implemented in LightGBM, the team selected it as the standard framework for tree-based models, balancing technical performance with migration costs.

For neural network models, the evaluation focused on TensorFlow and PyTorch. Again, model quality differences proved negligible for DoorDash's use cases. PyTorch showed slower CPU training performance compared to TensorFlow, but both frameworks achieved similar training speeds on GPUs. Prediction throughput measured in predictions per minute was comparable between the frameworks. The decision ultimately came down to API design and developer experience. The team found PyTorch's API more coherent for both training and prediction workflows. The launch of TorchScript with C++ support proved decisive, providing the API needed to integrate with DoorDash's Kotlin-based prediction service infrastructure using JNI (Java Native Interface).

### Technology Stack Integration

DoorDash's broader technology stack standardization on Kotlin created specific requirements for the ML platform's serving infrastructure. Models needed simple C/C++ APIs at prediction time to enable JNI-based integration with Kotlin services. This constraint influenced the framework selection, favoring options with mature C++ inference APIs like XGBoost's C API and PyTorch's TorchScript C++ interface.

The platform architecture integrates with DoorDash's existing data infrastructure, including their data warehouse for persisting offline predictions and their event streaming systems for real-time feature aggregation. The Feature Warehouse stores historical feature computations for analytical access, while the Feature Store provides low-latency serving for production inference.

## Scale & Performance

While the document represents the initial design phase of the platform with implementation just beginning, several performance considerations shaped the architecture. Online models require low-latency predictions in the critical path of user experiences, with strict memory footprint requirements to support high-throughput serving. The framework evaluations measured training times and predictions per minute, though specific numerical benchmarks are not disclosed in the document.

The feature store architecture targets low-latency access patterns to support real-time prediction scenarios like food preparation time estimation and delivery time quotes that directly impact user experience. Real-time feature aggregation operates on streaming event data with temporal windows like the past thirty minutes, while historical aggregations span windows from one week to three months.

The platform must support diverse use cases across DoorDash's operations including Dasher assignment optimization, supply and demand balancing, fraud prediction, search ranking, menu classification, and recommendations. This breadth of applications means the platform needs to handle varying prediction volumes, latency requirements, and feature complexities across different product areas.

## Trade-offs & Lessons

### Framework Standardization Trade-offs

The decision to standardize on a minimal set of ML frameworks represents a fundamental trade-off between flexibility and organizational effectiveness. By restricting framework choices, DoorDash accepts that some pre-trained models or specialized techniques might not be immediately available in their supported frameworks. However, they gain several advantages: deep organizational expertise in the chosen frameworks, better ability to optimize performance and troubleshoot issues, shared knowledge and best practices across teams, and reduced maintenance burden for the platform team.

The team explicitly carved out exploratory models as an exception to framework restrictions, recognizing that innovation requires some freedom to experiment. This creates a clear boundary: exploration can use any tools, but production deployment requires migration to supported frameworks. This pattern balances the need for innovation with the operational benefits of standardization.

### API Design and Developer Experience

The choice of PyTorch over TensorFlow despite similar performance characteristics highlights the importance of API coherence and developer experience in platform adoption. Technical performance metrics like training speed and prediction throughput mattered less than the day-to-day experience of data scientists writing and debugging models. A more intuitive, consistent API reduces friction and enables teams to ship models faster, aligning with the platform's productivity goals.

### Feature Architecture Complexity

The dual-path feature computation architecture (real-time aggregation and historical aggregation) introduces operational complexity but provides essential flexibility. Real-time features require streaming infrastructure, stateful aggregation, and careful handling of late-arriving events. Historical features need batch processing orchestration and warehouse integration. Supporting both patterns means maintaining two distinct computational pipelines, but this complexity enables models to leverage both recent marketplace dynamics and long-term behavioral patterns.

The separation of Feature Store (for serving) and Feature Warehouse (for analytics and training) reflects the reality that serving requirements differ from analytical access patterns. Low-latency serving needs optimized data structures and caching strategies, while analytical workloads benefit from columnar storage and ad-hoc query capabilities. Maintaining both adds infrastructure overhead but prevents serving requirements from constraining analytical workflows or vice versa.

### Model Lifecycle Management

The platform's approach to model lifecycle management emphasizes control and auditability over rapid iteration. Requiring all production models to be built through the centralized Model Training Pipeline with git-based training scripts creates process overhead but provides critical benefits: complete audit trails for compliance and debugging, reproducible builds for model artifacts, security controls over what gets deployed to production, and a natural integration point for automated testing and monitoring.

The Prediction Logs that capture features, predictions, and model IDs create a powerful feedback loop for model improvement but generate significant data volumes. These logs enable debugging production issues, analyzing model performance on real traffic, and generating training data for model refreshes. However, the storage and processing costs of comprehensive prediction logging can become substantial at scale, requiring careful management of retention policies and sampling strategies.

### Shadow Testing and A/B Testing

The platform's built-in support for shadow testing and A/B testing reflects a mature understanding of ML deployment risks. Shadow testing allows models to be evaluated on production traffic without impacting users, providing realistic performance data before full deployment. A/B testing enables statistical comparison of model versions on live traffic. Building these capabilities into the core platform infrastructure rather than implementing them ad-hoc for each model reduces the friction of safe deployment and encourages better evaluation practices.

### Evolutionary Architecture

The document notes that the team is "just starting to execute on this plan" with significant work remaining in building, scaling, and operating the platform. This acknowledgment of the platform as an evolving system rather than a one-time project reflects realistic expectations about ML infrastructure development. The roadmap includes future capabilities like automated model retraining, auto-deployment, and monitoring, suggesting a phased approach that delivers core functionality first and adds sophistication over time.

The architecture described provides clear extension points for future capabilities while establishing foundational patterns. The Model Store's metadata layer can support increasingly sophisticated deployment strategies. The Feature Store's interface can accommodate new feature types and computation patterns. The Prediction Service can add new evaluation modes and traffic routing strategies. This extensibility suggests thoughtful architectural planning that anticipates evolution without over-engineering the initial implementation.
