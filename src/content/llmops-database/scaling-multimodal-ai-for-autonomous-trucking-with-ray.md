---
title: "Scaling Multimodal AI for Autonomous Trucking with Ray"
slug: "scaling-multimodal-ai-for-autonomous-trucking-with-ray"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "data-analysis"
  - "data-cleaning"
  - "data-integration"
  - "multi-modality"
  - "unstructured-data"
  - "realtime-application"
  - "classification"
  - "reinforcement-learning"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "microservices"
  - "scaling"
  - "serverless"
  - "devops"
  - "orchestration"
  - "open-source"
  - "scalability"
  - "pytorch"
  - "fastapi"
  - "redis"
  - "cache"
industryTags: "automotive"
company: "Torc Robotics"
summary: "Torc Robotics, a company developing autonomous semi-truck technology with over 20 years of experience in safety-critical self-driving applications, faced significant challenges in scaling their multimodal AI workloads for their AV 3.0 architecture. The company needed to handle massive amounts of diverse sensor data including camera images, lidar point clouds, and other telemetry while training complex perception, prediction, and planning models in an end-to-end differentiable manner. By adopting Ray as their core infrastructure backend and implementing a modular transform-based architecture, Torc consolidated previously fragmented training, auto-labeling, and simulation pipelines into unified graph-based workflows. This enabled them to scale from processing 4TB to 40TB per training epoch within 16 months, optimize GPU utilization by distributing CPU-bound work horizontally across cheaper instances, and achieve cost and performance improvements while supporting both open-loop batch training and closed-loop reinforcement learning scenarios. The solution emphasized heterogeneous compute scheduling, Arrow-native data formats, intelligent shuffling strategies, and a clear separation of concerns between MLOps infrastructure teams and model developers."
link: "https://www.youtube.com/watch?v=8UFDsr6B6BY"
year: 2026
seo:
  title: "Torc Robotics: Scaling Multimodal AI for Autonomous Trucking with Ray - ZenML LLMOps Database"
  description: "Torc Robotics, a company developing autonomous semi-truck technology with over 20 years of experience in safety-critical self-driving applications, faced significant challenges in scaling their multimodal AI workloads for their AV 3.0 architecture. The company needed to handle massive amounts of diverse sensor data including camera images, lidar point clouds, and other telemetry while training complex perception, prediction, and planning models in an end-to-end differentiable manner. By adopting Ray as their core infrastructure backend and implementing a modular transform-based architecture, Torc consolidated previously fragmented training, auto-labeling, and simulation pipelines into unified graph-based workflows. This enabled them to scale from processing 4TB to 40TB per training epoch within 16 months, optimize GPU utilization by distributing CPU-bound work horizontally across cheaper instances, and achieve cost and performance improvements while supporting both open-loop batch training and closed-loop reinforcement learning scenarios. The solution emphasized heterogeneous compute scheduling, Arrow-native data formats, intelligent shuffling strategies, and a clear separation of concerns between MLOps infrastructure teams and model developers."
  canonical: "https://www.zenml.io/llmops-database/scaling-multimodal-ai-for-autonomous-trucking-with-ray"
  ogTitle: "Torc Robotics: Scaling Multimodal AI for Autonomous Trucking with Ray - ZenML LLMOps Database"
  ogDescription: "Torc Robotics, a company developing autonomous semi-truck technology with over 20 years of experience in safety-critical self-driving applications, faced significant challenges in scaling their multimodal AI workloads for their AV 3.0 architecture. The company needed to handle massive amounts of diverse sensor data including camera images, lidar point clouds, and other telemetry while training complex perception, prediction, and planning models in an end-to-end differentiable manner. By adopting Ray as their core infrastructure backend and implementing a modular transform-based architecture, Torc consolidated previously fragmented training, auto-labeling, and simulation pipelines into unified graph-based workflows. This enabled them to scale from processing 4TB to 40TB per training epoch within 16 months, optimize GPU utilization by distributing CPU-bound work horizontally across cheaper instances, and achieve cost and performance improvements while supporting both open-loop batch training and closed-loop reinforcement learning scenarios. The solution emphasized heterogeneous compute scheduling, Arrow-native data formats, intelligent shuffling strategies, and a clear separation of concerns between MLOps infrastructure teams and model developers."
