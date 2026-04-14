---
title: "Self-Improving Agent Through LLM-Based Session Analysis"
slug: "self-improving-agent-through-llm-based-session-analysis"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "data-analysis"
  - "prompt-engineering"
  - "embeddings"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "semantic-search"
  - "few-shot"
  - "evals"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "cicd"
  - "documentation"
  - "openai"
industryTags: "tech"
company: "Factory"
summary: "Factory developed Signals, an LLM-based system that analyzes AI agent sessions at scale to identify user friction and delight without exposing conversation content. The system uses GPT-5.2 to process thousands of daily sessions through OpenAI's batch API, extracting structured facets, detecting friction patterns, and correlating findings with system logs and releases. When friction patterns cross predefined thresholds, the system automatically files tickets that Factory's Droid agent picks up, implements fixes for, and submits pull requests—creating a recursive self-improvement loop where the agent detects and fixes its own failures. Early results show 73% of issues are auto-resolved with an average fix time under 4 hours, though human approval is still required before merging changes."
link: "https://factory.ai/news/factory-signals"
year: 2026
seo:
  title: "Factory: Self-Improving Agent Through LLM-Based Session Analysis - ZenML LLMOps Database"
  description: "Factory developed Signals, an LLM-based system that analyzes AI agent sessions at scale to identify user friction and delight without exposing conversation content. The system uses GPT-5.2 to process thousands of daily sessions through OpenAI's batch API, extracting structured facets, detecting friction patterns, and correlating findings with system logs and releases. When friction patterns cross predefined thresholds, the system automatically files tickets that Factory's Droid agent picks up, implements fixes for, and submits pull requests—creating a recursive self-improvement loop where the agent detects and fixes its own failures. Early results show 73% of issues are auto-resolved with an average fix time under 4 hours, though human approval is still required before merging changes."
  canonical: "https://www.zenml.io/llmops-database/self-improving-agent-through-llm-based-session-analysis"
  ogTitle: "Factory: Self-Improving Agent Through LLM-Based Session Analysis - ZenML LLMOps Database"
  ogDescription: "Factory developed Signals, an LLM-based system that analyzes AI agent sessions at scale to identify user friction and delight without exposing conversation content. The system uses GPT-5.2 to process thousands of daily sessions through OpenAI's batch API, extracting structured facets, detecting friction patterns, and correlating findings with system logs and releases. When friction patterns cross predefined thresholds, the system automatically files tickets that Factory's Droid agent picks up, implements fixes for, and submits pull requests—creating a recursive self-improvement loop where the agent detects and fixes its own failures. Early results show 73% of issues are auto-resolved with an average fix time under 4 hours, though human approval is still required before merging changes."
notion:
  pageId: "33ff8dff-2538-80af-80cf-fb6c8f724969"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-11T16:44:00.000Z"
  lastEditedTime: "2026-04-11T16:44:00.000Z"
  publishedAt: "2026-04-14T08:50:30Z"
---

## Overview

Factory built Signals, a production LLM system designed to analyze their AI coding agent (Droid) sessions at scale to identify user friction and delight moments without human reviewers reading individual conversations. The system represents an ambitious approach to recursive self-improvement—where an AI agent analyzes its own behavior, identifies problems, and implements fixes autonomously. This case study is particularly notable because it demonstrates LLMs being used not just as the primary product feature, but as a critical monitoring and improvement layer in the production system itself.

The problem Factory faced is common in AI product development: traditional metrics like session duration, tool calls executed, and completion rates fail to capture the actual user experience. A session might show successful completion in the metrics but hide eighteen minutes of user frustration fighting with the tool. Human review would catch these issues but doesn't scale to thousands of daily sessions and raises privacy concerns. Factory's solution was to build an LLM-powered analysis pipeline that thinks like a human reviewer but operates at machine scale while preserving privacy through abstraction.

## Technical Architecture and Implementation

The Signals system processes sessions using a multi-stage pipeline built around OpenAI's batch API. The architecture is designed for cost efficiency and scale rather than real-time processing. Sessions from the past 24 hours are fetched from BigQuery, filtered to those with at least 30 agentic steps to ensure meaningful interactions, and sent to OpenAI's batch API for analysis using GPT-5.2. The system analyzes thousands of sessions daily, with volume dynamically adjusted based on a token budget. The 24-hour processing window is deliberate—they're looking for aggregate patterns rather than real-time alerts, and batching provides significant API cost savings compared to streaming analysis.

