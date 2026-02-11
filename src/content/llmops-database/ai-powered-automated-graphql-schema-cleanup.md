---
title: "AI-Powered Automated GraphQL Schema Cleanup"
slug: "ai-powered-automated-graphql-schema-cleanup"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ad8024e470ee001a8e3a4"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:12:19.457Z"
  createdOn: "2025-12-23T17:57:22.559Z"
llmopsTags:
  - "code-generation"
  - "data-cleaning"
  - "agent-based"
  - "prompt-engineering"
  - "cost-optimization"
  - "error-handling"
  - "cicd"
  - "open-source"
  - "documentation"
industryTags: "e-commerce"
company: "Whatnot"
summary: "Whatnot, a livestream shopping platform, faced significant technical debt in their GraphQL schema with over 2,600 unused fields accumulated from deprecated features and old endpoints. Manual cleanup was time-consuming and risky, requiring 1-2 hours per field and deep domain knowledge. The engineering team built an AI subagent integrated into a GitHub Action that automatically identifies unused fields through traffic analysis and generates pull requests to safely remove them. The agent follows the same process an engineer would—removing schema fields, resolvers, dead code, and updating tests—but operates autonomously in the background. Running daily at $1-3 per execution, the system has successfully removed 24 of approximately 200 unused root fields with minimal human intervention, requiring edits to only three PRs, transforming schema maintenance from a neglected one-time project into an ongoing automated process."
link: "https://medium.com/whatnot-engineering/eliminating-graphql-schema-bloat-with-ai-so-you-dont-have-to-5f6ae84d0ee1"
year: 2025
seo:
  title: "Whatnot: AI-Powered Automated GraphQL Schema Cleanup - ZenML LLMOps Database"
  description: "Whatnot, a livestream shopping platform, faced significant technical debt in their GraphQL schema with over 2,600 unused fields accumulated from deprecated features and old endpoints. Manual cleanup was time-consuming and risky, requiring 1-2 hours per field and deep domain knowledge. The engineering team built an AI subagent integrated into a GitHub Action that automatically identifies unused fields through traffic analysis and generates pull requests to safely remove them. The agent follows the same process an engineer would—removing schema fields, resolvers, dead code, and updating tests—but operates autonomously in the background. Running daily at $1-3 per execution, the system has successfully removed 24 of approximately 200 unused root fields with minimal human intervention, requiring edits to only three PRs, transforming schema maintenance from a neglected one-time project into an ongoing automated process."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-automated-graphql-schema-cleanup"
  ogTitle: "Whatnot: AI-Powered Automated GraphQL Schema Cleanup - ZenML LLMOps Database"
  ogDescription: "Whatnot, a livestream shopping platform, faced significant technical debt in their GraphQL schema with over 2,600 unused fields accumulated from deprecated features and old endpoints. Manual cleanup was time-consuming and risky, requiring 1-2 hours per field and deep domain knowledge. The engineering team built an AI subagent integrated into a GitHub Action that automatically identifies unused fields through traffic analysis and generates pull requests to safely remove them. The agent follows the same process an engineer would—removing schema fields, resolvers, dead code, and updating tests—but operates autonomously in the background. Running daily at $1-3 per execution, the system has successfully removed 24 of approximately 200 unused root fields with minimal human intervention, requiring edits to only three PRs, transforming schema maintenance from a neglected one-time project into an ongoing automated process."
---

## Overview

Whatnot Engineering developed an AI-powered automation system to address GraphQL schema bloat, demonstrating a practical application of LLMs in production for code maintenance tasks. The company, which operates a livestream shopping platform serving multiple client applications (iOS, Android, web, and internal admin tools), accumulated substantial technical debt in the form of unused GraphQL fields from deprecated features and retired endpoints. This case study illustrates how Whatnot transformed a labor-intensive, risky maintenance task into an autonomous background process using an AI agent integrated into their CI/CD pipeline.

The core problem stemmed from the natural evolution of a complex system. As engineers built new features and moved on to other priorities, deprecated patterns and old endpoints remained in the codebase. Over time, this cruft created multiple challenges: increased schema complexity, difficulty in navigation, and production risks—including instances where old, unoptimized endpoints were accidentally reused in client code. While the team recognized the need for cleanup, the manual effort required (15 minutes to several hours per field) and the risk of breaking changes made it impractical to ask engineers to address this systematically.

