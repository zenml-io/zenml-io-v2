---
title: "Scaling Go-to-Market AI Agents at Production Scale"
slug: "scaling-go-to-market-ai-agents-at-production-scale"
draft: false
llmopsTags:
  - "customer-support"
  - "data-analysis"
  - "data-integration"
  - "prompt-engineering"
  - "agent-based"
  - "harness-engineering"
  - "memory"
  - "cost-optimization"
  - "latency-optimization"
  - "token-optimization"
  - "evals"
  - "human-in-the-loop"
  - "langchain"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "orchestration"
  - "databases"
  - "api-gateway"
  - "load-balancing"
  - "microservices"
  - "cicd"
  - "scaling"
  - "serverless"
  - "devops"
  - "open-source"
  - "documentation"
  - "reliability"
  - "scalability"
  - "cache"
  - "anthropic"
industryTags: "tech"
company: "Clay"
summary: "Clay, a go-to-market infrastructure platform, faced the challenge of running AI agents at massive production scale—processing over 350 million agent executions monthly across 40 million companies and 900 million contacts. The company needed to help customers continuously iterate on outbound strategies in an environment where traditional cold email approaches were declining in effectiveness. Clay developed Claygent, a proprietary agent that performs company research and account scoring, processing trillions of tokens weekly. To achieve this scale, they addressed four core challenges: infrastructure reliability by moving from Lambda to ECS with durable workflow execution patterns; throughput optimization through adaptive rate limiting similar to TCP/IP congestion algorithms achieving 4-10x improvements; cost management via strategic prompt caching yielding up to 70% savings and bounded retries; and quality assurance through rich context from proprietary datasets, custom agent harnesses, and both offline and online evaluation systems. The platform enables customers to scan entire addressable markets, layer signals, score accounts, and continuously learn from outcomes."
link: "https://www.youtube.com/watch?v=LmQtSORYPfw"
year: 2026
seo:
  title: "Clay: Scaling Go-to-Market AI Agents at Production Scale - ZenML LLMOps Database"
  description: "Clay, a go-to-market infrastructure platform, faced the challenge of running AI agents at massive production scale—processing over 350 million agent executions monthly across 40 million companies and 900 million contacts. The company needed to help customers continuously iterate on outbound strategies in an environment where traditional cold email approaches were declining in effectiveness. Clay developed Claygent, a proprietary agent that performs company research and account scoring, processing trillions of tokens weekly. To achieve this scale, they addressed four core challenges: infrastructure reliability by moving from Lambda to ECS with durable workflow execution patterns; throughput optimization through adaptive rate limiting similar to TCP/IP congestion algorithms achieving 4-10x improvements; cost management via strategic prompt caching yielding up to 70% savings and bounded retries; and quality assurance through rich context from proprietary datasets, custom agent harnesses, and both offline and online evaluation systems. The platform enables customers to scan entire addressable markets, layer signals, score accounts, and continuously learn from outcomes."
  canonical: "https://www.zenml.io/llmops-database/scaling-go-to-market-ai-agents-at-production-scale"
  ogTitle: "Clay: Scaling Go-to-Market AI Agents at Production Scale - ZenML LLMOps Database"
  ogDescription: "Clay, a go-to-market infrastructure platform, faced the challenge of running AI agents at massive production scale—processing over 350 million agent executions monthly across 40 million companies and 900 million contacts. The company needed to help customers continuously iterate on outbound strategies in an environment where traditional cold email approaches were declining in effectiveness. Clay developed Claygent, a proprietary agent that performs company research and account scoring, processing trillions of tokens weekly. To achieve this scale, they addressed four core challenges: infrastructure reliability by moving from Lambda to ECS with durable workflow execution patterns; throughput optimization through adaptive rate limiting similar to TCP/IP congestion algorithms achieving 4-10x improvements; cost management via strategic prompt caching yielding up to 70% savings and bounded retries; and quality assurance through rich context from proprietary datasets, custom agent harnesses, and both offline and online evaluation systems. The platform enables customers to scan entire addressable markets, layer signals, score accounts, and continuously learn from outcomes."
notion:
  pageId: "389f8dff-2538-80a7-86c6-f719b3a2422d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-24T13:19:00.000Z"
  lastEditedTime: "2026-06-24T13:19:00.000Z"
  publishedAt: "2026-07-01T19:43:19Z"
---

## Overview

Clay operates as a go-to-market infrastructure platform that helps companies build, enrich, and orchestrate lists of companies and people for sales and marketing workflows. The company has built significant expertise in running AI agents at production scale, specifically focused on go-to-market use cases. Their proprietary agent, Claygent, executes over 350 million times per month, processing trillions of tokens weekly across a dataset of over 40 million companies and 900 million contacts. This represents one of the more substantial production deployments of LLM-based agents in the sales technology space.

The core business problem Clay addresses is the declining effectiveness of traditional go-to-market strategies, particularly cold email. Since the release of GPT-4, the ability to write human-sounding emails has become commoditized, leading to inbox saturation and declining deliverability rates. Clay's thesis is that competitive advantage in go-to-market now comes from continuous iteration—specifically, finding better audiences, better timing, better signals, and better positioning than competitors. They refer to this as "go-to-market alpha," drawing an analogy to financial markets where alpha represents outperformance against benchmarks.

