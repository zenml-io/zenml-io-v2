---
title: "Scaling a Company-Wide GenAI Platform with Gateways, Open Models, and Agent Infrastructure"
slug: "scaling-a-company-wide-genai-platform-with-gateways-open-models-and-agent-infrastructure"
draft: false
llmopsTags:
  - "fine-tuning"
  - "model-optimization"
  - "prompt-engineering"
  - "error-handling"
  - "fallback-strategies"
  - "latency-optimization"
  - "cost-optimization"
  - "human-in-the-loop"
  - "agent-based"
  - "mcp"
  - "a2a"
  - "evals"
  - "system-prompts"
  - "api-gateway"
  - "monitoring"
  - "open-source"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "vllm"
  - "documentation"
  - "openai"
  - "anthropic"
  - "google-gcp"
  - "amazon-aws"
  - "microsoft-azure"
  - "hugging-face"
industryTags: "e-commerce"
company: "DoorDash"
summary: "DoorDash built an internal GenAI platform to help thousands of employees and product teams deploy LLM-powered automation, recommendations, personalization, and agents while balancing accuracy, latency, cost, velocity, and accountability. The platform evolved from an API-first LLM Gateway with provider abstraction, fallbacks, cost attribution, logging, and observability into an open-model serving capability and an Agent Gateway supporting MCP and other agent protocols, identity, authorization, rate limits, tool discovery, and streaming. DoorDash reports more than 5,000 internal users, approximately 45 new users onboarding daily, more than 50 MCP servers, roughly 300,000 daily tool calls, and annualized savings in the single-digit millions of dollars; however, agent runtime state, evaluation maturity, and safety enforcement remain partly decentralized or unresolved."
link: "https://www.infoq.com/presentations/doordash-genai-platform-architecture/"
year: 2026
seo:
  title: "DoorDash: Scaling a Company-Wide GenAI Platform with Gateways, Open Models, and Agent Infrastructure - ZenML LLMOps Database"
  description: "DoorDash built an internal GenAI platform to help thousands of employees and product teams deploy LLM-powered automation, recommendations, personalization, and agents while balancing accuracy, latency, cost, velocity, and accountability. The platform evolved from an API-first LLM Gateway with provider abstraction, fallbacks, cost attribution, logging, and observability into an open-model serving capability and an Agent Gateway supporting MCP and other agent protocols, identity, authorization, rate limits, tool discovery, and streaming. DoorDash reports more than 5,000 internal users, approximately 45 new users onboarding daily, more than 50 MCP servers, roughly 300,000 daily tool calls, and annualized savings in the single-digit millions of dollars; however, agent runtime state, evaluation maturity, and safety enforcement remain partly decentralized or unresolved."
  canonical: "https://www.zenml.io/llmops-database/scaling-a-company-wide-genai-platform-with-gateways-open-models-and-agent-infrastructure"
  ogTitle: "DoorDash: Scaling a Company-Wide GenAI Platform with Gateways, Open Models, and Agent Infrastructure - ZenML LLMOps Database"
  ogDescription: "DoorDash built an internal GenAI platform to help thousands of employees and product teams deploy LLM-powered automation, recommendations, personalization, and agents while balancing accuracy, latency, cost, velocity, and accountability. The platform evolved from an API-first LLM Gateway with provider abstraction, fallbacks, cost attribution, logging, and observability into an open-model serving capability and an Agent Gateway supporting MCP and other agent protocols, identity, authorization, rate limits, tool discovery, and streaming. DoorDash reports more than 5,000 internal users, approximately 45 new users onboarding daily, more than 50 MCP servers, roughly 300,000 daily tool calls, and annualized savings in the single-digit millions of dollars; however, agent runtime state, evaluation maturity, and safety enforcement remain partly decentralized or unresolved."
notion:
  pageId: "3f4f8dff-2538-8061-a6aa-cbf55a47e56c"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:46:00.000Z"
  lastEditedTime: "2026-10-09T08:46:00.000Z"
  publishedAt: "2026-10-09T08:52:41Z"
---

## Overview

DoorDash created an internal GenAI Platform to make LLM and agent capabilities usable across the company rather than leaving each product team to assemble its own provider integrations, safety hooks, observability, evaluation workflows, and access controls. The platform initially focused on an API-first LLM Gateway that unified access to commercial and open models. It later expanded into self-hosted open-weight model serving and an Agent Gateway for exposing tools and agent capabilities securely.

The central operating objective was to help product teams optimize three competing properties: accuracy, latency, and cost. DoorDash reports that more than 5,000 internal users have been onboarded, with approximately 45 new users joining each day and about 40% of users coming from non-engineering functions such as legal, sales, operations, and strategy. The reported results include more than 50 MCP servers, approximately 300,000 daily tool calls, and single-digit-million-dollar annualized savings from selected open-model migrations. These figures are company-reported outcomes rather than independently validated measurements, and the presentation makes clear that several areas—particularly agent state management, evaluation quality, and the enforcement of safety policies—are still developing.

