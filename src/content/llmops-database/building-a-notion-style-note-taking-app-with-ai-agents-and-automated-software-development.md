---
title: "Building a Notion-Style Note-Taking App with AI Agents and Automated Software Development"
slug: "building-a-notion-style-note-taking-app-with-ai-agents-and-automated-software-development"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "poc"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "devops"
  - "orchestration"
  - "documentation"
  - "monitoring"
  - "databases"
  - "anthropic"
industryTags: "tech"
company: "Software Factory"
summary: "Software Factory, in collaboration with Ona's CTO Chris, demonstrates building a complete Notion-style note-taking application called Memo using AI agents and automated software development workflows. The project showcases how AI agents can autonomously handle the entire software development lifecycle, from spec creation through deployment, achieving 52 closed pull requests in under a day. The system uses Ona's plan mode for iterative specification development, automated feature planning to decompose specs into GitHub issues, and continuous automation loops for code review, bug fixing, and quality assurance, demonstrating significant acceleration in development velocity while maintaining code quality through proper foundations and progressive escalation mechanisms."
link: "https://www.youtube.com/watch?v=yL3XEEF3Llw"
year: 2026
seo:
  title: "Software Factory: Building a Notion-Style Note-Taking App with AI Agents and Automated Software Development - ZenML LLMOps Database"
  description: "Software Factory, in collaboration with Ona's CTO Chris, demonstrates building a complete Notion-style note-taking application called Memo using AI agents and automated software development workflows. The project showcases how AI agents can autonomously handle the entire software development lifecycle, from spec creation through deployment, achieving 52 closed pull requests in under a day. The system uses Ona's plan mode for iterative specification development, automated feature planning to decompose specs into GitHub issues, and continuous automation loops for code review, bug fixing, and quality assurance, demonstrating significant acceleration in development velocity while maintaining code quality through proper foundations and progressive escalation mechanisms."
  canonical: "https://www.zenml.io/llmops-database/building-a-notion-style-note-taking-app-with-ai-agents-and-automated-software-development"
  ogTitle: "Software Factory: Building a Notion-Style Note-Taking App with AI Agents and Automated Software Development - ZenML LLMOps Database"
  ogDescription: "Software Factory, in collaboration with Ona's CTO Chris, demonstrates building a complete Notion-style note-taking application called Memo using AI agents and automated software development workflows. The project showcases how AI agents can autonomously handle the entire software development lifecycle, from spec creation through deployment, achieving 52 closed pull requests in under a day. The system uses Ona's plan mode for iterative specification development, automated feature planning to decompose specs into GitHub issues, and continuous automation loops for code review, bug fixing, and quality assurance, demonstrating significant acceleration in development velocity while maintaining code quality through proper foundations and progressive escalation mechanisms."
notion:
  pageId: "34ef8dff-2538-81bc-862f-ea230710f399"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:07:17Z"
---

## Overview

This case study documents Software Factory's live demonstration of building Memo, a Notion-style note-taking application, using AI agents and automated development workflows powered by Ona. Led by the project team in collaboration with Chris, Ona's CTO, the initiative showcases a production implementation of what they term a "software factory" approach, where AI agents handle most aspects of the software development lifecycle with minimal human intervention. Within less than one day of work, the system produced 52 closed pull requests and deployed a functional application to production at memo.software-factory.dev, demonstrating the potential for dramatic acceleration in software development velocity.

The project is particularly noteworthy for its transparency, being conducted as a live-streamed series where the team builds in real-time, allowing viewers to observe both successes and failures in applying agentic development practices. The team emphasizes that while the velocity gains are impressive, the true value lies in establishing proper foundations, controls, and escalation mechanisms to ensure quality doesn't suffer as speed increases.

## Technical Architecture and Workflow

The software factory approach implements a multi-stage workflow that mirrors traditional software development but with AI agents handling most execution tasks. The process begins with specification development using Ona's plan mode, proceeds through automated feature planning and issue creation, continues with autonomous implementation and testing, and includes continuous review and deployment loops.

### Specification Development with Plan Mode

