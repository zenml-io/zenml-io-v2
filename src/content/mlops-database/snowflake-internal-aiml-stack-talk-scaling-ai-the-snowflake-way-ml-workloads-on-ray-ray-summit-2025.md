---
title: "Scaling AI the Snowflake Way: ML Workloads on Ray | Ray Summit 2025"
slug: "snowflake-internal-aiml-stack-talk-scaling-ai-the-snowflake-way-ml-workloads-on-ray-ray-summit-2025"
draft: false
mlopsTags:
  - "compute-management"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "notebooks"
  - "pipeline-orchestration"
  - "databricks"
  - "docker"
  - "ray"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "monitoring"
  - "retraining"
  - "serving"
  - "training"
industryTags: "tech"
company: "Snowflake"
companySlug: "snowflake"
platformName: "internal AI/ML stack (talk)"
contentType: "video"
summary: "Snowflake developed a \"Many Model Framework\" to address the complexity of training and deploying tens of thousands of forecasting models for hyper-local predictions across retailers and other enterprises. Built on Ray's distributed computing capabilities, the framework abstracts away orchestration complexities by allowing users to simply specify partitioned data, a training function, and partition keys, while Snowflake handles distributed training, fault tolerance, dynamic scaling, and model registry integration. The system achieves near-linear scaling performance as nodes increase, leverages pipeline parallelism between data ingestion and training, and provides seamless integration with Snowflake's data infrastructure for handling terabyte-to-petabyte scale datasets with native observability through Ray dashboards."
link: "https://www.youtube.com/watch?v=VYWSAPLXtEs"
year: 2025
seo:
  title: "Snowflake: Scaling AI the Snowflake Way: ML Workloads on Ray | Ray Summit 2025 - ZenML MLOps Database"
  description: "Snowflake developed a \"Many Model Framework\" to address the complexity of training and deploying tens of thousands of forecasting models for hyper-local predictions across retailers and other enterprises. Built on Ray's distributed computing capabilities, the framework abstracts away orchestration complexities by allowing users to simply specify partitioned data, a training function, and partition keys, while Snowflake handles distributed training, fault tolerance, dynamic scaling, and model registry integration. The system achieves near-linear scaling performance as nodes increase, leverages pipeline parallelism between data ingestion and training, and provides seamless integration with Snowflake's data infrastructure for handling terabyte-to-petabyte scale datasets with native observability through Ray dashboards."
  canonical: "https://www.zenml.io/mlops-database/snowflake-internal-aiml-stack-talk-scaling-ai-the-snowflake-way-ml-workloads-on-ray-ray-summit-2025"
  ogTitle: "Snowflake: Scaling AI the Snowflake Way: ML Workloads on Ray | Ray Summit 2025 - ZenML MLOps Database"
  ogDescription: "Snowflake developed a \"Many Model Framework\" to address the complexity of training and deploying tens of thousands of forecasting models for hyper-local predictions across retailers and other enterprises. Built on Ray's distributed computing capabilities, the framework abstracts away orchestration complexities by allowing users to simply specify partitioned data, a training function, and partition keys, while Snowflake handles distributed training, fault tolerance, dynamic scaling, and model registry integration. The system achieves near-linear scaling performance as nodes increase, leverages pipeline parallelism between data ingestion and training, and provides seamless integration with Snowflake's data infrastructure for handling terabyte-to-petabyte scale datasets with native observability through Ray dashboards."
mlops:
  source: "sqlite"
  entryId: 196
  sourceUrl: "https://www.youtube.com/watch?v=VYWSAPLXtEs"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.617651"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Snowflake identified a critical challenge facing enterprise customers around forecasting at massive scale. Modern forecasting has evolved beyond simple linear modeling to handle complex, multimodal data sources including product feedback with images and visuals, social media mentions, and various external signals. Retailers need hyper-local predictions—forecasting sales or inventory at the granularity of individual products per store per geography using sophisticated transformer models. This translates to training tens of thousands of models concurrently, often multiple times daily as market dynamics shift.

The operational challenges are formidable. Organizations must orchestrate thousands of transformer models for training on a daily basis while managing fault tolerance, handling retries when training fails, providing observability into training progress, dynamically sizing clusters, and scaling compute resources up or down based on demand. External factors like seasonality (including seasons within seasons), long weekends, sporting events, geopolitical influences, and market disruptions add nonlinear complexity that makes transformers the most effective modeling approach. Without proper infrastructure, coordinating this becomes an intractable distributed systems problem—users would need to manually manage data partitioning, schedule training across partitions, handle failures, track which models succeeded or failed, and coordinate deployment of thousands of models to production.

The gap Snowflake aimed to fill was abstracting away all this orchestration complexity so data scientists could focus on model development rather than distributed systems engineering. The goal was to enable users to simply specify their partitioned data and training function, then let the platform handle all the operational heavy lifting.

