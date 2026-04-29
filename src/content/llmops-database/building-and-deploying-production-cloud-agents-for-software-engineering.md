---
title: "Building and Deploying Production Cloud Agents for Software Engineering"
slug: "building-and-deploying-production-cloud-agents-for-software-engineering"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "error-handling"
  - "kubernetes"
  - "docker"
  - "microservices"
  - "orchestration"
  - "devops"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "security"
  - "guardrails"
  - "monitoring"
  - "scaling"
  - "serverless"
industryTags: "tech"
company: "Cognition"
summary: "Cognition shares lessons learned from over two years of building Devin, their cloud-based AI software engineering agent, addressing the challenges enterprises face when deploying LLM-powered agents at scale. The company details technical infrastructure requirements including VM-level isolation for security (replacing container-based approaches), hypervisor-level state snapshotting to handle asynchronous engineering workflows, and orchestration systems managing thousands of concurrent sessions. Beyond infrastructure, they emphasize the organizational transformation required, including engineer fluency development, revised planning processes, and new code review standards. They cite Itaú bank as an example customer achieving 5-6x faster migrations, 70% auto-remediation of security vulnerabilities, and 2x test coverage increases after eleven months of deployment with nearly 17,000 engineers."
link: "https://cognition.ai/blog/what-we-learned-building-cloud-agents"
year: 2026
seo:
  title: "Cognition: Building and Deploying Production Cloud Agents for Software Engineering - ZenML LLMOps Database"
  description: "Cognition shares lessons learned from over two years of building Devin, their cloud-based AI software engineering agent, addressing the challenges enterprises face when deploying LLM-powered agents at scale. The company details technical infrastructure requirements including VM-level isolation for security (replacing container-based approaches), hypervisor-level state snapshotting to handle asynchronous engineering workflows, and orchestration systems managing thousands of concurrent sessions. Beyond infrastructure, they emphasize the organizational transformation required, including engineer fluency development, revised planning processes, and new code review standards. They cite Itaú bank as an example customer achieving 5-6x faster migrations, 70% auto-remediation of security vulnerabilities, and 2x test coverage increases after eleven months of deployment with nearly 17,000 engineers."
  canonical: "https://www.zenml.io/llmops-database/building-and-deploying-production-cloud-agents-for-software-engineering"
  ogTitle: "Cognition: Building and Deploying Production Cloud Agents for Software Engineering - ZenML LLMOps Database"
  ogDescription: "Cognition shares lessons learned from over two years of building Devin, their cloud-based AI software engineering agent, addressing the challenges enterprises face when deploying LLM-powered agents at scale. The company details technical infrastructure requirements including VM-level isolation for security (replacing container-based approaches), hypervisor-level state snapshotting to handle asynchronous engineering workflows, and orchestration systems managing thousands of concurrent sessions. Beyond infrastructure, they emphasize the organizational transformation required, including engineer fluency development, revised planning processes, and new code review standards. They cite Itaú bank as an example customer achieving 5-6x faster migrations, 70% auto-remediation of security vulnerabilities, and 2x test coverage increases after eleven months of deployment with nearly 17,000 engineers."
notion:
  pageId: "351f8dff-2538-8049-8ec2-f7e60acc2e7b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-29T06:57:00.000Z"
  lastEditedTime: "2026-04-29T06:57:00.000Z"
  publishedAt: "2026-04-29T13:46:12Z"
---

## Overview

This case study presents Cognition's experience building Devin, a production cloud agent system for software engineering, over a two-year period. The article is positioned as a technical blog post sharing lessons learned, published in April 2026, and provides both technical infrastructure insights and organizational deployment challenges. While the source is promotional material from Cognition marketing their Devin product, it offers valuable technical details about the practical challenges of deploying LLM-based agents at enterprise scale. The study references one concrete customer example—Itaú, Latin America's largest private bank—and mentions conversations with other unnamed enterprises attempting similar implementations.

