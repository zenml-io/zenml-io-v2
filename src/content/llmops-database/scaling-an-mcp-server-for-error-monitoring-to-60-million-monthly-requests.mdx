---
title: "Scaling an MCP Server for Error Monitoring to 60 Million Monthly Requests"
slug: "scaling-an-mcp-server-for-error-monitoring-to-60-million-monthly-requests"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69088bf85c84ee1cf2954e1b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:23:12.906Z"
  createdOn: "2025-11-03T11:03:20.387Z"
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "poc"
  - "prompt-engineering"
  - "agent-based"
  - "error-handling"
  - "latency-optimization"
  - "system-prompts"
  - "mcp"
  - "monitoring"
  - "documentation"
  - "orchestration"
  - "fastapi"
  - "anthropic"
  - "google-gcp"
industryTags: "tech"
company: "Sentry"
summary: "Sentry, an error monitoring platform, built a Model Context Protocol (MCP) server to improve the workflow where developers would copy error details from Sentry's UI and paste them into AI coding assistants like Cursor. The MCP server provides direct integration with 10-15 tools, including retrieving issue details and triggering automated fix attempts through Sentry's AI agent. The implementation scaled from 30 million to 60 million requests per month, with over 5,000 organizations using it. The company learned critical lessons about treating MCP servers as production services, implementing comprehensive observability, managing context pollution, and taking responsibility for agent behavior through careful prompt engineering and tool description design."
link: "https://www.youtube.com/watch?v=nlwRj7Mrkc8"
year: 2025
seo:
  title: "Sentry: Scaling an MCP Server for Error Monitoring to 60 Million Monthly Requests - ZenML LLMOps Database"
  description: "Sentry, an error monitoring platform, built a Model Context Protocol (MCP) server to improve the workflow where developers would copy error details from Sentry's UI and paste them into AI coding assistants like Cursor. The MCP server provides direct integration with 10-15 tools, including retrieving issue details and triggering automated fix attempts through Sentry's AI agent. The implementation scaled from 30 million to 60 million requests per month, with over 5,000 organizations using it. The company learned critical lessons about treating MCP servers as production services, implementing comprehensive observability, managing context pollution, and taking responsibility for agent behavior through careful prompt engineering and tool description design."
  canonical: "https://www.zenml.io/llmops-database/scaling-an-mcp-server-for-error-monitoring-to-60-million-monthly-requests"
  ogTitle: "Sentry: Scaling an MCP Server for Error Monitoring to 60 Million Monthly Requests - ZenML LLMOps Database"
  ogDescription: "Sentry, an error monitoring platform, built a Model Context Protocol (MCP) server to improve the workflow where developers would copy error details from Sentry's UI and paste them into AI coding assistants like Cursor. The MCP server provides direct integration with 10-15 tools, including retrieving issue details and triggering automated fix attempts through Sentry's AI agent. The implementation scaled from 30 million to 60 million requests per month, with over 5,000 organizations using it. The company learned critical lessons about treating MCP servers as production services, implementing comprehensive observability, managing context pollution, and taking responsibility for agent behavior through careful prompt engineering and tool description design."
---

## Overview

Sentry, an error monitoring platform, implemented a Model Context Protocol (MCP) server to fundamentally change how developers interact with their service when debugging code errors. The case study comes from a presentation by Bet, a member of Sentry's special projects team, who describes their journey from initial implementation to scaling to 60 million monthly requests (doubling from 30 million when the talk was initially submitted). The implementation serves over 5,000 organizations ranging from startups to large tech companies, with only a three-person team managing the entire MCP server infrastructure.

The core problem Sentry identified was a common but inefficient workflow: developers would visit Sentry's platform to view frontend or backend errors, copy the error details, then paste them into AI coding assistants like Cursor or Claude to request fixes. This manual copy-paste workflow was ubiquitous but created friction. Sentry's MCP server solution provides direct integration, allowing AI coding assistants to query error details and trigger automated fixes without requiring users to leave their development environment or manually transfer information.

## Technical Architecture and Implementation

The MCP server implementation utilizes the Model Context Protocol, which enables AI applications to connect to external data sources and tools through a standardized interface. Sentry's implementation supports three transport mechanisms: local stdio, HTTP streamable, and Server-Sent Events (SSE). The speaker notes that different MCP clients support different transports—for instance, Claude Desktop and Cursor support HTTP streamable while SSE is considered legacy, though some clients still rely on it.

The MCP server exposes 10-15 tools, with three being most heavily used. The primary tool is "get_issue_details," which retrieves comprehensive information about a specific error from Sentry's platform. The second critical tool is "begin_sentry_issue_fix," which triggers Sentry's internal AI agent to attempt an automated fix of the issue. This is particularly valuable because it leverages the extensive context Sentry has about the error environment. Additional tools support workflows like listing organizations, retrieving projects, searching for issues, and searching events.

A particularly interesting architectural decision is the embedding of AI agents within the MCP server tools themselves. The speaker explains that when a tool is invoked within the MCP server, they can incorporate an AI agent to process and filter information before returning it to the calling client. This provides control over what information is returned even when the team has no control over the client environment (like Cursor or Claude Desktop). This pattern allows them to ensure that only relevant, concise information is passed back to the user's AI assistant, helping manage context pollution.

