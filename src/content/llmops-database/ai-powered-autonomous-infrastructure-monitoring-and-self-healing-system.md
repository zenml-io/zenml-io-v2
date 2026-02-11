---
title: "AI-Powered Autonomous Infrastructure Monitoring and Self-Healing System"
slug: "ai-powered-autonomous-infrastructure-monitoring-and-self-healing-system"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6925ab7758be4bb808016fab"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:28:53.595Z"
  createdOn: "2025-11-25T13:13:27.322Z"
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "prompt-engineering"
  - "agent-based"
  - "error-handling"
  - "latency-optimization"
  - "multi-agent-systems"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "cicd"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "documentation"
  - "devops"
  - "microservices"
  - "api-gateway"
  - "postgresql"
  - "fastapi"
  - "databases"
industryTags: "tech"
company: "Railway"
summary: "This case study presents a proof-of-concept system for autonomous infrastructure monitoring and self-healing using AI coding agents. The presenter demonstrates a workflow that automatically detects issues in deployed services on Railway (memory leaks, slow database queries, high error rates), analyzes metrics and logs using LLMs to generate diagnostic plans, and then deploys OpenCode—an open-source AI coding agent—to automatically create pull requests with fixes. The system leverages durable workflows via Inngest for reliability, combines multiple data sources (CPU/memory metrics, HTTP metrics, logs), and uses LLMs to analyze infrastructure health and generate remediation plans. While presented as a demo/concept, the approach showcases how LLMs can move from alerting engineers to autonomously proposing code-level fixes for production issues."
link: "https://www.youtube.com/watch?v=Q5IVm_CxN2w"
year: 2025
seo:
  title: "Railway: AI-Powered Autonomous Infrastructure Monitoring and Self-Healing System - ZenML LLMOps Database"
  description: "This case study presents a proof-of-concept system for autonomous infrastructure monitoring and self-healing using AI coding agents. The presenter demonstrates a workflow that automatically detects issues in deployed services on Railway (memory leaks, slow database queries, high error rates), analyzes metrics and logs using LLMs to generate diagnostic plans, and then deploys OpenCode—an open-source AI coding agent—to automatically create pull requests with fixes. The system leverages durable workflows via Inngest for reliability, combines multiple data sources (CPU/memory metrics, HTTP metrics, logs), and uses LLMs to analyze infrastructure health and generate remediation plans. While presented as a demo/concept, the approach showcases how LLMs can move from alerting engineers to autonomously proposing code-level fixes for production issues."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-autonomous-infrastructure-monitoring-and-self-healing-system"
  ogTitle: "Railway: AI-Powered Autonomous Infrastructure Monitoring and Self-Healing System - ZenML LLMOps Database"
  ogDescription: "This case study presents a proof-of-concept system for autonomous infrastructure monitoring and self-healing using AI coding agents. The presenter demonstrates a workflow that automatically detects issues in deployed services on Railway (memory leaks, slow database queries, high error rates), analyzes metrics and logs using LLMs to generate diagnostic plans, and then deploys OpenCode—an open-source AI coding agent—to automatically create pull requests with fixes. The system leverages durable workflows via Inngest for reliability, combines multiple data sources (CPU/memory metrics, HTTP metrics, logs), and uses LLMs to analyze infrastructure health and generate remediation plans. While presented as a demo/concept, the approach showcases how LLMs can move from alerting engineers to autonomously proposing code-level fixes for production issues."
---

## Overview

This case study documents a demonstration of an autonomous infrastructure monitoring and self-healing system built on Railway's deployment platform. The presenter showcases a proof-of-concept that moves beyond traditional alerting systems to automatically detect, diagnose, and remediate production issues using AI coding agents. While this is clearly a demo and proof-of-concept rather than a mature production system, it illustrates several interesting LLMOps patterns around autonomous agents, workflow orchestration, and the integration of observability data with LLMs for operational decision-making.

The core premise challenges the traditional incident response workflow: instead of alerting engineers who then manually investigate logs, metrics, and traces to diagnose and fix issues, the system proposes having an AI coding agent continuously monitor infrastructure and automatically generate pull requests with fixes when problems are detected. The presenter demonstrates this working end-to-end, from detecting a memory leak and slow database queries to generating a pull request with proposed remediation code.

## Problem Context and Motivation

The demonstration begins by showing several deliberately broken services deployed on Railway, each exhibiting different types of production issues. One service has a clear memory leak with continuously growing memory utilization that would eventually crash the service, accompanied by a 94% request error rate and extremely high response times measured in multiple seconds. Another service queries a PostgreSQL database with extremely slow queries, resulting in 30-second page load times—a catastrophic user experience even though traditional metrics like CPU and memory utilization appear relatively normal.

