---
title: "Building Trustworthy AI Agents for Automated Expense Management"
slug: "building-trustworthy-ai-agents-for-automated-expense-management"
draft: false
llmopsTags:
  - "customer-support"
  - "classification"
  - "document-processing"
  - "high-stakes-application"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "agent-based"
  - "evals"
  - "error-handling"
  - "fallback-strategies"
  - "guardrails"
  - "documentation"
industryTags: "finance"
company: "Ramp"
summary: "Ramp built and deployed a suite of LLM-backed agents to automate expense management workflows, focusing specifically on expense approval processes that traditionally required manual manager review. The solution emphasizes transparency through explicit reasoning and citations, implements escape hatches for uncertain decisions, enables collaborative context refinement through in-platform policy editing, and provides user-configurable autonomy controls via workflow builders. Since deployment, the policy agent has autonomously handled over 65% of expense approvals, demonstrating that with proper guardrails, explainability, and user control, LLM agents can deliver significant automation value in finance while maintaining user trust."
link: "https://builders.ramp.com/post/how-to-build-agents-users-can-trust"
year: 2025
seo:
  title: "Ramp: Building Trustworthy AI Agents for Automated Expense Management - ZenML LLMOps Database"
  description: "Ramp built and deployed a suite of LLM-backed agents to automate expense management workflows, focusing specifically on expense approval processes that traditionally required manual manager review. The solution emphasizes transparency through explicit reasoning and citations, implements escape hatches for uncertain decisions, enables collaborative context refinement through in-platform policy editing, and provides user-configurable autonomy controls via workflow builders. Since deployment, the policy agent has autonomously handled over 65% of expense approvals, demonstrating that with proper guardrails, explainability, and user control, LLM agents can deliver significant automation value in finance while maintaining user trust."
  canonical: "https://www.zenml.io/llmops-database/building-trustworthy-ai-agents-for-automated-expense-management"
  ogTitle: "Ramp: Building Trustworthy AI Agents for Automated Expense Management - ZenML LLMOps Database"
  ogDescription: "Ramp built and deployed a suite of LLM-backed agents to automate expense management workflows, focusing specifically on expense approval processes that traditionally required manual manager review. The solution emphasizes transparency through explicit reasoning and citations, implements escape hatches for uncertain decisions, enables collaborative context refinement through in-platform policy editing, and provides user-configurable autonomy controls via workflow builders. Since deployment, the policy agent has autonomously handled over 65% of expense approvals, demonstrating that with proper guardrails, explainability, and user control, LLM agents can deliver significant automation value in finance while maintaining user trust."
notion:
  pageId: "375f8dff-2538-8005-92e8-da455685440e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-04T08:05:00.000Z"
  lastEditedTime: "2026-06-04T08:05:00.000Z"
  publishedAt: "2026-06-04T08:37:12Z"
---

## Overview

Ramp, a corporate expense management platform, developed and deployed a comprehensive suite of LLM-backed agents to automate various aspects of expense management, with particular emphasis on expense approval workflows. Published in July 2025, this case study provides detailed insights into how Ramp approached building production LLM systems that users can trust in a high-stakes financial domain where errors can quickly erode confidence. The company reports that their policy agent now handles over 65% of expense approvals autonomously, representing a significant shift from traditional manual approval processes.

The case study is notable for its practical, production-focused approach to LLMOps challenges, particularly around explainability, uncertainty handling, and user control. While the text positions Ramp's approach positively, it offers concrete technical patterns and lessons learned that provide value beyond marketing claims. The emphasis on trust-building through transparency and user autonomy reflects mature thinking about deploying LLMs in production environments where mistakes have real business consequences.

## Problem Selection and Use Case Identification

Ramp articulates a thoughtful framework for identifying problems suitable for LLM application in production. They emphasize three key characteristics: ambiguity (where simple heuristics fail), high volume (where manual processing is prohibitively time-consuming), and asymmetric upside (where automation value significantly exceeds the cost of occasional errors). Within finance, they identified several target areas including expense approval, merchant identification, and receipt parsing—all of which manifest as tedious, repetitive tasks with relatively low catastrophic failure risk when properly constrained.

The expense approval use case serves as their primary example. Traditionally, managers manually review each expense against company policy, a process that's both time-consuming and subject to human inconsistency. The ambiguity arises from policy interpretation—determining whether a specific expense like a team dinner or conference attendance complies with often-nuanced corporate policies. The high volume comes from the sheer number of transactions requiring review across an organization. The asymmetric upside is clear: automating approvals saves significant management time, while occasional errors can be caught through review processes and don't typically result in catastrophic outcomes.

