---
title: "Exploring Hinge’s ML Platform Evolution with Ray | Ray Summit 2024"
slug: "hinge-ml-platform-evolution-with-ray-exploring-hinges-ml-platform-evolution-with-ray-ray-summit-2024"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "docker"
  - "kubernetes"
  - "ray"
  - "sagemaker"
  - "spark"
  - "terraform"
  - "wandb"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "tech"
company: "Hinge"
companySlug: "hinge"
platformName: "ML Platform Evolution with Ray"
contentType: "video"
summary: "Hinge, a dating app with 10 million monthly active users, migrated their ML platform from AWS EMR with Spark to a Ray-based infrastructure running on Kubernetes to accelerate time to production and support deep learning workloads. Their relatively small team of 20 ML practitioners faced challenges with unergonomic development workflows, poor observability, slow feedback loops, and lack of GPU support in their legacy Spark environment. They built a streamlined platform using Ray clusters orchestrated through Argo CD, with automated Docker image builds via GitHub Actions, declarative cluster management, and integrated monitoring through Prometheus and Grafana. The new platform powers production features including a computer vision-based top photo recommender and harmful content detection, while the team continues to evolve the infrastructure with plans for native feature store integration, reproducible cluster management, and comprehensive experiment lineage tracking."
link: "https://www.youtube.com/watch?v=_nsTcYtfnXU"
year: 2024
seo:
  title: "Hinge: Exploring Hinge’s ML Platform Evolution with Ray | Ray Summit 2024 - ZenML MLOps Database"
  description: "Hinge, a dating app with 10 million monthly active users, migrated their ML platform from AWS EMR with Spark to a Ray-based infrastructure running on Kubernetes to accelerate time to production and support deep learning workloads. Their relatively small team of 20 ML practitioners faced challenges with unergonomic development workflows, poor observability, slow feedback loops, and lack of GPU support in their legacy Spark environment. They built a streamlined platform using Ray clusters orchestrated through Argo CD, with automated Docker image builds via GitHub Actions, declarative cluster management, and integrated monitoring through Prometheus and Grafana. The new platform powers production features including a computer vision-based top photo recommender and harmful content detection, while the team continues to evolve the infrastructure with plans for native feature store integration, reproducible cluster management, and comprehensive experiment lineage tracking."
  canonical: "https://www.zenml.io/mlops-database/hinge-ml-platform-evolution-with-ray-exploring-hinges-ml-platform-evolution-with-ray-ray-summit-2024"
  ogTitle: "Hinge: Exploring Hinge’s ML Platform Evolution with Ray | Ray Summit 2024 - ZenML MLOps Database"
  ogDescription: "Hinge, a dating app with 10 million monthly active users, migrated their ML platform from AWS EMR with Spark to a Ray-based infrastructure running on Kubernetes to accelerate time to production and support deep learning workloads. Their relatively small team of 20 ML practitioners faced challenges with unergonomic development workflows, poor observability, slow feedback loops, and lack of GPU support in their legacy Spark environment. They built a streamlined platform using Ray clusters orchestrated through Argo CD, with automated Docker image builds via GitHub Actions, declarative cluster management, and integrated monitoring through Prometheus and Grafana. The new platform powers production features including a computer vision-based top photo recommender and harmful content detection, while the team continues to evolve the infrastructure with plans for native feature store integration, reproducible cluster management, and comprehensive experiment lineage tracking."
mlops:
  source: "sqlite"
  entryId: 218
  sourceUrl: "https://www.youtube.com/watch?v=_nsTcYtfnXU"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.618485"
  lastUpdated: "2026-04-14 12:21:23"
---

## Problem Context

Hinge faced significant challenges with their legacy ML infrastructure that fundamentally constrained their ability to iterate quickly and adopt modern deep learning techniques. The dating platform, owned by Match Group and competing with Tinder and OkCupid, operates at meaningful scale with approximately 10 million monthly active users as of Q1 2024 and ranks as one of the top three most downloaded dating apps in all target markets.

