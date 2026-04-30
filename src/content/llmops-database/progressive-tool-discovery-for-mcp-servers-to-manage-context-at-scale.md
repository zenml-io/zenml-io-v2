---
title: "Progressive Tool Discovery for MCP Servers to Manage Context at Scale"
slug: "progressive-tool-discovery-for-mcp-servers-to-manage-context-at-scale"
draft: false
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "content-moderation"
  - "poc"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "token-optimization"
  - "latency-optimization"
  - "serverless"
  - "api-gateway"
  - "monitoring"
  - "orchestration"
  - "microservices"
  - "fastapi"
  - "amazon-aws"
industryTags: "media-entertainment"
company: "Amazon"
summary: "Amazon Prime Video faced a critical challenge as their AI agents gained access to centralized MCP servers with hundreds of tools, causing context bloat that degraded performance and increased hallucinations. The team developed a progressive tool discovery solution using MCP protocol notifications and session tracking, exposing only a single \"find tools\" capability at initialization that agents could invoke to dynamically discover and load relevant tool subsets based on problem categories. This approach reduced tool exposure from hundreds to just three or four context-appropriate tools per task, dramatically improving agent performance while maintaining the benefits of centralized tool management across organizational boundaries."
link: "https://www.youtube.com/watch?v=MFL5cRTBUX0"
year: 2026
seo:
  title: "Amazon: Progressive Tool Discovery for MCP Servers to Manage Context at Scale - ZenML LLMOps Database"
  description: "Amazon Prime Video faced a critical challenge as their AI agents gained access to centralized MCP servers with hundreds of tools, causing context bloat that degraded performance and increased hallucinations. The team developed a progressive tool discovery solution using MCP protocol notifications and session tracking, exposing only a single \"find tools\" capability at initialization that agents could invoke to dynamically discover and load relevant tool subsets based on problem categories. This approach reduced tool exposure from hundreds to just three or four context-appropriate tools per task, dramatically improving agent performance while maintaining the benefits of centralized tool management across organizational boundaries."
  canonical: "https://www.zenml.io/llmops-database/progressive-tool-discovery-for-mcp-servers-to-manage-context-at-scale"
  ogTitle: "Amazon: Progressive Tool Discovery for MCP Servers to Manage Context at Scale - ZenML LLMOps Database"
  ogDescription: "Amazon Prime Video faced a critical challenge as their AI agents gained access to centralized MCP servers with hundreds of tools, causing context bloat that degraded performance and increased hallucinations. The team developed a progressive tool discovery solution using MCP protocol notifications and session tracking, exposing only a single \"find tools\" capability at initialization that agents could invoke to dynamically discover and load relevant tool subsets based on problem categories. This approach reduced tool exposure from hundreds to just three or four context-appropriate tools per task, dramatically improving agent performance while maintaining the benefits of centralized tool management across organizational boundaries."
notion:
  pageId: "352f8dff-2538-80ba-9351-eb6ed1f877cb"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-30T13:11:00.000Z"
  lastEditedTime: "2026-04-30T13:11:00.000Z"
  publishedAt: "2026-04-30T13:19:48Z"
---

## Overview

Amazon Prime Video's engineering team presented a sophisticated solution to one of the emerging challenges in production AI agent systems: the paradox of tool abundance. As the organization scaled their adoption of AI agents for operational and development tasks, they encountered a fundamental problem where providing agents with comprehensive tool access through centralized MCP servers actually degraded performance rather than enhanced it. The presentation, delivered by Billy Hickman (Senior Software Engineer) and Lilia (Principal Product Manager leading AI-native enablement), detailed their journey from identifying the context bloat problem to implementing progressive tool discovery as a scalable solution.

Prime Video has been aggressively pursuing AI transformation across their software development lifecycle, moving toward specification-driven development and agentic workflows. Their agents now handle real production responsibilities including real-time quality analysis for live streaming events, production feature experiment analysis, operational incident triage and response, and contributing code changes. The team emphasized that agents are "fully participating in how software gets built and how we operate it" with real customer impact. This production deployment context is critical because it meant that agent performance issues directly affected business outcomes.

## The Context Bloat Problem

The root cause of their challenge emerged from a sensible architectural decision. Initially, individual teams at Prime Video were standing up their own MCP servers and giving agents access to the same tools that human engineers used. This distributed approach led to significant duplication as teams implemented the same tools repeatedly across organizational boundaries. To address this inefficiency, Prime Video invested in shared infrastructure: a common remote MCP server providing a cross-cutting set of tools to reduce duplication and maintenance overhead.

