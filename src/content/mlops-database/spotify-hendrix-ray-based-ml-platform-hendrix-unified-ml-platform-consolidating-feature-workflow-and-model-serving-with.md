---
title: "Hendrix unified ML platform: consolidating feature, workflow, and model serving with a unified Python SDK and managed Ray compute"
slug: "spotify-hendrix-ray-based-ml-platform-hendrix-unified-ml-platform-consolidating-feature-workflow-and-model-serving-with"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "notebooks"
  - "pipeline-orchestration"
  - "dbt"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "mlflow"
  - "ray"
  - "spark"
  - "terraform"
  - "vertex-ai"
  - "ab-testing"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "monitoring"
  - "retraining"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "Spotify"
companySlug: "spotify"
platformName: "Hendrix + Ray-based ML platform"
contentType: "transcript"
summary: "Spotify evolved its fragmented ML infrastructure into Hendrix, a unified ML platform serving over 600 ML practitioners across the company. Prior to 2018, ML teams built ad-hoc solutions using custom Scala-based tools like Scio ML, leading to high complexity and maintenance burden. The platform team consolidated five separate products—including feature serving (Jukebox), workflow orchestration (Spotify Kubeflow Platform), and model serving (Salem)—into a cohesive ecosystem with a unified Python SDK. By 2023, adoption grew from 16% to 71% among ML engineers, achieved by meeting diverse personas (researchers, data scientists, ML engineers) where they are, embracing PyTorch alongside TensorFlow, introducing managed Ray for flexible distributed compute, and building deep integrations with Spotify's data and experimentation platforms. The team learned that piecemeal offerings limit adoption, opinionated paths must be balanced with flexibility, and preparing for AI governance and regulatory compliance requires unified metadata and model registry foundations."
link: "https://www.infoq.com/presentations/hendrix-ml/"
year: 2023
seo:
  title: "Spotify: Hendrix unified ML platform: consolidating feature, workflow, and model serving with a unified Python SDK and managed Ray compute - ZenML MLOps Database"
  description: "Spotify evolved its fragmented ML infrastructure into Hendrix, a unified ML platform serving over 600 ML practitioners across the company. Prior to 2018, ML teams built ad-hoc solutions using custom Scala-based tools like Scio ML, leading to high complexity and maintenance burden. The platform team consolidated five separate products—including feature serving (Jukebox), workflow orchestration (Spotify Kubeflow Platform), and model serving (Salem)—into a cohesive ecosystem with a unified Python SDK. By 2023, adoption grew from 16% to 71% among ML engineers, achieved by meeting diverse personas (researchers, data scientists, ML engineers) where they are, embracing PyTorch alongside TensorFlow, introducing managed Ray for flexible distributed compute, and building deep integrations with Spotify's data and experimentation platforms. The team learned that piecemeal offerings limit adoption, opinionated paths must be balanced with flexibility, and preparing for AI governance and regulatory compliance requires unified metadata and model registry foundations."
  canonical: "https://www.zenml.io/mlops-database/spotify-hendrix-ray-based-ml-platform-hendrix-unified-ml-platform-consolidating-feature-workflow-and-model-serving-with"
  ogTitle: "Spotify: Hendrix unified ML platform: consolidating feature, workflow, and model serving with a unified Python SDK and managed Ray compute - ZenML MLOps Database"
  ogDescription: "Spotify evolved its fragmented ML infrastructure into Hendrix, a unified ML platform serving over 600 ML practitioners across the company. Prior to 2018, ML teams built ad-hoc solutions using custom Scala-based tools like Scio ML, leading to high complexity and maintenance burden. The platform team consolidated five separate products—including feature serving (Jukebox), workflow orchestration (Spotify Kubeflow Platform), and model serving (Salem)—into a cohesive ecosystem with a unified Python SDK. By 2023, adoption grew from 16% to 71% among ML engineers, achieved by meeting diverse personas (researchers, data scientists, ML engineers) where they are, embracing PyTorch alongside TensorFlow, introducing managed Ray for flexible distributed compute, and building deep integrations with Spotify's data and experimentation platforms. The team learned that piecemeal offerings limit adoption, opinionated paths must be balanced with flexibility, and preparing for AI governance and regulatory compliance requires unified metadata and model registry foundations."
