---
title: "Agentic Data Analyst for Enterprise Analytics"
slug: "agentic-data-analyst-for-enterprise-analytics"
draft: false
llmopsTags:
  - "data-analysis"
  - "fraud-detection"
  - "customer-support"
  - "agent-based"
  - "prompt-engineering"
  - "rag"
  - "human-in-the-loop"
  - "evals"
  - "databases"
  - "documentation"
  - "scalability"
industryTags: "finance"
company: "Ramp"
summary: "Ramp faced a data bottleneck where business questions routed through a single on-call analyst created significant delays in decision-making, with most questions going unasked due to the queue. They built Ramp Research, an agentic AI analyst that answers data questions directly in Slack 24/7 within minutes. Since launching in early August 2025, it has answered over 1,800 questions across 1,200+ conversations with 300 users, representing a 10-20x increase in question volume compared to the traditional help channel, enabling faster decision-making and better customer outcomes."
link: "https://builders.ramp.com/post/meet-ramp-research"
year: 2025
seo:
  title: "Ramp: Agentic Data Analyst for Enterprise Analytics - ZenML LLMOps Database"
  description: "Ramp faced a data bottleneck where business questions routed through a single on-call analyst created significant delays in decision-making, with most questions going unasked due to the queue. They built Ramp Research, an agentic AI analyst that answers data questions directly in Slack 24/7 within minutes. Since launching in early August 2025, it has answered over 1,800 questions across 1,200+ conversations with 300 users, representing a 10-20x increase in question volume compared to the traditional help channel, enabling faster decision-making and better customer outcomes."
  canonical: "https://www.zenml.io/llmops-database/agentic-data-analyst-for-enterprise-analytics"
  ogTitle: "Ramp: Agentic Data Analyst for Enterprise Analytics - ZenML LLMOps Database"
  ogDescription: "Ramp faced a data bottleneck where business questions routed through a single on-call analyst created significant delays in decision-making, with most questions going unasked due to the queue. They built Ramp Research, an agentic AI analyst that answers data questions directly in Slack 24/7 within minutes. Since launching in early August 2025, it has answered over 1,800 questions across 1,200+ conversations with 300 users, representing a 10-20x increase in question volume compared to the traditional help channel, enabling faster decision-making and better customer outcomes."
notion:
  pageId: "375f8dff-2538-8015-a341-e7caada28589"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-04T08:05:00.000Z"
  lastEditedTime: "2026-06-04T08:05:00.000Z"
  publishedAt: "2026-06-04T08:37:01Z"
---

## Overview

Ramp, a financial technology company, developed Ramp Research as an internal agentic AI system to address a critical data bottleneck that was slowing decision-making across the organization. The problem they faced is common in scaling companies: data questions would queue up in Slack channels like `#help-data`, waiting for a single on-call analyst to context-switch between Looker, Snowflake, and dbt documentation. Answers would arrive hours later, often after the decision window had closed, and many questions were never asked at all due to the perceived burden of adding to the queue. Ramp Research launched in early August 2025 and by the time of this article (September 2025), had already answered over 1,800 data questions across more than 1,200 conversations with 300 different users. This represents a fundamental shift in how the company approaches data-driven decision-making.

## Technical Architecture and Context Management

The foundation of Ramp Research's capabilities lies in sophisticated context management. The team recognized that large-scale data without proper context is essentially unusable, and at Ramp, that context was distributed across multiple systems: dbt (data build tool), Looker (business intelligence), and Snowflake (data warehouse). The technical approach involved aggregating and indexing metadata from these disparate sources, creating a unified context layer that allows the agent to fetch relevant data models and construct precise queries.

However, metadata alone proved insufficient. The agent struggled to connect its understanding of the data schema to the various business domains within Ramp's operations. Much of this domain knowledge was tacit, residing in the expertise of individual domain owners on the analytics team. To bridge this gap, Ramp took a knowledge management approach: they had domain experts write technical documentation covering their respective areas of expertise. These documents were organized into a file system that Ramp Research could access on-demand, effectively providing the agent with expert-level understanding across different business domains.

The scale of the data environment presented particular challenges. With thousands of tables and views in the analytics warehouse, and many questions requiring row-level data inspection, simple retrieval approaches would fall short. This is where the agentic architecture becomes critical. Rather than relying exclusively on generic compression methods like keyword search or vector similarity search, Ramp equipped the agent with tools to actively inspect column values, branch into different exploration paths, and backtrack when needed. This mimics how a human analyst would reason through data, exploring iteratively rather than attempting to retrieve all relevant information in a single pass.

## Agentic Tool Use and Reasoning

