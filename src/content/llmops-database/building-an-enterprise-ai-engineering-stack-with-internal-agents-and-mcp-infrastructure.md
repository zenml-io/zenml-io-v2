---
title: "Building an Enterprise AI Engineering Stack with Internal Agents and MCP Infrastructure"
slug: "building-an-enterprise-ai-engineering-stack-with-internal-agents-and-mcp-infrastructure"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "chatbot"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "realtime-application"
  - "prompt-engineering"
  - "token-optimization"
  - "multi-agent-systems"
  - "agent-based"
  - "cost-optimization"
  - "latency-optimization"
  - "mcp"
  - "evals"
  - "kubernetes"
  - "docker"
  - "cicd"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "orchestration"
  - "continuous-integration"
  - "continuous-deployment"
  - "devops"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "elasticsearch"
  - "cloudflare"
  - "openai"
  - "anthropic"
  - "google-gcp"
  - "meta"
industryTags: "tech"
company: "Cloudflare"
summary: "Cloudflare built a comprehensive internal AI engineering stack over eleven months to integrate AI coding assistants across their R&D organization, achieving 93% adoption among engineering teams. The solution involved creating an MCP-based infrastructure using their own products (AI Gateway, Workers AI, Cloudflare Access, Agents SDK, Workflows, and Sandbox SDK), developing 13 MCP servers with 182+ tools, generating AGENTS.md files for ~3,900 repositories, implementing automated AI code review for all merge requests, and establishing an Engineering Codex for standards enforcement. The result was a dramatic increase in developer velocity with merge requests nearly doubling, processing 241.37 billion tokens monthly through AI Gateway, with 3,683 active users generating 47.95 million AI requests in the last 30 days, while maintaining security through zero-trust authentication and zero data retention policies."
link: "https://blog.cloudflare.com/internal-ai-engineering-stack/"
year: 2026
seo:
  title: "Cloudflare: Building an Enterprise AI Engineering Stack with Internal Agents and MCP Infrastructure - ZenML LLMOps Database"
  description: "Cloudflare built a comprehensive internal AI engineering stack over eleven months to integrate AI coding assistants across their R&D organization, achieving 93% adoption among engineering teams. The solution involved creating an MCP-based infrastructure using their own products (AI Gateway, Workers AI, Cloudflare Access, Agents SDK, Workflows, and Sandbox SDK), developing 13 MCP servers with 182+ tools, generating AGENTS.md files for ~3,900 repositories, implementing automated AI code review for all merge requests, and establishing an Engineering Codex for standards enforcement. The result was a dramatic increase in developer velocity with merge requests nearly doubling, processing 241.37 billion tokens monthly through AI Gateway, with 3,683 active users generating 47.95 million AI requests in the last 30 days, while maintaining security through zero-trust authentication and zero data retention policies."
  canonical: "https://www.zenml.io/llmops-database/building-an-enterprise-ai-engineering-stack-with-internal-agents-and-mcp-infrastructure"
  ogTitle: "Cloudflare: Building an Enterprise AI Engineering Stack with Internal Agents and MCP Infrastructure - ZenML LLMOps Database"
  ogDescription: "Cloudflare built a comprehensive internal AI engineering stack over eleven months to integrate AI coding assistants across their R&D organization, achieving 93% adoption among engineering teams. The solution involved creating an MCP-based infrastructure using their own products (AI Gateway, Workers AI, Cloudflare Access, Agents SDK, Workflows, and Sandbox SDK), developing 13 MCP servers with 182+ tools, generating AGENTS.md files for ~3,900 repositories, implementing automated AI code review for all merge requests, and establishing an Engineering Codex for standards enforcement. The result was a dramatic increase in developer velocity with merge requests nearly doubling, processing 241.37 billion tokens monthly through AI Gateway, with 3,683 active users generating 47.95 million AI requests in the last 30 days, while maintaining security through zero-trust authentication and zero data retention policies."
notion:
  pageId: "34ef8dff-2538-8117-baae-e7c4b66fa480"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T13:11:51Z"
---

## Overview

Cloudflare's case study describes an eleven-month internal initiative to build a production-scale AI engineering infrastructure that now serves 93% of their R&D organization. This is a comprehensive LLMOps implementation that touches every aspect of the AI-in-production lifecycle: authentication and access control, routing and cost management, model selection and inference, tool integration via Model Context Protocol (MCP), knowledge management, automated code review, and standards enforcement. The implementation is notable because it's built entirely on Cloudflare's own platform products, making it both a case study and a reference architecture for their customers.

The numbers reported demonstrate genuine production scale: 3,683 active users across the company (60% company-wide), 47.95 million AI requests in the last 30 days, 241.37 billion tokens routed through AI Gateway, and 51.83 billion tokens processed on Workers AI. The team reports nearly doubling merge request volume, with the 4-week rolling average climbing from approximately 5,600 per week to over 8,700, peaking at 10,952 in late March 2026.