## Problem and Operating Model

The platform began in the period following the 2022 ChatGPT launch, when DoorDash needed to determine how to support rapidly increasing experimentation with external LLM providers in a large organization. The team initially operated within an ML platform context, but quickly discovered that its actual customers were all software engineers and eventually many non-engineers. This changed the interface and product assumptions: notebooks, GPU access, and ML-specific workflows were insufficient, so the platform shifted toward APIs, SDKs, self-service onboarding, and complete product-oriented workflows.

The team emphasized customer-led development and business impact rather than building a generic chatbot or infrastructure for its own sake. It grouped use cases into automation, recommendations, and personalization, viewing automation primarily as a cost or bottom-line opportunity and recommendations and personalization as top-line opportunities. The platform team also tried to make preferred practices the default, including onboarding, support, logging, cost visibility, and operational controls, instead of merely documenting best practices and expecting every product group to implement them independently.

## LLM Gateway Architecture

The LLM Gateway became the common access layer between internal callers and model providers. It exposed a common API and SDK so teams could try OpenAI, Anthropic, Gemini, Azure-hosted endpoints, Bedrock-backed models, and open models without rewriting application plumbing for each provider. This abstraction was particularly valuable because model releases and provider offerings changed frequently. A team could change configuration and test a different model while retaining much of its application integration.

Reliability requirements led to provider-specific fallback strategies. For example, an OpenAI endpoint could fall back to an Azure endpoint, while an Anthropic integration could fall back to Bedrock. The intent was to prevent provider quota shortages or capacity problems from taking down production services. The gateway therefore served not only as a compatibility layer but also as a routing and resilience layer. The source does not specify the routing algorithm, service-level objectives, latency targets, or failure-rate improvements, so the reliability benefit should be understood as an architectural goal and reported operational experience rather than a quantified benchmark.

As adoption grew, a shared API key was no longer sufficient for governance or financial accountability. DoorDash introduced workspaces that allowed usage to be associated with teams and departments, with visibility into model selection, consumption, and budgets. The gateway also logged requests and responses and provided a user interface for reviewing production behavior. Centralized request logging reduced the need for every product team to build its own debugging and usage-monitoring system, although the transcript does not describe retention, redaction, access-control, or privacy details for those logs.

The abstraction also supported DoorDash acquisitions, including Wolt, Deliveroo, and SevenRooms, by providing a common experience for onboarding and consuming the platform. The reported operational value was faster experimentation, easier comparison of model latency and cost, and reduced duplication across product teams.

## Vendor-First Strategy and Portability

DoorDash initially preferred vendors because the market was changing too quickly to justify building every capability in-house. This helped teams become productive quickly and allowed the platform group to learn what users actually required. The approach was later moderated when vendor products did not fit DoorDash’s workflow surfaces. In evaluation tooling, for example, teams required custom tracing, image-oriented human annotation, and workflows that differed from the vendor’s assumptions. Some teams began using the vendor primarily as an OpenTelemetry trace store while building their own workflows around it, which the platform team considered suboptimal.

The resulting principle was to own the company-specific workflow surface while remaining flexible about whether the implementation was purchased or built. DoorDash continued to use vendors where they worked, but treated vendor-first as an initial tactic rather than a permanent rule. This distinction is important for LLMOps: the platform sought to own authentication, cost, observability, evaluation workflows, and developer experience even when model inference or supporting infrastructure came from external providers.

Model portability became increasingly important because of provider quotas, rising costs, and model deprecations. The presentation specifically highlights short model lifetimes as a platform-management problem: migrating hundreds of use cases whenever a provider retires a model is difficult when the replacement does not offer an obvious business benefit. The gateway reduced migration friction by allowing product teams to change model configuration rather than reimplement integrations.

## Open-Weight Model Serving

DoorDash eventually accelerated a longer-term plan to serve open-weight models internally. The stated motivations were cost, latency, provider capacity, and control over the model lifecycle. The company selected Modal, described as a Python-first GPU cloud, and planned to use open-source serving and fine-tuning components, including vLLM, SGLang, Hugging Face TRL, Unsloth, and Axolotl. These components indicate an effort to retain portability across serving and training technologies rather than creating another tightly coupled proprietary stack.

Because open-model access was placed behind the existing LLM Gateway, product teams could try an internally hosted model with limited application changes. The presenters report that models such as Qwen, GLM, Kimi, and DeepSeek had become sufficiently capable for selected use cases. They also report examples in which teams moved from proprietary frontier models to models such as Qwen3 or Qwen3 Embeddings, obtaining higher measured accuracy and approximately 20-times lower cost in some cases. The reported savings were large enough that DoorDash states it achieved single-digit-million-dollar annualized savings from a handful of onboarded use cases in the first half of the adoption period.

