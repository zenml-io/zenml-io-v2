---
title: "Natural Language to SQL Query Generation at Scale"
slug: "natural-language-to-sql-query-generation-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694adde864d67fc640f8ad30"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:50.314Z"
  createdOn: "2025-12-23T18:22:32.121Z"
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "rag"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "token-optimization"
  - "error-handling"
  - "evals"
  - "databases"
  - "monitoring"
  - "api-gateway"
  - "documentation"
  - "openai"
industryTags: "tech"
company: "Uber"
summary: "Uber developed QueryGPT to address the time-intensive process of SQL query authoring across its data platform, which handles 1.2 million interactive queries monthly. The system uses large language models, vector databases, and similarity search to generate complex SQL queries from natural language prompts, reducing query authoring time from approximately 10 minutes to 3 minutes. Starting from a hackathon prototype in May 2023, the system evolved through 20+ iterations into a production service featuring workspaces for domain-specific query generation, multiple specialized LLM agents (intent, table, and column pruning), and a comprehensive evaluation framework. The limited release achieved 300 daily active users with 78% reporting significant time savings, representing a major productivity gain particularly for Uber's Operations organization which contributes 36% of all queries."
link: "https://www.uber.com/en-IN/blog/query-gpt/"
year: 2024
seo:
  title: "Uber: Natural Language to SQL Query Generation at Scale - ZenML LLMOps Database"
  description: "Uber developed QueryGPT to address the time-intensive process of SQL query authoring across its data platform, which handles 1.2 million interactive queries monthly. The system uses large language models, vector databases, and similarity search to generate complex SQL queries from natural language prompts, reducing query authoring time from approximately 10 minutes to 3 minutes. Starting from a hackathon prototype in May 2023, the system evolved through 20+ iterations into a production service featuring workspaces for domain-specific query generation, multiple specialized LLM agents (intent, table, and column pruning), and a comprehensive evaluation framework. The limited release achieved 300 daily active users with 78% reporting significant time savings, representing a major productivity gain particularly for Uber's Operations organization which contributes 36% of all queries."
  canonical: "https://www.zenml.io/llmops-database/natural-language-to-sql-query-generation-at-scale"
  ogTitle: "Uber: Natural Language to SQL Query Generation at Scale - ZenML LLMOps Database"
  ogDescription: "Uber developed QueryGPT to address the time-intensive process of SQL query authoring across its data platform, which handles 1.2 million interactive queries monthly. The system uses large language models, vector databases, and similarity search to generate complex SQL queries from natural language prompts, reducing query authoring time from approximately 10 minutes to 3 minutes. Starting from a hackathon prototype in May 2023, the system evolved through 20+ iterations into a production service featuring workspaces for domain-specific query generation, multiple specialized LLM agents (intent, table, and column pruning), and a comprehensive evaluation framework. The limited release achieved 300 daily active users with 78% reporting significant time savings, representing a major productivity gain particularly for Uber's Operations organization which contributes 36% of all queries."
---

## Overview

QueryGPT represents Uber's production deployment of a natural language to SQL generation system that operates at significant scale within their data platform ecosystem. The case study provides valuable insights into the practical challenges of deploying LLM-based systems in enterprise environments where accuracy, reliability, and cost efficiency are critical concerns. Uber's data platform processes approximately 1.2 million interactive queries monthly, with the Operations organization alone contributing 36% of these queries. The problem QueryGPT addresses is both technical and operational: crafting SQL queries requires not only SQL syntax knowledge but also deep understanding of Uber's internal data models and business concepts, creating a significant productivity bottleneck.

The business case for QueryGPT is grounded in concrete time savings. Conservative estimates suggested that each query takes approximately 10 minutes to author manually, involving searching for relevant datasets in the data dictionary and writing the query. QueryGPT aimed to reduce this to approximately 3 minutes while maintaining sufficient reliability. This represents a potential 70% reduction in query authoring time, which at scale translates to substantial productivity gains across engineering, operations, and data science teams.

## Architectural Evolution and Iterative Development

