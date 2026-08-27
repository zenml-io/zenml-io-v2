---
title: "AI-Powered CLI App Generation with Multi-Agent and Skills-Based Workflows"
slug: "ai-powered-cli-app-generation-with-multi-agent-and-skills-based-workflows"
draft: false
llmopsTags:
  - "code-generation"
  - "structured-output"
  - "chatbot"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "system-prompts"
  - "mcp"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "open-source"
  - "documentation"
  - "openai"
  - "anthropic"
industryTags: "tech"
company: "Wix"
summary: "Wix built an AI app builder that enables users to generate CLI applications containing dashboard pages, backend services, site plugins, CMS collections, APIs, and other extensions, while allowing them to inspect, edit, preview, validate, and export the resulting code. The initial architecture used specialized agents for planning, SDK documentation retrieval, parameter generation, extension-specific code generation, iteration, and automated fixing; deterministic code-object generation and parallel execution reduced the reported generation cost from about $4 to $0.30 and latency from more than 10 minutes to less than one minute. Wix later replaced the multi-agent design with a single coding agent augmented by skills, Wix MCP, custom batch tools, validation, and extension ID generation, producing better applications according to the presentation while averaging about $0.50 and three minutes per app. The results are promising but are based on internal reported averages rather than an independently described evaluation."
link: "https://www.youtube.com/watch?v=7HNaxSUPUTA"
year: 2026
seo:
  title: "Wix: AI-Powered CLI App Generation with Multi-Agent and Skills-Based Workflows - ZenML LLMOps Database"
  description: "Wix built an AI app builder that enables users to generate CLI applications containing dashboard pages, backend services, site plugins, CMS collections, APIs, and other extensions, while allowing them to inspect, edit, preview, validate, and export the resulting code. The initial architecture used specialized agents for planning, SDK documentation retrieval, parameter generation, extension-specific code generation, iteration, and automated fixing; deterministic code-object generation and parallel execution reduced the reported generation cost from about $4 to $0.30 and latency from more than 10 minutes to less than one minute. Wix later replaced the multi-agent design with a single coding agent augmented by skills, Wix MCP, custom batch tools, validation, and extension ID generation, producing better applications according to the presentation while averaging about $0.50 and three minutes per app. The results are promising but are based on internal reported averages rather than an independently described evaluation."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-cli-app-generation-with-multi-agent-and-skills-based-workflows"
  ogTitle: "Wix: AI-Powered CLI App Generation with Multi-Agent and Skills-Based Workflows - ZenML LLMOps Database"
  ogDescription: "Wix built an AI app builder that enables users to generate CLI applications containing dashboard pages, backend services, site plugins, CMS collections, APIs, and other extensions, while allowing them to inspect, edit, preview, validate, and export the resulting code. The initial architecture used specialized agents for planning, SDK documentation retrieval, parameter generation, extension-specific code generation, iteration, and automated fixing; deterministic code-object generation and parallel execution reduced the reported generation cost from about $4 to $0.30 and latency from more than 10 minutes to less than one minute. Wix later replaced the multi-agent design with a single coding agent augmented by skills, Wix MCP, custom batch tools, validation, and extension ID generation, producing better applications according to the presentation while averaging about $0.50 and three minutes per app. The results are promising but are based on internal reported averages rather than an independently described evaluation."
notion:
  pageId: "3c7f8dff-2538-8094-bbfa-f7a4b67342dd"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-25T08:43:00.000Z"
  lastEditedTime: "2026-08-25T08:43:00.000Z"
  publishedAt: "2026-08-26T11:36:39Z"
---

## Overview

Wix developed an AI-powered app builder for generating CLI applications that integrate with the Wix platform. The target applications can combine several extension types, including dashboard pages, backend services, HTTP endpoints, site plugins, CMS collections, embedded scripts, and other Wix capabilities. A generated application can be viewed and edited in an online development environment, connected to or cloned from GitHub, previewed on a development site, released, and iterated through a conversational interface. This makes the system an LLM-based developer tool operating in a production-oriented workflow rather than a one-off code-generation demo: generated artifacts must be structurally valid, compile, satisfy platform-specific requirements, and remain editable after the initial request.

