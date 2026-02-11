---
title: "Optimizing Text-to-SQL Pipeline Using Agent Experiments"
slug: "optimizing-text-to-sql-pipeline-using-agent-experiments"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3cd7dde84db0ba241375"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:38:12.892Z"
  createdOn: "2024-11-21T13:59:51.928Z"
llmopsTags:
  - "cost-optimization"
  - "crewai"
  - "data-analysis"
  - "databases"
  - "fastapi"
  - "latency-optimization"
  - "model-optimization"
  - "multi-agent-systems"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "rag"
  - "reliability"
  - "scalability"
industryTags: "tech"
company: "IDInsight"
summary: "Ask-a-Metric developed a WhatsApp-based AI data analyst that converts natural language questions to SQL queries. They evolved from a simple sequential pipeline to testing an agent-based approach using CrewAI, ultimately creating a hybrid \"pseudo-agent\" pipeline that combined the best aspects of both approaches. While the agent-based system achieved high accuracy, its high costs and slow response times led to the development of an optimized pipeline that maintained accuracy while reducing query response time to under 15 seconds and costs to less than $0.02 per query."
link: "https://idinsight.github.io/tech-blog/blog/aam_pseudo_agent/"
year: 2024
seo:
  title: "IDInsight: Optimizing Text-to-SQL Pipeline Using Agent Experiments - ZenML LLMOps Database"
  description: "Ask-a-Metric developed a WhatsApp-based AI data analyst that converts natural language questions to SQL queries. They evolved from a simple sequential pipeline to testing an agent-based approach using CrewAI, ultimately creating a hybrid \"pseudo-agent\" pipeline that combined the best aspects of both approaches. While the agent-based system achieved high accuracy, its high costs and slow response times led to the development of an optimized pipeline that maintained accuracy while reducing query response time to under 15 seconds and costs to less than $0.02 per query."
  canonical: "https://www.zenml.io/llmops-database/optimizing-text-to-sql-pipeline-using-agent-experiments"
  ogTitle: "IDInsight: Optimizing Text-to-SQL Pipeline Using Agent Experiments - ZenML LLMOps Database"
  ogDescription: "Ask-a-Metric developed a WhatsApp-based AI data analyst that converts natural language questions to SQL queries. They evolved from a simple sequential pipeline to testing an agent-based approach using CrewAI, ultimately creating a hybrid \"pseudo-agent\" pipeline that combined the best aspects of both approaches. While the agent-based system achieved high accuracy, its high costs and slow response times led to the development of an optimized pipeline that maintained accuracy while reducing query response time to under 15 seconds and costs to less than $0.02 per query."
---

## Overview

IDInsight, a data science consulting organization focused on the development and social impact sector, developed Ask-a-Metric, a WhatsApp-based AI data analyst that connects to SQL databases and answers user questions using Large Language Models. The system is designed to streamline data access for decision-making at organizations like governments and NGOs. This case study provides a transparent look at the iterative process of building an LLM-powered text-to-SQL system, including the challenges faced and the pragmatic solutions developed to balance accuracy, cost, and response time in a production environment.

The core problem Ask-a-Metric solves is enabling non-technical users to query databases through natural language via WhatsApp. For example, a user might ask "How many beds are there in hospitals in Chennai?" and the system must understand the question, comprehend the database structure, conduct accurate SQL analysis, and return an appropriate response—all while ensuring safety and security.

## Initial Architecture: The Simple Pipeline

The team initially built what they called a "simple pipeline" following a philosophy of building quickly to gather user feedback rather than following best practices or building for scale. The backend was built using Python's FastAPI framework with a functional programming paradigm where all pipeline operations were implemented through functions.

This approach allowed rapid deployment and testing across multiple databases, but the team encountered three significant challenges that are common in LLM production systems:

**Accuracy Issues**: The LLM responses were not accurate enough for production use. The team recognized they needed to break the problem into smaller steps and provide the LLM with more contextual information to complete tasks accurately.

**Prompt Engineering Fragility**: One of the most telling challenges was that minor changes to prompts that improved performance on one set of questions would degrade performance on another set. This made holistic system improvement extremely difficult—a common problem in production LLM systems where prompt changes can have unexpected cascading effects.

**Pipeline Modification Difficulty**: The sequential architecture created tight coupling between steps, meaning that changing a prompt could require modifications throughout the entire pipeline. This made experimentation and iterative improvement prohibitively slow.

## Agentic Experimentation with CrewAI

To address these challenges, the team experimented with an agentic approach using CrewAI, an open-source multi-agent pipeline tool. They define an AI agent as an LLM-driven system that remembers and learns from past actions, uses tools based on its own choosing, and plans tasks autonomously.

The agentic pipeline consisted of two agents:
- A customer-facing manager agent
- A data analyst agent

