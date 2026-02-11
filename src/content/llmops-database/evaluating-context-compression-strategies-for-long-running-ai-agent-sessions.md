---
title: "Evaluating Context Compression Strategies for Long-Running AI Agent Sessions"
slug: "evaluating-context-compression-strategies-for-long-running-ai-agent-sessions"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694af571f6b55b41fb30a6ff"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:48.253Z"
  createdOn: "2025-12-23T20:02:57.666Z"
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "prompt-engineering"
  - "token-optimization"
  - "agent-based"
  - "evals"
  - "human-in-the-loop"
  - "redis"
  - "pytorch"
  - "fastapi"
  - "openai"
  - "anthropic"
industryTags: "tech"
company: "Factory AI"
summary: "Factory AI developed an evaluation framework to assess context compression strategies for AI agents working on extended software development tasks that generate millions of tokens across hundreds of messages. The company compared three approaches—their structured summarization method, OpenAI's compact endpoint, and Anthropic's built-in compression—using probe-based evaluation that tests factual retention, file tracking, task planning, and reasoning chains. Testing on over 36,000 production messages from debugging, code review, and feature implementation sessions, Factory's structured summarization approach scored 3.70 overall compared to 3.44 for Anthropic and 3.35 for OpenAI, demonstrating superior retention of technical details like file paths and error messages while maintaining comparable compression ratios."
link: "https://factory.ai/news/evaluating-compression"
year: 2025
seo:
  title: "Factory AI: Evaluating Context Compression Strategies for Long-Running AI Agent Sessions - ZenML LLMOps Database"
  description: "Factory AI developed an evaluation framework to assess context compression strategies for AI agents working on extended software development tasks that generate millions of tokens across hundreds of messages. The company compared three approaches—their structured summarization method, OpenAI's compact endpoint, and Anthropic's built-in compression—using probe-based evaluation that tests factual retention, file tracking, task planning, and reasoning chains. Testing on over 36,000 production messages from debugging, code review, and feature implementation sessions, Factory's structured summarization approach scored 3.70 overall compared to 3.44 for Anthropic and 3.35 for OpenAI, demonstrating superior retention of technical details like file paths and error messages while maintaining comparable compression ratios."
  canonical: "https://www.zenml.io/llmops-database/evaluating-context-compression-strategies-for-long-running-ai-agent-sessions"
  ogTitle: "Factory AI: Evaluating Context Compression Strategies for Long-Running AI Agent Sessions - ZenML LLMOps Database"
  ogDescription: "Factory AI developed an evaluation framework to assess context compression strategies for AI agents working on extended software development tasks that generate millions of tokens across hundreds of messages. The company compared three approaches—their structured summarization method, OpenAI's compact endpoint, and Anthropic's built-in compression—using probe-based evaluation that tests factual retention, file tracking, task planning, and reasoning chains. Testing on over 36,000 production messages from debugging, code review, and feature implementation sessions, Factory's structured summarization approach scored 3.70 overall compared to 3.44 for Anthropic and 3.35 for OpenAI, demonstrating superior retention of technical details like file paths and error messages while maintaining comparable compression ratios."
---

## Overview

Factory AI presents a research-driven case study addressing a critical production challenge for AI agents: context window management during long-running software development sessions. The company built an evaluation framework to systematically measure how different context compression strategies preserve information quality when AI agents exceed memory limits. This work addresses a fundamental LLMOps challenge—optimizing for total tokens per task rather than tokens per request—and demonstrates how production constraints drive evaluation methodology design.

The case study centers on a comparative analysis of three production-ready compression approaches tested against real-world software engineering workloads spanning debugging, PR review, feature implementation, CI troubleshooting, data science, and ML research sessions. While this is clearly a research publication from Factory AI promoting their own approach, the methodology appears rigorous and the comparative framework offers valuable insights into production AI agent design.

## The Production Problem

