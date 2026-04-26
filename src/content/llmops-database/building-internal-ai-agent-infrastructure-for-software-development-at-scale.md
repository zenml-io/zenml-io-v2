---
title: "Building Internal AI Agent Infrastructure for Software Development at Scale"
slug: "building-internal-ai-agent-infrastructure-for-software-development-at-scale"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "cost-optimization"
  - "mcp"
  - "token-optimization"
  - "crewai"
  - "langchain"
  - "orchestration"
  - "cicd"
  - "monitoring"
  - "microservices"
  - "api-gateway"
  - "documentation"
  - "open-source"
  - "fastapi"
  - "anthropic"
  - "microsoft-azure"
  - "hugging-face"
industryTags: "tech"
company: "Uber"
summary: "Uber developed a comprehensive internal AI infrastructure to enable software engineers to leverage AI agents for development tasks, addressing challenges in agent deployment, cost management, and workflow transformation. The company built several internal tools including Minion (background agent platform), MCP Gateway (unified interface for AI agents), Uber Agent Builder (no-code agent creation), AIFX CLI (command-line tooling), and specialized agents like uReview (code review), Autocover (test generation), and Shepherd (migration management). The results demonstrate significant adoption with 84% of developers using agentic coding tools, 65-72% of code being AI-generated in IDEs, and 11% of pull requests opened by agents, though this came with challenges including 6x increase in AI-related costs since 2024 and slower-than-expected adoption requiring cultural change rather than top-down mandates."
link: "https://newsletter.pragmaticengineer.com/p/how-uber-uses-ai-for-development"
year: 2026
seo:
  title: "Uber: Building Internal AI Agent Infrastructure for Software Development at Scale - ZenML LLMOps Database"
  description: "Uber developed a comprehensive internal AI infrastructure to enable software engineers to leverage AI agents for development tasks, addressing challenges in agent deployment, cost management, and workflow transformation. The company built several internal tools including Minion (background agent platform), MCP Gateway (unified interface for AI agents), Uber Agent Builder (no-code agent creation), AIFX CLI (command-line tooling), and specialized agents like uReview (code review), Autocover (test generation), and Shepherd (migration management). The results demonstrate significant adoption with 84% of developers using agentic coding tools, 65-72% of code being AI-generated in IDEs, and 11% of pull requests opened by agents, though this came with challenges including 6x increase in AI-related costs since 2024 and slower-than-expected adoption requiring cultural change rather than top-down mandates."
  canonical: "https://www.zenml.io/llmops-database/building-internal-ai-agent-infrastructure-for-software-development-at-scale"
  ogTitle: "Uber: Building Internal AI Agent Infrastructure for Software Development at Scale - ZenML LLMOps Database"
  ogDescription: "Uber developed a comprehensive internal AI infrastructure to enable software engineers to leverage AI agents for development tasks, addressing challenges in agent deployment, cost management, and workflow transformation. The company built several internal tools including Minion (background agent platform), MCP Gateway (unified interface for AI agents), Uber Agent Builder (no-code agent creation), AIFX CLI (command-line tooling), and specialized agents like uReview (code review), Autocover (test generation), and Shepherd (migration management). The results demonstrate significant adoption with 84% of developers using agentic coding tools, 65-72% of code being AI-generated in IDEs, and 11% of pull requests opened by agents, though this came with challenges including 6x increase in AI-related costs since 2024 and slower-than-expected adoption requiring cultural change rather than top-down mandates."
notion:
  pageId: "34ef8dff-2538-818e-baa6-e018f11ef8d3"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:51:00.000Z"
  lastEditedTime: "2026-04-26T09:51:00.000Z"
  publishedAt: "2026-04-26T10:05:34Z"
---

## Overview

Uber's case study represents one of the most comprehensive examples of deploying AI agents at scale within a large engineering organization, demonstrating both the substantial investments required and the challenges that come with transforming developer workflows. As of March 2026, Uber employs nearly 3,000 people in the tech function and has made a strategic commitment to become a "GenAI-powered" company, with AI explicitly included in the company's official strategy. The effort is led by the Developer Platform and Developer Experience teams, who have built an extensive stack of internal tooling to enable AI adoption across the engineering organization.

The initiative focuses on two primary goals: eliminating toil by having AI handle "boring" work like upgrades, migrations, and trivial bug fixes, and freeing up engineers to focus on more creative work. This represents a pragmatic approach that doesn't aim to automate everything, but rather to strategically apply AI where it can deliver the most value. The case study is particularly valuable because Uber's engineering leaders were candid about both successes and challenges, including slower-than-expected adoption rates and significant cost increases.

