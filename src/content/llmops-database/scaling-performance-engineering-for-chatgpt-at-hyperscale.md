---
title: "Scaling Performance Engineering for ChatGPT at Hyperscale"
slug: "scaling-performance-engineering-for-chatgpt-at-hyperscale"
draft: false
llmopsTags:
  - "chatbot"
  - "code-generation"
  - "code-interpretation"
  - "agent-based"
  - "latency-optimization"
  - "cost-optimization"
  - "human-in-the-loop"
  - "evals"
  - "monitoring"
  - "cicd"
  - "continuous-deployment"
  - "continuous-integration"
  - "devops"
  - "databases"
  - "cache"
  - "scalability"
  - "reliability"
  - "openai"
industryTags: "tech"
company: "OpenAI"
summary: "OpenAI faced unprecedented challenges in maintaining performance and efficiency as ChatGPT grew from a research preview to 900 million weekly active users while simultaneously experiencing a 70% increase in code shipping velocity due to agentic development tools like Codex. The presentation describes how the performance engineering team evolved their practices to handle both rapid user growth and accelerated development cycles, focusing on end-to-end latency optimization beyond just inference, implementing automated performance monitoring and optimization loops using AI agents, and maintaining balance between shipping velocity and system performance through comprehensive observability, benchmarking, and agent-driven performance optimization workflows."
link: "https://www.infoq.com/presentations/openai-performance-engineering-agentic-coding/"
year: 2025
seo:
  title: "OpenAI: Scaling Performance Engineering for ChatGPT at Hyperscale - ZenML LLMOps Database"
  description: "OpenAI faced unprecedented challenges in maintaining performance and efficiency as ChatGPT grew from a research preview to 900 million weekly active users while simultaneously experiencing a 70% increase in code shipping velocity due to agentic development tools like Codex. The presentation describes how the performance engineering team evolved their practices to handle both rapid user growth and accelerated development cycles, focusing on end-to-end latency optimization beyond just inference, implementing automated performance monitoring and optimization loops using AI agents, and maintaining balance between shipping velocity and system performance through comprehensive observability, benchmarking, and agent-driven performance optimization workflows."
  canonical: "https://www.zenml.io/llmops-database/scaling-performance-engineering-for-chatgpt-at-hyperscale"
  ogTitle: "OpenAI: Scaling Performance Engineering for ChatGPT at Hyperscale - ZenML LLMOps Database"
  ogDescription: "OpenAI faced unprecedented challenges in maintaining performance and efficiency as ChatGPT grew from a research preview to 900 million weekly active users while simultaneously experiencing a 70% increase in code shipping velocity due to agentic development tools like Codex. The presentation describes how the performance engineering team evolved their practices to handle both rapid user growth and accelerated development cycles, focusing on end-to-end latency optimization beyond just inference, implementing automated performance monitoring and optimization loops using AI agents, and maintaining balance between shipping velocity and system performance through comprehensive observability, benchmarking, and agent-driven performance optimization workflows."
notion:
  pageId: "3bcf8dff-2538-8076-94db-ded6582ccf90"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-14T06:37:00.000Z"
  lastEditedTime: "2026-08-14T06:38:00.000Z"
  publishedAt: "2026-08-14T06:55:41Z"
---

## Overview

This case study presents insights from Martin Spier, who leads the ChatGPT performance team at OpenAI, focusing on how the company manages performance engineering at unprecedented scale. The presentation, delivered in 2025-2026, addresses two simultaneous accelerations: explosive user growth (reaching 900 million weekly active users, approximately 11% of the global human population) and dramatically increased code shipping velocity driven by agentic development tools. The core challenge is maintaining system performance and efficiency when both user load and development velocity are accelerating exponentially, creating compounding pressures on infrastructure, latency, and resource utilization.

The case study is particularly valuable because it moves beyond the typical narrow focus on inference optimization to examine the entire request lifecycle in production AI applications. Spier emphasizes that while GPUs and inference are critical, the majority of performance challenges often exist in data fetching, serialization, tokenization, context assembly, and other CPU-bound operations that surround the inference engine. This holistic perspective on LLMOps performance is essential for organizations operating large-scale AI systems.

## Growth Dynamics and Infrastructure Challenges

ChatGPT was launched in late 2022 not as a production-ready consumer application but as a research preview. The system reached one million users within five days, creating immediate infrastructure challenges as the research preview rapidly transformed into a product with stringent reliability and latency requirements. The growth trajectory was characterized by continuous viral spikes, such as the image generation feature that generated over 700 million images in the first seven days, used by over 130 million users. These unpredictable load spikes made capacity planning extremely challenging.

