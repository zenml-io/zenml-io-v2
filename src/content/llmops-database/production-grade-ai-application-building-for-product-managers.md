---
title: "Production-grade AI application building for product managers"
slug: "production-grade-ai-application-building-for-product-managers"
draft: false
llmopsTags:
  - "code-generation"
  - "data-integration"
  - "poc"
  - "regulatory-compliance"
  - "visualization"
  - "prompt-engineering"
  - "system-prompts"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "evals"
  - "cost-optimization"
  - "latency-optimization"
  - "docker"
  - "serverless"
  - "databases"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "anthropic"
industryTags: "tech"
company: "Aha!"
summary: "Aha! built Aha! Builder to help product managers move from product strategy and customer insight to interactive prototypes, proofs of concept, and medium-complexity business applications without requiring traditional software development skills. The system extends Aha!'s existing AI assistant with a coding-agent harness, phased interview-to-prototype-to-application workflow, deterministic platform components for authentication, user management, email, APIs, databases, and AI features, and hosted deployment with enterprise governance controls. An initial containerized Ruby on Rails implementation proved the user experience but was considered too expensive and inefficient to scale, so Aha! rebuilt the runtime as a multi-tenant JavaScript platform using V8 isolates. Early adoption and internal usage reportedly showed strong interest, while the company positions Builder as complementary to engineering rather than a replacement for teams responsible for core business systems, compliance decisions, and production change management."
link: "https://www.youtube.com/watch?v=efIx1QNHDU4"
year: 2026
seo:
  title: "Aha!: Production-grade AI application building for product managers - ZenML LLMOps Database"
  description: "Aha! built Aha! Builder to help product managers move from product strategy and customer insight to interactive prototypes, proofs of concept, and medium-complexity business applications without requiring traditional software development skills. The system extends Aha!'s existing AI assistant with a coding-agent harness, phased interview-to-prototype-to-application workflow, deterministic platform components for authentication, user management, email, APIs, databases, and AI features, and hosted deployment with enterprise governance controls. An initial containerized Ruby on Rails implementation proved the user experience but was considered too expensive and inefficient to scale, so Aha! rebuilt the runtime as a multi-tenant JavaScript platform using V8 isolates. Early adoption and internal usage reportedly showed strong interest, while the company positions Builder as complementary to engineering rather than a replacement for teams responsible for core business systems, compliance decisions, and production change management."
  canonical: "https://www.zenml.io/llmops-database/production-grade-ai-application-building-for-product-managers"
  ogTitle: "Aha!: Production-grade AI application building for product managers - ZenML LLMOps Database"
  ogDescription: "Aha! built Aha! Builder to help product managers move from product strategy and customer insight to interactive prototypes, proofs of concept, and medium-complexity business applications without requiring traditional software development skills. The system extends Aha!'s existing AI assistant with a coding-agent harness, phased interview-to-prototype-to-application workflow, deterministic platform components for authentication, user management, email, APIs, databases, and AI features, and hosted deployment with enterprise governance controls. An initial containerized Ruby on Rails implementation proved the user experience but was considered too expensive and inefficient to scale, so Aha! rebuilt the runtime as a multi-tenant JavaScript platform using V8 isolates. Early adoption and internal usage reportedly showed strong interest, while the company positions Builder as complementary to engineering rather than a replacement for teams responsible for core business systems, compliance decisions, and production change management."
notion:
  pageId: "3e2f8dff-2538-808a-9dff-df61aa7a3fa7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-21T17:40:00.000Z"
  lastEditedTime: "2026-09-21T17:40:00.000Z"
  publishedAt: "2026-09-28T08:26:34Z"
---

## Overview

Aha! created Aha! Builder for product managers who need to turn product strategy, customer understanding, and feature concepts into working software more quickly. The use case sits between traditional wireframing and full engineering delivery: a product manager can create an interactive prototype, deepen it into a proof of concept with data and authentication, or deploy a medium-complexity internal or connective business application. The product is not positioned as a way to replace engineering teams building a company’s primary line-of-business systems. Instead, it aims to make the product-management-to-code handoff more concrete while providing the hosting, governance, and operational controls that generic coding-agent tools often leave to users.

