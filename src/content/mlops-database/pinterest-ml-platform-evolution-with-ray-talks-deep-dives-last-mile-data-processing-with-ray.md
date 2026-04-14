---
title: "Last Mile Data Processing with Ray"
slug: "pinterest-ml-platform-evolution-with-ray-talks-deep-dives-last-mile-data-processing-with-ray"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "pipeline-orchestration"
  - "airflow"
  - "databricks"
  - "ray"
  - "spark"
  - "data-prep"
  - "feature-engineering"
  - "training"
industryTags: "media-entertainment"
company: "Pinterest"
companySlug: "pinterest"
platformName: "ML platform evolution with Ray (talks + deep dives)"
contentType: "blog"
summary: "Pinterest faced significant bottlenecks in ML dataset iteration velocity as their ML engineers shifted focus from model architecture to dataset experimentation, including sampling strategies, labeling, and batch inference. Traditional approaches using Apache Spark workflows orchestrated through Airflow took weeks to iterate and required context-switching between multiple languages and frameworks, while performing last-mile data processing directly in PyTorch training jobs led to poor GPU utilization and throughput degradation. Pinterest adopted Ray, an open-source distributed computing framework, to enable scalable last-mile data processing within a unified Python environment, achieving 6x improvement in developer velocity (reducing iteration time from 90 hours to 15 hours), 45% faster training throughput compared to native PyTorch dataloaders for complex processing workloads, 25% cost savings, and over 90% GPU utilization through heterogeneous resource management."
link: "https://medium.com/pinterest-engineering/last-mile-data-processing-with-ray-629affbf34ff"
year: 2023
seo:
  title: "Pinterest: Last Mile Data Processing with Ray - ZenML MLOps Database"
  description: "Pinterest faced significant bottlenecks in ML dataset iteration velocity as their ML engineers shifted focus from model architecture to dataset experimentation, including sampling strategies, labeling, and batch inference. Traditional approaches using Apache Spark workflows orchestrated through Airflow took weeks to iterate and required context-switching between multiple languages and frameworks, while performing last-mile data processing directly in PyTorch training jobs led to poor GPU utilization and throughput degradation. Pinterest adopted Ray, an open-source distributed computing framework, to enable scalable last-mile data processing within a unified Python environment, achieving 6x improvement in developer velocity (reducing iteration time from 90 hours to 15 hours), 45% faster training throughput compared to native PyTorch dataloaders for complex processing workloads, 25% cost savings, and over 90% GPU utilization through heterogeneous resource management."
  canonical: "https://www.zenml.io/mlops-database/pinterest-ml-platform-evolution-with-ray-talks-deep-dives-last-mile-data-processing-with-ray"
  ogTitle: "Pinterest: Last Mile Data Processing with Ray - ZenML MLOps Database"
  ogDescription: "Pinterest faced significant bottlenecks in ML dataset iteration velocity as their ML engineers shifted focus from model architecture to dataset experimentation, including sampling strategies, labeling, and batch inference. Traditional approaches using Apache Spark workflows orchestrated through Airflow took weeks to iterate and required context-switching between multiple languages and frameworks, while performing last-mile data processing directly in PyTorch training jobs led to poor GPU utilization and throughput degradation. Pinterest adopted Ray, an open-source distributed computing framework, to enable scalable last-mile data processing within a unified Python environment, achieving 6x improvement in developer velocity (reducing iteration time from 90 hours to 15 hours), 45% faster training throughput compared to native PyTorch dataloaders for complex processing workloads, 25% cost savings, and over 90% GPU utilization through heterogeneous resource management."
