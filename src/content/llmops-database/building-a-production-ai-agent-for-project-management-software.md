---
title: "Building a Production AI Agent for Project Management Software"
slug: "building-a-production-ai-agent-for-project-management-software"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "code-interpretation"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "system-prompts"
  - "token-optimization"
  - "fastapi"
  - "cache"
industryTags: "tech"
company: "Linear"
summary: "Linear, a project management software company, built Linear Agent, an AI assistant designed to help users manage their workflows through natural language interactions. The challenge was to create an agent flexible enough to handle unanticipated user requests while maintaining predictability and safety in a production environment. Linear's solution involved a custom-built agent architecture with carefully designed system prompts, tool abstractions, a skill-based system for progressive context disclosure, and a proprietary harness for fine-grained orchestration control. The approach emphasizes balancing flexibility with boundaries, trading some potential breadth of capabilities for greater predictability and reduced error surface area, while positioning the system to benefit from future model improvements."
link: "https://linear.app/now/how-we-built-linear-agent"
year: 2026
seo:
  title: "Linear: Building a Production AI Agent for Project Management Software - ZenML LLMOps Database"
  description: "Linear, a project management software company, built Linear Agent, an AI assistant designed to help users manage their workflows through natural language interactions. The challenge was to create an agent flexible enough to handle unanticipated user requests while maintaining predictability and safety in a production environment. Linear's solution involved a custom-built agent architecture with carefully designed system prompts, tool abstractions, a skill-based system for progressive context disclosure, and a proprietary harness for fine-grained orchestration control. The approach emphasizes balancing flexibility with boundaries, trading some potential breadth of capabilities for greater predictability and reduced error surface area, while positioning the system to benefit from future model improvements."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-ai-agent-for-project-management-software"
  ogTitle: "Linear: Building a Production AI Agent for Project Management Software - ZenML LLMOps Database"
  ogDescription: "Linear, a project management software company, built Linear Agent, an AI assistant designed to help users manage their workflows through natural language interactions. The challenge was to create an agent flexible enough to handle unanticipated user requests while maintaining predictability and safety in a production environment. Linear's solution involved a custom-built agent architecture with carefully designed system prompts, tool abstractions, a skill-based system for progressive context disclosure, and a proprietary harness for fine-grained orchestration control. The approach emphasizes balancing flexibility with boundaries, trading some potential breadth of capabilities for greater predictability and reduced error surface area, while positioning the system to benefit from future model improvements."
notion:
  pageId: "3b8f8dff-2538-800c-8bb6-c264fd22586b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T15:33:00.000Z"
  lastEditedTime: "2026-08-10T15:34:00.000Z"
  publishedAt: "2026-08-10T15:36:49Z"
---

## Overview

Linear, a project management and issue tracking platform, developed Linear Agent as an AI-powered assistant integrated into their product. This case study provides detailed insights into the architectural and operational decisions involved in deploying a production AI agent that needs to balance flexibility with predictability. The implementation represents a sophisticated approach to LLMOps where the traditional software engineering goal of consistent, repeatable behavior is deliberately inverted to allow for emergent capabilities while maintaining necessary guardrails.

The fundamental challenge Linear faced was that traditional software engineering focuses on minimizing outcome variability—ensuring the same action produces the same result. AI agents, however, derive much of their value from handling unanticipated scenarios in undefined ways. Over-constraining the agent would eliminate the flexibility that makes it useful, while under-constraining it would create unacceptable risks in production. Linear's approach was to define boundaries within which the agent could autonomously find its own path, implemented through five key architectural components.

## System Prompt Design

Linear's approach to prompt engineering emphasizes establishing high-level principles rather than prescriptive rules. The system prompt focuses on four fundamental areas that guide the agent's behavior without over-constraining it:

