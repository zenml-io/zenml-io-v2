---
title: "Monzo’s machine learning stack"
slug: "monzo-monzos-ml-stack-monzos-machine-learning-stack"
draft: false
mlopsTags:
  - "feature-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "notebooks"
  - "pipeline-orchestration"
  - "airflow"
  - "databricks"
  - "dbt"
  - "docker"
  - "sagemaker"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "serving"
  - "shadow-deployment"
  - "training"
industryTags: "finance"
company: "Monzo"
companySlug: "monzo"
platformName: "Monzo's ML stack"
contentType: "blog"
summary: "Monzo, a UK digital bank, built a flexible and pragmatic machine learning platform designed around three core principles: autonomy for ML practitioners to deploy end-to-end, flexibility to use any ML framework or approach, and reuse of existing infrastructure rather than building isolated systems. The platform spans both Google Cloud (for training and batch inference) and AWS (for production serving), enabling ML teams embedded across five squads to work on diverse problems ranging from fraud prevention to customer service optimization. By leveraging existing tools like BigQuery for feature engineering, dbt and Airflow for orchestration, Google AI Platform for training, and integrating lightweight Python microservices into their Go-based production stack, Monzo has minimized infrastructure management overhead while maintaining the ability to deploy a wide variety of models including scikit-learn, XGBoost, LightGBM, PyTorch, and transformers into real-time and batch prediction systems."
link: "https://monzo.com/blog/2022/04/26/monzos-machine-learning-stack"
year: 2022
seo:
  title: "Monzo: Monzo’s machine learning stack - ZenML MLOps Database"
  description: "Monzo, a UK digital bank, built a flexible and pragmatic machine learning platform designed around three core principles: autonomy for ML practitioners to deploy end-to-end, flexibility to use any ML framework or approach, and reuse of existing infrastructure rather than building isolated systems. The platform spans both Google Cloud (for training and batch inference) and AWS (for production serving), enabling ML teams embedded across five squads to work on diverse problems ranging from fraud prevention to customer service optimization. By leveraging existing tools like BigQuery for feature engineering, dbt and Airflow for orchestration, Google AI Platform for training, and integrating lightweight Python microservices into their Go-based production stack, Monzo has minimized infrastructure management overhead while maintaining the ability to deploy a wide variety of models including scikit-learn, XGBoost, LightGBM, PyTorch, and transformers into real-time and batch prediction systems."
  canonical: "https://www.zenml.io/mlops-database/monzo-monzos-ml-stack-monzos-machine-learning-stack"
  ogTitle: "Monzo: Monzo’s machine learning stack - ZenML MLOps Database"
  ogDescription: "Monzo, a UK digital bank, built a flexible and pragmatic machine learning platform designed around three core principles: autonomy for ML practitioners to deploy end-to-end, flexibility to use any ML framework or approach, and reuse of existing infrastructure rather than building isolated systems. The platform spans both Google Cloud (for training and batch inference) and AWS (for production serving), enabling ML teams embedded across five squads to work on diverse problems ranging from fraud prevention to customer service optimization. By leveraging existing tools like BigQuery for feature engineering, dbt and Airflow for orchestration, Google AI Platform for training, and integrating lightweight Python microservices into their Go-based production stack, Monzo has minimized infrastructure management overhead while maintaining the ability to deploy a wide variety of models including scikit-learn, XGBoost, LightGBM, PyTorch, and transformers into real-time and batch prediction systems."
mlops:
  source: "sqlite"
  entryId: 114
  sourceUrl: "https://monzo.com/blog/2022/04/26/monzos-machine-learning-stack"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061548"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Monzo faced the challenge of building a machine learning platform that could serve diverse use cases across a rapidly growing digital bank, from financial crime prevention to customer service optimization. The key pain points that motivated their platform design were straightforward but critical: they needed to enable ML practitioners to work autonomously without depending on handovers to backend engineers for deployment, they wanted to avoid locking themselves into specific frameworks or approaches that might limit future capabilities, and they needed to build this capability efficiently without creating an entirely separate infrastructure stack disconnected from their existing production and data systems.

