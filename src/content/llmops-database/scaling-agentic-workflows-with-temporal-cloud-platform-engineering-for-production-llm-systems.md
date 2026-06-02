---
title: "Scaling Agentic Workflows with Temporal Cloud: Platform Engineering for Production LLM Systems"
slug: "scaling-agentic-workflows-with-temporal-cloud-platform-engineering-for-production-llm-systems"
draft: false
llmopsTags:
  - "content-moderation"
  - "chatbot"
  - "poc"
  - "agent-based"
  - "multi-agent-systems"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "scaling"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "openai"
  - "databricks"
industryTags: "tech"
company: "OpenAI"
summary: "OpenAI faced scalability challenges when their image generation service went viral, with synchronous request-response flows unable to handle the massive demand and resulting in rate limits and poor user experience. They addressed this by adopting Temporal Cloud for durable workflow orchestration and building a comprehensive platform layer that abstracted infrastructure complexity from product teams. This platform-first approach enabled them to scale from initial adoption to processing 1 billion images per week, achieving 60x growth in one year while reducing developer onboarding from 1-2 weeks to under one day, all managed by a team of just four platform engineers supporting 700+ namespaces and 1000+ different workflow types."
link: "https://www.youtube.com/watch?v=JOLu1E-hKC4"
year: 2025
seo:
  title: "OpenAI: Scaling Agentic Workflows with Temporal Cloud: Platform Engineering for Production LLM Systems - ZenML LLMOps Database"
  description: "OpenAI faced scalability challenges when their image generation service went viral, with synchronous request-response flows unable to handle the massive demand and resulting in rate limits and poor user experience. They addressed this by adopting Temporal Cloud for durable workflow orchestration and building a comprehensive platform layer that abstracted infrastructure complexity from product teams. This platform-first approach enabled them to scale from initial adoption to processing 1 billion images per week, achieving 60x growth in one year while reducing developer onboarding from 1-2 weeks to under one day, all managed by a team of just four platform engineers supporting 700+ namespaces and 1000+ different workflow types."
  canonical: "https://www.zenml.io/llmops-database/scaling-agentic-workflows-with-temporal-cloud-platform-engineering-for-production-llm-systems"
  ogTitle: "OpenAI: Scaling Agentic Workflows with Temporal Cloud: Platform Engineering for Production LLM Systems - ZenML LLMOps Database"
  ogDescription: "OpenAI faced scalability challenges when their image generation service went viral, with synchronous request-response flows unable to handle the massive demand and resulting in rate limits and poor user experience. They addressed this by adopting Temporal Cloud for durable workflow orchestration and building a comprehensive platform layer that abstracted infrastructure complexity from product teams. This platform-first approach enabled them to scale from initial adoption to processing 1 billion images per week, achieving 60x growth in one year while reducing developer onboarding from 1-2 weeks to under one day, all managed by a team of just four platform engineers supporting 700+ namespaces and 1000+ different workflow types."
notion:
  pageId: "373f8dff-2538-80c6-8f30-efeaa739a803"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:20:00.000Z"
  lastEditedTime: "2026-06-02T07:20:00.000Z"
  publishedAt: "2026-06-02T07:36:08Z"
---

## Overview

OpenAI's Applied Infrastructure organization faced critical challenges in scaling their agentic AI workflows as their services, particularly image generation, experienced explosive growth. The case study describes how a small platform team built a comprehensive orchestration platform around Temporal Cloud to support long-running, durable agentic workflows at massive scale. The presentation was delivered by a member of the technical staff who was one of the first two engineers to introduce Temporal Cloud to OpenAI's product teams, providing deep insight into both the technical architecture and the platform engineering philosophy that enabled rapid scaling.

