---
title: "Text-to-SQL System with RAG-Enhanced Table Selection"
slug: "text-to-sql-system-with-rag-enhanced-table-selection"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6777fb7356bf6dc5b00dfabd"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:52:24.683Z"
  createdOn: "2025-01-03T15:00:03.177Z"
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "structured-output"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "langchain"
  - "elasticsearch"
  - "documentation"
  - "databases"
  - "openai"
industryTags: "tech"
company: "Pinterest"
summary: "Pinterest developed a Text-to-SQL system to help data analysts convert natural language questions into SQL queries. The system evolved through two iterations: first implementing a basic LLM-powered SQL generator integrated into their Querybook tool, then enhancing it with RAG-based table selection to help users identify relevant tables from their vast data warehouse. The implementation showed a 35% improvement in task completion speed for SQL query writing, with first-shot acceptance rates improving from 20% to over 40% as the system matured."
link: "https://medium.com/pinterest-engineering/how-we-built-text-to-sql-at-pinterest-30bad30dabff"
year: 2024
seo:
  title: "Pinterest: Text-to-SQL System with RAG-Enhanced Table Selection - ZenML LLMOps Database"
  description: "Pinterest developed a Text-to-SQL system to help data analysts convert natural language questions into SQL queries. The system evolved through two iterations: first implementing a basic LLM-powered SQL generator integrated into their Querybook tool, then enhancing it with RAG-based table selection to help users identify relevant tables from their vast data warehouse. The implementation showed a 35% improvement in task completion speed for SQL query writing, with first-shot acceptance rates improving from 20% to over 40% as the system matured."
  canonical: "https://www.zenml.io/llmops-database/text-to-sql-system-with-rag-enhanced-table-selection"
  ogTitle: "Pinterest: Text-to-SQL System with RAG-Enhanced Table Selection - ZenML LLMOps Database"
  ogDescription: "Pinterest developed a Text-to-SQL system to help data analysts convert natural language questions into SQL queries. The system evolved through two iterations: first implementing a basic LLM-powered SQL generator integrated into their Querybook tool, then enhancing it with RAG-based table selection to help users identify relevant tables from their vast data warehouse. The implementation showed a 35% improvement in task completion speed for SQL query writing, with first-shot acceptance rates improving from 20% to over 40% as the system matured."
---

## Summary

Pinterest developed a Text-to-SQL feature to assist their data analysts in converting natural language analytical questions into SQL queries. This case study provides a detailed look at how a major tech company approached the challenge of deploying LLMs in a production environment for a complex task that requires understanding both natural language intent and database schema structures. The feature was integrated into Querybook, Pinterest's open-source big data SQL query tool, making it the natural deployment target for new AI-assisted features.

The core problem Pinterest faced was twofold: data analysts needed to write queries to solve analytical problems, but finding the right data among hundreds of thousands of tables and translating analytical problems into correct and efficient SQL code was challenging in their fast-paced environment. The rise of Large Language Models presented an opportunity to address this pain point.

## Architecture and Initial Implementation

The first version of Pinterest's Text-to-SQL solution followed a relatively straightforward architecture that leveraged LLMs for SQL generation. The workflow began with the user asking an analytical question and selecting the tables to be used. The system then retrieved relevant table schemas from a metadata store, compiled the question along with the selected SQL dialect and table schemas into a prompt, fed this to an LLM, and streamed the response back to the user.

The table schema information provided to the LLM included table names, table descriptions, column names, column types, and column descriptions. This metadata proved crucial for generating accurate SQL, as it gave the model the necessary context about the data structure.

### Handling Low-Cardinality Columns

One interesting production challenge the team addressed was ensuring that generated SQL queries conformed to actual database values. For instance, a query asking about active users on the "web" platform might naively generate `where platform='web'` when the correct syntax should be `where platform='WEB'`. To solve this, Pinterest processed and incorporated the unique values of low-cardinality columns (those frequently used for filtering) into the table schema provided to the LLM. This allowed the model to generate precise SQL queries that matched the actual data values stored in the database.

### Context Window Management

Large table schemas posed a challenge as they could exceed the LLM's context window limits. Pinterest employed several techniques to address this constraint. They created reduced versions of the table schema that included only crucial elements like table name, column name, and type. Additionally, they implemented column pruning where columns were tagged in the metadata store and certain ones could be excluded from the schema based on their tags. This demonstrates a practical approach to working within LLM limitations while preserving the most important information.

### Response Streaming

Since LLM responses can take tens of seconds to complete, Pinterest implemented WebSocket-based streaming to improve user experience. Rather than forcing users to wait for the entire response, they could see the SQL being generated in real-time. The team adopted Langchain's partial JSON parsing for server-side streaming, which allowed them to stream structured JSON responses rather than just plain text. The parsed JSON was then sent to the client through WebSocket connections.

## Second Iteration: RAG for Table Selection

While the initial version performed well when users knew which tables to use, Pinterest recognized that identifying the correct tables among hundreds of thousands in their data warehouse was itself a significant challenge. This led to the second iteration which integrated Retrieval Augmented Generation (RAG) to help users select appropriate tables.

