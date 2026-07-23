---
title: "Engineering the Software Factory: Why Model Training Limits Matter for Production Code Generation"
slug: "engineering-the-software-factory-why-model-training-limits-matter-for-production-code-generation"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "evals"
  - "harness-engineering"
  - "monitoring"
  - "cicd"
  - "documentation"
  - "anthropic"
  - "openai"
  - "cloudflare"
industryTags: "tech"
company: "HumanLayer"
summary: "This case study examines the challenges encountered by HumanLayer when attempting to deploy a \"lights-off\" software factory where AI coding agents generate production code without human review. The company discovered through their July 2025 experiment that while AI coding agents excel at creating new code, they systematically degrade codebase quality and maintainability over time due to fundamental model training limitations. The solution involved reverting to human-in-the-loop workflows with extensive upfront planning including product review, system architecture design, program design with call graphs, and vertical slicing to coordinate multi-repo implementations. This approach enabled faster development while maintaining code quality, leading to the development of HumanLayer's AI IDE and collaboration platform that implements these workflows."
link: "https://www.youtube.com/watch?v=Ib5GBkD555M"
year: 2026
seo:
  title: "HumanLayer: Engineering the Software Factory: Why Model Training Limits Matter for Production Code Generation - ZenML LLMOps Database"
  description: "This case study examines the challenges encountered by HumanLayer when attempting to deploy a \"lights-off\" software factory where AI coding agents generate production code without human review. The company discovered through their July 2025 experiment that while AI coding agents excel at creating new code, they systematically degrade codebase quality and maintainability over time due to fundamental model training limitations. The solution involved reverting to human-in-the-loop workflows with extensive upfront planning including product review, system architecture design, program design with call graphs, and vertical slicing to coordinate multi-repo implementations. This approach enabled faster development while maintaining code quality, leading to the development of HumanLayer's AI IDE and collaboration platform that implements these workflows."
  canonical: "https://www.zenml.io/llmops-database/engineering-the-software-factory-why-model-training-limits-matter-for-production-code-generation"
  ogTitle: "HumanLayer: Engineering the Software Factory: Why Model Training Limits Matter for Production Code Generation - ZenML LLMOps Database"
  ogDescription: "This case study examines the challenges encountered by HumanLayer when attempting to deploy a \"lights-off\" software factory where AI coding agents generate production code without human review. The company discovered through their July 2025 experiment that while AI coding agents excel at creating new code, they systematically degrade codebase quality and maintainability over time due to fundamental model training limitations. The solution involved reverting to human-in-the-loop workflows with extensive upfront planning including product review, system architecture design, program design with call graphs, and vertical slicing to coordinate multi-repo implementations. This approach enabled faster development while maintaining code quality, leading to the development of HumanLayer's AI IDE and collaboration platform that implements these workflows."
notion:
  pageId: "3a6f8dff-2538-806c-abf8-ead7aff40bf7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-23T20:46:00.000Z"
  lastEditedTime: "2026-07-23T20:46:00.000Z"
  publishedAt: "2026-07-23T20:50:19Z"
---

## Overview

HumanLayer's case study presents a critical examination of production AI coding systems and their limitations, drawing from the company's direct experience attempting to run a fully autonomous software factory. The speaker, presenting at what appears to be an AI engineering conference, provides a comprehensive analysis of why current coding agents fail to maintain production codebases over time despite impressive capabilities in generating initial code.

The company conducted a significant experiment in July 2025 where they went "full lights off" - removing human code review entirely and allowing AI agents to ship code directly to production. This real-world experiment revealed fundamental limitations in how large language models handle software maintainability, leading to degraded codebases, outages, and the need to manually debug "slop code" that had accumulated over months. This experience informed HumanLayer's development of a human-in-the-loop platform that balances AI acceleration with human oversight.

## The Evolution of Software Factories

The presentation traces the evolution of software development workflows from 2022 through the current agentic era. Traditional 2022 software factories involved human engineers building features, creating pull requests, conducting code reviews, and deploying to production with monitoring and user feedback loops. The key constraint was that both building and reviewing took hours to days, leading teams to invest in upfront planning and architecture discussions to reduce rework.

