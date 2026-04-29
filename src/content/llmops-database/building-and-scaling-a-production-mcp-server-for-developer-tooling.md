---
title: "Building and Scaling a Production MCP Server for Developer Tooling"
slug: "building-and-scaling-a-production-mcp-server-for-developer-tooling"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "poc"
  - "prompt-engineering"
  - "token-optimization"
  - "agent-based"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "evals"
  - "semantic-search"
  - "redis"
  - "docker"
  - "scaling"
  - "microservices"
  - "api-gateway"
  - "monitoring"
  - "security"
  - "guardrails"
  - "langchain"
  - "fastapi"
  - "devops"
  - "orchestration"
  - "serverless"
  - "anthropic"
  - "openai"
  - "cloudflare"
industryTags: "tech"
company: "Github"
summary: "GitHub developed and scaled their Model Context Protocol (MCP) server to handle millions of tool calls per week, addressing critical challenges in context window management, tool selection, security, and agent performance. Starting with an open-source launch in April 2025, the team faced problems including context window bloat from over 100 tools, poor default user configurations, security vulnerabilities from plaintext token storage, and low tool call success rates. Their solutions included aggressive context optimization (achieving 49% initial reduction), OAuth 2.1 implementation with PKCE support, dynamic tool filtering based on permissions, stateless architecture with Redis session storage, and comprehensive evaluation frameworks. The result is a production system serving approximately 7 million tool calls weekly with over 95% success rate, supporting diverse user security postures while continuously optimizing for reduced token usage and improved agent effectiveness."
link: "https://www.youtube.com/watch?v=0n3MKk7r60w"
year: 2026
seo:
  title: "Github: Building and Scaling a Production MCP Server for Developer Tooling - ZenML LLMOps Database"
  description: "GitHub developed and scaled their Model Context Protocol (MCP) server to handle millions of tool calls per week, addressing critical challenges in context window management, tool selection, security, and agent performance. Starting with an open-source launch in April 2025, the team faced problems including context window bloat from over 100 tools, poor default user configurations, security vulnerabilities from plaintext token storage, and low tool call success rates. Their solutions included aggressive context optimization (achieving 49% initial reduction), OAuth 2.1 implementation with PKCE support, dynamic tool filtering based on permissions, stateless architecture with Redis session storage, and comprehensive evaluation frameworks. The result is a production system serving approximately 7 million tool calls weekly with over 95% success rate, supporting diverse user security postures while continuously optimizing for reduced token usage and improved agent effectiveness."
  canonical: "https://www.zenml.io/llmops-database/building-and-scaling-a-production-mcp-server-for-developer-tooling"
  ogTitle: "Github: Building and Scaling a Production MCP Server for Developer Tooling - ZenML LLMOps Database"
  ogDescription: "GitHub developed and scaled their Model Context Protocol (MCP) server to handle millions of tool calls per week, addressing critical challenges in context window management, tool selection, security, and agent performance. Starting with an open-source launch in April 2025, the team faced problems including context window bloat from over 100 tools, poor default user configurations, security vulnerabilities from plaintext token storage, and low tool call success rates. Their solutions included aggressive context optimization (achieving 49% initial reduction), OAuth 2.1 implementation with PKCE support, dynamic tool filtering based on permissions, stateless architecture with Redis session storage, and comprehensive evaluation frameworks. The result is a production system serving approximately 7 million tool calls weekly with over 95% success rate, supporting diverse user security postures while continuously optimizing for reduced token usage and improved agent effectiveness."
notion:
  pageId: "350f8dff-2538-804e-9396-f12f533248d6"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-28T14:21:00.000Z"
  lastEditedTime: "2026-04-29T13:55:00.000Z"
  publishedAt: "2026-04-29T14:06:14Z"
---

## Overview

GitHub's MCP (Model Context Protocol) server represents a significant production deployment of LLM tooling infrastructure, serving millions of tool calls weekly to enable AI agents to interact with GitHub's platform. The case study, presented at AI Engineer Europe, details the engineering team's journey from initial open-source release in April 2025 through a year of production operation, optimization, and scaling challenges. Led by Sam and his development team, the project demonstrates real-world LLMOps challenges around context management, security, evaluation, and user experience in agentic systems.

