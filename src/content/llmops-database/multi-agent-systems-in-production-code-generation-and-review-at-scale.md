---
title: "Multi-Agent Systems in Production: Code Generation and Review at Scale"
slug: "multi-agent-systems-in-production-code-generation-and-review-at-scale"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "high-stakes-application"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "cost-optimization"
  - "error-handling"
  - "model-optimization"
  - "latency-optimization"
  - "crewai"
  - "orchestration"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Cognition"
summary: "Cognition, the company behind Devin and Windsurf AI coding assistants, explores practical multi-agent LLM architectures for software development after initially advising against them. The problem they addressed was how to scale AI-assisted software engineering while maintaining coherence, managing costs, and improving code quality. Their solution involved deploying multi-agent systems where writes stay single-threaded but multiple agents contribute intelligence—specifically through code-review loops between separate coding and review agents, \"smart friend\" architectures pairing smaller fast models with larger expensive ones for selective escalation, and hierarchical delegation where manager agents coordinate child agents on larger tasks. Results include Devin Review catching an average of 2 bugs per PR with 58% being severe issues, successful cross-frontier model routing in production, and live deployment of hierarchical multi-agent systems handling week-long tasks spanning multiple PRs, though challenges remain in training models for effective cross-agent communication and delegation."
link: "https://cognition.ai/blog/multi-agents-working"
year: 2026
seo:
  title: "Cognition: Multi-Agent Systems in Production: Code Generation and Review at Scale - ZenML LLMOps Database"
  description: "Cognition, the company behind Devin and Windsurf AI coding assistants, explores practical multi-agent LLM architectures for software development after initially advising against them. The problem they addressed was how to scale AI-assisted software engineering while maintaining coherence, managing costs, and improving code quality. Their solution involved deploying multi-agent systems where writes stay single-threaded but multiple agents contribute intelligence—specifically through code-review loops between separate coding and review agents, \"smart friend\" architectures pairing smaller fast models with larger expensive ones for selective escalation, and hierarchical delegation where manager agents coordinate child agents on larger tasks. Results include Devin Review catching an average of 2 bugs per PR with 58% being severe issues, successful cross-frontier model routing in production, and live deployment of hierarchical multi-agent systems handling week-long tasks spanning multiple PRs, though challenges remain in training models for effective cross-agent communication and delegation."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-systems-in-production-code-generation-and-review-at-scale"
  ogTitle: "Cognition: Multi-Agent Systems in Production: Code Generation and Review at Scale - ZenML LLMOps Database"
  ogDescription: "Cognition, the company behind Devin and Windsurf AI coding assistants, explores practical multi-agent LLM architectures for software development after initially advising against them. The problem they addressed was how to scale AI-assisted software engineering while maintaining coherence, managing costs, and improving code quality. Their solution involved deploying multi-agent systems where writes stay single-threaded but multiple agents contribute intelligence—specifically through code-review loops between separate coding and review agents, \"smart friend\" architectures pairing smaller fast models with larger expensive ones for selective escalation, and hierarchical delegation where manager agents coordinate child agents on larger tasks. Results include Devin Review catching an average of 2 bugs per PR with 58% being severe issues, successful cross-frontier model routing in production, and live deployment of hierarchical multi-agent systems handling week-long tasks spanning multiple PRs, though challenges remain in training models for effective cross-agent communication and delegation."
notion:
  pageId: "351f8dff-2538-80ef-a47e-e03f502c6e7e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-29T07:01:00.000Z"
  lastEditedTime: "2026-04-29T07:01:00.000Z"
  publishedAt: "2026-04-29T13:46:25Z"
---

## Overview

Cognition, the company behind the Devin AI software engineer and Windsurf code editor, presents a detailed case study on deploying multi-agent LLM systems in production for software development tasks. This article, published in April 2026, represents an evolution in their thinking from a previous stance 10 months earlier when they argued against building multi-agent systems. The company now operates multiple multi-agent architectures in production serving enterprise customers, providing valuable insights into what actually works versus what remains theoretical.