## Architecture & Design

Snowflake's Many Model Framework is built on top of a container runtime service that leverages open-source Ray as its distributed computing backbone. The architecture provides a managed service layer that brings together Snowflake's data infrastructure with Ray's orchestration capabilities.

The overall data flow architecture follows a sophisticated pipeline design from top to bottom. Users provide one or multiple Snowflake tables with designated partition columns (such as store ID, product ID, or SKU). The framework automatically partitions these tables into multiple logical partitions based on the specified keys. A critical design decision is that the system does not wait for all partitions to be ready before beginning training—instead, it streams partitions to a queue as they become available, maximizing compute saturation from the start.

The data ingestion component involves two integrated stages. First, Snowflake warehouses load data from Snowflake tables to Snowflake stage storage, which is backed by Amazon S3, materializing the data as Arrow IPC files. Second, the framework leverages Ray Data with a custom Ray Data source implementation to download these Arrow IPC files from S3 in parallel across many Ray tasks, efficiently distributing data to Ray actors. As each Arrow IPC file for a specific partition becomes ready, it's pushed to a queue.

A background thread continuously monitors this queue, and whenever it detects a new partition is ready, it submits a reference to the Arrow IPC file along with the partition ID to an actor pool. The actor pool designates a specific actor to use the Ray Data source to download the files via Ray tasks in parallel, then execute the user-specified training function on that partition's data.

A particularly notable architectural feature is dynamic scaling capability. The framework includes an "actor pool scaler" component that detects when new nodes join the cluster during an active training run. When additional GPU or CPU nodes are added mid-workflow, the system automatically creates new actors on those nodes that can pull work from the queue, accelerating training without interrupting existing work. This allows users to scale up when they realize they need more resources or scale down to save costs, all without stopping and restarting the workflow.

Once models are trained across all partitions, the framework coalesces them into a single referenceable asset in Snowflake's model registry. This unified artifact maintains the partitioning structure, enabling partition-aware inference where predictions are automatically routed to the correct sub-model based on the partition key values in incoming data.

## Technical Implementation

The implementation is deeply integrated with Snowflake's existing infrastructure stack while leveraging Ray as the distributed compute engine. The container runtime service is built over open-source Ray and provides a managed environment that spins up for every notebook session or job execution.

Users interact with the framework through Snowflake notebooks, which can run on various machine configurations. In the demonstration, the system started with a single CPU node (medium size with six CPUs) and scaled to two nodes during execution. The programming model is designed for simplicity—users define a training function that accepts two arguments: a data connector object associated with one specific data partition, and a context object providing metadata like the partition ID being processed.

The training function itself can use any standard ML frameworks. The demo showed a simple PyTorch model with a standard PyTorch DataLoader, training for several epochs and returning the trained model. The framework handles all parallelization, fault tolerance, and orchestration transparently. Users can intentionally inject failures (as demonstrated with partition ID 5 throwing an error) to test fault handling.

The data preparation leverages Snowflake sessions to access data, with helper functions to create features like 14-day sliding windows for time series forecasting. The system uses Snowflake stages (S3-backed storage) to persist training artifacts and intermediate results.

The framework provides multiple layers of observability. A live progress indicator shows training status and incremental completion as partitions finish. Resource usage monitoring displays metrics for all nodes in the cluster. For advanced users, the native Ray dashboard is exposed, showing detailed views of nodes, jobs, actors, and task execution—enabling deep investigation and debugging.

Error handling is sophisticated. When training fails for specific partitions, users can query progress to see which partitions succeeded versus failed. The system captures full error traces for failed partitions, and users can selectively retrain only the failed partitions by specifying their IDs, saving both time and compute costs.

Model registration integrates seamlessly with Snowflake's model registry. After training, models are logged to the registry where they appear as a unified object with metadata about input/output schemas and individual model artifacts for each partition (e.g., 10 PyTorch models for 10 stores). Users can download individual partition models or perform inference through the unified interface.

For inference, the framework provides partition-aware routing. Users create an inference dataset and pass it to the model object with the data source and partition ID column specified. The system automatically routes each row to the correct sub-model based on the partition key, ensuring predictions come from the appropriate model without manual coordination.

The scaling API is asynchronous—users can issue scale-up commands while compute is working on pulling Docker images and starting containers, allowing training to begin immediately. When new nodes join, they're automatically incorporated into the Ray cluster and new actors are created to pick up workloads from the queue.

## Scale & Performance

The Many Model Framework demonstrates strong scalability characteristics validated through performance testing. Even on a single node, the framework shows performance improvements compared to serial training as partition size increases. This gain comes primarily from pipeline parallelism—the overlapping of data ingestion and training operations means training can begin on early partitions while later partitions are still being prepared and loaded.

