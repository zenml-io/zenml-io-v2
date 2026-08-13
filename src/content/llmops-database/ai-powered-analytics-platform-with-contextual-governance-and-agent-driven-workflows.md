---
title: "AI-Powered Analytics Platform with Contextual Governance and Agent-Driven Workflows"
slug: "ai-powered-analytics-platform-with-contextual-governance-and-agent-driven-workflows"
draft: false
llmopsTags:
  - "fraud-detection"
  - "data-analysis"
  - "chatbot"
  - "question-answering"
  - "agent-based"
  - "prompt-engineering"
  - "semantic-search"
  - "evals"
  - "postgresql"
  - "mysql"
  - "sqlite"
  - "databases"
  - "monitoring"
  - "guardrails"
  - "documentation"
  - "compliance"
  - "anthropic"
industryTags: "tech"
company: "Hex"
summary: "Hex addresses the challenge of data teams struggling to meet infinite demand for insights while managing fragmented tooling across BI tools, notebooks, SQL editors, and spreadsheets. Their solution provides a unified analytics platform that combines deep technical workflows (SQL, Python notebooks) with AI agent capabilities for both technical users and business stakeholders. The platform integrates tightly with ClickHouse for high-performance data processing and features sophisticated context management through their Context Studio, enabling governed self-service analytics. Key results include the ability to scaffold complex analyses in minutes rather than days using notebook agents, compound knowledge through endorsed projects that become reusable context, and enterprise-grade observability for monitoring agent performance and identifying context gaps across over 2,000 customers globally, with 300+ shared customers between Hex and ClickHouse."
link: "https://www.youtube.com/watch?v=zlwqx05qNSk"
year: 2026
seo:
  title: "Hex: AI-Powered Analytics Platform with Contextual Governance and Agent-Driven Workflows - ZenML LLMOps Database"
  description: "Hex addresses the challenge of data teams struggling to meet infinite demand for insights while managing fragmented tooling across BI tools, notebooks, SQL editors, and spreadsheets. Their solution provides a unified analytics platform that combines deep technical workflows (SQL, Python notebooks) with AI agent capabilities for both technical users and business stakeholders. The platform integrates tightly with ClickHouse for high-performance data processing and features sophisticated context management through their Context Studio, enabling governed self-service analytics. Key results include the ability to scaffold complex analyses in minutes rather than days using notebook agents, compound knowledge through endorsed projects that become reusable context, and enterprise-grade observability for monitoring agent performance and identifying context gaps across over 2,000 customers globally, with 300+ shared customers between Hex and ClickHouse."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-analytics-platform-with-contextual-governance-and-agent-driven-workflows"
  ogTitle: "Hex: AI-Powered Analytics Platform with Contextual Governance and Agent-Driven Workflows - ZenML LLMOps Database"
  ogDescription: "Hex addresses the challenge of data teams struggling to meet infinite demand for insights while managing fragmented tooling across BI tools, notebooks, SQL editors, and spreadsheets. Their solution provides a unified analytics platform that combines deep technical workflows (SQL, Python notebooks) with AI agent capabilities for both technical users and business stakeholders. The platform integrates tightly with ClickHouse for high-performance data processing and features sophisticated context management through their Context Studio, enabling governed self-service analytics. Key results include the ability to scaffold complex analyses in minutes rather than days using notebook agents, compound knowledge through endorsed projects that become reusable context, and enterprise-grade observability for monitoring agent performance and identifying context gaps across over 2,000 customers globally, with 300+ shared customers between Hex and ClickHouse."
notion:
  pageId: "3b8f8dff-2538-80ee-ac93-cabd6d02176d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T15:10:00.000Z"
  lastEditedTime: "2026-08-10T15:10:00.000Z"
  publishedAt: "2026-08-10T15:23:02Z"
---

## Overview

