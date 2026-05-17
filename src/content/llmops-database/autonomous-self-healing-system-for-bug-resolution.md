---
title: "Autonomous Self-Healing System for Bug Resolution"
slug: "autonomous-self-healing-system-for-bug-resolution"
draft: false
llmopsTags:
  - "code-generation"
  - "customer-support"
  - "poc"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "error-handling"
  - "rag"
  - "semantic-search"
  - "harness-engineering"
  - "human-in-the-loop"
  - "docker"
  - "kubernetes"
  - "cicd"
  - "microservices"
  - "orchestration"
  - "databases"
  - "monitoring"
  - "open-source"
  - "documentation"
  - "security"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Wix"
summary: "Wix developed a self-healing system called Gandalf that autonomously processes support tickets from initial detection through to pull request creation for bug fixes. The system was motivated by overwhelming support ticket volumes taking an average of 14 days to resolve, with the goal of reducing this to under 24 hours. Using a four-agent architecture that handles ticket classification, context enrichment, code generation, and review, the system successfully generates pull requests for production deployment, though challenges remain around accurately classifying certain ticket types and accessing organizational knowledge that exists only in institutional memory rather than documented form."
link: "https://www.youtube.com/watch?v=3BNoppi6qcs"
year: 2026
seo:
  title: "Wix: Autonomous Self-Healing System for Bug Resolution - ZenML LLMOps Database"
  description: "Wix developed a self-healing system called Gandalf that autonomously processes support tickets from initial detection through to pull request creation for bug fixes. The system was motivated by overwhelming support ticket volumes taking an average of 14 days to resolve, with the goal of reducing this to under 24 hours. Using a four-agent architecture that handles ticket classification, context enrichment, code generation, and review, the system successfully generates pull requests for production deployment, though challenges remain around accurately classifying certain ticket types and accessing organizational knowledge that exists only in institutional memory rather than documented form."
  canonical: "https://www.zenml.io/llmops-database/autonomous-self-healing-system-for-bug-resolution"
  ogTitle: "Wix: Autonomous Self-Healing System for Bug Resolution - ZenML LLMOps Database"
  ogDescription: "Wix developed a self-healing system called Gandalf that autonomously processes support tickets from initial detection through to pull request creation for bug fixes. The system was motivated by overwhelming support ticket volumes taking an average of 14 days to resolve, with the goal of reducing this to under 24 hours. Using a four-agent architecture that handles ticket classification, context enrichment, code generation, and review, the system successfully generates pull requests for production deployment, though challenges remain around accurately classifying certain ticket types and accessing organizational knowledge that exists only in institutional memory rather than documented form."
notion:
  pageId: "363f8dff-2538-809f-a3ef-f0b6c8909bc7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-17T13:14:00.000Z"
  lastEditedTime: "2026-05-17T13:14:00.000Z"
  publishedAt: "2026-05-17T15:37:46Z"
---

## Overview

Wix's engineering organization built an autonomous self-healing system that represents a sophisticated production deployment of LLM-based agents for software maintenance. The system, named Gandalf, addresses the practical challenge of support ticket overload by automating the entire flow from user-reported issues to production-ready code fixes. The presenter, Israel, emphasizes from the outset that this is "almost" autonomous, acknowledging two key areas where the system still requires human intervention and improvement.

The motivation for building this system came from Wix's chief architect who observed that support tickets were accumulating at an unsustainable rate. With millions of Wix users, the traditional flow involved users opening tickets, support engineers reviewing them days later, attempting to reproduce issues, initiating conversations with customers, opening Jira tickets for R&D, and then R&D teams prioritizing and implementing fixes. This process averaged 14 days in reasonable cases, but could extend to months for complex issues. The ambitious target was to reduce this to under 24 hours, with the caveat that final deployment decisions remain with human engineers who still need time to review the proposed fixes.

## Architectural Philosophy: Context Over Models

A central thesis of the presentation is that the success of this system depends primarily on context quality rather than model selection or architectural complexity. The team emphasizes that with sufficiently accurate and relevant context, most bugs become straightforward to solve. This insight drove their approach from day one: enriching information and understanding context before attempting to solve problems.

Wix's context comes from two distinct sources. The static data includes their codebase managed in GitLab, representing the structural foundation of their applications. The live data encompasses databases, logs from specific time periods, and Wix's documentation that describes expected versus actual system behavior. This dual perspective allows the system to understand both how the code is written and how it actually behaves in production.

To collect this diverse context, Wix developed what they call "enrichers" - a set of tools that gather information across their infrastructure. Four primary enrichers are highlighted: Octo Code for intelligent GitLab searches to locate potential bug locations in static code; Trino for normalized database access across all Wix databases; Grafana for logs; and their documentation system covering both public and private documentation. These enrichers function as the sensory organs of the autonomous system, providing comprehensive situational awareness.

