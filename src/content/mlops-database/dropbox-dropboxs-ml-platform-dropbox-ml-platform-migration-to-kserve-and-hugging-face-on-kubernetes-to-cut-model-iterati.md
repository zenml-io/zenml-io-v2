---
title: "Dropbox ML platform migration to KServe and Hugging Face on Kubernetes to cut model iteration and deployment time"
slug: "dropbox-dropboxs-ml-platform-dropbox-ml-platform-migration-to-kserve-and-hugging-face-on-kubernetes-to-cut-model-iterati"
draft: false
mlopsTags:
  - "compute-management"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "airflow"
  - "databricks"
  - "docker"
  - "kserve"
  - "kubernetes"
  - "spark"
  - "tf-serving"
  - "torchserve"
  - "triton"
  - "data-prep"
  - "deployment"
  - "model-evaluation"
  - "serving"
  - "training"
industryTags: "tech"
company: "Dropbox"
companySlug: "dropbox"
platformName: "Dropbox's ML platform"
contentType: "video"
summary: "Dropbox's ML platform team transformed their machine learning infrastructure to dramatically reduce iteration time from weeks to under an hour by integrating open source tools like KServe and Hugging Face with their existing Kubernetes infrastructure. Serving 700 million users with over 150 production models, the team faced significant challenges with their homegrown deployment service where 47% of users reported deployment times exceeding two weeks. By leveraging KServe for model serving, integrating Hugging Face models, and building intelligent glue components including config generators, secret syncing, and automated deployment pipelines, they achieved self-service capabilities that eliminated bottlenecks while maintaining security and quality standards through benchmarking, load testing, and comprehensive observability."
link: "https://www.youtube.com/watch?v=nIIBQXOz7dA"
year: 2019
seo:
  title: "Dropbox: Dropbox ML platform migration to KServe and Hugging Face on Kubernetes to cut model iteration and deployment time - ZenML MLOps Database"
  description: "Dropbox's ML platform team transformed their machine learning infrastructure to dramatically reduce iteration time from weeks to under an hour by integrating open source tools like KServe and Hugging Face with their existing Kubernetes infrastructure. Serving 700 million users with over 150 production models, the team faced significant challenges with their homegrown deployment service where 47% of users reported deployment times exceeding two weeks. By leveraging KServe for model serving, integrating Hugging Face models, and building intelligent glue components including config generators, secret syncing, and automated deployment pipelines, they achieved self-service capabilities that eliminated bottlenecks while maintaining security and quality standards through benchmarking, load testing, and comprehensive observability."
  canonical: "https://www.zenml.io/mlops-database/dropbox-dropboxs-ml-platform-dropbox-ml-platform-migration-to-kserve-and-hugging-face-on-kubernetes-to-cut-model-iterati"
  ogTitle: "Dropbox: Dropbox ML platform migration to KServe and Hugging Face on Kubernetes to cut model iteration and deployment time - ZenML MLOps Database"
  ogDescription: "Dropbox's ML platform team transformed their machine learning infrastructure to dramatically reduce iteration time from weeks to under an hour by integrating open source tools like KServe and Hugging Face with their existing Kubernetes infrastructure. Serving 700 million users with over 150 production models, the team faced significant challenges with their homegrown deployment service where 47% of users reported deployment times exceeding two weeks. By leveraging KServe for model serving, integrating Hugging Face models, and building intelligent glue components including config generators, secret syncing, and automated deployment pipelines, they achieved self-service capabilities that eliminated bottlenecks while maintaining security and quality standards through benchmarking, load testing, and comprehensive observability."
mlops:
  source: "sqlite"
  entryId: 78
  sourceUrl: "https://www.youtube.com/watch?v=nIIBQXOz7dA"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061156"
  lastUpdated: "2026-04-14T19:54:58.055021"
---

## Problem Context

