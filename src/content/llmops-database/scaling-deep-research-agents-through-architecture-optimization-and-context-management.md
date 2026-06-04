---
title: "Scaling Deep Research Agents through Architecture Optimization and Context Management"
slug: "scaling-deep-research-agents-through-architecture-optimization-and-context-management"
draft: false
llmopsTags:
  - "fraud-detection"
  - "data-analysis"
  - "high-stakes-application"
  - "multi-agent-systems"
  - "agent-based"
  - "token-optimization"
  - "memory"
  - "harness-engineering"
  - "evals"
  - "langchain"
  - "crewai"
  - "nvidia"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Tavily / Nebius"
summary: "Tavily, recently acquired by Nebius, developed a production-scale deep research agent serving over 180 enterprise customers and processing 30 billion tokens weekly. The core challenge was managing escalating context windows, quality degradation, and costs as agent execution times stretched from one to ten minutes. Tavily addressed this by transitioning from a ReAct architecture to a supervisor-sub-agent model with context separation, implementing reflection tools enabling agents to distill information between steps rather than carrying full context forward, and achieving a 52.44 score on the Deep Research Bench benchmark while significantly reducing token consumption compared to baseline implementations. This optimization enabled cost-effective scaling while maintaining first-place performance among commercial research agents including Gemini Deep Research and OpenAI's offerings."
link: "https://www.youtube.com/watch?v=HWCm11ZZG7k"
year: 2026
seo:
  title: "Tavily / Nebius: Scaling Deep Research Agents through Architecture Optimization and Context Management - ZenML LLMOps Database"
  description: "Tavily, recently acquired by Nebius, developed a production-scale deep research agent serving over 180 enterprise customers and processing 30 billion tokens weekly. The core challenge was managing escalating context windows, quality degradation, and costs as agent execution times stretched from one to ten minutes. Tavily addressed this by transitioning from a ReAct architecture to a supervisor-sub-agent model with context separation, implementing reflection tools enabling agents to distill information between steps rather than carrying full context forward, and achieving a 52.44 score on the Deep Research Bench benchmark while significantly reducing token consumption compared to baseline implementations. This optimization enabled cost-effective scaling while maintaining first-place performance among commercial research agents including Gemini Deep Research and OpenAI's offerings."
  canonical: "https://www.zenml.io/llmops-database/scaling-deep-research-agents-through-architecture-optimization-and-context-management"
  ogTitle: "Tavily / Nebius: Scaling Deep Research Agents through Architecture Optimization and Context Management - ZenML LLMOps Database"
  ogDescription: "Tavily, recently acquired by Nebius, developed a production-scale deep research agent serving over 180 enterprise customers and processing 30 billion tokens weekly. The core challenge was managing escalating context windows, quality degradation, and costs as agent execution times stretched from one to ten minutes. Tavily addressed this by transitioning from a ReAct architecture to a supervisor-sub-agent model with context separation, implementing reflection tools enabling agents to distill information between steps rather than carrying full context forward, and achieving a 52.44 score on the Deep Research Bench benchmark while significantly reducing token consumption compared to baseline implementations. This optimization enabled cost-effective scaling while maintaining first-place performance among commercial research agents including Gemini Deep Research and OpenAI's offerings."
notion:
  pageId: "373f8dff-2538-80e6-8c92-dfbab7a2280f"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:31:00.000Z"
  lastEditedTime: "2026-06-02T07:31:00.000Z"
  publishedAt: "2026-06-04T08:37:18Z"
---

## Overview and Company Context

Tavily developed and operates a production deep research agent that has been acquired by Nebius, a cloud infrastructure company building AI-native infrastructure from chips to data centers to software. The speaker, Eyal Ben Baruch, led development teams in both Israel and the United States for Tavily. The platform had achieved significant production scale with over one million developers using the service before the acquisition. Nebius itself operates a national data center in Israel featuring over 4,000 B200 GPUs, with 1,000 allocated at discounted rates to Israeli companies, and provides comprehensive support for model training, inference, and fine-tuning across the entire infrastructure stack.

