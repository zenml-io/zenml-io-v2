---
title: "Enterprise-Scale AI Agent Deployment Across Engineering Lifecycle"
slug: "enterprise-scale-ai-agent-deployment-across-engineering-lifecycle"
draft: false
llmopsTags:
  - "code-generation"
  - "fraud-detection"
  - "customer-support"
  - "code-interpretation"
  - "high-stakes-application"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "human-in-the-loop"
  - "cost-optimization"
  - "error-handling"
  - "latency-optimization"
  - "memory"
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
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "anthropic"
  - "meta"
  - "google-gcp"
industryTags: "finance"
company: "Ramp"
summary: "Ramp, a fintech company, has systematically deployed AI agents powered by Claude across their entire software development lifecycle, from ideation through production monitoring. Rather than building extensive scaffolding for current model limitations, they deliberately built infrastructure for future model capabilities, treating agents as digital coworkers with expansive access to tools and data. Their approach includes both foreground tools like Claude Code for hands-on development and background agents like Inspect for automated workflows, with agents now generating more sessions than humans. By implementing defense-in-depth security controls, read-only access patterns, comprehensive trace analysis, and decentralized ownership, they've achieved significant productivity gains including reducing CI time from 18 minutes to 6 minutes and automating substantial portions of code review, incident response, and feature deployment."
link: "https://www.youtube.com/watch?v=i4odXOmgMLw"
year: 2026
seo:
  title: "Ramp: Enterprise-Scale AI Agent Deployment Across Engineering Lifecycle - ZenML LLMOps Database"
  description: "Ramp, a fintech company, has systematically deployed AI agents powered by Claude across their entire software development lifecycle, from ideation through production monitoring. Rather than building extensive scaffolding for current model limitations, they deliberately built infrastructure for future model capabilities, treating agents as digital coworkers with expansive access to tools and data. Their approach includes both foreground tools like Claude Code for hands-on development and background agents like Inspect for automated workflows, with agents now generating more sessions than humans. By implementing defense-in-depth security controls, read-only access patterns, comprehensive trace analysis, and decentralized ownership, they've achieved significant productivity gains including reducing CI time from 18 minutes to 6 minutes and automating substantial portions of code review, incident response, and feature deployment."
  canonical: "https://www.zenml.io/llmops-database/enterprise-scale-ai-agent-deployment-across-engineering-lifecycle"
  ogTitle: "Ramp: Enterprise-Scale AI Agent Deployment Across Engineering Lifecycle - ZenML LLMOps Database"
  ogDescription: "Ramp, a fintech company, has systematically deployed AI agents powered by Claude across their entire software development lifecycle, from ideation through production monitoring. Rather than building extensive scaffolding for current model limitations, they deliberately built infrastructure for future model capabilities, treating agents as digital coworkers with expansive access to tools and data. Their approach includes both foreground tools like Claude Code for hands-on development and background agents like Inspect for automated workflows, with agents now generating more sessions than humans. By implementing defense-in-depth security controls, read-only access patterns, comprehensive trace analysis, and decentralized ownership, they've achieved significant productivity gains including reducing CI time from 18 minutes to 6 minutes and automating substantial portions of code review, incident response, and feature deployment."
notion:
  pageId: "3b5f8dff-2538-8075-996e-dec7d0fd316a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T12:06:00.000Z"
  lastEditedTime: "2026-08-07T12:06:00.000Z"
  publishedAt: "2026-08-07T12:14:29Z"
---

## Overview

Ramp has implemented one of the most comprehensive enterprise deployments of LLM-powered agents in production, with systems spanning the entire software development lifecycle. The engineering teams at Ramp, led by Austin and Rahul, have adopted a forward-looking philosophy: rather than optimizing for current model capabilities, they build infrastructure anticipating the next generation of models, treating successive improvements as inevitable. This approach has allowed them to move faster by avoiding technical debt from overly-tailored solutions while empowering their entire organization to leverage AI agents.

