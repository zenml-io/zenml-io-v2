---
title: "AI-Driven Development at Scale: Building a Firecracker MicroVM Platform with Autonomous Agents"
slug: "ai-driven-development-at-scale-building-a-firecracker-microvm-platform-with-autonomous-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "poc"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "evals"
  - "kubernetes"
  - "docker"
  - "cicd"
  - "microservices"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "devops"
  - "scaling"
  - "monitoring"
  - "api-gateway"
  - "fastapi"
  - "open-source"
  - "documentation"
  - "anthropic"
industryTags: "tech"
company: "Atlassian"
summary: "Atlassian built Fireworks, a Firecracker microVM orchestration platform on Kubernetes, in just four weeks using their Rovo Dev AI agent system with minimal human-written code. The challenge was to create a secure execution engine for Atlassian's AI agent infrastructure with advanced features like 100ms warm starts, live migration, and eBPF network policy enforcement—a project that would have been considered too complex and time-consuming for a traditional development approach. By treating AI agents as full engineering team members with end-to-end access to development, deployment, testing, and CI/CD pipelines, and establishing robust validation through AI-written e2e tests and progressive rollouts, they successfully delivered a production-ready platform that demonstrates how agentic workflows can fundamentally transform software development velocity and scope."
link: "https://www.atlassian.com/blog/rovo/rovo-dev-platform-driven-development"
year: 2026
seo:
  title: "Atlassian: AI-Driven Development at Scale: Building a Firecracker MicroVM Platform with Autonomous Agents - ZenML LLMOps Database"
  description: "Atlassian built Fireworks, a Firecracker microVM orchestration platform on Kubernetes, in just four weeks using their Rovo Dev AI agent system with minimal human-written code. The challenge was to create a secure execution engine for Atlassian's AI agent infrastructure with advanced features like 100ms warm starts, live migration, and eBPF network policy enforcement—a project that would have been considered too complex and time-consuming for a traditional development approach. By treating AI agents as full engineering team members with end-to-end access to development, deployment, testing, and CI/CD pipelines, and establishing robust validation through AI-written e2e tests and progressive rollouts, they successfully delivered a production-ready platform that demonstrates how agentic workflows can fundamentally transform software development velocity and scope."
  canonical: "https://www.zenml.io/llmops-database/ai-driven-development-at-scale-building-a-firecracker-microvm-platform-with-autonomous-agents"
  ogTitle: "Atlassian: AI-Driven Development at Scale: Building a Firecracker MicroVM Platform with Autonomous Agents - ZenML LLMOps Database"
  ogDescription: "Atlassian built Fireworks, a Firecracker microVM orchestration platform on Kubernetes, in just four weeks using their Rovo Dev AI agent system with minimal human-written code. The challenge was to create a secure execution engine for Atlassian's AI agent infrastructure with advanced features like 100ms warm starts, live migration, and eBPF network policy enforcement—a project that would have been considered too complex and time-consuming for a traditional development approach. By treating AI agents as full engineering team members with end-to-end access to development, deployment, testing, and CI/CD pipelines, and establishing robust validation through AI-written e2e tests and progressive rollouts, they successfully delivered a production-ready platform that demonstrates how agentic workflows can fundamentally transform software development velocity and scope."
notion:
  pageId: "34ef8dff-2538-81b1-93dd-c2db255b13fb"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:06:26Z"
---

## Overview

This case study from Atlassian describes a radical approach to software development using their Rovo Dev AI agent system to build Fireworks, a Firecracker microVM orchestration platform on Kubernetes, in just four weeks. The project represents a significant milestone in demonstrating how LLMs can be deployed as autonomous development agents in production environments, moving beyond code completion to full-stack software engineering. The text is notably promotional of Atlassian's Rovo product, so claims about productivity and velocity should be considered within that context. However, the technical details and workflow descriptions provide valuable insights into how organizations are structuring LLMOps for development scenarios.

