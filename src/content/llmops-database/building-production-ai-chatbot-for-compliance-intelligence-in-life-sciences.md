---
title: "Building Production AI Chatbot for Compliance Intelligence in Life Sciences"
slug: "building-production-ai-chatbot-for-compliance-intelligence-in-life-sciences"
draft: false
llmopsTags:
  - "regulatory-compliance"
  - "chatbot"
  - "document-processing"
  - "prompt-engineering"
  - "agent-based"
  - "system-prompts"
  - "human-in-the-loop"
  - "harness-engineering"
  - "evals"
  - "fastapi"
  - "postgresql"
  - "open-source"
  - "documentation"
  - "anthropic"
  - "amazon-aws"
industryTags: "healthcare"
company: "Qualio"
summary: "Qualio, a compliance-as-code platform for life sciences companies, developed an AI-powered chatbot to help customers remediate compliance gaps in their quality management documentation. The team evolved their architecture from an over-engineered multi-agent system with 20+ specialized tools to a simplified single-agent approach using API abstraction, skill-based workflows, and a simple to-do list planner. By leveraging Pydantic AI, progressive disclosure of capabilities, human-in-the-loop approvals for safety-critical operations, and LLM-as-a-judge evaluation frameworks, they achieved a production-ready system that balances autonomy with regulatory requirements while significantly reducing code complexity and improving developer experience."
link: "https://www.youtube.com/watch?v=MTyO3W7MYTs"
year: 2026
seo:
  title: "Qualio: Building Production AI Chatbot for Compliance Intelligence in Life Sciences - ZenML LLMOps Database"
  description: "Qualio, a compliance-as-code platform for life sciences companies, developed an AI-powered chatbot to help customers remediate compliance gaps in their quality management documentation. The team evolved their architecture from an over-engineered multi-agent system with 20+ specialized tools to a simplified single-agent approach using API abstraction, skill-based workflows, and a simple to-do list planner. By leveraging Pydantic AI, progressive disclosure of capabilities, human-in-the-loop approvals for safety-critical operations, and LLM-as-a-judge evaluation frameworks, they achieved a production-ready system that balances autonomy with regulatory requirements while significantly reducing code complexity and improving developer experience."
  canonical: "https://www.zenml.io/llmops-database/building-production-ai-chatbot-for-compliance-intelligence-in-life-sciences"
  ogTitle: "Qualio: Building Production AI Chatbot for Compliance Intelligence in Life Sciences - ZenML LLMOps Database"
  ogDescription: "Qualio, a compliance-as-code platform for life sciences companies, developed an AI-powered chatbot to help customers remediate compliance gaps in their quality management documentation. The team evolved their architecture from an over-engineered multi-agent system with 20+ specialized tools to a simplified single-agent approach using API abstraction, skill-based workflows, and a simple to-do list planner. By leveraging Pydantic AI, progressive disclosure of capabilities, human-in-the-loop approvals for safety-critical operations, and LLM-as-a-judge evaluation frameworks, they achieved a production-ready system that balances autonomy with regulatory requirements while significantly reducing code complexity and improving developer experience."
notion:
  pageId: "3b8f8dff-2538-8063-b1af-e48e4547420f"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T12:42:00.000Z"
  lastEditedTime: "2026-08-10T12:42:00.000Z"
  publishedAt: "2026-08-10T15:25:51Z"
---

## Overview

Qualio operates as a compliance-as-code platform for the life sciences industry, helping companies accelerate the delivery of life-saving and life-prolonging products to market. The company has evolved from an electronic quality management system that captures policies, procedures, and events to a comprehensive compliance intelligence platform. The platform extracts requirements and controls from regulatory standards, analyzes customer documentation and events, identifies gaps in compliance, and helps remediate those gaps.

The specific use case presented involves building a production AI chatbot that assists customers in remediating compliance gaps. When the system flags a compliance gap—such as missing process definitions in documentation—the chatbot helps users understand what needs to be fixed and guides them through the remediation process. The technical architecture uses a front-end communicating via the AGUI protocol (an event-based protocol for agent-UI communication) over secure websockets, a Pydantic AI agent wrapped in a FastAPI server on the backend, and AWS Bedrock with Claude as the hosted LLM provider.

## Evolution from Multi-Agent to Single-Agent Architecture

The team initially designed a multi-agent system based on the assumption that the complexity of the compliance domain required specialized agents. Their first architecture included a supervisor/routing agent that dispatched work to specialized agents: a compliance agent that retrieved information about gaps, controls, and requirements; a documents agent that found relevant documents and read their contents; and a user agent that determined appropriate reviewers and approvers for documents.

