---
title: "Scaling Foundation Models with Synthetic Data and Production Training Infrastructure"
slug: "scaling-foundation-models-with-synthetic-data-and-production-training-infrastructure"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "few-shot"
  - "multi-agent-systems"
  - "agent-based"
  - "error-handling"
  - "evals"
  - "pytorch"
  - "monitoring"
  - "open-source"
  - "documentation"
  - "hugging-face"
  - "nvidia"
industryTags: "tech"
company: "Poolside"
summary: "Poolside, a company building open-weight language models focused on agentic coding, faced challenges when scaling from their initial Laguna M model to larger deployments serving both enterprise and public users. The team addressed three key issues: data scarcity and repetition at scale, numerical precision failures during distributed training, and the need for comprehensive verification systems. Their solution involved implementing a synthetic data pipeline (contributing 13% of pre-training mix), building a configurable generation framework called Hive, and creating hash-based verification systems to catch silent failures in distributed training. These improvements enabled them to successfully train and deploy Laguna XS (33B parameters) and preview Laguna S (118B total parameters, 8B active), achieving competitive performance on coding benchmarks while avoiding the training failures that plagued earlier versions."
link: "https://www.youtube.com/watch?v=KhYifX22yhE"
year: 2026
seo:
  title: "Poolside: Scaling Foundation Models with Synthetic Data and Production Training Infrastructure - ZenML LLMOps Database"
  description: "Poolside, a company building open-weight language models focused on agentic coding, faced challenges when scaling from their initial Laguna M model to larger deployments serving both enterprise and public users. The team addressed three key issues: data scarcity and repetition at scale, numerical precision failures during distributed training, and the need for comprehensive verification systems. Their solution involved implementing a synthetic data pipeline (contributing 13% of pre-training mix), building a configurable generation framework called Hive, and creating hash-based verification systems to catch silent failures in distributed training. These improvements enabled them to successfully train and deploy Laguna XS (33B parameters) and preview Laguna S (118B total parameters, 8B active), achieving competitive performance on coding benchmarks while avoiding the training failures that plagued earlier versions."
  canonical: "https://www.zenml.io/llmops-database/scaling-foundation-models-with-synthetic-data-and-production-training-infrastructure"
  ogTitle: "Poolside: Scaling Foundation Models with Synthetic Data and Production Training Infrastructure - ZenML LLMOps Database"
  ogDescription: "Poolside, a company building open-weight language models focused on agentic coding, faced challenges when scaling from their initial Laguna M model to larger deployments serving both enterprise and public users. The team addressed three key issues: data scarcity and repetition at scale, numerical precision failures during distributed training, and the need for comprehensive verification systems. Their solution involved implementing a synthetic data pipeline (contributing 13% of pre-training mix), building a configurable generation framework called Hive, and creating hash-based verification systems to catch silent failures in distributed training. These improvements enabled them to successfully train and deploy Laguna XS (33B parameters) and preview Laguna S (118B total parameters, 8B active), achieving competitive performance on coding benchmarks while avoiding the training failures that plagued earlier versions."
notion:
  pageId: "3aaf8dff-2538-802e-a627-f387f11fb2a6"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T12:00:00.000Z"
  lastEditedTime: "2026-07-27T12:00:00.000Z"
  publishedAt: "2026-07-27T12:06:17Z"
---

## Overview

Poolside is a company developing open-weight foundation models with a specific focus on agentic coding capabilities. This case study captures their journey scaling models from an initial enterprise-focused release (Laguna M.1) through subsequent iterations (Laguna XS.2 and the upcoming Laguna S), documenting the critical LLMOps challenges they encountered and how they systematically addressed them. The presentation features two speakers: Mara Abden, who focuses on data and synthetic data generation, and Robert, who covers pre-training infrastructure and distributed training challenges. The models discussed are available on Hugging Face as open-weight releases, with accompanying technical reports.

The case study is particularly valuable because it addresses the full LLMOps stack required for training foundation models at scale, from data preparation through distributed training infrastructure to production verification systems. The team emphasizes that successful model development requires treating data quality, training implementation correctness, and numerical stability holistically rather than as separate concerns.

## The Core Problem: Scaling Challenges

When Poolside transitioned from serving only enterprise customers to releasing open-weight models publicly, they encountered several critical scaling issues. The first major problem emerged from their initial data strategy, which had prioritized quality over quantity. This approach worked well at smaller scales but created bottlenecks when they increased their training budget and model size. Specifically, they began hitting non-optimal repetition on high-quality data sources, causing the model to saturate too early in training. This token uniqueness problem threatened to limit their ability to scale effectively.

