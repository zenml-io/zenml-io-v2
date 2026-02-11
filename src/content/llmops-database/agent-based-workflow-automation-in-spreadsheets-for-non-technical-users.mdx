---
title: "Agent-Based Workflow Automation in Spreadsheets for Non-Technical Users"
slug: "agent-based-workflow-automation-in-spreadsheets-for-non-technical-users"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69281bbe581ddc6a7e8f2848"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:30:07.525Z"
  createdOn: "2025-11-27T09:37:02.378Z"
llmopsTags:
  - "chatbot"
  - "customer-support"
  - "code-generation"
  - "data-analysis"
  - "document-processing"
  - "unstructured-data"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "cost-optimization"
  - "few-shot"
  - "error-handling"
  - "fallback-strategies"
  - "evals"
  - "langchain"
  - "crewai"
  - "postgresql"
  - "fastapi"
  - "open-source"
  - "openai"
  - "anthropic"
  - "google-gcp"
  - "meta"
  - "cloudflare"
industryTags: "tech"
company: "Otto"
summary: "Otto, founded by Suli Omar, addresses the challenge of making AI agents accessible to non-technical users by embedding agent workflows directly into spreadsheet interfaces. The company transforms unstructured data processing tasks into spreadsheet-based workflows where each cell acts as an autonomous agent capable of executing tasks, waiting for dependencies, and outputting structured results. By leveraging the familiar spreadsheet UX instead of traditional chatbot interfaces, Otto enables finance teams, accountants, and other business users to harness agent capabilities without requiring technical expertise. The solution involves sophisticated model selection across three tiers (workhorse, middle-tier, and heavy reasoning models) to optimize cost and performance, continuous evaluation through customer usage patterns, and iterative model testing to maintain service quality as new LLM capabilities emerge."
link: "https://www.youtube.com/watch?v=U2TTuDGj6KE"
year: 2025
seo:
  title: "Otto: Agent-Based Workflow Automation in Spreadsheets for Non-Technical Users - ZenML LLMOps Database"
  description: "Otto, founded by Suli Omar, addresses the challenge of making AI agents accessible to non-technical users by embedding agent workflows directly into spreadsheet interfaces. The company transforms unstructured data processing tasks into spreadsheet-based workflows where each cell acts as an autonomous agent capable of executing tasks, waiting for dependencies, and outputting structured results. By leveraging the familiar spreadsheet UX instead of traditional chatbot interfaces, Otto enables finance teams, accountants, and other business users to harness agent capabilities without requiring technical expertise. The solution involves sophisticated model selection across three tiers (workhorse, middle-tier, and heavy reasoning models) to optimize cost and performance, continuous evaluation through customer usage patterns, and iterative model testing to maintain service quality as new LLM capabilities emerge."
  canonical: "https://www.zenml.io/llmops-database/agent-based-workflow-automation-in-spreadsheets-for-non-technical-users"
  ogTitle: "Otto: Agent-Based Workflow Automation in Spreadsheets for Non-Technical Users - ZenML LLMOps Database"
  ogDescription: "Otto, founded by Suli Omar, addresses the challenge of making AI agents accessible to non-technical users by embedding agent workflows directly into spreadsheet interfaces. The company transforms unstructured data processing tasks into spreadsheet-based workflows where each cell acts as an autonomous agent capable of executing tasks, waiting for dependencies, and outputting structured results. By leveraging the familiar spreadsheet UX instead of traditional chatbot interfaces, Otto enables finance teams, accountants, and other business users to harness agent capabilities without requiring technical expertise. The solution involves sophisticated model selection across three tiers (workhorse, middle-tier, and heavy reasoning models) to optimize cost and performance, continuous evaluation through customer usage patterns, and iterative model testing to maintain service quality as new LLM capabilities emerge."
---

## Overview

Otto is a production AI agent platform founded by Suli Omar that embeds autonomous agents within spreadsheet interfaces to make agent-based automation accessible to non-technical users. The company has been building agents in production for approximately two years, starting when AutoGPT emerged as one of the first "agentic" systems. Omar's journey into LLMOps began with tinkering and experimentation, going viral on Twitter (now X) when AutoGPT launched, and subsequently building a business focused on solving real-world problems for knowledge workers who live in spreadsheets—accountants, finance teams, and business analysts.

