---
title: "Centralized ML observability for 80+ Etsy production models via attributed prediction log integration"
slug: "etsy-etsys-ml-platform-centralized-ml-observability-for-80-etsy-production-models-via-attributed-prediction-log-integrat"
draft: false
mlopsTags:
  - "metadata-store"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "data-validation"
  - "model-evaluation"
  - "retraining"
  - "serving"
industryTags: "e-commerce"
company: "Etsy"
companySlug: "etsy"
platformName: "Etsy's ML platform"
contentType: "blog"
summary: "Etsy implemented a centralized ML observability solution to address critical gaps in monitoring their 80+ production models. While they had strong software-level observability through their Barista ML serving platform, they lacked ML-specific monitoring for feature distributions, predictions, and model performance. After extensive requirements gathering across Search, Ads, Recommendations, Computer Vision, and Trust & Safety teams, Etsy made a build-versus-buy decision to partner with a third-party SaaS vendor rather than building an in-house solution. This decision was driven by the complexity of building a comprehensive platform capable of processing terabytes of prediction data daily, and the fact that ML observability required only a single integration point with their existing prediction logging infrastructure. The implementation focuses on uploading attributed prediction logs from Google Cloud Storage to the vendor platform using both custom Kubeflow Pipeline components and the vendor's file importer service, with goals of enabling intelligent model retraining, reducing incident remediation time, and improving model fairness."
link: "https://www.etsy.com/codeascraft/towards-machine-learning-observability-at-etsy"
year: 2022
seo:
  title: "Etsy: Centralized ML observability for 80+ Etsy production models via attributed prediction log integration - ZenML MLOps Database"
  description: "Etsy implemented a centralized ML observability solution to address critical gaps in monitoring their 80+ production models. While they had strong software-level observability through their Barista ML serving platform, they lacked ML-specific monitoring for feature distributions, predictions, and model performance. After extensive requirements gathering across Search, Ads, Recommendations, Computer Vision, and Trust & Safety teams, Etsy made a build-versus-buy decision to partner with a third-party SaaS vendor rather than building an in-house solution. This decision was driven by the complexity of building a comprehensive platform capable of processing terabytes of prediction data daily, and the fact that ML observability required only a single integration point with their existing prediction logging infrastructure. The implementation focuses on uploading attributed prediction logs from Google Cloud Storage to the vendor platform using both custom Kubeflow Pipeline components and the vendor's file importer service, with goals of enabling intelligent model retraining, reducing incident remediation time, and improving model fairness."
  canonical: "https://www.zenml.io/mlops-database/etsy-etsys-ml-platform-centralized-ml-observability-for-80-etsy-production-models-via-attributed-prediction-log-integrat"
  ogTitle: "Etsy: Centralized ML observability for 80+ Etsy production models via attributed prediction log integration - ZenML MLOps Database"
  ogDescription: "Etsy implemented a centralized ML observability solution to address critical gaps in monitoring their 80+ production models. While they had strong software-level observability through their Barista ML serving platform, they lacked ML-specific monitoring for feature distributions, predictions, and model performance. After extensive requirements gathering across Search, Ads, Recommendations, Computer Vision, and Trust & Safety teams, Etsy made a build-versus-buy decision to partner with a third-party SaaS vendor rather than building an in-house solution. This decision was driven by the complexity of building a comprehensive platform capable of processing terabytes of prediction data daily, and the fact that ML observability required only a single integration point with their existing prediction logging infrastructure. The implementation focuses on uploading attributed prediction logs from Google Cloud Storage to the vendor platform using both custom Kubeflow Pipeline components and the vendor's file importer service, with goals of enabling intelligent model retraining, reducing incident remediation time, and improving model fairness."
mlops:
  source: "sqlite"
  entryId: 128
  sourceUrl: "https://www.etsy.com/codeascraft/towards-machine-learning-observability-at-etsy"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061692"
  lastUpdated: "2026-04-14T19:55:19.073944"
---

## Problem Context