Beyond data challenges, the team discovered that assumptions that held at smaller scales broke down catastrophically when training on thousands of GPUs with hundreds of billions of parameters. Silent failures, numerical precision issues, and hardware problems that might go unnoticed in smaller experiments could derail entire training runs at production scale. The team adopted a philosophy of "not trusting anything" and building comprehensive verification systems to catch these issues before they wasted compute resources.

## Synthetic Data Strategy

Poolside's approach to synthetic data represents a nuanced middle ground between purely organic and fully synthetic training regimes. The team is explicit that they don't view synthetic data as a replacement for organic data at the current state of the field, but rather as a complementary approach. Their philosophy centers on the idea that organic data contains many implicit features—implicit rationale, planning, and structure—that aren't presented in the most optimal way for model learning. Synthetic data provides a mechanism to extract these features and project them onto new planes, exposing what was previously hidden while filling gaps and regularizing the presentation of tokens.

For Laguna XS.2, the team settled on synthetic data comprising 13% of the pre-training mix before post-training stages. Since that release, they've continued expanding their synthetic data generation, building a corpus that has grown to six trillion tokens and continues to expand. This represents a significant ongoing investment in synthetic data infrastructure.

### Addressing Token Uniqueness Through Rephrasing

The most straightforward application of synthetic data was addressing the token uniqueness problem caused by excessive repetition of high-quality seed data. Poolside implemented rephrasing pipelines, a technique that has become increasingly common in the field. The basic approach involves taking existing high-quality content and generating alternative phrasings that preserve semantic content while introducing lexical diversity.

The team presented ablation results showing consistent improvements when replacing repeated seed content with multi-mode rephrased versions. While they caution that the absolute numbers should be taken with appropriate skepticism given the ablation context, the directional improvement was consistent across experiments. Beyond generic rephrasing, Poolside developed two specialized rephrasing pipelines: one for converting markdown documents to code and text formats, and another specifically for STEM documents. These specialized pipelines reflect the team's recognition that different content domains benefit from domain-appropriate transformation strategies.

### The Modular Framework for Synthetic Data

Poolside developed a conceptual framework that treats all synthetic data pipelines as composed of six modular components: seeds (primary inputs), metadata, secondary inputs, a generator function (which might be an agent with tools or simply prompt templates), and supplementary functions like filters and validators. This abstraction allows them to reason consistently about pipelines ranging from simple, cheap, scalable approaches to complex multi-stage workflows.

The team maps their synthetic data work along an axis of complexity. At one end are cheap, scalable pipelines that use smaller models and rely heavily on high-quality seeds—rephrasing fits into this category. At the other end are complex pipelines with significant orchestration in their workflows, reserved for situations where the investment is justified, such as generating educational data. This complexity spectrum serves a critical purpose: it allows the team to be ambitious with synthetic data generation even when tasks exceed the capabilities of their teacher models. The rule of thumb is straightforward: if a task is too hard for the model, it will lose correctness and diversity. The solution is to break down the task into simpler sub-components.

### Synthetic Data Pipeline Patterns

Poolside identifies four key patterns or "shapes" for synthetic data pipelines that they employ regularly. First is rephrasing, already discussed extensively. Second is multi-stage pipelines and workflows, where complex tasks are decomposed into multiple simpler steps. Rather than generating a novel in one shot, for example, a multi-stage approach would first generate the setting, character names and styles, plot elements, and twists, then use these as scaffolding to generate individual chapters. This staged approach consistently produces higher quality outputs.

The third pattern is cross-domain porting, which involves moving content between modalities or representations. Examples include code translation between languages or converting math problems into code implementations. The team specifically mentioned porting their math problems to code as one application of this pattern.

The fourth pattern is multi-turn workflows with iteration rather than linear or even non-linear single-pass generation. This encompasses scenarios like multi-turn conversations between agents or task evolution pipelines where a judge and an evolver interact iteratively for some number of rounds, gradually refining the output.

### Hive: Infrastructure for Configurable Generation

To operationalize their modular conception of synthetic data, Poolside built Hive, a configurable infrastructure for constructing generation pipelines. Hive allows users to define a queue of agents, where each agent has its own prompt, parameters, model selection, inputs, and outputs. Critically, the framework supports configuring when agents enter and exit the queue, their frequency of invocation, and orchestration logic between agents.

