---
title: "Evolving AI Coding Agent Workflows from Research-Plan-Implement to CRISPY"
slug: "evolving-ai-coding-agent-workflows-from-research-plan-implement-to-crispy"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "error-handling"
  - "token-optimization"
  - "evals"
  - "human-in-the-loop"
  - "langchain"
  - "documentation"
  - "anthropic"
industryTags: "tech"
company: "HumanLayer"
summary: "HumanLayer developed an improved methodology for deploying AI coding agents in production environments, evolving from their original Research-Plan-Implement (RPI) approach to a new seven-stage framework called CRISPY (Context-Research-Iterate-Structure-Plan-sYnthesize). The original RPI methodology suffered from inconsistent results across teams, with engineers not reading generated code, plans becoming too complex to review effectively, and reliance on \"magic words\" in prompts to get proper agent behavior. By decomposing monolithic 85+ instruction prompts into smaller focused stages (under 40 instructions each), implementing explicit human-agent alignment checkpoints through design discussions and structure outlines, and advocating for engineers to read and own the actual code rather than lengthy plan documents, HumanLayer achieved more reliable 2-3x productivity gains while maintaining code quality and avoiding \"slop\" that would require future rework."
link: "https://www.youtube.com/watch?v=YwZR6tc7qYg"
year: 2026
seo:
  title: "HumanLayer: Evolving AI Coding Agent Workflows from Research-Plan-Implement to CRISPY - ZenML LLMOps Database"
  description: "HumanLayer developed an improved methodology for deploying AI coding agents in production environments, evolving from their original Research-Plan-Implement (RPI) approach to a new seven-stage framework called CRISPY (Context-Research-Iterate-Structure-Plan-sYnthesize). The original RPI methodology suffered from inconsistent results across teams, with engineers not reading generated code, plans becoming too complex to review effectively, and reliance on \"magic words\" in prompts to get proper agent behavior. By decomposing monolithic 85+ instruction prompts into smaller focused stages (under 40 instructions each), implementing explicit human-agent alignment checkpoints through design discussions and structure outlines, and advocating for engineers to read and own the actual code rather than lengthy plan documents, HumanLayer achieved more reliable 2-3x productivity gains while maintaining code quality and avoiding \"slop\" that would require future rework."
  canonical: "https://www.zenml.io/llmops-database/evolving-ai-coding-agent-workflows-from-research-plan-implement-to-crispy"
  ogTitle: "HumanLayer: Evolving AI Coding Agent Workflows from Research-Plan-Implement to CRISPY - ZenML LLMOps Database"
  ogDescription: "HumanLayer developed an improved methodology for deploying AI coding agents in production environments, evolving from their original Research-Plan-Implement (RPI) approach to a new seven-stage framework called CRISPY (Context-Research-Iterate-Structure-Plan-sYnthesize). The original RPI methodology suffered from inconsistent results across teams, with engineers not reading generated code, plans becoming too complex to review effectively, and reliance on \"magic words\" in prompts to get proper agent behavior. By decomposing monolithic 85+ instruction prompts into smaller focused stages (under 40 instructions each), implementing explicit human-agent alignment checkpoints through design discussions and structure outlines, and advocating for engineers to read and own the actual code rather than lengthy plan documents, HumanLayer achieved more reliable 2-3x productivity gains while maintaining code quality and avoiding \"slop\" that would require future rework."
notion:
  pageId: "33df8dff-2538-80d6-9e3b-faed85046817"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-09T17:53:00.000Z"
  lastEditedTime: "2026-04-09T17:54:00.000Z"
  publishedAt: "2026-04-09T18:00:52Z"
---

## Overview

HumanLayer developed and evolved a comprehensive methodology for deploying AI coding agents in production software development environments. The company initially released the Research-Plan-Implement (RPI) methodology around August of the previous year, which gained significant traction with approximately 10,000 people downloading their open-source prompts for internal use across organizations ranging from small startups to Fortune 500 enterprises. However, after working with thousands of engineers over several months, HumanLayer discovered significant operational challenges with their initial approach and developed an evolved seven-stage framework called CRISPY to address these issues.

## The Initial RPI Methodology and Its Challenges

The original Research-Plan-Implement approach was built around three main stages using AI coding agents. The research phase involved launching coding agent sessions that would send sub-agents through deep vertical slices of the codebase to gather compressed, objective context about the relevant parts of the system. The planning phase used a single monolithic prompt with 85 or more instructions to generate comprehensive implementation plans. The implement phase then executed the plan to generate code.

