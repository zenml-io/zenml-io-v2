---
title: "Autonomous Bug Investigation and Resolution Agent"
slug: "autonomous-bug-investigation-and-resolution-agent"
draft: false
llmopsTags:
  - "code-interpretation"
  - "data-analysis"
  - "structured-output"
  - "high-stakes-application"
  - "agent-based"
  - "prompt-engineering"
  - "few-shot"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "system-prompts"
  - "evals"
  - "monitoring"
  - "documentation"
  - "databases"
  - "anthropic"
  - "google-gcp"
industryTags: "tech"
company: "Basis"
summary: "Basis developed Clueso, an autonomous debugging agent that resolves 78% of bugs on first pass to handle their scaling incident response needs. The agent operates in a Modal VM environment using the Claude Agent SDK, accessing their monorepo, logging services, and internal documentation to investigate issues. Clueso pulls error logs, writes database queries, and produces verifiable post-event summaries with evidence timelines, completing routine investigations in under five minutes while complex cases can run over an hour. By integrating Clueso into Slack workflows and triggering it automatically in customer support channels, Basis reduced response times on complex questions by approximately 50% and freed engineers to focus on higher-leverage work."
link: "https://www.getbasis.ai/blogs/clueso-how-we-built-an-agent-that-autonomously-resolves-78-of-bugs"
year: 2026
seo:
  title: "Basis: Autonomous Bug Investigation and Resolution Agent - ZenML LLMOps Database"
  description: "Basis developed Clueso, an autonomous debugging agent that resolves 78% of bugs on first pass to handle their scaling incident response needs. The agent operates in a Modal VM environment using the Claude Agent SDK, accessing their monorepo, logging services, and internal documentation to investigate issues. Clueso pulls error logs, writes database queries, and produces verifiable post-event summaries with evidence timelines, completing routine investigations in under five minutes while complex cases can run over an hour. By integrating Clueso into Slack workflows and triggering it automatically in customer support channels, Basis reduced response times on complex questions by approximately 50% and freed engineers to focus on higher-leverage work."
  canonical: "https://www.zenml.io/llmops-database/autonomous-bug-investigation-and-resolution-agent"
  ogTitle: "Basis: Autonomous Bug Investigation and Resolution Agent - ZenML LLMOps Database"
  ogDescription: "Basis developed Clueso, an autonomous debugging agent that resolves 78% of bugs on first pass to handle their scaling incident response needs. The agent operates in a Modal VM environment using the Claude Agent SDK, accessing their monorepo, logging services, and internal documentation to investigate issues. Clueso pulls error logs, writes database queries, and produces verifiable post-event summaries with evidence timelines, completing routine investigations in under five minutes while complex cases can run over an hour. By integrating Clueso into Slack workflows and triggering it automatically in customer support channels, Basis reduced response times on complex questions by approximately 50% and freed engineers to focus on higher-leverage work."
notion:
  pageId: "377f8dff-2538-8043-9821-f82d706fc419"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-06T10:44:00.000Z"
  lastEditedTime: "2026-06-06T10:44:00.000Z"
  publishedAt: "2026-06-08T12:30:59Z"
---

## Overview

Basis built an autonomous debugging agent called Clueso to address the growing burden of on-call engineering work as their company scaled. The agent achieves a claimed 78% first-pass resolution rate on bug investigations, representing a substantial deployment of LLM technology in a production engineering workflow. This case study is particularly valuable for understanding the challenges of building long-running agents that operate reliably over extended trajectories, though readers should note that the performance metrics are self-reported by the company without independent verification.

The use case centers on incident response and bug investigation—knowledge work that requires gathering evidence from multiple systems, reasoning about complex interactions, and producing actionable conclusions. Clueso handles the full investigation lifecycle: pulling error logs, querying databases, navigating the codebase, formulating hypotheses, and delivering structured post-event summaries. The system distinguishes between routine issues that resolve in under five minutes and complex investigations that can run for over an hour, demonstrating the need for robust context management and reasoning capabilities across varying task complexities.

## Technical Architecture and Infrastructure

Clueso runs in a Modal VM environment, which provides the isolated compute infrastructure for agent execution. The system uses Anthropic's Claude Agent SDK as its primary harness, a choice that provided several key capabilities out of the box. The SDK offers a filesystem environment that became crucial for the agent's context management strategy, flexible hooks for customizing agent behavior, integration with observability platforms for monitoring and debugging, and automatic context compaction to handle long-running conversations.

