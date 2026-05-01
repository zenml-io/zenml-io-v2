---
title: "Replacing Complex Feature Implementation with Prompt-Based Skills: Git Worktrees in Production"
slug: "replacing-complex-feature-implementation-with-prompt-based-skills-git-worktrees-in-production"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "system-prompts"
  - "human-in-the-loop"
  - "evals"
  - "documentation"
  - "open-source"
  - "anthropic"
  - "openai"
  - "harness-engineering"
industryTags: "tech"
company: "Cursor"
summary: "Cursor replaced a complex git worktrees feature consisting of approximately 15,000 lines of code with a markdown-based skill implementation of roughly 40 lines. The original feature enabled parallel agent work across isolated git checkouts with sophisticated management, judging, and cleanup systems. By leveraging two existing primitives—agent skills and sub-agents—the team reimplemented both the worktree and best-of-n features using primarily prompt engineering. While the new approach significantly reduced maintenance burden and enabled new capabilities like multi-repo support and mid-chat switching, it introduced challenges around model reliability in staying within designated worktrees, particularly for smaller models and longer sessions. The team is addressing these limitations through evaluation frameworks, reinforcement learning improvements, and continued prompt refinement."
link: "https://www.youtube.com/watch?v=WE_Gnowy3uw"
year: 2026
seo:
  title: "Cursor: Replacing Complex Feature Implementation with Prompt-Based Skills: Git Worktrees in Production - ZenML LLMOps Database"
  description: "Cursor replaced a complex git worktrees feature consisting of approximately 15,000 lines of code with a markdown-based skill implementation of roughly 40 lines. The original feature enabled parallel agent work across isolated git checkouts with sophisticated management, judging, and cleanup systems. By leveraging two existing primitives—agent skills and sub-agents—the team reimplemented both the worktree and best-of-n features using primarily prompt engineering. While the new approach significantly reduced maintenance burden and enabled new capabilities like multi-repo support and mid-chat switching, it introduced challenges around model reliability in staying within designated worktrees, particularly for smaller models and longer sessions. The team is addressing these limitations through evaluation frameworks, reinforcement learning improvements, and continued prompt refinement."
  canonical: "https://www.zenml.io/llmops-database/replacing-complex-feature-implementation-with-prompt-based-skills-git-worktrees-in-production"
  ogTitle: "Cursor: Replacing Complex Feature Implementation with Prompt-Based Skills: Git Worktrees in Production - ZenML LLMOps Database"
  ogDescription: "Cursor replaced a complex git worktrees feature consisting of approximately 15,000 lines of code with a markdown-based skill implementation of roughly 40 lines. The original feature enabled parallel agent work across isolated git checkouts with sophisticated management, judging, and cleanup systems. By leveraging two existing primitives—agent skills and sub-agents—the team reimplemented both the worktree and best-of-n features using primarily prompt engineering. While the new approach significantly reduced maintenance burden and enabled new capabilities like multi-repo support and mid-chat switching, it introduced challenges around model reliability in staying within designated worktrees, particularly for smaller models and longer sessions. The team is addressing these limitations through evaluation frameworks, reinforcement learning improvements, and continued prompt refinement."
notion:
  pageId: "352f8dff-2538-8006-aa6f-fcd2501a3ce0"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-30T13:12:00.000Z"
  lastEditedTime: "2026-04-30T13:12:00.000Z"
  publishedAt: "2026-04-30T13:16:22Z"
---

## Overview

Cursor, a developer of AI-powered coding tools, undertook a significant architectural refactoring of their git worktrees feature, moving from a traditional code-based implementation to a prompt-based approach using agent skills. This case study illustrates a radical shift in how production LLM features can be built and maintained, demonstrating both the power and limitations of relying on model capabilities rather than programmatic constraints.

The feature in question enables developers to run AI agents in isolated git worktrees—separate checkouts of a repository that allow parallel work without interference. Initially shipped in October alongside Cursor 2.0, this feature supported advanced use cases like having multiple agents work simultaneously on different tasks, competing different models on the same task, and managing complex workflows with setup scripts and automated cleanup.