mlops:
  source: "sqlite"
  entryId: 185
  sourceUrl: "https://www.infoq.com/presentations/hendrix-ml/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.617088"
  lastUpdated: "2026-04-14T19:55:50.616464"
---

## Problem Context

Spotify's ML infrastructure challenges emerged from organic, distributed growth across the organization. Since launching in 2008, ML and AI have been fundamental to Spotify's user experiences, from early features like Related Artists search in 2010 to Discover Weekly in 2015 and the recent AI DJ. As these ML-powered features proliferated, teams built their own bespoke solutions, creating significant pain points.

The pre-platform landscape was characterized by fragmentation and high complexity. Teams relied on Scio ML, a Scala-based data processing framework built on Apache Beam, which was productive for data engineering but created barriers for ML practitioners who preferred Python. Custom open-source SDKs like Featran, Zoltar, and Noether emerged for feature computation and model serving, but ownership and maintenance remained with individual teams. ML practitioners faced a complex "Choose Your Own Adventure" async graph with many open questions about which tools to use, how to deploy models, and how to manage infrastructure. The cost to maintain ML applications was high, slowing iteration cycles and preventing teams from moving to their next problem.

By the time the ML platform team formed, it became clear that democratizing ML across Spotify's growing practitioner base—which included ML engineers, data scientists, and research scientists—required centralized infrastructure and tooling. The platform needed to reduce time-to-production from months to weeks, lower maintenance burdens, and support state-of-the-art ML techniques in a rapidly evolving landscape.

## Architecture & Design

Hendrix represents the architectural evolution from five discrete products into a unified platform. The core architectural philosophy shifted from forcing users to assemble puzzle pieces themselves to providing a seamless, integrated experience where products communicate through common entities and metadata.

The platform architecture consists of several key layers. At the foundation is the **Hendrix SDK**, a Python monorepo with sub-modules that provides a single entry point for all ML development. Users can selectively import components like `hendrix[features]` for feature engineering or access the full suite. This SDK serves as the glue connecting to Spotify's broader ecosystem, handling data access patterns, resource management in multi-tenant environments, and orchestration integration.

The **Features** component (formerly Jukebox) provides standardized APIs for both offline and online feature access. This serves as the foundation for feature development across the company, supporting batch feature computation for training and low-latency feature serving for inference. The architecture separates offline feature engineering workflows from online serving requirements, allowing teams to define features once and use them across contexts.

**Workflows** represents the most significant architectural evolution. Built on Flyte (moving away from Luigi), this component orchestrates ML pipelines from data ingestion through model deployment. The workflows layer integrates deeply with Spotify's data platform, enabling seamless scheduling where data jobs trigger ML pipeline execution. The system supports both TensorFlow Extended (TFX) for production TensorFlow workflows and more flexible PyTorch-based pipelines, acknowledging that different stages of ML development require different levels of structure.

The **Compute** layer introduces managed Ray infrastructure as a critical architectural addition. Unlike the previous partnership with Google Vertex, Ray provides more flexible, Python-native distributed computing without requiring users to manage Docker containers and dependencies. This layer serves multiple personas: researchers can spin up distributed compute for exploratory training without defining DAGs, while production pipelines can leverage Ray for scalable training and batch inference. The multi-tenant Ray clusters use namespace-based resource isolation to prevent noisy neighbor problems.

**Model Serving** (formerly Salem) provides infrastructure-as-a-service for real-time prediction endpoints. This component handles the operational complexity of serving models at scale, managing deployment lifecycle, traffic routing, and inference optimization. The serving layer integrates with the model registry to track which model versions are deployed and supports both TensorFlow and PyTorch models.

