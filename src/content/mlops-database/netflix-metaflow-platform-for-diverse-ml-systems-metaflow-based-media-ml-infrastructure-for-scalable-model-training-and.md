---
title: "Metaflow-based media ML infrastructure for scalable model training and self-serve productization of video/image/audio/text"
slug: "netflix-metaflow-platform-for-diverse-ml-systems-metaflow-based-media-ml-infrastructure-for-scalable-model-training-and"
draft: false
mlopsTags:
  - "data-versioning"
  - "feature-store"
  - "metadata-store"
  - "model-serving"
  - "pipeline-orchestration"
  - "docker"
  - "iceberg"
  - "metaflow"
  - "ray"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "Netflix"
companySlug: "netflix"
platformName: "Metaflow + “platform for diverse ML systems”"
contentType: "blog"
summary: "Netflix built a comprehensive media-focused machine learning infrastructure to reduce the time from ideation to productization for ML practitioners working with video, image, audio, and text assets. The platform addresses challenges in accessing and processing media data, training large-scale models efficiently, productizing models in a self-serve fashion, and storing and serving model outputs for promotional content creation. Key components include Jasper for standardized media access, Amber Feature Store for memoizing expensive media features, Amber Compute for triggering and orchestration, a Ray-based GPU training cluster that achieves 3-5x throughput improvements, and Marken for serving and searching features. The infrastructure enabled Netflix to scale their Match Cutting pipeline from single-title processing (approximately 2 million shot pair comparisons) to multi-title matching across thousands of videos, while eliminating wasteful repeated computations and ensuring consistency across algorithm pipelines."
link: "https://netflixtechblog.com/scaling-media-machine-learning-at-netflix-f19b400243"
year: 2023
seo:
  title: "Netflix: Metaflow-based media ML infrastructure for scalable model training and self-serve productization of video/image/audio/text - ZenML MLOps Database"
  description: "Netflix built a comprehensive media-focused machine learning infrastructure to reduce the time from ideation to productization for ML practitioners working with video, image, audio, and text assets. The platform addresses challenges in accessing and processing media data, training large-scale models efficiently, productizing models in a self-serve fashion, and storing and serving model outputs for promotional content creation. Key components include Jasper for standardized media access, Amber Feature Store for memoizing expensive media features, Amber Compute for triggering and orchestration, a Ray-based GPU training cluster that achieves 3-5x throughput improvements, and Marken for serving and searching features. The infrastructure enabled Netflix to scale their Match Cutting pipeline from single-title processing (approximately 2 million shot pair comparisons) to multi-title matching across thousands of videos, while eliminating wasteful repeated computations and ensuring consistency across algorithm pipelines."
  canonical: "https://www.zenml.io/mlops-database/netflix-metaflow-platform-for-diverse-ml-systems-metaflow-based-media-ml-infrastructure-for-scalable-model-training-and"
  ogTitle: "Netflix: Metaflow-based media ML infrastructure for scalable model training and self-serve productization of video/image/audio/text - ZenML MLOps Database"
  ogDescription: "Netflix built a comprehensive media-focused machine learning infrastructure to reduce the time from ideation to productization for ML practitioners working with video, image, audio, and text assets. The platform addresses challenges in accessing and processing media data, training large-scale models efficiently, productizing models in a self-serve fashion, and storing and serving model outputs for promotional content creation. Key components include Jasper for standardized media access, Amber Feature Store for memoizing expensive media features, Amber Compute for triggering and orchestration, a Ray-based GPU training cluster that achieves 3-5x throughput improvements, and Marken for serving and searching features. The infrastructure enabled Netflix to scale their Match Cutting pipeline from single-title processing (approximately 2 million shot pair comparisons) to multi-title matching across thousands of videos, while eliminating wasteful repeated computations and ensuring consistency across algorithm pipelines."
mlops:
  source: "sqlite"
  entryId: 173
  sourceUrl: "https://netflixtechblog.com/scaling-media-machine-learning-at-netflix-f19b400243"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.616696"
  lastUpdated: "2026-04-14T19:55:40.358062"
---

## Problem Context