The team first implemented a multi-agent architecture in which each extension type had a focused generator, supported by separate agents for application planning, Wix SDK documentation selection, parameter planning, iteration analysis, and error repair. That design reportedly reduced generation cost from approximately $4 to $0.30 per application and generation time from more than 10 minutes to less than one minute. Wix subsequently moved to a simpler single-agent architecture based on an open-source coding agent, Wix MCP, custom tools, validation commands, and reusable skills. The newer system averaged approximately $0.50 and three minutes per application and was reported to generate better applications, although the presentation does not provide a formal quality benchmark, sample size, failure rate, or comparison methodology.

## Problem and Product Context

Creating a Wix CLI app requires developers to understand multiple extension models, read platform documentation, select the appropriate Wix SDKs, supply configuration and scaffold parameters, and wire together code that may span frontend, backend, dashboard, and data components. The app builder was intended to let a user describe an application in natural language—for example, an application involving a product review button—and receive a working project with the requested Wix extensions. Users retain access to the generated code and can modify it directly, which makes iteration and code preservation central requirements.

The operational challenge was not simply generating plausible source code. The system had to translate an application-level request into a set of extension-level implementation tasks, provide the relevant platform documentation, generate files in a predictable structure, create required identifiers and configuration values, run build and type checks, repair failures, and support subsequent changes to existing code. These constraints led Wix to treat orchestration, validation, cost, latency, and maintainability as first-class LLMOps concerns.

## Initial Multi-Agent Architecture

The first implementation began with a cloud-code SDK connected to MCP and basic shell, edit, and write capabilities. It initially supported only two extension types, while the product required support for ten in total. Rather than asking one general-purpose agent to understand every extension simultaneously, the team created a dedicated agent for each extension. Each extension agent used a focused system prompt describing the extension, a scaffolding template containing paths and file content, and no tools. The agent returned a code object, which the application wrote to disk deterministically.

This design separated semantic decisions from mechanical file generation. The model selected or produced the content of a structured code object, while the surrounding application performed the actual write operation. Deterministic writes were presented as faster and cheaper than having a model invoke file-writing tools repeatedly. Removing tools from the extension agents also narrowed their responsibilities and reduced opportunities for unnecessary tool calls, although it placed more responsibility on orchestration code and on the correctness of the returned object.

A blueprint agent converted the user’s request into an application plan. It received a system prompt describing all supported extensions and used GPT-5.1 to produce an object containing the application name, description, and the extensions to trigger, with descriptions for those extensions. The blueprint served as the high-level routing layer rather than generating the application itself.

An SDK picker agent enriched the selected extensions with relevant Wix SDK documentation. It used a smaller model referred to in the presentation as a 4.5-class model together with Wix MCP. For each extension, it suggested up to ten relevant Wix SDK documents, a relevance score, and a reason. This is a lightweight documentation-retrieval and ranking stage. The available description does not establish whether the scores were calibrated, whether retrieval quality was measured, or whether the selected documents were always passed successfully to downstream agents, so the component is best understood as contextual enrichment rather than a validated retrieval benchmark.

A planner agent handled shell parameters and other configuration values needed before generation. Examples included CMS collection identifiers, column definitions, API parameters, and embedded-script parameters. By resolving these values before invoking extension agents, the architecture attempted to keep each generator focused on code production instead of mixing application planning, configuration design, and file manipulation in a single context.

The selected extension agents then ran in parallel. For example, a request requiring a dashboard, a pattern, and a service plugin could trigger separate generators concurrently. Each returned a code object, after which the orchestration layer wrote the files and ran a type check and build. A fix agent received the build and type-check results, repaired type errors, and installed missing dependencies when necessary. This created a basic generation-and-repair loop:

- plan the application and select extensions
- retrieve relevant SDK documentation
- generate required shell parameters
- invoke extension generators in parallel
- write code objects deterministically
- run type checking and a build
- repair errors and install missing dependencies

## Iteration and State Management

Wix treated iteration as a primary design concern because users may request a new feature, alter generated code manually, or ask for changes through chat. An iteration agent analyzed the user’s request, chat history, and existing project to produce an object describing current extensions to change, additional extensions to add, and an overall summary. The agent had richer tools for examining the code than the initial extension generators.

The original plan was to divide updates to existing extensions among the extension agents. In practice, the presentation reports that this caused errors because an extension agent could receive an inappropriate file from the iteration agent. Wix therefore introduced an update-current-code agent responsible for modifying all existing extensions using read and write tools. New extensions continued through the earlier planning, SDK selection, parameter planning, and extension-generation flow. This change illustrates a practical orchestration tradeoff: finer decomposition can improve focus, but it also increases the number of interfaces where file ownership, context boundaries, and intermediate representations can become inconsistent.

