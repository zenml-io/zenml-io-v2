---
title: "ESSA unified ML framework on Ray for infrastructure-agnostic training across cloud and GPU clusters including 7B pretraining with fault-tol"
slug: "apple-approach-to-building-scalable-ml-infrastructure-on-ray-essa-unified-ml-framework-on-ray-for-infrastructure-agnosti"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "metadata-store"
  - "pipeline-orchestration"
  - "airflow"
  - "azure-ml"
  - "databricks"
  - "dvc"
  - "horovod"
  - "kubernetes"
  - "mlflow"
  - "ray"
  - "sagemaker"
  - "spark"
  - "triton"
  - "vertex-ai"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "training"
industryTags: "tech"
company: "Apple"
companySlug: "apple"
platformName: "Approach to Building Scalable ML Infrastructure on Ray"
contentType: "video"
summary: "Apple developed ESSA, a unified machine learning framework built on Ray, to address fragmentation across their ML infrastructure where thousands of developers work across multiple cloud providers, data platforms, and compute systems. The framework provides infrastructure-agnostic execution supporting both standard deep learning workflows (70% of users) and advanced large-scale pretraining and reinforcement learning (30% of users), integrating PyTorch, Hugging Face, DeepSpeed, FSDP, and Ray with internal systems for data processing, orchestration, and experiment tracking. In production, the platform successfully trained a 7 billion parameter foundation model on nearly 1,000 H200 GPUs processing one trillion tokens, achieving 1,400 tokens per second per GPU with automatic fault recovery and multi-dimensional parallelism while maintaining a simple notebook-style API that abstracts infrastructure complexity from researchers."
link: "https://www.youtube.com/watch?v=qnhtKGDhVbg"
year: 2025
seo:
  title: "Apple: ESSA unified ML framework on Ray for infrastructure-agnostic training across cloud and GPU clusters including 7B pretraining with fault-tol - ZenML MLOps Database"
  description: "Apple developed ESSA, a unified machine learning framework built on Ray, to address fragmentation across their ML infrastructure where thousands of developers work across multiple cloud providers, data platforms, and compute systems. The framework provides infrastructure-agnostic execution supporting both standard deep learning workflows (70% of users) and advanced large-scale pretraining and reinforcement learning (30% of users), integrating PyTorch, Hugging Face, DeepSpeed, FSDP, and Ray with internal systems for data processing, orchestration, and experiment tracking. In production, the platform successfully trained a 7 billion parameter foundation model on nearly 1,000 H200 GPUs processing one trillion tokens, achieving 1,400 tokens per second per GPU with automatic fault recovery and multi-dimensional parallelism while maintaining a simple notebook-style API that abstracts infrastructure complexity from researchers."
  canonical: "https://www.zenml.io/mlops-database/apple-approach-to-building-scalable-ml-infrastructure-on-ray-essa-unified-ml-framework-on-ray-for-infrastructure-agnosti"
  ogTitle: "Apple: ESSA unified ML framework on Ray for infrastructure-agnostic training across cloud and GPU clusters including 7B pretraining with fault-tol - ZenML MLOps Database"
  ogDescription: "Apple developed ESSA, a unified machine learning framework built on Ray, to address fragmentation across their ML infrastructure where thousands of developers work across multiple cloud providers, data platforms, and compute systems. The framework provides infrastructure-agnostic execution supporting both standard deep learning workflows (70% of users) and advanced large-scale pretraining and reinforcement learning (30% of users), integrating PyTorch, Hugging Face, DeepSpeed, FSDP, and Ray with internal systems for data processing, orchestration, and experiment tracking. In production, the platform successfully trained a 7 billion parameter foundation model on nearly 1,000 H200 GPUs processing one trillion tokens, achieving 1,400 tokens per second per GPU with automatic fault recovery and multi-dimensional parallelism while maintaining a simple notebook-style API that abstracts infrastructure complexity from researchers."
mlops:
  source: "sqlite"
  entryId: 226
  sourceUrl: "https://www.youtube.com/watch?v=qnhtKGDhVbg"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.619209"
  lastUpdated: "2026-04-14T19:56:07.894714"
