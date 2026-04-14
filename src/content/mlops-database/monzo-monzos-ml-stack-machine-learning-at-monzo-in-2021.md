---
title: "Machine Learning at Monzo in 2021"
slug: "monzo-monzos-ml-stack-machine-learning-at-monzo-in-2021"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "model-serving"
  - "pipeline-orchestration"
  - "docker"
  - "kubernetes"
  - "sagemaker"
  - "ab-testing"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "monitoring"
  - "serving"
  - "shadow-deployment"
  - "training"
industryTags: "finance"
company: "Monzo"
companySlug: "monzo"
platformName: "Monzo's ML stack"
contentType: "blog"
summary: "Monzo, a UK digital bank, evolved its machine learning capabilities from a small centralized team of 3 people in late 2020 to a hub-and-spoke model with 7+ machine learning scientists and a dedicated backend engineer by 2021. The team transitioned from primarily real-time inference systems to supporting both live and batch prediction workloads, deploying critical fraud detection models in financial crime that achieved significant business impact and earned industry recognition. Their technical stack leverages GCP AI Platform for model training, a custom-built feature store that powers six critical systems across the company, and Python microservices deployed on AWS for model serving. The team operates as Type B data scientists focused on end-to-end system impact rather than research, with increasing emphasis on model governance for high-risk applications and infrastructure optimization that improved feature store data ingestion performance by 3000x."
link: "https://monzo.com/blog/2021/10/28/machine-learning-at-monzo-in-2021"
year: 2021
seo:
  title: "Monzo: Machine Learning at Monzo in 2021 - ZenML MLOps Database"
  description: "Monzo, a UK digital bank, evolved its machine learning capabilities from a small centralized team of 3 people in late 2020 to a hub-and-spoke model with 7+ machine learning scientists and a dedicated backend engineer by 2021. The team transitioned from primarily real-time inference systems to supporting both live and batch prediction workloads, deploying critical fraud detection models in financial crime that achieved significant business impact and earned industry recognition. Their technical stack leverages GCP AI Platform for model training, a custom-built feature store that powers six critical systems across the company, and Python microservices deployed on AWS for model serving. The team operates as Type B data scientists focused on end-to-end system impact rather than research, with increasing emphasis on model governance for high-risk applications and infrastructure optimization that improved feature store data ingestion performance by 3000x."
  canonical: "https://www.zenml.io/mlops-database/monzo-monzos-ml-stack-machine-learning-at-monzo-in-2021"
  ogTitle: "Monzo: Machine Learning at Monzo in 2021 - ZenML MLOps Database"
  ogDescription: "Monzo, a UK digital bank, evolved its machine learning capabilities from a small centralized team of 3 people in late 2020 to a hub-and-spoke model with 7+ machine learning scientists and a dedicated backend engineer by 2021. The team transitioned from primarily real-time inference systems to supporting both live and batch prediction workloads, deploying critical fraud detection models in financial crime that achieved significant business impact and earned industry recognition. Their technical stack leverages GCP AI Platform for model training, a custom-built feature store that powers six critical systems across the company, and Python microservices deployed on AWS for model serving. The team operates as Type B data scientists focused on end-to-end system impact rather than research, with increasing emphasis on model governance for high-risk applications and infrastructure optimization that improved feature store data ingestion performance by 3000x."
mlops:
  source: "sqlite"
  entryId: 116
  sourceUrl: "https://monzo.com/blog/2021/10/28/machine-learning-at-monzo-in-2021"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061569"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Monzo's machine learning team faced several interconnected challenges as the organization scaled its ML capabilities in 2021. The primary driver was addressing financial crime, particularly fraud detection for various scam types that were devastating customers emotionally and proving expensive for the bank. The fraud detection problem space presented unique ML challenges: it was highly dynamic and fast-moving, operated on rich datasets, and involved highly imbalanced class distributions that required careful modeling approaches.

Beyond fraud, the team encountered organizational scaling challenges. Operating as a small centralized team of three people in late 2020, they needed to support growing demand across multiple business areas while maintaining deep domain expertise. The team faced the classic dilemma of whether to invest time building infrastructure versus shipping new models, and struggled with the overhead of context-switching between different problem domains.

As the team's work moved into more critical and regulated areas, they also confronted new governance requirements. Unlike earlier projects such as help article ranking that could be validated primarily through A/B testing, newer models for risk assessment in financial crime required formal governance processes involving internal and external auditors. This shift demanded new levels of rigor in documentation, validation, and review processes.

The team explicitly positioned themselves as Type B data scientists, meaning their success was measured not by model accuracy or academic contributions, but by the real-world impact of the systems they built. This philosophy created pressure to work end-to-end, from feature engineering through deployment and monitoring, rather than "throwing problems over the wall" to other teams.