Tavily's core offering provides everything needed to connect agents to the internet, including search capabilities, information extraction, handling large volumes of data, and their flagship deep research agent. The deep research agent accepts research tasks from users or invoking agents, allows specification of the model, schema, and desired output format, then breaks down the task into sub-tasks, executes parallel searches across the internet, and synthesizes results into lengthy, structured reports with citations from across the web.

## Production Scale and Operational Characteristics

The production deployment demonstrates impressive scale metrics. At any given time, over 200 agents are running concurrently in the air. Each invocation triggers approximately 55 different tool calls. On a weekly basis, the system processes 30 billion tokens. The customer base exceeds 180 enterprise clients, including Fortune 500 companies. Use cases span diverse domains: a large credit company uses the system to gather information about users for fraud detection, and multiple companies perform CRM augmentation.

The typical execution time for a research task ranges from one to ten minutes, which introduces substantial operational challenges that become central to the LLMOps strategy. Unlike quick query-response patterns, these long-running agentic workflows accumulate context and complexity over their execution lifecycle.

## Core Technical Challenges

The extended execution times created three interconnected challenges that drove the architectural evolution of the system:

**Context Window Growth**: As context windows expanded with each step of the agent's operation, each subsequent step in the process took progressively longer to execute. The cumulative nature of context meant that early research steps would carry forward through all subsequent operations, creating a compounding effect.

**Quality Degradation**: There was observable concern about quality degradation across steps due to drift and hallucinations. As agents maintained increasingly large contexts across multiple steps, the risk of introducing errors or hallucinating information increased. The speaker noted that another presenter would discuss this challenge in more detail, suggesting it's a recognized industry-wide concern.

**Cost Escalation**: Processing ever-larger numbers of tokens at each step drove costs upward in a problematic trajectory. The economic viability of the service depended on controlling these token consumption patterns.

These challenges are particularly acute for deep research agents because they fundamentally differ from simple question-answering systems. They read numerous pages across the internet, synthesize information, and distill vast amounts of data into focused summaries—a process analogous to how humans conduct research, reading thousands of words but retaining only core ideas that guide the next research phase.

## Architectural Solution: Supervisor and Sub-Agent Pattern

The first major technical intervention involved moving away from the ReAct (Reason and Act) architecture that had been used previously. In the ReAct pattern, an agent has the ability to understand its environment and decide when to take actions. However, this architecture created problems as the agent accumulated more and more context with each step, eventually reaching an undesirable overflow situation.

The team transitioned to a supervisor and sub-agent architecture that fundamentally restructured how work was distributed. In this pattern:

- A supervisor agent acts as the conductor of the entire orchestration
- The supervisor has the capability to activate other sub-agents for each specific task
- Each sub-agent operates with its own isolated context window

This architectural shift delivered three critical benefits:

**Task Decomposition**: Large tasks are broken down into smaller, more manageable tasks that can be handled independently. This natural decomposition mirrors how human researchers break down complex research questions.

**Parallel Execution Capability**: The supervisor agent can activate multiple research sub-agents in parallel rather than sequentially. This parallelization improves both throughput and latency for research tasks.

**Context Separation**: Each sub-agent maintains its own context window and can be highly focused on its specific assigned mission. This context isolation prevents conflicts that could arise when different research threads share the same context space, an issue that plagued the previous ReAct architecture.

The supervisor pattern represents a significant shift in how agentic systems are structured for production use. Rather than a single agent accumulating ever-growing context, the system distributes work across specialized sub-agents with bounded contexts, enabling more predictable resource consumption and improved quality control.

## Reflection Tooling for Context Management

The second major technical intervention involved giving agents the capability to perform reflection on themselves. This addresses the fundamental challenge of how agents manage the information they gather during extensive research operations.

