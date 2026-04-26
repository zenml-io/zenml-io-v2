---
title: "Building a Self-Healing Software Factory with AI Agents"
slug: "building-a-self-healing-software-factory-with-ai-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "poc"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "error-handling"
  - "human-in-the-loop"
  - "evals"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "monitoring"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
industryTags: "tech"
company: "Software Factory"
summary: "Software Factory built Memo, a Notion-style note-taking application, using AI agents on the Ona platform over a 10-day development period. The project demonstrates an autonomous software development workflow where AI agents handle feature development, bug detection, and automated fixes with minimal human intervention. The system processes bugs reported through Slack or GitHub, automatically investigates issues flagged by monitoring tools like Sentry, and creates pull requests for fixes. By day five, the system had executed over 2,000 agent runs with 98% automation, automatically fixing bugs like workspace creation failures and hyperlink functionality while maintaining a quality grading system that self-improves the codebase according to product specifications."
link: "https://www.youtube.com/watch?v=SgBITxT-LhM"
year: 2026
seo:
  title: "Software Factory: Building a Self-Healing Software Factory with AI Agents - ZenML LLMOps Database"
  description: "Software Factory built Memo, a Notion-style note-taking application, using AI agents on the Ona platform over a 10-day development period. The project demonstrates an autonomous software development workflow where AI agents handle feature development, bug detection, and automated fixes with minimal human intervention. The system processes bugs reported through Slack or GitHub, automatically investigates issues flagged by monitoring tools like Sentry, and creates pull requests for fixes. By day five, the system had executed over 2,000 agent runs with 98% automation, automatically fixing bugs like workspace creation failures and hyperlink functionality while maintaining a quality grading system that self-improves the codebase according to product specifications."
  canonical: "https://www.zenml.io/llmops-database/building-a-self-healing-software-factory-with-ai-agents"
  ogTitle: "Software Factory: Building a Self-Healing Software Factory with AI Agents - ZenML LLMOps Database"
  ogDescription: "Software Factory built Memo, a Notion-style note-taking application, using AI agents on the Ona platform over a 10-day development period. The project demonstrates an autonomous software development workflow where AI agents handle feature development, bug detection, and automated fixes with minimal human intervention. The system processes bugs reported through Slack or GitHub, automatically investigates issues flagged by monitoring tools like Sentry, and creates pull requests for fixes. By day five, the system had executed over 2,000 agent runs with 98% automation, automatically fixing bugs like workspace creation failures and hyperlink functionality while maintaining a quality grading system that self-improves the codebase according to product specifications."
notion:
  pageId: "34ef8dff-2538-81e0-8e9f-e656a28dd8c3"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:10:10Z"
---

## Overview

This case study documents Software Factory's development of Memo, a Notion-style note-taking application, built entirely through AI agents operating on the Ona platform. The project represents a comprehensive exploration of autonomous software development, where LLM-powered agents handle the full software development lifecycle from feature planning through deployment and production bug fixes. The initiative demonstrates what they call a "software factory" approach—a fully automated development pipeline where AI agents work largely autonomously with strategic human oversight.

By day five of the ten-day project, the system had established 14 automations with 11 running regularly, executing over 2,000 agent operations with 98% being fully automated (triggered by events or schedules) and only 2% manually triggered for setup and iteration. This represents a significant achievement in production LLM deployment, moving beyond one-shot code generation to continuous, self-maintaining software development.

## Architecture and Agent System Design

The software factory is built around several specialized AI agents, each handling distinct aspects of the development lifecycle. The core agents include a feature planner that runs on a 30-minute schedule to triage and decompose issues from the backlog, a feature builder that implements the planned work, an incident responder that monitors production errors through Sentry integration, a bug fixer that addresses issues reported through various channels, and an automation auditor designed to improve the factory itself (though kept inactive during initial on-ramp phase).

The system integrates deeply with standard development tooling. Bugs can be reported through Slack channels where team members simply tag the Ona agent to trigger investigation and fixes, or through GitHub issues where community members or users can file reports. The feature planner automatically picks up these issues, triages them with priority levels, adds detailed context through investigation, and routes them to appropriate agents for resolution. Each automation maintains detailed conversation logs that allow developers to inspect the agent's reasoning process, tool usage, and decision-making at every step.

A particularly sophisticated element is the quality grading system maintained in a quality.md file. This file serves as both a benchmark and a continuous improvement mechanism. Agents decompose the product specification and grade different aspects of the architecture on a letter scale from A to F. The system avoids overly granular numeric scales (like 0-100) to reduce randomness in scoring, opting instead for a more stable categorical assessment. Over the course of development, grades improved from many B's and C's (or ungraded sections) to predominantly A's as the codebase matured and agents filled gaps identified through specification decomposition.