Hex has built an analytics platform that exemplifies modern LLMOps practices by integrating AI agents deeply into production workflows while maintaining enterprise-grade governance and observability. The platform serves over 2,000 customers globally including notable companies like Anthropic, Cursor, Rivian, and Notion, with over 300 customers shared with their database partner ClickHouse. The core problem Hex addresses is the struggle data teams face meeting infinite demand for insights while working across fragmented tooling including BI tools, notebooks, SQL editors, and spreadsheets, which results in logic being spread across systems and teams constantly rebuilding work from scratch.

The platform's architecture enables multiple personas to work together in a unified environment: technical analysts and data scientists working in notebook interfaces with agents that can browse data, reason, write SQL and Python, and build charts; business users consuming insights through interactive data apps and dashboards; and stakeholders using natural language for full self-service analytics. All of these workflows are anchored in what Hex calls trusted context, managed through their Context Studio, which provides sophisticated curation tools for managing semantic models, business logic, and visibility into agent performance.

## Agent-Driven Development Workflows

Hex has embedded AI agents directly into the notebook development experience, allowing technical users to dramatically accelerate the creation of complex analyses. In the demonstration, a user prompted the notebook agent to build a fraud detection model using card transaction data stored in ClickHouse, providing a plan with several sections including initial analysis, card-not-present metrics, card-present metrics, model building with training and testing, hyperparameter tuning, and model scoring. The agent was able to scaffold the entire notebook analysis autonomously, building out all sections in minutes rather than the days it would traditionally take a human analyst.

The agent operates as a coding assistant with access to the same cell types that human developers use, including SQL cells, Python cells, and visualization cells. It can write queries in the ClickHouse native SQL dialect, leverage ClickHouse-specific functions like sumif, write Pandas-like Python code using the CHDB library for lazy evaluation, and create visualizations using the built-in drag-and-drop editor. The resulting notebooks become live, collaborative documents similar to Google Docs, where multiple editors can work simultaneously with real-time updates and integrated commenting for asynchronous collaboration.

After the agent scaffolds an analysis, human analysts can curate the work, make tweaks, and ask the agent to edit specific portions, creating a collaborative human-AI workflow. This pattern of AI-first scaffolding followed by human refinement appears to be a core productivity driver in the platform, transforming what would be multi-day projects into afternoon exercises.

## Generative Application Building

Beyond notebook development, Hex employs agents to automatically generate custom data applications on top of analyses. Once a technical user completes their notebook analysis, they can use natural language prompts to describe what they want their data app to look like. The agent examines all the logic built in the notebook, including queries, Python code, and visualizations, then builds a completely custom JavaScript front end for the data app.

In the fraud detection example, the agent created a tabbed application with different functional sections including an overview of fraud analysis with KPIs showing model performance and fraud loss metrics, interactive elements allowing users to change model parameters and business logic decisions like decline rates and minimums, and a narrative-style scrollable view presenting the analysis as a consumable document for less technical stakeholders. The applications are published on unique URLs, are embeddable in other surfaces like internal portals or products, and maintain all the governance controls of the underlying notebook.

This generative app capability allows data teams to create highly customized interfaces for different audiences without requiring traditional front-end development skills, democratizing access to sophisticated analyses while maintaining the connection to trusted, governed data and logic.

## Context Management and Semantic Layer

The Context Studio represents Hex's approach to solving one of the most challenging aspects of LLMOps: ensuring agents have the right context to provide accurate, trusted answers. The system operates on multiple layers of context that can be authored natively in Hex or imported from external sources.

At the foundational level, administrators can endorse specific databases, tables, and data connections as analytics-ready and appropriate for agent use. This endorsement workflow creates a separation between data that technical users can access for deep-dive ad-hoc analysis and data that should be available to agents answering questions for business stakeholders. The recognition that not all connected data is appropriate for agent-driven self-service is a crucial governance consideration.

Beyond data endorsements, users can endorse notebook projects and data apps. When a project is endorsed, the SQL logic and Python code within it becomes reusable context for agents. Rather than recreating queries or visualizations, agents can identify that a question has already been answered and reuse existing verified logic, creating a compounding context effect where every answered question potentially improves future agent performance.