## Four-Agent Architecture

The system architecture consists of four distinct, decoupled agents, each with specialized responsibilities. This separation of concerns mirrors human software development workflows and provides important checks and balances.

The first agent, the Detector, handles ticket ingestion and classification. Users write tickets in natural language describing what they tried to do and what went wrong. The Detector must identify which tickets to pull from thousands of possibilities using defined strategies. These strategies include identifying similar tickets with high volume indicating a widespread issue, tickets that have been waiting in the queue for extended periods, or specific queries targeting particular areas of the codebase like the editor. The team created a flexible interface for defining ticket-pulling strategies, recognizing that different teams might want to focus the system on different problem domains.

Classification represents one of the two major unsolved challenges acknowledged in the presentation. The Detector must determine whether an issue is a bug, a feature request, a permissions problem, a configuration issue, or another category. While the system can relatively easily identify bugs through server errors, null reference exceptions, or other clear indicators in logs, some bugs manifest as missing functionality rather than explicit failures. For example, a user might report being charged or not charged for a premium subscription without any clear error signature in the system. The challenge of accurately reproducing user state for such issues remains largely unsolved, and the team explicitly invites suggestions from the community on breakthrough approaches to this problem.

The second agent, which they refer to as Bilbo the Enricher, forms the heart of the system. This agent's sole responsibility is aggregating all relevant context across the organization's infrastructure, from static code analysis to live data in databases, traces, and logs. The enricher operates synchronously, sending requests to retrieve information based on the initial context from the user ticket. This agent represents the critical bottleneck for system quality - without comprehensive, relevant context, subsequent agents cannot produce effective solutions.

The third agent, the Coder, is described as relatively straightforward in implementation. Using Wix's internal infrastructure, though the presenter notes that many cloud agent solutions are now available off-the-shelf, the Coder receives a plan from the Enricher and executes it. The system spins up a Docker container via a pipeline, runs the coding agent with the plan, generates the actual code changes, creates a pull request, and then tears down the Docker environment. The Coder has access to two CLIs: an agent CLI for code manipulation and a GitLab CLI for repository operations. The key insight is that by this stage, with sufficient context and a clear plan, the coding itself becomes the easier part of the problem.

The fourth agent, the Reviewer, operates completely independently from the first three agents. It receives the original ticket describing the problem and the pull request generated by the Coder, then determines whether the solution actually addresses the stated problem without introducing new issues. The Reviewer checks for security vulnerabilities, assesses risk levels, and validates that the fix doesn't inadvertently add unnecessary code or create side effects. For example, if a fix touches a billing-related area, the Reviewer might flag that the risk of unintended consequences outweighs the benefit of the automated fix. The independent nature of this agent provides an important check - it's not biased by the context or reasoning of the previous agents.

## Workflow and Integration Patterns

The sequence begins with a trigger, either a cron job checking for new tickets every 30 minutes or manual initiation by engineers. Once a ticket is identified and classified as solvable, the system proceeds to the enrichment phase where resources synchronously gather comprehensive context. The Enricher then creates a plan based on this context, which gets passed to the Coder for execution in a sandboxed Docker environment. Finally, the Reviewer examines the resulting pull request independently to provide a verdict: either "done" meaning ready for human review, or flagged with specific risks or concerns requiring additional scrutiny.

Critical to production reliability, the system implements schema validation at each stage. Since agents are non-deterministic, they don't always return data in expected formats. When an agent completes its task, the system validates the output against a defined schema. If validation fails, the system implements retry logic, passing the error back to the agent along with the original context and essentially saying "you tried this, here's what failed, try again." This approach reduced inter-agent error rates from approximately 50% down to 1%, a dramatic improvement in system reliability.

The system also implements idempotency checks to avoid redundant work. If a bug has already been addressed and a fix is pending in the codebase, even if not yet deployed, the system detects this and avoids creating duplicate solutions.

## User Interface and Monitoring

Wix built a UI representing the different states of the system, providing visibility into the autonomous workflow. Engineers can observe tickets moving from blocked status, through progress as various enrichers gather information, to in-progress at the Coder stage, and finally to pull request creation awaiting human review. If at any point the system determines it cannot solve a particular issue, it moves the ticket to a blocked state for human intervention. This transparency allows human engineers to understand system behavior and intervene when necessary while maintaining confidence in the automated portions of the workflow.

## Unsolved Challenges and Future Directions

