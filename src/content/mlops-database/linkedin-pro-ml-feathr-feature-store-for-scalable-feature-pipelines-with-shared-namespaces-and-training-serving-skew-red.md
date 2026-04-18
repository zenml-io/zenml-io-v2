---
title: "Feathr feature store for scalable feature pipelines with shared namespaces and training-serving skew reduction"
slug: "linkedin-pro-ml-feathr-feature-store-for-scalable-feature-pipelines-with-shared-namespaces-and-training-serving-skew-red"
draft: false
mlopsTags:
  - "feature-store"
  - "metadata-store"
  - "model-serving"
  - "pipeline-orchestration"
  - "azure-ml"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "LinkedIn"
companySlug: "linkedin"
platformName: "Pro-ML"
contentType: "blog"
summary: "LinkedIn built and open-sourced Feathr, a feature store designed to address the mounting costs and complexity of managing feature preparation pipelines across hundreds of machine learning models. Before Feathr, each team maintained bespoke feature pipelines that were difficult to scale, prone to training-serving skew, and prevented feature reuse across projects. Feathr provides an abstraction layer with a common namespace for defining, computing, and serving features, enabling producer and consumer personas similar to software package management. The platform has been deployed across dozens of applications at LinkedIn including Search, Feed, and Ads, managing hundreds of model workflows and processing petabytes of feature data. Teams reported reducing engineering time for adding new features from weeks to days, observed performance improvements of up to 50% compared to custom pipelines, and successfully enabled feature sharing between similar applications, leading to measurable business metric improvements."
link: "https://engineering.linkedin.com/blog/2022/open-sourcing-feathr---linkedin-s-feature-store-for-productive-m"
year: 2022
seo:
  title: "LinkedIn: Feathr feature store for scalable feature pipelines with shared namespaces and training-serving skew reduction - ZenML MLOps Database"
  description: "LinkedIn built and open-sourced Feathr, a feature store designed to address the mounting costs and complexity of managing feature preparation pipelines across hundreds of machine learning models. Before Feathr, each team maintained bespoke feature pipelines that were difficult to scale, prone to training-serving skew, and prevented feature reuse across projects. Feathr provides an abstraction layer with a common namespace for defining, computing, and serving features, enabling producer and consumer personas similar to software package management. The platform has been deployed across dozens of applications at LinkedIn including Search, Feed, and Ads, managing hundreds of model workflows and processing petabytes of feature data. Teams reported reducing engineering time for adding new features from weeks to days, observed performance improvements of up to 50% compared to custom pipelines, and successfully enabled feature sharing between similar applications, leading to measurable business metric improvements."
  canonical: "https://www.zenml.io/mlops-database/linkedin-pro-ml-feathr-feature-store-for-scalable-feature-pipelines-with-shared-namespaces-and-training-serving-skew-red"
  ogTitle: "LinkedIn: Feathr feature store for scalable feature pipelines with shared namespaces and training-serving skew reduction - ZenML MLOps Database"
  ogDescription: "LinkedIn built and open-sourced Feathr, a feature store designed to address the mounting costs and complexity of managing feature preparation pipelines across hundreds of machine learning models. Before Feathr, each team maintained bespoke feature pipelines that were difficult to scale, prone to training-serving skew, and prevented feature reuse across projects. Feathr provides an abstraction layer with a common namespace for defining, computing, and serving features, enabling producer and consumer personas similar to software package management. The platform has been deployed across dozens of applications at LinkedIn including Search, Feed, and Ads, managing hundreds of model workflows and processing petabytes of feature data. Teams reported reducing engineering time for adding new features from weeks to days, observed performance improvements of up to 50% compared to custom pipelines, and successfully enabled feature sharing between similar applications, leading to measurable business metric improvements."
mlops:
  source: "sqlite"
  entryId: 43
  sourceUrl: "https://engineering.linkedin.com/blog/2022/open-sourcing-feathr---linkedin-s-feature-store-for-productive-m"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.060775"
  lastUpdated: "2026-04-14T19:54:43.845395"
---

## Problem Context

LinkedIn operates hundreds of machine learning models across critical applications like Search, Feed, and Ads, powered by thousands of features derived from entities in their Economic Graph such as companies, job postings, and LinkedIn members. The challenge that motivated Feathr's development was the unsustainable burden of maintaining feature preparation pipelines at scale.

