---
title: "Building Security into AI Agents for Collaborative Workspaces"
slug: "building-security-into-ai-agents-for-collaborative-workspaces"
draft: false
llmopsTags:
  - "chatbot"
  - "customer-support"
  - "high-stakes-application"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "error-handling"
  - "mcp"
  - "human-in-the-loop"
  - "security"
  - "guardrails"
  - "monitoring"
industryTags: "tech"
company: "Notion"
summary: "Notion faced the challenge of deploying AI agents in collaborative workplace environments where traditional single-user permission models were insufficient and potentially dangerous. They developed Custom Agents with a security-first approach that starts with zero permissions by default and builds up granular, resource-level access controls. Through extensive alpha testing with over 3,000 internal agents and 25,000 customer agents, they implemented multi-layered security including page-level permissions, prompt injection protection, runtime warning systems, and remediation capabilities. The solution enables secure autonomous agents in collaborative contexts while preventing unintended actions like accidentally posting to company-wide Slack channels."
link: "https://www.notion.com/blog/how-we-built-security-into-custom-agents"
year: 2026
seo:
  title: "Notion: Building Security into AI Agents for Collaborative Workspaces - ZenML LLMOps Database"
  description: "Notion faced the challenge of deploying AI agents in collaborative workplace environments where traditional single-user permission models were insufficient and potentially dangerous. They developed Custom Agents with a security-first approach that starts with zero permissions by default and builds up granular, resource-level access controls. Through extensive alpha testing with over 3,000 internal agents and 25,000 customer agents, they implemented multi-layered security including page-level permissions, prompt injection protection, runtime warning systems, and remediation capabilities. The solution enables secure autonomous agents in collaborative contexts while preventing unintended actions like accidentally posting to company-wide Slack channels."
  canonical: "https://www.zenml.io/llmops-database/building-security-into-ai-agents-for-collaborative-workspaces"
  ogTitle: "Notion: Building Security into AI Agents for Collaborative Workspaces - ZenML LLMOps Database"
  ogDescription: "Notion faced the challenge of deploying AI agents in collaborative workplace environments where traditional single-user permission models were insufficient and potentially dangerous. They developed Custom Agents with a security-first approach that starts with zero permissions by default and builds up granular, resource-level access controls. Through extensive alpha testing with over 3,000 internal agents and 25,000 customer agents, they implemented multi-layered security including page-level permissions, prompt injection protection, runtime warning systems, and remediation capabilities. The solution enables secure autonomous agents in collaborative contexts while preventing unintended actions like accidentally posting to company-wide Slack channels."
notion:
  pageId: "352f8dff-2538-80be-8017-ef6c4aee6382"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-30T13:32:00.000Z"
  lastEditedTime: "2026-04-30T13:32:00.000Z"
  publishedAt: "2026-04-30T13:35:35Z"
---

## Overview

Notion's Custom Agents case study represents a sophisticated approach to deploying AI agents in production environments where collaboration and security are paramount concerns. The case study, published in February 2026, details how Notion engineered their Custom Agents platform to address a fundamental challenge in production LLM systems: balancing agent autonomy with security in multi-user collaborative workspaces. Unlike personal AI assistants designed for single users with simple permission models, Notion needed to create agents that could operate effectively in environments with complex permission hierarchies, multiple users, and sensitive organizational data.

The core problem Notion identified is that most existing AI agents follow one of two inadequate patterns: either they have broad permissions that create security risks, or they have such restricted access that they become useless. Notion's alpha testing validated this concern dramatically when early versions of their agents, given overly permissive Slack access, inadvertently posted messages to company-wide channels with hundreds of employees—clearly not what users intended. This real-world failure mode drove their security-first redesign and represents an honest acknowledgment of the challenges in deploying LLM-based systems in production.

## Core Security Architecture

The foundation of Notion's LLMOps approach is what they call a "build-from-nothing security model." This represents a deliberate architectural decision where Custom Agents start with zero permissions—no ability to read, write, or interact with any resources. This contrasts sharply with many consumer AI assistants that begin with broad access and rely on safety instructions embedded in prompts, which can be compressed out during context management or bypassed through various prompt manipulation techniques.

