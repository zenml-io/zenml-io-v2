---
title: "Building an Autonomous Software Factory for Notion-like Application Development"
slug: "building-an-autonomous-software-factory-for-notion-like-application-development"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "code-interpretation"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "error-handling"
  - "latency-optimization"
  - "system-prompts"
  - "evals"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "monitoring"
  - "docker"
  - "kubernetes"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "databases"
  - "postgresql"
  - "fastapi"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Software Factory"
summary: "Software Factory demonstrates a fully automated software development lifecycle where AI agents autonomously build, test, review, and deploy a Notion-like collaborative editing application called Memo over a two-week period. The project showcases how agents can handle the complete SDLC from planning through operations, achieving 88% of pull requests completed without human intervention. The system leverages multiple specialized automations running on scheduled triggers to handle different stages of development, integrating GitHub as the state engine and using observability tools like Sentry for automated incident response and bug fixing."
link: "https://www.youtube.com/watch?v=00Ndri8q8LU"
year: 2026
seo:
  title: "Software Factory: Building an Autonomous Software Factory for Notion-like Application Development - ZenML LLMOps Database"
  description: "Software Factory demonstrates a fully automated software development lifecycle where AI agents autonomously build, test, review, and deploy a Notion-like collaborative editing application called Memo over a two-week period. The project showcases how agents can handle the complete SDLC from planning through operations, achieving 88% of pull requests completed without human intervention. The system leverages multiple specialized automations running on scheduled triggers to handle different stages of development, integrating GitHub as the state engine and using observability tools like Sentry for automated incident response and bug fixing."
  canonical: "https://www.zenml.io/llmops-database/building-an-autonomous-software-factory-for-notion-like-application-development"
  ogTitle: "Software Factory: Building an Autonomous Software Factory for Notion-like Application Development - ZenML LLMOps Database"
  ogDescription: "Software Factory demonstrates a fully automated software development lifecycle where AI agents autonomously build, test, review, and deploy a Notion-like collaborative editing application called Memo over a two-week period. The project showcases how agents can handle the complete SDLC from planning through operations, achieving 88% of pull requests completed without human intervention. The system leverages multiple specialized automations running on scheduled triggers to handle different stages of development, integrating GitHub as the state engine and using observability tools like Sentry for automated incident response and bug fixing."
notion:
  pageId: "34ef8dff-2538-8162-9591-ea3dcd2a7c9b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:04:14Z"
---

## Overview

This case study documents a two-week public experiment in building what the team calls a "software factory" - a fully automated software development lifecycle powered by AI agents. The goal was to demonstrate that autonomous agents can handle the entire software development process from planning through operations, building a production-grade Notion-like collaborative editing application called Memo. The project was executed completely in the open with all code, automations, and metrics publicly available.

The Software Factory team approached this not as a claim that all software should be built this way today, but rather as an exploration of what's possible at the extreme end of automation. The intention was to show different patterns for applying agents across the software development lifecycle so that organizations can adopt these approaches wherever their bottlenecks exist. A key design decision was to push everything to the extreme and do it publicly to address common questions about code quality and what the implementation actually looks like in practice.

## The Product: Memo

The application built during this experiment is Memo, a Notion-inspired collaborative editing tool with surprisingly deep functionality. The UI features a minimal design with recently visited pages, an all-pages view with filtering, a sidebar for pinned favorites, and the ability to create new pages and databases. The editor supports slash commands for inserting various block types including quotes, bullets, nested lists, and tables. Pages can have cover images and emoji icons, and the system includes workspace management features for inviting members and creating shared workspaces.

One of the more complex features implemented was databases, which in Notion-style applications represent significant technical complexity. The databases support multiple views including calendar views, custom data types, and the ability to embed databases within pages. The application also includes markdown import/export functionality, page sharing capabilities, search across all content, drag-and-drop reordering of pages in the sidebar with nesting support, and a feedback system with automatic screenshot capture that feeds into the factory's automation loop.

Notably, dark mode was added as an out-of-scope feature, which triggered an interesting aspect of the factory's operation - when an agent attempts to implement something outside the original product specification, it flags the issue for additional human approval before proceeding. This demonstrates a built-in safeguard against scope creep while still allowing flexibility.

## Architecture and LLMOps Implementation

The software factory is built on the Owner platform, which provides the infrastructure for running autonomous agents. At the core are approximately 14 automations that maintain the codebase, with an additional 2-3 handling operational metrics and monitoring. Each automation is essentially an individual agent running in its own environment on a schedule or in response to triggers. These automations don't run on local developer machines but rather in the cloud with access to the full source code and application context.