The case study demonstrates a pragmatic approach to LLMOps through iterative refinement. QueryGPT originated from a hackathon proposal during Uber's Generative AI Hackdays in May 2023 and underwent more than 20 iterations before reaching its current production architecture. This evolution from hackathon prototype to production service illustrates the gap between proof-of-concept demonstrations and production-ready LLM systems.

The initial hackathon version (version 1) employed a relatively straightforward RAG (Retrieval-Augmented Generation) architecture. The system vectorized the user's natural language prompt and performed k-nearest neighbor similarity search on SQL samples and schemas to retrieve 3 relevant tables and 7 relevant SQL samples. These were used for few-shot prompting to guide the LLM in query generation. The initial dataset consisted of 7 tier-1 tables and 20 SQL queries as samples. The system also incorporated custom instructions specific to Uber's internal conventions, such as how to handle dates in Uber datasets.

However, this simple approach revealed significant limitations as the system scaled. Simple similarity search on user prompts against schema definitions (CREATE TABLE statements) and SQL queries proved insufficient for returning relevant results. The fundamental issue was attempting to directly match natural language questions like "Find the number of trips completed yesterday in Seattle" against technical schema representations. Additionally, large schemas presented token limit challenges, with some tier-1 tables containing over 200 columns and consuming 40-60K tokens, exceeding the then-available model limits of 32K tokens.

## Production Architecture Components

The current production architecture addresses these limitations through a multi-agent system with several specialized components working in concert. This represents a sophisticated LLMOps approach where complex tasks are decomposed into specialized sub-tasks, each handled by dedicated agents.

**Workspaces** form the foundation of the current system, representing curated collections of SQL samples and tables tailored to specific business domains such as Ads, Mobility, and Core Services. Uber identified foundational business domains and created "System Workspaces" covering areas like Mobility (trips, driver information, document details), Core Services, Platform Engineering, IT, and Ads—11 system workspaces in total. The workspace concept serves dual purposes: it narrows the search space for RAG, improving relevance and accuracy, and it provides domain-specific context to the LLM. Users can also create "Custom Workspaces" when existing system workspaces don't fit their requirements, demonstrating flexibility in the production system.

The **Intent Agent** represents a critical architectural decision to introduce an intermediate classification step between user input and schema retrieval. Every incoming prompt first passes through this agent, which uses an LLM call to map the user's question to one or more business domains/workspaces. This mapping to workspaces indirectly selects the relevant SQL samples and tables. This intermediate step dramatically narrows the RAG search radius and addresses the fundamental problem of matching natural language prompts against technical schemas. The intent classification approach exemplifies a key learning from the case study: LLMs excel as specialized classifiers when given focused, well-defined tasks.

The **Table Agent** emerged from user feedback indicating that automatically selected tables weren't always correct. This agent uses an LLM to identify relevant tables and presents them to users for confirmation or modification. This human-in-the-loop approach balances automation with user control, allowing users to either acknowledge the suggested tables or edit the list. This design acknowledges that complete automation may not always be feasible or desirable in production systems where accuracy is paramount, and provides a practical escape hatch for users.

The **Column Prune Agent** addresses the token limit and cost challenges associated with large schemas. Even with GPT-4 Turbo's 128K token limit, some requests encountered token size issues when including multiple large tables. The Column Prune Agent uses an LLM call to remove irrelevant columns from schemas before query generation, producing "skinnier" schema versions. This change delivered multiple benefits: reduced token consumption and associated costs, decreased latency due to smaller input sizes, and improved focus by removing noise. This represents a clever application of LLMs for preprocessing and optimization rather than just final output generation.

The system's output maintains consistency with earlier versions, providing both the generated SQL query and an explanation of how the query was constructed. This explainability component is valuable for user trust and debugging, though the case study doesn't detail how these explanations are evaluated or utilized in practice.

## Evaluation Framework

Uber developed a comprehensive evaluation framework to track QueryGPT's incremental improvements, representing mature LLMOps practice. The framework addresses the challenge of measuring progress in non-deterministic LLM systems and enables differentiation between repeated issues versus anomalous failures.