This multi-agent approach created significant production challenges. The sequential nature of handoffs between agents introduced substantial latency in the chatbot experience. Memory loss became a critical issue—not that messages disappeared entirely, but because each specialized agent maintained its own message history and only passed summarized information back to the supervisor. This led to frustrating user experiences where the chatbot would recommend updating a specific document, then when asked why, would respond that it needed to find the relevant document again. The architecture also required extensive boilerplate code to manage agent coordination, and debugging became extremely difficult despite having correlation IDs and traces across requests.

The solution was radical simplification: the team eliminated the multi-agent architecture entirely and moved to a single agent with pluggable modules. They implemented an agent factory pattern that allows different modules to be enabled or disabled based on customer context. A capability service checks user JWT tokens to determine permissions, roles, and purchased features, then filters which modules the agent can access. This approach eliminated the latency from agent handoffs, resolved the memory loss issues since there's only one message history, dramatically reduced boilerplate code, and simplified debugging.

## Tool Abstraction and API Discovery

The next major challenge involved tool proliferation. For a single workflow, the team had created over 20 specialized Python functions as tools: get controls, get gaps, get evidence, get rules, and many more. Every change in requirements meant writing a new Python function, adding parameters, implementing error handling and validation, and registering the tool. While Pydantic AI helped by automatically lifting descriptions into the system prompt, this approach led to context bloat, maintenance burden, high probability of bugs, and significant code repetition.

The breakthrough came from studying how Claude Code works. Rather than having separate tools for reading Python files versus TypeScript files versus other file types, Claude Code uses a generic read operation with parameters. The team adopted this principle, replacing their 20+ specialized tools with just two generic operations: Qualio API discovery and Qualio API execution.

The implementation leverages existing OpenAPI specifications for their legacy APIs. When the agent starts, key information from the OpenAPI specs is extracted and added to the system prompt, making the agent aware of available operations without overwhelming it with details. At runtime, when the agent wants to use a specific operation, it can query for the exact parameters and schema needed, then execute the operation. This progressive disclosure pattern—giving the agent awareness of capabilities without overwhelming it with implementation details unless needed—became a core design principle.

One critical addition was field filtering. APIs can be chatty, and legacy APIs often lack built-in field projection capabilities. The team added a fields mechanism that allows the agent to specify which pieces of information it needs from an API response, filtering out irrelevant data. This prevents full API responses from bloating the message history, which would contribute to context exhaustion.

## Workflow Management with Skills

The team initially attempted to encode workflows deterministically in code, using intent matching to determine which coded workflow path to follow. For example, if the intent was gap remediation, execute steps A, B, C; if creating a quality event, execute steps X, Y, Z. This approach proved rigid and limiting—the LLM's capabilities were constrained by the predetermined paths engineers had coded. Additionally, the team consists of software engineers who aren't domain experts in compliance workflows, while their business experts understand compliance but can't write Python.

In September of the year before the presentation, the team created what they called capability files—domain-organized markdown files containing a name, description, feature flags, and step-by-step workflow instructions. A month later, Anthropic released their Skills API, and the team realized they had essentially invented their own version of skills. They subsequently migrated to the official Skills API pattern while keeping the same architectural principle.

Skills work through the same progressive disclosure pattern used for tools. When the agent starts, skill names and descriptions from the front matter are injected into the system prompt, making the agent aware of available workflows without loading the full details. When a user asks about gap remediation, the agent reads the step-by-step workflow for that specific skill on demand. If a step within that workflow requires a specific action like attaching evidence to a gap, the agent looks up the necessary details just-in-time. This approach allows non-technical business experts to contribute workflow definitions in markdown, enables rapid workflow changes without code deployment, and gives the LLM flexibility to adapt workflows when needed.

## Task Planning with Simple To-Do Lists

The team attempted to build sophisticated planning systems, including deterministic workflow graphs that would ensure the agent stuck to a predetermined plan. These over-engineered solutions proved brittle—if the agent encountered an error mid-execution, there was no recovery mechanism. The agent would sometimes abandon the plan and do other things, and debugging why the agent chose particular actions became extremely difficult.

The solution came from studying Claude Code's architecture and from practical experience with analog productivity systems. The team implemented a remarkably simple to-do list mechanism with just two tools: to-do write (allowing the agent to create a list of to-dos and regenerate the list when needed) and to-do update (allowing the agent to mark tasks as started, pending, failed, or completed).