## The Challenge of Identifying Unused Fields

The Whatnot team discovered that identifying truly unused GraphQL fields is significantly more complex than it initially appears. Static analysis alone proved insufficient for several reasons. The company's multiple client applications meant that older versions of mobile apps might still call queries removed from the main branch, and admin tooling often executed queries entirely outside primary repositories. This reality made it impossible to rely solely on code scanning to determine what was safe to delete.

To address this limitation, the team leveraged real production traffic data. They defined a field as "unused" if it hadn't been requested in the previous 30 days, establishing a reasonable safety window to prevent over-deletion. However, analyzing GraphQL usage patterns differs fundamentally from REST API analysis. Unlike REST, where each endpoint stands alone, GraphQL requests can span multiple fields across multiple types in a single query. A user query might retrieve a user object, access the user's first livestream, and then fetch usernames of all buyers from that livestream—all in one request. Fields are frequently shared across types, meaning a single field might appear in dozens of different queries, and removing it from one context could unintentionally break another.

The engineering team built a comprehensive data pipeline to measure true field usage. This pipeline parsed 30 days of GraphQL queries, deduplicated traffic by unique query hashes, and traversed the schema's Abstract Syntax Tree (AST) to record every field "visit." This graph-walking approach mirrored how GraphQL itself processes queries, ensuring accurate usage tracking across the complex type system. The results were striking: the analysis revealed over 2,600 unused fields, including nearly 200 root queries and mutations—a scale of technical debt that would have been impractical to address manually.

## The AI Agent Architecture

Rather than attempting to educate every engineer on manual field deletion or creating a centralized team to handle cleanup, Whatnot developed an AI subagent to automate the process. The agent was designed to replicate the exact steps a human engineer would follow: identify an unused field, remove it from the schema, delete the resolver definition and associated dead code, and update relevant tests. While the text doesn't specify the exact LLM model or prompting strategy used, the agent demonstrates clear understanding of code structure, dependency analysis, and testing requirements.

The automation was integrated into GitHub Actions, creating a scheduled workflow that runs regularly. Each execution follows a deliberate, conservative approach: the agent selects one unused field at a time and generates a pull request for its removal. This incremental strategy minimizes risk and makes each change easily reviewable. The generated PRs include clear explanations of what was changed, links to validation data supporting the deletion decision, and safety checklists for reviewers. Since each field in Whatnot's schema already has a defined code owner, the system automatically assigns PRs to the appropriate team for review.

## Production Results and Economics

The production deployment demonstrates compelling economics and effectiveness. Each agent run costs approximately $1-3 in LLM credits, a minimal expense compared to the engineering time saved. What previously required one to two hours of engineer time per field now takes only minutes to review. The team reports that most PRs require no edits at all—code owners can review the diff, verify context, and approve changes quickly, often during routine task switching.

As of the article's publication in November 2025, the subagent had successfully removed 24 of approximately 200 unused root fields. After working through initial implementation issues, only three PRs required manual edits, and even those were primarily due to merge conflicts from timing rather than substantive code errors. This success rate—requiring intervention in only about 12.5% of cases—suggests the agent has achieved reliable production quality for this specific task.

## Operational Considerations and Learnings

The case study provides valuable insights into the practical challenges of operating AI agents in production environments. The team discovered that the agent's effectiveness depends heavily on the surrounding development ecosystem. In several cases, the agent proposed deletions for fields that were technically still referenced in client code, particularly in the web repository. This highlighted a tooling gap: while Whatnot's mobile clients (iOS and Android) already had linters to catch unused GraphQL fragments, the web repository lacked equivalent tooling.

This observation led to a broader insight about AI automation: these systems are only as effective as the environment they operate within. The team concluded that automations and linters to enforce code cleanliness and remove dead code are essential prerequisites for agents to reach their full potential. Without proper tooling to prevent new technical debt, even the best cleanup agents will face ongoing challenges.

The incremental, one-field-at-a-time approach also proved strategically sound. By limiting each PR to a single change, the team ensured that any issues could be quickly identified and addressed without risking large-scale breakage. This conservative strategy trades speed for safety—a reasonable tradeoff when automating changes to production systems.

## LLMOps Implications and Future Direction