## The Problem Context

Enterprises are increasingly interested in cloud agents for software engineering work, with many considering building their own systems rather than using existing platforms. The appeal is evident from public examples like Stripe detailing their homegrown cloud agent infrastructure, which make the undertaking appear achievable. However, Cognition argues that the complexity is significantly underestimated, requiring two distinct investment categories: technical infrastructure for secure, autonomous cloud execution, and organizational change management to make agents productive across engineering organizations.

## Technical Infrastructure Challenges

### Security Architecture: From Containers to VM Isolation

The natural starting point for most teams building cloud agents involves taking a CLI-based agent, containerizing it, and providing access to repositories and toolchains. While this successfully moves execution to the cloud, Cognition identifies a critical security vulnerability: containerized agents share a kernel, creating a scenario where one compromised session can access other containers' filesystems, credentials, and network connections. Given that agents generate their own code, execute arbitrary commands, and probe environments unpredictably, kernel-level escapes represent real security threats rather than theoretical concerns.

Cognition's solution aligns with industry consensus for untrusted code execution: VM-level isolation where each workload receives its own kernel with no shared attack surface. Their implementation involved over a year of hypervisor engineering to build microVMs, ensuring every agent session runs on a dedicated kernel with fully isolated storage, networking, and compute resources. An additional benefit of this VM-based approach is that agents can utilize full browsers, desktop applications, and arbitrary tool stacks, matching the capabilities available to developers on their workstations. This represents a significant LLMOps consideration—the execution environment must be sufficiently rich to support the breadth of tasks an LLM-powered agent might attempt while maintaining security boundaries.

### State Persistence and Asynchronous Workflows

A fundamental limitation of containerized agent approaches emerges when handling real engineering workflows that span asynchronous gaps. Software development rarely involves continuous, uninterrupted work—agents open pull requests, wait on CI results, respond to code review, rerun tests, and push follow-up commits, with minutes, hours, or sometimes days between each step. For bounded tasks like dependency upgrades, single-pass agents that complete and exit suffice, but work spanning the asynchronous gaps of the software development lifecycle remains beyond reach of traditional container approaches.

The core issue is that containers lack reliable mechanisms to snapshot an individual container's full state, shut down compute resources, and restore later. Containerized agents can only survive async breaks by continuously burning compute to stay alive, and if containers are rescheduled, time out, or crash, the entire session is lost. This represents a critical LLMOps challenge—production agent systems must handle interruptions gracefully while managing compute costs efficiently.

Cognition's solution involves snapshotting full machine state at the hypervisor level, including memory, process trees, and filesystems. Compute shuts down while agents are idle, and sessions resume exactly where they left off when CI results or review comments arrive. According to their account, making this work reliably across thousands of concurrent sessions, each with different repositories, dependencies, and runtime environments, took longer than any other infrastructure component they built. This highlights a key LLMOps principle: the stateful, long-running nature of production AI agent systems differs fundamentally from traditional stateless API-based LLM deployments.

### Orchestration, Governance, and Integration Infrastructure

Scaling from individual agent sessions to hundreds across an engineering organization requires dedicated infrastructure for orchestration, governance, and integrations—each described as multi-quarter infrastructure projects. Cognition references a "leading cloud data platform company" that attempted this and ultimately abandoned the effort when project scope overwhelmed their infrastructure team. The specific challenges identified include:

**Orchestration complexity:** Each agent session is unique, tied to specific tasks and individual engineer permissions. Running hundreds concurrently requires provisioning the correct environment for each session, routing sessions appropriately, predicting demand to maintain warm VM pools, and keeping every provisioned environment current as codebases change daily. Cognition's orchestration layer solution took over three quarters of dedicated engineering effort and manages thousands of concurrent VMs, handling provisioning, demand prediction, crash recovery, and teardown. This represents significant LLMOps infrastructure investment beyond the LLM models themselves.

