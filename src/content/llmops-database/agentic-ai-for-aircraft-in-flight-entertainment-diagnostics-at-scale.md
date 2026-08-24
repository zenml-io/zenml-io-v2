---
title: "Agentic AI for Aircraft In-Flight Entertainment Diagnostics at Scale"
slug: "agentic-ai-for-aircraft-in-flight-entertainment-diagnostics-at-scale"
draft: false
llmopsTags:
  - "data-analysis"
  - "classification"
  - "multi-agent-systems"
  - "agent-based"
  - "semantic-search"
  - "embeddings"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "langchain"
  - "postgresql"
  - "orchestration"
  - "open-source"
  - "monitoring"
  - "amazon-aws"
  - "anthropic"
industryTags: "other"
company: "Panasonic Avionics Corporation"
summary: "Panasonic Avionics Corporation faced significant challenges in diagnosing issues across its global fleet of in-flight entertainment and connectivity (IFEC) systems, where manual correlation of logs, metrics, and tickets across thousands of unique configurations took hours and required deep institutional knowledge. Working with AWS and the AWS Generative AI Innovation Center, they built a multi-agent AI system using Amazon Bedrock, Amazon SageMaker, and AWS Glue that processes operational data through five phases: ingestion and normalization, anomaly detection, parallel diagnosis using specialized agents, contextualization through semantic search of historical incidents, and automated report generation with remediation recommendations. The solution demonstrated 20-40 percent improvements in operational efficiency, significantly reduced Mean Time to Detect (MTTD) and Mean Time to Resolve (MTTR), and freed engineering teams from repetitive investigative tasks to focus on innovation and strategic reliability improvements."
link: "https://aws.amazon.com/blogs/machine-learning/accelerating-aircraft-ifec-diagnostics-with-agentic-ai-on-aws/"
year: 2026
seo:
  title: "Panasonic Avionics Corporation: Agentic AI for Aircraft In-Flight Entertainment Diagnostics at Scale - ZenML LLMOps Database"
  description: "Panasonic Avionics Corporation faced significant challenges in diagnosing issues across its global fleet of in-flight entertainment and connectivity (IFEC) systems, where manual correlation of logs, metrics, and tickets across thousands of unique configurations took hours and required deep institutional knowledge. Working with AWS and the AWS Generative AI Innovation Center, they built a multi-agent AI system using Amazon Bedrock, Amazon SageMaker, and AWS Glue that processes operational data through five phases: ingestion and normalization, anomaly detection, parallel diagnosis using specialized agents, contextualization through semantic search of historical incidents, and automated report generation with remediation recommendations. The solution demonstrated 20-40 percent improvements in operational efficiency, significantly reduced Mean Time to Detect (MTTD) and Mean Time to Resolve (MTTR), and freed engineering teams from repetitive investigative tasks to focus on innovation and strategic reliability improvements."
  canonical: "https://www.zenml.io/llmops-database/agentic-ai-for-aircraft-in-flight-entertainment-diagnostics-at-scale"
  ogTitle: "Panasonic Avionics Corporation: Agentic AI for Aircraft In-Flight Entertainment Diagnostics at Scale - ZenML LLMOps Database"
  ogDescription: "Panasonic Avionics Corporation faced significant challenges in diagnosing issues across its global fleet of in-flight entertainment and connectivity (IFEC) systems, where manual correlation of logs, metrics, and tickets across thousands of unique configurations took hours and required deep institutional knowledge. Working with AWS and the AWS Generative AI Innovation Center, they built a multi-agent AI system using Amazon Bedrock, Amazon SageMaker, and AWS Glue that processes operational data through five phases: ingestion and normalization, anomaly detection, parallel diagnosis using specialized agents, contextualization through semantic search of historical incidents, and automated report generation with remediation recommendations. The solution demonstrated 20-40 percent improvements in operational efficiency, significantly reduced Mean Time to Detect (MTTD) and Mean Time to Resolve (MTTR), and freed engineering teams from repetitive investigative tasks to focus on innovation and strategic reliability improvements."
