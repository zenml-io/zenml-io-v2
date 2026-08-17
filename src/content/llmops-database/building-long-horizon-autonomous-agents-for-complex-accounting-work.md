---
title: "Building Long-Horizon Autonomous Agents for Complex Accounting Work"
slug: "building-long-horizon-autonomous-agents-for-complex-accounting-work"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "structured-output"
  - "document-processing"
  - "regulatory-compliance"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "harness-engineering"
  - "human-in-the-loop"
  - "system-prompts"
  - "evals"
  - "open-source"
  - "documentation"
  - "openai"
  - "anthropic"
industryTags: "finance"
company: "Basis"
summary: "Basis, a unicorn AI company, has developed autonomous agents capable of completing complex, multi-hour accounting tasks such as preparing entire tax returns end-to-end. The company addresses fundamental challenges in building long-horizon agents that operate reliably over extended periods, including managing context windows, ensuring process adherence over outcomes alone, and creating verification mechanisms for non-deterministic work. Through innovations like behavior specifications, process-based evaluation, and sophisticated ontology design, Basis has created agents that can work autonomously for hours to days while maintaining coherence and reliability, enabling them to handle tasks involving thousands of documents and inference steps in production environments."
link: "https://www.youtube.com/watch?v=54pwkcp48Lg"
year: 2026
seo:
  title: "Basis: Building Long-Horizon Autonomous Agents for Complex Accounting Work - ZenML LLMOps Database"
  description: "Basis, a unicorn AI company, has developed autonomous agents capable of completing complex, multi-hour accounting tasks such as preparing entire tax returns end-to-end. The company addresses fundamental challenges in building long-horizon agents that operate reliably over extended periods, including managing context windows, ensuring process adherence over outcomes alone, and creating verification mechanisms for non-deterministic work. Through innovations like behavior specifications, process-based evaluation, and sophisticated ontology design, Basis has created agents that can work autonomously for hours to days while maintaining coherence and reliability, enabling them to handle tasks involving thousands of documents and inference steps in production environments."
  canonical: "https://www.zenml.io/llmops-database/building-long-horizon-autonomous-agents-for-complex-accounting-work"
  ogTitle: "Basis: Building Long-Horizon Autonomous Agents for Complex Accounting Work - ZenML LLMOps Database"
  ogDescription: "Basis, a unicorn AI company, has developed autonomous agents capable of completing complex, multi-hour accounting tasks such as preparing entire tax returns end-to-end. The company addresses fundamental challenges in building long-horizon agents that operate reliably over extended periods, including managing context windows, ensuring process adherence over outcomes alone, and creating verification mechanisms for non-deterministic work. Through innovations like behavior specifications, process-based evaluation, and sophisticated ontology design, Basis has created agents that can work autonomously for hours to days while maintaining coherence and reliability, enabling them to handle tasks involving thousands of documents and inference steps in production environments."
notion:
  pageId: "3bcf8dff-2538-8082-a0a0-c1bf191bc1cc"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-14T06:37:00.000Z"
  lastEditedTime: "2026-08-14T06:37:00.000Z"
  publishedAt: "2026-08-14T06:56:48Z"
---

## Overview

Basis is building autonomous AI agents specifically designed to handle complex accounting work end-to-end, with their flagship capability being the preparation of complete tax returns. Co-founder Mitch Troyanovski provides deep insights into the practical challenges and solutions for deploying long-horizon autonomous agents in production environments where tasks can span hours or even days and involve thousands of steps.

The company chose accounting deliberately because it represents one of the largest knowledge work professions in the United States with over three million practitioners, and the work requires genuine reliability and correctness rather than just plausible outputs. Accounting serves as what Troyanovski describes as an "intelligence over the economy" - a compression activity that takes vast amounts of unstructured real-world economic activity and transforms it into structured information that stakeholders can use for decision-making.

## Defining Long-Horizon Agents

Basis defines an agent as AI inference that has agency to make decisions and take different actions. Long-horizon specifically refers to agents that must maintain coherence over extended periods beyond their working memory capacity. While a simple task like checking the weather might complete in seconds, implementing a software feature or preparing a tax return requires the agent to operate coherently for 10 minutes, 30 minutes, or much longer.

