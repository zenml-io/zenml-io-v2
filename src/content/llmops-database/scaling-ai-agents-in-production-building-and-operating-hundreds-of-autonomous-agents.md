---
title: "Scaling AI Agents in Production: Building and Operating Hundreds of Autonomous Agents"
slug: "scaling-ai-agents-in-production-building-and-operating-hundreds-of-autonomous-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "fraud-detection"
  - "customer-support"
  - "high-stakes-application"
  - "realtime-application"
  - "poc"
  - "data-analysis"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "evals"
  - "human-in-the-loop"
  - "latency-optimization"
  - "error-handling"
  - "mcp"
  - "a2a"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "serverless"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "langchain"
  - "anthropic"
  - "openai"
  - "amazon-aws"
  - "microsoft-azure"
  - "google-gcp"
  - "databricks"
industryTags: "tech"
company: "Datadog"
summary: "Datadog shares lessons learned from building over 100 AI agents in production and preparing to scale to thousands more. The company deployed multiple production agents including Bits AI SRE for autonomous alert investigation, Bits AI Dev for code generation and error fixes, and security analysts for automated security investigations. Key challenges addressed include making systems agent-native through API-first design, transitioning from reactive chat interfaces to proactive background agents, implementing comprehensive evaluation systems, maintaining model and framework agnosticism, and establishing robust monitoring for autonomous operations. The case study emphasizes that intelligence is no longer the bottleneck—operational excellence and proper LLMOps practices are now the critical factors for successful agent deployment at scale."
link: "https://www.youtube.com/watch?v=Naty_iFtITM"
year: 2026
seo:
  title: "Datadog: Scaling AI Agents in Production: Building and Operating Hundreds of Autonomous Agents - ZenML LLMOps Database"
  description: "Datadog shares lessons learned from building over 100 AI agents in production and preparing to scale to thousands more. The company deployed multiple production agents including Bits AI SRE for autonomous alert investigation, Bits AI Dev for code generation and error fixes, and security analysts for automated security investigations. Key challenges addressed include making systems agent-native through API-first design, transitioning from reactive chat interfaces to proactive background agents, implementing comprehensive evaluation systems, maintaining model and framework agnosticism, and establishing robust monitoring for autonomous operations. The case study emphasizes that intelligence is no longer the bottleneck—operational excellence and proper LLMOps practices are now the critical factors for successful agent deployment at scale."
  canonical: "https://www.zenml.io/llmops-database/scaling-ai-agents-in-production-building-and-operating-hundreds-of-autonomous-agents"
  ogTitle: "Datadog: Scaling AI Agents in Production: Building and Operating Hundreds of Autonomous Agents - ZenML LLMOps Database"
  ogDescription: "Datadog shares lessons learned from building over 100 AI agents in production and preparing to scale to thousands more. The company deployed multiple production agents including Bits AI SRE for autonomous alert investigation, Bits AI Dev for code generation and error fixes, and security analysts for automated security investigations. Key challenges addressed include making systems agent-native through API-first design, transitioning from reactive chat interfaces to proactive background agents, implementing comprehensive evaluation systems, maintaining model and framework agnosticism, and establishing robust monitoring for autonomous operations. The case study emphasizes that intelligence is no longer the bottleneck—operational excellence and proper LLMOps practices are now the critical factors for successful agent deployment at scale."
notion:
  pageId: "352f8dff-2538-800c-b05c-e2a126fb46ec"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-30T13:11:00.000Z"
  lastEditedTime: "2026-04-30T13:11:00.000Z"
  publishedAt: "2026-04-30T13:16:40Z"
---

## Overview

Datadog, an observability platform company, presents a comprehensive case study on the operational realities of deploying and scaling AI agents in production environments. The speaker, who has 15 years of experience building AI systems including work on Cortana and Alexa, leads experimental AI initiatives at Datadog and has personally built numerous production agents for the company. This case study is particularly valuable because it moves beyond theoretical discussions to share practical lessons from operating over 100 AI agents in production while preparing infrastructure to scale to thousands more.

The presentation focuses on Datadog's journey in the "intelligence age" where the company has categorized their AI work into three areas: AI agents for Datadog's platform, Datadog for AI monitoring and observability, and AI agent infrastructure. This multi-faceted approach provides insights into both building agents as products and operating the infrastructure needed to support them at scale.

