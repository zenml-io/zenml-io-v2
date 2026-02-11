---
title: "Building Scalable LLM Evaluation Systems for Healthcare Prior Authorization"
slug: "building-scalable-llm-evaluation-systems-for-healthcare-prior-authorization"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67ba2b6323a42bb13ade2ef9"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:01:08.663Z"
  createdOn: "2025-02-22T19:54:11.631Z"
llmopsTags:
  - "healthcare"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "human-in-the-loop"
  - "error-handling"
  - "fallback-strategies"
  - "monitoring"
  - "reliability"
  - "guardrails"
  - "anthropic"
industryTags: "healthcare"
company: "Anterior"
summary: "Anterior, a healthcare AI company, developed a scalable evaluation system for their LLM-powered prior authorization decision support tool. They faced the challenge of maintaining accuracy while processing over 100,000 medical decisions daily, where errors could have serious consequences. Their solution combines real-time reference-free evaluation using LLMs as judges with targeted human expert review, achieving an F1 score of 96% while keeping their clinical review team under 10 people, compared to competitors who employ hundreds of nurses."
link: "https://www.youtube.com/watch?v=cZ5ZJy19KMo"
year: 2023
seo:
  title: "Anterior: Building Scalable LLM Evaluation Systems for Healthcare Prior Authorization - ZenML LLMOps Database"
  description: "Anterior, a healthcare AI company, developed a scalable evaluation system for their LLM-powered prior authorization decision support tool. They faced the challenge of maintaining accuracy while processing over 100,000 medical decisions daily, where errors could have serious consequences. Their solution combines real-time reference-free evaluation using LLMs as judges with targeted human expert review, achieving an F1 score of 96% while keeping their clinical review team under 10 people, compared to competitors who employ hundreds of nurses."
  canonical: "https://www.zenml.io/llmops-database/building-scalable-llm-evaluation-systems-for-healthcare-prior-authorization"
  ogTitle: "Anterior: Building Scalable LLM Evaluation Systems for Healthcare Prior Authorization - ZenML LLMOps Database"
  ogDescription: "Anterior, a healthcare AI company, developed a scalable evaluation system for their LLM-powered prior authorization decision support tool. They faced the challenge of maintaining accuracy while processing over 100,000 medical decisions daily, where errors could have serious consequences. Their solution combines real-time reference-free evaluation using LLMs as judges with targeted human expert review, achieving an F1 score of 96% while keeping their clinical review team under 10 people, compared to competitors who employ hundreds of nurses."
---

## Overview

Anterior is a healthcare AI company that provides AI-powered prior authorization support for insurance providers. Their system processes medical records and clinical guidelines to determine whether treatment requests should be approved or escalated for clinical review. The speaker, Christopher (a medical doctor turned AI engineer), describes how they built an evaluation system that enables them to serve customers covering 50 million American lives while maintaining the accuracy required for mission-critical healthcare decisions.

The core challenge Anterior faces is that healthcare AI systems must be essentially error-free—organizations in US healthcare are currently being sued for inappropriate use of AI automation. Yet as systems scale from MVP to production, edge cases multiply, and traditional quality assurance approaches break down. This talk represents approximately 18 months of learning about how to build evaluation systems that work at scale.

## The Scaling Problem

The talk opens with a fundamental insight about LLM-powered products: creating an MVP is increasingly easy as models become more powerful, but scaling to serve customers reliably exposes problems that aren't visible at smaller volumes. The speaker illustrates this with a concrete example from medical decision-making.

Anterior's AI might generate an answer stating that a patient's brain MRI shows findings "suspicious for multiple sclerosis" when the patient actually has a confirmed MS diagnosis. This distinction matters enormously in a medical context—"suspicious" implies no confirmed diagnosis. Such subtle errors might occur once per thousand or ten thousand cases, but at 100,000 cases per day, that becomes a significant problem.

The fundamental scaling challenge becomes clear through arithmetic. If you want to review 50% of cases to understand performance, and clinicians can each review about 100 cases per day, then:
- At 1,000 decisions/day: 500 reviews = 5 clinicians (manageable)
- At 10,000 decisions/day: 5,000 reviews = 50 clinicians (larger than their entire company)
- Even at 5% review rate at 100,000 decisions/day: 5,000 reviews = 50 clinicians

This scaling challenge creates two critical questions that any production LLM system must answer: (1) Which cases should receive human review? and (2) How did the system perform on cases that weren't reviewed?

## Human Review Infrastructure

Before discussing automated evaluation, the talk emphasizes the importance of high-quality human review infrastructure. Anterior built internal tooling called "Scalp"—a review dashboard designed to maximize reviewer efficiency. The interface surfaces all required context (medical records and guidelines) without scrolling, displays the question being answered alongside required context, and allows reviewers to add critiques explaining what's wrong with incorrect answers.