The fundamental challenge stems from how LLMs work: they have very large working memories but by default no short-term or long-term memory. This creates a critical engineering challenge analogous to the movie Memento, where the protagonist with memory loss must write notes to himself to maintain continuity. Similarly, long-horizon agents must use reasoning not just to solve the task at hand, but also to regulate their own data and environment to ensure the next inference step has what it needs to proceed effectively.

## Evolution of Agent Capabilities

The trajectory of agent development has progressed through several key milestones. The 2022 ReAct framework established the fundamental paradigm of reasoning and acting that still underlies modern agents. However, early attempts like BabyAGI in 2023 failed primarily because models at that time had limited context windows, poor attention over longer contexts, and weak reasoning capabilities that led to compounding errors.

Three breakthroughs fundamentally changed the landscape. First, Claude Opus 3 became the first model to truly understand content at long context lengths around 80,000-100,000 tokens, whereas previous models like GPT-4 Turbo could not effectively process information beyond about 20,000 tokens. Second, OpenAI's O1 demonstrated the power of inference-time compute and reasoning. Third, O3 proved that reasoning quality could improve with better training and more compute in the post-training phase, making each incremental reasoning token higher quality and more efficient.

The ability of reasoning models to titrate compute based on task difficulty proved crucial. In any trajectory, some decisions are extremely hard while others are trivial. Having a giant parameter model using maximum compute at every inference step is not feasible, but reasoning models can dial up compute dramatically for hard steps while moving quickly through easy ones. This also enables better self-healing behavior, as the model can pause and think deeply rather than operating purely on instinct through token generation.

## The Challenge of Non-Coding Domains

While coding became the first successful domain for autonomous agents, this success stems from multiple factors beyond just verifiable rewards. Code is verifiable at runtime cheaply and easily on local computers, it is highly text-based making it accessible anywhere, and critically, engineers can immediately test their work and get feedback on syntax errors and logical issues.

However, Basis argues that the overwhelming success in coding also reflects the massive quantity and quality of training data the labs have focused on for this domain, as well as the fact that engineering teams at AI labs naturally prioritize improving capabilities they directly use. The models have learned not just to write code that passes tests, but to exhibit good software engineering taste around architecture, file organization, and code quality.

For domains outside coding like accounting, several challenges emerge. First, determining what good looks like is far less obvious. Second, runtime verification is not as straightforward - you cannot simply compile a tax return and check if it runs. Third, the feedback loops are much longer. A complex 1065 tax return might require 20+ hours of actual human work time and involve processing 500-1,000 documents, mapping them against each other, performing research on specific tax questions, and compiling everything into complex Excel workbooks. This translates to thousands of inference steps before any outcome can be evaluated.

Additionally, the scarcity of training data presents fundamental limits. Even if you could access every real tax return in the country (which privacy regulations prevent), the order of magnitude would be tiny compared to the millions of synthetically generated math problems available for training. And synthetically generating realistic accounting scenarios requires creating diverse, realistic artifacts beyond just text, making data generation far more complex.

## Process Over Outcomes: The Core Philosophy

One of Basis's most important insights is that relying solely on outcome-based evaluation is fundamentally insufficient for long-horizon agents in complex domains. You might have 100 evaluations that all pass with perfect outcomes, but this does not mean the agent will generalize reliably to production or that it approached the work correctly.

Troyanovski provides a compelling example: an agent might answer a tax research question correctly 100 out of 100 times by using its pre-training knowledge or reading blog posts. But a real accounting firm would never hire someone who works this way - they require accountants to cite primary sources like the actual tax code. Even with perfect accuracy, the process matters because it determines trustworthiness, auditability, and long-term reliability.

This mirrors how human organizations actually work. Humans are already accustomed to working with non-deterministic systems - their coworkers. Companies and processes are designed to coordinate non-deterministic human entities to solve problems together. The same principles apply to agent design. Just as an engineer cannot simply submit a 1,000-line pull request with no explanation and expect approval even if it works perfectly, agents must optimize not just for getting work done but for making their decisions transparent and reviewable.

