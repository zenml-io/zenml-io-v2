---
title: "Multi-Agent DBT Development Workflow for Data Engineering Consulting"
slug: "multi-agent-dbt-development-workflow-for-data-engineering-consulting"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "698addca69cc8ebdf0960e47"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-10T11:06:51.158Z"
  lastUpdated: "2026-02-10T07:51:52.473Z"
  createdOn: "2026-02-10T07:27:06.509Z"
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "data-cleaning"
  - "data-integration"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "system-prompts"
  - "mcp"
  - "documentation"
  - "fastapi"
  - "postgresql"
  - "anthropic"
  - "openai"
  - "google-gcp"
industryTags: "consulting"
company: "Mammoth Growth"
summary: "Mammoth Growth, a boutique data consultancy specializing in marketing and customer data, developed a multi-agent AI system to automate DBT development workflows in response to data teams struggling to deliver analytics at the speed of business. The solution employs a team of specialized AI agents (orchestrator, analyst, architect, and analytics engineer) that leverage the DBT Model Context Protocol (MCP) to autonomously write, document, and test production-grade DBT code from detailed specifications. The system enabled the delivery of a complete enterprise-grade data lineage with 15 data models and two gold-layer models in just 3 weeks for a pilot client, compared to an estimated 10 weeks using traditional manual development approaches, while maintaining code quality standards through human-led requirements gathering and mandatory code review before production deployment."
link: "https://www.youtube.com/watch?v=NolqjHDl9UM"
year: 2026
---

## Overview

Mammoth Growth, a boutique data consultancy with a focus on marketing and customer data analytics, embarked on a comprehensive initiative to revolutionize their DBT (data build tool) development process using multi-agent AI systems. The case study is presented by Dylan Cruz, a Principal Architect at the firm with over a decade of data engineering consulting experience and an early adopter of DBT. The challenge that motivated this work was pervasive across their client base: data teams consistently struggle to deliver analytics value at the speed required by modern business, often facing the difficult choice between speed and quality.

The fundamental problem was multi-faceted. Requirements constantly change as different stakeholders prioritize different metrics, resources are increasingly constrained with smaller data teams and reduced budgets, and engineering teams face high turnover requiring constant onboarding. By the time teams complete data lineage development, business opportunities often close and priorities shift. This creates mounting technical debt as teams opt for quick-and-dirty solutions with promises to revisit quality issues in future sprints that rarely materialize.

## Technical Architecture and Multi-Agent System Design

The solution centers on a specialized team of AI agents that mirror the roles found in traditional data engineering teams. Each agent has distinct responsibilities and works collaboratively through orchestration:

**The Orchestrator Agent** functions as the quarterback of the workflow, managing task distribution and coordination between all other agents. This agent ensures proper sequencing and handoffs throughout the development lifecycle.

**The Analyst Agent** performs data discovery tasks that are typically time-consuming for human engineers. It uses the DBT show command to query raw source data, understand relationships between tables, identify primary and foreign keys, assess data quality and cleanliness, and document all findings into concise markdown files that provide context for downstream agents. This automated discovery process runs in parallel with human requirements gathering, significantly compressing project timelines.

**The Architect Agent** serves as the strategic planner, taking detailed textual specifications and decomposing them into explicit milestones and checklists. The architect leverages coding best practices, provides concrete code examples, and creates highly detailed instructions for the analytics engineer agent to follow. This explicit breakdown proved critical to keeping the coding agent "on the rails" and preventing hallucinations or deviation from requirements.

**The Analytics Engineer (AE) Agent** is the executor that writes, documents, and tests production-grade DBT code. It uses standard DBT commands including build, run, test, and show to develop models iteratively. A significant breakthrough came when the team observed the AE agent autonomously fix its own failing tests by querying data, updating the model logic, and re-running tests until all checks passed. This self-correction capability demonstrated the system moving beyond simple code generation toward genuine autonomous development.

## DBT Model Context Protocol as Foundation

The DBT Model Context Protocol (MCP) serves as the critical glue holding the multi-agent workflow together. The MCP allows agents to interact with DBT projects programmatically, enabling them to build models, execute tests, iterate on failures, and validate output without human intervention. This capability transforms what would otherwise be a series of manual copy-paste operations into a truly autonomous development loop.

The team initially built their own DBT MCP server approximately one month before DBT Labs released an official version, then migrated to the official implementation. The MCP abstraction proved essential for allowing agents to understand project structure, execute commands within the DBT environment, and validate their work against the same standards human developers would use.

## Evolution and Context Optimization

