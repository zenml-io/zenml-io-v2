---
title: "Evolution of ML Model Deployment Infrastructure at Scale"
slug: "evolution-of-ml-model-deployment-infrastructure-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6791ff5ae6c0657f1fa1bfa9"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:57:43.246Z"
  createdOn: "2025-01-23T08:35:38.910Z"
llmopsTags:
  - "content-moderation"
  - "high-stakes-application"
  - "realtime-application"
  - "question-answering"
  - "model-optimization"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "cicd"
  - "scaling"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "documentation"
  - "security"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "amazon-aws"
  - "microsoft-azure"
industryTags: "e-commerce"
company: "Faire"
summary: "Faire, a wholesale marketplace, evolved their ML model deployment infrastructure from a monolithic approach to a streamlined platform. Initially struggling with slow deployments, limited testing, and complex workflows across multiple systems, they developed an internal Machine Learning Model Management (MMM) tool that unified model deployment processes. This transformation reduced deployment time from 3+ days to 4 hours, enabled safe deployments with comprehensive testing, and improved observability while supporting various ML workloads including LLMs."
link: "https://www.youtube.com/watch?v=CVJhosjEvYE&list=PLlcxuf1qTrwBGJBE0nVbAs0fbNLHidJaN&index=11"
year: 2023
seo:
  title: "Faire: Evolution of ML Model Deployment Infrastructure at Scale - ZenML LLMOps Database"
  description: "Faire, a wholesale marketplace, evolved their ML model deployment infrastructure from a monolithic approach to a streamlined platform. Initially struggling with slow deployments, limited testing, and complex workflows across multiple systems, they developed an internal Machine Learning Model Management (MMM) tool that unified model deployment processes. This transformation reduced deployment time from 3+ days to 4 hours, enabled safe deployments with comprehensive testing, and improved observability while supporting various ML workloads including LLMs."
  canonical: "https://www.zenml.io/llmops-database/evolution-of-ml-model-deployment-infrastructure-at-scale"
  ogTitle: "Faire: Evolution of ML Model Deployment Infrastructure at Scale - ZenML LLMOps Database"
  ogDescription: "Faire, a wholesale marketplace, evolved their ML model deployment infrastructure from a monolithic approach to a streamlined platform. Initially struggling with slow deployments, limited testing, and complex workflows across multiple systems, they developed an internal Machine Learning Model Management (MMM) tool that unified model deployment processes. This transformation reduced deployment time from 3+ days to 4 hours, enabled safe deployments with comprehensive testing, and improved observability while supporting various ML workloads including LLMs."
---

## Overview

Faire is a wholesale marketplace focused on enabling brick-and-mortar retailers to discover and acquire products for their stores. This case study, presented by a member of the AI Platform team, chronicles the two-year evolution of their model serving and deployment systems. While the presentation covers ML platforms broadly, it includes specific references to deploying LLMs and large vision models, making it relevant to the LLMOps space as organizations increasingly need infrastructure capable of supporting these larger model architectures alongside traditional ML models.

The core narrative follows a common pattern in platform engineering: an initial simple system that becomes unwieldy as scale and complexity grow, followed by adoption of external tools, which then create their own complexity, ultimately leading to a unified internal solution. The ML Platform team at Faire supports workloads related to search and discovery, financial products, user and content safety, and more.

## The Initial State: Monolith-Embedded ML

In the beginning, Faire's model deployment process was deceptively simple on the surface. A data scientist would create a model, upload it to S3, write code in the core backend monolith to integrate it, and register features in a feature store. This three-step process seemed clean but harbored significant problems that became apparent as the organization scaled.

The challenges with this approach were multifaceted. First, varying workloads created bottlenecks—some teams operated at 10-100 requests per second while others processed only a few requests per minute, yet all traffic flowed through a single monolithic service. Model sizes varied dramatically, and different teams had different scaling needs. Second, new architectures became nearly impossible to adopt. The presentation specifically mentions the challenge of GPU support: "you want to start deploying llama or some other model into your own stack—how are you going to do that if you're going through a single monolith that also has every other piece of business application in there?" This highlights the LLM deployment challenge directly.

Library versioning presented another obstacle. Teams were locked into specific versions (XGBoost 1.3 was mentioned as an example), and upgrading to new versions or adopting different frameworks like PyTorch or TensorFlow required coordinating across the entire monolith. Developer velocity suffered with slow builds, slow deploys, and deployment cadences that were daily at best—often taking two or more days to get a model active. If something went wrong, iteration time doubled. Finally, model versioning and lineage tracking were essentially lost, making rollbacks and version comparisons difficult.

## Adopting External Tools: SageMaker and Comet

The team's response was to "buy rather than build," selecting two primary tools: Comet for model and experiment tracking, and Amazon SageMaker for real-time inference. This decision was explicitly framed as a staffing consideration—the team was small with a large mandate, and enterprise-supported, battle-tested solutions allowed them to move faster than building scaffolding around open-source alternatives.

To manage these tools effectively, the team created YAML-based configurations implementing infrastructure-as-code principles. One configuration defined the model container itself (model location, binaries, versioning, Comet references, deployment region), while another defined endpoint configuration (machine types, instance counts, scaling parameters). This approach prevented the tooling from becoming unmanageable and enabled capabilities that weren't possible before, including deep learning model deployment.