Notion's philosophy is particularly noteworthy from an LLMOps perspective: they explicitly state they "don't want to leave safety to the model's decision-making." This represents a mature understanding of LLM limitations in production. Rather than trusting the language model to consistently interpret and follow security constraints (which research has shown to be unreliable), they've implemented safety at the access control and deterministic layer—meaning security enforcement happens outside the LLM's reasoning process through traditional access control mechanisms. This is a critical best practice for production LLM systems that the case study implicitly validates.

## Granular Permission System

Notion developed resource-level permissions that provide fine-grained control appropriate for collaborative environments. The permission system includes several notable features that demonstrate production-grade LLMOps thinking:

**Page-level granularity** allows users to grant view or edit access to specific pages rather than blanket workspace access. This follows the principle of least privilege, a fundamental security concept that Notion has adapted for AI agent contexts. In practice, this means an agent designed to help with marketing content can be restricted to only the marketing workspace pages, preventing it from accessing or modifying engineering documentation or financial data.

**First-party Slack integration** represents a strategic architectural choice. Notion explicitly built their own Slack integration rather than relying solely on the Model Context Protocol (MCP) because MCP integrations, being designed primarily for single-user scenarios, lack the resource-based permission granularity needed for production multi-user environments. This decision reflects a practical understanding that emerging AI standards like MCP may not yet be production-ready for all enterprise use cases. The Slack integration includes custom permission modes like "read and reply" that allow agents to respond only in threads where they were explicitly triggered, preventing the embarrassing scenario of agents posting to company-wide channels.

**Email confirmation controls** allow users to configure whether they want to approve emails before agents send them. This represents a user-configurable trust boundary—users can choose higher autonomy for low-risk scenarios or require confirmation for higher-stakes communications.

**MCP integration controls** acknowledge that while Notion built first-party integrations for core services, they still support MCP for extensibility. However, they apply their security model by allowing users to specify which tools are available and configure approval requirements for different action types. This shows how production LLM systems can bridge standardized protocols with custom security requirements.

## Multi-Layered Runtime Security

Beyond static permission controls, Notion implemented runtime security measures that address threats that emerge during agent execution. This multi-layered approach is particularly relevant for LLMOps because it acknowledges that no single security mechanism is sufficient for production LLM systems.

**Prompt injection protection** is presented with appropriate nuance. Notion acknowledges that prompt injection remains "one of the biggest and most well-known challenges for AI agents" and explicitly states it's "an unsolved problem." Rather than claiming to have solved prompt injection (a red flag that would indicate overselling), they describe their approach as designing the system to minimize the impact of successful prompt injection attacks. They employ multiple strategies: tagging external data to identify potential attack vectors, monitoring agent behavior for suspicious patterns, and stopping execution to request user confirmation when anomalies are detected. This defense-in-depth approach is much more realistic than claiming perfect prompt injection defense, and it demonstrates mature production thinking.

**Warning system** provides context-appropriate interventions at two different stages. During agent configuration, when users set up permissions that might be risky, Notion presents confirmations or even requires workspace-admin approvals for particularly sensitive configurations. During runtime, when an agent is about to perform a risky action based on the permissions it has been granted, it pauses and asks the agent owner for confirmation. This two-stage approach recognizes that security needs differ between setup time and execution time, and that the appropriate person to approve actions may differ (workspace admin for broad permissions vs. agent owner for specific actions).

**Remediation capabilities** provide a practical "undo" button for agent mistakes. If an agent posts an incorrect message to Slack, the agent owner can delete it. While this sounds simple, it represents important thinking about production LLM systems: prevention is ideal, but when systems inevitably make mistakes, users need clear paths to remediate damage. This is part of a complete production strategy that doesn't assume perfection.

## Alpha Testing and Iteration

Notion's development process reveals valuable LLMOps practices around testing and iteration. They ran an extensive alpha testing program both internally and with external customers, deliberately stress-testing security at increasing scale. By the end of alpha testing, they had more than 3,000 internal Custom Agents and more than 25,000 customer-created agents. This scale of testing is significant—many AI product launches happen with much more limited production validation.

The testing revealed concrete failure modes that drove design changes. The #general Slack posting incident mentioned earlier led directly to the creation of the "read and reply" permission mode. This illustrates an important LLMOps principle: production testing with real users and real data reveals failure modes that are difficult to anticipate in controlled testing environments. Notion's willingness to share this failure mode publicly (rather than only highlighting successes) provides valuable transparency about the challenges of deploying LLM systems.