Dropbox faced significant MLOps challenges scaling machine learning infrastructure for 700 million users while maintaining velocity in an era of rapid AI advancement. The ML platform team conducted biannual surveys of their internal users including ML engineers and data scientists, revealing critical pain points in their workflow. The survey data was stark: 26% of respondents reported prototype development taking over two weeks, and 47% experienced deployment cycles exceeding two weeks with their homegrown serving platform. One particularly telling piece of feedback captured the severity: "Sometimes when I want a prototype it's faster to do it on my own without relying on ML platform."

The team recognized several fundamental challenges common to ML platforms but amplified at Dropbox's scale. Not all models are created equal in their requirements—some use cases like search suggestions demand 5-10 millisecond latency at the 95th percentile, while large language models with 40 billion parameters might reasonably take several seconds. The platform needed to accommodate this entire spectrum reliably. The iterative, non-linear nature of ML development compounded these issues, with engineers constantly exploring different approaches, backtracking, and trying alternatives while needing robust versioning throughout.

Resource allocation emerged as a critical concern, especially with the advent of powerful models requiring enormous compute capacity. The team needed better planning capabilities before deploying to production. Additionally, while many excellent tools existed for individual tasks like training or deployment, integrating them cohesively into a unified workflow proved challenging. The platform had run over 15,000 internal experiments to arrive at their 150+ production models, demonstrating both the scale of iteration required and the need for streamlined infrastructure.

The acceleration of AI following ChatGPT's November 2022 release intensified these pressures. The industry was moving faster than ever, and Dropbox needed to keep pace with new releases while avoiding vendor lock-in and maintaining agility. Prior to 2022, the team had relied heavily on bespoke, in-house solutions for many components because open source tooling wasn't sufficiently mature. This legacy infrastructure carried technical debt and required substantial ongoing support, with users becoming so dependent on the platform team's Slack support that self-service capabilities had atrophied.

## Architecture & Design

Dropbox's ML infrastructure spans the entire machine learning lifecycle from prototyping through production inference, integrating homegrown components with open source and third-party tools. The architecture leverages Dropbox's existing strengths as a mature software company, including established Kubernetes clusters, mature CI/CD pipelines, automated alerting systems, and dedicated teams managing orchestration infrastructure.

The stack as of 2022 represented a hybrid approach. Prototyping relied on JupyterHub for interactive development. Data engineering utilized Spark for distributed processing with Airflow orchestrating ETL workflows. Model storage leveraged S3, while the core deployment and inference service was entirely built in-house. This homegrown serving platform represented a significant investment but had become a bottleneck limiting iteration velocity.

The team's reimagined architecture centers on KServe as the foundational serving platform, built atop Kubernetes. KServe provides a standardized approach to model serving with support for major frameworks including TensorFlow, PyTorch, and ONNX—all formats heavily used at Dropbox. The platform supports multiple runtime options, each optimized for specific frameworks and serving platforms: TorchServe for PyTorch models, TF Serving for TensorFlow, Triton Inference Server from NVIDIA for multi-framework support, and custom KServe model servers offering greater control for infrastructure integration.

Hugging Face integration provides access to pre-trained third-party models, particularly valuable for general-purpose capabilities like text embedding. The team specifically highlighted using models like MiniLM and GTE-large for text embedding use cases critical to file-based search and organization. For large language models, Dropbox standardized on Meta's LLaMA in various parameter sizes (7 billion and 13 billion parameter variants mentioned), chosen to balance quality against inference speed and compute requirements.

The architecture incorporates several custom "glue" components bridging open source tools with Dropbox infrastructure. A model file downloader automatically pulls models from Hugging Face into Dropbox's secure model store. Deployment config tools abstract KServe's YAML complexity, providing libraries for users to generate valid configurations enriched with Dropbox-specific metadata. A secret syncer daemon runs continuously, periodically rotating short-lived credentials used by Kubernetes to pull images and model files, reducing attack surface.

A dedicated deployment service gates production models, providing security review through pull request workflows. While users can freely prototype in their own Kubernetes namespaces, production deployment requires approval and automated checks including image vulnerability scanning via Artifactory. Once approved, models deploy automatically through CI/CD pipelines.

