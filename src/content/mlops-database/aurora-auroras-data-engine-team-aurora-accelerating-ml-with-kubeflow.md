---
title: "Team Aurora: Accelerating ML with Kubeflow"
slug: "aurora-auroras-data-engine-team-aurora-accelerating-ml-with-kubeflow"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "metadata-store"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Aurora"
companySlug: "aurora"
platformName: "Aurora's Data Engine"
contentType: "video"
summary: "Aurora, an autonomous vehicle company, adopted Kubeflow Pipelines to accelerate ML model development workflows across their organization. The team faced challenges scaling their ML infrastructure to support the complex requirements of self-driving car development, including large-scale simulation, feature extraction, and model training. By integrating Kubeflow into their platform architecture, they created a standardized pipeline framework that improved developer experience, enabled better reproducibility, and facilitated org-wide adoption of MLOps best practices. The presentation covers their infrastructure evolution, pipeline development patterns, and the strategies they employed to drive adoption across different teams working on autonomous vehicle models."
link: "https://home.mlops.community/public/videos/how-aurora-accelerates-autonomous-vehicle-ml-model-development-using-kubeflow"
year: 2023
seo:
  title: "Aurora: Team Aurora: Accelerating ML with Kubeflow - ZenML MLOps Database"
  description: "Aurora, an autonomous vehicle company, adopted Kubeflow Pipelines to accelerate ML model development workflows across their organization. The team faced challenges scaling their ML infrastructure to support the complex requirements of self-driving car development, including large-scale simulation, feature extraction, and model training. By integrating Kubeflow into their platform architecture, they created a standardized pipeline framework that improved developer experience, enabled better reproducibility, and facilitated org-wide adoption of MLOps best practices. The presentation covers their infrastructure evolution, pipeline development patterns, and the strategies they employed to drive adoption across different teams working on autonomous vehicle models."
  canonical: "https://www.zenml.io/mlops-database/aurora-auroras-data-engine-team-aurora-accelerating-ml-with-kubeflow"
  ogTitle: "Aurora: Team Aurora: Accelerating ML with Kubeflow - ZenML MLOps Database"
  ogDescription: "Aurora, an autonomous vehicle company, adopted Kubeflow Pipelines to accelerate ML model development workflows across their organization. The team faced challenges scaling their ML infrastructure to support the complex requirements of self-driving car development, including large-scale simulation, feature extraction, and model training. By integrating Kubeflow into their platform architecture, they created a standardized pipeline framework that improved developer experience, enabled better reproducibility, and facilitated org-wide adoption of MLOps best practices. The presentation covers their infrastructure evolution, pipeline development patterns, and the strategies they employed to drive adoption across different teams working on autonomous vehicle models."
mlops:
  source: "sqlite"
  entryId: 152
  sourceUrl: "https://home.mlops.community/public/videos/how-aurora-accelerates-autonomous-vehicle-ml-model-development-using-kubeflow"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061955"
  lastUpdated: "2026-04-14 10:02:24"
---

## Problem Context

Aurora operates in the autonomous vehicle domain, which presents unique and substantial ML infrastructure challenges. The company needed to support complex workflows spanning multiple disciplines: simulation at massive scale, feature extraction from sensor data, model training for various autonomy tasks, and large-scale model inference. When the team initially started building their ML platform, they faced typical scaling challenges that many ML organizations encounter but amplified by the specific requirements of self-driving technology.

The autonomous vehicle domain requires running millions of simulations to validate model behavior across diverse scenarios. Aurora's infrastructure evolved from handling a few thousand simulation runs per day when the company had fewer than 100 employees in 2018 to scaling up to millions of simulations as the organization grew. This exponential growth in computational requirements created bottlenecks in their existing workflows and highlighted the need for a more robust, scalable ML platform.

Beyond just computational scale, the team needed to support diverse ML workflows across multiple teams. Different groups within Aurora worked on motion planning, perception, sensor fusion, and other autonomy components, each with their own model development requirements. The lack of standardization created friction: teams built custom scripts and workflows, making it difficult to share best practices, reproduce experiments, or understand what other teams were doing. The platform team recognized that providing a unified framework for pipeline orchestration would accelerate development velocity across the entire organization.

## Architecture & Design

Aurora's MLOps infrastructure centers on Kubeflow Pipelines as the orchestration backbone for ML workflows. The team chose Kubeflow because it provided Kubernetes-native pipeline orchestration capabilities that aligned with their existing infrastructure investments. Rather than building a custom orchestration system from scratch, they leveraged the open-source Kubeflow ecosystem while customizing it to meet Aurora's specific needs.

The Kubeflow deployment at Aurora evolved through multiple iterations. The team didn't simply install Kubeflow and declare success; instead, they took an incremental approach to building out the infrastructure. They focused on creating abstractions that would make Kubeflow accessible to data scientists and ML engineers who might not be Kubernetes experts. This meant building higher-level interfaces on top of Kubeflow's core primitives.

The pipeline architecture allows teams to define complex multi-step workflows for training, evaluation, and deployment. Each pipeline consists of multiple components that can be developed, tested, and versioned independently. Components encapsulate specific functionality—data preprocessing, feature engineering, model training, evaluation, etc.—and can be reused across different pipelines. This composability became a key benefit, enabling teams to share components and build on each other's work.

The infrastructure supports both scheduled and on-demand pipeline execution. Teams can trigger pipelines manually for experimentation or schedule regular training runs. The platform tracks all pipeline executions, maintaining metadata about inputs, outputs, parameters, and results. This metadata becomes crucial for debugging issues, reproducing experiments, and understanding model lineage.

