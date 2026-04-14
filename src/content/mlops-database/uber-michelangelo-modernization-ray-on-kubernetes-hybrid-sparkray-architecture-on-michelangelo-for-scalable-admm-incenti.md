---
title: "Hybrid Spark–Ray architecture on Michelangelo for scalable ADMM incentive budget allocation"
slug: "uber-michelangelo-modernization-ray-on-kubernetes-hybrid-sparkray-architecture-on-michelangelo-for-scalable-admm-incenti"
draft: false
mlopsTags:
  - "compute-management"
  - "feature-store"
  - "model-serving"
  - "pipeline-orchestration"
  - "databricks"
  - "docker"
  - "horovod"
  - "kubernetes"
  - "ray"
  - "spark"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Uber"
companySlug: "uber"
platformName: "Michelangelo modernization + Ray on Kubernetes"
contentType: "blog"
summary: "Uber adopted Ray as a distributed compute engine to address computational efficiency challenges in their marketplace optimization systems, particularly for their incentive budget allocation platform. The company implemented a hybrid Spark-Ray architecture that leverages Spark for data processing and Ray for parallelizing Python functions and ML workloads, allowing them to scale optimization algorithms across thousands of cities simultaneously. This approach resolved bottlenecks in their original Spark-based system, delivering up to 40x performance improvements for their ADMM-based budget allocation optimizer while significantly improving developer productivity through faster iteration cycles, reduced code migration costs, and simplified deployment processes. The solution was backed by Uber's Michelangelo AI platform, which provides KubeRay-based infrastructure for dynamic resource provisioning and efficient cluster management across both on-premises and cloud environments."
link: "https://www.uber.com/blog/how-uber-uses-ray-to-optimize-the-rides-business/"
year: 2025
seo:
  title: "Uber: Hybrid Spark–Ray architecture on Michelangelo for scalable ADMM incentive budget allocation - ZenML MLOps Database"
  description: "Uber adopted Ray as a distributed compute engine to address computational efficiency challenges in their marketplace optimization systems, particularly for their incentive budget allocation platform. The company implemented a hybrid Spark-Ray architecture that leverages Spark for data processing and Ray for parallelizing Python functions and ML workloads, allowing them to scale optimization algorithms across thousands of cities simultaneously. This approach resolved bottlenecks in their original Spark-based system, delivering up to 40x performance improvements for their ADMM-based budget allocation optimizer while significantly improving developer productivity through faster iteration cycles, reduced code migration costs, and simplified deployment processes. The solution was backed by Uber's Michelangelo AI platform, which provides KubeRay-based infrastructure for dynamic resource provisioning and efficient cluster management across both on-premises and cloud environments."
  canonical: "https://www.zenml.io/mlops-database/uber-michelangelo-modernization-ray-on-kubernetes-hybrid-sparkray-architecture-on-michelangelo-for-scalable-admm-incenti"
  ogTitle: "Uber: Hybrid Spark–Ray architecture on Michelangelo for scalable ADMM incentive budget allocation - ZenML MLOps Database"
  ogDescription: "Uber adopted Ray as a distributed compute engine to address computational efficiency challenges in their marketplace optimization systems, particularly for their incentive budget allocation platform. The company implemented a hybrid Spark-Ray architecture that leverages Spark for data processing and Ray for parallelizing Python functions and ML workloads, allowing them to scale optimization algorithms across thousands of cities simultaneously. This approach resolved bottlenecks in their original Spark-based system, delivering up to 40x performance improvements for their ADMM-based budget allocation optimizer while significantly improving developer productivity through faster iteration cycles, reduced code migration costs, and simplified deployment processes. The solution was backed by Uber's Michelangelo AI platform, which provides KubeRay-based infrastructure for dynamic resource provisioning and efficient cluster management across both on-premises and cloud environments."
