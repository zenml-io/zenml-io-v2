---
title: "No-Code Agentic Workflow Platform for Automated Code Changes"
slug: "no-code-agentic-workflow-platform-for-automated-code-changes"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "693bdd6b4a90bf2f0ecb6b7f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:35:13.879Z"
  createdOn: "2025-12-12T09:16:27.267Z"
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "mcp"
  - "docker"
  - "orchestration"
  - "cicd"
  - "fastapi"
  - "open-source"
  - "documentation"
  - "anthropic"
  - "openai"
industryTags: "education"
company: "Duolingo"
summary: "Duolingo developed an internal platform enabling employees across all roles to create and deploy AI coding agents without writing custom code, addressing the challenge of scaling AI-assisted development beyond individual use. The solution centers on a JSON-based workflow creator that allows users to define prompts, target repositories, and parameters, backed by a unified CodingAgent library supporting multiple LLM providers (Codex and Claude) and orchestrated through Temporal workflows. The platform has enabled rapid creation of agents for routine tasks like feature flag removal, experiment management, and infrastructure changes, with simple agents deployable in under five minutes and custom multi-step workflows buildable in 1-2 days, allowing engineers to focus on core product logic rather than repetitive coding tasks."
link: "https://blog.duolingo.com/agentic-workflows/"
year: 2025
seo:
  title: "Duolingo: No-Code Agentic Workflow Platform for Automated Code Changes - ZenML LLMOps Database"
  description: "Duolingo developed an internal platform enabling employees across all roles to create and deploy AI coding agents without writing custom code, addressing the challenge of scaling AI-assisted development beyond individual use. The solution centers on a JSON-based workflow creator that allows users to define prompts, target repositories, and parameters, backed by a unified CodingAgent library supporting multiple LLM providers (Codex and Claude) and orchestrated through Temporal workflows. The platform has enabled rapid creation of agents for routine tasks like feature flag removal, experiment management, and infrastructure changes, with simple agents deployable in under five minutes and custom multi-step workflows buildable in 1-2 days, allowing engineers to focus on core product logic rather than repetitive coding tasks."
  canonical: "https://www.zenml.io/llmops-database/no-code-agentic-workflow-platform-for-automated-code-changes"
  ogTitle: "Duolingo: No-Code Agentic Workflow Platform for Automated Code Changes - ZenML LLMOps Database"
  ogDescription: "Duolingo developed an internal platform enabling employees across all roles to create and deploy AI coding agents without writing custom code, addressing the challenge of scaling AI-assisted development beyond individual use. The solution centers on a JSON-based workflow creator that allows users to define prompts, target repositories, and parameters, backed by a unified CodingAgent library supporting multiple LLM providers (Codex and Claude) and orchestrated through Temporal workflows. The platform has enabled rapid creation of agents for routine tasks like feature flag removal, experiment management, and infrastructure changes, with simple agents deployable in under five minutes and custom multi-step workflows buildable in 1-2 days, allowing engineers to focus on core product logic rather than repetitive coding tasks."
---

## Overview

Duolingo has built an internal LLMOps platform that democratizes the creation and deployment of AI coding agents across their organization. The case study, published in December 2025, describes how the company moved beyond individual developer productivity gains from tools like Cursor to create a scalable, production system where any employee—engineers, product managers, or researchers—can build and share agentic workflows without writing custom code. While the blog post presents an optimistic view of their implementation, it offers valuable insights into practical patterns for operationalizing LLM-based code generation at scale.

The core problem Duolingo addressed was transforming individual productivity gains from AI coding assistants into organizational-level automation. Individual developers ("Duos" in company parlance) could use tools like Cursor to accelerate their work, but there was no mechanism to capture those prompts and patterns as reusable, team-wide automation. This represents a common challenge in LLMOps: bridging the gap between experimental, one-off LLM usage and production-grade, shareable systems.

## Architecture and Infrastructure

The platform's architecture centers on three main components: a workflow definition system, a unified agent abstraction layer, and an orchestration framework. The workflow definition system allows users to specify agents through simple JSON forms that capture a prompt, a target code repository, and optional parameters. This approach significantly lowers the barrier to entry compared to requiring full Python or custom code, though it does constrain the complexity of what can be expressed declaratively.

