---
title: "Workflow-orchestrated payments fraud ML pipeline with dual-container SageMaker real-time inference"
slug: "zalando-zalandos-ml-platform-workflow-orchestrated-payments-fraud-ml-pipeline-with-dual-container-sagemaker-real-time-in"
draft: false
mlopsTags:
  - "model-registry"
  - "model-serving"
  - "pipeline-orchestration"
  - "airflow"
  - "databricks"
  - "docker"
  - "sagemaker"
  - "spark"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "serving"
  - "training"
industryTags: "e-commerce"
company: "Zalando"
companySlug: "zalando"
platformName: "Zalando's ML platform"
contentType: "blog"
summary: "Zalando's payments fraud detection team rebuilt their machine learning infrastructure to address limitations in their legacy Scala/Spark system. They migrated to a workflow orchestration approach using zflow, an internal tool built on AWS Step Functions, Lambda, Amazon SageMaker, and Databricks. The new architecture separates preprocessing from training, supports multiple ML frameworks (PyTorch, TensorFlow, XGBoost), and uses SageMaker inference pipelines with dual-container serving (scikit-learn preprocessing + model containers). Performance testing demonstrated sub-100ms p99 latency at 200 requests/second on ml.m5.large instances, with 50% faster scale-up times compared to the legacy system. While operational costs increased by up to 200% due to per-model instance allocation, the team accepted this trade-off for improved model isolation, framework flexibility, and reduced maintenance burden through managed services."
link: "https://engineering.zalando.com/posts/2021/02/machine-learning-pipeline-with-real-time-inference.html"
year: 2021
seo:
  title: "Zalando: Workflow-orchestrated payments fraud ML pipeline with dual-container SageMaker real-time inference - ZenML MLOps Database"
  description: "Zalando's payments fraud detection team rebuilt their machine learning infrastructure to address limitations in their legacy Scala/Spark system. They migrated to a workflow orchestration approach using zflow, an internal tool built on AWS Step Functions, Lambda, Amazon SageMaker, and Databricks. The new architecture separates preprocessing from training, supports multiple ML frameworks (PyTorch, TensorFlow, XGBoost), and uses SageMaker inference pipelines with dual-container serving (scikit-learn preprocessing + model containers). Performance testing demonstrated sub-100ms p99 latency at 200 requests/second on ml.m5.large instances, with 50% faster scale-up times compared to the legacy system. While operational costs increased by up to 200% due to per-model instance allocation, the team accepted this trade-off for improved model isolation, framework flexibility, and reduced maintenance burden through managed services."
  canonical: "https://www.zenml.io/mlops-database/zalando-zalandos-ml-platform-workflow-orchestrated-payments-fraud-ml-pipeline-with-dual-container-sagemaker-real-time-in"
  ogTitle: "Zalando: Workflow-orchestrated payments fraud ML pipeline with dual-container SageMaker real-time inference - ZenML MLOps Database"
  ogDescription: "Zalando's payments fraud detection team rebuilt their machine learning infrastructure to address limitations in their legacy Scala/Spark system. They migrated to a workflow orchestration approach using zflow, an internal tool built on AWS Step Functions, Lambda, Amazon SageMaker, and Databricks. The new architecture separates preprocessing from training, supports multiple ML frameworks (PyTorch, TensorFlow, XGBoost), and uses SageMaker inference pipelines with dual-container serving (scikit-learn preprocessing + model containers). Performance testing demonstrated sub-100ms p99 latency at 200 requests/second on ml.m5.large instances, with 50% faster scale-up times compared to the legacy system. While operational costs increased by up to 200% due to per-model instance allocation, the team accepted this trade-off for improved model isolation, framework flexibility, and reduced maintenance burden through managed services."
mlops:
  source: "sqlite"
  entryId: 75
  sourceUrl: "https://engineering.zalando.com/posts/2021/02/machine-learning-pipeline-with-real-time-inference.html"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061115"
  lastUpdated: "2026-04-14T19:54:55.067451"
---

## Problem Context

Zalando's payments team operates machine learning models for fraud detection and credit risk assessment, helping determine which customers can be offered deferred payment options. The business problem is critical: fraudsters exploit deferred payment systems to acquire goods without paying, and better risk prediction enables Zalando to extend payment convenience to more legitimate customers while managing fraud exposure.

The team's ML infrastructure evolved through multiple generations. Initial implementations used simple Python and scikit-learn. In 2015, they migrated to Scala and Spark for better scalability. By 2019, this Spark-based system had accumulated significant technical debt and operational pain points that motivated a comprehensive redesign.

The legacy system suffered from four major issues. First, tight coupling to Scala and Spark made it difficult to leverage state-of-the-art Python libraries, which increasingly dominated the ML research landscape. Second, the system contained extensive custom code for functionalities that could now be replaced by managed services, creating maintenance burden and steep learning curves for new team members. Third, production operations were problematic, with high memory consumption, latency spikes, and slow instance startup times that hampered scalability during traffic surges. Fourth, the monolithic design tightly coupled feature preprocessing and model training without clear pipeline stages, with everything running on a single cluster during training.

