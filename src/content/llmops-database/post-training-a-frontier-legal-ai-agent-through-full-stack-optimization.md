---
title: "Post-Training a Frontier Legal AI Agent Through Full-Stack Optimization"
slug: "post-training-a-frontier-legal-ai-agent-through-full-stack-optimization"
draft: false
llmopsTags:
  - "document-processing"
  - "high-stakes-application"
  - "reinforcement-learning"
  - "prompt-engineering"
  - "agent-based"
  - "harness-engineering"
  - "cost-optimization"
  - "human-in-the-loop"
  - "evals"
  - "docker"
  - "monitoring"
  - "open-source"
  - "anthropic"
  - "openai"
industryTags: "legal"
company: "Harvey"
summary: "Applied Compute partnered with Harvey to post-train GLM-5.1 into a state-of-the-art legal agent that achieved the highest rubric pass rate (0.913) on Harvey's Legal Agent Benchmark (LAB), surpassing frontier models like GPT-5.5 xhigh and Opus 4.8 Max. The solution involved comprehensive optimization across the entire training stack: analyzing and selecting cost-effective grader models, engineering an improved agent harness with compaction capabilities, and conducting full-parameter reinforcement learning on Applied Compute's AC2 platform. The training process yielded measurable improvements in artifact completeness, specificity, and grounding behaviors, with the model learning more efficient tool usage—reducing tool calls from 104 to 42 and payload tokens from 461k to 250k on sample tasks while dramatically improving rubric scores from 0.853 to 0.913."
link: "https://www.appliedcompute.com/case-studies/harvey"
year: 2026
seo:
  title: "Harvey: Post-Training a Frontier Legal AI Agent Through Full-Stack Optimization - ZenML LLMOps Database"
  description: "Applied Compute partnered with Harvey to post-train GLM-5.1 into a state-of-the-art legal agent that achieved the highest rubric pass rate (0.913) on Harvey's Legal Agent Benchmark (LAB), surpassing frontier models like GPT-5.5 xhigh and Opus 4.8 Max. The solution involved comprehensive optimization across the entire training stack: analyzing and selecting cost-effective grader models, engineering an improved agent harness with compaction capabilities, and conducting full-parameter reinforcement learning on Applied Compute's AC2 platform. The training process yielded measurable improvements in artifact completeness, specificity, and grounding behaviors, with the model learning more efficient tool usage—reducing tool calls from 104 to 42 and payload tokens from 461k to 250k on sample tasks while dramatically improving rubric scores from 0.853 to 0.913."
  canonical: "https://www.zenml.io/llmops-database/post-training-a-frontier-legal-ai-agent-through-full-stack-optimization"
  ogTitle: "Harvey: Post-Training a Frontier Legal AI Agent Through Full-Stack Optimization - ZenML LLMOps Database"
  ogDescription: "Applied Compute partnered with Harvey to post-train GLM-5.1 into a state-of-the-art legal agent that achieved the highest rubric pass rate (0.913) on Harvey's Legal Agent Benchmark (LAB), surpassing frontier models like GPT-5.5 xhigh and Opus 4.8 Max. The solution involved comprehensive optimization across the entire training stack: analyzing and selecting cost-effective grader models, engineering an improved agent harness with compaction capabilities, and conducting full-parameter reinforcement learning on Applied Compute's AC2 platform. The training process yielded measurable improvements in artifact completeness, specificity, and grounding behaviors, with the model learning more efficient tool usage—reducing tool calls from 104 to 42 and payload tokens from 461k to 250k on sample tasks while dramatically improving rubric scores from 0.853 to 0.913."
notion:
  pageId: "388f8dff-2538-808e-aff0-ea56135d5777"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-23T07:19:00.000Z"
  lastEditedTime: "2026-06-23T07:19:00.000Z"
  publishedAt: "2026-06-29T15:15:24Z"
---

## Overview

This case study details a sophisticated collaboration between Applied Compute and Harvey to create a state-of-the-art legal AI agent by post-training GLM-5.1 on Harvey's Legal Agent Benchmark (LAB). The work exemplifies modern LLMOps practices at scale, demonstrating end-to-end optimization from data curation and grader selection through full-parameter reinforcement learning to production-ready deployment. The resulting model achieved a rubric pass rate of 0.913, exceeding both GPT-5.5 xhigh and Opus 4.8 Max—representing what the authors claim is the strongest performance on this benchmark at the time.

