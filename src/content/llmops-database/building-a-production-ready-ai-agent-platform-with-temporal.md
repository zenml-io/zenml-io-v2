---
title: "Building a Production-Ready AI Agent Platform with Temporal"
slug: "building-a-production-ready-ai-agent-platform-with-temporal"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "structured-output"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "system-prompts"
  - "evals"
  - "human-in-the-loop"
  - "mcp"
  - "orchestration"
  - "monitoring"
  - "cicd"
  - "open-source"
  - "openai"
  - "anthropic"
industryTags: "education"
company: "Duolingo"
summary: "Duolingo faced the challenge of teams repeatedly rebuilding the same infrastructure around AI agents, leading to duplicated effort and inconsistent implementations. To solve this, they built a centralized agent platform that separates agent definition from execution, using Temporal workflows as the orchestration layer. Developers now define agents through a simple registry specifying system prompts, tools, and access requirements, while the platform handles execution, observability, orchestration, and evaluation automatically. This reduced agent creation time from weeks to approximately 10 minutes while ensuring all agents are production-ready with built-in durability, multi-entry-point invocation, and comprehensive evaluation capabilities."
link: "https://blog.duolingo.com/production-ready-ai-agent-platform/"
year: 2026
seo:
  title: "Duolingo: Building a Production-Ready AI Agent Platform with Temporal - ZenML LLMOps Database"
  description: "Duolingo faced the challenge of teams repeatedly rebuilding the same infrastructure around AI agents, leading to duplicated effort and inconsistent implementations. To solve this, they built a centralized agent platform that separates agent definition from execution, using Temporal workflows as the orchestration layer. Developers now define agents through a simple registry specifying system prompts, tools, and access requirements, while the platform handles execution, observability, orchestration, and evaluation automatically. This reduced agent creation time from weeks to approximately 10 minutes while ensuring all agents are production-ready with built-in durability, multi-entry-point invocation, and comprehensive evaluation capabilities."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-ready-ai-agent-platform-with-temporal"
  ogTitle: "Duolingo: Building a Production-Ready AI Agent Platform with Temporal - ZenML LLMOps Database"
  ogDescription: "Duolingo faced the challenge of teams repeatedly rebuilding the same infrastructure around AI agents, leading to duplicated effort and inconsistent implementations. To solve this, they built a centralized agent platform that separates agent definition from execution, using Temporal workflows as the orchestration layer. Developers now define agents through a simple registry specifying system prompts, tools, and access requirements, while the platform handles execution, observability, orchestration, and evaluation automatically. This reduced agent creation time from weeks to approximately 10 minutes while ensuring all agents are production-ready with built-in durability, multi-entry-point invocation, and comprehensive evaluation capabilities."
notion:
  pageId: "3b5f8dff-2538-80cf-b520-f7956a246d08"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T12:35:00.000Z"
  lastEditedTime: "2026-08-07T12:35:00.000Z"
  publishedAt: "2026-08-07T12:41:35Z"
---

## Overview

Duolingo's case study describes the development of a comprehensive AI agent platform designed to address the proliferation of duplicated infrastructure across teams building AI agents. The company observed that while prototyping agents locally is straightforward—writing prompts, providing tool access, and iterating—the productionization phase requires substantial surrounding infrastructure that teams were repeatedly rebuilding. This case study demonstrates a mature approach to LLMOps by recognizing that the hardest problems in deploying LLMs to production aren't the models themselves, but rather the infrastructure, orchestration, evaluation, and operational concerns that surround them.

The platform represents a thoughtful abstraction layer that decouples agent definition from execution, allowing teams to define what an agent does while the platform manages how it runs. By August 2026, this approach had reduced agent creation time from weeks to approximately 10 minutes while simultaneously ensuring production-readiness across all agents. The implementation leverages Temporal as the workflow orchestration engine, supports multiple LLM provider SDKs including OpenAI and Claude Agents SDKs, and includes sophisticated evaluation infrastructure for continuous improvement.

## The Problem: Infrastructure Proliferation

