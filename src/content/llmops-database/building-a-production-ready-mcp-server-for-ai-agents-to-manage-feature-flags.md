---
title: "Building a Production-Ready MCP Server for AI Agents to Manage Feature Flags"
slug: "building-a-production-ready-mcp-server-for-ai-agents-to-manage-feature-flags"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "690899786c1a51664a8f158d"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:25:22.211Z"
  createdOn: "2025-11-03T12:00:56.756Z"
llmopsTags:
  - "code-generation"
  - "poc"
  - "mcp"
  - "prompt-engineering"
  - "error-handling"
  - "agent-based"
  - "human-in-the-loop"
  - "serverless"
  - "api-gateway"
  - "devops"
  - "cicd"
  - "continuous-deployment"
  - "documentation"
  - "security"
  - "fastapi"
  - "cloudflare"
  - "anthropic"
industryTags: "tech"
company: "DevCycle"
summary: "DevCycle developed an MCP (Model Context Protocol) server to enable AI coding agents to manage feature flags directly within development workflows. The project began as a hackathon proof-of-concept that adapted their existing CLI interface to work with AI agents, allowing natural language interactions for creating flags, investigating incidents, and cleaning up stale features. Through iterative refinement, the team identified key production requirements including clear input schemas, descriptive error handling, tool call pruning, OAuth authentication via Cloudflare Workers, and remote server architecture. The result was a production-ready integration that enables developers to create and manage feature flags without leaving their code editor, with early results showing approximately 3x more users reaching SDK installation compared to their previous onboarding flow."
link: "https://blog.devcycle.com/devcycle-mcp-from-hackathon-to-production/"
year: 2025
seo:
  title: "DevCycle: Building a Production-Ready MCP Server for AI Agents to Manage Feature Flags - ZenML LLMOps Database"
  description: "DevCycle developed an MCP (Model Context Protocol) server to enable AI coding agents to manage feature flags directly within development workflows. The project began as a hackathon proof-of-concept that adapted their existing CLI interface to work with AI agents, allowing natural language interactions for creating flags, investigating incidents, and cleaning up stale features. Through iterative refinement, the team identified key production requirements including clear input schemas, descriptive error handling, tool call pruning, OAuth authentication via Cloudflare Workers, and remote server architecture. The result was a production-ready integration that enables developers to create and manage feature flags without leaving their code editor, with early results showing approximately 3x more users reaching SDK installation compared to their previous onboarding flow."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-ready-mcp-server-for-ai-agents-to-manage-feature-flags"
  ogTitle: "DevCycle: Building a Production-Ready MCP Server for AI Agents to Manage Feature Flags - ZenML LLMOps Database"
  ogDescription: "DevCycle developed an MCP (Model Context Protocol) server to enable AI coding agents to manage feature flags directly within development workflows. The project began as a hackathon proof-of-concept that adapted their existing CLI interface to work with AI agents, allowing natural language interactions for creating flags, investigating incidents, and cleaning up stale features. Through iterative refinement, the team identified key production requirements including clear input schemas, descriptive error handling, tool call pruning, OAuth authentication via Cloudflare Workers, and remote server architecture. The result was a production-ready integration that enables developers to create and manage feature flags without leaving their code editor, with early results showing approximately 3x more users reaching SDK installation compared to their previous onboarding flow."
---

## Overview

DevCycle, a feature flag management platform, documented their journey from hackathon prototype to production-ready MCP (Model Context Protocol) server that enables AI coding agents to interact with their platform. This case study provides valuable insights into the practical challenges of building LLM-integrated tools that move beyond demonstrations to reliable production use. The MCP server allows AI agents like Claude or other AI coding assistants to create, modify, and manage feature flags through natural language interactions, fundamentally changing how developers interact with feature flag management by keeping them within their code editor rather than switching to a dashboard.

The initial hackathon version demonstrated compelling use cases—agents could create feature flags, investigate incidents, clean up stale flags, and assist with QA using natural language commands. However, the team acknowledged that while the demo was "cool," it was "rough around the edges and failed regularly," requiring substantial iteration to achieve production readiness. This honest assessment of the gap between proof-of-concept and production systems is a recurring theme in LLMOps implementations.

## Technical Architecture and Design Decisions

### Input Schema Design as Primary Agent Context

One of the most critical findings from DevCycle's work was that input schemas serve as the primary context for AI agents when deciding which tool to call and what data to provide. The team discovered that while AI agents can infer reasonably well from schema structure alone, strategic use of `.describe()` statements on schema parameters significantly improves agent behavior. For example, they found that adding explicit descriptions like `search.describe('Search term to filter features by "name" or "key"')` helped steer agents to use appropriate values rather than making incorrect assumptions.

