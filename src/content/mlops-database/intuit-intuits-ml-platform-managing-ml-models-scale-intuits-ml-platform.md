---
title: "Managing ML Models @ Scale - Intuit’s ML Platform"
slug: "intuit-intuits-ml-platform-managing-ml-models-scale-intuits-ml-platform"
draft: false
mlopsTags:
  - "compute-management"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "argo"
  - "kubernetes"
  - "sagemaker"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "finance"
company: "Intuit"
companySlug: "intuit"
platformName: "Intuit's ML platform"
contentType: "slides"
summary: "Intuit's Machine Learning Platform addresses the challenge of managing ML models at enterprise scale, where models are derived from large, sensitive, continuously evolving datasets requiring constant retraining and strict security compliance. The platform provides comprehensive model lifecycle management capabilities using a GitOps approach built on AWS SageMaker, Kubernetes, and Argo Workflows, with self-service capabilities for data scientists and MLEs. The platform includes real-time distributed featurization, model scoring, feedback loops, feature management and processing, billback mechanisms, and clear separation of operational concerns between platform and model teams. Since its inception in 2016, the platform has enabled a 200% increase in model publishing velocity while successfully handling Intuit's seasonal business demands and enterprise security requirements."
link: "https://www.usenix.org/conference/opml20/presentation/wenzel"
year: 2020
seo:
  title: "Intuit: Managing ML Models @ Scale - Intuit’s ML Platform - ZenML MLOps Database"
  description: "Intuit's Machine Learning Platform addresses the challenge of managing ML models at enterprise scale, where models are derived from large, sensitive, continuously evolving datasets requiring constant retraining and strict security compliance. The platform provides comprehensive model lifecycle management capabilities using a GitOps approach built on AWS SageMaker, Kubernetes, and Argo Workflows, with self-service capabilities for data scientists and MLEs. The platform includes real-time distributed featurization, model scoring, feedback loops, feature management and processing, billback mechanisms, and clear separation of operational concerns between platform and model teams. Since its inception in 2016, the platform has enabled a 200% increase in model publishing velocity while successfully handling Intuit's seasonal business demands and enterprise security requirements."
  canonical: "https://www.zenml.io/mlops-database/intuit-intuits-ml-platform-managing-ml-models-scale-intuits-ml-platform"
  ogTitle: "Intuit: Managing ML Models @ Scale - Intuit’s ML Platform - ZenML MLOps Database"
  ogDescription: "Intuit's Machine Learning Platform addresses the challenge of managing ML models at enterprise scale, where models are derived from large, sensitive, continuously evolving datasets requiring constant retraining and strict security compliance. The platform provides comprehensive model lifecycle management capabilities using a GitOps approach built on AWS SageMaker, Kubernetes, and Argo Workflows, with self-service capabilities for data scientists and MLEs. The platform includes real-time distributed featurization, model scoring, feedback loops, feature management and processing, billback mechanisms, and clear separation of operational concerns between platform and model teams. Since its inception in 2016, the platform has enabled a 200% increase in model publishing velocity while successfully handling Intuit's seasonal business demands and enterprise security requirements."
mlops:
  source: "sqlite"
  entryId: 108
  sourceUrl: "https://www.usenix.org/conference/opml20/presentation/wenzel"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061475"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Intuit faces distinctive challenges in managing machine learning models at enterprise scale that stem from both the technical characteristics of their data and the business context in which they operate. The company works with huge, sensitive datasets that are continuously evolving, which creates a fundamental tension between the need for rapid model iteration and strict security and compliance requirements. Unlike smaller organizations that can afford to treat models as relatively static artifacts, Intuit's data evolution requires continuous model training and tuning to maintain accuracy and relevance.

The platform team identified a gap between what data scientists and machine learning engineers need for productivity versus what Intuit's enterprise governance and security frameworks demand. Data scientists require flexibility, rapid experimentation, and self-service capabilities to iterate quickly on models. Meanwhile, the enterprise needs robust security controls, audit trails, compliance mechanisms, cost tracking through billbacks, and operational stability to support mission-critical business functions. This dual requirement creates significant complexity in platform design.

Another key challenge stems from Intuit's seasonal business patterns. The company experiences significant load variations tied to tax seasons and financial planning cycles, requiring the ML platform to scale elastically while maintaining operational excellence during peak periods. The platform needed to support these seasonal spikes without degradation in service quality or availability.

The platform team also recognized the need to separate operational concerns between the platform itself and individual models. Without clear boundaries, platform engineers would become bottlenecks for model deployment, and model teams would struggle with infrastructure concerns that distracted from their core work of improving model quality. This separation of concerns needed to be architected into the platform from the beginning.

## Architecture & Design

Intuit's Machine Learning Platform provides end-to-end model lifecycle management through a cohesive architecture that spans from feature management through model serving and monitoring. The platform has been in development since 2016, giving the team several years to evolve the architecture based on operational learnings.

The platform employs a GitOps approach as a foundational design principle. This means that model configurations, pipeline definitions, and infrastructure specifications are version-controlled in Git repositories, providing auditability, repeatability, and the ability to roll back changes when issues arise. The GitOps pattern also naturally supports the separation of concerns between data science teams who define models and platform teams who maintain infrastructure.

