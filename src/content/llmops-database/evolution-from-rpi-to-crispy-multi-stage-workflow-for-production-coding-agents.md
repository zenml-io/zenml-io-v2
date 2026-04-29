---
title: "Evolution from RPI to CRISPY: Multi-Stage Workflow for Production Coding Agents"
slug: "evolution-from-rpi-to-crispy-multi-stage-workflow-for-production-coding-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "system-prompts"
  - "evals"
  - "langchain"
  - "documentation"
  - "anthropic"
industryTags: "tech"
company: "HumanLayer"
summary: "HumanLayer developed an improved methodology for deploying AI coding agents in production environments, evolving from their original Research-Plan-Implement (RPI) approach to a more sophisticated CRISPY (Context-Research-Implement-Structure-Plan-and-Yeah) framework. The problem they addressed was that while expert engineers achieved great results with RPI, the methodology failed to scale across teams due to inconsistent model behavior, instruction budget limitations, and insufficient human oversight leading to code quality issues. The solution involved decomposing monolithic prompts into smaller, focused stages with fewer instructions per prompt, introducing intermediate artifacts like design discussions and structure outlines for human-agent alignment, and critically, reintroducing mandatory code review. Results showed improved team adoption, better leverage through shorter review documents, and sustained 2-3x productivity improvements while maintaining code quality, though this required abandoning the initial vision of fully autonomous code generation."
link: "https://www.youtube.com/watch?v=YwZR6tc7qYg"
year: 2026
seo:
  title: "HumanLayer: Evolution from RPI to CRISPY: Multi-Stage Workflow for Production Coding Agents - ZenML LLMOps Database"
  description: "HumanLayer developed an improved methodology for deploying AI coding agents in production environments, evolving from their original Research-Plan-Implement (RPI) approach to a more sophisticated CRISPY (Context-Research-Implement-Structure-Plan-and-Yeah) framework. The problem they addressed was that while expert engineers achieved great results with RPI, the methodology failed to scale across teams due to inconsistent model behavior, instruction budget limitations, and insufficient human oversight leading to code quality issues. The solution involved decomposing monolithic prompts into smaller, focused stages with fewer instructions per prompt, introducing intermediate artifacts like design discussions and structure outlines for human-agent alignment, and critically, reintroducing mandatory code review. Results showed improved team adoption, better leverage through shorter review documents, and sustained 2-3x productivity improvements while maintaining code quality, though this required abandoning the initial vision of fully autonomous code generation."
  canonical: "https://www.zenml.io/llmops-database/evolution-from-rpi-to-crispy-multi-stage-workflow-for-production-coding-agents"
  ogTitle: "HumanLayer: Evolution from RPI to CRISPY: Multi-Stage Workflow for Production Coding Agents - ZenML LLMOps Database"
  ogDescription: "HumanLayer developed an improved methodology for deploying AI coding agents in production environments, evolving from their original Research-Plan-Implement (RPI) approach to a more sophisticated CRISPY (Context-Research-Implement-Structure-Plan-and-Yeah) framework. The problem they addressed was that while expert engineers achieved great results with RPI, the methodology failed to scale across teams due to inconsistent model behavior, instruction budget limitations, and insufficient human oversight leading to code quality issues. The solution involved decomposing monolithic prompts into smaller, focused stages with fewer instructions per prompt, introducing intermediate artifacts like design discussions and structure outlines for human-agent alignment, and critically, reintroducing mandatory code review. Results showed improved team adoption, better leverage through shorter review documents, and sustained 2-3x productivity improvements while maintaining code quality, though this required abandoning the initial vision of fully autonomous code generation."
notion:
  pageId: "351f8dff-2538-804c-8c74-d1d998d4741c"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-29T07:01:00.000Z"
  lastEditedTime: "2026-04-29T07:01:00.000Z"
  publishedAt: "2026-04-29T14:07:42Z"
---

## Overview

