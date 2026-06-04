---
title: "Hybrid Agent Architecture with Open-Source Workers and Frontier Advisors for Legal AI"
slug: "hybrid-agent-architecture-with-open-source-workers-and-frontier-advisors-for-legal-ai"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "document-processing"
  - "fine-tuning"
  - "multi-agent-systems"
  - "cost-optimization"
  - "harness-engineering"
  - "instruction-tuning"
  - "agent-based"
  - "evals"
  - "open-source"
  - "anthropic"
  - "openai"
  - "hugging-face"
industryTags: "legal"
company: "Harvey"
summary: "Fireworks and Harvey partnered to explore cost-effective approaches to achieving frontier-level performance on legal AI tasks using the Legal Agent Benchmark (LAB). The team investigated two primary strategies: a hybrid agent harness combining an open-source GLM 5.1 worker model with Claude Opus 4.7 as a callable advisor tool, and post-training techniques (supervised and reinforcement fine-tuning) on Kimi K2.6. The hybrid harness approach achieved 18/100 tasks with full rubric pass at $368 total cost, outperforming standalone Claude Opus 4.7 which scored 14/100 at $954 cost. Post-training lifted Kimi K2.6's mean score from 0.863 to 0.876 with SFT and 0.886 with RFT, while maintaining inference costs around $84. These results demonstrate that strategic orchestration of open-source models with selective frontier model consultation, combined with domain-specific fine-tuning, can match or exceed frontier performance while reducing costs by 60% or more."
link: "https://fireworks.ai/blog/open-source-agents-frontier-advisors"
year: 2026
seo:
  title: "Harvey: Hybrid Agent Architecture with Open-Source Workers and Frontier Advisors for Legal AI - ZenML LLMOps Database"
  description: "Fireworks and Harvey partnered to explore cost-effective approaches to achieving frontier-level performance on legal AI tasks using the Legal Agent Benchmark (LAB). The team investigated two primary strategies: a hybrid agent harness combining an open-source GLM 5.1 worker model with Claude Opus 4.7 as a callable advisor tool, and post-training techniques (supervised and reinforcement fine-tuning) on Kimi K2.6. The hybrid harness approach achieved 18/100 tasks with full rubric pass at $368 total cost, outperforming standalone Claude Opus 4.7 which scored 14/100 at $954 cost. Post-training lifted Kimi K2.6's mean score from 0.863 to 0.876 with SFT and 0.886 with RFT, while maintaining inference costs around $84. These results demonstrate that strategic orchestration of open-source models with selective frontier model consultation, combined with domain-specific fine-tuning, can match or exceed frontier performance while reducing costs by 60% or more."
  canonical: "https://www.zenml.io/llmops-database/hybrid-agent-architecture-with-open-source-workers-and-frontier-advisors-for-legal-ai"
  ogTitle: "Harvey: Hybrid Agent Architecture with Open-Source Workers and Frontier Advisors for Legal AI - ZenML LLMOps Database"
  ogDescription: "Fireworks and Harvey partnered to explore cost-effective approaches to achieving frontier-level performance on legal AI tasks using the Legal Agent Benchmark (LAB). The team investigated two primary strategies: a hybrid agent harness combining an open-source GLM 5.1 worker model with Claude Opus 4.7 as a callable advisor tool, and post-training techniques (supervised and reinforcement fine-tuning) on Kimi K2.6. The hybrid harness approach achieved 18/100 tasks with full rubric pass at $368 total cost, outperforming standalone Claude Opus 4.7 which scored 14/100 at $954 cost. Post-training lifted Kimi K2.6's mean score from 0.863 to 0.876 with SFT and 0.886 with RFT, while maintaining inference costs around $84. These results demonstrate that strategic orchestration of open-source models with selective frontier model consultation, combined with domain-specific fine-tuning, can match or exceed frontier performance while reducing costs by 60% or more."
notion:
  pageId: "374f8dff-2538-8013-9d3b-c6315a377ac0"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-03T19:17:00.000Z"
  lastEditedTime: "2026-06-03T19:17:00.000Z"
  publishedAt: "2026-06-04T08:02:58Z"
---

## Overview

This case study documents a collaboration between Fireworks (an AI platform provider) and Harvey (a legal AI company) focused on achieving frontier-level performance on complex legal tasks while optimizing for cost and control. The work centers on Harvey's Legal Agent Benchmark (LAB), a comprehensive evaluation suite with 1,250 tasks across 24 legal practice areas and over 75,000 expert-written rubric criteria. The case study explores two complementary LLMOps strategies: harness engineering through a hybrid multi-agent architecture, and model-level improvements through post-training on domain-specific data.

