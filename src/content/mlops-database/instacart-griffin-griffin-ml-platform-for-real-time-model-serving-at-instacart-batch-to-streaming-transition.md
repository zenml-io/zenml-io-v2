---
title: "Griffin ML Platform for Real-Time Model Serving at Instacart (Batch-to-Streaming Transition)"
slug: "instacart-griffin-griffin-ml-platform-for-real-time-model-serving-at-instacart-batch-to-streaming-transition"
draft: false
mlopsTags:
  - "feature-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "airflow"
  - "ab-testing"
  - "deployment"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "e-commerce"
company: "Instacart"
companySlug: "instacart"
platformName: "Griffin"
contentType: "video"
summary: "Instacart developed Griffin, their internal ML platform, to evolve their machine learning infrastructure from batch processing to real-time processing capabilities. Led by Sahil Khanna and the ML engineering team, the platform was designed to address the needs of an e-commerce grocery business where real-time predictions significantly impact customer experience and business outcomes. The journey emphasized the importance of staying customer-focused and taking the right architectural approach, with the team documenting their learnings in blog posts to share insights with the broader ML community. The platform enabled Instacart to serve machine learning models at scale for their core business operations, transitioning from delayed batch predictions to immediate, real-time inference that could respond to dynamic customer and marketplace conditions."
link: "https://home.mlops.community/public/videos/griffin-ml-platform-at-instacart"
year: 2023
seo:
  title: "Instacart: Griffin ML Platform for Real-Time Model Serving at Instacart (Batch-to-Streaming Transition) - ZenML MLOps Database"
  description: "Instacart developed Griffin, their internal ML platform, to evolve their machine learning infrastructure from batch processing to real-time processing capabilities. Led by Sahil Khanna and the ML engineering team, the platform was designed to address the needs of an e-commerce grocery business where real-time predictions significantly impact customer experience and business outcomes. The journey emphasized the importance of staying customer-focused and taking the right architectural approach, with the team documenting their learnings in blog posts to share insights with the broader ML community. The platform enabled Instacart to serve machine learning models at scale for their core business operations, transitioning from delayed batch predictions to immediate, real-time inference that could respond to dynamic customer and marketplace conditions."
  canonical: "https://www.zenml.io/mlops-database/instacart-griffin-griffin-ml-platform-for-real-time-model-serving-at-instacart-batch-to-streaming-transition"
  ogTitle: "Instacart: Griffin ML Platform for Real-Time Model Serving at Instacart (Batch-to-Streaming Transition) - ZenML MLOps Database"
  ogDescription: "Instacart developed Griffin, their internal ML platform, to evolve their machine learning infrastructure from batch processing to real-time processing capabilities. Led by Sahil Khanna and the ML engineering team, the platform was designed to address the needs of an e-commerce grocery business where real-time predictions significantly impact customer experience and business outcomes. The journey emphasized the importance of staying customer-focused and taking the right architectural approach, with the team documenting their learnings in blog posts to share insights with the broader ML community. The platform enabled Instacart to serve machine learning models at scale for their core business operations, transitioning from delayed batch predictions to immediate, real-time inference that could respond to dynamic customer and marketplace conditions."
mlops:
  source: "sqlite"
  entryId: 139
  sourceUrl: "https://home.mlops.community/public/videos/griffin-ml-platform-at-instacart"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061807"
  lastUpdated: "2026-04-14T19:55:25.322727"
---

## Problem Context

Instacart faced a fundamental challenge common to many fast-growing consumer-facing companies: their initial ML infrastructure was built around batch processing, which created significant limitations for a real-time marketplace business. In the grocery delivery domain, customer expectations, inventory availability, shopper availability, and demand patterns all change rapidly throughout the day. Batch processing meant that predictions used for critical decisions like search ranking, recommendations, delivery time estimation, and demand forecasting could be hours or even a day old by the time they were served to customers.

The motivation for building Griffin stemmed from recognizing that real-time ML processing wasn't just a nice-to-have feature but a business necessity. When customers search for products, the relevance of results depends on current inventory levels, which fluctuate constantly. When estimating delivery times, real-time shopper availability and store congestion matter more than historical averages. The gap between when data was generated and when predictions were made using that data created a fundamental disconnect that impacted key business metrics.

Beyond the technical limitations of batch processing, Instacart's ML teams also faced the broader operational challenges that many organizations encounter as they scale their ML capabilities. These include the need for consistent feature engineering across training and serving, the complexity of deploying models safely to production, the difficulty of monitoring model performance in production, and the challenge of enabling data scientists to move quickly without compromising reliability or creating technical debt.

## Architecture & Design

Griffin was architected as a comprehensive ML platform that would support the full machine learning lifecycle, from feature engineering through model training, deployment, and serving. The platform's design reflected a deliberate evolution from batch-oriented workflows to real-time capabilities, rather than a complete rebuild from scratch.

The core architectural principle was enabling real-time feature computation and model serving while maintaining the reliability and observability that comes with more traditional batch systems. This meant building infrastructure that could handle streaming data, compute features on-demand with low latency, and serve predictions synchronously within the tight latency budgets required by customer-facing applications.

The platform needed to support multiple inference patterns simultaneously. Some use cases like demand forecasting or inventory optimization could still operate effectively on batch predictions generated periodically. Others, particularly those in the customer experience path like search and recommendations, required real-time predictions computed for each request. Griffin was designed to accommodate both patterns, allowing ML teams to choose the appropriate approach for their specific use case rather than forcing everything into one paradigm.

Feature management emerged as a critical architectural component. Instacart recognized that features used for training models needed to be computed identically at serving time to avoid training-serving skew, one of the most common sources of ML production failures. The platform needed to provide mechanisms for defining features once and using them consistently across offline training pipelines and online serving paths. This required careful design around feature definitions, versioning, and computation engines that could operate in both batch and real-time contexts.