Clay identifies three levels of AI deployment in go-to-market: individual access to tools like ChatGPT or Claude for tasks like call analysis; centralized deployment across teams using workspace-level tools; and the creation of non-transferable competitive advantages through custom plays. They observe that most teams get stuck at level one, using AI for low-leverage activities like email copywriting rather than higher-leverage targeting improvements. Their platform aims to enable level three capabilities by allowing customers to scan entire addressable markets, layer on custom signals, use agents for account scoring, and continuously learn from outcomes.

## Infrastructure Architecture

One of the most significant technical challenges Clay faced was infrastructure reliability at scale. The agent workloads are characterized by significant idle time—agents spend most of their execution waiting on browsers, APIs, or inference responses rather than actively computing. This created a mismatch with their initial deployment on AWS Lambda, which charges for wall time and became prohibitively expensive for workloads that involve substantial waiting.

The migration from Lambda to Amazon ECS represented a cost-infrastructure tradeoff. While ECS reduced costs by avoiding charges for idle time, it introduced new reliability challenges including random host failures and the need for more sophisticated failure recovery mechanisms. The solution required re-architecting toward what they describe as durable workflow execution patterns. This involves implementing queues for task management and checkpointing agents at periodic steps to enable recovery from failures without losing progress.

Clay specifically mentions that tools like LangGraph or LangSmith deployments would be valuable for implementing these patterns, suggesting they either use these tools or have built similar capabilities internally. The emphasis on durable workflows reflects a maturity in understanding that production agent systems cannot rely on simple request-response patterns and must be designed for partial failures, retries, and state recovery.

## Rate Limiting and Throughput Optimization

Clay maintains dedicated inference capacity but faces spiky workloads that require careful management to maximize utilization. They emphasize that significant effort goes into keeping GPUs hot at the inference layer, but this optimization is lost at the application layer unless the application properly maximizes available inference capacity. This represents an important observation about the full-stack nature of LLMOps—infrastructure efficiency requires optimization at multiple layers.

To address throughput challenges, Clay built a custom back-pressure system with adaptive throttling against downstream inference providers. The algorithm is explicitly modeled on TCP/IP congestion control: the system sends as much traffic as possible until encountering rate limit issues, then progressively dials back traffic. According to their internal experiments, this approach yields four to ten times higher throughput compared to more naive implementations. This represents a substantial improvement and highlights the value of sophisticated rate limiting strategies for production systems.

Beyond raw throughput, Clay also implemented fairness mechanisms across customers. This prevents scenarios where a single customer running millions of agents crowds out a new customer running their first 10 agents. This kind of multi-tenancy fairness is critical for SaaS platforms but often overlooked in discussions of LLMOps. The specific implementation details aren't provided, but this likely involves some form of queue prioritization or resource allocation based on customer tier and usage patterns.

## Cost Management Strategies

Processing trillions of tokens weekly creates substantial cost pressures. Clay built their own custom agent harness rather than using off-the-shelf frameworks, and one key learning from this was that caching strategies have an outsized impact on agent costs. They designed their agents specifically to maximize cache utilization, achieving up to 70% cost savings with providers like Anthropic. This refers to prompt caching features where repeated portions of prompts are cached and reused at lower cost.

The 70% figure is striking and suggests that a significant portion of Clay's agent prompts contain reusable context that can be cached across executions. This might include company data schemas, task instructions, output format specifications, or other structural elements that remain constant while variable data changes. The emphasis on building agents around caching strategies indicates this wasn't just about enabling a feature but about fundamental architectural decisions in prompt construction and agent design.

A second cost optimization strategy involves bounding retries and tool calls before they sprawl. Clay found that forcing agents to return after a certain number of steps or amount of research often yields better results than allowing unlimited execution. This counterintuitive finding—that constraints improve quality—likely reflects situations where agents pursue unproductive paths or accumulate noise rather than signal when given too much freedom. However, Clay emphasizes this must be done in conjunction with evaluations to ensure the constraints don't harm quality for specific use cases.

The third cost strategy involves measuring costs tied to quality and outcomes rather than treating cost as a standalone metric. This represents a more sophisticated approach than simple cost minimization and acknowledges that the value of an agent execution depends on the quality of its output. This connects directly to their fourth challenge around quality assurance.

## Quality Assurance and Evaluation

Clay's approach to agent quality starts with what they call "great context." Claygent has access to high-quality web data and proprietary go-to-market datasets covering 40 million companies and 900 million contacts. They maintain an entire team dedicated to making this dataset accessible to agents in effective ways. This highlights an often-overlooked aspect of production LLM systems: data engineering and curation remain critical even when using general-purpose language models.

Beyond data quality, Clay tunes their agent harness specifically for go-to-market use cases. They employ both offline and online evaluations to ensure the harness performs well for actual customer use cases. Offline evaluations likely involve curated test sets and benchmark tasks, while online evaluations monitor real production performance. Tools like LangSmith are mentioned as helpful for understanding optimization targets and presumably for tracking evaluation metrics across iterations.