## Behavior Specifications: A Novel Approach

To address the limitations of outcome-only evaluation, Basis developed the concept of behavior specifications or behavior specs. The idea originated about two years ago when co-founder Matt conceived of "meta behaviors" - defining how agents should behave across all possible trajectories at a meta level before writing prompts.

A behavior spec is a markdown file that explicitly describes how an agent should behave in specific situations. These can be at varying levels of granularity. Examples include requiring agents to check primary sources from the IRS website for tax research, or rendering a PowerPoint as an image before returning it to catch formatting errors.

Critically, the behavior specs serve dual purposes. First, they function as alignment documents for humans on the team to agree on what behaviors are desired, recognizing that agent behavior is a subjective product decision, not just a technical one. Second, they serve as grading rubrics that judges (typically other LLMs) can use to evaluate whether agents exhibited the specified behaviors.

The behaviors are not shown to the agents themselves - they describe expectations at a meta level without necessarily encoding them directly in prompts. This provides flexibility in how specific to be. As an agent systems engineer, you decide whether to give high-level principles or specific instructions based on how well the guidance generalizes across situations.

Importantly, maintaining behavior specs requires discipline because each one creates state that must be kept updated, similar to maintaining code. You want to define only the most impactful behaviors that generalize broadly to production, not attempt to specify every possible aspect of the work.

## Judging Behaviors: LLMs as Process Evaluators

Evaluating behavior adherence requires sophisticated judges that can analyze entire agent trajectories. Basis implements behavior judging through agents rather than simple LLM calls because the task is inherently complex. The judge must examine potentially very long trajectories, understand the structure including nested sub-agents that might be seven layers deep, determine which agent to evaluate, locate the relevant portions where a behavior condition might have been triggered, and assess whether the behavior was properly exhibited.

This makes behavior evaluation currently quite expensive computationally. The judge needs access to trajectory maps, full historical context, and a clear understanding of both the behavior specification and the conditional logic for when it applies. Basis views improving judge efficiency and capability as an important area of ongoing research, including work on better trajectory labeling and filtering to reduce what judges need to process.

The question of who judges the judges remains relevant. Basis acknowledges they lack unlimited resources to perfect every judge, but they focus on building intuition about whether a judge's taste aligns with what humans consider correct. An interesting research direction involves potentially post-training judges specifically for evaluation tasks rather than using general-purpose models.

## Ontology Design: Creating Agent-Native Worlds

