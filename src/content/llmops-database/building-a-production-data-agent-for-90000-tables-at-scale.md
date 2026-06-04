---
title: "Building a Production Data Agent for 90,000 Tables at Scale"
slug: "building-a-production-data-agent-for-90000-tables-at-scale"
draft: false
llmopsTags:
  - "data-analysis"
  - "code-generation"
  - "question-answering"
  - "chatbot"
  - "embeddings"
  - "rag"
  - "semantic-search"
  - "vector-search"
  - "prompt-engineering"
  - "agent-based"
  - "memory"
  - "harness-engineering"
  - "chunking"
  - "langchain"
  - "postgresql"
  - "redis"
  - "cache"
  - "pinecone"
  - "chromadb"
  - "qdrant"
  - "fastapi"
  - "spacy"
  - "monitoring"
  - "orchestration"
  - "databases"
  - "open-source"
  - "documentation"
  - "openai"
industryTags: "tech"
company: "OpenAI"
summary: "OpenAI's data platform team built an internal data agent to help ~4,000 users navigate 1.5 exabytes of data across 90,000 datasets. The core challenge was not writing SQL queries but finding the right tables and understanding how to use them semantically, with analysts spending hours before writing any code. The solution was a deliberately simple \"vanilla\" agent architecture powered by GPT-5.5, backed by sophisticated context assembly drawing from six layers of metadata including table usage history, human annotations, automated Codex enrichment of pipeline code, institutional knowledge, memory, and runtime context. The agent answers questions in natural language through Slack or other interfaces, automatically generates and verifies SQL, and has proven reliable enough for critical daily workloads. The same Codex infrastructure also enabled OpenAI to migrate 10,000 DAGs and 600 petabytes across clouds in two months, automate open-source patch releases without human involvement, and amplify support engineers to handle 100x more tickets per day."
link: "https://blog.bytebytego.com/p/how-openai-built-its-data-agent"
year: 2026
seo:
  title: "OpenAI: Building a Production Data Agent for 90,000 Tables at Scale - ZenML LLMOps Database"
  description: "OpenAI's data platform team built an internal data agent to help ~4,000 users navigate 1.5 exabytes of data across 90,000 datasets. The core challenge was not writing SQL queries but finding the right tables and understanding how to use them semantically, with analysts spending hours before writing any code. The solution was a deliberately simple \"vanilla\" agent architecture powered by GPT-5.5, backed by sophisticated context assembly drawing from six layers of metadata including table usage history, human annotations, automated Codex enrichment of pipeline code, institutional knowledge, memory, and runtime context. The agent answers questions in natural language through Slack or other interfaces, automatically generates and verifies SQL, and has proven reliable enough for critical daily workloads. The same Codex infrastructure also enabled OpenAI to migrate 10,000 DAGs and 600 petabytes across clouds in two months, automate open-source patch releases without human involvement, and amplify support engineers to handle 100x more tickets per day."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-data-agent-for-90000-tables-at-scale"
  ogTitle: "OpenAI: Building a Production Data Agent for 90,000 Tables at Scale - ZenML LLMOps Database"
  ogDescription: "OpenAI's data platform team built an internal data agent to help ~4,000 users navigate 1.5 exabytes of data across 90,000 datasets. The core challenge was not writing SQL queries but finding the right tables and understanding how to use them semantically, with analysts spending hours before writing any code. The solution was a deliberately simple \"vanilla\" agent architecture powered by GPT-5.5, backed by sophisticated context assembly drawing from six layers of metadata including table usage history, human annotations, automated Codex enrichment of pipeline code, institutional knowledge, memory, and runtime context. The agent answers questions in natural language through Slack or other interfaces, automatically generates and verifies SQL, and has proven reliable enough for critical daily workloads. The same Codex infrastructure also enabled OpenAI to migrate 10,000 DAGs and 600 petabytes across clouds in two months, automate open-source patch releases without human involvement, and amplify support engineers to handle 100x more tickets per day."
