---
title: "How Spotify Does ML At Scale"
slug: "spotify-spotifys-ml-platfrom-how-spotify-does-ml-at-scale"
draft: false
mlopsTags:
  - "feature-store"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "Spotify"
companySlug: "spotify"
platformName: "Spotify's ML platfrom"
contentType: "video"
summary: "Spotify built a comprehensive ML Platform to serve over 320 million users across 92 markets with personalized recommendations and features, addressing the challenge of managing massive data inflows and complex pipelines across multiple teams while avoiding technical debt and maintaining productivity. The platform centers around key infrastructure components including a feature store and a Kubeflow Pipeline engine that powers thousands of ML jobs, enabling ML practitioners to work productively and efficiently at scale. By creating this centralized platform, Spotify aims to make their ML practitioners both productive and satisfied while delivering the personalized experiences that users have come to expect, with some users claiming Spotify understands their tastes better than they understand themselves."
link: "https://twimlcon.com/sessions/how-spotify-does-ml-at-scale/"
year: 2021
seo:
  title: "Spotify: How Spotify Does ML At Scale - ZenML MLOps Database"
  description: "Spotify built a comprehensive ML Platform to serve over 320 million users across 92 markets with personalized recommendations and features, addressing the challenge of managing massive data inflows and complex pipelines across multiple teams while avoiding technical debt and maintaining productivity. The platform centers around key infrastructure components including a feature store and a Kubeflow Pipeline engine that powers thousands of ML jobs, enabling ML practitioners to work productively and efficiently at scale. By creating this centralized platform, Spotify aims to make their ML practitioners both productive and satisfied while delivering the personalized experiences that users have come to expect, with some users claiming Spotify understands their tastes better than they understand themselves."
  canonical: "https://www.zenml.io/mlops-database/spotify-spotifys-ml-platfrom-how-spotify-does-ml-at-scale"
  ogTitle: "Spotify: How Spotify Does ML At Scale - ZenML MLOps Database"
  ogDescription: "Spotify built a comprehensive ML Platform to serve over 320 million users across 92 markets with personalized recommendations and features, addressing the challenge of managing massive data inflows and complex pipelines across multiple teams while avoiding technical debt and maintaining productivity. The platform centers around key infrastructure components including a feature store and a Kubeflow Pipeline engine that powers thousands of ML jobs, enabling ML practitioners to work productively and efficiently at scale. By creating this centralized platform, Spotify aims to make their ML practitioners both productive and satisfied while delivering the personalized experiences that users have come to expect, with some users claiming Spotify understands their tastes better than they understand themselves."
mlops:
  source: "sqlite"
  entryId: 57
  sourceUrl: "https://twimlcon.com/sessions/how-spotify-does-ml-at-scale/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.060923"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Spotify operates at massive scale, serving over 320 million users distributed across 92 different markets globally. The company's value proposition heavily relies on delivering exceptional personalized recommendations and features that have become so accurate that users claim Spotify understands their musical tastes better than they understand themselves. Achieving this level of personalization requires extensive use of data and machine learning across the organization.

However, operating machine learning at this scale presents significant organizational and technical challenges. With massive inflows of data continuously streaming in and the complexity inherent in managing different pipelines across numerous teams all utilizing this data, Spotify faced serious risks of accumulating technical debt and experiencing declining productivity. The diversity of ML use cases, the number of teams building models, and the volume of data creates a perfect storm for infrastructure fragmentation, duplicated efforts, and inconsistent practices. Without a coherent platform strategy, individual teams would need to repeatedly solve the same infrastructure problems, leading to wasted engineering effort and slower time-to-production for ML models.

The ML Platform at Spotify was conceived and built specifically to address these productivity and technical debt challenges. The goal was to create a centralized infrastructure that would make all ML practitioners across the company both productive and happy, enabling them to focus on building better models and features rather than wrestling with infrastructure concerns.

## Architecture & Design

The ML Platform at Spotify represents a comprehensive infrastructure solution designed to support the entire machine learning lifecycle at scale. While the source material provides a high-level overview rather than deep architectural specifics, several key components emerge as central to the platform's design.

The feature store serves as a critical component of the platform architecture. Feature stores have become recognized as essential infrastructure for ML at scale, providing a centralized repository for feature definitions, computation logic, and serving capabilities. At Spotify's scale, a feature store addresses several critical needs: ensuring consistency between training and serving features, enabling feature reuse across different models and teams, managing feature computation efficiently, and providing discoverability so teams don't recreate features that already exist. The feature store likely serves as a bridge between Spotify's raw data sources and the models that consume those features, handling the complex transformations and aggregations needed to turn streaming music data into useful ML features.

The Kubeflow Pipeline engine represents the second explicitly mentioned component of the platform. Kubeflow has emerged as a popular open-source platform for orchestrating ML workflows on Kubernetes, and Spotify has adopted it as the engine powering thousands of ML jobs. This choice signals several architectural decisions: containerization of ML workloads, orchestration on Kubernetes infrastructure, and adoption of open-source tooling rather than purely proprietary solutions. The scale is notable—thousands of ML jobs suggests a highly active ML organization with numerous models in production and continuous experimentation and retraining happening across teams.