The context for this evolution is significant growth in agent usage. Cognition reports an approximately 8x explosion in Devin usage over the last 6 months even among their most conservative enterprise segment. This growth created both "push" factors (users naturally experimenting with multi-agent setups, becoming bottlenecked on agent management and review) and "pull" factors (explosion of costs driving interest in achieving frontier capabilities at lower cost). The company's exploration of multi-agent systems occurs against the backdrop of larger, more expensive models (like the mentioned "Mythos" class) becoming necessary for frontier performance, making cost-effective architectures increasingly important.

## Core Philosophy: Context Engineering Over Prompt Engineering

A fundamental principle underlying Cognition's approach is what they call "context engineering" rather than "prompt engineering." They explicitly reject gimmicky techniques like telling models "you're a senior software engineer" or "think for longer" in favor of giving models the right context while assuming models become more capable over time. This philosophy proves especially challenging in multi-agent setups where context must be carefully managed across multiple agents.

Their guiding principles for multi-agent context engineering include: sharing as much context as possible between agents so they see the same information sources and maintain the same priors about overall tasks, and recognizing that actions carry implicit decisions about style, code patterns, and edge case handling that can conflict when multiple agents write in parallel. This second principle led to their key architectural insight: multi-agent systems work best when writes stay single-threaded and additional agents contribute intelligence rather than actions.

## Pattern 1: The Code-Review Loop

One of Cognition's most counterintuitive and successful production patterns involves having Devin write code and then having a separate Devin Review agent review that same code. On the surface, having a model review its own output seems unlikely to produce value, yet in practice Devin Review catches an average of 2 bugs per PR written by Devin, with approximately 58% classified as severe (logic errors, missing edge cases, security vulnerabilities). The system often loops through multiple code-review cycles, finding new bugs each iteration.

The surprising design choice that makes this work is that the coding and review agents intentionally do not share context beforehand. Cognition identifies several reasons for this counterintuitive approach:

**Philosophical justification:** While having one human both write and review code creates obvious bias problems, LLM agents are fundamentally systems that perform based on their context rather than entities with egos. Any shared bias comes from the training process, which Cognition assumes is high-quality, rather than from the psychological limitations humans face.

**Technical advantages of clean context:** The review agent having completely clean context enables it to go deeper into areas the original coding agent may not have fully explored. It's forced to reason backward from the implementation without the spec, allowing it to openly question things the original agent might have overlooked due to errors in user instruction (such as implementing an insecure pattern the user requested). 

**Attention mathematics and context rot:** Perhaps most importantly, the clean context makes the review agent "smarter" due to the mathematics of attention. Context rot is a well-documented phenomenon where models make less intelligent decisions at longer context lengths. Models have limited attention heads, and when working with growing context of instructions, prompts, code, and other information, important details may not be fully incorporated into decision-making. When a coding agent has worked for hours on a task—reading the repo, running commands, thinking about approaches, fixing errors—it builds substantial context. The dedicated review agent skips this extraneous context, looks only at the diff, and re-discovers necessary context by reading code from scratch. The shorter context leads to improved intelligence and increased detection of nuanced issues.

**Communication and synthesis:** The critical final component is the communication bridge between agents. The system requires that Devin properly use its broader context of user instructions and decisions to filter bugs that come back from Devin Review. This filtering prevents looping, disobeying users, and doing out-of-scope work. Cognition found that with dedicated prompting, current models can make reasonable judgment calls here, producing interesting three-way interactions between the coding agent, review agent, and humans.

This pattern represents a clear LLMOps success: a counterintuitive architectural choice (separate contexts rather than shared) that leverages fundamental properties of transformer attention mechanisms to improve production outcomes in a measurable way.

## Pattern 2: The "Smart Friend" Architecture

