---
title: "Building Production-Scale ML Infrastructure with Ray and GKE for Image Editing Models"
slug: "building-production-scale-ml-infrastructure-with-ray-and-gke-for-image-editing-models"
draft: false
llmopsTags:
  - "content-moderation"
  - "code-generation"
  - "poc"
  - "reinforcement-learning"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "kubernetes"
  - "monitoring"
  - "orchestration"
  - "scaling"
  - "pytorch"
  - "fastapi"
  - "redis"
  - "cache"
  - "google-gcp"
  - "anthropic"
industryTags: "tech"
company: "Reve"
summary: "Reve, a company building interactive interfaces for state-of-the-art image editing and visual understanding models, needed to scale ML infrastructure that could handle heterogeneous workloads across compute, time, and space dimensions. They implemented a solution based on Ray and Google Kubernetes Engine (GKE) that enables orchestration of thousands of accelerators (GPUs and TPUs) for training, inference, and post-training tasks. The platform uses label-based scheduling for flexible compute selection, auxiliary workers for temporal optimization, and multi-region support for spatial distribution, achieving over 90% cluster utilization while maintaining flexibility for researchers and production serving requirements."
link: "https://www.youtube.com/watch?v=LCVUlvoS55I&list=PLFZU5nT4APFA&index=79"
year: 2026
seo:
  title: "Reve: Building Production-Scale ML Infrastructure with Ray and GKE for Image Editing Models - ZenML LLMOps Database"
  description: "Reve, a company building interactive interfaces for state-of-the-art image editing and visual understanding models, needed to scale ML infrastructure that could handle heterogeneous workloads across compute, time, and space dimensions. They implemented a solution based on Ray and Google Kubernetes Engine (GKE) that enables orchestration of thousands of accelerators (GPUs and TPUs) for training, inference, and post-training tasks. The platform uses label-based scheduling for flexible compute selection, auxiliary workers for temporal optimization, and multi-region support for spatial distribution, achieving over 90% cluster utilization while maintaining flexibility for researchers and production serving requirements."
  canonical: "https://www.zenml.io/llmops-database/building-production-scale-ml-infrastructure-with-ray-and-gke-for-image-editing-models"
  ogTitle: "Reve: Building Production-Scale ML Infrastructure with Ray and GKE for Image Editing Models - ZenML LLMOps Database"
  ogDescription: "Reve, a company building interactive interfaces for state-of-the-art image editing and visual understanding models, needed to scale ML infrastructure that could handle heterogeneous workloads across compute, time, and space dimensions. They implemented a solution based on Ray and Google Kubernetes Engine (GKE) that enables orchestration of thousands of accelerators (GPUs and TPUs) for training, inference, and post-training tasks. The platform uses label-based scheduling for flexible compute selection, auxiliary workers for temporal optimization, and multi-region support for spatial distribution, achieving over 90% cluster utilization while maintaining flexibility for researchers and production serving requirements."
notion:
  pageId: "398f8dff-2538-807d-962b-ffd792fc2306"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-09T13:19:00.000Z"
  lastEditedTime: "2026-07-09T13:19:00.000Z"
  publishedAt: "2026-07-09T14:23:56Z"
---

## Overview

Reve is a technology company focused on building interactive interfaces for state-of-the-art image editing and visual understanding models. Their platform enables users to directly control models through annotations, allowing pointing, clicking, and drawing on images rather than relying solely on text-based prompting. The company's ML infrastructure needs to support a diverse set of workloads including data curation, pre-training for foundation models, inference serving for millions of users, and post-training techniques like reinforcement learning with human feedback (RLHF), supervised fine-tuning, and direct preference optimization.

The core challenge Reve faced was addressing heterogeneity across three critical dimensions: compute (requiring different hardware types simultaneously), time (tasks ranging from milliseconds to minutes within single training runs), and space (accelerators distributed across multiple cloud providers and geographic regions). To address these challenges, they built their ML platform on two primary technologies: Kubernetes for orchestration and Ray for translating ML workloads into Kubernetes-compatible resources.

## Platform Architecture and Compute Heterogeneity