## Architecture & Design

Monzo's ML architecture follows a hybrid cloud approach that separates training from serving infrastructure. The data foundation lives in their data stack where feature engineering and analytics work occurs. Models are trained using GCP AI Platform, taking advantage of Google Cloud's managed ML training infrastructure. The trained models are then deployed as Python microservices running in Monzo's AWS production environment, creating a cross-cloud architecture that leverages the strengths of both platforms.

A critical component that emerged in 2020 and matured through 2021 is Monzo's custom-built feature store. This system has become foundational infrastructure, powering six critical machine learning systems across several areas of the company. The feature store serves as the central repository for engineered features, enabling consistency between training and serving and reducing the likelihood of training-serving skew. The system supports both batch and real-time feature computation, though the team had historically focused more heavily on real-time use cases.

The team operates using two primary inference patterns. Real-time inference systems make predictions synchronously, typically triggered by customer actions such as transactions. These systems need to respond with low latency to provide immediate fraud checks or payment challenge decisions. The second pattern, batch inference, runs predictions over sets of eligible users on fixed cadences such as daily or weekly. This pattern emerged more prominently in 2021 as the team expanded into new problem domains like consumer vulnerability detection, where immediate real-time predictions weren't necessary.

The hub-and-spoke organizational model directly influences the technical architecture. Machine learning scientists embedded in specific business areas (the "spokes") develop models tailored to their domain's needs, while the central hub team works on cross-cutting infrastructure and explores early-stage ideas. This structure allows for both specialization and knowledge sharing, with regular synchronization ensuring best practices propagate across the organization.

Shadow deployments play a critical role in the validation architecture, particularly for fraud detection systems. In shadow mode, new models run in parallel with production systems but their predictions don't affect customer experience. This allows the team to observe model behavior on real traffic, compare performance against existing systems, and catch issues before full deployment. The fraud detection work "supercharged" their usage of shadow deployments, making this validation pattern a standard practice.

## Technical Implementation

The core technology stack centers on Python for model development and serving. Machine learning models are trained using GCP AI Platform, Google's managed machine learning service that provides scalable infrastructure for training jobs without requiring the team to manage underlying compute resources. The choice of GCP for training while serving from AWS suggests a pragmatic approach to cloud selection, possibly driven by Monzo's existing AWS footprint for production systems and GCP's ML-specific capabilities for training.

The feature store represents significant custom engineering effort. Built internally, this system handles feature computation, storage, and retrieval for both training and serving. A major optimization effort by backend engineer Charlie improved the data ingestion performance by a factor of 3000x. This dramatic improvement had cascading benefits: fresher features leading to better predictions, higher reliability, and the ability to support additional use cases. The concrete performance gains demonstrate the value of dedicated infrastructure engineering rather than having ML scientists build and maintain these systems themselves.

Model serving uses Python microservices, a lightweight architecture that allows each model or set of related models to run as independent services. This approach provides flexibility in deployment, enables independent scaling of different models, and allows for incremental rollouts and rollbacks. The microservices run in AWS, integrated with Monzo's broader production infrastructure and service mesh.

The team uses A/B testing as a primary validation mechanism for lower-risk models. For example, help article ranking models were validated by demonstrating impact through controlled experiments. For higher-risk models in financial crime, validation involves multiple layers: shadow deployments to observe behavior on production traffic, formal governance reviews by internal and external auditors, and likely continued monitoring post-deployment.

Onboarding new team members involves hands-on project work covering the complete ML lifecycle within the first three months. Recent onboarding projects have shipped real improvements including enhancements to text and image classification systems, and a new model for 3D secure payment challenges. This approach ensures new hires understand the full stack and can contribute end-to-end rather than specializing narrowly.

The team explicitly avoids focusing on state-of-the-art research or academic publication. Their technical choices prioritize pragmatism, reliability, and business impact over novelty. They work closely with domain experts who understand fraud patterns and customer behavior, incorporating this expertise into model design and deployment strategies.

## Scale & Performance

By 2021, the team grew from three people in late 2020 to seven (six machine learning scientists and one backend engineer), with four additional people joining or committed to join in the coming months. This represents a tripling in team size within approximately one year, with planned continued growth.

The feature store powers six critical machine learning systems across multiple business areas, making it a foundational piece of infrastructure rather than an experimental component. The 3000x improvement in data ingestion performance represents a dramatic optimization, though the source doesn't provide absolute numbers for throughput or latency. This level of improvement typically suggests moving from an inefficient implementation (perhaps single-threaded or with excessive I/O overhead) to a highly optimized approach (parallel processing, batching, or architectural redesign).

