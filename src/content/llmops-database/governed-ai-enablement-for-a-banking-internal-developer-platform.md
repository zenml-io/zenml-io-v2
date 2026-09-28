---
title: "Governed AI Enablement for a Banking Internal Developer Platform"
slug: "governed-ai-enablement-for-a-banking-internal-developer-platform"
draft: false
llmopsTags:
  - "code-generation"
  - "question-answering"
  - "data-analysis"
  - "unstructured-data"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "agent-based"
  - "mcp"
  - "evals"
  - "human-in-the-loop"
  - "cost-optimization"
  - "error-handling"
  - "kubernetes"
  - "monitoring"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "orchestration"
  - "devops"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "open-source"
  - "documentation"
  - "amazon-aws"
industryTags: "finance"
company: "DKB"
summary: "DKB, a German online bank serving approximately five million customers, is adapting its internal platform and platform-experience practices for AI-assisted software development. The discussion describes using AI and agentic tooling to improve documentation, analyze infrastructure and repositories, answer first-line developer questions, interpret logs, and generate organization-specific infrastructure code through internal skills and MCP servers. The approach keeps human intent, least privilege, compliance, auditing, and deterministic deployment controls at the center, because faster code generation shifts bottlenecks toward security, governance, CI/CD capacity, and operational accountability. The source reports no formal DKB outcome metrics; proposed measures include onboarding time, time from idea to production, developer trust and satisfaction, support-request volume, incidents, bugs, and relevant DORA metrics."
link: "https://www.infoq.com/presentations/ai-platform-engineering-roundtable/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering-presentations"
year: 2026
seo:
  title: "DKB: Governed AI Enablement for a Banking Internal Developer Platform - ZenML LLMOps Database"
  description: "DKB, a German online bank serving approximately five million customers, is adapting its internal platform and platform-experience practices for AI-assisted software development. The discussion describes using AI and agentic tooling to improve documentation, analyze infrastructure and repositories, answer first-line developer questions, interpret logs, and generate organization-specific infrastructure code through internal skills and MCP servers. The approach keeps human intent, least privilege, compliance, auditing, and deterministic deployment controls at the center, because faster code generation shifts bottlenecks toward security, governance, CI/CD capacity, and operational accountability. The source reports no formal DKB outcome metrics; proposed measures include onboarding time, time from idea to production, developer trust and satisfaction, support-request volume, incidents, bugs, and relevant DORA metrics."
  canonical: "https://www.zenml.io/llmops-database/governed-ai-enablement-for-a-banking-internal-developer-platform"
  ogTitle: "DKB: Governed AI Enablement for a Banking Internal Developer Platform - ZenML LLMOps Database"
  ogDescription: "DKB, a German online bank serving approximately five million customers, is adapting its internal platform and platform-experience practices for AI-assisted software development. The discussion describes using AI and agentic tooling to improve documentation, analyze infrastructure and repositories, answer first-line developer questions, interpret logs, and generate organization-specific infrastructure code through internal skills and MCP servers. The approach keeps human intent, least privilege, compliance, auditing, and deterministic deployment controls at the center, because faster code generation shifts bottlenecks toward security, governance, CI/CD capacity, and operational accountability. The source reports no formal DKB outcome metrics; proposed measures include onboarding time, time from idea to production, developer trust and satisfaction, support-request volume, incidents, bugs, and relevant DORA metrics."
notion:
  pageId: "3e9f8dff-2538-8022-ae40-d333d86577e3"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:19:00.000Z"
  lastEditedTime: "2026-09-28T08:19:00.000Z"
  publishedAt: "2026-09-28T08:24:14Z"
---

## Overview

DKB is a large German online bank with approximately five million customers. Its infrastructure platform and platform-experience work is being considered in the context of AI-assisted engineering, where developers increasingly use coding assistants and agents to generate code, infrastructure definitions, and pull requests. The central operational problem is not simply how to generate more code. Faster generation can expose new constraints in security review, compliance, deployment capacity, documentation quality, governance, and the ability of platform teams to understand and support a rapidly changing estate.

