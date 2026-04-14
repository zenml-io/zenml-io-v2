---
title: "FROM PREDICTIVE TO GENERATIVE: UBER'S JOURNEY"
slug: "uber-michelangelo-modernization-ray-on-kubernetes-from-predictive-to-generative-ubers-journey"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "docker"
  - "kubernetes"
  - "mlflow"
  - "ray"
  - "spark"
  - "terraform"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Uber"
companySlug: "uber"
platformName: "Michelangelo modernization + Ray on Kubernetes"
contentType: "video"
summary: "Uber built Michelangelo, a centralized end-to-end machine learning platform that powers 100% of the company's ML use cases across 70+ countries and 150 million monthly active users. The platform evolved over eight years from supporting basic tree-based models to deep learning and now generative AI applications, addressing the initial challenges of fragmented ad-hoc pipelines, inconsistent model quality, and duplicated efforts across teams. Michelangelo currently trains 20,000 models monthly, serves over 5,000 models in production simultaneously, and handles 60 million peak predictions per second. The platform's modular, pluggable architecture enabled rapid adaptation from classical ML (2016-2019) through deep learning adoption (2020-2022) to the current generative AI ecosystem (2023+), providing both UI-based and code-driven development approaches while embedding best practices like incremental deployment, automatic monitoring, and model retraining directly into the platform."
link: "https://www.youtube.com/watch?v=1zVoCP1UWss"
year: 2024
seo:
  title: "Uber: FROM PREDICTIVE TO GENERATIVE: UBER'S JOURNEY - ZenML MLOps Database"
  description: "Uber built Michelangelo, a centralized end-to-end machine learning platform that powers 100% of the company's ML use cases across 70+ countries and 150 million monthly active users. The platform evolved over eight years from supporting basic tree-based models to deep learning and now generative AI applications, addressing the initial challenges of fragmented ad-hoc pipelines, inconsistent model quality, and duplicated efforts across teams. Michelangelo currently trains 20,000 models monthly, serves over 5,000 models in production simultaneously, and handles 60 million peak predictions per second. The platform's modular, pluggable architecture enabled rapid adaptation from classical ML (2016-2019) through deep learning adoption (2020-2022) to the current generative AI ecosystem (2023+), providing both UI-based and code-driven development approaches while embedding best practices like incremental deployment, automatic monitoring, and model retraining directly into the platform."
  canonical: "https://www.zenml.io/mlops-database/uber-michelangelo-modernization-ray-on-kubernetes-from-predictive-to-generative-ubers-journey"
  ogTitle: "Uber: FROM PREDICTIVE TO GENERATIVE: UBER'S JOURNEY - ZenML MLOps Database"
  ogDescription: "Uber built Michelangelo, a centralized end-to-end machine learning platform that powers 100% of the company's ML use cases across 70+ countries and 150 million monthly active users. The platform evolved over eight years from supporting basic tree-based models to deep learning and now generative AI applications, addressing the initial challenges of fragmented ad-hoc pipelines, inconsistent model quality, and duplicated efforts across teams. Michelangelo currently trains 20,000 models monthly, serves over 5,000 models in production simultaneously, and handles 60 million peak predictions per second. The platform's modular, pluggable architecture enabled rapid adaptation from classical ML (2016-2019) through deep learning adoption (2020-2022) to the current generative AI ecosystem (2023+), providing both UI-based and code-driven development approaches while embedding best practices like incremental deployment, automatic monitoring, and model retraining directly into the platform."
mlops:
  source: "sqlite"
  entryId: 180
  sourceUrl: "https://www.youtube.com/watch?v=1zVoCP1UWss"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.616928"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Before Michelangelo, Uber faced severe fragmentation in its machine learning infrastructure. Each ML team built their own ad-hoc pipelines and workflows to meet their specific needs, creating multiple critical pain points. These one-off pipelines were difficult to manage, non-reusable across teams, hard to productionize, and impossible to scale effectively. This fragmentation led to inconsistent model performance across different business units and massive duplication of effort as teams repeatedly solved the same problems independently.

A particularly problematic gap was the lack of production monitoring. Teams focused heavily on offline evaluation and model performance during training but failed to track model behavior once deployed. This resulted in silent production model quality degradation, with no systematic way to detect when models were underperforming in real-world conditions. The lack of standardization also made it difficult to propagate best practices across the organization, meaning that lessons learned in one team rarely benefited others.

As Uber scaled to 70+ countries, 10,000+ cities, and 150 million monthly active users taking 28 million trips per day, machine learning became incorporated into every aspect of the product across all lines of business—from authentication and search autocomplete to ETA prediction, pricing, fraud detection, and customer service. The business needed a centralized platform that could support this scale while maintaining quality and consistency.

## Architecture & Design

Michelangelo is architected around three fundamental pillars: a data plane for training and serving, a control plane for management and orchestration, and an ML developer experience layer that enables rapid iteration.

