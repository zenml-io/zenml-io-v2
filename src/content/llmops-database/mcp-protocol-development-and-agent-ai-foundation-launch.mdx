---
title: "MCP Protocol Development and Agent AI Foundation Launch"
slug: "mcp-protocol-development-and-agent-ai-foundation-launch"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6951096ce829454783f01133"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-28T10:51:50.733Z"
  createdOn: "2025-12-28T10:41:48.383Z"
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "data-analysis"
  - "document-processing"
  - "question-answering"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "error-handling"
  - "human-in-the-loop"
  - "a2a"
  - "mcp"
  - "kubernetes"
  - "docker"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "orchestration"
  - "microservices"
  - "fastapi"
  - "redis"
  - "cache"
  - "postgresql"
  - "anthropic"
  - "openai"
  - "google-gcp"
  - "microsoft-azure"
  - "amazon-aws"
  - "meta"
  - "hugging-face"
industryTags: "tech"
company: "Anthropic / OpenAI / Goose"
summary: "This podcast transcript covers the one-year journey of the Model Context Protocol (MCP) from its initial launch by Anthropic through to its donation to the newly formed Agent AI Foundation. The discussion explores how MCP evolved from a local-only protocol to support remote servers, authentication, and long-running tasks, addressing the fundamental challenge of connecting AI agents to external tools and data sources in production environments. The case study highlights extensive production usage of MCP both within Anthropic's internal systems and across major technology companies including OpenAI, Microsoft, and Google, demonstrating widespread adoption with millions of requests at scale. The formation of the Agent AI Foundation with founding members including Anthropic, OpenAI, and Block represents a significant industry collaboration to standardize agentic system protocols and ensure neutral governance of critical AI infrastructure."
link: "https://www.youtube.com/watch?v=z6XWYCM3Q8s"
year: 2025
seo:
  title: "Anthropic / OpenAI / Goose: MCP Protocol Development and Agent AI Foundation Launch - ZenML LLMOps Database"
  description: "This podcast transcript covers the one-year journey of the Model Context Protocol (MCP) from its initial launch by Anthropic through to its donation to the newly formed Agent AI Foundation. The discussion explores how MCP evolved from a local-only protocol to support remote servers, authentication, and long-running tasks, addressing the fundamental challenge of connecting AI agents to external tools and data sources in production environments. The case study highlights extensive production usage of MCP both within Anthropic's internal systems and across major technology companies including OpenAI, Microsoft, and Google, demonstrating widespread adoption with millions of requests at scale. The formation of the Agent AI Foundation with founding members including Anthropic, OpenAI, and Block represents a significant industry collaboration to standardize agentic system protocols and ensure neutral governance of critical AI infrastructure."
  canonical: "https://www.zenml.io/llmops-database/mcp-protocol-development-and-agent-ai-foundation-launch"
  ogTitle: "Anthropic / OpenAI / Goose: MCP Protocol Development and Agent AI Foundation Launch - ZenML LLMOps Database"
  ogDescription: "This podcast transcript covers the one-year journey of the Model Context Protocol (MCP) from its initial launch by Anthropic through to its donation to the newly formed Agent AI Foundation. The discussion explores how MCP evolved from a local-only protocol to support remote servers, authentication, and long-running tasks, addressing the fundamental challenge of connecting AI agents to external tools and data sources in production environments. The case study highlights extensive production usage of MCP both within Anthropic's internal systems and across major technology companies including OpenAI, Microsoft, and Google, demonstrating widespread adoption with millions of requests at scale. The formation of the Agent AI Foundation with founding members including Anthropic, OpenAI, and Block represents a significant industry collaboration to standardize agentic system protocols and ensure neutral governance of critical AI infrastructure."
---

## Overview and Context

This case study provides a comprehensive look at the Model Context Protocol (MCP) development journey and its productionization across major AI companies. The transcript features David Sorya (MCP creator and Anthropic engineer), Nick Cooper (OpenAI protocol lead), Brad from Block (Goose creator), and Jim Zemlin (Linux Foundation CEO) discussing the technical evolution of MCP and the formation of the Agent AI Foundation in late 2025.

MCP emerged from a practical problem within Anthropic: how to enable a rapidly growing company to build AI integrations without the development tooling team becoming a bottleneck. The protocol was designed from the start to allow teams to build their own MCP servers for connecting AI models to various data sources and tools. This internal need drove the initial architecture decisions and continues to inform development priorities.

## Production Usage and Scale

The production deployment of MCP at major technology companies represents one of the most significant aspects of this case study. Anthropic extensively dogfoods MCP through an internal gateway system where employees can deploy MCP servers with simple commands that launch containers in a Kubernetes cluster. The gateway handles authentication integration with internal identity providers, allowing teams across the company to build and deploy their own integrations without deep infrastructure knowledge.