The CodingAgent library serves as a crucial abstraction layer that unifies different LLM providers behind a single interface. The library currently supports both Codex CLI and Claude Code SDK, with switching between providers as simple as changing an enum parameter. This design demonstrates good LLMOps practice by decoupling workflow logic from specific model implementations, allowing for experimentation and provider switching without rewriting agent code. The code examples show a clean async interface where prompts and working directories are the primary inputs. However, the case study doesn't address important production concerns like how they handle provider-specific rate limits, cost differences, or quality variations between the models.

Temporal serves as the workflow orchestration backbone, providing durability and retry logic for long-running agentic tasks. This is a particularly interesting architectural choice for LLM workflows, as Temporal's durability guarantees help manage the inherent non-determinism of LLM calls. The case study mentions that multi-step workflows break down complex tasks into retryable activities with individual timeouts and retry policies, preventing the entire process from restarting if a single LLM call fails or produces unexpected results. This addresses one of the fundamental challenges in production LLM systems: managing failures gracefully while maintaining process state.

## Deployment Patterns

Duolingo has identified and codified a common pattern for simple code changes that covers a significant number of use cases: clone the repository, let the AI agent make a code change, then commit the code and optionally open a pull request. This pattern-based thinking represents mature LLMOps practice—rather than treating each agent as completely unique, they've identified reusable workflows that can be parameterized. The JSON-based workflow creator specifically targets this pattern, enabling five-minute agent creation for scenarios that fit the template.

For more complex scenarios requiring multiple agentic passes, runtime task determination, or additional tooling, the platform supports custom workflows written in Python against the Temporal framework. The case study claims these custom workflows can be created in 1-2 days by bootstrapping from existing templates, suggesting a well-developed internal library and patterns. This two-tier approach—simple declarative workflows for common cases, programmatic workflows for complex cases—is pragmatic, though the line between what fits in each tier may not always be clear to users.

The deployment process involves merging JSON workflow definitions into a repository, after which they automatically appear in a list of internal tools accessible to any employee. Slack notifications provide status updates, adding observability and user experience polish. The use of a shared GitHub App token ensures all automated pull requests come from a bot account with centrally controlled permissions, addressing both security and auditability concerns.

## Use Cases and Applications

The case study mentions several deployed agents handling routine engineering tasks: removing deprecated feature flags, launching and shutting down experiments, and modifying Terraform infrastructure with automated PR creation. These represent sensible initial use cases—highly structured, repetitive tasks with clear success criteria where automation can free engineers for higher-value work. However, the blog post doesn't provide detailed success metrics, error rates, or the percentage of automated PRs that require human revision, making it difficult to assess the actual production reliability of these agents.

The claim that agents enable engineers to "focus on product thinking and core logic" by taking "routine tasks off their plates" is typical marketing language, but the underlying value proposition is credible if the automation is reliable. The real test of these systems is whether the time saved exceeds the time spent creating, maintaining, and fixing agents when they make mistakes. The case study doesn't provide quantitative data on this trade-off.

## Prompt Engineering and Testing

The platform places significant emphasis on prompt quality, with Duolingo employees testing prompts in tools like Codex or Claude until they achieve consistent success across various situations before deploying them as workflows. This testing phase is critical for LLMOps, as prompt quality directly determines agent reliability. However, the case study doesn't describe their testing methodology in detail—what constitutes "a variety of situations," how they generate test cases, whether they use any automated evaluation frameworks, or how they handle edge cases.

The ability to stage workflows for end-to-end testing before deployment suggests a development/production separation, which is good practice. The statement that "faster iteration means we can test more ideas to improve learning efficacy for our learners" makes a somewhat tenuous connection between internal tooling velocity and educational outcomes, but the underlying point about rapid iteration being valuable is sound.

## Shared Infrastructure and Reusability

Duolingo has built shared utility libraries for common operations like cloning repositories and opening pull requests, which all agents use to avoid repeated code and maintain consistency. This approach to building reusable components represents mature internal platform development. The GitHub library's use of a shared bot account token for PR creation centralizes permission management, which is both a security benefit (one place to audit and control permissions) and a potential single point of failure.

The CodingAgent library's API key management through environment variables is straightforward but doesn't address more sophisticated needs like key rotation, usage tracking per agent, or cost allocation across teams. For a production LLMOps system at scale, these become important operational concerns.

## Future Roadmap and Limitations

