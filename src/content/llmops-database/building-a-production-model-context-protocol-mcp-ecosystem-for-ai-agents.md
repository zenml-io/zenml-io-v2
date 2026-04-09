---
title: "Building a Production Model Context Protocol (MCP) Ecosystem for AI Agents"
slug: "building-a-production-model-context-protocol-mcp-ecosystem-for-ai-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "data-analysis"
  - "poc"
  - "mcp"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "prompt-engineering"
  - "microservices"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "api-gateway"
  - "orchestration"
  - "devops"
  - "security"
  - "guardrails"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "documentation"
  - "open-source"
  - "cicd"
  - "scaling"
  - "serverless"
industryTags: "tech"
company: "Pinterest"
summary: "Pinterest built a production-grade ecosystem around the open-source Model Context Protocol (MCP) to enable AI agents to safely automate engineering tasks at scale. The company transitioned from initial experimentation to running multiple cloud-hosted MCP servers (for Presto, Spark, knowledge retrieval, and other services) integrated across internal chat surfaces, IDEs, and AI agents. By implementing a central registry, comprehensive security controls with JWT-based authorization, business-group access gating, and human-in-the-loop safeguards, Pinterest achieved 66,000 monthly invocations across 844 active users, delivering an estimated 7,000 hours of time saved per month. The architecture emphasizes multiple domain-specific servers rather than a monolithic approach, enabling fine-grained access control and governance while maintaining operational visibility through extensive telemetry."
link: "https://medium.com/pinterest-engineering/building-an-mcp-ecosystem-at-pinterest-d881eb4c16f1"
year: 2026
seo:
  title: "Pinterest: Building a Production Model Context Protocol (MCP) Ecosystem for AI Agents - ZenML LLMOps Database"
  description: "Pinterest built a production-grade ecosystem around the open-source Model Context Protocol (MCP) to enable AI agents to safely automate engineering tasks at scale. The company transitioned from initial experimentation to running multiple cloud-hosted MCP servers (for Presto, Spark, knowledge retrieval, and other services) integrated across internal chat surfaces, IDEs, and AI agents. By implementing a central registry, comprehensive security controls with JWT-based authorization, business-group access gating, and human-in-the-loop safeguards, Pinterest achieved 66,000 monthly invocations across 844 active users, delivering an estimated 7,000 hours of time saved per month. The architecture emphasizes multiple domain-specific servers rather than a monolithic approach, enabling fine-grained access control and governance while maintaining operational visibility through extensive telemetry."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-model-context-protocol-mcp-ecosystem-for-ai-agents"
  ogTitle: "Pinterest: Building a Production Model Context Protocol (MCP) Ecosystem for AI Agents - ZenML LLMOps Database"
  ogDescription: "Pinterest built a production-grade ecosystem around the open-source Model Context Protocol (MCP) to enable AI agents to safely automate engineering tasks at scale. The company transitioned from initial experimentation to running multiple cloud-hosted MCP servers (for Presto, Spark, knowledge retrieval, and other services) integrated across internal chat surfaces, IDEs, and AI agents. By implementing a central registry, comprehensive security controls with JWT-based authorization, business-group access gating, and human-in-the-loop safeguards, Pinterest achieved 66,000 monthly invocations across 844 active users, delivering an estimated 7,000 hours of time saved per month. The architecture emphasizes multiple domain-specific servers rather than a monolithic approach, enabling fine-grained access control and governance while maintaining operational visibility through extensive telemetry."
notion:
  pageId: "32ef8dff-2538-80c6-97fd-e28a779c00b8"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-03-25T19:17:00.000Z"
  lastEditedTime: "2026-04-09T17:37:00.000Z"
  publishedAt: "2026-04-09T17:56:49Z"
---

## Overview

Pinterest's case study describes their comprehensive journey building a production-grade ecosystem around the Model Context Protocol (MCP), an open-source standard that enables large language models to interact with tools and data sources through a unified client-server protocol. Published in March 2026, this case study demonstrates how Pinterest evolved from initial experimentation to running a robust, security-conscious production system supporting AI agents that automate engineering tasks across multiple internal surfaces. The implementation showcases significant LLMOps maturity, with particular emphasis on security, governance, deployment architecture, and observability.

