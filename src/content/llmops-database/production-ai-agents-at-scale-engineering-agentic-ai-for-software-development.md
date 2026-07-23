---
title: "Production AI Agents at Scale: Engineering Agentic AI for Software Development"
slug: "production-ai-agents-at-scale-engineering-agentic-ai-for-software-development"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "agent-based"
  - "multi-agent-systems"
  - "memory"
  - "harness-engineering"
  - "prompt-engineering"
  - "evals"
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
  - "guardrails"
  - "reliability"
  - "scalability"
  - "redis"
  - "cache"
  - "postgresql"
  - "fastapi"
  - "anthropic"
  - "amazon-aws"
industryTags: "tech"
company: "Monday"
summary: "Monday.com built and deployed production AI agents (\"AI Teammates\") that function as autonomous software engineers within their existing engineering organization. Facing the challenge of scaling software development in a decade-old codebase serving millions of users, they created an agent system called Sphera that treats AI agents as teammates with identities, managers, and performance metrics. Built on Amazon Bedrock and AWS infrastructure, the system evolved from basic AI assistants to fully autonomous agents that can take tickets from backlogs, write code, and ship features to production. The results are significant: nine in ten engineers use AI coding tools monthly (up from roughly half a year earlier), per-engineer PR throughput increased by over 50%, and their most advanced agent (Morphex) achieves a 95% autonomous merge rate with revert rates in the low single digits."
link: "https://aws.amazon.com/blogs/machine-learning/ai-teammates-how-monday-com-runs-production-ai-agents-on-amazon-bedrock/"
year: 2026
seo:
  title: "Monday: Production AI Agents at Scale: Engineering Agentic AI for Software Development - ZenML LLMOps Database"
  description: "Monday.com built and deployed production AI agents (\"AI Teammates\") that function as autonomous software engineers within their existing engineering organization. Facing the challenge of scaling software development in a decade-old codebase serving millions of users, they created an agent system called Sphera that treats AI agents as teammates with identities, managers, and performance metrics. Built on Amazon Bedrock and AWS infrastructure, the system evolved from basic AI assistants to fully autonomous agents that can take tickets from backlogs, write code, and ship features to production. The results are significant: nine in ten engineers use AI coding tools monthly (up from roughly half a year earlier), per-engineer PR throughput increased by over 50%, and their most advanced agent (Morphex) achieves a 95% autonomous merge rate with revert rates in the low single digits."
  canonical: "https://www.zenml.io/llmops-database/production-ai-agents-at-scale-engineering-agentic-ai-for-software-development"
  ogTitle: "Monday: Production AI Agents at Scale: Engineering Agentic AI for Software Development - ZenML LLMOps Database"
  ogDescription: "Monday.com built and deployed production AI agents (\"AI Teammates\") that function as autonomous software engineers within their existing engineering organization. Facing the challenge of scaling software development in a decade-old codebase serving millions of users, they created an agent system called Sphera that treats AI agents as teammates with identities, managers, and performance metrics. Built on Amazon Bedrock and AWS infrastructure, the system evolved from basic AI assistants to fully autonomous agents that can take tickets from backlogs, write code, and ship features to production. The results are significant: nine in ten engineers use AI coding tools monthly (up from roughly half a year earlier), per-engineer PR throughput increased by over 50%, and their most advanced agent (Morphex) achieves a 95% autonomous merge rate with revert rates in the low single digits."
notion:
  pageId: "3a6f8dff-2538-808f-a9c3-feb5a6ccc4ef"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-23T08:33:00.000Z"
  lastEditedTime: "2026-07-23T08:33:00.000Z"
  publishedAt: "2026-07-23T08:58:24Z"
---

## Overview and Context

Monday.com has implemented one of the most comprehensive production deployments of agentic AI for software development, with their internal system called Sphera supporting hundreds of engineers working on a decade-old codebase that serves millions of paying users. This case study is particularly notable because it documents the operational realities of running AI agents at scale in a production enterprise SaaS environment, rather than a greenfield demonstration. The company treats AI agents as actual teammates with identities, performance metrics, and accountability structures that integrate seamlessly with their existing engineering workflows.

The system architecture is built primarily on AWS services, with Amazon Bedrock serving as the model fabric and various AWS infrastructure services handling compute, storage, state management, and event routing. What makes this implementation distinctive is the comprehensive operational maturity: the agents aren't experimental tools but production teammates that contribute meaningfully to engineering throughput while operating under the same constraints, review processes, and deployment pipelines as human engineers.

## Three-Level Maturity Framework