## Requirements and Design Constraints

The team established comprehensive requirements that balanced continuity with existing systems against aspirations for improvement. The new system needed to maintain API compatibility, accepting JSON order data and returning JSON responses. Latency requirements were stringent, demanding that 99.9% of responses complete within millisecond-range thresholds. Load capacity needed to handle hundreds of requests per second under normal conditions, with the ability to scale to higher order-of-magnitude throughput during sales events.

Production complexity requirements included supporting multiple models simultaneously, divided by assortment type, market, and other segmentations. A critical requirement was unified feature implementation, ensuring that preprocessing logic applied to production requests exactly matched the preprocessing used on training data, avoiding the dual-implementation problem that frequently introduces training-serving skew.

New requirements focused on addressing legacy pain points. Framework independence was essential to support the research team's exploration across PyTorch, TensorFlow, XGBoost, and emerging frameworks. Fast scale-up capability needed to adjust to traffic growth within minutes rather than the extended startup times of the legacy system. The pipeline should have clearly delineated stages, particularly separating data preprocessing from model training. Finally, the architecture should leverage existing ML tooling and managed services rather than building custom solutions.

## Architecture and Design

The redesigned system centers on zflow, a workflow orchestration tool built by Zalando's Machine Learning Platform team. zflow is a Python library constructed on top of AWS Step Functions for orchestration, AWS Lambda for serverless compute, Amazon SageMaker for ML-specific operations, and Databricks Spark for data preprocessing. This architectural choice moved the team away from building infrastructure from scratch toward composing managed services.

The workflow orchestrates five major stages. Training data preprocessing uses Databricks clusters combined with a scikit-learn batch transform job on SageMaker. Model training executes as a SageMaker training job, allowing framework substitution by swapping SageMaker containers. Prediction generation runs as another batch transform job. Model evaluation leverages a Databricks job to calculate custom metrics and generate PDF performance reports. Finally, deployment creates a SageMaker endpoint to serve the model.

This pipeline architecture provides clear separation between stages while maintaining flexibility in technology selection for each component. The use of SageMaker training jobs particularly addressed the framework lock-in problem, as teams can substitute any model available as a SageMaker container, or implement custom containers when necessary.

## Model Serving and Inference Pipeline

The inference architecture uses SageMaker's inference pipeline capability, which chains multiple Docker containers to handle request processing. The team implemented a two-container pipeline. The first container runs scikit-learn and handles preprocessing of incoming requests, including feature extraction from input JSON and basic data transformations. The second container holds the actual prediction model, which might be XGBoost, PyTorch, or another framework.

This dual-container approach elegantly solves the unified feature implementation requirement. The same preprocessing container used in production can be applied during batch inference for model evaluation, ensuring exact consistency between training and serving. The containers are designed to be lightweight and optimized for serving rather than training, contributing to faster scale-up times.

Requests arrive at the SageMaker endpoint carrying JSON payloads. The preprocessing container transforms these into feature representations, which flow directly to the model container for prediction. The entire pipeline executes within the SageMaker endpoint infrastructure, avoiding the need for external orchestration of the preprocessing-to-prediction flow at inference time.

## Performance Metrics and Validation

The team conducted comprehensive load testing to validate the new system against their latency and throughput requirements. Tests ran continuously for four-minute intervals, varying EC2 instance types, instance counts, and request rates. They measured success rate (percentage of requests returning HTTP 200) and 99th percentile response latency.

Results on ml.m5.large instances showed strong performance characteristics. At 200 requests per second, a single ml.m5.large instance maintained sub-80ms p99 latency with near-100% success rates. At 400 requests per second, maintaining high success rates required four or more ml.m5.large instances, though when properly scaled, response times stayed under 50ms. For extreme loads of 1000 requests per second, two or more ml.m5.4xlarge or ml.m5.12xlarge instances could maintain sub-200ms response times with acceptable success rates.

These performance numbers met the team's requirements, with p99 latencies well within the millisecond-range thresholds needed for fraud detection at checkout. The instance scaling characteristics provided clear guidance for capacity planning during normal operations and traffic spikes.

Scale-up time testing revealed that adding an instance to a SageMaker endpoint reduced provisioning time by 50% compared to the legacy system. While this represented significant improvement, the team noted interest in exploring further optimizations. The faster scale-up directly addressed one of the legacy system's pain points, where slow instance startup hampered response to traffic surges.

## Cost Trade-offs

The migration brought substantial cost implications that required careful evaluation. The team anticipated operational costs would increase by up to 200%, a dramatic jump driven primarily by architectural differences in resource allocation. The legacy system served all models from shared large instances, achieving high density and cost efficiency. The new architecture allocates separate instances per model, fundamentally changing the cost profile.

