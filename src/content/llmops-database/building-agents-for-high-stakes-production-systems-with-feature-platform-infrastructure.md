---
title: "Building Agents for High-Stakes Production Systems with Feature Platform Infrastructure"
slug: "building-agents-for-high-stakes-production-systems-with-feature-platform-infrastructure"
draft: false
llmopsTags:
  - "fraud-detection"
  - "high-stakes-application"
  - "customer-support"
  - "classification"
  - "agent-based"
  - "error-handling"
  - "human-in-the-loop"
  - "cost-optimization"
  - "latency-optimization"
  - "evals"
  - "kubernetes"
  - "monitoring"
  - "databases"
  - "cicd"
  - "orchestration"
  - "open-source"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "postgresql"
  - "cache"
  - "redis"
  - "serverless"
  - "openai"
  - "databricks"
industryTags: "tech"
company: "Zipline"
summary: "Zipline AI, building on the Chronon open source project originally developed at Airbnb, addresses the challenge of deploying LLM agents to improve production ML systems in high-stakes domains like fraud detection, trust and safety, and personalization. The core problem is that agents need to modify production data pipelines and ML models safely without interfering with critical business systems. The solution uses Chronon as an infrastructure abstraction layer that provides agents with a semantic API for defining features while automating the underlying complexity of training pipelines, streaming infrastructure, and production serving. The system enables resource isolation through branch-based development, intelligent compute reuse through partial aggregate caching, and guarantees consistency between training and serving. This approach allows agents to iterate on production-ready experiments autonomously while human reviewers maintain control over deployment decisions, resulting in development cycles that compress from months to days while maintaining safety and auditability requirements."
link: "https://www.youtube.com/watch?v=HaWk8kAD8ZU"
year: 2026
seo:
  title: "Zipline: Building Agents for High-Stakes Production Systems with Feature Platform Infrastructure - ZenML LLMOps Database"
  description: "Zipline AI, building on the Chronon open source project originally developed at Airbnb, addresses the challenge of deploying LLM agents to improve production ML systems in high-stakes domains like fraud detection, trust and safety, and personalization. The core problem is that agents need to modify production data pipelines and ML models safely without interfering with critical business systems. The solution uses Chronon as an infrastructure abstraction layer that provides agents with a semantic API for defining features while automating the underlying complexity of training pipelines, streaming infrastructure, and production serving. The system enables resource isolation through branch-based development, intelligent compute reuse through partial aggregate caching, and guarantees consistency between training and serving. This approach allows agents to iterate on production-ready experiments autonomously while human reviewers maintain control over deployment decisions, resulting in development cycles that compress from months to days while maintaining safety and auditability requirements."
  canonical: "https://www.zenml.io/llmops-database/building-agents-for-high-stakes-production-systems-with-feature-platform-infrastructure"
  ogTitle: "Zipline: Building Agents for High-Stakes Production Systems with Feature Platform Infrastructure - ZenML LLMOps Database"
  ogDescription: "Zipline AI, building on the Chronon open source project originally developed at Airbnb, addresses the challenge of deploying LLM agents to improve production ML systems in high-stakes domains like fraud detection, trust and safety, and personalization. The core problem is that agents need to modify production data pipelines and ML models safely without interfering with critical business systems. The solution uses Chronon as an infrastructure abstraction layer that provides agents with a semantic API for defining features while automating the underlying complexity of training pipelines, streaming infrastructure, and production serving. The system enables resource isolation through branch-based development, intelligent compute reuse through partial aggregate caching, and guarantees consistency between training and serving. This approach allows agents to iterate on production-ready experiments autonomously while human reviewers maintain control over deployment decisions, resulting in development cycles that compress from months to days while maintaining safety and auditability requirements."
notion:
  pageId: "379f8dff-2538-8042-9a8a-c7aad6fd0a40"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-08T07:52:00.000Z"
  lastEditedTime: "2026-06-08T07:52:00.000Z"
  publishedAt: "2026-06-11T12:14:45Z"
---

This case study presents Zipline AI's approach to enabling LLM agents to work on high-stakes production ML systems through the Chronon feature platform, originally developed at Airbnb and now available as open source. The presentation comes from Ferran Sanoyan, co-founder of Zipline AI and one of the original authors of Chronon.

## Background and Context

The genesis of this work lies in solving traditional ML infrastructure challenges that later became critical for agentic systems. At Airbnb, the payments fraud detection team struggled with iteration velocity, unable to adapt quickly enough to changing attack patterns. The primary bottlenecks included the complexity of building streaming features, feature logic scattered across multiple systems including Spark batch pipelines, Flink streaming jobs, and various services, and training-serving inconsistency that was difficult to debug. Chronon emerged as a solution providing a single API to define features, with an automated engine handling both model training data generation and production inference infrastructure including streaming jobs, state management, and serving indices.