The deep research agent reads numerous pages across the internet during its operation. Rather than carrying forward all the raw content from every page it reads, the agent needed the ability to distill and synthesize this information into a much shorter, focused list that captures the essential insights. This distillation mirrors human research behavior: humans may read thousands of words across articles and papers, but what carries forward is a core idea that guides the next research step.

To illustrate the impact of this approach, the team compared their implementation against a popular open-source baseline agent called LangChain Open Deep Research. In the baseline implementation without reflection, each step in the agent's workflow carries forward all knowledge from the previous step. Knowledge from step one passes to step two, which then passes combined knowledge to step three, and so on. This creates a polynomial dependency on the number of steps the agent executes—a mathematically unfavorable growth pattern that becomes increasingly problematic as research tasks extend.

With Tavily's reflection capability, at each step the agent distills the essential knowledge from that step and passes only this distilled summary to the next step. From step one to step two, only the distilled insight transfers, not all the raw data. From step two to step three, again only the essential distillation moves forward. This approach fundamentally changes the token consumption curve, reducing the context that must be processed at each subsequent step and controlling overall token consumption throughout the research process.

The reflection mechanism represents a critical LLMOps pattern for long-running agentic workflows: rather than accumulating unbounded context, agents actively manage their memory by distilling information at boundaries between operational phases. This is not merely prompt engineering but a fundamental tool made available to the agent as part of its operational toolkit.

## Evaluation Strategy and Benchmarking

Validating these architectural and tooling changes required rigorous evaluation. The team selected the Deep Research Bench benchmark, a well-known industry benchmark designed specifically for evaluating research agents. This benchmark comprises:

- 100 different research test cases
- Coverage across 22 different topics
- Support for two languages: English and Chinese

The benchmark was created by Chinese researchers using a sophisticated methodology. They started with a pool of 90,000 queries, performed classification into 22 topic areas, and brought in over 100 domain experts—specialists in each specific field—to synthesize and prepare the evaluation tasks.

The evaluation methodology itself operates in two distinct parts, addressing both the end-user experience and the underlying retrieval quality:

**End-to-End Report Evaluation**: This component assesses what the user ultimately receives—the comprehensive research report. Each task in the dataset is assigned specific evaluation criteria including comprehensiveness, insight and depth, and instruction-following ability. Notably, the benchmark employs dynamic weighting where another model assigns different weights to different tasks. This reflects the logical principle that a medical research task should be weighted differently than a finance research task, as the nature of required expertise and depth varies across domains. The final report, along with the predetermined criteria, is submitted to an LLM that grades the result.

**Retrieval Quality and Understanding**: The second evaluation component examines what happens behind the scenes—the actual retrieval and comprehension mechanisms. The final report produced by the agent is processed by another model to extract pairs of statements and URLs. Each pair represents a claim made in the report and the source URL cited to support it. Another model then takes each statement-URL pair along with the original URL content and determines whether the page truly supports what the agent claimed it understood and stated. This provides two critical insights: an evaluation of the retrieval quality itself, and verification that the model successfully understood the core idea and performed the information distillation that was intended when processing each specific URL.

This dual evaluation approach is particularly sophisticated because it separately assesses both user-facing quality (the final report) and internal operational quality (retrieval and comprehension accuracy). Many benchmarks focus only on final outputs, but Deep Research Bench explicitly validates the intermediate steps that contribute to research agent reliability.

## Production Results and Performance

The implementation achieved a score of 52.44 on the Deep Research Bench benchmark while consuming significantly fewer tokens than the LangChain Open Deep Research baseline. This result is noteworthy because it demonstrates simultaneous improvement in both quality and efficiency—a combination that's essential for production viability but often difficult to achieve.

In practical operational terms, the token reduction means each execution costs less to run. This enables the company to offer the product at competitive pricing both for their own operations and for their customers, delivering better results at lower cost. The economic implications are substantial given the scale of operations: processing 30 billion tokens weekly means even small per-token efficiency gains translate to significant cost savings.