notion:
  pageId: "375f8dff-2538-8083-befe-e383da174c1b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-04T07:55:00.000Z"
  lastEditedTime: "2026-06-04T07:55:00.000Z"
  publishedAt: "2026-06-04T08:02:52Z"
---

## Overview

OpenAI's data platform represents one of the most comprehensive examples of LLMs in production at enterprise scale. As of May 2026, the platform stores 1.5 exabytes of data across 90,000 datasets and serves approximately 4,000 internal users. The data platform team, led by Emma Tang (Head of Data Platform Engineering), built an internal data agent to address a fundamental problem that emerges at this scale: the bottleneck in data analysis is not writing SQL queries but rather discovering which tables to use and understanding their semantic meaning.

The case study is notable for its counterintuitive approach—the team built what they describe as a "vanilla" agent architecture that prioritizes simplicity in the agent itself while investing heavily in data infrastructure and context assembly. This represents a pragmatic LLMOps philosophy where production reliability comes from engineering discipline in the surrounding systems rather than architectural complexity in the agent.

## The Core Problem and User Experience

At OpenAI's scale, many tables appear similar but have crucial semantic differences. Analysts faced significant challenges understanding table grain, join semantics, and subtle differences like whether a table includes logged-out users. This discovery phase consumed hours before any actual coding began. The data agent solves this by allowing users to ask questions in plain English through multiple interfaces including Slack, a web portal, IDE integration, or the Codex CLI through MCP (Model Context Protocol). The agent responds with answers, the SQL it executed, and the tables referenced, providing full transparency into its reasoning process.

## Architecture: Intentionally Simple by Design

The architecture deliberately avoids common complexities seen in many production agentic systems. There is no router directing questions to different models based on complexity, no model fine-tuning, no mixing of multiple LLMs, and no complex retrieval pipelines with specialized embedding models. Instead, the system consists of four main components working together:

**Foundation Model**: Every request goes to GPT-5.5 as the single foundation model. The team relies on this model to generate SQL queries, inspect results, make corrections, and reason toward verified answers. The uniformity simplifies operations and eliminates the complexity of managing multiple model endpoints and routing logic.

**Agent Runtime**: The runtime serves as the orchestration layer that transforms the LLM from a next-token predictor into an action-capable agent. It parses model outputs, dispatches tool calls, feeds results back to the model, and manages the iterative loop that allows the agent to reason, act, observe, and continue until tasks complete. This harness pattern is fundamental to agentic systems—the LLM provides reasoning capabilities while the runtime provides action capabilities.

**Context Assembly Layer**: This is where the most substantial engineering work resides and represents the team's core insight about production LLM systems. The context assembly system draws from six distinct layers to build the information the model needs:

- **Table Usage Metadata**: Includes schemas, lineage information, and historical query patterns. Critically, not all queries receive equal weight—queries from popular dashboards written by data scientists rank highest because they tend to be correct and reusable, while exploratory one-off queries rank lower. This curation improves what the model learns from retrieval.

- **Human Annotations**: Curated descriptions written by table owners capturing business meaning, ownership, criticality levels, and known caveats that cannot be inferred from schemas or query history alone. This human-in-the-loop component adds semantic richness that automated systems cannot capture.

- **Codex Enrichment**: A nightly batch process where Codex crawls pipeline code that produces each table. Processing runs in batches of 100-200 tables with each taking 5-10 minutes. By reading source code, Codex extracts what tables actually contain, derivation logic, freshness guarantees, and guidance on when to prefer one similar table over another.

- **Institutional Knowledge**: Documents from Slack threads, Google Docs, and Notion pages are ingested, embedded, and served through an access-controlled retrieval service. The access control ensures the agent never surfaces information users shouldn't see, addressing a critical production concern for enterprise deployments.

- **Memory**: Both global and personal memory stores corrections and learnings from prior conversations. This allows the agent to start from more accurate baselines rather than repeating previous mistakes, implementing a form of continuous learning from production interactions.