## Technical Architecture and Platform Design

Uber's agentic system is built across four distinct layers, creating a comprehensive stack for AI-powered development. At the foundation is an internal AI platform built on top of Michelangelo, Uber's existing ML/AI platform. This layer provides crucial infrastructure including a model gateway that can proxy requests to either frontier models (from external providers) or internally hosted models, giving the organization flexibility in model selection and deployment.

The second layer focuses on internal Uber context, which serves as the "memory" for agents. This includes access to Uber's source code, engineering documentation, Slack information, JIRA tickets, and other internal data sources. The ability to provide rich, company-specific context to AI agents is critical for their effectiveness, as generic models without this context would be far less useful for solving Uber-specific problems.

The third layer consists of industry agents, where Uber's philosophy is to enable the "latest and greatest" AI agents for engineers. They support multiple tools including Claude Code, GitHub Copilot, Cursor, Codex, and other clients. This multi-tool approach recognizes that different developers have different preferences and that the AI agent landscape is rapidly evolving, so maintaining flexibility is important.

The fourth layer comprises specialized agents built specifically for Uber's needs, including Minion (the background agent platform), test generation platforms like Autocover, code review agents such as uReview, and migration management tools like Shepherd. These specialized agents address specific pain points in Uber's development workflow.

A fifth cross-cutting layer focuses on engineering enablement, including measuring the efficiency of agents, controlling costs, and educating engineers about which tools to use. This layer has become increasingly important as adoption has scaled and costs have grown.

## MCP Gateway and Protocol Integration

Uber made a strategic decision to adopt the Model Context Protocol (MCP), which has emerged as a standard for connecting agents and data sources. The company assembled a "tiger team" to quickly design the MCP strategy and build a central MCP gateway. This gateway serves as a critical piece of infrastructure that provides several key capabilities.

The MCP gateway allows Uber to proxy internal endpoints to MCP servers, meaning that any internal Thrift, Protobuffer, or HTTP endpoint can be exposed as an MCP server with a simple configuration change. This is particularly important given Uber's extensive use of Apache Thrift and Protobuffer protocols for backend service communications. The gateway also exposes first-party MCPs as a single consistent interface and handles third-party MCPs from external providers, managing all authentication and authorization tasks centrally.

By centralizing platform concerns like authorization, telemetry, and logging in one place, the MCP gateway reduces the complexity for individual teams building agents. It provides a unified interface to interact with any MCP server, making integration substantially easier. The gateway also includes a registry for looking up MCP servers and allowing developers to register their own, plus a sandbox environment where developers can experiment with MCP servers without lengthy setup processes.

This centralized approach to MCP integration represents a significant LLMOps best practice, as it prevents the proliferation of inconsistent point-to-point integrations and ensures that security, observability, and governance are handled uniformly across all agent interactions with internal systems.

## Uber Agent Builder and Agent Studio

Uber Agent Builder is a no-code solution designed to democratize agent creation within the organization. The platform allows developers and other team members to build agents that can access Uber's internal data sources, including both MCP servers and Uber data sets, and hand off work to other agents. This capability for agent-to-agent handoff enables more sophisticated multi-agent workflows where different specialized agents can collaborate on complex tasks.

The platform includes Agent Studio, a visual development environment where multi-agent workflows can be designed, debugged, traced, versioned, and evaluated. This addresses one of the key challenges in LLMOps: understanding what agents are doing and why, particularly in multi-agent scenarios where debugging can become extremely complex. The ability to visualize workflows, trace execution paths, and version agent configurations provides the observability and reproducibility necessary for production use.

Agents built in Agent Builder become discoverable through a registry, which serves as an internal marketplace of sorts where teams can find existing agents, use them directly, or copy and modify them for their own needs. This registry approach helps prevent duplication of effort and encourages reuse of proven agent patterns across the organization.

## AIFX CLI: Solving Distribution and Configuration Challenges

The AIFX CLI (AI Tooling Command Line Interface) was built to solve several practical deployment challenges that emerged as Uber tried to roll out AI agent tooling at scale. The Developer Experience platform team identified key pain points: how to ensure all developers use the latest version of rapidly evolving tools like Cursor, how to configure clients with helpful defaults that the platform team has identified, how to make MCP servers easily discoverable and configurable, and how to connect agents to Uber's background task infrastructure.

The AIFX CLI serves as a unified interface that all Uber engineers use for AI tooling. It supports provisioning AI agents and client tools like Claude Code, Codex, and Cursor; finding and using MCP servers; running background agent tasks; and updating AI agents and clients to the latest versions automatically. This approach to tooling distribution represents a significant operational advantage, as it allows the platform team to manage complexity centrally rather than having thousands of engineers each configure tools individually.

