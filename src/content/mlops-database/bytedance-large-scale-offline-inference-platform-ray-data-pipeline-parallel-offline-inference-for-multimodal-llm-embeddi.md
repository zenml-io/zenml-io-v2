---
title: "Ray Data pipeline-parallel offline inference for multimodal LLM embeddings at 200 TB with multi-GPU sharded model"
slug: "bytedance-large-scale-offline-inference-platform-ray-data-pipeline-parallel-offline-inference-for-multimodal-llm-embeddi"
draft: false
mlopsTags:
  - "compute-management"
  - "pipeline-orchestration"
  - "kubernetes"
  - "ray"
  - "spark"
  - "deployment"
  - "serving"
industryTags: "media-entertainment"
company: "ByteDance"
companySlug: "bytedance"
platformName: "large-scale offline inference platform"
contentType: "blog"
summary: "ByteDance faced the challenge of running offline batch inference on multi-modal large language models exceeding 10 billion parameters across approximately 200 TB of image and text data. The company needed to generate embeddings using a twin-tower Vision Transformer and Albert architecture that was too large to fit on a single GPU. They built a scalable inference system using Ray Data as their computing framework, implementing pipeline parallelism to shard the model across 3 GPUs and leveraging Ray's streaming execution paradigm, heterogeneous resource scheduling, and in-memory data transfer capabilities. This approach proved significantly more efficient than Spark for large-scale model parallel inference, enabling dynamic elastic scaling of each pipeline stage and simultaneous CPU pre-processing with GPU inference while avoiding out-of-memory issues."
link: "https://www.anyscale.com/blog/how-bytedance-scales-offline-inference-with-multi-modal-llms-to-200TB-data"
year: 2023
seo:
  title: "ByteDance: Ray Data pipeline-parallel offline inference for multimodal LLM embeddings at 200 TB with multi-GPU sharded model - ZenML MLOps Database"
  description: "ByteDance faced the challenge of running offline batch inference on multi-modal large language models exceeding 10 billion parameters across approximately 200 TB of image and text data. The company needed to generate embeddings using a twin-tower Vision Transformer and Albert architecture that was too large to fit on a single GPU. They built a scalable inference system using Ray Data as their computing framework, implementing pipeline parallelism to shard the model across 3 GPUs and leveraging Ray's streaming execution paradigm, heterogeneous resource scheduling, and in-memory data transfer capabilities. This approach proved significantly more efficient than Spark for large-scale model parallel inference, enabling dynamic elastic scaling of each pipeline stage and simultaneous CPU pre-processing with GPU inference while avoiding out-of-memory issues."
  canonical: "https://www.zenml.io/mlops-database/bytedance-large-scale-offline-inference-platform-ray-data-pipeline-parallel-offline-inference-for-multimodal-llm-embeddi"
  ogTitle: "ByteDance: Ray Data pipeline-parallel offline inference for multimodal LLM embeddings at 200 TB with multi-GPU sharded model - ZenML MLOps Database"
  ogDescription: "ByteDance faced the challenge of running offline batch inference on multi-modal large language models exceeding 10 billion parameters across approximately 200 TB of image and text data. The company needed to generate embeddings using a twin-tower Vision Transformer and Albert architecture that was too large to fit on a single GPU. They built a scalable inference system using Ray Data as their computing framework, implementing pipeline parallelism to shard the model across 3 GPUs and leveraging Ray's streaming execution paradigm, heterogeneous resource scheduling, and in-memory data transfer capabilities. This approach proved significantly more efficient than Spark for large-scale model parallel inference, enabling dynamic elastic scaling of each pipeline stage and simultaneous CPU pre-processing with GPU inference while avoiding out-of-memory issues."
mlops:
  source: "sqlite"
  entryId: 193
  sourceUrl: "https://www.anyscale.com/blog/how-bytedance-scales-offline-inference-with-multi-modal-llms-to-200TB-data"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.617544"
  lastUpdated: "2026-04-14T19:55:58.043207"
---

## Problem Context

ByteDance operates at massive scale for their multi-modal AI applications powering features like text-based image retrieval and object detection across their platforms including TikTok. The company faces a critical challenge with offline batch inference for embedding generation, which serves as a foundational step for these applications. Their workload is characterized by extreme scale on two dimensions: they need to process approximately 200 TB of data containing both images and text in each inference run, and their multi-modal model exceeds 10 billion parameters, far exceeding the memory capacity of a single GPU device.

The company's inference workload involves passing large datasets through many replicas of their multi-modal model to generate embeddings of both images and text within the same vector space. This embedding generation must happen offline in batch mode, making it distinct from online serving scenarios. The technical challenges are compounded by the need for model sharding due to the model's size, the requirement for heterogeneous resource scheduling across CPUs and GPUs, and the necessity of efficient data I/O and transfer to avoid bottlenecks.

