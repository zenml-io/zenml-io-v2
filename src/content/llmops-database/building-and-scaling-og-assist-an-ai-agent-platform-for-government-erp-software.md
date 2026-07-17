---
title: "Building and Scaling OG Assist: An AI Agent Platform for Government ERP Software"
slug: "building-and-scaling-og-assist-an-ai-agent-platform-for-government-erp-software"
draft: false
llmopsTags:
  - "customer-support"
  - "code-generation"
  - "data-analysis"
  - "poc"
  - "prompt-engineering"
  - "few-shot"
  - "human-in-the-loop"
  - "memory"
  - "harness-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "a2a"
  - "evals"
  - "cicd"
  - "monitoring"
  - "documentation"
  - "open-source"
  - "anthropic"
  - "google-gcp"
industryTags: "government"
company: "OpenGov"
summary: "OpenGov, a company providing ERP software for government organizations, built OG Assist, an AI agent-powered assistant integrated across all their product suites including budgeting, procurement, asset management, and permitting. The solution involved developing a custom Effect-based agent loop with comprehensive tooling for observability, evaluation, sandboxing, and human-in-the-loop controls to safely execute actions across their platform. The system enables natural language interactions with government ERP data and workflows, supports dynamic UI generation, and has been successfully deployed in production with feedback collection mechanisms and automated evaluation pipelines."
link: "https://www.youtube.com/watch?v=4uFVSLgD2Q4&list=PLcfpQ4tk2k0V1LNigteMgExP1rb4Hy8wn&index=10"
year: 2026
seo:
  title: "OpenGov: Building and Scaling OG Assist: An AI Agent Platform for Government ERP Software - ZenML LLMOps Database"
  description: "OpenGov, a company providing ERP software for government organizations, built OG Assist, an AI agent-powered assistant integrated across all their product suites including budgeting, procurement, asset management, and permitting. The solution involved developing a custom Effect-based agent loop with comprehensive tooling for observability, evaluation, sandboxing, and human-in-the-loop controls to safely execute actions across their platform. The system enables natural language interactions with government ERP data and workflows, supports dynamic UI generation, and has been successfully deployed in production with feedback collection mechanisms and automated evaluation pipelines."
  canonical: "https://www.zenml.io/llmops-database/building-and-scaling-og-assist-an-ai-agent-platform-for-government-erp-software"
  ogTitle: "OpenGov: Building and Scaling OG Assist: An AI Agent Platform for Government ERP Software - ZenML LLMOps Database"
  ogDescription: "OpenGov, a company providing ERP software for government organizations, built OG Assist, an AI agent-powered assistant integrated across all their product suites including budgeting, procurement, asset management, and permitting. The solution involved developing a custom Effect-based agent loop with comprehensive tooling for observability, evaluation, sandboxing, and human-in-the-loop controls to safely execute actions across their platform. The system enables natural language interactions with government ERP data and workflows, supports dynamic UI generation, and has been successfully deployed in production with feedback collection mechanisms and automated evaluation pipelines."
notion:
  pageId: "38ef8dff-2538-8032-ac08-f69b37c753e2"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-29T14:53:00.000Z"
  lastEditedTime: "2026-06-29T14:53:00.000Z"
  publishedAt: "2026-07-01T19:43:01Z"
---

## Overview

OpenGov built and deployed OG Assist, an AI agent system integrated across their entire suite of government ERP software products. OpenGov sells ERP software to government organizations, covering areas like budgeting, procurement, asset management, utility billing, and permitting. The company was founded approximately 14 years ago and has made AI agents a central part of their product strategy.

OG Assist appears as a button in the navigation bar across all OpenGov product suites. When users click this button, they can interact with an AI agent that has access to product-specific tools and skills. For example, in the utility billing product, the agent can answer questions about rate codes and look up information against data within that suite. All product teams at OpenGov have contributed by building tools and skills to power this unified agent interface, creating a first-party integrated experience across their platform.

The case study provides detailed insights into how OpenGov architected, deployed, and maintains this agent system in production, covering everything from their core agent loop implementation to evaluation strategies and safety mechanisms.

## Architecture and Technology Stack

OpenGov made a significant architectural decision to build their agent infrastructure on Effect, a library for TypeScript that helps write better structured code. Effect provides schema validation similar to Zod, error handling, logging, and distributed tracing capabilities built-in. This choice has reportedly paid dividends for the team in terms of code quality, architecture, and development velocity.

Initially, the team started with LangGraph, which worked adequately in the early stages. However, as the team scaled and use cases evolved, they made the strategic decision to migrate to a custom Effect-native agent loop. This migration gave them complete control over the agent execution flow, which proved essential for implementing complex features and use cases specific to their needs. The full control also meant they could leverage all of Effect's capabilities throughout the entire agent loop, including structured concurrency, fine-grained logging, and comprehensive tracing.

