---
title: "Spotify AI Platform (Hendrix) (Kubernetes Podcast)"
slug: "spotify-hendrix-ray-based-ml-platform-spotify-ai-platform-hendrix-kubernetes-podcast"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "feature-store"
  - "model-serving"
  - "notebooks"
  - "pipeline-orchestration"
  - "docker"
  - "flyte"
  - "kubeflow"
  - "kubernetes"
  - "mlflow"
  - "ray"
  - "tf-serving"
  - "triton"
  - "vertex-ai"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "Spotify"
companySlug: "spotify"
platformName: "Hendrix + Ray-based ML platform"
contentType: "podcast"
summary: "Spotify built Hendrix, a centralized machine learning platform designed to enable ML practitioners to prototype and scale workloads efficiently across the organization. The platform evolved from earlier TensorFlow and Kubeflow-based infrastructure to support modern frameworks like PyTorch and Ray, running on Google Kubernetes Engine (GKE). Hendrix abstracts away infrastructure complexity through progressive disclosure, providing users with workbench environments, notebooks, SDKs, and CLI tools while allowing advanced users to access underlying Kubernetes and Ray configurations. The platform supports multi-tenant workloads across clusters scaling up to 4,000 nodes, leveraging technologies like KubeRay, Flyte for orchestration, custom feature stores, and Dynamic Workload Scheduler for efficient GPU resource allocation. Key optimizations include compact placement strategies, NCCL Fast Sockets, and GKE-specific features like image streaming to support large-scale model training and inference on cutting-edge accelerators like H100 GPUs."
link: "https://kubernetespodcast.com/episode/237-spotify-ai-platform/"
year: 2024
seo:
  title: "Spotify: Spotify AI Platform (Hendrix) (Kubernetes Podcast) - ZenML MLOps Database"
  description: "Spotify built Hendrix, a centralized machine learning platform designed to enable ML practitioners to prototype and scale workloads efficiently across the organization. The platform evolved from earlier TensorFlow and Kubeflow-based infrastructure to support modern frameworks like PyTorch and Ray, running on Google Kubernetes Engine (GKE). Hendrix abstracts away infrastructure complexity through progressive disclosure, providing users with workbench environments, notebooks, SDKs, and CLI tools while allowing advanced users to access underlying Kubernetes and Ray configurations. The platform supports multi-tenant workloads across clusters scaling up to 4,000 nodes, leveraging technologies like KubeRay, Flyte for orchestration, custom feature stores, and Dynamic Workload Scheduler for efficient GPU resource allocation. Key optimizations include compact placement strategies, NCCL Fast Sockets, and GKE-specific features like image streaming to support large-scale model training and inference on cutting-edge accelerators like H100 GPUs."
  canonical: "https://www.zenml.io/mlops-database/spotify-hendrix-ray-based-ml-platform-spotify-ai-platform-hendrix-kubernetes-podcast"
  ogTitle: "Spotify: Spotify AI Platform (Hendrix) (Kubernetes Podcast) - ZenML MLOps Database"
  ogDescription: "Spotify built Hendrix, a centralized machine learning platform designed to enable ML practitioners to prototype and scale workloads efficiently across the organization. The platform evolved from earlier TensorFlow and Kubeflow-based infrastructure to support modern frameworks like PyTorch and Ray, running on Google Kubernetes Engine (GKE). Hendrix abstracts away infrastructure complexity through progressive disclosure, providing users with workbench environments, notebooks, SDKs, and CLI tools while allowing advanced users to access underlying Kubernetes and Ray configurations. The platform supports multi-tenant workloads across clusters scaling up to 4,000 nodes, leveraging technologies like KubeRay, Flyte for orchestration, custom feature stores, and Dynamic Workload Scheduler for efficient GPU resource allocation. Key optimizations include compact placement strategies, NCCL Fast Sockets, and GKE-specific features like image streaming to support large-scale model training and inference on cutting-edge accelerators like H100 GPUs."
mlops:
  source: "sqlite"
  entryId: 186
  sourceUrl: "https://kubernetespodcast.com/episode/237-spotify-ai-platform/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.617123"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Spotify has been applying machine learning at scale since at least 2012-2013, when they launched Discover Weekly, one of their most beloved ML-powered features. Initially, each team building ML applications was responsible for the entire stack—from model architecture to infrastructure provisioning, compute scheduling, and production deployment. This led to significant duplication of effort as teams repeatedly solved the same infrastructure problems. As ML use cases proliferated across Spotify, the company recognized the need for a centralized platform that would abstract away infrastructure complexity and allow ML practitioners to focus on model development rather than operational overhead.

