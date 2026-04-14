---
title: "Ray-based ML training and GenAI pipelines for large-scale personalization and multimodal dataset construction"
slug: "netflix-ray-platform-from-deep-learning-to-genai-ray-based-ml-training-and-genai-pipelines-for-large-scale-personalizati"
draft: false
mlopsTags:
  - "data-versioning"
  - "experiment-tracking"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "docker"
  - "kubernetes"
  - "ray"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "tech"
company: "Netflix"
companySlug: "netflix"
platformName: "Ray Platform: From Deep Learning to GenAI"
contentType: "video"
summary: "Netflix built a comprehensive ML training platform on Ray to handle massive-scale personalization workloads, spanning recommendation models, multimodal deep learning, and LLM fine-tuning. The platform evolved from serving diverse model architectures (DLRM embeddings, multimodal models, transformers) to accommodating generative AI use cases including LLM fine-tuning and multimodal dataset construction. Key innovations include a centralized job scheduler that routes work across heterogeneous GPU clusters (P4, A100, A10), implements preemption and pause/resume for SLA-based prioritization, and enables resource sharing across teams. For the GenAI era, Netflix leveraged Ray Data for large-scale batch inference to construct multimodal datasets, processing millions of images/videos through cascading model pipelines (captioning with LLaVA, quality scoring, embedding generation with CLIP) while eliminating temporary storage through shared memory architecture. The platform handles daily training cycles for thousands of personalization models while supporting emerging workloads like multimodal foundation models and specialized LLM deployment."
link: "https://www.youtube.com/watch?v=2_a0CpCFt_Q"
year: 2024
seo:
  title: "Netflix: Ray-based ML training and GenAI pipelines for large-scale personalization and multimodal dataset construction - ZenML MLOps Database"
  description: "Netflix built a comprehensive ML training platform on Ray to handle massive-scale personalization workloads, spanning recommendation models, multimodal deep learning, and LLM fine-tuning. The platform evolved from serving diverse model architectures (DLRM embeddings, multimodal models, transformers) to accommodating generative AI use cases including LLM fine-tuning and multimodal dataset construction. Key innovations include a centralized job scheduler that routes work across heterogeneous GPU clusters (P4, A100, A10), implements preemption and pause/resume for SLA-based prioritization, and enables resource sharing across teams. For the GenAI era, Netflix leveraged Ray Data for large-scale batch inference to construct multimodal datasets, processing millions of images/videos through cascading model pipelines (captioning with LLaVA, quality scoring, embedding generation with CLIP) while eliminating temporary storage through shared memory architecture. The platform handles daily training cycles for thousands of personalization models while supporting emerging workloads like multimodal foundation models and specialized LLM deployment."
  canonical: "https://www.zenml.io/mlops-database/netflix-ray-platform-from-deep-learning-to-genai-ray-based-ml-training-and-genai-pipelines-for-large-scale-personalizati"
  ogTitle: "Netflix: Ray-based ML training and GenAI pipelines for large-scale personalization and multimodal dataset construction - ZenML MLOps Database"
  ogDescription: "Netflix built a comprehensive ML training platform on Ray to handle massive-scale personalization workloads, spanning recommendation models, multimodal deep learning, and LLM fine-tuning. The platform evolved from serving diverse model architectures (DLRM embeddings, multimodal models, transformers) to accommodating generative AI use cases including LLM fine-tuning and multimodal dataset construction. Key innovations include a centralized job scheduler that routes work across heterogeneous GPU clusters (P4, A100, A10), implements preemption and pause/resume for SLA-based prioritization, and enables resource sharing across teams. For the GenAI era, Netflix leveraged Ray Data for large-scale batch inference to construct multimodal datasets, processing millions of images/videos through cascading model pipelines (captioning with LLaVA, quality scoring, embedding generation with CLIP) while eliminating temporary storage through shared memory architecture. The platform handles daily training cycles for thousands of personalization models while supporting emerging workloads like multimodal foundation models and specialized LLM deployment."
mlops:
  source: "sqlite"
  entryId: 222
  sourceUrl: "https://www.youtube.com/watch?v=2_a0CpCFt_Q"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.619037"
  lastUpdated: "2026-04-14T19:56:06.240432"
---

## Problem Context

Netflix faces extraordinary ML infrastructure challenges driven by comprehensive personalization across their platform. Nearly every element visible to users is personalized through machine learning—from page construction and row ordering to title selection and artwork display. This personalization strategy generates an explosive volume of model training requirements. Each experimental idea spawns multiple A/B test cells, with a typical experiment running 11 cells simultaneously, each representing a distinct trained model variation. These personalization models require daily retraining on 24-hour cycles to maintain freshness.