notion:
  pageId: "3c6f8dff-2538-8025-bdb7-e78e2bbd43dc"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-24T09:00:00.000Z"
  lastEditedTime: "2026-08-24T09:00:00.000Z"
  publishedAt: "2026-08-24T09:16:15Z"
---

## Overview

Panasonic Avionics Corporation operates in-flight entertainment and connectivity (IFEC) systems across a massive global fleet serving hundreds of airlines and billions of passengers annually. This case study describes their collaboration with AWS and the AWS Generative AI Innovation Center to build a production agentic AI system that transforms aircraft diagnostics from a manual, time-intensive process into an automated, intelligent workflow. The system represents a sophisticated LLMOps implementation that processes operational data at scale, coordinates multiple specialized AI agents, and generates actionable diagnostic reports while maintaining human oversight for critical decisions.

The implementation demonstrates several key LLMOps principles including modular agent design, strategic use of LLMs for specific tasks rather than end-to-end processing, robust validation against ground truth data, and careful attention to transparency and auditability in production environments. The solution moved from concept to production with rigorous testing and has been generating daily diagnostic reports covering the active fleet, showing measurable operational improvements.

## Business Context and Operational Challenges

Before implementing this solution, Panasonic Avionics Corporation had already invested significantly in AWS-based data infrastructure, operating a data lake and data system that processed large volumes of operational data daily. However, the challenge wasn't data collection but rather translating raw operational data into actionable diagnostics at scale. The company deploys IFEC services with configurations tailored to individual airline operational requirements, meaning each deployment generates unique log patterns that complicate fleet-wide performance assessment.

The operational challenges that created the opportunity for AI intervention included several interrelated factors. Manual analysis effort was substantial, with teams performing manual reviews to correlate metrics across multiple operational data sources. This manual correlation across diverse configurations required detailed investigation, which while facilitating diagnostic accuracy, extended the overall analysis cycle significantly. Mean Time to Detect (MTTD) was affected because detection relied primarily on reactive ticket generation and manual review rather than proactive monitoring. Mean Time to Resolve (MTTR) included significant investigative effort before corrective action could begin, contributing to longer end-to-end resolution cycles.

Beyond the time metrics, the process created broader organizational challenges. Repetitive investigative tasks and log reviews represented significant opportunities for intelligent automation, particularly during peak activity periods. The manual correlation processes required deep system familiarity and institutional knowledge, creating bottlenecks in scaling diagnostic capabilities across engineering teams. Engineers spent recurring time on diagnostic activities that reduced their bandwidth for innovation, feature development, and long-term reliability improvements. The company identified a clear opportunity to evolve toward proactive health monitoring and fleet-wide pattern recognition while preserving the analytical rigor that manual investigation had provided.

## Solution Architecture and Design Philosophy

The architectural approach combines multiple AWS services into a cohesive multi-agent workflow system that processes data through three distinct operational layers working in harmony. A Trend Analyzer identifies anomalies by analyzing key performance indicators and service degradation metrics. Parallel Diagnostic Agents execute specific diagnostic functions including correlation analysis, system checks, and log pattern matching. A Summarizer powered by a large language model integrates outputs into coherent diagnostic reports with root cause analysis and recommended actions.

The architecture demonstrates careful thinking about where LLMs add value versus where deterministic or specialized approaches are more appropriate. Rather than using an LLM as the primary decision-maker throughout the pipeline, the system reserves LLM capabilities primarily for summarization and error reasoning tasks where generative capabilities provide clear benefits. The bulk of the diagnostic work happens through specialized agents designed for specific analytical tasks, orchestrated through infrastructure that manages state and parallelization.

## Phase 1: Ingestion and Normalization