The scale of production usage is substantial, with companies like Google and Microsoft running MCP at millions of requests. This production volume has revealed critical scalability challenges, particularly around state management when horizontally scaling servers across multiple pods. The original design assumed some degree of statefulness between client and server, which works well for single-server deployments but becomes problematic when requests might hit different server instances. This typically requires shared state solutions like Redis or memcache, which adds operational complexity at massive scale.

Internal use cases at Anthropic span a wide range of applications. Teams have built MCP servers for Slack integration (allowing Claude to summarize Slack messages), internal survey data analysis, and various other data sources. The Turkish Airlines team built an MCP server for flight search. These real-world applications demonstrate both the flexibility of the protocol and the organic adoption pattern where different teams solve their own integration needs.

## Protocol Evolution and Technical Architecture

MCP underwent four major spec releases in its first year, each addressing critical production needs. The initial release focused on local-only connections using standard IO, which worked well for desktop applications like Claude Desktop but was limited in scope.

The March/May release introduced remote MCP servers via HTTP streaming and the first iteration of OAuth authentication. This was the number one requested feature from the community. However, the initial authentication design had a significant flaw: it combined the authentication server and resource server into a single entity (the MCP server). This worked for startups building public servers tied to their own accounts but proved unworkable for enterprises that use centralized identity providers (IDPs). Enterprise employees authenticate with a central IDP (like Google for Work) and then access multiple services. The protocol needed to separate these concerns.

The June specification fixed this authentication architecture by properly separating the authentication server from the resource server, following OAuth best practices. The MCP server became a pure resource server, while token acquisition could happen through standard enterprise IDP flows. This involved working with industry-leading OAuth experts to ensure the design would work for enterprise deployments. The redesign also incorporated dynamic client registration and other OAuth features to support enterprise security requirements.

The transport layer design represents an ongoing technical challenge. MCP needs to support both simple use cases (single tool calls) and complex scenarios (bidirectional streaming for agent-to-agent communication). The team chose "streamable HTTP" as a middle ground that retains the stateful properties needed for agents while remaining compatible with standard HTTP infrastructure. However, optional features like return streams from servers to clients have seen minimal adoption because clients implement only the minimum viable functionality. Features like elicitations and sampling remain underutilized because the bidirectional stream isn't commonly opened.

Recent meetings with senior engineers from Google, Microsoft, AWS, Anthropic, and OpenAI have focused on addressing these transport challenges. The goal is to support both simple REST-like patterns for basic servers while enabling full bidirectional streaming for complex agent interactions, all while maintaining horizontal scalability. The solution needs to avoid forcing all implementations to manage complex state while still supporting advanced use cases.

## Long-Running Tasks and Asynchronous Operations

The most recent major addition to MCP is support for long-running tasks, introduced in late 2025. This feature addresses a critical need for production agent systems: operations that take hours or even days to complete, such as deep research tasks or complex multi-step agent workflows. Prior to this, developers awkwardly tried to implement asynchronous operations using synchronous tool calls, requiring models to understand polling patterns and creating suboptimal user experiences.

The task design follows classic operating system patterns: clients create tasks, poll for completion, and retrieve results. The initial implementation supports client polling, with planned optimization to add server-initiated notifications via webhooks or similar mechanisms when tasks complete. This avoids holding HTTP connections open for extended periods while still providing the asynchronous operation semantics needed for real agent systems.

Importantly, tasks aren't just asynchronous tool calls—they're designed as a generic container concept that can eventually expose intermediate results, tool chains, and other metadata about the operation. This enables use cases like exposing an entire coding agent (like Claude Code) as an MCP server that can report its progress and reasoning steps. The architecture intentionally leaves room for future extensions beyond simple asynchronous execution.

## Context Management and Progressive Discovery

A recurring challenge in production MCP deployments is context window management. When an MCP connection opens access to many tools, naively adding all tool descriptions to the context window creates significant bloat—analogous to dumping all documentation markdown files into the prompt. The solution adopted is progressive discovery, where the model receives high-level information and can request more details as needed.

Progressive discovery works with any tool-calling model but improves dramatically when models are specifically trained for this pattern. Anthropic trains their models on the MCP Atlas (a large collection of real-world MCP servers) to optimize for discovering and using tools efficiently. This demonstrates an important interplay between protocol design and model training: the protocol enables certain patterns, and model training optimizes for those patterns, but the fundamental capability exists independent of training.

The concept of "code mode" or "programmatic MCP" represents another optimization strategy. Instead of having models make individual tool calls with results returned to inference, models can generate code that composes multiple API calls together, which executes in a sandbox and returns a final result. This significantly reduces token usage and latency for multi-step operations. Critically, this is purely an optimization—the value of MCP (authentication, discoverability, self-documentation) remains unchanged. Applications can choose whether to expose tools directly to models or let models generate code that uses the tools.