Factory AI frames the challenge through the lens of long-running agent sessions that generate millions of tokens across hundreds of messages—well beyond what any LLM can maintain in working memory. The critical insight is that naive optimization for compression ratio (minimizing tokens per request) often increases total tokens per task because agents lose critical context and must re-fetch files, re-read documentation, and re-explore previously rejected approaches. This represents a shift in optimization thinking from request-level to task-level efficiency, which is essential for production systems where cost and latency compound across multi-turn interactions.

The company identifies specific failure modes that occur when context compression loses information: agents forget which files they've modified, lose track of what approaches they've already tried, cannot recall the reasoning behind past decisions, and forget the original error messages or technical details that initiated the session. These failures force expensive re-work and ultimately undermine the agent's value proposition.

## Evaluation Methodology Design

Factory AI's primary contribution is a probe-based evaluation framework that measures functional quality rather than abstract similarity metrics. The company explicitly rejects traditional metrics like ROUGE or embedding similarity, arguing these don't capture whether an agent can continue working effectively after compression. A summary might score high on lexical overlap while missing the specific file path an agent needs to proceed.

The framework employs four probe types that directly test different aspects of context preservation:

**Recall probes** test factual retention by asking specific questions about technical details from the conversation history, such as "What was the original error message?" This tests whether concrete facts survive compression.

**Artifact probes** test file tracking capabilities by asking questions like "Which files have we modified? Describe what changed in each." This dimension is particularly critical for coding agents where losing track of touched files leads to inconsistent edits or redundant work.

**Continuation probes** test task planning by asking "What should we do next?" This verifies the agent maintains awareness of workflow state and can resume work without re-establishing context.

**Decision probes** test reasoning chain preservation by asking about choices made during the session, such as "We discussed options for the Redis issue. What did we decide?" This tests whether not just facts but the rationale behind past decisions survives compression.

Each probe response is evaluated using GPT-5.2 as an LLM judge across six dimensions: accuracy (factual and technical correctness), context awareness (reflecting current conversation state and artifact state), artifact trail (file tracking), completeness (addressing all parts of questions with sufficient depth), continuity (ability to continue without re-fetching), and instruction following (respecting format and constraints). Each dimension receives a 0-5 score based on detailed rubrics that specify what constitutes failure (0), adequate performance (3), and excellent performance (5).

The choice to use an LLM judge follows the methodology established by Zheng et al. (2023) in MT-Bench, which showed GPT-4 achieves over 80% agreement with human preferences. The judge is kept blind to which compression method produced each response, evaluating purely on response quality against rubrics. The judge outputs structured JSON with scores and reasoning per criterion, enabling systematic analysis across thousands of probe responses.

## The Three Compression Approaches

**Factory's approach** uses what they call "anchored iterative summarization" that maintains a structured, persistent summary with explicit sections for different information types: session intent, file modifications, decisions made, and next steps. When compression triggers, only newly-truncated conversation spans are summarized and merged with the existing summary rather than regenerating everything from scratch. The company's key insight is that structure forces preservation—by dedicating sections to specific information types, the summary cannot silently drop file paths or skip decisions. Each section acts as a checklist that must be populated or explicitly left empty, preventing gradual information loss.

**OpenAI's approach** uses the `/responses/compact` endpoint, which produces opaque compressed representations optimized for reconstruction fidelity. This achieves the highest compression ratio (99.3%) but sacrifices interpretability—you cannot read the compressed output to verify what was preserved. This approach treats compression as a representation learning problem rather than summarization.

**Anthropic's approach** uses built-in context compression through the Claude SDK, producing detailed structured summaries (typically 7-12k characters) with sections for analysis, files, pending tasks, and current state. The key difference from Factory is the update mechanism: Anthropic regenerates the full summary on each compression trigger, while Factory's anchored approach incrementally merges new information into a persistent summary.

## Experimental Results

The evaluation ran on over 36,000 messages from production sessions spanning multiple software engineering task types. For each compression point, four probe responses were generated per method and graded across six dimensions.