**Communication style guidance** ensures the agent communicates clearly and naturally, avoiding both overly corporate and excessively casual language. Importantly, the agent adapts its tone based on the surface where it operates—being more conversational in Slack while maintaining a different tone in Linear's Loop feature. This context-aware communication represents a sophisticated approach to prompt engineering where the same underlying agent adjusts its presentation based on the interaction context.

**Hard boundaries** are established for sensitive topics including politics, religion, and personal relationships, where the agent should decline to engage. Additionally, the agent is instructed not to substantially expand the scope of user requests without seeking confirmation. This represents a key safety mechanism in production deployment—preventing scope creep that could lead to unintended consequences.

**Product-specific knowledge** is embedded directly in the system prompt, explaining Linear's taxonomy and conceptual model. This enables the agent to correctly interpret user requests and map them to appropriate actions within Linear's domain model. The prompt essentially serves as foundational training on Linear's specific concepts, compensating for the base model's limited exposure to Linear-specific terminology during pre-training.

**Default opinions on feature usage** give the agent a strong sense of when to infer intent versus when to ask clarifying questions. Since user prompts are often very short, the agent needs opinionated defaults to be useful. This represents a key LLMOps tradeoff: optimizing for user experience by minimizing back-and-forth clarification, while accepting some risk that the agent may occasionally misinterpret intent.

The high-level nature of this system prompt is intentional. It provides direction while leaving room for spontaneous, context-aware behavior. The example given is the agent picking up on conversational vibes in Slack and contributing a well-timed joke—but only if the topic isn't sensitive, demonstrating how boundaries interact with flexibility. This approach bets on the underlying model's capabilities to interpret these high-level guidelines appropriately across diverse situations.

## Tool Design Philosophy

Linear found that encoding constraints into tool design proved more effective than spelling them out in prompts. This represents an important LLMOps principle: where possible, make invalid actions structurally difficult rather than relying solely on instruction-following. Each tool is shaped so its parameters are intuitive and easy to understand, similar to designing good code abstractions or user interfaces where correct usage doesn't require extensive explanation.

This design philosophy has forward-looking implications for the agent's capabilities. Because the action space isn't over-scripted and tools can be flexibly combined, improvements in underlying model intelligence automatically translate into the agent being able to tackle increasingly complex tasks. The architecture doesn't hard-code specific workflows; instead, it provides well-designed primitives that more capable models can coordinate in increasingly sophisticated ways. This is a key consideration for production LLM systems: building abstractions that can grow with model capabilities rather than becoming obsolete as models improve.

## Agent's Model of Linear

Linear identifies a critical distinction between their agent and coding agents that has significant implications for LLMOps. Coding agents have a small set of deep tools (like `read_file`, `write_file`, `run_command`) and accomplish most tasks by combining these primitives. Code and shell commands are also strongly represented in model training data, giving coding agents good instincts even in unfamiliar situations.

Linear Agent has the opposite architecture: a large number of comparatively shallow tools, each tied to specific product operations like creating issues or modifying documents. Using these tools effectively requires understanding product concepts that aren't well-represented in the model's existing knowledge. While Linear might appear in training data, it's negligible compared to the representation of code and shell commands. This creates a fundamental challenge for production deployment: the agent must be explicitly taught domain knowledge that the base model doesn't possess.

Linear's solution requires three components for each area of product functionality:

- **Tools for reading and changing relevant data**: The actual function calling interface the agent uses to interact with Linear's backend
- **Explanations of what data represents**: Documentation of how concepts relate to the broader product model
- **Best practices for feature usage**: Principles guiding effective use of features

The Customer Requests feature serves as an illustrative example. The corresponding skill provides tools to create, update, and list requests across issues, projects, and customers. It explains that each request captures feedback from a specific customer, typically links to an issue or project, and summarizes what was requested. Crucially, it encodes best practices—for instance, guiding the agent to aggregate patterns across customer requests when drafting project specs. This represents sophisticated prompt engineering where domain expertise is systematically embedded into the agent's knowledge base.