Harvey operates in the legal AI space, providing AI solutions to law firms and legal teams. Their open-source Legal Agent Benchmark serves as the evaluation framework for this work, comprising over 1,250 tasks spanning 24 legal practice areas with more than 75,000 binary criteria. The benchmark's strict grading schema requires models to satisfy all criteria for a task to pass, making it particularly challenging for frontier models. Legal work presents unique AI challenges because partial success is insufficient—missing a single required clause, overlooking a document, or misstating jurisdictional details can cause complete task failure.

## Full-Stack Optimization Methodology

The training methodology centered on Applied Compute's AC2 platform (Applied Compute Agent Cloud), which enabled evaluations, training jobs, consistency checks, and supporting analyses. A critical insight driving the work was recognizing that training powerful open-weight models on difficult-to-verify tasks requires absolute trust in the optimization signal—any flaw in the grader would be exploited during training as the model learns loopholes in evaluation criteria.

### Grader Analysis and Cost Optimization

The team conducted thorough analysis to select optimal grader models, recognizing that LAB utilizes LLM-as-a-Judge methodology for evaluation. They analyzed frontier models GPT-5.5 and Opus 4.7 on a 50-point subset producing traces with over 2,500 rubric criteria. Multiple reruns measured self-consistency and cross-consistency, establishing that GPT-5.5 xhigh and Claude Opus 4.7 Max agreed on over 95% of criteria across runs. This consensus set became the "gold-trace ground truth" for evaluating candidate graders.

The grader analysis revealed that medium-sized models like GPT-5 Mini and Claude Sonnet 4.6 maintained high quality at 97%+ alignment with frontier ground truth, while smaller models showed more variance—GPT-5 Nano at 95% and Haiku 4.5 dropping to 82%. The top four graders demonstrated exceptional self-consistency with a floor of 98.9% per-criteria consistency across three reruns, indicating well-constructed, unambiguous criteria. Cross-consistency metrics showed 0.99 Pearson correlation across criteria for these top graders.

A particularly important LLMOps insight came from cost-alignment analysis. The team discovered that switching from the original LAB setup (Claude Sonnet 4.6 with one criterion per call) to GPT-5 Mini while batching multiple criteria per call achieved 40x to 100x cost savings depending on batch size (16-per-group to all-criteria-in-one-group respectively), while maintaining alignment above 97%. This finding proved crucial for scaling up grading and sampling for high-compute RL runs, demonstrating the importance of cost-quality tradeoff analysis in production LLMOps.

### Harness Engineering and Improvements

Starting with Harvey's published LAB harness—which includes basic tools like read and grep over files in sandboxed execution environments—the team systematically improved the agent framework. After confirming parity with original reported scores, they used AC2 to identify simple, scalable improvements toward a strong, generalizable legal agent harness. Changes included restricting token counts in tool outputs, repairing broken tool calls, providing tool-use advice, and adding reminders to produce outputs. These modifications yielded substantial improvements across both open-weight and closed-source models.

Harness hillclimbing was conducted against multiple candidate base models to drive improvements across model families and scales. Interestingly, while most models benefited significantly from harness updates, GLM-5.1 (the chosen base model) remained roughly unchanged after harness updates alone and only improved meaningfully through training to better utilize tools and address failure cases—an important signal that the model needed capability improvements rather than just better scaffolding.

### Compaction for Long-Context Management

A critical technical innovation was the compaction system to handle context length limitations. Approximately 10% of rollouts with base GLM-5.1 reached maximum context length due to large file sizes—the 90th-percentile datapoint contains nearly 100,000 tokens in source documents, with maximums exceeding 200,000 tokens. The compaction mechanism automatically triggers when context reaches a threshold (131,072 tokens in the final configuration), sending the current episode transcript to the same agent with a different system prompt for summarization. A fresh conversation then starts from that summary, with up to 4 maximum compactions allowed.