The core insight driving Ramp's strategy is that model capabilities are improving on an exponential curve, and organizations should pay more attention to the rate of change than the current snapshot. By building for what will be available 3-6 months in the future rather than current capabilities, they avoid the trap of playing catch-up. This philosophy manifests in repeatedly removing scaffolding and constraints as models outgrow the harnesses built for them.

## Primary Agent Systems

Ramp's agent deployment centers around several key systems, each serving different use cases and user populations. The most prominent is Inspect, which functions as a digital coworker for Ramp employees. Inspect has access to the full suite of tools that a Ramp builder would use, including GitHub, Linear, Slack, Datadog, and Sentry. Engineers and other team members can ask Inspect to solve support tickets, fix GitHub issues, investigate Sentry errors, or handle Linear and Zendesk tickets. The system runs on Modal in the background and is accessible via web interface, though the primary adoption vector has been Slack integration.

The Slack integration proved particularly powerful for viral adoption within the organization. When someone mentions Inspect in a thread asking it to help with a task, other participants see the interaction and realize they can leverage the same capability. This organic discovery mechanism led to Inspect becoming deeply embedded in daily workflows. Every pull request now comes with its own VM that runs temporarily, allowing for session takeover and multiplayer collaboration through link-based sharing.

A critical architectural evolution is that more Inspect sessions are now triggered by automations than by humans. Various systems throughout Ramp's infrastructure kick off Inspect sessions based on scheduled triggers or events from external systems. These automated sessions notify people in channels or via direct messages, representing a shift from reactive human-initiated requests to proactive autonomous operations.

For non-technical staff, Ramp developed Project Glass, which serves as the home base for interacting with coding agents. The company's belief from the beginning has been that everyone should have access to AI's velocity-increasing power, but the interface must meet people where they are. Glass abstracts away technical details that would slow down non-engineers while still providing access to the underlying agent capabilities.

## Advanced Agent Features: Fable and Dynamic Workflows

The deployment also extensively uses Fable, which appears to be a more advanced agent system with sophisticated orchestration capabilities. When working with Fable, engineers can employ dynamic workflows where Claude orchestrates multiple sub-agents. This represents a form of test time compute where the model can scale its thinking from low to medium to high to extra high to maximum levels. Dynamic workflows differ from loops in that they handle non-deterministic tasks where the steps aren't known ahead of time, whereas loops handle repetitive work.

The distinction between loops and dynamic workflows reflects a mental model shift in how work is decomposed. Loops are described as taking a horizontal slice of engineering work—automating one task that every engineer does daily, such as code review or babysitting pull requests. Dynamic workflows, by contrast, take a vertical slice, handling entire end-to-end workflows like shipping an experiment, monitoring it, adjusting exposure, and eventually shipping the variant, all without human intervention except for initial approval.

One compelling example of Fable's capabilities involved tackling deep architectural problems in Ramp's monolithic Python codebase. The agent was tasked with fixing all import cycles and implementing lazy loading to reduce the enormous number of Python modules loaded at app startup. Fable made substantial progress on both initiatives with much of the code being merged. More impressively, Fable recently reduced CI time from an 18-minute P50 to a 6-minute P50 through iterative optimization. The agent profiled the code, landed optimizations, scheduled itself to run a day later to gather production data, and repeated this cycle for days until achieving its performance goals. When complete, it presented a chart showing the improvements.

This level of autonomous operation represents a significant shift in how engineering work is conducted. The agent used routines to schedule its own future work, demonstrating temporal reasoning and long-horizon planning. The engineer who initiated this work described not being in the loop at all after initially requesting the work and stamping the pull request.

## On-Call Assistant and Incident Response

Another production system is the On-Call Assistant, which has been running since late February or March of the relevant year. This assistant runs on every incident assigned to engineers, including both customer support tickets requiring engineering attention and system-level incidents. Built initially on Claude Code and then packaged to run in containers with appropriate safeguards, the On-Call Assistant provides root cause analysis in dedicated Slack channels for each incident. Incident responders then interact with the assistant to resolve issues.

