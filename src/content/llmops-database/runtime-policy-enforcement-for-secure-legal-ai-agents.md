---
title: "Runtime Policy Enforcement for Secure Legal AI Agents"
slug: "runtime-policy-enforcement-for-secure-legal-ai-agents"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "mcp"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "evals"
  - "error-handling"
  - "security"
  - "guardrails"
industryTags: "legal"
company: "Harvey"
summary: "Harvey built an MCP Policy Engine to reduce the security risks created when production legal AI agents connect to external research, document, and communication systems. The design combines partner and connector security reviews with tool pinning, least-privilege controls, complete mediation of every tool call, context-aware information-flow policies, sanitization of hidden characters, human approval gates, and adversarial evaluation. The system is intended to limit the impact of tool poisoning, rug-pull changes, prompt injection, data exfiltration, and multi-agent workflow abuse, although Harvey presents it as an evolving defense-in-depth architecture rather than a complete solution to prompt injection."
link: "https://www.harvey.ai/blog/building-harveys-mcp-policy-engine"
year: 2026
seo:
  title: "Harvey: Runtime Policy Enforcement for Secure Legal AI Agents - ZenML LLMOps Database"
  description: "Harvey built an MCP Policy Engine to reduce the security risks created when production legal AI agents connect to external research, document, and communication systems. The design combines partner and connector security reviews with tool pinning, least-privilege controls, complete mediation of every tool call, context-aware information-flow policies, sanitization of hidden characters, human approval gates, and adversarial evaluation. The system is intended to limit the impact of tool poisoning, rug-pull changes, prompt injection, data exfiltration, and multi-agent workflow abuse, although Harvey presents it as an evolving defense-in-depth architecture rather than a complete solution to prompt injection."
  canonical: "https://www.zenml.io/llmops-database/runtime-policy-enforcement-for-secure-legal-ai-agents"
  ogTitle: "Harvey: Runtime Policy Enforcement for Secure Legal AI Agents - ZenML LLMOps Database"
  ogDescription: "Harvey built an MCP Policy Engine to reduce the security risks created when production legal AI agents connect to external research, document, and communication systems. The design combines partner and connector security reviews with tool pinning, least-privilege controls, complete mediation of every tool call, context-aware information-flow policies, sanitization of hidden characters, human approval gates, and adversarial evaluation. The system is intended to limit the impact of tool poisoning, rug-pull changes, prompt injection, data exfiltration, and multi-agent workflow abuse, although Harvey presents it as an evolving defense-in-depth architecture rather than a complete solution to prompt injection."
notion:
  pageId: "3f4f8dff-2538-807d-bc57-dd8cf1760108"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:39:00.000Z"
  lastEditedTime: "2026-10-09T08:39:00.000Z"
  publishedAt: "2026-10-09T08:53:25Z"
---

## Overview

Harvey is a legal AI company whose production platform connects agents to research platforms, document-management systems, communication tools, and other external services. These integrations give legal professionals more context and allow agents to perform complex work, but they also increase the consequences of a compromised connector or malicious content returned by a trusted system. Harvey reports building an MCP Policy Engine to govern partner Model Context Protocol (MCP) tools throughout an agent workflow, rather than relying only on an initial connector review or on the model to resist malicious instructions.

The central LLMOps contribution is an orchestration-layer control plane positioned outside the model. It evaluates proposed tool calls, relevant call history, tool metadata, arguments, and workflow context before execution. Depending on policy, a call can be permitted, denied, or paused for explicit user approval. This architecture is designed to reduce the likelihood and impact of prompt-injection-driven misuse, especially when an agent has access to private data, consumes untrusted content, and can communicate externally. The source does not provide independent attack-success rates, latency measurements, false-positive rates, or customer outcome metrics, so the reported value should be understood as a description of security architecture and engineering practice rather than a quantitatively validated product result.

## Production problem and threat model

MCP provides a common way to discover tools, access data, and act across services. In Harvey’s setting, an MCP server may expose tools that search legal information, retrieve documents, write to systems, or communicate with external parties. The protocol can therefore expand both agent capability and attack surface. The company highlights a “lethal trifecta” in which private-data access, untrusted content, and external communication can be combined into a damaging prompt-injection path.

Two threats receive particular attention. In a tool-poisoning attack, malicious instructions are placed in a tool definition and influence the model’s behavior. In a rug-pull attack, a previously approved server changes its tool catalog or behavior after approval. A connector may also return attacker-controlled text that instructs the agent to make additional calls. The resulting risk is not limited to whether a model produces a bad answer: an agent could retrieve confidential information, pass it through an argument to an external service, or trigger a consequential action. Harvey also considers MCP features that allow servers to request model invocation or user information, as well as agent-to-agent delegation that can create cycles and implicit multi-agent workflows.

## Architecture and lifecycle controls

Harvey starts with a security review before a connector is made available. The review examines authentication, capabilities, permissions, data handling, OAuth scopes, and tool access. New tools and protocol features are not automatically trusted merely because a server advertises them. This limits the trusted computing base and recognizes that a read-only label does not fully describe a tool’s risk. For example, a search tool might disclose confidential data if a query argument is sent to an external service.