The case study emphasizes that Ramp Research operates as an agentic system, which in the LLMOps context means it has the capability to use tools, make decisions about which tools to use, and chain multiple tool calls together in a reasoning process. While the specific LLM underlying the system isn't mentioned, the architecture clearly involves giving the language model access to functions that can query Snowflake, inspect column schemas, retrieve documentation, and potentially interact with dbt metadata and Looker definitions. This tool-calling pattern is fundamental to the agent's ability to handle the complexity and scale of enterprise data.

The agent's ability to "branch and backtrack" suggests some form of multi-step reasoning or planning capability. When a question comes in, the agent likely needs to: identify which business domain is relevant, retrieve appropriate documentation, understand which tables might contain relevant data, inspect those tables' schemas, potentially sample data to verify assumptions, construct SQL queries, execute them, and format results. This multi-step process requires maintaining state across tool calls and adjusting the approach based on intermediate results—core capabilities of agentic LLM systems.

## Slack Integration and User Experience

Ramp made a deliberate choice to deploy Ramp Research through Slack, their internal communication hub. This wasn't just about convenience; it was a strategic decision to meet users where they already work. The initial deployment was through a `#ramp-research-beta` channel that grew to over 500 members who actively shaped the product's development—a form of production feedback loop that's crucial for LLMOps.

Two key features emerged from this Slack-first approach. First, they implemented in-thread CSV previews, allowing users to validate results without leaving Slack to open Redash or Snowflake. This addresses a critical usability concern in production LLM systems: users need to be able to verify outputs, especially for data-critical applications. By reducing the friction in verification, they increased trust and adoption, particularly among users less comfortable with SQL and traditional BI tools.

Second, they made conversations stateful, supporting multi-turn interactions within Slack threads. This is a significant LLMOps consideration: maintaining conversation context across multiple user messages allows for clarification, follow-up questions, and collaborative problem-solving. The article notes that this multi-turn capability not only improved user experience but also enhanced the agent's end-to-end performance, likely because the agent can ask clarifying questions, present intermediate results, and refine its approach based on user feedback within a single conversation flow.

The flexibility of the Slack app architecture has enabled teams to integrate Ramp Research into existing workflows beyond the beta channel—adding it to alert channels for diagnosing failed transactions, or to project channels for scoping new features. This shows the agent moving from a centralized tool to a distributed capability embedded in various workflows.

## Evaluation Strategy Evolution

Ramp's approach to evaluation demonstrates sophisticated thinking about LLMOps challenges and practical constraints. They tried multiple approaches, each revealing different tradeoffs. Their first attempt was a human-in-the-loop system that pinged domain owners for every question in their domain. While this ensured quality, it didn't scale—the effort increased linearly with request volume, reintroducing the very bottleneck they were trying to eliminate. This is a common pitfall in LLMOps: human review as a quality gate can work for small volumes but becomes the limiting factor at scale.

They then shifted to evaluating the context layer rather than individual questions. Working with domain experts, they compiled high-priority concepts across all domains and wrote end-to-end tests. This test-driven approach is more scalable and systematic, but it revealed limitations: tests could show whether Ramp Research passed or failed, but provided little diagnostic information about why failures occurred. In production LLM systems, understanding failure modes is as important as detecting failures.

This led to their most sophisticated evaluation framework: a Python mini-framework built into their dbt project that asserts not only on final answers but on intermediate steps. This includes checking expected tool calls, table references, and query structure. This represents a mature understanding of agentic system evaluation—you can't just test final outputs when the system involves multi-step reasoning. By evaluating the reasoning chain, they can identify whether failures occur in domain understanding, table selection, query construction, or other specific steps. This granular evaluation creates a tight feedback loop: update context or documentation, run the test suite, and confirm whether changes actually improved performance.

The test suite appears to be deterministic and automated, enabling continuous validation as they modify the context layer or underlying system. This is essential for maintaining quality in production as the system evolves, new tables are added to the warehouse, or business domains change.

## Production Impact and Scale

The quantitative results provide insight into the production deployment's success. In the four weeks prior to the article, Ramp Research answered 1,476 questions in the beta channel, compared to just 66 in the traditional help channel. This represents roughly a 22x increase in question volume, aligning with their stated 10-20x estimate. Critically, the article notes that most of this growth comes from questions that previously "died in drafts or never left someone's head"—suggesting the agent is surfacing latent demand rather than just shifting existing questions from one channel to another.

This scale of usage (over 1,800 questions since early August, across 300 users) demonstrates genuine production adoption beyond pilot or experimentation phases. The system is handling real business questions continuously, which means it must have reasonable reliability, acceptable accuracy, and sufficient performance. The article mentions the agent responds "in minutes" rather than hours, which for data analytics is a substantial improvement but also suggests some queries are complex enough to require multiple reasoning steps and tool calls.