The approach described for DKB treats AI as an additional automation layer rather than a replacement for platform engineering. The platform should make approved paths, architecture principles, compliance information, and operational knowledge available to both people and agents. Internal developer platforms, workflows, organization-specific skills, and MCP servers can help agents use approved Terraform modules and platform APIs instead of producing generic snippets. At the same time, sandboxing, least-privilege permissions, AWS service control policies, deployment checks, audit evidence, and human-defined intent constrain what agents can do. This is a strategic and architectural direction rather than a fully documented DKB production deployment with measured AI-specific results; the source does not provide a quantified before-and-after evaluation for DKB.

## Problem and Operating Context

AI-assisted development lowers the effort required to create application and infrastructure code. That can help platform teams clear neglected work such as documentation, diagrams, boilerplate, recurring infrastructure-as-code changes, and repository-wide updates. It also creates operational pressure. If code can be produced at machine speed, manual phase gates, slow security scans, limited CI runners, and weekly change-approval processes become more visible bottlenecks. Agents may also create many pull requests concurrently, increasing demand on GitHub runners and deployment pipelines.

For a bank, the constraint is particularly significant because compliance and security remain central accountability requirements. A model can produce a technically plausible implementation without understanding whether it is maintainable, compliant, correctly scoped, or safe to operate. The panel explicitly distinguishes building something that works from building a system that can be understood, maintained, audited, and operated over years. The relevant production problem is therefore controlled enablement: allowing developers and agents to move faster without allowing uncontrolled infrastructure variation or autonomous decisions in sensitive domains.

## Platform and LLMOps Architecture

The described architecture is broader than a portal such as Backstage. An internal developer platform includes the portal, provisioning workflows, deployment paths, documentation, service metadata, policy, infrastructure abstractions, and the operational interfaces consumed by developers and agents. A portal based on Backstage is mentioned elsewhere in the discussion as one possible front end, while the platform itself is treated as the broader system of workflows and controls.

The platform can expose organization-specific context to AI tools through reusable skills and internal MCP servers. For example, when a developer asks an agent to create Terraform, the preferred behavior is for the agent to consult an approved internal skill, repository, or module catalog. The generated result can then use the organization’s existing modules and conventions rather than relying on a generic model response, a Stack Overflow example, or unvetted public documentation. This is a form of retrieval and tool grounding, although the source does not describe a conventional vector database, embedding model, or RAG implementation.

The same context layer can centralize coding conventions, pull-request procedures, ticketing-system information, architecture principles, security requirements, and compliance guidance. Better documentation and knowledge graphs are valuable not only for agents but also for human developers. The discussion notes that organizations have long needed clear specifications and reliable documentation, but agent hallucinations and missing context make those weaknesses more immediately visible.

Agents are also described as useful for discovery and analysis. In one platform-team example, AI examines approximately 100 AWS accounts and hundreds of Terraform repositories to identify differences, discover baselines, aggregate information, and help prioritize work. This example is associated with a platform organization in the discussion and should not be interpreted as a quantified DKB deployment result. Similarly, AI can summarize or filter operational logs, help identify likely problems, and open an issue for human analysis. The recommended role is assistive triage rather than one-shot autonomous remediation, because the participants do not consider current agents reliable enough to solve operational issues correctly without interaction and review.

## Guardrails, Security, and Governance

The primary LLMOps requirement is to make nondeterministic model behavior predictable at the system boundary. The platform cannot guarantee that a model will produce the same answer to the same prompt or that a provider will not change a model underneath an application. It can, however, constrain tools, resources, identities, environments, and deployment pathways.

Important controls described in the source include:

- Least-privilege identities and explicit permissions for people and agents.
- Approved MCP servers, skills, and platform APIs rather than unrestricted tool access.
- Sandboxes in which agents can inspect or modify artifacts without immediately affecting production.
- AWS service control policies to prevent destructive or unauthorized actions in particular stages.
- Automated security, compliance, testing, and governance checks in CI/CD.
- Pull requests and human review for changes that require judgment or accountability.
- Audit records and evidence describing what an agent did and why a change was allowed.
- Centralized management of AI-tool licensing, token overages, and other FinOps concerns.
- Post-production evaluation and monitoring for response drift, model drift, and silently changed provider behavior.