However, within months, the added flexibility created its own complexity crisis. What had been a three-step process ballooned into a five-plus step workflow requiring three to four separate PRs. Data scientists now had to: create the model, upload to S3, register in Comet, set up features in the feature store, create configuration PRs for SageMaker deployment, potentially connect to batch inference frameworks and Airflow, update the backend monolith to reference the new SageMaker endpoint instead of S3, and manually set up metrics and monitors. The deployment time remained at 2-3 days, and cleanup or retraining operations became even more complex, touching five different systems that all needed proper coordination to avoid breaking production.

## The Solution: Machine Learning Model Management (mmm)

Earlier in the year (presumably 2024 or early 2025 based on the "two years" timeline), the team built an internal tool called "mmm" (Machine Learning Model Management) to consolidate all this complexity into a single UI-driven workflow. The philosophy was that flexibility and capability could coexist with a smooth process.

The mmm system fundamentally changed the deployment flow. Now a data scientist creates a model, registers it in Comet (which is now enforced rather than optional), registers features in the feature store, and then interacts with the mmm UI. In this interface, they specify model details (format, library, container setup) and deployment configuration (machine type, instance count, timeouts, environment variables). Behind the scenes, mmm handles everything: placing files in the correct S3 buckets, deploying to SageMaker, setting up cleanup options, adding metrics and monitors in appropriate locations, and even generating code for the backend monolith.

The technical implementation uses a Next.js full-stack application with DynamoDB for state tracking. It makes API calls to Comet and SageMaker for updates and relies heavily on code generation via Python scripts running in GitHub Actions. Jenkins is used in certain spots as well. This architecture keeps the core mmm service lightweight while leveraging existing CI/CD infrastructure.

## Deployment Workflow and Testing

The mmm workflow includes several stages designed for safety and observability. When a user initiates a deployment, mmm generates code and creates a GitHub PR. This PR triggers automated testing and validation, including tests against golden data files. Once tests pass, the PR auto-merges without human intervention required. A resource setup stage then notifies Comet of the deployment, updates production S3 buckets, and prepares the SageMaker deployment.

The system supports multiple rollout strategies: gradual rollout (blue-green deployment), expedited rollout (zero-to-one deployment), and shadow rollouts for testing against the current production version. Shadow testing leverages SageMaker's shadow variants feature, writing comparison outputs to S3 for analysis. While currently requiring some manual metric review, the team is building automated distributional equivalence checking with auto-approval once shadow tests pass.

Users can configure manual intervention points if they want to verify health before final deployment. At any point in the flow, deployments can be aborted. The system also handles model retirement, cleaning up across all referenced surfaces safely.

## Results and Impact

The quantitative improvements were significant. Deployment time dropped from approximately 3 days to 4 hours, with most of that being automated testing wall-clock time—actual human effort is around 10 minutes. The team achieved "zero lines of code written" for most model deployments since core containers are standardized and reusable. Cleanup and deletion operations also require zero manual code.

From an observability standpoint, users can now see deployment state, endpoint status, and all locations where a model is used through a single UI. This includes visibility into models deployed across different regions or in different configurations. Testing became comprehensive and automated rather than ad-hoc, significantly improving deployment safety.

Regarding LLM and large model support specifically, the presenter confirmed that the platform now successfully deploys "llms as well as large Vision models that are open source Vision models" into their stack. This capability was "not completely impossible" before but is "now fully possible," demonstrating how the evolved infrastructure supports the heavier requirements of modern generative AI models.

## Future Roadmap

The team outlined several planned improvements. Shadow testing on retrained models will allow automatic comparison between version 1 and 1.1 of a model (or models retrained on additional data) before cutting over to production. They're working to eliminate the remaining manual process for backend monolith integration, making the experience truly end-to-end once a model is trained.

Longer-term goals include extending the mmm UI to other ML workloads: one-click model training, one-click fine-tuning (explicitly mentioned as something actively in development), and feature exploration in the feature store. This vision positions mmm as a comprehensive ML operations hub rather than just a deployment tool.

## Critical Assessment

While the presentation paints a positive picture of the evolution, a few caveats are worth noting. The speaker acknowledges that "customers are never happy" and more work remains. The mmm tool is explicitly not planned for open-sourcing because it's heavily customized to Faire's specific context, team structures, and workflow assumptions. Organizations considering similar approaches should expect to build their own scaffolding rather than adopt Faire's solution directly.

The choice of SageMaker was framed pragmatically around team capacity rather than as the optimal technical choice. The speaker notes limitations—batch inference in SageMaker "isn't the best experience," and certain SageMaker design choices don't apply to every company. However, for real-time inference specifically, it "serves us pretty well."

The build-vs-buy decision was explicitly a staffing and expertise consideration. An ML platform team may not have "the expertise for maintaining or even building that sort of full stack service," making managed services and existing CI/CD tools (GitHub Actions, Jenkins) attractive options even if they come with constraints. This is a realistic acknowledgment of organizational limitations that many teams face.