The core insight driving Otto's product is that while developers gravitate toward databases, APIs, and chatbot interfaces, the vast majority of business users operate in spreadsheets. Fortune 500 companies run billions of dollars worth of operations on Excel and similar tools. Otto recognized this underserved market and created a product that places agents inside spreadsheet cells, where each cell can execute autonomous tasks, creating a workflow automation system that feels native to existing user behaviors.

## Agent Architecture and Definition

Omar articulates a pragmatic, production-oriented definition of AI agents that reflects real-world implementation constraints rather than theoretical ideals. In his view, an agent consists of three core components: an LLM (the reasoning engine), a set of tools (APIs, web access, internal data sources, action-taking capabilities), and a loop that allows the agent to iterate toward goal completion autonomously. This definition deliberately avoids overly complex terminology like "agent swarms" in favor of focusing on what actually matters in production: can the system take an objective, reason about it, make API calls or tool invocations, and determine when the task is complete?

The architecture Otto employs involves treating each spreadsheet cell as an independent agent. Columns can have dependencies where one agent waits for another to complete before executing, creating a directed acyclic graph (DAG) of task execution within the familiar spreadsheet paradigm. This approach transforms unstructured data into structured, tabular outputs that business users understand intuitively. Users can still interact via chat if they prefer, with the agent manipulating the spreadsheet on their behalf, but the primary interface is the spreadsheet itself—a deliberate UX choice to reduce friction for non-technical adopters.

## The Three-Tiered Model Selection Framework

One of Otto's most sophisticated LLMOps practices involves a three-tiered model selection framework that Omar has refined through extensive production experience. This framework enables optimal cost-performance tradeoffs across different task types:

**Tier 1: Workhorse Models** are the cheapest, fastest models with minimal reasoning capabilities. Examples include Gemini Flash and other small, affordable models. These handle grunt work like extracting names from PDFs, simple data transformations, or repetitive tasks where intelligence requirements are low. The guiding principle is: why pay a premium when a 10-cent inference can accomplish what a $100 inference would do?

**Tier 2: Middle-Tier Models** represent the sweet spot for most production tasks. These models are moderately priced, reasonably fast, and highly capable without extended reasoning chains. Claude 3.7 Sonnet falls into this category—models that are quick to respond but intelligent enough to handle complex workflows. The majority of Otto's agent tasks run on Tier 2 models because they balance cost, latency, and capability effectively.

**Tier 3: Heavy Reasoning Models** are reserved for the most difficult, high-value tasks where extended thinking is justified. OpenAI's o1 Pro exemplifies this tier—models that engage in prolonged reasoning chains, consume significant compute, and cost substantially more per inference. Omar notes that the line between Tier 2 and Tier 3 is blurring as reasoning models become faster and cheaper, with some former Tier 3 models migrating into Tier 2 as economics improve.

A critical constraint Omar emphasizes is latency. Even if a Tier 3 reasoning model becomes as cheap as a Tier 2 model, it may still be inappropriate for certain use cases. For customer support agents, a 20-minute reasoning time is unacceptable regardless of cost or intelligence—users won't wait. This illustrates the multi-dimensional optimization problem in production LLMOps: intelligence, pricing, and time-to-response must all be balanced against the specific requirements of each use case.

## Evaluation and Model Testing in Production

Otto employs a pragmatic, multi-layered evaluation strategy that goes beyond traditional benchmark-based assessment. Omar expresses skepticism about saturated academic benchmarks where models score 99%+ and differences between competitors amount to fractions of a percentage point. Instead, Otto relies on several complementary evaluation approaches:

**Social Signal Analysis**: Omar monitors Twitter/X extensively to gauge community sentiment about new model releases. He notes a pattern where initial releases trigger hype ("this is AGI!"), but waiting a week reveals more honest assessments as users encounter limitations. This crowdsourced evaluation provides valuable signal about real-world model performance across diverse use cases.

**Internal Task-Based Testing**: Otto runs new models through internal benchmarks specific to their product requirements—coding ability, multimodal understanding, tool use effectiveness, and domain-specific tasks like parsing Salesforce accounts or processing financial data. These practical tests reveal whether a model can handle Otto's actual workload better than incumbents.