The model deployment and serving infrastructure needed to handle the operational complexities of running many models in production. This included safe rollout mechanisms with gradual traffic ramp-ups, A/B testing capabilities to measure the business impact of new models, rollback mechanisms for when models degraded, and comprehensive monitoring to detect issues quickly. The platform aimed to make these operational concerns standardized and largely automated rather than requiring custom engineering for each model deployment.

## Technical Implementation

While the source material doesn't provide exhaustive technical implementation details about specific technologies and tools used in Griffin, the discussion emphasizes the journey from batch to real-time processing as the core technical transition. This architectural shift typically requires fundamental changes to data infrastructure, moving from periodic batch jobs (often orchestrated by systems like Airflow) to streaming data pipelines and real-time computation engines.

Real-time ML platforms generally require several key technical components that Griffin likely incorporated. These include streaming data infrastructure to ingest events in real-time (potentially using technologies like Kafka or similar message queues), low-latency feature computation engines that can calculate features on-demand or maintain pre-computed features with minimal staleness, model serving infrastructure that can return predictions within milliseconds to hundreds of milliseconds depending on the use case, and monitoring systems that can detect anomalies in both data and model predictions in near real-time.

The platform needed to integrate with Instacart's existing data warehouse and analytics infrastructure while adding new capabilities for streaming and real-time computation. This hybrid approach allows teams to leverage historical data for training while ensuring fresh data is available for prediction time. The technical implementation likely involved building abstractions that hid much of this complexity from data scientists, allowing them to focus on model development rather than infrastructure operations.

The team's emphasis on "soft factors" like staying customer-focused suggests they made technical trade-offs that prioritized solving real business problems over building technically perfect systems. This pragmatic approach often means starting with simpler implementations that can be deployed quickly and iterating based on real-world feedback, rather than attempting to build a comprehensive platform before any models go live.

## Scale & Performance

The source material doesn't provide specific quantitative metrics about Griffin's scale and performance characteristics. However, given Instacart's position as a major grocery delivery platform serving millions of customers across North America, the system necessarily operates at significant scale.

Real-time ML platforms in e-commerce contexts typically need to handle thousands to tens of thousands of prediction requests per second during peak periods. Latency requirements are strict, often requiring predictions to be generated in under 100 milliseconds to fit within overall page load time budgets. Feature computation needs to be even faster, potentially completing in single-digit milliseconds for features that are computed on-demand.

The transition from batch to real-time processing represents a fundamental shift in performance requirements. Batch systems can optimize for throughput, processing large volumes of data efficiently even if individual predictions take seconds or minutes. Real-time systems must optimize for latency, returning results quickly enough to be useful in interactive contexts. This typically requires different infrastructure choices, including in-memory computation, pre-computation and caching strategies, and careful optimization of model inference time.

The scale challenges also extend to data volumes. Real-time systems need to process streaming events continuously, potentially handling millions of events per hour. These events need to be transformed into features, which may require joins with reference data, aggregations over time windows, and other computationally intensive operations, all while maintaining low latency.

## Trade-offs & Lessons

The presentation emphasizes several key lessons from Instacart's journey building Griffin, with particular focus on what they call "soft factors" that contributed to success beyond pure technical execution.

**Customer-Focused Approach**: Sahil specifically highlights the importance of staying customer-focused throughout the platform development process. This suggests they avoided the trap of building infrastructure for its own sake or optimizing for technical elegance over business impact. By keeping actual customer needs and business outcomes at the center of decision-making, the team could prioritize features and capabilities that would deliver real value rather than getting lost in technical complexity. This customer focus likely helped them make better trade-off decisions when choosing between different technical approaches.

**The Right Approach Matters**: The emphasis on taking "the right approach" suggests they learned important lessons about methodology and process, not just technology choices. This could include lessons about incremental migration strategies (moving from batch to real-time gradually rather than all at once), about building buy-in across the organization, about balancing standardization with flexibility, and about when to build versus buy components of the platform. The right approach likely also involved setting appropriate expectations about timelines and making sure the platform evolved in step with the organization's ML maturity.

**Journey Over Destination**: By framing their story as a "journey" and emphasizing its relevance to other ML teams, Instacart acknowledges that building an ML platform is not a one-time project but an ongoing evolution. The platform needs to grow and change as the organization's ML capabilities mature, as new use cases emerge, and as the technology landscape evolves. This perspective helps avoid the mistake of trying to build the "perfect" platform upfront, instead encouraging iterative development based on real needs.

**Knowledge Sharing**: The team's decision to write multiple blog posts documenting their journey demonstrates a commitment to sharing learnings with the broader community. This transparency benefits the industry while also forcing the team to articulate their thinking clearly, which often leads to better decisions and deeper understanding. Organizations building ML platforms can learn as much from understanding another company's journey and trade-offs as they can from the specific technical details.

**Batch to Real-time Evolution**: The core technical lesson is about the importance of real-time processing for certain business contexts. While batch ML systems are simpler to build and operate, they create fundamental limitations for use cases where freshness matters. However, the migration from batch to real-time is complex and requires careful planning. Not every use case needs real-time predictions, so platforms should support both patterns rather than forcing everything into one paradigm.

The Griffin platform represents Instacart's recognition that ML infrastructure is critical business infrastructure, not a side project. By investing in building a comprehensive platform that addresses the real operational challenges of production ML, they enabled their data science teams to move faster and deliver more value while maintaining reliability and quality. The emphasis on soft factors alongside technical execution provides valuable guidance for other organizations undertaking similar platform development efforts.