Traditional computing frameworks like Apache Spark and Flink proved inadequate for this use case. These frameworks are typically bound to relatively fixed batch or stream computing paradigms and lack the necessary flexibility at the scheduling level to easily shard large models and maximize throughput for hybrid CPU+GPU batch inference workloads. The inability to dynamically scale different stages of the pipeline independently, combined with inefficient data serialization overhead when moving intermediate results between stages, made these frameworks unsuitable for ByteDance's requirements.

## Architecture & Design

ByteDance's solution centers on a multi-stage pipeline architecture built on Ray Data. The overall system consists of three primary stages that process image and text tokens, with each stage having different computational resource requirements.

The model architecture employs a twin-tower design combining Albert for text processing and Vision Transformer for image processing. Since the joint model is too large to fit on a single GPU, the company implements pipeline parallelism by splitting the model layer-wise across 3 GPU devices. One portion of the GPU resources accommodates Albert's layers, while another portion contains Vision Transformer's layers. This sharding strategy allows the model to be distributed so that different layer groups reside on different GPUs, with the distribution not necessarily being even since layer sizes vary—some larger layers may occupy a single GPU while several smaller layers reside together on another.

The inference pipeline follows a clear data flow pattern. Individual batches from the large 200 TB dataset are processed in parallel through the trained model to generate embeddings. Data streams from the datasource through multiple stages, with intermediate results buffered in queues within the Ray object store. This in-memory buffering is crucial for avoiding serialization and deserialization overhead that would occur with disk-based intermediate storage.

Ray Data's streaming execution paradigm enables multiple stages of the pipeline to run concurrently, allowing CPU pre-processing to happen simultaneously with GPU inference. This concurrent execution significantly enhances overall throughput while preventing out-of-memory issues when working with such large datasets. Each stage in the pipeline can elastically scale independently based on observed computing efficiency during runtime, meaning more GPU resources can be dynamically allocated to slower stages to maximize overall job throughput.

The deployment architecture leverages Kubernetes through KubeRay, which manages the entire lifecycle of Ray clusters including creation and termination. Within ByteDance's internal platform, users can submit jobs or engage in interactive programming using Notebooks, with the platform operating through YAML configurations and RESTful APIs provided by KubeRay. The system supports auto-scaling and horizontal scaling, with KubeRay provisioning additional pods or removing idle ones based on Ray cluster internal load metrics.

## Technical Implementation

The implementation is built entirely on Ray as the computing framework, specifically utilizing Ray Data for its data processing capabilities. Ray Data was chosen for its native support of heterogeneous resource scheduling, streaming execution paradigm, and ability to handle unstructured data sources.

The inference application is expressed as a single Python script that defines three model classes, one for each model shard. The pipeline construction uses Ray Data's functional API to stitch together the stages: reading data from the datasource, inference through model shard 1, inference through model shard 2, inference through model shard 3, and writing prediction results. Each model class implements an `__init__` method to load its respective layers and a `__call__` method to execute forward passes on batches.

The code structure uses Ray Data's `map_batches` operator to apply each model shard to the data stream. The first stage is configured with `compute="actors"` and `num_cpus=1` for CPU-based pre-processing, while subsequent stages use `num_gpus=1` to allocate GPU resources for model inference. This heterogeneous resource allocation ensures that expensive GPU resources are reserved for inference while CPUs handle data preparation.

Ray's actor model is fundamental to the execution. Actors are long-lived stateful processes that can load model parameters once and reuse them across multiple batches, unlike Spark executors that would need to reload model parameters repeatedly. The Ray shared memory object store enables zero-copy data transfer between actors, eliminating serialization overhead when passing intermediate results between pipeline stages.

For deployment, the system uses KubeRay, an operator that manages Ray clusters on Kubernetes. Ray clusters consist of a head node and worker nodes represented as Kubernetes pods. KubeRay handles cluster lifecycle management and provides auto-scaling capabilities based on load metrics. ByteDance's internal platform wraps KubeRay's functionality, exposing it to users through a user-friendly interface for job submission and interactive development.

The model sharding strategy employs pipeline parallelism as the primary technique. This involves splitting the model by layer and distributing layer groups across multiple GPUs. ByteDance also considered tensor parallelism, which splits weights from the same layer across different GPUs, but ultimately chose pipeline parallelism for their architecture. The choice enables each GPU to store a complete subset of layers, simplifying the data flow pattern where batches sequentially pass through each GPU.

## Scale & Performance

The scale metrics for ByteDance's offline inference system are substantial. Each inference run processes approximately 200 TB of data, which includes both image and text modalities. The multi-modal model itself exceeds 10 billion parameters and is sharded across 3 GPU devices due to memory constraints.

The performance advantages of Ray over Spark become increasingly pronounced as job scale expands. In a simple comparison scenario with two GPUs processing three data samples where the model is divided into two shards, the architectural differences are stark. With Spark, the execution follows a bulk-synchronous parallel pattern where two executors must be initiated to load the first model shard parameters, process all three samples, write processed data to external storage, then initiate another two executors to load the second model shard parameters and repeat the process. This approach involves redundant model loading and significant serialization overhead.

