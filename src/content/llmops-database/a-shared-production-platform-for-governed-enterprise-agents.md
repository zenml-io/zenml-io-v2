---
title: "A Shared Production Platform for Governed Enterprise Agents"
slug: "a-shared-production-platform-for-governed-enterprise-agents"
draft: false
llmopsTags:
  - "question-answering"
  - "data-analysis"
  - "visualization"
  - "code-interpretation"
  - "structured-output"
  - "chatbot"
  - "realtime-application"
  - "unstructured-data"
  - "high-stakes-application"
  - "data-integration"
  - "regulatory-compliance"
  - "rag"
  - "vector-search"
  - "mcp"
  - "a2a"
  - "agent-based"
  - "memory"
  - "human-in-the-loop"
  - "cost-optimization"
  - "evals"
  - "serverless"
  - "api-gateway"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "cicd"
  - "continuous-deployment"
  - "open-source"
  - "databases"
  - "amazon-aws"
industryTags: "energy"
company: "Wood Mackenzie"
summary: "Wood Mackenzie built APEX (Agentic Platform for Energy eXperience), a shared platform on Amazon Bedrock AgentCore, to move multiple agentic AI applications from prototypes into governed production. APEX centralizes runtime hosting, identity and entitlements, tool connectivity, memory, retrieval, guardrails, observability, evaluation, and generative user interfaces, while allowing product teams to choose different agent frameworks and models. The platform supports internal workflows in Woody, external-facing assistance in Lens AI, and trading use cases through common infrastructure. The source reports faster delivery and reduced duplicated engineering, but does not provide independent production-quality, cost, accuracy, or adoption metrics; many benefits remain architectural claims and planned capabilities rather than quantitatively validated outcomes."
link: "https://aws.amazon.com/blogs/machine-learning/a-shared-agentic-platform-for-wood-mackenzie-on-amazon-bedrock-agentcore/"
year: 2026
seo:
  title: "Wood Mackenzie: A Shared Production Platform for Governed Enterprise Agents - ZenML LLMOps Database"
  description: "Wood Mackenzie built APEX (Agentic Platform for Energy eXperience), a shared platform on Amazon Bedrock AgentCore, to move multiple agentic AI applications from prototypes into governed production. APEX centralizes runtime hosting, identity and entitlements, tool connectivity, memory, retrieval, guardrails, observability, evaluation, and generative user interfaces, while allowing product teams to choose different agent frameworks and models. The platform supports internal workflows in Woody, external-facing assistance in Lens AI, and trading use cases through common infrastructure. The source reports faster delivery and reduced duplicated engineering, but does not provide independent production-quality, cost, accuracy, or adoption metrics; many benefits remain architectural claims and planned capabilities rather than quantitatively validated outcomes."
  canonical: "https://www.zenml.io/llmops-database/a-shared-production-platform-for-governed-enterprise-agents"
  ogTitle: "Wood Mackenzie: A Shared Production Platform for Governed Enterprise Agents - ZenML LLMOps Database"
  ogDescription: "Wood Mackenzie built APEX (Agentic Platform for Energy eXperience), a shared platform on Amazon Bedrock AgentCore, to move multiple agentic AI applications from prototypes into governed production. APEX centralizes runtime hosting, identity and entitlements, tool connectivity, memory, retrieval, guardrails, observability, evaluation, and generative user interfaces, while allowing product teams to choose different agent frameworks and models. The platform supports internal workflows in Woody, external-facing assistance in Lens AI, and trading use cases through common infrastructure. The source reports faster delivery and reduced duplicated engineering, but does not provide independent production-quality, cost, accuracy, or adoption metrics; many benefits remain architectural claims and planned capabilities rather than quantitatively validated outcomes."
notion:
  pageId: "3e9f8dff-2538-80a7-b61a-f9b2f61754ac"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:14:00.000Z"
  lastEditedTime: "2026-09-28T08:14:00.000Z"
  publishedAt: "2026-09-28T08:25:40Z"
---

## Overview

Wood Mackenzie, an energy research and analytics company, created APEX (Agentic Platform for Energy eXperience) to provide a common production foundation for several agentic AI applications. The immediate use cases included Woody, an internal analyst application; Synapse AI in the Lens product; and the ST Trading App. The underlying problem was not simply selecting a capable language model. Each product was beginning to assemble its own runtime, authentication, tool integrations, memory, monitoring, and safety controls, creating duplicated infrastructure and inconsistent operational practices.