Several years ago, when a small group began planning their ML approach, they recognized that Monzo already had a strong foundation with a microservice-based production stack and a developing data infrastructure. Rather than follow the path of building a standalone ML platform common at some larger tech companies, they explicitly chose to integrate ML capabilities into existing systems. This decision reflected a pragmatic understanding that their relatively small ML team (embedded across five squads working in four different areas) needed to move quickly and couldn't afford to maintain parallel infrastructure.

The bank needed to support both batch and real-time inference patterns. Some models, like daily risk assessments, could run on schedules, while others, particularly fraud classifiers, needed to execute on every transaction in real-time. This diversity of use cases, combined with different data requirements and latency constraints, demanded a platform flexible enough to accommodate various deployment patterns without forcing teams into a one-size-fits-all approach.

## Architecture & Design

Monzo's ML stack is deliberately modular, allowing teams to use only the components relevant to their specific problem. The architecture spans both Google Cloud Platform (for training and batch inference) and AWS (for production serving), with careful integration points between these environments.

### Development and Prototyping Layer

The workflow begins with Google Colab notebooks used exclusively for rapid exploration and prototyping. Monzo treats notebooks similarly to how engineers use whiteboarding tools—they're for quick viability assessments to determine if an idea is worth pursuing. Critically, notebooks never go beyond this exploratory phase; when ideas mature, they're reimplemented in the production codebase. This clear boundary prevents the common anti-pattern of notebooks gradually evolving into production systems.

### Training Pipeline Architecture

The core training infrastructure lives in a Python monorepo on GitHub, containing jobs, libraries, and command-line tools. Monzo architecturally separates dataset creation from model training into two distinct job types, decoupling how datasets are created from how models are trained. This separation enables experimentation with different model architectures or hyperparameters without needing to regenerate datasets.

Dataset creation jobs orchestrate multiple BigQuery SQL queries to prepare training data, then export versioned snapshots to Google Cloud Storage. The decision to implement the majority of feature engineering in SQL rather than using frameworks like Spark is significant—it allows Monzo to leverage BigQuery's distributed architecture and reuse data already existing in their warehouse without managing separate compute clusters.

Model training jobs run as custom containers on Google's AI Platform, typically starting by downloading a data snapshot and ending by uploading the trained model. This containerized approach provides flexibility to select appropriate instance types (including GPU instances for deep learning workloads) and parameterize jobs. The monorepo includes shared libraries for common functionality like saving models to the registry, plus scripts for building containers, pushing them to Google Container Registry, and submitting jobs to AI Platform. Makefile commands standardize the process of creating and submitting jobs.

### Model Registry

Every trained model at Monzo is uploaded to a centralized model registry, which serves as the single source of truth for all ML models in the organization. This registry enables several critical capabilities: retrieving models for inference across both the Google Cloud data stack and AWS production stack, controlling model state as they're validated (Monzo uses shadow mode deployments extensively for validation), and capturing metadata about model training runs.

Monzo notes they've iterated significantly on the registry over several years and were completing a migration at the time of writing, suggesting this component has evolved as their needs have grown more sophisticated.

### Batch Inference Architecture

For models that run on schedules (daily, weekly, etc.), Monzo leverages their existing data stack infrastructure. They write dbt models to transform data and prepare inputs, then implement Python jobs that load data, load the model, and generate predictions. The dbt models and batch jobs are orchestrated together using Airflow, which is managed by the Data Platform Engineering team. Jobs are submitted to Google AI Platform for execution.