The foundation of the entire system rests on comprehensive specification development. Rather than immediately executing on user prompts, Ona's plan mode takes a step back to understand requirements deeply through an iterative questioning process. When the team initially prompted the system to build a Notion-style note-taking app without extensive detail, the agent identified gaps in the requirements and engaged in a dialogue to clarify missing information.

For example, when the initial spec assumed the use of TipTap or Block Node for the rich text editor, the plan mode allowed the team to redirect the agent toward using Lexical instead. The agent then conducted its own research on Lexical to inform its implementation decisions. This research capability is automatically invoked as the agent explores technical decisions, helping ensure that choices are informed by current best practices and documentation.

The iterative nature of plan mode extends beyond simple question-and-answer exchanges. The agent reviews existing documentation in the repository, examines architecture decisions captured in files, and considers the overall product vision before proposing solutions. This thinking-first approach contrasts with execution-first modes and helps prevent the accumulation of technical debt from hasty implementation decisions.

The resulting product specification is substantially more detailed than the initial brief. It includes sections on technical decisions, authentication flows, workspace provisioning, page handling, editor configuration, search functionality, and clearly delineated scope boundaries. Importantly, the spec explicitly defines what is out of scope for the initial product, such as real-time collaboration, database views, and third-party integrations, helping the agents focus on core functionality first.

### Spec Commenting and Batch Instructions

An interesting feature of the workflow is the ability to add comments directly to specification documents. Users can hover over any section of the spec and add comments that either immediately send instructions to the agent or accumulate for batch processing. This commenting mechanism serves multiple purposes in the LLMOps context.

First, it allows human operators to provide feedback and corrections to the spec without breaking the agent's workflow. Rather than interrupting an in-progress implementation, users can mark up sections for future attention. Second, it enables batching of work instructions, which Chris notes is critical for extending the time between agent interruptions. By accumulating multiple feedback items and sending them together, users give agents larger chunks of work that can occupy them for longer periods.

This batching capability addresses a fundamental challenge in agentic workflows: agents can complete tasks surprisingly quickly, leading to frequent context switches as they repeatedly return to ask for new work. By lengthening the windows between human attention demands, the system moves closer to true background operation. Chris frames the evolution of agentic systems as progressively extending these time windows from minutes to hours, with the ultimate goal being agents that never need to explicitly request human input.

The commenting system works not just on specifications but also on code itself. Ona can review its own code and present findings as comments, creating a review experience that facilitates human oversight without requiring humans to proactively inspect every line. This self-review capability demonstrates how LLMs in production can be used to enhance quality assurance processes.

### Feature Planning and Issue Decomposition

Once a comprehensive spec exists, the next challenge is decomposing it into actionable development tasks. Software Factory addresses this through a feature planner automation that reads the product spec and translates it into individual GitHub issues. The feature planner operates as a prompted agent that considers the spec alongside existing guidelines, documentation, architecture files, and a labeling convention developed to help automations track issue status.

The decomposition process focuses on creating single-concern issues that can be implemented independently. This is particularly important during the initial development phase, where the team emphasizes sequential rather than parallel development. The agent recognizes dependencies between tasks and sequences them appropriately, setting up database infrastructure before authentication, establishing authentication before workspace features, and building the app shell before specific editing capabilities.

This sequential approach reflects a deliberate trade-off in the LLMOps strategy. While agents could theoretically work on many features in parallel once the codebase is more mature, the team prioritizes building solid foundations first. This prevents cascading failures where multiple parallel workstreams encounter the same underlying infrastructure problem, and it ensures that each new feature builds on verified, working components.

The feature planner also demonstrates awareness of appropriate issue sizing. Rather than creating monolithic tasks, it breaks features into manageable pieces that align with the agent's effective working scope. This sizing is crucial for production LLM applications because overly large tasks lead to context window challenges, loss of focus, and decreased quality, while overly small tasks create excessive coordination overhead.

### Label-Based Workflow Management

The automation system uses a GitHub label convention to track issue status and coordinate between different automation loops. Labels indicate whether an issue is awaiting triage, ready for implementation, in progress, blocked, or flagged for human review. This labeling system serves as a lightweight orchestration mechanism that allows different specialized agents to pick up work appropriate to their function.

