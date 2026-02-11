---
title: "Building QueryAnswerBird: An LLM-Powered AI Data Analyst with RAG and Text-to-SQL"
slug: "building-queryanswerbird-an-llm-powered-ai-data-analyst-with-rag-and-text-to-sql"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "690a12bd4fe97e40ebffd7ca"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:25:58.655Z"
  createdOn: "2025-11-04T14:50:37.626Z"
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "chatbot"
  - "rag"
  - "prompt-engineering"
  - "few-shot"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "agent-based"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "chunking"
  - "system-prompts"
  - "evals"
  - "langchain"
  - "monitoring"
  - "cicd"
  - "api-gateway"
  - "load-balancing"
  - "cache"
  - "documentation"
  - "openai"
  - "microsoft-azure"
industryTags: "e-commerce"
company: "Delivery Hero"
summary: "Woowa Brothers, part of Delivery Hero, developed QueryAnswerBird (QAB), an LLM-based AI data analyst to address the challenge that while 95% of employees used data in their work, over half struggled with SQL proficiency and data extraction reliability. The solution leveraged GPT-4, RAG architecture, LangChain, and comprehensive LLMOps practices to create a Slack-based chatbot that could generate SQL queries from natural language, interpret queries, validate syntax, and provide data discovery features. The development involved building automated unstructured data pipelines with vector stores, implementing multi-chain RAG architecture with router supervisors, establishing LLMOps infrastructure including A/B testing and monitoring dashboards, and conducting over 500 experiments to optimize performance, resulting in a 24/7 accessible service that provides high-quality query responses within 30 seconds to 1 minute."
link: "https://deliveryhero.jobs/blog/introducing-the-ai-data-analyst-queryanswerbird-part-1-utilization-of-rag-and-text-to-sql/"
year: 2024
seo:
  title: "Delivery Hero: Building QueryAnswerBird: An LLM-Powered AI Data Analyst with RAG and Text-to-SQL - ZenML LLMOps Database"
  description: "Woowa Brothers, part of Delivery Hero, developed QueryAnswerBird (QAB), an LLM-based AI data analyst to address the challenge that while 95% of employees used data in their work, over half struggled with SQL proficiency and data extraction reliability. The solution leveraged GPT-4, RAG architecture, LangChain, and comprehensive LLMOps practices to create a Slack-based chatbot that could generate SQL queries from natural language, interpret queries, validate syntax, and provide data discovery features. The development involved building automated unstructured data pipelines with vector stores, implementing multi-chain RAG architecture with router supervisors, establishing LLMOps infrastructure including A/B testing and monitoring dashboards, and conducting over 500 experiments to optimize performance, resulting in a 24/7 accessible service that provides high-quality query responses within 30 seconds to 1 minute."
  canonical: "https://www.zenml.io/llmops-database/building-queryanswerbird-an-llm-powered-ai-data-analyst-with-rag-and-text-to-sql"
  ogTitle: "Delivery Hero: Building QueryAnswerBird: An LLM-Powered AI Data Analyst with RAG and Text-to-SQL - ZenML LLMOps Database"
  ogDescription: "Woowa Brothers, part of Delivery Hero, developed QueryAnswerBird (QAB), an LLM-based AI data analyst to address the challenge that while 95% of employees used data in their work, over half struggled with SQL proficiency and data extraction reliability. The solution leveraged GPT-4, RAG architecture, LangChain, and comprehensive LLMOps practices to create a Slack-based chatbot that could generate SQL queries from natural language, interpret queries, validate syntax, and provide data discovery features. The development involved building automated unstructured data pipelines with vector stores, implementing multi-chain RAG architecture with router supervisors, establishing LLMOps infrastructure including A/B testing and monitoring dashboards, and conducting over 500 experiments to optimize performance, resulting in a 24/7 accessible service that provides high-quality query responses within 30 seconds to 1 minute."
---

## Overview

The BADA (Baemin Advanced Data Analytics) team at Woowa Brothers, a subsidiary of Delivery Hero, developed QueryAnswerBird (QAB), an LLM-based AI data analyst that emerged from an internal hackathon in 2023 and evolved into a full production system. The case study provides detailed insights into how the team built, deployed, and operated a complex LLM-powered application designed to enhance data literacy across the organization. The project represents a comprehensive example of LLMOps practices, from initial problem identification through production deployment and ongoing monitoring.

The motivation for QAB stemmed from a company-wide survey revealing that while approximately 95% of employees used data in their work, more than half faced significant barriers: insufficient time to learn SQL, difficulty generating queries that reflected business logic, and concerns about data extraction reliability. The team identified an opportunity to enhance employee data literacy—defined as the ability to extract and interpret meaningful information, verify reliability, explore data, and make reasonable decisions—through an automated AI-powered solution.