A critical architectural decision was using GitHub as the engine of state rather than maintaining state in markdown files within the repository itself. While many harness approaches keep everything in markdown files, the team found this created potential synchronization issues and risk that documentation wouldn't remain current. By using GitHub Issues and the GitHub CLI as the source of truth for what's in progress, what's in the backlog, and what's completed, the system avoids duplication and maintains consistency. The automations are authenticated with GitHub CLI access, allowing them to query issue states, update labels, and manage the full issue lifecycle autonomously.

The repository itself still contains important documentation including architecture docs, conventions, and the initial product specification in markdown format. The spec is checked against to mark what's done and what remains, but the operational state lives in GitHub's issue tracking system.

## The Software Development Lifecycle

The factory implements a complete SDLC divided into four main phases: Planning, Building, Reviewing, and Operating. Each phase has specialized automations, though an interesting observation from the project is that Planning and Operations have significantly more automations than Building and Review. The team explains this counterintuitive distribution by noting that building and reviewing are actually the relatively straightforward parts with modern LLMs - the models are quite capable of generating code and performing code reviews. The complexity lies in the edge cases and feedback loops in planning and operations.

### Planning Phase

The planning phase includes automations for feature planning, breaking down complex features into manageable issues with proper dependency mapping, and product specification management. When a new feature like databases was added mid-project, the system decomposed it into multiple interconnected issues that were then processed through the normal build loop. The planning phase also includes a product improver automation that was added later in the project to create a continuous feedback loop focused on UI and UX improvements by reviewing past issues and identifying opportunities for enhancement.

An automation auditor was also introduced to provide recommendations on where to improve the factory itself. The team noted in retrospect that they would activate this auditor earlier in future projects, as soon as the basic set of automations is running rather than waiting until the end of the first week.

### Building and Review Phase

The building phase uses a feature builder automation that adapts its behavior based on the current backlog state. The automation has multiple operational modes and selects its prompt strategy based on how much work is queued. Similarly, the reviewer automation performs scrutinized code reviews, creating a back-and-forth loop with the builder that's visible in the pull request history. A shepherd automation works in sync with the reviewer to ensure thorough review cycles.

Notably, the team chose to operate without mandatory human code review to maximize speed in this greenfield project context, though they acknowledge that for production systems most organizations would configure the factory to require manual approval before merging. This is easily implemented as a configuration change and demonstrates the flexibility of the approach.

### Operations Phase

The operations phase proved more complex than initially anticipated. It includes multiple specialized automations: UI verification to ensure the production UI still functions after deployments, backend verification for API and service health, and an incident responder that monitors Sentry logs and feeds issues back into the planning phase when problems are detected.

The bug fixer automation emerged as one of the most successful components of the entire factory. It operates through two pathways: automated bug fixing triggered by the incident responder when Sentry detects issues, or handling bugs reported by users through GitHub issues or the Owner interface. The bug fixer has explicit logic for reviewing whether bugs are recurring, understanding the bug category, determining if it can fix the issue autonomously, and updating the knowledge base when structural or long-term fixes are implemented. It's instructed to create pull requests according to conventions and, critically, to escalate to humans when it hits a wall it cannot overcome.

The system also includes a feedback digest automation that collects user feedback from the in-app feedback form every hour and posts it to a Slack channel where it can be actioned directly. This creates a tight loop from user experience back to the development process.

## Metrics and Performance

Over the two-week period, the factory achieved impressive metrics that speak to its operational effectiveness. Nearly 400 commits were made to the codebase with 375 pull requests merged. An impressive 88% of PRs were completed completely autonomously without human intervention, with only 12% requiring human input for initial triggering, hitting blockers requiring guidance, or initial setup work. The median time to close issues was 38 minutes, and the CI pass ratio remained consistently above 90%, averaging around 98%. Code coverage grew to approximately 63,000 lines of code, with 53% being application code and the remainder tests and database migrations.

The team emphasized that many issues are opened and closed entirely by agents without human knowledge, particularly during evenings and weekends. The 38-minute median closure time includes this fully autonomous work, which is remarkable for maintaining system health without human operators on call.

Test coverage became a major focus during the second week after the team observed significant regressions following the first week. Initially, the spec was unopinionated about testing, but after identifying the regression problem, more explicit testing instructions were added. The system was directed to write more end-to-end tests and unit tests, which increased the test-to-code ratio and dramatically reduced regressions. The metrics show that as test coverage grew, the number of review-build loops increased as the reviewer caught more issues, but overall product quality improved substantially.

## Prompting and Agent Configuration

The prompts for each automation are detailed and structured, often containing intricate internal workflows. For example, the bug fixer prompt includes logic for checking if the development environment is properly set up and exiting with an issue if not, verifying that issues are properly formatted before proceeding, determining fix approaches, and explicit escalation points where human intervention is requested. These prompts essentially encode dependency trees and decision logic within each agent.