For example, implementation agents look for issues labeled as ready for work, while review agents focus on pull requests. Bug-fixing agents monitor for issues labeled with specific bug indicators. This label-based approach has advantages over centralized orchestration in the context of the software development lifecycle, as it allows for loose coupling between different automation loops and makes the system more resilient to failures in individual components.

Importantly, the labeling system includes mechanisms for escalating to human attention. When agents encounter situations they cannot handle confidently, they apply labels that surface the issue to human operators. This progressive escalation is a key theme throughout the Software Factory approach.

## Automation Loops and Continuous Development

The production system operates through several continuous automation loops that monitor the repository and take action based on triggers. While the transcript focuses primarily on the PR review and bug fixer loops, it's clear that the architecture supports multiple specialized loops operating concurrently.

### Pull Request Review Automation

Every pull request generated by implementation agents automatically triggers a review automation. This review agent examines the proposed changes, evaluates code quality, checks for adherence to established patterns and standards, and leaves comments on the PR. The comments are visible in the repository, creating transparency into the review process and allowing humans to audit the agent's assessments.

The review automation implements a risk-based escalation model that represents a sophisticated approach to quality control in automated development. Not all changes are treated equally. The system assesses risk based on what parts of the codebase are affected, categorizing changes that touch authentication code or database schemas as high risk. Low-risk changes can be automatically approved by the agent and merged, while high-risk changes are escalated to human reviewers.

This risk ladder approach balances the benefits of automation with the need for human oversight on critical paths. It allows the system to operate at high velocity for routine changes while ensuring that potentially dangerous modifications receive appropriate scrutiny. Chris emphasizes that this progressive escalation is essential for organizations adopting agentic development, as attempting to achieve 100% automation from day one often leads to quality problems.

The review automation also contributes to the test quality improvements that Software Factory observes in their data. By consistently enforcing standards around test coverage across the test pyramid—unit tests, integration tests, and end-to-end tests—the automation helps build a robust quality foundation. This focus on testing is explicitly encoded in the spec and guidelines that instruct the agent, reflecting the team's philosophy that good foundations are essential for sustainable automated development.

### Bug Detection and Fixing Loop

Another critical automation loop focuses on bug detection and fixing. The system autonomously identifies bugs during implementation and creates corresponding issues. These bug reports are visible in the closed issues list for the repository, showing that agents are catching and addressing quality problems as part of their normal workflow.

The bug fixer automation operates with an interesting constraint during the initial development phase: it's instructed not to continue with dependent work until bugs attached to prerequisite issues are resolved. This ensures sequential integrity during foundation-building, preventing the accumulation of bugs across multiple features. Once the codebase is more mature, this constraint could be relaxed to allow for more parallel work, but during the zero-to-one phase, sequential bug resolution maintains quality.

The relationship between the bug fixer and the PR review automation illustrates how multiple loops coordinate through the shared GitHub state. When the review automation identifies problems, it can create bug issues that the bug fixer then picks up. When the bug fixer creates a fix, that fix goes through the review automation. This creates a feedback cycle that progressively improves code quality without requiring centralized orchestration.

### Triage and Assessment Loops

While not yet implemented for external contributions, the team discusses plans for triage automations that would handle issues filed by users. These triage agents would assess whether issues have sufficient detail, attempt to clarify ambiguous bug reports or feature requests, and potentially break down large user requests into multiple smaller, actionable issues.

Chris emphasizes that effective triage automation requires agents to assess their own confidence. An agent should evaluate whether it genuinely understands a user's request well enough to act on it, and if not, either gather more information or escalate to a human or a different specialized agent. This self-assessment capability is implemented through prompting that explicitly asks the agent to reflect on its confidence before taking action.

The triage workflow exemplifies the multi-stage, sieve-like processing that Chris recommends for production agentic systems. Rather than attempting to solve every problem in a single pass, the system progressively refines its understanding through multiple specialized steps, with clear escalation paths when uncertainty exceeds thresholds. This design pattern helps prevent the common failure mode where an agent misunderstands requirements but confidently implements the wrong solution.

