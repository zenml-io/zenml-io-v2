---
title: "Building Production-Grade Evaluations for LLM-Based Agents at Scale"
slug: "building-production-grade-evaluations-for-llm-based-agents-at-scale"
draft: false
llmopsTags:
  - "content-moderation"
  - "classification"
  - "prompt-engineering"
  - "agent-based"
  - "evals"
  - "human-in-the-loop"
  - "google-gcp"
industryTags: "media-entertainment"
company: "YouTube"
summary: "YouTube's ads team tackled the challenge of building reliable LLM-based agents for image and video ad generation by developing a comprehensive evaluation framework. The team faced the inherent non-determinism of generative AI outputs and needed to ensure production reliability at scale. Their solution involved starting with small, intuition-based evaluations before scaling to comprehensive systems that combined human raters, LLM-as-judge approaches, and agent trace analysis. The framework emphasized iterative development, clear rubrics, pattern-based analysis rather than isolated failures, and continuous evolution with production data, enabling them to systematically improve agent quality and achieve launch readiness."
link: "https://www.youtube.com/watch?v=xyL2Ltkh-SA"
year: 2026
seo:
  title: "YouTube: Building Production-Grade Evaluations for LLM-Based Agents at Scale - ZenML LLMOps Database"
  description: "YouTube's ads team tackled the challenge of building reliable LLM-based agents for image and video ad generation by developing a comprehensive evaluation framework. The team faced the inherent non-determinism of generative AI outputs and needed to ensure production reliability at scale. Their solution involved starting with small, intuition-based evaluations before scaling to comprehensive systems that combined human raters, LLM-as-judge approaches, and agent trace analysis. The framework emphasized iterative development, clear rubrics, pattern-based analysis rather than isolated failures, and continuous evolution with production data, enabling them to systematically improve agent quality and achieve launch readiness."
  canonical: "https://www.zenml.io/llmops-database/building-production-grade-evaluations-for-llm-based-agents-at-scale"
  ogTitle: "YouTube: Building Production-Grade Evaluations for LLM-Based Agents at Scale - ZenML LLMOps Database"
  ogDescription: "YouTube's ads team tackled the challenge of building reliable LLM-based agents for image and video ad generation by developing a comprehensive evaluation framework. The team faced the inherent non-determinism of generative AI outputs and needed to ensure production reliability at scale. Their solution involved starting with small, intuition-based evaluations before scaling to comprehensive systems that combined human raters, LLM-as-judge approaches, and agent trace analysis. The framework emphasized iterative development, clear rubrics, pattern-based analysis rather than isolated failures, and continuous evolution with production data, enabling them to systematically improve agent quality and achieve launch readiness."
notion:
  pageId: "3aaf8dff-2538-80b2-87a4-cad33b8e4941"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T11:59:00.000Z"
  lastEditedTime: "2026-07-27T11:59:00.000Z"
  publishedAt: "2026-07-27T12:05:36Z"
---

## Overview

YouTube's ads team presented their experiences building production-grade evaluation systems for LLM-based agents that generate image and video models for YouTube advertisements. The team confronted one of the most fundamental challenges in deploying generative AI at scale: managing the non-deterministic nature of LLM outputs while ensuring reliable, predictable behavior in production environments. Their work provides valuable insights into the pragmatic, iterative approach needed to evolve evaluation systems from early prototypes to production-ready systems capable of supporting critical business applications.

The context of this work is particularly important because advertising requires high levels of accuracy, brand safety, and regulatory compliance. Unlike many consumer-facing generative AI applications where occasional mistakes might be tolerable, ads must meet strict quality bars to protect both advertisers and the platform. This creates a demanding environment for LLMOps, where evaluation becomes not just a nice-to-have but a fundamental requirement for launch readiness.

## Foundation and Architecture Approach

The team emphasized that before diving into complex evaluation systems, establishing a solid agent foundation is paramount. This involves creating a focused and strong set of LLM-friendly tools that give the agent capabilities it can reliably invoke. The philosophy here reflects a mature understanding of LLMOps: optimization should start at the tool level before attempting to evaluate and improve the entire agent system. Prematurely building comprehensive evaluations on top of poorly optimized tools leads to confusion about where problems actually originate.

Beyond the base tool set, the architecture incorporated an independent critique agent with a remediation loop. This self-correction mechanism serves as a guardrail to fill gaps where the base tool set has limitations. The overall reliability of the agent is conceptualized as a function of three elements: the capabilities of the agent itself, the guard rails in place, and the evaluation system. This holistic view acknowledges that no single component can guarantee production readiness in isolation.

## The Philosophy of Starting Small: Vibing Before Scaling