## Scoping Through System Skills

A critical challenge in production LLM deployment is context management: providing enough information for the agent to be capable while avoiding overwhelming it with irrelevant details. Linear addresses this through "system skills" as a unit of composition. Each system skill bundles metadata, a system prompt fragment, and a set of tools, representing an independent capability set that can be progressively disclosed when needed.

This is architecturally distinct from user-created skills (reusable instructions users author for their workflows). System skills are built-in capabilities managed behind the scenes through either preloading or on-demand loading. Before each run, Linear Agent infers which skills are likely relevant based on the user's prompt and invocation context. An agent called from a project's Slack channel or Linear page, for example, preloads the 'projects' skill.

For more indirect tasks, skills may be loaded dynamically as requirements become apparent. If a user asks the agent to draft a project update, Linear might initially load only 'projects' and 'project updates' skills. As the agent begins work, it may realize it needs to review recent issues and PRs, then load those skills itself. This represents sophisticated orchestration: the agent metacognitively assesses its own capability gaps and requests additional tools.

This architecture keeps each thread's context focused while allowing Linear Agent as a whole to support broad capabilities. It also enables expanding the agent's capabilities over time without burdening every interaction with an ever-growing prompt and toolset. From an LLMOps perspective, this addresses token cost management, context window limitations, and the cognitive load on the model from processing irrelevant information. Progressive disclosure of capabilities is a pattern that becomes increasingly important as agent systems grow in complexity.

Linear explicitly considered but rejected giving the agent direct access to lower-level primitives like the Linear SDK, a coding environment, CLI, or GraphQL API. Exposing these would arguably enable more sophisticated behavior, but would dramatically increase the surface area for mistakes. The underlying data model supports a wide range of actions, and some UI concepts require interpretation before mapping to that model. The identified failure mode is long-tail requests where, without an obvious completion path, the agent might attempt increasingly speculative actions.

This represents a key LLMOps tradeoff that Linear makes explicit: trading some breadth for predictability. The agent may occasionally refuse tasks it cannot safely complete, but its ability to make mistakes is much more limited. This is a defensible production strategy—constraining the action space to reduce risk, even at the cost of some capability. It reflects a mature understanding that production systems need safety margins, particularly when mistakes could affect user data or workflows.

## Custom Harness Architecture

Linear built a custom agent execution stack rather than using off-the-shelf harness libraries. This stack includes:

- A provider-agnostic AI client with consistent wire and storage representation for LLM threads
- An agent loop built on a durable workflow engine
- A high-level streaming and storage layer that parses rich elements (mentions, widgets) before they reach the product

The decision to build custom infrastructure reflects specific orchestration requirements that generic harness libraries don't support well. Off-the-shelf harnesses typically have strong opinions about execution flow: provide a prompt and tools upfront, call 'run', wait while the agent makes tool calls, then receive a final response. This works for straightforward interactions but lacks the fine-grained control Linear needed for three specific patterns:

**Dynamic tool injection via skills** requires the agent to have immediate access to newly loaded tools after a tool call resolves, allowing it to make additional tool calls before responding to the user. Linear wanted to preserve the provider's prefix cache during this process, which isn't automatic with naive implementations. Reprocessing existing context without cache hits would significantly drive up costs. This represents sophisticated cost optimization in production: maintaining cache validity while dynamically modifying the tool set is a non-trivial technical challenge that generic harnesses don't address.

**Conditional tool call approval** enables the agent to pause mid-run and request user confirmation before executing risky or difficult-to-undo actions. While most harness libraries support approval through coarse rules based only on tool names and parameters, Linear wanted contextual approval logic. For example, the agent can delete something it created during the current conversation without asking, while requiring confirmation before deleting existing issues. Similarly, it can post to most comment threads without approval but should pause before posting to threads synced with public repositories. This context-aware approval mechanism is critical for production safety—the same action (deletion, posting) has different risk profiles depending on what's being acted upon and the broader context.

