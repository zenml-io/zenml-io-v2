---
title: "Uber Michelangelo end-to-end ML platform for scalable pipelines, feature store, distributed training, and low-latency predictions"
slug: "uber-michelangelo-uber-michelangelo-end-to-end-ml-platform-for-scalable-pipelines-feature-store-distributed-training-and"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "databricks"
  - "docker"
  - "horovod"
  - "kubernetes"
  - "spark"
  - "ab-testing"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "model-validation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Uber"
companySlug: "uber"
platformName: "Michelangelo"
contentType: "blog"
summary: "Uber built Michelangelo, an end-to-end ML platform, to address critical scaling challenges in their ML operations including unreliable pipelines, massive resource requirements for productionizing models, and inability to scale ML projects across the organization. The platform provides integrated capabilities across the entire ML lifecycle including a centralized feature store called Palette, distributed training infrastructure powered by Horovod, model evaluation and visualization tools, standardized deployment through CI/CD pipelines, and a high-performance prediction service achieving 1 million queries per second at peak with P95 latency of 5-10 milliseconds. The platform enables data scientists and engineers to build and deploy ML solutions at scale with reduced friction, empowering end-to-end ownership of the workflow and dramatically accelerating the path from ideation to production deployment."
link: "https://medium.com/@nlauchande/review-notes-of-ml-platforms-uber-michelangelo-e133eb6031da"
year: 2019
seo:
  title: "Uber: Uber Michelangelo end-to-end ML platform for scalable pipelines, feature store, distributed training, and low-latency predictions - ZenML MLOps Database"
  description: "Uber built Michelangelo, an end-to-end ML platform, to address critical scaling challenges in their ML operations including unreliable pipelines, massive resource requirements for productionizing models, and inability to scale ML projects across the organization. The platform provides integrated capabilities across the entire ML lifecycle including a centralized feature store called Palette, distributed training infrastructure powered by Horovod, model evaluation and visualization tools, standardized deployment through CI/CD pipelines, and a high-performance prediction service achieving 1 million queries per second at peak with P95 latency of 5-10 milliseconds. The platform enables data scientists and engineers to build and deploy ML solutions at scale with reduced friction, empowering end-to-end ownership of the workflow and dramatically accelerating the path from ideation to production deployment."
  canonical: "https://www.zenml.io/mlops-database/uber-michelangelo-uber-michelangelo-end-to-end-ml-platform-for-scalable-pipelines-feature-store-distributed-training-and"
  ogTitle: "Uber: Uber Michelangelo end-to-end ML platform for scalable pipelines, feature store, distributed training, and low-latency predictions - ZenML MLOps Database"
  ogDescription: "Uber built Michelangelo, an end-to-end ML platform, to address critical scaling challenges in their ML operations including unreliable pipelines, massive resource requirements for productionizing models, and inability to scale ML projects across the organization. The platform provides integrated capabilities across the entire ML lifecycle including a centralized feature store called Palette, distributed training infrastructure powered by Horovod, model evaluation and visualization tools, standardized deployment through CI/CD pipelines, and a high-performance prediction service achieving 1 million queries per second at peak with P95 latency of 5-10 milliseconds. The platform enables data scientists and engineers to build and deploy ML solutions at scale with reduced friction, empowering end-to-end ownership of the workflow and dramatically accelerating the path from ideation to production deployment."
mlops:
  source: "sqlite"
  entryId: 13
  sourceUrl: "https://medium.com/@nlauchande/review-notes-of-ml-platforms-uber-michelangelo-e133eb6031da"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.060458"
  lastUpdated: "2026-04-14T19:54:34.871430"
---

## Problem Context

Uber faced significant challenges in scaling their machine learning operations that motivated the development of Michelangelo. The primary pain points centered around organizational and technical barriers that prevented ML from achieving broad impact across the company.

The most critical issue was the limited impact of ML due to the enormous resources required when translating local, experimental models into production systems. Data scientists could build promising models in notebooks, but the engineering effort needed to productionize these models created a massive bottleneck. This translation gap meant that many valuable models never made it to production, limiting the return on ML investments.

Unreliable ML and data pipelines created operational challenges that undermined trust in ML systems. Engineering teams were forced to create custom serving containers and systems on an ad-hoc basis for each new model, leading to duplicated effort, inconsistent practices, and maintenance burdens. The lack of standardization meant that every new ML project essentially started from scratch when it came to serving infrastructure.

The inability to scale ML projects across the organization was perhaps the most strategic concern. Without shared infrastructure and tooling, ML expertise and solutions remained siloed within individual teams. This prevented knowledge sharing, created redundant work, and made it difficult to staff new ML initiatives effectively.

## Architecture & Design

Michelangelo is structured as an end-to-end ML platform organized around six major functional areas that cover the complete ML lifecycle. The platform's mission is to "enable engineers and data scientists across the company to easily build and deploy machine learning solutions at scale" through a unified platform approach.

### Data Management and Feature Store

