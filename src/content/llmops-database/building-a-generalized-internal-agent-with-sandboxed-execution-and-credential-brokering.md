---
title: "Building a Generalized Internal Agent with Sandboxed Execution and Credential Brokering"
slug: "building-a-generalized-internal-agent-with-sandboxed-execution-and-credential-brokering"
draft: false
llmopsTags:
  - "customer-support"
  - "code-generation"
  - "document-processing"
  - "data-analysis"
  - "chatbot"
  - "code-interpretation"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "system-prompts"
  - "error-handling"
  - "latency-optimization"
  - "docker"
  - "kubernetes"
  - "serverless"
  - "orchestration"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "security"
  - "guardrails"
  - "postgresql"
  - "redis"
  - "fastapi"
  - "langchain"
  - "anthropic"
  - "openai"
  - "hugging-face"
  - "circleci"
  - "harness-engineering"
industryTags: "tech"
company: "Browserbase"
summary: "Browserbase built an internal generalized agent called \"bb\" to automate knowledge work across engineering, operations, sales, support, and executive functions. The problem was that many internal tasks—from investigating production sessions to logging feature requests—required manual effort and coordination across multiple systems, many of which lacked clean APIs. The solution involved creating a single agent loop that runs in isolated cloud sandboxes with credential brokering, a skills-based system for domain-specific workflows, and integration via Slack for natural interaction. The results included 100% feature request pipeline coverage with zero human effort, 99% of support tickets receiving first response in under 24 hours, session investigation time dropping from 30-60 minutes to a single Slack message, and engineers shifting from writing PRs to reviewing agent-generated ones."
link: "https://www.browserbase.com/blog/internal-agents"
year: 2026
seo:
  title: "Browserbase: Building a Generalized Internal Agent with Sandboxed Execution and Credential Brokering - ZenML LLMOps Database"
  description: "Browserbase built an internal generalized agent called \"bb\" to automate knowledge work across engineering, operations, sales, support, and executive functions. The problem was that many internal tasks—from investigating production sessions to logging feature requests—required manual effort and coordination across multiple systems, many of which lacked clean APIs. The solution involved creating a single agent loop that runs in isolated cloud sandboxes with credential brokering, a skills-based system for domain-specific workflows, and integration via Slack for natural interaction. The results included 100% feature request pipeline coverage with zero human effort, 99% of support tickets receiving first response in under 24 hours, session investigation time dropping from 30-60 minutes to a single Slack message, and engineers shifting from writing PRs to reviewing agent-generated ones."
  canonical: "https://www.zenml.io/llmops-database/building-a-generalized-internal-agent-with-sandboxed-execution-and-credential-brokering"
  ogTitle: "Browserbase: Building a Generalized Internal Agent with Sandboxed Execution and Credential Brokering - ZenML LLMOps Database"
  ogDescription: "Browserbase built an internal generalized agent called \"bb\" to automate knowledge work across engineering, operations, sales, support, and executive functions. The problem was that many internal tasks—from investigating production sessions to logging feature requests—required manual effort and coordination across multiple systems, many of which lacked clean APIs. The solution involved creating a single agent loop that runs in isolated cloud sandboxes with credential brokering, a skills-based system for domain-specific workflows, and integration via Slack for natural interaction. The results included 100% feature request pipeline coverage with zero human effort, 99% of support tickets receiving first response in under 24 hours, session investigation time dropping from 30-60 minutes to a single Slack message, and engineers shifting from writing PRs to reviewing agent-generated ones."
notion:
  pageId: "34ef8dff-2538-81b9-b287-dcfede52775d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:07:05Z"
---

## Overview and Context

Browserbase developed an internal generalized agent system called "bb" that operates across their entire organization to automate knowledge work tasks. Rather than building specialized bots for individual use cases, they architected a single agent loop that "lazy loads" both skills (domain-specific playbooks) and permissions (access scopes) depending on the task at hand. The system is grounded in the thesis that generalized agents will become the primary interface for knowledge work, with the browser serving as a universal "API" for systems that don't expose programmatic interfaces.

The agent lives primarily in Slack and handles diverse workflows including writing pull requests, investigating production sessions, querying their data warehouse (Snowflake), logging feature requests to their CRM (HubSpot), and running browser automations. It serves users across engineering, operations, sales, support, and executive teams. The architecture demonstrates a sophisticated approach to LLMOps that prioritizes security, modularity, and progressive context disclosure.