## Explainability and Transparency Architecture

A central pillar of Ramp's LLMOps approach is making the reasoning process transparent and verifiable. Rather than simply returning approval or rejection decisions, their agents explain the rationale behind each determination. This serves multiple purposes in production: it enables users to verify correctness, helps them quickly identify errors when they occur, and provides insight into how the system "thinks."

From an LLMOps perspective, this reasoning output serves as a form of model observability. Developers can analyze the reasoning patterns to identify areas where prompts need refinement or where additional context would improve decision quality. Users can leverage this reasoning to understand what aspects of an expense require additional attention. The approach recognizes that in production LLM systems, especially in high-stakes domains, the reasoning process itself is a valuable output that contributes to system reliability and user trust.

Beyond reasoning, Ramp implements source citation as a core feature. Every fact or policy reference in the agent's reasoning links directly to the relevant section of the user's expense policy. This grounding approach addresses hallucination risks by ensuring that all reasoning is tied to verifiable, user-provided context rather than generated from the model's parametric knowledge. The citation mechanism also helps users quickly verify whether the agent's interpretation aligns with their understanding of policy intent.

## Uncertainty Handling and Escape Hatches

Ramp's approach to handling uncertainty represents sophisticated thinking about production LLM behavior. Early in development, they explicitly gave their LLMs the ability to express uncertainty and defer to human judgment. When the agent isn't confident about a decision, it falls back to the pre-agent escalation process—sending the expense for human review. Critically, they designed this "unsure" state to appear as a valid outcome rather than an error condition, recognizing that acknowledging limitations builds trust more effectively than forcing decisions on ambiguous cases.

The implementation captures not just binary uncertainty but also the reasoning behind why the agent is unsure. This metadata serves dual purposes: it helps users focus their review on the specific ambiguous aspects, and it provides development teams with insights into where the system needs improvement. Over time, tracking how "unsure reasons" change provides a metric for system maturity and coverage expansion.

Ramp explicitly warns against using confidence scores from LLMs, noting that asking LLMs to output numerical confidence is prone to hallucination and lacks the statistical validity of confidence scores from traditional ML models. They observe that LLMs tend to cluster around 70-80% confidence regardless of actual certainty. Instead, they use categorical bucketing: "Approve" for clear policy matches, "Reject" for clear conflicts, and "Needs review" for edge cases. This categorical approach forces the model into actionable states that users can readily understand and act upon, avoiding the false precision of numerical scores.

## Collaborative Context Management

A distinctive aspect of Ramp's LLMOps approach is treating context as collaborative rather than static. In many consumer LLM applications, context is defined once and rarely modified. Ramp instead built a system where users actively shape and refine the context that drives agent decisions. This approach creates a feedback loop that improves both LLM performance and the underlying policy artifacts over time.

The implementation involved three key steps. First, they brought expense policies—traditionally maintained as PDFs outside the platform—directly into Ramp as structured, editable content. Second, they use this policy content as primary context for agent decision-making. Third, they built a full-featured policy editor that allows users to modify policy content when they disagree with agent outputs or find the policy ambiguous.

This feedback loop has interesting implications for LLMOps. When an LLM struggles with ambiguous policy language, it likely indicates that humans would also find that section confusing. By surfacing these ambiguities through agent reasoning and enabling users to clarify policy language directly, the system creates a continuous improvement cycle. The policy becomes more precise over time, which simultaneously reduces human workload and improves agent accuracy. This approach transforms the LLM from a passive policy interpreter to an active tool for policy refinement.

From a technical perspective, this requires careful context retrieval architecture. The system must identify which policy sections are relevant to each expense and surface those specific sections to both the LLM (as reasoning context) and the user (as citations). The case study mentions that "each section is used directly for policy decision by the LLM depending on how relevant it is to the expense on hand," suggesting some form of semantic retrieval or relevance ranking, though specific implementation details aren't provided.

## User Autonomy and Control Mechanisms

Ramp addresses the tension between AI agency and user autonomy through configurable workflow controls. They recognize that different customers have different risk tolerances and comfort levels with AI automation. Rather than imposing a one-size-fits-all approach, they leverage their existing workflow builder—already used across the product for process customization—to let users define exactly where and when agents can act autonomously.

