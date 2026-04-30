---
title: "Building an AI-Powered Slack Agent with MCP Standardization"
slug: "building-an-ai-powered-slack-agent-with-mcp-standardization"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "code-generation"
  - "poc"
  - "mcp"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "multi-agent-systems"
  - "agent-based"
  - "evals"
  - "system-prompts"
  - "fastapi"
  - "docker"
  - "monitoring"
  - "security"
  - "guardrails"
  - "open-source"
  - "documentation"
  - "cicd"
  - "orchestration"
  - "postgresql"
  - "anthropic"
  - "amazon-aws"
  - "google-gcp"
industryTags: "education"
company: "Duolingo"
summary: "Duolingo developed an AI-powered Slack bot to democratize access to their Model Context Protocol (MCP) infrastructure after discovering that manual MCP server setup was too complex for widespread adoption. The journey began with individual engineers connecting MCP servers to local editors in late 2024, evolved through a centralized discovery portal in mid-2025, and culminated in a comprehensive standardization effort and Slack application by late 2025. By April 2026, the bot achieved over 250 weekly active users (approximately 30% of the company) with an 80% upvote rate, successfully reducing toil for on-call engineers through automated incident response, help desk support, and safe write operations with human-in-the-loop verification."
link: "https://www.youtube.com/watch?v=5sb9iA2v78g"
year: 2026
seo:
  title: "Duolingo: Building an AI-Powered Slack Agent with MCP Standardization - ZenML LLMOps Database"
  description: "Duolingo developed an AI-powered Slack bot to democratize access to their Model Context Protocol (MCP) infrastructure after discovering that manual MCP server setup was too complex for widespread adoption. The journey began with individual engineers connecting MCP servers to local editors in late 2024, evolved through a centralized discovery portal in mid-2025, and culminated in a comprehensive standardization effort and Slack application by late 2025. By April 2026, the bot achieved over 250 weekly active users (approximately 30% of the company) with an 80% upvote rate, successfully reducing toil for on-call engineers through automated incident response, help desk support, and safe write operations with human-in-the-loop verification."
  canonical: "https://www.zenml.io/llmops-database/building-an-ai-powered-slack-agent-with-mcp-standardization"
  ogTitle: "Duolingo: Building an AI-Powered Slack Agent with MCP Standardization - ZenML LLMOps Database"
  ogDescription: "Duolingo developed an AI-powered Slack bot to democratize access to their Model Context Protocol (MCP) infrastructure after discovering that manual MCP server setup was too complex for widespread adoption. The journey began with individual engineers connecting MCP servers to local editors in late 2024, evolved through a centralized discovery portal in mid-2025, and culminated in a comprehensive standardization effort and Slack application by late 2025. By April 2026, the bot achieved over 250 weekly active users (approximately 30% of the company) with an 80% upvote rate, successfully reducing toil for on-call engineers through automated incident response, help desk support, and safe write operations with human-in-the-loop verification."
notion:
  pageId: "352f8dff-2538-80f4-8910-fa4effbd7357"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-30T13:07:00.000Z"
  lastEditedTime: "2026-04-30T13:07:00.000Z"
  publishedAt: "2026-04-30T13:20:09Z"
---

## Overview

Duolingo's AI Slack agent represents a comprehensive LLMOps journey focused on solving the infrastructure and adoption challenges of deploying Model Context Protocol (MCP) servers at scale within an organization. This case study spans from November 2024 through April 2026 and illustrates how a language learning company evolved from enthusiastic experimentation with MCP technology to building production-grade AI agents that serve approximately 30% of their workforce on a weekly basis.

The fundamental problem Duolingo faced was common to many organizations exploring AI tooling: while powerful AI capabilities existed, the barrier to entry was so high that adoption remained limited to a small group of technical enthusiasts. The solution they developed involved three major phases: discovery and documentation, infrastructure standardization, and finally abstracting the complexity entirely through a conversational Slack interface.

## Initial MCP Adoption Challenges (November 2024)