The GitHub MCP server became the most starred repository on GitHub during its launch week, attracting significant public contributions that rapidly expanded platform coverage. However, this initial success revealed fundamental challenges in how LLM agents interact with large tool sets in production environments, forcing the team to develop sophisticated solutions for context optimization, security, and operational reliability.

## Context Window Management and Tool Selection Challenges

One of the most significant production challenges GitHub encountered was context window bloat. After approximately one month of feature additions and community contributions, the server supported over 100 tools covering repositories, issues, pull requests, actions, projects, and other GitHub platform features. Rather than improving agent performance, this expansion actually degraded agent capabilities. Agents became confused and forgetful, with context windows filling up too quickly to be effective.

This observation aligned with research published by LangChain in February 2025, which demonstrated that simply adding more tools to an agent's context doesn't improve performance and often makes it worse. The problem wasn't tools themselves but rather the approach of dumping large amounts of tool context directly into the LLM's context window without intelligent filtering or selection mechanisms.

The challenge was particularly acute for GitHub because of the platform's expansive surface area and diverse user base. Different users needed different subsets of tools, and the team didn't want to prevent users from accessing functionality they actually needed. The solution couldn't be simply reducing the total number of tools available.

The team's initial attempts to address this included several approaches. They introduced "tool sets," which grouped related product tools together, allowing users to configure which groups they wanted to enable. They also implemented dynamic tool selection, where agents could discover sets of tools and activate them in chunks as needed. An experimental RAG-based version was also developed for semantic tool search and discovery, though it was never released.

However, these solutions shared a critical flaw: they all required users to actively configure their setup. In practice, the vast majority of users simply used default settings and never customized their tool selections. This highlighted a fundamental LLMOps challenge—elegant technical solutions are ineffective if they require users to understand and modify configuration files.

The team ultimately pursued aggressive context optimization focused on what the default experience would be. By analyzing actual usage patterns on their remote server, they identified opportunities to focus tools more specifically on general use cases, achieving approximately 49% reduction in initial context load. They subsequently grouped CRUD (Create, Read, Update, Delete) operations together, bringing the default configuration down to around 40 tools with options to expand or contract based on preference.

Beyond reducing the number of tools, the team also focused heavily on reducing output tokens from individual tool calls. For example, by carefully tailoring what information is returned from the "list pull requests" tool, they achieved over 75% reduction in output tokens for that specific operation. This demonstrates that token optimization in production LLM systems requires attention to both input context (tool descriptions) and output verbosity (tool responses).

The team emphasizes that token usage remains a moving target with constant improvements being deployed. The server's token consumption characteristics can change significantly over just a few months of operation, requiring ongoing monitoring and optimization.

## Tool Call Success Rates and Intent Encoding

Beyond context management, GitHub focused intensively on improving tool call success rates. Through data analysis of production usage, they identified that many tool failures were preventable through better server-side design rather than expecting agents to handle complex multi-step operations.

The team achieved over 95% success rate for tool calls, though they acknowledge that not all failures are preventable. Agents don't necessarily know which repositories they have write permissions for, and hallucination remains an inherent challenge with LLM-based systems.

A key insight was encoding agent intent into the tool surface itself. Rather than exposing low-level APIs that require agents to make multiple sequential calls with proper error handling, the server performs more complex operations internally. For example, an operation that might require five separate GitHub API calls to handle edge cases and be robust is exposed as a single tool to the agent. This approach saves round trips, reduces context consumption, improves reliability, and creates a massively better user experience by making agents more successful at completing tasks.

This represents an important LLMOps pattern: abstracting complexity away from the agent layer and into server-side implementations where traditional software engineering practices can ensure reliability.

## Evaluation and Testing Approaches

GitHub runs comprehensive evaluations on their MCP server, with detailed methodology described in a blog post by team member Senior. The evaluation approach focuses on testing tools against each other rather than micro-optimizing individual tool descriptions in isolation.

The key insight is that individual tools don't exist in isolation—they exist in a pool where they compete for agent attention. A tool description optimized to ensure the agent always calls that tool is actually terrible in practice, as is the opposite extreme where the tool is never called. The goal is finding the right balance where tools are called at appropriate times and not called at inappropriate times, relative to other available tools.