The On-Call Assistant exemplifies Ramp's pattern of proving capabilities locally with Claude Code, building up the necessary skills, MCPs (Model Context Protocol integrations), and prompts to create an effective AI SRE (Site Reliability Engineer), then packaging that capability to run autonomously in production with appropriate guardrails.

## Development Environment and Tooling

The development setup at Ramp reflects a minimalist philosophy focused on letting models work with maximum autonomy. Engineers describe using vanilla setups—iTerm2 terminal with multiple panes, no IDE in many cases, and fairly barebones Claude Code configurations without extensive plugins, skills, or MCPs. The simplicity is intentional, as it's viewed as the best way to learn model capabilities without over-constraining them.

However, there is heavy use of sub-agents and adversarial review patterns. Over time, usage patterns have shifted toward background-heavy sessions with most interactions focused on information gathering—questions like "why is memory spiking on this service?" or "how can we get this project done faster?" This allows engineers to fan out many sessions to gather context. When local development happens with Claude Code, it tends to be for more hands-on debugging or situations requiring more services and local context.

The constraint of running multiple local development environments became a limiting factor as Ramp's service architecture grew more complex with numerous databases, message queues, Redis instances, and other infrastructure. Combined with the observation that latest models require much less hand-holding, engineers found themselves carrying laptops with lids open to keep sessions running. This drove a shift toward more background execution and remote development environments.

## Code Quality and Review

Ramp has invested significantly in automated code review through a custom bot built on Inspect and their background agents API. The review bot pulls from organizational memories of important patterns to check and allows individual teams to write their own skill files encoding team-specific knowledge accumulated over years. This codification of institutional knowledge enables faster movement while maintaining quality standards.

An important observation is that as models get smarter, they stop making certain classes of mistakes, which means reviewer attention should shift accordingly. Rather than spending human review tokens on issues models reliably avoid, reviewers can focus on higher-level concerns. This represents an evolving partnership where both automated and human review adapt to changing capabilities.

## Security and Access Control

The security architecture follows defense-in-depth principles with multiple layers of safeguards implemented across the stack. The fundamental approach is giving agents access to everything they need but nothing more, with extensive use of read-only permissions. For example, when agents need to query BigQuery or Datadog, they receive read-only service keys rather than write access.

The security team has been deeply involved in building the infrastructure, setting up network access policies and managing credential access. Critically, the security team are also regular users of the agent systems, ensuring that security controls align with practical workflows. This tight integration between security requirements and day-to-day usage has been essential to scaling agent deployment.

Access controls are enforced through hard technical limits following the principle of least privilege—not giving agents the opportunity to perform certain actions rather than relying solely on model behavior. The organization carefully considers what the worst-case outcome would be if code contains bugs and only deploys agents where effects are sufficiently constrained and potential upside justifies the risk.

## Trace Analysis and Debugging

Rather than focusing heavily on aggregate benchmarks, Ramp emphasizes studying individual traces to understand agent behavior. When a workflow should work but doesn't, engineers examine what commands the model should have run and why it didn't reach that state. This granular analysis reveals whether issues stem from missing context, unavailable tools, or other factors.

By focusing on the "correct trace"—the sequence of actions the agent should ideally perform—engineers can shape agent behavior through prompts, tools, and skills to achieve desired outcomes. This approach has proven more valuable than broad benchmarking because it identifies specific failure modes and paths to improvement.

The organization maintains test suites that are run against each new model release. While historically no model could complete all these tests, newer models have begun passing the entire suite, demonstrating the rapid capability improvements that validate Ramp's forward-looking development philosophy.

## Cost Management and Optimization

Ramp's approach to cost management is notable for what it doesn't restrict. The company deliberately avoids imposing token or dollar limits on individual engineers, believing people should access any level of intelligence without constraint. This philosophy stems from recognizing that when spending is in positive ROI territory—where each dollar spent on tokens generates more than a dollar in value—minimizing costs becomes counterproductive.