Importantly, Clay views quality as a product problem, not just an engineering problem. They built an agent builder interface that allows users to test and iterate on their agents before running at market scale. This approach of putting iteration tools directly in user hands increases confidence and adoption. It also likely reduces support burden by catching issues during testing rather than production runs, and enables users to optimize for their specific needs rather than relying solely on platform defaults.

## Agent Architecture and Capabilities

Claygent performs company research to determine whether accounts are good candidates to reach out to at specific times. While the presentation doesn't provide detailed implementation specifics, the agent likely combines web browsing, API calls, and data retrieval from Clay's proprietary datasets. The mentions of browsers and APIs in the context of wait time suggest Claygent uses tool calling to interact with external systems rather than relying solely on the LLM's parametric knowledge.

The agent appears to support flexible, user-defined research tasks rather than following a single fixed workflow. The agent builder interface suggests users can specify custom research questions and criteria. Example use cases mentioned include identifying companies hiring for specific roles, tracking GitHub repository stars, monitoring fundraising announcements, and analyzing news articles. These represent diverse signal types that would be difficult to capture through rigid rule-based systems.

Clay is developing what they call agent memory as part of a new product called Audiences. This aggregates go-to-market data from sources like Snowflake, Salesforce, and Gong into a unified repository. The vision is for agents to develop "go-to-market intelligence" where they can recommend plays based on historical attempts and accumulated context, creating a flywheel of continuous improvement. This represents a shift from agents as stateless tools to agents with persistent memory and learning capabilities.

## Technical Challenges in Agent Memory

The development of agent memory introduces additional infrastructure challenges. Clay mentions building virtual file systems capable of reasoning over the context accumulated in Audiences. This likely refers to systems that allow agents to efficiently search, retrieve, and reason over large collections of structured and unstructured data without loading everything into context windows.

Sandboxing is also mentioned as a challenge, though without detail. This could refer to security isolation for agent code execution, data access controls to ensure proper information boundaries between customers, or compute isolation to prevent resource contention. Given the multi-tenant nature of Clay's platform and the sensitivity of go-to-market data, all of these concerns are likely relevant.

## Observability and Feedback Loops

Clay emphasizes observability as a feedback loop that improves agents over time rather than just a monitoring capability. The integration with tools like LangSmith suggests they track metrics like success rates, token usage, latency, tool call patterns, and output quality across large numbers of executions. This data presumably feeds back into prompt engineering, harness tuning, and model selection decisions.

The customer workflow involves scanning addressable markets, layering signals, scoring accounts with agents, acting at appropriate times, and learning from outcomes to iterate. This learning loop requires tracking which strategies lead to positive outcomes like meetings booked or deals closed. Connecting agent outputs to downstream business metrics is essential for demonstrating value but also technically challenging given the time lag between agent execution and ultimate outcomes.

## Assessment and Tradeoffs

Clay's approach represents a mature, production-grade implementation of agentic workflows at substantial scale. The focus on infrastructure reliability, throughput optimization, cost management, and quality assurance reflects hard-won lessons from running hundreds of millions of agent executions. The specific techniques—durable workflows, adaptive rate limiting, prompt caching optimization, bounded retries, and hybrid offline/online evaluation—are grounded in practical experience rather than theoretical possibilities.

However, the presentation is clearly promotional and should be assessed with appropriate skepticism. The claimed 4-10x throughput improvement from adaptive rate limiting and 70% cost savings from caching are impressive but presented without detailed methodology, baseline comparisons, or discussion of variance across different workloads. These figures likely represent best-case scenarios rather than typical results.

The emphasis on building custom infrastructure—a proprietary agent harness, custom rate limiting systems, specialized data preparation pipelines—reflects Clay's specific scale and requirements but may not be necessary or advisable for smaller deployments. The tradeoffs between building versus buying are not discussed, though mentions of tools like LangGraph and LangSmith suggest some recognition of ecosystem solutions.

The vision for agent memory and go-to-market intelligence is compelling but appears to be in development rather than fully realized. The technical challenges mentioned—virtual file systems and sandboxing—are significant, and the presentation doesn't detail how these will be solved. The idea of agents recommending plays based on historical performance is conceptually appealing but raises questions about generalization across different companies, markets, and time periods.

The characterization of go-to-market as fundamentally an engineering challenge may understate the importance of domain expertise, relationship building, and other non-technical factors in sales success. While better targeting certainly improves efficiency, the framing that fixing targeting is "much higher leverage" than creative messaging oversimplifies a complex domain. The best outcomes likely require both thoughtful targeting and compelling messaging, not one at the expense of the other.

Overall, this case study provides valuable insights into the operational challenges of running LLM-based agents at production scale in a multi-tenant environment. The technical approaches to infrastructure, throughput, cost, and quality represent practical patterns that are likely applicable beyond Clay's specific use case. However, the promotional context and lack of detailed metrics warrant careful interpretation of specific claims.
