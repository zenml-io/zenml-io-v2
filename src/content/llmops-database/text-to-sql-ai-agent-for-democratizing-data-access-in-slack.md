---
title: "Text-to-SQL AI Agent for Democratizing Data Access in Slack"
slug: "text-to-sql-ai-agent-for-democratizing-data-access-in-slack"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ade00034d03e802e2bbee"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:48.899Z"
  createdOn: "2025-12-23T18:22:56.996Z"
llmopsTags:
  - "data-analysis"
  - "chatbot"
  - "question-answering"
  - "structured-output"
  - "rag"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "agent-based"
  - "fastapi"
  - "postgresql"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "guardrails"
  - "documentation"
  - "open-source"
  - "amazon-aws"
industryTags: "tech"
company: "Salesforce"
summary: "Salesforce built Horizon Agent, an internal text-to-SQL Slack agent, to address a data access gap where engineers and data scientists spent dozens of hours weekly writing custom SQL queries for non-technical users. The solution combines Large Language Models with Retrieval-Augmented Generation (RAG) to allow users to ask natural language questions in Slack and receive SQL queries, answers, and explanations within seconds. After launching in Early Access in August 2024 and reaching General Availability in January 2025, the system freed technologists from routine query work and enabled non-technical users to self-serve data insights in minutes instead of waiting hours or days, transforming the role of technical staff from data gatekeepers to guides."
link: "https://www.salesforce.com/blog/text-to-sql-agent/"
year: 2025
seo:
  title: "Salesforce: Text-to-SQL AI Agent for Democratizing Data Access in Slack - ZenML LLMOps Database"
  description: "Salesforce built Horizon Agent, an internal text-to-SQL Slack agent, to address a data access gap where engineers and data scientists spent dozens of hours weekly writing custom SQL queries for non-technical users. The solution combines Large Language Models with Retrieval-Augmented Generation (RAG) to allow users to ask natural language questions in Slack and receive SQL queries, answers, and explanations within seconds. After launching in Early Access in August 2024 and reaching General Availability in January 2025, the system freed technologists from routine query work and enabled non-technical users to self-serve data insights in minutes instead of waiting hours or days, transforming the role of technical staff from data gatekeepers to guides."
  canonical: "https://www.zenml.io/llmops-database/text-to-sql-ai-agent-for-democratizing-data-access-in-slack"
  ogTitle: "Salesforce: Text-to-SQL AI Agent for Democratizing Data Access in Slack - ZenML LLMOps Database"
  ogDescription: "Salesforce built Horizon Agent, an internal text-to-SQL Slack agent, to address a data access gap where engineers and data scientists spent dozens of hours weekly writing custom SQL queries for non-technical users. The solution combines Large Language Models with Retrieval-Augmented Generation (RAG) to allow users to ask natural language questions in Slack and receive SQL queries, answers, and explanations within seconds. After launching in Early Access in August 2024 and reaching General Availability in January 2025, the system freed technologists from routine query work and enabled non-technical users to self-serve data insights in minutes instead of waiting hours or days, transforming the role of technical staff from data gatekeepers to guides."
---

## Overview and Business Context

Salesforce developed Horizon Agent, an internal text-to-SQL conversational AI system, to solve a critical operational bottleneck in their data access workflow. The company faced a classic "data access gap" where non-technical employees (project managers, analysts, business users) needed insights from databases but lacked SQL expertise, forcing them to submit support requests to engineers and data scientists. This created a multi-faceted problem: technologists spent dozens of hours per week writing custom queries instead of building high-value features, non-technical users experienced significant delays in getting answers, and decision-making slowed down across the organization. In some cases, people resorted to making decisions based on outdated data or educated guesses rather than current, accurate information.

While Business Intelligence dashboards like Tableau could partially address this gap, they required significant engineering time to build and could never comprehensively cover every possible question users might have. The team recognized that advancements in Large Language Models presented an opportunity to fundamentally reimagine how users could interact with data—allowing natural language questions to be translated into SQL queries automatically, eliminating the technical barrier entirely.

## Solution Architecture and Technical Stack

Horizon Agent represents a sophisticated integration of multiple technologies and internal Salesforce platforms, designed to operate seamlessly within the company's existing Slack-based communication ecosystem. The choice of Slack as the interface was strategic: users already lived in this environment for collaboration, it provided threaded conversations for context, offered searchable history for past insights, and included interactive UI elements (buttons, list menus) necessary for a fully-featured application.

