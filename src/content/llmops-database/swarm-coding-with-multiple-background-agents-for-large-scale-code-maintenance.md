---
title: "Swarm-Coding with Multiple Background Agents for Large-Scale Code Maintenance"
slug: "swarm-coding-with-multiple-background-agents-for-large-scale-code-maintenance"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694adc5c042ce598d81c5e37"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:48.247Z"
  createdOn: "2025-12-23T18:15:56.528Z"
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "mcp"
  - "system-prompts"
  - "cicd"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "orchestration"
  - "continuous-integration"
  - "continuous-deployment"
  - "devops"
  - "open-source"
  - "documentation"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "microsoft-azure"
  - "google-gcp"
industryTags: "e-commerce"
company: "Faire"
summary: "Faire implemented \"swarm-coding\" using GitHub Copilot's background agents to automate tedious engineering tasks like cleaning up expired feature flags and migrating test infrastructure. By coordinating multiple autonomous AI agents working in parallel, they enabled non-engineers to land simple code changes and freed up engineering teams to focus on innovation rather than maintenance work. Within the first month of deployment, 18% of the engineering team adopted the approach, merging over 500 Copilot pull requests with an average time savings of 39.6 minutes per PR and a 25% increase in overall PR volume among users. The company enhanced the background agents through custom instructions, MCP (Model Context Protocol) servers, and programmatic task assignment to create specialized agent profiles for common workflows."
link: "https://craft.faire.com/swarm-coding-agentic-development-with-multiple-background-agents-3549adc7460d"
year: 2025
seo:
  title: "Faire: Swarm-Coding with Multiple Background Agents for Large-Scale Code Maintenance - ZenML LLMOps Database"
  description: "Faire implemented \"swarm-coding\" using GitHub Copilot's background agents to automate tedious engineering tasks like cleaning up expired feature flags and migrating test infrastructure. By coordinating multiple autonomous AI agents working in parallel, they enabled non-engineers to land simple code changes and freed up engineering teams to focus on innovation rather than maintenance work. Within the first month of deployment, 18% of the engineering team adopted the approach, merging over 500 Copilot pull requests with an average time savings of 39.6 minutes per PR and a 25% increase in overall PR volume among users. The company enhanced the background agents through custom instructions, MCP (Model Context Protocol) servers, and programmatic task assignment to create specialized agent profiles for common workflows."
  canonical: "https://www.zenml.io/llmops-database/swarm-coding-with-multiple-background-agents-for-large-scale-code-maintenance"
  ogTitle: "Faire: Swarm-Coding with Multiple Background Agents for Large-Scale Code Maintenance - ZenML LLMOps Database"
  ogDescription: "Faire implemented \"swarm-coding\" using GitHub Copilot's background agents to automate tedious engineering tasks like cleaning up expired feature flags and migrating test infrastructure. By coordinating multiple autonomous AI agents working in parallel, they enabled non-engineers to land simple code changes and freed up engineering teams to focus on innovation rather than maintenance work. Within the first month of deployment, 18% of the engineering team adopted the approach, merging over 500 Copilot pull requests with an average time savings of 39.6 minutes per PR and a 25% increase in overall PR volume among users. The company enhanced the background agents through custom instructions, MCP (Model Context Protocol) servers, and programmatic task assignment to create specialized agent profiles for common workflows."
---

## Overview and Context

Faire, an e-commerce platform connecting retailers with wholesale brands, has pioneered an approach they call "swarm-coding" to address the persistent challenge of technical debt and maintenance work that consumes engineering time. The company faced a common problem in production engineering environments: engineers were spending countless hours on essential but tedious tasks such as cleaning up expired feature flags, migrating test infrastructure, and performing large-scale refactoring. These tasks are critical for codebase health but detract from innovation and feature development.

The solution leverages autonomous background agents, specifically GitHub Copilot's background agent capability, to create code changes without direct human supervision. By coordinating multiple AI agents working in parallel on decomposed tasks, Faire has effectively scaled their engineering capacity for maintenance work. The term "swarm-coding" draws from the software development concept of swarming, where multiple team members work together on a single task rather than independently on separate tasks, except here the "team members" are autonomous AI agents rather than humans.

## Production Deployment and Infrastructure

Faire's implementation of background agents in production represents a sophisticated LLMOps architecture that extends beyond simple code completion tools. The system is built around several key components that work together to enable autonomous code generation at scale.