APEX standardizes those capabilities on Amazon Bedrock AgentCore while keeping application logic, agent frameworks, and model choices relatively independent of the platform. It provides managed agent hosting, identity-aware access, a governed Model Context Protocol (MCP) gateway, memory, retrieval-augmented generation, guardrails, telemetry, evaluation, and reusable frontend components. The stated result is a paved path from experimentation to production: teams can focus on energy-domain workflows rather than repeatedly implementing infrastructure. However, the source is an AWS customer-solution article and is also promotional. It describes architecture, examples, and expected benefits, but supplies no independent measurements of response quality, reliability, latency, cost reduction, user adoption, or business impact.

## Problem and platform rationale

Before APEX, Woody, Lens AI, and the ST Trading App were on separate paths toward separate agent stacks. This would have required each team to operate its own runtime, implement its own identity model, connect tools individually, and hardcode model integrations. Such duplication makes platform upgrades and governance more difficult and prevents common capabilities such as memory, tools, evaluation datasets, and traces from being reused consistently.

The platform team evaluated managed AgentCore against self-hosted libraries and workflow products, including LangChain, CrewAI, n8n, and direct frontier-model access. The deciding requirements were managed hosting, consumption-based pricing, model and framework flexibility, scaling, governance, and enterprise support. AgentCore was selected because it is presented as an AWS-managed service rather than a library that Wood Mackenzie must operate. The article says it supports frameworks including Strands Agents, LangGraph, LangChain, LlamaIndex, CrewAI, Google ADK, and the OpenAI Agents SDK, as well as models accessed through or outside Amazon Bedrock. This flexibility reduces application coupling, although actual portability still depends on tool schemas, prompt behavior, model-specific features, and evaluation results when models are swapped.

## Architecture and production operations

APEX has a frontend layer, a backend running on AgentCore capabilities, an infrastructure-as-code framework, and an MCP integration layer. Applications connect through an APEX frontend SDK. The backend includes AgentCore Runtime, Identity, Gateway, Memory, and Observability, an orchestrator, a vector database, the Amazon Bedrock model catalog, and Amazon Bedrock Guardrails. AWS CDK and GitHub are used to provision and version resources, with platform guardrails defined in code.

Authentication and authorization are applied throughout the invocation rather than only at the application edge. Wood Mackenzie uses Okta as its identity source and describes federation to an enterprise identity provider. AgentCore Identity carries the caller’s identity and entitlements into downstream agent and tool calls, allowing internal and external users to share the same infrastructure while receiving different permissions. This is important for production agents that can retrieve proprietary data or perform actions on behalf of users. The design also references IAM integration, VPC isolation, encryption, OAuth 2.1, API keys, and Amazon Cognito-backed OAuth authorization for frontend sessions.

The orchestrator routes requests and consults a Woodmac Agent Registry. The registry is intended to provide discovery, reuse, approval workflows, and governance for agents, tools, and skills. Agent code runs in a serverless, session-isolated AgentCore Runtime environment. The article states that runtime can scale from zero to thousands of concurrent invocations and support execution windows of up to eight hours, but those are platform capability claims rather than measured APEX workload results. Consumption-based billing and CPU accounting during active use are presented as potentially advantageous for agents that spend significant time waiting on model responses, tools, or databases; the article does not provide APEX cost data or a comparison with its previous architecture.

## Tools, retrieval, memory, and policy

AgentCore Gateway is the main integration hub. It exposes APIs, AWS Lambda functions, and existing MCP servers as discoverable agent tools through a common endpoint. The hub-and-spoke design replaces many point-to-point integrations between consumers and data services. Examples of backend spokes include Lens Direct for analytics and curves, Short Term Trading for real-time execution, Digital Content, and P&R Dataset calculators. Gateway authentication and centralized controls are intended to make identity, rate limiting, data protection, observability, evaluation, and compliance consistent across consumers.

Agents can use a Code Interpreter for controlled code execution and an Amazon Nova Act web tool for browser interactions. Retrieval-augmented generation is implemented with Amazon Bedrock Knowledge Bases and a vector database so that answers can be grounded in Wood Mackenzie documents and other organizational content rather than relying only on model pretraining. AgentCore Memory supplies short-term and long-term context, allowing conversations and state to persist across sessions and potentially be shared across agents. These components address common production concerns, but the source does not explain ingestion schedules, document versioning, chunking, embedding models, retrieval thresholds, citation requirements, or how stale and conflicting source data are handled.