## The Original Implementation

The initial implementation was a substantial engineering undertaking. It required approximately 15,000 lines of code spread across multiple systems. The complexity included creating and managing worktrees programmatically, feeding them into agents as context, implementing strict isolation to prevent agents from escaping their designated worktree, supporting user-configurable setup scripts that would run whenever an agent started work in a worktree, building a judging system to evaluate and rank different model implementations, modifying the agent harness with system reminders to keep agents on track, and implementing cleanup systems to manage disk space as users created hundreds of worktrees.

This implementation provided hard programmatic guarantees—it was physically impossible for an agent to access files outside its designated worktree. The system maintained complete control over agent behavior through code rather than relying on model instruction-following capabilities.

## The Prompt-Based Refactor

The team realized they could reimagine the entire feature using just two existing primitives: agent skills and sub-agents. Agent skills in Cursor are essentially markdown-formatted instruction sets that get loaded into model context when invoked. Sub-agents allow parent agents to spawn child agents with their own isolated contexts.

The new implementation consists primarily of two skills. The worktree skill is a set of markdown instructions that tell the model how to create worktrees, run user-configured setup scripts, and crucially, stay within that checkout. The best-of-n skill instructs a parent agent to create sub-agents for each specified model, have each create its own worktree, wait for all subs to complete, then provide commentary and grading of the different implementations in a table format.

The entire best-of-n implementation fits on a single screen at roughly 40 lines, compared to the previous 4,000 lines of code for the same functionality. The worktree skill is similarly compact. These are implemented as commands rather than pure skills so that prompts can be controlled server-side, enabling the team to iterate on prompt improvements without requiring users to update their Cursor version—a critical LLMOps optimization for rapid iteration.

The skills include platform-specific instructions to handle Windows, Linux, and macOS differences. They incorporate setup script execution logic. Most importantly, they use aggressive prompting to instruct models to stay within their designated worktree—essentially replacing programmatic constraints with natural language instructions.

## Production Benefits

This architectural shift delivered several significant advantages in the production environment. The maintenance burden dropped dramatically—from 15,000 lines of code requiring ongoing maintenance to compact markdown instructions. For an advanced feature used primarily by power users rather than the mainstream user base, this represented an excellent tradeoff.

The new approach enabled capabilities that were difficult or impossible in the previous implementation. Users can now switch into a worktree mid-conversation using a simple slash command, rather than needing to configure this upfront. The feature now works seamlessly with multi-repo setups where frontend and backend are separate repositories—the agent automatically creates worktrees across all repos and opens separate pull requests as needed. This was completely unsupported in the previous version.

The judging and comparison experience for best-of-n improved substantially. The parent agent now has full context over what each sub-agent did, enabling much richer commentary and analysis. Users can even ask the parent agent to synthesize approaches, combining preferred elements from different model implementations—something the previous architecture couldn't support since it required choosing one model's work wholesale.

## Production Challenges

However, the prompt-based approach introduced new categories of challenges that highlight the current limitations of relying on model behavior rather than programmatic constraints. The most significant issue is that models don't always stay on track. With the previous implementation, agents physically couldn't access files outside their worktree. Now the system trusts the model to follow instructions, making it somewhat reliability-based—the team acknowledges it's "vibes based."

Over long sessions, models are particularly prone to forgetting where they should be operating. Smaller, less capable models like Haiku frequently deviate and start working in the primary checkout where they shouldn't. Even larger models occasionally hallucinate or go haywire, especially during extended interactions.

The feature also feels slower to users, even though it isn't actually slower in execution time. Users now watch the agent create the worktree in the chat interface, making it feel like the agent is wasting time on tasks that should happen automatically in the background. This is purely a perception issue, but perception matters in production systems.

Discoverability suffered as well. The previous implementation featured a prominent dropdown in the UI offering options to run tasks locally, in the cloud, or in a worktree. The new approach relies on users knowing slash commands exist—a classic tradeoff between UI simplicity and feature discoverability. The team accepts this tradeoff given the advanced, power-user nature of the feature.