## Platform Architecture and Authentication Layer

The foundation of Cloudflare's LLMOps infrastructure is a layered architecture that enforces zero-trust security while providing a seamless developer experience. Every AI request flows through Cloudflare Access for authentication, then through AI Gateway for routing, observability, and policy enforcement. This centralized control plane provides visibility into model usage, cost tracking per user, and enforcement of data retention policies across the organization.

The authentication flow demonstrates thoughtful design for enterprise deployment. Engineers authenticate once via their standard SSO using the command `opencode auth login https://opencode.internal.domain`, which triggers a discovery process that automatically configures their local environment. The discovery endpoint, served by a Worker, returns both authentication requirements and a complete configuration including providers, MCP servers, agents, commands, and default permissions. This eliminates manual configuration and ensures consistent setup across thousands of users.

A critical architectural decision was routing all requests through a proxy Worker rather than connecting clients directly to AI Gateway. While direct connections would have been simpler initially, the proxy pattern created a control plane that enabled per-user attribution, model catalog management, and permission enforcement to be added later without touching any client configurations. The Worker handles three key functions: serving shared configuration with runtime placeholder replacement, proxying requests to AI Gateway while injecting server-side API keys and stripping client credentials, and maintaining a fresh model catalog via hourly cron triggers that automatically apply Zero Data Retention settings to new models.

For user tracking, the system implements privacy-preserving analytics by mapping user emails to UUIDs using D1 for persistent storage and KV as a read cache. AI Gateway only receives the anonymous UUID in metadata, never the email address, enabling per-user cost tracking and usage analytics without exposing identities to model providers or appearing in Gateway logs.

## AI Gateway and Multi-Provider Routing

AI Gateway serves as the central routing and observability layer, handling over 20 million requests per month processing 241.37 billion tokens. The system routes to multiple providers: frontier labs (OpenAI, Anthropic, Google) handle 91.16% of requests (13.38 million monthly), while Workers AI handles 8.84% (1.3 million requests monthly). This distribution reflects a pragmatic approach where frontier models handle complex agentic coding work while open-source models on Workers AI serve specific use cases at significantly lower cost.

The reported analytics show AI Gateway processing approximately 688,460 requests per day with 10.57 billion tokens daily. The system provides unified visibility across all model providers through a single endpoint, with cost tracking and data retention controls enforced centrally. Each provider gets a dedicated path prefix (`/anthropic`, `/openai`, `/google-ai-studio/v1beta`, `/compat` for Workers AI) that the Worker forwards to the corresponding AI Gateway route.

An important operational detail is the model catalog management system. The Worker fetches the current OpenAI model list from `models.dev` hourly, caches it in Workers KV, and automatically injects `store: false` on every model to enforce Zero Data Retention. This ensures new models get ZDR protection automatically without requiring configuration redeployments, addressing a common operational challenge in enterprise LLM deployments.

## Workers AI for Cost-Optimized Inference

Workers AI, Cloudflare's serverless inference platform running open-source models on GPUs across their global network, processes 51.47 billion input tokens and 361.12 million output tokens monthly. The platform provides significant cost advantages compared to frontier models while maintaining same-network latency since inference runs on the same infrastructure as Workers, Durable Objects, and storage, eliminating cross-cloud network hops.

The case study highlights Kimi K2.5, a frontier-scale open-source model with a 256k context window launched on Workers AI in March 2026, as particularly valuable for specific workloads. Cloudflare runs a security agent processing over 7 billion tokens daily on Kimi, which they estimate would cost $2.4 million annually on a mid-tier proprietary model but runs 77% cheaper on Workers AI. Beyond security, Workers AI handles documentation review in CI pipelines, generation of AGENTS.md context files across thousands of repositories, and lightweight inference tasks where same-network latency matters more than peak model capability.

The AI Code Reviewer leverages Workers AI for approximately 15% of review traffic, primarily for documentation review tasks where Kimi K2.5 performs well at a fraction of frontier model costs. Meanwhile, models like Opus 4.6 and GPT 5.4 handle security-sensitive and architecturally complex reviews where reasoning capability matters most. This demonstrates intelligent workload routing based on task requirements and cost-performance tradeoffs.

## MCP Infrastructure and Tool Integration

Cloudflare built a comprehensive MCP (Model Context Protocol) infrastructure centered around an MCP Server Portal that aggregates 13 production MCP servers exposing 182+ tools. These servers provide access to critical internal systems including Backstage (their service catalog), GitLab, Jira, Sentry, Elasticsearch, Prometheus, Google Workspace, and their internal Release Manager. The portal architecture provides one endpoint and one Cloudflare Access authentication flow governing access to every tool, dramatically simplifying the authentication and discovery problem for thousands of users.