The journey began when OpenAI's image generation service went viral, creating images in the style of Studio Ghibli. Within 2-3 days, the entire infrastructure was running hot, unable to support the massive incoming load, forcing the system to reject requests and creating poor user experiences. While some infrastructure teams worked on horizontal scaling, the platform team worked to migrate from synchronous request-response flows to asynchronous, durable workflows using Temporal. This migration proved successful, with the system now processing approximately 1 billion images per week entirely through Temporal workflows.

## Use Cases and Workload Characteristics

OpenAI uses Temporal Cloud across four main categories of workloads: agentic workflows, infrastructure control planes, data connectors and retrievals, and business processes. While these represent different applications, they share common characteristics that make them well-suited for durable execution. All these workflows need to be long-running, have code dependencies that can fail, require durable state management, and cross ownership boundaries. A single workflow might call into a model inference system, multiple storage engines, and various other services, each with different latency characteristics. Some operations are fast, others slow, and many can fail, requiring sophisticated retry logic to ensure eventual success.

The concrete use case discussed in detail was the image generation service. Initially launched as a synchronous request-response flow in spring of the previous year, users would submit requests and wait for images to be generated synchronously. When the service went viral, this architecture couldn't handle the load. By migrating to Temporal, the team could absorb all the back pressure from underlying infrastructure while still serving all user requests, transforming the user experience and system reliability.

## Growth and Scale

The adoption of Temporal at OpenAI has been extraordinary. Starting in Q1 of the previous year, usage grew 20x in Q2, then another 3x in the second half of the year, representing 60x total growth in one year. At the time of the presentation, OpenAI was operating approximately 700+ namespaces (up from 650 just two weeks prior), over 100 workers, and more than 1000 different workflow types running on Temporal Cloud. This massive scale is managed by a platform team of just four engineers, demonstrating the effectiveness of their platform-first approach.

## Platform Journey: Evolution and Philosophy

The platform journey progressed through three distinct phases, each with important lessons about balancing safety, developer velocity, and operational excellence.

### Phase 1: Safe Starting Point

The team began by focusing on a narrow, safe starting point, making risky aspects explicit before creating a self-serve path. This initial phase included a simple SDK wrapper to ensure users provided safe inputs and received safe outputs, contributions to Temporal's Terraform repository to enable provisioning of namespaces, accounts, and users, and native payload encryption within workers. Critically, the team deliberately deferred providing solutions for worker deployment, key rotation, and scaling. This limited scope allowed them to test boundaries and understand security risks before making the platform widely available.

### Phase 2: Identifying Developer Friction

As early adopter teams demonstrated the value of Temporal and more teams wanted to build agentic workflows, significant developer friction emerged. Product developers had to write extensive infrastructure code before writing any business logic. They needed to set up worker infrastructure repeatedly for each new use case. Operational issues were difficult to troubleshoot because data was scattered across workflow histories, worker metrics, Temporal Cloud metrics, and SDK metrics, making incident response slow. Workflows changed daily, and developers frequently ran into non-determinism issues without easy access to replay testing.

The key insight from this phase was that the platform needed to make the safe path obvious, not just possible. Making something possible still placed too much cognitive burden on product teams who wanted to focus on their business logic and AI workflows.

### Phase 3: The Paved Road

The platform team's solution was to create what they called the "paved road" through two major initiatives: managed workers and managed workflows.

For managed workers, they created a simple command-line tool called "gen temporal managed worker." When developers run this tool, they're prompted for a few inputs: name, owner, tier, namespace, and retention period. Upon hitting enter, the tool automatically generates all necessary specifications including worker service specs, SDK packages, golden images, build files, and worker configs. This made the infrastructure path completely repeatable, eliminating the need for product teams to think about Kubernetes specs or infrastructure setup for each new workflow.

For managed workflows, the challenge was that developers had to remember to register workflows in their worker at bootstrap, decide where to deploy workers, determine what queues to use, and figure out how to separate workflow and activity execution. The platform team established a clear boundary: product teams should only think about application code and be responsible solely for writing workflows and activities, while the platform team handles everything else.