---

## Problem Context

Apple faced significant infrastructure fragmentation challenges as thousands of machine learning developers worked to build ML-powered features spanning diverse use cases from traditional ranking models and search embeddings to large language model pretraining, post-training, reinforcement learning, and agentic systems. The core pain points stemmed from operating across multiple cloud providers, data platforms, compute systems, and orchestration tools, with each layer introducing its own environment, APIs, and dependencies.

This fragmentation forced constant context switching throughout the end-to-end ML workflow. Feature engineering required tools like Spark for large-scale data processing in JVM-based environments within CPU clusters. Model training typically used PyTorch or TensorFlow in C++-based environments within GPU or TPU clusters. Model deployment and evaluation depended on separate Java or Go-based systems with limited integration. This created substantial friction that slowed iteration cycles, increased learning curves, and reduced resource efficiency particularly for GPU workloads. The disconnected infrastructure made it difficult to quickly transition researcher prototypes into production-ready systems.

The vision driving the platform development was to empower ML researchers and engineers to focus on modeling and innovation rather than infrastructure. Apple sought a unified framework built on existing open-source tools made production-ready, maintaining native developer experiences with familiar APIs while simplifying distributed and large-scale training by abstracting cluster configuration and model parallelism complexity. The goal was enabling seamless end-to-end workflows connecting data processing, model training, evaluation, and deployment so developers could focus on core modeling code and run it anywhere at any scale.

## Architecture & Design

The ESSA framework architecture consists of multiple layers designed for infrastructure agnosticism and developer simplicity. At the bottom infrastructure layer, the framework enables users to run training jobs across internal Apple cloud environments, third-party clouds, internal Kubernetes-based compute systems, and Ray-backed compute systems. The fundamental design principle is allowing the same code to run across different infrastructure without any modification.

Above the infrastructure layer, Apple selected essential capabilities forming the platform foundation. Core training frameworks include PyTorch and Hugging Face, with DeepSpeed, FSDP (Fully Sharded Data Parallel), and torch.distributed handling large-scale model parallelism. For reinforcement learning, the platform integrates TRL (Transformers Reinforcement Learning), Hugging Face TRL, and vLLM. Language model evaluation leverages lm-eval-harness. The framework also connects with internal experiment tracking tools, Ray Data for large-scale data processing, Airflow for orchestration, and OpenLineage for governance and lineage tracking.

ESSA provides two primary interface tiers targeting different user sophistication levels. The first interface serves standard machine learning developers focused on classic deep learning model training or large language model post-training such as supervised fine-tuning workloads. This tier provides PyTorch and Hugging Face Accelerate as main interfaces, supporting data parallelism, FSDP, fully sharded data parallelism, and DeepSpeed for scaling. This user segment represents approximately 70% of the platform's total users.

The second interface targets advanced machine learning developers working on large-scale pretraining or reinforcement learning. This tier exposes PyTorch and Ray directly, enabling PyTorch-based multi-dimensional parallelism including tensor parallelism, pipeline parallelism, context parallelism, sequence parallelism, and loss parallelism. Advanced users comprise about 30% of total platform users. The framework explicitly exposes Ray interfaces to enable advanced operations like hosting inference models during reinforcement learning or conducting hyperparameter searches.

The platform maintains a notebook-style development approach where training logic is defined as simple Python scripts with minimal wrappers. This design intentionally reduces learning curves and prevents the framework itself from becoming a flexibility bottleneck when users need to customize or build new capabilities. The framework introduces minimal additional functions—primarily utilities to load configuration files into Python dictionaries and data loaders to read data directly from internal object stores with global caching.

Configuration files specify training parameters, resource requirements, and distribution settings separately from code. These configurations include paths to training scripts, model hyperparameters like learning rate and batch size, training data locations, compute platform settings such as GPU counts, and scaling policies. This separation allows users to modify infrastructure requirements without changing modeling code.

## Technical Implementation