The system begins by ingesting raw operational data from across the fleet and transforming it into standardized service metrics. This data is stored in an Amazon S3 data lakehouse using Apache Iceberg, which provides ACID transactions and schema evolution capabilities crucial for managing evolving fleet data structures. AWS Glue and Amazon EMR handle the extract, transform, and load (ETL) pipeline, processing the large volumes of operational data generated daily.

A particularly important component of this phase is the domain ontology, which serves as a shared vocabulary defining fleet entities and their relationships. This ontology normalizes terminology across fleet variants, creating consistency that allows data from diverse configurations to be compared at fleet scale. The ontology also links performance metrics with configuration metadata and ticketing information, creating a unified view that enables cross-fleet diagnostics. Without this normalization layer, the heterogeneity of deployment configurations would make fleet-wide pattern recognition extremely difficult.

The use of Apache Iceberg for the data lakehouse demonstrates thoughtful infrastructure choices for production LLMOps. Iceberg's capabilities for handling schema evolution are particularly relevant when dealing with fleet configurations that change over time, as new aircraft variants or system upgrades are deployed. This addresses a common challenge in production AI systems where data structures evolve but historical data must remain accessible and comparable.

## Phase 2: Detection Through Trend Analysis

The Trend Analyzer agent continuously evaluates key performance indicators, service-level adherence, and degradation metrics across the fleet. This represents a shift from reactive detection through ticket generation to proactive identification of emerging problems before they escalate. The fleet-wide relationship modeling capability is crucial here, as it can detect patterns that would be invisible when examining individual deployments in isolation. For example, gradual degradation affecting only deployments that share a specific configuration variant might not trigger alerts at the individual deployment level but becomes apparent when analyzed fleet-wide.

This detection phase demonstrates an important LLMOps principle: not everything in an AI system needs to use generative models. The trend analysis likely relies on statistical methods, anomaly detection algorithms, and rule-based systems that can efficiently process high-volume metrics data. The value comes from the systematic, automated application of these techniques at scale rather than from generative capabilities.

## Phase 3: Parallel Diagnostic Investigation

When the Trend Analyzer flags a concern, the system activates parallel diagnostic agents that investigate simultaneously from multiple angles. This parallel processing architecture is orchestrated using Amazon SageMaker with LangGraph, an open source framework for managing stateful AI workflows. The Strands Agents SDK, an open source Python framework for building AI agents, provides the agent implementation and execution capabilities.

The three specialized agents each tackle distinct aspects of diagnosis. The Correlation Analyzer detects recurring patterns across deployments that share configurations, determining whether an issue is isolated or systemic. The System Checks agent validates metadata and service status against ticketing workflows, determining whether known maintenance activities explain observed behavior. The Log Analyzer matches current log patterns against a library of previously identified failure modes using rule-based and pattern-based detection.

The orchestration through LangGraph on Amazon SageMaker represents a sophisticated approach to production agent systems. LangGraph provides capabilities for managing complex, stateful workflows where agents may need to execute conditionally, retry operations, or maintain context across multiple steps. Amazon SageMaker provides the managed infrastructure for running these agents with appropriate governance, monitoring, and resource management. The combination allows the system to run diagnostics that previously took hours of manual review in minutes of automated analysis according to Panasonic Avionics Corporation's internal testing.

The choice to use specialized agents rather than a single general-purpose LLM for all diagnostic tasks reflects mature thinking about production AI systems. Each agent can be optimized for its specific task, updated independently, and validated against specific success criteria. This modularity also enables the team to use different techniques appropriate to each task rather than forcing everything through a language model interface.

## Phase 4: Contextualization Through Semantic Search

The system queries past incidents and resolution artifacts stored as vector representations in Amazon RDS with pgvector, a PostgreSQL extension that enables vector similarity search within a traditional relational database. This semantic search capability retrieves similar patterns and their resolutions even when exact symptoms differ, effectively giving the system institutional memory that scales across the engineering organization.