This finding highlights a key principle in LLMOps: the interface between your system and the LLM must be designed with the LLM's reasoning patterns in mind, not just traditional API design principles. Without properly structured input schemas, the team observed that agents would regularly select the wrong tool, causing cascading errors and sending agents down unintended execution paths. This represents a shift from traditional API design where human developers can read documentation and understand context—here, the schema itself must encode that contextual information in a machine-readable format.

### Error Handling as a Critical Success Factor

DevCycle identified descriptive error handling as perhaps the single most important factor in agent success rates. Poor error messages would cause agents to hallucinate fixes and enter circular reasoning loops, essentially "chasing its own tail" as the team described it. Conversely, detailed and helpful error responses enabled agents to self-correct effectively, often fixing issues in a single iteration.

The team provided a concrete example of their Feature creation API, which they initially assumed would be too complex for agents to handle reliably due to its large parameter surface. However, they were surprised to find that with detailed input schemas combined with descriptive error responses, agents achieved "extremely high success rates" generating features with complex targeting rules through natural language. The key was providing structured error responses that included the error type, a clear message explaining what went wrong, the tool name, suggestions, and a timestamp. This structured approach gave agents the information needed to understand and correct their mistakes.

This finding suggests that in LLMOps, error handling isn't just about logging and monitoring—it becomes part of the agent's feedback loop and directly impacts the reliability of the system. The error messages effectively serve as additional training signals that guide the agent toward correct behavior within the specific constraints of your API.

### Tool Call Surface Area and Context Management

DevCycle learned that pruning the number of available tools is essential for several reasons. First, every MCP tool consumes context window space with its description and schema definition. Second, many AI agent platforms restrict or warn about excessive tool counts, meaning a smaller, focused tool surface increases the likelihood of actual adoption. The team had to make conscious decisions about which API functions truly made sense as MCP tools—for instance, questioning whether users would actually want to delete entire projects through an agent interface.

Counterintuitively, they found that larger, more comprehensive tool calls that combine multiple API functions into a single MCP tool were preferable to fine-grained tool decomposition—the opposite of typical REST API design principles. This consolidation reduced both the number of exposed tools and the amount of context consumed by tool descriptions. This represents an interesting tension in LLMOps between traditional microservice and API design patterns (favoring small, focused endpoints) and LLM-optimized design (favoring consolidated operations that reduce context consumption and decision complexity for the agent).

### Authentication and Session Management

The team chose OAuth as their authentication mechanism and implemented it using Cloudflare Workers with Durable Objects for session state management. They found this combination made OAuth implementation "mostly painless" compared to alternatives. The Durable Objects pattern proved particularly valuable because it allowed them to store session state beyond just authentication tokens—for example, tracking which DevCycle project a user is currently working with across multiple tool calls.

This session state management addresses a practical challenge in LLM agent workflows: agents don't inherently maintain stateful context across tool calls unless explicitly designed to do so. By storing project selection and other session data in Durable Objects, DevCycle reduced the cognitive load on agents—subsequent tool calls like "list features" automatically apply to the previously selected project without requiring the agent to track and re-specify this information on every call. This architectural decision effectively creates a stateful session layer that compensates for the stateless nature of individual LLM interactions.

### Remote vs. Local MCP Servers

DevCycle advocated strongly for remote MCP servers over local installations, citing both ease of use and security. Remote servers require only a URL configuration, while local servers often require commands like `npx -y some-mcp-script` that introduce security concerns by potentially granting access to the entire file system. Remote servers using HTTP/SSE protocols can be properly scoped with OAuth permissions and time-limited tokens, providing better security boundaries.

This design choice reflects a mature understanding of production LLMOps: convenience for developers must be balanced against security concerns, and the architecture should follow principle of least privilege. While local execution might offer performance benefits or work in air-gapped environments, for a SaaS platform like DevCycle, the remote model provides better security boundaries and easier distribution.

### Context Size and Output Schema Trade-offs

The team discovered that large output schemas, while providing additional context to AI agents, typically aren't worth the token cost. Most of the output's contextual information can be conveyed through simple statements in the tool call description. When they did use output schemas, they kept them as high-level descriptions of the first layer of output parameters with brief descriptions of deeper parameters.

This finding speaks to a common challenge in LLMOps: balancing the desire to provide comprehensive information to the LLM against the real costs of context consumption—both in terms of latency and API costs. The team's approach suggests that strategic, minimal schema documentation is more effective than exhaustive specification, allowing more of the limited context window to be used for actual task completion rather than schema description.

## Production Use Cases and Workflow Integration

DevCycle identified several high-value workflows that emerged from production use of their MCP server:

**Feature Creation Workflow**: Developers can prompt "Create a new feature in DevCycle for the flag 'new-flag'" and remain in their code editor while the agent handles the setup in the DevCycle platform. This eliminates context switching between the editor and dashboard.

