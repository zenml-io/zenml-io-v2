---
title: "Building Eval Forge: A Comprehensive AI Agent Testing and Monitoring Platform"
slug: "building-eval-forge-a-comprehensive-ai-agent-testing-and-monitoring-platform"
draft: false
llmopsTags:
  - "poc"
  - "code-generation"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "evals"
  - "agent-based"
  - "system-prompts"
  - "mcp"
  - "cicd"
  - "monitoring"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "anthropic"
  - "google-gcp"
industryTags: "tech"
company: "Wix"
summary: "Wix developed Eval Forge, an internal platform for testing and monitoring multi-agent AI systems in production, to address the challenge of ensuring quality and catching regressions in non-deterministic AI agents. The system evolved from basic scenario testing with LLM judges to a comprehensive solution supporting versioning, side-by-side comparisons, scheduled monitoring runs, and automated PR-based evaluation flows. By implementing proper assertions, versioning for all components (skills, sub-agents, roles, MCPs), scheduled runs for catching external dependency changes, and tight integration with the development workflow through Git-based automation, Wix established confidence in their AI systems and created enforcement policies requiring scenario coverage for all skill changes across the organization."
link: "https://www.youtube.com/watch?v=eAhmj7weHss"
year: 2026
seo:
  title: "Wix: Building Eval Forge: A Comprehensive AI Agent Testing and Monitoring Platform - ZenML LLMOps Database"
  description: "Wix developed Eval Forge, an internal platform for testing and monitoring multi-agent AI systems in production, to address the challenge of ensuring quality and catching regressions in non-deterministic AI agents. The system evolved from basic scenario testing with LLM judges to a comprehensive solution supporting versioning, side-by-side comparisons, scheduled monitoring runs, and automated PR-based evaluation flows. By implementing proper assertions, versioning for all components (skills, sub-agents, roles, MCPs), scheduled runs for catching external dependency changes, and tight integration with the development workflow through Git-based automation, Wix established confidence in their AI systems and created enforcement policies requiring scenario coverage for all skill changes across the organization."
  canonical: "https://www.zenml.io/llmops-database/building-eval-forge-a-comprehensive-ai-agent-testing-and-monitoring-platform"
  ogTitle: "Wix: Building Eval Forge: A Comprehensive AI Agent Testing and Monitoring Platform - ZenML LLMOps Database"
  ogDescription: "Wix developed Eval Forge, an internal platform for testing and monitoring multi-agent AI systems in production, to address the challenge of ensuring quality and catching regressions in non-deterministic AI agents. The system evolved from basic scenario testing with LLM judges to a comprehensive solution supporting versioning, side-by-side comparisons, scheduled monitoring runs, and automated PR-based evaluation flows. By implementing proper assertions, versioning for all components (skills, sub-agents, roles, MCPs), scheduled runs for catching external dependency changes, and tight integration with the development workflow through Git-based automation, Wix established confidence in their AI systems and created enforcement policies requiring scenario coverage for all skill changes across the organization."
notion:
  pageId: "386f8dff-2538-8010-8308-d521a09e3857"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-21T13:07:00.000Z"
  lastEditedTime: "2026-06-21T13:07:00.000Z"
  publishedAt: "2026-06-29T15:15:36Z"
---

## Overview

Wix built Eval Forge, an internal platform designed to address a critical gap in AI development: knowing whether AI systems actually work well in production. The presentation, delivered by Or Goldreif, a full-stack developer at Wix, chronicles the evolution of this testing and monitoring system over approximately one year. The team initially worked on a multi-agent product that generated code from user prompts, but they lacked confidence in whether their system truly functioned correctly. While they had deterministic tests for classic flows and some manual AI testing, they had no systematic way to measure quality consistently or catch regressions when changes were made to prompts, models, or dependencies.

The fundamental problem Wix faced mirrors challenges across the industry: in classical deterministic code, testing frameworks provide clear answers about whether changes break functionality, but with non-deterministic AI agents, this becomes significantly more complex. Questions like "Did this prompt change break something?" or "Is my prompt safe to merge?" or "Did an MCP tool I'm indirectly using change and cause a regression?" were difficult to answer definitively.

## Technical Foundation and Key Concepts

Eval Forge was built around several core concepts related to agent architecture. The system supports MCP (Model Context Protocol), which serves as the communication protocol between agents and models, acting as the agent's interface to the external world—databases, APIs, GitHub, or any other external systems. The analogy used is that MCP is like a USB-C connection for models and agents.