When Anthropic introduced MCP in November 2024, several Duolingo engineers immediately recognized its potential and began connecting various MCP servers to their local development editors. However, the setup process proved extremely painful from an LLMOps perspective. Each individual MCP server required engineers to conduct their own research to locate the appropriate GitHub repository, determine the correct configuration settings, obtain necessary credentials through various authentication mechanisms, and manually create and maintain their own mcp.json configuration files. This high barrier to entry meant that very few engineers outside the initial enthusiasts bothered with the technology, creating an adoption problem that the team recognized would not scale across the organization.

## Discovery Portal Attempt (May 2025)

In May 2025, Duolingo attempted to address the discovery and setup friction by creating a centralized web page that functioned as an internal app store for MCP servers. This portal provided instructions for setting up various MCP servers, allowed engineers to browse available options with supporting documentation, guided them through credential acquisition, and offered generic configuration templates that could be copied directly into AI development tools like Cursor or Claude Code. While this represented an improvement over completely decentralized setup, it still required manual configuration steps and did not solve the underlying technical heterogeneity problem.

## The Heterogeneity Problem

Even with improved discovery, Duolingo encountered a fundamental infrastructure challenge: every MCP server was built and operated differently. Some were written in Python and served via uvx, while others were implemented in TypeScript and packaged as Docker images. This inconsistency created dependency conflicts, Docker configuration issues, and environment-specific failures. The team tested all MCP servers on their own machines successfully, but when rolling out to different engineers, they received numerous reports of failures due to version mismatches with npm or Docker problems. This highlighted a critical LLMOps lesson: testing in homogeneous environments does not guarantee successful deployment across heterogeneous production environments, even within a single organization.

## MCP Standardization Strategy (August 2025)

In August 2025, Duolingo initiated a comprehensive MCP standardization effort that represents the core infrastructure innovation of this case study. Their strategy differentiated between several categories of MCP servers with tailored approaches for each:

For external first-party MCP servers like GitHub and Atlassian, Duolingo allowed engineers to connect directly from their AI editors to these services without intermediation. For open-source MCP servers, they forked repositories internally and added authentication layers compatible with their internal authentication systems, implemented usage tracking to understand adoption patterns and identify issues, and hosted these services internally behind their VPC using HTTP endpoints. This approach gave them control over the deployment environment while maintaining the benefits of open-source tooling.

A particularly interesting authentication optimization involved services where multiple users shared similar credentials, such as Funnel or Jenkins. Rather than requiring each engineer to configure OAuth flows within their local Cursor or Claude Code setups, Duolingo implemented shared service tokens on the internal server side. Engineers would authenticate once using an internal JWT token to the MCP server, and the server would handle the OAuth to the external service. This significantly reduced configuration complexity for end users. For services where different engineers had different access levels, such as Google or Slack, they maintained OAuth flows for proper permission scoping.

Beyond public services, Duolingo developed internal MCP servers to surface company-specific information like application release status and social media monitoring data. To democratize internal MCP server development, they created an internal Python library built on top of FastMCP, enabling different teams to convert their services into MCP servers without deep expertise in the protocol. These internal servers were also hosted via standardized HTTP endpoints.

For services where permissions could be controlled at the IAM level, such as AWS or BigQuery, Duolingo deliberately chose not to use MCP servers. Instead, they allowed AI tools to invoke CLI commands directly, recognizing that adding an abstraction layer would create unnecessary complexity without improving security or usability. For tools that genuinely needed to run locally, such as Playwright for browser automation or device simulators, they continued supporting local MCP server execution via stdio or SSE protocols.

As of the presentation date in April 2026, Duolingo supported approximately 30 MCP servers with over 300 tools available. Critically, half of these servers used a highly standardized HTTP configuration where engineers simply placed their JWT token in the request header and set the URL to a pattern like mcp-name.internal.duolingo.com. Switching between MCP servers required only changing the service name in the URL, representing significant standardization progress.