These claims are conditional rather than universal. DoorDash still recommends that most teams begin with frontier proprietary models because they are easier to use and often stronger on general accuracy. Open models become more attractive when a product already has market fit or stable requirements and cost or latency is the limiting factor. Smaller models, distillation, and fine-tuning can then be considered. The transcript does not provide workload-level baselines, quality thresholds, hardware utilization, tail-latency measurements, or a detailed total-cost-of-ownership calculation, so the magnitude of the savings cannot be generalized to every application.

## Agent Gateway and Tool Governance

As teams moved from individual LLM calls to tool-using agents, the platform primitive changed again. DoorDash first supported internal MCP servers, but concluded that an MCP gateway alone was insufficient because MCP primarily provides a presentation and access layer for tools. Agent applications also need identity, authorization, observability, rate limiting, discovery, protocol integration, and support for agents acting on behalf of people or as services.

The Agent Gateway therefore became a broader control and connectivity layer. It supports more than 50 onboarded MCP servers, including integrations involving systems such as Slack, GitHub, and Jira. Tool owners can declare authorization policies, including tool-level access. Users and services are authenticated by the gateway, and consumers can receive visibility into tool activity without implementing observability independently. Rate limits and sensitive write-access policies are also handled as shared platform capabilities.

A self-service registry helps users and agents discover existing tools and avoid duplicating MCP servers. DoorDash also chose to remain protocol-agnostic. In addition to MCP, the platform incorporated AG-UI and was working toward A2A support. It supported streaming to user interfaces through the gateway and advocated Python as a first-class platform language because many agent frameworks and GenAI workloads were Python-first. The reported result was approximately 300,000 daily tool calls, although no breakdown of successful calls, latency, or business outcomes is provided.

Identity was treated as a three-party authorization problem involving the human user, the agent acting for that user, and the tool or agent service being accessed. A tool provider declares what access its tools permit; a user can then determine which agents may use tools that the user is already authorized to access. This model aims to avoid granting an agent all of the permissions available to its human operator. It also distinguishes interactive local agents, which may be granted broader permissions under direct user control, from background services that should receive narrower access.

## Evaluation, Guardrails, and Observability

DoorDash is developing an evaluation platform to address the accuracy portion of its accuracy-latency-cost objective. The workflow begins with tracing so teams can inspect whether time is spent in the model, a tool, web search, or tool-result processing. Product teams are then encouraged to identify a small number of meaningful product metrics rather than attempting to optimize every possible metric.

Evaluation methods include deterministic code-based judges, LLM-as-a-judge evaluators, dashboards, and human annotation. For recommendation use cases, DoorDash described custom annotation interfaces that present menu images, tags, and domain-specific questions rather than forcing reviewers to inspect raw spreadsheet cells. This makes ground-truth collection and iteration more usable for non-technical reviewers. The process is currently partly guided by the platform team; the presenters explicitly characterize evaluation as an early-stage and unsolved area, with hopes of turning the workflow into a repeatable self-service playbook.

Safety is not fully enforced centrally. Product teams can opt into guardrails, system prompts, and before- and after-hooks through the gateway. Pre-processing hooks can be used for concerns such as PII redaction, while post-processing hooks can inspect outputs for undesirable content or business-policy violations. Hallucination control is treated primarily as an evaluation problem rather than something the gateway can guarantee. This provides flexibility but leaves product teams responsible for selecting and operating appropriate controls. The source does not claim comprehensive prompt-injection prevention, output validation, or hallucination elimination.

## Results and Tradeoffs

DoorDash’s reported scorecard is positive: more than 5,000 internal users, rapid daily onboarding, substantial non-engineering adoption, provider portability, centralized usage and cost accountability, open-model savings, over 50 MCP servers, and approximately 300,000 daily tool calls. The strongest architectural lesson is that centralization need not mean removing choice. The gateway centralizes operationally important surfaces—identity, cost, logging, routing, and access policy—while allowing teams to choose models, tools, and selected platform components.

There are also meaningful limitations. Agent Gateway is currently stateless from the platform perspective, with user teams responsible for session identifiers, conversation history, and parts of runtime management. The team has not fully solved long-running agents, pod failure recovery, durable execution, or maintaining streaming connections when requests move between instances. Evaluation remains dependent on product-specific metrics and some hands-on enablement. Guardrails are opt-in rather than universally enforced, and the presentation does not describe detailed compliance controls for centralized request and response logs.

Overall, the case demonstrates an evolutionary LLMOps strategy: start with vendor APIs to maximize learning and delivery speed, place them behind a portable gateway, add accountability as adoption grows, build in-house where company-specific workflows or economics justify it, and extend the same platform principles to agents. The reported outcomes are encouraging, but they depend on selective workload migration, continued platform adoption, and product teams retaining responsibility for application-level quality and safety.
