---
title: "Cloud-Based Agent Platform for Automated Engineering Tasks"
slug: "cloud-based-agent-platform-for-automated-engineering-tasks"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "mcp"
  - "docker"
  - "kubernetes"
  - "cicd"
  - "microservices"
  - "orchestration"
  - "security"
  - "guardrails"
  - "monitoring"
  - "serverless"
  - "fastapi"
industryTags: "tech"
company: "Doordash"
summary: "DoorDash built Flux, an internal cloud-based agents platform, to address the limitations of local laptop-based agent workflows including resource constraints, safety concerns, and visibility issues. The platform enables autonomous coding agents to execute engineering tasks in isolated cloud sandboxes with governed access to internal systems through an MCP gateway, coordinated via reusable playbooks and triggered from multiple surfaces like Slack, GitHub, and CLI. In a single month in 2026, Flux automated 130,000 engineering tasks, powers over 25,000 automated code reviews weekly, and executes 10,000+ playbook invocations each week across more than 300 unique playbooks."
link: "https://careersatdoordash.com/blog/delegating-engineering-work-to-cloud-based-agents/"
year: 2026
seo:
  title: "Doordash: Cloud-Based Agent Platform for Automated Engineering Tasks - ZenML LLMOps Database"
  description: "DoorDash built Flux, an internal cloud-based agents platform, to address the limitations of local laptop-based agent workflows including resource constraints, safety concerns, and visibility issues. The platform enables autonomous coding agents to execute engineering tasks in isolated cloud sandboxes with governed access to internal systems through an MCP gateway, coordinated via reusable playbooks and triggered from multiple surfaces like Slack, GitHub, and CLI. In a single month in 2026, Flux automated 130,000 engineering tasks, powers over 25,000 automated code reviews weekly, and executes 10,000+ playbook invocations each week across more than 300 unique playbooks."
  canonical: "https://www.zenml.io/llmops-database/cloud-based-agent-platform-for-automated-engineering-tasks"
  ogTitle: "Doordash: Cloud-Based Agent Platform for Automated Engineering Tasks - ZenML LLMOps Database"
  ogDescription: "DoorDash built Flux, an internal cloud-based agents platform, to address the limitations of local laptop-based agent workflows including resource constraints, safety concerns, and visibility issues. The platform enables autonomous coding agents to execute engineering tasks in isolated cloud sandboxes with governed access to internal systems through an MCP gateway, coordinated via reusable playbooks and triggered from multiple surfaces like Slack, GitHub, and CLI. In a single month in 2026, Flux automated 130,000 engineering tasks, powers over 25,000 automated code reviews weekly, and executes 10,000+ playbook invocations each week across more than 300 unique playbooks."
notion:
  pageId: "3bcf8dff-2538-800b-b86b-e023529cfdcf"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-14T06:30:00.000Z"
  lastEditedTime: "2026-08-14T06:30:00.000Z"
  publishedAt: "2026-08-14T06:55:13Z"
---

## Overview

DoorDash developed Flux, a production-scale cloud-based agents platform designed to delegate engineering work to autonomous coding agents. Published in August 2026, this case study demonstrates a mature LLMOps implementation focused on moving agentic workloads from individual developer laptops to a centralized, secure, and scalable cloud infrastructure. The platform represents DoorDash's strategic decision to build in-house rather than rely solely on third-party hosted coding agents, prioritizing control over security, orchestration, and integration with internal systems.

The scale of deployment is impressive: in a single month in 2026, Flux automated 130,000 engineering tasks, handles more than 25,000 automated code reviews each week, and executes over 10,000 playbook invocations weekly across more than 300 unique playbooks. The platform debuted in Q1 2026 and expanded rapidly thereafter, demonstrating both technical viability and organizational adoption.

## Problem Statement and Motivation

DoorDash identified three core limitations with laptop-based agentic workloads that pushed them toward a cloud-based solution. First, resource and availability constraints: laptops have fixed CPU cores, limited memory, and battery constraints that are shared across all applications. Agentic workflows frequently need to run compute-intensive tasks like builds, tests, and large-scale searches in parallel, quickly exhausting local capacity. Additionally, these workflows depend on the device being powered on and connected, meaning work pauses when engineers close their laptops or lose connectivity.

Second, safety controls present significant challenges in laptop-based deployments. Laptops typically maintain broad access to sensitive credentials and systems including SSH keys, VPN sessions, and authenticated tools. Granting autonomous agents this same level of access creates unnecessary risk with a potentially large blast radius. Local environments also make it harder to tightly scope what an agent can access and for how long, creating both security and compliance concerns.

Third, visibility and auditability suffer when workloads run across individual laptops. Execution becomes fragmented and difficult to monitor, making it challenging to understand what is running, where it's running, on whose behalf, and which systems or files have been accessed. This lack of centralized observability creates both operational and security blind spots.