User reception has been mixed, with some users strongly preferring the previous implementation's behavior and guarantees. The team actively tracks feedback through their forums to understand pain points and prioritization.

## Evaluation and Improvement Strategy

The team is addressing the reliability challenges through systematic evaluation and model improvement. They've developed evaluation harnesses using Braintrust, running headless instances of the Cursor CLI. The evaluation framework employs two key scorers: one checking whether the model performed expected work within its designated worktree, and another checking whether the model inappropriately worked in the primary checkout.

These evaluations revealed clear performance differences across models. Haiku, as a smaller model, frequently deviates from instructions. Larger models like Composer and Grok perform significantly better. However, the current evaluations remain relatively simple and don't yet capture the long-session scenarios where model performance degrades most noticeably. The team is working to increase evaluation complexity to better simulate production conditions.

Beyond evaluation, the team plans improvements through reinforcement learning and model training. Cursor trains its own model called Composer, and they've identified that their RL training pipeline for Composer 2 included no tasks involving this type of worktree-scoped operation among the thousands of tasks used. For Composer 3, 4, and beyond, they're incorporating specific tasks around staying within designated worktrees to improve their own model's reliability. While they can't directly improve third-party models like GPT or Claude, they share feedback with other labs to inform their development.

Prompt engineering remains an active area of iteration. As evaluations identify patterns in model failures, the team can refine the instruction prompts. They're also exploring better system reminders that can be injected to help models stay on track during operation.

## Future Directions

The team is taking what they describe as a small step back for worktrees specifically within the new Cursor 3.0 interface. This new interface offers a more agentic UX optimized around chat and agent interaction rather than traditional code editing. They believe power users interested in parallel agent workflows are the same users most likely to adopt this interface, making it the right place for a more complete, native worktrees implementation that isn't purely prompt-based.

They're also investigating alternative parallelization primitives beyond git worktrees. Git worktrees have inherent limitations: they're slow to create, consume significant disk space, and only work with git repositories. For users on other version control systems or working with non-repository code, no local parallelization exists. The team is exploring solutions that don't rely on git at all, though specifics remain under development.

## LLMOps Implications

This case study illustrates several critical considerations for production LLM systems. First, it demonstrates that substantial traditional code can sometimes be replaced with prompt-based approaches, dramatically reducing maintenance burden. The 15,000-to-40-line reduction is remarkable and represents genuine simplification for features where perfect reliability isn't critical.

However, it also shows the limits of current models. Replacing programmatic constraints with natural language instructions introduces reliability challenges, particularly for complex state management over long sessions. The need for model-specific evaluation, careful prompt engineering, and targeted RL training to achieve acceptable behavior reveals that this approach requires sophisticated LLMOps practices.

The server-side prompt control mechanism is a particularly interesting production pattern. By implementing features as commands with backend-controlled prompts rather than client-side skills, the team can iterate rapidly without deployment friction. Users automatically get prompt improvements without updating software—a significant advantage for production systems where model behaviors and best practices evolve quickly.

The multi-model orchestration pattern demonstrated in the best-of-n feature represents another valuable production technique. By having a parent agent coordinate multiple sub-agents running different models and then synthesize their outputs, the system can leverage model diversity while providing users with cohesive analysis and comparison.

The mixed user feedback highlights that moving from deterministic programmatic behavior to model-based behavior represents a meaningful shift in system characteristics. Some users will strongly prefer the guarantees of traditional implementation even at the cost of reduced flexibility. Production teams must carefully consider these tradeoffs for their specific features and user bases.

The evaluation framework development, while acknowledged as still maturing, demonstrates essential LLMOps practice. Systematic testing with multiple scorers measuring different aspects of correct behavior provides the foundation for both prompt iteration and model improvement. The transparency about current evaluation limitations—particularly around simulating long sessions—reflects mature engineering thinking about measurement and improvement.

Overall, this case study provides a nuanced view of when and how prompt-based approaches can replace traditional code in production systems, the engineering practices required to make this work reliably, and the honest tradeoffs involved in this architectural choice.