- **Runtime Context**: When offline context is missing or stale, the agent queries the data warehouse directly and can interface with platform systems like Airflow and Spark to fill gaps in real-time.

The first three layers (table usage metadata, human annotations, and Codex enrichment) merge through a daily offline pipeline into single descriptions per table. An embedding model converts each description into a vector for retrieval. At runtime, when questions arrive, relevant table descriptions are retrieved based on semantic similarity between the question embedding and table description embeddings.

**Tools**: The agent has access to exactly 13 carefully curated tools covering company context lookups, internal knowledge bases, big data systems (Airflow, Spark), and metadata services. The tool count represents an important operational lesson—the team initially connected around 40 tools but found this caused the model to select wrong tools and become confused by overlapping functionality. Limiting to 13 non-overlapping tools significantly improved reliability.

## Request Flow: Three-Step Process from Question to Answer

The production system implements a streamlined three-step flow:

**Step 1 - Embed the Question**: User questions are converted to vectors using the same embedding model used for offline table description embedding, ensuring semantic alignment between queries and retrieved context.

**Step 2 - Assemble Context**: The context assembly layer searches the vector store for table descriptions matching the question, combining semantic search with exact text matching. It retrieves relevant institutional knowledge through the access-controlled service and adds applicable memory entries.

**Step 3 - Agent Loop**: With assembled context, the agent enters an iterative loop where it generates SQL, executes it through tools, examines results, and refines until arriving at a verified answer. This loop embodies the agentic pattern of reasoning → action → observation → refinement.

The production reliability of this system stems from context quality prepared before any user question arrives. The six-layer context assembly represents significant upfront engineering investment that enables the simple runtime architecture to work reliably at scale.

## Operational Lessons and Production Insights

The case study surfaces several valuable LLMOps lessons learned from production deployment:

**Data Foundation Over Agent Complexity**: The team emphasizes that their unified, well-structured data foundation matters more than the agent architecture. Every table is produced by code in a single monorepo with enforced conventions. There are no duplicate technologies and the data lake is unified. Strong annotations capture owners, criticality, and freshness requirements. This foundational discipline makes a vanilla agent reliable at exabyte scale, suggesting teams with scattered or inconsistent data should invest in foundations before building agents.

**Tool Curation Matters**: The reduction from 40 to 13 tools dramatically improved performance. In production, overlapping tools return conflicting answers that confuse models. The lesson is that agents need access to the right tools with no functional overlap, not exhaustive access to every company system. This represents thoughtful operational constraint that improves reliability.

**Retrieval Quality Through Ranking**: The team learned that embedding all historical queries for retrieval didn't work—most queries are exploratory one-offs unsuitable as canonical examples. Ranking queries by trustworthiness (heavily-used dashboard queries written by data scientists rank highest) meant the model learned from good patterns rather than bad ones. This insight applies broadly to production RAG systems: what you feed into retrieval determines what you get back.

**Goal Guidance Over Prescriptive Prompting**: Detailed step-by-step instructions in prompts hurt performance. High-level goal guidance with good context and tools produced better results. Modern models excel at planning when well-informed but struggle with rigid procedural instructions. This aligns with emerging best practices in production prompt engineering.

## Extended Codex Use Cases Beyond the Data Agent

The article describes three additional production use cases demonstrating the broader deployment of Codex at OpenAI:

**Cross-Cloud Migration**: OpenAI needed to migrate 90,000 tables and 600 petabytes across clouds due to capacity constraints. The challenge was managing dependency graphs on the order of 100,000 nodes—tables form DAGs where migration order matters and during cutover some tables live on the old cloud while downstream consumers are on the new one. Codex generated hundreds of thousands of pull requests for code changes pointing workloads to the new cloud, with Codex Skills handling testing and validation. A custom system handled dependency ordering and data consistency during cutover. The migration completed in approximately two months—comparable migrations at other companies can take years. This demonstrates Codex operating at massive scale with proper guardrails.