While this centralization solved the duplication problem, it created a new one. As more teams contributed tools to the shared server, the tool count grew rapidly. Agents connecting to this centralized MCP server suddenly had access to hundreds of tools in their context window. The team observed that agents typically needed only three or four specific tools to accomplish any given task, but the presence of hundreds of tools in the context caused measurable performance degradation and increased hallucinations. This is the "paradox of choice" phenomenon applied to AI agents, analogous to a person overwhelmed by streaming service options who spends more time browsing than watching.

## Technical Solution Architecture

The solution leveraged two specific capabilities within the MCP specification. First, the protocol supports sending notifications to agents indicating that the list of available tools has been refreshed, allowing agents to optionally respond by calling back to retrieve an updated tool list. Second, the MCP specification's streamable HTTP and server-side events transport mechanism introduced session tracking via an MCP session ID header, enabling servers to generate session identifiers during initialization and have agents pass these forward for all subsequent requests.

The core implementation works as follows. After initialization, the MCP server exposes only a single tool called "find tools" to the agent. On the server side, tools are mapped to problem categories such as "operations," "results," "training," or "events," with individual tools potentially belonging to multiple categories. The find tools capability includes in its description details about how agents can discover additional tools, information about available problem categories, and encouragement to invoke the tool when additional capabilities are needed.

The discovery flow proceeds through several steps. Initially, the agent knows only about the single find tools capability. When the agent needs to accomplish a task, it invokes find tools with a specific problem category, such as "operations." The server persists the mapping between the agent session and the requested problem category, tracking which problem space the agent is operating within. The tool call returns a list of discovered tool names relevant to that category. The server then sends a tools list changed notification, prompting the agent to fetch an updated tool list. The agent receives the new tools specific to the operational problem space and can now utilize them.

Critically, the server maintains state mapping from agent session identifiers to problem spaces. This allows the system to track which tools should be available to which agent sessions. The team acknowledged that for remote servers in distributed environments, there is a trade-off in determining how long to persist this problem category mapping, balancing against expected agent session duration and the storage mechanism employed.

## Progressive Discovery and Tool Swapping

A particularly sophisticated aspect of the implementation is that agents can dynamically switch problem categories mid-session. The demonstration showed an agent first discovering "results" tools to query historical marathon completion times, then later invoking find tools again to request "training" tools to create a training plan. When the agent switched categories, the previously loaded results tools were removed from context and replaced with training-specific tools. This progressive discovery means tools can be added and removed throughout a session based on evolving task requirements, not just at initialization.

The removal mechanism is triggered when the agent makes another tools list call following a notification from the server. The server responds with only the tools relevant to the newly requested problem category, effectively removing previous tools from the agent's available context. This allows agents to explore different tool spaces, potentially discarding one set of discoveries and finding different capabilities as their understanding of the task evolves.

## Production Use Cases

While the demonstration used a personal running training plan example to illustrate the pattern without revealing proprietary systems, the team described several production use cases at Prime Video. Real-time quality analysis of live event streaming, which was previously only feasible for flagship events like Thursday Night Football or Champions League games, can now be performed routinely even for niche events thanks to agent automation. Deeper analysis of production feature experiments that previously exceeded team bandwidth has become standard practice. Operational incident triage and response workflows now involve agent participation. Code contribution from agents is an active part of their development process.

These production applications required agents to interact with real production systems and have direct customer impact, making performance and reliability critical. The team noted that as agents became more capable and autonomous over the past year, moving from simple assistants requiring heavy prompting toward systems capable of taking on real development and operational tasks, the need for robust infrastructure became paramount.

## Implementation Considerations and Trade-offs

The team was careful to note several important considerations for this approach. First, dynamic tool discovery does not eliminate the need for governance. Even with progressive discovery, teams must maintain standards around tool definitions, ensure there is no overlap between tools, and exercise judgment about what gets added to the shared server. Tool bloat can still occur at the category level if problem categories are not well-designed or if individual categories contain too many tools.

There is also a trade-off regarding interaction latency. Unlike standard MCP server usage where tools are loaded once at session initialization, progressive discovery requires additional round-trips: invoking find tools, receiving results, getting the notification, requesting updated tool lists, and receiving the new tools. For Prime Video's use cases, they found this additional latency acceptable given the performance benefits of reduced context bloat, but acknowledged this might not be suitable for all scenarios. If a tool is needed for every agent session, the overhead of progressive discovery might not be justified.

