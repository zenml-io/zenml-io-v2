---
title: "Transforming Product Development with AI-First Workflows and Agent Orchestration"
slug: "transforming-product-development-with-ai-first-workflows-and-agent-orchestration"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "prompt-engineering"
  - "evals"
  - "cicd"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "security"
  - "compliance"
  - "cache"
  - "continuous-integration"
  - "continuous-deployment"
  - "scalability"
  - "anthropic"
  - "openai"
industryTags: "finance"
company: "Coinbase"
summary: "Coinbase Wallet's product engineering team transformed their development lifecycle from traditional sprint-based processes to an AI-native approach, reducing time-to-production from 20-25 days to 1.8 days for mobile features. The solution involved building custom agentic tools including Forge (a background agent for code generation), SAIL (automated security review), and Tracer Bullet (end-to-end automation from idea to production). The team temporarily deleted their IDEs to force adoption of agent-first workflows, reorganized around \"pirates\" (0-to-1 builders) and \"architects\" (scale-focused engineers), and eliminated traditional ceremonies like sprints, standups, and PRDs. Results included a dramatic increase in pull requests per week, the ability to rebuild their entire app in one week with two engineers, and 73% more PRs merged without human intervention, while maintaining rigorous security standards through multi-agent code review councils."
link: "https://www.youtube.com/watch?v=Ei-p3wnWMac"
year: 2026
seo:
  title: "Coinbase: Transforming Product Development with AI-First Workflows and Agent Orchestration - ZenML LLMOps Database"
  description: "Coinbase Wallet's product engineering team transformed their development lifecycle from traditional sprint-based processes to an AI-native approach, reducing time-to-production from 20-25 days to 1.8 days for mobile features. The solution involved building custom agentic tools including Forge (a background agent for code generation), SAIL (automated security review), and Tracer Bullet (end-to-end automation from idea to production). The team temporarily deleted their IDEs to force adoption of agent-first workflows, reorganized around \"pirates\" (0-to-1 builders) and \"architects\" (scale-focused engineers), and eliminated traditional ceremonies like sprints, standups, and PRDs. Results included a dramatic increase in pull requests per week, the ability to rebuild their entire app in one week with two engineers, and 73% more PRs merged without human intervention, while maintaining rigorous security standards through multi-agent code review councils."
  canonical: "https://www.zenml.io/llmops-database/transforming-product-development-with-ai-first-workflows-and-agent-orchestration"
  ogTitle: "Coinbase: Transforming Product Development with AI-First Workflows and Agent Orchestration - ZenML LLMOps Database"
  ogDescription: "Coinbase Wallet's product engineering team transformed their development lifecycle from traditional sprint-based processes to an AI-native approach, reducing time-to-production from 20-25 days to 1.8 days for mobile features. The solution involved building custom agentic tools including Forge (a background agent for code generation), SAIL (automated security review), and Tracer Bullet (end-to-end automation from idea to production). The team temporarily deleted their IDEs to force adoption of agent-first workflows, reorganized around \"pirates\" (0-to-1 builders) and \"architects\" (scale-focused engineers), and eliminated traditional ceremonies like sprints, standups, and PRDs. Results included a dramatic increase in pull requests per week, the ability to rebuild their entire app in one week with two engineers, and 73% more PRs merged without human intervention, while maintaining rigorous security standards through multi-agent code review councils."
notion:
  pageId: "3b5f8dff-2538-804c-b433-d33a9a3e3291"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T12:26:00.000Z"
  lastEditedTime: "2026-08-07T12:26:00.000Z"
  publishedAt: "2026-08-07T13:07:18Z"
---

## Overview

Coinbase Wallet, the self-custody application from Coinbase, undertook a comprehensive transformation of their software development lifecycle around AI-native workflows and agent orchestration. Led by Chintan, who runs product engineering for Coinbase Wallet, the initiative fundamentally reimagined how teams build and ship products in a regulated financial services environment. The core thesis presented is that the traditional software development lifecycle is obsolete and should be replaced with a product development lifecycle where agents handle code generation and validation while humans focus on intent and validation of outcomes.

The transformation is particularly notable given Coinbase operates in a heavily regulated industry where security, compliance, and customer trust are paramount. This case study demonstrates how even organizations with stringent requirements can adopt aggressive AI-first approaches while maintaining necessary controls and review processes.

## The Problem and Initial State

Before the transformation, Coinbase Wallet faced the challenges common to many large engineering organizations. Bug fixes took 20-25 days on average to ship to production on mobile platforms, caught in cycles of sprint planning, meetings with product managers, and multi-stage review processes. The team questioned whether the traditional rhythm of two-week sprints, standups, PRD creation, and the handoff model between product, design, and engineering made sense in an era where AI agents could generate code rapidly.