Monday.com frames their AI engineering journey across three maturity levels. Level 1 represents the assistant phase where engineers use AI as pair programmers, with tools like Cursor for quick tasks and Claude Code for more substantial work. Adoption at this level has nearly doubled year-over-year. Level 2 introduces skills and sub-agents where teams build reusable agents for repeated work with engineers remaining in control—this is where most of Monday's current operations sit, and where they saw per-developer PR throughput increase by more than half. Level 3 represents fully agentic operation where agents own end-to-end delivery, taking tasks from boards, communicating through Slack and Monday, and shipping code alongside humans with engineers serving as orchestrators rather than operators.

The company's flagship autonomous agent, Atlas, operates at Level 3 as a software engineer who picks up tickets, writes PRs, and ships features without using an IDE. More recently, Morphex represents their first fully autonomous engineering agent achieving 95% automatic merge rates (19 out of 20 PRs merge without human intervention) while maintaining revert rates in the low single digits.

## Core Architecture and Infrastructure

The technical architecture demonstrates a mature approach to running agents at production scale. The system uses seven core AWS services: Amazon SNS for event publishing, Amazon SQS for queuing and back-pressure management, Amazon EKS for compute orchestration, Amazon RDS for structured data, Amazon ElastiCache for hot state, Amazon EFS for session workspaces and memory, and Amazon S3 for durable artifacts. AWS Secrets Manager handles per-session credential management, and Amazon Bedrock provides the model inference layer.

Every external trigger—whether a Slack mention, a Monday item assignment, or a GitHub PR review request—enters through Amazon SNS, which fans out to per-team SQS queues based on topic and routing keys. The Monday Builders CoWORK system, consisting of SQS consumers running on EKS, pulls messages, resolves agent ownership, and routes to the appropriate agent runner pod. This pub-sub plus queue architecture provides critical operational capabilities: automatic retries with dead-letter queues, back-pressure handling when Bedrock throttles, durable replay (they can re-run the previous day of events against patched builds before promoting), and concurrent fan-out for parallel processing.

The compute layer runs on Amazon EKS with one pod per active agent session. Each pod mounts the agent's EFS workspace, providing crash isolation per session. Auto-scaling is driven by KEDA based on average active sessions across pods, measured through Datadog. They run a single worker image with repos cached on EFS and reused across sessions, avoiding the complexity of service meshes or orchestrator-of-orchestrators patterns.

## State and Memory Management

The system employs a sophisticated three-tier state management strategy that recognizes different state types have different access patterns and cost profiles. Live operational state—current tasks, run cursors, distributed locks, heartbeats, and agent-human message logs—lives in Amazon ElastiCache for sub-millisecond reads with self-expiring keys. They chose ElastiCache over DynamoDB for this use case because it's both cheaper and faster for their access patterns.

Session state and agent memory are stored on Amazon EFS in a structured directory hierarchy. Each active session maintains a directory containing checked-out repository workspaces, encrypted per-session secrets, and chronological event logs. Each agent also maintains cross-session memory in a MEMORY.md file and daily diary entries. This filesystem-based approach solves two critical problems: first, the Claude Agent SDK and most plugins expect real POSIX filesystem semantics (for git, npm, file edits, etc.), eliminating a class of environment-dependent bugs; second, when a run resumes on a different EKS pod, that pod mounts the same EFS path and continues seamlessly.

The diary mechanism represents a pragmatic solution to agent memory that outperformed more sophisticated alternatives. Each agent writes daily markdown files documenting work in progress, blockers, and learned lessons. For example, Atlas's diary might note that the accounts-api team requires error codes to be filed in a shared registry before opening a PR—a lesson learned from having a previous PR reverted. This approach proved more effective than context-window stuffing or vector retrieval over past transcripts, representing a case where simple solutions outperformed complex ones at scale.

Durable audit records go to S3, including final transcripts, snapshots, artifacts, and evaluation results, all keyed by session ID. The division is clean: EFS holds working memory that needs POSIX semantics and cross-pod access, while S3 provides the permanent audit trail.

## Amazon Bedrock as Model Fabric

The case study emphasizes that Amazon Bedrock provides more than just model access—it's operational infrastructure for running agents at scale. Application Inference Profiles route every model call, centralizing cost tracking and capacity planning. This provides a single audit trail for every model call, critical when security or regulators need to understand what agents sent where during a specific time window. Cross-region failover automatically handles throttling in any single AWS region without agent code needing to notice or react. AWS PrivateLink endpoints keep all model traffic inside their VPC, addressing network security and compliance requirements.

## monday-agent-sdk: Wrapper Philosophy

The monday-agent-sdk is deliberately a thin wrapper around the Claude Agent SDK, serving three specific purposes rather than replacing the runtime entirely. First, it provides provider neutrality at the call site, routing agent LLM calls through Amazon Bedrock model endpoints. Second, it addresses cold-start costs by shipping agent runners with warmed node_modules and plugin caches, getting the first model call out in typically under one second. Third, and most importantly, it allows Monday to own the harness while treating the runtime as a commodity.

