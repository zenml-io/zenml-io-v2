---
title: "Kubernetes-based end-to-end MLOps platform using Flyte, MLflow, and Seldon Core for demand forecasting and recommendations"
slug: "wolt-wolts-ml-platform-kubernetes-based-end-to-end-mlops-platform-using-flyte-mlflow-and-seldon-core-for-demand-forecast"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "model-registry"
  - "model-serving"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "docker"
  - "flyte"
  - "kubernetes"
  - "mlflow"
  - "seldon"
  - "ab-testing"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "model-validation"
  - "serving"
  - "training"
industryTags: "e-commerce"
company: "Wolt"
companySlug: "wolt"
platformName: "Wolt's ML platform"
contentType: "video"
summary: "Wolt, a food delivery platform serving over 12 million users, faced significant challenges in scaling their machine learning infrastructure to support critical use cases including demand forecasting, restaurant recommendations, and delivery time prediction. To address these challenges, they built an end-to-end MLOps platform on Kubernetes that integrates three key open source frameworks: Flyte for workflow orchestration, MLFlow for experiment tracking and model management, and Seldon Core for model serving. This Kubernetes-based approach enabled Wolt to standardize ML deployments, scale their infrastructure to handle millions of users, and apply software engineering best practices to machine learning operations."
link: "https://kccnceu2022.sched.com/event/ytkp/scaling-open-source-ml-how-wolt-uses-k8s-to-deliver-great-food-to-millions-stephen-batifol-wolt-ed-shee-seldon"
year: 2022
seo:
  title: "Wolt: Kubernetes-based end-to-end MLOps platform using Flyte, MLflow, and Seldon Core for demand forecasting and recommendations - ZenML MLOps Database"
  description: "Wolt, a food delivery platform serving over 12 million users, faced significant challenges in scaling their machine learning infrastructure to support critical use cases including demand forecasting, restaurant recommendations, and delivery time prediction. To address these challenges, they built an end-to-end MLOps platform on Kubernetes that integrates three key open source frameworks: Flyte for workflow orchestration, MLFlow for experiment tracking and model management, and Seldon Core for model serving. This Kubernetes-based approach enabled Wolt to standardize ML deployments, scale their infrastructure to handle millions of users, and apply software engineering best practices to machine learning operations."
  canonical: "https://www.zenml.io/mlops-database/wolt-wolts-ml-platform-kubernetes-based-end-to-end-mlops-platform-using-flyte-mlflow-and-seldon-core-for-demand-forecast"
  ogTitle: "Wolt: Kubernetes-based end-to-end MLOps platform using Flyte, MLflow, and Seldon Core for demand forecasting and recommendations - ZenML MLOps Database"
  ogDescription: "Wolt, a food delivery platform serving over 12 million users, faced significant challenges in scaling their machine learning infrastructure to support critical use cases including demand forecasting, restaurant recommendations, and delivery time prediction. To address these challenges, they built an end-to-end MLOps platform on Kubernetes that integrates three key open source frameworks: Flyte for workflow orchestration, MLFlow for experiment tracking and model management, and Seldon Core for model serving. This Kubernetes-based approach enabled Wolt to standardize ML deployments, scale their infrastructure to handle millions of users, and apply software engineering best practices to machine learning operations."
mlops:
  source: "sqlite"
  entryId: 150
  sourceUrl: "https://kccnceu2022.sched.com/event/ytkp/scaling-open-source-ml-how-wolt-uses-k8s-to-deliver-great-food-to-millions-stephen-batifol-wolt-ed-shee-seldon"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061934"
  lastUpdated: "2026-04-14T19:55:32.176619"
---

## Problem Context

Wolt, a food delivery platform with a rapidly growing user base exceeding 12 million users, faced the classic challenge of scaling machine learning infrastructure to meet production demands. The company relies heavily on machine learning to power several critical business functions that directly impact customer experience and operational efficiency. These use cases include forecasting supply and demand to optimize delivery logistics, serving personalized restaurant recommendations to millions of users, and predicting accurate delivery times to set customer expectations.

