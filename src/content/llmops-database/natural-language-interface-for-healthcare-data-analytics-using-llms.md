---
title: "Natural Language Interface for Healthcare Data Analytics using LLMs"
slug: "natural-language-interface-for-healthcare-data-analytics-using-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "677806e1caacdf9ea30eca8f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:51:35.034Z"
  createdOn: "2025-01-03T15:48:49.164Z"
llmopsTags:
  - "healthcare"
  - "data-analysis"
  - "data-cleaning"
  - "structured-output"
  - "regulatory-compliance"
  - "embeddings"
  - "semantic-search"
  - "prompt-engineering"
  - "error-handling"
  - "microservices"
  - "api-gateway"
  - "databases"
  - "postgresql"
  - "openai"
industryTags: "healthcare"
company: "Aachen Uniklinik / Aurea Software"
summary: "A UK-based NLQ (Natural Language Query) company developed an AI-powered interface for Aachen Uniklinik to make intensive care unit databases more accessible to healthcare professionals. The system uses a hybrid approach combining vector databases, large language models, and traditional SQL to allow non-technical medical staff to query complex patient data using natural language. The solution includes features for handling dirty data, intent detection, and downstream complication analysis, ultimately improving clinical decision-making processes."
link: "https://www.youtube.com/watch?v=Qku6AV3npk4"
seo:
  title: "Aachen Uniklinik / Aurea Software: Natural Language Interface for Healthcare Data Analytics using LLMs - ZenML LLMOps Database"
  description: "A UK-based NLQ (Natural Language Query) company developed an AI-powered interface for Aachen Uniklinik to make intensive care unit databases more accessible to healthcare professionals. The system uses a hybrid approach combining vector databases, large language models, and traditional SQL to allow non-technical medical staff to query complex patient data using natural language. The solution includes features for handling dirty data, intent detection, and downstream complication analysis, ultimately improving clinical decision-making processes."
  canonical: "https://www.zenml.io/llmops-database/natural-language-interface-for-healthcare-data-analytics-using-llms"
  ogTitle: "Aachen Uniklinik / Aurea Software: Natural Language Interface for Healthcare Data Analytics using LLMs - ZenML LLMOps Database"
  ogDescription: "A UK-based NLQ (Natural Language Query) company developed an AI-powered interface for Aachen Uniklinik to make intensive care unit databases more accessible to healthcare professionals. The system uses a hybrid approach combining vector databases, large language models, and traditional SQL to allow non-technical medical staff to query complex patient data using natural language. The solution includes features for handling dirty data, intent detection, and downstream complication analysis, ultimately improving clinical decision-making processes."
---

## Overview

This case study, presented at the NLP Summit by Dennis, COO of NLQ (a company based in England), describes the development of an AI-powered natural language interface for healthcare databases. The company worked with Aachen University Clinic (Aachen Uniklinik) in Germany to build an intelligent interface that allows non-technical healthcare professionals—such as physicians, clinicians, and department heads—to query Intensive Care Unit (ICU) databases using natural language instead of SQL.

The project was motivated by German healthcare policy requiring standardization of databases across regions to enable access to patient information from different locations. Additionally, the company completed a research and development project with Innovate UK to create an AI tool that empowers physicians with intuitive interfaces for accessing poorly accessible clinical data to accelerate clinical decision-making.

## The Problem Being Solved

The core challenge addressed is the data analytics bottleneck between technical and non-technical employees in healthcare settings. The presenter outlined several key pain points:

- Non-technical healthcare staff lack the SQL skills needed to query databases directly
- Even if database access were provided, most physicians and department heads cannot write SQL queries to extract meaningful insights
- The traditional workflow of copying data to Excel spreadsheets for analysis is time-consuming and inconvenient
- Electronic Healthcare Record (EHR) systems often contain "dirty data" with missing or inaccurate entries
- There is a significant mismatch between the abundance of patient data available and the limited number of data-skilled employees who can mine insights from it

## Technical Architecture and LLMOps Approach

The solution employs what the presenter describes as a "hybrid" approach combining multiple AI/ML techniques. This is notable from an LLMOps perspective as it demonstrates a production system that integrates several different components rather than relying on a single LLM.