At the core is GitHub Copilot's background agent, which operates as an autonomous workflow triggered by assignment to GitHub issues. When assigned, a specialized GitHub Action runs in the background, creating a placeholder pull request that incrementally updates with a TODO list and progress indicators. The agent iterates on the code until it considers the changes ready, at which point it requests review from the human assignee.

The infrastructure includes custom setup steps defined in `.github/workflows/copilot-setup-steps.yml` that prepare the environment for agent execution. This includes running their shared node setup script with yarn install, authenticated access to their private NPM registry for installing dependencies, and configuration of the build environment. This setup is crucial for allowing the agent to not just generate code, but actually verify that code compiles and tests pass before requesting human review.

Faire enhanced the base GitHub Copilot functionality by integrating Model Context Protocol (MCP) servers, which extend the capabilities available to the agents. They implemented both local and remote MCP servers, including a local ts-morph server for programmatic code transformations like moving files, and remote SSE (Server-Sent Events) servers for Jira, Notion, Slack, and Buildkite integration. This provides agents with access to organizational context beyond just the code repository.

## Agent Orchestration and Multi-Agent Architecture

The swarm-coding approach relies on a hierarchical multi-agent system where higher-level agents can delegate work to specialized agents as tools. Faire developed custom assistants that coordinate multiple agent types to accomplish complex workflows. For their expired settings cleanup use case, they created three specialized tools that work together: an ExpiredSettingFinderAgent that identifies expired settings and manages task allocation, a SettingCleanupReadinessAgent that determines the cleanup stage and generates next-step instructions, and GitHub Copilot itself as the execution layer.

This architecture allows for effective parallelization. Rather than having a single agent work through tasks sequentially, the orchestrating agent can fire off multiple asynchronous workers simultaneously. The human developer focuses on the strategic work while the AI swarm handles the tactical execution in parallel. This represents a significant shift in how production engineering work is organized.

The delegation mechanism is implemented through programmatic API calls to GitHub. They created a function tool that allows LLMs to generate GitHub issues and assign them to Copilot through GitHub's API. This tool is exposed via their MCP server infrastructure, making it accessible to other agents and contexts like Slack, Jira, or Cursor. The function takes parameters for repository name, issue title, and a detailed description that serves as the complete instruction set for the background agent.

## Prompt Engineering and Customization

Faire invested significantly in prompt engineering to make the background agents effective for their specific codebase and workflows. They use several layers of customization to guide agent behavior.

Custom instructions are provided through `.github/copilot-instructions.md` files that specify codebase-specific conventions. These instructions cover details like using Yarn instead of npm for dependency management, their use of Jira for work tracking, and their monorepo management with Nx. While these seem like simple details, they prevent the agent from generating code that follows incorrect conventions and patterns.

For specific workflows, Faire developed prompt templates with explicit, generalized instructions that include variables for the specifics of each task. These templates guide the agent to the relevant files and code rather than forcing it to search the entire codebase. The iOS team's Mockolo migration provides an example where the template includes detailed step-by-step instructions for finding protocol usages, converting annotations, and handling specific edge cases like Publisher properties.

An interesting aspect of their prompt engineering approach is the use of meta-prompting for iteration. When an agent produces undesired output, they ask an LLM to analyze the prompt and suggest improvements to prevent the same issue in future executions. This creates a feedback loop for prompt quality improvement over time. For instance, when Copilot incorrectly used jest.mock instead of their preferred mockApi utility, they used meta-prompting to revise the instructions to be more explicit about this requirement.

For complex workflows like the settings cleanup, they provide decision-tree logic in the prompt. The agent is instructed to fetch information using specific tools, then determine the state (CONFIGURATION_ACTIVE, STILL_REFERENCED, or READY_FOR_REMOVAL) based on the data, and finally execute the appropriate next steps for that state. This shows how procedural logic can be encoded in natural language instructions for agent execution.

## State Management and Coordination

A critical challenge in swarm-coding is preventing duplicate work and tracking progress across multiple concurrent agents. Faire addresses this through integration with their existing engineering tools, particularly Jira for ticket management. They provide agents with MCP tools for checking whether work is already underway by searching Slack threads, querying Jira for existing issues under specific epics, and finding open pull requests in GitHub.

The state management approach relies on consistency in how agents report progress and consume progress state. By using the same ticketing system that engineers use, the agents can participate in the same workflow visibility mechanisms. They also implemented regular jobs that check on in-flight work using the same agent infrastructure, identifying pull requests that are failing CI, stuck waiting for review, or haven't been updated recently, and pinging owners to drive progress.

