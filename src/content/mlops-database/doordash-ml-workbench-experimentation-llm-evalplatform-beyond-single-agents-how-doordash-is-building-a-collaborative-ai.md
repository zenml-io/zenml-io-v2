---
title: "Beyond Single Agents: How DoorDash is building a collaborative AI ecosystem"
slug: "doordash-ml-workbench-experimentation-llm-evalplatform-beyond-single-agents-how-doordash-is-building-a-collaborative-ai"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "metadata-store"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "data-ingestion"
  - "monitoring"
industryTags: "e-commerce"
company: "DoorDash"
companySlug: "doordash"
platformName: "ML Workbench + experimentation + LLM eval/platform"
contentType: "blog"
summary: "DoorDash developed an internal agentic AI platform to serve as a unified cognitive layer over the company's distributed knowledge spanning experimentation platforms, metrics hubs, dashboards, wikis, and team communications. The platform addresses the challenge of context-switching and fragmented information access by implementing an evolutionary architecture that progresses from deterministic workflows to single agents, deep agents, and ultimately agent swarms. Built on foundational capabilities including a high-performance hybrid search engine combining BM25 and semantic search with RRF re-ranking, schema-aware SQL generation with pre-cached examples, and zero-data statistical query validation, the platform democratizes data access across business and engineering teams while maintaining trust through multi-layered guardrails and full provenance tracking."
link: "https://careersatdoordash.com/blog/beyond-single-agents-doordash-building-collaborative-ai-ecosystem/"
year: 2025
seo:
  title: "DoorDash: Beyond Single Agents: How DoorDash is building a collaborative AI ecosystem - ZenML MLOps Database"
  description: "DoorDash developed an internal agentic AI platform to serve as a unified cognitive layer over the company's distributed knowledge spanning experimentation platforms, metrics hubs, dashboards, wikis, and team communications. The platform addresses the challenge of context-switching and fragmented information access by implementing an evolutionary architecture that progresses from deterministic workflows to single agents, deep agents, and ultimately agent swarms. Built on foundational capabilities including a high-performance hybrid search engine combining BM25 and semantic search with RRF re-ranking, schema-aware SQL generation with pre-cached examples, and zero-data statistical query validation, the platform democratizes data access across business and engineering teams while maintaining trust through multi-layered guardrails and full provenance tracking."
  canonical: "https://www.zenml.io/mlops-database/doordash-ml-workbench-experimentation-llm-evalplatform-beyond-single-agents-how-doordash-is-building-a-collaborative-ai"
  ogTitle: "DoorDash: Beyond Single Agents: How DoorDash is building a collaborative AI ecosystem - ZenML MLOps Database"
  ogDescription: "DoorDash developed an internal agentic AI platform to serve as a unified cognitive layer over the company's distributed knowledge spanning experimentation platforms, metrics hubs, dashboards, wikis, and team communications. The platform addresses the challenge of context-switching and fragmented information access by implementing an evolutionary architecture that progresses from deterministic workflows to single agents, deep agents, and ultimately agent swarms. Built on foundational capabilities including a high-performance hybrid search engine combining BM25 and semantic search with RRF re-ranking, schema-aware SQL generation with pre-cached examples, and zero-data statistical query validation, the platform democratizes data access across business and engineering teams while maintaining trust through multi-layered guardrails and full provenance tracking."
mlops:
  source: "sqlite"
  entryId: 161
  sourceUrl: "https://careersatdoordash.com/blog/beyond-single-agents-doordash-building-collaborative-ai-ecosystem/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.615560"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

DoorDash faced a critical knowledge accessibility challenge that hampered operational efficiency and decision-making velocity. The company's institutional knowledge is vast but highly fragmented, distributed across experimentation platforms, metrics hubs, operational dashboards, wiki documentation, and the collective wisdom embedded in Slack conversations. Historically, answering complex business questions required extensive context-switching: searching wikis for definitions, asking clarifying questions in Slack channels, writing custom SQL queries against data warehouses, and filing Jira tickets to request additional analysis. This fragmentation created significant friction, particularly for business leaders and operations managers who needed quick answers to guide high-stakes decisions but lacked the technical skills to query data systems directly or the context to know which data sources were authoritative.

The pain point extended beyond simple information retrieval. Traditional self-service analytics tools, while flexible, proved sub-optimal because they assumed users possessed the technical skills to query data correctly, knew which data sources to consult, and could interpret results without error. These skillset gaps, combined with inconsistent usage patterns and the risk of misinterpretation, limited the effectiveness of self-service approaches for critical or complex analyses. DoorDash needed a solution that could unify this smorgasbord of knowledge into a cohesive whole while democratizing access without sacrificing accuracy, governance, or auditability.

## Architecture & Design

DoorDash's agentic AI platform is architected as a multi-layered system designed to support an evolutionary progression of agentic capabilities, from deterministic workflows to dynamic agent swarms. The platform conceptualizes agent architectures along a continuum of increasing autonomy and intelligence.

