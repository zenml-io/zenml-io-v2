---
title: "AI Agents for Autonomous Incident Investigation and Mitigation in Large-Scale Infrastructure"
slug: "ai-agents-for-autonomous-incident-investigation-and-mitigation-in-large-scale-infrastructure"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "classification"
  - "prompt-engineering"
  - "embeddings"
  - "semantic-search"
  - "few-shot"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "human-in-the-loop"
  - "latency-optimization"
  - "error-handling"
  - "evals"
  - "guardrails"
  - "monitoring"
  - "orchestration"
  - "databases"
  - "scaling"
  - "reliability"
  - "scalability"
  - "documentation"
  - "meta"
industryTags: "tech"
company: "Meta"
summary: "Meta's production engineering team developed AI agents to assist in investigating and mitigating infrastructure incidents at scale. The problem was that thousands of incidents per year, averaging 9 hours each to mitigate, created unsustainable workload for on-call engineers, with expertise siloed among few individuals. Their solution involves a four-stage \"reliability flywheel\" comprising LLM-based pattern identification across incident data, autonomous investigation agents with structured reasoning, guided autonomous mitigations with guardrails, and progression toward self-healing infrastructure. The system achieved over 60% reduction in time from detection to mitigation across 1,000+ incidents, with 40% accuracy on first root cause hypothesis, while maintaining strict guardrails through context engineering rather than prompt engineering and ensuring all agent outputs are traceable to source data."
link: "https://www.youtube.com/watch?v=irtqkj3fHxM"
year: 2024
seo:
  title: "Meta: AI Agents for Autonomous Incident Investigation and Mitigation in Large-Scale Infrastructure - ZenML LLMOps Database"
  description: "Meta's production engineering team developed AI agents to assist in investigating and mitigating infrastructure incidents at scale. The problem was that thousands of incidents per year, averaging 9 hours each to mitigate, created unsustainable workload for on-call engineers, with expertise siloed among few individuals. Their solution involves a four-stage \"reliability flywheel\" comprising LLM-based pattern identification across incident data, autonomous investigation agents with structured reasoning, guided autonomous mitigations with guardrails, and progression toward self-healing infrastructure. The system achieved over 60% reduction in time from detection to mitigation across 1,000+ incidents, with 40% accuracy on first root cause hypothesis, while maintaining strict guardrails through context engineering rather than prompt engineering and ensuring all agent outputs are traceable to source data."
  canonical: "https://www.zenml.io/llmops-database/ai-agents-for-autonomous-incident-investigation-and-mitigation-in-large-scale-infrastructure"
  ogTitle: "Meta: AI Agents for Autonomous Incident Investigation and Mitigation in Large-Scale Infrastructure - ZenML LLMOps Database"
  ogDescription: "Meta's production engineering team developed AI agents to assist in investigating and mitigating infrastructure incidents at scale. The problem was that thousands of incidents per year, averaging 9 hours each to mitigate, created unsustainable workload for on-call engineers, with expertise siloed among few individuals. Their solution involves a four-stage \"reliability flywheel\" comprising LLM-based pattern identification across incident data, autonomous investigation agents with structured reasoning, guided autonomous mitigations with guardrails, and progression toward self-healing infrastructure. The system achieved over 60% reduction in time from detection to mitigation across 1,000+ incidents, with 40% accuracy on first root cause hypothesis, while maintaining strict guardrails through context engineering rather than prompt engineering and ensuring all agent outputs are traceable to source data."
notion:
  pageId: "397f8dff-2538-80a4-bcb4-d48622d8f41d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T19:57:00.000Z"
  lastEditedTime: "2026-07-08T20:15:00.000Z"
  publishedAt: "2026-07-08T20:18:35Z"
---

## Overview

Meta's production engineering team has built a comprehensive AI agent system to assist with incident investigation and mitigation for their large-scale infrastructure. The speaker, Gaurav, is a production engineer leading reliability for Meta's large-scale modern recommendation systems (MRS), which includes the serving and ranking infrastructure powering Facebook, Instagram, and Threads posts. This system handles billions of requests daily, and the team faces thousands of incidents per year, with each incident taking an average of 9 hours to mitigate across eight-plus data systems with complex signal correlations.

The motivation for this work stems from a major incident on December 11th, 2024, when a routing configuration change caused a cascading BGP process failure across regions, resulting in a 4-hour outage affecting all Meta products. This severity-zero incident required scores of engineers across tens of teams, physical power cycles in data centers, and resulted in significant media attention. Beyond the technical impact, engineers lost a week of sleep and teams lost a week of roadmap work, highlighting the unsustainability of the existing incident response model. The core problem is that expertise for handling complex incidents is scarce and siloed, and experts cannot be online for every alert.