The platform proved successful across multiple high-stakes use cases at Airbnb including account takeover detection, search ranking, personalization, and customer support. After presentations at industry conferences, Stripe adopted Chronon for similar challenges, and by late 2023, 100% of Stripe's charge path models were powered by Chronon. The project went fully open source approximately two years ago and has since been adopted by organizations including OpenAI for Sora personalization and Netflix for content ranking.

## The Core Challenge for Agentic Systems

The fundamental insight driving this work is that for high-stakes production systems like fraud detection, credit underwriting, insurance decisioning, and real-time personalization, full agentic decisioning is inappropriate. These systems require auditability for regulatory compliance, have strict latency and throughput requirements, and cannot tolerate major performance degradation. Rather than having agents make production decisions directly, the effective approach is to use agents to improve the rules and ML models powering these systems through what the presentation calls "agentic experimentation" or "agentic research."

In this paradigm, agents are responsible for creating new features, adding them to models, running training, evaluating results, and deploying end-to-end pipelines to development environments. Critically, the output must pass to human reviewers who decide whether to launch A/B tests and ultimately deploy to production. This division of labor preserves the safety and auditability requirements while accelerating iteration velocity.

## Infrastructure Requirements and Challenges

For this approach to be practical, three critical requirements must be met. First, the agent's output must be production-ready, not merely proof-of-concept code that requires human reengineering. Second, the work must be reviewable so humans can confidently approve changes to critical systems. Third, experimentation must be safe with no risk of interfering with production systems during the development process.

Without proper infrastructure abstraction, agents attempting end-to-end experiments would need to interact with numerous components including SQL engines like Spark, Snowflake, or BigQuery, streaming systems like Flink with Kafka or Kinesis, serving infrastructure involving Kubernetes and key-value stores, and orchestration through tools like Airflow. This creates multiple failure modes: silent errors producing incorrect data, non-reviewable complexity spanning multiple repositories and infrastructure layers, lack of reproducibility, safety risks from modifications to production infrastructure, and runaway costs from inefficient compute usage.

## Chronon's Infrastructure Automation Solution

Chronon addresses these challenges by exposing agents to a high-level semantic API for defining features while automating the underlying production infrastructure. The API allows agents to specify what they want to achieve in declarative terms—describing data sources, transformations, and model connections—while Chronon handles the implementation of training pipelines, production serving pipelines, and the critical consistency guarantees between training and inference. This abstraction means agents work with semantic feature definitions rather than low-level infrastructure code, dramatically improving both the safety and reviewability of agent-generated changes.

The semantic nature of the API plays to the strengths of LLM agents, which excel at understanding and generating high-level descriptions of intent rather than wrestling with the complexities of distributed systems implementation. This design choice fundamentally enables the agentic experimentation workflow by making agent outputs both production-ready and human-reviewable.

## Resource Isolation and Safety Mechanisms

Safety in production environments is achieved through branch-based resource isolation. As agents iterate on experiments, all work occurs on dedicated Git branches enforced by the framework. Chronon automatically routes jobs based on branch identity to isolated compute and storage resources, ensuring that agent experimentation cannot add load to production infrastructure or interfere with live serving systems. This isolation spans both compute resources for data processing and storage/serving infrastructure for online feature access.

However, pure isolation would be inefficient and costly. The key innovation is achieving compute reuse while maintaining isolation guarantees. When an agent adds a single new feature to a model with hundreds of existing features, it should not need to recompute all unchanged features. Chronon solves this through intelligent caching and data lineage tracking. For example, when existing features include 30-day and 60-day temporal windows and an agent adds a 7-day window, Chronon automatically uses cached partial aggregates computed during the original feature generation. The 7-day feature is computed from these partial aggregates without scanning raw data, while the 30-day and 60-day features are copied directly from production tables to the development environment without recomputation.

This happens transparently without agent involvement beyond making the semantic feature change and requesting data backfill. The system guarantees data production using isolated resources while maximizing reuse of precomputed production features. As more agents and humans define features and run experiments, the shared feature repository creates network effects where compute sharing benefits accumulate across teams and use cases.

## Reproducibility and Production Readiness

Reproducibility is essential for both debugging and confidence in production deployment. Chronon provides strong guarantees that rerunning an agent's experiment produces identical results through what the presentation describes as a semantic hashing mechanism. This operates at the column level to understand exactly what changed in a feature definition, ensuring deterministic data generation regardless of when or how many times the job runs.