## Foundation Technologies and Architecture

QAB's technical foundation rests on four key technologies: Large Language Models (specifically OpenAI's GPT-4o accessed via Microsoft Azure OpenAI), RAG (Retrieval-Augmented Generation), LangChain framework, and comprehensive LLMOps practices. The team explicitly acknowledged that while LLMs like GPT-4 can answer general questions, they lack company-specific knowledge. This limitation drove their architectural decisions around RAG, which enables the model to search for necessary information rather than relying solely on pre-trained knowledge.

The initial hackathon prototype was straightforward, using prompts and GPT-3.5 API. However, the production system required a complete architectural redesign to achieve four core pillars: systemization (consistent data structure using metadata and business terminology), efficiency (technology understanding the company's business context), accessibility (Slack-based interface for ease of use), and automation (24/7 availability without dedicated data personnel support).

The production architecture comprises several sophisticated components working in concert. First, the team established an unstructured data pipeline based on vector stores. This pipeline automatically collects unstructured data including business terminology, table metadata, and data extraction code to capture the company's vast domain knowledge. The data undergoes vectorization through embedding models and storage in Vector DBs to enable vector similarity searches. The team applied embedding indexing by data area to facilitate efficient data updates, addressing the challenge of continuously evolving business contexts and data policies.

## Multi-Chain RAG Architecture

A particularly notable aspect of QAB's architecture is its RAG-based multi-chain structure designed to provide various literacy features beyond simple query generation. When users pose questions, a Router Supervisor chain identifies the question's purpose and categorizes it into appropriate question types in real-time. Questions are then routed to specialized chains including query generation, query interpretation, query syntax validation, table interpretation, log table utilization guidance, and column/table utilization guidance. Each chain utilizes custom search algorithms enabling the retriever to selectively extract necessary data for optimal response generation.

This multi-chain approach represents a sophisticated production pattern for LLM applications, moving beyond single-purpose chatbots to orchestrated systems handling diverse intents and use cases. The Router Supervisor pattern is particularly relevant for LLMOps practitioners managing complex applications where different user requests require different processing pipelines and data sources.

## LLMOps Infrastructure and Practices

The case study provides extensive detail on the LLMOps infrastructure established for development, deployment, and operation. The team built an experimental environment supporting A/B testing with leaderboards to deploy the best-performing chains. This infrastructure enabled over 500 A/B tests during the initial development period, with team members selecting various elements such as evaluation data, prompts, retrievers, and chains for consistent testing. The leaderboard approach added gamification elements that increased participation and engagement, with the highest-performing results approved during weekly sync-ups before production deployment.

Critical operational features include API load balancing for handling request distribution, GPT caching for improved response speed and cost optimization, feedback loops enabling continuous learning from user interactions, and monitoring dashboards for tracking response stability, speed, and error handling. The service deploys automatically through CI/CD pipelines, representing mature DevOps practices applied to LLM applications.

The Slack integration serves as the primary user interface, allowing employees to ask questions and receive answers directly within their daily workflow tool. Users can evaluate responses using satisfied/unsatisfied feedback, which feeds into the GPT cache and expands standardized data knowledge to other users. For query generation specifically, responses include validation information indicating whether generated queries execute correctly or contain errors, providing immediate quality signals to users.

## Text-to-SQL Deep Dive

The team devoted the first two months to developing the Text-to-SQL capability, which converts natural language questions into SQL queries. While acknowledging that foundation models like GPT-4 can generate high-quality SQL queries generally, they recognized significant limitations for company-specific use cases: lack of domain and data policy knowledge, retrieval of unnecessary data due to default retriever limitations, and inconsistent quality due to LLM hallucination. The team concluded that while foundation model improvements help, they have inherent limitations requiring additional engineering.

Their solution focused on four key elements: data augmentation, search algorithm development, prompt engineering, and establishment of testing/evaluation systems. For data augmentation, the team drew on research from NeurIPS 2023 ("Data Ambiguity Strikes Back: How Documentation Improves GPT's Text-to-SQL") emphasizing the importance of reducing data ambiguity. They enriched table metadata beyond existing structured information to include table purpose and characteristics, detailed column descriptions, key values, keywords, commonly used services, and related question examples. This metadata informed richer table DDL (Data Definition Language) data generation, automatically collected through their internal data catalog system's API.

Business terminology management proved critical given that user questions contain company-specific terms that may vary across services and organizations. Leveraging their existing data governance organization managing standard business terminology, they created a dedicated glossary for Text-to-SQL. Additionally, they built few-shot SQL example data—a crucial component where several example responses are included in prompts to help models generate more accurate and relevant responses. They collected high-quality queries from data analysts, example queries for key business questions, and corresponding question-query datasets. The team recognized that this data requires ongoing management by domain-specialized data analysts due to constantly changing extraction criteria and evolving business landscapes.

## Search Algorithms and Prompt Engineering

Search algorithm development focused on extracting appropriate information for each user question and processing stage. For ambiguous, short, or unclear questions, the system performs question refinement by extracting relevant business terms while avoiding similar but irrelevant terms that could mislead the LLM. For query generation, the system combines various search algorithms to extract the most relevant table metadata, DDL information, and few-shot examples while filtering for specific keywords that match the question context.

Prompt engineering applied the ReAct (Reasoning and Acting) method from ICLR 2023 research, which demonstrated superior performance compared to imitative learning and reinforcement learning. ReAct combines sequential reasoning (chain-of-thought) for problem-solving with tools or actions for specific tasks. QAB's query generation prompt implements step-by-step reasoning while dynamically searching and selecting appropriate data, creating a synergy effect that produces more accurate responses than simple reasoning alone. Both question refinement and query generation prompts assign GPT the persona of a data analyst, with the team noting that response quality varies based on the specific persona definition.

## Testing, Evaluation, and Performance

The team developed custom evaluation metrics and data rather than relying solely on public leaderboards like YALE Spider, Alibaba BIRD, or RAGAS Score. While benchmarking these existing approaches, they recognized limitations in addressing domain-specific issues and updating metrics based on business priorities. Their custom evaluation system assesses performance from basic query syntax understanding through complex domain knowledge incorporation and query execution accuracy. The automated testing system allows anyone to evaluate performance by selecting evaluation data, prompts, retrievers, and chains while measuring dozens of detailed metrics.

The internal leaderboard and gamification approach encouraged experimentation, with individual rankings adding competitive elements that made participation enjoyable. The highest-performing results from weekly reviews were deployed to production, enabling gradual service improvement. The team also leveraged LangServe Playground for quickly checking prompt modifications and chain performance changes, demonstrating mature experimentation practices.

The production Text-to-SQL feature provides responses within 30 seconds to 1 minute, delivering high-quality queries suitable for work reference. User feedback indicated particular value for new employees or those working across different service domains, helping them better understand their work context. However, users also noted room for improvement in business logic accuracy and question understanding, leading to ongoing performance enhancement efforts based on feedback and question histories.

## Operational Considerations and Future Direction

The case study offers honest assessment of both successes and limitations. The team acknowledges that while the service provides valuable assistance, accuracy improvements remain necessary. As they expanded testing to more participants and organizations, they discovered that a significant proportion of questions involved data discovery—exploring and understanding table structures to derive insights and create BI reports—rather than purely query generation. This user feedback drove product expansion beyond Text-to-SQL toward broader data discovery features.

The team's working methodology provides insights relevant to LLMOps teams. They operated in short two-week sprints with a task force structure, dividing work into components and rotating tasks across sprints. This rotation approach, while potentially slower initially due to overlapping work, ultimately accelerated development as team members discovered areas of interest and strength. The approach maintained motivation despite the energy-intensive nature of task force work while building broad skill sets and team understanding.

From an LLMOps perspective, several aspects warrant particular attention. The automated data pipeline collecting the latest data policies addresses a critical challenge in production LLM systems: keeping knowledge bases current as business contexts evolve. The indexing approach enabling delta updates rather than full refreshes demonstrates practical operational thinking. The multi-chain architecture with router-based intent classification represents a scalable pattern for complex LLM applications. The comprehensive observability infrastructure with monitoring dashboards, feedback loops, and caching mechanisms addresses key production requirements around performance, reliability, and cost management.

The case study demonstrates mature thinking about LLM limitations and engineering approaches to address them. Rather than assuming foundation model improvements alone would solve their problems, the team invested in data quality, retrieval optimization, prompt engineering, and rigorous evaluation. Their 500+ A/B tests during initial development reflect a data-driven approach to optimization rather than relying on intuition or anecdotal evidence.

It's worth noting that as a blog post from the company itself, the case study naturally emphasizes successes and positive outcomes. The acknowledgment of accuracy limitations and ongoing improvement efforts provides some balance, but practitioners should recognize that production LLM systems typically face additional challenges around edge cases, error handling, user expectation management, and cost optimization that may not be fully detailed here. The 30-second to 1-minute response time, while acceptable for many use cases, may be slower than users expect from traditional search or query interfaces, potentially affecting adoption. The reliance on GPT-4 via Azure OpenAI creates vendor dependencies and cost structures that may not scale linearly with usage.

Nevertheless, QueryAnswerBird represents a substantive LLMOps case study demonstrating practical patterns for building, deploying, and operating complex LLM-powered applications in enterprise settings. The comprehensive coverage of architecture, data engineering, experimentation infrastructure, deployment practices, and operational monitoring provides valuable reference points for teams undertaking similar initiatives.