Critical prompt engineering made this work effectively. The system prompt instructs the agent to create to-do lists only for multiple non-trivial tasks, not for simple single-step questions. The agent must work on one task at a time, marking it in progress before starting and complete after finishing. When a task expands—for example, when one gap requires updating three different documents rather than one—the agent can use the to-do write tool to create a new, more detailed list on the fly.

The most innovative aspect involves tool return values. When the agent uses to-do update to mark a task as complete, the tool doesn't just return a simple acknowledgment. Instead, it returns a structured message that confirms the completed task and explicitly states the next task with an instruction to proceed without further interruption and without notifying the user. This subtle nudging mechanism dramatically improved the agent's ability to stay on task, addressing the remaining 10% of cases where the agent would jump between tasks or backtrack inappropriately.

## Human-in-the-Loop for Regulatory Compliance

The team faced regulatory and practical constraints that prevented full automation. From a regulatory perspective, the EU AI Act requires meaningful human oversight, specifically the ability for natural persons to disregard, override, or reverse AI outputs. ISO 40001 AI management system certification mandates implementing meaningful human oversight. From a practical standpoint, allowing the agent to make arbitrary changes creates regulatory risk, generates confusing audit trails when documents are updated back and forth, and erodes user trust—something easily lost and difficult to regain.

The implementation uses custom extensions to OpenAPI specifications to control when human approval is required. The basic heuristic is that GET requests, assumed to be idempotent in RESTful APIs, don't require approval since the agent is scoped to exactly the same permissions as the user. For other operations, a custom field human-approval-required can be added to the spec. Importantly, this field can also be set to false for cases where non-GET operations shouldn't trigger approval—for example, when the agent needs to hook into live collaboration sessions for document editing, a technical detail users shouldn't be bothered with.

User feedback revealed that approval prompts could be too generic and annoying. The team added a feedback options mechanism to the OpenAPI spec extensions, allowing approval requests to present users with clickable options rather than requiring typed responses. This serves multiple purposes: people prefer clicking buttons over typing; it aids discoverability of agent capabilities; and it helps steer users toward intended use cases while still allowing open-ended conversation.

## Evaluation and Testing Strategy

Traditional unit and integration tests provided false confidence. The team tested individual tools and API integrations successfully, but users still reported problems: the agent updated the wrong document, fabricated document content, or broke protocol by using technical jargon like asking users about APIs. The testing was at the wrong layer of abstraction and didn't capture the emergent behavior of the LLM-based system.

The team adopted Pydantic AI Evals, a framework for systematically testing AI systems from simple LLM calls to multi-agent applications. They implemented three categories of evaluators along a spectrum from deterministic to probabilistic:

Deterministic evaluators check concrete facts without involving LLMs. For example, the human-in-the-loop evaluator verifies that the agent raised an approval request during a specific flow—a binary yes/no check based on examining the tool calls made.

Semi-deterministic accuracy evaluators use an LLM to assess whether the agent's output matches expected facts, but where string similarity or exact matching would be insufficient. For instance, verifying that the agent returned some variation of "I can't find it" when asked about a non-existent personnel file.

Probabilistic LLM-as-a-judge evaluators handle cases where it's difficult to specify expected outputs precisely. For complex questions like "What actions can I take to remediate this gap?", the evaluator uses an LLM to check whether the response mentions specific required elements (relevant actions, documents, codes, owners) without requiring exact phrasing.

An important operational consideration emerged: running comprehensive LLM-based evaluations is expensive. The team received AWS billing alerts and had to carefully consider when to run evals—on every commit, every pipeline run, every deployment, or only when changes could affect agent behavior. The cost-benefit tradeoff requires thoughtful evaluation strategy rather than blanket test coverage.

## Unlearning Engineering Instincts

A meta-lesson involves the tension between established software engineering practices and effective LLM system design. The team found that many engineering instincts that serve well in traditional software development actually hindered their agent's performance.

They initially set temperature to zero seeking deterministic behavior, but switching to temperature of one and enabling extended thinking budgets improved results. They tried to encode all workflow logic in code when markdown instructions proved more effective and inclusive of non-technical domain experts. They built sophisticated graph-based planning systems when a simple to-do list worked better. They resisted automation when human-in-the-loop controls were necessary for regulatory compliance and user trust.

Research from Anthropic supports this counterintuitive finding: existing models are capable of more autonomy than they exercise in practice, and on complex tasks, Claude stops to ask for clarification more than twice as often as humans would interrupt. The models are capable; they need flexibility and a safe environment to operate in rather than rigid constraints.

The engineering team's journey involved moving from over-constraining the LLM with deterministic controls to trusting the model's capabilities while providing appropriate guardrails. This doesn't mean abandoning engineering rigor—it means applying rigor at the right level of abstraction, through evaluation frameworks, safety controls, and well-designed interfaces rather than through rigid procedural code.