Feature preparation pipelines represent one of the most complex and time-consuming aspects of ML operations. These systems must aggregate time-sensitive data from multiple sources, join features to training labels in a point-in-time-correct manner to prevent data leakage, persist features for low-latency online serving, and critically ensure features are computed identically during both training and inference to avoid training-serving skew. Each of these requirements introduces significant engineering complexity.

The specific pain points LinkedIn encountered included redundant costs borne by individual teams, each maintaining their own feature pipelines. As applications evolved and new features were added, pipeline complexity grew organically, creating maintenance burdens. The lack of standardization meant teams had no common abstraction for features, no uniform naming conventions across models, no consistent type system, and no standardized deployment or serving patterns. This architectural fragmentation made feature reuse across projects nearly impossible. Without a shared platform, teams couldn't discover what features already existed, couldn't trust that features would behave consistently if shared, and faced prohibitively high integration costs to incorporate features developed by other teams.

## Architecture & Design

Feathr operates as an abstraction layer that sits between raw data sources and ML model workflows, providing a unified feature namespace and platform for feature computation, serving, and access. The architecture introduces clear separation of concerns through producer and consumer personas.

The producer side of Feathr allows feature engineers to define and register features based on raw data sources, including time-series data, or compose features from other features already defined in the system. Feature definitions use simple expressions for common cases, with support for user-defined functions when more complex transformations are required. Feathr supports a rich feature definition language that includes aggregations, transformations, time windowing operations, and sophisticated type systems including vectors and tensors. This expressiveness enables teams to encode many varieties of features while maintaining a declarative approach that Feathr can optimize and execute efficiently.

The consumer side presents an interface conceptually similar to package management in software development. Data scientists and ML engineers specify which features they want to import into their model workflows by name, without needing to understand the implementation details of how those features are sourced, transformed, or computed. The system handles dependency resolution, feature computation, and data delivery automatically.

For training workflows, Feathr replays registered feature definitions over historical time-series data, computing feature values at specific points in time to ensure point-in-time correctness. This mechanism prevents data leakage by ensuring that feature values used for training examples only incorporate information that would have been available at the label timestamp. This temporal join capability is critical for models deployed in production, as it ensures training data accurately reflects the information state that will exist during inference.

For inference workflows, Feathr takes a different approach optimized for low-latency serving. The platform materializes feature datasets in advance and deploys them to online data stores, enabling fast lookup during real-time inference. This pre-materialization strategy trades off storage and refresh complexity for inference latency, a common pattern in production ML systems.

The abstraction creates a common feature namespace across the organization, enabling features defined by different teams and projects to be used together seamlessly. This namespace provides uniform naming, typing, versioning, and documentation, making features discoverable and reusable.

## Technical Implementation

While the blog post doesn't specify all implementation details, several technical aspects are evident from the description and context of LinkedIn's infrastructure ecosystem. Feathr processes petabytes of feature data, indicating use of distributed data processing frameworks likely including Apache Spark or similar technologies common in LinkedIn's stack for batch processing of large-scale data.

The system maintains feature registries that store feature definitions, metadata, and lineage information. These registries enable the discovery and reuse that makes Feathr valuable as a sharing platform. Feature definitions are declarative, allowing Feathr to optimize execution plans for efficiency.

The platform supports both batch and streaming data sources for feature computation, given the reference to time-series data and the need to serve features with different freshness requirements. The materialization pipeline that deploys features to online stores for inference requires coordination between batch computation jobs and online key-value stores or similar low-latency serving infrastructure.

Feathr integrates with existing ML workflow orchestration at LinkedIn, fitting into training pipelines and serving infrastructure rather than requiring wholesale replacement of existing systems. This integration strategy likely contributed to adoption success, as teams could incrementally migrate feature preparation logic to Feathr rather than rewriting entire applications.

The open-source release has been developed in partnership with Microsoft Azure, providing native integration with Azure services. This cloud-native approach suggests the architecture is designed to work across different infrastructure substrates, not just LinkedIn's on-premise systems.

## Scale & Performance