The ESSA framework is fundamentally built on Ray as the distributed execution engine, leveraging Ray's capabilities for resource management, fault tolerance, and coordination across distributed infrastructure. The platform integrates PyTorch as the primary deep learning framework with extensive Hugging Face library support for transformer models and tokenization.

For distributed training, Apple developed a PyTorch-based n-dimensional parallelism framework enabling users to apply different parallelism types—data parallelism, tensor parallelism, and pipeline parallelism—to their models as needed. The FSDP (Fully Sharded Data Parallel) configuration can be set to auto-tune based on available GPU counts. The platform also provides an end-to-end automation mode built on large-scale training efficiency benchmarks that automatically selects the most efficient parallelism combination based on model size, GPU count, and data volume. This automation allows advanced users to achieve near-optimal scaling performance without manual configuration tuning.

The framework implements several critical memory and compute optimizations. Activation checkpointing (also called gradient checkpointing) trades compute for memory by recomputing intermediate activations during backward propagation on-demand rather than storing all activations in GPU memory. This technique becomes essential when activation memory dominates GPU usage after applying FSDP, tensor parallelism, or pipeline parallelism, as these techniques distribute model parameters and optimizer state but activation memory depends on specific implementation details.

Mixed precision training options are configurable, allowing machine learning engineers to leverage modern GPU FP16 compute capabilities while reducing memory requirements. The platform also enables torch.compile for just-in-time optimization in training loops, automatically fusing operations and eliminating PyTorch overhead.

A deterministic data loader is a key platform feature providing reproducible and debuggable training in distributed settings. This deterministic loader enables mid-epoch resumption by recovering both model state and data loader state, which is critical for the checkpointing and recovery mechanism. The platform automatically saves model state and data loader state based on step progress, with higher-level orchestration layers automatically resuming training during hardware failures or when jobs running on lower-priority tiers get preempted.

Data management leverages Apple's internal object store to ensure high-throughput data access across distributed infrastructure. The platform integrates with Ray Data for large-scale data processing, replacing the need to context-switch to Spark-based JVM environments for feature engineering. Orchestration relies on Airflow integration for workflow management, while OpenLineage provides governance and lineage tracking capabilities.

The infrastructure layer abstracts away cloud-specific details, supporting internal Apple cloud, third-party cloud providers, internal Kubernetes clusters, and Ray-backed compute systems. Auto-scaling capabilities adjust resources based on model parallelism policies, so users don't need to modify code when infrastructure parameters like GPU counts change.

## Scale & Performance

Apple demonstrated the platform's production capabilities through a large-scale foundation model pretraining case study. The training task involved a 7 billion parameter decoder-only foundation model trained on approximately one trillion tokens (roughly 750 billion words). The compute infrastructure consisted of 120 H200 GPU nodes providing nearly 1,000 GPUs in total, delivering 240 petaflops of compute power in FP16 precision. Sequence lengths were set to 4,096 tokens each.

The parallelism strategy implemented for this training employed three-dimensional parallelism: 60-way splitting with FSDP on the data dimension, 4-way model splitting within individual layers using tensor parallelism, and 4-way splitting across model layers with pipeline parallelism. Critically, users did not need to manually orchestrate this complex parallelism setup—the ML framework built on Ray handled distribution coordination, fault tolerance, and resource management automatically.

Performance results showed the platform achieving approximately 1,400 tokens per second per GPU across the roughly 1,000 GPU setup, translating to 1.3 million tokens per second aggregate training throughput. Each token required approximately 42 teraflops of computation, resulting in close to 800 teraflops per GPU actual utilization. The complete training run required about 10 days to process the full trillion-token dataset.

The platform serves thousands of machine learning developers internally at Apple, with approximately 70% using the standard interface for classic deep learning and LLM post-training, while 30% use the advanced interface for large-scale pretraining and reinforcement learning. This user distribution reflects the platform's successful dual-tier design accommodating both simplified workflows and sophisticated custom parallelism requirements.

