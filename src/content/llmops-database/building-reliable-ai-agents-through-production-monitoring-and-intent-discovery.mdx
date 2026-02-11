---
title: "Building Reliable AI Agents Through Production Monitoring and Intent Discovery"
slug: "building-reliable-ai-agents-through-production-monitoring-and-intent-discovery"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6942b995f15a6837780e1e56"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:37:19.749Z"
  createdOn: "2025-12-17T14:09:25.394Z"
llmopsTags:
  - "chatbot"
  - "customer-support"
  - "question-answering"
  - "code-generation"
  - "poc"
  - "high-stakes-application"
  - "prompt-engineering"
  - "embeddings"
  - "semantic-search"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "error-handling"
  - "evals"
  - "few-shot"
  - "system-prompts"
  - "monitoring"
  - "langchain"
  - "databases"
  - "postgresql"
  - "sqlite"
  - "redis"
  - "cache"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "anthropic"
  - "openai"
  - "google-gcp"
  - "meta"
industryTags: "tech"
company: "Raindrop"
summary: "Raindrop, a monitoring platform for AI products, addresses the challenge of building reliable AI agents in production where traditional offline evaluations fail to capture real-world usage patterns. The company developed a \"Sentry for AI products\" approach that emphasizes experimentation, production monitoring, and discovering user intents through clustering and signal detection. Their solution combines explicit signals (like thumbs up/down, regenerations) and implicit signals (detecting refusals, task failures, user frustration) to identify issues that don't manifest as traditional software errors. The platform trains custom models to detect issues across production data at scale, enabling teams to discover unknown problems, track their impact on users, and fix them systematically without breaking existing functionality."
link: "https://www.youtube.com/watch?v=nKmPZVxfzY0"
year: 2025
seo:
  title: "Raindrop: Building Reliable AI Agents Through Production Monitoring and Intent Discovery - ZenML LLMOps Database"
  description: "Raindrop, a monitoring platform for AI products, addresses the challenge of building reliable AI agents in production where traditional offline evaluations fail to capture real-world usage patterns. The company developed a \"Sentry for AI products\" approach that emphasizes experimentation, production monitoring, and discovering user intents through clustering and signal detection. Their solution combines explicit signals (like thumbs up/down, regenerations) and implicit signals (detecting refusals, task failures, user frustration) to identify issues that don't manifest as traditional software errors. The platform trains custom models to detect issues across production data at scale, enabling teams to discover unknown problems, track their impact on users, and fix them systematically without breaking existing functionality."
  canonical: "https://www.zenml.io/llmops-database/building-reliable-ai-agents-through-production-monitoring-and-intent-discovery"
  ogTitle: "Raindrop: Building Reliable AI Agents Through Production Monitoring and Intent Discovery - ZenML LLMOps Database"
  ogDescription: "Raindrop, a monitoring platform for AI products, addresses the challenge of building reliable AI agents in production where traditional offline evaluations fail to capture real-world usage patterns. The company developed a \"Sentry for AI products\" approach that emphasizes experimentation, production monitoring, and discovering user intents through clustering and signal detection. Their solution combines explicit signals (like thumbs up/down, regenerations) and implicit signals (detecting refusals, task failures, user frustration) to identify issues that don't manifest as traditional software errors. The platform trains custom models to detect issues across production data at scale, enabling teams to discover unknown problems, track their impact on users, and fix them systematically without breaking existing functionality."
---

## Overview

This case study presents Raindrop's approach to building and maintaining reliable AI agents in production, delivered as a technical talk by Ben, the company's CTO. Raindrop positions itself as "Sentry for AI products," focusing on monitoring conversational and multi-turn AI applications. The presentation comes from a professional with a unique background spanning SpaceX avionics and Apple's human interface design team, now addressing the specific challenges of LLMOps at scale.

The core thesis centers on the limitations of offline evaluations and the critical importance of production monitoring for AI systems. Ben argues that while traditional eval approaches (input/expected output pairs) have value, they become increasingly inadequate as agents grow more capable and conversations span longer timeframes with more context. The key insight is that real-world usage reveals patterns and failure modes that cannot be anticipated during development, making production monitoring not just helpful but essential for reliability.

## The Evaluation Debate and Production Reality

