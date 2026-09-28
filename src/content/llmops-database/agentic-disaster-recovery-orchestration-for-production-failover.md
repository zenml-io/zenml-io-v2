---
title: "Agentic Disaster Recovery Orchestration for Production Failover"
slug: "agentic-disaster-recovery-orchestration-for-production-failover"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "structured-output"
  - "agent-based"
  - "harness-engineering"
  - "prompt-engineering"
  - "system-prompts"
  - "error-handling"
  - "fallback-strategies"
  - "human-in-the-loop"
  - "mcp"
  - "cost-optimization"
  - "kubernetes"
  - "monitoring"
  - "api-gateway"
  - "databases"
  - "orchestration"
  - "serverless"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "langchain"
  - "amazon-aws"
industryTags: "finance"
company: "Intuit"
summary: "Intuit extended its deterministic Ecosystem Wide Orchestrator Kit (EWOK) disaster-recovery platform with EWOK Agent, an Amazon Bedrock-based agent that interprets plain-language failover requests, selects versioned operational skills, validates readiness and policy gates, and invokes audited EWOK APIs. The architecture deliberately limits the model to deciding what operation is appropriate while conventional executors determine how production actions are authenticated and performed. Intuit reports that teams had used the agent for eight months and that EWOK-supported failovers already reduced execution time from several hours to about 20 minutes; however, the source does not provide independent measurements of the agent’s accuracy, incident reduction, cost, or failure rate, and the implementation examples are illustrative rather than a complete deployable system."
link: "https://aws.amazon.com/blogs/machine-learning/how-intuit-built-an-agentic-disaster-recovery-assistant-with-amazon-bedrock/"
year: 2026
seo:
  title: "Intuit: Agentic Disaster Recovery Orchestration for Production Failover - ZenML LLMOps Database"
  description: "Intuit extended its deterministic Ecosystem Wide Orchestrator Kit (EWOK) disaster-recovery platform with EWOK Agent, an Amazon Bedrock-based agent that interprets plain-language failover requests, selects versioned operational skills, validates readiness and policy gates, and invokes audited EWOK APIs. The architecture deliberately limits the model to deciding what operation is appropriate while conventional executors determine how production actions are authenticated and performed. Intuit reports that teams had used the agent for eight months and that EWOK-supported failovers already reduced execution time from several hours to about 20 minutes; however, the source does not provide independent measurements of the agent’s accuracy, incident reduction, cost, or failure rate, and the implementation examples are illustrative rather than a complete deployable system."
  canonical: "https://www.zenml.io/llmops-database/agentic-disaster-recovery-orchestration-for-production-failover"
  ogTitle: "Intuit: Agentic Disaster Recovery Orchestration for Production Failover - ZenML LLMOps Database"
  ogDescription: "Intuit extended its deterministic Ecosystem Wide Orchestrator Kit (EWOK) disaster-recovery platform with EWOK Agent, an Amazon Bedrock-based agent that interprets plain-language failover requests, selects versioned operational skills, validates readiness and policy gates, and invokes audited EWOK APIs. The architecture deliberately limits the model to deciding what operation is appropriate while conventional executors determine how production actions are authenticated and performed. Intuit reports that teams had used the agent for eight months and that EWOK-supported failovers already reduced execution time from several hours to about 20 minutes; however, the source does not provide independent measurements of the agent’s accuracy, incident reduction, cost, or failure rate, and the implementation examples are illustrative rather than a complete deployable system."
notion:
  pageId: "3e9f8dff-2538-80e3-b79a-c4014a54e01f"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:16:00.000Z"
  lastEditedTime: "2026-09-28T08:16:00.000Z"
  publishedAt: "2026-09-28T08:25:12Z"
---

## Overview

Intuit built EWOK Agent to help engineers coordinate regional disaster-recovery failovers across a large estate of microservices supporting products such as TurboTax, QuickBooks, Mailchimp, and Credit Karma. The underlying Ecosystem Wide Orchestrator Kit (EWOK) already automated execution across compute, databases, networking, caches, and asynchronous workloads. It reduced supported failover workflows from several hours to about 20 minutes, but decisions about which workflow to use, whether an asset was ready, and how to handle exceptions still depended on runbooks and the tribal knowledge of experienced on-call engineers.

