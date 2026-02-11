---
title: "Text-to-SQL System for Complex Healthcare Database Queries"
slug: "text-to-sql-system-for-complex-healthcare-database-queries"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3e5dcecffc9578827e12"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:45:30.284Z"
  createdOn: "2024-11-21T14:06:21.472Z"
llmopsTags:
  - "amazon-aws"
  - "anthropic"
  - "data-analysis"
  - "databases"
  - "error-handling"
  - "few-shot"
  - "healthcare"
  - "monitoring"
  - "prompt-engineering"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "serverless"
  - "sqlite"
  - "structured-output"
  - "system-prompts"
  - "token-optimization"
industryTags: "healthcare"
company: "MSD"
summary: "MSD collaborated with AWS Generative Innovation Center to implement a text-to-SQL solution using Amazon Bedrock and Anthropic's Claude models to translate natural language queries into SQL for complex healthcare databases. The system addresses challenges like coded columns, non-intuitive naming, and complex medical code lists through custom lookup tools and prompt engineering, significantly reducing query time from hours to minutes while democratizing data access for non-technical staff."
link: "https://aws.amazon.com/blogs/machine-learning/how-merck-uses-amazon-bedrock-to-translate-natural-language-into-sql-for-complex-healthcare-databases?tag=soumet-20"
year: 2024
seo:
  title: "MSD: Text-to-SQL System for Complex Healthcare Database Queries - ZenML LLMOps Database"
  description: "MSD collaborated with AWS Generative Innovation Center to implement a text-to-SQL solution using Amazon Bedrock and Anthropic's Claude models to translate natural language queries into SQL for complex healthcare databases. The system addresses challenges like coded columns, non-intuitive naming, and complex medical code lists through custom lookup tools and prompt engineering, significantly reducing query time from hours to minutes while democratizing data access for non-technical staff."
  canonical: "https://www.zenml.io/llmops-database/text-to-sql-system-for-complex-healthcare-database-queries"
  ogTitle: "MSD: Text-to-SQL System for Complex Healthcare Database Queries - ZenML LLMOps Database"
  ogDescription: "MSD collaborated with AWS Generative Innovation Center to implement a text-to-SQL solution using Amazon Bedrock and Anthropic's Claude models to translate natural language queries into SQL for complex healthcare databases. The system addresses challenges like coded columns, non-intuitive naming, and complex medical code lists through custom lookup tools and prompt engineering, significantly reducing query time from hours to minutes while democratizing data access for non-technical staff."
---

## Overview

MSD (Merck & Co., Inc.), a leading global pharmaceutical company headquartered in Rahway, New Jersey, partnered with the AWS Generative AI Innovation Center (GenAIIC) to build a production text-to-SQL solution. The goal was to streamline data extraction from complex healthcare databases by allowing analysts to query databases using natural language rather than writing SQL manually. This case study demonstrates a practical LLMOps implementation where LLMs are deployed to solve real enterprise data access challenges in the healthcare industry.

The core problem MSD faced was that their numerous analysts and data scientists were spending considerable time manually querying databases, which slowed productivity and delayed data-driven decision-making. The text-to-SQL solution was designed to address this bottleneck. For example, instead of constructing a complex SQL query, an analyst could simply ask "How many female patients have been admitted to a hospital in 2008?" and receive an executable SQL query in response. The solution aims to democratize data access, making it available to non-technical staff as well.

## Technical Architecture and LLM Selection

The solution is built using Anthropic's Claude 3.5 Sonnet model hosted on Amazon Bedrock. Amazon Bedrock is a fully managed service offering access to foundation models from multiple providers through a single API, with built-in security and privacy features. The choice of Claude 3.5 Sonnet reflects the need for a model with strong code generation capabilities and support for complex reasoning tasks. The system allows runtime selection of different Claude models through a Streamlit UI, providing flexibility for experimentation and optimization.

The pipeline utilizes the Amazon Bedrock Converse API for model invocation, which supports tool calling (function calling) capabilities. The temperature parameter is set to 0, which is recommended for code generation tasks to ensure deterministic and consistent outputs. This configuration choice reflects best practices in deploying LLMs for code-generation use cases where reproducibility is important.

## Custom Pipeline Design Addressing Real-World Data Challenges

While out-of-the-box text-to-SQL solutions exist in libraries like LangChain and LlamaIndex, the MSD team found that these baseline approaches were insufficient for their complex healthcare data. They developed a custom pipeline to address several industry-representative challenges:

**Coded Columns:** Healthcare databases often use numeric codes rather than human-readable values. For example, in the DE-SynPUF dataset, the sex column contains "1" for male and "2" for female. The solution implements lookup tools that the LLM can invoke to translate human-readable terms (like "female") into the appropriate database codes. This tool-calling approach keeps the main prompt manageable while giving the LLM access to necessary reference data.