The agent's initial environment was intentionally minimal: access to Basis's monorepo, a tool for querying databases, and connections to their logging service. This sparse starting configuration allowed the team to validate core capabilities before expanding functionality. The architecture demonstrates a pragmatic approach to agent deployment—starting with a constrained sandbox and systematically adding capabilities based on observed failure modes rather than attempting to build comprehensive tooling upfront.

The choice of Claude as the underlying model is noteworthy. While not explicitly stated, the references to the Claude Agent SDK and the agent's capabilities suggest they're using one of Anthropic's more capable models, likely from the Claude 3 family or newer. The SDK integration handles the low-level details of API interaction, context window management, and turn-taking, allowing the Basis team to focus on higher-level orchestration and tool design.

## Development Methodology and Iteration Strategy

The development approach reveals sophisticated thinking about how to accelerate agent development. Rather than attempting to solve open-ended debugging problems from day one, the team established a verification-oriented development loop. They gave Clueso bugs where the root cause was already confirmed and asked it to reproduce the diagnosis. This framing is technically astute: verification is a substantially easier task than generation for language models, so failures to verify known answers pointed directly at capability gaps rather than confounding model limitations with tooling deficiencies.

When Clueso couldn't verify a known root cause, the failure signal was clear—it lacked some necessary capability. Perhaps it needed access to a particular internal service API, or it didn't understand a product feature well enough to reason about failure modes. The team took this insight further by having Clueso diagnose its own capability gaps. The agent would generate clarifying questions and identify appropriate team members to route those questions to, creating a semi-autonomous improvement loop that reduced the manual triage burden on developers.

This self-diagnostic feedback loop is positioned as a "core competency" for building agentic systems, and the claim has merit. Having the agent articulate its own limitations and confusion points provides signal that's directly grounded in the agent's reasoning process, potentially more targeted than purely external observation of failure modes. However, readers should recognize that this approach still requires human judgment to validate the agent's self-assessments and prioritize improvements—it's a valuable accelerator but not a fully automated solution to agent development.

## Tool Design and Long-Trajectory Performance

A central technical insight from this deployment concerns how tool design quality compounds over long agent trajectories. The team observed a consistent failure pattern: during short investigations (few turns), Clueso used tools effectively and could work around gaps or ambiguities in tool interfaces. Over long-running tasks with many turns and accumulated context, tool use degraded noticeably. Tools that were "good enough" for five-turn investigations became primary failure modes in extended sessions.

The metaphor they use—"a rock can drive a single nail, but you wouldn't build a house with one"—captures an important principle for LLMOps. In short interactions, LLMs demonstrate remarkable ability to work around poor interfaces, ambiguous responses, or missing information. This resilience can mask tool design problems during development, only for those problems to become critical failures when the same tool is used repeatedly across a long task. As context accumulates and compaction occurs, each rough edge in tool responses becomes a potential source of confusion that can derail the entire investigation.

To address this, the team again leveraged Clueso's self-reflection capabilities. They collected sample trajectories from long-running investigations and had Clueso analyze its own failures to identify problematic tool patterns. The agent surfaced cases where tool responses contained irrelevant information, conflicting data, or ambiguous structures—essentially cataloging the "footgun" cases in the tool design. The team then restructured tools to eliminate these problematic patterns, improving reliability across long trajectories.

While the specific fixes aren't detailed extensively, the approach is more significant than any individual solution: systematically using the agent itself to diagnose weaknesses in its own tooling. This creates a feedback loop where the agent's actual usage patterns inform tool improvement, rather than relying solely on human intuition about what makes a good tool interface.

## Context Management Through Filesystem Workflows

Managing context over long agent trajectories is one of the core challenges in LLMOps, and Clueso's approach offers instructive patterns. The team made an early architectural decision to give the agent full filesystem access, allowing it to execute shell commands and run Python scripts. This wasn't merely about tool flexibility—it became the foundation for their context management strategy.

Beyond the core codebase, Clueso has access to on-call runbooks, internal debugging guides, and customer-facing product documentation stored in the filesystem. The runbooks proved particularly valuable as they contain prewritten diagnostic flows for common errors, can be easily modified by engineers, and can be loaded into context during investigations. The case study notes this pattern has since become more mainstream as "agent skills," suggesting Basis was relatively early to this pattern. The runbook structure provides a form of procedural memory—externalized knowledge about how to approach common problems that doesn't need to be learned by the model but can be retrieved and applied when relevant.

The filesystem approach enabled a critical pattern for fighting context compaction. Clueso makes dozens of tool calls across potentially hundreds of turns during complex investigations. The team noticed that detailed tool results were being lost to compaction, degrading performance as the agent couldn't reference earlier findings. The solution was conceptually simple but execution-dependent: they instructed Clueso to save tool results to local files. This allows capturing larger amounts of context than can fit in the working context window, and creates a durable record that survives compaction.

