---
title: "Building Production Analytics Agents with Semantic Layer Integration"
slug: "building-production-analytics-agents-with-semantic-layer-integration"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "692d5d7ceddeb614e8b1d818"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:30:29.988Z"
  createdOn: "2025-12-01T09:18:52.688Z"
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "chatbot"
  - "structured-output"
  - "prompt-engineering"
  - "rag"
  - "semantic-search"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "chunking"
  - "system-prompts"
  - "evals"
  - "langchain"
  - "llama-index"
  - "fastapi"
  - "docker"
  - "kubernetes"
  - "cicd"
  - "monitoring"
  - "databases"
  - "postgresql"
  - "sqlite"
  - "cache"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "openai"
  - "databricks"
  - "microsoft-azure"
industryTags: "tech"
company: "Wobby"
summary: "Wobby, a company that helps business teams get insights from their data warehouses in under one minute, shares their journey building production-ready analytics agents over two years. The team developed three specialized agents (Quick, Deep, and Steward) that work with semantic layers to answer business questions. Their solution emphasizes Slack/Teams integration for adoption, building their own semantic layer to encode business logic, preferring prompt-based logic over complex workflows, implementing comprehensive testing strategies beyond just evals, and optimizing for latency through caching and progressive disclosure. The approach led to successful adoption by clients, with analytics agents being actively used in production to handle ad-hoc business intelligence queries."
link: "https://www.youtube.com/watch?v=xa47e9hc4RM"
year: 2025
seo:
  title: "Wobby: Building Production Analytics Agents with Semantic Layer Integration - ZenML LLMOps Database"
  description: "Wobby, a company that helps business teams get insights from their data warehouses in under one minute, shares their journey building production-ready analytics agents over two years. The team developed three specialized agents (Quick, Deep, and Steward) that work with semantic layers to answer business questions. Their solution emphasizes Slack/Teams integration for adoption, building their own semantic layer to encode business logic, preferring prompt-based logic over complex workflows, implementing comprehensive testing strategies beyond just evals, and optimizing for latency through caching and progressive disclosure. The approach led to successful adoption by clients, with analytics agents being actively used in production to handle ad-hoc business intelligence queries."
  canonical: "https://www.zenml.io/llmops-database/building-production-analytics-agents-with-semantic-layer-integration"
  ogTitle: "Wobby: Building Production Analytics Agents with Semantic Layer Integration - ZenML LLMOps Database"
  ogDescription: "Wobby, a company that helps business teams get insights from their data warehouses in under one minute, shares their journey building production-ready analytics agents over two years. The team developed three specialized agents (Quick, Deep, and Steward) that work with semantic layers to answer business questions. Their solution emphasizes Slack/Teams integration for adoption, building their own semantic layer to encode business logic, preferring prompt-based logic over complex workflows, implementing comprehensive testing strategies beyond just evals, and optimizing for latency through caching and progressive disclosure. The approach led to successful adoption by clients, with analytics agents being actively used in production to handle ad-hoc business intelligence queries."
---

## Overview

Wobby is a company that has spent approximately two years building production analytics agents designed to help business teams extract insights from their data warehouses in under one minute. The presentation by Quinton, who leads AI engineering at Wobby, offers a deeply pragmatic and sometimes contrarian perspective on building and deploying LLM-based agents in production environments. The company has developed three distinct analytics agents: the Quick agent for straightforward everyday questions, the Deep agent for open-ended research queries, and the Steward agent which helps build and maintain the semantic layer that encodes business logic.

The case study is particularly notable for its emphasis on non-technical factors like user adoption through communication channels, the critical importance of semantic layers and business context, and a strong preference for comprehensive testing over evaluation-heavy approaches. Wobby's journey represents a realistic account of the challenges, pivots, and pragmatic decisions required to build agents that actually get used in production business environments.

## Communication Channels and User Adoption