The architecture integrates AWS SageMaker for model training and management capabilities. SageMaker provides managed infrastructure for training jobs, reducing the operational burden on the platform team while still allowing customization for Intuit's specific requirements. This choice reflects a pragmatic approach of leveraging cloud-native services where they add value rather than building everything from scratch.

Kubernetes serves as the orchestration layer for the platform, handling container scheduling, resource allocation, and service discovery. The platform team's extensive experience with Kubernetes at both Intuit and previously at eBay informed this choice. Kubernetes provides the flexibility to run diverse workloads while maintaining operational consistency across environments.

Argo Workflows orchestrates the complex multi-step processes involved in model training, validation, and deployment. Argo's Kubernetes-native design aligns well with the overall platform architecture, and its directed acyclic graph (DAG) model naturally represents ML pipelines with their dependencies and conditional execution paths.

The platform includes real-time distributed featurization capabilities, allowing features to be computed at scale across distributed infrastructure. This component sits upstream of model scoring and ensures that both training and serving use consistent feature definitions, addressing the training-serving skew problem that plagues many ML systems. The distributed nature of featurization is critical for handling Intuit's data volumes and latency requirements.

Model scoring infrastructure provides real-time inference capabilities, taking feature inputs and returning predictions with acceptable latency for user-facing applications. The scoring service needs to scale independently from training infrastructure to handle variable request loads throughout the day and across seasonal patterns.

Feedback loops complete the cycle by collecting prediction outcomes, actual results when available, and model performance metrics. These feedback loops feed into monitoring systems and provide the data needed for continuous model improvement and retraining decisions.

Feature management and processing capabilities give data scientists tools to define, version, and share features across models. This reduces duplication of effort and ensures consistency when multiple models use similar input signals. The feature management system needs tight integration with both the training and serving infrastructure to maintain consistency.

The platform provides a model management interface that gives data scientists and MLEs self-service capabilities. Rather than requiring tickets to platform teams for every model deployment, users can independently manage their model lifecycle through well-defined interfaces and guardrails. This self-service approach dramatically reduces time-to-deployment while maintaining the security and compliance controls that the enterprise requires.

Billback mechanisms track resource consumption by team, model, or business unit, enabling cost allocation and visibility. This is particularly important in large enterprises where multiple organizations share platform infrastructure but need to understand and manage their individual costs. The billback system needs to attribute costs for training compute, storage, serving infrastructure, and feature computation.

The separation of operational concerns between platform and model is architecturally enforced through clear APIs and responsibility boundaries. Platform teams own infrastructure reliability, scaling, security, and compliance frameworks. Model teams own model code, feature definitions, training configurations, and model quality. This separation allows each team to operate independently within their domain while relying on well-defined contracts at the boundaries.

## Technical Implementation

The platform leverages Kubernetes as its core orchestration technology, running on infrastructure that supports Intuit's enterprise requirements. The team's deep Kubernetes expertise, including experience building a Platform-as-a-Service on top of Kubernetes and OpenStack at eBay, informed the architectural decisions and operational practices.

AWS SageMaker integration provides managed capabilities for model training workloads. SageMaker handles provisioning of training instances, model artifact storage, and integration with other AWS services. This reduces the operational burden compared to building custom training infrastructure while still allowing the platform team to wrap SageMaker with additional controls and interfaces that meet Intuit's specific requirements.

Argo Workflows orchestrates the complex DAGs that represent ML pipelines. Argo's Kubernetes-native design means workflows are defined as Kubernetes custom resources, allowing them to be managed through the same GitOps processes as other platform components. Argo handles dependencies between pipeline steps, retry logic for failed tasks, and parallel execution where appropriate.

The GitOps implementation likely uses tools in the GitOps ecosystem to synchronize Git repository state with cluster state, though specific tooling is not detailed in the source material. The GitOps approach provides version control for all configurations, creating an audit trail that is essential for compliance in financial services.

The real-time distributed featurization system requires careful engineering to achieve the necessary scale and latency characteristics. While specific implementation details are not provided, distributed featurization typically involves caching strategies, partitioning of feature computation across workers, and efficient serialization formats for feature vectors. The system needs to handle both batch feature computation for training and low-latency feature computation for real-time serving.

The model scoring infrastructure serves predictions in real-time, requiring careful attention to latency, throughput, and availability. The serving layer needs to load model artifacts, potentially from a model registry, and execute inference efficiently. Container-based deployment on Kubernetes allows for horizontal scaling of serving replicas to handle variable load.

The platform has been operational since 2016, giving the team substantial time to harden systems, improve operational practices, and expand capabilities. This maturity is evident in the platform's ability to handle Intuit's seasonal business patterns, which create significant load spikes that would break less mature systems.

## Scale & Performance

The platform has delivered measurable business impact through dramatic improvements in model deployment velocity. Model publishing velocity increased by over 200% after the platform capabilities were implemented. This metric captures the end-to-end time from when a model is ready for deployment to when it is serving production traffic, and represents a critical measure of data science team productivity.