notion:
  pageId: "380f8dff-2538-8062-9631-e512b8217230"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-15T10:31:00.000Z"
  lastEditedTime: "2026-06-15T10:31:00.000Z"
  publishedAt: "2026-06-19T11:11:17Z"
---

## Overview

Torc Robotics represents a compelling case study in deploying and scaling multimodal AI systems for autonomous vehicle applications, specifically for autonomous semi-trucks targeting the US long-haul freight market. Founded in 2005 with engineering centers in Ann Arbor and Montreal, Torc has evolved through multiple generations of autonomous vehicle architectures, ultimately arriving at their AV 3.0 system which emphasizes end-to-end learned approaches with composable, introspectable modules and heuristic guardrails. The company's mission addresses a $200 billion market opportunity by 2030, targeting driver shortages expected to reach 160,000 positions and addressing safety concerns where over 90% of traffic accidents are caused by driver error.

While this case study does not involve LLMs in the traditional generative AI sense, it provides extensive insights into production ML operations, infrastructure challenges, and operational patterns that are highly relevant to the broader LLMOps and MLOps communities. The architectural patterns, scaling strategies, and operational lessons learned apply directly to any organization deploying complex AI systems at scale, including those working with large language models and multimodal foundation models.

## Product Architecture and Technical Foundation

Torc's AV 3.0 architecture represents an evolution from purely heuristic approaches through end-to-end black-box systems toward what they describe as composable, introspectable modules with end-to-end differentiable optimization. The system is structured around three major stages: perception, prediction, and planning. Critically, all three stages are connected in an end-to-end differentiable optimization process, allowing gradients to flow through the entire stack. This enables joint optimization of all components while maintaining the ability to measure and improve individual modules independently.

Within the perception stack alone, the architecture includes multiple specialized components: camera processing branches, online calibration systems, bird's eye view projection modules, and 3D scene modeling components. Each can be trained independently, but the end-to-end approach ensures that improvements in one component, such as online calibration, actually impact downstream performance rather than optimizing in isolation. This modular yet jointly optimized approach allows Torc to maintain component-level observability while ensuring the entire system behavior is optimized for how the truck actually drives itself, not just isolated metrics like image-based detection accuracy.

## Data Engineering Loop and Development Philosophy

Torc describes their development process as a highly iterative data engineering loop with two conceptual phases: forward pass and backward pass. The forward pass involves taking data from multiple sources including captured truck sensor data, neural rendering systems, and third-party sources, then processing it through auto-labeling, curation, and data preparation systems to create training datasets. This distilled data then flows through model training in what they call data-driven product engineering.

The backward pass represents their data-driven requirement engineering phase. Here, insights from data analysis and system performance evaluations generate two types of requirements: data requirements identifying where domain coverage needs expansion or where specific scenarios need rendering, and product requirements identifying gaps in metric computation and testing frameworks. This bidirectional loop ensures continuous improvement not just of models but of the data collection and evaluation infrastructure itself.

However, as Torc evolved from AV 1.0 through 2.0 to 3.0, they accumulated significant technical debt. Different systems for training, testing, data extraction, annotation, and preparation were developed using different technology backends. Some deployed as ECS-style services while others used expensive cloud platforms like AWS SageMaker. Each system defined its own data formats, metrics, optimization loops, and library dependencies, resulting in fragmented code spread across the organization with significant duplication.

## The ML System Debt Problem

Torc explicitly references Google's influential 2015 paper on machine learning system debt, acknowledging they experienced the same challenges. Much of their ML work focused narrowly on model training, but each individual pipeline required its own data collection systems, configuration management, resource pooling, and verification processes. This created sprawling codebases with embarrassing levels of duplication, including multiple incompatible implementations of basic operations like intersection-over-union calculations.

The company identified four core demands for their unified infrastructure to support AV 3.0 development. First, they needed to handle the combinatorial explosion of components they wanted to stitch together and optimize jointly. Second, they required the ability to process multimodal data at much larger scale since end-to-end datasets couldn't be specialized per task. Third, they needed to manage gradient flow and information transfer across all components in a unified way rather than maintaining separate systems for perception versus planning models. Fourth, they needed to support both open-loop batch training for supervised learning and closed-loop simulation for reinforcement learning scenarios.