Amazon Bedrock Guardrails and AgentCore Policy are used for content filtering, personally identifiable information detection, and policy enforcement. Policy can intercept tool calls at the gateway, with natural-language rules converted into Cedar policies according to the description. This is a stronger control point than relying only on prompts because it can restrict actions at the tool boundary. Nevertheless, the case study does not publish policy coverage, false-positive or false-negative rates, adversarial testing results, or an incident-response procedure for a compromised or misbehaving agent.

## Evaluation, observability, and delivery workflow

The article identifies evaluation and observability as central barriers to production adoption because agent outputs and tool choices are nondeterministic. AgentCore Observability emits OpenTelemetry-compatible telemetry to Amazon CloudWatch, including session counts, latency, duration, token usage, and error rates. Traces can follow a request from a session to individual spans and expose logs for the components involved. AgentCore Evaluations supplies evaluators for dimensions such as helpfulness, tool selection, and accuracy, along with custom model-based scoring and scoring against real traffic.

APEX Studio acts as a control plane over this runtime. Its Agent Builder uses templates for personas, tools, and guardrails; Workflow Designer supports branching, loops, and human-in-the-loop steps; Connector Registry manages MCP-compatible connectors; and Live Chat Testing provides pre-deployment interaction testing. App Deployment and a Monitoring Dashboard connect build and release activities with production health, cost, latency, and accuracy metrics. The platform also describes a natural-language development workflow called “vibe coding,” with automated testing, preview, and one-click deployment. These features establish the shape of an LLMOps lifecycle, but the source does not specify test-set construction, release gates, evaluator calibration, rollback criteria, prompt or model versioning, or whether production evaluation scores are required before deployment.

## Production use cases

In Lens, Synapse AI is embedded in a Power Summary dashboard. A user can ask which countries have the most renewable capacity, and the agent calls an `extractWidgetConfig` tool to inspect the dashboard’s existing widget configuration and data. It returns a ranked solar-and-wind capacity table rendered inside the conversation. AG-UI provides a bidirectional event stream for tokens, tool calls, and state updates; A2UI provides declarative JSON descriptions of trusted UI components; and CopilotKit supplies web tooling and components. The client renders components from a controlled catalog instead of executing arbitrary UI code. This approach grounds the response in the user’s current dashboard and makes tool results more interactive, although the example does not report answer accuracy or user evaluation.

Woody demonstrates a longer workflow. An analyst asks it to research the effect of the Iran conflict on oil prices using web sources and Lens Direct data, create charts, and generate a PowerPoint presentation. The agent combines web search, a proprietary Lens Direct MCP server, Vega-Lite charting, and a presentation generator. The reported output is four interactive charts and a 15-slide presentation. In another flow, Woody prepares an internal natural-gas demand model using a GitHub branch and pauses when a `GUIDANCE.md` review is needed. It lists required changes to `train.py` or `inference.py` and waits for analyst confirmation before training. A Task Tracker displays parameters and state through AG-UI. This approval checkpoint is a concrete example of limiting autonomy for a consequential workflow rather than allowing the model to proceed solely on its own judgment.

## Tradeoffs and assessment

The principal benefit of APEX is consolidation: identity, runtime isolation, tool access, memory, telemetry, evaluation, and UI transport can be implemented once and reused by multiple products. Model and framework choice may reduce vendor and implementation lock-in, while managed infrastructure reduces the operational burden of clusters, patching, and capacity planning. A shared gateway can also make policy changes and audit coverage more consistent.

The tradeoffs are significant. A central gateway, registry, and managed-service dependency can become a platform bottleneck or a single point of operational failure, and centralized policy may be difficult to reconcile with domain-specific requirements. “Model agnostic” does not guarantee equivalent behavior across models, so every model change still requires regression, safety, cost, and quality evaluation. Agentic workloads can also incur unpredictable token, tool, and execution costs, particularly when workflows loop or invoke expensive services. Generative UI and MCP add useful standardization but introduce protocol, connector, schema, and authorization maintenance obligations. Finally, the article’s claim that agents can be built in hours rather than months is not accompanied by a controlled before-and-after study.

## Direction of travel

APEX is designed to extend from single agents to multi-agent workflows. MCP is used as the vertical integration layer between agents and tools or data, while Agent-to-Agent (A2A) is proposed as the horizontal layer for agent discovery and delegation. The planned direction includes analytics agents collaborating with trading or calculation agents, governed external collaboration, and longer-running autonomous tasks with policy enforcement and live evaluation. These are architectural intentions described by the source, not reported production outcomes. The strongest evidenced contribution of the case study is therefore the establishment of a reusable LLMOps control plane and runtime pattern; the business and reliability benefits still require longitudinal operational metrics and independent validation.
