---
title: "Cloud-first ML platform rebuild to reduce technical debt and accelerate training and serving at Etsy"
slug: "etsy-etsys-ml-platform-cloud-first-ml-platform-rebuild-to-reduce-technical-debt-and-accelerate-training-and-serving-at-e"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "notebooks"
  - "pipeline-orchestration"
  - "airflow"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "seldon"
  - "spark"
  - "tf-serving"
  - "vertex-ai"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "e-commerce"
company: "Etsy"
companySlug: "etsy"
platformName: "Etsy's ML platform"
contentType: "blog"
summary: "Etsy rebuilt its machine learning platform in 2020-2021 to address mounting technical debt and maintenance costs from their custom-built V1 platform developed in 2017. The original platform, designed for a small data science team using primarily logistic regression, became a bottleneck as the team grew and model complexity increased. The V2 platform adopted a cloud-first, open-source strategy built on Google Cloud's Vertex AI and Dataflow for training, TensorFlow as the primary framework, Kubernetes with TensorFlow Serving and Seldon Core for model serving, and Vertex AI Pipelines with Kubeflow/TFX for orchestration. This approach reduced time from idea to live ML experiment by approximately 50%, with one team completing over 2000 offline experiments in a single quarter, while enabling practitioners to prototype models in days rather than weeks."
link: "https://www.etsy.com/codeascraft/redesigning-etsys-machine-learning-platform"
year: 2021
seo:
  title: "Etsy: Cloud-first ML platform rebuild to reduce technical debt and accelerate training and serving at Etsy - ZenML MLOps Database"
  description: "Etsy rebuilt its machine learning platform in 2020-2021 to address mounting technical debt and maintenance costs from their custom-built V1 platform developed in 2017. The original platform, designed for a small data science team using primarily logistic regression, became a bottleneck as the team grew and model complexity increased. The V2 platform adopted a cloud-first, open-source strategy built on Google Cloud's Vertex AI and Dataflow for training, TensorFlow as the primary framework, Kubernetes with TensorFlow Serving and Seldon Core for model serving, and Vertex AI Pipelines with Kubeflow/TFX for orchestration. This approach reduced time from idea to live ML experiment by approximately 50%, with one team completing over 2000 offline experiments in a single quarter, while enabling practitioners to prototype models in days rather than weeks."
  canonical: "https://www.zenml.io/mlops-database/etsy-etsys-ml-platform-cloud-first-ml-platform-rebuild-to-reduce-technical-debt-and-accelerate-training-and-serving-at-e"
  ogTitle: "Etsy: Cloud-first ML platform rebuild to reduce technical debt and accelerate training and serving at Etsy - ZenML MLOps Database"
  ogDescription: "Etsy rebuilt its machine learning platform in 2020-2021 to address mounting technical debt and maintenance costs from their custom-built V1 platform developed in 2017. The original platform, designed for a small data science team using primarily logistic regression, became a bottleneck as the team grew and model complexity increased. The V2 platform adopted a cloud-first, open-source strategy built on Google Cloud's Vertex AI and Dataflow for training, TensorFlow as the primary framework, Kubernetes with TensorFlow Serving and Seldon Core for model serving, and Vertex AI Pipelines with Kubeflow/TFX for orchestration. This approach reduced time from idea to live ML experiment by approximately 50%, with one team completing over 2000 offline experiments in a single quarter, while enabling practitioners to prototype models in days rather than weeks."
mlops:
  source: "sqlite"
  entryId: 126
  sourceUrl: "https://www.etsy.com/codeascraft/redesigning-etsys-machine-learning-platform"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061673"
  lastUpdated: "2026-04-14T19:55:18.342986"
---

## Problem Context

Etsy's machine learning journey began in 2017 when the company built its first ML platform to support growing personalization needs across search, ads, and recommendations for millions of buyers. At that time, the data science team was small and relied heavily on a single implementation of logistic regression for production models. The initial platform was designed to provide a consistent, end-to-end interface for training, versioning, packaging, and deploying models, addressing the lack of mature enterprise-scale solutions available at the time.

By 2020, the limitations of this custom-built V1 platform had become critical bottlenecks. The maintenance cost grew substantially as the number and complexity of machine learning projects increased. The platform's custom abstractions required new team members to abandon familiar tools and learn Etsy-specific technology, creating significant onboarding friction. Meanwhile, the broader ML industry had exploded with third-party frameworks, and Etsy's data scientists were already experimenting with open-source and managed technologies to work around V1 limitations. The platform team recognized they were carrying significant technical debt and that continuing to maintain custom tooling was increasingly costly and unsustainable.

