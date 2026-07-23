---
title: "Building Sustainable AI Products Through Model Agnosticism and Cost Optimization"
slug: "building-sustainable-ai-products-through-model-agnosticism-and-cost-optimization"
draft: false
llmopsTags:
  - "code-generation"
  - "document-processing"
  - "data-analysis"
  - "chatbot"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "token-optimization"
  - "cost-optimization"
  - "latency-optimization"
  - "model-optimization"
  - "evals"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "anthropic"
  - "openai"
  - "meta"
  - "google-gcp"
  - "amazon-aws"
  - "microsoft-azure"
industryTags: "tech"
company: "Notion"
summary: "Notion faced the challenge of building AI-native products at scale while managing escalating token costs and avoiding vendor lock-in with frontier model providers. The company developed a comprehensive strategy centered on model agnosticism, implementing an \"auto model\" that handles 75% of traffic by intelligently routing requests between different models based on task complexity, cost, and latency requirements. By building multimodal model interoperability, leveraging open-weight models for appropriate tasks, using CPU-based workers for deterministic operations, and maintaining detailed evaluation frameworks for entire task trajectories rather than single API calls, Notion achieved sustainable AI economics while delivering state-of-the-art capabilities. This approach enabled them to launch collaborative multi-agent workflows where different AI providers work together in a shared document environment, resulting in significant productivity gains including over three minutes saved per task at scale."
link: "https://www.youtube.com/watch?v=-I5W5QVAT8E"
year: 2026
seo:
  title: "Notion: Building Sustainable AI Products Through Model Agnosticism and Cost Optimization - ZenML LLMOps Database"
  description: "Notion faced the challenge of building AI-native products at scale while managing escalating token costs and avoiding vendor lock-in with frontier model providers. The company developed a comprehensive strategy centered on model agnosticism, implementing an \"auto model\" that handles 75% of traffic by intelligently routing requests between different models based on task complexity, cost, and latency requirements. By building multimodal model interoperability, leveraging open-weight models for appropriate tasks, using CPU-based workers for deterministic operations, and maintaining detailed evaluation frameworks for entire task trajectories rather than single API calls, Notion achieved sustainable AI economics while delivering state-of-the-art capabilities. This approach enabled them to launch collaborative multi-agent workflows where different AI providers work together in a shared document environment, resulting in significant productivity gains including over three minutes saved per task at scale."
  canonical: "https://www.zenml.io/llmops-database/building-sustainable-ai-products-through-model-agnosticism-and-cost-optimization"
  ogTitle: "Notion: Building Sustainable AI Products Through Model Agnosticism and Cost Optimization - ZenML LLMOps Database"
  ogDescription: "Notion faced the challenge of building AI-native products at scale while managing escalating token costs and avoiding vendor lock-in with frontier model providers. The company developed a comprehensive strategy centered on model agnosticism, implementing an \"auto model\" that handles 75% of traffic by intelligently routing requests between different models based on task complexity, cost, and latency requirements. By building multimodal model interoperability, leveraging open-weight models for appropriate tasks, using CPU-based workers for deterministic operations, and maintaining detailed evaluation frameworks for entire task trajectories rather than single API calls, Notion achieved sustainable AI economics while delivering state-of-the-art capabilities. This approach enabled them to launch collaborative multi-agent workflows where different AI providers work together in a shared document environment, resulting in significant productivity gains including over three minutes saved per task at scale."
notion:
  pageId: "3a6f8dff-2538-80dc-ab38-e49aa71c7100"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-23T20:46:00.000Z"
  lastEditedTime: "2026-07-23T20:46:00.000Z"
  publishedAt: "2026-07-23T20:49:59Z"
---

## Overview and Context

Notion, the collaborative workspace platform, has transformed itself into an AI-native company where collaboration happens not just between humans, but between humans and agents, and even between agents themselves. The company conceptualizes AI transformation as a journey from AI as a thought partner to AI as an assistant, then to AI as teammates performing repetitive work, and ultimately to AI as a complete system where multiple processes interface with each other. As of 2026, Notion has been experiencing significant AI usage growth, but the engineering leadership recognized that scaling AI products comes with a critical challenge: cost becomes a structural barrier to entry that prevents companies from building successful AI systems at scale.

The core thesis presented is that most companies struggle to move beyond AI as an assistant because of siloed data and the lack of a durable system of record for collaboration. Notion positions itself as that system of record, but achieving this vision requires navigating extremely complex token economics, rapidly changing model capabilities, and opaque pricing structures from frontier model providers.

