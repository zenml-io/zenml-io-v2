---
title: "Hendrix: Ray-on-Kubernetes ML platform with frictionless cloud development environment and custom Ray/PyTorch SDK"
slug: "spotify-hendrix-ray-based-ml-platform-hendrix-ray-on-kubernetes-ml-platform-with-frictionless-cloud-development-environm"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "notebooks"
  - "pipeline-orchestration"
  - "kubeflow"
  - "kubernetes"
  - "mlflow"
  - "ray"
  - "hyperparameter-tuning"
  - "training"
industryTags: "media-entertainment"
company: "Spotify"
companySlug: "spotify"
platformName: "Hendrix + Ray-based ML platform"
contentType: "blog"
summary: "Spotify built Hendrix, an internal ML platform that leverages Ray on Kubernetes to power machine learning applications serving over 515 million users across personalized recommendations, search ranking, and content discovery. The core innovation was creating a frictionless Cloud Development Environment (CDE) that eliminated local setup complexities by providing remote cloud environments with GPU access, auto-configured tooling, and a custom Python SDK integrating Ray and PyTorch. This platform transformation improved developer productivity by standardizing development environments across ML engineers, researchers, and data scientists with diverse backgrounds, while running on Google Kubernetes Engine with the Kubeflow operator for orchestration."
link: "https://www.anyscale.com/blog/how-spotify-built-a-robust-ray-platform-with-a-frictionless-developer"
year: 2023
seo:
  title: "Spotify: Hendrix: Ray-on-Kubernetes ML platform with frictionless cloud development environment and custom Ray/PyTorch SDK - ZenML MLOps Database"
  description: "Spotify built Hendrix, an internal ML platform that leverages Ray on Kubernetes to power machine learning applications serving over 515 million users across personalized recommendations, search ranking, and content discovery. The core innovation was creating a frictionless Cloud Development Environment (CDE) that eliminated local setup complexities by providing remote cloud environments with GPU access, auto-configured tooling, and a custom Python SDK integrating Ray and PyTorch. This platform transformation improved developer productivity by standardizing development environments across ML engineers, researchers, and data scientists with diverse backgrounds, while running on Google Kubernetes Engine with the Kubeflow operator for orchestration."
  canonical: "https://www.zenml.io/mlops-database/spotify-hendrix-ray-based-ml-platform-hendrix-ray-on-kubernetes-ml-platform-with-frictionless-cloud-development-environm"
  ogTitle: "Spotify: Hendrix: Ray-on-Kubernetes ML platform with frictionless cloud development environment and custom Ray/PyTorch SDK - ZenML MLOps Database"
  ogDescription: "Spotify built Hendrix, an internal ML platform that leverages Ray on Kubernetes to power machine learning applications serving over 515 million users across personalized recommendations, search ranking, and content discovery. The core innovation was creating a frictionless Cloud Development Environment (CDE) that eliminated local setup complexities by providing remote cloud environments with GPU access, auto-configured tooling, and a custom Python SDK integrating Ray and PyTorch. This platform transformation improved developer productivity by standardizing development environments across ML engineers, researchers, and data scientists with diverse backgrounds, while running on Google Kubernetes Engine with the Kubeflow operator for orchestration."
mlops:
  source: "sqlite"
  entryId: 181
  sourceUrl: "https://www.anyscale.com/blog/how-spotify-built-a-robust-ray-platform-with-a-frictionless-developer"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.616960"
  lastUpdated: "2026-04-14T19:55:47.233781"
---

## Problem Context

Spotify operates at massive scale with over 515 million users and 210 million subscribers across 184 markets, relying heavily on machine learning to power critical applications including personalized content recommendations, search result optimization, and content discovery. The ML platform team faced several significant challenges in supporting this workload across diverse user groups including ML engineers, researchers, and data scientists.

The primary pain point was the complexity and friction in the machine learning development workflow. Users with varying technical backgrounds struggled with inconsistent local development environments, requiring time-consuming troubleshooting of broken configurations on individual machines. This setup overhead prevented developers from focusing on actual ML tasks and created onboarding friction for new team members. Additionally, local machines often lacked sufficient compute power, particularly GPU resources needed for training and experimentation, forcing developers to work with resource constraints that slowed iteration cycles.

The organization needed a unified platform that could democratize access to distributed computing infrastructure while abstracting away infrastructure complexity. The goal was to enable users to productionize ML applications quickly without being experts in distributed systems or infrastructure management. This required not just technical solutions but a fundamental rethinking of the developer experience to remove barriers between idea and implementation.

## Architecture & Design

Spotify's solution centers on Hendrix, their centralized machine learning platform built on top of Ray as the distributed computing framework. The architecture leverages Kubernetes as the foundational orchestration layer, specifically deployed on Google Kubernetes Engine (GKE) with GPU nodes attached to provide accelerated compute capabilities.

The core architectural component is Ray clusters deployed on Kubernetes using the open-source Kubeflow operator for orchestration. This design choice provides scalable and maintainable infrastructure that can grow with organizational needs while leveraging Kubernetes' native capabilities for resource management, scheduling, and high availability.

On top of this infrastructure foundation, Spotify built a custom Python SDK that bundles Ray and PyTorch libraries, creating a simplified interface for accessing the underlying distributed computing infrastructure. This SDK serves as the primary abstraction layer, hiding complexity while exposing powerful capabilities for ML development. The SDK standardizes common ML tasks and patterns, reducing boilerplate code and enabling developers to focus on model logic rather than infrastructure concerns.

A critical architectural innovation is the Cloud Development Environment (CDE) system. These CDEs are Kubernetes-based remote development environments that users can spin up on demand. Each CDE comes pre-configured with necessary tools, libraries, and access to GPU resources. The CDEs integrate with VS Code through custom extensions that Spotify developed specifically to bridge their internal ecosystem, allowing developers to query internal data endpoints, run custom SQL engines, and access other Spotify-specific tooling without leaving their development interface.