The presenter argues that the traditional approach to production issues—setting up threshold-based alerts for CPU, memory, request error rates, and other metrics—only solves part of the problem. When thresholds are exceeded, engineers receive alerts indicating something is wrong, but they must still conduct the investigation themselves, piecing together information from logs, metrics, and distributed traces to understand root causes and develop fixes. This manual investigation process is time-consuming, requires significant expertise, and delays resolution.

The proposed alternative is to deploy a coding agent that continuously monitors the application's infrastructure state and, when issues are detected based on defined thresholds, automatically ships a fix rather than just alerting. The engineer's role shifts from investigation and remediation to reviewing an automatically generated pull request—assessing whether the proposed changes look reasonable and then merging to resolve the crisis.

## System Architecture and Workflow Design

The system architecture consists of a series of workflows that progress from issue detection through context gathering, analysis, and finally to automated code remediation. The presenter emphasizes choosing a scheduled approach over an alert-based webhook system, arguing that analyzing a time slice provides better signal than reacting to individual threshold breaches, which can be noisy especially with spiky workloads. A CPU utilization spike to 80% might warrant investigation but not necessarily indicate a real problem when viewed in the broader context of all available data.

The first workflow runs on a configurable schedule (every 10, 15, or 30 minutes) and performs several key tasks. It fetches the application's architecture from Railway to understand which services are deployed—frontends, backends, cron jobs, queues, and other components. For each service, it retrieves resource metrics including CPU and memory utilization as well as HTTP metrics covering request error rates, counts of 4xx and 5xx errors, and response latencies. The workflow then evaluates which services have exceeded defined thresholds and returns a list of affected services for further investigation.

When affected services are identified, a second workflow pulls in substantially more context specifically for those services. The rationale here is that the first workflow provides a high-level health check across all services, identifying potential problem areas, while the second workflow performs deep investigation only where needed. This approach acknowledges that high resource utilization might simply indicate success and high usage rather than problems—the logs might show everything functioning normally. The presenter suggests the system could be extended to scan code repositories to infer upstream service dependencies and automatically check status pages of third-party providers like payment processors, allowing the agent to potentially determine that issues should simply be waited out rather than requiring code changes.

Once comprehensive context is gathered, the system writes a detailed diagnostic plan. This plan synthesizes information from multiple signals—high numbers of 5xx errors, elevated memory resource utilization, and specific endpoint failures—into a coherent narrative about the application's architecture, affected services, and suspected root causes. This plan is then provided to a coding agent that follows it to clone the repository, create a to-do list based on the plan, implement fixes, and create a pull request. This completes the journey from issue detection to proposed remediation.

## Technical Implementation: Durable Workflows with Inngest

A critical technical foundation for this system is the use of durable execution workflows via Inngest (though the presenter notes many similar solutions exist). Durable workflows provide an abstraction that simplifies complex logic while making it more reliable, which is essential when orchestrating multiple API calls to external services that may fail.

The presenter provides a clear example of why durable execution matters: a workflow that processes video uploads by first generating a transcript via a third-party API, then generating a summary using an LLM provider, and finally storing both in a database. Each step is prone to failure, but with durable execution, failed steps automatically retry without requiring explicit retry logic. Developers can customize retry behavior—implementing exponential backoff, defining alternative failure handling—but the key benefit is that when steps succeed, their results are cached. If transcript generation and summarization succeed but database storage fails, subsequent retries continue from the failed step rather than repeating successful work. This makes the system both faster and more cost-effective, particularly important when working with paid LLM APIs.

In the demonstrated implementation, the API makes extensive calls to Railway's API to fetch project architecture, resource metrics, HTTP metrics, and logs for multiple services. These calls happen in parallel where possible for efficiency, but the durable execution pattern ensures that transient failures don't derail the entire workflow. The presenter's UI shows workflows with multiple steps executing in parallel—fetching database resources while simultaneously pulling HTTP metrics for various services—with each step's output available for inspection and debugging.

## LLM Integration for Analysis and Planning

The system uses LLMs at a critical juncture: after gathering extensive observability data but before generating fixes. The "analyze with AI" step receives the full context—project architecture, performance metrics for all services, HTTP request data, error rates, latencies, logs from multiple sources—formatted as input to an LLM. The presenter describes providing the LLM with markdown-formatted summaries like "CPU usage average 0.93 vCPU" and "memory usage 31.96 GB out of 32 GB maximum," making it easy for the model to identify resource exhaustion.