Hex supports importing context from external sources through reference repositories, allowing teams to connect GitHub or Git repos containing existing context like dbt model repos, code repositories, or skill files created for other LLM environments like Code. This enables teams to leverage context work done across their organization rather than recreating it specifically for Hex.

For teams without existing context repositories, Hex provides the ability to author guide files directly in the platform. These markdown files function as skill files, containing business vocabulary and terminology definitions, acronym explanations, pseudo-semantic information mapping key terms and concepts to appropriate data sources, and business context for common question types. In the fraud analytics example, the guide file defined fraud-related terminology, identified which data should be used for different fraud concepts, and provided context about business questions related to fraud.

Semantic models can also be authored in Hex or imported from other specifications including Snowflake semantic views, dbt metric flow, and Cube. This interoperability allows teams that have already invested in semantic modeling elsewhere to enable that work in Hex with minimal friction.

## Conversational Analytics and Self-Service

Business stakeholders can leverage agents through conversational threads, asking questions in natural language without needing to understand the underlying data structure or query languages. When a user asks a question like "how is our fraud loss trending over the last 6 months," the agent searches the workspace to understand what data access the user has based on their permissions, leverages ClickHouse metadata around database, table, and column descriptions, and pulls from the various context sources including guides, semantic models, and endorsed projects to determine the right data and approach.

The agent generates a complete analysis including a summary of the work performed, key takeaways, supporting visualizations, and crucially, any assumptions it made during the analysis with opportunities for the user to validate those assumptions. This assumption-surfacing capability represents a more sophisticated approach than simply returning answers, as it acknowledges uncertainty and invites human validation.

Under the hood, these conversational threads are powered by the same Hex notebook infrastructure used by technical analysts. The agent creates a Hex project using the same cell types, data connections, and tools, which makes every agent response fully inspectable. Users can open the underlying project to examine queries written, Python code created, and visualizations built, providing transparency into agent reasoning and enabling technical users to refine or extend agent-generated analyses.

## Observability and Continuous Improvement

Hex has built comprehensive observability capabilities specifically designed for monitoring and improving agent performance in production. The observability dashboard provides visibility into how users engage with AI agents across the platform, whether through notebook agents helping build technical analyses or conversational threads for business self-service.

The system synthesizes threads into topics, clustering conversations by common themes to help administrators understand what users are asking agents about and whether context coverage is adequate for those conversation types. At a more granular level, administrators can inspect individual atomic threads and see all conversations.

A sophisticated warning and flagging system identifies potential issues based on both user responses and agent behavior. User doubt is flagged when language suggests uncertainty about agent answers, such as "try again" or expressions of confusion. Context gaps are flagged when agents identify ambiguity, such as similar columns from different tables where the agent is unsure which to use. These warnings are searchable and filterable in the observability view, allowing administrators to quickly identify problematic interactions.

Most notably, Hex aggregates flagged warnings into proactive suggestions for context improvements. The system uses individual threads as evidence for why specific changes should be made, providing summaries of potential changes, identifying the specific guide files or semantic models that need updates, and offering suggestions for how to close context gaps. For content authored natively in Hex, administrators can publish and test changes directly from this workflow. For externally-authored content synced from sources like GitHub repos or Snowflake semantic views, Hex provides a CLI that can hit the suggestions endpoint, allowing teams to pull suggestions into their development environments, make changes externally, and sync updated context back to Hex.

This closed-loop feedback system transforms agent observability from passive monitoring into active continuous improvement, using production interactions to systematically identify and address context gaps and quality issues.

## Technical Integration with ClickHouse

The tight integration between Hex and ClickHouse demonstrates how purpose-built database integrations can enhance LLMOps workflows. ClickHouse provides foundational database infrastructure for high-performance queries, while Hex provides efficient workflows for agent-driven analytics. The integration operates on two levels: a first-class SQL connector allowing direct querying of ClickHouse databases and the CHDB Python library enabling Pandas-like workflows with lazy evaluation.

Setting up the ClickHouse connection requires workspace admins to configure credentials and permissions, after which users can write queries in the ClickHouse native SQL dialect and leverage ClickHouse-specific functions directly in SQL cells. The CHDB session can be enabled with a single button click, inserting a Python cell that establishes the connection and allows subsequent Python code using the CHDB library to be lazily evaluated and executed against the ClickHouse deployment rather than in local notebook memory.

