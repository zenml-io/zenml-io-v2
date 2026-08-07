---
title: "Building an AI Data Agent for Enterprise-Scale Analytics"
slug: "building-an-ai-data-agent-for-enterprise-scale-analytics"
draft: false
llmopsTags:
  - "data-analysis"
  - "code-interpretation"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "agent-based"
  - "memory"
  - "harness-engineering"
  - "evals"
  - "langchain"
  - "openai"
industryTags: "tech"
company: "OpenAI"
summary: "OpenAI built a custom internal AI data agent to address the challenges of analyzing data at scale across 600 petabytes and 70,000 datasets serving 3,500 internal users. The agent enables employees across all functions to go from question to insight in minutes rather than days by combining natural language interfaces with code-enriched context, self-learning memory systems, and multi-layered data understanding. Built using OpenAI's own tools (Codex, GPT-5, Evals API, and Embeddings API), the agent handles end-to-end analytics workflows including data discovery, SQL generation, iterative refinement, and report publishing while maintaining existing security and access controls. The system demonstrates production LLM deployment through systematic evaluation, continuous learning from user corrections, and integration of multiple context layers to ensure accuracy and reliability."
link: "https://openai.com/index/inside-our-in-house-data-agent/"
year: 2026
seo:
  title: "OpenAI: Building an AI Data Agent for Enterprise-Scale Analytics - ZenML LLMOps Database"
  description: "OpenAI built a custom internal AI data agent to address the challenges of analyzing data at scale across 600 petabytes and 70,000 datasets serving 3,500 internal users. The agent enables employees across all functions to go from question to insight in minutes rather than days by combining natural language interfaces with code-enriched context, self-learning memory systems, and multi-layered data understanding. Built using OpenAI's own tools (Codex, GPT-5, Evals API, and Embeddings API), the agent handles end-to-end analytics workflows including data discovery, SQL generation, iterative refinement, and report publishing while maintaining existing security and access controls. The system demonstrates production LLM deployment through systematic evaluation, continuous learning from user corrections, and integration of multiple context layers to ensure accuracy and reliability."
  canonical: "https://www.zenml.io/llmops-database/building-an-ai-data-agent-for-enterprise-scale-analytics"
  ogTitle: "OpenAI: Building an AI Data Agent for Enterprise-Scale Analytics - ZenML LLMOps Database"
  ogDescription: "OpenAI built a custom internal AI data agent to address the challenges of analyzing data at scale across 600 petabytes and 70,000 datasets serving 3,500 internal users. The agent enables employees across all functions to go from question to insight in minutes rather than days by combining natural language interfaces with code-enriched context, self-learning memory systems, and multi-layered data understanding. Built using OpenAI's own tools (Codex, GPT-5, Evals API, and Embeddings API), the agent handles end-to-end analytics workflows including data discovery, SQL generation, iterative refinement, and report publishing while maintaining existing security and access controls. The system demonstrates production LLM deployment through systematic evaluation, continuous learning from user corrections, and integration of multiple context layers to ensure accuracy and reliability."
notion:
  pageId: "3b5f8dff-2538-8074-9fa6-de7695b68a0d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T13:12:00.000Z"
  lastEditedTime: "2026-08-07T13:12:00.000Z"
  publishedAt: "2026-08-07T13:22:58Z"
---

## Overview

OpenAI developed a bespoke internal AI data agent to solve a critical scaling challenge: enabling over 3,500 employees across Engineering, Product, Research, Finance, and Go-to-Market functions to efficiently analyze and reason over 600 petabytes of data spanning 70,000 datasets. This case study provides a detailed look at how a major AI company approaches LLMOps for an internal production system, revealing both the technical architecture and practical lessons learned from deploying an agent at enterprise scale.

The agent represents a comprehensive production LLM application that goes beyond simple question-answering to handle complete analytical workflows. It discovers data, writes and executes SQL queries, reasons through problems iteratively, learns from corrections, and publishes results—all while respecting existing security boundaries and access controls. While the text is promotional in nature (OpenAI is showcasing their own capabilities), it provides valuable technical details about context management, evaluation strategies, and failure modes that offer genuine insights into production LLM deployment challenges.

## The Problem Space

At OpenAI's scale, data analysis faced significant friction points. Simply finding the correct table among 70,000 datasets consumed substantial analyst time, particularly because many tables appeared similar but had subtle critical differences—some included logged-out users while others didn't, some had overlapping fields with unclear distinctions, and relationships between tables were often opaque. Even after identifying the right tables, analysts faced challenges ensuring correctness in their queries. Common failure modes included many-to-many joins creating incorrect results, filter pushdown errors, unhandled null values, and complex SQL statements spanning 180+ lines where verifying correctness became extremely difficult.

The broader organizational challenge was democratizing data access beyond specialized data teams. OpenAI needed employees across all functions to perform nuanced analysis without deep SQL expertise or extensive knowledge of the data warehouse structure. The goal was reducing time-to-insight from days to minutes while maintaining accuracy and respecting security boundaries.

