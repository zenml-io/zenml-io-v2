---
title: "Operating Long-Running Claude Agents in Production"
slug: "operating-long-running-claude-agents-in-production"
draft: false
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "high-stakes-application"
  - "legacy-system-integration"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "memory"
  - "mcp"
  - "error-handling"
  - "human-in-the-loop"
  - "cost-optimization"
  - "system-prompts"
  - "evals"
  - "monitoring"
  - "security"
  - "guardrails"
  - "compliance"
  - "reliability"
  - "scalability"
  - "orchestration"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Anthropic"
summary: "Anthropic is developing the platform infrastructure required to move Claude from human-in-the-loop chat interactions to autonomous, long-running agents that can complete knowledge-work tasks. Its managed-agent approach provides a durable agent runtime, secure and disposable execution sandboxes, tool and MCP connectivity, state management, recovery from errors, and observability, while preserving higher-level controls for developers to customize prompts, skills, and workflows. The approach is intended to reduce undifferentiated infrastructure work and improve agent reliability, security, and cost efficiency, although the discussion provides limited independently verifiable production metrics and emphasizes that enterprise integrations, workflow redesign, and trust controls remain substantial responsibilities."
link: "https://www.youtube.com/watch?v=YlirATSmqmI"
year: 2025
seo:
  title: "Anthropic: Operating Long-Running Claude Agents in Production - ZenML LLMOps Database"
  description: "Anthropic is developing the platform infrastructure required to move Claude from human-in-the-loop chat interactions to autonomous, long-running agents that can complete knowledge-work tasks. Its managed-agent approach provides a durable agent runtime, secure and disposable execution sandboxes, tool and MCP connectivity, state management, recovery from errors, and observability, while preserving higher-level controls for developers to customize prompts, skills, and workflows. The approach is intended to reduce undifferentiated infrastructure work and improve agent reliability, security, and cost efficiency, although the discussion provides limited independently verifiable production metrics and emphasizes that enterprise integrations, workflow redesign, and trust controls remain substantial responsibilities."
  canonical: "https://www.zenml.io/llmops-database/operating-long-running-claude-agents-in-production"
  ogTitle: "Anthropic: Operating Long-Running Claude Agents in Production - ZenML LLMOps Database"
  ogDescription: "Anthropic is developing the platform infrastructure required to move Claude from human-in-the-loop chat interactions to autonomous, long-running agents that can complete knowledge-work tasks. Its managed-agent approach provides a durable agent runtime, secure and disposable execution sandboxes, tool and MCP connectivity, state management, recovery from errors, and observability, while preserving higher-level controls for developers to customize prompts, skills, and workflows. The approach is intended to reduce undifferentiated infrastructure work and improve agent reliability, security, and cost efficiency, although the discussion provides limited independently verifiable production metrics and emphasizes that enterprise integrations, workflow redesign, and trust controls remain substantial responsibilities."
notion:
  pageId: "3d1f8dff-2538-80ee-91eb-d2784aaac615"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-04T07:45:00.000Z"
  lastEditedTime: "2026-09-04T07:45:00.000Z"
  publishedAt: "2026-09-04T08:05:54Z"
---

## Overview
Anthropic is building Claude as a production platform for long-running agents rather than only as a conversational model. The central operational problem is that increasingly capable models can work for extended periods and complete multi-step tasks, but doing so reliably requires substantially more than a prompt and a model endpoint. Agents need durable execution, safe environments for tool use, recoverable state, secure access to external systems, cost controls, and enough observability for organizations to determine whether work was completed correctly.

Anthropic’s managed-agent strategy packages much of this undifferentiated infrastructure behind higher-level abstractions while retaining lower-level access for teams that need tighter control. Developers can supply system prompts, skills, MCP connections, and other domain-specific behavior without having to repeatedly implement the core agent loop, sandbox lifecycle, credential handling, and persistence mechanisms. The approach is positioned as a way to let builders focus on customer-specific workflows and business outcomes. The available discussion describes architectural principles and examples rather than a conventional customer case study with independently audited accuracy, latency, adoption, or cost metrics, so the benefits should be treated as reported product and engineering experience rather than proven universal results.