The initial multi-agent system, despite its architectural sophistication, produced poor quality code. The agents exhibited common LLM failure patterns including selecting non-existent fields, hallucinating desired but unavailable columns, adding extra columns beyond specifications (with a particular tendency to calculate unnecessary percentage metrics), and writing SQL that violated company coding standards such as using nested subqueries instead of CTEs.

This led to a fundamental reassessment centered on the three key variables in agentic workflows: the model (LLM provider), the prompts, and the context. The team settled on Anthropic's Claude as their primary model but emphasized that the specific LLM choice was less critical given the competitive landscape. Their prompts were already highly refined and showed good repeatability. The critical variable requiring optimization was context—the knowledge and information available to agents at runtime.

In data engineering projects, context has three essential pillars. First, codebase context includes existing models, prior implementations, and patterns that can serve as templates. For Mammoth Growth, this presented challenges since consulting projects are typically greenfield implementations, requiring agents to understand how to build DBT projects from scratch rather than follow existing patterns. Second, business context encompasses all requirements, transformation logic, and domain knowledge that exists in stakeholder minds, scattered spreadsheets, and system interfaces. Third, data context involves understanding the actual source data, its quality, availability, and quirks that only become apparent when working directly in the data warehouse.

The team completely restructured their workflow to maximize context gathering. On the technical side, they equipped agents with comprehensive coding best practices, explicit templates, design guides, documentation rules, linting standards, and PR templates. Agents perform significantly better when given explicit templates to fill rather than generating structure from scratch. On the business side, they fed agents detailed tech specs, business requirements documents, and even complete meeting transcripts from requirements gathering sessions. This created a snowball effect where context accumulates from initial requirements through specification design to final code execution.

## The "Reset Paradox" and Development Philosophy

One of the most counterintuitive learnings was what Mammoth Growth calls the "reset paradox"—the principle that the fastest path forward often involves stopping, deleting work that isn't meeting standards, updating specifications, and starting from zero. This represents a fundamental shift from traditional development where deleting substantial completed work would be wasteful.

The team observed that agent output quality is directly proportional to specification quality. When specifications have gaps, LLMs begin inferring requirements, leading them off the rails and generating unwanted code. As developers continue interacting with agents over extended sessions, context windows become clouded with potentially irrelevant information, recency bias can drive agents in wrong directions, and important early context may be dropped. While it feels unnatural to delete eight DBT models because a few columns are incorrect, the team found this approach faster than attempting to iterate toward correctness from a flawed foundation.

This philosophy requires teams to invest heavily in specification quality upfront, treat agent execution as relatively cheap and repeatable, and overcome psychological resistance to deleting completed work. The approach only works because agents can regenerate deleted work quickly once specifications are corrected.

## Production Deployment and Results

The system was battle-tested with a pilot client willing to adopt the experimental agentic process. The results were dramatic: Mammoth Growth delivered the first use case from handshake through Snowflake environment setup to two production gold-layer models ready for Tableau dashboards in just three weeks. This timeline included approximately 15 data models structured in a medallion architecture pattern.

Under traditional manual development, the principal architect estimated this scope would require approximately 10 weeks. The time savings came not from accelerating planning and requirements gathering, which consumed similar effort, but from dramatically faster code execution as agents worked in parallel, iterated autonomously, and maintained consistent quality without human bottlenecks.

This speed improvement enables genuinely moving at the pace of business and capturing value during opportunity windows that would normally close before delivery. However, the team acknowledges they cannot set precedent that all use cases will deliver in three weeks—the specific circumstances and scope determine feasibility.

## Four Non-Negotiable Principles for Production AI Code Generation

Based on their experience, Mammoth Growth identified four essential principles for generating production-quality code with AI agents rather than what they term "slop AI code":

**Human-led development** remains paramount. Human experts define the what, why, and how of requirements while AI agents execute on those ideas. The team maintains that humans remain the experts and must stay in the driver's seat with regular checkpoints, even as AI capabilities advance.

**Purpose-built agents** are essential. Generic AI produces generic code, which is unacceptable for production systems. Each agent has specific expertise mirroring human roles, with focused responsibilities and deep capabilities in their domain. This specialization proved far more effective than general-purpose coding assistants.

**Context is king**. The entire workflow restructuring aimed to provide agents with information equivalent to what human experts would have, including meeting transcripts, specifications, documentation standards, and design guides. Comprehensive, well-curated context proved more valuable than sophisticated prompting techniques.

**Model Context Protocol as accelerator**. The DBT MCP specifically enables autonomous agent operation by providing programmatic access to DBT functionality. Without this abstraction layer, the workflow would require constant human intervention to execute commands and validate results.