### Foundational Layer: Workflows

At the foundation are deterministic workflows represented as directed acyclic graphs. These workflows function like digital assembly lines with pre-defined, sequential steps optimized for repeatable purposes. They serve as the system of record for high-stakes, certified tasks where consistency and governance are paramount. A concrete example is automated report generation for Finance and Strategy teams, where workflows orchestrate data collection from Google Docs, Google Sheets, Snowflake queries, and Slack threads to produce recurring business operations reports, year-over-year trend analyses, and daily growth metrics. The workflow pattern follows a clear pipeline: Snowflake Query → AI Summarizer → Google Docs write, ensuring reliability, speed, and full auditability.

### Agent Layer: Dynamic Reasoning

The next architectural tier introduces single agents that employ the ReAct cognitive architecture, implementing a think-act-observe loop powered by large language models. Unlike rigid workflows, agents dynamically decide which tools to call, what information to retrieve, and what actions to take next based on intermediate observations. The platform's DataExplorer agent exemplifies this pattern: when investigating a query like "Investigate the drop in conversions in the Midwest last week," the agent first disambiguates the request by querying a metrics glossary to define conversions and consulting internal services to identify Midwest states. It then generates precise SQL queries against data warehouses. Upon discovering a conversion drop, it hypothesizes causes—app rollouts, competitor actions, holidays—and autonomously queries the experimentation platform, incident logs, and marketing calendar to isolate correlations. This dynamic tool-driven policy enables exploratory, multi-step analyses that deterministic workflows cannot handle.

### Deep Agent Layer: Hierarchical Collaboration

To overcome single-agent context pollution and enable long-horizon tasks, the platform implements deep agent architectures involving multiple agents organized hierarchically. The system uses a multi-tiered pattern: a manager agent decomposes complex user requests into subtask sequences, a progress agent tracks completion and dependencies, and specialist decision agents execute individual actions. Advanced implementations incorporate reflection agents that review action outcomes, provide error feedback, and dynamically adjust plans. This hierarchical approach relies critically on a persistent workspace or shared memory layer—essentially a stateful artifact store where one agent can create a dataset or code artifact that another agent picks up hours or days later, enabling collaboration beyond any single agent's context window.

### Swarm Layer: Peer Collaboration

At the architectural frontier are agent swarms, representing distributed intelligence with no centralized control hierarchy. Unlike the manager-worker pattern, swarms operate as dynamic networks of peer agents collaborating asynchronously through shared memory and decentralized communication protocols. Agents hand off tasks based on expertise and real-time needs, exhibiting emergent behavior where no single agent has a complete picture but coherent solutions emerge from local interactions. DoorDash's research indicates that true swarm behavior requires a robust agent-to-agent (A2A) protocol handling agent discovery, asynchronous state management, and lifecycle events.

### Core Platform Services

The platform's foundational services include:

**High-performance multistage search engine** built on vector databases combining BM25 keyword search with dense semantic search, followed by a sophisticated re-ranker using reciprocal rank fusion (RRF). This hybrid approach addresses the challenge of finding relevant context quickly across wikis, experimentation results, and thousands of dashboards. The search engine serves as the foundation for all retrieval-augmented generation (RAG) functionalities, ensuring agents ground reasoning in accurate contextual information.

**Schema-aware SQL generation** employing a multi-technique approach. The process begins with RRF-based hybrid search using custom lemmatization fine-tuned for table names to identify appropriate data sources. Once tables are identified, the system uses a DescribeTable AI tool with pre-cached examples stored in an in-memory store. This tool provides agents with compact, engine-agnostic column definitions enriched with concrete example values for each column. These pre-cached examples significantly improve filtering accuracy for dimensional attributes like countries and product types by giving agents concrete values to use in WHERE clauses.

**Zero-Data Statistical Query Validation and Autocorrection** providing multi-stage validation without exposing sensitive data to AI models. The system performs automated linting for code style and markdown enforcement, then executes EXPLAIN-based checks for query correctness and performance against Snowflake and Trino. For deeper validation, the system checks statistical metadata about query results—row counts, mean values of key columns—to identify potential issues like empty result sets before execution. When issues are detected, agents autonomously use this feedback to correct queries. The system also learns from negative user feedback to improve over time.

**LLM-as-judge evaluation framework** systematically running predefined question-and-answer scenarios against agents with an LLM grading responses for accuracy and providing detailed rationale. The platform leverages open-source frameworks like DeepEval to measure faithfulness and contextual relevance, automatically compiling results into reports for performance benchmarking, regression detection, and iteration acceleration.

### Integration Layer

The platform provides access through multiple interfaces: a conversational web UI serving as a centralized marketplace for discovering and interacting with specialized AI agents, direct Slack integration enabling business teams to invoke agents within collaboration channels, and Cursor IDE integration allowing developers to generate code without leaving their development environment. This multi-channel approach eliminates context-switching friction and embeds AI capabilities into existing workflows.