The most significant performance improvements come from horizontal scaling. When scaling from a single node to multiple nodes, performance scales nearly linearly with the number of nodes added. In the presented results, the two-node configuration showed approximately 2x speedup compared to single-node execution, represented by the green performance line being nearly half the duration of the single-node baseline.

The demo scenario trained models across 10 store partitions, showing incremental progress in groups of two as the two-node cluster processed partitions in parallel. The system handled tens of thousands of models in production scenarios (mentioned as the typical use case for retailers with many SKUs and store locations), though specific throughput numbers weren't provided in the presentation.

The framework handles terabyte-to-petabyte scale data from Snowflake warehouses, efficiently distributing this data across distributed Ray clusters through parallelized S3 downloads via Arrow IPC format. The use of Arrow provides efficient columnar data transfer that works well with both the Snowflake data infrastructure and modern ML frameworks.

The time series forecasting example used 14 days of historical features to predict next-day sales, demonstrating a realistic window size for retail forecasting applications. Training progress and resource utilization were visible in real-time, with the system showing live updates as partitions completed training.

## Trade-offs & Lessons

The Many Model Framework represents several important architectural choices and trade-offs that provide valuable lessons for practitioners building similar systems.

The decision to build on Ray rather than implementing a custom distributed training system proved highly beneficial. Ray provided production-ready primitives for actor management, task scheduling, fault tolerance, and cluster coordination. By leveraging open-source Ray and wrapping it with Snowflake-specific integrations, the team avoided reinventing distributed systems infrastructure while gaining access to Ray's mature ecosystem and tooling like the Ray dashboard.

The abstraction layer is carefully designed—users only need to provide partitioned data, partition keys, and a training function. This dramatically lowers the barrier to entry for data scientists who may not have distributed systems expertise. However, this simplicity doesn't sacrifice power; advanced users can still access the native Ray dashboard and tune cluster configurations for their specific needs. This balance between ease of use and flexibility is a key architectural success.

The streaming architecture where training begins before all partitions are loaded is a notable optimization. Rather than waiting for all data to be ready (which could take significant time with terabyte-scale datasets), the system maximizes resource utilization by keeping compute busy as soon as any partition is available. This pipeline parallelism between ingestion and training delivers measurable performance gains even on single nodes.

Dynamic scaling without workflow interruption is particularly valuable for long-running training jobs where users may not know optimal resource requirements upfront. The ability to add GPU nodes mid-training when bottlenecks are discovered, or scale down when workloads complete, provides both performance flexibility and cost optimization. This contrasts with traditional approaches requiring job restart for cluster resizing.

The fault tolerance model is practical and user-friendly. Rather than failing entire training runs when a single partition fails, the system tracks success and failure per partition, captures full error context, and enables selective retraining. This is crucial at scale—with thousands of models, some failures are inevitable, and the ability to retry just the failed subset saves substantial compute and time.

Integration with Snowflake's existing data infrastructure provides significant operational advantages. Data doesn't need to move to external systems—it flows directly from Snowflake tables through Snowflake stages (S3-backed) to Ray clusters. This tight integration reduces data movement overhead and keeps everything within the Snowflake security and governance model.

The model registry integration completing the end-to-end workflow is essential. Training thousands of models is only useful if they can be operationalized. By coalescing partition-specific models into a unified registry artifact with partition-aware routing, the framework solves both the training and serving challenges in a cohesive way.

Performance scaling is good but not perfect. The near-linear scaling (approximately 2x speedup with 2x nodes) suggests reasonable efficiency, though perfect linear scaling would be ideal. Likely some overhead exists in coordination, data transfer, and partition distribution across nodes. For practitioners, this means adding nodes provides clear benefits, but diminishing returns may appear at very high node counts depending on workload characteristics.

The custom Ray Data source implementation for Arrow IPC files represents a common pattern—building specialized data connectors that integrate enterprise data infrastructure with distributed ML frameworks. This engineering investment enables efficient parallel data loading while maintaining compatibility with existing data platforms.

One consideration is the framework's tight coupling to Snowflake's ecosystem. While this provides excellent integration for Snowflake users, it's not a general-purpose solution portable to other environments. Organizations not using Snowflake would need to adapt the architecture significantly, particularly the data ingestion and registry components.

The presentation's focus on forecasting with transformers reflects a common enterprise pattern—complex models at massive scale for time series prediction. However, the architecture appears general enough to support other model types and use cases where many models need training across data partitions, such as personalized recommendations, customer segmentation, or anomaly detection per entity.

For practitioners considering similar architectures, key takeaways include: leverage mature distributed frameworks like Ray rather than building from scratch; invest in streaming architectures that overlap data loading and compute; provide simple abstractions for common cases while exposing advanced controls for power users; build fault tolerance that enables partial retries rather than all-or-nothing execution; and ensure tight integration between training and serving to complete the end-to-end ML lifecycle.
