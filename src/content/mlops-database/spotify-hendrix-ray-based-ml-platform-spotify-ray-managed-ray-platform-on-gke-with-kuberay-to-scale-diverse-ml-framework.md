---
title: "Spotify-Ray managed Ray platform on GKE with KubeRay to scale diverse ML frameworks from research to production"
slug: "spotify-hendrix-ray-based-ml-platform-spotify-ray-managed-ray-platform-on-gke-with-kuberay-to-scale-diverse-ml-framework"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "metadata-store"
  - "model-serving"
  - "notebooks"
  - "pipeline-orchestration"
  - "databricks"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "mlflow"
  - "ray"
  - "vertex-ai"
  - "ab-testing"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "Spotify"
companySlug: "spotify"
platformName: "Hendrix + Ray-based ML platform"
contentType: "blog"
summary: "Spotify introduced Ray as the foundation for a next-generation ML infrastructure to democratize machine learning across diverse roles including data scientists, researchers, and ML engineers. The existing platform, built in 2018 around TensorFlow/TFX and Kubeflow, served ML engineers well but created barriers for researchers and data scientists who needed more flexibility in framework choice, easier access to distributed compute and GPUs, and faster research-to-production workflows. By building a managed Ray platform (Spotify-Ray) on Google Kubernetes Engine with KubeRay, Spotify enabled practitioners to scale PyTorch, TensorFlow, XGBoost, and emerging frameworks like graph neural networks with minimal code changes. The Tech Research team validated this approach by delivering a production GNN-based recommendation system with A/B testing in under three months, achieving significant metric improvements on the home page \"Shows you might like\" feature—a timeline previously unachievable with the legacy infrastructure."
link: "https://engineering.atspotify.com/2023/02/unleashing-ml-innovation-at-spotify-with-ray"
year: 2023
seo:
  title: "Spotify: Spotify-Ray managed Ray platform on GKE with KubeRay to scale diverse ML frameworks from research to production - ZenML MLOps Database"
  description: "Spotify introduced Ray as the foundation for a next-generation ML infrastructure to democratize machine learning across diverse roles including data scientists, researchers, and ML engineers. The existing platform, built in 2018 around TensorFlow/TFX and Kubeflow, served ML engineers well but created barriers for researchers and data scientists who needed more flexibility in framework choice, easier access to distributed compute and GPUs, and faster research-to-production workflows. By building a managed Ray platform (Spotify-Ray) on Google Kubernetes Engine with KubeRay, Spotify enabled practitioners to scale PyTorch, TensorFlow, XGBoost, and emerging frameworks like graph neural networks with minimal code changes. The Tech Research team validated this approach by delivering a production GNN-based recommendation system with A/B testing in under three months, achieving significant metric improvements on the home page \"Shows you might like\" feature—a timeline previously unachievable with the legacy infrastructure."
  canonical: "https://www.zenml.io/mlops-database/spotify-hendrix-ray-based-ml-platform-spotify-ray-managed-ray-platform-on-gke-with-kuberay-to-scale-diverse-ml-framework"
  ogTitle: "Spotify: Spotify-Ray managed Ray platform on GKE with KubeRay to scale diverse ML frameworks from research to production - ZenML MLOps Database"
  ogDescription: "Spotify introduced Ray as the foundation for a next-generation ML infrastructure to democratize machine learning across diverse roles including data scientists, researchers, and ML engineers. The existing platform, built in 2018 around TensorFlow/TFX and Kubeflow, served ML engineers well but created barriers for researchers and data scientists who needed more flexibility in framework choice, easier access to distributed compute and GPUs, and faster research-to-production workflows. By building a managed Ray platform (Spotify-Ray) on Google Kubernetes Engine with KubeRay, Spotify enabled practitioners to scale PyTorch, TensorFlow, XGBoost, and emerging frameworks like graph neural networks with minimal code changes. The Tech Research team validated this approach by delivering a production GNN-based recommendation system with A/B testing in under three months, achieving significant metric improvements on the home page \"Shows you might like\" feature—a timeline previously unachievable with the legacy infrastructure."