HumanLayer's evolution from RPI to CRISPY represents a significant case study in operationalizing AI coding agents at scale across organizations ranging from startups to Fortune 500 companies. The speaker, Dex, presents a candid retrospective on what went wrong with their initial Research-Plan-Implement methodology and how they systematically addressed these issues through better workflow design, context engineering, and human-agent collaboration patterns. The presentation occurred at a conference in 2026 and reflects learnings from thousands of engineers using their methodology and tooling since August of the previous year.

## The Original RPI Methodology and Its Failures

The Research-Plan-Implement methodology gained significant traction in the developer community, with approximately 10,000 people downloading prompts from their open source repository and implementing them internally. The approach involved three main stages: first, launching coding agent sessions to send sub-agents through deep vertical slices of the codebase to gather compressed, objective context about relevant code patterns; second, creating detailed implementation plans based on that research; and third, executing the implementation.

However, when HumanLayer worked closely with their users, they discovered critical failure modes. The methodology worked exceptionally well for expert engineers who spent significant time with the tools, but when these experts shared the approach with their teams, results were inconsistent. The core issues centered around three areas: poor research quality due to mixing objectives with implementation details, unreliable planning processes that skipped critical alignment steps, and insufficient leverage that required engineers to review thousand-line plan documents that would often diverge from actual implementation.

## The Instruction Budget Problem

A fundamental technical constraint emerged that explained much of the inconsistent behavior. Research cited from an archive paper showed that frontier LLMs could only follow approximately 150-200 instructions with good consistency. The original RPI planning prompt contained 85 instructions alone, and when combined with system prompts, tool definitions, and Model Context Protocol specifications, teams regularly exceeded the model's reliable instruction-following capacity. This meant that critical workflow steps, particularly the interactive design discussion that should have preceded plan generation, were being probabilistically skipped.

The manifestation of this problem was particularly stark in the planning phase. A well-functioning planning session would involve Claude asking the user to choose between design options, iterating on structure decisions, presenting an outline of implementation phases for approval, and only then generating the detailed plan. However, approximately 50 percent of the time or more, the model would skip directly to generating the complete plan without any interactive alignment. Users discovered "magic words" like "work back and forth with me starting with your open questions and outline before writing the plan" that would sometimes force the desired behavior, but this created an embarrassing situation where enterprise workshops had to teach incantations rather than robust engineering practices.

## Context Engineering Principles

The solution drew heavily on context engineering principles that HumanLayer had previously advocated in their "12 Factor Agents" framework. The key insight was to avoid using prompts for control flow when traditional programming control flow could be used instead. Rather than a single monolithic prompt trying to orchestrate all the different phases conditionally, they decomposed the workflow into multiple discrete stages, each with its own focused prompt containing fewer than 40 instructions.

This approach also addressed the "dumb zone" phenomenon, where context windows above approximately 40 percent utilization showed degrading performance. By splitting workflows across multiple fresh context windows rather than accumulating everything in one continuous session, each stage could operate in the high-performance region of the context window. The trade-off was more orchestration complexity, but the reliability gains proved worth it across diverse teams and skill levels.

## The CRISPY Methodology

The evolved methodology expanded from three stages to seven: Questions, Research, Design, Structure/Outline, Plan, Work/Implement, and Pull Request. The Questions stage runs in isolation to generate research questions based on the ticket, deliberately hiding the implementation goals from the research context. The Research stage then uses a fresh context window with no knowledge of what is being built, ensuring objective fact-gathering about current codebase patterns rather than opinion-laden suggestions.

The Design stage introduces a critical new artifact: a 200-line design discussion document that captures the current state, desired end state, relevant patterns to follow, resolved design decisions, and open questions. This represents what one engineer called the "design concept" - the shared understanding between human and agent extracted from the context window and made tangible in a reviewable artifact. This stage forces the agent to expose all its assumptions and findings before proceeding downstream, enabling what Dex calls "brain surgery on the agent" to correct misunderstandings early.