## Integration with Monitoring and Observability

The production deployment integrates Sentry for error monitoring and creates a closed-loop system for bug detection and remediation. When runtime errors occur in either frontend or backend, Sentry captures them and the incident responder automation queries Sentry's API to retrieve new issues. The agent checks whether similar issues have already been filed, investigates new problems by examining stack traces and application state, and automatically opens GitHub issues with detailed context.

In one example, the workspace creation feature failed in production due to a row-level security rule preventing database inserts. Sentry flagged the error, the incident responder investigated the database configuration, identified the overly restrictive RLS rule, and generated a pull request to correct it. This happened without human intervention, though the presenters note that in stricter production environments, database changes would likely require manual review before auto-merging.

The system demonstrates awareness of coverage limitations. If observability tools aren't properly configured to surface errors—for example, if error handling swallows exceptions or if only errors but not warnings are captured—the automated bug fixing cannot function effectively. Early in the project, the Sentry integration was configured to only retrieve errors and not warnings, causing some issues to go undetected. This was itself discovered and fixed through the automation improvement loop.

## Bug Fixing Workflows and Human-AI Interaction

The bug fixing workflow supports multiple entry points with varying levels of formality. For internal team bugs, developers can simply tag Ona in Slack threads with screenshots and descriptions. The agent spins up an environment, analyzes the screenshots, reads the description, investigates the codebase, and proposes fixes. This workflow is extremely low-friction and has become part of daily routines—the head of product engineering reportedly goes through the feedback channel each morning tagging Ona to fix multiple issues in rapid succession.

For more formal or external bug reports, GitHub issues provide a structured entry point. Users can file bugs with minimal detail, and the feature planner automation enriches these reports by investigating the actual behavior, documenting expected versus observed states, and assigning priority levels. This is particularly important for open-source scenarios where the project will accept community contributions and bug reports from users outside the internal Slack.

The system maintains awareness of risk levels for different types of changes. Currently configured to auto-approve all pull requests to maximize velocity during development, the presenters explicitly discuss how production deployments would differentiate between low-risk changes (like UI adjustments) that can auto-merge and high-risk changes (like database schema modifications or security rules) that require human review. This demonstrates thoughtful LLMOps practices around deployment gates and approval workflows.

## Specification-Driven Development and Quality Control

A central theme throughout the case study is the critical importance of detailed product specifications. The agents can only build what they understand from the specifications, and vague or incomplete specs lead to suboptimal outcomes. This mirrors human software development but is arguably more pronounced with AI agents—where a human developer might infer intent or ask clarifying questions, the agents work more literally from documented requirements.

The quality.md file serves as both a specification enforcement mechanism and a gap detection system. When the backlog is empty, agents decompose the product specification, compare it against the current implementation, identify gaps, and assess whether existing grades accurately reflect implementation quality. This creates a form of specification-driven test coverage that goes beyond traditional unit or integration tests to assess architectural completeness.

The presenters emphasize that achieving good outcomes requires iteration on the specifications themselves, not just the code. As the product vision becomes clearer and specifications grow more detailed, agent performance improves. They explicitly compare this to manufacturing—a production line can be highly efficient, but without a clear blueprint of what to build, efficiency doesn't translate to quality outcomes.

## Testing and Edge Case Coverage

The system implements multiple layers of testing, though the discussion focuses more on production monitoring than pre-deployment testing. The presenters mention end-to-end testing, unit testing, and integration testing as components that can be added to the factory, noting that while you can never reach 100% test coverage pre-deployment, catching and auto-fixing production bugs creates a powerful feedback loop.

As user volume increases, the system gains more edge case coverage through real-world usage. Each bug discovered in production and automatically fixed strengthens the overall system. This creates a flywheel effect where more users lead to more edge cases, which lead to more automated fixes, improving stability and user experience over time.

An interesting technical detail emerges around visual regression testing. For UI bugs like misalignment, checkboxes being invisible, or strange drag-and-drop behavior, traditional error monitoring doesn't help since no exceptions are thrown. The agents have browser capabilities and can take screenshots or record videos during testing, allowing them to detect visual issues that wouldn't appear in logs. However, this requires very specific specifications about visual behavior and design expectations.

## Challenges and Limitations Observed

Several challenges emerged during the development process that provide valuable insights for LLMOps practitioners. Specification specificity proved critical but difficult to get right initially. When fixing a bug with placeholder alignment, the agent technically resolved the reported issue (the drag handle no longer overlapped the placeholder) but did so by moving the editor component rather than adjusting the placeholder alignment as intended. This required more specific guidance about the desired solution approach, not just the problem description.