The enhanced workflow introduced an offline job that generates a vector index of table summaries and historical queries. When a user asks a question without specifying tables, the question is transformed into embeddings, and a similarity search is conducted against the vector index to identify the top N suitable tables. These candidates are then passed to an LLM which selects the top K most relevant tables by evaluating the question alongside the table summaries. The selected tables are returned to the user for validation before proceeding to SQL generation.

### Offline Vector Index Creation

Pinterest created two types of document embeddings in their vector index: table summarizations and query summarizations. For table summarization, they focused on indexing only top-tier tables as part of their ongoing table standardization effort, which promotes the use of higher-quality datasets. The summarization process retrieves the table schema from the metadata store, gathers recent sample queries utilizing the table, incorporates as many sample queries as possible into the summarization prompt along with the table schema, forwards the prompt to an LLM to create the summary, and then generates and stores embeddings in the vector store.

The table summaries include descriptions of the table, the data it contains, and potential use scenarios. Query summarization operates similarly, with sample queries associated with each table being summarized individually, including details such as the query's purpose and utilized tables.

### Vector Search Implementation

Pinterest uses OpenSearch as their vector store, leveraging its built-in similarity search capability. When a user asks an analytical question, the system converts it into embeddings using the same embedding model used for indexing. The search is then conducted against both the table and query vector indices.

Since multiple tables can be associated with a single query, a table could appear multiple times in similarity search results. Pinterest implemented a scoring strategy to aggregate and score these results, with table summaries carrying more weight than query summaries. This NLP-based table search capability was also made available for general table search within Querybook, extending its utility beyond just the Text-to-SQL feature.

### Table Re-selection with LLM

After retrieving the top N tables from the vector index, Pinterest engages an LLM to choose the most relevant K tables by evaluating the question alongside the table summaries. The system includes as many tables as possible in the prompt given the context window constraints. Once tables are re-selected, they are returned to the user for validation before transitioning to the actual SQL generation stage, keeping the human in the loop for final confirmation.

## Evaluation and Results

Pinterest's evaluation approach evolved as the project progressed. Initial evaluations focused on ensuring comparable performance with results reported in academic literature, given that the implementation mostly used off-the-shelf approaches. They tested against the Spider dataset and found comparable results, though they noted that benchmark tasks were substantially easier than real-world problems their users face, particularly because benchmarks consider a small number of pre-specified tables with few and well-labeled columns.

Once the system was in production, Pinterest observed how users actually interacted with the system. As the implementation improved and users became more familiar with the feature, the first-shot acceptance rate for generated SQL increased from 20% to above 40%. This represents a significant improvement and suggests that both system refinements and user learning contributed to better outcomes.

For measuring productivity impact, Pinterest compared their results to previous research that found AI assistance improved task completion speed by over 50% in controlled experiments. In their real-world data (which importantly does not control for differences in tasks), they observed a 35% improvement in task completion speed for writing SQL queries with AI assistance. This is a notable result, though the team appropriately caveats that their measurement does not control for task difficulty differences.

For table retrieval evaluation, Pinterest used offline data from previous table searches, though they acknowledged this data was insufficient because it captured user behavior before NLP-based search was available. They used this evaluation primarily to ensure the embedding-based search did not perform worse than existing text-based search. A key finding was that table metadata generated through data governance efforts was critically important: search hit rate without table documentation in embeddings was only 40%, but performance increased linearly with the weight placed on table documentation up to 90%.

## Production Considerations and Future Work

Pinterest identified several areas for future improvement that highlight ongoing production challenges. For NLP table search, they see potential in including additional metadata such as tiering, tags, and domains for more refined filtering during retrieval. They also noted the need for scheduled or real-time index updates as new tables are created or queries executed, rather than the current manual process. The similarity search and scoring strategy could also be fine-tuned to improve result relevance.

Query validation represents another area for improvement. Currently, the SQL generated by the LLM is returned to the user without validation, creating a risk that queries may not execute as expected. Implementing query validation, perhaps using constrained beam search, could add an extra layer of assurance.

User feedback collection was identified as valuable for continuous improvement. A user interface to efficiently collect feedback on table search and query generation results could provide insights that could be processed and incorporated into the vector index or table metadata store.

The team also reflected on evaluation challenges, noting that real-world Text-to-SQL performance differs significantly from existing benchmarks. Academic benchmarks tend to use a small number of well-normalized tables that are pre-specified, whereas real-world scenarios involve large amounts of denormalized tables where table search itself is a core challenge.

## Technical Infrastructure Notes

Pinterest's approach demonstrates several LLMOps best practices: they integrated the feature into their existing data tool (Querybook) rather than creating a standalone application, they addressed practical issues like context window limits and response latency through streaming, and they iterated based on production observations rather than relying solely on benchmark evaluations. The use of their open-source platform also means that their prompts and implementation details are publicly available for reference, which is valuable for the broader community. The prompts for Text-to-SQL, table summarization, query summarization, and table re-selection are all linked in the original article and available in the Querybook GitHub repository.