## Prompt Engineering and Tool Design

The case study provides extensive insight into the prompt engineering strategies employed to make the MCP server effective in production. The speaker emphasizes that when building an MCP server, the developer is "fully responsible" for what happens inside it—if the tools don't get called correctly, that's the developer's fault, not the user's. This philosophy drives their approach to tool descriptions and metadata.

Sentry chose to standardize on Markdown for all tool responses and descriptions. This decision was made because Markdown is human-readable, aligns well with the "latent space" of language models, and many MCP clients natively render Markdown. The speaker contrasts this with XML or JSON responses, suggesting Markdown provides better results in their context.

The team implements several specific prompt engineering patterns:

**Examples in Tool Descriptions:** Every tool description includes concrete examples of how it should be called, showing the exact parameters and format. While this seems obvious, the speaker notes it's easy to forget when writing tool descriptions, especially as they grow longer. They recommend moving tool descriptions into separate configuration files rather than embedding them directly in code.

**Chaining Patterns and Follow-ups:** Since Sentry's typical workflow involves multiple steps (get organizations, get projects, get issues, run agent on issue), tool descriptions explicitly guide the AI to the next logical step. For instance, the "get_issues_in_project" tool description tells the agent: "you can get more details about a specific issue by using the tool get_issue_details." This creates a breadcrumb trail through the intended workflow.

**FAQ-style Hinting:** The team proactively addresses common failure modes by including FAQ-style hints in tool descriptions. For example, if users commonly get stuck asking the same questions repeatedly, the tool description preemptively provides that information. One example given: "if you are uncertain about which information to query, you should call list_organization first." This reduces unnecessary back-and-forth and helps agents run longer without human intervention.

**Progress and Timing Expectations:** For long-running operations like the automated fix agent, tool descriptions explicitly warn that the operation takes time and suggest polling mechanisms to check completion status. This manages expectations and prevents the agent from getting stuck waiting for synchronous responses.

## Context Management and Pollution

A significant theme in the case study is managing "context pollution," which the speaker defines as "the measurable distance between original intent and current direction." This occurs when an AI agent starts with a specific task but gradually drifts as it accumulates more context—fixing code, handling linting errors, running tests—until it loses sight of the original objective.

Sentry employs three main strategies to combat context pollution:

**Conciseness in Tool Descriptions:** All tool descriptions are kept concise and to-the-point, including only necessary information, examples, and the guidance patterns mentioned above. Markdown formatting helps maintain readability while keeping descriptions compact.

**AI-Filtered Responses:** Initially, Sentry's approach was to mimic the manual workflow: retrieve the entire issue page, convert it to Markdown, and return everything. However, they discovered that the full page often contained irrelevant information depending on the agent's query. By embedding an AI agent within the MCP server tool, they can intelligently filter and summarize the information before returning it. This ensures responses are tailored to the specific query context rather than being a data dump.

**Re-anchoring for Long Sessions:** For longer agent sessions, Sentry includes reminders about the original task: "please remember the goal of the task was X." However, the speaker notes this primarily applies when you have an agent inside your MCP server that maintains some session state. For stateless MCP servers where all context lives in the client (Cursor, Claude Desktop), this pattern is less applicable since you're just returning tool responses without conversational context.

The speaker acknowledges that MCP servers are typically stateless or minimally stateful (perhaps storing only a session ID), with all conversation context residing in the client application. This architectural constraint shapes what's possible in terms of context management.

## Production Operations and Observability

A major portion of the case study focuses on the lessons learned from treating the MCP server as a production service rather than an experimental feature. The speaker is candid about early mistakes and the evolution of their monitoring approach.

**Early Operational Challenges:** Initially, Sentry shipped the MCP server with no observability. When outages occurred, the team had no visibility into what broke. They relied on Twitter reports to learn about issues—as the speaker notes wryly, "people in Twitter are the best telling us that it was broke." One particular incident involved a breakage in the stdio transport affecting 10% of queries, but because they lacked transport-level analytics, they couldn't identify the issue by looking at server metrics alone.

The speaker emphasizes a critical reality of AI tooling: when something doesn't work, users don't typically come back the next day—they abandon it for months. This makes getting things right from the start essential, even if that means launching with fewer features but higher quality.

**Observability Implementation:** Sentry ultimately built comprehensive dashboards treating the MCP server like any traditional production service. Their monitoring includes:

- Total request volume (60 million monthly requests at the time of the talk)
- Unique organizations and users (noting that organizations can outnumber users because individuals often belong to multiple organizations)
- Traffic patterns showing clear weekday/weekend cycles
- Tool usage distribution, revealing that "get_issue_details," "search_events," and "search_issues" are most heavily used
- Transport distribution showing which clients use which transport mechanisms
- Slowest tool identification, critical because slow tools hurt user retention ("no one is going to stick there for 30 seconds")
- Error tracking showing 45,000 tool call errors per month