The automation auditor—designed to improve the factory's own automations—was intentionally kept inactive during the initial on-ramp phase. The reasoning reveals an important LLMOps consideration: allowing systems to self-improve before the base system is stable risks compounding errors or diverging in unintended directions. The presenters advocate for a phased approach where human oversight validates automation quality before enabling meta-level improvement loops.

Coverage and visibility limitations presented ongoing challenges. If errors are swallowed by exception handling, if monitoring tools aren't configured comprehensively, or if databases and infrastructure aren't properly instrumented with observability, the automated systems have blind spots. The presenters identify this as the biggest current limitation—ensuring every relevant signal is captured and made available to the agent workflows.

Self-grading accuracy also requires scrutiny. The quality.md file depends on agents honestly assessing their own work, which risks grade inflation as agents mark their implementations as A-grade when they may not truly meet that standard. The presenters discuss adding more rigorous auditing to the grading process, with agents that specifically challenge assigned grades rather than accepting them at face value.

## Production Deployment Considerations

The case study demonstrates several mature LLMOps practices for production deployment. All automations maintain detailed execution logs accessible for debugging and transparency. The conversation history for each agent run shows prompts, tool invocations, reasoning steps, and outputs, enabling developers to understand and validate agent behavior even in fully automated workflows.

The system uses a pull request-based workflow rather than direct commits, maintaining code review as a gate even when reviews are automated. This preserves audit trails and creates natural rollback points. The distinction between auto-approved low-risk changes and human-reviewed high-risk changes acknowledges that full automation isn't always appropriate, especially for production databases or security-critical code.

Integration patterns follow standard development practices—Slack for internal team workflows, GitHub for public issue tracking and code management, Sentry for error monitoring. This allows the AI factory to slot into existing toolchains rather than requiring wholesale process changes. The 30-minute schedule for the feature planner represents a balance between responsiveness and resource efficiency.

The phased on-ramp approach—starting with heavy human oversight and gradually reducing intervention as the factory stabilizes—represents sophisticated thinking about production LLM deployment. Rather than expecting perfect autonomous operation from day one, the team explicitly plans for an iteration period where they refine specifications, adjust automation prompts, and validate outputs before stepping back.

## Business and Organizational Impact

From a product development velocity perspective, the results are striking. Over five days, the system merged 50+ pull requests, built out core features of a note-taking application, and automatically detected and fixed multiple production bugs. The head of product engineering's morning routine of rapid-fire bug tagging in Slack suggests significant time savings compared to traditional triage, ticket creation, assignment, and implementation processes.

The shift from Slack feedback channels as "graveyards" where issues languish to active bug-fixing pipelines represents a meaningful operational improvement. Previously, bugs would be shared in Slack, manually transferred to Linear for tracking, and eventually picked up for implementation. Now the loop from report to investigation to fix happens within hours without manual handoffs.

The open-source implications are particularly interesting. By accepting bug reports through GitHub issues and automatically enriching and triaging them, the project can scale community involvement without overwhelming maintainers. External contributors can file issues that receive detailed investigation and context automatically, even if they aren't on the internal Slack.

However, the presenters acknowledge that fully public automation introduces risks. Malicious issue reports or feature requests could potentially trigger unwanted agent behavior. They plan to add filtering and assessment layers before enabling full public automation, showing appropriate caution about security and abuse potential when deploying LLMs in production with external inputs.

## Future Directions and Evolution

The project is explicitly designed as a "factory" that improves itself over time. The automation auditor, once enabled, will review automation outputs, identify quality issues or inefficiencies, and propose improvements to the automation prompts and workflows themselves. This meta-level improvement represents a frontier in LLMOps—not just using LLMs to build software, but using them to optimize the LLM workflows themselves.

The quality grading system is expected to become more rigorous, with more detailed success criteria, concrete examples for each grade level, and more challenging audit processes. The goal is reducing the latitude for interpretation in quality assessment, pushing toward more objective and comparable metrics over time.

Visual testing and UI validation remain areas for enhancement. While the agents have screenshot and video recording capabilities, leveraging these effectively for automated visual regression testing requires further development. The presenters indicate that more detailed design specifications and visual standards will be necessary to catch UI bugs pre-deployment rather than in production.

The project will transition to fully open-source development with community bug reports and feature requests. This will test whether the automated triage and enrichment systems can handle higher volumes and more varied input quality while maintaining security and preventing abuse. The broader vision is a software development model where human developers focus on product vision and strategic direction while AI agents handle implementation, testing, bug fixing, and continuous improvement within well-defined guardrails.