Results flow into two destinations: BigQuery for historical analysis and Slack for daily team reports. The BigQuery storage enables temporal queries to correlate friction patterns with releases and feature changes, while the Slack integration provides daily pulse reports on user experience. This dual-destination approach balances long-term analytical needs with immediate team awareness.

## Facet Extraction and Schema Evolution

A key innovation in Signals is the facet extraction system. Every session gets decomposed into structured metadata that Factory calls "facets"—programming languages involved, primary intent, tool call confirmation counts, session outcomes (success vs abandonment), and referenced frameworks. These facets enable aggregate analysis across thousands of sessions without anyone reading underlying conversations.

What makes this particularly interesting from an LLMOps perspective is that the facet schema itself evolves autonomously through semantic clustering. As Signals processes batches of sessions, it generates embeddings for each session's abstracted summary and clusters similar sessions together. The LLM then analyzes these clusters to identify new facet categories worth tracking. When a cluster emerges that doesn't map cleanly to existing facets, Signals proposes adding a new dimension. Factory provides the example of "branch switches" as a facet that didn't exist in early versions but emerged through clustering—the system identified a group of sessions sharing similar patterns that didn't fit existing categories, and when the LLM examined what they had in common, it surfaced that git branch changes correlated with session complexity.

This represents a sophisticated approach to schema evolution in production LLM systems. Rather than manually updating categorization schemas based on ad-hoc observations, Factory has built a system that discovers new analytical dimensions through unsupervised learning. However, the text doesn't specify how they validate these proposed facets, what thresholds determine when a cluster is significant enough to warrant a new facet, or how they prevent schema bloat over time.

## Friction Detection and Classification

The friction analyzer scans for seven primary pattern types: error events (model errors, tool failures, timeouts), repeated rephrasing (three or more consecutive restatements), escalation tone (phrases like "broken", "why isn't", "frustrating"), platform confusion (questions about Factory features), abandoned tool flows (tool calls rejected or cancelled), backtracking ("undo", "revert", deleting code), and context churn (repeatedly adding/removing the same file).

Each friction moment receives a severity rating (high, medium, or low) and abstracted citations that describe what happened without exposing user quotes, code, or PII. A citation might read "user expressed frustration after third failed tool call" rather than quoting the user's actual words. This abstraction is central to Factory's privacy-preserving approach.

Like the facet system, friction categories evolve through embedding-based clustering. The system generates embeddings for friction descriptions, clusters them to find recurring patterns that don't fit existing categories, and proposes new friction types when clusters reach significance. Factory cites "context churn" as a category that emerged from clustering—the system surfaced a group of friction moments sharing semantic similarity but not matching existing types, and the LLM identified the common thread of users repeatedly modifying context windows in ways that correlated with eventual abandonment.

The distribution data Factory shares shows that friction severity varies significantly by type. For example, error events skew toward high severity (35% high, 45% medium), while platform confusion is predominantly low severity (55% medium, 30% low). However, the text doesn't explain how severity ratings are determined—whether they're LLM-generated judgments, rule-based classifications, or derived from downstream outcomes like abandonment rates.

## Delight Identification

Signals doesn't only identify problems; it also identifies moments where the product genuinely impressed users—positive exclamations, first-attempt successes on complex tasks, explicit mentions of time saved, and rapid approval flows followed by appreciation. Factory argues these delight signals matter for understanding what to do more of, not just what to fix.

The delight categorization system also evolves through clustering. Factory notes that the system recently surfaced "learning moments" as a new delight type after discovering that sessions where Droid explained its reasoning generated disproportionately positive signals compared to sessions that just executed without explanation. This discovery led to product insights about when and how to provide explanations.

From an LLMOps perspective, this dual focus on friction and delight is noteworthy. Many monitoring systems focus exclusively on errors and failures. By systematically identifying positive patterns, Factory can reinforce behaviors that work well and potentially expand them to other contexts. However, the text doesn't detail how delight signals are weighted against friction signals when evaluating overall session quality or making product decisions.

## Correlation with System Behavior

Signals becomes more powerful when correlated with internal logging and release data. Factory pipes error logs from their observability system into Signals' analysis. When a session shows friction, Signals can cross-reference with backend errors that occurred during the same time window. This surfaces patterns like "users experience repeated rephrasing friction when the context assembly service throws timeout errors" without manual investigation of individual sessions.

The system also correlates with release notes automatically. When a new CLI version ships, Signals tracks whether friction patterns change in subsequent sessions. Factory caught regressions this way—a release that changed how file context was assembled correlated with a spike in context churn friction the following day, visible immediately in aggregate patterns rather than requiring weeks of manual review.