The presentation opens by acknowledging the ongoing debate in the AI community about whether to approach evals like unit tests or to rely more heavily on production signals. Ben's position is nuanced: offline evaluations can only accomplish so much because they cannot predict how users will actually interact with systems in practice. He emphasizes that users employ "very soft systems in very strange ways" that developers cannot design for a priori. Even when you think you understand requirements, production deployment reveals that users care about time filters, contact information organization, or data type sorting in ways not anticipated during development.

This philosophy aligns with broader trends in software engineering, where the industry has gradually shifted from exhaustive pre-deployment QA toward production monitoring tools like Sentry and Datadog. Ben draws this parallel deliberately, suggesting that AI products should follow similar patterns while acknowledging their unique challenges. The difference is that AI systems often fail without throwing errors, making traditional monitoring approaches insufficient.

## The Unique Challenge of AI Product Reliability

Ben illustrates the current state of AI products through several real-world examples that highlight the uneven performance and serious consequences of failures. He references Deep Research as an example of agents that can run productively for 15-20 minutes, representing a milestone in useful long-running agents. However, he contrasts this with examples from Codex generating nonsensical unit tests that simply hardcode expected values rather than actually testing functionality - the kind of work that would result in firing a human engineer.

More seriously, the presentation covers legal and brand reputation issues emerging from AI failures. Virgin Money's chatbot threatened to end conversations when users mentioned the word "virgin." An airline chatbot promised refunds it wasn't authorized to give, leading to a lawsuit the company lost because courts ruled that chatbots speak on behalf of brands. Character AI faced litigation over a chatbot's failure to discourage suicidal ideation, with judges rejecting arguments that the company wasn't responsible for its AI's output. These cases establish that the legal and regulatory environment now treats AI outputs as company actions with real consequences.

Even sophisticated products from leading companies exhibit puzzling failures. Google Cloud's support chatbot asked if a user needed Azure or Roblox credits when they were asking about Google Cloud credits. Grok made errors regarding South Africa. These examples span from trivial to serious, but collectively demonstrate that even well-resourced teams struggle to prevent silly failures alongside impressive capabilities.

## Why Communication Complexity Won't Disappear

A key insight challenges the assumption that better models will eliminate these monitoring needs. Ben references Paul Graham's tweet suggesting that advances like GPT-5 might mean "the end of prompt engineering." The counterargument draws an analogy to onboarding junior engineers: even with capable humans, communicating requirements and context clearly enough to get desired outcomes remains genuinely difficult. As models become more capable, they actually acquire more "undefined behavior" because their ability to take diverse actions increases. This creates an expanding space of possible outputs rather than a narrowing one.

The communication problem becomes more acute as agents handle longer conversations, accumulate memory over days or weeks, integrate various tools, and potentially support user-customizable tool sets. This creates an effectively infinite combination of states, making traditional input/output evaluation pairs increasingly impractical. The context surrounding any given interaction - conversation history, compressed memory, available tools, user preferences - matters enormously for determining whether a response is correct.

## The Discover, Track, Fix Framework

Raindrop's approach centers on a three-phase loop: discover, track, and fix. This framework structures how teams should think about maintaining AI product quality in production.

### Discovery Phase: Signals and Clustering

Discovery begins with defining signals - ground-truth indicators of app performance where percentage-point changes matter. Ben emphasizes tracking signals as percentages of users rather than raw event counts, since a single frustrated user might generate hundreds of complaint events that don't represent a widespread problem.

Signals divide into explicit and implicit categories. Explicit signals function like analytics events: thumbs up/down, regeneration requests, feature upgrades, copy actions. Ben reveals that ChatGPT tracks even partial text copying from responses as feedback, including which specific text was selected. These explicit signals come from user actions that clearly indicate satisfaction or dissatisfaction.

Implicit signals represent something novel and powerful for AI products: detecting patterns in conversation content that indicate problems without users explicitly reporting them. Examples include the agent refusing requests, claiming it cannot complete tasks, forgetting information users previously provided, using incorrect dates (especially years in the past), apologizing excessively, or exhibiting laziness. On the positive side, detecting user expressions of gratitude or satisfaction ("oh my god thank you so much") provides valuable win signals.

The discovery process involves filtering production data through these initial coarse-grained signals, then clustering the results to find patterns. Ben advocates strongly for simply looking at the data - an "underutilized skill" that becomes manageable once you've filtered down to specific signal categories. Clustering can be done through various approaches, generally involving prompts that describe events, but becomes far more practical when applied to pre-filtered subsets rather than all production traffic.