mlops:
  source: "sqlite"
  entryId: 182
  sourceUrl: "https://engineering.atspotify.com/2023/02/unleashing-ml-innovation-at-spotify-with-ray"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.616992"
  lastUpdated: "2026-04-14T19:55:47.986660"
---

## Problem Context

Spotify's ML platform team faced a critical challenge in 2022: their centralized ML infrastructure, while serving over half of internal ML practitioners, was inadvertently constraining innovation at the company. The platform, founded in 2018 to provide reliable production ML, had been optimized primarily for ML engineers using TensorFlow and TFX for supervised learning workflows. Internal research revealed that while the majority of ML engineers adopted the centralized tooling, fewer data scientists and research scientists did. This created a bottleneck in Spotify's ML innovation funnel.

The core issues stemmed from several interconnected pain points. The platform's heavy focus on TensorFlow meant that practitioners wanting to use PyTorch, XGBoost, or emerging frameworks for novel use cases like reinforcement learning and graph neural networks faced significant friction. Access to GPU and distributed compute resources was not user-friendly, forcing researchers to build bespoke infrastructure or abandon promising ideas. The research and prototyping journey was slow, and the path from experimental code to production was arduous—particularly for advanced ML paradigms that didn't fit the TensorFlow/TFX mold.

Spotify conceptualizes ML work as a funnel: at the wide mouth, data and research scientists explore diverse, high-potential ideas with heterogeneous tools and methods that shouldn't be standardized. As ideas prove out and the funnel narrows, data engineers and ML engineers take over to productionize with standardized tooling. The existing platform optimized for the narrow end of the funnel but created barriers at the wide end where innovation originates. This misalignment meant that Spotify was potentially losing valuable ML advances because the infrastructure couldn't accommodate the exploratory phase effectively.

The strategic imperative became clear: to unleash ML innovation across the full spectrum of contributors—regardless of role or preferred framework—Spotify needed infrastructure that met users where they already were, lowered barriers to entry, supported diverse ML tooling, and provided a seamless transition from development to production.

## Architecture & Design

Spotify's ML platform evolution represents a multi-phase architectural journey. The original platform, expanded in early 2020, consisted of four core components that formed a cohesive production workflow:

**ML Home** served as the central repository where ML engineers stored project information and accessed metadata throughout the ML application lifecycle. **Jukebox** powered feature engineering using TensorFlow Transform as its foundation. **Spotify Kubeflow** provided a managed version of the open-source Kubeflow Pipelines platform with TensorFlow Extended (TFX) as the workflow standardization layer. **Salem** handled model serving and on-device ML applications, completing the production deployment story.

This architecture worked well for standardized supervised learning workflows but lacked the flexibility needed for the broader practitioner community. The new Spotify-Ray platform was designed to complement rather than replace these existing components, focusing specifically on the development, research, and prototyping phases while maintaining a path to production integration.

The Spotify-Ray architecture consists of three major layers. At the infrastructure layer, the platform runs on Google Kubernetes Engine (GKE) using the open-source KubeRay operator to manage Ray cluster resources. Each Ray cluster is created as a custom Kubernetes resource, and KubeRay handles the actual cluster provisioning and lifecycle management. Teams start in a shared playground namespace for learning and experimentation, then graduate to dedicated namespaces managed through a multi-tenancy team management process that grants permissions, configures resources, and manages contributors based on team configuration files.

The middle layer provides client-side interfaces—both a CLI (sp-ray) and a Python SDK—that abstract away Ray and Kubernetes complexity. These interfaces implement progressive disclosure of complexity, offering sensible defaults for common use cases while exposing advanced configuration options for power users. Users can create, list, describe, scale, customize, and delete Ray clusters through simple commands that hide the underlying Kubernetes complexity.

At the application layer, Spotify-Ray provides pre-configured environments with ML tools, ready-to-run notebook tutorials, VS Code server for in-browser editing, and SSH access. Each cluster includes a Ray dashboard for monitoring, notebook server, and OpenVSCode server, making the onboarding experience smooth for practitioners of all backgrounds.

