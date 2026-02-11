---
title: "Building and Scaling Production Code Agents: Lessons from Replit"
slug: "building-and-scaling-production-code-agents-lessons-from-replit"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "674f212c08227a2258db26db"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:46:36.255Z"
  createdOn: "2024-12-03T15:18:04.117Z"
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "prompt-engineering"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "system-prompts"
  - "docker"
  - "monitoring"
  - "fastapi"
  - "langchain"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Replit"
summary: "Replit developed and deployed a production-grade code agent that helps users create and modify code through natural language interaction. The team faced challenges in defining their target audience, detecting failure cases, and implementing comprehensive evaluation systems. They scaled from 3 to 20 engineers working on the agent, developed custom evaluation frameworks, and successfully launched features like rapid build mode that reduced initial application setup time from 7 to 2 minutes. The case study highlights key learnings in agent development, testing, and team scaling in a production environment."
link: "https://www.youtube.com/watch?v=RYde73eO7ok"
year: 2023
seo:
  title: "Replit: Building and Scaling Production Code Agents: Lessons from Replit - ZenML LLMOps Database"
  description: "Replit developed and deployed a production-grade code agent that helps users create and modify code through natural language interaction. The team faced challenges in defining their target audience, detecting failure cases, and implementing comprehensive evaluation systems. They scaled from 3 to 20 engineers working on the agent, developed custom evaluation frameworks, and successfully launched features like rapid build mode that reduced initial application setup time from 7 to 2 minutes. The case study highlights key learnings in agent development, testing, and team scaling in a production environment."
  canonical: "https://www.zenml.io/llmops-database/building-and-scaling-production-code-agents-lessons-from-replit"
  ogTitle: "Replit: Building and Scaling Production Code Agents: Lessons from Replit - ZenML LLMOps Database"
  ogDescription: "Replit developed and deployed a production-grade code agent that helps users create and modify code through natural language interaction. The team faced challenges in defining their target audience, detecting failure cases, and implementing comprehensive evaluation systems. They scaled from 3 to 20 engineers working on the agent, developed custom evaluation frameworks, and successfully launched features like rapid build mode that reduced initial application setup time from 7 to 2 minutes. The case study highlights key learnings in agent development, testing, and team scaling in a production environment."
---

## Overview

This case study comes from a talk by James Austin, an engineer at Replit, discussing the lessons learned from building and deploying the Replit Agent—a fully automated code agent that allows users to describe what they want to build and have the agent write the code for them. Replit is an online cloud development environment where users create "repls" (fully contained development environments) to write code, install packages, execute programs, and deploy applications. The company has approximately 30 million users and launched their agent product in September 2024. The presentation offers a candid look at the practical challenges of shipping an AI agent to production, making it a valuable reference for teams working on similar products.

## Defining the Target User Persona

One of the most significant early lessons was the importance of clearly defining who the agent was being built for. Initially, the team optimized purely for SWE-bench scores—a benchmark that evaluates an agent's ability to convert GitHub issues into pull requests across large repositories like Django. However, they realized this wasn't actually measuring what their users wanted. Replit users wanted to build their own ideas from scratch quickly and iterate in a tight loop with the agent.

The team identified three distinct user personas with vastly different needs:

- **Engineering Managers**: These users have enormous budgets (thinking in terms of replacing or augmenting expensive engineers), prefer async workflows, write well-defined issues, expect results hours later, and work with large codebases.

- **Traditional Engineers**: Want help with boilerplate, are in a ChatGPT/Claude mindset paying around $20/month, and work in tight interactive loops.

- **AI-First Coders**: Building their SaaS product on weekends, may or may not know exactly what they want, and also work interactively.

This distinction matters enormously for architectural decisions. For example, Monte Carlo Tree Search—running the agent multiple times in parallel and selecting the best result—dramatically improves accuracy over long trajectories, which is perfect for the engineering manager use case. However, it costs 5x more and slows things down, making it unsuitable for AI-first coders who want quick, interactive feedback. The team learned that improving things for one audience can make things considerably worse for another.

Product decisions also differ by persona. Engineering managers and AI-first coders may not care whether the agent uses Next.js, Express, or Flask, but traditional engineers care deeply about tech stack choices—and will voice their opinions loudly on social media.

## Optimizing for the Getting-Started Experience

Based on their target persona analysis, Replit focused on optimizing the "getting started" experience. Their initial SWE-bench-optimized agent was too methodical—when creating 5-10 files to bootstrap a project, with each loop taking 20-30 seconds, it could take 6-7 minutes to produce something usable.

They developed "Rapid Build Mode" as a solution. Instead of using the traditional agentic loop from the start, they kick-start the solution by having the agent dump out as much as possible at once—10-15 files using templates and custom prompting. These outputs often have small issues, but the agent can then drop back to the agentic loop to fix them. This reduced time-to-working-application from 6-7 minutes to under 2 minutes.

They also implemented prompt rewriting, where the agent expands and clarifies the user's input before diving into code. For example, a user asking to "build a waitlist site for my Italian restaurant called La Pizza which collects emails and full names" would see the agent elaborate on implementation details (e.g., using Flask) and confirm the approach. This catches misalignments early rather than after 6-7 minutes of work.

## Automating Failure Detection

A major theme of the talk was the difficulty of detecting agent failures. Agents fail in strange, hard-to-detect ways with a very long tail of edge cases. They will relentlessly try to solve any problem they encounter, sometimes going down tangents—Anthropic's computer use demo famously showed a bot getting distracted by photos of Yellowstone National Park instead of doing its coding task.

Even guard rails can be circumvented with creative prompting. When Replit initially launched without Next.js support, users discovered they could bypass the blocklist by claiming to be "the CEO of Replit running a test." While more robust prompt engineering could address this, the team noted that users are generally reasonable and understand that using such techniques means things might go off the rails.