Duolingo identified three core pain points in their pre-platform agent development process. First, teams were recreating infrastructure from scratch for each new agent project, including setting up MCP (Model Context Protocol) servers, preparing credentials, cloning repositories, and loading project context. This infrastructure couldn't be easily reused across teams or platforms, leading to significant duplicated effort and inconsistent implementations.

Second, they faced a distribution problem where agents needed to be available across multiple surfaces—Slack, internal sites, CLI tools, and Temporal workflows. Without a shared execution layer, this meant rebuilding agents for each target platform, multiplying the maintenance burden.

Third, there was no standardized approach to providing agents with the orchestration, evaluation, and observability capabilities needed for production deployment. Each team had to solve these operational concerns independently, leading to varying levels of production-readiness and making it difficult to ensure quality and reliability across the organization.

## Architectural Solution: Agent Registry and Workflow Abstraction

The platform's core architecture separates agent definition from execution through a registry-based approach. Developers define agents by specifying three key elements: what the agent should do (system prompt), what tools it needs (which MCP servers to enable), and what it should access (which repositories to clone to its workspace). This definition is declarative and stored in a central registry, making agents reusable across the organization.

The agent definition structure includes the agent name, description, owner, system prompt, model selection (e.g., "gpt-5.5"), MCP server configurations, and output type specifications for structured responses. This abstraction ensures consistency while hiding complexity from developers who simply want to create functional agents.

The execution layer is handled by a Temporal workflow called `AgentWorkflow`, which serves as a wrapper abstracting away shared infrastructure and setup requirements. This workflow performs four primary functions: loading the agent's definition from the registry, preparing the execution environment (including credential setup, repository cloning, and MCP server initialization), running the agent using the appropriate LLM provider SDK, and returning the structured output.

From the caller's perspective, triggering an agent becomes remarkably simple—they only need to invoke the workflow with the agent name and user prompt as inputs. The platform handles all underlying complexity, including environment preparation, tool access, state management, and result persistence.

## Temporal as the Orchestration Foundation

The choice of Temporal as the workflow engine is particularly well-suited to agent workloads. Temporal is a durable workflow engine that persists state, provides safe retry mechanisms, and coordinates long-running work across distributed systems. These capabilities map naturally to agent requirements since agents can take several minutes to run, call external tools with varying latency and reliability, wait for human input in interactive scenarios, and fail in complex ways that require sophisticated retry logic and debugging capabilities.

By treating agent execution as a workflow rather than a one-off process, Duolingo gains several operational advantages. The workflow owns durable state and orchestration logic, ensuring that agent progress is never lost even in the face of infrastructure failures. Activities within the workflow handle side effects such as workspace preparation, repository cloning, tool invocations, and result persistence, with each activity benefiting from Temporal's built-in retry policies and failure handling.

Temporal's query capabilities allow real-time status inspection while workflows are running, providing observability into long-running agent executions. Additionally, Duolingo had already built substantial infrastructure around Temporal for triggering workflows from multiple entry points, which meant that agent workflows automatically inherited the ability to be invoked from Slack, internal sites, CLI tools, or other Temporal workflows without additional integration work.

## Runtime Support and SDK Integration

The platform's architecture supports multiple runtime implementations behind the same workflow abstraction. Initially supporting the Claude Agents SDK and Codex CLI, the platform later added support for the OpenAI Agents SDK without requiring changes to how agents were defined or invoked. This demonstrates the value of the abstraction layer—new capabilities can be added to the platform without disrupting existing consumers.

The addition of the OpenAI Agents SDK proved particularly impactful for operational characteristics. With Temporal's plugin, MCP tool calls become Temporal activities, which significantly improves system durability. Tool failures can leverage the same retry policies, state management, and failure handling as any other workflow activity, ensuring that transient failures don't derail entire agent executions. This integration also enhances observability, as every tool call—including inputs, outputs, failures, and retries—becomes visible in the Temporal UI, providing detailed insights into agent behavior.

The OpenAI Agents SDK also supports routing requests through a proxy, which Duolingo leveraged to integrate with their internal LLM Gateway. This gateway provides critical operational capabilities including cost tracking across teams and projects, usage tracking for capacity planning and optimization, and provider abstraction that allows switching between model providers behind a consistent interface. Rather than implementing separate SDK integrations for each model provider (OpenAI, Anthropic, Google, etc.), the platform routes all requests through the gateway, simplifying the codebase and centralizing operational concerns.