The machine learning organization consists of roughly 20 team members distributed across four teams: Dating Outcomes (responsible for matching quality), Trust and Safety (protecting users), Growth (acquisition and retention), and AI Platform Core (foundational infrastructure and tooling). Despite this modest team size, they needed to support sophisticated ML use cases including recommender systems and computer vision models.

Their original platform relied on Apache Spark for distributed computing managed through AWS EMR (Elastic MapReduce). This architecture created multiple friction points that significantly slowed development velocity. The team couldn't update Spark versions on their own cadence since EMR controlled version management. Application logs only appeared every 5 minutes and were written to S3, requiring developers to manually retrieve them for debugging. Submitting applications involved physically copying code to S3 and then pointing EMR at those artifacts. Most critically, Spark fundamentally wasn't designed for GPU computation, which blocked the team from adopting deep learning approaches for recommender systems and other use cases that could benefit from neural networks.

The combination of poor developer ergonomics, limited observability, cumbersome deployment workflows, and inability to leverage modern ML techniques created an imperative to rebuild the platform from scratch with different architectural choices.

## Architecture & Design

Hinge's redesigned ML platform centers on Ray running natively on Kubernetes, orchestrated through Argo CD for declarative cluster management. The architecture deliberately minimizes custom tooling in favor of composing well-supported open source components that integrate cleanly with the company's existing Kubernetes-based microservices infrastructure.

The cluster provisioning workflow begins with developers defining a custom cluster configuration that specifies worker types and replica counts. This abstraction shields users from low-level Kubernetes manifests while preserving the ability to customize when needed. Alongside the cluster config, developers specify a libraries block declaring Python packages, versions, and dependencies required for their specific application. These configurations combine with a base cluster config—essentially the underlying Kubernetes manifest—that remains common across deployments but can be modified if necessary.

When developers commit these configurations to GitHub, GitHub Actions automatically builds Docker images with the specified dependencies and tags them appropriately. Argo CD then consumes all three components (custom config, libraries, and base manifest) directly from the GitHub repository, which serves as the single source of truth for cluster state. Argo CD synthesizes these inputs into a complete Ray cluster Custom Resource Definition (CRD) and applies it to the Kubernetes cluster to spin up the actual Ray infrastructure.

This approach provides several architectural benefits beyond simple cluster creation. Argo CD hooks directly into the GitHub repository to track changes, presenting a clear UI that shows differences between current and desired cluster states. The platform displays pod logs, monitoring data, and Kubernetes events without requiring custom development. The history tracking enables rolling back to previous image tags or cluster configurations when problems arise. When developers modify replica counts or other parameters, Argo CD automatically generates a diff showing exactly what will change, which must be approved before deployment proceeds.

For data processing, Hinge adopted a hybrid approach that balances Spark's SQL strengths with Ray's training capabilities. Large-scale joins and initial data processing happen in Spark, creating an Apache Iceberg table that forms the spine of the feature processing pipeline. This Iceberg table then streams data into Ray for last-mile transformations like one-hot encoding and feature binning. The team contributed an Iceberg connector for Ray back to the open source community to enable this workflow. The Iceberg format also provides a secondary benefit: teams can use DuckDB to perform ad hoc analytical queries on the processed data without spinning up dedicated Spark or data warehouse infrastructure.

For production serving, the platform includes Ray Serve deployment capabilities built on top of the baseline Ray infrastructure, enabling models to handle live traffic. The team uses Weights & Biases for experiment tracking and ML-specific observability, while Prometheus and Grafana provide infrastructure monitoring out of the box through Kubernetes integration.

## Technical Implementation