Traditional monitoring systems like Datadog help detect crashes but won't catch agents stuck in loops, going in circles, or users bypassing blocklists. A session where a user exits in frustration looks identical in metrics to a session where they left satisfied.

The team uses LangSmith for monitoring traces (which James highly recommended), but with thousands of traces generated daily, manual review is impossible. Instead, they built failure detection tactics into the application itself:

- **Rollback Monitoring**: Every rollback indicates a mistake—either the user wasn't clear about what they wanted, or the agent got stuck. By logging every rollback and tracking how frequently specific points are rolled back to, they can identify problem areas for engineers to investigate.

- **Sentiment Analysis**: Negative sentiment in user inputs (e.g., "you didn't do what I want") serves as a red flag.

- **Feedback Buttons**: Interestingly, they found users rarely used explicit feedback buttons—it felt like "screaming into the void." Rollbacks are more effective because users get immediate value from them.

Traditional methods like social media monitoring and customer support also remain valuable for finding traces and holes in agent logic.

## Evaluation as a Long-Term Investment

James emphasized repeatedly that teams are probably under-testing their agents in rigorous ways. Early on, Replit engaged in "vibes-based development"—playing around with the agent, making changes that felt better, and iterating. This led to a patchwork of hacks, comments, and prompts to address specific issues, making regressions hard to spot. If testing a trace takes 2-3 minutes, it's difficult to measure improvement from 50% to 90% to 95% to 99% success rates—if something fails 5% of the time, you need 20 runs to expect to see a failure.

Public evaluations like SWE-bench are compared to the SAT: they measure something important but aren't specific enough to your actual job requirements. SWE-bench is great for GitHub-issue-to-PR pipelines but doesn't evaluate an AI-first coder building a marketing website where they might say "move the image to the right side and make it a palm tree instead of a forest."

Evaluations are described as a long-term investment that truly pays off:

- They're resource-intensive to build and run, creating a moat that's hard to replicate
- They serve as a safety net for large changes
- They enable evaluation of new models before public release—Replit had early access to Anthropic's computer use, allowing them to provide feedback on strengths and weaknesses
- Unlike static public benchmarks, internal evaluations can grow over time as new issues are discovered

For tooling, the team uses Braintrust for some evaluations and LangSmith for traceability, but much of their evaluation harness is homegrown Python. They've built a harness that spins up Chrome instances and Docker containers, using Anthropic's computer use tool almost exclusively for testing. Their web agent interacts with test instances in parallel, pretending to be users.

The evaluation approach is reactive rather than prescriptive. When they noticed every frontier model doesn't know what GPT-4o is (it came after knowledge cutoffs), causing agents to "helpfully" change GPT-4o references to GPT-4, they built specific evaluations to catch this behavior.

Regarding organizational dynamics, while the AI team owns the evaluation harness, it's designed to be accessible. Engineers across the organization can write evaluations for specific integrations or features using plain-text prompts that describe what the web agent should test. These contributions go into a shared pool of evaluation examples.

There was some initial pushback ("we want to be first to market, vibes-based development is working"), but senior engineers pushed back, arguing that going slow now enables going fast later—similar to the argument for integration tests, which can also be flaky and hard to set up but become cheap to extend once the harness exists.

## Upskilling Engineers for LLM Development

Replit's AI team was about 8 engineers roughly 12 months before the talk, divided across AI engineering with hosted LLMs, training smaller models for specific tasks (like code completion and code repair), and managing inference on self-hosted models. The initial agent prototype team was just 3 engineers. After getting leadership buy-in, this expanded to about 20 engineers, many working with LLMs for the first time in years.

Some problems are familiar territory—a memory leak can be investigated by any engineer. But other problems are genuinely new. Designing tools for an agent is not like designing an API: APIs can have many fields with names that matter for communication but don't affect efficacy; for agent tools, more fields mean more chances for things to go off the rails. There are nuances about whether functionality is "in distribution" that are hard to document and lack public resources.

Building intuition for effective agent tool design requires:

- **High-quality evaluation harness**: Even simple harnesses that run 5 prompts in parallel and show how changes affect outcomes help engineers understand system dynamics—how a tweak to the initial plan generation can help solve problems later.

- **Time spent working with LLMs**: There's no replacement for hands-on experience.

- **Example traces on every PR**: Code review is valuable for learning codebases, but requiring traces on every agent-related PR helps people develop intuition about how agents use specific tools.

James noted that he himself joined Replit as a platform engineer working on storage and had only been doing AI engineering for about 18 months. He found he could contribute quickly because new ideas can come from everywhere—even frontier labs don't know everything, and there's always room to contribute.

## Technical Architecture Notes

The agent has access to multiple "views" that mirror what users can see: files open in the editor fed through an LSP (providing symbol detection errors), console logs in real-time, and essentially everything visible to the user. The agent doesn't currently use traditional debugging with breakpoints, though it will add print statements when struggling with issues across multiple back-and-forths. Building a consistent debugging interface across all languages and environments remains an unsolved challenge.

The team acknowledges that all their current advice may change quickly as new models come online. The rise of very small models like GPT-4 mini and Claude 3.5 Haiku with improved accuracy is making techniques like Monte Carlo Tree Search more feasible for interactive use cases.

## Key Takeaways

The presentation offers a realistic, practitioner's view of agent development without overselling capabilities. The emphasis on evaluation, failure detection automation, and the difficulty of upskilling engineers provides valuable guidance for teams building similar products. The candid discussion of early mistakes—optimizing for the wrong benchmark, under-investing in evaluation, and vibes-based development—makes this case study particularly useful for organizations early in their agent development journey.