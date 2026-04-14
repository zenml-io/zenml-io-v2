---
title: "Making ML easier at CERN with Kubeflow"
slug: "cern-cerns-ml-platform-making-ml-easier-at-cern-with-kubeflow"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "model-serving"
  - "notebooks"
  - "pipeline-orchestration"
  - "docker"
  - "kserve"
  - "kubeflow"
  - "kubernetes"
  - "tf-serving"
  - "deployment"
  - "hyperparameter-tuning"
  - "serving"
  - "training"
industryTags: "research-academia"
company: "CERN"
companySlug: "cern"
platformName: "CERN's ML platform"
contentType: "slides"
summary: "CERN established a centralized machine learning service built on Kubeflow and Kubernetes to address the fragmented ML workloads across different research groups at the organization. The platform provides a unified web interface for the complete ML lifecycle, offering pooled compute resources including CPUs, GPUs, and memory to CERN users while integrating with existing identity management and storage systems like EOS. The implementation includes Jupyter notebooks for experimentation, ML pipelines for workflow orchestration, Katib for hyperparameter optimization, distributed training capabilities using TFJob for TensorFlow workloads, KFServing for model deployment with serverless architecture and automatic scaling, and persistent storage options including S3-compatible object storage. As of December 2020, the platform was running at ml.cern.ch in testing phase with plans for a stable production release."
link: "https://indico.cern.ch/event/924283/contributions/4105328/attachments/2153724/3632143/2020-12-01-Kubeflow-FastML.pdf"
year: 2020
seo:
  title: "CERN: Making ML easier at CERN with Kubeflow - ZenML MLOps Database"
  description: "CERN established a centralized machine learning service built on Kubeflow and Kubernetes to address the fragmented ML workloads across different research groups at the organization. The platform provides a unified web interface for the complete ML lifecycle, offering pooled compute resources including CPUs, GPUs, and memory to CERN users while integrating with existing identity management and storage systems like EOS. The implementation includes Jupyter notebooks for experimentation, ML pipelines for workflow orchestration, Katib for hyperparameter optimization, distributed training capabilities using TFJob for TensorFlow workloads, KFServing for model deployment with serverless architecture and automatic scaling, and persistent storage options including S3-compatible object storage. As of December 2020, the platform was running at ml.cern.ch in testing phase with plans for a stable production release."
  canonical: "https://www.zenml.io/mlops-database/cern-cerns-ml-platform-making-ml-easier-at-cern-with-kubeflow"
  ogTitle: "CERN: Making ML easier at CERN with Kubeflow - ZenML MLOps Database"
  ogDescription: "CERN established a centralized machine learning service built on Kubeflow and Kubernetes to address the fragmented ML workloads across different research groups at the organization. The platform provides a unified web interface for the complete ML lifecycle, offering pooled compute resources including CPUs, GPUs, and memory to CERN users while integrating with existing identity management and storage systems like EOS. The implementation includes Jupyter notebooks for experimentation, ML pipelines for workflow orchestration, Katib for hyperparameter optimization, distributed training capabilities using TFJob for TensorFlow workloads, KFServing for model deployment with serverless architecture and automatic scaling, and persistent storage options including S3-compatible object storage. As of December 2020, the platform was running at ml.cern.ch in testing phase with plans for a stable production release."
mlops:
  source: "sqlite"
  entryId: 119
  sourceUrl: "https://indico.cern.ch/event/924283/contributions/4105328/attachments/2153724/3632143/2020-12-01-Kubeflow-FastML.pdf"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061597"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

CERN faced a common organizational challenge with machine learning infrastructure: different research groups and teams were running ML workloads independently without a unified platform or shared resources. This fragmentation led to several pain points that motivated the development of a centralized solution. Teams were likely duplicating efforts in setting up ML environments, managing infrastructure, and configuring access to compute resources. Without a standardized platform, researchers had inconsistent access to specialized hardware like GPUs, making it difficult to efficiently utilize expensive compute resources across the organization.

The motivation was to create a centralized machine learning service that could offer variety in hardware resources to all CERN users through an easy-to-use web interface. A critical requirement was integration with CERN's existing identity management and storage services, ensuring the new platform would fit seamlessly into the organization's established infrastructure rather than creating another isolated system. The goal was to democratize access to ML tools and resources while maintaining security and governance appropriate for a large research organization.

