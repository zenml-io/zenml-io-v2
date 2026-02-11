---
title: "Observability Platform's Journey to Production GenAI Integration"
slug: "observability-platform-s-journey-to-production-genai-integration"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "677ffdfa6554a72deed50e98"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:54:45.870Z"
  createdOn: "2025-01-09T16:48:58.939Z"
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "data-cleaning"
  - "data-integration"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "realtime-application"
  - "rag"
  - "prompt-engineering"
  - "fine-tuning"
  - "model-optimization"
  - "cost-optimization"
  - "latency-optimization"
  - "error-handling"
  - "human-in-the-loop"
  - "semantic-search"
  - "kubernetes"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "load-balancing"
  - "microservices"
  - "cicd"
  - "scaling"
  - "devops"
  - "orchestration"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "amazon-aws"
  - "microsoft-azure"
  - "openai"
industryTags: "tech"
company: "New Relic"
summary: "New Relic, a major observability platform processing 7 petabytes of data daily, implemented GenAI both internally for developer productivity and externally in their product offerings. They achieved a 15% increase in developer productivity through targeted GenAI implementations, while also developing sophisticated AI monitoring capabilities and natural language interfaces for their customers. Their approach balanced cost, accuracy, and performance through a mix of RAG, multi-model routing, and classical ML techniques."
link: "https://www.youtube.com/watch?v=euXq7zwXs68&list=PL2yQDdvlhXf_AG2Tt0CK-d4-eY6PgjKFr&index=5"
year: 2023
seo:
  title: "New Relic: Observability Platform's Journey to Production GenAI Integration - ZenML LLMOps Database"
  description: "New Relic, a major observability platform processing 7 petabytes of data daily, implemented GenAI both internally for developer productivity and externally in their product offerings. They achieved a 15% increase in developer productivity through targeted GenAI implementations, while also developing sophisticated AI monitoring capabilities and natural language interfaces for their customers. Their approach balanced cost, accuracy, and performance through a mix of RAG, multi-model routing, and classical ML techniques."
  canonical: "https://www.zenml.io/llmops-database/observability-platform-s-journey-to-production-genai-integration"
  ogTitle: "New Relic: Observability Platform's Journey to Production GenAI Integration - ZenML LLMOps Database"
  ogDescription: "New Relic, a major observability platform processing 7 petabytes of data daily, implemented GenAI both internally for developer productivity and externally in their product offerings. They achieved a 15% increase in developer productivity through targeted GenAI implementations, while also developing sophisticated AI monitoring capabilities and natural language interfaces for their customers. Their approach balanced cost, accuracy, and performance through a mix of RAG, multi-model routing, and classical ML techniques."
---

## Overview

This case study comes from a joint presentation at AWS re:Invent featuring Jeffrey Hammond (AWS) and Suraj Krishnan (Group Vice President of Engineering, Telemetry Data Platform at New Relic). The presentation covers both broad patterns AWS observes across ISVs implementing generative AI and a deep dive into New Relic's specific journey—both for internal productivity and product-embedded AI capabilities.

New Relic is an AI-first observability platform serving approximately 85,000 customers with mission-critical monitoring needs. The platform ingests about seven petabytes of data daily with billions of events, running what they claim to be one of the largest streaming platforms globally, backed by their proprietary New Relic Database (NRDB) and S3-based relational storage architecture.

## Internal Generative AI Implementation

New Relic began their generative AI journey approximately two years before the presentation (around 2023), notably before "agents" became a mainstream concept. Their approach centered on "proof of value" rather than just "proof of concept"—a critical distinction that guided their prioritization of use cases.

### Developer Productivity Focus

The primary internal use case targeted developer productivity, recognizing developers as the scarcest resource. They identified several key bottlenecks:

- **Code Reviews**: Traditional code review processes created significant delays, with teams waiting days or weeks for principal or senior engineers to review code. This represents a major bottleneck in most engineering organizations.

- **Engineering Standards Enforcement**: Rather than relying on senior developers to manually teach coding standards to junior team members, they automated standards compliance checking.

- **Code Generation**: They found the most value not in direct code generation but specifically in test generation and refactoring of legacy code—a nuanced finding that challenges common assumptions about where generative AI adds the most value.

### Measured Productivity Results

New Relic conducted rigorous cohort analysis across engineering levels (P1: entry-level, P2: mid-level, P3: senior). Their hypothesis that generative AI would benefit newer engineers more than senior engineers was tested through pre- and post-implementation calibration. The results showed approximately 15% average productivity increase across all levels, with the data supporting their initial hypothesis about junior engineers seeing greater benefits.

### Multi-Agent Architecture

New Relic implemented what they call a "Nova agent"—a unified agent interface that orchestrates multiple specialized domain agents internally. This architecture was designed before the current agent hype cycle, reflecting forward-thinking architectural decisions. Key aspects include:

- **Co-pilot Mode vs. Free-form Mode**: Agents can be explicitly invoked or operate automatically within workflows. For example, pull requests automatically trigger code review agents without manual invocation.