**Automated Open-Source Patch Releases**: OpenAI maintains internal forks of over a dozen open-source tools (Spark, Kafka, Flink, etc.) with custom patches. Previously, engineers babysat releases through long test suites (hours to days), diagnosed failures, and rolled patches to production. A Codex-powered release agent now handles the entire cycle: validates patches against test suites, diagnoses failures, suggests fixes, and rolls to production with team alerting. This has run end-to-end for three to four months without human involvement and without incidents, representing fully autonomous operations for a critical reliability workflow.

**Support Triage and Resolution**: With 5,500 internal users, the platform receives steady support requests about failed pipelines, broken dashboards, and permission issues. A Codex-powered support bot handles common questions directly. For issues requiring investigation, engineers hand off to Codex with minimal context. Codex investigates, finds fixes, and applies them pending engineer approval. This amplified engineers from handling issues in a few hours each to dispatching approximately 100 fixes per day—not because the work became easier but because the engineer became dramatically amplified.

## Critical Assessment

While the article comes from OpenAI describing their own systems, several claims merit balanced evaluation:

**Claims About Simplicity**: The architecture is relatively simple compared to many production agent systems, but "vanilla" understates the sophistication. The six-layer context assembly system with nightly Codex enrichment, ranked query retrieval, memory systems, and access-controlled institutional knowledge represents significant engineering complexity. The simplicity is in the agent runtime and model architecture, not the overall system.

**Migration Timeline**: The two-month timeline for the cross-cloud migration is impressive if accurate, but the article doesn't detail how much preparation preceded the two-month execution window or how many engineers were involved. The custom dependency ordering and consistency system mentioned briefly likely required substantial upfront engineering.

**Unattended Release Automation**: Running open-source patch releases without human involvement for 3-4 months "without a single incident" is a strong reliability claim. The article doesn't specify how many releases occurred in this period or define what constitutes an "incident." However, the general achievement of hands-off automation for this workflow is notable regardless.

**Generalizability**: The lesson that "what made the agent reliable is the engineering around it" is valuable, but OpenAI has unique advantages: access to their own frontier models, Codex infrastructure, unified data platform with monorepo discipline, and substantial engineering resources. The architecture may not transfer directly to organizations without similar foundations.

## Future Directions

The team describes two production roadmap items:

**Custom App Generation**: Moving beyond traditional dashboard widgets to generating full React applications per question, connected to backing stores with proper guardrails. Each app would be tailored to specific user needs and built in seconds. This represents a shift from fixed-interface analytics to freeform, generated-per-query applications.

**Platform-Side Agents**: As Codex amplifies users across OpenAI (frontend engineers "vibe-coding" UIs, researchers spinning up custom pipelines), the platform team faces a new challenge—users ship code faster than the team can review it safely, and some users don't fully understand their own AI-generated code. Examples include bad Flink jobs crashing clusters where users respond "I don't know, I don't know how Flink works, it's vibe-coded." The solution will be platform-side agents to triage incoming code, validate before execution, and absorb the deluge from AI-amplified users. This represents an emerging LLMOps challenge: as agents amplify individual productivity, infrastructure teams need their own agents to maintain safety and reliability at the new pace.

## LLMOps Maturity and Scale

This case study represents mature LLMOps at significant scale. The system serves thousands of users daily for critical workloads, demonstrates thoughtful operational constraints (tool curation, query ranking), implements proper access controls for enterprise deployment, and has been extended to fully autonomous operations in some domains (patch releases). The emphasis on simplicity in agent architecture while investing in data foundations and context engineering offers a valuable counterpoint to increasingly complex agent frameworks. The broader lesson is that production LLM reliability may come more from disciplined engineering of the surrounding systems—data quality, metadata management, retrieval curation, and operational guardrails—than from sophisticated agent architectures.