The technology stack centers on several key open source components deliberately chosen for their maturity and integration characteristics. Ray serves as the distributed computing framework, selected because it's Kubernetes-native, Python-native (enabling better developer experience and log readability), easily customizable with configurable Python versions and packages, and designed for GPU workloads. The platform runs entirely on Kubernetes, which aligns with Hinge's broader microservices architecture and ensures the ML team receives free support from core platform and backend engineering teams.

Argo CD serves as the GitOps orchestration layer, managing the lifecycle of Ray clusters through declarative configurations. This choice proved central to the platform's design philosophy. Rather than building custom cluster management tooling, the team leveraged Argo CD's native capabilities for tracking application state, monitoring changes, displaying component details, and maintaining deployment history. GitHub Actions handles CI/CD, automatically building Docker images when developers push configuration changes and applying appropriate tags that Argo CD consumes.

The data infrastructure combines Apache Spark for large-scale SQL-based transformations with Apache Iceberg as the table format. Iceberg's metadata capabilities enable efficient streaming into Ray and provide queryability through DuckDB for exploratory analysis. For last-mile feature engineering in Ray, the team uses standard Python-based transformations rather than Spark operations, accepting some efficiency trade-offs in exchange for consolidating more of the workflow into a single framework.

Monitoring leverages Prometheus for metrics collection and Grafana for visualization, both standard components in Kubernetes environments that required minimal custom configuration. For ML-specific tracking, the team adopted Weights & Biases rather than building internal experiment management tools, again prioritizing established solutions over custom development.

The cluster configuration abstraction uses a simple YAML format where users specify worker types (CPU vs GPU) and replica counts. A typical configuration might define multiple worker pool types with different resource profiles, starting at zero replicas in a resting state and scaling up as needed. While the platform supports manual replica management for clarity and control, the team increasingly relies on Ray's autoscaling capabilities, which they found work well despite being marked as beta in Ray's documentation.

Python serves as the primary development language across the platform, enabling data scientists to work in a familiar environment without context-switching between languages for different parts of the ML workflow. PyTorch emerged as the deep learning framework of choice, with Ray providing clean wrappers that simplified the transition from non-neural approaches.

## Scale & Performance

Hinge operates at meaningful scale with approximately 10 million monthly active users and ranks among the top three most downloaded dating apps in all target markets. The ML platform supports a team of roughly 20 practitioners distributed across four teams, delivering production features that directly impact user experience and platform safety.

The platform powers several production use cases at scale. The top photo feature uses a computer vision recommender model to dynamically rank photos on user profiles, ensuring the first photo viewers see best represents that user. This requires processing profile images and generating rankings in near-real-time as profiles are viewed. The harmful content detection system analyzes messages before they're sent, using ML models to identify potentially disrespectful or harmful language and prompting users to reconsider, representing a proactive approach to trust and safety that demands low-latency inference.

The team reports that the learning curve for transitioning from Spark to Ray was relatively flat, taking approximately three to four months to reach proficiency. However, this included simultaneous migration from traditional ML approaches to deep learning, which represented its own learning investment. The major tuning challenges involved understanding Ray-specific concerns like optimal data ingestion patterns, auto-memory management configuration, and heterogeneous cluster management (CPU and GPU workers together), which the team hadn't previously handled.

The platform maintains parity between offline experimentation and online production environments by ensuring clusters spin up identically regardless of context, avoiding surprises in model behavior when transitioning from development to production. This reproducibility goal drives much of the cluster management design.

While specific throughput numbers and latency metrics weren't disclosed in the presentation, the architecture's ability to support both batch workloads (model training, feature engineering) and real-time serving (photo ranking, content moderation) indicates the platform handles diverse performance profiles. The shift from 5-minute log delays in the EMR environment to immediate log visibility in the Kubernetes-native Ray platform represents a dramatic improvement in debugging velocity.

## Trade-offs & Lessons Learned

Hinge's platform evolution reflects several deliberate architectural trade-offs that balanced rapid deployment against long-term customization needs. The team's relatively small size—20 ML practitioners supporting a 10-million-user platform—fundamentally shaped their build-versus-buy decisions.