One of Wobby's most distinctive insights is placing communication channel integration and user experience at the forefront of their success formula, rather than treating it as an afterthought. The team found that adoption of an agent is fundamentally more than just a chat UI—it's about creating a "group feeling" where people naturally adopt the technology. This insight was validated by client feedback indicating that Slack and Teams integrations were key reasons for rapid agent adoption.

The company integrated their agents directly into Slack and Microsoft Teams, allowing business users to interact with analytics agents in their existing workflows. These integrations proved more complex than anticipated, requiring significant engineering effort to handle different UX constraints between platforms. For example, Slack allows onboarding workflows that help business teams understand how to query agents and receive answers in different modes, while Teams has different capabilities and limitations.

A critical benefit of the group chat approach is the emergence of "bright business people" who ask creative questions, helping demonstrate successful agent usage to peers. This creates healthy peer pressure and social proof that encourages broader adoption. Additionally, having customer support personnel present in these channels allows the team to observe failure modes in real-time, adding problematic queries to their evaluation datasets for debugging and improvement.

## Business Logic Awareness and Semantic Layers

Wobby's second major insight centers on the absolute necessity of encoding business logic and context for text-to-SQL applications. The team uses a compelling analogy: if you gave a smart person full access to your data catalog who had never seen it before and asked them to produce valid queries for key business metrics, they would likely fail—and so would an agent without proper context.

Initially, the team overindexed on text-to-SQL benchmarks like Spider and BIRD, attempting to achieve high scores on these academic datasets. However, they discovered that even the best teams in the world plateau at around 80% performance on these benchmarks, which contain broken and ambiguous queries. The fundamental problem isn't SQL syntax—it's the contextual understanding of what the data represents and how it relates to business processes.

Wobby's first approach involved building agents that used RAG with parameterized query templates—essentially a library of "golden" SQL queries that could be reused with different parameters. The hope was that providing context through these examples would help agents adopt to business-specific needs. However, this approach resulted in 100+ similar-looking SQL queries that created more review work for analysts and didn't align with how BI teams actually operate day-to-day.

The breakthrough came with their second version, which involved building a semantic layer—a logical abstraction that sits between raw database tables (the physical layer) and dashboards. This semantic layer encodes business logic using concepts familiar to BI teams: metrics, dimensions, and organized SQL queries that follow the "don't repeat yourself" principle. In database terminology, this separates the physical layer (raw data) from the logical layer (business concepts).

This architectural decision led to a multi-agent system: the analytics agents (Quick and Deep) only interact with the logical semantic layer and never touch raw data, while the Steward agent has access to both the physical layer and can suggest and create new dimensions, metrics, and KPIs in the semantic layer. This division better aligns with how BI teams and data governance processes actually work.

Wobby made the ambitious decision to build their own semantic layer rather than solely integrating with existing solutions like dbt's Metric Flow, Cube, or DataBricks' offerings. This decision was enabled by modern AI-assisted coding and the availability of open-source semantic layer projects to reference. The team needed a solution that was "agent-first" and could provide integrations across multiple existing semantic layer platforms. Their semantic layer includes its own SQL compiler that references entities in the logical layer and translates queries to different SQL dialects.

The Steward agent plays a unique role in this ecosystem. It can connect to documentation sources (ideally through protocols like MCP in secure environments, though in practice often through PDF exports) and helps build out the semantic layer by suggesting dimensions and metrics. There's a lifecycle management approach where changes to the semantic layer are tested in separate environments before being merged into production, similar to software development practices.

## Code Architecture and Framework Decisions

Wobby's approach to code architecture reflects hard-won lessons about framework selection and maintainability. When they started building two years ago, popular agent frameworks were not yet in their v1 release cycles, and the team was skeptical about adopting frameworks after experiencing "questionable abstractions and breaking APIs" from early versions of tools like LangChain.