**Governance requirements:** Each session must inherit the dispatching engineer's permissions across every system it accesses, with all actions recorded in tamper-evident audit trails. Building and maintaining identity chaining, access scoping, and audit logging at enterprise scale constitutes its own engineering project requiring ongoing maintenance. This governance layer is particularly critical for LLM-based systems where agent actions are less predictable than traditional software, making comprehensive audit trails essential for debugging, compliance, and security investigations.

**Integration surface area:** Agent utility is limited by the systems they can access—CI platforms, monitoring tools, package registries, documentation, source control—each with distinct authentication models, permission scoping, and maintenance burdens. Cognition cites Stripe's internal MCP (Model Context Protocol) server with over 400 tools as representative of the investment scale required. This integration challenge is specific to LLM agents operating in production environments where they must interact with the full breadth of enterprise tooling, not just isolated APIs.

Cognition emphasizes that the combined surface area becomes untenable—not individual pieces, but the requirement that all three layers be built, integrated, and maintained indefinitely. They currently staff a dedicated team for each layer, suggesting significant ongoing operational overhead beyond initial development.

## Organizational Transformation and Change Management

Beyond technical infrastructure, Cognition identifies a second phase focused on transforming how engineering organizations work with agents—a process that cannot begin until agents are deployed. This organizational dimension of LLMOps is often overlooked in technical discussions but appears critical to realizing value from production agent deployments.

### Process Redesign for Agent-Augmented Work

Every engineering process within enterprises was designed assuming humans perform the work: project scoping, team staffing, code review, and shipping processes. When agents execute a significant share of work, these processes require rebuilding around a different operating model where agents execute while humans direct, review, and decide. This transformation is both technical and operational, requiring people who understand engineering systems and the business processes around them—many of which are deeply embedded and often undocumented.

**Engineer fluency development:** Engineers must learn which work to delegate versus retain, and how to define tasks precisely enough for agents to execute without constant correction. Cognition frames managing concurrent agent sessions as a fundamentally different skill from writing code, taking months of practice on real projects to develop. This represents a critical LLMOps consideration—successful deployment requires user training and skill development, not just system deployment.

**Planning and resource allocation:** Assumptions about team sizing, sprint capacity, and project staffing change when agent capacity enters equations. These aren't one-time decisions but require continuous revision as agents become more capable and engineers more fluent. This dynamic nature of agent capabilities—presumably improving as underlying LLMs improve and as organizations accumulate agent usage patterns—creates ongoing planning challenges distinct from traditional software tooling.

**Review and quality standards:** The volume of code requiring review increases dramatically, but review processes designed for human-authored code don't transfer cleanly. Teams must establish what rigorous review means for agent-produced work at much higher volumes. This quality assurance challenge is particularly relevant for LLMOps—LLM outputs require different verification approaches than traditional software, and at scale this becomes an organizational process challenge, not just a technical one.

Cognition emphasizes that few changes can be designed in advance; teams develop fluency by operating with agents on real projects over months. Starting earlier means organizations are further along the learning curve, with that gap widening over time. This suggests a competitive dynamic where early LLM agent adopters gain increasing advantages through accumulated organizational learning.

## Concrete Customer Results

The case study cites Itaú, Latin America's largest private bank, as a concrete example. After eleven months with nearly 17,000 engineers using the system, they report:

- Migrations completed 5-6x faster
- 70% auto-remediation of static-analysis security vulnerabilities  
- 2x increase in test coverage

While these metrics are compelling, the case study provides limited detail on measurement methodologies, baseline comparisons, or what specific work the agents performed. The security vulnerability remediation and test coverage improvements suggest agents are being applied to code quality and maintenance tasks rather than entirely new feature development. The migration acceleration metric implies agents are effective at well-defined, repetitive transformation tasks. However, without additional context on what percentage of engineering work involves agents, what tasks proved most successful, or what challenges emerged, these results should be interpreted cautiously.