Mobile development presented particular challenges compared to web, with longer build times, complex validation requirements, and device fragmentation making iteration cycles especially painful. The team recognized that while developers were using AI coding assistants like Claude, Cursor, and similar tools individually, the organizational processes and workflows had not evolved to match the new capabilities these tools enabled.

## The Stairway to AI Mental Model

The team developed a progressive maturity model they called "the stairway to AI" where each step compounds on the previous one. At the bottom are impressive demos that don't necessarily scale to production. The progression moves through individuals using AI coding tools to enhance their personal productivity, then to better project planning and issue tracking, then to building custom agents that can turn tickets into pull requests autonomously. Beyond a critical threshold, teams shift to "multiplayer mode" where agent coordination and orchestration become the focus. The most recent step added to their model is agent swarms, with the team continuously updating this framework every three to four months as capabilities advance.

Coinbase positioned themselves at the stage of having scaled their custom agent called Forge and now focusing on agent coordination challenges, with hundreds of agents running across their systems. They're deploying what they term ambient agents and night shift agents that work continuously without human intervention.

## The Key Metric: Time to Intent from Production

The team focused obsessively on a single metric they call "time to intent from production," defined as the duration from having an idea or identifying a need to getting it in front of users. This metric cuts across all the traditional intermediate measures and focuses purely on customer impact. For mobile specifically, they brought this metric down from 20-25 days to approximately 1.8 days for bug fixes and simple features, representing more than a 10x improvement in cycle time.

## The Critical Forcing Function: Deleting IDEs

A pivotal moment came around December 2025 when Claude Opus 4 was released, representing a step change in model intelligence. The team made a radical decision: they stopped all product shipping for 2.5 to 3 weeks and asked engineers to completely delete their integrated development environments. This forcing function was designed to push the organization to adopt an agent-first approach rather than treating AI as a supplement to traditional coding workflows.

The pause happened in January 2026, and during this period the team built new tools to replace traditional IDEs, developed multi-agent orchestration approaches, and discovered they could build features previously estimated at three months in a single day. The mindset shifted from "can agents do this?" to "what if we rebuilt everything around agents only?" The question became what blocks agents from doing more work, rather than whether agents should be used at all.

The results were dramatic. Metrics showed that pull requests per week had remained relatively flat for several years, with a visible plateau in February 2026 during the pause period. When work resumed with the new agent-first approach, the metrics skyrocketed, demonstrating that the cultural and process changes unlocked fundamentally different productivity levels.

## The Experiment: Rebuilding the Entire App in One Week

To test the limits of what agent-driven development could achieve, the team conducted an ambitious experiment: could two engineers rebuild the entire Coinbase Wallet app in one week, including brand new designs? The experiment succeeded in rebuilding approximately 85% of the application in that timeframe. While they chose not to ship this rebuild, the exercise proved that their existing codebase had not been designed with agents in mind and revealed numerous opportunities for improvement.

More importantly, this experiment shifted the question from whether agents could accomplish specific tasks to understanding what prevented agents from doing more. The focus became identifying and removing bottlenecks in the agent workflow rather than incrementally improving human workflows with AI assistance.

## Identifying and Removing Bottlenecks

The team went through an iterative process of identifying and fixing bottlenecks that emerged as code generation became trivial. Initially, code generation was the constraint, but once that was solved with capable language models, new bottlenecks appeared. Pull request review times became an issue. Then CI/CD pipeline times emerged as critical path items, with builds previously taking 30-40 minutes. The team shifted to cloud VMs with cached builds and repositories, reducing build times to under one minute.

GitHub Action runners proved problematic with memory issues and reliability problems, leading to the cloud VM approach. The team even explored "fast lane branches" where internal alpha builds on feature branches could skip continuous integration and testing entirely, allowing rapid iteration to find product-market fit internally before investing in production-grade implementation and testing for customer-facing releases.

Validation became the next frontier. With agents capable of generating thousands of pull requests per day, the bottleneck shifted to verifying that the code actually worked as intended. This led to significant investment in automated testing infrastructure, particularly for mobile platforms.

The ultimate bottleneck identified was input: crafting clear specifications about what to build and why. With agents handling implementation at high speed, the constraint becomes the quality of ideas and requirements definition.

## Cultural and Process Changes: Deleting Everything That Shouldn't Exist

The team took an aggressive stance on eliminating traditional software development ceremonies and artifacts. They deleted sprints entirely, along with standups, project kickoffs, PRDs, and the common pattern of engineers asking permission from product managers to fix obvious bugs. Figma as an entry point for discussion was eliminated. The philosophy was that if you want to move faster and give teams more agency, you must start by removing everything that no longer serves a purpose in an agent-enabled world.