At the foundation of Michelangelo sits a centralized feature store called Palette, which represents one of the platform's most critical innovations. The feature store enables teams to discover, share, and reuse features across different ML projects, dramatically lowering the activation energy required to start new ML initiatives.

The feature data model in Palette addresses the fundamental duality problem in ML systems where training happens in batch while inference often needs real-time features. Uber's solution involves generating features in streaming fashion and performing double writes to both the data lake for batch training and the feature store for online serving. This ensures consistent feature values are used across training and serving contexts.

Features in Palette are marked with freshness metadata that allows models to make decisions about whether feature data is sufficiently current for their needs. Features support both streamable delivery for real-time scoring and batch rendering for training workloads. This dual-mode operation is essential for maintaining consistency between training and serving environments, which is a common source of production ML failures.

The feature store provides on-demand delivery of features at both training time and runtime. When models are trained, they can pull historical feature values from the data lake. At serving time, the prediction service can query the online feature store to augment incoming requests with additional contextual features.

### Training Infrastructure

Michelangelo provides distributed training infrastructure built on Horovod, the open-source distributed deep learning framework. The platform extends Horovod with specialized tooling and enhanced reporting capabilities tailored to Uber's needs.

The training system supports multiple model types including deep learning models, tree-based models, and traditional ML algorithms. Different model types get specialized metrics and visualization capabilities. For example, tree-based models get feature importance visualizations, while deep learning models get training curve analysis and layer activation inspection.

Data scientists can wire their models to datasets registered in the Hive catalog through the platform's API. This integration with Uber's data infrastructure means modelers don't need to manually extract and prepare training data—they can reference datasets by name and the platform handles data access.

### Model Evaluation and Inspection

The evaluation component provides infrastructure for inspecting trained models before deployment. This includes model visualization capabilities such as decision tree rendering that helps data scientists understand model behavior. The platform tracks specialized metrics appropriate for each model type, enabling rigorous comparison between model versions and architectures.

### Deployment Infrastructure

Models are deployed through standard software engineering practices including CI/CD pipelines, automated testing, and the ability to perform rollbacks based on metrics monitoring. Trained models are compiled as artifacts and distributed across Uber's data centers for serving.

The deployment process features one-click deployment capability from the management UI. Data scientists can package a trained model and deploy it to production infrastructure without needing to involve separate operations teams. The platform handles versioning and maintains deployment history, enabling easy rollbacks if production metrics degrade.

### Prediction Service

The prediction service represents the runtime component of Michelangelo and demonstrates impressive performance characteristics. The service receives prediction requests and uses header information to route to the appropriate model. Models are pre-loaded into memory for fast inference.

A key architectural feature is the integration with the feature store through an internal domain-specific language (DSL). This DSL enables the prediction service to query for additional data augmentation at serving time, pulling fresh features from the online feature store to enrich the input vector before feeding it to the model. This pattern allows models to use features that may not be available in the initial request but can be looked up based on request identifiers.

The prediction service achieves peak throughput of 1 million queries per second across Uber's infrastructure. P95 latency is 10 milliseconds when the service needs to query the feature store for additional features, and 5 milliseconds when the model can make predictions based solely on the input request without feature store lookups. These latency numbers are remarkable given the scale of operations and the complexity of feature lookups.

### Monitoring and Observability

Models are trained and evaluated against historical data, but production performance can diverge from offline metrics. Michelangelo runs batch monitoring jobs hourly to detect prediction drift by comparing predictions against ground truth outcomes as they become available.

The monitoring approach logs all predictions and joins them to actual outcomes when available. The system publishes error metrics and aggregates, generates ongoing accuracy measurements, and produces alerts that can trigger automated rollbacks of problematic model versions. There is typically an hour delay for batch monitoring approaches to collect sufficient data for analysis.

Beyond accuracy monitoring, the platform monitors the distributions of both predictions and features over time. Distribution shift in features can indicate that the model is being applied to data different from its training distribution, which can degrade performance even if the model itself hasn't changed. Monitoring prediction distributions helps detect anomalies in model behavior.

### Workflow Management

Michelangelo provides an API-driven workflow management layer that can be accessed from Python or Java. This management plane includes a UI that allows data scientists to manage models and deployments visually while also supporting programmatic access for automation.

The workflow management system enables data scientists to wire together complete ML pipelines from data ingestion through model deployment. This end-to-end integration means a single interface covers the entire lifecycle rather than requiring stitching together disparate tools.

## Technical Implementation

Michelangelo is built on top of Uber's existing data infrastructure, integrating with the Hive catalog for data discovery and leveraging Uber's data centers for model serving. The platform uses Horovod for distributed training, which provides efficient implementations of distributed gradient descent algorithms with optimizations for ring-allreduce communication patterns.

The feature store double-writes to both a data lake for batch access and an online store for low-latency serving. This architecture trades storage efficiency for operational simplicity and consistency guarantees. The streaming feature generation pipeline ensures features are computed using identical logic whether for training or serving.