## Tooling and Implementation Details

The multi-agent system operates within standard IDEs including VS Code and Cursor, allowing developers to use familiar tools rather than requiring specialized interfaces. All context is stored and exchanged in Markdown and JSON formats, which LLMs process effectively. The team uses Anthropic Claude as their primary model but emphasizes tool agnosticism, allowing flexibility as clients may have existing licenses for Cursor, Claude, or other platforms.

For client deployments, initial hurdles involved getting approval for LLM usage and tool access to data warehouses. The team addressed security concerns by using client-owned API keys rather than providing their own, giving clients more control and comfort with data access patterns. Many clients actively sought AI capabilities, making executive buy-in achievable once speed and value demonstrations were complete.

The technical stack includes the DBT MCP for command execution, Cursor and VS Code as development environments, Snowflake as the data warehouse platform, and various experimentation with open-source tools including frameworks like Roo Code for testing different agentic patterns.

## Impact on Team Structure and Hiring

The agentic approach has significant implications for hiring and team composition. The team acknowledges that AI reduces demand for junior engineers since many entry-level tasks are now automated, potentially reducing career on-ramps for new graduates. Conversely, senior engineers with deep expertise become more valuable because they can effectively direct agentic workflows, recognize quality output, know when agents are producing incorrect code, and push back when results don't meet standards.

Mammoth Growth has shifted hiring focus toward senior leaders who understand what good looks like in analytics engineering and can serve as experts guiding AI execution. This creates a challenging dynamic for the industry where experienced professionals are in higher demand while traditional entry-level positions contract.

## Human Review and Quality Assurance

Despite automation, no code reaches production without human review. The workflow includes configurable checkpoints where humans can choose whether agents are allowed to automatically push pull requests or must wait for human approval before even creating the PR. All code undergoes standard peer review processes in GitHub before merging.

The team continues using data validation tools, previously employing DataFold for data diffing between environments and planning to adopt new DBT native data diff features. The analyst agent assists with comparing staging and production environments to verify correctness. For production issues, the team still relies primarily on human experts for triage while using agents to accelerate data discovery and root cause analysis.

## Ongoing Development and Future Directions

Current development focuses on an "autonomy slider" concept inspired by self-driving car automation levels. Rather than treating automation as binary, the team is decomposing their task catalog into discrete automatable units that can be invoked individually or orchestrated into full end-to-end automation.

This approach allows newer or junior engineers to leverage specific automation tools for targeted tasks while experienced engineers can orchestrate multiple automated capabilities into complex workflows. The granular task library also provides the orchestrator agent with more precise tools to invoke based on specific needs rather than monolithic automation.

The team continues refining prompt definitions for agents, improving context assembly pipelines, and exploring additional automation opportunities beyond the core development workflow, including auxiliary agents for tasks in Jira and Slack that support but don't directly execute development work.

## Critical Assessment and Balanced Perspective

While the case study demonstrates impressive results, several caveats and limitations warrant consideration. The three-week delivery timeline represents an optimal scenario with a willing pilot client, well-defined scope, and a team deeply expert in both DBT and the emerging agentic patterns. Generalizing these results to arbitrary projects, teams, or problem domains may not be realistic.

The requirement for senior expertise to guide agents effectively creates potential scaling challenges and hiring market distortions. The approach may work well for consultancies like Mammoth Growth with deep DBT expertise but could struggle in organizations without that foundation. The team explicitly states that building great things with agents requires knowing how to build them great without agents—this limits adoption to already-competent teams.

The reset paradox, while pragmatic, represents a potentially expensive pattern if specifications frequently miss the mark. Organizations would need to develop strong specification practices and tolerance for iterative specification refinement. The psychological and process changes required to delete substantial work routinely may face organizational resistance.

Client approval for LLM access to data warehouses, even with client-owned keys, may remain a significant barrier in regulated industries or security-conscious organizations. The case study doesn't address scenarios where clients categorically prohibit LLM usage or where data sensitivity prevents cloud API calls.

The reliance on relatively expensive commercial models like Claude and premium IDEs like Cursor represents ongoing cost that may affect project economics, particularly for smaller engagements or clients with constrained budgets. The case study doesn't provide detailed cost analysis or ROI calculations beyond timeline compression.

Despite these limitations, the case study represents a sophisticated real-world deployment of multi-agent systems for production code generation, with honest discussion of failures encountered, iterative improvements made, and pragmatic principles derived from experience. The focus on context optimization, purpose-built agents, and maintaining human expertise in the loop offers valuable lessons for organizations exploring similar capabilities.