The traditional workflow involved product defining requirements, design creating user journeys, handoff to engineering, implementation, then iterative back-and-forth about pixel-perfect adjustments and copy changes, often with scope creep emerging mid-implementation. This handoff model was replaced with a collaborative approach where everyone builds together, starting with specs or ideas, rapidly prototyping, and finding product-market fit internally before investing in polish.

The new philosophy emphasizes starting with prototypes that can be simple HTML mockups from the design system or directly in mobile, then validating internally before committing to production quality. This reduces the risk and cost of perfectionism in the specification phase when code is essentially free to generate. Polish is applied only to features that have proven their value through internal validation and usage.

## The Pirates and Architects Model

The team reorganized around two archetypes, neither of which writes code directly anymore. Pirates are 0-to-1 builders who talk to customers, ship working prototypes in under 24 hours, and kill their own ideas quickly when they don't work. They operate with a days-to-weeks time horizon. Architects think about durability, scalability, and extensibility with a time horizon measured in years, taking things from 1-to-infinity. 

Any project or feature should have at least one pirate, one architect, and one designer. These roles are not tied to job titles; engineers, product managers, or designers can act as pirates or architects depending on the context. This structure supports rapid experimentation while ensuring that successful features are built to last.

## Forge: The Custom Background Agent

Forge is Coinbase's in-house background agent, similar to tools like Shopify's River, Stripe's Minion, and Ramp's Inspect. It's custom-built to meet Coinbase's specific needs and security posture. Operating primarily through Slack given the company's heavy Slack culture, Forge enables developers to go from an idea mentioned in Slack to a pull request in approximately 12 minutes.

The workflow is straightforward: a developer posts a request to Forge in Slack, such as changing copy on a particular screen. Forge reports its progress back in Slack, and users can click through to a web interface that shows the agent's work. The system supports multiplayer mode where multiple engineers can collaborate on a session, including across multiple repositories. When Forge completes its work, it returns a mobile one-off build that can be scanned and tested immediately.

While the developer tests the build, automated agents in the background review the code for correctness and security. This shifts the developer's focus from reviewing diffs to validating that the functionality works as intended. One engineer, initially skeptical of Forge, used it to investigate a clipboard copy problem on Android. Forge discovered a complex Kotlin bug causing blank screen issues that would have taken the team weeks to identify through traditional debugging.

Forge can handle long-running, multi-day work across multiple repositories through simple Slack commands. The system includes evaluation infrastructure to validate its outputs, recognizing that everything in an agent-driven workflow needs measurement and validation.

## SAIL: Automated Security Review

Security automation is critical for Coinbase given its regulatory obligations and the importance of customer trust. The team built SAIL to provide consistent, thorough security review of pull requests. Security reviews previously took three days; with SAIL they complete in five minutes and run automatically when pull requests are opened.

SAIL uses a risk-based framework from A to Z. Z-level changes like copy or documentation updates have minimal risk and require minimal review. A5 represents the highest risk, particularly anything touching movement of money, which always requires human review and testing regardless of agent assessment. The intermediate risk categories are reviewed by councils of agents that adversarially examine code for issues.

This approach catches security issues more consistently than purely human review because agents don't suffer from attention fatigue and apply standards uniformly. The output is not a traditional diff view but rather an HTML report that highlights the risk of merging the code and identifies hotspots that require human attention. Engineers can then focus their testing and validation on the highest-risk areas.

SAIL reduced the human review burden substantially, allowing pull requests to proceed with one human reviewer plus SAIL and supporting agents, rather than requiring two to four human reviewers. This dramatically reduced merge times while maintaining or improving security standards.

## Tracer Bullet: Idea to Production

While Forge excels at generating pull requests and SAIL handles security review, developers were still context-switching between different tools and manually orchestrating the workflow. The team developed Tracer Bullet to create end-to-end automation from initial idea through to production deployment for clear, well-specified requirements.

Tracer Bullet operates on three principles: plan rather than prompt, let the agents cook, and scale horizontally. The system runs a pipeline of specialized skills or sub-agents. The first skill, event enrich, pulls relevant context from all available sources and creates a detailed specification of the work. Another skill generates Figma designs by pulling from the company's design systems. The execute plan skill spawns multiple agents that examine repositories, write code across multiple repos if needed, and create pull requests. Each step includes a handoff to the next stage in the pipeline.

The critical innovation is agent verify, which spawns a fleet of mobile simulators in the cloud, captures before-and-after videos, runs tests against the original specification, and posts results automatically to Slack for team dog-fooding. This allows features to be tested across the range of devices in the user base, such as different iPhone models, automatically identifying device-specific issues.

The emphasis on planning rather than prompting is crucial. Investing 20 minutes in a thorough plan yields far better results than iterative prompting. The plan serves as the contract for the work. When testing reveals issues, the discipline is to fix the plan and regenerate rather than manually patching the code, which would undermine the agent-first approach.

## Letting Agents Cook: The Importance of Context and Eyes