The application serves a global user base, introducing complexity around geographic distribution of compute resources (particularly GPUs), data center connectivity, data replication strategies, and compliance with regional constraints. The product also evolved rapidly with multiple launches including GPTs, voice capabilities, agents, and image generation, each introducing different workload characteristics and architectural requirements. This combination of explosive growth, geographic distribution, and product diversification created a complex operating environment for the performance engineering team.

## Development Velocity Transformation Through Agentic Coding

A significant portion of the presentation focuses on how agentic development tools, particularly Codex (OpenAI's internal coding agent), fundamentally changed development workflows starting in late 2025. The company experienced a 70% increase in pull requests (PRs) shipped per engineer per week compared to October 2025 benchmarks. This vastly exceeded industry benchmarks from DX showing that high-performing small tech companies typically ship around five PRs per engineer per week at the 90th percentile.

The velocity increase stemmed not just from faster individual task completion but from developers working in a multi-threaded fashion on seven to ten different tasks simultaneously. As agents became more capable of handling complex, longer-running tasks, developers would initiate multiple parallel workstreams and context-switch between them as agents requested input. Nearly every engineer at OpenAI uses Codex on a weekly or daily basis, and every PR receives automated review from Codex.

Critically, Codex evolved beyond pure coding tasks to become a comprehensive workbench for the entire development workflow. Engineers use it for production troubleshooting, metric analysis through observability tools, data science and analysis, and productivity tasks like summarizing Slack threads. Managers use it for preparing one-on-ones, writing documents, and creating presentations. This broad adoption across the development lifecycle contributes to the overall acceleration in change velocity.

## The Compounding Performance Debt Problem

Spier introduces a nuanced perspective on how increased development velocity affects performance. Every new feature, every additional line of code, every new conditional statement consumes from a "shared budget" of latency and hardware resources. While individual changes may have negligible impact when measured in isolation, they compound over time. The increased rate of change simply accelerates this compounding effect, shortening the time window before performance becomes a user-facing problem.

This performance degradation manifests in several ways: application slowness leading to user churn and subscription cancellations, increased infrastructure costs for the same workload, and reduced scalability headroom that eventually becomes a reliability problem during traffic spikes. The damage from small changes often appears later rather than immediately, making it difficult to attribute to specific changes and requiring proactive monitoring and optimization strategies.

An important observation is that with agentic development, the assumption that a human fully understands all changes being deployed is "not entirely true anymore." Developers work at a higher abstraction layer and delegate more details to agents, meaning they may not know the specifics of everything being shipped. This increases the importance of automated detection and remediation of performance regressions since human intuition about potential performance impacts is less reliable.

## End-to-End Performance Measurement Beyond Inference

A key insight from the presentation is the criticism of the narrow focus on inference metrics in AI applications. While metrics like time to first token, tokens per second, and throughput are important component-level measurements, they don't capture the complete user experience. Spier advocates for measuring what users actually feel throughout their interaction journey.

The framework presented breaks down user expectations into distinct phases during an action:

- **Immediate feedback**: When a user submits a message, they expect instant acknowledgment (a spinner, "thinking" indicator, etc.) to confirm the system is processing their request
- **First visible value**: When can the user continue their intended activity? For chat, this is when the first tokens appear and the user can start reading the response
- **Continuous value delivery**: The streaming cadence must be fast enough that users can read continuously without interruption or frustration
- **Task completion**: The total time to finish the message or complete the task, with nuance around where exactly to stop the timer

These expectations vary significantly by intent. A simple factual question has different latency expectations than a complex agentic loop involving code edits and multiple source checks, or image generation tasks. Measuring performance requires instrumenting these different user intents as dimensions in the observability system.

For decomposition and diagnosis, Spier's team uses latency breakdown charts (layer cakes) showing distribution on one axis and latency on the other, with different layers representing system components. This visualization makes clear that inference is only one layer among many, and often not the dominant contributor to total latency.

## The Complex Request Path in Production Chat Applications

To illustrate why inference-only optimization is insufficient, Spier walks through the complete request path for a simple chat message. While the user interface appears simple—type a message, press enter, receive a response—the backend complexity is substantial. The message itself is just "one small ingredient of that whole equation."

Before anything reaches the inference engine, the system must:

- Perform client-side assembly and validation
- Verify user identity and client identity
- Check the user's subscription plan and quotas
- Verify user state and entitlements
- Fetch the entire conversation history (which can be very long)
- Retrieve any files uploaded to the conversation (PDFs, images, etc.)
- Fetch project context if the user is working in a project
- Perform encoding and tokenization (which varies by model)
- Check against context window limits
- Potentially perform truncation or compaction if limits are exceeded
- Assemble the final prompt with all context

Conversations can be extremely data-heavy, ranging from megabytes to hundreds of megabytes in size. This data fetching, serialization, and assembly process involves substantial database requests, blob storage I/O, CPU for serialization/deserialization, and RAM to hold data in memory. After inference completes and responses are streamed back, the system must also store the conversation state for future requests.

All of these operations consume traditional compute resources (CPU, memory, I/O, network bandwidth) that are independent of GPU resources. The code changes affecting these components often outnumber changes to inference components, yet they receive less attention in performance optimization efforts. Spier emphasizes that "it doesn't matter that I have an extremely fast model, the fastest model, the fastest inference engine, if the rest of the path is slow."

## Evolving Performance Engineering Workflows

The traditional performance engineering workflow is inherently serial and time-consuming. A performance engineer detects a regression (ideally through continuous profiling comparing before/after states), captures CPU profiles, identifies which code paths regressed, conceives optimizations, implements them, tests the changes, and deploys. When one side of the equation (feature development) accelerates by 70% while the other side (performance optimization) remains unchanged, the system falls out of balance.

Spier's answer is not to hire more performance engineers (who are hard to find) or to slow down feature development (which wastes the advantages of agentic coding). Instead, the performance engineering workflows themselves must evolve and accelerate using the same agentic tools that accelerated development. The team is working toward both faster reactive loops (detecting and fixing regressions) and more parallel active loops (continuously searching for optimization opportunities).

The reactive loop automation involves having agents automatically triggered by detected regressions. The agent fires profiling tools, compares profiles before and after, has access to the codebase to understand what changed, proposes fixes, and ideally can deploy and benchmark the fix to verify effectiveness. OpenAI already has performance skills in Codex that can perform profile comparisons.

For drift detection (small regressions that compound over time), fine-grained metrics are needed: code complexity measures, volume of network requests during benchmarks, memory allocation patterns, etc. Agents can monitor these metrics and act on small deviations before they compound into major problems.

## Active Optimization and Always-On Agent Loops

The active optimization approach is perhaps the most ambitious aspect of the performance engineering evolution. Rather than waiting for regressions to occur, the team envisions having multiple specialized agents continuously searching for optimization opportunities in parallel. Different agents could focus on different optimization domains:

- Analyzing latency critical paths and identifying hot methods
- Profiling CPU utilization and optimizing high-CPU functions  
- Monitoring memory allocation patterns and reducing allocations
- Tracking bundle sizes (particularly for mobile deployments)
- Examining network request patterns and reducing calls
- Analyzing database query efficiency

These agents work autonomously, examining code, traces, logs, metrics, and other observability data. The team has developed a practice of naming agents after team members with specific expertise (creating "Ben agents" and "Brendan agents" based on specific skill sets), and team members report starting to treat these agents as colleagues.

The goal is to have agents complete full loops autonomously: start from an event or run continuously, generate optimization ideas, implement changes, benchmark results, measure improvement, and either commit the change or discard it. This requires substantial engineering maturity in the form of comprehensive testing, reliable benchmarks, good observability coverage, and safe deployment practices.

## Engineering Maturity Requirements for Agent-Driven Performance

The presentation emphasizes that basic engineering practices become even more critical in an agent-driven performance optimization environment. Without these foundations, agents cannot effectively operate:

- **Test coverage**: Agents need comprehensive tests to verify that their changes don't break functionality. Without tests, there's no way to know if an optimization is correct.
- **Benchmarks**: Reliable, reproducible benchmarks are essential for agents to measure whether their optimizations actually improve performance. The benchmarks must accurately represent production workloads, or agents will optimize for the wrong scenarios.
- **Contracts and expectations**: Clear interfaces and contracts between system components help agents understand boundaries and safe changes.
- **Observability**: Comprehensive metrics, traces, and logs give agents visibility into system behavior. Blind spots lead agents in wrong directions since they lack the human intuition to compensate.
- **Safe rollout practices**: Automated canary analysis, blue-green deployments, and gradual rollouts ensure that even if an agent deploys a problematic change, user impact is minimized.

Fast feedback loops are particularly important. If benchmark or deployment cycles take 12 hours, agents provide limited value over human engineers. If feedback comes within minutes, agents can iterate rapidly and explore multiple optimization paths in parallel.

## Pre-Production and Production Performance Gates

The presentation outlines a multi-layered approach to catching performance regressions at different stages:

**Pre-production gates** (before merge or deployment):
- Microbenchmarks running on every PR to catch method-level regressions
- Monitoring of methods on latency-critical paths
- Memory allocation profiling
- Bundle size tracking
- Code complexity metrics

These gates catch obvious regressions and drift before they reach production. However, many performance issues only manifest under specific combinations of production workloads and scale, making production monitoring essential.

**Production monitoring and response**:
- Continuous profiling comparing current state to baseline
- Detection of both large regressions (easy to spot between releases) and small drift (requires fine-grained metrics)
- Automated agent response to detected issues
- Safe experimentation through feature flags and canary deployments

The vision is that agents can operate autonomously in pre-production environments, automatically submitting PRs with optimizations and benchmarking results. For production, organizations may not be ready to fully trust agents to deploy without supervision, but agents can still perform most of the work—collecting data, identifying issues, proposing solutions, implementing fixes, and preparing experiments—leaving only final deployment approval to humans.

## Performance Optimization as a Search Problem

A conceptual insight from the presentation is framing performance optimization as a search problem. Agents can try different alternatives, benchmark them, compare results, and iterate. This is naturally parallel work that agents can perform faster than humans and across multiple tracks simultaneously.

However, agents need clear signals to know whether they're moving in the right direction. This requires:
- **Correct metrics**: Measuring the wrong thing leads to optimizing the wrong thing. Metrics must reflect actual user experience.
- **Reliable workload reproduction**: If production workloads can't be reliably reproduced in test environments, optimizations may not transfer to production.
- **Fast feedback**: Quick iteration cycles enable more exploration.
- **Comprehensive context**: Agents benefit from having access to codebases, observability data, architecture documentation, deployment histories, and written knowledge about how systems work. Unlike humans, agents don't have tribal knowledge, so documentation becomes critical.

## Practical Implementation Status and Trajectory

While the presentation describes an ambitious end-state vision, Spier acknowledges there are "a lot of intermediary steps" to reach full automation. Some capabilities are already working:

- Performance skills in Codex can compare profiles and analyze regressions
- Automated PR reviews by Codex for all code changes
- Agents completing specific optimization tasks with human guidance
- Microbenchmarks and pre-production performance gates

The team is actively working toward more autonomous loops where agents can detect issues, implement fixes, and verify improvements with minimal human intervention. The trajectory is clear: humans set direction and define what constitutes good or bad performance, while agents handle the "boring work" of continuous monitoring, analysis, and optimization.

## Broader Implications for LLMOps

The case study highlights several important themes for organizations operating LLMs in production:

**Holistic performance thinking**: The narrow focus on inference optimization misses the majority of the performance story in production AI applications. Data fetching, context assembly, serialization, and other operations surrounding inference often dominate latency and resource consumption. CPU, memory, and I/O optimization are as important as GPU optimization.

**Balancing velocity and quality**: Agentic coding tools dramatically increase development velocity, but this creates challenges for traditional quality gates including performance engineering. The solution is not to slow development but to accelerate quality practices using the same agentic tools.

**User-centric metrics**: Component metrics (time to first token, tokens per second) are insufficient. Organizations must measure and optimize for complete user journey experiences, understanding that expectations vary by user intent and task complexity.

**Engineering foundations enable automation**: Agent-driven optimization requires mature engineering practices. Comprehensive testing, reliable benchmarks, good observability, and safe deployment practices transition from nice-to-have to essential prerequisites.

**Documentation as first-class context**: In agent-assisted workflows, written architecture documentation, system knowledge, and operational procedures become critical context that agents rely on, rather than residing primarily in engineers' heads as tribal knowledge.

**Scale changes everything**: At ChatGPT's scale (900 million weekly users, global distribution, multiple product surfaces), even small inefficiencies have massive impact. Performance optimization isn't optional; it directly affects user retention, acquisition, and business outcomes.

This case study provides a rare glimpse into how one of the world's most-used AI applications approaches performance engineering at scale, and how the team is actively evolving their practices to keep pace with simultaneous accelerations in growth and development velocity.