This "autonomy slider" concept allows customers to calibrate agent behavior to their organizational culture and risk appetite. Users can greenlight agents for full autonomy in certain scenarios while imposing hard stops elsewhere. Importantly, the system layers deterministic rules on top of LLM decisions: dollar limits, vendor blocklists, category restrictions. These guardrails provide deterministic boundaries that the LLM cannot override, addressing the concern that everything doesn't need to be—and shouldn't be—an LLM decision.

The case study provides examples of the autonomy spectrum. A conservative configuration might require human review on every expense above $50, regardless of agent confidence. A more trusting configuration might only escalate when the agent explicitly identifies concerns, allowing full autonomy for straightforward approvals. Ramp notes that they often use the more trusting configuration internally, suggesting confidence in their system's reliability.

The rollout strategy also reflects careful attention to trust-building. Rather than immediately deploying agents with full autonomy, they started with suggestion mode—showing users what action the agent would take but requiring human confirmation. This mirrors patterns from AI-assisted development tools that began with inline suggestions before moving to more autonomous behavior. Only after users observed the agent's patterns, caught its mistakes, and gained confidence in its accuracy did Ramp enable customers to promote agents to full autonomy. The progression—suggestions, then acting on subsets, then full autonomy—creates a trust curve that matches each customer's comfort level while providing real-world validation at each stage.

## Evaluation Strategy and Continuous Improvement

Ramp frames evaluation as the equivalent of unit tests for LLM systems—essential for responsible evolution over time. Their evaluation approach has matured through production experience, yielding several practical lessons. They advocate for a "crawl, walk, run" philosophy, starting with quick and easy evaluations that expand to deeper coverage and more precise insights as the product matures. This pragmatic approach acknowledges that building comprehensive evaluation frameworks upfront can be premature when the system is still evolving rapidly.

The evaluation strategy prioritizes edge cases—ambiguous scenarios where LLMs are prone to errors or inconsistencies. This focus maximizes the informational value of each evaluation case, as testing clearly correct scenarios provides less signal for improvement. They also implement a feedback loop where user-flagged errors become candidates for the evaluation dataset, creating organic growth of the test suite based on real production failures.

An important nuance in their evaluation strategy is recognizing that user actions aren't always ground truth. Ramp discovered that finance teams are frequently more lenient than policy strictly allows, approving reasonable but not fully in-policy expenses out of pragmatism or personal judgment. If they had simply trained on user actions or evaluated against user decisions, the agent would have learned to be overly permissive. To address this, they created golden datasets carefully reviewed by internal teams to define "correct" decisions based purely on information available in the system, free from the affinity bias that influences real finance team decisions.

This reveals an interesting challenge in LLMOps for production systems: user behavior may not align with stated objectives, and naively optimizing for user agreement may not optimize for desired outcomes. The solution—maintaining carefully curated golden datasets alongside production feedback—adds operational complexity but ensures the system optimizes for policy compliance rather than mimicking human inconsistency. The case study doesn't detail the ongoing maintenance of these golden datasets or how they balance golden dataset evaluation against production agreement metrics, which would be valuable information for practitioners.

## Technical Architecture Observations

While the case study focuses on principles and patterns rather than technical implementation details, several architectural elements can be inferred. The system clearly implements some form of prompt engineering to elicit reasoning and categorical decisions rather than just outputs. The citation mechanism requires tracking which context chunks (policy sections) contributed to each decision, suggesting structured prompting where policy sections are explicitly marked or indexed in the context window.

The escape hatch mechanism likely involves instructing the model to explicitly output uncertainty classifications and reasoning when confidence is low, rather than relying on model-generated confidence scores. This requires careful prompt design to encourage models to acknowledge limitations rather than hallucinate answers. The categorical bucketing (Approve/Reject/Needs review) may be implemented through structured output formatting or post-processing of model responses to ensure consistency.

The collaborative context system requires integration between the LLM pipeline and policy management infrastructure. Changes to policy content need to flow into the context retrieval system, and relevance ranking must identify which policy sections apply to each expense. This suggests integration with embedding-based retrieval or other semantic matching approaches, though traditional keyword or rule-based retrieval could also support this functionality depending on policy structure.

The workflow builder integration demonstrates thoughtful product architecture, reusing existing infrastructure for a new purpose rather than building parallel control mechanisms. This reduces implementation complexity and provides familiar interfaces to users, lowering adoption barriers for agent configuration.