This approach effectively extends the model's working context window far beyond its native limit while requiring the model to learn effective context utilization and avoid "context rot." The compaction strategy represents a pragmatic LLMOps solution to the common production challenge of managing long-context agentic workflows that accumulate tokens through tool calls and document retrieval.

## Training Process and Infrastructure

The team conducted derisking runs with Qwen 3.6 35B A3B and Kimi K2.6 to determine optimal harness and hyperparameters before settling on GLM-5.1 due to its superior baseline performance. Training employed full-parameter, fully-asynchronous reinforcement learning on AC2—a compute-intensive approach that contrasts with more parameter-efficient methods like LoRA.

The training trajectory shows GLM-5.1 starting well below the frontier of GPT-5.5 xhigh and Opus 4.8 Max but progressively exceeding GPT-5.5 xhigh on rubric pass rate and approaching Opus 4.8 Max on all-pass evaluation. The team attributes capability gains primarily to improved tool call usage and reasoning about source documents. All evaluations (except baseline harness comparisons) used the same final compaction harness with maximum reasoning effort, with GPT-5 Mini as the grader model using batches of 4 criteria-per-call.

The training curves demonstrate steady improvement from baseline rubric pass rate of 0.853 to final 0.913, while all-pass rate improved from 0.059 to 0.126. The all-pass metric is particularly stringent, requiring every single criterion in a task to be satisfied, making the gains from 5.9% to 12.6% significant even though absolute numbers remain relatively low—reflecting the extreme difficulty of achieving perfect performance on complex legal tasks.

## Behavioral Analysis and Interpretability

A notable strength of this work is the comprehensive behavioral analysis conducted to understand what the model learned. Since the baseline started around 85%, only approximately 1,500 rubric criteria across the 180-item test set (with roughly 10,000 total criteria) remained for improvement. The team identified three specific behaviors that improved during training and directly led to higher scores:

**Artifact Completeness** became consistently better as the model learned to properly use tools and always create output artifacts. This behavior alone flipped 185 relevant rubric criteria from failing to passing during training. In legal contexts, delivering complete work products is non-negotiable, making this improvement critical for production deployment.

**Specificity and Exactness** improved substantially, addressing base GLM-5.1's tendency toward poor calculations and imprecise numbers—particularly problematic was rounding figures during math (like 1.9 to 2), which legal graders appropriately punish. This behavior change flipped 243 criteria from failing to passing, representing the largest single behavioral improvement.

**Grounding** showed measurable reduction in hallucination despite no explicit hallucination penalty during training. The base checkpoint sometimes hallucinated source document items or invented findings from outside provided documents; this behavior decreased over time, flipping 70 criteria from failing to passing. This emergent improvement in factual grounding without explicit optimization for it suggests the RL process implicitly rewarded careful document handling through the rubric-based reward signal.

These three behaviors accounted for substantial model improvement, though some criteria tied to these behaviors still failed in the final checkpoint, suggesting the model hasn't reached its performance ceiling—an honest assessment that acknowledges remaining headroom.

## Tool Use Evolution

Quantitative analysis of tool usage patterns revealed significant efficiency improvements during training. Total tool calls decreased substantially over training, breaking down primarily into fewer read calls while maintaining consistent numbers of other tool calls like bash and grep. As evaluation scores improved, this reflected the model learning more effective tool use rather than bulk-reading all source documents.

The trained model also set more limits and used the read tool more specifically, reducing total payload tokens per trace from averages around 461k in base traces to 250k in trained traces on sample examples. This reduction in both tool call frequency and payload size demonstrates the model learning to target relevant information efficiently—a critical capability for production systems where compute costs scale with token processing.

Specific example comparisons illustrated these improvements concretely. In one acquisition review task, the base model made 104 tool calls across 40 turns with 461k tool payload tokens and achieved only 0.061 rubric score. The trained model accomplished the same task with 42 tool calls across 16 turns with 250k payload tokens while achieving 0.803 rubric score. The base model exhibited problematic behaviors like using ls, echo, and cat via bash to dump massive token volumes into context and wasting 16 tool calls creating and revising deliverables. The trained model made targeted reads with specified limits, used grep to highlight exact necessary phrases, and correctly structured tool usage to deliver proper file types with verification.