The core achievement was building a comprehensive platform including a scheduler, autoscaler, node agents, envoy ingress layers, raft persistence, and advanced features like 100ms warm starts, live migration between hosts, eBPF network policy enforcement, shared volumes, snapshot filesystem restore, and sidecar sandboxes. According to the author, this level of complexity and scope would not have been committed to previously due to time constraints, complexity, and insufficient domain expertise on the team. The claim is that "even two months ago, I wouldn't have believed we'd have a Firecracker-based microVM platform with 100ms warm starts and live migration between hosts, built in four weeks, entirely by LLMs."

## Development Workflow and Agent Architecture

The development workflow centered on treating AI agents as full engineering partners rather than code completion tools. The author describes a simple but effective setup involving three workspaces, each checked out on different branches with an agent working independently, and split terminals allowing monitoring of agent work alongside manual verification. A key principle emphasized is "always have something running"—if agents are idle, productivity is being wasted. This suggests a pipeline approach where multiple agents work in parallel on different features or branches.

The philosophy of treating code as a black box is particularly interesting from an LLMOps perspective. Rather than reading and verifying every line of AI-generated code, the approach focuses on comprehensive validation via inputs and outputs. This represents a significant shift in software quality assurance practices and requires robust testing infrastructure to be viable. The sustainability of this approach at scale remains an open question, particularly regarding technical debt accumulation and long-term maintainability when humans become less familiar with implementation details.

## End-to-End Agent Integration

A critical aspect of the LLMOps implementation is providing agents with complete access to the software development lifecycle (SDLC), not just code generation. The agents are empowered to deploy and test in development environments, raise pull requests, spawn independent agents for self-review, address feedback, read pipeline output, and update tickets. This autonomous development loop allows agents to catch and fix their own mistakes iteratively without constant human intervention.

The integration with Atlassian's own products (Bitbucket and Pipelines) is highlighted as a "game changer," allowing agents to raise PRs, read diffs, and monitor builds without leaving the conversation context. This tight integration reduces context switching and enables truly autonomous workflows. However, this also represents vendor lock-in to Atlassian's ecosystem, which may not be replicable in organizations using different toolchains.

The practice of queuing prompts demonstrates strategic human oversight—reading what the agent is doing and anticipating when it will return to queue the next task. Common queued prompts include writing e2e tests and deploying to dev shards with iterative loops on issues, triggering PR reviews via `!review-PR` shortcuts, and creating PRs followed by addressing CI feedback and bot comments. This represents a hybrid human-AI workflow where humans act as orchestrators and architects while agents handle implementation details.

## Skills and Specialization

Skills are described as domain-specific or repo-specific capabilities that extend agent functionality for particular tasks. Internally, Atlassian built numerous skills for handling PRs, using CLI tools, and specific technical domains like Raft and gRPC. Notably, they developed a meta-workflow/orchestration skill specifically for Fireworks development that provides "golden path" loops for working on changes end-to-end rather than performing narrow technical tasks. This suggests a layered approach to agent capabilities, with higher-level orchestration skills coordinating lower-level technical skills.

Another significant skill automates deploying, operating, and tearing down isolated Fireworks dev shards on a shared AWS Kubernetes cluster. This infrastructure-as-code capability demonstrates how agents can manage complex cloud environments autonomously, though it also raises questions about security, cost controls, and preventing runaway resource consumption.

## Subagents and Adversarial Review

The use of subagents or personas represents an interesting pattern in multi-agent LLMOps. For code review, an adversarial persona subagent is spawned to independently review what the main development agent has written. This is implemented as a prompt shortcut (`!review-pr`) that triggers an independent subagent with presumably different system prompts or personas designed to critically evaluate code rather than generate it. This multi-agent approach to quality assurance mimics human team dynamics where developers and reviewers have different mindsets and incentives.

The effectiveness of AI reviewing AI-generated code is debatable. While agents may catch certain classes of errors (logic bugs, inconsistencies with specifications, security vulnerabilities), they may also share similar blind spots, particularly regarding context that wasn't explicitly provided in prompts. The value proposition seems to be catching obvious issues before human review, reducing reviewer burden rather than replacing human judgment entirely.

## Validation and Quality Assurance