Being a Python-heavy organization, OpenAI leveraged Python decorators provided by Temporal's Python SDK, extending them to allow developers to define task queues, namespaces, and workers directly in their code through decorators. Once code is committed, the system automatically generates configuration files that split out workflow specs and worker specs, including mappings of workflow names to queues and queues to responsible workers. When workers are deployed, these configs bootstrap everything automatically, eliminating manual configuration.

## Architecture

The architecture consists of three layers: product services, platform layer, and Temporal Cloud.

### Product Services Layer

This layer contains the workflow code, signal handling, and business logic for services like image generation. Product teams operate entirely at this level, writing their workflows and activities using the provided decorators and SDK wrappers.

### Platform Layer

The platform layer is the critical innovation that enables scale. It includes several key components:

**Proxy Service**: Written in Go, this acts as an entry point for all requests and responses before communicating with Temporal Cloud. The proxy provides authentication, routing based on residency requirements (workers might run in EU or US clusters), and ensures application code doesn't need to handle these concerns. The proxy determines where requests originate from, which service and cluster they come from, and routes them to the appropriate namespace in Temporal Cloud. Importantly, the proxy also handles payload encryption and decryption, encrypting all sensitive payload fields before sending to Temporal Cloud and decrypting responses before sending back to workers. This applies to all payload fields in the Temporal gRPC protocol except for search attributes and workflow IDs.

**Temporal Operator**: This is a control loop that watches for configuration changes and reconciles desired state with actual resources. The operator takes namespace configs, workflow configs, and worker configs, which are deployed as ConfigMaps in Kubernetes. It produces three categories of artifacts: it establishes namespaces in Temporal Cloud (creating new ones or updating retention periods for existing ones), sets up identity and permissions for custom RBAC roles that control which teams can see each other's workflows and who can decode data in the UI, and creates Kubernetes resources like worker pods and service accounts across specified clusters.

The choice to use a Kubernetes operator rather than Terraform was deliberate. At OpenAI's scale, Terraform was causing slowdowns and creating friction. The operator approach meant product teams only needed to think about application code, with all infrastructure handled by the platform team through declarative configuration.

**Workers and Autoscaling**: The platform generates worker specifications automatically and implements autoscaling based on multiple signals. Workers scale based on worker slot utilization to detect resource starvation, CPU metrics to identify performance bottlenecks, and Temporal Cloud's native polar autoscaling feature. Because worker specs are generated from templates, new features like polar autoscaling can be rolled out across all 100+ workers by simply updating the template.

**Shared Support Layer**: This includes secrets management, encryption, and comprehensive observability including the Temporal UI, dashboards, traces, and logs.

### Temporal Cloud Layer

OpenAI uses Temporal Cloud rather than self-hosting, a decision made after evaluating both options. Given the anticipated growth in agentic workflows and engineering bandwidth constraints, and after consulting with other Temporal Cloud customers about their experiences, the team chose the managed service. This decision has proven successful, with Temporal Cloud scaling well to handle their workloads.

## Security and Access Control

Security is enforced at multiple levels. The proxy enforces identity, routing, and access controls. No worker can directly connect to Temporal Cloud—all interactions flow through the proxy, including CLI requests which use a custom wrapper to ensure proper authentication. Custom RBAC policies control which teams can access each other's namespaces and workflows, and who within teams can decode sensitive data in the UI. All payload encryption happens transparently in the proxy, protecting data at rest in Temporal Cloud.

## Observability and Operational Excellence

The platform provides comprehensive observability through several mechanisms:

### Custom Temporal UI

OpenAI self-hosts the Temporal UI rather than using the cloud-hosted version directly. This provides better SSO controls and allows custom RBAC policies according to OpenAI standards. More importantly, self-hosting enabled them to patch the UI to add direct links to DataDog logs and traces from the workflow history view. From any workflow page, engineers can click through to see detailed traces of what long-running activities and workflows are doing, with exact log sequences. These integrations are instrumented through the SDK wrappers.

