---
title: "Panel on adopting Ray for ML platforms: replacing Spark, scaling deep learning, and integrating with Kubernetes"
slug: "ray-summit-ml-platform-on-ray-panel-on-adopting-ray-for-ml-platforms-replacing-spark-scaling-deep-learning-and-integrati"
draft: false
mlopsTags:
  - "compute-management"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "dask"
  - "databricks"
  - "docker"
  - "kubernetes"
  - "mlflow"
  - "ray"
  - "spark"
  - "terraform"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "retraining"
  - "serving"
  - "training"
industryTags: "tech"
company: "Ray Summit"
companySlug: "ray-summit"
platformName: "ML Platform on Ray"
contentType: "video"
summary: "This panel discussion from Ray Summit 2024 features ML platform leaders from Shopify, Robinhood, and Uber discussing their adoption of Ray for building next-generation machine learning platforms. All three companies faced similar challenges with their existing Spark-based infrastructure, particularly around supporting deep learning workloads, rapid library adoption, and scaling with explosive data growth. They converged on Ray as a unified solution that provides Python-native distributed computing, seamless Kubernetes integration, strong deep learning support, and the flexibility to bring in cutting-edge ML libraries quickly. Shopify aims to reduce model deployment time from days to hours, Robinhood values the security integration with their Kubernetes infrastructure, and Uber is migrating both classical ML and deep learning workloads from Spark and internal systems to Ray, achieving significant performance gains with GPU-accelerated XGBoost in production."
link: "https://www.youtube.com/watch?v=_L0lsShbKaY"
year: 2024
seo:
  title: "Ray Summit: Panel on adopting Ray for ML platforms: replacing Spark, scaling deep learning, and integrating with Kubernetes - ZenML MLOps Database"
  description: "This panel discussion from Ray Summit 2024 features ML platform leaders from Shopify, Robinhood, and Uber discussing their adoption of Ray for building next-generation machine learning platforms. All three companies faced similar challenges with their existing Spark-based infrastructure, particularly around supporting deep learning workloads, rapid library adoption, and scaling with explosive data growth. They converged on Ray as a unified solution that provides Python-native distributed computing, seamless Kubernetes integration, strong deep learning support, and the flexibility to bring in cutting-edge ML libraries quickly. Shopify aims to reduce model deployment time from days to hours, Robinhood values the security integration with their Kubernetes infrastructure, and Uber is migrating both classical ML and deep learning workloads from Spark and internal systems to Ray, achieving significant performance gains with GPU-accelerated XGBoost in production."
  canonical: "https://www.zenml.io/mlops-database/ray-summit-ml-platform-on-ray-panel-on-adopting-ray-for-ml-platforms-replacing-spark-scaling-deep-learning-and-integrati"
  ogTitle: "Ray Summit: Panel on adopting Ray for ML platforms: replacing Spark, scaling deep learning, and integrating with Kubernetes - ZenML MLOps Database"
  ogDescription: "This panel discussion from Ray Summit 2024 features ML platform leaders from Shopify, Robinhood, and Uber discussing their adoption of Ray for building next-generation machine learning platforms. All three companies faced similar challenges with their existing Spark-based infrastructure, particularly around supporting deep learning workloads, rapid library adoption, and scaling with explosive data growth. They converged on Ray as a unified solution that provides Python-native distributed computing, seamless Kubernetes integration, strong deep learning support, and the flexibility to bring in cutting-edge ML libraries quickly. Shopify aims to reduce model deployment time from days to hours, Robinhood values the security integration with their Kubernetes infrastructure, and Uber is migrating both classical ML and deep learning workloads from Spark and internal systems to Ray, achieving significant performance gains with GPU-accelerated XGBoost in production."
mlops:
  source: "sqlite"
  entryId: 223
  sourceUrl: "https://www.youtube.com/watch?v=_L0lsShbKaY"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.619104"
  lastUpdated: "2026-04-14T19:56:06.436466"
---