The LLM's output is a diagnostic plan that includes debugging steps, reproduction guidance, and remediation recommendations. In the demonstration, the generated plan includes steps like "reproduce locally with the same load" and instructions for what to do when the agent encounters errors during execution. This plan serves as instructions for the coding agent, providing both high-level strategy and tactical guidance.

It's worth noting that while the demonstration shows this working, the presenter doesn't discuss important LLMOps considerations like prompt engineering strategies, how prompts are versioned and tested, what happens when LLM analysis is incorrect, or how the system handles ambiguous situations. The architecture summary and metrics formatting appear to be template-based, which is a reasonable approach, but there's no discussion of how prompts might need to evolve as new issue types are encountered or how the system learns from past successes and failures.

## Coding Agent Implementation with OpenCode

For the actual code generation and pull request creation, the system uses OpenCode, an open-source AI coding agent described as a terminal-based alternative to products like Claude Code (Anthropic's coding assistant). The key differentiator highlighted is OpenCode's open-source nature and flexibility to use any LLM provider or model, avoiding vendor lock-in.

What makes OpenCode particularly suitable for this use case is its architecture. When running the `opencode` command in a terminal, it starts both a terminal UI and a server, with the UI acting as a client to the server. This separation allows developers to deploy the OpenCode server in a headless mode on Railway and interact with it programmatically via API rather than through the terminal UI. The server can be provisioned with all necessary tools—git, GitHub CLI, language-specific tooling—and configured appropriately, making it a fully functional development environment accessible via API.

The demonstration shows a Docker container setup for OpenCode that installs essential tools including curl, jq, bash, and git, along with the GitHub CLI for creating pull requests. The container configures git with user information and authenticates the GitHub CLI, creating a complete environment where the agent can clone repositories, make code changes, commit them, and open pull requests—all the operations a human developer would perform.

The OpenCode server exposes its functionality on port 4096, and the main API makes calls to it as part of the "generate fix" workflow. Each repository gets its own session (analogous to a separate chat), allowing the system to work on multiple issues across different codebases simultaneously without context confusion. When the workflow completes successfully, a pull request appears in the GitHub repository with a summary of changes, analysis of root causes, and descriptions of what was fixed.

## Demonstration and Workflow Execution

The presenter provides a detailed walkthrough of the system executing in real-time, using Inngest's debugging UI to show each workflow step. The "monitor project health" workflow executes first, with its output showing the complete project architecture—databases, services with their configurations and repository links, and storage volumes. Subsequent steps run in parallel to efficiently gather metrics, with each step's output viewable for debugging. The database resource check shows average and maximum CPU utilization, formatted into a summary that will be passed to the LLM.

For services with HTTP endpoints, the workflow pulls error rate percentages for 4xx and 5xx responses, latency percentiles, and status code counts, all formatted into human-readable summaries. The "pull service context" workflow then fetches HTTP logs, build logs, and deployment logs for affected services, combining everything into a comprehensive architecture summary describing the production environment, service count, database configuration, and volumes.

This comprehensive context becomes the input to the "generate fix" workflow, where the LLM analyzes all data and produces a diagnostic plan. The presenter notes the input is "too large to render" in the UI, suggesting the system handles substantial amounts of observability data. The plan includes debugging steps and recommendations that guide the OpenCode agent through reproduction, diagnosis, and remediation.

Finally, the workflow creates a session in OpenCode and executes the plan. When successful, a pull request appears with detailed information: a summary of all changes, analysis of what was discovered, identification of root causes, and explanations of fixes applied. The engineer's role is reduced to code review—assessing whether the proposed changes are appropriate and safe to merge.

## Critical Assessment and LLMOps Considerations

While this demonstration is impressive as a proof-of-concept, there are several important considerations for anyone thinking about deploying such a system in production:

**Reliability and Safety**: The most significant concern is whether automatically generated code fixes can be safely merged into production systems. The demonstration assumes the generated pull request will contain appropriate fixes, but in reality, LLM-generated code can be incorrect, incomplete, or introduce new problems. The system would need robust testing, potentially including automated test execution against the proposed changes, staging environment deployment, and canary rollouts. The presenter doesn't address what happens when the coding agent generates an incorrect fix or how failures are handled.

**Observability and Debugging**: While Inngest's UI provides excellent visibility into workflow execution, the system would need comprehensive logging and monitoring for the LLM analysis and code generation steps. Understanding why the LLM made particular diagnostic decisions, tracking prompt evolution, monitoring for degraded LLM performance, and maintaining an audit trail of automated changes would all be critical for production operation.

**Cost and Efficiency**: The system makes multiple LLM API calls—at minimum one for analysis and planning, plus whatever the OpenCode agent requires for code generation. With scheduled execution every 10-30 minutes, costs could accumulate quickly, especially for large infrastructures with many services. The demonstration doesn't discuss cost optimization strategies like caching analysis for similar issues, using smaller models for initial triage, or implementing circuit breakers to prevent runaway costs.

**False Positives and Alert Fatigue**: While the presenter argues that analyzing time slices reduces noise compared to individual threshold alerts, the system could still generate unnecessary pull requests for transient issues that resolve themselves. If engineers must review numerous spurious PRs, the system shifts alert fatigue from Slack notifications to GitHub pull requests without fundamentally solving the problem.

**Integration Complexity**: The demonstration works with Railway's specific APIs and assumes services expose metrics in particular formats. Generalizing this approach to work with different cloud providers, orchestration platforms, or custom infrastructure would require substantial integration work. The presenter suggests checking status pages of upstream dependencies, but implementing this reliably across diverse service providers would be challenging.

**Scope Limitations**: The types of issues demonstrated—memory leaks, slow database queries—are relatively straightforward compared to many production problems. Distributed system issues involving race conditions, subtle data corruption, complex multi-service interactions, or problems requiring changes to infrastructure configuration rather than application code might be beyond the system's capabilities.

**Learning and Improvement**: There's no discussion of how the system learns from successes and failures. Does it track which types of fixes work well? Does it update prompts based on past mistakes? A production system would likely need mechanisms for continuous improvement, potentially including human feedback loops where engineers can annotate pull requests with information about whether the diagnosis was correct and whether the fix was appropriate.

## Strengths and Innovations

Despite these concerns, the demonstration showcases several genuinely innovative approaches:

The **multi-stage workflow design** that separates high-level health monitoring from deep investigation is architecturally sound, avoiding the cost and complexity of deep analysis for every service on every check. The **integration of durable execution patterns** for reliability is exactly the right choice when orchestrating complex sequences of API calls that might fail. The **use of OpenCode's server architecture** to enable programmatic interaction with a coding agent is clever and demonstrates good understanding of how to compose tools in novel ways.

The **comprehensive context gathering** before LLM analysis—pulling together resource metrics, HTTP metrics, logs from multiple sources, and architectural information—recognizes that effective diagnosis requires synthesizing diverse signals rather than reacting to single metrics. The **formatted summaries** provided to the LLM appear thoughtfully designed to be easily parseable while remaining human-readable.

Perhaps most importantly, the demonstration **challenges the assumption** that incident response must be primarily manual. While fully autonomous remediation may not be appropriate for all situations, the concept of shifting engineer effort from investigation to review of proposed fixes could genuinely reduce time-to-resolution for certain classes of problems.

## Future Directions and Potential

The presenter suggests several potential enhancements, including checking status pages of upstream dependencies and inferring those dependencies from code scanning. Other valuable additions might include:

- Integration with testing frameworks to automatically validate proposed fixes before creating pull requests
- A feedback mechanism where engineers can rate the quality of diagnoses and fixes, feeding this data back to improve prompt engineering
- Support for fixes that require infrastructure changes or configuration updates rather than just code changes
- Multi-modal analysis incorporating distributed traces, service dependency graphs, and user-reported issues
- A confidence scoring system where the LLM indicates certainty about its diagnosis, potentially escalating low-confidence issues to humans immediately
- Integration with incident management systems to track which issues were autonomously resolved versus requiring human intervention

The system could also be extended to learn patterns of issues over time, potentially predicting problems before they impact users based on early warning signals in metrics trends.

## Conclusion

This case study presents an ambitious vision for autonomous infrastructure management backed by a working demonstration. While clearly a proof-of-concept rather than a production-ready system, it showcases how LLMs can be integrated into operational workflows to move beyond alerting toward automated remediation. The technical implementation demonstrates sound architectural choices—durable workflows for reliability, comprehensive context gathering before LLM analysis, programmatic interaction with coding agents—even as it raises important questions about safety, reliability, and practical deployment challenges.

For organizations considering similar approaches, this demonstration suggests that autonomous remediation may be most appropriate for well-understood, contained issues in non-critical systems where the cost of an incorrect fix is acceptable. Starting with automated diagnostic report generation—providing engineers with LLM-analyzed summaries without automatically creating code changes—might be a safer intermediate step. The emphasis should be on augmenting rather than replacing human expertise, with the system handling routine diagnostics while escalating complex or ambiguous situations to engineers who can leverage the automatically gathered context to accelerate their investigation.