The case study is notable for its candid discussion of architectural choices, security tradeoffs, and the operational challenges of running LLM-powered agents in production at scale. While Pinterest reports impressive metrics (66,000 monthly invocations, 7,000 hours saved monthly), the documentation appropriately acknowledges these are directional estimates based on owner-provided metadata rather than rigorous measurement, demonstrating a balanced perspective on impact assessment.

## Business Context and Problem

Pinterest faced a common challenge in the era of AI agents: while large language models showed promise for automating engineering tasks, each integration required bespoke, one-off connections between models and various internal tools and data sources. The company wanted to move beyond simple question-answering chatbots to AI agents that could "safely automate engineering tasks" ranging from log analysis to bug investigation and proposing fix pull requests.

The core problem was establishing a standardized, scalable, and secure approach to connecting LLMs with internal systems like Presto (for data querying), Spark (for debugging jobs), Airflow, and knowledge bases. Without a unified protocol, each new use case would require custom integration work, making it difficult to scale AI capabilities across the organization while maintaining security and governance standards.

## Architectural Decisions

Pinterest made several deliberate architectural choices that shaped their MCP implementation and reveal important LLMOps considerations:

**Cloud-Hosted vs. Local Architecture**: While MCP supports local servers running on developer laptops or personal cloud development boxes (communicating over stdio), Pinterest explicitly optimized for internal cloud-hosted MCP servers. This decision prioritizes centralized security controls, internal routing logic, and operational consistency over developer flexibility. Local MCP servers remain possible for experimentation, but the "paved path" directs teams toward cloud deployment. This represents a classic LLMOps tradeoff between developer autonomy and centralized governance—Pinterest chose the latter for production systems.

**Multiple Domain-Specific Servers vs. Monolithic Approach**: Pinterest deliberately chose to deploy multiple small, domain-specific MCP servers (Presto, Spark, Airflow, Knowledge, etc.) rather than a single monolithic server. This microservices-style approach offers several advantages: different access controls can be applied per server, the model's context window isn't crowded with irrelevant tools, and individual teams can own their specific domains. However, this multiplied operational overhead initially—teams needed to handle deployment pipelines, service configuration, and operational setup before writing business logic. Pinterest addressed this by creating a unified deployment pipeline that handles infrastructure for all MCP servers, allowing domain experts to focus on business logic rather than deployment mechanics. This evolution demonstrates mature LLMOps thinking: recognizing when platform investment is needed to reduce friction for feature teams.

**Central Registry as Source of Truth**: The internal MCP registry serves as the backbone of Pinterest's ecosystem, fulfilling multiple critical LLMOps functions. For humans, the web UI enables discovery of servers, owning teams, support channels, security posture, live status, and available tools. For systems, the API allows AI clients (web chat, communication platform bots, IDE integrations) to discover and validate servers, and enables internal services to perform authorization checks ("Is this user allowed to use server X?"). The registry also serves as the governance checkpoint—only registered servers are "approved for use in production." This centralized approach to service discovery and governance is essential for operating LLM systems at scale, though it does create a potential bottleneck and single point of coordination.

## Deployment and Integration

Pinterest integrated MCP across multiple internal surfaces where engineers already work, demonstrating practical LLMOps principle of meeting users in their existing workflows rather than requiring adoption of new tools:

**Internal LLM Web Chat Interface**: Used daily by the majority of Pinterest employees, this surface automatically performs OAuth flows where required and returns a list of usable tools for the current user, scoped to respect security policies. MCP tools are bound directly into the agent's toolset, making MCP invocation indistinguishable from calling any other tool from the user's perspective.

**AI Bots in Internal Communication Platform**: Similar to the web interface, these bots handle authentication and authorization through the registry API. They also support context-specific functionality, such as restricting certain MCP tools to specific communication channels (Spark MCP tools only available in Airflow support channels). This context-aware tool access represents thoughtful UX design for AI agents.

**IDE Integrations**: While less detailed in the case study, IDE plugins also connect to the MCP ecosystem, bringing data and automation capabilities directly into development environments.

The end-to-end flow demonstrates significant operational maturity: developers build an MCP server, deploy it through the unified pipeline, register it in the central registry (triggering security reviews), and then end users across multiple surfaces can immediately begin using those tools subject to appropriate authorization checks.

## Security and Governance Architecture

Pinterest treated MCP as a joint project with Security from day one, recognizing that "letting AI agents call tools that touch real systems and data raises obvious security questions." Their security architecture demonstrates sophisticated LLMOps thinking around authentication, authorization, and governance:

**MCP Security Standard and Review Process**: Every production MCP server must be owned by a team, listed in the internal registry, and undergo comprehensive review yielding Security, Legal/Privacy, and GenAI review tickets that must be approved before production use. These reviews determine security policies like user group access restrictions. This formalized review process is critical for LLMOps at scale—it ensures AI systems don't become security backdoors while maintaining velocity through standardized processes.

**Two-Layer Authorization Model**: Pinterest implements authorization at two distinct layers, combining end-user identity with service mesh security:

The end-user flow leverages JWT-based authentication where users authenticate with Pinterest's internal auth stack when accessing surfaces like web chat or IDE plugins. The client performs OAuth and sends the resulting JWT when connecting to the registry and target MCP servers. Envoy validates the JWT, extracts user identity and group membership into headers (X-Forwarded-User, X-Forwarded-Groups), and enforces coarse-grained policies like "AI chat webapp in prod may talk to Presto MCP server, but not experimental dev namespace servers." Inside servers, tools use lightweight decorators like `@authorize_tool(policy='…')` to enforce fine-grained rules, such as restricting revenue metrics tools to Ads-eng groups only.

For low-risk, read-only scenarios with no human in the loop and constrained blast radius, Pinterest uses SPIFFE-based service mesh identity authentication instead of requiring human JWTs. This provides flexibility while maintaining security appropriate to risk level.

**Business-Group-Based Access Gating**: For sensitive servers like Presto that can query internal data systems, Pinterest implemented additional access restrictions. The server extracts business group membership from JWT tokens and validates users belong to authorized groups before accepting connections. Only approved business groups (Ads, Finance, specific infra teams) can establish sessions and use higher-privilege tools. This means that even though Presto MCP server is technically reachable from broad surfaces like web chat, data access is still tightly controlled based on business need-to-know. This demonstrates mature data governance thinking applied to LLM systems.

**Contrast with MCP OAuth Standard**: Pinterest's approach differs from the MCP specification's standard OAuth 2.0 flow. The standard involves users explicitly authenticating with each MCP server with consent screens and per-server token management. Pinterest instead piggybacks on existing internal authentication sessions, with Envoy and policy decorators handling authorization transparently. This avoids consent dialog fatigue while maintaining fine-grained control, though it does couple the MCP system more tightly to Pinterest's internal infrastructure.

**Human-in-the-Loop Requirements**: Recognizing that automated actions have larger blast radius than manual tool use, Pinterest mandates human-in-the-loop confirmation before sensitive or expensive actions. Agents propose actions using MCP tools, and humans approve or reject (optionally in batches) before execution. The system also uses elicitation to confirm dangerous actions, such as asking for confirmation before overwriting data in a table. This represents conservative and responsible LLMOps practice, though it does limit full automation potential.

## Representative MCP Servers and Use Cases

Pinterest seeded the ecosystem with high-leverage servers solving real pain points, then enabled other teams to build on that foundation:

**Presto MCP Server**: Consistently the highest-traffic server, enabling agents and AI-enabled IDEs to pull Presto-backed data on demand. This brings data directly into workflows instead of context-switching to dashboards. The high usage suggests significant value in reducing friction for data access, though the case study doesn't detail how query safety or cost controls are managed when LLMs generate Presto queries.

**Spark MCP Server**: Underpins AI Spark debugging experience for diagnosing job failures, summarizing logs, and helping record structured root-cause analyses. This transforms "noisy operational threads into reusable knowledge," suggesting the system not only helps immediate debugging but also contributes to organizational learning. This represents a sophisticated use case beyond simple automation.

**Knowledge MCP Server**: A general-purpose knowledge endpoint used by internal AI bots for company knowledge, Q&A, and documentation retrieval across internal sources. This enables agents to access institutional knowledge with the same ease as calling operational tools, demonstrating the versatility of the MCP abstraction for both action-oriented and information-retrieval use cases.

## Observability and Measurement

Pinterest designed the MCP ecosystem to be "measured and observable" from the start. All MCP servers use library functions providing out-of-the-box logging for inputs/outputs, invocation counts, exception tracing, and telemetry for impact analysis. This standardized observability approach is essential for operating distributed LLM systems—without it, debugging and optimization become nearly impossible.