The CLI-based approach also enables the platform team to set organizational defaults, implement guardrails, and collect telemetry in a consistent way across all AI tool usage. This centralized approach is critical for managing costs, ensuring security, and maintaining visibility into how AI tools are being used across the organization.

## Workflow Transformation and Multi-Agent Orchestration

The case study provides valuable insights into how developer workflows have evolved with AI adoption. The traditional pre-AI workflow involved some planning time, most time spent writing code in an IDE, and then some time in code review. Early agentic workflows were single-threaded, with developers working with one agent at a time in the command line or IDE, giving commands, approving plans, and making corrections.

However, the latest workflows at Uber have evolved into parallel multi-agent orchestration, where developers kick off multiple agents simultaneously, each working on different tasks. As Ty Smith explained, this behavior emerges naturally: when an engineer gives a prompt and waits for an agent to complete its work, rather than staying idle, they tend to kick off another background agent. This pattern of spawning multiple concurrent agents has become increasingly common and represents a fundamental shift in how developers work.

This workflow transformation has significant implications for platform design. Supporting multiple parallel agents requires robust background execution infrastructure, careful resource management to prevent overload, cost control mechanisms to prevent runaway spending, and observability tools to track what multiple agents are doing simultaneously. The shift from single-threaded to parallel multi-agent workflows also changes how developers think about their work, moving from hands-on coding to orchestrating and supervising multiple AI workers.

## Minion: Background Agent Platform