## Sandbox Architecture: Isolated Execution Environments

At the foundation of bb's deployment is an isolated cloud sandbox—an ephemeral Linux VM with its own filesystem, network stack, and process tree. Each agent session runs in one of these sandboxes, which boot in seconds and are destroyed after 30 minutes of inactivity. No state persists between sessions unless explicitly snapshotted, providing strong isolation guarantees.

The sandboxes start from pre-warmed snapshots that are rebuilt every 30 minutes via cron jobs. These snapshots contain key Browserbase repositories cloned into a `/knowledge/` directory, allowing the agent to grep and reason about codebases without network fetches. The snapshots also include the agents monorepo with dependencies installed, OpenCode (their agent runtime) pre-installed and running on a local port, and essential system tools including bun, git, GitHub CLI, ripgrep, prettier, pdftotext, a TypeScript LSP, and Tailscale for secure network access.

The 30-minute refresh cycle means sandboxes are at most half an hour behind the latest code on main. When a new sandbox boots, it only pulls the delta (typically a handful of commits), making startup nearly instantaneous. This approach to keeping execution environments current without sacrificing cold start performance is a notable LLMOps pattern.

The agent has access to six core tools within the sandbox: `read` (read files from filesystem), `write` (create new files), `edit` (patch existing files), `exec` (execute JavaScript with access to all service integrations via proxy), `safebash` (run allowlisted shell commands like grep, git, find, jq), and `skill` (load domain-specific instruction sets into context). The `exec` tool serves as the gateway to all external services including Snowflake, HubSpot, Pylon, and Grafana, with all requests routed through a serverless proxy.

Browserbase notes they're migrating toward an architecture that separates the harness from the compute (filesystem/sandbox), similar to Anthropic's Managed Agents and OpenAI's agent SDK. They emphasize building composable, isolated, and modular units to enable rapid reconfiguration as agent architectures evolve—a pragmatic acknowledgment of the rapidly changing landscape.

## Credential Brokering and Security Model

A critical LLMOps challenge addressed by this architecture is credential security in environments that execute arbitrary LLM-generated code. Browserbase's solution splits access into two layers: credential brokering and a secure integration proxy.

The sandbox boots with only references and short-lived tokens, never touching actual secrets. It receives three environment variables: `BB_PROXY_URL` (the URL of the serverless integration proxy), `BB_SESSION_TOKEN` (a rotating session token with TTL stored in a KV store), and `AUTOMATION_BYPASS_TOKEN` (required for certain third-party automation flows). Most third-party access goes through the integration proxy, which holds the real credentials and enforces policy about which services and methods are allowed under what scope before executing any request.

