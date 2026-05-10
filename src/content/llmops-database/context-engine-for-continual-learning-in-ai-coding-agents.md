---
title: "Context Engine for Continual Learning in AI Coding Agents"
slug: "context-engine-for-continual-learning-in-ai-coding-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "rag"
  - "embeddings"
  - "memory"
  - "agent-based"
  - "prompt-engineering"
  - "harness-engineering"
  - "human-in-the-loop"
  - "evals"
  - "langchain"
  - "postgresql"
  - "anthropic"
industryTags: "tech"
company: "Applied Commute"
summary: "Applied Compute developed Context Engine, a production system for enabling AI coding agents to remember, refine, and retrieve enterprise context through continual learning. The company deployed this internally on their own codebase by logging all coding agent interactions across Cursor, Claude Code, and Codex, creating what they call ACL-Wiki. Over two weeks of production use, they observed the Critical Memory Rate (percentage of times retrieved memories were essential to task completion) roughly double from under 10% to around 20%. On a curated benchmark of tasks where memory was clearly beneficial, agents using the Contextbase outperformed no-memory baselines across all categories (reducing time-to-value, exposing user preferences, and solving underspecified tasks) while showing no significant regression on distractor tasks."
link: "https://x.com/appliedcompute/status/2052826576723841292"
year: 2026
seo:
  title: "Applied Commute: Context Engine for Continual Learning in AI Coding Agents - ZenML LLMOps Database"
  description: "Applied Compute developed Context Engine, a production system for enabling AI coding agents to remember, refine, and retrieve enterprise context through continual learning. The company deployed this internally on their own codebase by logging all coding agent interactions across Cursor, Claude Code, and Codex, creating what they call ACL-Wiki. Over two weeks of production use, they observed the Critical Memory Rate (percentage of times retrieved memories were essential to task completion) roughly double from under 10% to around 20%. On a curated benchmark of tasks where memory was clearly beneficial, agents using the Contextbase outperformed no-memory baselines across all categories (reducing time-to-value, exposing user preferences, and solving underspecified tasks) while showing no significant regression on distractor tasks."
  canonical: "https://www.zenml.io/llmops-database/context-engine-for-continual-learning-in-ai-coding-agents"
  ogTitle: "Applied Commute: Context Engine for Continual Learning in AI Coding Agents - ZenML LLMOps Database"
  ogDescription: "Applied Compute developed Context Engine, a production system for enabling AI coding agents to remember, refine, and retrieve enterprise context through continual learning. The company deployed this internally on their own codebase by logging all coding agent interactions across Cursor, Claude Code, and Codex, creating what they call ACL-Wiki. Over two weeks of production use, they observed the Critical Memory Rate (percentage of times retrieved memories were essential to task completion) roughly double from under 10% to around 20%. On a curated benchmark of tasks where memory was clearly beneficial, agents using the Contextbase outperformed no-memory baselines across all categories (reducing time-to-value, exposing user preferences, and solving underspecified tasks) while showing no significant regression on distractor tasks."
notion:
  pageId: "35bf8dff-2538-80b2-9bd3-d91d48079d6d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-09T15:19:00.000Z"
  lastEditedTime: "2026-05-09T15:20:00.000Z"
  publishedAt: "2026-05-10T06:01:56Z"
---

## Overview

Applied Compute's case study presents an in-depth look at deploying a production memory system for AI coding agents, specifically their Context Engine product. The case is particularly notable because it demonstrates "dogfooding" - the company used their own product on their internal development workflow to test and improve it in a real production environment. The case provides concrete metrics on how continual learning from production traces can improve agent performance over time, though readers should note this is essentially a product demonstration from the vendor themselves.

The company tracked coding agent interactions across multiple platforms (Cursor, Claude Code, and Codex) for several months, funneling all traces into a centralized logging system called Applied Compute Logs (ACL). These logs became the foundation for building a "Contextbase" - a structured memory system that coding agents could query at runtime. The entire feedback loop, dubbed ACL-Wiki, represents a complete LLMOps pipeline focused on continual learning from production data.