As the platform scaled, the ML infrastructure became a significant bottleneck. The team needed to move beyond ad-hoc model deployments and experimentation workflows to build a robust, scalable MLOps platform that could support multiple data science teams deploying models to production. The fundamental challenge was applying software engineering best practices—such as version control, reproducibility, automated testing, and standardized deployment pipelines—to machine learning workflows that are inherently more complex than traditional software applications.

The ML team recognized that without a standardized platform, each team would build their own deployment processes, leading to inconsistencies, duplicated effort, and increased operational overhead. They needed an infrastructure that could handle the entire ML lifecycle from experimentation through production serving while maintaining reliability at scale.

## Architecture & Design

Wolt's solution was to build an end-to-end MLOps platform on Kubernetes, leveraging the container orchestration platform's scalability and operational maturity. The architecture integrates three complementary open source frameworks, each addressing a specific phase of the ML lifecycle:

**Flyte** serves as the workflow orchestration engine, managing the complex DAGs (directed acyclic graphs) that represent ML pipelines. Flyte enables data scientists to define workflows as code, providing version control and reproducibility for training pipelines. The platform handles scheduling, resource allocation, and execution of data preprocessing, feature engineering, model training, and validation steps. Flyte's Kubernetes-native design means it can scale workflows horizontally, spinning up pods as needed to process large datasets or train multiple model variants in parallel.

**MLFlow** functions as the experiment tracking and model management layer. Data scientists use MLFlow to log experiments, track metrics, compare model performance across runs, and manage the model lifecycle. MLFlow's model registry provides a centralized catalog of trained models with versioning, staging (dev/staging/production), and metadata tracking. This component bridges the gap between experimentation and production, giving teams visibility into which models are deployed and enabling rollback capabilities when issues arise.

**Seldon Core** handles the model serving infrastructure, deploying models as scalable microservices on Kubernetes. Seldon Core wraps trained models in production-ready containers with REST and gRPC APIs, load balancing, and horizontal pod autoscaling. The framework supports advanced deployment patterns like A/B testing, canary deployments, and multi-armed bandits for online experimentation. Seldon Core's integration with Kubernetes means models inherit the platform's operational capabilities including health checks, resource limits, and self-healing.

The data flow through this architecture follows a typical ML lifecycle: data scientists develop and iterate on models using their preferred tools, orchestrating training runs through Flyte. Experiment results are logged to MLFlow, where teams compare performance and promote successful models to the registry. When a model is ready for production, it's packaged and deployed via Seldon Core to Kubernetes clusters where it serves predictions to Wolt's applications. The entire pipeline is version controlled and reproducible, addressing the common MLOps challenge of "works on my laptop" syndrome.

## Technical Implementation

The technical stack is built entirely on open source components running on Kubernetes, which provides the foundation for the entire platform. Kubernetes' declarative configuration and operator patterns enable the team to manage infrastructure as code, with all components deployed via Helm charts or Kubernetes manifests stored in version control.

Flyte brings Python-first workflow definition, allowing data scientists to write pipelines in familiar Python code rather than learning YAML-heavy workflow languages. The framework provides type safety, automatic data serialization, and caching of intermediate results to speed up iterative development. Flyte's task-level resource specifications mean each step in a pipeline can request appropriate CPU, memory, and GPU resources, optimizing cluster utilization.

MLFlow was chosen for experiment tracking because of its framework-agnostic design and robust model registry capabilities. Data scientists can use MLFlow with TensorFlow, PyTorch, scikit-learn, or any other ML framework without being locked into a specific vendor's tooling. The registry's REST API enables automated deployment workflows where CI/CD pipelines can query for the latest production model and trigger redeployment.

Seldon Core was selected for model serving because of its Kubernetes-native architecture and support for complex deployment patterns. Unlike simple model serving solutions that only handle single-model deployments, Seldon Core supports multi-model graphs where predictions flow through multiple models (for example, an ensemble or a pipeline of preprocessing and prediction models). The framework's language-agnostic approach means models can be served using prebuilt servers for common frameworks or wrapped in custom containers for proprietary inference logic.