## Production Metrics and Validation

The primary quantitative result cited is that the policy agent handles over 65% of expense approvals autonomously. This represents significant automation of a traditionally manual process. However, the case study doesn't provide baseline comparison metrics (how long manual approval took, error rates before and after, user satisfaction scores) that would help assess the full business impact. The 65% figure indicates substantial adoption but leaves open questions about the remaining 35%—how much is hard stops defined by users versus agent uncertainty versus policy complexity?

The lack of detailed performance metrics is understandable in a public case study but limits the ability to fully assess the claims. Error rates, false positive/negative rates for approvals, user override frequency, and time savings would provide stronger validation. Similarly, information about model selection, inference costs, latency, and scaling challenges would be valuable for practitioners considering similar implementations.

## Critical Assessment and Limitations

The case study presents Ramp's approach in uniformly positive terms, which is expected given its origin as company content. Several areas deserve more critical examination. The 65% automation rate is presented as success, but without context about how this compares to targets, industry benchmarks, or improvement trajectories, it's difficult to assess whether this represents strong or modest performance. For complex or highly variable expense policies, 65% might be excellent; for straightforward policies, it might indicate substantial room for improvement.

The claim that explaining reasoning builds trust more than accuracy is interesting but not empirically validated in the text. While this aligns with explainability research in AI, real user studies would strengthen the assertion. Similarly, the confidence score critique—while directionally correct about LLM limitations—oversimplifies. Properly calibrated confidence estimation remains valuable for some use cases, and the categorical approach, while simpler, may sacrifice granularity that could be useful for prioritization or routing decisions.

The collaborative context approach is elegant but requires significant product investment. Bringing policy management into the platform, building full editing interfaces, and maintaining synchronization add complexity that may not be justified for all use cases or customer segments. The case study doesn't discuss adoption challenges—do customers actually use the policy editor, or do they stick with external policy management despite the available tools?

The evaluation strategy acknowledges important challenges but leaves open questions about ongoing maintenance. How frequently are golden datasets updated? How is dataset quality maintained as the team scales? How do they detect when production drift makes evaluations less representative? These operational details matter significantly for long-term LLMOps success but aren't addressed.

## Broader LLMOps Insights

Beyond Ramp's specific implementation, the case study illustrates several broader LLMOps patterns. The emphasis on explainability and citations reflects a maturation beyond "black box" LLM deployment toward systems that provide verifiable reasoning chains. This is particularly important in regulated or high-stakes domains where audibility and error diagnosis matter.

The uncertainty handling approach—explicitly designing for "I don't know" responses—represents good production engineering. Many LLM deployments fail by forcing models to always provide answers, leading to hallucination under uncertainty. Building escalation paths for ambiguous cases creates more reliable overall systems even if individual model capability is limited.

The progressive rollout strategy (suggestions before autonomy) aligns with responsible AI deployment practices. Rather than seeking maximum automation immediately, the approach prioritizes trust-building and validation. This may slow initial deployment but likely improves long-term adoption and reliability.

The distinction between user behavior and ground truth in evaluation highlights a subtle challenge in LLMOps. Unlike traditional ML where labels often represent ground truth, in many business applications, user behavior reflects complex tradeoffs that may differ from stated policies or optimal decisions. Building evaluation datasets requires careful consideration of what the model should learn versus what users actually do.

## Conclusion

Ramp's expense management agents demonstrate a thoughtful approach to production LLM deployment in a domain where trust and reliability are paramount. The emphasis on transparency, user control, and collaborative improvement creates a system that balances automation benefits with the need for human oversight and correction. The reported 65% automation rate indicates meaningful business impact, though fuller metrics would strengthen the assessment.

The case study is most valuable for its concrete patterns around explainability, uncertainty handling, and user autonomy. These represent reusable approaches applicable beyond expense management. The evaluation strategy and collaborative context management illustrate more advanced LLMOps thinking that goes beyond basic prompt engineering toward systematic improvement cycles.

As with any vendor case study, claims should be viewed as directional rather than definitive. The lack of detailed performance metrics, cost analysis, and discussion of failures or limitations is notable. Nonetheless, the technical patterns described offer practical value for teams building production LLM systems, particularly in domains where user trust and error transparency matter significantly. The case represents mature thinking about LLMOps challenges and demonstrates that with appropriate architectural choices and operational practices, LLM agents can deliver substantial value in production finance workflows.