## The Reliability Flywheel Architecture

Meta's approach centers on what they call a "reliability flywheel" - a self-reinforcing loop with four stages that keeps engineers at the center as orchestrators rather than passengers. The four stages are:

**Pattern Identification**: The system analyzes hundreds of incidents per week using LLM-based agents that semantically embed and cluster incidents by root cause similarity. For each cluster, parallel agents decompose patterns into subpatterns and enrich them with LLM analysis. Critically, they score these patterns by "operational cost," which includes the time spent during incidents for debugging and follow-up work in the days after. This allows them to rank prevention investments based on operational cost and public fallout. Engineers validate these clusters, name patterns, and decide which to invest in, while the agents handle the grunt work. This approach has revealed cross-service patterns that weren't evident before and enabled operations cost attribution to identify high-ROI prevention investments.

**Autonomous Investigations**: The investigation system is built around skills and workflows encoded by domain experts. These live in a context store managed by an orchestration layer with a workflow navigator. The LLM's role is to reason about what to investigate and reason about fetched data, but importantly, LLMs never generate data themselves. Tools provide all data through a data integration layer that pulls production signals from eight-plus systems. The output is highly structured: ranked root cause hypotheses, correlated evidence, mitigation recommendations based on past patterns, and crucially, every claim is linked to source data with no hallucinations permitted.

**Autonomous Mitigations with Guardrails**: The system is progressing toward autonomous mitigation capabilities, starting with low-risk, reversible changes that are isolated rather than system-wide. There's a very hard trust boundary in place, and the team operates on an incremental trust model.

**Self-Healing Infrastructure**: The eventual goal is reliability-aware, agent-aware infrastructure that can prevent incidents before they happen by encoding system invariants and pairing production signals with invariants that don't need to change.

## Context Engineering Over Prompt Engineering

A critical breakthrough for Meta came when they shifted focus from optimizing what they asked the model in prompts to optimizing what the model could see in its context. They found prompt engineering to be fragile, with knowledge getting trapped in prompts that break when new failure modes appear. In contrast, context engineering has scaled effectively because knowledge lives in tools, skills, workflows, and compositions of these components. Any agent can use these, and adding capabilities doesn't require rewriting prompts but rather adding new skills or improving existing ones. Each skill has evaluations attached that look at production and incident data and suggest fixes, creating a self-improving system over time.

The design principles that have worked well emphasize that humans encode expertise while agents execute it, LLMs reason but never generate data, and humans remain in the loop at every level. They've designed hallucination out of the system rather than trying to work around it through a "query, reason, cite" approach where if an agent can't cite something, it stays silent.

## Agent Investigation Workflow

The investigation process begins when an alert fires indicating a regression or failure. An LLM planner kicks in and selects the most likely best workflow from hundreds available, loads the composing skills from thousands available, and initiates parallel data gathering of all relevant production signals. The LLM synthesizes this information to produce hypotheses. This parallel data gathering, which previously took engineers 30-45 minutes manually examining different dashboards, charts, and tables, is now compressed into a few minutes regardless of time of day.

Engineers can then engage in hypothesis refinement loops with the agent, providing feedback if the suggested root cause analysis doesn't align with what they're seeing. For the December outage scenario, an agent would have started with time series queries to identify the anomaly and affected regions, identified specific chart patterns potentially indicating a canary issue, defined time windows to query other systems against, examined configuration changes matching the deployment pattern and timing, analyzed crash patterns of the BGP process through log analytics, and queried previous knowledge graphs and pattern analysis of similar incidents to reveal mitigation steps. The cascade that took scores of engineers several hours and days of follow-up could potentially have been a 15-minute investigation with a targeted rollback.

## Platformization Strategy

Meta is heavily focused on building this as a platform rather than point solutions. The platform handles guardrails, orchestration, tool integrations, workflow executions, context stores, and skill registries, while domain teams focus on encoding their understanding of failure patterns, services, and workflows specific to their areas. This platformization approach ensures consistent guardrails across all use cases and allows teams to safely and reliably compose on top of the infrastructure.

## Production Results and Metrics