Text and semantic search prove surprisingly valuable and underutilized. Simple keyword searches for "sorry," "I hate that," or profanity can surface problem clusters quickly. This applies to both implicit signals and explicit feedback events like regenerations.

The output of discovery is specific, describable issues rather than vague categories. For example, clustering user frustration might reveal subclusters like: math handling problems (maybe not important for your product), upload failures (interesting because it indicates infrastructure issues rather than agent behavior), systematic use of wrong dates, claiming inability to access contacts when that feature exists, tone problems, or forgetting previously provided information. Each subcluster becomes a concrete, trackable issue.

### Tracking Phase: Understanding Impact and Building Reliability

Discovery alone doesn't indicate priority. Tracking provides the quantitative dimension needed for effective decision-making, paralleling how Sentry shows error counts and affected user percentages. Ben emphasizes that accuracy matters less for discovery than for tracking - discovery clusters might include some misclassified events, but that's acceptable for finding problems. Tracking requires precision because it informs decisions about what to fix first and whether fixes actually worked.

This is where intents become crucial. Intents describe what users are actually trying to accomplish and come in two levels: turn-by-turn intents (presenting a problem, adding a feature, creating from scratch, debugging, correcting previous output) and conversation-level intents (building a marketing page, working on an internal dashboard). Combining signals with intents transforms vague categories into specific, actionable issues. "User frustration" alone provides limited guidance, but "user frustration during math homework help" versus "user frustration when asking about pricing" versus "user frustration while generating apps" becomes concrete and fixable.

The tracking system should provide rich metadata similar to Sentry's breakdown by browser, device, and environment. For AI products, this means showing which model versions are affected, whether issues appear more in voice versus text interfaces, which intents correlate with problems, which tools were invoked, whether those tools had errors, and how frequently tools were called on average. This metadata provides breadcrumbs for diagnosis.

Raindrop's approach involves training custom models under the hood to enable processing millions of events daily without prohibitive costs. This allows comprehensive coverage of production data rather than sampling small percentages, which would be necessary if using frontier models for all classification. The platform includes a feature called "deep search" that starts with semantic search, then uses an LLM to rerank and score events as binary matches to defined issue criteria. As users mark examples as correct or incorrect, the system generates clarifying questions and calibrates the detector, ultimately training a specialized model for that specific issue.

### Fixing Phase: Beyond Prompt Changes

While prompt engineering remains important, Ben focuses on architectural approaches to maintaining reliability as products grow. The key challenge is evolving products without breaking previously functioning behavior - a common problem where improving prompts for new use cases degrades performance on existing ones.

The solution draws from work with Leave, a studio with over six million users across multiple apps. They developed a framework called "Trellis" that emphasizes discretizing functionality into independent buckets or sub-agents that minimize crosstalk. The insight is that tool calls should be treated as sub-agents rather than simple function invocations.

This manifests in several ways. ChatGPT's image generation is actually a tool call to a separate model that interprets the generation request. Web search in ChatGPT similarly routes to a specialized search agent. Raindrop's own product demonstrates this pattern: their SQL agent needs to generate queries in a proprietary query language. Rather than forcing all that domain-specific knowledge into the main agent's prompt (making it slower, causing confusion about when to use the query language, and creating tight coupling), they built a separate model (using Sonnet 3.5 nano) that understands the query language completely. The main agent describes what the query should do in natural language, and the sub-agent translates that to the actual query language.

This modular approach provides several benefits: targeted changes don't affect the main agent, new tools can be added without modifying core prompts, different models can be selected for different sub-tasks based on performance and cost tradeoffs, and debugging becomes more tractable. Tool naming matters significantly - Ben notes that Anthropic and OpenAI perform reinforcement learning on specific tool names, highlighting that even seemingly minor details impact reliability.

The Trellis framework involves iteratively: launching working functionality, observing production usage, discretizing based on discovered intents and issues, converting each intent into targeted workflows that can be refined independently, and recursing through this process. This creates a structure where improvements can be made systematically without destabilizing the overall system.

## Technical Infrastructure and Monitoring

Ben emphasizes that teams need visibility into tool invocations and failures even if using basic monitoring solutions like Sentry. Detecting patterns like a tool being called five times consecutively with failures each time provides critical diagnostic information. Tools should be considered extensions of prompts rather than separate concerns, with the same attention to naming, descriptions, and error handling.