Builder emerged after Aha! observed repeated internal use of an AI assistant feature that generated React-based prototypes. Product managers used the prototypes to express visual intent, obtain feedback, and explore functionality rather than relying only on wireframes. Customers then wanted to progress from visual demonstrations to applications that could store data, call APIs, integrate with other systems, and perform useful work. Aha! used its existing AI infrastructure and enterprise SaaS platform as the foundation, but had to redesign the execution architecture when the first implementation proved costly to scale.

## Product discovery and scope

Aha! followed a staged product-discovery process. The initial concept was tested using designs and a small presentation with prospective customers, with conversations focused not only on whether the idea was attractive but also on willingness to pay, likely adoption timing, and the specific problems customers wanted solved. The company then built a working proof of concept for internal use, ran demonstrations, invited interested customers into a private early-access program, and moved toward general availability. Early-access participants were expected to provide usage and recurring feedback, creating a practical validation loop rather than relying only on demonstrations.

The resulting scope is deliberately narrower than a general-purpose software factory. Builder is intended for interactive prototypes, deeper proofs of concept, and applications such as dashboards, status tools, workflow glue between systems, beta-management utilities, and other business applications that may not receive priority from a central engineering team. Aha! explicitly distinguishes these from primary systems of record and highly complex machine-learning workloads. It also acknowledges that deployment, operations, review, and organizational change remain substantial responsibilities, even when an agent can generate code.

## Agent architecture and workflow

Builder reuses Aha!’s pre-existing AI assistant framework, including an agent loop, tool-calling infrastructure, account-context access, and a user interface for displaying results. The assistant can work with information already present in the Aha! environment, including product strategy, roadmaps, customer ideas, and feedback. This contextual integration is a claimed differentiator because the generated application can remain connected to the product-management workflow instead of being created in an isolated prototyping tool.

The system uses a phased rather than purely conversational generation process. It begins with an interview that elicits the intended users, goals, product vision, and problem context. The system then creates a visual prototype before going deeper into application behavior, data structures, and backend support. The stated rationale is that a coherent user experience should be established before the agent commits to a schema or implementation detail. The complete process can reportedly produce an application within several minutes, although the source does not provide independent quality measurements or a breakdown of how often generated applications require correction.

The architecture is described as multi-phase and potentially multi-agent, with roles or stages associated with design-system creation, prototyping, and application building. In practice, the important operational pattern is separation of concerns: gather requirements, establish the interface and design direction, then generate the data and backend behavior needed to support it. This provides more structure for nontechnical users than an unrestricted chat prompt and is intended to reduce the likelihood that users will enter an unproductive repair loop when generated code does not behave as expected.

The agent receives virtualized filesystem tools and documentation for the available platform capabilities. These tools are intentionally shaped similarly to interfaces used by coding agents, because the underlying models have learned common code-editing and file-manipulation patterns. The model can progressively discover component capabilities through the virtual filesystem, while higher-priority instructions direct it to use existing platform services for sensitive functions rather than implement them from scratch.

## Deterministic platform capabilities and guardrails

A central design decision was to keep security-sensitive and commonly repeated functions in deterministic platform code. Authentication, single sign-on, user management, roles, lifecycle controls, email delivery, API access, database capabilities, and the ability to invoke AI are exposed as reusable building blocks. The model is prompted to consult the documentation and invoke these components when needed. It is not expected to generate authentication or access-control logic independently for every application.

This approach reduces the attack surface and avoids wasting model tokens on repeatedly generating standard functionality, but it does not make the entire application deterministic or automatically secure. Agent-generated business logic can still contain defects, expose data incorrectly, or implement an unsafe workflow. The platform can constrain available authentication methods at the account level, allowing an enterprise administrator to require a particular SSO configuration rather than asking a product manager or model to choose one. Administrators can also apply deployment guardrails, such as preventing public deployment or requiring approved authentication.

The company describes tools that scan applications for signals such as cookie use and personally identifiable information. These scans are intended to translate implementation details into information a product manager can discuss with legal, privacy, and security teams. They are an aid to review, not a replacement for regulatory analysis or organizational approval. The treatment of PII and protected health information remains dependent on jurisdiction, contractual obligations, data flows, and human governance; platform security certifications alone do not establish that a particular application is compliant.