With minimal hand-written code, the validation strategy becomes paramount. The approach relies heavily on AI-written e2e tests, where the agent writes tests, deploys to a dev shard, runs them, and loops on failures until they pass. The test suite serves as the primary proof that functionality works correctly. This creates an interesting dependency: the quality of validation depends on the quality of AI-written tests, which themselves may have gaps or blind spots.

The dev shard loop is a critical component where every feature gets deployed to an isolated development shard on a real Kubernetes cluster. The agent performs the full cycle: deploy, test end-to-end, fix issues, redeploy. This catches integration issues that unit tests miss and provides realistic validation in an environment that closely mirrors production. The infrastructure requirements for maintaining isolated dev shards for potentially multiple concurrent agent workflows are substantial and represent a significant investment in the LLMOps platform.

The CI/CD pipeline functions as an automated quality gate, running lint, vet, tests, and Helm validation on every PR. Critically, the agent reads pipeline output and addresses failures before requesting review. This autonomous failure remediation is a key capability that distinguishes this approach from simpler code generation tools. However, it also means that failed CI runs consume resources and time, so agent accuracy in predicting what will pass CI is important for efficiency.

Progressive rollout practices include deploying main branch changes to dev environments without peer review/green build (PRGB) requirements for faster internal validation, while production deployments use canary deploys across multiple clusters. This tiered risk management approach balances velocity with safety. The decision to bypass peer review for dev deployments is controversial and depends heavily on having robust automated testing and isolation between environments.

Black box validation is emphasized: testing outputs rather than reading code. Examples include submitting jobs to verify 100ms boot times, testing that migration preserves state, and confirming network policies block traffic as expected. This outcome-focused approach is pragmatic given the volume of AI-generated code, but it may miss subtle implementation issues that surface later or under edge cases not covered by tests.

## Team and Process Adaptations

The case study argues that teams must become "agentic" themselves to fully benefit from AI-driven development. If human review is the bottleneck, throughput is limited by the slowest reviewer. The recommendation is to embrace AI-assisted reviews and shift human attention to high-level concerns like architecture, design intent, and risk rather than implementation details. This represents a significant cultural shift and requires trust in automated validation.

The production branching model where main deploys to dev without peer review is positioned as necessary for velocity, especially in multi-timezone teams where waiting hours for human PR approval creates delays. However, this assumes high confidence in automated validation and may not be appropriate for all contexts, particularly safety-critical systems or highly regulated environments.

The recommendation to "invest in your AI setup" by spending significant time on repo AI configuration, skills, agent definitions, and memory files is important. These are described as "living systems" that require continuous updates rather than one-time setup. This ongoing maintenance represents a new category of work that teams must resource and prioritize. The effort required and the expertise needed to effectively configure these systems may create new bottlenecks or require specialized roles.

## Role Evolution and Human-AI Collaboration

The author describes their role transformation to architect and builder, working with AI to explore architecture options and letting it suggest implementation details while providing domain knowledge guidance. This positions humans as strategic thinkers and agents as tactical executors. The recommendation to read along with the agent's "thinking" during important work suggests maintaining situational awareness without necessarily writing code directly.

The practice of "talking to your code through the agent" by asking it to explain how things work or suggesting improvements represents a conversational interface to the codebase. This could be valuable for onboarding, documentation, or exploring unfamiliar areas, but it also creates dependency on the agent for understanding code that may have been generated by that same agent, potentially creating circular knowledge dependencies.

The emphasis on explaining the "why" behind desired changes to leverage model knowledge for contextualization suggests sophisticated prompt engineering where goals are specified at a higher level of abstraction rather than prescriptive implementation instructions. This approach could lead to better outcomes but requires clarity in communicating intent and may produce unexpected implementations when the agent's interpretation differs from the human's intention.

## Risk Mitigation Strategies

The risk mitigation strategy shifts from manual code review to structural safeguards. CI/CD pipelines serve as automated quality gates, sharding limits blast radius of individual changes, RBAC and just-in-time access control who and what can write to production, progressive rollouts and canary deploys manage deployment risk, and AI-written e2e tests provide the primary validation harness. The recommendation that "if you're reading any code, read the tests" is pragmatic given volume constraints but assumes tests are comprehensive and correct.