## Problem
Earlier model applications commonly kept a human in the loop for each meaningful action. A user would provide a narrowly specified task, inspect the result, correct mistakes, and direct the model toward the next step. As models became better at sustained reasoning and tool use, this interaction pattern became a constraint. The desired abstraction shifted from “edit these cells in this spreadsheet” to “prepare a discounted cash flow analysis for this company and determine whether it is attractive at the right price.” That broader instruction requires an agent to open and manipulate tools, perform calculations, check its own work, retry when necessary, and return an outcome without constant user intervention.

This change creates an LLMOps problem. A long-running agent must survive interruptions, preserve conversational and task state, manage credentials, operate within explicit security boundaries, and recover when a tool call, network connection, or execution environment fails. The model may be capable of completing the task, but the surrounding system determines whether the task can run safely and consistently in production. Anthropic also identifies cost optimization as a systems problem: token counts alone do not capture the value of a response if a more capable model completes a task correctly with fewer retries and less wasted execution.

## Architecture
The basic harness is an execution loop that retains a model interaction and coordinates user input, model responses, tool calls, and subsequent iterations. In simplified form, the core behavior resembles:

```text
while task_is_active:
    response = model(context, available_tools)
    result = execute_tools_safely(response.tool_calls)
    context = update_state(response, result)
```

A production harness extends this loop with durable state, tool and environment management, secure credential injection, error handling, and controls for stopping or resuming work. Anthropic uses “harness” broadly, sometimes encompassing much of the application around the core loop. The more basic runtime is distinct from higher-level coordination strategies that assign different roles to agents or models.

A key architectural choice is to separate the durable agent controller from the environment in which potentially risky work executes. The agent’s “brain” or harness can run on durable server infrastructure, while tool execution takes place in an isolated sandbox or container. The sandbox can be created for a unit of work and removed afterward. If an execution sandbox dies or loses connectivity, the durable agent does not necessarily have to terminate with it; it can recover, retry, or create another execution environment. This separation addresses the mismatch between ephemeral sandbox technology and the requirements of long-running workflows.

The design also treats external connectivity as a controlled boundary. Managed agents can connect to external systems through MCP, and Anthropic describes MCP tunnel capabilities for reaching MCP servers located behind a firewall. Secure credentials should be injected at the point of use without exposing the underlying secrets to the model. Organizations can also bring their own sandbox, allowing them to retain greater control over where code executes and how sensitive data is handled.

Anthropic places its model-serving layer and safety classifiers among the components it continues to operate directly. The Messages API is described as a primitive interface that exposes access to model tokens, while managed agents provide a higher-order abstraction. The company’s stated direction is to make more of the architecture self-hostable or interoperable over time, particularly infrastructure components, while remaining opinionated about the overall architecture and model-related safety behavior rather than requiring a single infrastructure implementation.

## Agent Strategies and Evaluation
The platform concept extends beyond a single executor repeatedly calling tools. Anthropic describes assigning tokens different jobs so that the system can improve quality or efficiency without relying exclusively on brute-force execution. One pattern is advising: a smaller or less expensive model performs the main task and consults a larger model when it reaches a difficult point. The discussion reports internal evaluations in which Sonnet executing with Opus advising approached Opus-level performance at lower cost than using Opus for the entire task. This is presented as an observed strategy, not as a guarantee across workloads.

Another pattern is outcome-based grading. A developer specifies a rubric for what good work looks like; an executor produces an attempt, and a separate grader determines whether it meets the rubric. If it does not, the workflow can continue or retry. This separates generation from assessment and creates an explicit quality-control stage, but it also introduces grader reliability, rubric design, additional inference cost, and the possibility that an imperfect grader accepts a flawed result or rejects a useful one.

Anthropic also mentions “dreaming” or retrospective improvement, in which prior sessions are reviewed and used to write memories or skills that improve later performance. Persistent memory can reduce repeated instruction and increase personalization, but it requires governance around stale, incorrect, sensitive, or unintended information. In the described personal workflow, corrections are explicitly saved so that Claude can avoid repeating known mistakes. In an enterprise setting, this pattern would need authorization, retention, deletion, and audit controls.