Rather than adopting multi-agent network frameworks or MCP (Model Context Protocol) server architectures, Wobby opted for clean architecture principles based on Uncle Bob's approach. They built around stable interfaces that different parts of the software stack depend on, giving them direct control over what happens at the app layer versus the agent layer. This flexibility was critical because some responsibilities naturally belonged in the application layer rather than being managed entirely by an agent framework.

Useful abstractions they implemented include:

- Event loops and semaphores for concurrency control to prevent agents from being overwhelmed with simultaneous tasks
- Message history using the OpenAI harmony format (system, user, tool, assistant messages)
- Storing state in message metadata rather than maintaining separate state objects
- Factory pattern for agent creation from a single location in the codebase
- Wrappers around external APIs to insulate against UX and breaking changes
- Cloud code for interruptions, human-in-the-loop patterns, and dual permissioning
- WebSockets for fast response times despite the complexity

Notably, several popular patterns proved not useful for their use case:

- MCP (Model Context Protocol): Having a separate server for tool execution didn't fit their architecture
- ReAct prompting: Not effective for their domain
- Multi-agent networks: Added unnecessary context and complexity, making debugging harder

## Testing Philosophy: Tests Before Evals

One of Wobby's most contrarian positions is that evaluations (evals) are "overhyped for early stage projects." Coming from machine learning engineering backgrounds where the focus is data → model → product, the team realized that in production engineering, you must focus on product first. This means erring on the side of comprehensive test cases before investing heavily in evaluation infrastructure.

The key insight is recognizing when something is a bug versus when it's a performance question. If a tool doesn't return correct data due to an access management issue, or if a semantic search doesn't yield expected results, or if API response processing loses information—these are bugs that should be caught by automated tests in CI/CD pipelines, not discovered through evals.

Wobby uses a "Swiss cheese model" for thinking about testing in layers, where bugs travel from left to right and different layers catch different types of issues. Earlier layers (like unit tests for prompt formatting, checking for consistent markdown headers, handling completion service downtime) are easier to implement and should catch common issues. Later layers (like comprehensive evals) are harder to implement and should focus on agent performance across different configurations rather than catching bugs that could be prevented earlier.

This doesn't mean evals aren't important—they are critical for measuring agent performance on representative datasets and comparing different agent configurations. But the team found that mixing concerns by putting basic functionality testing into the eval layer makes debugging harder and creates unnecessary complexity.

Wobby's eval infrastructure consists of a Streamlit app that can spawn as a job container, potentially integrating into CI pipelines. They emphasize documentation and collaboration, encouraging their own team to use agents against their own database so that when errors occur, they can be added to eval datasets. This creates a feedback loop between real usage and quality improvement.

## Prompts Over Workflows

Another significant architectural decision was preferring logic in prompts over deterministic workflows. Initially, the conventional wisdom suggested that workflows were better than agents because they're easier to test, more deterministic, and represent better system design. Agents were seen as suitable only for rare, highly non-deterministic cases like open-ended chat.

However, Wobby found that as large language models improved in instruction-following capabilities, putting logic in prompts became increasingly practical and offered significant advantages:

- **Portability**: A prompt is a single artifact that encodes logic, making it easier to version, compare, and deploy different configurations
- **Testing simplicity**: With workflows, every branch and path must be tested separately, and interactions between steps create complex failure modes. With prompt-based logic, there's a single location for the logic
- **A/B testing**: Comparing different agent behaviors is simpler when the differences are captured in prompt variations rather than workflow topology changes

The team acknowledges this is domain-specific and that workflows still have their place for single-completion scenarios. But for their text-to-SQL analytics use case, prompt-based logic aligned better with modern LLM capabilities. This is what Andrej Karpathy calls "programming the neural net"—as small language models become exceptionally good at following instructions, there's a strong case for more portable logic encoded directly in prompts.

That said, Wobby recognizes that simple questions don't always have simple answers, so they manage user expectations about response times and ensure users understand when complex queries might take longer.

## Evaluation Methodology