The platform built generic ML APIs atop KServe, enabling engineering teams without ML expertise to consume intelligent capabilities without managing model deployment. Similarly, a specialized LLM stack built on KServe provides standardized access to large language models across the organization.

Quality and observability infrastructure wrap the serving layer. A benchmarking service validates model quality using standardized datasets before production deployment, crucial for maintaining user trust. Load testing tools replicate production traffic patterns, enabling capacity planning and autoscaling configuration before live deployment rather than relying on reactive on-call response. Comprehensive observability captures inference latency, memory utilization, and debugging logs, integrated with alerting to notify appropriate teams when issues arise.

## Technical Implementation

The implementation strategy centered on leveraging existing Kubernetes expertise and infrastructure rather than introducing entirely new paradigms. KServe's Kubernetes-native design proved ideal for this approach. Despite acknowledging the industry's "love-hate relationship with Kubernetes," the team had mature cluster management capabilities that made KServe integration tractable.

KServe operates through Kubernetes Custom Resource Definitions (CRDs), enabling declarative, configuration-based deployment. This config-driven approach eliminated much of the boilerplate code previously required with the homegrown serving platform. The team developed tooling to generate valid KServe configurations, including linters to catch errors and libraries abstracting common patterns. The configuration files incorporate both KServe-native parameters and Dropbox-specific metadata required for internal systems integration.

The custom KServe model server runtime received particular emphasis for use cases requiring deeper infrastructure integration. This runtime provides flexibility to write custom serving logic while benefiting from KServe's orchestration capabilities. For simple third-party model deployment, the team demonstrated remarkably minimal code requirements—a Facebook chatbot model required only a few lines of highlighted code beyond generated boilerplate to deploy from Hugging Face.

The secret syncing implementation addresses security requirements without compromising velocity. Rather than manual credential management or long-lived secrets, the daemon continuously refreshes short-lived credentials for image registry access and model file retrieval. This automated rotation maintains security posture while enabling self-service deployment.

Load testing tools simulate production traffic patterns against candidate model deployments. By replicating actual load characteristics before production rollout, the team can validate autoscaling configurations and resource allocations. This proactive approach replaces reactive capacity management and reduces on-call burden.

The benchmarking service implements automated quality gates using standardized evaluation datasets relevant to specific model types. Before a model reaches production, it must demonstrate acceptable performance on these benchmarks, providing quantitative quality assurance beyond manual review.

Observability leverages Dropbox's existing monitoring infrastructure, likely Prometheus-based given the Kubernetes foundation, though specific tools weren't detailed. The integration captures KServe metrics alongside custom application metrics, providing comprehensive visibility into model performance, resource utilization, and potential issues.

The deployment workflow integrates with standard software development practices. Engineers develop locally or in JupyterHub, optionally prototype in personal Kubernetes namespaces, then submit pull requests for production deployment. Automated checks run including configuration validation, security scanning, and benchmark evaluation. Once approved, CI/CD pipelines handle deployment automatically, with KServe orchestrating pod creation, model loading, and traffic routing.

## Scale & Performance

Dropbox's ML infrastructure operates at significant scale serving 700 million users. The platform supports over 150 production models as of August 2022, with continued growth following the improvements described. The team had run over 15,000 internal experiments to identify models suitable for production deployment, indicating a high iteration-to-production ratio typical of ML development.

The transformation's impact on iteration velocity was dramatic. The complete cycle from prototype to deployment decreased from weeks to under an hour. While some of this time represents waiting for KServe to orchestrate resources, spin up pods, and download model files, the improvement represents roughly two orders of magnitude acceleration. For third-party model deployment from Hugging Face, the process became nearly instantaneous from a developer perspective—finding an embeddings model and spinning it up requires minimal friction.

Specific latency requirements vary dramatically across use cases. Search suggestion models demand 5-10 millisecond response times at the 95th percentile, representing the low-latency extreme. Large language models with 40 billion parameters operate at the opposite end, with multi-second inference times built into product expectations. The platform successfully accommodates this range through flexible runtime selection and resource allocation.