Ontology design represents another critical but often overlooked aspect of long-horizon agent systems. In coding agents, the codebase itself serves as the runtime training data (using Troyanovski's analogy where context equals runtime training data). The same agent might perform adequately on one codebase but spectacularly on another simply because the second codebase has better structure, clearer patterns, and fewer contradictions - better runtime training data.

For non-coding agents, the company building the agent controls the runtime training data, making ontology design even more critical. At the simplest level, an ontology is a file system structure, though it can incorporate additional metadata, graph relationships, embeddings, and other enrichments. As models become cheaper, more of this enrichment can be done through inference rather than deterministic preprocessing.

Ontology encompasses not just structural organization but also language - defining objects and concepts clearly to avoid confusion. For agents operating over very long horizons potentially spanning months, the ontology must organize not just static knowledge like skills and documentation, but also the accumulated lived experience of stateful agents. An agent that has been working for months might have extensive notes to itself organized in folders. When a new agent instance needs to resume work, it must be able to efficiently reconstruct the mental state from this ontology.

Basis emphasizes that internal documentation for agents must be treated like a codebase - deleting a crucial paragraph can break the agent just as deleting a line of code breaks a program. For companies using agents internally, establishing what is canonical versus non-canonical information becomes crucial. Just as a human joining a company could watch old sales calls but still not know the current sales strategy without accessing canonical documentation, agents need clearly defined canonical sources rather than potentially conflicting information scattered across tools like Linear, Gong, and Pylon.

## Context as Runtime Training Data

A fundamental mental model shift that Basis advocates is thinking about context engineering and agent building as analogous to training a model, except the training happens at runtime. People often think of prompts as just English instructions, but Troyanovski argues this is the wrong framework. Context should be viewed as training data for a model that learns at inference time.

Because the model learns at inference time, the total amount of training data available is far lower than what you would use for post-training a model - it is constrained by context windows and what the agent discovers in its trajectory. This makes data quality absolutely critical. You are essentially trying to ensure every piece of context is the highest quality possible to get agents to exhibit desired behaviors.

This perspective explains why sloppy context is worse than sloppy code - the English in context directly affects runtime performance, while code organization does not affect performance as long as the logic is equivalent. Yet many engineers treat code as precious and carefully architected while allowing their context to be disorganized, when the opposite priority would serve agent performance better.

## System Architecture and Sub-Agents

For very long tasks, Basis employs sophisticated orchestration including spawning sub-agents. This serves multiple purposes. First, it allows parallelization and specialization where different sub-agents can tackle different aspects of a problem. Second, it provides uncorrelated trajectories for review purposes - a reviewing agent should have fresh activation state rather than being biased by the trajectory that produced the work.

For especially difficult decisions, the system can spawn multiple sub-agents to attempt the same problem and vote on the outcome, throwing more compute at hard problems. This flexibility in how to structure agent systems - depth of nesting, when to spawn sub-agents, how to manage their communication and data sharing - represents a critical design space.

The harness itself - the infrastructure and tooling that surrounds the LLM inference - plays an enormous role. This includes what tools are available, what the environment looks like, how data flows between components, and how sub-agents coordinate. Building intuition about these system design questions requires treating agent building as systems engineering rather than just prompt engineering.

## Production Deployment and the Deployed Intelligence Team

Basis takes production deployment seriously enough to have created a novel organizational role: the Deployed Intelligence team. These are not field engineers building custom implementations, nor are they "agent PMs" using builder tools. Instead, they work closely with accounting firms to help them transition to working with autonomous agents.

The analogy Troyanovski uses is that deploying agents at a firm is like onboarding 300 brilliant alien employees who have no context about the firm. The DI team brings deep empathy and understanding of the accounting profession and helps firms reimagine their processes, business models, staffing, and operations to leverage AI effectively. This represents a recognition that the technology alone is insufficient - successful deployment requires organizational transformation.

The company also employs language architects and agent managers - roles that did not exist two years ago. Strong systems thinking emerges as the key skill for these positions. This can come from various backgrounds: excellent software engineers who design abstractions and architectures, lawyers who write statutes that must be interpreted correctly across millions of situations, or even people who build extremely complex Excel models. The common thread is the ability to think in abstractions that generalize across diverse situations.

## Model Evolution and Platform Stability

Basis maintains a clear mental model about how models are evolving, which helps them make stable architectural decisions despite rapid changes in the underlying models. Troyanovski emphasizes that having a model of the world and updating it as things change is crucial for building a company around agents rather than just experimenting.

The key insight is that models are essentially magic boxes that can accept large amounts of data, reason and learn at inference time, and return output including tool calls. Once you truly appreciate what this means, many architectural decisions follow logically. The magic box can call other magic boxes (sub-agents), string them together sequentially, or create uncorrelated instances for independent review. Each box has activation state that biases it toward its current trajectory.

Importantly, nothing paradigm-shifting has changed since O3's release. Everything since then has been within the same paradigm - improvements in quality, efficiency, and capabilities but not fundamental shifts in how agents work. This stability allows focused engineering rather than constant pivoting.

## Verifiable Rewards and Self-Improvement

While coding benefits from easily verifiable rewards (does the code pass tests?), and math problems similarly allow clear verification, accounting and similar domains present challenges. Basis addresses this by looking at how humans organize verification in the accounting profession. Humans have developed processes including independent review, deterministic checks (do the trial balances sum to zero? does the Excel contain errors?), and professional judgment about what looks obviously wrong to an expert.

These human verification processes can be encoded as both deterministic tests and LLM-based judges that evaluate whether something would be obvious to an accountant. This provides signal both for evaluation and potentially for future reward functions if Basis pursues reinforcement learning on their own models.

The company is actively researching how to "close the loop" - going from detecting that an agent made a mistake or performed suboptimally to automatically improving the system. Troyanovski expects significant progress by end of year 2026 on closing this loop. As models develop better theory of mind about themselves and other agents, they become better at orchestrating sub-agents and regulating their environments, and crucially, they may become better context engineers and harness engineers.

Currently, models are far worse at engineering agent systems than at engineering most software, because agent engineering is so novel it has minimal representation in training data. As models improve at this meta-level capability, the possibility emerges of agents that can take signal from behavior evaluations and other monitoring, and use that to improve their own context, tools, and harness in generalizable ways that do not overfit to specific instances.

## Open Source Contribution: Behavior Specs Standard

Basis has open-sourced their behavior specifications framework in collaboration with BrainTrust. The project provides a standard for defining behaviors in markdown format, example behaviors, and example judges that can be used out of the box. The goal is to establish an industry standard that observability and monitoring platforms can automatically integrate with.

For teams less advanced in agent development, the framework offers ready-to-use judges rather than requiring custom configuration. For sophisticated teams, it provides a flexible standard where behaviors can be very broad or very specific as long as they remain self-contained enough for a judge to evaluate whether the condition was met and the behavior exhibited.

Troyanovski hopes the community will contribute ideas around making better judges, improving trajectory labeling and dissection to reduce judge computational expense, and developing methods to make behavior evaluation scalable enough to run across all production traffic rather than just samples.

## The Bitter Lesson and Future Outlook

Basis fully expects that much of their current harness engineering and context engineering work will eventually be "swallowed up" by model capabilities - agents will simply be able to exhibit desired behaviors when told what they are, without extensive context engineering. Troyanovski estimates this will happen within five years but not within two years.

However, the company is in hyper-scale mode and cannot wait for the bitter lesson to arrive. They need agents performing tax returns reliably and accurately now. The work they are doing builds competency and market position while the technology is still in a transitional phase.

Moreover, Troyanovski argues that technical moats are not real moats for applied AI companies, just as Salesforce's moat has nothing to do with writing better SQL queries. The real moats are business moats - workflows owned, market position, being embedded in customer operations. The technology represents a temporary dislodgement that allows a startup like Basis to suddenly compete, but long-term success comes from business execution.

Even in a future with commodity advanced models, subjective preferences about how work should be done will matter. Different customers will care about different behaviors, quality-speed tradeoffs, and process requirements. Building the competency to deliver differentiated quality will remain valuable for the foreseeable future.

## Practical Advice for Agent Builders

Troyanovski offers several pieces of advice for builders. First, resist feeling powerless in the face of rapid changes. While the AI landscape evolves quickly with constant releases from Chinese labs and others, treating the underlying paradigm as stable allows better first-principles thinking. Understanding what the paradigm shift means and extrapolating from there leads to more coherent systems and better strategic bets than reactive ADHD-style responses to each announcement.

Second, build LLM intuition not primarily through reading papers or Twitter, but through extensive hands-on use in your own work. When an agent fails to automate something, dig into the limiting factor. Usually it is not raw intelligence but rather system design, context quality, or environment constraints. People who excel at automating their own work develop the strongest intuitions.

Third, remember that context affects performance while code organization does not (given equivalent logic). Treat your English with the same or greater care than your code. Too many builders obsess over code abstraction while allowing sloppy, disorganized context.

Finally, seek to build systems thinking capability on your team. This can come from diverse backgrounds - software architecture, legal drafting, complex financial modeling - but the core skill is the ability to create abstractions that generalize well across many situations. This is the foundation of effective agent design and management.

The Basis case study demonstrates that building production-ready long-horizon autonomous agents requires far more than just good prompts or powerful models. It demands sophisticated thinking about process versus outcomes, behavioral specifications and evaluation, ontology design, system architecture, and organizational change management. The company's innovations in behavior specs, process-based evaluation, and agent-native ontologies represent important contributions to the emerging discipline of LLMOps at scale.