**Canary Testing with Customers**: Perhaps most notably, Otto employs canary deployments (what Omar calls "five testing") where new models are pushed to production for a limited time (one or two days) and customer complaints serve as the evaluation metric. If complaints spike, the model is rolled back. This approach accepts short-term friction in exchange for fast, real-world validation of model performance under actual production conditions with real user workflows.

**Rate Limit and Infrastructure Testing**: Beyond accuracy, Otto evaluates whether models have adequate rate limits and infrastructure stability for production deployment. A brilliant model that can't scale or frequently experiences downtime is unusable regardless of benchmark performance.

Omar advocates for evaluation frameworks that measure tangible capabilities—"how good is this model at understanding my Salesforce account?"—rather than abstract benchmarks. This reflects a broader LLMOps philosophy: production requirements are domain-specific, and generic benchmarks often fail to predict real-world utility.

## Cost Management and Economic Constraints

Running agents in production at scale involves substantial economic considerations that shape Otto's technical architecture. Omar is transparent about the challenge of unit economics: today's agent costs often exceed the cost of hiring humans for equivalent work. An agent task that costs $40 when a human could do it for $20 doesn't make business sense, even if the agent is faster.

This economic reality forces Otto to optimize aggressively across several dimensions. The three-tiered model framework exists specifically to minimize costs by routing simple tasks to cheap models and reserving expensive reasoning for high-value work. Omar emphasizes that as models improve, agent architectures should simplify—more scaffolding and guard rails can be removed, reducing both code complexity and inference costs.

The company also considers pricing strategy carefully. Otto can't offer services below their LLM API costs unless they achieve massive scale or find alternative revenue models. This means tracking price-per-request across providers, negotiating rate limits for enterprise usage, and continuously re-evaluating model choices as pricing evolves.

Omar predicts that agent viability depends on models becoming not just smarter and cheaper, but "10 times cheaper than that" before agent swarms processing millions of tasks become economically feasible. The compression of human work from months to days that agents enable creates infrastructure challenges—agents generate network requests, bandwidth consumption, and server load patterns radically different from human usage, and current infrastructure wasn't designed for this.

## Iterative Development and Continuous Model Monitoring

Otto's LLMOps practice emphasizes rapid iteration and continuous adaptation as the model landscape evolves. Omar notes that the iteration cycle has slowed somewhat in recent months (as of late 2024/early 2025), with fewer step-function improvements that require complete architectural overhauls. This has allowed Otto to focus on refinement rather than constant rebuilding.

However, when major model releases occur—particularly step-function improvements in reasoning capabilities—Omar conducts systematic assessments: What tasks were previously impossible that are now possible? What is the dollar delta between current capabilities and new capabilities? If the economic upside is marginal (e.g., $1 improvement), Otto stays the course. If the delta is millions of dollars in potential value, they consider pivoting or expanding product scope.

This disciplined approach prevents "shiny object syndrome" where every new model release triggers product rewrites. Instead, Otto maintains focus on their core value proposition (spreadsheet-based agent workflows for non-technical users) while selectively adopting model improvements that meaningfully enhance that offering.

Omar's development philosophy aligns with a broader principle he shares with other production agent builders: "don't bet against the models." As foundation models improve, agent scaffolding should decrease, not increase. Frameworks and abstractions that seem necessary today may become obsolete as models gain native capabilities for tool use, reasoning, and state management.

## Multi-Agent Patterns and Future Architecture

While Otto's current architecture treats each spreadsheet cell as an independent agent with potential dependencies, Omar discusses emerging multi-agent patterns that may become more prevalent as models improve. He envisions hierarchical agent systems where a "client agent" interfaces with users and delegates to specialized sub-agents—a GitHub agent that knows all available tools and sub-agents (code indexing agent, API testing agent, etc.) and orchestrates them based on user requests.

This architectural pattern addresses a practical limitation: agents may only be effective with up to 10 tools before performance degrades. Multi-agent systems allow specialization while maintaining manageable tool sets per agent. However, Omar notes this remains in early stages and requires smarter models with better reasoning capabilities to work reliably.

He also discusses the Model Context Protocol (MCP) from Anthropic with measured skepticism. While he appreciates the direction—standardized tool interfaces that agents can consume across platforms—he questions whether MCP's statefulness and current implementation represent the final form. Omar suggests the paradigm of exposing services as "agent APIs" will likely succeed, but MCP may need further iteration before becoming the dominant standard.

