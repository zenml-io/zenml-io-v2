---
title: "Building a Software Factory with AI Agents and Automation Loops"
slug: "building-a-software-factory-with-ai-agents-and-automation-loops"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "fallback-strategies"
  - "evals"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "monitoring"
  - "devops"
  - "orchestration"
  - "documentation"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "open-source"
industryTags: "tech"
company: "Software Factory"
summary: "This case study documents the development of Memo, a note-taking application built entirely through AI agents and automation loops on the Ona platform. The team demonstrates how they moved from being \"in the loop\" to \"on the loop\" by creating a self-sustaining software factory where AI agents handle the complete development lifecycle from feature planning through deployment and post-merge verification. The system runs largely autonomously with minimal human intervention, processing pull requests, conducting reviews, fixing bugs, and even improving its own automation workflows. Results include dramatically increased development velocity, with hundreds of PRs merged automatically through intelligent agent collaboration, automated testing, and self-healing mechanisms that catch and fix production issues without human involvement."
link: "https://www.youtube.com/watch?v=ELS-DvDT3Yg"
year: 2026
seo:
  title: "Software Factory: Building a Software Factory with AI Agents and Automation Loops - ZenML LLMOps Database"
  description: "This case study documents the development of Memo, a note-taking application built entirely through AI agents and automation loops on the Ona platform. The team demonstrates how they moved from being \"in the loop\" to \"on the loop\" by creating a self-sustaining software factory where AI agents handle the complete development lifecycle from feature planning through deployment and post-merge verification. The system runs largely autonomously with minimal human intervention, processing pull requests, conducting reviews, fixing bugs, and even improving its own automation workflows. Results include dramatically increased development velocity, with hundreds of PRs merged automatically through intelligent agent collaboration, automated testing, and self-healing mechanisms that catch and fix production issues without human involvement."
  canonical: "https://www.zenml.io/llmops-database/building-a-software-factory-with-ai-agents-and-automation-loops"
  ogTitle: "Software Factory: Building a Software Factory with AI Agents and Automation Loops - ZenML LLMOps Database"
  ogDescription: "This case study documents the development of Memo, a note-taking application built entirely through AI agents and automation loops on the Ona platform. The team demonstrates how they moved from being \"in the loop\" to \"on the loop\" by creating a self-sustaining software factory where AI agents handle the complete development lifecycle from feature planning through deployment and post-merge verification. The system runs largely autonomously with minimal human intervention, processing pull requests, conducting reviews, fixing bugs, and even improving its own automation workflows. Results include dramatically increased development velocity, with hundreds of PRs merged automatically through intelligent agent collaboration, automated testing, and self-healing mechanisms that catch and fix production issues without human involvement."
notion:
  pageId: "34ef8dff-2538-81a6-b465-ce3343ac219c"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:06:50Z"
---

## Overview

This case study showcases an advanced implementation of a software factory concept where AI agents autonomously manage the entire software development lifecycle. The team is building Memo, an Obsidian-style note-taking application, using the Ona platform as their foundation for orchestrating AI agents and automation loops. The project represents a sophisticated example of LLMOps in production, demonstrating how large language models can be operationalized not just for individual tasks but as a complete autonomous development system.

The project is being documented in real-time through a video series, with day four focusing on the automation infrastructure that powers the factory. At this stage, the application has already had 52 pull requests merged, with a functional outline of the product live and operational. The system demonstrates a paradigm shift from developers being "in the loop" (actively implementing features) to being "on the loop" (designing feedback mechanisms and reviewing high-level architecture decisions).

## Technical Architecture and Automation Pipeline

The software factory operates through a sophisticated chain of interconnected automations, each handling specific aspects of the development workflow. At the foundation is the feature builder automation, which runs on an hourly schedule and picks up issues created either by users or by the feature planner automation. The feature planner itself analyzes user-reported bugs, triages them according to a defined label convention, and creates appropriately structured GitHub issues that serve as the input for the development process.

Once issues are created, the feature builder generates pull requests automatically. These PRs then enter a comprehensive review cycle managed by the PR reviewer automation. This automation represents one of the most critical components of the system, as it ensures code quality without human bottlenecks. The PR reviewer examines whether implementations match the specifications provided, creates detailed comments on specific files when improvements are needed, and initiates conversation threads that must be resolved before merging.