The Structure/Outline stage takes the approved design and creates a high-level overview of implementation phases and testing checkpoints. This serves as the equivalent of C header files compared to implementation - just enough detail to see what the agent is thinking without the full implementation details. Importantly, this stage helps combat the models' tendency to generate "horizontal plans" that complete all database changes, then all service layer changes, then all API changes, then all frontend changes. Instead, the outline enforces "vertical plans" with incremental slices that can be tested at checkpoints, mimicking how experienced developers build features by creating mock endpoints, wiring frontend, then gradually replacing mocks with real implementations.

The Plan stage then generates the traditional detailed implementation plan, but at this point, most alignment has already occurred through the design and structure phases. This becomes more of a tactical document for the agent to execute against rather than the primary alignment mechanism. Finally, the Work/Implement and Pull Request stages handle actual code generation and preparation for team review.

## The Code Review Mandate

Perhaps the most significant reversal in HumanLayer's approach was the explicit requirement to read and review all generated code. In August when they launched RPI, they advocated for not reading the code and trusting the plans. By the time of this presentation in 2026, Dex was emphatically recanting this advice, stating "we tried not reading the code for like six months, it did not end well, we had to rip out and replace large parts of that system."

The reasoning centers on professional responsibility and code quality. While open source projects like Beads and OpenClaw have shipped hundreds of thousands of lines without reading every line, production SaaS systems serving paying customers in regulated industries have different stakes. The distinction is between systems where breakage causes user frustration versus systems where engineers get paged at 3am and where code quality directly impacts business outcomes. Dex positioned 2026 as "the year of no more slop" and argued that the profession needs to maintain craft and quality standards.

The leverage argument also shifted. Initially, avoiding code review seemed like leverage - why read 1,000 lines when you can read a 1,000-line plan? But in practice, plans diverged from implementation, forcing reviewers to read both. Moreover, reviewing plans provided less effective steering than reviewing the earlier, shorter artifacts. A design discussion might be 200 lines compared to a 1,000-line plan, and a structure outline might be two pages instead of eight. These earlier artifacts provide better leverage for alignment while still requiring the final code review to ensure quality.

## Team Collaboration and Organizational Adoption

The methodology shows particular sophistication in how it facilitates team collaboration beyond individual engineer-agent interactions. The design discussions and structure outlines serve as excellent artifacts for asynchronous or synchronous review by code owners and technical leads. HumanLayer's own practice involves Dex sending design discussions to his co-founder, who owns most of the codebase, before implementation begins. This means any questionable architectural decisions get caught on the 200-line document before code is written and the engineer becomes attached to their solution.

This mirrors traditional software engineering practices like architecture review meetings and sprint planning, but with AI-generated artifacts capturing the shared understanding. The approach provides checkpoints where team members who don't personally own certain code repositories can weigh in on cross-cutting concerns. This addresses a common enterprise challenge where specialized knowledge is distributed across teams and no single person has complete context.

## Performance Expectations and Measurement

HumanLayer explicitly targets 2-3x productivity improvements rather than the 10x gains sometimes claimed in the industry. This reflects their emphasis on sustainable quality over raw velocity. The reasoning is that shipping code 10x faster matters little if that code needs to be replaced within six months due to quality issues. Better to achieve consistent 2-3x improvements while maintaining near-human quality levels.

The presentation references earlier work by Igor from a company using coding agents that found developers shipping 50 percent more code, but half of that was rework cleaning up problems from the previous week. This creates a treadmill where apparent productivity gains disappear into technical debt servicing. The data also showed that while AI coding tools excelled at low-complexity greenfield tasks, they struggled with high-complexity brownfield work in existing codebases. The CRISPY methodology specifically addresses this by providing better mechanisms for the agent to understand existing code patterns and align with them.

## Tooling and IDE Integration

