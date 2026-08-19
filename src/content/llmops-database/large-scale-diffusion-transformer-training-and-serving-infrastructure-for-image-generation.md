---
title: "Large-Scale Diffusion Transformer Training and Serving Infrastructure for Image Generation"
slug: "large-scale-diffusion-transformer-training-and-serving-infrastructure-for-image-generation"
draft: false
llmopsTags:
  - "multi-modality"
  - "realtime-application"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "kubernetes"
  - "monitoring"
  - "scaling"
  - "orchestration"
  - "open-source"
  - "pytorch"
  - "meta"
  - "nvidia"
  - "hugging-face"
industryTags: "media-entertainment"
company: "Krea"
summary: "Krea developed and deployed K2, an open-source diffusion transformer model trained from scratch for creative image generation. The company faced significant infrastructure challenges in training the model on thousands of GPUs, including frequent crashes, silent failures, and network communication issues. They implemented a comprehensive monitoring system tracking GPU temperature, tensor core utilization, InfiniBand, and NVLink metrics, combined with aggressive checkpointing strategies. For serving, they built an innovative Kubernetes-based system using virtual kubelet and gang scheduling that dynamically allocates GPU resources between training and inference workloads, automatically migrating production traffic to external providers when researchers need the full cluster, enabling efficient utilization of their GPU infrastructure without service disruption."
link: "https://www.youtube.com/watch?v=byn9PURoBNY"
year: 2026
seo:
  title: "Krea: Large-Scale Diffusion Transformer Training and Serving Infrastructure for Image Generation - ZenML LLMOps Database"
  description: "Krea developed and deployed K2, an open-source diffusion transformer model trained from scratch for creative image generation. The company faced significant infrastructure challenges in training the model on thousands of GPUs, including frequent crashes, silent failures, and network communication issues. They implemented a comprehensive monitoring system tracking GPU temperature, tensor core utilization, InfiniBand, and NVLink metrics, combined with aggressive checkpointing strategies. For serving, they built an innovative Kubernetes-based system using virtual kubelet and gang scheduling that dynamically allocates GPU resources between training and inference workloads, automatically migrating production traffic to external providers when researchers need the full cluster, enabling efficient utilization of their GPU infrastructure without service disruption."
  canonical: "https://www.zenml.io/llmops-database/large-scale-diffusion-transformer-training-and-serving-infrastructure-for-image-generation"
  ogTitle: "Krea: Large-Scale Diffusion Transformer Training and Serving Infrastructure for Image Generation - ZenML LLMOps Database"
  ogDescription: "Krea developed and deployed K2, an open-source diffusion transformer model trained from scratch for creative image generation. The company faced significant infrastructure challenges in training the model on thousands of GPUs, including frequent crashes, silent failures, and network communication issues. They implemented a comprehensive monitoring system tracking GPU temperature, tensor core utilization, InfiniBand, and NVLink metrics, combined with aggressive checkpointing strategies. For serving, they built an innovative Kubernetes-based system using virtual kubelet and gang scheduling that dynamically allocates GPU resources between training and inference workloads, automatically migrating production traffic to external providers when researchers need the full cluster, enabling efficient utilization of their GPU infrastructure without service disruption."
notion:
  pageId: "3c1f8dff-2538-809c-b5ef-c1dafc64e374"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T08:50:00.000Z"
  lastEditedTime: "2026-08-19T08:50:00.000Z"
  publishedAt: "2026-08-19T09:19:50Z"
---

## Overview and Context

Krea developed K2, a diffusion transformer model for image generation that was trained entirely from scratch without using any base checkpoint. The model was designed to give creative professionals tools for generating out-of-distribution, highly stylized images spanning various artistic styles from pixel art to photorealistic rendering. Krea released two versions of the model: a raw pre-trained checkpoint for custom post-training and fine-tuning, and a turbo version optimized for fast inference that can generate images in under a second. Both checkpoints were made open source and available on Hugging Face and GitHub, while also being served in production at krea.ai. This case study focuses heavily on the infrastructure challenges of training a large diffusion model at scale and the innovative serving architecture that enables efficient GPU utilization across both research and production workloads.

## Training Infrastructure and Challenges

The training infrastructure for K2 centered on a large cluster of thousands of GPUs connected via InfiniBand networking. The team approached the training process iteratively, beginning with small ablation studies on limited GPU resources to test hypotheses before scaling up. Krea's research team specifically aimed to bridge the gap between LLM research and diffusion transformers, porting architectural innovations from language models to image generation. The resulting architecture was intentionally kept simple and straightforward, which they described as being very effective despite its simplicity.