The platform also integrates with Ray's broader ecosystem, incorporating popular ML libraries including Hugging Face for transformer models, DeepSpeed for optimized training, PyG for graph neural networks, and Hydra for configuration management. This ecosystem integration ensures users can leverage state-of-the-art tools without manual installation and configuration overhead.

## Technical Implementation

The technical implementation centers on several key technology choices and custom developments. At the infrastructure layer, Spotify deployed Ray on Google Kubernetes Engine, using GPU-enabled nodes to support computationally intensive ML workloads. The Kubeflow operator manages Ray cluster lifecycle, handling provisioning, scaling, and teardown of distributed compute resources.

The custom Python SDK represents significant engineering effort to create an opinionated but flexible interface. This SDK incorporates Ray for distributed computing primitives, PyTorch for deep learning frameworks, and integrations with open-source libraries like Hydra for hierarchical configuration management and DeepSpeed for memory-efficient training at scale. The SDK design philosophy balances standardization with extensibility, providing sensible defaults while allowing advanced users to customize behavior.

For the Cloud Development Environment, Spotify built Kubernetes-based remote development infrastructure accessible from any device. The implementation emphasizes fast startup times and low latency to create a responsive developer experience comparable to local development. Each CDE instance is automatically configured with the development stack, eliminating manual setup steps. The system includes intelligent features like idle shutdown to optimize resource utilization and reduce costs when environments aren't actively in use.

The custom VS Code extensions required development effort to integrate with Spotify's internal systems. These extensions provide seamless access to proprietary data infrastructure, enabling developers to work with production data sources, execute queries against custom SQL engines, and interact with internal APIs directly from their IDE. This tight integration eliminates context switching and maintains developer flow.

Security was designed into the architecture from the beginning, implementing access control and authorization mechanisms to protect sensitive resources. The platform includes comprehensive telemetry and observability instrumentation, allowing the platform team to monitor usage patterns, identify performance bottlenecks, and proactively address issues before they impact users.

The reverse proxy implementation was optimized for high availability and fast response times, critical for delivering the frictionless experience that was central to the platform vision. This component handles routing requests to CDEs and Ray clusters while maintaining security boundaries.

## Scale & Performance

While the source material doesn't provide extensive quantitative metrics, some scale indicators are evident. Spotify serves over 515 million users and 210 million subscribers across 184 markets, indicating the ML platform must support models and infrastructure capable of operating at internet scale. The platform powers multiple critical applications including personalized recommendations, search ranking, and content discovery, suggesting high-throughput, low-latency requirements for production serving.

The Cloud Development Environment achieved notable performance characteristics with quick startup times for development environments, addressing a key user pain point. The low-latency design ensures developers can interact with remote environments responsively despite the cloud-based nature of the infrastructure.

The efficiency improvements from the CDE approach delivered measurable productivity gains. By eliminating environment configuration issues and providing more powerful compute resources than typical local machines, developers could iterate faster and spend more time on productive ML work rather than infrastructure troubleshooting. The platform enabled frictionless onboarding for users with diverse backgrounds, reducing the time from joining the team to productive contribution.

Resource optimization through features like idle shutdown helped control costs while maintaining developer experience. The platform design allows efficient allocation of expensive GPU resources, making them available when needed while reclaiming them when idle.

## Trade-offs & Lessons Learned

Spotify's journey revealed several critical insights for organizations building similar ML platforms. The team emphasized that ensuring high availability and performance is non-negotiable for developer infrastructure. A fast, highly available reverse proxy proved essential for optimizing user experience. Any latency or reliability issues in the core infrastructure directly impact developer productivity and platform adoption.

Customization and extensibility emerged as crucial design principles. While standardization provides value through consistency and reduced cognitive load, developers need flexibility to personalize their environment according to their preferences. The platform must support both personal configuration for individual preferences and repository-level configuration for project-specific requirements. This balance between opinionated defaults and customization options requires careful design decisions.

Security and telemetry cannot be afterthoughts but must be designed into the platform architecture from inception. Implementing robust access control, authorization, and comprehensive observability provides both protection and insights into platform usage. Telemetry enables data-driven platform improvements and helps identify issues before they become critical.

Integration with existing organizational tools and workflows significantly impacts adoption and user experience. The custom VS Code extensions that connected to Spotify's internal data infrastructure exemplified this principle, allowing developers to maintain familiar workflows while leveraging new platform capabilities. Seamless integration reduces friction and increases the likelihood of successful platform adoption.

The choice to build on Kubernetes provided significant leverage. By using Kubernetes as the foundation and leveraging its native features rather than building custom orchestration, Spotify avoided reinventing infrastructure primitives and benefited from the broader Kubernetes ecosystem's ongoing development and community support.

The team learned that developer experience is paramount for platform success. Technical capabilities matter little if the platform is difficult to use or creates friction in daily workflows. The CDE approach addressed this by eliminating the "works on my machine" problem and providing consistent, powerful environments accessible from anywhere.

Looking forward, Spotify identified ongoing work including completing PyTorch development integration with Ray, optimizing ML compute accelerator allocation for better resource efficiency, and further platformizing the development environment to improve accessibility, reliability, and observability. These future directions indicate an ongoing commitment to evolving the platform based on user needs and technological advancement.

The Hendrix platform demonstrates that successful ML infrastructure requires holistic thinking beyond pure technical capabilities. User experience, integration with existing workflows, security, observability, and ongoing iteration based on feedback all contribute equally to platform success alongside the core distributed computing capabilities that Ray provides.