The presentation advocates treating tools as genuinely open-ended primitives rather than narrow function calls. Whereas early AI tools were simple like "get weather," modern tools are more like "search the internet," "run arbitrary shell commands," or "generate photo from description." This trend suggests that companies need to conceptualize their data models and APIs as domain-specific languages that agents can interact with flexibly, rather than predefined API endpoints. Companies in the data space may have advantages here, but all organizations need to think through how to define primitives that are powerful enough for agent needs while maintaining appropriate access controls and scoping.

## The LLM-as-Judge Debate

Ben addresses a common question about their use of LLMs for labeling and detection, distinguishing their approach from typical "LLM as judge" implementations. Traditional LLM-as-judge approaches involve getting models to score outputs (rating joke humor, writing quality, etc.), which creates several problems: it requires extensive evals to validate the judge, becomes circular (you need a good model to judge your good model), and can't achieve comprehensive production coverage because using expensive models for judging makes processing all production data prohibitively costly.

Raindrop's approach treats the problem as binary classification (does this match the defined issue or not?) rather than scoring. Their deep search feature performs semantic search first, then has an LLM rerank and decide on matches. Crucially, as users mark examples as correct or incorrect, the system generates clarifying questions to refine the definition and trains a specialized model that can process production data at scale. This provides comprehensive coverage (not just sampling) while maintaining reasonable costs, and produces concrete metrics like "this issue affects 8% of users" rather than subjective quality scores.

## Model Capabilities and Documentation

In response to questions about model providers addressing these challenges, Ben notes that providers are doing more than commonly recognized, but the work is often buried in documentation rather than promoted prominently. Examples include: OpenAI's context-free grammar (CFG) support with GPT-5 for constraining outputs to specific DSLs or schemas (though Ben found it somewhat slow in practice), structured outputs via Zod or Pydantic schemas, and log probabilities for debugging (available in completions API but underutilized). Cohere and Anthropic offer citation APIs for ensuring proper source attribution. These capabilities exist but don't generate the same attention as major model releases.

## Industry Implications and Future Directions

The presentation emphasizes that despite model improvements, the fundamental challenge of building reliable AI products requires engineering discipline. The "AI magic" must be engineered, repeatable, testable, and attributable rather than accidental, or it will disappear with the next model update. This framing pushes against the notion that teams should simply wait for better models rather than investing in robust production infrastructure.

Ben's most interesting forward-looking observation concerns how builders should think about their systems. As tools become more open-ended and powerful, companies need to conceptualize themselves in terms of their data models and how agents can access information, rather than traditional API design. The shift from narrow function calls to flexible primitives means the interface between agents and company data becomes a critical architectural consideration, not just an implementation detail.

The compatibility with other tooling is notable: most Raindrop customers use it alongside LangSmith or BrainTrust, suggesting complementary rather than competing functionality. Traditional LLMOps platforms focus on tracing, latency, token counts, and costs - important operational metrics. Raindrop focuses on whether the app is actually working from a user experience perspective and whether changes make things better or worse in production. This represents a distinction between infrastructure monitoring and product quality monitoring.

## Practical Takeaways for Practitioners

The presentation offers several actionable principles for teams building AI products. First, apply traditional software engineering wisdom where possible rather than assuming everything must be reinvented for AI. Use both testing and monitoring, making judgment calls about allocation just as you would for traditional software based on criticality and maturity.

Second, accept that production is where real learning happens. Offline evals have value, especially for critical functionality, but shouldn't be viewed as sufficient for understanding real-world performance. The shift toward production monitoring in traditional software engineering provides a useful model.

Third, invest in discovering intents and patterns from production data. This isn't just about finding bugs but understanding how users actually interact with your system, which often differs dramatically from assumptions.

Fourth, architect for modularity and experimentation. The ability to change parts of the system without breaking others becomes more valuable as products mature and user bases grow. Treating tools as sub-agents with clear boundaries enables iteration.

Fifth, develop appropriate signals for your specific product. While some patterns generalize (refusals, task failures, forgetting), every product has domain-specific success and failure modes that require custom detection. The discipline of defining, tracking, and refining these signals pays dividends in product reliability.

Finally, recognize that this is an emerging discipline with evolving best practices. The legal and regulatory environment is establishing that AI outputs carry real liability, the technical landscape is shifting rapidly, and user expectations are forming. Teams that build systematic approaches to production quality now will have significant advantages as the space matures.