mlops:
  source: "sqlite"
  entryId: 175
  sourceUrl: "https://www.uber.com/blog/how-uber-uses-ray-to-optimize-the-rides-business/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.616764"
  lastUpdated: "2026-04-14T19:55:41.089609"
---

## Problem Context

Uber faces significant computational efficiency challenges when scaling machine learning and optimization solutions across their massive global marketplace. The company operates numerous levers to manage marketplace health and efficiency, including driver incentives and rider promotions. Determining optimal settings for these levers across thousands of cities requires solving complex optimization problems weekly, with control variables remaining in effect for each week-long period.

The core problem involves maximizing an objective function that delivers business value by adjusting city-level control variables while maintaining marketplace health constraints. This requires a system capable of handling vast amounts of observational and experimental data for model training and inference while accommodating many decision variables at city granularity.

Uber's original approach relied entirely on Apache Spark for distributed computations across a workflow that included feature store processing, ML model training and serving for budget allocation predictions, and optimization-based budget allocation evaluation. While Spark performed well for data processing tasks, it proved inadequate for parallelizing Pandas operations and custom Python code. The team experimented with Pandas UDFs and multi-threading but found speed improvements insufficient. The system exhibited three major bottlenecks: Spark's inability to naturally parallelize arbitrary Python functions, difficulties scaling high-concurrency lightweight parallel operations across thousands of cities, and substantial code migration costs that would be required to move away from their Spark-based legacy codebase.

## Architecture & Design

Uber designed a hybrid execution architecture that strategically combines Spark and Ray to leverage the strengths of each framework. The fundamental principle is straightforward: data processing work runs on Spark while parallel Python functions execute on Ray. This design allows the company to avoid choosing between frameworks and instead benefit from both.

The architecture positions the Spark driver as the application master, with application code primarily running on the Spark driver node. The workflow follows a coordinated pattern where the Spark driver distributes data loading from HDFS and data preprocessing tasks to Spark executors for data-related computations. When the Spark driver encounters computations that cannot be efficiently parallelized on Spark, it delegates these tasks to the Ray cluster, which functions as an external computation server operating on request.

The data flow through the system begins with a feature store system that processes data and populates features for machine learning models. This feeds into the ML model training component, which handles model training and serving for predicting budget allocations. The third component performs optimization and evaluation based on the objective function to identify optimal budget allocation solutions.

Ray receives function requests from the Spark driver, executes them in parallel across its cluster, and returns results back to the Spark driver upon completion. The Spark driver then summarizes Ray's output and performs data post-processing in collaboration with Spark executors before writing the final output dataframe back to HDFS. Ray's internal controller manages task arrangement sent to the cluster, eliminating the need for a custom orchestrator to monitor existing tasks or a message queue to organize waiting tasks.

For data transmission between clusters, Uber introduced HDFS as an intermediate storage layer for large dataset transfers at the GB or TB level. This approach addresses multiple concerns: it provides greater bandwidth compared to direct cluster-to-cluster communication, avoids data serialization and deserialization overhead, eliminates slow Pandas conversion speeds on the Spark driver, and prevents potential out-of-memory issues. Spark writes data directly to HDFS as Parquet files, and Ray's data API loads data from HDFS into the Ray cluster.

The deployment infrastructure includes an object store like Amazon S3 as an intermediate storage layer for application code. Users provide a basic Docker image containing only libraries, while changed application code deploys in real time without requiring new Docker image builds. This optimization reduced job deployment and launch time from 15-20 minutes to under 2 minutes.

## Technical Implementation

The technical stack centers on a hybrid Spark-Ray architecture built on Kubernetes infrastructure. Uber's Michelangelo AI platform provides the foundational backend, provisioning Ray clusters dynamically through KubeRay based on job requirements including node count, CPU, GPU, and memory specifications.

The cluster provisioning workflow begins when Ray clusters are initiated upon job submission. The Ray head node establishes first, then discovers and connects all Ray worker nodes. Applications connect to the Ray head node, which coordinates distributed execution of Ray tasks across worker nodes. Connection details for the Ray head node are automatically discovered and provided to applications, enabling seamless execution without manual intervention. After job completion, applications request resource deallocation from the compute layer, releasing resources back to the pool for efficient utilization.