This inter-tool evaluation approach represents a more sophisticated view of LLMOps testing than simple unit testing of individual components. It recognizes that agent behavior emerges from the interaction of all available tools and requires holistic evaluation methodologies.

## Security Challenges and OAuth Implementation

Security emerged as a constant concern throughout the MCP server's production operation. A significant portion of users were storing plaintext access tokens for MCP connections, typically in locations accessible to agents. These tokens were frequently long-lived, often over-privileged for the actual use case, and represented significant security vulnerabilities waiting to be exploited.

The team notes that end users aren't necessarily choosing this insecure approach—rather, it's genuinely difficult to make configuration both easy and secure simultaneously. Client implementations need to make use of system keyrings or encrypted storage mechanisms, as VS Code does, but not all clients provide these capabilities.

The MCP specification provided a better approach through remote HTTP with OAuth support. GitHub embraced this from April 2025 onward, making secure connections the path of least resistance. Their remote server supports OAuth 2.1, and the team even contributed to GitHub's authorization server by helping add Proof Key for Code Exchange (PKCE) support to improve security posture for client applications.

However, OAuth adoption faced its own challenges. Many users expected GitHub to support dynamic client registration, which the team ultimately rejected after careful consideration. Dynamic client registration would create unbounded growth in the application database, challenges around rate limit bucketing, and lack of reliable app identity. GitHub concluded this was a well-intentioned but problematic feature, and they're not the only authorization server to reject it.

The MCP specification itself evolved toward client ID metadata as an alternative approach, and the GitHub team is working toward supporting this to make authentication significantly easier while maintaining security.

GitHub also leverages OAuth for dynamic tool filtering based on permissions. When users authenticate with a Personal Access Token (PAT), the server immediately filters available tools based on the token's scopes without requiring any user configuration. For OAuth flows, they support "step-up OAuth" where the server can return a scope challenge, interactively asking users if they want to grant additional permissions. This allows users to start with minimal permissions and only grant additional access when actually needed, avoiding tool call failures while maintaining security.

This step-up approach was initially developed in collaboration with VS Code, which wanted to use its existing GitHub token but needed a mechanism to request additional permissions when necessary rather than simply failing or requiring a completely separate authentication flow.

For server tokens used in GitHub Actions and similar contexts without a specific user identity, GitHub removes user-specific tools entirely, eliminating constant sources of failure and wasted context.

## Prompt Injection and Exfiltration Attacks

The security discussion wouldn't be complete without addressing prompt injection attacks. Invariant Labs published a correctly executed prompt injection exfiltration attack demonstrating how private data could be extracted from GitHub through MCP server interactions. While the attack specifically called out GitHub's MCP server, the team notes this vulnerability applies to almost every agent setup regardless of whether they use MCP or specifically GitHub's implementation.

The attack leverages what has been termed the "lethal trifecta" of agent capabilities—reading private data, following external instructions, and communicating with external systems. The fundamental utility of agents directly conflicts with protecting against these attacks, and the problem remains unsolved across the industry.

GitHub faces particular challenges because their user base has wildly different risk profiles. Some users operate air-gapped GitHub Enterprise Server instances in highly secure environments, while others run the MCP server with full token access to all their repositories. The team's approach is to support these diverse use cases and security postures while everyone experiments with agentic systems, acknowledging that this remains an active research area without definitive solutions.

## Production Architecture and Scaling

GitHub runs a completely stateless server architecture, using Redis for session storage along with standard observability and deployment stack components. This differs significantly from many MCP server implementations that run as stateful, singular processes, and the team addressed questions from the community about how to achieve this architecture.

One particularly interesting implementation detail is that GitHub creates a brand new server instance (in the SDK sense) on every single request. Tools are dynamically added to each instance at startup based on the user's configuration and permissions. This approach enables dynamic behavior where users receive exactly the tools they've requested or are permitted to use based on policies.

The stateless architecture enables horizontal scaling without session affinity requirements. The team uses session storage primarily to identify the self-reported client identity that comes through MCP, which helps them understand what clients users are employing to connect to the server—valuable data for prioritizing client-specific optimizations and compatibility.