## Registry Architecture and Discovery

The MCP ecosystem includes multiple registry approaches, reflecting different trust and curation needs. The official registry launched by Anthropic and GitHub serves as the equivalent of npm or PyPI—a public registry where anyone can publish MCP servers. This creates the same challenges as any public package registry: supply chain security, trust, and discoverability.

The solution architecture involves "subregistries" that filter and curate the official registry. Companies like Smithery build curated registries that reference the official registry but add their own trust and authentication layers. Enterprises can run internal registries that speak the same API but contain only approved servers, possibly combining internal and curated external servers.

This registry architecture enables a key vision for agent systems: models should be able to auto-select appropriate MCP servers from a registry, install them, and use them for given tasks. This requires standardized registry interfaces and trust mechanisms. Ideas under consideration include distributed code signing where multiple model providers sign server descriptions they've validated, allowing clients to make trust decisions based on multiple signatures.

In practice, the most promising near-term use case is internal enterprise registries where implicit trust exists. Companies already use private package registries for npm and PyPI dependencies; MCP registries follow the same pattern. When John Welsh from Anthropic presents internal infrastructure, he describes a gateway where deploying an MCP server automatically registers it in an internal registry.

## Skills vs MCP: Complementary Abstractions

A significant portion of the discussion addresses the relationship between MCP and Skills (another Anthropic technology). The key insight is that they solve orthogonal problems: Skills provide domain knowledge and behavioral guidance (how should the model behave as a data scientist, accountant, or engineer), while MCP provides connectivity to external actions and data sources.

Skills can contain code and scripts that take actions, but this requires an execution environment and doesn't provide authentication or external maintainability. If a third party improves their MCP server, all clients benefit automatically. With skills, the code is fixed in the skill definition. The most effective pattern combines both: using skills to organize different roles or capabilities (the accountant, the engineer, the data scientist) and MCP servers to connect these skills to actual company data sources.

The architectural question of where MCP clients live in a skills-based system remains open to experimentation. A shared MCP client across all skills enables better discovery, connection pooling, and automatic registry lookup (finding appropriate MCP servers based on skill needs). However, individual MCP clients per skill also work. The shared approach appears more promising for enabling advanced features.

## MCP UI/Apps: Beyond Text Interfaces

The recent introduction of MCP UI (being standardized as MCP Apps across Anthropic, OpenAI, and other implementations) addresses a fundamental limitation of text-based agent interfaces. Certain interactions are poorly suited to text: seat selection for flights, theater booking, shopping experiences with years of UX optimization, or music production interfaces. These domains benefit from rich visual interfaces that both models and humans can interact with.

The technical implementation uses iframes serving raw HTML over MCP resources. The iframe communicates with the parent application via postMessage, providing security isolation. Serving raw HTML (rather than loading external content) allows security analysis before rendering and avoids many CORS issues, though some styling and integration challenges remain unsolved. Designers and brand-conscious companies care deeply about visual consistency—whether an MCP app should look like ChatGPT when running in ChatGPT or maintain its own branding is an open question.

MCP Apps represent an extension to core MCP rather than a required feature. CLI-based agents will never implement it, while graphical applications may choose to. This reflects a broader principle: MCP provides baseline functionality with optional extensions for specific client capabilities.

## Enterprise and Industry-Specific Requirements

Production deployment in financial services revealed requirements not apparent in general software development. Financial data often comes from third parties with legal contracts requiring attribution—clients must display data source information when showing data to users. This isn't negotiable; it's legally enforced. Such requirements don't fit naturally into standard AI model interactions but are critical for real-world deployment.

These discoveries led to the formation of industry-specific interest groups, with Bloomberg heading the financial services group. The goal is defining requirements that MCP clients must meet to connect to financial services MCP servers. Similar patterns will likely emerge for healthcare (HIPAA compliance), where servers might require that clients disable other MCP servers during sessions to ensure sensitive data doesn't leak to other services.

The protocol's prescriptive nature helps here: MCP specifies that authentication must use OAuth, providing a standard framework for enterprises to extend with their own requirements. This contrasts with REST APIs, which provide no authentication guidance, and other protocols that are less opinionated about specific layers.

## Foundation Governance and Open Source Strategy

The formation of the Agent AI Foundation represents a significant shift in AI protocol governance. Anthropic, OpenAI, and Block collaborated to create a neutral home for MCP and future agentic protocols, hosted under the Linux Foundation as a directed fund. The founding included major technology companies (Google, Microsoft, Amazon, Bloomberg, Cloudflare) as platinum members, demonstrating industry-wide commitment.