While expert engineers who spent extensive time (cited as 70 hours per week) with the system achieved excellent results, the methodology suffered from inconsistent outcomes when distributed to broader engineering teams. HumanLayer identified several critical problems through their hands-on work with users.

### Research Quality Issues

The research phase was compromised when engineers simply passed their ticket or feature description directly to the research agent. This caused the model to generate opinions rather than objective facts about the codebase. Skilled engineers would instead decompose tickets into specific questions about how endpoints work, logic flows, and relevant workers or services, allowing the agent to gather purely factual information without being biased by implementation ideas.

### Planning Inconsistencies and the "Magic Words" Problem

The planning prompt contained embedded steps for the agent to present design options, gather feedback on structure, and work iteratively with the user before writing the actual plan. However, approximately 50% of the time, agents would skip these crucial interaction steps and immediately generate complete plans without asking questions or gathering user input. This happened either because users didn't include specific prompt instructions or because the model was inconsistent in following all 85+ instructions.

HumanLayer discovered that users had to include phrases like "work back and forth with me starting with your open questions and outline before writing the plan" to reliably get the desired interactive behavior. This requirement for "magic words" became embarrassing for the company when conducting enterprise workshops, as it indicated fundamental usability problems with their tooling rather than user error.

### The Instruction Budget Constraint

A key technical insight emerged from research showing that frontier LLMs could only consistently follow approximately 150-200 instructions. When combining an 85-instruction planning prompt with Claude MDE system prompts, tool definitions, and MCP (Model Context Protocol) configurations, teams were significantly exceeding the instruction budget. This caused the model to only partially attend to instructions, resulting in unreliable workflow adherence and skipped steps.

### Plan Review Overhead Without Leverage

The original methodology advocated reading and reviewing the generated plans, which typically ran around 1,000 lines for features that would generate approximately 1,000 lines of code. Some teams even conducted pull request reviews on plans. However, this created several problems. First, the implemented code would often differ from the plan, requiring reviewers to read both the plan and the final code. Second, asking teammates to spend an hour reviewing a lengthy plan document didn't provide true leverage—it was nearly equivalent work to reviewing the code itself. Third, engineers who invested significant review effort in the plan became psychologically attached to it even when the implementation diverged.

### The Code Reading Debate

The presenter candidly acknowledged that in August they had advocated for not reading AI-generated code, suggesting that plans were sufficient for understanding what would be shipped. After six months of production experience, they reversed this position entirely. HumanLayer had to rip out and replace large parts of systems built without proper code review. While acknowledging impressive open-source projects like Beads (300,000+ lines of AI-generated code) and OpenClaw that were built without line-by-line code review, the presenter emphasized that production SaaS systems, particularly in regulated industries with paying customers depending on the code, required different quality standards. The talk positioned 2026 as "the year of no more slop," emphasizing craft over pure speed.

## The CRISPY Methodology: Seven Stages of Human-Agent Alignment

HumanLayer redesigned their workflow into seven distinct stages: Context (questions), Research, Iterate (design discussion), Structure (outline), Plan, sYnthesize (work tree), and Implement. This acronym-driven naming (CRISPY, evolving from the earlier RPI) represents a fundamental rethinking of how to structure AI coding workflows.

### Stage 1: Context - Question Generation

Rather than exposing the ticket or feature description to the research phase, the system now uses a separate context window to generate appropriate research questions. This deterministic step extracts questions like "how do endpoints work," "trace the logic flow for components touching X," and "find workers that handle Y" without allowing implementation opinions to contaminate the research phase.

### Stage 2: Research - Objective Fact Gathering

With the ticket intentionally hidden from the research context window, agents gather purely objective facts about how the codebase currently works. This maintains the original RPI goal of compressing truth about code structure without injecting premature implementation decisions. The research serves as a vertical slice through relevant parts of the codebase.

### Stage 3: Design Discussion - Early Human-Agent Alignment

The design discussion represents a major innovation for creating lightweight but high-value alignment checkpoints. This stage produces a roughly 200-line markdown document covering current state, desired end state, patterns to follow, resolved design decisions, and open questions requiring human input. 

The design discussion addresses a critical problem where coding agents would discover and replicate outdated or deprecated patterns in the codebase. By surfacing the patterns the agent found and plans to follow, engineers can redirect it toward preferred implementations before any code is written. The stage forces the agent to "brain dump" its understanding and assumptions, enabling what the presenter called "brain surgery on the agent" before downstream code generation.

