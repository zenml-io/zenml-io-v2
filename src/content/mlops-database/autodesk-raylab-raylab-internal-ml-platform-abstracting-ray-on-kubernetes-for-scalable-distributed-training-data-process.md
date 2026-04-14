---
title: "RayLab internal ML platform abstracting Ray-on-Kubernetes for scalable distributed training, data processing, and serving"
slug: "autodesk-raylab-raylab-internal-ml-platform-abstracting-ray-on-kubernetes-for-scalable-distributed-training-data-process"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "comet"
  - "docker"
  - "kubernetes"
  - "mlflow"
  - "ray"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "hyperparameter-tuning"
  - "serving"
  - "training"
industryTags: "tech"
company: "Autodesk"
companySlug: "autodesk"
platformName: "RayLab"
contentType: "video"
summary: "Autodesk Research built RayLab, an internal ML platform that abstracts Ray cluster management over Kubernetes to enable scalable deep learning workloads across their research organization. The platform addresses challenges including long job startup times, GPU resource underutilization, infrastructure complexity, and multi-tenant fairness issues. RayLab provides a unified SDK with CLI, Python client, and web UI interfaces that allow researchers to manage distributed training, data processing, and model serving without touching Kubernetes YAML files or cloud consoles. The system features priority-based job scheduling with team quotas and background jobs that improved GPU utilization while maintaining fairness, reducing cluster launch time from 30-60 minutes to under 2 minutes, and supporting workloads processing hundreds of terabytes of 3D data with over 300 experiments and 10+ production models."
link: "https://www.youtube.com/watch?v=akI12Sr82jM"
year: 2025
seo:
  title: "Autodesk: RayLab internal ML platform abstracting Ray-on-Kubernetes for scalable distributed training, data processing, and serving - ZenML MLOps Database"
  description: "Autodesk Research built RayLab, an internal ML platform that abstracts Ray cluster management over Kubernetes to enable scalable deep learning workloads across their research organization. The platform addresses challenges including long job startup times, GPU resource underutilization, infrastructure complexity, and multi-tenant fairness issues. RayLab provides a unified SDK with CLI, Python client, and web UI interfaces that allow researchers to manage distributed training, data processing, and model serving without touching Kubernetes YAML files or cloud consoles. The system features priority-based job scheduling with team quotas and background jobs that improved GPU utilization while maintaining fairness, reducing cluster launch time from 30-60 minutes to under 2 minutes, and supporting workloads processing hundreds of terabytes of 3D data with over 300 experiments and 10+ production models."
  canonical: "https://www.zenml.io/mlops-database/autodesk-raylab-raylab-internal-ml-platform-abstracting-ray-on-kubernetes-for-scalable-distributed-training-data-process"
  ogTitle: "Autodesk: RayLab internal ML platform abstracting Ray-on-Kubernetes for scalable distributed training, data processing, and serving - ZenML MLOps Database"
  ogDescription: "Autodesk Research built RayLab, an internal ML platform that abstracts Ray cluster management over Kubernetes to enable scalable deep learning workloads across their research organization. The platform addresses challenges including long job startup times, GPU resource underutilization, infrastructure complexity, and multi-tenant fairness issues. RayLab provides a unified SDK with CLI, Python client, and web UI interfaces that allow researchers to manage distributed training, data processing, and model serving without touching Kubernetes YAML files or cloud consoles. The system features priority-based job scheduling with team quotas and background jobs that improved GPU utilization while maintaining fairness, reducing cluster launch time from 30-60 minutes to under 2 minutes, and supporting workloads processing hundreds of terabytes of 3D data with over 300 experiments and 10+ production models."
mlops:
  source: "sqlite"
  entryId: 225
  sourceUrl: "https://www.youtube.com/watch?v=akI12Sr82jM"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.619174"
  lastUpdated: "2026-04-14T19:56:07.488344"
---

## Problem Context