The core challenge was clear: Etsy needed to modernize its ML infrastructure to support a rapidly growing number of ML practitioners while reducing platform team burden and enabling self-service capabilities. The team assembled a working group with members from both infrastructure and data science to establish principles for the V2 platform redesign.

## Architecture & Design Principles

The V2 platform was guided by three fundamental principles that shaped all architectural decisions. First and foremost, avoid building in-house tooling whenever possible. The team recognized that leveraging managed solutions from Google Cloud and industry-standard tools like TensorFlow would enable faster model development without heavy platform team involvement. Second, move toward self-service capabilities to scale with the increasing number of ML practitioners, freeing the platform team from support burdens to focus on core infrastructure work. Third, support TensorFlow as the primary framework given internal momentum, while maintaining flexibility for practitioners to use any ML libraries they chose, avoiding the single-toolset limitation of V1.

The resulting architecture consists of three major subsystems that work together to support the complete ML lifecycle: training and prototyping infrastructure, model serving infrastructure, and workflow orchestration.

### Training and Prototyping Infrastructure

The training and prototyping layer leverages Google Cloud services as its foundation. Vertex AI serves as the primary training platform, allowing customers to submit complex training jobs of any form for optimization and easily leverage specialized hardware like GPUs through familiar interfaces such as Jupyter Notebooks. Dataflow handles massive extract-transform-load (ETL) jobs required for data preprocessing at Etsy's scale.

This infrastructure provides first-class support for TensorFlow while allowing experimentation with any modeling framework through ad hoc notebooks or managed training code using in-house Python distributions. The design explicitly prioritizes flexibility, enabling ML practitioners to work in whatever language or framework seems appropriate for their specific use case.

### Model Serving Infrastructure

For model deployment and inference, Etsy maintained and extended its in-house Model Management Service rather than adopting a third-party solution. After evaluating available products, the team determined their existing service was still the best fit for their needs, representing a deliberate exception to their principle of avoiding in-house tooling.

The Model Management Service creates stateless ML microservices deployed in Etsy's Kubernetes cluster to serve requests from the website and mobile applications. The service provides a simple UI for managing model deployments and was extended to support two additional open-source serving frameworks beyond the original V1 serving layer: TensorFlow Serving and Seldon Core.

TensorFlow Serving provides a standard, repeatable approach for deploying TensorFlow models in containers, aligning with the platform's TensorFlow-first principle. Seldon Core enables customers to write custom ML inference code for use cases that fall outside TensorFlow's scope. This multi-framework serving approach balances standardization with flexibility, allowing the platform to accommodate diverse deployment requirements while maintaining operational simplicity through a unified control plane.

### Workflow Orchestration

The orchestration layer addresses the need for robust pipelines to maintain up-to-date, user-facing models through automated retraining and deployment. While Airflow remained Etsy's primary choice for general workflow orchestration, the platform team adopted Vertex AI Pipelines for ML-specific workflows to complement their TensorFlow-first approach and introduce TFX pipelines and other TensorFlow-native frameworks.

Vertex AI Pipelines supports both the Kubeflow SDK and TFX SDK, allowing ML practitioners to choose based on their model framework and preferences. Practitioners can develop and test pipelines that integrate seamlessly with other cloud ML services, and critically, can test directed acyclic graphs (DAGs) locally, significantly speeding up the development feedback loop. The pipelines are containerized, providing isolation and reproducibility for ML workflows.

## Technical Implementation

The technical implementation centered on Google Cloud Platform as the infrastructure foundation, with specific managed services handling different aspects of the ML lifecycle:

**Training Infrastructure**: Vertex AI provides the core training capabilities, supporting custom training jobs with arbitrary frameworks and configurations. Dataflow, built on Apache Beam, handles large-scale data processing pipelines required for feature engineering and data preparation at Etsy's scale.

**Serving Infrastructure**: The Model Management Service runs as a control plane managing Kubernetes deployments. The service orchestrates two distinct serving frameworks - TensorFlow Serving for TensorFlow models and Seldon Core for custom inference code. All serving containers run as stateless microservices in Kubernetes, enabling horizontal scaling and standard cloud-native operational practices.

**Orchestration**: Vertex AI Pipelines provides the runtime environment for Kubeflow and TFX pipeline definitions. These pipelines are defined as containerized DAGs that can be tested locally before deployment, with each pipeline step running in isolated containers with specified dependencies and resource requirements.

**Framework Support**: TensorFlow receives first-class support throughout the platform, with specific integrations for TensorFlow Serving, TFX pipelines, and TensorFlow Transform (TFT) for feature preprocessing at inference time. However, the architecture explicitly supports other frameworks through flexible interfaces, custom container support in Vertex AI training, and Seldon Core for serving.