The decision to build first-party integrations rather than relying solely on MCP came from alpha testing insights. Notion found that MCP's design for single-player use cases meant it didn't natively handle resource-based permissions or triggers needed for collaborative environments. This represents practical engineering tradeoffs—while standardized protocols like MCP offer benefits, production requirements sometimes necessitate custom solutions.

## Internal Adoption and Validation

An interesting validation signal is that Notion's own security team became "one of the most active internal users of Custom Agents." They built an agent called "Scruff" to triage and enrich security alerts, and use agents for application security automation, generating code fixes, and running adversarial tests. This internal adoption by the security team specifically is noteworthy because security professionals are typically among the most skeptical of new technologies that might introduce vulnerabilities. Their active use suggests the security model is sufficiently robust for sensitive use cases.

The collaboration between Notion's AI product team and security team throughout development represents a best practice for LLMOps. Security often gets bolted on after product development, but integrating security expertise from the beginning helped Notion avoid fundamental architectural problems that would be difficult to fix later.

## Future Roadmap

Notion's planned improvements reveal ongoing challenges and areas where their current implementation has known limitations:

- **Broader permission scopes with admin approval** suggests they've been conservative initially and plan to enable more advanced use cases once additional guardrails are in place. This phased approach to capability rollout is prudent for production LLM systems.

- **Extending granular permissions to external integrations on the Workers platform** indicates they're working toward making their permission model more extensible and applicable to third-party integrations, which would create a more consistent security model across the platform.

- **Additional permission modes** will likely emerge as they observe real-world usage patterns during the beta period.

The acknowledgment that they're "still in the early phases of building out this technology" and welcoming community feedback demonstrates appropriate humility about deploying LLM systems in production.

## Critical Assessment and Balanced Perspective

While the case study presents Notion's approach positively, several caveats warrant mention. The text is fundamentally marketing content for Notion's product, so claims should be evaluated with appropriate skepticism. The case study doesn't provide quantitative metrics on security effectiveness—for instance, we don't know how many prompt injection attempts were successfully blocked versus how many slipped through, or what the false positive rate is for their warning systems.

The reliance on "tagging and monitoring external data to identify potential attacks" for prompt injection protection is somewhat vague. The effectiveness of such approaches depends heavily on implementation details not disclosed in the case study. Similarly, while the warning system for "potentially risky" actions sounds good in principle, the criteria for what constitutes "risky" and how false positives are managed isn't detailed. Overly aggressive warnings could lead to alert fatigue where users habitually approve everything, undermining the security benefits.

The decision to build first-party integrations has tradeoffs. While it provides better security controls, it also means Notion must maintain these integrations themselves rather than benefiting from community-maintained MCP tools. This creates potential maintenance burden and may limit the extensibility that makes AI agents valuable. There's a tension between security and functionality that may not be fully resolved.

The case study also doesn't discuss certain important production concerns for LLM systems: monitoring and observability for agent actions, audit logging capabilities, incident response procedures when agents do cause damage despite safeguards, or how they handle model updates that might change agent behavior. These are all critical LLMOps concerns that presumably Notion has addressed but aren't covered in this particular piece.

## Technical Significance for LLMOps

Despite these caveats, the case study demonstrates several important LLMOps principles worth highlighting. The zero-permission default model represents sound security architecture for production AI systems. The recognition that security cannot rely solely on the LLM's decision-making and must be enforced through deterministic access controls is a critical insight that many LLM deployments miss. The multi-layered security approach acknowledging that no single defense is sufficient reflects mature production thinking.

The scale of alpha testing (28,000+ agents across internal and external users) before public launch is more rigorous than many AI product releases. The honest acknowledgment of failure modes like the #general posting incidents and the unsolved nature of prompt injection provides valuable transparency. The willingness to build custom infrastructure (first-party integrations) when existing standards (MCP) don't meet production requirements shows pragmatic engineering rather than dogmatic adherence to emerging standards.

The case study ultimately represents a fairly sophisticated approach to one of the core challenges in production LLM systems: how to give AI agents enough autonomy to be useful while preventing them from causing harm in complex organizational environments. While the execution details and long-term effectiveness remain to be proven, the architectural principles and development process demonstrate thoughtful LLMOps practices.