## Evaluation Infrastructure for Production Quality

Recognizing that reusable agents require mechanisms to assess whether they're improving or degrading over time, Duolingo built comprehensive agent evaluation infrastructure. This is particularly critical for agents that modify code, where the evaluation criteria extends beyond whether the output "sounds reasonable" to whether the agent made the correct changes with appropriate scope and safety.

The evaluation system runs real agents against authored test scenarios, capturing not just the agent's textual output but also file changes and git diffs before grading results. Evaluation cases are defined declaratively, specifying the agent name, test case identifiers, descriptions, input fixtures (including repository state and prompt files), and grading criteria.

Duolingo employs multiple types of graders to assess agent performance comprehensively. The `structured_output` grader validates fields in the agent's structured response, ensuring the agent correctly identifies whether it made changes, encountered errors, or determined no action was needed. The `diff_assertions` grader examines the actual repository diff, checking for required changes (e.g., specific imports that should be added), forbidden changes (e.g., patterns that indicate the agent took an incorrect approach), limits on the number of changed files (detecting over-broad changes), and restrictions on which paths can be modified (ensuring agents respect boundaries).

The `no_op_consistency` grader performs a critical validation: it checks that the agent's reported outcome matches the actual repository state. If the agent reports no change was needed but files were modified, the evaluation fails. Conversely, if the agent reports making a fix but the diff is empty, this also indicates a failure. This grader catches cases where the agent's self-assessment diverges from reality, which is important for building reliable autonomous systems.

While deterministic graders form the foundation of the evaluation system, Duolingo also supports an optional LLM-as-judge for cases where exact diff assertions would be too brittle. However, the case study explicitly notes that deterministic graders are prioritized, as they don't want their only signal to be "one model judging another model's work." This represents a balanced approach to evaluation—using LLM-based grading where appropriate while ensuring there are objective, reproducible criteria for most assessments.

The evaluation system itself runs on Temporal, providing the same durability and observability properties as production agent runs. The evaluation suite workflow loads test cases, starts child workflows for each case and repetition (allowing parallel execution and statistical validation through multiple runs), aggregates results across all cases, renders human-readable reports, and optionally saves runs to a dashboard for historical tracking and regression detection.

This architecture makes evaluations feel like a first-class part of the platform rather than an afterthought or local script. Long-running evaluation cases can continue executing without manual monitoring, failed cases are captured explicitly with full context for debugging, repetitions can run in parallel for faster feedback, and results persist for later review and comparison across platform versions or model updates.

## Impact and Production Use Cases

The platform has delivered substantial improvements in both velocity and quality. Agent creation time decreased from several weeks (when teams had to choose an SDK, learn its nuances, set up repository cloning, configure MCP servers, and wire up credentials) to approximately 10 minutes using an internal site where developers select MCPs, choose a model, and define a system prompt.

However, the case study correctly emphasizes that the time savings are only part of the impact. The more significant benefit is that every agent created through the platform automatically inherits production-ready capabilities: durability through Temporal's state persistence, observability through workflow and activity tracking, orchestration for complex multi-step processes, evaluation infrastructure for continuous improvement, and multi-entry-point invocation allowing the same agent to be used from different surfaces.

Agents also become more valuable because they can be discovered and used beyond the systems that created them. Once defined in the registry, agents can be leveraged by other teams, composed into other workflows, and eventually serve as tools for other agents, enabling increasingly sophisticated automation.

By August 2026, the platform powers multiple production workflows at Duolingo, including agents that automatically fix CI failures (diagnosing test failures and proposing code changes), address code review comments (understanding reviewer feedback and implementing requested changes), and support internal tools like a Slack bot for release managers. This bot represents a more complex use case where specialized agents are composed together to investigate crashes, identify relevant code changes, and summarize findings for human decision-makers.

## Critical Assessment and LLMOps Maturity

This case study demonstrates several hallmarks of mature LLMOps practice. The platform approach recognizes that the hard problems in deploying LLMs to production are predominantly infrastructure and operational concerns rather than model selection or prompt engineering. By solving these problems once at the platform level, Duolingo enables teams to focus on agent behavior and business logic rather than repeatedly solving operational challenges.

