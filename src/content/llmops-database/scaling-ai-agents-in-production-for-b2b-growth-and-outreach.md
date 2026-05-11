---
title: "Scaling AI Agents in Production for B2B Growth and Outreach"
slug: "scaling-ai-agents-in-production-for-b2b-growth-and-outreach"
draft: false
llmopsTags:
  - "customer-support"
  - "data-analysis"
  - "summarization"
  - "classification"
  - "agent-based"
  - "prompt-engineering"
  - "few-shot"
  - "cost-optimization"
  - "harness-engineering"
  - "evals"
  - "human-in-the-loop"
  - "langchain"
  - "monitoring"
  - "open-source"
  - "documentation"
  - "anthropic"
  - "openai"
  - "microsoft-azure"
industryTags: "tech"
company: "Clay"
summary: "Clay, a creative tool for B2B growth and customer acquisition, scaled their AI agent infrastructure from early chat completion wrappers to operating 300 million agent runs per month. The company deployed multiple specialized agents across finding, closing, and growing customers, with individual agents running 10-30 steps involving web research, data synthesis, and content generation. To manage this scale while maintaining quality and cost efficiency, Clay implemented comprehensive LLMOps practices using LangSmith for observability, tracing, evaluation, and cost reconciliation, achieving 99.5% accuracy in tracking spending across inference providers while enabling rapid iteration and debugging across engineering and customer support teams."
link: "https://www.youtube.com/watch?v=cx6_tb6HCeY"
year: 2026
seo:
  title: "Clay: Scaling AI Agents in Production for B2B Growth and Outreach - ZenML LLMOps Database"
  description: "Clay, a creative tool for B2B growth and customer acquisition, scaled their AI agent infrastructure from early chat completion wrappers to operating 300 million agent runs per month. The company deployed multiple specialized agents across finding, closing, and growing customers, with individual agents running 10-30 steps involving web research, data synthesis, and content generation. To manage this scale while maintaining quality and cost efficiency, Clay implemented comprehensive LLMOps practices using LangSmith for observability, tracing, evaluation, and cost reconciliation, achieving 99.5% accuracy in tracking spending across inference providers while enabling rapid iteration and debugging across engineering and customer support teams."
  canonical: "https://www.zenml.io/llmops-database/scaling-ai-agents-in-production-for-b2b-growth-and-outreach"
  ogTitle: "Clay: Scaling AI Agents in Production for B2B Growth and Outreach - ZenML LLMOps Database"
  ogDescription: "Clay, a creative tool for B2B growth and customer acquisition, scaled their AI agent infrastructure from early chat completion wrappers to operating 300 million agent runs per month. The company deployed multiple specialized agents across finding, closing, and growing customers, with individual agents running 10-30 steps involving web research, data synthesis, and content generation. To manage this scale while maintaining quality and cost efficiency, Clay implemented comprehensive LLMOps practices using LangSmith for observability, tracing, evaluation, and cost reconciliation, achieving 99.5% accuracy in tracking spending across inference providers while enabling rapid iteration and debugging across engineering and customer support teams."
notion:
  pageId: "35df8dff-2538-804c-98c0-f177d0811951"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-11T20:33:00.000Z"
  lastEditedTime: "2026-05-11T20:33:00.000Z"
  publishedAt: "2026-05-11T20:39:22Z"
---

## Overview

Clay operates as a creative tool for B2B growth, enabling companies to build targeted lists of companies and people, enrich them with data through traditional providers and AI-powered web research, and activate those lists for outbound campaigns and lead routing. What makes this case study particularly significant from an LLMOps perspective is the scale at which Clay operates AI agents in production and the sophisticated infrastructure they've built to manage quality, cost, and throughput at that scale. The company runs approximately 300 million agent runs per month, with AI growing not just in absolute terms as the business expanded, but as an increasing percentage of overall platform actions over time.

Clay's journey with AI began as what they describe as "effectively a chat completions wrapper," initially focusing on use cases like summarizing long documents and writing outbound copy. However, they were early observers of an emerging user behavior pattern: customers were manually scraping webpages and deterministically using AI to summarize or extract insights from those pages. This observation led to the development of Claygent, their AI web research agent, launched in mid-2023 shortly after GPT-4's release. This early adoption demonstrates how user behavior insights can drive agent development, as they essentially automated and formalized a workflow that users were already attempting to piece together manually.