The platform relies on in-house Python distributions for common dependencies and shared code, providing consistency while still allowing practitioners to specify additional requirements for their specific models.

## Scale & Performance

The V2 platform has delivered measurable improvements in both productivity and performance metrics. The most significant outcome has been an approximately 50% reduction in the time required to go from initial idea to live ML experiment. This dramatic acceleration in the experimentation cycle has enabled substantially higher iteration rates - a single product team completed over 2000 offline experiments in Q1 alone, demonstrating the platform's ability to support rapid experimentation at scale.

Model prototyping timelines have compressed from weeks to days. Using Vertex AI, ML practitioners can prototype new model architectures in days and launch dozens of hyperparameter tuning experiments with a single command, a capability that would have required significant manual effort and platform team support in V1.

At the time of writing, Etsy had almost 90 ML Platform V1 model deployments in production, each with its own Airflow DAG. This represents the scale of the migration challenge ahead, as each of these deployments would need to be rewritten for V2 compatibility.

Performance optimization has become a critical focus area, particularly around inference latency. The platform team discovered that seemingly small inefficiencies in preprocessing code, such as non-vectorized operations in TensorFlow Transform functions, can result in massive performance degradation. In specific cases, optimizing a single TFT function reduced model runtime from 200ms to 4ms - a 50x improvement. This finding led the team to establish TensorFlow best practices and centralize TFT code so that teams can reuse and share well-tested, performant transformations rather than each implementing their own preprocessing logic.

## Trade-offs & Lessons Learned

The V2 platform redesign revealed several critical insights about building and operating ML infrastructure at scale.

**The Build vs. Buy Decision**: The decision to violate their own principle of avoiding in-house tooling by extending the Model Management Service rather than adopting a third-party serving platform proved correct. After thorough evaluation, the team determined their existing service still best met their needs, demonstrating that architectural principles should guide rather than dictate decisions. This pragmatic approach allowed them to leverage existing investment while still modernizing the overall platform.

**Flexibility vs. Guardrails**: The enhanced flexibility of V2 created a new challenge - ML practitioners could easily write their own code, but this freedom led to performance issues with libraries like TensorFlow Transform. The platform's shift from owning all code to supporting third-party tools made troubleshooting more difficult. The team addressed this by establishing best practices and centralizing commonly-used code, finding a middle ground between flexibility and consistency.

**Adoption Challenges**: Perhaps the most surprising challenge was adoption. Even when customers were excited about new capabilities in principle, the upfront effort required to migrate from working V1 systems didn't align with immediate priorities. Replacing a functioning Airflow DAG with a Kubeflow Pipeline, for example, might offer long-term benefits but provides little short-term value. The team has had to provide additional support to early adopters to ease this transition, learning that technical superiority alone doesn't drive migration.

**Platform as Product**: The critical lesson was treating the platform as a product at every stage, not just during initial design. Transparency emerged as a key factor - customers won't necessarily come forward with concerns on their own. The platform team learned they must proactively reach out throughout development to share goals, target dates, and resources to drive adoption and usage. This product mindset requires continuous engagement rather than a build-and-deploy approach.

**Migration Complexity**: The incremental rollout strategy proved essential. With almost 90 production V1 deployments, each with custom Airflow DAGs, the migration represents a substantial ongoing effort. The team credits the good design and extensibility of V1 for making it possible to roll out V2 incrementally while continuing to support all original platform features. This highlights the importance of building systems that can evolve gracefully rather than requiring big-bang migrations.

**Self-Service at Scale**: The move toward self-service successfully reduced platform team burden and enabled faster experimentation, validating the core architectural principle. By letting well-built, well-documented open-source tools speak for themselves rather than wrapping them in platform-specific abstractions, the team unblocked customers while freeing themselves to focus on core infrastructure work rather than support.

## Future Directions

The migration and development of ML Platform V2 remain ongoing efforts. Beyond completing the migration of existing V1 deployments, the team continues to evolve the platform with next-generation capabilities including automation and continuous delivery, ML governance components like statistical observability, and model registries. The team follows a user-requirements-driven approach, gathering feedback to inform the next iteration of their ever-evolving platform.

The Etsy case demonstrates that successful ML platform evolution requires balancing technical excellence with product thinking, pragmatic decision-making over dogmatic adherence to principles, and continuous engagement with practitioners to drive adoption of new capabilities. The V2 platform's success in reducing experiment cycle times by 50% while supporting thousands of experiments per quarter validates the cloud-first, open-source approach for organizations looking to scale their ML capabilities.