The checkpointing and recovery capabilities proved essential for multi-week training runs, automatically recovering from hardware failures and preemptions on lower-priority compute tiers. The deterministic data loader enabled precise mid-epoch resumption, ensuring no training progress was lost during interruptions. This reliability infrastructure was enabled by both library-level features and underlying Ray infrastructure for automatic job resumption and retry logic.

## Trade-offs & Lessons

Apple's platform design reveals several important architectural decisions and their implications. The choice to maintain a minimal-wrapper, notebook-style API represents a deliberate trade-off prioritizing developer flexibility and low learning curves over framework-level guardrails. By keeping training scripts as simple Python code with minimal additional functions, the platform avoids becoming a flexibility bottleneck when researchers need to customize implementations or integrate new capabilities. This approach proved successful in practice, with users integrating additional frameworks like vLLM for reinforcement learning workloads.

The two-tier interface strategy (standard vs. advanced) effectively addresses the challenge of serving both novice and expert users without forcing everyone through complex APIs. Seventy percent of users benefit from simplified abstractions around PyTorch and Hugging Face Accelerate with automatic parallelism configuration, while thirty percent of advanced users can directly leverage Ray and implement custom multi-dimensional parallelism strategies. This segmentation prevents the common anti-pattern where platforms either oversimplify for experts or overwhelm beginners.

Building on Ray as the foundational distributed execution engine provided substantial benefits for infrastructure abstraction and fault tolerance. Ray's native support for heterogeneous compute resources, automatic retry logic, and distributed coordination eliminated the need to build these capabilities from scratch. The integration with Ray Data also addressed the data processing fragmentation problem, keeping the entire workflow within a Python-native environment rather than requiring context switches to JVM-based Spark clusters.

The automation of parallelism strategy selection based on model size, GPU count, and data volume represents a significant usability improvement over manual configuration. However, the platform maintains escape hatches for advanced users to override these defaults with custom parallelism configurations. This balance between intelligent defaults and expert control is a key lesson for platform design—automation should simplify common cases without restricting sophisticated use cases.

The deterministic data loader implementation demonstrates the importance of reproducibility infrastructure in distributed training. By ensuring both model state and data loader state can be precisely recovered, the platform enables reliable mid-epoch resumption. This capability becomes critical for multi-week training runs on preemptible infrastructure where interruptions are expected rather than exceptional.

Activation checkpointing emerged as a necessary optimization once other parallelism techniques like FSDP distributed model parameters and optimizer state across GPUs. This highlights how memory bottlenecks shift as distributed training strategies evolve—what starts as a parameter memory problem becomes an activation memory problem after applying sharding techniques. Platform designers must anticipate these shifting bottlenecks and provide appropriate optimization levers.

The separation of code and configuration files proved valuable for infrastructure agnosticism. By extracting resource requirements, parallelism settings, and cloud provider details into configuration rather than embedding them in training code, users can run identical modeling logic across different infrastructure without modification. This separation also facilitates experimentation with different resource allocations and parallelism strategies.

The open question about potential open-sourcing of the platform indicates the common tension between internal platforms optimized for specific organizational contexts and the desire to share innovations with the broader community. The presenters acknowledged this as a long process, suggesting that internal dependencies on Apple-specific systems (internal object stores, experiment tracking, orchestration) create coupling that would need to be addressed for external release.

The explicit integration with existing open-source frameworks (PyTorch, Hugging Face, DeepSpeed, Ray) rather than building proprietary alternatives represents a strategic choice to leverage community innovation and maintain compatibility with the broader ML ecosystem. This approach reduces maintenance burden and ensures users can apply external tools, libraries, and best practices developed by the open-source community.

From a practitioner perspective, the platform demonstrates that unified ML frameworks can successfully abstract infrastructure complexity while maintaining flexibility for advanced use cases. The key insights include maintaining minimal wrappers around familiar APIs, providing intelligent automation with expert overrides, investing in reliability infrastructure like deterministic data loaders and checkpointing, and building on robust distributed execution engines like Ray rather than implementing distributed coordination from scratch.