## Production AI Agents Deployed

Datadog has deployed several production-grade AI agents that serve real customer needs, providing concrete examples of LLMs operating autonomously in high-stakes production environments:

**Bits AI SRE** represents one of the first automated site reliability engineering agents brought to market. This agent autonomously investigates alerts with the explicit goal of preventing engineers from being woken up at 2 AM for incidents. The agent works to handle issues as they arise and, at minimum, completes initial investigation work before human engineers arrive at their computers. This addresses a critical pain point in DevOps operations where alert fatigue and off-hours incidents significantly impact engineering teams.

**Bits AI Dev** focuses on code generation and remediation. The agent analyzes errors flowing through services, identifies latency issues, and examines various development concerns to propose code fixes automatically. The key value proposition is that developers can see proposed fixes directly in Datadog without needing to open an IDE, streamlining the remediation workflow. This represents a proactive approach to code quality and performance optimization.

**Security Analysts** handle automated security investigations, going beyond operational issues to address security concerns. The agent automates checklist-driven investigations that typically consume significant human time, particularly when concerning alerts arise. The goal is to progressively automate more security investigation workflows over time.

All three agents leverage improvements in foundation models, particularly their increasing speed, expanding context windows, and ability to run for longer durations. The speaker emphasizes that these model improvements enable more tasks to be automated, with intelligence no longer being the primary bottleneck.

## Core Challenge: Autonomous Operations

A critical insight from Datadog's experience is that building an agent that works is fundamentally different from building an agent that can operate autonomously. The speaker raises the "who watches the watchmen" problem: when you deploy an agent, you need something monitoring that agent, but then what monitors the monitoring agent? This creates a recursive challenge that many organizations underestimate.

The solution requires moving beyond thinking about agents as experimental systems to treating them as production services with full observability, monitoring, and operational rigor. This is where Datadog's core expertise in observability becomes directly relevant to their AI agent work.

## Principle: Code and Agent First Design

Datadog advocates for treating agents as first-class users of systems, which has significant architectural implications. They have released an MCP server for Datadog, providing a structured entry point for agents to interact with their platform. However, the speaker emphasizes this is just one modality among many.

The broader principle is ensuring that agents can actually consume your services. This includes basic but important steps like ensuring agents can read documentation through formats like LLM.txt and markdown support. More fundamentally, UX and design teams must explicitly consider agents as users when designing products, APIs, and applications. The speaker notes a significant gap in many organizations where development teams try to make agents work with systems while design teams haven't considered agent interactions at all.

Drawing on the famous Bezos API mandate from Amazon that helped transform the company into a platform-first organization, the speaker proposes a new mandate for the agent era. Key principles include making all interfaces agent-friendly, avoiding designs that require human interaction for tasks within UIs, actively automating tasks that humans currently perform rather than waiting for others to do it, and remaining technology-agnostic about the specific protocols agents use. The speaker acknowledges being at an MCP conference but emphasizes that whether organizations use MCP, traditional APIs, skills frameworks, or agent-to-agent protocols matters less than actually thinking systematically about agent access.

## Principle: Proactive Over Reactive

While the speaker has extensive experience with chat and voice interfaces for AI systems, the key lesson from production deployment is that the winning agents are those that run in the background for hours, handling tasks without requiring human babysitting. This represents a fundamental shift from the conversational agent paradigm that dominated early LLM applications.

For background, long-running agents to work effectively, they typically need to be event-driven rather than constantly polling or requiring human triggers. This enables efficient resource utilization and appropriate responsiveness to relevant triggers.

Durability becomes critical for agents operating without supervision. Datadog specifically calls out Temporal as a technology they use extensively for building durable agents. Temporal provides workflow orchestration with built-in fault tolerance, state management, and the ability to have long-running processes that survive failures and restarts.

The speaker also emphasizes running agents in containerized sandboxes rather than on local machines. While acknowledging that developers enjoy tools like Open Claw for local experimentation, production deployment requires proper isolation and security. Appropriate storage and file systems enable agent swapping and version management without disrupting ongoing operations.

## Principle: Comprehensive Evaluation

The speaker delivers a strong message about evaluation: if you're launching an agent and don't know how you'll evaluate it, you shouldn't launch that agent. While experimentation is encouraged, production deployment requires clear understanding of how to observe problems and drive improvements.