The business impact is framed around decision quality compounding over time. Ramp argues that improving many small decisions—pricing tweaks, go-to-market filters, feature rollouts—creates material aggregate value even if individual improvements are modest. This is a sophisticated view of AI impact: not necessarily transforming any single decision, but raising the floor across thousands of decisions. The article claims this manifests in customer benefits like faster account manager responses, better bug isolation, and sharper roadmap decisions, though these remain claims rather than measured outcomes.

## Privacy and Data Governance

Notably, the article includes a footnote stating that Ramp Research does not have access to personally identifiable information (PII). This is a critical LLMOps consideration, especially in financial services. It suggests Ramp has implemented data access controls that limit what tables and columns the agent can query, likely excluding customer PII while still providing access to aggregated or anonymized analytics data. This demonstrates attention to data governance in production LLM deployment, balancing capability with compliance and privacy requirements.

## Critical Assessment and Limitations

While the case study presents an impressive deployment, several aspects warrant balanced consideration. First, the article is promotional in nature—it's published on Ramp's builders blog and focuses primarily on successes. We don't see detailed discussion of failure modes, hallucination rates, or cases where the agent provided incorrect answers. For a production data system, accuracy is paramount, and the absence of quantitative accuracy metrics is notable.

Second, the 10-20x increase in question volume could be interpreted differently. While Ramp frames this as surfacing valuable latent demand, it could also indicate questions that might not have been asked for good reasons—perhaps they were edge cases, insufficiently thought through, or lower priority. The article doesn't discuss how they distinguish high-value questions from noise, or whether all this increased volume actually translates to better decisions.

Third, the evaluation framework, while sophisticated, is still primarily testing against expert-written expectations. This works well for known question types but may not catch errors in novel queries or edge cases that domain experts didn't anticipate. The system's performance on truly novel questions remains unclear.

Fourth, the cost structure isn't discussed. An agentic system that makes multiple tool calls, inspects data, and potentially backtracks could involve substantial LLM API costs (if using external models) or inference costs (if self-hosted). At 1,476 questions in four weeks, with likely multiple LLM calls per question, the operational costs could be significant. The article doesn't address whether this is cost-competitive with human analysts or whether cost constraints limit how the system can be used.

Finally, the context maintenance burden is mentioned as an area for improvement. Domain experts needed to write documentation, and the evaluation framework requires ongoing maintenance. This represents hidden operational cost in keeping the agent accurate as the business and data warehouse evolve. The article mentions further automating this maintenance but acknowledges it as an ongoing challenge.

## Future Direction and Broader Implications

Ramp sees Ramp Research evolving beyond a Slack-based Q&A tool toward automated workflows. They mention teams beginning to use it for generating customer case studies and detecting fraud patterns, and they plan to offer a headless API for custom integrations. This represents a maturation from interactive tool to embedded capability—a common evolution in successful LLMOps deployments.

The context layer itself is framed as a valuable technical asset beyond the agent. This is insightful: by building comprehensive, structured, accessible documentation of their data environment, they've created an artifact that could power multiple applications. This suggests thinking beyond a single LLM application toward building reusable infrastructure for AI capabilities.

The article concludes with a vision of agents and people working collaboratively, which is worth noting as a framing. Rather than positioning the agent as replacing analysts, Ramp presents it as expanding capacity and enabling the team to focus on higher-value work. Whether this represents the actual dynamics or aspirational framing isn't clear from the case study.

## LLMOps Lessons and Patterns

This case study demonstrates several important LLMOps patterns. The agentic architecture with tool use is well-suited to complex, multi-step reasoning tasks where simple retrieval-augmented generation would be insufficient. The integration into existing workflows (Slack) rather than requiring new interfaces accelerates adoption. The evolution of the evaluation strategy—from human review to end-to-end tests to intermediate-step validation—shows practical learning about what works at scale. The emphasis on context management and domain knowledge capture highlights that LLM capability alone is insufficient; production success requires substantial work on knowledge organization and retrieval.

The deployment also illustrates the importance of user experience in LLMOps: in-thread CSV previews, multi-turn conversations, and Slack integration all reduce friction and increase trust. For a data application where users need to verify results, making verification seamless is as important as generating correct answers.

Overall, Ramp Research represents a substantive production deployment of an agentic LLM system that has achieved meaningful scale and adoption within an organization, while acknowledging ongoing challenges in accuracy assurance, context maintenance, and scaling to new use cases.