## Architecture & Design

The platform architecture is built on a foundation of Kubernetes with Kubeflow as the primary ML toolkit layer. This design follows a pooled resource model where compute capabilities (GPUs, CPUs, and memory) are aggregated into a centralized cluster that multiple users can access simultaneously. Kubernetes serves as the orchestration layer, managing infrastructure and distributing workloads across available compute nodes, while Kubeflow provides the ML-specific abstractions and user interfaces.

The architectural approach packages all machine learning workloads as Kubernetes resources, allowing them to be scheduled, scaled, and managed using Kubernetes' native capabilities. This containerized approach ensures portability and consistency across different environments. The system exposes a web UI that serves as the primary interaction point for users to access components and features, abstracting away much of the underlying Kubernetes complexity.

The platform is organized around several key component areas that cover different stages of the ML lifecycle. At the experimentation layer, Jupyter Notebooks provide an entry point for users to start working with the platform. These notebooks are deployed as Kubernetes pods with configurable resource allocations and integrate with other Kubeflow components. For workflow orchestration, the platform implements ML Pipelines, which are described as graphs representing complete ML workflows with all their constituent components and dependencies.

For model optimization, Katib provides automated hyperparameter tuning capabilities. The training infrastructure supports distributed workloads through TFJob, a Kubernetes custom resource that enables TensorFlow training jobs to span multiple GPUs across different cluster nodes. Model serving is handled through a serverless architecture where models are deployed as Kubernetes pods with API endpoints, supporting automatic scaling based on request volume.

