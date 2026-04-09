---
title: "Systematic Prompt Optimization for Production Relevance Judges Using DSPy"
slug: "systematic-prompt-optimization-for-production-relevance-judges-using-dspy"
draft: false
llmopsTags:
  - "question-answering"
  - "summarization"
  - "classification"
  - "prompt-engineering"
  - "few-shot"
  - "error-handling"
  - "cost-optimization"
  - "latency-optimization"
  - "evals"
  - "human-in-the-loop"
  - "open-source"
  - "documentation"
  - "openai"
  - "databricks"
industryTags: "tech"
company: "Dropbox"
summary: "Dropbox Dash needed to scale their LLM-based relevance judge, which scores query-document pairs from 1-5, across multiple production pipelines including ranking, training data generation, and offline evaluation. The core challenge was that manually-tuned prompts for expensive models like OpenAI's o3 didn't transfer cleanly to cheaper models, and every model swap risked quality regressions. By adopting DSPy, an open-source framework for systematic prompt optimization, Dropbox reduced their normalized mean squared error (NMSE) by 45% when adapting to gpt-oss-120b, cut model adaptation time from 1-2 weeks to 1-2 days, enabled 10-100x more data labeling at the same cost, and improved structural reliability by reducing malformed JSON outputs by 97% on smaller models. The approach transformed prompt engineering from fragile manual iteration into a repeatable optimization loop measured against human-annotated relevance judgments."
link: "https://dropbox.tech/machine-learning/optimizing-dropbox-dash-relevance-judge-with-dspy"
year: 2026
seo:
  title: "Dropbox: Systematic Prompt Optimization for Production Relevance Judges Using DSPy - ZenML LLMOps Database"
  description: "Dropbox Dash needed to scale their LLM-based relevance judge, which scores query-document pairs from 1-5, across multiple production pipelines including ranking, training data generation, and offline evaluation. The core challenge was that manually-tuned prompts for expensive models like OpenAI's o3 didn't transfer cleanly to cheaper models, and every model swap risked quality regressions. By adopting DSPy, an open-source framework for systematic prompt optimization, Dropbox reduced their normalized mean squared error (NMSE) by 45% when adapting to gpt-oss-120b, cut model adaptation time from 1-2 weeks to 1-2 days, enabled 10-100x more data labeling at the same cost, and improved structural reliability by reducing malformed JSON outputs by 97% on smaller models. The approach transformed prompt engineering from fragile manual iteration into a repeatable optimization loop measured against human-annotated relevance judgments."
  canonical: "https://www.zenml.io/llmops-database/systematic-prompt-optimization-for-production-relevance-judges-using-dspy"
  ogTitle: "Dropbox: Systematic Prompt Optimization for Production Relevance Judges Using DSPy - ZenML LLMOps Database"
  ogDescription: "Dropbox Dash needed to scale their LLM-based relevance judge, which scores query-document pairs from 1-5, across multiple production pipelines including ranking, training data generation, and offline evaluation. The core challenge was that manually-tuned prompts for expensive models like OpenAI's o3 didn't transfer cleanly to cheaper models, and every model swap risked quality regressions. By adopting DSPy, an open-source framework for systematic prompt optimization, Dropbox reduced their normalized mean squared error (NMSE) by 45% when adapting to gpt-oss-120b, cut model adaptation time from 1-2 weeks to 1-2 days, enabled 10-100x more data labeling at the same cost, and improved structural reliability by reducing malformed JSON outputs by 97% on smaller models. The approach transformed prompt engineering from fragile manual iteration into a repeatable optimization loop measured against human-annotated relevance judgments."
notion:
  pageId: "32ef8dff-2538-8069-b37f-cb3718250870"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-03-25T19:18:00.000Z"
  lastEditedTime: "2026-04-09T17:37:00.000Z"
  publishedAt: "2026-04-09T17:56:46Z"
---

## Overview

Dropbox's case study details their experience optimizing a production LLM-based relevance judge for Dash, their AI-powered workspace search product that brings together files, messages, and team knowledge. The relevance judge sits at the heart of multiple critical production pipelines including ranking systems, training data generation, and offline evaluation. This case study is particularly valuable for demonstrating how systematic prompt optimization using DSPy can address common LLMOps challenges around model migration, cost control, operational reliability, and maintaining quality at scale.

The case is noteworthy for its honest acknowledgment that production LLM systems face challenges that prototypes don't encounter—specifically around cost-quality tradeoffs, prompt brittleness across models, and the operational requirement that outputs be not just accurate but also consistently parseable by downstream systems. Dropbox's approach shows a mature understanding that LLMOps requires measurable objectives, systematic optimization processes, and different strategies depending on risk tolerance.

