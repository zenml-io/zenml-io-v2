---
title: "Autonomous Observability with AI Agents and Model Context Protocol"
slug: "autonomous-observability-with-ai-agents-and-model-context-protocol"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694add2fbf2b322a9dbad392"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:49.028Z"
  createdOn: "2025-12-23T18:19:27.914Z"
llmopsTags:
  - "high-stakes-application"
  - "realtime-application"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "a2a"
  - "mcp"
  - "error-handling"
  - "kubernetes"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "elasticsearch"
  - "anthropic"
industryTags: "tech"
company: "Pinterest"
summary: "Pinterest's observability team faced a fragmented infrastructure challenge where logs, metrics, traces, and change events existed in disconnected silos, predating modern standards like OpenTelemetry. Engineers had to navigate multiple interfaces during incident resolution, increasing mean time to resolution (MTTR) and creating steep learning curves. To address this without a complete infrastructure overhaul, Pinterest developed an MCP (Model Context Protocol) server that acts as a unified interface for AI agents to access all observability data pillars. The centerpiece is \"Tricorder Agent,\" which autonomously gathers relevant information from alerts, generates filtered dashboard links, queries dependencies, and provides root cause hypotheses. Early results show the agent successfully navigating dependency graphs and correlating data across previously disconnected systems, streamlining incident response and reducing the time engineers spend context-switching between tools."
link: "https://medium.com/pinterest-engineering/autonomous-observability-at-pinterest-part-1-of-2-eb0adae830ba"
year: 2025
seo:
  title: "Pinterest: Autonomous Observability with AI Agents and Model Context Protocol - ZenML LLMOps Database"
  description: "Pinterest's observability team faced a fragmented infrastructure challenge where logs, metrics, traces, and change events existed in disconnected silos, predating modern standards like OpenTelemetry. Engineers had to navigate multiple interfaces during incident resolution, increasing mean time to resolution (MTTR) and creating steep learning curves. To address this without a complete infrastructure overhaul, Pinterest developed an MCP (Model Context Protocol) server that acts as a unified interface for AI agents to access all observability data pillars. The centerpiece is \"Tricorder Agent,\" which autonomously gathers relevant information from alerts, generates filtered dashboard links, queries dependencies, and provides root cause hypotheses. Early results show the agent successfully navigating dependency graphs and correlating data across previously disconnected systems, streamlining incident response and reducing the time engineers spend context-switching between tools."
  canonical: "https://www.zenml.io/llmops-database/autonomous-observability-with-ai-agents-and-model-context-protocol"
  ogTitle: "Pinterest: Autonomous Observability with AI Agents and Model Context Protocol - ZenML LLMOps Database"
  ogDescription: "Pinterest's observability team faced a fragmented infrastructure challenge where logs, metrics, traces, and change events existed in disconnected silos, predating modern standards like OpenTelemetry. Engineers had to navigate multiple interfaces during incident resolution, increasing mean time to resolution (MTTR) and creating steep learning curves. To address this without a complete infrastructure overhaul, Pinterest developed an MCP (Model Context Protocol) server that acts as a unified interface for AI agents to access all observability data pillars. The centerpiece is \"Tricorder Agent,\" which autonomously gathers relevant information from alerts, generates filtered dashboard links, queries dependencies, and provides root cause hypotheses. Early results show the agent successfully navigating dependency graphs and correlating data across previously disconnected systems, streamlining incident response and reducing the time engineers spend context-switching between tools."
---

## Overview and Business Context

Pinterest's observability (o11y) team developed an innovative AI agent-based solution to overcome the limitations of their fragmented observability infrastructure. The company operates at substantial scale, processing approximately 3 billion data points per minute, 12 billion keys per minute, 7 TB of logs per day, and 7 TB of traces per day. This massive data volume is spread across disparate systems that were built before modern observability standards like OpenTelemetry became available. The challenge was to create unified, intelligent observability capabilities without undertaking a complete infrastructure overhaul that would be both costly and disruptive.

The Pinterest observability team's approach centers on what they call "autonomous observability," where AI agents leverage the Model Context Protocol to bridge data silos and provide engineers with contextualized insights during incident response. Their primary use case focuses on assisting on-call engineers who previously had to manually navigate multiple interfaces, filter data across different systems, and piece together the narrative of what went wrong during incidents. This fragmentation led to increased mean time to resolution (MTTR) and created particularly steep learning curves for newer engineers unfamiliar with the various specialized tools.