The orchestrators in Hive serve two purposes: they provide flexibility in creating hierarchies between generating LLMs, acting as a "policing" mechanism to maintain quality, while simultaneously enabling creativity by dynamically changing instructions for subsequent agents or choosing which agents execute next and which are skipped. Above the orchestrators sits a supervisor with a global view that oversees the orchestrator's decisions. This three-tier architecture—agents, orchestrators, and supervisors—provides both structure and flexibility for complex generation workflows.

## Pre-Training Infrastructure and Distributed Training Challenges

While Mara focused on data, Robert's presentation covered the infrastructure and implementation side of LLMOps at Poolside. His core message is that data quality and training implementation correctness must be treated holistically: excellent data cannot compensate for broken training code, and vice versa. His team's approach is grounded in systematic verification and monitoring, operating from the principle that "we don't trust anything" at scale.

### Hash-Based Verification System

The cornerstone of Poolside's training verification approach is a hash-based consistency checking system. In distributed data parallel training, multiple replicas of the same model train on different data batches. An invariant of this setup is that the weights should always remain identical across all replicas after each synchronization step. Poolside calculates hash values over the weights for each replica and periodically compares them during training. If all hashes are identical, training continues. If hashes diverge, the system knows something has gone catastrophically wrong and crashes the training run.

This might seem like a simple check, but it catches an entire class of silent failures that would otherwise waste massive compute resources. The team provides several concrete examples of issues caught by this system.

### Silent GPU Failures

One particularly insidious class of problems is broken GPUs causing silent data corruption. Poolside presented a comparison of two training runs that were identical in model configuration, training data, and implementation. The only difference was that one run happened to include a broken GPU. The loss curves tell a dramatic story: the run with the broken GPU showed a spiky, bumpy trajectory with massive gradient norms, while the clean run showed smooth convergence. The silent data corruption from the malfunctioning hardware would have been difficult to diagnose without the hash verification system, as the GPU appeared to function but produced incorrect results.

This example underscores a critical LLMOps challenge: at scale, hardware failures are not anomalies but expected events that must be detected and handled systematically. The hash-based approach catches these failures definitively because the corrupted computations on the broken GPU produce different weights than the correct replicas.

### Numerical Precision Issues: The LM Head Accumulation Problem

Perhaps the most technically illuminating issue Poolside encountered was a numerical precision failure that emerged during the training of Laguna M.1 around 50,000 steps into the run. The loss curve simply stopped converging and flattened out completely, with gradient norms showing a concerning upward trend. The team traced this to a subtle interaction between growing activation scales and tensor parallelism implementation.

Specifically, activations immediately before the LM head (the unembedding layer) grew progressively larger during training. Because Poolside uses tensor parallelism for the unembedding operation, the implementation must perform an accumulation across tensor parallel ranks. This accumulation was being performed in BF16 (bfloat16) by default. As the activation scales grew, the numerical precision available in BF16 became insufficient to accurately represent the values, leading to precision loss that corrupted gradients backpropagating through the entire model trunk.

The fix was conceptually simple but had dramatic impact: moving the accumulation operation from BF16 to FP32 (32-bit floating point). The team took a checkpoint from the diverged run, applied the fix, and continued training. The model immediately began converging again, with gradient norms actually decreasing where they had previously been trending upward. This issue is particularly noteworthy because it only manifests at scale—smaller models or shorter training runs wouldn't encounter the same combination of factors.

### From Laguna M.1 to XS.2: Applying Lessons Learned

The team emphasizes that Laguna XS.2 represents a "new generation" of models precisely because it incorporates all the lessons learned from the M.1 training experience. This included not just the specific numerical fixes but also increased data diversity, reduced data repetition through synthetic approaches, enhanced observability and verification systems, and general optimization of training and architecture.

Laguna XS.2, available as an open-weight model on Hugging Face, is positioned as one of the most competitive models for its size class, particularly for coding tasks and agentic coding workflows. However, the team acknowledges that at 33 billion parameters, XS.2 is relatively small by contemporary standards, and many scaling issues might not manifest at that size.

### Scaling to Laguna S: 118B Parameters

Laguna S represents Poolside's test of whether their improved recipe would scale to much larger models. Still unreleased at the time of this presentation, Laguna S features 118 billion total parameters with 8 billion active parameters (suggesting a mixture-of-experts architecture). The model was trained on 30 trillion tokens using 4,000 GPUs, representing a scale sufficient to stress-test all the improvements made to data and architecture, as well as potentially revealing new numerical issues.

### FP8 Training and Race Conditions