The training workload encompasses three fundamentally different model architectures with distinct computational characteristics. Recommendation models follow DLRM architecture with heavy embedding tables, categorical features, and MLPs—these models have short computation times but process massive datasets, creating IO bottlenecks and requiring multi-GPU distributed training for gradient communication. Multimodal models learn representations from diverse data sources (text, images, audio, video) and employ multi-GPU, multi-node training with distributed data parallelism. LLM fine-tuning workloads use fully sharded data parallel (FSDP) training for models of various sizes based on Llama and other open-source foundations, with transformer-based architectures creating compute-intensive workloads.

As Netflix moved into the generative AI era, new challenges emerged around multimodal dataset construction. Processing millions of images, videos, and audio files to create high-quality training datasets requires cascading inference pipelines where multiple models assess quality, generate captions, detect objects, produce embeddings, and filter inappropriate content. The scale demands GPU acceleration, but the traditional request-response serving pattern creates massive temporary data transfers and coordinator overhead. Additionally, managing datasets at petabyte scale with incremental column additions and versioning became unwieldy with conventional formats.

The original cluster architecture presented operational limitations. Netflix deployed separate clusters per team to isolate workloads with similar characteristics, but this prevented idle resource sharing across teams—a critical problem given GPU scarcity. Operational tasks like cluster upgrades required stopping all jobs on a cluster, causing disruption. Collecting visibility metrics and UI data from multiple distributed clusters proved difficult, and users needed to track which cluster was assigned to their team.

## Architecture & Design

Netflix's Ray-based training platform centers on a sophisticated job scheduler that serves as the "central brain" coordinating heterogeneous GPU clusters. The scheduler implements a queue-based routing system where users submit jobs to a central endpoint without specifying execution location or timing. The system monitors all running jobs across clusters in round-robin fashion, with the capability to pause and resume jobs based on priority policies.

The cluster architecture follows a heterogeneous design with pools of similar machine types. A head node orchestrates multiple resource pools: P4 GPU machines (clusters with 800 GPUs), A100 GPU pools, A10 GPU pools, and CPU-only machine pools. This pooling strategy allows workloads spanning different GPU types or mixing GPU and CPU resources to be accommodated flexibly. The infrastructure includes a dedicated FSx file system for high-throughput data access and a separate shared file system for lower-volume needs like checkpoints, metrics, and metadata collection.

Job scheduling implements pluggable policies to maximize resource utilization. The scheduler distinguishes between ad-hoc experimentation jobs and production jobs with SLA requirements, allocating resources accordingly. Dynamic resource configuration enables jobs to adapt—a job normally running on A100s can downgrade to A10s if the preferred hardware is unavailable. The preemption system allows long-running jobs (potentially seven days or more) to be suspended and evicted when high-priority workloads need resources, then resumed when capacity frees up.

The cluster-per-team model evolved into an abstraction layer where the scheduler presents multiple physical clusters as a unified logical cluster. This abstraction simplifies operations by directing traffic away from clusters undergoing deployment or upgrades while maintaining service continuity. Centralized UI and observability metrics provide unified visibility across all physical clusters.

For hyperparameter optimization, Netflix built an HPO Manager that integrates with the scheduler, providing a specialized queue with dedicated resources. This manager uses Optuna as the optimization engine and coordinates multiple training jobs representing different hyperparameter combinations. The HPO Manager maintains state for entire experiments, enabling checkpoint, pause, and eviction of multi-trial experiments as a unit, then resuming when resources become available.

For generative AI workloads, Netflix architected a pipeline combining LLM fine-tuning with evaluation and model publishing. Fine-tuning leverages Ray and vLLM for models requiring multi-GPU partitioning or multi-node distribution. The evaluation stage uses vLLM for efficient inference on large models, assessing quality before depositing models in a registry. The serving layer offers flexibility—models can be deployed at scale or used as single servers for task evaluation depending on requirements.

The multimodal dataset construction pipeline represents a sophisticated application of Ray Data's streaming architecture. Data flows through cascading model stages: initial filtering (NSFW detection, aesthetic scoring), captioning (using LLaVA and other vision-language models), grounding (Florence for bounding box generation), embedding generation (CLIP for images, sentence transformers for text), and quality assessment (comparing caption-image similarity with CLIP scores). Ray Data's shared memory architecture eliminates the need for intermediate data persistence—only pointers to batches flow between stages while actual data remains in shared memory.

## Technical Implementation