For the settings cleanup workflow specifically, they use Slack channels to track tasks and throttle execution. The Fairey Slackbot (their custom assistant) can schedule messages to control the pace of task assignment while also supporting ad-hoc requests from users who want specific settings cleaned up immediately.

## Pull Request Automation and Quality Control

Faire enhanced the pull request workflow around Copilot-generated code with several automation layers to improve quality and developer experience. These customizations address the reality that autonomously generated code requires different handling than human-authored code.

They implemented a requirement for two human reviews on Copilot-authored PRs: the initial assignee's review plus another human reviewer. This ensures adequate oversight of autonomously generated changes before they reach production. However, they also added logic to not request review from code owners until the PR has at least one approval, avoiding prematurely pulling in domain experts when the code may still need significant work.

The automation includes notification systems that alert the assignee when builds fail on the PR, preventing PRs from sitting in a broken state unnoticed. More sophisticatedly, they automatically summarize build failures for Copilot itself, allowing the agent to iterate on fixing the issues without human intervention. This creates a feedback loop where the agent can learn from test failures and compilation errors to refine its output.

When the agent requests review from the assignee, the automation marks the PR as ready for review and, if the issue was created from their Fairey Slackbot, notifies the originating Slack thread of updates. This integration ensures that stakeholders who requested the work remain informed of progress without manually checking GitHub.

## Production Metrics and Impact

Faire measured the impact of their background agent deployment with specific metrics over the first month of availability. The results demonstrate meaningful productivity gains, though it's worth noting these are early-stage metrics from a still-maturing deployment.

They tracked adoption by counting "Copilot users" as anyone assigned to a Copilot-authored pull request that was actually merged into the codebase. Within the first month, 18% of the engineering team fell into this category, having merged at least one Copilot PR. The total volume exceeded 500 merged pull requests, indicating substantial usage.

To measure productivity impact, they compared PR volume for Copilot users during the four weeks before adoption versus the four weeks after. They observed a 25% average increase in PR volume, or 41% when measured by DX's TrueThroughput metric, which accounts for PR complexity and impact. This suggests that engineers are able to handle more work with agent assistance, though the extent to which this represents truly additional work versus reprioritization would benefit from longer-term study.

For time savings estimation, they implemented a simple but pragmatic approach: pinging the assignee on Slack when a PR is merged to ask how much time it saved them, with options ranging from "No time saved" to "A day or more." The self-reported average time saved was 39.6 minutes per PR. While self-reported metrics have obvious limitations and potential for overestimation, this approach provides directional insight into perceived value. The fact that engineers consistently report time savings suggests genuine utility, even if the precise numbers should be interpreted cautiously.

The reported improvement in code quality after implementing their customizations is notable. Initially, most Copilot PRs were "roughly the right idea" but had style violations and failing builds, requiring significant human work to reach the quality bar. After adding custom instructions and setup steps that allow dependency installation and test execution, most PRs requested review in an actually-ready state. This demonstrates how LLMOps investments in infrastructure and configuration can dramatically improve autonomous agent output quality.

## Critical Assessment and Considerations

While Faire's results are impressive, several aspects warrant careful consideration when evaluating this approach. First, the metrics are from a very early deployment stage (just over a month), and the novelty factor may be influencing both adoption rates and reported satisfaction. Longer-term studies will be important to understand whether these gains persist as the technology becomes routine.

The 18% adoption rate, while positive, also means 82% of engineers haven't yet found use cases where background agents provide value, or perhaps face barriers to adoption. Understanding what prevents broader adoption could reveal limitations in the approach or opportunities for improvement.

The self-reported time savings metrics, while useful for gauging perceived value, don't necessarily translate directly to business impact. The key question is whether the time saved is redirected to higher-value work or simply allows engineers to handle more volume of similar work. The increase in PR throughput suggests the latter may be occurring, which is valuable for technical debt reduction but may have different ROI characteristics than enabling entirely new capabilities.

The case study focuses heavily on maintenance tasks like cleanup and migration work, which are admittedly well-suited to autonomous agents. The bounded scope, clear success criteria, and tolerance for some iteration make these workflows ideal early targets. Whether the approach scales to more ambiguous, creative, or architecturally complex tasks remains to be seen. Faire acknowledges this implicitly by focusing their initial deployment on exactly these maintenance workflows.