The team made the deliberate decision to accept this cost increase based on three strategic benefits. First, model flexibility improved dramatically, as each model can use different technology stacks or frameworks without being constrained by shared infrastructure. Second, isolation between models means traffic to one model doesn't affect others, and each model can scale independently based on its specific load patterns. Third, using managed services eliminates the engineering effort required to maintain custom serving infrastructure, shifting costs from engineering time to cloud services.

This cost-benefit analysis illustrates a common MLOps trade-off where operational flexibility and reduced engineering overhead justify increased infrastructure spending. The team valued the ability to rapidly experiment with new frameworks and the operational simplicity of managed services over the raw cost efficiency of the monolithic legacy system.

## Technical Implementation Details

The technology stack integrates multiple AWS and third-party services. AWS Step Functions provides workflow orchestration, defining the sequence of preprocessing, training, evaluation, and deployment stages. AWS Lambda handles serverless compute needs for workflow coordination. Databricks Spark clusters execute data preprocessing workloads that require distributed compute over large training datasets. Amazon SageMaker provides the core ML platform capabilities, including training jobs, batch transform for inference, and model hosting via endpoints.

The preprocessing pipeline uses scikit-learn, chosen for its broad compatibility and the team's existing expertise. Model frameworks vary by use case, including XGBoost for tree-based models, PyTorch and TensorFlow for deep learning approaches. All model artifacts are packaged as Docker containers compatible with SageMaker's container specifications.

The Python-based zflow library abstracts much of the AWS service integration complexity, providing higher-level APIs for defining workflows. This abstraction layer was intentional, making it easier for data scientists who may not be AWS experts to build and modify pipelines. The zflow tool represents Zalando's ML Platform team's strategy of building thin abstraction layers over cloud services rather than building entirely custom platforms.

## Cross-Team Collaboration Model

The project exemplified Zalando's approach to platform team collaboration. Development involved a virtual team combining members from the Payments team (the business unit with the fraud detection problem) and the Machine Learning Platform team (the infrastructure team providing ML tooling). This collaboration model is typical for the ML Platform team, which embeds data scientists and engineers with business units to accelerate platform adoption.

The teams formalized their collaboration through a Statement of Work (SoW) defining the scope, services, resources, and time commitment. The nine-month project followed Kanban development practices with user stories, task breakdowns, weekly replanning sessions, and daily standups. This structured approach provided predictability despite the cross-team nature of the work.

The collaboration encountered expected friction points. ML Platform team members occasionally needed to deliver training programs for other company divisions, reducing availability for the project. Similarly, Payments team members sometimes faced firefighting duties on production issues unrelated to the ML migration. Clear communication about these external demands proved essential since team members weren't naturally aware of the other team's context.

Knowledge transfer emerged as a critical early-stage activity. Payments team members brought deep domain expertise in fraud detection business logic, while ML Platform members provided expertise in the AWS and SageMaker tooling. Both knowledge domains were necessary for success, requiring significant upfront investment in cross-training.

## Lessons and Trade-offs

The project successfully addressed the four original pain points while teaching valuable lessons about ML platform design. The framework independence goal was fully achieved through SageMaker's container-based approach, enabling the team to use PyTorch, TensorFlow, XGBoost, or custom frameworks without architectural changes. The clear pipeline structure eliminated the monolithic design problem, with well-defined stages for preprocessing, training, evaluation, and deployment. Production operations improved through faster scale-up and more predictable performance, though latency spikes weren't entirely eliminated. The move to managed services significantly reduced custom code maintenance burden.

The cost increase represents the primary trade-off, raising questions about whether the 200% cost increase could be mitigated through more sophisticated resource sharing while retaining isolation benefits. The team didn't explore multi-model endpoints or other cost optimization techniques, suggesting areas for future iteration.

The choice to use Databricks Spark for preprocessing while using SageMaker for training and serving introduces some architectural complexity, requiring data movement between systems. The team likely chose this approach because their existing data pipelines were Spark-based, making migration easier, but it does create dependencies on multiple platforms.

The dual-container inference pipeline elegantly solves training-serving consistency for preprocessing but adds latency and complexity compared to single-container serving. The team determined this trade-off was worthwhile for the consistency guarantees, but applications with tighter latency requirements might need different approaches.

The cross-team collaboration model proved successful but resource-intensive, requiring nine months of coordinated effort. Organizations considering this approach should plan for the coordination overhead and knowledge transfer investment, though the payoff comes in faster platform adoption and better alignment between platform capabilities and business needs.

The project validates the broader industry trend toward composing ML platforms from managed services rather than building everything custom. The team's experience suggests this approach works well when the managed services (like SageMaker) align well with requirements, though it does create vendor dependencies and potentially higher costs than highly optimized custom solutions.