The pattern works with both remote MCP servers using HTTP streaming with server-side events and local implementations using standard IO. This means teams distributing local servers across many organizational units can employ the same capability, not just those operating centralized remote servers.

## Governance and Scaling Challenges

Beyond technical implementation, the team highlighted organizational challenges. When opening centralized infrastructure for contributions across internal teams, maintaining quality requires careful governance. Clean tool definitions are essential for effective discovery. If tool descriptions are ambiguous or overlapping, agents may struggle to select appropriate problem categories or make effective use of discovered tools even if the discovery mechanism works correctly.

The team also noted that there is a threshold effect. Even with excellent descriptive tool names and clear definitions, performance drops when too many tools are available simultaneously. The improvement from having just three relevant tools versus a hundred irrelevant ones is substantial, confirming that context management is not just about token limits but about cognitive load and decision quality for the agent.

Similarly, at the category level, introducing too many problem categories can create a new problem where agents struggle to determine which category to operate within. This suggests the approach scales best with thoughtfully designed, relatively small sets of well-defined problem categories, perhaps in the range of five to fifteen categories rather than hundreds.

## Protocol Compliance and Future Concerns

During the Q&A session, several important practical concerns emerged. One questioner noted that session tracking functionality might be removed from the MCP protocol specification, which would significantly impact this implementation pattern. The presenters acknowledged uncertainty about the future direction of the protocol and noted they would need to adapt to a stateless approach if session tracking is removed. They advocated for retaining at least the session ID header given its utility for this and similar use cases, noting that Amazon's support might influence the protocol evolution.

Another questioner highlighted that many MCP client implementations are not fully compliant with the protocol specification, particularly around responding to the tools list changed notification. The team acknowledged this challenge but noted it was not a problem for their use case because they controlled their own client implementations internally. For organizations using external MCP servers or clients, non-compliant implementations could prevent this pattern from working. This underscores a broader challenge in LLMOps: protocol standards are only valuable when consistently implemented across the ecosystem.

## Alternative Approaches Considered

The team evaluated several alternatives before settling on progressive discovery. One approach was sub-agent tool discovery, where tool context propagates from a sub-agent to a listening agent. Another was maintaining per-agent tool configurations, where distribution of agent configuration files becomes the mechanism for controlling tool availability. Each approach had unique pros and cons, but they felt full dynamic mid-session discovery was necessary for their scale and problem requirements.

One questioner asked about using MCP resources rather than tools for exposing the category list. The team acknowledged this could have been a viable alternative and that resources might be a more natural fit for that particular use case, suggesting their implementation choices reflected pragmatic engineering decisions rather than the only possible approach.

The comparison with "progressive disclosure" in skills was also raised. While the team could not provide detailed comparison, they acknowledged potential overlap in the problem being solved, though noted that MCP brings specific benefits around distribution, security, and operational concerns that influenced their choice of implementation pattern.

## Performance Impact and Validation

The team reported that their approach "worked really well" for their internal use cases, enabling them to operate "one server with many more tools than we would have been okay with before." They confirmed that reducing from hundreds of tools to three or four context-appropriate tools produced measurable performance improvements. The exact metrics were not disclosed, but the claim of reduced hallucinations and improved tool selection suggests both accuracy and reliability improvements.

Importantly, this was not presented as a universal solution but as an approach that worked for their specific context: centralized MCP servers with cross-cutting capabilities shared across teams and organizational boundaries. The pattern is particularly valuable when teams contributing tools should not impose context costs on other teams using the same infrastructure for different purposes.

## Broader LLMOps Implications

This case study illustrates several broader themes in production LLM systems. First, architectural patterns that work well at small scale can create unexpected problems at production scale. Centralization solved one problem (duplication) but created another (context bloat). Second, effective LLMOps often requires going beyond simple API calls to implement sophisticated orchestration logic. The progressive discovery pattern demonstrates using protocol-level features like notifications and session tracking to build more intelligent agent behavior.

Third, production AI systems require governance frameworks that span both technical and organizational domains. Tool quality, naming conventions, category design, and contribution processes all matter as much as the technical implementation. Fourth, the ecosystem maturity of standards like MCP significantly impacts what patterns are viable in practice. Non-compliant clients and potential protocol changes create uncertainty that production systems must navigate.

Finally, the case demonstrates that context window management is not just about staying under token limits but about optimizing agent decision-making. Even when all tools could technically fit in context, providing too many choices degrades performance, suggesting that future LLM systems may need increasingly sophisticated mechanisms for selective context exposure rather than assuming bigger context windows solve all problems.