Feathr operates at substantial scale within LinkedIn's production environment. The platform supports dozens of applications including business-critical systems like Search, Feed, and Ads. It manages feature pipelines across hundreds of model workflows, demonstrating maturity beyond proof-of-concept to production-grade operations.

The system processes petabytes of feature data, placing it among large-scale data platforms. This volume indicates Feathr handles not just metadata and coordination but substantial data transformation and movement workloads.

Performance improvements were significant compared to the application-specific pipelines Feathr replaced. Some applications observed runtime performance improvements of up to 50%, achieved through Feathr's ability to amortize optimization investments across many users. Rather than each team optimizing their own pipeline, Feathr's platform team could focus on systemic optimizations that benefited all users. Over multiple years of development, LinkedIn introduced optimizations that significantly reduced processing time for their largest internal applications.

Developer productivity metrics showed even more dramatic improvements. Teams reported reducing the engineering time required to add new features from weeks to days. For some of LinkedIn's largest ML projects, migrating to Feathr enabled removal of sizable volumes of custom feature preparation code, simplifying maintenance and reducing the cognitive load on engineers.

Beyond efficiency metrics, Feathr enabled feature sharing between similar applications that previously couldn't collaborate effectively. The blog specifically mentions multiple search and recommendation systems working with job posting data that found it impractical to share features under previous architectures but achieved "significant gains in business metrics" after migrating to Feathr and sharing features. While specific business metrics aren't disclosed, this represents measurable product impact from infrastructure investment.

## Trade-offs & Lessons

Feathr represents a classic platform investment trade-off: accepting upfront development costs and the overhead of maintaining a shared platform in exchange for long-term productivity gains and capability improvements across many teams. Several aspects of this approach proved successful at LinkedIn.

The abstraction layer strategy worked well by hiding complexity from consumers while providing expressiveness to producers. Like package managers in software development, Feathr succeeds by making common cases simple while supporting complex requirements through extensibility. The declarative feature definition approach enabled platform-level optimizations that individual teams wouldn't invest in for their own pipelines.

The producer-consumer persona model proved valuable for enabling both self-service and horizontal feature teams. Engineers can produce and consume their own features for quick iteration, while mature features can be shared across projects. This flexibility accommodated different organizational models rather than prescribing one approach.

The point-in-time-correct training data generation addresses one of the most subtle and dangerous failure modes in production ML systems. By building this capability into the platform rather than expecting each team to implement it correctly, Feathr prevents an entire class of bugs that are difficult to detect and can severely degrade model quality.

Performance optimization at the platform level created compounding returns. Rather than each team optimizing their pipeline, Feathr's team could focus on systemic improvements that automatically benefited all users. The 50% performance improvements some teams experienced came "for free" as they migrated to Feathr.

The challenge of building platform software is achieving sufficient generality to support diverse use cases while remaining opinionated enough to provide value. Feathr appears to have navigated this by supporting user-defined functions for complex cases while making simple transformations, aggregations, and windowing operations easy through built-in capabilities.

The incremental adoption path proved important. Large ML projects could remove "sizable volumes of code" by replacing application-specific pipelines, but this happened gradually rather than requiring big-bang migrations. The ability to integrate with existing workflows reduced adoption friction.

The open-source release strategy involves releasing "the most-used, core parts of Feathr" rather than every internal capability, acknowledging that some components may be LinkedIn-specific. The partnership with Microsoft Azure for native integration provides commercial support and cloud deployment paths, potentially increasing adoption beyond what a standalone open-source project might achieve.

Looking forward, LinkedIn is building additional tooling around Feathr including advanced CI/CD capabilities for feature engineering. The vision includes automatically testing upgraded versions of widely-shared features against all dependent models, catching regressions before deployment. This represents next-level infrastructure for ML operations, treating features as first-class artifacts with automated testing pipelines similar to application code.

The lessons for practitioners include the value of platform thinking for ML infrastructure, the importance of addressing training-serving skew systematically rather than ad-hoc, the productivity gains from feature reuse when enabled by proper abstractions, and the compounding returns from centralizing optimization efforts. Organizations facing similar challenges with fragmented feature pipelines, difficulty sharing work between projects, or mounting maintenance costs may find the Feathr approach instructive, though the investment required to build and operate such platforms should be weighed against organizational scale and maturity.