### Health Dashboards

The platform team provides dashboards that monitor workflow and activity health in detail. These dashboards can be filtered by namespace and workflow type, showing metrics that go beyond simple health checks. A namespace might be healthy and workers might appear fine, but tasks could still be backing up or workflows could be stuck. The dashboards provide drill-down capabilities to investigate these subtle issues. Because the platform generates all configs and collects owner information during setup, the team can automatically create alerts and page the appropriate on-call teams when issues arise.

### Worker Scaling Metrics

The platform instruments worker slots as a key signal for whether workers are resource-starved. It's tempting to simply increase replica counts when task queues grow, but the issue might actually be incorrectly tuned workers, insufficient slots, or CPU starvation. The metrics and dashboards help teams understand whether to scale horizontally or tune their workers differently. The recent integration of Temporal Cloud's native polar autoscaling feature was rolled out easily across all workers because of the templated approach to worker generation.

### Metrics Collection

The platform leverages two categories of metrics: worker SDK metrics that come embedded and ready to use, and Temporal Cloud metrics available through a Prometheus endpoint. A dedicated service continuously polls this endpoint, scrapes metrics including actions per second and request per second, and pushes them to OpenAI's observability platform. These metrics provide visibility into aspects of the system only observable from Temporal's perspective.

## Launch Readiness and Production Preparation

For major product launches at OpenAI, infrastructure teams conduct launch readiness huddles. For Temporal workloads, this involves checking whether namespaces are scaled to expected actions per second or requests per second, confirming sufficient capacity to scale workers, ensuring adequate namespace headroom, verifying workers are spread across regions and clusters for redundancy, and validating that underlying dependencies like GPUs have appropriate back-off and throttling. The team also reviews whether workflow code includes proper retries to ensure eventual success despite transient failures.

For significant launches, the team conducts load tests several weeks in advance. These tests help identify necessary capacity increases and involve close collaboration with Temporal's engineering team, who monitor metrics on their side during testing to ensure both parties see consistent behavior and can adjust resource allocation across cells as needed. This collaborative approach proved critical during the viral image generation launch, when OpenAI contacted Temporal support early on a Saturday or Sunday morning around 3-4 AM to request emergency capacity. The Temporal team provided 24/7 support and worked directly with OpenAI to migrate the workloads successfully.

## Developer Experience Transformation

The platform journey transformed the developer experience dramatically. Initially, adopting Temporal took 1-2 weeks, requiring developers to write Terraform, configure secrets and encryption, deploy workers, implement scaling, and build monitoring for their own signals. After implementing managed workers and workflows and establishing the platform boundary, this process now takes less than one day. Developers simply decorate their workflows and activities as part of writing business logic. Once merged, configs are automatically generated, the operator provisions resources, and workflows are deployed and running in production within a day.

This transformation is what enabled the 60x growth in usage with just a four-person team. Without the platform approach, it would have been impossible to launch product use cases at this velocity while maintaining reliability and security.

## Versioning and Determinism

OpenAI does not use Temporal Cloud's native worker versioning feature, primarily because it doesn't integrate well with their deployment system. Instead, they built custom guardrails. The platform automatically spins up replay testing by continuously downloading existing workflow histories and running replay tests as part of CI checks. This ensures workflows remain backwards compatible before code is merged.

For input and output schema changes, which can easily break backwards compatibility in Python when fields are removed from Pydantic objects, the team introduced golden schema files. Developers write new input and output schemas at specific locations, and the system generates schema files. If developers make backwards-incompatible changes, CI catches them immediately, requiring fixes before code can be merged.

## Proxy Scalability

An interesting technical detail emerged about the proxy architecture. Before implementing the proxy, OpenAI faced connection scaling issues because Python workers consume significant compute resources and require many instances. This created too many direct connections to Temporal Cloud, forcing Temporal to continuously scale their network layer. Introducing the Go-based proxy actually improved scalability by implementing connection pooling at the proxy layer. The proxy is efficient enough that OpenAI runs at most 100 replicas per cluster, successfully managing connections from all workers to Temporal Cloud.