For large-scale computation, the platform integrates with Aurora's existing compute infrastructure. The Kubernetes backend provides flexibility to scale resources dynamically based on workload requirements. Different pipeline steps can request different resource allocations—some stages might need GPU acceleration for training while others run on CPU-only nodes for data processing.

## Technical Implementation

The core technology stack centers on Kubeflow Pipelines running on Kubernetes. The team uses Kubeflow's native components but has extended and customized the platform to fit Aurora's needs. They built custom integrations with Aurora's internal systems, including their data storage infrastructure, artifact management systems, and monitoring tools.

Pipeline definitions use the Kubeflow Pipelines SDK, which allows developers to define workflows in Python. This code-first approach appealed to Aurora's engineers because it meant they could use familiar programming constructs—functions, loops, conditionals—rather than learning a domain-specific language or working with graphical workflow builders. The Python SDK generates the underlying pipeline specifications that Kubeflow executes.

The team invested significantly in improving the developer experience. They created libraries and templates that abstract away Kubeflow complexity and provide Aurora-specific defaults. These abstractions handle common patterns like data loading, artifact management, and integration with internal services. By providing these higher-level interfaces, the platform team reduced the barrier to entry for teams wanting to adopt Kubeflow.

For model training workloads, pipelines integrate with GPU-accelerated compute resources. The platform manages resource allocation and scheduling, ensuring efficient utilization of expensive GPU hardware. Training jobs can span multiple nodes for distributed training when needed, with the orchestration layer handling the coordination.

The inference infrastructure connects to the pipeline framework for model deployment. Once a model is trained and validated through a pipeline, it can be promoted to serving infrastructure. While the source material doesn't specify the exact serving technology used, the pipelines facilitate the transition from training to production deployment.

Monitoring and observability are built into the platform. Each pipeline execution generates logs and metrics that feed into Aurora's monitoring systems. This visibility helps teams debug pipeline failures, optimize performance, and understand resource utilization patterns.

## Scale & Performance

Aurora's scale metrics demonstrate the platform's operational maturity. The simulation infrastructure grew from thousands of runs per day to millions, representing roughly three orders of magnitude increase in throughput. This growth happened as the company expanded from under 100 employees in 2018 to a much larger organization by 2023.

The Kubeflow infrastructure supports workflows across multiple teams working on different aspects of autonomous vehicle development. While the source doesn't provide exact numbers on how many pipelines run daily or how many models are trained, the org-wide adoption indicates substantial usage. The platform team's focus on increasing Kubeflow adoption suggests they achieved meaningful penetration across engineering teams.

The autonomous vehicle domain generates massive amounts of sensor data that must be processed for training. LiDAR, camera, radar, and other sensors produce terabytes of data from test vehicles. The pipeline infrastructure handles feature extraction from these data sources, transforming raw sensor readings into features suitable for model training. The scale of this data processing represents a significant engineering challenge that Kubeflow helps address through its orchestration capabilities.

Pipeline execution times vary depending on the specific workflow. Training perception models on large datasets can take hours or days, while smaller experiments might complete in minutes. The platform supports both quick iteration for development and long-running batch jobs for production model training.

## Trade-offs & Lessons

Aurora's journey with Kubeflow reveals several important lessons for organizations building ML platforms. The team emphasized that adoption doesn't happen automatically—even with good infrastructure, driving org-wide usage requires deliberate effort. They focused on understanding user needs, providing excellent documentation and examples, and offering hands-on support to teams adopting the platform.

The choice of Kubeflow over building custom infrastructure represents a classic build-versus-buy decision. By leveraging open-source Kubeflow, Aurora accelerated their platform development timeline and benefited from community contributions. However, this came with the trade-off of needing to understand and occasionally work around Kubeflow's design choices. The team invested in building abstractions on top of Kubeflow to hide complexity and provide Aurora-specific functionality.

The Kubernetes foundation provided flexibility but also required expertise. Teams needed to understand concepts like pods, resource requests, and cluster scheduling to effectively use the platform. The platform team addressed this by creating higher-level interfaces that abstracted Kubernetes details, but some operational complexity remained unavoidable.

Standardizing on Kubeflow Pipelines created consistency across teams but required existing teams to migrate from their custom workflows. Change management became as important as technical implementation. The platform team worked closely with early adopter teams to refine the developer experience and build confidence in the new approach. These early successes helped drive broader adoption.

The evolution from small-scale to millions of simulations happened incrementally rather than through a single architectural redesign. The team continuously improved infrastructure as requirements grew. This iterative approach allowed them to learn from operational experience and make informed decisions about where to invest engineering effort.

One key insight from the autonomous vehicle domain is the importance of reproducibility. When testing safety-critical systems, teams need to exactly reproduce training runs, simulation results, and model behavior. Kubeflow's pipeline framework provides this reproducibility through versioned pipeline definitions, tracked executions, and artifact management. This capability proved particularly valuable for Aurora's use case.

The talk highlights the importance of developer experience in platform adoption. Technical capabilities matter, but if the platform is difficult to use, teams will work around it. Aurora invested in documentation, examples, templates, and support to make Kubeflow accessible. This investment in usability paid dividends in adoption rates.

The presentation demonstrates that successful MLOps platforms require ongoing evolution. As Aurora grew from a small startup to a larger organization, their infrastructure needs changed. The team continuously adapted the Kubeflow deployment to support new use cases, integrate with additional systems, and scale to higher throughput. Platform building is not a one-time project but an ongoing engineering effort that requires dedicated team investment.