Instead of limiting usage, Ramp optimizes through other mechanisms. They use batch and flex APIs where appropriate, deploy cheaper models for automated workflows that aren't human-controlled, and maintain defaults that steer usage toward cost-effective patterns. The expectation is to stay on the latest frontier models while recognizing that the cost of a given level of intelligence decreases over time, as has been the historical pattern.

When individuals suddenly become top spenders in a given month, the response is curiosity rather than restriction. Engineers reach out to understand what the person is working on, whether it's something that could be platformized to expand impact, or whether there's a mistake that can be corrected. The emphasis is on supporting experimentation and innovation while helping optimize after use cases prove valuable.

## Organizational Culture and Adoption

The decentralized approach to agent adoption has been key to Ramp's success. While certain teams maintain core abstractions like the Inspect platform that serves as bedrock for automations, individual teams are empowered to build what they need. The platform teams focus on making their offerings so compelling that other teams are naturally incentivized to build on top of them rather than mandating particular approaches.

This philosophy extends to handling duplicate efforts. When multiple teams express desire for similar capabilities or build similar solutions independently, it triggers the platform team to create a solid shared implementation. There's also a forward-looking component where platform teams build capabilities they anticipate will be needed when models become more capable.

The culture of experimentation is deeply embedded, with acceptance that some projects won't pan out but rapid iteration is valued. Making all tools freely available to engineers without budget constraints or mandated usage patterns has made it easier for teams to speak the same language and share learnings. Engineers are encouraged to push frontier models on hard problems to build familiarity with cutting-edge capabilities rather than optimizing for current-generation models.

## Automation Patterns: Loops vs. Vertical Slices

Ramp has developed sophisticated patterns for different types of automated workflows. Loops handle repetitive daily tasks like babysitting pull requests to fix CI failures and automatically rebasing them. One example is a daily routine that runs to delete dead code, continuously keeping the codebase clean without human intervention.

The vertical slice pattern, exemplified by having an agent ship an entire experiment end-to-end, represents higher-level orchestration. The agent creates the experiment, lands the pull request, sets a reminder for itself to check the next day, verifies exposure balance, increases exposure as appropriate, monitors the experiment, and eventually puts up another pull request to ship the winning variant. The only human touchpoints are the initial request and stamping the pull request, with everything else handled autonomously.

## Technical Infrastructure

The infrastructure runs on Modal for background execution with sessions accessible via web interfaces and Slack. The system supports multiplayer collaboration with link-based session sharing and the ability to take over sessions. Each pull request gets its own ephemeral VM, enabling isolated testing and experimentation.

Integration points span the development ecosystem: GitHub for code management, Linear for issue tracking, Slack for communication, Datadog for monitoring, Sentry for error tracking, and Zendesk for support tickets. This comprehensive integration allows agents to operate across the full context of how work happens at Ramp rather than being siloed in particular tools.

## Lessons and Forward-Looking Approach

The overarching lesson from Ramp's deployment is the importance of building for future capabilities rather than current limitations. While immediate product needs must still be met, the organization has worked to avoid over-indexing on present-day model behaviors. They've repeatedly removed scaffolding as models outgrow constraints, validating the assumption that capabilities will continue expanding.

The advice to peers is to pay attention to the rate of change in model capabilities rather than fixating on current snapshots. Building for what will be available 3-6 months in the future prevents playing catch-up, as solutions optimized for today's models may be obsolete by the time they ship. This requires trust that intelligence and agency will continue increasing, which the historical trajectory supports.

The combination of minimal constraints, comprehensive tooling, deep security integration, granular trace analysis, and decentralized ownership has enabled Ramp to achieve agent deployment at a scale that transforms how engineering work happens. The shift from human-initiated sessions to automation-initiated sessions, the autonomous multi-day optimization cycles, and the end-to-end experiment deployment all demonstrate LLM capabilities being leveraged in production at a sophisticated level that points toward the future of software development.