## The Economic Challenge

The fundamental problem Notion identified is that token economics in the AI industry create an unsustainable environment for applied AI companies. Several market dynamics compound this challenge. First, when frontier model providers upgrade their reasoning models, they may maintain the same per-token pricing but the new model uses three times as many output tokens, effectively tripling costs without warning. Second, when new model versions are released with different naming schemes, they often come with 40% price increases while the predecessor models are deprecated within months. For companies not growing at these same rates, this creates an impossible situation where either customers or investors receive a bad deal depending on how the product is priced.

The speaker emphasized that Fortune 500 companies can navigate these challenges through large consulting teams and dedicated expertise, but the Fortune 5 million companies lack the leverage to negotiate effectively and become stuck in unfavorable economic situations. A critical insight is that model providers are often competitors to their customers, creating a fundamental misalignment. When you purchase tokens from a provider that also sells first-party products, you're buying at a significant markup compared to what they charge their own customers. Analysis showed dramatic differences between what frontier labs charge end customers for first-party products versus what they sell tokens for to other companies.

## Strategic Approach: Model Agnosticism

Notion's primary strategy for sustainable LLMOps centers on maintaining complete model agnosticism and avoiding vendor lock-in at all costs. The company operates under the principle that optionality is leverage, and if you cannot walk away from a provider at any point, you are making an expensive strategic error regardless of any discounts received.

The company implemented an "auto model" system that handles approximately 75% of their AI traffic. This intelligent routing system makes decisions about which model to use based on the specific requirements of each task, considering the trade-off between cost, capability, and latency. Notion offers customers access to state-of-the-art models from multiple providers while also providing the auto model option, which they describe as their "AI Switzerland" approach, avoiding alignment with any single vendor.

The model agnostic playbook involves several key technical components. First, building for multimodel infrastructure from the start, even though it's technically challenging to switch models mid-transcript and manage cache invalidation. Second, thinking about the entire harness as supporting model interoperability rather than being optimized for a single provider. Third, evaluating not just cost per token but cost per capability per second across entire task trajectories rather than single API calls.

An important example given was their partnership with Perplexity as a web search provider. While Perplexity might not appear cheapest when looking at latency of a single call or token cost in isolation, when evaluating entire web search trajectories with the granularity required to understand all trade-offs, it proved superior. This level of evaluation expertise enables better decision-making than relying on vendor-provided benchmarks.

## Open-Weight Models and Strategic Positioning

Notion views open-weight models as playing two critical roles in their LLMOps strategy. First, they lower the barrier to entry on cost for customers by providing credible alternatives for many tasks. Second, they provide negotiation leverage by putting downward pressure on pricing from the oligopoly of frontier providers. The company noted that as of 2026, open-weight models like DeepSeek V3 and GLM 4 have reached parity with or exceeded GPT-4 class models for many tasks, representing a fundamental shift from when open models were only suitable for small supervised fine-tuning tasks.

The strategic insight is that companies don't need to use the absolute best model for every task. The gap between frontier and open-weight capabilities eventually closes for any given capability level, so if current open-weight models are good enough for a specific task today, companies should be prepared to use them. The recommendation is to evaluate whether open-weight models meet requirements without relying solely on external benchmarks, but instead developing internal expertise on tool errors, actual latency needs, and task-specific performance.

## Beyond GPU Compute: Workers and Deterministic Operations

A significant cost optimization comes from recognizing that not every task requires GPU inference. Notion launched a feature called "workers" that executes discrete pieces of code on CPUs rather than using LLMs. The examples given include converting CSV files to PDFs, executing deterministic SQL queries, and handling tool calls through command-line interfaces. Using LLMs for these deterministic operations is identified as a primary way companies become "token poor" very quickly. By routing deterministic work to CPU-based execution, Notion reduces both cost and latency while improving reliability.

## Task Classification and Traffic Pattern Understanding

Central to Notion's approach is developing deep expertise in understanding their specific traffic patterns and task complexity requirements. The company emphasized that not all traffic is equal and sending everything to the most capable and expensive model like Claude Opus represents both a missed opportunity and a money-losing proposition. For example, large-scale data analysis might warrant using Opus, but using it to triage an email inbox would be "ripping off" both customers and the company itself.