One of the most counterintuitive yet valuable insights from the presentation concerns what the team calls "vibing" in early development stages. Rather than immediately building comprehensive, scalable evaluation systems, they advocate for an intuition-based approach when first starting out. During this phase, it's relatively easy to manually inspect outputs and identify issues. While this approach is admittedly non-scalable, it provides several critical benefits that accelerate overall development.

Early-stage vibing allows teams to make radical architectural changes quickly without being constrained by extensive evaluation infrastructure. Prompt tweaks can yield large performance gains, and the team can rapidly iterate without the overhead of constantly recalibrating comprehensive evaluation rubrics. This phase builds deep familiarity with the system's behavior patterns, failure modes, and capabilities, which becomes invaluable knowledge when eventually designing the more formal evaluation framework.

The team illustrated this with a chart showing that jumping to scaled rating systems too early can cause significant volatility in measured performance. This happens because teams end up simultaneously iterating on both the model and the evaluation system itself, making it difficult to understand whether performance changes reflect actual model improvements or merely evaluation calibration issues. By separating these concerns temporally, starting with simple manual inspection and only later building scaled evaluations, teams can more effectively climb the quality ladder.

## Building Scaled Evaluation Systems: Humans and Rubrics

When the project reaches a stage requiring more team involvement and a larger golden dataset, transitioning to scaled human evaluation becomes necessary. The YouTube team worked with external raters and discovered several critical success factors for this approach. First and foremost, providing clear rubrics with concrete examples proved essential. Early on, they encountered numerous edge cases where raters would ask for guidance, and the internal team would sometimes disagree about whether something should pass or fail. This highlighted the importance of achieving strong human-human agreement within the core team before expecting external raters to evaluate consistently.

The team found that obtaining explanations from raters, beyond simple pass/fail judgments, dramatically improved their ability to improve the agent. When raters explain their reasoning, the team gains actionable insights about where the agent needs improvement. This proved valuable for both single-side evaluations and side-by-side comparisons between model versions.

For their use case, evaluations involved multiple dimensions beyond simple correctness. They needed to assess whether ads were accurate, brand-safe, and met expectations across various criteria. This multi-faceted evaluation approach introduces complexity because an agent might perform well on brand safety while failing on accuracy. Explanations help disentangle these dimensions and provide targeted feedback for agent improvement. This multi-output evaluation structure reflects the real-world complexity of production systems that must satisfy multiple constraints simultaneously.

## LLM-as-Judge: Automation with Oversight

Beyond human evaluation, the team adopted LLM-as-judge approaches for automated evaluation at scale. However, they implemented several safeguards to ensure these automated evaluations remained reliable. A critical practice involved monitoring disagreements between human expert ratings and LLM ratings through a sampling pipeline. This agreement rate monitoring provides ongoing confidence that the automated system continues to evaluate appropriately, or raises flags when calibration may be drifting.

The team went beyond simple pass/fail judgments by examining agent traces and conducting spot checks to understand the reasoning behind LLM evaluator decisions. This deeper analysis helps identify when the LLM judge itself might be making systematic errors or applying unexpected logic. The emphasis on high-quality ground truth remained paramount, requiring a golden dataset that covers a broad range of use cases with strong human-human agreement.

## The Importance of Agent Trace Analysis

One of the most illuminating examples from the presentation involved a case where trace analysis revealed a critical failure mode that wouldn't be caught by simple output evaluation. The team had explicitly instructed the agent that disclaimers should never be removed from ads for legal reasons, and this instruction appeared multiple times in the prompts. Despite this, they discovered edge cases where the agent would detect a disclaimer and then proceed to remove it anyway.

The specific example involved an ad for public parks with text reading "America, we can do better" and a disclaimer at the bottom stating "Paid by the community of parks keep parks clean." The agent's trace showed it explicitly detected the disclaimer, noted its presence, and then removed it in violation of instructions. This type of failure would be difficult to detect through aggregate pass-rate metrics alone. Only by examining the agent's reasoning process could the team identify this systematic pattern.

This example underscores a crucial LLMOps principle: for agentic systems, understanding the reasoning process is just as important as evaluating the final output. Agents can arrive at correct outputs through flawed reasoning or produce incorrect outputs despite apparently sound reasoning. Trace analysis provides the observability needed to debug and improve these complex systems. It also helps distinguish between different types of failures, some of which might be acceptable trade-offs while others represent critical bugs requiring immediate attention.

## Generalization, Test Sets, and Production Data

Drawing on traditional machine learning practices, the team emphasized that agents will not generalize well unless explicitly tested for broader capabilities beyond the training distribution. They advocate maintaining separate test sets to evaluate generalization, using these test sets sparingly to avoid overfitting to them, and regularly refreshing them with production data. This mirrors the train/validation/test split discipline from classical ML, adapted to the agent evaluation context.