The agentic software factory replaces "someone builds the thing" with "an agent builds the thing," reducing building time from hours/days to minutes/hours. This includes orchestration, harnesses, sandboxes, and computer use capabilities. However, human code review still takes hours to days, creating a bottleneck. Companies responded by introducing agentic code review and agentic regression testing, accelerating these processes while still maintaining some human oversight.

The "lights-off" software factory represents the extreme end of this evolution, where companies eliminate human code review entirely. Teams no longer read code, instead investing heavily in testing, monitoring, and rollout infrastructure. The factory routes incidents and user feedback directly into the build queue, with the only human role being deciding what to ask the agent to build next.

## Industry-Wide Challenges

HumanLayer presents evidence of widespread problems with fully autonomous coding agents in production. A report from Farosai showed that since teams adopted AI coding tools in early 2025, pull request code review quality declined significantly with more comments, longer discussions, and many PRs merged without review. Incidents increased, bugs per developer increased, and codebases deteriorated faster than ever before.

The speaker references Mario from AI Engineer Europe who highlighted companies experiencing outages specifically due to coding agent mishaps. These are organizations that shouldn't be having such outages, indicating systematic problems rather than isolated incidents. The presentation challenges the narrative that these issues stem purely from user error or inadequate "harness engineering."

## Fundamental Model Training Limitations

The core thesis is that no amount of prompt engineering, loop engineering, or adversarial review can overcome what is fundamentally a model training issue. Current coding models are trained primarily on benchmarks that reward getting tests to pass, not on maintaining codebase quality over time.

The presentation provides insight into how coding agents are trained through reinforcement learning. Models like Claude Code became successful because they were trained directly against the harness they would be deployed in - the command-line interface with read, write, edit, grep, and bash tools. The speaker cites the OpenAI team noting that harness builders who don't own model weights and can't apply reinforcement learning within their harness will always be at a disadvantage compared to those who control both.

The reinforcement learning process for coding agents involves generating multiple traces attempting to solve a problem, scoring them on correctness (did tests pass), and updating weights to make successful behavior more likely while making unsuccessful behavior less likely. The dominant benchmark family, SWEBench and its variants, focuses on 15-minute tasks from open source repositories with binary rewards: did you fix the problem without breaking existing tests.

## The Maintainability Problem

The critical issue is that current training approaches provide no way to penalize poor program design or reward improvements to maintainability. Models optimize purely for making tests pass, leading to common antipatterns like unnecessary try-catch blocks, type casting just to satisfy the compiler, and code that technically works but makes the codebase harder to change over time.

HumanLayer frames this as Martin Fowler's "shotgun surgery" code smell - where making a change in one part of the codebase breaks other parts because of poor abstractions and coupling. The cost function of bad architecture is measured in months and years, making it extremely difficult to propagate reward signals back to the model training process. An agent might generate code that passes tests immediately but only reveals its maintenance burden months later when trying to make related changes.

The company emphasizes that models struggle particularly with "brownfield" codebases - traditionally meaning 10-year-old legacy systems, but HumanLayer found that agents struggle with codebases as young as 3-6 months old, especially given the pace at which AI-generated code accumulates. The speaker relates this to the experience of needing to dig into a codebase that hasn't been read in three months to debug an issue that no amount of advanced prompting could solve.

## Evaluation and Benchmarking Gaps

A significant challenge is the absence of good benchmarks for measuring a model's ability to maintain codebase quality. The presentation argues that current benchmarks don't capture the real-world constraints that matter for production systems. While verifying that code runs and tests pass is straightforward, verifying code quality and maintainability is orders of magnitude harder.

The speaker acknowledges emerging benchmarks that attempt to address this gap. SWE Marathon from Abundant AI tests 400-hour tasks like implementing all features of Microsoft Excel with sophisticated reward modeling. Deep Suite from Data Curve uses large tasks on open source repositories that weren't in the training set because they were never actually built. Frontier Code from Cognition involves multi-PR tasks with judges that penalize tests that don't fail on pre-patch code and evaluate whether code follows quality rules.

