---
title: "Agentic Diagnostics Tool for Apache Spark Failure Troubleshooting"
slug: "agentic-diagnostics-tool-for-apache-spark-failure-troubleshooting"
draft: false
llmopsTags:
  - "data-analysis"
  - "code-interpretation"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "rag"
  - "semantic-search"
  - "vector-search"
  - "token-optimization"
  - "error-handling"
  - "human-in-the-loop"
  - "evals"
  - "langchain"
  - "llama-index"
  - "fastapi"
  - "monitoring"
  - "open-source"
  - "documentation"
  - "databases"
  - "orchestration"
  - "openai"
  - "anthropic"
industryTags: "tech"
company: "Pinterest"
summary: "Pinterest built Medic for Apache Spark, an agentic diagnostics tool that automatically troubleshoots Spark job failures to address the unsustainable burden of manual support and complex distributed system debugging. The system evolved from a simple prototype using Model Context Protocol and a single ReAct agent to a sophisticated multi-agent architecture built on LangGraph, incorporating specialized agents for triage, research, and remediation, along with exception classification pipelines and metrics analysis sub-agents. The solution achieved substantial improvements in diagnostic accuracy through investments in observability using OpenTelemetry and LangFuse, comprehensive end-to-end testing with fixture-based evaluation harness, and careful prompt engineering per specialized agent role, while maintaining scalability by converting token-inefficient raw data into images and structured summaries."
link: "https://www.youtube.com/watch?v=0RNNfxpdbQk"
year: 2026
seo:
  title: "Pinterest: Agentic Diagnostics Tool for Apache Spark Failure Troubleshooting - ZenML LLMOps Database"
  description: "Pinterest built Medic for Apache Spark, an agentic diagnostics tool that automatically troubleshoots Spark job failures to address the unsustainable burden of manual support and complex distributed system debugging. The system evolved from a simple prototype using Model Context Protocol and a single ReAct agent to a sophisticated multi-agent architecture built on LangGraph, incorporating specialized agents for triage, research, and remediation, along with exception classification pipelines and metrics analysis sub-agents. The solution achieved substantial improvements in diagnostic accuracy through investments in observability using OpenTelemetry and LangFuse, comprehensive end-to-end testing with fixture-based evaluation harness, and careful prompt engineering per specialized agent role, while maintaining scalability by converting token-inefficient raw data into images and structured summaries."
  canonical: "https://www.zenml.io/llmops-database/agentic-diagnostics-tool-for-apache-spark-failure-troubleshooting"
  ogTitle: "Pinterest: Agentic Diagnostics Tool for Apache Spark Failure Troubleshooting - ZenML LLMOps Database"
  ogDescription: "Pinterest built Medic for Apache Spark, an agentic diagnostics tool that automatically troubleshoots Spark job failures to address the unsustainable burden of manual support and complex distributed system debugging. The system evolved from a simple prototype using Model Context Protocol and a single ReAct agent to a sophisticated multi-agent architecture built on LangGraph, incorporating specialized agents for triage, research, and remediation, along with exception classification pipelines and metrics analysis sub-agents. The solution achieved substantial improvements in diagnostic accuracy through investments in observability using OpenTelemetry and LangFuse, comprehensive end-to-end testing with fixture-based evaluation harness, and careful prompt engineering per specialized agent role, while maintaining scalability by converting token-inefficient raw data into images and structured summaries."
notion:
  pageId: "3a5f8dff-2538-807a-8eeb-c519ac2b8692"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-22T07:23:00.000Z"
  lastEditedTime: "2026-07-22T07:23:00.000Z"
  publishedAt: "2026-07-22T07:39:52Z"
---

## Overview

Pinterest developed Medic for Apache Spark, an agentic diagnostics tool designed to automatically troubleshoot failures in Apache Spark jobs. The project represents a sophisticated implementation of LLMs in production environments, addressing a critical operational pain point: the overwhelming support burden faced by data platform teams when assisting partner teams with distributed system failures. The speaker, Draško Proferović, a staff engineer at Pinterest, presents a comprehensive journey from initial prototype to production-ready multi-agent system, offering valuable insights into the challenges and solutions of deploying agentic AI systems at scale.

The fundamental motivation behind Medic stems from a universal challenge in data platform organizations: providing high-quality support for infrastructure becomes a never-ending stream of problems to resolve, with ambiguous prioritization between competing urgent requests. Traditional human-driven support requires difficult tradeoffs about which team to help first, whereas LLMs can scale knowledge and capabilities on demand. The vision was straightforward but ambitious: users should be able to ask "Why did a job fail?" and receive a deep research document providing evidence for the root cause along with grounded, context-specific remediation suggestions. The system needed to be available across all surfaces where users operate, including Slack and Airflow UI.