Roles define information that agents should receive in every execution, establishing constraints, behavior patterns, or any knowledge needed for each request. Skills represent information stored separately from the main agent context, consisting of descriptions and associated data. During each agent run, the agent scans all available skills and, based on their descriptions, determines which skills are relevant to the conversation, loading only those into context. This approach maintains cleaner context windows and avoids overwhelming the agent with all potentially needed information upfront.

Sub-agents are agents that the primary agent can invoke, each with predefined tasks. The primary agent can activate sub-agents as needed, which run in separate contexts and return summarized results to the main agent. This architecture preserves clean context for the primary agent while enabling better separation of responsibilities.

## Evolution of the System: Initial Implementation

The team started with a relatively simple system architecture. They built a framework where agents could be configured with specific models, temperature settings, and system prompts. Skills were defined for these agents, and scenarios were executed against them. Each scenario included assertions—the definitions of when a scenario passes. Some assertions were concrete, such as whether the agent called the correct skill or whether a build passed. Other assertions were non-concrete, depending on the agent's output, which required an LLM judge to evaluate and assign scores.

This initial phase quickly revealed the first major takeaway: scenarios are the unit tests of AI systems. Running scenarios is the easy part; defining appropriate assertions is where the real work lies. A scenario with incorrect assertions provides false confidence, making developers believe everything works correctly when it doesn't—a situation worse than having no scenario at all. If you cannot properly define when a scenario passes, you also cannot know when it breaks.

## Adding Complexity: Supporting Full Agent Architecture

After establishing the basic system, the team recognized significant gaps. Real agents aren't just system prompts—they connect to MCPs, have sub-agents, and have roles, all of which can significantly influence agent behavior. If these components weren't captured and measured, the evaluation wasn't truly comprehensive. The system was expanded to support these additional components, ensuring that the full agent architecture was represented in testing.

Following this, Git synchronization was added, allowing every entity—skills, sub-agents, roles—to be synchronized with Git repositories, ensuring tests always ran against production code. Versioning capabilities were introduced, enabling teams to create versions for any entity and compare them systematically.

## Comparative Analysis and Side-by-Side Evaluation

Beyond versioning, Eval Forge implemented dedicated comparison flows. Rather than just running scenarios with version 1 of a skill, teams could now perform direct side-by-side comparisons. Everything remains identical except for the specific variable being tested—perhaps a single skill version. This pinpointed exactly what changed and how that version affected agent execution. The system provides detailed output showing exactly where differences occurred between runs.

This comparative capability addressed the second major learning: side-by-side runs provide real certainty. Saying something "feels good," which was the common practice before, doesn't constitute real data. Actually seeing comparison results between versions does. Beyond simple pass/fail rates or scores, which can obscure what actually changed, every model change, prompt modification, or new tool addition requires side-by-side analysis to truly capture the impact.

## From Test Runner to Monitoring: Scheduled Evaluation

At this stage, Eval Forge had evolved into a relatively stable system with substantial value, teaching the team many things they hadn't known and catching numerous issues missed during development. However, evaluations still only ran when manually triggered. What about changes that happened without explicit awareness? This led to adding scheduled runs—suites of scenarios could execute on demand, nightly, weekly, hourly, or at any desired frequency.

This capability captured changes the team didn't explicitly make, such as subtle model behavior shifts or changes to MCP tools. The addition of scheduled runs transformed Eval Forge from purely a test runner into a monitoring system as well. The third major insight emerged: both capabilities are essential. Test runners catch what developers break through their changes, while monitoring catches what the external world breaks—changes in MCPs, dependencies, or model behavior. These external changes happen frequently and are easy to miss without proper monitoring.

## Alerting and Regression Detection

With monitoring in place came the need for alerts. When scheduled runs detect regressions, someone needs to be notified. However, the challenging part isn't sending alerts—it's determining when alerts should be sent. Not every small change, like a run taking three additional seconds, necessarily indicates a regression requiring immediate attention. Defining appropriate alert thresholds became a critical consideration.

## User Interface and Practical Demonstration

The demonstration showed Eval Forge's interface, which includes a dashboard providing overall pass rate and cost trends, highlighting scenarios with low pass rates that warrant examination. The system manages skills that can be synced with Git, enabling version creation for each skill. Similar capabilities exist for sub-agents, MCPs, and roles.

Agents can be configured as CLI agents, with options for different models like Claude or Gemini Flash. System prompts are configurable, and the same flexibility exists for SDK agents. Scenarios include names and environment configurations, which can be file setup, API setup, or both. File setup might involve spinning up a new site specifically for that test run, defining the starting point for the agent in terms of available files.

Each scenario has a trigger prompt—the actual request sent to the agent—and assertions defining success criteria. Available assertions include whether specific skills were called, whether tools were invoked, whether builds passed, time limits, LLM judge evaluations, and API calls. API call assertions are particularly useful when agents receive numerous requests and it's difficult to determine from traces and call patterns alone whether everything occurred correctly. Making an API call at the end of execution to verify expected state provides concrete validation.