Beyond the classification challenge already mentioned, the second major unsolved problem involves organizational knowledge. When the team began showing generated pull requests to different Wix engineering teams, they received revealing feedback. One team explained they were migrating to a v2 system and didn't want fixes to v1. Another team noted they were working with a third-party vendor who needed to fix issues on their side, making the code fix irrelevant. These responses revealed vast amounts of institutional knowledge and "oral tradition" that had accumulated over years - knowledge that existed in design documents, drives, emails, or team memories but wasn't accessible to the autonomous system.

The team observed that tickets fell into two distinct categories. Relatively simple problems with sufficient context produced pull requests that could be merged after minimal feedback. But many problems involve services that are quite old with accumulated features and design decisions, where understanding the implications of changes requires historical context that simply isn't documented or is documented in formats the system can't access.

To address this, Wix is developing what they call CDK - organizational context or "the organization's brain." Each team possesses unique knowledge, both historical and ongoing, that is at risk of disappearing as bugs are fixed, services evolve, and design decisions fade from memory. The documentation challenge is twofold: ensuring knowledge is preserved at all, and ensuring it's preserved in formats the agent can access. If teams document everything in Google Docs stored in Drive, the agent needs appropriate access permissions.

Rather than forcing different teams to adopt a standardized documentation model, Wix is pursuing a protocol-based approach. Each team or group would build their own agent, and Gandalf would connect to these team-specific agents via a standardized protocol to request relevant knowledge given the context of a particular ticket. In their own team, they're building what they call the Historian agent, which documents every bug fix including the approach taken, the solution implemented, and the current state. The hypothesis is that solving and documenting 100 issues will make the 101st issue easier to resolve by providing relevant historical precedent.

## Development Evolution and Broader Vision

Looking beyond bug fixing, Wix sees this as one phase of becoming an "AI Native Company" with three evolutionary stages. The current self-healing system handles reactive problem-solving. The next phase, self-improving, would autonomously generate new features rather than just fixing bugs. With sufficient context about the previous 100 features built in a system, the agents might identify what the 101st feature should be, or use user voice feedback to understand what features users most want and implement them. The final stage would combine autonomous feature generation with autonomous bug fixing, approaching fully autonomous software development where human engineers become architects and final decision-makers rather than implementers.

The team developed the system using what they call SDD - Spec Driven Development. Before implementing any feature, they create a specification file, often with help from frontier models, describing what will be built. This spec undergoes review, is sent to the coding agent for implementation, and then to the reviewer for validation. This disciplined approach forces clear thinking about requirements before implementation begins and creates documentation as a natural byproduct of development.

The presenter mentions writing a blog post detailing how they made the agent understand it would be debugging itself in production, leading to better practices like adding appropriate logging and understanding where it was deploying code. This self-awareness in the agent design represents sophisticated prompt engineering and system design.

## Production Considerations and Tradeoffs

The microservices architecture keeps each component reusable. While the four agents combine to form the self-healing system, each can serve other purposes independently. The Coder, for instance, can execute any asynchronous background task, not just bug fixes. This modularity provides flexibility for future use cases.

The separation of agents, particularly having the Reviewer as a completely independent fourth agent rather than building review instructions into the Coder, reflects an important principle about attention and specialization. While theoretically everything could run on a single agent, giving each agent a specific, focused role with clear responsibilities produces better results. The analogy to human code review is apt - even when engineers are trusted and capable, organizations still require pull request reviews rather than allowing developers to merge their own code without oversight.

The acknowledgment of limitations is notable and refreshing. The presenter is transparent about the "almost" in the title, explicitly calling out the two major areas where the system still falls short. This honest assessment of production challenges provides valuable insights for others building similar systems. The classification problem and organizational knowledge problem represent common challenges in enterprise LLM deployments that extend well beyond Wix's specific context.

## Technical Maturity and LLMOps Practices

This case study demonstrates mature LLMOps practices including comprehensive monitoring, schema validation, retry logic, error handling, modular agent design, sandboxed execution environments, and careful separation of concerns between agents. The system handles non-deterministic agent behavior through validation and retries rather than assuming reliability. The Docker-based sandbox approach for the Coder provides isolation and cleanup, preventing half-completed or failed attempts from polluting the codebase.

The integration with existing infrastructure - GitLab for code management, Jira for issue tracking, existing databases via Trino, Grafana for observability - shows practical enterprise deployment rather than a greenfield proof of concept. The system works within Wix's existing development workflows, generating pull requests that enter the standard human review process rather than trying to completely replace human oversight.

The achievable goal of under 24 hours for issue resolution, rather than claiming full autonomy, reflects realistic expectations about human review needs in production systems. Engineers require time to assess automated changes, and this acknowledgment builds trust rather than promising unattainable full automation.

Overall, this represents a sophisticated, production-grade deployment of multi-agent LLM systems for software maintenance, with honest discussion of both capabilities and limitations that provides valuable lessons for practitioners building similar autonomous development systems.