The training platform is built entirely on Ray, leveraging its distributed computing primitives for heterogeneous resource management. Clusters are deployed in durable fashion, remaining active for extended periods (often a month or more) to handle continuous training workloads. The job scheduler monitors Ray clusters and implements pause/resume functionality by signaling jobs to checkpoint and release resources when preemption is needed.

For recommendation models with IO-intensive workloads, Netflix optimized data throughput to eliminate bottlenecks in feeding large embedding tables. The multi-GPU distributed training handles gradient communication challenges inherent in DLRM architectures. Multimodal models employ distributed data parallel training patterns across multi-GPU and multi-node configurations. LLM fine-tuning specifically uses fully sharded data parallel (FSDP), distributing model parameters across devices to handle models too large for single GPUs.

The HPO Manager provides an opinionated interface over Optuna, integrating seamlessly with Netflix's training API. Users inject hyperparameter specifications into their existing training code with minimal changes, enabling automatic scaling to multi-job HPO experiments. Visualization dashboards stream real-time data from running experiments, providing centralized monitoring. The system handles operational concerns like automatic pause/resume under scheduler control.

For LLM workflows, Netflix employs vLLM for both fine-tuning very large models and for evaluation inference. The choice to fine-tune rather than use hosted APIs (OpenAI, etc.) stems from needs for customizability and data sensitivity—Netflix retains full control over models and avoids sending sensitive data externally. Fine-tuned models serve as backbones for specialized downstream tasks, with serving solutions optimized for either throughput or latency depending on application requirements.

Ray Data powers the multimodal dataset construction through its streaming batch inference capabilities. The implementation wraps models (vision transformers for NSFW detection, LLaVA for captioning, Florence for grounding, CLIP for embeddings) in transform functions that process batches. Each stage declares its compute requirements (CPU vs GPU) and concurrency bounds. For example, a classification model might specify concurrency of 2-10 GPUs, meaning it requires minimum 2 GPUs but can scale to 10 based on available resources. Ray automatically balances actor pool sizes across pipeline stages to maintain constant batch flow.

The streaming architecture uses arrow-based data interchange, eliminating serialization overhead. As one stage finishes processing a batch and deposits results in shared memory, the next stage picks up work via pointers rather than data copies. This contrasts sharply with traditional bulk synchronous parallel (BSP) approaches where each model stage must process the entire dataset, write results to disk, then have the next stage read from disk—generating massive temporary storage requirements.

Netflix is exploring Lance format for dataset storage, motivated by several technical advantages over Parquet. Lance eliminates row group constraints that impede storing large blobs (embeddings, tensors with 100K+ dimensions), enabling efficient point queries without fetching entire row groups. The format provides built-in vector search indexes using disk-based approximate nearest neighbor algorithms, eliminating the need to ingest data into separate vector databases for exploration. Lance implements zero-copy versioning where row additions and column additions are appended atomically with manifest files pointing to constituent objects, enabling version rollback/rollforward without data duplication. This versioning capability is crucial for incrementally building petabyte-scale datasets without maintaining full copies at each version.

## Scale & Performance

Netflix trains thousands of personalization models daily in 24-hour cycles. A single experimental idea typically generates 11 A/B test cells, each requiring a trained model variant. The explosive combinatorics of experiments × cells × daily retraining creates continuous demand for GPU resources.

The platform manages clusters with substantial GPU counts, including P4 clusters with 800 GPUs. Heterogeneous pools include A100s, A10s, and other GPU types alongside CPU-only machines. The scheduler coordinates resource allocation across these pools while maintaining SLA commitments.

Multimodal dataset construction processes millions of images and associated media assets. Individual pipeline stages handle different throughput characteristics—a lightweight NSFW classifier might run on three GPU instances while a heavier segmentation model requires five instances. Ray Data automatically balances these pools to maintain constant batch flow through the pipeline.

The platform processes multiple data modalities at scale: millions of images for caption generation, video processing for frame extraction and analysis, audio separation and transcription, and text processing for embeddings. Embedding models generate high-dimensional vectors—CLIP embeddings for images, sentence transformers for text, with some tensors reaching 100K-120K dimensions stored as blobs in datasets.

Dataset sizes reach into terabytes and petabytes. Adding a single column (like captions or embeddings) to a 10TB dataset can add 1TB of data. Without efficient versioning, maintaining multiple dataset versions multiplies storage requirements unsustainably. The exploration of Lance format specifically targets this challenge through delta-based versioning.

LLM fine-tuning spans models of various sizes, with larger models requiring multi-GPU partitioning and sometimes multi-node distribution. The choice of FSDP training enables scaling beyond single-GPU memory limits while maintaining efficient training throughput.

## Trade-offs & Lessons