The technical architecture consists of several key components working in concert. The user experience layer is built using Bolt, Slack's Python framework for application development, which handles Slack API interactions and allows developers to focus on business logic rather than infrastructure concerns. When a user messages the Horizon Agent app in Slack, Slack makes a call to Salesforce's Python microservice running in AWS, and Bolt simplifies the handling of these requests.

For business context and domain knowledge, Salesforce leveraged Fack, an open-source tool they created internally. Fack serves as a comprehensive knowledge base containing Salesforce-specific terminology, concepts, business jargon, and crucially, instructions on how to construct valid SQL queries using the Trino dialect. This contextual knowledge is essential for the LLM to understand not just general SQL, but the specific patterns and practices used within Salesforce's data infrastructure.

Dataset information comes from the Horizon Data Platform (HDP), Salesforce's internal data platform product similar to industry tools like dbt (Data Build Tool). HDP provides documentation about the business purpose of database tables, sample SQL queries demonstrating proper access patterns, and enriched metadata including sample records from actual tables. This allows the LLM to see concrete examples of real data, improving its ability to generate appropriate queries.

The Einstein Gateway serves as Salesforce's internal platform for accessing Large Language Models, providing a standardized interface that abstracts away the complexity of different LLM providers and versions. This gateway architecture is a key LLMOps pattern that allows the team to swap models, manage credentials, implement rate limiting, and monitor usage without changing application code.

## RAG Implementation and Query Flow

The system implements a Retrieval-Augmented Generation (RAG) pattern to enrich user queries with relevant context before sending them to the LLM. When the microservice receives a user's question, it retrieves pertinent business context from Fack and dataset information from Horizon Data Platform, then bundles all this knowledge together with the original question. This enriched prompt is sent through the Einstein Gateway to an LLM, which processes the complete context and generates both a SQL query and a natural language explanation.

A typical interaction follows this flow: A user asks a question in Slack (for example, "What was the cost of my service in September?"). The Bolt-based Python microservice receives the message and uses an LLM through Einstein to classify the question type (in this case, cost-related). The application then retrieves relevant business context and dataset information to supplement the user's question with everything the LLM needs for an accurate response. The enriched query goes through the Einstein Gateway to an LLM, which returns a SQL query along with an explanation that helps build user trust. The user receives the response in Slack within seconds, and can ask follow-up questions that maintain full conversational context from previous messages. If the user chooses to run the query, the application executes the SQL using Trino, retrieves data from Salesforce's Iceberg data lake, and posts results back to Slack with an AI-generated analysis covering summary statistics, patterns, trends, and anomalies.

## Handling Non-Determinism and Ensuring Accuracy

One of the most interesting LLMOps challenges Salesforce encountered was dealing with the inherent non-determinism of Large Language Models. Even with a perfect knowledge base, asking the same question ten times might yield eight correct SQL queries and two incorrect ones. This inconsistency is unacceptable in a production system where users need reliable answers.

To address this, Salesforce implemented a sophisticated consensus-based approach. Instead of giving the LLM a single opportunity to generate SQL, the system requests ten different generations for each query. These multiple responses are then processed through a sequence of algorithms—specifically Cosine Similarity Modeling and Levenshtein Distance calculations—to identify and eliminate outliers. The system selects the response that best represents the majority consensus among the generated queries. This ensemble approach significantly improves reliability by leveraging the probabilistic nature of LLMs to filter out anomalous outputs.

Additionally, the system implements a pre-execution validation step. Before presenting SQL to users or executing queries, Horizon Agent runs a simple EXPLAIN query to check for syntax errors and logical problems. If errors are detected, the system feeds this information back to the LLM, giving it another opportunity to generate a corrected query. This feedback loop represents a key LLMOps pattern: automated validation and iterative refinement that happens transparently to the end user.

## Evolution Through Production Experience

The journey from initial prototype to production system reveals important lessons about deploying LLMs in real-world environments. An early prototype built with Streamlit worked technically but failed to gain adoption because it wasn't integrated into users' existing workflow. Once the team shipped an MVP directly to Slack—even with imperfect responses—usage increased dramatically. This validated a crucial principle: meeting users where they already work is more important than initial perfection.

The system launched to Early Access in August 2024 with approximately 50% accuracy, which might seem low but was sufficient to demonstrate value and gather feedback. By the time it reached General Availability in January 2025, continuous improvements had significantly increased reliability. The team established a rapid iteration cycle, enabling updates to the Agent's knowledge base within approximately 15 minutes when confusion or errors were identified. Critically, these updates included automated regression testing to ensure new changes didn't degrade performance on previously-working queries.

## Transparency and Trust Building