The team specifically mentioned deploying LLaMA variants including 7 billion and 13 billion parameter models, balancing quality requirements against inference speed and compute costs. These models power several Dropbox products including Dropbox AI, which enables natural language question answering over documents with source citations, and Dropbox Dash, a universal search product organizing content across Dropbox and external sources.

The 47% of users experiencing deployment times over two weeks before the changes highlights the concrete impact. Similarly, the 26% experiencing prototype delays over two weeks demonstrates that bottlenecks existed throughout the development lifecycle, not just at deployment. The improvements addressed both pain points through the unified KServe-based approach.

Resource utilization became more predictable through load testing and capacity planning tools. Rather than deploying with uncertain autoscaling configurations and hoping for the best, teams could validate resource requirements under realistic load before production rollout. This proactive approach improved reliability while potentially optimizing resource efficiency.

## Trade-offs & Lessons

The Dropbox team's journey offers several valuable insights for ML platform practitioners. The decision to embrace open source tooling rather than continuing to build everything in-house represented a significant strategic shift. Before 2022, immature open source options had driven them toward bespoke solutions, accumulating technical debt and maintenance burden. As the ecosystem matured, particularly with tools like KServe and the Hugging Face model hub, the calculus changed.

The team emphasized several key questions when evaluating open source integration. Licensing requires careful review to ensure legal use and distribution within corporate systems. Operational burden—often the hardest aspect to predict—determines whether a tool actually reduces complexity or simply shifts it. The ability to leverage existing advantages, particularly mature infrastructure and established tooling, strongly influenced their choices. KServe's Kubernetes foundation exemplified this, turning their existing cluster management expertise into an asset rather than requiring new infrastructure paradigms.

The presentation acknowledged advantages Dropbox enjoys as a mature software company: established Kubernetes infrastructure, dedicated platform teams, mature CI/CD, and automated alerting. These advantages aren't universal, and organizations earlier in their infrastructure journey might face different trade-offs. The team stressed the importance of honest self-assessment about current capabilities and readiness before adopting shiny new tools.

The integration strategy favored building targeted "glue" components over adopting tools end-to-end. Rather than wholesale replacement, they connected best-of-breed open source with existing internal systems through focused engineering: config generators, secret syncing, deployment gates, and quality validation. This incremental approach managed risk while delivering concrete improvements.

The increased self-service capability reduced support burden but required upfront investment in tooling and documentation. Users previously dependent on platform team Slack support needed to transition to autonomous operation. The team viewed this positively, freeing platform engineers from constant interrupt-driven work to focus on infrastructure improvements.

Model selection insights reveal pragmatism about LLM limitations. The team advised against reflexively using large language models for every problem, noting their computational intensity. Simpler models often solve specific tasks more efficiently. For text embedding use cases, they preferred specialized models like MiniLM over general-purpose LLMs. When LLMs were appropriate, they favored open source options like LLaMA for controllability and cost management over proprietary APIs for most use cases.

The context window limitation inherent to LLMs prompted strategies like semantic search over embedded vectors to identify relevant document sections before LLM processing, rather than attempting to process entire documents directly. This hybrid approach addresses scale limitations while leveraging LLM capabilities where most valuable.

The biannual survey process provided critical feedback loops, ensuring platform development aligned with user needs rather than platform team assumptions. The willingness to share negative feedback publicly—including the stinging quote about avoiding the platform—demonstrates healthy organizational culture around continuous improvement.

The team acknowledged that their LLM stack warranted deeper exploration but couldn't be covered comprehensively in the presentation. This suggests ongoing evolution and experimentation, particularly important given the rapid pace of LLM advancement since late 2022.

The evolution from bespoke pre-2022 infrastructure through incremental open source adoption to the mature hybrid platform described illustrates a common maturity path. Early-stage ML platforms often require custom solutions when off-the-shelf options don't exist. As the ecosystem matures and organizational needs clarify, selective open source adoption reduces maintenance burden while preserving critical customization through targeted integration work. The key appears to be thoughtful evaluation of where standardization provides value versus where differentiation matters.