The fundamental production challenge being addressed is one that many enterprise LLM deployments face: how to deliver frontier-quality outputs without paying frontier-model costs on every query, while maintaining the control and observability that production systems require. The legal domain makes this challenge particularly acute because tasks involve long reasoning chains, strict citation requirements, and unforgiving evaluation criteria where missing even one requirement can render an entire deliverable unusable.

## The Evaluation Framework: Legal Agent Benchmark

LAB represents a sophisticated approach to domain-specific LLM evaluation. Each task simulates partner-level legal instructions over a client-matter environment with required deliverables and detailed rubrics. The benchmark uses two complementary metrics that reveal different aspects of model performance. The mean score metric measures the share of rubric criteria a model passes averaged across all tasks, providing a continuous signal of overall quality. The all-pass metric is more stringent, counting only tasks where every single criterion passes, which the team positions as the production-readiness measure since partially complete legal work often has no practical value.

The team worked with an initial 100-task slice that mirrors the distribution of the full 1,250-task benchmark, preserving the practice-area mix. This approach balances evaluation thoroughness with iteration speed, allowing them to run multiple experimental configurations while maintaining statistical validity. Standard errors are reported at approximately 0.009 for mean score (about 1 percentage point) and 2.5 percentage points for all-pass metrics (about 2.5 tasks out of 100) across re-runs.

## Baseline Performance: Open-Source vs. Frontier Models

The initial evaluation phase establishes important baseline truths about the open-source versus closed-source landscape for legal AI. On mean score, the gap is surprisingly narrow: GLM 5.1 achieved 0.8921, essentially matching GPT-5.5's 0.892 and trailing Claude Opus 4.7's 0.911 by less than 2 points. Kimi K2.6 (0.863) and DeepSeek V4 Pro (0.871) performed slightly lower but remained viable for production consideration.

The all-pass metric reveals where frontier models maintain their edge: Opus 4.7 scored 14/100, GPT-5.5 scored 11/100, and GLM 5.1 scored 12/100. This gap between high mean scores and lower all-pass rates indicates that models frequently get most criteria right but fail to close out tasks completely—exactly the problem that reinforcement and more sophisticated orchestration can address.

Cost differences are dramatic and consequential for production economics. GLM 5.1 reached its 0.8921 mean score for $121 across the 100-task run, while GPT-5.5's nearly identical score cost $560. Claude Opus 4.7's strongest performance ran $954, roughly 8× the cost of leading open-source alternatives. These numbers use estimated costs based on serverless rates from Fireworks for open-source models and published API rates from Anthropic and OpenAI, so actual production costs would depend on specific contract terms and infrastructure choices.

## Hybrid Harness Architecture: Open-Source Worker with Frontier Advisor

The hybrid harness represents the team's primary innovation in production system design. Rather than choosing between an open-source model or a frontier model, they constructed a multi-agent system with an open-source worker at its core and a frontier model available as a callable tool. This architectural choice fundamentally reframes the role of expensive frontier models from load-bearing dependencies to specialized consultants invoked only when needed.

The implementation details reveal a thoughtful approach to agent orchestration. GLM 5.1 serves as the worker, handling the bulk of reasoning, drafting, and tool calls. Critically, there is no external router or orchestrator making decisions about when to invoke the advisor—the worker model itself determines when it needs a second opinion. This design gives the system emergent adaptability: the worker can call Claude Opus 4.7 for help on retrieval, drafting, validation, or other sub-tasks where it recognizes uncertainty.

The usage pattern that emerged shows remarkable efficiency: across the 100-task run, the advisor was invoked just 0.83 times per task on average. This sparse-but-targeted use captures most of the quality benefit of running the frontier model end-to-end while minimizing cost. Trace analysis shows a recognizable behavioral pattern: the worker's turn count increases meaningfully compared to a GLM 5.1-only run, with the model typically reaching an uncertain step during validation or mid-draft, calling the advisor for guidance or review, then resuming the trajectory with additional turns informed by the advisor's response. In essence, the advisor steers while the worker does most of the actual work.

The production results validate this approach convincingly. The hybrid harness moved GLM 5.1 from 12/100 all-pass to 18/100—higher than Claude Opus 4.7's standalone 14/100—at $368 total cost across the 100 tasks, roughly 39% of Opus's $954 standalone cost. Compared to Opus, this represents both better quality (+4 tasks) and dramatically lower cost (-$586). Compared to GLM 5.1 alone, the advisor adds 6 tasks for $246, demonstrating that the cost increase is justified by meaningful quality improvement while maintaining the open-source worker as the core.