The separation of definition from execution is architecturally sound and enables independent evolution of the platform's capabilities without disrupting consumers. This abstraction allows Duolingo to upgrade to new model versions, switch provider SDKs, enhance observability tooling, or improve evaluation mechanisms without requiring changes to agent definitions or calling code.

The evaluation infrastructure is particularly noteworthy for its emphasis on deterministic, artifact-based grading rather than relying solely on LLM-as-judge approaches. Checking actual file diffs and validating consistency between agent outputs and repository state provides objective signals that are reproducible and debuggable. This is critical for building trust in automated systems, especially those that modify code.

However, readers should note that the case study is self-reported by Duolingo and presents an optimistic view of the platform's capabilities. The "10 minutes to create an agent" metric likely applies to relatively straightforward agents and may not account for the complexity of defining effective system prompts, selecting appropriate tools, or creating comprehensive evaluation cases. The claim that every agent is automatically "production-ready" should be understood as meaning the infrastructure is production-ready—the agent's actual behavior and reliability still depend on prompt quality, tool selection, and evaluation coverage.

The case study doesn't discuss failure modes or limitations in detail. Questions remain about how the platform handles agents that require custom tools not available through MCP, how it manages version compatibility when agents depend on specific repository or tool versions, or what happens when evaluation results are ambiguous or contradictory. The emphasis on automation and speed also raises questions about governance—how does Duolingo ensure agents are appropriately scoped, secure, and don't make unintended changes?

That said, the architectural choices appear sound and address real operational challenges in deploying AI agents at scale. The use of Temporal for orchestration leverages a proven workflow engine rather than building custom orchestration logic. Supporting multiple SDK runtimes provides flexibility and reduces vendor lock-in. The evaluation infrastructure, while still evolving, represents a significant investment in quality assurance beyond what many organizations implement.

## Future Directions

Duolingo identifies two primary areas for platform evolution. First, they're working on automating evaluation case creation from engineer feedback on agent results. This would enable a continuous, low-effort improvement loop where production usage automatically generates test cases that prevent regressions and guide model or prompt improvements. This approach could significantly reduce the overhead of maintaining evaluation suites while ensuring they remain relevant to real-world usage patterns.

Second, they're exploring agent orchestration where agents can trigger other agents as tools. Because agents run as Temporal workflows, they can be exposed as activities callable by other workflows, including other agent workflows. This opens possibilities for more sophisticated autonomous systems where specialized agents collaborate on complex tasks while Temporal manages durability and state for the entire multi-agent system.

These future directions suggest Duolingo is thinking beyond individual agents toward agent ecosystems and platforms for autonomous work. The technical foundation they've built—with durable workflows, comprehensive observability, and artifact-based evaluation—provides a reasonable basis for such systems, though the complexity of multi-agent coordination introduces new challenges around goal alignment, resource management, and failure recovery that aren't fully addressed in the case study.

## Broader Implications for LLMOps

The case study concludes with a philosophical point about abstractions and AI-generated code. Duolingo argues that good abstractions have always enabled developer velocity by solving complex problems once and wrapping them in clean interfaces. In the age of AI code generation, this becomes even more important because AI tools can rapidly generate code but don't automatically consider durability, observability, or evaluation. Without platform-level abstractions, every AI-generated agent becomes its own infrastructure problem, and the speed of generation creates technical debt rather than value.

Duolingo's platform represents an attempt to collapse the traditional tradeoff between moving fast and building production-ready systems. By moving infrastructure concerns into the platform, they enable both humans and AI tools to create agents quickly while ensuring what they build inherits production-ready capabilities automatically.

This perspective is valuable for the LLMOps community as it shifts focus from "how do we build an agent" to "how do we build a platform where agents are easy to create, operate, and improve." The investment in evaluation infrastructure, observability tooling, and durable orchestration pays dividends across every agent built on the platform rather than benefiting only a single project. This platform-oriented thinking represents a maturation of LLMOps practices from point solutions to systematic infrastructure for deploying language models at organizational scale.