The **evaluation set** consists of golden question-to-SQL answer mappings manually curated from real QueryGPT logs. This required significant upfront investment: identifying real user questions, manually verifying the correct intent, determining required schemas, and writing golden SQL queries. The evaluation set covers various datasets and business domains, providing representative coverage of actual usage patterns. While the case study acknowledges this set cannot cover Uber's hundreds of thousands of datasets comprehensively, it represents current product usage and evolves as the product improves and new patterns emerge.

The **evaluation procedure** implements two distinct product flows that capture different aspects of system performance:

The "Vanilla" flow measures baseline performance where QueryGPT infers both intent and datasets from the input question, then generates SQL using these inferred values. This evaluates the complete end-to-end pipeline as users experience it.

The "Decoupled" flow measures performance with human-in-the-loop interaction and enables component-level evaluation by removing dependencies on earlier outcomes. This flow provides the actual intent and datasets needed rather than inferred values, isolating the SQL generation component's performance from upstream classification accuracy.

This dual evaluation approach is sophisticated, allowing the team to understand whether failures result from incorrect intent classification, wrong table selection, or issues in the actual SQL generation step.

The evaluation captures multiple signals throughout the query generation process:

**Intent accuracy** measures whether the assigned intent correctly maps to the question's business domain. **Table overlap** quantifies correct table identification using a score between 0 and 1, representing the overlap between predicted and required tables. This provides more nuanced feedback than binary correct/incorrect classifications. **Successful run** indicates whether generated queries execute without errors. **Run has output** checks whether successful queries return records, catching cases where hallucinations create valid but semantically incorrect filters (e.g., WHERE status = "Finished" instead of WHERE status = "Completed"). **Qualitative query similarity** uses an LLM to assign a 0-1 similarity score between generated and golden SQL, enabling quick assessment of whether syntactically failing queries are conceptually on the right track.

The framework includes visualization of question-level results to identify repeated failures and patterns revealing improvement areas. Aggregate accuracy and latency metrics are tracked over time to monitor performance trends. This comprehensive approach demonstrates production-grade LLMOps practices for managing and improving LLM system quality.

## Evaluation Limitations and Pragmatic Considerations

The case study candidly discusses evaluation framework limitations, demonstrating mature understanding of LLM system assessment challenges. The non-deterministic nature of LLMs means identical evaluations can produce different outcomes. Uber's approach is to avoid over-indexing on small (~5%) run-to-run metric changes, instead focusing on error patterns over longer periods that can be addressed through specific feature improvements. This pragmatic approach acknowledges the reality of working with probabilistic systems while maintaining focus on meaningful improvements.

The evaluation set's inability to cover all possible business questions is acknowledged, with the team focusing on questions representing current usage and evolving the set as the product improves. The recognition that multiple correct answers may exist for the same question is addressed through visualization of golden versus generated SQL and LLM-based similarity scoring, enabling assessment of whether generated queries achieve similar intent through different styles.

## Key Learnings and Production Challenges

Several insights emerged from deploying QueryGPT in production, providing valuable lessons for LLMOps practitioners.

**LLMs as excellent classifiers**: The specialized agents that decompose user prompts into better signals for RAG significantly improved accuracy compared to the initial version. The Intent Agent, Table Agent, and Column Prune Agent each performed well because they were assigned focused, specialized tasks rather than broad, generalized work. This finding reinforces the multi-agent architecture approach where complex workflows are decomposed into manageable, well-defined sub-tasks.

**Hallucinations remain an ongoing challenge**: The system encounters instances where LLMs generate queries with non-existent tables or columns. Uber continues experimenting with prompt engineering to reduce hallucinations, introduced a chat-style mode for iterative query refinement, and is exploring a "Validation" agent that recursively attempts to fix hallucinations. The acknowledgment that this "remains an area that we haven't completely solved yet" is honest and reflects the reality that hallucination mitigation in production LLM systems is an active area of work rather than a solved problem.