## Agent Architecture and Scope

The company structures its agent capabilities around three core verbs from their mission statement: finding, closing, and growing best customers. For each of these activities, they have deployed specialized agents. Their agentic search product handles TAM sourcing and finding best customers by searching through the web or their database of companies and people. Account agents use reasoning to research and determine whether companies meet ideal customer profile criteria. Engagement and closing agents handle outbound messaging through their native sequencer.

Individual agent runs have grown in complexity over time, now averaging between 10 to 30 steps per run. These steps involve a mix of activities including synthesizing web documents, searching the web, crawling different pages, and performing various data transformations. The growth in agent complexity is attributed both to improvements in underlying language models and to refinements in Clay's agent architecture. The agents handle primarily natural language inputs, though there may be some structuring of what gets passed to the agent internally. Users interact with blank text boxes that accept any input, which presents significant challenges for quality assurance and evaluation.

## Model Strategy and Routing

Clay takes a deliberately model-agnostic approach, allowing users to select their preferred model provider. This reflects a practical recognition that models are not yet completely interchangeable and exhibit different writing styles and performance profiles for different types of work. Users have developed preferences over time, with some favoring Anthropic models and others preferring OpenAI models for different use cases.

To manage this complexity, Clay developed a metaprompting tool that automatically maps prompts to different models based on the profile that best suits the underlying question. When new models are released, which happens frequently, Clay adds new mappings to the metaprompting tool based on evaluation results. This allows them to provide appropriate model recommendations to users while supporting the flexibility that their customer base demands. The evaluation process helps determine which models are best suited for which use cases, enabling more informed routing decisions.

## Quality Assurance and Evaluation

Clay focuses on three key dimensions for their agent operations: quality of agent runs, throughput efficiency, and cost. Quality measurement proves particularly challenging given the diversity of use cases and the subjective nature of what constitutes correct data. They employ a mix of evaluation methods to assess quality. Some evaluations are purely factual, checking whether agents retrieve correct answers against ground truth data. For structured outputs, they can perform deterministic matches. However, many use cases involve agents compiling research into paragraph-length answers or combining research with synthesis into recommendations for qualification or outbound messaging. For these more complex outputs, Clay employs LLM-as-a-judge techniques to score quality.

The breadth of what users do with agents makes pre-production quality assurance insufficient. Users can put anything in a blank text box, creating an enormous range of possible inputs and expected outputs. This reality necessitates robust production monitoring and post-deployment evaluation capabilities. Clay uses offline evaluations to benchmark quality against cost and throughput positions, allowing them to make informed tradeoffs across these three dimensions.

## Development Process and Observability

Clay built their own agent harness from scratch on top of the Vercel AI SDK and integrated it with LangSmith for observability and development support. The integration was straightforward, requiring roughly a one-line change to begin exporting traces to LangSmith. This ease of integration is what enables them to turn on tracing from day zero of any new agent development.

Tracing becomes part of the iteration process itself, with developers actively examining LangSmith traces while building agents. Without this visibility, developers would only see what gets exposed to end users, missing the entire agent trace that reveals what's actually happening under the hood. This is particularly important given the complexity of their agents, which may involve nested subagents and multiple LLM calls through tool invocations.

LangSmith serves two primary purposes in their workflow. First, it supports zero-to-one agent building across their growing portfolio of agents spanning the go-to-market stack, including agentic search and account reasoning agents. Second, it provides production insights by profiling production traffic to understand patterns that would be impossible to track manually at their scale. These patterns include usage behaviors, cost distributions, errors, latency issues, and underlying quality metrics. Critically, LangSmith enables customer-level analysis, allowing them to investigate specific customer reports and understand what actually happened versus what was reported.

The ability to diagnose where in the stack problems occur proves particularly valuable when customers report quality issues. They can trace whether a problem originated from a tool malfunction or an inference issue, enabling more targeted debugging and resolution. With 25 to 50 people at Clay having access to LangSmith, including some customer support team members, the platform has evolved beyond purely an engineering tool to support customer debugging as well. This broader access was part of their initial evaluation criteria for the platform.