Netflix faced significant infrastructure challenges in applying machine learning to media assets at scale. As the streaming catalog grew to thousands of shows serving millions of accounts, the need for ML-driven personalization and content understanding became critical. The company leverages ML models for personalized artwork selection and helping creatives create promotional content efficiently, but media ML practitioners encountered several pain points that slowed innovation.

The core challenge was reducing the time from ideation to productization for media ML use cases. In the early days, researchers found it extremely difficult to access media data. Even after gaining access, they faced heterogeneity issues across different assets in terms of decoding performance, file sizes, metadata formats, and general formatting inconsistencies. Media feature computation proved expensive and time-consuming, with many ML practitioners independently computing identical features against the same assets, leading to significant waste.

Productizing models required ML teams to develop bespoke triggering and orchestration components for each pipeline. Over time, these custom components became sources of downstream errors and maintenance burdens. Training media models posed additional system challenges around storage, network bandwidth, and GPU utilization. Finally, there was no unified approach for serving and searching model outputs, forcing each team to build their own solutions.

The Match Cutting use case exemplified these challenges. Match Cutting is a video editing technique that creates smooth visual transitions between shots with similar framing, composition, or action. Initially built to find matches within a single title (averaging 2,000 shots requiring approximately 2 million pair comparisons), the pipeline faced severe scalability issues when extending to multi-title scenarios. Matching across a series with 10 episodes translated to 200 million comparisons, while matching across 1,000 files would require approximately 200 trillion computations.

## Architecture and Design

Netflix designed a comprehensive Media Machine Learning Infrastructure with several interconnected components that work together to support the full ML lifecycle for media assets.

**Jasper - Media Access Layer**

Jasper serves as the foundational media access layer that standardizes how ML practitioners interact with media assets. The system implements pre-processing steps that create and store quality-controlled derivatives of video, audio, image, and text assets along with snapshotted metadata. This standardization ensures that all Netflix catalog content undergoes homogeneous processing with consistent encoding recipes and dimensions. The unified library provided by Jasper allows ML practitioners to seamlessly access different media types without dealing with low-level decoding challenges or format inconsistencies.

**Amber Feature Store**

The Amber Feature Store addresses the memoization problem for expensive media feature computations. The architecture stores features and embeddings tied to media entities, preventing redundant computation across different ML pipelines. The feature store includes a data replication system that copies data to different storage solutions based on required access patterns. This design guarantees immutability, versioning, and auditing of feature values while providing various metrics on top of stored features. The feature store enables other algorithms to build on top of existing outputs and intermediate embeddings, creating a composable ecosystem of media ML features.

**Amber Compute - Orchestration and Triggering**

Amber Compute provides triggering capabilities to initiate algorithm computation with recursive dependency resolution. The system introduces the concept of "Amber Features," where each feature represents an algorithm with its own scope of computation, storage, and triggering. Using dependency semantics, Amber Features can be plugged into other Amber Features, allowing composition of complex meshes of interrelated algorithms. This approach maps the media machine learning domain with coupling between media asset metadata, media access, feature storage, feature compute, and feature compute triggering, enabling new algorithms to be easily integrated with predefined standards.

The triggering system automatically initiates computation when new video files land, ensuring video editors can start working on titles as quickly as possible. Amber handles the entire dependency chain recursively, orchestrating embedding computations tied to shot deduplication and other preprocessing steps.

**Training Infrastructure**

Netflix developed a large-scale GPU training cluster based on Ray to support multi-GPU and multi-node distributed training. The training infrastructure addresses multiple system challenges through several optimizations. Datasets are precomputed and preprocessing is offloaded to CPU instances to avoid bottlenecking GPU resources. Model operators are optimized within the framework, and a high-performance file system (leveraging MezzFS and FSx) resolves data loading bottlenecks. These optimizations collectively increase training system throughput by 3-5x compared to baseline approaches.

**Marken - Serving and Search Platform**

Marken provides a scalable annotation service for persisting feature values as annotations, which are versioned and strongly typed constructs associated with Netflix media entities such as videos and artwork. The service offers a user-friendly query DSL for performing search operations over annotations with specific filtering and grouping capabilities. Marken provides unique search capabilities on temporal and spatial data by time frames or region coordinates, as well as vector searches that scale to the entire Netflix catalog. Amber's synchronization mechanisms replicate data from the main feature value storage to Marken for serving use cases.