An internal MCP security-analysis tool supports integration-time assessment. It inspects authentication configuration, exposed capabilities, JSON schemas, argument types, declared limits, and return contracts. Harvey uses this analysis to compare the guarantees it wants with what a server documents and what it actually enforces. The company evaluates tool arguments along two dimensions: capacity, meaning how much information an argument can carry, and authority, meaning what the argument controls. This provides a more useful basis for information-flow analysis than a simple read/write classification.

The runtime Policy Engine applies three main principles: least privilege, complete mediation, and secure information flow. Least privilege limits the capabilities available to an agent and the conditions under which they may be used. Complete mediation means every partner MCP call is checked before execution; approval to connect a server does not authorize every later action. Secure information flow uses workflow context to restrict dangerous combinations of capabilities, such as transmitting information after private data has been accessed or after untrusted content has entered the trajectory.

A Tool Pinner records approved tool definitions, including model-facing descriptions and input schemas. During discovery, it compares the currently advertised catalog with that baseline and flags additions, removals, and changes for security review. This is a direct operational response to rug-pull risk. Harvey acknowledges that strict pinning can generate many alerts because connector catalogs change frequently and not every edit is security-significant. Its planned response is fine-grained pinning and semantic edit classification, with review prioritization based on policy-relevant changes, contextual information, and human oversight. The team also describes examining cumulative small edits to detect salami-slicing attacks. These plans are presented as work in progress, not as completed capabilities.

## Policy evaluation and enforcement

For each proposed call, the engine receives structured tool identifiers, Harvey-maintained annotations, relevant call history, and proposed arguments. The annotations describe a tool’s purpose, capabilities, and risk and are distinct from server-supplied hints, which Harvey treats as untrusted. Security policies are written in Rego and executed with Regorus. The source states that the policy interpreter does not inspect prompt content or customer data; instead, it makes decisions from explicit structured inputs. This separation can improve testability and reduce the amount of sensitive data needed by the enforcement component, although the quality of decisions still depends on the completeness and accuracy of annotations and trajectory context.

Policies may permit, deny, or require explicit user approval. If required checks cannot be completed or the engine cannot reach a valid decision, the default is denial. Workspace settings may impose additional restrictions but cannot override an engine denial. Policies also seek to identify and interrupt cycles in agent-to-agent interactions, allowing a user to review a potentially hijacked delegation chain before it continues.

Harvey positions this enforcement outside the language model because safety training, content marking, and classifiers can be bypassed and do not by themselves constrain the consequences of a successful attack. The model can still propose an unsafe action, but the orchestration layer is intended to prevent that action from reaching the external tool. This is a meaningful LLMOps distinction: the security boundary is implemented as a deterministic or policy-driven runtime gate around model-initiated actions, rather than as a prompt-only instruction.

## Input sanitization, monitoring, and evaluation

The Sanitizer removes selected hidden characters and control sequences from tool results before they enter the model context. It also detects potentially misleading combinations of lookalike characters from different writing systems. Harvey scopes these transformations to preserve legitimate multilingual content and keep behavior predictable and testable. The company explicitly notes that sanitization addresses specific stealth-injection vectors but cannot eliminate malicious instructions expressed in ordinary text, which is why it is combined with architectural action controls.

The system is refined through red teaming, quality evaluations, observation of tool use, and adversarial testing against both malicious behavior and legitimate workflows. Non-sensitive information about tool calls, policy decisions, risk flags, and network telemetry feeds detection and response tooling in Harvey’s Agentic Security Operations Center. Findings can inform connector reviews, policy coverage, and subsequent evaluations. This creates a feedback loop between runtime monitoring, incident investigation, integration security, and policy engineering.

## Results and tradeoffs

The stated result is a defense-in-depth control plane that connects pre-integration review with runtime enforcement for production legal agents. It is intended to reduce the blast radius of a compromised MCP server, detect changes to approved tools, prevent unsafe combinations of data access and external communication, and create explicit user checkpoints for higher-risk actions. The approach also provides a structured way to reason about tool arguments and agent trajectories instead of treating all tool calls as equivalent.

Important tradeoffs remain. Tool pinning can create operational alert volume and review burden. Fine-grained change classification and cumulative-change detection are still being developed. Policies may require sufficiently accurate tool annotations and may affect usability when legitimate workflows resemble risky behavior. Sanitization can only cover known character-based attack patterns, while policy enforcement cannot compensate for incomplete capability descriptions or missing context. The source also does not quantify production performance, security effectiveness, customer adoption, or the frequency of denied calls.

Harvey says it is investigating automated policy creation and refinement, capability-based program analysis, and more formal controls inspired by agent-security research. Overall, the case illustrates a pragmatic LLMOps pattern for high-sensitivity domains: treat model outputs as untrusted proposals, mediate external actions at runtime, preserve human approval for consequential decisions, monitor actual trajectories, and continuously test the policy layer against adversarial and legitimate use. It is a credible security architecture description, but the available material supports architectural claims and ongoing engineering work more strongly than claims of proven elimination of prompt-injection risk.