## Critical Assessment and LLMOps Implications

This case study provides valuable insights into production LLM agent deployment challenges, but readers should consider several factors:

**Source bias:** This is marketing content from Cognition promoting their Devin product. The framing consistently positions building in-house as extremely difficult while implicitly suggesting their platform as the solution. The anonymous reference to a "leading cloud data platform company" that failed cannot be verified. The technical challenges described are plausible and align with known infrastructure complexities, but the degree of difficulty may be overstated to discourage in-house development.

**Limited technical specificity:** While the case study describes architectural approaches (VM isolation, hypervisor-level snapshotting, orchestration systems), it provides minimal technical detail on implementation. There's no discussion of which hypervisor technology they use, how state snapshotting is implemented, what orchestration frameworks they employ, or how LLM inference itself is managed and scaled. For an LLMOps perspective, critical details are missing: which LLM models power the agents, how prompting strategies evolved, how agent reliability is measured, how hallucinations or errors are detected and prevented, or what evaluation frameworks guide agent improvements.

**The "agent" abstraction:** The case study treats agents as black boxes, focusing entirely on infrastructure for running them rather than the LLM components themselves. There's no discussion of prompt engineering, retrieval-augmented generation for accessing codebases, multi-step reasoning approaches, tool use patterns, or how agent capabilities have improved over their two-year development period. This infrastructure-heavy framing is useful for understanding deployment challenges but provides limited insight into the LLM techniques that make agents effective.

**Organizational change claims:** The emphasis on months-long learning curves and fundamental process redesign may be accurate but serves Cognition's commercial interests by suggesting that deploying agents requires extended engagements. The lack of detail on what specific training or process changes proved most valuable limits actionable insights for organizations considering similar deployments.

**Scalability evidence:** While Cognition claims their orchestration system manages "thousands of concurrent VMs," there's limited evidence of customer scale beyond Itaú's 17,000 engineers. Whether those engineers are actively using agents concurrently, how many agent sessions run simultaneously, or what resource costs this infrastructure requires remains unclear.

## Key LLMOps Takeaways

Despite these limitations, several important LLMOps principles emerge:

**Security architecture for generative agents differs from traditional applications.** LLM agents that generate and execute arbitrary code require stronger isolation than typical containerized workloads. VM-level isolation appears to be the appropriate security boundary, representing significant infrastructure investment beyond simple LLM API deployments.

**State management for long-running agent sessions is non-trivial.** Production agent systems must handle asynchronous workflows spanning hours or days, requiring sophisticated state persistence beyond typical stateless LLM API calls. This represents a fundamental architectural difference between simple LLM integrations and autonomous agent systems.

**Production LLM agents require extensive integration infrastructure.** The value of agents scales with the systems they can access, creating large integration surfaces with ongoing maintenance requirements. This integration challenge distinguishes production agent deployments from experimental or isolated LLM applications.

**Organizational adoption is a first-class LLMOps concern.** Technical infrastructure alone is insufficient; realizing value requires organizational process changes, user skill development, and evolved quality standards. This human-in-the-loop dimension distinguishes LLM agent deployment from traditional software rollouts.

**The infrastructure investment is substantial.** Whether Cognition's specific claims about development timelines are accurate or not, deploying production LLM agents clearly requires significant engineering investment in infrastructure, security, orchestration, and governance—beyond the LLM models themselves.

This case study represents valuable documentation of production LLM agent deployment at enterprise scale, even accounting for its promotional nature. The infrastructure challenges described align with known complexities in running untrusted code, managing stateful distributed systems, and integrating with diverse enterprise tooling. The organizational transformation emphasis provides useful balance to purely technical LLM discussions. However, the limited technical specificity about LLM techniques, evaluation approaches, and actual implementation details constrains its value as a pure technical reference, positioning it more as a high-level overview of deployment considerations than a detailed LLMOps playbook.