Netflix made deliberate architectural choices that reflect operational priorities and constraints. The cluster-per-team model provides workload isolation and predictability—teams training similar model types benefit from stable cluster configurations tuned to their needs. However, this isolation prevents resource sharing, leaving idle GPUs unutilized when one team's workloads complete while another team faces queues. The job scheduler addresses this by abstracting clusters into a unified logical resource pool, though individual clusters remain physically separated.

The preemption and pause/resume capabilities introduce complexity but prove essential for maximizing GPU utilization in scarce resource environments. Long-running jobs (multi-day training) can yield resources to urgent workloads, then resume when capacity frees. This requires robust checkpointing and state management but delivers substantial utilization improvements.

For multimodal dataset construction, Netflix discovered that traditional request-response serving patterns create prohibitive overhead for cascading model pipelines. The client becomes a bloated coordinator managing temporary payloads between models, and when each "model" actually represents many instances for parallelism, coordination complexity explodes. Ray Data's streaming architecture with shared memory eliminates this—only pointers flow between stages while data remains in memory, drastically reducing overhead.

The bulk synchronous parallel (BSP) alternative—where each model processes the entire dataset, writes results to disk, then the next model reads from disk—generates massive temporary storage. At Netflix's scale (terabytes to petabytes), this becomes untenable. Ray Data's streaming approach processes incrementally, avoiding full dataset materialization between stages.

However, Ray Data introduces its own considerations. Users must carefully manage GPU memory, balancing model size (potentially using quantization) against batch size to maximize throughput. The remaining GPU memory after model loading determines how many elements can be processed simultaneously. Larger GPU cards enable bigger batches and higher throughput for the same model. Netflix acknowledges this requires tuning but considers it preferable to managing coordination complexity.

Dataset format choices reveal interesting trade-offs. Parquet works well for tabular data but struggles with large blobs—row group constraints force fetching entire groups even for point queries, exhausting reader memory. Lance format addresses this but represents a newer, less mature ecosystem. Netflix is "testing the waters" rather than committing to full production deployment, acknowledging there are "razor blade cuts" (sharp edges) in the technology.

The exploration of Lance specifically targets delta management and versioning challenges. Being able to add columns (captions, embeddings, quality scores) without duplicating the entire dataset saves massive storage costs at petabyte scale. Built-in vector indexes for nearest-neighbor search enable dataset exploration without ingesting into separate systems. These benefits are compelling enough to warrant experimentation despite maturity concerns.

Netflix's HPO Manager illustrates an opinionated design philosophy. Rather than exposing Ray Tune's full flexibility, they built a simplified layer defaulting to Optuna with scheduler integration. This reduces user complexity while meeting Netflix's specific workflow needs. The minimal API changes required to adopt HPO—just injecting parameter specifications—lowers adoption friction.

For LLM deployment, Netflix deliberately chose self-hosting and fine-tuning over hosted APIs. This trades operational complexity for control and privacy. Sensitive data never leaves Netflix infrastructure, and fine-tuned models serve as backbones for specialized downstream tasks. The ability to optimize serving for specific latency/throughput profiles provides flexibility unavailable with third-party APIs.

The platform's evolution from serving traditional recommendation models to accommodating generative AI workloads demonstrates architectural extensibility. The same scheduler, cluster abstraction, and Ray foundation support embedding-heavy DLRM models, multimodal transformers, LLM fine-tuning, and batch inference pipelines. This generality comes from investing in flexible primitives (heterogeneous resource pools, pluggable scheduling policies, shared memory streaming) rather than optimizing for specific model types.

Netflix's experience highlights that hallucination detection and quality assessment require model-based validation at scale. Humans cannot manually review millions of generated captions. Instead, Netflix cascades multiple models: vision-language models generate captions, CLIP scoring validates caption-image alignment, and specialized models verify object presence by questioning LLMs about elements mentioned in captions. This model-based validation approach scales but requires careful pipeline design and introduces its own error propagation risks.

The centralized observability and UI design reflects operational priorities. Managing dozens of distributed clusters without unified visibility creates coordination overhead and debugging challenges. The scheduler's role as a central coordination point naturally supports aggregated metrics and logging, simplifying operations significantly.

Netflix's journey reveals that modern ML platforms must support radically different workload types—from IO-bound embedding models to compute-intensive transformers to memory-constrained LLMs—while maximizing utilization of scarce GPU resources. Their solution emphasizes flexible resource pooling, intelligent scheduling with preemption, streaming batch inference for data construction, and careful format choices for managing massive datasets. The trade-offs consistently favor operational simplicity and resource efficiency over architectural purity, reflecting the practical realities of production ML at scale.