**Error Handling Challenges:** The MCP server uses JSON-RPC for communication, which by default provides minimal error information. The official MCP SDK implements a try-catch pattern that simply returns "something went wrong" when a tool call fails. From an observability standpoint, this is inadequate for production operations. Sentry needed to capture detailed error information—which specific tool failed, what the error was, and any relevant context—to properly debug and maintain the service.

**Production Service Mentality:** Despite being a three-person special projects team where "99% of solutions go to the bin" during exploration, Sentry treated the MCP server with full production rigor once it gained traction. This includes handling alerts, responding to pages, and managing incidents just like any other production service. The speaker created a wrapper for MCP servers (initially for TypeScript, with Python coming soon) that automatically instruments the server with comprehensive telemetry, which they now offer to other developers building MCP servers.

## Scale and Adoption Metrics

The case study provides concrete metrics demonstrating significant production adoption:

- 60 million requests per month (doubled from 30 million over approximately 2 months)
- Over 5,000 organizations using the MCP server
- Usage spans from startups to large tech companies
- 45,000 tool call errors per month
- Operated by a three-person team
- Clear upward trajectory in usage with consistent weekday patterns

The speaker directly challenges a tweet claiming there are more MCP server builders than users, providing these numbers as counterevidence that real production usage exists at meaningful scale.

## Product and UX Implications

An interesting dimension of this case study is the acknowledgment that the MCP server fundamentally changes how users interact with Sentry's product. The speaker notes they are "removing part of our UI" because users accessing Sentry through the MCP server no longer visit the web interface to view issue details. From a product metrics perspective, this could appear negative—users spending less time in the UI—but the speaker frames it as positive because it "lets users get straight to the point which is fixing an issue."

This represents a strategic decision to optimize for user outcomes (faster issue resolution) rather than engagement metrics (time in application). The MCP server enables users to do everything without ever visiting Sentry's web interface, which requires a mature product philosophy to embrace.

## Workflow Improvement Philosophy

The speaker emphasizes that successful MCP implementations should improve existing workflows rather than inventing entirely new behaviors. Sentry identified a workflow users were already performing—copying errors and pasting into AI assistants—and made it seamless. This approach of removing friction from established patterns, rather than trying to create novel workflows, likely contributed to rapid adoption.

The example given earlier in the talk about building voice agents for plumbers illustrates this principle well. The agent needed to check addresses (Google Maps API), book appointments (Google Calendar API with two tools), and access company information (Notion). Rather than building custom Notion integration with all its complexity (pages, tables, spaces), they simply plugged in Notion's existing MCP server. This demonstrates how MCP servers can compose to create comprehensive solutions.

## Critical Assessment and Limitations

While the case study demonstrates impressive scale and thoughtful engineering, several aspects warrant balanced consideration:

The actual effectiveness of the automated fixes generated through the "begin_sentry_issue_fix" tool isn't discussed—we don't know what percentage of issues are successfully resolved without human intervention or how often the AI-generated fixes introduce new problems. The 45,000 monthly tool call errors represent roughly 0.075% of total requests, but without knowing the distribution and impact of these errors, it's difficult to assess reliability.

The speaker's assertion that Markdown is superior to XML or JSON for LLM responses is presented as fact but is actually a design decision with tradeoffs. While Markdown may be more human-readable, structured formats like JSON can provide more reliable parsing and validation, especially for complex nested data.

The context pollution solutions described are thoughtful but somewhat reactive—they're addressing symptoms (agents losing focus) rather than fundamental architectural challenges. The embedding of AI agents within MCP server tools to filter responses adds latency and cost that isn't quantified in the presentation.

The claim that building observability was trivial ("one second instantly" to build the initial dashboard because they already recorded user information) seems optimistic given the sophistication of the final monitoring solution described. This might reflect hindsight bias or undersell the engineering effort required.

The three-person team metric is impressive but doesn't account for infrastructure and platform support from Sentry's broader engineering organization. The MCP server likely benefits from existing authentication, database, and service infrastructure.

## Broader Implications for LLMOps

This case study provides valuable lessons for production LLM deployments beyond just MCP servers:

**Agent Responsibility:** The principle that developers are "fully responsible" for agent behavior applies broadly. Rather than expecting users to craft perfect prompts or provide perfect context, production systems should be designed to work reliably with natural user behavior.

**Observability as First-Class Concern:** The evolution from no monitoring to comprehensive dashboards illustrates that AI systems require the same operational rigor as traditional services. The specific challenges of observing agent behavior—understanding why tools aren't called, tracking context drift, measuring quality beyond simple success/failure—represent a maturing understanding of what production LLMOps requires.

**Context Management Strategies:** The techniques for managing context pollution—concise tool descriptions, intelligent filtering, workflow chaining—are applicable to RAG systems, agent frameworks, and any LLM application where maintaining focus over extended interactions is critical.

**Transport and Client Diversity:** Supporting multiple transport mechanisms and tracking which clients use which transports reflects the fragmented ecosystem of AI tooling. Production systems must accommodate heterogeneous client capabilities rather than assuming a single standard implementation.

Overall, this case study represents a maturing understanding of what it takes to run LLM-powered systems in production at scale, with specific insights about the MCP protocol that are valuable given its growing adoption in the developer tools ecosystem.