Autodesk Research faced significant challenges scaling deep learning workloads across their organization. Their teams were hitting bottlenecks with large-scale model training, data pipeline management, and infrastructure complexity that slowed iteration speed. The specific pain points included massive data volumes in the hundreds of terabytes range, particularly for 3D object data, images, and unstructured formats that required specialized processing infrastructure.

Before building RayLab, teams struggled with long job startup times and deployment cycles that made experimentation difficult. Debugging experiments was particularly challenging due to lack of centralized visibility across distributed workloads. GPU resources experienced long idle periods, representing inefficient use of expensive compute infrastructure. The existing solutions had limited flexibility and were difficult to customize for advanced distributed training techniques like DeepSpeed and FSDP.

A concrete example project illustrated the scale of their challenges: the team ingested approximately 300 terabytes of raw data, processed and deduplicated it down to about 100 terabytes in formats like BRIO, images, and text, ran over 300 experiments with different architectures and hyperparameters, and ultimately deployed more than 10 models to production behind API endpoints. This workflow required orchestrating parallel processing across multiple instances with GPUs and special hardware, demanding significant infrastructure expertise that most ML researchers and scientists lacked.

Meeting internal security requirements while provisioning Ray clusters added another layer of complexity. Teams needed features like experiment tracking and checkpointing that weren't natively part of Ray, and they needed these capabilities while maintaining compliance with role-based access control and other security policies.

## Architecture & Design

RayLab's architecture consists of four main components built as an abstraction layer over Ray on Kubernetes. The platform employs a multi-tenant architecture where each research team maps to a separate Kubernetes namespace with granular role-based access control governing data access and namespace permissions.

The **Cluster Management** component provides simplified interfaces to create and manage Ray clusters without requiring users to understand Kubernetes YAML configurations or cloud console operations. Under the hood, the CLI and Python SDK interface with the KubeRay operator and Kubernetes API to provision head and worker nodes securely within Autodesk's environment.

The **Unified Training and Processing API** builds on Ray's native APIs (ray.remote, Ray Data, Ray Train, Ray Serve) while adding functionality for automated checkpointing to S3 buckets and experiment tracking integration with tools like Comet and TensorBoard. This component includes a custom class called RayLightningExperiment that combines Ray Train and PyTorch Lightning into a single unified interface, allowing researchers to scale standard Lightning jobs to multiple Ray clusters while preserving code structure and training logic.

The **Smart Job Scheduling** component implements priority-based scheduling with different priority tiers and team quotas. Teams receive assigned quotas representing a fraction of available GPUs, enforced through Kubernetes quota functionality. The system supports both normal-priority jobs within team quotas and lower-priority "background" jobs that fill unused capacity from other teams. When a team needs their quota capacity back, background jobs are automatically preempted and resume from the last checkpoint without manual intervention.

The **Resource Efficiency and Monitoring** component provides real-time dashboards, active monitoring, and Slack notifications for all experiments. The monitoring system tracks GPU utilization percentage, GPU memory usage, and various efficiency metrics per team and cluster-wide. Active monitoring automatically detects inefficient resource usage and sends direct messages with optimization tips to job owners. For severely inefficient jobs consuming expensive resources, the system can automatically reclaim resources and reassign them to queued jobs.

The platform uses JupyterHub to provision ML workspaces for users, providing access to VS Code Server (code-server) within the browser environment for development. Everything runs in a protected cloud environment rather than on researcher laptops, with workspaces accessing the RayLab UI, CLI, and Python SDK.

Data flows through the system starting from ingestion and deduplication through Ray Data for map-reduce operations, then to distributed training via Ray Train with support for strategies like DDP, DeepSpeed, and FSDP, with checkpoints continuously saved to S3. Trained models can be deployed for serving through Ray Serve with a single command that creates API endpoints. The Ray dashboard provides visibility into cluster metrics, while Prometheus and Grafana collect additional observability data.

## Technical Implementation