**Non-Intuitive Column Names:** Healthcare databases frequently have cryptic column names derived from industry standards. The solution addresses this by including comprehensive column descriptions in the prompt, allowing the LLM to map user intent to appropriate database columns even when the column names themselves are not self-explanatory.

**Long Code Lists:** Healthcare queries often involve filtering on extensive lists of medical codes for procedures, diagnoses, or medications. Rather than having the LLM attempt to reproduce these potentially long lists in the generated SQL, the solution uses placeholder substitution. The input question is rewritten with placeholders like "CODE_X", the SQL is generated with these placeholders, and users can substitute the actual codes before execution. This approach improves reliability by avoiding transcription errors in long code sequences.

**Query Ambiguity:** To ensure alignment between user intent and generated SQL, the system instructs the LLM to produce both an interpretation/explanation of the query and the SQL statement itself. This allows users to verify that the LLM understood their request correctly before executing the query. For example, a query for "total number of male patients" would generate both a natural language description explaining the filtering and counting logic, and the corresponding SQL statement.

## Prompt Engineering and In-Context Learning

The solution employs sophisticated prompt engineering techniques. A comprehensive system prompt template is populated with multiple context variables:

The **database schema** is included as CREATE TABLE statements, giving the LLM complete visibility into table structures and column types. This is essential for generating syntactically correct and schema-compliant SQL.

**Sample data** from each table is provided to help the LLM understand the expected data formats and values. This helps avoid common errors like incorrect data type assumptions or format mismatches.

**Column and table descriptions** are formatted as XML data and included in the prompt. This metadata helps the LLM understand the semantic meaning of columns and tables beyond their technical names.

**Few-shot examples** are included to guide the LLM's behavior, particularly for complex cases like joins across multiple tables, handling of coded values, and proper use of the lookup tools. The examples cover a variety of query patterns including simple selections, filtering with code lists, and multi-condition queries spanning multiple tables. The case study notes that few-shot examples can be made more relevant using a RAG approach, where sample queries are embedded in a vector store and retrieved based on similarity to the incoming user query.

The prompt instructs the LLM to output the generated SQL in an XML-style `&lt;sql>` tag and the query description in a `<summary>` tag, enabling structured parsing of the response.

## Tool Calling Implementation

The tool calling capability is a key technical component of this LLMOps implementation. Three lookup tools are defined for translating sex/gender, race/ethnicity, and US state names into their corresponding database codes. Each tool is specified as a JSON schema describing the function name, description, and input parameters.

When the Converse API response indicates a `stopReason` of `tool_use`, the system extracts the tool call details, executes the corresponding function, and feeds the result back to the model to continue processing. This creates an agentic loop where the LLM can gather necessary information before finalizing the SQL query. The tool results are formatted according to the Converse API specifications and appended to the conversation history.

For example, when a user asks for "all patients from Wisconsin", the LLM recognizes it needs the state code, invokes the `get_state_code` tool with input "WI", receives the code "52", and incorporates this into the final SQL query. This approach separates reference data management from the core LLM prompt, improving maintainability and scalability.

## Production Considerations and Extensibility

The case study demonstrates several production-oriented design decisions. The use of Amazon Bedrock provides a managed infrastructure layer, handling model hosting, scaling, and API management. The temperature of 0 for code generation ensures consistent outputs across multiple runs of the same query.

The solution uses SQLite for the demonstration but is described as adaptable to other database engines by updating the prompt with appropriate schema and syntax information. This reflects a modular design that could support different backend databases in a production environment.

The case study suggests several potential extensions for production deployment: using Amazon Bedrock Knowledge Bases for RAG-based few-shot example retrieval, adding data visualization capabilities, integrating voice assistants, and supporting multiple languages. These extensions point toward a more comprehensive data access platform rather than a simple query tool.

## Results and Business Impact

According to the case study, the text-to-SQL solution has "markedly accelerated data access" at MSD, streamlining extraction from complex databases and facilitating faster decision-making. The solution reportedly reduces query time from hours to minutes, though specific metrics or controlled benchmarks are not provided. The democratization of data access is highlighted as a key benefit, enabling non-technical staff to extract insights without SQL expertise.

It should be noted that this case study is published through AWS marketing channels and co-authored by AWS and MSD personnel, so the reported benefits should be considered in that context. The solution addresses legitimate challenges in healthcare data access, and the technical approach is well-reasoned, but independent validation of the claimed productivity improvements is not provided in the text.

## Dataset and Testing

The solution is demonstrated using the DE-SynPUF (Data Entrepreneurs' Synthetic Public Use File) dataset, a synthetic Medicare claims database released by the Centers for Medicare and Medicaid Services. This dataset simulates Medicare claims data from 2008-2010 and includes de-identified patient records covering demographics, diagnoses, procedures, and medications. The use of synthetic data allows for realistic testing and demonstration without patient privacy concerns, making it suitable for developing and validating the text-to-SQL pipeline before deployment against actual production databases.