A particularly interesting aspect of the architecture is the use of conversation-based resolution loops. When the PR reviewer identifies issues, it doesn't simply flag them for human attention. Instead, it creates GitHub conversation threads that trigger additional automation runs. The system continues iterating on the code, making improvements and addressing comments until all conversations are resolved according to predefined rulesets. This creates a self-sustaining improvement loop where agents essentially review and fix their own work without human intervention.

## Self-Healing and Redundancy Mechanisms

One of the most sophisticated aspects of this LLMOps implementation is the PR shepherd automation, which acts as a fail-safe mechanism for the entire system. Running on an hourly schedule, this automation reviews pull requests that have become stale or have been flagged with a "needs human" label. Rather than simply escalating these to humans, the PR shepherd conducts a secondary review to assess whether the initial assessment was correct and attempts to fix any issues the agent can handle autonomously.

This addresses a critical challenge in production LLM systems: handling edge cases and failures gracefully. The PR shepherd catches situations where automation runs fail or PRs fall through the cracks, providing system-level resilience. It can perform tasks like rebasing branches, resolving merge conflicts, and addressing build failures that might otherwise require human intervention. The team notes that this creates a redundancy layer that ensures the primary development loop has a reliable fallback mechanism.

The system also includes post-merge verification, which represents another layer of production safety. After code is merged to production, automated verifications run to ensure the deployed application actually works as expected. If post-merge verification fails, the system automatically creates a high-priority bug report to address production issues. This closes the loop between deployment and quality assurance, ensuring that bugs in production are caught and triaged without requiring manual monitoring.

## Code Review Architecture and Compliance

The case study reveals sophisticated thinking about code review in an AI-driven environment. The team discusses how they're implementing multi-dimensional review processes where different automations check for different aspects: correctness, security, architecture compliance, test coverage, and UI/UX quality. This decomposition of review into specialized concerns allows for more thorough automated assessment than a single monolithic review process would provide.

Particularly noteworthy is the discussion of compliance-compatible automated review. The team references practices being used at Ona for SOC 2 compliant environments, where they implement risk-based auto-approval systems. Low-risk changes to documentation or non-critical code paths are automatically approved, while still maintaining audit trails and the option for human review. This addresses a common bottleneck in scaled AI development where compliance frameworks require multiple reviewers, which becomes untenable when processing hundreds or thousands of pull requests.

The system maintains human accountability even with auto-approval by having humans press the final merge button, ensuring they take responsibility for changes even if they don't conduct detailed line-by-line reviews. This represents a pragmatic balance between automation velocity and organizational responsibility. The team notes that this approach has dramatically improved their velocity, with blog post references showing significant improvements in time to first approval and overall lead time after implementing auto-approval for low-risk changes.

## Artifact-Based Review and Higher-Level Oversight

An interesting evolution described in the case study is the shift toward artifact-based review as the primary mode of human oversight. Rather than reviewing individual code diffs, human developers are moving up the abstraction ladder to review higher-level artifacts like architecture diagrams, entity relationship diagrams, and component documentation. The discussion references using tools like Storybook for reviewing UI components at a higher level than raw code inspection.

This approach acknowledges that when agents are generating large volumes of changes, traditional line-by-line code review becomes impractical. Instead, humans focus on architectural decisions, domain boundary violations, and key tradeoffs made within pull requests. The system provides bottom-line summaries that highlight what changed, what was impacted, and what key decisions were made, allowing for quick judgment calls about whether detailed inspection is warranted.

The team discusses implementing review automations that specifically check for architecture violations, such as crossing domain boundaries inappropriately or introducing fundamental design issues. This allows humans to operate more as architects and engineering managers than as individual code reviewers, which better matches the scale of autonomous development systems.

## Self-Improvement and Meta-Automation

Perhaps the most advanced aspect of this LLMOps implementation is the planned automation auditor, which represents a meta-level of automation that reviews and improves the automation system itself. While not yet active at the time of this recording, the automation auditor is designed to review existing automation code, analyze automation run logs, and suggest improvements to the automation workflows.

The team discusses specific examples of what this auditor might catch, such as redundant checks performed by multiple automations or inefficient patterns in how comment resolutions are handled. The goal is to create a truly self-improving system where not only does the code improve autonomously, but the very machinery that generates and reviews code also improves without human intervention. This represents a sophisticated vision of LLMOps maturity where the operational infrastructure itself becomes subject to ML-driven optimization.