The **ML Home/Backstage** interface unifies the user experience. Built on Spotify's open-source Backstage developer portal, this provides experiment tracking, project collaboration, and model discovery. The integration with Backstage enables cross-platform capabilities like cost tracking, ownership management, and dependency visualization that extend beyond ML-specific needs.

A critical architectural decision was defining unified **Hendrix Entities**—standardized definitions for models, model versions, deployments, runs, and experiments. These entities create a common language across products, enabling the platform to serve as the source of authority for all ML activity at Spotify. This entity model supports lineage tracking, governance workflows, and integration with broader software development practices.

The platform maintains deep integrations with Spotify's **Data Platform** and **Experimentation Platform**. Rather than building isolated ML infrastructure, Hendrix leverages existing capabilities for data access (BigQuery, Parquet/Avro data lakes), GDPR compliance, and A/B testing. This architectural choice allows the 30-person ML platform engineering team to focus on ML-specific problems rather than reinventing data infrastructure.

## Technical Implementation

The technology stack reflects a pragmatic blend of open-source tools, Google Cloud services, and custom Spotify infrastructure. The platform team explicitly embraced the philosophy of "standing on the shoulders of giants" rather than building everything from scratch.

For workflow orchestration, the platform standardized on **Kubeflow Pipelines** in partnership with Google, implementing this as the Spotify Kubeflow Platform. This choice leveraged Google's investment in ML pipeline infrastructure while allowing Spotify to customize for internal needs. The platform supports **TensorFlow Extended (TFX)** as the production paradigm for TensorFlow-based workflows, providing components for data validation, schema inference, feature transformation, training, evaluation, and serving. More recently, the platform adopted **Flyte** as the next-generation workflow orchestrator, chosen for its Pythonic interface and better integration with Spotify's data ecosystem scheduling requirements.

The **Compute** infrastructure underwent a significant shift from Google Vertex to managed **Ray** clusters. Ray, backed by Anyscale, provides distributed computing specifically optimized for ML workloads. The implementation uses open-source Ray with custom Spotify management layers for multi-tenancy, resource quotas, and namespace isolation. This gives researchers and data scientists direct access to distributed compute without the overhead of defining pipeline DAGs or managing container infrastructure.

Framework support evolved from TensorFlow-only to embracing **PyTorch** as a first-class citizen. This decision recognized that PyTorch dominates ML research, appearing in most white papers and providing superior debugging experiences through its Pythonic, eager execution model. The platform supports both frameworks through the unified SDK, allowing teams to choose based on their use case while still leveraging common infrastructure for data access, experiment tracking, and deployment.

The **Hendrix SDK** is implemented as a Python monorepo with sub-module architecture. This provides a stable interface layer that abstracts underlying infrastructure changes. The SDK handles authentication, multi-tenant resource management, data format conversions between Spotify systems, and provides high-level APIs for common ML operations. Users interact primarily with Python code, even when the underlying systems use different technologies.

Data processing leverages **Scio**, Spotify's open-source Scala framework built on Apache Beam, for heavy ETL workloads. While the platform moved ML development to Python, they maintained Scio for data engineering tasks where it excels. The SDK provides bridges between Scio-processed data and Python ML workflows.

For audio processing, **Klio** (also open-sourced) provides specialized libraries for efficiently processing Spotify's catalog of over 100 million tracks and 5 million podcast titles. This handles the unique challenges of audio ML at scale.

The model serving infrastructure uses Kubernetes-based deployment with custom Spotify tooling (Salem) that manages model lifecycle, versioning, and traffic routing. The serving layer supports both batch and real-time inference patterns with different latency and throughput characteristics.

The **Analytics Workbench** provides cloud development environments, eliminating local setup friction. This is particularly important for onboarding and ensuring consistent development experiences across Spotify's distributed, work-from-anywhere workforce.