For evaluation, Wobby developed a "composite quality metric" approach designed specifically for text-to-SQL applications. The fundamental challenge is that text-to-SQL is inherently an offline evaluation problem—you cannot judge if a generated SQL query is correct in an online setting without a reference query to compare against.

Their evaluation framework includes:

- **Input configuration sampling**: Testing with clear tasks versus ambiguous tasks, using parameters to sample different scenarios from evaluation datasets
- **Trajectory analysis**: Tracking which tools agents call in which steps and what follows, helping identify bug patterns in specific states
- **Multiple judges**: Using multiple LLM evaluators to reduce variance in evaluation scores
- **Reasoning-first structured output**: Having judges provide reasoning before scoring to improve explanation quality and add explainability for score analysis
- **Composite scoring**: Combining different metrics into a single signal inspired by manufacturing's "Overall Equipment Effectiveness"

The composite scoring approach is particularly sophisticated. Different agent trajectories (paths through the tool-calling process) can end in different states, and it's important to have a single comparable metric across all trajectories. Their weighted score considers both the trajectory taken and the expected outcomes for that specific path, allowing for interpretable comparisons even when agents solve problems in different ways.

This "Overall Agent Effectiveness" score enables the team to track performance across agent runs regardless of how the agent reaches its conclusions, providing a single interpretable metric for agent quality.

## Latency Optimization

Wobby places significant emphasis on latency optimization, operating under the principle that faster agents get used more frequently. Their latency optimization strategies include:

- **Scrapping fixed workflows**: Avoiding rigid intent detection steps that add latency upfront
- **Progressive disclosure**: Revealing information and taking actions incrementally rather than in fixed sequences
- **Compression on large schemas**: Reducing the token count of schema information passed to models
- **Message history pruning**: Removing older context when it's no longer relevant
- **JSON output compression**: Minimizing token usage in structured outputs
- **Caching**: Particularly important for system prompts and tool definitions that don't change frequently between requests
- **Interleaved thinking**: Prompting agents to include reasoning in tool call content rather than making separate "thinking" tool calls, saving round trips while maintaining explainability

These optimizations reflect a deep understanding of the token-level economics of LLM applications and the user experience impact of response latency.

## Observability and Monitoring

For observability, Wobby takes a multi-tool approach using both LangFuse and Logfire, recognizing that different tools have different strengths:

- **LangFuse**: Open source, excellent for drilling into traces to see exactly what goes into and comes out of LLMs. Strong for debugging agent reasoning and tool calls
- **Logfire**: More powerful for application-level observability metrics and comprehensive monitoring

Their strategy involves using decorators to wrap functions that call LLMs, ensuring that inputs and outputs are captured regardless of whether the function succeeds, errors, or calls other functions. They built their own wrappers that call both LangFuse and Logfire, rather than depending directly on either API. This abstraction layer protects them from breaking changes when observability platforms update their APIs from v2 to v3, preventing disruption to their observability infrastructure.

The team emphasizes building wrappers around all external APIs, not just observability tools, to maintain flexibility and reduce the impact of external changes on their codebase.

## Data Representation and Format

Wobby experimented with different data representation formats for presenting query results and schema information to agents. They evaluated trending formats like Tson (which uses abbreviations and compression) but were concerned that since Tson isn't widely represented in LLM training data, models might not reliably follow its conventions without extensive system prompt additions.

Instead, they use the Tablib library to format dataframes in various formats and tested which table representations led to better agent performance. They found that GitHub-flavored markdown tables work well, likely because large amounts of LLM training data comes from GitHub. The compression benefits of formats like Tson matter, but standard markdown tables proved sufficient for their needs.

## Business Context and Data Quality Challenges

A recurring theme in the presentation is that the technical challenge of text-to-SQL is fundamentally a context and data quality problem. Many companies don't have trustworthy, well-governed data ecosystems. Simply unleashing an agent on poorly organized data with unclear business definitions will produce wrong results.