This architectural decision reflects a clear philosophy: the runtime is becoming commoditized and maintaining a custom runtime would be wasted effort, but the harness—how agents are evaluated, how plugins compose, how they integrate with Slack/Monday/GitHub, how outputs are reviewed against Monday's standards—represents the proprietary value. If the Claude Agent SDK improves at the runtime layer, Monday can simply delete their version while keeping all the harness logic that embeds their operational knowledge.

## Five Critical Retrofits

The case study candidly describes five retrofits that transformed the system from interesting to production-ready, none exotic but all unobvious until encountered:

**Evaluation Infrastructure**: Early on, "looks fine" served as the PR quality bar, which broke once volume increased. They added two evaluation layers: deterministic metrics (PRs merged, revert rate, zero-touch merge rate) per agent, and LLM-scored evaluations across five dimensions per PR (Intent & Decision, Execution & Artifact, Completeness & Usefulness, Instruction & Boundary, Efficiency). The critical insight: across successive versions of Atlas, they changed no models, no prompts, and no human interventions—only the evals—and scores improved across every dimension. This demonstrates that evaluation infrastructure can drive agent improvement more effectively than prompt engineering or model selection.

**File-Based Memory**: Initial attempts at agent memory used context-window stuffing and vector retrieval over past transcripts, both of which worked poorly. The solution that worked was simple: a per-agent MEMORY.md file and daily diary entries in plain markdown, with no embeddings, no recall scoring, and none of the ceremony of agentic RAG. The agent reads relevant files at session start and writes them at session end. This represents a significant finding—sophisticated vector-based memory systems were outperformed by structured files, suggesting that for agent memory, explicit structure and human readability may matter more than semantic similarity search.

**Remote Sandbox Environment**: Atlas's first PRs consistently passed local tests but failed in CI because Monday's production codebase has dependencies that only exist in real environments: feature flags, third-party services, actual traffic patterns. They gave each agent session a remote sandbox environment where every PR auto-deploys before requesting human review. Tests, checks, and replayed production traffic run in the sandbox, creating a fix-deploy-test cycle with no human in the loop. This moves failure discovery earlier in the process where it's cheaper to address.

**PR Guardrails**: As Atlas shipped more code, human review became the bottleneck. Monday automated their engineering standards into a system called Guardrails that reviews every PR (both agent and human-authored) against metrics tagging, feature-flag hygiene, Datadog usage, security boundaries, database and microservice conventions, test quality, and documentation requirements. A subset of checks are blocking. The system runs at substantial scale—tens of thousands of PRs evaluated per month, hundreds of thousands of standard checks executed. Approximately 20% of PRs fail at least one standard and get bounced back, while human override rates remain in the low single digits. Critically, Guardrails is wired to internal knowledge through Monday's MCP (Model Context Protocol) servers, so the automated reviewer has access to the same context that standard-owner teams would reference.

**CoWORK Workspace**: The most expensive failure mode involved agents working in silos, opening PRs that no team owned. They addressed this by creating the CoWORK workspace, which surfaces agent work on the same Monday boards that teams already use. An agent's tasks, status, blockers, and handoffs live alongside human work items, transforming accountability from a system problem to a solved organizational problem—Monday's existing team coordination mechanisms simply extend to cover agents as well.

## Identity and Integration Model

A distinctive aspect of the architecture is treating agents as first-class organizational entities. Each agent has a profile page showing role, manager, scope, and performance score, living on a Teams page alongside human engineers. Atlas, for example, has the role "Software Engineer" with the job of picking up tickets, writing PRs, and shipping features—same backlog as human teammates. This isn't cosmetic: it's the schema. Every agent has a stable identity that flows through Slack, GitHub, and Monday, so humans can tag, assign, code-review, or deactivate them using existing workflows.

The three-inbox model reinforces this integration: Slack @mentions, Monday item assignments, and GitHub PR review requests all hit the same agent session with the same memory and workspace. The system doesn't run three separate agent systems for three communication channels—it runs one agent that is reachable through three familiar interfaces.

## Path to Autonomous Merging

By late Q1 2026, code generation was no longer the bottleneck—human review was. Guardrails caught what humans used to catch, but every PR still waited for human approval. Morphex emerged as Monday's first fully autonomous engineering agent operating within the same repo, CI pipeline, Guardrails, and revert protocols as human builders. Nineteen out of twenty Morphex PRs merge automatically, not by skipping review but by passing every gate. Approved PRs ship to production with no human in the loop.

