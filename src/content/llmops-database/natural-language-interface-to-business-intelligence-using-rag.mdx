---
title: "Natural Language Interface to Business Intelligence Using RAG"
slug: "natural-language-interface-to-business-intelligence-using-rag"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6792a79452279e76b878216a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:57:40.404Z"
  createdOn: "2025-01-23T20:33:24.195Z"
llmopsTags:
  - "chatbot"
  - "question-answering"
  - "code-generation"
  - "data-analysis"
  - "regulatory-compliance"
  - "rag"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "multi-agent-systems"
  - "agent-based"
  - "langchain"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "chromadb"
  - "wandb"
  - "openai"
  - "google-gcp"
  - "microsoft-azure"
  - "meta"
industryTags: "automotive"
company: "Volvo"
summary: "Volvo implemented a Retrieval Augmented Generation (RAG) system that allows non-technical users to query business intelligence data through a Slack interface using natural language. The system translates natural language questions into SQL queries for BigQuery, executes them, and returns results - effectively automating what was previously manual work done by data analysts. The system leverages DBT metadata and schema information to provide accurate responses while maintaining control over data access."
link: "https://www.youtube.com/watch?v=ZVlTrfeMND8"
year: 2024
seo:
  title: "Volvo: Natural Language Interface to Business Intelligence Using RAG - ZenML LLMOps Database"
  description: "Volvo implemented a Retrieval Augmented Generation (RAG) system that allows non-technical users to query business intelligence data through a Slack interface using natural language. The system translates natural language questions into SQL queries for BigQuery, executes them, and returns results - effectively automating what was previously manual work done by data analysts. The system leverages DBT metadata and schema information to provide accurate responses while maintaining control over data access."
  canonical: "https://www.zenml.io/llmops-database/natural-language-interface-to-business-intelligence-using-rag"
  ogTitle: "Volvo: Natural Language Interface to Business Intelligence Using RAG - ZenML LLMOps Database"
  ogDescription: "Volvo implemented a Retrieval Augmented Generation (RAG) system that allows non-technical users to query business intelligence data through a Slack interface using natural language. The system translates natural language questions into SQL queries for BigQuery, executes them, and returns results - effectively automating what was previously manual work done by data analysts. The system leverages DBT metadata and schema information to provide accurate responses while maintaining control over data access."
---

## Overview

This case study emerges from a podcast conversation featuring Jesper Fikson, an AI Engineer at Volvo, who discusses practical implementations of LLMs in production environments. The primary focus is on a Retrieval Augmented Generation (RAG) system built to automate data analyst workflows at Volvo Car Mobility, a subsidiary of Volvo Cars that operates car-sharing services. The conversation provides valuable insights into the evolution from data science to AI engineering, the practical challenges of deploying LLM-based systems, and the trajectory from simple RAG implementations toward more sophisticated autonomous agents.

## Company Context and Role Evolution

Jesper works in a unique position split between two domains: 50% as a data scientist for the car-sharing service optimizing algorithms, and 50% working on generative AI initiatives across Volvo Cars. The broader organization of "Commercial Digital" comprises approximately 1,500 people within the larger Volvo Cars structure.

A significant theme in the discussion is the evolution of roles in AI/ML organizations. Jesper makes a strong case for the distinction between data scientists and AI engineers, arguing that while data science focuses on building knowledge and proof of value (often in notebooks), AI engineering focuses on productionizing solutions and creating real business value. He notes that around 2022, the industry began shifting more toward product-focused, engineering-centric approaches. This observation aligns with broader industry trends where many data science POCs never reach production, highlighting the critical importance of engineering skills in LLMOps.

## The Problem: Ad-Hoc Data Requests

The specific use case addresses a common pain point in data teams: business stakeholders frequently post questions to Slack channels asking about operational metrics like "How many journeys did we have yesterday?" or "How many users signed up?" These questions, while valuable to the organization, require data team members to drop their current work, write SQL queries, and return results. This creates significant context-switching overhead and reduces time available for higher-value analytical work.

## Technical Solution Architecture

The solution is a Slack bot that enables non-technical users to ask natural language questions and receive data-driven answers automatically. The technical pipeline works as follows:

- **Input Layer**: A Slack bot monitors designated channels for user questions via the Slack API
- **Context Preparation**: The system includes database schema information and metadata as context for the LLM
- **LLM Processing**: OpenAI's GPT-4 Turbo receives the user question along with database context and generates appropriate BigQuery SQL
- **Query Execution**: The generated SQL query is executed against BigQuery via the Pandas API
- **Response Delivery**: Results are formatted and returned to the user in Slack

### Context Window Management