This architecture means data isn't streamed into the Hex notebook and held in memory; instead, queries and code are pushed down to the ClickHouse database for execution. CHDB supports a flexible data source notion, allowing teams to configure whether processing happens in the ClickHouse cloud server for heavy compute needs or in the local Python runtime for simpler operations. Data sources can even be remote Postgres instances, MySQL servers, or any integration engine available in ClickHouse, providing flexibility in how data is accessed and processed.

The result is that agents writing SQL queries or Python code during conversational analytics or generative app building are leveraging ClickHouse's speed and scale, making agent-generated analyses performant even on large datasets. As noted in the presentation, agents are now writing more code and executing more queries than humans in many environments, making fast and reliable database infrastructure increasingly critical for agent-driven workflows.

## Production Deployment and Governance

Hex demonstrates mature thinking about production deployment and governance for AI-driven analytics. The platform includes comprehensive workspace management capabilities for organizing content, categorizing projects, and providing controlled access to data apps and analyses at scale across organizations. Sharing and permissions operate at multiple levels, allowing notebook sharing with different access levels such as editor access for collaborative real-time editing or view-only access for consumption.

Published data apps are hosted on unique URLs by Hex and are fully embeddable, enabling deployment in internal portals, customer-facing products, or other surfaces. All apps maintain connection to the governance controls of underlying notebooks, ensuring that even as analyses are democratized through user-friendly interfaces, data access and security policies remain enforced.

The endorsement workflow for data sources and projects creates a governance boundary between exploratory work by technical users and productionized, agent-accessible analytics. This acknowledges that not all work in a data environment is ready for broad consumption or agent-mediated access, and provides a mechanism for data teams to curate what becomes part of the agent-accessible context layer.

The full inspectability of agent-generated analyses addresses a critical production concern around trust and debugging. Because conversational thread responses are backed by standard Hex projects using standard cell types, technical users can always dive into the underlying logic to understand what an agent did, validate its approach, and make corrections if needed. This transparency is essential for maintaining confidence in agent-generated insights in business-critical scenarios.

## Critical Assessment

While Hex presents a compelling vision for AI-augmented analytics with thoughtful LLMOps practices, several considerations warrant balanced assessment. The demonstration was conducted by Hex sales and sales engineering staff, so claims about productivity improvements like turning multi-day projects into afternoon exercises should be understood as aspirational rather than independently validated. The actual performance in specific customer environments will depend heavily on data quality, context completeness, and the complexity of analytical questions being asked.

The context management system, while sophisticated, requires significant upfront investment and ongoing maintenance. Creating comprehensive guide files, endorsing appropriate projects and data sources, authoring or importing semantic models, and continuously monitoring and refining context based on observability insights represents substantial overhead. Organizations adopting Hex will need dedicated resources for context curation and governance, which may be challenging for smaller data teams already struggling to meet demand.

The observability and suggestion system, while innovative, still requires human judgment to implement recommended changes. The system can identify context gaps and propose solutions, but validating those proposals, testing changes, and deploying updates requires skilled practitioners who understand both the business domain and the technical data landscape. This is appropriate and necessary, but means the platform augments rather than replaces the need for skilled data professionals.

The reliance on ClickHouse as the demonstrated database partner, while showcasing good performance characteristics, raises questions about how the platform performs with other data sources at scale. The CHDB integration appears tightly coupled to ClickHouse-specific capabilities, and while Hex supports other databases through standard connectors, the level of optimization and agent performance may vary across different backend databases.

Overall, Hex represents a thoughtful approach to productionizing LLMs for analytics use cases, with particularly strong emphasis on context management, observability, and governance. The architecture that makes agent-generated analyses fully inspectable and the closed-loop feedback system for continuous context improvement demonstrate mature LLMOps thinking. However, realizing the platform's potential requires organizational commitment to context curation and governance workflows that extend beyond simply deploying the technology.
