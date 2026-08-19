---
title: "Runtime Security and Governance Framework for AI Agents"
slug: "runtime-security-and-governance-framework-for-ai-agents"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "regulatory-compliance"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "monitoring"
  - "security"
  - "compliance"
  - "orchestration"
  - "guardrails"
industryTags: "tech"
company: "Thales Group"
summary: "Thales Group developed a comprehensive security and governance framework to address the operational risks of autonomous AI agents in production environments. The problem centered on agents potentially exceeding their intended boundaries and performing unauthorized actions, particularly concerning given the complex interactions between users, agents, sub-agents, and downstream systems. Thales built a runtime trust plane that monitors and enforces controls across identity, delegation, policy, risk, and evidence layers. The solution creates a continuous record of trust, compares declared versus observed agent behavior to identify variance, and implements risk-based execution controls including quarantine, rollback, and kill switches. This approach enables real-time governance over dynamic control paths while maintaining observability and enforcing authorization boundaries across multi-agent workflows."
link: "https://www.youtube.com/watch?v=czfKC-p79tA"
year: 2026
seo:
  title: "Thales Group: Runtime Security and Governance Framework for AI Agents - ZenML LLMOps Database"
  description: "Thales Group developed a comprehensive security and governance framework to address the operational risks of autonomous AI agents in production environments. The problem centered on agents potentially exceeding their intended boundaries and performing unauthorized actions, particularly concerning given the complex interactions between users, agents, sub-agents, and downstream systems. Thales built a runtime trust plane that monitors and enforces controls across identity, delegation, policy, risk, and evidence layers. The solution creates a continuous record of trust, compares declared versus observed agent behavior to identify variance, and implements risk-based execution controls including quarantine, rollback, and kill switches. This approach enables real-time governance over dynamic control paths while maintaining observability and enforcing authorization boundaries across multi-agent workflows."
  canonical: "https://www.zenml.io/llmops-database/runtime-security-and-governance-framework-for-ai-agents"
  ogTitle: "Thales Group: Runtime Security and Governance Framework for AI Agents - ZenML LLMOps Database"
  ogDescription: "Thales Group developed a comprehensive security and governance framework to address the operational risks of autonomous AI agents in production environments. The problem centered on agents potentially exceeding their intended boundaries and performing unauthorized actions, particularly concerning given the complex interactions between users, agents, sub-agents, and downstream systems. Thales built a runtime trust plane that monitors and enforces controls across identity, delegation, policy, risk, and evidence layers. The solution creates a continuous record of trust, compares declared versus observed agent behavior to identify variance, and implements risk-based execution controls including quarantine, rollback, and kill switches. This approach enables real-time governance over dynamic control paths while maintaining observability and enforcing authorization boundaries across multi-agent workflows."
notion:
  pageId: "3c1f8dff-2538-8093-a32a-c63c4a2f4b23"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T09:02:00.000Z"
  lastEditedTime: "2026-08-19T09:02:00.000Z"
  publishedAt: "2026-08-19T09:12:40Z"
---

## Overview

Thales Group is building security architecture frameworks and operational systems for deploying AI agents in production environments, both for internal use and for end-user deployment. The presentation addresses a critical concern in LLMOps: what happens when autonomous agents exceed their intended boundaries and perform unauthorized actions in production systems. This case study represents a sophisticated approach to governing AI agents at runtime, moving beyond traditional model-centric security to focus on dynamic control paths and execution boundaries.

The motivation for this work stems from real-world incidents where agents have acted outside their intended scope. Thales recognized that traditional linear governance models and software testing approaches are insufficient for the complex, simultaneous workflows that emerge when users, agents, sub-agents, and various systems interact in real-time. The company emphasizes that only 14.4% of organizations are seriously looking at AI deployments from a security perspective, highlighting a significant industry gap.

## The Core Problem: Non-Linear Agent Execution

The fundamental challenge Thales identifies is the shift from linear, predictable system interactions to complex, non-linear agent ecosystems. In traditional pre-AI environments, user interactions with SaaS and business systems followed predictable patterns that could be governed with established security controls. With AI agents, the landscape changes dramatically. When a user executes a request that involves agents calling models, orchestrating tasks, and invoking sub-agents, an entire ecosystem activates simultaneously with workflows executing in tandem.