During the same period when these results were achieved, Tavily held the first-place position globally on the Deep Research Bench benchmark, surpassing prominent competitors including Gemini Deep Research, OpenAI Deep Research, and Claude Research. While the speaker acknowledges that being first on a specific benchmark isn't the ultimate goal—the real objective is delivering maximum value to customers and excelling at their specific tasks—the benchmark performance provides external validation of the technical approach.

The competitive positioning is significant from an LLMOps perspective because it demonstrates that focused architectural optimization and thoughtful context management can enable smaller teams to compete with well-resourced implementations from major AI labs. The supervisor-sub-agent pattern and reflection mechanisms represent reusable LLMOps patterns that aren't dependent on proprietary model capabilities.

## Future Direction: Stateful Agents and Continuous Learning

Looking toward the next generation of agents being built at Tavily, the vision centers on stateful agents that learn from each execution. The goal is for agents to learn from every run that customers execute on the platform. Over time, the agent should:

- Learn the specific domain of each customer
- Understand the glossary and terminology of each company
- Recognize what matters most in particular task types
- Improve progressively as customers run more tasks

This creates a strategic moat through accumulated learning: the more a customer uses the platform, the more difficult it becomes to switch to alternatives because the agent has accumulated customer-specific knowledge and optimization.

The speaker positions this within broader industry trends, noting that major players including Anthropic and OpenAI are already moving into this memory and statefulness territory. What creates stickiness and value-add in modern AI platforms is increasingly the ability of agents and systems to take outputs, evaluate them, synthesize insights, and understand how to improve for the next interaction on their platform.

This represents an evolution in LLMOps thinking: beyond optimizing individual inference runs, production systems are beginning to implement cross-run learning mechanisms that accumulate domain knowledge and user preferences. The technical challenges this introduces—how to store, index, retrieve, and apply learned knowledge across sessions while maintaining privacy and preventing cross-contamination between customers—represent the next frontier of LLMOps complexity.

## Critical Assessment and Balanced Perspective

While the presented results are impressive, several considerations warrant balanced assessment:

**Benchmark Limitations**: The reliance on Deep Research Bench as the primary validation metric, while methodologically sound, represents evaluation on a specific distribution of research tasks. Real-world customer tasks may differ in important ways, and benchmark performance doesn't always perfectly correlate with production success across diverse use cases.

**Token Reduction Claims**: While significant token reduction compared to the LangChain baseline is claimed, the presentation doesn't provide specific quantitative metrics on the magnitude of reduction. Without concrete numbers on token savings, it's difficult to fully assess the economic impact or compare against other potential optimization approaches.

**Quality-Cost Tradeoffs**: The reflection mechanism that distills information between steps introduces potential information loss. While the benchmark results suggest this distillation doesn't harm quality, there may be specific task types or edge cases where carrying more complete context would be beneficial. The system appears optimized for the average case represented in the benchmark.

**Stateful Agent Concerns**: The vision for stateful agents that learn from customer interactions introduces significant challenges around data privacy, model governance, and ensuring that learned patterns from one customer don't inappropriately influence results for others. The presentation acknowledges this is directional work but doesn't detail how these concerns will be addressed.

**Competitive Claims**: While first-place benchmark performance is notable, the competitive landscape evolves rapidly. The comparison to systems like Gemini Deep Research and OpenAI Deep Research reflects a snapshot in time, and these large labs continuously iterate on their implementations.

Despite these considerations, the case study demonstrates sophisticated LLMOps practices for production agentic systems. The systematic identification of operational challenges (context growth, quality degradation, cost), targeted architectural interventions (supervisor pattern, reflection tooling), and rigorous benchmark validation represent a mature approach to scaling LLM-based agents in production environments. The focus on both quality and cost optimization reflects the practical constraints of operating AI systems at scale rather than optimizing for a single metric in isolation.
