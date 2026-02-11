---
title: "Evolution of Hermes V3: Building a Conversational AI Data Analyst"
slug: "evolution-of-hermes-v3-building-a-conversational-ai-data-analyst"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68be926fb52eef0377421cdb"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:20:39.628Z"
  createdOn: "2025-09-08T08:23:11.703Z"
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "chatbot"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "agent-based"
  - "multi-agent-systems"
  - "chunking"
  - "system-prompts"
  - "postgresql"
  - "elasticsearch"
  - "langchain"
  - "monitoring"
  - "security"
  - "compliance"
  - "guardrails"
  - "api-gateway"
  - "microservices"
  - "anthropic"
  - "amazon-aws"
industryTags: "e-commerce"
company: "Swiggy"
summary: "Swiggy transformed their basic text-to-SQL assistant Hermes into a sophisticated conversational AI analyst capable of contextual querying, agentic reasoning, and transparent explanations. The evolution from a simple English-to-SQL translator to an intelligent agent involved implementing vector-based prompt retrieval, conversational memory, agentic workflows, and explanation layers. These enhancements improved query accuracy from 54% to 93% while enabling natural language interactions, context retention across sessions, and transparent decision-making processes for business analysts and non-technical teams."
link: "https://bytes.swiggy.com/hermes-v3-building-swiggys-conversational-ai-analyst-a41057a2279d"
year: 2025
seo:
  title: "Swiggy: Evolution of Hermes V3: Building a Conversational AI Data Analyst - ZenML LLMOps Database"
  description: "Swiggy transformed their basic text-to-SQL assistant Hermes into a sophisticated conversational AI analyst capable of contextual querying, agentic reasoning, and transparent explanations. The evolution from a simple English-to-SQL translator to an intelligent agent involved implementing vector-based prompt retrieval, conversational memory, agentic workflows, and explanation layers. These enhancements improved query accuracy from 54% to 93% while enabling natural language interactions, context retention across sessions, and transparent decision-making processes for business analysts and non-technical teams."
  canonical: "https://www.zenml.io/llmops-database/evolution-of-hermes-v3-building-a-conversational-ai-data-analyst"
  ogTitle: "Swiggy: Evolution of Hermes V3: Building a Conversational AI Data Analyst - ZenML LLMOps Database"
  ogDescription: "Swiggy transformed their basic text-to-SQL assistant Hermes into a sophisticated conversational AI analyst capable of contextual querying, agentic reasoning, and transparent explanations. The evolution from a simple English-to-SQL translator to an intelligent agent involved implementing vector-based prompt retrieval, conversational memory, agentic workflows, and explanation layers. These enhancements improved query accuracy from 54% to 93% while enabling natural language interactions, context retention across sessions, and transparent decision-making processes for business analysts and non-technical teams."
---

## Overview

Swiggy's Hermes represents a comprehensive case study in the evolution of production LLM systems, demonstrating how an organization can iteratively improve a text-to-SQL assistant into a sophisticated conversational AI analyst. The journey from Hermes V1 to V3 showcases multiple LLMOps challenges and solutions, particularly around accuracy improvement, contextual understanding, and production reliability in a business-critical environment.

Initially launched as a lightweight GenAI-powered text-to-SQL assistant embedded in Slack, Hermes was designed to democratize data access by enabling Swiggy employees to query data in plain English without writing SQL. The system was positioned to eliminate repetitive query writing for analysts while empowering non-technical teams to access data independently. However, the initial implementation faced significant limitations that are common in early-stage LLM deployments: struggles with niche metrics and derived logic, lack of conversational context, absence of explainability, and inconsistent outputs across similar prompts.

## Technical Architecture Evolution

The transformation of Hermes involved several key LLMOps innovations that address common production challenges. The architecture evolution demonstrates sophisticated approaches to improving LLM accuracy and reliability in enterprise settings.

### Vector-Based Prompt Retrieval System

One of the most significant technical advances involved implementing a few-shot learning system through historical query embeddings. The team recognized that while Swiggy had a substantial corpus of SQL queries executed on Snowflake, these queries lacked the metadata necessary for traditional training approaches. The insight that LLMs are better at understanding SQL than writing it led to an innovative SQL2Text pipeline using large context Claude models.

This system works by taking existing SQL queries and their business context to generate corresponding natural language prompts. When users ask questions, the system searches for similar prompts using vector similarity and injects the top results as few-shot examples to guide the LLM. This approach represents a sophisticated form of retrieval-augmented generation specifically tailored for SQL generation tasks.

The results were dramatic, improving accuracy from 54% to 93% on a benchmark of approximately 100 manually tagged queries. More importantly, the system reduced fully incorrect queries from 20% to just 7%, which is crucial for maintaining trust in a production data analysis system.

### Conversational Memory Implementation

The transformation from a stateless command tool to a conversational agent required implementing contextual memory that remembers recent prompts and carries context forward across sessions. This allows for natural, iterative querying where users can refine requests without repeating context, such as asking for AOV for yesterday, then adding a filter for Bangalore, then requesting GMV to be included.