One of the most interesting technical insights relates to context window management. When GPT-4 Turbo's 128K token context window was released (during OpenAI's developer day), Jesper realized he could simply include the entire database schema without needing vector database-based semantic search. This represents a pragmatic engineering decision: the schema files were small enough to fit entirely within the expanded context, eliminating architectural complexity.

However, Jesper notes important limitations around the 128K context window. While the hard limit is 128K tokens, effective usage is considerably lower—he suggests not exceeding 40-50K tokens maximum. This aligns with research around LLMs "forgetting" information in the middle of long contexts, with better retention at the beginning and end of prompts.

### DBT Integration for Metadata

The solution leverages DBT (Data Build Tool) as a key component. DBT provides more than just schema information—it includes YAML files with:

- Table and column descriptions (documentation)
- Enum values for columns with limited value sets
- Additional metadata that helps the LLM understand the semantic meaning of database structures

This metadata is crucial because ChatGPT needs to understand not just the technical schema but also business semantics. For example, knowing that a column contains values like "B2B" or "B2C" helps the model generate accurate queries. Without this contextual information, the LLM would struggle to correctly reference specific values in WHERE clauses.

### Semantic Search Considerations

Jesper mentions that they initially experimented with semantic search (embeddings-based retrieval) to find relevant parts of the schema based on question similarity. However, with the expanded context window, this became unnecessary for their use case. The system stores context "on file" rather than in a vector database, demonstrating that not every RAG implementation requires vector databases—the architecture should match the scale of the data.

## Production Status and Results

The system is described as being "in production" at Volvo Car Mobility. The practical benefit is that non-technical users can ask natural language questions about car counts, user signups, journey statistics, and other operational metrics without requiring data team intervention. Jesper describes the experience of seeing it work as "like magic."

The solution acknowledges current limitations—it returns tabular data rather than visualizations, though this is noted as a potential future enhancement.

## From RAG to Autonomous Agents

The conversation extends beyond simple RAG to discuss the trajectory toward autonomous agents. Jesper frames this evolution in terms of capabilities:

- **Perception**: Taking input and understanding it (what current LLMs do well)
- **Planning**: Breaking down goals into subtasks and determining strategies (emerging capability)
- **Control/Action**: Actually executing changes in the world (limited in current systems)

The Slack bot example is positioned as a very limited agent—it does take action by executing queries against BigQuery—but true autonomous agents would require more sophisticated planning and broader action capabilities.

### The Rabbit R1 and Large Action Models

The discussion references the Rabbit R1 device as an interesting development in the agent space. Unlike traditional LLMs trained on next-word prediction, Rabbit claims to train a "Large Action Model" on interactions with computer interfaces. This represents a different training paradigm focused on learning action trajectories rather than text generation.

## Engineering Philosophy and Pragmatism

Throughout the conversation, Jesper emphasizes pragmatic engineering over theoretical purity. Key principles include:

- **"Hacks" are valuable**: RAG itself is described as a "hacky" solution compared to fine-tuning, but it works and is faster to implement
- **Engineering over science**: The shift from proof-of-concept notebooks to production systems requires engineering skills
- **Incremental improvement**: The path to autonomous agents will be evolutionary, building on current capabilities rather than revolutionary breakthroughs
- **Modularity vs. end-to-end**: There's tension between end-to-end trained systems (like Tesla's FSD v12) and modular architectures. Current production systems tend to be modular due to practical constraints, but the long-term trajectory may favor end-to-end approaches

## Context on Voice Interfaces and Accessibility

An interesting aside in the conversation covers using ChatGPT's voice mode to help Jesper's 76-year-old father who is going blind due to retinal detachment. This demonstrates LLM applications beyond traditional enterprise use cases—voice interfaces enabling access for users who cannot type or read screens. The multimodal capabilities (voice input/output, image description) represent emerging productionization opportunities.

## Broader LLMOps Observations

The discussion touches on several broader LLMOps themes:

- **Model selection**: The conversation occurs during the transition period when models are rapidly evolving (GPT-4 Turbo, Gemini Pro, etc.)
- **Context window evolution**: The jump from 4K to 32K to 128K tokens fundamentally changes what's possible in RAG architectures
- **Prompt engineering**: The importance of structuring context (schema + metadata + enums) to help the LLM generate accurate queries
- **Multilingual support**: ChatGPT's ability to handle Swedish language queries and responses expands accessibility

## Critical Assessment

While the case study presents a successful production deployment, several caveats should be noted:

- The complexity of queries that can be reliably handled is not fully explored
- Error handling and query validation approaches are not detailed
- The system appears suited for relatively straightforward analytics queries rather than complex multi-table joins or aggregations
- Cost considerations for API calls are not discussed

The solution represents a practical, achievable LLMOps implementation that delivers tangible business value while acknowledging the current limitations of the technology.