Minion is Uber's internal platform for running background agents at scale, built to support the emerging pattern of developers kicking off multiple parallel agent tasks. While the full technical details aren't provided in the source material, the platform is described as providing monorepo access (allowing agents to work across Uber's entire codebase) and optimized defaults. The characterization as a "clever abstraction layer that works well in practice" suggests it handles complexities like resource scheduling, execution environment provisioning, access control, and result handling in a way that's transparent to developers.

Background agent execution is critical for many common development tasks like large-scale refactoring, migration work, test generation, and automated code reviews that might take minutes or hours to complete. By providing a dedicated platform for these workloads, Uber can optimize resource usage, implement appropriate timeout and retry policies, and ensure that long-running agent tasks don't interfere with interactive development workflows.

## Specialized Internal AI Agents

Beyond general-purpose coding agents, Uber built several specialized agents to address specific development workflow challenges:

**Code Inbox** was created to handle smart pull request routing. As more code is generated by AI, the volume of pull requests increases, creating noise and routing challenges. Code Inbox intelligently routes PRs to the right reviewers based on expertise, availability, and other factors.

**uReview** is an AI-powered code review agent designed to generate high-signal comments on pull requests. The emphasis on "high-signal" is important, as early AI code review tools often generated too many low-value or obvious comments, creating review fatigue. uReview appears to be tuned to provide genuinely useful feedback rather than simply flagging every potential issue.

**Autocover** is a test generation platform that produces over 5,000 unit tests per month. Automated test generation is one of the most practical applications of AI in software development, as writing comprehensive unit tests is often tedious but critical for code quality. The scale of 5,000+ tests per month suggests this has become a significant part of Uber's testing workflow, though questions remain about the quality and maintainability of AI-generated tests.

**Shepherd** manages large-scale migrations end to end. Migrations and upgrades are classic "toil" tasks that consume significant engineering time but don't directly create value for users. Having an AI agent that can handle these tasks represents substantial productivity gains, though the complexity of large-scale migrations means human oversight likely remains essential.

## Adoption Metrics and Impact

The updated numbers from March 2026 provide concrete evidence of AI adoption at Uber. 84% of developers are "agentic coding users," meaning they use either CLI-based agents or make more agentic requests than simple tab-completion in their IDE. This high adoption rate is noteworthy, though it's worth noting that "agentic user" is defined fairly broadly.

Between 65-72% of code is AI-generated inside IDE-based tools, which represents a dramatic shift in code authorship. This doesn't necessarily mean developers are writing only 28-35% of the code themselves, as they're likely iterating with AI, reviewing and modifying generated code, and using AI for different portions of different tasks. The figure is naturally 100% for AI command-line tools like Claude Code, though these represent only a portion of overall development work.

11% of pull requests are opened by agents, indicating that fully automated workflows from task to PR submission are becoming increasingly common. This represents a significant shift toward more autonomous agent behavior beyond just code completion.

Claude Code usage nearly doubled in three months, from 32% in December 2025 to 63% in February 2026, while IDE-based tools like Cursor and IntelliJ have plateaued. This suggests a potential shift in developer preference toward command-line agents that can operate more autonomously, though it could also reflect Uber's internal investment in making CLI-based agents more effective through tools like the AIFX CLI.

92% of developers use agents monthly, showing broad adoption across the organization, though the difference between this and the 84% "agentic coding users" metric suggests some developers may be using agents occasionally or for specific tasks rather than as a core part of their workflow.

## Challenges and Cost Considerations

The case study is particularly valuable because Uber was candid about challenges. AI-related costs increased 6x since 2024, which represents a substantial expense that requires justification through productivity gains. Token cost optimization has become a growing priority, suggesting that uncontrolled agent usage can lead to unsustainable spending.

Adoption was slower than expected, even at a forward-thinking company like Uber with strong engineering culture. The leadership noted that top-down mandates were less efficient than engineers sharing their wins with peers, highlighting the importance of cultural factors and peer influence in technology adoption. This suggests that simply providing tools isn't sufficient; organizations need to invest in enablement, education, and creating opportunities for successful early adopters to share their experiences.

The dramatic increase in costs coupled with relatively high adoption rates suggests a classic LLMOps challenge: as usage scales, costs can grow super-linearly if not carefully managed. The emphasis on token cost optimization indicates Uber is working on techniques like prompt engineering for efficiency, model selection based on task complexity (using cheaper models for simpler tasks), caching and reuse of common outputs, and limiting context size to what's truly necessary.

The slower-than-expected adoption despite significant platform investment also highlights that technology enablement alone isn't sufficient. Changing how developers work requires cultural change, education, time for experimentation and learning, clear communication about when and how to use different tools, and visible success stories from peers. The insight that peer sharing is more effective than top-down mandates is particularly important for other organizations planning AI rollouts.

## LLMOps Maturity and Platform Engineering

Uber's approach demonstrates a high level of LLMOps maturity. They've invested heavily in platform engineering to make AI agents easy to use, secure, and cost-effective at scale. The centralized MCP gateway, AIFX CLI, Agent Builder, and specialized agents all represent significant engineering investment in making AI productive rather than just possible.

The focus on observability through tools like Agent Studio, the emphasis on registry and discovery mechanisms for both MCPs and agents, the centralized approach to authentication and authorization, and the attention to cost optimization all represent LLMOps best practices. These investments are necessary at scale but represent overhead that smaller organizations might not be able to justify.

The case study also highlights the importance of flexibility in a rapidly evolving landscape. By supporting multiple AI coding tools rather than standardizing on one, Uber maintains optionality as the market evolves. The MCP gateway abstraction allows them to swap out backend implementations without disrupting user workflows. The no-code Agent Builder democratizes agent creation while maintaining governance through centralized infrastructure.

However, the complexity of this stack is also notable. Developers need to learn multiple tools and concepts: the AIFX CLI, various AI coding assistants, MCP servers, Agent Builder for creating custom agents, and specialized agents like uReview and Autocover. This cognitive overhead is likely one factor in slower-than-expected adoption.

## Critical Assessment

While the case study presents impressive adoption metrics and sophisticated infrastructure, several questions remain. The 65-72% AI-generated code metric doesn't tell us about code quality, maintainability, or whether this code requires more review or debugging time. The 11% of PRs opened by agents is notable, but we don't know what percentage of these PRs are accepted without modification, how they compare in quality to human-authored PRs, or how much review effort they require.

The 6x increase in costs since 2024 is substantial and raises questions about ROI. While the text claims higher engineer satisfaction and ability to push product features in new ways, concrete productivity metrics are notably absent. We don't see data on whether development velocity has increased, whether time-to-market has improved, or whether product quality metrics have changed.

The emphasis on eliminating "boring" work like migrations and upgrades is compelling, but these tasks often require significant domain knowledge and judgment. The extent to which agents can truly handle these tasks end-to-end versus requiring substantial human oversight isn't clear.

The shift to multi-agent parallel workflows is presented as a natural evolution, but this pattern could also indicate that individual agents are slow enough that developers spawn multiple ones to stay productive, which might not be the efficiency gain it appears to be. The resource and cost challenges this creates suggest that the pattern, while natural, may not be optimal.

Overall, Uber's case study represents one of the most sophisticated and comprehensive AI agent deployments in software engineering, with significant platform investment and impressive adoption metrics. However, the challenges around costs, adoption speed, and the complexity of the infrastructure required suggest that realizing value from AI agents at scale remains a significant undertaking that requires sustained investment and organizational commitment.