### Vector Database with Metadata Embeddings

The system stores metadata from healthcare databases in a vector database. This metadata includes diagnosis names, prescription names, and other text-format information from the healthcare database. When processing a user's natural language question, the system compares the input against stored embeddings using cosine similarity. This approach helps handle small typos and semantically similar terms, improving the robustness of natural language understanding.

### Intent Detection with Fine-tuned LLMs

For intent detection, the team fine-tuned an open-source large language model. This is a critical component because healthcare use cases involve many different types of queries (which they call "intents" in their logic). The fine-tuned model helps detect the proper intent from user questions, even when users phrase the same question in multiple different ways. The presenter explicitly noted that their system will not respond to out-of-scope questions (using the example of "who is Justin Bieber" being rejected unless Justin Bieber happens to be a patient).

### Slot Filling with LLMs

The system also uses LLMs for slot filling—extracting specific parameters from natural language queries and transforming them into formats suitable for SQL interfaces. For example, when a user mentions a time period in natural language, the slot filling model detects the period intent and converts it to the proper date format required by the database engine.

### Hybrid Backend Architecture

The production backend operates with both the vector database and a structured data database simultaneously. The model works with both databases to transform natural language questions into structured query language (SQL) code. This hybrid approach is designed to leverage the strengths of different database types for different aspects of the query processing pipeline.

### Disambiguation Through Clarifying Questions

One of the features emphasized as "most important" is the system's ability to ask additional questions when it detects ambiguities in user queries. Given the complexity of medical terminology—where the same term can have different meanings in different departments—this clarification mechanism is essential for generating accurate SQL queries. The system will iteratively ask questions until it has enough information to produce a correct query.

## Production Use Cases Demonstrated

The presenter showcased several real-world analytics capabilities:

- **Surgery Cases Analytics**: Users can request visualizations like "show me a bar chart with number of cases by readers this year" and receive data visualizations without writing SQL
- **Surgery Duration Analytics**: Critical for surgery clinics to understand average procedure times by surgeon, reader, hospital, etc., enabling benchmarking across indicators
- **Downstream Complication Calculation**: Perhaps the most clinically valuable use case—physicians can query historical patient data to identify the most common downstream complications for patients with specific conditions (e.g., "what is the most common seven downstream complications for male patients with Pseudomonas aeruginosa bacteria")

The downstream complication feature enables physicians to leverage hospital patient history to predict and potentially mitigate complications for current patients. For example, if historical data shows certain bacterial infections are common complications after specific surgeries and hospital stays of certain durations, physicians can take preventive measures.

## Data Output and User Interface Considerations

The system handles varying result sizes intelligently:

- Small result sets (10 rows or fewer) are displayed directly in the chat interface
- Larger result sets are exported to Excel files with download links provided to users
- Data visualizations including bar charts and scatter plots can be generated and displayed

## Enterprise Deployment Architecture

The presenter noted that they build "enterprise-ready software" with a focus on security and connectivity to different data sources. The core offering is an API that transforms natural language questions to SQL code, which can be integrated into existing hospital IT ecosystems.

Recognizing that most hospitals require on-premise solutions for data security reasons, the system can be deployed as a microservice with the AI model on the backend within the hospital's own infrastructure. This is an important LLMOps consideration—the architecture needs to accommodate enterprise security requirements and on-premise deployment rather than assuming cloud-based operation.

## Critical Assessment

While the presentation demonstrates an interesting hybrid approach to text-to-SQL in healthcare, several aspects warrant careful consideration:

- The specific accuracy metrics or error rates of the system were not disclosed, making it difficult to assess how reliable the SQL generation truly is in production
- The handling of "dirty data" was mentioned as a capability but not demonstrated or explained in technical detail
- The fine-tuning approach for intent detection was mentioned but details about training data, model selection, and validation were not provided
- The scalability of the clarifying questions approach—while useful—could potentially frustrate users if too many clarifications are needed for common queries

The case study represents a practical application of multiple LLM and NLP techniques in a production healthcare setting, demonstrating how hybrid architectures combining vector search, fine-tuned LLMs, and traditional databases can address real-world data accessibility challenges in regulated industries.