## Initial Prototype and Early Architecture

The initial prototype began by exposing data resources through the Model Context Protocol, which served as a bridge connecting data sources to LLMs. This allowed engineers to start LLM conversations with MCP tools enabled and ask models to reason about Spark jobs. While this approach worked in practice, it had a significant limitation: it required extensive careful prompting from human operators, effectively defeating the purpose of automation.

To address this limitation, Pinterest extended the prototype by implementing a single ReAct (Reasoning and Acting) agent. This agent received a single comprehensive prompt that embodied the problem-solving approach it should take, instructions for structuring responses as a report, and specific examples of common failure patterns. This iteration provided sufficient capability to begin beta trials with real users, which proved invaluable for identifying fundamental shortcomings that would guide subsequent development.

## Critical Learnings from Beta Trials

The beta trials revealed several critical weaknesses in the single-agent approach. Prompt tuning became unsustainable because one monolithic prompt had to handle everything, and adding detail to address one issue would often degrade behavior in another area. Response quality was inconsistent, sometimes producing shallow analysis and other times being excessively verbose. The system lacked effective controls to keep the agent on track during its investigation. Production jobs frequently hit context window limits, with large tool outputs from logs quickly consuming tokens and bringing agent reasoning to a halt.

Perhaps most concerning from an LLMOps perspective, the testing strategy relied entirely on manual tests against production data, which felt anecdotal and unsustainable. Production data would be retentioned away, making it impossible to reliably assess whether changes broke earlier wins. This lack of systematic evaluation made it difficult to iterate confidently on the system.

## Investment in Observability and Testability

Recognizing these fundamental limitations, Pinterest made strategic investments in observability and testability infrastructure before attempting to scale the system further. The team implemented OpenTelemetry to publish traces to LangFuse, enabling them to view agent execution as waterfall diagrams of steps. This visibility proved crucial for understanding the root causes of lower-quality responses and informed subsequent architectural decisions.

The team built a comprehensive end-to-end test harness capable of snapshotting production state and codifying expectations as offline evaluations. This testing infrastructure operated in two modes. In record mode, the agent calls real downstream systems and tool responses are captured as fixtures, which are saved to the file system and checked into version control as code. In playback mode, the agent runs against these fixtures instead of production data, performs analysis, and generates reports. The test suite then grades reports based on authored offline evaluations.

These offline evaluations enabled quantitative assessment of specific quality dimensions. For example, one evaluation might check that the agent provides no more than three suggested fixes, scoring lower if too many fixes are provided to manage report verbosity. This approach allowed the team to quantify quality instead of relying on intuition, and as test coverage grew, they gained confidence that improvements did not introduce regressions. The ability to tune prompts based on systematic evaluation results rather than anecdotal feedback represented a critical maturation of their LLMOps practices.

## Exception Classification Pipeline

With testing infrastructure in place, Pinterest tackled one of the most challenging aspects of Spark diagnostics: log analysis. Logs from distributed systems are inherently noisy, and many exceptions that appear in logs are benign. Simply focusing on the last exception is often unsuitable for accurate root cause analysis. The team initially kept things simple with a heuristics-based approach using regex to filter out certain exceptions, but this approach did not scale well.

Instead, they built a sophisticated exception classifier pipeline. The core insight was to learn which exceptions commonly appear in successful jobs, treat those as likely red herrings, and filter them out in future analysis. The pipeline fingerprints and clusters exceptions, then ranks them based on content relevance and temporal proximity to job termination. This fundamentally changed how the agent consumed log data. Rather than accessing logs directly, the agent received two specialized MCP tools: one to get the top K truncated exceptions, and another to get full log details for a specific exception.

This refactoring resulted in substantial improvements to signal-to-noise ratio and reduced the chance of the LLM anchoring its investigation on misleading exceptions. The exception classification pipeline represents an important pattern in LLMOps: preprocessing noisy data through specialized pipelines before exposing it to LLMs, rather than expecting the LLM to filter noise itself.

## Metrics Analysis Sub-Agent

Similarly, the team discovered that raw time series metrics pose significant challenges for LLM consumption. Raw metrics data is not context-window friendly, and while feeding raw data to an LLM works at small scale, it fails for long-running production jobs and is extremely token inefficient. Pinterest's solution was to perform metrics analysis in a quarantined sub-agent using a multimodal approach.