**Data Flow Architecture**

The overall data flow begins with raw media assets being processed through Jasper to create standardized derivatives. These standardized files then feed into various Amber Features that compute representations and embeddings. Shot segmentation, a canonical feature provided by the infrastructure team, breaks videos into individual shots and is reused as a dependency across multiple algorithms. Deduplication algorithms remove similar shots before expensive downstream processing. Computed features are stored in the Amber Feature Store and optionally synchronized to Marken for serving. Internal applications query Marken to serve high-scoring results to end users such as video editors.

## Technical Implementation

The Media ML Infrastructure leverages a diverse technology stack spanning multiple layers of the architecture. ML practitioners primarily interact with the system using Python, but numerous tools and platforms operate behind the scenes.

**Workflow and Orchestration Technologies**

The platform integrates with Conductor, Netflix's workflow orchestration system, and Dagobah for orchestration needs. Metaflow, Netflix's data science framework, is used for building ML pipelines and managing individual pipeline steps with granular resource control. Each Metaflow step can be allocated specific compute resources appropriate for that stage of processing.

**Compute and Container Infrastructure**

Titus, Netflix's container management platform, provides the underlying compute infrastructure for running containerized workloads. The training cluster is built on Ray for distributed computing across multiple GPUs and nodes. Spark is utilized for large-scale data processing tasks across the media catalog.

**Storage and Data Technologies**

The infrastructure employs multiple storage systems optimized for different access patterns. Iceberg provides table format capabilities for managing large analytic datasets. MezzFS mounts object storage in Netflix's media processing platform, enabling efficient access to media files. FSx (Amazon FSx) provides high-performance file system capabilities crucial for resolving data loading bottlenecks during training. S3 serves as the underlying object storage layer, while Baggins provides internal drive capabilities.

**Data Processing and Query Engines**

Trino (formerly PrestoSQL) enables SQL queries across diverse data sources. The platform uses Cassandra for distributed database needs requiring high availability and scalability. Elasticsearch powers search capabilities within the infrastructure.

**Application Framework**

Backend services are built using Java and Scala with Spring Boot providing the application framework for production services.

**Implementation Details from Match Cutting Case Study**

The original Match Cutting pipeline was implemented as a single Metaflow flow with discrete steps for different processing stages. The pipeline downloaded video files, produced shot boundary metadata stored as dictionaries mapping shot indices to frame ranges, materialized individual clip files per shot, extracted embeddings using video encoders, performed deduplication based on embedding similarity, computed representation features per shot, enumerated all shot pairs to compute similarity scores, and finally sorted and surfaced top-K results.

The refactored pipeline using the Media ML Infrastructure decomposed this monolithic flow into modular Amber Features with dependency relationships. Shot segmentation became a canonical reusable feature. Deduplication was tied to shot detection as a dependent feature. Embedding computation was orchestrated as a separate feature depending on deduplication output. The synchronization from Amber Feature Store to Marken enabled serving without custom serving infrastructure.

## Scale and Performance

The infrastructure operates at significant scale across Netflix's entire streaming catalog spanning thousands of shows and movies.

**Shot Processing Scale**

An average title contains approximately 2,000 shots, requiring enumeration and processing of roughly 2 million shot pairs for single-title match cutting. When extending to multi-title scenarios, the scale increases dramatically. A series with 10 episodes averaging 2,000 shots per episode translates to 200 million comparisons. Matching across 1,000 video files would theoretically require approximately 200 trillion computations using naive approaches.

**Training Performance Improvements**

The Ray-based GPU training cluster with optimizations for dataset precomputation, CPU-offloaded preprocessing, framework operator optimization, and high-performance file systems achieves 3-5x throughput improvements compared to baseline training approaches. This performance gain directly translates to faster iteration cycles for model development.

**Search and Query Scale**

Marken's vector search capabilities scale to the entire Netflix catalog, enabling similarity searches across all media entities. The platform supports temporal and spatial queries on video data by time frames or region coordinates, critical for media-specific search patterns.

**Computational Savings Through Memoization**

By memoizing features in the Amber Feature Store, the platform eliminates redundant computation across ML pipelines. Shot segmentation, being a common preprocessing step, is computed once and reused across multiple algorithms. This approach guarantees coherence of shot segments across algorithms (ensuring shot index i has identical frame ranges in all dependent algorithms) while reducing compute costs.