## The Persistent Adoption Problem

Despite achieving substantial infrastructure standardization, Duolingo still observed low adoption rates. Even a single click to copy configuration to a local editor proved to be too much friction for most employees. This insight is crucial from an LLMOps perspective: technical excellence in infrastructure does not automatically translate to user adoption. The barrier was not primarily technical capability but rather user experience and workflow integration.

## The Slack AI Agent Solution (September 2025)

In September 2025, Duolingo pivoted to a different strategy: rather than requiring users to configure MCP servers themselves, they would bring MCP capabilities to users where they already worked—specifically, in Slack. This represents a significant LLMOps pattern: embedding AI capabilities into existing workflows rather than requiring users to adopt new tools.

The Slack application architecture consisted of two main components. The Claude Agent SDK enabled the AI to interact with different MCP servers and execute operations, while the Slack Bot SDK handled messaging within Slack threads. The agent connected to read-only tools from over 15 MCP servers and possessed the ability to execute AWS CLI and BigQuery commands for diagnostics and metrics retrieval.

## Key LLMOps Features

Several features of the Slack bot demonstrate sophisticated LLMOps practices:

The bot automatically responds in help desk channels and incident channels, significantly reducing toil for on-call engineers. This represents a clear production use case with measurable impact on engineering productivity and incident response times.

For write operations such as creating pull requests or Jira tickets, Duolingo implemented human-in-the-loop verification. Rather than allowing the AI agent to execute potentially destructive operations autonomously, the bot presents confirmation dialogs with approve and cancel buttons. Upon approval, it triggers a Temporal workflow to execute the actual operation. This demonstrates mature thinking about AI safety in production environments, recognizing that AI agents should have guardrails for operations with significant consequences.

The system includes a general system prompt that teaches the AI how to retrieve internal information from various sources. This prompt engineering approach helps ensure the agent does not hallucinate information and instead grounds its responses in actual data sources. The concern about the AI writing essays on Slack rather than providing factual answers reflects real-world experience with LLM behavior in production.

Different Slack channels can have customized prompts and behaviors to satisfy the needs of different teams, demonstrating flexibility in a multi-tenant internal deployment scenario. The bot supports calling specialized skills and sub-agents to improve response quality, suggesting a hierarchical agent architecture rather than a monolithic approach.

## Observability and Continuous Improvement

Duolingo implemented several mechanisms for monitoring and improving the Slack bot over time:

Feedback buttons allow users to upvote or downvote responses, creating a continuous feedback loop. This data is collected and analyzed across different channels, use cases, and throughout the company to understand performance patterns. This represents essential LLMOps practice: production AI systems require ongoing measurement and monitoring.

The team maintains a suite of evaluation tests to ensure the Slack app does not regress as they introduce new features or update underlying models. Approximately 20 evaluation test cases validate that the bot consistently returns correct answers. Critically, when users downvote answers, the team gradually adds those scenarios to the evaluation set, creating a virtuous cycle where real-world failures become automated regression tests. This approach to evaluation management is a best practice in LLMOps.

## Security and Privacy Considerations

Duolingo articulated clear principles for security and privacy that reflect mature thinking about AI agents in enterprise environments:

The bot should not serve as a mechanism to bypass existing permission structures. Non-engineers should not gain access to engineering tools through the AI agent. They implemented different access layers depending on user roles, ensuring the agent respects existing access controls.

The bot should not perform write operations without human approval, with the sole exception of responding in Slack threads. Any operation that modifies external state requires explicit human confirmation. This represents a pragmatic risk management approach.

The bot executes in a sandboxed VM environment without access to other resources on the machine, preventing exposure of sensitive credentials like MCP server authentication tokens. This demonstrates infrastructure security practices being applied to AI deployments.

The application should not function as a side channel between users. Individual message threads are sandboxed so that person A cannot use the bot to access information about person B's direct message interactions with the bot. This prevents privilege escalation and information leakage through the AI agent.