## Build vs. Buy Decision

DoorDash made a deliberate choice to build Flux in-house rather than rely exclusively on hosted coding agents from third parties. The case study articulates that while hosted coding agents are useful, they force a hard tradeoff: either send sensitive code and execution context to a third party, or open a path from that third party back into internal systems. For DoorDash, the challenge wasn't just getting an agent to write code—that capability largely exists—but rather providing the agent with the right environment, tools, permissions, integrations, and constraints.

The strategy centers on controlling the primitives around the agent, including orchestration, sandboxes, workflows, permissions, integrations, and DoorDash-specific context that agents need to work effectively. The architecture is designed to be modular, giving flexibility to use the best third-party tool for each job or build in-house when deeper security, integration, performance, or user experience ownership matters. This approach democratizes workflow creation and makes systems more adaptable to future use cases, as teams can build new agent workflows without reworking underlying infrastructure.

Notably, DoorDash runs both the evaluations for their code review system on Flux infrastructure, demonstrating that the platform supports not just production workloads but also the testing and evaluation infrastructure critical to LLMOps maturity.

## Architecture: Four Platform Primitives

Flux is architected around four core platform primitives that work together to make agent delegation repeatable, secure, and scalable: sandboxes, the MCP gateway, playbooks, and invocation surfaces.

### Sandboxes for Execution Environment

The sandbox primitive addresses the fundamental problem of where agents actually execute work. Rather than running on individual laptops, Flux provisions isolated cloud sandboxes backed by Firecracker micro virtual machines (microVMs) for hardware-level isolation. Each sandbox is provisioned with the repositories, developer tools, secrets, and runtime dependencies the task requires, creating a complete engineering workspace while maintaining a consistent execution, security, and observability model.

This control layer enables real engineering workflows including changes across multiple repositories and multiple pull requests from a single session. Performance is a key consideration: Flux maintains a 95th percentile service level objective of under five seconds for full end-to-end setup, encompassing starting the microVM, cloning required repositories, installing build tools, and configuring supported coding agent harnesses. This performance target ensures that cloud-based execution doesn't introduce unacceptable latency compared to local execution.

The use of Firecracker microVMs is notable for providing hardware-level isolation, which offers stronger security guarantees than container-based isolation alone. This architectural decision reflects the security requirements of running autonomous agents with access to production systems and sensitive code.

### MCP Gateway for Governed Access

The Model Context Protocol (MCP) gateway, implemented as an internal system called Agent Gateway, provides governed access to internal systems. Agents need access to the systems engineers use daily—continuous integration, observability platforms, issue trackers, deployment tools, code search, documentation, and service metadata—but granting broad, unrestricted access shouldn't be the default.

Flux connects agents to internal systems through this centralized gateway where each playbook declares the tools it requires, and Flux grants only the scoped permissions needed for that specific task. Every action is logged, creating a clear audit trail. This gateway architecture provides a centralized control point for authentication, authorization, observability, usage tracking, and policy enforcement, making agent access both safer and easier to operate at scale.

The use of MCP as the integration protocol is significant from an LLMOps perspective, as it represents adoption of an emerging standard for tool integration with language models. This choice likely provides better interoperability and may facilitate integration with future agent capabilities while maintaining centralized control.

### Playbooks as Reusable Units of Work

A playbook represents a reusable unit of agentic work, described as "the equivalent of a Docker container for skills and agent-driven tasks on the Flux platform." Defined in a single YAML file, a playbook packages the task, inputs, context, skills, tools, permissions, validation, expected outputs, and safety boundaries needed to execute work consistently.

A key design decision is that playbooks can combine agentic steps, which provide flexibility and judgment, with deterministic steps, which offer predictability, lower cost, and easier validation. This hybrid approach allows teams to move logic between agent-driven execution and conventional code as requirements evolve, without redesigning the entire workflow. This flexibility is crucial for LLMOps maturity, as it acknowledges that not every step in a workflow benefits from agentic execution and enables teams to optimize for the appropriate tradeoffs of cost, reliability, and capability.

The YAML-based definition format makes playbooks accessible to engineers familiar with infrastructure-as-code practices, lowering the barrier to creating new agent workflows. With over 300 unique playbooks in production and 10,000+ weekly invocations, this primitive has proven successful at enabling workflow democratization.

### Invocation Surfaces for Accessibility

The fourth primitive consists of multiple invocation surfaces that allow the same playbook to be triggered from different interfaces: Slack, GitHub, cron jobs, CLI, or conversational skills. This multi-surface approach means teams can define a workflow once and invoke it from whichever surface best matches the moment—Slack for collaborative delegation, GitHub for pull request and CI automation, cron for recurring maintenance, or CLI for direct developer control.

From an adoption perspective, this design choice is critical. Rather than forcing engineers to learn a new interface or workflow tool, Flux meets developers where they already work. This reduces friction in adoption and enables different use cases to use the most appropriate triggering mechanism.