Even with all their previous improvements, Laguna S training encountered new issues—in this case related to FP8 training implementation rather than scale per se. Poolside adopted FP8 training using DeepChem FP8 kernels, which are open source. During training, they encountered illegal memory accesses and NaNs in gradients, which after debugging they traced back to race conditions in those kernels.

The race condition had both observable and unobservable effects. The observable effects were the crashes from illegal memory accesses and explicit NaNs. More concerning was the silent effect: approximately 0.5% of gradients were being silently corrupted, essentially replaced by random values. This corruption rate wouldn't necessarily cause obvious training failures but would degrade model quality in subtle ways. Poolside developed a fix that was submitted as a pull request to the DeepChem repository and made publicly available.

This issue also revealed a blind spot in their hash-based verification system. The hash checks verify that replicas remain synchronized, but they cannot detect race conditions within individual replicas because there's no redundancy to compare against in real training runs. In production training, each replica sees different data, so there's no expectation that forward and backward passes should produce identical results across replicas for the same inputs. The team is actively working on enhanced verification approaches, potentially including dry runs that can detect these issues.

## Evaluation and Model Performance

Poolside emphasizes that they focus evaluation efforts on metrics aligned with their core mission: building strong agentic coding models. For Laguna S, they presented early base model evaluation results with appropriate caveats that base model performance doesn't perfectly predict post-training performance.

On coding-specific benchmarks, Laguna S shows strong results. On MultiPL-E, LiveCodeBench, and BigCodeBench, it outperforms not just their previous XS.2 model but also their larger M.1 model, demonstrating that their improved recipe delivers better efficiency. It also beats GLM-4.5 Air (though acknowledged as older), Nemotron-360, and DeepSeek-V4-Flash-Max on these coding benchmarks, with the latter two being larger and more recent models.

Performance on SWE-Bench Agentless Multilingual, which Poolside uses as a proxy for agentic performance during pre-training, is particularly strong. Laguna S substantially outperforms all comparison models on this benchmark, which aligns with the team's strategic focus.

On more general benchmarks, the picture is more mixed, which is explicitly acknowledged and explained. On BigBench Hard, Laguna S is competitive but doesn't achieve top results among the comparison set. On MMLU Pro, a knowledge benchmark, it's clearly weaker than Nemotron and DeepSeek. The team is transparent that this reflects a deliberate data allocation decision: they prioritize coding capabilities over encyclopedic knowledge because their goal is building agentic coding models. The knowledge gap could be addressed with different data choices if desired, but it's not their current priority.

## Production Considerations and Open Weight Strategy

Poolside's strategy of releasing open-weight models has significant implications for their LLMOps approach. Unlike companies that serve models exclusively through APIs, open-weight releases face different pressures around model quality and correctness. Issues that might be addressed through server-side updates in an API-served model require new releases for open-weight models, raising the stakes for getting training right the first time.

The comprehensive verification systems Poolside has built—hash-based checks, extensive monitoring, gradient norm tracking—reflect an engineering culture that prioritizes correctness and reliability. The team's willingness to crash training runs on detection of inconsistencies, even if they might resolve naturally, demonstrates a preference for fail-fast approaches over hoping problems self-correct.

Their transparency about failures and issues, including presenting loss curves from failed training runs and discussing specific bugs in third-party kernels, suggests a mature approach to LLMOps that acknowledges the complexity and fragility of training at scale.

## Broader LLMOps Lessons

Several broader lessons emerge from Poolside's experience. First, issues that seem obscure or unlikely at small scale become inevitable at production scale. Silent GPU failures, numerical precision issues, and race conditions in widely-used kernels all manifested during Poolside's scaling journey. Comprehensive monitoring and verification systems aren't optional nice-to-haves but essential infrastructure.

Second, synthetic data represents a valuable tool in the LLMOps toolkit when used thoughtfully. Poolside's modular, pattern-based approach to synthetic generation allows them to systematically address data quality and diversity issues while scaling their training data corpus. Their emphasis on synthetic data as complementary rather than replaceable relative to organic data reflects a pragmatic understanding of current capabilities.

Third, treating the full stack holistically—from data through training implementation to verification systems—is essential. The team's explicit rejection of siloed thinking about data quality versus training infrastructure quality reflects hard-won wisdom about interdependencies.

Finally, the transparency around failures and the iterative nature of model development (evidenced by the version numbering: M.1 to XS.2 to S) suggests that building production foundation models is necessarily an iterative process of discovering and addressing issues that emerge at each new scale. The notion of "getting it right the first time" may be unrealistic; instead, robust verification systems and rapid iteration appear to be the more viable path to production-quality models.