Infrastructure runs on **Google Cloud Platform** through Spotify's partnership with Google, leveraging managed services where appropriate while building custom layers for ML-specific needs. The platform maintains its own Kubernetes clusters for ML workloads with specialized configurations for GPU access, high-memory instances, and distributed training.

## Scale & Performance

The platform's scale metrics demonstrate significant growth over the five-year journey from 2018 to 2023. The ML practitioner population at Spotify expanded substantially, with 20% year-over-year growth in ML engineers, 10% growth in research scientists, and 50% growth in data scientists between 2020 and 2021. ML-focused squads grew by 30% during this period.

Platform adoption showed dramatic improvement. In 2020, only 16% of ML engineers, 5% of research scientists, and 3% of data scientists used the platform, with about 20% of ML-focused squads adopting the tools. By 2023, these numbers transformed to 71% of ML engineers, 15% of research scientists, and 11% of data scientists, with approximately 50% of ML-focused squads actively using Hendrix for day-to-day ML tasks. This represents over 600 ML practitioners using the platform.

The platform reduced time-to-production from multiple months to weeks for standard supervised learning use cases. This acceleration came from providing opinionated paths that eliminated decision paralysis and infrastructure complexity for common scenarios.

Spotify processes audio at massive scale, with a catalog exceeding 100 million tracks and 5 million podcast titles across 184 global markets. The platform serves approximately 500 million monthly active users with ML-powered experiences. Discover Weekly alone generated 2.3 billion aggregate streaming hours between 2015 and 2020.

The infrastructure supports diverse ML workloads across different scales. Some teams run exploratory training jobs that require flexible distributed compute without production infrastructure. Others deploy models serving real-time predictions to hundreds of millions of users with strict latency requirements. The platform handles both extremes through its layered architecture—Ray for flexible research compute, and Salem/Kubernetes for production serving.

The platform team itself operates with approximately 45 people total, including about 30 engineers distributed across 5 teams. This team size supports 600+ ML practitioners, demonstrating a force multiplier effect through platform investment. The distributed, work-from-anywhere nature of the team (spread across the U.S. East Coast, with the tech lead based in Atlanta) reflects Spotify's broader engineering culture.

## Trade-offs & Lessons Learned

The Hendrix journey reveals several critical lessons about building internal ML platforms that practitioners at other organizations can apply.

**Meeting users where they are proved essential**. The platform's initial focus on Scala-based Scio ML created barriers for ML practitioners who thought in Python and TensorFlow/PyTorch. The team learned that forcing users to learn new paradigms generates friction that limits adoption. Embracing Python, PyTorch, and Python-native tools like Ray dramatically improved the developer experience, especially for researchers and data scientists. This required the platform team to expand beyond their comfort zone and engineering culture's Java/Scala preference, but the adoption gains justified the investment.

**Opinionated paths must be balanced with flexibility**. The platform initially built a very structured "paved path to production" focused on Phase 3 of ML development (pipeline deployment). This worked well for ML engineers productionizing models but alienated researchers and data scientists working in Phases 1 and 2 (idea to prototype, prototype to pipeline). Users characterized this golden path as a "golden tightrope"—too narrow and rigid. The addition of Ray Compute and PyTorch support provided escape hatches for users who needed flexibility without completely abandoning structure. The lesson: platforms need both opinionated defaults for common cases and extensibility for edge cases.

**Piecemeal products limit adoption**. When the platform consisted of five separate products (Jukebox, Spotify Kubeflow Platform, Klio, Salem, ML Home), most users adopted only one tool rather than the full suite. The cognitive overhead of understanding how pieces fit together, navigating different documentation, and integrating products manually proved too high. Unifying these under the Hendrix brand with a common SDK and shared entities significantly improved adoption. Users don't think in terms of discrete products—they think about their ML workflow. The platform needed to match that mental model.