## Problem Context

The three companies represented in this panel—Shopify, Robinhood, and Uber—all faced common challenges with their existing ML infrastructure that motivated evaluating and adopting Ray for their platforms.

**Shopify's challenges** centered on explosive growth and flexibility constraints. Their data growth runs at approximately 5x per year, creating a situation where infrastructure built today may not work in a single quarter. They initially ran pure Spark-based ML systems but encountered severe scaling limitations. They then moved to a hybrid approach combining Spark with Google's AI Platform and Dataflow with TensorFlow, which provided better scaling but severely limited their ability to adopt new libraries and techniques quickly. The platform team found it difficult to keep pace with advances in ML research and give data scientists flexibility to leverage cutting-edge frameworks. Additionally, deploying models to production was extremely time-consuming, sometimes taking days to weeks, requiring ML engineers to coordinate with Kubernetes infrastructure teams and often rewrite serving logic in Ruby (Shopify's primary application language) rather than Python.

**Robinhood's challenges** stemmed from being in the fintech space where security and privacy are paramount concerns. They needed ML infrastructure that could integrate deeply with their existing security controls and internal services while still providing data scientists with the flexibility to experiment and scale. Their initial use cases focused on risk, fraud detection, and classical ML with XGBoost, but they anticipated growing needs for deep learning, particularly around customer support and referrals. They needed a solution that could provide both autonomy to data scientists and strong security integration with their Kubernetes-based infrastructure.

**Uber's challenges** were rooted in the maturity and complexity of their ML ecosystem. Uber's Michelangelo platform was pioneering in providing end-to-end ML infrastructure, initially built entirely on Spark for classical ML problems. As deep learning became critical for Uber's diverse use cases—including geospatial problems unique to ride-sharing and delivery businesses, recommendation systems, search, and fraud detection—Spark proved inadequate for these workloads. This led to developing separate internal systems for deep learning, creating fragmentation with parallel compute infrastructure for classical ML and deep learning. Uber runs hundreds of models that retrain daily or weekly, supported by dozens of ML engineering teams across the company, making consolidation and efficiency critical concerns.

## Architecture and Design Approach

All three companies converged on Ray as the foundation for their next-generation ML platforms, but with different architectural integration strategies based on their organizational maturity and existing infrastructure.

**Infrastructure Integration**: Both Shopify and Robinhood emphasized Ray's seamless integration with Kubernetes as a critical architectural decision. They are "Kubernetes shops" running production workloads entirely on Kubernetes, and Ray's ability to run natively on their existing Kubernetes clusters meant they could leverage existing security controls, networking, and operational tooling without standing up parallel infrastructure. Robinhood particularly valued this for connecting to internal services and maintaining their stringent security posture. Uber, by contrast, has more custom infrastructure but is strategically moving toward Ray for consolidation.

**Compute Unification Strategy**: The architectural vision across all three companies centers on using Ray as a unified compute layer spanning the entire ML lifecycle. Rather than maintaining separate systems for data preprocessing, classical ML training, deep learning training, and model serving, Ray provides a single abstraction that handles all these workloads. Uber explicitly mentioned this consolidation benefit—moving from their parallel Spark and internal deep learning systems to a unified Ray-based approach that supports both classical ML and deep learning workloads with the same infrastructure.

**Client-Server Decoupling**: Robinhood highlighted Ray Client as a favorite architectural feature, which decouples notebook servers from training infrastructure. This separation allows data scientists to collaborate on shared notebook servers while using Ray Client to submit training jobs to separate, scalable compute clusters. Each team can maintain their own Ray clusters with isolated security settings while sharing the collaborative notebook environment.

**Serving Architecture**: Shopify outlined an ambitious architectural goal around serving. Currently, deploying models requires creating separate services, coordinating with infrastructure teams, and often translating model code from Python to Ruby. Their Ray-based architecture aims to provide a unified serving layer where ML engineers can deploy models directly from Python with simple command-line operations, with Ray clusters handling the infrastructure concerns like scaling, preprocessing, and post-processing for online inference automatically.

## Technical Implementation

The technical stack choices and integration strategies reveal both the maturity of Ray adoption and the specific priorities of each organization.

**Model Types and Frameworks**: All three companies extensively use XGBoost for classical machine learning problems, which remains their largest workload category. Deep learning is a major growth area across all organizations. Shopify deployed a 150-million parameter model in production combining BERT for text classification with MobileNetV2 for image classification, running inference on 400 million records and 10 billion images. They also mentioned significant use of reinforcement learning at both Uber and Robinhood, reflecting the complexity of their problem domains (pricing, routing, trading decisions).

**Ray Integration with XGBoost and GPUs**: Uber specifically mentioned collaborating with Anyscale on running XGBoost on Ray with GPU acceleration, which they've successfully deployed to production. This represents a significant technical achievement—Uber reported achieving "significant performance gains" compared to their Spark-based XGBoost implementation. This GPU-accelerated classical ML training appears to be one of the first production wins enabling concrete migration from legacy infrastructure.

**Deep Learning Framework Integration**: Uber's team are the primary maintainers of Horovod, the widely-used distributed deep learning framework that's been adopted from supercomputing environments (including the latest NVIDIA A100-based national lab supercomputers) down to small clusters. Uber has been collaborating closely with the Ray team on running Horovod on Ray, which factored heavily into their technology selection. This integration allows them to leverage their existing investment in Horovod while gaining Ray's broader infrastructure benefits. Uber also open-sourced Petastorm for data loading and Neuropod for model serving abstraction across frameworks.

**Data Processing Challenges**: The integration of data preprocessing remains a work in progress across organizations. Shopify highlighted that some of their models use TensorFlow with tf.transform embedded in Dataflow pipelines, and the lack of Apache Beam runners for Ray has been a hurdle. They're exploring Dask as an alternative for data processing integrated with Ray. Robinhood similarly mentioned that better integration between data processing libraries like Dask and Ray training workflows would improve the end-to-end pipeline experience. The community is actively working on these integrations.

**Prototyping Speed**: Multiple panelists emphasized Ray's ease of adoption. Shopify reported building a prototype of one of their largest models on Ray in just two to three weeks. This rapid prototyping capability reflects Ray's Python-native design and drop-in replacement APIs that allow data scientists to scale existing code with minimal modifications.

## Scale and Performance

The scale characteristics across these three companies vary significantly but all represent substantial ML operations.

**Shopify's Scale**: They process approximately 400 million records and 10 billion images for their product classification system. Their largest production model contains 150 million parameters. Critically, their data growth rate of 5x per year and similar compute growth means infrastructure must be designed for rapid scaling rather than just current-state capacity. This hypergrowth environment makes "future-proof" infrastructure choices paramount.

**Uber's Scale**: While specific numbers were limited, Uber operates "hundreds of models" that retrain daily or weekly, supported by "dozens of teams" of ML engineers across the company. The diversity of use cases—from standard recommendation and fraud detection to unique geospatial problems for routing and delivery optimization—creates a complex and heterogeneous ML workload profile that stresses platform flexibility and generality.

**Production Performance Gains**: Uber reported "significant performance gains" from their Ray-based XGBoost with GPU acceleration compared to their previous Spark implementation. While specific metrics weren't disclosed, this represents concrete production validation that the migration delivers measurable improvements beyond just developer experience.

**Deployment Time Goals**: Shopify set an ambitious target of reducing model deployment time from "days to weeks" down to "hours." This represents not just an incremental improvement but a fundamental shift in ML velocity, enabling much faster iteration cycles and experimentation in production.

**Auto-scaling Benefits**: Robinhood specifically called out Ray's auto-scaler as enabling different teams to maintain isolated clusters that scale independently without interference, improving both resource efficiency and user experience. This elastic scaling capability is critical for organizations with multiple teams sharing infrastructure.

## Trade-offs and Lessons Learned

The panel provided candid insights into both the benefits realized and challenges encountered during Ray adoption.

**Key Benefits Realized**:

The Python-native design emerged as perhaps the most universally valued benefit. Data scientists can work end-to-end in Python without context switching to other languages or paradigms. The "drop-in replacement" APIs for popular libraries mean existing code can scale to distributed environments with minimal changes, dramatically lowering the adoption barrier.

Kubernetes integration delivered major wins for companies with existing Kubernetes infrastructure. Rather than asking infrastructure teams to learn and operate new systems, Ray runs on their existing production platform, inheriting all existing security, networking, monitoring, and operational tooling. Robinhood emphasized this was a "major security win" allowing them to maintain their stringent security posture.

Deep learning support as a first-class citizen—rather than an afterthought—was critical for all three organizations. With Spark never designed for deep learning workloads, Ray provides native support for distributed deep learning frameworks, GPU utilization, and integration with tools like Horovod.

The flexibility to adopt new libraries rapidly addressed a core pain point, especially for Shopify. Rather than waiting for platform teams to integrate and support new techniques, the open ecosystem approach means data scientists can bring in cutting-edge research implementations much more quickly.

Community and vendor collaboration was repeatedly highlighted as a differentiator. All three companies mentioned close collaboration with Anyscale and the Ray team on integration challenges, feature requests, and bug fixes. This responsive ecosystem support accelerated their adoption significantly.

**Challenges and Gaps**:

Production maturity features remain an area for improvement. Uber specifically compared Ray to Spark's maturity, noting that Spark's history server and metric exposure capabilities developed over years of production use. Ray provides basic observability but needs more sophisticated metric exposure, debugging tools, and operational visibility for large-scale production deployments.

Data processing integration emerged as the most commonly cited gap. The lack of Apache Beam runners for Ray creates friction for teams using Beam-based data pipelines (like Shopify's tf.transform workflows). While alternatives like Dask are being explored, the integration between data processing and training workflows needs further development to provide truly seamless end-to-end pipelines.

Custom package installation within Ray environments was mentioned as a feature in progress, suggesting some operational friction around environment management and dependency handling.

Migration complexity for organizations with substantial existing infrastructure should not be underestimated. While Ray lowers barriers for greenfield development, migrating hundreds of existing models from Spark or custom systems to Ray remains "time-consuming" work requiring engineering effort, careful validation, and phased rollout strategies.

**Strategic Insights for Practitioners**:

The panelists offered specific advice for organizations considering Ray adoption. For greenfield ML platforms, they recommend seriously evaluating Ray as a foundational component from the start, engaging early with the Ray team and community. For organizations with existing infrastructure like Uber, the recommended approach is incremental replacement—starting with one component (like model training) to learn how Ray integrates with organizational architecture, then expanding scope based on lessons learned. This de-risks the migration and builds internal expertise gradually.

The importance of community engagement was repeatedly emphasized. Getting hands-on quickly with prototypes, reading the Ray architecture papers, and actively engaging with both Anyscale and the open-source community accelerated adoption and problem-solving significantly. This collaborative approach helped all three companies navigate integration challenges much more effectively than working in isolation.

**Future Directions**:

Looking forward, the panelists expressed excitement about several emerging capabilities. Uber highlighted stateful serving and online learning as a new class of problems where Ray's architecture provides unique advantages. Traditional stateless models trained on historical data could evolve into systems that maintain state and react to fresh features in real-time, unifying what today requires separate technical stacks. Ray's actor model and distributed state management make it well-positioned for these advanced use cases.

The vision of unified, end-to-end ML platforms emerged as a common theme—bringing together data preparation, training, deployment, and monitoring into a single developer experience. Shopify specifically mentioned wanting to create an "IDE-type surface" where ML engineers can go from data prep to production deployment and monitoring without context switching across multiple tools and teams. Ray's unified programming model provides the foundation for realizing this vision.