## Domain-Specific Performance

Distribution analysis across LAB's 24 legal practice areas revealed differential improvement patterns. The antitrust-competition domain improved most substantially, followed by intellectual-property and energy-natural-resources. Some domains experienced minor regressions, notably structured-finance-securitization, though these regressing domains had the smallest representation in training and test sets—suggesting potential overfitting to more heavily represented domains or insufficient training data for specialized areas.

This domain-level analysis provides practical guidance for production deployment: the model would be most reliable for antitrust, intellectual property, and energy work, while structured finance tasks might require additional scrutiny or continued training with domain-augmented data.

## Qualitative Improvements in Legal Reasoning

Example trace comparisons demonstrated marked improvements in legal reasoning quality. In the base model's deliverables, vague generalizations like "post-merger pricing power will increase" lacked specificity required for legal work. Poorly supported claims referenced wrong acquisitions due to overly broad file reads and failed to provide evidence for assertions.

The trained model's deliverables showed precise source attribution with specific dates: "in the Kinney-Thornbury Pricing Email (August 12, 2024)" and detailed grounded information like "Exclusive Hospital Outreach Contracts (Total: $76M annual revenue, 30.8% of Prism revenue)." References included specific numerical details: "Prism Diagnostics purchases approximately $620,000 in AllerSpec proprietary allergy reagent kits annually from LabVantage's Cascade Reference Labs subsidiary..." These improvements reflect genuine legal competence development—the ability to make specific, supported claims with proper attribution that would meet professional standards.

## Critical Assessment and LLMOps Considerations

While the results are impressive, several considerations warrant balanced assessment. The case study comes from Applied Compute promoting their AC2 platform, so claims about achieving "state-of-the-art" performance should be evaluated with appropriate skepticism until independently verified. The comparison models (GPT-5.5 xhigh, Opus 4.8 Max) appear to be future model versions given the 2026 date, making external validation challenging.

The evaluation methodology demonstrates strong LLMOps practices: held-out test splits, repeated grading to account for variance (3 runs with averaging), comprehensive grader alignment analysis, and behavioral interpretability analysis. However, all evaluations used the same grader (GPT-5 Mini) for both training signals and evaluation, which could introduce subtle biases where the model learns to satisfy this specific grader rather than truly mastering legal tasks. Cross-validation with human expert evaluation would strengthen confidence in the results.

The cost optimization analysis (40-100x reduction) represents significant practical value for production deployment, though absolute costs aren't provided. Understanding total training costs, inference costs per legal task, and comparison to human legal professional costs would provide important context for real-world adoption decisions.

The full-parameter RL approach is computationally expensive compared to parameter-efficient methods, raising questions about accessibility and reproducibility. The use of GLM-5.1 as the base model (an open-weight model) is positive for reproducibility, though access to AC2 platform would be required to replicate the training methodology exactly.

## Production Readiness and Future Directions

The case study concludes by acknowledging remaining headroom and proposing complementary techniques: relevance-masked self-distillation to strengthen grounding and agentic router training to optimize for cost alongside quality. This forward-looking perspective suggests the team views this as a milestone in ongoing development rather than a final product.

The movement "from benchmarks into production" is mentioned but not detailed, leaving questions about actual deployment into Harvey's production systems. Real-world considerations like latency requirements, multi-turn conversation handling, integration with existing legal workflows, liability and explainability requirements, and human-in-the-loop oversight would all be critical for production deployment in legal contexts where errors can have serious consequences.

The behavioral analysis showing improvements in artifact completeness, specificity, and grounding provides important interpretability that would be valuable for production monitoring—tracking these behaviors in production could serve as early warning signals for model degradation or distribution shift. The domain-level performance analysis likewise provides actionable guidance for deployment scoping and risk management.

Overall, this case study exemplifies sophisticated modern LLMOps practices: systematic evaluation infrastructure, cost-quality tradeoff optimization, interpretable behavioral analysis, full-stack optimization from data through training to deployment-ready harnesses, and honest assessment of remaining limitations. While promotional in nature, the technical depth and methodological rigor provide valuable insights for practitioners working on production LLM agent systems in specialized domains.