The iteration workflow consequently distinguished between two kinds of work. Existing code was updated by a broader agent with access to the project’s files, while genuinely new extension types were generated through the specialized pipeline. After either path, the system wrote the changes and ran the same build, type-check, and repair process. This reuse of validation was important because iterative edits can introduce the same dependency and compilation problems as initial generation.

## Transition to a Single Agent with Skills

Wix later replaced the multi-agent design with a single agent augmented by reusable skills. The team described the motivation as reduced maintenance and debugging complexity, fewer cross-agent errors, and better application-level reasoning. A single agent can consider several extensions together rather than treating each extension as an isolated task, which may help it preserve relationships across the generated application. The approach also reduces orchestration boundaries and the need to define data contracts between multiple planning and generation agents.

The newer implementation used OpenCode, described as an open-source AI coding agent, with Sonnet 4.6 as the model. It included a short system prompt and custom rules focused on Wix app generation, Wix MCP for obtaining SDK documentation, built-in tools, and custom batch-read and batch-write tools. Additional tools included a validate-app command that runs type checking and a build, plus an ID generator for extensions. Wix app skills for generating CLI applications were loaded as reusable guidance and made available in a public repository.

The skills-based design can be viewed as moving some of the control logic from separate model instances into a shared agent context and structured operational capabilities. This simplifies the topology, but it does not eliminate the need for safeguards. The single agent has a broader responsibility and may need to reason about more of the application at once. Batch tools and validation reduce interaction overhead, while the skills and custom rules provide domain-specific constraints. The reported average was about $0.50 per generated app and three minutes, with better application quality than the earlier design according to the team. The newer result was therefore not strictly better on every operational metric: it was considerably faster and cheaper than the original baseline, but slower and somewhat more expensive than the optimized multi-agent version.

## Results and Tradeoffs

The reported progression was from roughly $4 and more than ten minutes per application in the early implementation, to roughly $0.30 and under one minute after introducing focused agents, parallel execution, deterministic writes, and automated repair. The later skills-based system averaged roughly $0.50 and three minutes while producing applications the team considered better. These figures suggest that architecture changes materially affected cost and latency, but they should be interpreted as internal operational claims rather than independently verified results. No information is provided about model token usage, workload mix, application complexity, retry rates, repair success rates, user acceptance, or the definition of “better.”

The case demonstrates several practical LLMOps principles. Focused prompts can constrain specialized generators; limiting tools can reduce latency and uncontrolled behavior; deterministic execution is preferable for mechanical actions such as writing a known file object; and parallelizing independent extension generation can reduce wall-clock time. Structured intermediate objects also make orchestration more explicit than passing unstructured prose between agents. Conversely, each intermediate object becomes a contract that can fail, and each additional agent increases coordination and debugging overhead.

The most important lesson from the deployment experience is that iteration should be designed from the beginning. A system that generates an initial project but cannot safely update existing files is poorly aligned with real developer workflows. The Wix design also shows that multi-agent systems are not automatically superior to a single capable agent. Specialized agents helped reduce cost and latency, but the team encountered file-routing errors and maintenance burden. A single agent with skills, domain tools, and strong validation may offer a better balance when the application requires holistic reasoning across multiple extensions.

## Assessment

This is a credible production-oriented pattern for AI-assisted software generation, particularly because it includes code inspection, GitHub workflows, development-site preview, build and type validation, dependency installation, and repair rather than stopping at text generation. MCP supplies platform documentation context, skills encode reusable domain guidance, and custom tools create a controlled interface for reading, writing, validating, and identifying application components.

The main limitations are the absence of detailed evaluation evidence and safety or governance discussion. The source does not describe automated functional tests beyond type checking and building, security scanning, sandboxing, permission controls, rollback behavior, cost budgets, observability, prompt/version management, or how malformed or harmful generated code is handled. Build success is a useful gate but does not prove that an application behaves correctly or satisfies the user’s intent. For production operation, Wix would need to supplement these mechanisms with task-level evaluations, representative regression suites, telemetry for model and tool failures, and explicit controls around generated dependencies and deployment. Within the evidence available, the strongest conclusion is that Wix achieved a substantial reported efficiency improvement while learning that simpler, skills-based orchestration can improve maintainability and holistic generation quality, with a modest cost and latency tradeoff relative to the fastest specialized-agent configuration.