**User prompts lack consistent context richness**: User questions ranged from detailed queries with appropriate keywords to five-word questions with typos addressing broad topics requiring multi-table joins. Solely relying on raw user questions as input proved insufficient, leading to accuracy and reliability issues. The need for a "prompt enhancer" or "prompt expander" to massage user questions into more context-rich versions before LLM processing represents an important preprocessing step often overlooked in simple LLM application architectures.

**High accuracy expectations from users**: While QueryGPT provides value across broad user personas, there exists strong expectation that generated queries will be highly accurate and "just work." The case study notes the bar is high and recommends targeting and testing with appropriate initial user personas when building such products. This highlights the challenge of managing user expectations in LLM systems where perfect accuracy is unattainable.

## Production Deployment and Business Impact

The limited release to Operations and Support teams achieved approximately 300 daily active users, with 78% reporting that generated queries reduced the time they would have spent writing queries from scratch. While these are early results from limited deployment rather than full-scale rollout metrics, they suggest meaningful productivity impact. The Operations organization's 36% contribution to Uber's 1.2 million monthly queries represents substantial potential for productivity gains if high satisfaction rates persist at scale.

The case study describes QueryGPT as democratizing data access by making powerful data insights more accessible across various teams. However, the actual evidence provided focuses primarily on time savings rather than expanded access to previously inaccessible data capabilities. The productivity gains are concrete and measurable, though broader democratization claims would benefit from additional evidence.

## Technical Stack and Infrastructure

While the case study focuses primarily on architecture and evaluation rather than infrastructure details, several technical choices are mentioned. The system uses OpenAI's GPT-4 Turbo model with 128K token limit (1106 version). Vector databases and k-nearest neighbor similarity search power the RAG components, though specific vector database implementations aren't detailed. The multi-agent architecture suggests orchestration capabilities, though the orchestration framework isn't explicitly described.

The emphasis on token consumption, cost considerations, and latency optimization through the Column Prune Agent indicates that production LLMOps at scale requires careful attention to efficiency and cost management, not just accuracy. The move from 32K to 128K token limit models and the subsequent need for column pruning even with larger limits illustrates how schema complexity in enterprise environments can challenge even generous token budgets.

## Organizational and Cross-Functional Aspects

The acknowledgments section reveals QueryGPT as a cross-discipline effort requiring expertise from Engineering, Product Management, and Operations. This cross-functional collaboration is typical of successful LLMOps initiatives where domain knowledge, technical implementation, and user experience considerations must align. The hackathon origins and iterative development approach suggest an organizational culture supporting experimentation and rapid iteration on AI/ML initiatives.

## Critical Assessment and Balanced View

While the case study presents QueryGPT as a success story, several considerations warrant attention when evaluating these claims. The 78% user satisfaction metric comes from limited release to specific teams, and satisfaction rates may differ across broader user populations or different use cases. The actual query accuracy metrics aren't provided in the case study—we learn about the evaluation framework but not the specific accuracy rates achieved. This makes it difficult to independently assess whether the system meets the "sufficiently reliable" standard claimed for the 3-minute query authoring time.

The acknowledged ongoing challenges with hallucinations, varying user prompt quality, and high accuracy expectations suggest QueryGPT remains a work in progress rather than a fully solved problem. The need for human-in-the-loop table selection indicates the system can't fully automate the query generation process, which may limit the achievable time savings compared to the ideal 10-minutes-to-3-minutes reduction.

The case study's claim about 20+ algorithm iterations between the hackathon version and current production system, while demonstrating thorough engineering, also indicates the substantial investment required to move from prototype to production-ready LLM systems. Organizations considering similar initiatives should anticipate significant iteration and refinement beyond initial promising results.

Despite these considerations, the case study provides valuable insights into real-world LLMOps challenges and solutions. The multi-agent architecture, comprehensive evaluation framework, and honest discussion of limitations and ongoing challenges make this a substantive contribution to understanding production LLM system deployment at enterprise scale. The focus on measurable productivity gains, iterative improvement based on evaluation metrics, and specialized agent design represents mature LLMOps practice worth emulating.