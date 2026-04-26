---
title: "Gen AI On-Call Copilot for Engineering Support"
slug: "gen-ai-on-call-copilot-for-engineering-support"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "question-answering"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "chunking"
  - "system-prompts"
  - "evals"
  - "human-in-the-loop"
  - "langchain"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "orchestration"
  - "documentation"
  - "security"
  - "openai"
industryTags: "tech"
company: "Uber"
summary: "Uber faced challenges managing high volumes of support questions across Slack channels, with approximately 45,000 questions per month leading to long response times and reduced productivity for both users and on-call engineers. To address this, Uber built Genie, a generative AI-powered on-call copilot using Retrieval-Augmented Generation (RAG) that answers technical questions by retrieving relevant information from internal documentation sources including wikis, Stack Overflow, and engineering documents. Since launching in September 2023, Genie has expanded to 154 Slack channels, answered over 70,000 questions with a 48.9% helpfulness rate, and is estimated to have saved approximately 13,000 engineering hours."
link: "https://www.uber.com/us/en/blog/genie-ubers-gen-ai-on-call-copilot/"
year: 2023
seo:
  title: "Uber: Gen AI On-Call Copilot for Engineering Support - ZenML LLMOps Database"
  description: "Uber faced challenges managing high volumes of support questions across Slack channels, with approximately 45,000 questions per month leading to long response times and reduced productivity for both users and on-call engineers. To address this, Uber built Genie, a generative AI-powered on-call copilot using Retrieval-Augmented Generation (RAG) that answers technical questions by retrieving relevant information from internal documentation sources including wikis, Stack Overflow, and engineering documents. Since launching in September 2023, Genie has expanded to 154 Slack channels, answered over 70,000 questions with a 48.9% helpfulness rate, and is estimated to have saved approximately 13,000 engineering hours."
  canonical: "https://www.zenml.io/llmops-database/gen-ai-on-call-copilot-for-engineering-support"
  ogTitle: "Uber: Gen AI On-Call Copilot for Engineering Support - ZenML LLMOps Database"
  ogDescription: "Uber faced challenges managing high volumes of support questions across Slack channels, with approximately 45,000 questions per month leading to long response times and reduced productivity for both users and on-call engineers. To address this, Uber built Genie, a generative AI-powered on-call copilot using Retrieval-Augmented Generation (RAG) that answers technical questions by retrieving relevant information from internal documentation sources including wikis, Stack Overflow, and engineering documents. Since launching in September 2023, Genie has expanded to 154 Slack channels, answered over 70,000 questions with a 48.9% helpfulness rate, and is estimated to have saved approximately 13,000 engineering hours."
notion:
  pageId: "34ef8dff-2538-81e8-bbd4-fb26cc878b31"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:51:00.000Z"
  lastEditedTime: "2026-04-26T09:51:00.000Z"
  publishedAt: "2026-04-26T13:10:52Z"
---

## Overview

Uber developed Genie, an on-call copilot designed to reduce the burden on engineering teams managing support requests across numerous Slack channels. The company's platform engineering teams were fielding approximately 45,000 questions monthly across their support channels, creating significant productivity drains for both the users waiting for responses and the on-call engineers providing support. The problem was exacerbated by fragmented documentation across multiple internal systems including Uber's internal wiki (Engwiki), internal Stack Overflow, and other repositories, making it difficult for users to self-service their questions. Genie represents a production LLM system built to operate at scale within Uber's engineering organization, serving as a comprehensive case study in deploying RAG-based systems for enterprise support use cases.

## Architectural Decisions and Trade-offs

Uber faced a fundamental architectural decision when building Genie: whether to fine-tune a custom LLM or leverage Retrieval-Augmented Generation (RAG). The team chose RAG for pragmatic reasons related to time-to-market and operational considerations. Fine-tuning would have required curating high-quality, diverse training examples and ongoing compute resources to keep the model updated with new data. RAG, by contrast, doesn't require diverse training examples upfront and allows for more dynamic updates to the knowledge base. This decision prioritized rapid deployment over potentially higher accuracy from a fine-tuned model, which is a common trade-off in LLMOps implementations where business value from faster deployment can outweigh marginal performance improvements.

## Data Pipeline and ETL Architecture

The foundation of Genie's RAG implementation is built on Apache Spark for ETL processing. The data preparation stage involves a custom Spark application that fetches content from various internal data sources using APIs for Engwiki and Uber's internal Stack Overflow. The Spark application outputs dataframes with schemas containing source URLs and corresponding content in string format. This content then flows through an embedding generation pipeline where the text is chunked using LangChain and embeddings are generated through OpenAI's embedding models using PySpark User Defined Functions (UDFs). The use of PySpark UDFs for embedding generation represents a scalable pattern for processing large volumes of documents in distributed fashion, which is critical for maintaining fresh knowledge bases in production systems.