One of the most significant challenges encountered during training was the increasing failure rate as training scaled to larger numbers of GPUs. While small experiments on a handful of GPUs would run for days without major issues, scaling to 128, 256, 512, or more GPUs dramatically increased the surface area for failures. These failures often manifested in subtle ways, including NIC timeouts and silent crashes where metrics appeared normal but training would fail. The team initially responded by swapping nodes and changing configurations, but eventually learned that sometimes allowing the system to crash and restart was more effective. Training runs would often crash after an hour, restart, crash again, and then mysteriously run stable for 12-24 hours on the same hardware with identical code and data.

The instability issues were severe enough that large-scale pre-training runs typically lasted less than 8 hours before encountering failures, which created significant challenges for maintaining training progress and keeping GPUs productively utilized. This unreliability made comprehensive monitoring absolutely critical to the success of the project.

## Comprehensive Monitoring Strategy

Krea invested heavily in metrics and observability, which proved essential for supporting researchers and maintaining visibility into the training system. The team emphasized that attempting large-scale pre-training without robust metrics would be extremely difficult and potentially maddening.

GPU temperature monitoring was one of the most important metrics despite its apparent simplicity. GPUs that run even slightly warmer than their peers will throttle performance, leading to training instability and unpredictable issues. The team established a strict policy of immediately removing any GPU exceeding 78 degrees Celsius without attempting fixes or troubleshooting, simply requesting replacement from their provider. This aggressive approach to thermal management saved significant debugging time.

The team discovered that standard GPU utilization metrics from NVIDIA tools are misleading and essentially unreliable for understanding actual GPU efficiency. GPU utilization reports whether the GPU is doing work, but not whether that work is efficient or making full use of the hardware capabilities. During K2's pre-training, GPUs would report 100% utilization even though they were not fully utilizing the compute resources. The more accurate metric proved to be tensor core utilization, which specifically measures how effectively the tensor cores are being used. Tensor core utilization varied across different training phases, notably increasing as image resolution scaled from 128 to 256 to 512 to 1024 pixels, since higher resolutions created more computational work per image.

Network metrics proved absolutely critical given that most failures were related to cross-node communication. By default, NVIDIA's DCGM metrics do not export comprehensive InfiniBand statistics, though some NVLink information is available. Krea built custom exporters to collect detailed InfiniBand metrics including throughput, message wait times, error counts by type, and packet statistics. The speaker strongly emphasized that attempting large-scale multi-node training without InfiniBand metrics represents a fundamental mistake. Similarly, NVLink metrics beyond what NVIDIA exports by default, particularly NVLink error counts, proved valuable for identifying problematic nodes where GPUs appeared healthy but communication between them was degraded.

## Checkpointing Strategy

Given the frequent crashes and unstable training runs, aggressive checkpointing became a critical survival strategy. The team initially attempted to use CephFS for checkpoint storage but found it unreliable, experiencing data loss that destroyed trust in the system. They ultimately recommended investing in paid storage solutions that provide guarantees around data integrity and performance metrics.

Their production storage system delivered impressive performance with 1.8 terabytes per second read throughput and nearly one terabyte per second write throughput. This high-performance storage enabled checkpointing every 20-30 minutes, with each checkpoint producing approximately one terabyte of data that could be written in under 30 seconds. This rapid checkpointing imposed minimal overhead on training while providing frequent recovery points, allowing the team to recover quickly from failures and minimize lost progress.

## Serving Infrastructure and Dynamic Resource Allocation

Beyond training, Krea developed a sophisticated serving infrastructure that addresses a common challenge in organizations with limited GPU resources: efficiently sharing hardware between research/training workloads and production inference. Their solution represents an innovative approach to dynamic resource allocation that maximizes GPU utilization while maintaining production availability.

The system is built on Kubernetes with Kueue, an open-source gang scheduling system. Gang scheduling is essential for distributed training workloads because it ensures that all pods in a training job are scheduled together, preventing situations where part of a training job is scheduled while other parts wait indefinitely for resources. Kueue provides a two-tier priority system: workload priority determines which training jobs are more important and should skip ahead in the queue, while standard Kubernetes pod priority handles scheduling within each workload. Training pods are always assigned high priority, meaning when they are submitted they immediately schedule, preempting inference workloads if necessary.