The team noted that these prompts will continue evolving, especially with improvement loops running continuously. As the product matures, prompt strategies may shift to reflect different priorities - for example, greenfield development prompts might differ from those optimized for maintaining a fully developed product. The current prompts represent a snapshot in time rather than a fixed template.

An interesting aspect is the use of conventions documents and architecture documentation stored in the repository that agents reference when making decisions. Storybook was added during the second week to provide better UI component documentation, which notably improved the crispness and consistency of the UI implementation. This demonstrates how traditional development tools can enhance agent effectiveness.

## Self-Improvement Mechanisms

One of the most intriguing aspects of the software factory is its self-improvement capability. When the initial specification was completed by Friday of the first week, the factory didn't simply stop - it entered a self-improvement loop over the weekend. It performed research on what Notion actually offers, identified gaps compared to the current Memo implementation, and added functionality like cover images and icons that weren't explicitly specified but made sense given the product vision.

The factory also identified that many components lacked tests and autonomously began writing tests when it had no other work queued. This proactive quality improvement represents a significant shift from traditional development where test writing often gets deprioritized.

The self-improvement loop is powered by the automation auditor and product improver working in concert with the operational monitoring. The auditor reviews the automations themselves and suggests improvements to the factory infrastructure, while the product improver focuses on UI and UX enhancements by analyzing past issues and identifying patterns. Both rely on the comprehensive issue history maintained in GitHub as their knowledge base.

## Challenges and Tradeoffs

The team was transparent about challenges and tradeoffs in this approach. Performance optimization was noted as an area requiring iteration - loading times and caching strategies for the complex database features need improvement. The team acknowledged that Notion's engineering team has spent far more than two weeks optimizing their data structures and performance, and this remains an area where human judgment and deep optimization work may still be necessary.

The lack of mandatory code review was controversial and acknowledged as a choice appropriate for this greenfield experimental context but not necessarily for production systems. The team noted that one participant found it difficult to accept eliminating code review entirely, which sparked ongoing discussion about how code review practices should evolve with autonomous agents.

Specificity in the product specification emerged as crucial. Many early bugs reported by users were actually just features that weren't mentioned in the spec, so the agent had to make assumptions. More detailed specifications upfront would have prevented these issues from shipping. This reinforces a fundamental principle of working with LLMs - the more precise the communication about what you want, the better the outcome.

The choice not to decompose the builder and reviewer into even smaller automations was intentional based on modern LLM capabilities. The models are sophisticated enough to handle bundled responsibilities, and creating hundreds of micro-specialized automations would add complexity without clear benefit. The team suggested that as models continue improving, the number of automations might actually decrease rather than increase, with more general automations using sub-agents for specific tasks.

## Tooling and Technology Stack

The factory uses Owner as its orchestration platform, with each automation defined in YAML files stored in the repository's automations folder. The product itself is built with modern web technologies and uses Storybook for component documentation. Sentry provides error monitoring and feeds the incident response loop. GitHub serves as both the code repository and the state management system through its issues and CLI.

The use of authenticated CLI tools is a key pattern - by providing agents with properly scoped access to GitHub CLI, Sentry, and other tools, the factory can operate across the full development lifecycle without requiring custom integrations for every service.

## Time Investment and Scaling

In terms of time investment, the developer spent varying amounts of time operating the factory throughout the two weeks. The first few days required significant hours, anywhere from 8 to 10 hours daily, primarily focused on setting up the factory infrastructure itself rather than building Memo directly. Over time, this tapered off significantly as the automations took over more responsibility. The developer was able to shift focus to reviewing metrics, monitoring dashboards, and improving documentation rather than hands-on development work.

## Future Directions and Industry Impact

The team believes that software factories are already being built across the industry, whether organizations call them that or not. The question is not whether to build them but how to standardize and optimize them. They see potential for standardization around tooling and patterns, though the best approaches are still emerging.

The background agents paradigm is central to this vision - agents that run continuously in the background handling different aspects of the SDLC rather than waiting for developer invocation. The team is organizing a summit focused on background agents to bring together implementers and discuss patterns, security considerations, and adoption strategies for larger organizations.

For individuals and teams, the recommendation is to start experimenting with automating specific bottlenecks rather than attempting to automate everything at once. If PR reviews take too much time, automate that. If monitoring and incident response are pain points, focus there. The modular nature of the automation approach means you can adopt incrementally and adapt to your specific workflow.

The public nature of this experiment provides valuable transparency into what software factory code actually looks like, how it performs, and what tradeoffs exist. The full repository, automation definitions, and metrics dashboards are available for others to learn from and adapt, advancing the entire field's understanding of what's possible with autonomous development agents in production environments.