From an LLMOps perspective, this architecture provides several production advantages beyond cost. It creates a tunable cost-performance knob that can be adjusted based on task complexity: dial advisor calls up on complex matters, down on routine ones. The system is inspectable and debuggable because the orchestration logic is explicit rather than hidden inside a single model's reasoning. Teams can monitor advisor invocation patterns, understand when and why they occur, and tune the system based on production telemetry.

## Post-Training on Fireworks: SFT and RFT

The second major intervention focuses on improving open-source models through domain-specific post-training. Fireworks' platform handles the full training stack—supervised fine-tuning, reinforcement fine-tuning, full-parameter or LoRA approaches, custom loss functions—all on the same infrastructure used for serving. This eliminates what the team describes as the "research-to-production gap," where models trained in one environment must be converted and deployed to another, often with numeric drift or optimization losses.

The team chose Kimi K2.6, a trillion-parameter mixture-of-experts model, deliberately because its scale forces the platform to handle the kind of training that would actually be required in production. This is not a toy example on a 7B parameter model but a realistic demonstration of post-training at frontier scale.

The supervised fine-tuning approach follows a straightforward recipe designed to establish a clean baseline. They ran Kimi K2.6 through LAB, kept only the completions that passed LAB's rubric criteria (the high-quality trajectories), and used these as training data for an SFT job. Notably, they avoided unnecessary complexity: no reward model, no human relabeling, no architecture changes. This minimalist approach yielded meaningful improvements: all-pass moved from 11/100 to 15/100 and mean score from 0.863 to 0.876, at essentially unchanged inference cost ($84 versus $75 across the 100-task run). Four additional tasks achieving full pass with no other stack changes demonstrates the headroom available when teams move beyond prompt engineering alone.

Reinforcement fine-tuning represents the natural progression when SFT plateaus. RFT trains against the LAB evaluators directly using per-criterion rewards rather than merely imitating passing trajectories. The team ran RFT on a different sample of the training set than SFT, using the same Kimi K2.6 base. Training proceeded across 46 rollout steps with continuous evaluation on the 100-task slice at each step. The smoothed mean score climbed from 0.82 at the start to 0.886 at the final step, with a particularly notable jump from 0.864 to 0.882 between steps 43 and 44 that cleared both the base model (0.863) and the SFT checkpoint (0.876) in a single step.

The RFT trajectory illustrates both the promise and challenges of reinforcement approaches. While noisier and more compute-intensive than SFT, RFT can capture quality improvements that imitation learning leaves on the table. The continuous evaluation during training provides immediate feedback about whether the training signal is working, a critical capability for expensive training runs. The fact that the final checkpoint showed clear improvement over both the base and SFT models validates the additional investment, though production teams would need to weigh whether the incremental gain from 0.876 to 0.886 justifies the added training complexity.

## Platform Integration and Production Deployment

A subtle but crucial theme throughout the case study is Fireworks' emphasis on platform integration between training and serving. The team repeatedly highlights that the model coming off a training run is bit-for-bit identical to the model served in production, with no numeric drift between training and serving environments. This might seem like a minor implementation detail, but it addresses a common production pain point where models trained in one environment show different behavior when deployed.

The platform supports dedicated infrastructure for post-training with handoff to the same serving endpoint used for production traffic. For mixture-of-experts models like Kimi K2.6, maintaining numerical alignment requires careful attention to quantization, kernel implementations, and distributed computation strategies. The team references separate technical posts on MoE numerics and fine-tuning bottlenecks, suggesting these are non-trivial engineering challenges that many platforms handle poorly.

From an LLMOps workflow perspective, this integration means teams can fine-tune against domain-specific benchmarks like LAB, evaluate continuously during training, and deploy results without crossing environment boundaries. This tight loop enables faster iteration and higher confidence that training improvements will translate to production performance.

## Cost-Quality Tradeoffs and Production Economics

The case study provides unusually detailed cost-quality analysis across multiple configurations, offering insights into production economics for legal AI systems. The data reveals that achieving frontier performance doesn't require frontier costs if teams are willing to invest in system-level optimization.

The hybrid harness demonstrates the most dramatic cost-quality improvement: achieving 18/100 all-pass at $368 versus Opus's 14/100 at $954 represents a 29% quality improvement at 61% lower cost. This isn't a marginal optimization but a fundamentally different economic profile for the same class of work. For organizations processing thousands of legal tasks monthly, these differences compound into substantial operational cost reductions.