## Quality Metrics and Observability

A significant portion of the discussion addresses how to measure quality in automated development systems. Chris acknowledges that the jury is still out on definitive metrics but shares early data that suggests quality is not suffering despite dramatic speed increases.

### Mean Time to Recovery

One key metric they track is mean time to recovery (MTTR) for incidents. Software Factory observes that MTTR is decreasing, meaning they resolve production issues faster than before. This improvement stems partly from agents helping with incident response, but Chris argues it also indicates that code quality isn't degrading. If the automated system were producing fragile code, MTTR would likely increase as incidents became more complex to diagnose and fix.

### Change Failure Rate

Another metric showing positive trends is change failure rate—the percentage of deployments that result in incidents or require rollback. Software Factory sees this rate decreasing, which Chris attributes to better test coverage. The agents are systematically writing more comprehensive tests across the test pyramid than human developers typically do, catching issues before they reach production.

This improvement in testing deserves careful interpretation. It doesn't necessarily mean agents write better code than humans, but rather that they more consistently follow testing best practices when properly instructed. The key is encoding those practices in the spec, guidelines, and skills that agents reference. Without that foundation, agent-generated code could easily lack adequate testing.

### The Importance of Foundations

Chris uses a vivid metaphor to describe the quality challenge: introducing agentic development to an organization is like strapping an afterburner onto an airplane. Either your aircraft is structurally sound enough to withstand the acceleration and you go four to five times faster, or you come undone in midair. The determining factor is foundation quality.

This perspective suggests that organizations should invest heavily in their development standards, guidelines, architecture documentation, and quality processes before pursuing aggressive automation. The agent amplifies whatever processes exist—good or bad. If testing is inconsistent, automation will produce inconsistently tested code faster. If architectural standards are unclear, automation will create inconsistently structured components at scale.

The Software Factory approach addresses this by being highly opinionated in their spec and guidelines. They don't just specify what features to build but also how to build them, what editor to use, what testing standards to enforce, and what patterns to follow. This opinionation guides the agents toward quality outcomes, but it requires human expertise to establish the right opinions in the first place.

## Workflow Extensions and Future Directions

The team discusses several extensions to their current workflow that would further reduce human involvement while maintaining quality and control.

### Progressive Time Windowing

A recurring theme is the goal of extending the time between agent interruptions. Current implementations might require human input every few minutes as agents complete tasks and request new work. The commenting and batching mechanisms extend this to potentially hours. The ultimate goal is agents that operate indefinitely in the background, only surfacing when they encounter genuinely novel situations or when significant milestones are reached.

This progression requires solving multiple challenges. Agents need larger and more complex work assignments that can occupy them for extended periods. They need better context management to maintain coherence across long-running tasks. They need more sophisticated self-assessment to avoid confidently pursuing incorrect approaches for hours before discovering the mistake. And they need robust escalation mechanisms so that when they do get stuck, they surface the right information to humans efficiently.

### Adversarial Verification

Chris mentions the possibility of using adversarial agents that verify other agents' work. This approach could involve having one agent implement a feature while another agent attempts to find flaws, security vulnerabilities, or edge cases that weren't handled. The verification agent would operate with different objectives and potentially different knowledge, providing a form of red team review.

Adversarial verification could be implemented as another automation loop that triggers on pull requests or deployments, complementing the existing review automation. It represents a more sophisticated quality assurance approach than simple checklist-based review, as the adversarial agent actively tries to break the implementation rather than just checking for compliance with standards.

### Skills and Reusable Patterns

The transcript mentions "skills" as one mechanism for encoding how agents should operate. While not elaborated in detail, skills likely represent reusable patterns or procedures that agents can invoke when appropriate. For example, a skill might encode the standard procedure for adding a new database migration, or the pattern for implementing authenticated API endpoints.

Skills complement specifications and guidelines by providing procedural knowledge rather than declarative requirements. They help agents operate more consistently and reduce the need to re-specify common patterns in every task. In a production LLMOps context, building a library of validated skills could significantly accelerate development while improving quality consistency.