The integration between these three frameworks creates a cohesive platform. Flyte pipelines can trigger MLFlow logging automatically, and successful training runs can programmatically register models in MLFlow. Deployment automation connects MLFlow's registry to Seldon Core, enabling push-button deployments where a model version approved in MLFlow is automatically packaged and deployed to Kubernetes via Seldon Core's custom resource definitions.

## Scale & Performance

Wolt's platform serves over 12 million users, a scale that demands robust infrastructure and efficient resource utilization. While the presentation abstract doesn't provide granular performance metrics like requests per second or p99 latency, the user base size implies significant traffic volumes across multiple ML models.

The Kubernetes foundation enables horizontal scaling, where both training workloads and serving endpoints can scale elastically based on demand. Flyte's distributed execution model means large batch jobs can be parallelized across many pods, reducing training time for compute-intensive models. Seldon Core's autoscaling capabilities ensure that prediction endpoints can handle traffic spikes during peak ordering hours without manual intervention.

The platform's architecture supports multiple concurrent ML teams, each operating independently without stepping on each other's infrastructure. This multi-tenancy is crucial at Wolt's scale, where different product areas (recommendations, logistics, pricing) need to deploy models on their own schedules without coordinating with a central infrastructure team.

## Trade-offs & Lessons

Wolt's approach demonstrates several important trade-offs and design decisions that other organizations should consider when building MLOps platforms:

**Open source integration vs. managed services**: By choosing open source components (Flyte, MLFlow, Seldon Core) over managed ML platforms from cloud providers, Wolt gained flexibility and avoided vendor lock-in. However, this approach requires more operational overhead to maintain, upgrade, and troubleshoot these systems. The team must invest in Kubernetes expertise and stay current with updates to each framework. The benefit is complete control over the infrastructure and the ability to customize components to Wolt's specific needs.

**Kubernetes complexity**: Building on Kubernetes provides powerful scalability and operational capabilities, but introduces significant complexity. Data scientists must understand concepts like pods, services, and resource requests that are foreign to traditional ML workflows. Wolt mitigated this by building abstractions that hide Kubernetes details behind higher-level APIs, but some platform knowledge is still necessary. Organizations without strong Kubernetes expertise should carefully weigh whether this approach is appropriate for their team's skill set.

**Software engineering practices in ML**: Stephen Batifol's background spanning Android development, data science, and ML engineering informs his philosophy that "machine learning has lots to learn from software engineering best practices." This perspective is evident in Wolt's platform design, which emphasizes version control, reproducibility, automated testing, and standardized deployment processes. The lesson is that ML infrastructure should not be treated as fundamentally different from traditional software systems—the same principles of DevOps and infrastructure-as-code apply.

**Framework composition**: Rather than building everything from scratch or adopting a single monolithic ML platform, Wolt composed their solution from specialized frameworks. This "best-of-breed" approach allows each component to excel at its specific task (orchestration, tracking, serving) while integrating through well-defined interfaces. The trade-off is integration complexity and the need to maintain compatibility as each framework evolves independently.

**Making deployments easy for developers**: Ed Shee's perspective as Head of Developer Relations at Seldon emphasizes making deployments as easy as possible for developers. This user-centric philosophy is crucial for platform adoption—if the MLOps infrastructure is too complex or cumbersome, data scientists will find ways to work around it. Wolt's platform design prioritizes developer experience, automating toil and providing clear workflows from experimentation to production.

The case study illustrates that scaling ML infrastructure is as much an organizational challenge as a technical one. The platform enables multiple teams to operate independently while maintaining consistency and reliability, a critical capability as ML adoption grows within an organization. The investment in building a robust MLOps platform pays dividends in velocity, as teams can deploy models faster without reinventing deployment processes each time.

For organizations considering similar architectures, the key takeaways are: invest in Kubernetes expertise if you choose this path, prioritize developer experience to drive adoption, embrace open source for flexibility but be prepared for operational overhead, and treat ML infrastructure with the same rigor as traditional software systems. Wolt's success serving millions of users demonstrates that this approach can scale to meet demanding production requirements.
