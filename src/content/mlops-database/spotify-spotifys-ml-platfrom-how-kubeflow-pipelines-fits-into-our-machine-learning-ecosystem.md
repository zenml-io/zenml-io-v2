---
title: "How Kubeflow Pipelines fits into our Machine Learning ecosystem"
slug: "spotify-spotifys-ml-platfrom-how-kubeflow-pipelines-fits-into-our-machine-learning-ecosystem"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "metadata-store"
  - "pipeline-orchestration"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "terraform"
  - "data-validation"
  - "deployment"
  - "model-evaluation"
  - "training"
industryTags: "media-entertainment"
company: "Spotify"
companySlug: "spotify"
platformName: "Spotify's ML platfrom"
contentType: "slides"
summary: "Spotify integrated Kubeflow Pipelines and TensorFlow Extended (TFX) into their machine learning ecosystem to address critical challenges around slow iteration cycles, poor collaboration, and fragmented workflows. Before adopting Kubeflow, teams spent 14 weeks on average to move from problem definition to production, with most ML practitioners spending over a quarter of their time just productionizing models. Starting discussions with Google in early 2018 and launching their internal Kubeflow platform in alpha by August 2019, Spotify built a thin internal layer on top of Kubeflow that integrated with their ecosystem and replaced their previous Scala-based ML tooling. The impact was dramatic: iteration cycles dropped from weeks to days (prototype phase from 2 weeks to 2 days, productionization from 2 weeks to 1 day), and the platform saw over 15,000 pipeline runs with nearly 1,000 runs during a single hack week event, demonstrating strong adoption and accelerated ML development velocity across the organization."
link: "https://www.slideshare.net/JoshBaer/kubeflow-at-spotify-for-the-kubeflow-summit-192901994"
seo:
  title: "Spotify: How Kubeflow Pipelines fits into our Machine Learning ecosystem - ZenML MLOps Database"
  description: "Spotify integrated Kubeflow Pipelines and TensorFlow Extended (TFX) into their machine learning ecosystem to address critical challenges around slow iteration cycles, poor collaboration, and fragmented workflows. Before adopting Kubeflow, teams spent 14 weeks on average to move from problem definition to production, with most ML practitioners spending over a quarter of their time just productionizing models. Starting discussions with Google in early 2018 and launching their internal Kubeflow platform in alpha by August 2019, Spotify built a thin internal layer on top of Kubeflow that integrated with their ecosystem and replaced their previous Scala-based ML tooling. The impact was dramatic: iteration cycles dropped from weeks to days (prototype phase from 2 weeks to 2 days, productionization from 2 weeks to 1 day), and the platform saw over 15,000 pipeline runs with nearly 1,000 runs during a single hack week event, demonstrating strong adoption and accelerated ML development velocity across the organization."
  canonical: "https://www.zenml.io/mlops-database/spotify-spotifys-ml-platfrom-how-kubeflow-pipelines-fits-into-our-machine-learning-ecosystem"
  ogTitle: "Spotify: How Kubeflow Pipelines fits into our Machine Learning ecosystem - ZenML MLOps Database"
  ogDescription: "Spotify integrated Kubeflow Pipelines and TensorFlow Extended (TFX) into their machine learning ecosystem to address critical challenges around slow iteration cycles, poor collaboration, and fragmented workflows. Before adopting Kubeflow, teams spent 14 weeks on average to move from problem definition to production, with most ML practitioners spending over a quarter of their time just productionizing models. Starting discussions with Google in early 2018 and launching their internal Kubeflow platform in alpha by August 2019, Spotify built a thin internal layer on top of Kubeflow that integrated with their ecosystem and replaced their previous Scala-based ML tooling. The impact was dramatic: iteration cycles dropped from weeks to days (prototype phase from 2 weeks to 2 days, productionization from 2 weeks to 1 day), and the platform saw over 15,000 pipeline runs with nearly 1,000 runs during a single hack week event, demonstrating strong adoption and accelerated ML development velocity across the organization."