Factory's approach scored 3.70 overall compared to 3.44 for Anthropic and 3.35 for OpenAI. The 0.35 point advantage over OpenAI and 0.26 point advantage over Anthropic appears consistent across task types and session lengths according to the company's reporting.

Breaking down by dimension reveals where differences emerge. **Accuracy** showed the largest gap, with Factory scoring 4.04, Anthropic 3.74, and OpenAI 3.43. The 0.61 point difference between Factory and OpenAI reflects how often technical details like file paths and error messages survive compression. A concrete example illustrates this: when asked about the original error in a debugging session, Factory's compressed context enabled a response naming the exact endpoint (/api/auth/login), error code (401), and root cause (Redis session store), while OpenAI's compression resulted in vague responses like "We were debugging an authentication issue" that lost almost all technical detail.

**Context awareness** favored Factory (4.01) over Anthropic (3.56), a 0.45 point gap. The company attributes this to their anchored iterative approach: by merging new summaries into persistent state rather than regenerating from scratch, key details are less likely to drift or disappear across multiple compression cycles. This suggests the update mechanism matters as much as the summary structure.

**Artifact trail** proved the weakest dimension for all methods, ranging from 2.19 to 2.45 out of 5.0. Even Factory's structured approach with explicit file sections only achieved 2.45. The company candidly acknowledges this as an unsolved problem, suggesting artifact preservation may require specialized handling beyond general summarization—perhaps a separate artifact index or explicit file-state tracking in agent scaffolding.

**Completeness** and **instruction following** showed minimal differences across methods (all scoring above 4.3), indicating all approaches produce well-structured responses that address questions and follow formats. Differentiation occurs in content quality rather than structural compliance.

Compression ratios tell an interesting story about the tradeoff space. OpenAI compressed to 99.3% (removing 99.3% of tokens), Anthropic to 98.7%, and Factory to 98.6%. Factory retains about 0.7% more tokens than OpenAI but gains 0.35 quality points. The company argues this tradeoff favors Factory for any task where re-fetching costs matter, supporting their claim that total tokens per task is the right optimization target.

## Critical Assessment

While Factory AI's research appears methodologically sound, several caveats warrant consideration. First, this is clearly promotional content for Factory's commercial product. The comparison conveniently favors their approach, though the margins aren't overwhelming (0.26-0.35 points on a 5-point scale). The methodology appears rigorous enough that results are probably genuine, but independent replication would strengthen confidence.

Second, the evaluation framework itself embeds assumptions about what matters for coding agents. The six dimensions and probe types reflect Factory's view of agent requirements. Different task domains might prioritize different aspects—a customer support agent might care more about emotional context than file tracking. The evaluation validates Factory's approach for their specific use case (software development agents) but generalization to other domains remains unclear.

Third, the artifact trail results (2.19-2.45 for all methods) suggest the problem isn't fully solved by any approach, including Factory's. The company's candid acknowledgment that this "remains an unsolved problem" is commendable, but raises questions about production readiness. If all methods struggle to track files across long sessions, production deployments likely need additional safeguards or complementary mechanisms.

Fourth, the statistical rigor is under-specified. The company claims differences are "consistent across task types and session lengths" but provides no confidence intervals, statistical tests, or variance measures. The aggregate scores are averaged across many probes and sessions, but we don't know the distribution or whether differences reach statistical significance. For production decision-making, understanding variance matters as much as mean performance.

Fifth, the choice of GPT-5.2 as judge introduces potential biases. If GPT-5.2 was trained on data that includes techniques similar to Factory's structured summarization, it might preferentially score those outputs higher. The MT-Bench validation showing 80% agreement with human judgments is reassuring, but judge bias remains a concern in LLM evaluation. The company keeps the judge blind to which method produced each response, which helps but doesn't eliminate systematic bias.

## LLMOps Insights

Several production-relevant insights emerge from this work:

**Token optimization requires system-level thinking.** The shift from optimizing tokens per request to tokens per task represents mature LLMOps thinking. Production systems must account for compounding costs across multi-turn interactions, where small inefficiencies multiply. An agent that saves tokens per request but forces re-fetching wastes more tokens overall—a lesson that applies broadly to production LLM systems.

**Evaluation must measure functional outcomes.** Traditional NLP metrics like ROUGE don't capture whether compressed context enables continued work. Factory's probe-based approach measures what actually matters for their use case: can the agent continue productively? This principle generalizes—production LLM evaluation should test capabilities required for the application, not abstract similarity metrics that may not correlate with task success.

**Structure forces preservation.** Factory's key insight—that explicit sections for different information types prevent silent information loss—has broader applicability. Production systems that need to maintain complex state across interactions may benefit from structured representations that make information requirements explicit rather than relying on implicit preservation through freeform generation.

**Different compression approaches optimize for different objectives.** OpenAI's approach maximizes compression ratio and reconstruction fidelity but sacrifices interpretability. Anthropic's approach produces readable, structured summaries but regenerates from scratch each time. Factory's approach balances readability with persistent state through incremental updates. The right choice depends on whether you need interpretability (for debugging or audit), maximum compression (for cost optimization), or state persistence (for long-running tasks). Production systems require clear understanding of these tradeoffs.

**Some problems need specialized solutions.** The consistently poor artifact trail scores (2.19-2.45) across all summarization approaches suggest file tracking may require dedicated mechanisms beyond general-purpose compression. Production systems tackling complex tasks may need hybrid architectures combining general context compression with specialized tracking for critical state like files, database modifications, or external API calls.

## Methodology Transparency

The case study includes unusual transparency for vendor research, providing full LLM judge prompts, rubrics, and scoring criteria in an appendix. This enables reproduction and critical assessment. The rubrics show thoughtful design with explicit criteria for each score level. For example, the accuracy_factual criterion defines 0 as "Completely incorrect or fabricated," 3 as "Mostly accurate with minor errors," and 5 as "Perfectly accurate."

The grading process uses structured JSON output from the judge with scores and reasoning per criterion, then computes dimension scores as weighted averages of criteria and overall scores as unweighted averages of dimensions. This systematic approach reduces subjectivity, though the weights applied to criteria aren't disclosed.

## Production Context

The evaluation used "hundreds of compression points over 36,611 messages" from "production software engineering sessions across real codebases from users who opted into a special research program." This grounds the work in real-world usage rather than synthetic benchmarks. The task types—PR review, testing, bug fixes, feature implementation, refactoring, CI troubleshooting, data science, ML research—span the breadth of software development workflows where AI agents operate.

For each compression point, all three methods received identical conversation prefixes, ensuring fair comparison. Factory summaries came from production, while OpenAI and Anthropic summaries were generated by feeding the same prefixes to their respective APIs. This approach controls for input variation while reflecting how each system would actually perform in production.

## Future Directions

The company identifies artifact tracking as needing specialized handling—potentially a separate artifact index or explicit file-state tracking in agent scaffolding. This suggests a research direction toward hybrid architectures that combine general context compression with domain-specific state management. For production LLMOps, this implies agent frameworks may need pluggable state management modules beyond what LLM providers offer directly.

The compression vs. quality tradeoff space revealed by comparing the three approaches (99.3% compression with 3.35 quality for OpenAI vs. 98.6% compression with 3.70 quality for Factory) suggests room for approaches optimized for different points on this curve. Production systems with tight token budgets might accept lower quality for higher compression, while systems prioritizing reliability might trade tokens for better context preservation.

Overall, Factory AI presents a thoughtful approach to a genuine production problem with transparent methodology and honest assessment of limitations. While the promotional context warrants skepticism about claimed advantages, the evaluation framework itself represents valuable LLMOps tooling for anyone deploying long-running AI agents. The emphasis on system-level optimization (tokens per task vs. per request) and functional evaluation (probe-based vs. similarity metrics) reflects production-oriented thinking that the field needs more of.