In contrast, Ray initiates just two actors that each load their respective model shard parameters once and maintain them in memory. These actors execute in a pipelined fashion where data samples stream through sequentially, with an additional CPU-based actor handling data reading and storage. The Ray shared memory object store stores intermediate results, circumventing serialization overhead and significantly enhancing execution efficiency.

The streaming execution paradigm provides substantial benefits for GPU utilization. By enabling concurrent execution of CPU pre-processing and GPU inference, the system minimizes GPU idle time. Data can be continuously fed to GPU stages while previous results are being post-processed or written to storage, maximizing hardware utilization across the cluster.

ByteDance's platform operates at production scale, supporting multiple users who submit jobs or work interactively through notebooks. The KubeRay-based infrastructure provides elastic scaling, dynamically provisioning or deprovisioning pods based on workload demands. This elasticity is particularly valuable for batch inference workloads that may have varying resource requirements across different pipeline stages.

The system's ability to handle heterogeneous resources means that each of the three inference stages can be independently scaled based on computational requirements and observed throughput. If the Vision Transformer layers prove to be a bottleneck, additional GPU resources can be allocated specifically to that stage without over-provisioning resources for faster stages. This fine-grained resource allocation contributes to cost efficiency by ensuring GPU resources are utilized optimally.

## Trade-offs & Lessons

ByteDance's implementation reveals several important insights about building large-scale batch inference systems for multi-modal LLMs. The choice of Ray over more established frameworks like Spark represented a significant architectural decision with clear trade-offs.

The primary advantage of Ray lies in its flexibility for heterogeneous scheduling and streaming execution. Unlike Spark's rigid stage-based execution model, Ray allows for fluid pipelining where different stages run concurrently with independent scaling. This proves essential for model parallel inference where different shards may have vastly different computational profiles. The ability to dynamically adjust parallelism at runtime means that even suboptimal initial sharding strategies can achieve good performance, reducing the engineering effort required for capacity planning.

The streaming execution paradigm addresses a critical limitation of traditional batch frameworks. For datasets at the 200 TB scale, materializing intermediate results between stages would be prohibitively expensive in both time and storage costs. Ray's in-memory streaming through the shared object store eliminates these overheads while preventing out-of-memory issues that could occur with naive buffering approaches.

Model sharding itself presents several benefits beyond simply enabling large model inference. By using GPUs with relatively smaller memory capacities for inference, ByteDance can reserve higher-end GPUs for training workloads that typically require more resources. This resource specialization contributes to cost optimization. Additionally, sharding enables spatial multiplexing techniques like NVIDIA's Multi-Process Service, which partitions GPU memory across processes based on spatial allocation. Without sharding, a single process might greedily occupy all GPU memory, leading to poor utilization.

The pipeline parallelism approach, while effective for ByteDance's architecture, does have inherent trade-offs compared to tensor parallelism. Pipeline parallelism can introduce bubble time where GPUs wait for data to flow through previous stages, particularly with uneven layer distributions. However, for offline batch inference with large datasets, the continuous stream of data helps minimize these bubbles. Tensor parallelism, which would split individual layer weights across GPUs, requires more communication between GPUs for synchronization and is generally more complex to implement.

The KubeRay deployment strategy provides operational benefits but adds infrastructure complexity. Managing Ray clusters through Kubernetes operators requires expertise in both systems. However, this complexity pays dividends in terms of resource management, auto-scaling capabilities, and integration with ByteDance's existing platform infrastructure. The ability to expose Ray functionality through a user-friendly platform interface with notebooks and job submission APIs makes the underlying complexity manageable for end users.

An important lesson is that the challenges of large-scale batch inference differ significantly from online serving scenarios. While online serving prioritizes latency and requires careful attention to cold start times and request batching, offline inference can leverage longer-running actors and continuous data streams to amortize startup costs. The actor model in Ray, where processes are long-lived and stateful, proves particularly well-suited for this use case.

The success of this system highlights that choosing the right computing framework is crucial for ML infrastructure. While Spark remains dominant for traditional data processing, its design assumptions don't translate well to heterogeneous CPU+GPU workloads with complex data dependencies. Ray's more flexible scheduling primitives and streaming-first design better match the requirements of modern ML inference pipelines.

ByteDance's experience suggests that organizations operating at similar scales should carefully evaluate whether traditional big data frameworks meet their ML workload requirements. The investment in adopting Ray and building platform tooling around it delivered significant efficiency gains that justify the migration effort. The company continues to strengthen cooperation with the Ray open source community, indicating ongoing commitment to this technology choice.

Looking forward, ByteDance plans to continue optimizing their platform and exploring additional application scenarios on Ray. The fundamental architecture they've built—streaming pipeline execution with heterogeneous resource scheduling and in-memory data transfer—provides a solid foundation for diverse ML workloads beyond just multi-modal embedding generation. The system's ability to handle 200 TB scale jobs demonstrates the viability of Ray Data for production-scale ML infrastructure.