## The Production Context and Challenge

Dropbox Dash relies heavily on relevance scoring as a foundational capability. The relevance judge takes a query and a document and assigns a relevance score from 1 to 5, where 5 indicates a perfect match and 1 indicates no meaningful connection. This deceptively simple task is critical because it affects multiple downstream systems: ranking determines what users see, training data generation influences how models learn, and offline evaluation shapes how the team measures system improvements.

The initial production judge was built on OpenAI's o3 model, which produced high-quality scores that aligned closely with human ratings. However, as Dash grew, the team needed to score orders of magnitude more query-document pairs. Running the most expensive model for every judgment became economically unsustainable. The natural solution—migrating to cheaper or smaller models—introduced a significant operational problem: prompts carefully tuned for one model didn't transfer cleanly to others. Manual prompt retuning could eventually recover performance, but it required weeks of iteration and introduced regression risk in unexpected edge cases.

The team identified that manual prompt engineering had fundamental limitations in this context. Quality plateaued early, every model swap risked regressions, and there was no systematic way to measure whether a prompt change was actually improving the right objective. This is a common pattern in production LLM systems: what works in initial prototyping (manual prompt crafting against state-of-the-art models) doesn't scale operationally or economically.

## Defining the Optimization Objective

Before applying DSPy, Dropbox established a clear and measurable definition of "good" for their relevance judge. They needed two things: alignment with human judgment and structural reliability.

For human alignment, they built an evaluation dataset where human annotators rated query-document pairs on the same 1-5 scale, providing short explanations for their scores. These annotations were conducted using limited, non-sensitive internal datasets with no customer data reviewed by humans. The team measured deviation from human ratings using normalized mean squared error (NMSE), which captures the average squared gap between model and human scores on a 0-100 scale. An NMSE of 0 represents perfect agreement, with higher values indicating worse alignment. This metric appropriately penalizes large disagreements (human assigns 5, model assigns 1) more heavily than small ones (human assigns 5, model assigns 4).

For structural reliability, they tracked whether the judge's JSON-formatted outputs could be successfully parsed. If the model returned malformed JSON or failed to follow the expected structure, that output couldn't be used by downstream systems. In their evaluation framework, these formatting failures were treated as fully incorrect responses—a pragmatic choice reflecting production reality where unparseable outputs cause pipeline failures, dropped examples, and unreliable metrics.

This dual objective—minimize NMSE while maintaining valid output format—gave them a concrete target for DSPy optimization. The clarity of this objective is worth emphasizing: many organizations struggle with LLM evaluation because they haven't defined what success looks like in measurable terms.

## Adapting to Cheaper Models with DSPy

Dropbox's first major application of DSPy was adapting their relevance judge from the expensive o3 model to gpt-oss-120b, an open-weight model offering much lower cost but initially lower quality with the existing prompt. Rather than spending weeks manually rewriting prompts, they used DSPy to systematically search for prompt variants that improved performance against their NMSE metric.

DSPy allowed them to define the setup clearly: the task (assign 1-5 relevance scores), the dataset (human-annotated examples with ratings and explanations), and the metric (NMSE). They used DSPy's GEPA optimizer, which iteratively improves prompts by analyzing disagreements with humans and generating structured feedback.

The feedback mechanism is particularly interesting from an LLMOps perspective. Rather than treating evaluation as a single aggregate score, GEPA generates specific feedback for each example where the model disagrees with a human annotator. Dropbox combined the size and direction of the rating gap with the human's explanation and the model's reasoning to produce concrete signals about what went wrong. For instance, if the model predicted 4 but expected 5, the feedback might note "Model rated 1 point lower than expected. Human rationale: [explanation]. Model's reasoning: [explanation]."

This feedback powers an iterative reflection loop: the prompt is evaluated, failure modes are surfaced in plain language, the prompt is revised, and the cycle repeats. The system can respond to specific patterns like "underweighting recency" or "overvaluing keyword matches" rather than trying to infer improvements from a single number.

The team encountered important challenges with overfitting during early experiments. The optimizer sometimes copied specific keywords, usernames, or verbatim document phrases directly into prompts, which improved performance on training examples but didn't generalize. They addressed this by adding explicit guardrails forbidding direct inclusion of example-specific content. They also found candidate prompts sometimes modified key task parameters (changing the rating scale from 1-5 to 1-3, for example), so they added constraints ensuring task definition stability throughout optimization.