Storage architecture integrates multiple backend systems. Users have access to their personal EOS folders (CERN's disk storage system), S3-compatible object storage through both an in-cluster Minio service and CERN's centralized s3.cern.ch service, and the ability to mount remote Git repositories from GitHub and GitLab.

## Technical Implementation

The core technology stack centers on Kubernetes as the container orchestration platform with Kubeflow version presumably around 1.0-1.2 based on the 2020 timeframe and feature set described. The platform runs at ml.cern.ch, providing a centralized endpoint for all users.

For interactive development, the system uses Jupyter Notebooks with pre-built container images that users can select when creating notebook servers. Users configure resource allocations at server creation time, specifying CPU, memory, and GPU requirements. The notebook servers support multiple notebooks within a single server instance, allowing users to organize related work.

ML Pipelines are implemented using the Kubeflow Pipelines SDK, which enables users to define workflows programmatically in Python. The pipeline system includes three main components: a user interface for managing experiments, jobs, and runs; an execution engine for scheduling and running multi-step workflows; and the SDK for authoring pipeline definitions. Pipelines are represented as directed acyclic graphs (DAGs) where each node represents a component and edges represent data flow and dependencies.

For hyperparameter optimization, Katib automates the process of finding optimal non-trainable parameters. While manual implementation or pipeline-based approaches are possible, Katib provides a declarative interface for defining search spaces and optimization algorithms, reducing the engineering effort required for these experiments.

Distributed training capabilities are built on TFJob, a Kubernetes Custom Resource Definition (CRD) specifically designed for TensorFlow workloads. TFJob extends Kubernetes' native capabilities to understand TensorFlow's distributed training protocols, automatically configuring parameter servers and worker nodes. This allows training jobs to scale beyond a single node's GPU capacity to utilize multiple GPUs distributed across the cluster. The system combines TFJob's orchestration capabilities with TensorFlow's built-in distributed training support to enable transparent scaling of model training.

Model serving uses KFServing (now known as KServe), which deploys trained models as containerized services with RESTful API endpoints. The example shows a curl command accessing a model endpoint: `curl -v -H "Host: hostname" "http://host_ip/v1/models/mnist:predict" -d @./input.json`. This demonstrates the standard prediction API pattern where clients send input data as JSON to versioned model endpoints. The serving infrastructure implements serverless patterns with automatic scaling based on incoming request volume, allowing the platform to efficiently handle variable inference loads without manual intervention.

Storage integration leverages existing CERN infrastructure rather than building new systems. EOS integration provides users access to their existing file storage, maintaining continuity with their existing workflows. The S3-compatible storage is implemented through Minio for in-cluster buckets and integrates with CERN's centralized S3 service at s3.cern.ch for organization-wide object storage. Git integration enables version control workflows and the ability to clone repositories directly into the platform environment.

## Scale & Performance

The presentation provides limited quantitative details about scale and performance metrics, which is typical for an early-stage platform overview focused on capabilities rather than benchmarks. The platform was in testing phase as of December 2020, with a stable version planned for release that same month.

The architecture supports pooled resources across multiple compute nodes, each equipped with varying amounts of GPUs, CPUs, and memory. The distributed training capability using TFJob allows training workloads to span multiple GPUs across different nodes, suggesting the cluster has sufficient scale to warrant this distributed approach rather than relying solely on multi-GPU single-node training.

The serverless model serving infrastructure with automatic scaling implies the platform is designed to handle variable load patterns common in research environments, where inference demand may be intermittent or bursty. By automatically scaling model servers based on request volume, the platform can optimize resource utilization without requiring manual intervention.

The use of Kubernetes as the foundation suggests the platform can scale horizontally by adding additional compute nodes to the cluster as demand grows. This is particularly important in a research environment like CERN where ML usage may grow rapidly as more teams adopt the platform.

## Trade-offs & Lessons

The decision to build on Kubeflow and Kubernetes represents a significant architectural choice with clear trade-offs. The primary advantage is leveraging mature, widely-adopted open source tools with strong community support rather than building custom infrastructure from scratch. Kubeflow provides pre-built components for common ML tasks, reducing development time and maintenance burden. The open source nature and wide community support mentioned in the presentation suggest CERN valued the ability to benefit from ongoing community development and avoid vendor lock-in.

However, running Kubeflow on Kubernetes introduces operational complexity. Users must work within the constraints of containerized environments, and the platform team must maintain expertise in both Kubernetes operations and ML-specific concerns. The abstraction layers, while helpful for end users, require sophisticated setup and configuration behind the scenes.

The choice to integrate with existing CERN infrastructure (identity management, EOS storage, centralized S3) rather than using Kubeflow's default options shows pragmatic system design. This integration work likely required significant engineering effort but was essential for adoption in an organization with established systems and security requirements. Users can work with familiar storage locations and authentication mechanisms, reducing friction and maintaining consistency with other CERN services.

The platform's comprehensive scope—covering the entire ML lifecycle from experimentation through serving—represents both a strength and a challenge. Providing all these capabilities in one platform creates a cohesive user experience and reduces the need for users to integrate disparate tools. However, it also increases the complexity of the platform and the breadth of expertise required to operate it effectively. Teams considering similar platforms must decide whether to provide comprehensive functionality or focus on specific pain points.

The emphasis on the web UI as an easy-to-use interface for ML tasks reflects an understanding that adoption depends on user experience, not just technical capabilities. Research scientists at CERN come from diverse backgrounds and may not all be Kubernetes experts. The Jupyter Notebooks serving as the "easiest way to start experimenting" shows thoughtful onboarding design, providing a familiar entry point before users need to learn about pipelines, distributed training, or other advanced features.

The testing phase status at presentation time (December 2020) and planned stable release suggest the team took an iterative approach, running an initial version with limited functionality before rolling out the complete platform. This reduces risk and allows for gathering user feedback before making commitments to particular architectural patterns or component choices.

One notable aspect is the focus on TensorFlow for distributed training through TFJob. While this serves TensorFlow users well, the presentation doesn't address support for other frameworks like PyTorch, scikit-learn, or XGBoost. Organizations building similar platforms must consider their user base's framework preferences and whether to support multiple frameworks or standardize on specific tools.

The serverless model serving with automatic scaling represents sophisticated infrastructure for a research organization. Many academic and research ML platforms focus primarily on training and experimentation, leaving production serving as a separate concern. CERN's inclusion of production-ready serving capabilities suggests they anticipated users wanting to deploy models for ongoing inference, not just experimental work.

For practitioners considering similar platforms, CERN's experience highlights several key lessons. Integration with existing organizational infrastructure is critical for adoption and security compliance. Providing a gradual learning curve from simple (Jupyter notebooks) to advanced (distributed training, pipelines) helps onboard users with varying expertise. Building on established open source tools like Kubeflow reduces development effort but requires accepting the complexity these tools bring. Supporting the complete ML lifecycle in one platform creates a better user experience but demands significant engineering investment across multiple domains.