The sub-agent converts raw time series data into graphs, which are collaged into a final image resembling a Grafana dashboard but with useful annotations like minimum and maximum values highlighted. This image is attached to the LLM conversation, and the model is prompted to reason about patterns in the visualizations. Images proved superior because they guarantee consistent input token usage for analyzing any Spark job regardless of its duration.

This approach enables the LLM to identify useful signals including executors dropping to zero or near zero, long plateaus indicating bottlenecks, and any resource behavior inconsistent with healthy progress. The sub-agent summarizes its findings and returns results to the parent agent, ensuring the context window remains healthy. This design pattern demonstrates sophisticated thinking about token economics and context management in production LLM systems.

## Multi-Agent Architecture Overhaul

The most significant architectural evolution came when Pinterest completely overhauled the agent harness, moving from a single ReAct agent to a multi-agent architecture built on LangGraph's deep agent library. Each agent in this new architecture has a dedicated prompt and a subset of MCP tools, while the deep agent library itself provides built-in tools to keep agents on track, such as a to-do list and a virtual file system. This approach mirrors what users have come to expect from modern coding tools.

The multi-agent architecture finally enabled decomposition of the monolithic prompt into specialized roles with clear separation of concerns. This made it significantly easier for developers to maintain each prompt separately while performing focused testing using the end-to-end test harness. A particularly valuable consequence was that expanding project scope became as simple as adding a new prompt, which is how Pinterest extended Medic to also help users optimize their Spark SQL jobs.

The workflow in the production multi-agent system operates as follows. A user request enters the system, and intent is classified as either requiring a simple answer to a question or a deep diagnostic session. For diagnostics, the triage agent determines the Spark job's lifecycle state. If the job has failed, the triage agent uses a subset of tools to generate a set of failure hypotheses. Each hypothesis is then researched in parallel by specialized research agents that gather evidence to validate it. These research agents return a confidence score and a potential root cause to a supervisor agent, which selects the highest confidence root cause and invokes a healer agent to offer remediations based on runbooks ingested into a vector database. Finally, the supervisor agent assembles the final report with proper formatting.

## Key LLMOps Insights and Tradeoffs

The multi-agent architecture proved highly effective, offering the greatest control over system behavior. The enhancements to log handling through exception classification led to substantial reduction in inaccurate root cause identification. However, not all experiments succeeded. The team trialed using LangGraph's workflows to make the agent more deterministic, but this approach proved brittle compared to the reasoning and acting agent paradigm. This finding highlights an important tradeoff in agentic systems: overly constraining agent behavior through rigid workflows can reduce flexibility and resilience, whereas ReAct-style agents maintain better adaptability even if they are less predictable.

The project demonstrates several critical LLMOps best practices. First, the importance of comprehensive observability cannot be overstated. The integration of OpenTelemetry and LangFuse provided essential visibility into agent behavior and enabled data-driven iteration. Second, systematic testing infrastructure with fixture-based playback and quantitative offline evaluations proved essential for confident iteration. Manual testing against production data is fundamentally insufficient for complex agentic systems.

Third, the evolution from a single monolithic prompt to multiple specialized prompts reflects a fundamental architectural principle: decomposition and separation of concerns apply to LLM systems just as they do to traditional software. Fourth, careful attention to token economics and context window management is critical at scale. The approaches of using exception classification to reduce noise, converting metrics to images for consistent token usage, and employing sub-agents to summarize findings all demonstrate sophisticated thinking about resource constraints.

Fifth, the choice of when to constrain agent behavior versus allowing flexible reasoning represents a key design tradeoff. Pinterest found that ReAct-style agents outperformed rigid workflows, suggesting that for complex diagnostic tasks, maintaining reasoning flexibility provides better outcomes than deterministic execution paths.

## Future Directions and Broader Applications

Pinterest is actively experimenting with incorporating user feedback from prior sessions to automatically improve the agent, suggesting a move toward continual learning and adaptation. The team also sees broader opportunities to apply this diagnostic pattern to other distributed systems like Flink and Trino, indicating that the architectural patterns and lessons learned have applicability beyond Spark.

The Medic for Apache Spark project represents a mature LLMOps implementation that addresses real operational pain points at scale. The comprehensive journey from prototype to production offers valuable lessons about the importance of observability, systematic testing, architectural decomposition, and careful attention to token economics. While the presentation comes from Pinterest engineers and may naturally emphasize successes, the candid discussion of failed experiments like rigid workflows and the iterative problem-solving approach lends credibility to the technical insights. The system demonstrates that agentic AI can effectively scale expert knowledge for complex diagnostic tasks, though achieving production quality requires substantial investment in testing infrastructure, observability, and careful architectural design.