Each MCP server is built on a common foundation using McpAgent from the Agents SDK, workers-oauth-provider for OAuth, and Cloudflare Access for identity. The entire MCP infrastructure lives in a single monorepo with shared authentication infrastructure, Bazel builds, CI/CD pipelines, and catalog-info.yaml files for Backstage registration. Adding new servers primarily involves copying an existing implementation and changing the API it wraps, demonstrating the value of standardized infrastructure.

An important innovation is the implementation of Code Mode at the portal layer to address context window token consumption. Traditional MCP implementations expose every tool schema upfront, consuming significant context window tokens before the model begins working. For example, their GitLab MCP server originally exposed 34 individual tools whose schemas consumed approximately 15,000 tokens per request—7.5% of a 200K context window budget. With Code Mode, the portal collapses all upstream tools into two portal-level tools: `portal_codemode_search` and `portal_codemode_execute`. This approach scales cleanly as new MCP servers are added since the client still only sees two tools regardless of how many servers connect behind the portal, significantly reducing context bloat and token costs.

## Knowledge Layer: Backstage Service Catalog

The knowledge layer is built on Backstage, the open-source internal developer portal originally created by Spotify. Cloudflare's Backstage instance tracks 2,055 services, 167 libraries, 122 packages, 228 APIs with schema definitions, 544 systems (products) across 45 domains, 1,302 databases, 277 ClickHouse tables, 173 clusters, 375 teams, and 6,389 users with ownership mappings. Critically, it maintains dependency graphs connecting services to the databases, Kafka topics, and cloud resources they rely on.

The Backstage MCP server, available through the MCP Portal, exposes 13 tools that allow agents to look up service ownership, check dependencies, find related API specifications, and retrieve Tech Insights scores without leaving the coding session. This structured metadata addresses a fundamental problem: without it, agents work blind, able to read the code in front of them but unable to see the broader system context. The service catalog transforms individual repositories into a connected map of the engineering organization, providing essential context for making informed changes.

## AGENTS.md: Repository-Specific Context Files

Cloudflare developed the AGENTS.md system to address a persistent failure mode where coding agents produced plausible but incorrect changes due to lack of local repository context. The AGENTS.md file is a short, structured markdown document placed in each repository that explicitly tells coding agents how the codebase works, including runtime environment, test and lint commands, codebase navigation patterns, coding conventions with references to Engineering Codex rules, boundaries that shouldn't be crossed, and dependency information.

The system generates these files at scale using a pipeline that pulls entity metadata from Backstage, analyzes repository structure to detect language, build system, test framework, and directory layout, maps the detected stack to relevant Engineering Codex standards, uses a capable model to generate the structured document, and opens a merge request for the owning team to review and refine. Cloudflare has processed approximately 3,900 repositories this way, acknowledging that the first pass wasn't always perfect, especially for polyglot repos or unusual build setups, but even the baseline was significantly better than asking agents to infer everything from scratch.

Keeping these files current is handled by the AI Code Reviewer, which flags when repository changes suggest AGENTS.md should be updated, preventing the staleness problem that could make outdated files worse than no file at all. Since these files sit directly in the model's context window, they're intentionally kept short and high-signal, typically including only the most critical information for agent decision-making.

## AI Code Reviewer: Automated Review at Scale

Every merge request at Cloudflare receives an automated AI code review through a system integrated as a GitLab CI component. The implementation uses OpenCode with a multi-agent review coordinator that classifies merge requests by risk tier (trivial, lite, or full) and delegates to specialized review agents covering code quality, security, codex compliance, documentation, performance, and release impact. Each agent connects to AI Gateway for model access, pulls Engineering Codex rules from a central repository, and reads the repository's AGENTS.md for codebase context.

The system has achieved 100% coverage across all repositories on their standard CI pipeline, processing 5.47 million AI Gateway requests and 24.77 billion tokens over the last 30 days. The review output is carefully structured with findings broken into categories (Security, Code Quality, Performance) with severity levels (Critical, Important, Suggestion, Optional Nits) that make it immediately clear what requires attention versus what is informational. The reviewer maintains context across iterations, acknowledging previously flagged issues that have been fixed rather than re-raising them, and cites specific Engineering Codex rule IDs when findings map to organizational standards.

A separate Workers-based config service handles centralized model selection per reviewer agent, enabling model shifts without changing the CI template. The review process runs in CI runners and is stateless per execution. Model routing reflects task requirements: Workers AI handles approximately 15% of reviewer traffic for documentation review using Kimi K2.5, while frontier models like Opus 4.6 and GPT 5.4 handle security-sensitive and architecturally complex reviews.

## Engineering Codex: Standards as Agent Skills