The foundation of Reve's infrastructure strategy involves securing compute through Google Cloud reservations, which provides a middle ground between spot instances (cheap but unreliable) and building dedicated data centers (reliable but expensive and time-consuming). By leasing dedicated compute blocks for extended periods (months or years), they achieve both availability guarantees and uptime reliability necessary for large-scale training runs.

Reve leverages Google Kubernetes Engine (GKE) to abstract away the operational complexity of managing Kubernetes clusters. This allows their infrastructure team to focus on running workloads rather than maintaining the underlying orchestration platform. On top of GKE, they deploy KubeRay, which serves as the critical translation layer between Python code that researchers write and Kubernetes custom resources that the infrastructure team maintains.

A key innovation in their approach is the use of label-based scheduling in Ray, which abstracts away major architectural differences between different accelerator types. For example, researchers can simply use a Python decorator to specify they want an H100 GPU, and Ray handles the translation to appropriate Kubernetes labels. This abstraction enables flexibility across different GPU architectures like Hopper (A3 Mega, A3 Ultra) and Blackwell (A4 platform) without researchers needing to understand the underlying hardware topology. This design principle extends to their exploration of future compute platforms including potential migration to TPUs, maintaining a PyTorch-based workflow while keeping options open for architectural changes.

## TPU Integration and First-Class Support

A significant development in Reve's platform capabilities is the integration of TPU support through Ray. Starting with Ray 2.55, TPUs received first-class support in Ray, making them the first accelerator outside of GPUs to achieve this status. First-class support means TPUs are natively integrated and tested in Ray releases, with pre-packaged TPU Docker images and well-tested dependencies, rather than being experimental and community-supported.

The migration path from GPUs to TPUs is designed to be straightforward using consistent Ray APIs. Previously, users had to write extensive manual scripts to help Ray understand TPU device topology. Now, Ray has native TPU understanding through the slice placement group API in the ray.util library. Users can simply select their topology (for example, a 4x4 V6 slice), and Ray automatically schedules workers on the entire 16-chip slice without fragmentation, inferring the number of hosts and workers based on the topology.

Ray performs topology-aware scheduling on physically adjacent nodes to minimize communication hops and avoid throughput loss. For jobs spanning multiple pods, Ray supports multi-slice configurations. TPU metrics are now available in the Ray dashboard, and can also be exported to custom monitoring panels using Grafana. The TPU ecosystem is powered by JAX, and Ray natively supports frameworks like MaxText for scalable pre-training, SkyRL for post-training, and vLLM for high-throughput serving.

For training workloads on TPUs, Ray Train now includes JAX trainers with minimal code changes compared to GPU code. Users only need to set a single parameter (use_gpu=True becomes use_tpu=True) and define the topology, with Ray handling automatic placement. For multi-slice training, users define the number of workers and topology, and Ray calculates the required number of slices automatically. Ray also brings elastic training support to TPUs, a feature previously popular in the GPU world. If a slice fails, Ray can automatically recover from a checkpoint as long as worker count doesn't fall below a minimum threshold, with configurable failure limits to prevent infinite recovery loops.

Ray Data supports JAX by feeding globally sharded data through JAX arrays directly, with multi-host synchronization to prevent uneven batches from causing worker hangs. For PyTorch users, Ray supports torch-xla for TPUs. Migration from GPU PyTorch code to TPU code is straightforward, requiring only changes to the ray.remote decorator to point to TPUs, importing the TPU API, and switching from CUDA devices to TPU devices. The same minimal changes apply to offline batch inference pipelines, with Ray Data configurations updated to set GPUs to 0 and select TPUs instead.

## Temporal Heterogeneity and Utilization Optimization

Reve's approach to temporal heterogeneity addresses the fundamental problem that idle compute is expensive, especially with a reservation model where they pay regardless of utilization. Their goal is to keep accelerators working as close to 100% of the time as possible, which is challenging because bottlenecks constantly shift between different pipeline components (data loading, inference, encoding), and downtime occurs between workloads when jobs complete, crash, or require debugging.