## Technical Architecture and Pipeline

The Context Engine operates on a three-stage pipeline that processes production traces into actionable context for coding agents. The Remember stage ingests every coding agent trace from the production environment. These traces capture complete interaction sessions including user queries, agent responses, code changes, debugging sessions, and outcomes. The comprehensiveness of trace collection is critical to the system's effectiveness, as it ensures no potentially valuable context is lost.

The Refine stage performs the bulk of the intelligence work in the pipeline. It extracts low-level memories from individual debugging sessions and builds higher-level procedural memories on top of these granular observations. This hierarchical memory structure allows the system to capture both specific fixes and general patterns. The Refine stage also implements deduplication to prevent redundant memories and pruning mechanisms to remove stale entries that may no longer reflect current practices. Additionally, it organizes memories into a folder structure with a top-level index, creating navigable knowledge rather than flat key-value storage. This refinement happens on a daily basis, incorporating new traces and feedback continuously.

The Retrieve stage exposes the Contextbase to coding agents at runtime through an MCP (Model Context Protocol) server. This architectural choice is significant from an LLMOps perspective as it demonstrates a standardized approach to context injection. The retrieved context supplements whatever information the coding agent already has from the codebase itself, providing institutional knowledge that wouldn't be available from code alone.

A critical component of the production system is the continual learning feedback mechanism. Engineers can flag sessions where a memory should have been created but wasn't, or where existing memories were either useful or distracting. This human-in-the-loop feedback creates a quality signal that feeds back into the Refine stage, allowing the system to improve its memory creation and retrieval policies over time. This represents a sophisticated approach to LLMOps where the system learns not just from traces but from explicit human judgments about memory utility.

## Monitoring and Metrics

Applied Compute developed a custom metric called Critical Memory Rate to monitor the effectiveness of their memory system in production. This metric measures the percentage of retrieval operations where the returned information was actually necessary for accomplishing the task effectively. The determination of "critical" is made by an LLM-as-a-judge setup using GPT-4.5-mini (which they reference as GPT-5.4-mini, likely a typo or internal designation) with full context of the trajectory. For stability, they use majority vote across three runs.

The choice of LLM-as-a-judge for production monitoring is noteworthy from an LLMOps perspective. While it introduces dependency on another model and potential evaluation noise, it allows for automated, scalable assessment of a nuanced quality that would be expensive to judge manually. The company filters results to buckets with more than 15 ACL-Wiki retrieve calls, suggesting they're aware of statistical significance concerns with small sample sizes.

The production results showed the Critical Memory Rate moving average climbing from under 10% to around 20% over a two-week period. The company acknowledges that Critical Memory Rate has a natural ceiling since not every task requires institutional knowledge. Their argument that agents are "judged on their weakest moments, not their average ones" is a pragmatic observation about production AI systems - the long-tail difficult cases where memory helps most are often the ones that determine overall system utility. However, readers should note that a 20% critical memory rate still means 80% of retrievals weren't critical, raising questions about the cost-benefit ratio of retrieval operations and potential latency impacts.

## Evaluation Methodology

Recognizing that the Critical Memory Rate metric alone doesn't distinguish when memory helps versus when it hurts, Applied Compute built ACLBench, a hand-curated benchmark derived from production traces. The benchmark design is methodologically interesting: it inverts the traditional model evaluation setup by treating the memory system as the entity being evaluated while holding the model fixed. This allows direct comparison of different memory systems or the presence versus absence of memory.

The benchmark construction process involved splitting production traces into "intent chunks" - self-contained segments where a user introduces and resolves a single goal. They filtered for intents contained within a single repository to support replay without external dependencies or API calls. Manual selection was used to identify approximately 25 chunks with clear memory needs, which is a small sample size that limits statistical power but allows for high-quality ground truth.