Etsy faced a significant observability gap in their machine learning infrastructure despite having mature software-level monitoring. While their ML serving platform called Barista provided comprehensive metrics around latency, CPU/memory usage, and error rates, the company lacked centralized ML-specific observability focusing on feature distributions, prediction patterns, and model performance metrics. This gap had real business consequences that motivated the Machine Learning Infrastructure, Platform and Systems (MIPS) team to address the problem.

The pain points manifested in several critical ways. Production incidents involving ML models—models that directly generate revenue by connecting sellers with buyers—had occurred due to upstream data quality issues. These incidents were often identified late and required tedious manual debugging to resolve. The lack of visibility meant silent errors could run for extended periods before detection, potentially causing significant disruption to customers and the business.

From a cost perspective, Etsy was operating inefficiently with their model retraining strategy. Most models operated on a naive 24-hour retraining schedule using a sliding window of recent data (typically the last three months). While this frequent retraining mitigated model drift risk, it was gratuitously expensive. Models were being retrained on schedule rather than based on informed decisions driven by metrics or statistical indicators showing actual performance degradation. This approach meant large, expensive models consumed compute resources whether retraining was truly needed or not.

Beyond operational concerns, ML practitioners lacked the insights needed to continuously improve models. Feature distribution visibility and detailed performance metrics were not readily available for analysis. This also limited the organization's ability to address fairness and bias concerns, making it harder to ensure ML systems served equitable predictions across Etsy's diverse user base.

The core conceptual requirements for ML observability appeared deceptively simple: input features, predictions, and ground truth labels. For example, in search and recommendations use cases, this might mean logging user features and item features, recording whether the model predicted a user would click on an item, and capturing whether the click actually occurred. However, processing these data elements at scale, calculating diverse metrics, and effectively visualizing, monitoring, and alerting on them proved to be an area with few established best practices and significant technical complexity.

## Architecture & Design

Etsy's ML observability architecture centers on their existing prediction logging infrastructure, which they call Feature Logs internally, integrated with a third-party SaaS vendor platform. The design leverages infrastructure already in place for collecting predictions during model serving rather than requiring wholesale architectural changes.

The data flow begins with Etsy's ML serving platform, Barista, which serves predictions for models across multiple domains including Search, Ads, Recommendations, Computer Vision, and Trust & Safety. During serving, the system logs features, predictions, and eventually ground truth in what Etsy calls Feature Logs. A critical component of the architecture involves attributing ground truth to predictions—matching actual outcomes like user clicks back to the original prediction. This produces Attributed Feature Logs, which form the foundation of the observability system.

These attributed prediction logs are stored in Google Cloud Storage (GCS) buckets, serving as the staging area for data that will be uploaded to the observability platform. The architecture employs two distinct integration patterns for moving data from GCS to the third-party vendor:

The first pattern uses custom Kubeflow Pipeline components written in Python that push data from Etsy's infrastructure to the vendor platform. This approach gives Etsy fine-grained control over how data is preprocessed and what specific data is uploaded. The second pattern leverages the vendor's file importer service, which pulls data directly from GCS buckets. This pull-based approach requires less active management from Etsy's team but places more responsibility on the vendor for data ingestion.

Both integration methods operate in batch mode, processing and uploading terabytes of data per day. The architecture is currently optimized for batch processing rather than real-time streaming, reflecting pragmatic decisions about where to invest engineering effort initially. The batch nature means there is latency between when predictions are made and when they become visible in the observability platform, though this still provides substantial value for detecting issues and analyzing trends.

The system is designed to handle data from 80+ production models spanning diverse use cases. Search models have very different characteristics from computer vision models, requiring the observability platform to support varied metric types and monitoring approaches. The architecture needed sufficient flexibility to accommodate these differences while providing a unified interface for monitoring and alerting.

Security considerations are built into the design, particularly around handling personally identifiable information (PII). The data pipelines include preprocessing steps to ensure sensitive data is properly handled before leaving Etsy's infrastructure for the vendor platform.