## Ray as the Unified Infrastructure Backend

To address these challenges, Torc selected Ray as their core infrastructure backend, building a layered architecture on top of it. The bottom layer consists of common compute and cloud systems including S3 storage, tabular backends, and commodity or specialized hardware. Above this sits a compute platform layer making it easy to schedule work. The next layer leverages Ray primitives including Ray Core, Ray Data, Ray Train, Ray Tune, and Ray Serve for flexible work scheduling. On top of the scheduling layer, they built shared component libraries for common operations like data reading, writing, transformations on dense sensor data, transformations on sparse detection data, and GPU-accelerated operations. Finally, these three foundational layers compose into various applications and frameworks for different purposes.

A core philosophical shift Torc adopted was asking "why is this not a transform on data?" for every operation. They define transforms as any unit operation taking data as input and producing data as output, treating this as a very flexible set of unit work applicable to datasets. Some transforms are optimized for GPU execution like model inference or point cloud voxelization, while others distribute efficiently across CPUs. By creating shared component libraries defined as individual operations with clear input and output data contracts, they achieved flexible composition as long as data interfaces were understood.

This transform-centric philosophy led to a graph-based system architecture where every large-scale system is fundamentally a directed acyclic graph of transforms. For example, batch training and auto-labeling share common operations like reading data, voxelizing point clouds, and data preparation, but differ in how they use models—training mode with backpropagation versus inference-only mode. Different output sinks attach to these graphs depending on whether users want to debug locally, stream to cloud storage, or reference results for testing and visualization.

## Four Core Graph Types and Workload Patterns

Torc standardized around four core graph types or pillar techniques. Batch training represents the well-known open-loop training pattern for supervised or unsupervised learning, loading data, augmenting and preparing it, streaming to the model in an optimization loop, and saving metrics and debugging outputs. Auto-labeling follows a similar open-loop streaming graph structure but uses models purely for inference.

The more complex patterns involve simulation. Open-loop simulation includes replay scenarios where components receive data from previously captured or rendered examples without affecting the world state. Closed-loop simulation requires components to feed planning decisions back into the world simulation stack while maintaining physical consistency and rule-of-road adherence. Reinforcement learning training extends closed-loop simulation with an additional feedback loop for policy optimization, creating multiple nested loops where ML models impact simulation which generates training data for model updates.

Each graph type presents unique scaling challenges. Supervised batch training deals with multi-terabyte scale data per epoch, requiring streaming pipelines capable of handling massive throughput. Auto-labeling has similar data scale but different model operation modes. Closed-loop simulation can no longer leverage batch processing techniques and requires new schedulers to scale effectively. The modular architecture separates scheduling concerns from component definitions, allowing the same components to be reused across all four graph types.

## Organizational Structure and Separation of Concerns

Torc adopted an intentional organizational structure recognizing that teams tend to ship their org chart. They split responsibilities between two teams. The MLOps team, including resident Ray experts working closely with Anyscale, owns horizontal scaling and optimization. This team figures out distributed systems problems, tuning parameters for performance and resource utilization. Model developers serve as domain experts who write transforms and application logic without needing deep Ray expertise. The shared transform library serves as the contract between teams.

This separation of concerns proved effective in practice. Model developers write transforms once, and the MLOps team handles scaling. The MLOps team codifies optimization lessons as patterns and eventually as agent skills for automation. They diagnose bottlenecks, patch configurations, and redeploy without necessarily understanding bespoke transform code written by model developers. This enables a config-first optimization approach where users adjust scaling compute configurations rather than modifying code.

## Scaling Results and Performance Improvements

The results of this architectural transformation were substantial. In January 2025, Torc was scheduling many underutilized GPU instances while learning to use Ray effectively. As they optimized workloads, they significantly reduced GPU instance counts while maintaining high throughput by distributing CPU-bound work appropriately. Simultaneously, users became more interested in scheduling complex workloads as compute became easier to use efficiently.