However, saving raw tool outputs wasn't sufficient. The *conclusions drawn from analyzing those results* could still be lost or distorted after compaction. Clueso might have results from a dozen database queries saved as files, undergo compaction, and forget which specific field had a null value that caused the downstream bug. To address this second-order problem, the team introduced a progress document modeled after a researcher's logbook. This document captures current hypotheses, references to evidence files, eliminated possibilities, and planned next steps.

The progress document serves multiple functions in the system. It acts as persistent reasoning state that survives compaction. It provides structure for the agent's investigation process, encouraging systematic rather than scattered exploration. And it serves as the foundation for the final output report, making the transition from investigation to deliverable more reliable. The example they provide illustrates the structure:

```
ETL sync failure investigation
Current understanding: OAuth token expired
Evidence: see query_result_003.json, row 47 shows token_expires_at
  in the past
Ruled out:
- Rate limiting (no 429s in logs)
- Schema changes (checked API version)
Next: Check if token_expires_at matches the error time window
```

This format encourages evidence-based reasoning with explicit references to supporting data, tracks what's been ruled out to avoid circular investigation, and maintains forward momentum with clear next steps. While Clueso generally followed guidance to maintain this document, the team found it helpful to add intermittent hooks that prompted the agent to update the document and revisit instructions. These periodic nudges helped keep long investigations on track, suggesting that even well-prompted agents benefit from explicit reminders about process during extended tasks.

## Structured Output and Termination Conditions

A subtle but important challenge in long-running agent tasks is determining when the work is actually complete. The team encountered a failure mode called "early stopping" where, as Clueso's context window filled, it would preemptively end its turn and produce a speculative answer before gathering all required information. This appears to be a form of model behavior where the pressure of approaching context limits (even with compaction) biases the agent toward premature conclusion.

The solution involved two complementary approaches. First, they explicitly stated in Clueso's prompt that context would be automatically compacted, attempting to relieve any implicit pressure the agent might feel about running out of space. Second, and more importantly, they gave Clueso a concrete, verifiable definition of "done."

The terminal output requirement is structured and specific: Clueso must produce a timeline of events with a corresponding evidence table linking to logs and sample queries, drawn directly from its progress document. This structured output requirement serves dual purposes. For human verification, it makes Clueso's reasoning transparent and traceable—engineers can follow the causal chain from evidence to conclusion, which is critical for building trust in the system. For the agent, it provides an unambiguous termination condition. Instead of making a fuzzy judgment about whether it has "done enough" investigation, Clueso can evaluate whether its evidence graph is complete and properly documented.

Requiring clear causal links between events forced more rigorous investigation. The agent couldn't simply assert a probable cause; it needed to demonstrate the chain of evidence supporting that conclusion. This is a form of constrained generation that trades some flexibility for reliability—a common and often necessary tradeoff in production LLM systems.

## Product Integration and Adoption Dynamics

An important aspect of this case study is the acknowledgment that technical capability alone doesn't drive adoption. The team "assumed adoption would be immediate. It wasn't." This is a common experience in internal tooling, particularly for AI systems where workflows must change and trust must be earned.

Clueso started as a standalone chat interface, which worked for early adopters but didn't integrate into existing incident response workflows. Most of Basis's incident collaboration already happens in Slack via Pylon's integration, where engineers and customer support share context and discuss potential bugs in threads. The team responded by building a Slack integration that allows engineers to tag Clueso in any thread. The agent reads the entire thread as initial context for its investigation, then replies in the same thread when finished. This integration point is clever because it meets users where they already work and leverages the conversation history that naturally accumulates during incident response.

Usage increased sufficiently that in certain channels, engineers were tagging Clueso on nearly every thread. This usage pattern prompted automation—for a subset of channels, Clueso now triggers automatically on every message and replies with its findings. The customer support channel was identified as a particularly natural fit. Whenever a customer reaches out, Clueso investigates immediately without requiring manual invocation.

The agent's access to product documentation alongside the codebase enables a valuable capability: distinguishing between genuine bugs and cases where customers need guidance rather than a fix. Sometimes the reported "issue" is a misunderstanding of how a feature works or user error. The support team effectively has an on-call engineer "by their side at all times," with the claimed result being a "almost 50%" drop in response times on complex questions. This percentage should be interpreted with appropriate skepticism as it's self-reported without methodological details.