The embeddings are stored in Terrablob, Uber's internal blob storage system, and also pushed to Sia, Uber's in-house vector database solution. The architecture includes a "pusher" component that manages the flow of vectors to storage, involving a bootstrap job to ingest data to Sia, followed by two Spark jobs for index building, merging, and ingestion to Terrablob. Each leaf node in the vector database syncs and downloads a base index and snapshot stored in Terrablob, enabling distributed retrieval where queries are sent directly to each leaf. This distributed architecture for vector storage and retrieval demonstrates production-grade considerations for scalability and performance.

## Access Control and Data Security

A critical LLMOps concern addressed by the Genie team was data security and access control. The team carefully curated which data sources could be ingested into the system, recognizing that many internal data sources contain sensitive information that cannot be exposed broadly across Slack channels. The embeddings created from specific data sources are only accessible through particular Slack channels related to those sources, implementing a principle of least privilege. Additionally, the team was concerned about potential data leakage to external services like OpenAI, so they pre-curated data sources that are widely available to most Uber engineers and only allowed those sources for generating embeddings. This represents a thoughtful approach to balancing the utility of the system with security constraints, though it does limit the potential scope of questions Genie can answer.

## Inference and Knowledge Service Architecture

The runtime architecture centers on a back-end Knowledge Service that handles incoming queries. When a user posts a question in a Slack channel, the service converts the incoming query into an embedding using the same OpenAI embedding model used during ingestion. This embedding is then used to perform similarity search in the vector database to fetch the most relevant chunks of documentation. These retrieved chunks are used to construct prompts that are sent to an LLM (accessed through Michelangelo Gateway, which serves as a pass-through service) to generate natural language responses. This represents a classic RAG pattern, though the specific implementation details around the Michelangelo Gateway suggest Uber has built internal infrastructure to standardize and govern LLM access across the organization.

## Hallucination Mitigation Strategies

Hallucination represents one of the most significant challenges in production LLM deployments, and Uber implemented several strategies to mitigate this risk. The team modified their prompting approach by explicitly structuring the retrieved context from the vector database into labeled "sub-context" sections, each paired with its source URL. The prompt explicitly instructs the LLM to only provide answers based on the sub-contexts provided and to cite source URLs for every answer. This grounding technique is a common pattern in RAG systems, though its effectiveness depends heavily on prompt engineering and the LLM's adherence to instructions. The team also implemented verification mechanisms to check responses against authoritative sources and emphasized continuous learning by ensuring access to updated data. However, the case study doesn't provide specific metrics on hallucination rates or quantitative validation of these mitigation strategies, which would be valuable for assessing their effectiveness.

## Cost Tracking and Observability

Uber implemented a comprehensive cost tracking system for Genie, recognizing that LLM API costs can quickly escalate in production systems handling thousands of queries. When the Slack client or other platforms call the Knowledge Service, a UUID is passed through the request context to the Michelangelo Gateway. The gateway logs this UUID in an audit log used to track costs associated with each request. This level of cost attribution is essential for production LLM systems, enabling teams to understand usage patterns, allocate costs to specific channels or teams, and identify optimization opportunities. The integration of cost tracking into the request flow demonstrates mature LLMOps thinking about the total cost of ownership for AI systems.

## User Feedback and Metrics Framework

Genie implements a sophisticated feedback collection system integrated directly into the Slack interface. Users can provide immediate feedback by clicking buttons to categorize responses as "Resolved" (completely resolved the issue), "Helpful" (partially helped but needs more assistance), "Not Helpful" (wrong or irrelevant response), or "Not Relevant" (requires human on-call support). A Slack plugin captures this feedback and streams it via Kafka to a Hive table containing the feedback along with relevant metadata. These metrics are then visualized in dashboards for monitoring system performance. This feedback loop is critical for production LLM systems as it provides ground truth data for evaluating real-world performance, identifying areas for improvement, and potentially generating training data for future iterations. The reported 48.9% helpfulness rate provides a baseline, though this metric combines both "Resolved" and "Helpful" responses, making it difficult to assess how often Genie fully resolves issues versus merely providing partial assistance.

## Custom Evaluation Framework

Beyond user feedback, Uber built a custom evaluation framework that allows Genie users to run evaluations on various metrics including hallucinations and answer relevancy. The evaluation process is implemented as a separate ETL pipeline using Michelangelo components. The pipeline retrieves Genie's context and responses from Hive and joins them with Slack metadata and user feedback. This data is processed and passed to an Evaluator component that implements an "LLM as a Judge" pattern, where an LLM evaluates the quality of another LLM's responses based on specified prompts. The metrics are extracted and included in evaluation reports available through a UI. This represents a sophisticated approach to evaluation that goes beyond simple accuracy metrics, though LLM-as-judge evaluations have their own limitations and potential biases that should be considered.

