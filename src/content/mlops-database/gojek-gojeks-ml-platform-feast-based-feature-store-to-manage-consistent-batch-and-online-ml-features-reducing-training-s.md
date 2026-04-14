---
title: "Feast-based feature store to manage consistent batch and online ML features, reducing training-serving skew and enabling feature reuse"
slug: "gojek-gojeks-ml-platform-feast-based-feature-store-to-manage-consistent-batch-and-online-ml-features-reducing-training-s"
draft: false
mlopsTags:
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "docker"
  - "feast"
  - "kubernetes"
  - "spark"
  - "terraform"
  - "data-ingestion"
  - "data-prep"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Gojek"
companySlug: "gojek"
platformName: "Gojek's ML platform"
contentType: "blog"
summary: "Gojek developed Feast, an open-source feature store for machine learning, in collaboration with Google Cloud to address critical challenges in feature management across their ML systems. The company faced significant pain points including difficulty getting features into production, training-serving skew from reimplementing transformations, lack of feature reuse across teams, and inconsistent feature definitions. Feast provides a centralized platform for defining, managing, discovering, and serving features with both batch and online retrieval capabilities, enabling unified APIs and consistent feature joins. The system was first deployed for Jaeger, Gojek's driver allocation system that matches millions of customers to hundreds of thousands of drivers daily, eliminating the need for project-specific data infrastructure and allowing data scientists to focus on feature selection rather than infrastructure management."
link: "https://www.gojek.io/blog/feast-bridging-ml-models-and-data"
year: 2020
seo:
  title: "Gojek: Feast-based feature store to manage consistent batch and online ML features, reducing training-serving skew and enabling feature reuse - ZenML MLOps Database"
  description: "Gojek developed Feast, an open-source feature store for machine learning, in collaboration with Google Cloud to address critical challenges in feature management across their ML systems. The company faced significant pain points including difficulty getting features into production, training-serving skew from reimplementing transformations, lack of feature reuse across teams, and inconsistent feature definitions. Feast provides a centralized platform for defining, managing, discovering, and serving features with both batch and online retrieval capabilities, enabling unified APIs and consistent feature joins. The system was first deployed for Jaeger, Gojek's driver allocation system that matches millions of customers to hundreds of thousands of drivers daily, eliminating the need for project-specific data infrastructure and allowing data scientists to focus on feature selection rather than infrastructure management."
  canonical: "https://www.zenml.io/mlops-database/gojek-gojeks-ml-platform-feast-based-feature-store-to-manage-consistent-batch-and-online-ml-features-reducing-training-s"
  ogTitle: "Gojek: Feast-based feature store to manage consistent batch and online ML features, reducing training-serving skew and enabling feature reuse - ZenML MLOps Database"
  ogDescription: "Gojek developed Feast, an open-source feature store for machine learning, in collaboration with Google Cloud to address critical challenges in feature management across their ML systems. The company faced significant pain points including difficulty getting features into production, training-serving skew from reimplementing transformations, lack of feature reuse across teams, and inconsistent feature definitions. Feast provides a centralized platform for defining, managing, discovering, and serving features with both batch and online retrieval capabilities, enabling unified APIs and consistent feature joins. The system was first deployed for Jaeger, Gojek's driver allocation system that matches millions of customers to hundreds of thousands of drivers daily, eliminating the need for project-specific data infrastructure and allowing data scientists to focus on feature selection rather than infrastructure management."
mlops:
  source: "sqlite"
  entryId: 67
  sourceUrl: "https://www.gojek.io/blog/feast-bridging-ml-models-and-data"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061034"
  lastUpdated: "2026-04-14T19:54:53.057364"
---

## Problem Context

Gojek recognized that features are the lifeblood of modern machine learning systems, with no other activity in the ML lifecycle offering higher return on investment than improving the data available to models. However, the company encountered significant challenges in creating, managing, sharing, and serving features across their ML teams, making it one of the most time-consuming activities despite its critical importance.

The problems crystallized during the development of Jaeger, Gojek's ML-powered driver allocation system that handles millions of customer allocations to hundreds of thousands of drivers every day. Jaeger evolved from a simple single-model web service into a robust multi-objective system capable of optimizing dispatch time, driver utilization, income, and cancellation rates. The models within Jaeger depend heavily on features to make decisions such as prioritizing drivers based on wait times, routing drivers efficiently to optimize arrival times, and balancing driver supply based on demand changes in different geographic areas defined by S2 cells.