For agents to work effectively, particularly in mobile development, they need comprehensive context and the ability to observe outcomes. The team invested heavily in giving agents access to Metro logs and other runtime information. Without this observability, agent success depends on luck rather than systematic debugging and iteration.

The focus on reducing CI/CD time and improving caching directly supports agent effectiveness. Faster feedback loops allow agents to iterate more quickly and build mental models of what works. The team achieved 73% more pull requests merged without human intervention by optimizing the environment for agent success.

## Scaling Horizontally with Simulation Fleets

A demonstration showed Tracer Bullet running four cloud agents simultaneously, each with its own simulator testing on different iPhone models. The agents validated against the original specification, checking that a button change worked correctly across device sizes and models. The system can scale to 50 agents and simulators in the cloud, enabling comprehensive testing across the entire range of user device types.

The output is a report identifying which configurations passed and which failed, allowing the team to refine specifications and rerun the workflow. This horizontal scaling approach means that increasing complexity or test coverage doesn't linearly increase time; it's addressed by running more agents in parallel.

## Abstraction Shift: From Code Correctness to Branch Risk

A fundamental shift in how developers think about their work underpins the entire transformation. The team assumes agents handle code generation competently and that model intelligence will continue improving exponentially. Therefore, developers should not focus attention on code correctness. This doesn't mean shipping untested code; Coinbase maintains rigorous security and testing standards appropriate for a regulated institution.

Instead, attention shifts to two areas: intent (the what and why) and validation (testing the actual build). Developers no longer worry about individual pull request correctness but instead assess the health and risk of an entire branch. This abstraction makes sense because agents don't care about pull requests as a human construct; they write code to accomplish the goal regardless of how many PRs that requires. With potentially infinite PRs from agents, reviewing individual PRs becomes impossible, necessitating branch-level evaluation.

This shift represents a move from the software development lifecycle to a product development lifecycle. Software development is now a commodity capability handled by agents. The valuable human contribution is defining what to build, why it matters, and validating that it delivers the intended value.

## Challenges and Limitations

While the presentation emphasizes successes, some limitations are evident. The team rebuilt 85% of their app in a week but chose not to ship it, with the final 15% described as really hard. This suggests that while agent-driven development handles the bulk of standard implementation work, edge cases, integration challenges, and production polish still require significant effort.

The approach works best when specifications are clear. Tracer Bullet succeeds with well-defined requirements but the team identifies input quality as the next bottleneck. Ambiguous or evolving requirements likely still require human iteration and judgment.

The case study comes from a team with substantial resources to build custom tooling, significant cloud infrastructure for simulation fleets and VM-based builds, and the engineering capacity to fundamentally retool their development processes. Smaller organizations might struggle to replicate this approach without off-the-shelf tooling maturing further.

The cultural change required is substantial. Asking engineers to delete their IDEs, eliminating sprints and standups, and reorganizing around pirates and architects represents organizational risk that not all companies can or should take. The fact that the team conducts this retooling every three months suggests an environment of continuous disruption that requires particular organizational resilience.

## Recommendations and Philosophy

The presenter urges teams to experiment aggressively, specifically recommending that organizations compress their roadmaps and attempt to ship their most audacious feature in one day to learn what breaks and what works. Temporarily deleting IDEs forces teams out of their comfort zones and into agent-first thinking. The emphasis is on co-building rather than handoff workflows, with cross-functional teams locking themselves in a room to build together.

Three core principles emerge: planning is the real work now that coding is commoditized, agents need comprehensive context and observability to succeed, and organizations must build environments optimized for agents rather than expecting agents to fit into human-designed workflows. Perhaps most fundamentally, achieving velocity requires deleting processes and artifacts that no longer serve a purpose rather than just adding AI capabilities on top of existing practices.

## Balanced Assessment

This case study presents an aggressive, opinionated approach that achieved measurable results in a challenging environment. The 10x reduction in time-to-production and visible increase in pull requests per week suggest genuine productivity gains. The ability to maintain security standards through multi-agent review while accelerating dramatically demonstrates that speed and control need not be opposing forces.

However, the approach requires substantial investment in custom tooling, organizational willingness to embrace significant disruption, and cultural alignment around agent-first development. The presentation comes from an advocate enthusiastically promoting their approach, and some claims would benefit from independent validation and longer-term assessment. The sustainability of the three-month retooling cycle remains to be seen.

The emphasis on deleting traditional practices might alarm teams in less risk-tolerant organizations or those with different constraints. The approach appears optimized for a certain class of features and changes, and may not generalize to all types of development work equally well.

Nevertheless, this represents one of the more comprehensive transformations toward AI-native development processes documented to date, particularly in a regulated industry. The focus on systemic and cultural change rather than just tooling adoption offers valuable lessons for any organization attempting to leverage AI in software development at scale.