The proxy flow is straightforward: the agent's `exec` tool constructs a request to `POST /api/proxy` with `{ token, service, method, args }`. The proxy validates the token against the KV store and retrieves the session's permission scope, checks if the requested `service.method` is allowed, calls the real service package (which has actual credentials available only inside the serverless function's environment) if allowed, and returns either the result or a 403 if denied.

For a small set of integrations (model providers and code hosting), credential brokering happens at the network level. The sandbox firewall intercepts outbound HTTP requests to specific hosts and injects real API keys on egress. The sandbox environment variable is set to a placeholder string like `"credential-brokered"` so the SDK initializes without erroring, but the actual key gets injected transparently before the request leaves the sandbox.

Browserbase acknowledges that credential brokering isn't the final frontier for secure agent access—even with brokered credentials, an agent can generate arbitrary HTTP requests. They add request interception and domain allowlisting for sensitive internal APIs, enforcing which domains the browser tool can reach regardless of what code the agent writes. This defense-in-depth approach makes misbehavior structurally impossible rather than relying on the model to behave properly.

## Permission Management: RBAC and ABAC

The system implements both traditional Role-Based Access Control (RBAC) and what Browserbase calls Agent-Based Access Control (ABAC). Each proxy session carries a PermissionConfig with two dimensions: which service.method calls are allowed (using glob patterns like `["crm.*", "support.getIssue"]`) and which OpenCode tools the agent can use (read, write, edit, exec, safebash, skill).

Interactive Slack sessions get full access, with the agent self-selecting which skills and services it needs. Background webhook sessions receive hard-scoped permissions at invocation time. For example, their Pylon ticket-closed webhook handler dispatches with permissions limited to `{ tools: { exec: true, skill: true }, services: ["crm.*", "support.*"] }`.

This layered approach combines service-level RBAC (e.g., the Snowflake role is read-only) with agent-specific restrictions on top. Even if the agent has access to Snowflake, it can only run SELECT queries. Even if it has access to HubSpot, a scoped session might only allow `hubspot.search*` and not `hubspot.delete*`. They note that permissions tend to correlate with invocation source—webhooks carry intent, so a CRM-triggered run might need sales tools but not code access.

## Skills System: Progressive Context Disclosure

Rather than loading all domain knowledge into every agent invocation, Browserbase implements a skills-based architecture that progressively discloses context. Skills are markdown files stored in `.opencode/skills/` that inject domain-specific workflows, schemas, and decision trees into the agent's context on demand. This keeps the general agent simple and only pulls in the minimum context needed for each task.

Their skills library includes specialized knowledge for various domains: `data-warehouse` (warehouse query patterns with table definitions, column types, common joins), `customer-intelligence` (cross-system query patterns combining data warehouse, CRM, support system, and billing), `crm` (deal fields, pipeline stages, contact properties, dedup logic), `investigate-session` (multi-source log correlation across Tinybird, Loki, and NATS message flow), `create-pr` (Linear ticket to git branch to code changes to PR workflow), `write-browserbase-web-automations` (Stagehand scripting patterns for browser tasks), `log-feature-request` (feature request detection, CRM dedup, categorization), and `notion` (read-only access to Notion pages and databases).

A typical skill file contains structured playbooks that encode the exact debugging or workflow process a senior engineer would follow. For example, the `investigate-session` skill instructs the agent to first gather session metadata by querying Tinybird, then pull service logs from Loki for browser service, connect service, and API gateway in the session's time window, and finally correlate and diagnose by mapping the session lifecycle and identifying where it broke. The skill encodes institutional knowledge about what to check and in what order.

The system prompt in `bb.md` contains a routing table that maps request patterns to skills. Based on the user's request, the agent loads appropriate skills: session investigation triggers `investigate-session`, pull requests trigger `create-pr`, customer data questions trigger `snowflake` + `customer-intelligence`, and so on. The routing table explicitly instructs the agent to "load only what you need. Do not load all skills for every request."

For interactive Slack sessions, the agent reads this routing table and self-selects skills. For background webhook sessions, the permissions system hard-restricts which tools and services are available, so even if the routing table suggests loading a skill, the agent can only act within its scoped permissions. This creates a natural coupling between task type and available context.

## Service Packages: Typed Integration Layer

The second layer of domain capability comes from service packages—typed TypeScript wrappers around external APIs that get called through the proxy. Each package exposes methods that the `exec` tool can invoke. This keeps the tool surface small, defines TypeScript interfaces once in the `exec` tool, and enables the agent to do dynamic pre-transforming in deterministic code before results hit context.

In practice, this means the agent can make parallel calls using `Promise.all`, parse and normalize outputs in TypeScript, and for large payloads write results straight to disk via `exec.writeToFile` instead of bloating the prompt. The agent runtime can call methods like `exec.queryWarehouse()` for Snowflake queries or `exec.searchCrm()` for HubSpot searches with typed parameters.

Adding a new integration is straightforward: write a service package, add it to the proxy dispatch map, expose an exec method, and write a skill with domain-specific instructions. Browserbase reports that most integrations take less than an afternoon to implement. This modularity is a key LLMOps pattern that enables rapid expansion of agent capabilities without refactoring core architecture.

## Deployment Modes and Lifecycle Management

The same agent runs in four distinct modes, with surprisingly smooth transitions between them. In deployed (Slack interactive) mode, someone types `@bb` in a Slack channel, the Slack events handler dispatches to an internal endpoint, and the system creates or reuses a sandbox keyed by the Slack thread ID in a KV store. The agent streams Server-Sent Events (SSE) back, which get translated into real-time Slack message updates. The sandbox persists for multi-turn continuity, so follow-up messages in the same thread hit the same sandbox with full conversation history.

In background (webhook) mode, external events like a Pylon support ticket closing or a Circleback meeting transcript landing trigger webhook handlers that dispatch to the same sandbox infrastructure. The agent does its work (detect feature requests, log to HubSpot, post a summary to a dedicated Slack channel) and the sandbox shuts down.

The system also provides a rich UI interface that displays reasoning traces, tool calls, and the sandbox state and filesystem in a chat interface. This allows anyone to use bb at any time, meeting users where they are and where they work.

Thread-based state management provides an elegant solution to multi-turn conversations. Each Slack thread is a persistent workspace with its own sandbox, conversation history, and file state. If a sandbox crashes, the conversation isn't lost—messages live in the KV store and the thread can be resumed, though some environment state may be lost. If bb is mid-response and receives a new message, the current run auto-aborts and restarts with the new context, preventing stale work.

## Slack Integration and Interaction Patterns

Slack serves as the primary interface because that's where work conversations already happen. The interaction model is built around describing intent while the agent executes and allows for course correction. Users see text appear in real-time, tool calls flash by (file reads, SQL queries, API calls), and final answers land as Slack messages with charts uploaded as image attachments and CSV exports sent as file uploads.

Follow-ups are natural because the sandbox persists within a thread, maintaining all context from previous turns including files read, queries run, and results obtained. Users don't need to re-explain context. The interaction is closer to managing a competent teammate than running a tool—users describe what they need at a high level ("check if Acme's sessions are failing more than usual this week") and the agent figures out the implementation.

Browserbase notes that the system is used across the entire company, not just by engineers. The people using bb most heavily aren't always technical, and users are becoming "channel managers" who manage agents running in Slack channels rather than doing the work themselves. This represents a subtle but significant shift in how the team operates.

## Production Results and Impact

The system has delivered measurable operational improvements across multiple domains. The feature request pipeline runs at 100% coverage with zero human effort—every closed support ticket and meeting transcript gets scanned automatically. This automation helped reduce 99% of their first response time to under 24 hours for support tickets. Session investigation, which previously required 30-60 minutes of manual log-diving, now takes a single Slack message. Many engineers have shifted from writing the majority of PRs by hand to reviewing agent-generated ones.

## Critical Assessment and LLMOps Insights

This case study demonstrates several sophisticated LLMOps patterns worth examining critically. The sandbox-based isolation with credential brokering addresses a genuine security challenge in agent deployments—how to give agents access to sensitive systems without exposing credentials to arbitrary code execution. The two-layer approach (integration proxy plus network-level brokering) shows thoughtful defense in depth, though Browserbase honestly acknowledges this isn't a complete solution since agents can still generate arbitrary HTTP requests.

The skills-based architecture with progressive context disclosure is a practical response to context window limitations and cost management. Rather than loading all institutional knowledge into every invocation, the system loads only what's needed based on task routing. This pattern will likely become more important as organizations deploy agents across increasingly diverse domains. The coupling of skills (what to do) with service packages (how to do it) creates a clean separation of concerns.

The permission system combining RBAC and ABAC demonstrates thinking about agent safety at the architecture level rather than relying on prompt engineering alone. The correlation of permissions with invocation source (interactive Slack vs. background webhook) is pragmatic—different contexts carry different risk profiles and should have different capabilities.

The use of Slack as the primary interface is clever from an adoption standpoint—it meets users where they already work and provides natural multi-turn state management through threads. However, this creates dependency on Slack's threading model and may limit portability to other interfaces.

The claim of shifting engineers from writing to reviewing PRs is significant if true, representing a genuine productivity multiplier. However, the post doesn't discuss code quality, testing coverage, or how review burden scales. The 100% feature request coverage claim is impressive but raises questions about precision—are there false positives being logged?

The architecture's acknowledgment that they're migrating toward separated harness and compute models shows healthy adaptation to evolving best practices. The emphasis on building composable units to enable rapid reconfiguration is realistic given how quickly the agent landscape changes.

Overall, this case study presents a credible and technically detailed account of deploying a generalized agent across an organization. The security model, skills architecture, and multi-mode deployment patterns offer useful blueprints for other organizations considering similar systems. The honest acknowledgment of limitations (credential brokering isn't perfect, the landscape changes rapidly) adds credibility. The main caveat is that this is a first-party account from Browserbase about their own product usage, so some claims about results should be viewed with appropriate skepticism until independently validated.