To address the problem of tasks with vastly different execution times sharing the same computational resources, Reve implemented auxiliary workers. This architecture separates independent reactors from the main training loop, effectively creating multiple "lanes" for different speed workloads. Main training nodes run the core training loop, while auxiliary workers managed on the side handle tasks that are temporally slower or faster. This approach is particularly valuable in their online reinforcement learning platform, where separate worker pools run inference tasks. When new weights from the main training loop need to be transferred to inference workers, they use Ray's object store, and are experimenting with peer-to-peer communication for further optimization.

The auxiliary worker approach significantly reduces developer and researcher overhead by packaging many different workload types into a single job, eliminating the need to manage multiple separate systems. For workload prioritization, Reve uses preemptible jobs to ensure 100% utilization while guaranteeing that high-priority training runs get necessary resources without being blocked by lower-priority tasks. They define two main priority classes: preemptible jobs (lower priority tasks like data classification that can be interrupted) and non-preemptible jobs (critical training runs).

Their preemptible jobs are configured with large max worker scales, requesting far more resources than physically available. When a large training run is active, preemptible jobs scale down automatically. When the training run crashes or completes, capacity is automatically recovered and transferred to preemptible jobs at larger scale. This strategy enables them to maintain a workload running on arbitrary nodes more than 90% of the time, dramatically improving overall cluster utilization.

## Spatial Heterogeneity and Multi-Region Orchestration

Spatial heterogeneity arises when compute resources are fragmented across different geographic regions and data centers, a common situation given the scarcity of accelerators. Reve addresses this through multiple strategies centered on inference serving and distributed job submission.

For inference serving across multiple clusters, they leverage Inference Gateway, which provides a common endpoint for all services spanning different clusters. This architecture includes a common ingress point and load balancer, with HTTP routes defining rules for directing traffic to different services in different clusters. This creates a clear separation of concerns: developers manage inference objectives, capacity, and deployments, while administrators focus on how traffic is accepted and routed through different services.

Inference Gateway supports two load balancing approaches. The first is URL path-based routing, where requests for specific services (like a summarizer versus a translator) are routed to appropriate services based on the URL path. The second approach uses routing extensions for body-based or model-aware routing, which looks for API-compatible endpoints and uses information in the JSON body of requests to route to appropriate models like Gemma or Qwen, potentially across different services and clusters.

For development workflows, Reve uses Ray's remote submission capability to address the challenge of researchers developing in their home cluster while having available capacity in different regions. Ray allows them to run a submitter in the home cluster that automatically packages all code, metadata, and resources, uploads everything to the remote region, and communicates across the entire cluster. This enables researchers to leverage compute in different geographic regions without changing their development workflow.

Topology-aware scheduling is critical when dealing with architectures like A3 Mega with 72 GPUs co-located in a single rack. These systems have fast interconnect within a rack but slower interconnect between racks, making it essential to schedule workers from the same workload as close together as possible. Reve implements this through GKE labels for host, rack, and cluster, correlating IDs to ensure optimal scheduling. This can also be surfaced at the queue level, where users specify node labels like topology.gke.io/rack to schedule workers within the same rack.

Looking ahead, Reve is exploring distributed training algorithms like DLCO that inherently assume heterogeneity within the training loop itself, potentially enabling future training runs to leverage spatial heterogeneity even more effectively.

## Observability, Debugging, and Operations

Operating a platform of this scale and complexity requires sophisticated observability and debugging capabilities. Historically, debugging Ray jobs and clusters after termination was challenging because Kubernetes resources disappeared along with all logs and events. The Ray History Server, developed collaboratively by Google and Anyscale as an open-source, community-maintained solution, addresses this critical gap.

The Ray History Server works by having KubeRay set up the server while Ray pods in live jobs write logs and metrics to persistent storage. When jobs complete, the Ray dashboard queries the History Server, presenting terminated job logs and metrics with the same interface as live jobs. This eliminates the need for teams to build custom observability solutions or waste compute resources keeping clusters running until debugging is complete. The general availability release will include zero-touch experience with automatic provisioning of the History Server and storage, along with custom data retention policies.