The company built internal classification systems to understand task complexity and route accordingly. They noted that the definition of frontier versus everyday tasks, and what constitutes saturated capabilities or model capability overhangs, depends entirely on product-specific expertise that cannot be replaced by general benchmarks or vendor recommendations. This expertise becomes a defensible moat.

## Model Provider Dynamics and Pricing Strategy

Notion's analysis of the frontier model market characterized it as a functional oligopoly with specific pricing dynamics. The best performing model can price at premium levels because everything beyond current AI capabilities represents their market. The second-best model only needs to be marginally cheaper to capture the remainder of the market. This creates a situation where price does not correlate with capability growth, and the leading model provider changes frequently.

The company identified a red flag when applied AI companies become too closely associated with specific labs through marketing partnerships, often in exchange for discounts. Looking at benchmark performance over time shows that the frontier leader changes regularly, so committing to a single provider means delivering a suboptimal product to customers roughly half the time. The conclusion is that the discount is never worth the loss in optionality, and the engineering investment in model interoperability pays for itself through both better capabilities and stronger negotiating position.

The company also noted that they provide expertise on use cases back to frontier labs through their evaluation program partnerships, and this expertise exchange proves more valuable than extremely large financial commits in maintaining good relationships with providers.

## Evaluation Framework

Notion developed sophisticated evaluation frameworks that assess entire task trajectories rather than individual API calls. This granularity enables them to make optimal decisions that consider cost, capability, and latency holistically. They create custom benchmarks specific to their use cases rather than relying on published benchmarks, understanding metrics like tool error rates and actual latency requirements in production contexts. The company publishes some benchmark results, though intentionally keeping some data slightly stale for competitive reasons, while still demonstrating their methodology for evaluating models across different dimensions relevant to their specific workflows.

## Multi-Agent Orchestration

Beyond cost optimization, Notion identified security and orchestration as the next major challenges for AI systems. They introduced the concept of the "lethal trifecta" where systems combining access to private data, exposure to untrusted content, and ability to communicate externally create significant security risks that increase with autonomy. Managing what agents see, what actions they can perform, and what persists becomes critical.

Notion built a collaborative multi-agent system where different AI agents from different providers can work together in shared document environments. In their demo, they showed workflows where Claude agents can scope tasks, team members can be tagged in for questions, Decagon agents can collect customer voice data, and Coder agents can generate pull requests. This orchestration happens within active Notion documents rather than static markdown files, enabling human oversight and intervention at any point. The company uses this system internally for product development, with most polish work and large feedback items coordinated through software factories that involve both writing to appropriate teams and having coding agents take initial implementation steps.

## Governance and Visibility

The company emphasized AI governance as a critical component of their LLMOps strategy, including visibility into who uses data, maintainability controls, and the ability to offer customers different governance options. When maintaining model optionality, organizations can provide customers with more choice and control over how their data is processed and which models are used, which becomes increasingly important for enterprise customers with specific compliance requirements.

## Production Results and Impact

Notion reported seeing massive ROI gains from customers using their multi-agent systems, with more than three minutes saved on average per task. When scaled across organizations, this represents significant productivity improvements. The company's internal usage demonstrates the viability of the approach, with their software factories handling the full lifecycle from staging to shipping to closing tasks.

The company's AI usage in 2026 showed strong growth patterns, and they expressed pride in their ability to scale sustainably while maintaining cost discipline. The speaker emphasized that they share their learnings openly through communities like AI Engineer because they believe the market is young, exceptionally opaque, and moving fast, and that all AI companies owe it to their customers to be critical thinkers about navigating these challenges together.

## Philosophical Stance

Throughout the presentation, the speaker advocated strongly for building value that transcends tokens. The argument is that applied AI companies cannot win by competing on token economics with providers who build models natively. Instead, success comes from product excellence, building data flywheels, understanding customers better than anyone else, knowing when you need capability versus low price versus latency improvements, and building compelling UI and orchestration that justifies the markup on tokens that are resold. The job is not to train the best model but to build the best product using many models, betting on frontier capabilities rather than specific labs.

The overall message emphasized sustainability in AI product development, with the assertion that cost is currently one of the largest reasons why AI systems fail to achieve scale successfully. For anyone working in applied AI, understanding the trade-offs required to build durable, exciting, and valuable products for customers should be a core competency. The model agnostic approach, combined with deep expertise in task classification, evaluation, and orchestration, represents Notion's path to building an AI-native company that can weather the rapidly changing landscape of model capabilities and pricing.