The team deployed their first fraud detection model in early 2020 and iterated through several versions, with the system earning nomination for "Outstanding Prevention Initiative" at the 2021 Tackling Economic Crime Awards. The impact was described as "enormous," though specific metrics on fraud reduction aren't disclosed. The team has expanded from this initial fraud detection system to multiple types of scam detection across different fraud categories.

Current workload distribution places two people in Financial Crime, two in Customer Operations, two in the Hub working on early-stage projects, plus the director. This allocation suggests significant investment in fraud and customer operations as high-value problem domains, with meaningful capacity reserved for exploration and new initiatives.

The team operates in a distributed/remote-first environment since the pandemic, with team members not yet having all been in the same room together as of the blog post. This constraint influenced their communication patterns and emphasis on balancing synchronous and asynchronous work.

## Trade-offs & Lessons

The hub-and-spoke model addresses the scaling challenge of a growing ML team while maintaining both deep specialization and knowledge sharing. Machine learning scientists in spokes permanently join specific business areas, attending their planning and stand-up meetings, which creates tight collaboration with product managers and engineers. They then sync back with the broader ML team to share learnings and maintain consistency. This structure provides the benefits of embedded expertise while avoiding complete fragmentation of the ML function. However, it creates management complexity, with all ML scientists still reporting to a single director as of 2021, motivating the hiring of ML managers to distribute leadership.

The decision to hire a dedicated backend engineer (Charlie) rather than having ML scientists build all infrastructure proved valuable. The 3000x feature store optimization exemplifies the impact: fresher features, better predictions, and expanded use cases. This created a foundation for a future ML Ops team that would focus on infrastructure while staying close to the ML scientists. The trade-off is coordination overhead and the challenge of prioritizing infrastructure work against new model development, but the team views this as essential for sustainable scaling.

Prioritizing end-to-end ownership over specialization means ML scientists handle everything from feature engineering through deployment and analysis. This "Type B" approach ensures models actually create business impact rather than languishing after handoff. The downside is higher skill requirements for team members and potentially slower initial development, but Monzo believes this is offset by shipping systems that actually work in production. The onboarding approach of having new hires ship something end-to-end within three months reinforces this philosophy and ensures new team members can operate independently.

The increasing focus on model governance as the team moved into regulated domains created new overhead but validated the business criticality of their work. Governance doesn't replace technical validation like shadow deployments; rather, the two approaches work hand-in-hand. The team views governance as an optimization problem itself—a process that will become more efficient as they navigate it repeatedly. This perspective treats compliance as engineering work rather than pure bureaucracy.

Working on fraud detection, with its dynamic and imbalanced nature, forced pragmatic and creative thinking. Close collaboration with domain experts who understand fraud patterns proved essential. The emphasis on the "right" types of interventions rather than just accurate predictions demonstrates their focus on the complete system: a model that predicts fraud accurately but triggers inappropriate responses won't reduce fraud effectively. This systems thinking extends beyond the model to how predictions integrate with customer experience and operations.

The team's explicit rejection of academic publication and state-of-the-art research represents a clear philosophical stance. They measure success by customer and business impact rather than novelty or technical sophistication. This focus attracts practitioners interested in applied work and operational excellence rather than researchers seeking publication venues. The trade-off is potentially less visibility in the ML community and less access to academic partnerships, but stronger alignment with business objectives.

Supporting both real-time and batch inference patterns required infrastructure flexibility. Historically focused on real-time predictions for transaction-related use cases, expanding to batch workloads for problems like vulnerability detection meant adapting systems and processes. Batch jobs on daily or weekly cadences have different engineering requirements around scheduling, data volumes, and monitoring compared to real-time systems that need low-latency responses.

The team's success in fraud detection created organic demand from other business areas wanting to apply ML to their problems. This represents a scaling challenge—how to evaluate and prioritize opportunities across a growing set of potential applications. The hub-and-spoke model with hub capacity for exploration provides a structure for testing new areas before committing permanent resources.

Operating as a distributed team since the pandemic created challenges for cohesion and knowledge sharing, particularly acute for a team growing rapidly and with members who had never met in person. The balance between synchronous and asynchronous communication required deliberate attention. Despite this constraint, the team maintained productivity and shipped critical systems, suggesting their processes adapted reasonably well to remote work.

The infrastructure roadmap targeting model serving in Python and model artifact management indicates ongoing technical debt and improvement opportunities. The team recognizes that their current serving approach, while functional, likely has room for optimization similar to the feature store improvements. This acknowledgment of future work suggests a mature perspective on infrastructure as an ongoing investment rather than a one-time build.