## Document Quality Evaluation

Recognizing that RAG system performance is fundamentally limited by the quality of source documentation, Uber implemented a document evaluation capability. After data is scraped, documents in the knowledge base are transformed into a Spark dataframe where each row represents one document. An evaluation process then calls an LLM to assess each document using custom evaluation prompts. The LLM returns evaluation scores along with explanations and actionable suggestions for improving document quality. These metrics are published as evaluation reports accessible through the Michelangelo UI. This proactive approach to managing knowledge base quality is an important but often overlooked aspect of production RAG systems. Poor documentation quality will limit system performance regardless of how sophisticated the retrieval and generation components are, so providing feedback to documentation authors creates a virtuous cycle of improvement.

## User Experience Design

Uber evolved Genie's interaction model to maximize its effectiveness and user engagement. The system provides action buttons alongside responses, allowing users to easily ask follow-up questions, mark questions as resolved, or escalate to human support. This design acknowledges that effective LLM systems in production need to gracefully handle their limitations and provide clear paths for escalation when they cannot fully resolve user needs. The interaction design also encourages users to engage more attentively with Genie's responses rather than immediately escalating to human support, which helps maximize the efficiency gains from the system.

## Production Scale and Impact

Since launching in September 2023, Genie has demonstrated significant scale and impact. The system has expanded to 154 Slack channels and has answered over 70,000 questions. The reported 48.9% helpfulness rate, while not perfect, suggests the system is providing value in roughly half of interactions. Uber estimates Genie has saved approximately 13,000 engineering hours since launch. However, these impact metrics should be interpreted carefully. The engineering hours saved is likely an estimate based on assumptions about time saved per resolved question, and the methodology isn't detailed in the case study. Additionally, the helpfulness rate means that over half of interactions still require human intervention or don't fully resolve the user's need, suggesting there's substantial room for improvement.

## Technical Stack Integration

Genie's architecture demonstrates how production LLM systems at large enterprises integrate with existing infrastructure. The system leverages OpenAI for embeddings and generation, Apache Spark for data processing, Kafka for streaming metrics, Hive for data warehousing, internal systems like Terrablob for blob storage and Sia for vector databases, and the Michelangelo platform for model serving and management. The Michelangelo Gateway serves as an abstraction layer for LLM access, enabling consistent logging, monitoring, and cost tracking across different use cases. This integration with existing infrastructure is characteristic of enterprise LLMOps, where new AI capabilities must fit into established data pipelines, security models, and operational processes rather than being built entirely greenfield.

## Limitations and Challenges

While the case study presents Genie as successful, several limitations and challenges are worth noting. The 48.9% helpfulness rate, while positive, indicates that the majority of interactions don't fully resolve user issues. The system is limited to pre-curated data sources that are widely accessible, which may exclude valuable information from more restricted sources. The reliance on OpenAI's models creates external dependencies and potential cost exposure as usage scales. The case study doesn't provide detailed accuracy metrics, comparisons to baseline performance, or information about failure modes. Additionally, the document evaluation and custom evaluation frameworks, while sophisticated, represent additional operational overhead that must be maintained alongside the core RAG system.

## Future Directions

Uber positions Genie as having potential to transform user and on-call engineer interactions across platforms, potentially extending beyond Slack into products like Michelangelo or IDEs where users could receive product-specific help directly within those environments. This vision suggests evolution from a Slack-based Q&A system toward more integrated, context-aware assistance throughout the development workflow. Such expansion would require addressing additional challenges around context awareness, multi-modal interactions, and integration with various development tools.

## LLMOps Maturity Assessment

Genie demonstrates several markers of mature LLMOps practice including comprehensive cost tracking, sophisticated evaluation frameworks, user feedback integration, data security considerations, and integration with existing enterprise infrastructure. The team made pragmatic architectural choices favoring time-to-market over perfect accuracy, which is appropriate for an initial deployment. The system includes observability, evaluation, and continuous improvement mechanisms essential for production AI systems. However, the case study lacks detailed information about deployment processes, model versioning, A/B testing, incident response procedures, or how the system handles edge cases and failures. The evaluation framework relies heavily on LLM-as-judge approaches which, while convenient, may introduce their own biases. Overall, Genie represents a solid production implementation of RAG technology with thoughtful attention to operational concerns, though there are opportunities for further maturation in areas like evaluation rigor and handling of edge cases.