The results were substantial: comparing the best DSPy-optimized prompt to the original manual prompt, they reduced NMSE by 45% (from 8.83 to 4.86). This meant the judge's scores tracked human ratings much more closely. Model adaptation time dropped from 1-2 weeks of manual iteration to 1-2 days, allowing faster model swaps with less regression risk. Because the optimized judge could run on a much cheaper model than o3, they could label 10-100 times more data at the same cost, increasing coverage and statistical power for downstream systems.

## Operational Reliability with Smaller Models

The team then stress-tested operational reliability by introducing gemma-3-12b, a much smaller and cheaper model. Smaller models reduce cost and enable broader scaling, but they're more brittle about formatting and instruction-following. This experiment tested whether DSPy optimization could make even a weak model operationally dependable.

The results starkly illustrated the structural reliability problem: in the baseline configuration, more than 40% of gemma-3-12b's responses were malformed JSON. Under their evaluation rules, these were treated as fully incorrect, meaning the judge was unreliable before even considering alignment quality. After DSPy optimization using the MIPROv2 optimizer, malformed outputs dropped by more than 97%, and NMSE improved dramatically from 46.88 to 17.26. Valid response formats increased from 498 to 847 out of 856 total examples, while invalid formats dropped from 358 to just 9.

This demonstrated that DSPy wasn't only improving semantic alignment with human judgments but also strengthening structural reliability—the judge's ability to produce machine-readable outputs that downstream systems could consume. This is a critical but often overlooked dimension of production LLM quality.

The experiment also demonstrated another benefit: iteration speed for making "no-go" decisions. Although gemma-3-12b ultimately proved too weak for their highest-quality production paths, DSPy allowed them to reach that conclusion quickly with measurable evidence rather than prolonged debate or manual trial and error.

## Incremental Improvement for Production Systems

When optimizing their production o3-based judge—already strong and depended on across multiple pipelines—Dropbox's constraints flipped. They weren't comfortable with full prompt rewrites because even small wording changes could shift behavior in corner cases with high blast radius. Instead, they needed targeted improvements without destabilizing existing behavior.

They introduced an "instruction library layer" to make prompt improvement more controlled. When they found cases where the judge's score differed substantially from human ratings, humans wrote short explanations describing what the judge misunderstood and what it should have paid attention to instead. They distilled these explanations into single-line instruction bullets—small, reusable rules of thumb the model could follow.

In this setup, DSPy's optimization module was responsible only for selecting which instruction bullets to include and how to combine them, not for rewriting the entire prompt from scratch. For example, if a disagreement was explained as "the document is older than a year, so it's less relevant for this query," they translated that into a bullet like "Documents older than a year should be rated at least one point lower unless they are clearly evergreen." DSPy could then learn whether including that bullet improved alignment without unintended side effects.

This approach turned optimization into something analogous to "small PRs with tests" rather than a large-scale refactor. Improvements were incremental, regressions easier to diagnose, and baseline behavior remained stable while pushing agreement upward. The case study shows evaluation results demonstrating cumulative improvement through multiple small, testable changes, though specific NMSE values for the o3 incremental improvements aren't provided in the text.

## LLMOps Lessons and Tradeoffs

This case study exemplifies several important LLMOps principles and reveals honest tradeoffs worth examining critically:

**Measurable objectives are foundational.** Dropbox's success with DSPy depended entirely on having a clear, measurable objective (NMSE against human judgments) before beginning optimization. Without this, systematic optimization wouldn't be possible. However, the case doesn't deeply explore potential issues with the objective itself—for instance, whether human annotators agree with each other, how annotation quality is maintained, or whether optimizing to human judgment might miss cases where humans are systematically wrong.

**Prompt brittleness across models is a real production problem.** The case clearly demonstrates that prompts don't transfer cleanly between models, making model migrations costly and risky. DSPy provides a systematic solution, but it's worth noting this creates a dependency on having good evaluation data and the infrastructure to run optimization loops. Organizations without these capabilities might still struggle.

**Cost-quality tradeoffs are central to production LLM systems.** The economic unsustainability of running o3 at scale is presented as straightforward, but the case doesn't discuss the cost structure in detail—what percentage of total system cost was the relevance judge, what budget constraints drove the migration, or how they decided which quality level was acceptable for cheaper models. These decisions matter significantly in real deployments.

**Operational reliability (parseable outputs) is distinct from semantic quality.** The gemma-3-12b experiment demonstrates that even if a model produces semantically reasonable outputs, if they're unparseable, they're useless. This dual requirement shapes evaluation strategy—you can't just measure NMSE, you must also measure formatting success. This is an important but often underemphasized point in LLMOps.