mlops:
  source: "sqlite"
  entryId: 188
  sourceUrl: "https://medium.com/pinterest-engineering/last-mile-data-processing-with-ray-629affbf34ff"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.617375"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Pinterest's ML platform serves 460 million monthly active users by continuously delivering personalized recommendations through hundreds of ML models that process petabytes of data and train using hundreds of GPUs. As model architectures became increasingly standardized around common building blocks like transformers, Pinterest's ML engineers began shifting their innovation focus from model architecture to dataset iteration, including sampling strategies, labeling, weighting, and batch inference for transfer learning and distillation. This shift revealed critical bottlenecks in the ML development lifecycle that severely hampered productivity.

Despite the potential for significant gains from dataset experimentation, Pinterest observed that only a handful of such experiments were conducted and productionized over a six-month period. The root cause was a development process that made dataset iteration extremely slow and resource-inefficient. The engineering team identified two primary anti-patterns that emerged as ML engineers attempted to work around platform limitations, both of which created substantial friction in the development workflow.

The first bottleneck was the traditional workflow-based approach using Apache Spark jobs orchestrated through Airflow. While Pinterest's ML datasets were highly standardized with shared features stored in parquet tables supporting both analytical queries and large-scale training, the sheer scale of web-generated data from hundreds of millions of users made rapid iteration challenging. Tables contained thousands of features spanning several months of user engagement history, with petabytes of data streaming into training jobs. Even simple changes like trying a new downsampling strategy required ML engineers to write and test new jobs in Scala or PySpark, integrate them with workflow systems, test at scale, tune performance, and release to production. This multi-stage process spanning multiple languages and frameworks was not interactive, with bugs often discovered late in the cycle. In some cases, this workflow-based approach took several weeks to train a model with a new dataset variation, a problem Pinterest characterized as "scale first, learn last."

The second anti-pattern emerged as ML engineers sought to bypass the slow workflow iteration cycle by performing data processing directly inside PyTorch training jobs, a pattern Pinterest termed "last mile data processing." While this approach improved velocity by allowing engineers to write code in Python directly using PyTorch, it created severe resource utilization problems. As more data processing workloads moved into the training job, training throughput degraded significantly. Engineers would add more data loader workers requiring additional CPU and memory, eventually hitting resource limits. The solution was often to provision larger GPU instances with more CPU and memory, but this resulted in poor GPU utilization as training became CPU-bottlenecked. Benchmark data showed that training with the same resources and model architecture but progressively more complex in-trainer data processing demonstrated significant throughput decreases. Horizontal scaling through distributed training also proved challenging, as finding the right balance between training throughput and cost was difficult. The core issue was the inability to manage heterogeneous instance types and distribute workloads in a resource-aware manner.

## Architecture & Design

Pinterest's solution centered on adopting Ray as a unified framework for scalable last-mile data processing integrated directly with training workflows. The architecture represents a fundamental shift from rigid, separated data processing and training pipelines to a flexible, heterogeneous compute environment managed within a single framework.

The key architectural components include a heterogeneous Ray cluster that manages both CPU and GPU resources within a unified environment, a Ray driver that orchestrates both data processing and training compute, Ray Data for distributed data processing with streaming execution capabilities, and a programmable launcher API that orchestrates distributed PyTorch training across multiple GPU nodes.

The data flow begins when ML engineers initiate their development process by spinning up a dedicated, heterogeneous Ray cluster through an automated unified training job launcher tool. This launcher bootstraps the Ray driver, which serves as the central orchestration point for managing both data processing on CPU nodes and training on GPU nodes. Within the driver environment, ML engineers author their dataset processing logic using Ray Data, which provides distributed data processing capabilities with support for various data sources and common operators. The driver also invokes the programmable launcher API to orchestrate distributed training using PyTorch training scripts across multiple GPU nodes.

A critical architectural innovation is Ray Data's streaming execution capability, which enables concurrent data transformation and training. This streaming architecture means the system does not need to load entire datasets before processing begins, and training can progress without waiting for data computation to complete. Data flows in blocks from storage through Ray Data's distributed processing pipeline, with transformed data streaming directly into training workers. This concurrent execution model fundamentally changes the resource utilization profile, allowing CPU resources to scale independently for data processing while maintaining optimal GPU utilization for training.