## Technical Implementation

The implementation leverages a combination of Etsy's existing infrastructure and third-party tooling. At the core, Etsy uses their Barista ML serving platform to serve models and generate prediction logs. Barista has been their serving platform for some time, providing the foundation for collecting the necessary observability data.

For orchestrating data processing workflows, Etsy employs Kubeflow Pipelines, a Kubernetes-native workflow engine for machine learning. They developed custom Kubeflow Pipeline components specifically for the observability use case. These components are written in Python and handle reading attributed prediction logs from GCS, preprocessing the data to meet the vendor's format requirements, and pushing it to the observability platform. The use of Kubeflow reflects Etsy's broader investment in Kubernetes-based infrastructure for ML workloads.

Google Cloud Storage serves as the primary data lake for storing both intermediate and attributed prediction logs. The choice of GCS aligns with Etsy's cloud infrastructure decisions and provides the scale needed to handle terabytes of daily prediction data. The storage layer acts as a decoupling point between prediction logging and observability upload, allowing the two systems to operate somewhat independently.

The ground truth attribution process represents a significant technical challenge. Attributing outcomes to predictions is non-trivial, especially at Etsy's scale. For search, ads, and recommendations, this means tracking user behavior after predictions are made and definitively linking actions like clicks or purchases back to specific predictions. The internal systems that perform this attribution operate as part of the broader feature engineering pipeline, producing the Attributed Feature Logs that become the source of truth for observability metrics.

For the observability platform itself, Etsy made a deliberate build-versus-buy decision to procure a third-party SaaS vendor rather than building an in-house solution. This decision was reached after an extensive proof-of-concept evaluation process based on requirements gathered from ML teams across the organization. The vendor selection considered factors including scale capabilities, support for diverse metric types, monitoring and alerting features, model explainability tools, ease of integration, and security features suitable for handling PII.

The vendor provides the frontend user interface, backend processing infrastructure, metrics calculation engine, visualization and dashboarding capabilities, and alerting system. This outsourcing allowed Etsy to avoid building and maintaining a complex distributed platform with databases, snappy UIs, sophisticated charting, and comprehensive metric libraries spanning nearly every field in machine learning. It also eliminated the need to integrate with Etsy's in-house alerting tools directly, as the vendor provided alerting capabilities.

The implementation approach prioritized getting initial value quickly through batch integration rather than pursuing more complex real-time streaming integration from the start. This pragmatic phasing allows the team to validate the observability approach and start monitoring production models while planning future enhancements like real-time data pipelines.

## Scale & Performance

Etsy's ML observability system operates at significant scale, providing visibility into 80+ production models across multiple business domains. The volume of data processed is substantial, reaching terabytes per day of prediction logs that must be attributed, preprocessed, and uploaded to the observability platform.

The models being monitored span diverse use cases with different scale characteristics. Search models handle massive request volumes as users browse the Etsy marketplace. Ads and recommendations models similarly process high traffic volumes, directly impacting revenue generation by connecting sellers with buyers. Computer vision models process images at scale, while Trust & Safety models evaluate transactions and user behavior for fraud and policy violations.

Most models follow a 24-hour retraining schedule operating on sliding windows of historical data, typically covering the last three months. This means the system needs to support model versioning and performance tracking as new model versions deploy daily. The frequent retraining cadence, while expensive, has historically prevented significant model drift issues—though one of the observability system's goals is to enable more intelligent, metrics-driven retraining that could reduce this operational cost.

The batch processing architecture uploads data with some latency rather than in real-time. While specific latency numbers are not provided, the emphasis on batch processing suggests the system prioritizes throughput and reliability over low-latency monitoring. For many observability use cases, near-real-time visibility into trends and performance is sufficient rather than sub-second latency.

The ground truth attribution process operates at the same massive scale, needing to match actual user behavior back to predictions across millions of daily interactions. This attribution happens for use cases where ground truth is available—fortunately most of Etsy's ML use cases in search, ads, and recommendations have clear ground truth signals in the form of user engagement metrics.