## Trade-offs and Lessons Learned

**Standardization as a Foundation**

The decision to standardize media encodes through Jasper proved critical for multi-title matching quality. Without homogeneous input file formats (consistent encoding recipes and dimensions), representations computed from different titles could not be reliably compared. This standardization came with upfront investment but paid dividends in downstream algorithm quality and composability. The lesson is that investing in data standardization at the platform level prevents compounding issues across individual algorithm implementations.

**Build vs. Reuse Trade-offs**

The platform balances building custom components versus leveraging existing Netflix infrastructure. Rather than creating entirely new workflow orchestration, the team integrated with existing systems like Conductor and Metaflow. However, media-specific needs around triggering based on media asset arrival and dependency management required custom development in Amber Compute. This hybrid approach allowed the team to leverage proven infrastructure while addressing domain-specific requirements.

**Composability Through Feature Dependency Semantics**

The Amber Feature abstraction with dependency semantics emerged as a powerful pattern for building complex media ML systems. By treating each algorithm as a feature with its own scope that can depend on other features, the platform enabled modular development while ensuring correct orchestration. This contrasts with monolithic pipeline approaches where the entire workflow must be understood and modified together. The trade-off is increased complexity in the platform layer, but this complexity is amortized across many algorithm implementations.

**Storage Replication for Access Pattern Optimization**

The decision to replicate feature data to different storage systems (Amber Feature Store, Marken, etc.) based on access patterns represents a classic trade-off between storage costs and query performance. Synchronization mechanisms add complexity and potential consistency challenges, but enable optimal serving for different use cases. Training and batch processing access features from the primary store, while real-time serving queries Marken with its optimized search capabilities.

**Training Optimization Through System-Level Thinking**

The 3-5x training throughput improvement came from addressing bottlenecks across the entire system rather than optimizing a single component. Precomputing datasets, offloading preprocessing to CPUs, optimizing framework operators, and implementing high-performance file systems all contributed. This holistic approach required coordination across multiple infrastructure layers but delivered substantial performance gains. The lesson is that media ML training performance is often limited by data loading and preprocessing rather than pure GPU computation.

**Triggering Automation with Quality Gates**

Automatic triggering upon new video file arrival accelerates time-to-value for video editors but introduced challenges around spurious re-computation triggered by metadata changes without content changes. The platform had to implement logic to distinguish meaningful updates requiring recomputation from inconsequential metadata updates. This highlights the complexity of event-driven architectures in media processing where distinguishing signal from noise in file update events requires domain-specific logic.

**Versioning and Immutability for Reproducibility**

The Amber Feature Store's guarantees around immutability, versioning, and auditing prove essential for ML reproducibility and debugging. When algorithm quality issues arise, teams need to trace back through dependency chains to understand which version of which upstream feature contributed to the problem. The trade-off is increased storage requirements for maintaining feature versions, but this cost is justified by operational benefits.

**Avoiding Exponential Pre-computation**

The Match Cutting case study demonstrated the impossibility of pre-computing all possible subsets of shows for matching (2^1000 subsets for 1,000 files). The platform's approach of storing individual shot embeddings in searchable infrastructure (Marken) enables on-demand matching across arbitrary subsets without pre-computation. This architectural choice trades query-time computation for storage efficiency and flexibility, allowing editors to explore matches across any selection of titles rather than being constrained to pre-computed combinations.

**Python as Interface, Polyglot Implementation**

Providing a Python interface for ML practitioners while implementing platform components in Java/Scala with Spring Boot, using diverse data technologies, represents a pragmatic separation of concerns. ML teams work in their preferred environment while platform teams leverage JVM ecosystems for building scalable services. This requires maintaining clear API boundaries and abstractions but allows each team to use appropriate tools.

**Challenges with Bespoke Components**

The initial Match Cutting pipeline's bespoke triggering and orchestration components became sources of errors and maintenance burden over time. This anti-pattern of each pipeline building custom infrastructure motivated the development of Amber Compute. The lesson is that common patterns should be extracted into platform services even if initial custom implementations seem expedient. The upfront investment in platform capabilities pays off as the number of pipelines scales.