## Use Cases and Production Deployment

The case study highlights several production use cases running on Flux. Automated code review is the most prominent, with over 25,000 automated code reviews executed weekly. The case study references previous blog posts about building an AI code reviewer that engineers actually listen to and learning to trust that reviewer, suggesting this is a mature capability with documented evaluation and trust-building processes.

Beyond code review, Flux powers CI triage, on-call tasks, maintenance playbooks, and ticket-driven development. The platform supports background workflows that can run unattended, in parallel, and around the clock—a key advantage over laptop-based execution. The variety of use cases demonstrates that Flux has evolved beyond a single-purpose tool into a general platform for agent delegation across the software development lifecycle.

## Lessons Learned and Adoption Strategy

DoorDash shares three key lessons learned that reveal as much about organizational adoption as technical implementation. First, they started narrow to earn trust. Rather than attempting to automate the entire software development lifecycle, they began with automated code review because it was frequent, measurable, and easy for engineers to evaluate. This gave them a production workflow where they could tune quality, latency, cost, and behavior before expanding into additional use cases. This staged rollout approach is a best practice in LLMOps, allowing teams to demonstrate value and build organizational confidence before scaling.

Second, they learned to make the work visible. Their initial Slack integration created private channels for each agent run, which made Flux useful for individuals but didn't create team habits. Moving work into public threads changed the adoption pattern, allowing engineers to see what others delegated, watch Flux make progress, review outputs, and build trust together. This insight highlights the social and organizational dimensions of LLMOps adoption—technical capability alone is insufficient without visibility and shared learning.

Third, playbooks need enablement. Reusable workflows don't appear simply because the platform exists. DoorDash found that workshops and hackathons helped teams translate repeated operational work into playbooks. The primitives made automation possible, but enablement helped teams recognize which workflows were worth encoding. This suggests that successful LLMOps platforms require ongoing investment in developer education and community building, not just infrastructure.

## Critical Assessment and Considerations

While the case study presents impressive scale and capabilities, several considerations deserve attention. First, the blog post is promotional content from DoorDash's careers site, so claims about adoption and effectiveness should be viewed through that lens. The absence of specific metrics around code review quality, error rates, or comparison with human performance makes it difficult to independently assess effectiveness.

Second, the case study doesn't discuss failure modes, error handling, or what happens when agents make mistakes or get stuck. At a scale of 130,000 automated tasks per month, there must be error handling and recovery mechanisms, but these aren't described. Understanding how the platform handles edge cases, agent failures, and potentially harmful actions would provide a more complete picture.

Third, the cost structure isn't discussed. Running isolated Firecracker microVMs for every agent invocation, with sub-five-second SLOs for provisioning, likely involves significant infrastructure cost. The tradeoff between cloud compute costs and developer productivity gains isn't quantified, making it unclear whether this approach is economically justified at different scales.

Fourth, the reliance on in-house development creates maintenance burden and potential lock-in to DoorDash-specific implementations. While modularity is mentioned as allowing integration of third-party tools, the degree to which Flux could adapt to rapidly evolving agent capabilities from vendors like Anthropic, OpenAI, or others isn't clear.

Finally, the case study mentions but doesn't detail the evaluation infrastructure for code review. Given that evaluations are cited as running on Flux infrastructure, more information about how DoorDash validates agent behavior, measures quality over time, and ensures regression testing as the platform evolves would strengthen the LLMOps narrative.

## Technical Maturity and LLMOps Best Practices

Despite these gaps, Flux demonstrates several LLMOps best practices. The architecture exhibits clear separation of concerns with distinct primitives for execution, access control, workflow definition, and invocation. The use of hardware-isolated sandboxes shows attention to security at the infrastructure level. The MCP gateway provides centralized authentication, authorization, and audit logging—critical for production agent deployments.

The hybrid approach of combining agentic and deterministic steps in playbooks reflects mature thinking about when to use agents versus traditional code. The emphasis on observability, with logging of every agent action and centralized visibility, addresses a key challenge in production AI systems. The multi-surface invocation approach reduces adoption friction by meeting developers in their existing workflows.

The staged rollout starting with code review, the emphasis on building trust through visible work, and the investment in enablement through workshops all demonstrate organizational maturity in deploying LLM-based systems. The scale achieved—130,000 tasks per month, 25,000 weekly code reviews, 300+ playbooks—suggests the platform has moved well beyond pilot phase into production-scale operation.

## Future Directions

The case study mentions that future posts will explore platform primitives in more depth, developer experience for building workflows, and applications built on top of Flux including Flux Responder, an internal Slack agent. This suggests ongoing development and expansion of the platform's capabilities. The mention of Flux Responder indicates the platform is being used to build higher-level agent applications, not just execute individual tasks, which could represent the next phase of maturity in their LLMOps journey.