The core of their agent loop uses the Effect AI package, which provides chat and language model abstractions. They use a stream text function that can accept prompts and stream responses. The architecture uses dependency injection for the language model, which allows them to hot-swap different models without changing the core loop logic. This design provides flexibility in model selection and future-proofs their infrastructure against changes in the LLM landscape.

## Protocol and Standards

OpenGov adopted the agent-to-agent protocol developed by Google as a foundation for their system architecture. While this protocol is designed for agents to intercommunicate, OpenGov found it particularly valuable for defining their agent routes and modeling their backend schema. The protocol includes specifications like agent cards, which contain the agent's name, description, and other metadata. Following this rigorous specification helped drive development and ensured alignment between frontend and backend teams, as both could rely on a shared contract for what agents would consume and produce.

The A2A protocol also offers extensibility through various extensions, including metadata additions and A2UI for user interface interactions. This standardization choice appears to have accelerated development by providing clear contracts and reducing integration friction across teams.

## Tools and Skills Framework

A core architectural principle at OpenGov is that "tools and skills are really all you need." The team built a comprehensive framework for defining tools using Effect's patterns. Tools are defined with clear schemas and bundled into toolkits, which are collections of related tools. These toolkits are then registered with the language model, making them available for the agent to invoke during conversations.

The example shown involves a simple tool for retrieving dad jokes, but the pattern scales to complex domain-specific tools. Each product suite at OpenGov has built tools and skills specific to its domain. For instance, the utility billing product has tools for looking up rate codes and querying billing data. This distributed approach to tool development allows product teams to extend OG Assist's capabilities within their domain while maintaining a unified agent experience.

The tools framework enables the agent to take actions like querying databases, looking up information, and even highlighting elements on the screen for users. The agent can analyze what's visible on the page and suggest next steps, demonstrating multimodal capabilities and integration with the frontend.

## Safety and Human-in-the-Loop Controls

OpenGov implemented multiple safety mechanisms to ensure their agent system operates responsibly in production. A key feature is their human-in-the-loop approval system for sensitive operations. The agent loop can be deterministically interrupted when the agent attempts to call a tool that requires human approval. When this occurs, the user sees a UI prompt where they can explicitly accept or reject the action the agent is trying to perform.

This approval mechanism is particularly important for mutating operations that could change data or system state. By requiring explicit human approval for such actions, OpenGov ensures that users remain in control and builds trust in the agent system. The design philosophy emphasizes that humans must always be in the driver's seat, especially when dealing with critical government data and workflows.

Additionally, OpenGov implemented sandboxing for code execution. When the agent needs to execute code or create files, it does so within isolated, ephemeral sandbox environments that spin up on demand. These sandboxes provide a safe space for the agent to perform computations, generate files, and run code without any risk to production systems. The sandboxes are automatically torn down after use. An example use case involves the agent creating a PDF document within a sandbox that users can then download.

## Evaluation and Feedback Systems

OpenGov takes a multi-faceted approach to evaluation and quality assurance, operating under the philosophy that "shipping is the start, not the finish." They collect feedback through both manual and automated mechanisms.

The primary manual feedback mechanism is a thumbs-up/thumbs-down system integrated into the agent interface. Users can indicate whether a response was helpful or unhelpful, providing a direct signal that the team uses to iterate and improve the system. This explicit user feedback is complemented by more traditional support channels like calls and emails, but the in-product feedback mechanism provides the most scalable signal.

On the automated side, OpenGov runs evaluation pipelines as part of their continuous integration process. These automated evaluations test prompts against real completions, checking whether the agent hit the expected tools and performed the intended actions. By running these evaluations in CI/CD, they can catch regressions before they reach production and ensure that changes to prompts, tools, or the agent loop don't degrade performance.

The combination of automated evaluations and user feedback creates a continuous improvement loop. Signals from production usage directly inform improvements to tools, skills, prompts, and the underlying harness, enabling rapid iteration.

## Long Context and Memory Management

As conversations grow longer, OpenGov encountered challenges with token limits and context management, particularly with earlier generation models. Simply including all recent messages in the context proved ineffective as conversations extended over many turns.

Their solution involves rolling summarization of conversation history. After a certain number of messages, the system creates a running summary rather than including every message in the context. The agent maintains access to the most recent messages (for example, the last five or ten messages) while relying on the summary for earlier context. This approach balances the need for relevant recent context with the limitations of token windows.

The memory component enables recall over the summarized conversation history. If a user asks the agent to remember something discussed much earlier in the conversation, the agent can reference the rolling summary to retrieve that information. This gives the appearance of long-term memory within a conversation thread while managing token budgets efficiently.

This approach to long context management represents a pragmatic solution to a common production challenge with LLMs, particularly relevant before the widespread availability of models with very large context windows.

## Generative UI Capabilities