The use of vector embeddings and semantic search demonstrates how LLM-adjacent technologies can add value in production systems. By encoding historical incidents as vectors, the system can find relevant past cases based on semantic similarity rather than exact keyword matching. This is particularly valuable in diagnostic scenarios where the same underlying problem might manifest with different surface-level symptoms depending on configuration, timing, or environmental factors.

The decision to use Amazon RDS with pgvector rather than a specialized vector database reflects a pragmatic production engineering choice. By keeping vector search capabilities within PostgreSQL, the team can leverage existing database operational expertise, maintain ACID guarantees, and avoid introducing another specialized infrastructure component. This reduces operational complexity while still providing the semantic search capabilities needed for contextualization.

## Phase 5: Recommendation Generation and Action

Anthropic Claude on Amazon Bedrock synthesizes findings from the Correlation Analyzer, System Checks, and Log Analyzer into structured diagnostic reports. Each report includes root cause hypotheses, impact analysis across affected fleet segments, and prioritized remediation recommendations. This represents the primary point where LLM capabilities are leveraged in the pipeline.

The system categorizes reports by severity, and for critical findings, it automatically creates alerts, prioritizes incidents, and routes them to appropriate engineering teams with recommended resolution actions. This automation alleviates manual triage burden while preserving engineering oversight for remediation decisions. The architecture maintains human-in-the-loop review for operationally significant incidents, with human engineers reviewing diagnostic findings and approving remediation actions.

The implementation demonstrates important LLMOps practices for production deployment. AI-generated recommendations are grounded using retrieved operational data and historical incidents, validated against deterministic business rules, and presented with supporting evidence. This grounding approach helps mitigate the risk of hallucination or unreliable recommendations that could lead to incorrect remediation actions. The system maintains traceability of agent decisions and recommendations to support auditability and continuous improvement, which is crucial for safety-critical aerospace applications.

The choice to use Anthropic Claude on Amazon Bedrock rather than deploying and managing their own model infrastructure reflects the benefits of managed AI services for production applications. Amazon Bedrock provides model access through APIs with built-in capabilities for security, compliance, and governance. This allows Panasonic Avionics Corporation to focus on diagnostic logic and business value rather than model infrastructure, serving, and updates.

## Production Path and Operational Discipline

The journey from concept to production demonstrates rigorous engineering discipline appropriate for safety-critical aerospace applications. Panasonic Avionics Corporation validated the solution with architectural guidance from the AWS Generative AI Innovation Center advisory team on event-driven design patterns, parallel processing strategies, and performance optimization techniques for production scalability.

The team established rigorous validation early in the development process, implementing cross-reference validation against ground truth data and achieving accuracy that consistently exceeded requirements throughout testing. This validation discipline is essential for production LLMOps, particularly in domains where incorrect recommendations could have safety or significant operational consequences.

The design emphasizes modularity and transparency through atomic agent operations, transparency in prompts and logic, and human-in-the-loop review capabilities. This modular approach allows for independent agent updates without requiring system-wide changes as the solution scales, which is a key operational benefit for maintaining and improving the system over time. The transparency in prompts and logic addresses a common challenge in production LLM systems where the reasoning process can become opaque.

The team optimized AI components strategically, using tuned parameter configurations for deterministic outputs and focused responses. The conscious decision to limit LLM use to summarization and error reasoning tasks where generative capabilities add clear value reflects mature understanding of when to use different AI techniques. This strategic application prevents overuse of expensive LLM inference where simpler, more reliable approaches would suffice.

The solution moved to production only when automated actions aligned with manual expert assessment, ensuring the system maintained diagnostic accuracy while reducing time to resolution. This validation criterion demonstrates appropriate caution in production deployment. The system now generates diagnostic reports daily covering the active fleet, representing sustained production operation rather than a proof of concept or pilot.

## Business Impact and Operational Results

The documented results show measurable improvements across key operational metrics, though the case study appropriately presents these with some caution about varying results based on specific circumstances. Manual analysis effort decreased significantly, while both Mean Time to Detect (MTTD) and Mean Time to Resolve (MTTR) improved. In targeted use cases, the system demonstrated 20-40 percent improvements in operational efficiency.