The case study acknowledges several areas of ongoing work, with notable honesty about current limitations. A "large set of features" is blocked by issues running Docker-in-Docker on Temporal, expected to be resolved within a month of publication. This admission is valuable—it reveals that even in a functioning production system, there are architectural constraints limiting what can be built.

Model Context Protocol (MCP) integration is mentioned as an upcoming feature that would grant agents additional capabilities. The prototype agents with GitHub MCP access can reference other codebases while making changes, which could significantly improve code change quality by providing relevant context. Plans for Atlassian MCP integration would extend agentic capabilities beyond code to other business systems. This represents a natural evolution for agentic systems—moving from isolated code generation to context-aware automation that can gather information from multiple sources.

The plan to expand the JSON workflow format to accommodate more patterns (like multi-step workflows) shows awareness that the current simple declarative format has limitations. However, there's an inherent tension between keeping workflows simple enough for non-engineers to create and powerful enough to handle complex scenarios. Finding the right abstractions for this middle ground is challenging.

## Critical Considerations

While the case study presents an impressive internal platform, several important LLMOps concerns are not addressed. There's no discussion of cost management—LLM API calls can become expensive at scale, especially for code generation tasks that may require multiple iterations. Without cost tracking, budgeting, and potentially rate limiting per user or team, expenses could grow unpredictably.

The case study doesn't discuss quality assurance beyond initial prompt testing. How do they handle agents that make subtle bugs or security issues in generated code? Are there automated checks, code review requirements, or rollback mechanisms? What percentage of automated PRs are merged without human modification? These metrics would provide crucial insight into actual production reliability.

Model versioning and consistency aren't addressed. When Codex or Claude releases new versions, how does Duolingo manage the transition? Do existing workflows automatically use new versions, or is there a manual update process? Model updates can change behavior, potentially breaking existing agents.

Security and access control receive minimal attention. While the shared GitHub bot token centralizes permissions, the case study doesn't discuss how they prevent agents from making unauthorized changes, accessing sensitive code, or exfiltrating information. With the platform open to all employees, including non-engineers, guardrails around what agents can do become important.

The observability story is limited to Slack notifications. More sophisticated LLMOps systems typically include detailed logging of prompts and responses, performance metrics, cost tracking, and error analysis. These capabilities are essential for debugging, optimization, and understanding system behavior at scale.

## Broader LLMOps Lessons

Despite these gaps, the case study illustrates several valuable LLMOps principles. The abstraction layer separating workflow logic from specific LLM providers enables experimentation and reduces vendor lock-in. The pattern-based approach to workflows allows them to codify best practices while still supporting custom implementations. The low-code/no-code interface democratizes agent creation, potentially surfacing valuable automation opportunities from domain experts who aren't software engineers.

The choice of Temporal for orchestration is particularly interesting for the LLMOps community. Temporal's durability guarantees and state management capabilities address real challenges in production LLM systems, where long-running, stateful processes must remain reliable despite the inherent non-determinism of model outputs. This represents a more sophisticated approach than simple script-based automation.

The honest acknowledgment that "agentic workflows are still in their early days" and that "both the capabilities of agentic workflows and the best ways to support them with infrastructure remain very much open questions" provides important context. This is an early-stage implementation addressing specific use cases, not a fully mature platform solving all LLMOps challenges.

## Conclusion

Duolingo's agentic workflow platform represents a practical approach to operationalizing LLM-based code generation at organizational scale. By providing both simple JSON-based workflows for common patterns and programmatic workflows for complex scenarios, they've created a system accessible to various skill levels while remaining extensible for sophisticated use cases. The unified agent abstraction and Temporal-based orchestration address real production concerns around provider flexibility and workflow reliability.

However, the case study should be read as an optimistic view of an evolving system rather than a complete LLMOps solution. Important operational concerns around cost management, quality assurance, security, and observability are not addressed in detail. The true production reliability and ROI of the system remain unclear without quantitative metrics on agent success rates, time savings, and maintenance overhead.

For organizations considering similar approaches, Duolingo's experience suggests that codifying common patterns, abstracting provider-specific details, and investing in orchestration infrastructure are valuable steps toward production LLM systems. However, teams should also plan for comprehensive cost tracking, quality monitoring, security controls, and observability from the start, even if these aren't highlighted in this particular case study.