The prediction service uses a custom internal DSL for expressing feature augmentation logic. This DSL describes how to enrich requests by querying the feature store, allowing the serving infrastructure to optimize these queries while keeping the model code independent of data access patterns.

Models are compiled as artifacts that can be distributed across Uber's infrastructure. The platform supports multiple model serialization formats appropriate for different ML frameworks. The serving infrastructure loads these artifacts and provides a consistent prediction API regardless of the underlying model implementation.

## Evolution: PYML and Democratization

Uber recognized that while Michelangelo v1 provided robust, scalable infrastructure, it could be too heavyweight for rapid experimentation. This led to the development of PYML, an evolution focused on reducing friction and empowering data scientists with end-to-end ownership.

PYML enables data scientists to manage models and deployments directly through customized Jupyter notebooks. This approach prioritizes developer experience and velocity, allowing quicker prototyping and faster deployment of pilot models to production. Data scientists can own the entire deployment process without handoffs to engineering teams.

The tradeoffs between the Java-packaged Michelangelo v1 approach and the democratized PYML approach are instructive. PYML accepts slightly higher latency in exchange for dramatically faster time-to-production. The philosophy is to enable quick pilots and experiments, then port successful models to the more highly scalable system when scale demands it.

This two-tier approach reflects a mature understanding of ML platform requirements: not every model needs maximum scalability from day one, and forcing every experiment through heavyweight infrastructure creates unnecessary friction. PYML reduces the time from ideation to production by giving data scientists the tools they prefer while maintaining the option to graduate successful models to more optimized infrastructure.

## Scale & Performance

The scale metrics from Michelangelo are impressive and demonstrate production-grade ML infrastructure:

- Peak prediction throughput of 1 million queries per second across the platform
- P95 latency of 5 milliseconds for predictions without feature store access
- P95 latency of 10 milliseconds for predictions requiring feature store queries
- Hourly batch monitoring jobs processing prediction logs and ground truth data
- Support for multiple model types from deep learning to tree-based algorithms across distributed training infrastructure

The feature store serves features at both batch scale for training and at the millisecond latencies required for real-time inference. The double-write architecture to data lake and online store enables this dual-mode operation while maintaining consistency.

## Trade-offs & Lessons

Uber documented several key lessons from building and operating Michelangelo that offer valuable insights for practitioners building ML platforms:

**Developer Choice and Ergonomics**: One of the most important lessons is to let developers and data scientists use the tools they want. The evolution to PYML reflects this learning—forcing everyone through the same heavyweight infrastructure creates friction that slows innovation. Supporting Jupyter notebooks and Python workflows increased adoption and velocity.

**Data as the Hardest Problem**: Data is identified as the most important part of ML infrastructure and the hardest to get right. The investment in the Palette feature store reflects this understanding. Feature engineering, versioning, and consistency between training and serving are harder problems than model training or serving in isolation.

**Open Source Integration Costs**: It takes significant effort and time to make open source software work correctly in production. While Uber leveraged Horovod and references other open source tools, they invested substantial engineering effort to integrate, extend, and operationalize these components. Organizations should not underestimate the work required to productionize OSS.

**Iterative Development with Vision**: The platform was developed iteratively based on user feedback while maintaining a long-term vision. The evolution from Michelangelo v1 to PYML demonstrates this approach—responding to user needs for faster experimentation while preserving the core platform capabilities.

**Real-time ML Challenges**: Real-time ML is particularly challenging to get right. The prediction service achieves impressive latency and throughput numbers, but this required careful architectural decisions around model loading, feature store integration, and the DSL for feature augmentation. The duality problem of batch training versus real-time serving requires explicit architectural solutions.

**Feature Store Value**: A feature store dramatically lowers the activation energy required to start a machine learning project. By providing discoverable, reusable features, teams can bootstrap new models more quickly and benefit from the feature engineering work done by others. This compounds the value of ML investments across the organization.

**Ownership and Empowerment**: End-to-end ownership by data scientists, enabled by platforms like PYML, accelerates development velocity. Reducing handoffs between data scientists and engineers eliminates communication overhead and allows faster iteration. However, this requires platforms that are safe and easy enough for data scientists to operate production systems.

**Multi-tier Architecture**: Supporting both heavyweight, highly optimized infrastructure (Michelangelo v1) and lightweight, rapid experimentation paths (PYML) provides flexibility. Not every model needs to be on the most scalable infrastructure immediately. Allowing models to graduate from experimentation to production-scale serving based on actual needs optimizes resource allocation.

The monitoring approach that joins predictions to outcomes and tracks both accuracy metrics and distribution shifts represents mature thinking about production ML. Automated rollbacks based on metrics monitoring provide safety nets that enable faster deployment with acceptable risk.

The architectural decision to double-write features to both batch and online stores trades storage costs for operational simplicity and consistency. This is a pragmatic choice that avoids complex synchronization logic and eliminates an entire class of training-serving skew bugs.