A particularly concerning scenario involves privilege inheritance and delegation. When sub-agents inherit privileges and entitlements from primary agents, the question becomes whether this inheritance is appropriate and whether sub-agents are acting within their intended scope. Thales encountered this directly when their audit team discovered that agents in a system they were building had excessive privileges and could perform virtually any action. This audit intervention forced the team to stop development, re-engineer the system, collaborate with identity teams, and build proper identity frameworks with assigned intent.

## The Runtime Trust Plane Architecture

Thales developed what they call a "runtime trust plane" that operates across four key boundaries: identity, delegation, policy, and risk, with an additional evidence layer for audit and compliance purposes. This architecture represents a fundamental rethinking of how governance works in agent-based systems.

The runtime trust plane continuously monitors the control path rather than focusing solely on the agents themselves. Since control paths in agent systems are dynamic and non-deterministic, Thales implemented hooks into these paths to assess in real-time where failures might occur, predict potential issues, and define outcomes when problems arise. This enables the construction of risk controls that operate on actual execution patterns rather than theoretical models.

A critical insight from Thales is the distinction between observability and governance. While these terms are often used interchangeably in the industry, Thales treats them as complementary but distinct capabilities. Observability provides visibility into what is happening, but governance requires the ability to take action based on that visibility. The runtime trust plane integrates both concepts, using observability data to inform governance decisions that are enforced on the control path based on outcomes tied to identity, policy, and authorization.

## Declared vs. Observed Authority: Managing Drift

One of the most innovative aspects of Thales's approach is their framework for managing the gap between declared authority (what agents are supposed to do) and observed behavior (what agents actually do in production). The team built a comprehensive database documenting all agents in their environment, including what each agent does, what it interacts with, what tools it calls, and what systems it engages. This represents the declared authority baseline.

During runtime, they observed variances between declared and actual behavior. Rather than treating all drift as negative, Thales developed a nuanced categorization system with four types of variance:

- **Allowed drift**: Variations that are within acceptable parameters
- **Approved drift**: Changes that have been explicitly authorized
- **Drift requiring explanation**: Unexpected but potentially legitimate variations
- **Control failure**: Unauthorized or dangerous deviations

The team identified control failure as the most critical metric to monitor. This classification system enables risk-based decision making rather than blanket restrictions that might hamper legitimate agent functionality.

## Execution Constraints and Containment

Thales engineered their production environment around four primary constraints, though the presentation only explicitly detailed three: ephemeral delegations (temporary privilege grants), drift monitoring (tracking behavioral variance), and latency considerations (which impact both user experience and operational costs). These constraints informed the design of a containment path with several possible interventions.

The containment path includes engineered kill switches with multiple response options:

- **Quarantine**: Isolating the agent or workflow for investigation
- **Rollback**: Reverting to a previous safe state
- **Secondary authorization**: Requiring human or higher-authority approval before proceeding
- **Stop**: Immediate termination of the agent's execution

This multi-tiered response capability allows for proportional intervention based on the severity and nature of the detected issue.

## Risk-Based Execution Control

A particularly sophisticated element of Thales's system is the risk-based execution control mechanism. Before committing to execution, the system evaluates function calls from agents and decision proposals across the four authority boundaries (identity, policy, risk, and evidence). Based on this evaluation, actions are tagged with risk categories:

- **Low risk**: Auto-executed without human intervention
- **Medium risk**: Likely requiring additional validation
- **High risk**: Requiring explicit human approval before execution

This risk categorization enables the system to balance security with operational efficiency. Low-risk operations can proceed immediately, maintaining system responsiveness, while high-risk operations receive appropriate scrutiny without creating bottlenecks for routine tasks.

The evaluation happens within what Thales calls an "envelope" within the runtime trust plane, suggesting a bounded context where risk assessment occurs before execution commits are finalized. This pre-commit evaluation is crucial for preventing unauthorized actions rather than merely detecting them after the fact.

## The Record of Trust

Central to Thales's architecture is a continuous record of trust that runs in real-time alongside agent execution. This record tracks everything from identity to action, creating an auditable trail that spans the entire execution lifecycle. The record of trust is not merely a log but an active component that informs governance decisions.