These strategies imply that evaluation must cover more than model response quality. A production program would need to inspect task completion, tool-call correctness, recovery behavior, security-policy compliance, escalation behavior, grader agreement, and total cost for the business outcome. The discussion emphasizes observability so operators can inspect what the agent did and verify that it acted as intended. It does not provide a complete evaluation methodology or quantitative service-level objectives, so those remain implementation requirements for adopters.

## Security, Trust, and Operations
Trust is described as having at least two layers. The first is architectural: the agent must operate inside the customer’s security boundaries, particularly when it can touch production systems or sensitive internal data. Sandboxing, customer-controlled execution environments, protected credentials, network controls, and explicit permissions are therefore foundational rather than optional enhancements. The second is operational visibility. Users need to audit execution, understand whether the agent completed the requested work, inspect failures, and determine whether retries or escalations were appropriate.

Long-running autonomy increases the importance of termination and recovery controls. A useful deployment should be able to stop an agent, resume it from durable state, limit the actions it can take, and escalate when it encounters an uncertain or high-impact decision. The material indicates that Anthropic is working to provide observability and tooling, but also acknowledges that customers will need to integrate these capabilities with their own systems. This is an important qualification: a managed runtime can reduce infrastructure burden, but it does not eliminate enterprise identity, authorization, audit, compliance, incident response, or data-governance work.

## Adoption Guidance and Tradeoffs
Anthropic recommends starting with a managed-agent abstraction rather than immediately building a custom harness. This gives teams a relatively simple way to test whether a long-running process can deliver a useful outcome, while exposing controls such as system prompts, skills, and MCP connections. Teams with mature requirements can move toward lower-level primitives and tune details such as prompt caching and context management. This staged approach reduces initial engineering effort, though it creates a tradeoff between speed and platform dependence: teams gain faster experimentation but may later need migration or deeper integration work if they require specialized scheduling, hosting, networking, compliance, or model portability.

The speakers caution against attempting to automate an entire complex human process as a first project. A large workflow such as bank KYC may contain undocumented policies, exception handling, and human judgments that are difficult to reproduce by inserting an agent wherever a person appears inefficient. A more promising approach is to choose an ambitious outcome, decompose it into smaller autonomous units, and redesign the workflow around what an agent can reliably complete. The agent should ideally finish a bounded task and escalate only when necessary, rather than imitate every step of a historically accumulated human process.

Cost management is similarly outcome-oriented. Using a smaller model is not automatically cheaper if it requires more tokens, retries, supervision, or corrective work. Conversely, using a larger model for every step may be wasteful when only a small part of the task requires advanced reasoning. Advising, grading, memory, and other role-based strategies seek better intelligence per dollar, but their effectiveness is workload-dependent and should be established through task-level evaluations and end-to-end cost accounting rather than token price alone.

## Results and Assessment
Anthropic reports that its platform team supports large-scale first-party and external use of the same underlying APIs and has achieved substantial leverage from agents in internal work. Examples include using managed agents to explore how customers use different products and using agents to preserve personal preferences and corrections. The broader claimed result is that long-running agents can make knowledge workers more productive across areas such as finance, healthcare, and general enterprise knowledge work. The material does not identify a named external deployment with measured business results, nor does it establish that managed agents solve reliability or safety for every production scenario.

The strongest lesson is architectural: as models become capable of sustained execution, the differentiating engineering work moves from narrowly steering individual responses toward durable orchestration, secure tool execution, recovery, evaluation, and outcome management. Managed agents can make these capabilities accessible sooner and allow application teams to focus on domain-specific value. However, production readiness still depends on careful workflow decomposition, robust evaluations, customer-controlled security boundaries, observability, human escalation, and evidence that the resulting system improves the intended business outcome at an acceptable risk and cost. Anthropic’s small, cross-functional “tiger team” operating model is presented as a way to address rapidly changing safety, infrastructure, and scale problems, but it is an organizational practice rather than a substitute for these technical controls.