The second major pattern Cognition explored addresses a fundamental tension in production LLM deployment: frontier intelligence is becoming too expensive and slow for day-to-day tasks due to the shift toward larger models (like Anthropic's Opus-class models and the upcoming Mythos), yet smaller models may struggle when tasks prove more difficult than expected. The "smart friend" architecture attempts to get the best of both worlds by having a smaller, faster primary model that can selectively escalate to a larger, more expensive model.

**Initial implementation:** Cognition first tried this when launching SWE-1.5 in October—a 950 tokens/sec sub-frontier model. When paired with Sonnet 4.5 for "planning," they achieved some performance improvement while maintaining low cost and fast speeds. The architecture offered the smarter model as a "smart friend" tool that the primary smaller model could call, letting the primary model decide when situations were tricky enough to warrant consulting the expensive model.

**Challenge 1: Primary model communication:** Engineering the context transfer and communication proved tricky. The core difficulty is "how does a dumber model know it's at its limits?" Unlike the more popular inverted setup where a smart primary model delegates to smaller subagents, here the model making delegation decisions isn't the smarter one. 

Potential solutions include: encouraging the primary agent to always make at least one call to evaluate whether trickiness was missed, prompt-tuning or training the primary model to be more calibrated on delegation decisions, and providing domain-specific prescriptive guidance (like always invoking the smart friend for merge conflicts). The question of what context to share is also complex—sharing only a subset risks the smart model not being fully informed, while sharing everything may be inefficient. Cognition found that an 80/20 solution is sharing a fork of the full primary context and encouraging the primary model to ask broad questions like "what should I do?" rather than narrow ones.

**Challenge 2: Smart friend communication back:** Tuning the reverse communication direction can compensate for gaps in quality. For instance, if the primary model never examined an important file and asks about something requiring knowledge of that file, the right answer from the smart model is not to theorize (the default behavior) but to specifically instruct the primary model to investigate that file and ask again later. Cognition also found value in having the smart friend "over-scoped"—looking beyond the specific question to suggest important guidance based on the agent trajectory even when not explicitly asked.

**Honest assessment of results:** Cognition is refreshingly candid about the limitations. SWE 1.5 was "not good enough" as the primary model—the gap between it and Sonnet 4.5 was too wide in exactly the areas that mattered: knowing when to escalate and what to ask. While cost and speed wins were real, the quality ceiling was set by the weaker primary. The more recent SWE 1.6 (achieving Opus-4.5 level performance on SWE-bench) is meaningfully better and makes the pattern start to pay off, but still isn't where they want it. Cognition believes this is fundamentally a training problem, and future SWE models will be trained with this back-and-forth communication in mind.

**Where it did work:** The pattern succeeded across frontier models. Running Claude and GPT together in this setup in production for meaningful periods produced real gains in tricky scenarios. Interestingly, the prompt-tuning problems differ from the small-to-large case. Cross-frontier communication is less about a weaker model knowing when to ask a stronger one and more about routing to whichever model is best at specific sub-tasks—some models debug better, some handle visual reasoning better, some write tests better. The delegation logic becomes a capability router rather than a difficulty escalator.

This represents a clear LLMOps learning: the theoretically attractive pattern (cheap model escalating to expensive one) requires models specifically trained for this communication pattern, not just good prompting. The production-ready version today requires both models to be strong, fundamentally changing the cost equation.

## Pattern 3: Higher-Level Delegation and Hierarchical Agents

The natural extension of single-threaded writes with intelligence augmentation is to agents owning larger scope—a product feature spanning ten PRs, a migration touching multiple services, a week of work rather than an afternoon. This is live in Devin today as a manager-agent system.

**Architecture:** A manager Devin breaks larger tasks into pieces, spawns child Devins to work on them, and coordinates progress through an internal MCP (Model Context Protocol). The structure follows a map-reduce-and-manage pattern: a manager splits work, children execute, the manager synthesizes and reports back.

**Context engineering challenges:** Making this feel coherent required more context engineering than expected. Several issues emerged:

- Managers trained on small-scoped delegation default to being overly prescriptive, which backfires when the manager lacks deep codebase context
- Agents incorrectly assume they share state with their children when they don't
- Cross-agent communication—a sub-agent writing messages back to its manager to be passed to other agents—doesn't happen by default because models haven't been trained in environments where it was needed

Each of these issues required dedicated work to address, and Cognition acknowledges they're still improving all of them.

**Rejection of unstructured swarms:** Notably, Cognition explicitly rejects unstructured-swarm approaches where arbitrary networks of agents negotiate with each other as "mostly a distraction." They believe the practical shape is hierarchical map-reduce-and-manage. Making this type of system feel as coherent as a single agent working on a single task is at the center of their work in 2026.

## Synthesis: What Actually Works in Production

Across all experiments, Cognition identifies a consistent through-line: multi-agent systems work best today when writes stay single-threaded and additional agents contribute intelligence rather than actions. A clean-context reviewer catches bugs the coder can't see. A frontier-level smart friend catches subtleties a weaker primary misses. A manager coordinates scope across child agents without fragmenting decisions.

**The open problems are communication problems:** How does a weaker model learn when to escalate? How does a child agent surface a discovery that should change its siblings' work? How do you transfer context between agents without drowning the receiver? Cognition notes you can get "decently far" with prompting, but expects the next generation of models, including ones they train themselves, to start closing these gaps.

## Critical LLMOps Insights

Several aspects of this case study provide valuable lessons for production LLM deployment:

**Honest assessment of limitations:** Cognition's candor about what didn't work (SWE 1.5 as primary in smart friend) and what remains challenging (cross-agent communication) provides more value than many case studies that only highlight successes. This reflects mature LLMOps practice where understanding failure modes is as important as celebrating wins.

**Counterintuitive architectural choices:** The decision to give the review agent clean context rather than shared context contradicts intuition but leverages fundamental properties of transformer architectures (attention limitations, context rot). This represents sophisticated understanding of how LLMs actually work in production rather than how they theoretically should work.

**Training vs. prompting trade-offs:** The smart friend pattern's failure with SWE 1.5 despite extensive prompt engineering, and Cognition's conclusion that this is fundamentally a training problem, highlights a key LLMOps insight: some capabilities cannot be prompt-engineered and require models specifically trained for the interaction pattern. This has implications for organizations deciding whether to fine-tune or train custom models versus relying on prompt engineering with general-purpose models.

**Production metrics:** Cognition provides concrete metrics (2 bugs per PR, 58% severe, 8x usage growth) that ground the discussion in actual production outcomes rather than benchmark performance. The willingness to quantify results enables meaningful assessment of whether these patterns are worth the engineering complexity.

**Scale and cost considerations:** The explicit discussion of cost pressures driving multi-agent exploration, and the honest assessment that the cost benefits of smart friend require both models to be strong (undermining the cost advantage), reflects real production constraints rather than purely technical considerations.

**Model evolution assumptions:** The context engineering philosophy assumes models become more capable over time, which means engineering for the capabilities of future models rather than only current ones. This forward-looking approach is essential for production systems expected to have multi-year lifespans.

## Validation and External Signals

Cognition notes that Anthropic released a similar blogpost about multi-agent research systems the day after their original anti-multi-agent post, touching on similar challenges with context engineering and reaching similar conclusions about readonly agents being the first area of applicability. More recently, Anthropic launched a beta experiment letting smaller models call out to larger models in similar fashion to the smart friend pattern. This external validation from a major model provider suggests Cognition's findings reflect broader patterns in production LLM deployment rather than idiosyncrasies of their specific use case.

The case study represents sophisticated LLMOps practice: deploying complex multi-agent systems in production serving enterprise customers at scale, measuring concrete outcomes, identifying what works and what doesn't, understanding fundamental limitations of current approaches, and planning for how model training rather than just prompting will address those limitations. The focus on communication and context engineering as the central challenges reflects deep understanding of production LLM systems.