Integration points with the broader Spotify ecosystem include native Flyte integration for orchestration and connections to Spotify's data warehouse for data loading. The architecture isolates workloads by giving each Ray worker its own GKE node and isolates teams through Kubernetes namespaces, ensuring both performance and security boundaries.

## Technical Implementation

The technical implementation leverages specific technologies and design patterns chosen for accessibility, flexibility, availability, and performance. At the core, Spotify runs Ray version 2.2.0 with Python 3.8.13 on Google Kubernetes Engine infrastructure.

The CLI and SDK implementation demonstrates sophisticated abstraction over Kubernetes primitives. When a user runs `sp-ray create cluster my-cluster`, the system creates a custom Kubernetes Ray cluster resource that KubeRay interprets. The CLI supports rich configuration options including CPU counts, memory allocations, GPU types (T4, A100), worker group definitions, and custom YAML configurations for advanced scenarios like multiple worker groups. Default configurations provide 15 CPUs and 48GB memory for both head and worker nodes, with customizable GPU allocations per worker.

Critical performance optimizations include leveraging GKE's image streaming feature, which reduced container image pull times from several minutes to just seconds—particularly important for large GPU-based images that can be multiple gigabytes. This dramatically improves the time-to-productivity for practitioners spinning up new clusters.

The multi-tenancy implementation uses a declarative approach where team configurations drive automatic generation of all Kubernetes resources. This includes service accounts, resource quotas, network policies, and RBAC configurations that get deployed to establish isolated namespaces for each team. The shared playground namespace serves as a low-friction entry point with minimal setup requirements.

The Python SDK mirrors CLI functionality programmatically, allowing cluster lifecycle management directly from notebooks or scripts. The SDK's RayCluster class provides methods like `create_cluster()`, `get_cluster()`, `scale_worker_group()`, and `delete()`, with support for blocking operations via the `await_ready` parameter that ensures cluster readiness before returning.

Ray's native support for major ML frameworks—PyTorch, TensorFlow, XGBoost, and others—means practitioners can use their preferred tools without code rewrites. Ray AIR (AI Runtime) provides high-level APIs for common tasks like data loading with Ray Datasets, preprocessing with built-in and custom preprocessors, distributed training with Ray Train, and batch inference with Ray predictors.

The platform exposes Ray's distributed computing primitives through familiar Python interfaces, allowing users to scale from local laptop code to distributed execution with minimal changes. Compute resource configuration happens through unified abstractions that hide infrastructure complexity—users simply specify desired CPUs, memory, and GPU types rather than wrestling with Kubernetes pod specifications or node selectors.

## Scale & Performance

While the case study doesn't provide comprehensive scale metrics across all Spotify ML workloads, several concrete data points illustrate the platform's capabilities and impact. The Spotify ML platform, prior to Ray, served over half of internal ML practitioners and teams—a substantial user base within a company of Spotify's size. The demand for PyTorch has grown considerably, particularly for NLP and GNN use cases, indicating significant adoption pressure that the Ray platform helps address.

The most detailed performance data comes from the graph neural network use case for content recommendations. The Tech Research team completed an end-to-end pipeline from research to production A/B testing in under three months—a timeline described as "extremely challenging" and previously unachievable with the prior infrastructure. This represents a dramatic acceleration in time-to-production for novel ML paradigms. The resulting A/B test showed significant metric improvements and enhanced user experience on the home page's "Shows you might like" feature, though specific percentage improvements aren't disclosed.

Image pull performance saw remarkable improvement through GKE's image streaming feature, reducing pulls of large GPU-based container images from several minutes to just a few seconds. For iterative development workflows where practitioners frequently spin up and tear down clusters, this optimization eliminates what would otherwise be substantial cumulative waiting time.

Default cluster configurations provide substantial compute resources: 15 CPUs and 48GB memory per node (both head and worker nodes), with flexible GPU allocation supporting T4 and A100 GPU types. The architecture supports horizontal scaling through worker group replicas, allowing users to scale from single-node clusters for prototyping to multi-node distributed training for production workloads.