The **data plane** evolved significantly over time. Initially in 2016-2019, it was predominantly built on Spark for training tree-based models with a proprietary Java-based serving engine. The platform then expanded to incorporate Ray as a first-class training framework to support more advanced communication patterns beyond Spark's driver-centric model. Ray's all-to-all communication pattern proved essential for distributed deep learning workloads. The serving infrastructure was extended to support both CPU and GPU-based inference, with TensorRT added for multi-node model parallel serving of large language models.

For generative AI workloads, the data plane was further extended with DeepSpeed and Hugging Face as trainers for fine-tuning open-source models like Llama with Uber-specific data. The platform also integrated PyTorch as a first-class citizen alongside the existing frameworks, responding to its growing dominance in the ML developer community.

The **control plane** underwent a complete architectural overhaul. Initially, it consisted of ad-hoc REST APIs for job submission, model management, and orchestration—separate services cobbled together to support ML operations. This was completely rebuilt using Kubernetes patterns with Custom Resource Definitions (CRDs) to represent key ML components and controllers to act on them. This controller pattern proved extremely scalable and enabled rapid adaptation when new requirements emerged.

For generative AI, the control plane only required adding new CRDs and controllers for concepts specific to LLM workflows—prompts, external models, evaluation datasets—while reusing the existing infrastructure for common concerns. This demonstrated the power of the pluggable architecture.

A critical component is **Palette**, Uber's feature store, which was among the first feature store implementations introduced to the ML community. Palette allows users to compute features, store them centrally, discover existing features, and reuse them across different projects company-wide. This dramatically reduced duplicated feature engineering work and improved consistency.

The platform includes a **model registry** for versioning and model management, along with a **Model Excellence Score** framework that provides automated monitoring of both model performance and data quality in production. When issues are detected, alerts are automatically sent to users, and the platform can trigger automatic model retraining if performance degrades beyond acceptable thresholds.

The **Michelangelo Workflow Explorer** provides automated workflow orchestration to handle the iterative nature of the ML lifecycle, managing the complex dependencies between feature engineering, training, evaluation, and deployment.

For generative AI applications specifically, the **Michelangelo Gen Studio** serves as a central hub for building all generative components including prompts, RAG applications, and fine-tuned models. The **Gen Gateway** provides a unified interface for accessing both external models (GPT-4 from OpenAI, Gemini from Google) and open-source models served from Michelangelo (Mixtral, Llama 2), with built-in security capabilities including PII redaction and safety guardrails.

## Technical Implementation

The platform's technical evolution can be traced through three distinct phases, each requiring different technology choices and architectural decisions.

**Phase 1 (2016-2019): Classical ML Foundation**

The initial implementation focused on tree-based models using XGBoost running on Spark for training. The primary technical challenge was scaling XGBoost training to datasets with over a billion rows as data volumes grew exponentially. The serving infrastructure was built in-house using Java, optimized to serve increasingly large models with very low latency requirements.

The developer experience during this phase was entirely UI-based. Users configured models through a web interface, selecting parameters like number of trees, tree depth, and learning rate through form fields. Feature engineering was handled through a proprietary Scala-based DSL that allowed users to write transformations declaratively—commenting out a line to remove a feature or adding new lines to create new features.

A separate stack existed for deep learning applications, particularly supporting the ATG (autonomous driving) team. This stack used Horovod for distributed data parallelism running TensorFlow models, with a completely different control plane and user experience requiring raw Python code using native Horovod or TensorFlow APIs.

**Phase 2 (2020-2022): Deep Learning Integration**

The Michelangelo 2.0 effort fundamentally rethought the platform architecture to support both classical ML and deep learning within a unified stack. Ray was introduced specifically to enable advanced training patterns requiring all-to-all communication between workers, unlike Spark's executor-to-driver model. All training was migrated to run on top of Ray, even for classical models.

GPU support was added throughout the stack for both training and serving infrastructure. PyTorch was elevated to first-class status alongside TensorFlow, recognizing the shift in the ML community.

The control plane was completely rewritten using Kubernetes patterns. Instead of maintaining separate REST APIs, the team adopted CRDs to represent key ML concepts with controllers implementing the business logic. This pattern provided better scalability and made it easier to extend the platform with new capabilities.

The developer experience was redesigned around an **application framework** with strict templates. Users work with four standardized steps: feature preparation and transformation, training, assembly (handling model quantization and packaging), and evaluation. The platform provides basic templates that can be used through pure configuration, or users can extend them with custom Python code by pointing to Python functions in their configs.

The workflow is entirely revision-controlled. Developers check out a repository, edit configuration files, write whatever model architecture code they need, then push to the platform. Each push creates a revision, enabling reproducibility. The UI provides visibility into pipeline execution with all steps, statuses, inputs, and outputs clearly displayed. Users can launch notebooks pre-loaded with values from prior executions to debug issues, then create new versions and resume execution from specific steps without re-running earlier stages—enabled by strict lineage tracking and checkpointing of intermediate data.

**Phase 3 (2023+): Generative AI Ecosystem**

The shift to generative AI required extending the data plane with DeepSpeed and Hugging Face for LLM fine-tuning and TensorRT for efficient multi-node model parallel inference. The control plane additions were minimal—just new CRDs and controllers for prompt management, external model access, and evaluation datasets.