The company is transparent about the broader population statistics: across their top PR-generating agents, approximately 30% of PRs merge, about 75% of those with zero human edits, and revert rates remain in the low single digits. Notably, about 25% of agent PRs are caught and declined by Guardrails before reaching a human, which means the population that humans see is already pre-filtered for quality.

The confidence-based automatic merging system combines four signals available at PR creation time: deterministic Guardrails outcome (all blocking standards must pass), per-agent evaluation trajectory (recent eval scores for this specific agent version), per-(agent × repo × change-class) historical revert rate (recognizing that dependency bumps in low-risk services have different risk profiles than monolith migrations), and sandbox outcome (green sandbox status is necessary but not sufficient). PRs scoring above threshold merge automatically; those below route to humans with specific failing signals highlighted. This represents the Level 2 to Level 3 transition—not removing humans but removing them from cases where the system's signal is strong enough that human review doesn't improve outcomes.

## Operational Metrics and Transparency

The case study is refreshingly data-driven and transparent about limitations. They report that nine in ten builders use AI coding tools monthly (up from roughly half a year earlier), per-engineer PR throughput increased by more than half, and Morphex opens more PRs per month than most human engineers. They're explicit about driving one metric over the coming quarters: the fraction of merged agent PRs that ship without human review, while holding revert rate flat or improving.

They're also candid about mistakes. Evaluations should have been in the system from day one rather than month nine—the score lift Atlas achieved from evals was the headline result. They over-invested in vector stores before realizing a simple MEMORY.md file on EFS was the right answer. The first CoWORK implementation lived in a separate workspace forcing context-switching, when it should have been on Monday boards from the start.

## The Monday-Specific Value Proposition

The authors argue that the runtime (the Claude Agent SDK wrapper) isn't where value lives—it's in the Monday-specific wiring around it. Monday boards serve as the shared state layer where agent tasks, status, and handoffs live where the business already looks. Monday's MCP servers provide the substrate that Guardrails and standards plug into. Monday's auth and identity systems mean every agent operates under the same RBAC as humans. Monday's deploy pipeline means agent code ships through the same CI/CD as every other builder. This integration means agents sharing state, identity, and infrastructure with humans don't require a separate governance layer—the existing one already applies, making the system auditable, reversible, and trustworthy by default.

For this reason, they're explicitly not open-sourcing the monday-agent-sdk. The wrapper is small, and most value comes from the harness, which is Monday-specific in ways that wouldn't transfer to other organizations. What they are sharing is the architecture and operational playbook, with the perspective that the industry moves faster when teams running production agents at scale are honest about what works.

## Critical Assessment

This case study represents one of the most operationally mature deployments of agentic AI in software engineering documented to date. The architectural choices demonstrate production-grade thinking: the pub-sub queue pattern for back-pressure and replay, the three-tier state management matching access patterns to storage characteristics, the deliberate decision to wrap rather than replace commodity runtimes, and the integration of agent work into existing organizational systems rather than creating parallel structures.

However, readers should note several caveats. First, this is published on an AWS blog and heavily features AWS services, so there's clear commercial motivation to present AWS tooling favorably. The architecture would certainly be implementable with GCP or Azure equivalents, though the specific choices (ElastiCache over DynamoDB, EFS for POSIX semantics) suggest genuine engineering trade-offs rather than pure vendor preference. Second, the results are impressive but reported somewhat selectively—we get "low single digit" revert rates and "more than half" throughput increases, but not the precise numbers or confidence intervals. Third, the case study comes from a company with substantial engineering resources and a decade of organizational infrastructure to build on; smaller organizations might find the operational overhead prohibitive.

The finding that simple file-based memory outperformed vector retrieval is particularly notable and somewhat counterintuitive given industry trends toward sophisticated RAG systems. This may reflect that agent memory has different requirements than user-facing retrieval—agents benefit from explicit structure and chronological organization more than semantic similarity. The success of Guardrails in automating standards enforcement (catching 20% of PRs with low single-digit override rates) suggests that codifying organizational knowledge into automated reviewers is both feasible and valuable at scale, though the initial effort to build those standards is substantial.

The confidence-scored automatic merging represents a genuine advance in autonomous agent operation, though the 95% automatic merge rate for Morphex should be contextualized: this is for a single agent working in well-defined problem spaces, and the broader agent population shows lower merge rates. The combination of deterministic checks, historical data, and sandbox validation to build a confidence score is a practical approach to the fundamental challenge of knowing when to trust agent output.

Overall, this case study provides valuable operational details about running AI agents at production scale, with sufficient architectural specificity and candid discussion of failures to be genuinely useful to other organizations. The emphasis on integration over isolation—agents as teammates rather than separate systems—represents a philosophically coherent approach to organizational AI adoption, though it requires substantial infrastructure investment to implement effectively.