First-generation agents won't work for everything, making continuous evaluation essential rather than optional. Datadog emphasizes having three layers of evaluation: offline evaluation for testing before deployment, online evaluation for monitoring live performance, and a living, breathing evaluation system that adapts as conditions change. This last point is particularly important given rapid changes in the AI ecosystem and the well-known problem of data drift in machine learning systems.

An innovative approach Datadog takes is making evaluation systems themselves accessible to agents. By exposing evaluation and improvement tools through MCP servers or other agent-accessible interfaces, you can create agents that think about and improve the evaluation loop itself. This meta-level automation represents a sophisticated approach to maintaining LLMOps systems at scale.

## Principle: Model and Framework Agnostic Design

The speaker argues strongly for avoiding lock-in to specific models or frameworks. The competitive landscape in foundation models changes rapidly, with the speaker noting how Anthropic's Claude went from being perceived as falling behind to leading the field after December, and how sentiment around different models continues to shift.

Organizations should assume that whoever leads today will likely not lead tomorrow. This requires architectural decisions that allow swapping models without rebuilding entire systems. The speaker refers to an "agent-level bitter lesson" in reference to the famous "bitter lesson" in AI research by Rich Sutton, which argued that general methods leveraging computation outperform hand-crafted approaches in the long run.

For agents, this means keeping agent harnesses simple and not over-complicating them. Systems should be built with the expectation that they'll be rewritten as models evolve. One key enabler of this approach is implementing robust memory systems that can capture and transfer learnings across different models and frameworks, allowing organizational knowledge to persist even as the underlying technology stack changes.

## Principle: New Definition of Multiplayer

The concept of multiplayer interactions has evolved beyond the Figma-style collaborative editing paradigm. In the agent era, multiplayer means human-to-human, human-to-agent, and agent-to-agent communication. Systems need appropriate communication protocols and interfaces for all these interaction modes, which requires rethinking collaboration tools and workflows that were designed exclusively for human users.

## Product Application: Dispatch Agents

The speaker mentions that these learnings have been encoded into a product called Dispatch Agents (dispatch agents.ai), suggesting Datadog is productizing their internal LLMOps practices and infrastructure. This represents a common pattern where companies that successfully deploy AI systems internally then offer their infrastructure as products to other organizations.

## Looking Ahead: Future Trends

Datadog identifies several trends they're designing for in their agent infrastructure. Agents will increasingly learn on the job, getting better at specific tasks within an organization's context over time. This requires systems that can capture, store, and apply learned knowledge effectively.

Agents will become longer-running and more independent, potentially operating for extended periods without human intervention. This amplifies the importance of monitoring, evaluation, and safety mechanisms.

Multimodal capabilities will become standard, with agents having visual processing abilities beyond text. The speaker specifically mentions computer use capabilities that might become practical within months, enabling agents to interact with systems through visual interfaces rather than just APIs.

## Critical Assessment

While this case study provides valuable practical insights from a company operating AI agents at scale, several caveats should be noted. The presentation is from a conference talk and includes promotion of Datadog's products, so claims about their agents being "first to market" or their effectiveness should be viewed with appropriate skepticism.

The case study would benefit from more specific metrics about agent performance, failure rates, and the actual operational overhead of running these systems. While the principles shared are sound, the presentation lacks quantitative data about improvements achieved, costs incurred, or specific failure modes encountered.

The emphasis on being framework and model agnostic, while philosophically sound, may understate the engineering effort required to maintain such flexibility. Abstraction layers that support multiple models often introduce complexity and may limit the ability to leverage model-specific features.

The speaker's assertion that "intelligence is no longer the bottleneck" may be premature, particularly for complex reasoning tasks or novel problem domains. While operational excellence is certainly crucial, model capabilities remain a significant constraint for many applications.

The discussion of evaluation is appropriately emphasized but remains somewhat abstract. Specific approaches to offline versus online evaluation, how to handle edge cases, and how to balance precision versus recall in different agent contexts would strengthen the operational guidance.

Overall, this case study represents a valuable contribution to the LLMOps literature by sharing lessons from a company operating AI agents at significant scale in production. The principles around agent-first design, proactive operations, comprehensive evaluation, and infrastructure flexibility provide actionable guidance for organizations building their own agent systems. However, readers should supplement these high-level principles with more detailed technical investigation and maintain realistic expectations about the challenges involved in autonomous agent operations.