Support teams confirmed significant reduction in repetitive investigative burden, as the system now handles work that previously required hours of manual effort. Engineering capacity for independent diagnostics increased meaningfully, enabling the team to diagnose and resolve issues that previously required escalation to more experienced engineers. These improvements fundamentally shift the operational model as systems grow, allowing the team to handle increased scale through AI agents while reducing both costs and operational risk.

The case study's measured presentation of results, with ranges rather than specific percentages and acknowledgment that results vary by use case, suggests a realistic assessment rather than marketing hyperbole. The improvements are substantial but presented in context, which increases credibility.

## Critical Assessment and Balanced Perspective

While the case study presents a successful implementation, it's important to maintain a balanced perspective on the claims and approach. The document is published on AWS's blog and describes a solution built entirely on AWS services, which creates inherent incentive to present the implementation favorably. However, several factors suggest the core technical claims are credible.

The architectural choices demonstrate sophisticated thinking about production AI systems rather than simply applying LLMs to every problem. The emphasis on specialized agents, strategic use of LLMs only where appropriate, rigorous validation, and human oversight for critical decisions all reflect engineering maturity. The use of established frameworks like LangGraph and the Strands Agents SDK rather than custom-built orchestration shows pragmatic adoption of existing tools.

The production deployment with daily diagnostic reports covering the active fleet demonstrates sustained operation beyond proof-of-concept. The measured presentation of results with ranges and caveats increases credibility compared to claims of dramatic percentage improvements without context.

However, several questions remain that potential implementers should consider. The case study doesn't detail the development timeline or resource investment required to build and validate the system. The accuracy metrics are mentioned as "consistently exceeding requirements" but specific accuracy numbers aren't provided, making it difficult to assess diagnostic reliability. The handling of edge cases, failure modes, or situations where the system provides incorrect recommendations isn't discussed in detail.

The reliance on AWS-specific services creates vendor lock-in, though many components use open standards like Apache Iceberg or open source frameworks like LangGraph that could potentially be migrated to other infrastructure. The operational costs of running this system aren't disclosed, though the serverless architecture through AWS Glue and managed services like Amazon Bedrock and SageMaker suggests the cost model scales with usage.

The human-in-the-loop review for operationally significant incidents is appropriate for safety-critical applications, but the case study doesn't detail what percentage of recommendations require human review or how this affects the overall efficiency gains. If most recommendations still require detailed human review, the time savings might be less dramatic than suggested.

## LLMOps Lessons and Best Practices

This case study offers several valuable lessons for production LLMOps implementations. The strategic use of LLMs only for tasks where generative capabilities add clear value, rather than using LLMs as general-purpose problem solvers, demonstrates engineering discipline. The emphasis on specialized agents with clear responsibilities enables independent optimization, testing, and updates for each component.

The multi-phase architecture with distinct ingestion, detection, diagnosis, contextualization, and recommendation stages creates clear boundaries and enables systematic validation at each stage. The use of domain ontologies to normalize heterogeneous data before AI processing addresses a common real-world challenge where data from diverse sources must be made comparable.

The grounding of AI recommendations using retrieved operational data and validation against deterministic business rules helps ensure reliability and reduces hallucination risk. The human-in-the-loop review for critical decisions maintains appropriate oversight while automating routine aspects of diagnostics.

The rigorous validation against ground truth data before production deployment and the modular design enabling independent component updates demonstrate operational maturity. The choice of managed services like Amazon Bedrock over self-hosted models allows focus on business logic rather than infrastructure management.

For organizations considering similar implementations, this case study demonstrates that successful production LLMOps requires careful attention to data normalization, strategic application of different AI techniques, rigorous validation, and appropriate human oversight rather than simply connecting LLMs to data sources and prompting them to solve problems.
