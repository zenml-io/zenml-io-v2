---
title: "Building a Production Text-to-SQL Assistant with Multi-Agent Architecture"
slug: "building-a-production-text-to-sql-assistant-with-multi-agent-architecture"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67725e54f00a0567caae6e81"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:50:51.180Z"
  createdOn: "2024-12-30T08:48:20.536Z"
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "structured-output"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "multi-agent-systems"
  - "agent-based"
  - "error-handling"
  - "system-prompts"
  - "langchain"
  - "fastapi"
  - "documentation"
  - "monitoring"
  - "databases"
  - "elasticsearch"
  - "microsoft-azure"
industryTags: "tech"
company: "LinkedIn"
summary: "LinkedIn developed SQL Bot, an AI-powered assistant integrated within their DARWIN data science platform, to help employees access data insights independently. The system uses a multi-agent architecture built on LangChain and LangGraph, combining retrieval-augmented generation with knowledge graphs and LLM-based ranking and correction systems. The solution has been deployed successfully with hundreds of users across LinkedIn's business verticals, achieving a 95% query accuracy satisfaction rate and demonstrating particular success with its query debugging feature."
link: "https://www.linkedin.com/blog/engineering/ai/practical-text-to-sql-for-data-analytics"
year: 2024
seo:
  title: "LinkedIn: Building a Production Text-to-SQL Assistant with Multi-Agent Architecture - ZenML LLMOps Database"
  description: "LinkedIn developed SQL Bot, an AI-powered assistant integrated within their DARWIN data science platform, to help employees access data insights independently. The system uses a multi-agent architecture built on LangChain and LangGraph, combining retrieval-augmented generation with knowledge graphs and LLM-based ranking and correction systems. The solution has been deployed successfully with hundreds of users across LinkedIn's business verticals, achieving a 95% query accuracy satisfaction rate and demonstrating particular success with its query debugging feature."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-text-to-sql-assistant-with-multi-agent-architecture"
  ogTitle: "LinkedIn: Building a Production Text-to-SQL Assistant with Multi-Agent Architecture - ZenML LLMOps Database"
  ogDescription: "LinkedIn developed SQL Bot, an AI-powered assistant integrated within their DARWIN data science platform, to help employees access data insights independently. The system uses a multi-agent architecture built on LangChain and LangGraph, combining retrieval-augmented generation with knowledge graphs and LLM-based ranking and correction systems. The solution has been deployed successfully with hundreds of users across LinkedIn's business verticals, achieving a 95% query accuracy satisfaction rate and demonstrating particular success with its query debugging feature."
---

## Overview

LinkedIn developed SQL Bot as part of their data democratization efforts to address a common pain point in tech companies: data experts spending substantial time helping colleagues find and query data instead of focusing on complex analysis and strategic initiatives. This case study represents a mature, production-grade deployment of LLMs for text-to-SQL conversion, integrated into LinkedIn's internal DARWIN data science platform.

The project has been in development for over a year with a virtual team spanning domain expertise across priority product areas. The system is now used by hundreds of employees across LinkedIn's diverse business verticals, demonstrating successful enterprise-scale LLM deployment. The blog post, published in December 2024, provides valuable insights into the practical challenges of building text-to-SQL systems at enterprise scale.

## Technical Architecture

SQL Bot is implemented as a multi-agent system built on LangChain and LangGraph, two popular frameworks for building LLM-powered applications. The architecture follows a RAG (Retrieval-Augmented Generation) pattern where context such as table schemas, example queries, and domain knowledge are retrieved and passed to an LLM to generate SQL queries.

The system handles user questions through an intent classification layer that routes requests to appropriate flows. This is important because users don't just want SQL queries—they also want to find tables, ask questions about datasets, see reference queries, or get help with query syntax. Open-ended follow-up chats are handled by a dedicated agent, enabling conversational interactions.

## Strategy 1: Quality Table Metadata and Personalized Retrieval

LinkedIn uses Embedding-Based Retrieval (EBR) to retrieve context semantically relevant to user questions. However, the team faced several challenges that required innovative solutions:

**Handling Incomplete Metadata**: A common challenge in enterprise environments is the absence or incompleteness of table descriptions. LinkedIn addressed this through a dataset certification effort where domain experts identified key tables within their areas and provided mandatory table descriptions and optional field descriptions. These descriptions were augmented with AI-generated annotations based on existing documentation and Slack discussions.

**Scale Challenges**: With millions of tables in LinkedIn's data warehouse, the team needed strategies to narrow down the search space. They use access popularity to reduce the volume to a few thousand tables quickly. However, this alone isn't sufficient because user questions often contain implicit context.

**Personalization**: The same question (e.g., "What was the average CTR yesterday?") should be answered differently depending on whether the user works in email notifications, ads, or search quality. LinkedIn solves this by inferring default datasets for users based on the organizational chart and applying Independent Component Analysis (ICA) across user-dataset access history to develop components (sets of datasets) corresponding to different business use cases. Results are personalized using the top components relevant to each user.

**Automated Data Pipeline Maintenance**: Tables and fields are deprecated or added over time. To handle this, LinkedIn automatically ingests popular queried tables into their vector store and uses deprecation signals from DataHub (their metadata search and discovery tool) to automatically offboard datasets and fields.