From an infrastructure perspective, the decision to use a third-party SaaS platform means Etsy avoids operating the backend infrastructure required to store and process terabytes of observability data. The vendor handles the scalability challenges of ingesting high-volume data uploads, calculating diverse metrics across 80+ models, and serving dashboards and alerts to ML practitioners across the organization.

## Trade-offs & Lessons

Etsy's ML observability journey provides several valuable lessons for organizations facing similar challenges. The central trade-off in their implementation was the build-versus-buy decision, and their reasoning illuminates when purchasing third-party tooling makes sense even for companies with strong engineering capabilities.

The team recognized that ML observability, despite its conceptual simplicity, requires building a sophisticated distributed platform with substantial frontend, backend, and infrastructure components. Creating snappy UIs, comprehensive metric libraries, flexible alerting systems, and model explainability features would require a dedicated team. The alternative—procuring a third-party solution—could provide all these capabilities without disrupting Etsy's existing ML lifecycle.

A key insight that drove the buy decision was recognizing that ML observability has essentially a single point of integration: the prediction logs that Etsy was already collecting. This contrasts with tools that span the entire ML lifecycle, which would require multiple integration points with feature engineering, training, deployment, and serving systems. Etsy's experience with such broad tools had been negative—more integration points meant more friction fitting tools into existing workflows. ML observability's narrow integration surface made it an ideal candidate for third-party tooling.

The team learned that even a "single" integration point can prove challenging in complex systems. Ground truth attribution at scale is non-trivial, requiring sophisticated systems to track user behavior and definitively link outcomes back to predictions. Processing and uploading terabytes of daily data requires careful engineering around data formats, preprocessing logic, and upload mechanisms. These challenges existed regardless of whether the observability platform itself was built or bought.

The decision to support both push-based (Kubeflow components) and pull-based (vendor file importer) integration patterns reflects pragmatic flexibility. Push-based integration gives more control over data preparation and upload, while pull-based integration reduces operational burden by letting the vendor handle data ingestion. Supporting both allows different use cases to choose the appropriate pattern.

Starting with batch processing rather than real-time streaming represents a deliberate phasing strategy. While real-time monitoring would provide faster incident detection, batch processing is simpler to implement and still provides substantial value. This pragmatic approach gets the system operational quickly, allowing teams to start deriving value from observability while planning future real-time enhancements. The team explicitly acknowledges that nothing in their initial implementation is "even near real-time," but the batch approach serves immediate goals around monitoring, alerting, and trend analysis.

The extensive requirements gathering process across Search, Ads, Recommendations, Computer Vision, and Trust & Safety teams was critical to success. These diverse use cases have very different needs—search metrics differ dramatically from computer vision metrics. Understanding this diversity upfront helped inform vendor selection and ensured the chosen platform could handle Etsy's varied requirements.

The initiative had clear, business-aligned goals beyond generic "better monitoring." Reducing long-term training costs through intelligent retraining, decreasing time to incident remediation, and enabling continuous model improvement provided concrete value propositions. The focus on fairness and bias detection also reflects mature thinking about responsible ML deployment.

For organizations evaluating similar decisions, Etsy's experience suggests several guidelines. Consider build-versus-buy based on integration complexity rather than just capabilities—narrow integration surfaces favor third-party tools. Be realistic about the effort required to build comprehensive platforms with good UX. Recognize that even "simple" integrations have hidden complexity at scale. Phase implementations pragmatically, getting value from simpler batch approaches before investing in real-time systems. Finally, invest heavily in requirements gathering across diverse use cases to ensure solutions meet actual practitioner needs rather than theoretical requirements.

The team's transparency about being early in their journey—"we've only just begun integrating and leveraging all the features"—is refreshing. They acknowledge that significant work remains to fully realize the vision of intelligent retraining, robust alerting, and real-time integration. This honest assessment of maturity helps calibrate expectations for similar initiatives at other organizations.