## Rate Limiting and Cost Management

OpenAI deliberately disables on-demand capacity for many namespaces. Once namespaces grow beyond certain actions per second limits, the team doesn't want unbounded growth for both cost reasons and to prevent issues like backfill jobs polluting workflows in shared namespaces. Instead, they enforce rate limits through the proxy. They use provisioned capacity up to defined limits, then rely on their dashboards and alerting to identify when more capacity is needed and how much to request. While specific burst usage numbers are confidential, the team confirmed they regularly experience significant traffic bursts.

## Namespace and Worker Strategy

OpenAI creates multiple physical namespaces for each logical namespace provided by developers. When a user creates a namespace with a logical name, the platform automatically provisions separate namespaces for each region where workers need to run and for both staging and production environments. This explains why there are 700+ namespaces but only 100+ workers. The team recommends that developers spin up new workers for new use cases or namespaces because the platform makes it trivial, eliminating the previous friction that led teams to share workers inappropriately.

## Analytics and Future Plans

Currently, OpenAI's approach to monitoring is primarily reactive, using alerting based on specific signals to proactively catch issues, rather than building comprehensive analytics on workflow performance over time. As the team grows, they plan to extend analytics capabilities. Looking forward six months from the presentation, the speaker expected the already impressive 60x growth to double or triple again, driven by teams continuously recognizing that their agentic workflows are good fits for Temporal.

## Critical Platform Design Principles

The case study emphasizes several key principles that enabled success:

**Platform Discipline Rewards Durable Execution**: As workflows become more critical to business operations, platform engineering becomes more important. Different teams have different levels of Temporal expertise and different expectations, but what matters is providing a platform that teams can trust and depend on, eliminating the need to worry about infrastructure.

**Make the Safe Path Obvious, Not Just Possible**: Making something merely possible still places too much burden on product teams. The platform must make the correct approach the default and easiest option.

**Repeatability Enables Scale**: As the speaker summarized, "Temporal makes durable execution possible, but the platform path makes it repeatable." This repeatability is what allowed four engineers to support 700+ namespaces and explosive growth.

**Abstraction Boundaries Matter**: By clearly separating product concerns (workflows and activities) from platform concerns (infrastructure, scaling, observability), the team enabled product velocity while maintaining operational excellence.

## Balanced Assessment

While the presentation demonstrates impressive technical achievements and growth, several caveats merit consideration. The speaker represents OpenAI, which has extraordinary resources, engineering talent, and scale that may not be representative of typical organizations. The decision to build extensive custom platform tooling makes sense at OpenAI's scale but might be over-engineering for smaller teams.

The reliance on custom tooling like the Go proxy, Temporal operator, and various code generation systems creates operational complexity and maintenance burden. While this is justified at OpenAI's scale with hundreds of namespaces and teams, smaller organizations might be better served starting with simpler approaches closer to Temporal's native features before investing in platform engineering.

The choice not to use Temporal's native worker versioning because it doesn't integrate with OpenAI's deployment system suggests that their deployment infrastructure may have unique characteristics. Other organizations might find the native versioning features adequate, avoiding the need to build custom replay testing infrastructure.

The presentation also acknowledges that analytics and deeper operational insights remain areas for future development, suggesting that even with significant investment, building a complete platform remains an ongoing journey. The team's small size, while impressive, also represents a potential risk—deep expertise concentrated in four people creates knowledge concentration and potential bottlenecks.

Nevertheless, the case study provides valuable insights into platform engineering principles for LLMOps at scale, particularly around abstraction boundaries, developer experience, and the balance between safety and velocity. The focus on making infrastructure repeatable and safe by default, rather than merely possible, represents an important lesson for teams building production LLM systems.