The heterogeneous resource management is handled by Ray's scheduler, which allocates workloads to appropriate hardware based on resource requirements. Data processing tasks are scheduled on CPU nodes while training tasks are scheduled on GPU nodes, with the Ray cluster managing the coordination and data movement between these heterogeneous resources. ML engineers can elastically scale CPU resources for improved data processing throughput without impacting GPU resource allocation.

## Technical Implementation

The implementation leverages several specific technologies and frameworks working in concert. At the foundation is Ray, the open-source distributed computing framework that provides the unified runtime for all MLOps components. Ray Data serves as the distributed data processing library built on top of Ray, offering streaming execution capabilities that are central to the solution's performance characteristics.

PyTorch remains the core training framework, with Pinterest's ML engineers authoring training scripts in Python that are orchestrated by Ray's distributed training capabilities. The existing data infrastructure is preserved, with features stored in parquet tables that Ray Data can natively read and process. This allows the solution to integrate with Pinterest's existing highly standardized feature representations without requiring data migration or format changes.

The development workflow is designed to be interactive and notebook-friendly. ML engineers work within Jupyter notebooks, authoring both data processing and training code in Python within a single environment. The code snippet shared in the article demonstrates this unified approach, showing how engineers can experiment with dataset iterations interactively without context-switching between multiple systems or languages.

The unified training job launcher tool automates cluster provisioning and setup. When an ML engineer initiates a training job, the launcher provisions a Ray cluster with the appropriate mix of CPU and GPU nodes, bootstraps the Ray driver, and configures the environment for both data processing and training workloads. This automation removes infrastructure complexity from the ML engineer's workflow.

Ray Data's implementation handles several sophisticated data processing patterns that Pinterest's ML engineers commonly need. These include map-side joins for operations like spam-user filtering, dynamic negative downsampling, and efficient handling of extremely large features like user-sequence features. The streaming execution engine processes data in blocks, allowing memory-efficient processing of petabyte-scale datasets without requiring full materialization.

The integration with PyTorch distributed training is achieved through Ray's programmable launcher API, which provides programmatic control over distributed training configuration. This allows the same driver code to orchestrate both single-node and multi-node training configurations, adjusting resource allocation based on the specific experiment requirements.

## Scale & Performance

The performance improvements from adopting Ray for last-mile data processing are substantial and well-documented through Pinterest's benchmarking efforts. The team conducted controlled experiments training models on the same architecture while progressively increasing last-mile data processing workloads to isolate the impact of the new approach.

Even without any last-mile data processing workload, Ray's dataloader showed a 20% improvement in training throughput compared to the native PyTorch dataloader. This baseline improvement was attributed to Ray's superior handling of extremely large features, particularly user-sequence features that are critical to Pinterest's recommendation systems.

As more complex data processing logic was incorporated, the performance gap widened significantly. After adding spam-user filtering (implemented as a map-side join) and dynamic negative downsampling, the Ray dataloader achieved up to 45% faster throughput than the PyTorch-based implementation. This improvement translates to ML engineers gaining twice the learning from training experimental models within the same time window as before.

The most dramatic improvement was in end-to-end developer velocity. When ML engineers conducted dataset experiments using the traditional approach of writing Spark jobs and workflows, the process took 90 hours to train a new model. With Ray, this time was reduced to 15 hours, representing a 6x improvement in developer velocity. This acceleration fundamentally changes the pace of experimentation and innovation possible within the ML organization.

Cost efficiency also improved substantially. Despite the need to horizontally scale data loaders by adding more CPU nodes, the decrease in overall training time resulted in 25% cost savings for the benchmarked application. This cost reduction comes from more efficient resource utilization and shorter job duration, even while providing better performance.

GPU utilization improved to over 90%, representing a dramatic improvement from the previous pattern where GPU resources were underutilized due to CPU bottlenecks in training jobs. This high GPU utilization is achieved through Ray's heterogeneous resource management, which ensures GPU nodes spend their time on training rather than being bottlenecked by data processing.