By maintaining this comprehensive record across identity, delegation, policy, risk, and evidence layers, Thales can build what they call decision matrices. These matrices use historical and real-time data to enforce controls within the execution path based on assessed risk to the control path itself. This represents a shift from static security rules to dynamic, context-aware governance that adapts to actual system behavior.

## Guardian Agents Concept

Near the end of the presentation, the speaker mentions "guardian agents" (initially misspoken as "guardian angels" and "guardian engines"), suggesting an additional layer of agent-based oversight. While not fully detailed due to time constraints, this concept appears to involve specialized agents whose role is to monitor and potentially intervene in the actions of other agents, creating a hierarchical governance structure.

## Critical Assessment and Balanced Perspective

While Thales presents a sophisticated and thoughtful approach to agent governance, several considerations merit attention:

**Strengths:**
- The framework addresses real operational challenges that many organizations face when deploying agents in production
- The distinction between observability and governance is valuable and often overlooked
- The risk-based approach enables practical operations while maintaining security
- The focus on control paths rather than just models represents mature thinking about production AI systems
- The variance categorization system demonstrates nuanced understanding that not all drift is problematic

**Limitations and Questions:**
- The presentation lacks specific quantitative results or metrics demonstrating the effectiveness of the framework
- Implementation complexity is likely substantial, potentially creating barriers to adoption
- The balance between security controls and agent autonomy could impact the practical utility of agents
- Latency implications of real-time governance checks are mentioned but not detailed
- The presentation doesn't address how the system handles emergent behaviors that don't fit neatly into risk categories
- The audit story suggests reactive rather than proactive security design initially

**Industry Context:**
The speaker cites Gartner projections that over 40% of enterprise agent deployments will fail by 2027, though this is acknowledged as a forecast rather than current data. The emphasis on build-and-ship culture potentially compromising security reflects real industry pressures. However, the presentation occurs at a technical conference where audience members (mostly engineers) are already working on these problems, suggesting this may represent advanced practice rather than typical industry behavior.

**Practical Considerations:**
The framework requires significant infrastructure investment, including databases for declared authority, real-time monitoring systems, risk evaluation engines, and enforcement mechanisms. Organizations considering similar approaches must weigh these costs against the risks of uncontrolled agent behavior. The system also requires close collaboration between security, identity management, and development teams, which can be organizationally challenging.

The pre-commit evaluation approach, while safer than post-hoc detection, introduces latency into agent operations. The presentation mentions latency as a constraint but doesn't provide specific performance data, making it difficult to assess real-world feasibility for latency-sensitive applications.

## LLMOps Implications

This case study illuminates several critical LLMOps challenges:

**Identity and Authorization:** Traditional identity and access management frameworks designed for human users and deterministic software don't map cleanly to autonomous agents that make dynamic decisions and invoke sub-agents. Thales's approach of building agent-specific identity frameworks with assigned intent represents one path forward, but the industry lacks standard patterns for agent identity management.

**Multi-Agent Orchestration:** As agents increasingly coordinate with other agents, privilege delegation and inheritance become critical concerns. The question of whether sub-agents should inherit primary agent privileges has no universal answer and requires context-specific policy decisions.

**Testing and Validation:** Traditional software QA approaches are insufficient for systems with non-deterministic behavior. Thales's approach of building comprehensive behavioral baselines and monitoring variance represents a form of continuous testing in production, which is increasingly necessary for LLM-based systems.

**Governance vs. Innovation:** The tension between rapid deployment and security controls is particularly acute with AI systems. The audit intervention story illustrates how traditional governance mechanisms can conflict with agile development practices, necessitating new approaches that provide security without blocking innovation.

**Evidence and Auditability:** The evidence layer Thales describes addresses the critical need for auditable AI systems, particularly in regulated industries. The record of trust provides the documentation needed to demonstrate compliance and investigate incidents, but maintaining such comprehensive records has storage and performance implications.

This case study represents sophisticated thinking about production AI governance, addressing real operational challenges with a comprehensive technical framework. While the presentation format limits detail on implementation specifics and quantitative results, the architectural approach offers valuable patterns for organizations deploying autonomous agents at scale. The emphasis on dynamic, risk-based governance over static security rules reflects mature understanding of how AI systems actually behave in production environments.