The challenges were multifaceted. ML engineers and data scientists came from diverse backgrounds—some with PhDs in specialized domains but limited production engineering experience, while others were sophisticated ML engineers with deep infrastructure knowledge. The platform needed to serve both audiences. Additionally, the ML landscape was evolving rapidly. The earlier production stack based on TensorFlow and Kubeflow (TFX) became limiting as the industry shifted toward PyTorch, transformer-based architectures, and large language models. Teams needed support for distributed training, batch inference, real-time serving, and the ability to work with cutting-edge hardware accelerators that were often in short supply.

Development environment setup posed another significant pain point. Most Spotify employees used MacBooks with different CPU architectures (especially after Apple Silicon) than production Linux environments. This led to frustrating pip installation issues, dynamic linking errors, and obscure compiler flags that consumed hours of debugging time. The platform needed to provide a frictionless onboarding experience that got users from idea to experimentation to production as quickly as possible.

## Architecture & Design

Hendrix is built as a layered architecture with foundational infrastructure at the base and progressively higher-level abstractions for end users. At the foundation sits Google Kubernetes Engine (GKE), which eliminates the operational burden of managing Kubernetes clusters directly. The platform team chose GKE's standard tier and leverages features like GKE image streaming, autoscaling, and integration with Google Cloud services.

The compute layer consists of multiple GKE clusters serving different purposes. Smaller clusters handle experimentation workloads where users are prototyping and exploring ideas in notebooks. Larger production clusters scale to over 4,000 nodes and support workloads requiring significant compute resources, including hundreds of GPU accelerators. The platform uses Kubernetes namespaces for multi-tenancy, with each team starting with a default namespace and the ability to create additional namespaces for different systems. Resource quotas are applied at the namespace level to prevent resource hogging and noisy neighbor problems.

Ray serves as the distributed compute framework, deployed via KubeRay, the open-source operator for running Ray on Kubernetes. This choice was deliberate—the team evaluated both VM-based and Kubernetes-based Ray deployments and found KubeRay provided faster startup, better autoscaling, and more seamless integration with their existing Kubernetes expertise. Ray enables diverse workloads including distributed training, batch inference, and data processing.

Orchestration is handled by Flyte, which allows users to define ML workflows and schedule production jobs. Flyte runs on a separate Kubernetes cluster managed by a different team, which has introduced some organizational and debugging challenges. Jobs orchestrated by Flyte kick off workloads on the ML platform's Ray clusters.

For serving, the platform evolved from TensorFlow Serving to support a broader range of tools including Triton Inference Server and vLLM for serving large language models. This diversification enables different use cases from traditional model serving to generative AI applications.

The feature store is an in-house system called Jukebox, which handles feature engineering and storage. This component integrates with the broader data infrastructure at Spotify.

A critical user-facing component is Workbench, a cloud-based IDE built on VS Code Server. Workbench eliminates local development environment setup headaches by providing pre-configured, browser-accessible development environments. Users can launch Workbench instances with specific configurations (CPU, GPU, memory) and immediately start coding in notebooks or Python files without wrestling with pip dependencies or architecture-specific compilation issues.

The Hendrix SDK provides a high-level Python interface that abstracts Kubernetes and Ray complexity. Users can create Ray clusters, specify resources, and submit jobs without writing Kubernetes YAML or understanding Ray cluster configuration details. For those who need deeper control, the platform supports progressive disclosure—users can override defaults with CLI flags, provide custom container images, or even drop down to raw Kubernetes YAML for Ray cluster specifications.

Developer portals and documentation are integrated with Backstage, Spotify's open-source developer portal platform, providing a unified discovery and documentation experience.

## Technical Implementation

The core infrastructure runs on Google Cloud Platform. All Kubernetes clusters use GKE, which provides managed control planes and integration with Cloud Logging for centralized log aggregation. Metrics collection uses an internal metrics stack, though Cloud Monitoring is available for certain use cases.

Ray deployment leverages KubeRay with custom configurations optimized for Spotify's workloads. The platform team maintains centralized repositories that encode default configurations and policies. For example, workloads using hardware accelerators are routed through Kueue-managed resource pools, while CPU-only jobs use standard GKE autoscaling node pools.

Kueue, the Kubernetes-native job queueing system, was adopted to improve resource scheduling and avoid scenarios where users acquire partial resources (e.g., four of eight requested H100 GPUs) and block while waiting for the remainder. Kueue's LocalQueue and ClusterQueue abstractions, along with features like resource borrowing and lending, provide sophisticated scheduling capabilities. However, the team recognized Kueue's complexity and deployed it centrally rather than expecting users to configure it themselves.

Dynamic Workload Scheduler (DWS), a Google Cloud feature, is being experimentally integrated to address GPU availability challenges. DWS enables more cost-efficient scheduling by ensuring atomic resource acquisition—workloads don't start consuming paid compute until all required resources are available. This helps with both cost optimization and mitigating stock-outs of in-demand accelerators.