At the ecosystem level, Pinterest tracks the number of registered MCP servers and tools, invocation counts across all servers, and estimated time-savings per invocation (provided as metadata by server owners). These roll up into a north-star metric of "time saved." For each tool, owners provide directional "minutes saved per invocation" estimates based on lightweight user feedback and comparison to prior manual workflows. Combined with invocation counts, this yields order-of-magnitude impact views.

As of January 2025 (presumably the data cutoff for the March 2026 publication), Pinterest reported 66,000 invocations per month across 844 monthly active users, with MCP tools estimated to save around 7,000 hours per month. The case study appropriately characterizes these as "directional signals of value" and "order-of-magnitude views" rather than precise measurements, acknowledging the limitations of owner-provided estimates. This honest characterization of measurement uncertainty is refreshing and reflects mature thinking about impact assessment for productivity tools.

However, the case study doesn't discuss several important observability questions: How is quality or accuracy of agent outputs measured? What are error rates or failure modes? How often do humans reject agent proposals in the human-in-the-loop flow? Are there cost metrics tracked for LLM API calls or compute resources? These gaps may simply reflect what Pinterest chose to share publicly rather than gaps in their actual practice.

## LLMOps Maturity and Tradeoffs

Pinterest's MCP implementation demonstrates significant LLMOps maturity across multiple dimensions:

**Standardization and Platform Thinking**: Rather than allowing fragmented point solutions, Pinterest invested in a unified platform with standardized deployment, security, and observability patterns. This upfront investment in platform infrastructure pays dividends in reduced friction for feature teams and consistent operational practices.

**Security-First Design**: Integrating security from day one rather than bolting it on later, with comprehensive review processes, multi-layer authorization, and principle of least privilege throughout. This is essential for production LLM systems but does add process overhead.

**Meeting Users Where They Work**: Integrating MCP across existing surfaces (web chat, communication bots, IDEs) rather than requiring new tools demonstrates product thinking alongside technical implementation.

**Acknowledging Limitations**: The case study honestly discusses measurement challenges and characterizes metrics as directional rather than precise, showing intellectual honesty about what's actually known versus claimed.

However, several tradeoffs are worth noting:

**Centralization vs. Flexibility**: The cloud-hosted, registry-centric approach prioritizes governance and security over developer flexibility. Teams can't easily spin up experimental servers without going through formal processes, which may slow innovation velocity.

**Human-in-the-Loop Constraints**: While appropriate for risk management, requiring human confirmation before actions limits the degree of automation achievable and may reduce the time-savings potential of agents.

**Operational Complexity**: Running multiple domain-specific servers, maintaining a central registry, implementing two-layer authorization, and managing cross-cutting observability requires significant operational investment. Smaller organizations might struggle to justify this overhead.

**Measurement Challenges**: Relying on owner-provided estimates for time savings makes it difficult to rigorously assess ROI or compare value across different tools. More systematic measurement would strengthen the business case but would also add overhead.

## Broader LLMOps Implications

This case study offers several valuable lessons for LLMOps practitioners:

**Protocol Standardization Value**: MCP as an open standard enabled Pinterest to avoid reinventing integration patterns for each tool-model combination. Similar standardization (whether through MCP, function calling schemas, or other protocols) appears essential for scaling LLM systems beyond toy examples.

**Security Can't Be Afterthought**: The comprehensive security architecture—reviews, multi-layer auth, access gating, human-in-the-loop—had to be designed in from the start. Retrofitting such controls onto existing systems would be significantly more difficult.

**Platform Investment Pays Off**: The unified deployment pipeline and standardized libraries that reduced friction for server development demonstrate how upfront platform investment enables feature teams. This is classic platform engineering applied to LLMOps.

**Observability Foundations Matter**: Standardized logging, telemetry, and impact tracking built into library functions means every server gets observability "for free." Without this foundation, operating the ecosystem at scale would be much harder.

**Measurement Remains Hard**: Even with significant investment, Pinterest relies on directional estimates rather than rigorous measurement of agent impact. This suggests productivity measurement for AI agents remains an unsolved problem requiring further innovation.

The case study's publication as part of Pinterest's engineering blog series suggests they view this work as differentiating and want to share learnings with the broader community, which is valuable for advancing LLMOps practices generally. However, readers should remember this represents one company's approach optimized for their specific context—a large tech company with significant engineering resources and existing internal infrastructure (service mesh, auth systems, etc.) to build upon. Smaller organizations or those with different constraints might reasonably make different architectural choices.