Despite designing their initial data infrastructure with ease of feature development in mind, Gojek hit multiple scaling challenges. Getting features into production proved extremely difficult because data scientists would perform all data transformation and feature engineering tasks with results stored in the data warehouse, but there was no standardized way to serve these features to online systems. This forced engineers to set up database clusters, data ingestion jobs, infrastructure monitoring, and related components for each model, each project, each environment, and each region.

Training-serving inconsistency emerged as a critical issue. Feature transforms written in Python for offline training had to be completely rewritten for online serving, creating not only duplicated effort but also a source of inconsistencies that led to training-serving skew. Features were not being reused across teams despite multiple projects working with the same entity types—customers, drivers, and geographic areas. The Jaeger team had no easy way to discover what features other teams were developing and no simple integration path without reimplementation. Finally, feature definitions existed only in code without any centralized, human-readable documentation, making it impossible to standardize definitions across the organization.

## Architecture & Design

Feast sits at the critical boundary between data engineering and ML engineering. The architecture positions Feast as a bridge where data owners on one side—data engineers and data scientists—create datasets and data streams outside of Feast and ingest them into the system, while ML practitioners on the other side consume these features during both training and serving phases.

The architecture comprises several key components. At its core, Feast maintains two distinct storage layers: a warehouse store for batch retrieval during training and a low-latency store for online retrieval during serving. These dual stores enable the system to serve different access patterns with appropriate performance characteristics. A unified gRPC API layer provides consistent access to both storage backends, minimizing variation in client-side code between training and serving workflows.

A critical architectural evolution involved decentralizing serving infrastructure. While Gojek's platform team initially built Feast as a centralized service, customer teams wanted to deploy their own Feast instances. To accommodate this, the architecture introduced a common feature stream that decouples data ingestion from the population of Feast data stores. Feature data is now centrally persisted on this stream after ingestion and made available to any number of Feast serving deployments, some managed by other teams rather than the central platform team.

The system implements consistent feature joins as a first-class capability. When data scientists need to produce datasets from multiple upstream sources updating at different rates—minutely, daily, or other cadences—for specific entity groups over specific time periods, Feast handles the joining logic identically for both historical retrieval and online serving. This design eliminates training-serving skew by ensuring consistent join semantics across both access patterns.

Project isolation provides resource and namespace management. The concept of projects allows users to create feature sets, features, and entities within private namespaces while simplifying retrieval from the serving API through direct feature references within project contexts.

The data flow begins with data production outside Feast, followed by ingestion into the feature stream, then population of the appropriate storage backends. ML teams like the Jaeger team select features from Feast for training, export the feature list along with the trained model binary, and persist both in the model store. At serving time, model serving applications load the model with its feature list and trigger feature value lookups from Feast for each prediction request before feeding features into the loaded model.

## Technical Implementation

Feast provides SDKs in Python, Java, and Golang, enabling integration across the diverse technology stacks used by different teams at Gojek. The Python SDK supports batch retrieval from the warehouse store during training through the `get_batch_features` method, which takes a dataframe containing entity values and a list of feature references, performing the necessary joins to produce a training dataset. The same SDK provides online retrieval from low-latency stores through `get_online_features`, which accepts entity rows and feature references for real-time serving scenarios.

The system uses gRPC for its unified serving API, providing a consistent interface across both batch and online access patterns. This unification represents a significant evolution from the original release, which had separate APIs for historical and online access. The gRPC layer ensures type safety, performance, and cross-language compatibility.

Entity types form the foundation of Feast's data model. At Gojek, the majority of features are based on three primary entity types: Customers, Drivers, and Areas represented using S2 cells from the S2 geometry library. This entity-centric design allows multiple feature sets to be joined consistently based on common entity keys.

The feature stream architecture uses a publish-subscribe pattern where feature data is written once to a central stream and consumed by multiple Feast serving instances. This design enables both centralized management of feature ingestion while allowing decentralized serving deployments tailored to specific team requirements or regional constraints.

Integration with the broader ML platform occurs through the model store. When data scientists complete training, they export not just the model binary but also the list of features used, storing both together. This coupling ensures that serving applications have complete information about feature dependencies and can retrieve the correct features at inference time.