However, the fundamental limitation is that judge models can only evaluate what they understand, and if a model knew what good code looked like, it would likely write it in the first place. Review agents and throwing more tokens at the problem can raise the floor but remain constrained by what can be effectively taught during reinforcement learning.

## HumanLayer's Solution: Human-in-the-Loop with AI Assistance

Based on their experience, HumanLayer concluded that teams are "stuck reading the code" for now, but can still move fast with the right approach. They advocate for turning the lights back on - reinstating code review while using AI to accelerate the planning and alignment phases.

Their solution involves extensive upfront planning to reduce the probability of lengthy or difficult reviews. Small changes still go straight to agents, but larger features go through multiple planning stages:

**Product Review**: Understanding the problem being solved, desired behavior, and reviewing mockups. The speaker shared an example of a product review with mockups they were working on the previous day.

**System Architecture**: Defining component contracts, data models, and constraints. This includes high-level pictures of how systems fit together.

**Program Design**: This phase is emphasized as underemphasized in current agentic coding practices. Many assume that once architecture is right, models can simply execute, but HumanLayer found value in specifying types, method signatures, program layout, and call stacks. The speaker highlights Dylan Mullroy from Cloudflare who uses call graphs as part of his planning process.

**Vertical Slices**: Determining the order of implementation and multi-repo coordination. Models tend to produce "horizontal plans" that complete all of one type of work before moving to another, but vertical slicing ensures end-to-end functionality can be checked incrementally. Documentation includes tests and steps between each phase.

The key insight is that 30 minutes of pre-planning and alignment can save hours in review, making it feasible to read every line of code while still moving quickly. The problem isn't having too many pull requests but rather having too many bad pull requests. Good PRs aligned with upfront planning are a joy to review, while PRs requiring even 20% rework create emotional and intellectual burden on both reviewers and submitters.

## Production Workflow Architecture

HumanLayer's approach creates a workflow where alignment is faster because AI gathers information efficiently, code review is faster because teams aligned upfront, and coding is faster because AI does the implementation. This represents a balanced approach that leverages AI strengths while compensating for weaknesses.

The company frames this as engineering within constraints rather than waiting for future models to solve the problem. While acknowledging that GPT-7 or future models might eliminate these constraints, they focus on solving problems today given the current capabilities and limitations of available models.

## HumanLayer's Platform Development

Based on these learnings, HumanLayer is building an AI IDE and collaboration platform described as "building blocks for your software factory" and "a Figma for Claude Code and Cursor." The platform implements the collaborative workflows for doing this type of human-in-the-loop development with AI assistance.

The company is also working on better verifiers for software quality, addressing the benchmarking and evaluation gaps identified in their analysis. They position the platform as free for small teams and are actively seeking design partners and hiring founding engineers in San Francisco.

The presentation emphasizes that these are not theoretical concerns but practical lessons learned from deploying AI coding agents in production. The speaker encourages the community to use loops and seek leverage while understanding model limitations, focusing on solving hard problems in complex codebases rather than just vibe coding side projects.

## Broader Implications for LLMOps

This case study reveals several important considerations for deploying LLMs in production code generation contexts. First, there's a distinction between benchmark performance and production utility - models may excel at benchmarks while still degrading real codebases. Second, the training objective fundamentally shapes model behavior, and current objectives optimize for immediate correctness over long-term maintainability.

Third, reinforcement learning in production harnesses creates advantages for vertically integrated providers who control both the model and the tooling. Fourth, human oversight remains necessary not just for safety but for maintaining technical quality that current models cannot reliably evaluate themselves.

The presentation challenges the prevailing narrative that developers are bottlenecks who need to get out of the way, instead positioning human judgment as essential for maintaining codebase quality while AI accelerates specific phases of development. This represents a more nuanced view of human-AI collaboration in software engineering than the fully autonomous vision promoted by some vendors.

The case study also highlights the importance of workflow design in LLMOps - how the planning, implementation, and review processes are structured matters as much as model capabilities. HumanLayer's solution suggests that optimal AI-assisted development involves shifting human effort earlier in the process to planning and specification rather than late-stage review and debugging.