The Engineering Codex represents Cloudflare's approach to encoding engineering standards in a way that both humans and AI agents can consume effectively. The system uses a multi-stage AI distillation process to output codex rules ("If you need X, use Y. You must do X, if you are doing Y or Z.") along with an agent skill that uses progressive disclosure and nested hierarchical information directories and links across markdown files.

The Codex skill is available for engineers to use locally during development with prompts like "how should I handle errors in my Rust service?" or "review this TypeScript code for compliance." Cloudflare's Network Firewall team used a multi-agent consensus process to audit `rampartd`, with every requirement scored as COMPLIANT, PARTIAL, or NON-COMPLIANT with specific violation details and remediation steps, reducing what previously required weeks of manual work to a structured, repeatable process.

At review time, the AI Code Reviewer cites specific Codex rules in its feedback, turning AI suggestions into references to organizational standards. This integration between the knowledge layer (Codex), repository context (AGENTS.md), and enforcement layer (Code Reviewer) creates a cohesive system where the first draft from an agent is usually close enough to ship, which wasn't true six months earlier.

## Configuration as Code and Deployment

The entire agent configuration is managed as code with agents and commands authored as markdown files with YAML frontmatter. A build script compiles these into a single JSON config validated against the OpenCode JSON schema. Every new session picks up the latest version automatically, meaning updates to agentic tools that affect 3,000+ people are just a `wrangler deploy` away.

This config-as-code approach provides version control, code review for changes to agent behavior, automated validation, and atomic updates across the organization. The system demonstrates how infrastructure-as-code practices extend naturally to AI agent configuration in production environments.

## Token Economics and Cost Optimization

The case study provides insight into production-scale token consumption: 241.37 billion tokens monthly through AI Gateway with 51.83 billion processed on Workers AI. The Code Mode implementation at the portal layer directly addresses token economics by collapsing 34 individual tool schemas consuming 15,000 tokens into two portal-level tools, saving 7.5% of the context window budget on every request. Multiplied across millions of requests, this represents substantial cost savings.

The strategic use of Workers AI for appropriate workloads (documentation review, AGENTS.md generation, lightweight inference) while routing complex tasks to frontier models demonstrates thoughtful cost-performance optimization. The reported 77% cost savings on the security agent workload (7 billion tokens daily) illustrates the economic impact of this routing strategy at scale.

## Future Direction: Background Agents

The next evolution involves background agents that can be spun up on demand with the same tools available locally (MCP portal, git, test runners) but running entirely in the cloud. The architecture uses Durable Objects and the Agents SDK for orchestration, delegating to Sandbox containers when jobs require full development environments for cloning repos, installing dependencies, or running tests.

Long-running agents, natively supported in the Agents SDK as of their Agents Week launch, solve the durable session problem that previously required workarounds. The SDK now supports sessions that run for extended periods without eviction, sufficient for an agent to clone a large repository, run a full test suite, iterate on failures, and open a merge request in a single session. This represents the natural evolution from interactive coding assistants to autonomous agents that can handle complete development workflows.

## Critical Assessment

While the case study demonstrates impressive adoption numbers and architectural sophistication, several aspects warrant balanced consideration. The reported near-doubling of merge request volume is presented as clear evidence of improved developer velocity, but the case study doesn't address code quality outcomes, bug rates, or whether the increased volume represents net-new functionality or reflects agents expanding code that humans might have written more concisely. The metric alone doesn't distinguish between productivity gains and potential code bloat.

The claim of 93% R&D adoption is striking but the case study doesn't detail what "active use" means—whether this represents daily usage, occasional queries, or any use in the last 30 days. The distinction matters significantly when evaluating actual productivity impact versus experimental adoption.

The AI Code Reviewer's 100% coverage is impressive operationally, but the case study doesn't provide data on false positive rates, how often reviewer suggestions are actually accepted, or whether teams have developed review fatigue. The absence of quantitative validation metrics (precision, recall, developer satisfaction scores) makes it difficult to assess actual effectiveness beyond deployment success.

The heavy reliance on Cloudflare's own infrastructure, while technically interesting and beneficial for their use case, means the reference architecture requires significant Cloudflare product adoption to replicate. Organizations on different infrastructure would need to adapt substantially, particularly around Workers, Durable Objects, and the specific integration patterns.

That said, the architectural patterns are sound and address real LLMOps challenges: the proxy Worker pattern for centralized control, Code Mode for token optimization, AGENTS.md for repository context, and the integration of service catalog data into agent context all represent transferable insights regardless of underlying platform. The emphasis on authentication, privacy-preserving analytics, and zero data retention demonstrates mature thinking about enterprise requirements.

The system represents one of the more comprehensive public examples of enterprise LLMOps implementation, integrating authentication, routing, observability, knowledge management, and enforcement into a cohesive platform. The focus on developer experience (one-command authentication, automatic configuration, integrated tools) alongside operational concerns (cost tracking, model routing, security) reflects genuine production maturity rather than research experimentation.