A 200% increase in velocity means that what previously took three weeks might now take one week, or what took one day might now take just hours. This acceleration compounds over time as teams can iterate more rapidly, respond faster to model performance degradation, and more quickly capitalize on new data signals or business opportunities.

The platform processes huge datasets, though specific volume metrics are not provided in the source material. The characterization as "huge" in the context of a company like Intuit suggests terabytes to petabytes of data, given that Intuit serves over 50 million customers and processes financial data for individuals and businesses.

The platform handles Intuit's seasonal business patterns successfully, which is particularly notable given the extreme load variations in tax and financial planning software. Tax season creates massive spikes in user activity and correspondingly in ML inference requests for features like fraud detection, return optimization, and personalized recommendations. The platform's ability to scale elastically during these periods while maintaining operational excellence demonstrates mature engineering practices.

The real-time nature of the featurization and scoring systems imposes strict latency requirements. While specific latency targets are not provided, real-time scoring in user-facing applications typically requires p99 latencies under 100 milliseconds to avoid degrading user experience. Achieving these latencies while computing features and running inference at scale requires careful optimization.

The platform supports multiple teams across Intuit, enabling collaboration and separation of concerns. The exact number of data science and MLE teams using the platform is not specified, but a company of Intuit's size with a mature ML practice likely has dozens to hundreds of practitioners across numerous teams and business units.

## Trade-offs & Lessons

The platform team made several key architectural decisions that reflect important trade-offs between flexibility and standardization, between build-versus-buy, and between immediate needs and long-term scalability.

The choice to integrate AWS SageMaker rather than building custom training infrastructure represents a pragmatic build-versus-buy decision. SageMaker provides managed capabilities that reduce operational burden, but it also introduces dependencies on AWS-specific services and potentially limits customization. The platform team evidently concluded that the operational benefits outweighed the loss of flexibility, particularly for training workloads where SageMaker's capabilities align well with common needs.

The Kubernetes foundation provides maximum flexibility but comes with significant operational complexity. Kubernetes requires deep expertise to operate reliably at scale, and the team's prior experience at both Intuit and eBay was likely crucial to making this choice successful. Organizations without similar Kubernetes expertise might struggle with this approach, suggesting that platform architecture choices must account for team capabilities and not just theoretical best practices.

The GitOps approach creates valuable auditability and repeatability but can introduce friction for users accustomed to more interactive deployment methods. Some data scientists might prefer clicking buttons in a web interface rather than editing YAML files and creating pull requests. The platform team addressed this tension through the model management interface that provides self-service capabilities while still leveraging GitOps under the hood. This abstraction is key to making GitOps accessible to non-infrastructure specialists.

The separation of operational concerns between platform and model teams is architecturally elegant but requires careful interface design to work in practice. If the boundaries are too rigid, model teams lose necessary flexibility. If boundaries are too porous, operational concerns leak across teams. The platform team's success in achieving 200% velocity improvements suggests they found an effective balance, likely through iterative refinement based on user feedback.

The billback mechanism addresses a real organizational need in large enterprises but adds complexity to the platform. Tracking resource consumption accurately requires instrumentation throughout the system and careful attribution of shared resources. The platform team evidently concluded that cost visibility was important enough to justify this additional complexity, likely driven by executive demands for financial accountability.

The platform's evolution since 2016 demonstrates the value of long-term investment in infrastructure. Many organizations expect immediate returns from platform initiatives, but building production-grade ML infrastructure takes years of iteration. Intuit's willingness to invest over multiple years enabled the platform team to handle edge cases, improve operational excellence, and expand capabilities in response to user needs.

The focus on operational excellence and successfully handling seasonal business patterns reflects hard-won lessons from production incidents. Any platform serving mission-critical business functions will face its defining moments during peak load or unexpected failures. The emphasis on operational excellence suggests the team experienced and learned from such incidents, building in redundancy, monitoring, and failure recovery mechanisms.

The real-time distributed featurization capability addresses a common pain point in ML systems where training and serving use different feature computation logic, leading to training-serving skew. Building a unified featurization system is complex but eliminates an entire class of subtle bugs that can degrade model performance in production. This architectural choice reflects sophisticated thinking about ML system design beyond just model training.

The collaboration features of the platform enable teams to share features, models, and best practices rather than duplicating effort across silos. In large organizations, different teams often solve similar problems independently, wasting effort and missing opportunities to leverage collective learning. The platform's emphasis on collaboration suggests the team recognized this anti-pattern and built mechanisms to promote reuse and knowledge sharing.

The self-service capabilities represent a key insight about platform adoption. Platforms that require constant interaction with central teams become bottlenecks and frustrate users. By providing self-service capabilities within appropriate guardrails, the platform team enabled data scientists to move quickly while maintaining enterprise controls. This balance is difficult to achieve and requires ongoing refinement as user needs evolve.

The presentation at OpML '20 and the willingness to share learnings with the broader community demonstrates organizational maturity and confidence. Many companies treat their ML platforms as competitive advantages to be kept secret, but Intuit's openness to sharing suggests they recognize that infrastructure is not their competitive moat—rather, how they apply ML to solve customer problems is what differentiates them.