For their multitask object detection perception training model, Torc achieved significant performance gains. Compared to baseline PyTorch Lightning implementations, they optimized not just single-instance multi-GPU cases but dramatically improved multi-instance multi-GPU scenarios. Perhaps most importantly, they achieved equivalent throughput using 32 GPUs on much cheaper G5.16xlarge or more available G5.24xlarge instances compared to dense G5.48xlarge instances. This meant scheduling work based on GPU or CPU type rather than rigid compute instance types, enabling gang scheduling according to cloud provider availability at any given time and significantly increasing workload capacity.

## Data Scale Growth and Infrastructure Flexibility

The data scale growth Torc experienced demonstrates the infrastructure's flexibility. Between January 2025 and April 2025, their image object detection pipeline went from processing approximately 4TB per epoch to roughly 40TB per epoch—a 10X increase in just 16 weeks. Critically, they did not need to rebuild or rearchitect training jobs to accommodate this growth. They simply distributed and tuned pipelines appropriately, paying additional costs in time or money for compute but maintaining the same code and architecture.

Similar improvements appeared in auto-labeling pipelines. A data extraction operation taking over two hours in October 2024 was transformed by early 2026 to run multiple operations including data extraction, point cloud aggregation, and image downsampling all in less time using the same pipeline structure. This scalability proved essential as they scaled data operations to feed their end-to-end architecture requirements.

## Heterogeneous Compute and GPU Optimization

One of the critical insights from Torc's optimization work involved recognizing that GPUs, while expensive, were not necessarily the most important resources. CPUs turned out to be most important because they enabled horizontal distribution of work in flexible and cost-effective ways. By distributing CPU-bound preprocessing work across many cheaper CPU instances, GPUs received hot streams of prepared data rather than sitting starved and underutilized.

This heterogeneous compute approach leveraged Ray Data's ability to schedule different transforms on different node types. CPU workers handled data-intensive preprocessing while GPU nodes were reserved specifically for GPU-accelerated transforms and model forward/backward passes. This prevented overpaying for CPU memory and compute co-located with expensive GPUs. The flexibility to throw in cheap CPU workers while keeping GPU nodes constant significantly reduced job costs while maintaining or improving throughput.

Anyscale's platform capabilities enhanced this further by supporting spot instance usage and graceful transitions when spot capacity became unavailable. This operational flexibility meant Torc could scale workloads up when deadlines approached or scale down when resource contention existed, all through configuration changes rather than code modifications.

## Deep Dive: Bird's Eye View Model Training Optimization

Torc provided detailed lessons learned from optimizing a particularly challenging production workload—a bird's eye view model processing approximately 91,000 multimodal scenes. Each scene consisted of multiple surround cameras at 1920x1080 resolution, camera depth data, and lidar sweeps. This workload exemplified the extreme demands of multimodal autonomous vehicle data.

The optimization journey yielded several hard-learned lessons. First, they discovered pipeline topology matters significantly. Identifying the correct bottleneck task and tuning concurrency properly allows Ray to handle heavy lifting through appropriate back pressure policies. Once properly configured, the system delivers stable, optimized jobs with proper throughput streaming and effective resource utilization across all nodes.

They developed custom observability metrics, particularly a throughput callback measuring whether GPUs were properly utilized. If throughput was poor, they focused on Ray Data pipeline aspects. If throughput was good but training was slow, they optimized the model loop itself. This separation of concerns in debugging proved valuable for rapid iteration.

## Technical Optimization Lessons

Through profiling and iterative tuning, changing one thing at a time, Torc learned several specific technical lessons. First, fusing identical resource requirement transforms using Ray's compute task batching strategy reduced data transfer by keeping data on single nodes through multiple transform steps. Second, repartitioning before heavy IO transforms prevented bottlenecks that arose when metadata-heavy data caused Ray Data to automatically reduce block counts. Third, setting CPU requirements below one allowed oversubscription of nodes for heavy IO operations, scaling up throughput further.

Fourth, moving expensive collate functions into the data reading phase enabled fan-out and increased parallelization of tensor conversion operations. Fifth, shuffling strategy dramatically impacted throughput. Shuffling on metadata before loading unstructured data avoided expensive data movement across nodes. Where possible, avoiding expensive global shuffles in favor of randomizing blocks then randomizing rows within blocks maintained training generalization while improving performance.