mlops:
  source: "sqlite"
  entryId: 60
  sourceUrl: "https://www.slideshare.net/JoshBaer/kubeflow-at-spotify-for-the-kubeflow-summit-192901994"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.060966"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Spotify faced several critical challenges in their machine learning operations that were significantly hampering their ability to deliver ML-powered features effectively. The organization discovered that most teams were spending between one to three sprints just to get an initial ML prototype working, raising the question of how many product teams would be willing to wait that long for initial learnings. More troubling, over 30% of ML practitioners were spending more than a quarter of their time converting prototypes into production-grade software, representing a massive productivity drain.

The end-to-end ML journey at Spotify consisted of four distinct phases: problem definition, prototyping, productionization, and measurement/experimentation. Before their Kubeflow adoption, a typical project took approximately 14 weeks from a defined problem to a production solution. The breakdown showed 4 weeks for problem definition, 2 weeks for initial prototyping, 1 week for model development, another 2 weeks for training, 1 week for evaluation, 2 weeks for productionization, and another 2 weeks for measurement. With many iterations required per phase, this extended timeline severely limited the organization's ability to experiment and iterate on ML solutions.

Beyond slow feedback loops, Spotify encountered significant collaboration and standardization challenges. Teams were using numerous different frameworks in different ways, preventing shared learnings across the organization. There was no common approach to building workflows, making it difficult to track projects, artifacts, and lineage. Data analysis was typically separated from model training and model analysis, with each step requiring custom implementation. This fragmentation created silos and prevented the ML community from operating efficiently at scale.

## Architecture & Design

Spotify's solution involved building a Kubeflow-based ML platform with a strategic architecture designed to balance standardization with flexibility. The company began discussions with Google about Kubeflow in early 2018, aligned their infrastructure tooling with Google's direction, and launched their internal product in late 2018.

The platform architecture consists of multiple isolated Kubernetes clusters serving different purposes. They operate a test cluster for internal development, upgrade testing, and integration tests. A development cluster handles ad-hoc jobs and allows teams to develop new workflows. The production cluster runs regularly scheduled workloads with a higher availability SLA, ensuring reliability for business-critical ML pipelines.

Spotify made the architectural decision to build only a thin internal layer on top of Kubeflow Pipelines rather than heavily customizing the platform. This approach helped accelerate development speed while enabling integration with Spotify's broader ecosystem. The layer provides essential enterprise features without diverging significantly from the upstream Kubeflow project.

A key architectural choice was replacing their previous Scala-based ML tooling with TensorFlow Extended (TFX), which they evaluated in mid-2018. This standardization on TFX provided common components for data validation, model training, and model analysis, creating a more integrated and streamlined workflow compared to their previous fragmented approach.

The platform incorporates central metadata management to track what's being built and run across the entire Spotify organization, addressing their earlier lineage and tracking challenges. This metadata layer provides visibility into ML experiments and production models company-wide.

## Technical Implementation

Spotify's Kubeflow implementation includes several specific technical components and integrations tailored to their infrastructure needs. The platform runs on Kubernetes, leveraging Kubeflow Pipelines as the core orchestration engine for ML workflows.

One critical implementation detail is the caching mechanism built into the platform, which enables quicker resumption of failed tasks. This significantly improves developer productivity by avoiding redundant computation when debugging or iterating on pipelines.

The platform provides command-line tooling that allows scheduling and execution of jobs via Luigi, Spotify's existing orchestration framework. This integration bridges the gap between Kubeflow and Spotify's established workflow management infrastructure, enabling teams to incorporate Kubeflow pipelines into their existing operational patterns.

Shared VPC integration enables Kubeflow pipelines to connect with other Spotify services, ensuring that ML workflows can access necessary data sources, feature stores, and downstream systems without network isolation issues. This networking architecture is essential for enterprise deployments where ML systems must interact with numerous other services.

The platform provides common TFX components as reusable building blocks, making it easy for teams to run TFX-based pipelines without reinventing standard functionality. This component library accelerates development by providing battle-tested implementations of data validation, preprocessing, training, and model analysis steps.