For the upcoming Feast 0.5 release planned for March 2020, the team committed to TFX (TensorFlow Extended) API compatibility to enable feature statistics generation and validation for both batch and streaming data. This integration would provide deeper visibility into data quality and allow faster reactions to data changes in production.

## Scale & Performance

Gojek operates Feast at significant scale to support their ride-hailing and multi-service platform. The Jaeger driver allocation system alone processes millions of customer allocations to hundreds of thousands of drivers daily. Each allocation decision requires real-time feature retrieval from Feast's online serving layer, indicating the system handles at minimum millions of feature lookups per day, likely translating to hundreds or thousands of requests per second during peak hours.

The system supports multiple concurrent ML projects beyond Jaeger, with different teams developing features on the same core entity types. This multi-tenancy is enabled by the project isolation capabilities and the horizontally scalable architecture. The feature stream design allows the infrastructure to scale to more feature producers and consumers without requiring project-specific data infrastructure for each new use case.

Features are stored and served at different temporal granularities, with upstream data sources updating at rates varying from minutely to daily. Feast must maintain consistency across these different update cadences while serving both historical queries spanning potentially long time periods for training and low-latency point queries for online serving.

The move to decentralized serving deployments indicates that different instances of Feast serve different teams or regions, suggesting geographic distribution to support Gojek's operations across Southeast Asia. Each serving deployment can scale independently based on the specific traffic patterns and latency requirements of its consumers.

## Trade-offs & Lessons

The journey to Feast reveals several critical insights for organizations building ML infrastructure. The initial attempt to solve feature serving through project-specific infrastructure proved unsustainable at scale. While this approach provided maximum flexibility, it created operational burden that didn't scale with the number of ML projects. The shift to centralized feature management with decentralized serving represents a pragmatic middle ground—standardization where it provides value while preserving autonomy where teams need it.

The training-serving skew problem stemming from reimplementing feature transformations highlights a common anti-pattern in ML systems. The dual implementation of the same logic in different languages for different environments creates not just maintenance burden but correctness issues that directly impact model performance. Feast's approach of serving features consistently from the same definitions eliminates this class of errors entirely.

Feature reuse emerged as a significant opportunity that wasn't being captured without proper infrastructure. Teams were independently developing features on the same entity types without awareness of each other's work. The lack of discoverability meant duplicated effort and missed opportunities for leveraging high-quality features across multiple models. A centralized feature registry with proper cataloging addresses this organizational challenge as much as the technical one.

The architectural evolution from centralized to decentralized serving demonstrates the importance of understanding customer needs beyond the immediate technical requirements. The platform team built what they thought users needed—a centralized service—but customers wanted operational control over their own deployments. The feature stream abstraction enabled this flexibility without sacrificing the benefits of centralized feature definitions and ingestion.

The decision to unify the historical and online APIs represents recognition that variation between training and serving code creates risk. Even when the underlying data and join logic are consistent, different APIs force developers to maintain separate code paths, creating opportunities for divergence. A single API reduces this surface area for error.

Looking forward, the team identified several gaps to address: feature transformations remain a challenge, feature discovery and cataloging need improvement despite the centralized registry, and authentication, authorization, and accounting (AAA) capabilities are missing. These gaps suggest that even a successful feature store deployment represents an evolving system rather than a finished product.

The collaboration with Google Cloud on an open-source project proved valuable, generating community interest and contributions from companies like Agoda. This external validation and participation helped improve the system beyond what a single company could achieve while establishing Feast as a potential standard rather than a proprietary solution.

The impact on data scientist productivity appears substantial. By separating feature creation from feature selection, and by handling all infrastructure concerns automatically, Feast enabled the Jaeger team to iterate much faster on model development. Data scientists can focus on the ML problem rather than data engineering concerns. Similarly, ML engineers benefit from managing a single horizontal infrastructure piece rather than project-specific data systems.

The example of Jaeger illustrates the end-to-end value. A system that evolved into a complex multi-objective optimizer processing millions of decisions daily now operates on a standardized feature serving layer. This standardization didn't constrain capability—Jaeger still optimizes for dispatch time, driver utilization, income, cancellation rates, and other objectives—but it did eliminate entire classes of infrastructure work and potential failure modes.