The emphasis on production data reflects a mature understanding that evaluation systems must evolve alongside the product. Initial golden sets reflect the team's hypotheses about what matters, but real-world usage invariably reveals new edge cases, use patterns, and failure modes. Continuously incorporating production examples ensures evaluations remain representative of actual system behavior rather than becoming stale benchmarks that no longer reflect reality.

## Hill Climbing and Iterative Improvement

The team described a systematic iteration loop for quality improvement. After human evaluation, if the agent meets the quality bar, the work is complete. More commonly, it doesn't meet the bar, triggering a review of the evaluation set to compute metrics like precision and recall. The team can then iterate by adjusting the evaluation rubric, the rating guide, the model itself, or the agent's tooling. This creates a virtuous cycle where both the evaluation system and the agent co-evolve toward higher quality.

This hill-climbing approach works well once a solid evaluation framework exists, enabling systematic ablation studies and quality improvements. However, the team cautioned against certain pitfalls. A tempting trap involves hyperfixating on individual failed examples and immediately adjusting prompts to fix that specific case. Because these are non-deterministic systems, optimizing for single examples often leads to overfitting and may not address broader patterns. Instead, the golden set should contain multiple examples representing each pattern of concern, and improvements should be evaluated based on pattern-level performance rather than individual cases.

## Launch Readiness and Regression Analysis

For production deployment, the team emphasized the importance of understanding regressions: identifying where and why model performance degrades to distinguish acceptable trade-offs from critical failures. Not all regressions are equal; some represent reasonable compromises to improve other dimensions, while others are blockers. Clear launch criteria and gatekeeping rules need to be established early, whether based on precision/recall thresholds, specific critical capabilities, or other metrics tailored to the use case.

The process involves iterative model development, ablation studies to understand the impact of specific changes, and A/B comparisons between versions. Throughout this process, focusing on patterns rather than isolated runs prevents overreaction to individual cases and ensures improvements generalize. The team also stressed the importance of investing in online evaluations that monitor production behavior, complementing the offline golden set evaluations used during development.

## Characteristics of Effective Evaluation Systems

The presentation concluded with principles for what makes a good evaluation system. It should be representative of what you want your product to excel at, recognizing that this will differ between MVP development and production rollout stages. The evaluation system must continuously evolve through online monitoring, test set refreshing, and sampling pipelines that ensure it remains aligned with production reality.

Highly curated golden sets remain foundational, evolving as use cases expand. Training all stakeholders, whether external raters or cross-functional team members, on evaluation criteria ensures consistent assessment. Clear rater templates and rubrics with concrete examples reduce ambiguity and prevent evaluators from frequently returning uncertain judgments. Finally, choosing appropriate launch metrics and thresholds matched to the specific use case provides clear gates for production readiness decisions.

## Balanced Assessment

While the presentation provides valuable practical guidance, some caution is warranted in interpreting these recommendations. The team works at YouTube with substantial resources for evaluation infrastructure, external rater programs, and dedicated ML tooling. Smaller teams may need to adapt these approaches to their resource constraints, potentially spending more time in the "vibing" phase or using simpler evaluation frameworks.

The emphasis on starting small and building intuition before scaling is genuinely valuable and runs counter to some industry narratives that suggest comprehensive evaluation from day one. However, teams should be mindful that the appropriate timing for transitioning from manual to scaled evaluation depends heavily on the risk profile of their application. For high-stakes domains, more formal evaluation may be needed earlier than for lower-risk experiments.

The discussion of LLM-as-judge approaches acknowledges the need for monitoring agreement rates with human evaluations, which is methodologically sound. However, the presentation could have delved deeper into the limitations of LLM judges, particularly for nuanced judgments or cases where the judge model shares biases with the agent model being evaluated. The combination of human and automated evaluation represents a pragmatic approach, but teams should remain vigilant about automation bias and regularly audit their LLM judge performance.

The trace analysis example powerfully demonstrates the value of observability in agent systems, though implementing comprehensive trace analysis at scale introduces its own infrastructure challenges. Teams will need to invest in logging, storage, and analysis tooling to make trace-based debugging practical, particularly as agent complexity and invocation volume increase.

Overall, the presentation reflects hard-won practical experience deploying LLM agents in a demanding production environment. The iterative, pragmatic approach described likely resonates more with practitioners' experiences than idealized evaluation frameworks that assume perfect rubrics and datasets from the start. The emphasis on co-evolution of evaluation and agent systems, pattern-based analysis, and continuous incorporation of production data represents mature LLMOps practice that can guide teams building similar systems.