The company notes that they attempted larger-scale automated dataset generation using LLM-as-a-judge filtration but found it didn't work well. This is a valuable negative result for the LLMOps community: existing frontier models weren't good judges for determining which tasks would effectively distinguish good and bad memory systems. This limitation suggests that certain aspects of memory system evaluation still require human judgment and domain expertise.

For each selected chunk, they derive two pieces of data: the raw trace that can be converted into Contextbase memories, and a task specification that allows replaying the scenario. The benchmark includes two task types with different grading approaches. Memory tasks test the model's ability to use information from existing memories, with rubrics that reward successful memory usage. Distractor tasks either expect no useful memories or test whether memory creation might degrade performance on other tasks, with rubrics that penalize inappropriate memory usage. This dual-task design allows measurement of both the upside (performance lift) and downside (potential regression) of the memory system.

## Benchmark Results and Analysis

Benchmark execution used Claude Opus 4.6 in a minimal coding agent harness, scoring tasks from 0.0 (task not accomplished) to an average of rubric criteria scores. Results were averaged over three samples per item (SPI=3). The Contextbase was constructed by running the Remember, Refine, Retrieve pipeline across all traces in the evaluation set.

The company buckets results by three types of memory utility. First, memories that reduce time-to-value by documenting prior issues and capturing how to do recurring tasks. These are compared to distillation approaches where teacher models create detailed SOPs for student models. Second, memories that expose steerability through user preferences, providing an editable surface for controlling agent behavior without retraining. Third, memories that solve incomplete or intractable environments through external rules - information that lives in subject matter experts' heads or datasets too large to navigate from scratch. The cited example of "do not use LiteLLM given the recent security breach" illustrates time-sensitive institutional knowledge that wouldn't be in training data.

Results showed the Contextbase lifting performance in every category, with user preference tasks showing particularly large gains. The company argues this makes sense because preferences are hard to satisfy by chance but easy with proper context. Importantly, distractor tasks showed no significant regression, suggesting coding agents can appropriately ignore unhelpful context. The company acknowledges that the improvement over baseline on distractors was likely just noise in both the model's task performance and their LLM-as-a-judge evaluation.

The overall sample size (roughly 25 curated tasks) is quite small, which the company justifies by noting that code context is already extremely rich and frontier models' coding capabilities are strong enough to often guess user intent. This is a fair point but also limits the statistical confidence in the reported improvements. The case would be stronger with larger-scale evaluation, though the company's experience that automated task generation didn't work well suggests this may be genuinely difficult.

## Production Examples

The case study includes two detailed examples that illustrate the system's operation. The first is a real production rollout where an employee asked to add a logging argument to a configuration file. The ACL-Wiki retrieval returned a project-specific rule about omitting launcher fields that match defaults, along with matched pages from prior similar issues. The LLM-as-a-judge marked this critical with high confidence (3/3) because "the retrieve supplied the load-bearing rule about omitting launcher fields that match defaults, and the user accepted the resulting edit without correction."

The second example comes from ACLBench and involves querying for tasks before a cutoff. The Contextbase contained not just the recommended pattern but reasoning about why: the project convention of using Model.query(ctx) to preserve soft-delete filtering and authorization checks rather than raw database queries. Without the Contextbase, the agent gave generic but incorrect advice about using the ORM query builder, which would have silently introduced bugs by bypassing authorization and soft-delete chains. With the Contextbase, the agent correctly used the project-specific pattern.

These examples effectively demonstrate the value proposition, though they're cherry-picked positive cases. A balanced assessment would want to see examples of retrieval failures, incorrect memories, or situations where memory distracted from the correct solution. The company's claim that distractors caused no regression suggests such cases are rare, but seeing concrete examples would strengthen confidence.

## LLMOps Architecture and Deployment Considerations

From an LLMOps perspective, several aspects of this deployment are noteworthy. The use of MCP servers for context injection represents a modular, protocol-based approach that could work across different coding agent implementations. The daily Refine cycle balances freshness against computational cost - more frequent updates might capture changes faster but would increase infrastructure requirements.