This reproducibility is foundational to the concept of production-ready agent outputs. Human reviewers can validate agent experiments knowing that the reviewed results reflect what will run in production. Combined with the infrastructure automation that generates production-quality pipelines from semantic definitions, this creates a workflow where agent outputs can move directly to production after human approval without requiring reimplementation.

## The Data Foundation for Agentic Workflows

The presentation synthesizes these elements into a vision of the data foundation needed for agentic workflows in high-stakes systems. The core components include tools for agents to backfill data for training and evaluation, deploy data pipelines for online serving with guaranteed consistency between training and serving, a data explorer capability for discovering available data sources within the organization, and integration with standard model training and deployment platforms across cloud providers.

Chronon positions itself primarily as an orchestration layer for the data and feature engineering aspects rather than attempting to replace existing model training infrastructure. The focus is on solving what the presentation identifies as the most critical piece of the agent infrastructure equation: providing semantic tools for defining feature changes with automated infrastructure to execute them safely and efficiently.

## Operational Considerations

In discussion, practical operational questions emerged around scalability and cost control. While Chronon itself does not provide opinionated frameworks for agent ideation or experimentation logic, it offers resource allocation controls that can be set at team, agent, or user levels. These serve as guardrails against runaway costs from excessive parallel experiments. If agents attempt to launch thousands of experiments simultaneously beyond allocated resources, they will be throttled, forcing organizational conversations about budget allocation for agentic experimentation.

The approach to data isolation leverages Chronon's object model where every feature definition or feature collection produces a one-to-one mapping with a data asset like a warehouse table or online key-value entry. Agents are blocked from modifying these objects in place through compile-time checks, forcing creation of new versions. Column-level semantic hashing then determines what changed and what remained the same, enabling selective recomputation of only changed elements while copying unchanged features from production. This ensures agents cannot corrupt production data while still benefiting from production compute.

## Critical Assessment and Context

While the presentation makes compelling claims about the effectiveness of this approach, several important caveats warrant consideration. The case study primarily describes infrastructure capabilities rather than demonstrating concrete results from deployed agentic systems. The examples of Airbnb, Stripe, OpenAI, and Netflix adoption reference traditional ML use cases rather than agent-driven experimentation specifically. It remains unclear how extensively the agentic experimentation workflow has been deployed in production versus being a forward-looking vision enabled by the infrastructure.

The presentation acknowledges that Zipline/Chronon has not built opinionated agentic layers for ideation and experiment design, instead positioning the platform as foundational infrastructure for others to build upon. This suggests the agentic capabilities may be relatively nascent, with the infrastructure having been built for traditional ML workflows that happen to provide useful properties for agent integration. The validation of whether agents can effectively use these abstractions at scale in production environments appears to be ongoing rather than definitively proven.

Cost considerations, while addressed through resource limits, remain a potential concern as agent-driven experimentation could dramatically increase infrastructure utilization compared to human-driven workflows. The presentation frames this as an organizational budgeting question, but the economic viability of extensive agentic experimentation at scale is not thoroughly examined.

The requirement for human review in the loop, while prudent for high-stakes systems, potentially limits the velocity improvements compared to fully autonomous agent systems. The actual iteration speed improvements claimed are from the original Chronon deployment at Airbnb for traditional ML workflows rather than from agent-driven experimentation specifically.

## Technical Significance for LLMOps

Despite these caveats, the case study makes important contributions to thinking about LLMOps for production systems. It articulates a clear distinction between using LLMs as agents to improve production systems versus deploying LLMs directly in production decision-making, providing a framework for when each approach is appropriate based on stakes, latency requirements, and auditability needs.

The emphasis on semantic APIs as the interface layer for agent interaction represents a valuable design pattern. Rather than exposing raw infrastructure complexity, providing domain-specific abstractions that match agent capabilities enables more reliable and reviewable agent outputs. The integration of safety through branch-based resource isolation demonstrates how development practices from software engineering can extend to agentic ML workflows.

The focus on compute reuse and efficiency as first-class concerns for agent infrastructure addresses a critical practical challenge that could otherwise make agent-driven experimentation economically infeasible at scale. The network effects from shared feature repositories across agents and human users point toward interesting dynamics as organizations scale agentic workflows.

Overall, this case study represents thinking at the infrastructure layer for LLMOps, focusing on the foundational capabilities needed to enable agents to safely and effectively work with production ML systems rather than on the agents themselves. The framing around "agentic experimentation" as distinct from "agentic decisioning" provides a useful conceptual framework for thinking about where and how to deploy LLM agents in organizations with mature, high-stakes ML systems.