The platform serves hundreds of ML engineers working on a wide range of recommendation engines, processing petabytes of data and training thousands of models. The dataset scale involves tables with thousands of features spanning several months of user engagement history, with some applications streaming petabytes of data into individual training jobs.

## Trade-offs & Lessons

Pinterest's adoption of Ray for last-mile data processing reveals several important trade-offs and lessons for practitioners building ML platforms at scale.

The most significant positive outcome was achieving a unified development experience in a single language and framework. By consolidating data processing and training within Ray's Python-based ecosystem, Pinterest eliminated the context-switching overhead of working across Scala/PySpark, Airflow, and PyTorch. This unified approach dramatically reduced the cognitive load on ML engineers and shortened the feedback loop for experimentation. The ability to work interactively in Jupyter notebooks while orchestrating distributed processing and training represents a fundamental improvement in developer ergonomics.

The streaming execution capability of Ray Data proved to be a breakthrough feature that addresses multiple problems simultaneously. By enabling concurrent data transformation and training, it eliminates the need to load entire datasets before processing and allows training to progress while data computation continues. This pattern significantly lowers resource requirements for petabyte-scale data ingestion, speeds up computation, and provides immediate feedback to ML engineers as soon as the first data block is processed. The streaming approach represents a better fit for the iterative experimentation workflow than traditional batch processing patterns.

The heterogeneous resource management provided by Ray solved the fundamental tension between data processing and training resource requirements. Rather than over-provisioning GPU instances to handle CPU-intensive data processing, the Ray cluster can allocate workloads to appropriate hardware and scale CPU and GPU resources independently. This resulted in both better performance and lower cost, demonstrating that resource-aware scheduling can deliver simultaneous improvements across multiple dimensions.

An unexpected finding was Ray's superior handling of large, complex features like user-sequence features, which delivered performance improvements even without additional data processing workloads. This suggests that Ray's architecture and implementation are well-suited to the specific data patterns common in recommendation systems, where features can be extremely large and complex.

The solution required horizontal scaling of CPU resources to achieve optimal data processing throughput, which adds some infrastructure complexity compared to single-node approaches. However, this complexity is abstracted by Ray's cluster management and the unified training job launcher, making it largely transparent to ML engineers. The trade-off of managing more nodes in exchange for better resource utilization and performance proved worthwhile.

Pinterest's experience validates the "scale when needed, learn fast" philosophy as opposed to the "scale first, learn last" problem they identified with workflow-based approaches. By making scaling elastic and integrated into the development workflow rather than requiring upfront infrastructure work, Ray enables ML engineers to iterate quickly on small scales and scale up when results are promising.

The adoption of Ray also positions Pinterest to leverage additional capabilities beyond data processing, including distributed training, hyperparameter tuning, and serving, all within a unified framework. This suggests a strategic advantage in standardizing on Ray as a common runtime for multiple MLOps components rather than maintaining separate specialized tools for each function.

One implicit lesson is the importance of measurement and benchmarking in platform decisions. Pinterest's careful benchmarking of training runtime and cost across different data processing complexity levels provided clear evidence of the benefits and helped justify the investment in adopting a new framework.

The article positions this implementation as the beginning of Pinterest's journey with Ray, indicating ongoing exploration of advanced usage patterns including feature importance and transfer learning. This suggests that the initial last-mile data processing use case is a foundation for broader Ray adoption, with additional capabilities to be unlocked as the platform matures.

For practitioners considering similar approaches, Pinterest's experience suggests that last-mile data processing within training jobs can be a viable and superior alternative to traditional ETL pipelines when implemented with the right framework. The key requirements are distributed processing capabilities, heterogeneous resource management, and streaming execution. Ray delivers all three while maintaining a simple, Python-based developer experience that integrates naturally with existing ML workflows.