The trace logging infrastructure that captures interactions across multiple coding platforms (Cursor, Claude Code, Codex) represents significant engineering effort. Building robust trace collection that doesn't interfere with developer workflows, handles failures gracefully, and maintains data quality is non-trivial production work. The case study doesn't detail the infrastructure requirements, latency impacts, or failure modes of the retrieval system, which would be important considerations for organizations evaluating similar approaches.

The continual learning feedback loop with engineer flagging is elegant but raises questions about adoption and participation rates. How many engineers actively provide feedback? How quickly does the system improve with limited feedback versus rich feedback? The case doesn't address these operational questions.

The hierarchical memory organization with folders and top-level indexes suggests sophisticated information architecture, though details of how memories are structured, how retrieval queries are formulated, and how relevance is determined aren't fully specified. These implementation details would significantly impact system performance.

## Broader Context and Vendor Claims

Applied Compute positions this case study within a broader narrative across three deployments: public enterprise benchmarks (referenced but not detailed in this text), ACL-Wiki in production, and ACLBench for targeted evaluation. They claim up to 16.9% relative improvement on public benchmarks and show Critical Memory Rate climbing in production with consistent gains on memory tasks without distractor regression.

The company's core thesis is that production traces are valuable resources most enterprises are wasting. While this is a compelling argument, readers should recognize this is a vendor making the case for their product. The claims should be interpreted with appropriate skepticism pending independent validation. The self-reported metrics, while detailed, haven't been independently verified. The benchmark is small and hand-curated by the company itself. The LLM-as-a-judge evaluations introduce potential bias toward what frontier models consider good rather than what's objectively correct.

That said, the technical approach is sound and the deployment represents genuine production usage rather than just controlled experiments. The transparency about limitations (LLM-as-a-judge not working well for automated dataset creation, small benchmark size, natural ceiling on Critical Memory Rate) lends credibility to the overall account.

## Production Readiness and Operational Maturity

The case demonstrates several markers of operational maturity in LLMOps. The systematic trace collection, daily refinement cycles, human feedback integration, and custom monitoring metrics show thoughtful production engineering. The use of LLM-as-a-judge with majority voting for stability reflects awareness of evaluation reliability concerns. The filtering for statistical significance (buckets with more than 15 calls) shows attention to data quality.

However, several production concerns aren't addressed in the case study. What are the latency impacts of retrieval operations? How does the system handle retrieval failures? What's the computational cost of daily Refine operations as the Contextbase grows? How does memory staleness affect long-running deployments? What privacy and security measures protect sensitive information in traces? These questions would be critical for organizations considering similar deployments.

The fact that Applied Compute is using this on their own codebase provides some validation - they have skin in the game and wouldn't continue using a system that significantly degraded their developers' productivity. But the case would benefit from reporting metrics like developer adoption rates, time-to-resolution for coding tasks, or developer satisfaction scores alongside the technical performance metrics.

## Implications for LLMOps Practice

This case study contributes several insights to LLMOps practice. First, it demonstrates that continual learning from production traces can measurably improve agent performance over time, with the Critical Memory Rate roughly doubling over two weeks. Second, it shows that hierarchical memory organization (low-level observations building to high-level procedures) can capture both specific fixes and general patterns. Third, it illustrates that human-in-the-loop feedback can guide memory system improvement beyond what's extractable from traces alone.

The inverted benchmark design where the memory system is evaluated while holding the model fixed is a methodological contribution worth considering for other context augmentation systems. The distinction between memory tasks and distractor tasks provides a framework for assessing both benefits and risks of context injection.

The case also highlights challenges in LLMOps for coding agents: automated evaluation quality assessment remains difficult, requiring either expensive human judgment or potentially biased LLM-as-a-judge approaches. Creating high-quality benchmarks for memory systems appears to require manual curation rather than automated generation, limiting scalability of evaluation.

Overall, this case study presents a technically sophisticated approach to production memory systems for AI agents, with reasonable transparency about methodology and limitations, though readers should maintain appropriate skepticism given the vendor context and self-reported results.