## Critical Assessment and Limitations

While the Software Factory demonstration is impressive, several important caveats and limitations deserve consideration when evaluating this approach for production LLMOps applications.

### Selection Bias and Cherry-Picking

This is a live-streamed demonstration project, not a randomized controlled trial. The application being built is a relatively straightforward CRUD application with well-understood patterns. The team explicitly scopes out complex features like real-time collaboration. The developers are experts in both the problem domain and the agent tools they're using. All of these factors could inflate apparent success rates compared to what typical organizations might achieve.

The team deserves credit for conducting this work publicly and in real-time, which reduces some cherry-picking concerns, but viewers should be cautious about extrapolating results to more complex domains or less experienced teams.

### Foundation Investment Requirements

The approach requires substantial upfront investment in specifications, guidelines, architecture documentation, and automation configuration. Chris emphasizes this repeatedly, but organizations might underestimate the expertise required to create these foundations effectively. Writing a good spec that properly constrains agent behavior while allowing appropriate flexibility is a skill that requires both domain expertise and understanding of how LLMs operate.

Smaller organizations or teams without strong software engineering practices might struggle to create the foundations needed to make this approach successful. The risk is that they achieve high speed without the quality controls, resulting in the "coming undone in midair" scenario Chris warns about.

### Human Expertise Still Critical

Despite the automation, human expertise remains essential at multiple points. Humans make architectural decisions, choose technologies, define scope boundaries, review high-risk changes, and resolve situations where agents get stuck. The system amplifies human capability but doesn't replace it. Organizations expecting to achieve the same results with less experienced staff are likely to be disappointed.

### Observability and Debugging Challenges

While the system produces visible artifacts like GitHub issues and pull requests, understanding what's happening inside the automation loops and why agents make particular decisions could be challenging. The transcript doesn't address how operators debug situations where agents persistently make wrong choices or how they identify when the spec or guidelines need adjustment.

Production LLMOps systems need robust observability to track agent decision-making, identify patterns in escalations, and detect drift in quality metrics. The case study would be strengthened by more discussion of how Software Factory monitors and debuggets their automation loops.

### Cost Considerations

The transcript doesn't mention the computational costs of running these continuous automation loops. Having multiple agents constantly monitoring repositories, reviewing PRs, and implementing features likely involves substantial LLM API costs. Organizations would need to evaluate whether the velocity gains justify these expenses in their specific context.

### Generalization Beyond Greenfield Development

The demo focuses on building a new application from scratch, where there's no legacy code to accommodate and architectural decisions can be made cleanly. It's unclear how well this approach would work in large, legacy codebases with inconsistent patterns, complex dependencies, and extensive technical debt. The agents might struggle more in environments where the codebase doesn't match the idealized patterns in their training data.

## Lessons for LLMOps Practitioners

Despite these limitations, the Software Factory case study offers valuable lessons for organizations exploring production LLM applications in software development:

**Foundation investment is non-negotiable.** Organizations should invest in comprehensive specs, clear guidelines, robust testing infrastructure, and well-documented architecture before pursuing aggressive automation. Attempting to automate weak processes will only produce problems faster.

**Progressive escalation is essential.** Agents should assess their own confidence and escalate uncertain situations through a multi-tier system that ultimately reaches humans. Attempting to achieve 100% automation immediately leads to quality problems.

**Risk-based approaches balance automation and control.** Not all work carries equal risk. Automating low-risk changes while escalating high-risk modifications allows for high velocity without sacrificing safety.

**Batching work reduces context switching.** Giving agents larger chunks of work to complete independently extends time windows between interruptions and improves overall efficiency.

**Quality metrics require careful interpretation.** Improvements in MTTR and change failure rate are encouraging, but they reflect the specific context of this project. Other metrics like code complexity, maintainability, and long-term technical debt accumulation also matter.

**Transparency aids adoption.** Conducting this work publicly and showing both successes and struggles helps the community develop realistic expectations about what agentic development can achieve.

The Software Factory demonstration represents an ambitious application of LLMs in production software development, showing both the tremendous potential and the careful engineering required to realize that potential reliably.