- **Asynchronous Communication**: The agent architecture supports asynchronous operations—acknowledging requests, performing work (which may take minutes to hours), and returning results. This includes creating pull requests for other teams and awaiting approval.

- **External Integrations**: The architecture includes integration with Amazon Q, allowing unified querying across AWS resources through a single agent interface rather than multiple separate tools.

### Hero Work Automation

New Relic has approximately 100 engineering teams, each with engineers on rotation for "hero work" (on-call support). They classified all tickets and activities, identifying five use cases where generative AI could handle requests automatically. The agent picks up engineer requests asynchronously, performs the work, and can even create pull requests in other teams' repositories.

### Incident Management

For their mission-critical environment, incident management automation became a key investment area:

- **Alert Correlation**: Automated correlation of alerts and automatic RCA (Root Cause Analysis) generation
- **Historical Context**: The system examines current system-wide events and historical incidents to suggest solutions
- **Actionable Recommendations**: The agent provides multiple potential solutions that users can either manually implement or trigger automatic implementation with a single click
- **Change Tracking Integration**: During incidents, users can query what changes occurred in specific time windows, with the system identifying potentially problematic changes

### Cloud Cost Optimization

A particularly impactful use case involved cloud cost monitoring and optimization:

- **Granular Tagging**: All cloud resources are tagged by team and resource type
- **Anomaly Detection**: AI monitors costs against common benchmarks and alerts teams when anomalies occur
- **Threshold Tuning**: Initial implementation alerted on $1 increases, which proved too sensitive and frustrated engineers—highlighting the importance of tuning AI systems based on user feedback
- **Convertible RI Optimization**: They leveraged AI to optimize convertible Reserved Instance management, converting based on workload and instance types, which saved $4-5 million annually through intelligent buying, selling, and conversion of RIs

## Product-Embedded AI Capabilities

New Relic's product platform architecture has three layers: Platform of Record (data ingestion and knowledge platform), Platform of Intelligence (probabilistic and deterministic engines), and Platform of Action (anomaly alerts, recommendations, NL queries).

### Natural Language Query Translation

A key product capability addresses customer onboarding friction. While experienced users love NRQL (New Relic Query Language), new customers face a learning curve. The platform now accepts natural language queries and uses prompt engineering to translate them to NRQL, democratizing access to the platform's capabilities.

### AI Monitoring for Customers

New Relic offers monitoring for customers' own AI implementations, focusing on:

- **Performance and Cost Tracking**: Following the cost/accuracy/speed triangle discussed in the broader presentation
- **Model Drift Detection**: Monitoring whether models have deviated from expected behavior
- **Latency Monitoring**: User experience metrics for AI-powered features
- **Model Comparison**: Ability to compare performance across different models

### Intelligent Alert Management

A critical observation is that during incidents, the alert that should exist often doesn't, while many irrelevant alerts fire. NR AI addresses this through:

- **Alert Optimization**: Reducing false positives and false negatives for higher quality alerting
- **Automated Alert Creation**: Agents can set up new alerts without human interference based on learned patterns
- **RCA Automation**: When alerts trigger, agents perform root cause analysis considering current and historical system state

## Key Lessons and LLMOps Insights

### Proof of Value Over Proof of Concept

The presentation emphasizes moving beyond POCs to measurable value. Every AI implementation should have quantifiable success metrics before significant investment.

### Classical ML vs. Generative AI Balance

A critical insight: not everything requires generative AI. New Relic uses classical machine learning for capacity engineering in their cellular architecture (determining when to add or decommission cells). This approach is "easier, more impactful, and less costly" than generative approaches for forecasting use cases.

### The Cost-Accuracy-Speed Triangle

Echoing AWS's framework, New Relic emphasizes balancing:
- Accuracy requirements (what level is acceptable for customer value?)
- Cost (especially important as context window usage scales)
- Speed (latency requirements)

Using the largest LLM for every use case is cost-prohibitive; sometimes humans are more cost-effective than LLMs.

### Context and Model Selection

The presentation advocates for a pragmatic approach to model sophistication:
- Foundation model building is prohibitively expensive for most companies
- Fine-tuning is expensive and should only be pursued for truly specialized domain needs
- RAG implementations (including graph RAG for knowledge graphs) work well for most scenarios and are cost-effective
- Different models should be used for different use cases to optimize costs

### Iteration and Experimentation Culture

New Relic maintains 40-50 use cases in experimentation. They estimate approximately 15 will be powerful enough to productize, some will provide learnings but not production value, and some will need more time. Prototypes typically take two to three weeks, not months.

### Workforce Transformation

A balanced perspective on AI and employment: "People who use AI will take jobs of people who don't use AI"—emphasizing AI as an empowerment tool that removes drudgery rather than wholesale job replacement. Both organic training and specialized expertise acquisition are necessary for successful implementation.

### Scope Management

The presentation warns against over-broad scoping of AI use cases. Disappointment often results from expectations exceeding what current capabilities can deliver. Narrow, well-defined use cases with clear success criteria perform better.