## Runtime and deployment architecture

The first Builder implementation used Ruby on Rails behind a conventional containerized development model. Containers supplied isolation and worked functionally, but Aha! found that persistent or frequently available containers consumed substantial memory and CPU while users were thinking or while applications were idle. Container startup and dedicated capacity also created cost and latency concerns. This scaling profile differed from Aha!’s established single-instance, multi-tenant SaaS architecture.

Aha! therefore rebuilt the execution layer so generated applications could run on the same broad multi-tenant infrastructure as the rest of the platform. Requests use infrastructure already serving a large number of application instances, while code and data isolation are provided through V8 isolates. The tradeoff is that the runtime is limited to JavaScript for both frontend and backend execution. Aha! reports that rebuilding the application in JavaScript demonstrated comparable capability for its target of medium-complexity web applications, but this choice would not be suitable for every workload, particularly specialized machine-learning pipelines, custom embedding pipelines, or arbitrary language runtimes.

Hosting is managed by Aha!, enabling a product manager to deploy without independently configuring servers or infrastructure. This improves accessibility and allows centralized controls, but it also creates platform dependency and makes Aha!’s isolation, availability, data-handling, and incident-response practices critical to the risk assessment. The source presents security audits and an established multi-tenant architecture as advantages, but it does not provide detailed audit results, service-level metrics, failure rates, or comparative cost data.

## Model use, evaluation, and cost

The primary model identified for Builder is Claude Sonnet, selected by Aha! for medium-complexity application generation and relatively high speed. The company says it uses an established evaluation framework extensively for other parts of its AI assistant, especially custom tools operating on roadmap data. For Builder specifically, however, validation is described as more heavily dependent on practical use by Aha!’s engineering team and the observed performance of the coding model than on published, task-specific evaluation scores.

That distinction is important. Internal dogfooding and customer feedback can expose usability and product-fit problems, but they do not substitute for reproducible evaluations of requirements adherence, code correctness, security, isolation, authorization, regression behavior, latency, and cost. The phased workflow, deterministic components, and deployment controls are useful quality mechanisms, yet the available evidence does not establish consistent production reliability across arbitrary applications. A mature operational program would need application-level testing, human review policies, monitoring, rollback procedures, and explicit boundaries for what can be deployed without engineering approval.

Aha! passes through model usage costs to customers through a credit-based charging model. The company characterizes AI as an enabling technology rather than the main source of its value; the proposed value lies in the integration with product strategy and feedback workflows, reusable enterprise capabilities, and hosted operations. Passing through inference costs makes economics more transparent, but it also means that long agent runs, repeated retries, large contexts, and complex applications can produce variable customer bills.

## Results and tradeoffs

The strongest reported result is behavioral rather than numerical: Aha!’s own product managers adopted AI-generated prototypes repeatedly, and the company observed customers progressing from prototypes toward interactive applications. The platform reportedly supports meaningful internal enterprise applications and applications where data security matters, but the source supplies no independent adoption figures, deployment counts, uptime statistics, defect rates, time savings, or measured return on investment. Claims about scalability and security should therefore be treated as product assertions rather than independently verified outcomes.

Builder’s advantages are its fit with an existing product-management system, structured discovery workflow, reusable deterministic services, enterprise authentication and governance, and managed deployment. Its limitations include dependence on the Aha! platform and selected JavaScript runtime, incomplete evidence about generated-code quality, ongoing need for security and compliance review, model cost variability, and the difficulty of helping less technical users recognize when an agent has produced a plausible but incorrect result. The approach is most credible for prototypes, internal tools, and moderate-complexity applications with clear organizational guardrails. It is less appropriate as an autonomous path to production for critical systems, regulated workloads, specialized ML infrastructure, or software requiring deep engineering ownership.

Aha! also maintains a separation between Builder and engineering delivery. Product managers may use prototypes and feedback to clarify requirements, while integrations with coding agents in the broader product portfolio can initiate work within an engineering team’s existing pull-request and deployment process. This preserves code review, operational ownership, and change-management controls. In that sense, the case demonstrates an LLMOps pattern in which model generation is embedded within a governed software platform rather than treated as a substitute for the full software-development lifecycle.