The substantial infrastructure investment required to make this work effectively is worth emphasizing. Faire built custom MCP servers, developed specialized agents, created prompt templates, implemented state management, and enhanced PR automation. This represents significant LLMOps engineering effort, which smaller organizations might struggle to replicate. The ROI calculation must account for this implementation cost.

From a production LLM deployment perspective, Faire has made thoughtful choices around observability and quality control. The two-review requirement, build failure notifications, and automatic summarization of failures for agent iteration all represent best practices for managing autonomous systems in production. The integration with existing engineering tools (Jira, Slack, GitHub) rather than creating parallel systems shows mature thinking about change management and adoption.

## Technical Architecture Patterns

Several interesting LLMOps patterns emerge from Faire's implementation that have broader applicability. The use of MCP as an abstraction layer for providing tools to agents is particularly notable. By standardizing on MCP, they've created a pluggable architecture where new capabilities can be added by implementing MCP servers rather than modifying agent code. This separation of concerns is good software engineering applied to LLM systems.

The pattern of exposing agents themselves as tools that other agents can call represents hierarchical agent composition. The orchestrating agent operates at a higher level of abstraction, delegating concrete tasks to specialist agents. This is more maintainable and testable than monolithic agent implementations, and allows for reuse of specialist agents across different workflows.

The prompt templating approach with variables represents a middle ground between fully general-purpose agents and hardcoded automation. The templates provide structure and specificity while remaining flexible enough to handle variations within a workflow type. This is more robust than expecting agents to figure out workflow patterns from scratch each time.

The meta-prompting feedback loop for prompt improvement is an interesting example of using LLMs to improve LLM systems. While the case study doesn't provide details on how systematically they apply this or how they track prompt version improvements over time, the basic pattern is sound and could be formalized into a continuous improvement process.

## Production Operations Considerations

Operating autonomous agents in production introduces operational challenges that Faire has begun to address. The throttling of task assignment through scheduled Slack messages shows awareness that unbounded parallel execution could overwhelm systems or humans reviewing the output. This kind of rate limiting is essential for production stability.

The regular jobs checking on in-flight work address a key operational concern with autonomous systems: work that gets started but stalls needs intervention. By having agents monitor other agents' progress and alert humans when things are stuck, they've built a layer of operational resilience. This could be extended further with automatic retry logic or escalation procedures.

The integration of build and test execution into the agent's iteration loop is crucial for quality but introduces dependencies on CI/CD infrastructure. If the build system is slow or unreliable, it will directly impact agent productivity. This creates a potential coupling between agent performance and infrastructure performance that needs monitoring.

Error handling and graceful degradation don't receive much attention in the case study, but are critical for production systems. What happens when an agent gets stuck in an iteration loop? How do they detect and recover from agents making incorrect changes that pass tests but violate higher-level requirements? These aspects of production operations will become increasingly important as the system scales.

## Broader Implications for LLMOps

Faire's implementation demonstrates that autonomous agents can deliver measurable value for specific production workflows when appropriately supported with infrastructure, customization, and quality controls. The swarm-coding approach of coordinating multiple agents working in parallel addresses real constraints in engineering capacity for maintenance work.

However, the case study also illustrates that extracting value from autonomous agents requires significant LLMOps investment. The custom instructions, MCP servers, prompt templates, state management, and PR automation represent substantial engineering effort. Organizations considering similar deployments should account for this implementation cost and focus on workflows where the ROI justifies the investment.

The evolution Faire describes, from agents producing "roughly right" code with violations and failures to producing review-ready code, demonstrates that agent output quality is highly dependent on configuration and infrastructure. The ability to install dependencies, run tests, and iterate on failures transforms agent effectiveness. This suggests that LLMOps tooling and infrastructure may be as important as the underlying LLM capabilities for production deployments.

The hierarchical agent architecture with specialist agents as tools points toward a future where organizations build libraries of specialized agents for their domain and workflows, orchestrated by higher-level agents. This is conceptually similar to how function calling and tool use have evolved in LLM systems, but applied at a coarser grain of entire autonomous workflows rather than individual function calls.

Finally, the integration with existing engineering tools and workflows rather than creating parallel systems represents a pragmatic approach to adoption. By making agents participate in the same Jira, GitHub, and Slack workflows that humans use, Faire minimizes disruption and leverages existing processes for visibility, accountability, and coordination. This integration strategy is likely crucial for achieving the reported adoption rates and should be considered carefully in any production LLMOps deployment.