The Slack integration created what they describe as a "viral loop"—the more Clueso appeared in public channels, the more teammates became aware of it, which drove further usage. This network effect is valuable for internal tool adoption but also creates interesting challenges. As more teams depend on Clueso, the bar for reliability increases, and the impact of any failures grows. The system must be robust enough to handle the increased load and diverse use cases that come with broader adoption.

## Critical Assessment and Limitations

While this case study provides valuable technical details, readers should maintain a critical perspective on several aspects. The 78% first-pass resolution rate is impressive if accurate, but the methodology for calculating this metric isn't detailed. What counts as "resolved"? Is this measured against all reported incidents, or a filtered subset? How is "first pass" defined when investigations can run for over an hour with hundreds of turns? These questions matter for understanding the true capability and generalizing to other contexts.

The claimed 50% reduction in response times for complex support questions is similarly unverified. There's no discussion of how response time was measured, what the baseline was, or whether this includes only cases where Clueso successfully resolved issues versus all cases where it was invoked. In a company blog post designed to showcase technical achievements and attract talent, there's natural incentive to present results favorably.

The case study doesn't discuss failure modes in detail or provide examples of the 22% of bugs that Clueso doesn't resolve on first pass. What characterizes these failures? Are they concentrated in particular types of issues? Do they require human intervention, or does Clueso eventually solve them on subsequent passes? Understanding failure modes is often more instructive than understanding successes, and the omission limits the practical value for teams considering similar implementations.

There's also limited discussion of costs. Running an agent that can execute for over an hour across hundreds of turns on complex investigations likely involves substantial API costs, particularly with Claude models. The cost-benefit analysis for replacing human engineering time with agent time isn't provided, though the productivity claims suggest it's favorable for Basis.

The operational aspects of running Clueso in production receive minimal attention. How is the system monitored? What observability tooling tracks agent performance? How are failures detected and escalated? When Clueso produces an incorrect diagnosis, what's the feedback mechanism to prevent similar errors? These LLMOps concerns are critical for production systems but aren't addressed in the post.

## Generalization and Technical Principles

Despite these limitations, the case study articulates several principles that likely generalize well to other long-running agent applications:

The compounding nature of tool design quality over long trajectories is an important observation. Short-horizon evaluation of agent capabilities can be misleading if tools will actually be used repeatedly over extended sessions. This suggests that agent evaluation frameworks should include long-trajectory stress tests, not just few-turn benchmarks.

The verification-before-generation development methodology offers a practical path for accelerating agent development. By testing on problems with known solutions first, teams can isolate capability gaps from inherent task difficulty. The additional step of having agents self-diagnose capability gaps is creative, though its general applicability may depend on the agent's domain and the team's ability to validate self-assessments.

The filesystem-based approach to context management—saving tool results to files and maintaining a structured progress document—provides a pattern for managing long investigations. This externalizes memory and reasoning state beyond the context window, making the system more robust to compaction. The concept likely transfers to other knowledge work domains where agents must maintain coherent state over extended tasks.

The importance of structured output as a termination condition is valuable. Requiring agents to produce specific deliverables with defined structure helps prevent premature conclusion and makes output quality more verifiable. This principle applies broadly to any agent task where "done" is otherwise ambiguous.

The product integration insights—that technical capability alone doesn't drive adoption, and that meeting users in existing workflows is critical—are perhaps the most broadly applicable lessons. Many AI initiatives fail not because the technology doesn't work, but because it doesn't integrate into how people actually work.

## Future Considerations and Model Evolution

The authors acknowledge that many of their techniques work around current limitations in context length and long-horizon reasoning. As models improve, some approaches may become unnecessary. The progress document might eventually be redundant with large enough context windows and lossless compaction. Explicit termination conditions might matter less when models can better evaluate their own completeness.

This perspective is appropriately humble about the temporal nature of specific techniques while maintaining that the core challenge—getting agents to perform consistently over long, complex tasks—remains relevant regardless of model improvements. Even with perfect memory and reasoning, questions of tool design, verification, and integration into human workflows persist.

The case study serves as a valuable snapshot of practical LLMOps in early 2026, demonstrating that long-running autonomous agents can be deployed successfully in production engineering workflows with careful attention to context management, tool design, and product integration. The specific approaches to handling context compaction, maintaining investigation state, and structuring output provide concrete patterns for teams building similar systems. However, the performance claims should be interpreted with appropriate skepticism given the self-reported nature and lack of methodological detail. The real value lies in the technical patterns and principles articulated, which offer legitimate lessons for the LLMOps community working on complex agentic systems.