The team noted that Kueue has some limitations, particularly around manual queue configuration where administrators must specify resource quantities for each queue. In dynamic clusters where nodes frequently enter and exit maintenance or disappear temporarily, these manually specified resource limits can become outdated and break gang scheduling. However, they suggested that Kubernetes 1.15 includes native gang scheduling capabilities that might address some of these issues.

The core innovation in Krea's infrastructure is the use of virtual kubelet to create a self-healing, self-balancing system for workload placement. Virtual kubelet is an open-source project that allows creation of "fake" nodes in Kubernetes that appear to the scheduler as normal nodes but are actually backed by external compute providers. When Kubernetes schedules a pod to a virtual kubelet node, custom code intercepts the pod specification and can deploy it to any provider including cloud GPU services or rental providers.

Krea built a provider interface and selection algorithm on top of virtual kubelet, allowing them to integrate multiple external GPU providers with negotiated pricing while abstracting away provider-specific details. When pods are scheduled to the virtual node, the system translates them into provider-specific formats, deploys them externally, and maintains a reconciliation loop between the Kubernetes state and the external provider state.

This architecture elegantly leverages Kubernetes' native horizontal pod autoscaler for resilience. When external pods fail, the system simply marks them as failed in Kubernetes and allows the HPA to detect the failure and create replacements. This approach avoids complex failure recovery logic by delegating orchestration concerns to Kubernetes' built-in mechanisms.

The dynamic resource allocation system uses Kubernetes taints and tolerations to automatically migrate workloads between the in-cluster GPUs and external providers based on availability. When the cluster has available GPUs, a monitoring system removes taints from the virtual node, allowing inference pods to schedule on in-cluster hardware and reducing costs. When researchers launch large training jobs that will consume all cluster GPUs, the training pods preempt inference workloads due to their higher priority. The system detects the lack of available cluster GPUs and applies taints to the virtual node, preventing new inference pods from scheduling in-cluster. These pods are then scheduled to the virtual node and deployed on external providers.

The migration is designed to be seamless and gradual. When training completes and cluster GPUs become available again, the system adds the taint back to the virtual node. Rather than using Kubernetes' "no execute" taint which would immediately evict all pods, they use a descheduler that gradually migrates pods back to the cluster, preventing production traffic from experiencing simultaneous disruption. The descheduler identifies pods that no longer tolerate the current taints and slowly moves them back to in-cluster GPUs, allowing the system to stop incurring external provider costs without production downtime.

The entire system operates autonomously without manual intervention. Researchers can launch training jobs without thinking about GPU availability or resource allocation. The system automatically determines whether to use in-cluster GPUs or external providers, handles failures through Kubernetes' standard mechanisms, and migrates production traffic as needed. This self-healing architecture maximizes GPU utilization for valuable training workloads while maintaining production service levels.

## Inference Workload Characteristics

An interesting observation from production inference is that diffusion transformers for image generation are far more tolerant of hardware issues than large language models. Unlike LLMs which often require multi-node inference with tight synchronization, diffusion models typically run on single GPUs. The team discovered that inference workloads will successfully run on GPUs with various hardware problems including high temperatures, PCI bus issues, or other degradation that would be unacceptable for training. This resilience allows them to repurpose GPUs that are unsuitable for stable training for inference workloads, further optimizing resource utilization.

## Operational Outcomes and Lessons

The infrastructure that Krea built enabled them to successfully train K2 from scratch and deploy it to production while maintaining efficient GPU utilization across their cluster. Key lessons include the critical importance of comprehensive monitoring beyond standard metrics, the value of aggressive checkpointing with high-performance storage, and the benefits of designing self-healing systems that leverage existing orchestration primitives rather than implementing custom recovery logic.

The dynamic workload placement system represents a particularly elegant solution to the common problem of balancing research and production needs on shared infrastructure. By treating training as the primary use case for expensive GPU hardware while maintaining production availability through automatic traffic migration, Krea avoided both the cost of maintaining separate dedicated clusters and the inefficiency of statically partitioned resources.

The team's willingness to share hard-won operational knowledge, including the counterintuitive insight that sometimes allowing unstable systems to crash and restart is more effective than aggressive troubleshooting, provides valuable guidance for other organizations scaling deep learning infrastructure. Their emphasis on metrics, automated recovery, and letting orchestration systems handle complexity aligns with modern cloud-native operational practices adapted for the specific challenges of GPU-accelerated deep learning workloads.