## Technical Architecture and LLMOps Implementation

The core innovation is Pinterest's custom MCP server that serves as a centralized hub for AI agents to access observability data. The Model Context Protocol, released by Anthropic in late 2024, provides a standardized way for AI agents to interact with external tools and data sources. Pinterest's implementation makes the following data pillars accessible to LLM-based agents through unified tooling:

The MCP server exposes tools for accessing ChangeFeed Events (deployments, feature flags, experiment rollouts), Metrics from their time series database, Post-Mortem Documents that have been previously ingested and indexed, Logs for specific services and time ranges, Traces for distributed request tracking, Alert Information including relevant metrics and service identifiers, and Dependency Graphs showing both upstream and downstream service relationships.

This architecture represents a pragmatic LLMOps approach that sidesteps the need for complete data integration. Rather than requiring all observability data to share common identifiers or schemas (as OpenTelemetry would provide), the system relies on the LLM's reasoning capabilities to discover correlations and patterns across disconnected data sources. The agent can make sequential tool calls, building context iteratively as it investigates an incident.

## The Tricorder Agent: Production AI System

The primary production agent built on this MCP infrastructure is called "Tricorder Agent," named after the fictional diagnostic device from Star Trek. Tricorder is designed specifically for incident response scenarios. When an engineer provides an alert link or alert number, the agent autonomously gathers relevant information, generates filtered dashboard links, queries related services through dependency graphs, and provides hypotheses about root causes with suggested next steps.

The agent demonstrates sophisticated reasoning capabilities that emerged without explicit prompting. For example, when provided with dependency graph information, the Tricorder automatically queries multiple parts of the graph, checking the health of both incoming and outgoing dependencies. When generating dashboard links, it includes not just the primary affected service but also related services from the dependency graph, recognizing that issues might stem from dependencies rather than the alerted service itself.

## Context Window Management and LLMOps Challenges

Pinterest encountered significant practical challenges related to LLM context window limitations, a critical consideration for any production LLMOps deployment. The team initially underestimated how much data even a narrow query would return from their massive observability systems. Even querying just a 15-minute window could produce enough data to exceed model context limits and cause agent failures.

The team developed two main strategies to manage context consumption. For their initial use case focused on information gathering for on-call engineers, they implemented link generation rather than raw data analysis. The agent determines relevant time periods and services, then generates pre-filtered dashboard links rather than attempting to parse all the raw data within its context window. This approach trades some analytical depth for reliability and context efficiency.

For more advanced use cases requiring actual data analysis and correlation across pillars, Pinterest refined the tool documentation within the MCP server. The metadata that describes each tool to the agent now includes explicit instructions to query only very small time periods and make multiple sequential calls to cover longer timeframes. This essentially implements a form of manual chunking strategy where the agent incrementally builds understanding rather than attempting to load everything at once.

Pinterest is also testing a third approach in collaboration with their internal Spark team: using an additional LLM with a fresh context window within the MCP server itself to summarize data before returning it to the primary agent. This architecture would create a two-tier system where a specialized summarization model processes raw data and the main agent works with condensed summaries, preserving context space. However, the team acknowledges they need to validate that this summarization layer doesn't significantly degrade the agent's analytical performance.

## Context Engineering and Control

The Pinterest team emphasizes "context engineering" as a critical discipline for production LLM systems. They highlight several benefits of the MCP-based architecture from a governance and control perspective. By building a centralized MCP server, the observability team maintains fine-grained control over what data and capabilities agents can access. This prevents individual teams from building their own ad-hoc integrations that might access data incorrectly or give agents inappropriate permissions to modify production systems.

The MCP architecture provides natural boundaries for safety and privacy controls. The server acts as a controlled interface layer, exposing only specific, approved data access patterns rather than giving agents direct database access. The team can also guide agents toward relevant data subsets by combining domain knowledge encoded in the tools with what the agent learns during its investigation.