The technical implementation follows a phased rollout approach. Kubeflow Pipelines itself launched in August 2018. Spotify launched their customized "Spotify Kubeflow Pipeline Platform" in alpha in August 2019, with the first teams beginning to try it in January 2019 while infrastructure efforts ramped up. The beta launch opened the platform to the entire Spotify community in January 2020, following months of refinement based on alpha user feedback.

## Scale & Performance

The platform demonstrated significant adoption and impact metrics that validate the architectural approach. Over 15,000 Kubeflow Pipeline runs were executed on the platform, indicating substantial usage across the organization. During a single hack week event, the platform handled nearly 1,000 pipeline runs, demonstrating both its scalability and its appeal to developers who were "loving the integration of data validation, training and model analysis."

The most dramatic performance improvement came in iteration cycle times. The prototyping phase, which previously took 2 weeks, was reduced to just 2 days. The productionization phase dropped from 2 weeks to 1 day. Model training cycles decreased from 2 weeks to 1 day, and evaluation cycles from 1 week to 2 days. The measurement phase was compressed from 2 weeks to 1 day. Overall, the time from problem definition to production solution was drastically reduced, with the entire process achieving week-long rather than multi-month timelines.

These performance improvements translate directly to business value through faster time to production, which enables better ML capabilities in Spotify's products. The reduction in iteration time means teams can experiment more frequently, test more hypotheses, and deliver improvements to the 230 million active users across 79 countries faster than before.

The scale of Spotify's ML operations is substantial given their position as a music streaming service launched in 2008 with 50 million tracks. While specific numbers on model counts or request volumes aren't provided in the source material, the platform clearly needed to support numerous teams across a global engineering organization.

## Trade-offs & Lessons

Spotify's Kubeflow implementation reveals several important trade-offs and lessons for organizations building ML platforms. The decision to build only a thin layer on top of Kubeflow rather than heavily customizing it represents a conscious trade-off between control and maintainability. This approach accelerates development and makes it easier to incorporate upstream improvements, but may limit some customization options compared to building a fully bespoke platform.

The choice to standardize on TFX and replace existing Scala-based tooling required migration effort and potential disruption to existing workflows. However, this standardization paid dividends through improved collaboration, shared components, and reduced fragmentation. The lesson here is that sometimes short-term migration pain is worth the long-term benefits of standardization.

The multi-cluster architecture (test, development, production) represents a trade-off between operational complexity and isolation/safety. Running separate clusters adds infrastructure overhead but provides better isolation for experimentation and higher reliability guarantees for production workloads.

Spotify's integration strategy focused on connecting Kubeflow with their existing ecosystem (Luigi orchestration, Shared VPC networking) rather than forcing teams to completely change their workflows. This pragmatic approach likely accelerated adoption by reducing the learning curve and maintaining compatibility with established patterns.

The phased rollout from alpha to beta, with careful infrastructure focus during the early team trials in January 2019, demonstrates the importance of iterating on platform design with real users before broad deployment. The alpha period allowed Spotify to refine the platform based on actual usage patterns before opening it to the entire engineering community.

Developer enthusiasm, evidenced by the 1,000 runs during hack week and feedback about "loving the integration," suggests that providing integrated workflows for data validation, training, and model analysis addresses a real pain point. When ML platforms reduce friction and integrate previously disconnected steps, adoption follows naturally.

The dramatic reduction in iteration times validates the core value proposition of standardized ML platforms. By reducing the prototype-to-production cycle from weeks to days, Spotify enabled teams to experiment more freely and move faster, ultimately delivering better products to users. The lesson for other organizations is that investing in ML platform infrastructure can yield order-of-magnitude improvements in productivity when done thoughtfully.

Spotify's vision extends beyond their current implementation to embrace more of the Kubeflow ecosystem, suggesting they view this as a long-term strategic investment rather than a point solution. The platform aims to reduce the technical debt inherent in ML systems by providing standardized, reusable components and clear workflows that prevent the proliferation of bespoke solutions.