In one demonstrated scenario, an e-commerce site was created as the environment, with a trigger prompt requesting all products. Assertions verified that the correct MCP tool was called and that an LLM judge confirmed 24 items were returned. The demonstration showed the agent's step-by-step execution, including all tool calls, with detailed breakdowns of costs, tokens, and duration for each tool used.

The comparison flow demonstrated evaluating two different models—Claude 3.5 Sonnet versus Gemini 1.5 Flash—with everything else identical. The side-by-side comparison clearly showed output differences, highlighting that Claude 3.5 Sonnet performed better in both duration and meeting assertions, though both passed.

## Development Workflow Integration: PR-Based Evaluation

A significant gap remained: development feedback. While monitoring caught regressions after deployment to production, there was no tight integration during development itself. Changing a skill, updating it in the system, running manually, and waiting for results proved lengthy and cumbersome. This led to implementing automated evaluation on every pull request through a GitHub action.

The GitHub action runs evaluation on all relevant PRs. For example, in a repository containing all skills, whenever something changes, the action executes evaluation automatically. Tags play a crucial role here—each scenario can be tagged, allowing the GitHub action to parse which tags are relevant to specific changes and run only those scenarios. When a particular document updates, the GitHub action determines the relevant tag and executes only applicable scenarios rather than the entire suite.

The fourth major takeaway emerged: make the evaluation flow as automated as possible. The harder it is to use, the less it gets used. The goal is minimal effort and procedure—developers write code, evaluation runs automatically, and they simply receive results.

## Organizational Adoption and Enforcement

What began as a system for one team's internal needs gradually gained traction, expanding beyond the original team and group. Multiple projects across Wix began using Eval Forge. The platform even became part of a new enforcement policy requiring anyone changing a skill to create an accompanying scenario demonstrating what didn't work before and now does.

The demonstration showed this enforcement in action: when someone pushes a skill change, the merge is blocked until they add a corresponding scenario. Scenarios can be added through the UI, via API, or directly in code. Once the PR is pushed, the GitHub action runs, and merging is only permitted after results confirm the scenario passes. This enforcement ensures that skill changes across Wix are backed by proper test coverage.

## Key Learnings and Best Practices

The presentation concluded with several practical takeaways for teams beginning evaluation work. First, assertions are the hard part—not running scenarios but defining appropriate success criteria. Second, run both manually and on schedules, as they catch fundamentally different types of issues. Third, integrate evaluation into the development flow to ensure it's part of the normal workflow rather than a separate manual process. Fourth, use tags to enable PR flows to run quickly without executing every possible scenario on every minor change. Fifth, version everything—skills, roles, MCPs, and system prompts—to enable proper comparison and regression tracking.

## Critical Assessment and Balanced Perspective

While the presentation showcases an impressive internal tool development effort, several considerations warrant mention. The demonstration showed one scenario returning zero products when it should have returned 24, highlighting that even with comprehensive testing infrastructure, flakiness and unexpected failures still occur. The system's value depends heavily on the quality of assertions and LLM judges, which themselves can be sources of non-determinism.

The organizational mandate requiring scenarios for all skill changes represents both a strength and potential friction point—while ensuring coverage, it also adds development overhead. The effectiveness of this approach depends on whether teams view it as valuable guardrails or bureaucratic obstacles.

The scheduled monitoring approach is sound, but the acknowledged challenge around alerting thresholds is significant. Without careful tuning, teams risk either alert fatigue from too many false positives or missed regressions from overly permissive thresholds. The presentation doesn't deeply explore how these thresholds are determined or adjusted over time.

The platform appears highly customized to Wix's specific multi-agent architecture and workflows. While the concepts are broadly applicable, organizations with different agent architectures or development practices would need to adapt the approach significantly rather than adopting it wholesale.

The reliance on side-by-side comparisons, while valuable, also assumes relatively stable baseline behavior. In rapidly evolving AI systems where expected behavior itself shifts, determining whether differences represent improvements, regressions, or neutral changes becomes more subjective and challenging.

Overall, Eval Forge represents a thoughtful, systematic approach to addressing real LLMOps challenges around testing and monitoring non-deterministic AI systems in production. The evolution from simple scenario testing to comprehensive versioning, comparison, scheduling, and workflow integration reflects practical learning from real production needs. The platform's growing adoption across Wix and integration into development policies suggests genuine value, though teams considering similar approaches should carefully consider their specific contexts, agent architectures, and organizational dynamics when determining what elements to adopt.