Each agent was equipped with relevant tools, leveraging both CrewAI's built-in tools and Langchain's compatible tools:
- SQL DDL schema tool for reading the entire database schema
- SQL tool for executing arbitrary SQL queries
- RAG tool for querying column descriptions from a CSV file

The agent could flexibly choose when and how to use these tools while attempting to solve tasks. From an accuracy standpoint, the CrewAI-based pipeline performed excellently, correctly answering all questions from the test database.

However, the production metrics were problematic:
- Response time: More than 1 minute per query
- Cost: Approximately $0.30 per query

The team's production requirements were much stricter:
- Response time: Less than 30 seconds (2-3x faster)
- Cost: Less than $0.03 per query (10x cheaper)

This is a critical lesson in LLMOps: high accuracy alone is insufficient for production systems. The operational constraints of cost, latency, and reliability must be balanced against model performance.

## Key Insight: Using Agents to Discover Optimal Pipelines

The most valuable insight from this case study is how the team reframed their use of agents. Rather than using agents directly in production, they used the agentic pipeline as an optimization tool to discover the best prompts, tools, and workflow sequences.

Two key observations emerged from the agentic experiments:

**Agent Predictability**: Despite having full autonomy, the agent was remarkably consistent in the sequence of actions it took. This included self-prompting, reflecting on past actions, and breaking down tasks into smaller steps. The team realized they could extract these patterns and hardcode them into a deterministic pipeline.

**Object-Oriented Benefits**: CrewAI's object-oriented approach modularized and decoupled different parts of the pipeline, making modifications easier. The team recognized they should adopt a similar structure.

The team conceptualized this as an optimization problem where agents implicitly perform a "search" over the parameter space of:
- Number and complexity of steps required to complete a task
- Types of tools/functions to use
- Exact language and wording of prompts

The agents help find the optimal combination that maximizes response accuracy at minimal cost. They note that this idea is gaining popularity in the AI community with libraries like DSPy that focus on prompt engineering optimization.

## The Pseudo-Agent Pipeline: Production Architecture

Using insights from the agentic experiments, the team built what they call a "pseudo-agent" pipeline that combines the low cost and quick response time of the simple pipeline with the accuracy improvements from the agentic approach.

Key technical aspects of the pseudo-agent pipeline include:

**Task Decomposition**: Breaking tasks into smaller steps such as identifying relevant tables, finding the best columns, and extracting sample column values—each as separate API calls. This mirrors what the agent did naturally but in a controlled, optimized manner.

**Selective Action Incorporation**: Only incorporating the actions that the agentic flow actually executed, while eliminating expensive self-reflection and planning API calls that added cost without proportional value.

**Minimal Data Sharing**: Sharing only the required data for each API call rather than passing full flow logs to the LLM at each step. This reduces token usage and cost.

**Fixed-Scope Tools**: Building custom tools with fixed scope that quickly produce required outputs, rather than using general-purpose tools that may be more expensive or slower.

The team also refactored their code to an object-oriented paradigm, breaking the pipeline into components for processing user queries, guardrails, and tools. This architectural change allows them to modify guardrails without affecting query processing, addressing the tight coupling issues from the original simple pipeline.

## Production Results

The pseudo-agent pipeline achieved impressive results:
- Response time: Less than 15 seconds (meeting the &lt;30 second requirement)
- Cost: Less than $0.02 per query (meeting the &lt;$0.03 requirement)
- Accuracy: Maintained at the level achieved by the full agentic flow

This represents an order of magnitude improvement in both cost and speed compared to the agentic approach while preserving accuracy gains.

## LLMOps Lessons and Best Practices

This case study illustrates several important LLMOps principles:

**Iterative Development Philosophy**: Building quickly to gather feedback, even without following all best practices, can be valuable for understanding real-world performance and identifying improvement areas.

**Production Constraints Matter**: A system that achieves 100% accuracy but costs $0.30 per query and takes over a minute is not viable for many production use cases. LLMOps requires balancing accuracy against cost, latency, and scalability.

**Agents as Development Tools**: Rather than deploying agents directly, they can be used as optimization tools to discover effective prompts, tool combinations, and workflow sequences that can then be hardcoded into more efficient pipelines.

**Decoupling and Modularity**: Object-oriented design patterns that decouple pipeline components (guardrails, tools, query processing) make systems easier to maintain and modify—a critical requirement for iterative improvement.

**Prompt Engineering Complexity**: The observation that prompt changes can have unpredictable effects across different query types highlights the importance of comprehensive evaluation and testing in LLMOps.

## Future Directions

The team notes they are continuing to improve the solution across accuracy, speed, and cost metrics while adding features like multi-turn chat, easier user onboarding, and multi-language support. They are also conducting pilots in multiple contexts to gather feedback and increase value for users in governments, NGOs, and other social impact organizations.

This case study represents a pragmatic approach to LLMOps that acknowledges the gap between what is technically possible with agentic systems and what is practically deployable in production environments with real cost and latency constraints.