Another significant observability improvement is structured and severity logging. Previously, Ray processes generated massive amounts of unstructured text dumped into streams, making error debugging extremely time-consuming. Structured logging formats logs as JSON at the source, making every field searchable. Instead of scanning through unstructured text to find why a single task failed, operators can run queries for specific task IDs and error severities to immediately surface relevant errors.

For security in multi-tenant environments, Reve needed better authentication mechanisms than Ray tokens, which are difficult to manage and pose security risks. With Ray 2.55, authentication can be delegated to Kubernetes, allowing use of existing credentials like GCP IAM or OIDC. Administrators can use standard Kubernetes roles for access control, eliminating separate token management and ensuring better authentication between different teams.

## Future Roadmap and Industry Trends

The platform development roadmap reflects broader industry trends observed by Google and Reve. There's a notable shift in gravity toward inference workloads, reinforcement learning, and increasingly toward agentic AI applications. Ray's origins in RL (with 8-10 of the top open-source RL frameworks built on Ray) position it well for this shift. Its ability to support compute heterogeneity, data handling, pipelining, parallel execution, and streaming execution engines makes it particularly well-suited for these emerging use cases.

Key areas of ongoing development include improved observability and troubleshooting, with Ray History Server reaching GA with automated provisioning, storage, and retention policies. There's a focus on bringing workload and accelerator awareness closer together, with better metrics passing from accelerators through Kubernetes to Ray, and vice versa. This bidirectional awareness helps with lifecycle management and understanding job states for workflow orchestration. The team is working on end-to-end correlation from Ray events to Kubernetes to task and error IDs, creating a complete observability picture. TPU metrics and observability continue to expand through both GKE and Ray console.

For TPU support specifically, the roadmap includes further integration into Ray libraries for serving and RL, Trillium (V7) architecture support including dynamic slicing and topology awareness, optimized performance for latest PyTorch versions, and enabling single Ray jobs across multiple TPU slices for large-form-factor training. There's also work on TPU slicing for inference jobs, making Ray aware of these capabilities.

On the workload side, development focuses on improved Ray head fault tolerance for better uptime and in-place resizing without restarts. For RL specifically, Ray with JAX on TPUs is coming soon, which is seen as critical for enabling these use cases at scale. For serving, the roadmap includes adding support for Ray online inference and LLM APIs for TPUs as customers mature from training to serving phases.

Queue management is evolving to better support multi-tenancy scenarios with quota management, improved preemption handling, and fleet utilization optimization. The platform continues to balance needs across different user personas: infrastructure teams need reliability and maintainability, researchers need flexibility and ease of use, and production systems need performance and cost efficiency. The six pillars guiding the Ray and GKE stack design are: starting with the right compute for the right job, making compute selection easy, ensuring high utilization and performance, supporting workloads across clusters and regions, maintaining observability and security, and enabling easy troubleshooting and fixes.

## Assessment and Trade-offs

While the presentation naturally emphasizes successes and capabilities, certain trade-offs and challenges are implicit in the architecture. The complexity of managing heterogeneous compute across multiple dimensions requires significant platform engineering expertise. The auxiliary worker pattern and preemptible job strategies, while effective for utilization, add operational complexity that may not be necessary for simpler use cases.

The migration to TPUs, while presented as straightforward, still requires code changes and testing, and the ecosystem maturity around JAX versus PyTorch may present challenges for teams deeply invested in specific frameworks. The reliance on Google Cloud-specific features like GKE and TPU reservations creates some degree of vendor lock-in, though the use of open-source Ray provides portability at the workload level.

The observability improvements like Ray History Server and structured logging, while valuable, are still maturing features reaching general availability, suggesting the platform may have previously operated with less comprehensive debugging capabilities. The future roadmap items around fault tolerance and in-place resizing indicate these remain areas requiring improvement.

Overall, Reve's case study demonstrates a sophisticated approach to production ML infrastructure that balances the needs of researchers, infrastructure engineers, and production requirements. The emphasis on heterogeneity management across compute, time, and space dimensions reflects the reality of operating large-scale ML systems in resource-constrained environments. The partnership between Reve, Google, and the open-source Ray community (maintained by Anyscale) shows how collaborative development can address shared industry challenges in the rapidly evolving LLMOps landscape.