## Strategy 2: Knowledge Graph and LLMs for Ranking, Writing, and Self-Correction

The system uses a knowledge graph to organize information beyond just tables and fields. Nodes include users, table clusters, tables, and fields with attributes derived from DataHub, query logs, and crowdsourced domain knowledge. The knowledge graph incorporates:

- Table schemas, field descriptions, top K values for categorical dimension fields, partition keys, and field classifications (metrics, dimensions, attributes) from DataHub
- Domain knowledge collected from users via SQL Bot's UI
- Aggregate information from query logs such as table/field popularity and common table joins
- Example queries from internal wikis and certified notebooks in DARWIN

**LLM Re-ranking**: After retrieving the top 20 tables via EBR, the system employs an LLM re-ranker to select the top 7 tables for query writing. Inputs include table descriptions, example queries, domain knowledge, and explanations of internal jargon detected in the user's question. A second LLM re-ranker selects fields from the selected tables, using the full table schemas with field descriptions, top K values, and other field attributes.

**Iterative Query Writing**: The query writing process is iterative—SQL Bot generates a plan and solves each step incrementally. Solutions to previous tasks are stored in the chatbot's internal state for the next step. The team found this approach can result in overly complicated queries for simple questions, so they instruct the query planner to minimize steps, condensing queries for simple questions while maintaining performance on complex ones.

**Self-Correction**: The system runs validators on the output followed by a self-correction agent. Validators work best when they access new information not available to the query writer. The system verifies table and field existence, executes the EXPLAIN statement to detect syntax errors, and feeds errors into a self-correction agent equipped with tools to retrieve additional tables or fields before updating the query.

## Strategy 3: User Experience with Rich Chat Elements

Integration and user experience proved crucial for adoption. When SQL Bot was integrated directly into DARWIN (rather than being a standalone chatbot), adoption increased 5-10x. Key UX features include:

- Chat history persistence for continuing conversations
- In-product feedback submission
- Custom instructions to personalize bot behavior
- "Fix with AI" button that appears when query execution fails (this feature accounts for 80% of sessions)
- Quick replies to guide users on follow-up options
- Optional guided experience where SQL Bot walks users through each step
- Rich display elements for tables showing descriptions, certification tags, popularity metrics, commonly joined tables, and DataHub links
- Query output with formatted SQL, explanations, and validation checks

The system also handles access control by checking user permissions and automatically providing code to leverage appropriate group credentials, reducing friction for users new to SQL at LinkedIn.

## Strategy 4: User Customization Options

The platform provides three customization levers that allow users to improve SQL Bot's performance without making requests to the platform team:

- **Dataset customization**: Users can define datasets for a product area by providing email groups or explicitly specifying users and datasets
- **Custom instructions**: Users can provide textual instructions to enrich domain knowledge or specify behavioral guidelines
- **Example queries**: Users can create example queries by creating notebooks in DARWIN and tagging them as "certified"

## Strategy 5: Ongoing Benchmarking and Evaluation

The team developed a comprehensive benchmarking approach, recognizing that text-to-SQL requirements vary widely depending on factors like target users, number of datasets, clarity of naming, query complexity, SQL dialect, response time requirements, and domain knowledge needs.

They collaborated with domain experts across 10 product areas to define over 130 benchmark questions, each with a well-formulated question and ground truth answers. About 60% of benchmark questions now have multiple acceptable answers—without these, recall was underreported by 10-15%.

**Evaluation Metrics** include:
- Recall of tables and fields compared to ground truth
- Table/field hallucination rate
- Syntax correctness
- Response latency

**Query Accuracy Evaluation**: For query accuracy, they use a combination of human evaluation and LLM-as-a-judge. The rubric includes overall score and dimensions on correctness (tables, columns, joins, filters, aggregations) as well as quality metrics (efficiency, complexity). This approach was more practical than running SQL queries and comparing outputs because it doesn't require data access, allows assessment of how close a query is to being correct, and provides deeper insights for model improvement.

The team found that LLM-as-a-judge returns a score within 1 point of the human score 75% of the time. Larger disagreements often indicate correct answers not in the ground truth, prompting expert review to update the benchmark. Expert human review occurs every 3 months to add accepted answers.

## Results and Learnings

In a recent survey, approximately 95% of users rated SQL Bot's query accuracy as "Passes" or above, with roughly 40% rating it "Very Good" or "Excellent." The "Fix with AI" feature—which was described as easy to develop—has very high usage at 80% of sessions, frequently saving users time in debugging queries. The team highlights this as a key insight: identifying high-ROI pain points is a good starting point for text-to-SQL initiatives.

The case study demonstrates the importance of combining multiple strategies—quality metadata, personalization, knowledge graphs, LLM re-ranking, iterative query generation, self-correction, thoughtful UX, user customization, and rigorous benchmarking—to build a practical enterprise text-to-SQL solution. The integration with existing tools (DARWIN, DataHub) and the focus on reducing friction for end users were critical success factors.

Future opportunities mentioned include faster response times, in-line query revisions, exposing the context SQL Bot used, learning from user interactions over time, and identifying champions to lead self-serve context curation efforts within their respective areas.