## Technical Implementation

The platform's computational graph architecture is implemented using **LangGraph**, which decomposes complex architectures into executable nodes with defined transitions resembling finite state machines. States represent task steps while transition rules govern how the system moves between states.

The technology stack is built on open standards:

**Model Context Protocol (MCP)** standardizes how agents access tools and data, serving as the bedrock of single-agent capabilities and ensuring secure, auditable interactions with internal knowledge bases and operational tools.

**Agent-to-Agent (A2A) protocol** (in exploration) will standardize inter-agent communication, which DoorDash views as critical for unlocking deep agents and swarms at scale. A2A must handle agent discovery, asynchronous state management, and lifecycle events to enable dynamic collaboration.

The platform employs **Python and Go** for backend services, with specialized components including:

- Vector database for semantic search capabilities
- In-memory store for pre-cached column examples in the DescribeTable tool
- Integration adapters for Snowflake and Trino data warehouses
- Connectors to Google Docs, Google Sheets, Slack, Jira, Confluence, and Sigma
- Custom lemmatization models fine-tuned for internal table naming conventions

The ReAct architecture evolution is noteworthy: early agents used external "scratchpads" to externalize reasoning, but modern implementations benefit from models where intermediate reasoning step generation is fine-tuned during post-training, making the think-act-observe loop intrinsic to model behavior.

## Scale & Performance

While the article doesn't provide extensive quantitative metrics, several scale indicators emerge:

- The platform searches across "thousands of dashboards" and extensive wiki documentation
- The system handles queries against Snowflake and Trino data warehouses at production scale
- SQL validation includes performance optimization to protect data warehouses from costly, inefficient queries
- The evaluation framework runs predefined scenarios continuously to catch regressions
- The marketplace hosts multiple specialized agents accessible to DoorDash employees across business, analytics, and engineering teams

The platform's progression is phased across three stages: Phase 1 (launched) established the agentic platform foundation and marketplace; Phase 2 (in preview) is rolling out the marketplace and implementing first deep-agent systems for complex analyses; Phase 3 (exploration) is investigating A2A protocol support for asynchronous tasks and swarm collaboration.

## Trade-offs & Lessons Learned

DoorDash emphasizes several critical lessons from building this platform:

**Build on solid foundations before advancing complexity.** The team learned that jumping directly to sophisticated multi-agent designs is counterproductive. Advanced systems amplify any inconsistencies in underlying components, so robust single-agent primitives—schema-aware SQL generation, multistage document retrieval—must be perfected first. This foundation ensures that multi-agent systems built on top remain trustworthy.

**Use the right tool for the job.** The platform maintains a portfolio of capabilities suited to different problems rather than replacing one paradigm with another. Deterministic workflows handle certified tasks where reliability and auditability are paramount. Single agents tackle ad-hoc data exploration and day-to-day business questions. Deep agents address complex, long-term analytical projects requiring task decomposition, such as market-level strategic planning. Swarms represent the research frontier for the most complex, real-time logistics challenges.

**Guardrails and provenance are non-negotiable.** Trust is earned through transparency and reliability. The platform implements multi-layered guardrails: common guardrails applying platform-wide (EXPLAIN-based SQL validation), LLM behavior correction for policy and formatting compliance, and custom agent-specific guardrails (preventing a Jira agent from closing tickets in specific projects). Every action is logged with full provenance, enabling users to trace answers back to source queries, documents, and agent interactions. This auditability accelerates debugging and iteration while maintaining trust.

**Memory and context are product choices, not just technical ones.** Persisting every intermediate step bloats context, degrades accuracy, and increases token costs. The team is deliberate about state sharing between agents, often passing only final artifacts rather than full conversational histories. This design choice directly addresses the context pollution problem that limits single-agent performance on long-running tasks.

**Budget the loop to maintain predictability.** To keep latency and costs under control, the platform enforces strict step and time limits with circuit breakers. These controls prevent agentic plans from thrashing indefinitely and ensure the system remains responsive and efficient—essential for shipping capabilities into production workflows where unpredictable runtime is unacceptable.

**Standardization unlocks scalability.** As agents interact with diverse tools, standardized interfaces like MCP become crucial for governance. The platform's commitment to open standards (MCP for tool access, A2A for inter-agent communication) reflects recognition that proprietary protocols limit ecosystem growth and interoperability.

The platform represents a sophisticated approach to democratizing data access while maintaining enterprise-grade reliability. By carefully staging the evolution from workflows to agents to deep agents to swarms, DoorDash has created a system that meets users at their current skill level while progressively unlocking more powerful capabilities as the underlying technology matures. The emphasis on guardrails, provenance, and the deliberate choice of architectural patterns for different use cases demonstrates a mature understanding of the trade-offs inherent in deploying AI systems to guide high-stakes business decisions.