While HumanLayer emphasizes that teams can implement these patterns without their specific tooling, they are building an IDE that orchestrates the CRISPY workflow. This reflects a broader LLMOps principle: the workflow and prompt engineering provide value, but productizing that into reliable, user-friendly tooling enables broader adoption. The challenge they face is similar to many LLMOps platforms - how to make sophisticated multi-stage agentic workflows accessible to teams without requiring deep expertise in prompt engineering and workflow design.

## Testing, Verification, and Open Questions

The presentation explicitly acknowledges that testing and verification remain unsolved problems requiring separate treatment. The structure outline's emphasis on testing checkpoints between implementation phases provides some scaffolding, but comprehensive testing strategies for AI-generated code remain an active area of work. The speaker directs interested parties to other talks focused specifically on testing approaches.

Several other open questions remain: how to measure the actual productivity impact in ways that account for code quality and sustainability rather than just velocity; how centralized platform teams can improve shared prompts and skills without regressing workflows for specific teams; and how to reduce the learning curve now that seven stages might seem more complex than three, even though the goal was improved accessibility.

## Critical Perspective on Industry Trends

Dex offers notably critical perspectives on certain industry trends. He expresses skepticism about "agent swarms" and highly autonomous systems that cannot ensure quality, arguing that 10x speed without quality assurance leads to waste. He directly challenges prominent voices in the community who advocate for not reading code, suggesting those approaches will require rollbacks within six months. This positions HumanLayer as taking a more conservative, quality-focused stance compared to more aggressive automation advocates.

The emphasis on formal verification and TLA+ as potential future directions shows awareness of more rigorous approaches, but the practical recommendation for teams shipping production code today is to maintain traditional review practices while using AI to accelerate specific workflow stages. This represents a middle ground between full manual development and fully autonomous code generation.

## Technical Architecture Patterns

The orchestration architecture follows a pattern of multiple context windows for different stages rather than one continuous session. While presented with columns on slides, the key distinction is whether stages share a context window or use fresh ones. Research runs in a fresh window isolated from implementation details. Design, structure, and planning build up context progressively but as discrete stages. The implementation phase likely involves additional complexity not covered in this presentation.

The approach to artifacts is particularly noteworthy - everything that matters gets extracted into static markdown documents rather than relying on built-in context compaction features. This allows resuming work from where it left off without concerns about compaction quality, and it makes the agent's thinking inspectable and version-controllable. These artifacts become the primary mechanism for human-agent alignment rather than conversational iteration within a single context window.

## Deployment Context and Scale

The methodology has been tested across thousands of engineers from small startups to Fortune 500 companies, providing validation across different organizational contexts. The open source distribution model meant many organizations adopted the approach independently, providing diverse feedback on failure modes. The evolution from RPI to CRISPY represents iterative improvement based on real production usage rather than theoretical concerns.

The fact that approximately 50 percent of users were getting poor results with RPI before the improvements highlights the challenge of deploying LLM-based workflows at scale. What works reliably for expert users may fail unpredictably for broader populations, and instruction budget constraints create probabilistic failures that are hard to debug. The solution required both technical improvements and reconceptualization of where leverage should come from in the workflow.

## Broader LLMOps Implications

This case study illustrates several important LLMOps principles that extend beyond coding agents. The instruction budget constraint suggests that any complex agentic workflow should be decomposed into multiple focused prompts rather than one monolithic orchestrator. The emphasis on extracting agent reasoning into inspectable artifacts rather than keeping it locked in context windows applies to many domains. The balance between automation and human oversight remains context-dependent based on stakes and consequences of failures.

The candid discussion of what didn't work and why provides valuable learning for the broader community. Many LLMOps deployments likely face similar challenges around reliability, consistent behavior across users, and the tension between full autonomy and quality assurance. HumanLayer's willingness to reverse their position on code review and acknowledge the limitations of their initial approach demonstrates the kind of empirical iteration necessary for maturing LLMOps practices.