This architecture currently serves approximately 7 million tool calls per week (approaching 8 million based on recent trends), demonstrating that stateless, dynamically-configured MCP servers can scale to significant production workloads.

## Experimentation and Insider Features

GitHub maintains an "Insiders mode" that enables experimental features for users who opt in. This provides a safe channel for deploying and testing new capabilities with willing early adopters before general release.

One example feature in Insiders mode is MCP apps, which enable human-in-the-loop workflows. For instance, when an agent drafts a GitHub issue, the system can present a UI for the user to edit the AI-generated content before posting. This addresses concerns from users working in professional open-source environments who want to ensure their contributions appear genuinely human-authored rather than potentially being closed as bot-generated spam.

The speaker initially wasn't certain about the value of this human-in-the-loop approach but came to appreciate it significantly in practice, particularly for users who care about how their issues and communications are received by the community.

## Future Directions and Industry Trends

Looking forward, GitHub anticipates several evolutionary directions for MCP and agent tooling. Server discovery should become automatic rather than requiring manual configuration. Tool use will likely become more compositional, with patterns like bash-style piping of tool outputs into other tools, or streaming data through tool chains.

Approaches like Cloudflare's "code mode" and Anthropic's tool search API (recently added to Claude) represent the direction of the industry. OpenAI has also added similar API capabilities. The team expects that having thousands of tools available will become normal in the near future as the industry irons out the problems that currently prevent effective use of large tool sets.

Interestingly, this suggests GitHub may reverse some of their earlier decisions to reduce tool counts, once better mechanisms for tool selection and context management are standardized. The goal is that users won't even need to know what MCP is—they'll simply convey what they want to accomplish, and OAuth setup, tool selection, and other technical details will become truly autonomous.

The team also encourages experimentation with novel client implementations, noting that frameworks like Pi enable building specialized clients that might optimize agent interactions in breakthrough ways. The rapidly evolving space means experimental approaches could potentially become the next major advancement in agentic systems.

## Impact and Adoption Metrics

The GitHub MCP server has achieved significant adoption across multiple dimensions. The standard IO server has over 11 million Docker downloads, though this isn't even the most commonly used version. The project has 126 contributors, over 2,300 issues and pull requests (averaging over seven per day for more than a year), nearly 4,000 forks, and almost 30,000 stars on GitHub.

The speaker expressed particular curiosity about what unusual implementations exist in those thousands of forks that haven't been contributed back to the main project, representing potentially valuable experimentation happening in the community.

The volume of issues and PRs represents a new challenge for open-source maintenance at this scale, with traffic showing no signs of slowing down. The team welcomes continued community engagement while acknowledging that managing this level of activity represents genuinely new territory for developer tooling projects.

## Balanced Assessment

While the presentation demonstrates impressive engineering achievements and production metrics, it's important to note this was presented by GitHub's development team at a conference, and some claims should be considered in that context. The 95% success rate and 7 million weekly tool calls represent significant achievements, but we don't have independent verification or comparison benchmarks with alternative approaches.

The rejection of dynamic client registration, while technically justified, does create friction for users and reflects ongoing industry debates about the right balance between security, ease of use, and operational complexity. The OAuth approach, while more secure, clearly faces adoption challenges given the continued prevalence of plaintext token usage.

The unsolved nature of prompt injection attacks and the acknowledgment that agent utility fundamentally conflicts with certain security goals demonstrates honest assessment of current limitations. This is an active area where the industry lacks definitive solutions, and GitHub's approach of supporting diverse risk profiles while users experiment is pragmatic but doesn't solve the underlying security challenges.

The observation that most users never change default configurations represents a genuine UX challenge that affects the entire MCP ecosystem, not just GitHub's implementation. While GitHub has optimized their defaults extensively, the fundamental tension between providing comprehensive functionality and avoiding overwhelming users with choices remains unresolved.

Overall, this case study provides valuable insights into real-world LLMOps challenges around context management, security, evaluation, and scaling for agent tooling, while honestly acknowledging ongoing challenges and areas where the industry is still developing best practices.