The architecture for acting on batch predictions is particularly noteworthy. Predictions are published as events to Google Pub/Sub, enabling downstream consumers to trigger actions. One consumer lives in the production stack and republishes events onto NSQ (Monzo's message queue in production), allowing any backend service to consume them and enabling predictions to be injected back into the data warehouse for analysis. This event-driven approach cleanly bridges the Google Cloud and AWS environments.

### Real-Time Inference Architecture

Real-time inference runs in Monzo's AWS-based production stack, which is primarily written in Go and uses Cassandra as the main database. Monzo introduced Python microservices into this environment, deliberately keeping them lightweight. In many cases, these services do little more than load models into memory and serve predictions from handlers, delegating any heavy computational work to Go services.

The real-time serving layer required solving three key challenges:

**Deployment management**: Python microservices are generated from templates and integrated with existing deployment tooling to make Python deployments as similar as possible to Go service deployments. This consistency reduces cognitive overhead and allows ML practitioners to use familiar tools.

**Model management**: A production model registry with an API allows any Python service to request specific models. Services can automatically reload new models as they're activated in production, enabling zero-downtime model updates.

**Feature management**: Monzo categorizes features into two types based on how they're computed:

- Operational features are computed in real-time, either by consuming from NSQ event streams or making RPC requests to other services on demand. Examples include text embeddings computed in real-time and various fraud-related features.

- Analytics features are computed on schedule in the data warehouse (BigQuery) and then transferred into Cassandra for on-demand retrieval during inference. These features don't need millisecond-level freshness but provide significant value, such as multi-month aggregations of customer behavior.

This hybrid feature architecture balances the need for fresh data with the computational costs of real-time feature engineering. By pre-computing analytics features and serving them from Cassandra, Monzo achieves low-latency inference while still incorporating rich historical context.

## Technical Implementation

### Core Technologies

The platform is built on a carefully selected technology stack:

- **Programming Languages**: Python for ML workloads, Go for production services, SQL for feature engineering
- **Cloud Platforms**: Google Cloud Platform for training and batch inference, AWS for production serving
- **Data Warehouse**: BigQuery for data storage and transformation
- **Data Orchestration**: dbt for data modeling, Airflow for workflow orchestration
- **Training Infrastructure**: Google AI Platform for running training jobs with custom containers
- **Container Management**: Google Container Registry for storing container images
- **Databases**: Cassandra for production feature storage and serving
- **Message Queues**: NSQ in production (AWS), Google Pub/Sub in data stack (GCP)
- **Model Frameworks**: scikit-learn, XGBoost, LightGBM, PyTorch, transformers, skorch, Gensim (with room for experimentation)

### Development Workflow

All jobs go through peer review before being merged into the shared monorepo on GitHub. Teams use cookiecutter templates to create new jobs, ensuring consistency across the platform. The use of templates extends to Python microservices as well, making it straightforward to spin up new serving endpoints.

The reliance on Makefiles for common operations (building containers, submitting jobs) provides a simple, scriptable interface that doesn't require learning complex CLI tools. This approach aligns with Monzo's goal of making ML deployment accessible to ML practitioners who may not have extensive DevOps experience.

### Monitoring Architecture

Monzo deliberately reuses company-wide monitoring tools rather than building ML-specific monitoring systems, splitting monitoring into three categories:

- **System monitoring** uses Grafana to track service health metrics like inbound requests, latency, memory usage, and CPU utilization—the same tool backend engineers use throughout Monzo.

- **Feature monitoring** tracks the health of data ingested into the feature store from the warehouse, using dbt-Slack alert integrations built by the Data Platform team plus data validation queries implemented as ingestion preconditions.

- **Model performance monitoring** uses Looker to track model-specific metrics like precision and recall alongside business impact metrics like fraud rates—the same tool data scientists use for product dashboards.

This unified approach to monitoring makes ML systems accessible to non-ML stakeholders. Product managers can review Looker dashboards showing ML metrics alongside product metrics, bringing technical and business perspectives closer together.

## Scale & Performance

While the blog post doesn't provide extensive quantitative metrics, several scale indicators emerge:

- ML practitioners are embedded across five squads working in four different areas of the company
- All fraud classifiers run in real-time on every transaction initiated
- The platform supports both batch jobs (daily/weekly schedules) and real-time inference
- Models are deployed across both Google Cloud and AWS environments
- The model registry contains all models across the entire organization
- Multiple ML frameworks are in production: scikit-learn, XGBoost, LightGBM, PyTorch, transformers, skorch, and Gensim

The platform has grown sufficiently that other teams beyond the core ML team have begun adopting it. The Decision Science team recently started using the infrastructure to train statistical models for borrowing products, indicating the platform has achieved enough maturity and usability to support broader adoption.

## Trade-offs & Lessons

### What Worked Well

The decision to reuse existing infrastructure rather than building an isolated ML stack has proven highly beneficial. By implementing feature engineering in SQL and leveraging BigQuery's distributed architecture, Monzo avoids managing Spark clusters or similar distributed compute infrastructure. Teams spend "little to no time managing infrastructure" and rarely manually spin up virtual machines. This operational efficiency is particularly valuable for a relatively small ML organization.

The uniform approach across all ML systems makes it easier to move between projects. Since systems "all functionally look the same and they all use the same tools," upgrades can be implemented once and benefit everyone. This consistency reduces cognitive overhead and accelerates onboarding.

The principle of autonomy has enabled ML practitioners to deploy end-to-end without handovers to backend engineers, speeding up iteration cycles and encouraging practitioners to think about production use cases during model design rather than treating deployment as an afterthought.

The flexibility to use various ML frameworks has allowed teams to select appropriate tools for different problems without being constrained by platform limitations. This has been particularly important given the diversity of use cases across fraud prevention, customer service, and other domains.

The event-driven architecture for batch predictions provides a clean separation of concerns. By publishing predictions to Pub/Sub and NSQ, models are decoupled from downstream consumers, allowing multiple systems to act on predictions without tightly coupling the prediction service to each consumer.

### Notable Gaps and Future Work

Monzo explicitly acknowledges that some capabilities are missing from their current platform. Offline experiment tracking and automated builds are notably absent—not because they haven't considered these capabilities, but because they haven't yet settled on their preferred implementation approach. This pragmatic admission suggests Monzo prioritizes solving immediate problems over building comprehensive platforms that address every possible need.

The platform has evolved through significant iteration, particularly around the model registry, which has gone through multiple versions and was undergoing migration at the time of writing. This suggests that getting core components right takes time and iteration, even with careful initial design.

### Key Insights for Practitioners

The Monzo case study offers several valuable lessons for teams building ML platforms:

**Reuse beats rebuild**: Rather than creating a standalone ML infrastructure, integrating ML capabilities into existing production and data systems reduces operational overhead and leverage investments already made in those platforms. This is particularly valuable for smaller ML teams.

**Clear boundaries matter**: The strict rule that notebooks never progress beyond exploration prevents technical debt and forces teams to properly implement ideas in production-quality code. Similarly, separating dataset creation from model training as distinct jobs enables more flexible experimentation.

**Feature engineering in SQL can be pragmatic**: While many ML platforms default to frameworks like Spark for feature engineering, Monzo's SQL-based approach leverages existing data warehouse capabilities and avoids infrastructure management overhead. This won't work for all use cases but can be highly effective when the data warehouse is already central to the data architecture.

**Hybrid feature architectures balance latency and richness**: The split between operational features (computed in real-time) and analytics features (pre-computed and served from Cassandra) demonstrates how to achieve low-latency inference while incorporating complex historical aggregations.

**Standardization enables autonomy**: Cookiecutter templates, Makefiles, and uniform deployment patterns reduce the complexity ML practitioners face when deploying models, making the autonomy principle practically achievable rather than aspirational.

**Shared tooling builds bridges**: Using the same monitoring and analysis tools (Grafana, Looker) as other teams makes ML work more accessible to product managers, engineers, and other stakeholders, reducing the risk of ML becoming an isolated discipline.

The Monzo platform represents a mature, production-grade approach that prioritizes practical engineering over theoretical purity, demonstrating how a relatively small ML organization can support diverse use cases by making thoughtful architectural choices and resisting the temptation to build everything from scratch.