The platform architecture makes efficiency trade-offs by isolating each Ray worker on its own GKE node, prioritizing workload isolation and predictable performance over maximum node utilization. This design choice reflects Spotify's priorities around reliability and team isolation over pure resource efficiency.

## Trade-offs & Lessons

Spotify's Ray adoption surfaces several important trade-offs and lessons for organizations building ML platforms. The most fundamental trade-off is between standardization and flexibility. The original TensorFlow/TFX-based platform achieved excellent standardization for supervised learning workflows, making ML engineers highly productive for common use cases. However, this standardization came at the cost of constraining innovation for researchers and data scientists working on novel problems. Ray shifts the balance toward flexibility, supporting diverse frameworks and paradigms while accepting some fragmentation risk.

The team explicitly acknowledges this tension: "While bringing in a new framework carries the risk of fragmentation, with better foundational building blocks in place, we can work toward creating a more flexible, representative, and responsible ML platform experience." This suggests they view the fragmentation risk as manageable given the innovation benefits, but it remains something they're actively monitoring and mitigating through centralized infrastructure management.

The focus on different user personas proved critical to platform success. By initially targeting ML engineers—whose use cases were easier to standardize—Spotify created a solid foundation but left other personas underserved. The recognition that internal research showed lower adoption among data scientists and researchers prompted the strategic shift. This highlights the importance of understanding user segmentation and serving the full diversity of roles in an ML organization rather than optimizing for a single persona.

Progressive disclosure of complexity emerges as a key design principle. The CLI and SDK provide simple defaults that get practitioners productive immediately (a single command creates a full cluster with notebooks, VS Code, and tutorials), while still exposing advanced configuration options through flags and custom YAML for power users. This pattern allows the platform to serve both day-one Spotifiers and experienced practitioners with the same tooling.

The build-versus-buy decision for infrastructure layers shows pragmatic thinking. Rather than building Kubernetes management from scratch, Spotify leverages managed GKE for availability and operational simplicity. Rather than creating a custom distributed computing framework, they adopt open-source Ray and focus their engineering effort on integration, abstraction, and user experience. The KubeRay operator provides production-grade cluster lifecycle management without requiring Spotify to implement those capabilities. This allows a small platform team to deliver sophisticated capabilities by composing well-supported open-source components.

The graph neural network use case validates the platform's value proposition but also reveals an important lesson: infrastructure flexibility enables organizational agility. The Tech Research team had historically prototyped with ad hoc tooling, then required separate implementation work for production scenarios—a slow, two-phase process. With Spotify-Ray, they could build production-ready infrastructure from the start, compressing the research-to-production timeline dramatically. This suggests that reducing infrastructure friction doesn't just make existing workflows faster; it enables entirely new workflows that weren't previously feasible.

The integration strategy balances immediate value delivery with long-term vision. The team explicitly prioritized the "mouth of the funnel"—early-stage prototyping and experimentation—for the minimum viable version, deferring deeper production workflow integration. However, they architected for that future with planned Flyte integration for orchestration and high-level APIs for canonical MLOps tasks like artifact logging, experiment tracking, and pipeline orchestration. This phased approach lets them validate Ray's value with real users before investing in comprehensive production tooling.

The case study demonstrates how platform evolution requires listening to user needs rather than assuming a one-size-fits-all approach. The original platform worked well for its target use cases, but Spotify's internal research revealed gaps. Acting on that feedback—even though it meant introducing a second major framework alongside TensorFlow/TFX—shows organizational maturity and commitment to serving the full ML practitioner community.

Performance optimization details like image streaming highlight that user experience depends on many small technical decisions. Reducing image pull time from minutes to seconds seems minor but compounds across hundreds of cluster creation operations, dramatically improving perceived platform responsiveness. These operational optimizations often differentiate between platforms that look similar on paper but feel very different in practice.

The acknowledgments section reveals the collaboration model: a core ML Workflows team at Spotify partnered with the broader ML Platform organization and received support from Anyscale (Ray's commercial vendor), Union.ai (for Flyte integration), and others. This demonstrates that building a modern ML platform isn't purely an internal effort—strategic partnerships with open-source commercial vendors can accelerate capability delivery while maintaining control over the overall platform experience.