For DKB, the stated principle is that agents should not independently make consequential banking decisions. Human intent remains the source of authority: an agent may help achieve a defined outcome, but the organization decides how much autonomy is acceptable and which actions require approval. This is consistent with treating agents as faster consumers of the platform rather than as owners of business intent.

## Delivery and Autonomous SDLC Implications

The longer-term direction is an autonomous or highly automated software delivery lifecycle in which agents can identify an error, propose a code fix, open a pull request, run tests and vulnerability checks, and prepare a deployment. The source presents this as a future-oriented operating model, not as a demonstrated end-to-end DKB capability. To be viable, such a workflow would need systematic permissions, strong separation between environments, reproducible checks, evidence collection, rollback mechanisms, and clear ownership when an automated change causes harm.

AI adoption also changes capacity planning. A developer using agent orchestration may work on several tickets simultaneously and produce a large number of pull requests. Platform teams therefore need sufficient runner capacity, scalable pipelines, and observability across the complete path from source control to production. The objective is not simply to remove human approvals; it is to replace slow, ambiguous manual processes with machine-speed controls that are explicit, testable, and auditable.

The platform should also make the safe path the easy path. Standard service templates and onboarding workflows can configure required infrastructure, pipelines, policies, and metadata when a service is created, rather than relying on teams to discover and implement them over months. Agents can assist with keeping vulnerabilities and dependencies current, but the resulting changes still need the same deployment and governance controls as human-authored changes.

## Evaluation and Measurement

No measured LLM quality, security, latency, cost, or productivity results for DKB are reported. The participants instead identify practical indicators for evaluating platform impact. Time from an idea to a production deployment is a particularly useful measure: if a reusable path reduces a multi-week setup process to approximately an hour, that indicates lower cognitive and operational load, although the example is illustrative rather than a reported DKB result.

Other proposed signals include developer satisfaction and trust, the time required to onboard a new team member, the number of support requests and back-and-forth exchanges in tickets or pull requests, bugs, incidents, and the time needed to resolve them. Relevant DORA metrics can provide additional before-and-after context, but should be interpreted alongside safety and reliability indicators rather than treated as proof that more deployment activity is automatically beneficial.

For the AI layer specifically, production evaluation should examine whether generated infrastructure conforms to approved modules and policies, whether tool calls stay within authorization boundaries, whether responses remain useful after provider model changes, and whether agents produce sufficient evidence for audit. Monitoring response drift and model drift is important because an external provider may change behavior without an application team explicitly changing its prompts. Token consumption alone is not an adequate measure of developer experience or platform value.

## Results and Tradeoffs

The expected benefits are reduced platform toil, better use of previously neglected documentation and maintenance work, faster standardized onboarding, more accessible operational knowledge, and a shorter path for developers to use approved infrastructure patterns. AI may also enable platform teams to handle discovery across large estates and provide first-line support without scaling human support effort linearly.

The tradeoffs are substantial. More automation increases the blast radius of permission mistakes, bad context, hallucinated code, and provider behavior changes. Standardization can reduce inconsistency but may frustrate teams whose requirements do not fit the paved path. Central platform governance can improve security and FinOps control but risks becoming a bottleneck if it relies on manual approval rather than automated policy. Agents can reduce repetitive work without eliminating the need for engineers who understand architecture, operations, compliance, and long-term maintainability.

Overall, the case presents DKB’s AI-era platform challenge as an LLMOps and governance problem more than a model-selection problem. The credible path is to ground agents in internal context, expose narrowly scoped tools, enforce policy at deployment boundaries, evaluate behavior after release, and preserve human accountability for intent and high-impact decisions. The source supports these architectural recommendations and examples of platform-team practice, but it does not establish quantified production benefits or a completed autonomous SDLC at DKB.