**Self-Targeting for Local QA**: Commands like "Self-target me into this devcycle feature flag" enable developers to quickly configure themselves as test users without leaving their development environment, maintaining flow state.

**Environment Promotion**: Prompts such as "Enable this devcycle feature in staging for all users" allow quick promotion of features from development to higher environments through natural language.

**Production Testing with Targeting**: Commands like "Enable this feature in production for all internal users with '@devcycle.com' emails" implement common testing patterns through conversational interfaces.

**Incident Investigation**: Developers can ask "Is this error we are seeing in prod controlled by a devcycle variable? If so, turn off the feature" to quickly investigate and remediate feature flag-related incidents.

**Automated Cleanup**: Commands like "Cleanup all the features marked as stale by devcycle" or "Review all devcycle features and list any that don't have any devcycle variables in this codebase to be archived" enable hygiene tasks that typically get deprioritized.

The team noted that their initial skepticism about MCP value was overcome when they realized the power of tools that directly integrate with development workflows rather than just providing information. They distinguished between informational MCPs (documentation, project management interfaces) and workflow-integrated MCPs that participate in the actual code development process. The latter category proved far more valuable in daily use because it extends existing coding tasks rather than requiring explicit, separate invocations.

## Results and Business Impact

DevCycle reported that when they rebuilt their onboarding around the MCP integration, they observed approximately 3x more users reaching SDK installation compared to their previous flow. This represents a significant improvement in a critical activation metric for an SDK-based SaaS platform. By allowing developers to start inside their editor with AI assistance rather than following traditional documentation or sandbox approaches, they reduced friction in the onboarding process and accelerated time-to-value.

The team noted that this addresses two persistent challenges for SDK-based services: getting customers to install and update SDKs, and streamlining the onboarding process. The MCP approach transforms onboarding from a separate documentation-reading exercise into an AI-assisted, in-context installation and configuration process.

## Critical Assessment and Considerations

While DevCycle's case study provides valuable insights, several considerations deserve attention when evaluating this approach:

**Success Rate Claims**: The team reports "extremely high success rates" for complex feature generation but doesn't provide specific metrics or failure rate data. Without quantitative success rates, it's difficult to assess the actual reliability improvements achieved through their iterations.

**Agent Variability**: The case study doesn't explicitly address how performance varies across different AI models or agent implementations. MCP is designed to work across multiple AI platforms, but the reliability of schema interpretation and error recovery likely varies significantly between models.

**Cost Considerations**: The text doesn't discuss the economic implications of their architecture—token costs for context consumption, Cloudflare Workers pricing, or the cost-benefit analysis of agent-mediated interactions versus direct API calls or dashboard use.

**Scope Limitations**: The discussion of pruning tool calls to avoid dangerous operations (like project deletion) raises questions about the boundaries of agent autonomy. How does DevCycle balance making the agent useful while preventing potentially destructive actions? What guardrails are in place beyond simply not exposing certain tools?

**Learning Curve**: While the MCP reduces context switching, it requires developers to learn how to effectively prompt for feature flag operations. The case study doesn't discuss the learning curve or whether some developers might still prefer direct dashboard manipulation for certain tasks.

**Error Recovery Complexity**: The team notes that agents "may need to iterate through an error or two" for API rules not covered by JSON schema. In complex production scenarios with multiple interacting feature flags, how does error accumulation affect success rates?

## Broader Implications for LLMOps

This case study illustrates several important patterns for production LLM systems:

**Interface Design for LLMs**: Traditional API design principles don't directly translate to LLM-consumed interfaces. Schema-as-context and error-as-feedback represent fundamentally different design paradigms that must account for how LLMs reason about tool selection and parameter specification.

**Stateful Session Management**: Pure stateless interactions create excessive burden on both the LLM (to track context) and the context window (to specify state repeatedly). Introducing session state through durable storage compensates for the stateless nature of individual LLM calls.

**Production Readiness Gap**: The honest assessment of the gap between hackathon demo and production system reinforces that demonstrating LLM capabilities and achieving reliable production operation are vastly different challenges. The iteration required to move from "working" to "shippable" involved systematic identification and resolution of failure modes.

**Context Economics**: The trade-offs around tool surface area and output schema detail reflect the economic constraints of context windows—not just technical limits but cost and latency implications that affect user experience and business viability.

**Workflow Integration vs. Information Access**: The distinction between MCPs that provide information versus those that integrate into workflows suggests that the highest-value LLM applications may be those that augment existing processes rather than creating entirely new interaction patterns.

DevCycle's experience provides a valuable reference point for teams building production LLM integrations, particularly in developer tools contexts where maintaining flow state and reducing context switching represent significant value propositions.