RayLab is implemented as a Python SDK built on top of Ray's native SDK, deployed on Kubernetes using the KubeRay operator. The platform exposes three primary interfaces: a CLI for fast developer-friendly interactions with predefined defaults, a Python client for programmatic cluster management from notebooks and pipelines, and a web UI for broad visibility across researchers, engineers, and leadership.

The CLI allows single-command operations to create and destroy clusters, submit training jobs, and tail logs without touching Kubernetes YAML files. Commands accept parameters for instance types, number of workers, training strategies, checkpoint locations, and other configuration options. The Python SDK exposes methods to submit Ray jobs, monitor logs, and manage cluster lifecycle programmatically, enabling automated hyperparameter sweeps and model refresh pipelines.

Infrastructure components include the KubeRay operator for cluster management, Prometheus for metrics collection, Grafana for visualization dashboards, and role-based access control enforcement at the Kubernetes level. The platform integrates with AWS services, utilizing S3 for checkpoint and log persistence, and supporting AWS Elastic Fabric Adapter (EFA) for high-speed inter-node communication.

The EFA integration represents a significant technical implementation detail. As teams scaled to larger distributed training workloads, communication bandwidth between nodes became a bottleneck. Beyond a certain scale, adding more nodes actually degraded performance rather than improving it. AWS EFA increases the default approximately 10 Gbps communication speed to up to 300 Gbps (3 terabits per second as mentioned, though likely 300 Gbps in practice). Enabling EFA requires complex infrastructure configuration and finding compatible driver combinations, but RayLab abstracts this complexity behind a simple "enable_efa" flag that researchers can set.

The autoscaling implementation keeps small head nodes running continuously (costing approximately $8 per day) while worker nodes automatically scale up when jobs are submitted and scale down when complete. This approach balances cost efficiency with rapid job startup capability.

For distributed training, the platform leverages PyTorch Lightning as a dependency, wrapping it with Ray Train to enable seamless scaling from single-node to multi-node execution. The RayLightningExperiment class enforces reproducibility and traceability by automating checkpoint management and metric logging. Researchers define custom models and datasets in a single script, specify hyperparameters, choose training strategies (DDP, DeepSpeed, FSDP), configure the number of workers, and specify instance types—all in a declarative Python interface.

The priority-based scheduling system uses Kubernetes priority classes to ensure lower-priority background jobs are preempted when higher-priority jobs need resources. The platform leverages Ray's fault tolerance functionality combined with S3 checkpoint persistence to automatically retry failed experiments and resume from the last checkpoint.

Active monitoring runs continuously, analyzing current jobs for resource utilization efficiency. The system sends direct Slack messages to researchers when inefficiencies are detected, providing actionable optimization tips. For severe cases, it automatically reclaims resources to prevent resource starvation for other teams.

## Scale & Performance

RayLab dramatically reduced cluster provisioning time from 30-60 minutes down to under 2 minutes while maintaining compliance with RBAC controls and security requirements. This improvement represents a 15-30x speedup in infrastructure setup time, directly accelerating experimentation velocity.

The platform supports workloads processing approximately 300 terabytes of raw data, deduplicated and converted to around 100 terabytes in consumable formats including BRIO, images, text, and other formats specific to 3D CAD workflows. Individual projects run over 300 experiments with different network architectures and hyperparameters, ultimately deploying more than 10 models to production.

The system manages hundreds of experiments across multiple teams and geographic regions with petabyte-scale data processing capabilities. GPU clusters autoscale based on workload demand, with small persistent head nodes (costing approximately $8/day) and dynamic worker node provisioning.

The EFA integration enables scaling distributed training to much larger node counts by increasing inter-node communication bandwidth from approximately 10 Gbps to 300 Gbps, eliminating the communication bottleneck that previously caused performance degradation when adding nodes beyond a certain threshold.

GPU utilization improved significantly through the combination of team quotas and priority-based background jobs. Before implementing this approach, teams experienced both unfairness (one team or a few individuals monopolizing all resources) and underutilization (assigned GPUs sitting idle while other teams had queued jobs). The quota plus background job system maintains fairness while filling unused capacity, increasing overall cluster efficiency.