EWOK Agent adds a language-model reasoning layer without making the model the production executor. An engineer can request “failover payments-gateway in production” from an internal engineering portal or an IDE integration through Model Context Protocol (MCP). The agent resolves the request into a typed skill and calls deterministic EWOK APIs for asset resolution, workflow selection, readiness checks, policy validation, change-record creation, execution, and status monitoring. The central safety boundary is explicit: the model decides what to do, while tested conventional code executes how. Intuit says teams had used EWOK Agent for eight months, but the source does not provide a controlled evaluation of agent accuracy or operational risk, so the reported benefits should be treated as an experience report and architecture pattern rather than independently validated performance evidence.

## Problem and use case

EWOK represents recoverable assets, such as services or serverless applications, together with their compute resources, traffic endpoints, databases, caches, queues, and other stateful dependencies. Service owners declare recovery intent in YAML. A workflow can, for example, scale capacity in a secondary region, promote a database replica, warm or cut over a cache, and shift traffic. EWOK executes these stages through workload-specific agents and provides an execution ID for tracking.

The automation layer did not eliminate operational judgment. Engineers still had to identify the appropriate asset and recovery workflow, inspect readiness, remember change-management restrictions, and coordinate exceptions while operating under incident pressure. A change-freeze window is a representative case: a failover may be rejected unless it is associated with an incident or an emergency justification. Previously, an engineer had to recall the override process and apply it correctly. EWOK Agent moves this knowledge into versioned skills and explicit policy branches, while retaining human supervision for judgment calls and approvals.

## Architecture and LLM integration

The system has four logical layers. The consumer layer exposes the internal engineering portal and IDE entry points. The agent layer uses Amazon Bedrock, the Converse API, and Amazon Bedrock Guardrails. The skill layer contains Markdown definitions with YAML frontmatter describing typed inputs and outputs, plus a prompt body containing operational rules. The execution layer consists of authenticated EWOK APIs and the underlying recovery agents for compute, databases, caches, and traffic.

A skill is compiled into an Amazon Bedrock tool specification. A simplified failover-management skill declares operations such as getting available workflows, invoking a failover, and checking execution status. Its inputs include an asset name, environment, operation, and optionally an incident number. This schema is both documentation and an operational contract: it constrains the arguments the model can request and gives the executor a defined interface. The model therefore chooses among capabilities instead of generating arbitrary infrastructure commands.

The Bedrock layer is intentionally thin and model-agnostic. Intuit uses the Converse API through the LangChain AWS `ChatBedrockConverse` client, which handles tool binding and message serialization. The model is configured rather than embedded in the architecture, allowing the team to evaluate or change foundation models without rewriting the skills, agent loop, or executors. The source claims that Bedrock provides access to multiple foundation models through a common API and supports managed security controls, but it does not identify the selected model or publish comparative model evaluation results.

## Agentic loop and control flow

The loop is self-managed rather than delegated to the Amazon Bedrock AgentCore harness because the failover use case needs custom stop-reason handling and circuit-breaker logic. On each iteration, the system sends the user request, conversation state, and compiled tools to the model. If the model returns a tool-use request, the corresponding skill executor runs and returns a structured result. The result is then supplied to the model so it can either continue with a required next operation or provide a final response.

The loop has a hard maximum iteration count. A normal `end_turn` produces the engineer-facing response. A `tool_use` response dispatches the selected skill. A `guardrail_intervened` result terminates the request rather than encouraging retries, paraphrasing, or other attempts to bypass the control. Tool results carry explicit success or error status instead of relying on the model to infer outcome from free-form text. These choices reduce ambiguity and prevent an unresolved agent from spinning indefinitely, although the source does not specify the iteration limit, latency targets, or observed frequency of intervention and timeout cases.

Skill prompts use explicit operation walkthroughs, one executor call per step, stop-on-error behavior, and structured response contracts. Policy gates are represented as defined branches rather than vague error handling. For example, a change-freeze rejection causes the skill to request an incident number or emergency justification and retry the invocation exactly once with the supplied value. If the engineer declines, the skill reports that no failover was executed. In a production system, this kind of deterministic branching is preferable to asking a model to improvise an exception procedure, but the design still requires careful validation of authorization, argument semantics, and the reliability of the surrounding policy systems.

## Execution boundary and security

The model does not receive AWS credentials and has no direct network path to EWOK. A request-scoped IAM context is injected into the executor, which calls EWOK for asset resolution, workflow lookup, change-record creation, and execution. EWOK sees an authenticated caller and applies the same change-management, approval, and audit mechanisms used for human operations. State-changing actions therefore remain conventional API calls rather than model-generated shell commands or infrastructure mutations.