For the budget allocation optimization use case, Uber implements the ADMM (Alternating Direction Method of Multipliers) algorithm, chosen for its ability to solve non-linear, non-convex, differentiable problems with simple conic constraints and smoothness conditions. ADMM's natural parallelizability makes it particularly suitable for scaling across cities and levers.

The ADMM implementation translates the optimization problem into a formulation with update steps executed in a loop. The first step solves individual city problems in parallel using Ray with a primal-dual interior point algorithm implemented in cvxopt. The rho parameter can be tuned to ensure the problem has a positive semi-definite Hessian. The second step has an analytical solution, and the third step is trivial. Each city-week optimization function completes in approximately 1-2 seconds, but the system must handle thousands of these lightweight, high-concurrency functions simultaneously.

The ADMM workflow consists of problem initialization, followed by a recurrent optimization loop that solves individual city problems for each week in parallel using Ray, summarizes city optimization results in Spark, updates cross-city constraint variables in Spark, updates slack variables in Spark, and checks convergence criteria in Spark. Finally, the system records optimal allocation values, metadata, and convergence variables.

Uber's Michelangelo platform extended Ray integration beyond core services to include Horovod with Ray, Ray XGBoost, Ray Data, heterogeneous training clusters, and Ray Tune. This made Ray the common layer in Michelangelo for training and fine-tuning XGBoost, deep learning, and large language models.

In 2023, Uber modernized their resource cluster infrastructure, migrating from Peloton (their legacy resource scheduler) to a Kubernetes-based Michelangelo Job Controller service. This service uses Custom Resource Definitions (CRDs) to define resource pools, automatically assigning jobs to appropriate pools based on organizational hierarchy, cluster size, and hardware type requirements. A federated scheduler intelligently matches jobs to clusters considering resource availability, affinities, and job priorities. The system provides continuous cluster health monitoring and maintains up-to-date resource snapshots to ensure jobs schedule only on healthy clusters with available resources.

The infrastructure abstracts compute cluster and hardware complexities from users across both on-premises and cloud providers, enabling dynamic resource selection, high scalability and flexibility, and efficient resource scheduling. By early 2024, Uber successfully migrated all existing XGBoost and deep learning training jobs to the Michelangelo Job Controller, subsequently unblocking additional use cases including large language model fine-tuning and optimization applications.

To improve developer productivity, Uber designed production-aligned notebooks with the same environment setup and standards as production. Data scientists can write Pandas code in notebooks, and backend engineers can migrate that code to production without manual conversion to PySpark, which was previously required to achieve parallelism.

## Scale & Performance

The implementation delivered dramatic performance improvements. The ADMM budget allocation optimizer achieved approximately 40x speedup after applying Ray for city parallel optimization computations. Each individual city-week optimization function executes in 1-2 seconds, but the system must handle thousands of such functions concurrently across Uber's global marketplace.

The system operates at weekly cadence, solving optimization problems that remain in effect for one-week periods. It handles city-lever granularity control variables, meaning optimization occurs independently for each city's various marketplace levers. The large volume of high-concurrent optimization functions created the primary bottleneck that Ray's parallelization capabilities resolved.

Deployment optimization reduced iteration time substantially. Previously, building Docker images for testing required 15-20 minutes even for small code changes. The new deployment approach using object storage for application code reduced job deployment and launch time to under 2 minutes, representing an approximately 7-10x improvement in developer iteration speed.

The infrastructure supports diverse workloads beyond budget allocation, including XGBoost training, deep learning model training, large language model fine-tuning, and various optimization and evaluation algorithms. Ray has become widely adopted across Uber, starting with the Michelangelo team as foundational backend infrastructure and extending to application teams like the Marketplace Investment team.