The automation auditor will assess whether reviews are being done efficiently, whether UI verification steps are redundant with PR review steps, and where the automation stack can be streamlined. This creates a continuous improvement loop at the infrastructure level, not just the application level.

## Bug Tracking and Incident Response

The system integrates with Sentry for production error tracking, with an incident responder automation that runs every 15 minutes. This automation picks up both client-side and server-side errors, assesses them for severity and type, and converts them into appropriately prioritized bug reports or logs for review. This creates a tight feedback loop from production errors to the development backlog without requiring manual triage.

The team also discusses implementing in-app bug reporting as a planned feature, where users can report issues directly within the application. These reports would be automatically triaged and converted into actionable development tasks, further closing the loop between user experience and development priorities. This demonstrates thinking about the complete production lifecycle, from planning through deployment, monitoring, and user feedback integration.

## Deployment and Continuous Integration

The system includes automated deployment processes with built-in verification. After merges, the code is automatically deployed and smoke tested to ensure nothing breaks in production. The team mentions having experienced situations where post-merge verification caught issues that had already reached production, automatically creating high-priority fixes. This demonstrates the value of layered verification approaches in production LLM systems.

The deployment automation also includes performance monitoring, though the team notes this is currently handled through CI checks rather than through a standalone automation. They plan to add a dedicated performance monitoring automation as a redundancy measure, further exemplifying their philosophy of layered, resilient automation architectures.

## Operational Metrics and Observability

The software factory includes automations for tracking and reporting metrics. A daily metrics automation updates statistics on lines of code written, PRs merged, and test coverage. There's even a tweet drafter automation that posts daily progress updates to social media automatically. These observability features demonstrate mature thinking about operating autonomous systems at scale, where understanding system behavior and communicating progress becomes important.

The team also plans a weekly recap automation and has built custom dashboards showing the state of the codebase and development velocity. This level of instrumentation is critical for LLMOps at scale, where understanding how the autonomous system is performing becomes as important as understanding the application being built.

## Challenges and Practical Considerations

The team is candid about challenges they've encountered. The most significant is the "zero to one" problem of initial setup. While the Ona platform provides powerful capabilities for defining and deploying automations, there's still considerable thinking required to design effective automation workflows. When automations hit unexpected edge cases or apply "needs human" labels unnecessarily, debugging and improving the prompt engineering and workflow logic requires human insight.

The team also acknowledges that their current quality bar isn't perfect. UI bugs still slip through, and the feedback loops aren't yet catching all issues. They're transparent that the next phase involves improving the quality gates to ensure higher standards before code reaches production. This honest assessment is valuable for understanding the maturity curve of production LLM systems.

Another practical consideration discussed is risk tolerance. The team notes they're currently operating with high risk tolerance by merging most things autonomously, which might not be appropriate for all production environments. They discuss how in enterprise contexts, different approaches like risk-based auto-approval provide better balancing of velocity and safety.

## Development Workflow Evolution

The case study provides insight into how developer workflows change in this environment. Rather than writing code, developers spend time reviewing automation outputs, designing feedback mechanisms, and improving the automation infrastructure itself. When issues arise, the workflow involves opening a chat interface with Ona, providing links to problematic PRs, and having conversations about why automations hit limitations and how to improve them.

In one example, the team describes how an automation that hit a wall was debugged through a conversation interface, which not only fixed the immediate PR but also improved the automation itself and updated the automation prompts autonomously. This illustrates how the development workflow becomes more about meta-level system improvement than direct feature implementation.

## Production Maturity and Scale

The system demonstrates several characteristics of production-grade LLMOps. It handles failures gracefully through multiple layers of redundancy, maintains compliance with security frameworks while operating autonomously, provides comprehensive observability into system behavior, and includes self-improvement mechanisms. The velocity improvements cited show this isn't just a proof of concept but a genuinely effective approach to software development at scale.

The team's discussion of moving from sequential thinking to parallel feature development as the baseline infrastructure stabilizes demonstrates understanding of how autonomous systems scale differently than human teams. Once the foundation is solid, the marginal cost of additional parallel workstreams drops dramatically with AI agents compared to human developers.

This case study represents a sophisticated vision of LLMOps maturity where LLMs aren't just tools used within development but become the primary development infrastructure itself, with humans operating at higher levels of abstraction focused on architecture, product direction, and system design rather than implementation details.