The governance structure carefully separates technical decision-making from financial governance to avoid pay-to-play dynamics. Technical decisions remain with maintainers and a core committee, while the foundation manages IP ownership, legal compliance, infrastructure, and community building. David Sorya continues as lead core maintainer of MCP with an eight-person core maintainer group that makes final decisions, though they actively incorporate community input.

The foundation serves multiple purposes beyond IP neutrality. It provides a forum for collaboration between competitive companies, enables resource pooling for events and infrastructure, and signals to enterprises that protocols won't be proprietized. The Linux Foundation provides decades of experience running collaborative open source projects, handling everything from legal frameworks to community platforms (hosting 50,000+ virtual meetings annually and being Slack's largest user).

Principles for accepting new projects emphasize demonstrated adoption, strong maintenance, and complementarity with existing projects. The foundation wants to avoid becoming a "dumping ground" for speculative projects. Projects should have found their niche and proven value before joining. The composability principle emphasizes Lego-like building blocks that work together rather than overlapping competing solutions.

## Production Monitoring and Developer Experience

The Linux Foundation provides participating projects with comprehensive platforms for monitoring community health: development velocity, contributor growth, social media sentiment, leading adoption indicators, and security practices. These tools help maintainers understand their community and improve commercially relevant practices, enabling the positive feedback loop of adoption driving investment in development, which drives better products and more adoption.

For MCP specifically, making deployment as simple as possible remains a priority. Ideal infrastructure allows single-command deployment of standard IO servers that automatically become HTTP streaming servers with authentication. Platforms like fast MCP (by Jeremiah) and internal enterprise solutions using gateways like LiteLLM demonstrate various approaches. Enterprises often prefer building custom infrastructure for security control, while startups may use hosted solutions.

The developer experience extends beyond deployment to testing and validation. The protocol's requirement for demonstrated utility before standardization ensures changes solve real problems. The core committee's most common response to proposals is "have you tried it out? Does it work?" This requires collaborators and concrete implementations like Goose and various clients to meaningfully validate protocol changes.

## Future Directions and Challenges

Several unresolved challenges emerged in the discussion. Sampling (allowing MCP servers to call back to the model during operations) remains underutilized, partly because clients don't support the bidirectional streams needed and partly because remote servers often prefer bundling SDKs for full control. Sampling shows more promise in local deployments where MCP ships to many users with unknown model configurations.

The transport layer continues to evolve toward supporting both simple stateless operations and complex bidirectional streaming while maintaining horizontal scalability. This requires rethinking assumptions about state management and possibly introducing new primitives that work naturally in distributed environments.

Agent-to-agent communication represents a frontier area. Long-running tasks provide some infrastructure for this, but the full vision of autonomous agents working together asynchronously remains partially realized. The industry needs to move beyond synchronous chat-style interactions where users approve each step toward agents that work in the background and report results.

Context management strategies continue evolving beyond basic compaction. Future approaches might include small models deciding what context to retain, better training for understanding context relevance, or entirely new techniques. The key insight is that MCP solves how to obtain context, while applications and models determine how to select and manage it.

## Production Lessons and Industry Impact

The case study reveals several critical lessons for LLMOps practitioners. First, protocols designed for AI agents face unique challenges compared to traditional API protocols. The need to support both simple and complex patterns while enabling model-driven discovery creates tension between simplicity and functionality. Making advanced features optional often means they go unused, but making everything required increases complexity for basic use cases.

Second, internal dogfooding proves essential for protocol development. Anthropic's extensive internal use of MCP reveals scalability issues, authentication problems, and feature needs that wouldn't emerge from limited testing. The gateway architecture enabling easy deployment for internal teams creates rapid iteration cycles and diverse use cases.

Third, enterprise requirements differ substantially from startup or developer needs. Authentication architectures that work for small deployments fail at enterprise scale. Industry-specific compliance (financial services attribution, healthcare HIPAA) requires protocol extensions beyond initial designs. Engaging with enterprises early reveals these requirements before they become blockers.

Fourth, the interplay between protocol design and model training creates opportunities for optimization. Progressive discovery, code mode, and other patterns work with any tool-calling model but improve dramatically when models train specifically for these patterns. Protocol designers benefit from close collaboration with model developers.

Finally, neutral governance matters for protocol adoption. Major companies invested in MCP partly because Anthropic committed to open governance through the foundation. This mirrors historical patterns in internet protocols and cloud native computing—protocols owned by single entities face adoption barriers regardless of technical merit. The rapid formation of the Agent AI Foundation with major industry players demonstrates the value of neutrality.

The scale of adoption—millions of production requests, deployment across tech giants, hundreds of community-built servers—validates MCP's approach to agent connectivity. The challenges encountered and ongoing evolution demonstrate that building protocols for production AI systems requires continuous iteration, broad collaboration, and willingness to revise designs based on real-world usage. The formation of the Agent AI Foundation provides the governance structure needed for this collaborative development model to continue as the technology matures.