Behind this functionality lies an Agent layer that examines conversation history and decides appropriate actions, whether to clarify ambiguous requests, rewrite queries, fetch metadata, or execute commands. This conversational capability makes interactions more intuitive and bridges gaps in query resolution while enabling real-time refinements.

### Agentic Workflow Architecture

As Hermes evolved into a conversational assistant, the team implemented a structured agentic flow using a ReAct-style reasoning loop. This architecture introduces an orchestrator agent that manages decision flows and breaks down complex tasks into smaller, manageable steps.

The agent can parse user intent and check for completeness, maintain conversational context and prompt memory, retrieve metadata including tables, columns, and definitions, query the vector database for few-shot examples, generate intermediate logic before producing final SQL, and seek clarification from users when necessary. This structured approach led to a 20-25% increase in query accuracy on ambiguous prompts and virtually eliminated "table not found" errors.

### Explanation and Transparency Layer

Addressing the critical need for transparency in AI-generated SQL, the team built an explanation layer that breaks down assumptions made by Hermes, details logical steps used to build queries, and assigns confidence scores from 1 (low) to 3 (high). This explainability component is crucial for building trust in production AI systems, particularly in data analysis contexts where incorrect queries can lead to poor business decisions.

The explanation layer represents a sophisticated approach to AI transparency, providing users with the context needed to evaluate and trust the generated SQL. This is particularly important in enterprise settings where data integrity and decision-making accuracy are paramount.

## Production Operations and Quality Control

The LLMOps implementation includes robust operational practices designed to maintain quality at scale. The team implemented automated test suites triggered for each newly onboarded charter to validate all defined metrics, ensuring that system expansions don't compromise existing functionality.

Quality control involves collecting weekly feedback via Slack with simple "Was this correct? Yes/No" responses, followed by root cause analyses for every negative response. Fixes are then rolled out proactively across all similar metrics in that charter, demonstrating a systematic approach to continuous improvement.

The metadata handling system was redesigned to improve accuracy through a hybrid strategy. Rather than relying solely on generic embeddings to infer column names, the system first fetches tables based on metric definitions and table descriptions, then retrieves column names from those specific tables. For wide tables, columns are chunked in batches of 75 to stay under token limits, showing careful consideration of practical LLM constraints.

## Security and Privacy Implementation

The production deployment maintains a privacy-first design with RBAC-based data access using Snowflake's existing permissions, ephemeral replies ensuring only the person who queries sees results, comprehensive audit logs of all prompts and responses for compliance, and SSO-authenticated access via existing Slack identity controls.

The team chose a hybrid approach for deployment, defaulting to private DMs for querying while maintaining one central help channel for escalations and feedback. This design balances privacy requirements with the need for support and community engagement.

## Challenges and Limitations

While the case study presents impressive improvements, it's important to note potential limitations and areas where claims should be evaluated critically. The 54% to 93% accuracy improvement is based on a relatively small benchmark of 100 manually tagged queries, which may not represent the full complexity of real-world usage. The manual tagging process itself could introduce bias, and the benchmark may not capture edge cases that emerge at scale.

The conversational memory implementation, while impressive, likely has limitations in terms of context window management and potential context drift over longer conversations. The agentic workflow architecture, while sophisticated, introduces additional complexity that could impact system reliability and troubleshooting.

## Production Impact and Scaling

The evolution of Hermes demonstrates several key LLMOps principles in action. The iterative improvement approach, starting with a basic text-to-SQL system and progressively adding sophistication, reflects good production practices. The focus on user feedback and systematic quality improvement shows mature operational thinking.

The system's integration into Slack represents thoughtful consideration of user experience and adoption barriers. By embedding the AI assistant in an existing workflow tool, Swiggy reduced friction for users while maintaining security and governance controls.

The case study indicates that Hermes has become the backbone for other internal AI co-pilots and evolved into a "Text to Insights" tool, suggesting successful scaling and expansion beyond the original use case. However, the text doesn't provide detailed metrics on usage patterns, user adoption rates, or quantified business impact, which would strengthen the case study evaluation.

## Technical Lessons for LLMOps Practitioners

This case study offers several valuable insights for LLMOps practitioners. The use of SQL2Text for generating training examples represents an innovative approach to the common problem of lacking labeled data in specialized domains. The vector-based retrieval system demonstrates how to effectively implement few-shot learning in production environments.

The agentic architecture shows how to structure complex AI workflows while maintaining explainability and control. The focus on gradual capability enhancement rather than trying to solve all problems simultaneously reflects mature product development thinking.

The emphasis on transparency and explanation layers addresses a critical need in enterprise AI deployments. The systematic approach to quality monitoring and improvement provides a template for maintaining AI system performance over time.

Overall, Swiggy's Hermes evolution represents a sophisticated implementation of multiple LLMOps best practices, though practitioners should critically evaluate the specific metrics and claims while extracting the underlying principles and approaches for their own contexts.