For privacy protection, Duolingo does not log any data from direct messages or private channels, recognizing that employees may share sensitive information with the bot in these contexts.

## Production Use Cases

The presentation included several concrete examples of the bot in production:

In help desk scenarios, when engineers reported issues with development tools like Cursor, the bot searched across internal Slack channels, internal documentation systems, and public internet sources to provide troubleshooting suggestions. This demonstrates retrieval-augmented generation capabilities spanning multiple data sources with appropriate access controls.

For incident response, when PagerDuty alerts triggered and on-call engineers were paged, the Slack bot automatically responded with diagnostic information. It executed commands in the background, queried observability tools including Grafana, Honeycomb, and Sentry, and provided root cause analysis along with suggested remediation steps. This represents significant value for reducing mean time to resolution in production incidents.

For write operations like addressing code review comments, the bot presented confirmation dialogs. Upon approval, it triggered Temporal workflows to create commits and open pull requests. Similar patterns applied to deployments to staging environments and Jira ticket creation.

## Adoption Metrics and Results

The adoption trajectory demonstrates successful deployment from an LLMOps perspective. When initially introduced in September 2025, the bot had approximately 20 weekly active users. By April 2026, this had grown to over 250 weekly active users, representing roughly 30% of Duolingo's workforce. While the presenter acknowledged this may not sound large in absolute terms, for a relatively small company like Duolingo, achieving 30% weekly penetration for an internal tool represents substantial success.

The upvote rate provides insight into quality improvements over time. As the team added more skills, refined prompts, and connected additional MCP servers, the upvote rate steadily improved, stabilizing around 80% by April 2026. The presenter acknowledged this is not perfect but clearly provides value to users. This metric-driven approach to measuring AI quality in production is essential LLMOps practice, and the 80% satisfaction rate represents realistic expectations rather than unrealistic promises of perfection.

## Open Source Contribution

Duolingo decided to open source the core application code of the Slack bot, making it available for other organizations using Slack and Claude Agent SDK to adapt. They explicitly encouraged organizations using different platforms to fork the code and use AI to create variants for their environments. This represents a contribution back to the broader LLMOps community.

## Critical Assessment

This case study demonstrates several LLMOps strengths and important lessons:

The iterative approach from individual experimentation to centralized documentation to infrastructure standardization to embedded workflows shows pragmatic evolution based on user feedback and adoption data. Duolingo recognized when technical solutions were insufficient and pivoted to user experience improvements.

The standardization effort represents significant infrastructure investment that would benefit the organization even beyond the Slack bot use case. Creating consistent HTTP-based MCP servers with standardized authentication reduces operational complexity and enables future innovations.

The security and privacy principles are well-considered and appropriate for enterprise AI deployments. The human-in-the-loop approach for write operations demonstrates mature risk management rather than uncritical enthusiasm for automation.

The evaluation strategy of maintaining regression tests and incorporating downvoted responses into test suites represents LLMOps best practices for continuous improvement.

However, there are areas where the presentation leaves questions unanswered:

The case study does not deeply discuss cost management for the Slack bot. With 250 weekly active users generating queries across 15+ MCP servers and potentially expensive LLM API calls, understanding cost structures and optimization strategies would be valuable.

Latency and performance characteristics are not discussed. For incident response use cases, response time is critical, and understanding how they optimized for acceptable latency would strengthen the case study.

The presentation does not discuss model selection, versioning, or how they handle model updates from Anthropic. As newer Claude models are released, understanding their change management process would be instructive.

Error handling and failure modes are not deeply explored. When MCP servers are unavailable or return errors, how does the bot behave? How do they ensure graceful degradation?

The claim of 80% upvote rate is positive but lacks context about what constitutes an upvote versus a downvote from users' perspectives, and whether different use cases have significantly different satisfaction rates.

Overall, this case study represents a realistic and mature approach to deploying LLM-based agents in production within an enterprise context, with appropriate attention to infrastructure standardization, security, monitoring, and continuous improvement.
