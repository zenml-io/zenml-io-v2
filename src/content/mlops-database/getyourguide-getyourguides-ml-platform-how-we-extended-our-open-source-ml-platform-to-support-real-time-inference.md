---
title: "How We Extended our Open Source ML Platform to Support Real-Time Inference"
slug: "getyourguide-getyourguides-ml-platform-how-we-extended-our-open-source-ml-platform-to-support-real-time-inference"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "pipeline-orchestration"
  - "bentoml"
  - "databricks"
  - "docker"
  - "kubernetes"
  - "mlflow"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "serving"
  - "training"
industryTags: "other"
company: "GetYourGuide"
companySlug: "getyourguide"
platformName: "GetYourGuide's ML platform"
contentType: "blog"
summary: "GetYourGuide extended their open-source ML platform to support real-time inference capabilities, addressing the limitations of their initial batch-only prediction system. The platform evolution was driven by two key challenges: rapidly changing feature values that required up-to-the-minute data for personalization, and exponentially growing input spaces that made batch prediction computationally prohibitive. By implementing a deployment pipeline that leverages MLflow for model tracking, BentoML for packaging models into web services, Docker for containerization, and Spinnaker for canary releases on Kubernetes, they created an automated workflow that enables data scientists to deploy real-time inference services while maintaining clear separation between data infrastructure (Databricks) and production infrastructure. This architecture provides versioning capabilities, easy rollbacks, and rapid hotfix deployment, while BentoML's micro-batching and multi-model support enables efficient A/B testing and improved prediction throughput."
link: "https://inside.getyourguide.com/blog/2022/01/05/how-we-extended-our-open-source-ml-platform-to-support-real-time-inference"
year: 2022
seo:
  title: "GetYourGuide: How We Extended our Open Source ML Platform to Support Real-Time Inference - ZenML MLOps Database"
  description: "GetYourGuide extended their open-source ML platform to support real-time inference capabilities, addressing the limitations of their initial batch-only prediction system. The platform evolution was driven by two key challenges: rapidly changing feature values that required up-to-the-minute data for personalization, and exponentially growing input spaces that made batch prediction computationally prohibitive. By implementing a deployment pipeline that leverages MLflow for model tracking, BentoML for packaging models into web services, Docker for containerization, and Spinnaker for canary releases on Kubernetes, they created an automated workflow that enables data scientists to deploy real-time inference services while maintaining clear separation between data infrastructure (Databricks) and production infrastructure. This architecture provides versioning capabilities, easy rollbacks, and rapid hotfix deployment, while BentoML's micro-batching and multi-model support enables efficient A/B testing and improved prediction throughput."
  canonical: "https://www.zenml.io/mlops-database/getyourguide-getyourguides-ml-platform-how-we-extended-our-open-source-ml-platform-to-support-real-time-inference"
  ogTitle: "GetYourGuide: How We Extended our Open Source ML Platform to Support Real-Time Inference - ZenML MLOps Database"
  ogDescription: "GetYourGuide extended their open-source ML platform to support real-time inference capabilities, addressing the limitations of their initial batch-only prediction system. The platform evolution was driven by two key challenges: rapidly changing feature values that required up-to-the-minute data for personalization, and exponentially growing input spaces that made batch prediction computationally prohibitive. By implementing a deployment pipeline that leverages MLflow for model tracking, BentoML for packaging models into web services, Docker for containerization, and Spinnaker for canary releases on Kubernetes, they created an automated workflow that enables data scientists to deploy real-time inference services while maintaining clear separation between data infrastructure (Databricks) and production infrastructure. This architecture provides versioning capabilities, easy rollbacks, and rapid hotfix deployment, while BentoML's micro-batching and multi-model support enables efficient A/B testing and improved prediction throughput."
mlops:
  source: "sqlite"
  entryId: 122
  sourceUrl: "https://inside.getyourguide.com/blog/2022/01/05/how-we-extended-our-open-source-ml-platform-to-support-real-time-inference"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061632"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

GetYourGuide's ML platform initially supported only batch inference, where predictions are generated for all feasible inputs at once and stored for later use. This approach worked well for early-stage models and certain use cases, but as their machine learning projects matured, particularly in their recommendation and relevance systems, they encountered critical limitations that necessitated real-time inference capabilities.

The motivation to move beyond batch inference stemmed from two fundamental challenges. First, feature values used for predictions became increasingly dynamic and time-sensitive. The team found that historical features like user browsing behavior—the activities a customer views during their session—change rapidly and directly impact the quality of personalized recommendations. Using stale batch predictions meant they couldn't leverage the most current user behavior, resulting in suboptimal personalization. Second, as models incorporated more features to improve accuracy, the input space exploded combinatorially. When adding contextual features like device type (desktop versus mobile) or user interface language, each new dimension multiplied the number of possible input combinations that needed pre-computation. This created an unsustainable computational burden where they would need to generate and store predictions for every conceivable parameter combination.