## Technical Architecture and LLMOps Implementation

The agent is built using OpenAI's own production tools: Codex for code understanding, GPT-5 as the flagship reasoning model, the Evals API for systematic testing, and the Embeddings API for context retrieval. This choice demonstrates a "dogfooding" approach where OpenAI uses the same APIs they offer to external developers, providing confidence that the underlying tools are production-ready.

### Multi-Layered Context System

The most sophisticated aspect of the LLMOps implementation is the six-layer context system that grounds the agent in accurate, relevant information. This represents a mature approach to retrieval-augmented generation (RAG) that goes well beyond simple document embedding.

**Layer 1: Table Usage** provides metadata grounding through schema information (column names, data types) and table lineage showing upstream and downstream relationships. The system also ingests historical queries to understand typical join patterns and query structures. This layer helps the agent learn common usage patterns from actual analyst behavior.

**Layer 2: Human Annotations** captures curated descriptions from domain experts that provide business meaning, semantic intent, and known caveats that cannot be inferred from schemas alone. This recognizes that automated metadata extraction has limits and that human expertise remains essential for capturing nuanced understanding.

**Layer 3: Codex Enrichment** represents a particularly innovative approach. Rather than relying solely on table schemas, the agent uses Codex to derive code-level definitions by analyzing how tables are actually created. By examining the pipeline code, Spark jobs, and transformation logic, the agent understands critical details like data freshness guarantees, scope limitations, granularity levels, and whether certain fields are excluded. This code-level understanding reveals the true semantics of data in ways that warehouse metadata cannot capture. The system automatically refreshes this context, eliminating manual maintenance burden.

**Layer 4: Institutional Knowledge** integrates content from Slack, Google Docs, and Notion to capture company-specific context including launches, reliability incidents, internal codenames, tool documentation, and canonical metric definitions. These documents are embedded and stored with metadata and permissions, with a retrieval service handling access control and caching at runtime. This ensures the agent understands OpenAI-specific terminology and business context.

**Layer 5: Memory** implements a self-learning system where the agent saves corrections and discoveries for future use. When users provide corrections or when the agent discovers nuances about specific data questions, these learnings are stored at both global and personal levels. The memory system is crucial for capturing non-obvious filters, constraints, and edge cases that are difficult to infer from other layers. For example, the agent learned how to filter for particular analytics experiments by matching specific strings defined in experiment gates—knowledge that required explicit correction but then persisted for all future queries. Users can manually create, edit, and manage memories, and the agent prompts to save important learnings during conversations.

**Layer 6: Runtime Context** allows the agent to issue live queries to the data warehouse when no prior context exists or when information is stale. This enables real-time schema validation and data inspection. The agent can also communicate with other Data Platform systems including metadata services, Airflow, and Spark to gather broader context beyond the warehouse itself.

The context pipeline runs as a daily offline process that aggregates table usage, annotations, and Codex enrichment into normalized representations. These are converted to embeddings using OpenAI's Embeddings API and stored for retrieval. At query time, the agent uses RAG to pull only the most relevant context rather than scanning raw metadata, keeping latency predictable even across tens of thousands of tables.

### Agentic Reasoning and Self-Correction

The agent implements a closed-loop reasoning process that distinguishes it from simple query generation tools. Rather than following fixed scripts, it evaluates its own progress continuously. If an intermediate result appears incorrect—for example, returning zero rows due to an incorrect join or filter—the agent investigates the failure, adjusts its approach, and retries. This self-correction capability shifts iteration from the user to the agent itself, enabling faster convergence on correct results.

The system maintains full context across conversation turns, allowing users to ask follow-up questions, adjust intent, or change direction without restating previous information. Users can interrupt mid-analysis to redirect the agent, creating an interaction model that resembles working with a human collaborator. When instructions are unclear or incomplete, the agent proactively asks clarifying questions. If no response is provided, it applies sensible defaults to maintain progress—for example, assuming a 7-day or 30-day window when no date range is specified.

This design works equally well for both exploratory analysis ("I'm seeing a dip here, can we break this down by customer type and timeframe?") and specific targeted queries ("Tell me about this table"). The agent introduced workflows to package recurring analyses into reusable instruction sets for routine work like weekly business reports and table validations, encoding context and best practices once for consistent results across users.

## Evaluation and Quality Assurance

OpenAI's approach to evaluation represents mature LLMOps practice, recognizing that "quality can drift just as easily as it can improve" without systematic testing. The evaluation system is built on curated question-answer pairs, where each question targets an important metric or analytical pattern paired with a manually authored "golden" SQL query producing the expected result.

For each eval, the natural language question is sent to the query generation endpoint, the generated SQL is executed, and outputs are compared against expected SQL results. Critically, the evaluation doesn't rely on naive string matching, since generated SQL can differ syntactically while remaining semantically correct, and result sets may include extra columns that don't affect the answer's validity. Instead, the system compares both SQL structure and resulting data, feeding these signals into OpenAI's Evals grader which produces scores with explanations capturing both correctness and acceptable variation.