This approach has strengths in automation, consistency, and scale, but it also has potential weaknesses. If agents share systematic biases or blind spots, they may propagate through both implementation and testing. Security vulnerabilities that agents don't recognize may not be caught if human review is minimal. The long-term maintainability of a codebase where few humans understand implementation details is uncertain. The effectiveness of this approach likely depends heavily on the maturity of the organization's testing culture, infrastructure automation, and observability practices.

## Product Integration and Tooling

The integration with Atlassian products (Rovo, Bitbucket, Pipelines) is presented as a key enabler. The "all-in-one access" allowing agents to raise PRs, read diffs, and monitor builds within the conversation context is described as making Rovo Dev a "seriously compelling daily driver." This suggests that the platform's value comes not just from the LLM capabilities but from the orchestration layer that integrates various development tools and workflows.

From an LLMOps perspective, this represents a significant engineering investment in building connectors, maintaining API integrations, handling authentication and authorization, and managing state across multiple systems. Organizations attempting to replicate this approach would need similar investments in integration infrastructure, which may be a barrier to adoption for smaller teams or those using heterogeneous toolchains.

## Outcomes and Claims Assessment

The stated outcome is building systems previously considered infeasible due to complexity, timeline, and expertise constraints. The specific claim is a Firecracker-based microVM platform with 100ms warm starts and live migration, built in four weeks entirely by LLMs. While impressive if accurate, several caveats should be considered:

The text doesn't specify how many human-hours were invested in prompting, reviewing, debugging, and configuring the agents, so "four weeks" may refer to calendar time rather than effort. The quality, performance, and completeness of the delivered system compared to what experienced human engineers might build is not evaluated. The long-term maintainability and technical debt implications are not addressed. The text is promotional content for Rovo, so there's inherent bias toward presenting the approach in the most favorable light.

Nevertheless, the case study provides valuable insights into how organizations are structuring LLMOps for development workflows. The emphasis on end-to-end agent integration, autonomous testing and deployment loops, multi-agent architectures, and shifting validation from code review to outcome verification represents a coherent vision for AI-augmented development, even if real-world results may vary from the promotional narrative.

## LLMOps Considerations and Open Questions

This case study raises several important LLMOps considerations. The infrastructure requirements for supporting multiple concurrent autonomous agents with isolated development environments are substantial. The agent orchestration layer that manages skills, subagents, prompt shortcuts, and multi-step workflows represents significant platform engineering. The monitoring and observability needed to track agent activities, debug failures, and optimize workflows is not discussed but would be critical in practice.

The approach assumes relatively high LLM accuracy and reliability. Token costs for the volume of code generation, test writing, deployment automation, and iterative debugging loops could be substantial depending on models used. Latency in agent responses could impact overall development velocity. The text doesn't discuss which models are used, how they're deployed (cloud APIs vs. self-hosted), or how costs are managed.

The security implications of giving agents autonomous access to raise PRs, deploy to environments, modify infrastructure, and read potentially sensitive code and data are significant. The mention of RBAC and JIT access suggests awareness of these concerns, but details on implementation are lacking. The potential for agents to introduce vulnerabilities, leak sensitive information in logs or comments, or make unauthorized changes would need careful management.

The human experience and team culture aspects are touched on but not deeply explored. Not all developers may be comfortable with or effective at this mode of work. The learning curve for effective prompt engineering, agent configuration, and workflow optimization could be steep. The psychological impact of writing less code and focusing more on architecture and validation is a significant change that may not suit all developers or organizational cultures.

Overall, this case study represents an ambitious vision of AI-driven development that pushes boundaries on agent autonomy, multi-agent collaboration, and integration across the SDLC. While the promotional nature requires skeptical evaluation of specific claims, the architectural patterns and LLMOps practices described offer valuable insights for organizations exploring similar approaches. The long-term viability and generalizability of this approach across different contexts, teams, and problem domains remains to be proven through broader adoption and more objective evaluation.