They can also track improvements quantitatively. When they shipped a change to how Droid handles ambiguous requests, the "repeated rephrasing" friction rate dropped 30% within 48 hours, surfaced by Signals without anyone reading before-and-after sessions to verify the fix.

This correlation capability is critical for production LLM systems. By connecting user-facing friction patterns with backend system behavior and code changes, Factory has built a closed-loop feedback system that can attribute problems to specific system components and verify that fixes actually improve user experience. The challenge, not addressed in the text, is managing false correlations—with thousands of sessions and numerous system events, spurious correlations are inevitable.

## Recursive Self-Improvement Loop

The most ambitious aspect of Signals is the closed-loop automation. When friction patterns cross predefined thresholds, the system files Linear tickets automatically. Droid (Factory's AI coding agent) picks up those tickets, assigns them to itself, implements fixes, and submits pull requests. A human still approves the PR before merge, but the path from "users are frustrated by X" to "here's a fix for X" happens without manual triaging, assignment, or even pattern recognition.

Factory reports that 73% of issues are auto-resolved with an average time to fix under 4 hours, requiring only one human approval step. Recent examples include tickets for improving tool timeout handling after Signals detected it was responsible for over half of high-severity friction, and fixing output truncation that was delivering incomplete code to users.

From an LLMOps perspective, this represents a sophisticated form of automated incident response and remediation. However, several important details are missing from the case study. What constitutes a "threshold" for automatic ticket filing? How do they prevent the system from filing duplicate tickets for the same underlying issue? What percentage of auto-generated fixes actually resolve the friction patterns that triggered them? What happens when Droid implements a fix that introduces new problems? The claim of 73% auto-resolution is impressive if true, but without details on how "resolution" is measured or what the 27% failure mode looks like, it's difficult to assess the actual maturity of this system.

The text acknowledges that "it's not fully automated yet" because humans still approve PRs before merge, but doesn't discuss other important guardrails. In a production system serving real users, the consequences of an incorrect automated fix could be severe. How do they test these auto-generated fixes before deployment? Is there canary deployment or gradual rollout? What monitoring catches problems introduced by automated fixes?

## Privacy-Preserving Analytics

Factory emphasizes that Signals resolves the traditional tradeoff between reading user sessions to understand problems and staying blind to preserve privacy. Their approach uses multiple layers of abstraction: the LLM extracts patterns while omitting specific user content, individual results flow into aggregate statistics that only become meaningful at scale, and patterns only surface when they appear across enough distinct sessions to prevent identifying individual users.

This privacy-preserving approach is important for production LLM systems, especially those handling proprietary code or sensitive information. However, the technical details of how privacy is enforced are sparse. Are there technical controls preventing the LLM from including verbatim user content in abstractions, or is it purely prompt-based instruction? How do they validate that abstractions don't leak identifying information? What constitutes "enough distinct sessions" to prevent user identification?

The claim that "the model never surfaces raw conversation content to human analysts" is strong but relies on trust in the abstraction process. If the LLM is the gatekeeper between raw conversations and human-visible summaries, then the privacy guarantees are only as good as the LLM's instruction-following reliability. Production LLM systems dealing with sensitive data typically need additional technical controls beyond prompt engineering.

## Insights and Patterns Discovered

After running Signals for several months, Factory identified several patterns that weren't visible through traditional metrics:

Context churn emerged as the leading indicator of eventual frustration. When users repeatedly add and remove the same file from context, something fundamental is wrong—either the file isn't being read correctly or the agent isn't using it as expected. This pattern often appears minutes before more obvious friction signals like escalation in tone. This insight has predictive value for real-time intervention.

Rephrasing cascades predict abandonment with surprising accuracy. If a user rephrases three times, there's roughly 40% chance they'll rephrase again. If they hit five rephrases, session completion rates drop significantly. This led Factory to implement proactive clarification when Droid detects potential ambiguity, rather than waiting for the user to rephrase—a concrete product improvement driven by Signals analysis.

Error recovery matters more than error prevention. Sessions that hit errors but recovered gracefully actually scored higher on delight than sessions with no errors at all. Users seem to appreciate resilience over perfection. A system that fails and recovers builds more trust than one that works flawlessly but feels fragile. This counterintuitive finding challenges the common assumption that error-free operation is the primary goal.

On delight, the most common positive signal is efficiency. The abstracted phrase "would have taken me hours" appears across hundreds of delight citations. Users don't expect the agent to be faster than manual work, but when it is, they notice and appreciate it.

These insights demonstrate the value of systematic LLM-based analysis at scale. However, it's worth noting that some of these patterns—like rephrasing cascades predicting abandonment—might be discoverable through traditional analytics on structured data without requiring LLM analysis. The context churn and error recovery insights seem more dependent on the semantic understanding that LLMs provide.

## Critical Assessment

The Signals case study represents sophisticated LLMOps work, but several aspects warrant critical examination:

**Unvalidated Claims**: The 73% auto-resolution rate and sub-4-hour fix time are impressive if accurate, but the text provides no details on measurement methodology, what counts as "resolution," or whether these fixes actually reduce the friction patterns that triggered them. This is a common issue in vendor-produced case studies—dramatic metrics without supporting evidence or methodology.

**Missing Operational Details**: For a system operating in production at scale, critical operational details are absent. How much does this system cost to run daily? What's the failure rate of the batch processing pipeline? How do they handle LLM API outages or rate limits? What's the latency from a user experiencing friction to that pattern appearing in Signals analysis (likely 24+ hours given the batch architecture)? These operational realities significantly impact the practical value of the system.

**Circular Logic Risk**: The system uses LLMs to evaluate LLM agent behavior. This raises questions about whether it can detect failure modes that are blind spots for the same model family. If GPT-5.2 analyzing Droid sessions misses certain types of problems because of its own biases or limitations, those gaps will persist in the self-improvement loop. The text doesn't address this fundamental limitation.

**Human-in-the-Loop Unclear**: While Factory mentions human approval of PRs, the role of humans in validating friction detection, facet proposals, and ticket generation is unclear. If the system is filing tickets automatically and Droid is implementing fixes automatically, what prevents runaway automation or systematic misdiagnosis of problems? The guardrails aren't described.

**Privacy Claims Need Scrutiny**: The privacy-preserving claims rely heavily on LLM abstraction working reliably. In practice, LLMs can and do leak training data or fail to follow instructions about excluding specific content. For a system handling proprietary code, the privacy guarantees need more technical depth than "we prompt the LLM to abstract."

**Generalization Questions**: This system is built specifically for analyzing sessions with Factory's Droid agent. How much of the architecture and approach would generalize to other LLM applications? The facet extraction and friction detection seem domain-specific, which limits the broader applicability of the techniques described.

## Future Directions

Factory outlines ambitious plans for evolution. They're moving toward real-time analysis, surfacing friction indicators during active sessions so the agent can course-correct before frustration builds. This would represent a significant architectural shift from batch processing to streaming analysis with much higher operational complexity and cost.

Beyond reactive fixes, they're building toward proactive evolution where Signals identifies what's missing, not just what's broken. When clusters reveal users repeatedly asking for capabilities that don't exist, that becomes signal for what to build next. The evolution mechanism continues to find new patterns—they mention it recently proposed tracking "specification drift" for sessions where the user's stated goal shifted mid-conversation.

The stated end goal is "an agent that learns from every interaction, improves continuously, and evolves its own capabilities over time." This represents the holy grail of AI systems—true autonomous improvement. However, the path from the current system (which still requires human PR approval) to fully autonomous evolution involves solving numerous unsolved problems in AI safety, testing, and validation.

## LLMOps Takeaways

Despite the critical questions raised above, Signals demonstrates several valuable LLMOps patterns:

Using LLMs as evaluators of other LLM systems is increasingly common and valuable, but needs careful validation and awareness of circular reasoning risks. The approach of generating embeddings for sessions and clustering to discover new patterns shows how to combine traditional ML techniques with LLM analysis. The batch processing architecture optimized for cost rather than latency is appropriate for aggregate pattern detection and shows pragmatic engineering trade-offs. Correlating LLM-based user experience signals with system logs and releases creates a powerful feedback loop for production AI systems. Building schema evolution into the system from the start, rather than hardcoding categories, increases adaptability over time but requires mechanisms to validate and prune the schema.

The recursive self-improvement loop, while impressive in concept, requires extensive guardrails and human oversight that the case study doesn't fully detail. For organizations considering similar approaches, the operational maturity needed to safely deploy automated remediation should not be underestimated. The privacy-preserving abstraction approach is valuable but needs technical enforcement beyond prompt engineering for sensitive applications.

Overall, Signals represents sophisticated LLMOps work that pushes boundaries in autonomous system improvement, though the case study would benefit from more technical depth on validation, guardrails, and operational realities beyond the impressive top-line metrics.