The executor returns structured information such as an execution ID, change ID, status, and reason code. EWOK then performs the actual ordered recovery workflow and reports stage-level status back through the agent. This separation supports auditability and makes it possible to test the executor independently of the LLM. It also limits the model’s authority: a plausible but invalid asset or region should be rejected by allowlists and API validation before a production action occurs.

The design describes defense in depth against prompt injection. Alarm descriptions, runbook content, and service metadata are treated as data and wrapped with Bedrock Guardrails input tags so that embedded instructions are not treated as trusted directions. Guardrails are attached to every model invocation, and an intervention stops the loop. The executor separately validates tool arguments against known service names and Regions because no prompt-injection filter is complete. Additional controls include least-privilege IAM, immutable invocation and tool-call logging, change records, per-service queues, request deduplication, cooldowns, circuit breakers, API rate limits, and nonces or timestamps intended to prevent replayed requests. The source presents these as design controls; it does not report penetration-test results or measured false-positive and false-negative rates.

## Production operations and LLMOps considerations

The production workflow is human-supervised. Engineers remain responsible for approvals and judgment calls, while the agent coordinates routine lookups, validation, invocation, and monitoring. Destructive or irreversible steps and policy overrides are expected to require explicit approval, particularly in production. This is an appropriate division for high-impact automation, but the exact approval mechanism, identity binding, segregation of duties, and emergency-access process are not detailed in the source and would need to be specified before adoption.

Operational knowledge is managed as versioned skills rather than only as human runbooks. That creates a potentially useful single artifact for engineers, IDE assistants, and agents, but it also introduces a change-management requirement for prompts and schemas. Skill changes should be reviewed, tested against representative requests and adversarial inputs, and promoted through environments with rollback support. The source explains the skill format and execution rules but does not describe a formal evaluation suite, golden task set, model regression process, approval workflow for skill releases, or monitoring dashboards for model quality.

Observability is anchored in EWOK execution IDs and change records, which can connect the natural-language request, selected tool, API actions, workflow stages, and final outcome. Bedrock Guardrails tracing is enabled in the example. The article also contrasts the custom loop with AgentCore, whose managed harness can provide traces, logs, and metrics through CloudWatch for model calls, tool invocations, and memory operations. Because Intuit chose a self-managed loop, the team retains control but must implement and maintain equivalent telemetry, correlation, redaction, retention, alerting, and cost monitoring itself.

## Results and tradeoffs

The reported operational improvement is primarily attributable to EWOK’s existing deterministic orchestration: supported workloads moved from several hours to approximately 20 minutes. EWOK Agent addresses a different bottleneck by reducing manual runbook lookup and console coordination and by making policy handling more consistent. The article says engineers now supervise conversations rather than manually orchestrate API calls and that teams have used the agent for eight months. It does not quantify labor savings, successful versus failed agent requests, reduction in mean time to recovery, model costs, or incidents caused or avoided by the agent.

The pattern trades some implementation complexity for stronger control. Typed skills, explicit executors, bounded loops, guardrails, queues, and audit integration are more work than exposing a generic autonomous agent to infrastructure, but they provide a narrower and more reviewable action surface. Conversely, the model can still misidentify an asset, misunderstand user intent, select an inappropriate but syntactically valid skill, or produce an unhelpful explanation. Deterministic execution cannot correct a bad decision unless validation and approval gates catch it. Bedrock inference and Guardrails also add per-invocation costs, and multi-step loops can increase token usage and latency. The examples are illustrative, not a complete runnable implementation or deployment template, so organizations would need to validate these controls under realistic failure, adversarial, and high-load conditions before granting comparable production authority.

## Overall assessment

Intuit’s case is a practical example of constrained agentic automation for a high-impact operations domain. Its strongest LLMOps decision is not the choice of a particular model but the restriction of model authority to interpretation, capability selection, and coordination, with credentials, policy enforcement, state changes, and auditing retained in conventional services. The pattern is transferable to other authenticated APIs that expose deterministic operations. Its main evidence limitations are the absence of public model-selection details, quantitative agent-level evaluation, cost and latency measurements, and independently verified safety outcomes. Those gaps do not invalidate the architecture, but they mean the reported production use should be read as a detailed design account rather than proof that an LLM is inherently reliable for autonomous disaster recovery.