OG Assist includes the ability to generate user interfaces dynamically at runtime. The agent has access to UI primitives that it can assemble into interactive components based on the conversation context. An example involves the user asking for a long essay with some example topics to choose from. The agent constructs a form at runtime presenting multiple options for the user to select, creating a personalized and contextual experience.

This generative UI capability moves beyond simple text responses to create interactive experiences that feel native to the application. The runtime generation of forms and other UI components allows the agent to adapt the interface to the specific needs of each interaction, rather than relying on predetermined templates.

## Observability and Tracing

OpenGov emphasizes that "you can't scale what you can't see," highlighting the critical importance of observability in production agent systems. A major benefit of building on Effect is that tracing comes built-in. Effect functions are automatically tagged with spans that feed into distributed traces, providing detailed visibility into system behavior.

The tracing system captures the entire flow of a request, from API endpoint to handler to downstream function calls. Each trace shows execution time for each component, making it easy to identify bottlenecks and performance issues. When failures occur, teams can cross-reference data across services to diagnose root causes. This capability is particularly valuable in agentic systems where the agent interacts with multiple teams' APIs and platform capabilities.

The automatic instrumentation provided by Effect eliminates the need for manual tracing code, making the observability system both comprehensive and maintainable. This observability foundation is essential for debugging complex agent interactions and maintaining production systems at scale.

## Developer Velocity and Internal Use

Beyond building agents for customers, OpenGov uses AI agents internally to accelerate their own development workflows. The team extensively uses tools like Claude, Cursor, and Claude agents for reading, writing, and reviewing code. These tools have been transformative for development velocity.

Interestingly, the team builds tools and skills not only for customer-facing agents but also for their internal development agents. This creates a virtuous cycle where the infrastructure they build for OG Assist also benefits their internal workflows, and vice versa. The ability to extend agent capabilities through tools applies equally to customer-facing and internal use cases.

This dual use of agent technology demonstrates the versatility of their architecture and represents a sophisticated approach to LLMOps where the same patterns and infrastructure support both product features and internal tooling.

## Production Scale and Real-World Deployment

The presentation emphasizes that this is a real production workload operating at significant scale. OG Assist is deployed across all OpenGov product suites and available to all their government customers. The integration is deep enough that product teams have built domain-specific tools and skills, suggesting substantial adoption and investment across the organization.

The system handles diverse use cases across different government functions, from financial operations like budgeting to operational systems like permitting and asset management. This breadth of application domains demonstrates the flexibility of their agent architecture and the robustness required for production deployment.

## Technology Migration and Evolution

The migration from LangGraph to a custom Effect-based agent loop represents a significant architectural evolution. This decision reflects a common pattern in LLMOps where teams start with higher-level frameworks but eventually need more control as requirements become more sophisticated. The willingness to build custom infrastructure when frameworks prove limiting shows technical maturity and a commitment to long-term maintainability over short-term convenience.

The migration appears to have been successful, with the team reporting that full control over the agent loop unlocked new capabilities and improved their ability to implement complex features. The structured concurrency, logging, and tracing capabilities of Effect provide benefits throughout the system that weren't available with their previous framework.

## Balanced Assessment

The case study presents an enthusiastic view of OpenGov's agent implementation, and several claims should be evaluated with appropriate skepticism. The assertion that migrating from LangGraph to a custom Effect-based loop "paid off in dividends" is strong but lacks quantitative metrics. While the benefits of control and customization are real, the costs of maintaining custom infrastructure versus using maintained frameworks aren't discussed.

The effectiveness of rolling summarization for long context management is presented as successful, but there's no discussion of failure modes or edge cases where information might be lost. The approach makes sense for managing token budgets, but the quality of recall over summarized conversations likely varies depending on conversation structure and topic shifts.

The safety mechanisms, particularly human-in-the-loop approvals and sandboxing, appear well-designed and appropriate for government software where data integrity is critical. However, the presentation doesn't address how frequently approvals are required, whether they create friction in user workflows, or how the system handles cases where users repeatedly reject agent actions.

The evaluation strategy combining automated tests and user feedback is sound, but the case study lacks details on evaluation metrics, what constitutes a passing evaluation, or how they handle the inherent variability in LLM outputs. The thumbs-up/thumbs-down feedback mechanism is simple but may not capture nuanced quality issues.

The generative UI capability is impressive from a technical standpoint, but the practical utility depends on the reliability of the generated interfaces. Hallucinated or malformed UI components could create poor user experiences, and the case study doesn't address how they prevent or handle such cases.

Overall, OpenGov appears to have built a sophisticated and well-architected agent system with thoughtful approaches to common LLMOps challenges. The emphasis on safety, observability, and evaluation suggests production readiness and maturity. The architectural choices, particularly the custom agent loop and tools framework, provide flexibility at the cost of increased maintenance burden. For an organization committed to AI agents as a core product differentiator, these tradeoffs likely make sense, though smaller organizations might find managed frameworks more appropriate.