The most significant philosophical choice involved preferring established open source components over bespoke solutions. The team explicitly noted that other organizations at Ray Summit presented thin custom layers around Kubernetes that offered maximum flexibility. Hinge deliberately chose the opposite approach, composing mature tools like Argo CD, GitHub Actions, Prometheus, and Grafana rather than building custom orchestration. This allowed the team to focus engineering effort on modeling work and higher-level platform features like feature stores and serving infrastructure rather than maintaining low-level cluster management code. The trade-off accepts less customization in exchange for free maintenance, better documentation, and support from larger communities.

The data processing strategy represents another considered trade-off. Moving last-mile feature engineering from Spark to Ray sacrifices some efficiency—Ray doesn't understand SQL and lacks Spark's optimization for certain operations. However, consolidating more of the workflow into a single framework simplified the development experience and reduced context-switching. The team still leverages Spark's strengths for massive joins and initial processing, creating Iceberg tables that Ray consumes. This hybrid approach balances pragmatic efficiency with developer experience.

The Argo CD choice delivered several unexpected benefits beyond basic cluster management. The automatic diff generation between current and desired states provided valuable visibility during deployments. The built-in UI for tracking pods, logs, events, and deployment history eliminated the need to build custom dashboards. The GitHub integration created a natural single source of truth and enabled straightforward rollbacks. These features would have required substantial engineering investment to replicate in a custom solution.

The team learned important lessons about Ray's autoscaling capabilities. While officially marked as beta and initially approached with caution, they found autoscaling worked well for their use cases and increasingly rely on it rather than manual replica management. This suggests that Ray's autoscaling maturity may exceed its official stability designation.

The transition from Spark MLlib to PyTorch with Ray proved smoother than anticipated. The cleaner APIs and better Ray integration made deep learning more accessible than attempting GPU workloads on Spark would have been. The three-to-four-month learning curve was reasonable given the simultaneous framework and modeling paradigm shifts.

Integration with Hinge's existing Kubernetes-based microservices infrastructure proved highly valuable. This architectural alignment meant the ML team received free support from platform and backend engineering teams who already understood the underlying infrastructure. When deploying models to production, the tight collaboration with backend teams ensured models integrated properly into the service mesh and met system-level performance requirements.

The team identified several areas for continued platform evolution. Feature store integration remains a work in progress, with plans heavily dependent on the data platform team's roadmap. They want to enable automatic feature lookup for both training and serving, and create feature endpoints that host datasets and batch predictions as RESTful or gRPC services. Cluster management needs to become more reproducible and persistable to guarantee the ability to retrain models with identical configurations. Experiment management requires standardization around capturing model development lifecycle elements, with plans for default lineage tracking covering models, features, and downstream dependencies.

The testing strategy combines offline analysis with close production collaboration. Before models deploy, teams run extensive offline evaluations. During deployment, ML practitioners work directly with backend engineers to ensure models behave correctly within the broader system architecture, validating that inference latency, resource consumption, and error handling meet production requirements.

One subtle lesson involves the value of lightweight analytical tools. The ability to run ad hoc DuckDB queries against Iceberg tables eliminated the need to spin up Spark clusters or data warehouse resources for exploratory analysis. This pattern of providing easy access to processed data for quick investigations improved iteration velocity in ways the team hadn't initially anticipated.

The platform's success ultimately derives from aligning technical choices with organizational constraints. A small team supporting a large user base couldn't afford to build and maintain extensive custom tooling. By composing well-integrated open source components and accepting their constraints, Hinge created a platform that accelerated time to production while preserving the ability to customize when truly necessary. The architecture demonstrates that thoughtful curation of existing tools can be more effective than building bespoke solutions, particularly for teams that need to focus engineering effort on domain-specific problems rather than infrastructure development.