Over time, these lessons became tribal knowledge, leading Torc to codify them as agentic skills with Anyscale's help. This enables automating the diagnose-patch-redeploy loop for end users. When the team identifies bottlenecks in jobs and recognizes recurring patterns, they codify solutions within agent skills. Every optimization started from dashboard analysis rather than code inspection, reinforcing the separation between MLOps infrastructure teams and model developers with their bespoke transforms.

## Data Format and Serialization Optimization

Another critical lesson involved maintaining Apache Arrow compatibility and avoiding nested data structures. Excessive serialization and deserialization overhead arose from custom Arrow extensions. By shifting toward Arrow-native schema formats for their data, they dramatically reduced the cost of serialization and deserialization. The presenters showed examples of Arrow-native extensions they adopted and the volume of data flowing through pipelines, emphasizing that schema changes alone enabled significant performance improvements by being Arrow-first in their approach.

## GPU Utilization and Memory Management

Proper fleet sizing for workloads enabled excellent resource utilization. Charts showed steady GPU memory usage patterns achieved through Ray Data's heterogeneous compute layer allowing CPU transforms and GPU transforms to run on appropriately matched nodes. Rather than needing bigger GPUs, Torc stopped overpaying for CPU memory by distributing that work to dedicated CPU workers. This architectural flexibility meant optimizing jobs by reducing cost significantly—keeping expensive GPU nodes the same while adding cheaper CPU workers as needed.

## Dashboards and Observability

The Anyscale dashboard provided essential observability without requiring custom metric development. The Ray Data map batches visualization showed the transform DAG with each box representing a transform operation. These dashboards enabled the team to identify bottlenecks and tune jobs without deep code inspection. The ability to see pipeline topology, task execution patterns, and resource utilization at a glance proved essential for scaling operations effectively.

## Broader Implications for MLOps and LLMOps

While Torc's case study focuses on autonomous vehicle perception and planning models rather than large language models, the operational patterns, infrastructure decisions, and scaling strategies translate directly to LLMOps contexts. The challenges of managing multimodal data at massive scale, optimizing heterogeneous compute resources, building composable transform libraries, maintaining separation of concerns between infrastructure and application teams, and creating observable, debuggable systems all apply to organizations deploying LLMs and multimodal foundation models in production.

The emphasis on avoiding platform debt through unified infrastructure, treating everything as data transforms in DAGs, optimizing for horizontal scalability before perfecting individual components, and building config-first systems that non-experts can use effectively represents mature MLOps thinking applicable across AI domains. The specific technical lessons around Arrow serialization, shuffling strategies, heterogeneous compute scheduling, and GPU optimization provide concrete patterns that LLMOps practitioners can adapt to their own contexts.

## Critical Assessment and Balanced Perspective

As this presentation was delivered as a joint webinar between Torc Robotics and Anyscale, it naturally emphasizes the successes achieved using Ray and the Anyscale platform. The presenters acknowledge they are "resident rayiacs" and strong advocates for the technology. While the technical details and performance improvements appear credible and are supported with specific metrics and timelines, prospective adopters should recognize this represents a success story from satisfied customers rather than an independent evaluation.

The case study demonstrates genuine engineering depth with specific examples of challenges, failed approaches, and iterative optimization. The acknowledgment of accumulating technical debt, the reference to Google's ML system debt paper, and the detailed discussion of what didn't work initially lend credibility to the narrative. However, organizations considering similar approaches should evaluate whether Ray's specific architecture and programming model fit their team capabilities, existing infrastructure, and specific workload characteristics.

The separation of concerns between MLOps infrastructure teams and model developers requires organizational maturity and sufficient scale to justify dedicated infrastructure specialists. Smaller organizations might find the operational overhead of managing Ray clusters and developing transform libraries outweighs the benefits. The heavy emphasis on multimodal sensor data processing for autonomous vehicles may not directly translate to organizations primarily working with text, audio, or other data modalities without significant adaptation.

Nevertheless, the fundamental insights about avoiding fragmented infrastructure, building composable systems, optimizing heterogeneous compute, and maintaining clear interfaces between teams represent valuable lessons for any organization operating ML systems at production scale. The specific performance improvements, cost reductions, and scaling achievements provide concrete evidence that the architectural choices delivered measurable value for Torc's particular use case.