From an LLMOps perspective, this case study exemplifies several important principles for deploying LLMs in production maintenance scenarios. The system demonstrates effective scope limitation—rather than attempting to solve all code maintenance problems, it focuses on a well-defined, repeatable task with clear success criteria. The integration with existing development workflows (GitHub Actions, PR reviews, code ownership systems) ensures that the AI agent operates within established governance structures rather than bypassing them.

The cost structure is particularly noteworthy for LLMOps practitioners. At $1-3 per execution removing fields that would otherwise require 1-2 hours of engineer time, the ROI is straightforward and measurable. This economic clarity makes it easier to justify expanding the approach to other maintenance tasks. The team explicitly mentions exploring new automation opportunities for other menial engineering chores, such as cleaning up stale feature flags and deprecating old flags.

However, the case study also reveals important limitations and dependencies. The agent's performance depends on accurate usage data, which required building a sophisticated 30-day traffic analysis pipeline. The system works within a well-structured codebase with defined code owners and clear schema patterns. The need for supporting tooling (linters, static analysis) to maximize effectiveness suggests that AI agents are most successful when integrated into mature development environments rather than compensating for organizational gaps.

The article's claims should be viewed with appropriate skepticism given its source—an engineering blog post intended to showcase the company's technical sophistication and support recruiting. The stated success metrics (24 fields removed, only 3 requiring edits) are positive but represent a relatively small sample size. The system has addressed roughly 12% of the identified root field problem (24 of ~200), and the article doesn't discuss how the agent performs on the larger pool of 2,600 total unused fields, which may include more complex cases. There's no discussion of failed attempts, edge cases where the agent performed poorly, or the engineering effort required to build and tune the system initially.

## Technical Debt Management at Scale

The broader context of this implementation reveals how modern engineering organizations approach technical debt in production systems. Whatnot's GraphQL API serves as a critical interface between backend services and multiple client platforms, making it a high-risk area for changes. The accumulated 2,600 unused fields represent not just wasted code but actual business risk—the case study mentions instances where old, unoptimized endpoints were accidentally reused in production, directly impacting performance and user experience.

The team's decision to automate rather than manually address this problem reflects a mature understanding of organizational constraints. With multiple client platforms, fast-paced feature development, and the typical reluctance to prioritize "cleanup" work over new features, manual approaches to technical debt rarely succeed at scale. By creating an automated system that runs continuously in the background, Whatnot effectively treats schema maintenance as an operational concern rather than a project-based initiative.

The GraphQL-specific challenges highlighted in the case study—the need for AST traversal, the complexity of shared fields across types, the importance of real traffic data over static analysis—provide valuable technical details for organizations facing similar problems. The 30-day traffic analysis window represents a thoughtful balance between safety (avoiding deletion of rarely-used but important fields) and effectiveness (ensuring fields are genuinely unused rather than temporarily idle).

## Implications for AI-Assisted Development

This case study contributes to the growing body of evidence around practical AI applications in software engineering beyond code generation and copilot-style assistance. The agent operates not as an interactive assistant but as an autonomous background service, representing a different category of AI integration in development workflows. This "set it and forget it" approach requires higher reliability standards—the agent must consistently produce correct, safe changes without human oversight during execution, though human review remains part of the approval process.

The system's design choices reflect lessons learned from earlier automation attempts in software engineering. The incremental approach (one field at a time), comprehensive PR documentation, automatic code owner assignment, and integration with existing review processes all suggest an understanding that successful automation augments rather than replaces human judgment. The agent handles the tedious, time-consuming work of identifying unused code, removing it, and updating tests, while human reviewers provide final approval based on context and domain knowledge.

Looking forward, Whatnot's engineering team explicitly states their intention to expand this approach to other maintenance tasks, including feature flag cleanup and flag deprecation. These represent similar patterns: well-defined, repetitive tasks that require code understanding but follow predictable patterns. The success of the GraphQL cleanup agent provides both technical validation and organizational confidence for extending AI automation to other aspects of production maintenance.

The case study ultimately demonstrates that LLMs in production can deliver value in focused, well-scoped applications that address specific operational pain points. Rather than attempting to replace engineers or automate all development tasks, the approach succeeds by identifying high-friction, low-variability work that AI can handle reliably, freeing human engineers to focus on higher-level design and feature development. This pragmatic approach to AI integration may prove more sustainable and valuable than more ambitious but less reliable attempts at comprehensive automation.