These pain points were particularly acute for two critical use cases: personalizing recommendations to help customers find activities matching their needs, and improving the relevance of activities displayed on search result pages. The team recognized that real-time inference—computing predictions on-demand for specific requested parameters using the freshest feature values—would solve both problems simultaneously while enabling more sophisticated model iterations.

## Architecture & Design

The extended ML platform architecture maintains a clear separation between data infrastructure and production infrastructure, reflecting GetYourGuide's organizational boundaries. The training environment operates primarily within Databricks, their data infrastructure platform, while inference services run on Kubernetes clusters in the production environment. This separation necessitated a thoughtful deployment pipeline design to bridge the two worlds.

The training workflow remains largely unchanged between batch and real-time inference modes, allowing data scientists to use familiar tools and processes regardless of the deployment target. Once training completes in Databricks, the system automatically triggers a deployment pipeline that orchestrates several coordinated steps. The pipeline first retrieves the trained model from MLflow's model registry, which serves as the central artifact repository and versioning system. BentoML then packages the model along with its inference code into a complete web service specification, which gets containerized as a Docker image. This image is pushed to Amazon's Elastic Container Registry (ECR), making it available to the production Kubernetes infrastructure.

The deployment to production leverages Spinnaker, which performs a canary release strategy. This progressive rollout pattern allows the team to validate new model versions with a small percentage of traffic before full deployment, providing a safety mechanism against problematic model updates. If the canary deployment succeeds based on defined health metrics, Spinnaker automatically rolls out the service to the entire production environment.

A key architectural decision was maintaining distinct versioning for code and models. GitHub tracks code versions while MLflow tracks model versions independently. This separation provides crucial flexibility since the team frequently trains multiple models at different times using the same codebase. Each deployed web service carries unique identifiers pointing to both its specific MLflow model version and its GitHub code version, ensuring complete traceability of what's running in production at any moment.

The architecture supports multiple deployment scenarios beyond standard model updates. When incidents occur requiring rollbacks, operators can redeploy previous Docker images through Spinnaker without any rebuilding. For hotfixes addressing issues unrelated to the model itself—such as input validation edge cases—the platform can deploy new code with the existing model by skipping the training pipeline entirely and directly triggering deployment. This capability significantly reduces time-to-fix for non-model issues that would otherwise require waiting hours for complete training jobs to finish.

## Technical Implementation

The technical stack represents a carefully curated selection of open-source tools integrated with GetYourGuide's existing infrastructure. At the data layer, Databricks serves as the primary data infrastructure platform where data scientists conduct feature engineering, experimentation, and model training. MLflow provides model tracking and registry capabilities, maintaining the authoritative record of trained models with their metadata, parameters, and performance metrics.

For the critical task of converting trained models into production-ready web services, the team evaluated multiple approaches before settling on their final implementation. They considered using MLflow's built-in deployment capabilities to Kubernetes or SageMaker, integrating Seldon Core with MLflow as the backend registry, building custom wrappers using lightweight web frameworks like FastAPI or Flask, and ultimately chose BentoML for model serving. This decision came after extensive experimentation with each alternative, weighing factors like integration complexity, performance characteristics, and operational flexibility.

BentoML emerged as the winner for several compelling technical reasons. It automatically generates OpenAPI specifications for deployed services, which proved valuable since OpenAPI is widely adopted across GetYourGuide's engineering organization and simplifies client integration. The framework provides an elegant API for defining preprocessing and postprocessing logic around predictions, allowing data scientists to encapsulate business logic cleanly. Most significantly for performance, BentoML implements adaptive micro-batching, which aggregates multiple concurrent prediction requests and processes them together, achieving substantially higher throughput than request-by-request processing. BentoML also natively supports packaging multiple models within a single service, which the team leverages extensively for A/B testing scenarios where they want one service containing both control and treatment models, using preprocessing logic to route individual requests to the appropriate model variant.

The containerization layer uses Docker as the packaging format, with images stored in Amazon ECR. The team contributed back to the BentoML open-source project by ensuring Docker images run as non-root users by default (addressing security requirements), helping document MLflow integration patterns, and contributing security patches.

Spinnaker handles the deployment orchestration and progressive rollout strategy on the Kubernetes production cluster. The canary release pattern allows fine-grained control over how new model versions are introduced to production traffic, with automated rollback capabilities if health checks fail during the canary phase.