This concept draws from ideas by Matt from PCO about "design concepts"—the shared understanding locked in a context window between human and agent regarding what's being built and how. The 200-line design discussion provides 5x better leverage than reviewing a 1,000-line plan, as it captures all the critical decision points at a much earlier stage.

### Stage 4: Structure Outline - Vertical Planning

The structure outline addresses another persistent problem: LLMs' tendency to generate "horizontal plans" that complete all database changes, then all service layer changes, then all API changes, then all frontend changes. This approach makes it difficult to verify correctness incrementally, as nothing fully works until all 1,200 lines of code are complete.

HumanLayer advocates for "vertical plans" that build complete thin slices of functionality iteratively—creating a mock API endpoint, wiring it to the frontend, implementing the service layer, adding the database migration, then connecting everything. This mirrors how experienced developers naturally work and creates checkpoints where functionality can be tested before proceeding.

The structure outline is deliberately kept high-level (approximately two pages versus eight pages for full plans), analogous to C header files showing function signatures and types without implementation details. It specifies the phases of work and testing checkpoints without diving into exact code changes. This provides sufficient detail for engineers to verify the agent's approach and correct misconceptions while remaining lightweight enough to review quickly.

### Stage 5: Plan - Tactical Implementation Document

With design and structure already aligned, the plan generation uses the same template and prompt as the original RPI approach but now builds on the previous artifacts. Because major decisions and structure have already been reviewed, engineers can spot-check the plan rather than conducting deep reviews, saving their detailed attention for the actual generated code.

### Stage 6-7: Implementation and Pull Requests

The presentation didn't cover implementation details in depth due to time constraints, noting this as a separate topic. However, the workflow culminates in generating code and creating pull requests with all the preceding context artifacts available for reference.

## Technical Architecture and Context Engineering Principles

### Prompt Decomposition and Control Flow

A fundamental principle articulated in the talk is "don't use prompts for control flow if you can use control flow for control flow." Rather than embedding complex conditional logic and multiple workflow paths into a single mega-prompt, HumanLayer's architecture uses the LLM for classification and routing, then directs work to specialized prompts with narrow instruction sets.

This approach references the presenter's earlier work on "12 Factor Agents" and the concept of context engineering. While many practitioners interpret context engineering as RAG pipelines and information retrieval, the presenter emphasized that the more important interpretation involves better instructions, simpler tasks, and smaller context windows.

The decomposition strategy reduced all prompts from the original 85+ instruction monolith to under 40 instructions each, with some potentially going even smaller. This respects the instruction budget constraint and dramatically improves reliability of workflow adherence.

### Context Window Management and the "Dumb Zone"