## Infrastructure and Deployment Considerations

Otto faces classic LLMOps infrastructure challenges amplified by their agent architecture. Rate limiting is a constant concern—agents can generate far more API requests in compressed time than human users, potentially overwhelming both Otto's infrastructure and the LLM providers they depend on. This requires careful capacity planning and potentially throttling agent execution to stay within rate limits.

State management is another complexity. Unlike simple chatbots that maintain conversation state, Otto's spreadsheet agents must track cell dependencies, intermediate results, and workflow status across potentially dozens of concurrent agent tasks per user session. This state must be managed efficiently to avoid ballooning costs and maintain responsiveness.

Omar mentions OpenAI's recently released Agents API as an interesting development because it shifts some state management and iteration logic to the platform layer. This could reduce client-side complexity and allow tighter integration between the model provider's infrastructure and agent execution patterns. However, Otto must balance these platform-specific features against maintaining flexibility to use multiple model providers across their three-tiered framework.

Observability is another concern, though Omar notes that agent frameworks primarily provide value through observability features rather than core functionality. As models improve, the scaffolding provided by frameworks like LangChain or CrewAI becomes less necessary, but the ability to monitor agent behavior, debug failures, and understand cost attribution remains critical.

## Product Philosophy and Market Positioning

Otto's product strategy reflects deep insight into user behavior and market dynamics. Rather than following the developer-centric trend of building better coding agents (which Omar is "sick of seeing"), Otto targets the massive installed base of spreadsheet users in finance, accounting, operations, and business analysis roles. This market represents billions of dollars in potential value but has been underserved by AI tooling focused on technical users.

The challenge isn't purely technical—it's adoption. Omar acknowledges that even when Otto solves technical problems brilliantly with agents, convincing enterprises to move off Excel requires overcoming institutional inertia. Excel is "so ingrained in everyone's head" that switching costs are high even when alternatives offer compelling benefits.

Otto's approach of preserving the spreadsheet UX while adding agent capabilities reduces this friction. Users don't need to learn new interaction paradigms, understand databases, or adapt to chatbot interfaces. They work in familiar spreadsheet environments where cells now have superpowers—the ability to autonomously fetch data, process unstructured information, and execute complex workflows.

This design philosophy extends to Otto's technical choices. They prioritize pragmatism over theoretical purity, emphasizing what works in production over what's intellectually elegant. Omar's advice to others building in the space reflects this: tinker extensively, wait a week before forming opinions on new releases, use customer feedback as ground truth, and focus on solving real problems for real users rather than chasing every new model or framework.

## Lessons on Hype vs. Substance

Throughout the interview, Omar positions himself as a "substance man" rather than a "hype man," and this philosophy permeates Otto's LLMOps practices. He emphasizes the importance of hands-on experience before forming opinions, critiques the tendency of the AI community to claim "AGI" with every model release, and advocates for transparency about limitations alongside capabilities.

This balanced perspective is particularly valuable in LLMOps where hype cycles can drive poor technical decisions. Omar notes that many people who speak confidently about agents lack practical experience—when pressed with specific questions, "they start to not understand." By contrast, his two years of production experience building, deploying, and iterating on agent systems provides grounded insight into what actually works versus what sounds good in theory.

He also acknowledges that model capabilities haven't hit a wall but have reached plateaus where incremental improvements don't justify major architectural changes. The most significant recent improvement he identifies is in coding models, which benefits developers but doesn't radically transform agent capabilities for Otto's target users. This creates space for consolidation and refinement rather than constant disruption.

## Conclusion

Otto represents a pragmatic, production-focused approach to deploying LLM-based agents at scale. The company's three-tiered model selection framework, canary testing methodology, focus on cost optimization, and deliberate UX choices all reflect hard-won lessons from operating agents in production environments serving non-technical users. By embedding agents in the familiar spreadsheet paradigm and maintaining discipline about when to adopt new technologies versus when to stay the course, Otto has built a sustainable LLMOps practice that balances innovation with operational stability. Omar's emphasis on substance over hype, extensive testing before forming opinions, and willingness to share both successes and limitations provides a valuable counterpoint to the breathless optimism that often dominates AI discourse.