These evals function like unit tests that run continuously during development to identify regressions and serve as canaries in production for catching issues early. This enables confident iteration as capabilities expand, addressing a critical challenge in production LLM systems where model updates or prompt changes can introduce subtle regressions.

## Security and Access Control

The agent operates as a pure interface layer, inheriting and enforcing OpenAI's existing security and access-control model rather than implementing separate permissions. All access is strictly pass-through, meaning users can only query tables they already have permission to access. When access is missing, the agent flags this or falls back to alternative datasets the user is authorized to use.

The system emphasizes transparency by exposing its reasoning process, summarizing assumptions and execution steps alongside each answer. When queries are executed, it provides direct links to underlying results, allowing users to inspect raw data and verify every analytical step. This transparency is essential for building trust in an agent that can make mistakes and for enabling users to catch and correct errors.

## Lessons Learned: LLMOps in Practice

The case study surfaces several valuable lessons about production agent deployment that reflect real engineering challenges rather than marketing claims.

**Less is More**: Early versions exposed the full tool set to the agent, creating problems with overlapping functionality. While redundancy can help humans who understand subtle distinctions between similar tools, it confuses agents. OpenAI restricted and consolidated tool calls to reduce ambiguity and improve reliability. This lesson highlights that agent architectures require different design patterns than human-facing APIs.

**Guide the Goal, Not the Path**: Highly prescriptive prompting degraded results. While many analytical questions share general patterns, details vary enough that rigid instructions often pushed the agent down incorrect paths. Shifting to higher-level guidance and relying on GPT-5's reasoning to choose execution paths produced more robust results. This suggests that over-engineering prompts can backfire, and that modern models benefit from strategic flexibility.

**Meaning Lives in Code**: Schemas and query history describe table shape and usage, but true meaning lives in the code that produces tables. Pipeline logic captures assumptions, freshness guarantees, and business intent that never surface in SQL or metadata. Crawling the codebase with Codex enabled the agent to understand how datasets are actually constructed, answering "what's in here" and "when can I use it" far more accurately than warehouse signals alone. This lesson emphasizes that effective LLMOps for data applications requires understanding data lineage at the code level, not just the schema level.

## Critical Assessment

While this case study provides valuable technical detail, several caveats deserve consideration. First, OpenAI is showcasing their own products (GPT-5, Codex, Evals API, Embeddings API), creating inherent bias toward demonstrating success. The text doesn't quantify specific performance metrics—we don't know actual accuracy rates, failure rates, or how often the agent produces incorrect results that users must catch and correct.

The claim that the agent reduces time from "days to minutes" is not backed by specific measurements or comparison data. Similarly, while the memory system is described as continuously improving the agent, there's no discussion of how memory conflicts are resolved, how memory quality is maintained over time, or what happens when stored memories become outdated as data structures evolve.

The evaluation approach, while systematic, relies on manually authored "golden" SQL queries—an approach that requires significant ongoing maintenance and may not catch all edge cases. The text doesn't discuss how comprehensive the eval coverage is or how they prioritize which scenarios to include.

Security is described as "pass-through," but the text doesn't address potential risks like the agent inadvertently combining data from multiple tables in ways that reveal information beyond what individual table access would permit, or how they handle cases where reasoning traces might leak information about data the user shouldn't directly access.

Despite these limitations in what's disclosed, the case study demonstrates several genuine LLMOps best practices: systematic evaluation with continuous monitoring, multi-layered context management, self-correction through iterative reasoning, transparency in exposing reasoning processes, and learning from production use through memory systems. The technical architecture reveals thoughtful engineering around real production challenges like context window management, latency control, and accuracy verification.

## Production Deployment Insights

The case study reveals that successful production LLM deployment for complex analytical tasks requires far more than just a powerful base model. The six-layer context system, evaluation infrastructure, memory management, and security integration represent substantial engineering investment beyond the core LLM capabilities. This aligns with industry experience showing that production LLM applications require significant infrastructure, not just API calls to foundation models.

The emphasis on continuous evaluation and the willingness to share lessons about what didn't work (overly prescriptive prompting, too many overlapping tools) suggests genuine operational learning rather than purely promotional content. The integration with existing security models and the focus on transparency reflect mature thinking about enterprise deployment requirements.

The agent's ability to operate across 70,000 datasets while maintaining reasonable latency demonstrates that RAG-based approaches can scale to very large knowledge bases when properly architected. The combination of offline context preparation, embedding-based retrieval, and runtime query capabilities shows how to balance comprehensiveness with performance.

Overall, while this case study serves OpenAI's marketing interests, it provides substantial technical detail about production LLMOps practices for agentic systems at scale, offering valuable insights into context management, evaluation strategies, and the engineering required to deploy reliable AI agents in enterprise environments.