The platform follows a historical evolution, having been built over time to address emerging needs rather than appearing fully formed. The speakers mention describing "the history of the ML Platform at Spotify," suggesting iterative development and learning from earlier approaches that may not have scaled or served practitioner needs effectively.

## Technical Implementation

The most concrete technical details provided concern the use of Kubeflow Pipelines as the orchestration engine. Kubeflow represents a significant open-source ML platform initiative originally developed by Google and now maintained as a Cloud Native Computing Foundation project. By adopting Kubeflow, Spotify aligns with industry best practices and benefits from a mature ecosystem of tools and integrations.

Kubeflow Pipelines running on Kubernetes implies several implementation choices. The platform likely leverages Kubernetes for container orchestration, providing isolation, resource management, and scalability for ML workloads. Containerization through Docker or similar technologies allows ML practitioners to package their code, dependencies, and environments in reproducible units. The pipeline abstraction enables data scientists to define multi-step ML workflows—data preprocessing, feature engineering, model training, evaluation, and deployment—as directed acyclic graphs that can be versioned, scheduled, and monitored.

The feature store implementation details are not explicitly provided, but building such a system at Spotify's scale would require sophisticated data infrastructure. Feature computation would need to handle both batch and streaming data, given Spotify's real-time user interaction patterns. Storage would need to support both online serving for low-latency feature lookup during inference and offline access for training data generation. Technologies commonly used in feature stores include data warehouses for offline storage, key-value stores for online serving, and stream processing frameworks for real-time feature computation.

The platform serves a large community of ML practitioners across the organization. The term "ML Practitioners" rather than just data scientists suggests a broad user base potentially including ML engineers, data scientists, research scientists, and analytics engineers who all interact with the platform for different purposes.

## Scale & Performance

The source material provides several concrete scale indicators that illustrate the magnitude of Spotify's ML operations:

Spotify serves over 320 million users across 92 different global markets. This user base generates enormous volumes of interaction data—streaming sessions, playlist creation, search queries, skips, likes, and shares—all of which potentially feed into ML models for personalization and recommendation.

The Kubeflow Pipeline engine powers thousands of ML jobs. This metric suggests extensive ML activity across the organization. "Thousands" could indicate thousands of distinct pipelines, thousands of pipeline executions per day, or thousands of concurrent jobs. Regardless of the specific interpretation, this scale demonstrates that ML is not a niche activity at Spotify but rather a core operational capability deployed broadly across product surfaces and features.

The global reach across 92 markets introduces complexity beyond pure scale. Different markets have different music preferences, cultural contexts, languages, and listening patterns. Supporting personalization across this diversity requires models that can generalize across regions while still capturing local nuances, adding significant complexity to the ML platform's requirements.

While specific performance metrics like latency, throughput, or model counts are not provided in the source material, the emphasis on user experience—users claiming Spotify knows them better than they know themselves—suggests that the platform successfully delivers low-latency predictions at high accuracy. Recommendation systems that feel personalized and responsive require both fast inference and regular model updates to capture evolving user preferences.

## Trade-offs & Lessons

The presentation explicitly addresses both successes and ongoing challenges, providing valuable insights for organizations building ML platforms.

On the success side, the platform has achieved its core goal of making ML practitioners productive. The existence of thousands of ML jobs running on the platform indicates successful adoption across teams. The feature store and pipeline engine provide shared infrastructure that eliminates duplicated effort and allows teams to benefit from centralized expertise in building production ML systems.

However, the speakers are transparent about ongoing struggles. The session description notes "what Spotify still struggles with," acknowledging that even a mature ML platform at a leading technology company faces unsolved problems. While specific struggle areas aren't detailed in the available source material, common challenges at this scale include:

Managing the complexity of dependencies between features, models, and data sources as the number of ML applications grows. As more teams build on the platform, understanding interactions and preventing breaking changes becomes increasingly difficult.

Balancing flexibility with standardization. ML practitioners want the freedom to experiment with new techniques and tools, but platform teams need some standardization to provide reliable shared infrastructure. Finding the right abstraction level that supports innovation while preventing fragmentation is an ongoing challenge.

Evolving the platform while maintaining backward compatibility for existing workloads. With thousands of jobs in production, migrations and upgrades must be handled carefully to avoid disrupting critical product features.

The mention of "plans for the future" suggests the ML Platform is actively evolving. Platform development is never finished—new ML techniques emerge, scale requirements grow, and user needs change over time.

The choice to build on open-source foundations like Kubeflow rather than purely proprietary solutions represents a significant strategic decision. This approach allows Spotify to benefit from community innovation and avoid vendor lock-in, but also requires investment in integration, customization, and maintaining expertise in these tools.

The focus on practitioner happiness alongside productivity is noteworthy. Many platform teams focus exclusively on technical capabilities or efficiency metrics, but Spotify explicitly includes user satisfaction as a goal. This suggests recognition that platform adoption and effective use require not just powerful features but also good developer experience, clear documentation, and responsive support.

For organizations building ML platforms, Spotify's experience validates several key principles: centralized feature stores reduce duplicated work and training-serving skew; workflow orchestration platforms like Kubeflow can scale to support large ML organizations; and addressing technical debt proactively through platform investment pays dividends in practitioner productivity. The acknowledgment of ongoing challenges also provides a realistic perspective—even well-resourced teams at leading companies face difficult trade-offs and unsolved problems in ML infrastructure.