**Asynchronous sub-agent execution** addresses resource efficiency when a parent agent spawns sub-agents. The parent is often idle for many seconds while the sub-agent executes. This should appear as a synchronous tool call to the parent, but underneath the parent needs to be suspended to avoid consuming server-side resources during the wait. This requires the ability to suspend an agent's turn mid-tool call, execute work asynchronously, then resume the thread when ready. This durable execution pattern is increasingly important for production agent systems where long-running operations need to be orchestrated efficiently.

Linear acknowledges these orchestration patterns are theoretically possible without a custom harness, but would require awkward workarounds because off-the-shelf solutions are designed to support many different agent types. By designing the harness to match Linear Agent's specific orchestration needs, they can build toward the desired product experience without compromising on elegance or efficiency.

Owning the harness also provides operational benefits: the ability to respond quickly to the long tail of errors and edge cases that emerge at scale, particularly when using model-provider features that aren't yet widely adopted or thoroughly battle-tested by existing libraries. This reflects a common pattern in mature LLMOps: as systems reach production scale and complexity, custom infrastructure often becomes necessary despite the upfront investment, because generic solutions don't address the specific operational requirements.

## Tradeoffs and Philosophy

The case study concludes by framing the entire Linear Agent effort as "replacing software's traditional goal of predictability with a more deliberate form of control." Each architectural decision represents a bet on where the line between possibility and predictability sits, one that Linear believes will keep shifting as models improve.

This framing is important from an LLMOps perspective. Linear isn't treating these decisions as permanent—they're explicitly building for a moving target. The architecture is designed to benefit from model improvements without requiring fundamental restructuring. The skill-based system can incorporate new capabilities, the tool abstractions can support more sophisticated coordination, and the boundaries can potentially be relaxed as models become more reliable.

## Critical Assessment

While the case study provides valuable technical detail, it's important to note that this is a first-party account from Linear describing their own product. As such, it naturally emphasizes design sophistication and thoughtful tradeoffs while providing no quantitative evaluation data. We don't see metrics on agent success rates, user satisfaction, error frequencies, or cost characteristics. The case study presents architectural decisions as carefully considered tradeoffs, but doesn't validate those tradeoffs with production data.

The claimed benefits—like the agent picking up on conversational vibes to contribute well-timed jokes in Slack—are presented as capabilities without evidence of how reliably these behaviors occur or how users respond to them. Similarly, the progressive skill loading system is described as keeping context focused and enabling capability expansion, but there's no data on how often skills are loaded dynamically, whether this meaningfully reduces costs or improves performance, or whether the added complexity is justified by measurable benefits.

The decision to build a custom harness is presented as necessary for specific orchestration requirements, but building custom infrastructure always carries long-term maintenance costs and the risk of reinventing solutions to problems that generic libraries might eventually solve. While Linear's requirements for contextual approval and durable sub-agent execution are legitimate, the case study doesn't discuss the engineering investment required or compare alternatives that might have emerged since they made this decision.

The tradeoff of limiting the agent to high-level tools rather than exposing low-level primitives like GraphQL is framed as choosing predictability over breadth. This is defensible, but it also means Linear Agent may be fundamentally less capable than agents with broader action spaces. Whether this tradeoff is optimal depends on use cases and risk tolerance—something that would benefit from concrete examples of tasks the agent refuses versus successfully completes.

Overall, this case study provides valuable insights into production agent architecture from a team clearly thinking deeply about LLMOps challenges. The technical decisions around prompt design, tool abstraction, progressive context disclosure, and custom orchestration reflect sophisticated understanding of agent deployment challenges. However, as a self-published technical overview, it should be read as documenting design decisions and architectural philosophy rather than validated best practices with proven production outcomes. The true test of these approaches will be in measurable production performance, user adoption, and long-term maintainability—data that isn't presented in this account.