For high-performance distributed training, the platform leverages GCP's highly optimized compute node pools like A2, A3, and H100 instances. These provide high-bandwidth GPU-to-GPU interconnects essential for multi-node training. The team employs compact placement strategies to physically co-locate VMs in the same data center zone, reducing network latency. They also enable NCCL Fast Sockets, a GCP transport layer plugin for NVIDIA's collective communication library (NCCL), which delivers approximately 30% training speedup in public benchmarks.

Container images are a careful balance. The default images provided by the platform are somewhat bloated with many dependencies to support diverse use cases. This has led to user requests for minimal images and faster startup times, which is on the roadmap for improvement.

The Hendrix SDK is currently opinionated toward PyTorch and tightly coupled to specific Ray versions. The team recognizes this as technical debt and aims to make the SDK more framework-agnostic and support multiple Ray versions simultaneously.

## Scale & Performance

The Hendrix platform operates at significant scale. Individual Ray clusters can scale up to over 4,000 nodes, a dramatic increase from earlier clusters that supported only a couple hundred nodes. This growth reflects both increased adoption and support for larger, more demanding workloads like large language model training and inference.

The platform serves all of Spotify's internal ML practitioners, spanning data scientists, ML engineers, and AI researchers across diverse teams. Use cases range from personalized playlist generation (like Discover Weekly) to natural language processing, generative AI, and recommendation systems.

Performance optimizations have yielded measurable improvements. The NCCL Fast Sockets plugin alone provides approximately 30% training speedup for distributed workloads. Compact placement and high-bandwidth interconnects on specialized GPU node pools are essential for multi-GPU training where communication overhead can become a bottleneck.

Workbench instances provide immediate access to development environments without local setup time. This eliminates what was previously a multi-hour (sometimes multi-day) onboarding hurdle involving dependency conflicts, compiler errors, and architecture mismatches.

Resource management is governed by Kubernetes resource quotas at the namespace level, with defaults that users can request to increase subject to platform team approval. This human-in-the-loop process prevents runaway resource consumption while allowing legitimate high-resource workloads.

## Trade-offs & Lessons

One of the most significant lessons is the tension between ML's rapid evolution and platform stability. As Avin noted, the ML domain changes constantly with new tools, frameworks, and model architectures emerging frequently. However, platform users need stability—breaking changes to APIs or infrastructure disrupt workflows and productivity. Navigating this balance requires careful judgment about when to adopt new technologies and when to maintain backward compatibility.

Progressive disclosure emerged as a key design principle. The platform provides sane defaults and high-level abstractions (SDK, CLI) for users who want to get started quickly, while allowing advanced users to drop down to lower-level Kubernetes YAML and Ray configurations when necessary. This serves the diverse user base, from researchers with limited engineering backgrounds to sophisticated ML engineers.

Actionable error messages are critical. The team emphasized learning from Ray's excellent error handling, which provides informative messages with context and suggested optimizations. This is especially important given the broad range of user expertise levels.

The separation between Flyte orchestration (on a different team's cluster) and Ray execution (on the ML platform's clusters) has created debugging friction. When orchestrated jobs fail, users face organizational and technical gaps that slow troubleshooting. Improving this experience is a priority.

Container image bloat is a recognized problem. The default images include many dependencies to support diverse workloads, leading to slow startup times and large virtual environments measured in gigabytes. Users want minimal images, but creating a flexible system that supports both minimal and full-featured images without fragmentation is challenging.

Coupling the SDK to specific Ray versions and PyTorch creates technical debt. As the platform matures, decoupling these dependencies to support Ray version flexibility and framework agnosticism will improve user experience but requires architectural rethinking.

Resource scarcity for cutting-edge GPUs (H100s, etc.) is an ongoing challenge. Dynamic Workload Scheduler and Kueue help, but stock-outs—both from quota limits and Google Compute Engine regional availability—still block users. The platform team is exploring multiple strategies including on-demand instances, reservations, and intelligent scheduling to maximize availability.

The journey from experimentation to production remains longer than ideal. Many ML projects never reach production deployment. The team is focused on reducing friction in this transition—fewer steps, better integration between notebook environments and orchestrated workflows, and automated inference of resource requirements based on model specifications rather than requiring users to manually tune worker counts, memory, and GPU allocations.

A key insight is that ML platform building requires expertise spanning ML, infrastructure, and sometimes low-level CUDA optimization. Assembling teams with this diverse skill set while maintaining platform stability in a fast-moving domain is one of the central challenges. The technology choices—GKE for managed Kubernetes, KubeRay for familiar deployment patterns, Workbench for frictionless onboarding—reflect pragmatic decisions to leverage existing expertise and avoid reinventing wheels where robust solutions already exist.