A key insight is that human-generated critiques (statements of what's wrong) can be used to generate ground truths (statements of what the correct answer should be). These ground truths then feed into offline evaluation datasets. This represents a virtuous cycle where production review work contributes directly to improving evaluation capabilities.

## Offline Evaluation Datasets

Anterior builds offline evaluation datasets from production data, segmented by enterprise, medical condition type, case complexity, and outcome ambiguity. These datasets serve multiple purposes: defining gold standards, tracking performance over time, and iterating on AI pipelines.

However, the speaker explicitly warns that relying only on offline evaluations is "playing with fire." The input space of medical records has extremely high heterogeneity, meaning that at scale, systems continually encounter edge cases not represented in any offline dataset. By the time a new edge case appears in offline evaluation data (which is built downstream of customer delivery), damage may already be done.

## Real-Time Reference-Free Evaluation

The core innovation described is a real-time, reference-free evaluation system. "Reference-free" (also called "label-free") means evaluating outputs before knowing the true outcome—i.e., before human review has occurred. This enables real-time response to issues as they arise.

The basic architecture uses LLM-as-judge approaches: outputs from the primary LLM pipeline are fed into a separate evaluation system along with a scoring rubric. This scoring system can evaluate multiple dimensions—helpfulness, conciseness, tone, or (in Anterior's case) confidence that the output is correct.

For Anterior's binary classification task (approve vs. escalate for review), the reference-free evaluation produces:
- A confidence grading from high confidence (likely correct) through low confidence to active prediction of incorrectness
- A predicted correct output (what the system believes the right answer is)

These signals enable several critical capabilities:

**Real-time performance estimation**: Across all cases (not just human-reviewed ones), the system estimates its own accuracy. This enables proactive response and customer communication without waiting for human review results.

**Alignment monitoring**: For cases that receive both reference-free evaluation and human review, Anterior computes alignment metrics to validate how well the automated evaluation system performs. This "validating the validator" approach enables continuous improvement of the evaluation system itself.

**Dynamic case prioritization**: Confidence grades combine with contextual factors (procedure cost, bias risk, historical error rates) to dynamically prioritize which cases receive human review. This ensures that limited human review capacity focuses on the highest-risk cases.

## The Virtuous Cycle

The architecture creates a self-improving loop. Reference-free evaluation surfaces potentially problematic cases. Human review validates those cases and generates ground truth data. That data improves both the primary AI pipeline and the evaluation system itself. Over time, the space of unseen edge cases shrinks while detection capability improves.

The speaker notes that this creates a significant competitive moat: while competitors might replicate the product itself, the evaluation system can only be built through processing high volumes of real production data through multiple data-driven iterations.

## Production Integration

Once confidence in the evaluation system reaches sufficient levels, it can be integrated directly into the production pipeline as a gate. The flow becomes:
- Input → Primary LLM Pipeline → Output → Reference-Free Evaluation → Decision
- High confidence: Return to customer directly
- Low confidence: Take further action

"Further action" options include:
- Routing to a more expensive model pipeline
- Internal human review by on-call clinicians
- Surfacing to customer's own review dashboard

This architecture provides multiple layers of protection while optimizing for efficiency on high-confidence cases.

## Results and Impact

The business outcomes reported are significant, though should be evaluated with appropriate skepticism given this is a company presentation:

- A team of fewer than 10 clinical experts reviews tens of thousands of cases (compared to a competitor reportedly employing 800+ nurses for reviews)
- AI-to-human review alignment is described as "comparable" to human-to-human reviewer alignment after several iterations
- F1 score of nearly 96% on prior authorization in a recent study
- Ability to meet customer SLAs on response time while maintaining quality

The speaker emphasizes customer trust as the ultimate outcome, with one anecdote about a nurse expressing relief ("Thank God") at being able to continue using the system.

## Principles for Building Evaluation Systems

The talk concludes with three recommended principles:

**Think systemically**: Don't just use review data to audit performance—use it to build, audit, and improve the auditing system itself. The evaluation system should be a first-class product concern.

**Evaluate on live production data**: Don't rely solely on offline evaluations. Problems must be identified immediately in production to enable rapid response.

**Prioritize reviewer quality over quantity**: Get the best reviewers and empower them with custom tooling. Anterior built internal tooling specifically to accelerate their clinical review team rather than relying on off-the-shelf solutions.

## Critical Assessment

The case study presents a compelling architecture for production LLM evaluation, but some claims warrant scrutiny. The 96% F1 score comes from "a recent study" without details on methodology or comparison conditions. The alignment claim (AI-human comparable to human-human) would benefit from specific metrics. The competitive comparison (10 reviewers vs. 800 nurses) may involve different scopes of work.

That said, the core architectural insights—reference-free real-time evaluation, dynamic prioritization, virtuous improvement cycles, and evaluation system validation—represent genuinely valuable patterns for mission-critical LLM deployments. The healthcare prior authorization domain provides an excellent example of where traditional sampling-based quality approaches fail at scale and where LLM-as-judge approaches can add significant value when properly calibrated against human judgment.