The post-training results show different tradeoffs. SFT moves Kimi K2.6 from 11/100 to 15/100 all-pass at essentially unchanged inference cost, meaning the improvement is "free" at serving time once training costs are amortized. Whether this makes economic sense depends on training costs (not disclosed) and expected inference volume. For high-volume applications, even expensive training runs amortize quickly when inference costs remain constant.

RFT's move from 0.876 to 0.886 mean score represents incremental improvement over SFT. Whether this justifies the additional training complexity depends on how much those additional quality points matter for downstream applications. In legal contexts where even small error rates can have significant consequences, the additional improvement might justify considerable training investment.

## Critical Assessment and Limitations

While the results are impressive, several caveats merit attention when evaluating these claims. The work evaluates on a 100-task slice rather than the full 1,250-task benchmark, which may not capture all the statistical variability in the full distribution. The team notes this mirrors Harvey's sampling approach and preserves practice-area distribution, but production teams should be cautious about over-generalizing from the subset.

Cost estimates are based on current serverless rates and published API pricing, which may not reflect actual production costs under enterprise contracts or when running on dedicated infrastructure. The comparison somewhat overstates the advantage of the open-source approaches if organizations have already negotiated volume discounts with frontier model providers. Additionally, the cost analysis doesn't include training costs for the fine-tuned models, only inference costs, which matters for organizations evaluating total cost of ownership.

The hybrid harness's success depends on the worker model having enough capability to recognize when it needs help—a form of metacognitive accuracy that may not hold across all model scales or task types. The trace analysis suggests this works well for GLM 5.1 on legal tasks, but it's unclear how this pattern would generalize to smaller models or different domains. There's also a question of whether the advisor invocation pattern is stable across task types or whether certain practice areas trigger much higher advisor usage, which would affect cost predictability.

The post-training experiments used LAB trajectories for training data, raising questions about generalization beyond the benchmark. While the team used different samples for training versus evaluation, there's still potential for optimization-to-the-test effects. Production teams would need to validate that these improvements transfer to real client work beyond the benchmark tasks.

The case study presents Fireworks' platform capabilities prominently, which is expected given the source but means readers should evaluate infrastructure claims independently. The emphasis on bit-for-bit training-to-serving handoff and lack of numeric drift addresses real production concerns, but teams should validate these properties in their own deployment contexts.

## Implications for LLMOps Practice

Several patterns from this work have broader implications for LLM production systems. The hybrid harness architecture demonstrates that the unit of deployment doesn't need to be a single model call—production systems can benefit from treating frontier models as callable tools within larger orchestration frameworks. This requires infrastructure that makes cross-model calls efficient and observable, but the cost-quality tradeoffs can justify the added complexity.

The post-training results reinforce that domain-specific fine-tuning remains highly valuable even as base models improve. The gap from 0.863 to 0.886 mean score through SFT and RFT represents capturing domain-specific patterns that even trillion-parameter models don't learn from general pre-training. For production applications with well-defined task distributions, investing in post-training can deliver lasting competitive advantages.

The evaluation methodology—using both continuous metrics (mean score) and strict production-readiness metrics (all-pass)—offers a model for how to think about LLM evaluation in high-stakes domains. Mean score tracks overall capability and guides training, while all-pass measures whether the system is actually ready for production use. Many organizations evaluate only on average metrics and discover production readiness gaps too late.

## Future Work and Open Questions

The team outlines several directions for future work. They plan improved post-training on the best open-weights models (Kimi K2.6, GLM 5.1, DeepSeek V4 Pro) through more informative reward modeling and enhanced training techniques. This suggests the current RFT results aren't close to the ceiling of what's possible with better reward shaping.

For harness engineering, they're exploring extending the advisor mechanic to more practice areas and investigating whether smaller specialized open-source models could handle sub-tasks currently absorbed by the advisor. They're also examining context compaction between turns as a cost-and-quality lever at LAB's trajectory lengths. This suggests recognition that the current advisor invocation pattern, while effective, might not be optimal.

Several questions remain open for teams considering similar approaches. How does the hybrid harness pattern perform on domains other than legal work? Do other open-source models develop the same metacognitive accuracy to call advisors appropriately? What are the training costs for frontier-scale post-training and how do they factor into total cost of ownership? How do these approaches perform on the full 1,250-task LAB benchmark versus the 100-task slice?

The case study represents a sophisticated approach to production LLM systems that moves beyond simple model selection toward system-level optimization through orchestration and domain-specific training, all executed on infrastructure designed to support the full development-to-deployment lifecycle without environment boundaries.