The platform supports multiple concurrent projects across generative AI, CAD, and 3D domains, serving as Autodesk's backbone for scalable AI research. The web UI provides real-time visibility into cluster activity, active jobs, GPU usage, logs, and metrics, with administrative capabilities to inspect quotas, monitor fair usage, and shut down idle clusters.

Monitoring dashboards track utilization efficiency in terms of GPU memory utilization percentage, GPU compute utilization percentage, and many other metrics both per-team and cluster-wide. The active monitoring system proactively intervenes when jobs exhibit inefficient resource usage, sending targeted recommendations and automatically reclaiming resources from severely inefficient expensive jobs.

## Trade-offs & Lessons

The RayLab team made several key architectural decisions that reflect important trade-offs. Building an abstraction layer on top of Ray rather than using Ray directly added development and maintenance overhead but was essential for adoption by ML researchers who lacked infrastructure expertise. The one-line CLI commands and declarative Python interfaces dramatically lowered the barrier to entry, transforming Ray from an infrastructure tool into a collaboration platform.

The decision to keep head nodes running continuously while autoscaling worker nodes represents a trade-off between cost (approximately $8/day per head node) and responsiveness. This approach avoids the cold-start problem where researchers would wait for complete cluster provisioning, though it does sacrifice some cost optimization. One audience member noted their organization shuts down head nodes completely and loses dashboard persistence as a result, highlighting different choices in this trade-off space.

The priority-based scheduling system with team quotas and background jobs elegantly solved the tension between fairness and utilization. The initial unrestricted sharing led to resource monopolization, while strict quotas caused underutilization with idle GPUs. The background job mechanism with automatic preemption and checkpoint-based resumption achieved both goals, though it required additional infrastructure complexity around checkpoint management and automatic retry logic.

Integrating EFA for high-speed inter-node communication was crucial for scaling beyond initial bottlenecks, but the team made the important decision to abstract away the complex driver compatibility and configuration requirements. This abstraction principle—taking powerful but complex capabilities and making them accessible through simple flags—runs throughout the platform design.

The team chose to build around Ray's existing observability rather than replacing it, leveraging the standard Ray dashboard while adding Prometheus, Grafana, and custom dashboards for team-specific metrics and quotas. They also integrated external experiment tracking (Comet, TensorBoard) for log persistence beyond the cluster lifecycle. This composable approach avoided reinventing working solutions while filling gaps in the user experience.

Using JupyterHub with VS Code Server in the browser rather than allowing SSH access or local development represents a security-focused trade-off. While this prevents use of newer AI-assisted IDEs like Cursor (which lack web-based versions), it maintains isolation and compliance with internal security requirements. The team pragmatically supports Copilot through VS Code Server as a middle ground.

A key lesson is that visibility and active intervention dramatically improved resource efficiency. Passive dashboards help, but active monitoring that sends direct messages with optimization tips and automatically reclaims resources from inefficient jobs proved much more effective at maintaining high utilization. This required building custom monitoring logic but delivered measurable improvements.

The platform evolution reflects a "distributed training should feel like local training" philosophy. By preserving familiar interfaces (PyTorch Lightning) while transparently adding distributed capabilities, the team minimized code rewrites and reduced the learning curve. Researchers define models and datasets the same way but gain access to massive scale through configuration rather than code changes.

The team emphasized that RayLab doesn't create functionality Ray lacks—it takes full advantage of Ray's capabilities while abstracting complexity and adding organization-specific requirements around security, multi-tenancy, quotas, and automated resource management. This wrapper pattern proves valuable when adopting powerful but complex open-source infrastructure, especially in regulated enterprise environments.

The platform's success enabled Autodesk Research to move from isolated GPU jobs to a unified production-grade research platform scaling across teams and regions. The team continues to evolve RayLab with ongoing work on multi-tenant fairness and autoscaling improvements, and they actively hire to expand the platform engineering team supporting this critical infrastructure.