The iterative process of building and refining the semantic layer is actually where the value emerges. As business teams use agents and encounter errors, they identify missing context or ambiguous definitions. Adding these to the semantic layer and evaluation datasets creates a virtuous cycle where the agent becomes increasingly accurate for that specific business context.

Wobby positions themselves not just as a tool provider but as a partner helping data engineering teams build proper semantic layers and well-governed data ecosystems. The promise of useful agents provides motivation for companies to invest in data governance—something that was often deprioritized despite everyone recognizing its importance.

For companies with data distributed across multiple systems with non-interoperable language, Wobby's pragmatic approach is to focus on teams that have already consolidated data into a data warehouse. They considered building a cross-data-source query engine (referencing IBIS engine as an example) but chose not to pursue this initially, focusing instead on working with single data warehouses that aggregate data from multiple sources.

## Competitive Landscape

The competitive landscape includes major data platform vendors building their own agent capabilities:

- **Snowflake Cortex Analyst**: Works with logical layers
- **Microsoft Fabric Agent**: Uses golden queries for context (an approach Wobby moved away from)
- **DataBricks Genie**: Interestingly, Wobby notes that at conferences, different teams within DataBricks (Genie team vs. BI team) weren't collaborating closely, despite the tight coupling between agent performance and semantic layer design

Wobby differentiates by building agent-first semantic layer capabilities with interoperability across multiple platforms, rather than being locked into a single data platform vendor's ecosystem.

## Recommendations for New Startups

When asked what advice they'd give to a new startup designing data systems from scratch to be agent-ready, Quinton emphasized:

- **Domain-driven design**: Carefully modeling business domain objects and abstractions
- **Ontology**: Capturing the semantic model of the business—the concepts, relationships, and business rules
- **Reusability**: Ensuring business concepts are reused consistently across tables and queries
- **Interoperability**: The field lacks standards for semantic layer interoperability across platforms (dbt Metric Flow, DataBricks, Snowflake each have their own approaches), which creates challenges for tooling that needs to work across environments

He referenced Dave Knemeyer's work on enterprise ontology, noting there's a spectrum from very formal business ontology with RDF mappings to more lightweight YAML representations that developers find practical. The right balance depends on the use case, but having some formal representation of business semantics is crucial.

## Deployment and Production Realities

The case study is refreshingly honest about the realities of production deployment. Wobby acknowledges that it's "not a walk in the park"—you can't just give business teams an agent and expect success. It requires:

- Continuous iteration and support
- Business people engaged in Slack/Teams channels actively using and refining agent interactions
- Customer support personnel monitoring for failures
- Quality engineering teams capturing failure modes and adding them to test and eval datasets
- Investment in building and maintaining the semantic layer that encodes business context

The vision of answering queries in "under one minute" is aspirational and requires alignment across multiple teams with different responsibilities—data engineering, data governance, business analysts. Wobby positions themselves as facilitating this alignment, helping teams think through their data organization and agent deployment together.

The user adoption curve shown in the presentation (linear growth over time with two different analytics agents) demonstrates real production usage in logistics and finance analytics contexts, with agents being assigned to increasing numbers of tasks over time.

## Philosophical Approach

Throughout the presentation, Quinton emphasizes pragmatism over dogma. He's willing to challenge conventional wisdom (evals over tests, workflows over agents) when their production experience suggests different tradeoffs. At the same time, he acknowledges these are domain-specific insights for their particular use case (business intelligence and analytics), and different domains might reach different conclusions.

The emphasis on "clean code" principles, stable interfaces, comprehensive testing, and gradual iteration reflects software engineering discipline applied to the relatively new field of production LLM applications. Rather than chasing the latest trends (multi-agent networks, MCP servers, trending data formats), the team focuses on what actually works in production for their specific problem domain.

This balanced, experience-based perspective makes the case study particularly valuable for teams building production LLM applications, offering both technical specifics and higher-level strategic guidance grounded in real deployment challenges.