New templates were created specifically for LLM training and scoring workflows. The most common application pattern proved to be evaluation pipelines where users bring datasets and specify which models to evaluate (OpenAI, Gemini, internal models), with the framework automatically running evaluations and computing standardized metrics.

The **Gen Application Framework** is a Python-based microservice framework built on LangChain that enables rapid development of chat applications, code completion, and other generative use cases. The platform team maintains the bottom layer handling logging, tools, and data connectivity to internal Uber systems, while application developers focus on the functional logic. Logging comes free and automatically feeds into scoring applications that continuously generate evaluation metrics.

## Scale & Performance

Michelangelo operates at remarkable scale across Uber's global operations:

- **Model Training**: 20,000 models trained every month
- **Production Serving**: More than 5,000 models serving production traffic simultaneously at any given moment
- **Prediction Volume**: 60 million predictions per second at peak load
- **User Base**: Supporting 150 million monthly active users across 70+ countries and 10,000+ cities
- **Business Coverage**: Powers 100% of Uber's machine learning use cases across all lines of business
- **Project Scale**: Over 700 active ML projects (grown from just 3 at inception)

The platform successfully scaled XGBoost training to handle datasets exceeding one billion rows while maintaining acceptable training times. Serving latency was kept extremely low even as model sizes grew significantly, though specific latency numbers were not disclosed.

The deep learning adoption rate reached 60% of models in production, representing a careful balance between advanced techniques and simpler approaches where they suffice. Approximately 95-99% of Uber's business still relies on predictive ML rather than generative AI, with generative applications representing a small but growing percentage focused on specific use cases like the Uber Eats AI assistant (rolled out to 1% of US users) and customer service chatbots.

## Trade-offs & Lessons Learned

The Uber team shared several hard-won insights from eight years of platform development:

**Centralized Platform Benefits**: Having a centralized platform with a dedicated team provided enormous value in a company with multiple product teams leveraging ML. The standardization and consistency reduced duplicate efforts across teams, enabled better collaboration (since everyone used common tooling and concepts), and directly improved both ML quality and developer productivity. The centralized approach made it possible to audit ML usage company-wide and meet responsible AI requirements.

**Developer Choice Matters**: Different users have different needs and preferences. Providing multiple paths—UI tools for non-coders building tree-based models, code-driven approaches for complex model implementations, and high-level abstractions with pre-built templates for most users—maximized adoption. Critically, advanced users still needed direct access to low-level infrastructure and compute resources to build highly customizable workflows. Supporting both opinionated frameworks and flexible customization proved essential.

**Modularity Enables Adaptation**: Designing the platform in a modular, plug-and-play way was perhaps the most important architectural decision. This enabled rapid adoption of best-in-class capabilities whether from open source, third-party vendors, or internal development. When the industry shifted from tree-based models to deep learning to generative AI, the platform could adapt by plugging in new components (Ray, PyTorch, DeepSpeed, Hugging Face, TensorRT) without wholesale rewrites. The Kubernetes CRD/controller pattern specifically made it easy to add new concepts like prompts and external models without touching existing code.

**MLOps Code is Hard but Worth It**: Enabling ML as code—where pipelines are defined in revision-controlled configuration and code—proved extremely challenging but valuable. The benefits for reproducibility, collaboration, and debugging justified the investment. Having strict lineage tracking and checkpointing allowed resuming from arbitrary pipeline stages, dramatically improving iteration speed.

**Deep Learning ROI Discipline**: Deep learning is expensive and shouldn't be used everywhere indiscriminately. The 60% adoption rate reflects a deliberate approach of using deep learning only where the ROI makes sense. Many problems are better solved with simpler approaches, and the platform needed to support the full spectrum from linear models to LLMs.

**Focus on High-Impact Projects**: With over 700 projects, it became impossible to give equal attention to all efforts. The team learned to focus platform investment and support on business-critical projects like ETA models, ETD models, home feed ranking, risk models, and fraud detection where improvements had outsized business impact.

**Opinionated Frameworks Scale Best Practices**: Being opinionated about how models should be trained and served—while still being pluggable—created a powerful combination. The opinionated templates and frameworks made it easy to propagate good metrics and practices to every team at Uber, ensuring consistent quality standards. For example, incremental zone-by-zone deployment with automatic rollback, automated performance monitoring, and standardized evaluation metrics became available to all projects by default.

**Best Practices Embedded in Platform**: Building ML best practices directly into the platform infrastructure proved more effective than documentation or training. Incremental model rollout, automatic monitoring setup, alert generation on issues, and automatic retraining on performance degradation all happened by default, preventing outages and maintaining quality without requiring users to remember every operational detail.

The journey from supporting three projects with ad-hoc pipelines to a unified platform serving 700+ projects with 20,000 monthly model trainings demonstrates both the complexity of building production ML infrastructure and the enormous value it delivers when done well. The modular architecture and willingness to integrate best-of-breed external components while selectively building in-house proved to be the key to handling the rapid evolution of ML techniques from classical models through deep learning to generative AI.