Initial versions of Horizon Agent were opaque, simply responding "I don't know how to answer that" when queries fell outside its capabilities. The team discovered that this approach undermined trust and prevented learning. They redesigned the system to be more transparent, having it ask clarifying questions when ambiguous requests were received, and explaining the SQL it generated rather than treating queries as black boxes. This transparency had multiple benefits: it made answers more trustworthy by showing the reasoning process, it helped users learn SQL concepts gradually through exposure, and it enabled users to become better at formulating questions over time.

This design choice reflects an important LLMOps principle: production AI systems should be explainable and provide visibility into their reasoning, especially when non-technical users are the primary audience. The explanations serve both as a trust-building mechanism and as an educational tool that gradually upskills the user base.

## Continuous Learning and Knowledge Base Management

The dynamic nature of business language presents ongoing challenges for text-to-SQL systems. New terminology, acronyms, and concepts emerge regularly, and the system needs to keep pace with organizational reality. Salesforce designed Horizon Agent with agility as a core requirement, streamlining the process for updating the knowledge base. When users report confusion or errors, subject matter experts can update Fack's business context quickly, with changes propagating through the RAG pipeline to improve future responses.

This approach represents a mature understanding of LLMOps: production LLM systems aren't static artifacts but require ongoing curation and maintenance of the knowledge they draw upon. The rapid update capability (15 minutes from identification to deployment) demonstrates a well-engineered CI/CD pipeline specifically designed for knowledge base updates, not just code changes.

## Guardrails and Error Handling

The system's guardrails evolved significantly through production use. Initially, the team implemented strict constraints that caused the agent to refuse many queries outright. They discovered that loosening these guardrails while increasing transparency actually improved the user experience. Rather than hard boundaries that resulted in "no" responses, the system now guides users toward better-formed questions and explains what information it needs to provide accurate answers.

The pre-execution validation using EXPLAIN queries represents another form of guardrail—technical validation that catches errors before they reach users or execute against production data. This defensive programming pattern is essential in LLMOps, where LLM outputs can't be blindly trusted and require programmatic verification before execution.

## Transformation of Roles and Democratization of Data

Beyond the technical implementation, Horizon Agent represents a fundamental shift in how data teams operate within Salesforce. Engineers and data scientists have transitioned from being "gatekeepers"—the bottleneck through which all data requests must flow—to "guides" who design high-quality datasets, define appropriate guardrails, and enable AI-powered tooling. Non-technical users gained conversational, self-service access to data insights, with answers delivered in minutes rather than after hours or days of waiting.

The quantitative impact is significant: technologists who previously spent dozens of hours weekly on custom queries are now freed for high-value feature development, while business users can make data-driven decisions in real-time rather than relying on outdated information or intuition. This democratization of data access directly addresses the original business problem and demonstrates measurable ROI.

## Critical Assessment and Limitations

While the case study emphasizes successes, it's important to note potential limitations. The 50% initial accuracy rate, while sufficient for early feedback, would be problematic for many use cases—particularly those involving financial decisions or compliance requirements. The consensus-based approach to handling non-determinism adds computational overhead (generating ten queries instead of one) and latency, though the text indicates responses still arrive within seconds.

The system relies heavily on the quality and completeness of metadata in Horizon Data Platform and business context in Fack. If these knowledge bases contain errors, outdated information, or gaps, the LLM will generate incorrect queries. The rapid update process mitigates this but also suggests ongoing maintenance burden. The case study doesn't discuss costs—running multiple LLM inferences per query through the Einstein Gateway likely involves non-trivial computational expense.

Security and access control considerations receive minimal attention in the text. In a production system handling business data, ensuring users can only query tables they're authorized to access is critical, as is preventing SQL injection or other malicious queries. The text mentions guardrails and validation but doesn't detail how authorization is enforced.

## LLMOps Maturity Indicators

The case study demonstrates several markers of LLMOps maturity. The use of an internal LLM gateway (Einstein Gateway) provides abstraction and centralized management. The RAG architecture with dedicated knowledge bases (Fack and HDP) shows sophisticated prompt engineering. The consensus-based approach to handling non-determinism represents advanced understanding of LLM behavior. Automated validation and regression testing indicate proper software engineering discipline applied to AI systems. The rapid iteration cycle with 15-minute knowledge base updates demonstrates mature CI/CD practices. The focus on transparency and explainability shows user-centric design thinking applied to AI systems.

These elements collectively suggest that Salesforce has moved beyond experimental AI implementations into production-grade LLMOps, with the infrastructure, processes, and organizational learning necessary to maintain and improve AI systems over time. The transformation from 50% to higher accuracy through systematic improvement, rather than wholesale replacement, indicates a sustainable approach to LLM deployment that can adapt to changing business needs.