## Architecture Evolution Summary

The final architecture represents radical simplification from the initial design. The team moved from multi-agent to single-agent, from 20+ specific tools to two generic API operations (discovery and execution), from coded workflows to markdown-based skills, from sophisticated graph-based planning to simple to-do lists, from attempting full automation to implementing human-in-the-loop controls, and from unit/integration tests to comprehensive LLM-specific evaluation frameworks.

Each simplification was driven by production experience rather than theoretical considerations. The team measured context exhaustion, tracked how users start new conversations versus continuing existing ones, collected explicit user feedback on responses, and monitored which features users actually engaged with. They dogfooded their own product, using Qualio to manage their own ISO 40001 AI management system certification, providing direct insight into user experience.

The developer experience improvements were as significant as the production performance gains. Removing the multi-agent architecture eliminated debates about which tools should belong to which agent and how agents should communicate. The API abstraction meant new functionality could be added by updating OpenAPI specs rather than writing new Python functions. Skills in markdown allowed business experts to contribute directly to the system. The simplified architecture reduced cognitive load for debugging and made the system's behavior more transparent despite—or perhaps because of—giving the LLM more autonomy within well-defined boundaries.

## Technical Stack and Implementation Details

The production system uses Pydantic AI as the core agent framework, leveraging its capabilities for structured outputs, tool definitions, and evaluation. The backend runs as a FastAPI server, providing RESTful endpoints and websocket support. Communication between frontend and backend uses the AGUI protocol, an event-based protocol specifically designed for agent-UI interactions, transported over secure websockets for real-time communication.

For LLM inference, the team uses AWS Bedrock's managed Claude service. This choice was driven by the requirement that all hosted infrastructure must be in AWS for regulatory and compliance reasons. The AWS Bedrock integration provides enterprise features like VPC endpoints, IAM-based access control, and audit logging that align with the stringent requirements of life sciences compliance.

The OpenAPI specification serves as the source of truth for available operations. Custom extensions to the OpenAPI spec control human-in-the-loop behavior and provide feedback options for user interactions. This spec-driven approach means the agent's capabilities are defined declaratively in standardized formats rather than imperatively in code, enabling faster iteration and better collaboration between technical and non-technical team members.

Skills are stored as markdown files with YAML front matter containing metadata like name, description, and feature flags. The progressive disclosure pattern ensures that only skill names and descriptions are loaded into the initial system prompt, with full step-by-step instructions loaded on-demand when needed. This keeps context consumption low while maintaining access to detailed workflow knowledge.

The monitoring and observability setup tracks context usage, conversation patterns (new versus continued conversations), user feedback sentiment, and feature engagement. Correlation IDs and traces provide debugging support, though the team emphasizes that simplified architecture made debugging significantly easier even with the same observability tooling. The system integrates with DataDog for SLOs and alerts, including the AWS billing alerts that reminded them of the operational costs of extensive LLM evaluation.

## Lessons for LLMOps Practitioners

This case study provides several broadly applicable lessons for teams building production LLM systems. First, resist premature complexity—multi-agent systems, specialized tools, and sophisticated planning mechanisms may seem necessary for complex domains, but simpler architectures often perform better and are easier to maintain. Second, embrace progressive disclosure—give the LLM awareness of capabilities without overwhelming it with details unless those details are actually needed for the current task. Third, leverage existing standards like OpenAPI rather than building custom abstractions, as this enables tooling reuse and allows declarative rather than imperative system definition.

Fourth, plan for human-in-the-loop controls from the start rather than trying to retrofit them, especially in regulated industries or high-stakes domains. Fifth, test at the right level of abstraction—unit and integration tests are necessary but not sufficient for LLM systems, which require evaluation approaches that account for the probabilistic and emergent nature of model behavior. Sixth, measure and optimize for operational costs, as comprehensive LLM-based testing and evaluation can become expensive quickly.

Finally, and perhaps most importantly, be willing to unlearn software engineering instincts that don't serve LLM system design. Determinism, rigid control flow, and encoding all logic in procedural code work well for traditional software but may constrain LLM capabilities. The art of LLMOps involves finding the right balance between structure and flexibility, control and autonomy, engineering rigor and model capability. This balance is highly context-dependent—what works for Qualio's compliance chatbot may not work for other domains, use cases, or regulatory environments. The key is to remain empirical, measure actual system behavior, gather user feedback, and be willing to radically simplify when evidence suggests that complexity isn't providing value.