**Risk tolerance shapes optimization strategy.** The contrast between full prompt rewrites for model migration and constrained instruction selection for production o3 improvement shows mature operational thinking. However, the case doesn't discuss how they validate that constrained optimization doesn't miss better solutions available through broader exploration, or how they decide when to use each approach.

**Iteration speed matters for exploration and decision-making.** Reducing adaptation time from 1-2 weeks to 1-2 days is valuable both for faster model adoption and for quickly ruling out weak models. But this assumes the DSPy optimization process itself is relatively quick and that evaluation datasets are representative—assumptions that might not hold in all contexts.

**DSPy as a dependency introduces its own operational considerations.** While the case study is overwhelmingly positive about DSPy, adopting it means taking on a framework dependency, learning curve for the team, and potential need to maintain optimization infrastructure. The case doesn't discuss integration challenges, computational cost of running optimization, or how they handle DSPy updates.

**Human evaluation data quality is assumed but not explored.** The entire approach depends on high-quality human annotations, but the case provides limited detail on inter-annotator agreement, annotation guidelines, quality control, or how they handle ambiguous cases. In practice, human evaluation quality can be a significant bottleneck.

**Guardrails against overfitting required manual design.** The team had to manually identify and address overfitting patterns (copying keywords, changing task parameters). This suggests DSPy optimization isn't fully automatic—it requires thoughtful constraint design and monitoring for unexpected behaviors.

**Generalization from training to production isn't explicitly validated.** The case discusses performance on evaluation datasets but doesn't detail how they validate that improved eval set performance translates to better production outcomes in ranking, training data generation, and offline evaluation pipelines.

## Technical Architecture and Workflow

From an LLMOps architecture perspective, the case reveals several components:

**Evaluation infrastructure:** A system for comparing model outputs to human annotations, computing NMSE, tracking formatting failures, and providing these metrics to DSPy optimizers.

**Human annotation pipeline:** A process for collecting human relevance judgments with explanations on internal, non-sensitive datasets, presumably with quality control and consistency checks.

**Feedback generation mechanism:** Code that constructs textual feedback from disagreements, combining predicted vs expected ratings, human rationale, and model reasoning into prompts for the next optimization iteration.

**Constraint enforcement:** Guardrails preventing the optimizer from overfitting to specific examples or changing task parameters, implemented as validation rules on generated prompts.

**Instruction library:** For incremental optimization, a curated set of instruction bullets derived from human analysis of failure cases, with DSPy selecting which to include.

**Multi-model deployment:** Infrastructure supporting parallel operation of different models (o3, gpt-oss-120b, gemma-3-12b) for different use cases, presumably with routing logic based on cost-quality tradeoffs.

The workflow involves iterative cycles: run the judge on evaluation data, compute NMSE and formatting metrics, generate feedback for disagreements, use DSPy optimizer (GEPA for full rewrites, MIPROv2 for structured outputs, instruction selection for incremental changes) to propose prompt improvements, validate against constraints, and repeat until convergence or time budget exhaustion.

## Broader Implications for LLMOps Practice

This case study offers several valuable lessons for practitioners:

**Systematic prompt optimization can replace manual iteration** when you have clear objectives and good evaluation data. The 45% NMSE reduction and 10x faster adaptation time demonstrate material benefits over manual approaches.

**Production LLM systems need both semantic quality and operational reliability.** Evaluating only alignment with human judgment would have missed the structural reliability problems that caused 40% formatting failures on smaller models.

**Different optimization strategies for different risk contexts** is an important pattern. Full rewrites for new model exploration, constrained optimization for production stability—choosing the right approach requires understanding blast radius and dependency on existing behavior.

**Cost optimization for LLMs often means model migration,** and model migration means re-optimization. Having systematic processes for this, rather than treating each migration as a manual project, is essential for sustainable LLMOps at scale.

**LLM-as-a-judge is itself an LLMOps challenge.** The judge that evaluates other systems is itself a production system with quality, cost, and reliability requirements. This creates a meta-level optimization problem that benefits from the same systematic approaches.

The case study demonstrates mature LLMOps thinking in how Dropbox frames problems (clear metrics, explicit tradeoffs), chooses solutions (systematic over ad-hoc approaches), and validates results (quantitative comparison under controlled conditions). While the presentation is understandably positive about their chosen approach, the technical details and honest discussion of challenges like overfitting and constraint design provide valuable guidance for others facing similar problems in production LLM systems.