## Trade-offs & Lessons

The hybrid Spark-Ray architecture represents a pragmatic middle ground that acknowledges the strengths and limitations of each framework rather than forcing a complete migration. This approach delivered several key benefits while introducing specific considerations.

**What Worked Well**

The hybrid design minimized code migration costs by allowing Uber to retain their existing PySpark codebase for data processing while selectively moving only Python functions suitable for parallelization to Ray. This incremental adoption path proved crucial for a large organization with substantial legacy code. The team avoided the extreme effort that would have been required to convert all PySpark code to Ray-compatible implementations.

Treating Ray as an external computation server on request proved architecturally sound. The Spark driver maintains its role as application master, providing a familiar programming model for engineers while gaining access to Ray's parallelization capabilities when needed. Ray's internal task controller eliminated the need to build custom orchestration or message queue systems.

The deployment optimization using object storage for application code delivered immediate developer productivity gains. Reducing deployment time from 15-20 minutes to under 2 minutes significantly accelerated experimentation and iteration cycles, directly impacting engineering velocity.

Production-aligned notebooks bridged the gap between data scientists and backend engineers. Data scientists can write natural Pandas code without concerning themselves with parallelization, while backend engineers can move that code to production without laborious manual conversion to PySpark. This reduced friction in the development-to-production pipeline.

**Challenges and Considerations**

The hybrid architecture introduces operational complexity by requiring teams to manage and understand two distinct distributed computing frameworks. Engineers must develop intuition about which operations should run on Spark versus Ray, though the general principle (data processing on Spark, Python functions on Ray) provides clear guidance.

Data transmission between Spark and Ray clusters required careful optimization. Direct cluster-to-cluster communication proved inadequate for large datasets due to network bandwidth limitations, serialization/deserialization overhead, and Pandas conversion bottlenecks on the Spark driver. The solution using HDFS as an intermediate storage layer added another system dependency but resolved these performance issues while preventing out-of-memory errors.

The approach requires maintaining two separate cluster infrastructures with their own resource management, monitoring, and operational considerations. However, Uber's investment in the Michelangelo Job Controller on Kubernetes abstracted much of this complexity from end users, providing automated resource allocation, dynamic scheduling, and cluster health monitoring.

**Key Insights for Practitioners**

Organizations should resist the temptation to standardize on a single framework when different tools genuinely excel at different tasks. The hybrid Spark-Ray model demonstrates that interoperability between frameworks can deliver better results than forcing all workloads into one system. The key is designing clean interfaces and data handoff mechanisms between systems.

For optimization problems with embarrassingly parallel structure—such as Uber's city-level budget allocation—Ray's lightweight task execution model provides substantial advantages over Spark's heavier execution model. When individual computations complete in seconds and you need to execute thousands concurrently, Ray's scheduling overhead becomes favorable compared to alternatives like launching separate containers per task.

Incremental adoption paths matter enormously in large organizations. Starting with specific bottlenecks where Ray provided clear advantages (lightweight parallel Python functions) while preserving existing Spark infrastructure for data processing enabled rapid adoption without massive migration projects.

Developer experience investments like production-aligned notebooks and optimized deployment pipelines often deliver returns comparable to core infrastructure improvements. Reducing deployment time by 7-10x and eliminating manual code conversion between development and production environments directly impact team velocity and time-to-value.

The Kubernetes-based infrastructure modernization proved essential for supporting diverse workloads. Abstract resource management complexity from users while maintaining flexibility to support CPU training, GPU training, optimization workloads, and emerging use cases like LLM fine-tuning. The federated scheduler approach with intelligent job-to-cluster matching optimized resource utilization across the organization.

For teams considering Ray adoption, the ADMM optimization use case illustrates an ideal fit: highly parallelizable workload, lightweight individual tasks, Python-native implementation, and poor fit for Spark's execution model. Teams should evaluate whether their workloads exhibit similar characteristics before investing in Ray infrastructure.