The agents are actively helping in production with measurable results. They're seeing more than 60% reduction in time from detection to mitigation across incidents, with over 1,000 incidents investigated showing 60%+ improvements. Over 40% of the time, the first root cause hypothesis generated by the agent is correct. While 40% might seem modest, the remaining cases still provide value by ruling out possibilities that engineers would have otherwise investigated, contributing to reduced mean time to detection and mitigation (MTDM). The team has set an aggressive target of 95% reduction in MTDM, aiming for less than 30 minutes per incident compared to the current 9-hour average. They emphasize this improvement isn't just because models are getting better, but because engineers are continuously encoding better workflows and the autonomous evaluations on skills are improving over time.

## Maturity Model and Trust Boundaries

Meta operates on a maturity model with four levels, where each level must demonstrate trust and reliability before progressing:

**Level 1 - Automated Audits**: Reliability audit agents produce failure patterns, taxonomies, and knowledge graphs that constantly update from incident data.

**Level 2 - Investigation Co-pilots**: Taking live incidents and mined patterns, co-pilots perform automatic root cause analysis and suggest mitigation steps. This is where they achieved 60% improvements while operating read-only with architectural guardrails.

**Level 3 - Autonomous Mitigation**: Agents perform targeted, reversible rollbacks and isolated changes, not system-wide changes. They're taking a very hard trust boundary on these capabilities. They've also introduced AI code review agents to adversarially check what other agents generate, as they've observed AI-assisted code generated by agents has higher incident risk.

**Level 4 - Self-Healing Systems**: System invariants are encoded so agents can perform reliability-aware development, pairing production signals with invariants to prevent incidents before they occur.

Transparent reasoning is non-negotiable across all levels. Every conclusion traces back to a specific query and result with complete logging. They never use generated data, and if an agent can't cite something, it stays silent.

## LLMOps Considerations and Challenges

The system demonstrates several important LLMOps principles in practice. The extensive use of LLM planning to navigate hundreds of workflows and thousands of skills requires sophisticated orchestration. The parallel data gathering and synthesis capabilities showcase how LLMs can be used for reasoning over complex, multi-source production data without being allowed to fabricate information. The context store architecture and skill registry represent critical infrastructure components for operationalizing LLMs at scale.

The evaluation strategy is particularly noteworthy from an LLMOps perspective. They measure relentlessly with end-to-end metrics focused on time from detection to mitigation, and every skill has evaluations attached that examine production data and incident data to suggest fixes for the skills themselves. This creates a feedback loop where the system improves autonomously over time based on real-world performance rather than static benchmarks.

The shift from prompt engineering to context engineering represents an important operational insight for production LLM systems. By structuring the problem such that knowledge lives in reusable, testable components rather than brittle prompts, they've created a system that scales with complexity rather than breaking under it. This approach also enables better collaboration across teams, as domain experts can contribute workflows and skills without needing to understand the underlying LLM orchestration mechanics.

The guardrails and trust boundary considerations reflect mature thinking about production AI systems. Starting read-only, progressing to reversible actions, introducing adversarial AI code review agents, and maintaining complete traceability all represent practical approaches to managing risk in high-stakes production environments. The acknowledgment that AI-generated code has higher incident risk and the mitigation strategy of using other AI agents for review demonstrates a nuanced understanding of both the capabilities and limitations of current AI systems.

## Broader Impact on Engineering Roles

An interesting dimension of this work is how it's changing the nature of engineering work at Meta. Engineers are moving up an abstraction layer, spending less time on mechanical work like dashboard hopping and chart examination, and more time on encoding expertise, validating patterns, and making judgment calls about which issues to prioritize. The framing has shifted from "investigating incidents" to "teaching agents how to investigate incidents." This represents a fundamental change in how reliability engineering expertise is leveraged and preserved within the organization.

The ultimate success metric, as emphasized by the speaker, is whether on-call engineers sleep better knowing an agent is watching. This human-centric framing grounds the technical achievements in the actual quality-of-life improvements for engineers, which is both the motivation and the validation for the entire system. The unsustainability of the previous model, where limited experts had to be available at all times for thousands of incidents per year, makes this not just a technical problem but an organizational sustainability challenge that AI agents are helping to address.

While the presentation naturally highlights Meta's successes, it's worth noting that the 40% accuracy rate on first hypothesis and the incremental progression through maturity levels suggest this remains an evolving system rather than a fully solved problem. The aggressive 95% reduction target for incident mitigation time also indicates they see significant room for improvement from current performance. The careful attention to guardrails, reversible actions, and human-in-the-loop processes reflects the reality that autonomous incident response in production systems carries significant risk that must be managed thoughtfully.