The platform's automation extends to the continuous integration and deployment workflows. Deployment pipelines can be triggered automatically upon training completion, manually by operators, or conditionally based on commit message flags that indicate whether to retrain models or only redeploy with code changes. This flexibility accommodates different urgency levels and change types while maintaining the reproducibility and best practices that guided the platform's initial design.

## Scale & Performance

While the article doesn't provide extensive quantitative metrics about request volumes or latency requirements, it emphasizes that the web service architecture needed to handle multiple concurrent requests efficiently and scale according to traffic patterns. The micro-batching capability provided by BentoML specifically addresses throughput optimization, suggesting that prediction volume is substantial enough that batching individual requests yields meaningful performance improvements.

The platform serves multiple use cases across GetYourGuide's product, including the recommendation system that helps customers discover activities and the relevance system that ranks search results. These customer-facing applications imply the infrastructure must support interactive latency requirements—predictions need to return quickly enough to render in web pages without noticeable delay to users browsing the platform.

The input space explosion problem that motivated real-time inference provides some indication of scale. As features multiplied to improve model quality, the combinatorial growth of possible input combinations made batch prediction untenable. Each contextual dimension—device type, language, user behavior history, and others—multiplied the prediction space, suggesting the platform needed to support models with high-dimensional feature spaces operating across diverse user segments.

The architecture's support for A/B testing, where multiple models coexist in production serving different user populations, indicates the platform handles non-trivial model management complexity. The ability to package multiple models in a single service and route requests appropriately suggests sophisticated traffic management requirements.

## Trade-offs & Lessons

The GetYourGuide team's approach reflects several important trade-offs and lessons learned that offer valuable insights for practitioners building similar ML platforms.

The decision to maintain strict separation between data infrastructure (Databricks) and production infrastructure (Kubernetes) introduced architectural complexity requiring a sophisticated deployment pipeline, but this separation reflects organizational reality at many companies and provides important security and resource boundaries. Rather than fighting this constraint, they embraced it and built automation to bridge the gap smoothly.

Choosing BentoML over alternatives involved careful evaluation of multiple mature options. MLflow's native deployment capabilities would have offered tighter integration with their model registry, but BentoML's performance advantages (micro-batching) and flexibility (preprocessing/postprocessing APIs, multi-model services) proved more valuable. Building custom wrappers with Flask or FastAPI would have provided maximum control but would have required reinventing capabilities that BentoML provides out-of-the-box. Seldon Core was another strong contender but apparently didn't offer the same combination of features that matched their specific requirements.

The separate versioning of code and models represents an insightful design decision. While it adds some complexity by maintaining two version identifiers, it provides crucial flexibility that matches real-world ML workflows where the same code trains different models at different times, and where hotfixes need to update code without waiting for lengthy retraining jobs.

The platform's support for multiple deployment scenarios—standard updates, rollbacks, and hotfixes—demonstrates mature operational thinking. By making Docker images reusable artifacts that can be redeployed without rebuilding, they enable fast incident response. The ability to deploy code changes without retraining acknowledges that not all service updates involve the model itself, and avoiding unnecessary training saves both time and computational resources.

Contributing improvements back to BentoML (documentation, security patches, non-root Docker users) exemplifies good open-source citizenship and pragmatic engineering. Rather than forking and maintaining private modifications, they invested in upstreaming changes that benefit the broader community while keeping their implementation aligned with the mainline project.

The team's ongoing investigation into additional capabilities—feature stores for consistent feature access across training and serving, data validation testing, and model drift monitoring—reveals that they view the platform as continuously evolving. They're building incrementally based on real needs rather than implementing every possible MLOps capability upfront.

Their principle of leveraging open-source tools and only introducing new technology when necessary reflects engineering maturity. They explicitly adapted existing company tools (like Spinnaker, Kubernetes, and Databricks) rather than demanding bespoke infrastructure, reducing operational overhead and cognitive load.

The emphasis on automation, reproducibility, and software engineering best practices throughout both phases of platform development highlights that successful ML platforms must meet the same quality standards as other production systems. Automated integration and deployment, comprehensive versioning, and safe rollout strategies aren't optional niceties—they're essential for reliably operating ML systems at scale.

For practitioners building similar platforms, GetYourGuide's experience suggests starting with batch inference to deliver value quickly, then extending to real-time inference when feature dynamics or input space size demand it. Their systematic evaluation of serving frameworks and willingness to experiment before committing demonstrates the value of prototyping multiple approaches. Most importantly, their focus on automation and operational safety—canary deployments, rollback capabilities, hotfix paths—shows that deployment and operations deserve as much attention as training and modeling.