**Unified metadata and entities enable governance**. Defining common Hendrix entities (models, versions, deployments, runs) created a lingua franca that allowed products to communicate and positioned the platform as the source of truth for ML activity. This seemingly simple architectural decision unlocked multiple capabilities: cost tracking, lineage tracing, model discovery, and preparation for AI governance requirements. With increasing regulatory pressure (especially EU AI regulations), having this foundation in place before governance became mandatory provided a significant advantage over scrambling to bolt on compliance afterward.

**Persona diversification requires matrix-based thinking**. The platform initially optimized for ML engineers taking models to production. This left data scientists and researchers underserved, limiting adoption and missing opportunities. The team learned to think in a matrix: different personas (ML engineers, data scientists, researchers) at different lifecycle phases (exploration, prototyping, production) need different tool characteristics. A researcher in Phase 1 wants Notebooks, PyTorch, and flexible compute. An ML engineer in Phase 3 wants structured pipelines, validated schemas, and automated deployments. Building for this matrix rather than a single user persona expanded the platform's reach.

**Open source alignment accelerates development**. Rather than building proprietary solutions, the platform leveraged Kubeflow Pipelines, TFX, PyTorch, Ray, and Flyte. This "standing on the shoulders of giants" approach allowed a 30-person team to support 600+ practitioners. Contributing back to open source communities created partnerships with Google, Anyscale, and others that benefited both sides. The trade-off was accepting some constraints from these tools and dealing with upgrade cycles, but the velocity gain from not reinventing wheels far outweighed these costs.

**Platform culture enables focus**. Spotify's strong platform culture for data, compute, and orchestration allowed the ML platform team to focus specifically on ML challenges rather than general infrastructure. The team didn't need to build data lakes, implement GDPR compliance, or create Kubernetes clusters from scratch. This division of concerns let a relatively small team punch above its weight. Organizations without this platform culture might need larger ML platform teams or broader scope.

**Deep integration trumps loose coupling for internal platforms**. While microservices wisdom often emphasizes loose coupling, internal ML platforms benefit from deep integration with surrounding systems. Hendrix's tight integration with Spotify's data platform, experimentation platform, and Backstage developer portal created seamless user experiences that would be impossible with API-only coupling. The trade-off was increased coordination overhead and potential brittleness, but for an internal platform serving a specific organization, the user experience benefits justified this approach.

**Extensibility and augmentability are survival requirements**. The AI landscape evolved dramatically during the platform's five-year journey, from supervised learning dominance to the emergence of large language models and generative AI. Platforms that hard-code assumptions about model types or workflows become obsolete quickly. Hendrix's architecture allowing users to plug in custom components, register third-party models, and extend the SDK with their own modules provided resilience against this change. The team explicitly called out "augmentable systems" as necessary to keep pace with AI's rapid evolution.

**Adoption is a lagging indicator of product-market fit**. The jump from 16% to 71% ML engineer adoption didn't happen overnight—it required years of iteration, user research, and building with rather than for practitioners. The platform embedded engineers from user teams directly into development efforts, ensuring domain knowledge flowed both directions. This collaborative approach slowed initial development but dramatically improved the relevance of what was built and smoothed migration paths from legacy stacks.

**Unresolved challenges provide direction**. The team candidly acknowledges ongoing challenges: supporting foundation models and LLMs, preparing for future AI regulations, promoting responsible AI at scale, reducing cost and carbon footprint, and better serving researchers and data scientists. These open questions guide the roadmap and reflect the reality that ML platform development is continuous evolution rather than a finished state. Organizations should expect their platforms to always be works in progress as ML itself advances.

The Hendrix story demonstrates that successful ML platforms require technical excellence, user empathy, strategic patience, and continuous adaptation. The five-year journey from fragmented tools to unified platform, and the associated growth from 20% to 50%+ of ML practitioners adopting the platform, shows that investment in cohesive infrastructure pays compounding returns over time.