The presentation introduced the concept of the "dumb zone"—a degradation in model performance that occurs when context windows exceed approximately 40% utilization (around 80,000 tokens of the available 168,000 in Claude's 200,000 token window, accounting for output reservation). While results can remain acceptable at 60% utilization depending on the ratio of user messages to files and other factors, performance degrades as context fills.

Engineers are flooding context windows not just with information but also with instructions from multiple MCPs (Model Context Protocols), system prompts, and tool definitions. Even before reaching the task-specific instructions and code context, significant context budget is consumed by infrastructure.

For newcomers to AI coding agents, HumanLayer recommends keeping context under 40% and considering workflow wrapping at 60%. Experienced users who work 60+ hours per week with coding agents develop intuition for when to push context higher or keep it aggressively low based on task complexity and the ratio of instructions to information.

An important architectural decision is that HumanLayer doesn't rely on built-in context compaction. Instead, everything important goes into static markdown artifacts that can be reloaded into fresh context windows. This allows resuming work without depending on the quality of automatic or manual compaction and ensures critical decisions aren't lost.

### Multi-Stage Context Windows

The CRISPY workflow uses multiple context windows rather than maintaining a single long-running conversation. The question generation happens in one window, research in a fresh window without the ticket, design discussion builds on research plus the ticket, and so forth. While each stage may involve back-and-forth conversation (represented in presentation slides as single columns to indicate unified sessions), the transitions between major stages involve creating new context with selected artifacts from previous work.

This approach keeps individual stages focused, prevents context bloat, and ensures each stage has only the instructions and information relevant to its specific purpose.

## Organizational Adoption and Team Dynamics

### Distributed Decision-Making and Code Ownership

The methodology emphasizes collaborative planning even within teams using AI coding agents extensively. The presenter described their own practice of sending design discussions to their co-founder (the code owner for most of their codebase) before implementing features. This front-loads alignment and feedback to the 200-line design discussion phase rather than discovering disagreements during code review of completed implementations.

This mirrors traditional architecture review processes but adapts them for AI-assisted development. Rather than replacing human collaboration with agent autonomy, the approach uses agents to formalize and document design thinking more explicitly, creating better artifacts for team alignment.

### The Leverage Equation

HumanLayer's framework explicitly considers where time is actually saved in the development lifecycle. For a typical two-day feature, traditional coding might consume 2-4 hours, with the remainder spent on alignment, design discussion, code review, cross-team coordination, and testing/verification. Simply using Claude Code or similar tools to reduce coding time from 4 hours to 20 minutes doesn't change the two-day timeline because the other activities remain unchanged.

The CRISPY methodology applies AI assistance to the planning and alignment phases as well, reducing time spent in meetings and design discussions while simultaneously improving alignment quality through explicit artifact generation. With better upfront alignment, code review and rework are also reduced because reviewers already understand what's coming and have had opportunities to provide input.

The stated goal is achieving 2-3x productivity improvements while maintaining near-human code quality, rather than pursuing 10x speed increases that generate "slop" requiring eventual replacement. This reflects a mature understanding that pure velocity without quality consideration creates technical debt and rework that negates apparent gains.

### Training and Adoption Challenges

The evolution from three stages (RPI) to seven stages (CRISPY) potentially increases adoption complexity. The presentation acknowledged this concern but didn't provide detailed solutions within the talk's scope, noting it as a topic for future discussion. The tension between making workflows more reliable (through decomposition) and making them easier to learn represents an ongoing challenge in LLMOps.

## Quality Philosophy and Production Standards

### The "No Slop" Movement

The presentation strongly positioned itself within a 2026 movement toward code quality and away from rapid generation of low-quality output requiring eventual replacement. References to "slop versus craft" suggest a maturing industry conversation about sustainable AI-assisted development practices.

The presenter expressed skepticism toward agent swarms and highly autonomous systems without quality control mechanisms, arguing that 10x speed is meaningless if output must be discarded within six months. This represents a deliberate business and technical decision to optimize for sustainable velocity rather than headline-grabbing metrics.

### Code Review as Professional Responsibility

The most emphatic points in the presentation centered on the necessity of reading AI-generated code when building production systems with paying customers, particularly in regulated industries. The presenter acknowledged impressive accomplishments in open-source AI-generated projects but distinguished between different risk profiles and stakes.

The argument positions code review not as a temporary measure until models improve but as a professional responsibility for engineers shipping production systems. This stance runs counter to some current industry messaging around fully autonomous coding but aligns with organizations prioritizing reliability and maintainability.

## Measurement and Continuous Improvement

The presentation acknowledged but didn't resolve several open questions around measuring and improving AI-assisted development:

- How to measure the actual impact of methodology changes on team productivity, given that developer productivity measurement has been challenging for 50 years
- How central platform teams can improve shared prompts and skills without breaking or regressing workflows for individual teams
- How to enable teams to benefit from each other's learnings in a consolidated way

These questions reflect the organizational complexity of deploying LLMOps practices across diverse teams with varying needs and contexts.

## Tools and Infrastructure

While the presentation focused primarily on methodology rather than specific tooling, HumanLayer is developing an IDE that orchestrates the CRISPY workflow. The presenter emphasized that the value can be achieved without their specific tooling—the principles of prompt decomposition, human-agent alignment checkpoints, and explicit artifact generation can be implemented with various tools.

References to Claude (Anthropic's model) appeared throughout as the primary LLM being used, with mentions of Claude Opus 4.5 and Claude Code as specific tools. The methodology appears designed to work with frontier LLMs generally, with the instruction budget and context window management principles applying broadly.

## Industry Context and Evolution

The presentation situates itself within a rapidly evolving landscape of AI coding tools and practices. References to competing approaches include the "software factory" concept from companies like StrongDM that advocate for never having humans read generated code, instead relying entirely on evaluation and formal verification. The presenter expressed interest in formal verification approaches like TLA+ and experimental TLA++ but maintained that current production needs require human code review.

The talk demonstrates a willingness to publicly revise earlier positions based on production experience—explicitly acknowledging that advice given in August and November of the previous year proved incorrect after several months of real-world usage. This intellectual honesty and emphasis on empirical learning from production deployments represents a mature approach to an immature and rapidly changing field.

The evolution from RPI to CRISPY reflects broader industry learning about the operational challenges of deploying LLMs in production software development, moving from initial enthusiasm about autonomous generation toward more nuanced workflows that optimize for sustainable quality and team collaboration alongside raw productivity gains.