## Cost Management and Reconciliation

Cost observability emerged as a critical requirement for operating at Clay's scale. Before implementing LangSmith, they lacked a good understanding of where they were spending money across different inference providers. LangSmith now provides approximately 99 to 99.5 percent reconciliation between their tracked data and actual bills from inference providers, giving them nearly complete coverage of spending. This level of cost visibility has proven valuable to their finance team and enables more informed decisions about model selection and usage patterns.

The ability to export traces to Snowflake allows Clay to perform deeper analysis on traces over time, combining observability data with their broader data warehouse infrastructure. This integration supports more sophisticated analytics around agent performance, cost trends, and usage patterns.

## Platform Performance and Reliability

At Clay's scale, platform speed and reliability become critical requirements. They emphasize the importance of rapid trace ingestion and the overall reliability of LangSmith's ingestion pipeline. When operating hundreds of millions of agent runs per month, any performance degradation or ingestion failures can quickly compound into significant operational issues. The UI and UX of the observability platform also matters considerably, as they need to onboard many engineers across the company to work on AI products. Quick comprehension of traces and intuitive navigation accelerate both onboarding and day-to-day debugging.

## Emerging Patterns and Future Directions

Clay is observing several trends in how agents are evolving. They're seeing longer-running agents that take many more steps and potentially run for extended time periods. These longer-horizon agents benefit from features like threads in LangSmith that help track agent activity over time. They're also experimenting more with subagents, where the ability to see all agent traces together in one unified view becomes particularly helpful.

The company has experimented with file systems and append-only logs to support agents working on similar tasks over iterations, though they note that many memory tools available today haven't yet achieved product-market fit. They haven't seen compelling examples where current memory tools clearly benefit their use cases. The concept of continual learning or having agents improve over time on the same task remains aspirational rather than practical with current tools.

Looking forward, Clay is interested in enabling coding agents to pull down traces and use production data to fix themselves, creating more self-healing workflows. They're exploring background agents as part of their software development lifecycle, inspired by approaches from companies like Ramp, though they haven't yet closed the loop with production traces in this context. They're also intrigued by the skills paradigm, where large numbers of traces could inform skill development and improvement over time.

## Advice for Scaling

For organizations not yet at Clay's scale, their primary advice centers on building capabilities to understand different types of questions and behaviors that agents exhibit. While manual review and direct customer conversations suffice at small scale, these approaches break down as agent runs reach hundreds of thousands or millions. Online evaluators become essential for understanding agent behavior at scale, allowing automated assessment of what would be impossible to review manually.

The insights product capabilities in LangSmith help identify patterns in user behavior and agent actions across large volumes of runs. This pattern recognition becomes critical for understanding what's actually happening in production when individual review is no longer feasible.

## Critical Assessment

While this case study demonstrates impressive scale and sophisticated LLMOps practices, several caveats deserve mention. The conversation represents a discussion between Clay's AI team lead and the CEO of LangChain, the company behind LangSmith, which naturally frames LangSmith favorably. The claimed 99.5 percent cost reconciliation rate is impressive but lacks detail about what comprises the remaining 0.5 percent or what challenges existed in achieving this level of accuracy.

The model-agnostic approach, while positioned as user empowerment, may also reflect the current reality that no single model provider dominates across all use cases. The metaprompting tool that routes to different models represents additional complexity in their stack. The acknowledgment that memory tools haven't yet achieved product-market fit suggests that some aspects of more sophisticated agent capabilities remain aspirational.

The emphasis on scale throughout the discussion is notable, but the case study provides limited detail about accuracy rates, customer satisfaction metrics, or business outcomes beyond the ability to track costs effectively. The claim of 300 million agent runs per month is impressive from a throughput perspective but doesn't necessarily indicate that all those runs produce valuable outcomes.

Nevertheless, this case study offers valuable insights into the practical realities of operating AI agents at significant scale, the importance of comprehensive observability and evaluation infrastructure, and the ongoing challenges in areas like quality measurement, cost management, and agent memory. Clay's experience suggests that organizations should invest in robust LLMOps infrastructure early, as capabilities like detailed tracing and cost tracking become increasingly difficult to retrofit as scale grows.