The extensibility of the MCP approach is particularly valuable for an evolving production system. Tools can be added, removed, or modified without changing the fundamental agent interaction model. As Pinterest's observability infrastructure evolves, the MCP server can grow with it, adding new data sources and capabilities incrementally. The team hosted an internal hackathon where multiple teams built projects leveraging the observability MCP server, with one project winning first place, demonstrating the platform's utility beyond the core observability team.

## Shift-Left and Shift-Right Strategies

Pinterest frames their observability evolution in terms of "shift-left" and "shift-right" practices. Shift-left refers to integrating observability practices earlier in the development lifecycle, standardizing instrumentation and logging practices to enable proactive issue identification. Shift-right focuses on maintaining production visibility through alerting and health inference systems that detect issues in live environments.

The AI agent approach serves primarily the shift-right strategy, enhancing production incident response capabilities. However, the infrastructure also supports shift-left goals by making it easier for development teams to understand the observability posture of their services. The Tricorder can analyze services during development or staging, helping teams identify instrumentation gaps or potential production issues before they occur.

## Production Results and Observed Behaviors

While the case study doesn't provide quantitative metrics on MTTR reduction or other performance indicators, it describes qualitative successes. The team reports being "pleasantly surprised" by emergent agent behaviors, particularly around dependency graph exploration. The agent autonomously expands its investigation to include related services without being explicitly programmed to do so, demonstrating the value of reasoning-capable LLMs in complex diagnostic tasks.

The link generation approach appears to be successfully streamlining engineer workflows by eliminating the manual effort of navigating multiple dashboards, applying filters, and correlating time windows across different tools. Engineers can now provide an alert identifier and receive a curated set of pre-filtered dashboard links along with preliminary analysis, allowing them to focus immediately on problem resolution rather than information gathering.

## Critical Assessment and Limitations

The case study presents an optimistic view of the technology that should be balanced with some critical considerations. The team is still in relatively early stages of deployment and testing, and several open questions remain. The summarization approach being tested with the Spark team represents an acknowledgment that the current solutions may not scale to all desired use cases. There's an inherent tension between the amount of context needed for sophisticated root cause analysis and the context limitations of current LLMs.

The reliance on link generation for the initial use case, while pragmatic, does limit the agent's analytical capabilities. The agent isn't actually performing deep data analysis or discovering novel correlations in this mode—it's primarily acting as an intelligent dashboard link generator and information aggregator. This is valuable for reducing toil, but falls short of the "autonomous observability" vision suggested by the title, where agents would independently diagnose and potentially remediate issues.

The case study doesn't address several important LLMOps concerns such as latency (how long does the agent take to complete an investigation?), cost (LLM API calls for every alert could become expensive at Pinterest's scale), reliability and error handling (what happens when tool calls fail or return unexpected data?), and model selection and versioning (which LLM is being used, and how do they manage model updates?).

There's also limited discussion of evaluation methodology. How does Pinterest validate that the Tricorder's hypotheses are accurate? What happens when the agent provides incorrect or misleading guidance? Production AI systems require robust evaluation frameworks, and while the team mentions being "pleasantly surprised" by certain behaviors, systematic evaluation is essential for production deployment.

## Future Vision and Broader Implications

Pinterest positions this work as the foundation for increasingly autonomous observability capabilities. The eventual vision includes agents that not only diagnose issues but autonomously resolve them. The MCP server is designed as a hub that other engineering teams at Pinterest can leverage for their own agentic applications, demonstrated by its use in the company hackathon.

This represents a thoughtful LLMOps strategy that recognizes AI agents as complementary to existing infrastructure rather than requiring wholesale replacement. For organizations with mature, pre-OpenTelemetry observability stacks, Pinterest's approach offers a viable path forward. Rather than undertaking multi-year migration projects, they're using LLMs' reasoning capabilities to bridge gaps in real-time.

The emphasis on the Model Context Protocol as a standardized interface is particularly forward-looking. As MCP gains adoption, Pinterest's investment in this architecture positions them to integrate with a growing ecosystem of MCP-compatible tools and agents. The plug-and-play extensibility means the system can evolve with both Pinterest's internal needs and the broader AI agent ecosystem.

However, the success of this approach ultimately depends on LLM capabilities continuing to improve, particularly around context window sizes, reasoning accuracy, and cost efficiency. Pinterest's architecture is betting that these improvements will come, and they're building the infrastructure to take advantage of them when they do.